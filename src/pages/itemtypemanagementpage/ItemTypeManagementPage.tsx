export default function ItemTypeManagementPage(){
    return(
        <div className="w-full h-fit">
             
                {/* Search-bar */}
                <div className="w-full h-16 flex items-center justify-start border border-black border-solid">
                    {/* Keyword input field */}
                        <input type="text" placeholder="Từ khóa tìm kiếm" className="border border-black border-solid rounded-md p-2 pl-4 w-1/2 ml-3"
                        //  value={keyword} onChange={onKeywordChange} 
                        />

                        {/* Search button */}
                        <button
                            className="bg-white p-2 pl-3 pr-3 border border-black border-solid rounded-md ml-3"
                            // onClick={onSearchButtonClick}
                        >
                            Tìm kiếm
                        </button>

                        {/* Reload button */}
                        <button
                            className="bg-white p-2 pl-3 pr-3 border border-black border-solid rounded-md ml-3"
                            // onClick={onReloadButtonClick}
                        >
                            Tải lại
                        </button>

                        <button
                            className="bg-green p-2 pl-3 pr-3 border border-black border-solid rounded-md ml-3 ml-[250px] hover:bg-gray-300 "
                            // onClick={onReloadButtonClick}
                        >
                            Thêm
                        </button>
                </div>   

                <div >
                    <table  className=" w-full border border-black overflow-hidden border-collapse">
                        <thead>
                            <th className="sticky top-0 border border-black ">Mã</th>
                            <th className="sticky top-0 border border-black ">Tên</th>
                            <th className="sticky top-0 border border-black ">Hành động</th>
                        </thead>

                        <tbody className="text-center">
                            <tr>
                                <td className="border border-black ">FASHION-SET</td>
                                <td className="border border-black ">Đồ bộ thời trang</td>
                                <td className="border border-black ">
                                    <div >
                                        <button className="border border-black rounded-lg p-2 w-[60px] hover:bg-gray-300 mr-2">Sửa</button>
                                        <button className="border border-black rounded-lg p-2 w-[60px] hover:bg-gray-300">Xóa</button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                
        </div>

       
    );
}