

//check user
function checkUser() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log('user signed in');
            console.log(user.uid, user.email);
        } else {
            console.log('no user');
        }
    });
}



//function to sign up user

document.querySelector('form.signupForm').addEventListener('submit', function (e) {
    e.preventDefault();

    var name = document.getElementById('Name').value;
    var email = document.getElementById('Email').value;
    var password = document.getElementById('Password').value;
    var confirmPass = document.getElementById('cofirmPassword').value;
    console.log(name, email, password, confirmPass);

    var nameRegex = /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/
    if (nameRegex.test(name) == false) {
        swal({ text: "Enter correct name", icon: "warning" });
        return false;
    }
    else if (password.length < 7) {
        swal({ text: 'Password must be of atleast 8 characters', icon: 'warning' })
    }
    else if (password != confirmPass) {
        swal({ text: "Password does not match", icon: "warning" })
    }
    else {

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((user) => {
                console.log(user);

                var user = firebase.auth().currentUser;

                user.sendEmailVerification().then(function () {
                    console.log("Verification email has been sent")
                    swal({ text: 'Verification Email has been sent', timer: 2000, showConfirmButton: false })
                        .then(() => {
                            setTimeout(function () {
                                window.location = 'home.html'
                            }, 2000);
                        })
                })


                    .catch(function (error) {
                        console.log(error);
                    });

                // setTimeout(function () {                    
                //     window.location = 'home.html'
                // }, 2000);

            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });

    }




})

//function for google log in
function googleSignin(){
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
        console.log(user);

      }).then(() => {
        window.location = 'home.html'
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
        console.log(errorCode,errorMessage,email,credential);
      });
}



//function to sign out user
function signout() {
    firebase.auth().signOut().then(function () {
        window.location = 'login.html'
    }).catch(function (error) {
        console.log(error);
    });
}