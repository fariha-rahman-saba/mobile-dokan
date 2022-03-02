const searchResult = document.getElementById("searchResult");
const detailView = document.getElementById("detailView");

const searchButton = () => {
    const input = document.getElementById("input-value");
    const inputValue = input.value;
    const error = document.getElementById("error");

    if (inputValue == "") {
        error.innerText = "Please give phone name";
        input.value = "";
        searchResult.innerHTML = "";
    }
    else {
        searchResult.innerHTML = "";

        fetch(`https://openapi.programming-hero.com/api/phones?search=${inputValue}`)
            .then(res => res.json())
            .then(data => phoneDisplay(data.data.slice(0, 20)))

        input.value = "";
        error.innerHTML = ""
    }
}

const phoneDisplay = (phones) => {

    if (phones.length == 0) {
        error.innerText = "No Phone Found!";
    }

    for (const phone of phones) {

        const div = document.createElement("div");
        div.classList.add("col-lg-4");

        div.classList.add("g-5");
        div.innerHTML = `
            <div class="card" style="width: 18rem;">
                <img src="${phone.image}"  class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text">${phone.brand}</p>
                    <button onclick="phoneDetails('${phone.slug}')" class="btn btn-primary">Details</button>
                </div>
            </div>
        `
        searchResult.appendChild(div)
    }
}

const phoneDetails = (id) => {

    fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
        .then(res => res.json())
        .then(data => {

            const div = document.createElement("div");

            const allSensors = [...data.data.mainFeatures.sensors];
            detailView.innerHTML = "";
            div.innerHTML = `
                <div class="card phone-detail-section text-center my-auto" style="width: 36rem;">
                    <img src="${data.data.image}" class="card-img-top phone-detail-img" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">Release Date: ${data.data.releaseDate}</h5>
                        <p class="card-text">Storage: ${data.data.mainFeatures.storage}</p>
                        <p class="card-text">Display: ${data.data.mainFeatures.displaySize}</p>
                        <p class="card-text">Memory: ${data.data.mainFeatures.memory}</p>
                        
                        <p class="card-text">Sensors: ${allSensors}</p>
                        
                        

                        <p class="card-text">NFC: ${data.data.others.NFC}</p>
                        <p class="card-text">Radio: ${data.data.others.Radio}</p>
                        <p class="card-text">USB: ${data.data.others.USB}</p>
                    </div>
                </div>
                
            `

            detailView.appendChild(div);

        }
        )
}