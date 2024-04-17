import { useEffect, useState } from "react";
import CartItem from "../../entities/cartitem/CartItem";
import Controller from "../../controllers/Controller";
import LoadCartController, { LoadCartParam } from "../../controllers/cartpage/LoadCartController";
import { makeAPIUrl } from "../../utils/APIFetcher";

export default function CartPage() {
    // States:
    const [ cart, setCart ] = useState<CartItem[]>([]);

    // Controllers:
    const loadCartController: Controller<LoadCartParam> = new LoadCartController();

    // Init
    function init() {
        loadCartController.execute({
            onSuccess: setCart,
            onError: error => console.error(error)
        });
    }

    useEffect(
        init, []
    );

    // Component return:
    return (
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
                                        Giá: { cartItem.item.price }
                                    </p>

                                    {/* Metadata */}
                                    <p className="text-lg">
                                        Phân loại: {
                                            !cartItem.metadata ? "Không có phân loại"
                                            : (() => {
                                                let metadata: string = "";

                                                for (const [key, value] of Object.entries(metadata)) {
                                                    metadata += `${key}: ${value}${metadata ? ", " : ""}`
                                                }

                                                return metadata;
                                            })()
                                        }
                                    </p>

                                    {/* Amount row */}
                                    <div className="w-full h-fit p-3">
                                        {/* Remove button */}
                                        <img
                                            alt="Remove Button"
                                            src="/remove.png"
                                            className="inline-block w-6 h-6 cursor-pointer"
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
                                        />

                                        {/* Delete button */}
                                        <img
                                            alt="Delete button"
                                            src="/delete.png"
                                            className="inline-block w-6 h-6 cursor-pointer ml-4"
                                        />
                                    </div>
                                </div>
                            </div>
                        )
                    )
                }
            </div>

            {/* Action area */}
            <div className="w-full h-fit flex flex-row-reverse border border-black border-solid">
                {/* Buy button */}
                <button
                    className="p-2 border border-black border-solid font-bold rounded-md m-3"
                >
                    Đặt hàng
                </button>
            </div>
        </div>
    );
}