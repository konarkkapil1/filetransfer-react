import React , {Component} from 'react';
import Header from './header/header';
import Sidebar from './sidebar/sidebar';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Filehistory from './components/filehistory/filehistory';
import CreateFile from './components/createfile/create-file';
import Filetracking from './components/filetracking/filetracking';
import Currentfile from './components/currentfile/currentfile';
import Createaccount from './components/createaccount/createaccount';
import Employeemanagement from './components/employeemanagement/employeemanagement'
import CompletedFiles from './components/completedfiles/completedfiles'
import Createdepartment from './components/createdepartment/createdepartment'
import Home from './components/home/home'
import axios from 'axios'

class layout extends Component{
    constructor(props){
        super(props)
        this.state = {
            'username': '',
            'role': '',
            'department': '',
            'roleid':'',
            'active':''
        }
    }

    loaddata = () => {
        axios.post("/filetransfer/api/account/fetchcurrent.php")
            .then(data => {
                this.setState({'username': data.data.name})
                this.setState({'role' : data.data.rolename})
                this.setState({'department':data.data.deptname})
                this.setState({'roleid':data.data.roleid})
                this.setState({'active':data.data.active})
            })
            .catch(err => console.log(err))
    }

    render(){
        // console.log(this.state.active)
        return(
            <div onLoad={this.loaddata}>
                <Sidebar data={this.state} />
                <div className="body-container">
                    <Header username={this.state.username}  department={this.state.department} role={this.state.role} />
                    <Switch>
                        <Route exact path="/dashboard"> <Home /> </Route>
                        <Route path="/dashboard/file-tracking"><Filetracking data={this.state} /></Route>
                        <Route path="/dashboard/create-file"> <CreateFile data={this.state} /> </Route>
                        <Route path="/dashboard/file-history" ><Filehistory data={this.state} /></Route>
                        <Route path="/dashboard/current-file" ><Currentfile data={this.state} /></Route>
                        <Route path="/dashboard/create-account" ><Createaccount data={this.state} /></Route>
                        <Route path="/dashboard/employee-management"><Employeemanagement data={this.state} /></Route>
                        <Route path="/dashboard/completed-files"><CompletedFiles data={this.state} /></Route>
                        <Route path="/dashboard/create-department"><Createdepartment data={this.state} /></Route>
                    </Switch>
                </div>
                
            </div>

        );
    }
}

const dash = () => {
    return(
        <h1>Dashboard Home</h1>
    );
}

export default layout;