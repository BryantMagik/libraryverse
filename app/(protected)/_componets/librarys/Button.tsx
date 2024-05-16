import React from 'react'

interface IButton{
  type: string;
  classStyles?: string;
  onClick?: () => void;
  children: React.ReactNode;
}

export const Button : React.FC<IButton> = ({ type, classStyles, onClick, children }) => {
  return (
    <button type="submit" className={`text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-6 py-3 dark:bg-emerald-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800 mt-2 md:mt-0 md:ml-2 ${classStyles}`} onClick={onClick} >
      { children }
    </button>
  )
}