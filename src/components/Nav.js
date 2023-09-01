import React from 'react';
import {Link} from 'react-router-dom'

const Nav = ({ search, setSearch }) => {
  return (
    <nav className='Nav'>
        <form className='Nav__form' onSubmit={e=>e.preventDefault()}>
            <label htmlFor='search'>Search Posts</label>
            <input 
                id="search"
                type='text'
                placeholder='Search Posts'
                value={search}
                onChange={e=>setSearch(e.target.value)}
                className='Nav__input'
            />
        </form>
        <ul className='Nav__ul'>
            <li className='Nav__li'><Link to="/">Home</Link></li>
            <li className='Nav__li'><Link to="/post">Post</Link></li>
            <li className='Nav__li'><Link to="/about">About</Link></li>
        </ul>
    </nav>
  )
}

export default Nav