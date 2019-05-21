import React, { Component } from "react";
import { Form, Input, Message, Button } from "semantic-ui-react";
import Campaign from "../ethereum/campaign";
import web3 from "../ethereum/web3";
import { Router } from "../routes";

class ContributeForm extends Component {
  state = {
    value: "",
    errorMessage: "",
    loading: false
  };

  onSubmit = async event => {
    event.preventDefault();
    this.setState({ loading: true, errorMessage: "" });

    const campaign = Campaign(this.props.address);

    this.setState({ loading: true });

    try {
      const accounts = await web3.eth.getAccounts();
      console.log(web3.utils.toWei(this.state.value, "ether"));
      await campaign.methods.donate().send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.value, "ether")
      });

      //Refresh the component with updated data
      Router.replaceRoute(`/campaigns/${this.props.address}`);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false, value: "" });
  };

  render() {
    return (
      <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
        <Form.Field>
          <label>Donate to the Campaign</label>
          <Input
            value={this.state.value}
            onChange={event => this.setState({ value: event.target.value })}
            label="ether"
            labelPosition="right"
            required
          />
        </Form.Field>
        <Message error header="Oops!" content={this.state.errorMessage} />

        <Button loading={this.state.loading} primary>
          Donate!
        </Button>
      </Form>
    );
  }
}

export default ContributeForm;
