import axios from 'axios';
import * as env from '../../constants/env'
export function curriculumApi(value) {
    let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjU1NDksImlzcyI6Imh0dHA6Ly9hcGkua2VldG9vbDMueHl6L2xvZ2luIiwiaWF0IjoxNTExMjM3MDUyLCJleHAiOjE1MTE4NDE4NTIsIm5iZiI6MTUxMTIzNzA1MiwianRpIjoiRnB6aGRMb094aDE1WFNIVyJ9.MEooKSXvepDmFN95CSB8dwU3W6js99eXDTdvj83RKrc';
    let url = env.API_COLORME + '/lesson/' + value + '?token=' + token;
    return axios.get(url);
}

export function courseApi() {
    let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjU1NDksImlzcyI6Imh0dHA6Ly9hcGkua2VldG9vbDMueHl6L2xvZ2luIiwiaWF0IjoxNTExMjM3MDUyLCJleHAiOjE1MTE4NDE4NTIsIm5iZiI6MTUxMTIzNzA1MiwianRpIjoiRnB6aGRMb094aDE1WFNIVyJ9.MEooKSXvepDmFN95CSB8dwU3W6js99eXDTdvj83RKrc';
    let url = env.API_COLORME+ "/paid-courses?token=" + token;
    return axios.get(url);
}

export function resourcesApi(class_name) {
    let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjU1NDksImlzcyI6Imh0dHA6Ly9hcGkua2VldG9vbDMueHl6L2xvZ2luIiwiaWF0IjoxNTExMjM3MDUyLCJleHAiOjE1MTE4NDE4NTIsIm5iZiI6MTUxMTIzNzA1MiwianRpIjoiRnB6aGRMb094aDE1WFNIVyJ9.MEooKSXvepDmFN95CSB8dwU3W6js99eXDTdvj83RKrc';
    let url = env.API_COLORME + '/links/' + class_name + '?token=' + token;
    return axios.get(url);

}