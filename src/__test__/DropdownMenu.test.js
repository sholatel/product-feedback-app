import { fireEvent, render,screen } from "@testing-library/react";
import {DropdownMenu} from '../components/DropdownMenu'
const menuItems = [
    'Most upvotes',
    'Least upvotes',
    'Most comments',
    'Least comments'
]

describe('Dropdown menu component unit test', ()=> {
    it("Numbers of list element in the component should be equal to the length of the menuItems list", async ()=> {
        render(<DropdownMenu  menuItems={menuItems}/>)
        const listElements =document.getElementsByClassName('item-list')
        expect(listElements.length).toBe(menuItems.length)
    })

    it("An element with id 'check-icon' should exist in the DOM when state prop is passed and matches one of the list item", async ()=> {
        render(<DropdownMenu menuItems={menuItems} state='Least upvotes'/>)
        const checkIcon =document.getElementById('check-icon')
        expect(checkIcon).not.toBe(null)
    })
})