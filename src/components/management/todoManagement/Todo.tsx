import { useRef, useState, MutableRefObject, useEffect } from 'react'
import todo_icon from '../../../assets/todo_icon.png'
import TodoItem from './TodoItem'
import toast from 'react-hot-toast'

const Todo = () => {
    const inputRef: MutableRefObject<HTMLInputElement | null> = useRef<HTMLInputElement>(null);

    const [todoItems, setTodoItems] = 
    useState<{id: number, text: string, isComplete: boolean}[]>(JSON.parse(localStorage.getItem('todoList') || '[]'))

    const handleAddItem = () => {
        const inputText: string = inputRef.current?.value ? inputRef.current.value.trim() : ''
        
        if (inputText === '') {
            toast.error('Type something to add to the to-do list!')
            return;
        }

        const newTodo = {
            id: Date.now(),
            text: inputText,
            isComplete: false,
        }

        setTodoItems((prevs) => [...prevs, newTodo])
        inputRef.current!.value = ''
        toast.success('Added task to the to-do list!')
    }

    const handleDeleteItem = (id: number) => {
        setTodoItems((prevs) => {
            return prevs.filter((item) => item.id !== id)
        })
        toast.success('Deleted task from the to-do list!')
    }

    const handleToggleItem = (id: number) => {
        setTodoItems((prevs) => {
            return prevs.map((item) => {
                if (item.id === id) {
                    return {...item, isComplete: !item.isComplete}
                }
                return item
            })
        })
    }

    useEffect(() => {
        localStorage.setItem('todoList', JSON.stringify(todoItems))
    }, [todoItems])

    return (
        <div className='bg-white place-self-center w-11/12 max-w-xl flex flex-col p-7 min-h-[666px] rounded-xl'>

            {/* ------ Title ------ */}

            <div className='flex items-center mt-7 gap-2'>
                <img className='w-8' src={todo_icon} alt='' />
                <h1 className='text-3xl font-bold'>To-do List</h1>
            </div>

            {/* ------ Input Box ------ */}
        
            <div className='flex items-center my-7 bg-gray-200 rounded-full'>
                <input
                    ref={inputRef}
                    className='bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600' 
                    type='text' 
                    placeholder='Add your task'
                />
                <button 
                    className='border-none rounded-full font-black bg-orange-600 w-14 h-14 text-white text-lg font-medium-cursor-pointer'
                    onClick={handleAddItem}
                >
                    +
                </button>
            </div>

            {/* ------ To-do List ------ */}

            <div className="overflow-y-auto max-h-96 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
                {todoItems.map((todoItem, idx): React.ReactNode => {
                    return (
                        <TodoItem 
                            key={idx} 
                            text={todoItem.text} 
                            id={todoItem.id} 
                            isComplete={todoItem.isComplete}
                            deleteItem={handleDeleteItem}
                            toggleItem={handleToggleItem}
                        />
                    )
                })}
            </div>

        
        </div>
    )
}

export default Todo