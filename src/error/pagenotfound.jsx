import React ,{Component} from 'react'
import {Button} from 'reactstrap'

class pagenotfound extends Component{
    render(){
        return(
            <React.Fragment>
                <div className="container ">
                    <h1>Err! Page not found  </h1>
                    <Button color="primary" href="/">Home</Button>
                </div>
            </React.Fragment>
        );
    }
}

export default pagenotfound