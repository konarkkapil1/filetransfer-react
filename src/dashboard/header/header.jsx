import React , {Component } from 'react';
import Logo from '../../assets/folder.png';
import {Navbar,NavbarBrand,Nav} from 'reactstrap';

class header extends Component{
    render(){
        return(
            <Navbar className="dashboard-header" color="light" light>
                <div className="container">
                    <NavbarBrand href="/"><img src={Logo} className="header-logo" height="30px" />  File Management</NavbarBrand>
                    <Nav className="ml-auto" navbar>
                        
                    </Nav>
                </div>
            </Navbar>
        );
    }
}   

export default header;