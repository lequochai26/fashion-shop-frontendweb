import { FormEventHandler, useEffect, useState } from "react";
import Controller from "../../controllers/Controller";
import RegisterController, { RegisterParam } from "../../controllers/registerpage/RegisterController";
import { redirect } from "../../utils/Redirector";
import LoadLoggedInUserController, { LoadLoggedInUserParam } from "../../controllers/LoadLoggedInUserController";
import CheckLoggedInController, { CheckLoggedInParam } from "../../controllers/login/CheckLoggedInController";
import NoAccessPage from "../noaccesspage/NoAccessPage";
import LoadingPage from "../loadingpage/LoadingPage";

export default function RegisterPage() {
    // States:
    const [ form, setForm ] = useState<any>({ gender: true });
    const [ loggedIn, setLoggedIn ] = useState<boolean | undefined>(undefined);

    // Controllers:
    const registerController: Controller<RegisterParam> = new RegisterController();
    const loadLoggedInUserController: Controller<LoadLoggedInUserParam> = new LoadLoggedInUserController();
    const checkLoggedInController: Controller<CheckLoggedInParam> = new CheckLoggedInController();

    // Init
    function init() {
        checkLoggedInController.execute({
            loadLoggedInUserController,
            onSuccess: setLoggedIn,
            onError(error: any) {
                alert("Đã có lỗi xảy ra!");
                console.error(error);
            },
        })
    }
    useEffect(init, []);

    // Event handlers:
    async function onFieldChange(event: any) {
        const target: HTMLInputElement = event.target;

        if (target.name === "gender") {
            setForm({ ...form, [target.name]: (target.value === "Nam") });
            return;
        }

        if (target.name === "avatar") {
            if (target.files) {
                setForm({ ...form, [target.name]: target.files[0] });
            }
            return;
        }

        setForm({...form, [target.name]: target.value});
    }

    async function onCancelButtonClick() {
        redirect("/");
    }

    const onRegisterFormSubmit: FormEventHandler = async function (event) {
        // Prevent default
        event.preventDefault();

        // Call register controller
        registerController.execute({
            form,
            onSuccess: function () {
                alert("Chúc mừng bạn đã đăng ký tài khoản thành công!");
                redirect("/login");
            },
            onFailed: function (code: string, message: string) {
                alert(`Code ${code}, Message: ${message}`);
            },
            onError: console.error
        });
    }

    // Styles:
    const inputFieldsStyle: string = "p-3 pl-8 mr-36 border border-black border-solid rounded-md text-xl mt-2 mb-3"

    const buttonsStyle: string = "border border-black border-solid rounded-md p-1 pl-2 pr-2";

    // Design:
    return (
        loggedIn === undefined
        ?
        <LoadingPage />
        :
        loggedIn
        ?
        <NoAccessPage />
        :
        <div className="w-full h-full">
            {/* Register form */}
            <form className="w-full h-full flex flex-row justify-between" onSubmit={onRegisterFormSubmit}>
                {/* Avatar */}
                <div className="w-fit h-full">
                    <label htmlFor="avatar">
                        <img
                            alt="Avatar"
                            src={
                                form.avatar
                                ? URL.createObjectURL(form.avatar)
                                : "/select_image.png"
                            }
                            className="inline-block w-72 h-72 m-3 border border-black border-solid rounded-xl cursor-pointer"
                        />
                    </label>
                    <input type="file" id="avatar" name="avatar" className="hidden" onChange={onFieldChange} />
                </div>

                {/* Info form */}
                <div className="h-full flex-1 flex flex-col justify-start p-3">
                    {/* Full name input */}
                    <input type="email" name="email" placeholder="Email" className={inputFieldsStyle} onChange={onFieldChange} value={form.email} required={true} />

                    {/* Password input */}
                    <input type="password" name="password" placeholder="Mật khẩu" className={inputFieldsStyle} onChange={onFieldChange} value={form.password} required={true} />

                    {/* Full name input */}
                    <input type="text" name="fullName" placeholder="Họ và tên" className={inputFieldsStyle} onChange={onFieldChange} value={form.fullName} required={true} />

                    {/* Gender input */}
                    <table className="w-fit">
                        <thead>
                            <tr>
                                <th colSpan={2}>
                                    <p className="text-left">
                                        Giới tính:
                                    </p>
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>
                                    <input type="radio" id="genderMale" name="gender" value="Nam" onChange={onFieldChange} checked={form.gender} />
                                    <label htmlFor="genderMale" className="mr-3">Nam</label>
                                </td>

                                <td>
                                    <input type="radio" id="genderFemale" name="gender" value="Nữ" onChange={onFieldChange} checked={!form.gender} />
                                    <label htmlFor="genderFemale">Nữ</label>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    {/* Phone number input */}
                    <input type="tel" name="phoneNumber" placeholder="Số điện thoại" className={inputFieldsStyle} onChange={onFieldChange} value={form.phoneNumber} required={true} />

                    {/* Address input */}
                    <textarea name="address" placeholder="Địa chỉ" className={`${inputFieldsStyle} flex-1`} onChange={onFieldChange} value={form.address} required={true}>
                    </textarea>

                    {/* Action area */}
                    <div className="h-fit p-3 mr-36 text-right">
                        <button type="button" className={buttonsStyle} onClick={onCancelButtonClick}>
                            Hủy
                        </button>

                        <button className={`${buttonsStyle} ml-5`}>
                            Đăng ký
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}