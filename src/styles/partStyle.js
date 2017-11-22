import {Platform, StyleSheet} from 'react-native';
import * as color from './color';
import * as size from './size';
import {hei, wid} from './size';

const part = StyleSheet.create({
    // NAV BAR

    itemTabInDrawer: {
        alignItems: 'center',
        flexDirection: 'row',
        height: 40,
        backgroundColor: color.backGround,
        borderBottomWidth: 0,
    },

    header: {
        backgroundColor: color.backGround
    },
    //WRAPPER
    wrapperContainer: {
        padding: 0,
        backgroundColor: color.backGround,
    },
    wrapperIsLoading: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 200,
        padding: 0,
        backgroundColor: color.none,
    },
    wrapperCenter: {},
    wrapperBuyNowButton: {
        width: wid,
        height: 60,
        position: 'absolute',
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.none,
    },
    wrapperButtonPlay: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        width: 50,
        borderRadius: 25,
        backgroundColor: color.logoColor
    },

    wrapperImageInGetFull: {
        position: 'relative',
        width: wid,
        height: 250,
        justifyContent: 'center',
        backgroundColor: color.backGround,
    },

    wrapperBottomPost: {
        position: 'relative',
        width: wid,
    },
    wrapperImageInDrawer: {
        width: wid * 3 / 4,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.backGround,
    },
    wrapperItemBookModal: {
        width: wid - 20,
        height: hei / 4 + 50,
        justifyContent: 'center',
    },
    wrapperTextInItemBookModal: {
        paddingRight: 10,
        marginLeft: 130,
        width: wid - 160,
    },
    wrapperImageInItemBookModal: {
        marginLeft: 20,
        width: 100,
        height: 130,
        position: 'absolute',
    },
    imageInItemBookModal: {
        flex: 1,
        width: 100,
        height: 130,
    },
    wrapperItemBook: {
        marginTop: 20,
        width: wid,
        height: hei / 3 - 30,
        justifyContent: 'center',
    },
    contentImage: {
        flex: 1,
        marginTop: 20,
        width: wid,
        height: hei / 3,
    },
    wrapperBuyBook: {
        width: wid,
        padding: 20,
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    wrapperModal: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    wrapperItem: {
        marginTop: 20,
        width: wid,
        height: hei / 3,
    },
    wrapperTextInItemBook: {
        paddingRight: 10,
        marginLeft: 160,
        width: wid - 160,
    },
    wrapperImageInItemBook: {
        marginLeft: 20,
        width: 120,
        height: 170,
        position: 'absolute',

    },
    wrapperImageInCard: {
        marginLeft: 20,
        width: 100,
        height: 150,
        position: 'absolute',

    },
    imageInItemBookDetail: {
        top: 100,
        width: wid / 3 + 40,
        height: hei / 3,
        position: 'absolute',
    },
    imageInItemBook: {
        flex: 1,
        width: size.wid / 3,
        height: size.hei / 4,
    },
    imageInCard: {
        flex: 1,
    },

    wrapperStatusBarNoPadding: {
        width: size.wid,
        height: 20,
        backgroundColor: color.none,
    },
    wrapperPost: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    wrapperTextPost: {
        padding: 10,
        width: wid - 40,
    },
    wrapperAuthor: {
        flexDirection: 'row',
        alignItems: 'center'
    },


    //ICON
    icon: {
        color: color.text,
        width: 18,
        height: 18,
        margin: 5,
    },

    iconInDrawerNav: {
        width: wid,
        flexDirection: 'row',
        backgroundColor: color.none,
        position: 'absolute',
    },

    borderNone: {
        borderBottomWidth: 0,
        borderTopWidth: 0,
    },

    // FORM


    avatarUserNormal: {
        width: 70,
        height: 70,
        borderRadius: 35,
    },
    avatarCourse: {
        width: 60,
        height: 80,
    },
    avatarUserTiny: {
        width: 15,
        height: 15,
        borderRadius: 15 / 2,
    },


    image: {
        height: size.hei * 0.6,
        width: wid,
        flex: 1,
        position: 'relative',
        backgroundColor: color.backGround,
    },
    imagePost: {
        height: hei / 3,
        width: wid - 40,
        flex: 1,
        borderRadius: 15,
    },

    imageLesson: {
        height: wid - 40,
        width: wid - 40,
        flex: 1,
        borderRadius: 15,
    },


    titleLargeDarkBold: {
        fontFamily: (Platform.OS === 'ios') ? 'Montserrat' : 'Montserrat-Bold',
        fontSize: 25,
        fontWeight: Platform.OS === 'ios' ? 'bold' : 'normal',
        color: color.text,
    },
    textLogo: {
        fontFamily: (Platform.OS === 'ios') ? 'Lobster' : 'Lobster',
        fontSize: 30,
        fontWeight: Platform.OS === 'ios' ? 'bold' : 'normal',
        color: color.logoColor,
    },
    titleType: {
        fontFamily: (Platform.OS === 'ios') ? 'Montserrat' : 'Montserrat-Bold',
        fontSize: 13,
        fontWeight: Platform.OS === 'ios' ? 'bold' : 'normal',
        color: color.text,
    },
    titleBigDarkBold: {
        fontFamily: (Platform.OS === 'ios') ? 'Montserrat' : 'Montserrat-Bold',
        fontSize: 18,
        fontWeight: Platform.OS === 'ios' ? 'bold' : 'normal',
        color: color.text,
    },

    titleDark: {
        fontFamily: (Platform.OS === 'ios') ? 'Montserrat' : 'Montserrat-Light',
        fontSize: size.titleNormal,
        color: color.text,
        fontWeight: Platform.OS === 'ios' ? '400' : 'normal',
    },
    titleSmallDarkBold: {
        fontFamily: (Platform.OS === 'ios') ? 'Montserrat' : 'Montserrat-Medium',
        fontSize: size.titleSmall,
        color: color.text,
        fontWeight: Platform.OS === 'ios' ? '600' : 'normal',
    },
    titleSmallDark: {
        fontFamily: (Platform.OS === 'ios') ? 'Montserrat' : 'Montserrat-Medium',
        fontSize: size.titleSmall,
        color: color.text,
        fontWeight: Platform.OS === 'ios' ? '400' : 'normal',
    },
    textAuthorName: {
        fontFamily: (Platform.OS === 'ios') ? 'Montserrat' : 'Montserrat-Bold',
        fontSize: size.title,
        color: '#42d9f4',
        fontWeight: Platform.OS === 'ios' ? '600' : 'normal',
    },
    infoTitle: {
        marginTop: 20,
        fontFamily: (Platform.OS === 'ios') ? 'Montserrat' : 'Montserrat-Medium',
        fontSize: size.titleSmall,
        color: color.text,
        fontWeight: 'normal',
        marginRight: 16,
    },
    titleSmallDarkBoldHaveButtonBackInHeader: {
        fontFamily: (Platform.OS === 'ios') ? 'Montserrat' : 'Montserrat-Medium',
        fontSize: size.titleSmall,
        color: color.text,
        fontWeight: Platform.OS === 'ios' ? '600' : 'normal',
        marginLeft: -50,
    },
    titleDarkBold: {
        fontFamily: (Platform.OS === 'ios') ? 'Montserrat' : 'Montserrat-Bold',
        fontSize: size.title,
        color: color.text,
        fontWeight: (Platform.OS === 'ios') ? '700' : 'normal',
    },
    describeDarkGray: {
        fontFamily: (Platform.OS === 'ios') ? 'Montserrat' : 'Montserrat-Medium',
        fontSize: size.describe,
        color: color.darkGray,
        fontWeight: (Platform.OS === 'ios') ? '400' : 'normal',
    },
    backgroundNone: {
        backgroundColor: color.none,
    },
    padding: {
        padding: 10,
    },
    paddingLBR: {
        paddingLeft: 10,
        paddingBottom: 10,
        paddingRight: 10,
    },
    paddingIcon: {
        paddingRight: 5,
    },
    paddingRight: {
        paddingRight: 5,
    },
    paddingRightFar: {
        paddingRight: 10,
    },
    paddingLeft: {
        paddingLeft: 5,
    },
    paddingBottom: {
        paddingBottom: 5,
    },
    paddingTop: {
        paddingTop: 5,
    },
    paddingLine: {
        paddingTop: 3,
        paddingBottom: 3,
    },
    paddingLine10: {
        paddingTop: 10,
        paddingBottom: 10,
    },
    paddingLine8: {
        paddingTop: 8,
        paddingBottom: 8,
    },
    paddingLineFar: {
        paddingTop: 15,
        paddingBottom: 15,
    },
    paddingTRB: {
        paddingRight: 5,
        paddingBottom: 5,
        paddingTop: 5,
    },
    paddingTLB: {
        paddingLeft: 5,
        paddingBottom: 5,
        paddingTop: 5,
    },
    noPadding: {
        paddingLeft: 0,
        paddingRight: 0,
    },
    paddingLR: {
        paddingLeft: 10,
        paddingRight: 10,
    },
    paddingLRWrapper: {
        paddingLeft: 20,
        paddingRight: 20,
    },
    noPaddingTop: {
        paddingTop: 0,
    },
    noPaddingTopBottom: {
        paddingTop: 0,
        paddingBottom: 0,
    },
    noPaddingBottom: {
        paddingBottom: 0,
    },

    margin: {
        margin: 10,
    },
    marginContent: {
        marginLeft: 15,
        marginRight: 15,
    },
    margin5: {
        margin: 8,
    },
    marginLeftFar: {
        paddingLeft: 20
    },
    marginRight: {
        marginRight: 5,
    },
    marginRightFar: {
        marginRight: 15,
    },
    marginLeft: {
        marginLeft: 5,
    },
    marginBottom: {
        marginBottom: 5,
    },
    marginTop: {
        marginTop: 5,
    },
    marginTRB: {
        marginRight: 5,
        marginBottom: 5,
        marginTop: 5,
    },
    marginStatusBar: {
        marginTop: 20,
    },
    noMarginLeft: {
        marginLeft: 0,
    },


    cardHeader: {
        justifyContent: 'flex-start',
        margin: 0,
        backgroundColor: color.none,
    },
    cardHeader2: {
        justifyContent: 'center',
        margin: 0,
        backgroundColor: color.none,
    },


    wrapperBackButton: {
        width: 50,
    },
    noBorder: {
        borderBottomWidth: 0,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
    },
    shadow: {
        elevation: 1,
        shadowColor: color.transparentBlack,
        shadowOffset: {width: 0, height: 3},
        shadowOpacity: 0.3,
    },
    haveBorderBottom: {
        borderBottomWidth: 0.5,
        borderColor: color.icon,
    },
    haveBorderTop: {
        borderTopWidth: 0.5,
        borderColor: color.icon,
    },


    wrapperTextCategory: {
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.main,
        paddingLeft: 10,
        paddingRight: 10,
    },
    wrapperTextCategoryInImage: {
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.main,
        paddingLeft: 10,
        paddingRight: 10,
        position: 'absolute',
        bottom: 10,
        right: 10,
    },
    wrapperTextCategoryInBook: {
        width: 50,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.main,
        paddingLeft: 5,
        paddingRight: 5,
    },
    textG: {
        fontFamily: (Platform.OS === 'ios') ? 'Montserrat' : 'Montserrat-Medium',
        fontWeight: Platform.OS === 'ios' ? '600' : 'normal',
        fontSize: 100,
        color: color.text,

    },
    textLogoInDrawer: {
        fontFamily: (Platform.OS === 'ios') ? 'Lobster' : 'Lobster',
        fontWeight: Platform.OS === 'ios' ? '600' : 'normal',
        fontSize: 50,
        color: color.logoColor,
        marginBottom: Platform.OS === 'ios' ? 0 : 30


    },
    textTitlePost: {
        fontFamily: (Platform.OS === 'ios') ? 'Montserrat' : 'Montserrat-Medium',
        fontSize: 16,
        fontWeight: Platform.OS === 'ios' ? '600' : 'normal',
        color: color.text,

    },
    textTitlePostInPost: {
        paddingTop: 20,
        paddingBottom: 0,
        textAlign: 'center',
        fontFamily: (Platform.OS === 'ios') ? 'Montserrat' : 'Montserrat-Medium',
        fontSize: 16,
        fontWeight: Platform.OS === 'ios' ? '600' : 'normal',
        color: color.text,

    },

    textTitleRules: {
        paddingTop: 20,
        paddingBottom: 0,
        fontFamily: (Platform.OS === 'ios') ? 'Montserrat' : 'Montserrat-Medium',
        fontSize: 16,
        fontWeight: Platform.OS === 'ios' ? '600' : 'normal',
        color: color.text,

    },
    textTitleContent: {
        fontFamily: (Platform.OS === 'ios') ? 'Montserrat' : 'Montserrat-Bold',
        fontSize: 16,
        fontWeight: Platform.OS === 'ios' ? '600' : 'normal',
        color: color.text,

    },
    textBigLight: {
        paddingBottom: 0,
        fontFamily: (Platform.OS === 'ios') ? 'Montserrat' : 'Montserrat-Medium',
        fontSize: 13,
        fontWeight: Platform.OS === 'ios' ? '600' : 'normal',
        color: color.navTitle,

    },
    textBigBlue: {
        paddingBottom: 0,
        fontFamily: (Platform.OS === 'ios') ? 'Montserrat' : 'Montserrat-Medium',
        fontSize: 13,
        fontWeight: Platform.OS === 'ios' ? '600' : 'normal',
        color: color.titleBlue,

    },
    textBookName: {
        paddingBottom: 0,
        fontFamily: (Platform.OS === 'ios') ? 'Montserrat' : 'Montserrat-Medium',
        fontSize: 16,
        fontWeight: Platform.OS === 'ios' ? '600' : 'normal',
        color: color.text,

    },
    textTitleAuthor: {
        fontFamily: (Platform.OS === 'ios') ? 'Montserrat' : 'Montserrat-Light',
        fontSize: 14,
        fontWeight: Platform.OS === 'ios' ? '400' : 'normal',

    },
    textTitleAuthorBlue: {
        color: color.titleBlue,
        fontFamily: (Platform.OS === 'ios') ? 'Montserrat' : 'Montserrat-Medium',
        fontSize: 14,
        fontWeight: Platform.OS === 'ios' ? '500' : 'normal',
    },
    textTime: {
        color: color.gray,
        fontFamily: (Platform.OS === 'ios') ? 'Montserrat' : 'Montserrat-Medium',
        fontSize: 13,
        fontWeight: Platform.OS === 'ios' ? '400' : 'normal',
    },
    textDescription: {
        color: color.text,
        fontFamily: (Platform.OS === 'ios') ? 'Montserrat' : 'Montserrat-Regular',
        fontSize: 12,
        fontWeight: Platform.OS === 'ios' ? '400' : 'normal',
    },
    textPrice: {
        textDecorationLine: 'line-through',
        color: color.gray,
        fontFamily: (Platform.OS === 'ios') ? 'Montserrat' : 'Montserrat-Regular',
        fontSize: 12,
        fontWeight: Platform.OS === 'ios' ? '400' : 'normal',
    },
    textPrice2: {
        color: color.darkGray,
        fontFamily: (Platform.OS === 'ios') ? 'Montserrat' : 'Montserrat-Medium',
        fontSize: 12,
        fontWeight: Platform.OS === 'ios' ? '400' : 'normal',
    },
    textCategory: {
        padding: 3,
        color: color.backGround,
        fontFamily: (Platform.OS === 'ios') ? 'Montserrat' : 'Montserrat-Medium',
        fontSize: 13,
        fontWeight: Platform.OS === 'ios' ? '500' : 'normal',
    },
    textCategoryInImage: {
        backgroundColor: color.main,
        padding: 3,
        color: color.backGround,
        fontFamily: (Platform.OS === 'ios') ? 'Montserrat' : 'Montserrat-Medium',
        fontSize: 11,
        fontWeight: Platform.OS === 'ios' ? '400' : 'normal',
    },
    textCategoryInBook: {
        backgroundColor: color.main,
        padding: 5,
        paddingTop: 3,
        paddingBottom: 3,
        borderRadius: 5,
        color: color.backGround,
        fontFamily: (Platform.OS === 'ios') ? 'Montserrat' : 'Montserrat-Medium',
        fontSize: 11,
        fontWeight: Platform.OS === 'ios' ? '400' : 'normal',
    },
    textNormalThinGray: {
        color: color.gray,
        fontFamily: (Platform.OS === 'ios') ? 'Montserrat' : 'Montserrat-Medium',
        fontSize: 13,
        fontWeight: Platform.OS === 'ios' ? '400' : 'normal',
    },
    textNormalDark: {
        color: color.darkGray,
        fontFamily: (Platform.OS === 'ios') ? 'Montserrat' : 'Montserrat-Regular',
        fontSize: 12,
        fontWeight: Platform.OS === 'ios' ? '400' : 'normal',
    },
    buttonBuyNow: {
        borderRadius: 5,
        padding: 10,
        backgroundColor: color.titleBlue,
        alignItems: 'center',
        flexDirection: 'row',
    },
    buttonBuyNowFullSize: {
        borderRadius: 50,
        width: size.wid * 0.9,
        padding: 8,
        backgroundColor: color.titleBlue,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    lineTitle: {
        marginTop: 5,
        marginBottom: 5,
        height: 2,
        width: wid - 40,
        backgroundColor: 'rgb(14, 15,15)'
    },
    buttonOrderInModal: {
        borderRadius: 15,
        padding: 10,
        paddingTop: 5,
        paddingBottom: 5,
        backgroundColor: color.titleBlue,
        alignItems: 'center',
        flexDirection: 'row',
    },

    modalCart: {
        borderRadius: 15,
        width: wid * 0.9,
        height: hei * 0.8,
        backgroundColor: color.backGround,
    },
    modalCartStatus: {
        borderRadius: 15,
        width: wid * 0.9,
        height: hei * 0.5,
        backgroundColor: color.backGround,
    },
    topModal: {
        height: 50,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentModal: {
        flex: 1,
    },
    bottomModal: {
        height: 110,
        padding: 10,
        alignItems: 'center',
        bottom: 0,
    },
    imageTitle1: {
        marginTop: 10,
        width: wid / 2,
        height: hei / 3,
    },
    imageTitle2: {
        width: 300,
        height: 300,
        borderRadius: 15,
    },
    textCounter: {
        marginTop: 30,
        fontSize: 50,
        fontFamily: (Platform.OS === 'ios') ? 'Montserrat' : 'Montserrat-Bold',
        fontWeight: Platform.OS === 'ios' ? '600' : 'normal',
    },
    cardCmt: {
        flexDirection: 'row',
        flex: 1
    },
    wrapperForm: {
        marginTop: 10,
        marginBottom: 10,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    wrapperInputInfoUser: {
        width: wid * 0.7,
        margin: 5,
        height: 30
    }
    , wrapperTextInputInfoUser: {
        width: wid * 0.7,
        margin: 5,
    },
    inputInfoUser: {
        color: color.text,
        margin: 5,
        fontSize: 12,
        fontFamily: (Platform.OS === 'ios') ? 'Montserrat' : 'Montserrat-Medium',
        fontWeight: Platform.OS === 'ios' ? '400' : 'normal',
    },
    // TIME LINE
    wrapperTimeLine: {
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    timeLineStraight: {
        width: 5,
        height: 70,
        backgroundColor: color.icon,
    },
    timeLineCircle: {
        width: 14,
        height: 14,
        borderRadius: 7,
        top: 20,
        position: 'absolute',
        backgroundColor: color.titleBlue
    },


    // PLAY PROGRESS
    wrapperDeadline: {
        marginLeft: 3,
        width: wid - 20,
        height: 5,
        borderRadius: 5,
        backgroundColor: color.lightGray,
    },

    deadlineProgress: {
        height: 5,
        borderRadius: 5,
        backgroundColor: color.logoColor,
    },
});


export default part;