export default interface Controller<P> {
    execute(param: P): Promise<void>
}