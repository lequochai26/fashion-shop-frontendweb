import { useEffect, useState } from "react";
import Controller from "../../controllers/Controller";
import { makeAPIUrl } from "../../utils/APIFetcher";
import { redirect } from "../../utils/Redirector";
import LoadingPage from "../loadingpage/LoadingPage";
import Item from "../../entities/Item/model/Item";
import UpgradedLoadAllItemsController, { LoadAllItemsParam } from "../../controllers/homepage/UpgradedLoadAllItemsController";
import UpgradedLoadItemsByKeywordController, { LoadItemsByKeywordParam } from "../../controllers/homepage/UpgradedLoadItemsByKeywordController";
import UpgradedAddToCartController, { AddToCartParam } from "../../controllers/homepage/UpgradedAddToCartController";

export default function UpgradedHomePage() {
    // States:
    const [ items, setItems ] = useState<Item[] | undefined>(undefined);
    const [ keyword, setKeyword ] = useState<string>("");

    // Controllers:
    const loadAllItemsController: Controller<LoadAllItemsParam> = new UpgradedLoadAllItemsController();
    const loadItemsByKeywordController: Controller<LoadItemsByKeywordParam> = new UpgradedLoadItemsByKeywordController();
    const addToCartController: Controller<AddToCartParam> = new UpgradedAddToCartController();

    // Event handlers:
    async function onKeywordChange(event: any) {
        setKeyword(event.target.value);
    }

    async function onSearchButtonClick() {
        setItems(undefined);

        loadItemsByKeywordController.execute(
            {
                keyword,
                onEmpty() {
                    alert(`Vui lòng nhập từ khóa tìm kiếm!`)
                },
                onSuccess: function (items) {
                    setItems(items);
                },
                onFailed(code, message) {
                    alert(`Code: ${code}, Message: ${message}`);
                },
                onError: function (error: any) {
                    console.error(error);
                }
            }
        )
    }

    async function onReloadButtonClick() {
        setItems(undefined);

        loadAllItemsController.execute({
            onSuccess: setItems,
            onFailed(code, message) {
                alert(`Code: ${code}. Message: ${message}`);
            },
            onError: function (error: any) {
                console.error(error)
            }
        });
    }

    async function onAddToCartButtonClick(item: Item) {
        addToCartController.execute({
            item: item,
            onSuccess: function () {
                (window as any).reloadGeneralHeader();
                alert("Thêm sản phẩm vào giỏ hàng thành công!")
            },
            onError: function (error: any) {
                alert("Đã có lỗi xảy ra!");
                console.error(error);
            }
        });
    }

    async function onItemNameClick(item: Item) {
        redirect(`/itemdetail?id=${item.id}`);
    }

    // Init:
    useEffect(
        function () {
            loadAllItemsController.execute({
                onSuccess(items) {
                    setItems(items);
                },
                onFailed(code, message) {
                    alert(`Code: ${code}, Message: ${message}`)
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
        !items
        ? <LoadingPage />
        : (
            <div className="w-full h-fit ">
                {/* Search-bar */}
                <div className="w-full h-16 flex items-center justify-start border border-black border-solid">
                    {/* Keyword input field */}
                    <input type="text" placeholder="Từ khóa tìm kiếm" className="border border-black border-solid rounded-md p-2 pl-4 w-1/2 ml-3" value={keyword} onChange={onKeywordChange} />

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
                </div>

                {/* Items list */}
                <div className="w-full h-fit flex flex-wrap justify-center">
                    {
                        items.filter(item => item.isAvailable())
                        .map(
                            function (item: Item) {
                                return (
                                    <div key={item.id} className="w-fit h-fit border border-black border-solid flex flex-col justify-center items-center m-3 p-3">
                                        {/* Avatar */}
                                        <div>
                                            <img
                                                alt="Item's Avatar"
                                                src={item.avatar && makeAPIUrl(item.avatar)}
                                                className="w-40 h-40 mb-3"
                                            />
                                        </div>

                                        {/* Name */}
                                        <p
                                            className="w-11/12 h-fit font-bold text-xl mb-3 cursor-pointer"
                                            onClick={() => onItemNameClick(item)}
                                        >
                                            {item.name}
                                        </p>

                                        {/* Price */}
                                        <p className="w-11/12 h-fit mb-3">
                                            Giá: {
                                                !item.metadata
                                                ?
                                                `${item.getPriceVND()}`
                                                :
                                                `${item.getLowestPriceVND()} - $${item.getHighestPriceVND()}`
                                            }
                                        </p>

                                        {/* Add to cart button */}
                                        <button
                                            className="border border-black border-solid rounded-md p-2"
                                            onClick={() => onAddToCartButtonClick(item)}
                                        >
                                            Thêm vào giỏ hàng
                                        </button>
                                    </div>
                                );
                            }
                        )
                    }
                </div>
            </div>
        )
    );
}

// localhost:3001/itemdetail?id=ITEM01