import React, {Component} from 'react';
import {
    View, Text, TouchableOpacity, Linking, Alert
} from 'react-native';
import {
    Container,
} from 'native-base';
import part from '../../styles/partStyle';

class SlideViewComponent extends Component {

    ratingClick () {
        Linking.canOpenURL('itms-apps://itunes.apple.com/app/viewContentsUserReviews?id=1308215497').then(supported => {
            supported && Linking.openURL('itms-apps://itunes.apple.com/app/viewContentsUserReviews?id=1308215497');
        }, (err) => console.log(err));
    }
    alertRatingApp(){
        Alert.alert(
            'Đánh giá sản phẩm ?',
            'Hãy đánh giá và gửi phản hồi lại cho chúng tôi.',
            [
                {text: 'Xác nhận', onPress: () => this.ratingClick() },
                {text: 'Nhắc lại sau '},
            ],
            {cancelable: false}
        )
    }
    render() {
        const {navigate} = this.props.navigation;
        return (
            <Container style={part.wrapperContainer}>
                <View style={[part.wrapperImageInDrawer]}>
                    <Text style={part.textLogoInDrawer}>eLight</Text>
                </View>
                <View style={part.padding}>
                    <TouchableOpacity
                        style={[part.itemTabInDrawer, part.paddingLeft]}
                    >
                        <Text style={part.titleDark}>Trang Web</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[part.itemTabInDrawer, part.paddingLeft]}
                        onPress={() => navigate('Curriculum')}
                    >
                        <Text style={part.titleDark}>Giáo trình</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[part.itemTabInDrawer, part.paddingLeft]}
                        onPress={() => navigate('BuyBook')}
                    >
                        <Text style={part.titleDark}>Mua sách</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[part.itemTabInDrawer, part.paddingLeft]}
                        onPress = {() => {this.alertRatingApp()}}
                    >
                        <Text style={part.titleDark}>Đánh giá</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[part.itemTabInDrawer, part.paddingLeft]}
                        onPress={() => navigate('Rules')}
                    >
                        <Text style={part.titleDark}>Điều khoản</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[part.itemTabInDrawer, part.paddingLeft]}
                    >
                        <Text style={part.titleDark}>Đơn hàng</Text>
                    </TouchableOpacity>
                </View>
            </Container>
        );
    }
}


export default (SlideViewComponent);