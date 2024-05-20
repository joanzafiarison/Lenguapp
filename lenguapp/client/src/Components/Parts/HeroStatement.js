import * as React from "react";


const HeroStatement = ({title,statement,button,orientation}) =>  {
    return(
        <div className="statement" style={{display:"flex",flexDirection: "column",alignItems: orientation ? "flex-end" :"flex-start",width:"70%",marginBottom:80}}>
            <div className="words" style={{display:"flex",flexDirection:"column",justifyContent:"space-around",backgroundColor:"#D1F1F8",height:300,padding:10}}>
                <h1>{title}</h1>
                <p style={{width:"60%",textAlign:"center"}}>{statement}</p>
            </div>
            <button className="CTA">{button}</button>
        </div>
    )
}

export default HeroStatement;