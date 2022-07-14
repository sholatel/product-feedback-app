import React, {useEffect, useState,useRef} from 'react'
import { icons } from '../assets/icons/index'
import { DropdownMenu } from './DropdownMenu'


//customised html select element for flexibility
//takes three props, the dropdown option key, the menuItems and the choice style


export const Dropdown = ({optionKey, menuItems, style, selectedItem, setSelectedItem, menuRef, sort=false}) => {
    //convert menuitems to lower case and return new array
    const lowerCaseMenuItems= menuItems.map(item=> item.toLowerCase()) 
    //determine default dropdown selected item index 
    const selectedItemIndex= selectedItem ? lowerCaseMenuItems.indexOf(selectedItem) : 0  
    const [selectedOption, setSelected] = useState(menuItems[selectedItemIndex])
    const dropdownIconRef = useRef()
    //useEffect to update the selectedItem state from the parent component
    useEffect (()=>{
        //call setSelectedItem if not undefine
        if (setSelectedItem) {
            setSelectedItem(selectedOption)
        }
        switchDropDownIconDown()
       
    },[selectedOption])

    //function for displaying dropdownMenu
    const displayMenu = () => {
        //display drop down menu
        menuRef.current.style.display='block'
    }

    //function for hidding dropdownMenu
    const hideMenu = () => {
        //hide drop down menu
        menuRef.current.style.display='none'
    }

    const dropdownIcon={backgroundImage:`url(${icons.ArrowDown})`}
    const switchDropDownIconUp= ()=> {
        const targetNode = dropdownIconRef.current 
        if (targetNode.id==='down') {
            targetNode.style.backgroundImage=`url(${icons.ArrowUp})`
            targetNode.id='up' 
            displayMenu(menuRef)             
            return;
        }
        // if (targetNode.id==='up') {
        //     targetNode.style.backgroundImage= `url(${icons.ArrowDown})`
        //     targetNode.id='down'
        //     hideMenu(menuRef)
        //     return 
        // }
    } 

    const switchDropDownIconDown= ()=> {
        const targetNode = dropdownIconRef.current 
         if (targetNode.id==='up') {
             targetNode.style.backgroundImage= `url(${icons.ArrowDown})`
             targetNode.id='down'
             hideMenu(menuRef)
             return 
         }
    } 
    return  (
        <div id='drop-down-container' className='relative' onTouchStart={switchDropDownIconUp} onTouchMove={switchDropDownIconDown} onMouseOut={switchDropDownIconDown} onMouseOver={switchDropDownIconUp}>
            <div id='dropdown' className={style.dropDown} >
            {optionKey && <p className='text-[#F2F4FE] text-body3 font-jost font-normal m-0 md:text-h4'>{optionKey}</p>}
            <p id='selected-item' className={style.selectedItem}>{selectedOption}</p>
            <a ref={dropdownIconRef} id='down' style={dropdownIcon} className={style.menuIcon} />
            </div>
            <DropdownMenu menuRef={menuRef} state={selectedOption} setState={setSelected} menuItems={menuItems} style={style.dropdownMenu} sort={sort}/>
        </div>           
    )
}