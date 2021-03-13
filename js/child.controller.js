let children = [];
userUID = localStorage.getItem('userUID'); //selected family ID
let $button = document.querySelector('#modalshowme');


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
    if(children.length < 6 ) {
      window.location.href="addChild.html";
    }
    else {
      alert('Хүүхдйин тоо дүүрсэн байна.');
    }
  })
}

// add child crud // 

let $addChild = document.querySelector('.finishButton');
let $name = document.querySelector('#childName');
let $pin = document.querySelector('#childPin');
let cancelButton = document.querySelector('.cancelButton');

//create children

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
          window.location.href="profile-select.html";
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    } else {
      alert('please fill in the form');
    }
  }

  document.querySelector('#navbarProfileBtn2').onclick = () => {
    window.location.href="profile-select.html";
  }
  cancelButton.onclick = () => {
    window.location.href="profile-select.html";
  }

}

if(window.location.href.endsWith('profile-select.html')){
  
  // modal show uildel// main
  let $modal = document.querySelector('.modal');

  $button.onclick = () => {
    $modal.classList.add('showme');
  };

  // logout //
  let $logout = document.querySelector('.logOut');
  $logout.addEventListener('click', () => {
    firebase.auth().signOut();
    window.location.href="login.html";
  });

  // modal hide uildel
  window.onclick = function(event) {
    if (event.target == $modal) {
      $modal.classList.remove('showme');
    }
  }

  document.querySelector('.modal .modalbox button').onclick = () => {
    let parentPintInput = document.querySelector('.modal .modalbox input').value;
    db.doc(`family/${userUID}`).get()
      .then((doc) => {
        console.log(doc.data().parintPin);
        if(doc.data().parintPin === parentPintInput) {
          window.location.href="parent.html";
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
};

// List children uildels

window.onload = () => {
  db.collection('family')
    .doc(userUID)
    .collection('children')
    .onSnapshot(drawChildrenFromSnapshot);
  }
;

//