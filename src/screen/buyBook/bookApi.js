import * as env from '../../constants/env';
import axios from 'axios';

export function bookApi() {
    let url = env.API_GRAPHICS + '/books';
    return axios.get(url);
}

export function buyBookApi(value){
    let url = env.API_GRAPHICS + '/save-order';
    return axios.post(url,{
        name : value.name,
        email : value.email,
        phone : value.phone,
        address : value.address,
        payment : value.payment,
        books : value.products,
    })
}