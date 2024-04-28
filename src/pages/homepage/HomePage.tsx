import { useEffect, useState } from "react";
import Item from "../../entities/Item/Item";
import Controller from "../../controllers/Controller";
import LoadAllItemsController, { LoadAllItemsParam } from "../../controllers/homepage/LoadAllItemsController";
import { makeAPIUrl } from "../../utils/APIFetcher";
import LoadItemsByKeywordController, { LoadItemsByKeywordParam } from "../../controllers/homepage/LoadItemsByKeywordController";
import AddToCartController, { AddToCartParam } from "../../controllers/homepage/AddToCartController";
import { redirect } from "../../utils/Redirector";
import LoadingPage from "../loadingpage/LoadingPage";

export default function HomePage() {
    // States:
    const [ items, setItems ] = useState<Item[] | undefined>(undefined);
    const [ keyword, setKeyword ] = useState<string>("");

    // Controllers:
    const loadAllItemsController: Controller<LoadAllItemsParam> = new LoadAllItemsController();
    const loadItemsByKeywordController: Controller<LoadItemsByKeywordParam> = new LoadItemsByKeywordController();
    const addToCartController: Controller<AddToCartParam> = new AddToCartController();

    // Event handlers:
    async function onKeywordChange(event: any) {
        setKeyword(event.target.value);
    }

    async function onSearchButtonClick() {
        setItems(undefined);

        loadItemsByKeywordController.execute(
            {
                keyword,
                onSuccess: function (items) {
                    setItems(items);
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
                <div id="top" className="w-full h-16 flex items-center justify-start border border-black border-solid">
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
                        items.map(
                            function (item: Item) {
                                return (
                                    <div key={item.id} className="w-fit h-fit border border-black border-solid flex flex-col justify-center items-center m-3 p-3">
                                        {/* Avatar */}
                                        <div>
                                            <img
                                                alt="Item's Avatar"
                                                src={makeAPIUrl(item.avatar)}
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
                                                `$${item.price}`
                                                :
                                                `$${item.metadata.mappings.sort((a: any, b: any) => a.price-b.price)[0].price} - $${item.metadata.mappings.sort((a: any, b: any) => b.price-a.price)[0].price}`
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

                <div>
                    <a href="#top" className="scroll-behavior-scroll"><button>TOP</button></a>
                </div>
            </div>
        )
    );
}

// localhost:3001/itemdetail?id=ITEM01