import React from 'react'

const Card = ({user}: any) => {
  const name = user ? user : "" 
  return (
    <div className=" w-full sm:px-6 py-6 px-4">
      <div className="w-full dark:bg-black/70 bg-slate-500 border dark:border-yellow-300/20 shadow-md dark:shadow-cyan-500/50 rounded-lg p-2">
        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-white">{name}</h1>
      </div>
    </div>
  )
}

export default Card
