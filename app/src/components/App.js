import React from 'react';
import axios from 'axios';
import ReactModal from 'react-modal';

import './App.css';
import Products from './Products';
import Templates from './Templates';
import Messages from './Messages';

const SERVER_HOST = 'localhost';
const SERVER_PORT = '5000';

export default class App extends React.Component {
  /*
    Presentation class to view and send sms notification messages 
  */
  constructor() {
    super();
    this.state = {
      products: [],
      selectedProductIdx: null,
      templates: [],
      selectedTemplateIdx: null,
      messages: [],
      selectedMessageIdx: null,
      version: '1.0',
      showModal: false
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleVersionChange = this.handleVersionChange.bind(this);
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  handleVersionChange(event) {
    this.setState({ version: event.target.value });
  }

  addProduct = (name, price, description) => {
    console.log('add product', name, price, description);
    this.callPost('products', { name, price, description });
    this.callGet('products');
  };

  selectProduct = (idx) => {
    this.setState({ selectedProductIdx: idx });
  };

  addTemplate = (body, messageType) => {
    console.log('add template', body, messageType);
    this.callPost('templates', { body, message_type: messageType });
    this.callGet('templates');
  };

  selectTemplate = (idx) => {
    this.setState({ selectedTemplateIdx: idx });
  };

  addMessage = () => {
    const data = {
      version: this.state.version,
      product_id: this.state.selectedProductIdx,
      template_id: this.state.selectedTemplateIdx
    };
    console.log('add message', data);
    this.callPost('messages', data);
    this.callGet('messages');
  };

  selectMessage = (idx) => {
    this.setState({ selectedMessageIdx: idx });
  };

  handleSendSms = (phone) => {
    console.log('send sms', phone, this.state.selectedMessageIdx);
    this.callPost('sms', { phone, message_id: this.state.selectedMessageIdx });
  };

  callPost(service, data) {
    axios
      .post(`http://${SERVER_HOST}:${SERVER_PORT}/${service}`, { ...data })
      .then((res) => {
        console.log('POST response', service, res.data);
      })
      .catch((err) => console.log(err));
  }

  callGet(service) {
    axios.get(`http://${SERVER_HOST}:${SERVER_PORT}/${service}`).then((res) => {
      console.log('GET response', service, res.data);
      this.setState(res.data);
    });
  }

  componentDidMount() {
    ['products', 'templates', 'messages'].forEach((i) => this.callGet(i));
  }

  render() {
    const isEnabled =
      this.state.selectedProductIdx != null &&
      this.state.selectedTemplateIdx != null;

    return (
      <div className="App-header">
        <div className="display-container">
          <Products
            items={this.state.products}
            selectedIdx={this.state.selectedProductIdx}
            addHandler={this.addProduct}
            selectHandler={this.selectProduct}
          />
          <Templates
            items={this.state.templates}
            selectedIdx={this.state.selectedTemplateIdx}
            addHandler={this.addTemplate}
            selectHandler={this.selectTemplate}
          />
        </div>
        <div className="create-message-container">
          <button disabled={!isEnabled} onClick={this.handleOpenModal}>
            Create Message
          </button>
        </div>
        <div>
          <Messages
            items={this.state.messages}
            selectedIdx={this.state.selectedMessageIdx}
            clickHandler={this.handleSendSms}
            selectHandler={this.selectMessage}
          />
        </div>
        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="product modal add"
        >
          <form className="container" onSubmit={this.addMessage}>
            <label>
              version
              <input
                type="text"
                value={this.state.version}
                onChange={this.handleVersionChange}
              />
            </label>
            <input type="submit" value="Create New Message" />
          </form>
          <button onClick={this.handleCloseModal}>Close Modal</button>
        </ReactModal>
      </div>
    );
  }
}
