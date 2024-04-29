import { useEffect, useState } from "react";
import Cart from "../../entities/cartitem/model/Cart";
import Controller from "../../controllers/Controller";
import UpdatedLoadCartController, { LoadCartParam } from "../../controllers/UpdatedLoadCartController";
import UpdatedRemoveCartItemController, { RemoveCartItemParam } from "../../controllers/cartpage/updated/UpdatedRemoveCartItemController";
import UpdatedAddCartItemController, { AddCartItemParam } from "../../controllers/cartpage/updated/UpdatedAddCartItemController";
import UpdatedDeleteCartItemController, { DeleteCartItemParam } from "../../controllers/cartpage/updated/UpdatedDeleteCartItemController";
import BuyController, { BuyParam } from "../../controllers/cartpage/BuyController";
import AttachCartController, { AttachCartParam } from "../../controllers/cartpage/AttachCartController";
import CartItem from "../../entities/cartitem/model/CartItem";
import { redirect } from "../../utils/Redirector";
import LoadingPage from "../loadingpage/LoadingPage";
import { makeAPIUrl } from "../../utils/APIFetcher";
import UpdatedAttachCartPage from "./popups/UpdatedAttachCartPage";

export default function UpdatedCartPage() {
    // States:
    const [ cart, setCart ] = useState<Cart | undefined>(undefined);
    const [ sessionCart, setSessionCart ] = useState<Cart | undefined>(undefined);
    const [ popup, setPopup ] = useState<any | undefined>(undefined);

    // Controllers:
    const loadCartController: Controller<LoadCartParam> = new UpdatedLoadCartController();
    const removeCartItemController: Controller<RemoveCartItemParam> = new UpdatedRemoveCartItemController();
    const addCartItemController: Controller<AddCartItemParam> = new UpdatedAddCartItemController();
    const deleteCartItemController: Controller<DeleteCartItemParam> = new UpdatedDeleteCartItemController();
    const buyController: Controller<BuyParam> = new BuyController();
    const attachCartController: Controller<AttachCartParam> = new AttachCartController()

    // Init
    function init() {
        loadCartController.execute({
            onSuccess(sessionCart, userCart) {
                if (userCart) {
                    setCart(userCart);
                    
                    if (!sessionCart.isEmpty()){
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
        init, []
    );

    // Event handlers:
    async function onRemoveCartItemButtonClick(cartItem: CartItem) {
        removeCartItemController.execute({
            cartItem,
            onSuccess() {
                init();
                (window as any).reloadGeneralHeader();
            },
            onFailed(code, message) {
                alert(`Code: ${code}, Message: ${message}`);
            },
            onError(error: any) {
                alert(`Đã có lỗi xảy ra trong quá trình xử lý!`);
                console.error(error);
            }
        });
    }

    async function onAddCartItemButtonClick(cartItem: CartItem) {
        addCartItemController.execute({
            cartItem,
            onSuccess() {
                init();
                (window as any).reloadGeneralHeader();
            },
            onFailed(code, message) {
                alert(`Code: ${code}, Message: ${message}`);
            },
            onError(error: any) {
                alert(`Đã có lỗi xảy ra trong quá trình thực thi!`);
                console.error(error);
            }
        });
    }

    async function onDeleteCartItemButtonClick(cartItem: CartItem) {
        deleteCartItemController.execute({
            cartItem,
            onSuccess() {
                init();
                (window as any).reloadGeneralHeader();
            },
            onFailed(code, message) {
                alert(`Code: ${code}, Message: ${message}`);
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

    async function onAttachCartButtonClick() {
        setPopup(
            <UpdatedAttachCartPage
                cart={sessionCart as Cart}
                onCancel={() => setPopup(undefined)}
                onSubmit={onAttachCart}
            />
        );
    }

    async function onAttachCart(cart: CartItem[]) {
        attachCartController.execute({
            items: cart.map(
                cartItem => ({
                    id: cartItem.item?.id as string,
                    metadata: cartItem.metadata
                })
            ),
            onSuccess() {
                setPopup(undefined);
                init();
            },
            onFailed(code, message) {
                alert(`Code: ${code}, Message: ${message}`);
            },
            onError(error) {
                alert(`Đã có lỗi xảy ra trong quá trình thực thi!`);
                console.error(error);
            },
        });
    }

    async function onBackButtonClick() {
        redirect("/");
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
                    cart.items.map(
                        cartItem => (
                            <div
                                className="w-full h-fit flex flex-row justify-between items-start border border-black border-solid"
                            >

                                {/* Avatar */}
                                <div className="w-fit h-full">
                                    <img
                                        alt="Item's Avatar"
                                        src={cartItem.item?.avatar && makeAPIUrl(cartItem.item.avatar)}
                                        className="w-32 h-32 m-3 border border-black border-solid"
                                    />
                                </div>

                                {/* Info area */}
                                <div className="flex-1 mt-3 h-fit">
                                    {/* Name */}
                                    <p className="font-bold text-lg">
                                        { cartItem.item?.name }
                                    </p>

                                    {/* Price */}
                                    <p className="text-lg">
                                        <b>Đơn giá:</b> {cartItem.item?.getPriceVND(cartItem.metadata)}
                                    </p>

                                    {/* Total price */}
                                    <p className="text-lg">
                                        <b>Giá:</b> { cartItem.getTotalPriceVND() }
                                    </p>

                                    {/* Metadata */}
                                    <p className="text-lg">
                                        <b>Phân loại:</b> {
                                            cartItem.toStringMetadata() || "Không có phân loại"
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
                    <b>Tổng giá trị:</b> ${ cart.getTotalPriceVND() }
                </div>

                {/* Cancel button */}
                <button
                    className="p-2 border border-black border-solid font-bold rounded-md m-3"
                    onClick={onBackButtonClick}
                >
                    Quay lại
                </button>

                {/* Buy button */}
                <button
                    className="p-2 font-bold rounded-md m-3 bg-orange-600 text-white"
                    onClick={onBuyButtonClick}
                >
                    Đặt hàng
                </button>
            </div>

            {/* Attach cart button */}
            {
                sessionCart
                &&
                <div
                    className="fixed right-5 bottom-5 border border-orange-600 border-solid rounded-md px-3 py-1 text-xl font-bold text-orange-600 flex flex-row justify-between items-center cursor-pointer"
                    onClick={onAttachCartButtonClick}
                >
                    <p
                        className="mr-2"
                    >
                        Liên kết giỏ hàng ({ sessionCart.items.length })
                    </p>

                    <img
                        alt="Cart logo"
                        src="/shopping-cart.png"
                        className="w-12 h-12"
                    />
                </div>
            }

            {/* Popup */}
            { popup }
        </div>
    );
}