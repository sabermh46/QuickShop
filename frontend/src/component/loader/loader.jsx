import React from "react";
import loadIcon from "../../assets/loader.svg"
import "./loader.css"

const Loader = ()=>{
    return(
        <div className="loader">
            <img src={loadIcon} alt="Loading Icon" />
        </div>
    )
}

export default Loader