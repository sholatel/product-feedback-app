import { AddReply } from "./AddReply"
import { Profile } from "./Profile"
import { Reply } from "./Reply"
import {Link, useNavigate} from 'react-router-dom'
import { useRef} from 'react'

//Reply and comment component 
/* ####takes five props####
  1. The name of the commentator
  2. The commentator username
  3. The commentator/replier profile image url
  4. The comment/reply body 
  5. The username of the user replying to or null for a comment 

*/
export const FeedbackComment = ({commentId, name, username, imgUrl, commentBody, reply }) => {
    //const [isReply, setReply] = useState(false)  //should the outlet for AddReply route be displayed or not
    const navigate =useNavigate()
    const ref= useRef() 
    const linkClickHandler =(evt) => {   
        evt.preventDefault()
        //setReply(true)
        //document.getElementById('add-reply').style.display='flex'
        ref.current.style.display='flex'
        //navigate(`reply/${commentId}/${username}`)
    }
    return (
      
       <div  className="w-full bg-white min-h-[151px] mb-6">
        <div className="flex flex-row justify-between items-center mb-4">
            <div className="flex flex-row items-center gap-4">
                <Profile name ={name} username={username} imgUrl={imgUrl}/>
            </div>
            <Link  to='' onClick={(evt)=>{linkClickHandler(evt)}}  className="text-link font-semibold text-body3 font-jost">Reply</Link>
        </div>
        <p className="text-body3 md:text-body2 font-jost font-normal text-status md:ml-14  break-words">{commentBody}</p>

        {/*The below Add reply  component helps to add new reply*/}
        {/*isReply ? <Outlet/> : null*/}
        
        <AddReply childRef={ref} commentId={commentId} replyTo={username} />      

        {/*render replies to comment if available */}
        <div>
            {reply!=null ?  reply.map ((rep)=> {
               return  <Reply commentId={commentId} reply={rep}/>
            }):null} 
        </div>
       </div>
        
    )
}
