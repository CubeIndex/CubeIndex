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
        let i = 0;
        const html = data.results.slice(0, 5).map
            (user => {
                return `
            <div class="blacklist-lego">
                <div class="blacklist-minifig">
                    <p><img src="${user.set_img_url}" alt="${user.name}" width="150" /></p>
                </div>
                <div class="blacklist-container">
                    <h2>
                    ${user.set_num}
                    </h2>
                    <textarea rows="4" cols="50" name="comment" form="usrform" readonly>Sample Text</textarea>
                    <br>
                    <form>
                        <input type="button" value="EDIT" onclick="Buttontoggle3();">
                        <input type="button" value="DELETE" onclick="ButtonDelete3();">
                    </form>
                </div>
            </div>
            `;
            })
            .join(" ");
        console.log(html);
        document.querySelector("#blacklist-input-area").insertAdjacentHTML("afterbegin", html);
    })
    
    }
    function Buttontoggle3()
    {
        // Get button waarop is geklikt.
        var t3 = event.currentTarget;

        // Get textarea from button waarop is geklikt.
        var r3 = t3.parentNode.parentNode.childNodes[3];

    if(t3.value=="SAVE"){
        r3.readOnly = true, 
        t3.value="EDIT";}
    else if(t3.value=="EDIT"){
        r3.readOnly = false, 
        t3.value="SAVE";}
        }
    function ButtonDelete3() {
        let deleteBtn = event.currentTarget;
        console.log(deleteBtn);
        deleteBtn.parentNode.parentNode.parentNode.remove();
    }

fetchDataIndex1();
