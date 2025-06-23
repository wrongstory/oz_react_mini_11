export default function FormInput({
  label,
  type = "text",
  name,
  value,
  onChange,
  error,
  placeholder,
}) {
  return (
    <div className="mb-4">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-white mb-1"
        >
          {label}
        </label>
      )}
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-3 py-2 border rounded 
          bg-white text-gray-900 
          dark:bg-gray-900 dark:text-white
          border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 
          dark:placeholder-gray-400
          ${error ? "border-red-500" : ""}
        `}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
