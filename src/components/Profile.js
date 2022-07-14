import {ProfilePic} from  './ProfilePic'


//user profile details functional component
export const Profile = ({name, username , imgUrl})=> {
    return (
        <>
                <ProfilePic imgUrl={imgUrl}/>
                <div className='grid grid-cols-1 auto-grid-min'>
                    <p className='text-body3 md:text-h4 font-bold text-roadmap font-jost'>{name}</p>
                    <p className='text-body3  md:text-h4 font-bold text-status font-jost'>@{username}</p>
                </div>
        </>
    )
    
}