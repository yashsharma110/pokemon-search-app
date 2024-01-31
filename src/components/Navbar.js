import classes from "./Navbar.module.css";

function Navbar() {
  return (
    <div className={classes.nav}>
      <div className={classes.navHeading}>Pokemon Search App</div>
    </div>
  );
}

export default Navbar;
