import React from "react";
import { Dispatch, SetStateAction } from "react";
import classes from "./Profile.module.scss";
import { useAuthentication } from "../../../features/authentication/contexts/AuthenticationContextProvider";
import { Button } from "../../Button/Button";
import { Link, useNavigate } from "react-router-dom";
interface ProfileProps {
  setShowNavigationMenu: Dispatch<SetStateAction<boolean>>;
  setShowProfileMenu: Dispatch<SetStateAction<boolean>>;
  showProfileMenu: boolean;
}
export function Profile({
  showProfileMenu,
  setShowProfileMenu,
  setShowNavigationMenu,
}: ProfileProps) {
  const authContext = useAuthentication();
  if (!authContext) {
    return null;
  }
  const { user } = authContext;
  function logout() {
    throw new Error("Function not implemented.");
  }
  const navigate = useNavigate();
  return (
    <div className={classes.root}>
      <button
        className={classes.toggle}
        onClick={() => {
          setShowProfileMenu((prev) => !prev);
          if (window.innerWidth <= 1080) {
            setShowNavigationMenu(false);
          }
        }}
      >
        <img
          className={`${classes.top} ${classes.avatar}`}
          src={user?.profilePicture || "/avatar.png"}
          alt=""
        />
        <div className={classes.name}>
          <div>{user?.firstName + " " + user?.lastName?.charAt(0) + "."}</div>
        </div>
      </button>

      {showProfileMenu ? (
        <div className={classes.menu}>
          <div className={classes.content}>
            <img
              className={`${classes.left} ${classes.avatar}`}
              src={user?.profilePicture || "/avatar.svg"}
              alt=""
            />
            <div className={classes.right}>
              <div className={classes.name}>
                {user?.firstName + " " + user?.lastName}
              </div>
              <div className={classes.title}>
                {user?.position + " at " + user?.company}
              </div>
            </div>
          </div>
          <div className={classes.links}>
            <Button
              size="small"
              className={classes.button}
              outline
              onClick={() => {
                setShowProfileMenu(false);
                navigate("/profile/" + user?.id);
              }}
            >
              View Profile
            </Button>

            <Link to="/settings" onClick={() => setShowProfileMenu(false)}>
              Settings & Privacy
            </Link>
            <Link
              to="/logout"
              onClick={(e) => {
                e.preventDefault();
                logout();
              }}
            >
              Sign Out
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
