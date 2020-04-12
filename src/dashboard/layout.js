import React , {Component} from 'react';
import Header from './header/header';
import Sidebar from './sidebar/sidebar';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Filehistory from './components/filehistory/filehistory';
import CreateFile from './components/createfile/create-file';
import Filetracking from './components/filetracking/filetracking';
import Currentfile from './components/currentfile/currentfile';
import Createaccount from './components/createaccount/createaccount';
import axios from 'axios'

class layout extends Component{
    constructor(props){
        super(props)
        this.state = {
            'username': '',
            'role': '',
            'department': '',
            'roleid':''
        }
    }

    loaddata = () => {
        axios.post("/filetransfer/api/account/fetchcurrent.php")
            .then(data => {
                this.setState({'username': data.data.name})
                this.setState({'role' : data.data.rolename})
                this.setState({'department':data.data.deptname})
                this.setState({'roleid':data.data.roleid})
            })
            .catch(err => console.log(err))
    }

    render(){
        // console.log(this.props.data)
        return(
            <div onLoad={this.loaddata}>
                <Sidebar data={this.state} />
                <div className="body-container">
                    <Header username={this.state.username}  department={this.state.department} role={this.state.role} />
                    <Switch>
                        <Route exact path="/dashboard" component= {dash} />
                        <Route path="/dashboard/file-tracking" component={Filetracking} />
                        <Route path="/dashboard/create-file"> <CreateFile data={this.state} /> </Route>
                        <Route path="/dashboard/file-history" component={Filehistory} />
                        <Route path="/dashboard/current-file" component={Currentfile} />
                        <Route path="/dashboard/create-account" ><Createaccount data={this.state} /></Route>
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