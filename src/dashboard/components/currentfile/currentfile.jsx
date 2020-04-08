import React , {Component } from 'react'
import Pageheading from '../page-heading/pageheading'
import { Form,Table,Spinner,Alert,Button } from 'reactstrap'
import axios from 'axios'

class currentfile extends Component {
    constructor(props){
        super(props)
        this.state = {
            'error' : '',
            'isloading' : true,
            'apidata' : [],
            'search' : '',
            'users' : [],
            'filenumber':'',
            'touser': ''
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

    transferfile = (event) => {
        event.preventDefault()
        console.log("transfered",this.state.touser)
        this.setState(this.state)

    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
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

        if(!(apidata == null)){
            filtereddata = apidata.filter( newdata => 
                newdata.file_number.includes(search)
            )
        }

        return(
            <React.Fragment>
                <Pageheading name="Current Files" />
                <div className="content-container">
                    <div className="content-body dashboard-table"> 
                        <div className="content">

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
                                        <th>TRANSFER TO</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        !isloading ?
                                        filtereddata.map(freshdata => (
                                            
                                            <tr>
                                                <td>{freshdata.serial}</td>
                                                <td>{freshdata.file_number}</td>
                                                <td>{freshdata.date}</td>
                                                <td>{freshdata.description}</td>
                                                <td>
                                                    <Form onSubmit={this.transferfile}>
                                                        <input value={freshdata.file_number} hidden />
                                                        <select className="dropdown useroptions" onChange={this.handleChange} name="touser">
                                                            <option></option>
                                                            {
                                                                users.map(user => (
                                                                    <option value={user.userid}>{user.name}</option>
                                                                ))
                                                            }
                                                        </select>
                                                        <Button size="sm" color="primary" type="submit" >TRANSFER</Button>
                                                    </Form>
                                                </td>
                                                
                                            </tr>
                                            
                                        ))
                                        : <tr><Spinner color="primary" /></tr>
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

export default currentfile