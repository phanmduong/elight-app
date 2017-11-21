import React, {Component} from 'react';
import {Image, Platform, StatusBar, Text, View, TouchableOpacity, Alert, Modal, PanResponder, FlatList, ActivityIndicator} from 'react-native';
import part from '../../styles/partStyle';
import * as color from '../../styles/color';
import * as size from '../../styles/size';
import BackButton from '../../commons/BackButton';
import * as detailBookAction from '../detailBook/detailBookAction';
import * as bookAction from '../buyBook/buyBookAction';
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
    Thumbnail,
    Form,
    Picker
} from 'native-base';
import Icon from '../../commons/Icon';

class DetailBookContainer extends Component {
    constructor(props) {
        super(props);
        const {params} = this.props.navigation.state;
        this.state = {
            modalCart: false,
            modalInfoCart: false,
            modalBuySuccess: false,
            numberBooks: params.numberBooks ,
            priceBooks: params.priceBooks,
            priceItemBook: params.priceItemBook,
            productInStore : params.productInStore,
            products: '',
            books: params.books,
            name: '',
            email: '',
            phone: '',
            address: '',
            payment: '1',
            priceTotal: params.priceTotal,
        }
    }
    componentWillMount() {
        this.props.detailBookAction.detailBook(this.props.navigation.state.params.id);
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (event, gestureState) => true,
            onPanResponderGrant: this._onPanResponderGrant.bind(this),
        })
    }
    componentWillReceiveProps(nextProps){
        if (nextProps.status === 1) {
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

    buyBookStep1(index) {
        this.setModalCart(true);
        this.setModalInfoCard(false);
        this.setModalBuySuccess(false);
        let productsInStore = this.state.productInStore;
        let priceBooks = this.state.priceBooks;
        let books = this.state.books;
        let numberBooks = this.state.numberBooks;
        let priceTotal = 0;
        let products = [];
        if(productsInStore.length > 0){
            products = productsInStore.filter((item) => {return item.key == index})
        }
        if( products.length == 0 || productsInStore.length == 0) {
            productsInStore.push(books[index]);
        }
        let i = 0;
        while (i < numberBooks.length){
            priceTotal += priceBooks[i] * numberBooks[i] * 0.8;
            i++;
        }
        this.setState({productInStore: productsInStore, priceTotal : priceTotal, numberBooks : numberBooks});
    }

    buyBookStep2() {
        this.setModalCart(false);
        this.setModalInfoCard(true);
        this.setModalBuySuccess(false);
        let arr = [];
        for (let i = 0; i < this.state.books.length; i++) {
            if (this.state.numberBooks[i] !== 0) {
                let arr1 = {"id": this.state.books[i].id.toString(), "number": this.state.numberBooks[i].toString()};
                arr.push(arr1);
            }
        }
        let products = JSON.stringify(arr);
        this.setState({products: products});
    }

    buyBookStep3() {
        let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (reg.test(this.state.email) == false) {
            Alert.alert("Email không hợp lệ ")
        }
        else if (this.state.email == '' || this.state.phone == '' || this.state.address == '' || this.state.payment == '' || this.state.name == '') {
            Alert.alert("Bạn cần nhập đầy đủ thông tin để chúng tôi có thể giao hàng chính xác nhất");
        }
        else if (this.state.products == "[]") {
            Alert.alert("Bạn chưa đặt sản phẩm nào")
        }
        else {
            this.props.bookAction.orderBook(this.state);
        }
    }

    plusBooks(index) {
        let numberBooks = this.state.numberBooks;
        let priceBooks = this.state.priceBooks;
        let priceItemBook = this.state.priceItemBook;
        let priceTotal = 0;
        numberBooks[index]++;
        priceItemBook[index] = priceBooks[index] * numberBooks[index] * 0.8;
        for (let i = 0; i < numberBooks.length; i++) {
            priceTotal += priceBooks[i] * numberBooks[i] * 0.8;
        }
        this.setState({numberBooks: numberBooks, priceTotal: priceTotal, priceItemBook: priceItemBook})
    }

    minusBooks(index) {
        let numberBooks = this.state.numberBooks;
        let priceBooks = this.state.priceBooks;
        let priceItemBook = this.state.priceItemBook;
        let priceTotal = 0;
        if (numberBooks[index] > 0) {
            numberBooks[index]--;
            priceItemBook[index] = priceBooks[index] * numberBooks[index] * 0.8;
        }
        for (let i = 0; i < numberBooks.length; i++) {
            priceTotal += priceBooks[i] * numberBooks[i] * 0.8;
        }
        this.setState({numberBooks: numberBooks, priceTotal: priceTotal, priceItemBook: priceItemBook});
    }

    buyBookDone() {
        this.setModalCart(false);
        this.setModalInfoCard(false);
        this.setModalBuySuccess(false);
        this.props.bookAction.orderBookDone();
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
        const {isLoadingBook, detailBook} = this.props;
        const {numberBooks, priceBooks, priceItemBook, priceTotal} = this.state
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
                             this.buyBookStep1(this.props.navigation.state.params.key)
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
                                    data={this.state.productInStore}
                                    extraData={this.state}
                                    renderItem={({item}) =>
                                        <TouchableOpacity
                                            activeOpacity={1}
                                            style={[{marginTop: 10}]}>
                                            <View
                                                style={[part.wrapperItemBookModal, part.haveBorderBottom]}>
                                                <View style={part.wrapperImageInCard}>
                                                    <Image
                                                        resizeMode={'cover'}
                                                        style={part.imageInCard}
                                                        source={{uri: item.avatar}}
                                                    />
                                                </View>
                                                <View style={part.wrapperTextInItemBookModal}>
                                                    <Text style={part.textTitlePost}>{item.name}</Text>
                                                    <Text
                                                        style={part.textDescription}>{item.short_description}</Text>

                                                    <View style={{
                                                        flexDirection: 'row',
                                                        alignItems: 'center'
                                                    }}>
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
                                                        <Text
                                                            style={[part.textPrice2, part.marginRight]}>{numberBooks[item.key]}
                                                            cuốn</Text>
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
                                                    <View style={{padding: 5}}>
                                                        <Text
                                                            style={part.textPrice2}>{priceItemBook[item.key]}đ</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    }/>
                            </View>
                            <View style={[part.bottomModal, part.haveBorderTop, {
                                height: 30,
                                flexDirection: 'row'
                            }]}>
                                <Left>
                                    <Text style={[part.textPrice2, {marginLeft: 10}]}>Tổng</Text>
                                </Left>
                                <Right>
                                    <Text
                                        style={[part.textPrice2, {marginRight: 10}]}>{this.state.priceTotal}đ</Text>
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
                                        <Text style={[part.textBookName, {fontSize: size.titleSmall}]}>HỌ VÀ
                                            TÊN</Text>
                                    </View>
                                    <Item regular style={part.wrapperInputInfoUser}>
                                        <Input
                                            autoCorrect={false}
                                            placeholderTextColor={color.gray}
                                            style={part.inputInfoUser}
                                            placeholder='Họ và tên'
                                            onChangeText={(name) => {
                                                this.setState({name})
                                            }}
                                        />
                                    </Item>
                                    <View style={part.wrapperTextInputInfoUser}>
                                        <Text style={[part.textBookName, {fontSize: size.titleSmall}]}>SỐ
                                            ĐIỆN
                                            THOẠI</Text>
                                    </View>
                                    <Item regular style={part.wrapperInputInfoUser}>
                                        <Input
                                            autoCorrect={false}
                                            placeholderTextColor={color.gray}
                                            style={part.inputInfoUser}
                                            placeholder='Số điện thoại'
                                            onChangeText={(phone) => {
                                                this.setState({phone})
                                            }}
                                        />
                                    </Item>
                                    <View style={part.wrapperTextInputInfoUser}>
                                        <Text
                                            style={[part.textBookName, {fontSize: size.titleSmall}]}>EMAIL</Text>
                                    </View>
                                    <Item regular style={part.wrapperInputInfoUser}>
                                        <Input
                                            autoCorrect={false}
                                            placeholderTextColor={color.gray}
                                            style={part.inputInfoUser}
                                            placeholder='Email'
                                            onChangeText={(email) => {
                                                this.setState({email})
                                            }}
                                        />
                                    </Item>
                                    <View style={part.wrapperTextInputInfoUser}>
                                        <Text style={[part.textBookName, {fontSize: size.titleSmall}]}>ĐỊA
                                            CHỈ NHẬN
                                            SÁCH</Text>
                                    </View>
                                    <Item regular style={part.wrapperInputInfoUser}>
                                        <Input
                                            autoCorrect={false}
                                            placeholderTextColor={color.gray}
                                            style={part.inputInfoUser}
                                            placeholder='Địa chỉ nhận sách'
                                            onChangeText={(address) => {
                                                this.setState({address})
                                            }}
                                        />
                                    </Item>
                                    <View style={part.wrapperTextInputInfoUser}>
                                        <Text style={[part.textBookName, {fontSize: size.titleSmall}]}>PHƯƠNG
                                            THỨC
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
                                            ) : (
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

        )
    }
}

function mapStateToProps(state) {
    return {
        detailBook: state.detailBook.detailBook,
        isLoadingBook: state.detailBook.isLoadingBook,
        status : state.book.status,
        isLoadingOrder : state.book.isLoadingOrder
    }
}

function mapDispatchToProps(dispatch) {
    return {
        detailBookAction: bindActionCreators(detailBookAction, dispatch),
        bookAction : bindActionCreators(bookAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailBookContainer);
