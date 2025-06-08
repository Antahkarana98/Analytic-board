
type ButtonProps = {
  children: React.ReactNode,
  type: 'button' | 'submit',
  onClick?: () => void,
  color?: string,
}

const Button = ({ children, type = 'button', onClick, color = '#101828' }: ButtonProps) => {
    
  return (
    <button 
      type={ type }
      className="mt-2 relative inline-block text-lg group w-3/4 mx-auto"
      onClick={ onClick }
    >
      <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
          <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
          <span className={`absolute left-0 w-[28rem] h-[28rem] -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 group-hover:-rotate-180 ease`} style={{ backgroundColor: `${color}` }}></span>
          <span className="relative">{children}</span>
      </span>
      <span className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0" data-rounded="rounded-lg"></span>
    </button>
  )
}

export default Button

