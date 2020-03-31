import React , {Component } from 'react';
import Logo from '../../assets/folder.png';
import Cookies from 'js-cookie';
import {Navbar,NavbarBrand,Nav, Button} from 'reactstrap';
import { Redirect } from 'react-router-dom';

class header extends Component{
    constructor(props){
        super(props)
        this.state = {
            'toHome': false
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
                    <Nav className="ml-auto" navbar>
                        <Button outline color="primary" onClick={this.logout}>Logout</Button>
                    </Nav>
                </div>
            </Navbar>
        );
    }
}   

export default header;