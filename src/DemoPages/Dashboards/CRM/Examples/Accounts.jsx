import React, { Component, Fragment } from "react";
import classnames from "classnames";
import { getdashboardsummary } from "../../../../api/DashboardService";
import {
  Row,
  Col,
  Button,
  Nav,
  Container,
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
  ButtonGroup,
  CardFooter,
  Table,
  Popover,
  PopoverBody,
} from "reactstrap";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  Tooltip,
} from "recharts";

import PerfectScrollbar from "react-perfect-scrollbar";

import {
  faAngleUp,
  faDotCircle,
  faAngleDown,
  faArrowLeft,
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";

import { Sparklines, SparklinesBars, SparklinesLine } from "react-sparklines";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CountUp from "react-countup";

import avatar1 from "../../../../assets/utils/images/avatars/1.jpg";
import avatar2 from "../../../../assets/utils/images/avatars/2.jpg";
import avatar3 from "../../../../assets/utils/images/avatars/3.jpg";
import avatar4 from "../../../../assets/utils/images/avatars/4.jpg";

import bg1 from "../../../../assets/utils/images/dropdown-header/abstract1.jpg";
import bg2 from "../../../../assets/utils/images/dropdown-header/abstract2.jpg";
import bg3 from "../../../../assets/utils/images/dropdown-header/abstract3.jpg";

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

const data = [
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

export default class CRMDashboard1 extends Component {
  constructor(props) {
    super(props);

    this.toggle2 = this.toggle2.bind(this);
    this.togglePop1 = this.togglePop1.bind(this);
    this.togglePop2 = this.togglePop2.bind(this);
    this.togglePop3 = this.togglePop3.bind(this);
    this.togglePop4 = this.togglePop4.bind(this);

    this.state = {
      activeTab2: "",
      activeTab1: "11",
      popoverOpen1: false,
      popoverOpen2: false,
      popoverOpen3: false,
      popoverOpen4: false,
       summary: null,
      loading: true,
      error: null,
      averageLoss : 0,
    };
  }
    componentDidMount() {
    this.fetchSummary();
  }
  async fetchSummary() {
    try {
       // debugger;
      const datadx = await getdashboardsummary();
       const firstKey = Object.keys(datadx.topAccountsPerType || {})[0] || "";
      this.setState({ summary: datadx, activeTab2: firstKey, loading: false });
    } catch (err) {
      console.error("Failed to fetch dashboard summary:", err);
      this.setState({ error: err.message, loading: false });
    }
  }
 toggle2(tab) {
  if (this.state.activeTab2 !== tab) {
    this.setState({ activeTab2: tab });
  }
}


  toggle1(tab) {
    if (this.state.activeTab1 !== tab) {
      this.setState({
        activeTab1: tab,
      });
    }
  }

  togglePop1() {
    this.setState({
      popoverOpen1: !this.state.popoverOpen1,
    });
  }

  togglePop2() {
    this.setState({
      popoverOpen2: !this.state.popoverOpen2,
    });
  }

  togglePop3() {
    this.setState({
      popoverOpen3: !this.state.popoverOpen3,
    });
  }

  togglePop4() {
    this.setState({
      popoverOpen4: !this.state.popoverOpen4,
    });
  }
// consuming the dashboard summary API to show key metrics

  render() {
       const { summary, loading, error } = this.state;

    // 🧩 Safety guard: prevent rendering before data arrives
    if (loading) {
      return <div>Loading dashboard...</div>;
    }

    if (error) {
      return <div className="text-danger">Error: {error}</div>;
    }

    if (!summary) {
      return <div>No summary data available</div>;
    }
    
    return (
      <Fragment>
        <Container fluid>
          <Row>
            <Col  xl="3" lg="3" md="6" sm="12">
              <div className="card mb-3 widget-content bg-night-fade">
                <div className="widget-content-wrapper text-white">
                  <div className="widget-content-left">
                    <div className="widget-heading">Dep.,Cur. & FD</div>
                  </div>
                  <div className="widget-content-right">
                    <div className="widget-numbers text-white">
                      <CountUp end={summary.totalActiveAccounts} duration="3" />
                      / <CountUp end={summary.totalActiveBalance} duration="3" separator="" decimals={0}
                        decimal=","  />
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col  xl="3" lg="3" md="6" sm="12">
              <div className="card mb-3 widget-content bg-arielle-smile">
                <div className="widget-content-wrapper text-white">
                  <div className="widget-content-left">
                    <div className="widget-heading">Loans</div>
                   
                  </div>
                  <div className="widget-content-right">
                    <div className="widget-numbers text-white">
                      <CountUp start={-75.9} end={summary.loanAccountCount} duration="3" separator="" decimals={0}
                        decimal="," /> / <CountUp end={summary.loanTotalAmount} duration="3" separator="" decimals={0}
                        decimal="," />
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col  xl="3" lg="3" md="6" sm="12">
              <div className="card mb-3 widget-content bg-happy-green">
                <div className="widget-content-wrapper text-white">
                  <div className="widget-content-left">
                    <div className="widget-heading">Other</div>
                  </div>
                  <div className="widget-content-right">
                    <div className="widget-numbers text-white">
                      <CountUp start={-75.9} end={summary.otherAccountCount} duration="3" separator="" decimals={0}
                        decimal="," /> / <CountUp end={summary.otherTotalAmount} duration="3" separator="" decimals={0}
                        decimal="," />
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col  xl="3" lg="3" md="6" sm="12" >
              <div className="card mb-3 widget-content bg-premium-dark">
                <div className="widget-content-wrapper text-white">
                  <div className="widget-content-left">
                    <div className="widget-heading">Grand Total</div>
                    <div className="widget-subheading">Revenue Up</div>
                  </div>
                  <div className="widget-content-right">
                    <div className="widget-numbers text-warning">
                      <CountUp start={1} end={summary.totalActiveBalance / summary.totalActiveAccounts} separator="" decimals={0}
                        decimal="," prefix="$" suffix="M" duration="2"/>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md="12" lg="6" xl="5">
              <Card className="mb-3">
                <CardHeader className="card-header-tab card-header-tab-animation">
                  <div className="card-header-title">
                    <i className="header-icon lnr-apartment icon-gradient bg-love-kiss"> {" "} </i>
                    Active 
                  </div>
                 <Nav tabs>
  {Object.keys(this.state.summary?.topAccountsPerType || {}).map((accountType) => (
    <NavItem key={accountType}>
      <NavLink
        href="#"
        className={classnames({
          active: this.state.activeTab2 === accountType,
        })}
        onClick={() => this.toggle2(accountType)}
      >
        {accountType}
      </NavLink>
    </NavItem>
  ))}
</Nav>
                </CardHeader>
                <CardBody>
                   
                <TabContent activeTab={this.state.activeTab2}>
  {Object.keys(this.state.summary?.topAccountsPerType || {}).map((accountType) => (
    <TabPane key={accountType} tabId={accountType}>
      <div className="card mb-3 widget-chart widget-chart2 text-start w-100">
        <div className="widget-chat-wrapper-outer">
          <div className="widget-chart-content pt-3 pe-3 ps-3">
            <div className="widget-chart-flex">
              <div className="widget-numbers">
                <div className="widget-chart-flex">
                  <div>
                    <small className="opacity-5">$</small>
                    <CountUp
                      start={0}
                      end={
                        this.state.summary.activeAccountTypeSummary.find(
                          (t) => t.accountType === accountType
                        )?.totalAmount || 0
                      }
                      separator=","
                      decimals={0}
                      duration={3}
                    />
                  </div>
                  <div className="widget-title ms-2 opacity-5 font-size-lg text-muted">
                    {accountType} Accounts
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="widget-chart-wrapper widget-chart-wrapper-lg opacity-10 m-0">
            <ResponsiveContainer height="100%">
              <AreaChart
                data={this.state.summary.topAccountsPerType[accountType].map((a) => ({
                  uv: a.balance,
                }))}
                margin={{ top: -10, right: 0, left: 0, bottom: 0 }}
              >
                <Tooltip />
                <Area type="monotoneX" dataKey="uv" strokeWidth={0} fill="#30b1ff" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <h6 className="text-muted text-uppercase font-size-md opacity-5 fw-normal">
        Top {accountType} Accounts
      </h6>

      <div className="scroll-area-sm">
        <PerfectScrollbar>
          <ListGroup className="rm-list-borders rm-list-borders-scroll" flush>
            {this.state.summary.topAccountsPerType[accountType].map((acct, idx) => (
              <ListGroupItem key={acct.accountNumber}>
                <div className="widget-content p-0">
                  <div className="widget-content-wrapper">
                     
                    <div className="widget-content-left">
                      <div className="widget-heading">#{acct.accountNumber}</div>
                      <div className="widget-subheading">{acct.accountType}</div>
                    </div>
                    <div className="widget-content-right">
                      <div className="font-size-xlg text-muted">
                        <small className="opacity-5 pe-1">$</small>
                        <CountUp
                          start={0}
                          end={acct.balance}
                          separator=","
                          decimals={2}
                          duration={2}
                        />
                        <small className="text-success ps-2">
                          <FontAwesomeIcon icon={faAngleUp} />
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              </ListGroupItem>
            ))}
          </ListGroup>
        </PerfectScrollbar>
      </div>
    </TabPane>
  ))}
</TabContent>

                </CardBody>
              </Card>
            </Col>
            <Col md="12" lg="6" xl="7">
              <Card className="mb-3">
               <CardHeader className="card-header-tab">
    <div className="card-header-title">
      <i className="header-icon lnr-rocket icon-gradient bg-tempting-azure">{" "}</i>
      Inactive Accounts
    </div>

    {/* ✅ Dynamic tab buttons */}
    <div className="btn-actions-pane-right">
      {this.state.summary?.inactiveAccountTypeSummary?.map((item, index) => (

        
        <Button
          key={item.accountType}
          outline
          className={
            "ms-1 btn-pill btn-wide border-0 btn-transition " +
            classnames({
              active: this.state.activeTab1 === item.accountType,
            })
          }
          color="alternate"
          onClick={() => this.toggle1(item.accountType)}
        >
          {item.accountType}
        </Button>
      ))}
    </div>
  </CardHeader>
                 <TabContent activeTab={this.state.activeTab1}>
  {this.state.summary?.inactiveAccountTypeSummary?.map((item, index) => (
    <TabPane key={item.accountType} tabId={item.accountType}>
      <div className="widget-chart p-0">
        <ResponsiveContainer height={330}>
          <AreaChart data={data} margin={{ top: -25, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id={`colorPv-${index}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="10%" stopColor="#f7b924" stopOpacity={0.7}/>
                <stop offset="90%" stopColor="#f7b924" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Tooltip />
            <Area
              type="monotoneX"
              dataKey="uv"
              stroke="#f7b924"
              strokeWidth={2}
              fillOpacity={1}
              fill={`url(#colorPv-${index})`}
            />
          </AreaChart>
        </ResponsiveContainer>

        <div className="widget-chart-content">
          <div className="widget-description mt-0 text-warning">
            <FontAwesomeIcon icon={faArrowLeft} />
            <span className="ps-1">{item.count}</span>
            <span className="text-muted opacity-8 ps-1">
              total inactive {item.accountType} accounts
            </span>
          </div>
        </div>
      </div>

      <CardBody className="pt-2">
        <Row>
          <Col md="6">
            <div className="widget-content">
              <div className="widget-content-outer">
                <div className="widget-content-wrapper">
                  <div className="widget-content-left">
                    <div className="widget-numbers fsize-3 text-muted">
                      {item.count}
                    </div>
                  </div>
                  <div className="widget-content-right">
                    <div className="text-muted opacity-6">
                      Total Accounts
                    </div>
                  </div>
                </div>
                <div className="widget-progress-wrapper mt-1">
                  <Progress
                    className="progress-bar-sm progress-bar-animated-alt"
                    color="danger"
                    value={Math.min(item.count / 50, 100)} // dynamic %
                  />
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
                      ₹{item.totalAmount.toFixed(2)}
                    </div>
                  </div>
                  <div className="widget-content-right">
                    <div className="text-muted opacity-6">
                      Total Balance
                    </div>
                  </div>
                </div>
                <div className="widget-progress-wrapper mt-1">
                  <Progress
                    className="progress-bar-sm progress-bar-animated-alt"
                    color="success"
                    value={Math.min(item.totalAmount / 1000000, 100)} // dynamic %
                  />
                </div>
              </div>
            </div>
          </Col>
        </Row>
         <Row className="mt-3">
            <Col md="12">
              <div className="widget-content">
                <div className="widget-content-outer">
                  <div className="widget-content-wrapper">
                    <div className="widget-content-left">
                      <div className="widget-numbers fsize-3 text-muted">
                        ₹{(item.count > 0 ? (item.totalAmount / item.count) : 0).toFixed(2)}

                      </div>
                    </div>
                    <div className="widget-content-right">
                      <div className="text-muted opacity-6">
                        Average Loss per Account
                      </div>
                    </div>
                  </div>
                  <div className="widget-progress-wrapper mt-1">
                     <Progress
            className="progress-bar-sm progress-bar-animated-alt"
            color="info"
            value={Math.min((item.totalAmount / item.count) / 10000, 100)} // optional visual
          />
                  </div>
                </div>
              </div>
            </Col>
          </Row>
      </CardBody>
    </TabPane>
  ))}
</TabContent>

              </Card>
            </Col>
          </Row>
          <Row>
            <Col md="6" lg="4" xl="4">
              <Card className="card-hover-shadow-2x mb-3">
                <CardHeader className="rm-border responsive-center text-start">
                  <div>
                    <h5 className="menu-header-title text-capitalize text-success">
                      Received Messages
                    </h5>
                  </div>
                </CardHeader>
                <div className="widget-chart widget-chart2 text-start pt-0">
                  <div className="widget-chat-wrapper-outer">
                    <div className="widget-chart-content">
                      <div className="widget-chart-flex">
                        <div className="widget-numbers">
                          <div className="widget-chart-flex">
                            <div className="text-success">
                              <CountUp start={0} end={348} separator="" decimals={0} decimal="," prefix="" duration="10"/>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="widget-chart-wrapper widget-chart-wrapper-lg he-auto opacity-10 m-0">
                      <ResponsiveContainer height={131}>
                        <AreaChart data={data3} margin={{ top: -20, right: 0, left: 0, bottom: 0 }}>
                          <Tooltip />
                          <Area type="monotoneX" dataKey="uv" stroke="#3ac47d" strokeWidth={3}
                            fill="#3ac47d" fillOpacity=".1"/>
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </Card>
            </Col>
            <Col md="6" lg="4" xl="4">
              <Card className="card-hover-shadow-2x mb-3">
                <CardHeader className="rm-border responsive-center text-start">
                  <div>
                    <h5 className="menu-header-title text-capitalize text-danger">
                      Sent Messages
                    </h5>
                  </div>
                </CardHeader>
                <div className="widget-chart widget-chart2 text-start pt-0">
                  <div className="widget-chat-wrapper-outer">
                    <div className="widget-chart-content">
                      <div className="widget-chart-flex">
                        <div className="widget-numbers">
                          <div className="widget-chart-flex">
                            <div className="text-danger">
                              <CountUp start={0} end={425} separator="" decimals={0} decimal="," prefix="" duration="10"/>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="widget-chart-wrapper widget-chart-wrapper-lg he-auto opacity-10 m-0">
                      <ResponsiveContainer height={131}>
                        <AreaChart data={data2} margin={{ top: -20, right: 0, left: 0, bottom: 0 }}>
                          <Tooltip />
                          <Area type="monotoneX" dataKey="uv" stroke="#d92550"
                            strokeWidth={3} fill="#d92550" fillOpacity=".1"/>
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </Card>
            </Col>
            <Col md="12" lg="4" xl="4">
              <Card color="dark" className="card-hover-shadow-2x mb-3">
                <CardHeader className="rm-border bg-dark responsive-center text-start">
                  <div>
                    <h5 className="menu-header-title text-capitalize text-warning">
                      Inbox Total
                    </h5>
                  </div>
                </CardHeader>
                <div className="widget-chart widget-chart2 text-start pt-0">
                  <div className="widget-chat-wrapper-outer">
                    <div className="widget-chart-content">
                      <div className="widget-chart-flex">
                        <div className="widget-numbers">
                          <div className="widget-chart-flex">
                            <div className="text-warning">
                              <CountUp start={0} end={274} separator="" decimals={0} decimal="," prefix="" duration="10"/>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="widget-chart-wrapper widget-chart-wrapper-lg he-auto opacity-10 m-0">
                      <ResponsiveContainer height={131}>
                        <AreaChart data={data} margin={{ top: -20, right: 0, left: 0, bottom: 0 }}>
                          <Tooltip />
                          <Area type="monotoneX" dataKey="uv" stroke="rgba(255,255,255,.3)"
                            strokeWidth={3} fill="rgba(255,255,255,.1)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <Card className="main-card mb-3">
                <CardHeader>
                  Active Users
                  <div className="btn-actions-pane-right">
                    <ButtonGroup size="sm">
                      <Button caret="true" color="focus" className={"active"}>
                        Last Week
                      </Button>
                      <Button caret="true" color="focus">
                        All Month
                      </Button>
                    </ButtonGroup>
                  </div>
                </CardHeader>
                <Table responsive hover striped borderless className="align-middle mb-0">
                  <thead>
                    <tr>
                      <th className="text-center">#</th>
                      <th>Name</th>
                      <th className="text-center">City</th>
                      <th className="text-center">Status</th>
                      <th className="text-center">Sales</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-center text-muted">#345</td>
                      <td>
                        <div className="widget-content p-0">
                          <div className="widget-content-wrapper">
                            <div className="widget-content-left me-3">
                              <div className="widget-content-left">
                                <img width={40} className="rounded-circle" src={avatar2} alt=""/>
                              </div>
                            </div>
                            <div className="widget-content-left flex2">
                              <div className="widget-heading">John Doe</div>
                              <div className="widget-subheading opacity-7">
                                Web Developer
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="text-center">Madrid</td>
                      <td className="text-center">
                        <div className="badge bg-warning">Pending</div>
                      </td>
                      <td className="text-center" style={{ width: "150px" }}>
                        <Sparklines height={60} data={sampleData}>
                          <SparklinesLine
                            style={{
                              strokeWidth: 3,
                              stroke: "#545cd8",
                              fill: "none",
                            }}/>
                        </Sparklines>
                      </td>
                      <td className="text-center">
                        <Button size="sm" color="primary" id={"PopoverCustomT-1"} onClick={this.togglePop1}>
                          Details
                        </Button>
                        <Popover className="popover-custom rm-pointers" placement="auto" isOpen={this.state.popoverOpen1}
                          target={"PopoverCustomT-1"} toggle={this.togglePop1}>
                          <PopoverBody>
                            <div className="dropdown-menu-header">
                              <div
                                className={classnames(
                                  "dropdown-menu-header-inner bg-focus"
                                )}>
                                <div className="menu-header-image"
                                  style={{
                                    backgroundImage: "url(" + bg1 + ")",
                                  }}/>
                                <div className="menu-header-content">
                                  <h5 className="menu-header-title">
                                    Settings
                                  </h5>
                                  <h6 className="menu-header-subtitle">
                                    Manage all of your options
                                  </h6>
                                </div>
                              </div>
                            </div>
                            <Nav vertical>
                              <NavItem className="nav-item-header">
                                Activity
                              </NavItem>
                              <NavItem>
                                <NavLink href="#">
                                  Chat
                                  <div className="ms-auto badge rounded-pill bg-info">
                                    8
                                  </div>
                                </NavLink>
                              </NavItem>
                              <NavItem>
                                <NavLink href="#">Recover Password</NavLink>
                              </NavItem>
                              <NavItem className="nav-item-divider" />
                              <NavItem className="nav-item-btn text-center">
                                <Button size="sm" className="btn-wide btn-shadow" color="danger">
                                  Cancel
                                </Button>
                              </NavItem>
                            </Nav>
                          </PopoverBody>
                        </Popover>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-center text-muted">#347</td>
                      <td>
                        <div className="widget-content p-0">
                          <div className="widget-content-wrapper">
                            <div className="widget-content-left me-3">
                              <div className="widget-content-left">
                                <img width={40} className="rounded-circle" src={avatar1} alt=""/>
                              </div>
                            </div>
                            <div className="widget-content-left flex2">
                              <div className="widget-heading">
                                Ruben Tillman
                              </div>
                              <div className="widget-subheading opacity-7">
                                Etiam sit amet orci eget
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="text-center">Berlin</td>
                      <td className="text-center">
                        <div className="badge bg-success">Completed</div>
                      </td>
                      <td className="text-center" style={{ width: "150px" }}>
                        <Sparklines height={60} data={sampleData}>
                          <SparklinesBars
                            style={{
                              stroke: "none",
                              fill: "#3ac47d",
                              fillOpacity: ".5",
                            }}/>
                        </Sparklines>
                      </td>
                      <td className="text-center">
                        <Button size="sm" color="primary" id={"PopoverCustomT-2"} onClick={this.togglePop2}>
                          Details
                        </Button>
                        <Popover className="popover-custom rm-pointers" placement="auto"
                          isOpen={this.state.popoverOpen2} target={"PopoverCustomT-2"} toggle={this.togglePop2}>
                          <PopoverBody>
                            <div className="dropdown-menu-header">
                              <div
                                className={classnames(
                                  "dropdown-menu-header-inner bg-danger"
                                )}>
                                <div className="menu-header-image"
                                  style={{
                                    backgroundImage: "url(" + bg1 + ")",
                                  }}/>
                                <div className="menu-header-content">
                                  <h5 className="menu-header-title">
                                    Settings
                                  </h5>
                                  <h6 className="menu-header-subtitle">
                                    Manage all of your options
                                  </h6>
                                </div>
                              </div>
                            </div>
                            <Nav vertical>
                              <NavItem className="nav-item-header">
                                Activity
                              </NavItem>
                              <NavItem>
                                <NavLink href="#">
                                  Chat
                                  <div className="ms-auto badge rounded-pill bg-info">
                                    8
                                  </div>
                                </NavLink>
                              </NavItem>
                              <NavItem>
                                <NavLink href="#">Recover Password</NavLink>
                              </NavItem>
                              <NavItem className="nav-item-divider" />
                              <NavItem className="nav-item-btn text-end">
                                <Button size="sm" className="btn-wide btn-shadow" color="success">
                                  Save
                                </Button>
                              </NavItem>
                            </Nav>
                          </PopoverBody>
                        </Popover>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-center text-muted">#321</td>
                      <td>
                        <div className="widget-content p-0">
                          <div className="widget-content-wrapper">
                            <div className="widget-content-left me-3">
                              <div className="widget-content-left">
                                <img width={40} className="rounded-circle" src={avatar3} alt=""/>
                              </div>
                            </div>
                            <div className="widget-content-left flex2">
                              <div className="widget-heading">Elliot Huber</div>
                              <div className="widget-subheading opacity-7">
                                Lorem ipsum dolor sic
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="text-center">London</td>
                      <td className="text-center">
                        <div className="badge bg-danger">In Progress</div>
                      </td>
                      <td className="text-center" style={{ width: "150px" }}>
                        <Sparklines height={60} data={sampleData}>
                          <SparklinesBars
                            style={{
                              stroke: "none",
                              fill: "#d92550",
                              fillOpacity: ".5",
                            }}/>
                        </Sparklines>
                      </td>
                      <td className="text-center">
                        <Button size="sm" color="primary" id={"PopoverCustomT-3"} onClick={this.togglePop3}>
                          Details
                        </Button>
                        <Popover className="popover-custom rm-pointers" placement="auto"
                          isOpen={this.state.popoverOpen3} target={"PopoverCustomT-3"} toggle={this.togglePop3}>
                          <PopoverBody>
                            <div className="dropdown-menu-header">
                              <div
                                className={classnames(
                                  "dropdown-menu-header-inner bg-focus"
                                )}>
                                <div className="menu-header-image"
                                  style={{
                                    backgroundImage: "url(" + bg1 + ")",
                                  }}/>
                                <div className="menu-header-content">
                                  <h5 className="menu-header-title">
                                    Settings
                                  </h5>
                                  <h6 className="menu-header-subtitle">
                                    Manage all of your options
                                  </h6>
                                </div>
                              </div>
                            </div>
                            <Nav vertical>
                              <NavItem className="nav-item-header">
                                Activity
                              </NavItem>
                              <NavItem>
                                <NavLink href="#">
                                  Chat
                                  <div className="ms-auto badge rounded-pill bg-info">
                                    8
                                  </div>
                                </NavLink>
                              </NavItem>
                              <NavItem>
                                <NavLink href="#">Recover Password</NavLink>
                              </NavItem>
                              <NavItem className="nav-item-divider" />
                              <NavItem className="nav-item-btn text-center">
                                <Button size="sm" className="btn-wide btn-shadow" color="danger">
                                  Cancel
                                </Button>
                              </NavItem>
                            </Nav>
                          </PopoverBody>
                        </Popover>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-center text-muted">#55</td>
                      <td>
                        <div className="widget-content p-0">
                          <div className="widget-content-wrapper">
                            <div className="widget-content-left me-3">
                              <div className="widget-content-left">
                                <img width={40} className="rounded-circle" src={avatar4} alt=""/>
                              </div>
                            </div>
                            <div className="widget-content-left flex2">
                              <div className="widget-heading">
                                Vinnie Wagstaff
                              </div>
                              <div className="widget-subheading opacity-7">
                                UI Designer
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="text-center">Amsterdam</td>
                      <td className="text-center">
                        <div className="badge bg-info">On Hold</div>
                      </td>
                      <td className="text-center" style={{ width: "150px" }}>
                        <Sparklines height={60} data={sampleData}>
                          <SparklinesLine
                            style={{
                              strokeWidth: 3,
                              stroke: "#f7b924",
                              fill: "#f7b924",
                              fillOpacity: ".2",
                            }}/>
                        </Sparklines>
                      </td>
                      <td className="text-center">
                        <Button size="sm" color="primary" id={"PopoverCustomT-4"} onClick={this.togglePop4}>
                          Details
                        </Button>
                        <Popover className="popover-custom rm-pointers" placement="auto"
                          isOpen={this.state.popoverOpen4} target={"PopoverCustomT-4"} toggle={this.togglePop4}>
                          <PopoverBody>
                            <div className="dropdown-menu-header">
                              <div
                                className={classnames(
                                  "dropdown-menu-header-inner bg-focus"
                                )}>
                                <div className="menu-header-image"
                                  style={{
                                    backgroundImage: "url(" + bg1 + ")",
                                  }}/>
                                <div className="menu-header-content">
                                  <h5 className="menu-header-title">
                                    Settings
                                  </h5>
                                  <h6 className="menu-header-subtitle">
                                    Manage all of your options
                                  </h6>
                                </div>
                              </div>
                            </div>
                            <Nav vertical>
                              <NavItem className="nav-item-header">
                                Activity
                              </NavItem>
                              <NavItem>
                                <NavLink href="#">
                                  Chat
                                  <div className="ms-auto badge rounded-pill bg-info">
                                    8
                                  </div>
                                </NavLink>
                              </NavItem>
                              <NavItem>
                                <NavLink href="#">Recover Password</NavLink>
                              </NavItem>
                              <NavItem className="nav-item-divider" />
                              <NavItem className="nav-item-btn text-center">
                                <Button size="sm" className="btn-wide btn-shadow" color="danger">
                                  Cancel
                                </Button>
                              </NavItem>
                            </Nav>
                          </PopoverBody>
                        </Popover>
                      </td>
                    </tr>
                  </tbody>
                </Table>
                <CardFooter className="d-block text-center">
                  <Button className="me-2 btn-icon btn-icon-only" outline color="danger">
                    <i className="pe-7s-trash btn-icon-wrapper"> </i>
                  </Button>
                  <Button className="btn-wide" color="success">
                    Save
                  </Button>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        
        </Container>
      </Fragment>
    );
  }
}
