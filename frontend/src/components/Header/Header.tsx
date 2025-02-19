import React, { useEffect, useState, Fragment } from "react";
import classes from "./header.module.scss";
import { NavLink } from "react-router-dom";
import { Input } from "../Input/Input";
import { useAuthentication } from "../../features/authentication/contexts/AuthenticationContextProvider";
import { Profile } from "./components/Profile";
import { useWebSocket } from "../../features/ws/WebSocketContextProvider";
import { Notification } from "../../features/feed/pages/Notifications/Notifications";
import { request } from "../../utils/api";
export function Header() {
  const authContext = useAuthentication();
  const user = authContext ? authContext.user : null;
  const webSocketClient = useWebSocket();
  const [showProfileMenu, setShowProfileMenu] = React.useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const nonReadNotificationCount = notifications.filter(
    (notification) => !notification.read
  ).length;
  const [showNavigationMenu, setShowNavigationMenu] = React.useState(
    window.innerWidth > 1080 ? true : false
  );
  useEffect(() => {
    const handleResize = () => {
      setShowNavigationMenu(window.innerWidth > 1080);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    request<Notification[]>({
      endpoint: "/api/v1/notifications",
      onSuccess: setNotifications,
      onFailure: (error) => console.log(error),
    });
  }, []);

  useEffect(() => {
    const subscribtion = webSocketClient?.subscribe(
      `/topic/users/${user?.id}/notifications`,
      (message) => {
        const notification = JSON.parse(message.body);
        setNotifications((prev) => {
          const index = prev.findIndex((n) => n.id === notification.id);
          if (index === -1) {
            return [notification, ...prev];
          }
          return prev.map((n) => (n.id === notification.id ? notification : n));
        });
      }
    );
    return () => subscribtion?.unsubscribe();
  }, [user?.id, webSocketClient]);

  return (
    <header className={classes.root}>
      <div className={classes.container}>
        <div className={classes.left}>
          <NavLink to="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              fill="currentColor"
              width="50"
              height="50"
            >
              <rect
                x="0"
                y="0"
                width="512"
                height="512"
                rx="50"
                fill="#4a90e2"
              />
              <path
                d="M128 160h256v32H128zm0 64h192v32H128zm0 64h128v32H128zm-16-176c-22.09 0-40 17.91-40 40v176c0 22.09 17.91 40 40 40h256c22.09 0 40-17.91 40-40V160c0-22.09-17.91-40-40-40H112zm0-32h256c39.8 0 72 32.2 72 72v176c0 39.8-32.2 72-72 72H112c-39.8 0-72-32.2-72-72V160c0-39.8 32.2-72 72-72zm336 0h16v16H448V64zM128 32h256v32H128z"
                fill="white"
              />
              <path
                d="M352 320h-80v-80h80v80zm0-96h-80v-80h80v80z"
                fill="white"
                transform="translate(40,-40)"
              />
            </svg>
          </NavLink>
          <Input placeholder="Search" size={"medium"} />
        </div>
        <div className={classes.right}>
          <button
            className={classes.toggle}
            onClick={() => {
              setShowNavigationMenu((prev) => !prev);
              setShowProfileMenu(false);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              fill="currentColor"
            >
              <path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z" />
            </svg>
            <span>Menu</span>
          </button>

          {showNavigationMenu ? (
            <ul>
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) => (isActive ? classes.active : "")}
                  onClick={() => {
                    setShowProfileMenu(false);
                    if (window.innerWidth <= 1080) {
                      setShowNavigationMenu(false);
                    }
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    width="24"
                    height="24"
                    focusable="false"
                  >
                    <path d="M23 9v2h-2v7a3 3 0 01-3 3h-4v-6h-4v6H6a3 3 0 01-3-3v-7H1V9l11-7 5 3.18V2h3v5.09z"></path>
                  </svg>
                  <span>Home</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  onClick={() => {
                    setShowProfileMenu(false);
                    if (window.innerWidth <= 1080) {
                      setShowNavigationMenu(false);
                    }
                  }}
                  to="/network"
                  className={({ isActive }) => (isActive ? classes.active : "")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    focusable="false"
                  >
                    <path d="M12 16v6H3v-6a3 3 0 013-3h3a3 3 0 013 3zm5.5-3A3.5 3.5 0 1014 9.5a3.5 3.5 0 003.5 3.5zm1 2h-2a2.5 2.5 0 00-2.5 2.5V22h7v-4.5a2.5 2.5 0 00-2.5-2.5zM7.5 2A4.5 4.5 0 1012 6.5 4.49 4.49 0 007.5 2z"></path>
                  </svg>
                  <span>Network</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/jobs"
                  className={({ isActive }) => (isActive ? classes.active : "")}
                  onClick={() => {
                    setShowProfileMenu(false);
                    if (window.innerWidth <= 1080) {
                      setShowNavigationMenu(false);
                    }
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    focusable="false"
                  >
                    <path d="M17 6V5a3 3 0 00-3-3h-4a3 3 0 00-3 3v1H2v4a3 3 0 003 3h14a3 3 0 003-3V6zM9 5a1 1 0 011-1h4a1 1 0 011 1v1H9zm10 9a4 4 0 003-1.38V17a3 3 0 01-3 3H5a3 3 0 01-3-3v-4.38A4 4 0 005 14z"></path>
                  </svg>
                  <span>Jobs</span>
                </NavLink>
              </li>
              <li className={classes.messaging}>
                <NavLink
                  onClick={() => {
                    setShowProfileMenu(false);
                    if (window.innerWidth <= 1080) {
                      setShowNavigationMenu(false);
                    }
                  }}
                  to="/messaging"
                  className={({ isActive }) => (isActive ? classes.active : "")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    focusable="false"
                  >
                    <path d="M16 4H8a7 7 0 000 14h4v4l8.16-5.39A6.78 6.78 0 0023 11a7 7 0 00-7-7zm-8 8.25A1.25 1.25 0 119.25 11 1.25 1.25 0 018 12.25zm4 0A1.25 1.25 0 1113.25 11 1.25 1.25 0 0112 12.25zm4 0A1.25 1.25 0 1117.25 11 1.25 1.25 0 0116 12.25z"></path>
                  </svg>
                  <div>
                    <span>Messaging</span>
                  </div>
                </NavLink>
              </li>
              <li className={classes.notifications}>
                <NavLink
                  onClick={() => {
                    setShowProfileMenu(false);
                    if (window.innerWidth <= 1080) {
                      setShowNavigationMenu(false);
                    }
                  }}
                  to="/notifications"
                  className={({ isActive }) => (isActive ? classes.active : "")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    focusable="false"
                  >
                    <path d="M22 19h-8.28a2 2 0 11-3.44 0H2v-1a4.52 4.52 0 011.17-2.83l1-1.17h15.7l1 1.17A4.42 4.42 0 0122 18zM18.21 7.44A6.27 6.27 0 0012 2a6.27 6.27 0 00-6.21 5.44L5 13h14z"></path>
                  </svg>
                  <div>
                    {nonReadNotificationCount > 0 ? (
                      <span className={classes.badge}>
                        {nonReadNotificationCount}
                      </span>
                    ) : null}
                    <span>Notications</span>
                  </div>
                </NavLink>
              </li>
            </ul>
          ) : null}

          {user ? (
            <Profile
              setShowNavigationMenu={setShowNavigationMenu}
              showProfileMenu={showProfileMenu}
              setShowProfileMenu={setShowProfileMenu}
            />
          ) : null}
        </div>
      </div>
    </header>
  );
}
