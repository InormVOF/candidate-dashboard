import * as React from "react";
import logo from "../images/logo.png";

interface Props {
  header?: React.ReactNode;
  children: React.ReactNode;
}

const Layout = ({ header = null, children }: Props) => (
  <div className="p-2">
    <header className="flex pb-2">
      <div className="m-4 ml-8">
        <img src={logo} className="h-10" />
      </div>
      {header}
    </header>
    <main>{children}</main>
  </div>
);

export default Layout;
