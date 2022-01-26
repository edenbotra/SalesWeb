import * as React from "react";
import {NavLink} from "react-router-dom";
import Cookies from "universal-cookie";
import './App.css';


class SideBar extends React.Component {
    state = {
        links: [
            {title: "Dashboard", path: "/dashboard"},
            {title: "All Shops", path: "/shops"},
            {title: "Look for Sale", path: "/search"},
            {title: "Setting", path: "/setting"},
        ]
    }

    componentDidMount() {
        const cookies = new Cookies();
        const ws = new WebSocket("ws://localhost:8989/stream?token=" + cookies.get("logged_in"));
        ws.onmessage = (message) => {
            const obj = JSON.parse(message.data);
            alert(Object.keys(obj).toString() +  obj[Object.keys(obj).toString()])
        }
    }

    logout = () => {
        const cookies = new Cookies();
        cookies.remove("logged_in");
        window.location.reload();
    }

    render() {
        return (
            <div style={{marginRight: "20px", marginLeft: "20px", paddingRight: "20px"}}>
                <ul>
                    {
                        this.state.links.map(link => {
                            return (
                                <NavLink to={link.path}
                                         className={"link"}
                                         activeClassName={"active"}>
                                    <div style={{marginBottom: "10px"}}>
                                        <button className={"button"}>
                                            {link.title}
                                        </button>
                                    </div>
                                </NavLink>
                            )
                        })
                    }
                    <button
                        className='button'
                        onClick={this.logout}>
                        Logout
                    </button>
                </ul>
            </div>
        )
    }
}

export default SideBar;