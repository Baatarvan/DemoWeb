
// wishlist crud

let childID = db.collection('family')
.doc('DSfi2IoefMBltjwX55WC')
.collection('children')


function createWishlist(list){
    db.collection('family').doc('DSfi2IoefMBltjwX55WC')
    .collection('whilist').add({
        childrenId: list.childrenId,
        title: list.title ,
        description: list.description,
        createAt: new Date(Date.now()),
        isApproved: false,
        image: list.image,
        task: null, 
    })
}

function listWishlist(childID){
    db.collection('family')
        .doc('DSfi2IoefMBltjwX55WC')
        .collection('whilist')
        .where("childrenId" , "==", childID)
        .onSnapshot(drawWishlistFromSnapshot);
}

function deleteWishlist(id){
    db.collection('family').doc('DSfi2IoefMBltjwX55WC')
    .collection('whilist').doc(id).delete().then(() => {
        console.log("Document successfully deleted!");
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
}
