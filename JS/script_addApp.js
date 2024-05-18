var database = firebase.database();
appendLocation = null;

document.getElementById("SeePwd").addEventListener("click", () => {
    document.getElementById("SeePwd").classList.contains("hidden") ? (document.getElementById("SeePwd").classList.remove("hidden")) (document.getElementById("SeePwd").setAttribute("class", "fa-solid fa-eye-slash")) : (document.getElementById("SeePwd").classList.add("hidden")) (document.getElementById("SeePwd").setAttribute("class", "fa-solid fa-eye hidden"));
});


function togglePasswordvisibility(checker, target) //checker  = the id of the eye button; target = the id of the placeholder on which the action will be taken
{
    document.getElementById(checker).classList.contains("hidden") ? document.getElementById(target).setAttribute("type", "password") : document.getElementById(target).setAttribute("type", "text");
}


setInterval(() => {
    togglePasswordvisibility("SeePwd", "passwordInpApp");
}, 500);


document.getElementById("GenPwdApp").addEventListener("click", () => {
    GenPwd("passwordInpApp");
})



document.getElementById("ctg_icons_phone").addEventListener("click",() => {
    document.querySelector(".addApp").classList.toggle("active");
});



document.getElementById("caretDownApp").addEventListener("click",() => {
    document.querySelector(".addApp").classList.toggle("active");
});



document.getElementById("submitEntryApp").addEventListener("click", () => {
    AppNameEntered = document.getElementById("usernameInpApp").value;
    AppPasswordEntered = document.getElementById("passwordInpApp").value;
     addAppToDB(AppNameEntered, AppPasswordEntered, appendLocation);

})
function addAppToDB(appname, app_password, appendLocation)
{   
  if(ViewMode != "Editable")
{
    document.getElementById("successLoaderContainer").classList.add("OpacityActive");
  setTimeout(() => {
    document.getElementById("addApp").classList.toggle("active");
  }, 1000);
  

    let timestamp = new Date().getTime();
    uniqueTimestampId = timestamp+"_App"
    UsrNameDirectory = localStorage.getItem("CurUsername")+"/";
    // appendLocation == null ? appendLocation = UsrNameDirectory+uniqueTimestampId : appendLocation = UsrNameDirectory+appendLocation;
      let numberOfTilesSpawned = document.querySelectorAll(".tile").length;
  
      var TilesAnimationInterval = setInterval(() => {
        var n = Math.floor(Math.random() * (numberOfTilesSpawned - 0 + 1)) + 0;
       document.querySelectorAll(".tile")[n].click();
      }, 1300 );

      const randomArray = new Uint8Array(16);
      crypto.getRandomValues(randomArray);
      const secretKey = CryptoJS.enc.Base64.stringify(CryptoJS.lib.WordArray.create(randomArray));

    firebase.database().ref(UsrNameDirectory + uniqueTimestampId).set({
        AppName: CryptoJS.AES.encrypt(appname, secretKey).toString(),
        AppPassword: CryptoJS.AES.encrypt(app_password, secretKey).toString(),
        typeOfData : String(uniqueTimestampId.split("_")[1]),
        unique_id : String(uniqueTimestampId),
        sk_app : secretKey
      }, 
      
     

      (error) => {
        if (error) {
          // The write failed...
        } else {
          console.log("Data saved successfully!");
          setTimeout(() => {
            document.getElementById("successLoaderContainer").classList.remove("OpacityActive");
            document.getElementById("usernameInpApp").value = "";
            document.getElementById("passwordInpApp").value = "";
            
            clearInterval(TilesAnimationInterval);
          }, 3300);
         
        }
      });
}
}

