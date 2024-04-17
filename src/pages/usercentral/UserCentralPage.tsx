export default function UserCentralPage() {
    return (

        <div className="w-screen w-fit">

            <div className="border  rounded-md p-4 space-y-4">
                {/* Avatar User */}
                <div className="flex items-center justify-center">
                    <img
                        alt="Avatar User"
                        src="https://cdn-icons-png.flaticon.com/128/1144/1144760.png"
                        className="w-16 h-16"
                    />
                </div>

                {/* User Name */}
                <p className="text-center">Lê Quốc Hải</p>

                {/* Cập nhật thông tin cá nhân */}
                <div className="flex items-center justify-center space-x-2">
                    <img
                        className="w-8 h-8"
                        src="https://cdn-icons-png.flaticon.com/128/503/503849.png"
                        alt="Setting icon"
                    />
                    <p>Cập nhật thông tin</p>
                </div>

                {/* Đơn hàng đã đặt */}
                <div className="flex items-center justify-center space-x-2">
                    <img
                        className="w-8 h-8"
                        src="https://cdn-icons-png.flaticon.com/128/5161/5161308.png"
                        alt="Setting icon"
                    />
                    <p>Đơn hàng đã đặt</p>
                </div>

                {/* Đăng xuất */}
                <div className="flex items-center justify-center space-x-2">
                    <img
                        className="w-8 h-8"
                        src="https://cdn-icons-png.flaticon.com/128/13100/13100852.png"
                        alt="Setting icon"
                    />
                    <p>Đăng xuất</p>
                </div>
            </div>
        </div>
    );
}