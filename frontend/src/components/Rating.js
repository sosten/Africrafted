import React from 'react'
import { AiFillStar }  from 'react-icons/ai';
import { BsStarHalf } from 'react-icons/bs';

const Rating = ({rating, numReviews}) => {
  return (
    <div>
        <div>
            <span>{rating >= 1 ? <AiFillStar color='#333'/> : rating >= 0.5 ? <BsStarHalf /> : <AiFillStar />}</span>
            <span>{rating >= 2 ? <AiFillStar color='#333'/> : rating >= 1.5 ? <BsStarHalf /> : <AiFillStar />}</span>
            <span>{rating >= 3 ? <AiFillStar color='#333'/> : rating >= 2.5 ? <BsStarHalf /> : <AiFillStar />}</span>
            <span>{rating >= 4 ? <AiFillStar color='#333'/> : rating >= 3.5 ? <BsStarHalf /> : <AiFillStar />}</span>
            <span>{rating >= 5 ? <AiFillStar color='#333'/> : rating >= 4.5 ? <BsStarHalf /> : <AiFillStar />}</span>
            <span>{numReviews} reviews</span>
        </div>
        
    </div>
  )
}

export default Rating