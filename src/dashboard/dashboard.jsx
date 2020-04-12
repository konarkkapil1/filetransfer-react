import React ,{Component} from 'react';
import {Redirect} from 'react-router-dom';
import Cookies from 'js-cookie';
import Layout from './layout';

class dashboard extends Component{
    constructor(props){
        super(props)
    }
    render(){
        const cookie = Cookies.get('token')
        // console.log(this.props.location.state.data)
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