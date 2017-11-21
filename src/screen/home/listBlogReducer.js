import * as types from '../../constants/actionTypes';
import initialState from '../../reducres/initialState';

export default function listBlogReducer(state = initialState.listBlog, action) {
    switch (action.type) {
        case types.BEGIN_GET_LIST_BLOG:
            return {
                ...state,
                ...{
                    isLoading: true,
                }
            };
        case types.GET_LIST_BLOG_SUCCESS:
            return {
                ...state,
                ...{
                    blogs: action.blogs,
                    isLoading: false,
                }
            };
        case types.BEGIN_GET_MORE_LIST_BLOG:
            return {
                ...state,
                ...{
                    isLoadingMore: true,
                }
            };
        case types.GET_MORE_LIST_BLOG_SUCCESS:
            return {
                ...state,
                ...{
                    blogs: [...state.blogs, ...action.blogs],
                    isLoadingMore: false,
                }
            };
        case types.BEGIN_REFRESH_NEWFEED :
            return {
                ...state,
                ...{
                    isRefreshing : action.isRefreshing
                }
            };
        case types.REFRESH_NEWFEED_SUCCESS: {
            let array1 = state.blogs.slice(0, 11);
            let array2 = action.blogs;
            let array3 = [];
            for (let i = 0; i < 11; i++) {
                if (array2[i].id !== array1[i].id) {
                    array3.push(array2[i]);
                }
            }
            return {
                ...state,
                ...{
                    isRefreshing: action.isRefreshing,
                    blogs: [array3, ...state.blogs]
                }
            }
        }
        case types.REFRESH_NEWFEED_ERROR:{
            return {
                ...state,
                ...{
                    isRefreshing : action.isRefreshing
                }
            }
        }
        default:
            return state
    }
}