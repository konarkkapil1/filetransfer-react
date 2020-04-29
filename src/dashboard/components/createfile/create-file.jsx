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
            'filename':'',
            'filedesc':'',
            'submittor_name':'',
            'submittor_contact':'',
            'submittor_email': '',
            'error':'',
            'response':'',
            'isloading':false,
            'to_id':'',
            'users': [],
            'success': false,
            'file_number':'',
            'pages':''
        }

    }

    changeHandler = (event) => {
        this.setState({[event.target.name]: event.target.value})
        console.log(this.state.to)
    }

    submitHandler = (event) => {
        event.preventDefault()
        this.setState({'response':''})
        this.setState({'error':''})
        if(this.state.filedesc === '' || this.state.filename === '' || this.state.submittor_contact === '' || this.state.submittor_email === '' || this.state.submittor_name === ''){
            this.setState({'error':<Alert color="danger" className="alert-red">Fields cannot be empty! 😕</Alert>})
        }else{
            this.setState({'isloading':true})
            axios.post("/filetransfer/api/files/create.php",qs.stringify(this.state))
                .then(response => {
                    console.log(response.data)
                    this.setState({'response' : <Infomodal title='File Created' body={response.data.filenumber} toplabel='File has been create save this file number for future refrence' />})
                    this.setState({'isloading' : false})
                    this.setState({'file_number' : response.data.filenumber})
                    this.setState({'success' : true})
                    if(!(this.state.to_id == '')){
                        axios.post("/filetransfer/api/files/transfer.php",qs.stringify(this.state))
                            .then(response => {
                                console.log(response.data)
                                console.log("transfer done")
                            })
                            .catch(err => console.log(err))
                    }
                })
                .catch(error => (
                    this.setState({'error':<Alert color="danger" className="alert-red">Error occured! Try again</Alert>})
                ))
            
        }
    }

    getdata = () => {
        console.log("fetching data")
        axios.post("/filetransfer/api/account/fetch.php")
            .then(data => {
                this.setState({'users':data.data})
            })
            .catch(err => console.log(err))
    }
    componentDidMount(){
        this.getdata()
    }

    render(){
        const { users } = this.state
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
            if(this.props.data.roleid == 2){
                return(
                    <div>
                        <Pageheading name="Create File" />
                        <div className="content-container">
                            <div className="content-body">
                                
                                <div className="content">
                                    
                                    <Form onSubmit={this.submitHandler}>
                                        <FormGroup row>
                                            <Label>File Name</Label>
                                            <Input type="text" name="filename" onChange={this.changeHandler} />
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label>File Description</Label>
                                            <Input type="textarea" name="filedesc" onChange={this.changeHandler} />
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label>Submitted by</Label>
                                            <Input type="text" name="submittor_name" onChange={this.changeHandler} />
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label>Contact</Label>
                                            <Input type="tel" name="submittor_contact" onChange={this.changeHandler} />
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label>Email</Label>
                                            <Input type="email" name="submittor_email" onChange={this.changeHandler} />
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label>Transfer To: </Label>
                                            <Input type="select" name="to_id" onChange={this.changeHandler} >
                                                <option>Select user</option>
                                                {
                                                    users.map(user => 
                                                        <option key={user.userid} value={user.userid}>{user.name}</option>
                                                    )
                                                }
                                            </Input>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label>Pages</Label>
                                            <Input type="number" name="pages" onChange={this.changeHandler} />
                                        </FormGroup>
                                        <FormGroup row>
                                            <Button color="primary">CREATE FILE</Button>
                                        </FormGroup>
                                        
                                    </Form>
                                    
                                    {
                                        !this.state.isloading ? this.state.response : (<div><Spinner color="primary" /></div>)
                                    }
                                    <div>
                                        {this.state.error}
                                    </div>
                                    <Alert color="light"><h6>Warning!</h6> File will not be transfered to any user if you do not select transfer option above</Alert>
                                    
                                </div>
                                
                            </div>
                        </div>  
                        
                    </div>
                )
            }else{
                return(
                    <Redirect to="/dashboard" />
                )
            }
        }
    }
}

export default createfile