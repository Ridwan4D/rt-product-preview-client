import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import SocialLogin from "../../components/SocialLogin";

const Login = () => {
    const { loginUser } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isError, setIsError] = useState("");
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();
    const onSubmit = async (data) => {
        const email = data.email;
        const pass = data.password;
        loginUser(email, pass)
            .then(() => {
                // console.log(result.user);
                toast.success("Logged In");
                setTimeout(() => {
                    navigate(location?.state ? location.state : "/");
                }, 1000);
            })
            .catch((error) => {
                // console.log(error.message);
                if (error.message == "Firebase: Error (auth/invalid-credential).") {
                    setIsError("Invalid User or Password");
                }
            })
    }
    return (
        <div className="flex flex-col lg:flex-row h-full md:mt-10 bg-gray-300 py-10 md:px-10 md:py-10">
            {/* Left Side - Responsive Image */}
            <div
                className="lg:w-1/2 h-full lg:h-screen bg-cover bg-center"
                style={{ backgroundImage: "url(https://i.ibb.co/Bz0ZbM8/login.jpg)" }}
            >
                <div className="h-full bg-black bg-opacity-10"></div>
            </div>
            {/* Divider */}
            <div className="lg:w-1/12 md:border-l-2 mx-20 border-dashed border-slate-400 hidden lg:block"></div>
            {/* Right Side - Login Form */}
            <div className="lg:w-1/2 flex justify-center items-center p-6">
                <div className="max-w-md w-full mx-auto p-2 md:p-8 bg-white rounded-lg shadow-lg">
                    <h1 className="text-2xl lg:text-4xl font-medium text-gray-900 mb-4 text-center lg:text-left">
                        Welcome Back!
                    </h1>
                    <SocialLogin whereFrom={"login"} />
                    <div className="divider">or</div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-2 md:mb-4">
                            <label className="block text-sm md:text-base text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                {...register("email", { required: true })}
                                className="w-full h-[30px] md:h-auto p-1 text-xs md:text-base md:p-2 border border-gray-300 rounded-sm md:rounded md:mt-1 hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                            {errors.email && (
                                <span className="text-sm text-red-600 font-semibold">
                                    Email is required
                                </span>
                            )}
                        </div>
                        <div className="mb-6">
                            <label className="block text-sm md:text-base text-gray-700">
                                Password
                            </label>
                            <input
                                type="password"
                                {...register("password", { required: true })}
                                className="w-full h-[30px] md:h-auto p-1 text-xs md:text-base md:p-2 border border-gray-300 rounded-sm md:rounded md:mt-1 hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                            {errors.password && (
                                <span className="text-sm text-red-600 font-semibold">
                                    Password is required
                                </span>
                            )}
                        </div>
                        <input
                            type="submit"
                            value="Login"
                            className="bg-indigo-500 hover:bg-indigo-600 cursor-pointer text-white py-2 px-4 w-full rounded focus:outline-none focus:bg-indigo-600 transition duration-300 ease-in-out transform hover:scale-105"
                        />
                    </form>
                    {isError && (
                        <p className="text-sm font-semibold text-red-600 dark:text-gray-400 mt-3">
                            {isError}
                        </p>
                    )}
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400 mt-3">
                        Have no account Yet?{" "}
                        <Link
                            to="/register"
                            className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                        >
                            Create Account here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
