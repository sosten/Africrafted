import React from 'react'
import { AiFillStar }  from 'react-icons/ai';
import { AiOutlineStar } from 'react-icons/ai';

const Rating = ({rating, numReviews, caption}) => {
  return (
    <div>
      <div>
        <span>{rating >= 1 ? <AiFillStar color='orange'/> : rating >= 0.5 ? <AiOutlineStar color='orange' /> : <AiFillStar />}</span>
        <span>{rating >= 2 ? <AiFillStar color='orange'/> : rating >= 1.5 ? <AiOutlineStar color='orange' /> : <AiFillStar />}</span>
        <span>{rating >= 3 ? <AiFillStar color='orange'/> : rating >= 2.5 ? <AiOutlineStar color='orange' /> : <AiFillStar />}</span>
        <span>{rating >= 4 ? <AiFillStar color='orange'/> : rating >= 3.5 ? <AiOutlineStar color='orange' /> : <AiFillStar />}</span>
        <span>{rating >= 5 ? <AiFillStar color='orange'/> : rating >= 4.5 ? <AiOutlineStar color='orange' /> : <AiFillStar />}</span>
        {
          caption ? (
            <span>{caption}</span>
          ) : (
            <span>{numReviews} reviews</span>
          )
        }  
      </div>
    </div>
  )
}

export default Rating