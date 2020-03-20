import React , {Component} from 'react';
import Header from './header/header';
import Sidebar from './sidebar/sidebar';
import {BrowserRouter,Route,Switch,Redirect} from 'react-router-dom';
import Tracking from './files/tracking'


class layout extends Component{
    render(){
        return(
            <React.Fragment>
                <Sidebar />
                <Header />
                
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/dashboard" component= {dash} />
                        <Route path="/dashboard/file" component={Tracking} />
                    </Switch>
                </BrowserRouter>
                

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