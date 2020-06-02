import React from 'react';
import PropTypes from 'prop-types';
import './App.css';

const MESSAGE_TYPES = [
  'received',
  'processing',
  'shipping',
  'delivered',
  'post-delivery'
];

export default class Templates extends React.Component {
  static propTypes = {
    items: PropTypes.array,
    selectedIdx: PropTypes.number,
    clickHandler: PropTypes.func
  };

  handleClick = () => {
    this.props.clickHandler(this.props.items[0]);
  };

  render() {
    return (
      <div className="container">
        <div className="header">
          Templates
          <div className="display-container">
            <button onClick={this.handleClick}>+</button>
          </div>
        </div>
        <div className="items">
          {' '}
          {this.props.items.map((i) => (
            <div key={i.pk}>{i.body}</div>
          ))}
        </div>
      </div>
    );
  }
}
