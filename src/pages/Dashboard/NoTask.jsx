import React from "react";
import { Divider } from "@mui/material";

export default function NoTask() {
    return (
      <>
        <div><Divider/></div>
        <div className="paper-text2" style={{ textAlign: 'center', margin: '2% 0 2% 0' }}>
          You don't have any uncompleted tasks.
        </div>
      </>
    )
}