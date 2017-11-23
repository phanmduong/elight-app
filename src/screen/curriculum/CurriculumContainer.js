import React, {Component} from 'react';
import {
    FlatList, Text, TouchableOpacity, View, Platform, Image, StatusBar
} from 'react-native';

import {
    Body, CardItem, Header, Container, Content,
    Left, Right, Spinner, Item
} from 'native-base';
import BackButton from '../../commons/BackButton';
import part from '../../styles/partStyle';
import * as color from '../../styles/color'
import * as curriculumAction from './curriculumAction'
import parallaxStyle from '../../styles/parallaxStyle';
import * as size from '../../styles/size';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class CurriculumContainer extends Component {
    componentDidMount() {
        this.props.curriculumAction.getCourse();
    }

    render() {
        const {goBack, navigate} = this.props.navigation;
        const {isLoading, courses} = this.props;
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
                    parallaxHeaderHeight={120}
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
                                    <Item style={part.noBorder}>
                                        <Text style={[part.titleLargeDarkBold, part.marginBottom]} numberOfLines={1}>
                                            GIÁO TRÌNH
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
                                        GIÁO TRÌNH
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
                    {
                        isLoading
                            ?
                            <View style={part.wrapperIsLoading}>
                                <Spinner color={color.gray}/>
                            </View>
                            :
                            <FlatList
                                showsVerticalScrollIndicator={false}
                                data={courses}
                                renderItem={({item}) =>
                                    <CardItem
                                        avatar
                                        style={[part.backgroundNone, part.noMarginLeft, part.padding, part.haveBorderBottom]}>
                                        <TouchableOpacity
                                            activeOpacity={0.8}
                                            style={{flex: 1}}
                                            onPress={() => navigate('CurriculumList',
                                                {name: item.name, lessons: item.lessons},
                                            )
                                            }
                                        >
                                            <Left>
                                                <Image
                                                    style={part.avatarCourse}
                                                    source={{uri: item.icon_url}}/>
                                                <Body style={[part.noBorder, {height: 80, justifyContent: 'flex-start'}]}>
                                                <Text style={part.textTitleAuthorBlue}>{item.name}</Text>
                                                <Text
                                                    style={[part.titleDark, part.paddingLine]}>
                                                    {item.duration} bài
                                                </Text>
                                                </Body>
                                            </Left>
                                        </TouchableOpacity>
                                    </CardItem>
                                }
                            />
                    }
                </ParallaxScrollView>
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return {
        isLoading: state.curriculum.isLoadingCourse,
        courses: state.curriculum.courses,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        curriculumAction: bindActionCreators(curriculumAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CurriculumContainer)