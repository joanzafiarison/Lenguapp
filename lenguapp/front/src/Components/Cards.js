import React from "react"

export default function TrainingCard (props) {
    return(
        <div className="training_card">
            <h2>{props.theme}</h2>
            <div className="training_card_content">
                <p>{props.type}</p>
                <p>{props.language}</p>
            </div>
        </div>
    )
}