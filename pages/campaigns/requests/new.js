import React, { Component } from "react";
import { Form, Button, Input, Message } from "semantic-ui-react";
import Campaign from "../../../ethereum/campaign";
import web3 from "../../../ethereum/web3";
import Layout from "../../../components/layout";
import { Link, Router } from "../../../routes";

class RequestNew extends Component {
  state = {
    value: "",
    description: "",
    recipient: "",
    errorMessage: "",
    loading: false
  };

  static async getInitialProps(props) {
    const address = props.query.address;

    return { address };
  }

  onSubmit = async event => {
    event.preventDefault();
    this.setState({ loading: true, errorMessage: "" });

    const campaign = Campaign(this.props.address);

    const { description, value } = this.state;
    try {
      const accounts = await web3.eth.getAccounts();

      await campaign.methods
        .createWithdrawalRequest(description, web3.utils.toWei(value, "ether"))
        .send({
          from: accounts[0]
        });

      Router.pushRoute(`/campaigns/${this.props.address}/requests`);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false });
  };

  render() {
    return (
      <Layout>
        <Link route={`/campaigns/${this.props.address}`}>
          <a>Back</a>
        </Link>
        <h3>Create a Withdrawal Request</h3>
        <small>
          Note: All approved requests will be transferred to the Hospital
          Address.
        </small>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Description about the Withdrawal</label>
            <Input
              value={this.state.description}
              onChange={event =>
                this.setState({ description: event.target.value })
              }
            />
          </Form.Field>

          <Form.Field>
            <label>Amount in Ether</label>
            <Input
              label="ether"
              labelPosition="right"
              value={this.state.value}
              onChange={event => this.setState({ value: event.target.value })}
            />
          </Form.Field>

          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button loading={this.state.loading} primary>
            Create!
          </Button>
        </Form>
      </Layout>
    );
  }
}

export default RequestNew;
