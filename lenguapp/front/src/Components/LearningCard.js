import React from "react"
import {Link} from "react-router-dom"

export default function LearningCard (props) {
    return(
        <div className="training_card">
            <h2>{props.theme}</h2>
            <div className="training_card_content">
                <p>{props.name}</p>
                <p>{props.language}</p>
            </div>
            <Link to={{ pathname: '/courses/item', state: { course_id: props.course_id }}}>
                <button>Apprendre</button>
            </Link>
        </div>
    )
}