import React , {Component} from 'react'
import Pageheading from '../page-heading/pageheading'
import { Table , Spinner, Button, Form,Alert} from 'reactstrap'
import axios from 'axios'

class filetracking extends Component{
    constructor(props){
        super(props)
        this.state = {
            'apidata':[],
            'search':'',
            'error':'',
            'isloading':''
        }
    }

    Fetchdata = () => {
        this.setState({'isloading':true})
        axios.post("/filetransfer/api/files/history.php")
            .then(data => {
                if(!(data == null)){
                    this.setState({'apidata': data.data})
                    this.setState({'isloading':false})
                }else{
                    this.setState({'isloading':false})
                    this.setState({'apidata':<Alert color="warning">No Data Found</Alert>})
                }
                
            })
            .catch(error => console.log(error))
    }

    Handlechange = (event) => {
        this.setState({'search': event.target.value})
        console.log(this.state.apidata)
    }

    componentDidMount(){
        this.Fetchdata()
    }

    render(){
        const { apidata,search } = this.state
        
        var filtereddata = []

        if(!(apidata == null)){
            console.log(apidata)
            filtereddata = apidata.filter(newdata => 
                newdata.file_number.includes(search)
            )
        }

        return(
            <React.Fragment>
                <Pageheading name="File History"/>
                <div className="content-container">
                    <div className="content-body dashboard-table">
                         
                        <div className="content">
                            <div className="search-box">
                                <Form>
                                    <label>SEARCH: </label>
                                    <input className="search-input" onChange={this.Handlechange} type="text" placeholder="File number" ></input>
                                </Form>
                            </div>
                            <Table hover>
                                <thead>
                                    <tr>
                                        <th>SERIAL</th>
                                        <th>TRACKING ID</th>
                                        <th>FILE NUMBER</th>
                                        <th>CREATED ON</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    
                                        {
                                            
                                            filtereddata.map(freshdata => 
                                                (
                                                    
                                                        <tr key={freshdata.serial}>
                                                            <td>{freshdata.serial}</td>
                                                            <td>{freshdata.trackingid}</td>
                                                            <td>{freshdata.file_number}</td>
                                                            <td>{freshdata.created_on}</td>
                                                        </tr>
                                                    
                                                )
                                            )
                                            
                                        }
                                </tbody>
                            </Table>
                        </div>

                    </div>
                </div>
            </React.Fragment>
            
        )
    }
}

export default filetracking