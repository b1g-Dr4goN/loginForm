import React from 'react'
import tick from '../../../assets/tick.png'
import not_tick from '../../../assets/not_tick.png'
import delete_icon from '../../../assets/delete.png'

const TodoItem = (props: {
    text: string
    id: number
    isComplete: boolean
    deleteItem: (id: number) => void
    toggleItem: (id: number) => void
}): React.ReactNode => {
    return (
        <div className='flex items-center my-5 gap-2 w-full'>
            
            <div 
                className='flex flex-1 items-center cursor-pointer'
                onClick={() => props.toggleItem(props.id)}
            >
                <img 
                    className='w-6' 
                    src={props.isComplete? tick : not_tick} 
                    alt=''
                />
                <p 
                    className={
                        `text-slate-700 ml-4 text-[16px] truncate max-w-[88%]
                        ${props.isComplete ? 'line-through' : ''}`
                    }
                >
                    {props.text}
                </p>
            </div>
            
            <img 
                className='w-3.5 mr-4 cursor-pointer' 
                src={delete_icon} 
                alt='' 
                onClick={() => props.deleteItem(props.id)}
            />
        </div>
    )
}

export default TodoItem