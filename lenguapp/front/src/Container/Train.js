import React from "react"
import axios from "axios"


export default class TrainContainer extends React.Component {
    state = {
        //["AndYouSay","Words","Sentences"],
        type :"Words",
        content : {},
        exercise_id : 2,
        cursor : 0
    };
    componentDidMount() {
        axios.get(`http://localhost:5000/exercises/${this.props.exercise_id}`).then((response) => {
            this.setState({content : response.data })
        })
    }
    

    render () {
        console.log(this.state.content.words)
        const {words} = this.state.content
        
        return(
            <div id ="train_container">
                <div className="train_meta">
                    <h1>Mot n°{this.state.cursor + 1}</h1>
                    <p> Theme : {this.state.content.theme}</p>
                </div>
                
                <div className="train_content">
                   {words == null ? 
                        <span>loading...</span> 
                        :
                        <div className="words">
                            <h2>{words[this.state.cursor].word}</h2>
                            {words[this.state.cursor].words.map((wd)=>(
                                <li>{wd}</li>
                            ))}
                        </div>
                   }
                </div>
                <button disabled = {this.state.cursor == 3 ? true : false} onClick = {() => this.setState({cursor : this.state.cursor + 1})}>suivant !</button>
               

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