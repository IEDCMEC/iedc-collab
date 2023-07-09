import React from 'react';
import PropTypes from 'prop-types';
import './MainLayout.scss';
import Nav from '../Navbar/Navbar';

function MainLayout(props) {
  const { children, route } = props;
  return (
    <div>
      <Nav route={route} />
      <div className="layout__root">{children}</div>
    </div>
  );
}

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
  route: PropTypes.string.isRequired,
};

export default MainLayout;
