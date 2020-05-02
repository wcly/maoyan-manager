import { IsInt, Min } from "class-validator";
import { Type } from "class-transformer";
import { BaseEntity } from "./BaseEntity";

export class SearchCondition extends BaseEntity{
    // 页码
    @IsInt({ message: '页码必须是整数' })
    @Min(1, { message: "页面最小值为1" })
    @Type(() => Number)
    public page: number = 1;

    // 页容量，每页显示的条数
    @IsInt({ message: '页码必须是整数' })
    @Min(1, { message: "页面最小值为1" })
    @Type(() => Number)
    public limit: number = 10;

    // 搜索关键字
    @Type(() => String)
    public key: string = '';

    /**
     * 将一个平面对象转化成SearchCondition对象
     * @param plainObject 传入的对象
     */
    public static transform(plainObject: object): SearchCondition {
        return super.baseTransform(SearchCondition, plainObject)
    }
}