import React from 'react';
import PropTypes from 'prop-types';
import './Messages.css';
import './shared.css';

export default class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: '1'
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  static propTypes = {
    items: PropTypes.array,
    selectedIdx: PropTypes.number,
    clickHandler: PropTypes.func,
    selectHandler: PropTypes.func
  };

  handleChange(event) {
    this.setState({ number: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.clickHandler(this.state.number);
  }

  itemClick = (idx) => {
    console.log('clicked template idx', idx, this.state.number);
    this.props.selectHandler(idx);
  };

  render() {
    const isEnabled =
      this.props.selectedIdx !== null &&
      this.state.number &&
      this.state.number.length === 11;
    return (
      <div className="message-container">
        <div className="container-left">
          <div className="header">Messages</div>
          <table>
            <thead className="header-small">
              <tr>
                <th>Version</th>
                <th>Product Id</th>
                <th>Template Id</th>
              </tr>
            </thead>
            <tbody className="items">
              {this.props.items.map((i) => (
                <tr
                  className={i.pk === this.props.selectedIdx ? 'selected' : ''}
                  onClick={() => this.itemClick(i.pk)}
                  key={i.pk}
                >
                  <td>{i.version}</td>
                  <td>{i.product_id}</td>
                  <td>{i.template_id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="container-right">
          <form className="container-right" onSubmit={this.handleSubmit}>
            <label>
              Number:
              <input
                type="text"
                value={this.state.number}
                onChange={this.handleChange}
              />
            </label>
            <input disabled={!isEnabled} type="submit" value="Send SMS" />
          </form>
        </div>
      </div>
    );
  }
}