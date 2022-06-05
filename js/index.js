
var userInputNumber;
var ordenencontainer;

window.addEventListener("load", function () {
    // get button object
    let userNumberBtn = document.querySelector('#userNumberBtn');

    ordenencontainer = document.getElementById("ordencont");

    // listen for button click
    userNumberBtn.addEventListener("click", function () {
        userInputNumber = document.querySelector('#userNumberVal').value;

        // call naar fetchDataIndex
        kaders();
    })

});

function blacklist(fig_num) {
    // do the blacklist things here

    // get textarea id 
    let fig_num_ta = `textarea-${fig_num}`

    // taVal is value from textarea
    let taVal = document.getElementById(fig_num_ta).value;
    
    console.log(`blacklist minifig: ${fig_num}`)
    console.log("textarea value: " + taVal);


    // remove div from mini fig
    document.getElementById(`ordenendiv-${fig_num}`).remove();
    // close popup not needed because div gets removed
    // togglePopup(fig_num);
}

function whitelist(fig_num,fig_set){
    // when clicked on set image
    console.log(`whitelisted minifig: ${fig_num} with set ${fig_set}`)
    // get fig num and set num
    // haal single item op met function

    // pak data en steek in databank
    //verwijder set uit lijst op pagina
    skipSet(fig_num);
}

function skipSet(fig_num){

    console.log(`skipped fig: ${fig_num}`)
    // remove div from mini fig
    document.getElementById(`ordenendiv-${fig_num}`).remove();

}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function kaders() {

    // zolang sets niet af zijn
    let setCounter = 0;
    let setNumber = 1; // moet eigenlijk 1 zijn met while loop 

    // pagina leegmaken
    ordenencontainer.innerHTML = "";
    while (setCounter < 4) {

        // haal data op en controlleer voor set aantal
        let succes = await fetchDataIndex(setNumber);
        await sleep(100);
        console.log(succes)
        //increment
        if (succes) {
            setCounter++;
            setNumber++;
            console.log("succes x")
        } else {
            setNumber++;
            console.log("failure x")
        }
    }

}
async function fetchDataIndex(fig_num) {
    let succes = true;
    let sets;
    let setscount;
    /*
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
     */
    let fig_num_format = padDigits(fig_num, 6);

    // get sets from minifigs and store urls in array
    await fetch(`https://rebrickable.com/api/v3/lego/minifigs/fig-${fig_num_format}/sets/?key=2aca99226ffb9e3ad4b7e531f1b97764`)
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data)
        setscount = data.count;
        // setcount bigger than 1
        if (setscount <= 1) {
            succes = false;
            return;
        }
        // do stuff
        sets=data.results
    });
    
    if (!succes) return succes;


    // get minifig image
    await fetch(`https://rebrickable.com/api/v3/lego/minifigs/fig-${fig_num_format}/?key=2aca99226ffb9e3ad4b7e531f1b97764`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            //console.log(data.results);

            //  count of sets
            console.log(data)

            


            /*
             <p><img src="${data.set_img_url}" alt="${data.name}"/></p>
             <p>Name: ${data.set_num}</p>
             <p>Email: ${data.name}</p>
             </div>
             */
            let setsHTML = "";
            let amountOfSetsShowed = 4;
            for (let j=0; j < setscount && j < amountOfSetsShowed; j++){

                setsHTML+=`<img src="${sets[j].set_img_url}" onClick="whitelist(${fig_num},${j})">`
            }

            let stukjeHTML = `
        <div class="ordenen" id=ordenendiv-${fig_num}>

            <div class="popup" id="popup-${fig_num}">
                <div class="overlay">

                </div>
                <div class="content">
                    <div class="close-btn" onclick="togglePopup(${fig_num})">&times;
                    </div>
                    <h3>
                        Geef uw reden voor blacklisting.
                    </h3>
                    <textarea rows="5" cols="50" name="comment" form="usrform" id="textarea-${fig_num}">

                    </textarea>
                    <br>
                    <button onclick="blacklist(${fig_num})">
                        Submit
                    </button>
                    <button onclick="togglePopup(${fig_num})">
                        Cancel
                    </button>
                </div>
            </div>
            <img class="indexMinifig" src="${data.set_img_url}">
            <br>
            <div class="indexSets">`
            +
            setsHTML
            +     
            `
            </div>
            <br>
            <button type="button" onclick="togglePopup(${fig_num})">
                Blacklist
            </button>
            <button type="button" onclick="skipSet(${fig_num})">
                Skip
            </button>
        </div>
        ` // WATCH OUT FOR ACCIDENTAL DELETION

            // vul kader met data
            ordenencontainer.innerHTML += stukjeHTML;

            succes = true;
        }

        );
    // return true or false based on variable
    return succes
}





/*
function fetchDataSingle1() {

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
function fetchData1() {
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
}*//*
fetchDataSingle1();
fetchData1();*/

