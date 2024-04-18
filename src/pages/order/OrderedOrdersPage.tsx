export default function OrderedOrdersPage(){
    return(
        <div className="border border-black rounded-lg p-4 w-[800px] h-[550px] mt-[60px] ">
            <table className=" border border-black border-collapse ml-[30px] mt-[60px] p-5 w-[90%]">
                <tr>
                    <th colSpan={2} className="border border-black p-5 text center text-2xl">Đơn hàng đã đặt</th>
                    
                </tr>
                <tr>
                    <td >
                        <p>Mã đơn hàng (trạng thái)</p>
                        <p>4/5/2003</p>
                        <p>Tổng giá trị</p>

                    </td>
                    <td className="border border-black p-5 ">
                        <div className="text-center">

                        <button className="border border-black rounded-lg p-2 w-[60px] hover:bg-gray-300" >Hủy</button>
                        <button className="border border-black rounded-lg p-2 ml-[30px] hover:bg-gray-300">Xem chi tiết</button>
                        </div>
                    </td>

                </tr>
            </table>
       
        </div>

    )
}