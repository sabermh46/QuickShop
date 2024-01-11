import React from "react";
import RatingContainer from "./ratingContainer";

const RatingReview = ({ratingInfos})=> {

    return(
        <div>
            <h2>Ratings and Reviews</h2>
            <RatingContainer info={ratingInfos}/>
        </div>
    )
}

export default RatingReview