let $addWishBtn = document.querySelector('#addWishBtn');
let $modulAddWish = document.querySelector('.wishAddModul');
let addBtn = document.querySelector('#modulAddWishBtn');
let images;
let selectedImage = 'https://firebasestorage.googleapis.com/v0/b/tema2-74912.appspot.com/o/008-music%20player.svg?alt=media';
selectedChildID = localStorage.getItem("selectedChildID");

$addWishBtn.onclick = () => {
    $modulAddWish.classList.add('showme');
    images = document.querySelectorAll('.wishAddModul img');
    images.forEach(element => {
        element.onclick = onClickImage
    });
}

addBtn.onclick = () => {

    let $path = selectedImage;
    let $title = document.querySelector('#modulTitle');
    let $description = document.querySelector('#modulDesc');
    
    if($title.value == "" || $description.value =="")  //utga hooson esehiig shalgah
    {
        alert("boglo");
    }
    else
    {
        let list ={
            childrenId: selectedChildID,
            title: $title.value ,
            description: $description.value,
            image: $path,
        };
        createWishlist(list);
        setTimeout(() => {
            $modulAddWish.classList.remove('showme');
        }, 1000);
    }
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
    listWishlist(selectedChildID);
}

function $createList(item) {
    var $list = document.createElement('div');
    $list.classList.add('wish','flex');
    var content = `
        <img class="avatarimg" src=${item.data.image} alt="avatar" width="170px">
        <h3 class="name">${item.data.title}</h3>
    `;
    $list.innerHTML = content;
    $list.onclick = () => {
        window.location.href = 'schedule.html';
        alert(item.id);
        localStorage.setItem('selectedWishID', item.id);
    };
    return $list;
}

// Home button
if(window.location.href.endsWith('wishlist.html')){
    document.querySelector('#navbarProfileBtn1').onclick = () => {
        window.location.href="profile-select.html";
    }
}

function onClickImage()
{
    selectedImage = this.src;
}