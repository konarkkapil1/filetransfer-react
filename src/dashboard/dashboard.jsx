import React ,{Component} from 'react';
import {Redirect} from 'react-router-dom';
import Cookies from 'js-cookie';
import Layout from './layout';

class dashboard extends Component{
    render(){
        const cookie = Cookies.get('token');
        if(!(cookie === undefined)){
            return(
                <Layout />
            );
        }else{
            return(
                <Redirect to="/" />
            );
            
        }
        
    }
}


export default dashboard;