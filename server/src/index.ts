import { Movie } from "./entities/Movie";
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer'
import { MovieModel } from './db'

MovieModel.find().then(ms => {
    console.log(ms)
})

