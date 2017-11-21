import * as listBlogApi from './listBlogApi';
import * as types from '../../constants/actionTypes';

export function getListBlog(page) {
    return (dispatch) => {
        dispatch({
            type: types.BEGIN_GET_LIST_BLOG
        });
        listBlogApi.listBlogApi(page)
            .then(function (res) {
                dispatch({
                    type: types.GET_LIST_BLOG_SUCCESS,
                    blogs: res.data.blogs
                });
            })
            .catch(function (error) {
                throw (error);
            });
    }
}
export function beginRefreshNewFeed() {
    return {
        type: types.BEGIN_REFRESH_NEWFEED,
        isRefreshing: true,
    }
}

export function refreshNewFeedSuccess(response) {
    return {
        type: types.REFRESH_NEWFEED_SUCCESS,
        blogs: response.data.blogs,
        isRefreshing: false,
    }
}

export function refreshNewFeedError() {
    return {
        type: types.REFRESH_NEWFEED_ERROR,
        isRefreshing: false
    }
}

export function refreshNewFeed(page) {
    return (dispatch) => {
        dispatch(beginRefreshNewFeed());
        listBlogApi.listBlogApi(page)
            .then(function (response) {
                dispatch(refreshNewFeedSuccess(response));
            })
            .catch(function (error) {
                dispatch(refreshNewFeedError(error));
            })
    }
}
export function getMoreListBlog(page) {
    return (dispatch) => {
        dispatch({
            type: types.BEGIN_GET_MORE_LIST_BLOG
        });
        listBlogApi.listBlogApi(page)
            .then(function (res) {
                dispatch({
                    type: types.GET_MORE_LIST_BLOG_SUCCESS,
                    blogs: res.data.blogs,
                });

            })
            .catch(function (error) {
                throw (error);
            });
    }
}