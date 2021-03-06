let $addWishBtn = document.querySelector('#addWishBtn');
let $modulAddWish = document.querySelector('.wishAddModul');

$addWishBtn.onclick = () => {
    $modulAddWish.classList.add('showme');
}

window.onclick = function(event) {
    if (event.target == $modulAddWish) {
        $modulAddWish.classList.remove('showme');
    }
}