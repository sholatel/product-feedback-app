

//functional component for displaying user profile pics
export const ProfilePic = ({imgUrl})=> {
    return ( 
        <div id="profile-div" style={{backgroundImage:`url(${imgUrl.replace('./','../')})`}} className='w-10 h-10 bg-no-repeat bg-cover m-0 rounded-full'>
        </div>
    )
}
