import { useEffect, useState } from "react"
import OrderInfo from "../../entities/order/Order"
import Controller from "../../controllers/Controller"
import LoadOrderedOrderController, { OrderedOrderControllerParam } from "../../controllers/orderedorder/LoadOrderedOrderController"
import { getOrderStatusTitle } from "../../utils/OrderHelper"
import CancelOrderController, { CancelOrderControllerParam } from "../../controllers/orderedorder/CancelOrderController"
import CheckLoggedInUserController, { CheckLoggedInUserParam } from "../../controllers/orderedorder/CheckLoggedInUserController"
import { redirect } from "../../utils/Redirector"

export default function OrderedOrdersPage() {
    //State:
    const [orders, setOrders] = useState<OrderInfo[]>()

    //Controller
    const orderedOrderController: Controller<OrderedOrderControllerParam> = new LoadOrderedOrderController();
    const cancelOrderController: Controller<CancelOrderControllerParam> = new CancelOrderController();
    const checkLoggedInUserController: Controller<CheckLoggedInUserParam> = new CheckLoggedInUserController();


    useEffect(() => {
        init();
    }, [])

    //Method
    function init(){
        checkLoggedInUserController.execute(
            {
                onFailed: async function (code, message) {
                    redirect("/");
                    alert(`Code: ${code} - Message: ${message}`);
                },
                onError: console.error
            }
        )
        orderedOrderController.execute(
            {
                onSuccess: async function (orders: OrderInfo[]) {
                    setOrders(orders);
                },
                onError: console.error
            }
        )
    }
    function onCancelOrder(event: any,id: string) {
        //Prevent default
        event.preventDefault();

        const confirmation = window.confirm("Bạn có chắc chắn muốn huỷ đơn hàng này không?");

        if (confirmation) {
            cancelOrderController.execute(
                {
                    id: id,
                    onSuccess:async function (){
                        alert("Huỷ đơn hàng thành công");
                    },
                    onFailed: function (code, message) {
                        alert(`Code: ${code} - Message: ${message}`);
                    },
                    onError: console.error
                }
            )
        }
    }




    return (
        <div className="border border-black rounded-lg p-4 w-[800px] h-[550px] mt-[60px] ">
            <table className=" border border-black border-collapse ml-[30px] mt-[60px] p-5 w-[90%]">
                <tr>
                    <th colSpan={2} className="border border-black p-5 text center text-2xl">ĐƠN HÀNG ĐÃ ĐẶT</th>
                </tr>
                {
                    orders && (
                        orders.map((order) => (
                            <tr key={order.id}>
                                <td className="w-3/5 pl-10">
                                    <p>{`Mã đơn hàng: ${order.id} (${getOrderStatusTitle(order.status)})`}</p>
                                    <p>Ngày đặt hàng: {order.date.toString()} </p>
                                    <p>Tổng giá trị: {order.totalPrice}</p>
                                </td>
                                <td className="border border-black border-r p-5 ">
                                    <div className="text-center">

                                        <button 
                                            className="border border-black rounded-lg p-2 w-[60px] hover:bg-gray-300" 
                                            onClick={(event) => onCancelOrder(event,order.id)}
                                            >
                                                Hủy
                                        </button>
                                        <button className="border border-black rounded-lg p-2 ml-[30px] hover:bg-gray-300">Xem chi tiết</button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )
                }

            </table>

        </div>

    )
}