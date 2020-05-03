import { Movie } from "../entities/Movie";
import { IMovie } from "../db/MovieSchema";
import { MovieModel } from "../db";
import { SearchCondition } from "../entities/SearchCondition";
import { Type } from "class-transformer";
import { ISearchResult } from "../entities/CommonTypes";

export class MovieService {
    public static async add(movie: Movie): Promise<IMovie | string[]> {
        // 1. 装换类型
        movie = Movie.transform(movie)
        // 2. 数据验证
        const errors = await movie.validateThis()
        if (errors.length > 0) {
            return errors;
        }
        // 3. 添加到数据库
        const result = await MovieModel.create(movie)
        return result
    }

    public static async edit(id: string, movie: Movie): Promise<string[]> {
        // 1. 装换类型
        const movieObj = Movie.transform(movie)
        // 2. 数据验证
        const errors = await movieObj.validateThis(true)
        if (errors.length > 0) {
            return errors;
        }
        // 3. 修改数据
        await MovieModel.updateOne({ _id: id }, movie)
        return errors
    }

    public static async delete(id: string): Promise<void> {
        await MovieModel.deleteOne({ _id: id })
    }

    public static async findById(id: string): Promise<IMovie | null> {
        return await MovieModel.findById(id)
    }

    /**
     * 查询电影
     * @param condition page、limit、key
     */
    @Type(() => String)
    public static async find(condition: any): Promise<ISearchResult<IMovie>> {
        // 1. 装换类型
        const conObj = SearchCondition.transform(condition)
        // 2. 数据验证
        const errors = await conObj.validateThis(true)
        if (errors.length > 0) {
            return { data: [], count: 0, errors };
        }
        // 3. 查询
        const movies = await MovieModel.find({
            name: {
                $regex: new RegExp(conObj.key)
            }
        }).skip((conObj.page - 1) * conObj.limit).limit(conObj.limit)
        const count = await MovieModel.find({
            name: {
                $regex: new RegExp(conObj.key)
            }
        }).countDocuments();
        return { data: movies, count, errors: [] }
    }
}