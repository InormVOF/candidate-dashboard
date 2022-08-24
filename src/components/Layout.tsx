import * as React from "react";
import logo from "../images/logo.png";

interface Props {
  header?: React.ReactNode;
  children: React.ReactNode;
}

const Layout = ({ header = null, children }: Props) => (
  <div>
    <header className="pb-2">
      <nav className="flex items-center justify-between max-w-screen-xl p-4 mx-auto">
        <a className="inline-flex items-center justify-center" href="/">
          <img src={logo} className="h-10" />
        </a>
        {header}
      </nav>
    </header>
    <main>{children}</main>
  </div>
);

export default Layout;
