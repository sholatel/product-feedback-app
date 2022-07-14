import { Dropdown } from "./Dropdown"


//functional component with already made title and hint
/* 
    **Takes eight props**
    1. The optionKey (optional)
    2. The menuitems/dropdown items (compulsory)
    3.The style (optional)
    4. The Title text
    5. The hint text
    6.selectedItem
    7.setSelectedItem
    8.menuRef 
*/

export const  DropdownWithTitle = ({menuRef, optionKey, menuItems , style , title, hint, selectedItem,setSelectedItem}) => {
    return (
        <div className="grid grid-cols-1 auto-rows-min gap-4">
            <div className="">
                <h1 className="text-roadmap text-body3 font-bold md:text-h4">{title}</h1>
                <p className="text-body3 text-status font-normal md:text-h4">{hint}</p>
            </div>
            <Dropdown menuRef={menuRef} optionKey={optionKey} menuItems={menuItems} style={style} selectedItem={selectedItem} setSelectedItem={setSelectedItem}/>
        </div>
    )
}