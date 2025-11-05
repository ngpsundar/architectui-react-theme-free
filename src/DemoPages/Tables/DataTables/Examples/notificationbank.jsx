import React, { useEffect, useState, Fragment } from "react";
import { CSSTransition, TransitionGroup } from "../../../../utils/TransitionWrapper";
import { Row, Col, Card, CardBody, Spinner, Button } from "reactstrap";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import PageTitle from "../../../../Layout/AppMain/PageTitle";
import {
  getallNotifications,
  updateNotifications,
  updateManyNotifications,
} from "../../../../api/NotificationService";

const NotificationByUserID = ({ userId }) => {
  const [notifys, setNotifys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
const [selectedRows, setSelectedRows] = useState([]);
const [clearSelectedRows, setClearSelectedRows] = useState(false);


  // Fetch notifications
  useEffect(() => {
    if (!userId) return;

    const fetchNotifications = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getallNotifications(userId);
        console.log("Fetched notifications:", data);
        setNotifys(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching notifications:", err);
        setNotifys([]);
        setError("Failed to load notifications.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [userId]);

  // Table columns
  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      omit: true, // hide from display but keep in data
    },
    {
      name: "Message",
      selector: (row) => row.message,
      sortable: true,
      wrap: true,
    },
    {
      name: "Type",
      selector: (row) => row.type,
      sortable: true,
      width: "150px",
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
      width: "150px",
      cell: (row) => (
        <span
          className={`badge ${
            row.status === "Unread" ? "bg-danger" : "bg-success"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      name: "Created At",
      selector: (row) =>
        row.createdAt
          ? new Date(row.createdAt).toLocaleString("en-IN", {
              dateStyle: "medium",
              timeStyle: "short",
            })
          : "-",
      sortable: true,
      width: "220px",
    },
  ];

  // Handle row selection
  const handleSelectedRowsChange = (state) => {
    setSelectedRows(state.selectedRows);
  };

  // Handle mark-as-read action
  const handleMarkAsRead = async () => {
    if (selectedRows.length === 0) return;

    const confirm = await Swal.fire({
      title: "Mark as Read?",
      text:
        selectedRows.length === 1
          ? "Are you sure you want to mark this notification as read?"
          : `Are you sure you want to mark ${selectedRows.length} notifications as read?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, mark as read",
      cancelButtonText: "Cancel",
    });

    if (!confirm.isConfirmed) return;

    try {
      if (selectedRows.length === 1) {
        const id = selectedRows[0].id;
        await updateNotifications(id); // single mark-as-read
      } else {
        const ids = selectedRows.map((row) => row.id);
        await updateManyNotifications(ids); // multiple mark-as-read
      }

      Swal.fire("Success", "Marked as read successfully!", "success");

      // Refresh table after update
      const refreshed = await getallNotifications(userId);
      setNotifys(Array.isArray(refreshed) ? refreshed : []);
      setSelectedRows([]);
    } catch (error) {
      console.error("Error marking notifications:", error);
      Swal.fire("Error", "Failed to mark notifications as read.", "error");
    }
  };

  return (
    <Fragment>
      <TransitionGroup>
        <CSSTransition
          component="div"
          classNames="TabsAnimation"
          appear={true}
          timeout={1500}
          enter={false}
          exit={false}
        >
          <div>
            <PageTitle
              heading="Notifications"
              subheading="List of notifications for All Accounts."
              icon="pe-7s-bell icon-gradient bg-mean-fruit"
            />

            <Row>
              <Col md="12">
                <Card className="main-card mb-3">
                  <CardBody>
                    {loading ? (
                      <div className="text-center p-5">
                        <Spinner color="primary" />
                        <div>Loading notifications...</div>
                      </div>
                    ) : error ? (
                      <div className="text-center text-danger">{error}</div>
                    ) : (
                      <>
                        {selectedRows.length > 0 && (
                          <div className="text-end mb-3">
                            <Button
                              color="success"
                              onClick={handleMarkAsRead}
                              disabled={selectedRows.length === 0}
                            >
                              Mark as Read ({selectedRows.length})
                            </Button>
                          </div>
                        )}
                        <DataTable
                          columns={columns}
                          data={notifys}
                          pagination
                          highlightOnHover
                          striped
                          persistTableHead
                          selectableRows
                            onSelectedRowsChange={(state) => setSelectedRows(state.selectedRows)}
  clearSelectedRows={clearSelectedRows} 
                          noDataComponent="No notifications found"
                        />
                      </>
                    )}
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </CSSTransition>
      </TransitionGroup>
    </Fragment>
  );
};

export default NotificationByUserID;
