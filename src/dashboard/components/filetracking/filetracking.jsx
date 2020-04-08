import React, {Component} from 'react'
import Pageheading from '../page-heading/pageheading'
import { Table , Spinner, Button, Form,Alert} from 'reactstrap'
import axios from 'axios'
import qs from 'qs'

class trackfile extends Component{
    constructor(props){
        super(props)
        this.state = {
            'error':'',
            'isloading':true,
            'data': [],
            'searchfield':'',
            'filtereddata':[]
        }
    }

    Fetchdata = () => {
        this.setState({'isloading':true})
        axios.post("/filetransfer/api/files/tracking.php")
            .then(response => {
                if(!(response.data == null)){
                    this.setState({'data':response.data})
                    this.setState({'isloading':false})
                }else{
                    //if no data found do something here
                    this.setState({'isloading':false})
                    console.log("No data found")
                }
            })
            .catch(error => console.log(error))
    }

    componentDidMount(){
        this.Fetchdata()
    }

    searchChange = (event) => {
        this.setState({'searchfield':event.target.value})
        console.log(this.state.searchfield)
    }
    
    render(){
        const {isloading , data ,searchfield} = this.state
        return(
            <React.Fragment>
                <Pageheading name="File Tracking" />
                
                <div className="content-container">
                    <div className="content-body dashboard-table">
                         
                        <div className="content">
                            <div className="search-box">
                                <Form>
                                    <label>SEARCH: </label>
                                    <input className="search-input" onChange={this.searchChange} type="text" placeholder="File number" ></input>
                                </Form>
                            </div>
                            
                            <Table hover>
                            
                                <thead>
                                    <tr>
                                    <th>SERIAL</th>
                                    <th>FILE NUMBER</th>
                                    <th>FROM USER</th>
                                    <th></th>
                                    <th>TO USER</th>
                                    <th>TIME</th>
                                    </tr>
                                </thead>
                                
                                <tbody>
                                    {
                                        !isloading ? 
                                            !(data == null) ?
                                                data.map(result => {
                                                    const {serial, file_number,from,to,timestamp} = result
                                                    return(
                                                        <tr key={serial}>
                                                            <td>{serial}</td>
                                                            <td>{file_number}</td>
                                                            <td>{from}</td>
                                                            <th>➡️</th>
                                                            <td>{to}</td>
                                                            <td>{timestamp}</td>
                                                        </tr>
                                                    )
                                                })
                                            : <Alert color="warning">No Data Found</Alert>
        
                                        : (<tr><Spinner color="primary" /></tr>)
                                    }
                                </tbody>
                            </Table>
                            
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default trackfile