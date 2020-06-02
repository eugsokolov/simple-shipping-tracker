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
    addHandler: PropTypes.func,
    selectHandler: PropTypes.func
  };

  handleClick = () => {
    console.log('click add template');
    // TODO MODAL FOR ADD, check message_type
    //  this.props.addHandler(body, messageType);
  };

  itemClick = (idx) => {
    console.log('clicked template idx', idx);
    this.props.selectHandler(idx);
  };

  render() {
    return (
      <div className="container">
        <div className="header">
          Templates
          <div className="display-container">
            <button onClick={this.addClick}>+</button>
          </div>
        </div>
        <table>
          <thead className="header-small">
            <tr>
              <th>ID</th>
              <th>Type</th>
              <th>Body</th>
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
                <td>{i.message_type}</td>
                <td>{i.body}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
