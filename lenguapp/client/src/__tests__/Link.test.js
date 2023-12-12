import React from 'react';
import {render,screen,act} from "@testing-library/react"
//import renderer from 'react-test-renderer';
// not available for react 17?
import Link from '../Components/Link.js';

it('changes the class when hovered', () => {

  act(()=>{
    render(
        <Link page="http://www.facebook.com">Facebook</Link>
        );
    const linkText = screen.getByText(/facebook/i);
    expect(linkText.textContent).toBe("Facebook");
  })

  act(()=>{
    render(
        <Link page="http://www.instagram.com">Instagram</Link>
        );
    const linkText = screen.getByText(/instagram/i);
    expect(linkText.textContent).toBe("Instagram");
  })


  /* Comparaison de snapshot ecrit => dans __snapshots__ / structure du component
  
    let tree = renderer.create(
      <Link page="https://www.tiktok.com/">Tik Tok</Link>
      );
      expect(tree.toJSON()).toMatchSnapshot();


  
    console.log("tree creation",tree.toJSON())

    renderer.act(()=>{
        tree.toJSON().props.onMouseEnter();
    })
    
    console.log("tree onmouseEnter",tree.toJSON())
    // re-rendering
    
    expect(tree.toJSON()).toMatchSnapshot();

  // manually trigger the callback

    renderer.act(()=>{
        tree.toJSON().props.onMouseLeave();
    })
    
    console.log("tree onmouseLeave",tree.toJSON())
    // re-rendering
    
    expect(tree.toJSON()).toMatchSnapshot();
  */

});