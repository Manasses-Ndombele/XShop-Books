let formControls = document.querySelectorAll('.form-control')

formControls.forEach(formControl => {
    formControl.addEventListener('focus', () => {
        formControl.parentElement.classList.add('active')
    })

    formControl.addEventListener('blur', () => {
        formControl.parentElement.classList.remove('active')
    })
})
