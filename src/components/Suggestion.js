import {icons} from '../assets/icons/index'

//component for stating suggestion count
export const Suggestion = ({data})=> {
    //get the feedback with suggestion status
    const suggesion = data.filter((feedback)=> {
        return feedback.status==='suggestion'
    })   

    return (
        <div className='hidden md:flex flex-row gap-4 text-h3 font-bold font-jost text-white'>
            <span style={{backgroundImage:`url(${icons.suggestion})`}} className='h-[22px] w-6 bg-center'/>
            <p>{suggesion.length} {suggesion.length>1 ?'suggestions' :'suggestion' }</p>
        </div>
    )
}