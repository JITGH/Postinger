import classes from "./Loader.module.scss";
export function Loader() {
  return (
    <div className={classes.root}>
      <img src="/blog.png" alt="Loading..." />
      <div className={classes.container}>
        <div className={classes.content}></div>
      </div>
    </div>
  );
}
