var Api_Url = 'http://test.api.agent.51mydao.com';
var Session_Key = 'User';

module.exports = function Api( fullCode, reqMsg, successCallBack, errorCallBack ) {
    var reqMsgStr = JSON.stringify( reqMsg );
    var agentUrl = Api_Url+'/Agent/Api';

    var userInfo = wx.getStorageSync( Session_Key );
     var user=GetCurrentUser();

    wx.request( {
        url: agentUrl,
        data: {
            SId: user.SId,
            FullCode: fullCode,
            ReqData: reqMsgStr
        },
        header: {
           // 'Content-Type': 'application/json'
        },
        success: function( res ) {
           successCallBack( res.data )
        },
        method:'POST'
    })
}

function GetCurrentUser() {
    var userInfo = wx.getStorageSync( this.UserSessionKey );
    if( userInfo ) {
        userInfo = JSON.parse( userInfo );
        return userInfo;
    }
    return { SId: '' };
}