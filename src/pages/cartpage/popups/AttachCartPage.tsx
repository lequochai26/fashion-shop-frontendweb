import { useState } from "react";
import CartItem from "../../../entities/cartitem/CartItem";
import { makeAPIUrl } from "../../../utils/APIFetcher";
import { formatMetadata } from "../../../utils/CartItemHelper";

export default function AttachCartPage({ cart, onCancel, onSubmit }: AttachCartPageParam) {
    // States:
    const [ slots, setSlots ] = useState<AttachCartItemSlot[]>(
        cart.map(
            cartItem => ({
                selected: false,
                cartItem
            })
        )
    );

    // Event handlers:
    async function onSlotSelect(slot: AttachCartItemSlot) {
        slot.selected = !slot.selected;
        setSlots([...slots]);
    }

    async function onAttachButtonClick() {
        const cart: CartItem[] = slots.filter(
            slot => slot.selected
        )
        .map(
            slot => slot.cartItem
        );

        if (cart.length < 1) {
            alert(`Không có sản phẩm nào được chọn để liên kết!`);
            return;
        }

        onSubmit(cart);
    }

    // Design:
    return (
        <div
            className="fixed left-0 top-0 w-screen h-screen flex flex-col justify-center items-center bg-black bg-opacity-50"
        >
            {/* Attach cart page */}
            <div className="bg-white p-5 rounded-md w-1/2 h-4/5 flex flex-col justify-between">
                {/* Title */}
                <div className="text-center text-xl font-bold mb-3">
                    Liên kết giỏ hàng tạm thời
                </div>

                {/* Cart items displaying area */}
                <div className="flex-1 overflow-y-scroll">
                    {
                        slots.map(
                            (slot) => (
                                <div className="flex flex-row justify-start items-stretch border border-black border-solid">
                                    {/* Checkbox */}
                                    <div className="flex flex-col justify-center ml-3 mr-5">
                                        <input
                                            type="checkbox"
                                            checked={ slot.selected }
                                            className="w-5 h-5"
                                            onChange={() => onSlotSelect(slot)}
                                        />
                                    </div>

                                    {/* Avatar */}
                                    <div className="mr-5 flex flex-col justify-center">
                                        <img
                                            alt="Item's avatar"
                                            src={ makeAPIUrl(slot.cartItem.item.avatar) }
                                            className="w-28 h-28"
                                        />
                                    </div>

                                    {/* Info display area */}
                                    <div className="flex-1 flex flex-col justify-between text-lg my-2">
                                        {/* Name */}
                                        <div className="font-bold">
                                            { slot.cartItem.item.name }
                                        </div>

                                        {/* Price */}
                                        <div>
                                            <b>Đơn giá:</b> ${
                                                (slot.cartItem.metadata && slot.cartItem.item.metadata)
                                                ?
                                                slot.cartItem.item.metadata
                                                    .getMapping(slot.cartItem.metadata)
                                                    ?.price
                                                :
                                                slot.cartItem.item.price
                                            }
                                        </div>

                                        {/* Total price */}
                                        <div>
                                            <b>Giá:</b> ${
                                                (slot.cartItem.metadata && slot.cartItem.item.metadata)
                                                ?
                                                (slot.cartItem.item.metadata
                                                    .getMapping(slot.cartItem.metadata)
                                                    ?.price as number) * slot.cartItem.amount
                                                :
                                                slot.cartItem.item.price * slot.cartItem.amount
                                            }
                                        </div>

                                        {/* Metadata */}
                                        {
                                            slot.cartItem.metadata
                                            &&
                                            <div>
                                                <b>Phân loại: </b> { formatMetadata(slot.cartItem.metadata) }
                                            </div>
                                        }

                                        {/* Amount */}
                                        <div>
                                            <b>Số lượng:</b> { slot.cartItem.amount }
                                        </div>
                                    </div>
                                </div>
                            )
                        )
                    }
                </div>

                {/* Actions area */}
                <div className="text-right">
                    {/* Cancel button */}
                    <button
                        className="py-1 px-3 border border-black border-solid rounded-md"
                        onClick={() => onCancel()}
                    >
                        Hủy
                    </button>

                    {/* Link button */}
                    <button
                        className="py-1 px-3 bg-orange-600 text-white rounded-md ml-5"
                        onClick={onAttachButtonClick}
                    >
                        Liên kết
                    </button>
                </div>
            </div>
        </div>
    );
}

export interface AttachCartPageParam {
    cart: CartItem[];
    onCancel(): void;
    onSubmit(cart: CartItem[]): void;
}

export interface AttachCartItemSlot {
    selected: boolean;
    cartItem: CartItem;
}