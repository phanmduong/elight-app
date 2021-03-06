import bookReducer from '../screen/buyBook/bookReducer';
import listBlogReducer from '../screen/home/listBlogReducer';
import blogReducer from '../screen/blog/blogReducer';
import detailBookReducer from '../screen/detailBook/detailBookReducer'
import curriculumReducer from '../screen/curriculum/curriculumReducer'
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
    listBlog: listBlogReducer,
    blog: blogReducer,
    book: bookReducer,
    detailBook : detailBookReducer,
    curriculum : curriculumReducer
});
export default rootReducer;