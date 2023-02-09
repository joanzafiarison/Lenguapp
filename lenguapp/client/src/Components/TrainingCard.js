import React from "react"
import {Link} from "react-router-dom"



export default function TrainingCard (props) {
    return(
        <div className="training_card">
            <Link to={{ pathname: '/train/item', state: { exercise_id: props.exercise_id }}}>
                <div className="training_meta">
                    <figure>
                        <img src="" alt="flag"/>
                    </figure>
                    <h2>{props.theme}</h2>
                    <div className="bullet"></div>
                    <p>{props.number}</p>
                </div>
                <div className="stars"></div>
                <div className="training_card_content">
                    <p>{props.type}</p>
                    <p>{props.language}</p>
                </div>
                <p>Tags</p>
                <ul>
                    <li></li>
                </ul> 
                <div className="figures">
                    <div>
                        <figure>
                            <img src=""/>
                        </figure>
                    </div>
                </div>   
            </Link>
        </div>
    )
}