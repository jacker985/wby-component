import React from "react";

import { Form, Input, InputNumber, Select, Button } from "antd";

const { Option } = Select;
let id = 0;
export class PriceInput extends React.Component {
  static getDerivedStateFromProps(nextProps) {
    // Should be a controlled component.
    if ("value" in nextProps) {
      return {
        ...(nextProps.value || {})
      };
    }
    return null;
  }

  constructor(props) {
    super(props);

    const value = props.value || {};
    this.state = {
      number: value.number || 0,
      currency: value.currency || "rmb",
      rebateNumbers: [0, 9999],
      percentage: []
    };
  }
  addRule = index => {
    const _rebateNumbers = [...this.state.rebateNumbers];
    _rebateNumbers.splice(index, 0, _rebateNumbers[index]);
    this.setState({
      rebateNumbers: _rebateNumbers
    });
    this.triggerChange({ rebateNumbers: _rebateNumbers });
  };
  delRule = index => {
    const { rebateNumbers } = this.state;
    const _rebateNumbers = [
      ...rebateNumbers.slice(0, index),
      ...rebateNumbers.slice(index + 1)
    ];
    console.log(index, rebateNumbers, "-=");
    this.setState({
      rebateNumbers: _rebateNumbers
    });
    this.triggerChange({ rebateNumbers: _rebateNumbers });
  };

  handleNumberChange = e => {
    const number = parseInt(e.target.value || 0, 10);
    if (isNaN(number)) {
      return;
    }
    if (!("value" in this.props)) {
      this.setState({ number });
    }
    this.triggerChange({ number });
  };

  handleCurrencyChange = currency => {
    if (!("value" in this.props)) {
      this.setState({ currency });
    }
    this.triggerChange({ currency });
  };
  handleRatioChange = (e, index) => {
    const rebateNumbers = [...this.state.rebateNumbers];
    const number = parseInt(e.target.value || 0, 10);
    if (isNaN(number)) {
      return;
    }
    rebateNumbers[index] = number;
    console.log("rebateNumbers", rebateNumbers);

    if (!("value" in this.props)) {
      this.setState({ rebateNumbers });
      console.log("=======", rebateNumbers);
    }
    this.triggerChange({ rebateNumbers });
  };
  handlePercentageChange = (e, index) => {
    const { percentage } = this.state;
    const number = parseInt(e.target.value || 0, 10);
    console.log(number);
    percentage[index] = number;
    if (!("value" in this.props)) {
      this.setState({ percentage });
      console.log("=======", percentage);
    }
    console.log("=======", percentage, index);
    this.triggerChange({ percentage: [...percentage] });
  };

  triggerChange = changedValue => {
    // Should provide an event to pass value to Form.
    const { onChange } = this.props;
    if (onChange) {
      onChange({
        ...this.state,
        ...changedValue
      });
    }
  };

  render() {
    const { size } = this.props;
    const { currency, number, rebateNumbers, percentage } = this.state;
    return (
      <span>
        <InputNumber
          max={100}
          size={size}
          value={number}
          onChange={this.handleNumberChange}
          style={{ width: "65%", marginRight: "3%" }}
        />
        <Select
          value={currency}
          size={size}
          style={{ width: "32%" }}
          onChange={this.handleCurrencyChange}
        >
          <Option value="rmb">RMB</Option>
          <Option value="dollar">Dollar</Option>
        </Select>
        <ul>
          {rebateNumbers.slice(1).map((item, index) => (
            <li key={index}>
              大于<span className="rule-number">{rebateNumbers[index]}</span>
              且小于等于
              <span className="rule-input">
                <Input
                  type="text"
                  onChange={e => this.handleRatioChange(e, index + 1)}
                  value={item}
                />
              </span>
              时,返点比例为：
              {/* <span className="rule-number">{item}</span> */}
              <span className="rule-input">
                <Input
                  type="text"
                  onChange={e => this.handlePercentageChange(e, index)}
                  value={percentage[index]}
                />
              </span>
              <Button type="link" onClick={() => this.addRule(index + 1)}>
                添加
              </Button>
              <Button type="link" onClick={() => this.delRule(index)}>
                删除
              </Button>
            </li>
          ))}
        </ul>
      </span>
    );
  }
}
