import User from "../../entities/User";
import { redirect } from "../../utils/Redirector";
import { API_URL, makeAPIUrl } from "../../utils/APIFetcher";
import { useEffect, useState } from "react";
import CheckLoggedInController, {CheckLoggedInParam} from "../../controllers/usercentral/CheckedLogginController";
import LogoutController, { LogoutParam } from "../../controllers/usercentral/LogoutController";
import Controller from "../../controllers/Controller";

export default function UserCentralPage() {

    //State
    const [user, setUser] = useState<User>();
    const [ logged, setLoggeded ] = useState<boolean>(false);
    
    // //Controllers
    // const checkLoggedInController: Controller<CheckLoggedInParam> = new CheckLoggedInController();
    // const logoutController: Controller<LogoutParam> = new LogoutController();
    
    // Init
    // function init() {
    //     checkLoggedInController.execute({
    //         onSuccess: function (logged: boolean) {
    //             setLoggeded(logged);
    //         },

    //         onError: function (error: any) {
    //             console.error(error);
    //         }
    //     });
    // }
    // useEffect(init, []);

    //Event Handler
    async function onUpdatePersonalInfoClick() {
        redirect("/updatepersonalinfo");
    }

    async function onOrderOrderedPageClick() {
        redirect("/orderedorders")
    }

    async function onLogoutClick() {
        redirect('/')
    }
    //Element 
    return (

        <div className="w-full h-fit flex flex-wrap justify-center">

            <div className="border  rounded-md p-4 space-y-4">


                {/* Avatar User */}
                <div className="flex items-center justify-center cursor-pointer">
                    <img

                        alt="Avatar User"
                        src={
                            user
                                ? `${API_URL}${user.avatar}`
                                : `${API_URL}/assets/avatar/default.png`
                        }
                        className="w-16 h-16"
                    />
                </div>

                {/* User Name */}
                <p className="text-center">Khách hàng: { user?.fullName }</p>

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
    );
}