var ViewMode = "readOnly";



let i = 0;
var target = "  Ayushman";
let speed = 75; //speed duration of effect in millisec
typeWriter();
function typeWriter() {
    
    if (i < target.length) {
        document.getElementById("usernameInp").value += target.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
    }
}



