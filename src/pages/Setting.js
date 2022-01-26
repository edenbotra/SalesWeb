import * as React from "react";
import { Checkbox } from '@mui/material';
import {FormControlLabel, FormGroup} from "@material-ui/core";
import axios from "axios";
import Cookies from "universal-cookie/lib";

class Setting extends React.Component {

    state = {
        orgs : [],
        checkedOrgs: {},
        forceRender: true
    }

    componentDidMount() {
        // get all orgs here with axios
        axios.get("http://localhost:8989/get-all-orgs")
            .then(response => {
                let orgs = response.data;
                this.setState( {orgs})
                // get user orgs
                this.getMyOrgs()
            })
    }

    getMyOrgs = () => {
        const cookies = new Cookies()
        axios.get("http://localhost:8989/get-my-orgs", {
            params : {
                token : cookies.get("logged_in")
            }
        }).then(response => {
            let checkedOrgs = {};
            response.data.map(myOrg => {
                checkedOrgs[myOrg] = true
            })
            this.setState({checkedOrgs})
        })
    }

    handleChange = (event) => {
        const cookies = new Cookies()
        let data = new FormData();
        data.append("token", cookies.get("logged_in"));
        data.append("orgId", event.target.id);

        // call axios to remove/add  use POST!
        axios.post("http://localhost:8989/update-org",data)
            .then(response => {
                this.getMyOrgs()
            })
    }

    render() {
        return (

            <div style={{textAlign:"center", padding:"20px", marginLeft:"0px", marginRight:"30px",
                backgroundColor:"white", height:"auto", width:"100%",
                borderRadius:"10px", boxShadow:"5px 5px 5px grey", display:"flow"}}>
                <pre><h3 className="headline
                "> SETTING PAGE  </h3> </pre>

                <FormGroup style={{marginLeft:"40px"}}>
                    {
                        this.state.orgs.map(org => {
                            return (
                                <div style={{textAlign:"left"}}>
                                    <FormControlLabel control={
                                        <Checkbox
                                            id={org.id.toString()}
                                            checked={this.state.checkedOrgs[org.id] === true}
                                            onChange={this.handleChange}
                                        />
                                    } label={org.name}/>
                                </div>
                            )
                        })
                    }
                </FormGroup>
            </div>
        );
    }
}

export default Setting;