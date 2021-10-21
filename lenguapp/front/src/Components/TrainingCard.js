import React from "react"
import {Link} from "react-router-dom"

export default function TrainingCard (props) {
    return(
        <div className="training_card">
            <h2>{props.theme}</h2>
            <div className="training_card_content">
                <p>{props.type}</p>
                <p>{props.language}</p>
            </div>
            <Link to={{ pathname: '/train/item', state: { exercise_id: props.exercise_id }}}>
                <button>S'entrainer</button>
            </Link>
        </div>
    )
}