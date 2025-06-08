import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { FormValues } from "@/schemas/yup-schema";

type InputProps = {
  register: UseFormRegister<FormValues>,
  errors: FieldErrors<FormValues>,
  inputName: keyof FormValues,
  placeholder: string,
  label: string,
  type?: string
}

const Input = ({ register, errors, inputName, placeholder, label, type = 'text' }: InputProps) => {
  return (
    <>
      <label htmlFor={ inputName } className="font-bold block text-xl mb-1">{ label }</label>
      <div className="relative group">
        <input
          type={type}
          id={inputName}
          placeholder={placeholder}
          className="mb-2 relative z-10 block w-full px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg bg-white focus:outline-none focus:ring-gray-900"
          {...register(inputName)}
        />
        <span className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0" data-rounded="rounded-lg"></span>
      </div>
      
      { errors[inputName] && <p>{ errors[inputName]?.message?.toString() }</p> } 
    </>
  )
}

export default Input
