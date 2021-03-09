let children = [];

// draw children

function drawChildrenFromSnapshot(snapshot) {
  children = [];
  snapshot.forEach((doc) => {
    children.push({
      id: doc.id,
      data: doc.data()
    });
  });
  drawChildren(children);
}

if(document.querySelector('.addChildbtn') != null) {

  // Add child  html-ruu usreh uildel

  document.querySelector('.addChildbtn').addEventListener('click', () => {
    location.replace('addChild.html');
  })
}

// add child crud // 

let $addChild = document.querySelector('.finishButton');
let $name = document.querySelector('#childName');
let $pin = document.querySelector('#childPin');

if (window.location.href.endsWith('addChild.html')) {
  $addChild.onclick = () => {
    if ($name.value && $pin.value) {
      db.collection("family").doc(userUID)
        .collection('children').add({
          name: $name.value,
          pin: $pin.value,
        })
        .then(() => {
          console.log("Document successfully written!");
          window.location.replace('profile-select.html');
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    } else {
      alert('please fill in the form');
    }
  }

  document.querySelector('#navbarProfileBtn').onclick = () => {
    window.location.replace('profile-select.html');
  }
}

if(window.location.href.endsWith('profile-select.html')){
  
  // modal show uildel// main
  let $modal = document.querySelector('.modal');
  let $button = document.querySelector('#modalshowme');

  $button.onclick = () => {
    $modal.classList.add('showme');
  };

  // logout //
  let $logout = document.querySelector('.logOut');
  $logout.addEventListener('click', () => {
    firebase.auth().signOut();
    location.replace('login.html');
  });

  // modal hide uildel
  window.onclick = function(event) {
    if (event.target == $modal) {
      $modal.classList.remove('showme');
    }
  }

};

// Realtime data awchirah uildel

window.onload = () => {
  db.collection('family')
    .doc(userUID)
    .collection('children')
    .onSnapshot(drawChildrenFromSnapshot);
};