import { useContext } from "react";
import { DataContext } from "../App";
import {FeedbackWithRoadmap} from './FeedbackWithRoadmap'
import { useFilter } from "../hooks/useFilter";
import { motion } from 'framer-motion'

//lists of different feedback roadmap
const RoadmapList = ({listName})=> {
    const [jsonData, setJsonData] =useContext(DataContext)
    const data = JSON.parse(jsonData)  //convert jsonData string format to object
     //get the feedbacks with the status that match listname 
     const feedbacks= useFilter (data.productRequests, listName)
     const variants= {
        hidden: {
            opacity:0,
            x:'100vw'
        },
        visible: {
            opacity:1,
            x:0,
            transition: {
                duration:0.7,
                delay:0.1,
                delayChildren:0.1,
                
            }
        },
        exit:{
            x:'-100vw',
            transition: {
                ease:'easeInOut'
            }
        }
      }
     const headerName = ()=> {
         switch(listName) {
             case 'in-progress':
                 return 'In-progress';
             case 'planned':
                 return 'Planned';
             case 'live':
                 return 'Live';
             default:
                 break;
         }
     }

     const hint = ()=> {
        switch(listName) {
            case 'in-progress':
                return 'Currently being developed';
            case 'planned':
                return 'Ideas prioritized for search';
            case 'live':
                return 'Released features';
            default:
                break;
        }
    }
    

     return (
         <motion.div variants={variants} initial='hidden' exit='exit' animate='visible' className="mt-6 px-6">
             <div className="font-jost mb-6">
                <h1 className="text-h3 md:text-h4 lg:text-h3 text-roadmap font-bold">{headerName()} ({feedbacks.length})</h1>
                <p className="text-body3 sm:text-sm md:text-h4 lg:text-body1 text-status font-normal">{hint()}</p>
             </div>
            {
                feedbacks.map(feedback=> {
                    let commentNo= feedback.comments ? feedback.comments.length : 0
                    return <FeedbackWithRoadmap title={feedback.title} desc={feedback.description} category={feedback.category} upvote={feedback.upvotes} commentNo={commentNo} id={feedback.id} listName={listName}/>                  
                  } 
                 )
                }
         </motion.div>
     )
}

export default RoadmapList