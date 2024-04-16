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
        <div className="flex">
            <img
                alt="User Avatar"
                src={
                    user
                    ? `${API_URL}${user.avatar}`
                    : `${API_URL}/assets/avatar/default.png`
                }
                className="w-16 h-16 inline-block mr-3"
            />

            <p className="inline-block font-bold text-2xl align-middle">
                { user?.fullName }
            </p>
        </div>
    )
}