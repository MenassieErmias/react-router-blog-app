import { Link } from 'react-router-dom';

const Missing = () => {
  return (
    <main className='Missing'>
        <h2 className='error'>
          The requested page seems to not exist.
        </h2>
        <p className='error'>
          Well, that's disappointing. Go back to <Link to='/'>home.</Link>
        </p>
    </main>
  )
}

export default Missing