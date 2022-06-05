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
            <p><a href="minifigs.html?fig=${user.set_num}"><img src="${user.set_img_url}" alt="${user.name}" width = "150px"/></a> </p>
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

fetchData();

function fetchDataSet1() {
    fetch(`https://rebrickable.com/api/v3/lego/minifigs/fig-000001/sets/?key=2aca99226ffb9e3ad4b7e531f1b97764`)
    .then(response => {
        if (!response.ok) {
            throw Error("ERROR");
        }
        return response.json();
    })
    .then(data => {
        console.log(data.results);
        const htmlindex = data.results.slice(0, 1).map
            (index => {
                return `
        <div class="user" >
        <p><a href="sets.html?set=${index.set_num}"><img src="${index.set_img_url}" alt="${index.name}" width="150px" /> </a></p>
        <p>Name: ${index.name}</p>
        </div>
        `;
            })
            .join(" ");
        console.log(htmlindex);
        document.querySelector("#appindex1").insertAdjacentHTML("afterbegin", htmlindex);
    })
}
fetchDataSet1();

function fetchDataSet2() {
    fetch(`https://rebrickable.com/api/v3/lego/minifigs/fig-000002/sets/?key=2aca99226ffb9e3ad4b7e531f1b97764`)
    .then(response => {
        if (!response.ok) {
            throw Error("ERROR");
        }
        return response.json();
    })
    .then(data => {
        console.log(data.results);
        const htmlindex = data.results.slice(0, 1).map
            (index => {
                return `
        <div class="user" >
        <p><a href="sets.html?set=${index.set_num}"><img src="${index.set_img_url}" alt="${index.name}" width="150px" /> </a></p>
        <p>Name: ${index.name}</p>
        </div>
        `;
            })
            .join(" ");
        console.log(htmlindex);
        document.querySelector("#appindex2").insertAdjacentHTML("afterbegin", htmlindex);
    })
}
fetchDataSet2();
function fetchDataSet3() {
    fetch(`https://rebrickable.com/api/v3/lego/minifigs/fig-000003/sets/?key=2aca99226ffb9e3ad4b7e531f1b97764`)
    .then(response => {
        if (!response.ok) {
            throw Error("ERROR");
        }
        return response.json();
    })
    .then(data => {
        console.log(data.results);
        const htmlindex = data.results.slice(0, 1).map
            (index => {
                return `
        <div class="user" >
        <p><a href="sets.html?set=${index.set_num}"><img src="${index.set_img_url}" alt="${index.name}" width="150px" /> </a></p>
        <p>Name: ${index.name}</p>
        </div>
        `;
            })
            .join(" ");
        console.log(htmlindex);
        document.querySelector("#appindex3").insertAdjacentHTML("afterbegin", htmlindex);
    })
}
fetchDataSet3();
function fetchDataSet4() {
    fetch(`https://rebrickable.com/api/v3/lego/minifigs/fig-000004/sets/?key=2aca99226ffb9e3ad4b7e531f1b97764`)
    .then(response => {
        if (!response.ok) {
            throw Error("ERROR");
        }
        return response.json();
    })
    .then(data => {
        console.log(data.results);
        const htmlindex = data.results.slice(0, 1).map
            (index => {
                return `
        <div class="user" >
        <p><a href="sets.html?set=${index.set_num}"><img src="${index.set_img_url}" alt="${index.name}" width="150px" /> </a></p>
        <p>Name: ${index.name}</p>
        </div>
        `;
            })
            .join(" ");
        console.log(htmlindex);
        document.querySelector("#appindex4").insertAdjacentHTML("afterbegin", htmlindex);
    })
}
fetchDataSet4();
function fetchDataSet5() {
    fetch(`https://rebrickable.com/api/v3/lego/minifigs/fig-000005/sets/?key=2aca99226ffb9e3ad4b7e531f1b97764`)
    .then(response => {
        if (!response.ok) {
            throw Error("ERROR");
        }
        return response.json();
    })
    .then(data => {
        console.log(data.results);
        const htmlindex = data.results.slice(0, 1).map
            (index => {
                return `
        <div class="user" >
        <p><a href="sets.html?set=${index.set_num}"><img src="${index.set_img_url}" alt="${index.name}" width="150px" /> </a></p>
        <p>Name: ${index.name}</p>
        </div>
        `;
            })
            .join(" ");
        console.log(htmlindex);
        document.querySelector("#appindex5").insertAdjacentHTML("afterbegin", htmlindex);
    })
}
fetchDataSet5();
