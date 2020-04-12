import React , {Component } from 'react';
import Logo from '../../assets/folder.png';
import Cookies from 'js-cookie';
import {Navbar,NavbarBrand,Nav,Button,NavItem, NavLink} from 'reactstrap';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class header extends Component{
    constructor(props){
        super(props)
        this.state = {
            'toHome': false,
        }
    }
    logout = () => {
        Cookies.remove('token')
        this.setState({'toHome':true})
    }

    render(){
        if(this.state.toHome){
            return(<Redirect to="/" />)
        }
        return(
            <Navbar className="dashboard-header header" light>
                <div className="container">
                    <NavbarBrand href="/dashboard"><img alt="file tracking system" src={Logo} className="header-logo" height="30px" />  File Management</NavbarBrand>
                    <Nav className="ml-auto" navbar className="header-link-container">
                        
                        <NavItem className="header-link">
                            <NavLink>{this.props.username}</NavLink>
                            
                        </NavItem>

                        <NavItem className="header-link">
                            <NavLink>Role: {this.props.role}</NavLink>
                        </NavItem>

                        <NavItem className="header-link">
                            <NavLink>Department: {this.props.department}</NavLink>
                        </NavItem>
                        
                        <NavItem  className="header-link">
                            <Button outline color="primary" onClick={this.logout}>Logout</Button>
                        </NavItem>
                        
                    </Nav>
                </div>
            </Navbar>
        );
    }
}   

export default header;