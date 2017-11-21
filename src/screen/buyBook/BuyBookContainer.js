import React, {Component} from 'react';
import {
    Image, PanResponder, Modal,
    Platform,
    Text,
    TouchableOpacity,
    View, FlatList, StatusBar,Alert,ActivityIndicator
} from 'react-native';
import {
    Button,
    Form,
    Picker,
    List,
    ListItem,
    Body,
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
import BackButton from '../../commons/BackButton';
import part from '../../styles/partStyle';
import Icon from '../../commons/Icon';
import * as color from '../../styles/color';
import * as size from '../../styles/size';
import {connect} from 'react-redux';
import * as bookAction from './buyBookAction';
import {bindActionCreators} from 'redux';

class BuyBookContainer extends Component {
    constructor() {
        super();
        this.state = {
            modalCart: false,
            modalInfoCart: false,
            modalBuySuccess: false,
            numberBooks: [],
            priceBooks: [],
            products: '',
            books: [],
            name : '',
            email : '',
            phone : '',
            address : '',
            payment: '1',
            priceTotal : 0,
        };
    }

    componentWillMount() {
        this.props.bookAction.getBook();
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (event, gestureState) => true,
            onPanResponderGrant: this._onPanResponderGrant.bind(this),
        })
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.isLoading !== this.props.isLoading){
            let i = this.props.books.length;
            let numberBooks = this.state.numberBooks;
            let priceBooks = this.state.priceBooks;
            let books = this.state.books;
            let post = nextProps.books;
            while (i < nextProps.books.length){
                let key = {key : i};
                let arr = Object.assign(post[i], key);
                numberBooks.push(0);
                priceBooks.push(post[i].price);
                books.push(arr);
                i++;
            }
            this.setState({numberBooks: numberBooks, priceBooks: priceBooks, books : books});
        }
        if(nextProps.status === 1){
            this.setModalBuySuccess(true);
            this.setModalCart(false);
            this.setModalInfoCard(false);
        }
    }
    setModalCart(visible) {
        this.setState({modalCart: visible});
    }

    setModalInfoCard(visible) {
        this.setState({modalInfoCart: visible});
    }

    setModalBuySuccess(visible) {
        this.setState({modalBuySuccess: visible});
    }

    buyBookStep1() {
        this.setModalCart(true);
        this.setModalInfoCard(false);
        this.setModalBuySuccess(false);
    }

    buyBookStep2() {
        this.setModalCart(false);
        this.setModalInfoCard(true);
        this.setModalBuySuccess(false);
        let arr = [];
        for (let i = 0; i<this.state.books.length; i++){
            if(this.state.numberBooks[i]!==0){
                let arr1 = {"id" : this.state.books[i].id.toString(), "number" : this.state.numberBooks[i].toString()};
                arr.push(arr1);
            }
        }
        let products = JSON.stringify(arr);
        this.setState({products: products});
    }
    buyBookStep3() {
        let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if(reg.test(this.state.email) == false){Alert.alert("Email không hợp lệ ")}
        else if(this.state.email == '' || this.state.phone == '' || this.state.address == ''|| this.state.payment == '' || this.state.name == '' ){
            Alert.alert("Bạn cần nhập đầy đủ thông tin để chúng tôi có thể giao hàng chính xác nhất");
        }
        else if(this.state.products == "[]"){Alert.alert("Bạn chưa đặt sản phẩm nào")}
        else {
            this.props.bookAction.orderBook(this.state);
        }
    }
    plusBooks (index){
        let numberBooks = this.state.numberBooks;
        let priceBooks = this.state.priceBooks;
        let priceTotal = 0;
        numberBooks[index]++;
        for (let i = 0; i < numberBooks.length; i++){
            priceTotal += priceBooks[i] * numberBooks[i] * 0.8;
        }
        this.setState({numberBooks : numberBooks, priceTotal: priceTotal})
    }
    minusBooks(index){
        let numberBooks = this.state.numberBooks;
        let priceBooks = this.state.priceBooks;
        let priceTotal = 0;
        if(numberBooks[index] > 0) {
            numberBooks[index]--;
        }
        for (let i = 0; i < numberBooks.length; i++){
            priceTotal += priceBooks[i] * numberBooks[i] * 0.8;
        }
        this.setState({numberBooks : numberBooks, priceTotal: priceTotal})
    }
    buyBookDone() {
        this.setModalCart(false);
        this.setModalInfoCard(false);
        this.setModalBuySuccess(false);
    }

    _onPanResponderGrant(event, gestureState) {
        if (event.nativeEvent.locationX === event.nativeEvent.pageX) {
            this.setState({
                modalCart: false,
                modalInfoCart: false,
                modalBuySuccess: false,
            });
        }
    }

    onValueChange(value: string) {
        this.setState({
            payment: value
        });
    }

    render() {
        const {navigate} = this.props.navigation;
        const {goBack} = this.props.navigation;
        const {isLoading, books} = this.props;
        const {priceBooks, numberBooks} = this.state;
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
                                MUA SÁCH
                            </Text>
                        </Item>
                    </View>
                    {
                        isLoading
                            ?
                            <View style={[part.wrapperContainer]}>
                                <Spinner color={color.gray}/>
                            </View>
                            :
                            <View>
                                <FlatList
                                    showsVerticalScrollIndicator={false}
                                    data={books}
                                    renderItem={({item}) =>
                                        <View style={{marginTop: 50}}>
                                            <View style={[part.wrapperItemBook, part.haveBorderBottom]}>
                                                <View style={part.wrapperTextInItemBook}>
                                                    <Text style={part.textTitlePost}>{item.name}</Text>
                                                    <Text style={part.textDescription}>{item.short_description}</Text>
                                                    <Text style={[part.textNormalDark, part.paddingLine8]}>Vui lòng hoàn
                                                        thành các thông tin bên dưới chúng tôi sẽ sớm liên hệ lai với
                                                        bạn.</Text>
                                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                                        <Text
                                                            style={[part.textPrice, part.marginRight]}>{item.price}đ</Text>
                                                        <Text
                                                            style={[part.textPrice2, part.marginRight]}>{item.price * 0.8}đ</Text>
                                                        <Text style={part.textCategoryInBook}
                                                              numberOfLines={1}>-20%</Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={part.wrapperImageInItemBook}>
                                                <Image
                                                    resizeMode={'cover'}
                                                    style={part.imageInItemBook}
                                                    source={{uri: item.avatar}}
                                                />
                                            </View>
                                            <View style={part.wrapperBuyBook}>
                                                <TouchableOpacity
                                                    onPress={() => navigate('DetailBook', {id: item.id})}
                                                >
                                                    <Text style={part.textBigBlue}>Xem thêm</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    style={part.buttonBuyNow}
                                                    onPress={() => {
                                                        this.buyBookStep1()
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
                                        </View>
                                    }/>
                            </View>
                    }
                </Content>
                <Modal
                    presentationStyle="overFullScreen"
                    animationType="fade"
                    transparent={true}
                    visible={this.state.modalCart}
                >
                    <View
                        style={part.wrapperModal}
                        {...this.panResponder.panHandlers}
                    >
                        <View style={part.modalCart}>
                            <View style={[part.topModal, part.haveBorderBottom]}>
                                <Text style={part.titleBigDarkBold}>
                                    GIỎ HÀNG
                                </Text>
                            </View>
                            <View style={part.contentModal}>
                                <FlatList
                                    showsVerticalScrollIndicator={false}
                                    data={this.state.books}
                                    extraData = {this.state}
                                    renderItem={({item}) =>
                                        <TouchableOpacity
                                            activeOpacity={1}
                                            style={[{marginTop: 10}]}>
                                            <View style={[part.wrapperItemBookModal, part.haveBorderBottom]}>
                                                <View style={part.wrapperImageInCard}>
                                                    <Image
                                                        resizeMode={'cover'}
                                                        style={part.imageInCard}
                                                        source={{uri: item.avatar}}
                                                    />
                                                </View>
                                                <View style={part.wrapperTextInItemBookModal}>
                                                    <Text style={part.textTitlePost}>{item.name}</Text>
                                                    <Text style={part.textDescription}>{item.short_description}</Text>

                                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                                        <Text
                                                            style={[part.textPrice, part.marginRight]}>{item.price}</Text>
                                                        <Text
                                                            style={[part.textPrice2, part.marginRight]}>{item.price * 0.8}đ</Text>
                                                        <Text style={part.textCategoryInBook}
                                                              numberOfLines={1}>-20%</Text>
                                                    </View>
                                                    <View style={{
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                        padding: 5,
                                                    }}>
                                                        <Text style={[part.textPrice2, part.marginRight]}>{numberBooks[item.key]} cuốn</Text>
                                                        <Icon name="fontawesome|plus-circle"
                                                              size={size.iconBig}
                                                              color={color.titleBlue}
                                                              onPress={() => {
                                                                  this.plusBooks(item.key)
                                                              }}
                                                        />
                                                        <Icon name="fontawesome|minus-circle"
                                                              size={size.iconBig}
                                                              color={color.titleBlue}
                                                              style={{marginLeft: 5}}
                                                              onPress={() => {
                                                                  this.minusBooks(item.key)
                                                              }}
                                                        />
                                                    </View>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    }/>
                            </View>
                            <View style={[part.bottomModal, part.haveBorderTop, {height : 30, flexDirection : 'row'}]}>
                                    <Left>
                                        <Text style = {[part.textPrice2, {marginLeft : 10}]}>Tổng</Text>
                                    </Left>
                                    <Right>
                                        <Text style = {part.textPrice2, {marginRight : 10}}>{this.state.priceTotal}đ</Text>
                                    </Right>
                            </View>
                            <View style={[part.bottomModal, part.haveBorderTop]}>
                                <Left style={{flexDirection: 'row'}}>
                                    <Left/>
                                    <Body>
                                    <TouchableOpacity
                                        onPress={() => this.buyBookDone()}
                                    >
                                        <Text style={part.textBigBlue}>Mua tiếp</Text>
                                    </TouchableOpacity>
                                    </Body>
                                    <Right>
                                        <TouchableOpacity
                                            style={part.buttonOrderInModal}
                                            onPress={() => this.buyBookStep2()}
                                        >
                                            <Text style={part.textBigLight}>Đặt hàng</Text>
                                        </TouchableOpacity>
                                    </Right>
                                </Left>
                            </View>
                        </View>
                    </View>
                </Modal>
                <Modal
                    presentationStyle="overFullScreen"
                    animationType="fade"
                    transparent={true}
                    visible={this.state.modalInfoCart}
                >
                    <View
                        style={part.wrapperModal}
                        {...this.panResponder.panHandlers}
                    >
                        <View style={part.modalCart}>
                            <View style={[part.topModal, part.haveBorderBottom]}>
                                <Text style={part.titleBigDarkBold}>
                                    THÔNG TIN ĐẶT HÀNG
                                </Text>
                            </View>
                            <Content style={part.contentModal}>
                                <View style={part.wrapperForm}>
                                    <View style={part.wrapperTextInputInfoUser}>
                                        <Text style={[part.textBookName, {fontSize: size.titleSmall}]}>HỌ VÀ TÊN</Text>
                                    </View>
                                    <Item regular style={part.wrapperInputInfoUser}>
                                        <Input
                                            autoCorrect={false}
                                            placeholderTextColor={color.gray}
                                            style={part.inputInfoUser}
                                            placeholder='Họ và tên'
                                            onChangeText = {(name) => {this.setState({name})}}
                                        />
                                    </Item>
                                    <View style={part.wrapperTextInputInfoUser}>
                                        <Text style={[part.textBookName, {fontSize: size.titleSmall}]}>SỐ ĐIỆN
                                            THOẠI</Text>
                                    </View>
                                    <Item regular style={part.wrapperInputInfoUser}>
                                        <Input
                                            autoCorrect={false}
                                            placeholderTextColor={color.gray}
                                            style={part.inputInfoUser}
                                            placeholder='Số điện thoại'
                                            onChangeText = {(phone) => {this.setState({phone})}}
                                        />
                                    </Item>
                                    <View style={part.wrapperTextInputInfoUser}>
                                        <Text style={[part.textBookName, {fontSize: size.titleSmall}]}>EMAIL</Text>
                                    </View>
                                    <Item regular style={part.wrapperInputInfoUser}>
                                        <Input
                                            autoCorrect={false}
                                            placeholderTextColor={color.gray}
                                            style={part.inputInfoUser}
                                            placeholder='Email'
                                            onChangeText = {(email) => {this.setState({email})}}
                                        />
                                    </Item>
                                    <View style={part.wrapperTextInputInfoUser}>
                                        <Text style={[part.textBookName, {fontSize: size.titleSmall}]}>ĐỊA CHỈ NHẬN
                                            SÁCH</Text>
                                    </View>
                                    <Item regular style={part.wrapperInputInfoUser}>
                                        <Input
                                            autoCorrect={false}
                                            placeholderTextColor={color.gray}
                                            style={part.inputInfoUser}
                                            placeholder='Địa chỉ nhận sách'
                                            onChangeText = {(address) => {this.setState({address})}}
                                        />
                                    </Item>
                                    <View style={part.wrapperTextInputInfoUser}>
                                        <Text style={[part.textBookName, {fontSize: size.titleSmall}]}>PHƯƠNG THỨC
                                            THANH TOÁN</Text>
                                    </View>
                                    <View style={part.wrapperTextInputInfoUser}>
                                        <Item regular style={part.wrapperInputInfoUser}>
                                            <Form>
                                                <Picker
                                                    iosHeader={"Chọn phương thức thanh toán"}
                                                    itemStyle={[part.noBorder, part.noMarginLeft, {paddingLeft: 20}]}
                                                    itemTextStyle={part.titleSmallDark}
                                                    style={{width: size.wid * .7}}
                                                    textStyle={part.titleSmallDark}
                                                    headerStyle={part.titleSmallDark}
                                                    selectedValue={this.state.payment}
                                                    onValueChange={this.onValueChange.bind(this)}
                                                    mode={'dropdown'}
                                                >
                                                    <Item label="Chuyển khoản ngân hàng" value="0"/>
                                                    <Item label="Thanh toán trực tiếp" value="1"/>
                                                </Picker>
                                            </Form>
                                        </Item>
                                    </View>
                                </View>
                            </Content>
                            <View style={[part.bottomModal, part.haveBorderTop]}>
                                <Left style={{flexDirection: 'row'}}>
                                    <Left/>
                                    <Body>
                                    <TouchableOpacity
                                     onPress={() => this.buyBookDone()}
                                    >
                                        <Text style={part.textBigBlue}>Mua tiếp</Text>
                                    </TouchableOpacity>
                                    </Body>
                                    <Right>
                                        <TouchableOpacity
                                            style={part.buttonOrderInModal}
                                            onPress={() => this.buyBookStep3()}
                                        >
                                            {(this.props.isLoadingOrder) ? (
                                                    <ActivityIndicator
                                                        animated={true}
                                                        color={color.navTitle}
                                                        style={{
                                                            flex: 1,
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                            height: 20,
                                                        }}
                                                        size='small'
                                                    />
                                                ):(
                                            <Text style={part.textBigLight}>Đặt hàng</Text>
                                                )}
                                        </TouchableOpacity>
                                    </Right>
                                </Left>
                            </View>
                        </View>
                    </View>
                </Modal>
                <Modal
                    presentationStyle="overFullScreen"
                    animationType="fade"
                    transparent={true}
                    visible={this.state.modalBuySuccess}
                >
                    <View
                        style={part.wrapperModal}
                        {...this.panResponder.panHandlers}
                    >
                        <View style={part.modalCartStatus}>
                            <View style={[part.topModal, part.haveBorderBottom]}>
                                <Text style={part.titleBigDarkBold}>
                                    ĐẶT HÀNG THÀNH CÔNG
                                </Text>
                            </View>
                            <View style={part.contentModal}>
                                <View style={part.wrapperForm}>
                                    <Icon
                                        name="material|done"
                                        color={color.green}
                                        size={80}
                                    />
                                    <View style={part.wrapperTextInputInfoUser}>
                                        <Text style={part.textPrice2}>
                                            Chúc mừng bạn đã đặt hàng thành công.
                                            Vui lòng check email để kiểm tra lại dơn hàng.
                                            Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất
                                        </Text>
                                    </View>
                                </View>

                            </View>
                            <View style={[part.bottomModal, part.haveBorderTop]}>
                                <Body>
                                <TouchableOpacity style={part.buttonOrderInModal}
                                                  onPress={() => this.buyBookDone()}
                                >
                                    <Text style={part.textBigLight}>Xác nhận</Text>
                                </TouchableOpacity>
                                </Body>
                            </View>
                        </View>
                    </View>
                </Modal>
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return {
        isLoading: state.book.isLoading,
        books: state.book.books,
        isLoadingOrder : state.book.isLoadingOrder,
        status : state.book.status
    }
}

function mapDispatchToProps(dispatch) {
    return {
        bookAction: bindActionCreators(bookAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BuyBookContainer);