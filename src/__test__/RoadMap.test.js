import {RoadMap} from '../components/RoadMap'
import { screen, render } from "@testing-library/react";
import { BrowserRouter } from 'react-router-dom';
const statistics = [
    {'type':'Planning', count:2},
    {'type':'In-Progress', count:4},
    {'type':'Live', count:10},
]
describe('RaodMap component integration test', ()=> {
    it('list Element in this component  must be three (3)', async ()=> {
        render (<BrowserRouter>
            <RoadMap statistics={statistics}/>
        </BrowserRouter>)
        const list =document.getElementsByClassName('status')
        console.log(statistics.length)
        expect(list.length).toBe(3)        
    })    

    it("An element containing text 'Planning', 'In-Progress' or 'Live' should exist", async ()=> {
        render (<BrowserRouter>
            <RoadMap statistics={statistics}/>
        </BrowserRouter>) 
        const texts = ['Planning','In-Progress','Live']   
        texts.map(text => {
            const paragraph=screen.getByText(text)
            expect(paragraph).toBeInTheDocument()
        })
    })

    
})