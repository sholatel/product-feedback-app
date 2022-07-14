import { Button } from "./Button"
import { useParams } from "react-router-dom"
import { useContext, useState } from "react"
import { DataContext } from "../App"

export const AddReply = ({childRef, commentId, replyTo}) => {
    const [jsonData, setJsonData]= useContext(DataContext)
    const btnStyle='bg-[#AD1FEA] w-[100px] h-10 md:w-[117px] md:h-11 hover:bg-[#C75AF6] text-btnColor font-jost'
    const  {id}= useParams() //getting the url params for specifying the user to reply to
    const [isError, setError]= useState(false)
   
    const error= isError ? ' !border-error':'' //change textarea bordor to red if error occurs
    const postReply = ()=> {
        const data = JSON.parse(jsonData) //parse to json object
        //get textarea text content
        const content=childRef.current.querySelector('textarea').value
         //display error if textarea is empty
         if (content.length===0) {
            childRef.current.querySelector('textarea').focus()
            setError(true)
            return;
        }
        const replyingTo=replyTo
        //extract current user data from data.currentUser
        const {image, name , username} = data.currentUser
        const user = {image, name, username} //create new object of user
        const newReply = {
            //new reply object
            content,
            replyingTo,
            user
        }

        //generate updated productrequest
        const updatesProductRequests =data.productRequests.map(element => {          
            //check the feedback comment to update
            if (element.id===Number(id)) { 
                //loop through the list of comments of the feedback
                //and see which one to update
               const updatedFeedbackComment= element.comments.map(comment=> {
                    //check the comment to edit
                    if (comment.id===commentId) {
                        //check if comment has existing replies
                        //if true, push new reply
                        if (comment.replies) {
                            comment.replies.push(newReply) 
                           }
                        //if false, create new array of replies 
                        //and push new reply   
                        else {
                        comment.replies=[]
                        comment.replies.push(newReply)
                        }   
                    }
                    return comment //return comment
                }) 
                element.comments= [...updatedFeedbackComment ]  //update feedback comments
         }            
            return element
        })
        //create an updated copy of the data object
        const newData = {"currentUser":data.currentUser,"productRequests":updatesProductRequests}
        setJsonData(JSON.stringify(newData)) //convert to string and update the state
        childRef.current.style.display  ='none'  //hide component       
    } 

    const onChangeText = ()=> {
        if (isError) {
            setError(false)
        }
    }

    return (
        <div ref={childRef} className="h-20 hidden /*flex*/ flex-row w-full gap-2 font-jost mt-5 md:gap-4 md:ml-14">           
            <div className="w-[cal(100%-100px)] md:w-[calc(100%-189px)]">
                <textarea onChange={onChangeText} className={"box-border bg-appBg rounded-[5px] h-full w-full  font-normal text-roadmap text-body3 md:text-body2 resize-none px-6 pt-4 focus:outline-none focus:border-solid focus:border-[1px] focus:border-[#4661E6]" +error} placeholder="Type your reply here"/>            
                {isError && <span className="text-body3 md:text-h4 text-error block">Can't be empty</span>}
            </div>
            <Button style={btnStyle} name='Post Reply' handler={postReply}/>
        </div>
    )
}