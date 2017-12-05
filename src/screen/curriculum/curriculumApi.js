import axios from 'axios';
import * as env from '../../constants/env'

const tokenGlobal = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjU1NDksImlzcyI6Imh0dHA6Ly9hcGkua2VldG9vbDMueHl6L2xvZ2luIiwiaWF0IjoxNTEyNDc4MDY3LCJleHAiOjE1MTMwODI4NjcsIm5iZiI6MTUxMjQ3ODA2NywianRpIjoiYURiMnV2T3JyZkRNVFQ0QiJ9.yvu0B_Bjo3axQpWndnxQAnMdzHwbzfL5Vs-KQUoP330';
export function curriculumApi(value) {
    let token = tokenGlobal;
    let url = env.API_COLORME + '/lesson/' + value + '?token=' + token;
    return axios.get(url);
}

export function courseApi() {
    let token = tokenGlobal;
    let url = env.API_COLORME+ "/paid-courses?token=" + token;
    return axios.get(url);
}

export function resourcesApi(class_name) {
    let token = tokenGlobal;
    let url = env.API_COLORME + '/links/' + class_name + '?token=' + token;
    return axios.get(url);

}