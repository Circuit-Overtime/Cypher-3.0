globalThis.selected_serviceCard = "Custom";
var database = firebase.database();
StarShine();


document.getElementById("ctg_icons_card").addEventListener("click",() => {
    document.querySelector(".addCard").classList.toggle("active");
    typeWriterEffectHTML("selectedServiceCard", selected_serviceCard);
});


document.getElementById("caretDownCard").addEventListener("click",() => {
    document.querySelector(".addCard").classList.toggle("active");
});


function submitServiceCard(self)
{
    selected_service = String(self.getAttribute("data-id").split("+")[1]);  
    typeWriterEffectHTML("selectedServiceCard", String(selected_service));

}
document.getElementById("usernameInpCard").addEventListener("keydown", (e) => {
    // ((e.target.value.length) > 1 && (e.target.value.length) % 4 == 0) ? e.target.value += "-" : null;    
    let inputValue = e.target.value.replace(/[^\d]/g, ''); // Remove non-numeric characters
    let formattedValue = '';

    for (let i = 0; i < inputValue.length; i++) {
        if (i > 0 && i % 4 === 0) {
            formattedValue += '-';
        }
        formattedValue += inputValue[i];
    }

    e.target.value = formattedValue;
})

document.getElementById("DateInpCard").addEventListener("keydown", (e) => {

var inputChar = String.fromCharCode(e.keyCode);
  var code = e.keyCode;
  var allowedKeys = [8];
  if (allowedKeys.indexOf(code) !== -1) {
    return;
  }


    e.target.value = e.target.value.replace(
        /^([1-9]\/|[2-9])$/g, '0$1/' // 3 > 03/
      ).replace(
        /^(0[1-9]|1[0-2])$/g, '$1/' // 11 > 11/
      ).replace(
        /^([0-1])([3-9])$/g, '0$1/$2' // 13 > 01/3
      ).replace(
        /^(0?[1-9]|1[0-2])([0-9]{2})$/g, '$1/$2' // 141 > 01/41
      ).replace(
        /^([0]+)\/|[0]+$/g, '0' // 0/ > 0 and 00 > 0
      ).replace(
        /[^\d\/]|^[\/]*$/g, '' // To allow only digits and `/`
      ).replace(
        /\/\//g, '/' // Prevent entering more than 1 `/`
      );  

      
});


document.getElementById("submitEntryCard").addEventListener("click", () => {
    cardNumber = String(document.getElementById("usernameInpCard").value).trim();
    cardCVV = document.getElementById("passwordInpCard").value;
    cardExpiry = document.getElementById("DateInpCard").value;
    cardHolderName = document.getElementById("emailInpCard").value;
    
    addToDBCard(cardNumber, cardCVV, cardExpiry, cardHolderName, selected_serviceCard);

});

function addToDBCard(cardNumber, cardCVV, cardExpiry, cardHolderName, selected_serviceCardParam)
{

  
  document.getElementById("usernameInpCard").value = "";
  document.getElementById("passwordInpCard").value = "";
  document.getElementById("DateInpCard").value = "";
  document.getElementById("emailInpCard").value = "";
  selected_serviceCard = "Custom";


  document.getElementById("usernameInpCard").style.pointerEvents = "none";
  document.getElementById("passwordInpCard").style.pointerEvents = "none";
  document.getElementById("DateInpCard").style.pointerEvents = "none";
  document.getElementById("emailInpCard").style.pointerEvents = "none";


  document.getElementById("successLoaderContainer").classList.add("OpacityActive");
  setTimeout(() => {
    document.getElementById("addCard").classList.toggle("active");
  }, 1000);
  

    let timestamp = new Date().getTime();
    uniqueTimestampId = timestamp+"_Card"
    UsrNameDirectory = localStorage.getItem("CurUsername")+"/";

      let numberOfTilesSpawned = document.querySelectorAll(".tile").length;
  
      var TilesAnimationInterval = setInterval(() => {
        var n = Math.floor(Math.random() * (numberOfTilesSpawned - 0 + 1)) + 0;
       document.querySelectorAll(".tile")[n].click();
      }, 1300 );

      const randomArray = new Uint8Array(16);
      crypto.getRandomValues(randomArray);
      const secretKey = CryptoJS.enc.Base64.stringify(CryptoJS.lib.WordArray.create(randomArray));
      
    firebase.database().ref(UsrNameDirectory + uniqueTimestampId).set({
        cardNumber: CryptoJS.AES.encrypt(cardNumber, secretKey).toString(),
        cardCVV: CryptoJS.AES.encrypt(cardCVV, secretKey).toString(),
        cardExpiry : CryptoJS.AES.encrypt(cardExpiry, secretKey).toString(),
        cardHolderName: CryptoJS.AES.encrypt(cardHolderName, secretKey).toString(),
        serviceCard : selected_serviceCardParam,
        typeOfData : String(uniqueTimestampId.split("_")[1]),
        unique_id : String(uniqueTimestampId),
        sk_card : secretKey,
      }, 
      
     

      (error) => {
        if (error) {
          // The write failed...
        } else {
          console.log("Data saved successfully!");
          setTimeout(() => {
            document.getElementById("successLoaderContainer").classList.remove("OpacityActive");
            
            clearInterval(TilesAnimationInterval);
          }, 3300);
         
        }
      });
}