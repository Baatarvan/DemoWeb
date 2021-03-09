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

  // Add child  html-ruu usreh uildel //

  document.querySelector('.addChildbtn').addEventListener('click', () => {
    window.location.href="addChild.html";
    
  })
}

// add child crud // 

let $addChild = document.querySelector('.finishButton');
let $name = document.querySelector('#childName');
let $pin = document.querySelector('#childPin');

if (window.location.href.endsWith('addChild.html')) {
  $addChild.onclick = () => {
    if ($name.value && $pin.value) {
      let userUID = firebase.auth().currentUser.uid;
      db.collection("family").doc(userUID)
        .collection('children').add({
          name: $name.value,
          pin: $pin.value,
        })
        .then(() => {
          window.location.href="profile-select.html";
          
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    } else {
      alert('please fill in the form');
    }
  }

  document.querySelector('#navbarProfileBtn').onclick = () => {
    window.location.href="profile-select.html";
    
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
    window.location.href='login.html';
  });

  // modal hide uildel//
  window.onclick = function(event) {
    if (event.target == $modal) {
      $modal.classList.remove('showme');
    }
  }

};

// Realtime data awchirah uildel //

window.onload = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        var userUID = user.uid;
        db.collection('family')
        .doc(userUID)
        .collection('children')
        .onSnapshot(drawChildrenFromSnapshot);
    } else {
        if (!window.location.href.endsWith('login.html') && window.location.href.endsWith('login.html')) {
            window.location.href="login.html";
        }
    }
});
 
};