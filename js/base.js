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

let $logOutBtn = document.querySelector('.logOut');
if($logOutBtn != null) {
    $logOutBtn.onclick = () => {
        firebase.auth().signOut().then(() => {
            location.replace('login.html');
        }).catch((error) => {
            alert(error)
        });
    }
}
// onAuthStateChanged

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      var uid = user.uid;
    } else {
        if (!window.location.href.endsWith('login.html')){
        location.replace('login.html');
        }
    }
});