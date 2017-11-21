import * as types from '../../constants/actionTypes';
import initialState from '../../reducres/initialState';

export default function listBlogReducer(state = initialState.book, action) {
    switch (action.type) {
        case types.BEGIN_GET_BOOK:
            return {
                ...state,
                ...{
                    isLoading: true,
                }
            };
        case types.GET_BOOK_SUCCESS:
            return {
                ...state,
                ...{
                    books: action.books,
                    isLoading: false,

                }
            };
        case types.BEGIN_ORDER_BOOK:
            return {
                ...state,
                ...{
                    isLoadingOrder: true,
                }
            }
        case types.ORDER_BOOK_SUCCESS :
            return {
                ...state,
                ...{
                    isLoadingOrder: false,
                    status : action.status
                }
            }
        case types.ORDER_BOOK_DONE : {
            return {
                ...state,
                ...{status : 0}
            }
        }
        default:
            return state
    }
}