import { updateProductsList, setCardsEvents, shoppingCart, updateTotalParagraph } from "./base.js"

let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
let userStatus = document.querySelector('meta[name="user-status"]').getAttribute('content').toLowerCase()
let checkoutForm = document.querySelector('form#checkout-form')
let formControls = document.querySelectorAll('.form-control')
let formSelect = document.querySelector('.form-select')
let booksContainer = document.querySelector('div#books-container')
let loadedBooks = new Array()
let totalParagraph = document.querySelector('div#checkout-container').querySelectorAll('strong')[0]
let productDetailsModal = document.querySelector('div#product-details-modal')

formControls.forEach(formControl => {
    formControl.addEventListener('focus', () => {
        formControl.parentElement.classList.add('active')
    })

    formControl.addEventListener('blur', () => {
        formControl.parentElement.classList.remove('active')
    })
})

formSelect.addEventListener('focus', () => {
    formSelect.parentElement.classList.add('active')
})

formSelect.addEventListener('blur', () => {
    formSelect.parentElement.classList.remove('active')
})

onload = () => {
    let xhr = new XMLHttpRequest()
    xhr.open('POST', '/load-books/')
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.setRequestHeader('X-CSRFToken', csrfToken)
    xhr.onreadystatechange = () => {
        if (xhr.readyState == xhr.DONE) {
            if (xhr.status == 200) {
                let response = JSON.parse(xhr.responseText)
                response.books.forEach(book => { loadedBooks.push(book) })
                response.shoppingCart.forEach(cart => { shoppingCart.push(cart) })
                updateProductsList(loadedBooks, response.shoppingCartNumber, null, booksContainer, userStatus)
                setCardsEvents(csrfToken, null, productDetailsModal, totalParagraph, userStatus)
                updateTotalParagraph(totalParagraph)
            } else {
                console.error(`Request failed! Code: ${xhr.status}`)
            }
        }
    }

    xhr.send(JSON.stringify({requestedBy: 'checkout'}))
}

checkoutForm.onsubmit = event => {
    event.preventDefault()
    let checkoutXhr = new XMLHttpRequest()
    let clientDatas = {coupon: checkoutForm.querySelector('select#coupon-field').value}
    checkoutXhr.open('POST', '/sale/')
    checkoutXhr.setRequestHeader('Content-Type', 'application/json')
    checkoutXhr.setRequestHeader('X-CSRFToken', csrfToken)
    checkoutXhr.onreadystatechange = () => {
        if (checkoutXhr.readyState == checkoutXhr.DONE) {
            if (checkoutXhr.status == 200) {
                let checkoutResponse = JSON.parse(checkoutXhr.responseText)
                if (checkoutResponse.success == true) {
                    location = '/thank-u/'
                }
            }
        }
    }

    checkoutXhr.send(JSON.stringify({
        shopping_cart: shoppingCart,
        client_datas: clientDatas
    }))
}
