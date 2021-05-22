import React from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import Button from '../Button/Button';
import './Navbar.scss';

const Navbar: React.FC = () => {
  const history = useHistory();
  return (
    <nav className='navbar'>
      <div className='navbar__content'>
        <Link to='/' className='logo'>
          {' '}
          Songs List
        </Link>
        <div className='links'>
          <NavLink exact to='/'>
            Home
          </NavLink>
          <Button
            onClick={() => {
              history.push('/add-song');
            }}
            text='Add New Song'
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
