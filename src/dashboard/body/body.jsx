import React ,{Component} from 'react';
import Sidebar from '../sidebar/sidebar';


class body extends Component {
    render(){
        return(
            <div className="dashboard-holder">
                <Sidebar />
            </div>
        );
    }
}

export default body;