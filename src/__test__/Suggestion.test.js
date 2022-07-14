import { render,screen } from "@testing-library/react"
import { Suggestion } from "../components/Suggestion"

const multipleFeedback= {

        productRequests: [
            {
              "id": 1,
              "title": "Add tags for solutions",
              "category": "enhancement",
              "upvotes": 112,
              "status": "suggestion",
              "description": "Easier to search for solutions based on a specific stack.",
             
            },
            {
              "id": 2,
              "title": "Add a dark theme option",
              "category": "feature",
              "upvotes": 99,
              "status": "suggestion",
              "description": "It would help people with light sensitivities and who prefer dark mode.",
            }    
        ]
}

const singleFeedback= {

    productRequests: [
        {
          "id": 2,
          "title": "Add a dark theme option",
          "category": "feature",
          "upvotes": 99,
          "status": "suggestion",
          "description": "It would help people with light sensitivities and who prefer dark mode.",
        }    
    ]
}

describe('Unit test for suggestion component', ()=> {
    it('the suggestion string should be singular if length of suggestions feedback is <=1', async ()=> {
        render(<Suggestion data={singleFeedback.productRequests}/>)
        //console.log(singleFeedback.productRequests.length)
        const  text=  screen.getByText('1 suggestion')
        expect(text).toBeInTheDocument
    })

    it('the suggestion string should be in plural  if length of suggestions feedback is >1', async ()=> {
        render(<Suggestion data={multipleFeedback.productRequests}/>)
        //console.log(singleFeedback.productRequests.length)
        const  text=  screen.getByText('2 suggestions')
        expect(text).toBeInTheDocument
    })
} 
    
)