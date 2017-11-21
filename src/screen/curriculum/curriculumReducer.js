import * as types from '../../constants/actionTypes';
import initialState from '../../reducres/initialState';

export default function getCourseReducer(state = initialState.curriculum, action) {
    switch (action.type) {
        case types.BEGIN_GET_CURRICULUM:
            return {
                ...state,
                ...{
                    isLoadingCurriculum: true,
                }
            };
        case types.GET_CURRICULUM_SUCCESS:
            return {
                ...state,
                ...{
                    data: action.data,
                    isLoadingCurriculum: false,
                }
            };
        case types.BEGIN_GET_COURSE:
            return {
                ...state,
                ...{
                    isLoadingCourse: true,
                }
            };
        case types.GET_COURSE_SUCCESS:
            return {
                ...state,
                ...{
                    courses: action.courses,
                    isLoadingCourse: false,
                }
            };
        default:
            return state
    }
}