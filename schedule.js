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
   console.log(i);
   $kebabBtn[i].onclick = function(){
         if(this.children[1].style.display === 'none'){
            this.children[1].style.display = 'block';
         } else {
            this.children[1].style.display = 'none';
         }
      }
   }
