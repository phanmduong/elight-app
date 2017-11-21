import * as types from '../../constants/actionTypes';
import * as curriculumApi from './curriculumApi';

export function getCurriculum(value) {
    return (dispatch) => {
        dispatch({
            type: types.BEGIN_GET_CURRICULUM
        });
        curriculumApi.curriculumApi(value)
            .then(function (response) {
                dispatch({
                    type: types.GET_CURRICULUM_SUCCESS,
                    data: response.data,
                });
            })
            .catch(function (error) {
                throw (error);
            });
    }
}

export function getCourse() {
    return (dispatch) => {
        dispatch({
            type: types.BEGIN_GET_COURSE
        });
        curriculumApi.courseApi()
            .then(function (response) {
                dispatch({
                    type: types.GET_COURSE_SUCCESS,
                    courses: response.data,
                });
            })
            .catch(function (error) {
                throw (error);
            });
    }
}