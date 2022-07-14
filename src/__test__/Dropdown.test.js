import { fireEvent, render,screen } from "@testing-library/react";
import { Dropdown } from "../components/Dropdown";

const menuItems = [
    'Most upvotes',
    'Least upvotes',
    'Most comments',
    'Least comments'
]


describe ("Unit test dropdown component", ()=> {
    it("If optionKey prop is passed, a node should contain the value of optionKey prop", async ()=> {
        render(<Dropdown optionKey={'storedBy:'} menuItems={menuItems}/>)
        const keyNode=screen.getByText('storedBy:')
        expect(keyNode).toBeInTheDocument()
    })

    it("If a element is clicked, the element id attribute should change", async ()=> {
        render(<Dropdown menuItems={menuItems}/>)
        const dropdownIcon=document.getElementById('down')
        fireEvent.click(dropdownIcon,{evt:{target:dropdownIcon}})
        expect(dropdownIcon.id).toBe('up')
    })

    it("If a element is clicked, the element background image url style property should change", async ()=> {
        render(<Dropdown menuItems={menuItems}/>)
        const dropdownIcon=document.getElementById('down')
        const imgUrl= dropdownIcon.style.backgroundImage
        fireEvent.click(dropdownIcon,{evt:{target:dropdownIcon}})
        expect(dropdownIcon.style.backgroundImage).not.toBe(imgUrl)
    })
    
})

describe ('DropDown component integration test with Dropdown menu component', ()=> {
    it("the text item of 'selected-item'  element should change when a click event is fired on any of the dropdown menu list item", async ()=> {
        render(<Dropdown menuItems={menuItems}/>)
        const selectedItem =document.getElementById('selected-item')
        const selectedItemValue=selectedItem.innerHTML
        const listElement =document.getElementsByClassName('item-list')
        //fireEvent.click(listElement)
        console.log(listElement)
        expect(selectedItemValue).not.toBe(selectedItem.innerHTML)
    } )
})