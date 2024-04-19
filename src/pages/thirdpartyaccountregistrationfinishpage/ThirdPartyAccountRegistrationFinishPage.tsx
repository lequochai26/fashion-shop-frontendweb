import { FormEventHandler, useEffect, useState } from "react";
import NoAccessPage from "../noaccesspage/NoAccessPage";
import Controller from "../../controllers/Controller";
import CheckThirdPartyAccountController, { CheckThirdPartyAccountParam } from "../../controllers/thirdpartyaccountregistrationfinishpage/CheckThirdPartyAccountController";
import CancelThirdPartyAccountRegistrationController, { CancelThirdPartyAccountRegistrationParam } from "../../controllers/thirdpartyaccountregistrationfinishpage/CancelThirdPartyAccountRegistrationController";
import ThirdPartyAccountRegistrationFinishController, { ThirdPartyAccountRegistrationFinishParam } from "../../controllers/thirdpartyaccountregistrationfinishpage/ThirdPartyAccountRegistrationFinishController";
import { redirect } from "../../utils/Redirector";

export default function ThirdPartyAccountRegistrationFinishPage() {
    // States:
    const [ access, setAccess ] = useState<boolean>(false);
    const [ form, setForm ] = useState<any>({ gender: true });

    // Controllers:
    const checkThirdPartyAccountController: Controller<CheckThirdPartyAccountParam> = new CheckThirdPartyAccountController();
    const cancelThirdPartyAccountRegistrationController: Controller<CancelThirdPartyAccountRegistrationParam> = new CancelThirdPartyAccountRegistrationController();
    const thirdPartyAccountRegistrationFinishController: Controller<ThirdPartyAccountRegistrationFinishParam> = new ThirdPartyAccountRegistrationFinishController();

    // Init
    function init() {
        checkThirdPartyAccountController.execute({
            onSuccess: setAccess,
            onError(error) {
                alert("Đã xảy ra lỗi trong quá trình thực thi!");
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

        setForm({ ...form, [target.name]: target.value });
    }

    async function onCancelButtonClick() {
        cancelThirdPartyAccountRegistrationController.execute({
            onSuccess() {
                redirect("/login")
            },
            onFailed(code, message) {
                alert(`Code: ${code}, Message: ${message}`);
            },

            onError(error) {
                alert("Đã có lỗi xảy ra trong quá trình thực thi!");
                console.error(error);
            },
        });
    }

    const onSubmit: FormEventHandler = async function (event) {
        event.preventDefault();

        thirdPartyAccountRegistrationFinishController.execute({
            form,
            onSuccess() {
                redirect("/")
            },
            onFailed(code, message) {
                alert(`Code: ${code}, Message: ${message}`);
            },

            onError(error) {
                alert("Đã có lỗi xảy ra trong quá trình thực thi!");
                console.error(error);
            },
        });
    }

    // Design:
    return (
        !access
        ? <NoAccessPage />
        : (
            <div className="w-2/3 h-full flex flex-col border border-black border-solid overflow-scroll p-4">
                <form className="w-full flex-1 flex flex-col justify-between
                items-stretch" onSubmit={onSubmit}>
                    {/* Password */}
                    <input
                        type="password"
                        name="password"
                        className="border border-black border-solid rounded-md p-1 my-2 mr-44"
                        placeholder="Mật khẩu"
                        onChange={onFieldChange}
                        value={form.password}
                        required={true}
                    />

                    {/* Gender */}
                    <div className="text-lg my-2">
                        <p className="font-bold text-xl">Giới tính:</p>
                        <input type="radio" id="maleBtn" name="gender" value="Nam" checked={form.gender} onChange={onFieldChange} />
                        <label htmlFor="maleBtn" className="mr-3">Nam</label>
                        <input type="radio" id="femaleBtn" name="gender" value="Nữ" checked={!form.gender} onChange={onFieldChange} />
                        <label htmlFor="femalebtn">Nữ</label>
                    </div>

                    {/* Phone number */}
                    <input
                        type="tel"
                        name="phoneNumber"
                        className="border border-black border-solid rounded-md p-1 my-2 mr-44"
                        placeholder="Số điện thoại"
                        onChange={onFieldChange}
                        value={form.phoneNumber}
                        required={true}
                    />

                    {/* Address */}
                    <textarea
                        name="address"
                        className="flex-1 border border-black border-solid rounded-md p-1 my-2"
                        placeholder="Địa chỉ"
                        onChange={onFieldChange}
                        value={form.address}
                        required={true}
                    >
                    </textarea>

                    {/* Actions */}
                    <div className="text-right">
                        <button
                            className="p-1 px-2 font-bold border border-black border-solid rounded-md m-1"
                            type="button"
                            onClick={onCancelButtonClick}
                        >
                            Hủy
                        </button>

                        <button
                            className="p-1 px-2 font-bold border border-black border-solid rounded-md m-1"
                        >
                            Đăng ký
                        </button>
                    </div>
                </form>
            </div>
        )
    );
}