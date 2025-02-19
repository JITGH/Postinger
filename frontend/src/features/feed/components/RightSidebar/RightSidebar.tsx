import { Button } from "../../../../components/Button/Button";
import classes from "./RightSidebar.module.scss";
export function RightSidebar() {
  return (
    <div className={classes.root}>
      <h3>Add to your connexions</h3>
      <div className={classes.items}>
        <div className={classes.item}>
          <img
            src="https://i.pravatar.cc/300"
            alt=""
            className={classes.avatar}
          />
          <div className={classes.content}>
            <div className={classes.name}>Anis Doe</div>
            <div className={classes.title}>Content Writer BBC</div>
            <Button size="medium" outline className={classes.button}>
              + Connect
            </Button>
          </div>
        </div>
        <div className={classes.item}>
          <img
            src="https://plus.unsplash.com/premium_photo-1664541336896-b3d5f7dec9a3?q=80&w=3687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            className={classes.avatar}
          />
          <div className={classes.content}>
            <div className={classes.name}>Jana Corner</div>
            <div className={classes.title}>Technical Writer NewYorks Time</div>
            <Button size="medium" outline className={classes.button}>
              + Connect
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
