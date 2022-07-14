//functional component for custom textArea element with already made title and element hint
//takes four props-the textarea title, the text area hint
//the default value
//the setter for the value 
//error state if input field is empty on submission

export const TextAreaWithTitle= ({isError ,setError,title,hint,value,setValue})=> {
    
    const onChangeText = (evt)=> {
        if (isError) {
            setError(false)
        }
        setValue(evt.target.value)
    }

    const error= isError ? ' !border-error':'' //change text area bordor to red if error occurs
    
    return (
        <div className="grid grid-cols-1 auto-rows-min gap-4">
            <div className="">
                <h1 className="text-roadmap text-body3 font-bold md:text-h4">{title}</h1>
                <p className="text-body3 text-status font-normal md:text-h4">{hint}</p>
            </div>
            <div className="h-[120px] md:h-24 w-full ">
                <textarea onChange={onChangeText} value={value} className={"box-border bg-appBg rounded-[5px] resize-none focus:outline-none focus:border-solid focus:border-[1px] focus:border-[#4661E6] px-6 pt-4 text-body3 text-roadmap h-full w-full" + error} type='text'/>
                {isError && <span className="text-body3 md:text-h4 text-error">Can't be empty</span>}
            </div>
        </div>
    )

}