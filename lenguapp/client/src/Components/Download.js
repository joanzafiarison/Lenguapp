import * as React from "react"


const Download = ({description}) =>  {
    return(
        <div className="download">
            <figure>
                <img src="" alt="app download img" />
            </figure>
            <div className="proposition">
                <p>Il y a aussi une application ! </p>

                <figure style={{height:50,width:50}}>
                    <a href="#">
                        <img src=""/>
                    </a>
                </figure>
                
                <p>Le monde à la portée de votre doigt</p>
            </div>
        </div>
    )
}

export default Download;