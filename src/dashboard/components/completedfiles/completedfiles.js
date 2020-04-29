import React from 'react'
import Pageheading from '../page-heading/pageheading'
import {Spinner,Alert,Form,Table} from 'reactstrap'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

class CompletedFiles extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            loading:true,
            data:[],
            error:'',
            search:''
        }
    }

    fetchdata = () =>{
        this.setState({loading:true})
        axios.post("/filetransfer/api/files/completed.php")
            .then(data => {
                if(data.data.error == null){
                    this.setState({data : data.data})
                    this.setState({loading:false})
                    console.log(data.data)
                }else{
                    this.setState({data:null})
                    this.setState({loading:false})
                }
            })
            .catch(err => console.log(err))
    }

    Handlechange = (event) =>{
        this.setState({search : event.target.value})
        console.log(this.state.search)
    }

    componentDidMount(){
        this.fetchdata()
    }

    render(){
        const {data,search,loading} = this.state
        var filtereddata = []
        if(data != null){
            filtereddata = data.filter(newdata =>(
                newdata.file_number.includes(search)
            ))
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
            if(this.props.data.roleid == 2){
                

                return(
                    <React.Fragment>
                        <Pageheading name="Completed Files"/>
                        <div className="content-container">
                            <div className="content-body dashboard-table">    
                                <div className="content">
                                    <div className="search-box">
                                        <Form>
                                            <label>SEARCH: </label>
                                            <input className="search-input" onChange={this.Handlechange} type="text" placeholder="File number" ></input>
                                        </Form>
                                    </div>

                                    <Table hover>
                                        <thead>
                                            <tr>
                                                <th>SERIAL</th>
                                                <th>FILE NUMBER</th>
                                                <th>DESCRIPTION</th>
                                                <th>SUBMIT TIME</th>
                                                <th>SUBMIT BY</th>
                                                <th>CONTACT</th>
                                                <th>EMAIL</th>
                                                <th>PAGES</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                !loading ?
                                                    filtereddata != '' ?
                                                        filtereddata.map(newdata =>(
                                                            <tr>
                                                                <td>{newdata.serial}</td>
                                                                <td>{newdata.file_number}</td>
                                                                <td>{newdata.description}</td>
                                                                
                                                                <td>{newdata.timestamp_submission}</td>
                                                                <td>{newdata.submittor_name}</td>
                                                                <td>{newdata.submittor_contact}</td>
                                                                <td>{newdata.submittor_email}</td>
                                                                <td>{newdata.pages}</td>
                                                            </tr>
                                                        ))
                                                    :<tr><td colSpan="9"><Alert color="warning">No Data Found</Alert></td></tr>
                                                :<tr><td colSpan="9"><Spinner color="primary" /></td></tr>
                                            }
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
        
                )
            }
            else{
                return(
                    <Redirect to="/" />
                )
            }
        }
        
    }
}

export default CompletedFiles