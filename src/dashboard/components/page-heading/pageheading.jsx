import React, {Component} from 'react'

class pageheading extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div className="text-md-left page-heading">
                <h6 className="light-text">DASHBOARD</h6>
                <h3>{this.props.name}</h3>
            </div>
        );
    }
}

export default pageheading;