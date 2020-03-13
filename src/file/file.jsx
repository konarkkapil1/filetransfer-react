import React, { Component } from 'react';
import Cookies from 'js-cookie';
import {Redirect} from 'react-router-dom';

class file extends Component{
    
    render(){
        const cookie = Cookies.get('token');

        if(!(cookie === undefined)){
            return(<h1>File page</h1>)
        }
        else{
            return(<Redirect to="/" />);
        }
    }
}

export default file;