"use strict";

function clickHandler(a) {
    fdc("click", a.currentTarget.dataset.trackingSection.trim(), {
        id: a.currentTarget.dataset.trackingId.trim()
    })
}
var jQuery = jQuery || {},
    $ = $ || jQuery,
    fdc = function(a, b, c) {
        c = c || {};
        var d = function(a) {
            var b = "?";
            for (var c in a) b += c + "=" + a[c] + "&";
            return b
        };
        return function(a) {
            new Image().src = a
        }(function() {
            return c.timestamp = Date.now(), c.platform = "webcms", c.version = "0.0.1", c.url = window.location || "", b && (c.value = b), fdc.landingpagePath && (c.landingpagePath = fdc.landingpagePath), fdc.displayId && (c.displayId = fdc.displayId), fdc.api + a + "/" + d(c)
        }()), !0
    };
fdc.generateUUID = function() {
    var a = new Date().getTime();
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(b) {
        var c = 0 | (a + 16 * Math.random()) % 16;
        return a = Math.floor(a / 16), ("x" === b ? c : 8 | 7 & c).toString(16)
    })
}, fdc.getCookie = function(a) {
    for (var e, b = a + "=", c = document.cookie.split(";"), d = 0; d < c.length; d++)
        if (e = $.trim(c[d]), 0 === e.indexOf(b)) return e.substring(b.length, e.length);
    return ""
}, fdc.setCookie = function(a, b) {
    var c = new Date;
    c.setYear(2040);
    var d = ";expires=" + c.toGMTString() + ";path=/;";
    document.cookie = a + "=" + b + d
}, fdc.getErrors = function(a) {
    var b = [];
    return a.each(function() {
        b.push(this.name)
    }), b
}, fdc.getLandingpagePath = function() {
    var a = $("#breadcrumbs a").attr("href");
    return a ? a.split("engelvoelkers.com")[1] : ""
}, fdc.getDisplayID = function() {
    var a = $(".displayId li");
    return a ? a.text() : ""
}, fdc.trackPerformance = function() {
    var a = window.performance;
    if (void 0 !== a) {
        var b = a.timing;
        b.navigationType = a.navigation.type, b.referrer = document.referrer, fdc("pageLoadPerformance", fdc.page, b)
    }
}, fdc.trackLocationChange = function() {
    var a = Date.now();
    $(window).on("beforeunload", function() {
        var b = Date.now() - a;
        fdc("locationChange", b)
    })
}, fdc.pageIdentifier = function(a) {
    fdc.page = a
}, fdc.presentation = function(a) {
    fdc.pres = a
}, fdc.trackScrolling = function(a) {
    a = $.extend({}, {
        minHeight: 0,
        elements: []
    }, a);
    var c = $(window),
        d = $(document).height(),
        e = [],
        f = {},
        g = d - c.height();
    ! function() {
        if (!(d < a.minHeight || 0 >= g)) {
            var b = [{
                    mark: "0.25",
                    value: parseInt(.25 * g, 10)
                }, {
                    mark: "0.50",
                    value: parseInt(.5 * g, 10)
                }, {
                    mark: "0.75",
                    value: parseInt(.75 * g, 10)
                }, {
                    mark: "1.0",
                    value: parseInt(1 * g - 10, 10)
                }],
                h = 0,
                i = function() {
                    h < b.length - 1 && (h += 1)
                },
                j = function() {
                    if (e.length === b.length) return void c.off("scroll.scrollDepth");
                    var d = c.scrollTop(),
                        g = b[h];
                    d >= g.value && (e.push(g), fdc("pageScroll", g.mark), i()), $.each(a.elements, function(a, b) {
                        if (void 0 === f[b]) {
                            var d = $("#" + b),
                                e = d.offset().top + d.height();
                            c.scrollTop() + c.height() >= e && (fdc("elementViewed", b), f[b] = !0)
                        }
                    })
                };
            c.on("scroll.scrollDepth", fdc.throttle(j, 100))
        }
    }()
}, fdc.trackWidgetClick = function() {
    $(".teaser").each(function() {
        var b = $(this).children("h2").text();
        $(this).find("a").on("click", function() {
            fdc("widgetClick", b)
        })
    })
}, fdc.trackNewsletterSubmit = function() {
    $("#newsletter-send").click(function() {
        fdc("newsletterRegistrationSubmit")
    })
}, fdc.trackContactForm = function() {
    var a = $("#contact form"),
        b = a.find("input.error");
    a.submit(function() {
        fdc("contactFormSubmit")
    }), 0 < b.length && fdc("contactFormSubmitError", fdc.getErrors(b).toString()), $("div.contact-link a").click(function() {
        fdc("contactFormView")
    })
}, fdc.trackBlogrollClick = function() {
    $(".recent-article").each(function() {
        var b = $(this).find("h2 a").text();
        $(this).find("a").on("click", function() {
            fdc("blogentryClick", b)
        })
    })
}, fdc.sendSearch = function(a) {
    return function() {
        var b = $("input[name=q]").val();
        fdc("search", b, {
            source: a
        })
    }
}, fdc.trackSearch = function() {
    $("#small-search-form").submit(fdc.sendSearch("header-search-form")), $("#searchform").submit(fdc.sendSearch("header-search-form")), $("#res_criteria input[type=\"submit\"]").click(fdc.sendSearch("iframe-search-form")), $("#leadsearchform input[type=\"submit\"]").click(fdc.sendSearch("lead-search-form"))
}, fdc.trackAcquisitionForm = function() {
    var a = $("#offer-form:visible");
    if (0 !== a.length) {
        var b = a.find("input"),
            c = a.find("input.error");
        return 0 < c.length ? void fdc("acquisitionError", fdc.getErrors(c).toString()) : 0 === b.length ? void fdc("acquisitionSuccess") : void fdc("acquisitionView")
    }
}, fdc.beforeSafe = function(a, b) {
    return function() {
        try {
            a.apply(this, arguments)
        } catch (a) {}
        return b.apply(this, arguments)
    }
}, fdc.trackHRApplyForm = function() {
    var a = $("#hr_apply_form");
    if (a.length) {
        fdc("hrApplyView");
        var b = null,
            c = function() {
                return setInterval(function() {
                    var c = a.find("input.error");
                    0 < c.length && (fdc("hrApplyError", fdc.getErrors(c).toString()), clearInterval(b))
                }, 500)
            };
        a.find("#career_submit_form").click(function() {
            b = c()
        })
    }
}, fdc.hrApplySuccess = function() {
    fdc("hrApplySuccess")
}, fdc.trackPhoneCall = function() {
    $(".js-phone").click(function() {
        fdc("phoneCall")
    })
}, fdc.trackClick = function() {
    $("[data-tracking-section]").click(clickHandler)
}, fdc.throttle = function(a, b) {
    var c, d, e, f = null,
        g = 0,
        h = function() {
            g = new Date, f = null, e = a.apply(c, d)
        };
    return function() {
        var i = new Date;
        g || (g = i);
        var j = b - (i - g);
        return c = this, d = arguments, 0 >= j ? (clearTimeout(f), f = null, g = i, e = a.apply(c, d)) : f || (f = setTimeout(h, j)), e
    }
}, $(document).ready(function() {
    if (fdc.trackClick(), MutationObserver) {
        var a = new MutationObserver(function(a) {
            a.forEach(function(a) {
                "childList" === a.type && a.addedNodes && a.addedNodes.forEach(function(a) {
                    $(a).attr("data-tracking-section") && $(a).click(clickHandler), $(a).find("[data-tracking-section]").click(clickHandler)
                })
            })
        });
        a.observe(document.body, {
            subtree: !0,
            attributes: !0,
            childList: !0
        })
    }
    var c = fdc.getCookie("nbu");
    void 0 !== c && "" !== c || (c = fdc.generateUUID(), fdc.setCookie("nbu", c), fdc.userUUID = c), fdc.page = "", fdc.landingpagePath = fdc.getLandingpagePath(), fdc.displayId = fdc.getDisplayID(), fdc.api = "/inline/api/nbandits/api/evts/", fdc("pageView", window.location || ""), fdc.trackLocationChange(), setTimeout(function() {
        fdc.trackScrolling(), fdc.trackWidgetClick(), fdc.trackNewsletterSubmit(), fdc.trackContactForm(), fdc.trackBlogrollClick(), fdc.trackSearch(), fdc.trackAcquisitionForm(), fdc.trackHRApplyForm(), fdc.trackPhoneCall()
    }, 200)
});