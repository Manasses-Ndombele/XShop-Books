var productsIds = new Array()
var shoppingCartTotal = 0
var productShowed = null
export let shoppingCart = new Array()
let shoppingCartPrices = []

export function updateProductsList(products, shoppingCartNumber, shoppingCartBtn, booksContainer, userStatus) {
    for (var product of products) {
        var card = document.createElement('div')
        card.classList.add('card')
        card.id = `card-${product.id}`
        var cardImgTop = document.createElement('div')
        cardImgTop.classList.add('card-img-top', 'd-flex', 'justify-content-center', 'py-4')
        card.appendChild(cardImgTop)
        var img = document.createElement('img')
        img.src = product.coverImage
        img.alt = 'Livro da XShop Books'
        cardImgTop.appendChild(img)
        var cardBody = document.createElement('div')
        cardBody.classList.add('card-body', 'd-flex', 'flex-column', 'justify-content-between')
        card.appendChild(cardBody)
        var cardTitle = document.createElement('h2')
        cardTitle.classList.add('card-title')
        cardTitle.textContent = product.title
        cardBody.appendChild(cardTitle)
        var p = document.createElement('p')
        p.textContent = `${product.price} US$`.replace('.', ',')
        cardBody.appendChild(p)
        var saveProductMethods = document.createElement('div')
        saveProductMethods.classList.add('save-product-methods', 'd-flex', 'justify-content-between')
        var favBtn = document.createElement('button')
        favBtn.classList.add('fav-btn', 'btn-icon')
        var saveBtn = document.createElement('button')
        saveBtn.classList.add('save-btn', 'btn-icon')
        if (userStatus == 'true') {
            if (product.saved === true) {
                if (product.savedCategories.length == 1) {
                    if (product.savedCategories[0] == 'favorite') {
                        favBtn.setAttribute('data-status', 'added')
                        favBtn.innerHTML = '<i class="bi bi-heart-fill"></i>'
                        saveBtn.innerHTML = '<i class="bi bi-bookmark"></i>'
                        saveBtn.setAttribute('data-status', 'none')
                    } else if (product.savedCategories[0] == 'saved') {
                        saveBtn.setAttribute('data-status', 'added')
                        saveBtn.innerHTML = '<i class="bi bi-bookmark-check-fill"></i>'
                        favBtn.setAttribute('data-status', 'none')
                        favBtn.innerHTML = '<i class="bi bi-heart"></i>'
                    }
                } else if (product.savedCategories.length == 2) {
                    favBtn.setAttribute('data-status', 'added')
                    favBtn.innerHTML = '<i class="bi bi-heart-fill"></i>'
                    saveBtn.setAttribute('data-status', 'added')
                    saveBtn.innerHTML = '<i class="bi bi-bookmark-check-fill"></i>'
                }
            } else if (product.saved === false) {
                favBtn.setAttribute('data-status', 'none')
                favBtn.innerHTML = '<i class="bi bi-heart"></i>'
                saveBtn.innerHTML = '<i class="bi bi-bookmark"></i>'
                saveBtn.setAttribute('data-status', 'none')
            }
        } else {
            favBtn.setAttribute('data-status', 'none')
            favBtn.innerHTML = '<i class="bi bi-heart"></i>'
            saveBtn.innerHTML = '<i class="bi bi-bookmark"></i>'
            saveBtn.setAttribute('data-status', 'none')
        }

        saveProductMethods.appendChild(favBtn)
        saveProductMethods.appendChild(saveBtn)
        cardBody.appendChild(saveProductMethods)
        var numberOfUnitsContainer = document.createElement('div')
        numberOfUnitsContainer.classList.add('number-of-units-container', 'd-flex', 'align-items-center', 'gap-3')
        numberOfUnitsContainer.setAttribute('data-max-stock', product.inStock)
        var productId = product.id
        var minusBookBtn = document.createElement('button')
        minusBookBtn.type = 'button'
        minusBookBtn.classList.add('minus-book-btn', 'rounded-circle')
        minusBookBtn.innerHTML = '<i class="bi bi-dash-lg"></i>'
        var numberOfUnits = document.createElement('input')
        numberOfUnits.type = 'number'
        numberOfUnits.name = 'number-of-units'
        numberOfUnits.classList.add('number-of-units-field', 'form-control', 'py-1')
        numberOfUnits.value = 0
        numberOfUnits.readOnly = true
        var plusBookBtn = document.createElement('button')
        plusBookBtn.type = 'button'
        plusBookBtn.classList.add('plus-book-btn', 'rounded-circle')
        plusBookBtn.innerHTML = '<i class="bi bi-plus-lg"></i>'
        numberOfUnitsContainer.appendChild(minusBookBtn)
        numberOfUnitsContainer.appendChild(numberOfUnits)
        numberOfUnitsContainer.appendChild(plusBookBtn)
        cardBody.appendChild(numberOfUnitsContainer)
        var cardActionsArea = document.createElement('div')
        cardActionsArea.classList.add('card-actions-area')
        cardActionsArea.classList.add('mt-4')
        var btnAction1 = document.createElement('button')
        btnAction1.type = 'button'
        if (shoppingCartNumber > 0) {
            shoppingCart.forEach(cart => {
                if (productId == cart.product) {
                    btnAction1.classList.add('add-to-cart-btn', 'btn-system', 'w-100', 'mb-3', 'p-2', 'rounded-3')
                    btnAction1.setAttribute('data-status', 'added')
                    btnAction1.innerHTML = '<i class="bi bi-cart-check-fill me-1"></i><span>Added</span>'
                    btnAction1.setAttribute('data-cart-index', String(productId - 1))
                    btnAction1.setAttribute('data-shop-cart', cart.id)
                }
            })

            if (btnAction1.getAttribute('data-status') === null) {
                btnAction1.classList.add('add-to-cart-btn', 'btn-system', 'w-100', 'mb-3', 'p-2', 'rounded-3')
                btnAction1.setAttribute('data-status', 'none')
                btnAction1.innerHTML = '<i class="bi bi-cart-plus-fill me-1"></i><span>Add to cart</span>'
                btnAction1.setAttribute('data-cart-index', String(productId - 1))
            }

            if (shoppingCartBtn !== null) {
                shoppingCartBtn.querySelector('span').textContent = shoppingCart.length
            }
        } else if (shoppingCartNumber == 0) {
            if (userStatus === 'true') {
                btnAction1.classList.add('add-to-cart-btn', 'btn-system', 'w-100', 'mb-3', 'p-2', 'rounded-3')
                btnAction1.setAttribute('data-status', 'none')
                btnAction1.innerHTML = '<i class="bi bi-cart-plus-fill me-1"></i><span>Add to cart</span>'
                btnAction1.setAttribute('data-cart-index', String(productId - 1))
            } else {
                btnAction1.classList.add('btn-system', 'w-100', 'mb-3', 'p-2', 'rounded-3')
                btnAction1.innerHTML = '<i class="bi bi-cart-plus-fill me-1"></i><span>Add to cart</span>'
                btnAction1.setAttribute('disabled', '')
            }
        }

        var btnAction2 = document.createElement('button')
        btnAction2.type = 'button'
        btnAction2.classList.add('btn-system', 'w-100', 'mb-3', 'p-2', 'rounded-3', 'show-details-btn')
        btnAction2.innerHTML = '<i class="bi bi-info-circle-fill me-1"></i><span>More details</span>'
        var btnModal = document.createElement('button')
        btnModal.type = 'button'
        btnModal.setAttribute('data-bs-target', '#product-details-modal')
        btnModal.setAttribute('data-bs-toggle', 'modal')
        btnModal.classList.add('visually-hidden')
        cardActionsArea.appendChild(btnAction1)
        cardActionsArea.appendChild(btnAction2)
        cardActionsArea.appendChild(btnModal)
        cardBody.appendChild(cardActionsArea)
        booksContainer.appendChild(card)
        productsIds.push(product.id)
    }
}

function addToCart(addToCartBtn, shoppingCartBtn, csrfToken, cardId, totalParagraph, userStatus) {
    if (userStatus == 'true') {
        if (addToCartBtn.getAttribute('data-status') == 'none' || addToCartBtn.getAttribute('data-status') == 'removed') {
            var quantity = Number.parseInt(addToCartBtn.parentElement.previousElementSibling.querySelector('input').value)
            if (quantity <= 0) {
                alert('Choose quantity that you wisth to add to cart!')
            } else {
                var addToCartRequest = new XMLHttpRequest()
                addToCartRequest.open('POST', `/add-to-cart/`)
                addToCartRequest.setRequestHeader('X-CSRFToken', csrfToken)
                addToCartRequest.setRequestHeader('Content-Type', 'application/json')
                addToCartRequest.onreadystatechange = () => {
                    if (addToCartRequest.readyState == addToCartRequest.DONE) {
                        if (addToCartRequest.status == 200) {
                            var response = JSON.parse(addToCartRequest.responseText)
                            if (response.success == true) {
                                addToCartBtn.querySelector('i').classList.replace('bi-cart-plus-fill', 'bi-cart-check-fill')
                                addToCartBtn.querySelector('span').textContent = 'Added'
                                addToCartBtn.setAttribute('data-status', 'added')
                                if (shoppingCartBtn !== null) {
                                    shoppingCart.push({
                                        id: response.cart_id,
                                        product: cardId,
                                        quantity: quantity,
                                        price: Number(document.querySelector(`div#card-${cardId}`).querySelector('p').textContent.replace('US$', '').replace(',', '.'))
                                    })
    
                                    shoppingCartBtn.querySelector('span').textContent = Number(shoppingCartBtn.querySelector('span').textContent) + 1
                                }

                                if (totalParagraph !== null) {
                                    shoppingCart.push({
                                        id: response.cart_id,
                                        product: cardId,
                                        quantity: quantity,
                                        price: Number(document.querySelector(`div#card-${cardId}`).querySelector('p').textContent.replace('US$', '').replace(',', '.'))
                                    })
    
                                    updateTotalParagraph(totalParagraph)
                                }

                                addToCartBtn.setAttribute('data-shop-cart', response.cart_id)
                            }
                        } else {
                            console.error(`${addToCartRequest.status}: Was not possible add product to cart!`)
                        }
                    }
                }
    
                addToCartRequest.send(JSON.stringify({product: cardId, quantity: quantity}))
            }
        } else if (addToCartBtn.getAttribute('data-status') == 'added') {
            var removeToCartRequest = new XMLHttpRequest()
            removeToCartRequest.open('DELETE', `/remove-to-cart/${addToCartBtn.getAttribute('data-shop-cart')}/`)
            removeToCartRequest.setRequestHeader('X-CSRFToken', csrfToken)
            removeToCartRequest.setRequestHeader('Content-Type', 'application/json')
            removeToCartRequest.onreadystatechange = () => {
                if (removeToCartRequest.readyState == removeToCartRequest.DONE) {
                    if (removeToCartRequest.status == 200) {
                        var response = JSON.parse(removeToCartRequest.responseText)
                        if (response.success == true) {
                            addToCartBtn.querySelector('i').classList.replace('bi-cart-check-fill', 'bi-cart-plus-fill')
                            addToCartBtn.querySelector('span').textContent = 'Add to cart'
                            addToCartBtn.setAttribute('data-status', 'removed')
                            addToCartBtn.removeAttribute('data-shop-cart')
                            if (shoppingCartBtn !== null) {
                                shoppingCartBtn.querySelector('span').textContent = Number(shoppingCartBtn.querySelector('span').textContent) - 1
                            }

                            var shCart = shoppingCart
                            shoppingCart = []
                            shoppingCartPrices = []
                            shCart.forEach(cart => {
                                if (Number(cart.product) != cardId) {
                                    shoppingCart.push(cart)
                                    shoppingCartPrices.push(cart.price * cart.quantity)
                                }
                            })
    
                            shCart = []
                            if (totalParagraph !== null) {
                                updateTotalParagraph(totalParagraph)
                            }
                        }
                    }
                }
            }
    
            removeToCartRequest.send()
        }
    } else if (userStatus == 'false') {
        alert('Login or register to add products to cart clicking on icon of user in header')
    }
}

function toggleSaved(btn, category, csrfToken, productId) {
    let saveRequest = new XMLHttpRequest()
    if (btn.getAttribute('data-status') == 'none' || btn.getAttribute('data-status') == 'removed') {
        saveRequest.open('POST', '/add-saved/')
        saveRequest.setRequestHeader('X-CSRFToken', csrfToken)
        saveRequest.setRequestHeader('Content-Type', 'application/json')
        saveRequest.onreadystatechange = () => {
            if (saveRequest.readyState == saveRequest.DONE) {
                if (saveRequest.status == 200) {
                    let savedResponse = JSON.parse(saveRequest.responseText)
                    if (savedResponse.success === true) {
                        if (category == 'favorite') {
                            btn.querySelector('i').classList.replace('bi-heart', 'bi-heart-fill')
                        } else if (category == 'saved') {
                            btn.querySelector('i').classList.replace('bi-bookmark', 'bi-bookmark-check-fill')
                        }

                        btn.setAttribute('data-status', 'added')
                        btn.setAttribute('data-saved', savedResponse.saved)
                    } else {
                        console.error(`${saveRequest.status}: Não foi possível Add to cart o produto a lista dos desejos!`)
                    }
                }
            }
        }

        saveRequest.send(JSON.stringify({category: category, product: productId}))
    } else if (btn.getAttribute('data-status') == 'added') {
        saveRequest.open('DELETE', `/remove-saved/${btn.getAttribute('data-saved')}/`)
        saveRequest.setRequestHeader('X-CSRFToken', csrfToken)
        saveRequest.setRequestHeader('Content-Type', 'application/json')
        saveRequest.onreadystatechange = () => {
            if (saveRequest.readyState == saveRequest.DONE) {
                if (saveRequest.status == 200) {
                    let savedResponse = JSON.parse(saveRequest.responseText)
                    if (savedResponse.success === true) {
                        if (category == 'favorite') {
                            btn.querySelector('i').classList.replace('bi-heart-fill', 'bi-heart')
                        } else if (category == 'saved') {
                            btn.querySelector('i').classList.replace('bi-bookmark-check-fill', 'bi-bookmark')
                        }

                        btn.setAttribute('data-status', 'removed')
                        btn.removeAttribute('data-saved')
                    } else {
                        console.error(`${saveRequest.status}: Was not possible add product to wishes list!`)
                    }
                }
            }
        }

        saveRequest.send()
    }
}

export function setCardsEvents(csrfToken, shoppingCartBtn, productDetailsModal, totalParagraph, userStatus) {
    let cards = document.querySelectorAll('div.card')
    cards.forEach(card => {
        var cardId = Number(card.id.split('card-').join(''))
        var favBtn = card.querySelector('button.fav-btn')
        var saveBtn = card.querySelector('button.save-btn')
        favBtn.onclick = () => {
            if (userStatus == 'true') {
                toggleSaved(favBtn, 'favorite', csrfToken, cardId)
            } else if (userStatus == 'false') {
                alert('Login or register to add products do list of favorites of your account. Click on icon of user in header')
            }
        }

        saveBtn.onclick = () => {
            if (userStatus == 'true') {
                toggleSaved(saveBtn, 'saved', csrfToken, cardId)
            } else if (userStatus == 'false') {
                alert('Login or register to add products do list of saved of your account. Click on icon of user in header')
            }
        }

        var plusBookBtn = card.querySelector('button.plus-book-btn')
        var minusBookBtn = card.querySelector('button.minus-book-btn')
        minusBookBtn.onclick = () => {
            var numberOfUnitsContainer = card.querySelector('div.number-of-units-container')
            var numberOfUnitsField = numberOfUnitsContainer.querySelector('input.number-of-units-field')
            if (numberOfUnitsField.value > 0) {
                numberOfUnitsField.value--
            }
        }

        plusBookBtn.onclick = () => {
            var numberOfUnitsContainer = card.querySelector('div.number-of-units-container')
            var numberOfUnitsField = numberOfUnitsContainer.querySelector('input.number-of-units-field')
            if (numberOfUnitsField.value < Number(numberOfUnitsContainer.getAttribute('data-max-stock'))) {
                numberOfUnitsField.value++
            } else {
                alert('Max stock limit reached!')
            }
        }

        var cardActionsArea = card.querySelector('div.card-actions-area')
        let addToCartBtn = cardActionsArea.querySelectorAll('button.btn-system')[0]
        if (addToCartBtn.classList.contains('add-to-cart-btn')) {
            addToCartBtn.onclick = () => { addToCart(addToCartBtn, shoppingCartBtn, csrfToken, cardId, totalParagraph, userStatus) }
        }

        let showDetailsBtn = cardActionsArea.querySelector('button.show-details-btn')
        showDetailsBtn.onclick = () => {
            if (userStatus == 'true') {
                
            }
            var loadBookDetailsRequest = new XMLHttpRequest()
            loadBookDetailsRequest.open('POST', `/load-book-details/${cardId}/`)
            loadBookDetailsRequest.setRequestHeader('Content-Type', 'application/json')
            loadBookDetailsRequest.setRequestHeader('X-CSRFToken', csrfToken)
            loadBookDetailsRequest.onreadystatechange = () => {
                if (loadBookDetailsRequest.readyState == loadBookDetailsRequest.DONE) {
                    if (loadBookDetailsRequest.status == 200) {
                        var book = JSON.parse(loadBookDetailsRequest.responseText).book
                        var modalBody = productDetailsModal.querySelector('div.modal-body')
                        modalBody.innerHTML = ''
                        let heading5 = document.createElement('h5')
                        heading5.innerText = `Title: ${card.querySelector('h2.card-title').textContent}`
                        modalBody.appendChild(heading5)
                        let headings6 = [document.createElement('h6'), document.createElement('h6')]
                        headings6[0].innerText = `Subtitle: ${book.subtitle}`
                        modalBody.appendChild(headings6[0])
                        let paragraphs = []
                        for (let i = 0; i <= 6; i++) {
                            paragraphs.push(document.createElement('p'))
                        }

                        paragraphs[0].innerHTML = `<strong>Author:</strong> ${book.author}`
                        modalBody.appendChild(paragraphs[0])
                        paragraphs[1].innerHTML = `<strong>Release date:</strong> ${book.releaseDate}`
                        modalBody.appendChild(paragraphs[1])
                        paragraphs[2].innerHTML = `<strong>Editor:</strong> ${book.editor}`
                        modalBody.appendChild(paragraphs[2])
                        paragraphs[3].innerHTML = `<strong>Edition:</strong> ${book.edition}º`
                        modalBody.appendChild(paragraphs[3])
                        paragraphs[4].innerHTML = `<strong>In stock:</strong> ${card.querySelector('div.number-of-units-container').getAttribute('data-max-stock')}`
                        modalBody.appendChild(paragraphs[4])
                        headings6[1].innerText = 'Description:'
                        modalBody.appendChild(headings6[1])
                        paragraphs[5].innerText = book.description
                        modalBody.appendChild(paragraphs[5])
                        productShowed = card
                        let addToCartBtn = card.querySelector('button.add-to-cart-btn')
                        if (userStatus == 'true') {
                            if (addToCartBtn.getAttribute('data-status') == 'none' || addToCartBtn.getAttribute('data-status') == 'removed') {
                                modalBody.nextElementSibling.querySelector('button').innerHTML = '<i class="bi bi-cart-fill me-1"></i><span>Add to cart</span>'
                            } else if (addToCartBtn.getAttribute('data-status') == 'added') {
                                modalBody.nextElementSibling.querySelector('button').innerHTML = '<i class="bi bi-cart-check-fill me-1"></i><span>Added</span>'
                            }
                        } else if (userStatus == 'false') {
                            modalBody.nextElementSibling.querySelector('button').innerHTML = '<i class="bi bi-cart-fill me-1"></i><span>Add to cart</span>'
                            modalBody.nextElementSibling.querySelector('button').setAttribute('disabled', '')
                        }

                        showDetailsBtn.nextElementSibling.click()
                    } else {
                        console.error(`${loadBookDetailsRequest.status}: Was not possible show book details!`)
                    }
                }
            }

            loadBookDetailsRequest.send()
        }
    })

    let productDetailsModalBtn = productDetailsModal.querySelector('div.modal-footer').querySelector('button')
    productDetailsModalBtn.onclick = () => {
        let addToCartBtn = productShowed.querySelector('button.add-to-cart-btn')
        let cardId = Number(productShowed.id.split('card-').join(''))
        addToCart(addToCartBtn, shoppingCartBtn, csrfToken, cardId, null)
        productDetailsModalBtn.parentElement.parentElement.childNodes[1].querySelector('button').click()
    }
}

export function showShoppingCart(shoppingCartModal, shoppingCartBtn, csrfToken, userStatus) {
    if (userStatus == 'true') {
        let modalBody = shoppingCartModal.querySelector('.modal-body')
        let modalFooter = shoppingCartModal.querySelector('.modal-footer')
        modalBody.innerHTML = ''
        if (shoppingCart.length === 0) {
            modalBody.classList.add('d-flex', 'flex-column', 'align-items-center')
            modalBody.innerHTML = `<i class="bi bi-emoji-frown-fill"></i><p class="text-center">You don't have any products on cart, add products to cart to make purchases!</p>`
            modalFooter.innerHTML = ''
            shoppingCartBtn.nextElementSibling.click()
        } else {
            if (modalBody.classList.contains('d-flex', 'flex-column', 'align-items-center')) {
                modalBody.classList.remove('d-flex', 'flex-column', 'align-items-center')
            }

            let modalBodyTitle = document.createElement('h5')
            modalBodyTitle.classList.add('modal-body-title', 'mb-2', 'fw-bold')
            modalBody.appendChild(modalBodyTitle)
            let shoppingCartXhr = new XMLHttpRequest()
            shoppingCartXhr.open('POST', '/load-shopping-cart/')
            shoppingCartXhr.setRequestHeader('Content-Type', 'application/json')
            shoppingCartXhr.setRequestHeader('X-CSRFToken', csrfToken)
            shoppingCartXhr.onreadystatechange = () => {
                if (shoppingCartXhr.readyState == shoppingCartXhr.DONE) {
                    if (shoppingCartXhr.status == 200) {
                        shoppingCart = JSON.parse(shoppingCartXhr.responseText).shoppingCart
                        for (let product of shoppingCart) {
                            let productContainer = document.createElement('div')
                            productContainer.classList.add('product-container', 'd-flex', 'gap-3', 'py-2')
                            productContainer.id = `product-${product.id}`
                            let productImg = document.createElement('img')
                            productImg.src = product.coverImage
                            productImg.alt = `Image of book cover of XShop Books`
                            let productData = document.createElement('div')
                            productData.classList.add('product-data')
                            let productTitle = document.createElement('h5')
                            productTitle.textContent = product.title
                            let moreData = document.createElement('p')
                            moreData.innerHTML = `Price: ${product.price}$<br>Quantity: ${product.quantity}`
                            productContainer.appendChild(productImg)
                            productData.append(productTitle)
                            productData.appendChild(moreData)
                            productContainer.appendChild(productData)
                            modalBody.appendChild(productContainer)
                            shoppingCartPrices.push(product.price * product.quantity)
                        }

                        shoppingCartPrices.forEach(price => { shoppingCartTotal += price })
                        modalBodyTitle.textContent = `Total: ${String(shoppingCartTotal.toFixed(2)).replace('.', ',')} US$`      
                        shoppingCartTotal = 0
                        shoppingCartPrices = []
                        modalFooter.innerHTML = '<a href="/checkout/" class="w-100"><button type="button" class="w-100 btn-system py-2 px-3 my-2 rounded-3"><i class="bi bi-currency-dollar me-1"></i><span>Finalize purchase</span></button></a>'
                        shoppingCartBtn.nextElementSibling.click()
                    } else {
                        console.error(`${shoppingCartXhr.status}: Was not possible to load the cart products!`)
                    }
                }
            }

            shoppingCartXhr.send()
        }
    } else if (userStatus == 'false') {
        alert('Login or register to see products on cart and finalize purchases!')
    }
}

export function updateTotalParagraph(totalParagraph) {
    shoppingCartTotal = 0
    shoppingCart.forEach(cart => {
        shoppingCartPrices.push(cart.price * cart.quantity)
    })

    shoppingCartPrices.forEach(price => {
        shoppingCartTotal += price
    })

    totalParagraph.textContent = `${String(shoppingCartTotal.toFixed(2)).replace('.', ',')} US$`
    shoppingCartPrices = []
}
