import React, {Component} from 'react';
import {Image, Platform, StatusBar, Text, View, TouchableOpacity} from 'react-native';
import part from '../../styles/partStyle';
import * as color from '../../styles/color';
import * as size from '../../styles/size';
import BackButton from '../../commons/BackButton';
import * as detailBookAction from '../detailBook/detailBookAction';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
    Body,
    Button,
    Card,
    CardItem,
    Container,
    Content,
    Input,
    Item,
    Left,
    List,
    ListItem,
    Right,
    Spinner,
    Thumbnail
} from 'native-base';
import Icon from '../../commons/Icon';

class DetailBookContainer extends Component {
    constructor() {
        super();
    }

    componentWillMount() {
        this.props.detailBookAction.detailBook(this.props.navigation.state.params.id);
    }

    render() {
        const {navigate} = this.props.navigation;
        const {goBack} = this.props.navigation;
        const {isLoadingBook, detailBook} = this.props;
        return (

            <Container ref="page" style={part.wrapperContainer}>
                <StatusBar
                    backgroundColor={color.bgModal}
                    barStyle={ Platform.OS === 'ios' ? "dark-content" : "light-content"}
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
                    <Item style={[part.noBorder]}>
                        <Left>
                            <BackButton goBack={goBack}/>
                        </Left>
                    </Item>
                </View>
                <Content>
                    <View>
                        <Item style={[part.noBorder, {paddingLeft: 15}]}>
                            <Text style={[part.titleLargeDarkBold]}>
                                {
                                    isLoadingBook
                                        ?
                                        'TÊN SÁCH'
                                        :
                                        detailBook.name
                                }
                            </Text>
                        </Item>
                    </View>
                    {
                        isLoadingBook
                            ?
                            <View style={[part.wrapperContainer, {height: 80}]}>
                                <Spinner color={color.gray}/>
                            </View>
                            :
                            <View style={{alignItems: 'center'}}>
                                <Image
                                    resizeMode={'cover'}
                                    style={[part.contentImage]}
                                    source={{uri: detailBook.cover ? detailBook.cover : ''}}
                                />
                                <Image
                                    resizeMode={'cover'}
                                    style={[part.imageInItemBookDetail]}
                                    source={{uri: detailBook.avatar ? detailBook.avatar : ''}}
                                />
                                {
                                    console.log(detailBook.avatar)
                                }
                                <View style={[{marginTop: 130, flex: 1}, part.marginContent]}>
                                    <Text style={part.textTitleContent}>
                                        {detailBook.title1}
                                    </Text>
                                    <View style={part.lineTitle}></View>
                                    <Text
                                        style={part.textDescription}>
                                        {detailBook.content1}
                                    </Text>
                                    <View style={{alignItems: 'center', flex: 1, justifyContent: 'flex-end'}}>
                                        <Image
                                            resizeMode={'cover'}
                                            style={part.imageTitle1}
                                            source={{uri: detailBook.img_url1 ? detailBook.img_url1 : ''}}
                                        />
                                    </View>
                                </View>

                                <View style={part.marginContent}>
                                    <Text style={part.textTitleContent}>
                                        {detailBook.title2}
                                    </Text>
                                    <View style={part.lineTitle}></View>
                                    <Text style={part.textDescription}>
                                        {detailBook.content2}
                                    </Text>
                                </View>
                                <View>
                                    <View style={part.marginContent}>
                                        <Text style={[part.textCounter, {color: detailBook.main_color}]}>
                                            {detailBook.counter1}
                                        </Text>
                                        <Text
                                            style={[part.textDescription]}>
                                            {detailBook.counter1_content}
                                        </Text>
                                    </View>
                                    <View style={part.marginContent}>
                                        <Text style={[part.textCounter, {color: detailBook.main_color}]}>
                                            {detailBook.counter2}
                                        </Text>
                                        <Text
                                            style={[part.textDescription]}>
                                            {detailBook.counter2_content}
                                        </Text>
                                    </View>
                                    <View style={part.marginContent}>
                                        <Text style={[part.textCounter, {color: detailBook.main_color}]}>
                                            {detailBook.counter3}
                                        </Text>
                                        <Text
                                            style={[part.textDescription]}>
                                            {detailBook.counter3_content}
                                        </Text>
                                    </View>
                                </View>
                                <View style={[{marginLeft: -10, marginTop: 20}]}>
                                        <Text style={part.textTitleContent}>
                                            {detailBook.title5}
                                        </Text>
                                        <View style={part.lineTitle}/>
                                    <View style={{marginTop: 20, marginBottom: 30}}>
                                        <CardItem avatar style={part.noPadding}>
                                            <View style={part.cardCmt}>
                                                <Image
                                                    style={[part.avatarUserNormal, part.marginRightFar]}
                                                    source={{uri: detailBook.author1_avt_url}}/>
                                                <Body style={part.noBorder}>
                                                <Text
                                                    style={[part.textAuthorName, {color: detailBook.main_color}]}>{detailBook.author1 ? detailBook.author1.toUpperCase() : ''}</Text>
                                                <Text
                                                    style={[part.textDescription]}>{detailBook.author1_comment}</Text>
                                                </Body>
                                            </View>
                                        </CardItem>
                                        <CardItem avatar style={part.noPadding}>
                                            <View style={part.cardCmt}>
                                                <Image
                                                    style={[part.avatarUserNormal, part.marginRightFar]}
                                                    source={{uri: detailBook.author2_avt_url}}/>
                                                <Body style={part.noBorder}>
                                                <Text
                                                    style={[part.textAuthorName, {color: detailBook.main_color}]}>{detailBook.author2 ? detailBook.author2.toUpperCase() : ''}</Text>
                                                <Text
                                                    style={[part.textDescription]}>{detailBook.author2_comment}</Text>
                                                </Body>
                                            </View>

                                        </CardItem>
                                        <CardItem avatar style={[part.noPadding, {marginBottom: 50}]}>
                                            <View style={part.cardCmt}>
                                                <Image
                                                    style={[part.avatarUserNormal, part.marginRightFar]}
                                                    source={{uri: detailBook.author3_avt_url}}/>
                                                <Body style={part.noBorder}>
                                                <Text
                                                    style={[part.textAuthorName, {color: detailBook.main_color}]}>{detailBook.author3 ? detailBook.author3.toUpperCase() : ''}</Text>
                                                <Text
                                                    style={[part.textDescription]}>{detailBook.author3_comment}</Text>
                                                </Body>
                                            </View>
                                        </CardItem>

                                    </View>
                                </View>

                            </View>
                    }

                </Content>
                <View style={part.wrapperBuyNowButton}>
                    <TouchableOpacity
                        style={part.buttonBuyNowFullSize}
                        onPress={() => {

                        }}
                    >
                        <Text style={[part.paddingRight, part.textBigLight]}>Đặt mua
                            ngay</Text>
                        <Icon name="feat|arrow-right"
                              size={size.iconBig}
                              color={color.navTitle}
                        />
                    </TouchableOpacity>
                </View>
            </Container>

        )
    }
}

function mapStateToProps(state) {
    return {
        detailBook: state.detailBook.detailBook,
        isLoadingBook: state.detailBook.isLoadingBook,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        detailBookAction: bindActionCreators(detailBookAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailBookContainer);
