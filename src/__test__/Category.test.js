import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Category } from "../components/Category ";

describe('Category component unit test', ()=>{
    it('Component should render successfully without error', async ()=> {
        render(
            <BrowserRouter>
                <Category/>
            </BrowserRouter>
        )
    })
})