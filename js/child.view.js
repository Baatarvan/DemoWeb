
let selectedChild;
let selectedChildPin;
let selectedChildID;
userUID = localStorage.getItem('userUID');

// create elementx

function $createChild(item) {
    var $child = document.createElement('div');
    $child.classList.add('child', 'flex');
    var content = `
        <img class="avatarimg" src="https://api.getepic.com/utils/compose.png?avatar_id=15&frame_id=1&size=2x&style_type=avatar" alt="avatar" width="170px">
        <h3 class="name">${item.data.name}</h3>
    `;
    $child.innerHTML = content;
    $child.onclick = () => {
        selectedChild = item.id;
        let img = $child.querySelector('img');
        let imageSource = img.getAttribute('src');
        console.log(imageSource);

        let modalImg = document.querySelector('#childrenImage');
        modalImg.setAttribute('src', imageSource);
        document.querySelector('.childPinModal .modalbox h3').innerHTML = $child.querySelector('.child, .name').innerHTML;

        showChildPinModal();

        let $inputPin = document.querySelector('.childPinModal .modalbox input');
        let $goBtn = document.querySelector('.childPinModal .modalbox button');
        
        $goBtn.onclick = () => {
            db.doc(`family/${userUID}/children/${selectedChild}`).get()
            .then((doc) => {
                selectedChildPin = doc.data().pin;
                if ($inputPin.value === selectedChildPin) {
                    selectedChildID = item.id;
                    localStorage.setItem('selectedChildID',selectedChildID);
                    window.location.href="wishlist.html";
                } else {
                    alert('Wrong Pin');
                } 
            });
        }

        $inputPin.addEventListener('keyup', function(event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                $goBtn.click();
            }
        })
    };
    return $child;
}

// child Pin modal

let $ChildPinmodal = document.querySelector('.childPinModal');

if ($ChildPinmodal != null) {
    $ChildPinmodal.onclick = function (event) {
        if (event.target == $ChildPinmodal) {
            $ChildPinmodal.classList.remove('showme')
            $ChildPinmodal.querySelector('input').value = "";
        }
    }

    // Main draw function
    function drawChildren(children) {
        var $childrenList = document.querySelector('.avatar');

        $childrenList.innerHTML = '';
        children.forEach((item) => {
            $child = $createChild(item);
            $childrenList.append($child);
        });
    }

    function showChildPinModal() {
        document.querySelector('.childPinModal').classList.add('showme');
    }
}