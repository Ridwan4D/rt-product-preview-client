import { Helmet } from "react-helmet";
import PackageCard from "../../../components/PackageCard";
import usePackage from "../../../hooks/usePackage";

const AllProduct = () => {
    const [packages] = usePackage();
    // console.log(packages);
    return (
        <div>
            <Helmet>
                <title>Packages | Reez Tour Guide</title>
            </Helmet>
            <h2 className="mb-4 text-2xl px-14 md:px-1 border-b-2 pt-3 md:pt-0 pb-2 border-[#10b981] bg-[#10b981] md:bg-white md:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white text-center">
                All Packages of{" "}
                <span className="text-white md:text-[#10b981]">Reez Tour Guide</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-6 md:mb-20">
                {
                    packages.map((pack, idx) => <PackageCard key={idx} pack={pack}></PackageCard>)
                }
            </div>
        </div>
    );
};

export default AllProduct;
