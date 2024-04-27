import { useEffect, useState } from "react";
import CartItem from "../../entities/cartitem/CartItem";
import Controller from "../../controllers/Controller";
import { makeAPIUrl } from "../../utils/APIFetcher";
import RemoveCartItemController, { RemoveCartItemParam } from "../../controllers/cartpage/RemoveCartItemController";
import AddCartItemController, { AddCartItemParam } from "../../controllers/cartpage/AddCartItemController";
import DeleteCartItemController, { DeleteCartItemParam } from "../../controllers/cartpage/DeleteCartItemController";
import BuyController, { BuyParam } from "../../controllers/cartpage/BuyController";
import { redirect } from "../../utils/Redirector";
import { formatMetadata } from "../../utils/CartItemHelper";
import LoadingPage from "../loadingpage/LoadingPage";
import { Mapping } from "../../entities/Item/Metadata";
import UpgradedLoadCartController, { LoadCartParam } from "../../controllers/UpgradedLoadCartController";

export default function UpgradedCartPage() {
    // States:
    const [ cart, setCart ] = useState<CartItem[] | undefined>(undefined);
    const [ sessionCart, setSessionCart ] = useState<CartItem[] | undefined>(undefined);

    // Controllers:
    const loadCartController: Controller<LoadCartParam> = new UpgradedLoadCartController();
    const removeCartItemController: Controller<RemoveCartItemParam> = new RemoveCartItemController();
    const addCartItemController: Controller<AddCartItemParam> = new AddCartItemController();
    const deleteCartItemController: Controller<DeleteCartItemParam> = new DeleteCartItemController();
    const buyController: Controller<BuyParam> = new BuyController();

    // Init
    function init() {
        loadCartController.execute({
            onSuccess(sessionCart, userCart) {
                if (userCart) {
                    setCart(userCart);
                    
                    if (sessionCart.length > 0){
                        setSessionCart(sessionCart);
                    }
                    else {
                        setSessionCart(undefined);
                    }
                }
                else {
                    setCart(sessionCart);
                }
            },
            onFailed(code, message) {
                alert(`Code: ${code}, Message: ${message}`);
            },
            onError(error) {
                alert(`Đã có lỗi xảy ra trong quá trình xử lý!`);
                console.error(error);
            },
        });
    }

    useEffect(
        init, []
    );

    // Event handlers:
    async function onRemoveCartItemButtonClick(cartItem: CartItem) {
        removeCartItemController.execute({
            cartItem,
            onSuccess: function () {
                init();
                (window as any).reloadGeneralHeader();
            },
            onError: console.error
        });
    }

    async function onAddCartItemButtonClick(cartItem: CartItem) {
        addCartItemController.execute({
            cartItem,
            onSuccess: init,
            onError: console.error
        });
    }

    async function onDeleteCartItemButtonClick(cartItem: CartItem) {
        deleteCartItemController.execute({
            cartItem,
            onSuccess: function () {
                init();
                (window as any).reloadGeneralHeader();
            },
            onError: console.error
        });
    }

    async function onBuyButtonClick() {
        buyController.execute({
            onSuccess: function () {
                alert("Đặt hàng thành công, cùng kiểm tra trong danh sách những đơn hàng đã đặt nhé!");
                redirect("/orderedorders");
            },
            onFailed: function(reason: string) {
                let content: string;

                switch(reason) {
                    case 'NO_ITEM_IN_CART': {
                        content = "Không có sản phẩm nào trong giỏ hàng!";
                        break;
                    }

                    case 'HANDLING_DB_FAILED': {
                        content = "Xảy ra lỗi trong quá trình thực thi!";
                        break;
                    }

                    default: {
                        content = "Vui lòng đăng nhập trước khi đặt hàng!";
                    }
                }

                alert(content);
            },
            onError: console.error
        });
    }

    // Operations:
    function calcTotalPrice(): number {
        if (!cart) {
            return 0;
        }

        let result: number = 0;

        for (const item of cart) {
            if (!item.metadata) {
                result += item.amount * item.item.price;
            }
            else {
                const mapping: Mapping | undefined = item.item.metadata?.getMapping(
                    item.metadata
                );

                if (!mapping) {
                    continue;
                }

                result += mapping.price * item.amount;
            }
        }

        return result;
    }

    // Component return:
    return (
        !cart
        ?
        <LoadingPage />
        :
        <div className="h-full w-1/2 flex flex-col justify-between">
            {/* Title bar */}
            <div className="w-full h-fit p-2 border border-black border-solid">
                <h1 className="text-center font-bold text-2xl">
                    Giỏ hàng của bạn
                </h1>
            </div>

            {/* Items area */}
            <div className="w-full flex-1 overflow-scroll">
                {
                    cart.map(
                        cartItem => (
                            <div
                                className="w-full h-fit flex flex-row justify-between items-start border border-black border-solid"
                            >

                                {/* Avatar */}
                                <div className="w-fit h-full">
                                    <img
                                        alt="Item's Avatar"
                                        src={makeAPIUrl(cartItem.item.avatar)}
                                        className="w-32 h-32 m-3 border border-black border-solid"
                                    />
                                </div>

                                {/* Info area */}
                                <div className="flex-1 mt-3 h-fit">
                                    {/* Name */}
                                    <p className="font-bold text-lg">
                                        { cartItem.item.name }
                                    </p>

                                    {/* Price */}
                                    <p className="text-lg">
                                        Đơn giá: ${
                                            (cartItem.metadata && cartItem.item.metadata)
                                            ?
                                            (cartItem.item.metadata)
                                                .getMapping(cartItem.metadata)
                                                ?.price
                                            :
                                            cartItem.item.price
                                        }
                                    </p>

                                    {/* Total price */}
                                    <p className="text-lg">
                                        Giá: ${
                                            (cartItem.metadata && cartItem.item.metadata)
                                            ?
                                            (cartItem.item.metadata.getMapping(cartItem.metadata)
                                                ?.price as number) * cartItem.amount
                                            :
                                            cartItem.amount * cartItem.item.price
                                        }
                                    </p>

                                    {/* Metadata */}
                                    <p className="text-lg">
                                        Phân loại: {
                                            !cartItem.metadata ? "Không có phân loại"
                                            : formatMetadata(cartItem.metadata)
                                        }
                                    </p>

                                    {/* Amount row */}
                                    <div className="w-full h-fit p-3">
                                        {/* Remove button */}
                                        <img
                                            alt="Remove Button"
                                            src="/remove.png"
                                            className="inline-block w-6 h-6 cursor-pointer"
                                            onClick={ () => onRemoveCartItemButtonClick(cartItem) }
                                        />

                                        {/* Amount */}
                                        <p className="inline-block pl-3 pr-3">
                                            { cartItem.amount }
                                        </p>

                                        {/* Add button */}
                                        <img
                                            alt="Add Button"
                                            src="/add.png"
                                            className="inline-block w-6 h-6 cursor-pointer"
                                            onClick={ () => onAddCartItemButtonClick(cartItem) }
                                        />

                                        {/* Delete button */}
                                        <img
                                            alt="Delete button"
                                            src="/delete.png"
                                            className="inline-block w-6 h-6 cursor-pointer ml-4"
                                            onClick={ () => onDeleteCartItemButtonClick(cartItem) }
                                        />
                                    </div>
                                </div>
                            </div>
                        )
                    )
                }
            </div>

            {/* Action area */}
            <div
                className="w-full h-fit flex flex-row justify-between items-center border border-black border-solid"
            >
                {/* Total price */}
                <div className="flex-1 ml-3 text-lg">
                    <b>Tổng giá trị:</b> ${ calcTotalPrice() }
                </div>

                {/* Buy button */}
                <button
                    className="p-2 border border-black border-solid font-bold rounded-md m-3"
                    onClick={onBuyButtonClick}
                >
                    Đặt hàng
                </button>
            </div>

            {/* Link cart button */}
            {
                sessionCart
                &&
                <div
                    className="fixed right-5 bottom-5 border border-orange-600 border-solid rounded-md px-3 py-1 text-xl font-bold text-orange-600 flex flex-row justify-between items-center cursor-pointer"
                >
                    <p
                        className="mr-2"
                    >
                        Liên kết giỏ hàng ({ sessionCart.length })
                    </p>

                    <img
                        alt="Cart logo"
                        src="/shopping-cart.png"
                        className="w-12 h-12"
                    />
                </div>
            }
        </div>
    );
}