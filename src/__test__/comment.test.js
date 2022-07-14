import { render ,screen} from "@testing-library/react";
import {Comment} from '../components/Comment'

describe('Comment component unit test', ()=>{
    it('Component should contain an element that has its text content matches the passes prop text', async ()=>{
        render (<Comment commentNo='3'/>)
        const textElement = screen.getByText('3')
        expect (textElement).toBeInTheDocument
    })
})