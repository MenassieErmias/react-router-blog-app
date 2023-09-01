import React from 'react';
import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const EditPost = ({
    posts, handleEdit, editTitle, setEditTitle, editBody, setEditBody
}) => {
    const { id } = useParams();
    const post = posts.find(post => (post.id).toString() == id);

    useEffect(() => {
        if (post) {
            setEditTitle(post.title);
            setEditBody(post.body);
        }
    }, [post, setEditTitle, setEditBody])

    return (
        <main className='NewPost'>
            {
                editTitle &&
                <>
                    <h2 className='NewPost__h2'>Edit Post</h2>
                    <form className='NewPost__form' onSubmit={e => e.preventDefault()}>
                        <label className='NewPost__label' htmlFor='title'>
                            Title:
                        </label>
                        <input
                            type='text'
                            id='title'
                            value={editTitle}
                            onChange={e => setEditTitle(e.target.value)}
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
                            value={editBody}
                            onChange={e => setEditBody(e.target.value)}
                            placeholder='Enter Body'
                            className='NewPost__textarea'
                            required
                        ></textarea>
                        <button onClick={() => handleEdit(post.id)} type='submit' className='NewPost__btn'>Submit</button>
                    </form>
                </>
            }
            {   !editTitle && 
                <>
                    <h2 className='error'>Post not found</h2>
                    <p className='error'>Well, that's disappointing! Go back to <Link to="/">Home</Link></p>
                </>
            }
        </main>
    )
}

export default EditPost