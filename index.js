import React, {Component} from 'react'
import {AppRegistry, Modal, PanResponder, StyleSheet, Text, View, Dimensions} from 'react-native';
import App from './src/App';
import CodePush from 'react-native-code-push';
import * as color from './src/styles/color';
import * as Progress from 'react-native-progress';

export default class Elight extends Component {
    constructor() {
        super()
        this.state = {
            isDownLoading: false,
            isInstalled: false,
            downloadUpdate: 0,
            modalUpdate: false,
        }
    }

    componentWillMount() {
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (event, gestureState) => true,
            onPanResponderGrant: this._onPanResponderGrant.bind(this),
        })
    }

    componentDidMount() {
        CodePush.sync({
                updateDialog: true,
                installMode: CodePush.InstallMode.IMMEDIATE
            },
            (status) => {
                switch (status) {
                    case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
                        this.setState({isDownLoading: true, isInstalled: false, modalUpdate: true});
                        break;
                    case CodePush.SyncStatus.INSTALLING_UPDATE :
                        this.setState({isDownLoading: false, isInstalled: true, modalUpdate: true});
                        break;
                    case CodePush.SyncStatus.UPDATE_INSTALLED :
                        this.setState({isDownLoading: true, isInstalled: true, modalUpdate: false});
                    default :
                        break;
                }
            },


            /* ham tinh muc do download */
            ({receivedBytes, totalBytes}) => {
                this.setState({downloadUpdate: (receivedBytes / totalBytes) * 100});
            }
        );
    }

    checkUpdate() {
        if (this.state.isDownLoading && this.state.isInstalled == false) {
            return "Đang tải..." + parseInt((this.state.downloadUpdate)) + "%";
        }
        if (this.state.isDownLoading == false && this.state.isInstalled) {
            return "Đang cài đặt..." ;
        }
        if (this.state.isDownLoading && this.state.isInstalled) {
            return "Cập nhật thành công "
        }
    }

    _onPanResponderGrant(event, gestureState) {
        if (event.nativeEvent.locationX === event.nativeEvent.pageX) {
            this.setState({
                modalUpdate: false,
            });
        }
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <App/>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.modalUpdate}
                    position={'center'}
                >
                    <View style={styles.wrapperModalUpdate}
                          {...this.panResponder.panHandlers}>
                        <View style={styles.modalUpdate}>
                            <Progress.Bar
                                progress={this.state.downloadUpdate}
                                color={color.text}
                                animationType={"spring"}
                                width= {150}
                                height={6}

                            />
                            <Text style={{fontSize: 20, marginTop: 20}}>{this.checkUpdate()}</Text>
                        </View>
                    </View>
                </Modal>
            </View>

        )
    }
}
let styles = StyleSheet.create({
    wrapperModalUpdate : {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalUpdate : {
        borderRadius: 10,
        width: 200,
        height: 200,
        backgroundColor: color.backGround,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
console.disableYellowBox = true;
let codePushOptions = {checkFrequency: CodePush.CheckFrequency.MANUAL};
Elight = CodePush(codePushOptions)(Elight);
AppRegistry.registerComponent('elight', () => Elight);
