import React, { useEffect, useState } from "react";
import './css.css'


const TheAddress = ({add})=> {

    console.log(add);
    return(
        <div className="theAddress">
            <div className="flex space-between x-center">
                <h2>{add.province}</h2>
                <div className="flex column">
                    <p className="mob">{add.mobile}</p>
                    <p className="name">{add.fullname}</p>
                </div>
            </div>
            
            <p>{add.address}</p>
            {add.area}, {add.city}, {add.province}
            {add.zip? ' - '+add.zip : null}
        </div>
    )
}

const ShowAddresses = ({ data }) => {
    console.log("ShowAddresses data:", data);

    return(
        <div className="flex g20 wrap">
            {   Array.isArray(data) && data.length ?
                data.map((d, i)=>{
                    return(
                        <TheAddress key={i} add={d.attributes}/>
                    )
                }) : "Please add a new Address"
            }
        </div>
    )
};

export default ShowAddresses