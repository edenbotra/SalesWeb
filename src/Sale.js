import * as React from "react";
import Cookies from "universal-cookie/lib";
import axios from "axios";
import {useEffect, useState} from "react";

function Sale(props) {

    const [flag, setFlag] = useState(false)

    useEffect(() => {
        const cookies = new Cookies();
        // axios request
        axios.get("http://localhost:8989/is-sale-open", {
            params: {
                token : cookies.get("logged_in"),
                saleId: props.sale.id
            }}).then(response => {
            setFlag(response.data)
        })
    }, [])

    return (
        < div style={{padding:"10px",borderRadius:"10px", backgroundColor:"#F3EBF6" ,boxShadow: flag  ? "8px 8px 8px green" :"8px 8px 8px red", width:"50%", height:"40px"}}>
            <h3 style={{color: "#8C55AA"}}> {props.sale.description} </h3>
        </div>
    )
}

export default Sale;