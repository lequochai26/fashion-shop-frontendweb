import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Controller from "../../controllers/Controller";
import { getOrderStatusTitle } from "../../utils/OrderHelper";
import { makeAPIUrl } from "../../utils/APIFetcher";
import CancelOrderController, { CancelOrderParam } from "../../controllers/orderdetailpage/CancelOrderController";
import NoAccessPage from "../noaccesspage/NoAccessPage";
import LoadingPage from "../loadingpage/LoadingPage";
import LoadOrderController, { LoadOrderParam } from "../../controllers/orderdetailpage/LoadOrderController";
import Order from "../../entities/order/model/Order";
import { redirect } from "../../utils/Redirector";
import Item from "../../entities/Item/model/Item";

export default function OrderDetailPage() {
    // Queries
    const [ searchParams ] = useSearchParams();
    const id: string | null = searchParams.get("id");

    // States:
    const [ order, setOrder ] = useState<Order | undefined | null>(undefined);

    // Controllers:
    const loadOrderController: Controller<LoadOrderParam> = new LoadOrderController();
    const cancelOrderController: Controller<CancelOrderParam> = new CancelOrderController();

    // Init
    function init() {
        if (!id) {
            setOrder(null);
            return;
        }

        loadOrderController.execute({
            id,
            onSuccess: setOrder,
            onError: function (error: any) {
                alert("Đã có lỗi xảy ra trong quá trình thực thi!");
                console.error(error);
            },
            onFailed(code, message) {
                setOrder(null);
            },
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(init, []);

    // Event handlers:
    async function onCancelButtonClick() {
        if(
            !window.confirm("Bạn có chắc muốn hủy đơn hàng này ?")
        ) {
            return;
        }

        cancelOrderController.execute({
            id: id as string,
            onSuccess() {
                alert("Đơn hàng đã được hủy thành công!");
                init();
            },
            onFailed(code, message) {
                alert(`Code: ${code}, Message: ${message}`);
            },
            onError(error) {
                alert("Đã có lỗi xảy ra!");
                console.error(error);
            },
        });
    }

    async function onBackButtonClick() {
        redirect("/orderedorders")
    }

    async function onItemNameClick(item: Item) {
        redirect(`/itemdetail?id=${item.id}`);
    }

    // Styles:
    const labelsStyle: string = "text-lg pt-1 pb-1"

    // Design:
    return (
        order === undefined
        ?
        <LoadingPage />
        :
        !order
        ?
        <NoAccessPage />
        :
        <div
            className="flex flex-col justify-start w-1/2 mt-8 border border-black border-solid p-2"
        >
            {/* ID */}
            <p className={`${labelsStyle} font-bold text-xl`}>
                <b>Mã đơn hàng:</b> { order?.id }
            </p>

            {/* Status */}
            <p className={labelsStyle}>
                <b>Trạng thái:</b> { getOrderStatusTitle(order?.status as string) }
            </p>

            {/* Date */}
            <p className={labelsStyle}>
                <b>Ngày đặt:</b> { order.toStringDate() }
            </p>

            {/* Total price */}
            <p className={labelsStyle}>
                <b>Tổng giá trị:</b> { order.getTotalPriceVND() }
            </p>

            {/* Order items */}
            <div className="flex-1 flex flex-col overflow-scroll">
                {
                    order?.items.map(
                        orderItem => (
                            <div className="h-fit flex flex-row justify-between border border-black border-solid" key={orderItem.item?.id}>
                                {/* Avatar */}
                                <div className="w-fit">
                                    <img
                                        alt="Item's avatar"
                                        src={
                                            orderItem.item?.avatar
                                            &&
                                            makeAPIUrl(orderItem.item.avatar)
                                        }
                                        className="w-36 h-36 m-3 border border-black border-solid"
                                    />
                                </div>

                                {/* Info */}
                                <div className="flex-1 flex flex-col justify-between p-3">
                                    {/* Name */}
                                    <p
                                        className="text-xl font-bold cursor-pointer"
                                        onClick={() => orderItem.item && onItemNameClick(orderItem.item)}
                                    >
                                        { orderItem.item?.name }
                                    </p>

                                    {/* Item price */}
                                    <p className="text-lg">
                                        <b>Đơn giá:</b> { orderItem.item?.getPriceVND(orderItem.metadata) }
                                    </p>

                                    {/* Price */}
                                    <p className="text-lg">
                                        <b>Giá:</b> { orderItem.getPriceVND() }
                                    </p>

                                    {/* Amount */}
                                    <p className="text-lg">
                                        <b>Số lượng:</b> { orderItem.amount }
                                    </p>

                                    {/* Metadata */}
                                    {
                                        orderItem.metadata
                                        &&
                                        <p className="text-lg">
                                            <b>Phân loại:</b> { orderItem.toStringMetadata() }
                                        </p>
                                    }
                                </div>
                            </div>
                        )
                    )
                }
            </div>

            {/* Actions */}
            {
                // (order.status === "APPROVEMENT_AWAITING")
                // &&
                // <div className="h-fit text-right">
                //     <button
                //         className="text-lg font-bold border border-black border-solid rounded-md pt-1 pb-1 pl-4 pr-4 cursor-pointer mr-3"
                //         onClick={onCancelButtonClick}
                //     >
                //         Hủy
                //     </button>
                // </div>
            }

            {/* Actions */}
            <div
                className="flex flex-row justify-between mt-5 mb-3"
            >
                {/* Back button */}
                <button
                    className="text-lg border border-black border-solid rounded-md pt-1 pb-1 pl-4 pr-4 cursor-pointer ml-3"
                    onClick={onBackButtonClick}
                >
                    Quay lại
                </button>

                {/* Cancel button */}
                {
                    (order.status === "APPROVEMENT_AWAITING")
                    &&
                    <button
                        className="text-lg rounded-md pt-1 pb-1 pl-4 pr-4 cursor-pointer mr-3 bg-red-600 text-white"
                        onClick={onCancelButtonClick}
                    >
                        Hủy
                    </button>
                }
            </div>
        </div>
    );
}