import { icons  } from "../assets/icons"
import { useSearchParams } from "react-router-dom"


//the dropdown-menu component for dropdown component
//takes a prop of list of items for the dropdown menu
//the state that stores the current selected item and 
//the setState that helps to change the state 
//the ref object for controlling the dropwown display
export const DropdownMenu = ({state, setState ,menuItems, style, menuRef,sort}) => {
    //change the selectedValue prop when new item is selected
    const [sortBy, setSort] =useSearchParams()
    const handleClick = (evt)=> {
        setState (evt.target.innerHTML) 
        menuRef.current.style.display='none' //hide dropdown menu after selecting choice option
        sort && setSort({sortBy:evt.target.innerHTML}) //set searchParam for dropdown meant for sorting data
    }

    return (
        <div ref={menuRef} className={'h-fit hidden absolute '+style}>
            {menuItems.map((item,index)=> {
                if (index+1 < menuItems.length) {
                return (     
                <li key={index} className='w-full item-list list-none flex flex-row items-center justify-between px-6 border-b-solid border-b-[1px] h-12 box-border'>
                    <a  href='javascript:void' id="list" className='grid items-center h-full w-full font-normal font-jost text-body3 md:text-body1 text-status focus:text-[#AD1FEA]' onClick={(evt)=> {handleClick(evt)}}>{item}</a>
                    {/*Mark icon should be displayed for selected item*/}
                    {item===state && <a id="check-icon" style={{backgroundImage:`url(${icons.check})`}} className='bg-center w-3 h-3'></a> }
                </li>
                )
                }
                else {
                   return (     
                        <li key={index} className='item-list list-none flex flex-row items-center justify-between px-6  h-12 box-border'  >
                            <a  href='javascript:void' id={item} onClick={(evt)=> {handleClick(evt)}}  className='grid items-center h-full w-full font-normal font-jost text-body3 md:text-body1 text-status focus:text-[#AD1FEA] box-border'>{item}</a>
                            {/*Mark icon should be displayed for selected item*/}
                            {item===state && <a id="check-icon" style={{backgroundImage:`url(${icons.check})`}} className='bg-center w-3 h-3'></a> }
                        </li>
                        )
                }
            })}
        </div>
    )
}