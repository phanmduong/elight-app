import axios from 'axios';
import * as env from '../../constants/env';
export function detailBookApi(book_id){
    let url = env.API_GRAPHICS + '/detail-book/' + book_id;
    return axios.get(url)
}