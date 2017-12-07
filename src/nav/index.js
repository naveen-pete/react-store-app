import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = props => {
  return (
    <ul className="nav nav-pills">
      <li>
        <NavLink to="/" exact activeClassName="nav-active">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/products" activeClassName="nav-active">
          Products
        </NavLink>
      </li>
      <li>
        <NavLink to="/customers" activeClassName="nav-active">
          Customers
        </NavLink>
      </li>
    </ul>
  );
};

export default Nav;
