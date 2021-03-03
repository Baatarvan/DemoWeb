db.collection('family').get().then(snapshot => {
    snapshot.forEach(doc => {
        addWish(doc);
    })
})

let submit = document.querySelector('#btn');
let $name = document.querySelector('#name');
let $nas = document.querySelector('#nas');
let box = document.querySelector('.wishlist');

// create element
function addWish(doc) {
    console.log(doc.id);
    const $wish = `<div data-id='${doc.id}'>
        <h1>${doc.data().name}</h1>
        <p>${doc.data().nas}</p>
        <button class="delete">delete</button>
    </div>`

    box.insertAdjacentHTML('beforeend', $wish);

    let btnDelete = document.querySelector(`[data-id='${doc.id}'] .delete`);

    btnDelete.onclick = function () {
    db.collection('family').doc(`${doc.id}`).delete().then(() => {
        console.log('Document succesfully deleted!');
        }).catch(err => {
        console.log('Error removing document', err);
        });
    }

}

// add wish

submit.addEventListener('click', () => {
    db.collection('family').add({
        name: $name.value,
        nas: $nas.value,
    });
})

// Realtime

db.collection('family').onSnapshot(snapshot => {
    snapshot.docChanges().forEach(change => {
      if(change.type === 'added') {
        addWish(change.doc);
      }
      if(change.type === 'removed') {
        let item = document.querySelector(`[data-id='${change.doc.id}']`);
        let parentEl = item.parentElement;
        box.removeChild(parentEl);
      }
      if(change.type === 'modified') {
        let item = document.querySelector(`[data-id='${change.doc.id}']`);
        let parentEl = item.parentElement;
        box.removeChild(parentEl);
        addWish(change.doc);
      }
    })
})