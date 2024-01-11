import React from "react";

const GenLine =({percent})=> {

    return(
        <div className="parent">
            <div style={{width: (percent && percent ? percent*100 : 0)+'px'}} className="child"></div>
        </div>
    )

}

export default GenLine