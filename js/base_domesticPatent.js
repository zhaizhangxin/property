//弹窗关闭
function dialogClose(objDialog, obj, time) {
    if (time != undefined) {
        setTimeout(function () {
            $(".filter").hide();
            objDialog.hide();
        }, time);
    } else {
        obj.bind('mousedown', function () {
            $(".filter").hide();
            objDialog.hide();
            $("html,body").css({
                "height": $(document).height(),
                "overflow-y": "scroll"
            });
            $(".footer").show();
            $(".header-index").show();
            clearTxt(objDialog);
        });
    }
}

//返回上一页
function backPrevPage(obj) {
    obj.bind('click', function () {
        history.go(-1);
    });
}

//返回首页
function backIndex() {
    window.location.href = "index.html";
}

//点击弹出
function popForm(obj, objForm) {

    $(obj).click(function () {
        $(objForm).css({
            "display": "block",
            "minHeight": $(window).height(),
            "overflowY": "scroll"
        }).siblings(".pop-form").hide();
        $(objForm).siblings(".white-filter").show();
        $(".footer").hide();
        $(".header-index").hide();
        $("body,html").css({"height": $(window).height(), "overflow": "hidden"});

    })
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

//最新查询状态滚动
(function($){
    $.fn.myScroll = function(options){
        //默认配置
        var defaults = {
            speed:40,  //滚动速度,值越大速度越慢
            rowHeight:24 //每行的高度
        };

        var opts = $.extend({}, defaults, options),intId = [];

        function marquee(obj, step){

            obj.find("ul").animate({
                marginTop: '-=1'
            },0,function(){
                var s = Math.abs(parseInt($(this).css("margin-top")));
                if(s >= step){
                    $(this).find("li").slice(0, 1).appendTo($(this));
                    $(this).css("margin-top", 0);
                }
            });
        }

        this.each(function(i){
            var sh = opts["rowHeight"],speed = opts["speed"],_this = $(this);
            intId[i] = setInterval(function(){
                if(_this.find("ul").height()<=_this.height()){
                    clearInterval(intId[i]);
                }else{
                    marquee(_this, sh);
                }
            }, speed);

            _this.hover(function(){
                clearInterval(intId[i]);
            },function(){
                intId[i] = setInterval(function(){
                    if(_this.find("ul").height()<=_this.height()){
                        clearInterval(intId[i]);
                    }else{
                        marquee(_this, sh);
                    }
                }, speed);
            });
        });
    }
})(jQuery);

//文本框默认值提示
function IsBlank(attr,color1,color2){
    $.each($('input'), function(index, val) {
        var txtAttr = $(this).attr(attr);
        if($(this).val() == '' || $(this).val() == txtAttr){
            $(this).val(txtAttr).css('color',color1);
        }else{
            $(this).css('color',color2);
        }
        $(this).on('blur',function(){
            var txtAttr = $(this).attr(attr);
            $(this).val()=='' || $(this).val()==txtAttr ? $(this).val(txtAttr).css('color',color1) : $(this).css('color',color2);
        }).on('focus',function(){
            var txtAttr = $(this).attr(attr);
            $(this).val()=='' || $(this).val()==txtAttr ? $(this).val('').css('color',color2) : $(this).css('color',color2);
        });
    });
}

//表单提交
function submitFun(mobileObj){
    var reg = /^(1[3|4|5|7|8])[\d]{9}$/g;
    if(!(mobileObj.val()!= "" && mobileObj.val() != mobileObj.attr('placeholder') && reg.test(mobileObj.val()))){
        mobileObj.next().show();
        mobileObj.focus();
        return false;
    }else{
        mobileObj.next().hide();
        return true;
    }
}

//清空表单内容 2017/01/05
function clearTxt(pLayer){
    pLayer.find('input[type=text],input[type=tel]').each(function(){
        $(this).val($(this).attr('placeholder')).css('color','#999');
    });
    pLayer.find('textarea').each(function(){
        $(this).val('');
    });
    $('.form-error').hide();
}

$(function () {

    //文本框默认提示
    IsBlank('placeholder','#999','#333');

    //返回上一页
    backPrevPage($(".go-back"));

    //textarea 默认提示
    $('.form-textarea textarea').on('focus',function(){
        $(this).next().hide();
    });
    $('.form-textarea textarea').on('blur',function(){
        if($(this).val()==''){
            $(this).next().show();
        }else{
            $(this).next().hide();
        }
    });

    //首页导航横条位置 2017/08/16
    $('.nav-scroll').scrollLeft(160); 

    //点击弹出
    popForm(".hi-search", ".input-search");   //查询表单
    popForm(".btn-searching", ".pop-searching");  //热门推荐 专利高级检索
    popForm(".btn-application", ".pop-application");  //热门推荐 专利申请
    popForm(".footer-query", ".pop-application");  //底部快速申请
    popForm(".btn-write", ".pop-write");  //热门推荐 代写专利技术方案
    popForm(".btn-model", ".pop-model");  //常见问题 领取专利申请书范本
    popForm(".btn-search", ".input-search");  //常见问题 查询能否申请专利   服务优势 我要查询
    popForm(".btn-decide", ".pop-decide");  //常见问题 自助判定专利类型
    popForm(".btn-reduce", ".pop-reduce");  //常见问题 领取官费减免模板
    popForm(".btn-Clarificaiton", ".pop-Clarificaiton");  //常见问题 领取技术交底书范文
    popForm(" .btn-assess", ".pop-assess");  //申请流程 评估我的专利表单
    popForm(" .btn-cost", ".pop-cost");  //申请流程 申请官费减缴
    //业务分类 弹窗
    $('.bt-content ul li').on('mousedown',function(){
        var txt = $.trim( $(this).find('.btc-text').text() );
       popForm( $(this),".pop-application");
        $('.pop-application').find('select').val(txt);
    });
    //常用模板下载弹窗
    $('.template-content ul li:not(:last-child)').on('mousedown',function(){
        var txt = $.trim($(this).find('.tc-text').text());
        popForm( $(this),".pop-template");
        $('.pop-template').find('h1').text(txt);
        $('.pop-template').find("input[name='note']").val(txt);
    });
    //所需材料 专利申请
    $('.material .btn-apply').on('mousedown',function(){
        var txt = $.trim($(this).find('span').text());
        popForm( $(this),".pop-application");
        $('.pop-application').find('select').val(txt);
    });

    //弹窗关闭
    dialogClose($(".pop-form"), $(".aClose"));

    //表单提交
    /*$('.f-submit').on('click', function(){
        var pLayer = $(this).parents('.pop-form'),
            mobileObj = pLayer.find('.userTel'),
            flag = submitFun(mobileObj);
        if(flag){
            //提交成功
            var curForm = pLayer.find('form');
            var data = curForm.serialize();
            $.ajax({
                url:'/base/ajax_commit',
                data:data,
                type:'post',
                dataType:'json',
                headers: {'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')},
                success:function(data){
                    pLayer.hide();
                    $('.mask , .success-con').show();
                    setTimeout(function(){
                        $('.mask , .success-con').hide();
                    },3000);
                    clearTxt(pLayer);
                    $("html,body").css({
                        "height": $(document).height(),
                        "overflow-y": "scroll"
                    });
                    $(".footer").show();
                    $(".header-index").show();
                }
            });
        }
    });*/

    //表单提交 20171124 新商机接口替换
    $('.f-submit').on('click', function(){
        var pLayer = $(this).parents('.pop-form'),
            bName = pLayer.find('.cr-name'),
            customer = pLayer.find('.name'),
            mobileObj = pLayer.find('.userTel'),
            flag = submitFun(mobileObj);
        if(flag){
            //提交成功
            var source_id = $('#source_id').val();
            var terminal = $('#terminal').val();
            var number = pLayer.find('input[name="bns_type"]').attr('value-num');
            var bnsType = '';
            if(number == undefined){
                number = pLayer.find('select[name="bns_type"] option:selected').attr('value-num');
                bnsType = pLayer.find('select[name="bns_type"] option:selected').val();
            }

            var mobile = mobileObj.val();
            var con_title = bName.val();
            var contacts = customer.val();
            var con_remark = pLayer.find('input[name="note"]').val() + ' ' + bnsType;
            $.ajax({
                url:'/base/bcbackup',
                data:{source_id:source_id,terminal:terminal,number:number,con_remarks:con_remark,mobile:mobile,con_title:con_title,contacts:contacts},
                type:'post',
                dataType:'json',
                headers: {'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')},
                success:function(data){
                    //if(data.code==0){
                        pLayer.hide();
                        $('.mask , .success-con').show();
                        setTimeout(function(){
                            $('.mask , .success-con').hide();
                        },3000);
                        clearTxt(pLayer);
                        $("html,body").css({
                            "height": $(document).height(),
                            "overflow-y": "scroll"
                        });
                        $(".footer").show();
                        $(".header-index").show();
                    //}
                }
            });
        }
    });

    //tab 切换
    tabCon(".sac-title>li", ".sac-content", "current");
    tabCon(".ic-title>li", ".ic-con", "current");

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


    //定时自动消失
    function autoDisappear(obj, time) {
        var autoDis = window.setInterval(function () {
            window.clearInterval(autoDis);
            obj.hide();
        }, time);
    }
    //随机生成m-n的数字
    function rnd(n, m) {
        return Math.floor(Math.random() * (m - n + 1) + n)
    }
    //3秒返回首页
    function returnIndex(obj) {
        var j = 3;
        obj.html(j);
        s = window.setInterval(function () {
            j--;
            if (j == 0) {
                j = 3;
                window.clearInterval(s);
                window.location.href = "index.html";
            }
            obj.html(j);

        }, 1000);
    }
    var $rotate = $('.dial').find('.d-cycle').find('.dc-inner');
    var spanCount = $('.dial').find('.d-cycle').find('span.dcg-count');
    var cycleCount = 3;

    var rotateTimeOut = function () {
        $rotate.rotate({
            angle: 0,
            animateTo: 2160,
            duration: 8000,
            callback: function () {
                alert('网络超时，请检查您的网络设置！');
            }
        });
    };
    var bRotate = false;


});
