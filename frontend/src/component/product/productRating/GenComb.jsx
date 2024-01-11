import React, { useEffect, useState } from "react";
import GenStar from "./GenStar";
import GenLine from "./GenLine";

const GenComb = ({val, cnt, len})=> {

    const [count, setCount] = useState(0);

    useEffect(()=>{
        if(cnt){
            setCount(cnt)
        }
    }, [])

    return (
        <div className="flex x-center g10">
            <GenStar size="12" gap="3" value={val}/>
            <GenLine percent={count/len}/>
            <p style={{fontSize: '14px'}}>{count ? parseFloat(((count/len)*100).toFixed(1)) : 0}%</p>
        </div>
    )
}

export default GenComb