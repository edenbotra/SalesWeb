import * as React from "react";
import axios from "axios";
import Sale from "../Sale";

class Shop extends React.Component {

    state = {
        shopName: "",
        sales: []
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        axios.get("http://localhost:8989/get-shop-sales", {
            params: {
                id
            }
        }).then(response => {
            this.setState({sales: response.data})
        })
        axios.get("http://localhost:8989/get-shop-name", {
            params: {
                id
            }
        }).then(response => {
            this.setState({shopName: response.data})
        })
    }

    render() {
        return (
            <div style={{
                textAlign: "center", padding: "20px", marginLeft: "0px", marginRight: "30px",
                backgroundColor: "white", height: "auto", width: "100%",
                borderRadius: "10px", boxShadow: "5px 5px 5px grey"
            }}>
                <pre><h3 className="headline
                "> {this.state.shopName}  </h3> </pre>


                <div style={{display: "flex", flexWrap: "wrap"}}>
                    {
                        this.state.sales.map(sale => {
                            return (
                                // dont display name of sale's shop inside shop page
                                <Sale sale={sale} bool={false}/>
                            )
                        })
                    }
                </div>
            </div>
        );
    }
}

export default Shop;