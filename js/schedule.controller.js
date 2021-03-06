var whishlist = {
  task: []
};


function drawFromTodoSnapshot(snapshot){
  console.log("updated");
  whishlist = snapshot.data();

  if(whishlist.task === undefined) {
    whishlist.task = [];
  }
  $drawTodos(whishlist.task);
}

// update task's datas
function create(newTodo){
  whishlist.task.push(newTodo);
   db.collection('family')
  .doc('DSfi2IoefMBltjwX55WC')
   .collection('whilist')
   .doc('jeofIcnAC3iRtqYTW0bW').set({task: whishlist.task}, {merge: true});
}

function update(id, data) {
  db.collection('family')
  .doc('DSfi2IoefMBltjwX55WC')
   .collection('whilist')
   .doc('jeofIcnAC3iRtqYTW0bW').set({task: whishlist.task}, {merge: true});
  
}
//  checkbox clicked 
function toggleIsDone(id){
    let todo = getTodo(id); 
    todo.isDone = !todo.isDone;
    db.collection('family')
    .doc('DSfi2IoefMBltjwX55WC')
     .collection('whilist')
     .doc('jeofIcnAC3iRtqYTW0bW').set({task: whishlist.task}, {merge: true});  
};
//  find todo in todos
function getTodo(id) {  
  return whishlist.task.find((task) => {
      return task.id == id;
  });
};


window.onload = function() {
    db.collection('family').doc('DSfi2IoefMBltjwX55WC').collection('whilist').doc('jeofIcnAC3iRtqYTW0bW').onSnapshot(drawFromTodoSnapshot);
   };


   