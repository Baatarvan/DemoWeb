let firebaseConfig = {
    apiKey: "AIzaSyAcmgRtMLK81Gzs6S5WvTlnv4wq2f0ZfeQ",
    authDomain: "tema2-74912.firebaseapp.com",
    projectId: "tema2-74912",
    storageBucket: "tema2-74912.appspot.com",
    messagingSenderId: "455394024390",
    appId: "1:455394024390:web:ab92f33d7934d4825630c7"
};

let userUID;

firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();

// Login

if (window.location.href.endsWith('login.html')) {

    document.querySelector('.loginBtn').onclick = () => {
        let email = document.querySelector('.email').value;
        let password = document.querySelector('.password').value;
            
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            userUID = user.uid;
            localStorage.setItem('userUID', userUID); 
            window.location.href = "profile-select.html";
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
        });
    }

    document.querySelector('.password').addEventListener('keyup', function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            document.querySelector('.loginBtn').click();
        }
    });

    document.querySelector('.signUp').onclick = () => {
        window.location.href = "signup.html";
    }
}

// Log Out

let $logOutBtn = document.querySelector('.logOut');
if ($logOutBtn != null) {
    $logOutBtn.onclick = () => {
        firebase.auth().signOut().then(() => {
            window.location.href = 'login.html';
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
            userUID = user.uid;            
            // Create new family collection
            // function createFamily(){
            //     console.log(userUID);               
            // }
            // createFamily();
            localStorage.setItem('userUID', userUID);  //family UID-glocal storage deer hadgalah

            //Create family collection
            db.collection('family').doc(userUID).set({
                createAt: new Date()
            }).then(()=>  {
                firebase.auth().signOut();
                window.location.href = 'login.html';
            });
           
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
        });   
    }

    document.querySelector('.loginBtn').onclick = () => {
        window.location.href = 'login.html';
    }
}

// onAuthStateChanged

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        let uid = user.uid;
    } else {
        if (!window.location.href.endsWith('login.html') && window.location.href.endsWith('login.html')) {
            window.location.href = 'login.html';
        }
    }
});
