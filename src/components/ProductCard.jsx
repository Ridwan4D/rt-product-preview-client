import PropType from "prop-types";
import { Link } from "react-router-dom";
import useUsers from "../hooks/useUsers";

// =============================================

// =============================================

const ProductCard = ({ pack }) => {
    const { image_1, product_name, product_type, price, _id, adderMail } = pack;
    const { theUser } = useUsers();

    return (
        <div className="block bg-white shadow-secondary-1 dark:bg-surface-dark">
            <div
                className="flex items-center justify-center border-2 border-gray-700 rounded-t-lg relative bg-cover bg-no-repeat p-5"
                data-twe-ripple-init
                data-twe-ripple-color="light"
            >
                <img className="rounded-t-lg md:h-64 w-auto" src={image_1} alt="" />
            </div>
            <div className="text-surface space-y-1 text-white bg-gray-700 rounded-b-lg px-5 py-2">
                <h5 className="text-base md:text-xl font-medium leading-tight">
                    <span className="text-gray-200">Name:</span> {product_name.slice(0, 25)}...
                </h5>
                <p className="text-base md:text-xl">
                    <span className="font-semibold text-gray-300">Type:</span>{" "}
                    {product_type}
                </p>
                <p className="text-base md:text-lg font-semibold">
                    <span className="text-gray-300">Price: </span>${price}
                </p>
                <div className="flex flex-col md:flex-row justify-between space-y-1">
                    <Link
                        to={`/details/${_id}`}
                        className="inline-block rounded bg-slate-400 px-4 md:px-6 pb-1 md:pb-2 pt-1.5 md:pt-2.5 text-center text-xs md:font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                        data-twe-ripple-init
                        data-twe-ripple-color="light"
                    >
                        View Product
                    </Link>

                    {theUser?.userEmail === adderMail && (
                        <Link
                            to={`/updatePackage/${_id}`}
                            className="inline-block rounded bg-slate-400 px-4 md:px-6 pb-1 md:pb-2 pt-1.5 md:pt-2.5 text-center text-xs md:font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                            data-twe-ripple-init
                            data-twe-ripple-color="light"
                        >
                            Update Product
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};
ProductCard.propTypes = {
    pack: PropType.object,
};
export default ProductCard;
