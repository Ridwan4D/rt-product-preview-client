import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import Home from "../page/home/Home";
import Register from "../page/register/Register";


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
        ]
    }
])

export default router;