import React, { Fragment, useState ,useEffect} from "react";
import { useKyc } from "@/context/KycContext"; // ✅ access global KYC state
import { CSSTransition, TransitionGroup } from "../../../../../utils/TransitionWrapper";
import { updateMobile, updateEmail,userkycdetails } from "../../../../../api/UserService";
import {
  Col,
  Card,
  CardBody,
  CardTitle,
  Button,
  Container,
  Table,
  Input,
  Badge,
} from "reactstrap";
import axios from "axios";

const Formkycgrid = () => {
  const { kycStatus } = useKyc(); // remove updateStatus if not needed
  const [fileInputs, setFileInputs] = useState({});
  const [textInputs, setTextInputs] = useState({});
  const [statusMessage, setStatusMessage] = useState("");
  const [kycRows, setKycRows] = useState([]);
  const userId = "68e3eb83f907b7ba39e40c84";

  // Handle text input changes
  const handleTextChange = (key, value) => {
    setTextInputs((prev) => ({ ...prev, [key]: value }));
  };

  // Handle file selection
  const handleFileChange = (key, file) => {
    setFileInputs((prev) => ({ ...prev, [key]: file }));
  };

  // Fetch KYC details and update table
  const refreshKycStatus = async () => {
    try {
      const res = await userkycdetails(userId);
      const data = res.kycDetails && res.kycDetails.length > 0 ? res.kycDetails[0] : null;

      if (data) {
        const updatedRows = kycStatus.map((item) => ({
          ...item,
          status: data[item.key] === 1 ? "Completed" : "Pending",
        }));
        setKycRows(updatedRows);
      } else {
        setKycRows(kycStatus.map((item) => ({ ...item, status: "Pending" })));
      }
    } catch (err) {
      console.error("Failed to refresh KYC details:", err);
      setKycRows(kycStatus.map((item) => ({ ...item, status: "Pending" })));
    }
  };

  // Initial fetch
  useEffect(() => {
    refreshKycStatus();
  }, [userId]);

  // Handle action (text update or file upload)
  const handleAction = async (item) => {
    try {
      if (item.key === "mobile") {
        await updateMobile(userId, textInputs[item.key]);
        setStatusMessage("✅ Mobile updated successfully!");
      } else if (item.key === "email") {
        await updateEmail(userId, textInputs[item.key]);
        setStatusMessage("✅ Email updated successfully!");
      } else {
        const formData = new FormData();
        formData.append("file", fileInputs[item.key]);
        formData.append("userId", userId);
        formData.append("type", item.key);

        await axios.post(`https://localhost:5005/api/v1/Kyc/upload`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        setStatusMessage(`✅ ${item.type} uploaded successfully!`);
      }

      // Refresh KYC status after every update
      await refreshKycStatus();
    } catch (err) {
      console.error(err);
      setStatusMessage(`❌ ${item.type} action failed. Try again.`);
    }
  };

  return (
    <Fragment>
      <TransitionGroup>
        <CSSTransition component="div" classNames="TabsAnimation" appear={true} timeout={0} enter={false} exit={false}>
          <Container fluid>
            <Card className="main-card mb-3">
              <CardBody>
                <CardTitle tag="h5">KYC Documents for Users</CardTitle>

                <Table bordered hover responsive>
                  <thead>
                    <tr>
                      <th style={{ width: "60px" }}>S.No</th>
                      <th>Type</th>
                      <th>Action</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {kycRows.map((item, index) => {
                      const isCompleted = item.status === "Completed";
                      return (
                        <tr key={item.key}>
                          <td>{index + 1}</td>
                          <td>{item.type}</td>
                          <td>
                            {["mobile", "email"].includes(item.key) ? (
                              <div className="d-flex align-items-center">
                                <Input
                                  type={item.key === "email" ? "email" : "text"}
                                  placeholder={`Enter ${item.type}`}
                                  value={textInputs[item.key] || ""}
                                  onChange={(e) => handleTextChange(item.key, e.target.value)}
                                  style={{ maxWidth: "220px" }}
                                  disabled={isCompleted} // ✅ disable completed
                                />
                                <Button
                                  color="primary"
                                  size="sm"
                                  className="ms-2"
                                  onClick={() => handleAction(item)}
                                  disabled={isCompleted} // ✅ disable completed
                                >
                                  Update
                                </Button>
                              </div>
                            ) : (
                              <div className="d-flex align-items-center">
                                <Input
                                  type="file"
                                  onChange={(e) => handleFileChange(item.key, e.target.files[0])}
                                  style={{ maxWidth: "220px" }}
                                  disabled={isCompleted} // ✅ disable completed
                                />
                                <Button
                                  color="success"
                                  size="sm"
                                  className="ms-2"
                                  onClick={() => handleAction(item)}
                                  disabled={isCompleted} // ✅ disable completed
                                >
                                  Upload
                                </Button>
                              </div>
                            )}
                          </td>
                          <td>
                            {isCompleted ? <Badge color="success">Completed</Badge> : <Badge color="secondary">Pending</Badge>}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>

                {statusMessage && <p className="mt-2">{statusMessage}</p>}
              </CardBody>
            </Card>
          </Container>
        </CSSTransition>
      </TransitionGroup>
    </Fragment>
  );
};
export default Formkycgrid;