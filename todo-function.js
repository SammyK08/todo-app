//retrun data
const getTodos=()=>{
let todoJSON=localStorage.getItem('todo')


if(todoJSON!=null){
return JSON.parse(todoJSON)
}
else{
    return[]
}
}

//save data
const saveData=(todos)=>{
localStorage.setItem('todo',JSON.stringify(todos))
}

//toggle the completed value for given Todo
const toggleTodo=(id)=>{
    let todo=todos.find((todo)=> todo.id==id)

    if(todo!==undefined){
        todo.completed= !todo.completed
    }
}

//delete todos
const deleteData=(id)=>{
    let todoIndex=todos.findIndex((todo)=>todo.id===id)
    if(todoIndex>-1){
        todos.splice(todoIndex,1)
    }
    
}

//render todo
let renderTodos=(todos,filters)=>{
    let filteredTodos=todos.filter((todo)=>{
        const searchTextMatch= todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
        
        const hideCompleted=!filters.completed||!todo.completed     
       
         return searchTextMatch && hideCompleted
    })

    
    document.querySelector('#filteredTodos').innerHTML=''

    let todoRem=0;
    filteredTodos.forEach((todo)=>{
        if(!todo.completed){
            todoRem++;
        }
        generateDOM(todo)
    })

    generateSummary(todoRem)
}



//generate DOM
const generateDOM=(todo)=>{
let divEl=document.createElement('div')
const checkbox=document.createElement('input')
const todoText=document.createElement('span')
const removeButton=document.createElement('button')


     //setup todo checkbox
checkbox.setAttribute('type','checkbox')
checkbox.checked=todo.completed
divEl.appendChild(checkbox)
checkbox.addEventListener('change', ()=>{
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
removeButton.addEventListener('click',()=>{
    deleteData(todo.id)
    saveData(todos)
   renderTodos(todos, filters)
})

document.querySelector('#filteredTodos').appendChild(divEl)
}

//generate summary
const generateSummary=(todoRem)=>{
let summary=document.createElement('h2')
summary.textContent=`you have ${todoRem} todos left`
document.querySelector('#filteredTodos').appendChild(summary)
}