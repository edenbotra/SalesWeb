import './App.css';
import * as React from "react";

import {Redirect, Route} from "react-router";
import {BrowserRouter} from "react-router-dom";
import Cookies from "universal-cookie";
import SideBar from "./SideBar";
import Dashboard from "./pages/Dashboard";
import Setting from "./pages/Setting";
import Login from "./pages/Login";
import Shops from "./pages/Shops";
import Search from "./pages/Search";
import axios from "axios";
import Shop from "./pages/Shop";


class App extends React.Component {

  state = {
    isLoggedIn: false,
    isFirstLogin: false,
    token : ""
  }

  componentDidMount() {
    const cookies = new Cookies();
    if (cookies.get("logged_in")) {
      this.setState({
        isLoggedIn: true,
        token : cookies.get("logged_in")
      })
      axios.get("http://localhost:8989/first-login", {
        params: {
          token: cookies.get("logged_in"),
        }
      }).then(response => {
        if (response.data) {
          this.setState({isFirstLogin: response.data})
        }
        else {

          this.setState({isFirstLogin: response.data})
        }
      })
    }
  }


  render() {
    return (
        <div className="App">
          <BrowserRouter>
            {
              this.state.isLoggedIn ?
                  <div style={{display: "flex", alignItems: "start", marginTop: "50px"}}>
                    <SideBar />
                    {
                      this.state.isFirstLogin ?
                          <Redirect to={"/setting"} />
                          :
                          <Redirect to={"/dashboard"} />

                    }
                    <Route path={"/dashboard"} component={Dashboard} exact={true}/>
                    <Route path={"/shops"} component={Shops} exact={true}/>
                    <Route path={"/shops/:id"} component={Shop} exact={true}/>
                    <Route path={"/search"} component={Search} exact={true}/>
                    <Route path={"/setting"} component={Setting} exact={true}/>
                  </div>
                  :
                  <div>
                    <Route path={"/"} component={Login}/>
                  </div>
            }
          </BrowserRouter>
        </div>
    )
  }
}

export default App;