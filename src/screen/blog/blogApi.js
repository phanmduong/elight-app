import * as env from '../../constants/env';
import axios from 'axios';

export function blogApi(id) {
    let url = env.API_URL + '/api/blog/' + id;
    return axios.get(url);
}