import React, { Component } from "react";
import { Card, Grid, Button } from "semantic-ui-react";
import Layout from "../../components/layout";
import Campaign from "../../ethereum/campaign";
import web3 from "../../ethereum/web3";
import ContributeForm from "../../components/contributeForm";
import { Link } from "../../routes";

class CampaignShow extends Component {
  static async getInitialProps(props) {
    const campaign = Campaign(props.query.address);
    const summary = await campaign.methods.getSummary().call();

    return {
      address: props.query.address,
      patient: summary[0],
      hospital: summary[1],
      hospitalAddress: summary[2],
      balance: summary[3],
      maximumLimit: summary[4],
      requestsCount: summary[5],
      approversCount: summary[6],
      manager: summary[7]
    };
  }

  renderCards() {
    const {
      balance,
      manager,
      maximumLimit,
      requestsCount,
      approversCount,
      patient,
      hospital,
      hospitalAddress
    } = this.props;

    const items = [
      {
        header: patient,
        meta: "Name of the Patient",
        style: { overflowWrap: "break-word" },
        color: "red"
      },
      {
        header: hospital,
        meta: "Hospital where the Patient is treated.",
        style: { overflowWrap: "break-word" },
        color: "red"
      },
      {
        header: hospitalAddress,
        meta: "Address of Hospital",
        description: "The address to which the withrawal of the money is done.",
        style: { overflowWrap: "break-word" },
        color: "red"
      },
      {
        header: web3.utils.fromWei(maximumLimit, "ether"),
        meta: "Maximum Amount to be raised (Ether)",
        description:
          "The amount needed for the treatment of " +
          patient +
          " as per the information from the hospital.",
        color: "red"
      },
      {
        header: requestsCount,
        meta: "Number of Withdraw Requests",
        description:
          "A request tries to withdraw money from the contract. Requests must be approved bt approvers.",
        color: "red"
      },
      {
        header: approversCount,
        meta: "Number of Approvers",
        description:
          "Number of people who have already donated to this campaign.",
        color: "red"
      },
      {
        header: manager,
        meta: "Address of Manager",
        description:
          "The manager created this DonateCrypto campaign and can create requests to withdraw money.",
        style: { overflowWrap: "break-word" },
        color: "red"
      },
      {
        header: web3.utils.fromWei(balance, "ether"),
        meta: "Campaign Balance (ether)",
        description:
          "The balance is how much money this campaign has raised till now.",
        color: "red"
      }
    ];

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <h3>Campaign Show</h3>

        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>{this.renderCards()}</Grid.Column>
            <Grid.Column width={6}>
              <ContributeForm address={this.props.address} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Link route={`/campaigns/${this.props.address}/requests`}>
                <a>
                  <Button primary> View Withdrawal Requests</Button>
                </a>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default CampaignShow;
