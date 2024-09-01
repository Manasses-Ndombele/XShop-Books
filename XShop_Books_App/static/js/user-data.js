let changePasswdForm = document.querySelector('form#change-password-form')
let changePasswdBtn = document.querySelector('button#change-password-btn')
let modalBodyChangePasswd = changePasswdForm.parentElement
let saveUserDataBtn = document.querySelector('button#save-user-data-btn')
let updateUserInfoForm = document.querySelector('form#update-user-info-form')
let operationStatusModal = document.querySelector('div#operation-status-modal')
let operationStatusModalBtn = document.querySelector('button#operation-status-modal-btn')

changePasswdBtn.addEventListener('click', () => {
    let xhr = new XMLHttpRequest()
    let oldPasswordField = changePasswdForm.querySelector('input#old-password-field').value
    let newPasswordField = changePasswdForm.querySelector('input#new-password-field').value
    let form = {
        old_password: oldPasswordField,
        new_password: newPasswordField
    }

    xhr.open('UPDATE', '/account/change-password/')
    xhr.setRequestHeader('X-CSRFToken', changePasswdForm.querySelector('input[name="csrfmiddlewaretoken"]').value)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.onreadystatechange = () => {
        if (xhr.readyState == xhr.DONE) {
            if (xhr.status == 200) {
                let response = JSON.parse(xhr.responseText)
                if (response.success === true) {
                    modalBodyChangePasswd.classList.add('d-flex', 'align-items-center', 'flex-column')
                    modalBodyChangePasswd.innerHTML = `<i class="bi bi-check-circle"></i><p>Your password was changed successfully!</p>`
                } else {
                    modalBodyChangePasswd.classList.add('d-flex', 'align-items-center', 'flex-column')
                    let messageError = document.createElement('p')
                    messageError.classList.add('text-danger', 'text-uppercase')
                    messageError.innerText = 'Your old password is invalid'
                    modalBodyChangePasswd.appendChild(messageError)
                    modalBodyChangePasswd.nextElementSibling.innerHTML = ''
                }
            } else {
                alert(`${xhr.status}: Was not possible to change your password now, try again later!`)
            }
        }
    }

    xhr.send(JSON.stringify(form))
})

saveUserDataBtn.addEventListener('click', () => {
    if (updateUserInfoForm.getAttribute('data-status') === 'disabled') {
        updateUserInfoForm.querySelectorAll('input').forEach(field => field.removeAttribute('readonly'))
        updateUserInfoForm.setAttribute('data-status', 'nondisabled')
        saveUserDataBtn.querySelector('span').innerText = 'Apply'
        updateUserInfoForm.querySelector('input#username-field').focus()
    } else {
        let xhr = new XMLHttpRequest()
        let usernameField = updateUserInfoForm.querySelector('input#username-field')
        let emailField = updateUserInfoForm.querySelector('input#email-field1')
        let fields = {
            username: usernameField.value,
            email: emailField.value
        }

        xhr.open('UPDATE', '/account/update-user-info/')
        xhr.setRequestHeader('X-CSRFToken', updateUserInfoForm.querySelector('input[name="csrfmiddlewaretoken"]').value)
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.onreadystatechange = () => {
            if (xhr.readyState == xhr.DONE) {
                if (xhr.status == 200) {
                    let response = JSON.parse(xhr.responseText)
                    if (response.success === true) {
                        usernameField.value = response.username
                        emailField.value = response.email
                        operationStatusModal.querySelector('h4.modal-title').innerHTML = 'SUCCESS!'
                        operationStatusModal.querySelector('div.modal-body').innerHTML = `<i class="bi bi-check-circle"></i><p class="text-center">${response.message}</p>`
                    } else {
                        operationStatusModal.querySelector('h4.modal-title').innerHTML = 'ERROR!'
                        operationStatusModal.querySelector('div.modal-body').innerHTML = `<i class="bi bi-x-circle"></i><p class="text-center">${response.message}</p>`
                    }

                    operationStatusModalBtn.click()
                } else {
                    alert(`${xhr.status}: Was not possible to update the data of your account, try again later!`)
                }
            }
        }

        xhr.send(JSON.stringify(fields))
    }
})
