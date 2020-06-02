import React from 'react';
import axios from 'axios';

import './App.css';
import Products from './Products';
import Templates from './Templates';
import Messages from './Messages';

export default class App extends React.Component {
  state = {
    products: [],
    selectedProductIdx: null,
    templates: [],
    selectedTemplateIdx: null,
    messages: [],
    selectedMessageIdx: null
  };

  addProduct = (name, price, description) => {
    console.log('add product', name, price, description);
    this.callPost('products', { name, price, description });
    this.callGet('products');
  };

  addTemplate = (body, message_type) => {
    console.log('add template', body, message_type);
    this.callPost('templates', { body, message_type });
    this.callGet('templates');
  };

  addMessage = (version) => {
    const data = {
      version,
      product_id: this.state.selectedProductIdx,
      template_id: this.state.selectedTemplateIdx
    };
    console.log('add message', data);
    this.callPost('messages', data);
    this.callGet('messages');
  };

  handleSendSms = (phone) => {
    console.log('send sms', phone, this.state.selectedMessageIdx);
    this.callPost('sms', { phone, message_id: this.state.selectedMessageIdx });
  };

  callPost(service, data) {
    axios
      .post(`http://localhost:5000/${service}`, { data })
      .then((res) => {
        console.log('POST response', service, res.data);
      })
      .catch((err) => console.log(err));
  }

  callGet(service) {
    axios.get(`http://localhost:5000/${service}`).then((res) => {
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
            clickHandler={this.addProduct}
          />
          <Templates
            items={this.state.templates}
            selectedIdx={this.state.selectedTemplateIdx}
            clickHandler={this.addTemplate}
          />
        </div>
        <div className="create-message-container">
          <button disabled={!isEnabled} onClick={this.addMessage}>
            Create Message
          </button>
        </div>
        <div>
          <Messages
            items={this.state.messages}
            selectedIdx={this.state.selectedMessageIdx}
            clickHandler={this.handleSendSms}
          />
        </div>
      </div>
    );
  }
}
