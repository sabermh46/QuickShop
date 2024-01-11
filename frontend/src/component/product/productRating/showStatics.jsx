import React from "react";
import GenStar from "./GenStar";
import GenLine from "./GenLine";
import GenComb from "./GenComb";

const ShowStatics = ({info})=> {

    const rateArr = info.map((e)=> {
        return e.attributes.rating
    })
    const countMap = {}
    for(const value of rateArr){
        countMap[value] ? countMap[value]++ : countMap[value]= 1
    }
    console.log(rateArr);
    return(
        <div className="flex column">
            <GenComb val={5} cnt={countMap[5]} len={info.length}/>
            <GenComb val={4} cnt={countMap[4]} len={info.length}/>
            <GenComb val={3} cnt={countMap[3]} len={info.length}/>
            <GenComb val={2} cnt={countMap[2]} len={info.length}/>
            <GenComb val={1} cnt={countMap[1]} len={info.length}/>
        </div>
    )
}

export default ShowStatics