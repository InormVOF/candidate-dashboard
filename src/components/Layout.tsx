import { Script } from "gatsby";
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
          <img src={logo} className="h-14" />
        </a>
        {header}
      </nav>
    </header>
    <main>{children}</main>
    <Script src="https://embed.small.chat/T03R6AEGURZC040EJKBW00.js" />
  </div>
);

export default Layout;
