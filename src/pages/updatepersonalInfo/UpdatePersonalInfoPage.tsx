import { FormEventHandler, useEffect, useRef, useState } from "react";
import User from "../../entities/User";
import Controller from "../../controllers/Controller";
import LoadLoggedInUserController, { LoadLoggedInUserControllerParam } from "../../controllers/updatepersonalinfo/LoadLoggedInUserController";
import { API_URL } from "../../utils/APIFetcher";
import UpdatePersonalInfoController, { UpdatePersonalInfoControllerParam } from "../../controllers/updatepersonalinfo/UpdatePersonalInfoController";
import { redirect } from "../../utils/Redirector";
import NoAccessPage from "../noaccesspage/NoAccessPage";
import LoadingPage from "../loadingpage/LoadingPage";

export default function UpdatePersonnalInfoPage() {

    //State
    const [user, setUser] = useState<User | undefined | null>(undefined);
    const [userInfo, setUserInfo] = useState<any>({});
    useState<boolean | undefined>(undefined);
    const avatarInputRef = useRef<HTMLInputElement>(null);

    //Controllers:
    const loadLoggedInUserController: Controller<LoadLoggedInUserControllerParam> = new LoadLoggedInUserController();
    const updatePersonalInfoController: Controller<UpdatePersonalInfoControllerParam> = new UpdatePersonalInfoController();

    useEffect(
        () => {
            loadLoggedInUserController.execute(
                {
                    onSuccess: (user: User) => {
                        setUser(user);
                    },
                    onFailed(code, message) {
                        setUser(null);

                        if (code !== "NOT_LOGGED_IN" && code !== "FAILED") {
                            alert(`Code ${code}, Message: ${message}`);
                        }
                    },

                    onError: function (error: any) {
                        console.error(error);
                    }
                }
            )
        }, [])

    //Methods:
    function onChangedFields({ target }: any) {
        const name = target.name;
        let value = target.value;

        if (name === "gender") {
            setUserInfo({ ...userInfo, [name]: (value === "male") });
            return;
        }

        if (name === "avatar") {
            setUserInfo({ ...userInfo, [name]: target.files[0] });
            return;
        }

        setUserInfo({ ...userInfo, [name]: value });
    }

    const onUpdate: FormEventHandler = async function (event) {
        //Prevent default
        event.preventDefault();

        if (!(userInfo.address || userInfo.avatar || userInfo.fullName ||userInfo.gender !== undefined || userInfo.phoneNumber)) {
            alert("Vui lòng nhập thông tin cần cập nhật!!");
            return;
        }

        console.log(userInfo.gender);
        console.log(userInfo)
        updatePersonalInfoController.execute(
            {
                user: userInfo,
                onSuccess: () => {
                    alert("Cập nhật thông tin thành công");
                    redirect("/updatepersonalinfo")
                },
                onFailed: function (code: string, message: string) {
                    alert(`Code ${code}, Message: ${message}`);
                },
                onError: (error: any) => {
                    console.error(error);
                }
            }
        )
    }
    

    function handleAvatarClick() {
        if (avatarInputRef.current) {
            avatarInputRef.current.click();
        }
    }

    async function onCancelButtonClick() {
        redirect("/usercentral");
    }

    //View
    return (
        user === undefined
        ?
        <LoadingPage />
        :
        !user
        ?
        <NoAccessPage />
        :
        (
            <div className="mt-10">
                {/* Form */}
                <form action="" className="flex" style={{ width: "810px", height: "auto" }}>
                    {/* Avatar */}
                    <div className="w-2/5 mr-10 flex flex-col items-center">
                        <div onClick={handleAvatarClick} className="cursor-pointer">
                            <img
                                src={
                                    userInfo.avatar
                                        ? URL.createObjectURL(userInfo.avatar)
                                        : (user && `${API_URL}${user?.avatar}`)
                                }
                                alt=""
                                className="w-80 h-80"
                            />
                        </div>
                        <input
                            type="file"
                            name="avatar"
                            style={{ display: "none" }}
                            ref={avatarInputRef}
                            onChange={onChangedFields}
                        />
                    </div>

                    {/* User info */}
                    <div className="w-3/5">
                        {/* FullName */}
                        <input
                            type="text"
                            name="fullName"
                            placeholder={`Họ và tên: ${user && user.fullName}`}
                            onChange={onChangedFields}
                            className="w-96 h-6 border border-black rounded p-5"
                        /> <br /><br />

                        {/* Gender */}
                        <div className="border border-dashed w-44 border-black p-2 flex flex-wrap">
                            <div className="w-full ">
                                <p>Giới tính:</p>
                            </div>

                            {/* Male */}
                            <div className="border border-dashed w-fit border-black p-1 mr-2">
                                <input type="radio" name="gender" id="male" value={"male"}
                                    onChange={onChangedFields}
                                    checked={userInfo.gender !== undefined ? userInfo.gender : user.gender} />
                                <label htmlFor="male" className="m-2">Nam</label>
                            </div>

                            {/* Female */}
                            <div className="border border-dashed w-fit border-black p-1">
                                <input type="radio" name="gender" id="female" value={"female"}
                                    onChange={onChangedFields}
                                    checked={userInfo.gender !== undefined ? !userInfo.gender : !user.gender}  />
                                <label htmlFor="female" className="m-3">Nữ</label>
                            </div>

                        </div>

                        {/* phoneNumber */}
                        <input
                            type="text"
                            name="phoneNumber"
                            placeholder={`Số điện thoại: ${user ? user.phoneNumber : ""}`}
                            className="w-96 h-6 border border-black rounded p-5 mt-5"
                            onChange={onChangedFields}
                        /> <br /><br />

                        {/* Address */}
                        <textarea name="address"
                            placeholder={`Địa chỉ: ${user && user.address}`}
                            onChange={onChangedFields}
                            className="w-96 h-32 border border-black rounded p-5 mt-3" >
                        </textarea>
                         <br /><br />

                        {/* button */}
                        <div className="flex">
                            <button className="border border-black rounded w-20 p-1 mr-3"
                                type="button"
                                onClick={onCancelButtonClick}>
                                Huỷ
                            </button>
                            <button className="border border-black rounded w-36 p-1" onClick={(event) => onUpdate(event)}>
                                Cập nhật
                            </button>
                        </div>
                    </div>
                </form >

            </div >
        )
    );
}