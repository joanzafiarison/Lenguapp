import React from "react";
import {Link} from "react-router-dom";
import {colors,contentTypes} from "../utils/colors";


const flags ={
    "jp":"img/flags/jp_flag.png",
    "french":"img/flags/fr_flag.png",
    "malagasy":"img/flags/mg_flag.png",
    "english":"img/flags/uk_flag.webp"
}
//theme,number,type[and you say, words, building],language
export default function FlashCard (props) {
    const colorValue = contentTypes[props.type].color;
    return(
        <div className="training_card" style={{backgroundColor:colors.colorValue}}>
            <Link to={{ pathname: '/train/item', state: { exercise_id: props.exercise_id }}}>
                <div className="training_meta">
                    <figure style={{width:20,margin:0}}>
                        <img src={flags[props.language]} alt="flag" style={{width:"100%"}}/>
                    </figure>
                    <h2>{props.theme}</h2>
                    <div className="bullet"></div>
                    <p>{props.number}</p>
                </div>
                <div className="stars"></div>
                <div className="training_card_content">
                    <p>{props.type}</p>
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