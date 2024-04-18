import { useEffect, useState } from "react"
import OrderInfo from "../../entities/order/Order"
import Controller from "../../controllers/Controller"
import OrderedOrderController, { OrderedOrderControllerParam } from "../../controllers/orderedorder/OrderedOrderController"
import { getOrderStatusTitle } from "../../utils/OrderHelper"

export default function OrderedOrdersPage() {
    //State:
    const [orders, setOrders] = useState<OrderInfo[]>()

    useEffect(() => {
        orderedOrderController.execute(
            {
                onSuccess: async function (orders: OrderInfo[]) {
                    setOrders(orders);
                },
                onError: console.error
            }
        )
    }, [])


    //Controller
    const orderedOrderController: Controller<OrderedOrderControllerParam> = new OrderedOrderController();

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

                                        <button className="border border-black rounded-lg p-2 w-[60px] hover:bg-gray-300" >Hủy</button>
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