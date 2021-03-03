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

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    var uid = user.uid;
  } else {
      console.log("Nevterch orno uu?");
  }
});