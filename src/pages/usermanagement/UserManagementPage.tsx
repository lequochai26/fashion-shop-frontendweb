import { useEffect, useState } from "react";
import User from "../../entities/User";
import Controller from "../../controllers/Controller";
import LoadUsersController, { LoadUsersControllerParam } from "../../controllers/usermanagement/LoadUsersController";
import LoadUsersByKeywordController, { LoadUsersByKeywordParam } from "../../controllers/usermanagement/LoadUsersByKeywordController";

export default function UserManagement() {
    //Use state
    const [users, setUsers] = useState<User[]>();
    const [createFormVisible, setCreateFormVisible] = useState<boolean>(false);
    const [updateFormVisible, setUpdateFormVisible] = useState<boolean>(false);
    const [keyword, setKeyword] = useState<string>("");

    //Controller
    const loadUsersController: Controller<LoadUsersControllerParam> = new LoadUsersController();
    const loadUsersByKeywordController: Controller<LoadUsersByKeywordParam> = new LoadUsersByKeywordController();

    //User effect
    useEffect(() => {
        loadUsersController.execute(
            {
                onSuccess: setUsers,
                onError(error) {
                    alert("Đã có lỗi xảy ra trong quá trình thực thi!");
                    console.error(error);
                },
            }
        )
    }, [])

    //Event handlers:
    async function onKeywordChange(event: any) {
        setKeyword(event.target.value);
    }

    async function onSearchButtonClick() {
        loadUsersByKeywordController.execute(
            {
                keyword,
                onSuccess: function (users) {
                    setUsers(users);
                },
                onError: function (error: any) {
                    console.error(error);
                },
            }
        )
    }

    async function onReloadButtonClick() {
        loadUsersController.execute({
            onSuccess: setUsers,
            onError: function (error: any) {
                console.error(error)
            }
        });

        setKeyword("");
    }

    // Styles:
    const inputFieldsStyle: string = "p-3 pl-8 mr-10 border border-black border-solid rounded-md text-xl mt-2 mb-3"

    const buttonsStyle: string = "border border-black border-solid rounded-md p-1 pl-2 pr-2";

    const tableColumtStyle: string = "p-3 border border-black w-full h-full ";
    return (
        <div className="w-full h-full">
            {/* Search-bar */}
            <div className="w-full h-16 flex items-center justify-start border border-black border-solid">
                {/* Keyword input field */}
                <input type="text" placeholder="Từ khóa tìm kiếm" className="border border-black border-solid rounded-md p-2 pl-4 w-1/2 ml-3"
                value={keyword} onChange={onKeywordChange}
                />

                {/* Search button */}
                <button
                    className="bg-white p-2 pl-3 pr-3 border border-black border-solid rounded-md ml-3"
                    onClick={onSearchButtonClick}
                >
                    Tìm kiếm
                </button>

                {/* Reload button */}
                <button
                    className="bg-white p-2 pl-3 pr-3 border border-black border-solid rounded-md ml-3"
                     onClick={onReloadButtonClick}
                >
                    Tải lại
                </button>

                {/* Add button */}
                <button className="p-2 pl-3 pr-3 border border-black border-solid rounded-md ml-3 bg-green-500 text-white" onClick={() => setCreateFormVisible(true)}>
                    Thêm
                </button>
            </div>

            {/* User list */}
            <div>
                <table className=" border border-black border-collapse  w-full ">
                    <body>
                        <tr className="text-base grid grid-cols-4 text-left">
                            <th className={tableColumtStyle}>Email</th>
                            <th className={tableColumtStyle}>Họ và tên</th>
                            <th className={tableColumtStyle}>Giới tính</th>
                            <th className={tableColumtStyle}>Hành động</th>
                        </tr>
                        {
                            users && users.map((user) => (
                                <tr className="text-base grid grid-cols-4 text-left">
                                    <td className={tableColumtStyle}>{user.email}</td>
                                    <td className={tableColumtStyle}>{user.fullName}</td>
                                    <td className={tableColumtStyle}>{user.gender ? "Nam" : "Nữ"}</td>
                                    <td className={tableColumtStyle}>
                                        <button className={buttonsStyle}>Sửa</button>
                                        <button className={buttonsStyle}>Xoá</button>
                                    </td>
                                </tr>
                            ))
                        }

                    </body>
                </table>
            </div>

            {/* Create form */}
            {
                createFormVisible &&
                <div className="fixed top-0 left-0  w-screen h-screen bg-black bg-opacity-50">
                    <form className="w-[80%] mt-10 h-full flex flex-row justify-between p-6 rounded  bg-white border border-black ml-32">
                        {/* Left Content */}
                        <div className="w-fit h-full">
                            <label htmlFor="avatar">
                                <img
                                    alt="Avatar"
                                    src=
                                    "localhost:3000/assets/avatar/default.png"
                                    className="inline-block w-72 h-72 m-3 border border-black border-solid cursor-pointer"
                                />
                            </label>
                            <input type="file" id="avatar" name="avatar" className="hidden"
                            // onChange={onFieldChange} 
                            />


                            {/* Gender */}
                            <div className="border border-dashed w-44 border-black p-2 flex flex-wrap m-3">
                                <div className="w-full ">
                                    <p>Giới tính:</p>
                                </div>

                                {/* Male */}
                                <div className="border border-dashed w-fit border-black p-1 mr-2">
                                    <input type="radio" name="gender" id="male" value={"male"}
                                    />
                                    <label htmlFor="male" className="m-2">Nam</label>
                                </div>

                                {/* Female */}
                                <div className="border border-dashed w-fit border-black p-1">
                                    <input type="radio" name="gender" id="female" value={"female"}
                                    />
                                    <label htmlFor="female" className="m-3">Nữ</label>
                                </div>
                            </div>

                            {/* Permission */}
                            <select name="" id="">
                                <option value="CUSTOMER">CUSTOMER</option>
                                <option value="EMPLOYEE">EMPLOYEE</option>
                                <option value="MANAGER">MANAGER</option>
                            </select>
                        </div>

                        {/* Info form */}
                        <div className="h-full flex-1 flex flex-col justify-start p-3">
                            {/* Full name input */}
                            <input type="email" name="email" placeholder="Email"
                                className={inputFieldsStyle}
                                required={true}
                            />

                            {/* Password input */}
                            <input type="password" name="password" placeholder="Mật khẩu"
                                className={inputFieldsStyle}
                                required={true} />

                            {/* Full name input */}
                            <input type="text" name="fullName" placeholder="Họ và tên"
                                className={inputFieldsStyle}
                                required={true} />


                            {/* Phone number input */}
                            <input type="tel" name="phoneNumber" placeholder="Số điện thoại"
                                className={inputFieldsStyle}
                                required={true} />

                            {/* Address input */}
                            <textarea name="address" placeholder="Địa chỉ"
                                className={`${inputFieldsStyle} flex-1`} required={true}
                            >
                            </textarea>

                            {/* Action area */}
                            <div className="h-fit p-3 mr-36 text-right">
                                <button type="button"
                                    className={buttonsStyle}
                                    onClick={() => setCreateFormVisible(false)}
                                >
                                    Hủy
                                </button>

                                <button className={`${buttonsStyle} ml-5 bg-green-600 text-white`}>
                                    Thêm
                                </button>
                            </div>
                        </div>
                    </form>
                </div >
            }

            {/* Update form */}
            {
                updateFormVisible &&
                <div className="fixed top-10 w-full">
                    <form className="w-[80%] h-full flex flex-row justify-between p-6 rounded  bg-white border border-black ml-32">
                        {/* Left Content */}
                        <div className="w-fit h-full">
                            {/* Avatar */}
                            <label htmlFor="avatar">
                                <img
                                    alt="Avatar"
                                    src=
                                    "localhost:3000/assets/avatar/default.png"
                                    className="inline-block w-72 h-72 m-3 border border-black border-solid cursor-pointer"
                                />
                            </label>
                            <input type="file" id="avatar" name="avatar" className="hidden"
                            // onChange={onFieldChange} 
                            />


                            {/* Gender */}
                            <div className="border border-dashed w-44 border-black p-2 flex flex-wrap m-3">
                                <div className="w-full ">
                                    <p>Giới tính:</p>
                                </div>

                                {/* Male */}
                                <div className="border border-dashed w-fit border-black p-1 mr-2">
                                    <input type="radio" name="gender" id="male" value={"male"}
                                    />
                                    <label htmlFor="male" className="m-2">Nam</label>
                                </div>

                                {/* Female */}
                                <div className="border border-dashed w-fit border-black p-1">
                                    <input type="radio" name="gender" id="female" value={"female"}
                                    />
                                    <label htmlFor="female" className="m-3">Nữ</label>
                                </div>

                            </div>

                            {/* Permission */}
                                {/* <select name="permission" id="" className="border border-gray-300 rounded-md px-4 py-2" >
                                    <option value="CUSTOMER">CUSTOMER</option>
                                    <option value="EMPLOYEE">EMPLOYEE</option>
                                    <option value="MANAGER">MANAGER</option>
                                </select> */}
                            
                        </div>

                        {/* Info form */}
                        <div className="h-full flex-1 flex flex-col justify-start p-3">
                            {/* Full name*/}
                            <p className="p-3"> HoangKhuyen1932003@gmail.com</p>

                            {/* Full name input */}
                            <input type="text" name="fullName" placeholder="Họ và tên"
                                className={inputFieldsStyle}
                                required={true} />


                            {/* Phone number input */}
                            <input type="tel" name="phoneNumber" placeholder="Số điện thoại"
                                className={inputFieldsStyle}
                                required={true} />

                            {/* Address input */}
                            <textarea name="address" placeholder="Địa chỉ"
                                className="p-3 pl-8 mr-10 border border-black border-solid rounded-md text-xl mt-2 mb-3 h-30" required={true}
                            >
                            </textarea>

                            {/* Action area */}
                            <div className="h-fit p-3 mr-10 text-right">
                                <button type="button"
                                    className={buttonsStyle}
                                    onClick={() => setUpdateFormVisible(false)}
                                >
                                    Hủy
                                </button>

                                <button className={`${buttonsStyle} ml-5 bg-blue-500 text-white`}>
                                    Sửa
                                </button>
                            </div>
                        </div>
                    </form>
                </div >
            }
        </div >
    )
}