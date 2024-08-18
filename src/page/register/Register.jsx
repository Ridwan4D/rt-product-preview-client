import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { updateProfile } from "firebase/auth";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SocialLogin from "../../components/SocialLogin";

const Register = () => {
    const { createUser } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const [isError, setIsError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

    const onSubmit = async (data) => {
        setIsError("");
        if (
            !/^(?=.*[A-Z]).+$/.test(data.password) &&
            !/^(?=.*[a-z]).+$/.test(data.password)
        ) {
            setIsError("Use minimum 1 upper & 1 lower case in password");
            return;
        }
        if (!/^(?=.*[A-Z]).+$/.test(data.password)) {
            setIsError("Use minimum 1 upper case in password");
            return;
        }
        if (!/^(?=.*[a-z]).+$/.test(data.password)) {
            setIsError("Use minimum 1 lower case in password");
            return;
        }
        if (data.password != data.confirmPassword) {
            setIsError("Password doesn't matched");
            return;
        }
        const imageFile = { image: data.image[0] };
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                "content-type": "multipart/form-data",
            },
        });
        createUser(data.email, data.password)
            .then((result) => {
                updateProfile(result.user, {
                    displayName: data.name,
                    photoURL: res.data.data.display_url,
                })
                    .then(() => {
                        const userInfo = {
                            userName: data.name,
                            userEmail: data.email,
                            userImage: res.data.data.display_url,
                        };
                        axiosPublic
                            .post("/users", userInfo)
                            .then((reqRes) => {
                                if (reqRes.data.insertedId) {
                                    // console.log("user added to the data base");
                                    toast.success("Account Created Successfully");
                                    // navigate after register
                                    setTimeout(() => {
                                        navigate(location?.state ? location.state : "/");
                                    }, 1000);
                                }
                            })
                            .catch((err) => {
                                console.log(err.message);
                            });
                        console.log(userInfo);
                    })
                    .catch((error) => {
                        console.log(error.message);
                    });
            })
            .catch((error) => {
                if (error.message == "Firebase: Error (auth/email-already-in-use).") {
                    toast.error("Email Already in Use");
                } else {
                    setIsError(error.message);
                }
            });
    };
    return (
        <div className="flex flex-col lg:flex-row min-h-screen mt-10 bg-gray-100 p-8">
            {/* Left Side - Registration Form */}
            <div className="lg:w-1/2 flex justify-center items-center">
                <div className="max-w-md w-full mx-auto p-8 bg-white rounded-lg shadow-lg">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-start">
                        Create an account
                    </h2>
                    {/* social login */}
                    <SocialLogin />
                    {/* email login */}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-4">
                            <label className="block text-gray-700">Name</label>
                            <input
                                type="text"
                                {...register("name", { required: true })}
                                className="w-full p-2 border border-gray-300 rounded mt-1 hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                            {errors.name?.type === "required" && (
                                <p role="alert" className="text-sm text-red-600">
                                    Name is required
                                </p>
                            )}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Image</label>
                            <input
                                type="file"
                                {...register("image", { required: true })}
                                className="block w-full py-1 px-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                            />
                            {errors.image && (
                                <span className="text-sm text-red-600 font-semibold">
                                    Image is required
                                </span>
                            )}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Email</label>
                            <input
                                type="email"
                                {...register("email", { required: true })}
                                className="w-full p-2 border border-gray-300 rounded mt-1 hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                            {errors.email && (
                                <span className="text-sm text-red-600 font-semibold">
                                    Email is required
                                </span>
                            )}
                        </div>
                        <div className="mb-4 relative">
                            <label className="block text-gray-700">Password</label>
                            <div className="flex items-center">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    {...register("password", { required: true })}
                                    className="w-full p-2 border border-gray-300 rounded mt-1 hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-700"
                                >
                                    {showPassword ? (
                                        <FaEyeSlash className="mt-6" />
                                    ) : (
                                        <FaEye className="mt-6" />
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <span className="text-sm text-red-600 font-semibold">
                                    Password is required
                                </span>
                            )}
                        </div>
                        <div className="mb-6 relative">
                            <label className="block text-gray-700">Confirm Password</label>
                            <div className="flex items-center">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    {...register("confirmPassword", { required: true })}
                                    className="w-full p-2 border border-gray-300 rounded mt-1 hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                />
                                <button
                                    type="button"
                                    onClick={toggleConfirmPasswordVisibility}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-700"
                                >
                                    {showConfirmPassword ? (
                                        <FaEyeSlash className="mt-6" />
                                    ) : (
                                        <FaEye className="mt-6" />
                                    )}
                                </button>
                            </div>
                            {errors.confirmPassword && (
                                <span className="text-sm text-red-600 font-semibold">
                                    Password is required
                                </span>
                            )}
                        </div>
                        <input
                            type="submit"
                            value="Create an account"
                            className="bg-indigo-500 hover:bg-indigo-600 cursor-pointer text-white py-2 px-4 w-full rounded focus:outline-none focus:bg-indigo-600 transition duration-300 ease-in-out transform hover:scale-105"
                        />
                    </form>
                    {isError && (
                        <p className="text-sm font-semibold text-red-600 dark:text-gray-400 mt-3">
                            {isError}
                        </p>
                    )}
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400 mt-3">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                        >
                            Login here
                        </Link>
                    </p>
                </div>
            </div>
            {/* Right Side - Responsive Image */}
            <div
                className="lg:w-1/2 h-full lg:h-screen bg-cover bg-center"
                style={{ backgroundImage: "url(https://i.ibb.co/Ybx2VfG/Mobile-login.jpg)" }}
            >
                <div className="h-full bg-black bg-opacity-50"></div>
            </div>
        </div>
    );
};

export default Register;
