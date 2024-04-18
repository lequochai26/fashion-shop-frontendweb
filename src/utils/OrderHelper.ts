export function getOrderStatusTitle(status: string): string {
    switch (status) {
        case 'APPROVEMENT_AWAITING': return "Đang chờ xác nhận";
        case 'DELIVERING': return "Đang giao";
        case 'SUCCESS': return "Đã hoàn tất";
        case 'PAYMENT_AWAITING': return "Đang chờ thanh toán";
        case 'CANCELLED': return "Đã hủy";
        default: return "Không rõ";
    }
}