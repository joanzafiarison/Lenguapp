import React from 'react'


export default class PostItem extends React.Component {
    state = {
        name :"Joan",
        content :"Cet appli est carrée",
        attachments : ["Attachment1","Attachement2"],
        comments : ["comment 1","comment 2"]
    }
    render() {
        return(
            <div className ="post">
                <div className ="post-profile">
                    <p>{this.state.name}</p>
                    <div className="post-block"></div>
                </div>
                <div className="post-content">
                    <p>{this.state.content}</p>
                </div>
                <div className="post-attachement">
                    <ul>
                        {this.state.attachments.map((attachment)=>(
                            <li>{attachment}</li>
                        ))}
                    </ul>
                </div>
                <div className="post-comment">
                    <ul>
                        {this.state.comments.map((comment)=>(
                                <li>{comment}</li>
                        ))}
                    </ul>
                </div>
            </div> 
        )
    }
}