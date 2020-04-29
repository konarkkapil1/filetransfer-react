import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Pageheading from '../page-heading/pageheading'
import {Button, Form, FormGroup, Label, Input, Alert,Spinner} from 'reactstrap'
import Infomodal from '../infomodal/infomodal'
import axios from 'axios'
import qs from 'qs'

class createfile extends Component{
    constructor(props){
        super(props)

        this.state = {
            'name':'',
            'phone':'',
            'email': '',
            'error':'',
            'dept_id':'0',
            'role':'0',
            'response':'',
            'isloading':false,
            'password':'',
            'depts': [],
            'roles':[],
            'success': false,
        }

    }

    changeHandler = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    submitHandler = (event) => {
        event.preventDefault()
        this.setState({'response':''})
        this.setState({'error':''})
        if(this.state.name === '' || this.state.phone === '' || this.state.email === '' || this.state.dept_id == '0' || this.state.role == '0' || this.state.password === ''){
            this.setState({'error':<Alert color="danger" className="alert-red">Fields cannot be empty 😕</Alert>})
        }else{
            this.setState({'isloading':true})
            axios.post("/filetransfer/api/account/signup.php",qs.stringify(this.state))
                .then(response => {
                    console.log(response.data)
                    this.setState({'response' : <Infomodal title='Account Created' body="User can now login" />})
                    this.setState({'isloading' : false})
                    this.setState({'success' : true})
                })
                .catch(error => (
                    this.setState({'error':<Alert color="danger">Error occured! Try again</Alert>})
                ))
            
        }
    }

    getdata = () => {
        console.log("fetching data")

        axios.post("/filetransfer/api/department/fetch.php")
            .then(data => {
                this.setState({'depts':data.data})
            })
            .catch(err => console.log(err))

        axios.post("/filetransfer/api/role/fetch.php")
        .then(data => {
            this.setState({'roles':data.data})
        })
        .catch(err => console.log(err))
    }
    componentDidMount(){
        this.getdata()
    }

    render(){
        const { depts,roles } = this.state
        console.log(this.props.data)
        if(this.props.data.roleid == ''){
            return(
                <div className="content-container">
                    <div className="content-body">
                        <div className="content">
                            <Spinner color="primary" />
                        </div>
                    </div>
                </div>
            )
        }
        else{
            if(this.props.data.roleid == 100){
                return(
                    <div>
                        <Pageheading name="Create Account" />
                        <div className="content-container">
                            <div className="content-body">
                                
                                <div className="content">
                                    
                                    <Form onSubmit={this.submitHandler}>
                                        <FormGroup row>
                                            <Label>Name</Label>
                                            <Input type="text" name="name" onChange={this.changeHandler} />
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label>Email</Label>
                                            <Input type="email" name="email" onChange={this.changeHandler} />
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label>Phone</Label>
                                            <Input type="tel" name="phone" onChange={this.changeHandler} />
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label>Create Password</Label>
                                            <Input type="password" name="password" onChange={this.changeHandler} />
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label>Department</Label>
                                            <Input type="select" name="dept_id" onChange={this.changeHandler} >
                                                <option value="0">Select Department</option>
                                                {
                                                    depts.map(dept => 
                                                        <option key={dept.id} value={dept.id}>{dept.name}</option>
                                                    )
                                                }
                                            </Input>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label>Role </Label>
                                            <Input type="select" name="role" onChange={this.changeHandler} >
                                                <option value="0">Select Role</option>
                                                {
                                                    roles.map(role => 
                                                        <option key={role.id} value={role.id}>{role.name}</option>
                                                    )
                                                }
                                            </Input>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Button color="primary">CREATE USER</Button>
                                        </FormGroup>
                                        
                                    </Form>
                                    
                                    {
                                        !this.state.isloading ? this.state.response : (<div><Spinner color="primary" /></div>)
                                    }
                                    <div>
                                        {this.state.error}
                                    </div>
                                    
                                    
                                </div>
                                
                            </div>
                        </div>  
                        
                    </div>
                )
            }
            else{ return(<Redirect to="/dashboard" />)}
        }
    }
}

export default createfile