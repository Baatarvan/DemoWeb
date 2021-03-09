let firebaseConfig = {
    apiKey: "AIzaSyAcmgRtMLK81Gzs6S5WvTlnv4wq2f0ZfeQ",
    authDomain: "tema2-74912.firebaseapp.com",
    projectId: "tema2-74912",
    storageBucket: "tema2-74912.appspot.com",
    messagingSenderId: "455394024390",
    appId: "1:455394024390:web:ab92f33d7934d4825630c7"
};

firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();
let selectedChildID;


// Login

if (window.location.href.endsWith('login.html')) {
    document.querySelector('.loginBtn').onclick = () => {
        let email = document.querySelector('.email').value;
        let password = document.querySelector('.password').value;

        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            location.replace('profile-select.html');
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
        });
    }

    document.querySelector('.signUp').onclick = () => {
        location.replace('signup.html');
    }
}

// Log Out

let $logOutBtn = document.querySelector('.logOut');
if ($logOutBtn != null) {
    $logOutBtn.onclick = () => {
        firebase.auth().signOut().then(() => {
            location.replace('login.html');
        }).catch((error) => {
            alert(error);
        });
    }
}

// Signup

if (window.location.href.endsWith('signup.html')) {
    document.querySelector('#signup').onclick = () => {
        let email = document.querySelector('.email').value;
        let password = document.querySelector('.password').value;
    
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
            firebase.auth().signOut();
            location.replace('login.html');
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
        });   
    }

    document.querySelector('.loginBtn').onclick = () => {
        location.replace('login.html');
    }
}



// onAuthStateChanged

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        var uid = user.uid;
    } else {
        if (!window.location.href.endsWith('login.html') && window.location.href.endsWith('login.html')) {
            location.replace('login.html');
        }
    }
});