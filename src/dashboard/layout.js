import React , {Component} from 'react';
import Header from './header/header';
import Sidebar from './sidebar/sidebar';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Tracking from './files/tracking';
import CreateFile from './components/createfile/create-file';
import FileHistory from './components/filehistory/filehistory';


class layout extends Component{
    render(){
        return(
            <React.Fragment>
                <Sidebar />
                <div className="body-container">
                    <Header />
                    <Switch>
                        <Route exact path="/dashboard" component= {dash} />
                        <Route path="/dashboard/file" component={Tracking} />
                        <Route path="/dashboard/create-file" component={CreateFile} />
                        <Route path="/dashboard/file-history" component={FileHistory} />
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