import { Link, useParams } from 'react-router-dom'

const PostPage = ({ posts, handleDelete }) => {
    const { id } = useParams();
    const post = posts.find(post => (post.id).toString() === id);

    return (
        <main className='PostPage'>
            <article className='post'>
                { post && 
                    <>
                        <h2 className='Post__title'>{post.title}</h2>
                        <p className='Post__date'>{post.datetime}</p>
                        <p className='Post__body'>{post.body}</p>
                        <Link to={`/edit/${id}`}>
                            <button className='editButton'>
                                Edit Post
                            </button>
                        </Link>
                        <button className='deleteButton' onClick={() => handleDelete(post.id)}>
                            Delete Post
                        </button>
                        
                    </>
                }
                {
                    !post && 
                    <>
                        <p className='error'>Well, that's disappointing. Go back to <Link to='/'>home.</Link></p>
                    </>
                }
            </article>
        </main>
    )
}

export default PostPage