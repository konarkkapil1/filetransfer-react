import React, {Component} from 'react';
import Menu from './menu';
import { ListGroup, ListGroupItem } from 'reactstrap';


class sidebar extends Component{
    render(){
        return(
            <nav className="sidebar bg-dark sidebar-height col-md-2 d-none d-md-block">
                <div className="sidebar-sticky">
                    <Menu />
                </div>
            </nav>
        );
    }
}

export default sidebar