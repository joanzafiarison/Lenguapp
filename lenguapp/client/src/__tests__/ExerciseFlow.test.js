import React from "react";
import { render,fireEvent, waitFor } from "@testing-library/react";
import {screen} from '@testing-library/dom';
import Quizz from "../Components/Quizz";
import ContextProvider from "../Services/ContextProvider";
import { FlowContextProvider } from "../Services/FlowContextProvider";

const mock_user = {
    user : {
        username :"",
        user_id :"63dd7bae6dfe86b3e0186609",
        token :"",
        lang : "",
    },
}

const mock_content = {
    cursor :0 ,
    focus : "",
    selected : [],
    solution : "",
    content : [],
    success : false,
    result : {}
}

const word_exercise_id = "657f5e8aa5433f7160fb027c"

test("simple render of exercise with actual context", async ()=>{
    render(<ContextProvider>
                <FlowContextProvider>
                    <Quizz exercise_id={word_exercise_id}/>
                </FlowContextProvider>
            </ContextProvider>
    );
    //const box = container.getElementsByClassName("train_meta");

    expect( (await screen.findByText("mila bebe kokoa ianao ?")).textContent ).toBe("mila bebe kokoa ianao ?");
})

test("test focus in exercise with context", async () => {
    render(<ContextProvider>
        <FlowContextProvider>
            <Quizz exercise_id={word_exercise_id}/>
        </FlowContextProvider>
    </ContextProvider>
    );
    let click_container = await screen.findByText("eny, ampio kelikely azafady");
    fireEvent.click(click_container);// cliquer choix
    expect( click_container.classList).toBe(["green"]);
})


test("exercise words flow completion ", async () => {
    render(<ContextProvider>
        <FlowContextProvider>
            <Quizz exercise_id={word_exercise_id}/>
        </FlowContextProvider>
    </ContextProvider>
    );
    let click_container = await screen.findByText("eny, ampio kelikely azafady");
    let click_validation = await screen.findByText("suivant !");
    fireEvent.click(click_container);// cliquer choix
    fireEvent.click(click_validation);// cliquer validation
    let click_container_2 = await screen.findByText("eny, atao akoho sauce azafady");
    let click_validation_2 = await screen.findByText("suivant !");
    fireEvent.click(click_container_2);// cliquer choix
    fireEvent.click(click_validation_2);// cliquer choix
    const overlay = document.querySelector(".success_overlay");
    const result = document.querySelector(".response_box");
    await waitFor(() => {
        expect(overlay.textContent).toBe("Bravo !");
    })
    expect( click_container_2.classList).toBe(["choice","focus"]);
    expect( result).toBe("Vous avez trouvé 2/2 mots")
})

