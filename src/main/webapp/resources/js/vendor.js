webpackJsonp([10], {
    AJv8: function(n, t, a) {
        "use strict";
        var e = a("PcII"),
        s = a("wjAX"),
        i = a("uU/e");
        a.i(e.a)(s);
        var r = {};
        r.toast = function(n, t) {
            arguments[1] || (t = 3);
            var a = '<div class="ui js-ui"><div class="toast">{{msg}}</div></div>',
            e = s(i.render(a, {
                msg: n
            }));
            s("body").append(e),
            e.animateCss("fadeIn"),
            setTimeout(function() {
                e.animateCss("fadeOut",
                function() {
                    e.remove()
                })
            },
            2500)
        },
        r.alert = function(n, t) {
            t = t || {};
            var a = '\n        <div class="ui">\n            <div class="alert content">\n            <div class="title">{{ title }}</div>\n            <div class="choice">\n            {{#cancel}}\n                <span class="cancel js-cancel btn">{{ cancel }}</span>\n            {{/cancel}}\n            {{#confirm}}\n                <span class="confirm js-confirm btn">{{ confirm }}</span>\n            {{/confirm}}\n        </div>\n        </div>\n            <div class="backdrop js-backdrop"></div>\n        </div>',
            e = s(i.render(a, {
                title: n || "",
                cancel: t.cancel = t.cancel || "",
                confirm: t.confirm = t.confirm || "确定"
            }));
            e.appendTo("body").animateCss("fadeIn"),
            e.on("click", ".js-cancel",
            function() {
                t.cancelCb ? t.cancelCb(e) : e.animateCss("fadeOut",
                function() {
                    e.remove()
                })
            }),
            e.on("click", ".js-confirm",
            function() {
                e.animateCss("fadeOut",
                function() {
                    e.remove()
                }),
                t.confirmCb && t.confirmCb(e)
            }),
            e.on("click", ".js-backdrop",
            function() {
                t.backdropCb ? t.backdropCb(e) : e.animateCss("fadeOut",
                function() {
                    e.remove()
                })
            })
        },
        r.countDown = function(n, t, a, e) {
            function s() {
                n.html(i.render(a, {
                    count: t
                })),
                t--,
                t > 0 ? setTimeout(s, 1e3) : e && e()
            }
            s()
        },
        t.a = r
    },
    JW6E: function(n, t, a) {
        "use strict";
        var e = a("AJv8"),
        s = a("7zg6"),
        i = a("wjAX");
        t.a = {
            getUrlParam: function(n, t) {
                var a = n || document.location.href,
                e = a.indexOf(t + "=");
                if (e == -1) return ! 1;
                var s = a.slice(t.length + e + 1),
                i = s.indexOf("&");
                return i != -1 && (s = s.slice(0, i)),
                s
            },
            validateMobile: function(n) {
                var t = /^(1\d{10})$/;
                return t.test(n) ? {
                    ret: 1
                }: 11 !== n.length ? {
                    ret: -1,
                    msg: "长度不正确"
                }: {
                    ret: -2,
                    msg: "非法字符"
                }
            },
            validatePwd: function(n) {
                return n.length < 6 ? {
                    ret: -1,
                    msg: "密码过短, 请输入6~20位密码"
                }: n.length > 20 ? {
                    ret: -2,
                    msg: "密码过长, 请输入6~20位密码"
                }: /^[0-9a-zA-Z-_\~!@#\$%\^&\*\.\(\)\[\]\{\}<>\?\\\/\'\"\+=:;]{6,20}$/.test(n) ? {
                    ret: 1
                }: {
                    ret: -3,
                    msg: "密码含有非法字符"
                }
            },
            validateNick: function(n) {
                if (!n) return {
                    ret: -1,
                    msg: "昵称不能为空"
                };
                var t = n.replace(/[\u4e00-\u9fa5]/g, "**");
                return t.length <= 20 ? {
                    ret: 1
                }: t.length > 20 ? {
                    ret: -2,
                    msg: "昵称过长"
                }: {
                    ret: -3,
                    msg: "含有非法字符串"
                }
            },
            validateEmail: function(n) {
                if (!n) return {
                    ret: -1,
                    msg: "邮件不能为空"
                };
                var t = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.|\-]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
                return t.test(n) ? {
                    ret: 1
                }: {
                    ret: -2,
                    msg: "邮件格式错误"
                }
            },
            validatePhoneCode: function(n) {
                var t = /^[1-9][0-9]{5}$/;
                return t.test(n) ? {
                    ret: 1
                }: {
                    ret: -1,
                    msg: "code错误"
                }
            },
            validateSignature: function(n) {
                var t = n.replace(/[\u4e00-\u9fa5]/g, "**");
                return t.length <= 40 ? {
                    ret: 1
                }: {
                    ret: -1,
                    msg: "签名过长"
                }
            },
            getHostname: function(n) {
                var t = n;
                0 != t.indexOf("http") && 0 != t.indexOf("https") && (t = "https://" + t);
                var a = document.createElement("a");
                return a.href = t,
                0 == a.hostname.search("club.") ? a.hostname.slice(5) : a.hostname
            },
            ExifImage: function(n, t, a) {
                s.getData(t,
                function() {
                    var s = this.exifdata.Orientation,
                    r = new Image;
                    r.onload = function() {
                        var n = r.width,
                        e = r.height,
                        c = n / e,
                        o = i("<canvas></canvas>"),
                        d = o[0].getContext("2d");
                        n > e ? (n = n < 640 ? n: 640, e = parseInt(n / c)) : (e = e < 640 ? e: 640, n = parseInt(e * c)),
                        6 == s ? (o.attr({
                            width: e,
                            height: n
                        }), d.rotate(.5 * Math.PI), d.translate(0, -e)) : 8 == s ? (o.attr({
                            width: e,
                            height: n
                        }), d.rotate( - .5 * Math.PI), d.translate( - n, 0)) : 3 == s ? (o.attr({
                            width: n,
                            height: e
                        }), d.rotate(Math.PI), d.translate( - n, -e)) : o.attr({
                            width: n,
                            height: e
                        }),
                        /AppleWebKit/gi.test(window.navigator.userAgent) && /OS\s[4|5|6|7]_/gi.test(window.navigator.userAgent) ? !
                        function() {
                            var t = function(n) {
                                var t = (n.naturalWidth, n.naturalHeight),
                                a = document.createElement("canvas");
                                a.width = 1,
                                a.height = t;
                                var e = a.getContext("2d");
                                e.drawImage(n, 0, 0);
                                for (var s = e.getImageData(0, 0, 1, t).data, i = 0, r = t, c = t; c > i;) {
                                    var o = s[4 * (c - 1) + 3];
                                    0 === o ? r = c: i = c,
                                    c = r + i >> 1
                                }
                                var d = c / t;
                                return 0 === d ? 1 : d
                            },
                            a = function(n, a, e, s, i, r, c, o, d, u) {
                                var l = t(a);
                                n.drawImage(a, e * l, s * l, i * l, r * l, c, o, d, u)
                            };
                            a(d, r, 0, 0, r.width, r.height, 0, 0, n, e)
                        } () : d.drawImage(r, 0, 0, n, e);
                        var u = o[0].toDataURL("image/jpeg", .5);
                        a(t, u)
                    },
                    r.onerror = function() {
                        i(".ui-toast").hide(),
                        e.a.toast("上传失败", 2, "170px")
                    },
                    r.src = n
                })
            }
        }
    },
    JXW4: function(n, t, a) {
        "use strict";
        var e = a("wjAX"),
        s = {
            checkMobile: function(n) {
                e.ajax({
                    url: "/passport/main/api/mobileCheck",
                    type: "GET",
                    data: n.data,
                    success: n.succCb ||
                    function() {},
                    error: n.errCb ||
                    function() {}
                })
            },
            login: function(n) {
                e.ajax({
                    url: "/login",
                    type: "POST",
                    data: n.data,
                    success: n.succCb ||
                    function() {},
                    error: n.errCb ||
                    function() {}
                })
            },
            sendMobileCode: function(n) {
                e.ajax({
                    url: "/passport/main/api/sms",
                    type: "POST",
                    data: n.data,
                    success: n.succCb ||
                    function() {},
                    error: n.errCb ||
                    function() {}
                })
            },
            regist: function(n) {
            	alert("xx");
            	console.info(n.data);
                e.ajax({
                    url: "/passport/main/api/register",
                	//url: "register",
                    type: "POST",
                    data: n.data,
                    success: n.succCb ||
                    function() {},
                    error: n.errCb ||
                    function() {}
                })
            },
            quickLogin: function(n) {
                e.ajax({
                    url: "/passport/main/api/login/sms",
                    type: "POST",
                    data: n.data,
                    success: n.succCb ||
                    function() {},
                    error: n.errCb ||
                    function() {}
                })
            },
            b64Upload: function(n) {
                e.ajax({
                    url: "/auth/api/b64upload",
                    type: "POST",
                    data: n.data,
                    dataType: "json",
                    processData: !1,
                    contentType: !1,
                    success: n.succCb ||
                    function() {},
                    error: n.errCb ||
                    function() {}
                })
            },
            bindMobile: function(n) {
                e.ajax({
                    url: "/auth/api/users/me/mobile",
                    type: "POST",
                    data: n.data,
                    dataType: "json",
                    success: n.succCb ||
                    function() {},
                    error: n.errCb ||
                    function() {}
                })
            },
            modify: function(n) {
                e.ajax({
                    url: "/auth/api/users/me",
                    type: "POST",
                    data: n.data,
                    dataType: "json",
                    success: n.succCb ||
                    function() {},
                    error: n.errCb ||
                    function() {}
                })
            },
            complete: function(n) {
                e.ajax({
                    url: "/main/api/users/me",
                    type: "POST",
                    data: n.data,
                    dataType: "json",
                    success: n.succCb ||
                    function() {},
                    error: n.errCb ||
                    function() {}
                })
            },
            completeConfirm: function(n) {
                e.ajax({
                    url: "/passport/main/api/confirm",
                    type: "POST",
                    data: n.data,
                    dataType: "json",
                    success: n.succCb ||
                    function() {},
                    error: n.errCb ||
                    function() {}
                })
            },
            pwdReset: function(n) {
                e.ajax({
                    url: "/passport/main/api/pwd_reset",
                    type: "POST",
                    data: n.data,
                    dataType: "json",
                    success: n.succCb ||
                    function() {},
                    error: n.errCb ||
                    function() {}
                })
            }
        };
        t.a = s
    },
    "M/jx": function(n, t, a) {
        "use strict";
        function e() {}
        var s = a("wjAX"),
        i = a("uU/e"),
        r = '\n    {{#floatLayer}}\n    <div class="consonant-header float-layer">\n    {{/floatLayer}}\n    {{^floatLayer}}\n    <div class="consonant-header">\n    {{/floatLayer}}\n        <a class="back">\n            <svg class="icon" height="24" viewBox="0 0 24 24" width="24" xmlns="//www.w3.org/2000/svg">\n                <path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"/>\n                <path d="M0-.5h24v24H0z" fill="none"/>\n            </svg>\n            <img class="site-img" src="{{imgSrc}}"/>\n        </a>\n        <img src="">\n        <span class="title g-text-32">{{title}}</span>\n        {{#search}}\n            <input class="js-search-input search-input"/>\n            <i class="search g-text-32"></i>\n        {{/search}}\n        <a class="sidebar-switch js-sidebar-switch">\n            <svg class="icon" height="24" viewBox="0 0 24 24" width="24" xmlns="//www.w3.org/2000/svg">\n                <path d="M2 15.5v2h20v-2H2zm0-5v2h20v-2H2zm0-5v2h20v-2H2z"/>\n                <path d="M0 0h24v24H0z" fill="none"/>\n            </svg>\n        </a>\n    </div>\n    <div class="sidebar js-sidebar">\n        <div class="top">\n            <div class="content">\n                <img class="avatar" src="{{user.avatar.mid}}" />\n                <div class="user-info">\n                <div class="info-top g-text-28">{{user.nick}}</div>\n                <div class="info-bottom">\n                    <span class="g-text-24">{{user.sex}}</span>\n                    <span class="g-text-24">{{user.age}}岁</span>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class="link-list">\n        {{#links}}\n            <a class="link" href="{{url}}">\n                {{#svg}}\n                    {{& svg}}\n                {{/svg}}\n                <span class="g-text-28">{{name}}</span>\n            </a>\n        {{/links}}\n        </div>\n    </div>\n    <div class="backdrop js-backdrop"></div>\n',
        c = [{
            url: "/",
            name: "首页",
            svg: '\n        <svg height="24" viewBox="0 0 24 24" width="24" xmlns="//www.w3.org/2000/svg">\n            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>\n            <path d="M0 0h24v24H0z" fill="none"/>\n        </svg>'
        },
        {
            url: "/clubv2/me/notices",
            name: "提醒",
            svg: '\n        <svg height="24" viewBox="0 0 24 24" width="24" xmlns="//www.w3.org/2000/svg">\n            <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>\n        </svg>'
        }];
        e.prototype.render = function(n) {
            var t = n.el,
            a = n.search || !1;
            t ? (this.$el = s(t), s(t).addClass("mod-consonant-header-container")) : (this.$el = s('<div class="mod-consonant-header-container"></div>'), s("body").append(this.$el));
            var e = n.links ? n.links: c;
            n.user && (n.user.sex = "M" === n.user.sex ? "男生": "女生"),
            this.$el.html(i.render(r, {
                search: a,
                links: e,
                title: n.title || "",
                user: n.user,
                floatLayer: n.floatLayer || !1
            }))
        },
        e.prototype.bindEvents = function(n) {
            var t = this;
            n.searchCb && this.$el.find(".js-search").on("click",
            function() {
                n.searchCb()
            }),
            t.$el.find(".js-sidebar-switch").on("click",
            function() {
                setTimeout(function() {
                    t.$el.find(".js-sidebar").removeClass("fadeInRight")
                },
                600),
                t.$el.find(".js-sidebar").addClass("fadeInRight").show(),
                t.$el.find(".js-backdrop").show()
            }),
            t.$el.find(".js-backdrop").on("click",
            function() {
                setTimeout(function() {
                    t.$el.find(".js-backdrop").hide(),
                    t.$el.find(".js-sidebar").hide().removeClass("fadeOutRight")
                },
                600),
                t.$el.find(".js-sidebar").addClass("fadeOutRight")
            })
        }
    },
    PcII: function(n, t, a) {
        "use strict";
        function e(n) {
            n.extend(n.fn, {
                animateCss: function(t, a) {
                    var e = "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";
                    return n(this).addClass("animated " + t).one(e,
                    function() {
                        a && a(),
                        n(this).removeClass("animated " + t)
                    }),
                    n(this)
                },
                exclusiveAjax: function(t) {
                    n.ajax(t)
                },
                svgImage: function() {
                    n(this).find("img.svg").each(function() {
                        var t = n(this),
                        a = t.attr("id"),
                        e = t.attr("class"),
                        s = t.attr("src");
                        n.get(s,
                        function(s) {
                            var i = n(s).find("svg");
                            "undefined" != typeof a && (i = i.attr("id", a)),
                            "undefined" != typeof e && (i = i.attr("class", e + " replaced-svg")),
                            i = i.removeAttr("xmlns:a"),
                            t.replaceWith(i)
                        },
                        "xml")
                    })
                }
            })
        }
        t.a = e
    }
});