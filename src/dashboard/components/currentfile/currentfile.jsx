import React , {Component } from 'react'
import Pageheading from '../page-heading/pageheading'
import { Form,Table,Spinner,Alert,Button,Input } from 'reactstrap'
import axios from 'axios'
import qs from 'qs'

class currentfile extends Component {
    constructor(props){
        super(props)
        this.state = {
            'error' : '',
            'isloading' : true,
            'apidata' : [],
            'search' : '',
            'users' : [],
            'file_number':'',
            'to_id': '',
            'render': '',
            'success':'',
            'action':''
        }

    }

    fetchdata = () => {
        this.setState({'isloading':true})
        axios.post("/filetransfer/api/files/current.php")
            .then(data => {
                if(!(data == null)){
                    this.setState({'apidata':data.data})
                    this.setState({'isloading':false})
                }else{
                    this.setState({'data':<Alert color="warning">No Data Found</Alert>},{'isloading':false})
                }
            })
            .catch(err => console.log(err))

        this.setState({'loading':true})
        axios.post("/filetransfer/api/account/fetch.php")
            .then(data => {
                if(!(data == null)){
                    console.log(data)
                    this.setState({'users':data.data})
                    this.setState({'isloading':false})
                }else{
                    this.setState({'users':null})
                }
                
            })
            .catch(err => console.log(err))
    }

    transfer = (file_number) => {
        if(this.state.to_id == "" || this.state.to_id == "0" || this.state.action == ''){
            this.setState({'error':<Alert className="alert-red" color="danger">Fill all the fields 😕</Alert>})
        }else{
            var data = { to_id:this.state.to_id, file_number:file_number, action:this.state.action}
            axios.post("/filetransfer/api/files/transfer.php",qs.stringify(data))
                .then(res => {
                    console.log(res)
                    if(res.data.error == null){
                        this.setState({'error': <Alert className="green">File Transfered Succesfully 😃</Alert>})
                    }else{
                        this.setState({error: <Alert className="alert-red" color="danger">{res.data.error} 😕</Alert>})
                    }
                    
                    console.log(res.data)
                    this.fetchdata()
                })
                .catch(err => console.log(err))
            
        }
        
    }
    
    complete = (data) => {
        this.setState({"isloading":true})
        axios.post("/filetransfer/api/files/complete.php",qs.stringify(data))
            .then(data => {
                this.setState({"success":<Alert className="green">{data.success} 😃</Alert>})
                this.setState({"isloading":false})
                
                this.fetchdata()
            })
            .catch(err => console.log(err))
        
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
        console.log(this.state.action)
    }

    componentDidMount(){
        this.fetchdata()
    }
    

    searchChange = (event) => {
        this.setState({'search': event.target.value})
    }

    render(){
        const { apidata,isloading,search,users } = this.state
        
        var filtereddata = []
        // console.log(apidata.length,apidata)
        if(apidata !== null){
            filtereddata = apidata.filter( newdata => 
                newdata.file_number.includes(search)
            )
        }
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
            if(this.props.data.roleid == 1 || this.props.data.roleid == 2){
                return(
                    <React.Fragment>
                        <Pageheading name="Current Files" />
                        <div className="content-container">
                            <div className="content-body dashboard-table"> 
                                <div className="content">
                                    <div className="error-box">
                                        {this.state.error}
                                    </div>
                                    <div className="search-box">
                                        <Form>
                                            <label>SEARCH: </label>
                                            <input className="search-input" onChange={this.searchChange} type="text" placeholder="File number" ></input>
                                        </Form>
                                        
                                    </div>
                                    
                                    <Table hover>
                                        <thead>
                                        
                                            <tr>
                                                <th>SERIAL</th>
                                                <th>FILE NUMBER</th>
                                                <th>CREATION TIME</th>
                                                <th>DESCRIPTION</th>
                                                <th>ACTION TAKEN</th>
                                                <th>TRANSFER TO</th>
                                                <th>COMPLETE</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                !isloading ?
                                                    filtereddata.length > 0 ?
                                                        filtereddata.map(freshdata => (
                                                            
                                                            <tr>
                                                                <td>{freshdata.serial}</td>
                                                                <td>{freshdata.file_number}</td>
                                                                <td>{freshdata.date}</td>
                                                                <td>{freshdata.description}</td>
                                                                <td><Input type="textarea" placeholder="describe action taken..." onChange={this.handleChange} name="action" /></td>
                                                                <td>
                                                                    
                                                                        
                                                                    <select className="dropdown useroptions" onChange={this.handleChange} name="to_id">
                                                                        <option value="0">Select User</option>
                                                                        {
                                                                            users.map(user => (
                                                                                <option value={user.userid}>{user.name}</option>
                                                                            ))
                                                                        }
                                                                    </select>
                                                                    <Button onClick={ () => {this.transfer(freshdata.file_number)}} size="sm" color="primary" >TRANSFER</Button>
                                                                    
                                                                    
                                                                </td>
                                                                <td>
                                                                    <Button outline size="sm" color="success" onClick={()=> this.complete(freshdata)} >COMPLETE</Button>
                                                                </td>
                                                            </tr>
                                                            
                                                        ))
                                                    : <tr><td colSpan="7"><Alert color="warning">No Data Found 😕</Alert></td></tr>
                                                : (<tr><td colSpan="7"><Spinner color="primary" /></td></tr>)
                                                
                                            }
                                        </tbody>
        
        
                                    </Table>
        
                                </div>
                            </div>
                        </div>
        
                    </React.Fragment>
                )
            }
        }
        
    }
}

export default currentfile