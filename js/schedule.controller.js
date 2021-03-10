var whishlist = {
  task: []
};


// Progress battery
var batteryContainer = document.querySelector('.battery-container');
var achievePercent = document.querySelector('#taskProcent');
var tPoint = 0;
var myPoint = 0; 


function calcPers(totalPoint, myPoint) {
  var huwi = (myPoint / totalPoint) * 100;
  console.log(totalPoint);
  console.log(myPoint);
  console.log(huwi);
  achievePercent.style.width = `${huwi}%`;
  let percent = parseInt(`${huwi}%`);
  achievePercent.innerHTML =  percent + '%';
}


// point 
  function  onTotalPoint(point){
      totalPoint.innerHTML = point;

  };

function  onYourPoint(myPoint){
  yourPoint.innerHTML = myPoint;
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
   .doc('FeBGA8qIj3ER23G3VDOn').set({task: whishlist.task}, {merge: true});
}

function update(id, data) {
  whishlist.task.forEach((each,index)=>{
    if(each.id == id){
      whishlist.task[index] = {...whishlist.task[index],...data};
    }
  });
  
  db.collection('family')
  .doc('DSfi2IoefMBltjwX55WC')
   .collection('whilist')
   .doc('FeBGA8qIj3ER23G3VDOn').set({task: whishlist.task}, {merge: true});
  
}

//  checkbox clicked 
function toggleIsDone(id){
    let todo = getTodo(id); 
    todo.isDone = !todo.isDone;
    db.collection('family')
    .doc('DSfi2IoefMBltjwX55WC')
     .collection('whilist')
     .doc('FeBGA8qIj3ER23G3VDOn').set({task: whishlist.task}, {merge: true});  
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
    .doc('DSfi2IoefMBltjwX55WC')
    .collection('whilist')
    .doc('FeBGA8qIj3ER23G3VDOn').get().then((snapshot)=>{
      var tasks = snapshot.data().task;
      var index = tasks.map(x => {
        return x.id;
      }).indexOf(idToRemove); 
      delete tasks.splice(index, 1);
        whishlist.task = tasks;

        db.collection('family')
    .doc('DSfi2IoefMBltjwX55WC')
    .collection('whilist')
    .doc('FeBGA8qIj3ER23G3VDOn').set({task: whishlist.task}, {merge: true}); 
      });
};
   

window.onload = function() {
  db.collection('family').doc('DSfi2IoefMBltjwX55WC').collection('whilist').doc('FeBGA8qIj3ER23G3VDOn').onSnapshot(drawFromTodoSnapshot);
};

// modal hide uildel
var $modulTodo = document.querySelector('.modul-todo');

window.onclick = function(event) {
  if (event.target == $modulTodo) {
    $modulTodo.style.display = 'none';
  }
}  