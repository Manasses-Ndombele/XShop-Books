let registerForm = document.querySelector('form#register-form')

registerForm.addEventListener('submit', event => {
    event.preventDefault()
    let password = document.querySelector('input#password-field')
    let passwordConf = document.querySelector('input#password-conf-field')
    function validateFormFields() {
        let passwordRegexp = /[a-z]+[A-Z]+(\-|\/|@|&|\$|\.|_)+[0-9]+/gi
        if (passwordRegexp.test(password.value) === false || password.value.length < 8) {
            return {error: true, field: password}
        } else if (passwordConf.value !== password.value) {
            return {error: true, field: passwordConf}
        } else {
            return {error: false}
        }
    }

    let formValidation = validateFormFields()
    if (formValidation.error === true) {
        [password, passwordConf].forEach(i => i.classList.remove('is-invalid'))
        formValidation.field.classList.add('is-invalid')
    } else {
        registerForm.submit()
    }
})
