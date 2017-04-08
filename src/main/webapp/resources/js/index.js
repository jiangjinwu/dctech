webpackJsonp([0], {
    "58vT": function(t, n, e) {
        "use strict";
        var a = e("AJv8"),
        o = e("JW6E"),
        i = e("JXW4"),
        s = e("wjAX"),
        c = e("uU/e"),
        l = e("DM3E");
        n.a = function() {
            function t() {
                var t = !0,
                n = "/passport/main/api/verifyCode?" + (new Date).getTime();
                s(".js-picvcode").attr("src", n),
                s(".js-picvcode").on("click",
                function(t) {
                    var n = "/passport/main/api/verifyCode?" + (new Date).getTime();
                    s(t.target).attr("src", n)
                }),
                s(".js-mobile-input").on("blur",
                function(n) {
                    var e = n.target.value;
                    1 === o.a.validateMobile(e).ret && i.a.checkMobile({
                        data: {
                            mobile: e
                        },
                        succCb: function(n) {
                        	console.info(n);
                            n && !n.exists ? a.a.alert("手机尚未注册", {
                                cancel: "知道了",
                                confirm: "去注册",
                                confirmCb: function() {
                                    window.router.setRoute("/register")
                                }
                            }) : t = !0
                        }
                    })
                }),
                s(".js-picvcode-input").on("keyup",
                function(t) {
                    var n = t.target.value;
                    4 === n.length ? (s(".js-send-mobile-code").prop("disabled", !1), s(".js-send-mobile-code").attr("data-status", "active")) : (s(".js-send-mobile-code").prop("disabled", !0), s(".js-send-mobile-code").attr("data-status", "inactive"))
                }),
                s(".js-send-mobile-code").on("click",
                function(n) {
                    return t ? void i.a.sendMobileCode({
                        data: {
                            mobile: s(".js-mobile-input").val(),
                            picvcode: s(".js-picvcode-input").val()
                        },
                        succCb: function(t) {
                            s(".js-send-mobile-code").hide(),
                            s(".js-countdown").show(),
                            a.a.countDown(s(".js-countdown"), 60, "{{count}}s后重新发送",
                            function() {
                                s(".js-countdown").animateCss("fadeOut",
                                function() {
                                    s(".js-countdown").hide(),
                                    s(".js-send-mobile-code").animateCss("fadeIn"),
                                    s(".js-send-mobile-code").show()
                                }),
                                s(".js-picvcod").trigger("click"),
                                s(".js-picvcode-input").val("")
                            })
                        },
                        errCb: function(t, n, e) {
                            try {
                                var o = JSON.parse(t.responseText);
                                a.a.toast(o.msg || "短信发送失败")
                            } catch(t) {
                                a.a.toast("短信发送失败")
                            }
                        }
                    }) : void a.a.alert("手机尚未注册", {
                        cancel: "知道了",
                        confirm: "去注册",
                        confirmCb: function() {
                            window.router.setRoute("/register")
                        }
                    })
                }),
                s(".js-confirm-reset").on("click",
                function() {
                    var t = s(".js-mobile-input").val(),
                    n = s(".js-mobile-code-input").val(),
                    e = s(".js-pwd-input").val(),
                    c = o.a.validateMobile(t);
                    if (1 !== c.ret) return a.a.toast(c.msg);
                    var l = o.a.validatePwd(e);
                    return 1 !== l.ret ? a.a.toast(l.msg) : n && 6 === n.length ? void i.a.pwdReset({
                        data: {
                            phone: t,
                            password: e,
                            picvcode: n,
                            callback: SOHUZ.page.callback,
                            site_id: SOHUZ.page.site_id
                        },
                        succCb: function(t) {
                            a.a.toast("修改成功"),
                            setTimeout(function() {
                                window.router.setRoute("/login")
                            },
                            1e3)
                        },
                        errCb: function(t) {
                            a.a.toast("验证码校验失败")
                        }
                    }) : a.a.toast("请输入6位手机验证码")
                })
            }
            document.title = "忘记密码",
            s(".js-header-title").text("忘记密码");
            var n = s(".js-g-container"),
            e = SOHUZ.ENV || {},
            r = SOHUZ.accountUnion,
            d = !!("weixin" == e.name || "app" === e.name && parseFloat(e.version) > 1 && r.wx_appid),
            p = SOHUZ.logoUrl.length > 0 && SOHUZ.logoUrl;
            n.html().trim() ? n.animateCss("flipOutY",
            function() {
                n.animateCss("flipInY"),
                n.html(c.render(l, {
                    wx: d,
                    logoUrl: p,
                    siteNameFirstChar: SOHUZ.siteName[0]
                })),
                t()
            }) : (n.html(c.render(l, {
                wx: d,
                logoUrl: p,
                siteNameFirstChar: SOHUZ.siteName[0]
            })), n.animateCss("fadeIn"), t())
        }
    },
    DM3E: function(t, n) {
        t.exports = '<div class="js-pwd-reset-container pwd-reset" data-active=true>\n    <div class="content">\n        {{#logoUrl}}\n        <img class="logo kz-b-c-t" src="{{logoUrl}}"/>\n        {{/logoUrl}}\n        {{^logoUrl}}\n        <div class="logo kz-b-c-t">{{siteNameFirstChar}}</div>\n        {{/logoUrl}}\n        <div class="g-tbl">\n            <div class="g-tbl-tr">\n                <span class="g-text-28">手机号</span>\n                <input class="g-text-28  js-mobile-input" placeholder="请输入11位手机号码"/>\n            </div>\n            <div class="g-tbl-tr">\n                <span class="g-text-28">图片验证码</span>\n                <input class="g-text-28  js-picvcode-input input-thin" placeholder="请输入图片验证码"/>\n                <img class="js-picvcode picvcode"/>\n            </div>\n            <div class="g-tbl-tr">\n                <span class="g-text-28">短信验证码</span>\n                <input class="g-text-28 js-mobile-code-input input-thin" placeholder="请输入短信验证码"/>\n                <a class="js-send-mobile-code send-mobile-code g-text-28" data-status="inactive">发送验证码</a>\n                <span class="countdown js-countdown"></span>\n            </div>\n            <div class="g-tbl-tr">\n                <span class="g-text-28">密码设置</span>\n                <input class="g-text-28 js-pwd-input" placeholder="请输入6~20位密码"/>\n            </div>\n        </div>\n        <button class="kz-b-c-t js-confirm-reset btn g-text-28">确认</button>\n        <a class="back-to-login g-text-24 g-color-gray js-back-to-login" href="#/login">返回登录</a>\n    </div>\n</div>'
    },
    N4ry: function(t, n, e) {
        "use strict";
        var a = e("AJv8"),
        o = e("JW6E"),
        i = (e("JXW4"), e("wjAX")),
        s = e("uU/e"),
        c = e("jXZe");
        n.a = function() {
            function t() {
                i(".vcode-img").attr("src", "http://changyan.sohu.com/api/2/user/get_vcode?" + (new Date).getTime())
            }
            function n() {
                e.sourceUrl = encodeURIComponent(SOHUZ.page.callback);
                var n = encodeURIComponent("http://changyan.sohu.com/api/oauth/kclub-redirect?callback=" + e.sourceUrl),
                s = e.is_mobile ? "mobile": "pc";
                i(".js-login-wb").attr("href", "http://plus.sohu.com/spassport/bind/30000001/weibo?display=" + s + "&ru=" + n),
                i(".js-login-qq").attr("href", "http://plus.sohu.com/spassport/bind/30000001/qq?display=" + s + "&ru=" + n),
                i(".js-login-wx").attr("href", "http://plus.sohu.com/spassport/bind/40000001/weixin?display=" + s + "&ru=" + n + "&fru=" + n),
                i(".js-login-kz").on("click",
                function(t) {
                    SOHUZ.loginChannel.cy = !0,
                    window.router.setRoute("/login")
                }),
                i(".js-mobile").on("blur",
                function(t) {
                    var n = t.target.value;
                    1 === o.a.validateMobile(n).ret
                }),
                i(".js-new-pwd").on("click",
                function() {
                    if (!i(this).hasClass("sended")) {
                        var n = i(".js-mobile").val(),
                        e = o.a.validateMobile(n);
                        if (1 !== e.ret) return a.a.toast(e.msg);
                        t(),
                        i(".vcode-wrapper").show(),
                        i(".vcode-input").val("").focus()
                    }
                }),
                i(".vcode-img").on("click",
                function() {
                    t()
                }),
                i(".js-close-vcode").on("click",
                function() {
                    i(".vcode-wrapper").hide()
                }),
                i(".vcode-wrapper").on("click",
                function(t) {
                    i(t.target).hasClass("vcode-wrapper") && i(".vcode-wrapper").hide()
                }),
                i(".vcode-wrapper .js-submit").on("click",
                function() {
                    var t = i(".js-mobile").val(),
                    n = o.a.validateMobile(t);
                    if (1 !== n.ret) return a.a.toast(n.msg);
                    var e = i(".vcode-input").val();
                    if (!e || !e.trim()) return void a.a.toast("验证码不能为空");
                    var s = {
                        mobile: t,
                        vcode: e
                    };
                    i.ajax({
                        url: "http://changyan.sohu.com/api/2/user/get_passwd",
                        type: "GET",
                        dataType: "jsonp",
                        data: s,
                        success: function(t) {
                            if (t) if (0 == t.error_code) {
                                a.a.toast("密码已经发送至您的手机");
                                var n = 60,
                                e = i(".js-new-pwd");
                                e.addClass("sended").text(n + "秒后再发送");
                                var o = setInterval(function() {
                                    return n--,
                                    0 == n ? (clearInterval(o), void e.removeClass("sended").text("获取新密码")) : void e.text(n + "秒后再发送")
                                },
                                1e3);
                                i(".vcode-wrapper").hide()
                            } else 10250 == t.error_code || 10249 == t.error_code ? a.a.toast("验证码错误") : 100245 == t.error_code ? a.a.toast("一小时内过于频繁") : 100246 == t.error_code ? a.a.toast("一天内过于频繁") : a.a.toast("验证码未知异常，" + t.error_code);
                            else a.a.toast("密码发送失败")
                        },
                        error: function() {
                            a.a.toast("密码发送失败！")
                        }
                    })
                }),
                i(".js-login").on("click",
                function() {
                    var t = i(".js-mobile").val(),
                    n = i(".js-pwd").val(),
                    s = o.a.validateMobile(t);
                    return 1 !== s.ret ? a.a.toast(s.msg) : void i.ajax({
                        url: "https://changyan.sohu.com/api/2/login/phone",
                        type: "POST",
                        data: {
                            mobile: t,
                            passwd: n,
                            client_id: e.client_id
                        },
                        success: function(t) {
                            if (!t) return void a.a.toast("登录错误");
                            if (100242 == t.error_code || 100243 == t.error_code) a.a.toast("密码错误");
                            else if (10240 == t.error_code || 10247 == t.error_code) a.a.toast("手机号不合法");
                            else if (10212 == t.error_code && t.token && t.error_msg) {
                                var n = t.error_msg;
                                i.ajax({
                                    url: n,
                                    type: "GET",
                                    dataType: "jsonp",
                                    jsonp: "cb",
                                    success: function(t) {
                                        t && 0 == t.code ? window.location.href = "http://changyan.sohu.com/api/2/user/kclub-redirect?callback=" + e.sourceUrl: a.a.toast("登录失败！")
                                    }
                                })
                            } else a.a.toast("登录错误")
                        },
                        error: function() {
                            a.a.toast("登录失败")
                        }
                    })
                })
            }
            var e = this;
            i("body").svgImage(),
            document.title = "畅言登录",
            i(".js-header-title").text("畅言登录");
            var l = i(".js-g-container"),
            r = SOHUZ.cyLoginChannel,
            d = SOHUZ.cy_app_id,
            p = /micromessenger/gi.test(window.navigator.userAgent),
            u = /Android|iPad|iPhone|iPod/gi.test(window.navigator.userAgent),
            g = /KuaiZhanAndroidWrapper/gi.test(window.navigator.userAgent),
            v = /KuaiZhaniOSSite/gi.test(window.navigator.userAgent),
            m = g || v;
            e.is_weixin = p,
            e.is_mobile = u,
            e.is_kzapp = m,
            e.client_id = d;
            var b = p && r.wx,
            w = r.mobile,
            h = r.qq,
            j = r.weibo;
            w || b || h || j || (w = !0);
            var f = SOHUZ.logoUrl.length > 0 && SOHUZ.logoUrl;
            l.html().trim() ? l.animateCss("flipOutY",
            function() {
                l.animateCss("flipInY"),
                l.html(s.render(c, {
                    mobile: w,
                    wx: b,
                    logoUrl: f,
                    siteNameFirstChar: SOHUZ.siteName[0],
                    qq: h,
                    wb: j
                })),
                n()
            }) : (l.html(s.render(c, {
                mobile: w,
                wx: b,
                logoUrl: f,
                siteNameFirstChar: SOHUZ.siteName[0],
                qq: h,
                wb: j
            })), l.animateCss("fadeIn"), n())
        }
    },
    Of4B: function(t, n, e) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var a = e("AJv8"),
        o = (e("JXW4"), e("JW6E"), e("PcII")),
        i = e("SpIQ"),
        s = e("xEqj"),
        c = e("58vT"),
        l = e("YXAX"),
        r = e("N4ry"),
        d = e("wjAX"),
        p = (e("uU/e"), e("BRBf").Router);
        e.i(o.a)(d),
        window.sha1 = e("ZSmt");
        var u = window.location.hash;
        if (d(document).trigger("getPicVcode"), d("img.js-picvcode").on("error",
        function() {
            a.a.toast("验证码加载失败，请刷新后重新尝试")
        }), u || (SOHUZ.cy_app_id ? history.replaceState(void 0, void 0, "#/cy-login") : history.replaceState(void 0, void 0, "#/login")), SOHUZ.cy_app_id && (SOHUZ.loginChannel.cy = !0), SOHUZ.publicInfo) {
            var g = SOHUZ.publicInfo;
            g.shop ? (SOHUZ.siteName = g.shop.title, SOHUZ.logoUrl = g.shop.avatar) : (SOHUZ.siteName = g.site_name, SOHUZ.logoUrl = g.logo_url)
        }
        var v = {
            "/login": i.a,
            "/register": s.a,
            "/pwd-reset": c.a,
            "/quick-login": l.a,
            "/cy-login": r.a
        },
        m = p(v);
        m.init(),
        window.router = m
    },
    SpIQ: function(t, n, e) {
        "use strict";
        var a = e("AJv8"),
        o = e("JW6E"),
        i = e("JXW4"),
        s = e("wjAX"),
        c = e("uU/e"),
        l = e("UOvn");
        n.a = function() {
            function t() {
                var t = encodeURIComponent("https://passport.zhan.sohu.com/passport/sohu/third/callback?site_id=" + SOHUZ.page.site_id + "&callback=" + encodeURIComponent(SOHUZ.page.callback));
                s(".js-login-wb").attr("href", "//plus.sohu.com/spassport/bind/30000005/weibo?ru=" + t),
                s(".js-login-qq").attr("href", "//plus.sohu.com/spassport/bind/30000005/qq?ru=" + t);
                var n = "/passport/main/api/verifyCode?" + (new Date).getTime();
                s(".js-picvcode").attr("src", n),
                s(".js-picvcode").on("click",
                function(t) {
                    var n = "/passport/main/api/verifyCode?" + (new Date).getTime();
                    s(t.target).attr("src", n)
                }),
                s(".js-login-cy").on("click",
                function() {
                    window.router.setRoute("/cy-login")
                }),
                s(".js-login-wx").on("click",
                function() {
                    var t = SOHUZ.accountUnion;
                    if (window.kzsdk && t) {
                        var n = function(t) {
                            var n = document.createElement("a");
                            return n.href = t,
                            n
                        };
                        window.kzsdk.ready({
                            readyCallback: function() {
                                window.kzsdk.wxLogin({
                                    appid: t,
                                    redirect: "http://" + n(SOHUZ.page.callback).hostname + "/auth/me/app/jump-to?callback=" + encodeURIComponent(SOHUZ.page.callback)
                                })
                            },
                            errorCallback: function() {
                                console.log("sdk errorCallback")
                            }
                        })
                    } else window.location.href = "/passport/main/login/wx?site_id=" + SOHUZ.page.site_id + "&callback=" + encodeURIComponent(SOHUZ.page.callback)
                }),
                s(".js-mobile").on("blur",
                function(t) {
                    var n = t.target.value;
                    1 === o.a.validateMobile(n).ret && i.a.checkMobile({
                        data: {
                            mobile: n
                        },
                        succCb: function(t) {
                        	console.info(t);
                            t && t.exists ? t.has_password || a.a.alert("此手机号尚未设置密码", {
                                cancel: "设置密码",
                                confirm: "快捷登录",
                                confirmCb: function() {
                                    window.router.setRoute("/quick-login")
                                },
                                cancelCb: function() {
                                    window.router.setRoute("/pwd-reset")
                                }
                            }) : a.a.alert("手机号未注册", {
                                cancel: "知道了",
                                confirm: "去注册",
                                confirmCb: function() {
                                    window.router.setRoute("/register")
                                }
                            })
                        }
                    })
                }),
                s(".js-login").on("click",
                function() {
                    var t = s(".js-mobile").val(),
                    n = s(".js-pwd").val(),
                    e = o.a.validateMobile(t),
                    c = o.a.validatePwd(n);
                    return 1 !== e.ret ? a.a.toast(e.msg) : 1 !== c.ret ? a.a.toast(c.msg) : void i.a.login({
                        data: {
                        	username: t,
                            password: n,
                            site_id: SOHUZ.page.site_id,
                            callback: SOHUZ.page.callback,
                            picvcode: s(".js-picvcode-input").val()
                        },
                        succCb: function(t) {
                            var n = 0 === SOHUZ.page.callback.indexOf("https") ? "https": "http";
                            
                            console.info(t);
                            		
                           if(!t.success){
                        	   1001 === n.code ? (a.a.toast(n.msg), s(".js-picvcode").trigger("click")) : a.a.toast("您的账号或密码错误");
                           }else{
                        	   window.location.href = "/welcome";
                           } 		
                           // window.location.href = "/welcome";
                            //window.location.href = n + "://" + t.data.domain + "/auth/api/authorization?auth_token=" + t.data.auth_token + "&callback=" + encodeURIComponent(SOHUZ.page.callback) + "&site_id=" + SOHUZ.page.site_id
                        },
                        errCb: function(t) {
                            try {
                                var n = JSON.parse(t.responseText);
                                20412 === n.code ? (a.a.toast("图片验证码错误"), s(".js-picvcode").trigger("click")) : a.a.toast("您的账号或密码错误")
                            } catch(t) {
                                a.a.toast("验证失败请重新尝试")
                            }
                        }
                    })
                })
            }
            s("body").svgImage(),
            document.title = "登录",
            s(".js-header-title").text("登录");
            var n = s(".js-g-container"),
            e = SOHUZ.ENV || {},
            r = SOHUZ.accountUnion,
            d = !(!SOHUZ.loginChannel.wx || !("weixin" == e.name || "app" === e.name && parseFloat(e.version) > 1 && r)),
            p = SOHUZ.loginChannel.qq,
            u = SOHUZ.loginChannel.sina,
            g = SOHUZ.logoUrl.length > 0 && SOHUZ.logoUrl,
            v = !!SOHUZ.loginChannel.cy;
            n.html().trim() ? n.animateCss("flipOutY",
            function() {
                n.animateCss("flipInY"),
                n.html(c.render(l, {
                    wx: d,
                    logoUrl: g,
                    siteNameFirstChar: SOHUZ.siteName[0],
                    qq: p,
                    wb: u,
                    cy: v
                })),
                t()
            }) : (n.html(c.render(l, {
                wx: d,
                logoUrl: g,
                siteNameFirstChar: SOHUZ.siteName[0],
                qq: p,
                wb: u,
                cy: v
            })), n.animateCss("fadeIn"), t())
        }
    },
    UOvn: function(t, n) {
        t.exports = '<div class="js-login-container login" data-active=true>\n    <div class="content">\n        {{#logoUrl}}\n        <img class="logo kz-b-c-t" src="{{logoUrl}}"/>\n        {{/logoUrl}}\n        {{^logoUrl}}\n        <div class="logo g-font-thin kz-b-c-t">{{siteNameFirstChar}}</div>\n        {{/logoUrl}}\n        <div class="g-tbl">\n            <div class="g-tbl-tr">\n                <span class="g-text-28">手机号</span>\n                <input type="text" class="js-mobile g-text-28  js-mobile" placeholder="请输入11位手机号码"/>\n            </div>\n\n            <div class="g-tbl-tr">\n                <span class="g-text-28">登录密码</span>\n                <input type="password" class="g-text-28  js-pwd" placeholder="请输入登录密码"/>\n\n\n            </div>\n            <div class="g-tbl-tr">\n                <span class="g-text-28">验证码</span>\n                <input type="text" placeholder="请输入4位图片验证码" class="picvcode-input g-text-28 js-picvcode-input"/>\n                <image class="js-picvcode picvcode"/>\n            </div>\n        </div>\n\n        <button class="kz-b-c-t btn js-login g-text-28  js-login">登录</button>\n        <a class="g-color-blue g-text-24 to-regist js-to-register" href="#/register">注册账号></a>\n        <a class="g-color-gray g-text-24 to-reset-pwd js-to-reset-pwd" href="#/pwd-reset">忘记密码?</a>\n    </div>\n    <table class="thirdpart-login" width="95%">\n        <tr>\n            {{#wx}}\n            <td>\n                <a class="wx js-login-wx g-text-28 " href="javascript:void(0)">\n                    <i class="k-i-wechat wx icon g-text-36"></i>\n                    <span>微信登录</span>\n                </a>\n            </td>\n            {{/wx}}\n            {{#qq}}\n            <td>\n                <a class="qq js-login-qq g-text-28 svg">\n                    <i class="k-i-qq qq icon g-text-36"></i>\n                    <span>QQ登录</span>\n                </a>\n            </td>\n            {{/qq}}\n            {{#wb}}\n            <td>\n                <a class="wb js-login-wb g-text-28 svg">\n                    <i class="k-i-weibo wb icon g-text-36"></i>\n                    <span>微博登录</span>\n                </a>\n            </td>\n            {{/wb}}\n            {{#cy}}\n            <td>\n                <a class="cy js-login-cy g-text-28 svg">\n                    <i class="k-i-changyan cy icon g-text-36"></i>\n                    <span>畅言登录</span>\n                </a>\n            </td>\n            {{/cy}}\n        </tr>\n\n    </table>\n</div>\n'
    },
    YXAX: function(t, n, e) {
        "use strict";
        var a = e("AJv8"),
        o = e("JW6E"),
        i = e("wjAX"),
        s = e("uU/e"),
        c = e("aMpY");
        n.a = function() {
            function t() {
                var t = "/passport/main/api/verifyCode?" + (new Date).getTime();
                i(".js-picvcode").attr("src", t),
                i(".js-picvcode").on("click",
                function(t) {
                    var n = "/passport/main/api/verifyCode?" + (new Date).getTime();
                    i(t.target).attr("src", n)
                }),
                i(".js-send-mobile-code").on("click",
                function(t) {
                    requests.sendMobileCode({
                        data: {
                            mobile: i(".js-mobile-input").val(),
                            picvcode: i(".js-picvcode-input").val()
                        },
                        succCb: function(t) {
                            i(".js-send-mobile-code").hide(),
                            i(".js-countdown").show(),
                            a.a.countDown(i(".js-countdown"), 60, "{{count}}s后重新发送",
                            function() {
                                i(".js-countdown").animateCss("fadeOut",
                                function() {
                                    i(".js-countdown").hide(),
                                    i(".js-send-mobile-code").animateCss("fadeIn"),
                                    i(".js-send-mobile-code").show()
                                }),
                                i(".js-picvcod").trigger("click"),
                                i(".js-picvcode-input").val("")
                            })
                        },
                        errCb: function(t, n, e) {
                            try {
                                var o = JSON.parse(t.responseText);
                                a.a.toast(o.msg || "短信发送失败")
                            } catch(t) {
                                a.a.toast("短信发送失败")
                            }
                        }
                    })
                }),
                i(".js-picvcode-input").on("keyup",
                function(t) {
                    var n = t.target.value;
                    4 === n.length ? (i(".js-send-mobile-code").prop("disabled", !1), i(".js-send-mobile-code").attr("data-status", "active")) : (i(".js-send-mobile-code").prop("disabled", !0), i(".js-send-mobile-code").attr("data-status", "inactive"))
                }),
                i(".js-quick-login").on("click",
                function() {
                    var t = i(".js-mobile-input").val(),
                    n = i(".js-mobile-code-input").val(),
                    e = o.a.validateMobile(t);
                    return 1 !== e.ret ? a.a.toast(e.msg) : n && 6 === n.length ? void requests.quickLogin({
                        data: {
                            identity: t,
                            sms_code: n,
                            site_id: SOHUZ.page.site_id,
                            callback: SOHUZ.page.callback
                        },
                        succCb: function(t) {
                            window.location.href = "//" + ret.data.domain + "/auth/api/authorization?auth_token=" + ret.data.auth_token + "&callback=" + encodeURIComponent(SOHUZ.pge.callback) + "&site_id=" + SOHUZ.page.site_id
                        },
                        errCb: function(t) {
                            a.a.toast("验证码错误, 请重新输入"),
                            i(".js-picvcode").trigger("click")
                        }
                    }) : a.a.toast("请输入6位手机验证码")
                })
            }
            document.title = "快速登录",
            i(".js-header-title").text("快速登录");
            var n = i(".js-g-container"),
            e = SOHUZ.ENV || {},
            l = SOHUZ.accountUnion,
            r = !!("weixin" == e.name || "app" === e.name && parseFloat(e.version) > 1 && l.wx_appid),
            d = SOHUZ.logoUrl.length > 0 && SOHUZ.logoUrl;
            n.html().trim() ? n.animateCss("flipOutY",
            function() {
                n.animateCss("flipInY"),
                n.html(s.render(c, {
                    wx: r,
                    logoUrl: d,
                    siteNameFirstChar: SOHUZ.siteName[0]
                })),
                t()
            }) : (n.html(s.render(c, {
                wx: r,
                logoUrl: d,
                siteNameFirstChar: SOHUZ.siteName[0]
            })), n.animateCss("fadeIn"), t())
        }
    },
    aGAJ: function(t, n) {
        t.exports = '<div class="js-register-container register" data-active=true>\n    <div class="content">\n        {{#logoUrl}}\n        <img class="logo kz-b-c-t" src="{{logoUrl}}"/>\n        {{/logoUrl}}\n        {{^logoUrl}}\n        <div class="logo kz-b-c-t">{{siteNameFirstChar}}</div>\n        {{/logoUrl}}\n        <div class="g-tbl">\n            <div class="g-tbl-tr">\n                <span class="g-text-28">手机号</span>\n                <input class="g-text-28 g-font-thin js-mobile-input" placeholder="请输入11位手机号"/>\n            </div>\n            <div class="g-tbl-tr">\n                <span class="g-text-28">图片验证码</span>\n                <input class="g-text-28 g-font-thin js-picvcode-input input-thin" placeholder="请输入图片验证码"/>\n                <img class="js-picvcode picvcode"/>\n            </div>\n            <div class="g-tbl-tr">\n                <span class="g-text-28">短信验证码</span>\n                <input class="g-text-28 g-font-thin js-mobile-code-input input-thin" placeholder="请输入短信验证码"/>\n                <a class="js-send-mobile-code send-mobile-code g-text-28" data-status="inactive">发送验证码</a>\n                <span class="countdown js-countdown"></span>\n            </div>\n            <div class="g-tbl-tr">\n                <span class="g-text-28">密码设置</span>\n                <input class="g-text-28 g-font-thin js-pwd-input" placeholder="请输入6~20位密码"/>\n            </div>\n        </div>\n        <button class="kz-b-c-t js-register btn g-text-28">注册</button>\n        <a class="back-to-login g-text-24 g-color-gray js-back-to-login" href="#/login">返回登录</a>\n    </div>\n</div>'
    },
    aMpY: function(t, n) {
        t.exports = '<div class="js-register-container quick-login" data-active=true>\n    <div class="content">\n        {{#logoUrl}}\n        <img class="logo kz-b-c-t" src="{{logoUrl}}"/>\n        {{/logoUrl}}\n        {{^logoUrl}}\n        <div class="logo kz-b-c-t">{{siteNameFirstChar}}</div>\n        {{/logoUrl}}\n        <div class="g-tbl">\n            <div class="g-tbl-tr">\n                <span class="g-text-28">手机号</span>\n                <input class="g-text-28  js-mobile-input" placeholder="请输入11位手机号吧"/>\n            </div>\n            <div class="g-tbl-tr">\n                <span class="g-text-28">图片验证码</span>\n                <input class="g-text-28  js-picvcode-input input-thin" placeholder="请输入图片验证码"/>\n                <img class="js-picvcode picvcode"/>\n            </div>\n            <div class="g-tbl-tr">\n                <span class="g-text-28">短信验证码</span>\n                <input class="g-text-28  js-mobile-code-input input-thin" placeholder="请输入短信验证码"/>\n                <button class="js-send-mobile-code send-mobile-code g-text-28" data-status="inactive" disabled>发送验证码</button>\n                <span class="countdown js-countdown"></span>\n            </div>\n        </div>\n        <button class="kz-b-c-t js-quick-login btn g-text-28">登录</button>\n    </div>\n</div>'
    },
    jXZe: function(t, n) {
        t.exports = '<div class="js-login-container cy-login" data-active=true>\n    <div class="content">\n        {{#logoUrl}}\n        <img class="logo kz-b-c-t" src="{{logoUrl}}"/>\n        {{/logoUrl}}\n        {{^logoUrl}}\n        <div class="logo g-font-thin kz-b-c-t">{{siteNameFirstChar}}</div>\n        {{/logoUrl}}\n\n        {{#mobile}}\n        <div class="g-tbl">\n            <div class="g-tbl-tr">\n                <span class="g-text-28">手机号</span>\n                <input type="text" class="js-mobile g-text-28  js-mobile" placeholder="请输入11位手机号码"/>\n            </div>\n\n            <div class="g-tbl-tr">\n                <span class="g-text-28">登录密码</span>\n                <input type="password" class="g-text-28 short js-pwd" placeholder="请输入登录密码"/>\n                <a href="javascript:void(0)" class="new-pwd js-new-pwd g-text-28">获取新密码</a>\n            </div>\n        </div>\n\n        <button class="kz-b-c-t btn js-login g-text-28  js-login">使用畅言账号登录</button>\n        {{/mobile}}\n    </div>\n    <table class="thirdpart-login">\n        <tr>\n            {{#wx}}\n            <td>\n                <a class="wx js-login-wx g-text-28 " href="javascript:void(0)">\n                    <i class="k-i-wechat wx icon g-text-36"></i>\n                    <span>微信登录</span>\n                </a>\n            </td>\n            {{/wx}}\n            {{#qq}}\n            <td>\n                <a class="qq js-login-qq g-text-28 svg">\n                    <i class="k-i-qq qq icon g-text-36"></i>\n                    <span>QQ登录</span>\n                </a>\n            </td>\n            {{/qq}}\n            {{#wb}}\n            <td>\n                <a class="wb js-login-wb g-text-28 svg">\n                    <i class="k-i-weibo wb icon g-text-36"></i>\n                    <span>微博登录</span>\n                </a>\n            </td>\n            {{/wb}}\n            <td>\n                <a class="kz js-login-kz g-text-28 svg">\n                    <i class="k-i-kuaizhan kz icon g-text-36"></i>\n                    <span>快站登录</span>\n                </a>\n            </td>\n        </tr>\n\n    </table>\n    <div class="vcode-wrapper g-text-32" style="display:none">\n        <div class="js-vcode">\n            <div class="tips">请输入图片验证码<a class="js-close-vcode" href="javascript:void(0)"></a></div>\n            <div class="vcode-line">\n                <input class="vcode-input" type="text" placeholder="验证码"/>\n                <img src="" class="vcode-img"/>\n            </div>\n            <a class="js-submit kz-b-c-t" href="javascript:void(0)">确 定</a>\n        </div>\n    </div>\n</div>'
    },
    xEqj: function(t, n, e) {
        "use strict";
        var a = e("AJv8"),
        o = e("JW6E"),
        i = e("JXW4"),
        s = e("wjAX"),
        c = e("uU/e"),
        l = e("aGAJ");
        n.a = function() {
            function t() {
                var t = !0,
      
                n = "/passport/main/api/verifyCode?" + (new Date).getTime();
                alert(t);
                s(".js-picvcode").attr("src", n),
                s(".js-picvcode").on("click",
                function(t) {
                    var n = "/passport/main/api/verifyCode?" + (new Date).getTime();
                    s(t.target).attr("src", n)
                }),
                s(".js-mobile-input").on("blur",
                function(n) {
                    var e = n.target.value;
                    1 === o.a.validateMobile(e).ret && i.a.checkMobile({
                        data: {
                            mobile: e
                        },
                        succCb: function(n) {
                            n.exists && !n.has_password ? a.a.alert("此手机号尚未设置密码", {
                                cancel: "设置密码",
                                confirm: "快捷登录",
                                confirmCb: function() {
                                    window.router.setRoute("/quick-login")
                                },
                                cancelCb: function() {
                                    window.router.setRoute("/pwd-reset")
                                }
                            }) : n.exists ? a.a.alert("手机已注册", {
                                cancel: "知道了",
                                confirm: "去登录",
                                confirmCb: function() {
                                    window.router.setRoute("/login")
                                }
                            }) : t = !1
                        }
                    })
                }),
                s(".js-picvcode-input").on("keyup",
                function(t) {
                    var n = t.target.value;
                    4 === n.length ? (s(".js-send-mobile-code").prop("disabled", !1), s(".js-send-mobile-code").attr("data-status", "active")) : (s(".js-send-mobile-code").prop("disabled", !0), s(".js-send-mobile-code").attr("data-status", "inactive"))
                }),
                s(".js-send-mobile-code").on("click",
                function(n) {
                	console.info(t);
                    return t ? void a.a.alert("手机已注册", {
                        cancel: "知道了",
                        confirm: "去登录",
                        confirmCb: function() {
                            window.router.setRoute("/login")
                        }
                    }) : void i.a.sendMobileCode({
                        data: {
                            mobile: s(".js-mobile-input").val(),
                            picvcode: s(".js-picvcode-input").val()
                        },
                        succCb: function(t) {
                            s(".js-send-mobile-code").hide(),
                            s(".js-countdown").show(),
                            a.a.countDown(s(".js-countdown"), 60, "{{count}}s后重新发送",
                            function() {
                                s(".js-countdown").animateCss("fadeOut",
                                function() {
                                    s(".js-countdown").hide(),
                                    s(".js-send-mobile-code").animateCss("fadeIn"),
                                    s(".js-send-mobile-code").show()
                                }),
                                s(".js-picvcod").trigger("click"),
                                s(".js-picvcode-input").val("")
                            })
                        },
                        errCb: function(t, n, e) {
                            try {
                                var o = JSON.parse(t.responseText);
                                a.a.toast(o.msg || "短信发送失败")
                            } catch(t) {
                                a.a.toast("短信发送失败")
                            }
                        }
                    })
                }),
                s(".js-register").on("click",
                function() {
                    var t = s(".js-mobile-input").val(),
                    n = s(".js-mobile-code-input").val(),
                    e = s(".js-pwd-input").val(),
                    c = o.a.validateMobile(t);
                    if (1 !== c.ret) return a.a.toast(c.msg);
                    if (!n || 6 !== n.length) return a.a.toast("请输入6位手机验证码");
                    var l = o.a.validatePwd(e);
                    return 1 !== l.ret ? a.a.toast(l.msg) : void i.a.regist({
                        data: {
                            phone: t,
                            sms_code: n,
                            site_id: SOHUZ.page.site_id,
                            callback: SOHUZ.page.callback,
                            password: e
                        },
                        succCb: function(t) {
                           // window.location.href = "/passport/main/complete?site_id=" + t.data.site_id + "&callback=" + encodeURIComponent(SOHUZ.page.callback)
                        	window.location.href="/list";
                        },
                        errCb: function(t) {
                            try {
                                var n = JSON.parse(ret.responseText);
                                20103 == n.code ? a.a.toast("密码格式错误") : a.a.toast("验证码错误, 请重新输入")
                            } catch(t) {
                                a.a.toast("验证错误, 请重新尝试")
                            }
                        }
                    })
                })
            }
            document.title = "注册",
            s(".js-header-title").text("注册");
            var n = s(".js-g-container"),
            e = SOHUZ.ENV || {},
            r = SOHUZ.accountUnion,
            d = !!("weixin" == e.name || "app" === e.name && parseFloat(e.version) > 1 && r.wx_appid),
            p = SOHUZ.logoUrl.length > 0 && SOHUZ.logoUrl;
            n.html().trim() ? n.animateCss("flipOutY",
            function() {
                n.animateCss("flipInY"),
                n.html(c.render(l, {
                    wx: d,
                    logoUrl: p,
                    siteNameFirstChar: SOHUZ.siteName[0]
                })),
                t()
            }) : (n.html(c.render(l, {
                wx: d,
                logoUrl: p,
                siteNameFirstChar: SOHUZ.siteName[0]
            })), n.animateCss("fadeIn"), t())
        }
    }
},
["Of4B"]);