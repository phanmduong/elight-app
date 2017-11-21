import * as detailBookApi from '../detailBook/detailBookApi';
import * as types from '../../constants/actionTypes';

export function detailBook(book_id) {
    return (dispatch) => {
        dispatch({
            type : types.BEGIN_GET_DETAIL_BOOK,
        });
        detailBookApi.detailBookApi(book_id)
            .then(function (response) {
                dispatch({
                    type : types.GET_SUCCESS_DETAIL_BOOK,
                    detailBook : response.data.data.book,
                });
                console.log(response.data.data.book)
            })
            .catch(function (error) {
                throw (error);
            })
    }
}

