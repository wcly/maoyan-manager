import { Response } from "express";
import { ISearchResult } from "../entities/CommonTypes";

export class ResponseHelper {
    /**
     * 响应一个错误
     * @param error 错误
     * @param res 响应对象
     */
    public static sendError(error: string | string[], res: Response) {
        let err: string;
        if (Array.isArray(error)) {
            err = error.join(",")
        } else {
            err = error
        }
        res.send({
            err,
            data: null
        })
    }

    /**
     * 响应一个普通数据
     * @param data 错误
     * @param res 响应对象
     */
    public static sendData(data: any, res: Response) {
        res.send({
            err: '',
            data
        })
    }

    /**
     * 响应分页数据
     * @param result 数据库返回结果
     * @param res 响应对象
     */
    public static sendPageData<T>(result: ISearchResult<T>, res: Response) {
        if (result.errors.length > 0) {
            this.sendError(result.errors, res)
        } else {
            res.send({
                err: '',
                data: result.data,
                total: result.count
            })
        }
    }
}