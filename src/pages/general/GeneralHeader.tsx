import { useEffect, useState } from "react"
import User from "../../entities/User";
import { API_URL } from "../../utils/APIFetcher";
import Controller from "../../controllers/Controller";
import LoadLoggedInUserController, { LoadLoggedInUserControllerParam } from "../../controllers/general/LoadLoggedInUserController";

export default function GeneralHeader() {
    // States:
    const [ user, setUser ] = useState<User>();

    // Controllers:
    const loadLoggedInUserController: Controller<LoadLoggedInUserControllerParam> = new LoadLoggedInUserController()

    // Init
    useEffect(
        function () {
            loadLoggedInUserController.execute(
                {
                    onSuccess: function (user: User) {
                        setUser(user)
                    },
                    onError: function (error: any) {
                        console.error(error);
                    }
                }
            );
        },
        []
    );

    // Element:
    return (
        <div
            className="flex flex-row-reverse items-center justify-items-center h-24 border border-solid border-black"
        >
            <img
                alt="Cart Button"
                src="/shopping-cart.png"
                className="w-14 h-14 cursor-pointer mr-3"
            />

            <img
                alt="User Avatar"
                src={
                    user
                    ? `${API_URL}${user.avatar}`
                    : `${API_URL}/assets/avatar/default.png`
                }
                className="w-16 h-16 inline-block rounded-full ml-3 cursor-pointer mr-3"
            />

            <p
                className="inline-block font-bold text-2xl text-right flex-1"
            >
                { user?.fullName }
            </p>

            <div
                className="w-fit h-fit ml-3 cursor-pointer"
            >
                <img
                    alt="Fashion Shop's Logo"
                    src="/logo.png"
                    className="w-20 h-20 inline-block mr-3"
                />

                <p
                    className="inline-block w-fit h-fit font-bold text-2xl"
                >
                    Fashion Shop
                </p>
            </div>
        </div>
    )
}