import {Feedback} from '../components/Feedback'
import { useSearchParams, useLocation } from 'react-router-dom'
import { useEffect ,useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
//functional component for rendering list of feedbacks
export const FeedbackList= ({data})=> {
    const [filter, setFilter] =useSearchParams()
    const {search}=useLocation()
    const [state,setState]= useState('[]')
    const [renderCount, setRenderCount]= useState(0) //tracks component reredering occurence
    const controls =useAnimation()

     //animation variants object    
     const variants= {
        visible: {
            opacity:[0,1],
            y:[100,0],
            transition: {
                duration: 0.5,                               
                delay:renderCount<1 ? 0.6 : 0 //if renderCount is less than 1 delay transition with 1s
              }
        },
    }

    

    useEffect(()=> {  
        setRenderCount(renderCount+1)
        //alert(count)
        controls.start('visible').then(()=>{
            controls.stop()
            //alert('Animation stopped')
        }).catch(error=>{
            console.log('Animation error')
        })
        let filteredData=[];
        const queryVal=String (filter).split('=')
        //fliter data by the category of the feedback
        const updateByCategory = ()=> {
            if (filter) {
                filteredData=data.filter((comment)=> {
                return comment.category===queryVal[1]
              })
           } 
        } 

        //sort data by the provided condition   
        const sortBy = (sortBy)=> {
            let reSortBy=sortBy.replace('+',' ').toLowerCase()
            filteredData=[...JSON.parse(state)]
            const sortByUpvote = ()=> {
                //function for sorting data by the upvotes
                filteredData.sort(function (a,b) {
                    return a.upvotes - b.upvotes
                })
            }
            const sortByComment = ()=> {
                //function for sorting data by the comments
                filteredData.sort(function (a,b) {
                    let commentA= a.comments ? a.comments.length : 0
                    let commentB= b.comments ? b.comments.length : 0
                    return commentA - commentB
                })
            }

            if (reSortBy ==='most upvotes') {
                // sort data by the most upvotes feedback
                sortByUpvote()
                filteredData.reverse() //revers in descending order
                //setState(JSON.stringify(filteredData))
            }
            else if (reSortBy ==='least upvotes') {
                //sort data by the least upvotes feedback
                sortByUpvote()
                //setState(JSON.stringify(filteredData))
            }
            else if (reSortBy ==='most comments') {
                //sort data by the most comments feedback              r
                sortByComment()
                //filteredData.reverse() //revers in descending orde
            }
            else if (reSortBy ==='least comments') {
                //sort data by the least upvotes feedback
                sortByComment()
                console.log(filteredData)
                //setState(JSON.stringify(filteredData))
            }

        } 
        //update state for rerendering feedback list  based on the search param key type        
        if (queryVal[0]==='category') {
            updateByCategory()
        }

        if (queryVal[0]==='sortBy') {
            sortBy(queryVal[1])
        }

        //update state
        if (filteredData.length>0) {
            setState(JSON.stringify(filteredData))
        }
        else {
            setState(JSON.stringify(data))
        }
 
    },[search, state])
    
   
   

    return (
       
        <motion.div  variants={variants} animate={controls}  className='m-0 pt-8 md:pt-6 lg:pt-5 px-6 md:px-0 lg:col-start-2 w-full'>
            {JSON.parse(state).map(feedback => {
                let commentNo= feedback.comments ? feedback.comments.length : 0
                return <Feedback title={feedback.title} desc={feedback.description} category={feedback.category} upvote={feedback.upvotes} commentNo={commentNo} id={feedback.id}/>
            })}
        </motion.div>
    )
}