import React, { Component } from 'react';
import HeaderMenu from './headerMenu';
import Folder from '../assets/folder.png';
import {Navbar,NavbarBrand, Nav,NavItem,NavLink, Button} from 'reactstrap';

class header extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <Navbar className="header" color="light" light>
                <div className="container">
                    <NavbarBrand href="/"><img alt="file tracking system" src={Folder} height="30px" className="header-logo" />  File Management</NavbarBrand>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <HeaderMenu navlink={this.props.navlink} linktext={this.props.linktext} />
                        </NavItem>
                    </Nav>
                </div>
            </Navbar>
        );
    }
}

export default header;