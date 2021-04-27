import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import { MenuItems } from './MenuItems';
import '../../styles/Navbar.css';

export class Navbar extends Component {
  // Click state for Menu icon
  state = { clicked: false };

  // Set Menu icon to the opposite of what it currently is (hamburger or x)
  handleClick = () => {
    this.setState({ clicked: !this.state.clicked });
  };

  render() {
    return (
      <nav className='Navbar__items'>
        <h1 className='Navbar__logo'>
          <a
            className='Navbar__logoLink'
            href='/'
            style={{ textDecoration: 'none', color: 'white' }}
          >
            <i className='fas fa-plane'></i> BOEING 360°
          </a>
        </h1>
        <div className='Navbar__menuIcon' onClick={this.handleClick}>
          <i
            className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}
          ></i>
        </div>
        <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
          <Link to='/' style={{ textDecoration: 'none' }}>
            <li className='nav-link'>Home</li>
          </Link>
          <Link to='/live-cam' style={{ textDecoration: 'none' }}>
            <li className='nav-link'>360° Cam</li>
          </Link>
          <Link to='/live-map' style={{ textDecoration: 'none' }}>
            <li className='nav-link'>Live-Map</li>
          </Link>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
