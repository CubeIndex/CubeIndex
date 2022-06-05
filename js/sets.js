function fetchDataSingleSet() {

    const querystring = window.location.search;
    console.log(querystring);
    var setidd = new URLSearchParams(querystring);
    var setid = setidd.get("set");
    console.log(setid);
    fetch(`https://rebrickable.com/api/v3/lego/sets/${setid}/?key=2aca99226ffb9e3ad4b7e531f1b97764`)
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
            <p><img src="${data.set_img_url}" alt="${data.name}" width = "350px"/></p>
            </div>
            `
            console.log(htmlcode);
            document.querySelector("#sets-set-img").innerHTML = htmlcode;

        });
        
};

fetchDataSingleSet();

function fetchSetFig() {
    const querystring = window.location.search;
    console.log(querystring);
    var setidd = new URLSearchParams(querystring);
    var setid = setidd.get("set");
    console.log(setid);
    fetch(`https://rebrickable.com/api/v3/lego/sets/${setid}/minifigs/?key=2aca99226ffb9e3ad4b7e531f1b97764`)
        .then(response => {
            if (!response.ok) {
                throw Error("ERROR");
            }
            return response.json();
        })
        .then(data => {
            console.log(data.results);
            const html = data.results.map
                (setuser => {
                    return `
            <div class="legoParts" >
            <p><img src="${setuser.set_img_url}" alt="${setuser.set_name}" width = "150px"/></p>
            </div>
            `;
                })
                .join(" ");
            console.log(html);
            document.querySelector("#sets-set-figs").insertAdjacentHTML("afterbegin", html);
        })
        .catch(error => {
            console.log(error);
        });
}
fetchSetFig();
