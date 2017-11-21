import * as blogApi from './blogApi';
import * as types from '../../constants/actionTypes';

export function getBlog(id) {
    return (dispatch) => {
        dispatch({
            type: types.BEGIN_GET_BLOG
        });
       blogApi.blogApi(id)
            .then(function (res) {
                dispatch({
                    type: types.GET_BLOG_SUCCESS,
                    data: res.data.data.product
                });
            })
            .catch(function (error) {
               throw (error);
            });
    }
}
