import React, { Component, Fragment } from "react";
import { CSSTransition, TransitionGroup  } from '../../../../utils/TransitionWrapper';
import classnames from "classnames";
import DataTable from 'react-data-table-component';
import { getTransactionsdashboardsummary,getaccountdetailsbyID} from "../../../../api/DashboardService";
import {
  Row,
  Col,
  Button,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Nav,
  NavItem,
  ListGroup,
  ListGroupItem,
  Card,
  CardBody,
  CardHeader,
  NavLink,
  TabContent,
  TabPane,
  Progress,
  CardFooter,
  ButtonGroup,
  Table,
} from "reactstrap";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  Tooltip,
   ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend, 
} from "recharts";

import PerfectScrollbar from "react-perfect-scrollbar";

import {
  faAngleUp,
  faDotCircle,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";

import { Sparklines, SparklinesCurve } from "react-sparklines";

import { makeData } from "../../../Tables/DataTables/Examples/utils";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CountUp from "react-countup"; 


function boxMullerRandom() {
  let phase = true,
    x1,
    x2,
    w;

  return (function () {
    if (phase) {
      do {
        x1 = 2.0 * Math.random() - 1.0;
        x2 = 2.0 * Math.random() - 1.0;
        w = x1 * x1 + x2 * x2;
      } while (w >= 1.0);

      w = Math.sqrt((-2.0 * Math.log(w)) / w);
      return x1 * w;
    } else {
      return x2 * w;
    }
  })();
}

function randomData(n = 30) {
  return Array.apply(0, Array(n)).map(boxMullerRandom);
}

const sampleData = randomData(10);
const sampleData2 = randomData(15);
const sampleData3 = randomData(8);
const sampleData4 = randomData(12);
const TreeView = ({ label, children }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <div style={{ marginLeft: 20 }}>
      <div
        style={{ cursor: "pointer", fontWeight: "bold" }}
        onClick={() => setOpen(!open)}
      >
        {open ? "▼" : "▶"} {label}
      </div>
      {open && <div style={{ marginLeft: 20 }}>{children}</div>}
    </div>
  );
};

export default class CRMDashboard2 extends Component {
  constructor(props) {
    super(props);

    this.toggle2 = this.toggle2.bind(this);
    this.state = {
      activeTab2: "222",
      activeTab1: "11", 
      data: makeData(), 
      activeTab: "",
      datatv : null
    };
    this.toggle = this.toggle.bind(this);
  }
  componentDidMount() {
    this.fetchSummary();
  }
 toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({ activeTab: tab });
    }
  }
  // --- Transform data method ---
  transformData(data) {
    const result = {};

    data.forEach((item) => {
      const key = `${item.year}-${item.month.toString().padStart(2, "0")}`;
      if (!result[key]) result[key] = { month: key };

      result[key][`${item.transactionType}_amount`] = item.totalAmount;
      result[key][`${item.transactionType}_count`] = item.count;
    });

    return Object.values(result);
  }
renderTransactionList(title, transactions) {
    return (
      <div key={title} style={{ marginLeft: 20 }}>
        <TreeView key={title} label={`${title} (${transactions.length})`}>
          {transactions.map((tx) => (
            <TreeView key={tx.id} label={`${tx.transactionId} - ${tx.status}`}>
              <div style={{ marginLeft: 20 }}>
                <p><strong>Type:</strong> {tx.transactionType}</p>
                <p><strong>Amount:</strong> {tx.amount}</p>
                <p><strong>Description:</strong> {tx.description}</p>
                <p><strong>Created:</strong> {tx.createdAt}</p>
              </div>
            </TreeView>
          ))}
        </TreeView>
      </div>
    );
  }

   renderSection(sectionTitle, sectionData) {
    if (!sectionData) return null;

    return (
      <TreeView key={sectionTitle} label={sectionTitle}>
        {Object.entries(sectionData).map(([key, txArray]) =>
          this.renderTransactionList(key, txArray)
        )}
      </TreeView>
    );
  }

  async fetchSummary() {
    try {
      const datadx = await getTransactionsdashboardsummary();

      const summaryData = datadx.summary || {};
//debugger;
      const chartData = this.transformData(datadx.monthlyTrend || []);
console.log("Transformed Chart Data:", chartData);
      this.setState({
        summary: summaryData,
        chartData: chartData,
        loading: false,
        datatv: datadx,
      });
    } catch (err) {
      console.error("Failed to fetch dashboard summary:", err);
      this.setState({ loading: false });
    }
  }

  toggle2(tab) {
    if (this.state.activeTab2 !== tab) {
      this.setState({
        activeTab2: tab,
      });
    }
  }

  toggle1(tab) {
    if (this.state.activeTab1 !== tab) {
      this.setState({
        activeTab1: tab,
      });
    }
  }

  render() {
   const { summary, chartData, loading,activeTab ,datatv} = this.state;

const colors = {
  Fee: "#8884d8",
  Debit: "#82ca9d",
  Credit: "#ffc658",
  Transfer: "#ff7300",
};

    const { data } = this.state;
  
    return (
      <Fragment>
        <TransitionGroup>
          <CSSTransition component="div" classNames="TabsAnimation"
            appear={true} timeout={0} enter={false} exit={false}>
            <div>
            <Row>
  {/* Total Transactions */}
  <Col md="6" xl="4">
    <div className="card mb-3 widget-content">
      <div className="widget-content-outer">
        <div className="widget-content-wrapper">
          <div className="widget-content-left">
            <div className="widget-heading">Total </div>
          </div>
          <div className="widget-content-right">
            <div className="widget-numbers text-success">
              {summary?.totalTransactions ?? 0}
            </div>
          </div>
          
        </div>
        <div className="widget-progress-wrapper">
                                  <Progress className="progress-bar-sm" color="primary" value="71"/>
                                  <div className="progress-sub-label">
                                    <div className="sub-label-left">YoY Growth</div>
                                    <div className="sub-label-right">100%</div>
                                  </div>
                                </div>
      </div>
    </div>
  </Col>

  {/* Completed */}
  <Col md="6" xl="4">
    <div className="card mb-3 widget-content">
      <div className="widget-content-outer">
        <div className="widget-content-wrapper">
          <div className="widget-content-left">
            <div className="widget-heading">Completed</div>
          </div>
          <div className="widget-content-right">
            <div className="widget-numbers text-info">
              {summary?.completedCount ?? 0}
            </div>
          </div>
        </div>
        <div className="widget-progress-wrapper">
                                <Progress className="progress-bar-sm progress-bar-animated-alt" color="danger" value="85"/>
                                <div className="progress-sub-label">
                                  <div className="sub-label-left">Sales</div>
                                  <div className="sub-label-right">100%</div>
                                </div>
                              </div>
      </div>
    </div>
  </Col>

  {/* Failed */}
  <Col md="6" xl="4">
    <div className="card mb-3 widget-content">
      <div className="widget-content-outer">
        <div className="widget-content-wrapper">
          <div className="widget-content-left">
            <div className="widget-heading">Failed</div>
          </div>
          <div className="widget-content-right">
            <div className="widget-numbers text-danger">
              {summary?.failedCount ?? 0}
            </div>
          </div>
          </div>
            <div className="widget-progress-wrapper">
                                  <Progress className="progress-bar-sm progress-bar-animated-alt" color="success" value="46"/>
                                  <div className="progress-sub-label">
                                    <div className="sub-label-left"> Progress</div>
                                    <div className="sub-label-right">100%</div>
                                  </div>
                                </div>
        
      </div>
    </div>
  </Col>

  {/* Cancelled */}
  <Col md="6" xl="4">
    <div className="card mb-3 widget-content">
      <div className="widget-content-outer">
        <div className="widget-content-wrapper">
          <div className="widget-content-left">
            <div className="widget-heading">Cancelled</div>
          </div>
          <div className="widget-content-right">
            <div className="widget-numbers text-warning">
              {summary?.cancelledCount ?? 0}
            </div>
          </div>
        </div>
         <div className="widget-progress-wrapper">
                                  <Progress className="progress-bar-sm progress-bar-animated-alt" color="success" value="46"/>
                                  <div className="progress-sub-label">
                                    <div className="sub-label-left"> Progress</div>
                                    <div className="sub-label-right">100%</div>
                                  </div>
                                </div>
      </div>
    </div>
  </Col>

  {/* Pending */}
  <Col md="6" xl="4">
    <div className="card mb-3 widget-content">
      <div className="widget-content-outer">
        <div className="widget-content-wrapper">
          <div className="widget-content-left">
            <div className="widget-heading">Pending</div>
          </div>
          <div className="widget-content-right">
            <div className="widget-numbers text-primary">
              {summary?.pendingCount ?? 0}
            </div>
          </div>
        </div>
         <div className="widget-progress-wrapper">
                                <Progress className="progress-bar-sm" color="primary" value="71"/>
                                <div className="progress-sub-label">
                                  <div className="sub-label-left">Percentage</div>
                                  <div className="sub-label-right">100%</div>
                                </div>
                              </div>
      </div>
    </div>
  </Col>

  {/* Total Amount */}
  <Col md="6" xl="4">
    <div className="card mb-3 widget-content">
      <div className="widget-content-outer">
        <div className="widget-content-wrapper">
          <div className="widget-content-left">
            <div className="widget-heading">Total Amount</div>
          </div>
          <div className="widget-content-right">
            <div className="widget-numbers text-focus">
              ₹{summary?.totalAmount?.toLocaleString(undefined, { maximumFractionDigits: 2 }) ?? 0}
            </div>
          </div>
        </div>
         <div className="widget-progress-wrapper">
                                <Progress className="progress-bar-sm progress-bar-animated-alt" color="danger" value="85"/>
                                <div className="progress-sub-label">
                                  <div className="sub-label-left">Percentage</div>
                                  <div className="sub-label-right">100%</div>
                                </div>
                              </div>
      </div>
    </div>
  </Col>
</Row>

             
               <Row>
               <Col lg="12" xl="12"> 
  <ResponsiveContainer width="100%" height={300}>
  <LineChart data={this.state.chartData}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="month" />
    <YAxis />
    <Tooltip />
    <Legend />

    {/* Draw lines for each transaction type count */}
    <Line type="monotone" dataKey="Credit_count" stroke="#82ca9d" />
    <Line type="monotone" dataKey="Debit_count" stroke="#8884d8" />
    <Line type="monotone" dataKey="Transfer_count" stroke="#ffc658" />
    <Line type="monotone" dataKey="Fee_count" stroke="#ff7300" />
  </LineChart>
</ResponsiveContainer>



</Col>
             </Row>
            
             <Row>
 <div lg="12" xl="12">
  <h3>Transaction Details (Tree View)</h3>

  {this.state.datatv ? (
    <>
      {this.renderSection(
        "Top Transactions",
        this.state.datatv.topTransactions
      )}
      {this.renderSection(
        "Low Transactions",
        this.state.datatv.lowTransactions
      )}
      {this.renderSection(
        "Recent Transactions",
        this.state.datatv.recentTransactions
      )}
    </>
  ) : (
    <div>Loading transaction data...</div>
  )}
</div>


             </Row>
            </div>
          </CSSTransition>
        </TransitionGroup>
      </Fragment>
    );
  }
}
