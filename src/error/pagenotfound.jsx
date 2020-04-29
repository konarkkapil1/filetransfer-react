import React ,{Component} from 'react'
import {Button, Jumbotron} from 'reactstrap'
import Header from '../header/header'

class pagenotfound extends Component{
    render(){
        return(
            <React.Fragment>
                <Header />
                <div className="container">
                    <Jumbotron className="err-container">
                        <h1>Err! Page not found 😕 </h1>
                        <Button color="primary" href="/">Home</Button>
                    </Jumbotron>
                </div>
                
            </React.Fragment>
        );
    }
}

export default pagenotfound