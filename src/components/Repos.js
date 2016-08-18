import React, { Component, PropTypes } from 'react';
import { Router, Route, hashHistory, Link, IndexLink } from 'react-router';

export default class Repos extends Component{
  render() {
    return <div>
      Hello Repos!
      <p>{this.props.params.name}</p>
    </div>
  }
}
