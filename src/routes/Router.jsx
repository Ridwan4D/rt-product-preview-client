import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import Home from "../page/home/Home";
import Register from "../page/register/Register";
import Login from "../page/login/Login";
import AddProduct from "../page/addProduct/AddProduct";
import AllProduct from "../page/allProduct/AllProduct";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        // errorElement: <Error />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "/register",
                element: <Register />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/addProduct",
                element: <AddProduct />,
            },
            {
                path: "/allProduct",
                element: <AllProduct />,
            },
        ]
    }
])

export default router;