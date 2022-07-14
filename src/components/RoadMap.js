import { Link } from "react-router-dom"
import {Status} from './Status'
/*  
    Roadmap component that displays the feedback 
    upate status statistics in the feedback board
*/
//takes statistics array, an array object that contains
//each status type and number of feedback 
//with that status type 

export const RoadMap = ({statistics}) => {
    return (
        <div id='roadmap-container' className="flex flex-col bg-white rounded-link w-w223 mobileland:!mb-16 h-h178 lg:w-w255 p-5 gap-y-3.5 opacity-0 mobileland:opacity-0 md:opacity-100">
            <div id="container-header" className="flex flex-row w-full justify-between items-center m-0">
                <h3 className="m-0 text-h3 font-bold text-roadmap font-jost">Roadmap</h3>
                <Link onClick={()=> {document.querySelector('body').style.position=''}} to='/roadmap' className="text-body3 text-link font-semibold font-jost underline">View</Link>
            </div>
            {statistics.map((status, index)=> {                
               return <Status key={index} statusType={status.statusType} statusCount={status.statusCount}/>
            })}    
        </div>
    )
}