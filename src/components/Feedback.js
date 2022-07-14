import  {Button} from './Button'
import {icons} from '../assets/icons/index'
import {Comment} from './Comment'
import { useNavigate } from 'react-router-dom'
import { useUpvote } from '../hooks/useUpvote'
import { useEffect, useState } from 'react'
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

export const Feedback = ({title, desc, category, upvote, commentNo, id})=> {
  
    const navigate =useNavigate()
    const {hasUserUpvote,setUpvote,upvoter, undoUpvote} = useUpvote(id)
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

    const listClickHandler = (evt) => {
        evt.stopPropagation()
        navigate('/feedback/'+id)
    }

    const btnStyle='bg-linkbg w-[69px] h-8 text-roadmap flex flex-row gap-[10px] justify-center items-center'
    const btnStyle2='hidden bg-linkbg w-[40px] h-[53px] text-roadmap md:flex flex-col gap-[8px] justify-center items-center hover:bg-[#CFD7FF]'
    const btnStyleUpvote= 'text-white bg-[#4661E6] w-[69px] h-8 text-roadmap flex flex-row gap-[10px] justify-center items-center'
    const btnStyle2Upvote='hidden bg-[#4661E6] w-[40px] h-[53px] text-white md:flex flex-col gap-[8px] justify-center items-center'
    const imgStye='invert brightness-0'
    return (
        <li key={id} className='bg-white rounded-link  mb-4 lg:mb-5 list-none min-h-[200px] md:min-h-[151px] p-6 font-jost flex flex-col md:flex-row justify-between' onClick={listClickHandler} >
           {/*Tablet and desktop*/}
           <div className='h-full w-full hidden md:flex  flex-row justify-between break-all'>
            <div className='h-full flex flex-row gap-10'>
                <Button name={upvote} imgUrl={icons.ArrowUp} handler={handler} style={hasUserUpvote ? btnStyle2Upvote : btnStyle2}  imgStyle={hasUserUpvote ? imgStye : null} />
                <div className='hidden md:flex flex-col h-full justify-between'>
                    <p className='text-h3 font-bold text-roadmap !break-words'>{title}</p>
                    <p className='text-body1 font-normal text-status overflow-auto'>{desc}</p>
                    <p className='w-max px-4 py-2  bg-linkbg text-body3 text-link font-semibold rounded-link grid place-items-center'>{category}</p> 
                </div>
            </div>
            <Comment commentNo={commentNo}/>
           </div>
            {/* End of Tablet and desktop*/}
            {/*Mobile only*/}
            <p className='text-body3 font-bold text-roadmap md:hidden  !break-words'>{title}</p>
            <p className='text-body3 font-normal text-status md:hidden  !overflow-scroll'>{desc}</p>
            <p className='w-max px-4 py-2  bg-linkbg text-body3 text-link font-semibold rounded-link grid place-items-center md:hidden'>{category}</p>
            <div className='m-0 flex flex-row justify-between md:hidden'>
                <Button name={upvote} imgUrl={icons.ArrowUp} handler={handler} style={hasUserUpvote ? btnStyleUpvote : btnStyle}  imgStyle={hasUserUpvote ? imgStye : null}/>
                <Comment commentNo={commentNo}/>
            </div>
             {/*End Mobile only*/}
        </li>
    )    
}   