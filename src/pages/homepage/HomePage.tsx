import { useEffect, useState } from "react";
import Item from "../../entities/Item/Item";
import Controller from "../../controllers/Controller";
import LoadAllItemsController, { LoadAllItemsParam } from "../../controllers/homepage/LoadAllItemsController";
import { makeAPIUrl } from "../../utils/APIFetcher";

export default function HomePage() {
    // States:
    const [ items, setItems ] = useState<Item[]>([]);

    // Controllers:
    const loadAllItemsController: Controller<LoadAllItemsParam> = new LoadAllItemsController();

    // Init:
    useEffect(
        function () {
            loadAllItemsController.execute({
                onSuccess(items) {
                    setItems(items);
                },
                onError(error) {
                    alert("Đã có lỗi xảy ra trong quá trình thực thi!");
                    console.error(error);
                }
            });
        },
        []
    );

    // Component return:
    return (
        <div className="w-screen h-fit">
            {/* Search-bar */}
            <div className="w-full h-16 flex items-center justify-start border border-black border-solid">
                {/* Keyword input field */}
                <input type="text" placeholder="Từ khóa tìm kiếm" className="border border-black border-solid rounded-md p-2 pl-4 w-1/2 ml-3" />

                {/* Search button */}
                <button className="bg-white p-2 pl-3 pr-3 border border-black border-solid rounded-md ml-3">
                    Tìm kiếm
                </button>

                {/* Reload button */}
                <button className="bg-white p-2 pl-3 pr-3 border border-black border-solid rounded-md ml-3">
                    Tải lại
                </button>
            </div>

            {/* Items list */}
            <div className="w-full h-fit flex flex-wrap justify-left">
                {
                    items.map(
                        function (item: Item, index: number) {
                            return (
                                <div key={index} className="w-fit h-fit border border-black border-solid flex flex-col justify-center items-center m-3 p-3">
                                    {/* Avatar */}
                                    <div>
                                        <img
                                            alt="Item's Avatar"
                                            src={makeAPIUrl(item.avatar)}
                                            className="w-40 h-40 mb-3"
                                        />
                                    </div>

                                    {/* Name */}
                                    <p className="w-11/12 h-fit font-bold text-xl mb-3">
                                        {item.name}
                                    </p>

                                    {/* Price */}
                                    <p className="w-11/12 h-fit mb-3">
                                        Giá: {item.price}
                                    </p>

                                    {/* Add to cart button */}
                                    <button className="border border-black border-solid rounded-md p-2">
                                        Thêm vào giỏ hàng
                                    </button>
                                </div>
                            );
                        }
                    )
                }
            </div>
        </div>
    );
}