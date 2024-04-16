export default interface RestResponse<T> {
    success: boolean,
    message?: string | undefined,
    code?: string | undefined,
    result?: T | undefined
}