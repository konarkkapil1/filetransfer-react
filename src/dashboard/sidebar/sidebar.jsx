import React, {Component} from 'react'
import {Nav, NavItem} from 'reactstrap'
import { Link, BrowserRouter, Switch,Route } from 'react-router-dom'
import Homeicon from '../../assets/home.png'
import Addfile from '../../assets/addfile.png'
import Trackfile from '../../assets/trackfile.png'
import Filehistory from '../../assets/filetrack.png'
import Currentfile from '../../assets/currentfile.png'
import Account from '../../assets/account.png'
import axios from 'axios'

class sidebar extends Component{
    constructor(props){
        super(props)
        this.state = {
            'active': false,
        }
    }

    render(){
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

                        {
                            this.props.data.roleid == 100 && <NavItem className="sidebar-navitem">
                                <Link className="sidebarlink" to="/dashboard/create-account"><span><img style={{marginTop:-5+'px'}} height="20px" src={Account}/></span> Create Account</Link>
                            </NavItem>
                        }
                        

                        {
                            this.props.data.roleid == 2 && <NavItem className="sidebar-navitem">
                                <Link className="sidebarlink" to="/dashboard/create-file"><span><img style={{marginTop:-5+'px'}} height="20px" src={Addfile}/></span> Create File</Link>
                            </NavItem>
                        }
                        
                        {
                            this.props.data.roleid == 1 && <NavItem className="sidebar-navitem">
                                <Link className="sidebarlink" to="/dashboard/current-file"><span><img style={{marginTop:-5+'px'}} height="20px" src={Currentfile}/></span> Current Files</Link>
                            </NavItem>
                        }
                        
                        {
                            this.props.data.roleid == 1 && <NavItem className="sidebar-navitem">
                                <Link className="sidebarlink" to="/dashboard/file-history"><span><img style={{marginTop:-5+'px'}} height="20px" src={Filehistory}/></span> History</Link>
                            </NavItem>
                        }

                        {
                            this.props.data.roleid == 1 || this.props.data.roleid == 2 && <NavItem className="sidebar-navitem">
                                <Link className="sidebarlink" to="/dashboard/file-tracking"><span><img style={{marginTop:-5+'px'}} height="20px" src={Trackfile}/></span> File Tracking</Link>
                            </NavItem>
                        }

                        {
                            this.props.data.roleid == 100 && <NavItem className="sidebar-navitem">
                                <Link className="sidebarlink" to="/dashboard/employee-management"><span><img style={{marginTop:-5+'px'}} height="20px" src={Account}/></span> Employee Management</Link>
                            </NavItem>
                        }
                        
                        
                        
                        
                    </Nav>
                    
                </div>
                
                
            </nav>
        );
    }
}

export default sidebar