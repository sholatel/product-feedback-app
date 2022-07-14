import {icons} from '../assets/icons/index' 


export const BoardHeader = ()=> {
    //determines the nav bar icon for mobile 
    const navIcon = (evt) => {
        evt.preventDefault()
        const bgImg=evt.target.style.backgroundImage
        const cmpImg=`url("${icons.open}")`
      
        if (bgImg===cmpImg) {    
            evt.target.style.backgroundImage=`url(${icons.close})`

            //get side-nav element to animate
            const sideNav = document.getElementById('side-nav')
            const sideNavContent = document.getElementById('category-container')
            const sideNavContent2 = document.getElementById('roadmap-container')

            //clear existing animation if exists
            sideNav.className= sideNav.className.replace('side-nav-close', '')
            sideNavContent.className= sideNavContent.className.replace('side-nav-content-close', '')
            sideNavContent2.className= sideNavContent2.className.replace('side-nav-content-close', '')

            //create new animation by appending new class
            sideNav.className=sideNav.className.replace('mobileland:w-0','')
            sideNav.className= sideNav.className + ' side-nav'
           // sideNavContent.className=sideNavContent.replace('mobileland:opacity-0','')
            sideNavContent.className= sideNavContent.className + ' side-nav-content'
            //sideNavContent2.className=sideNavContent2.replace('mobileland:opacity-0','')
            sideNavContent2.className= sideNavContent2.className + ' side-nav-content'
            document.querySelector('body').style.position='fixed' //stops body from scrolling
        }

        else  {            
            evt.target.style.backgroundImage=`url(${icons.open})`
            const sideNav = document.getElementById('side-nav')
            const sideNavContent = document.getElementById('category-container')
            const sideNavContent2 = document.getElementById('roadmap-container')

            //reversing side-nav before  nav is closed 
            sideNav.className=sideNav.className+' mobileland:w-0' //reverse behaviour for mobile tablet
            sideNav.className= sideNav.className.replace('side-nav', 'side-nav-close')
            //sideNav.className= sideNav.className.replace('mobileland:flex','mobileland:hidden')
            //sideNavContent.className=sideNavContent.className+ ' mobileland:opacity-0'
            sideNavContent.className= sideNavContent.className.replace('side-nav-content', 'side-nav-content-close') 
            //sideNavContent2.className=sideNavContent2.className+ ' mobileland:opacity-0'
            sideNavContent2.className= sideNavContent2.className.replace('side-nav-content', 'side-nav-content-close') 
            document.querySelector('body').style.position=''
        }
    }
    return (
        <div id='board-header-container' className='bg-board-header h-boardHeight mobileland:!bg-board-header md:bg-board-header-tb lg:bg-board-header-dk bg-no-repeat w-full m-0 bg-cover flex flex-row justify-between px-6 items-center mobileland:!flex md:hidden z-20'>
            <div id='left-content'>
                <p className='font-jost text-body2 font-bold text-white'>Frontend Mentor</p>
                <p className="font-jost text-body3 font-medium text-white">feedback board</p>
            </div>
            <a href='' id='side-nav-drawer' style={{background:`url(${icons.open})`}} onClick={navIcon} className='block w-5 h-4 bg-cover !bg-no-repeat' ></a>
        </div>
    )
}



