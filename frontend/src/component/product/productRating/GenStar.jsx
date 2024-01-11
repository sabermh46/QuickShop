import React from "react";

import star from '../../../assets/star.png';
import star2 from '../../../assets/star2.png';
import star3 from '../../../assets/star3.png';
import star5 from '../../../assets/star5.png';
import star7 from '../../../assets/star7.png';
import star9 from '../../../assets/star9.png';
import star0 from '../../../assets/nostar.png';

export default function GenStar({ value, size = '15', gap = '2' }) {
  const integerPart = parseInt(value);
  const fractionalPart = parseFloat((value - integerPart).toFixed(1));

  const filledStars = [];
  const emptyStars = [];

  const starStyle = {
    width: size+'px',
    height: size+'px'
  };
  const combineStyle = {
    display: "flex",
    gap: gap+'px'
  }

  // Calculate the number of filled and empty stars
  for (let i = 0; i < integerPart; i++) {
    filledStars.push(<img key={`star-${i}`} src={star} alt="filled star" style={starStyle} />);
  }

  if(fractionalPart > 0){
    if (fractionalPart < 0.3) {
      filledStars.push(<img key="star2" src={star2} alt="star2" style={starStyle} />);
    } else if (fractionalPart < 0.5) {
      filledStars.push(<img key="star3" src={star3} alt="star3" style={starStyle} />);
    } else if (fractionalPart === 0.5) {
      filledStars.push(<img key="star5" src={star5} alt="star5" style={starStyle} />);
    } else if (fractionalPart < 0.7) {
      filledStars.push(<img key="star7" src={star7} alt="star7" style={starStyle} />);
    } else if (fractionalPart <= 0.9) {
      filledStars.push(<img key="star9" src={star9} alt="star9" style={starStyle} />);
    }
  }

  for (let i = 0; i < 5 - filledStars.length; i++) {
    emptyStars.push(<img key={`empty-star-${i}`} src={star0} alt="empty star" style={starStyle} />);
  }

  return (
    <div className="starFamily" style={combineStyle}>
      {filledStars}
      {emptyStars}
    </div>
  );
}
