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

import avatar1 from "../../../../assets/utils/images/avatars/1.jpg";
import avatar2 from "../../../../assets/utils/images/avatars/2.jpg";
import avatar3 from "../../../../assets/utils/images/avatars/3.jpg";

const data55 = [
  { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
  { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
  { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
  { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
  { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
  { name: "Page G", uv: 3490, pv: 4300, amt: 2100 },
  { name: "Page C", uv: 2000, pv: 6800, amt: 2290 },
  { name: "Page D", uv: 4780, pv: 7908, amt: 2000 },
  { name: "Page E", uv: 2890, pv: 9800, amt: 2181 },
  { name: "Page F", uv: 1390, pv: 3800, amt: 1500 },
  { name: "Page G", uv: 3490, pv: 4300, amt: 2100 },
];

const data22 = [
  { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
  { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
  { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
  { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
  { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
  { name: "Page G", uv: 3490, pv: 4300, amt: 2100 },
  { name: "Page C", uv: 2000, pv: 6800, amt: 2290 },
  { name: "Page D", uv: 4780, pv: 7908, amt: 2000 },
  { name: "Page E", uv: 2890, pv: 9800, amt: 2181 },
  { name: "Page F", uv: 1390, pv: 3800, amt: 1500 },
  { name: "Page G", uv: 3490, pv: 4300, amt: 2100 },
];

const data3 = [
  { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
  { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
  { name: "Page G", uv: 3490, pv: 4300, amt: 2100 },
  { name: "Page D", uv: 4780, pv: 7908, amt: 2000 },
  { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Page F", uv: 1390, pv: 3800, amt: 1500 },
  { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
  { name: "Page E", uv: 2890, pv: 9800, amt: 2181 },
  { name: "Page G", uv: 3490, pv: 4300, amt: 2100 },
  { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
  { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
  { name: "Page C", uv: 2000, pv: 6800, amt: 2290 },
];

const data2 = [
  { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
  { name: "Page D", uv: 4780, pv: 7908, amt: 2000 },
  { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
  { name: "Page C", uv: 2000, pv: 6800, amt: 2290 },
  { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
  { name: "Page E", uv: 2890, pv: 9800, amt: 2181 },
  { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
  { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
  { name: "Page G", uv: 3490, pv: 4300, amt: 2100 },
  { name: "Page G", uv: 3490, pv: 4300, amt: 2100 },
  { name: "Page F", uv: 1390, pv: 3800, amt: 1500 },
];

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

export default class CRMDashboard2 extends Component {
  constructor(props) {
    super(props);

    this.toggle2 = this.toggle2.bind(this);
    this.state = {
      activeTab2: "222",
      activeTab1: "11", 
      data: makeData(), 
    };
  }
  componentDidMount() {
    this.fetchSummary();
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

  async fetchSummary() {
    try {
      const datadx = await getTransactionsdashboardsummary();

      const summaryData = datadx.summary || {};

      const chartData = this.transformData(datadx.monthlyTrend || []);

      this.setState({
        summary: summaryData,
        chartData: chartData,
        loading: false,
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
   const { summary, chartData, loading } = this.state;

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
                  <Card className="mb-3">
                    <CardHeader className="card-header-tab">
                      <div className="card-header-title">
                        <i className="header-icon lnr-rocket icon-gradient bg-tempting-azure"> {" "} </i>
                        Bandwidth Reports
                      </div>
                      <div className="btn-actions-pane-right">
                        <Button outline
                          className={
                            "border-0 btn-pill btn-wide btn-transition " +
                            classnames({ active: this.state.activeTab1 === "11" })
                          }
                          color="alternate"
                          onClick={() => {
                            this.toggle1("11");
                          }}>
                          Tab 1
                        </Button>
                        <Button outline
                          className={
                            "ms-1 btn-pill btn-wide border-0 btn-transition " +
                            classnames({ active: this.state.activeTab1 === "22" })
                          }
                          color="alternate"
                          onClick={() => {
                            this.toggle1("22");
                          }}>
                          Tab 2
                        </Button>
                      </div>
                    </CardHeader>
                    <TabContent activeTab={this.state.activeTab1}>
                      <TabPane tabId="11">
                        <CardBody className="pt-2 pb-0">
                          <Row>
                            <Col md="6">
                              <div className="widget-content">
                                <div className="widget-content-outer">
                                  <div className="widget-content-wrapper">
                                    <div className="widget-content-left">
                                      <div className="widget-numbers fsize-3 text-muted">
                                        63%
                                      </div>
                                    </div>
                                  </div>
                                  <div className="widget-content-left fsize-1">
                                    <div className="text-muted opacity-6">
                                      Server Errors
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Col>
                            <Col md="6">
                              <div className="widget-content">
                                <div className="widget-content-outer">
                                  <div className="widget-content-wrapper">
                                    <div className="widget-content-left">
                                      <div className="widget-numbers fsize-3 text-muted">
                                        $ 1893
                                      </div>
                                    </div>
                                  </div>
                                  <div className="widget-content-left fsize-1">
                                    <div className="text-muted opacity-6">
                                      Total Income
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Col>
                            <Col md="6">
                              <div className="widget-content">
                                <div className="widget-content-outer">
                                  <div className="widget-content-wrapper">
                                    <div className="widget-content-left pe-2 fsize-1">
                                      <div className="widget-numbers fsize-3 text-alternate">
                                        61%
                                      </div>
                                    </div>
                                    <div className="widget-content-right w-100">
                                      <Progress className="progress-bar-xs" color="alternate" value="71"/>
                                    </div>
                                  </div>
                                  <div className="widget-content-left fsize-1">
                                    <div className="text-muted opacity-6">
                                      Server Target
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Col>
                            <Col md="6">
                              <div className="widget-content">
                                <div className="widget-content-outer">
                                  <div className="widget-content-wrapper">
                                    <div className="widget-content-left pe-2 fsize-1">
                                      <div className="widget-numbers fsize-3 text-danger">
                                        71%
                                      </div>
                                    </div>
                                    <div className="widget-content-right w-100">
                                      <Progress className="progress-bar-xs" color="danger" value="71"/>
                                    </div>
                                  </div>
                                  <div className="widget-content-left fsize-1">
                                    <div className="text-muted opacity-6">
                                      Income Target
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Col>
                          </Row>
                        </CardBody>
                        <div className="widget-chart p-0">
                          <ResponsiveContainer height={223}>
                            <AreaChart data={data22} margin={{ top: -25, right: 0, left: 0, bottom: 0 }}>
                              <defs>
                                <linearGradient id="colorPv2" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="10%" stopColor="#f7b924" stopOpacity={0.7}/>
                                  <stop offset="90%" stopColor="#f7b924" stopOpacity={0}/>
                                </linearGradient>
                              </defs>
                              <Tooltip />
                              <Area type="monotoneX" dataKey="uv" stroke="#f7b924" strokeWidth={2}
                                fillOpacity={1} fill="url(#colorPv2)"/>
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                      </TabPane>
                      <TabPane tabId="22">
                        <CardBody className="pt-2">
                          <Row>
                            <Col lg="6">
                              <div className="widget-content">
                                <div className="widget-content-outer">
                                  <div className="widget-content-wrapper">
                                    <div className="widget-content-left">
                                      <div className="widget-numbers fsize-3 text-muted">
                                        63%
                                      </div>
                                    </div>
                                  </div>
                                  <div className="widget-content-left fsize-1">
                                    <div className="text-muted opacity-6">
                                      Server Errors
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Col>
                            <Col lg="6">
                              <div className="widget-content">
                                <div className="widget-content-outer">
                                  <div className="widget-content-wrapper">
                                    <div className="widget-content-left">
                                      <div className="widget-numbers fsize-3 text-muted">
                                        $ 1893
                                      </div>
                                    </div>
                                  </div>
                                  <div className="widget-content-left fsize-1">
                                    <div className="text-muted opacity-6">
                                      Total Income
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Col>
                          </Row>
                          <div className="divider" />
                          <Row>
                            <Col lg="6">
                              <div className="widget-content">
                                <div className="widget-content-outer">
                                  <div className="widget-content-wrapper">
                                    <div className="widget-content-left">
                                      <div className="widget-numbers fsize-3 text-muted">
                                        83%
                                      </div>
                                    </div>
                                    <div className="widget-content-right">
                                      <div className="text-muted opacity-6">
                                        Servers Load
                                      </div>
                                    </div>
                                  </div>
                                  <div className="widget-progress-wrapper mt-1">
                                    <Progress className="progress-bar-sm progress-bar-animated-alt" color="danger" value="83"/>
                                  </div>
                                </div>
                              </div>
                            </Col>
                            <Col lg="6">
                              <div className="widget-content">
                                <div className="widget-content-outer">
                                  <div className="widget-content-wrapper">
                                    <div className="widget-content-left">
                                      <div className="widget-numbers fsize-3 text-muted">
                                        48%
                                      </div>
                                    </div>
                                    <div className="widget-content-right">
                                      <div className="text-muted opacity-6">
                                        Reported Bugs
                                      </div>
                                    </div>
                                  </div>
                                  <div className="widget-progress-wrapper mt-1">
                                    <Progress className="progress-bar-sm progress-bar-animated-alt" color="alternate" value="48"/>
                                  </div>
                                </div>
                              </div>
                            </Col>
                          </Row>
                        </CardBody>
                        <div className="widget-chart p-0">
                          <ResponsiveContainer height={192}>
                            <AreaChart data={data2} margin={{ top: -25, right: 0, left: 0, bottom: 0 }}>
                              <defs>
                                <linearGradient id="colorPv2" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="10%" stopColor="var(--alternate)" stopOpacity={0.7}/>
                                  <stop offset="90%" stopColor="var(--alternate)" stopOpacity={0}/>
                                </linearGradient>
                              </defs>
                              <Tooltip />
                              <Area type="monotoneX" dataKey="uv" stroke="var(--alternate)"
                                strokeWidth={2} fillOpacity={1} fill="url(#colorPv2)"/>
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                      </TabPane>
                    </TabContent>
                  </Card>
                </Col>
              </Row>
               <Row>
               <Col lg="12" xl="12">
  <ComposedChart data={chartData} margin={{ top: 20, right: 30, bottom: 20, left: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis yAxisId="left" label={{ value: "Amount", angle: -90, position: "insideLeft" }} />
        <YAxis yAxisId="right" orientation="right" label={{ value: "Count", angle: -90, position: "insideRight" }} />
        <Tooltip formatter={(value) => new Intl.NumberFormat().format(value)} />
        <Legend />

        {/* Bars: totalAmount */}
        {Object.keys(colors).map((type) => (
          <Bar
            key={`${type}_amount`}
            yAxisId="left"
            dataKey={`${type}_amount`}
            name={`${type} Amount`}
            fill={colors[type]}
            barSize={20}
          />
        ))}

        {/* Lines: count */}
        {Object.keys(colors).map((type) => (
          <Line
            key={`${type}_count`}
            yAxisId="right"
            type="monotone"
            dataKey={`${type}_count`}
            name={`${type} Count`}
            stroke={colors[type]}
            strokeWidth={2}
            dot={{ r: 4 }}
          />
        ))}
      </ComposedChart>
</Col>
             </Row>
              <Card className="main-card mb-3">
                <CardHeader className="card-header-tab">
                  <div className="card-header-title font-size-lg text-capitalize fw-normal">
                    <i className="header-icon lnr-dice me-3 text-muted opacity-6"> {" "} </i>
                    Easy Dynamic Tables
                  </div>
                  <div className="btn-actions-pane-right actions-icon-btn">
                    <UncontrolledButtonDropdown>
                      <DropdownToggle className="btn-icon btn-icon-only" color="link">
                        <i className="pe-7s-menu btn-icon-wrapper" />
                      </DropdownToggle>
                      <DropdownMenu className="dropdown-menu-shadow dropdown-menu-hover-link">
                        <DropdownItem header>Header</DropdownItem>
                        <DropdownItem>
                          <i className="dropdown-icon lnr-inbox"> </i>
                          <span>Menus</span>
                        </DropdownItem>
                        <DropdownItem>
                          <i className="dropdown-icon lnr-file-empty"> </i>
                          <span>Settings</span>
                        </DropdownItem>
                        <DropdownItem>
                          <i className="dropdown-icon lnr-book"> </i>
                          <span>Actions</span>
                        </DropdownItem>
                        <DropdownItem divider />
                        <div className="p-3 text-end">
                          <Button className="me-2 btn-shadow btn-sm" color="link">
                            View Details
                          </Button>
                          <Button className="me-2 btn-shadow btn-sm" color="primary">
                            Action
                          </Button>
                        </div>
                      </DropdownMenu>
                    </UncontrolledButtonDropdown>
                  </div>
                </CardHeader>
                <CardBody>
                <DataTable 
                    pagination
                    fixedHeader
                    fixedHeaderScrollHeight="400px"
                  />
                </CardBody>
              </Card>
            
             
            </div>
          </CSSTransition>
        </TransitionGroup>
      </Fragment>
    );
  }
}
