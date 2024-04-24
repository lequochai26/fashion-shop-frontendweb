import { useEffect, useState } from "react"
import Item from "../../entities/Item/Item";
import Controller from "../../controllers/Controller";
import LoadAllItemsController, { LoadAllItemsParam } from "../../controllers/itemmanagement/LoadAllItemsController";
import LoadingPage from "../loadingpage/LoadingPage";

export default function ItemManagementPage() {
    // States:
    const [ items, setItems ] = useState<Item[] | undefined>(undefined);

    // Controllers:
    const loadAllItemsController: Controller<LoadAllItemsParam> = new LoadAllItemsController();

    // Init:
    function init() {
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
        )
    }

    useEffect(init, []);
    
    // Design:
    return (
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
                    <button className="p-1 border border-black border-solid rounded-md cursor-pointer bg-green-600 text-white px-3">
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

                {/* <table className="w-full" border={1} cellPadding={0} cellSpacing={0}>
                    <thead>
                        <tr>
                            <th>
                                Mã
                            </th>

                            <th>
                                Tên
                            </th>

                            <th>
                                Mô tả
                            </th>

                            <th>
                                Hành động
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>
                                SHIRT001
                            </td>

                            <td>
                                Áo gucci siêu chất lượng
                            </td>

                            <td>
                                <div className="w-1/2 h-full overflow-ellipsis text-nowrap">
                                    Đây là một chiếc áo Gucci mà không có điểm nào để chê luôn Đây là một chiếc áo Gucci mà không có điểm nào để chê luôn Đây là một chiếc áo Gucci mà không có điểm nào để chê luôn Đây là một chiếc áo Gucci mà không có điểm nào để chê luôn
                                </div>
                            </td>

                            <td>
                                <button
                                    className="p-1 border border-black border-solid rounded-md cursor-pointer bg-cyan-500 text-white px-3 mx-1"
                                >
                                    Sửa
                                </button>

                                <button
                                    className="p-1 border border-black border-solid rounded-md cursor-pointer bg-red-600 text-white px-3 mx-1"
                                >
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table> */}
            </div>
        </div>
    )
}