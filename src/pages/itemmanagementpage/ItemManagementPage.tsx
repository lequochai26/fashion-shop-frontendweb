import { useEffect, useState } from "react"
import Item from "../../entities/Item/Item";
import Controller from "../../controllers/Controller";
import LoadAllItemsController, { LoadAllItemsParam } from "../../controllers/itemmanagement/LoadAllItemsController";
import LoadingPage from "../loadingpage/LoadingPage";
import LoadLoggedInUserController, { LoadLoggedInUserParam } from "../../controllers/LoadLoggedInUserController";
import NoAccessPage from "../noaccesspage/NoAccessPage";
import NewItemController, { NewItemParam } from "../../controllers/itemmanagement/NewItemController";
import NewItemPage from "./popups/newitempage/NewItemPage";

export default function ItemManagementPage() {
    // States:
    const [ access, setAccess ] = useState<boolean | undefined>(undefined);
    const [ items, setItems ] = useState<Item[] | undefined>(undefined);
    const [ popup, setPopup ] = useState<any | undefined>();

    // Controllers:
    const loadAllItemsController: Controller<LoadAllItemsParam> = new LoadAllItemsController();
    const loadLoggedInUserController: Controller<LoadLoggedInUserParam> = new LoadLoggedInUserController();
    const newItemController: Controller<NewItemParam> = new NewItemController();

    // Init:
    function init() {
        loadLoggedInUserController.execute({
            onSuccess(user) {
                if (user.permission !== "MANAGER") {
                    setAccess(false);
                    return;
                }

                setAccess(true);

                loadAllItemsController.execute(
                    {
                        onSuccess: setItems,
                        onFailed(code, message) {
                            alert(`Code: ${code}, Message: ${message}`);
                        },
                        onError(error) {
                            alert(`Đã xảy ra lỗi trong quá trình thực thi!`);
                            console.error(error);
                        },
                    }
                );
            },
            onFailed(code, message) {
                setAccess(false);

                if (code !== "NOT_LOGGED_IN" && code !== "USER_NOT_EXIST") {
                    alert(`Code: ${code}, Message: ${message}`);
                }
            },
            onError(error) {
                setAccess(false);
                alert(`Đã có lỗi xảy ra trong quá trình thực thi!`);
                console.error(error);
            },
        });
    }

    useEffect(init, []);

    // Event handlers:
    async function onNewButtonClick() {
        setPopup(
            <NewItemPage
                onSubmit={
                    function (form) {
                        newItemController.execute({
                            form,
                            onSuccess() {
                                setPopup(undefined);
                                setItems(undefined);
                                loadAllItemsController.execute({
                                    onSuccess: setItems,
                                    onFailed(code, message) {
                                        alert(`Code: ${code}, Message: ${message}`);
                                    },
                                    onError(error) {
                                        alert("Đã có lỗi xảy ra trong quá trình thực thi!");
                                        console.error(error);
                                    },
                                })
                            },
                            onFailed(code, message) {
                                alert(message);
                            },
                            onError(error) {
                                alert("Đã có lỗi xảy ra trong quá trình thực thi!");
                                console.error(error);
                            },
                        });
                    }
                }
                onCancel={() => setPopup(undefined)}
            />
        );
    }
    
    // Design:
    return (
        access === undefined
        ?
        <LoadingPage />
        :
        !access
        ?
        <NoAccessPage />
        :
        !items
        ?
        <LoadingPage />
        :
        <div className="w-full h-full flex flex-col justify-start">
            {/* Search bar */}
            <div className="w-full h-fit flex flex-row justify-start p-2">
                {/* Keyword input field */}
                <input
                    type="text"
                    placeholder="Từ khóa tìm kiếm"
                    className="p-1 pl-4 w-1/3 border border-black border-solid rounded-md mr-3"
                />

                {/* Search button */}
                <button className="p-1 border border-black border-solid rounded-md cursor-pointer mr-3">
                    Tìm kiếm
                </button>

                {/* Reload button */}
                <button className="p-1 border border-black border-solid rounded-md cursor-pointer">
                    Tải lại
                </button>

                {/* New button */}
                <div className="flex-1 text-right">
                    <button className="p-1 border border-black border-solid rounded-md cursor-pointer bg-green-600 text-white px-3" onClick={onNewButtonClick}>
                        Thêm
                    </button>
                </div>
            </div>

            {/* Data table */}
            <div className="flex-1 flex flex-col justify-start w-full overflow-y-scroll">
                {/* Header row */}
                <div className="flex flex-row w-full justify-between">
                    <div className="w-1/6 font-bold border border-black border-solid p-1 pl-3">
                        Mã
                    </div>

                    <div className="w-1/6 font-bold border border-black border-solid p-1 pl-3">
                        Tên
                    </div>

                    <div className="w-1/4 font-bold border border-black border-solid p-1 pl-3">
                        Mô tả
                    </div>

                    <div className="flex-1 font-bold border border-black border-solid p-1 pl-3">
                        Hành động
                    </div>
                </div>

                {/* Data rows */}
                {
                    items.map(
                        item => (
                            <div className="flex flex-row w-full justify-between">
                                <div className="w-1/6 border border-black border-solid p-1 pl-3 overflow-hidden overflow-ellipsis text-nowrap">
                                    { item.id }
                                </div>

                                <div className="w-1/6 border border-black border-solid p-1 pl-3 overflow-hidden overflow-ellipsis text-nowrap">
                                    { item.name }
                                </div>

                                <div className="w-1/4 border border-black border-solid p-1 pl-3 overflow-hidden overflow-ellipsis text-nowrap">
                                    { item.description }
                                </div>

                                <div className="flex-1 border border-black border-solid p-1 pl-3">
                                    <button
                                        className="p-1 border border-black border-solid rounded-md cursor-pointer bg-sky-500 text-white px-3 mr-3"
                                    >
                                        Sửa
                                    </button>

                                    <button
                                        className="p-1 border border-black border-solid rounded-md cursor-pointer bg-red-600 text-white px-3"
                                    >
                                        Xóa
                                    </button>
                                </div>
                            </div>
                        )
                    )
                }
            </div>

            {/* Popup */}
            { popup }
        </div>
    )
}