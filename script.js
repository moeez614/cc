
let url = "https://raw.githubusercontent.com/WoXy-Sensei/currency-api/main/api";
const tlp = document.querySelectorAll(".form1 select")
const fromvalue = document.querySelector(".form1 select");
const tovalue = document.querySelector(".form2 select");
const msg = document.querySelector(".msg");
const btn = document.querySelector(".button");


for (const donk of tlp) {
    for (currcode in countrylist) {
        let option = document.createElement("option");
        option.value = currcode;
        option.innerText = currcode;
        if (donk.name === "from" && currcode === "USD") {
            option.selected = "selected";
        }
        else if (donk.name === "to" && currcode === "PKR") {
            option.selected = "selected";
        }
        donk.append(option)
    }
    donk.addEventListener("change", (eve) => {
        updateflag(eve.target)
    })
}
// .....................
const updatecurrency = async () => {
    let amount = document.querySelector(".currency input")
    let amtvalue = amount.value;
    if (amtvalue === "" || amtvalue < 1) {
        amtvalue = 1;
        amount.value = "1";
    }
    let curl = `${url}/${fromvalue.value}_${tovalue.value}.json`;
    let response = await fetch(curl);
    // console.log(response)
    let rate = await response.json();
    let data = rate["rate"];
    console.log(rate["rate"]);
    console.log(tovalue.value)
    let finalrate = amtvalue * data;
    msg.innerText = `${amtvalue} ${fromvalue.value} = ${finalrate} ${tovalue.value}`;

}



const updateflag = (element) => {
    let currcode = element.value;
    let ccode = countrylist[currcode];
    let newsrc = `https://flagsapi.com/${ccode}/flat/64.png`;
    let img = element.parentElement.querySelector("img")
    img.src = newsrc;
}

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updatecurrency();
});

window.addEventListener("load", () => {
    updatecurrency();
})


// console.log(countrylist["BOB"])
