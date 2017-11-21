import React from 'react';
import {StackNavigator, DrawerNavigator} from 'react-navigation';
import * as size from '../styles/size';

import HomeContainer from '../screen/home/HomeContainer';
import SlideViewContainer from '../screen/drawer/SlideViewContainer';
import PostContainer from '../screen/blog/PostContainer';
import RulesContainer from '../screen/rules/RulesContainer';
import BackPostContainer from '../screen/blog/BackPostContainer'
import BuyBookContainer from "../screen/buyBook/BuyBookContainer";
import DetailBookContainer from '../screen/detailBook/DetailBookContainer';
import CurriculumContainer from '../screen/curriculum/CurriculumContainer';
import CurriculumInformationContainer from '../screen/curriculum/CurriculumInformationContainer';
import CurriculumListContainer from '../screen/curriculum/CurriculumListContainer';
const StackNavigatorStyle = {
    navigationOptions: {
        header: null,
    },
};

const Home = StackNavigator({
    Home: {screen: HomeContainer},
    Post: {screen: PostContainer},
    BackPost : {screen : BackPostContainer},

}, StackNavigatorStyle);
const BuyBook = StackNavigator({
    BuyBook: {screen: BuyBookContainer},
    DetailBook : {screen : DetailBookContainer},

}, StackNavigatorStyle);
const Drawer = DrawerNavigator(
    {
        Home: {screen: Home},
        BuyBook: {screen: BuyBook},
    },
    {
        drawerWidth: size.wid * 3 / 4,
        drawerPosition: 'right',
        contentComponent: props => <SlideViewContainer {...props} />
    }
);

export const Main = StackNavigator(
    {
        Drawer: {screen: Drawer},
        BuyBook: {screen: BuyBook},
        Rules: {screen: RulesContainer},
        Curriculum: {screen: CurriculumContainer},
        CurriculumList: {screen: CurriculumListContainer},
        CurriculumInformation: {screen: CurriculumInformationContainer},
    },
    {headerMode: 'none'}
);

