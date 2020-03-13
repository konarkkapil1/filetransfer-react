import React, {Component} from 'react';
import {NavLink ,Button} from 'reactstrap';
import Cookies from 'js-cookie';
class headerMenu extends Component{
    constructor(props){
        super(props)
        this.state = {
            "navlink" : this.props.navlink,
            "linktext" : this.props.linktext
        }
    }
    render(){
        return(
            <NavLink href={this.props.navlink}><Button color="primary">{this.props.linktext}</Button></NavLink>
        );
    }
}

export default headerMenu;