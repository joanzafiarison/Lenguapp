import React from "react"
import {Link} from "react-router-dom"


const colors = {
    "blue":"#3663A7",
    "yellow":"#FFC857",
    "red":"#C5283D",
    "brown":"#481D24",
    "green":"#2A7221"
}
const contentTypes =  {
    "words" :{
        "color":"blue"
    },
    "andyousay":{
        "color":"yellow"
    },
    "building" : {
        "color":"red"
    },
    "guess" :{
        "color":"brown"
    },
    "game": {
        "color":"green"
    }
}
//theme,number,type[and you say, words, building],language
export default function FlashCard (props) {
    const colorValue = contentTypes[props.type].color;
    return(
        <div className="training_card" style={{backgroundColor:colors.colorValue}}>
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