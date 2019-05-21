import React, { Component } from "react";
import Layout from "../../components/layout";
import { Form, Button, Input, Message } from "semantic-ui-react";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import { Router } from "../../routes";

class CampaignNew extends Component {
  state = {
    maximumLimit: "",
    patient: "",
    hospital: "",
    hospitalAddress: "",
    errorMessage: "",
    loading: false
  };

  onSubmit = async event => {
    event.preventDefault();
    this.setState({ loading: true, errorMessage: "" });
    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods
        .createCampaign(
          this.state.patient,
          this.state.hospital,
          this.state.hospitalAddress,
          this.state.maximumLimit
        )
        .send({
          from: accounts[0]
        });

      Router.pushRoute("/");
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false });
  };

  render() {
    return (
      <Layout>
        <h1>Create a Campaign </h1>

        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Patient Name</label>
            <Input
              required
              value={this.state.patient}
              onChange={event => this.setState({ patient: event.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <label>Hospital</label>
            <Input
              required
              value={this.state.hospital}
              onChange={event =>
                this.setState({ hospital: event.target.value })
              }
            />
          </Form.Field>
          <Form.Field>
            <label>Hospital Wallet Address</label>
            <Input
              required
              value={this.state.hospitalAddress}
              onChange={event =>
                this.setState({ hospitalAddress: event.target.value })
              }
            />
          </Form.Field>
          <Form.Field>
            <label>Donation Limit</label>
            <Input
              required
              label="ether"
              labelPosition="right"
              value={this.state.maximumLimit}
              onChange={event =>
                this.setState({ maximumLimit: event.target.value })
              }
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

export default CampaignNew;
