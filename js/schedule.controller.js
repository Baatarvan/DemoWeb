var whishlist = {
  task: []
};


function drawFromTodoSnapshot(snapshot){
  console.log("updated");
  whishlist = snapshot.data();
  console.log(whishlist.task);
  if(whishlist.task === undefined) {
    whishlist.task = [];
  }
  $drawTodos(whishlist.task);
}
function create(newTodo){
  console.log(newTodo);
  whishlist.task.push(newTodo);
   db.collection('family')
  .doc('DSfi2IoefMBltjwX55WC')
   .collection('whilist')
   .doc('jeofIcnAC3iRtqYTW0bW').set({task: whishlist.task}, {merge: true});
}

window.onload = function() {
    db.collection('family').doc('DSfi2IoefMBltjwX55WC').collection('whilist').doc('jeofIcnAC3iRtqYTW0bW').onSnapshot(drawFromTodoSnapshot);
   };


   