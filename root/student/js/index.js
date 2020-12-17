

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
    var ConfirmPass = document.getElementById('cofirmPassword').value;
    console.log(name, email, password, ConfirmPass);

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((user) => {
            console.log(user);
            setTimeout(function () {
                window.location = 'home.html'
            }, 4000);

        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });


})



//function to sign out user
function signout() {
    firebase.auth().signOut().then(function () {
        window.location = 'login.html'
    }).catch(function (error) {
        console.log(error);
    });
}