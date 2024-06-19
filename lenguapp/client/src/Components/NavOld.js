import React, { Component } from 'react'

export class NavOld extends Component {
  render() {
    return (
      <div>
        <nav style={{flex:3}}>
        <ul>
            <li style={{fontSize:"0.8rem"}}>
                <Link to="/train">Train</Link>
            </li>
            <li style={{fontSize:"0.8rem"}} >
                <Link to="/courses">Learn </Link>
            </li>

            { user.user_id !== "" ? 
                (   
                    <>
                        <li style={{fontSize:"0.8rem"}}>
                            <Link to ="/dashboard/admin">Dashboard</Link>
                        </li>
                        <li style={{fontSize:"0.8rem"}}>
                            <Link to ="/create">Create</Link>
                        </li>
                        <li style={{fontSize:"0.8rem"}}>
                            <Link to ="/user">Compte</Link>
                        </li>
                    </>
                ):
                (
                    <>
                        <li style={{fontSize:"1rem"}}>
                        <Link to ="/dashboard/user">Dashboard</Link>
                        </li>
                        
                        <li style={{fontSize:"0.8rem"}}>
                            <Link to="/register">Créer un compte</Link>
                        </li>
                        <li style={{fontSize:"0.8rem"}} >
                            <Link to="/signin">Se connecter</Link>
                        </li>
        
                    </>
                )
            }

        </ul>
    </nav>
    <div id="admin">
        <div className='account-big'>
            <figure onClick={()=> logout()}>
                <Link to ="/signin">
                    <img src={connected ? "img/profil.png" : "img/question_mark.png"} style={{width:"100%"}}/>
                </Link>
            </figure>
            
            <p style={{fontSize:"0.8rem"}} >{user.username}</p>

        </div>
        <div className={`hamburger ${opened ? 'hamburger_open' : ''}`}>
            <figure onClick={()=>setOpened(!opened)}>
                <img src="img/hamburger.png"/>
            </figure>
            <ul className={`menu ${opened ? "menu_open" : ""}`} style={{display:opened?"block":"none"}}>
                <li className="menu_link"  onClick={()=>setOpened(!opened)}>
                    <Link to="/train" >Train</Link>
                </li>
                <li className="menu_link"  onClick={()=>setOpened(!opened)}>
                    <Link to="/courses">Learn</Link>
                </li>
                <li className="menu_link"  onClick={()=>setOpened(!opened)}>
                    <Link to ="/user">Role</Link>
                </li>
                { user ? 
                    (   
                        <>
                            <li className="menu_link"  onClick={()=>setOpened(!opened)}>
                                <Link to ="/dashboard/admin">Dashboard</Link>
                            </li>
                            <li className="menu_link"  onClick={()=>setOpened(!opened)}>
                                <Link to ="/create">Creer</Link>
                            </li>
                            <li className="menu_link"  onClick={()=>setOpened(!opened)}>
                                <Link to ="/user">Compte</Link>
                            </li>
                        </>
                    ):
                    (
                        <>
                            <li className="menu_link"  onClick={()=>setOpened(!opened)}>
                            <Link to ="/dashboard/user">Dashboard</Link>
                            </li>
                            <li style={{fontSize:"1rem"}}>
                            <Link to ="/dashboard/user">Dashboard</Link>
                            </li>
                            <li style={{fontSize:"0.8rem"}}>
                                <Link to="/register">Créer un compte</Link>
                            </li>
                        </>
                    )
                }
            </ul>
        </div>
    </div>
    </div>
    )
  }
}

export default NavOld