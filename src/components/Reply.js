import { Link, useNavigate } from "react-router-dom"
import { Profile } from "./Profile"
import {useRef} from 'react'
import { AddReply } from "./AddReply"

//Reply and comment component 
/* ####takes two props####
  1. The commentId
  2. reply object that contains entries to populate the component
  

*/
export const Reply = ({commentId, reply}) => {
    const navigate =useNavigate()
    const ref= useRef() 
    const linkClickHandler =(evt) => {   
        evt.preventDefault()
        ref.current.style.display='flex'
    }
   
    return (
       <li className="w-full bg-white min-h-[151px] md:min-h-[123px] list-none pl-6 m-0 mt-6" key={reply.user.name}>
        <div className="flex flex-row justify-between items-center mb-4">
            <div className="flex flex-row items-center gap-4">
                <Profile name ={reply.user.name} username={reply.user.username} imgUrl={reply.user.image}/>
            </div>
            <Link to='' onClick={(evt)=>{linkClickHandler(evt)}} className="text-link font-semibold text-body3 font-jost">Reply</Link>
        </div>
        <div  className="text-body3 font-jost font-normal text-status md:ml-14 break-words"> 
            <a href="" className="text-[#AD1FEA]">@{reply.replyingTo} </a>
            {reply.content}
        </div>

        {/*The below outlet router dom component rederers the component for new reply*/}
        {/*isReply ? <Outlet/> : null*/}
        <AddReply childRef={ref} commentId={commentId} replyTo={reply.user.username} /> 
       </li>
        
    )
}
