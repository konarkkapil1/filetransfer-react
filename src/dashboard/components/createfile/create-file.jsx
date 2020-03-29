import React, {Component} from 'react'
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
            'isloading':false
        }

    }
    

    changeHandler = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    submitHandler = (event) => {
        event.preventDefault()
        this.setState({'response':''})
        this.setState({'error':''})
        if(this.state.filedesc === '' || this.state.filename === '' || this.state.submittor_contact === '' || this.state.submittor_email === '' || this.state.submittor_name === ''){
            this.setState({'error':<Alert color="danger">Fields cannot be empty !</Alert>})
        }else{
            this.setState({'isloading':true})
            axios.post("/filetransfer/api/files/create.php",qs.stringify(this.state))
                .then(response => (
                    console.log(response.data.filenumber),
                    this.setState({'response': <Infomodal title='File Created' body={response.data.filenumber} toplabel='File has been create save this file number for future refrence' />}),
                    this.setState({'isloading':false})
                ))
                .catch(error => (
                    this.setState({'error':<Alert color="danger">Error occured! Try again</Alert>})
                ))
        }
    }


    render(){
        return(
            <React.Fragment>
                
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
                                    <Button color="primary">CREATE FILE</Button>
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
                
            </React.Fragment>
        );
    }
}

export default createfile