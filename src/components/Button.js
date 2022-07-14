//functional button component 
// it takes five prosps; the button name/title
// the button img url (if it has one)
// the icon/image custom style 
// the button click handler
// and the custom style passed for styling the button 

export const Button = ({name, imgUrl, imgStyle, handler, style})=> {
    
    return (
       
        <button onClick={handler} id='custom-button' className={ style+' rounded-link md:hover:opacity-70'}>
            {imgUrl && <span style={{backgroundImage:`url(${imgUrl})` }} className={"bg-no-repeat w-3 h-2 m-0 p-0 "+imgStyle}/>}
            <span className="text-body3 font-bold font-jost m-0 p-0">{name}</span>
        </button>
    )
}