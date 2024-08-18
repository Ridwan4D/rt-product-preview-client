import { Helmet } from "react-helmet";
import Slider from "./Shared/Slider";

const Home = () => {
    return (
        <div className="space-y-10">
            <Helmet>
                <title>Home | RT Products</title>
            </Helmet>
            {/* Slider */}
            <Slider />
        </div>
    );
};

export default Home;