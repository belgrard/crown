export interface InputProps {
  placeholder: string;
  type: string;
  label: string;
  description?: string;
  id?: string;
  name?: string;
}

export default function Input({
  placeholder,
  type,
  label,
  description,
  id,
  name,
}: InputProps) {
  return (
    <div className="mb-3">
      <label className="block font-bold">{label}</label>
      <p className="text-gray-400 text-[14px] mb-2">{description}</p>

      <input
        placeholder={placeholder}
        type={type}
        className="w-full px-3 py-2 bg-transparent border-2 border-gray-600 rounded-md placeholder-gray-500 focus:outline-none focus:border-yellow-500"
        id={id}
        name={name}
      />
    </div>
  );
}
