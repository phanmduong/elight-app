import React, {Component} from 'react';
import {
    Image,
    Platform,
    Text,
    TouchableOpacity,
    View, FlatList, StatusBar
} from 'react-native';
import {
    List,
    ListItem,
    Body,
    Button,
    Card,
    CardItem,
    Container,
    Content,
    Input,
    Item,
    Left,
    Right,
    Spinner,
    Thumbnail
} from 'native-base';
import Icon from '../../commons/Icon';
import part from '../../styles/partStyle';
import parallaxStyle from '../../styles/parallaxStyle';
import * as color from '../../styles/color';
import * as size from '../../styles/size';
import * as blogAction from './blogAction';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import WebViewAutoHeight from '../../commons/WebViewAutoHeight';
import ParallaxScrollView from 'react-native-parallax-scroll-view';

class PostContainer extends Component {
    constructor() {
        super();
        this.state = {
            blog: {},
            check: 1,
        }
    }

    componentWillMount() {
        this.props.blogAction.getBlog(this.props.navigation.state.params.id);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.data !== this.props.data) {
            this.setState({blog: prevProps.data});
        }
    }

    goBack() {
        // if (this.state.blog && this.state.blog.related_posts) {
        //     this.props.navigation.navigate('BackPost', {blog: this.state.blog})
        // } else {
            this.props.navigation.goBack();
        // }
    }

    render() {
        const {goBack, navigate} = this.props.navigation;
        const {isLoading, data} = this.props;

        return (
            <Container ref="page" style={part.wrapperContainer}>
                <StatusBar
                    backgroundColor={color.bgModal}
                    barStyle={Platform.OS === 'ios' ? "dark-content" : "light-content"}
                />
                <ParallaxScrollView
                    backgroundColor={color.backGround}
                    showsVerticalScrollIndicator={false}
                    headerBackgroundColor={color.backGround}
                    stickyHeaderHeight={size.STICKY_HEADER_HEIGHT}
                    parallaxHeaderHeight={310}
                    backgroundSpeed={10}
                    renderBackground={() => (
                        <View style={part.wrapperImageInGetFull}>
                            <View key="background">
                            </View>
                        </View>
                    )}
                    renderForeground={() => (
                        <View key="parallax-header" style={[parallaxStyle.parallaxHeaderTitle]}>
                            <View>
                                <CardItem style={[part.cardHeader2, part.noPaddingTopBottom]}>
                                    <Item style={[part.noBorder, {justifyContent: 'center'}]}>
                                        <Text style={part.textTitlePostInPost} numberOfLines={2}>
                                            {isLoading ? 'Đang tải...' : data.title}
                                        </Text>
                                    </Item>
                                </CardItem>

                                <CardItem style={[part.cardHeader2, part.noPaddingBottom]}>
                                    <Item style={[part.noBorder]}>
                                        {
                                            data.author
                                                ?
                                                <Image
                                                    source={{uri: `http://${data.author.avatar_url}`}}
                                                    style={part.avatarUserNormal}/>
                                                :
                                                <Image
                                                    source={{uri: 'https://exelord.github.io/ember-initials/images/default-d5f51047d8bd6327ec4a74361a7aae7f.jpg'}}
                                                    style={part.avatarUserNormal}/>
                                        }

                                    </Item>
                                </CardItem>
                                <CardItem style={[part.cardHeader2, part.noPaddingBottom]}>
                                    <Item style={[part.noBorder]}>
                                        <Text style={part.textTitleAuthor} numberOfLines={1}>
                                            Đăng bởi <Text style={part.textTitleAuthorBlue}>
                                            {
                                                data.author ? data.author.name : 'Tác giả'
                                            }
                                        </Text>
                                        </Text>
                                    </Item>
                                </CardItem>
                                <CardItem style={[part.cardHeader2, part.noPaddingBottom]}>
                                    <Item style={[part.noBorder]}>
                                        <Text style={part.textTime} numberOfLines={1}>
                                            {isLoading ? 'Đang tải...' : data.created_at}
                                        </Text>
                                    </Item>
                                </CardItem>
                                <CardItem style={[part.cardHeader2, part.noPaddingBottom]}>
                                    <View style={[part.noBorder, part.wrapperTextCategory]}>
                                        <Text style={part.textCategory} numberOfLines={1}>
                                            {
                                                data.category ? data.category.toUpperCase() : 'BLOG'
                                            }
                                        </Text>
                                    </View>
                                </CardItem>
                            </View>
                        </View>
                    )}
                    renderStickyHeader={() => (
                        <View key="sticky-header" style={parallaxStyle.stickySection}>
                            <View style={part.iconInDrawerNav}>
                                <Left style={Platform.OS === 'ios' ? {marginTop: 20} : ''}>
                                    <Body style={{padding: 30}}>
                                    <Text style={part.titleSmallDarkBold} numberOfLines={1}>
                                        {isLoading ? 'Đang tải...' : data.title}
                                    </Text>
                                    </Body>
                                </Left>
                            </View>
                        </View>
                    )}
                    renderFixedHeader={() => (
                        <View key="fixed-header" style={part.iconInDrawerNav}>
                            <Left style={Platform.OS === 'ios' ? {marginTop: 20} : ''}>
                                <TouchableOpacity
                                    style={[part.padding, part.wrapperBackButton]}
                                    onPress={() => this.goBack()}
                                >
                                    <Icon name="entypo|chevron-thin-left"
                                          size={size.iconBig}
                                          color={color.text}
                                    />
                                </TouchableOpacity>
                            </Left>
                        </View>
                    )}
                >
                    {
                        isLoading
                            ?
                            <View style={part.wrapperIsLoading}>
                                <Spinner color={color.gray}/>
                            </View>
                            :
                            <View>
                                <View>
                                    <Image
                                        resizeMode={'cover'}
                                        source={{
                                            uri: `http://${data.url}`,
                                            width: size.wid,
                                            height: size.PARALLAX_HEADER_HEIGHT
                                        }}/>

                                </View>
                                <WebViewAutoHeight source={data.content ? data.content : ''}/>
                                {/*<View style={[part.wrapperBottomPost, part.haveBorderTop]}>*/}
                                    {/*<Text style={part.textTitlePostInPost}>*/}
                                        {/*BÀI VIẾT LIÊN QUAN*/}
                                    {/*</Text>*/}
                                    {/*<FlatList*/}
                                        {/*showsVerticalScrollIndicator={false}*/}
                                        {/*data={data.related_posts}*/}
                                        {/*renderItem={({item}) =>*/}
                                            {/*<View style={part.wrapperPost}>*/}
                                                {/*<TouchableOpacity*/}
                                                    {/*activeOpacity={0.9}*/}
                                                    {/*style={[part.imagePost, part.shadow]}*/}
                                                    {/*onPress={() => {*/}
                                                        {/*navigate('Post', {id: item.id})*/}
                                                    {/*}}*/}
                                                {/*>*/}
                                                    {/*<Image*/}
                                                        {/*source={{uri: `http://${item.url}`}}*/}
                                                        {/*style={part.imagePost}*/}
                                                    {/*/>*/}
                                                    {/*<View*/}
                                                        {/*style={[part.noBorder, part.wrapperTextCategoryInImage]}>*/}
                                                        {/*<Text style={part.textCategoryInImage}*/}
                                                              {/*numberOfLines={1}>*/}
                                                            {/*{item.category ? item.category.toUpperCase() : 'BLOG'}*/}
                                                        {/*</Text>*/}
                                                    {/*</View>*/}
                                                {/*</TouchableOpacity>*/}
                                                {/*<View style={part.wrapperTextPost}>*/}
                                                    {/*<Text style={part.textTitlePost}>{item.title}</Text>*/}
                                                    {/*<View style={part.wrapperAuthor}>*/}
                                                        {/*<Image*/}
                                                            {/*source={{uri: item.author ? `http://${item.author.avatar_url}` : ''}}*/}
                                                            {/*style={[part.avatarUserTiny, part.marginRight]}*/}
                                                        {/*/>*/}
                                                        {/*<Text style={[part.textTitleAuthor, part.paddingLine]}>*/}
                                                            {/*{item.author ? item.author.name : ''}*/}
                                                        {/*</Text>*/}
                                                    {/*</View>*/}
                                                {/*</View>*/}
                                            {/*</View>*/}
                                        {/*}*/}
                                    {/*/>*/}
                                {/*</View>*/}
                            </View>
                    }
                </ParallaxScrollView>
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return {
        isLoading: state.blog.isLoading,
        data: state.blog.data,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        blogAction: bindActionCreators(blogAction, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostContainer);
