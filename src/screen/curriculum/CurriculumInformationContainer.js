import React, {Component} from 'react';
import {
    Text, View, Platform, StatusBar, TouchableOpacity, Image
} from 'react-native';
import {
    Body, CardItem, Header, Container, Button,
    Left, Right, Spinner, Item
} from 'native-base';
import BackButton from '../../commons/BackButton';
import Icon from '../../commons/Icon';
import part from '../../styles/partStyle';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as color from '../../styles/color'
import parallaxStyle from '../../styles/parallaxStyle';
import * as size from '../../styles/size';
import * as curriculumAction from './curriculumAction';
import WebViewAutoHeight from '../../commons/WebViewAutoHeight';
import ParallaxScrollView from 'react-native-parallax-scroll-view';

class CurriculumInformationContainer extends Component {
    componentWillMount() {
        const {params} = this.props.navigation.state;
        this.props.curriculumAction.getCurriculum(params.id)
    }

    render() {
        const {goBack, navigate} = this.props.navigation;
        const {isLoadingCurriculum, data} = this.props;
        return (
            <Container style={part.wrapperContainer}>
                <StatusBar
                    backgroundColor={color.bgModal}
                    barStyle={Platform.OS === 'ios' ? "dark-content" : "light-content"}
                />
                <ParallaxScrollView
                    backgroundColor={color.backGround}
                    showsVerticalScrollIndicator={false}
                    headerBackgroundColor={color.backGround}
                    stickyHeaderHeight={size.STICKY_HEADER_HEIGHT}
                    parallaxHeaderHeight={150}
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
                                <CardItem style={[part.cardHeader, part.noPaddingTopBottom]}>
                                    <Item style={[part.noBorder]}>
                                        <Text style={[part.titleLargeDarkBold, part.marginBottom]} numberOfLines={1}>
                                            {
                                                isLoadingCurriculum
                                                    ?
                                                    'Đang tải...'
                                                    :
                                                    data.name
                                            }
                                        </Text>
                                    </Item>
                                </CardItem>
                                <CardItem style={[part.cardHeader, part.noPaddingTopBottom]}>
                                    <Item style={[part.noBorder]}>
                                        <Text style={[part.describeDarkGray, part.marginBottom]} numberOfLines={2}>
                                            {
                                                isLoadingCurriculum
                                                    ?
                                                    'Đang tải...'
                                                    :
                                                    data.name
                                            }
                                        </Text>
                                    </Item>
                                </CardItem>
                            </View>
                        </View>

                    )}
                    renderStickyHeader={() => (
                        <View key="sticky-header" style={parallaxStyle.stickySection}>
                            <View style={part.iconInDrawerNav}>
                                <Left style={Platform.OS === 'ios' ? {
                                    flexDirection: 'row',
                                    marginTop: 20
                                } : {flexDirection: 'row'}}>
                                    <Body style={{padding: 30}}>
                                    <Text style={part.titleSmallDarkBold} numberOfLines={1}>
                                        {
                                            isLoadingCurriculum
                                                ?
                                                'Đang tải...'
                                                :
                                                data.name
                                        }
                                    </Text>
                                    </Body>
                                </Left>
                            </View>
                        </View>
                    )}
                    renderFixedHeader={() => (
                        <View key="fixed-header" style={part.iconInDrawerNav}>
                            <Left style={Platform.OS === 'ios' ? {marginTop: 20} : {marginTop: 10}}>
                                <BackButton goBack={goBack}/>
                            </Left>
                        </View>
                    )}
                >
                    <View style={[part.wrapperPost, {marginBottom: 20}]}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={part.imageLesson}
                        >
                            <View
                                style={
                                    [
                                        part.imageLesson,
                                        Platform.OS === 'ios'
                                            ?
                                            part.shadow
                                            :
                                            ''
                                    ]
                                }
                            >
                                <Image
                                    source={{uri: 'https://www.w3schools.com/w3css/img_fjords.jpg'}}
                                    style={part.imageLesson}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>


                </ParallaxScrollView>
                <View style={[part.bottomModal, part.haveBorderTop]}>
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity
                            style={[part.padding, part.wrapperButtonPlay]}
                        >
                            <Icon name="entypo|controller-play"
                                  size={25}
                                  color={color.navTitle}
                                  style={part.marginLeft}
                            />
                        </TouchableOpacity>
                        <View style={[{flex: 1, justifyContent:'center'}, part.marginLeft]}>
                            <Text style={part.titleSmallDarkBold} numberOfLines={1}>
                                {
                                    isLoadingCurriculum
                                        ?
                                        'Đang tải...'
                                        :
                                        data.name ? data.name.toUpperCase() : data.name
                                }
                            </Text>
                            <Text style={part.describeDarkGray} numberOfLines={1}>
                                {
                                    isLoadingCurriculum
                                        ?
                                        'Đang tải...'
                                        :
                                        data.name
                                }
                            </Text>
                        </View>
                    </View>
                </View>
            </Container>
        );
    }
}


function mapStateToProps(state) {
    return {
        data: state.curriculum.data,
        isLoadingCurriculum: state.curriculum.isLoadingCurriculum,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        curriculumAction: bindActionCreators(curriculumAction, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CurriculumInformationContainer)