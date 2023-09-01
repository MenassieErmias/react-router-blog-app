import React from 'react'

const NewPost = ({
  handleSubmit, 
  postTitle,
  setPostTitle, 
  postBody, 
  setPostBody
}) => {
  return (
    <main className='NewPost'>
        <h2 className='NewPost__h2'>New Post</h2>
        <form className='NewPost__form' onSubmit={handleSubmit}>
          <label className='NewPost__label' htmlFor='title'>
            Title:
          </label>
          <input
            type='text'
            id='title'
            value={postTitle}
            onChange={e=>setPostTitle(e.target.value)}
            placeholder='Enter Title'
            className='NewPost__input'
            required
          />
          <label className='NewPost__label' htmlFor='body'>
            Body:
          </label>
          <textarea
            type='text'
            id='body'
            value={postBody}
            onChange={e=>setPostBody(e.target.value)}
            placeholder='Enter Body'
            className='NewPost__textarea'
            required
          ></textarea>
          <button type='submit' className='NewPost__btn'>Submit</button>
        </form>
    </main>
  )
}

export default NewPost