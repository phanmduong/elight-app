import React, {Component} from 'react';
import {
    FlatList, Text, TouchableOpacity, View, Platform, Image
} from 'react-native';

import {
    Body, CardItem, Header, Container, Content,
    Left, Right, Spinner, Item
} from 'native-base';
import Icon from '../../commons/Icon';
import BackButton from '../../commons/BackButton';
import part from '../../styles/partStyle';
import * as color from '../../styles/color'
import parallaxStyle from '../../styles/parallaxStyle';
import * as size from '../../styles/size';
import ParallaxScrollView from 'react-native-parallax-scroll-view';

class CurriculumListContainer extends Component {
    render() {
        const {params} = this.props.navigation.state;
        const {goBack, navigate} = this.props.navigation;
        const {isLoading, courses} = this.props;
        return (
            <Container style={part.wrapperContainer}>
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
                                            {params.name}
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
                                        {params.name}
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
                    <View style={part.marginBottom}>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={params.lessons}
                            renderItem={({item}) =>
                                <View
                                    style={[part.backgroundNone, part.noMarginLeft]}>
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        style={{flex: 1, flexDirection: 'row'}}
                                        onPress={() => navigate('CurriculumInformation', {id: item.id})}
                                    >
                                        <View style={part.wrapperTimeLine}>
                                            <View style={part.timeLineStraight}/>
                                            <View style={part.timeLineCircle}/>
                                        </View>
                                        <View style={{justifyContent: 'center', flex: 1}}>
                                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                                <Left style={{flexDirection: 'row'}}>
                                                    <View>
                                                        <Text style={[part.titleDarkBold, part.marginRight]}>Lesson {item.order}</Text>
                                                        <Text style={part.describeDarkGray}>{item.name}</Text>
                                                    </View>
                                                    <Right style={part.marginRight}>
                                                        <Icon name="entypo|chevron-thin-right"
                                                              size={size.iconBig}
                                                              color={color.gray}
                                                        />
                                                    </Right>
                                                </Left>

                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            }
                        />
                    </View>
                </ParallaxScrollView>
            </Container>
        );
    }
}

export default (CurriculumListContainer)