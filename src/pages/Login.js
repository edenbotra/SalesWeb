import React from "react";
import axios from "axios";
import Cookies from "universal-cookie/es6";
import {Redirect} from "react-router";
import {Button} from "@material-ui/core";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import LoginIcon from '@mui/icons-material/Login';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import {Alert} from "@mui/material";

class Login extends React.Component  {

    state = {
        username: "",
        password: "",
        showError:false,

    }
    onUsernameChange = (e) => {
        let username = e.target.value;
        this.setState({
            username
        })
    }

    onPasswordChange = (e) => {
        let password = e.target.value;
        this.setState({
            password
        })
    }


    signUp = () => {

        // axios post
        let data = new FormData();
        data.append("username", this.state.username);
        data.append("password", this.state.password);
        axios.post("http://localhost:8989/create-account", data)
            .then((response) => {
                if (response.data) {
                    this.setState({
                            response: "Your account has been created!"
                        }
                    )
                } else {

                    this.setState({
                        showError: true,
                        response: "This username is already taken"
                    })
                }
            })
    }


    login = () => {
        axios.get("http://localhost:8989/sign-in", {
            params: {
                username: this.state.username,
                password: this.state.password
            }
        })
            .then(response=> {
                switch (response.data){
                    case "userNotExist" :this.setState({
                        response: "no user related to this phone number"
                    });
                        break;
                    case "invalidPassword":this.setState({response: "wrong password"});break
                    case "userBlocked": alert("you are blocked, pls contact us");break;
                    default :
                        this.setState({
                            showError:true

                        });
                        const cookies = new Cookies()
                        cookies.set("logged_in", response.data)
                        window.location.reload();
                }

            })
    }

    render() {
        const hasRequiredDetails = !(this.state.username === "" || this.state.password === "");

        if(this.state.success)
            return (<Redirect to={"/UserPage"}/>)
        return(
            <div>
                <Button startIcon={<PersonPinIcon/>}>welcome</Button>
                <pre><h2 className="titleLogin">Shopping   <br/>   anytime,   <br/>    anywhere</h2></pre>
                <form className="form1">
                    <div>
                        <input
                            className="un "
                            type="text"
                            align="center"
                            onChange={this.onUsernameChange}
                            placeholder="mobile number"
                        />
                    </div>
                    <div>
                        <input
                            className="pass"
                            type="password"
                            align="center"
                            onChange={this.onPasswordChange}
                            placeholder="password"
                        />
                    </div>
                    <Button onClick={this.login}
                            disabled={!hasRequiredDetails}
                            startIcon={<LoginIcon />}
                            className="sidebar_compose">
                        login
                    </Button>
                    <Button onClick={this.signUp}
                            disabled={!hasRequiredDetails}
                            startIcon={<PersonAddAltIcon />}
                            className="sidebar_compose">
                        sign in
                    </Button>
                    <h2 style={{margin:"30px", color:"#9866d5"}}>
                        all benefits in one place.
                    </h2>
                </form>
                {
                    this.state.response === "no user related to this phone number" || this.state.response === "wrong password" || this.state.response === "This username is already taken" ?
                        <div className="error">{this.state.response}</div>
                        :
                        <div></div>
                }
                {
                    this.state.response==="Your account has been created!"?
                        <Alert severity="success" aria-setsize={50}>welcome!you successfully joined messenger</Alert>
                        :
                        <div></div>

                }
            </div>
        )

    }

}
export default Login;