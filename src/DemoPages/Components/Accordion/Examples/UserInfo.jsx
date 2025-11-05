import React, { Component } from "react";
import { Card, CardBody, CardHeader, Button, Collapse } from "reactstrap";
import { userinfodetails } from "../../../../api/UserService";  
import { handleViewTransactions } from "./UserTransaction";  
export default class AccountAccordion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accordion: [],
      accounts: [],
      userFullName: "",
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    this.fetchAccounts();
  }

  toggleAccordion = (index) => {
    const updated = this.state.accordion.map((item, i) =>
      i === index ? !item : false
    );
    this.setState({ accordion: updated });
  };

   fetchAccounts = async () => {
    try {
      const { userId } = this.props;
      if (!userId) throw new Error("User ID not provided");

      // Fetch user details
      const data = await userinfodetails(userId);

      const { firstName, lastName, accounts } = data;

      this.setState({
        accounts: accounts || [],
        userFullName: `${firstName} ${lastName}`,
        accordion: (accounts || []).map(() => false),
        loading: false,
      });
    } catch (error) {
      console.error("Error fetching accounts:", error);
      this.setState({
        loading: false,
        error: error.message || "Failed to fetch accounts",
      });
    }
  };

  render() {
    const { accounts, userFullName, accordion, loading, error } = this.state;

    if (loading) return <p>Loading accounts...</p>;
    if (error) return <p className="text-danger">{error}</p>;

    return (
      <div>
        <h4 className="mb-4">
          Accounts for <strong>{userFullName}</strong>
        </h4>

        <div id="accordion" className="accordion-wrapper mb-3">
          {accounts.map((account, index) => (
            <Card key={index}>
              <CardHeader id={`heading${index}`}>
                <Button
                  block
                  color="link"
                  className="text-start m-0 p-0"
                  onClick={() => this.toggleAccordion(index)}
                  aria-expanded={accordion[index]}
                  aria-controls={`collapse${index}`}
                >
                  <h5 className="m-0 p-0">
                    {account.accountType} Account ({account.accountNumber})
                  </h5>
                </Button>
              </CardHeader>

              <Collapse
                isOpen={accordion[index]}
                data-parent="#accordion"
                id={`collapse${index}`}
                aria-labelledby={`heading${index}`}
              >
                <CardBody>
                  <div className="d-flex justify-content-between align-items-center mb-3">
  <div>
    <p className="mb-0"><strong>Branch:</strong> {account.branchName}</p>
  </div>
  <div>
    <p className="mb-0"><strong>IFSC Code:</strong> {account.ifscCode}</p>
  </div>
  <div>
    <p className="mb-0"><strong>Status:</strong> {account.status}</p>
  </div>
  <div>
    <p className="mb-0"><strong>Balance:</strong> ₹{account.balance.toLocaleString()}</p>
  </div>
</div>

         <Button
  className="mb-2 me-2"
  color="primary"
  onClick={() => handleViewTransactions(account.id)}
>
  View Transactions
</Button>
        
                </CardBody>
              </Collapse>
            </Card>
          ))}
        </div>
      </div>
    );
  }
}
