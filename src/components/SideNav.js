import {useFilter} from '../hooks/useFilter'
import {Category} from './Category '
import { DesktopHeader } from './DesktopHeader'
import {RoadMap} from './RoadMap'


//side nav component
//takes single prop, which is the data prop
export const SideNav = ({data})=> {
    //get the feedbacks with live status using 
    const live = useFilter (data,'live')
    //get the feedbacks with in-progress status
    const inProgress  = useFilter (data,'in-progress')
     //get the feedbacks with planned status
    const planned= useFilter (data,'planned')

    //statistics data 
    const statistics= [
        {statusType:'Planned', statusCount:planned.length},
        {statusType:'In-Progress', statusCount:inProgress.length},
        {statusType:'Live', statusCount:live.length},
    ]
    
    
    return (
        <div id="side-nav" style={{backgroundColor:'rgba(0,0,0,0.5)'}} className='absolute mobileland:!absolute md:static top-[72px] mobileland:!top-[72px] md:top-0 h-full mobileland:!h-full md:h-max w-0 mobileland:w-0 md:w-full lg:w-fit hidden mobileland:hidden /*or flex*/ md:flex  md:flex-row justify-end mobileland:!justify-end  md:justify-between z-20 mobileland:!mb-0 md:mb-5'>
           <div  className='overflow-auto bg-appBg w-3/4 mobileland:!w-3/4 md:w-full flex flex-col mobileland:!flex-col md:flex-row lg:flex-col lg:items-start items-center mobileland:!items-center md:justify-center gap-6 pt-6 lg:pt-0'>
           <DesktopHeader/>
            <Category/>
            <RoadMap statistics={statistics}/>            
           </div>
        </div>
    )
}