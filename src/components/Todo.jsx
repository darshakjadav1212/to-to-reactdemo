import React, { useEffect, useRef, useState } from 'react'
import todo_icon from '../assets/todo_icon.png'
import TodoItems from './TodoItems'

const Todo = () => {

    const [todoList,setTodoList] = useState(localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : []  );
    const inputRef = useRef();    

    const add = () => {
        const inputText = inputRef.current.value.trim();
        console.log(inputText);
        

        if (inputText === "" ) {            
            return null;
        }

        const newTodo = {
            id:  Date.now(),
            text: inputText,
            isComplete: false
        }

        setTodoList((prev)=>[...prev,newTodo]);
        inputRef.current.value = "";
    }

    const deleteTodo = (id) => {
        setTodoList((prev) =>{
            return  prev.filter( (todo ) => todo.id !== id)
        })
    }

    const toggle = (id) => {
        setTodoList((prev) => prev.map((item) =>{
            if(item.id === id){
                return  {...item,isComplete:!item.isComplete}
            }
            return item;
        }))
    }


    useEffect(() => {
        localStorage.setItem("todos",JSON.stringify(todoList))
    }, [todoList])
    


  return (
    <>
    <div className=' bg-white place-self-center w-11/12 max-w-md flex flex-col p-7
    min-h-[550px] rounded-xl '>

    {/* --------title------------- */}

    <div className=" flex items-center mt-7 gap-2"> 
        <img className=' w-8 ' src={todo_icon} alt="sorry" />
        <h1 className=' text-3xl font-semibold '>List</h1>
    </div>

    {/* ----- input-box-------------------------- */}

    <div className=' flex items-center my-7 bg-gray-200 rounded-full '>
        <input className='bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600' type="text" placeholder='Enter your task'
       ref={inputRef} />
        <button className=' border-none  rounded-full bg-orange-600 w-32 h-14 text-white text-lg font-medium cursor-pointer hover:bg-orange-400 
         hover:font-extrabold' onClick={add}>ADD +</button>
    </div>

    {/* -----To-Do List-------------------------- */}

    <div>
       {todoList.map((item,index)=>{
            return <TodoItems key={index} text={item.text} id={item.id} isComplete={item.isComplete} 
            deleteTodo={deleteTodo} toggle={toggle} />
       })}
    </div>

    </div>  
    </>
    
  )
}

export default Todo