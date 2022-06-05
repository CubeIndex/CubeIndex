function togglePopupIndex(popup_id) {
    document.getElementById(`index-popup-container-div${popup_id}`).classList.toggle("active");
}
function togglePopupLanding() {
    document.getElementById(`landing-popup-container-div`).classList.toggle("active");
}
function padDigits(number, digits) {
    return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number;
}

function fetchDataSingle() {

    const querystring = window.location.search;
    console.log(querystring);
    var setdnum = new URLSearchParams(querystring);
    var setnum = setdnum.get("fig");
    console.log(setnum);
    fetch(`https://rebrickable.com/api/v3/lego/minifigs/${setnum}/?key=2aca99226ffb9e3ad4b7e531f1b97764`)
        .then(response => {
            if (!response.ok) {
                throw Error("ERROR");
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            const htmlcode = `
            <div class="user" >
            <p><img src="${data.set_img_url}" alt="${data.name}"/></p>
            </div>
            `
            console.log(htmlcode);
            document.querySelector("#sets-set-img").innerHTML = htmlcode;

        });
        
};
function fetchParts() {
    const querystring = window.location.search;
    console.log(querystring);
    var setdnum = new URLSearchParams(querystring);
    var setnum = setdnum.get("fig");
    console.log(setnum);
    fetch(`https://rebrickable.com/api/v3/lego/minifigs/${setnum}/parts/?key=2aca99226ffb9e3ad4b7e531f1b97764`)
        .then(response => {
            if (!response.ok) {
                throw Error("ERROR");
            }
            return response.json();
        })
        .then(data => {
            console.log(data.results);
            const html = data.results.map
                (partuser => {
                    return `
            <div class="legoParts" >
            <p><img src="${partuser.part.part_img_url}" alt="${partuser.part.name}" width = "150px"/></p>
            </div>
            `;
                })
                .join(" ");
            console.log(html);
            document.querySelector("#minifigParts").insertAdjacentHTML("afterbegin", html);
            console.log(partuser.part.name);

        })
        .catch(error => {
            console.log(error);
        });
}
