
let selectedChild;
let selectedChildPin;
// create elementx

function $createChild(item) {
    var $child = document.createElement('div');
    $child.classList.add('child','flex');
    var content = `
        <img class="avatarimg" src="https://api.getepic.com/utils/compose.png?avatar_id=15&frame_id=1&size=2x&style_type=avatar" alt="avatar" width="170px">
        <h3 class="name">${item.data.name}</h3>
    `;
    $child.innerHTML = content;
    $child.onclick = () => {
        selectedChild = item.id;
        showChildPinModal();

            document.querySelector('.childPinModal .modalbox button').onclick = () => {
            db.doc(`family/DSfi2IoefMBltjwX55WC/children/${selectedChild}`).get()
            .then((doc) => {
                    console.log(doc.data().pin);
                    selectedChildPin = doc.data().pin;
                }
            )
            let inputPin = document.querySelector('.childPinModal .modalbox input').value;

            if(inputPin === selectedChildPin) {
                selectedChildID = item.id;
                console.log(selectedChildID);
                location.replace('wishlist.html');
            }
        }
    };
    return $child;
}

let modal = document.querySelector('.childPinModal')

if(modal != null) {
    modal.onclick = function(event) {
        if(event.target ==  modal){
            modal.classList.remove('showme')
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