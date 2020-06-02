import React from 'react';
import PropTypes from 'prop-types';
import './App.css';

export default class Products extends React.Component {
  static propTypes = {
    items: PropTypes.array,
    selectedIdx: PropTypes.number,
    clickHandler: PropTypes.func
  };

  handleClick = (index) => {
    const selectedItem = this.state.data[index];
    console.log('selected', selectedItem);
    //  this.props.clickHandler(this.props.items[0]);
  };

  render() {
    return (
      <div className="container">
        <div className="header">
          Products
          <div className="display-container">
            <button onClick={this.handleClick}>+</button>
          </div>
        </div>
        <div>
          <span className="item">Name</span>
          <span className="item">Price</span>
          <span className="item">Description</span>
        </div>
        <div className="items">
          {this.props.items.map((i) => (
            <div key={i.pk}>
              <span className="item">{i.name}</span>
              <span className="item">{i.price}</span>
              <span className="item">{i.description}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
