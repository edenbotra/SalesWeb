import * as React from "react";
import axios from "axios";
import Sale from "../Sale";

class Shop extends React.Component {

    state = {
        sales: [],
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
    }

    render() {
        return (
            <div style={{
                textAlign: "center", padding: "20px", marginLeft: "0px", marginRight: "30px",
                backgroundColor: "white", height: "auto", width: "100%",
                borderRadius: "10px", boxShadow: "5px 5px 5px grey", display: "flow"
            }}>
                <pre><h3 className="headline
                "> SHOP PAGE  </h3> </pre>
                {
                    this.state.sales.map(sale => {
                        return (
                            <Sale sale={sale}/>
                        )
                    })
                }
            </div>
        );
    }
}

export default Shop;