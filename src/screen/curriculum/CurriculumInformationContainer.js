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
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import Video from 'react-native-video';

class CurriculumInformationContainer extends Component {
    constructor() {
        super();
        this.state = {
            play: 1,
            paused: false,
            duration: 0.0,
            currentTime: 0.0,
            minute: 0,
            second: 0,
            minuteDuration: 0,
            secondDuration: 0,
            temp: 0,
        };
        this.onLoad = this.onLoad.bind(this);
        this.onProgress = this.onProgress.bind(this);
    }

    componentWillMount() {
        const {params} = this.props.navigation.state;
        this.props.curriculumAction.getCurriculum(params.id)
    }

    playSound() {
        if (this.state.paused === true) {
            this.setState({paused: false});
        } else {
            this.setState({paused: true});
        }
    }

    onLoad(data) {
        this.setState({duration: data.duration});
        let duration = parseInt(this.state.duration);
        if (this.state.duration > 0) {
            this.setState({
                minuteDuration: parseInt(duration / 60),
                secondDuration: parseInt(duration % 60),
            })
        }
        console.log(this.state.minuteDuration)
        console.log(this.state.secondDuration)
    }

    onProgress(data) {
        this.setState({currentTime: data.currentTime});
        let second = parseInt(this.state.currentTime);
        if (data.currentTime <= data.currentTime) {
            this.setState({
                minute: parseInt(second / 60),
                second: parseInt(second % 60),
            })
        } else {
            this.setState({
                minute: 0,
                second: 0,
                paused: true
            })
        }
    }

    render() {
        let iconPlay = this.state.paused === true ? 'ion|ios-play' : 'ion|ios-pause';
        let {play, paused} = this.state;
        const {goBack} = this.props.navigation;
        const {isLoadingCurriculum, data} = this.props;
        let temp = this.state.currentTime == 0 || this.state.duration == 0 || (this.state.minute == this.state.minuteDuration && this.state.second == this.state.secondDuration)? 0 : this.state.currentTime / this.state.duration;
        let widthDeadlineProgress = (size.wid - 20) * temp;
        let url = 'https://cf-hls-media.sndcdn.com/media/478562/638221/iqp84Dd7m5ro.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLWhscy1tZWRpYS5zbmRjZG4uY29tL21lZGlhLyovKi9pcXA4NERkN201cm8uMTI4Lm1wMyIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTUxMTMyNzQzOH19fV19&Signature=oDCtAp4E5DiRVc2-t4rCMrBtp-XgT-sA8l13TV5Q6P9myzau--4LLQPff8G7r4BW6c8nV6HlrHN7NwzD-aNs4dYQhU~IUAD-1UBxWnBjl~JZnsMaHc-s3p5M5qCpk6EnwiysiYBtedS36lb7G5zBdM8ibfFXZMVsfZXmlQGLUiIsSXkBiDYlh-k5Kszssnidi37LqfUw5~~2TlOfEcy2t6EEiWRyyhio7GK8y-OTuvPcQfswRm9vhvjgGOtFp65oe-AQqDEve8GBIyVtyBX1JGJ828zCmJsQ4D~XhsVtbCBF5tV0NVJrlOpvRSQWoXyfVN8pQjnbTAEt1PJf5ToLsA__&Key-Pair-Id=APKAJAGZ7VMH2PFPW6UQ'
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
                <View style={[part.bottomModalInLesson, part.haveBorderTop]}>
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity
                            activeOpacity={1}
                            style={[part.padding, part.wrapperButtonPlay]}
                            onPress={() => this.playSound()}
                        >
                            <Icon name={iconPlay}
                                  size={25}
                                  color={color.navTitle}
                            />
                        </TouchableOpacity>
                        <View style={[{flex: 1, justifyContent: 'center'}, part.marginLeft]}>
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
                        <Video
                            source={{uri: url}}   // Can be a URL or a local file.
                            ref={(ref) => {
                                this.player = ref
                            }}                                      // Store reference
                            rate={play}                              // 0 is paused, 1 is normal.
                            volume={1}                            // 0 is muted, 1 is normal.
                            muted={false}                           // Mutes the audio entirely.
                            paused={paused}                          // Pauses playback entirely.
                            repeat={false}                           // Repeat forever.
                            playInBackground={true}                // Audio continues to play when app entering background.
                            playWhenInactive={false}                // [iOS] Video continues to play when control or notification center are shown.
                            ignoreSilentSwitch={"ignore"}           // [iOS] ignore | obey - When 'ignore', audio will still play with the iOS hard silent switch set to silent. When 'obey', audio will toggle with the switch. When not specified, will inherit audio settings as usual.
                            progressUpdateInterval={250.0}          // [iOS] Interval to fire onProgress (default to ~250ms)
                            onLoad={this.onLoad}    // Callback when video loads
                            onProgress={this.onProgress }    // Callback every ~250ms with currentTime
                        />
                    </View>
                    <View style={{paddingTop: 10}}>
                        <View style={part.wrapperDeadline}>
                            <View
                                style={[part.deadlineProgress, {width: widthDeadlineProgress}]}>
                            </View>
                        </View>
                    </View>
                    <View style={[part.paddingTop, {
                        width: size.wid - 20,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }]}>
                        <Text style={part.describeDarkGray}>
                            {this.state.minute}:{this.state.second < 10 ? '0' : ''}{this.state.second}
                        </Text>
                        <Text style={part.describeDarkGray}>
                            {parseInt(this.state.duration / 60)}:{parseInt(this.state.duration % 60) < 10 ? '0' : ''}{parseInt(this.state.duration % 60)}
                        </Text>
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