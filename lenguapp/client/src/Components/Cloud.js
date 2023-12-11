import React , {useState,useCallback} from "react";


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
        <div>
          <h1>Cloud</h1>
        </div>
      
    );
}


export default MyCloud;