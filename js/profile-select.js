// modal //
let $modal = document.querySelector('.modal');
let $button = document.querySelector('#modalshowme');

$button.addEventListener('click', () => {
    $modal.classList.add('showme');
});

let $modalExit = $modal.querySelector('.x');

$modalExit.addEventListener('click', () => {
    $modal.classList.remove('showme');
});

// logout //
let $logout = document.querySelector('.logOut');

$logout.addEventListener('click', () => {
    firebase.auth().signOut();
    location.replace('login.html');
});