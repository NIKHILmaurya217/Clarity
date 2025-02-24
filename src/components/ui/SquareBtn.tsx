import React from 'react'

const SquareBtn = ({children}: {children : React.ReactNode}) => {
  
return (
    <div className= "bg-slate-950 text-white h-24  rounded-lg">
      {children}
    </div>
  )
}
export default SquareBtn
