import { useEffect, useState } from "react"
import User from "../../entities/User";
import { API_URL, apiFetch } from "../../utils/APIFetcher";
import RestResponse from "../../interfaces/RestResponse";

export default function GeneralHeader() {
    // States:
    const [ user, setUser ] = useState<User>();

    // Init
    useEffect(
        function () {
            apiFetch(
                {
                    path: "/user?method=getLoggedIn",
                    method: "GET",
                    onSuccess: async function (response: Response) {
                        const { success, result }: RestResponse<User> = await response.json();

                        if (success) {
                            setUser(result);
                        }
                    },
                    onFailed: async function (error: any) {
                        console.error(error);
                    }
                }
            )
        },
        []
    );

    // Element:
    return (
        <div
            className="flex items-center justify-items-center h-24 border border-solid border-black"
        >
            <img
                alt="User Avatar"
                src={
                    user
                    ? `${API_URL}${user.avatar}`
                    : `${API_URL}/assets/avatar/default.png`
                }
                className="w-16 h-16 inline-block mr-3 rounded-full ml-3 cursor-pointer"
            />

            <p
                className="inline-block font-bold text-2xl text-left flex-1"
            >
                { user?.fullName }
            </p>

            <img
                alt="Cart Button"
                src="/shopping-cart.png"
                className="w-14 h-14 mr-3 cursor-pointer"
            />
        </div>
    )
}