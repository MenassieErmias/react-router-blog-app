import React from 'react';
import { Link } from 'react-router-dom';
const Post = ({post}) => {
  return (
    <article className='Post'>
        <Link to={`/post/${post.id}`}> 
            <h2 className='Post__h2'>{post.title}</h2>
            <p className='Post__date'>{post.datetime}</p>
            <p className='Post__p'>{post.body.slice(0, 100)}{post.body.length > 100 ? "...": ""}</p>
        </Link>
    </article>
  )
}

export default Post