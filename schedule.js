document.querySelector('.add-todo').onclick= function(){
      console.log('hello world');
      var $modulTodo = document.querySelector('.modul-todo');
         if($modulTodo.style.display === 'none'){
            $modulTodo.style.display = 'block'
         } else {
            $modulTodo.style.display = 'none';
         }     
}



