

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    ScrollView,
    StatusBar,
    Text,
    Alert,
    View,
    TouchableNativeFeedback,
    TouchableHighlight,
    TouchableOpacity,
    Image,
    NavigatorIOS,
    WebView,
    Platform
} from 'react-native';

import {
    isFirstTime,
    isRolledBack,
    packageVersion,
    currentVersion,
    checkUpdate,
    downloadUpdate,
    switchVersion,
    switchVersionLater,
    markSuccess,
} from 'react-native-update';

import Toast from 'react-native-root-toast';
//热更新
import _updateConfig from './update.json';
const {appKey} = _updateConfig[Platform.OS];

let topEven=null,webEven=null;

export default class App extends Component {
    constructor() {
        super(...arguments);
        topEven = this;
    }
    _handleNextPress() {
        this.refs.nav.push({
            component: TestDemo2,
            title: '发 现',
            barTintColor:'#fff',
            titleTextColor:"#0d80fb",
            tintColor:"#0d80fb",
            leftButtonTitle:'返回',
            onLeftButtonPress: () => webEven.goBack(),
            rightButtonSystemIcon:'refresh',
            onRightButtonPress: () => webEven.reload(),
        });
    }
    componentWillMount(){
        if (isFirstTime) {
            Alert.alert('提示', '这是当前版本第一次启动,是否要模拟启动失败?失败将回滚到上一版本', [
                {text: '是', onPress: ()=>{throw new Error('模拟启动失败,请重启应用')}},
                {text: '否', onPress: ()=>{markSuccess()}},
            ]);
        } else if (isRolledBack) {
            Alert.alert('提示', '刚刚更新失败了,版本被回滚.');
        }
    }
    render() {
        return (
            <NavigatorIOS
                ref='nav'
                initialRoute={{
                    component: TestDemo,
                    title: '',
                    rightButtonTitle:'FAQ',
                    onRightButtonPress: () => this._handleNextPress(),
                }}
                style={{flex: 1}}
                tintColor="#fff"
                titleTextColor="#000"
                barTintColor="#0d80fb"
                shadowHidden={true}
                translucent={true}
                navigationBarHidden={false}
                interactivePopGestureEnabled = {true}
            />
        )
    }
}

doUpdate = info => {
    downloadUpdate(info).then(hash => {
        Alert.alert('提示', '下载完毕,是否重启应用?', [
            {text: '是', onPress: ()=>{switchVersion(hash);}},
            {text: '否',},
            {text: '下次启动时', onPress: ()=>{switchVersionLater(hash);}},
        ]);
    }).catch(err => {
        Alert.alert('提示', '更新失败.');
    });
};
doCheckUpdate = () => {
    checkUpdate(appKey).then(info => {
        if (info.expired) {
            Alert.alert('提示', '您的应用版本已更新,请前往应用商店下载新的版本', [
                {text: '确定', onPress: ()=>{info.downloadUrl && Linking.openURL(info.downloadUrl)}},
            ]);
        } else if (info.upToDate) {
            Alert.alert('提示', '您的应用版本已是最新.');
        } else {
            Alert.alert('提示', '检查到新的版本'+info.name+',是否下载?\n'+ info.description, [
                {text: '是', onPress: ()=>{this.doUpdate(info)}},
                {text: '否',},
            ]);
        }
    }).catch(err => {
        Alert.alert('提示', '更新失败.');
    });
};

const onPressLearnMore = () => {
    Alert.alert(
        'Alert Title',
        'Alert Msg',
        [
            {text: 'Button1', onPress: () => console.log('Button1 Click')},
            {text: 'Toast Test', onPress: () => show('Toast Test')},
            {text: 'Check Updates', onPress: () => doCheckUpdate()},
            {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        ],
        { cancelable: false }
    );
};

const show = (message='nothing') => {
    this.toast && this.toast.destroy();
    this.toast = Toast.show(message, {
        shadow: false,
        animation:true,
        duration:Toast.durations.SHORT,
        hideOnPress: true,
        delay: 0,
        position:0,
        backgroundColor: '#000' ,
        shadowColor: '#000' ,
        textColor: '#fff' ,
        onHidden: () => {
            this.toast.destroy();
            this.toast = null;
        }
    });
};

class TestDemo extends Component {
    constructor() {
        super(...arguments);
    }
    render() {
        return (
        <View>
            <StatusBar
                barStyle="light-content"
            />
            <ScrollView showsVerticalScrollIndicator={false} >
                <View style={styles.container}>
                    <View style={styles.uMain}>
                        <Image source={require('./img/img-m.png')} style={{width: 422, height: 450}}/>
                    </View>

                    <TouchableOpacity style={styles.uDown} onPress={onPressLearnMore} activeOpacity={0.8}>
                            <Text style={{color:'#fff',lineHeight:36,fontSize:18,fontWeight:'700'}}>立刻下载</Text>
                    </TouchableOpacity>
                    <View style={styles.uTlt}>
                        <Text style={styles.uiTlt}>核心功能</Text>
                    </View>
                    <View style={styles.uFuc}>
                        <Image source={require('./img/nav1.png')} style={styles.iFucLogo}/>
                        <Text style={styles.iFucTlt}>安全检测</Text>
                        <Text style={styles.iFucInf}>帐号全方位检查  安全等级一目了然</Text>
                    </View>
                    <View style={styles.uFuc}>
                        <Image source={require('./img/nav2.png')} style={styles.iFucLogo}/>
                        <Text style={styles.iFucTlt}>登录保护</Text>
                        <Text style={styles.iFucInf}>网易产品一键保护  有效阻止恶意登录</Text>
                    </View>
                    <View style={styles.uFuc}>
                        <Image source={require('./img/nav3.png')} style={styles.iFucLogo}/>
                        <Text style={styles.iFucTlt}>帐号足迹</Text>
                        <Text style={styles.iFucInf}>登录记录随时查询  帐号异常提早发现</Text>
                    </View>
                    <View style={styles.uFuc}>
                        <Image source={require('./img/nav4.png')} style={styles.iFucLogo}/>
                        <Text style={styles.iFucTlt}>一键锁号</Text>
                        <Text style={styles.iFucInf}>发现风险一键解决  大权在握收放自如</Text>
                    </View>
                    <View style={styles.uFuc}>
                        <Image source={require('./img/nav5.png')} style={styles.iFucLogo}/>
                        <Text style={styles.iFucTlt}>快速改密</Text>
                        <Text style={styles.iFucInf}>最快捷的改密途径  密码问题轻松解决</Text>
                    </View>
                    <View style={styles.uFuc}>
                        <Image source={require('./img/nav6.png')} style={styles.iFucLogo}/>
                        <Text style={styles.iFucTlt}>扫码登录</Text>
                        <Text style={styles.iFucInf}>告别键盘手输密码  杜绝病毒恶意窃取</Text>
                    </View>
                    <Text style={styles.cpy}>网易公司版权所有  © 1997-2017</Text>
                    <Text style={styles.version}>
                        版本号: {packageVersion}{' | '}
                        Hash: {currentVersion||'(空)'}
                    </Text>
                </View>
            </ScrollView>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {flex: 1, alignItems:'center', backgroundColor: '#fff',},
    uMain: {flex:1,},
    uDown:{flex:1, alignItems:'center', borderRadius:4, marginTop:20, marginBottom:20, width:300, height:40, backgroundColor:'#00c989',},
    uTlt: {flex:1, alignItems:'center', height:20, marginBottom:20, width:300, borderStyle:'solid', borderBottomWidth:2, borderColor:'#999'},
    uiTlt:{marginTop:10, backgroundColor:'#fff', width:100, textAlign:'center', color:'#666'},
    uFuc:{width:300, height:60, padding:5, position:'relative', marginBottom:30,},
    iFucLogo:{height:50, width:50,},
    iFucTlt:{position:'absolute', left:70, top:10, fontSize:18, fontWeight:'bold', color:'#161616'},
    iFucInf:{position:'absolute', left:70, top:34, color:'#666'},
    cpy:{color:'#666',marginBottom:30},
    version:{color:'#999',marginBottom:10},
    demo2c:{flex:1},
    webView:{marginTop:46}
});

var WEBVIEW_REF = 'webview';
class TestDemo2 extends Component {
    constructor() {
        super(...arguments);
        webEven = this;
    }
    state = {
        status: 'No Page Loaded',
        backButtonEnabled: false,
        forwardButtonEnabled: false,
        loading: true,
        scalesPageToFit: true,
    };

    render() {
        return (
        <View style={styles.demo2c}>
            <StatusBar
                barStyle="dark-content"
            />
            <Text>sdfa</Text>
            <WebView
                ref={WEBVIEW_REF}
                automaticallyAdjustContentInsets={false}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                decelerationRate="normal"
                style={styles.webView}
                source={{uri: 'https://gj.reg.163.com/faq/'}}
                onNavigationStateChange={this.onNavigationStateChange}
                onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
                startInLoadingState={true}
                scalesPageToFit={this.state.scalesPageToFit}
            />
        </View>
        );
    }

    goBack = () => {
        if(!this.state.backButtonEnabled){
            topEven.refs.nav.pop();
        }
        this.refs[WEBVIEW_REF].goBack();
    };

    goForward = () => {
        this.refs[WEBVIEW_REF].goForward();
    };

    reload = () => {
        this.refs[WEBVIEW_REF].reload();
    };

    getUrlSearch = (name,url="") => {
        var reg = new RegExp("(^|\\S*[&|?])" + name + "=([^&]*)(&|$)", "i");
        var r = url.match(reg);
        if (r != null) {
            try {
                return decodeURIComponent(r[2]);
            } catch (_e) {
                return null;
            }
        }
        return null;
    };
    onShouldStartLoadWithRequest = (event) => {
        var url = event.url;
        if( /\/native_callback/.test(url)){
            var module = this.getUrlSearch('module',url),
                args = this.getUrlSearch('args',url),
                action = this.getUrlSearch('action',url);
            if(module === 'toast' && !!args){
                show(args);
            }
            if(action === 'close'){
                this.goBack();
            }
            return false;
        }
        return true;
    };

    onNavigationStateChange = (navState) => {
        this.setState({
            backButtonEnabled: navState.canGoBack,
            forwardButtonEnabled: navState.canGoForward,
            url: navState.url,
            status: navState.title,
            loading: navState.loading,
            scalesPageToFit: true
        });
    };

}
AppRegistry.registerComponent('TestDemo', () => App);