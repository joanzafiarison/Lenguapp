import React from "react";
import {render, fireEvent, screen} from '@testing-library/react';
import * as d3 from "d3";
import ScatterPlot  from '../Components/ScatterPlot.js';


describe('ScatterPlot',function(){
    var normal = d3.randomNormal(1,1),
    mockData = d3.range(5).map(function(){
        return {x:normal(),y:normal()};
    })
    it("renders an h1",function(){
        let scatterplot = render(
            <ScatterPlot/>
        );

        let title = scatterplot.queryByText(/This is a random scatterplot/)

        expect(title.textContent).toEqual("This is a random scatterplot");

    }) 
})