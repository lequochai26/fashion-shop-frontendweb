import { useEffect, useState } from "react"
import User from "../../entities/User";
import { API_URL } from "../../utils/APIFetcher";
import Controller from "../../controllers/Controller";
import { redirect } from "../../utils/Redirector";
import LoadLoggedInUserController, { LoadLoggedInUserParam } from "../../controllers/LoadLoggedInUserController";
import UpgradedGetCartItemAmountController, { GetCartItemAmountParam } from "../../controllers/UpgradedGetCartItemAmountController";
import UpgradedLoadCartController, { LoadCartParam } from "../../controllers/UpgradedLoadCartController";

export default function GeneralHeader() {
    // States:
    const [ user, setUser ] = useState<User>();
    const [ cartItemAmount, setCartItemAmount ] = useState<number>(0);

    // Controllers:
    const loadLoggedInUserController: Controller<LoadLoggedInUserParam> = new LoadLoggedInUserController();
    const getCartItemAmountController: Controller<GetCartItemAmountParam> = new UpgradedGetCartItemAmountController();
    const loadCartController: Controller<LoadCartParam> = new UpgradedLoadCartController();

    // Init
    function init() {
        loadLoggedInUserController.execute(
            {
                onSuccess: setUser,
                onFailed(code, message) {
                    setUser(undefined);
                },
                onError: function (error: any) {
                    alert(`Đã có lỗi xảy ra trong quá trình thực thi!`);
                    console.error(error);
                }
            }
        );
    
        getCartItemAmountController.execute(
            {
                loadCartController,
                onSuccess: setCartItemAmount,
                onFailed(code, message) {
                    alert(`Code: ${code}, Message: ${message}`);
                },
                onError(error) {
                    alert(`Đã có lỗi xảy ra trong quá trình thực thi!`);
                    console.error(error);
                },
            }
        );
    }

    (window as any).reloadGeneralHeader = init;

    useEffect(
        init,
        []
    );

    // Event handlers:
    async function onLogoClick() {
        redirect("/");
    }

    async function onAvatarClick() {
        if (user) {
            redirect("/usercentral");
        }
        else {
            redirect("/login");
        }
    }

    async function onCartButtonClick() {
        redirect("/cart");
    }

    // Element:
    return (
        <div
            className="flex flex-row-reverse items-center justify-items-center h-24 border border-solid border-black"
        >
            <div
                className="border border-black border-solid rounded-md cursor-pointer mr-3 p-2"
                onClick={onCartButtonClick}
            >
                <p className="inline-block font-bold text-lg mr-3">
                    Giỏ hàng ({cartItemAmount})
                </p>

                <img
                    alt="Cart Button"
                    src="/shopping-cart.png"
                    className="inline-block w-9 h-9"
                />
            </div>

            <img
                alt="User Avatar"
                src={
                    user
                    ? `${API_URL}${user.avatar}`
                    : `${API_URL}/assets/avatar/default.png`
                }
                className="w-16 h-16 inline-block rounded-full ml-3 cursor-pointer mr-3"
                onClick={onAvatarClick}
            />

            <p
                className="inline-block font-bold text-2xl text-right flex-1"
            >
                { user?.fullName }
            </p>

            <div
                className="w-fit h-fit ml-3 cursor-pointer"
                onClick={onLogoClick}
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