import React , {Component} from 'react';
import Header from './header/header';
import Sidebar from './sidebar/sidebar';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Filehistory from './components/filehistory/filehistory';
import CreateFile from './components/createfile/create-file';
import Filetracking from './components/filetracking/filetracking';
import Currentfile from './components/currentfile/currentfile'

class layout extends Component{
    render(){
        return(
            <React.Fragment>
                <Sidebar />
                <div className="body-container">
                    <Header />
                    <Switch>
                        <Route exact path="/dashboard" component= {dash} />
                        <Route path="/dashboard/file-tracking" component={Filetracking} />
                        <Route path="/dashboard/create-file" component={CreateFile} />
                        <Route path="/dashboard/file-history" component={Filehistory} />
                        <Route path="/dashboard/current-file" component={Currentfile} />
                    </Switch>
                </div>
                
            </React.Fragment>

        );
    }
}

const dash = () => {
    return(
        <h1>Dashboard Home</h1>
    );
}

export default layout;