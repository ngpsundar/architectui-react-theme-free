import React from "react";
import Swal from "sweetalert2";
import { Button } from "reactstrap";
import { getLast5Transactions } from "../../../../api/TransactionService";  
export const handleViewTransactions = async (accountId) => {
  try {
    if (!accountId) {
      Swal.fire("Error", "Invalid account ID", "error");
      return;
    }

    Swal.fire({
      title: "Fetching Transactions...",
      text: "Please wait while we load recent activity.",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    const data = await getLast5Transactions(accountId);
    Swal.close();

    if (!data?.latestTransactions?.length) {
      Swal.fire("No Data", "No recent transactions found.", "info");
      return;
    }

    const tableRows = data.latestTransactions
      .map(
        (t, i) => `
          <tr>
            <td>${i + 1}</td>
            <td>${t.transactionId || "-"}</td>
            <td>${t.transactionType || "-"}</td>
            <td>₹${t.amount?.toLocaleString() || 0}</td>
            <td>${ t.createdDate}</td>
          </tr>`
      )
      .join("");

    Swal.fire({
      title: `<strong>Last 5 Transactions</strong>`,
      html: `
        <table border="1" width="100%" style="border-collapse: collapse;">
          <thead>
            <tr style="background-color:#f2f2f2;">
              <th>#</th><th>Transaction ID</th><th>Type</th><th>Amount</th><th>Date</th>
            </tr>
          </thead>
          <tbody>${tableRows}</tbody>
        </table>
      `,
      showCloseButton: true,
      confirmButtonText: "Close",
      width: "600px",
    });
  } catch (error) {
    Swal.close();
    console.error("Error showing transactions:", error);
    Swal.fire("Error", error.message || "Failed to load transactions", "error");
  }
};
