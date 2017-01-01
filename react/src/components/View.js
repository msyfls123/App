import React, { Component, PropTypes } from 'react';
import { Router, Route, hashHistory, Link, IndexLink } from 'react-router';

export default class View extends Component{
  render() {
    return <div>
      {this.props.children}
      <ul role="nav">
        <IndexLink to="/" activeClassName="active">
          Home
        </IndexLink>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/repos">Repos</Link></li>
      </ul>
    </div>
  }
}
