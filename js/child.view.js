
let selectedChild;
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

        let $pinCheckBtn = document.querySelector('.childPinModal .modalbox button');
        let $inputPin = $child.querySelector('input').value;
        console.log($inputPin);

        $pinCheckBtn.onclick = () => {
            db.doc(`family/DSfi2IoefMBltjwX55WC/children/${selectedChild}`).get()
            // db.collection('family').doc('DSfi2IoefMBltjwX55WC').collection('children').doc(selectedChild).get()
            .then((doc) => {
                    console.log(doc.data().pin);
                }
            )
        }
    };
    return $child;
}

// Main draw function
function drawChildren(children) {
    var $childrenList = document.querySelector('#children');

    $childrenList.innerHTML = '';
    children.forEach((item) => {
        $child = $createChild(item);
        $childrenList.append($child);
    });
}

function showChildPinModal() {
    let $PinModal = document.querySelector('.childPinModal');
    $PinModal.classList.add('showme');
}
    