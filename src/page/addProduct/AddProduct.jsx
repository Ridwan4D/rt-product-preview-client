import { useForm } from "react-hook-form";
import SectionTitle from "../../components/SectionTitle";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const AddPackage = () => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    // const info = {tour_name,description,trip_type,price,image_1,image_2,image_3,image_4,quantity,activities1,activities2,activities3,activities4}
    const onSubmit = async (data) => {
        const imageFile1 = { image: data.image1[0] };
        const imageFile2 = { image: data.image2[0] };
        // console.log(imageFile);
        const res1 = await axiosPublic.post(image_hosting_api, imageFile1, {
            headers: {
                "content-type": "multipart/form-data",
            },
        });
        const res2 = await axiosPublic.post(image_hosting_api, imageFile2, {
            headers: {
                "content-type": "multipart/form-data",
            },
        });
        const packageInfo = {
            product_name: data.name,
            description: data.description,
            product_type: data.type,
            quantity: data.quantity,
            price: data.price,
            image_1: res1.data.data.display_url,
            image_2: res2.data.data.display_url,
        };
        axiosSecure.post("/packages", packageInfo).then((res) => {
            if (res.data.insertedId) {
                toast.success(`${data.name} is added in package`);
                navigate("/allPackages");
                reset();
            }
        });
    };
    return (
        <div>
            <Helmet>
                <title>Add Product | RT Products</title>
            </Helmet>
            <SectionTitle
                heading="Add Product"
            />

            <form
                className="max-w-4xl mx-auto border-2 border-slate-400 p-2 md:p-6"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="grid gap-x-6 gap-y-2 md:gap-y-3 mb-6 md:grid-cols-2">
                    <div>
                        <label
                            htmlFor="name"
                            className="block md:mb-2 text-xs md:text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Product Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            {...register("name", { required: true })}
                            className="bg-gray-50 border border-gray-300 text-gray-900 h-7 md:h-auto text-xs md:text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                        {errors.name && (
                            <span className="text-sm text-red-600 font-semibold">
                                Fill This Field
                            </span>
                        )}
                    </div>
                    <div>
                        <label
                            htmlFor="type"
                            className="block md:mb-2 text-xs md:text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Type
                        </label>
                        <input
                            type="text"
                            id="type"
                            {...register("type", { required: true })}
                            className="bg-gray-50 border border-gray-300 text-gray-900 h-7 md:h-auto text-xs md:text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                        {errors.type && (
                            <span className="text-sm text-red-600 font-semibold">
                                Fill This Field
                            </span>
                        )}
                    </div>
                    <div>
                        <label
                            htmlFor="price"
                            className="block md:mb-2 text-xs md:text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Price
                        </label>
                        <input
                            type="number"
                            id="price"
                            {...register("price", { required: true })}
                            className="bg-gray-50 border border-gray-300 text-gray-900 h-7 md:h-auto text-xs md:text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                        {errors.price && (
                            <span className="text-sm text-red-600 font-semibold">
                                Fill This Field
                            </span>
                        )}
                    </div>
                    <div>
                        <label
                            htmlFor="quantity"
                            className="block md:mb-2 text-xs md:text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Quantity
                        </label>
                        <input
                            type="number"
                            id="quantity"
                            {...register("quantity", { required: true })}
                            className="bg-gray-50 border border-gray-300 text-gray-900 h-7 md:h-auto text-xs md:text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                        {errors.quantity && (
                            <span className="text-sm text-red-600 font-semibold">
                                Fill This Field
                            </span>
                        )}
                    </div>
                    <div>
                        <label
                            htmlFor="file_input"
                            className="block md:mb-2 text-xs md:text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Image 1
                        </label>
                        <input
                            type="file"
                            {...register("image1", { required: true })}
                            id="file_input"
                            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        />
                        {errors.image1 && (
                            <span className="text-sm text-red-600 font-semibold">
                                Fill This Field
                            </span>
                        )}
                    </div>
                    <div>
                        <label
                            htmlFor="file_input"
                            className="block md:mb-2 text-xs md:text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Image 2
                        </label>
                        <input
                            type="file"
                            {...register("image2", { required: true })}
                            id="file_input"
                            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        />
                        {errors.image2 && (
                            <span className="text-sm text-red-600 font-semibold">
                                Fill This Field
                            </span>
                        )}
                    </div>
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="description"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Product Description
                    </label>
                    <textarea
                        type="text"
                        id="description"
                        {...register("description", { required: true })}
                        className="bg-gray-50 border w-full border-gray-300 text-gray-900 h-7 md:h-auto text-xs md:text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    {errors.description && (
                        <span className="text-sm text-red-600 font-semibold">
                            Fill This Field
                        </span>
                    )}
                </div>
                <input
                    type="submit"
                    value="Add Product"
                    className="text-white w-full bg-slate-400 hover:bg-slate-600 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-xs text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                />
            </form>
        </div>
    );
};

export default AddPackage;
