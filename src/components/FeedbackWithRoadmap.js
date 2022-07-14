import  {Button} from './Button'
import {icons} from '../assets/icons/index'
import {Comment} from './Comment'
import { useUpvote } from '../hooks/useUpvote'
//fucntional component for displaying the available feedbacks
//takes six props
/* 
    1. The feedback title
    2. The feedback description
    3. the feedback category
    4. the feedback upvote 
    5. and the no. of comment
    6. lastly the comment id
*/



export const FeedbackWithRoadmap = ({title, desc, category, upvote, commentNo, id, listName})=> {
    const {hasUserUpvote,setUpvote,upvoter, undoUpvote} = useUpvote(id)
    const statusColor = ()=> {
        switch(listName) {
            case 'planned':               
                return '#F49F85'        
            case 'in-progress':               
                return  '#AD1FEA'
            case 'live':
                return '#62BCFA'
        }
    }

    const statusType = ()=> {
        switch(listName) {
            case 'planned':               
                return 'Planned'        
            case 'in-progress':               
                return  'In-Progress'
            case 'live':
                return 'Live'
        }
    }

   //click handler for upvote button
   const handler = (evt)=> {
    evt.stopPropagation()
    if (hasUserUpvote) {
        undoUpvote()
        setUpvote(false)
        return
    }
    upvoter()
    setUpvote(true)
    //commentNo= commentNo+1
}


    const btnStyle='bg-linkbg w-[69px] h-8 text-roadmap flex flex-row gap-[10px] justify-center items-center'
    const btnStyleUpvote= 'bg-[#4661E6] w-[69px] h-8 text-white flex flex-row gap-[10px] justify-center items-center'   
    const imgStye='invert brightness-0'
    
    return (
        <li key={id} style={{borderColor:`${statusColor()}`}} className='border-t-4 bg-white rounded-[5px]  mb-4 lg:mb-5 list-none h-[233px] md:min-h-[260px] lg:h-[272px] p-6 font-jost flex flex-col justify-between'>
            <div className="m-0 flex flex-row items-center gap-4 ">
                <p  className="m-0 w-2 h-2 rounded-full" style={{backgroundColor:statusColor()}}></p>
                <p className="m-0 font-normal text-body3 sm:text-sm lg:text-body1 text-status">{statusType()}</p>                
            </div> 
            <p className='text-body3 sm:text-sm lg:text-h3 font-bold text-roadmap'>{title}</p>
            <p className='text-body3 sm:text-sm lg:text-body1 font-normal text-status'>{desc}</p>
            <p className='w-max px-4 py-2  bg-linkbg text-body3 sm:text-sm text-link font-semibold rounded-link grid place-items-center'>{category}</p>
            <div className='m-0 flex flex-row justify-between'>
                <Button name={upvote} imgUrl={icons.ArrowUp} handler={handler} style={hasUserUpvote ? btnStyleUpvote : btnStyle } imgStyle={hasUserUpvote ? imgStye : null}/>
                <Comment commentNo={commentNo}/>
            </div>
        </li>
    )    
}   