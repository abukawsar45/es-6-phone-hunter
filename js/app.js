const phoneHunter = async(searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url)
    const data = await res.json()
    displayPhone(data.data, dataLimit)
}
const displayPhone = (phones, dataLimit) => {
    // console.log(phones)
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';
    // display 00 phones only
    // phones = phones.slice(0,3);
    const showAll = document.getElementById('show-all');
    if(dataLimit && phones.length > 9){
        phones = phones.slice(0,9);
        showAll.classList.remove('d-none')
    }
    else{
        showAll.classList.add('d-none')
    }   
    // display no phone found
    const noPhone = document.getElementById('display-none')
    if(phones.length === 0){
        noPhone.classList.remove('d-none')
    }
    else{
        noPhone.classList.add('d-none')
    }
    phones.forEach(phone => {
        const newDiv = document.createElement('div');
    newDiv.classList.add('col')
    newDiv.innerHTML = `
    <div class="card h-100">
    <img src="${phone.image}" class="card-img-top p-5" alt="...">
    <div class="card-body">
      <h5 class="card-title">c</h5>
      <p>Brand: ${phone.brand}</p>
      <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      <button id="phone-details" type="button" onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#loadPhoneDetails">Details</button>
      </div>
      </div>
      `;
      phoneContainer.appendChild(newDiv)
      toggleSpinner(false)
        
    })
    // stop loader
    toggleSpinner(false)
}

// phone details
const loadPhoneDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url)
    const data = await res.json()
    displayPhoneDetails(data.data)
}
const displayPhoneDetails = phone => {
    console.log(phone)
    const modalTitle = document.getElementById('loadPhoneDetailsLabel');
    modalTitle.innerText = phone.name
}
// handle search button click
document.getElementById('search-button').addEventListener('click', function() {
    // start loader
    ProcessSearch(9)
})
// search button handleer wit "Enter Key"
document.getElementById("search-input-field").addEventListener("keyup", function(event) {
    if (event.key === 'Enter') {
        ProcessSearch(9)
    }
});

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if(isLoading) {
        loaderSection.classList.remove('d-none')
    }
    else{
        loaderSection.classList.add('d-none')
    }
}
// common function _______________________________________________common
const ProcessSearch = (dataLimit) => {
    toggleSpinner(true)
    const inputField = document.getElementById('search-input-field');
    const inputText = inputField.value;
    console.log(inputText,dataLimit)
    phoneHunter(inputText,dataLimit);
}
// show all button handler
// not the best way to load show all
document.getElementById('btn-show-all').addEventListener('click', function (){
    // console.log('idk')
    ProcessSearch()
})
phoneHunter('sa')