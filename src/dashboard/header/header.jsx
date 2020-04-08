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
            'username': '',
            'role':''
        }
    }
    logout = () => {
        Cookies.remove('token')
        this.setState({'toHome':true})
    }

    fetchdata = () => {
        axios.post("/filetransfer/api/account/fetchcurrent.php")
            .then(data => {
                console.log(data.data.name)
                console.log(data.data.rolename)
                this.setState({'username': data.data.name})
                this.setState({'role' : data.data.rolename})
            })
            .catch(err => console.log(err))
    }

    render(){
        if(this.state.toHome){
            return(<Redirect to="/" />)
        }
        return(
            <Navbar onLoad={this.fetchdata} className="dashboard-header header" light>
                <div className="container">
                    <NavbarBrand href="/dashboard"><img alt="file tracking system" src={Logo} className="header-logo" height="30px" />  File Management</NavbarBrand>
                    <Nav className="ml-auto" navbar>
                        
                        <NavItem>
                            <NavLink>{this.state.username}</NavLink>
                            <h6>Role: {this.state.role}</h6>
                        </NavItem>
                        
                        <NavItem>
                            <Button outline color="primary" onClick={this.logout}>Logout</Button>
                        </NavItem>
                        
                    </Nav>
                </div>
            </Navbar>
        );
    }
}   

export default header;