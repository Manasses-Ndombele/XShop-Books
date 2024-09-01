import { updateProductsList, setCardsEvents, shoppingCart, showShoppingCart } from "./base.js"

let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
let searchBooksBtn = document.querySelector('button#search-books-btn')
let searchAreaOverlay = document.querySelector('div#search-area-overlay')
let searchArea = document.querySelector('form#search-area')
let searchInput = document.querySelector('input#search-book-field')
let userAccountBtn = document.querySelector('button#user-account-btn')
let userAccountOptions = document.querySelector('div#user-account-options')
let mainArea = document.querySelector('main')
let navbarBrand = document.querySelector('a.navbar-brand')
let userStatus = document.querySelector('meta[name="user-status"]').getAttribute('content').toLowerCase()
let booksContainer = document.querySelector('div#books-container')
let productDetailsModal = document.querySelector('div#product-details-modal')
let shoppingCartBtn = document.querySelector('button#shopping-cart-btn')
let shoppingCartModal = document.querySelector('div#shopping-cart-modal')
let loadMoreBooksBtn = document.querySelector('button#load-more-books-btn')
let loadedBooks = new Array()
let baseSectionOpt = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
}

function handleBaseSections(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.tagName == 'FOOTER') {
                if (shoppingCartBtn.classList.contains('d-none') === false) {
                    shoppingCartBtn.classList.add('d-none')
                }
            }
        } else {
            if (entry.target.tagName == 'FOOTER') {
                if (shoppingCartBtn.classList.contains('d-none')) {
                    shoppingCartBtn.classList.remove('d-none')
                }
            }
        }
    })
}

let baseSectionObserver = new IntersectionObserver(handleBaseSections, baseSectionOpt)
window.onload = () => {
    let booksRequest = new XMLHttpRequest()
    booksRequest.open('POST', '/load-books/')
    booksRequest.setRequestHeader('Content-Type', 'application/json')
    booksRequest.setRequestHeader('X-CSRFToken', csrfToken)
    booksRequest.onreadystatechange = () => {
        if (booksRequest.readyState == booksRequest.DONE) {
            if (booksRequest.status == 200) {
                let response = JSON.parse(booksRequest.responseText)
                response.books.forEach(book => { loadedBooks.push(book) })
                if (response.shoppingCartNumber > 0) {
                    response.shoppingCart.forEach(cart => { shoppingCart.push(cart) })
                }

                updateProductsList(loadedBooks, response.shoppingCartNumber, shoppingCartBtn, booksContainer, userStatus, shoppingCart)
                setCardsEvents(csrfToken, shoppingCartBtn, productDetailsModal, null, userStatus)
                baseSectionObserver.observe(document.querySelector('footer'))
            } else {
                console.error(`The request failed! Code: ${booksRequest.status}`)
            }
        }
    }

    booksRequest.send(JSON.stringify({requestedBy: 'home'}))
}

searchBooksBtn.addEventListener('click', () => {
    document.body.style.overflowY = 'hidden'
    searchAreaOverlay.classList.add('show')
    setTimeout(() => { searchInput.focus() }, 600)
})

searchInput.addEventListener('blur', () => {
    searchAreaOverlay.classList.remove('show')
    document.body.style.overflowY = 'auto'
})

userAccountBtn.addEventListener('click', () => {
    userAccountOptions.classList.toggle('show')
})

for (let i of [mainArea, navbarBrand]) {
    i.addEventListener('click', () => {
        userAccountOptions.classList.remove('show')
    })
}

searchArea.addEventListener('submit', event => {
    event.preventDefault()
    const searchValue = {search_value: searchInput.value}
    let xhr = new XMLHttpRequest()
    xhr.open('POST', '/search-books/')
    xhr.setRequestHeader('X-CSRFToken', csrfToken)
    xhr.onreadystatechange = () => {
        if (xhr.readyState == xhr.DONE) {
            if (xhr.status == 200) {
                let response = JSON.parse(xhr.responseText)
                if (response.found === true) {
                    loadedBooks = []
                    for (let book of response.matching_books) {
                        loadedBooks.push(book)
                    }

                    searchAreaOverlay.classList.remove('show')
                    document.body.style.overflowY = 'auto'
                    scrollTo(0, 600)
                    booksContainer.parentElement.querySelector('p').remove()
                    booksContainer.innerHTML = ''
                    loadMoreBooksBtn.querySelector('span').innerHTML = 'Reload books'
                    loadMoreBooksBtn.setAttribute('data-status', 'reload')
                    updateProductsList(loadedBooks, response.shopping_cart_number, shoppingCartBtn, booksContainer, userStatus, shoppingCart)
                    setCardsEvents(csrfToken, shoppingCartBtn, productDetailsModal, null, userStatus)
                    searchInput.value = ''
                } else {
                    searchAreaOverlay.classList.remove('show')
                    document.body.style.overflowY = 'auto'
                    scrollTo(0, 600)
                    let notFoundMsg = document.createElement('p')
                    notFoundMsg.innerHTML = `Was not founded books with title like: "${searchValue.search_value}"`
                    notFoundMsg.classList.add('text-center', 'text-uppercase', 'fw-bold')
                    booksContainer.parentElement.insertBefore(notFoundMsg, booksContainer.parentElement.childNodes[3])
                    searchInput.value = ''
                }
            }
        }
    }

    xhr.send(JSON.stringify(searchValue))
})

shoppingCartBtn.addEventListener('click', () => { showShoppingCart(shoppingCartModal, shoppingCartBtn, csrfToken, userStatus) })

loadMoreBooksBtn.onclick = () => {
    if (loadMoreBooksBtn.getAttribute('data-status') === 'load') {
        let booksXhr = new XMLHttpRequest()
        booksXhr.open('POST', '/load-books/')
        booksXhr.setRequestHeader('Content-Type', 'application/json')
        booksXhr.setRequestHeader('X-CSRFToken', csrfToken)
        booksXhr.onreadystatechange = () => {
            if (booksXhr.readyState == booksXhr.DONE) {
                if (booksXhr.status == 200) {
                    let response = JSON.parse(booksXhr.responseText)
                    if (response.books.length > 0) {
                        response.books.forEach(book => { loadedBooks.push(book) })
                        if (response.shoppingCartNumber > 0) {
                            response.shoppingCart.forEach(cart => { shoppingCart.push(cart) })
                        }

                        updateProductsList(response.books, response.shoppingCartNumber, shoppingCartBtn, booksContainer, userStatus, shoppingCart)
                        setCardsEvents(csrfToken, shoppingCartBtn, productDetailsModal, null, userStatus)
                    } else {
                        alert('All books registered was already loaded!')
                    }
                } else {
                    console.error(`${booksXhr.status}: Was not possible to load books`)
                }
            }
        }

        let bookIds = []
        for (let book of loadedBooks) {
            bookIds.push(book.id)
        }

        booksXhr.send(JSON.stringify({requestedBy: 'home_more', loadedBooks: bookIds}))
    } else if (loadMoreBooksBtn.getAttribute('data-status') === 'reload') {
        let booksRequest = new XMLHttpRequest()
        booksRequest.open('POST', '/load-books/')
        booksRequest.setRequestHeader('Content-Type', 'application/json')
        booksRequest.setRequestHeader('X-CSRFToken', csrfToken)
        booksRequest.onreadystatechange = () => {
            if (booksRequest.readyState == booksRequest.DONE) {
                if (booksRequest.status == 200) {
                    let response = JSON.parse(booksRequest.responseText)
                    loadedBooks = []
                    response.books.forEach(book => { loadedBooks.push(book) })
                    if (response.shoppingCartNumber > 0) {
                        response.shoppingCart.forEach(cart => { shoppingCart.push(cart) })
                    }

                    booksContainer.parentElement.querySelector('p').remove()
                    booksContainer.innerHTML = ''
                    loadMoreBooksBtn.setAttribute('data-status', 'load')
                    loadMoreBooksBtn.querySelector('span').textContent = 'Load more books'
                    updateProductsList(loadedBooks, response.shoppingCartNumber, shoppingCartBtn, booksContainer, userStatus, shoppingCart)
                    setCardsEvents(csrfToken, shoppingCartBtn, productDetailsModal, null, userStatus)
                    scrollTo(0, 600)
                } else {
                    console.error(`Request failed! Code: ${booksRequest.status}`)
                }
            }
        }

        booksRequest.send(JSON.stringify({requestedBy: 'home'}))
    }
}
