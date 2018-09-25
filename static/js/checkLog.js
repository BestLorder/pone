// 微信分享功能
(function(){
    $.ajax({
        url:URL+'/Api/Wxshare/index',
        type:'POST',
        data:{
            url:window.location.href.split('#')[0]
        },
        dataType:'json',
        success:function(data){
            var share=data.data;
            console.log(data);
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: share.appId, // 必填，公众号的唯一标识
                timestamp: share.timestamp, // 必填，生成签名的时间戳
                nonceStr: share.nonceStr, // 必填，生成签名的随机串
                signature: share.signature,// 必填，签名，见附录1
                jsApiList: ['onMenuShareAppMessage','onMenuShareTimeline','onMenuShareQQ','onMenuShareQZone']// 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
        },
        error:function(res){
            console.log('分享数据错误');
        }
    });
    wx.ready(function(){
        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
//                                alert(location.href.split('#')[0]);
//                                分享给朋友
        var link=window.location.href.split('#')[0];
        wx.onMenuShareAppMessage({
            title: '全球生命纪念馆', // 分享标题
            desc: '感悟生命，延续独属于我们的温馨记忆。生命无国界，缔造全球生命纪念馆。', // 分享描述
            link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: link+'/static/images/cemetery/shareLogo.jpg', // 分享图标
            type: 'link', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
//                                分享到朋友圈
        wx.onMenuShareTimeline({
            title: '全球生命纪念馆', // 分享标题
            link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: link+'/static/images/cemetery/shareLogo.jpg', // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
//                                分享到QQ
        wx.onMenuShareQQ({
            title: '全球生命纪念馆', // 分享标题
            desc: '感悟生命，延续独属于我们的温馨记忆。生命无国界，缔造全球生命纪念馆。', // 分享描述
            link: link, // 分享链接
            imgUrl: link+'/static/images/cemetery/shareLogo.jpg', // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
//                                分享到QQ空间
        wx.onMenuShareQZone({
            title: '全球生命纪念馆', // 分享标题
            desc: '感悟生命，延续独属于我们的温馨记忆。生命无国界，缔造全球生命纪念馆。', // 分享描述
            link: link, // 分享链接
            imgUrl: link+'/static/images/cemetery/shareLogo.jpg', // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
        wx.error(function (res) {
            console.log(res.errMsg);
        });
    });
})();
var checkLog=function (){
    if(window.localStorage.getItem("token")){
        var token=window.localStorage.getItem("token");
    }else {
        var token="";
    }
    $.ajax({
        url:URL+"/Api/Login/user_login",
        dataType:"json",
        async:true,
        data:{
            token:window.localStorage.getItem("token")
        },
        type:"POST",
        success:function(req){
            if (location.href.split("#/")[1].indexOf("personDetailsmodelone")<0&&location.href.split("#/")[1].indexOf("personDetailsmodelselect")<0){
                if(req.code==-1){
                    window.localStorage.removeItem("token");
                    mui.alert('已经在其它地方登录', '提示', function() {
                        var that=this;
                        $.ajax({
                            url:URL+"/Api/Login/logout",
                            dataType:"json",
                            async:true,
                            data:{
                                token:token
                            },
                            type:"POST",
                            success:function(req){
                                if(req.code==1){
                                    $(".mui-popup").remove();
                                    $(".mui-popup-backdrop").remove();
                                    setTimeout(function () {
                                        window.location.href="#/login";
                                    },0);
                                }
                            }
                        });
                    });
                }else if(req.code==-3){
                    window.localStorage.removeItem("token");
                    mui.alert('请重新登录', '提示', function() {
                        $(".mui-popup").remove();
                        setTimeout(function () {
                            window.location.href="#/login";
                            $(".mui-popup-backdrop").remove();
                        },0);
                    });
                }else if(req.code==1&&location.href.split("#/")[1]=="login"){
                    window.location.href="#/homePage";
                }else if(req.code==1&&location.href.split("#/")[1]=="register"){
                    window.location.href="#/homePage";
                }else if (req.code==-2&&$('.mui-popup').length==0) {
                    $(".mui-popup-backdrop").removeClass("mui-active");
                }
            }
        }
    });
    function setCookie(c_name,value,expiredays) {
        var exdate=new Date();
        exdate.setDate(exdate.getDate()+expiredays);
        document.cookie=c_name+ "=" +escape(value)+
            ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
    }
    if (location.href.split("#/")[1].indexOf("personDetails")<0&&location.href.split("#/")[1].indexOf("leaveMessage")<0&&location.href.split("#/")[1].indexOf("personMessage")<0&&location.href.split("#/")[1].indexOf("editAlbum")<0) {
        setCookie('slideFlag',false,1);
        setCookie('pageFlag','intro',1);
    }
    $(".mui-backdrop").remove();
    $(".mui-dtpicker").remove();
    $(".mui-popup").remove();
    $(".mui-poppicker").remove();
};
export{
    checkLog
}