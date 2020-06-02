import React from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';
import './shared.css';

export default class Products extends React.Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
      name: '',
      price: 0,
      description: ''
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.submitAdd = this.submitAdd.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleDescChange = this.handleDescChange.bind(this);
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
    this.props.addHandler(
      this.state.name,
      this.state.price,
      this.state.description
    );
  };

  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }

  handlePriceChange(event) {
    this.setState({ price: event.target.value });
  }

  handleDescChange(event) {
    this.setState({ description: event.target.value });
  }

  itemClick = (idx) => {
    console.log('clicked product idx', idx);
    this.props.selectHandler(idx);
  };

  render() {
    const isEnabled =
      this.state.name && this.state.price && this.state.description;
    return (
      <div className="container">
        <div className="header">
          Products
          <div className="display-container">
            <button onClick={this.handleOpenModal}>+</button>
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
        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="product modal add"
        >
          <form className="container" onSubmit={this.submitAdd}>
            <label>
              name
              <input
                type="text"
                value={this.state.name}
                onChange={this.handleNameChange}
              />
            </label>
            <label>
              price
              <input
                type="text"
                value={this.state.price}
                onChange={this.handlePriceChange}
              />
            </label>
            <label>
              description
              <input
                type="text"
                value={this.state.description}
                onChange={this.handleDescChange}
              />
            </label>
            <input
              disabled={!isEnabled}
              type="submit"
              value="Create New Product"
            />
          </form>
          <button onClick={this.handleCloseModal}>Close Modal</button>
        </ReactModal>
      </div>
    );
  }
}
