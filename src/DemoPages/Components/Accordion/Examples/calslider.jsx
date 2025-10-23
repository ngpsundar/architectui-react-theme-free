import React, { useState } from "react";
import Swal from "sweetalert2";

const formulas = [
  {
    name: "INTEREST",
    rate: 7.5,
    calculateEMI: (principal, rate, years) => {
      const monthlyRate = rate / 12 / 100;
      const months = years * 12;
      return (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    },
  },
  {
    name: "CARLOAN",
    rate: 8.5,
    calculateEMI: (principal, rate, years) => {
      const monthlyRate = rate / 12 / 100;
      const months = years * 12;
      return (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    },
  },
  {
    name: "HOUSELOAN",
    rate: 6.75,
    calculateEMI: (principal, rate, years) => {
      const monthlyRate = rate / 12 / 100;
      const months = years * 12;
      return (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    },
  },
];

const CalculatorSlider = ({ typeIndex }) => {
  const formula = formulas[typeIndex];
  const [amount, setAmount] = useState(100000);
  const [tenure, setTenure] = useState(1);
  const [monthlyEMI, setMonthlyEMI] = useState(null);
  const [calculated, setCalculated] = useState(false);

  const handleCalculate = () => {
    const emi = formula.calculateEMI(amount, formula.rate, tenure);
    setMonthlyEMI(emi);
    setCalculated(true);
  };

  const handleViewBreakup = () => {
    const totalMonths = tenure * 12;
    const tableRows = [];
    let remainingPrincipal = amount;

    for (let month = 1; month <= totalMonths; month++) {
      const interest = remainingPrincipal * (formula.rate / 12 / 100);
      const principalPaid = monthlyEMI - interest;
      remainingPrincipal -= principalPaid;

      tableRows.push({
        Month: month,
        EMI: monthlyEMI.toFixed(2),
        PrincipalPaid: principalPaid.toFixed(2),
        InterestPaid: interest.toFixed(2),
        RemainingPrincipal: remainingPrincipal > 0 ? remainingPrincipal.toFixed(2) : 0,
      });
    }

    let htmlTable = `<table border="1" style="width:100%; border-collapse:collapse; text-align:center;">
      <thead>
        <tr>
          <th>Month</th><th>EMI</th><th>Principal Paid</th><th>Interest Paid</th><th>Remaining Principal</th>
        </tr>
      </thead>
      <tbody>`;

    tableRows.forEach((row) => {
      htmlTable += `<tr>
        <td>${row.Month}</td>
        <td>${row.EMI}</td>
        <td>${row.PrincipalPaid}</td>
        <td>${row.InterestPaid}</td>
        <td>${row.RemainingPrincipal}</td>
      </tr>`;
    });

    htmlTable += `</tbody></table>`;

    Swal.fire({
      title: `${formula.name} Loan Breakup`,
      html: `<div style="max-height:400px; overflow:auto">${htmlTable}</div>`,
      width: 800,
      showCloseButton: true,
      confirmButtonText: "Close",
    });
  };

  return (
    <div>
      <h5>{formula.name} Calculator</h5>

      <div className="mb-3">
        <label>Amount: {amount.toLocaleString()}</label>
        <input
          type="range"
          min={100000}
          max={45000000}
          step={1000}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="form-range"
        />
        <input type="text" value={amount.toLocaleString()} readOnly className="form-control mt-1" />
      </div>

      <div className="mb-3">
        <label>Tenure (Years): {tenure}</label>
        <input
          type="range"
          min={1}
          max={27}
          step={1}
          value={tenure}
          onChange={(e) => setTenure(e.target.value)}
          className="form-range"
        />
        <input type="text" value={tenure} readOnly className="form-control mt-1" />
      </div>

      <div className="mb-3">
        <label>Rate (%):</label>
        <input type="text" value={formula.rate} readOnly className="form-control" />
      </div>

      <div className="d-flex gap-2">
        <button className="btn btn-primary" onClick={handleCalculate}>
          Calculate
        </button>

        {calculated && (
          <button className="btn btn-success" onClick={handleViewBreakup}>
            View Breakup
          </button>
        )}
      </div>

      {calculated && monthlyEMI && (
        <p className="mt-2">
          Monthly EMI: {monthlyEMI.toLocaleString(undefined, { maximumFractionDigits: 2 })}
        </p>
      )}
    </div>
  );
};

export default CalculatorSlider; 
