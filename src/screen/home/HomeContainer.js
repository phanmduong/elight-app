import React, {Component} from 'react';
import {
    Text, TouchableOpacity, View, FlatList, Image, Platform, Animated, StatusBar, RefreshControl,

} from 'react-native';
import {
    Container, Item, Left, Right, Spinner, Content, Body
} from 'native-base';
import part from '../../styles/partStyle';
import Icon from '../../commons/Icon';
import * as color from '../../styles/color';
import * as size from '../../styles/size';
import * as listBlogAction from './listBlogAction';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class HomeContainer extends Component {
    constructor() {
        super();
        this.state = {
            animatePress: [],
            blogs: [],
            page: 2
        };
    }

    componentWillMount() {
        this.props.listBlogAction.getListBlog(1);
    }

    // componentWillReceiveProps(nextProps) {
    //     let animatePress = this.state.animatePress;
    //     let blogs = this.state.blogs;
    //     if (nextProps.blogs != this.props.blogs) {
    //         let i = this.props.blogs.length;
    //         while (i < nextProps.blogs.length) {
    //             let key = {key: i};
    //             let arr1 = Object.assign(nextProps.blogs[i], key);
    //             let arr = new Animated.Value(1);
    //             animatePress.push(arr);
    //             blogs.push(arr1);
    //             i++;
    //         }
    //     }
    //     this.setState({animatePress: animatePress, blogs: blogs});
    // }

    getMoreListBlog() {
        if (this.props.blogs.length % 10 == 0) {
            this.setState({page: this.state.page + 1});
            this.props.listBlogAction.getMoreListBlog(this.state.page);
        }
    }


    animateIn(i) {
        let animatePress = this.state.animatePress;
        Animated.timing(animatePress[i], {
            toValue: 0.95,
            duration: 200
        }).start();
        this.setState({animatePress: animatePress});
    }

    animateOut(i) {
        let animatePress = this.state.animatePress;
        Animated.timing(animatePress[i], {
            toValue: 1,
            duration: 200
        }).start();
        this.setState({animatePress: animatePress});
    }

    loadMore() {
        if (this.props.isLoadingMore) {
            return (
                <View style={[part.wrapperContainer, {height: 30}]}>
                    <Spinner color={color.gray}/>
                </View>
            )
        } else {
            return (<View/>)
        }
    }

    render() {
        const {navigate} = this.props.navigation;
        const {isLoading, blogs, isRefreshing} = this.props;
        return (
            <Container style={[part.wrapperContainer, {paddingBottom: 0}]}>
                <StatusBar
                    backgroundColor={color.bgModal}
                    barStyle={Platform.OS === 'ios' ? "light-content" : "light-content"}
                />
                {
                    Platform.OS === 'ios'
                        ?
                        <View style={part.wrapperStatusBarNoPadding}>
                        </View>
                        :
                        <View/>
                }
                <View>
                    <View style={[part.noBorder, {flexDirection: 'row', backgroundColor: color.logoColor}]}>
                        <Left>
                            <TouchableOpacity
                                activeOpacity={0.9}
                            >
                                <Icon
                                    name="materialCommunity|bell"
                                    color={color.navTitle}
                                    size={size.iconGiant}
                                    style={part.padding}
                                />
                            </TouchableOpacity>
                        </Left>

                        <Body>
                        <Text style={[part.textLogo, part.paddingLineFar]}>
                            eLight
                        </Text>
                        </Body>

                        <Right style={part.paddingRight}>
                            <TouchableOpacity
                                activeOpacity={0.9}
                                onPress={() => navigate('DrawerOpen')}>
                                <Icon
                                    name="materialCommunity|menu"
                                    color={color.navTitle}
                                    size={size.iconGiant}
                                    style={part.padding}
                                />
                            </TouchableOpacity>
                        </Right>
                    </View>
                </View>
                <View style={{height: size.hei - 80}}>
                    {
                        isLoading
                            ?
                            <View style={part.wrapperIsLoading}>
                                <Spinner color={color.gray}/>
                            </View>
                            :
                            (
                                <View>
                                    <FlatList
                                        showsVerticalScrollIndicator={false}
                                        data={this.props.blogs}
                                        onEndReachedThreshold={5}
                                        onEndReached={
                                            () => this.getMoreListBlog()
                                        }
                                        refreshControl={
                                            <RefreshControl
                                                refreshing={isRefreshing}
                                                onRefresh={
                                                    () => this.props.listBlogAction.refreshNewFeed(1)
                                                }
                                            />
                                        }

                                        renderItem={({item}) =>
                                            <View style={[part.wrapperPost, {marginTop: 20}]}>
                                                <TouchableOpacity
                                                    activeOpacity={0.8}
                                                    style={part.imagePost}
                                                    // onPressIn={() => this.animateIn(item.key)}
                                                    // onPressOut={() => this.animateOut(item.key)}
                                                    onPress={() => navigate('Post', {id: item.id})}
                                                >
                                                    <View
                                                        style={
                                                            [
                                                                // {
                                                                //     transform: [{
                                                                //         scale: this.state.animatePress[item.key]
                                                                //     }]
                                                                // },
                                                                part.imagePost,
                                                                Platform.OS === 'ios'
                                                                    ?
                                                                    part.shadow
                                                                    :
                                                                    ''
                                                            ]
                                                        }
                                                    >
                                                        <Image
                                                            source={{uri: `http://${item.url}`}}
                                                            style={part.imagePost}
                                                        />
                                                        {
                                                            item.category
                                                                ?
                                                                <View
                                                                    style={[part.noBorder, part.wrapperTextCategoryInImage]}>
                                                                    <Text style={part.textCategoryInImage}
                                                                          numberOfLines={1}>
                                                                        {item.category ? item.category.toUpperCase() : 'BLOG'}
                                                                    </Text>
                                                                </View>
                                                                :
                                                                <View/>

                                                        }

                                                    </View>
                                                </TouchableOpacity>
                                                <View style={part.wrapperTextPost}>
                                                    <Text style={part.textTitlePost}>{item.title}</Text>
                                                    <View style={part.wrapperAuthor}>
                                                        <Image
                                                            source={{uri: item.author ? `http://${item.author.avatar_url}` : ''}}
                                                            style={[part.avatarUserTiny, part.marginRight]}
                                                        />
                                                        <Text style={[part.textTitleAuthor, part.paddingLine]}>
                                                            {item.author ? item.author.name : ''}
                                                        </Text>
                                                    </View>
                                                </View>
                                            </View>
                                        }
                                        ListFooterComponent={this.loadMore()}
                                    />
                                </View>

                            )


                    }
                </View>
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return {
        isLoading: state.listBlog.isLoading,
        isRefreshing: state.listBlog.isRefreshing,
        isLoadingMore: state.listBlog.isLoadingMore,
        blogs: state.listBlog.blogs,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        listBlogAction: bindActionCreators(listBlogAction, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);