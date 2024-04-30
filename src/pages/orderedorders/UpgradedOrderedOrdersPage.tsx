import { useEffect, useState } from "react"
import Controller from "../../controllers/Controller"
import CancelOrderController, { CancelOrderControllerParam } from "../../controllers/orderedorders/CancelOrderController"
import { redirect } from "../../utils/Redirector"
import LoadingPage from "../loadingpage/LoadingPage"
import NoAccessPage from "../noaccesspage/NoAccessPage"
import Order from "../../entities/order/model/Order"
import UpgradedLoadOrderedOrdersController, { UpgradedLoadOrderedOrdersParams } from "../../controllers/orderedorders/UpgradedLoadOrderedOrdersController"


export default function UpgradedOrderedOrdersPage() {
    //State:
    const [orders, setOrders] = useState<Order[] | undefined | null>(undefined);

    //Controller
    const orderedOrdersController: Controller<UpgradedLoadOrderedOrdersParams> = new UpgradedLoadOrderedOrdersController()
    const cancelOrderController: Controller<CancelOrderControllerParam> = new CancelOrderController();


    useEffect(() => {
        init();
    }, [])

    //Method
    function init() {
        orderedOrdersController.execute(
            {
                onSuccess: async function (orders: Order[]) {
                    setOrders(orders);
                },
                onFailed(code, message) {
                    setOrders(null);

                    if (code === 'NOT_LOGGED_IN' || code === 'USER_NOT_EXIST') {
                        return;
                    }

                    if (code === 'HANDLING_DB_FAILED') {
                        alert(`Xảy ra lỗi trong quá trình thực thi ở cơ sở dữ liệu!`);
                        return;
                    }

                    alert(`Code: ${code}, Message: ${message}`);
                },
                onError(error: any) {
                    alert("Đã có lỗi xảy ra trong quá trình thực thi!");
                    console.error(error);
                }
            }
        )
    }
    function onCancelOrder(event: any, id: string) {
        //Prevent default
        event.preventDefault();

        const confirmation = window.confirm("Bạn có chắc chắn muốn huỷ đơn hàng này không?");

        if (confirmation) {
            cancelOrderController.execute(
                {
                    id: id,
                    onSuccess: async function () {
                        alert("Huỷ đơn hàng thành công");
                        init();
                    },
                    onFailed: function (code, message) {
                        alert(`Code: ${code} - Message: ${message}`);
                    },
                    onError: console.error
                }
            )
        }
    }

    function onOrderDetail(event: any, id: string) {
        event.preventDefault();
        redirect(`/orderdetail?id=${id}`);
    }

    async function onBackButtonClick() {
        redirect("/usercentral");
    }

    return (
        orders === undefined
            ?
            <LoadingPage />
            :
            !orders
                ?
                <NoAccessPage />
                :
                (<div className="flex flex-col justify-stretch border border-black rounded-lg p-4 w-2/3  mt-[30px] overflow-hidden">
                    <div className="flex-1 p-3">
                        <div className="p-3 text-center text-2xl font-bold top-0 bg-gray-200 border border-black rounded-t-md m-0">
                            ĐƠN HÀNG ĐÃ ĐẶT
                        </div>
                        <div className="overflow-scroll h-1/2">
                            {
                                orders.map((order) => (
                                    <div key={order.id} className="h-fit border border-black p-5 relative ">
                                        <p className="p-1 font-bold">
                                            {`Mã đơn hàng: ${order.id} (${Order.getStatusTitle(order.status as string)})`}
                                        </p>
                                        <p className="p-1">Ngày đặt hàng: {order.toStringDate()} </p>
                                        <p className="p-1">Tổng giá trị: {order.getTotalPriceVND()}</p>

                                        <div className="text-center text-sm right-0 bottom-0 pr-3 pb-6 absolute">

                                            {
                                                order.status === 'APPROVEMENT_AWAITING' &&
                                                <button
                                                    className="border border-black rounded-lg p-2 w-[60px] hover:bg-gray-300"
                                                    onClick={(event) => onCancelOrder(event, order.id as string)}
                                                >
                                                    Hủy
                                                </button>
                                            }
                                            <button className="border border-black rounded-lg p-2 ml-[15px]  hover:bg-gray-300"
                                                onClick={(event) => onOrderDetail(event, order.id as string)}>
                                                Xem chi tiết
                                            </button>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div>
                            <button
                                className="border border-black border-solid rounded-lg px-5 py-2 mt-2 cursor-pointer"
                                onClick={onBackButtonClick}
                            >
                                Quay lại
                            </button>
                        </div>
                    </div>
                </div>
                )
    )
}