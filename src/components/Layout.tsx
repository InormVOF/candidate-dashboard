import * as React from "react";
import logo from "../images/logo.png";

interface Props {
  header?: React.ReactNode;
  children: React.ReactNode;
}

const Layout = ({ header = null, children }: Props) => (
  <div className="p-2">
    <header className="flex justify-center pb-2">
      <div className="mr-4">
        <img src={logo} className="h-12 self-center" />
      </div>
      {header}
    </header>
    <main>{children}</main>
  </div>
);

export default Layout;
