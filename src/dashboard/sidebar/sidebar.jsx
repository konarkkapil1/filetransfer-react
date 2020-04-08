import React, {Component} from 'react'
import {Nav, NavItem} from 'reactstrap'
import { Link, BrowserRouter, Switch,Route } from 'react-router-dom'
import Homeicon from '../../assets/home.png'
import Addfile from '../../assets/addfile.png'
import Trackfile from '../../assets/trackfile.png'
import Filehistory from '../../assets/filetrack.png'
import Currentfile from '../../assets/currentfile.png'

class sidebar extends Component{
    constructor(props){
        super(props)
        this.state = {
            'active': false
        }
    }
    
    render(){
        console.log(window.location.href)
        return(
            <nav className="sidebar sidebar-style bg-dark sidebar-height col-md-2 d-none d-md-block">
                <div className="sidebar-sticky">

                    <div className="sidebar-heading">
                        <h3>Dashboard</h3>
                    </div>

                    <Nav vertical className="sidebar-menu">

                        <NavItem className="sidebar-navitem">
                            <Link className="sidebarlink" to="/dashboard"><span><img style={{marginTop:-5+'px'}} height="20px" src={Homeicon}/></span> Home</Link>
                        </NavItem>

                        <NavItem className="sidebar-navitem">
                            <Link className="sidebarlink" to="/dashboard/create-file"><span><img style={{marginTop:-5+'px'}} height="20px" src={Addfile}/></span> Create File</Link>
                        </NavItem>

                        <NavItem className="sidebar-navitem">
                            <Link className="sidebarlink" to="/dashboard/current-file"><span><img style={{marginTop:-5+'px'}} height="20px" src={Currentfile}/></span> Current Files</Link>
                        </NavItem>
                        

                        <NavItem className="sidebar-navitem">
                            <Link className="sidebarlink" to="/dashboard/file-history"><span><img style={{marginTop:-5+'px'}} height="20px" src={Filehistory}/></span> History</Link>
                        </NavItem>

                        <NavItem className="sidebar-navitem">
                            <Link className="sidebarlink" to="/dashboard/file-tracking"><span><img style={{marginTop:-5+'px'}} height="20px" src={Trackfile}/></span> File Tracking</Link>
                        </NavItem>
                        
                    </Nav>
                    
                </div>
                
                
            </nav>
        );
    }
}

export default sidebar