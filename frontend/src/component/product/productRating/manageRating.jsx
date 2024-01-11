import React, { useEffect, useState } from "react";
import GenStar from "./GenStar";

const ProductRating = ({rating})=> {

    const [avgRating, setAvgRating] = useState(null);

    useEffect(()=>{
        var totalRating = 0
        if(rating !== null){
            rating.map((r)=>{
                return totalRating += r.attributes.rating
            })
            setAvgRating(totalRating/rating.length)
        } else {
            setAvgRating(0)
        }
    }, [rating])

    console.log('rating : '+rating);

    return(
        <div>
            {
                <GenStar value={avgRating ? avgRating : 0} size="12" gap="2"/>
            }
        </div>
    )

}

export default ProductRating