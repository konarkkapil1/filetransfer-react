import React, { Component } from 'react';
import { Container,Row,Col,Alert } from 'reactstrap';
import Header from '../header/header';
import axios from 'axios';
import qs from 'qs';


class login extends Component{
    constructor(props){
        super(props);
        this.state = {
            'email':'',
            'password':'',
            'error':''
        };
    }
    changeHandler = (e) =>{
        this.setState({[e.target.name]: e.target.value});
    }

    submitHandler = (e) => {
        e.preventDefault();
        if(this.state.email === '' || this.state.password === ''){
            this.setState({'error':<Alert color="danger">Fields cannot be empty !</Alert>})
        }
        else{

            axios.post("/filetransfer/api/account/login.php",qs.stringify(this.state))
                .then(response =>{
                    if(!(response.data.token == null)){
                        this.props.history.push('/dashboard');
                    }else{
                        this.setState({'error':<Alert color="danger">Wrong username and password combination !</Alert>})
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }

    render(){
        const {email,password} = this.state;
        return(
            <div>
                <Header navlink="/track" linktext="Track File"/>
                <Container className="login-holder">
                    <Row>
                        <Col sm="12" md={{ size: 6, offset: 3 }}>
                            <form className="form margin-10vh" onSubmit={this.submitHandler}>
                                <h1 className="h3 mb-3 font-weight-normal text-center">Sign in</h1>
                                <div className="input-group mb-3">
                                    <label className="sr-only">Email address</label>
                                    <input type="email" id="inputEmail" value={email} className="form-control"  name="email" onChange={this.changeHandler} placeholder="Email address" required=""></input>
                                </div>
                                <div className="input-group mb-3">
                                    <label className="sr-only">Password</label>
                                    <input type="password" id="inputPassword" value={password} className="form-control" name="password" onChange={this.changeHandler} placeholder="Password" required=""></input>
                                </div>
                                
                                
                                <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                                <div className="mt-3">
                                    {this.state.error}
                                </div>
                                
                            </form>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default login;