let $addWishBtn = document.querySelector('#addWishBtn');
let $modulAddWish = document.querySelector('.wishAddModul');
let addBtn = document.querySelector('#modulAddWishBtn');

$addWishBtn.onclick = () => {
    $modulAddWish.classList.add('showme');
}

addBtn.onclick = () => {

    let $path = 'https://firebasestorage.googleapis.com/v0/b/tema2-74912.appspot.com/o/008-music%20player.svg?alt=media';
    let $title = document.querySelector('#modulTitle');
    let $description = document.querySelector('#modulDesc');
    let list ={
        childrenId: "xLlWmKpzc7LiVOihxhsP",
        title: $title.value ,
        description: $description.value,
        image: $path,
    };
    createWishlist(list);
    setTimeout(() => {
        $modulAddWish.classList.remove('showme');
    }, 1000);
}


window.onclick = function(event) {
    if (event.target == $modulAddWish) {
        $modulAddWish.classList.remove('showme');
    }
}


let wishlists = [];
//draw wishlist

function drawWishlistFromSnapshot(snapshot){
    wishlists = [];
    snapshot.forEach((doc) => {
        wishlists.push({
            id: doc.id,
            data: doc.data(),
        });
    });
    drawList(wishlists);
}

window.onload = () =>{
    selectedChildID = "xLlWmKpzc7LiVOihxhsP";
    listWishlist(selectedChildID);
}

function $createList(item) {
    var $list = document.createElement('div');
    $list.classList.add('wish','flex');
    var content = `
        <img class="avatarimg" src="https://api.getepic.com/utils/compose.png?avatar_id=15&frame_id=1&size=2x&style_type=avatar" alt="avatar" width="170px">
        <h3 class="name">${item.data.title}</h3>
    `;
    $list.innerHTML = content;
    $list.onclick = () => {
        window.location.href = 'schedule.html';
    };
    return $list;
}

// Home button
if(window.location.href.endsWith('wishlist.html')){
    document.querySelector('#navbarProfileBtn1').onclick = () => {
        window.location.href="profile-select.html";
    }
}