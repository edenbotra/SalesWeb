import * as React from "react";
import axios from "axios";
import Cookies from "universal-cookie/lib";
import Sale from "../Sale";

class Dashboard extends React.Component {

    state = {
        mySales : [],
    }


    componentDidMount() {
        const cookies = new Cookies();
        axios.get("http://localhost:8989/get-my-sales", {
            params: {
                token: cookies.get("logged_in")
            }
        }).then(response => {
            this.setState({mySales: response.data})
        })
    }

    getMySales = () => {

    }


    render() {
        return (
            <div style={{textAlign:"center", padding:"20px", marginLeft:"0px", marginRight:"30px",
                backgroundColor:"white", height:"50vh", width:"100%",
                borderRadius:"10px", boxShadow:"5px 5px 5px grey"}}>
                <pre><h3 className="headline
                "> DASHBOARD PAGE  </h3> </pre>

                {

                    this.state.mySales.map(sale => {
                        return (
                            <Sale sale = {sale}/>
                        )
                    })

                }
            </div>
        );
    }
}

export default Dashboard;