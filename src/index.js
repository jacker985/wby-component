import React from "react";
import ReactDOM from "react-dom";
import { Form, Input, Select, Button } from "antd";
import "antd/dist/antd.css";
import "./styles.css";

import { PriceInput } from "./Component";
class Demo extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    console.log("000011");
    this.props.form.validateFields((err, values) => {
      console.log(err);
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  checkPrice = (rule, value, callback) => {
    if (value.number > 0) {
      callback();
      return;
    }

    callback("Price must greater than zero!");
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <Form.Item label="Price">
          {getFieldDecorator("price", {
            initialValue: { number: 0, currency: "rmb" },
            rules: [{ validator: this.checkPrice }]
          })(<PriceInput />)}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedDemo = Form.create({ name: "customized_form_controls" })(Demo);
function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <WrappedDemo />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
