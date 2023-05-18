import React from "react";
import {render,screen} from "@testing-library/react"
import Test from "../Components/Test.js";

/*
describe('sum module', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
  });
});*/

describe("counter ", function () {
    test("renders a p",function(){
        render(
            <Test/>
        );
        const counterElement = screen.getByText(/Compteur/i);
        expect(counterElement.textContent).toBe(" Compteur : 0 ");
        //expect(testComponent.queryByTitle("p")).toEqual(0);
    });
})