let children = [];

// draw children

function drawChildrenFromSnapshot (snapshot) {
  children = [];
  snapshot.forEach((doc) => {
    children.push({
      id: doc.id,
      data: doc.data()
    });
  });
    drawChildren(children);
}

// add child

let $addChild = document.querySelector('.finishButton');
let $name = document.querySelector('#childName');
let $pin = document.querySelector('#childPin');

if($addChild != null) {
  $addChild.onclick = () => {
    db.collection("family").doc("DSfi2IoefMBltjwX55WC")
    .collection('children').add({
      name: $name.value,
      pin: $pin.value,
    })
    .then(() => {
        console.log("Document successfully written!");
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
    });
  }
}
// Realtime

window.onload = function() {
  db.collection('family')
    .doc('DSfi2IoefMBltjwX55WC')
    .collection('children')
    .onSnapshot(drawChildrenFromSnapshot);
};