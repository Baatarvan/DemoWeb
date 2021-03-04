// modal //
let $modal = document.querySelector('.modal');
let $button = document.querySelector('#modalshowme');

$button.addEventListener('click', () => {
    $modal.classList.add('showme');
});

window.onclick = function(event) {
    if (event.target == $modal) {
      $modal.style.display = "none";
    }
  }

// logout //
let $logout = document.querySelector('.logOut');

$logout.addEventListener('click', () => {
    firebase.auth().signOut();
    location.replace('login.html');
});

// Add child //

document.querySelector('.addChildbtn').addEventListener('click', () => {
    location.replace('addChild.html');
})