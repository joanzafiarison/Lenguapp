import {render, fireEvent, screen} from '@testing-library/react';
import {randomNormal,range} from "d3";
import expect from 'expect';
import ScatterPlot  from '../Components/ScatterPlot.jsx';


describe('ScatterPlot',function(){
    var normal = randomNormal(1,1),
    mockData = range(5).map(function(){
        return {x:normal(),y:normal()};
    })
    it("renders an h1",function(){
        var scatterplot = render(
            <ScatterPlot/>
        );

        expect(scatterplot.queryByTitle("h1")).toEqual("This is a random scatterplot");

    }) 
})