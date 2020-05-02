import { MovieService } from "./services/MovieSchema"

const condi: any = {
    page: 1,
    limit: 5,
    key: "10"
}

MovieService.find(condi).then(result => {
    if(result.errors.length > 0){
        console.log(result.errors)
    }else{
        console.log(result.data)
    }
    console.log("总数", result.count)
})