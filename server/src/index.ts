import { Movie } from "./entities/Movie";
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer'

const n: any = {}
n.name = 'sss';
const m = plainToClass(Movie, n as object)

validate(m).then(errors => {
    console.log(errors)
})