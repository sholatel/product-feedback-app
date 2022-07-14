import { Button } from "./Button"
import {icons} from '../assets/icons/index'
import { useNavigate } from "react-router-dom"
import {InputWithTitle} from './InputWithTitle'
import {TextAreaWithTitle} from './TextAreaWithTitle'
import  {DropdownWithTitle} from './DropdownWithTitle'
import { motion } from "framer-motion"
import { useContext, useState, useRef} from "react"
import { DataContext } from "../App"

//page for new_feedback route 
const NewFeedback = ({variants})=> {
    const navigate = useNavigate()
    const [jsonData, setJsonData] =useContext(DataContext)
    const data = JSON.parse(jsonData)  //convert jsonData string format to object
    const menuRef= useRef()
    //state for holding input fields current values
    const [title, setTitle]= useState('')
    const [description, setDescription]= useState('')
    const [selectedItem, setSelectedItem]= useState('')

    //state for tracking errors in form fields
    const [isTitleError, setTitleError]=useState(false)
    const [isDescriptionError, setDescriptionError]=useState(false)

    //button styles
    const btnStyle = 'bg-transparent text-status flex flex-row items-center gap-4'
    const addBtnStyle='md:order-2 grid place-items-center w-full md:w-36 h-10 md:h-11 bg-[#AD1FEA] text-btnColor font-bold text-body3'
    const cancelBtnStyle='md:order-1 grid place-items-center w-full md:w-[93px] h-10 md:h-11 bg-roadmap text-btnColor font-bold text-body3'
    
    const btnHandler = ()=> {
        //take one step back
        navigate(-1)
    }

    const addFeedback = ()=> {
       
        //check for error in form field 
        //if title field is empty
        if (title.length===0) {
            document.querySelector('input').focus()
            setTitleError(true)
            return; //stop submission
         } 

         //if description field is empty
         if (description.length===0) {
            document.querySelector('textarea').focus()
            setDescriptionError(true)
            return; //stop submission
         } 
        
        //get the feedback new id by adding length of previous feedbacks and 1
        const id=data.productRequests.length+1 
        const category=selectedItem
        const upvotes=0
        const status='in-progress' //defaul status for new feedback

        //create new feedback object
        const newFeedback= {
            id,
            title,
            category,
            upvotes,
            status,
            description
        }

        //update data
        data.productRequests.push(newFeedback)

         //update context
         const newData= {...data}
         setJsonData(JSON.stringify(newData))
         
         //return to previous page
         navigate(-1)
    }
    const dropDownStyle = {
        dropDown:'flex flex-row items-center justify-between gap-2 w-full bg-appBg h-12 rounded-[5px] focus:outline-none focus:border-solid focus:border-[1px] focus:border-[#4661E6] px-6 text-body3 text-roadmap',
        selectedItem:'text-body3 text-roadmap font-normal',
        menuIcon:'w-2 h-2 bg-no-repeat bg-center bg-cover',
        dropdownMenu:'hidden bg-white  box-border shadow-dropdown rounded-link absolute z-10  top-[calc(100%)] w-full'
        //object for setting the style prop dropdown component
    }
    const menuItems =['Feature', 'UI', 'UX', 'Enhancement', 'Bug']
    
    return (
        <motion.section variants={variants} exit='exit' initial='hidden' animate='visible' className="bg-appBg h-full w-full grid grid-cols-1 auto-rows-min p-6 gap-[55px] font-jost md:p-[114px] lg:px-[300px] xlg:px-[450px] lg:py-[92px]">
            <Button name='Go back' imgUrl={icons.ArrowLeft} style={btnStyle} handler={btnHandler}/>
            <div className="bg-white w-full grid grid-cols-1 relative rounded-link p-6 gap-6 md:px-[42px] md:py-[52px]">
            <div className="w-10 md:w-14 h-10 md:h-14 bg-no-repeat bg-center rounded-full absolute ml-6 top-[-20px] z-10" style={{backgroundImage:`url(${icons.newFeedback})`}}></div>
                <h1 className='text-h3 md:text-h1 font-bold text-roadmap md:mb-4'>Create New Feedback</h1>
                <InputWithTitle isError={isTitleError} setError={setTitleError} value={title} setValue={setTitle} title='Feedback Title' hint='Add a short, descriptive headline'/>
                <DropdownWithTitle menuRef={menuRef} selectedItem={selectedItem} setSelectedItem={setSelectedItem} menuItems={menuItems} style={dropDownStyle} title='Category' hint='Choose a category for your feedback'/>
                <TextAreaWithTitle isError={isDescriptionError} setError={setDescriptionError} value={description} setValue={setDescription} title='Feedback detail' hint='Include any specific comments on what should be improved, added, etc.'/>
                <div className="grid grid-cols-1 auto-rows-min gap-4 md:flex md:flex-row md:justify-end">
                    <Button name='Add Feedback' style={addBtnStyle} handler={addFeedback}/>
                    <Button name='Cancel' style={cancelBtnStyle} handler={btnHandler}/>
                </div>
            </div>
             {/*The below div is a dummy element that just gives space between the last element and the body bottom*/}
             <div className="h-6 w-full"></div>
        </motion.section>
    )
}

export default NewFeedback