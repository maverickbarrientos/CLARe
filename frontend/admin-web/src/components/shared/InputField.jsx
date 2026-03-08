
export function InputField ({ inputTitle, name, handleChange, value, section, placeholder, fieldType, className }) {

    return (
        <div className={`${className}`}>
            <p className="font-heading mb-2">{ inputTitle }</p>
            <input type={fieldType} 
                name={name} className="py-2 px-4 rounded-lg border-global font-sans w-full" 
                onChange={(e) => handleChange(e, section)}
                value={value} placeholder={ placeholder }/>
        </div>
    )

}