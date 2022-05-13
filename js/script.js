function togglePopup() {
    document.getElementById("popup-1").classList.toggle("active");
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
            <p>Name: ${data.set_num}</p>
            <p>Email: ${data.name}</p>
            </div>
            `
            console.log(htmlcode);
            document.querySelector("#appsingle").innerHTML = htmlcode;

        });
};

function fetchData() {
    fetch("https://rebrickable.com/api/v3/lego/minifigs/?key=2aca99226ffb9e3ad4b7e531f1b97764")
        .then(response => {
            if (!response.ok) {
                throw Error("ERROR");
            }
            return response.json();
        })
        .then(data => {
            console.log(data.results);
            //data = object with all data, results = name of the array, slice = to pick a specific amount of objects in the array, map = to convert to HTML 
            const html = data.results.slice(0, 5).map
                (user => {
                    return `
            <div class="user" >
            <p><a href="minifigs.html?fig=${user.set_num}"><img src="${user.set_img_url}" alt="${user.name}"/></a> </p>
            <p>Name: ${user.set_num}</p>
            <p>Email: ${user.name}</p>
            </div>
            `;
                })
                .join(" ");
            console.log(html);
            document.querySelector("#app").insertAdjacentHTML("afterbegin", html);
        })
        .catch(error => {
            console.log(error);
        });
}

function fetchDataIndex1() {
    fetch("https://rebrickable.com/api/v3/lego/minifigs/?key=2aca99226ffb9e3ad4b7e531f1b97764")
    .then(response => {
        if (!response.ok) {
            throw Error("ERROR");
        }
        return response.json();
    })
    .then(data => {
        console.log(data.results);
        //data = object with all data, results = name of the array, slice = to pick a specific amount of objects in the array, map = to convert to HTML 
        const html = data.results.slice(0, 1).map
            (user => {
                return `
        <div class="user" >
        <p><img src="${user.set_img_url}" alt="${user.name}" width="500"/> </p>
        <p>Name: ${user.set_num}</p>
        </div>
        `;
            })
            .join(" ");
        console.log(html);
        document.querySelector("#app").insertAdjacentHTML("afterbegin", html);
    })
    fetch("https://rebrickable.com/api/v3/lego/minifigs/fig-000004/sets/?key=2aca99226ffb9e3ad4b7e531f1b97764")
        .then(response => {
            if (!response.ok) {
                throw Error("ERROR");
            }
            return response.json();
        })
        .then(data => {
            console.log(data.results);
            const htmlindex = data.results.map
                (index => {
                    return `
            <div class="user" >
            <p><img src="${index.set_img_url}" alt="${index.name}" width="500" /> </p>
            <p>Name: ${index.name}</p>
            </div>
            `;
                })
                .join(" ");
            console.log(htmlindex);
            document.querySelector("#appindex").insertAdjacentHTML("afterbegin", htmlindex);
        })
    }


