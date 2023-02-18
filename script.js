const form = document.querySelector('.form');
const inputs = document.querySelectorAll('.form-element input');
const username = document.getElementById('username');
const countrySelect = document.getElementById('country');
const password = document.getElementById('password');
const matchingPassword = document.getElementById('confirm-password');
const checkTerms = document.querySelector('#confirm-terms');
const formSubmit = document.querySelector('.form-submit');

countrySelect.addEventListener('click', async ()=> {
    try {
        const res = await fetch('https://restcountries.com/v3.1/all'); 
        const data = await res.json();
        let countries = [];
        let countryList = '';
        data.forEach(element => {
            countries.push(element.name.common); // put all countries in array
        })
        countries.sort(); // so we can sort it alphabetically
        countries.forEach(country => { // then each country
            countryList += `<option value="${country}">${country}</option>`; // add as an option to country list
        })
        countrySelect.innerHTML = countryList; // add country list to select country HTML element
    }
    catch(error) {
        alert('Country list error. Please reload form.')
    }
})

form.addEventListener('submit', (e)=> {
    e.preventDefault();
    validateInputs();
    validateCountry();
    validateTerms();
    validatePassword();
    checkMatchingPasswords();

    // Check if all inputs are valid before Form Submit
    const inputCount = inputs.length;
    let validInputs = 0;
    for (let i = 0; i < inputCount; i++) {
        const input = inputs[i];
        if (input.parentElement.className === 'form-element valid') {
          validInputs++;
        } else {
          showError(input);
          break;
        }
    }
    // if all valid, show success message
    if(inputCount === validInputs) {
        formSubmit.classList.add('success');
        setTimeout(() => {
            formSubmit.classList.remove('success');
          }, 3000)
    }

})

function validateInputs() {
    inputs.forEach(input => {    
        if(!input.value) {
            showError(input);
        }
        else {
            showValid(input);
        }
    })
}

function validateCountry() {
    if(!countrySelect.value) {
        showError(countrySelect);
    }
    else{
        showValid(countrySelect);
    }    
}

function validateTerms() {
    if(!checkTerms.checked) {
        showError(checkTerms);
    }
    else{
        showValid(checkTerms);
    }    
}

function validatePassword() {
    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
    if(!password.value.match(passRegex)) {
        password.parentElement.className = 'form-element error';
    }
}

function checkMatchingPasswords() {
    if(password.value != matchingPassword.value) {
        matchingPassword.parentElement.className = 'form-element error';
    }
}

function showError(el) {
    const formEl = el.parentElement;
    formEl.className = 'form-element error';
}

function showValid(el) {
    const formEl = el.parentElement;
    formEl.className = 'form-element valid';
}
