import * as env from '../../constants/env';
import axios from 'axios';

export function listBlogApi(page) {
    let url = env.API_URL + '/api/blogs?page=' + page;
    return axios.get(url);
}