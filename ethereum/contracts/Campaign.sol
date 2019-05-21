pragma solidity ^0.4.25;

contract CampaignFactory {
    address[] public deployedCampaigns;

    function createCampaign(string patient, string hospital, address hospitalAddress, uint maxLimit) public {
        address newCampaign = new Campaign(patient, hospital, hospitalAddress, maxLimit, msg.sender);
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns (address[]) {
        return deployedCampaigns;
    }
}

contract Campaign {
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }

    Request[] public requests;

    address public manager;
    uint public maximumLimit;
    string public patient;
    string public hospital;
    address public hospitalAddress;

    mapping(address => bool) public approvers;
    uint public approversCount;


    modifier isManager() {
        require(msg.sender == manager);
        _;
    }

    function Campaign(string _patient, string _hospital, address _hospitalAddress, uint _maxLimit, address _creator) {
		require(_creator != _hospitalAddress);

        manager = _creator;
        maximumLimit = _maxLimit * 1000000000000000000;
        patient = _patient;
        hospital = _hospital;
        hospitalAddress = _hospitalAddress;
    }

    function donate() public payable {
        require (this.balance < (maximumLimit));

        approvers[msg.sender] = true;
        approversCount++;
    }

    function createWithdrawalRequest(string description, uint value) public isManager {

		require (this.balance >= value);

        Request memory newRequest = Request({
          description: description,
          value: value,
          recipient: hospitalAddress,
          complete: false,
          approvalCount:0
        });

        requests.push(newRequest);
    }

    function approveRequest(uint index) public {
        Request storage request = requests[index];

        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);

        request.approvals[msg.sender] = true;
        request.approvalCount++;

    }

    function finalizeRequest(uint index) public isManager {
        Request storage request = requests[index];

        require(request.approvalCount > (approversCount/2));
        require(!request.complete);

        request.recipient.transfer(request.value);
        request.complete = true;

    }

    function getSummary() public view returns (
		string, string, address, uint, uint, uint, uint, address
		) {
		return (
		    patient,
		    hospital,
		    hospitalAddress,
		    this.balance,
			maximumLimit,
			requests.length,
			approversCount,
			manager
		);
	}

	function getRequestsCount() public view returns (uint) {
		return requests.length;
	}
}
