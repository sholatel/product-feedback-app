import {BoardHeader} from './BoardHeader'
import { Dropdown } from './Dropdown'
import {SideNav} from './SideNav'
import {NoFeedBack} from './NoFeedBack'
import { Button } from './Button'
import { useContext, React} from 'react'
import { FeedbackList} from './FeedbackList'
import { DataContext } from '../App'
import {icons} from '../assets/icons/index'
import { Suggestion } from './Suggestion'
import { useRef } from 'react'
import { useNavigate} from 'react-router-dom'
import { motion } from 'framer-motion'


//home page/dash board
//takes the animation variant as prop
export const  DashBoard = ({variants})=> {
    const [jsonData, setJsonData] =useContext(DataContext)
    const data = JSON.parse(jsonData)  //convert jsonData string format to object
    const navigate= useNavigate()

    const menuRef = useRef() //ref passed to dropdown component as prop to control the display of the dropdown menu from here
    //dropdown menu items to be passed as prop to Dropdown child component
    const menuItems =['Most Upvotes', 'Least Upvotes', 'Most Comments', 'Least Comments']
    const btnStyle='bg-[#AD1FEA] w-[134px] h-10 md:w-[158px] md:h-11 hover:bg-[#C75AF6] text-btnColor'
    //handler for handling the button which when click will navigate the button to new_feedback route
    const btnHandler= ()=> {
        navigate('new_feedback')
    }
    const dropDownStyle = {
        dropDown:'flex flex-row items-center gap-2',
        selectedItem:'text-[#F2F4FE] text-body3 font-jost font-bold',
        menuIcon:'w-2 h-2 bg-no-repeat bg-center bg-cover invert brightness-0',
        dropdownMenu:'bg-white shadow-dropdown rounded-link  z-10 top-[100%]  w-52 md:w-64'
        //object for setting the style prop dropdown component
    }

    return (
        <motion.section variants={variants} exit='exit' initial='hidden' animate='visible' className='w-full h-full bg-appBg grid grid-cols-1 auto-rows-min lg:grid-cols-two lg:grid-rows-two lg:gap-[30px] z-5 relative mobileland:!px-0 md:px-10 lg:py-[78px]'> 
            
            <BoardHeader/>
            <SideNav data={data.productRequests}/>
            <div className='m-0 self-start bg-dropContain h-dropContain px-6 flex flex-row justify-between relative items-center mobileland:rounded-[0px] md:rounded-link lg:m-0'>
                <div className='flex  flex-row items-center gap-[38px] '>
                    <Suggestion data={data.productRequests} />
                    <Dropdown menuRef={menuRef} optionKey='Sort by :' menuItems={menuItems} style={dropDownStyle} sort={true}/>
                </div>
                <Button name='+ Add Feedback' imgUrl={icons.plus} style={btnStyle} handler={btnHandler}/>
            </div>
            {data.productRequests && data.productRequests.length>0 ?<FeedbackList data={data.productRequests}/> : <NoFeedBack/>} 
        </motion.section>
    )
    
}