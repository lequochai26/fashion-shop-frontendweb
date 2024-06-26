import User from "../../entities/User";
import { redirect } from "../../utils/Redirector";
import { makeAPIUrl } from "../../utils/APIFetcher";
import { useEffect, useState } from "react";
import Controller from "../../controllers/Controller";
import NoAccessPage from "../noaccesspage/NoAccessPage";
import LogoutController, { LogoutParam } from "../../controllers/usercentral/LogoutController";
import LoadLoggedInUserController, { LoadLoggedInUserParam } from "../../controllers/LoadLoggedInUserController";
import LoadingPage from "../loadingpage/LoadingPage";
export default function UserCentralPage2() {

    //State
    const [user, setUser] = useState<User | undefined | null>(undefined);

    //Controller
    const loadUserController: Controller<LoadLoggedInUserParam> = new LoadLoggedInUserController();
    const logoutController: Controller<LogoutParam> = new LogoutController();

    // Init
    function init () {
        loadUserController.execute(
            {
                onSuccess: function (user) {
                    setUser(user);
                },
                onFailed: function (code, message) {
                    setUser(null);

                    if (code !== "NOT_LOGGED_IN" && code !== "USER_NOT_EXIST") {
                        alert(`Code: ${code}, Message: ${message}`);
                    }
                },
                onError: function (error) {
                    alert("Đã xảy ra lỗi trong quá trình xử lý!");
                    console.error(error);
                }
            }
        );
    }

    useEffect(init, []);
    
    //Event Handler
    async function onUpdatePersonalInfoClick() {
        redirect("/updatepersonalinfo");
    }

    async function onOrderOrderedPageClick() {
        redirect("/orderedorders")
    }

    async function onLogoutClick() {
        logoutController.execute({
            onSuccess: function () {
                redirect("/");
            },
            onError: function (error: any) {
                alert("Xảy ra lỗi trong quá trình xử lý");
                console.error(error);
            }
        });
    }
    //Element 
    return (
        user === undefined
        ? <LoadingPage />
        :
        !user
        ? <NoAccessPage />
        : (
            //div cha man hinh
            <div>
                {/* Avatar */}
                <div className="text-center">
                    <img
                        alt="User's avatar"
                        src={
                            user
                            ? makeAPIUrl(user.avatar)
                            : makeAPIUrl("/assets/avatar/default.png")
                        }
                        className="w-40 h-40 inline-block"
                    />
                </div>

                {/* Full name */}
                <div className="text-center">
                    { user?.fullName }
                </div>

                {/* div o vuong bao gom 3 th kia */}
                <div className="border  rounded-md p-4 space-y-4">

                    {/* Cập nhật thông tin cá nhân */}
                    <div
                        onClick={onUpdatePersonalInfoClick}
                        className="flex items-center justify-center space-x-2 cursor-pointer">
                        <img

                            className="w-8 h-8"
                            src="https://cdn-icons-png.flaticon.com/128/503/503849.png"
                            alt="Setting icon"
                        />
                        <p>Cập nhật thông tin</p>
                    </div>

                    {/* Đơn hàng đã đặt */}
                    <div
                        onClick={onOrderOrderedPageClick}
                        className="flex items-center justify-center space-x-2 cursor-pointer">
                        <img
                            className="w-8 h-8"
                            src="https://cdn-icons-png.flaticon.com/128/5161/5161308.png"
                            alt="Setting icon"
                        />
                        <p>Đơn hàng đã đặt</p>
                    </div>

                    {/* Đăng xuất */}
                    <div
                        onClick={onLogoutClick}
                        className="flex items-center justify-center space-x-2 cursor-pointer">
                        <img
                            className="w-8 h-8"
                            src="https://cdn-icons-png.flaticon.com/128/13100/13100852.png"
                            alt="Setting icon"
                        />
                        <p>Đăng xuất</p>
                    </div>




                </div>
            </div>
        )
    );
}