import React, {Component} from 'react';
import Header from '../header/header';
import Body from '../body/body';

class layout extends Component{

    render(){
        return(
            <React.Fragment>
                <Header />
                <Body />
            </React.Fragment>
            
        );
    }
}

export default layout;