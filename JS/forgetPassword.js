function ValidateUsername()
{

    globalThis.usernameValidifyValue = document.getElementById("otpInputUsername").value;
    var docRef = db.collection("users").doc(usernameValidifyValue.toLowerCase());
    docRef.get().then((doc) => {
       if(doc.exists) 
       {

        if(doc.data().provider != "Firebase")

        {
            ForgotPasswordError("Sorry, but your account has bind with Either google or github, can't change password remotely!");
        }
        else
        {
            document.getElementById("otpInputUsername").style.pointerEvents = "none";
        document.getElementById("otpInputUsername").style.opacity = "65%";

        document.getElementById("otpInput").style.display = "block";
        document.getElementById("otpInputMask").style.display = "block";
        document.getElementById("validOTP").style.display = "block";
        globalThis.usernameEmail = doc.data().email;


        var docRef = db.collection("users").doc(usernameValidifyValue.toLowerCase());
        docRef.get().then((doc) => { // gets the whole data against the entered email address
        lastPasswordChangeDate = (doc.data().lastPasswordChange);
      
        // Get the current date
       currentDate = new Date();
            
        // Format the current date in the same format as your database
        var currentDateFormatted =
        currentDate.getDate() +
        "/" +
        (currentDate.getMonth() + 1) +
        "/" +
        currentDate.getFullYear();

        // Calculate the difference
        var differenceOfChange = 0;

        var lastDateComponents = lastPasswordChangeDate.split("/");
        var currentDateComponents = currentDateFormatted.split("/");

        // Check year
        if (lastDateComponents[2] == currentDateComponents[2]) {
        // Check month
        if (lastDateComponents[1] == currentDateComponents[1]) {
        // Check day
        if (lastDateComponents[0] != currentDateComponents[0]) {
        differenceOfChange = Math.abs(
            parseInt(lastDateComponents[0]) - parseInt(currentDateComponents[0])
        );
        }
        }
        }
        if(differenceOfChange >= 7)
        {
            document.getElementById("submitEntryCardForgetPassowrd").setAttribute("onclick", "SendOTP()");
            document.getElementById("submitEntryCardForgetPassowrd").innerHTML = "Send OTP";
        }
        else
        {
            warningDateChange = String("You can change password after " + String(7 - differenceOfChange) + " Day(s)");
            ForgotPasswordError(warningDateChange);
        }
        })
        }
        

        }
       else
       {
        ForgotPasswordError("No Account Exists with this Username");
       }

    })

}
function SendOTP() {
   
    //template_ln6qk1j == email template
    const min = 156000;
    const max = 356000;
    const otp_value = Math.floor(Math.random() * (max - min + 1) + min)
    console.log(otp_value);

    db.collection('users').doc(usernameValidifyValue.toLowerCase()).update({
        otp: String(otp_value),
    })
    
    var templateParams = {
        name: usernameValidifyValue,
        password_reset_email_name : usernameEmail,
        email_provided : usernameEmail,
        password_reset_otp : otp_value,
    };
    emailjs.send('service_lw32yzm', 'template_ln6qk1j', templateParams)
    .then(function(response) {
        otp_send_notif = String("OTP has been sent to " + String(usernameEmail).slice(0,6) + ".....");
        ForgotPasswordError(otp_send_notif);
        document.getElementById("submitEntryCardForgetPassowrd").setAttribute("onclick", "ValidateOTP()");
        document.getElementById("submitEntryCardForgetPassowrd").innerHTML = "Validate OTP";

    }, function(error) {
       console.log('FAILED...', error);
    });
  }

  function ValidateOTP()
  {
    OTP_value_entered = document.getElementById("otpInput").value;
    var docRef = db.collection("users").doc(usernameValidifyValue.toLowerCase());
        docRef.get().then((doc) => { // gets the whole data against the entered email address
            serverOTP = doc.data().otp;
            if(OTP_value_entered == serverOTP)
            {
                  document.getElementById("changePassword").style.display = "block";
                  document.getElementById("GenPwdforPasswordChange").style.display = "block";
                  document.getElementById("SeePwdforPasswordChange").style.display = "block";

                  document.getElementById("validOTP").style.transform = "translateX(0px)";
                  document.getElementById("otpInput").style.pointerEvents = "none";
                  document.getElementById("otpInput").style.opacity = "65%";
                  db.collection('users').doc(usernameValidifyValue.toLowerCase()).update({
                    otp: 0,
                })
                  document.getElementById("submitEntryCardForgetPassowrd").setAttribute("onclick", "setNewPassword()");
                  document.getElementById("submitEntryCardForgetPassowrd").innerHTML = "Set Password";
            }
            else
            {
                ForgotPasswordError("Enter Valid OTP");
            }
        });

  }

  function setNewPassword()
  {
    var newPassword = document.getElementById("changePassword").value;
    db.collection('users').doc(usernameValidifyValue.toLowerCase()).update({
        password: newPassword,
    })
    ForgotPasswordError("Your Password has been updated! Please relogin!");
    document.getElementById("changePassword").value = "";
    document.getElementById("otpInputUsername").value = "";
    document.getElementById("otpInput").value = "";

    document.getElementById("validOTP").style.transform = "translateX(150px)";
    localStorage.clear();
    location.reload();
  }
