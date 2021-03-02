// array //

let wishlists = [];

let $wishlist = document.querySelector('.wishlist');
console.log($wishlist);

let $approveBtn = document.querySelector('#btn');
let $title = document.querySelector('#title');
let $disc = document.querySelector('#disc');
let $modal;


$approveBtn.onclick = function() {
    let newWishlist = {
        title: $title.value,
        img: '',
        description: $disc.value,
        dueDate: new Date,
    }
    addWishlist(newWishlist);
};

function createWishlist (wishlist) {
    console.log(wishlist);
    let $item = document.createElement('div');
    let content = `<h2>${wishlist.title}</h2>
    <h2>${wishlist.description}</h2>
    <button id="btn">Go!</button>
    <p>${wishlist.dueDate}</p>`;

    $item.innerHTML = content
    
    return $item;
}

function addWishlist(newWishlist) {
    wishlists.push(newWishlist);
    draw();
}


function draw() {
    $wishlist.innerHTML = "";

    wishlists.forEach((wishlist) => {
        $newWishlist = createWishlist(wishlist);
        $wishlist.append($newWishlist);
    });
}