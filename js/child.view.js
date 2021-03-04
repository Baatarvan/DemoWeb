
function $createChild(data) {
    var $child = document.createElement('div');
    var content = `
        <div class="child flex">
            <img class="avatarimg" src="https://api.getepic.com/utils/compose.png?avatar_id=15&frame_id=1&size=2x&style_type=avatar" alt="avatar" width="170px">
            <h3 class="name">${data.name}</h3>
        </div>
    `;
    $child.innerHTML = content

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