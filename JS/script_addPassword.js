globalThis.selected_service = "Custom";
var database = firebase.database();
appendLocation = null;
StarShine();




document.querySelector(".addBtn").addEventListener("click", () => {
    document.getElementById("addPsswd").classList.toggle("active");
    typeWriterEffectHTML("selectedServiceAddPassword", selected_service);
});
document.getElementById("caretDown").addEventListener("click",() => {
    document.getElementById("addPsswd").classList.toggle("active");
})
document.getElementById("ctg_icons_apps").addEventListener("click",() => {
    document.querySelector(".addPsswd").classList.toggle("active");
    typeWriterEffectHTML("selectedServiceAddPassword", selected_service);
});

document.getElementById("SeePwdOfAddPwd").addEventListener("click" , () => {
    togglePasswordvisibility("GenPwd", "passwordInp");
});

document.getElementById("GenPwd").addEventListener("click",() => {
    GenPwd("passwordInp");
});


document.getElementById("SeePwdOfAddPwd").addEventListener("click", () => {
    document.getElementById("SeePwdOfAddPwd").classList.contains("hidden") ? (document.getElementById("SeePwdOfAddPwd").classList.remove("hidden")) (document.getElementById("SeePwdOfAddPwd").setAttribute("class", "fa-solid fa-eye-slash")) : (document.getElementById("SeePwdOfAddPwd").classList.add("hidden")) (document.getElementById("SeePwdOfAddPwd").setAttribute("class", "fa-solid fa-eye hidden"));
    
});

setInterval(() => {
    togglePasswordvisibility("SeePwdOfAddPwd", "passwordInp");
}, 500);

document.getElementById("submitEntry").addEventListener("click", () => {
    loginUsername = document.getElementById("usernameInp").value;
    loginPassword = document.getElementById("passwordInp").value;
    loginEmail = document.getElementById("emailInp").value;
    addToDBLogin(loginUsername, loginPassword, loginEmail, selected_service, appendLocation);

});

function submitServiceAddPassword(self)
{
    selected_service = String(self.getAttribute("data-id").split("+")[1]);  
    typeWriterEffectHTML("selectedServiceAddPassword", String(selected_service));

}

function addToDBLogin(loginUsername, loginPassword, loginEmail, serviceAddPassword, appendLocation)
{
  console.log(appendLocation);
  selected_service = "Custom";

  document.getElementById("successLoaderContainer").classList.add("OpacityActive");
  document.getElementById("addPsswd").classList.toggle("active");

    let timestamp = new Date().getTime();
    uniqueTimestampId = timestamp+"_Login"
    UsrNameDirectory = localStorage.getItem("CurUsername")+"/";
    appendLocation == null ? appendLocation = UsrNameDirectory+uniqueTimestampId : appendLocation = UsrNameDirectory+appendLocation;
    // appendLocation = UsrNameDirectory+appendLocation || UsrNameDirectory + uniqueTimestampId;
    console.log("New Append Location " + appendLocation);

      let numberOfTilesSpawned = document.querySelectorAll(".tile").length;
  
      var TilesAnimationInterval = setInterval(() => {
        var n = Math.floor(Math.random() * (numberOfTilesSpawned - 0 + 1)) + 0;
       document.querySelectorAll(".tile")[n].click();
      }, 1300 );
      
 
    firebase.database().ref(appendLocation).push({
        username: loginUsername,
        email: loginEmail,
        password : loginPassword,
        service : serviceAddPassword,
        typeOfData : String(uniqueTimestampId.split("_")[1]),
        unique_id : String(uniqueTimestampId)
      }, 
      
    

      (error) => {
        if (error) {
          // The write failed...
        } else {
          console.log("Data saved successfully!");
          setTimeout(() => {
            document.getElementById("successLoaderContainer").classList.remove("OpacityActive");
            document.getElementById("usernameInp").value = "";
            document.getElementById("passwordInp").value = "";
            document.getElementById("emailInp").value = "";
            clearInterval(TilesAnimationInterval);
          }, 3300);
         
        }
      });
}


