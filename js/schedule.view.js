// Add todo button
document.querySelector('.add-todo').onclick = (e) => {
   openModal();
   console.log('add todo botton')
}

document.querySelector('.x').onclick = function(event) {
   if (event.target === this ) {
       closeModal();
       console.log('click modul')
   }
}; 

function openModal(todo){
   var $modulTodo = document.querySelector('.modul-todo');
   if(todo)  {
      $modulTodo.querySelector("#modul-todo-title").value = todo.modTitle;
      $modulTodo.querySelector("#modul-todo-description").value = todo.description;
      $modulTodo.querySelector("#modul-todo-date").value = todo.dueDate;
      $modulTodo.querySelector("#modul-todo-point").value = todo.todoPoint;
      $modulTodo.dataset.editingid = todo.id;
   } else {
      delete $modulTodo.dataset.editingid;
   }

   $modulTodo.style.display = 'block';
};

function closeModal() {
   var $modulTodo = document.querySelector('.modul-todo');
   $modulTodo.querySelector("#modul-todo-title").value = '';
   $modulTodo.querySelector("#modul-todo-description").value = '';
   $modulTodo.querySelector("#modul-todo-date").value = '';
   $modulTodo.querySelector("#modul-todo-point").value = '';
   $modulTodo.style.display = 'none';
};




// TODO modal
document.querySelector(".confirm-todo").onclick = function(){
   console.log('confirm-todo-clicked')
   var $modulTodo = document.querySelector('.modul-todo');
   var $modulTitle = document.querySelector("#modul-todo-title");
   var $modulDesc = document.querySelector("#modul-todo-description");
   var $modulDate = document.querySelector("#modul-todo-date");
   var $modulPoint = document.querySelector("#modul-todo-point");

   if (!$modulTodo.dataset.editingid){
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
   } else {
        var id = $modulTodo.dataset.editingid;
        var title = $modulTitle.value;
        var description = $modulDesc.value;
        var dueDate = $modulDate.value;
        var todoPoint = $modulPoint.value;
        let updatingFields = {
            modTitle: title,
            description: description,
            dueDate: dueDate,
            todoPoint: todoPoint,
        };

        update(id, updatingFields);
    }
    closeModal();
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
      toggleIsDone(newTodo.id);
  };
  $todoList.querySelector('.kebab').onclick = function(){
      onKebabBtn(this);  
  };
  $todoList.querySelector('.item-delete').onclick = function() {
   deleteTask(newTodo.id);
   };
   $todoList.querySelector('.item-edit').onclick = onEditClick;

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
      if($completedTodos.innerHTML === ''){
         
      }
};



//... edit delete button 
function onKebabBtn (html){
   console.log(html);
      if(html.children[1].style.display === 'none'){
         html.children[1].style.display = 'block';
      } else {
         html.children[1].style.display = 'none';
      }
   };

   // edit button
   function onEditClick() {
      var id = this.closest('.todo-list').dataset.id;
      var todo = getTodo(id);
      openModal(todo);
   }
   



