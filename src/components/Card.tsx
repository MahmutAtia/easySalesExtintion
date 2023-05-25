import React from 'react'

function MyCard({title, content}) {
  return (
    <div className='flex flex-row w-64 h-24 rounded-2xl bg-slate-300'>
        <h1 className='text-lg'>{title} : </h1>
        <h1  className='text-lg'>{content}</h1>

    </div>
  )
}

export default MyCard