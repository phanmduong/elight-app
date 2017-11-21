import * as types from '../../constants/actionTypes';
import initialState from '../../reducres/initialState';

export default function detailBookReducer(state = initialState.detailBook, action) {
    switch (action.type) {
        case types.BEGIN_GET_DETAIL_BOOK :
            return {
                ...state,
                ...{
                    isLoadingBook: true,
                }
            }
        case types.GET_SUCCESS_DETAIL_BOOK :
            return {
                ...state,
                ...{
                    isLoadingBook: false,
                    detailBook: action.detailBook,
                }
            }
        case types.GET_ERROR_DETAIL_BOOK :
            return {
                ...state,
                ...{
                    isLoadingBook: false,
                }
            }
        default :
            return state;
    }
}