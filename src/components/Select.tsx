import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { FormValues } from "@/schemas/yup-schema";
import { CATEGORIES } from "@/constants/categories";

type SelectProps = {
  register: UseFormRegister<FormValues>,
  errors: FieldErrors<FormValues>,
  inputName: keyof FormValues,
  label: string,
}

const Select = ({ register, errors, inputName, label }: SelectProps) => {
  return (
    <>
      <label htmlFor={ inputName } className="font-bold mb-1 text-xl block">{ label }</label>
      <div className="relative group">
        <select 
          id={ inputName }
          className="mb-2 relative z-10 block w-full px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg bg-white focus:outline-none focus:ring-gray-900"
          { ...register(inputName) }
        >
          <option value="">Selecciona una categoria</option>
          {CATEGORIES.map((category) => (
            <option key={category.value} value={category.value}>{category.label}</option>
          ))}
        </select>
        <span className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0" data-rounded="rounded-lg"></span>
      </div>
      { errors[inputName] && <p>{ errors[inputName]?.message?.toString() }</p> } 
    </>
  )
}

export default Select
