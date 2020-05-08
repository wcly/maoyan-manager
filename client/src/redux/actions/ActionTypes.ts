// redux 官方有定义好的Action type
export interface IAction<T extends string, P> {
    type: T;
    payload: P;
}