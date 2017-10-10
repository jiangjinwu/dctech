define("utils/chat", ["AVChatClient"],
function(t) {
    var n = function(n) {
        this.settings = {
            appId: "5g3r1dj73lub5zy2axg705xkkdvkfcbn4rs3ak2vhyl5w5or",
            peerId: n,
            auth: this.auth,
            groupAuth: this.groupAuth
        },
        console.log(this.settings),
        this.client = new t(this.settings)
    };
    return n.prototype.make_client = function() {
        return new t(this.settings)
    },
    n.prototype.auth = function(t, n) {
        return new Promise(function(e, i) {
            $.post("/apiv1/avos/chat/auth", {
                self_id: t,
                watch_ids: n
            }).success(function(t) {
                e({
                    n: t.nonce,
                    t: t.timestamp,
                    s: t.signature,
                    watchingPeerIds: t.watch_ids
                })
            }).error(function(t) {
                i(t)
            })
        })
    },
    n.prototype.groupAuth = function(t, n, e, i) {
        return new Promise(function(s, o) {
            $.post("/apiv1/avos/chat/group-auth", {
                self_id: t,
                group_id: n,
                action: e,
                watch_ids: i.join(",")
            }).success(function(t) {
                s({
                    n: t.nonce,
                    t: t.timestamp,
                    s: t.signature,
                    watchingPeerIds: t.watch_ids
                })
            }).error(function(t) {
                o(t)
            })
        })
    },
    n.prototype.get_convid_and_signature = function(t) {
        var n = this;
        return new Promise(function(e, i) {
            $.post("/apiv1/avos/chat/sign", {
                self_id: n.settings.peerId,
                watch_ids: t
            }).success(function(t) {
                e(t)
            }).error(function(t) {
                i(t)
            })
        })
    },
    n.prototype.get_conv_history = function(t, n) {
        var e = {
            limit: 32
        };
        null !== n && void 0 !== n && (e.timestamp = n);
        var i = this;
        return new Promise(function(n, s) {
            i.get_convid_and_signature(t).then(function(t) {
                e.convid = t.convid,
                $.ajax({
                    type: "GET",
                    url: "https://leancloud.cn/1.1/rtm/messages/logs",
                    headers: {
                        "X-AVOSCloud-Application-Id": i.settings.appId,
                        "X-AVOSCloud-Request-Sign": t.signature
                    },
                    data: e,
                    dateType: "json"
                }).success(function(t) {
                    n(t)
                }).error(function(t) {
                    s(t)
                })
            })
        })
    },
    n.prototype.get_unread_count = function() {
        var t = this;
        return new Promise(function(n, e) {
            t.get_convid_and_signature().then(function(i) {
                $.ajax({
                    type: "GET",
                    url: "https://leancloud.cn/1.1/rtm/messages/unread/" + t.settings.peerId,
                    headers: {
                        "X-AVOSCloud-Application-Id": t.settings.appId,
                        "X-AVOSCloud-Request-Sign": i.signature
                    },
                    data: {
                        _t: Date.now()
                    },
                    dateType: "json"
                }).success(function(t) {
                    n(t.count)
                }).error(function(t) {
                    e(t)
                })
            })
        })
    },
    n.prototype.listenTo = function(t) {
        this.watch_ids = t,
        this.client.watch(t)
    },
    n.prototype.backup = function(t, n) {
        return new Promise(function(e, i) {
            $.post("/apiv1/im/users/" + t, {
                message: n
            }).success(function(t) {
                e(t)
            }).error(function(t) {
                i(t)
            })
        })
    },
    n.prototype.get_1v1_session = function(t) {
        return new Promise(function(n, e) {
            $.get("/apiv1/im/users/" + t, {
                _t: Date.now()
            }).success(function(t) {
                n(t)
            }).error(function(t) {
                e(t)
            })
        })
    },
    n
});
define("global", ["utils/chat"],
function(n) {
    var t = {};
    return t._settings = {},
    t.is_weixin = /micromessenger/gi.test(window.navigator.userAgent),
    t.is_qq = /QQ/g.test(window.navigator.userAgent),
    t.is_apple = /AppleWebKit/gi.test(window.navigator.userAgent),
    t.is_ios = /iPad|iPhone/gi.test(window.navigator.userAgent),
    t.is_kzapp_android = /KuaiZhanAndroidWrapper/gi.test(window.navigator.userAgent),
    t.is_kzapp_ios = /KuaiZhaniOSSite/gi.test(window.navigator.userAgent),
    t._current_user_loaded = !1,
    t.current_user = null,
    t.protocol = window.location && window.location.protocol,
    t.auth = function(n) {
        t.get_current_user().then(function(t) {
            n && n(t)
        })["catch"](function(n) {
            t.jump_to_login()
        })
    },
    t.set = function(n) {
        t._settings = $.extend(t._settings, n)
    },
    t.jump_to_login = function() {
        console.log("jump_to_login"),
        window.location = "/shop/apiv1/me/login?callback=" + window.encodeURIComponent(window.location)
    },
    t.jump_to_passport_login = function() {
        console.log("jump_to_passport_login"),
        window.location = "/passport/main/login?site_id=" + SOHUZ.page.site_id + "&callback=" + window.encodeURIComponent(window.location)
    },
    t.get_current_user = function() {
        return new Promise(function(n, o) {
            if (console.log("global._current_user_loaded:", t._current_user_loaded), console.log("global.current_user:", t.current_user), t._current_user_loaded) return t.current_user ? n(t.current_user) : o("hello");
            var e = "/shop/apiv1/me?";
            t._settings.forum_id ? e += "forum_id=" + t._settings.forum_id: t._settings.topic_id ? e += "topic_id=" + t._settings.topic_id: t._settings.comment_id && (e += "comment_id=" + t._settings.comment_id),
            $.ajax({
                url: e
            }).success(function(o) {
                t._current_user_loaded = !0,
                t.current_user = o,
                n(t.current_user)
            }).error(function() {
                t._current_user_loaded = !0,
                o("hello")
            })
        })
    },
    t.getNoticeCount = function(n) {
        return new Promise(function(n, o) {
            return "undefined" != typeof t.notice_count && null !== typeof t.notice_count && typeof t.notice_count > 0 ? void n(t.notice_count) : void $.ajax({
                type: "GET",
                url: "/apiv1/me/notices-count",
                data: {
                    _t: Date.now()
                },
                dateType: "json"
            }).success(function(o) {
                t.notice_count = o,
                n(t.notice_count)
            }).error(function() {
                t.notice_count = 0,
                n(t.notice_count)
            })
        })
    },
    t.get_avoschat = function() {
        return new Promise(function(o, e) {
            t.get_current_user().then(function(e) {
                t.avoschat || (t.avoschat = new n(e._id)),
                o(t.avoschat)
            })["catch"](function() {
                e()
            })
        })
    },
    t.getUnreadChatsCount = function() {
        return "undefined" != typeof t.unreadChatsCount && null !== typeof t.unreadChatsCount && typeof t.unreadChatsCount > 0 ? void callback(t.unreadChatsCount) : new Promise(function(n, o) {
            t.get_avoschat().then(function(n) {
                return n.get_unread_count()
            }).then(function(o) {
                t.unreadChatsCount = o,
                n(t.unreadChatsCount)
            })["catch"](function(o) {
                t.unreadChatsCount = 0,
                n(t.unreadChatsCount)
            })
        })
    },
    t.hasApp = function(n) {
        return new Promise(function(o, e) {
            $.ajax({
                type: "GET",
                dataType: "jsonp",
                url: t.protocol + "//app.kuaizhan.com/app/" + n + "/comm_app?callback=?"
            }).success(function(n) {
                return n && !n.code && n.data && !t.is_ios ? o(n.data) : e()
            }).error(function() {
                e()
            })
        })
    },
    window.global = t,
    t
});
define("utils/tools", [],
function() {
    var t = function() {};
    return t.html_escape = function(t) {
        var e = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;",
            "/": "&#x2F;"
        };
        return String(t).replace(/[&<>"'\/]/g,
        function(t) {
            return e[t]
        })
    },
    t.get_time = function(t) {
        var t = t.split("T"),
        e = t[1].split(":");
        return t[0] + " " + e[0] + ":" + e[1]
    },
    t.get_fixed2 = function(t) {
        function e(t, e) {
            return t = +t,
            e = +e,
            t = t.toString().split("e"),
            t = Math.round( + (t[0] + "e" + (t[1] ? +t[1] - e: -e))),
            t = t.toString().split("e"),
            +(t[0] + "e" + (t[1] ? +t[1] + e: e))
        }
        var n = t;
        return e(n, -2).toFixed(2)
    },
    t.set_localstorage = function(t, e) {
        window.localStorage && localStorage.setItem(t, e)
    },
    t.get_localstorage = function(t) {
        if (window.localStorage) return localStorage.getItem(t)
    },
    t
});
define("utils/shopAPI", ["utils/tools"],
function(e) {
    var s = SOHUZ.page.shop_id,
    o = SOHUZ.page.site_id,
    t = {
        "-99": "已关闭",
        100 : "待付款",
        200 : "待发货",
        300 : "待收货",
        400 : "已接收",
        666 : "已完成"
    },
    r = {
        "-99": "isclose",
        100 : "ispaid",
        200 : "issend",
        300 : "isshipping",
        400 : "isreceived",
        666 : "isfinished"
    },
    n = {
        100 : "买家申请退款",
        200 : "正在退款",
        300 : "退款成功",
        400 : "退款失败",
        500 : "拒绝退款"
    },
    t = SOHUZ.page.is_takeout ? {
        "-99": "已关闭",
        100 : "待付款",
        200 : "待接单",
        300 : "配送中",
        400 : "已接收",
        666 : "已完成"
    }: {
        "-99": "已关闭",
        100 : "待付款",
        200 : "待发货",
        300 : "待收货",
        400 : "已接收",
        666 : "已完成"
    },
    a = {
        get_shopinfo: function(e) {
            $.ajax({
                url: "/shop/api/shops/" + s,
                type: "get",
                success: function(s) {
                    s.monthly_income = parseFloat(s.monthly_income).toFixed(2),
                    e(s)
                }
            })
        },
        get_commodities: function(e, o) {
            $.ajax({
                url: " /shop/api/shops/" + s + "/commodities",
                type: "get",
                data: e,
                success: function(e) {
                    for (var s = 0; s < e.length; s++) e[s].original_price && e[s].original_price !== e[s].price && (e[s]._original_price = e[s].original_price),
                    e[s].enable_score && e[s].only_use_score ? e[s]._price = !1 : e[s]._price = !0;
                    o(e)
                }
            })
        },
        create_order: function(e, o, t) {
            e.commodities = JSON.stringify(e.commodities),
            $.ajax({
                url: "/shop/api/shops/" + s + "/orders",
                type: "post",
                data: e,
                success: function(e) {
                    o(e)
                },
                error: function(e) {
                    t(e.responseJSON)
                }
            })
        },
        get_myorder: function(e, o) {
            $.ajax({
                url: "/shop/api/shops/" + s + "/my-orders",
                type: "get",
                data: e,
                success: function(e) {
                    for (var s in e) e[s]._state = t[e[s].current_stage],
                    e[s][r[e[s].current_stage]] = !0;
                    o(e)
                }
            })
        },
        pay_order: function(e, s) {
            $.ajax({
                url: "/shop/api/orders/" + e + "/pay",
                type: "post",
                success: function(e) {
                    s(e)
                }
            })
        },
        close_order: function(e, s, o, t) {
            $.ajax({
                url: "/shop/api/orders/" + e + "/cancel",
                type: "post",
                data: s,
                success: function(e) {
                    o(e)
                },
                error: function(e) {
                    return 20301 === e.responseJSON.code ? (global.jump_to_login(), !1) : void(t && t(e.responseJSON))
                }
            })
        },
        finish_order: function(e, s, o) {
            $.ajax({
                url: "/shop/api/orders/" + e.id + "/receive",
                type: "post",
                data: e,
                success: function(e) {
                    s(e)
                },
                error: function(e) {
                    o && o(e.responseJSON)
                }
            })
        },
        get_wishes: function(e, o) {
            $.ajax({
                url: "/shop/api/shops/" + s + "/my-wishes",
                type: "get",
                data: e,
                success: function(e) {
                    o(e)
                }
            })
        },
        get_wishes_count: function(e) {
            $.ajax({
                url: "/shop/api/shops/" + s + "/my-wishes-count",
                type: "get",
                success: function(s) {
                    e(s)
                }
            })
        },
        create_wishes: function(e, s) {
            e.commodities = JSON.stringify(e.commodities),
            $.ajax({
                url: "/shop/api/my-wishes",
                type: "post",
                data: e,
                success: function(e) {
                    s(e)
                }
            })
        },
        del_wishes: function(e, s, o) {
            $.ajax({
                url: "/shop/api/my-wishes/" + e,
                type: "delete",
                success: function(e) {
                    s(e)
                }
            })
        },
        order_from_wishes: function(e, o, t) {
            $.ajax({
                url: "/shop/api/shops/" + s + "/order-from-wishes",
                type: "post",
                data: e,
                success: function(e) {
                    o(e)
                },
                error: function(e) {
                    t(e.responseJSON)
                }
            })
        },
        get_address_list: function(e) {
            $.ajax({
                url: "/shop/api/me/addresses",
                type: "get",
                success: function(s) {
                    e(s)
                }
            })
        },
        get_default_address: function(e, s) {
            $.ajax({
                url: "/shop/api/me/default-address",
                type: "get",
                success: function(s) {
                    e(s)
                },
                error: function(e) {
                    s(e)
                }
            })
        },
        me_add_address: function(e, s) {
            $.ajax({
                url: "/shop/api/me/addresses",
                type: "post",
                data: e,
                success: function(e) {
                    s(e)
                }
            })
        },
        me_edit_address: function(e, s, o) {
            $.ajax({
                url: "/shop/api/me/addresses/" + e,
                type: "put",
                data: s,
                success: function(e) {
                    o(e)
                }
            })
        },
        me_del_address: function(e, s) {
            $.ajax({
                url: "/shop/api/me/addresses/" + e,
                type: "delete",
                success: function(e) {
                    s(e)
                }
            })
        },
        pay_by_cash: function(e, s) {
            $.ajax({
                url: "/shop/api/orders/" + e + "/cod-pay",
                type: "post",
                success: function(e) {
                    s(e)
                }
            })
        },
        pay_by_alipay: function(e, s, o) {
            $.ajax({
                url: "/shop/api/orders/" + e + "/alipay",
                type: "post",
                success: function(e) {
                    s(e)
                },
                error: function(e) {
                    o(e.responseJSON)
                }
            })
        },
        pay_by_wechat: function(e, s, o, t) {
            $.ajax({
                url: "/shop/api/orders/" + e + "/wx-pay",
                type: "post",
                data: {
                    openid: s
                },
                success: function(e) {
                    o(e)
                },
                error: function(e) {
                    t(e.responseJSON)
                }
            })
        },
        wxpay_link: function(e, s, o) {
            $.ajax({
                url: "/shop/api/wxpay/" + e,
                type: "get",
                success: function(e) {
                    s(e)
                },
                error: function(e) {
                    o(e.responseJSON)
                }
            })
        },
        wxpay_link_by_openid: function(e, s, o, t) {
            $.ajax({
                url: "/shop/api/orders/" + e + "/wx-link-by-openid",
                type: "get",
                data: {
                    wx_openid: s
                },
                success: function(e) {
                    o(e)
                },
                error: function(e) {
                    t(e.responseJSON)
                }
            })
        },
        pay_by_peakalipay: function(e, s, o) {
            $.ajax({
                url: "/shop/api/orders/" + e + "/peak",
                type: "post",
                data: {
                    payment: "alipay"
                },
                success: function(e) {
                    s(e)
                },
                error: function(e) {
                    o(e.responseJSON)
                }
            })
        },
        pay_by_peakwechat: function(e, s, o) {
            $.ajax({
                url: "/shop/api/orders/" + e + "/peak",
                type: "post",
                data: {
                    payment: "wxpay"
                },
                success: function(e) {
                    s(e)
                },
                error: function(e) {
                    o(e.responseJSON)
                }
            })
        },
        pay_by_peakwechat_native: function(e, s, o, t) {
            $.ajax({
                url: "/shop/api/orders/" + e + "/peak",
                type: "post",
                data: {
                    payment: "wxpay-native",
                    wx_openid: s
                },
                success: function(e) {
                    o(e)
                },
                error: function(e) {
                    t(e.responseJSON)
                }
            })
        },
        pay_tip_by_peakalipay: function(e, s, o) {
            $.ajax({
                url: "/club/apiv1/tips/" + e + "/peak",
                type: "post",
                data: {
                    payment: "alipay"
                },
                success: function(e) {
                    s(e)
                },
                error: function(e) {
                    o(e.responseJSON)
                }
            })
        },
        pay_tip_by_peakwechat: function(e, s, o) {
            $.ajax({
                url: "/club/apiv1/tips/" + e + "/peak",
                type: "post",
                data: {
                    payment: "wxpay"
                },
                success: function(e) {
                    s(e)
                },
                error: function(e) {
                    o(e.responseJSON)
                }
            })
        },
        check_groupbuy: function(e, o, t) {
            $.ajax({
                url: "/shop/api/shops/" + s + "/groupbuy-check",
                type: "get",
                data: e,
                success: function(e) {
                    o(e)
                },
                error: function(e) {
                    return 20301 === e.responseJSON.code ? (global.jump_to_login(), !1) : void t(e.responseJSON)
                }
            })
        },
        create_groupbuy: function(e, o, t) {
            $.ajax({
                url: "/shop/api/shops/" + s + "/groupbuy-orders",
                type: "post",
                data: e,
                success: function(e) {
                    o(e)
                },
                error: function(e) {
                    t(e.responseJSON)
                }
            })
        },
        post_sms: function(e, s, t) {
            $.ajax({
                url: "/shop/api/sites/" + o + "/sms-no-picvcode",
                type: "post",
                data: e,
                success: function(e) {
                    s(e)
                },
                error: function(e) {
                    t && t(e.responseJSON)
                }
            })
        },
        free_pay: function(e, s, o) {
            $.ajax({
                url: "/shop/api/orders/" + e + "/free-charge",
                type: "post",
                success: function(e) {
                    s(e)
                },
                error: function(e) {
                    o && o(e.responseJSON)
                }
            })
        },
        LS_savebuycar: function(e) {
            return !! localStorage && (localStorage.KZ_takeout_buycar = JSON.stringify(e), !0)
        },
        LS_getbuycar: function() {
            return localStorage ? JSON.parse(localStorage.KZ_takeout_buycar) : {}
        },
        set_order_comment: function(e, s, o) {
            $.ajax({
                url: "/shop/api/orders/" + e + "/comments",
                type: "post",
                data: s,
                success: function(e) {
                    o(e)
                }
            })
        },
        get_shop_comments: function(s, o, t) {
            $.ajax({
                url: "/shop/api/shops/" + s + "/comments",
                type: "get",
                data: o,
                success: function(s) {
                    s.forEach(function(s) {
                        s._score = 17 * (s.commodity_score + s.delivery_score) / 2,
                        s._ctime = e.get_time(s.ctime)
                    }),
                    t(s)
                }
            })
        },
        coupon_refund: function(e, s, o) {
            $.ajax({
                url: "/shop/api/orders/" + e + "/coupon-refund",
                type: "post",
                success: function(e) {
                    s(e)
                },
                error: function(e) {
                    return 20301 === e.responseJSON.code ? (global.jump_to_login(), !1) : void(o && o(e.responseJSON))
                }
            })
        },
        get_shop_setting: function(e) {
            $.ajax({
                url: "/shop/api/shops/" + s + "/settings",
                type: "get",
                success: function(s) {
                    s.payment_show_settings && s.payment_show_settings.image && (s._payment_show_image = s.payment_show_settings.image, s._payment_show_url = s.payment_show_settings.url),
                    s.order_share_show_settings && s.order_share_show_settings.image && (s._order_share_image = s.order_share_show_settings.image, s._order_share_url = s.order_share_show_settings.url),
                    s.need_buyer_address !== !1 && (s.need_buyer_address = !0),
                    s.order_in_close_time !== !1 && (s.order_in_close_time = !0),
                    e(s)
                },
                error: function(s) {
                    e()
                }
            })
        },
        get_one_commodity: function(e, s) {
            $.ajax({
                url: "/shop/api/commodities/" + e,
                type: "get",
                success: function(e) {
                    if (e.models.length > 0) {
                        var o = $.extend({},
                        e.model_details);
                        for (var t in o) e.model_details[Base64.decode(t)] = e.model_details[t],
                        delete e.model_details[t]
                    }
                    e.coupon_start_date && (e._coupon_start_date = e.coupon_start_date.split("T")[0]),
                    e.coupon_end_date && (e._coupon_end_date = e.coupon_end_date.split("T")[0]),
                    s(e)
                }
            })
        },
        get_bills: function(e, s) {
            $.ajax({
                url: "/shop/api/me/bills",
                type: "get",
                data: e,
                success: function(e) {
                    s(e)
                }
            })
        },
        get_bills_count: function(e, s) {
            $.ajax({
                url: "/shop/api/me/bills-count",
                type: "get",
                data: e,
                success: function(e) {
                    s(e)
                }
            })
        },
        post_sms2: function(e, s, o) {
            $.ajax({
                url: "/shop/api/me/sms",
                type: "post",
                data: {
                    mobile: e
                },
                success: function(e) {
                    s(e)
                },
                error: function(e) {
                    o && o(e.responseJSON)
                }
            })
        },
        get_wallet_setting: function(e, s) {
            $.ajax({
                url: "/shop/api/me/wallet",
                type: "get",
                success: function(s) {
                    e(s)
                },
                error: function(e) {
                    s && s(e.responseJSON)
                }
            })
        },
        update_wallet_setting: function(e, s, o) {
            $.ajax({
                url: "/shop/api/me/wallet",
                type: "post",
                data: e,
                success: function(e) {
                    s(e)
                },
                error: function(e) {
                    o && o(e.responseJSON)
                }
            })
        },
        post_withdrawal: function(e, s, o) {
            $.ajax({
                url: "/shop/api/me/wallet/withdrawal",
                type: "post",
                data: e,
                success: function(e) {
                    s(e)
                },
                error: function(e) {
                    o && o(e.responseJSON)
                }
            })
        },
        get_groupbuy_members: function(e, s, o) {
            $.ajax({
                url: "/shop/api/orders/" + e.order_id + "/groupbuy/users",
                type: "get",
                data: {
                    limit: e.limit,
                    offset: e.offset
                },
                success: function(e) {
                    for (var o = 0; o < e.length; o++) e[o].time = e[o].time.split("T")[0] + " " + e[o].time.split("T")[1].split(".")[0];
                    s(e)
                },
                error: function(e) {
                    o && o(e.responseJSON)
                }
            })
        },
        get_freight: function(e, o, t) {
            $.ajax({
                url: " /shop/api/shops/" + s + "/freight",
                type: "get",
                data: e,
                success: function(e) {
                    o(e)
                },
                error: function(e) {
                    t && t(e.responseJSON)
                }
            })
        },
        get_my_orders: function(e, s, t) {
            var r = this;
            $.ajax({
                url: "/shop/api/sites/" + o + "/my-orders",
                type: "get",
                data: e,
                success: function(e) {
                    s(r._make_orders(e))
                },
                error: function(e) {
                    t && t(e.responseJSON)
                }
            })
        },
        _make_orders: function(e) {
            for (var s in e) {
                e[s]._current_stage_text = t[e[s].current_stage],
                e[s]._is_unpaid = 100 == e[s].current_stage,
                e[s]._is_paid = 200 == e[s].current_stage,
                e[s]._is_shipping = 300 == e[s].current_stage,
                200 == e[s].current_stage ? e[s]._cancelable = "peak" == e[s].payment && (!e[s].refund_state || 500 == e[s].refund_state) || "cash" == e[s].payment || "free" == e[s].payment: 300 == e[s].current_stage && (e[s]._cancelable = "peak" == e[s].payment && (!e[s].refund_state || 500 == e[s].refund_state)),
                e[s].refund_state && 200 != e[s].refund_state && (e[s]._refund_state_text = n[e[s].refund_state]),
                e[s].price = parseFloat(e[s].price).toFixed(2),
                e[s].price_int = e[s].price.split(".")[0],
                e[s].price_decimal = e[s].price.split(".")[1],
                e[s].freight = parseFloat(e[s].freight).toFixed(2),
                e[s]._all_amount = 0,
                e[s].is_bottom_show = e[s].groupbuy_state && 100 != e[s].groupbuy_state && e[s].current_stage != -99 && 95 != e[s].current_stage && 666 != e[s].current_stage;
                for (var o in e[s].commodities) {
                    var r = e[s].commodities[o];
                    if (1 == e[s].commodities.length) {
                        e[s].single_commodity = !0,
                        r.price = parseFloat(r.price).toFixed(2),
                        r.html_models = "";
                        for (var a in r.models) r.html_models = r.html_models ? r.html_models + " " + r.models[a] : r.models[a];
                        r.is_pure_score && (r._all_score = r.amount * r.score)
                    }
                    e[s]._all_amount = e[s]._all_amount + r.amount,
                    r.is_coupon_commodity = 300 == r.type,
                    r.is_groupbuy_commodity = 200 == r.type,
                    r.is_score_commodity = 100 == r.type && r.enable_score
                }
            }
            return e
        },
        create_pre_order: function(e, o, t) {
            $.ajax({
                url: "/shop/shops/" + s + "/create-pre-order",
                type: "post",
                data: e,
                success: function(e) {
                    o(e)
                },
                error: function(e) {
                    return 20301 === e.responseJSON.code ? (global.jump_to_login(), !1) : void(t && t(e.responseJSON))
                }
            })
        },
        create_pre_groupbuy_order: function(e, o, t) {
            $.ajax({
                url: "/shop/shops/" + s + "/create-pre-groupbuy",
                type: "post",
                data: e,
                success: function(e) {
                    o(e)
                },
                error: function(e) {
                    return 20301 === e.responseJSON.code ? (global.jump_to_login(), !1) : void(t && t(e.responseJSON))
                }
            })
        },
        get_pre_order: function(e, o, t) {
            $.ajax({
                url: "/shop/shops/" + s + "/get-pre-order",
                type: "get",
                data: e,
                success: function(e) {
                    o(e)
                },
                error: function(e) {
                    return 20301 === e.responseJSON.code ? (global.jump_to_login(), !1) : void(t && t(e.responseJSON))
                }
            })
        },
        get_pre_groupbuy_order: function(e, o, t) {
            $.ajax({
                url: "/shop/shops/" + s + "/get-pre-groupbuy-order",
                type: "get",
                data: e,
                success: function(e) {
                    o(e)
                },
                error: function(e) {
                    return 20301 === e.responseJSON.code ? (global.jump_to_login(), !1) : void(t && t(e.responseJSON))
                }
            })
        }
    };
    return a
});
define("templates/slider.html", [],
function() {
    return '<!--<div id="slider" class="animated app-slider">-->\n<div id="slider" class="slider app-slider">\n    <ul class="list">\n        <li class="item home">\n            <a href="/">\n                <div class="icon icon0"></div>\n                <div class="text">站点</div>\n            </a>\n        </li>\n        <!--<li class="item index">\n            <a href="/shop/shops/{{shop_id}}">\n                <div class="icon icon1"></div>\n                <div class="text">首页</div>\n            </a>\n        </li>-->\n        <li class="item shopinfo">\n            <a href="/shop/shops/{{shop_id}}/describe">\n                <div class="icon icon1"></div>\n                <div class="text">店铺简介</div>\n            </a>\n        </li>\n\n        <li class="item share">\n                <div class="icon icon2"></div>\n                <div class="text">分享</div>\n        </li>\n        <li class="item buycar">\n            <a href="/shop/shops/{{shop_id}}/buyer-wishes">\n                <div class="icon icon3"></div>\n                <div class="text">购物车</div>\n            </a>\n        </li>\n        <li class="item my">\n        <a href="/auth/me?site_id={{site_id}}">\n                <div class="icon icon4"></div>\n                <div class="text">我的</div>\n            </a>\n        </li>\n        <!--<li class="item qq">\n            <a href="">\n                <div class="icon icon3"></div>\n                <div class="text">联系客服</div>\n            </a>\n        </li> -->\n    </ul>\n    <div class="smask"></div>\n</div>\n'
});
define("templates/kz-header-slider.html", [],
function() {
    return '<div id="slider" class="slider kz-header-slider">\n    <div class="info-wrp" style="background-color: {{header_info.site_theme.color-t}}; color: {{header_info.site_theme.color-b}}">\n        <div class="info">\n            {{#current_user}}\n            <div class="avatar {{^avatar}}avatar-default{{/avatar}}" data-role="jump-to-personal">{{#avatar}}<img src="{{current_user.avatar}}"/>{{/avatar}}</div>\n            <div class="detail">\n                <span class="nick">{{nick}}</span>\n                <span>{{sex}}</span>\n                {{#age}}<span>{{age}}岁</span>{{/age}}\n            </div>\n            {{/current_user}}\n            {{^current_user}}\n            <div class="avatar avatar-default"></div>\n            <div class="jump-to-login" data-role="jump-to-login">去登录</div>\n            {{/current_user}}\n        </div>\n    </div>\n    <ul class="list">\n        <li class="item index">\n            <a href="/">\n                <div class="icon kz-icon-shop"></div>\n                <div class="text">首页</div>\n            </a>\n        </li>\n        <li class="item index">\n            <a href="/clubv2/me/notices">\n                <div class="icon kz-icon-remind"></div>\n                <div class="text">提醒</div>\n            </a>\n        </li>\n        <li class="item my">\n            <a href="http://{{host}}/auth/me?site_id={{site_id}}">\n                <div class="icon kz-icon-me"></div>\n                <div class="text">我的</div>\n            </a>\n        </li>\n        <li class="item share">\n            <div class="icon kz-icon-share"></div>\n            <div class="text">分享</div>\n        </li>\n    </ul>\n\n    <ul class="list list-shop">\n        <li class="item shopinfo">\n            <a href="/shop/shops/{{shop_id}}/describe">\n                <div class="icon kz-icon-intro"></div>\n                <div class="text">店铺简介</div>\n            </a>\n        </li>\n        <li class="item buycar">\n            <a href="/shop/shops/{{shop_id}}/buyer-wishes">\n                <div class="icon kz-icon-cart"></div>\n                <div class="text">购物车</div>\n            </a>\n        </li>\n    </ul>\n    <div class="smask"></div>\n</div>\n'
});
define("templates/share.html", [],
function() {
    return '<div class="app-share" id="app-share">\n\n    <div class="share-wrp clearfix">\n<!--         <div class="item wechat">\n            <div class="pic"></div>\n            <div class="text">微信</div>\n        </div>\n        <div class="item pyq">\n            <div class="pic"></div>\n            <div class="text">朋友圈</div>\n        </div> -->\n        <div class="item sina" data-role="sina">\n            <div class="pic"></div>\n            <div class="text">新浪</div>\n        </div>\n        <div class="item qqzone" data-role="zone">\n            <div class="pic"></div>\n            <div class="text">QQ空间</div>\n        </div>\n        <div class="item qrcode">\n            <div class="pic"></div>\n            <div class="text">二维码</div>\n        </div>\n<!--         <div class="item copy">\n            <div class="pic"></div>\n            <div class="text">复制</div>\n        </div> -->\n    </div>\n    <div class="icon-close"></div>\n</div>'
});
define("utils/mask", [],
function() {
    var i = function(i) {
        var n = this;
        n.mask = $('<div class="sui-mask"></div>'),
        this.show = function() {
            var n = this;
            $("body").append(n.mask),
            n.mask.bind("tap",
            function() {
                return i && i.onclick(),
                !1
            }),
            n.mask.bind("touchmove",
            function() {
                return ! 1
            })
        },
        this.hide = function() {
            this.mask.remove()
        }
    };
    return i
});
define("sui", ["utils/mask", "utils/shopAPI"],
function(i, n) {
    var s = '<div class="sui-center-tip">{{msg}}</div>',
    t = '<div class="sui-confirm">                             <div class="img"></div>                            <div class="content"><div class="text">{{msg}}</div></div>                             <div class="bottom">                                 <div class="btn-confirm">确认</div>                                <div class="btn-cancel">取消</div>                            </div>                         </div>',
    e = '<div class="sui-smsconfirm">                             <div class="content">                                <div class="title">{{title}}</div>                                <div class="sms-row">                                    <div class="span">验证码</div>                                    <input class="sms" name="smsval"></input>                                    <div class="btn-sms">获取验证码</div>                                    <div class="btn-sms-wait">60秒后重新发送</div>                                </div>                            </div>                             <div class="bottom">                                 <div class="btn-cancle">取消</div>                                <div class="btn-confirm">{{confirm_text}}</div>                            </div>                         </div>',
    o = '<div class="sui-display">                             <div class="content clearfix"></div>                         </div>',
    d = {
        tip: function(i) {
            "string" == typeof i && (i = {
                msg: i
            });
            var n = $(Mustache.render(s, i));
            $("body").append(n),
            setTimeout(function() {
                n.fadeOut(function() {
                    n.remove()
                })
            },
            1e3)
        },
        confirm: function(n) {
            var s = $(Mustache.render(t, n)),
            e = new i;
            $("body").append(s),
            e.show(),
            s.on("tap", ".btn-cancel",
            function() {
                return s.remove(),
                e.hide(),
                !1
            }).on("tap", ".btn-confirm",
            function() {
                return n.confirm(),
                s.remove(),
                e.hide(),
                !1
            })
        },
        display: function(n) {
            var s = $(Mustache.render(o));
            if ($("body").append(s), n.content) {
                var t = n.content;
                $("body").find(".sui-display .content").append(t)
            }
            var e = new i({
                onclick: function() {
                    e.hide(),
                    s.remove()
                }
            });
            if (e.show(), n && n.events) for (var d in n.events) s.on("tap", d,
            function(i) {
                return function() {
                    n.events[i]()
                }
            } (d));
            var a = n && n.tag || ".btn";
            s.on("tap", a,
            function() {
                return n.confirm(),
                s.remove(),
                e.hide(),
                !1
            })
        },
        sms_confirm: function(s) {
            var t = $(Mustache.render(e, s)),
            o = new i;
            $("body").append(t),
            o.show(),
            t.on("tap", ".btn-cancle",
            function() {
                return t.remove(),
                o.hide(),
                !1
            }).on("tap", ".btn-confirm",
            function() {
                var i = t.find('[name="smsval"]').val();
                return s.confirm(i),
                !1
            }).on("tap", ".btn-sms",
            function() {
                var i = 60;
                t.find(".btn-sms").hide(),
                t.find(".btn-sms-wait").css("display", "inline-block");
                var e = setInterval(function() {
                    0 === i && (clearTimeout(e), t.find(".btn-sms").css("display", "inline-block"), t.find(".btn-sms-wait").hide().html("60秒后重新发送")),
                    i -= 1,
                    t.find(".btn-sms-wait").html(i + "秒后重新发送")
                },
                1e3);
                n.post_sms(s.data,
                function(i) {
                    console.log(i)
                },
                function(i) {
                    console.log(i)
                })
            })
        },
        slider_dis: function(n) {
            function s() {
                t.$el.hasClass("slider-dis-show") && (setTimeout(function() {
                    o.hide(),
                    t.$el.remove()
                },
                300), t.$el.removeClass("slider-dis-show"), t.$el.find(".smask").show())
            }
            var t = this,
            e = n && n.content || "",
            o = new i({
                onclick: function() {
                    s()
                }
            });
            if (0 == $("body").find(".slider-dis").size() ? t.$el = $("<div class='slider-dis clearfix'>" + e + "</div>").appendTo($("body")) : (t.$el = $("body").find(".slider-dis"), t.$el.html(e + "<div class='smask'></div>")), n && n.events) {
                var d = n.events;
                for (var a in d) t.$el.on("tap", a,
                function(i) {
                    return function() {
                        d[i]()
                    }
                } (a))
            }
            var c = n && n.close || '[data-role="close"]';
            t.$el.on("tap", c,
            function() {
                s()
            });
            var r = {
                show: function() {
                    setTimeout(function() {
                        t.$el.addClass("slider-dis-show"),
                        o.show(),
                        t.$el.find(".smask").hide()
                    },
                    0)
                },
                hide: function() {
                    s()
                }
            };
            return r
        },
        showWaiting: function(i, n) {
            var t = this;
            t._waiting = !0,
            this._t = setTimeout(function(i, n) {
                return function() {
                    $("body").find(".sui-center-tip").size() > 0 && ($("body").find(".sui-center-tip").remove(), $("body").find(".sui-mask").remove()),
                    n = n || "请等待",
                    i.html = $(Mustache.render(s, {
                        msg: n
                    })),
                    $("body").append(i.html)
                }
            } (t, i), n || 0)
        },
        closeWaiting: function() {
            var i = this;
            this._t && clearTimeout(this._t),
            this._waiting = !1,
            this.html && this.html.fadeOut(function() {
                i.html.remove()
            })
        },
        isWaiting: function() {
            return !! this._waiting
        }
    };
    return d
});
define("views/share", ["global", "templates/share.html", "sui"],
function(o, e, n) {
    var s = SOHUZ.page.site_id,
    t = SOHUZ.page.shop_id,
    i = SOHUZ.page.is_takeout,
    r = $("body"),
    a = {
        sina: "//service.weibo.com/share/share.php?url=",
        zone: "//sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=",
        tengxun: "//share.v.t.qq.com/index.php?c=share&a=index&url=",
        renren: "//widget.renren.com/dialog/share?resourceUrl="
    },
    h = {
        init: function() {
            var n = this;
            r.append(Mustache.render(e, {
                site_id: s
            })),
            $("#app-share").on("touchend", ".icon-close",
            function() {
                return n.hide(),
                !1
            }).on("tap", ".sina,.qqzone",
            function() {
                var o = $(this).data("role");
                if (i) var e = window.encodeURIComponent("//" + window.location.host + "/shop/takeout-shops/" + t) + "&title=" + window.encodeURIComponent("该写什么呢");
                else var e = window.encodeURIComponent("//" + window.location.host + "/shop/shops/" + t) + "&title=" + window.encodeURIComponent("该写什么呢");
                var n = a[o];
                return n && window.open(n + e),
                !1
            }).on("tap", ".qrcode",
            function() {
                i ? location.href = "/shop/takeout-shops/" + t + "/qrcode?qrurl=" + encodeURIComponent(o.protocol + "//" + location.host + "/shop/shops/" + t) : location.href = "/shop/shops/" + t + "/qrcode?qrurl=" + encodeURIComponent(o.protocol + "//" + location.host + "/shop/shops/" + t)
            })
        },
        show: function() {
            $("#app-share")[0] || this.init(),
            $("#app-share").show()
        },
        hide: function() {
            $("#app-share").hide()
        }
    };
    return h
});
define("views/slider", ["templates/slider.html", "templates/kz-header-slider.html", "views/share", "utils/mask"],
function(e, t, s, o) {
    var a = SOHUZ.page.shop_id,
    i = SOHUZ.page.current_user,
    n = $("body"),
    r = {
        init: function() {
            var r = this,
            d = n.find('[data-role="kz-header"]');
            if (i && i.birthday) {
                var h = parseInt(moment().format("YYYY")) - parseInt(moment(i.birthday).format("YYYY"));
                i.age = h
            }
            SOHUZ.page.is_kz_header_used ? n.append(Mustache.render(t, {
                host: location.host,
                shop_id: a,
                site_id: SOHUZ.page.site_id,
                header_info: d.data("val"),
                current_user: i
            })) : n.append(Mustache.render(e, {
                host: location.host,
                shop_id: a,
                site_id: SOHUZ.page.site_id
            })),
            r.mask = new o({
                onclick: function() {
                    return r.hide(),
                    !1
                }
            }),
            n.on("tap", ".header .more",
            function() {
                return r.show(),
                !1
            }).on("tap", ".icon-more2",
            function() {
                return r.show(),
                !1
            }).on("tap", '[data-role="kz-header-more"]',
            function() {
                return r.show(),
                !1
            }).on("tap", "#slider .share",
            function() {
                return r.hide(),
                s.show(),
                !1
            }).on("tap", '[data-role="jump-to-login"]',
            function() {
                location.href = "//passport.kuaizhan.com/main/login?callback=" + encodeURIComponent(location.href)
            })
        },
        show: function() {
            this.mask.show(),
            $("#slider").addClass("slider-show"),
            setTimeout(function() {
                $(".smask").hide()
            },
            500)
        },
        hide: function() {
            var e = this;
            $("#slider").hasClass("slider-show") && (setTimeout(function() {
                e.mask.hide(),
                $(".smask").show()
            },
            300), $("#slider").removeClass("slider-show"))
        }
    };
    return r
});
define("utils/wx", [],
function() {
    var e = {
        get_ready: function(e) {
            require(["wxsdk"],
            function(n) {
                console.log("wxsdk:", n),
                $.post("/shop/apiv1/wx/config", {
                    url: window.location.href,
                    scene_type: 3,
                    site_id: SOHUZ.page.site_id
                }).success(function(c) {
                    c.jsApiList = ["onMenuShareTimeline", "onMenuShareAppMessage"],
                    console.log("wx config data:", c),
                    n.config(c),
                    n.ready(function() {
                        e && e(n)
                    })
                })
            })
        },
        config_share: function(e, n, c, i, l) {
            var l = l || {};
            console.log(e, n, c, i, l),
            this.get_ready(function(a) {
                a.onMenuShareTimeline({
                    title: l.timeline_title || e,
                    desc: n,
                    link: i,
                    imgUrl: c,
                    success: function() {
                        l.callback && l.callback()
                    },
                    cancel: function() {
                        l.callback && l.callback()
                    }
                }),
                a.onMenuShareAppMessage({
                    title: e,
                    desc: n,
                    link: i,
                    imgUrl: c,
                    success: function() {
                        l.callback && l.callback()
                    },
                    cancel: function() {
                        l.callback && l.callback()
                    }
                })
            })
        }
    };
    return e
});
define("utils/validate", [],
function() {
    var n = function() {};
    return n.isnone = function(n) {
        var t = n.replace(/\s/g, "");
        return "" == t
    },
    n.isprice = function(n) {
        return !! (/^\d+(\.{1}\d{0,2})?$/.test(n) && parseInt(n) < 1e6 && n > 0)
    },
    n.ismoney = function(n) {
        return !! (/^\d+(\.{1}\d{0,2})?$/.test(n) && parseInt(n) < 1e6 && n >= 0)
    },
    n.isphone = function(n) {
        return !! /^[\d|\-]{1,20}$/.test(n)
    },
    n.isnumber = function(n) {
        return !! (/^\d+$/.test(n) && parseInt(n) < 1e8 && n >= 0)
    },
    n.isbank = function(n) {
        return !! /^[\d]{12,19}$/.test(n)
    },
    n.isamount = function(n) {
        return !! (/^\d+$/.test(n) && parseInt(n) < 1e5 && n >= 0)
    },
    n.isfreight = function(n) {
        return !! (/^\d+(\.{1}\d{0,2})?$/.test(n) && parseInt(n) < 1e3 && n >= 0)
    },
    n.ischinese = function(n) {
        var t = /^[^\u0000-\u00FF]*$/;
        return !! t.test(n)
    },
    n.islowerthan = function(n, t) {
        return ! (n >= t)
    },
    n.isnotgreaterthan = function(n, t) {
        return ! (n > t)
    },
    n
});
define("controllers/baseview", ["global", "utils/shopAPI", "views/slider", "utils/wx", "utils/validate", "kzsdk", "sui"],
function(o, e, t, i, a, n, s) {
    return Backbone.View.extend({
        _init: function(a) {
            var a = a || {},
            s = this;
            t.init(),
            s.event_init(),
            a && a.dont_config_wx_share || o.is_weixin && e.get_shopinfo(function(o) {
                var e = o.avatar ? o.avatar: "//" + window.location.host + "/shop/images/static/default_avatar.png",
                t = o.title,
                a = "这是我发现的店铺，快进来逛逛！好货多多特别赞！",
                n = "//" + window.location.host + "/shop/shops/" + o._id;
                i.config_share(t, a, e, n, {
                    timeline_title: a
                })
            }),
            (o.is_kzapp_android || o.is_kzapp_ios) && n && Number(n.app_version) >= 1.8 && e.get_shopinfo(function(o) {
                var e, i = o.avatar ? o.avatar: "//" + window.location.host + "/shop/images/static/default_avatar.png";
                e = SOHUZ.page.is_kz_header_used ? SOHUZ.page.is_kz_header_first ? 1 : 2 : 0,
                n.ready({
                    readyCallback: function() {
                        n.setCommNav({
                            pageType: e,
                            rightMenuCallback: function() {
                                t.show()
                            },
                            leftLogo: function() {
                                SOHUZ.page.is_takeout ? location.href = "/shop/takeout-shops/" + SOHUZ.page.shop_id: location.href = "/shop/shops/" + SOHUZ.page.shop_id
                            },
                            forumLogo: i,
                            pageTitle: document.title
                        })
                    },
                    errorCallback: function() {
                        window.alert("sdk error")
                    }
                })
            })
        },
        _API: e,
        _Validate: a,
        getJSON_encode: function(o) {
            var e = {};
            for (var t in o) e[JSON.stringify(JSON.parse(t))] = o[t];
            return e
        },
        event_init: function() {
            var e = this;
            $("body").on("tap", ".kz-header-return",
            function() {
                return history.go( - 1),
                !1
            }).on("tap", '[data-role="jump-to-home"]',
            function() {
                SOHUZ.page.is_takeout ? location.href = "/shop/takeout-shops/" + SOHUZ.page.shop_id: location.href = "/shop/shops/" + SOHUZ.page.shop_id
            }).on("tap", '[data-role="jump-to-site"]',
            function() {
                location.href = "/"
            }),
            e.$el.on("tap", ".icon-return,.icon-return2",
            function() {
                return history.go( - 1),
                !1
            }).on("tap", ".icon-myself",
            function() {
                return location.href = "/shop/shops/" + SOHUZ.page.shop_id + "/buyer",
                !1
            }).on("tap", '[data-role="commodity-item"]',
            function() {
                var o = $(this).data("data");
                return location.href = "/shop/commodity/" + o.commodity_id + "/jump-to",
                !1
            }).on("tap", ".footer .menu-name",
            function(o) {
                var e = $(o.currentTarget);
                return e.next(".menu-box").hasClass("hover") ? e.next(".menu-box").removeClass("hover") : e.next(".menu-box").addClass("hover"),
                e.closest("li").siblings(" li").find(" .menu-box").removeClass("hover"),
                !1
            }).on("tap", '[data-role="subscribe"]',
            function(e) {
                var t = $(e.currentTarget).closest(".wx-subscribe").data("qrcode");
                if (o.is_weixin) var i = '<div class="wx-subscribe-qrcode"><img src="' + t + '"/><div>长按识别二维码关注</div></div>';
                else var i = '<div class="wx-subscribe-qrcode"><img src="' + t + '"/><div>请保存二维码图片，用微信识别</div></div>';
                s.display({
                    content: i
                })
            }).on("tap", '[data-role="close-subscribe"]',
            function(o) {
                $(o.currentTarget).closest(".wx-subscribe").remove(),
                o.preventDefault()
            })
        }
    })
});
define("controllers/IndexViewController", ["global", "controllers/baseview"],
function(e, n) {
    return n.extend({
        el: ".myapp",
        initialize: function(e) {
            this._init(),
            this.render(),
            console.log("index")
        },
        render: function() {},
        events: {}
    })
});
define("templates/commodity_item.html", [],
function() {
    return '{{#commodities}}\n    <li class="item">\n        <a href="/shop/commodity/{{_id}}">\n            <div class="img">\n                <img src="{{thumb}}">\n            </div>\n            <div class="info">\n                <div class="name {{#is_coupon}}icon-coupon{{/is_coupon}} {{#is_score}}icon-score{{/is_score}} {{#is_groupbuy}}icon-groupbuy{{/is_groupbuy}}">{{{title}}}</div>\n                <div class="price-wrp">\n                    {{#_price}}\n                    <div class="price"><i class="f-26">¥</i>\n                        <span class="int f-32 f-bold">{{price_int}}.</span><span class="decimal f-26 f-bold">{{price_decimal}}</span>\n                    </div>\n                        {{#_original_price}}\n                            <div class="original-price">¥{{_original_price}}</div>\n                        {{/_original_price}}\n                    {{/_price}}\n                    {{^_price}}\n                    <div class="price">{{score}}<i>积分</i></div>\n                    {{/_price}}\n                </div>\n\n            </div>\n        </a>\n    </li>\n{{/commodities}}\n'
});
define("controllers/MyshopViewController", ["global", "controllers/baseview", "templates/commodity_item.html", "sui", "utils/tools"],
function(t, e, i, o, a) {
    var r = 20;
    return e.extend({
        el: ".myapp",
        on_get_more: !1,
        on_group_get_more: !1,
        data: {},
        all_count: 0,
        count: 0,
        initialize: function(t) {
            var e = this;
            if (this.data = t, this.all_count = this.$el.data("count"), this.count = this.$el.find(".list .item").length, this._init(), this.render(), e.$el.find(".wx-subscribe").size() > 0) {
                var i = e.$el.find(".wx-subscribe").data("delay-time") ? 1e3 * parseInt(e.$el.find(".wx-subscribe").data("delay-time")) : 0,
                o = e.$el.find(".wx-subscribe").data("duration-time");
                console.log(i, 1e3 * o),
                setTimeout(function() {
                    e.$el.find(".wx-subscribe").show(),
                    o != -1 && setTimeout(function() {
                        e.$el.find(".wx-subscribe").is(":visible") && e.$el.find(".wx-subscribe").hide()
                    },
                    1e3 * o)
                },
                i)
            }
        },
        render: function() {
            var t = this,
            e = _(function() {
                var e = $(window).scrollTop();
                e > 500 && t.$el.find(".btn-go-top").show(),
                e < 200 && t.$el.find(".btn-go-top").hide()
            }).throttle(200);
            t.$el.find('[data-layout="manual_layout"]').size() > 0 ? (this.group_count = {},
            t.$el.find(".group-wrp .list").each(function(e, i) {
                var o = $(i).data("group");
                t.group_count[o + "_" + e] = $(i).data("show_nums")
            }), console.log(t.group_count)) : $(window).scroll(function() {
                if (e(), $(window).scrollTop() + $(window).height() > $(document).height() - 20) {
                    if (t.on_get_more || t.count == t.all_count) return;
                    t.on_get_more = !0,
                    t.get_more_commodities(),
                    o.tip("商品加载中…")
                }
            })
        },
        events: {
            "tap .btn-go-top": "go_top",
            "tap .nav a": "switch_category",
            'tap [data-role="peak-payment"]': "peak_payment",
            'tap [data-role="group-more"]': "group_more"
        },
        group_more: function(t) {
            var e = this,
            o = $(t.currentTarget),
            r = {},
            n = o.closest(".group-wrp").index();
            r.is_online = !0,
            r.limit = o.parent().find(".list").data("show_nums"),
            r.category_id = o.prev(".list").data("group"),
            r.offset = e.group_count[r.category_id + "_" + n],
            r.attach_score = !0,
            this.on_group_get_more || (this.on_group_get_more = !0, this._API.get_commodities(r,
            function(t) {
                if (e.group_count[r.category_id + "_" + n] = e.group_count[r.category_id + "_" + n] + t.length, 0 == t.length && e.group_count[r.category_id + "_" + n] > 0) o.html("已全部显示");
                else if (0 == t.length);
                else {
                    for (var s = 0; s < t.length; s++) {
                        var c = t[s];
                        c.thumb = !c.avatar || "http://pic.kuaizhan.com" != c.avatar.substr(0, 23) && "https://pic.kuaizhan.com" != c.avatar.substr(0, 24) ? c.avatar: c.avatar + "/imageView/v1/thumbnail/640x0";
                        var u = a.get_fixed2(c.price);
                        c.price_int = u.split(".")[0],
                        c.price_decimal = u.split(".")[1],
                        200 == c.type ? (c.is_groupbuy = "icon-groupbuy", u = a.get_fixed2(c.group_price), c.price_int = u.split(".")[0], c.price_decimal = u.split(".")[1]) : 300 == c.type ? c.is_coupon = "icon-coupon": c.enable_score && (c.is_score = "icon-score")
                    }
                    var l = Mustache.render(i, {
                        commodities: t
                    });
                    o.prev(".list").append(l)
                }
                e.on_group_get_more = !1
            }), t.preventDefault())
        },
        peak_payment: function() {
            var t = '<div class="peak-payment-display"><div class="tip">第三方支付是指：买方付款后，交易款将暂时处于冻结状态；买方确认收货后，交易款解除冻结状态，买方在约定期限内未进行处理的，系统自动确认后交易款解除冻结状态。</div><div data-role="confirm" class="confirm">好的，我知道了</div></div>';
            o.display({
                content: t,
                tag: "[data-role='confirm']",
                confirm: function() {}
            })
        },
        switch_category: function(t) {
            var e = $(t.currentTarget);
            "group" != e.data("role") && "all" != e.data("role") || e.siblings().removeClass("cur"),
            e.addClass("cur")
        },
        go_top: function() {
            return $(document.body).animate({
                scrollTop: 0
            },
            800),
            !1
        },
        get_more_commodities: function() {
            var t = this,
            e = {};
            e.is_online = !0,
            e.offset = t.count,
            e.limit = r,
            e.category_id = t.data.group_id ? t.data.group_id: "",
            e.type = 100,
            e.attach_score = !0,
            t._API.get_commodities(e,
            function(e) {
                t.count = t.count + e.length;
                for (var o = 0; o < e.length; o++) {
                    var r = e[o];
                    r.thumb = !r.avatar || "http://pic.kuaizhan.com" != r.avatar.substr(0, 23) && "https://pic.kuaizhan.com" != r.avatar.substr(0, 24) ? r.avatar: r.avatar + "/imageView/v1/thumbnail/640x0",
                    300 == r.type ? r.is_coupon = "icon-coupon": r.enable_score && (r.is_score = "icon-score");
                    var n = a.get_fixed2(r.price);
                    r.price_int = n.split(".")[0],
                    r.price_decimal = n.split(".")[1]
                }
                var s = Mustache.render(i, {
                    commodities: e
                });
                t.$el.find(".list").append(s),
                $(".sui-center-tip").fadeOut(),
                t.on_get_more = !1
            })
        }
    })
});
define("templates/order_page.html", [],
function() {
    return '<div class="myapp myapp-comifrm-order">\n\n    <div class="info-wrp">\n        <div class="adress-wrp">\n            <div class="icon-adress"></div>\n            <div class="content">\n                <div class="label">收货信息</div>\n                <div class="row"><div class="row-label">收货人：</div><div class="row-text">小红 131313131</div></div>\n                <div class="row"><div class="row-label">收货地址：</div><div class="row-text">小红 131313131</div>address</div>\n            </div>\n        </div>\n    </div>\n\n    <div class="order-wrp" data-id="{{order[\'_id\']}}">\n        <div class="order-header">\n            <div class="title">{{shop[\'title\']}}</div>\n            <div class="icon-enter"></div>\n        </div>\n        <div class="container">\n            <div class="commodity-list">\n                % for commodity in order[\'commodities\']:\n                <div class="commodity-item">\n                    <div class="pic">\n                        <img src="{{commodity[\'avatar\']}}">\n                    </div>\n                    <div class="name">{{commodity[\'title\']}}</div>\n                    <div class="price">¥{{commodity[\'price\']}}</div>\n                    <div class="amount">X{{commodity[\'amount\']}}</div>\n                </div>\n                % end\n            </div>\n            <div class="freight-wrp clearfix">\n                <div class="label">运费</div>\n                <div class="price">¥{{order[\'freight\']}}</div>\n            </div>\n            <div class="message-wrp clearfix">\n                <div class="label">给卖家留言</div>\n                <div class="message">{{order[\'message\']}}</div>\n            </div>\n            <div class="allprice">共<span class="num">{{len(order[\'commodities\'])}}</span>件商品 实付款 <span class="price">¥{{order[\'price\']}}</span></div>\n        </div>\n    </div>\n\n    % if order[\'current_stage\'] == 100:\n    <div class="pay-wrp">\n        <div class="pay-header">支付方式</div>\n        <div class="pay-list">\n            <div class="item alipay">\n                <div class="pic"></div>\n                <div class="content">\n                    <div class="name">支付宝支付</div>\n                    <div class="tip">推荐有支付宝账户的买家使用</div>\n                </div>\n                <div class="choice"></div>\n            </div>\n            <div class="item wechat">\n                <div class="pic"></div>\n                <div class="content">\n                    <div class="name">微信支付</div>\n                    <div class="tip">推荐微信安装5.0及以上版本使用</div>\n                </div>\n                <div class="choice"></div>\n            </div>\n            <div class="item cash">\n                <div class="pic"></div>\n                <div class="content">\n                    <div class="name">货到付款</div>\n                    <div class="tip">推荐首次购买的买家使用</div>\n                </div>\n                <div class="choice"></div>\n            </div>\n        </div>\n    </div>\n     % end\n\n    % if order[\'current_stage\'] != -99 and order[\'current_stage\'] != 666 and order[\'current_stage\'] != 200:\n    <div class="bottom-wrp clearfix">\n        % if order[\'current_stage\'] == 100:\n        <div class="btn-pay">现在付款</div>\n        <div class="btn-cancle">取消订单</div>\n        <!-- <div class="btn-chat">联系卖家</div> -->\n        % end\n        % if order[\'current_stage\'] == 200:\n        <!-- <div class="btn-remind">提醒发货</div> -->\n        <!-- <div class="btn-chat">联系卖家</div> -->\n        % end\n        % if order[\'current_stage\'] == 300:\n        <div class="btn-finish">确认收货</div>\n        <!-- <div class="btn-freight">查看物流</div> -->\n        <!-- <div class="btn-chat">联系卖家</div> -->\n        % end\n    </div>\n    % end\n\n</div>'
});
define("views/order_page", ["templates/order_page.html"],
function(e) {
    var n = (SOHUZ.page.site_id, $("body")),
    i = {
        init: function() {},
        show: function(i) {
            n.append(Mustache.render(e, i))
        },
        hide: function() {}
    };
    return i
});
define("utils/img_swipe", [],
function() {
    function n(n, t) {
        "use strict";
        function e() {
            E = g.children,
            w = E.length,
            E.length < 2 && (t.continuous = !1),
            h.transitions && t.continuous && E.length < 3 && (g.appendChild(E[0].cloneNode(!0)), g.appendChild(g.children[1].cloneNode(!0)), E = g.children),
            m = new Array(E.length),
            p = n.getBoundingClientRect().width || n.offsetWidth;
            for (var e = E.length; e--;) {
                var i = E[e];
                i.style.display = "block",
                i.setAttribute("data-index", e),
                h.transitions && a(e, x > e ? -p: x < e ? p: 0, 0)
            }
            t.continuous && h.transitions && (a(s(x - 1), -p, 0), a(s(x + 1), p, 0)),
            h.transitions || (n.style.visibility = "visible")
        }
        function i() {
            x ? r(x - 1) : t.continuous && r(E.length - 1)
        }
        function o() {
            x < E.length - 1 ? r(x + 1) : t.continuous && r(0)
        }
        function s(n) {
            return (E.length + n % E.length) % E.length
        }
        function r(n, e) {
            if (x != n) {
                if (h.transitions) {
                    var i = Math.abs(x - n) / (x - n);
                    if (t.continuous) {
                        var o = i;
                        i = -m[s(n)] / p,
                        i !== o && (n = -i * E.length + n)
                    }
                    for (var r = Math.abs(x - n) - 1; r--;) a(s((n > x ? n: x) - r - 1), p * i, 0);
                    n = s(n),
                    a(x, p * i, e || b),
                    a(n, 0, e || b),
                    t.continuous && a(s(n - i), -(p * i), 0)
                } else c(x * -p, n * -p, e || b);
                x = n,
                f(t.callback(x, E[x]))
            }
        }
        function a(n, t, e) {
            u(n, t, e),
            m[n] = t
        }
        function u(n, t, e) {
            var i = E[n],
            o = i && i.style;
            o && (o.webkitTransitionDuration = o.MozTransitionDuration = o.msTransitionDuration = o.OTransitionDuration = o.transitionDuration = e + "ms", o.webkitTransform = "translate(" + t + "px,0)translateZ(0)", o.msTransform = o.MozTransform = o.OTransform = "translateX(" + t + "px)")
        }
        function c(n, e, i) {
            if (!i) return void(g.style.left = e + "px");
            var o = +new Date,
            s = setInterval(function() {
                var r = +new Date - o;
                return r > i ? (g.style.left = e + "px", y && d(), t.transitionEnd && t.transitionEnd.call(event, x, E[x]), void clearInterval(s)) : void(g.style.left = (e - n) * (Math.floor(r / i * 100) / 100) + n + "px")
            },
            4)
        }
        function d() {
            T = setTimeout(o, y)
        }
        function l() {
            y = t.auto > 0 ? t.auto: 0,
            clearTimeout(T)
        }
        var v = function() {},
        f = function(n) {
            setTimeout(n || v, 0)
        },
        h = {
            addEventListener: !!window.addEventListener,
            touch: "ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch,
            transitions: function(n) {
                var t = ["transitionProperty", "WebkitTransition", "MozTransition", "OTransition", "msTransition"];
                for (var e in t) if (void 0 !== n.style[t[e]]) return ! 0;
                return ! 1
            } (document.createElement("swipe"))
        };
        if (n) {
            var E, m, p, w, g = n.children[0];
            t = t || {};
            var x = parseInt(t.startSlide, 10) || 0,
            b = t.speed || 300;
            t.continuous = !t.continuous || t.continuous;
            var T, L, y = t.auto || 0,
            k = {},
            D = {},
            M = {
                handleEvent: function(n) {
                    switch (n.type) {
                    case "touchstart":
                        this.start(n);
                        break;
                    case "touchmove":
                        this.move(n);
                        break;
                    case "touchend":
                        f(this.end(n));
                        break;
                    case "webkitTransitionEnd":
                    case "msTransitionEnd":
                    case "oTransitionEnd":
                    case "otransitionend":
                    case "transitionend":
                        f(this.transitionEnd(n));
                        break;
                    case "resize":
                        f(e)
                    }
                    t.stopPropagation && n.stopPropagation()
                },
                start: function(n) {
                    var t = n.touches[0];
                    k = {
                        x: t.pageX,
                        y: t.pageY,
                        time: +new Date
                    },
                    L = void 0,
                    D = {},
                    g.addEventListener("touchmove", this, !1),
                    g.addEventListener("touchend", this, !1)
                },
                move: function(n) {
                    if (! (n.touches.length > 1 || n.scale && 1 !== n.scale)) {
                        t.disableScroll && n.preventDefault();
                        var e = n.touches[0];
                        D = {
                            x: e.pageX - k.x,
                            y: e.pageY - k.y
                        },
                        "undefined" == typeof L && (L = !!(L || Math.abs(D.x) < Math.abs(D.y))),
                        L || (n.preventDefault(), l(), t.continuous ? (u(s(x - 1), D.x + m[s(x - 1)], 0), u(x, D.x + m[x], 0), u(s(x + 1), D.x + m[s(x + 1)], 0)) : (D.x = D.x / (!x && D.x > 0 || x == E.length - 1 && D.x < 0 ? Math.abs(D.x) / p + 1 : 1), u(x - 1, D.x + m[x - 1], 0), u(x, D.x + m[x], 0), u(x + 1, D.x + m[x + 1], 0)))
                    }
                },
                end: function(n) {
                    var e = +new Date - k.time,
                    i = Number(e) < 250 && Math.abs(D.x) > 20 || Math.abs(D.x) > p / 2,
                    o = !x && D.x > 0 || x == E.length - 1 && D.x < 0;
                    t.continuous && (o = !1);
                    var r = D.x < 0;
                    L || (i && !o ? (r ? (t.continuous ? (a(s(x - 1), -p, 0), a(s(x + 2), p, 0)) : a(x - 1, -p, 0), a(x, m[x] - p, b), a(s(x + 1), m[s(x + 1)] - p, b), x = s(x + 1)) : (t.continuous ? (a(s(x + 1), p, 0), a(s(x - 2), -p, 0)) : a(x + 1, p, 0), a(x, m[x] + p, b), a(s(x - 1), m[s(x - 1)] + p, b), x = s(x - 1)), t.callback && t.callback(x, E[x])) : t.continuous ? (a(s(x - 1), -p, b), a(x, 0, b), a(s(x + 1), p, b)) : (a(x - 1, -p, b), a(x, 0, b), a(x + 1, p, b))),
                    g.removeEventListener("touchmove", M, !1),
                    g.removeEventListener("touchend", M, !1)
                },
                transitionEnd: function(n) {
                    parseInt(n.target.getAttribute("data-index"), 10) == x && (y && d(), t.transitionEnd && t.transitionEnd.call(n, x, E[x]))
                }
            };
            return e(),
            y && d(),
            h.addEventListener ? (h.touch && g.addEventListener("touchstart", M, !1), h.transitions && (g.addEventListener("webkitTransitionEnd", M, !1), g.addEventListener("msTransitionEnd", M, !1), g.addEventListener("oTransitionEnd", M, !1), g.addEventListener("otransitionend", M, !1), g.addEventListener("transitionend", M, !1)), window.addEventListener("resize", M, !1)) : window.onresize = function() {
                e()
            },
            {
                setup: function() {
                    e()
                },
                slide: function(n, t) {
                    l(),
                    r(n, t)
                },
                prev: function() {
                    l(),
                    i()
                },
                next: function() {
                    l(),
                    o()
                },
                stop: function() {
                    l()
                },
                getPos: function() {
                    return x
                },
                getNumSlides: function() {
                    return w
                },
                kill: function() {
                    l(),
                    g.style.width = "",
                    g.style.left = "";
                    for (var n = E.length; n--;) {
                        var t = E[n];
                        t.style.width = "",
                        t.style.left = "",
                        h.transitions && u(n, 0, 0)
                    }
                    h.addEventListener ? (g.removeEventListener("touchstart", M, !1), g.removeEventListener("webkitTransitionEnd", M, !1), g.removeEventListener("msTransitionEnd", M, !1), g.removeEventListener("oTransitionEnd", M, !1), g.removeEventListener("otransitionend", M, !1), g.removeEventListener("transitionend", M, !1), window.removeEventListener("resize", M, !1)) : window.onresize = null
                }
            }
        }
    }
    return n
});
define("utils/pop_scroll", [],
function() {
    function e(e) {
        e.preventDefault()
    }
    var o = {
        init: function(o, n) {
            $("body").css("overflow", "hidden"),
            $("body").on("touchmove", e),
            n.on("touchmove",
            function(e) {
                return e.preventDefault(),
                !1
            });
            var t, c;
            o.on("touchstart",
            function(e) {
                t = (e.changedTouches || e.originalEvent.changedTouches)[0].pageX,
                c = (e.changedTouches || e.originalEvent.changedTouches)[0].pageY
            }),
            o.on("touchmove",
            function(e) {
                e.stopPropagation();
                var o = (e.changedTouches || e.originalEvent.changedTouches)[0].pageX - t,
                n = (e.changedTouches || e.originalEvent.changedTouches)[0].pageY - c;
                return Math.abs(n) < Math.abs(o) ? (e.preventDefault(), !1) : $(this).height() + this.scrollTop >= this.scrollHeight && n < 0 ? (e.preventDefault(), !1) : 0 === this.scrollTop && n > 0 ? (e.preventDefault(), !1) : void 0
            })
        },
        clear: function() {
            $("body").css("overflow", "auto"),
            $("body").off("touchmove", e)
        }
    };
    return o
});
define("utils/model", ["sui", "utils/tools"],
function(e, t) {
    var i, a, l, s, n, o, r, d, c, u, f = function(e, i) {
        return i ? e: t.get_fixed2(e)
    },
    m = function(e) {
        var t;
        if (!i || u < c) return t = a.amount;
        var s = JSON.stringify(_.sortBy(e));
        for (var n in l) {
            var o = l[n];
            if (n == s) {
                t = o.amount;
                break
            }
        }
        return t
    },
    h = function(e) {
        var t, d = !1;
        if (!i || u < c) return 100 == s || r || 300 == s ? u < c ? (t = a.price_interval, d = !0) : t = a.price: 200 == s && (t = n && o ? a.group_header_price: a.group_price),
        f(t, d);
        var m = JSON.stringify(_.sortBy(e));
        for (var h in l) {
            var p = l[h];
            if (h == m) {
                100 == s || r ? t = p.price: 200 == s && (t = n && o ? a.group_header_price: a.group_price);
                break
            }
        }
        return f(t, !1)
    },
    p = function(e, t) {
        var i = e.length,
        a = $.extend(!0, [], t);
        if (! (0 != i && a.length > 0)) return e;
        for (var l = 0; l < e.length; l++) for (var s = e[l], n = 0; n < a.length; n++) {
            if (JSON.stringify(a[n]) == JSON.stringify(s)) return e.splice(l, 1),
            a.splice(n, 1),
            p(e, a);
            if (0 == a[n].length) return a.splice(n, 1),
            p(e, a)
        }
    },
    v = {
        $el: null,
        init: function(t) {
            function r(l) {
                var s = f.get_selected_models(),
                n = parseInt(p.val() || 1),
                o = a._id,
                r = {};
                if (i) {
                    if (! (s && s.length > 0)) return void e.tip("请选择规格");
                    for (var d = 0; d < s.length; d++) {
                        var c = s[d];
                        if (0 == c.length) break;
                        r[c[0]] = c[1]
                    }
                    if (d < s.length) return void e.tip("请选择规格")
                }
                var u = {
                    models: r,
                    amount: n,
                    commodity_id: o
                };
                f.validate(n) && t.click.call(null, u, l.data)
            }
            var f = this;
            a = t.data,
            l = t.data.model_details,
            s = t.type,
            c = t.data.models && t.data.models.length,
            100 == s && (d = t.only_use_score),
            200 == s && (o = t.is_group_header_discount, n = t.is_groupbuy_header),
            this.$el = t.$el,
            this.models = t.data.models,
            this.shop_setting = t.shop_setting,
            this.shop_setting && (this.shop_setting.score_to_one_yuan = this.shop_setting.score_to_one_yuan ? this.shop_setting.score_to_one_yuan: 1),
            this.limit = parseInt(f.$el.find(".num-wrp.clearfix").data("limit")),
            this.amount_empty_models = [];
            for (var m in l) {
                var _ = l[m];
                0 == _.amount && this.amount_empty_models.push(m)
            }
            if (c) {
                i = !0,
                u = 0,
                this.selected_models = [];
                for (var h = 0; h < c; h++) this.selected_models.push([])
            } else i = !1,
            this.set_amount(),
            this.set_price();
            f.$el.on("tap", ".model-box .close-wrp",
            function() {
                f.hide(),
                t.close.call(null)
            }),
            this.$el.on("change", '[data-role="price"]',
            function() {
                f.set_price()
            }),
            this.$el.on("change", ".amount",
            function() {
                f.set_amount()
            }),
            this.$el.on("change", '[data-role="commodity-amount"]',
            function() {
                f.set_left_amount()
            }),
            this.$el.on("change", ".cur-wrp",
            function(t, i) {
                if (!f.check_available()) return f.$el.find(".add").addClass("disable"),
                f.$el.find(".less").addClass("disable"),
                !1;
                var a = parseInt($(this).val()),
                l = f.get_amount(),
                s = 100;
                0 == l && (f.$el.find(".add").addClass("disable"), f.$el.find(".less").addClass("disable"), a = 0),
                "add" == i ? a += 1 : "less" == i && (a -= 1),
                a > l || a > s ? (e.tip("购买数量不能超过" + (l > s ? s: l)), a = l > s ? s: l, f.$el.find(".add").addClass("disable")) : f.limit && a > f.limit ? (e.tip("该商品限购" + f.limit + "件"), a = f.limit, f.$el.find(".add").addClass("disable")) : 0 == a ? f.$el.find(".less").addClass("disable") : (f.$el.find(".add").removeClass("disable"), f.$el.find(".less").removeClass("disable")),
                $(this).val(a),
                f.set_left_amount(parseInt(l) - parseInt(a))
            });
            var p = f.$el.find(".num-box .cur-wrp");
            this.$el.on("tap", ".num-box .less",
            function(e) {
                var t = $(e.currentTarget);
                return ! t.hasClass("disable") && ( !! f.check_available() && void p.trigger("change", "less"))
            }),
            this.$el.on("tap", ".num-box .add",
            function(e) {
                var t = $(e.currentTarget);
                return ! t.hasClass("disable") && ( !! f.check_available() && void p.trigger("change", "add"))
            }),
            this.$el.on("tap", '.model-box [data-role="confirm"]', r).on("tap", '.model-box [data-role="btn-tobuy"]', r).on("tap", '.model-box [data-role="btn-towish"]', !0, r),
            this.$el.on("tap", ".model-box .model_type",
            function(e) {
                var t = $(e.currentTarget),
                i = t.parent(),
                a = i.closest(".model_list").index(),
                l = t.index();
                f.set_type_selected(a, l)
            })
        },
        validate: function(t) {
            var i = this;
            if (!i.check_available) return e.tip("请选择规格"),
            !1;
            if (0 == t) return e.tip("购买数量不能为0"),
            !1;
            if (isNaN(t)) return e.tip("购买数量必须为数字"),
            !1;
            if (i.limit && t > i.limit) return e.tip("该商品的限购" + i.limit + "件"),
            !1;
            var a = i.get_amount();
            return ! (a < t || t > 100) || (e.tip("购买数量不能大于" + (a > 100 ? 100 : a)), !1)
        },
        show: function(e) {
            var t = this;
            r = !e,
            t.$el.find(".model-box").fadeIn(),
            this.models.forEach(function(e, i) {
                1 == e[1].length && (t.$el.find(".model-box .model_list").eq(i).find(".model_type").eq(0).hasClass("hover") || t.set_type_selected(i, 0))
            }),
            200 == s ? (r ? t.$el.find(".num-wrp").show() : t.$el.find(".num-wrp").hide(), t.set_price()) : 100 == s && d && t.set_price(),
            t.$el.find(".model-box").fadeIn(),
            i || t.set_buy_num()
        },
        hide: function() {
            var e = this;
            e.$el.find(".model-box").fadeOut()
        },
        get_selected_models: function() {
            var e = this;
            return e.selected_models
        },
        set_groupbuy_header: function(e) {
            n = !!e && e
        },
        has_models: function() {
            return i
        },
        set_type_selected: function(e, t) {
            var i = this,
            a = this.$el.find(".model-box .model_list").eq(e).find(".model_type").eq(t || 0),
            l = [a.closest(".model").data("model"), a.data("type").toString()],
            s = l;
            if (a.hasClass("hover")) a.removeClass("hover"),
            this.selected_models.forEach(function(e, t) {
                JSON.stringify(e) == JSON.stringify(s) && i.selected_models.splice(t, 1, [])
            }),
            a.closest(".model_list").removeClass("selected"),
            u--;
            else {
                if (a.hasClass("disable")) return;
                _.some(a.siblings(),
                function(e) {
                    return $(e).hasClass("hover")
                }) || u++,
                a.siblings().removeClass("hover"),
                a.addClass("hover"),
                a.closest(".model_list").addClass("selected"),
                this.selected_models[e] = s
            }
            i.$el.find('[data-role="price"]').trigger("change"),
            i.$el.find('[data-role="amount"]').trigger("change"),
            i.check_model()
        },
        set_buy_num: function(e) {
            var t = this;
            if (!e) var e = m(t.selected_models);
            e >= 1 && (!t.limit || t.limit >= 1) ? t.$el.find(".num-box .cur input").val(1).trigger("change") : t.$el.find(".cur-wrp").val(0).trigger("change")
        },
        set_price: function() {
            var e = this,
            t = h(e.selected_models);
            if (a.only_use_score && a.enable_score) if (i && u < c) {
                var l = [];
                t.split("-").forEach(function(t) {
                    l.push(Math.ceil(parseFloat($.trim(t)).toFixed(2) * e.shop_setting.score_to_one_yuan))
                }),
                e.$el.find(".model-box .price").html('<span data-role="price">' + l[0] + "积分 - " + l[1] + "积分</span>")
            } else {
                var d = Math.ceil(parseFloat(t).toFixed(2) * e.shop_setting.score_to_one_yuan);
                e.$el.find(".model-box .price").html('<span data-role="price">' + d + "积分</span>")
            } else t ? this.$el.find('[data-role="price"]').html(t) : 100 == s || r ? this.$el.find('[data-role="price"]').html(a.price_interval) : 200 == s && (n && o ? this.$el.find('[data-role="price"]').html(a.group_header_price) : this.$el.find('[data-role="price"]').html(a.group_price))
        },
        get_price: function() {
            return parseFloat(this.$el.find('[data-role="price"]').data("val"))
        },
        set_amount: function() {
            var e = this,
            t = m(e.selected_models);
            e.$el.find('[data-role="amount"]').data("val", t),
            e.$el.find('[data-role="amount"]').text(t),
            e.set_buy_num(t)
        },
        set_left_amount: function(e) {
            var t = this;
            t.$el.find('[data-role="commodity-amount"]').data("val", e),
            t.$el.find('[data-role="commodity-amount"]').text(e)
        },
        get_left_amount: function() {
            return parseInt(this.$el.find('[data-role="amount"]').data("val"))
        },
        get_amount: function() {
            return parseInt(this.$el.find('[data-role="amount"]').data("val"))
        },
        check_available: function() {
            var e = this;
            return e.$el.find(".model-box .model_list .disable").removeClass("disable"),
            i ? u == c ? (e.$el.find(".add").removeClass("disable"), e.$el.find(".less").removeClass("disable"), !0) : (e.$el.find(".add").addClass("disable"), e.$el.find(".less").addClass("disable"), !1) : (e.$el.find(".add").removeClass("disable"), e.$el.find(".less").removeClass("disable"), !0)
        },
        check_model: function() {
            var e = this;
            if (u + 1 == c) for (var t in e.amount_empty_models) {
                var i = e.amount_empty_models[t],
                a = p(JSON.parse(i), e.selected_models);
                if (a && 0 != a.length) {
                    var l = e.$el.find('.model-box .model_list:not(".selected")');
                    console.log("unselected row", l),
                    l.find(".model_type").each(function(e, t) {
                        var i = a[0][1];
                        $(t).data("type") == i && $(t).addClass("disable")
                    })
                }
            }
        }
    };
    return v
});
define("controllers/CommodityViewController", ["global", "controllers/baseview", "utils/mask", "views/order_page", "utils/img_swipe", "sui", "utils/wx", "utils/validate", "utils/pop_scroll", "utils/model"],
function(i, e, t, o, s, n, r, a, d, l) {
    return e.extend({
        el: ".myapp",
        data: {},
        shop_setting: {},
        initialize: function(e) {
            var t = this;
            if (this._init({
                dont_config_wx_share: !0
            }), this.data = this.$el.data("val"), this.shop_setting = this.$el.data("shops_setting"), this.data.model_details = this.getJSON_encode(this.data.model_details), l.init({
                $el: this.$el,
                data: this.data,
                type: 100,
                only_use_score: this.data.only_use_score,
                shop_setting: this.shop_setting,
                click: function(i, e) {
                    console.log(i, e),
                    t.is_cart || e ? t.create_wishes(i) : t.create_order(i)
                },
                close: function() {
                    t.hide_box()
                }
            }), this.render(), i.is_weixin) {
                var o = this.$el.find(".swipe-item").eq(0).find("img").attr("src"),
                s = this.data.title,
                n = "看我发现了特别赞的商品",
                a = window.location.href;
                r.config_share(n, s, o, a, {
                    timeline_title: s
                })
            }
        },
        render: function() {
            var i = this,
            e = i.$el.find(".images").find(".focus-ctr").find("span").length;
            i.$el.find(".images").find(".focus-ctr").find("span").eq(0).addClass("cur"),
            s(i.$el.find(".swipe")[0], {
                startSlide: 0,
                speed: 400,
                auto: 3e3,
                continuous: !0,
                disableScroll: !1,
                stopPropagation: !1,
                callback: function(i, e) {
                    $(e).parents(".images").find(".focus-ctr").eq(i).addClass("cur").siblings().removeClass("cur")
                },
                transitionEnd: function(i, t) {
                    2 == e && i >= 2 ? $(t).parents(".images").find(".focus-ctr").find("span").removeClass("cur").eq(i - 2).addClass("cur") : $(t).parents(".images").find(".focus-ctr").find("span").removeClass("cur").eq(i).addClass("cur")
                }
            }),
            i.mask = new t({
                onclick: function() {
                    i.hide_box(),
                    l.hide()
                }
            }),
            i.$el.find(".model-box").bind("touchmove",
            function() {
                return ! 1
            })
        },
        events: {
            "tap .bottom .btn-towish": "show_box_buycar",
            "tap .bottom .btn-buy": "show_box_buy",
            "tap .choice-type": "show_box_choice",
            "tap .disable-qq": "disable_qq",
            'tap [data-role="more-promotion"]': "get_promotion"
        },
        get_promotion: function() {
            var i = "";
            if (this.$el.find('[data-role="delivery-free"]').size() > 0) {
                var e = this.$el.find('[data-role="delivery-free"]').html();
                i += '<div class="delivery-free item">' + e + "</div>"
            }
            if (this.$el.find('[data-role="full-to-off"]').size() > 0) {
                var t = this.$el.find('[data-role="full-to-off"]').html();
                i += '<div class="full-to-off item">' + t + "</div>"
            }
            var o = {
                content: '<div class="promotion-detail" ><h3>促销信息</h3>' + i + '<div data-role="close" class="close"></div></div>',
                tag: '[data-role="close"]'
            };
            i && n.slider_dis(o).show()
        },
        disable_qq: function() {
            n.tip("客服不在线,客官请稍候~~")
        },
        choice_model_type: function(i) {
            var e = $(i.currentTarget),
            t = e.parent(),
            o = t.closest(".model_list").index(),
            s = e.index();
            return console.log("row", o, "column", s),
            l.set_type_selected(o, s),
            !1
        },
        create_order: function(i) {
            var e = this,
            t = {};
            return t.commodities = [],
            t.commodities.push(i),
            t.commodities = JSON.stringify(t.commodities),
            e._API.create_pre_order(t,
            function(i) {
                setTimeout(function() {
                    location.href = "/shop/shops/" + SOHUZ.page.shop_id + "/create-order?preorder_id=" + i.preorder_id
                },
                600)
            },
            function(i) {
                n.tip(i.msg)
            }),
            !1
        },
        create_wishes: function(e) {
            var t = this;
            return e.models = JSON.stringify(e.models),
            i.auth(function() {
                t._API.create_wishes(e,
                function(i) {
                    t.hide_box(),
                    l.hide(),
                    n.tip({
                        msg: "已加入购物车"
                    })
                })
            }),
            !1
        },
        show_box_buycar: function() {
            var i = this;
            return !! i.data.is_online && (i.is_cart = !0, i.show_box(), i.$el.find(".confirm-wrp").hide(), i.$el.find('[data-role="confirm"]').show().attr("class", "btn-towish"), !1)
        },
        show_box_buy: function() {
            var i = this;
            return !! i.data.is_online && (i.is_cart = !1, i.show_box(), i.$el.find(".confirm-wrp").hide(), i.$el.find('[data-role="confirm"]').show().attr("class", "btn-tobuy"), !1)
        },
        show_box_choice: function() {
            var i = this;
            return i.show_box(),
            i.$el.find('[data-role="confirm"]').hide(),
            i.$el.find(".confirm-wrp").show(),
            !1
        },
        show_box: function() {
            var i = this;
            return i.$el.find(".bottom").hide(),
            i.mask.show(),
            l.show(),
            d.init(i.$el.find(".model-box .scrollable-wrp"), i.$el.find(".model-box")),
            !1
        },
        hide_box: function() {
            var i = this;
            return i.$el.find(".bottom").show(),
            i.mask.hide(),
            d.clear(),
            !1
        }
    })
});
define("templates/temp_order_waitpay.html", [],
function() {
    return '{{#orders}}\n<div class="order-list" data-id="{{_id}}">\n    <div class="tnav">\n        <div class="name">{{title}}</div>\n        <div class="state">{{_state}}</div>\n    </div>\n    <div class="itemlist">\n        {{#commodities}}\n        <li class="item">\n            <div class="pic"><img src="{{avatar}}"></div>\n            <div class="name">{{title}}</div>\n        </li>\n        {{/commodities}}\n    </div>\n    <div class="bottom">\n        <div class="btn-seller">联系卖家</div>\n        {{#isclose}}{{/isclose}}\n\n        {{#ispaid}}\n        <div class="btn-cancle">取消订单</div>\n        <div class="btn-paid">现在付款</div>\n        {{/ispaid}}\n\n\n        {{#issend}}{{/issend}}\n        {{#isshipping}}\n        <div class="btn-finish">确认收货</div>\n        {{/isshipping}}\n        {{#isfinished}}{{/isfinished}}\n\n    </div>\n</div>\n{{/orders}}\n'
});
define("controllers/BuyerViewController", ["global", "controllers/baseview", "templates/temp_order_waitpay.html"],
function(r, e, t) {
    return e.extend({
        el: ".myapp-buyer",
        data: {},
        initialize: function(r) {
            this._init(),
            this.data.shop = this.$el.data("shop"),
            this.render()
        },
        render: function() {},
        events: {
            "tap .order-list .btn-paid": "pay_order",
            "tap .order-list .btn-cancle": "close_order",
            "tap .order-list .btn-finish": "finish_order"
        },
        pay_order: function(r) {
            var e = this,
            t = $(r.currentTarget).parents(".order-list"),
            n = t.data("id");
            return e._API.pay_order(n,
            function(r) {
                console.log(r)
            }),
            !1
        },
        close_order: function(r) {
            var e = this,
            t = $(r.currentTarget).parents(".order-list"),
            n = t.data("id");
            return e._API.close_order(n,
            function(r) {
                console.log(r)
            }),
            !1
        },
        finish_order: function(r) {
            var e = this,
            t = $(r.currentTarget).parents(".order-list"),
            n = t.data("id");
            return e._API.finish_order(n,
            function(r) {
                console.log(r)
            }),
            !1
        }
    })
});
define("templates/buyer_order_list.html", [],
function() {
    return '{{#orders}}\n        <div class="order-item" data-data="{{encode_json(orders)}}">\n            <a href="/shop/shops/{{shop_id}}">\n                <div class="order-header">\n                    <div class="icon-header"></div>\n                    <div class="title">{{shop_title}}</div>\n                    <div class="icon-enter"></div>\n                    <!--如果有退款信息显示退款信息-->\n                    {{#_refund_state_text}}\n                    <div class="stage-text">{{_refund_state_text]}}</div>\n                    {{/_refund_state_text}}\n                    {{^_refund_state_text}}\n                    <div class="stage-text">{{_current_stage_text}}</div>\n                    {{/_refund_state_text}}\n\n                </div>\n            </a>\n            <a href="/shop/order-detail/{{_id}}">\n                {{#single_commodity}}\n                <div class="commodity-list clearfix">\n                    {{#commodities}}\n                    <div class="commodity-item">\n                        <div class="pic">\n                            <img src="{{avatar}}/imageView/v1/thumbnail/200x200">\n                            {{#is_coupon_commodity}}\n                            <div class="icon icon-coupon"></div>\n                            {{/is_coupon_commodity}}\n                            {{#is_groupbuy_commodity}}\n                            <div class="icon icon-groupbuy"></div>\n                            {{/is_groupbuy_commodity}}\n                            {{#is_score_commodity}}\n                            <div class="icon icon-score"></div>\n                            {{/is_score_commodity}}\n                        </div>\n                        <div class="info">\n                            <div class="name">{{title}}</div>\n                            <div class="models">{{html_models}}</div>\n                        </div>\n                    </div>\n                    {{/commodities}}\n                </div>\n                {{/single_commodity}}\n                {{^single_commodity}}\n                <div class="commodity-list commodity-list-horizon">\n                    <div class="commodities-wrapper clearfix">\n                        {{#commodities}}\n                        <div class="pic">\n                            <img src="{{avatar}}/imageView/v1/thumbnail/200x200">\n                            {{#is_coupon_commodity}}\n                            <div class="icon icon-coupon"></div>\n                            {{/is_coupon_commodity}}\n                            {{#is_groupbuy_commodity}}\n                            <div class="icon icon-groupbuy"></div>\n                            {{/is_groupbuy_commodity}}\n                            {{#is_score_commodity}}\n                            <div class="icon icon-score"></div>\n                            {{/is_score_commodity}}\n                        </div>\n\n                        {{/commodities}}\n                    </div>\n                </div>\n                {{/single_commodity}}\n            </a>\n            <div class="allprice">\n                <span>共<i class="num">{{_all_amount}}</i>件商品, </span><span>合计 </span>\n                {{^is_pure_score}}\n                <span class="price">￥ <span class="int">{{price_int}}.</span><span class="decimal">{{price_decimal}}</span></span>\n                {{/is_pure_score}}\n                {{#is_pure_score}}\n\n                <span class="price">{{_all_score}}积分\n                    {{#freight}}\n                    + {{freight}}\n                    {{/freight}}\n                </span>\n                {{/is_pure_score}}\n            </div>\n            {{#is_bottom_show}}\n            <!--% if stage and shop.get(\'is_online\') and order.get(\'groupbuy_state\') != 100 and stage != 95 and stage != -99 and stage != 666 :-->\n            <div class="bottom-wrp clearfix">\n                {{#_is_unpaid}}\n                <a href="javascript:;" data-href="/shop/shops/{{shop[\'_id\']}}/order-pay/{{order[\'_id\']}}" class="btn-pay">现在付款</a>\n                <div class="btn-cancel">取消订单</div>\n                {{/_is_unpaid}}\n                {{#_is_paid}}\n                    {{#_cancelable}}\n                    <a class="btn-cancel">取消订单</a>\n                    {{/_cancelable}}\n                {{/_is_paid}}\n                {{#_is_shipping}}\n                    {{^is_coupon}}\n                    <div class="btn-finish">确认收货</div>\n                    {{/is_coupon}}\n                    {{#_cancelable}}\n                    <a class="btn-cancel">取消订单</a>\n                    {{/_cancelable}}\n                {{/_is_shipping}}\n            </div>\n            {{/is_bottom_show}}\n        </div>\n    </div>\n{{/orders}}'
});
define("controllers/BuyerOrderViewController", ["global", "controllers/baseview", "templates/buyer_order_list.html", "sui"],
function(e, t, r, n) {
    return t.extend({
        el: ".myapp",
        initialize: function(e) {
            var t = this;
            this._init(),
            this.render(),
            this.page = 1,
            this.count = this.$el.find(".order-item").size(),
            this.all_loaded = !1,
            this.on_get_more = !1,
            $(window).scroll(function() {
                $(window).scrollTop() + $(window).height() > $(document).height() - 20 && !t.on_get_more && !t.all_loaded && (t.on_get_more = !0, t.page++, console.log("page:", t.page), t.get_my_orders(), n.showWaiting("加载中…", 600))
            });
            var r, i = location.search ? location.search.split("?")[1].split("=")[1] : "";
            i ? 100 == i ? r = 1 : 200 == i ? r = 2 : 300 == i ? r = 3 : 666 == i ? r = 4 : i == -99 ? r = 5 : 95 == i && (r = 6) : r = 0;
            var o = t.$el.find(".nav-li").size(),
            a = new Swiper(".order-nav", {
                direction: "horizontal",
                slidesPerView: 5,
                onInit: function(e) {
                    r > 0 && r - 2 >= 0 && r + 2 <= o && e.slideTo(r - 2, 500)
                },
                onTap: function(e) {
                    var t = e.clickedIndex;
                    t > 0 && t - 2 >= 0 && t + 2 <= o && a.slideTo(t - 2, 500)
                }
            })
        },
        render: function() {
            var e = this,
            t = "";
            location.search && (t = location.search.split("?")[1].split("=")[1]),
            e.$el.find('a.nav-li[data-state = "' + t + '"]').trigger("tap")
        },
        events: {
            "tap .order-item .btn-cancel": "order_cancel",
            "tap .order-item .btn-finish": "order_finish",
            "tap .btn-pay": "order_pay",
            "tap a.nav-li": "select_state"
        },
        select_state: function(e) {
            var t = this;
            this.page = 1,
            t.count = 0,
            t.all_loaded = !1,
            t.on_get_more = !1,
            $(e.currentTarget).closest("a").siblings().removeClass("hover"),
            $(e.currentTarget).closest("a").addClass("hover"),
            t.current_stage = parseInt($(e.currentTarget).data("state")),
            t.current_stage ? window.history.replaceState(null, null, "?current_stage=" + t.current_stage) : window.history.replaceState(null, null, ""),
            this.$el.find(".order-wrp").html(""),
            n.showWaiting("加载中…", 800),
            this.get_my_orders()
        },
        get_my_orders: function() {
            var e = this,
            t = {};
            t.offset = e.count,
            t.limit = 32,
            e.current_stage && (t.current_stage = e.current_stage);
            var i = this.$el.find(".order-wrp");
            this._API.get_my_orders(t,
            function(t) {
                return n.isWaiting() && n.closeWaiting(),
                e.count > 0 && 0 == t.length && (e.all_loaded = !0),
                0 == e.count && 0 == t.length ? void i.html('<div class="icon-empty order-empty"></div><div class="empty-desc">您还没有相关订单</div>') : (e.count = e.count + t.length, i.append(Mustache.render(r, {
                    orders: t
                })), void(e.on_get_more = !1))
            },
            function(e) {
                n.isWaiting() && n.closeWaiting(),
                n.tip(e.msg)
            })
        },
        order_pay: function(e) {
            var t = this,
            r = $(e.currentTarget);
            return t.$el.data("shop").alipay_payment || t.$el.data("shop").wx_payment ? n.confirm({
                msg: "付款后，资金直接进入卖家账户。如需退款换货，请与卖家联系，快站不介入交易纠纷处理。",
                confirm: function() {
                    location.href = r.data("href")
                }
            }) : location.href = r.data("href"),
            !1
        },
        order_cancel: function(e) {
            var t = this,
            r = $(e.currentTarget).parents(".order-item"),
            i = r.data("data"),
            o = i._id;
            if ($(e.currentTarget).hasClass("disable")) return ! 1;
            if ("peak" === i.payment) {
                if (i.is_coupon) return n.confirm({
                    msg: "确认退款，未使用的团购卷将自动作废，支付货款将原路径退回",
                    confirm: function() {
                        t._API.coupon_refund(o,
                        function(e) {
                            location.reload()
                        })
                    }
                }),
                !1;
                location.href = "/shop/order-refund/" + o
            } else n.confirm({
                msg: "确认取消订单",
                confirm: function() {
                    t._API.close_order(o, {},
                    function(e) {
                        r.slideUp(200,
                        function() {
                            r.remove()
                        })
                    })
                }
            });
            return ! 1
        },
        order_finish: function(e) {
            var t = this,
            r = $(e.currentTarget).parents(".order-item"),
            i = r.data("data"),
            o = i._id;
            return n.confirm({
                msg: "确认收货",
                confirm: function() {
                    t._API.finish_order({
                        id: o
                    },
                    function(e) {
                        r.slideUp(200,
                        function() {
                            r.remove()
                        })
                    })
                }
            }),
            !1
        }
    })
});
define("controllers/OrderDetailViewController", ["global", "controllers/baseview", "sui", "utils/mask"],
function(e, n, r, o) {
    return n.extend({
        el: ".myapp",
        data: {},
        mask: null,
        initialize: function(e) {
            var n = this;
            this.data = e,
            this._init(),
            this.render(),
            n.mask = new o({
                onclick: function() {
                    n.hide_vrcode()
                }
            })
        },
        render: function() {},
        events: {
            "tap .pay-list .item": "choice_pay",
            "tap .btn-cancel": "order_cancel",
            "tap .btn-finish": "order_finish",
            "tap .btn-pay": "order_pay",
            "tap .coupon-item .vrcode": "show_vrcode"
        },
        order_pay: function(n) {
            var o = this,
            i = $(n.currentTarget);
            return o.$el.data("shop").alipay_payment || o.$el.data("shop").wx_payment ? r.confirm({
                msg: "付款后，资金直接进入卖家账户。如需退款换货，请与卖家联系，快站不介入交易纠纷处理。",
                confirm: function() {
                    location.href = i.data("href") + "?wx_native=" + e.is_weixin
                }
            }) : location.href = i.data("href") + "?wx_native=" + e.is_weixin,
            !1
        },
        choice_pay: function(e) {
            var n = $(e.currentTarget),
            r = n.parent();
            return r.find(".hover").removeClass("hover"),
            n.addClass("hover"),
            !1
        },
        order_cancel: function(e) {
            var n = this,
            o = n.data.order_id,
            i = n.$el.find(".order-wrp").data("data");
            if ($(e.currentTarget).hasClass("disable")) return ! 1;
            if ("peak" === i.payment) {
                if (i.is_coupon) return r.confirm({
                    msg: "确认退款，未使用的团购卷将自动作废，支付货款将原路径退回",
                    confirm: function() {
                        n._API.coupon_refund(o,
                        function(e) {
                            location.reload()
                        })
                    }
                }),
                !1;
                location.href = "/shop/order-refund/" + o
            } else r.confirm({
                msg: "确认取消订单",
                confirm: function() {
                    n._API.close_order(o, {},
                    function(e) {
                        window.location.href = "/shop/sites/" + SOHUZ.page.site_id + "/buyer-order"
                    })
                }
            });
            return ! 1
        },
        order_finish: function(e) {
            function n(e) {
                e = e.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
                var n = new RegExp("[\\?&]" + e + "=([^&#]*)"),
                r = n.exec(location.search);
                return null === r ? "": decodeURIComponent(r[1].replace(/\+/g, " "))
            }
            var o = this,
            i = o.$el.find(".order-wrp").data("data"),
            t = i._id,
            a = n("tel");
            return a ? r.sms_confirm({
                title: "",
                confirm_text: "确认收货",
                data: {
                    order_id: t,
                    mobile: a
                },
                confirm: function(e) {
                    o._API.finish_order({
                        id: t,
                        mobile: a,
                        vcode: e
                    },
                    function(e) {
                        location.href = "/shop/sites/" + SOHUZ.page.site_id + "/buyer-order?current_stage=666"
                    },
                    function(e) {
                        console.log(e)
                    })
                }
            }) : r.confirm({
                msg: "确认收货",
                confirm: function() {
                    o._API.finish_order({
                        id: t
                    },
                    function(e) {
                        location.href = "/shop/sites/" + SOHUZ.page.site_id + "/buyer-order?current_stage=666"
                    },
                    function(e) {
                        r.tip(e.msg)
                    })
                }
            }),
            !1
        },
        show_vrcode: function(e) {
            var n = this,
            r = $(e.currentTarget).data("id");
            n.mask.show(),
            n.$el.find(".coupon-vrcode img").attr("src", "//www.kuaizhan.com/common/encode-png?data=" + r),
            n.$el.find(".coupon-vrcode").show()
        },
        hide_vrcode: function() {
            var e = this;
            e.mask.hide(),
            e.$el.find(".coupon-vrcode").hide()
        }
    })
});
define("controllers/WishesViewController", ["global", "controllers/baseview", "sui"],
function(e, i, t) {
    return i.extend({
        el: ".myapp-buyerwishes",
        default_address: "",
        initialize: function(e) {
            var i = this;
            this._init(),
            this.render(),
            this._API.get_default_address(function(e) {
                i.default_address = e
            })
        },
        render: function() {},
        events: {
            "tap .wishes-list .item": "choice_one",
            "tap .btn-del": "del_wishes",
            "tap .btn-buy": "create_order",
            "tap .edit": "to_edit",
            "tap .edit-finish": "edit_finish",
            "tap .choice-all": "choice_all",
            "tap. .num-box .less": "less_item",
            "tap. .num-box .add": "add_item",
            "tap .btn-del-item": "del_item"
        },
        del_item: function(e) {
            var i = this,
            r = $(e.currentTarget).parents(".item"),
            n = r.data("id");
            return t.confirm({
                msg: "确认删除",
                confirm: function() {
                    i._API.del_wishes(n,
                    function(e) {
                        $(r).slideUp(200,
                        function() {
                            $(r).remove(),
                            i.checknone()
                        })
                    })
                }
            }),
            !1
        },
        less_item: function(e) {
            var i = this,
            t = $(e.currentTarget).parents(".item"),
            r = parseInt(t.find(".cur-wrp").text()) - 1,
            n = parseInt(t.data("limit"));
            return n ? i.item_change_num(t, r, n) : i.item_change_num(t, r),
            !1
        },
        add_item: function(e) {
            var i = this,
            t = $(e.currentTarget).parents(".item"),
            r = parseInt(t.find(".cur-wrp").text()) + 1,
            n = parseInt(t.data("limit"));
            return n ? i.item_change_num(t, r, n) : i.item_change_num(t, r),
            !1
        },
        item_change_num: function() {
            var e = arguments[0],
            i = arguments[1],
            t = arguments[2] ? arguments[2] : -1,
            r = parseFloat(e.data("now_unit_price")),
            n = parseInt(e.data("now_amount")),
            s = e.find(".cur-wrp").text();
            if (0 === i) return ! 1;
            if (i > n) return ! 1;
            if (1 == i ? e.find(".less").addClass("disable") : e.find(".less").removeClass("disable"), i >= n ? e.find(".add").addClass("disable") : e.find(".add").removeClass("disable"), t != -1) {
                if (i >= t && i > s && (e.find(".add").addClass("disable"), i > t)) return ! 1;
                i >= t && i < s && e.find(".add").addClass("disable")
            }
            e.find(".cur-wrp").text(i),
            e.find(".num").html("X" + i),
            e.find(".price").data("price", (r * i).toFixed(2)),
            e.find(".num").data("amount", i)
        },
        choice_all: function(e) {
            var i = this,
            r = $(e.currentTarget),
            n = $(e.currentTarget).parents(".wishes-list");
            return i.order_shopid && n.data("id") != i.order_shopid ? (t.tip("不能选择不同店铺的商品"), !1) : (r.hasClass("hover") ? (r.removeClass("hover"), n.find(".item").each(function() {
                $(this).removeClass("hover")
            }), i.order_shopid = null) : (r.addClass("hover"), n.find(".item").each(function() { ! n.hasClass("in_edit") && ($(this).hasClass("error") || $(this).hasClass("error2") || $(this).hasClass("error3")) || $(this).addClass("hover")
            }), i.order_shopid = n.data("id")), void i.change_all())
        },
        to_edit: function(e) {
            var i = this,
            t = $(e.currentTarget),
            r = t.parents(".wishes-list");
            r.find(".edit").hide(),
            r.find(".edit-finish").show(),
            r.addClass("in_edit"),
            i.$el.find(".btn-buy").hide(),
            i.$el.find(".btn-del").show(),
            i.$el.find(".all-price").hide()
        },
        edit_finish: function(e) {
            var i = this,
            t = $(e.currentTarget),
            r = t.parents(".wishes-list");
            r.find(".edit").show(),
            r.find(".edit-finish").hide(),
            r.removeClass("in_edit"),
            i.$el.find(".btn-buy").show(),
            i.$el.find(".btn-del").hide(),
            i.$el.find(".all-price").show(),
            r.find(".item.error2").each(function() {
                var e = $(this),
                i = e.data("now_amount"),
                t = e.find(".num").data("amount");
                t <= i && (e.removeClass("error2"), e.find(".error-text").hide())
            }),
            r.find(".item.error3").each(function() {
                var e = $(this),
                i = parseInt(e.data("limit"));
                if (i) {
                    var t = parseInt(e.find(".num").data("amount"));
                    t <= i && (e.removeClass("error3"), e.find(".error-text").hide())
                }
            }),
            i.change_all()
        },
        create_order: function(e) {
            var i = this,
            r = {},
            n = i.$el.find(".item.hover");
            if (n.length <= 0) return t.tip("未勾选商品"),
            !1;
            for (var s = 0; s < n.length; s++) {
                var a = $(n[s]);
                if (a.hasClass("error")) {
                    var d = a.find(".error-text").html();
                    return t.tip(d),
                    !1
                }
                var o = parseInt(a.find(".num").data("amount")),
                h = parseInt(a.data("limit"));
                if (h && o > h) return t.tip("限购"),
                !1;
                var l = a.data("id");
                r[l] = o
            }
            return i.order_from_wishes(r),
            !1
        },
        order_from_wishes: function(e) {
            var i = this,
            r = {
                wishes: JSON.stringify(e)
            };
            return i._API.create_pre_order(r,
            function(e) {
                console.log("preorder:", e),
                setTimeout(function() {
                    location.href = "/shop/shops/" + i.order_shopid + "/create-order?preorder_id=" + e.preorder_id
                },
                600)
            },
            function(e) {
                t.tip(e.msg)
            }),
            !1
        },
        del_wishes: function(e) {
            var i = this,
            r = i.$el.find(".wishes-list .hover");
            if (0 != r.length) return t.confirm({
                msg: "确认删除",
                confirm: function() {
                    r.each(function(e) {
                        var t = this,
                        r = $(this).data("id");
                        i._API.del_wishes(r,
                        function(e) {
                            $(t).slideUp(200,
                            function() {
                                $(t).remove(),
                                i.checknone()
                            })
                        })
                    })
                }
            }),
            !1
        },
        choice_one: function(e) {
            var i = this,
            r = $(e.currentTarget),
            n = r.parents(".wishes-list");
            if (i.order_shopid && n.data("id") != i.order_shopid) return t.tip("不能选择不同店铺的商品"),
            !1;
            if (!i.$el.find(".wishes-list").hasClass("in_edit") && (r.hasClass("error") || r.hasClass("error2") || r.hasClass("error3"))) return ! 1;
            if (r.hasClass("hover")) r.removeClass("hover"),
            n.find(".choice-all").removeClass("hover"),
            0 === i.$el.find(".item.hover").length && (i.order_shopid = null);
            else {
                r.addClass("hover"),
                i.order_shopid = n.data("id");
                var s = n.find(".item.hover").length;
                s == n.find(".item").length && n.find(".choice-all").addClass("hover")
            }
            return i.change_all(),
            !1
        },
        change_all: function() {
            var e = this,
            i = e.$el.find(".wishes-list .item.hover"),
            t = 0;
            i.each(function() {
                var e = $(this).find(".price").data("price");
                t += parseFloat(e)
            }),
            t = t.toFixed(2),
            e.$el.find(".bottom .price").text("¥" + t)
        },
        checknone: function() {
            var e = this;
            e.$el.find(".wishes-list").each(function() {
                0 === $(this).find(".item").length && $(this).remove()
            });
            var i = e.$el.find(".wishes-list .item");
            0 == i.length && (location.href = "/shop/shops/" + SOHUZ.page.shop_id + "/buyer-wishes")
        }
    })
});
define("controllers/MeAddressViewController", ["global", "controllers/baseview", "sui"],
function(a, d, e) {
    return d.extend({
        el: ".myapp",
        initialize: function() {
            this._init(),
            this.render()
        },
        render: function() {},
        events: {
            "tap .btn-new-address": "link_address",
            'tap [data-role="add-address"]': "add_address",
            'tap [data-role="address-item"]': "jump_to_address_edit"
        },
        jump_to_address_edit: function(a) {
            var d = SOHUZ.page.shop_id,
            s = $(a.currentTarget).data("address-id"),
            o = $(a.currentTarget).data("address-type");
            if (0 == o) location.href = "/shop/shops/" + d + "/me/address/" + s;
            else if (1 == o) location.href = "/shop/shops/" + d + "/me/takeout-address/" + s;
            else {
                var t = '<div class="adr-old-choice-wrapper"><div class="title">请为地址分类</div><div class="shop-adr-old" data-role="shop-adr-old">普通地址</div><div class="takeout-adr-old" data-role="takeout-adr-old">外卖地址</div></div>';
                e.display({
                    content: t,
                    events: {
                        '[data-role="shop-adr-old"]': function() {
                            location.href = "/shop/shops/" + d + "/me/address/" + s
                        },
                        '[data-role="takeout-adr-old"]': function() {
                            location.href = "/shop/shops/" + d + "/me/takeout-address/" + s
                        }
                    }
                })
            }
        },
        add_address: function() {
            var a = '<div class="adr-choice-wrapper"><div class="shop-adr" data-role="shop-adr">普通地址</div><div class="takeout-adr" data-role="takeout-adr">外卖地址</div></div>';
            e.display({
                content: a,
                events: {
                    '[data-role="shop-adr"]': function() {
                        console.log("shop"),
                        location.href = "/shop/shops/" + SOHUZ.page.shop_id + "/me/address-add"
                    },
                    '[data-role="takeout-adr"]': function() {
                        console.log("takeout"),
                        location.href = "/shop/shops/" + SOHUZ.page.shop_id + "/me/takeout-address-add"
                    }
                }
            })
        },
        link_address: function() {
            var a = this.$el.find(".btn-new-address");
            return a.hasClass("disable") ? (e.tip("地址个数已满"), !1) : (location.href = a.attr("href"), !1)
        }
    })
});
define("utils/mobile_select_choice", [],
function() {
    function e() {
        var e, r = document.createElement("p"),
        a = {
            webkitTransform: "-webkit-transform",
            OTransform: "-o-transform",
            msTransform: "-ms-transform",
            MozTransform: "-moz-transform",
            transform: "transform"
        };
        document.body.insertBefore(r, null);
        for (var i in a) void 0 !== r.style[i] && (r.style[i] = "translate3d(1px,1px,1px)", e = window.getComputedStyle(r).getPropertyValue(a[i]));
        return document.body.removeChild(r),
        void 0 !== e && e.length > 0 && "none" !== e
    }
    function r(e) {
        var r = e.css("-webkit-transform").match(/matrix(?:(3d)\(-{0,1}\d+(?:, -{0,1}\d+)*(?:, (-{0,1}\d+))(?:, (-{0,1}\d+))(?:, (-{0,1}\d+)), -{0,1}\d+\)|\(-{0,1}\d+(?:, -{0,1}\d+)*(?:, (-{0,1}\d+))(?:, (-{0,1}\d+))\))/);
        return r ? "3d" == r[1] ? r.slice(2, 5) : (r.push(0), r.slice(5, 8)) : [0, 0, 0]
    }
    function a(e) {
        this.options = $.extend({},
        e),
        this.cb_confirm = e && e.confirm ? e.confirm: function() {},
        this._data = e.data,
        this.n_line = e.n_line,
        this.select_text = e.select_text,
        this.init()
    }
    var i, o = '<div class="zyl-areachoice-item"></div>',
    c = '<div class="zyl-areachoice-smask"></div>',
    t = '<div class="zyl-areachoice">                            <div class="zyl-areachoice-header">                                <div class="zyl-areachoice-close">取消</div>                                <div class="zyl-areachoice-confirm">确认</div>                                <div class="zyl-areachoice-text">{{select_text}}</div>                            </div>                            <div class="zyl-areachoice-main">                                <div class="zyl-areachoice-row zyl-areachoice-row-p"></div>                                <div class="zyl-areachoice-row zyl-areachoice-row-n"></div>                                <div class="zyl-areachoice-row zyl-areachoice-row-a"></div>                            </div>                            <div class="zyl-areachoice-midline"></div>                            <div class="zyl-areachoice-mask">                                 <div class="zyl-swipe-row" data-role="zyl-areachoice-row-p"></div>                                <div class="zyl-swipe-row" data-role="zyl-areachoice-row-n"></div>                                <div class="zyl-swipe-row" data-role="zyl-areachoice-row-a"></div>                            </div>                            </div>',
    n = 0,
    l = 0,
    d = !1,
    s = function(r, a, i) {
        var o = e(),
        c = i ? i.num * -30 : n + a;
        r.css("-webkit-transform", "translate" + (o ? "3d": "") + "(0," + c + "px" + (o ? ",0": "") + ")"),
        r[0].style.webkitTransition = "",
        l = c
    };
    return a.prototype.init = function() {
        var a = this;
        a.wrp = $(Mustache.render(t, {
            select_text: a.select_text
        })),
        2 == a.n_line ? (a.wrp.find(".zyl-areachoice-row-a").hide(), a.wrp.find('[data-role="zyl-areachoice-row-a"]').hide()) : 3 != a.n_line && (a.wrp.find(".zyl-areachoice-row-n").hide(), a.wrp.find(".zyl-areachoice-row-a").hide(), a.wrp.find('[data-role="zyl-areachoice-row-n"]').hide(), a.wrp.find('[data-role="zyl-areachoice-row-a"]').hide());
        for (var c in a._data.datalist) {
            var h = $(o).html(a._data.datalist[c].p);
            a.wrp.find(".zyl-areachoice-row-p").append(h)
        }
        var p = function(r, a) {
            var i, o = e(),
            c = r.children().length,
            t = 0;
            a > 0 ? (t = 0, i = a = 0) : Math.abs(a) > 30 * c - 30 ? c > 0 && (i = a = 30 * (c - 1) * -1, t = c - 1) : (t = Math.round(a / 30), i = a = 30 * t),
            r.find(".zyl-areachoice-item.cur").index() !== Math.abs(t) && r.children().eq(Math.abs(t)).trigger("tap"),
            r.css("-webkit-transform", "translate" + (o ? "3d": "") + "(0," + i + "px" + (o ? ",0": "") + ")"),
            r[0].style.webkitTransition = "-webkit-transform ease-out 0.3s",
            d = !0,
            setTimeout(function() {
                d = !1
            },
            300)
        };
        a.wrp.on("tap", ".zyl-areachoice-row-p .zyl-areachoice-item",
        function() {
            a.render_row_p($(this).index())
        }).on("tap", ".zyl-areachoice-row-n .zyl-areachoice-item",
        function() {
            a.render_row_n($(this).index())
        }).on("tap", ".zyl-areachoice-row-a .zyl-areachoice-item",
        function() {
            a.render_row_a($(this).index())
        }).on("touchstart", ".zyl-swipe-row",
        function(e) {
            if (d) return ! 1;
            var o, c = a.wrp.find("." + $(this).data("role"));
            o = e.originalEvent.touches[0],
            i = o.pageY,
            n = parseInt(r(c)[1]),
            e.preventDefault()
        }).on("touchmove", ".zyl-swipe-row",
        function(e) {
            if (d) return ! 1;
            var r, o;
            moved = 1,
            $el = a.wrp.find("." + $(this).data("role")),
            r = e.originalEvent.touches[0],
            o = r.pageY - i,
            s($el, o),
            e.preventDefault()
        }).on("touchend touchcancel", ".zyl-swipe-row",
        function(e) {
            return ! d && ($el = a.wrp.find("." + $(this).data("role")), p($el, l), void e.preventDefault())
        }).on("tap", ".zyl-areachoice-close",
        function(e) {
            return a.hide(),
            !1
        }).on("tap", ".zyl-areachoice-confirm",
        function(e) {
            var r = a.getData();
            return a.cb_confirm(r),
            a.hide(),
            !1
        }),
        $("body").append(a.wrp)
    },
    a.prototype.render_row_p = function(e) {
        var r = this;
        r.wrp.find(".zyl-areachoice-row-p .zyl-areachoice-item.cur").removeClass("cur"),
        r.wrp.find(".zyl-areachoice-row-p .zyl-areachoice-item").eq(e).addClass("cur"),
        r.wrp.find(".zyl-areachoice-row-n").html(""),
        r.wrp.find(".zyl-areachoice-row-a").html("");
        var a = r._data.datalist[e].c;
        if (a) {
            for (var i in a) {
                var c = $(o).html(a[i].n);
                r.wrp.find(".zyl-areachoice-row-n").append(c)
            }
            r.wrp.find(".zyl-areachoice-row-n .zyl-areachoice-item").eq(0).trigger("tap"),
            s(r.wrp.find(".zyl-areachoice-row-n"), 0, {
                num: 0
            })
        }
    },
    a.prototype.render_row_n = function(e) {
        var r = this,
        a = r.wrp.find(".zyl-areachoice-row-p .zyl-areachoice-item.cur").index();
        r.wrp.find(".zyl-areachoice-row-n .zyl-areachoice-item.cur").removeClass("cur"),
        r.wrp.find(".zyl-areachoice-row-n .zyl-areachoice-item").eq(e).addClass("cur");
        var i = r._data.datalist[a].c[e].a;
        if (i) {
            r.wrp.find(".zyl-areachoice-row-a").html("");
            for (var c in i) {
                var t = $(o).html(i[c].s);
                r.wrp.find(".zyl-areachoice-row-a").append(t)
            }
            r.render_row_a(0)
        }
    },
    a.prototype.render_row_a = function(e) {
        var r = this;
        r.wrp.find(".zyl-areachoice-row-a .zyl-areachoice-item.cur").removeClass("cur"),
        r.wrp.find(".zyl-areachoice-row-a .zyl-areachoice-item").eq(e).addClass("cur"),
        s(r.wrp.find(".zyl-areachoice-row-a"), 0, {
            num: e
        })
    },
    a.prototype.show = function() {
        var e = this;
        e.wrp.find(".zyl-areachoice-row-p .zyl-areachoice-item").eq(0).trigger("tap"),
        s(e.wrp.find(".zyl-areachoice-row-p"), 0, {
            num: 0
        }),
        e.wrp.show(),
        $("body").append(c)
    },
    a.prototype.hide = function() {
        var e = this;
        e.wrp.hide(),
        $(".zyl-areachoice-smask").remove()
    },
    a.prototype.getData = function() {
        var e = this,
        r = [];
        return r.push(e.wrp.find(".zyl-areachoice-row-p .zyl-areachoice-item.cur").text()),
        r.push(e.wrp.find(".zyl-areachoice-row-n .zyl-areachoice-item.cur").text()),
        r.push(e.wrp.find(".zyl-areachoice-row-a .zyl-areachoice-item.cur").text()),
        r
    },
    a
});
define("utils/areadata", [],
function() {
    var s = {
        datalist: [{
            p: "北京",
            c: [{
                n: "北京市",
                a: [{
                    s: "东城区"
                },
                {
                    s: "西城区"
                },
                {
                    s: "崇文区"
                },
                {
                    s: "宣武区"
                },
                {
                    s: "朝阳区"
                },
                {
                    s: "丰台区"
                },
                {
                    s: "石景山区"
                },
                {
                    s: "海淀区"
                },
                {
                    s: "门头沟区"
                },
                {
                    s: "房山区"
                },
                {
                    s: "通州区"
                },
                {
                    s: "顺义区"
                },
                {
                    s: "昌平区"
                },
                {
                    s: "大兴区"
                },
                {
                    s: "平谷区"
                },
                {
                    s: "怀柔区"
                },
                {
                    s: "密云县"
                },
                {
                    s: "延庆县"
                }]
            }]
        },
        {
            p: "天津",
            c: [{
                n: "天津市",
                a: [{
                    s: "和平区"
                },
                {
                    s: "河东区"
                },
                {
                    s: "河西区"
                },
                {
                    s: "南开区"
                },
                {
                    s: "河北区"
                },
                {
                    s: "红挢区"
                },
                {
                    s: "滨海新区"
                },
                {
                    s: "东丽区"
                },
                {
                    s: "西青区"
                },
                {
                    s: "津南区"
                },
                {
                    s: "北辰区"
                },
                {
                    s: "宁河区"
                },
                {
                    s: "武清区"
                },
                {
                    s: "静海县"
                },
                {
                    s: "宝坻区"
                },
                {
                    s: "蓟县"
                }]
            }]
        },
        {
            p: "河北",
            c: [{
                n: "石家庄",
                a: [{
                    s: "长安区"
                },
                {
                    s: "桥东区"
                },
                {
                    s: "桥西区"
                },
                {
                    s: "新华区"
                },
                {
                    s: "井陉矿区"
                },
                {
                    s: "裕华区"
                },
                {
                    s: "井陉县"
                },
                {
                    s: "正定县"
                },
                {
                    s: "栾城县"
                },
                {
                    s: "行唐县"
                },
                {
                    s: "灵寿县"
                },
                {
                    s: "高邑县"
                },
                {
                    s: "深泽县"
                },
                {
                    s: "赞皇县"
                },
                {
                    s: "无极县"
                },
                {
                    s: "平山县"
                },
                {
                    s: "元氏县"
                },
                {
                    s: "赵县"
                },
                {
                    s: "辛集市"
                },
                {
                    s: "藁城市"
                },
                {
                    s: "晋州市"
                },
                {
                    s: "新乐市"
                },
                {
                    s: "鹿泉市"
                }]
            },
            {
                n: "唐山",
                a: [{
                    s: "路南区"
                },
                {
                    s: "路北区"
                },
                {
                    s: "古冶区"
                },
                {
                    s: "开平区"
                },
                {
                    s: "丰南区"
                },
                {
                    s: "丰润区"
                },
                {
                    s: "滦县"
                },
                {
                    s: "滦南县"
                },
                {
                    s: "乐亭县"
                },
                {
                    s: "迁西县"
                },
                {
                    s: "玉田县"
                },
                {
                    s: "唐海县"
                },
                {
                    s: "遵化市"
                },
                {
                    s: "迁安市"
                }]
            },
            {
                n: "秦皇岛",
                a: [{
                    s: "海港区"
                },
                {
                    s: "山海关区"
                },
                {
                    s: "北戴河区"
                },
                {
                    s: "青龙满族自治县"
                },
                {
                    s: "昌黎县"
                },
                {
                    s: "抚宁县"
                },
                {
                    s: "卢龙县"
                }]
            },
            {
                n: "邯郸",
                a: [{
                    s: "邯山区"
                },
                {
                    s: "丛台区"
                },
                {
                    s: "复兴区"
                },
                {
                    s: "峰峰矿区"
                },
                {
                    s: "邯郸县"
                },
                {
                    s: "临漳县"
                },
                {
                    s: "成安县"
                },
                {
                    s: "大名县"
                },
                {
                    s: "涉县"
                },
                {
                    s: "磁县"
                },
                {
                    s: "肥乡县"
                },
                {
                    s: "永年县"
                },
                {
                    s: "邱县"
                },
                {
                    s: "鸡泽县"
                },
                {
                    s: "广平县"
                },
                {
                    s: "馆陶县"
                },
                {
                    s: "魏县"
                },
                {
                    s: "曲周县"
                },
                {
                    s: "武安市"
                }]
            },
            {
                n: "邢台",
                a: [{
                    s: "桥东区"
                },
                {
                    s: "桥西区"
                },
                {
                    s: "邢台县"
                },
                {
                    s: "临城县"
                },
                {
                    s: "内丘县"
                },
                {
                    s: "柏乡县"
                },
                {
                    s: "隆尧县"
                },
                {
                    s: "任县"
                },
                {
                    s: "南和县"
                },
                {
                    s: "宁晋县"
                },
                {
                    s: "巨鹿县"
                },
                {
                    s: "新河县"
                },
                {
                    s: "广宗县"
                },
                {
                    s: "平乡县"
                },
                {
                    s: "威县"
                },
                {
                    s: "清河县"
                },
                {
                    s: "临西县"
                },
                {
                    s: "南宫市"
                },
                {
                    s: "沙河市"
                }]
            },
            {
                n: "保定",
                a: [{
                    s: "新市区"
                },
                {
                    s: "北市区"
                },
                {
                    s: "南市区"
                },
                {
                    s: "满城县"
                },
                {
                    s: "清苑县"
                },
                {
                    s: "涞水县"
                },
                {
                    s: "阜平县"
                },
                {
                    s: "徐水县"
                },
                {
                    s: "定兴县"
                },
                {
                    s: "唐县"
                },
                {
                    s: "高阳县"
                },
                {
                    s: "容城县"
                },
                {
                    s: "涞源县"
                },
                {
                    s: "望都县"
                },
                {
                    s: "安新县"
                },
                {
                    s: "易县"
                },
                {
                    s: "曲阳县"
                },
                {
                    s: "蠡县"
                },
                {
                    s: "顺平县"
                },
                {
                    s: "博野县"
                },
                {
                    s: "雄县"
                },
                {
                    s: "涿州市"
                },
                {
                    s: "定州市"
                },
                {
                    s: "安国市"
                },
                {
                    s: "高碑店市"
                }]
            },
            {
                n: "张家口",
                a: [{
                    s: "桥东区"
                },
                {
                    s: "桥西区"
                },
                {
                    s: "宣化区"
                },
                {
                    s: "下花园区"
                },
                {
                    s: "宣化县"
                },
                {
                    s: "张北县"
                },
                {
                    s: "康保县"
                },
                {
                    s: "沽源县"
                },
                {
                    s: "尚义县"
                },
                {
                    s: "蔚县"
                },
                {
                    s: "阳原县"
                },
                {
                    s: "怀安县"
                },
                {
                    s: "万全县"
                },
                {
                    s: "怀来县"
                },
                {
                    s: "涿鹿县"
                },
                {
                    s: "赤城县"
                },
                {
                    s: "崇礼县"
                }]
            },
            {
                n: "承德",
                a: [{
                    s: "双桥区"
                },
                {
                    s: "双滦区"
                },
                {
                    s: "鹰手营子矿区"
                },
                {
                    s: "承德县"
                },
                {
                    s: "兴隆县"
                },
                {
                    s: "平泉县"
                },
                {
                    s: "滦平县"
                },
                {
                    s: "隆化县"
                },
                {
                    s: "丰宁满族自治县"
                },
                {
                    s: "宽城满族自治县"
                },
                {
                    s: "围场满族蒙古族自治县"
                }]
            },
            {
                n: "沧州",
                a: [{
                    s: "新华区"
                },
                {
                    s: "运河区"
                },
                {
                    s: "沧县"
                },
                {
                    s: "青县"
                },
                {
                    s: "东光县"
                },
                {
                    s: "海兴县"
                },
                {
                    s: "盐山县"
                },
                {
                    s: "肃宁县"
                },
                {
                    s: "南皮县"
                },
                {
                    s: "吴桥县"
                },
                {
                    s: "献县"
                },
                {
                    s: "孟村回族自治县"
                },
                {
                    s: "泊头市"
                },
                {
                    s: "任丘市"
                },
                {
                    s: "黄骅市"
                },
                {
                    s: "河间市"
                }]
            },
            {
                n: "廊坊",
                a: [{
                    s: "安次区"
                },
                {
                    s: "广阳区"
                },
                {
                    s: "固安县"
                },
                {
                    s: "永清县"
                },
                {
                    s: "香河县"
                },
                {
                    s: "大城县"
                },
                {
                    s: "文安县"
                },
                {
                    s: "大厂回族自治县"
                },
                {
                    s: "霸州市"
                },
                {
                    s: "三河市"
                }]
            },
            {
                n: "衡水",
                a: [{
                    s: "桃城区"
                },
                {
                    s: "枣强县"
                },
                {
                    s: "武邑县"
                },
                {
                    s: "武强县"
                },
                {
                    s: "饶阳县"
                },
                {
                    s: "安平县"
                },
                {
                    s: "故城县"
                },
                {
                    s: "景县"
                },
                {
                    s: "阜城县"
                },
                {
                    s: "冀州市"
                },
                {
                    s: "深州市"
                }]
            }]
        },
        {
            p: "山西",
            c: [{
                n: "太原",
                a: [{
                    s: "小店区"
                },
                {
                    s: "迎泽区"
                },
                {
                    s: "杏花岭区"
                },
                {
                    s: "尖草坪区"
                },
                {
                    s: "万柏林区"
                },
                {
                    s: "晋源区"
                },
                {
                    s: "清徐县"
                },
                {
                    s: "阳曲县"
                },
                {
                    s: "娄烦县"
                },
                {
                    s: "古交市"
                }]
            },
            {
                n: "大同",
                a: [{
                    s: "城区"
                },
                {
                    s: "矿区"
                },
                {
                    s: "南郊区"
                },
                {
                    s: "新荣区"
                },
                {
                    s: "阳高县"
                },
                {
                    s: "天镇县"
                },
                {
                    s: "广灵县"
                },
                {
                    s: "灵丘县"
                },
                {
                    s: "浑源县"
                },
                {
                    s: "左云县"
                },
                {
                    s: "大同县"
                }]
            },
            {
                n: "阳泉",
                a: [{
                    s: "城区"
                },
                {
                    s: "矿区"
                },
                {
                    s: "郊区"
                },
                {
                    s: "平定县"
                },
                {
                    s: "盂县"
                }]
            },
            {
                n: "长治",
                a: [{
                    s: "城区"
                },
                {
                    s: "郊区"
                },
                {
                    s: "长治县"
                },
                {
                    s: "襄垣县"
                },
                {
                    s: "屯留县"
                },
                {
                    s: "平顺县"
                },
                {
                    s: "黎城县"
                },
                {
                    s: "壶关县"
                },
                {
                    s: "长子县"
                },
                {
                    s: "武乡县"
                },
                {
                    s: "沁县"
                },
                {
                    s: "沁源县"
                },
                {
                    s: "潞城市"
                }]
            },
            {
                n: "晋城",
                a: [{
                    s: "城区"
                },
                {
                    s: "沁水县"
                },
                {
                    s: "阳城县"
                },
                {
                    s: "陵川县"
                },
                {
                    s: "泽州县"
                },
                {
                    s: "高平市"
                }]
            },
            {
                n: "朔州",
                a: [{
                    s: "朔城区"
                },
                {
                    s: "平鲁区"
                },
                {
                    s: "山阴县"
                },
                {
                    s: "应县"
                },
                {
                    s: "右玉县"
                },
                {
                    s: "怀仁县"
                }]
            },
            {
                n: "晋中",
                a: [{
                    s: "榆次区"
                },
                {
                    s: "榆社县"
                },
                {
                    s: "左权县"
                },
                {
                    s: "和顺县"
                },
                {
                    s: "昔阳县"
                },
                {
                    s: "寿阳县"
                },
                {
                    s: "太谷县"
                },
                {
                    s: "祁县"
                },
                {
                    s: "平遥县"
                },
                {
                    s: "灵石县"
                },
                {
                    s: "介休市"
                }]
            },
            {
                n: "运城",
                a: [{
                    s: "盐湖区"
                },
                {
                    s: "临猗县"
                },
                {
                    s: "万荣县"
                },
                {
                    s: "闻喜县"
                },
                {
                    s: "稷山县"
                },
                {
                    s: "新绛县"
                },
                {
                    s: "绛县"
                },
                {
                    s: "垣曲县"
                },
                {
                    s: "夏县"
                },
                {
                    s: "平陆县"
                },
                {
                    s: "芮城县"
                },
                {
                    s: "永济市"
                },
                {
                    s: "河津市"
                }]
            },
            {
                n: "忻州",
                a: [{
                    s: "忻府区"
                },
                {
                    s: "定襄县"
                },
                {
                    s: "五台县"
                },
                {
                    s: "代县"
                },
                {
                    s: "繁峙县"
                },
                {
                    s: "宁武县"
                },
                {
                    s: "静乐县"
                },
                {
                    s: "神池县"
                },
                {
                    s: "五寨县"
                },
                {
                    s: "岢岚县"
                },
                {
                    s: "河曲县"
                },
                {
                    s: "保德县"
                },
                {
                    s: "偏关县"
                },
                {
                    s: "原平市"
                }]
            },
            {
                n: "临汾",
                a: [{
                    s: "尧都区"
                },
                {
                    s: "曲沃县"
                },
                {
                    s: "翼城县"
                },
                {
                    s: "襄汾县"
                },
                {
                    s: "洪洞县"
                },
                {
                    s: "古县"
                },
                {
                    s: "安泽县"
                },
                {
                    s: "浮山县"
                },
                {
                    s: "吉县"
                },
                {
                    s: "乡宁县"
                },
                {
                    s: "大宁县"
                },
                {
                    s: "隰县"
                },
                {
                    s: "永和县"
                },
                {
                    s: "蒲县"
                },
                {
                    s: "汾西县"
                },
                {
                    s: "侯马市"
                },
                {
                    s: "霍州市"
                }]
            },
            {
                n: "吕梁",
                a: [{
                    s: "离石区"
                },
                {
                    s: "文水县"
                },
                {
                    s: "交城县"
                },
                {
                    s: "兴县"
                },
                {
                    s: "临县"
                },
                {
                    s: "柳林县"
                },
                {
                    s: "石楼县"
                },
                {
                    s: "岚县"
                },
                {
                    s: "方山县"
                },
                {
                    s: "中阳县"
                },
                {
                    s: "交口县"
                },
                {
                    s: "孝义市"
                },
                {
                    s: "汾阳市"
                }]
            }]
        },
        {
            p: "内蒙古",
            c: [{
                n: "呼和浩特",
                a: [{
                    s: "新城区"
                },
                {
                    s: "回民区"
                },
                {
                    s: "玉泉区"
                },
                {
                    s: "玉泉区"
                },
                {
                    s: "赛罕区"
                },
                {
                    s: "土默特左旗"
                },
                {
                    s: "托克托县"
                },
                {
                    s: "和林格尔县"
                },
                {
                    s: "清水河县"
                },
                {
                    s: "武川县"
                }]
            },
            {
                n: "包头",
                a: [{
                    s: "东河区"
                },
                {
                    s: "昆都仑区"
                },
                {
                    s: "青山区"
                },
                {
                    s: "石拐区"
                },
                {
                    s: "白云矿区"
                },
                {
                    s: "九原区"
                },
                {
                    s: "土默特右旗"
                },
                {
                    s: "固阳县"
                },
                {
                    s: "达尔罕茂明安联合旗"
                }]
            },
            {
                n: "乌海",
                a: [{
                    s: "海勃湾区"
                },
                {
                    s: "海南区"
                },
                {
                    s: "乌达区"
                }]
            },
            {
                n: "赤峰",
                a: [{
                    s: "红山区"
                },
                {
                    s: "元宝山区"
                },
                {
                    s: "松山区"
                },
                {
                    s: "阿鲁科尔沁旗"
                },
                {
                    s: "巴林左旗"
                },
                {
                    s: "巴林右旗"
                },
                {
                    s: "林西县"
                },
                {
                    s: "克什克腾旗"
                },
                {
                    s: "翁牛特旗"
                },
                {
                    s: "喀喇沁旗"
                },
                {
                    s: "宁城县"
                },
                {
                    s: "敖汉旗"
                }]
            },
            {
                n: "通辽",
                a: [{
                    s: "科尔沁区"
                },
                {
                    s: "科尔沁左翼中旗"
                },
                {
                    s: "科尔沁左翼后旗"
                },
                {
                    s: "开鲁县"
                },
                {
                    s: "库伦旗"
                },
                {
                    s: "奈曼旗"
                },
                {
                    s: "扎鲁特旗"
                },
                {
                    s: "霍林郭勒市"
                }]
            },
            {
                n: "鄂尔多斯",
                a: [{
                    s: "东胜区"
                },
                {
                    s: "达拉特旗"
                },
                {
                    s: "准格尔旗"
                },
                {
                    s: "鄂托克前旗"
                },
                {
                    s: "鄂托克旗"
                },
                {
                    s: "杭锦旗"
                },
                {
                    s: "乌审旗"
                },
                {
                    s: "伊金霍洛旗"
                }]
            },
            {
                n: "呼伦贝尔",
                a: [{
                    s: "海拉尔区"
                },
                {
                    s: "阿荣旗"
                },
                {
                    s: "莫力达瓦达斡尔族自治旗"
                },
                {
                    s: "鄂伦春自治旗"
                },
                {
                    s: "鄂温克族自治旗"
                },
                {
                    s: "陈巴尔虎旗"
                },
                {
                    s: "新巴尔虎左旗"
                },
                {
                    s: "新巴尔虎右旗"
                },
                {
                    s: "满洲里市"
                },
                {
                    s: "牙克石市"
                },
                {
                    s: "扎兰屯市"
                },
                {
                    s: "额尔古纳市"
                },
                {
                    s: "根河市"
                }]
            },
            {
                n: "巴彦淖尔",
                a: [{
                    s: "临河区"
                },
                {
                    s: "五原县"
                },
                {
                    s: "磴口县"
                },
                {
                    s: "乌拉特前旗"
                },
                {
                    s: "乌拉特中旗"
                },
                {
                    s: "乌拉特后旗"
                },
                {
                    s: "杭锦后旗"
                }]
            },
            {
                n: "乌兰察布",
                a: [{
                    s: "集宁区"
                },
                {
                    s: "卓资县"
                },
                {
                    s: "化德县"
                },
                {
                    s: "商都县"
                },
                {
                    s: "兴和县"
                },
                {
                    s: "凉城县"
                },
                {
                    s: "察哈尔右翼前旗"
                },
                {
                    s: "察哈尔右翼中旗"
                },
                {
                    s: "察哈尔右翼后旗"
                },
                {
                    s: "四子王旗"
                },
                {
                    s: "丰镇市"
                }]
            },
            {
                n: "兴安",
                a: [{
                    s: "乌兰浩特市"
                },
                {
                    s: "阿尔山市"
                },
                {
                    s: "科尔沁右翼前旗"
                },
                {
                    s: "科尔沁右翼中旗"
                },
                {
                    s: "扎赉特旗"
                },
                {
                    s: "突泉县"
                }]
            },
            {
                n: "锡林郭勒",
                a: [{
                    s: "二连浩特市"
                },
                {
                    s: "锡林浩特市"
                },
                {
                    s: "阿巴嘎旗"
                },
                {
                    s: "苏尼特左旗"
                },
                {
                    s: "苏尼特右旗"
                },
                {
                    s: "东乌珠穆沁旗"
                },
                {
                    s: "西乌珠穆沁旗"
                },
                {
                    s: "太仆寺旗"
                },
                {
                    s: "镶黄旗"
                },
                {
                    s: "正镶白旗"
                },
                {
                    s: "正蓝旗"
                },
                {
                    s: "多伦县"
                }]
            },
            {
                n: "阿拉善",
                a: [{
                    s: "阿拉善左旗"
                },
                {
                    s: "阿拉善右旗"
                },
                {
                    s: "额济纳旗"
                }]
            }]
        },
        {
            p: "辽宁",
            c: [{
                n: "沈阳",
                a: [{
                    s: "和平区"
                },
                {
                    s: "沈河区"
                },
                {
                    s: "大东区"
                },
                {
                    s: "皇姑区"
                },
                {
                    s: "铁西区"
                },
                {
                    s: "苏家屯区"
                },
                {
                    s: "东陵区"
                },
                {
                    s: "新城子区"
                },
                {
                    s: "于洪区"
                },
                {
                    s: "辽中县"
                },
                {
                    s: "康平县"
                },
                {
                    s: "法库县"
                },
                {
                    s: "新民市"
                },
                {
                    s: "沈北新区"
                },
                {
                    s: "浑南新区"
                }]
            },
            {
                n: "大连",
                a: [{
                    s: "中山区"
                },
                {
                    s: "西岗区"
                },
                {
                    s: "沙河口区"
                },
                {
                    s: "甘井子区"
                },
                {
                    s: "旅顺口区"
                },
                {
                    s: "金州区"
                },
                {
                    s: "长海县"
                },
                {
                    s: "瓦房店市"
                },
                {
                    s: "普兰店市"
                },
                {
                    s: "庄河市"
                }]
            },
            {
                n: "鞍山",
                a: [{
                    s: "铁东区"
                },
                {
                    s: "铁西区"
                },
                {
                    s: "立山区"
                },
                {
                    s: "千山区"
                },
                {
                    s: "台安县"
                },
                {
                    s: "210323"
                },
                {
                    s: "海城市"
                }]
            },
            {
                n: "抚顺",
                a: [{
                    s: "新抚区"
                },
                {
                    s: "东洲区"
                },
                {
                    s: "望花区"
                },
                {
                    s: "顺城区"
                },
                {
                    s: "抚顺县"
                },
                {
                    s: "新宾满族自治县"
                },
                {
                    s: "清原满族自治县"
                }]
            },
            {
                n: "本溪",
                a: [{
                    s: "平山区"
                },
                {
                    s: "溪湖区"
                },
                {
                    s: "明山区"
                },
                {
                    s: "南芬区"
                },
                {
                    s: "本溪满族自治县"
                },
                {
                    s: "桓仁满族自治县"
                }]
            },
            {
                n: "丹东",
                a: [{
                    s: "元宝区"
                },
                {
                    s: "振兴区"
                },
                {
                    s: "振安区"
                },
                {
                    s: "宽甸满族自治县"
                },
                {
                    s: "东港市"
                },
                {
                    s: "凤城市"
                }]
            },
            {
                n: "锦州",
                a: [{
                    s: "古塔区"
                },
                {
                    s: "凌河区"
                },
                {
                    s: "太和区"
                },
                {
                    s: "黑山县"
                },
                {
                    s: "义县"
                },
                {
                    s: "凌海市"
                },
                {
                    s: "北镇市"
                }]
            },
            {
                n: "营口",
                a: [{
                    s: "站前区"
                },
                {
                    s: "西市区"
                },
                {
                    s: "鲅鱼圈区"
                },
                {
                    s: "老边区"
                },
                {
                    s: "盖州市"
                },
                {
                    s: "大石桥市"
                }]
            },
            {
                n: "阜新",
                a: [{
                    s: "海州区"
                },
                {
                    s: "新邱区"
                },
                {
                    s: "太平区"
                },
                {
                    s: "清河门区"
                },
                {
                    s: "细河区"
                },
                {
                    s: "阜新蒙古族自治县"
                },
                {
                    s: "彰武县"
                }]
            },
            {
                n: "辽阳",
                a: [{
                    s: "白塔区"
                },
                {
                    s: "文圣区"
                },
                {
                    s: "宏伟区"
                },
                {
                    s: "弓长岭区"
                },
                {
                    s: "太子河区"
                },
                {
                    s: "辽阳县"
                },
                {
                    s: "灯塔市"
                }]
            },
            {
                n: "盘锦",
                a: [{
                    s: "双台子区"
                },
                {
                    s: "兴隆台区"
                },
                {
                    s: "大洼县"
                },
                {
                    s: "盘山县"
                }]
            },
            {
                n: "铁岭",
                a: [{
                    s: "银州区"
                },
                {
                    s: "清河区"
                },
                {
                    s: "铁岭县"
                },
                {
                    s: "西丰县"
                },
                {
                    s: "昌图县"
                },
                {
                    s: "调兵山市"
                },
                {
                    s: "开原市"
                }]
            },
            {
                n: "朝阳",
                a: [{
                    s: "双塔区"
                },
                {
                    s: "龙城区"
                },
                {
                    s: "朝阳县"
                },
                {
                    s: "建平县"
                },
                {
                    s: "喀喇沁左翼蒙古族自治县"
                },
                {
                    s: "北票市"
                },
                {
                    s: "凌源市"
                }]
            },
            {
                n: "葫芦岛",
                a: [{
                    s: "连山区"
                },
                {
                    s: "龙港区"
                },
                {
                    s: "南票区"
                },
                {
                    s: "绥中县"
                },
                {
                    s: "建昌县"
                },
                {
                    s: "兴城市"
                }]
            }]
        },
        {
            p: "吉林",
            c: [{
                n: "长春",
                a: [{
                    s: "南关区"
                },
                {
                    s: "宽城区"
                },
                {
                    s: "朝阳区"
                },
                {
                    s: "二道区"
                },
                {
                    s: "绿园区"
                },
                {
                    s: "双阳区"
                },
                {
                    s: "农安县"
                },
                {
                    s: "九台市"
                },
                {
                    s: "榆树市"
                },
                {
                    s: "德惠市"
                }]
            },
            {
                n: "吉林",
                a: [{
                    s: "昌邑区"
                },
                {
                    s: "龙潭区"
                },
                {
                    s: "船营区"
                },
                {
                    s: "丰满区"
                },
                {
                    s: "永吉县"
                },
                {
                    s: "蛟河市"
                },
                {
                    s: "桦甸市"
                },
                {
                    s: "舒兰市"
                },
                {
                    s: "磐石市"
                }]
            },
            {
                n: "四平",
                a: [{
                    s: "铁西区"
                },
                {
                    s: "铁东区"
                },
                {
                    s: "梨树县"
                },
                {
                    s: "伊通满族自治县"
                },
                {
                    s: "公主岭市"
                },
                {
                    s: "双辽市"
                }]
            },
            {
                n: "辽源",
                a: [{
                    s: "龙山区"
                },
                {
                    s: "西安区"
                },
                {
                    s: "东丰县"
                },
                {
                    s: "东辽县"
                }]
            },
            {
                n: "通化",
                a: [{
                    s: "东昌区"
                },
                {
                    s: "二道江区"
                },
                {
                    s: "通化县"
                },
                {
                    s: "辉南县"
                },
                {
                    s: "柳河县"
                },
                {
                    s: "梅河口市"
                },
                {
                    s: "集安市"
                }]
            },
            {
                n: "白山",
                a: [{
                    s: "八道江区"
                },
                {
                    s: "江源区"
                },
                {
                    s: "抚松县"
                },
                {
                    s: "靖宇县"
                },
                {
                    s: "长白朝鲜族自治县"
                },
                {
                    s: "临江市"
                }]
            },
            {
                n: "松原",
                a: [{
                    s: "宁江区"
                },
                {
                    s: "前郭尔罗斯蒙古族自治县"
                },
                {
                    s: "长岭县"
                },
                {
                    s: "乾安县"
                },
                {
                    s: "扶余县"
                }]
            },
            {
                n: "白城",
                a: [{
                    s: "洮北区"
                },
                {
                    s: "镇赉县"
                },
                {
                    s: "通榆县"
                },
                {
                    s: "洮南市"
                },
                {
                    s: "大安市"
                }]
            },
            {
                n: "延边",
                a: [{
                    s: "延吉市"
                },
                {
                    s: "图们市"
                },
                {
                    s: "敦化市"
                },
                {
                    s: "珲春市"
                },
                {
                    s: "龙井市"
                },
                {
                    s: "和龙市"
                },
                {
                    s: "汪清县"
                },
                {
                    s: "安图县"
                }]
            }]
        },
        {
            p: "黑龙江",
            c: [{
                n: "哈尔滨",
                a: [{
                    s: "道里区"
                },
                {
                    s: "南岗区"
                },
                {
                    s: "道外区"
                },
                {
                    s: "平房区"
                },
                {
                    s: "松北区"
                },
                {
                    s: "香坊区"
                },
                {
                    s: "呼兰区"
                },
                {
                    s: "阿城区"
                },
                {
                    s: "依兰县"
                },
                {
                    s: "方正县"
                },
                {
                    s: "宾县"
                },
                {
                    s: "巴彦县"
                },
                {
                    s: "木兰县"
                },
                {
                    s: "通河县"
                },
                {
                    s: "延寿县"
                },
                {
                    s: "双城市"
                },
                {
                    s: "尚志市"
                },
                {
                    s: "五常市"
                }]
            },
            {
                n: "齐齐哈尔",
                a: [{
                    s: "龙沙区"
                },
                {
                    s: "建华区"
                },
                {
                    s: "铁锋区"
                },
                {
                    s: "昂昂溪区"
                },
                {
                    s: "富拉尔基区"
                },
                {
                    s: "碾子山区"
                },
                {
                    s: "梅里斯达斡尔族区"
                },
                {
                    s: "龙江县"
                },
                {
                    s: "依安县"
                },
                {
                    s: "泰来县"
                },
                {
                    s: "甘南县"
                },
                {
                    s: "富裕县"
                },
                {
                    s: "克山县"
                },
                {
                    s: "克东县"
                },
                {
                    s: "拜泉县"
                },
                {
                    s: "讷河市"
                }]
            },
            {
                n: "鸡西",
                a: [{
                    s: "鸡冠区"
                },
                {
                    s: "恒山区"
                },
                {
                    s: "滴道区"
                },
                {
                    s: "梨树区"
                },
                {
                    s: "城子河区"
                },
                {
                    s: "麻山区"
                },
                {
                    s: "鸡东县"
                },
                {
                    s: "虎林市"
                },
                {
                    s: "密山市"
                }]
            },
            {
                n: "鹤岗",
                a: [{
                    s: "向阳区"
                },
                {
                    s: "工农区"
                },
                {
                    s: "南山区"
                },
                {
                    s: "兴安区"
                },
                {
                    s: "东山区"
                },
                {
                    s: "兴山区"
                },
                {
                    s: "萝北县"
                },
                {
                    s: "绥滨县"
                }]
            },
            {
                n: "双鸭山",
                a: [{
                    s: "尖山区"
                },
                {
                    s: "岭东区"
                },
                {
                    s: "四方台区"
                },
                {
                    s: "宝山区"
                },
                {
                    s: "集贤县"
                },
                {
                    s: "友谊县"
                },
                {
                    s: "宝清县"
                },
                {
                    s: "饶河县"
                }]
            },
            {
                n: "大庆",
                a: [{
                    s: "萨尔图区"
                },
                {
                    s: "龙凤区"
                },
                {
                    s: "让胡路区"
                },
                {
                    s: "红岗区"
                },
                {
                    s: "大同区"
                },
                {
                    s: "肇州县"
                },
                {
                    s: "肇源县"
                },
                {
                    s: "林甸县"
                },
                {
                    s: "杜尔伯特蒙古族自治县"
                }]
            },
            {
                n: "伊春",
                a: [{
                    s: "伊春区"
                },
                {
                    s: "南岔区"
                },
                {
                    s: "友好区"
                },
                {
                    s: "西林区"
                },
                {
                    s: "翠峦区"
                },
                {
                    s: "新青区"
                },
                {
                    s: "美溪区"
                },
                {
                    s: "金山屯区"
                },
                {
                    s: "五营区"
                },
                {
                    s: "乌马河区"
                },
                {
                    s: "汤旺河区"
                },
                {
                    s: "带岭区"
                },
                {
                    s: "乌伊岭区"
                },
                {
                    s: "红星区"
                },
                {
                    s: "上甘岭区"
                },
                {
                    s: "嘉荫县"
                },
                {
                    s: "铁力市"
                }]
            },
            {
                n: "佳木斯",
                a: [{
                    s: "向阳区"
                },
                {
                    s: "前进区"
                },
                {
                    s: "东风区"
                },
                {
                    s: "郊区"
                },
                {
                    s: "桦南县"
                },
                {
                    s: "桦川县"
                },
                {
                    s: "汤原县"
                },
                {
                    s: "抚远县"
                },
                {
                    s: "同江市"
                },
                {
                    s: "富锦市"
                }]
            },
            {
                n: "七台河",
                a: [{
                    s: "新兴区"
                },
                {
                    s: "桃山区"
                },
                {
                    s: "茄子河区"
                },
                {
                    s: "勃利县"
                }]
            },
            {
                n: "牡丹江",
                a: [{
                    s: "东安区"
                },
                {
                    s: "阳明区"
                },
                {
                    s: "爱民区"
                },
                {
                    s: "西安区"
                },
                {
                    s: "东宁县"
                },
                {
                    s: "林口县"
                },
                {
                    s: "绥芬河市"
                },
                {
                    s: "海林市"
                },
                {
                    s: "宁安市"
                },
                {
                    s: "穆棱市"
                }]
            },
            {
                n: "黑河",
                a: [{
                    s: "爱辉区"
                },
                {
                    s: "嫩江县"
                },
                {
                    s: "逊克县"
                },
                {
                    s: "孙吴县"
                },
                {
                    s: "北安市"
                },
                {
                    s: "五大连池市"
                }]
            },
            {
                n: "绥化",
                a: [{
                    s: "北林区"
                },
                {
                    s: "望奎县"
                },
                {
                    s: "兰西县"
                },
                {
                    s: "青冈县"
                },
                {
                    s: "庆安县"
                },
                {
                    s: "明水县"
                },
                {
                    s: "绥棱县"
                },
                {
                    s: "安达市"
                },
                {
                    s: "肇东市"
                },
                {
                    s: "海伦市"
                }]
            },
            {
                n: "大兴安岭",
                a: [{
                    s: "加格达奇区"
                },
                {
                    s: "松岭区"
                },
                {
                    s: "新林区"
                },
                {
                    s: "呼中区"
                },
                {
                    s: "呼玛县"
                },
                {
                    s: "塔河县"
                },
                {
                    s: "漠河县"
                }]
            }]
        },
        {
            p: "上海",
            c: [{
                n: "上海市",
                a: [{
                    s: "黄浦区"
                },
                {
                    s: "卢湾区"
                },
                {
                    s: "徐汇区"
                },
                {
                    s: "长宁区"
                },
                {
                    s: "静安区"
                },
                {
                    s: "普陀区"
                },
                {
                    s: "闸北区"
                },
                {
                    s: "虹口区"
                },
                {
                    s: "杨浦区"
                },
                {
                    s: "闵行区"
                },
                {
                    s: "宝山区"
                },
                {
                    s: "嘉定区"
                },
                {
                    s: "浦东新区"
                },
                {
                    s: "金山区"
                },
                {
                    s: "松江区"
                },
                {
                    s: "奉贤区"
                },
                {
                    s: "青浦区"
                },
                {
                    s: "崇明县"
                }]
            }]
        },
        {
            p: "江苏",
            c: [{
                n: "南京",
                a: [{
                    s: "玄武区"
                },
                {
                    s: "白下区"
                },
                {
                    s: "秦淮区"
                },
                {
                    s: "建邺区"
                },
                {
                    s: "鼓楼区"
                },
                {
                    s: "下关区"
                },
                {
                    s: "浦口区"
                },
                {
                    s: "栖霞区"
                },
                {
                    s: "雨花台区"
                },
                {
                    s: "江宁区"
                },
                {
                    s: "六合区"
                },
                {
                    s: "溧水县"
                },
                {
                    s: "高淳县"
                }]
            },
            {
                n: "无锡",
                a: [{
                    s: "崇安区"
                },
                {
                    s: "南长区"
                },
                {
                    s: "北塘区"
                },
                {
                    s: "锡山区"
                },
                {
                    s: "惠山区"
                },
                {
                    s: "滨湖区"
                },
                {
                    s: "江阴市"
                },
                {
                    s: "宜兴市"
                }]
            },
            {
                n: "徐州",
                a: [{
                    s: "鼓楼区"
                },
                {
                    s: "云龙区"
                },
                {
                    s: "九里区"
                },
                {
                    s: "贾汪区"
                },
                {
                    s: "泉山区"
                },
                {
                    s: "丰县"
                },
                {
                    s: "沛县"
                },
                {
                    s: "铜山县"
                },
                {
                    s: "睢宁县"
                },
                {
                    s: "新沂市"
                },
                {
                    s: "邳州市"
                }]
            },
            {
                n: "常州",
                a: [{
                    s: "天宁区"
                },
                {
                    s: "钟楼区"
                },
                {
                    s: "戚墅堰区"
                },
                {
                    s: "新北区"
                },
                {
                    s: "武进区"
                },
                {
                    s: "溧阳市"
                },
                {
                    s: "金坛市"
                }]
            },
            {
                n: "苏州",
                a: [{
                    s: "沧浪区"
                },
                {
                    s: "平江区"
                },
                {
                    s: "金阊区"
                },
                {
                    s: "虎丘区"
                },
                {
                    s: "吴中区"
                },
                {
                    s: "相城区"
                },
                {
                    s: "常熟市"
                },
                {
                    s: "张家港市"
                },
                {
                    s: "昆山市"
                },
                {
                    s: "吴江市"
                },
                {
                    s: "太仓市"
                }]
            },
            {
                n: "南通",
                a: [{
                    s: "崇川区"
                },
                {
                    s: "港闸区"
                },
                {
                    s: "海安县"
                },
                {
                    s: "如东县"
                },
                {
                    s: "启东市"
                },
                {
                    s: "如皋市"
                },
                {
                    s: "通州市"
                },
                {
                    s: "海门市"
                }]
            },
            {
                n: "连云港",
                a: [{
                    s: "连云区"
                },
                {
                    s: "新浦区"
                },
                {
                    s: "海州区"
                },
                {
                    s: "赣榆县"
                },
                {
                    s: "东海县"
                },
                {
                    s: "灌云县"
                },
                {
                    s: "灌南县"
                }]
            },
            {
                n: "淮安",
                a: [{
                    s: "清河区"
                },
                {
                    s: "楚州区"
                },
                {
                    s: "淮阴区"
                },
                {
                    s: "清浦区"
                },
                {
                    s: "涟水县"
                },
                {
                    s: "洪泽县"
                },
                {
                    s: "盱眙县"
                },
                {
                    s: "金湖县"
                }]
            },
            {
                n: "盐城",
                a: [{
                    s: "亭湖区"
                },
                {
                    s: "盐都区"
                },
                {
                    s: "响水县"
                },
                {
                    s: "滨海县"
                },
                {
                    s: "阜宁县"
                },
                {
                    s: "射阳县"
                },
                {
                    s: "建湖县"
                },
                {
                    s: "东台市"
                },
                {
                    s: "大丰市"
                }]
            },
            {
                n: "扬州",
                a: [{
                    s: "广陵区"
                },
                {
                    s: "邗江区"
                },
                {
                    s: "维扬区"
                },
                {
                    s: "宝应县"
                },
                {
                    s: "仪征市"
                },
                {
                    s: "高邮市"
                },
                {
                    s: "江都市"
                }]
            },
            {
                n: "镇江",
                a: [{
                    s: "京口区"
                },
                {
                    s: "润州区"
                },
                {
                    s: "丹徒区"
                },
                {
                    s: "丹阳市"
                },
                {
                    s: "扬中市"
                },
                {
                    s: "句容市"
                }]
            },
            {
                n: "泰州",
                a: [{
                    s: "海陵区"
                },
                {
                    s: "高港区"
                },
                {
                    s: "兴化市"
                },
                {
                    s: "靖江市"
                },
                {
                    s: "泰兴市"
                },
                {
                    s: "姜堰市"
                }]
            },
            {
                n: "宿迁",
                a: [{
                    s: "宿城区"
                },
                {
                    s: "宿豫区"
                },
                {
                    s: "沭阳县"
                },
                {
                    s: "泗阳县"
                },
                {
                    s: "泗洪县"
                }]
            }]
        },
        {
            p: "浙江",
            c: [{
                n: "杭州",
                a: [{
                    s: "上城区"
                },
                {
                    s: "下城区"
                },
                {
                    s: "江干区"
                },
                {
                    s: "拱墅区"
                },
                {
                    s: "西湖区"
                },
                {
                    s: "滨江区"
                },
                {
                    s: "萧山区"
                },
                {
                    s: "余杭区"
                },
                {
                    s: "桐庐县"
                },
                {
                    s: "淳安县"
                },
                {
                    s: "建德市"
                },
                {
                    s: "富阳市"
                },
                {
                    s: "临安市"
                }]
            },
            {
                n: "宁波",
                a: [{
                    s: "海曙区"
                },
                {
                    s: "江东区"
                },
                {
                    s: "江北区"
                },
                {
                    s: "北仑区"
                },
                {
                    s: "镇海区"
                },
                {
                    s: "鄞州区"
                },
                {
                    s: "象山县"
                },
                {
                    s: "宁海县"
                },
                {
                    s: "余姚市"
                },
                {
                    s: "慈溪市"
                },
                {
                    s: "奉化市"
                }]
            },
            {
                n: "温州",
                a: [{
                    s: "鹿城区"
                },
                {
                    s: "龙湾区"
                },
                {
                    s: "瓯海区"
                },
                {
                    s: "洞头县"
                },
                {
                    s: "永嘉县"
                },
                {
                    s: "平阳县"
                },
                {
                    s: "苍南县"
                },
                {
                    s: "文成县"
                },
                {
                    s: "泰顺县"
                },
                {
                    s: "瑞安市"
                },
                {
                    s: "乐清市"
                }]
            },
            {
                n: "嘉兴",
                a: [{
                    s: "南湖区"
                },
                {
                    s: "秀洲区"
                },
                {
                    s: "嘉善县"
                },
                {
                    s: "海盐县"
                },
                {
                    s: "海宁市"
                },
                {
                    s: "平湖市"
                },
                {
                    s: "桐乡市"
                }]
            },
            {
                n: "湖州",
                a: [{
                    s: "吴兴区"
                },
                {
                    s: "南浔区"
                },
                {
                    s: "德清县"
                },
                {
                    s: "长兴县"
                },
                {
                    s: "安吉县"
                }]
            },
            {
                n: "绍兴",
                a: [{
                    s: "越城区"
                },
                {
                    s: "绍兴县"
                },
                {
                    s: "新昌县"
                },
                {
                    s: "诸暨市"
                },
                {
                    s: "上虞市"
                },
                {
                    s: "嵊州市"
                }]
            },
            {
                n: "金华",
                a: [{
                    s: "婺城区"
                },
                {
                    s: "金东区"
                },
                {
                    s: "武义县"
                },
                {
                    s: "浦江县"
                },
                {
                    s: "磐安县"
                },
                {
                    s: "兰溪市"
                },
                {
                    s: "义乌市"
                },
                {
                    s: "东阳市"
                },
                {
                    s: "永康市"
                }]
            },
            {
                n: "衢州",
                a: [{
                    s: "柯城区"
                },
                {
                    s: "衢江区"
                },
                {
                    s: "常山县"
                },
                {
                    s: "开化县"
                },
                {
                    s: "龙游县"
                },
                {
                    s: "江山市"
                }]
            },
            {
                n: "舟山",
                a: [{
                    s: "定海区"
                },
                {
                    s: "普陀区"
                },
                {
                    s: "岱山县"
                },
                {
                    s: "嵊泗县"
                }]
            },
            {
                n: "台州",
                a: [{
                    s: "椒江区"
                },
                {
                    s: "黄岩区"
                },
                {
                    s: "路桥区"
                },
                {
                    s: "玉环县"
                },
                {
                    s: "三门县"
                },
                {
                    s: "天台县"
                },
                {
                    s: "仙居县"
                },
                {
                    s: "温岭市"
                },
                {
                    s: "临海市"
                }]
            },
            {
                n: "丽水",
                a: [{
                    s: "莲都区"
                },
                {
                    s: "青田县"
                },
                {
                    s: "缙云县"
                },
                {
                    s: "遂昌县"
                },
                {
                    s: "松阳县"
                },
                {
                    s: "云和县"
                },
                {
                    s: "庆元县"
                },
                {
                    s: "景宁畲族自治县"
                },
                {
                    s: "龙泉市"
                }]
            }]
        },
        {
            p: "安徽",
            c: [{
                n: "合肥",
                a: [{
                    s: "瑶海区"
                },
                {
                    s: "庐阳区"
                },
                {
                    s: "蜀山区"
                },
                {
                    s: "包河区"
                },
                {
                    s: "长丰县"
                },
                {
                    s: "肥东县"
                },
                {
                    s: "肥西县"
                }]
            },
            {
                n: "芜湖",
                a: [{
                    s: "镜湖区"
                },
                {
                    s: "弋江区"
                },
                {
                    s: "鸠江区"
                },
                {
                    s: "三山区"
                },
                {
                    s: "芜湖县"
                },
                {
                    s: "繁昌县"
                },
                {
                    s: "南陵县"
                }]
            },
            {
                n: "蚌埠",
                a: [{
                    s: "龙子湖区"
                },
                {
                    s: "蚌山区"
                },
                {
                    s: "禹会区"
                },
                {
                    s: "淮上区"
                },
                {
                    s: "怀远县"
                },
                {
                    s: "五河县"
                },
                {
                    s: "固镇县"
                }]
            },
            {
                n: "淮南",
                a: [{
                    s: "大通区"
                },
                {
                    s: "田家庵区"
                },
                {
                    s: "谢家集区"
                },
                {
                    s: "八公山区"
                },
                {
                    s: "潘集区"
                },
                {
                    s: "凤台县"
                }]
            },
            {
                n: "马鞍山",
                a: [{
                    s: "金家庄区"
                },
                {
                    s: "花山区"
                },
                {
                    s: "雨山区"
                },
                {
                    s: "当涂县"
                }]
            },
            {
                n: "淮北",
                a: [{
                    s: "杜集区"
                },
                {
                    s: "相山区"
                },
                {
                    s: "烈山区"
                },
                {
                    s: "濉溪县"
                }]
            },
            {
                n: "铜陵",
                a: [{
                    s: "铜官山区"
                },
                {
                    s: "狮子山区"
                },
                {
                    s: "郊区"
                },
                {
                    s: "铜陵县"
                }]
            },
            {
                n: "安庆",
                a: [{
                    s: "迎江区"
                },
                {
                    s: "大观区"
                },
                {
                    s: "宜秀区"
                },
                {
                    s: "怀宁县"
                },
                {
                    s: "枞阳县"
                },
                {
                    s: "潜山县"
                },
                {
                    s: "太湖县"
                },
                {
                    s: "宿松县"
                },
                {
                    s: "望江县"
                },
                {
                    s: "岳西县"
                },
                {
                    s: "桐城市"
                }]
            },
            {
                n: "黄山",
                a: [{
                    s: "屯溪区"
                },
                {
                    s: "黄山区"
                },
                {
                    s: "徽州区"
                },
                {
                    s: "歙县"
                },
                {
                    s: "休宁县"
                },
                {
                    s: "黟县"
                },
                {
                    s: "祁门县"
                }]
            },
            {
                n: "滁州",
                a: [{
                    s: "琅琊区"
                },
                {
                    s: "南谯区"
                },
                {
                    s: "来安县"
                },
                {
                    s: "全椒县"
                },
                {
                    s: "定远县"
                },
                {
                    s: "凤阳县"
                },
                {
                    s: "天长市"
                },
                {
                    s: "明光市"
                }]
            },
            {
                n: "阜阳",
                a: [{
                    s: "颍州区"
                },
                {
                    s: "颍东区"
                },
                {
                    s: "颍泉区"
                },
                {
                    s: "临泉县"
                },
                {
                    s: "太和县"
                },
                {
                    s: "阜南县"
                },
                {
                    s: "颍上县"
                },
                {
                    s: "界首市"
                }]
            },
            {
                n: "宿州",
                a: [{
                    s: "埇桥区"
                },
                {
                    s: "砀山县"
                },
                {
                    s: "萧县"
                },
                {
                    s: "灵璧县"
                },
                {
                    s: "泗县"
                }]
            },
            {
                n: "巢湖",
                a: [{
                    s: "居巢区"
                },
                {
                    s: "庐江县"
                },
                {
                    s: "无为县"
                },
                {
                    s: "含山县"
                },
                {
                    s: "和县"
                }]
            },
            {
                n: "六安",
                a: [{
                    s: "金安区"
                },
                {
                    s: "裕安区"
                },
                {
                    s: "寿县"
                },
                {
                    s: "霍邱县"
                },
                {
                    s: "舒城县"
                },
                {
                    s: "金寨县"
                },
                {
                    s: "霍山县"
                }]
            },
            {
                n: "亳州",
                a: [{
                    s: "谯城区"
                },
                {
                    s: "涡阳县"
                },
                {
                    s: "蒙城县"
                },
                {
                    s: "利辛县"
                }]
            },
            {
                n: "池州",
                a: [{
                    s: "贵池区"
                },
                {
                    s: "东至县"
                },
                {
                    s: "石台县"
                },
                {
                    s: "青阳县"
                }]
            },
            {
                n: "宣城",
                a: [{
                    s: "宣州区"
                },
                {
                    s: "郎溪县"
                },
                {
                    s: "广德县"
                },
                {
                    s: "泾县"
                },
                {
                    s: "绩溪县"
                },
                {
                    s: "旌德县"
                },
                {
                    s: "宁国市"
                }]
            }]
        },
        {
            p: "福建",
            c: [{
                n: "福州",
                a: [{
                    s: "鼓楼区"
                },
                {
                    s: "台江区"
                },
                {
                    s: "仓山区"
                },
                {
                    s: "马尾区"
                },
                {
                    s: "晋安区"
                },
                {
                    s: "闽侯县"
                },
                {
                    s: "连江县"
                },
                {
                    s: "罗源县"
                },
                {
                    s: "闽清县"
                },
                {
                    s: "永泰县"
                },
                {
                    s: "平潭县"
                },
                {
                    s: "福清市"
                },
                {
                    s: "长乐市"
                }]
            },
            {
                n: "厦门",
                a: [{
                    s: "思明区"
                },
                {
                    s: "海沧区"
                },
                {
                    s: "湖里区"
                },
                {
                    s: "集美区"
                },
                {
                    s: "同安区"
                },
                {
                    s: "翔安区"
                }]
            },
            {
                n: "莆田",
                a: [{
                    s: "城厢区"
                },
                {
                    s: "涵江区"
                },
                {
                    s: "荔城区"
                },
                {
                    s: "秀屿区"
                },
                {
                    s: "仙游县"
                }]
            },
            {
                n: "三明",
                a: [{
                    s: "梅列区"
                },
                {
                    s: "三元区"
                },
                {
                    s: "明溪县"
                },
                {
                    s: "清流县"
                },
                {
                    s: "宁化县"
                },
                {
                    s: "大田县"
                },
                {
                    s: "尤溪县"
                },
                {
                    s: "沙县"
                },
                {
                    s: "将乐县"
                },
                {
                    s: "泰宁县"
                },
                {
                    s: "建宁县"
                },
                {
                    s: "永安市"
                }]
            },
            {
                n: "泉州",
                a: [{
                    s: "鲤城区"
                },
                {
                    s: "丰泽区"
                },
                {
                    s: "洛江区"
                },
                {
                    s: "泉港区"
                },
                {
                    s: "惠安县"
                },
                {
                    s: "安溪县"
                },
                {
                    s: "永春县"
                },
                {
                    s: "德化县"
                },
                {
                    s: "金门县"
                },
                {
                    s: "石狮市"
                },
                {
                    s: "晋江市"
                },
                {
                    s: "南安市"
                }]
            },
            {
                n: "漳州",
                a: [{
                    s: "芗城区"
                },
                {
                    s: "龙文区"
                },
                {
                    s: "云霄县"
                },
                {
                    s: "漳浦县"
                },
                {
                    s: "诏安县"
                },
                {
                    s: "长泰县"
                },
                {
                    s: "东山县"
                },
                {
                    s: "南靖县"
                },
                {
                    s: "平和县"
                },
                {
                    s: "华安县"
                },
                {
                    s: "龙海市"
                }]
            },
            {
                n: "南平",
                a: [{
                    s: "延平区"
                },
                {
                    s: "顺昌县"
                },
                {
                    s: "浦城县"
                },
                {
                    s: "光泽县"
                },
                {
                    s: "松溪县"
                },
                {
                    s: "政和县"
                },
                {
                    s: "邵武市"
                },
                {
                    s: "武夷山市"
                },
                {
                    s: "建瓯市"
                },
                {
                    s: "建阳市"
                }]
            },
            {
                n: "龙岩",
                a: [{
                    s: "新罗区"
                },
                {
                    s: "长汀县"
                },
                {
                    s: "永定县"
                },
                {
                    s: "上杭县"
                },
                {
                    s: "武平县"
                },
                {
                    s: "连城县"
                },
                {
                    s: "漳平市"
                }]
            },
            {
                n: "宁德",
                a: [{
                    s: "蕉城区"
                },
                {
                    s: "霞浦县"
                },
                {
                    s: "古田县"
                },
                {
                    s: "屏南县"
                },
                {
                    s: "寿宁县"
                },
                {
                    s: "周宁县"
                },
                {
                    s: "柘荣县"
                },
                {
                    s: "福安市"
                },
                {
                    s: "福鼎市"
                }]
            }]
        },
        {
            p: "江西",
            c: [{
                n: "南昌",
                a: [{
                    s: "东湖区"
                },
                {
                    s: "西湖区"
                },
                {
                    s: "青云谱区"
                },
                {
                    s: "湾里区"
                },
                {
                    s: "青山湖区"
                },
                {
                    s: "南昌县"
                },
                {
                    s: "新建县"
                },
                {
                    s: "安义县"
                },
                {
                    s: "进贤县"
                }]
            },
            {
                n: "景德镇",
                a: [{
                    s: "昌江区"
                },
                {
                    s: "珠山区"
                },
                {
                    s: "浮梁县"
                },
                {
                    s: "乐平市"
                }]
            },
            {
                n: "萍乡",
                a: [{
                    s: "安源区"
                },
                {
                    s: "湘东区"
                },
                {
                    s: "莲花县"
                },
                {
                    s: "上栗县"
                },
                {
                    s: "芦溪县"
                }]
            },
            {
                n: "九江",
                a: [{
                    s: "庐山区"
                },
                {
                    s: "浔阳区"
                },
                {
                    s: "九江县"
                },
                {
                    s: "武宁县"
                },
                {
                    s: "修水县"
                },
                {
                    s: "永修县"
                },
                {
                    s: "德安县"
                },
                {
                    s: "星子县"
                },
                {
                    s: "都昌县"
                },
                {
                    s: "湖口县"
                },
                {
                    s: "彭泽县"
                },
                {
                    s: "瑞昌市"
                }]
            },
            {
                n: "新余",
                a: [{
                    s: "渝水区"
                },
                {
                    s: "分宜县"
                }]
            },
            {
                n: "鹰潭",
                a: [{
                    s: "月湖区"
                },
                {
                    s: "余江县"
                },
                {
                    s: "贵溪市"
                }]
            },
            {
                n: "赣州",
                a: [{
                    s: "章贡区"
                },
                {
                    s: "赣县"
                },
                {
                    s: "信丰县"
                },
                {
                    s: "大余县"
                },
                {
                    s: "上犹县"
                },
                {
                    s: "崇义县"
                },
                {
                    s: "安远县"
                },
                {
                    s: "龙南县"
                },
                {
                    s: "定南县"
                },
                {
                    s: "全南县"
                },
                {
                    s: "宁都县"
                },
                {
                    s: "于都县"
                },
                {
                    s: "兴国县"
                },
                {
                    s: "会昌县"
                },
                {
                    s: "寻乌县"
                },
                {
                    s: "石城县"
                },
                {
                    s: "瑞金市"
                },
                {
                    s: "南康市"
                }]
            },
            {
                n: "吉安",
                a: [{
                    s: "吉州区"
                },
                {
                    s: "青原区"
                },
                {
                    s: "吉安县"
                },
                {
                    s: "吉水县"
                },
                {
                    s: "峡江县"
                },
                {
                    s: "新干县"
                },
                {
                    s: "永丰县"
                },
                {
                    s: "泰和县"
                },
                {
                    s: "遂川县"
                },
                {
                    s: "万安县"
                },
                {
                    s: "安福县"
                },
                {
                    s: "永新县"
                },
                {
                    s: "井冈山市"
                }]
            },
            {
                n: "宜春",
                a: [{
                    s: "袁州区"
                },
                {
                    s: "奉新县"
                },
                {
                    s: "万载县"
                },
                {
                    s: "上高县"
                },
                {
                    s: "宜丰县"
                },
                {
                    s: "靖安县"
                },
                {
                    s: "铜鼓县"
                },
                {
                    s: "丰城市"
                },
                {
                    s: "樟树市"
                },
                {
                    s: "高安市"
                }]
            },
            {
                n: "抚州",
                a: [{
                    s: "临川区"
                },
                {
                    s: "南城县"
                },
                {
                    s: "黎川县"
                },
                {
                    s: "南丰县"
                },
                {
                    s: "崇仁县"
                },
                {
                    s: "乐安县"
                },
                {
                    s: "宜黄县"
                },
                {
                    s: "金溪县"
                },
                {
                    s: "资溪县"
                },
                {
                    s: "东乡县"
                },
                {
                    s: "广昌县"
                }]
            },
            {
                n: "上饶",
                a: [{
                    s: "信州区"
                },
                {
                    s: "上饶县"
                },
                {
                    s: "广丰县"
                },
                {
                    s: "玉山县"
                },
                {
                    s: "铅山县"
                },
                {
                    s: "横峰县"
                },
                {
                    s: "弋阳县"
                },
                {
                    s: "余干县"
                },
                {
                    s: "鄱阳县"
                },
                {
                    s: "万年县"
                },
                {
                    s: "婺源县"
                },
                {
                    s: "德兴市"
                }]
            }]
        },
        {
            p: "山东",
            c: [{
                n: "济南",
                a: [{
                    s: "历下区"
                },
                {
                    s: "市中区"
                },
                {
                    s: "槐荫区"
                },
                {
                    s: "天桥区"
                },
                {
                    s: "历城区"
                },
                {
                    s: "长清区"
                },
                {
                    s: "平阴县"
                },
                {
                    s: "济阳县"
                },
                {
                    s: "商河县"
                },
                {
                    s: "章丘市"
                }]
            },
            {
                n: "青岛",
                a: [{
                    s: "市南区"
                },
                {
                    s: "市北区"
                },
                {
                    s: "四方区"
                },
                {
                    s: "黄岛区"
                },
                {
                    s: "崂山区"
                },
                {
                    s: "李沧区"
                },
                {
                    s: "城阳区"
                },
                {
                    s: "胶州市"
                },
                {
                    s: "即墨市"
                },
                {
                    s: "平度市"
                },
                {
                    s: "胶南市"
                },
                {
                    s: "莱西市"
                }]
            },
            {
                n: "淄博",
                a: [{
                    s: "淄川区"
                },
                {
                    s: "张店区"
                },
                {
                    s: "博山区"
                },
                {
                    s: "临淄区"
                },
                {
                    s: "周村区"
                },
                {
                    s: "桓台县"
                },
                {
                    s: "高青县"
                },
                {
                    s: "沂源县"
                }]
            },
            {
                n: "枣庄",
                a: [{
                    s: "市中区"
                },
                {
                    s: "薛城区"
                },
                {
                    s: "峄城区"
                },
                {
                    s: "台儿庄区"
                },
                {
                    s: "山亭区"
                },
                {
                    s: "滕州市"
                }]
            },
            {
                n: "东营",
                a: [{
                    s: "东营区"
                },
                {
                    s: "河口区"
                },
                {
                    s: "垦利县"
                },
                {
                    s: "利津县"
                },
                {
                    s: "广饶县"
                }]
            },
            {
                n: "烟台",
                a: [{
                    s: "芝罘区"
                },
                {
                    s: "福山区"
                },
                {
                    s: "牟平区"
                },
                {
                    s: "莱山区"
                },
                {
                    s: "长岛县"
                },
                {
                    s: "龙口市"
                },
                {
                    s: "莱阳市"
                },
                {
                    s: "莱州市"
                },
                {
                    s: "蓬莱市"
                },
                {
                    s: "招远市"
                },
                {
                    s: "栖霞市"
                },
                {
                    s: "海阳市"
                }]
            },
            {
                n: "潍坊",
                a: [{
                    s: "潍城区"
                },
                {
                    s: "寒亭区"
                },
                {
                    s: "坊子区"
                },
                {
                    s: "奎文区"
                },
                {
                    s: "临朐县"
                },
                {
                    s: "昌乐县"
                },
                {
                    s: "青州市"
                },
                {
                    s: "诸城市"
                },
                {
                    s: "寿光市"
                },
                {
                    s: "安丘市"
                },
                {
                    s: "高密市"
                },
                {
                    s: "昌邑市"
                }]
            },
            {
                n: "济宁",
                a: [{
                    s: "市中区"
                },
                {
                    s: "任城区"
                },
                {
                    s: "微山县"
                },
                {
                    s: "鱼台县"
                },
                {
                    s: "金乡县"
                },
                {
                    s: "嘉祥县"
                },
                {
                    s: "汶上县"
                },
                {
                    s: "泗水县"
                },
                {
                    s: "梁山县"
                },
                {
                    s: "曲阜市"
                },
                {
                    s: "兖州市"
                },
                {
                    s: "邹城市"
                }]
            },
            {
                n: "泰安",
                a: [{
                    s: "泰山区"
                },
                {
                    s: "岱岳区"
                },
                {
                    s: "宁阳县"
                },
                {
                    s: "东平县"
                },
                {
                    s: "新泰市"
                },
                {
                    s: "肥城市"
                }]
            },
            {
                n: "威海",
                a: [{
                    s: "环翠区"
                },
                {
                    s: "文登市"
                },
                {
                    s: "荣成市"
                },
                {
                    s: "乳山市"
                }]
            },
            {
                n: "日照",
                a: [{
                    s: "东港区"
                },
                {
                    s: "岚山区"
                },
                {
                    s: "五莲县"
                },
                {
                    s: "莒县"
                }]
            },
            {
                n: "莱芜",
                a: [{
                    s: "莱城区"
                },
                {
                    s: "钢城区"
                }]
            },
            {
                n: "临沂",
                a: [{
                    s: "兰山区"
                },
                {
                    s: "罗庄区"
                },
                {
                    s: "河东区"
                },
                {
                    s: "沂南县"
                },
                {
                    s: "郯城县"
                },
                {
                    s: "沂水县"
                },
                {
                    s: "苍山县"
                },
                {
                    s: "费县"
                },
                {
                    s: "平邑县"
                },
                {
                    s: "莒南县"
                },
                {
                    s: "蒙阴县"
                },
                {
                    s: "临沭县"
                }]
            },
            {
                n: "德州",
                a: [{
                    s: "德城区"
                },
                {
                    s: "陵县"
                },
                {
                    s: "宁津县"
                },
                {
                    s: "庆云县"
                },
                {
                    s: "临邑县"
                },
                {
                    s: "齐河县"
                },
                {
                    s: "平原县"
                },
                {
                    s: "夏津县"
                },
                {
                    s: "武城县"
                },
                {
                    s: "乐陵市"
                },
                {
                    s: "禹城市"
                }]
            },
            {
                n: "聊城",
                a: [{
                    s: "东昌府区"
                },
                {
                    s: "阳谷县"
                },
                {
                    s: "莘县"
                },
                {
                    s: "茌平县"
                },
                {
                    s: "东阿县"
                },
                {
                    s: "冠县"
                },
                {
                    s: "高唐县"
                },
                {
                    s: "临清市"
                }]
            },
            {
                n: "滨州",
                a: [{
                    s: "滨城区"
                },
                {
                    s: "惠民县"
                },
                {
                    s: "阳信县"
                },
                {
                    s: "无棣县"
                },
                {
                    s: "沾化县"
                },
                {
                    s: "博兴县"
                },
                {
                    s: "邹平县"
                }]
            },
            {
                n: "菏泽",
                a: [{
                    s: "牡丹区"
                },
                {
                    s: "曹县"
                },
                {
                    s: "单县"
                },
                {
                    s: "成武县"
                },
                {
                    s: "巨野县"
                },
                {
                    s: "郓城县"
                },
                {
                    s: "鄄城县"
                },
                {
                    s: "定陶县"
                },
                {
                    s: "东明县"
                }]
            }]
        },
        {
            p: "河南",
            c: [{
                n: "郑州",
                a: [{
                    s: "中原区"
                },
                {
                    s: "二七区"
                },
                {
                    s: "管城回族区"
                },
                {
                    s: "金水区"
                },
                {
                    s: "上街区"
                },
                {
                    s: "惠济区"
                },
                {
                    s: "中牟县"
                },
                {
                    s: "巩义市"
                },
                {
                    s: "荥阳市"
                },
                {
                    s: "新密市"
                },
                {
                    s: "新郑市"
                },
                {
                    s: "登封市"
                },
                {
                    s: "高新区"
                },
                {
                    s: "郑东新区"
                }]
            },
            {
                n: "开封",
                a: [{
                    s: "龙亭区"
                },
                {
                    s: "顺河回族区"
                },
                {
                    s: "鼓楼区"
                },
                {
                    s: "禹王台区"
                },
                {
                    s: "金明区"
                },
                {
                    s: "杞县"
                },
                {
                    s: "通许县"
                },
                {
                    s: "尉氏县"
                },
                {
                    s: "开封县"
                },
                {
                    s: "兰考县"
                }]
            },
            {
                n: "洛阳",
                a: [{
                    s: "老城区"
                },
                {
                    s: "西工区"
                },
                {
                    s: "廛河回族区"
                },
                {
                    s: "涧西区"
                },
                {
                    s: "吉利区"
                },
                {
                    s: "洛龙区"
                },
                {
                    s: "孟津县"
                },
                {
                    s: "新安县"
                },
                {
                    s: "栾川县"
                },
                {
                    s: "嵩县"
                },
                {
                    s: "汝阳县"
                },
                {
                    s: "宜阳县"
                },
                {
                    s: "洛宁县"
                },
                {
                    s: "伊川县"
                },
                {
                    s: "偃师市"
                }]
            },
            {
                n: "平顶山",
                a: [{
                    s: "新华区"
                },
                {
                    s: "卫东区"
                },
                {
                    s: "石龙区"
                },
                {
                    s: "湛河区"
                },
                {
                    s: "宝丰县"
                },
                {
                    s: "叶县"
                },
                {
                    s: "鲁山县"
                },
                {
                    s: "郏县"
                },
                {
                    s: "舞钢市"
                },
                {
                    s: "汝州市"
                }]
            },
            {
                n: "安阳",
                a: [{
                    s: "文峰区"
                },
                {
                    s: "北关区"
                },
                {
                    s: "殷都区"
                },
                {
                    s: "龙安区"
                },
                {
                    s: "安阳县"
                },
                {
                    s: "汤阴县"
                },
                {
                    s: "滑县"
                },
                {
                    s: "内黄县"
                },
                {
                    s: "林州市"
                }]
            },
            {
                n: "鹤壁",
                a: [{
                    s: "鹤山区"
                },
                {
                    s: "山城区"
                },
                {
                    s: "淇滨区"
                },
                {
                    s: "浚县"
                },
                {
                    s: "淇县"
                }]
            },
            {
                n: "新乡",
                a: [{
                    s: "红旗区"
                },
                {
                    s: "卫滨区"
                },
                {
                    s: "凤泉区"
                },
                {
                    s: "牧野区"
                },
                {
                    s: "新乡县"
                },
                {
                    s: "获嘉县"
                },
                {
                    s: "原阳县"
                },
                {
                    s: "延津县"
                },
                {
                    s: "封丘县"
                },
                {
                    s: "长垣县"
                },
                {
                    s: "卫辉市"
                },
                {
                    s: "辉县市"
                }]
            },
            {
                n: "焦作",
                a: [{
                    s: "解放区"
                },
                {
                    s: "中站区"
                },
                {
                    s: "马村区"
                },
                {
                    s: "山阳区"
                },
                {
                    s: "修武县"
                },
                {
                    s: "博爱县"
                },
                {
                    s: "武陟县"
                },
                {
                    s: "温县"
                },
                {
                    s: "沁阳市"
                },
                {
                    s: "孟州市"
                }]
            },
            {
                n: "濮阳",
                a: [{
                    s: "华龙区"
                },
                {
                    s: "清丰县"
                },
                {
                    s: "南乐县"
                },
                {
                    s: "范县"
                },
                {
                    s: "台前县"
                },
                {
                    s: "濮阳县"
                }]
            },
            {
                n: "许昌",
                a: [{
                    s: "魏都区"
                },
                {
                    s: "许昌县"
                },
                {
                    s: "鄢陵县"
                },
                {
                    s: "襄城县"
                },
                {
                    s: "禹州市"
                },
                {
                    s: "长葛市"
                }]
            },
            {
                n: "漯河",
                a: [{
                    s: "源汇区"
                },
                {
                    s: "郾城区"
                },
                {
                    s: "召陵区"
                },
                {
                    s: "舞阳县"
                },
                {
                    s: "临颍县"
                }]
            },
            {
                n: "三门峡",
                a: [{
                    s: "湖滨区"
                },
                {
                    s: "渑池县"
                },
                {
                    s: "陕县"
                },
                {
                    s: "卢氏县"
                },
                {
                    s: "义马市"
                },
                {
                    s: "灵宝市"
                }]
            },
            {
                n: "南阳",
                a: [{
                    s: "宛城区"
                },
                {
                    s: "卧龙区"
                },
                {
                    s: "南召县"
                },
                {
                    s: "方城县"
                },
                {
                    s: "西峡县"
                },
                {
                    s: "镇平县"
                },
                {
                    s: "内乡县"
                },
                {
                    s: "淅川县"
                },
                {
                    s: "社旗县"
                },
                {
                    s: "唐河县"
                },
                {
                    s: "新野县"
                },
                {
                    s: "桐柏县"
                },
                {
                    s: "邓州市"
                }]
            },
            {
                n: "商丘",
                a: [{
                    s: "梁园区"
                },
                {
                    s: "睢阳区"
                },
                {
                    s: "民权县"
                },
                {
                    s: "睢县"
                },
                {
                    s: "宁陵县"
                },
                {
                    s: "柘城县"
                },
                {
                    s: "虞城县"
                },
                {
                    s: "夏邑县"
                },
                {
                    s: "永城市"
                }]
            },
            {
                n: "信阳",
                a: [{
                    s: "浉河区"
                },
                {
                    s: "平桥区"
                },
                {
                    s: "罗山县"
                },
                {
                    s: "光山县"
                },
                {
                    s: "新县"
                },
                {
                    s: "商城县"
                },
                {
                    s: "固始县"
                },
                {
                    s: "潢川县"
                },
                {
                    s: "淮滨县"
                },
                {
                    s: "息县"
                }]
            },
            {
                n: "周口",
                a: [{
                    s: "川汇区"
                },
                {
                    s: "扶沟县"
                },
                {
                    s: "西华县"
                },
                {
                    s: "商水县"
                },
                {
                    s: "沈丘县"
                },
                {
                    s: "郸城县"
                },
                {
                    s: "淮阳县"
                },
                {
                    s: "太康县"
                },
                {
                    s: "鹿邑县"
                },
                {
                    s: "项城市"
                }]
            },
            {
                n: "驻马店",
                a: [{
                    s: "驿城区"
                },
                {
                    s: "西平县"
                },
                {
                    s: "上蔡县"
                },
                {
                    s: "平舆县"
                },
                {
                    s: "正阳县"
                },
                {
                    s: "确山县"
                },
                {
                    s: "泌阳县"
                },
                {
                    s: "汝南县"
                },
                {
                    s: "遂平县"
                },
                {
                    s: "新蔡县"
                }]
            },
            {
                n: "济源",
                a: [{
                    s: "济源"
                }]
            }]
        },
        {
            p: "湖北",
            c: [{
                n: "武汉",
                a: [{
                    s: "江岸区"
                },
                {
                    s: "江汉区"
                },
                {
                    s: "硚口区"
                },
                {
                    s: "汉阳区"
                },
                {
                    s: "武昌区"
                },
                {
                    s: "青山区"
                },
                {
                    s: "洪山区"
                },
                {
                    s: "东西湖区"
                },
                {
                    s: "汉南区"
                },
                {
                    s: "蔡甸区"
                },
                {
                    s: "江夏区"
                },
                {
                    s: "黄陂区"
                },
                {
                    s: "新洲区"
                }]
            },
            {
                n: "黄石",
                a: [{
                    s: "黄石港区"
                },
                {
                    s: "西塞山区"
                },
                {
                    s: "下陆区"
                },
                {
                    s: "铁山区"
                },
                {
                    s: "阳新县"
                },
                {
                    s: "大冶市"
                }]
            },
            {
                n: "十堰",
                a: [{
                    s: "茅箭区"
                },
                {
                    s: "张湾区"
                },
                {
                    s: "郧县"
                },
                {
                    s: "郧西县"
                },
                {
                    s: "竹山县"
                },
                {
                    s: "竹溪县"
                },
                {
                    s: "房县"
                },
                {
                    s: "丹江口市"
                }]
            },
            {
                n: "宜昌",
                a: [{
                    s: "西陵区"
                },
                {
                    s: "伍家岗区"
                },
                {
                    s: "点军区"
                },
                {
                    s: "猇亭区"
                },
                {
                    s: "夷陵区"
                },
                {
                    s: "远安县"
                },
                {
                    s: "兴山县"
                },
                {
                    s: "秭归县"
                },
                {
                    s: "长阳土家族自治县"
                },
                {
                    s: "五峰土家族自治县"
                },
                {
                    s: "宜都市"
                },
                {
                    s: "当阳市"
                },
                {
                    s: "枝江市"
                }]
            },
            {
                n: "襄樊",
                a: [{
                    s: "襄城区"
                },
                {
                    s: "樊城区"
                },
                {
                    s: "襄阳区"
                },
                {
                    s: "南漳县"
                },
                {
                    s: "谷城县"
                },
                {
                    s: "保康县"
                },
                {
                    s: "老河口市"
                },
                {
                    s: "枣阳市"
                },
                {
                    s: "宜城市"
                }]
            },
            {
                n: "鄂州",
                a: [{
                    s: "梁子湖区"
                },
                {
                    s: "华容区"
                },
                {
                    s: "鄂城区"
                }]
            },
            {
                n: "荆门",
                a: [{
                    s: "东宝区"
                },
                {
                    s: "掇刀区"
                },
                {
                    s: "京山县"
                },
                {
                    s: "沙洋县"
                },
                {
                    s: "钟祥市"
                }]
            },
            {
                n: "孝感",
                a: [{
                    s: "孝南区"
                },
                {
                    s: "孝昌县"
                },
                {
                    s: "大悟县"
                },
                {
                    s: "云梦县"
                },
                {
                    s: "应城市"
                },
                {
                    s: "安陆市"
                },
                {
                    s: "汉川市"
                }]
            },
            {
                n: "荆州",
                a: [{
                    s: "沙市区"
                },
                {
                    s: "荆州区"
                },
                {
                    s: "公安县"
                },
                {
                    s: "监利县"
                },
                {
                    s: "江陵县"
                },
                {
                    s: "石首市"
                },
                {
                    s: "洪湖市"
                },
                {
                    s: "松滋市"
                }]
            },
            {
                n: "黄冈",
                a: [{
                    s: "黄州区"
                },
                {
                    s: "团风县"
                },
                {
                    s: "红安县"
                },
                {
                    s: "罗田县"
                },
                {
                    s: "英山县"
                },
                {
                    s: "浠水县"
                },
                {
                    s: "蕲春县"
                },
                {
                    s: "黄梅县"
                },
                {
                    s: "麻城市"
                },
                {
                    s: "武穴市"
                }]
            },
            {
                n: "咸宁",
                a: [{
                    s: "咸安区"
                },
                {
                    s: "嘉鱼县"
                },
                {
                    s: "通城县"
                },
                {
                    s: "崇阳县"
                },
                {
                    s: "通山县"
                },
                {
                    s: "赤壁市"
                }]
            },
            {
                n: "随州",
                a: [{
                    s: "曾都区"
                },
                {
                    s: "随县"
                },
                {
                    s: "广水市"
                }]
            },
            {
                n: "恩施",
                a: [{
                    s: "恩施市"
                },
                {
                    s: "利川市"
                },
                {
                    s: "建始县"
                },
                {
                    s: "巴东县"
                },
                {
                    s: "宣恩县"
                },
                {
                    s: "咸丰县"
                },
                {
                    s: "来凤县"
                },
                {
                    s: "鹤峰县"
                }]
            },
            {
                n: "仙桃",
                a: [{
                    s: "仙桃"
                }]
            },
            {
                n: "潜江",
                a: [{
                    s: "潜江"
                }]
            },
            {
                n: "天门",
                a: [{
                    s: "天门"
                }]
            },
            {
                n: "神农架",
                a: [{
                    s: "神农架"
                }]
            }]
        },
        {
            p: "湖南",
            c: [{
                n: "长沙",
                a: [{
                    s: "芙蓉区"
                },
                {
                    s: "天心区"
                },
                {
                    s: "岳麓区"
                },
                {
                    s: "开福区"
                },
                {
                    s: "雨花区"
                },
                {
                    s: "长沙县"
                },
                {
                    s: "望城县"
                },
                {
                    s: "宁乡县"
                },
                {
                    s: "浏阳市"
                }]
            },
            {
                n: "株洲",
                a: [{
                    s: "荷塘区"
                },
                {
                    s: "芦淞区"
                },
                {
                    s: "石峰区"
                },
                {
                    s: "天元区"
                },
                {
                    s: "株洲县"
                },
                {
                    s: "攸县"
                },
                {
                    s: "茶陵县"
                },
                {
                    s: "炎陵县"
                },
                {
                    s: "醴陵市"
                }]
            },
            {
                n: "湘潭",
                a: [{
                    s: "雨湖区"
                },
                {
                    s: "岳塘区"
                },
                {
                    s: "湘潭县"
                },
                {
                    s: "湘乡市"
                },
                {
                    s: "韶山市"
                }]
            },
            {
                n: "衡阳",
                a: [{
                    s: "珠晖区"
                },
                {
                    s: "雁峰区"
                },
                {
                    s: "石鼓区"
                },
                {
                    s: "蒸湘区"
                },
                {
                    s: "南岳区"
                },
                {
                    s: "衡阳县"
                },
                {
                    s: "衡南县"
                },
                {
                    s: "衡山县"
                },
                {
                    s: "衡东县"
                },
                {
                    s: "祁东县"
                },
                {
                    s: "耒阳市"
                },
                {
                    s: "常宁市"
                }]
            },
            {
                n: "邵阳",
                a: [{
                    s: "双清区"
                },
                {
                    s: "大祥区"
                },
                {
                    s: "北塔区"
                },
                {
                    s: "邵东县"
                },
                {
                    s: "新邵县"
                },
                {
                    s: "邵阳县"
                },
                {
                    s: "隆回县"
                },
                {
                    s: "洞口县"
                },
                {
                    s: "绥宁县"
                },
                {
                    s: "新宁县"
                },
                {
                    s: "城步苗族自治县"
                },
                {
                    s: "武冈市"
                }]
            },
            {
                n: "岳阳",
                a: [{
                    s: "岳阳楼区"
                },
                {
                    s: "云溪区"
                },
                {
                    s: "君山区"
                },
                {
                    s: "岳阳县"
                },
                {
                    s: "华容县"
                },
                {
                    s: "湘阴县"
                },
                {
                    s: "平江县"
                },
                {
                    s: "汨罗市"
                },
                {
                    s: "临湘市"
                }]
            },
            {
                n: "常德",
                a: [{
                    s: "武陵区"
                },
                {
                    s: "鼎城区"
                },
                {
                    s: "安乡县"
                },
                {
                    s: "汉寿县"
                },
                {
                    s: "澧县"
                },
                {
                    s: "临澧县"
                },
                {
                    s: "桃源县"
                },
                {
                    s: "石门县"
                },
                {
                    s: "津市市"
                }]
            },
            {
                n: "张家界",
                a: [{
                    s: "永定区"
                },
                {
                    s: "武陵源区"
                },
                {
                    s: "慈利县"
                },
                {
                    s: "桑植县"
                }]
            },
            {
                n: "益阳",
                a: [{
                    s: "资阳区"
                },
                {
                    s: "赫山区"
                },
                {
                    s: "南县"
                },
                {
                    s: "桃江县"
                },
                {
                    s: "安化县"
                },
                {
                    s: "沅江市"
                }]
            },
            {
                n: "郴州",
                a: [{
                    s: "北湖区"
                },
                {
                    s: "苏仙区"
                },
                {
                    s: "桂阳县"
                },
                {
                    s: "宜章县"
                },
                {
                    s: "永兴县"
                },
                {
                    s: "嘉禾县"
                },
                {
                    s: "临武县"
                },
                {
                    s: "汝城县"
                },
                {
                    s: "桂东县"
                },
                {
                    s: "安仁县"
                },
                {
                    s: "资兴市"
                }]
            },
            {
                n: "永州",
                a: [{
                    s: "零陵区"
                },
                {
                    s: "冷水滩区"
                },
                {
                    s: "祁阳县"
                },
                {
                    s: "东安县"
                },
                {
                    s: "双牌县"
                },
                {
                    s: "道县"
                },
                {
                    s: "江永县"
                },
                {
                    s: "宁远县"
                },
                {
                    s: "蓝山县"
                },
                {
                    s: "新田县"
                },
                {
                    s: "江华瑶族自治县"
                }]
            },
            {
                n: "怀化",
                a: [{
                    s: "鹤城区"
                },
                {
                    s: "中方县"
                },
                {
                    s: "沅陵县"
                },
                {
                    s: "辰溪县"
                },
                {
                    s: "溆浦县"
                },
                {
                    s: "会同县"
                },
                {
                    s: "麻阳苗族自治县"
                },
                {
                    s: "新晃侗族自治县"
                },
                {
                    s: "芷江侗族自治县"
                },
                {
                    s: "靖州苗族侗族自治县"
                },
                {
                    s: "通道侗族自治县"
                },
                {
                    s: "洪江市"
                }]
            },
            {
                n: "娄底",
                a: [{
                    s: "娄星区"
                },
                {
                    s: "双峰县"
                },
                {
                    s: "新化县"
                },
                {
                    s: "冷水江市"
                },
                {
                    s: "涟源市"
                }]
            },
            {
                n: "湘西",
                a: [{
                    s: "吉首市"
                },
                {
                    s: "泸溪县"
                },
                {
                    s: "凤凰县"
                },
                {
                    s: "花垣县"
                },
                {
                    s: "保靖县"
                },
                {
                    s: "古丈县"
                },
                {
                    s: "永顺县"
                },
                {
                    s: "龙山县"
                }]
            }]
        },
        {
            p: "广东",
            c: [{
                n: "广州",
                a: [{
                    s: "荔湾区"
                },
                {
                    s: "越秀区"
                },
                {
                    s: "海珠区"
                },
                {
                    s: "天河区"
                },
                {
                    s: "白云区"
                },
                {
                    s: "黄埔区"
                },
                {
                    s: "番禺区"
                },
                {
                    s: "花都区"
                },
                {
                    s: "南沙区"
                },
                {
                    s: "萝岗区"
                },
                {
                    s: "增城市"
                },
                {
                    s: "从化市"
                }]
            },
            {
                n: "韶关",
                a: [{
                    s: "武江区"
                },
                {
                    s: "浈江区"
                },
                {
                    s: "曲江区"
                },
                {
                    s: "始兴县"
                },
                {
                    s: "仁化县"
                },
                {
                    s: "翁源县"
                },
                {
                    s: "乳源瑶族自治县"
                },
                {
                    s: "新丰县"
                },
                {
                    s: "乐昌市"
                },
                {
                    s: "南雄市"
                }]
            },
            {
                n: "深圳",
                a: [{
                    s: "罗湖区"
                },
                {
                    s: "福田区"
                },
                {
                    s: "南山区"
                },
                {
                    s: "宝安区"
                },
                {
                    s: "龙岗区"
                },
                {
                    s: "盐田区"
                }]
            },
            {
                n: "珠海",
                a: [{
                    s: "香洲区"
                },
                {
                    s: "斗门区"
                },
                {
                    s: "金湾区"
                }]
            },
            {
                n: "汕头",
                a: [{
                    s: "龙湖区"
                },
                {
                    s: "金平区"
                },
                {
                    s: "濠江区"
                },
                {
                    s: "潮阳区"
                },
                {
                    s: "潮南区"
                },
                {
                    s: "澄海区"
                },
                {
                    s: "南澳县"
                }]
            },
            {
                n: "佛山",
                a: [{
                    s: "禅城区"
                },
                {
                    s: "南海区"
                },
                {
                    s: "顺德区"
                },
                {
                    s: "三水区"
                },
                {
                    s: "高明区"
                }]
            },
            {
                n: "江门",
                a: [{
                    s: "蓬江区"
                },
                {
                    s: "江海区"
                },
                {
                    s: "新会区"
                },
                {
                    s: "台山市"
                },
                {
                    s: "开平市"
                },
                {
                    s: "鹤山市"
                },
                {
                    s: "恩平市"
                }]
            },
            {
                n: "湛江",
                a: [{
                    s: "赤坎区"
                },
                {
                    s: "霞山区"
                },
                {
                    s: "坡头区"
                },
                {
                    s: "麻章区"
                },
                {
                    s: "遂溪县"
                },
                {
                    s: "徐闻县"
                },
                {
                    s: "廉江市"
                },
                {
                    s: "雷州市"
                },
                {
                    s: "吴川市"
                }]
            },
            {
                n: "茂名",
                a: [{
                    s: "茂南区"
                },
                {
                    s: "茂港区"
                },
                {
                    s: "电白县"
                },
                {
                    s: "高州市"
                },
                {
                    s: "化州市"
                },
                {
                    s: "信宜市"
                }]
            },
            {
                n: "肇庆",
                a: [{
                    s: "端州区"
                },
                {
                    s: "鼎湖区"
                },
                {
                    s: "广宁县"
                },
                {
                    s: "怀集县"
                },
                {
                    s: "封开县"
                },
                {
                    s: "德庆县"
                },
                {
                    s: "高要市"
                },
                {
                    s: "四会市"
                }]
            },
            {
                n: "惠州",
                a: [{
                    s: "惠城区"
                },
                {
                    s: "惠阳区"
                },
                {
                    s: "博罗县"
                },
                {
                    s: "惠东县"
                },
                {
                    s: "龙门县"
                }]
            },
            {
                n: "梅州",
                a: [{
                    s: "梅江区"
                },
                {
                    s: "梅县"
                },
                {
                    s: "大埔县"
                },
                {
                    s: "丰顺县"
                },
                {
                    s: "五华县"
                },
                {
                    s: "平远县"
                },
                {
                    s: "蕉岭县"
                },
                {
                    s: "兴宁市"
                }]
            },
            {
                n: "汕尾",
                a: [{
                    s: "城区"
                },
                {
                    s: "海丰县"
                },
                {
                    s: "陆河县"
                },
                {
                    s: "陆丰市"
                }]
            },
            {
                n: "河源",
                a: [{
                    s: "源城区"
                },
                {
                    s: "紫金县"
                },
                {
                    s: "龙川县"
                },
                {
                    s: "连平县"
                },
                {
                    s: "和平县"
                },
                {
                    s: "东源县"
                }]
            },
            {
                n: "阳江",
                a: [{
                    s: "江城区"
                },
                {
                    s: "阳西县"
                },
                {
                    s: "阳东县"
                },
                {
                    s: "阳春市"
                }]
            },
            {
                n: "清远",
                a: [{
                    s: "清城区"
                },
                {
                    s: "佛冈县"
                },
                {
                    s: "阳山县"
                },
                {
                    s: "连山壮族瑶族自治县"
                },
                {
                    s: "连南瑶族自治县"
                },
                {
                    s: "清新县"
                },
                {
                    s: "英德市"
                },
                {
                    s: "连州市"
                }]
            },
            {
                n: "东莞",
                a: [{
                    s: "虎门"
                },
                {
                    s: "长安"
                },
                {
                    s: "东城"
                },
                {
                    s: "南城 "
                },
                {
                    s: "厚街"
                },
                {
                    s: "塘厦"
                },
                {
                    s: "常平"
                },
                {
                    s: "清溪"
                },
                {
                    s: "大朗"
                },
                {
                    s: "石碣"
                },
                {
                    s: "寮步镇"
                },
                {
                    s: "大岭山镇"
                },
                {
                    s: "大岭山镇"
                },
                {
                    s: "凤岗镇"
                },
                {
                    s: "黄江镇"
                },
                {
                    s: "麻涌镇"
                },
                {
                    s: "中堂镇"
                },
                {
                    s: "万江区"
                },
                {
                    s: "茶山镇"
                },
                {
                    s: "高埗镇"
                },
                {
                    s: "沙田镇"
                },
                {
                    s: "横沥镇"
                },
                {
                    s: "桥头镇"
                },
                {
                    s: "樟木头镇"
                },
                {
                    s: "石龙镇"
                },
                {
                    s: "道滘镇"
                },
                {
                    s: "石排镇"
                },
                {
                    s: "东坑镇"
                },
                {
                    s: "企石镇"
                },
                {
                    s: "望牛墩镇"
                },
                {
                    s: "谢岗镇"
                },
                {
                    s: "洪梅镇"
                }]
            },
            {
                n: "中山",
                a: [{
                    s: "中山市"
                }]
            },
            {
                n: "潮州",
                a: [{
                    s: "湘桥区"
                },
                {
                    s: "潮安县"
                },
                {
                    s: "饶平县"
                }]
            },
            {
                n: "揭阳",
                a: [{
                    s: "榕城区"
                },
                {
                    s: "揭东县"
                },
                {
                    s: "揭西县"
                },
                {
                    s: "惠来县"
                },
                {
                    s: "普宁市"
                }]
            },
            {
                n: "云浮",
                a: [{
                    s: "云城区"
                },
                {
                    s: "新兴县"
                },
                {
                    s: "郁南县"
                },
                {
                    s: "云安县"
                },
                {
                    s: "罗定市"
                }]
            }]
        },
        {
            p: "广西",
            c: [{
                n: "南宁",
                a: [{
                    s: "兴宁区"
                },
                {
                    s: "青秀区"
                },
                {
                    s: "江南区"
                },
                {
                    s: "西乡塘区"
                },
                {
                    s: "良庆区"
                },
                {
                    s: "邕宁区"
                },
                {
                    s: "武鸣县"
                },
                {
                    s: "隆安县"
                },
                {
                    s: "马山县"
                },
                {
                    s: "上林县"
                },
                {
                    s: "宾阳县"
                },
                {
                    s: "横县"
                }]
            },
            {
                n: "柳州",
                a: [{
                    s: "城中区"
                },
                {
                    s: "鱼峰区"
                },
                {
                    s: "柳南区"
                },
                {
                    s: "柳北区"
                },
                {
                    s: "柳江县"
                },
                {
                    s: "柳城县"
                },
                {
                    s: "鹿寨县"
                },
                {
                    s: "融安县"
                },
                {
                    s: "融水苗族自治县"
                },
                {
                    s: "三江侗族自治县"
                }]
            },
            {
                n: "桂林",
                a: [{
                    s: "秀峰区"
                },
                {
                    s: "叠彩区"
                },
                {
                    s: "象山区"
                },
                {
                    s: "七星区"
                },
                {
                    s: "雁山区"
                },
                {
                    s: "阳朔县"
                },
                {
                    s: "临桂县"
                },
                {
                    s: "灵川县"
                },
                {
                    s: "全州县"
                },
                {
                    s: "兴安县"
                },
                {
                    s: "永福县"
                },
                {
                    s: "灌阳县"
                },
                {
                    s: "龙胜各族自治县"
                },
                {
                    s: "资源县"
                },
                {
                    s: "平乐县"
                },
                {
                    s: "荔蒲县"
                },
                {
                    s: "恭城瑶族自治县"
                }]
            },
            {
                n: "梧州",
                a: [{
                    s: "万秀区"
                },
                {
                    s: "蝶山区"
                },
                {
                    s: "长洲区"
                },
                {
                    s: "苍梧县"
                },
                {
                    s: "藤县"
                },
                {
                    s: "蒙山县"
                },
                {
                    s: "岑溪市"
                }]
            },
            {
                n: "北海",
                a: [{
                    s: "海城区"
                },
                {
                    s: "银海区"
                },
                {
                    s: "铁山港区"
                },
                {
                    s: "合浦县"
                }]
            },
            {
                n: "防城港",
                a: [{
                    s: "港口区"
                },
                {
                    s: "防城区"
                },
                {
                    s: "上思县"
                },
                {
                    s: "东兴市"
                }]
            },
            {
                n: "钦州",
                a: [{
                    s: "钦南区"
                },
                {
                    s: "钦北区"
                },
                {
                    s: "灵山县"
                },
                {
                    s: "浦北县"
                }]
            },
            {
                n: "贵港",
                a: [{
                    s: "港北区"
                },
                {
                    s: "港南区"
                },
                {
                    s: "覃塘区"
                },
                {
                    s: "平南县"
                },
                {
                    s: "桂平市"
                }]
            },
            {
                n: "玉林",
                a: [{
                    s: "玉州区"
                },
                {
                    s: "容县"
                },
                {
                    s: "陆川县"
                },
                {
                    s: "博白县"
                },
                {
                    s: "兴业县"
                },
                {
                    s: "北流市"
                }]
            },
            {
                n: "百色",
                a: [{
                    s: "右江区"
                },
                {
                    s: "田阳县"
                },
                {
                    s: "田东县"
                },
                {
                    s: "平果县"
                },
                {
                    s: "德保县"
                },
                {
                    s: "靖西县"
                },
                {
                    s: "那坡县"
                },
                {
                    s: "凌云县"
                },
                {
                    s: "乐业县"
                },
                {
                    s: "田林县"
                },
                {
                    s: "西林县"
                },
                {
                    s: "隆林各族自治县"
                }]
            },
            {
                n: "贺州",
                a: [{
                    s: "八步区"
                },
                {
                    s: "昭平县"
                },
                {
                    s: "钟山县"
                },
                {
                    s: "富川瑶族自治县"
                }]
            },
            {
                n: "河池",
                a: [{
                    s: "金城江区"
                },
                {
                    s: "南丹县"
                },
                {
                    s: "天峨县"
                },
                {
                    s: "凤山县"
                },
                {
                    s: "东兰县"
                },
                {
                    s: "罗城仫佬族自治县"
                },
                {
                    s: "环江毛南族自治县"
                },
                {
                    s: "巴马瑶族自治县"
                },
                {
                    s: "都安瑶族自治县"
                },
                {
                    s: "大化瑶族自治县"
                },
                {
                    s: "宜州市"
                }]
            },
            {
                n: "来宾",
                a: [{
                    s: "兴宾区"
                },
                {
                    s: "忻城县"
                },
                {
                    s: "象州县"
                },
                {
                    s: "武宣县"
                },
                {
                    s: "金秀瑶族自治县"
                },
                {
                    s: "合山市"
                }]
            },
            {
                n: "崇左",
                a: [{
                    s: "江洲区"
                },
                {
                    s: "扶绥县"
                },
                {
                    s: "宁明县"
                },
                {
                    s: "龙州县"
                },
                {
                    s: "大新县"
                },
                {
                    s: "天等县"
                },
                {
                    s: "凭祥市"
                }]
            }]
        },
        {
            p: "海南",
            c: [{
                n: "海口",
                a: [{
                    s: "秀英区"
                },
                {
                    s: "龙华区"
                },
                {
                    s: "琼山区"
                },
                {
                    s: "美兰区"
                }]
            },
            {
                n: "三亚",
                a: [{
                    s: "三亚市"
                }]
            },
            {
                n: "五指山",
                a: [{
                    s: "五指山"
                }]
            },
            {
                n: "琼海",
                a: [{
                    s: "琼海"
                }]
            },
            {
                n: "儋州",
                a: [{
                    s: "儋州"
                }]
            },
            {
                n: "文昌",
                a: [{
                    s: "文昌"
                }]
            },
            {
                n: "万宁",
                a: [{
                    s: "万宁"
                }]
            },
            {
                n: "东方",
                a: [{
                    s: "东方"
                }]
            }]
        },
        {
            p: "重庆",
            c: [{
                n: "重庆市",
                a: [{
                    s: "万州区"
                },
                {
                    s: "涪陵区"
                },
                {
                    s: "渝中区"
                },
                {
                    s: "大渡口区"
                },
                {
                    s: "江北区"
                },
                {
                    s: "沙坪坝区"
                },
                {
                    s: "九龙坡区"
                },
                {
                    s: "南岸区"
                },
                {
                    s: "北碚区"
                },
                {
                    s: "万盛区"
                },
                {
                    s: "双挢区"
                },
                {
                    s: "渝北区"
                },
                {
                    s: "巴南区"
                },
                {
                    s: "长寿区"
                },
                {
                    s: "綦江县"
                },
                {
                    s: "潼南县"
                },
                {
                    s: "铜梁县"
                },
                {
                    s: "大足县"
                },
                {
                    s: "荣昌县"
                },
                {
                    s: "壁山县"
                },
                {
                    s: "梁平县"
                },
                {
                    s: "城口县"
                },
                {
                    s: "丰都县"
                },
                {
                    s: "垫江县"
                },
                {
                    s: "武隆县"
                },
                {
                    s: "忠县"
                },
                {
                    s: "开县"
                },
                {
                    s: "云阳县"
                },
                {
                    s: "奉节县"
                },
                {
                    s: "巫山县"
                },
                {
                    s: "巫溪县"
                },
                {
                    s: "黔江区"
                },
                {
                    s: "石柱土家族自治县"
                },
                {
                    s: "秀山土家族苗族自治县"
                },
                {
                    s: "酉阳土家族苗族自治县"
                },
                {
                    s: "彭水苗族土家族自治县"
                },
                {
                    s: "江津区"
                },
                {
                    s: "合川区"
                },
                {
                    s: "永川区"
                },
                {
                    s: "南川区"
                }]
            }]
        },
        {
            p: "四川",
            c: [{
                n: "成都",
                a: [{
                    s: "锦江区"
                },
                {
                    s: "青羊区"
                },
                {
                    s: "金牛区"
                },
                {
                    s: "武侯区"
                },
                {
                    s: "成华区"
                },
                {
                    s: "龙泉驿区"
                },
                {
                    s: "青白江区"
                },
                {
                    s: "新都区"
                },
                {
                    s: "温江区"
                },
                {
                    s: "金堂县"
                },
                {
                    s: "双流县"
                },
                {
                    s: "郫县"
                },
                {
                    s: "大邑县"
                },
                {
                    s: "蒲江县"
                },
                {
                    s: "新津县"
                },
                {
                    s: "都江堰市"
                },
                {
                    s: "彭州市"
                },
                {
                    s: "邛崃市"
                },
                {
                    s: "崇州市"
                }]
            },
            {
                n: "自贡",
                a: [{
                    s: "自流井区"
                },
                {
                    s: "贡井区"
                },
                {
                    s: "大安区"
                },
                {
                    s: "沿滩区"
                },
                {
                    s: "荣县"
                },
                {
                    s: "富顺县"
                }]
            },
            {
                n: "攀枝花",
                a: [{
                    s: "东区"
                },
                {
                    s: "西区"
                },
                {
                    s: "仁和区"
                },
                {
                    s: "米易县"
                },
                {
                    s: "盐边县"
                }]
            },
            {
                n: "泸州",
                a: [{
                    s: "江阳区"
                },
                {
                    s: "纳溪区"
                },
                {
                    s: "龙马潭区"
                },
                {
                    s: "泸县"
                },
                {
                    s: "合江县"
                },
                {
                    s: "叙永县"
                },
                {
                    s: "古蔺县"
                }]
            },
            {
                n: "德阳",
                a: [{
                    s: "旌阳区"
                },
                {
                    s: "中江县"
                },
                {
                    s: "罗江县"
                },
                {
                    s: "广汉市"
                },
                {
                    s: "什邡市"
                },
                {
                    s: "绵竹市"
                }]
            },
            {
                n: "绵阳",
                a: [{
                    s: "涪城区"
                },
                {
                    s: "游仙区"
                },
                {
                    s: "三台县"
                },
                {
                    s: "盐亭县"
                },
                {
                    s: "安县"
                },
                {
                    s: "梓潼县"
                },
                {
                    s: "北川羌族自治县"
                },
                {
                    s: "平武县"
                },
                {
                    s: "江油市"
                }]
            },
            {
                n: "广元",
                a: [{
                    s: "利州区"
                },
                {
                    s: "元坝区"
                },
                {
                    s: "朝天区"
                },
                {
                    s: "旺苍县"
                },
                {
                    s: "青川县"
                },
                {
                    s: "剑阁县"
                },
                {
                    s: "苍溪县"
                }]
            },
            {
                n: "遂宁",
                a: [{
                    s: "船山区"
                },
                {
                    s: ">安居区"
                },
                {
                    s: ">蓬溪县"
                },
                {
                    s: ">射洪县"
                },
                {
                    s: ">大英县"
                }]
            },
            {
                n: "内江",
                a: [{
                    s: "市中区"
                },
                {
                    s: "东兴区"
                },
                {
                    s: "威远县"
                },
                {
                    s: "资中县"
                },
                {
                    s: "隆昌县"
                }]
            },
            {
                n: "乐山",
                a: [{
                    s: "市中区"
                },
                {
                    s: "沙湾区"
                },
                {
                    s: "五通桥区"
                },
                {
                    s: "金口河区"
                },
                {
                    s: "犍为县"
                },
                {
                    s: "井研县"
                },
                {
                    s: "夹江县"
                },
                {
                    s: "沐川县"
                },
                {
                    s: "峨边彝族自治县"
                },
                {
                    s: "马边彝族自治县"
                },
                {
                    s: "峨眉山市"
                }]
            },
            {
                n: "南充",
                a: [{
                    s: "顺庆区"
                },
                {
                    s: "高坪区"
                },
                {
                    s: "嘉陵区"
                },
                {
                    s: "南部县"
                },
                {
                    s: "营山县"
                },
                {
                    s: "蓬安县"
                },
                {
                    s: "仪陇县"
                },
                {
                    s: "西充县"
                },
                {
                    s: "阆中市"
                }]
            },
            {
                n: "眉山",
                a: [{
                    s: "东坡区"
                },
                {
                    s: "仁寿县"
                },
                {
                    s: "彭山县"
                },
                {
                    s: "洪雅县"
                },
                {
                    s: "丹棱县"
                },
                {
                    s: "青神县"
                }]
            },
            {
                n: "宜宾",
                a: [{
                    s: "翠屏区"
                },
                {
                    s: "宜宾县"
                },
                {
                    s: "南溪县"
                },
                {
                    s: "江安县"
                },
                {
                    s: "长宁县"
                },
                {
                    s: "高县"
                },
                {
                    s: "珙县"
                },
                {
                    s: "筠连县"
                },
                {
                    s: "兴文县"
                },
                {
                    s: "屏山县"
                }]
            },
            {
                n: "广安",
                a: [{
                    s: "广安区"
                },
                {
                    s: "岳池县"
                },
                {
                    s: "武胜县"
                },
                {
                    s: "邻水县"
                },
                {
                    s: "华蓥市"
                }]
            },
            {
                n: "达川",
                a: [{
                    s: "通川区"
                },
                {
                    s: "达县"
                },
                {
                    s: "宣汉县"
                },
                {
                    s: "开江县"
                },
                {
                    s: "大竹县"
                },
                {
                    s: "渠县"
                },
                {
                    s: "万源市"
                }]
            },
            {
                n: "雅安",
                a: [{
                    s: "雨城区"
                },
                {
                    s: "名山县"
                },
                {
                    s: "荥经县"
                },
                {
                    s: "汉源县"
                },
                {
                    s: "石棉县"
                },
                {
                    s: "天全县"
                },
                {
                    s: "芦山县"
                },
                {
                    s: "宝兴县"
                }]
            },
            {
                n: "巴中",
                a: [{
                    s: "巴州区"
                },
                {
                    s: "通江县"
                },
                {
                    s: "南江县"
                },
                {
                    s: "平昌县"
                }]
            },
            {
                n: "资阳",
                a: [{
                    s: "雁江区"
                },
                {
                    s: "安岳县"
                },
                {
                    s: "乐至县"
                },
                {
                    s: "简阳市"
                }]
            },
            {
                n: "阿坝",
                a: [{
                    s: "汶川县"
                },
                {
                    s: "理县"
                },
                {
                    s: "茂县"
                },
                {
                    s: "松潘县"
                },
                {
                    s: "九寨沟县"
                },
                {
                    s: "金川县"
                },
                {
                    s: "小金县"
                },
                {
                    s: "黑水县"
                },
                {
                    s: "马尔康县"
                },
                {
                    s: "壤塘县"
                },
                {
                    s: "阿坝县"
                },
                {
                    s: "若尔盖县"
                },
                {
                    s: "红原县"
                }]
            },
            {
                n: "甘孜",
                a: [{
                    s: "康定县"
                },
                {
                    s: "泸定县"
                },
                {
                    s: "丹巴县"
                },
                {
                    s: "九龙县"
                },
                {
                    s: "雅江县"
                },
                {
                    s: "道孚县"
                },
                {
                    s: "炉霍县"
                },
                {
                    s: "甘孜县"
                },
                {
                    s: "新龙县"
                },
                {
                    s: "德格县"
                },
                {
                    s: "白玉县"
                },
                {
                    s: "石渠县"
                },
                {
                    s: "色达县"
                },
                {
                    s: "理塘县"
                },
                {
                    s: "巴塘县"
                },
                {
                    s: "乡城县"
                },
                {
                    s: "稻城县"
                },
                {
                    s: "得荣县"
                }]
            },
            {
                n: "凉山",
                a: [{
                    s: "西昌市"
                },
                {
                    s: "木里藏族自治县"
                },
                {
                    s: "盐源县"
                },
                {
                    s: "德昌县"
                },
                {
                    s: "会理县"
                },
                {
                    s: "会东县"
                },
                {
                    s: "宁南县"
                },
                {
                    s: "普格县"
                },
                {
                    s: "布拖县"
                },
                {
                    s: "金阳县"
                },
                {
                    s: "昭觉县"
                },
                {
                    s: "喜德县"
                },
                {
                    s: "冕宁县"
                },
                {
                    s: "越西县"
                },
                {
                    s: "甘洛县"
                },
                {
                    s: "美姑县"
                },
                {
                    s: "雷波县"
                }]
            }]
        },
        {
            p: "贵州",
            c: [{
                n: "贵阳",
                a: [{
                    s: "南明区"
                },
                {
                    s: "云岩区"
                },
                {
                    s: "花溪区"
                },
                {
                    s: "乌当区"
                },
                {
                    s: "白云区"
                },
                {
                    s: "小河区"
                },
                {
                    s: "开阳县"
                },
                {
                    s: "息烽县"
                },
                {
                    s: "修文县"
                },
                {
                    s: "清镇市"
                }]
            },
            {
                n: "六盘水",
                a: [{
                    s: "钟山区"
                },
                {
                    s: "六枝特区"
                },
                {
                    s: "水城县"
                },
                {
                    s: "盘县"
                }]
            },
            {
                n: "遵义",
                a: [{
                    s: "红花岗区"
                },
                {
                    s: "汇川区"
                },
                {
                    s: "遵义县"
                },
                {
                    s: "桐梓县"
                },
                {
                    s: "绥阳县"
                },
                {
                    s: "正安县"
                },
                {
                    s: "道真仡佬族苗族自治县"
                },
                {
                    s: "务川仡佬族苗族自治县"
                },
                {
                    s: "凤冈县"
                },
                {
                    s: "湄潭县"
                },
                {
                    s: "余庆县"
                },
                {
                    s: "习水县"
                },
                {
                    s: "赤水市"
                },
                {
                    s: "仁怀市"
                }]
            },
            {
                n: "安顺",
                a: [{
                    s: "西秀区"
                },
                {
                    s: "平坝县"
                },
                {
                    s: "普定县"
                },
                {
                    s: "镇宁布依族苗族自治县"
                },
                {
                    s: "关岭布依族苗族自治县"
                },
                {
                    s: "紫云苗族布依族自治县"
                }]
            },
            {
                n: "铜仁",
                a: [{
                    s: "铜仁市"
                },
                {
                    s: "江口县"
                },
                {
                    s: "玉屏侗族自治县"
                },
                {
                    s: "石阡县"
                },
                {
                    s: "思南县"
                },
                {
                    s: "印江土家族苗族自治县"
                },
                {
                    s: "德江县"
                },
                {
                    s: "沿河土家族自治县"
                },
                {
                    s: "松桃苗族自治县"
                },
                {
                    s: "万山特区"
                }]
            },
            {
                n: "黔西南",
                a: [{
                    s: "兴义市"
                },
                {
                    s: "兴仁县"
                },
                {
                    s: "普安县"
                },
                {
                    s: "晴隆县"
                },
                {
                    s: "贞丰县"
                },
                {
                    s: "望谟县"
                },
                {
                    s: "册亨县"
                },
                {
                    s: "安龙县"
                }]
            },
            {
                n: "毕节",
                a: [{
                    s: "毕节市"
                },
                {
                    s: "大方县"
                },
                {
                    s: "黔西县"
                },
                {
                    s: "金沙县"
                },
                {
                    s: "织金县"
                },
                {
                    s: "纳雍县"
                },
                {
                    s: "威宁彝族回族苗族自治县"
                },
                {
                    s: "赫章县"
                }]
            },
            {
                n: "黔东南",
                a: [{
                    s: "凯里市"
                },
                {
                    s: "黄平县"
                },
                {
                    s: "施秉县"
                },
                {
                    s: "三穗县"
                },
                {
                    s: "镇远县"
                },
                {
                    s: "岑巩县"
                },
                {
                    s: "天柱县"
                },
                {
                    s: "锦屏县"
                },
                {
                    s: "剑河县"
                },
                {
                    s: "台江县"
                },
                {
                    s: "黎平县"
                },
                {
                    s: "榕江县"
                },
                {
                    s: "从江县"
                },
                {
                    s: "雷山县"
                },
                {
                    s: "麻江县"
                },
                {
                    s: "丹寨县"
                }]
            },
            {
                n: "黔南",
                a: [{
                    s: "都匀市"
                },
                {
                    s: "福泉市"
                },
                {
                    s: "荔波县"
                },
                {
                    s: "贵定县"
                },
                {
                    s: "瓮安县"
                },
                {
                    s: "独山县"
                },
                {
                    s: "平塘县"
                },
                {
                    s: "罗甸县"
                },
                {
                    s: "长顺县"
                },
                {
                    s: "龙里县"
                },
                {
                    s: "惠水县"
                },
                {
                    s: "三都水族自治县"
                }]
            }]
        },
        {
            p: "云南",
            c: [{
                n: "昆明",
                a: [{
                    s: "五华区"
                },
                {
                    s: "盘龙区"
                },
                {
                    s: "官渡区"
                },
                {
                    s: "西山区"
                },
                {
                    s: "东川区"
                },
                {
                    s: "呈贡县"
                },
                {
                    s: "晋宁县"
                },
                {
                    s: "富民县"
                },
                {
                    s: "宜良县"
                },
                {
                    s: "石林彝族自治县"
                },
                {
                    s: "嵩明县"
                },
                {
                    s: "禄劝彝族苗族自治县"
                },
                {
                    s: "寻甸回族彝族自治县"
                },
                {
                    s: "安宁市"
                }]
            },
            {
                n: "曲靖",
                a: [{
                    s: "麒麟区"
                },
                {
                    s: "马龙县"
                },
                {
                    s: "陆良县"
                },
                {
                    s: "师宗县"
                },
                {
                    s: "罗平县"
                },
                {
                    s: "富源县"
                },
                {
                    s: "会泽县"
                },
                {
                    s: "沾益县"
                },
                {
                    s: "宣威市"
                }]
            },
            {
                n: "玉溪",
                a: [{
                    s: "红塔区"
                },
                {
                    s: "江川县"
                },
                {
                    s: "澄江县"
                },
                {
                    s: "通海县"
                },
                {
                    s: "华宁县"
                },
                {
                    s: "易门县"
                },
                {
                    s: "峨山彝族自治县"
                },
                {
                    s: "新平彝族傣族自治县"
                },
                {
                    s: "元江哈尼族彝族傣族自治县"
                }]
            },
            {
                n: "保山",
                a: [{
                    s: "隆阳区"
                },
                {
                    s: "施甸县"
                },
                {
                    s: "腾冲县"
                },
                {
                    s: "龙陵县"
                },
                {
                    s: "昌宁县"
                }]
            },
            {
                n: "昭通",
                a: [{
                    s: "昭阳区"
                },
                {
                    s: "鲁甸县"
                },
                {
                    s: "巧家县"
                },
                {
                    s: "盐津县"
                },
                {
                    s: "大关县"
                },
                {
                    s: "永善县"
                },
                {
                    s: "绥江县"
                },
                {
                    s: "镇雄县"
                },
                {
                    s: "彝良县"
                },
                {
                    s: "威信县"
                },
                {
                    s: "水富县"
                }]
            },
            {
                n: "丽江",
                a: [{
                    s: "古城区"
                },
                {
                    s: "玉龙纳西族自治县"
                },
                {
                    s: "永胜县"
                },
                {
                    s: "华坪县"
                },
                {
                    s: "宁蒗彝族自治县"
                }]
            },
            {
                n: "普洱",
                a: [{
                    s: "思茅区"
                },
                {
                    s: "宁洱镇"
                },
                {
                    s: "墨江哈尼族自治县"
                },
                {
                    s: "景东彝族自治县"
                },
                {
                    s: "景谷傣族彝族自治县"
                },
                {
                    s: "镇沅彝族哈尼族拉祜族自治县"
                },
                {
                    s: "江城哈尼族彝族自治县"
                },
                {
                    s: "孟连傣族拉祜族佤族自治县"
                },
                {
                    s: "澜沧拉祜族自治县"
                },
                {
                    s: "西盟佤族自治县"
                }]
            },
            {
                n: "临沧",
                a: [{
                    s: "临翔区"
                },
                {
                    s: "凤庆县"
                },
                {
                    s: "云县"
                },
                {
                    s: "永德县"
                },
                {
                    s: "镇康县"
                },
                {
                    s: "双江拉祜族佤族布朗族傣族自治县"
                },
                {
                    s: "耿马傣族佤族自治县"
                },
                {
                    s: "沧源佤族自治县"
                }]
            },
            {
                n: "楚雄",
                a: [{
                    s: "楚雄市"
                },
                {
                    s: "双柏县"
                },
                {
                    s: "牟定县"
                },
                {
                    s: "南华县"
                },
                {
                    s: "姚安县"
                },
                {
                    s: "大姚县"
                },
                {
                    s: "永仁县"
                },
                {
                    s: "元谋县"
                },
                {
                    s: "武定县"
                },
                {
                    s: "禄丰县"
                }]
            },
            {
                n: "红河",
                a: [{
                    s: "个旧市"
                },
                {
                    s: "开远市"
                },
                {
                    s: "蒙自县"
                },
                {
                    s: "屏边苗族自治县"
                },
                {
                    s: "建水县"
                },
                {
                    s: "石屏县"
                },
                {
                    s: "弥勒县"
                },
                {
                    s: "泸西县"
                },
                {
                    s: "元阳县"
                },
                {
                    s: "红河县"
                },
                {
                    s: "金平苗族瑶族傣族自治县"
                },
                {
                    s: "绿春县"
                },
                {
                    s: "河口瑶族自治县"
                }]
            },
            {
                n: "文山",
                a: [{
                    s: "文山县"
                },
                {
                    s: "砚山县"
                },
                {
                    s: "西畴县"
                },
                {
                    s: "麻栗坡县"
                },
                {
                    s: "马关县"
                },
                {
                    s: "丘北县"
                },
                {
                    s: "广南县"
                },
                {
                    s: "富宁县"
                }]
            },
            {
                n: "西双版纳",
                a: [{
                    s: "景洪市"
                },
                {
                    s: "勐海县"
                },
                {
                    s: "勐腊县"
                }]
            },
            {
                n: "大理",
                a: [{
                    s: "大理市"
                },
                {
                    s: "漾濞彝族自治县"
                },
                {
                    s: "祥云县"
                },
                {
                    s: "宾川县"
                },
                {
                    s: "弥渡县"
                },
                {
                    s: "南涧彝族自治县"
                },
                {
                    s: "巍山彝族回族自治县"
                },
                {
                    s: "永平县"
                },
                {
                    s: "云龙县"
                },
                {
                    s: "洱源县"
                },
                {
                    s: "剑川县"
                },
                {
                    s: "鹤庆县"
                }]
            },
            {
                n: "德宏",
                a: [{
                    s: "瑞丽市"
                },
                {
                    s: "潞西市"
                },
                {
                    s: "梁河县"
                },
                {
                    s: "盈江县"
                },
                {
                    s: "陇川县"
                }]
            },
            {
                n: "怒江傈",
                a: [{
                    s: "泸水县"
                },
                {
                    s: "福贡县"
                },
                {
                    s: "贡山独龙族怒族自治县"
                },
                {
                    s: "兰坪白族普米族自治县"
                }]
            },
            {
                n: "迪庆",
                a: [{
                    s: "香格里拉县"
                },
                {
                    s: "德钦县"
                },
                {
                    s: "维西傈僳族自治县"
                }]
            }]
        },
        {
            p: "西藏",
            c: [{
                n: "拉萨",
                a: [{
                    s: "城关区"
                },
                {
                    s: "林周县"
                },
                {
                    s: "当雄县"
                },
                {
                    s: "尼木县"
                },
                {
                    s: "曲水县"
                },
                {
                    s: "堆龙德庆县"
                },
                {
                    s: "达孜县"
                },
                {
                    s: "墨竹工卡县"
                }]
            },
            {
                n: "昌都",
                a: [{
                    s: "昌都县"
                },
                {
                    s: "江达县"
                },
                {
                    s: "贡觉县"
                },
                {
                    s: "类乌齐县"
                },
                {
                    s: "丁青县"
                },
                {
                    s: "察雅县"
                },
                {
                    s: "八宿县"
                },
                {
                    s: "左贡县"
                },
                {
                    s: "芒康县"
                },
                {
                    s: "洛隆县"
                },
                {
                    s: "边坝县"
                }]
            },
            {
                n: "山南",
                a: [{
                    s: "乃东县"
                },
                {
                    s: "扎囊县"
                },
                {
                    s: "贡嘎县"
                },
                {
                    s: "桑日县"
                },
                {
                    s: "琼结县"
                },
                {
                    s: "曲松县"
                },
                {
                    s: "措美县"
                },
                {
                    s: "洛扎县"
                },
                {
                    s: "加查县"
                },
                {
                    s: "隆子县"
                },
                {
                    s: "错那县"
                },
                {
                    s: "浪卡子县"
                }]
            },
            {
                n: "日喀则",
                a: [{
                    s: "日喀则市"
                },
                {
                    s: "南木林县"
                },
                {
                    s: "江孜县"
                },
                {
                    s: "定日县"
                },
                {
                    s: "萨迦县"
                },
                {
                    s: "拉孜县"
                },
                {
                    s: "昂仁县"
                },
                {
                    s: "谢通门县"
                },
                {
                    s: "白朗县"
                },
                {
                    s: "仁布县"
                },
                {
                    s: "康马县"
                },
                {
                    s: "定结县"
                },
                {
                    s: "仲巴县"
                },
                {
                    s: "亚东县"
                },
                {
                    s: "吉隆县"
                },
                {
                    s: "聂拉木县"
                },
                {
                    s: "萨嘎县"
                },
                {
                    s: "岗巴县"
                }]
            },
            {
                n: "那曲",
                a: [{
                    s: "那曲县"
                },
                {
                    s: "嘉黎县"
                },
                {
                    s: "比如县"
                },
                {
                    s: "聂荣县"
                },
                {
                    s: "安多县"
                },
                {
                    s: "申扎县"
                },
                {
                    s: "索县"
                },
                {
                    s: "班戈县"
                },
                {
                    s: "巴青县"
                },
                {
                    s: "尼玛县"
                }]
            },
            {
                n: "阿里",
                a: [{
                    s: "普兰县"
                },
                {
                    s: "札达县"
                },
                {
                    s: "噶尔县"
                },
                {
                    s: "日土县"
                },
                {
                    s: "革吉县"
                },
                {
                    s: "改则县"
                },
                {
                    s: "措勤县"
                }]
            },
            {
                n: "林芝",
                a: [{
                    s: "林芝县"
                },
                {
                    s: "工布江达县"
                },
                {
                    s: "米林县"
                },
                {
                    s: "墨脱县"
                },
                {
                    s: "波密县"
                },
                {
                    s: "察隅县"
                },
                {
                    s: "朗县"
                }]
            }]
        },
        {
            p: "陕西",
            c: [{
                n: "西安",
                a: [{
                    s: "新城区"
                },
                {
                    s: "碑林区"
                },
                {
                    s: "莲湖区"
                },
                {
                    s: "灞桥区"
                },
                {
                    s: "未央区"
                },
                {
                    s: "雁塔区"
                },
                {
                    s: "阎良区"
                },
                {
                    s: "临潼区"
                },
                {
                    s: "长安区"
                },
                {
                    s: "蓝田县"
                },
                {
                    s: "周至县"
                },
                {
                    s: "户县"
                },
                {
                    s: "高陵县"
                }]
            },
            {
                n: "铜川",
                a: [{
                    s: "王益区"
                },
                {
                    s: "印台区"
                },
                {
                    s: "耀州区"
                },
                {
                    s: "宜君县"
                }]
            },
            {
                n: "宝鸡",
                a: [{
                    s: "渭滨区"
                },
                {
                    s: "金台区"
                },
                {
                    s: "陈仓区"
                },
                {
                    s: "凤翔县"
                },
                {
                    s: "岐山县"
                },
                {
                    s: "扶风县"
                },
                {
                    s: "眉县"
                },
                {
                    s: "陇县"
                },
                {
                    s: "千阳县"
                },
                {
                    s: "麟游县"
                },
                {
                    s: "凤县"
                },
                {
                    s: "太白县"
                }]
            },
            {
                n: "咸阳",
                a: [{
                    s: "秦都区"
                },
                {
                    s: "杨凌区"
                },
                {
                    s: "渭城区"
                },
                {
                    s: "三原县"
                },
                {
                    s: "泾阳县"
                },
                {
                    s: "乾县"
                },
                {
                    s: "礼泉县"
                },
                {
                    s: "永寿县"
                },
                {
                    s: "彬县"
                },
                {
                    s: "长武县"
                },
                {
                    s: "旬邑县"
                },
                {
                    s: "淳化县"
                },
                {
                    s: "武功县"
                },
                {
                    s: "兴平市"
                }]
            },
            {
                n: "渭南",
                a: [{
                    s: "临渭区"
                },
                {
                    s: "华县"
                },
                {
                    s: "潼关县"
                },
                {
                    s: "大荔县"
                },
                {
                    s: "合阳县"
                },
                {
                    s: "澄城县"
                },
                {
                    s: "蒲城县"
                },
                {
                    s: "白水县"
                },
                {
                    s: "富平县"
                },
                {
                    s: "韩城市"
                },
                {
                    s: "华阴市"
                }]
            },
            {
                n: "延安",
                a: [{
                    s: "宝塔区"
                },
                {
                    s: "延长县"
                },
                {
                    s: "延川县"
                },
                {
                    s: "子长县"
                },
                {
                    s: "安塞县"
                },
                {
                    s: "志丹县"
                },
                {
                    s: "吴起县"
                },
                {
                    s: "甘泉县"
                },
                {
                    s: "富县"
                },
                {
                    s: "洛川县"
                },
                {
                    s: "宜川县"
                },
                {
                    s: "黄龙县"
                },
                {
                    s: "黄陵县"
                }]
            },
            {
                n: "汉中",
                a: [{
                    s: "汉台区"
                },
                {
                    s: "南郑县"
                },
                {
                    s: "城固县"
                },
                {
                    s: "洋县"
                },
                {
                    s: "西乡县"
                },
                {
                    s: "勉县"
                },
                {
                    s: "宁强县"
                },
                {
                    s: "略阳县"
                },
                {
                    s: "镇巴县"
                },
                {
                    s: "留坝县"
                },
                {
                    s: "佛坪县"
                }]
            },
            {
                n: "榆林",
                a: [{
                    s: "榆阳区"
                },
                {
                    s: "神木县"
                },
                {
                    s: "府谷县"
                },
                {
                    s: "横山县"
                },
                {
                    s: "靖边县"
                },
                {
                    s: "定边县"
                },
                {
                    s: "绥德县"
                },
                {
                    s: "米脂县"
                },
                {
                    s: "佳县"
                },
                {
                    s: "吴堡县"
                },
                {
                    s: "清涧县"
                },
                {
                    s: "子洲县"
                }]
            },
            {
                n: "安康",
                a: [{
                    s: "汉滨区"
                },
                {
                    s: "汉阴县"
                },
                {
                    s: "石泉县"
                },
                {
                    s: "宁陕县"
                },
                {
                    s: "紫阳县"
                },
                {
                    s: "岚皋县"
                },
                {
                    s: "平利县"
                },
                {
                    s: "镇坪县"
                },
                {
                    s: "旬阳县"
                },
                {
                    s: "白河县"
                }]
            },
            {
                n: "商洛",
                a: [{
                    s: "商州区"
                },
                {
                    s: "洛南县"
                },
                {
                    s: "丹凤县"
                },
                {
                    s: "商南县"
                },
                {
                    s: "山阳县"
                },
                {
                    s: "镇安县"
                },
                {
                    s: "柞水县"
                }]
            }]
        },
        {
            p: "甘肃",
            c: [{
                n: "兰州",
                a: [{
                    s: "区(县)"
                },
                {
                    s: "城关区"
                },
                {
                    s: "七里河区"
                },
                {
                    s: "西固区"
                },
                {
                    s: "安宁区"
                },
                {
                    s: "红古区"
                },
                {
                    s: "永登县"
                },
                {
                    s: "皋兰县"
                },
                {
                    s: "榆中县"
                }]
            },
            {
                n: "嘉峪关",
                a: [{
                    s: "嘉峪关市"
                }]
            },
            {
                n: "金昌",
                a: [{
                    s: "金川区"
                },
                {
                    s: "永昌县"
                }]
            },
            {
                n: "白银",
                a: [{
                    s: "白银区"
                },
                {
                    s: "平川区"
                },
                {
                    s: "靖远县"
                },
                {
                    s: "会宁县"
                },
                {
                    s: "景泰县"
                }]
            },
            {
                n: "天水",
                a: [{
                    s: "秦城区"
                },
                {
                    s: "麦积区"
                },
                {
                    s: "清水县"
                },
                {
                    s: "秦安县"
                },
                {
                    s: "甘谷县"
                },
                {
                    s: "武山县"
                },
                {
                    s: "张家川回族自治县"
                }]
            },
            {
                n: "武威",
                a: [{
                    s: "凉州区"
                },
                {
                    s: "民勤县"
                },
                {
                    s: "古浪县"
                },
                {
                    s: "天祝藏族自治县"
                }]
            },
            {
                n: "张掖",
                a: [{
                    s: "甘州区"
                },
                {
                    s: "肃南裕固族自治县"
                },
                {
                    s: "民乐县"
                },
                {
                    s: "临泽县"
                },
                {
                    s: "高台县"
                },
                {
                    s: "山丹县"
                }]
            },
            {
                n: "平凉",
                a: [{
                    s: "崆峒区"
                },
                {
                    s: "泾川县"
                },
                {
                    s: "灵台县"
                },
                {
                    s: "崇信县"
                },
                {
                    s: "华亭县"
                },
                {
                    s: "庄浪县"
                },
                {
                    s: "静宁县"
                }]
            },
            {
                n: "酒泉",
                a: [{
                    s: "肃州区"
                },
                {
                    s: "金塔县"
                },
                {
                    s: "瓜州县"
                },
                {
                    s: "肃北蒙古族自治县"
                },
                {
                    s: "阿克塞哈萨克族自治县"
                },
                {
                    s: "玉门市"
                },
                {
                    s: "敦煌市"
                }]
            },
            {
                n: "庆阳",
                a: [{
                    s: "西峰区"
                },
                {
                    s: "庆城县"
                },
                {
                    s: "环县"
                },
                {
                    s: "华池县"
                },
                {
                    s: "合水县"
                },
                {
                    s: "正宁县"
                },
                {
                    s: "宁县"
                },
                {
                    s: "镇原县"
                }]
            },
            {
                n: "定西",
                a: [{
                    s: "安定区"
                },
                {
                    s: "通渭县"
                },
                {
                    s: "陇西县"
                },
                {
                    s: "渭源县"
                },
                {
                    s: "临洮县"
                },
                {
                    s: "漳县"
                },
                {
                    s: "岷县"
                }]
            },
            {
                n: "陇南",
                a: [{
                    s: "武都区"
                },
                {
                    s: "成县"
                },
                {
                    s: "文县"
                },
                {
                    s: "宕昌县"
                },
                {
                    s: "康县"
                },
                {
                    s: "西和县"
                },
                {
                    s: "礼县"
                },
                {
                    s: "徽县"
                },
                {
                    s: "两当县"
                }]
            },
            {
                n: "临夏",
                a: [{
                    s: "临夏市"
                },
                {
                    s: "临夏县"
                },
                {
                    s: "康乐县"
                },
                {
                    s: "永靖县"
                },
                {
                    s: "广河县"
                },
                {
                    s: "和政县"
                },
                {
                    s: "东乡族自治县"
                },
                {
                    s: "积石山保安族东乡族撒拉族自治县"
                }]
            },
            {
                n: "甘南",
                a: [{
                    s: "合作市"
                },
                {
                    s: "临潭县"
                },
                {
                    s: "卓尼县"
                },
                {
                    s: "舟曲县"
                },
                {
                    s: "迭部县"
                },
                {
                    s: "玛曲县"
                },
                {
                    s: "碌曲县"
                },
                {
                    s: "夏河县"
                }]
            }]
        },
        {
            p: "青海",
            c: [{
                n: "西宁",
                a: [{
                    s: "城东区"
                },
                {
                    s: "城中区"
                },
                {
                    s: "城西区"
                },
                {
                    s: "城北区"
                },
                {
                    s: "大通回族土族自治县"
                },
                {
                    s: "湟中县"
                },
                {
                    s: "湟源县"
                }]
            },
            {
                n: "海东",
                a: [{
                    s: "平安县"
                },
                {
                    s: "民和回族土族自治县"
                },
                {
                    s: "乐都县"
                },
                {
                    s: "互助土族自治县"
                },
                {
                    s: "化隆回族自治县"
                },
                {
                    s: "循化撒拉族自治县"
                }]
            },
            {
                n: "海北",
                a: [{
                    s: "门源回族自治县"
                },
                {
                    s: "祁连县"
                },
                {
                    s: "海晏县"
                },
                {
                    s: "刚察县"
                }]
            },
            {
                n: "黄南",
                a: [{
                    s: "同仁县"
                },
                {
                    s: "尖扎县"
                },
                {
                    s: "泽库县"
                },
                {
                    s: "河南蒙古族自治县"
                }]
            },
            {
                n: "海南",
                a: [{
                    s: "共和县"
                },
                {
                    s: "同德县"
                },
                {
                    s: "贵德县"
                },
                {
                    s: "兴海县"
                },
                {
                    s: "贵南县"
                }]
            },
            {
                n: "果洛",
                a: [{
                    s: "玛沁县"
                },
                {
                    s: "班玛县"
                },
                {
                    s: "甘德县"
                },
                {
                    s: "达日县"
                },
                {
                    s: "久治县"
                },
                {
                    s: "玛多县"
                }]
            },
            {
                n: "玉树",
                a: [{
                    s: "玉树县"
                },
                {
                    s: "杂多县"
                },
                {
                    s: "称多县"
                },
                {
                    s: "治多县"
                },
                {
                    s: "囊谦县"
                },
                {
                    s: "曲麻莱县"
                }]
            },
            {
                n: "梅西",
                a: [{
                    s: "格尔木市"
                },
                {
                    s: "德令哈市"
                },
                {
                    s: "乌兰县"
                },
                {
                    s: "都兰县"
                },
                {
                    s: "天峻县"
                }]
            }]
        },
        {
            p: "宁夏",
            c: [{
                n: "银川",
                a: [{
                    s: "兴庆区"
                },
                {
                    s: "西夏区"
                },
                {
                    s: "金凤区"
                },
                {
                    s: "永宁县"
                },
                {
                    s: "贺兰县"
                },
                {
                    s: "灵武市"
                }]
            },
            {
                n: "石嘴山",
                a: [{
                    s: "大武口区"
                },
                {
                    s: "惠农区"
                },
                {
                    s: "平罗县"
                }]
            },
            {
                n: "吴忠",
                a: [{
                    s: "利通区"
                },
                {
                    s: "红寺堡区"
                },
                {
                    s: "盐池县"
                },
                {
                    s: "同心县"
                },
                {
                    s: "青铜峡市"
                }]
            },
            {
                n: "固原",
                a: [{
                    s: "原州区"
                },
                {
                    s: "西吉县"
                },
                {
                    s: "隆德县"
                },
                {
                    s: "泾源县"
                },
                {
                    s: "彭阳县"
                }]
            },
            {
                n: "中卫",
                a: [{
                    s: "沙坡头区"
                },
                {
                    s: "中宁县"
                },
                {
                    s: "海原县"
                }]
            }]
        },
        {
            p: "新疆",
            c: [{
                n: "乌鲁木齐",
                a: [{
                    s: "天山区"
                },
                {
                    s: "沙依巴克区"
                },
                {
                    s: "新市区"
                },
                {
                    s: "水磨沟区"
                },
                {
                    s: "头屯河区"
                },
                {
                    s: "达坂城区"
                },
                {
                    s: "米东区"
                },
                {
                    s: "乌鲁木齐县"
                }]
            },
            {
                n: "克拉玛依",
                a: [{
                    s: "独山子区"
                },
                {
                    s: "克拉玛依区"
                },
                {
                    s: "白碱滩区"
                },
                {
                    s: "乌尔禾区"
                }]
            },
            {
                n: "吐鲁番",
                a: [{
                    s: "吐鲁番市"
                },
                {
                    s: "鄯善县"
                },
                {
                    s: "托克逊县"
                }]
            },
            {
                n: "哈密",
                a: [{
                    s: "哈密市"
                },
                {
                    s: "巴里坤哈萨克自治县"
                },
                {
                    s: "伊吾县"
                }]
            },
            {
                n: "昌吉",
                a: [{
                    s: "昌吉市"
                },
                {
                    s: "阜康市"
                },
                {
                    s: "呼图壁县"
                },
                {
                    s: "玛纳斯县"
                },
                {
                    s: "奇台县"
                },
                {
                    s: "吉木萨尔县"
                },
                {
                    s: "木垒哈萨克自治县"
                }]
            },
            {
                n: "博尔塔拉",
                a: [{
                    s: "博乐市"
                },
                {
                    s: "精河县"
                },
                {
                    s: "温泉县"
                }]
            },
            {
                n: "巴音郭楞",
                a: [{
                    s: "库尔勒市"
                },
                {
                    s: "轮台县"
                },
                {
                    s: "尉犁县"
                },
                {
                    s: "若羌县"
                },
                {
                    s: "且末县"
                },
                {
                    s: "焉耆回族自治县"
                },
                {
                    s: "和静县"
                },
                {
                    s: "和硕县"
                },
                {
                    s: "博湖县"
                }]
            },
            {
                n: "阿克苏",
                a: [{
                    s: "阿克苏市"
                },
                {
                    s: "温宿县"
                },
                {
                    s: "库车县"
                },
                {
                    s: "沙雅县"
                },
                {
                    s: "新和县"
                },
                {
                    s: "拜城县"
                },
                {
                    s: "乌什县"
                },
                {
                    s: "阿瓦提县"
                },
                {
                    s: "柯坪县"
                }]
            },
            {
                n: "克孜勒苏",
                a: [{
                    s: "阿图什市"
                },
                {
                    s: "阿克陶县"
                },
                {
                    s: "阿合奇县"
                },
                {
                    s: "乌恰县"
                }]
            },
            {
                n: "喀什",
                a: [{
                    s: "喀什市"
                },
                {
                    s: "疏附县"
                },
                {
                    s: "疏勒县"
                },
                {
                    s: "英吉沙县"
                },
                {
                    s: "泽普县"
                },
                {
                    s: "莎车县"
                },
                {
                    s: "叶城县"
                },
                {
                    s: "麦盖提县"
                },
                {
                    s: "岳普湖县"
                },
                {
                    s: "伽师县"
                },
                {
                    s: "巴楚县"
                },
                {
                    s: "塔什库尔干县塔吉克自治"
                }]
            },
            {
                n: "和田",
                a: [{
                    s: "和田市"
                },
                {
                    s: "和田县"
                },
                {
                    s: "墨玉县"
                },
                {
                    s: "皮山县"
                },
                {
                    s: "洛浦县"
                },
                {
                    s: "策勒县"
                },
                {
                    s: "于田县"
                },
                {
                    s: "民丰县"
                }]
            },
            {
                n: "伊犁",
                a: [{
                    s: "伊宁市"
                },
                {
                    s: "奎屯市"
                },
                {
                    s: "伊宁县"
                },
                {
                    s: "察布查尔锡伯自治县"
                },
                {
                    s: "霍城县"
                },
                {
                    s: "巩留县"
                },
                {
                    s: "新源县"
                },
                {
                    s: "昭苏县"
                },
                {
                    s: "特克斯县"
                },
                {
                    s: "尼勒克县"
                }]
            },
            {
                n: "塔城",
                a: [{
                    s: "塔城市"
                },
                {
                    s: "乌苏市"
                },
                {
                    s: "额敏县"
                },
                {
                    s: "沙湾县"
                },
                {
                    s: "托里县"
                },
                {
                    s: "裕民县"
                },
                {
                    s: "和布克赛尔蒙古自治县"
                }]
            },
            {
                n: "阿勒泰",
                a: [{
                    s: "阿勒泰市"
                },
                {
                    s: "布尔津县"
                },
                {
                    s: "富蕴县"
                },
                {
                    s: "福海县"
                },
                {
                    s: "哈巴河县"
                },
                {
                    s: "青河县"
                },
                {
                    s: "吉木乃县"
                }]
            },
            {
                n: "石河子",
                a: [{
                    s: "石河子"
                }]
            },
            {
                n: "阿拉尔",
                a: [{
                    s: "阿拉尔"
                }]
            },
            {
                n: "图木舒克",
                a: [{
                    s: "图木舒克"
                }]
            },
            {
                n: "五家渠",
                a: [{
                    s: "五家渠"
                }]
            }]
        },
        {
            p: "香港",
            c: [{
                n: "九龙",
                a: [{
                    s: "观塘区"
                },
                {
                    s: "黄大仙区"
                },
                {
                    s: "九龙城区"
                },
                {
                    s: "油尖旺区"
                },
                {
                    s: "深水区"
                }]
            },
            {
                n: "香港岛",
                a: [{
                    s: "东区"
                },
                {
                    s: "南区"
                },
                {
                    s: "湾仔区"
                },
                {
                    s: "中西"
                }]
            },
            {
                n: "新界",
                a: [{
                    s: "北区"
                },
                {
                    s: "大埔"
                },
                {
                    s: "葵青"
                },
                {
                    s: "离岛"
                },
                {
                    s: "荃湾"
                },
                {
                    s: "沙田"
                },
                {
                    s: "屯门"
                },
                {
                    s: "西贡"
                },
                {
                    s: "元朗"
                }]
            }]
        },
        {
            p: "澳门",
            c: [{
                n: "花地玛堂区"
            },
            {
                n: "圣安多尼堂区"
            },
            {
                n: "大堂区"
            },
            {
                n: "望德堂区"
            },
            {
                n: "风顺堂区"
            },
            {
                n: "嘉模堂区"
            },
            {
                n: "圣方济各堂区"
            }]
        },
        {
            p: "台湾",
            c: [{
                n: "台北市"
            },
            {
                n: "高雄市"
            },
            {
                n: "基隆市"
            },
            {
                n: "台中市"
            },
            {
                n: "台南市"
            },
            {
                n: "新竹市"
            },
            {
                n: "嘉义市"
            },
            {
                n: "台北县"
            },
            {
                n: "宜兰县"
            },
            {
                n: "新竹县"
            },
            {
                n: "桃园县"
            },
            {
                n: "苗栗县"
            },
            {
                n: "台中县"
            },
            {
                n: "彰化县"
            },
            {
                n: "南投县"
            },
            {
                n: "嘉义县"
            },
            {
                n: "云林县"
            },
            {
                n: "台南县"
            },
            {
                n: "高雄县"
            },
            {
                n: "屏东县"
            },
            {
                n: "台东县"
            },
            {
                n: "花莲县"
            },
            {
                n: "澎湖县"
            }]
        },
        {
            p: "国外"
        }]
    };
    return s
});
define("utils/areachoice", ["utils/mobile_select_choice", "utils/areadata"],
function(e, t) {
    function i(i) {
        this.options = $.extend({},
        {
            data: t,
            select_text: "请选择地址",
            n_line: 3
        },
        i);
        var n = new e(this.options);
        return n
    }
    return i
});
define("templates/add_position.html", [],
function() {
    return '<div class="myapp app-add-position-utils">\n    <div class="header common-header clearfix">\n        <div class="icon-return"></div>\n        <div class="serchwrp">\n            <div class="icon-serch"></div>\n            <input data-role="map_serch" placeholder="小区/写字楼/学校等"></input>\n        </div>\n        <div class="btn-serch">搜索</div>\n    </div>\n\n    <div id="baidu-map"></div>\n    <div class="row">\n        <div class="icon-pointer"></div>\n        <div class="label">当前位置：</div>\n        <div class="text" data-role="mypointer_text">请选择</div>\n    </div>\n\n    <div class="btn-confirm">确认</div>\n</div>'
});
define("utils/gps", [],
function() {
    var t = {
        PI: 3.141592653589793,
        x_pi: 52.35987755982988,
        delta: function(t, a) {
            var n = 6378245,
            i = .006693421622965943,
            h = this.transformLat(a - 105, t - 35),
            s = this.transformLon(a - 105, t - 35),
            r = t / 180 * this.PI,
            o = Math.sin(r);
            o = 1 - i * o * o;
            var e = Math.sqrt(o);
            return h = 180 * h / (n * (1 - i) / (o * e) * this.PI),
            s = 180 * s / (n / e * Math.cos(r) * this.PI),
            {
                lat: h,
                lon: s
            }
        },
        gcj_encrypt: function(t, a) {
            if (this.outOfChina(t, a)) return {
                lat: t,
                lon: a
            };
            var n = this.delta(t, a);
            return {
                lat: t + n.lat,
                lon: a + n.lon
            }
        },
        gcj_decrypt: function(t, a) {
            if (this.outOfChina(t, a)) return {
                lat: t,
                lon: a
            };
            var n = this.delta(t, a);
            return {
                lat: t - n.lat,
                lon: a - n.lon
            }
        },
        gcj_decrypt_exact: function(t, a) {
            for (var n, i, h = .01,
            s = 1e-9,
            r = h,
            o = h,
            e = t - r,
            c = a - o,
            M = t + r,
            u = a + o,
            l = 0;;) {
                n = (e + M) / 2,
                i = (c + u) / 2;
                var f = this.gcj_encrypt(n, i);
                if (r = f.lat - t, o = f.lon - a, Math.abs(r) < s && Math.abs(o) < s) break;
                if (r > 0 ? M = n: e = n, o > 0 ? u = i: c = i, ++l > 1e4) break
            }
            return {
                lat: n,
                lon: i
            }
        },
        bd_encrypt: function(t, a) {
            var n = a,
            i = t,
            h = Math.sqrt(n * n + i * i) + 2e-5 * Math.sin(i * this.x_pi),
            s = Math.atan2(i, n) + 3e-6 * Math.cos(n * this.x_pi);
            return bdLon = h * Math.cos(s) + .0065,
            bdLat = h * Math.sin(s) + .006,
            {
                lat: bdLat,
                lon: bdLon
            }
        },
        bd_decrypt: function(t, a) {
            var n = a - .0065,
            i = t - .006,
            h = Math.sqrt(n * n + i * i) - 2e-5 * Math.sin(i * this.x_pi),
            s = Math.atan2(i, n) - 3e-6 * Math.cos(n * this.x_pi),
            r = h * Math.cos(s),
            o = h * Math.sin(s);
            return {
                lat: o,
                lon: r
            }
        },
        wgs_bd_encrypt: function(t, a) {
            var n = this.gcj_encrypt(t, a);
            return this.bd_encrypt(n.lat, n.lon)
        },
        mercator_encrypt: function(t, a) {
            var n = 20037508.34 * a / 180,
            i = Math.log(Math.tan((90 + t) * this.PI / 360)) / (this.PI / 180);
            return i = 20037508.34 * i / 180,
            {
                lat: i,
                lon: n
            }
        },
        mercator_decrypt: function(t, a) {
            var n = a / 20037508.34 * 180,
            i = t / 20037508.34 * 180;
            return i = 180 / this.PI * (2 * Math.atan(Math.exp(i * this.PI / 180)) - this.PI / 2),
            {
                lat: i,
                lon: n
            }
        },
        distance: function(t, a, n, i) {
            var h = 6371e3,
            s = Math.cos(t * this.PI / 180) * Math.cos(n * this.PI / 180) * Math.cos((a - i) * this.PI / 180),
            r = Math.sin(t * this.PI / 180) * Math.sin(n * this.PI / 180),
            o = s + r;
            o > 1 && (o = 1),
            o < -1 && (o = -1);
            var e = Math.acos(o),
            c = e * h;
            return c
        },
        outOfChina: function(t, a) {
            return a < 72.004 || a > 137.8347 || (t < .8293 || t > 55.8271)
        },
        transformLat: function(t, a) {
            var n = -100 + 2 * t + 3 * a + .2 * a * a + .1 * t * a + .2 * Math.sqrt(Math.abs(t));
            return n += 2 * (20 * Math.sin(6 * t * this.PI) + 20 * Math.sin(2 * t * this.PI)) / 3,
            n += 2 * (20 * Math.sin(a * this.PI) + 40 * Math.sin(a / 3 * this.PI)) / 3,
            n += 2 * (160 * Math.sin(a / 12 * this.PI) + 320 * Math.sin(a * this.PI / 30)) / 3
        },
        transformLon: function(t, a) {
            var n = 300 + t + 2 * a + .1 * t * t + .1 * t * a + .1 * Math.sqrt(Math.abs(t));
            return n += 2 * (20 * Math.sin(6 * t * this.PI) + 20 * Math.sin(2 * t * this.PI)) / 3,
            n += 2 * (20 * Math.sin(t * this.PI) + 40 * Math.sin(t / 3 * this.PI)) / 3,
            n += 2 * (150 * Math.sin(t / 12 * this.PI) + 300 * Math.sin(t / 30 * this.PI)) / 3
        }
    };
    return t
});
define("views/add_position", ["global", "templates/add_position.html", "utils/shopAPI", "utils/gps", "sui"],
function(o, e, n, t, a) {
    var i = (SOHUZ.page.site_id, $("body")),
    r = null,
    l = null,
    c = {
        opt: null,
        geoPosition: null,
        init: function(t) {
            var a = this;
            if (a.opt = t, a._API = n, i.append(Mustache.render(e)), a.$el = i.find(".app-add-position-utils"), window.BMap) a.render();
            else {
                var r;
                r = "https:" == o.protocol ? "//api.map.baidu.com/api?v=2.0&ak=2d6bd28bb5f4b4a16a034cf6c061f371&callback=MapCallback&s=1": "//api.map.baidu.com/api?v=2.0&ak=2d6bd28bb5f4b4a16a034cf6c061f371&callback=MapCallback",
                require([r],
                function() {
                    window.MapCallback = function() {
                        a.render()
                    }
                })
            }
            a.$el.on("tap", ".btn-serch",
            function() {
                a.search_address()
            }).on("tap", ".btn-confirm",
            function() {
                a.hide(),
                "请选择" !== a.$el.find('[data-role="mypointer_text"]').html() && t.confirm(l, a.$el.find('[data-role="mypointer_text"]').html())
            }),
            $(".app-add-position-utils").find(".icon-return").bind("tap",
            function() {
                a.hide()
            })
        },
        render: function() {},
        change_mypoint: function() {
            var o = this,
            e = new BMap.Geocoder;
            e.getLocation(l,
            function(e) {
                o.$el.find('[data-role="mypointer_text"]').html(e.address)
            })
        },
        search_address: function() {
            var o = this;
            r.clearOverlays();
            var e = new BMap.LocalSearch(r, {
                renderOptions: {
                    selectFirstResult: !0
                },
                onSearchComplete: function(n) {
                    if (e.getStatus() == BMAP_STATUS_SUCCESS) {
                        l = n.getPoi(0).point,
                        r.addOverlay(new BMap.Marker(l)),
                        r.centerAndZoom(l, 15),
                        o.change_mypoint()
                    } else a.tip("未定位到店铺地址")
                }
            }),
            n = o.$el.find('[data-role="map_serch"]').val();
            e.search(n)
        },
        show: function(o) {
            var e = this;
            if (o && o.geo && (e.opt.geo = o.geo), e.$el.show(), r = new BMap.Map("baidu-map"), e.opt.geo) l = new BMap.Point(e.opt.geo[0], e.opt.geo[1]),
            e.change_mypoint();
            else if (e.geoPosition) {
                var n = e.geoPosition.lat,
                a = e.geoPosition.lon;
                l = new BMap.Point(a, n),
                e.change_mypoint()
            } else l = new BMap.Point(116.404, 39.915);
            r.centerAndZoom(l, 15);
            var i = new BMap.Marker(l);
            r.addOverlay(i);
            var c = new BMap.NavigationControl({
                anchor: BMAP_ANCHOR_TOP_LEFT,
                type: BMAP_NAVIGATION_CONTROL_LARGE,
                enableGeolocation: !0
            });
            r.addControl(c),
            r.addEventListener("click",
            function(o) {
                r.clearOverlays(),
                r.addOverlay(new BMap.Marker(o.point)),
                l = o.point,
                e.change_mypoint()
            }),
            navigator.geolocation && !e.geoPosition ? navigator.geolocation.getCurrentPosition(function(o) {
                e.geoPosition = t.wgs_bd_encrypt(o.coords.latitude, o.coords.longitude),
                e.showPosition.call(e, e.geoPosition)
            },
            e.getCurrentPositionError, {
                timeout: 5e3
            }) : console.log("show Error")
        },
        showPosition: function(o) {
            var e = this,
            n = o.lat,
            t = o.lon;
            l = new BMap.Point(t, n),
            r.clearOverlays(),
            r.addOverlay(new BMap.Marker(l)),
            r.centerAndZoom(l, 15),
            e.change_mypoint()
        },
        getCurrentPositionError: function(o) {
            console.log(o)
        },
        hide: function() {
            this.$el.hide()
        }
    };
    return c
});
define("controllers/CreateAddressViewController", ["global", "controllers/baseview", "sui", "utils/validate", "utils/areachoice", "views/add_position"],
function(e, a, t, r, i, d) {
    return a.extend({
        el: ".myapp",
        data: {},
        _areachoice: null,
        geo: null,
        initialize: function(e) {
            var a = this;
            this.data = e,
            this._init();
            var t = a.$el.data("address");
            t && t.geo && t.geo.length && (a.geo = t.geo, a.geo_address = t.geo_address),
            this.render()
        },
        render: function() {
            var e = this;
            e._areachoice = new i({
                confirm: function(a) {
                    e.area_render(a)
                }
            }),
            d.init({
                geo: e.geo,
                confirm: function(a, t) {
                    e.geo = [a.lng, a.lat],
                    e.geo_address = t,
                    e.$el.find('[data-role="pointer_text"]').val(t)
                }
            })
        },
        events: {
            "tap .btn-new-address": "new_address",
            "tap .btn-edit-address": "edit_address",
            "tap .sui-choice": "trigger_choice",
            "tap .btn-del-address": "del_address",
            'tap [data-role="area"],[data-role="area_holder"]': "show_area",
            "tap .pointer-wrp": "show_map"
        },
        new_address: function() {
            var e = this,
            a = e.getValue();
            return !! a && (e._API.me_add_address(a,
            function(e) {
                location.href = "/shop/sites/" + SOHUZ.page.site_id + "/me/address"
            }), !1)
        },
        edit_address: function() {
            var e = this,
            a = e.getValue();
            return !! a && (e._API.me_edit_address(e.data.id, a,
            function(e) {
                location.href = "/shop/shops/" + SOHUZ.page.shop_id + "/me/address"
            }), !1)
        },
        getValue: function() {
            var e = this,
            a = {};
            if (a.name = e.$el.find('[data-role="name"]').val(), r.isnone(a.name)) return t.tip("请输入名字"),
            !1;
            if (a.name.length > 15) return t.tip("名字不能大于15个字符"),
            !1;
            if (a.mobile = e.$el.find('[data-role="mobile"]').val(), !r.isphone(a.mobile)) return t.tip("电话格式不符"),
            !1;
            if (a.type = parseInt(e.$el.find("[data-address-type]").data("address-type")), !a.type && (a.province = e.$el.find('[data-role="area"]').data("province"), a.city = e.$el.find('[data-role="area"]').data("city"), a.district = e.$el.find('[data-role="area"]').data("district"), !a.province)) return t.tip("所在地区不能为空"),
            !1;
            if (e.geo && (a.geo = e.geo, a.geo_address = e.geo_address), a.detail = e.$el.find('[data-role="detail"]').val(), r.isnone(a.detail)) return t.tip("请输入地址"),
            !1;
            if (a.detail.length > 100) return t.tip("地址不能超过100个字"),
            !1;
            a.set_default = e.$el.find('[data-role="set_default"]').hasClass("checked") ? "true": "false";
            for (var i in a) if (!a[i] && 0 != a[i]) return t.tip("数据为空"),
            !1;
            return a
        },
        trigger_choice: function(e) {
            var a = $(e.currentTarget);
            return a.hasClass("checked") ? a.removeClass("checked") : a.addClass("checked"),
            !1
        },
        area_render: function(e) {
            var a = this;
            a.$el.find('[data-role="area"]').data("province", e[0]),
            a.$el.find('[data-role="area"]').data("city", e[1]),
            a.$el.find('[data-role="area"]').data("district", e[2]);
            var t = [];
            e[0] && t.push(e[0]),
            e[1] && t.push(e[1]),
            e[2] && t.push(e[2]),
            a.$el.find('[data-role="area_holder"]').remove(),
            a.$el.find('[data-role="area"]').html(t.join("\\"))
        },
        show_area: function() {
            document.activeElement.blur(),
            $("input").blur(),
            $("textarea").blur(),
            this._areachoice.show()
        },
        del_address: function(e) {
            var a = this;
            t.confirm({
                msg: "确认删除",
                confirm: function() {
                    a._API.me_del_address(a.data.id,
                    function(e) {
                        location.href = "/shop/sites/" + SOHUZ.page.site_id + "/me/address"
                    })
                }
            })
        },
        show_map: function() {
            return d.show({
                geo: this.geo
            }),
            !1
        }
    })
});
define("templates/choice_address_shop.html", [],
function() {
    return '<div class="myapp app-choice-address">\n    <div class="header common-header">\n        <div class="icon-return"></div>\n        选择收货地址\n    </div>\n    <div class="address-list">\n        {{#addresss}}\n                <a class="item {{#cur}}hover{{/cur}}" href="javascript:;" data-id="{{_id}}" data-val="{{data}}">\n                    <div class="item-wrp">\n                        <div class="choice-address"></div>\n                        <div class="row">\n                            <div class="content clearfix"><div class="name">{{name}}</div> <div class="tel">{{mobile}}</div></div>\n                        </div>\n                        <div class="row">\n                            <div class="content">\n                                {{#is_default}}<span class="default">[默认]</span>{{/is_default}}\n                                {{#geo_address}}{{geo_address}}{{/geo_address}}\n                                {{^geo_address}}{{province}}{{city}}{{district}}{{/geo_address}}{{detail}}\n                            </div>\n                        </div>\n                    </div>\n                    <div class="del-wrp">\n                        <span>删除</span>\n                    </div>\n                </a>\n        {{/addresss}}\n    </div>\n    {{#_canadd}}\n    <a class="btn-new-address btn-red f-bold" href="javascript:;"><span>添加新地址</span></a>\n    {{/_canadd}}\n    {{^_canadd}}\n    <a class="btn-new-address btn-disabled f-bold" href="javascript:;"><span>添加新地址</span></a>\n    {{/_canadd}}\n</div>'
});
define("templates/choice_address_takeout.html", [],
function() {
    return '<div class="myapp app-choice-address">\n    <div class="header common-header">\n        <div class="icon-return"></div>\n        选择收货地址\n    </div>\n    <div class="address-list">\n        {{#addresss}}\n            <a class="item {{#cur}}hover{{/cur}}" href="javascript:;" data-id="{{_id}}" data-val="{{data}}">\n                <div class="item-wrp">\n                    <div class="choice-address"></div>\n                    <div class="row">\n                        <div class="content clearfix"><div class="name">{{name}}</div> <div class="tel">{{mobile}}</div></div>\n                    </div>\n                    <div class="row">\n                        <div class="content">\n                            {{#is_default}}<span class="default">[默认]</span>{{/is_default}}\n                            {{#geo_address}}{{geo_address}}{{/geo_address}}\n                            {{^geo_address}}{{province}}{{city}}{{district}}{{/geo_address}}{{detail}}\n                        </div>\n                    </div>\n                </div>\n                <div class="del-wrp">\n                    <span>删除</span>\n                </div>\n            </a>\n        {{/addresss}}\n    </div>\n    {{#_canadd}}\n    <a class="btn-new-address btn-red f-bold" href="javascript:;"><span>添加新地址</span></a>\n    {{/_canadd}}\n    {{^_canadd}}\n    <a class="btn-new-address btn-disabled f-bold" href="javascript:;"><span>添加新地址</span></a>\n    {{/_canadd}}\n</div>'
});
define("templates/add_address_takeout.html", [],
function() {
    return '<div class="myapp app-add-address-utils">\n    <div class="header common-header">\n        <div class="icon-return"></div>\n        添加收货地址\n        <!--<div class="more"></div>-->\n    </div>\n    <div class="setting-list"  data-address-type="1">\n        <div class="row">\n            <div class="title">收件人</div>\n            <div class="input">\n                <input data-role="name" placeholder="请输入姓名" />\n            </div>\n        </div>\n        <div class="row">\n            <div class="title">联系电话</div>\n            <div class="input">\n                <input data-role="mobile" placeholder="请输入手机号" />\n            </div>\n        </div>\n        <div class="row">\n            <div class="title">所在地址</div>\n            <div class="pointer-wrp">\n                <span class="icon-pointer"></span>\n                <div class="input">\n                    <input data-role="pointer_text" placeholder="小区/写字楼/学校等"/>\n                </div>\n            </div>\n        </div>\n        <div class="row">\n            <textarea data-role="detail" placeholder="详细地址（如所在地区不准确，请补全）"></textarea>\n        </div>\n    </div>\n    <div class="defaut">\n        <div class="sui-choice" data-role="set_default"></div>\n        <div class="text">设为默认地址</div>\n    </div>\n\n    <div class="btn-new-address">保存</div>\n\n</div>'
});
define("templates/add_address_shop.html", [],
function() {
    return '<div class="myapp app-add-address-utils">\n    <div class="header common-header">\n        <div class="icon-return"></div>\n        添加收货地址\n        <!--<div class="more"></div>-->\n    </div>\n    <div class="setting-list"  data-address-type="0">\n        <div class="row">\n            <div class="title">收件人</div>\n            <div class="input">\n                <input data-role="name" placeholder="请输入姓名" />\n            </div>\n        </div>\n        <div class="row">\n            <div class="title">联系电话</div>\n            <div class="input">\n                <input data-role="mobile" placeholder="请输入手机号" />\n            </div>\n        </div>\n        <div class="row">\n            <div class="title">所在地区</div>\n            <div class="input area">\n                <input data-role="area_holder" placeholder="选择省份\\城市\\区县" readonly="readonly"/>\n                <span data-role="area"></span>\n            </div>\n        </div>\n        <div class="row">\n            <div class="title">所在地址</div>\n            <textarea data-role="detail" class="shop-address-detail" placeholder="详细地址（如所在地区不准确，请补全）"></textarea>\n        </div>\n    </div>\n    <div class="defaut">\n        <div class="sui-choice" data-role="set_default"></div>\n        <div class="text">设为默认地址</div>\n    </div>\n\n    <div class="btn-new-address">保存</div>\n\n</div>'
});
define("views/add_address", ["templates/add_address_takeout.html", "templates/add_address_shop.html", "utils/shopAPI", "utils/validate", "sui", "utils/areachoice", "views/add_position"],
function(e, a, t, d, i, r, n) {
    var l = (SOHUZ.page.site_id, !!SOHUZ.page.is_takeout),
    o = $("body"),
    s = {
        _areachoice: null,
        geo: null,
        init: function(d) {
            var i = this;
            i._API = t,
            i._areachoice = new r({
                confirm: function(e) {
                    console.log(e),
                    i.area_render(e)
                }
            }),
            n.init({
                confirm: function(e, a) {
                    i.geo = [e.lng, e.lat],
                    i.geo_address = a,
                    i.$el.find('[data-role="pointer_text"]').val(a)
                }
            }),
            l ? o.append(Mustache.render(e)) : o.append(Mustache.render(a)),
            i.$el = o.find(".app-add-address-utils"),
            i.$el.on("tap", ".btn-new-address",
            function() {
                i.new_address(function(e) {
                    i.hide(),
                    d.confirm_callback(e)
                })
            }).on("tap", ".sui-choice",
            function(e) {
                i.trigger_choice(e)
            }).on("tap", '[data-role="area"],[data-role="area_holder"]',
            function() {
                document.activeElement.blur(),
                $("input").blur(),
                $("textarea").blur(),
                i._areachoice.show()
            }).on("tap", ".pointer-wrp",
            function() {
                return n.show({
                    geo: i.geo
                }),
                !1
            }),
            $(".app-add-address-utils").find(".icon-return").bind("tap",
            function() {
                i.hide()
            })
        },
        area_render: function(e) {
            var a = this;
            a.$el.find('[data-role="area"]').data("province", e[0]),
            a.$el.find('[data-role="area"]').data("city", e[1]),
            a.$el.find('[data-role="area"]').data("district", e[2]);
            var t = [];
            e[0] && t.push(e[0]),
            e[1] && t.push(e[1]),
            e[2] && t.push(e[2]),
            a.$el.find('[data-role="area_holder"]').hide(),
            a.$el.find('[data-role="area"]').html(t.join("\\"))
        },
        show: function() {
            var e = this;
            e.$el.find('[data-role="name"]').val(""),
            e.$el.find('[data-role="detail"]').val(""),
            e.$el.find('[data-role="mobile"]').val(""),
            e.$el.find('[data-role="area_holder"]').show(),
            e.$el.find('[data-role="area"]').html(""),
            o.find(".app-add-address-utils").show()
        },
        hide: function() {
            o.find(".app-add-address-utils").hide()
        },
        new_address: function(e) {
            var a = this,
            t = {};
            if (t.name = a.$el.find('[data-role="name"]').val(), d.isnone(t.name)) return i.tip("请输入名字"),
            !1;
            if (t.name.length > 15) return i.tip("名字不能大于15个字符"),
            !1;
            if (t.mobile = a.$el.find('[data-role="mobile"]').val(), !d.isphone(t.mobile)) return i.tip("电话格式不符"),
            !1;
            if (t.type = parseInt(a.$el.find("[data-address-type]").data("address-type")), !t.type && (t.province = a.$el.find('[data-role="area"]').data("province"), t.city = a.$el.find('[data-role="area"]').data("city"), t.district = a.$el.find('[data-role="area"]').data("district"), !t.province)) return i.tip("所在地区不能为空"),
            !1;
            if (a.geo && (t.geo = a.geo, t.geo_address = a.geo_address), t.detail = a.$el.find('[data-role="detail"]').val(), d.isnone(t.detail)) return i.tip("请输入地址"),
            !1;
            if (t.detail.length > 100) return i.tip("地址不能超过100个字"),
            !1;
            t.set_default = a.$el.find('[data-role="set_default"]').hasClass("checked") ? "true": "false";
            for (var r in t) if (!t[r] && 0 != t[r]) return i.tip("数据为空"),
            !1;
            a._API.me_add_address(t,
            function(a) {
                e(a)
            })
        },
        trigger_choice: function(e) {
            var a = $(e.currentTarget);
            a.hasClass("checked") ? a.removeClass("checked") : a.addClass("checked")
        }
    };
    return s
});
define("views/choice_address", ["templates/choice_address_shop.html", "templates/choice_address_takeout.html", "utils/shopAPI", "views/add_address", "sui"],
function(d, s, e, a, i) {
    var t = (SOHUZ.page.site_id, $("body")),
    c = '<a class="item" href="javascript:;" data-id="{{_id}}" data-val="{{data}}">            <div class="item-wrp">                <div class="choice-address"></div>                <div class="row">                    <div class="content clearfix"><div class="name">{{name}}</div><div class="tel">{{mobile}}</div></div>                </div>                <div class="row">                    <div class="content">                        {{#is_default}}                        <span class="default">[默认]</span>                        {{/is_default}}                        {{#geo_address}}{{geo_address}}{{/geo_address}}{{^geo_address}}{{province}}{{city}}{{district}}{{/geo_address}}{{detail}}                    </div>                </div>            </div>            <div class="del-wrp">                <span>删除</span>            </div>        </a>',
    n = {
        cur_id: null,
        init: function(c) {
            var n = this;
            n.cur_id = c.cur_id;
            var r = SOHUZ.page.is_takeout;
            a.init({
                confirm_callback: function(d) {
                    n.add_address(d),
                    a.hide()
                }
            }),
            e.get_address_list(function(e) {
                for (var o = $.extend([], e), l = 0; l < o.length; l++) o[l].data = JSON.stringify(o[l]),
                o[l]._id == n.cur_id && (o[l].cur = !0),
                (r && 0 == o[l].type || !r && 1 == o[l].type) && (o.splice(l, 1), l--);
                n.el = Mustache.render(SOHUZ.page.is_takeout ? s: d, {
                    addresss: o,
                    _canadd: !(o.length >= 10)
                }),
                t.append(n.el),
                t.find(".app-choice-address").on("tap", ".item",
                function() {
                    return t.find(".app-choice-address").find(".address-list .item.hover").removeClass("hover"),
                    $(this).addClass("hover"),
                    n.cur_id = $(this).data("id"),
                    n.hide(),
                    c.choice_callback($(this).data("val")),
                    !1
                }).on("tap", ".btn-new-address",
                function() {
                    return $(this).hasClass("disable") ? (i.tip("地址个数已满"), !1) : (a.show(), !1)
                }).on("tap", ".icon-return",
                function() {
                    return n.hide(),
                    c.cancel_callback(),
                    !1
                })
            })
        },
        show: function() {
            t.find(".app-choice-address").show()
        },
        hide: function() {
            t.find(".app-choice-address").hide()
        },
        add_address: function(d) {
            d.data = JSON.stringify(d),
            t.find(".app-choice-address").find(".address-list").prepend(Mustache.render(c, d))
        }
    };
    return n
});
define("templates/edit_message.html", [],
function() {
    return '<div class="myapp app-edit-message">\n    <div class="content">\n        <textarea placeholder="请输入不超过50个字"></textarea>\n    </div>\n    <div class="btn-confirm">确定</div>\n\n</div>'
});
define("views/edit_message", ["templates/edit_message.html", "sui"],
function(e, i) {
    var n = (SOHUZ.page.site_id, $("body")),
    t = {
        init: function(t) {
            var a = this;
            n.append(Mustache.render(e)),
            n.find(".app-edit-message").on("tap", ".btn-confirm",
            function() {
                var e = n.find(".app-edit-message").find("textarea").val();
                return e.length > 50 ? (i.tip("字数不能大于50"), !1) : (t.confirm_callback(e), void a.hide())
            }).on("tap", ".icon-return",
            function() {
                a.hide()
            })
        },
        show: function() {
            n.find(".app-edit-message").show()
        },
        hide: function() {
            n.find(".app-edit-message").hide()
        }
    };
    return t
});
define("templates/order_address_info.html", [],
function() {
    return '<div class="address-wrp">\n    <div class="icon-location {{^address}}no-adr{{/address}}"></div>\n    <div class="content">\n        {{#address}}\n        <div class="row">\n            <div class="name">{{name}}</div><div class="tel">{{mobile}}</div>\n        </div>\n            <div class="row adr">{{#geo_address}}{{geo_address}}{{/geo_address}}{{^geo_address}}{{province}}{{city}}{{district}}{{/geo_address}}{{detail}}</div>\n        {{/address}}\n        {{^address}}\n        <div class="row">请选择收货地址</div>\n        {{/address}}\n    </div>\n</div>\n<div class="icon-enter"></div>\n<div class="bottom-bg"></div>'
});
define("templates/create_order.html", [],
function() {
    return '{{#buyer_settings}}\n    {{#need_buyer_address}}\n    <div class="info-wrp"></div>\n    {{/need_buyer_address}}\n\n    <div class="buyer-wrp">\n        {{#need_payer_name}}\n        <div class="buyer-name-wrp clearfix">\n            <label class="label">付款人姓名</label>\n            <input data-role="payer_name" placeholder="请输入您的姓名" value="" />\n        </div>\n        {{/need_payer_name}}\n        {{#need_payer_mobile}}\n        <div class="buyer-phone-wrp clearfix">\n            <label class="label">付款人号码</label>\n            <input type="tel" data-role="payer_mobile" placeholder="请输入您的手机号码" value="" />\n        </div>\n        {{/need_payer_mobile}}\n    </div>\n\n    {{#provide_invoice}}\n    <div class="invoice-wrp">\n        <div class="row">\n            <label class="label">需要发票</label>\n            <span class="sui-change"></span>\n        </div>\n        <div class="row input-row" style="display:none;">\n            <input data-role="invoice" placeholder="请输入个人或者公司抬头" value="" />\n        </div>\n    </div>\n    {{/provide_invoice}}\n\n    {{#time_of_delivery}}\n    <div class="hopetime-wrp">\n        <div class="row">\n            <label class="label">期望送达时间</label>\n            <span class="icon-enter"></span>\n            <span class="time"></span>\n        </div>\n    </div>\n    {{/time_of_delivery}}\n\n    <div class="custom-msg-wrp">\n        {{#custom_messages}}\n        <div class="row" data-is-required="{{required}}" data-type="{{type}}" data-title="{{title}}">\n            <div class="label">\n                {{#required}}\n                <span class="required">*</span>\n                {{/required}}\n                {{{title}}}\n            </div>\n            {{#_type}}\n            <input type="tel" placeholder="请填写{{title}}"/>\n            {{/_type}}\n            {{^_type}}\n            <input type="text" placeholder="请填写{{title}}"/>\n            {{/_type}}\n        </div>\n        {{/custom_messages}}\n    </div>\n\n\n{{/buyer_settings}}\n{{#order_data}}\n    <div class="order-wrp">\n        <a href="javascript:;" data-href="/shop/shops/{{shop._id}}/jump-to">\n            <div class="order-header">\n                <span class="icon-header"></span>\n                <span class="title">{{shop.title}}</span>\n                <span class="icon-enter"></span>\n            </div>\n        </a>\n        <div class="container">\n            <div class="commodity-list">\n                {{#commodities}}\n                <div class="commodity-item clearfix" data-role="commodity-item">\n                    <div class="pic">\n                        <img src="{{avatar}}/imageView/v1/thumbnail/152x152">\n                        <!-- 优惠券商品 -->\n                        {{#_is_coupon}}\n                        <div class="icon icon-coupon"></div>\n                        {{/_is_coupon}}\n                        <!-- 拼团商品 -->\n                        {{#_is_groupbuy}}\n                        <div class="icon icon-groupbuy"></div>\n                        {{/_is_groupbuy}}\n                        <!-- 积分商品 -->\n                        {{#_is_score}}\n                        <div class="icon icon-score"></div>\n                        {{/_is_score}}\n                    </div>\n                    <div class="commodity-item-info">\n                        <div class="name">{{{title}}}</div>\n                        {{^score}}\n                        <div class="price">¥{{price}}</div>\n                        {{/score}}\n                        {{#score}}\n                        <div class="price">{{score}} <span class="score">积分</span></div>\n                        {{/score}}\n                        <div class="amount">X{{amount}}</div>\n                        <div class="models">\n                        {{_models}}\n                        </div>\n                    </div>\n\n                </div>\n                {{/commodities}}\n            </div>\n            {{#off_price}}\n            <div class="full_to_off">\n                <label class="label">满减优惠</label>\n                <span class="off_price">-¥{{off_price}}</span>\n            </div>\n            {{/off_price}}\n\n            <div class="freight-wrp clearfix">\n                {{^is_takeout}}\n                <label class="label">运费</label>\n                {{/is_takeout}}\n                {{#is_takeout}}\n                <label class="label">配送费</label>\n                {{/is_takeout}}\n                {{#freight}}\n                <span class="price">¥{{freight}}</span>\n                {{/freight}}\n\n                {{^freight}}\n                    {{^is_takeout}}\n                    <span class="price">免运费</span>\n                    {{/is_takeout}}\n                    {{#is_takeout}}\n                    <span class="price">无</span>\n                    {{/is_takeout}}\n                {{/freight}}\n            </div>\n\n            <div class="message-wrp clearfix">\n                <label class="label">给卖家留言</label>\n                <span class="message"></span>\n                <span class="icon-enter"></span>\n            </div>\n\n            <div class="allprice">\n                <span>共<i class="num">{{_commodity_len}}</i>件商品</span>,<span>合计</span>\n                {{^is_pure_score}}\n                <b class="price">¥<em class="int">{{_price_int}}</em>.<span class="decimal">{{_price_decimal}}</span></b>\n                {{/is_pure_score}}\n                {{#is_pure_score}}\n                <b class="price"><span class="score">{{_pure_score_commodity_score}}</span> 积分\n                    {{#freight}}\n                     + ¥<em class="int">{{_freight_int}}</em>.<span class="decimal">{{_freight_decimal}}</span>\n                    {{/freight}}\n                </b>\n                {{/is_pure_score}}\n            </div>\n        </div>\n    </div>\n    <div class="kz_agreement f-0">\n        {{#is_groupbuy}}\n            {{#shop.peak_payment}}\n            <span>卖家已开启“第三方支付” </span><span class="und f-24">点此了解更多电商内容</span>\n            {{/shop.peak_payment}}\n        {{/is_groupbuy}}\n        {{#is_takeout}}\n            {{#shop.peak_payment}}\n            <span>卖家已开启“第三方支付” </span><span class="und f-24">点此了解更多电商内容</span>\n            {{/shop.peak_payment}}\n        {{/is_takeout}}\n        {{^is_groupbuy}}\n            {{^is_takeout}}\n                {{#shop.wx_payment}}\n                <span>正在使用直接到账，付款后资金直接进入卖家账户</span>\n                {{/shop.wx_payment}}\n                {{#shop.alipay_payment}}\n                <span>正在使用直接到账，付款后资金直接进入卖家账户</span>\n                {{/shop.alipay_payment}}\n                {{#shop.peak_payment}}\n                <span>卖家已开启“第三方支付” </span><span class="und f-24">点此了解更多电商内容</span>\n                {{/shop.peak_payment}}\n            {{/is_takeout}}\n        {{/is_groupbuy}}\n    </div>\n    {{^off_price}}\n        {{#score_used}}\n            {{^is_pure_score}}\n                <div class="score-wrapper">\n                    <div class="row">\n                        <label class="label">\n                            {{score_used}}\n                            积分抵\n                            {{_price_score_equal}}元</label>\n                        <span class="sui-change" data-role="use_score"></span>\n                    </div>\n                </div>\n            {{/is_pure_score}}\n        {{/score_used}}\n    {{/off_price}}\n\n    {{#is_pure_score}}\n    <div class="score-wrapper">\n        <div class="row">\n            <label class="label">当前积分: {{user_score}}</label>\n            <span class="score-used">-{{{score_used}}}积分</span>\n        </div>\n    </div>\n    {{/is_pure_score}}\n\n    <div class="bottom-wrp clearfix">\n        <div class="btn-pay">提交订单</div>\n        <div class="price-all">\n            <span>合计</span>\n            {{^is_pure_score}}\n            <b class="price">¥<em class="int">{{_price_int}}</em>.<span class="decimal">{{_price_decimal}}</span></b>\n            {{/is_pure_score}}\n            {{#is_pure_score}}\n            <b class="price"><span class="score">{{_pure_score_commodity_score}}</span> 积分\n                {{#freight}}\n                + ¥<em class="int">{{_freight_int}}</em>.<span class="decimal">{{_freight_decimal}}</span>\n                {{/freight}}\n            </b>\n            {{/is_pure_score}}\n        </div>\n    </div>\n{{/order_data}}'
});
define("controllers/CreateOrderViewController", ["global", "controllers/baseview", "views/choice_address", "views/edit_message", "templates/order_address_info.html", "templates/create_order.html", "sui", "utils/mobile_select_choice", "utils/validate", "utils/tools"],
function(e, t, i, r, a, s, o, d, n, c) {
    return t.extend({
        el: ".myapp",
        data_buyer_settings: {},
        counter: 0,
        address: null,
        _timechoice: null,
        initialize: function(e) {
            var t = this,
            i = location.search.split("?")[1],
            r = i.split("=")[0];
            "preorder_id" == r && (t.preorder_id = i.split("=")[1]),
            this.order_data = this.$el.data("order") || "",
            this.cid = this.$el.data("order") && this.$el.data("order").commodities && this.$el.data("order").commodities[0].commodity_id || "",
            this.shop_info = this.$el.data("shop") || "",
            this.source_data = this.$el.data("val") || "",
            this.data_buyer_settings = this.$el.data("data") || "",
            this.is_allow_buy = this.$el.data("order") ? this.$el.data("order").is_allow_buy: "",
            this.user_score = this.$el.data("user-score") || "",
            this.is_groupbuy = this.$el.data("is-groupbuy") || !1,
            this._init(),
            this.render(),
            t.data_buyer_settings.time_of_delivery && "[object Object]" == Object.prototype.toString.call(t.data_buyer_settings.time_of_delivery_settings) && Object.keys(t.data_buyer_settings.time_of_delivery_settings).length > 0 && (t._timechoice = new d({
                data: t.get_timedata(t.data_buyer_settings.time_of_delivery_settings),
                select_text: "请选择时间",
                n_line: 2,
                confirm: function(e) {
                    t.time_render(e)
                }
            })),
            t.get_order(t.preorder_id)
        },
        render: function() {
            function e(e) {
                i.init({
                    cur_id: e,
                    choice_callback: function(e) {
                        t.choice_callback(e)
                    },
                    cancel_callback: function() {
                        t.$el.show()
                    }
                }),
                r.init({
                    confirm_callback: function(e) {
                        t.change_message(e)
                    }
                })
            }
            var t = this;
            if (t._API.get_default_address(function(i) {
                t.address = i,
                t.$el.find(".info-wrp").html(Mustache.render(a, {
                    address: i,
                    is_takeout: SOHUZ.page.is_takeout
                })),
                e(i._id)
            },
            function() {
                t.$el.find(".info-wrp").html(Mustache.render(a, {})),
                e()
            }), t.data_buyer_settings.need_payer_name && window.localStorage) {
                var s = c.get_localstorage("payer_name");
                s && t.$el.find(".buyer-wrp").find('[data-role="payer_name"]').val(s)
            }
            if (t.data_buyer_settings.need_payer_mobile && window.localStorage) {
                var o = c.get_localstorage("payer_mobile");
                o && t.$el.find(".buyer-wrp").find('[data-role="payer_mobile"]').val(o)
            }
        },
        events: {
            "tap .btn-pay": "create_order",
            "tap .info-wrp": "choice_address",
            "tap .message-wrp": "show_edit_message",
            "tap a": "link_a",
            "tap .hopetime-wrp": "show_timechoice",
            "tap .invoice-wrp .sui-change": "change_invoice",
            "tap .score-wrapper .sui-change": "change_score",
            "tap .kz_agreement .und": "show_agreement"
        },
        get_order: function(e) {
            var t = this,
            i = ' <div class="groupbuy-wrp"><div class="groupbuy-step f-22 clearfix"><div class="step step1"><span>支付商品</span><span>立即开团</span></div><div class="next"></div><div class="step step2"><span>邀请好友</span><span>参与拼团</span></div><div class="next"></div><div class="step step3"><span class="success"><span>拼团成功</span><span>立即发货</span></span><span class="mid"></span><span class="failure"><span>拼团失败</span><span>原路退回</span></span></div></div></div>';
            if (t.order_data) {
                console.log("b"),
                t.order_data.is_groupbuy && t.$el.append(i);
                var r = 0;
                t.order_data.commodities.forEach(function(e) {
                    if (300 == e.type ? e._is_coupon = !0 : 200 == e.type ? e._is_groupbuy = !0 : 100 == e.type && e.enable_score && (e._is_score = !0), r += e.amount, e._models_arr = [], e.models) for (var t in e.models) e._models_arr.push(t + ":" + e.models[t]);
                    e._models = e._models_arr.join("；")
                });
                var a = c.get_fixed2(t.order_data.price).split(".");
                t.order_data._price_int = a[0],
                t.order_data._price_decimal = a[1],
                t.order_data._commodity_len = r;
                var o, d = t.order_data.price_score_equal.toString().split(".");
                if (o = d.length > 1 ? d[0] + "." + d[1].substr(0, 2) : t.order_data.price_score_equal, t.order_data._price_score_equal = o, t.order_data.freight) {
                    var _ = c.get_fixed2(t.order_data.freight).split(".");
                    t.order_data._freight_int = _[0],
                    t.order_data._freight_decimal = _[1]
                }
                t.order_data._pure_score_commodity_score = t.order_data && t.order_data.commodities[0] && t.order_data.commodities[0].score * t.order_data.commodities[0].amount || "",
                t.data_buyer_settings.custom_messages && t.data_buyer_settings.custom_messages.forEach(function(e) {
                    "int" == e.type ? e._type = 1 : e._type = 0
                }),
                t.$el.append(Mustache.render(s, {
                    order_data: t.order_data,
                    shop: t.shop_info,
                    buyer_settings: t.data_buyer_settings,
                    is_takeout: SOHUZ.page.is_takeout,
                    user_score: t.user_score
                }))
            } else console.log("f"),
            t.is_groupbuy ? setTimeout(function() {
                t.get_groupbuy_order_info(e, i)
            },
            800) : setTimeout(function() {
                t.get_order_info(e)
            },
            800)
        },
        get_order_info: function(e) {
            var t = this;
            t._API.get_pre_order({
                preorder_id: e
            },
            function(e) {
                if (e.order_data) {
                    var i = 0;
                    e.order_data.commodities.forEach(function(e) {
                        if (300 == e.type ? e._is_coupon = !0 : 200 == e.type ? e._is_groupbuy = !0 : 100 == e.type && e.enable_score && (e._is_score = !0), i += e.amount, e._models_arr = [], e.models) for (var t in e.models) e._models_arr.push(t + ":" + e.models[t]);
                        e._models = e._models_arr.join("；")
                    });
                    var r = c.get_fixed2(e.order_data.price).split(".");
                    e.order_data._price_int = r[0],
                    e.order_data._price_decimal = r[1],
                    e.order_data._commodity_len = i;
                    var a, o = e.order_data.price_score_equal.toString().split(".");
                    if (a = o.length > 1 ? o[0] + "." + o[1].substr(0, 2) : e.order_data.price_score_equal, e.order_data._price_score_equal = a, e.order_data.freight) {
                        var d = c.get_fixed2(e.order_data.freight).split(".");
                        e.order_data._feight_int = d[0],
                        e.order_data._freight_decimal = d[1]
                    }
                    e.order_data._pure_score_commodity_score = e.order_data.commodities[0].score * e.order_data.commodities[0].amount,
                    e.buyer_settings.custom_messages && e.buyer_settings.custom_messages.forEach(function(e) {
                        "int" == e.type ? e._type = 1 : e._type = 0
                    }),
                    t.$el.append(Mustache.render(s, {
                        order_data: e.order_data,
                        shop: t.shop_info,
                        buyer_settings: e.buyer_settings,
                        is_takeout: SOHUZ.page.is_takeout,
                        user_score: e.user_score
                    })),
                    t.source_data = e.source_order,
                    t.data_buyer_settings = e.buyer_settings,
                    t.order_data = e.order_data,
                    t.cid = e.order_data.commodities[0].commodity_id,
                    t.user_score = e.user_score
                }
            },
            function() {
                t.counter <= 3 && (t.counter++, setTimeout(function() {
                    t.get_order_info(e)
                },
                800))
            })
        },
        get_groupbuy_order_info: function(e, t) {
            var i = this;
            i._API.get_pre_groupbuy_order({
                preorder_id: e
            },
            function(e) {
                if (e.order_data) {
                    e.order_data.is_groupbuy && i.$el.append(t);
                    var r = 0;
                    e.order_data.commodities.forEach(function(e) {
                        if (300 == e.type ? e._is_coupon = !0 : 200 == e.type ? e._is_groupbuy = !0 : 100 == e.type && e.enable_score && (e._is_score = !0), r += e.amount, e._models_arr = [], e.models) for (var t in e.models) e._models_arr.push(t + ":" + e.models[t]);
                        e._models = e._models_arr.join("；")
                    });
                    var a = c.get_fixed2(e.order_data.price).split(".");
                    e.order_data._price_int = a[0],
                    e.order_data._price_decimal = a[1],
                    e.order_data._commodity_len = r;
                    var o, d = e.order_data.price_score_equal.toString().split(".");
                    if (o = d.length > 1 ? d[0] + "." + d[1].substr(0, 2) : e.order_data.price_score_equal, e.order_data._price_score_equal = o, e.order_data.freight) {
                        var _ = c.get_fixed2(e.order_data.freight).split(".");
                        e.order_data._feight_int = _[0],
                        e.order_data._freight_decimal = _[1]
                    }
                    e.order_data._pure_score_commodity_score = e.order_data.commodities[0].score * e.order_data.commodities[0].amount,
                    e.buyer_settings.custom_messages && e.buyer_settings.custom_messages.forEach(function(e) {
                        "int" == e.type ? e._type = 1 : e._type = 0
                    }),
                    i.$el.append(Mustache.render(s, {
                        order_data: e.order_data,
                        shop: i.shop_info,
                        buyer_settings: e.buyer_settings,
                        is_takeout: SOHUZ.page.is_takeout
                    })),
                    i.source_data = e.source_order,
                    i.data_buyer_settings = e.buyer_settings,
                    i.order_data = e.order_data,
                    i.cid = e.order_data.commodities[0].commodity_id
                }
            },
            function(t) {
                i.counter <= 3 && (i.counter++, setTimeout(function() {
                    i.get_groupbuy_order_info(e)
                },
                800))
            })
        },
        create_order: function() {
            var e = this,
            t = e.source_data;
            return "commodity_id" in t && "groupbuy_id" in t ? void e._create_order() : 2 == e.shop_info.type ? e._create_order() : void(e.shop_info.alipay_payment || e.shop_info.wx_payment ? o.confirm({
                msg: "付款后，资金直接进入卖家账户。如需退款换货，请与卖家联系，快站不介入交易纠纷处理。",
                confirm: function() {
                    e._create_order()
                }
            }) : e._create_order())
        },
        _create_order: function() {
            var t = this,
            i = {},
            r = $.extend({},
            t.source_data),
            a = t.order_data.commodities[0].models;
            if (t.data_buyer_settings.need_buyer_address) {
                if (!t.address) return o.tip("请添加地址"),
                !1;
                i.name = t.address.name,
                i.tel = t.address.mobile,
                t.address.geo_address ? (i.address = t.address.geo_address + (t.address.detail ? t.address.detail: ""), i.address_geo = t.address.geo) : i.address = (t.address.province ? t.address.province: "") + (t.address.city ? t.address.city: "") + (t.address.district ? t.address.district: "") + (t.address.detail ? t.address.detail: "")
            }
            if (!t.is_allow_buy) return o.tip("当前地址不可配送"),
            !1;
            if (t.data_buyer_settings.need_payer_name) {
                if (i.payer_name = t.$el.find('[data-role="payer_name"]').val(), n.isnone(i.payer_name)) return o.tip("付款人姓名不能为空"),
                !1;
                window.localStorage && c.set_localstorage("payer_name", i.payer_name)
            }
            if (t.data_buyer_settings.need_payer_mobile) {
                if (i.payer_mobile = t.$el.find('[data-role="payer_mobile"]').val(), !n.isphone(i.payer_mobile)) return o.tip("请输入正确的付款人号码"),
                !1;
                window.localStorage && c.set_localstorage("payer_mobile", i.payer_mobile)
            }
            if (t.data_buyer_settings.provide_invoice && (i.need_invoice = t.$el.find(".invoice-wrp .sui-change").hasClass("on"), i.need_invoice && (i.invoice_title = t.$el.find('[data-role="invoice"]').val())), t.data_buyer_settings.time_of_delivery) {
                var s = t.$el.find(".hopetime-wrp .time").html();
                if (!s) return o.tip("请选择期望送达时间"),
                !1;
                var d = t.$el.find(".hopetime-wrp .time").html().split(" ")[0],
                _ = t.$el.find(".hopetime-wrp .time").html().split(" ")[1];
                i.time_of_delivery = d + " " + _.split("-")[0] + ":00"
            }
            if (t.data_buyer_settings.custom_messages) {
                i.custom_messages = {};
                var p = {},
                l = !1;
                if (t.$el.find(".custom-msg-wrp .row").each(function(e, t) {
                    var i = $(t).find("input").val();
                    if (i) {
                        if ("int" == $(t).data("type") && isNaN(i)) return o.tip(v.title + "必须为数字"),
                        l = !0,
                        !1;
                        if ("string" == $(t).data("type") && !/.+/.test(i)) return o.tip(v.title + "必须为文本"),
                        l = !0,
                        !1;
                        p[$(t).data("title")] = i
                    } else if ($(t).data("is-required")) return o.tip($(t).data("title") + "不能为空"),
                    l = !0,
                    !1
                }), l) return;
                i.custom_messages = JSON.stringify(p)
            }
            i.message = t.$el.find(".message-wrp .message").html(),
            i.address_detail = JSON.stringify(t.address);
            t.order_data;
            return t.$el.find('[data-role="use_score"]')[0] && (i.use_score = t.$el.find('[data-role="use_score"]').hasClass("on")),
            i.preorder_id = t.preorder_id,
            "wish_ids" in r ? (i.wish_ids = r.wish_ids, this._API.order_from_wishes(i,
            function(t) {
                location.href = "/shop/shops/" + SOHUZ.page.shop_id + "/order-pay/" + t._id + "?wx_native=" + e.is_weixin
            },
            function(e) {
                o.tip(e.msg)
            })) : "wishes" in r ? (i.wishes = JSON.stringify(r.wishes), this._API.order_from_wishes(i,
            function(t) {
                location.href = "/shop/shops/" + SOHUZ.page.shop_id + "/order-pay/" + t._id + "?wx_native=" + e.is_weixin
            },
            function(e) {
                o.tip(e.msg)
            })) : "commodities" in r ? (i.commodities = r.commodities, i.commodities[0].coupon_id && (i.is_coupon = !0, i.coupon_id = i.commodities[0].coupon_id, i.coupon_start_date = i.commodities[0].coupon_start_date, i.coupon_end_date = i.commodities[0].coupon_end_date, i.coupon_enable_refund = i.commodities[0].coupon_enable_refund, i.coupon_is_booking = i.commodities[0].coupon_is_booking, i.coupon_desc = ""), SOHUZ.page.is_takeout && (i.is_takeout = !0), this._API.create_order(i,
            function(t) {
                location.href = "/shop/shops/" + SOHUZ.page.shop_id + "/order-pay/" + t._id + "?wx_native=" + e.is_weixin
            },
            function(e) {
                o.tip(e.msg)
            })) : "commodity_id" in r ? (i.commodity_id = r.commodity_id, i.models = JSON.stringify(a), this._API.create_groupbuy(i,
            function(t) {
                location.href = "/shop/shops/" + SOHUZ.page.shop_id + "/order-pay/" + t._id + "?wx_native=" + e.is_weixin
            },
            function(e) {
                o.tip(e.msg),
                setInterval(function() {
                    location.href = "/shop/groupbuy/" + t.cid
                },
                2e3)
            })) : "groupbuy_id" in r && (i.groupbuy_id = r.groupbuy_id, i.models = JSON.stringify(a), this._API.create_groupbuy(i,
            function(t) {
                location.href = "/shop/shops/" + SOHUZ.page.shop_id + "/order-pay/" + t._id + "?wx_native=" + e.is_weixin
            },
            function(e) {
                o.tip(e.msg),
                setInterval(function() {
                    location.href = "/shop/groupbuy/" + t.cid
                },
                2e3)
            })),
            !1
        },
        choice_address: function() {
            return this.$el.hide(),
            i.show(),
            !1
        },
        choice_callback: function(e) {
            var t = this;
            this.$el.show(),
            this.address = e;
            var i = this.source_data,
            r = this.order_data,
            s = {
                address_detail: JSON.stringify(e)
            };
            i.commodities ? s.commodities = JSON.stringify(i.commodities) : i.wishes ? s.wishes = JSON.stringify(i.wishes) : (s.is_groupbuy = !0, (r.commodities || r.commodities[0].models) && (s.models = JSON.stringify(r.commodities[0].models)), i.groupbuy_id ? s.groupbuy_id = i.groupbuy_id: s.commodity_id = i.commodity_id),
            this._API.get_freight(s,
            function(e) {
                e.freight ? t.$el.find(".freight-wrp .price").text("¥" + e.freight) : t.$el.find(".freight-wrp .price").text("免运费");
                var i = e.price.toString().split(".")[0],
                r = e.price.toString().split(".")[1];
                t.$el.find(".allprice .price .int").text(i),
                t.$el.find(".price-all .price .int").text(i),
                t.$el.find(".allprice .price .demical").text(r),
                t.$el.find(".price-all .price .demical").text(r),
                t.is_allow_buy = e.is_allow_buy
            },
            function(e) {
                o.tip(e.msg)
            }),
            this.$el.find(".info-wrp").html(Mustache.render(a, {
                address: e,
                is_takeout: SOHUZ.page.is_takeout
            }))
        },
        change_message: function(e) {
            this.$el.find(".message-wrp .message").html(e)
        },
        show_edit_message: function() {
            return r.show(),
            !1
        },
        link_a: function(e) {
            var t = $(e.currentTarget);
            location.href = t.data("href")
        },
        change_invoice: function(e) {
            var t = this,
            i = t.$el.find(".invoice-wrp"),
            r = i.find(".sui-change");
            r.hasClass("on") ? (r.removeClass("on"), i.find(".input-row").hide()) : (r.addClass("on"), i.find(".input-row").show())
        },
        show_timechoice: function() {
            this._timechoice.show()
        },
        time_render: function(e) {
            var t = this;
            t.$el.find(".hopetime-wrp .time").html(e[0] + " " + e[1])
        },
        get_timedata: function(e) {
            if (SOHUZ.page.is_takeout) return this.get_takeout_timedata(e);
            var t = {
                datalist: []
            },
            i = [];
            _.each(e.intervals,
            function(e) {
                for (var t = e[0]; t < e[1]; t++) i.push({
                    n: "" + t + ":00-" + t + ":30"
                }),
                i.push({
                    n: "" + t + ":30-" + (t + 1) + ":00"
                })
            });
            for (var r = 0; r <= e.days; r++) {
                var a = new Date;
                if (a = a.getTime() + 24 * r * 60 * 60 * 1e3, a = new Date(a), 0 !== r) t.datalist.push({
                    p: a.getFullYear() + "-" + (a.getMonth() + 1) + "-" + a.getDate(),
                    c: i
                });
                else {
                    var s = a.getHours() + parseFloat(e.delivery_delay) + a.getMinutes() / 60,
                    o = $.extend([], i);
                    _.map(i,
                    function(e) {
                        var t = e.n.split("-")[0].split(":")[0],
                        i = e.n.split("-")[0].split(":")[1],
                        r = parseInt(t) + parseInt(i) / 60;
                        s > r && o.shift()
                    }),
                    o.length > 0 && t.datalist.push({
                        p: a.getFullYear() + "-" + (a.getMonth() + 1) + "-" + a.getDate(),
                        c: o
                    })
                }
            }
            return t
        },
        get_takeout_timedata: function(e) {
            var t = {
                datalist: []
            },
            i = [];
            e.intervals.forEach(function(e) {
                for (var t = e[0]; t < e[1]; t++) i.push({
                    n: "" + t + ":00-" + t + ":15"
                }),
                i.push({
                    n: "" + t + ":15-" + t + ":30"
                }),
                i.push({
                    n: "" + t + ":30-" + t + ":45"
                }),
                i.push({
                    n: "" + t + ":45-" + (t + 1) + ":00"
                })
            });
            for (var r = 0; r <= e.days; r++) {
                var a = new Date;
                if (a = a.getTime() + 24 * r * 60 * 60 * 1e3, a = new Date(a), 0 !== r) t.datalist.push({
                    p: a.getFullYear() + "-" + (a.getMonth() + 1) + "-" + a.getDate(),
                    c: i
                });
                else {
                    var s = a.getHours() + parseFloat(e.delivery_delay) + a.getMinutes() / 60,
                    o = $.extend([], i);
                    _.map(i,
                    function(e) {
                        var t = e.n.split("-")[0].split(":")[0],
                        i = e.n.split("-")[0].split(":")[1],
                        r = parseInt(t) + parseInt(i) / 60;
                        s > r && o.shift()
                    }),
                    o.length > 0 && t.datalist.push({
                        p: a.getFullYear() + "-" + (a.getMonth() + 1) + "-" + a.getDate(),
                        c: o
                    })
                }
            }
            return t
        },
        change_score: function(e) {
            var t = this,
            i = $(e.currentTarget),
            r = t.order_data;
            if (i.hasClass("on")) {
                i.removeClass("on");
                var a = c.get_fixed2(r.price),
                s = a.split(".")[0],
                o = a.split(".")[1];
                t.$el.find(".price-all .price .int").html(s),
                t.$el.find(".price-all .price .decimal").html(o)
            } else {
                i.addClass("on");
                var a = c.get_fixed2(r.price_when_score),
                s = a.split(".")[0],
                o = a.split(".")[1];
                t.$el.find(".price-all .price .int").html(s),
                t.$el.find(".price-all .price .decimal").html(o)
            }
        },
        show_agreement: function() {
            location.href = "/shop/shops/" + SOHUZ.page.shop_id + "/pay-agreement"
        }
    })
});
define("controllers/OrderPayViewController", ["global", "controllers/baseview", "utils/wx", "sui", "kzsdk"],
function(a, e, t, i, n) {
    return e.extend({
        el: ".myapp",
        data: {},
        can_return: !1,
        initialize: function(a) {
            this._init(),
            this.data = a,
            this.render(),
            console.log("index")
        },
        render: function() {
            n.is_ios && this.$el.find(".jump-to-wechat").show()
        },
        events: {
            "tap .pay-list .cash": "cash_pay",
            "tap .pay-list .alipay": "alipay_pay",
            "tap .pay-list .wechat": "wechat_pay",
            "tap .pay-list .alipay_peak": "alipay_peak_pay",
            "tap .pay-list .wechat_peak": "wechat_peak_pay",
            "tap .icon-return": "pay_return",
            "tap .alipay-wrp": "hide_alipay",
            "tap .btn-free-charge": "free_pay",
            'tap [data-role="jump-to-wechat"]': "jump_to_wechat"
        },
        pay_return: function() {
            var a = this;
            return this.can_return ? (this.$el.find(".alipay-wrp").hide(), this.$el.find(".wx-qrcode-wrp").hide()) : SOHUZ.page.is_takeout ? location.href = "/shop/takeout-order/" + a.data.order_id: location.href = "/shop/order-detail/" + a.data.order_id,
            !1
        },
        cash_pay: function() {
            var a = this;
            return a._API.pay_by_cash(a.data.order_id,
            function(e) {
                location.href = "/shop/order-success/" + a.data.order_id + "/jump-to"
            },
            function(a) {
                i.tip("支付出错")
            }),
            !1
        },
        alipay_pay: function() {
            var e = this;
            return a.is_weixin ? (e.can_return = !0, e.$el.find(".alipay-wrp").show()) : e._API.pay_by_alipay(e.data.order_id,
            function(a) {
                location.href = a
            },
            function(a) {
                a && a.msg && i.tip(a.msg)
            }),
            !1
        },
        hide_alipay: function() {
            this.$el.find(".alipay-wrp").hide()
        },
        wechat_pay: function() {
            var e = this;
            return a.is_weixin ? location.href = "/shop/shops/" + SOHUZ.page.shop_id + "/order-pay/" + e.data.order_id + "?wx_redirect=true": (e.can_return = !0, e.$el.find(".wx-qrcode-wrp").show(), e.$el.find(".wxqrimg").attr("src", "//www.kuaizhan.com/common/encode-png?data=" + encodeURIComponent(location.href) + "?wx_redirect=true")),
            !1
        },
        alipay_peak_pay: function() {
            var e = this;
            return a.is_weixin ? (e.can_return = !0, e.$el.find(".alipay-wrp").show()) : e._API.pay_by_peakalipay(e.data.order_id,
            function(a) {
                location.href = a
            },
            function(a) {
                a && a.msg && i.tip(a.msg)
            }),
            !1
        },
        wechat_peak_pay: function() {
            var e = this;
            if (a.is_weixin) {
                var t = e.$el.find(".js-wx-openid").html();
                t && "None" != t ? e._API.pay_by_peakwechat_native(e.data.order_id, t,
                function(a) {
                    WeixinJSBridge && WeixinJSBridge.invoke("getBrandWCPayRequest", {
                        appId: a.wxdata.appId,
                        timeStamp: a.wxdata.timeStamp,
                        nonceStr: a.wxdata.nonceStr,
                        "package": a.wxdata["package"],
                        signType: a.wxdata.signType,
                        paySign: a.wxdata.paySign
                    },
                    function(a) {
                        WeixinJSBridge && WeixinJSBridge.log(a.err_msg),
                        "get_brand_wcpay_request:ok" == a.err_msg ? window.location.href = "/shop/order-success/" + e.data.order_id + "/jump-to": "get_brand_wcpay_request:fail" == a.err_msg ? (e.$el.find(".wxpay-code").show(), e.$el.find(".btn-wxpay").hide(), e._API.wxpay_link_by_openid(e.data.order_id, t,
                        function(a) {
                            if (a) {
                                var t = "//www.kuaizhan.com/common/encode-png?data=" + encodeURIComponent(a);
                                e.$el.find(".wxpay-img").html('<img src="' + t + '">')
                            }
                        },
                        function(a) {
                            e.$el.find(".wxpay-img").html(a)
                        })) : alert("微信支付失败，返回消息：" + a.err_msg)
                    })
                },
                function(a) {
                    a && a.msg && i.tip(a.msg)
                }) : e._API.pay_by_peakwechat(e.data.order_id,
                function(a) {
                    location.href = a
                },
                function(a) {
                    a && a.msg && i.tip(a.msg)
                })
            } else e._API.pay_by_peakwechat(e.data.order_id,
            function(a) {
                e.can_return = !0,
                e.$el.find(".wx-qrcode-wrp").show(),
                e.$el.find(".wxqrimg").attr("src", "//www.kuaizhan.com/common/encode-png?data=" + encodeURIComponent(a) + "?wx_redirect=true"),
                e.$el.find('[data-role="jump-to-wechat"]').data("url", "//www.kuaizhan.com/common/encode-png?data=" + encodeURIComponent(a) + "?wx_redirect=true")
            },
            function(a) {
                a && a.msg && i.tip(a.msg)
            });
            return ! 1
        },
        free_pay: function() {
            var a = this;
            a._API.free_pay(a.data.order_id,
            function(e) {
                location.href = "/shop/order-success/" + a.data.order_id + "/jump-to"
            },
            function(a) {
                a && a.msg && i.tip(a.msg)
            })
        },
        jump_to_wechat: function(a) {
            var e = $(a.currentTarget);
            if (n.is_ios) {
                var t = e.data("url");
                n.wechatScan(t)
            }
        }
    })
});
define("controllers/OrderPayWxViewController", ["global", "controllers/baseview"],
function(e, i) {
    return i.extend({
        el: ".myapp",
        wxdata: null,
        data: {},
        initialize: function(e) {
            this.data = e,
            this.wxdata = this.$el.data("wxdata"),
            this._init(),
            this.render()
        },
        render: function() {},
        events: {
            "tap .btn-wxpay": "order_pay_wx",
            "touchend .wxpay-img": "show_finish",
            "tap .btn-finish": "order_finish"
        },
        order_pay_wx: function() {
            var e = this;
            WeixinJSBridge && WeixinJSBridge.invoke("getBrandWCPayRequest", {
                appId: e.wxdata.appId,
                timeStamp: e.wxdata.timeStamp,
                nonceStr: e.wxdata.nonceStr,
                "package": e.wxdata["package"],
                signType: e.wxdata.signType,
                paySign: e.wxdata.paySign
            },
            function(i) {
                WeixinJSBridge && WeixinJSBridge.log(i.err_msg),
                "get_brand_wcpay_request:ok" == i.err_msg ? window.location.href = "/shop/order-success/" + e.$el.data("orderid") + "/jump-to": "get_brand_wcpay_request:fail" == i.err_msg ? (e.$el.find(".wxpay-code").show(), e.$el.find(".btn-wxpay").hide(), e._API.wxpay_link(e.$el.find(".wxpay-token").data("wxpay-token"),
                function(i) {
                    if (i) {
                        var n = "//www.kuaizhan.com/common/encode-png?data=" + encodeURIComponent(i);
                        e.$el.find(".wxpay-img").html('<img src="' + n + '">')
                    }
                },
                function(i) {
                    e.$el.find(".wxpay-img").html(i)
                })) : alert("微信支付失败，返回消息：" + i.err_msg)
            })
        },
        show_finish: function() {
            this.$el.find(".btn-finish").show()
        },
        order_finish: function() {
            window.location.href = "/shop/orders/" + this.$el.data("orderid") + "/jump-to"
        }
    })
});
define("controllers/OrderPayWxtestViewController", ["global", "controllers/baseview"],
function(e, a) {
    return a.extend({
        el: ".myapp",
        wxdata: null,
        data: {},
        initialize: function(e) {
            this.data = e,
            this.wxdata = this.$el.data("wxdata"),
            this._init(),
            this.render()
        },
        render: function() {},
        events: {
            "tap .btn-wxpay": "order_pay_wx"
        },
        order_pay_wx: function() {
            var e = this;
            WeixinJSBridge && WeixinJSBridge.invoke("getBrandWCPayRequest", {
                appId: e.wxdata.appId,
                timeStamp: e.wxdata.timeStamp,
                nonceStr: e.wxdata.nonceStr,
                "package": e.wxdata["package"],
                signType: e.wxdata.signType,
                paySign: e.wxdata.paySign
            },
            function(e) {
                WeixinJSBridge && WeixinJSBridge.log(e.err_msg),
                "get_brand_wcpay_request:ok" == e.err_msg ? alert("微信支付已绑定成功") : alert("微信支付失败，返回消息：" + e.err_msg)
            })
        }
    })
});
define("controllers/OrderSuccessViewController", ["global", "controllers/baseview", "utils/mask", "utils/wx", "utils/shopAPI", "sui"],
function(i, e, t, n, s, o) {
    return e.extend({
        _mask: null,
        el: ".myapp",
        initialize: function(e) {
            var o = this;
            this._init({
                dont_config_wx_share: !0
            }),
            this.render(),
            this._mask = new t({
                onclick: function() {
                    o.hideshare()
                }
            }),
            i.is_weixin && (s.get_shopinfo(function(i) {
                var t = i.avatar ? i.avatar: "//" + window.location.host + "/shop/images/static/default_avatar.png",
                s = i.title,
                o = "这是我发现的店铺，快进来逛逛！好货多多特别赞！",
                a = "//" + location.host + "/shop/order-share/" + e.order_id;
                n.config_share(o, s, t, a, {
                    timeline_title: s
                })
            }), o.$el.find(".btn-to-share").show())
        },
        render: function() {},
        events: {
            "tap .btn-to-share": "showshare",
            "tap .banner": "golink"
        },
        showshare: function() {
            this._mask.show(),
            this.$el.find(".share-tip").show()
        },
        hideshare: function() {
            this._mask.hide(),
            this.$el.find(".share-tip").hide()
        },
        golink: function(i) {
            var e = $(i.currentTarget).data("href");
            e && "None" !== e && "none" !== e && (location.href = e)
        }
    })
});
define("controllers/OrderShareViewController", ["global", "controllers/baseview", "utils/wx", "utils/shopAPI"],
function(e, i, n, t) {
    return i.extend({
        el: ".myapp",
        initialize: function(i) {
            var o = this;
            this._init({
                dont_config_wx_share: !0
            }),
            this.render(),
            e.is_weixin && (t.get_shopinfo(function(e) {
                var t = e.avatar ? e.avatar: "//" + window.location.host + "/shop/images/static/default_avatar.png",
                o = e.title,
                r = "买到就是赚到，看我淘到了多少好宝贝",
                a = "//" + window.location.host + "/shop/order-share/" + i.order_id;
                n.config_share(r, o, t, a, {
                    timeline_title: o
                })
            }), o.$el.find(".btn-to-share").show())
        },
        render: function() {},
        events: {
            "tap .share_img": "golink"
        },
        golink: function(e) {
            var i = $(e.currentTarget).data("href");
            i && "None" !== i && "none" !== i && (window.location.href = i)
        }
    })
});
define("controllers/OrderRefundViewController", ["global", "controllers/baseview", "utils/wx", "utils/shopAPI", "utils/mobile_select_choice", "sui", "utils/validate"],
function(e, t, a, r, o, n, i) {
    return t.extend({
        el: ".myapp",
        initialize: function(t) {
            var o = this;
            o._init({
                dont_config_wx_share: !0
            }),
            o.render(),
            o.data = t,
            o.order_data = o.$el.data("order"),
            e.is_weixin && (r.get_shopinfo(function(e) {
                var r = e.avatar ? e.avatar: "//" + window.location.host + "/shop/images/static/default_avatar.png",
                o = e.title,
                n = "买到就是赚到，看我淘到了多少好宝贝",
                i = "//" + window.location.host + "/shop/order-share/" + t.order_id;
                a.config_share(n, o, r, i, {
                    timeline_title: o
                })
            }), o.$el.find(".btn-to-share").show())
        },
        render: function() {
            var e = this,
            t = null;
            t = SOHUZ.page.is_takeout ? {
                datalist: [{
                    p: "仅退款",
                    c: [{
                        n: "不想买了"
                    },
                    {
                        n: "地址信息填错"
                    },
                    {
                        n: "其他"
                    }]
                }]
            }: {
                datalist: [{
                    p: "仅退款",
                    c: [{
                        n: "不想买了"
                    },
                    {
                        n: "拍错/填错地址"
                    }]
                },
                {
                    p: "退货退款",
                    c: [{
                        n: "假冒品牌"
                    },
                    {
                        n: "材料与商品描述不符"
                    },
                    {
                        n: "颜色/款式/图案与描述不符"
                    },
                    {
                        n: "质量问题"
                    },
                    {
                        n: "其他"
                    }]
                }]
            },
            e._reasonselect = new o({
                data: t,
                select_text: "请选择退款理由",
                n_line: 2,
                confirm: function(t) {
                    console.log(t),
                    e.select_render(t)
                }
            })
        },
        events: {
            'tap [data-role="reason"]': "show_select",
            "tap .icon-down": "show_select",
            "tap .btn-confirm": "order_refund",
            'change [data-role="reason"]': "reason_else"
        },
        show_select: function() {
            var e = this;
            e._reasonselect.show()
        },
        select_render: function(e) {
            var t = this;
            t.$el.find('[data-role="reason"]').val(e[0] + "-" + e[1]).trigger("change")
        },
        reason_else: function() {
            var e = this;
            "退货退款-其他" == e.$el.find('[data-role="reason"]').val() || "仅退款-其他" == e.$el.find('[data-role="reason"]').val() ? e.$el.find(".row-other").show() : e.$el.find(".row-other").hide()
        },
        order_refund: function() {
            var e = this,
            t = e.data.order_id,
            a = e.$el.find('[data-role="reason"]').val(),
            r = parseFloat(e.$el.find('[data-role="apply_price"]').val());
            if ("退货退款-其他" != a && "仅退款-其他" != a || (a = e.$el.find("textarea").val()), !a) return n.tip("请选择退款理由"),
            !1;
            if (!i.isprice(r)) return n.tip("请输入正确的退款金额"),
            !1;
            var o;
            return o = e.order_data.wallet_used ? (100 * e.order_data.price + e.order_data.wallet_used) / 100 : e.order_data.price,
            o < r ? (n.tip("不能超过订单金额" + o), !1) : void e._API.close_order(t, {
                refund_reason: a,
                apply_price: r
            },
            function(e) {
                SOHUZ.page.is_takeout ? location.href = "/shop/takeout-order/" + t: location.href = "/shop/order-detail/" + t
            },
            function(e) {
                20307 === e.code ? n.tip("请回浏览器或者APP申请退款") : n.tip(e.msg)
            })
        }
    })
});
define("controllers/TipPayViewController", ["global", "controllers/baseview", "utils/wx", "sui"],
function(i, a, n, e) {
    return a.extend({
        el: ".myapp",
        data: {},
        can_return: !1,
        initialize: function(i) {
            this.data = i,
            this.render(),
            console.log("index")
        },
        render: function() {},
        events: {
            "tap .icon-return": "pay_return",
            "tap .alipay-wrp": "hide_alipay",
            "tap .pay-list .alipay_peak": "alipay_peak_pay",
            "tap .pay-list .wechat_peak": "wechat_peak_pay"
        },
        pay_return: function() {
            return this.can_return ? (this.$el.find(".alipay-wrp").hide(), this.$el.find(".wx-qrcode-wrp").hide()) : window.history.back(),
            !1
        },
        hide_alipay: function() {
            this.$el.find(".alipay-wrp").hide()
        },
        alipay_peak_pay: function() {
            var a = this;
            return i.is_weixin ? (a.can_return = !0, a.$el.find(".alipay-wrp").show()) : a._API.pay_tip_by_peakalipay(a.data.tip_id,
            function(i) {
                window.location.href = i
            },
            function(i) {
                i && i.msg && e.tip(i.msg)
            }),
            !1
        },
        wechat_peak_pay: function() {
            var a = this;
            return a._API.pay_tip_by_peakwechat(a.data.tip_id,
            function(n) {
                i.is_weixin ? window.location.href = n: (a.can_return = !0, a.$el.find(".wx-qrcode-wrp").show(), a.$el.find(".wxqrimg").attr("src", "//www.kuaizhan.com/common/encode-png?data=" + encodeURIComponent(n) + "?wx_redirect=true"))
            },
            function(i) {
                i && i.msg && e.tip(i.msg)
            }),
            !1
        }
    })
});
define("controllers/TipPayWxViewController", ["global", "controllers/baseview"],
function(i, n) {
    return n.extend({
        el: ".myapp",
        wxdata: null,
        data: {},
        initialize: function(i) {
            this.data = i,
            this.wxdata = this.$el.data("wxdata"),
            this._init(),
            this.render()
        },
        render: function() {},
        events: {
            "tap .btn-wxpay": "tip_pay_wx",
            "touchend .wxpay-img": "show_finish",
            "tap .btn-finish": "tip_finish"
        },
        tip_pay_wx: function() {
            var i = this;
            WeixinJSBridge && WeixinJSBridge.invoke("getBrandWCPayRequest", {
                appId: i.wxdata.appId,
                timeStamp: i.wxdata.timeStamp,
                nonceStr: i.wxdata.nonceStr,
                "package": i.wxdata["package"],
                signType: i.wxdata.signType,
                paySign: i.wxdata.paySign
            },
            function(n) {
                WeixinJSBridge && WeixinJSBridge.log(n.err_msg),
                "get_brand_wcpay_request:ok" == n.err_msg ? window.location.href = "/club/apiv1/tips/" + i.$el.data("tipid") + "/jump-to-success": "get_brand_wcpay_request:fail" == n.err_msg ? (i.$el.find(".wxpay-code").show(), i.$el.find(".btn-wxpay").hide(), i._API.wxpay_link(i.$el.find(".wxpay-token").data("wxpay-token"),
                function(n) {
                    if (n) {
                        var t = "//www.kuaizhan.com/common/encode-png?data=" + encodeURIComponent(n);
                        i.$el.find(".wxpay-img").html('<img src="' + t + '">')
                    }
                },
                function(n) {
                    i.$el.find(".wxpay-img").html(n),
                    i.$el.find(".wxpay-code .f13").append("err:" + JSON.stringify(n))
                })) : alert("微信支付失败，返回消息：" + n.err_msg)
            })
        },
        show_finish: function() {
            this.$el.find(".btn-finish").show()
        },
        tip_finish: function() {
            window.location.href = "/club/apiv1/tips/" + this.$el.data("tipid") + "/jump-to"
        }
    })
});
define("controllers/ShopGroupbuyViewController", ["global", "controllers/baseview", "templates/commodity_item.html", "sui"],
function(t, o, i, e) {
    var n = 20;
    return o.extend({
        el: ".myapp",
        on_get_more: !1,
        data: {},
        all_count: 0,
        count: 0,
        initialize: function(t) {
            this.data = t,
            this.all_count = this.$el.data("count"),
            this.count = this.$el.find(".groupbuylist .item").length,
            this._init(),
            this.render()
        },
        render: function() {
            var t = this,
            o = _(function() {
                var o = $(window).scrollTop();
                o > 500 && t.$el.find(".btn-go-top").show(),
                o < 200 && t.$el.find(".btn-go-top").hide()
            }).throttle(200);
            $(window).scroll(function() {
                if (o(), $(window).scrollTop() + $(window).height() > $(document).height() - 20) {
                    if (t.on_get_more || t.count == t.all_count) return;
                    t.on_get_more = !0,
                    t.get_more_commodities(),
                    e.tip("商品加载中…")
                }
            })
        },
        events: {
            "tap .btn-go-top": "go_top",
            'tap [data-role="peak-payment"]': "peak_payment"
        },
        peak_payment: function() {
            var t = '<div class="peak-payment-display"><div class="tip">第三方支付是指：买方付款后，交易款将暂时处于冻结状态；买方确认收货后，交易款解除冻结状态，买方在约定期限内未进行处理的，系统自动确认后交易款解除冻结状态。</div><div data-role="confirm" class="confirm">好的，我知道了</div></div>';
            e.display({
                content: t,
                tag: "[data-role='confirm']",
                confirm: function() {}
            })
        },
        go_top: function() {
            return $(document.body).animate({
                scrollTop: 0
            },
            800),
            !1
        },
        get_more_commodities: function() {
            var t = this,
            o = {};
            o.is_online = !0,
            o.offset = t.count,
            o.limit = n,
            o.category_id = t.data.group_id ? t.data.group_id: "",
            o.type = 200,
            t._API.get_commodities(o,
            function(o) {
                t.count = t.count + o.length;
                for (var e = 0; e < o.length; e++) {
                    var n = o[e];
                    n.thumb = !n.avatar || "http://pic.kuaizhan.com" != n.avatar.substr(0, 23) && "https://pic.kuaizhan.com" != n.avatar.substr(0, 24) ? n.avatar: n.avatar + "/imageView/v1/thumbnail/640x0"
                }
                var a = Mustache.render(i, {
                    commodities: o
                });
                t.$el.find(".list").append(a),
                $(".sui-center-tip").fadeOut(),
                t.on_get_more = !1
            })
        }
    })
});
define("controllers/GroupbuyViewController", ["global", "controllers/baseview", "utils/mask", "utils/img_swipe", "sui", "utils/wx", "utils/validate", "utils/pop_scroll", "utils/model"],
function(e, i, o, t, s, r, d, a, n) {
    return i.extend({
        el: ".myapp",
        data: {},
        shop_setting: {},
        initialize: function() {
            var i = this;
            if (this._init({
                dont_config_wx_share: !0
            }), this.data = this.$el.data("val"), this.shop_setting = this.$el.data("shops_setting"), this.is_groupbuy = !0, this.data.model_details = this.getJSON_encode(this.data.model_details), n.init({
                $el: this.$el,
                data: this.data,
                shop_setting: this.shop_setting,
                type: 200,
                is_group_header_discount: this.data.group_header_discount,
                is_groupbuy_header: !0,
                click: function(e) {
                    var o = {};
                    i.is_groupbuy ? i.is_create_groupbuy ? (o.models = e.models, o.commodity_id = e.commodity_id, i.create_groupbuy(o)) : (o.models = e.models, o.groupbuy_id = i.groupbuy_id, i.add_groupbuy(o)) : (o = e, i.buy_now(o))
                },
                close: function() {
                    i.hide_box()
                }
            }), this.render(), e.is_weixin) {
                var o = this.$el.find(".swipe-item").eq(0).find("img").attr("src"),
                t = this.data.title,
                s = "爱拼才会赢，和我一起做团长吧",
                d = window.location.href;
                r.config_share(t, s, o, d, {
                    timeline_title: s
                })
            }
        },
        render: function() {
            var e = this,
            i = e.$el.find(".images").find(".focus-ctr").find("span").length;
            e.$el.find(".images").find(".focus-ctr").find("span").eq(0).addClass("cur"),
            t(e.$el.find(".swipe")[0], {
                startSlide: 0,
                speed: 400,
                auto: 3e3,
                continuous: !0,
                disableScroll: !1,
                stopPropagation: !1,
                callback: function(e, i) {
                    $(i).parents(".images").find(".focus-ctr").eq(e).addClass("cur").siblings().removeClass("cur")
                },
                transitionEnd: function(e, o) {
                    2 == i && e >= 2 ? $(o).parents(".images").find(".focus-ctr").find("span").removeClass("cur").eq(e - 2).addClass("cur") : $(o).parents(".images").find(".focus-ctr").find("span").removeClass("cur").eq(e).addClass("cur")
                }
            }),
            e.mask = new o({
                onclick: function() {
                    e.hide_box(),
                    n.hide()
                }
            }),
            e.$el.find(".model-box").bind("touchmove",
            function() {
                return ! 1
            })
        },
        events: {
            "tap .btn-buy": "show_create_groupbuy",
            "tap .btn-buyalone": "show_create_alone",
            "tap .btn-addgroup": "show_add_groupbuy",
            "tap .tab-describe,.tab-addgroup": "change_tab",
            "tap .disable-qq": "disable_qq",
            "tap .groupbuy-wrp": "groupbuy_rule"
        },
        groupbuy_rule: function(e) {
            location.href = "/shop/shops/" + SOHUZ.page.shop_id + "/groupbuy-rule"
        },
        create_groupbuy: function(e) {
            var i = this;
            i._API.check_groupbuy({
                commodity_id: i.data._id
            },
            function() {
                var o = {};
                o.commodity_id = i.data._id,
                o.models = JSON.stringify(e.models),
                i.get_preorder_id(!0, o)
            },
            function(e) {
                "21738" == e.code ? s.tip("该拼团不允许重复参团") : s.tip(e.msg)
            })
        },
        add_groupbuy: function(e) {
            var i = this;
            i._API.check_groupbuy({
                groupbuy_id: i.groupbuy_id
            },
            function() {
                var o = {};
                o.groupbuy_id = i.groupbuy_id,
                o.models = JSON.stringify(e.models),
                i.get_preorder_id(!0, o)
            },
            function(e) {
                "21738" == e.code ? s.tip("该拼团不允许重复参团") : s.tip(e.msg)
            })
        },
        choice_model_type: function(e) {
            var i = this,
            o = $(e.currentTarget),
            t = o.parent();
            return ! o.hasClass("disable") && (o.hasClass("hover") ? o.removeClass("hover") : (t.find(".hover").removeClass("hover"), o.addClass("hover")), i.is_groupbuy || (u_amount.check_amount(), u_amount.check_parice()), !1)
        },
        disable_qq: function() {
            s.tip("客服不在线,客官请稍候~~")
        },
        change_tab: function(e) {
            var i = this,
            o = $(e.currentTarget);
            o.hasClass("tab-describe") ? (i.$el.find(".tab-addgroup").removeClass("hover"), i.$el.find(".tab-describe").addClass("hover"), i.$el.find(".addgroup").hide(), i.$el.find(".describe").show()) : (i.$el.find(".addgroup").show(), i.$el.find(".describe").hide(), i.$el.find(".tab-addgroup").addClass("hover"), i.$el.find(".tab-describe").removeClass("hover"))
        },
        get_preorder_id: function(e, i) {
            e ? this._API.create_pre_groupbuy_order(i,
            function(e) {
                setTimeout(function() {
                    location.href = "/shop/shops/" + SOHUZ.page.shop_id + "/create-groupbuy?preorder_id=" + e.preorder_id
                },
                600)
            },
            function(e) {
                s.tip(e.msg)
            }) : this._API.create_pre_order(i,
            function(e) {
                setTimeout(function() {
                    location.href = "/shop/shops/" + SOHUZ.page.shop_id + "/create-order?preorder_id=" + e.preorder_id
                },
                600)
            },
            function(e) {
                s.tip(e.msg)
            })
        },
        buy_now: function(e) {
            var i = this,
            o = {};
            return o.commodities = [],
            o.commodities.push(e),
            o.commodities = JSON.stringify(o.commodities),
            i.get_preorder_id(!1, o),
            !1
        },
        show_create_groupbuy: function() {
            var e = this;
            return !! e.data.is_online && (e.is_create_groupbuy = !0, e.is_groupbuy = !0, n.has_models() ? (e.$el.find(".bottom").hide(), e.mask.show(), n.set_groupbuy_header(!0), n.show(!0), a.init(e.$el.find(".model-box .scrollable-wrp"), e.$el.find(".model-box")), !1) : void e.create_groupbuy({
                models: {}
            }))
        },
        show_add_groupbuy: function(e) {
            var i = this;
            i.is_create_groupbuy = !1,
            i.is_groupbuy = !0;
            var o = $(e.currentTarget),
            t = o.parents(".item");
            return i.groupbuy_id = t.data("data")._id,
            n.has_models() ? (i.$el.find(".bottom").hide(), i.mask.show(), n.set_groupbuy_header(!1), n.show(!0), a.init(i.$el.find(".model-box .scrollable-wrp"), i.$el.find(".model-box")), !1) : void i.add_groupbuy({
                models: {}
            })
        },
        show_create_alone: function() {
            var e = this;
            return !! e.data.is_online && (e.is_groupbuy = !1, e.$el.find(".bottom").hide(), e.mask.show(), n.show(), a.init(e.$el.find(".model-box .scrollable-wrp"), e.$el.find(".model-box")), !1)
        },
        hide_box: function() {
            var e = this;
            return e.$el.find(".bottom").show(),
            e.mask.hide(),
            a.clear(),
            !1
        }
    })
});
define("templates/groupbuy_share_members.html", [],
function() {
    return '{{#members}}\n<div class="person">\n    {{#avatar.tiny}}\n    <div class="img"><img src="{{avatar.tiny}}"></div>\n    {{/avatar.tiny}}\n    {{^avatar.tiny}}\n    <div class="img"><img src="/shop/images/static/default_buyer.png"></div>\n    {{/avatar.tiny}}\n    <div class="person-info">\n        <div class="nick f-28 {{#is_group_header}}group-header{{/is_group_header}} line-clamp-1">{{nick}}</div>\n        <div class="time f-24">{{time}}</div>\n    </div>\n</div>\n{{/members}}\n{{^members}}\n<div class="no-person"></div>\n{{/members}}'
});
define("controllers/GroupbuyShareViewController", ["global", "controllers/baseview", "utils/mask", "utils/wx", "sui", "templates/groupbuy_share_members.html", "utils/model"],
function(e, o, t, i, r, s, a) {
    return o.extend({
        el: ".myapp",
        data: {},
        _mask: null,
        initialize: function(o) {
            var d = this;
            if (this._init({
                dont_config_wx_share: !0
            }), this.data = this.$el.data("data"), this.page = 1, $.extend(this.data, this.$el.data("val")), this.data.model_details = this.getJSON_encode(this.data.model_details), this.shop_setting = this.$el.data("shops_setting"), a.init({
                $el: this.$el,
                data: this.data,
                shop_setting: this.shop_setting,
                type: 200,
                is_group_header_discount: this.data.group_header_discount,
                is_groupbuy_header: !1,
                click: function(e) {
                    console.log(e);
                    var o = {};
                    o.models = e.models,
                    d.is_create_groupbuy ? (o.commodity_id = d.data.groupbuy.commodity_id, d.create_groupbuy(o)) : (o.groupbuy_id = d.data.groupbuy_id, d.add_groupbuy(o))
                },
                close: function() {
                    d.hide_box()
                }
            }), this._mask = new t({
                onclick: function() {
                    d.hideshare(),
                    a.hide()
                }
            }), e.is_weixin) {
                var n = this.data.commodities[0].avatar,
                h = "超值！只要" + this.data.commodities[0].price + "元,团购“" + this.data.commodities[0].title + "”!",
                u = this.data.groupbuy.n_group_members - this.data.groupbuy.order_ids.length;
                if (u <= 0) var _ = this.data.commodities[0].title + "的拼团，大家都来做团长吧";
                else var _ = this.data.commodities[0].title + "的拼团，还差" + u + "人快来吧";
                var p = window.location.href;
                i.config_share(h, _, n, p, {
                    timeline_title: _
                })
            }
            d.mask = new t({
                onclick: function() {
                    d.hide_box(),
                    a.hide()
                }
            });
            var m = this.$el.find(".members"),
            c = {};
            c.offset = 0,
            c.limit = 10,
            this.order_id = c.order_id = m.data("order-id"),
            d._API.get_groupbuy_members(c,
            function(e) {
                var o = Mustache.render(s, {
                    members: e
                });
                m.find(".members-info").append(o),
                0 == m.find('[data-role="more"]').size() && 10 == e.length && m.append('<div class="more f-28" data-role="more"><span>查看更多</span></div>')
            },
            function(e) {
                r.tip("获取参团列表出错" + e.msg)
            })
        },
        events: {
            "tap .btn-home": "back_home",
            "tap .btn-confirm": "show_add_groupbuy",
            "tap .btn-share": "showshare",
            "tap .btn-newgroupbuy": "show_create_groupbuy",
            'tap [data-role="more"]': "get_more"
        },
        get_preorder_id: function(e, o) {
            e ? this._API.create_pre_groupbuy_order(o,
            function(e) {
                console.log("preorder:", e),
                setTimeout(function() {
                    location.href = "/shop/shops/" + SOHUZ.page.shop_id + "/create-groupbuy?preorder_id=" + e.preorder_id
                },
                600)
            },
            function(e) {
                r.tip(e.msg)
            }) : this._API.create_pre_order(o,
            function(e) {
                console.log("preorder:", e),
                setTimeout(function() {
                    location.href = "/shop/shops/" + SOHUZ.page.shop_id + "/create-groupbuy?preorder_id=" + e.preorder_id
                },
                600)
            },
            function(e) {
                r.tip(e.msg)
            })
        },
        get_more: function() {
            var e = this,
            o = e.$el.find(".members"),
            t = {
                limit: 10
            };
            t.offset = 10 * this.page,
            t.order_id = this.order_id,
            this._API.get_groupbuy_members(t,
            function(t) {
                if (0 == t.length) o.find('[data-role="more"]').remove();
                else {
                    var i = Mustache.render(s, {
                        members: t
                    });
                    o.find(".members-info").append(i),
                    t.length < 10 && o.find('[data-role="more"]').remove()
                }
                e.page++
            },
            function(e) {
                r.tip("获取参团列表出错" + e.msg)
            })
        },
        choice_model_type: function(e) {
            var o = $(e.currentTarget),
            t = o.parent();
            return ! o.hasClass("disable") && (o.hasClass("hover") ? o.removeClass("hover") : (t.find(".hover").removeClass("hover"), o.addClass("hover")), !1)
        },
        back_home: function() {
            location.href = "/shop/shops/" + SOHUZ.page.shop_id
        },
        add_groupbuy: function(e) {
            var o = this,
            t = o.data.groupbuy_id;
            o._API.check_groupbuy({
                groupbuy_id: t
            },
            function() {
                var i = {};
                i.groupbuy_id = t,
                i.models = JSON.stringify(e.models),
                o.get_preorder_id(!0, i)
            },
            function(e) {
                "21737" == e.code && r.tip("该拼团不允许重复参团")
            })
        },
        create_groupbuy: function(e) {
            var o = this,
            t = o.data.groupbuy.commodity_id;
            o._API.check_groupbuy({
                commodity_id: t
            },
            function() {
                params.commodity_id = t,
                params.models = JSON.stringify(e.models),
                o.get_preorder_id(!1, params),
                location.href = "/shop/shops/" + SOHUZ.page.shop_id + "/create-groupbuy/jump-to?commodity_id=" + t + "&models=" + encodeURIComponent(JSON.stringify(e.models))
            },
            function(e) {
                "21738" == e.code && r.tip("该拼团不允许重复开团")
            })
        },
        showshare: function() {
            this._mask.show(),
            this.$el.find(".share-tip").show()
        },
        hideshare: function() {
            this._mask.hide(),
            this.$el.find(".share-tip").hide()
        },
        show_create_groupbuy: function() {
            var e = this;
            return e.is_groupbuy = !0,
            e.is_create_groupbuy = !0,
            a.has_models() ? (e.$el.find(".bottom").hide(), a.set_groupbuy_header(!0), e.mask.show(), a.show(not_buy_alone = !0), !1) : void e.create_groupbuy({
                models: {}
            })
        },
        show_add_groupbuy: function(e) {
            var o = this;
            return a.has_models() ? (o.$el.find(".bottom").hide(), o.mask.show(), a.show(not_buy_alone = !0), !1) : void o.add_groupbuy({
                models: {}
            })
        },
        hide_box: function() {
            var e = this;
            return e.$el.find(".bottom").show(),
            e.mask.hide(),
            !1
        }
    })
});
define("controllers/CouponViewController", ["global", "controllers/baseview", "utils/mask", "utils/img_swipe", "sui", "utils/wx", "utils/validate", "utils/model"],
function(i, o, e, t, n, s, a, d) {
    return o.extend({
        el: ".myapp",
        data: {},
        initialize: function(o) {
            var e = this;
            if (this._init({
                dont_config_wx_share: !0
            }), this.data = this.$el.data("val"), d.init({
                $el: this.$el,
                data: this.data,
                type: 300,
                click: function(i) {
                    console.log(i),
                    e.create_coupon(i)
                },
                close: function() {
                    e.hide_box()
                }
            }), this.render(), i.is_weixin) {
                var t = this.$el.find(".swipe-item").eq(0).find("img").attr("src"),
                n = this.data.title,
                a = "劵",
                c = window.location.href;
                s.config_share(n, a, t, c, {
                    timeline_title: a
                })
            }
        },
        render: function() {
            var i = this,
            o = i.$el.find(".images").find(".focus-ctr").find("span").length;
            i.$el.find(".images").find(".focus-ctr").find("span").eq(0).addClass("cur"),
            t(i.$el.find(".swipe")[0], {
                startSlide: 0,
                speed: 400,
                auto: 3e3,
                continuous: !0,
                disableScroll: !1,
                stopPropagation: !1,
                callback: function(i, o) {
                    $(o).parents(".images").find(".focus-ctr").eq(i).addClass("cur").siblings().removeClass("cur")
                },
                transitionEnd: function(i, e) {
                    2 == o && i >= 2 ? $(e).parents(".images").find(".focus-ctr").find("span").removeClass("cur").eq(i - 2).addClass("cur") : $(e).parents(".images").find(".focus-ctr").find("span").removeClass("cur").eq(i).addClass("cur")
                }
            }),
            i.mask = new e({
                onclick: function() {
                    i.hide_box(),
                    d.hide()
                }
            }),
            i.$el.find(".model-box").bind("touchmove",
            function() {
                return ! 1
            })
        },
        events: {
            "tap .btn-showbuy": "show_box",
            "tap .disable-qq": "disable_qq"
        },
        disable_qq: function() {
            n.tip("客服不在线,客官请稍候~~")
        },
        create_coupon: function(i) {
            var o = this,
            e = {},
            t = new Date(o.data.coupon_end_date.split("T")[0]),
            s = new Date;
            return s = s.setHours(0, 0, 0, 0),
            t.getTime() - s < 0 ? (n.tip("该团购劵已过期"), !1) : (e.commodities = [], e.commodities.push({
                commodity_id: o.data._id,
                models: {},
                amount: i.amount
            }), 300 === o.data.type && (e.commodities[0].coupon_start_date = o.data.coupon_start_date, e.commodities[0].coupon_end_date = o.data.coupon_end_date, e.commodities[0].coupon_id = o.data.coupon_id, e.commodities[0].coupon_enable_refund = o.data.coupon_enable_refund, e.commodities[0].coupon_is_booking = o.data.coupon_is_booking, e.commodities[0].coupon_desc = "", e.commodities[0].is_coupon = !0), e.commodities = JSON.stringify(e.commodities), o._API.create_pre_order(e,
            function(i) {
                setTimeout(function() {
                    location.href = "/shop/shops/" + SOHUZ.page.shop_id + "/create-order?preorder_id=" + i.preorder_id
                },
                600)
            },
            function(i) {
                n.tip(i.msg)
            }), !1)
        },
        show_box: function() {
            var i = this;
            return !! i.data.is_online && (i.$el.find(".bottom").hide(), i.mask.show(), d.show(), !1)
        },
        hide_box: function() {
            var i = this;
            return i.$el.find(".bottom").show(),
            i.mask.hide(),
            !1
        }
    })
});
define("templates/buycar_list.html", [],
function() {
    return '{{#items}}\n    <li class="scroll-li" data-id="{{id}}">\n        <div class="title">{{title}}</div>\n\n        <div class="rr">\n            <div class="price">¥{{price}}</div>\n            <div class="btn-less"></div>\n            <div class="amount">{{amount}}</div>\n            <div class="btn-add"></div>\n        </div>\n    </li>\n{{/items}}\n'
});
define("templates/commodity_takeout_info.html", [],
function() {
    return '<div class="commodity-takeout-info" data-val="" data-shops_setting="">\n    <div class="takeout-info-close" data-role="close"></div>\n    <div class="commodity takeout">\n        <div class="images">\n             <div class="swipe">\n                <div class="swipe-wrap" style="padding-bottom:100%">\n                    {{#commodity.attachments}}\n                        <div class="swipe-item"><img src="{{url}}" alt="" data-imgid="" fit=""></div>\n                    {{/commodity.attachments}}\n                </div>\n            </div>\n            <div class="focus-ctr"></div>\n        </div>\n        <div class="commodity-info-wrapper">\n            <div class="info">\n                <div class="name">{{commodity.title}}</div>\n\n                <div class="price-row">\n                    <div class="price">¥{{commodity.price}}</div>\n                    {{#commodity.has_original_price}}\n                        <div class="original-price">¥{{commodity.original_price}}</div>\n                    {{/commodity.has_original_price}}\n\n                </div>\n\n                {{#commodity.amount}}\n                    <div class="amount">库存{{commodity.amount}}件</div>\n                {{/commodity.amount}}\n                {{^commodity.amount}}\n                    <div class="amount">暂无库存</div>\n                {{/commodity.amount}}\n\n                <!--{{#commodity.freight}}\n                    <div class="freight">快递&nbsp;￥{{commodity.freight}}</div>\n                {{/commodity.freight}}\n                {{^commodity.freight}}\n                    <div class="freight">快递&nbsp;免运费</div>\n                {{/commodity.freight}}-->\n\n                <div class="sales_volume">销量 {{commodity.sales_volume}}</div>\n\n            </div>\n        </div>\n        <!--<div class="myshop">\n            <a href="/shop/shops/{{shop._id}}">\n                <div class="avatar">\n                    <img src="{{shop.avatar}}">\n                </div>\n                <div class="text-title">{{shop.title}}</div>\n                <div class="text-enter">进入店铺</div>\n                <div class="icon-enter"></div>\n            </a>\n        </div>-->\n        <div class="describe">\n\n            {{^commodity.desc}}\n            <div class="none-con"></div>\n            {{/commodity.desc}}\n            {{#commodity.desc}}\n                {{{commodity.desc}}}\n            {{/commodity.desc}}\n\n        </div>\n    </div>\n\n</div>\n'
});
define("templates/takeout_announcement.html", [],
function() {
    return '<div class="app-takeout-announcement">\n    <div class="title">点菜必读</div>\n    <div class="announcement">店铺公告：{{shop.announcement}}</div>\n\n    <div class="list">\n        {{#manjian_text}}\n        <div class="cell">\n            <span class="icon-jian"></span>\n            <span class="text">{{manjian_text}}</span>\n        </div>\n        {{/manjian_text}}\n\n        <div class="cell">\n            <span class="icon-pay"></span>\n            <span class="text">支持微信，支付宝在线支付</span>\n        </div>\n        {{#shop_settings.provide_invoice}}\n        <div class="cell">\n            <span class="icon-invoice"></span>\n            <span class="text">该卖家支持开发票，请在下单时写好发票抬头。</span>\n        </div>\n        {{/shop_settings.provide_invoice}}\n    </div>\n\n    <div class="btn-close"></div>\n</div>'
});
define("views/takeout_announcement", ["templates/takeout_announcement.html", "utils/shopAPI", "utils/validate", "sui"],
function(t, e, n, i) {
    var o = (SOHUZ.page.site_id, $("body")),
    s = {
        opt: null,
        init: function(n) {
            var i = this;
            i.opt = n,
            i._API = e;
            var s = "";
            return i.opt.shop_settings.is_delivery_free && (s = "满" + i.opt.shop_settings.delivery_free_condition + "元免配送费；"),
            i.opt.shop_settings.is_full_to_off && _.map(i.opt.shop_settings.full_to_off_list,
            function(t) {
                s = s + "满" + t.price + "元减" + t.off_price + "元；"
            }),
            i.opt.manjian_text = s,
            o.append(Mustache.render(t, i.opt)),
            i.$el = o.find(".app-takeout-announcement"),
            i.$el.on("click", ".btn-close",
            function() {
                i.hide()
            }),
            i
        },
        show: function() {
            var t = this;
            t.$el.show()
        },
        hide: function() {
            var t = this;
            t.$el.hide()
        }
    };
    return s
});
define("utils/scroll", [],
function() {
    var t = function(t) {
        function i(t, i, e, n, h) {
            e > 1 ? t.find("ul").animate({
                marginTop: "-=1"
            },
            0,
            function() {
                var t = Math.abs(parseInt($(this).css("margin-top")));
                t >= i && ($(this).find("li").slice(0, 1).appendTo($(this)), $(this).css("margin-top", 0))
            }) : t.find("ul").animate({
                marginLeft: "-=1"
            },
            0,
            function() {
                var t = parseInt($(this).css("margin-left"));
                t <= parseInt( - n) && ($(this).find("li").slice(0, 1).appendTo($(this)), $(this).css("margin-left", h))
            })
        }
        var e = [],
        n = this;
        this.$el = t.el,
        this.speed = t.speed || 40,
        this.row_height = t.row_height || 30,
        this.counter = this.$el.find("li").size(),
        1 == this.counter && (this.width = this.$el.find("li").eq(0).width(), this.content_width = this.$el.find("li span").eq(0).width()),
        this.run = function() {
            n.$el.each(function(t) {
                var h = $(this);
                e[t] = setInterval(function() {
                    h.find("ul").height() < h.height() ? clearInterval(e[t]) : 1 == n.counter ? n.width ? i(h, n.row_height, n.counter, n.content_width, n.width) : clearInterval(e[t]) : i(h, n.row_height, n.counter)
                },
                n.speed),
                h.hover(function() {
                    clearInterval(e[t])
                },
                function() {
                    e[t] = setInterval(function() {
                        h.find("ul").height() < h.height() ? clearInterval(e[t]) : 1 == n.counter ? n.width ? i(h, n.row_height, n.counter, n.content_width, n.width) : clearInterval(e[t]) : i(h, n.row_height, n.counter)
                    },
                    n.speed)
                })
            })
        }
    };
    return t
});
define("controllers/TakeoutHomeViewController", ["global", "controllers/baseview", "templates/buycar_list.html", "templates/commodity_takeout_info.html", "views/takeout_announcement", "utils/img_swipe", "utils/mask", "sui", "kzsdk", "utils/scroll", "utils/tools"],
function(e, t, i, a, r, n, o, d, s, c, l) {
    return t.extend({
        el: ".myapp-takeout-home",
        sliderScroll: null,
        commditiesScroll: null,
        buycarScroll: null,
        data_mybuycar: {},
        mask: null,
        takeout_announcement: null,
        initialize: function(e) {
            var t = this;
            if (this._init(), t.mask = new o({
                onclick: function() {
                    t.hide_buycar()
                }
            }), t.takeout_announcement = r.init({
                shop_settings: t.$el.data("shop_settings"),
                shop: t.$el.data("shop")
            }), require(["vendor/iscroll"],
            function() {
                t.render()
            }), $(window).on("beforeunload",
            function() {
                t._API.LS_savebuycar(t.data_mybuycar)
            }), t.$el.find('[data-role="marquee"]').size() > 0) {
                var i = $('[data-role="marquee"]').height(),
                a = new c({
                    speed: 40,
                    row_height: i,
                    el: $('[data-role="marquee"]')
                });
                a.run()
            }
            if (s.ready({
                readyCallback: function() {
                    s.is_android && s.version >= 1.3 && s.disable_refresh()
                },
                errorCallback: function(e) {
                    console.log("not ready:" + e)
                }
            }), t.$el.find(".wx-subscribe").size() > 0) {
                var n = t.$el.find(".wx-subscribe").data("delay-time") ? 1e3 * parseInt(t.$el.find(".wx-subscribe").data("delay-time")) : 0,
                d = t.$el.find(".wx-subscribe").data("duration-time");
                setTimeout(function() {
                    t.$el.find(".wx-subscribe").show(),
                    d != -1 && setTimeout(function() {
                        t.$el.find(".wx-subscribe").is(":visible") && t.$el.find(".wx-subscribe").hide()
                    },
                    1e3 * d)
                },
                n)
            }
        },
        render: function() {
            var e = this;
            e.sliderScroll = new IScroll("#takeout-slider", {
                mouseWheel: !0
            }),
            e.commditiesScroll = new IScroll("#takeout-commdities", {
                mouseWheel: !0
            }),
            e.buycarScroll = new IScroll("#buycar-list", {
                mouseWheel: !0
            }),
            e.disScroll = new IScroll(".slider-dis", {
                mouseWheel: !0
            }),
            document.addEventListener("touchmove",
            function(e) {
                e.preventDefault()
            },
            !1),
            e.$el.find("#takeout-slider li").eq(0).addClass("hover"),
            e.render_mybuycar()
        },
        events: {
            "tap .commdity-item .btn-add": "item_add",
            "tap .commdity-item .btn-less": "item_less",
            "tap #takeout-slider .row": "slider_hover",
            "tap .buycar": "show_buycar",
            "tap .btn-create-order": "create_order",
            "tap .buycar-wrapper .rr-del": "clear_buycar",
            "tap .buycar-wrapper .btn-add": "buycar_item_add",
            "tap .buycar-wrapper .btn-less": "buycar_item_less",
            "tap .takeout-manjian": "show_takeout_announcement",
            "tap .link-home,.link-comments,.link-describe": "tolink",
            'tap [data-role="avatar"]': "jump_to_preview"
        },
        jump_to_preview: function(e) {
            var t = $(e.currentTarget).closest(".commdity-item").data("id");
            this._API.get_one_commodity(t,
            function(e) {
                var t = $.extend({},
                e);
                t.attachments.forEach(function(e) {
                    "http://pic.kuaizhan.com" != e.url.substr(0, 23) && "https://pic.kuaizhan.com" != e.url.substr(0, 24) || (e.url = e.url + "/imageView/v1/thumbnail/640x0")
                });
                for (var i = "",
                r = 0; r < t.attachments.length; r++) i += '<span class=""></span>';
                t.original_price && t.original_price != t.price && (t.has_original_price = !0),
                t.original_price = l.get_fixed2(t.original_price),
                t.price = l.get_fixed2(t.price);
                var o = Mustache.render(a, {
                    commodity: t
                });
                d.slider_dis({
                    content: o
                }).show();
                var s = $(".commodity-takeout-info");
                s.css({
                    "min-height": $(window).height()
                }),
                s.find(".focus-ctr").html(i);
                var c = t.attachments.length;
                s.find(".images").find(".focus-ctr").find("span").eq(0).addClass("cur"),
                n(s.find(".swipe")[0], {
                    startSlide: 0,
                    speed: 400,
                    auto: 3e3,
                    continuous: !0,
                    disableScroll: !1,
                    stopPropagation: !1,
                    callback: function(e, t) {
                        $(t).parents(".images").find(".focus-ctr").eq(e).addClass("cur").siblings().removeClass("cur")
                    },
                    transitionEnd: function(e, t) {
                        2 == c && e >= 2 ? $(t).parents(".images").find(".focus-ctr").find("span").removeClass("cur").eq(e - 2).addClass("cur") : $(t).parents(".images").find(".focus-ctr").find("span").removeClass("cur").eq(e).addClass("cur")
                    }
                })
            })
        },
        render_mybuycar: function() {
            var e = this,
            t = e._API.LS_getbuycar() || {};
            for (var i in t) for (var a = 0; a < t[i].amount; a++) !
            function(t) {
                setTimeout(function() {
                    e.$el.find('.commdity-item[data-id="' + t + '"]').find(".btn-add").trigger("tap")
                },
                0)
            } (i)
        },
        item_add: function(e) {
            var t = this,
            i = $(e.currentTarget).parents(".commdity-item");
            t._item_add(i),
            e.stopPropagation()
        },
        item_less: function(e) {
            var t = this,
            i = $(e.currentTarget).parents(".commdity-item");
            t._item_less(i),
            e.stopPropagation()
        },
        _item_add: function(e) {
            var t = this,
            i = e.data("id"),
            a = parseInt(e.find(".commdity-num").html());
            return a++,
            !e.find(".btn-add").hasClass("disable") && (!e.find(".btn-add").hasClass("offline") && (a >= parseInt(e.data("limit")) && e.find(".btn-add").addClass("disable"), 1 === a ? (e.find(".commdity-num").removeClass("hide"), e.find(".btn-less").removeClass("hide"), t.data_mybuycar[i] = {
                amount: a,
                price: e.data("price"),
                title: e.find(".title").html()
            }) : t.data_mybuycar[i].amount = a, e.find(".commdity-num").html(a), t.change_slider_numbr(e.parents(".cell")), !0))
        },
        _item_less: function(e) {
            var t = this,
            i = e.data("id"),
            a = parseInt(e.find(".commdity-num").html());
            a--,
            e.find(".btn-add").removeClass("disable"),
            0 === a ? (e.find(".commdity-num").addClass("hide"), e.find(".btn-less").addClass("hide"), delete t.data_mybuycar[i]) : t.data_mybuycar[i].amount = a,
            e.find(".commdity-num").html(a),
            t.change_slider_numbr(e.parents(".cell"))
        },
        change_slider_numbr: function(e) {
            var t = this,
            i = e.data("id");
            $item = t.$el.find('[data-id="' + i + '"]');
            var a = 0;
            e.find(".commdity-item .commdity-num").each(function() {
                a += parseInt($(this).html())
            }),
            0 === a ? $item.find(".number").hide().html("") : $item.find(".number").show().html(a),
            t.change_buycar_number()
        },
        slider_hover: function(e) {
            var t = this,
            i = $(e.currentTarget);
            t.$el.find("#takeout-slider .hover").removeClass("hover"),
            i.addClass("hover");
            var a = i.index();
            t.commditiesScroll.scrollToElement(document.querySelector("#takeout-commdities li:nth-child(" + (a + 1) + ")"), 1e3, null, null, !1)
        },
        show_buycar: function() {
            var e = this;
            e.$el.find(".buycar-wrapper").is(":visible") ? e.hide_buycar() : (e.$el.find(".buycar-wrapper").show(), e.$el.find("#buycar-list ul").html(Mustache.render(i, e.data_to_list())), e.mask.show(), setTimeout(function() {
                e.buycarScroll.refresh()
            },
            0))
        },
        hide_buycar: function() {
            var e = this;
            e.mask.hide(),
            e.$el.find(".buycar-wrapper").hide()
        },
        change_buycar_number: function() {
            var e = this,
            t = 0,
            i = 0;
            e.$el.find(".commdity-item").each(function() {
                var e = parseInt($(this).find(".commdity-num").html());
                t += e,
                i += parseFloat($(this).data("price")) * e
            }),
            0 === t ? e.$el.find(".icon-buycar .number").hide().html(t) : e.$el.find(".icon-buycar .number").show().html(t),
            i = i.toFixed(2),
            e.$el.find(".all_price .price").html(i),
            parseFloat(e.$el.find(".delivery_min_price").data("price")) <= i ? e.$el.find(".btn-create-order").show() : e.$el.find(".btn-create-order").hide()
        },
        create_order: function() {
            var e = this;
            e._API.get_shop_setting(function(t) {
                if (t) {
                    var i = t.order_in_close_time;
                    i ? e.settlement() : e._API.get_shopinfo(function(t) {
                        var i = t.open_time,
                        a = t.close_time,
                        r = new Date,
                        n = 60 * r.getHours() + r.getMinutes();
                        i > n || a < n ? d.tip("非营业时间不能下单") : e.settlement()
                    })
                }
            })
        },
        settlement: function() {
            var e = this,
            t = {};
            t.commodities = [];
            for (var i in e.data_mybuycar) t.commodities.push({
                commodity_id: i,
                models: e.data_mybuycar[i].models,
                amount: e.data_mybuycar[i].amount
            });
            return e.data_mybuycar = {},
            0 === t.commodities.length ? (alert("没有添加任何商品"), !1) : (t.commodities = JSON.stringify(t.commodities), e.$el.find(".btn-create-order").hide(), e._API.create_pre_order(t,
            function(e) {
                console.log("preorder:", e),
                setTimeout(function() {
                    location.href = "/shop/shops/" + SOHUZ.page.shop_id + "/create-order?preorder_id=" + e.preorder_id
                },
                600)
            },
            function(e) {
                d.tip(e.msg)
            }), !1)
        },
        clear_buycar: function() {
            var e = this;
            for (var t in e.data_mybuycar) for (var i = e.data_mybuycar[t].amount, a = 0; a < i; a++) e.$el.find('.buycar-wrapper [data-id="' + t + '"]').find(".btn-less").trigger("tap");
            e.data_mybuycar = {},
            e.hide_buycar()
        },
        data_to_list: function() {
            var e = this,
            t = [];
            for (var i in e.data_mybuycar) t.push({
                id: i,
                amount: e.data_mybuycar[i].amount,
                price: e.data_mybuycar[i].price,
                title: e.data_mybuycar[i].title
            });
            return {
                items: t
            }
        },
        buycar_item_add: function(e) {
            var t = this,
            i = $(e.currentTarget).parents("li"),
            a = t.$el.find('.commdity-item[data-id="' + i.data("id") + '"]');
            if (t._item_add(a)) {
                var r = parseInt(i.find(".amount").html());
                r++,
                i.find(".amount").html(r)
            }
        },
        buycar_item_less: function(e) {
            var t = this,
            i = $(e.currentTarget).parents("li"),
            a = t.$el.find('.commdity-item[data-id="' + i.data("id") + '"]'),
            r = parseInt(i.find(".amount").html());
            return 0 !== r && (r--, i.find(".amount").html(r), void t._item_less(a))
        },
        show_takeout_announcement: function() {
            this.takeout_announcement.show()
        },
        tolink: function(e) {
            var t = $(e.currentTarget);
            location.href = t.attr("href")
        }
    })
});
define("controllers/TakeoutDescribeViewController", ["global", "controllers/baseview"],
function(e, n) {
    return n.extend({
        el: ".myapp-takeout-describe",
        data: {},
        initialize: function(e) {
            this._init(),
            this.render()
        },
        render: function() {},
        events: {
            "tap .link-home,.link-comments,.link-describe": "tolink"
        },
        tolink: function(e) {
            var n = $(e.currentTarget);
            location.href = n.attr("href")
        }
    })
});
define("templates/takeout_comments_item.html", [],
function() {
    return '{{#items}}\n<div class="item">\n    <div class="stars">\n        <div class="stars-a"></div>\n        <div class="stars-b" style="width: {{_score}}px;"></div>\n    </div>\n    <div class="message">{{comment}}</div>\n    <div class="time">{{_ctime}}</div>\n    <div class="buyer">\n        <div class="name">{{user_name}}</div>\n        <div class="avatar">\n            {{#user_avatar.mid}}\n            <img src="{{user_avatar.mid}}">\n            {{/user_avatar.mid}}\n            {{^user_avatar.mid}}\n            <img src="/shop/images/static/default_comments_user.png">\n            {{/user_avatar.mid}}\n        </div>\n    </div>\n</div>\n{{/items}}'
});
define("controllers/TakeoutCommentsViewController", ["global", "controllers/baseview", "templates/takeout_comments_item.html", "sui"],
function(e, t, o, n) {
    return t.extend({
        el: ".myapp-takeout-comments",
        data: {},
        on_get_more: !1,
        no_more_comments: !1,
        count: 10,
        comment_limit: 10,
        initialize: function(e) {
            this._init(),
            this.render()
        },
        events: {
            "tap .link-home,.link-comments,.link-describe": "tolink",
            "tap .comments-header .item": "get_comments"
        },
        render: function() {
            var e = this;
            $(window).scroll(function() {
                if ($(window).scrollTop() + $(window).height() > $(document).height() - 20) {
                    if (e.on_get_more || e.no_more_comments) return;
                    e.on_get_more = !0,
                    e.get_more_commodities(),
                    n.tip("评论加载中…")
                }
            })
        },
        tolink: function(e) {
            var t = $(e.currentTarget);
            location.href = t.attr("href")
        },
        get_more_commodities: function() {
            var e = this,
            t = e.$el.find(".comments-header .hover").data("comment_type"),
            n = {
                offset: e.count,
                limit: e.comment_limit
            };
            t && (n.comment_type = t),
            e._get_comments(n,
            function(t) {
                e.$el.find(".comments-list").append(Mustache.render(o, {
                    items: t
                })),
                e.on_get_more = !1,
                e.count += t.length,
                e.no_more_comments = t.length != e.comment_limit
            })
        },
        _get_comments: function(e, t) {
            var o = this;
            o._API.get_shop_comments(SOHUZ.page.shop_id, e, t)
        },
        get_comments: function(e) {
            var t = this,
            n = $(e.currentTarget);
            t.$el.find(".comments-header .hover").removeClass("hover"),
            n.addClass("hover");
            var m = {
                offset: 0,
                limit: t.comment_limit
            };
            n.data("comment_type") && (m.comment_type = n.data("comment_type")),
            t._get_comments(m,
            function(e) {
                t.$el.find(".comments-list").html(Mustache.render(o, {
                    items: e
                })),
                t.count = t.comment_limit,
                t.no_more_comments = e.length != t.comment_limit
            })
        }
    })
});
define("controllers/TakeoutOrdersViewController", ["global", "controllers/baseview"],
function(e, n) {
    return n.extend({
        el: ".myapp-takeout-orders",
        data: {},
        initialize: function(e) {
            this._init(),
            this.render()
        },
        render: function() {},
        events: {}
    })
});
define("controllers/TakeoutOrderDetailViewController", ["global", "controllers/baseview", "sui"],
function(e, n, o) {
    return n.extend({
        el: ".myapp-takeout-orderdetail",
        data: {},
        initialize: function(e) {
            this.data = e,
            this._init(),
            this.render()
        },
        render: function() {},
        events: {
            "tap .btn-comment": "link_go",
            "tap .btn-pay": "link_go",
            "tap .btn-cancle": "order_cancle",
            "tap .btn-refund": "order_cancle",
            "tap .btn-finish": "order_finish"
        },
        link_go: function(e) {
            var n = $(e.currentTarget);
            return location.href = n.data("href"),
            !1
        },
        order_cancle: function(e) {
            var n = this,
            r = n.data.order_id,
            t = n.$el.data("order");
            return ! $(e.currentTarget).hasClass("disable") && ("peak" === t.payment ? location.href = "/shop/order-refund/" + r: o.confirm({
                msg: "确认取消订单",
                confirm: function() {
                    n._API.close_order(r, {},
                    function(e) {
                        window.location.href = "/shop/shops/" + SOHUZ.page.shop_id + "/mytakeout"
                    })
                }
            }), !1)
        },
        order_finish: function(e) {
            function n(e) {
                e = e.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
                var n = new RegExp("[\\?&]" + e + "=([^&#]*)"),
                o = n.exec(location.search);
                return null === o ? "": decodeURIComponent(o[1].replace(/\+/g, " "))
            }
            var r = this,
            t = r.data.order_id,
            i = n("tel");
            return i ? o.sms_confirm({
                title: "",
                confirm_text: "确认收货",
                data: {
                    order_id: t,
                    mobile: i
                },
                confirm: function(e) {
                    r._API.finish_order({
                        id: t,
                        mobile: i,
                        vcode: e
                    },
                    function(e) {
                        location.href = "/shop/shops/" + SOHUZ.page.shop_id + "/mytakeout"
                    },
                    function(e) {
                        console.log(e)
                    })
                }
            }) : o.confirm({
                msg: "确认收货",
                confirm: function() {
                    r._API.finish_order({
                        id: t
                    },
                    function(e) {
                        location.href = "/shop/shops/" + SOHUZ.page.shop_id + "/mytakeout"
                    })
                }
            }),
            !1
        }
    })
});
define("controllers/TakeoutOrderCommentViewController", ["global", "controllers/baseview"],
function(e, t) {
    return t.extend({
        el: ".myapp-takeout-ordercomment",
        data: {},
        initialize: function(e) {
            this.data = e,
            this._init(),
            this.render()
        },
        render: function() {},
        events: {
            "tap .choices .item": "choice_one",
            "tap .stars-a i": "set_star",
            "tap .stars-b i": "set_star",
            "tap .btn-comfirm": "set_comment"
        },
        choice_one: function(e) {
            var t = this,
            r = $(e.currentTarget);
            return t.$el.find(".choices .hover").removeClass("hover"),
            r.addClass("hover"),
            !1
        },
        set_star: function(e) {
            var t = $(e.currentTarget),
            r = t.index() + 1;
            t.parents(".stars").find(".stars-b").css("width", 24 * r + "px"),
            t.parents(".stars").data("val", r)
        },
        set_comment: function(e) {
            var t = this,
            r = {
                comment_type: t.$el.find(".choices .hover").data("val"),
                comment: t.$el.find('[data-role="comment"]').val(),
                delivery_score: t.$el.find('[data-role="delivery_score"]').data("val"),
                commodity_score: t.$el.find('[data-role="commodity_score"]').data("val")
            };
            return t._API.set_order_comment(t.data.order_id, r,
            function(e) {
                location.href = "/shop/takeout-order/" + t.data.order_id
            }),
            !1
        }
    })
});
define("templates/mywallet/mywallet_item.html", [],
function() {
    return '{{#item}}\n<li>\n    <div class="name">{{type_name}}</div>\n    <div class="sum {{income_sign}}">{{income_status}}{{income}}</div>\n    <div class="stage {{stage_status}}">{{stage_name}}</div>\n    <div class="time">{{ctime_format}}</div>\n</li>\n{{/item}}'
});
define("controllers/mywallet/mywalletViewController", ["global", "controllers/baseview", "sui", "templates/mywallet/mywallet_item.html"],
function(t, e, i, n) {
    return e.extend({
        el: ".myapp-mywallet",
        initialize: function() {
            var t = this;
            this.total_num = this.$el.data("total-num"),
            this.counter = this.$el.data("first-num"),
            this.has_loaded = !1,
            this.is_loadding = !1,
            $(window).scroll(function() {
                $(window).scrollTop() + $(window).height() > $(document).height() - 20 && !t.is_loadding && !t.has_loaded && t.total_num > 0 && (t.counter < t.total_num ? (t.is_loadding = !0, t.get_bills(), i.tip("商品加载中…")) : (t.has_loaded = !0, i.tip("已全部显示")))
            })
        },
        events: {},
        get_bills: function() {
            var t = this;
            t._API.get_bills({
                offset: t.counter,
                fetch_recent_one_month: !0,
                limit: 20
            },
            function(e) {
                t.is_loadding = !1,
                t.counter += e.length;
                for (var i = $.extend([], e), l = 0; l < i.length; l++) i[l].income = (i[l].income / 100).toFixed(2),
                "订单关闭" == i[l].stage_name ? (i[l].income_sign = "cancel", i[l].income_status = "", i[l].stage_status = "red") : (i[l].stage_status = "", i[l].is_positive ? (i[l].income_sign = "in", i[l].income_status = "+") : (i[l].income_sign = "out", i[l].income_status = "-"));
                t.$el.find("ul").append(Mustache.render(n, {
                    item: i
                }))
            })
        }
    })
});
define("controllers/mywallet/withdrawViewController", ["global", "controllers/baseview", "sui"],
function(t, a, i) {
    return a.extend({
        el: ".myapp-withdraw",
        initialize: function() {
            var t = this;
            this._API.get_wallet_setting(function(a) {
                t.balance = a.balance
            },
            function(t) {
                i.tip(t.msg)
            })
        },
        events: {
            'tap [data-role="withdraw"]': "withdraw"
        },
        withdraw: function() {
            var t = '<p class="update-tip">各位站长们：为了将来大家提现更加流畅，成功率更高。这几天电商提现系统在升级。请近3天内不要提现，3天后（5月13日）提现，您的合法收益将不会受影响，感谢理解~</p><div class="btn btn-red update-tip-btn">知道了</div>';
            i.display({
                content: t,
                confirm: function() {}
            })
        },
        get_data: function() {
            var t = {},
            a = this.$el.find("[data-model]");
            return a.each(function() {
                var a = $(this).data("model"),
                i = $(this).val();
                t[a] = i
            }),
            t
        },
        validate: function(t) {
            return this._Validate.isnone(t.amount) ? (i.tip("提现金额不能为空"), !1) : this._Validate.ismoney(parseFloat(t.amount)) ? this._Validate.islowerthan(parseFloat(t.amount), 1) ? (i.tip("提现金额不能低于1元"), !1) : this.balance || 0 == this.balance ? (console.log(parseFloat(t.amount), parseFloat(this.balance) / 100), !!this._Validate.isnotgreaterthan(parseFloat(t.amount), parseFloat(this.balance) / 100) || (i.tip("提现金额不能高于钱包余额"), !1)) : (i.tip("请稍等..."), !1) : (i.tip("提现金额格式错误"), !1)
        }
    })
});
define("utils/mobile_utils", [],
function() {
    var e = {
        countDownText: function(e) {
            var t = this,
            n = e.seconds,
            o = e.text.replace("{{time}}", n);
            return 0 === n ? void(e.over && e.over.call()) : (e.setText.call(t, o), void setTimeout(function() {
                e.seconds = n - 1,
                t.countDownText(e)
            },
            1e3))
        }
    };
    return e
});
define("controllers/mywallet/withdrawCardViewController", ["global", "controllers/baseview", "utils/mobile_select_choice", "utils/mobile_utils", "sui"],
function(t, i, e, a, n) {
    return i.extend({
        el: ".myapp-withdraw-card",
        initialize: function() {
            var t = this;
            this._tappable = !0;
            var i = {
                datalist: [{
                    p: "中国银行"
                },
                {
                    p: "招商银行"
                },
                {
                    p: "交通银行"
                },
                {
                    p: "中国工商银行"
                },
                {
                    p: "中国农业银行"
                },
                {
                    p: "中国建设银行"
                },
                {
                    p: "中国民生银行"
                },
                {
                    p: "广东发展银行"
                }]
            };
            t._bankselect = new e({
                data: i,
                select_text: "请选择银行",
                n_line: 1,
                confirm: function(i) {
                    var e = i[0];
                    t.$el.find("[data-role='bank']").val(e)
                }
            })
        },
        events: {
            'tap  [data-role="bank"]': "show_bankchoice",
            'tap [data-role="confirm"]': "confirm",
            'tap [data-role="get-vcode"]': "get_vcode"
        },
        show_bankchoice: function() {
            this._bankselect.show()
        },
        get_vcode: function(t) {
            var i = this,
            e = $(t.currentTarget),
            o = this.$el.find("[data-model='mobile']");
            return this._Validate.isnone(o.val()) ? void n.tip("手机号不能为空") : this._Validate.isphone(o.val()) ? (this._valid = !0, void(this._tappable && this._valid && (a.countDownText({
                text: "{{time}}s后重新获取",
                over: function() {
                    e.html("获取验证码"),
                    i._tappable = !0
                },
                setText: function(t) {
                    e.html(t),
                    i._tappable = !1
                },
                seconds: 60
            }), this._API.post_sms2(o.val(),
            function() {},
            function(t) {
                n.tip(t.msg)
            })))) : void n.tip("手机号格式错误")
        },
        confirm: function() {
            var t = this.get_data(),
            i = this.validate(t);
            i && this._API.update_wallet_setting(t,
            function() {
                n.tip("绑定成功"),
                setTimeout(function() {
                    location.href = "/shop/me/withdraw"
                },
                1e3)
            },
            function(t) {
                n.tip(t.msg)
            })
        },
        get_data: function() {
            var t = {},
            i = this.$el.find("[data-model]");
            return i.each(function() {
                var i = $(this).data("model"),
                e = $(this).val();
                t[i] = e
            }),
            t
        },
        validate: function(t) {
            var i = t;
            return this._Validate.isnone(i.bank) ? (n.tip("银行不能为空"), !1) : this._Validate.isnone(i.card) ? (n.tip("银行卡号不能为空"), !1) : this._Validate.isbank(i.card) ? this._Validate.isnone(i.name) ? (n.tip("姓名不能为空"), !1) : this._Validate.ischinese(i.name) ? this._Validate.isnone(i.mobile) ? (n.tip("手机号不能为空"), !1) : this._Validate.isphone(i.mobile) ? !this._Validate.isnone(i.vcode) || (n.tip("验证码号不能为空"), !1) : (n.tip("手机号格式错误"), !1) : (n.tip("姓名应为中文"), !1) : (n.tip("银行卡号错误"), !1)
        }
    })
});
define("controllers/LicensesDisplayViewController", ["global", "controllers/baseview"],
function(e, n) {
    return n.extend({
        el: ".myapp",
        initialize: function(e) {
            this._init(),
            this.render()
        },
        render: function() {},
        events: {}
    })
});
define("routes", ["global", "controllers/IndexViewController", "controllers/MyshopViewController", "controllers/CommodityViewController", "controllers/BuyerViewController", "controllers/BuyerOrderViewController", "controllers/OrderDetailViewController", "controllers/WishesViewController", "controllers/MeAddressViewController", "controllers/CreateAddressViewController", "controllers/CreateOrderViewController", "controllers/OrderPayViewController", "controllers/OrderPayWxViewController", "controllers/OrderPayWxtestViewController", "controllers/OrderSuccessViewController", "controllers/OrderShareViewController", "controllers/OrderRefundViewController", "controllers/TipPayViewController", "controllers/TipPayWxViewController", "controllers/ShopGroupbuyViewController", "controllers/GroupbuyViewController", "controllers/GroupbuyShareViewController", "controllers/CouponViewController", "controllers/TakeoutHomeViewController", "controllers/TakeoutDescribeViewController", "controllers/TakeoutCommentsViewController", "controllers/TakeoutOrdersViewController", "controllers/TakeoutOrderDetailViewController", "controllers/TakeoutOrderCommentViewController", "controllers/mywallet/mywalletViewController", "controllers/mywallet/withdrawViewController", "controllers/mywallet/withdrawCardViewController", "controllers/LicensesDisplayViewController"],
function(e, o, r, s, d, t, i, n, p, l, u, a, _, h, c, w, y, m, b, f, C, g, V, k, x, O, T, S, P, q, D, W, v) {
    "use strict";
    return Backbone.Router.extend({
        routes: {
            "shop/sites/:id(?*query)": "myshop",
            "shop/sites/:id/group/:group_id": "myshop_group",
            "shop/sites/:id/group": "index",
            "shop/sites/:id/describe": "index",
            "shop/sites/:id/create-order": "create_order",
            "shop/sites/:id/buyer": "buyer",
            "shop/sites/:id/buyer-order": "buyer_order",
            "shop/sites/:id/order-pay/:order_id": "order_pay",
            "shop/sites/:id/buyer-wishes": "buyer_wishes",
            "shop/sites/:id/me/address": "me_address",
            "shop/sites/:id/me/address/:id": "me_address_add",
            "shop/sites/:id/me/address-add": "me_address_add",
            "shop/sites/:id/me/takeout-address-add": "me_address_add",
            "shop/sites/:id/qrcode": "index",
            "shop/sites/:id/groupbuy": "shop_groupbuy",
            "shop/sites/:id/groupbuy-rule": "index",
            "shop/sites/:id/create-groupbuy": "create_order",
            "shop/sites/:id/mygroupbuy": "mygroupbuy",
            "": "myshop",
            "shop/shops/:id(?*query)": "myshop",
            "shop/shops/:id/group/:group_id": "myshop_group",
            "shop/shops/:id/group": "index",
            "shop/shops/:id/describe": "index",
            "shop/commodity/:id": "commodity",
            "shop/shops/:id/create-order": "create_order",
            "shop/shops/:id/buyer": "buyer",
            "shop/shops/:id/buyer-order": "buyer_order",
            "shop/shops/:id/order-pay/:order_id": "order_pay",
            "shop/wx-native-order-pay/:order_id": "wx_native_order_pay",
            "shop/shops/:id/buyer-wishes": "buyer_wishes",
            "shop/shops/:id/me/address": "me_address",
            "shop/shops/:id/me/address/:id": "me_address_add",
            "shop/shops/:id/me/address-add": "me_address_add",
            "shop/shops/:id/me/takeout-address/:id": "me_address_add",
            "shop/shops/:id/me/takeout-address-add": "me_address_add",
            "shop/shops/:id/qrcode": "index",
            "shop/wxpay/wx:aid": "order_pay_wx",
            "shop/wxpay/ts:id": "wxpay_test",
            "shop/wxpay/pk:id": "order_pay_wx",
            "shop/tip-pay/:tip_id": "tip_pay",
            "shop/wxpay/tip:id": "tip_pay_wx",
            "shop/order-success/:order_id": "order_success",
            "shop/order-detail/:order_id": "order_detail",
            "shop/order-share/:order_id": "order_share",
            "shop/order-refund/:order_id": "order_refund",
            "shop/shops/:id/groupbuy": "shop_groupbuy",
            "shop/groupbuy/:id": "groupbuy",
            "shop/shops/:id/groupbuy-rule": "index",
            "shop/shops/:id/pay-agreement": "index",
            "shop/shops/:id/create-groupbuy": "create_order",
            "shop/groupbuy-share/:order_id": "groupbuy_share",
            "shop/shops/:id/mygroupbuy": "mygroupbuy",
            "shop/coupon/:id": "coupon",
            "shop/takeout-shops/:id": "takeout_home",
            "shop/takeout-shops/:id/describe": "takeout_describe",
            "shop/takeout-shops/:id/comments": "takeout_comments",
            "shop/shops/:id/mytakeout": "takeout_orders",
            "shop/takeout-order/:order_id": "takeout_order_detail",
            "shop/takeout-order/:order_id/comment": "takeout_order_comment",
            "shop/me/wallet": "mywallet",
            "shop/me/withdraw": "mywallet_withdraw",
            "shop/me/bind-bank": "mywallet_withdraw_card",
            "shop/shops/:id/licenses-display": "licenses_display"
        },
        initialize: function() {
            console.log("routes init")
        },
        index: function() {
            new o
        },
        myshop: function(e) {
            if (SOHUZ.page.is_takeout) {
                new k
            } else {
                new r({
                    site_id: e
                })
            }
        },
        myshop_group: function(e, o) {
            new r({
                site_id: e,
                group_id: o
            })
        },
        commodity: function() {
            new s
        },
        buyer: function() {
            new d
        },
        buyer_order: function() {
            new t
        },
        create_order: function() {
            new u
        },
        buyer_wishes: function() {
            new n
        },
        me_address: function() {
            new p
        },
        me_address_add: function(e, o) {
            new l({
                id: o
            })
        },
        order_pay: function(e, o) {
            new a({
                site_id: e,
                order_id: o
            })
        },
        wx_native_order_pay: function(e) {
            new a({
                site_id: SOHUZ.page.site_id,
                order_id: e
            })
        },
        order_pay_wx: function(e) {
            new _({})
        },
        tip_pay: function(e) {
            new m({
                tip_id: e
            })
        },
        tip_pay_wx: function(e) {
            new b({})
        },
        wxpay_test: function(e) {
            new h({})
        },
        order_success: function(e) {
            new c({
                order_id: e
            })
        },
        order_detail: function(e) {
            new i({
                order_id: e
            })
        },
        order_share: function(e) {
            new w({
                order_id: e
            })
        },
        order_refund: function(e) {
            new y({
                order_id: e
            })
        },
        shop_groupbuy: function(e, o) {
            new f({
                site_id: e,
                group_id: o
            })
        },
        groupbuy: function() {
            new C
        },
        groupbuy_share: function() {
            new g
        },
        mygroupbuy: function() {
            new o
        },
        coupon: function() {
            new V
        },
        takeout_home: function() {
            new k
        },
        takeout_comments: function() {
            new O
        },
        takeout_orders: function() {
            new T
        },
        takeout_order_detail: function(e) {
            new S({
                order_id: e
            })
        },
        takeout_order_comment: function(e) {
            new P({
                order_id: e
            })
        },
        takeout_describe: function() {
            new x({})
        },
        mywallet: function() {
            new q({})
        },
        mywallet_withdraw: function() {
            new D({})
        },
        mywallet_withdraw_card: function() {
            new W({})
        },
        licenses_display: function() {
            new v({})
        }
    })
});
define("utils/momentTool", [],
function() {
    var _ = function() {
        var _;
        moment().format(),
        moment.lang("zh-cn", {
            months: "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"),
            monthsShort: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),
            weekdays: "星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"),
            weekdaysShort: "周日_周一_周二_周三_周四_周五_周六".split("_"),
            weekdaysMin: "日_一_二_三_四_五_六".split("_"),
            longDateFormat: {
                LT: "Ah点mm",
                L: "YYYY年MMMD日",
                LL: "YYYY年MMMD日",
                LLL: "YYYY年MMMD日 LT",
                LLLL: "YYYY年MMMD日ddddLT",
                l: "YYYY年MMMD日",
                ll: "YYYY年MMMD日",
                lll: "YYYY年MMMD日LT",
                llll: "YYYY年MMMD日ddddLT"
            },
            meridiem: function(_, t, e) {
                return _ < 9 ? "早上": 11 === _ && t < 30 || _ < 11 ? "上午": 13 === _ && t < 30 || _ < 13 ? "中午": _ < 18 ? "下午": "晚上"
            },
            calendar: {
                sameDay: "[今天]LT",
                nextDay: "[明天]LT",
                nextWeek: "[下]ddddLT",
                lastDay: "[昨天]LT",
                lastWeek: "[上]ddddLT",
                sameElse: "L"
            },
            relativeTime: {
                future: "%s内",
                past: "%s前",
                s: "几秒",
                m: "1分钟",
                mm: "%d分钟",
                h: "1小时",
                hh: "%d小时",
                d: "1天",
                dd: "%d天",
                M: "1个月",
                MM: "%d个月",
                y: "1年",
                yy: "%d年"
            }
        }),
        _ = moment.fn.fromNow,
        moment.fn.fromNow = function() {
            var t;
            return t = (new Date - this._d) / 1e3 / 60 / 60 / 24,
            t > 90 ? moment.fn.format.call(this, "YYYY-MM-DD") : t > 7 ? moment.fn.format.call(this, "M月D日") : _.apply(this, arguments)
        }
    };
    return _(),
    moment
});
require.config({
    paths: {
        text: "../bower_components/requirejs-text/text",
        wxsdk: "//res.wx.qq.com/open/js/jweixin-1.0.0",
        sui: "../scripts/utils/sui",
        kzsdk: "//kzcdn.itc.cn/res/mobile/js/lib/kzjssdk.js?v=1.2"
    }
}),
define("jquery", [],
function() {
    return window.jQuery
}),
define("moment", [],
function(e) {
    return e
}),
define("backbone", [],
function() {
    return window.Backbone
}),
define("underscore", [],
function() {
    return window._
}),
define("mustache", [],
function(e) {
    return e
}),
define("promise", [],
function() {
    return window.Promise
}),
define("AVChatClient", [],
function() {
    return window.AVChatClient
}),
require(["jquery", "moment", "backbone", "underscore", "mustache", "promise", "AVChatClient", "routes", "utils/momentTool"],
function(e, t, n, i, o, r, s, u) {
    "use strict";
    var c = i.throttle(function() {
        var t = e(window).width(),
        n = t / 10 > 48 ? 48 : t / 10;
        e("html").css("font-size", n + "px")
    },
    100);
    e(window).resize(c),
    c();
    var d = function() {
        this._global = {},
        this.routes = new u
    };
    return d.prototype.start = function() {
        return n.history.start({
            pushState: !0,
            root: "/"
        }),
        this
    },
    (new d).start()
}),
define("main", ["jquery", "moment", "backbone", "underscore", "mustache", "promise", "AVChatClient", "routes", "utils/momentTool"],
function() {});