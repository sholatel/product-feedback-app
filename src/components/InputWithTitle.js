
//functional component for custom input element with already made title and element hint
//takes six props-the input title, the text area hint
//the default value
//setter for changing the value
//error state if input field is empty on submission

export const InputWithTitle= ({isError ,setError, title, hint, value, setValue})=> {
    const onChangeText = (evt)=> {
        if (isError) {
            setError(false)
        }
        setValue(evt.target.value)
    }
    const error= isError ? ' !border-error':'' //change input bordor to red if error occurs
    return (
        <div className="grid grid-cols-1 auto-rows-min gap-4">
            <div className="">
                <h1 className="text-roadmap text-body3 md:text-h4 font-bold">{title}</h1>
                <p className="text-body3 md:text-h4 text-status font-normal">{hint}</p>
            </div>
           <div className="w-full h-12">
            <input onChange={onChangeText} type='text' value={value} className={"w-full bg-appBg h-full rounded-[5px] focus:outline-none focus:border-solid focus:border-[1px] focus:border-[#4661E6] px-6 text-body3 text-roadmap" + error}/>
            {isError && <span className="text-body3 md:text-h4 text-error">Can't be empty</span>}
           </div>
        </div>
    )

}