import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

const Layout = () => {
    return (
        <div className="max-w-7xl mx-auto">
            <Nav />
            <div><Outlet /></div>
            <Footer />
        </div>
    );
};

export default Layout;