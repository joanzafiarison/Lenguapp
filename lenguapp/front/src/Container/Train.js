import React from "react"
import axios from "axios"


export default class TrainContainer extends React.Component {
    state = {
        //["AndYouSay","Words","Sentences"],
        type :"Words",
        content : {},
        exercise_id : 1,
        cursor : 0
    };
    componentDidMount() {
        axios.get(`http://localhost:5000/exercises/${this.state.exercise_id}`).then((response) => {
            this.setState({content : response })
        })
    }
    

    render () {
        console.log(this.state.content)
        return(
            <div id ="train_container">
               
            </div>
        )
    };
}


/*{this.state.type === "Words" ?
<div id="train_content">
   
</div> 
:
null
}*/