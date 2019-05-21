import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0xa6019547d1AEC50A5aB3543Abe76D1be2D9DD719"
);

export default instance;
