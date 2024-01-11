import React, { useEffect, useState } from "react";
import './rating.css'
import star from '../../../assets/star.png'
import GenStar from "./GenStar";
import ShowStatics from "./showStatics";

const RatingContainer = ({info})=> {

    const rateWord = ["Not rated", "Poor", "Average", "Good", "Awesome", "Excellent"]
    const [avgRating, setAvgRating] = useState(null);

    useEffect(()=>{
        var totalRating = 0
        if(info !== null){
            info.map((r)=>{
                return totalRating += r.attributes.rating ? r.attributes.rating : 0
            })
            setAvgRating(parseFloat((totalRating/info.length).toFixed(1)))
        } else {
            setAvgRating(0)
        }
    }, [info])

    return(
        <div className="ratingContainer x-center">
            <div className="left">
                <div>
                    {
                        avgRating ? 
                        <h2>{avgRating} &nbsp; <img height={15} src={star} alt="Star" /> &nbsp; {rateWord[parseInt(avgRating)]}</h2>
                        : <h2>No Ratings</h2>
                    } 
                    <GenStar value={avgRating} size="20" gap="5"/>
                    {info.length} Ratings
                </div>
            </div>
            <div className="right">
                <ShowStatics info={info}/>
            </div>
        </div>
    )
}

export default RatingContainer