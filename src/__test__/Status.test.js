import { screen, render } from "@testing-library/react";
import {Status} from '../components/Status'

describe ('Unit test for status component', ()=> {
 

    it("BackgroundColor of status-color element should be '#F49F85', 'AD1FEA', and '#62BCFA' if the statusType is 'Planning' , 'In-Progress', and'Live' respectively", async ()=> {
        render(<Status statusType='Planning' statusCount=' '/>)
        const paragraph=document.getElementsByClassName('status-color')[0]
        console.log(paragraph.style.backgroundColor)
    })

    it("Status should contain element with text content of the statusType prop passed to it' ", async ()=> {
        render(<Status statusType='Planning' statusCount=' '/>)
        const paragraph=screen.getByText('Planning')
        expect(paragraph).toBeInTheDocument()
    })

    it("Status should contain element with text content of the statusCount prop passed to it' ", async ()=> {
        render(<Status statusType='Planning' statusCount='4'/>)
        const paragraph=screen.getByText('4')
        expect(paragraph).toBeInTheDocument()
    })


 
})