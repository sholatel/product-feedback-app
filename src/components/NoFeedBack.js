import { Button } from "./Button"
import {icons} from '../assets/icons/index'
import { useNavigate } from "react-router-dom"

//component that got displayed when there is no 
//feedback available



export const NoFeedBack = () => {
    const navigate =useNavigate()
    const handler = ()=> {
        //programmatically navigate to add new feedback or comment page or route
        navigate('/new_feedback')
     }

     const btnStyle='bg-[#AD1FEA] w-[134px] h-10 md:w-[158px] md:h-11 hover:bg-[#C75AF6] text-btnColor mx-auto'
     

    return (
       <div id="no-feedback-container" className="flex flex-col justify-center  bg-white h-[460px] md:h-[600px] m-6 font-jost gap-6 rounded-link lg:pt-5 lg:col-start-2 lg:m-0">
        <div><img src={icons.empty} className='w-[102px] h-28 mx-auto md:w-[130px] md:h-[137px] '/></div>  
        <h1 className="font-bold text-h3 text-roadmap mx-auto md:text-h1">There is no feedback yet.</h1>
        <p className="font-normal text-body3 text-status break-word mx-6 text-center md:text-body1">Got a suggestion? Found a bug that needs to be squashed? We love hearing about new ideas to improve our app.</p>
        <Button name='+ Add feedback' handler={handler} style={btnStyle} />
       </div>
    )
}