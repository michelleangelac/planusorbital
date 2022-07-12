import React from "react";
import Tabs from "../components/Sidebar/Tabs";

import './Groups.css';
import "@fontsource/inter";

function Groups() {
  return (
    <div>
      <div className="container-grp">
        <div className="sidebar-grp">
          <Tabs/>
        </div>
        <div className="content-grp">
          <h1 style={{ fontFamily: 'Inter' }}>Groups</h1>
        </div>
      </div>
    </div>
  )
}

export default Groups;