import React from 'react'
import { useId } from 'react'

function Select({
    options,
    label,
    className = '',
    ...props
},ref) {
    const id = useId()
  return (
    <div className='w-full'>
        {label && <label htmlFor={id} className=''></label>}

        <select className={` ${className}`} {...props} id={id}
        ref={ref}>
            {options.map((option) => (
               <option key={option} value={option}>
               {option}
           </option>
            ))}
        </select>
    </div>
  )
}

export default React.forwardRef(Select)