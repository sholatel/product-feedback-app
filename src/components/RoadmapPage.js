import {icons} from '../assets/icons/index'
import { useNavigate, NavLink, Outlet } from "react-router-dom"
import { Button } from "./Button"
import { useContext } from "react"
import { DataContext } from "../App"
import { useFilter } from '../hooks/useFilter'
import  RoadmapList  from './RoadmapList'

//functional component for /roadmap route 
const RoadmapPage = ()=> {
    const navigate = useNavigate()
    const btnStyle = 'invert brightness-0 bg-transparent text-white flex flex-row items-center gap-4'
    const [jsonData, setJsonData] =useContext(DataContext)
    const data = JSON.parse(jsonData)  //convert jsonData string format to object
    //get the feedbacks with live status using 
    const live = useFilter (data.productRequests,'live')
    //get the feedbacks with in-progress status
    const inProgress  = useFilter (data.productRequests,'in-progress')
     //get the feedbacks with planned status
    const planned= useFilter (data.productRequests,'planned')

    const btnHandler = ()=> {
        //take one step back
        navigate('/')
    }

    const btnStyle2='bg-[#AD1FEA] w-[134px] h-10 md:w-[158px] md:h-11 hover:bg-[#C75AF6] text-btnColor'
    //handler for handling the button which when click will navigate the button to new_feedback route
    const btnHandler2= ()=> {
        navigate('/new_feedback')
    }
 
    return (
        <section  className='w-full h-full bg-appBg grid grid-cols-1 auto-rows-min z-5 mobileland:px-0 md:px-10 mobileland:py-0 md:py-14 lg:py-[78px] font-jost'> 
            <div className='relative m-0 self-start bg-dropContain h-[100px] mobileland:h-[100px] md:h-[113px] px-6 mobileland:rounded-none  md:rounded-link lg:m-0 flex  flex-row items-center justify-between p-6'>            
                <div className="grid grid-cols-1 gap-1">
                    <Button name='Go back' imgUrl={icons.ArrowLeft} style={btnStyle} handler={btnHandler}/>
                    <h1 className='font-bold text-h3 text-white'>Roadmap</h1>
                </div>
                <Button name='+ Add Feedback' imgUrl={icons.plus} style={btnStyle2} handler={btnHandler2}/>
            </div>
            {/*Beginning of Mobile page main body design*/}
            <div id='roadmap-page-mobile-design' className='md:hidden mobileland:block'>
                <div className='h-10 px-6 border-b-[rgba(140,146,179,0.25)] border-b-[1px] border-b-solid w-full flex flex-row items-center justify-between font-bold font-jost text-body3 sm:text-sm text-[rgba(58,67,116,0.4)]'>
                    <NavLink  to='planned' className='after:bg-[#F49F85] after:duration-1000 after:transition-colors after:animate-wiggle'>Planned ({planned.length})</NavLink>
                    <NavLink  to='in-progress' className='after:bg-[#AD1FEA] after:animate-wiggle after:duration-1000 after:transition-colors' >In-progress ({inProgress.length})</NavLink>
                    <NavLink  to='live' className='after:bg-[#62BCFA] after:duration-1000 after:transition-colors after:animate-wiggle' >Live ({live.length})</NavLink>
                </div>
                <Outlet/>
            </div>
            {/*end of Mobile page main body design*/}
            {/*Beginning of desktop and tablet page main body design*/}
            <div className='hidden mobileland:!hidden  md:grid grid-cols-3 auto-rows-min'>
                <div className=''>
                    <RoadmapList listName='planned'/> 
                </div>
                <div className=''>
                    <RoadmapList listName='in-progress'/> 
                </div>
                <div className=''>
                    <RoadmapList listName='live'/> 
                </div>
                
            </div>
            {/*end of desktop and tablet page main body design*/}
        </section>
    )
}

export default RoadmapPage