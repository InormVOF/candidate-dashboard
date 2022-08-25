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
    <Script>
      {`
      window.Smallchat = {
        config: {
            "slackTeamId": "T03R6AEGURZ",
            "scChannelId": "-NAK9_bl7fX6iFtNQcHX",
            "slackChannelId": "C040EJKBW00",
            "uid": "-NAK9WCnochab6LYFipF",
            "planId": null,
            "accountCreated": 1661433680865
        },
        behavior: {
            "avatar_config": 0,
            "hide_offline": true,
            "operating_hours": true,
            "saturday": {
                "disabled": true
            },
            "sunday": {
                "disabled": true
            },
            "timezone": "Europe/Amsterdam"
        },
    };
    var styles = document.createElement('link');
    styles.rel = 'stylesheet';
    styles.href = 'https://static.small.chat/messenger.css';
    document.head.appendChild(styles);
    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://static.small.chat/messenger.js';
    document.body.appendChild(script);
    `}
    </Script>
  </div>
);

export default Layout;
