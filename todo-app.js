

const todos=getTodos()



let filters={
    searchText:'',
    completed:false
}

document.querySelector('#search-text').addEventListener('input', (e)=>{
            filters.searchText= e.target.value
            renderTodos(todos,filters)
      })

 document.querySelector('#todo-form').addEventListener('submit',(e)=>{
        e.preventDefault()
        let newItem={
          id:uuidv4(),
            text:e.target.elements.newTodo.value,
            completed:false
        }
        todos.push(newItem)

        saveData(todos)
        
        renderTodos(todos,filters)
        e.target.elements.newTodo.value=""
      })   

    document.querySelector('#hide-completed').addEventListener('change',(e)=>{
     filters.completed=e.target.checked
     renderTodos(todos,filters)

    })

   