import React, { Fragment } from "react";
import { CSSTransition, TransitionGroup  } from '../../../utils/TransitionWrapper';

import PageTitle from "../../../Layout/AppMain/PageTitle";

import Tabs, { TabPane } from '../../../utils/TabsWrapper';
import { TabContent } from '../../../utils/TabsWrapper';
import { ScrollableInkTabBar } from '../../../utils/TabsWrapper';

// Examples
import TabsExample from "./Examples/Basic";
import CardTabsExample from "./Examples/CardTabs";
import { useAuth } from "../../../Context/AuthContext";
const TabExample = () => {
  const { user, onLogout } = useAuth();

  return (
      <Fragment>
        <TransitionGroup>
          <CSSTransition component="div" classNames="TabsAnimation" appear={true}
            timeout={1500} enter={false} exit={false}>
            <div>  
        <PageTitle
              heading={`Welcome to ${user?.username || "Guest"}`}
              icon="pe-7s-cash"
            />
                 <CardTabsExample />
              <Tabs defaultActiveKey="1" renderTabBar={() => <ScrollableInkTabBar />} renderTabContent={() => <TabContent />}>
                {/* <TabPane tab="Advanced" key="1"> */}
                 
                {/* </TabPane>
                <TabPane tab="Basic" key="2">
                  <TabsExample />
                </TabPane> */}
              </Tabs>
            </div>
          </CSSTransition>
        </TransitionGroup>
      </Fragment>
    );
};

export default TabExample;