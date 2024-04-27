
document.getElementById("signin_with_github").addEventListener("click", () => {
    var provider = new firebase.auth.GithubAuthProvider();

    firebase.auth().signInWithPopup(provider)
    .then(function(result) {
        var token = result.credential.accessToken;
        var user = result.user;

    var docRef = db.collection("users").doc(user.displayName);


      docRef.get().then((doc) => { //gets the whole data against the entered email address
        if (doc.exists) 
        {
                localStorage.setItem("CurUsername", user.displayName);
                window.location.replace("s2.html");
        }
        else
        {
                db.collection('users').doc(user.displayName.toLowerCase()).set({
                    username : user.displayName.toLowerCase(),
                    email : user.email,
                    uid : user.uid,
                    displayName : user.displayName,
                    dateCreated: date,
                    isDev : "DEV",
                    otp: 0,
                    provider: "Github",
                    lastPasswordChange: date,
                    user_logo: user.photoURL,
                }).then(()=> {
                    var templateParams = {
                        name: user.displayName,
                        service_name : "Github",
                        email_provided : user.email,
                    };
                    emailjs.send('service_lw32yzm', 'template_jqmgo3l', templateParams)
                    .then(function(response) {
                       console.log('SUCCESS!', response.status, response.text);
                    }, function(error) {
                        console.log('FAILED...', error);
                        
                    });
    
                    localStorage.setItem("CurUsername", user.displayName);
                    window.location.replace("s2.html");       
                })
                .catch((err) => {
                    console.log(err)
                })

                
        }
    })
    })
});