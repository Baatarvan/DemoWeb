userUID = localStorage.getItem('userUID'); //user uid local-s awah
var selectedChildName = localStorage.getItem('selectedChildName'); //huuhdiin neriig awah
let children = [];
let wishlist = [];

//draw children from snapshot
function drawChildrenListFromSnapshot(snapshot) {
    children = [];
    snapshot.forEach((doc) => {
        console.log(doc.data());
        children.push({
            id: doc.id,
            data: doc.data(),
        });
        listWishlist(doc.id,false);
        console.log(wishlist);
    });
    drawList(children,wishlist);
}


// // main draw function 

function drawList(children){
    var lists = document.querySelector('.content');

    lists.innerHTML = '';
    children.forEach((item) => {
        child = drawChild(item,wishlist);
        lists.append(child);
    });
}


// List children uildel
function listChildren(userUID) {
    db.collection('family')
      .doc(userUID )
      .collection('children')
      .onSnapshot(drawChildrenListFromSnapshot);
  };

  window.onload = () => {
        listChildren(userUID);
  };
  
  function drawFromSnapshot(snapshot)
  {
        wishes = [];
        snapshot.forEach((doc) => {
            wishes.push({
                id: doc.id,
                data: doc.data(),
            });
        });
        wishlist = wishes;
  }

var lists = document.querySelector('.content');

window.onload = () =>
{
    listChildren(userUID);
    lists.innerHTML = "";
}

function listChildren(userUID) {
    db.collection('family')
      .doc(userUID )
      .collection('children')
      .onSnapshot(drawChildrenListFromSnapshot);
  };

  // //draw children from snapshot
function drawChildrenListFromSnapshot(snapshot) {
    children = [];
    snapshot.forEach((doc) => {
        let child = {id: doc.id, data: doc.data()};
        let childWishes = [];
        childWishes = listWishlist(doc.id,false);
        console.log(doc.id, "==============", childWishes)
        console.log(listWishlist(doc.id,false).length);
        drawRow(child,childWishes);
    });
}

function drawRow(child,childWishes)
{
    let wishes = [];
    console.log(childWishes.length);
    wishes = childWishes;
    var profile = document.createElement('div');
    profile.classList.add('childContainer', 'flex');
    var content = `
        <div class="profile flex flex-1">
            <div class="child flex">
                <img class="avatarimg" src="https://api.getepic.com/utils/compose.png?avatar_id=15&amp;frame_id=1&amp;size=2x&amp;style_type=avatar" alt="avatar" width="170px">
                <h3 class="name">${child.data.name}</h3>
            </div>
        </div>
    `;
    let wishbox = document.createElement('div');
    wishbox.classList.add('wishbox','flex', 'flex-6');

    var wish = '';
    childWishes.forEach((item) =>{
         wish += `
            <div class="wish flex">
                <img class="avatarimg" src=${item.data.image} alt="avatar" width="170px">
                <h3 class="name">${item.data.title}</h3>
            </div>
        `;
    });
    wishbox.innerHTML = wish;

    content = content + wishbox.innerHTML;
    profile.innerHTML = content;
    lists.append(profile);
}
