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
        cursor : 0
    };
    componentDidMount() {
        axios.get(`http://localhost:5000/exercises/${this.state.exercise_id}`).then((response) => {
            this.setState({content : response.data[0]})
        })
    }

    selectAndValidate(){
             if (this.state.cursor == 4) {
                    console.log("envoi des réponse ...")
                    console.log("corrigé")
                    console.log(this.state.selected) 
                    this.setState({
                        cursor : 0,
                        selected : [],
                        focus : ""
                    })
            }
            else{
                this.setState({
                    focus : "",
                    selected : [...this.state.selected,{question : this.state.content.words[this.state.cursor] , answer :this.state.focus }],
                    cursor : this.state.cursor + 1
                })
            }
            
    }


    

    render () {
        //console.log("content")
        //console.log(this.state.content)
        const {words} = this.state.content
        //console.log(words)
        console.log("focus "+this.state.focus)
        console.log(this.state.selected)
        
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
                        <p>Réponses envoyées</p>
                    </div>
                }
                <div className="right_side">
                    <button className="btn" disabled = {this.state.focus == "" ? true : false} onClick = {() => this.selectAndValidate()}>suivant !</button>    
                </div> 
               

            </div>
        )
    };
}




/*{words.map((word_data) => (
     <>
    <h2>{word_data.word}</h2>
        {word_data.words.map((chosen)=>
            (                    
                 <button>{chosen}</button>
            ))
        }
    </>
    ))}*/