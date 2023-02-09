import React , {useState,useCallback} from "react";
import TagCloud from 'react-tag-cloud';
import randomColor from 'randomcolor';


const  MyCloud = ({data}) => {
    const [, updateState] = useState();

    /*setInterval(()=>{
      handleForceupdateMethod();
    },3000);*/

    const handleForceupdateMethod = useCallback(() => {
        console.log("updating");
        updateState({});
    });

    const styles = {
        large: {
          fontSize: 60,
          fontWeight: 'bold'
        },
        small: {
          opacity: 0.7,
          fontSize: 16
        }
      };
    return (
        <TagCloud 
            style={{
            position:"absolute",
            zIndex:1,
            fontFamily: 'sans-serif',
            fontSize: 30,
            fontWeight: 'bold',
            fontStyle: 'italic',
            spiral :'archimedean',
            color: () =>randomColor(),
            padding: 5,
            width: "100%",
            height: "100%",
            random : Math.random()
            }}>
                {data.map(word=>(
                    <div key={word.lang}>{word.hello}</div>
                ))}
      </TagCloud>
      
    );
}


export default MyCloud;