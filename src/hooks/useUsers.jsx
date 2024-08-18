import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUsers = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch, isPending } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const result = await axiosSecure.get("/users");
            return result.data;
        },
    });
    const theUser = users.find((theUser) => theUser.userEmail == user?.email);
    return { users, theUser, refetch, isPending };
};

export default useUsers;