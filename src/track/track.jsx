import React, {Component} from 'react';
import {Container,Row,Col,Table,Alert,Spinner,Modal,ModalBody,ModalHeader} from 'reactstrap';
import axios from 'axios';
import qs from 'qs';
import Header from '../header/header';


class track extends Component {
    constructor(props){
        super(props)
        this.state = {
            'filenumber':'',
            'error': '',
            'data': [],
            'isloading': ''
        }
    }
    changeHandler = (e) =>{
        this.setState({[e.target.name]:e.target.value })
    }
    submitHandler = (e) => {
        e.preventDefault();
        if(this.state.filenumber === ''){
            this.setState({'error':<Alert color="danger">Fields cannot be empty !</Alert>})
        }else{
            this.setState({'error':''})
            this.setState({'isloading':true})
            this.setState({'click':this.state.click+=1})

            axios.post("/filetransfer/api/files/track.php",qs.stringify(this.state))
                .then(response =>{
                    if(!(response.data === null)){
                        console.log(response.data)
                        this.setState({'data': response.data})
                        this.setState({'isloading':false})
                    }else{
                        this.setState({'error':<Alert color="warning">No Data found</Alert>})
                        this.setState({'isloading':false})
                    }
                })
                .catch(error => {
                    console.log(error)
                })   
        }

    }
    render(){
        const {data,filenumber,isloading} = this.state
        return(
            <React.Fragment>
                <Header navlink="/" linktext="Login" />
                <Container className="login-holder">
                    <Row>
                        <Col sm="12" md={{ size: 6, offset: 3 }}>
                            <form className="form margin-10vh" onSubmit={this.submitHandler}>
                                <h1 className="h3 mb-3 font-weight-normal text-center">Track File</h1>
                                
                                <div className="input-group mb-3">
                                    <label className="sr-only">File Number</label>
                                    <input type="text" id="inputEmail" className="form-control" value={filenumber} onChange={this.changeHandler}  name="filenumber" placeholder="File Number" required=""></input>
                                </div>
                                
                                
                                <button className="btn btn-lg btn-primary btn-block" type="submit">Track</button>
                                <div className="mt-3">
                                    {this.state.error}
                                </div>
                                
                            </form>
                        </Col>
                    </Row>
                    {
                        !isloading ? 
                            (data.map(record =>{
                                const {serial,filenumber,from,to,time} = record
                                return(
                                    
                                    <Table>
                                        <thead>
                                            <tr>
                                                <th>serial</th>
                                                <th>File number</th>
                                                <th>From</th>
                                                <th>To</th>
                                                <th>Time</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{serial}</td>
                                                <td>{filenumber}</td>
                                                <td>{from}</td>
                                                <td>{to}</td>
                                                <td>{time}</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                )
                            })
                            
                            ): (<div><Spinner color="primary" /></div>)
                    }
                </Container>
            </React.Fragment>
            
        );
    }
}

export default track;