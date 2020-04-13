import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import axios from 'axios'
import Pageheading from '../page-heading/pageheading'
import {Form,Table} from 'reactstrap'
class employeemanagement extends Component{
    constructor(props){
        super(props)
        this.state = {
            'users' : [],
            'loading': true,
            'search':''
        }
    }
    loaddata = () => {
        this.setState({'loading' : true})
        axios.post("/filetransfer/api/account/fetch.php")
            .then(response => {
                this.setState({'users' : response.data})
                this.setState({'loading' : false})
                console.log(response.data)
            })
            .catch(err => console.log(err))
    }
    changeHandler = (event) => {
        this.setState({'search': event.target.value})
        // console.log(this.state.search)
    }

    componentDidMount(){
        this.loaddata()
    }

    render(){
        const {users,search} = this.state
        var filteredusers = []
        if(!(users == null)){
            console.log(users)
            filteredusers = users.filter(user => 
                user.name.toLowerCase().includes(search)
            )
        }
        console.log(filteredusers)
        if(this.props.data.roleid == 2 || this.props.data.roleid == 100 ){
            return(
                <div>
                    <Pageheading name="Employee management" />
                    <div className="content-container">
                        <div className="content-body dashboard-table">
                            <div className="content">

                                <div className="search-box">
                                    <Form>
                                        <label>SEARCH: </label>
                                        <input className="search-input" onChange={this.changeHandler} type="text" placeholder="Name" ></input>
                                    </Form>
                                </div>
                                <Table hover>
                                
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                            <th>Department</th>
                                            <th>Role</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        
                                        {
                                            filteredusers.map(filtereduser => 
                                                <tr>
                                                    <td>{filtereduser.name}</td>
                                                    <td>{filtereduser.email}</td>
                                                    <td>{filtereduser.phone}</td>
                                                    <td>{filtereduser.deptname}</td>
                                                    <td>{filtereduser.rolename}</td>
                                                </tr>
                                            )
                                        }
                                        
                                    </tbody>

                                </Table>

                            </div>
                        </div>
                    </div>
                </div>
            )
        }else{
            return(<Redirect to="/dashboard" />)
        }
        
    }
}

export default employeemanagement