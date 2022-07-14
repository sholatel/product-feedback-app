import { useContext, useEffect, useState } from "react"
import {DataContext} from "../App"
import { Button } from "./Button"
import {icons} from '../assets/icons/index'
import { Feedback } from "./Feedback"
import { FeedbackComment } from "./FeedbackComment"
import {useParams} from 'react-router-dom'
import { useNavigate } from "react-router-dom"
import { AddComment } from "./AddComment"
import { motion } from "framer-motion"

//Page for comment route
const FeedbackDetails = ({variants}) => {
    const [jsonData, setJsonData] =useContext(DataContext)
    const data = JSON.parse(jsonData)  //convert jsonData string format to object
    const {id} =useParams()
    const navigate = useNavigate()

    const btnHandler1 = ()=> {
         //take one step back
         navigate(-1)
     }
     const btnHandler2 = ()=> {
        //go to adit comment page 
        navigate(`/edit_feedback/${id}`)
     }

     //find the feedback associated with the given ID
     const feedback=data.productRequests.find( (cmt)=> { return cmt.id===Number(id)}) 
     const btnStyle1='bg-transparent text-status flex flex-row items-center gap-4 '
     const btnStyle2='flex flex-row items-center text-center text-btnColor bg-link grid place-items-center h-10 w-[119px] md:h-11 w-[142px]'
     const commentNo= feedback.comments ? feedback.comments.length : 0
     return (
         <motion.section variants={variants} exit='exit' initial='hidden' animate='visible' className="w-full h-full bg-appBg p-6 md:p-12 lg:p-56  lg:py-20 grid grid-cols-1 auto-rows-min gap-6">
             <div className="flex flex-row justify-between">
                 <Button name='Go back' imgUrl={icons.ArrowLeft} style={btnStyle1} handler={btnHandler1}/>
                 <Button name='Edit Feedback' style={btnStyle2} handler={btnHandler2}/>
             </div>
             <Feedback  commentNo={commentNo} title={feedback.title} desc={feedback.description} category={feedback.category} upvote={feedback.upvotes} id={feedback.id}/>
             {feedback.comments ? <div className="bg-white rounded-link p-6">
                 <h1 className="text-h3 font-jost font-bold text-roadmap mb-6">{feedback.comments.length} {feedback.comments.length>1 ? 'comments' : 'comment'}</h1>   
                 {feedback.comments.length>0 ?                        
                       feedback.comments.map((comment)=> {
                           return  <FeedbackComment commentId={comment.id} name={comment.user.name} username={comment.user.username} imgUrl={comment.user.image} commentBody={comment.content} reply={comment.replies || null}/>
                       }) :null
                 }
             </div>:null}
             <AddComment feedbackId={id}/>

             {/*The below div is a dummy element that just gives space between the last element and the body bottom*/}
             <div className="h-6 w-full"></div>
         </motion.section>
     )
}

export default FeedbackDetails