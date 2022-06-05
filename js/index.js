
var userInputNumber;
var ordenencontainer;

window.addEventListener("load", function () {
    // Get button object.
    let userNumberBtn = document.querySelector('#input-button');

    ordenencontainer = document.getElementById("content-area");

    // Listen for button click.
    userNumberBtn.addEventListener("click", function () {
        userInputNumber = document.querySelector('#input-value').value;

        // Call to fetchDataIndex.
        kaders();
    })
});

function blacklist(fig_num) {
    // Do the blacklist things here.

    // Get textarea ID.
    let fig_num_ta = `textarea-${fig_num}`

    // taVal is value from textarea.
    let taVal = document.getElementById(fig_num_ta).value;
    
    console.log(`blacklist minifig: ${fig_num}`)
    console.log("textarea value: " + taVal);


    // Remove div from mini fig.
    document.getElementById(`index-lego-div${fig_num}`).remove();
    // Close popup not needed because div gets removed.
    // togglePopup(fig_num);
}

function whitelist(fig_num,fig_set){
    // When clicked on set image.
    console.log(`whitelisted minifig: ${fig_num} with set ${fig_set}`)
    // Get fig num and set num.
    // Haal single item op met function.

    // Pak data en steek in databank.
    // Verwijder set uit lijst op pagina.
    skipSet(fig_num);
}

function skipSet(fig_num){

    console.log(`skipped fig: ${fig_num}`)
    // Remove div from mini fig.
    document.getElementById(`index-lego-div${fig_num}`).remove();

}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function kaders() {

    // Zolang sets niet af zijn.
    let setCounter = 0;
    let setNumber = 1; // Moet eigenlijk 1 zijn met while loop .

    // Pagina leegmaken.
    ordenencontainer.innerHTML = "";
    while (setCounter < userInputNumber) {

        // Haal data op en controlleer voor set aantal.
        let succes = await fetchDataIndex(setNumber);
        await sleep(100);
        console.log(succes)

        // Increment.
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
    let fig_num_format = padDigits(fig_num, 6);

    // Get sets from minifigs and store urls in array.
    await fetch(`https://rebrickable.com/api/v3/lego/minifigs/fig-${fig_num_format}/sets/?key=2aca99226ffb9e3ad4b7e531f1b97764`)
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data)
        setscount = data.count;
        // Setcount bigger than 1.
        if (setscount <= 1) {
            succes = false;
            return;
        }
        // Do stuff.
        sets=data.results
    });
    
    if (!succes) return succes;


    // Get minifig image.
    await fetch(`https://rebrickable.com/api/v3/lego/minifigs/fig-${fig_num_format}/?key=2aca99226ffb9e3ad4b7e531f1b97764`)
        .then(response => {
            return response.json();
        })
        .then(data => {

            // Count of sets.
            console.log(data)

            let setsHTML = "";
            let amountOfSetsShowed = 4;
            for (let j=0; j < setscount && j < amountOfSetsShowed; j++){

                setsHTML+=`<img src="${sets[j].set_img_url}" onClick="whitelist(${fig_num},${j})">`
            }

            let stukjeHTML = `
            <div class="index-lego" id="index-lego-div${fig_num}">
            <div class="index-popup-container" id="popup-${fig_num}">
                <div class="index-popup-content">
                    <div class="close-btn" onclick="togglePopup(${fig_num})">&times;
                    </div>
                    <h3>Geef uw reden voor blacklisting.</h3>
                    <textarea rows="5" cols="50" name="comment" form="usrform" id="textarea-${fig_num}">
                    </textarea>
                    <button onclick="blacklist(${fig_num})">Submit</button>
                    <button onclick="togglePopup(${fig_num})">Cancel</button>
                </div>
            </div>
            <img class="index-minifig" src="${data.set_img_url}">
            <br>
            <div class="index-sets">`
            +
            setsHTML
            +
            `
            </div>
            <br>
            <button type="button" onclick="togglePopup(${fig_num})">Blacklist</button>
            <button type="button" onclick="skipSet(${fig_num})">Skip</button>
            </div>
            ` // WATCH OUT FOR ACCIDENTAL DELETION.

            // Vul kader met data.
            ordenencontainer.innerHTML += stukjeHTML;

            succes = true;
        }
        );
    // Return true or false based on variable.
    return succes
}
