import React from "react";
import { FlowContextProvider } from "../Services/FlowContextProvider";
import CourseSwitcher from "../Components/CourseSwitcher";
import { render,fireEvent, waitFor } from "@testing-library/react";
import {screen} from '@testing-library/dom';


test("test course flow ", async () => {
    render(<FlowContextProvider>
        <CourseSwitcher/>
    </FlowContextProvider>);

    const course_type = await screen.getByTestId("course_type");
    expect(course_type.textContent).toBe("words");
});