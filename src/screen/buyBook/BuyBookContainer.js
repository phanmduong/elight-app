import React, {Component} from 'react';
import {
    ActivityIndicator,
    Alert,
    FlatList,
    Image,
    Modal,
    PanResponder,
    Platform,
    Text,
    TouchableOpacity,
    View, StatusBar
} from 'react-native';
import {
    Body,
    Button,
    Card,
    CardItem,
    Container,
    Content,
    Form,
    Input,
    Item,
    Left,
    List,
    ListItem,
    Picker,
    Right,
    Spinner,
    Thumbnail
} from 'native-base';
import BackButton from '../../commons/BackButton';
import part from '../../styles/partStyle';
import parallaxStyle from '../../styles/parallaxStyle';
import Icon from '../../commons/Icon';
import * as color from '../../styles/color';
import * as size from '../../styles/size';
import {connect} from 'react-redux';
import * as bookAction from './buyBookAction';
import {bindActionCreators} from 'redux';
import ParallaxScrollView from 'react-native-parallax-scroll-view';

class BuyBookContainer extends Component {
    constructor() {
        super();
        this.state = {
            modalCart: false,
            modalInfoCart: false,
            modalBuySuccess: false,
            numberBooks: [],
            priceBooks: [],
            priceItemBook: [],
            products: '',
            books: [],
            name: '',
            email: '',
            phone: '',
            address: '',
            payment: '1',
            priceTotal: 0,
            productInStore: [],
        };
    }

    componentWillMount() {
        this.props.bookAction.getBook();
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (event, gestureState) => true,
            onPanResponderGrant: this._onPanResponderGrant.bind(this),
        })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isLoading !== this.props.isLoading && !nextProps.isLoading && this.props.books !== nextProps.props) {
            let i = this.props.books.length;
            let numberBooks = this.state.numberBooks;
            let priceBooks = this.state.priceBooks;
            let priceItemBook = this.state.priceItemBook;
            let books = this.state.books;
            let post = nextProps.books;
            while (i < nextProps.books.length) {
                let key = {key: i};
                let arr = Object.assign(post[i], key);
                numberBooks.push(0);
                priceBooks.push(post[i].price);
                priceItemBook.push(0);
                books.push(arr);
                i++;
            }
            this.setState({
                numberBooks: numberBooks,
                priceBooks: priceBooks,
                books: books,
                priceItemBook: priceItemBook
            });
        }
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
        if (productsInStore.length > 0) {
            products = productsInStore.filter((item) => {
                return item.key == index
            })
        }
        if (products.length == 0 || productsInStore.length == 0) {
            productsInStore.push(books[index]);
        }
        let i = 0;
        while (i < numberBooks.length) {
            priceTotal += priceBooks[i] * numberBooks[i] * 0.8;
            i++;
        }
        this.setState({productInStore: productsInStore, priceTotal: priceTotal, numberBooks: numberBooks});
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
        // let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        // if (this.state.email == '' || this.state.phone == '' || this.state.address == '' || this.state.payment == '' || this.state.name == '') {
        //     Alert.alert("Vui lòng nhập đủ thông tin", "Bạn cần nhập đầy đủ thông tin để chúng tôi có thể giao hàng chính xác nhất.");
        // }
        // else if (reg.test(this.state.email) == false) {
        //     Alert.alert("Vui lòng nhập Email hợp lệ", "Email không hợp lệ ")
        // }
        // else if (this.state.products == "[]") {
        //     Alert.alert("Bạn chưa đặt sản phẩm nào")
        // }
        // else {
        //     this.props.bookAction.orderBook(this.state);
        // }
        this.setModalCart(false);
        this.setModalInfoCard(false);
        this.setModalBuySuccess(true);
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
        const {isLoading, books} = this.props;
        const {priceItemBook, numberBooks} = this.state;
        return (
            <Container ref="page" style={part.wrapperContainer}>
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
                                <Item style={[part.noBorder, {paddingLeft: 15}]}>
                                    <Text style={[part.titleLargeDarkBold]}>
                                        MUA SÁCH
                                    </Text>
                                </Item>
                            </View>
                        </View>
                    )}
                    renderStickyHeader={() => (
                        <View key="sticky-header" style={parallaxStyle.stickySection}>
                            <View style={part.iconInDrawerNav}>
                                <Left style={Platform.OS === 'ios' ? {marginTop: 20} : ''}>
                                    <Body style={{padding: 30}}>
                                    <Text style={[part.titleSmallDarkBold, {fontSize: 15}]} numberOfLines={1}>
                                        MUA SÁCH
                                    </Text>
                                    </Body>
                                </Left>
                            </View>
                        </View>
                    )}
                    renderFixedHeader={() => (
                        <View key="fixed-header" style={part.iconInDrawerNav}>
                            <Left style={Platform.OS === 'ios' ? {marginTop: 20} : ''}>
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
                            <View style={{flex: 1}}>
                                <Content>
                                    <View>
                                        <FlatList
                                            showsVerticalScrollIndicator={false}
                                            data={books}
                                            renderItem={({item}) =>
                                                <View style={{marginTop: 20}}>
                                                    <View style={[part.wrapperItemBook, part.haveBorderBottom]}>
                                                        <View style={part.wrapperTextInItemBook}>
                                                            <Text style={part.textTitlePost}>{item.name}</Text>
                                                            <Text
                                                                style={part.textDescription}>{item.short_description}</Text>
                                                            <Text
                                                                style={[part.textNormalDark, part.paddingLine8]}>
                                                                Vui lòng hoàn thành các thông tin bên dưới chúng tôi sẽ
                                                                sớm liên hệ lai với bạn.</Text>
                                                            <View style={{
                                                                flexDirection: 'row',
                                                                alignItems: 'center'
                                                            }}>
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
                                                            onPress={() => navigate('DetailBook', {
                                                                id: item.id,
                                                                priceItemBook: priceItemBook,
                                                                priceTotal: this.state.priceTotal,
                                                                numberBooks: numberBooks,
                                                                priceBooks: this.state.priceBooks,
                                                                books: this.state.books,
                                                                productInStore: this.state.productInStore,
                                                                key: item.key,
                                                            })}
                                                        >
                                                            <Text style={part.textBigBlue}>Xem thêm</Text>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity
                                                            style={part.buttonBuyNow}
                                                            onPress={() => this.buyBookStep1(item.key)}
                                                        >
                                                            <Text
                                                                style={[part.paddingRight, part.textBigLight]}>Đặt
                                                                mua
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
                                                    data={this.state.productInStore}
                                                    extraData={this.state}
                                                    renderItem={({item}) =>
                                                        <TouchableOpacity
                                                            activeOpacity={1}
                                                            style={[{marginTop: 10}]}>
                                                            <View
                                                                style={[part.wrapperItemBookModal, part.haveBorderBottom]}>
                                                                <View style={part.wrapperImageInModal}>
                                                                    <Image
                                                                        resizeMode={'cover'}
                                                                        style={part.imageInCard}
                                                                        source={{uri: item.avatar}}
                                                                    />
                                                                </View>
                                                                <View style={part.wrapperTextInItemBookModal}>
                                                                    <Text
                                                                        style={part.textTitlePost}>{item.name}</Text>
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
                                                                    <View style={[part.paddingTRB, {
                                                                        flexDirection: 'row',
                                                                        alignItems: 'center',
                                                                    }]}>
                                                                        <Text
                                                                            style={[part.textPrice2, part.marginRight]}>
                                                                            {numberBooks[item.key]} cuốn</Text>
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
                                                                    <View style={part.paddingTRB}>
                                                                        <Text
                                                                            style={part.textPrice2}>{priceItemBook[item.key]}
                                                                            đ</Text>
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
                                                    <Text
                                                        style={[part.textPrice2, {marginLeft: 10}]}>Tổng</Text>
                                                </Left>
                                                <Right>
                                                    <Text
                                                        style={[part.textPrice2, {marginRight: 10}]}>{this.state.priceTotal}
                                                        đ</Text>
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
                                                            onPress={
                                                                isLoading
                                                                    ?
                                                                    () => {
                                                                    }
                                                                    :
                                                                    () => this.buyBookStep2()
                                                            }
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
                                                        <Text
                                                            style={[part.textBookName, {fontSize: size.titleSmall}]}>HỌ
                                                            VÀ
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
                                                        <Text
                                                            style={[part.textBookName, {fontSize: size.titleSmall}]}>SỐ
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
                                                        <Text
                                                            style={[part.textBookName, {fontSize: size.titleSmall}]}>ĐỊA
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
                                                        <Text
                                                            style={[part.textBookName, {fontSize: size.titleSmall}]}>PHƯƠNG
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
                                                                    <Item label="Chuyển khoản ngân hàng"
                                                                          value="0"/>
                                                                    <Item label="Thanh toán trực tiếp"
                                                                          value="1"/>
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
                                                            {(1 == 0) ? (
                                                                <ActivityIndicator
                                                                    animated={true}
                                                                    color={color.navTitle}
                                                                    style={{
                                                                        flex: 1,
                                                                        justifyContent: 'center',
                                                                        alignItems: 'center',
                                                                        height: 15,
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
                                                            Chúng tôi sẽ liên hệ với bạn trong thời gian sớm
                                                            nhất
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
                            </View>
                    }
                </ParallaxScrollView>
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return {
        isLoading: state.book.isLoading,
        books: state.book.books,
        isLoadingOrder: state.book.isLoadingOrder,
        status: state.book.status
    }
}

function mapDispatchToProps(dispatch) {
    return {
        bookAction: bindActionCreators(bookAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BuyBookContainer);