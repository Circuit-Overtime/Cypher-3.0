import RangeSliderPips from "https://cdn.skypack.dev/svelte-range-slider-pips@2.2.2";
setTimeout(() => {
    window.onload = generatePassword() 
}, 1200);
let vals = [7, 12];
let timer;

const $slider = document.getElementById("slider");


const stop = () => {
    const $slider = document.querySelector("#PriceGradient");
    $slider.classList.remove("up", "down");
 
};

const slide = (e) => {
    const $slider = document.querySelector("#PriceGradient");
    const delta = -(e.detail.previousValue - e.detail.value);
    if (delta > 0) {
        $slider.classList.add("up");
        $slider.classList.remove("down");
    } else {
        $slider.classList.add("down");
        $slider.classList.remove("up");
    }
    clearTimeout(timer);
    timer = setTimeout(stop, 66);
};

const slider = new RangeSliderPips({
    target: $slider,
    props: {
        id: "PriceGradient",
        min: 5,
        max: 20,
        values: vals,
        pips: true,
        range: true,
        pipstep: 1,
        first: false,
        last: false,
        float: true,
    }
});

slider.$on('change', slide);
slider.$on('stop', stop);

setTimeout(() => {
    document.querySelector("#PriceGradient .rangeHandle").focus()
}, 200 );

function generatePassword()
{
    document.getElementById("psswD").innerHTML = "";
    var lowerRange = parseInt(document.querySelectorAll(".rangeFloat")[0].innerHTML);
    var upperRange = parseInt(document.querySelectorAll(".rangeFloat")[1].innerHTML);

    let UpperCaseChars = document.getElementById("Uppercase").checked;
    let LowerCaseChars = document.getElementById("Lowercase").checked;
    let NumberChars = document.getElementById("Numbers").checked;
    let specialChars = document.getElementById("specialCharacters").checked;
    var chars = "";
    (UpperCaseChars == true) ? chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ" : chars += "";
    (LowerCaseChars == true) ? chars += "abcdefghijklmnopqrstuvwxyz" : chars += "";
    (NumberChars == true) ? chars += "0123456789" : chars += "";
    (specialChars == true) ? chars += "!@#$%^&*()" : chars += "";
    (UpperCaseChars == false && LowerCaseChars == false && NumberChars == false && specialChars == false) ? (chars = "abcdefghijklmnopqrstuvwxyz0123456789")
     (document.getElementById("Lowercase").checked = true)
    (document.getElementById("Numbers").checked = true) : null;

    var generated_password = "";

    var passwordLength = Math.floor(Math.random() * (upperRange - lowerRange + 1)) + lowerRange;
    
    for (var i = 0; i <= passwordLength; i++) {
        var randomNumber = Math.floor(Math.random() * chars.length);
        generated_password += chars.substring(randomNumber, randomNumber +1);
       }
       document.getElementById("genPwdUserID").value = "";
    document.getElementById("psswD").innerHTML += generated_password;
}

document.getElementById("GenPWd").addEventListener("click", () => {
    generatePassword();
})
document.getElementById("psswD").addEventListener("click", (e) => {
    // navigator.clipboard.writeText(e.target.innerHTML);
    const textToCopy = e.target.innerHTML;
            const textArea = document.createElement("textarea");
            textArea.value = textToCopy;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand("copy");
            document.body.removeChild(textArea);

})