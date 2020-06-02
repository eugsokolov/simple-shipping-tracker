import React from 'react';
import PropTypes from 'prop-types';
import './Messages.css';
import './App.css';

export default class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: '1'
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  static propTypes = {
    items: PropTypes.array,
    selectedIdx: PropTypes.number,
    clickHandler: PropTypes.func
  };

  handleChange(event) {
    this.setState({ number: event.target.number });
  }

  handleClick(event) {
    event.preventDefault();
    this.props.clickHandler(this.props.items[0]);
  }

  render() {
    const isEnabled =
      this.props.selectedIdx != null && this.state.number.length == 10;
    return (
      <div className="message-container">
        <div className="container-left">
          <div className="header">Messages</div>
          <div className="items">
            {' '}
            {this.props.items.map((i) => (
              <div key={i.pk}>{i.version}</div>
            ))}
          </div>
        </div>
        <div className="container-right">
          <form className="container-right" onSubmit={this.handleSubmit}>
            <label>
              Number:
              <input value={this.state.number} onChange={this.handleChange} />
            </label>
            <input disabled={!isEnabled} type="submit" value="Send SMS" />
          </form>
        </div>
      </div>
    );
  }
}
