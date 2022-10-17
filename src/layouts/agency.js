import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from 'react-redux'
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Navbar from "components/Navbars/Navbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import AgencyAgentRoutes from "routes/agencyAgentRoutes";
import AgencyAdminRoutes from "routes/agencyAdminRoutes";
import styles from "assets/jss/material-dashboard-react/layouts/adminStyle.js";
import logo from "assets/logo.png";

let ps;

const switchRoutes = (routes) => (
    <Switch>
        {routes.map((prop, key) => {
            if (prop.layout === "/agency") {
                return (
                    <Route
                        path={prop.layout + prop.path}
                        component={prop.component}
                        key={key}
                    />
                );
            }
            return null;
        })}
        {/* <Redirect from="/agency" to="/agency/dashboard" /> */}
    </Switch>
);

const useStyles = makeStyles(styles);

export default function Agency({ ...rest }) {
    const role = useSelector(({ user: { user: { systemRole } } }) => systemRole)
    // styles
    const classes = useStyles();
    // ref to help us initialize PerfectScrollbar on windows devices
    const mainPanel = React.createRef();
    // states and functions
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [routes, setRoutes] = React.useState([]);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const resizeFunction = () => {
        if (window.innerWidth >= 960) {
            setMobileOpen(false);
        }
    };

    // initialize and destroy the PerfectScrollbar plugin
    React.useEffect(() => {
        if (navigator.platform.indexOf("Win") > -1) {
            ps = new PerfectScrollbar(mainPanel.current, {
                suppressScrollX: true,
                suppressScrollY: false,
            });
            document.body.style.overflow = "hidden";
        }
        window.addEventListener("resize", resizeFunction);

        role === 'AGENT' ?
            setRoutes(AgencyAgentRoutes) :
            setRoutes(AgencyAdminRoutes)

        // Specify how to clean up after this effect:
        return function cleanup() {
            if (navigator.platform.indexOf("Win") > -1) {
                ps.destroy();
            }
            window.removeEventListener("resize", resizeFunction);
        };
    }, [role, mainPanel]);

    return (
        <div className={classes.wrapper}>
            <Sidebar
                routes={routes}
                logoText={"Fly With Zoki"}
                logo={logo}
                handleDrawerToggle={handleDrawerToggle}
                open={mobileOpen}
                color="zoki_color"
                {...rest}
            />
            <div className={classes.mainPanel} ref={mainPanel}>
                <Navbar
                    routes={routes}
                    handleDrawerToggle={handleDrawerToggle}
                    {...rest}
                />
                <div className={classes.content}>
                    <div className={classes.container}>{switchRoutes(routes)}</div>
                </div>
            </div>
        </div>
    );
}
