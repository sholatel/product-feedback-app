import { fireEvent, render,screen } from "@testing-library/react";
import { Button  } from "../components/Button";
const mockHandler= ()=> {
    console.log('Button Clicked')
}

describe ('Unit test for Button component', ()=> {
    it("Button should have two spans element when imgUrl is passed", async()=> {
        render(<Button imgUrl='http.example.com'/>)
        const container = document.getElementById('custom-button')
        const spanElements=document.getElementsByTagName('span')
        expect(spanElements.length).toBe(2)
    })

    it("Button should have have an element that contains the text of the name prop passed", async()=> {
        render(<Button name='Add feedback' imgUrl='http.example.com'/>)
        const textElement = await screen.findByText(/Add feedback/i, {exact:true})
        expect(textElement).toBeInTheDocument
    })

    it("If name prop is not provided, button should an element with text content 'click'", async()=> {
        render(<Button  imgUrl='http.example.com'/>)
        const textElement = await screen.findByText(/Click/i, {exact:true})
        expect(textElement).toBeInTheDocument
    })


    it("Button should be clickable and the handler prop should be called to handle the click event by loging 'Button clicked' on the console" , async()=> {
        render(<Button  handler={mockHandler}/>)
        const button = document.getElementById('custom-button')
        fireEvent.click(button)        
        
    })

    
})