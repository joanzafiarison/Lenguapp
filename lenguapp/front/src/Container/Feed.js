import React from "react"
import axios from "axios"
import PostItem from "../Components/Post"



export default class Feed extends React.Component {
    state = {
        feed_content : []
    }

    componentDidMount() {
        axios.get("http://localhost:5000/feed").then((resp) => {
            this.setState({feed : response.data})
        })
    }
    render() {
        return(
            <div id="feed">
                {this.state.feed_content.map((post)=>
                    <PostItem/>
                )}
            </div>
        )
    }
}