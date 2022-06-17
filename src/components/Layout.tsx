import * as React from "react";
import logo from "../images/logo.png";

const Layout = ({ header = null, children }) => (
  <div className="p-2">
    <header className="flex justify-center pb-2">
      <div className="mr-4">
        <img src={logo} className="w-24 self-center" />
      </div>
      {header}
    </header>
    <main>{children}</main>
  </div>
);

export default Layout;
