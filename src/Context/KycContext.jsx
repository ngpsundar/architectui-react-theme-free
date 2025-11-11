import React, { createContext, useState, useContext } from "react";

const KycContext = createContext();

export const useKyc = () => useContext(KycContext);

export const KycProvider = ({ children }) => {
  const [kycStatus, setKycStatus] = useState([
    { id: 1, type: "Profile Picture", key: "profilePic", status: "Pending" },
    { id: 2, type: "Address Proof", key: "addressProof", status: "Pending" },
    { id: 3, type: "PAN Card", key: "panCard", status: "Pending" },
    { id: 4, type: "Aadhar Card", key: "aadharCard", status: "Pending" },
    { id: 5, type: "Mobile No", key: "mobile", status: "Pending" },
    { id: 6, type: "Email ID", key: "email", status: "Pending" },
    { id: 7, type: "Video KYC", key: "videoKyc", status: "Pending" },
  ]);

  const updateStatus = (key, newStatus) => {
    setKycStatus((prev) =>
      prev.map((item) =>
        item.key === key ? { ...item, status: newStatus } : item
      )
    );
  };

  return (
    <KycContext.Provider value={{ kycStatus, updateStatus }}>
      {children}
    </KycContext.Provider>
  );
};
