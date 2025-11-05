import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input, Spinner } from "reactstrap";
import Swal from "sweetalert2";
import { createTransaction } from "../../../../api/TransactionService";
import { userinfodetails } from "../../../../api/UserService"; 
import { toast, Slide } from "react-toastify";
const TransactionForm = ({ userId }) => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fromAccountBalance, setFromAccountBalance] = useState(0);
  const [formData, setFormData] = useState({
    fromAccount: "",
    toAccount: "",
    amount: "",
    description: "",
    transactionType: "Transfer", 
    Status: "Pending"
  });

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        if (!userId) {
          Swal.fire("Error", "User ID is missing", "error");
          setLoading(false);
          return;
        }

        const data = await userinfodetails(userId);
        const { accounts } = data;
        setAccounts(accounts || []);
      } catch (error) {
        console.error("Error loading accounts:", error);
        Swal.fire("Error", "Failed to load accounts", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, [userId]);

  let lastToastId = null;

 const handleChange = (e) => {
  const { name, value } = e.target; 

  setFormData((prev) => {
    const updatedForm = { ...prev, [name]: value };

    if (name === "fromAccount") {
      debugger;
      const selectedAccount = accounts.find(
        (acc) =>   acc.id === value
      );
      if (selectedAccount) {        
        setFromAccountBalance(selectedAccount.balance);

        if (!lastToastId) {
          lastToastId = toast.info(
            `Balance: ₹${selectedAccount.balance.toLocaleString()}`,
            {
              transition: Slide,
              closeButton: true,
              autoClose: 3000,
              position: "bottom-right",
              onClose: () => (lastToastId = null),
            }
          );
        }
      }
    }

    if (name === "toAccount") {
      const selectedAccount = accounts.find(
        (acc) => acc.id === value
      );
    }
console.log("Updated form:", updatedForm);

    return updatedForm;
  });
};








const handleSubmit = async (e) => {
  e.preventDefault();
  const { fromAccount, toAccount, amount, description } = formData;

  if (!fromAccount || !toAccount) {
    Swal.fire("Error", "Please select both From and To accounts", "error");
    return;
  }

  if (fromAccount === toAccount) {
    Swal.fire("Error", "From and To accounts cannot be the same", "error");
    return;
  }

  const amt = parseFloat(amount);
  if (!amt || amt <= 0) {
    Swal.fire("Error", "Please enter a valid amount", "error");
    return;
  }

  if (amt > fromAccountBalance) {
    Swal.fire("Error", "Amount exceeds available balance", "error");
    return;
  }
debugger
  const transactions = [
    {
      accountId: fromAccount,
      amount: amt,
      description: description || `Transfer to ${toAccount}`,
      transactionType: "Debit",
    },
    {
      accountId: toAccount,
      amount: amt,
      description: description || `Transfer from ${fromAccount}`,
      transactionType: "Credit",
    },
  ];

  const result = await createTransaction({ transactions });

  Swal.fire("Success", "Double-entry transaction completed successfully!", "success");

  // Reset form
  setFormData({
    fromAccount: "",
    toAccount: "",
    amount: "",
    description: "",
    transactionType: "Transfer",
  });
};



  return (
    <div className="border rounded p-4 mt-3">
      <h5>Create Transaction</h5>

      {loading ? (
        <div className="text-center p-3">
          <Spinner color="primary" />
          <p>Loading accounts...</p>
        </div>
      ) : (
        <Form onSubmit={handleSubmit}>
          {/* ✅ From Account */}
          <FormGroup>
            <Label>From Account</Label>
            <Input
              type="select"
              name="fromAccount"
              value={formData.fromAccount}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Account --</option>
              {accounts.filter((acc) => acc.accountType === "Savings" || acc.accountType === "Current")
.map((acc) => (
               <option key={acc.id} value={acc.id}>
  {acc.accountNumber} ({acc.accountType}) / ({acc.branchName})
</option>

              ))}
            </Input>
          </FormGroup>

          {/* ✅ To Account */}
          <FormGroup>
            <Label>To Account</Label>
            <Input
              type="select"
              name="toAccount"
              value={formData.toAccount}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Account --</option>
              {accounts      .filter((acc) => acc.accountType === "Loan" )
.map((acc) => (
              <option key={acc.id} value={acc.id}>
  {acc.accountNumber} ({acc.accountType}) / ({acc.branchName})
</option>

              ))}
            </Input>
          </FormGroup>

          {/* ✅ Amount */}
          <FormGroup>
            <Label>Amount</Label>
            <Input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Enter amount"
              required
            />
          </FormGroup>

          {/* ✅ Description */}
          <FormGroup>
            <Label>Description</Label>
            <Input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Transaction details"
            />
          </FormGroup>

          {/* ✅ Transaction Type */}
          <FormGroup>
            <Label>Transaction Type</Label>
            <Input
              type="select"
              name="transactionType"
              value={formData.transactionType}
              onChange={handleChange}
              disabled // Always Transfer for this case
            >
              <option value="Transfer">Transfer</option>
            </Input>
          </FormGroup>

           

          <Button color="primary" type="submit">
            Create Transaction
          </Button>
        </Form>
      )}
    </div>
  );
};

export default TransactionForm;
