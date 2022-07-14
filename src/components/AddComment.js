import { Button } from "./Button"
import { useState , useRef} from "react"
import { useContext } from "react"
import {DataContext} from "../App"

export const AddComment = ({feedbackId}) => {
    const [jsonData, setJsonData] =useContext(DataContext)
    const data = JSON.parse(jsonData)  //convert jsonData string format to object
    const [wordCount, setWordCount] =useState(250)
    const [word ,setWord]= useState('')
    const textArea= useRef()
    const [isError, setError]= useState(false)
    const [msg,setMsg] = useState("Can't be empty")
    
    const error= isError ? ' !border-error':'' //change textarea bordor to red if error occurs
    const btnStyle='bg-[#AD1FEA] font-jost w-[119px] h-10 md:w-[142px] md:h-11 hover:bg-[#C75AF6] text-btnColor md:font-h4'
    const onChangeText = (evt)=> {
        if (isError) {
            setError(false)
        }

         //if limit is exceeded
         if (evt.target.value.length > 250){
            setWordCount(0)
            textArea.current.focus()
            setMsg('Maximum character length exceeded')
            setError(true)
            return; 
         }
        //subtract to the length of the text allowed in the textarea
        if (word.length<evt.target.value.length) {
            setWordCount(wordCount-1)
        } 

        //add to the lenght of the text allowed in the textarea
        else {
            setWordCount(wordCount+1)
        }

         //refresh wordCount state to 250 if text is deleted at once 
         if (evt.target.value.length===0) {
            setWordCount(250)
        }

        setWord(evt.target.value)
    }

    //function for getting the last comment id and return new id for new comment
    const computecommentId = ()=> {
        let totalCommentIds=0;
        //loop through feedback data and add to totalCommentIds
        
        data.productRequests.map((element,index)  => {
            if (element.comments) {
                element.comments.map((element,index) => {
                    totalCommentIds +=1
                })
            }
        });

        return totalCommentIds +1
    }   
    const postComment = ()=> {
        
        //get comment object values
        const content=word //textarea content
        //display error if textarea is empty
        if (content.length===0) {
            textArea.current.focus()
            setMsg("Can't be empty")
            setError(true)
            return;
        }
        
        //if limit is exceeded
        if (content.length > 250){
            textArea.current.focus()
            setMsg('Maximum character length exceeded')
            setError(true)
            return; 
         }

        const id=computecommentId()
        
        //create user object 
        const user= {
            "image":data.currentUser.image,
            "name":data.currentUser.name,
            "username":data.currentUser.username,
        }
        //create new comment object
        const newComment ={
            id,
            content,
            user
        }
        
        //generate updated productrequest
        const updatesProductRequests =data.productRequests.map(element => {
           
            if (element.id===Number(feedbackId)) {
                if (element.comments) {
                    element.comments.push(newComment)
                }
                else {
                    element.comments=[]
                    element.comments.push(newComment)
                }
                
            }
            
            return element
        })

        const newData = {"currentUser":data.currentUser,"productRequests":updatesProductRequests}
        setJsonData(JSON.stringify(newData))

    } 
   
    return (
        <div className="bg-white rounded-link p-6 h-[234px] md:[246px] font-jost grid grid-cols-1 auto-rows-min gap-6">    
            <h1 className="text-h3 font-bold text-roadmap">Add Comment</h1>       
           <div className="h-20  w-full">
           <textarea ref={textArea} onChange={(evt)=> {onChangeText(evt)}} className={"box-border bg-appBg rounded-[5px] h-full  w-full font-normal text-status text-body3 md:text-body2 resize-none px-6 pt-4 focus:outline-none focus:border-solid focus:border-[1px] focus:border-[#4661E6] " + error } placeholder="Type your comment here"></textarea>            
            {isError && <span className="text-body3 md:text-h4 text-error">{msg}</span>}
           </div>
           <div className="flex flex-row justify-between items-center">
               <p className="text-body3 md:text-body2 font-normal text-status">{wordCount} {wordCount>1 ? 'Characters' : 'Character'} left</p>
               <Button style={btnStyle} name='Post Comment' handler={postComment}/>
           </div>
        </div>
    )
}

