import React from "react";
import { render,fireEvent } from "@testing-library/react";
import { screen } from '@testing-library/dom';

const Button = ({onClick, children}) => (
    <button onClick={onClick}>{children}</button>
  )
  
test('calls onClick prop when clicked', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick} style={{color : "green"}}>Click Me</Button>)
    fireEvent.click(screen.getByText(/click me/i))
    expect(handleClick).toHaveBeenCalledTimes(1);
    //expect(screen.getByText(/click me/i)).toHaveStyle({color : "green"});
})