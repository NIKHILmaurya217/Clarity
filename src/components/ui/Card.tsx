"use client";
const Card = ({children}:{children : React.ReactNode}) => {
  return (
    <div className="w-full sm:px-6 my-6 px-4">
      <div className="w-full flex dark:bg-black/70 bg-slate-500 border dark:border-yellow-300/20 shadow-md dark:shadow-cyan-500/50 rounded-lg px-4 py-2">
        {children}
      </div>
    </div>
    )}
export default Card;
