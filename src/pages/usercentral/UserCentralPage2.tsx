import User from "../../entities/User";
import { redirect } from "../../utils/Redirector";
import { makeAPIUrl } from "../../utils/APIFetcher";
import { useEffect, useState } from "react";
export default function UserCentralPage2() {

    //State
    const [user, setUser] = useState<User[]>([]);

    //Controller
    
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

        //div cha man hinh
        <div className="">

            <div className="">
                {
                    user.map(
                        function (user: User) {
                            return (
                                <div key={user.email} className="flex items-center justify-center cursor-pointer">

                                    {/* Avatar */}
                                    <div>
                                        <img
                                            alt="User Avatar"
                                            src={makeAPIUrl(user.avatar)}
                                            className="w-16 h-16"
                                        />
                                    </div>

                                    {/* Name */}
                                    <p
                                        className="w-11/12 h-fit font-bold text-xl mb-3 cursor-pointer"

                                    >
                                        Tên người dùng:{user.fullName}
                                    </p>
                                </div>
                            );
                        }
                    )
                }
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
    );
}