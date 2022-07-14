import { Button } from "./Button"
import {icons} from '../assets/icons/index'
import { useNavigate, useParams } from "react-router-dom"
import {InputWithTitle} from './InputWithTitle'
import {TextAreaWithTitle} from './TextAreaWithTitle'
import  {DropdownWithTitle} from './DropdownWithTitle'
import { useContext, useState, useRef} from "react"
import { DataContext } from "../App"
import { motion } from "framer-motion"

//page for new_feedback route 
const EditFeedback = ({variants})=> {
    const navigate = useNavigate()
    const {id}=useParams() 
    const [jsonData, setJsonData] =useContext(DataContext)
    const menuRef1 = useRef() //ref passed to dropdown component as prop to control the display of the dropdown menu from here
    const menuRef2 = useRef() //ref passed to dropdown component as prop to control the display of the dropdown menu from here
    const data = JSON.parse(jsonData)  //convert jsonData string format to object
    //find the feedback associated with the given ID
    const feedback=data.productRequests.find( (cmt)=> { return cmt.id===Number(id)}) 
    
    //state for holding input fields current values
    const [title, setTitle]= useState(feedback.title)
    const [description, setDescription]= useState(feedback.description)
    const [selectedItem, setSelectedItem]= useState(feedback.category)
    const [selectedStatusItem, setSelectedStatusItem]= useState(feedback.status)

    //state for tracking errors in form fields
    const [isTitleError, setTitleError]=useState(false)
    const [isDescriptionError, setDescriptionError]=useState(false)

    //button styles 
    const btnStyle = 'bg-transparent text-status flex flex-row items-center gap-4'
    const addBtnStyle='md:order-2 grid place-items-center w-full md:w-[130px] lg:w-[100px] h-10 md:h-11 bg-[#AD1FEA] text-btnColor font-bold text-body3 justify-self-end'
    const cancelBtnStyle='md:order-1 grid place-items-center w-full md:w-[90px] lg:w-20 h-10 md:h-11 bg-roadmap text-btnColor font-bold text-body3 md:justify-self-end'
    const deleteBtnStyle= 'md:order-1 grid place-items-center w-full md:w-[90px] lg:w-20 h-10 md:h-11 bg-[#D73737] text-btnColor font-bold text-body3'

    //button click handlers
    const btnHandler = ()=> {
        //take one step back
        navigate(-1)
    }

    const saveHandler = ()=> {         
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

          //get feedback index
          const feedbackIndex =data.productRequests.indexOf(feedback)

         //new feedback object
         const category = selectedItem
         const status = selectedStatusItem
         const updatedFeedback= {...feedback, title,description,category, status}
         //alert(updatedFeedback.category)
         //replace the feedback with updated one
         data.productRequests[feedbackIndex]=updatedFeedback
 
         //update context
         const newData= {...data}
         setJsonData(JSON.stringify(newData))
         //go back to previous page   
         navigate(-1)
    }

    //handler for deleting feedback
    const deleteHandler = ()=> {
        //get feedback index
        const feedbackIndex =data.productRequests.indexOf(feedback)
        
        //remove feedback from data 
        data.productRequests.splice(feedbackIndex,1)

        //update context
        const newData= {...data}
        setJsonData(JSON.stringify(newData))

        //return to homepage
        navigate('/')
    }
    //dropdown suite style
    const dropDownStyle = {
        dropDown:'flex flex-row items-center justify-between gap-2 w-full bg-appBg h-12 rounded-[5px] focus:outline-none focus:border-solid focus:border-[1px] focus:border-[#4661E6] px-6 text-body3 text-roadmap',
        selectedItem:'text-body3 text-roadmap font-normal',
        menuIcon:'w-2 h-2 bg-no-repeat bg-center bg-cover',
        dropdownMenu:'hidden bg-white  box-border shadow-dropdown rounded-link absolute z-10 top-[calc(100%)] w-full'
        //object for setting the style prop dropdown component
    }
    //dropdown menu items 
    const menuItems =['Feature', 'UI', 'UX', 'Enhancement', 'Bug']
    const planMenuItems =['Suggestion','Planned', 'In-Progress', 'Live']
    return (
        <motion.section variants={variants} exit='exit' initial='hidden' animate='visible' className="bg-appBg h-full w-full grid grid-cols-1 auto-rows-min p-6 gap-[55px] font-jost md:p-[114px] lg:px-[300px] xlg:px-[450px] lg:py-[92px]">
            <Button name='Go back' imgUrl={icons.ArrowLeft} style={btnStyle} handler={btnHandler}/>
            <div className="bg-white w-full grid grid-cols-1 relative rounded-link p-6 gap-6 md:px-[42px] md:py-[52px]">
            <div className="w-10 md:w-14 h-10 md:h-14 bg-no-repeat bg-center rounded-full absolute ml-6 top-[-20px] z-10" style={{backgroundImage:`url(${icons.editFeedback})`}}></div>
                <h1 className='text-h3 md:text-h1 font-bold text-roadmap md:mb-4'>Editing '{feedback.title}'</h1>
                <InputWithTitle isError={isTitleError} setError={setTitleError} value={title} setValue={setTitle} title='Feedback Title' hint='Add a short, descriptive headline'/>
                 <DropdownWithTitle menuRef={menuRef2} selectedItem={selectedItem} setSelectedItem={setSelectedItem}  menuItems={menuItems} style={dropDownStyle} title='Category' hint='Choose a category for your feedback'/>
                 <DropdownWithTitle menuRef={menuRef1} selectedItem={selectedStatusItem} setSelectedItem={setSelectedStatusItem}  menuItems={planMenuItems} style={dropDownStyle} title='Update Status' hint='Change feature state'/>
                <TextAreaWithTitle isError={isDescriptionError} setError={setDescriptionError} value={description} setValue={setDescription} title='Feedback detail' hint='Include any specific comments on what should be improved, added, etc.'/>
                <div className="grid grid-cols-1 auto-rows-min gap-4 md:flex md:flex-row md:justify-between">
                   <div className="grid grid-cols-1 auto-rows-min md:order-2 gap-4 md:flex md:flex-row">
                     <Button name='Save Changes' style={addBtnStyle} handler={saveHandler}/>
                     <Button name='Cancel' style={cancelBtnStyle} handler={btnHandler}/>
                   </div>
                    <Button name='Delete' style={deleteBtnStyle} handler={deleteHandler}></Button>
                </div>
            </div>
             {/*The below div is a dummy element that just gives space between the last element and the body bottom*/}
             <div className="h-6 w-full"></div>
        </motion.section>
    )
}

export default EditFeedback