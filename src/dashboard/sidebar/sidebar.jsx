import React, {Component} from 'react'
import {Nav, NavItem} from 'reactstrap'
import { Link, BrowserRouter, Switch,Route } from 'react-router-dom'


class sidebar extends Component{
    render(){
        return( 
            <nav className="sidebar bg-dark sidebar-height col-md-2 d-none d-md-block">
                <div className="sidebar-sticky">
                    <div className="sidebar-heading">
                        <h3>Dashboard</h3>
                    </div>
                        <Nav vertical>
                            <NavItem>
                                <Link to="/dashboard/file">File Tracking</Link>
                            </NavItem>

                            <NavItem>
                                <Link to="#">link 1</Link>
                            </NavItem>
                            
                        </Nav>
                </div>
                
                
            </nav>
        );
    }
}

export default sidebar