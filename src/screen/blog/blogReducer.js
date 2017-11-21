import * as types from '../../constants/actionTypes';
import initialState from '../../reducres/initialState';

export default function listBlogReducer(state = initialState.blog, action) {
    switch (action.type) {
        case types.BEGIN_GET_BLOG:
            return {
                ...state,
                ...{
                    isLoading: true,
                }
            };
        case types.GET_BLOG_SUCCESS:
            return {
                ...state,
                ...{
                    data: action.data,
                    isLoading: false,
                }
            };
        default:
            return state
    }
}