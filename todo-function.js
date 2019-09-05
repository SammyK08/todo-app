//retrun data
const getTodos=function(){
let todoJSON=localStorage.getItem('todo')


if(todoJSON!=null){
return JSON.parse(todoJSON)
}
else{
    return[]
}
}

//save data
const saveData=function(todos){
localStorage.setItem('todo',JSON.stringify(todos))
}

//toggle the completed value for given Todo
const toggleTodo=function(id){
    let todo=todos.find(function(todo){
       return todo.id==id
    })

    if(todo!==undefined){
        todo.completed= !todo.completed
    }
}

//delete todos
const deleteData=function(id){
    let todoIndex=todos.findIndex(function(todo){
        return todo.id===id
    })
    if(todoIndex>-1){
        todos.splice(todoIndex,1)
    }
    
}

//render todo
let renderTodos=function(todos,filters){
    let filteredTodos=todos.filter(function(todo){
        const searchTextMatch= todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
        
        const hideCompleted=!filters.completed||!todo.completed     
       
         return searchTextMatch && hideCompleted
    })

    
    document.querySelector('#filteredTodos').innerHTML=''

    let todoRem=0;
    filteredTodos.forEach(function(todo){
        if(!todo.completed){
            todoRem++;
        }
        generateDOM(todo)
    })

    generateSummary(todoRem)
}



//generate DOM
const generateDOM=function(todo){
let divEl=document.createElement('div')
const checkbox=document.createElement('input')
const todoText=document.createElement('span')
const removeButton=document.createElement('button')


     //setup todo checkbox
checkbox.setAttribute('type','checkbox')
checkbox.checked=todo.completed
divEl.appendChild(checkbox)
checkbox.addEventListener('change', function(){
    toggleTodo(todo.id)
    saveData(todos)
    renderTodos(todos,filters)
})


     //setuo the todo text
todoText.textContent=todo.text
divEl.appendChild(todoText)

     //setup the remove button
removeButton.textContent='Delete'
divEl.appendChild(removeButton)
removeButton.addEventListener('click',function(){
    deleteData(todo.id)
    saveData(todos)
   renderTodos(todos, filters)
})

document.querySelector('#filteredTodos').appendChild(divEl)
}

//generate summary
const generateSummary=function(todoRem){
let summary=document.createElement('h2')
summary.textContent=`you have ${todoRem} todos left`
document.querySelector('#filteredTodos').appendChild(summary)
}