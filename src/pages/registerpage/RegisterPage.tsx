export default function RegisterPage() {
    // Styles:
    const inputFieldsStyle: string = "p-3 pl-8 mr-36 border border-black border-solid rounded-md text-xl mt-2 mb-3"

    const buttonsStyle: string = "border border-black border-solid rounded-md p-1 pl-2 pr-2";

    // Design:
    return (
        <div className="w-full h-full">
            {/* Register form */}
            <form className="w-full h-full flex flex-row justify-between">
                {/* Avatar */}
                <div className="w-fit h-full">
                    <label htmlFor="avatar">
                        <img
                            alt="Avatar"
                            src="/select_image.png"
                            className="inline-block w-72 h-72 m-3 border border-black border-solid rounded-md p-2 cursor-pointer"
                        />
                    </label>
                    <input type="file" id="avatar" name="avatar" className="hidden"/>
                </div>

                {/* Info form */}
                <div className="h-full flex-1 flex flex-col justify-start p-3">
                    {/* Full name input */}
                    <input type="email" name="email" placeholder="Email" className={inputFieldsStyle} />

                    {/* Password input */}
                    <input type="password" name="password" placeholder="Mật khẩu" className={inputFieldsStyle} />

                    {/* Full name input */}
                    <input type="text" name="fullName" placeholder="Họ và tên" className={inputFieldsStyle} />

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
                                    <input type="radio" id="btnMale" name="btnGender" checked={true} />
                                    <label htmlFor="btnMale" className="mr-3">Nam</label>
                                </td>

                                <td>
                                    <input type="radio" id="btnFemale" name="btnGender" />
                                    <label htmlFor="btnFemale">Nữ</label>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    {/* Phone number input */}
                    <input type="tel" name="phoneNumber" placeholder="Số điện thoại" className={inputFieldsStyle} />

                    {/* Address input */}
                    <textarea name="address" placeholder="Địa chỉ" className={`${inputFieldsStyle} flex-1`}>
                    </textarea>

                    {/* Action area */}
                    <div className="h-fit p-3 mr-36 text-right">
                        <button className={buttonsStyle}>
                            Hủy
                        </button>

                        <button className={`${buttonsStyle} ml-5`}>
                            Đặt hàng
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}