export default class CurrencyHelper {
    // Static fields:
    private static vndFormatter: Intl.NumberFormat = new Intl.NumberFormat('vi-VI', {
        currency: 'VND',
        style: 'currency'
    });

    // Static methods:
    public static formatVND(value: number): string {
        return this.vndFormatter.format(value);
    }
}