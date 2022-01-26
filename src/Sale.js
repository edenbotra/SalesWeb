import * as React from "react";
import Cookies from "universal-cookie/lib";
import axios from "axios";
import {useEffect, useState} from "react";

function Sale(props) {

    const [flag, setFlag] = useState(false)
    const [name, setName] = useState("")

    useEffect(() => {
        const cookies = new Cookies();
        // axios request
        axios.get("http://localhost:8989/is-sale-open", {
            params: {
                token: cookies.get("logged_in"),
                saleId: props.sale.id
            }
        }).then(response => {
            setFlag(response.data)
        })
        axios.get("http://localhost:8989/get-shop-name-from-sale", {
            params: {
                id: props.sale.id
            }
        }).then(response => {
            setName(response.data)
        })
    }, [])

    const startDate = new Date(Date.parse(props.sale.saleStart));
    const endDate = new Date(Date.parse(props.sale.saleEnd));

    return (
        < div style={{
            margin: "20px",
            padding: "10px",
            borderRadius: "10px",
            backgroundColor: "#F3EBF6",
            boxShadow: flag ? "8px 8px 8px green" : "8px 8px 8px red",
            width: "auto",
            height: "auto"
        }}>
            {
                props.bool ?
                    <h3 style={{color: "#8C55AA", fontSize: "30px"}}> {name} </h3>
                    :
                    <div></div>
            }

            <h3 style={{color: "black", fontSize: "20px"}}> {props.sale.description} </h3>

            <h4> Sale Duration</h4>
            <p style={{
                backgroundColor: "fuchsia",
                borderRadius: "10px",
                color: "white",
                fontWeight: "bold"
            }}> {startDate.toLocaleDateString() + " to " + endDate.toLocaleDateString()} </p>
        </div>
    )
}

export default Sale;