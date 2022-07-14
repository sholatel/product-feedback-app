import { useContext, useState, useEffect } from 'react'
import {DataContext} from '../App'


// a hook for handling user upvote status
// returns four values 
    //1.  hasUserUpvote - for tracking user's upvote status
    //2. setUpvote- for changing user's upvote status
    //3. upvoter
    //4. undoUpvote
//takes one argument. 
// the argument id represent the id of the feedback to handle its upvote

export const useUpvote = (feedbackId) => {
  
    const [jsonData, setJsonData] =useContext(DataContext)
    const data = JSON.parse(jsonData)  //convert jsonData string format to object
    const [hasUserUpvote,setUpvote]= useState(false)
    
    useEffect(()=>{
        //alert(data.currentUser.upvotes)
        const hasUserUpvoted= data.currentUser.upvotes.find(val=>{
            return val===feedbackId
        }) ? true: false
        setUpvote(hasUserUpvoted)
        
    },[])
    const upvoter = () => {
        //upvoter allows user to upvote a comment
        data.currentUser.upvotes.push(feedbackId)

        //loop throug data.productrequests to add to the upvotes of the feedback that matched the id
        data.productRequests.forEach(feedback=> {            
            if (feedback.id===feedbackId) {
                feedback.upvotes=feedback.upvotes+1 //add one to upvotes
            }
        })

        const newData= {...data}
        setJsonData(JSON.stringify(newData))
    }
    const undoUpvote = () => {
        //undoUpvote allows user to undo upvote for a comment
        let idIndex= data.currentUser.upvotes.indexOf(feedbackId) //gey the index of the id that belongs to the current user
        data.currentUser.upvotes.splice(idIndex,1)
        //loop throug data.productrequests to remove to the upvotes of the feedback that matched the id
        data.productRequests.forEach(feedback=> {
            if (feedback.id===feedbackId) {
                feedback.upvotes-=1 //subtract one to upvotes
            }
        })

        const newData= {...data}
        setJsonData(JSON.stringify(newData))
    }

    return {hasUserUpvote,setUpvote,upvoter, undoUpvote}
}