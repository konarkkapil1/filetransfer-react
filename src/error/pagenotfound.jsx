import React ,{Component} from 'react'
import {Button, Jumbotron} from 'reactstrap'

class pagenotfound extends Component{
    render(){
        return(
            <React.Fragment>
                <div className="container">
                    <Jumbotron>
                        <h1>Err! Page not found  </h1>
                        <Button color="primary" href="/">Home</Button>
                    </Jumbotron>
                </div>
                
            </React.Fragment>
        );
    }
}

export default pagenotfound