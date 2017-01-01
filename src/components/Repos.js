import React, { Component, PropTypes } from 'react';
import { Router, Route, hashHistory, Link, IndexLink } from 'react-router';

export default class Repos extends Component{
  onClick(e) {
    hashHistory.push('/')
  }

  render() {
    return <div>
      Hello Repos!
      <p>{this.props.params.name}</p>
      <button onClick={this.onClick}> "Back" </button>
    </div>

  }
}
