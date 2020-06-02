import React from 'react';
import PropTypes from 'prop-types';
import './shared.css';

export default class Products extends React.Component {
  static propTypes = {
    items: PropTypes.array,
    selectedIdx: PropTypes.number,
    addHandler: PropTypes.func,
    selectHandler: PropTypes.func
  };

  addClick = () => {
    console.log('click add product');
    // TODO MODAL FOR ADD
    //  this.props.addHandler(name, price, description);
  };

  itemClick = (idx) => {
    console.log('clicked product idx', idx);
    this.props.selectHandler(idx);
  };

  render() {
    return (
      <div className="container">
        <div className="header">
          Products
          <div className="display-container">
            <button onClick={this.addClick}>+</button>
          </div>
        </div>
        <table>
          <thead className="header-small">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody className="items">
            {this.props.items.map((i) => (
              <tr
                className={i.pk === this.props.selectedIdx ? 'selected' : ''}
                onClick={() => this.itemClick(i.pk)}
                key={i.pk}
              >
                <td>{i.pk}</td>
                <td>{i.name}</td>
                <td>{i.price}</td>
                <td>{i.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
