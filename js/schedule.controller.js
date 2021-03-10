selectedChildID = localStorage.getItem("selectedChildID");  //selected child ID
userUID = localStorage.getItem('userUID'); //selected family ID
selectedWishID = localStorage.getItem('selectedWishID'); //selected wishlist ID

var whishlist = {
  task: []
};

var tPoint = 0;
var myPoint = 0; 

// point 
function  onTotalPoint(task){
  if(!task.isDone){
    var point =  parseInt(task.todoPoint);
    tPoint = tPoint + point;
    totalPoint.innerHTML = tPoint;
    console.log('total point')
  } 

}
function  onYourPoint(task){
  var point =  parseInt(task.todoPoint);
  myPoint = myPoint + point;
  yourPoint.innerHTML = myPoint;
  console.log('your point')
}


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
  .doc(userUID)
   .collection('whilist')
   .doc(selectedWishID).set({task: whishlist.task}, {merge: true});
}

function update(id, data) {
  whishlist.task.forEach((each,index)=>{
    if(each.id == id){
      whishlist.task[index] = {...whishlist.task[index],...data};
    }
  });
  
  db.collection('family')
  .doc(userUID)
   .collection('whilist')
   .doc(selectedWishID).set({task: whishlist.task}, {merge: true});
  
}

//  checkbox clicked 
function toggleIsDone(id){
    let todo = getTodo(id); 
    todo.isDone = !todo.isDone;
    db.collection('family')
    .doc(userUID)
     .collection('whilist')
     .doc(selectedWishID).set({task: whishlist.task}, {merge: true});  
};
//  find todo in todos
function getTodo(id) {  
  return whishlist.task.find((task) => {
      return task.id == id;
  });
};

function deleteTask(id) {
  var idToRemove = id;
  db.collection('family')
    .doc(userUID)
    .collection('whilist')
    .doc(selectedWishID).get().then((snapshot)=>{
      var tasks = snapshot.data().task;
      var index = tasks.map(x => {
        return x.id;
      }).indexOf(idToRemove); 
      delete tasks.splice(index, 1);
        whishlist.task = tasks;

        db.collection('family')
    .doc(userUID)
    .collection('whilist')
    .doc(selectedWishID).set({task: whishlist.task}, {merge: true}); 
      });
};
   

window.onload = function() {
  db.collection('family').doc(userUID.collection('whilist').doc(selectedWishID).onSnapshot(drawFromTodoSnapshot);
};

// modal hide uildel
var $modulTodo = document.querySelector('.modul-todo');

window.onclick = function(event) {
  if (event.target == $modulTodo) {
    $modulTodo.style.display = 'none';
  }
}  