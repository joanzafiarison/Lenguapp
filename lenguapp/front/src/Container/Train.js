import React from "react"
import axios from "axios"


export default class TrainContainer extends React.Component {
    state = {
        //["AndYouSay","Words","Sentences"],
        type :"Words",
        content : {},
        exercise_id : "6161a9798b8178d949a87657",
        focus : "",
        selected: [],
        cursor : 0,
        result : ""
    };
    componentWillMount() {
        console.log("component will mount")
        axios.get(`http://localhost:5000/exercises/${this.state.exercise_id}`).then((response) => {
            this.setState({content : response.data[0]})
        })
    }

    
    shouldComponentUpdate(nextState){
        console.log("next state")
        console.log(nextState)
        return nextState != this.state
    }
  
    validate(){
        this.setState({
            cursor : this.state.cursor +1 , 
            selected : [...this.state.selected,{item : this.state.content.words[this.state.cursor],chosen : this.state.focus}],
            focus : ""
        }, () => {
            if(this.state.cursor === 4){
                 axios.post("http://localhost:5000/scores",{content : this.state.selected})
                    .then((res) => this.setState({result : res.data}))
            }
        })
    }
    

    render () {
        console.log("render")
        const {words} = this.state.content
        console.log("focus "+this.state.focus)
        console.log(this.state.selected)
        console.log(this.state.result)
        return(
            <div id ="train_container" className="mainElement">
                <div className="train_meta">
                    <p> N°{this.state.cursor + 1}</p>
                    <p> THEME : {this.state.content.theme}</p>
                </div>
                
                {this.state.cursor < 4 ?
                    <div className="train_content">
                    {words == null ? 
                            <span>loading...</span> 
                            :
                            <div className="words">
                                <h2>{words[this.state.cursor].word}</h2>
                                <ul>
                                    {words[this.state.cursor].words.map((wd)=>(
                                        <button className={ this.state.focus == wd ? 'choice focus' : 'choice'} key = {wd} onClick= {()=> this.setState({focus :  wd}) }>{wd}</button>
                                    ))}
                                </ul>
                            </div>
                    }
                    </div>
                    :
                    <div className="response_box">
                       { this.state.result != "" ?
                           <p>Réponse en cours d'envoi ..</p>
                           :
                           <p>{this.state.result}</p>
                       }
                    </div>
                }
                <div className="right_side">
                    <button className="btn" disabled = {this.state.focus == "" ? true : false} onClick = {() => this.validate()}>suivant !</button>    
                </div> 
               

            </div>
        )
    };
}