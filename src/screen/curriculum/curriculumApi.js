import axios from 'axios';
import * as env from '../../constants/env'
export function curriculumApi(value) {
    let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjY4MjMsImlzcyI6Imh0dHA6Ly9hcGkuY29sb3JtZS52bi9yZWZyZXNoLXRva2VuIiwiaWF0IjoxNTExMjM5MzYyLCJleHAiOjE1MTE4NDQxNjIsIm5iZiI6MTUxMTIzOTM2MiwianRpIjoiVzVIZ2VnRWpOVlJ0UW1rWSJ9.Ikpuw0icyz5xd_1e15SGPUbHQkueTNTBMWVUDCHfObA';
    let url = env.API_COLORME + '/lesson/' + value + '?token=' + token;
    return axios.get(url);
}

export function courseApi() {
    let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjY4MjMsImlzcyI6Imh0dHA6Ly9hcGkuY29sb3JtZS52bi9yZWZyZXNoLXRva2VuIiwiaWF0IjoxNTExMjM5MzYyLCJleHAiOjE1MTE4NDQxNjIsIm5iZiI6MTUxMTIzOTM2MiwianRpIjoiVzVIZ2VnRWpOVlJ0UW1rWSJ9.Ikpuw0icyz5xd_1e15SGPUbHQkueTNTBMWVUDCHfObA';
    let url = env.API_COLORME+ "/paid-courses?token=" + token;
    return axios.get(url);
}

export function resourcesApi(class_name) {
    let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjY4MjMsImlzcyI6Imh0dHA6Ly9hcGkuY29sb3JtZS52bi9yZWZyZXNoLXRva2VuIiwiaWF0IjoxNTExMjM5MzYyLCJleHAiOjE1MTE4NDQxNjIsIm5iZiI6MTUxMTIzOTM2MiwianRpIjoiVzVIZ2VnRWpOVlJ0UW1rWSJ9.Ikpuw0icyz5xd_1e15SGPUbHQkueTNTBMWVUDCHfObA';
    let url = env.API_COLORME + '/links/' + class_name + '?token=' + token;
    return axios.get(url);

}