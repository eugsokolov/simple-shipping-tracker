import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import './shared.css';

const MESSAGE_TYPES = [
  'received',
  'processing',
  'shipping',
  'delivered',
  'post-delivery'
];

export default class Templates extends React.Component {
  /*
    Presentation class for viewing Templates 
  */
  constructor() {
    super();
    this.state = {
      showModal: false,
      templateType: 'received',
      body: ''
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.submitAdd = this.submitAdd.bind(this);
    this.handleBodyChange = this.handleBodyChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
  }

  static propTypes = {
    items: PropTypes.array,
    selectedIdx: PropTypes.number,
    addHandler: PropTypes.func,
    selectHandler: PropTypes.func
  };

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  submitAdd = () => {
    this.props.addHandler(this.state.body, this.state.templateType);
  };

  handleBodyChange(event) {
    this.setState({ body: event.target.value });
  }

  handleTypeChange(event) {
    this.setState({ templateType: event.target.value });
  }

  itemClick = (idx) => {
    console.log('clicked template idx', idx);
    this.props.selectHandler(idx);
  };

  render() {
    const isEnabled =
      this.state.body &&
      this.state.templateType &&
      MESSAGE_TYPES.includes(this.state.templateType);
    return (
      <div className="container">
        <div className="header">
          Templates
          <div className="display-container">
            <button onClick={this.handleOpenModal}>+</button>
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
        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="template modal add"
        >
          <form className="container" onSubmit={this.submitAdd}>
            <label>
              template type
              <select onChange={this.handleTypeChange}>
                {MESSAGE_TYPES.map((i) => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
              </select>
            </label>

            <label>
              body
              <input
                type="text"
                value={this.state.body}
                onChange={this.handleBodyChange}
              />
            </label>
            <input
              disabled={!isEnabled}
              type="submit"
              value="Create New Template"
            />
          </form>
          <button onClick={this.handleCloseModal}>Close Modal</button>
        </ReactModal>
      </div>
    );
  }
}
