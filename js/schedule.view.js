// Add todo button
document.querySelector('.add-todo').onclick= function(){
      console.log('hello add todo button');
      var $modulTodo = document.querySelector('.modul-todo');
         if($modulTodo.style.display === 'none'){
            $modulTodo.style.display = 'block'
         } else {
            $modulTodo.style.display = 'none';
         }     
}

//... edit delete button 
var $kebabBtn = document.querySelectorAll('.kebab');
for(var i = 0; i < $kebabBtn.length; i++){
   $kebabBtn[i].onclick = function(){
         if(this.children[1].style.display === 'none'){
            this.children[1].style.display = 'block';
         } else {
            this.children[1].style.display = 'none';
         }
      }
   }

// TODO modal
document.querySelector(".confirm-todo").onclick = function(){
   console.log('confirm-todo-clicked')
   var $modulTitle = document.querySelector("#modul-todo-title");
   var $modulDesc = document.querySelector("#modul-todo-description");
   var $modulDate = document.querySelector("#modul-todo-date");
   var $modulPoint = document.querySelector("#modul-todo-point");

   var newTodo = {
      id: parseInt(Math.random()*9999999999),
      modTitle: $modulTitle.value,
      description:$modulDesc.value,
      dueDate : $modulDate.value,
      todoPoint: $modulPoint.value,
      createdAt: new Date().toISOString(),
      isDone: false,
   };
   create(newTodo);
   // console.log(newTodo);
};

function $drawTodo(newTodo){
   var $todoListInner = `<div class="todo-list" data-id="${newTodo.id}">
   <div class="todo">
         <div class="todo-content">
               <div class="todo-desc">
                     <span class="description">${newTodo.modTitle}
                     </span>
                     <span class="todo-point">+${newTodo.todoPoint}
                     </span>
               </div>
               <div style="text-align: right; font-size: 1rem;">
                     <span>Due date: </span>
                     <span class="todo-due-date">${newTodo.dueDate}</span>
               </div>
         </div>
         <div class="todo-edit">
               <span class="todo-check"><input type="checkbox" ${ newTodo.isDone ? 'checked' : '' } class="is-done" data-id="${ newTodo.id }">
               </span>
               <span class="kebab">
                     <span class="kebab-more"></span>
                     <ul class="hidden">
                           <li class="item-edit">EDIT</li>
                           <li class="item-delete" data-id="${ newTodo.id }">DELETE</li>
                     </ul>
               </span>
         </div>
   </div>
</div>
   `
   var $todoList = document.createElement('div');
   $todoList.innerHTML = $todoListInner;
   $todoList.querySelector('.is-done').onchange = function() {
      return newTodo.isDone = !newTodo.isDone;
  }();
   return $todoList;
};


function $drawTodos(tasks){
   var $todos = document.querySelector('.todos');
   var $completedTodos = document.querySelector('.todos-completed');
   console.log(tasks);
   $todos.innerHTML = '';
   $completedTodos.innerHTML = '';

      tasks.forEach((task) => {
         $newTodo = $drawTodo(task);
      $todos.append($newTodo);
      if(task.isDone){
         $completedTodos.append($newTodo);
      } else {
         $todos.append($newTodo);
      }
      });
};









