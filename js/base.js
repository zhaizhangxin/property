//弹窗关闭
function dialogClose(objDialog, obj, time) { 
    if (time != undefined) {
        setTimeout(function () {
            $(".filter").hide();
            objDialog.hide();
            $("html,body").removeAttr('style');
        }, time);
    } else {
        obj.bind('mousedown', function () {
            $(".form-error").hide();
            $(".filter").hide();
            objDialog.hide();
            $("html,body").css({
                "height":$("document").height(),
                "overflow-y":"scroll"
            });
            $(".footer").show();
            $(".header-index").show();
        });
    }
}


//弹框打开
function dialogOpen(obj, objDialog) {
    obj.bind('mousedown', function () {
        var dialog_filter = $(".filter");
        objDialog.siblings('.dialog').hide();
        var fBodyHeight = $(window).height();
        var fWindowHeight = $('body').height();
        var fHeight = (fBodyHeight - fWindowHeight >= 0) ? fBodyHeight : fWindowHeight;

        objDialog.show();
        dialog_filter.css({
            width: $(window).width(),
            height: fHeight,
            background: "#000000",
            "opacity": "0.5",
            "filter": "alpha(opacity=50)",
            "position": "fixed",
            display: "block"
        });

        objDialog.css({
            left: ($(window).width() - objDialog.width()) / 2,
            top: ($(window).height() - objDialog.outerHeight()) / 2 + $(window).scrollTop(),
            display: "block"
        });
        if ($('.sort-success').length > 0 && objDialog.index() == 3) {
            //lineWaitting();
            var sCount = objDialog.find('.ds-bottom').find('.s-count');
            var j = 28;
            sCount.html(j);
            l = window.setInterval(function () {
                j++;
                sCount.html(j);

            }, 3000);
        } else if ($('.year-success').length > 0 && objDialog.index() == 5) {
            //lineWaitting(objDialog.find('.ds-bottom').find('.y-count'));
            var yCount = objDialog.find('.ds-bottom').find('.y-count');
            var j = 28;
            yCount.html(j);
        } else {
            window.clearInterval(l);
        }

    });
}

//3秒返回首页
function returnIndex(obj) {
    var j = 5;
    //$('.fail').find('.pdm-back').find("span.come-back").html(j);
    obj.html(j);
    s = window.setInterval(function () {
        j--;
        if (j == 0) {
            j = 3;
            window.clearInterval(s);
            backIndex();
        }
        obj.html(j);

    }, 3000);
}

//返回首页
function backIndex() {
    window.location.href = "/mciprun/msb";
}


//返回上一页
function backPrevPage(obj) {
    obj.bind('click', function () {
        history.go(-1);
    });
}

//手机号验证
function valPhoneNum2(obj, action, targetObj) {
    obj.on(action, function () {

        if(typeof targetObj == "undefined"){
            if (!/^0?1\d{10}$/.test($(this).val())) {
                $(".form-error").show();
                $(this).addClass("mobile-error");
                return false;
            } else {
                $(".form-error").hide();
                $(this).removeClass("mobile-error");
                return true;
            }
        }else{
//            if (!/^0?1\d{10}$/.test($(this).parents(".form-submit").siblings(".form-tel").find("input").val())) {
//                $(".form-error").show();
//                $(this).parents(".form-submit").siblings(".form-tel").find("input").addClass("mobile-error");
//                return false;
//            } else {
//                $(".form-error").hide();
//                $(this).parents(".form-submit").siblings(".form-tel").find("input").removeClass("mobile-error");
//                return true;
//            }
        }


    })
}


//弹出窗口
function popUp(obj) {
    obj.fadeIn(1000);
    $(".filter").css({
        "width": $(window).width(),
        "height": $(document).height()
    }).fadeIn(1000);
}

function popUp1(obj) {
    obj.fadeIn(1000);
    $(".pop").css({
        "width": $(window).width(),
        "height": $(document).height()
    }).fadeIn(1000);
}

//点击弹出
function popForm(obj, objForm) {
    $(obj).click(function () {
        var objFormTit = null;
        if ($(this).find(".hrc-text").length > 0) {
            objFormTit = $(this).find(".hrc-text").children("a").text();

        } else if ($(this).parents(".sccc-btn").siblings(".sccc-title").find("h3").length > 0) {
            objFormTit = $(this).parents(".sccc-btn").siblings(".sccc-title").find("h3").text();
        } else if ($(this).find(".btc-text").length > 0) {
            objFormTit = $(this).find(".btc-text").text();
        } else if ($(this).parents(".vacc-btn").siblings(".vacc-title").length > 0) {
            objFormTit = $(this).parents(".vacc-btn").siblings(".vacc-title").text();
        }
        $(".nM-title").find("h1").children("span").text(objFormTit);
        $(".nM-form").find("select").val(objFormTit);

        var num = $(obj).attr('attr-name');
        if(num){
            $(objForm).find('form input[name="attr-name"]').val(num);
        }


        $(objForm).css({"display": "block", "minHeight": $(window).height(),"overflowY":"scroll"}).siblings(".pop-form").hide();
        $(objForm).siblings(".white-filter").show();
        $(".footer").hide();
        $(".header-index").hide();
        $("body,html").css({"height": $(window).height(), "overflow": "hidden"});

        //获取焦点
        //if(objForm.attr('class') == $('.form-search').attr('class') ){
        //    objForm.find('.bns_name').focus();
        //}
        //if(objForm.attr('class') == $('.jssbform-search').attr('class') ){
        //    objForm.find('.bns_name').focus();
        //}
        //if(objForm.attr('class') == $('.footerform-search').attr('class') ){
        //    objForm.find('.bns_name').focus();
        //}

    });
}



//tab切换
function tabCon(obj, con, className) {
    $(obj).bind("click", function () {
        $(this).addClass(className).siblings().removeClass(className);
        var nIndex = $(this).index();
        //console.log(nIndex);
        $(con).eq(nIndex).show().siblings(con).hide();
    });
}

//滚动
(function (a) {
    a.fn.vTicker = function (b) {
        var c = {
            speed: 700,
            pause: 4000,
            showItems: 3,
            animation: "",
            mousePause: true,
            isPaused: false,
            direction: "up",
            height: 0
        };
        var b = a.extend(c, b);
        moveUp = function (g, d, e) {
            if (e.isPaused) {
                return
            }
            var f = g.children("ul");
            var h = f.children("li:first").clone(true);
            if (e.height > 0) {
                d = f.children("li:first").height()
            }
            f.animate({top: "-=" + d + "px"}, e.speed, function () {
                a(this).children("li:first").remove();
                a(this).css("top", "0px")
            });
            if (e.animation == "fade") {
                f.children("li:first").fadeOut(e.speed);
                if (e.height == 0) {
                    f.children("li:eq(" + e.showItems + ")").hide().fadeIn(e.speed)
                }
            }
            h.appendTo(f)
        };
        moveDown = function (g, d, e) {
            if (e.isPaused) {
                return
            }
            var f = g.children("ul");
            var h = f.children("li:last").clone(true);
            if (e.height > 0) {
                d = f.children("li:first").height()
            }
            f.css("top", "-" + d + "px").prepend(h);
            f.animate({top: 0}, e.speed, function () {
                a(this).children("li:last").remove()
            });
            if (e.animation == "fade") {
                if (e.height == 0) {
                    f.children("li:eq(" + e.showItems + ")").fadeOut(e.speed)
                }
                f.children("li:first").hide().fadeIn(e.speed)
            }
        };
        return this.each(function () {
            var f = a(this);
            var e = 0;
            f.css({overflow: "hidden", position: "relative"}).children("ul").css({
                position: "absolute",
                margin: 0,
                padding: 0
            }).children("li").css({margin: 0, padding: 0});
            if (b.height == 0) {
                f.children("ul").children("li").each(function () {
                    if (a(this).height() > e) {
                        e = a(this).height()
                    }
                });
                f.children("ul").children("li").each(function () {
                    a(this).height(e)
                });
                f.height(e * b.showItems)
            } else {
                f.height(b.height)
            }
            var d = setInterval(function () {
                if (b.direction == "up") {
                    moveUp(f, e, b)
                } else {
                    moveDown(f, e, b)
                }
            }, b.pause);
            if (b.mousePause) {
                f.bind("mouseenter", function () {
                    b.isPaused = true
                }).bind("mouseleave", function () {
                    b.isPaused = false
                })
            }
        })
    }
})(jQuery);

//获取cookie
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}
//修改cookie
function editCookie(name, value, expiresHours) {
    var cookieString = name + "=" + escape(value);
    //判断是否设置过期时间,0代表关闭浏览器时失效
    if (expiresHours > 0) {
        var date = new Date();
        date.setTime(date.getTime + expiresHours * 3600 * 1000); //单位是多少小时后失效
        cookieString = cookieString + "; expires=" + date.toGMTString();
    }
    document.cookie = cookieString;
}


//音频
var music = document.querySelector("#music");



$(function () {
        if($(window).width() > $(window).height()){
        $('.qc-text input[type=text]').focus(function(){
            $this = $(this);
            setTimeout(function(){
                $(window).scrollTop($this.parents('.qc-text').offset().top -50);
            },200);
        });
    } 
    	$(window).resize(function(){
		if($(window).width() > $(window).height()){
			$('.qc-text input[type=text]').focus(function(){
		    	$this = $(this);
		    	setTimeout(function(){
			        $(window).scrollTop($this.parents('.qc-text').offset().top -50);
			    },200);
		    });
		}
	});

    //追踪轨迹代码
    $('a').click(function(){
	$(this).attr('href',$(this).attr('href')+location.search);
    });
    //返回上一页
    backPrevPage($('.go-back'));

    //点击弹出
    popForm($(".footer-offer,.search a,.banner"), $(".form-search"));   //2017-11-16 优化
    popForm($(".banner"), $(".form-searchrob"));   //2017-11-16 优化
    popForm($(".hi-search"), $(".form-search"));
    popForm($(".jscx"), $(".jssbform-search"));
    popForm($(".fn_link"), $(".footerform-search"));
    popForm($(".hr-content li"), $(".hot-business"));
    popForm($(".Fromalert"), $(".hot-business-swt"));
    popForm($(".btn-apply"), $(".dissent-apply"));
    popForm($(".btn-price"), $(".price-dissent"));
    popForm($(".rfcsc-text>p>a"), $(".form-search"));
    popForm($(".bt-content>ul>li"), $(".hot-business"));
    popForm($(".btn-apply"), $(".addValue-apply"));
    popForm($(".btn-price"), $(".addValue-price"));
    popForm($(".btn-apply"), $(".pop-rushpass"));
    popForm($(".btn-2"), $(".pop-rushpass"));
    popForm($(".btn-3"), $(".pop-rushpass"));
    popForm($(".btn-4"), $(".pop-rushpass"));
    popForm($(".btn-5"), $(".pop-rushpass"));


    $('.search a').click(function(){
        var test = $('.search').find('input').val();
        if(test != '' && test != '输入商标名称'){
            $(".form-search").find('.bns_name').val(test);
        }
    })
    //关闭弹出层
    $(".aClose").on("click", backIndex);

  //  dialogClose($(".pop-form"),$(".closed"));
    //点击隐藏
    $(".closed").click(function () {
        $('input[name="bns_name"]').val('');
        $('input[name="customer"]').val('');
        $('input[name="phone"]').val('');
        $(this).parents(".pop-form").css("display", "none");
        $(".form-error").hide();
        $(".filter").hide();
        $(".footer").show();
        $(".header-index").show();
        $("body,html").css({"height":"auto","overflow-y":"scroll"});
    });
  //  dialogClose($(".form-success"),$(".result-btn"));
    $(".result-btn").on("click",function(){
        
        $('.pop-form').hide();
        $('.form-success').hide();
        $('.filter').hide();
        
    });
    

    //手机号验证
    //$(".userTel").focusout(valPhoneNum);
    valPhoneNum2($(".userTel"), "focusout");
    //valPhoneNum2($(".btn-save,.f-submit"), "click", $(".userTel"));

    //设置 filter 宽高度
    $(".filter").css({
        "width": $(window).width(),
        "height": $(document).height()
    });

    //返回顶部加载更多
    $("#backTop").hide();
    //当滚动条的位置处于距顶部100像素以下时，跳转链接出现，否则消失
    $(window).scroll(function () {
        if ($(window).scrollTop() > $(window).height()) {
            $("#backTop").fadeIn(500);
        } else {
            $("#backTop").fadeOut(500);
        }
    });

    //当点击跳转链接后，回到页面顶部位置
    $("#backTop").mousedown(function () {
        $('body,html').animate({
                scrollTop: 0
            },
            500);
        return false;
    });

    //中奖播报
    $('#sl-main').vTicker({
        speed: 800,
        pause: 1000,
        animation: 'fade',
        mousePause: false,
        showItems: 3
    });

    //摇一摇

    $(".btn-save").on("click", function () {

        var curForm = $('#moneyshakeFrom').find('form');
        
        var phone = curForm.find('input[name="phone"]').val();
        if(!phone){
            $(".form-error").show();return false;
        }
        var patt1 = new RegExp("^1[3|4|5|7|8][0-9]{9}$",'gi');
        if(!patt1.test(phone)){
            $(".form-error").show();
            return false;
        }
        var data = curForm.serialize();
        $.ajax({url:'/base/ajax_commit',data:data,type:'post',dataType:'json',headers: {'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')},
            success:function(data){
               // var obj = eval(data);       
                if( data.ishave){
                    if(confirm("您的机会已用完！是否返回首页？")){window.location.href="/mciprun/msb";} 
                    return;
                }else{
                    if(data.status){

                        curForm.find('input[name="customer"]').val('');
                        curForm.find('input[name="phone"]').val('');
                        window.location.href = "/mciprun/msb/shaking";                    
                    } 
                }
            }
            ,error: function(xhr, type){
                console.log(xhr);
                console.log(type);
            }
        });
        
    });

    //首页banner
    $dragBln = false;
    $(".banner_list").touchSlider({
        flexible: true,
        speed: 200,
        btn_prev: $("#btn_prev"),
        btn_next: $("#btn_next"),
        paging: $(".banner_buttons span"),
        counter: function (e) {
            $(".banner_buttons span").removeClass("on").eq(e.current - 1).addClass("on");
        }
    });

    $(".banner_list").bind("mousedown", function () {
        $dragBln = false;
    });

    $(".banner_list").bind("dragstart", function () {
        $dragBln = true;
    });

    timer = setInterval(function () {
        $("#btn_next").click();
    }, 3000);

    $(".main_visual").hover(function () {
        clearInterval(timer);
    }, function () {
        timer = setInterval(function () {
            $("#btn_next").click();
        }, 3000);
    });

    $(".banner_list").bind("touchstart", function () {
        clearInterval(timer);
    }).bind("touchend", function () {
        timer = setInterval(function () {
            $("#btn_next").click();
        }, 3000);
    });

    //tab 切换
    tabCon(".ac-title>li", ".ac-con", "current");

    //首页相关服务点击查看全部 2017/11/16
    var serveMore = $('.sc-content:gt(4)');
    serveMore.hide();
    $('.sc-more').on('click',function(){
        $(this).hide();
        serveMore.show();
    });
});

    //提交表单数据
    /*function saveData(Name){
        var curForm = $('#'+Name).find('form');
        var msg = curForm.find('.f-submit').text();  
        var phone = curForm.find('input[name="phone"]').val();
        if(!phone){
            $(".form-error").show();return false;
        }
        var patt1 = new RegExp("^1[3|4|5|7|8][0-9]{9}$",'gi');
        if(!patt1.test(phone)){
            $(".form-error").show();
            return false;
        }
        //商标转让和商标猎头存入商标交易类内
        var bns_type = curForm.find('select[name="bns_type"]').val();
        if( bns_type=='商标转让' || bns_type=='商标猎头'){
           curForm.find('input[name="page_type"]').val('12'); 
        }
        if( bns_type=='国际商标注册'){
           curForm.find('input[name="page_type"]').val('15'); 
        }
        curForm.find('.f-submit').attr('disabled','true');
        curForm.find('.f-submit').text("正在提交，请稍等");
        var bns_name = curForm.find('input[name="bns_name"]').val();

        var num = curForm.find('input[name="attr-name"]').val();

        _czc.push(["_trackEvent",'提交','提交+NO.'+num+'立即申请']);
        
        var data = curForm.serialize();
        
        $.ajax({url:'/base/ajax_commit',data:data,type:'post',dataType:'json',headers: {'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')},
            success:function(data){
                var obj = eval(data);
                if(data.status){

                    //首页搜索表单提示语判断
                    if( (Name=='searchFrom' || Name=='jssbsearchFrom' || Name=='footersearchFrom') && bns_name==''){
                        $('.search-rslt02,.filter').show();
                        setInterval(function () {
                            location.reload();
                            $('.filter  ,.form-success,.pop-form').hide();
                        }, 3000);
                    }else if( (Name=='searchFrom' || Name=='jssbsearchFrom' || Name=='footersearchFrom' && bns_name!='') && data.typecount==0){
                        $('.su_search_name').text( bns_name );
                        $('.search-rslt03,.filter').show();
                        setInterval(function () {
                            location.reload();
                            $('.filter ,.form-success,.pop-form').hide();
                        }, 3000);
                    }else if( (Name=='searchFrom' || Name=='jssbsearchFrom' || Name=='footersearchFrom' && bns_name!='') && data.typecount>0){
                        $('.su_search_name').text( bns_name );
                        $('.typecount').text( data.typecount );
                        $('.search-rslt01,.filter').show();
                        setInterval(function () {
                            ;location.reload();
                            $('.filter ,.form-success,.pop-form').hide();
                        }, 3000);
                    }else if( Name=='swthotbusinessFrom' ){
                        $('.jisusuccess,.filter').show().delay(2500).fadeOut();
                        $('#'+Name).stop().delay(2500).fadeOut();
                    }else if( Name=='jisuhtmlForm' || Name=='jisuFrom' ){
                         var l = ($(window).width() - $(".jisusuccess").outerWidth()) / 2;
                         var t = ($(window).height() - $(".jisusuccess").outerHeight()) / 2 > 0 ? ($(window).height() - $(".jisusuccess").outerHeight()) / 2 : 10;
                         var lDiff = $(".jisusuccess").offset().left - $(".jisusuccess").position().left;
                         var tDiff = $(".jisusuccess").offset().top - $(".jisusuccess").position().top;
                         l = l + $(window).scrollLeft() - lDiff;
                         t = t + $(window).scrollTop() - tDiff;

                         $(".jisusuccess").css({
                             left: l + "px",
                             top: t + "px",
                             display: "block"
                         });
                        $('.jisusuccess,.filter').show().delay(2500).fadeOut();
                    }else{
                         $('.addValue-success,.filter').show().delay(2500).fadeOut();
                         $('#'+Name).stop().delay(2500).fadeOut();
                    }



                     curForm.find('input[name="bns_name"]').val('');
                     curForm.find('input[name="customer"]').val('');
                     curForm.find('input[name="phone"]').val('');
                    curForm.find('.f-submit').removeAttr('disabled');
                    curForm.find('.f-submit').text(msg);
                    $(".header-index").show();
                    $(".footer").show();

                        $("body,html").delay(2500).css({"height":"auto","overflow-y":"scroll"});
                    if(Name=='sutongbaohtmlFormIndex' || Name=='sutongbaohtmlForm'){ 
                        $("html,body").delay(2500).removeAttr('style');
                    }
                } 
            }
            ,error: function(xhr, type){
                console.log(xhr);
                console.log(type);
          
            }

        });
        
    }*/

    //提交表单数据
    function saveData(Name){
        var curForm = $('#'+Name).find('form');
        var msg = curForm.find('.f-submit').text();  
        var mobile = curForm.find('input[name="phone"]').val();
        if(!mobile){
            $(".form-error").show();return false;
        }
        var patt1 = new RegExp("^1[3|4|5|7|8][0-9]{9}$",'gi');
        if(!patt1.test(mobile)){
            $(".form-error").show();
            return false;
        }
        //商标转让和商标猎头存入商标交易类内
        var bns_type = curForm.find('select[name="bns_type"]').val();
    
        curForm.find('.f-submit').attr('disabled','true');
        curForm.find('.f-submit').text("正在提交，请稍等");
        var bns_name = curForm.find('input[name="bns_name"]').val();
        var con_title = bns_name;
        var note = curForm.find('input[name="note"]').val();

        var num = curForm.find('input[name="attr-name"]').val();

        _czc.push(["_trackEvent",'提交','提交+NO.'+num+'立即申请']);
        

        var source_id = $('#source_id').val();
        var terminal = $('#terminal').val();
        var number = curForm.find('input[name="bns_type"]').attr('value-num');
        if(number == undefined){
            number = curForm.find('select[name="bns_type"] option:selected').attr('value-num');
        }
        var contacts = curForm.find('input[name="customer"]').val();

        $.ajax({
            url:'/base/bcbackup',
            data:{source_id:source_id,terminal:terminal,number:number,con_title:con_title,mobile:mobile,contacts:contacts},
            type:'post',
            dataType:'json',
            success:function(data){
                var obj = eval(data);
                //if(obj.msg=="success"){

                    //首页搜索表单提示语判断
                    if( (Name=='searchFrom' || Name=='jssbsearchFrom' || Name=='footersearchFrom') && bns_name==''){
                        $('.search-rslt02,.filter').show();
                        setInterval(function () {
                            location.reload();
                            $('.filter  ,.form-success,.pop-form').hide();
                        }, 3000);
                    }else if( (Name=='searchFrom' || Name=='jssbsearchFrom' || Name=='footersearchFrom' && bns_name!='')){
                        //搜索近似商标
                        $.ajax({
                            url:'/base/ajaxSearchSimilarBrands',
                            data:{brandName:bns_name},
                            type:'post',
                            dataType:'json',
                            success:function(obj){
                                typecount = obj.typecount;
                                if(typecount==0){
                                    $('.su_search_name').text( bns_name );
                                    $('.search-rslt03,.filter').show();
                                    setInterval(function () {
                                        location.reload();
                                        $('.filter ,.form-success,.pop-form').hide();
                                    }, 3000);
                                }else{
                                    $('.su_search_name').text( bns_name );
                                    $('.typecount').text( typecount );
                                    $('.search-rslt01,.filter').show();
                                    setInterval(function () {
                                        ;location.reload();
                                        $('.filter ,.form-success,.pop-form').hide();
                                    }, 3000);
                                }
                            }
                        });
                    }else if( Name=='swthotbusinessFrom' ){
                        $('.jisusuccess,.filter').show().delay(2500).fadeOut();
                        $('#'+Name).stop().delay(2500).fadeOut();
                    }else if( Name=='jisuhtmlForm' || Name=='jisuFrom' ){
                         var l = ($(window).width() - $(".jisusuccess").outerWidth()) / 2;
                         var t = ($(window).height() - $(".jisusuccess").outerHeight()) / 2 > 0 ? ($(window).height() - $(".jisusuccess").outerHeight()) / 2 : 10;
                         var lDiff = $(".jisusuccess").offset().left - $(".jisusuccess").position().left;
                         var tDiff = $(".jisusuccess").offset().top - $(".jisusuccess").position().top;
                         l = l + $(window).scrollLeft() - lDiff;
                         t = t + $(window).scrollTop() - tDiff;

                         $(".jisusuccess").css({
                             left: l + "px",
                             top: t + "px",
                             display: "block"
                         });
                        $('.jisusuccess,.filter').show().delay(2500).fadeOut();
                    }else{
                         $('.addValue-success,.filter').show().delay(2500).fadeOut();
                         $('#'+Name).stop().delay(2500).fadeOut();
                    }



                     curForm.find('input[name="bns_name"]').val('');
                     curForm.find('input[name="customer"]').val('');
                     curForm.find('input[name="phone"]').val('');
                    curForm.find('.f-submit').removeAttr('disabled');
                    curForm.find('.f-submit').text(msg);
                    $(".header-index").show();
                    $(".footer").show();

                        $("body,html").delay(2500).css({"height":"auto","overflow-y":"scroll"});
                    if(Name=='sutongbaohtmlFormIndex' || Name=='sutongbaohtmlForm'){ 
                        $("html,body").delay(2500).removeAttr('style');
                    }
                //} 
            }
            ,error: function(xhr, type){
                console.log(xhr);
                console.log(type);
          
            }

        });
        
    }
    
     //写入cookie
 function SetCookie(name,value)
 {
    var storage = window.localStorage;
    var yiyou = storage.setItem(name,value);
    return yiyou;
 }
 
 ///删除cookie
 function delCookie(name)
 {
    var storage = window.localStorage;
    var yiyou = storage.setItem(name,'');
    storage.removeItem(name);//清除c的值
   // return yiyou;
 }
 
 //读取cookie
 function getCookie(name)
 {
    var storage = window.localStorage;
    var yiyou = storage.getItem(name);
    return yiyou;
 }
 
 function delAllCookie(){
     localStorage.clear();
 }

//首页查询弹窗关闭 2017/04/20
$(".form-search .search-close,.jssbform-search .search-close,.footerform-search .search-close").on("click",function(){
    $('.pop-affirm,.filter').show();
});

//确认弹窗放弃操作  2017/04/20
$(".pop-affirm .affirm-yes").on("click",function(){
    $('.pop-affirm,.filter,.form-search,.jssbform-search,.footerform-search').hide();
    $(".form-error").hide();
    $(".footer").show();
    $(".header-index").show();
    $("body,html").css({"height":"auto","overflow-y":"scroll"});
});
//确认弹窗继续查询操作  2017/04/20
$(".pop-affirm .affirm-no").on("click",function(){
    $('.pop-affirm,.filter').hide();
});

