import { useEffect, useState } from "react";
import User from "../../entities/User";
import Controller from "../../controllers/Controller";
import LoadUsersController, { LoadUsersControllerParam } from "../../controllers/usermanagement/LoadUsersController";
import LoadUsersByKeywordController, { LoadUsersByKeywordParam } from "../../controllers/usermanagement/LoadUsersByKeywordController";
import LoadingPage from "../loadingpage/LoadingPage";
import CreateUserControlelr, { CreateUserControlelrParam } from "../../controllers/usermanagement/CreateUserController";
import { API_URL } from "../../utils/APIFetcher";
import UpdateUserController, { UpdateUserControllerParam } from "../../controllers/usermanagement/UpdateUserController";
import DeleteUserController, { DeleteUserControllerParam } from "../../controllers/usermanagement/DeleteUserController";
import NoAccessPage from "../noaccesspage/NoAccessPage";


export default function UserManagement() {
    //Use state
    const [users, setUsers] = useState<User[] | undefined | null>();
    const [createFormVisible, setCreateFormVisible] = useState<boolean>(false);
    const [updateFormVisible, setUpdateFormVisible] = useState<boolean>(false);
    const [keyword, setKeyword] = useState<string>("");
    const [userInfo, setUserInfo] = useState<any>({});
    const [selectedUser, setSelectedUser] = useState<User>();
    //Controller
    const loadUsersController: Controller<LoadUsersControllerParam> = new LoadUsersController();
    const loadUsersByKeywordController: Controller<LoadUsersByKeywordParam> = new LoadUsersByKeywordController();
    const createUserController: Controller<CreateUserControlelrParam> = new CreateUserControlelr();
    const updateUserController: Controller<UpdateUserControllerParam> = new UpdateUserController();
    const deleteUserController: Controller<DeleteUserControllerParam> = new DeleteUserController();

    //User effect
    useEffect(() => {
        loadUsersController.execute(
            {
                onSuccess: setUsers,
                onFailed(code, message) {
                    setUsers(null);
                },
                onError(error) {
                    setUsers(null);
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
            onFailed(code, message) {
                setUsers(null);
            },
            onError: function (error: any) {
                setUsers(null);
                alert(`Đã xảy ra lỗi trong quá trình thực thi!`);
                console.error(error)
            }
        });

        setKeyword("");
        setUserInfo({});
    }

    async function onAddUserButtonClick(event: any) {
        event.preventDefault();

        createUserController.execute(
            {
                userInfo,
                onSuccess: function () {
                    alert("Thêm người dùng thành công");
                    cancel();
                    onReloadButtonClick();
                },
                onFailed: function (code, message) {
                    alert(`Code ${code}, Message: ${message}`);
                },
                onError: console.error
            }
        )
    }

    console.log(userInfo.gender);
    async function onDeleteButtonClick(event: any, email: string) {
        event.preventDefault();

        const confirmation = window.confirm(`Bạn có chắc chắn muốn xoá người dùng ${email}`);

        if(confirmation) {
            deleteUserController.execute(
                {
                    email: email,
                    onSuccess: function() {
                        alert(`Xoá người dùng ${email} thành công`);
                        onReloadButtonClick();
                    },
                    onFailed: function (code, message) {
                        alert(`Code: ${code} - message: ${message}`);
                    },
                    onError: console.error
                }
            )
        } else {
            return;
        }      
    }

    async function onUpdateUserButtonClick(event: any) {
        event.preventDefault();
        

        if(!(userInfo.gender !== undefined|| userInfo.fullName || userInfo.permission || userInfo.phoneNumber || userInfo.address || userInfo.avatar)) {
            alert("Vui lòng nhập thông tin cần cập nhật!");
            return;
        }

        updateUserController.execute(
            {
                userInfo,
                onSuccess: function() {
                    alert("Cập nhật thông tin user thành công");
                    cancel();
                    onReloadButtonClick();
                },
                onFailed: function (code, message) {
                    alert(`Code: ${code} - Message: ${message}`);
                },
                onError: function (error) {
                    console.error(error);
                },
            }
        )
    }

    async function onUpdateButtonClick(user: User) {
        setSelectedUser(user);
        setUserInfo({email: user.email })
        setUpdateFormVisible(true);
    }

    function onFieldChange({ target }: any) {
        if (target.name === 'gender') {
            setUserInfo({ ...userInfo, [target.name]: (target.value === "male") })
            return;
        }

        if (target.name === 'avatar') {
            setUserInfo({ ...userInfo, [target.name]: target.files[0] });
            return;
        }

        setUserInfo({ ...userInfo, [target.name]: target.value });
    }


    function cancel() {
        if(createFormVisible) {
            setCreateFormVisible(false);
        }
        if(updateFormVisible) {
            setUpdateFormVisible(false);
        }

        setUserInfo({});
    }

    function addButton() {
        setCreateFormVisible(true);
        setUserInfo({gender: true});
    } 
    // Styles:
    const inputFieldsStyle: string = "p-3 pl-8 mr-10 border border-black border-solid rounded-md text-xl mt-2 mb-3"

    const buttonsStyle: string = "border border-black border-solid rounded-md p-1 pl-2 pr-2";

    const tableColumtStyle: string = "p-3 border border-black w-full h-full ";


    return (
        users === undefined
        ?
        <LoadingPage />
        :
        !users
        ?
        <NoAccessPage />
        :
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
                <button className="p-2 pl-3 pr-3 border border-black border-solid rounded-md ml-3 bg-green-500 text-white" onClick={addButton}>
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
                                        <button className={`${buttonsStyle} bg-blue-500 text-white mr-3`} onClick={() => onUpdateButtonClick(user)}>Sửa</button>
                                        <button className={`${buttonsStyle} bg-red-500 text-white mr-3`} 
                                        onClick={(event) =>onDeleteButtonClick(event,user.email) }>Xoá</button>
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
                    <form className="w-[80%] mt-10 h-full flex flex-row justify-between p-6 rounded  bg-white border border-black ml-32" onSubmit={onAddUserButtonClick}>
                        {/* Left Content */}
                        <div className="w-fit h-full">
                            <label htmlFor="avatar">
                                <img
                                    alt="Avatar"
                                    src={
                                        userInfo.avatar
                                            ? URL.createObjectURL(userInfo.avatar)
                                            : `/select_image.png`
                                    }
                                    className="inline-block w-72 h-72 m-3 border border-black border-solid cursor-pointer"
                                />
                            </label>
                            <input type="file" id="avatar" name="avatar" className="hidden"
                                onChange={onFieldChange}
                            />


                            {/* Gender */}
                            <div className="border border-dashed w-44 border-black p-2 flex flex-wrap m-3">
                                <div className="w-full ">
                                    <p>Giới tính:</p>
                                </div>

                                {/* Male */}
                                <div className="border border-dashed w-fit border-black p-1 mr-2">
                                    <input type="radio" name="gender" id="male" value={"male"} checked={userInfo.gender}
                                        onChange={onFieldChange}
                                    />
                                    <label htmlFor="male" className="m-2">Nam</label>
                                </div>

                                {/* Female */}
                                <div className="border border-dashed w-fit border-black p-1">
                                    <input type="radio" name="gender" id="female" value={"female"}
                                        checked={!userInfo.gender}
                                        onChange={onFieldChange}
                                    />
                                    <label htmlFor="female" className="m-3">Nữ</label>
                                </div>
                            </div>

                            {/* Permission */}
                            <select name="permission" id="" className="border border-gray-300 rounded-md ml-3 px-4 py-2" onChange={onFieldChange}>
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
                                onChange={onFieldChange}
                                required={true}
                            />

                            {/* Password input */}
                            <input type="password" name="password" placeholder="Mật khẩu"
                                className={inputFieldsStyle}
                                onChange={onFieldChange}
                                required={true} />

                            {/* Full name input */}
                            <input type="text" name="fullName" placeholder="Họ và tên"
                                className={inputFieldsStyle}
                                onChange={onFieldChange}
                                required={true} />


                            {/* Phone number input */}
                            <input type="tel" name="phoneNumber" placeholder="Số điện thoại"
                                className={inputFieldsStyle}
                                onChange={onFieldChange}
                                required={true} />

                            {/* Address input */}
                            <textarea name="address" placeholder="Địa chỉ"
                                className={`${inputFieldsStyle} flex-1`}
                                onChange={onFieldChange} required={true}
                            >
                            </textarea>

                            {/* Action area */}
                            <div className="h-fit p-3 mr-36 text-right">
                                <button type="button"
                                    className={buttonsStyle}
                                    onClick={cancel}
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
                (updateFormVisible && selectedUser) &&
                <div className="fixed top-0 left-0  w-screen h-screen bg-black bg-opacity-50">
                    <form className="w-[80%] mt-10 h-full flex flex-row justify-between p-6 rounded  bg-white border border-black ml-32" onSubmit={onUpdateUserButtonClick}>
                        {/* Left Content */}
                        <div className="w-fit h-full">
                            <label htmlFor="avatar">
                                <img
                                    alt="Avatar"
                                    src={
                                        userInfo.avatar
                                            ? URL.createObjectURL(userInfo.avatar)
                                            : `${API_URL}${selectedUser.avatar}`
                                    }
                                    className="inline-block w-72 h-72 m-3 border border-black border-solid cursor-pointer"
                                />
                            </label>
                            <input type="file" id="avatar" name="avatar" className="hidden"
                                onChange={onFieldChange}
                            />


                            {/* Gender */}
                            <div className="border border-dashed w-44 border-black p-2 flex flex-wrap m-3">
                                <div className="w-full ">
                                    <p>Giới tính:</p>
                                </div>

                                {/* Male */}
                                <div className="border border-dashed w-fit border-black p-1 mr-2">
                                    <input type="radio" name="gender" id="male"
                                        value={"male"}
                                        onChange={onFieldChange}
                                        checked={userInfo.gender !== undefined? userInfo.gender : selectedUser.gender}
                                    />
                                    <label htmlFor="male" className="m-2">Nam</label>
                                </div>

                                {/* Female */}
                                <div className="border border-dashed w-fit border-black p-1">
                                    <input type="radio" name="gender" id="female"
                                        value={"female"}
                                        onChange={onFieldChange}
                                        checked={userInfo.gender !== undefined? !userInfo.gender : !selectedUser.gender}
                                    />
                                    <label htmlFor="female" className="m-3">Nữ</label>
                                </div>
                            </div>

                            {/* Permission */}
                            <select name="permission" id="" className="border border-gray-300 rounded-md ml-3 px-4 py-2" onChange={onFieldChange} value={selectedUser.permission}>
                                <option value="CUSTOMER">CUSTOMER</option>
                                <option value="EMPLOYEE">EMPLOYEE</option>
                                <option value="MANAGER">MANAGER</option>
                            </select>
                        </div>

                        {/* Info form */}
                        <div className="h-full flex-1 flex flex-col justify-start p-3">
                            {/*Email*/}
                            <p className="p-3">{selectedUser.email}</p>

                            {/* Full name input */}
                            <input type="text" name="fullName" placeholder={selectedUser.fullName}
                                className={inputFieldsStyle}
                                onChange={onFieldChange}/>


                            {/* Phone number input */}
                            <input type="tel" name="phoneNumber" placeholder={selectedUser.phoneNumber}
                                className={inputFieldsStyle}
                                onChange={onFieldChange}/>

                            {/* Address input */}
                            <textarea name="address" placeholder={selectedUser.address}
                                className={`${inputFieldsStyle} flex-1`}
                                onChange={onFieldChange}
                            >
                            </textarea>

                            {/* Action area */}
                            <div className="h-fit p-3 mr-36 text-right">
                                <button type="button"
                                    className={buttonsStyle}
                                    onClick={cancel}
                                >
                                    Hủy
                                </button>

                                <button className={`${buttonsStyle} ml-5 bg-blue-500 text-white`}
                                >
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