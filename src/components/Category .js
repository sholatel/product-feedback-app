import { Link,  useSearchParams} from "react-router-dom";
import { useState } from "react";

//functional component for the selection of the feedback category
export const Category = ()=> {
    const [category, setCategory] = useSearchParams({})
    const [state, setState] =useState('link-1') //helps track the active button
    
    //function for removing the active class names on button that are set to active
    const removeActiveClass= ()=> {
       const activeBtn=document.getElementById(state)
       //alert(activeBtn.className.includes('active'))
       const className=activeBtn.className.replace('active', '')
       activeBtn.className=className
       //alert(activeBtn.className)
    }

    const  clickHandler = (evt,value)=> {
        //set the  search param
        evt.preventDefault()
        //clear active classes
        removeActiveClass()
        setState(evt.target.id)
        setCategory({'category':value})
        evt.target.className= evt.target.className+' active'
    }

    return (
        <div id="category-container" className="bg-white w-w223 h-h178 lg:w-w255 lg:h-h166 grid grid-cols-3 p-5 gap-y-3.5 rounded-link opacity-0 mobileland:opacity-0 md:opacity-100">
            <Link  id="link-1" to=""  onClick={(evt)=>clickHandler(evt,'all')} className='w-12 m-0 h-linkheight grid place-content-center text-body3 text-link font-semibold bg-linkbg rounded-link active' >All</Link>
            <Link  id="link-2" to=""  onClick={(evt)=>clickHandler(evt,'ui')} className='w-12 m-0 h-linkheight grid place-content-center text-body3 text-link font-semibold bg-linkbg rounded-link'>UI</Link>
            <Link  id="link-3" to="" onClick={(evt)=>clickHandler(evt,'ux')} className='w-12 m-0 h-linkheight grid place-content-center text-body3 text-link font-semibold bg-linkbg rounded-link'>UX</Link>
            <Link  id="link-4" to="" onClick={(evt)=>clickHandler(evt,'enhancement')} className='col-span-2 w-28 m-0 h-linkheight grid place-content-center text-body3 text-link font-semibold bg-linkbg rounded-link'>Enhancement</Link>
            <Link  id="link-5" to="" onClick={(evt)=>clickHandler(evt,'bug')} className='w-12 m-0 h-linkheight grid place-content-center text-body3 text-link font-semibold bg-linkbg rounded-link'>Bug</Link>
            <Link  id="link-6" to="" onClick={(evt)=>clickHandler(evt,'feature')} className='w-[77px] m-0 h-linkheight grid place-content-center text-body3 text-link font-semibold bg-linkbg rounded-link'>Feature</Link>
        </div>
    )

    
}