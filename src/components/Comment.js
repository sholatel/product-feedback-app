import {icons} from '../assets/icons/index'


//feedback comment number tracking component function
//takes the total number of comment a feedback has attracted
export const Comment = ({commentNo})=> {
    return (
        <div className='flex flex-row gap-1 items-center m-0 p-0 md:self-center'>
            <span style={{backgroundImage:`url(${icons.comment})`}} className='w-[18px] h-4 bg-no-repeat m-0' />
            <p className='font-bold text-roadmap text-body3 m-0 md:text-body1'>{commentNo}</p>
        </div>
    )

}