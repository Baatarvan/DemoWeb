const elements = document.querySelectorAll("[data-id]");
let wishlists = [];

elements.forEach(el => {
    el.onclick = el => {
        console.log(el.target);
    }
})

function drawWishlist() {
    wishlists = [];


}