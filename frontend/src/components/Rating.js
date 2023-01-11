import React from 'react'
import { AiFillStar }  from 'react-icons/ai';
import { AiOutlineStar } from 'react-icons/ai';

const Rating = ({rating, numReviews, caption}) => {
  return (
    <div>
      <div>
        <span>{rating >= 1 ? <AiFillStar color='black'/> : rating >= 0.5 ? <AiOutlineStar color='black' /> : <AiFillStar />}</span>
        <span>{rating >= 2 ? <AiFillStar color='black'/> : rating >= 1.5 ? <AiOutlineStar color='black' /> : <AiFillStar />}</span>
        <span>{rating >= 3 ? <AiFillStar color='black'/> : rating >= 2.5 ? <AiOutlineStar color='black' /> : <AiFillStar />}</span>
        <span>{rating >= 4 ? <AiFillStar color='black'/> : rating >= 3.5 ? <AiOutlineStar color='black' /> : <AiFillStar />}</span>
        <span>{rating >= 5 ? <AiFillStar color='black'/> : rating >= 4.5 ? <AiOutlineStar color='black' /> : <AiFillStar />}</span>
        {
          caption ? (
            <span>{caption}</span>
          ) : (
            <span style={{color: '#595959'}}>({numReviews})</span>
          )
        }  
      </div>
    </div>
  )
}

export default Rating