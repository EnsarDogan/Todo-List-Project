// Selecet All Elements Needed
const form = document.querySelector('#todo-form');
const formInput = document.querySelector('#todo');
const itemList = document.querySelector('.list-group');
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clear = document.querySelector("#clear-todos");

EventListeners();

function EventListeners(){

    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", LoadAllTodos);
    secondCardBody.addEventListener("click", deleteTodo);
    filter.addEventListener("keyup", SearchIn);
    clear.addEventListener("click", DeleteAllTodos);
    
}

function DeleteAllTodos (){
    if (confirm("Are you sure to delete All Todos?")){
        //delete from Interface
        while(itemList.firstElementChild != null){
            itemList.removeChild(itemList.firstElementChild);
        }
        //deleteFromStorage
        localStorage.removeItem("todos");
    }
}

function SearchIn (e){
    const filterValue = e.target.value.toLowerCase();
    const ListItems = document.querySelectorAll(".list-group-item");

    ListItems.forEach(function(listItem){
        const text = listItem.textContent.toLowerCase();

        if (text.indexOf(filterValue) === -1){
        listItem.setAttribute("style", "display: none !important")
        }
        else{
            listItem.setAttribute("style", "display: ")
        }
    })

  

}

function deleteTodo(e){
    if(e.target.className=== "fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("success", "Erased Successfuly");
    }
}

function deleteTodoFromStorage (DeleteTodo){
    let todos = getTodoFromStorage();

    todos.forEach(function(todo,index){
        if(todo === DeleteTodo)
        todos.splice(index,1);
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}

function LoadAllTodos(){
   let todos= getTodoFromStorage();
    todos.forEach(function(todo){
        addNewTodotoUI(todo);
    });
}

function addTodo (e){
    const NewTodo = formInput.value.trim();
  
    if(NewTodo=== ""){
        showAlert("danger","Please Enter a Todo");
    }
    else{
        addNewTodotoUI(NewTodo);
        addTodoToStorage(NewTodo);
        showAlert("success", "Added Successfuly");
    }

    e.preventDefault();

}

function getTodoFromStorage(){
    
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else{

        todos = JSON.parse(localStorage.getItem("todos")) ;
        
    }
    return todos;
}

function addTodoToStorage(NewTodo){
    todos = getTodoFromStorage();

    todos.push(NewTodo);

    localStorage.setItem("todos", JSON.stringify(todos));
}

function showAlert(type, message){
    const alert = document.createElement("div");
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    firstCardBody.appendChild(alert);
    setTimeout(() => {
        alert.remove();
    }, 1000);
  

}

function addNewTodotoUI (NewTodo){
    const ListItem = document.createElement("li");
    ListItem.className = "list-group-item d-flex justify-content-between";
    const link = document.createElement("a");
    link.href = "#";
    link.className= "delete-item";
    link.innerHTML = "<i class = 'fa fa-remove'></i>"
    //append a & text to li
    ListItem.appendChild(document.createTextNode(NewTodo));
    ListItem.appendChild(link);
    //append li to ul
    itemList.appendChild(ListItem);

    formInput.value = "";

}