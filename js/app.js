const searchResult = document.getElementById("searchResult");
const detailView = document.getElementById("detailView");

const searchButton = () => {
    const input = document.getElementById("input-value");
    const inputValue = input.value;


    // main.innerHTML = "";

    // fetch(`https://openapi.programming-hero.com/api/phones?search=${inputValue}`)
    //     .then(res => res.json())
    //     .then(data => phoneDisplay(data.data.slice(0, 20)))

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

    // console.log(phones);
    for (const phone of phones) {
        // console.log(phone);
        const div = document.createElement("div");
        div.classList.add("col-lg-4");
        // div.classList.add("mb-5");
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
            const selectedPhone = data.data;
            console.log(selectedPhone);

            const div = document.createElement("div");
            detailView.innerHTML = "";
            div.innerHTML = `
                <div class="card phone-detail" style="width: 36rem;">
                    <img src="${selectedPhone.image}" class="card-img-top phone-detail" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${selectedPhone.releaseDate}</h5>
                        <p class="card-text">${selectedPhone.mainFeatures}</p>
                        <p class="card-text">${selectedPhone.sensors}</p>
                        <p class="card-text">${selectedPhone.others}</p>
                    </div>
                </div>
            `
            detailView.appendChild(div);

            phoneDisplay(data);
        })

}