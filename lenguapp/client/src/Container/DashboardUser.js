import * as React from "react";



function DashboardUser(){
    return(
        <div className="main_container">
            <div style={{display:"flex", justifyContent:"space-around"}}>
            <div>
                <div className="action_tab">
                    <h2>S'entrainer</h2>
                </div>
                <div className="action_tab">
                    <h2>Apprendre</h2>
                </div>
            </div>
            <div>
                <div className="action_tab">
                    <h2>Chat</h2>
                </div>
                <div className="action_tab">
                    <h2>Partager un exercise</h2>
                </div>
                <div className="action_tab">
                    <h2>Passer premium</h2>
                </div>
            </div>
            </div>
        </div>
    )
}


export default DashboardUser;