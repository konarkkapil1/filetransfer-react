import React from 'react'
import Pageheading from '../page-heading/pageheading'
import {Spinner,Form,FormGroup,Input,Label,Button,Alert} from 'reactstrap'
import axios from 'axios'
import qs from 'qs'
import { Redirect } from 'react-router-dom'

class Createdepartment extends React.Component{
    constructor(props){
        super(props)
        this.state={
            deptname:'',
            loading:true,
            success:'',
            error:''
        }

    }

    changeHandler = (event) =>{
        this.setState({[event.target.name]:event.target.value})
    }

    submitHandler = (event) => {
        event.preventDefault()
        this.setState({loading:true})
        if(this.state.deptname != ''){
            axios.post("/filetransfer/api/department/create.php",qs.stringify(this.state))
                .then(res =>{
                    if(res.data.success != null){
                        this.setState({success:<Alert className="green">{res.data.success} 😃</Alert>})
                        this.setState({loading:false})
                    }else{
                        this.setState({error:<Alert color="danger" className="alert-red">{res.data.error} 😕</Alert>})
                        this.setState({loading:false})
                    }
                })
                .catch(err => console.log(err))
        }else{
            this.setState({error: <Alert color="danger" className="alert-red">Fields cannot be empty 😕</Alert>})
            this.setState({loading:false})
        }
        
    }

    
    render(){
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
        }else{
            if(this.props.data.roleid == 100){
                return(
                    <React.Fragment>
                        <Pageheading name="Create Department" />
                        
                        <div className="content-container">
                            <div className="content-body">
                                <div className="content">
                                    <Form onSubmit={this.submitHandler}>
                                        <FormGroup row>
                                            <Label>Department Name</Label>
                                            <Input type="text" name="deptname" onChange={this.changeHandler} />
                                        </FormGroup>
                                        <FormGroup row>
                                            <Button color="primary">CREATE DEPARTMENT</Button>
                                        </FormGroup>
                                    </Form>
                                    <Alert color="light"><h6>Warning!</h6> To assign manager to department use create account option</Alert>
                                    {this.state.success}
                                    {this.state.error}
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                )
            }else{
                return(
                    <Redirect to="/dashboard" />
                )
            }
        }
    }

}

export default Createdepartment