import {StyleSheet} from 'react-native';
import * as color from './color';
import * as size from './size';

const parallaxStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: size.wid,
        height: size.PARALLAX_HEADER_HEIGHT
    },
    stickySection: {
        alignItems: 'center',
        height: size.STICKY_HEADER_HEIGHT,
        justifyContent: 'center',
        backgroundColor: color.backGround
    },
    parallaxHeader: {
        marginTop: 20,
        height: size.PARALLAX_HEADER_HEIGHT_USER,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    parallaxHeaderPost: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    parallaxHeaderTitle: {
        flex: 1,
        justifyContent: 'flex-end',
        flexDirection: 'column',
        bottom: 30
    },
});

export default parallaxStyle;