import * as bookApi from './bookApi';
import * as types from '../../constants/actionTypes';

export function getBook() {
    return (dispatch) => {
        dispatch({
            type: types.BEGIN_GET_BOOK
        });
        bookApi.bookApi()
            .then(function (res) {
                dispatch({
                    type: types.GET_BOOK_SUCCESS,
                    books: res.data.data.books,
                });
            })
            .catch(function (error) {
                throw (error);
            });
    }
}

export function orderBook (value){
    return (dispatch) => {
        dispatch({
            type : types.BEGIN_ORDER_BOOK
        });
        bookApi.buyBookApi(value)
            .then(function(response){
                dispatch({
                    type : types.ORDER_BOOK_SUCCESS,
                    status : response.data.status,
                })
            })
            .catch((function (error) {
                throw (error)
            }))
    }
}
export function orderBookDone(){
    return {
        type : types.ORDER_BOOK_DONE,
        status : 0,
    }
}
