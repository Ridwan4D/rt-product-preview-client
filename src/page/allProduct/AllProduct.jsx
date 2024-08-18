import { Helmet } from "react-helmet";
import useProduct from "../../hooks/useProduct";
import ProductCard from "../../components/ProductCard";

const AllProduct = () => {
    const [products] = useProduct();
    // console.log(packages);
    return (
        <div>
            <Helmet>
                <title>Products | RT Products</title>
            </Helmet>
            <h2 className="mb-4 text-2xl px-14 md:px-1 border-l-4 border-b-2 pt-3 md:pt-0 pb-2 border-slate-400 bg-slate-400 md:bg-white md:text-4xl tracking-tight font-extrabold text-gray-700 dark:text-white">
                Have a Look at All Products
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-6 md:mb-20">
                {
                    products.map((pack, idx) => <ProductCard key={idx} pack={pack}></ProductCard>)
                }
            </div>
        </div>
    );
};

export default AllProduct;
