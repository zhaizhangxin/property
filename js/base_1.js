//内容自适应
!function(win) {
    function resize() {
        var domWidth = domEle.getBoundingClientRect().width;
        if(domWidth / v > 540){
            domWidth = 540 * v;
        }
        win.rem = domWidth / 16;
        domEle.style.fontSize = win.rem + "px";
    }
    var v, initial_scale, timeCode, dom = win.document, domEle = dom.documentElement, viewport = dom.querySelector('meta[name="viewport"]'), flexible = dom.querySelector('meta[name="flexible"]');
    if (viewport) {
        var o = viewport.getAttribute("content").match(/initial\-scale=(["']?)([\d\.]+)\1?/);
        if(o){
            initial_scale = parseFloat(o[2]);
            v = parseInt(1 / initial_scale);
        }
    } else if(flexible) {
        var o = flexible.getAttribute("content").match(/initial\-dpr=(["']?)([\d\.]+)\1?/);
        if (o) {
            v = parseFloat(o[2]);
            initial_scale = parseFloat((1 / v).toFixed(2))
        }
    }
    if (!v && !initial_scale) {
        var n = (win.navigator.appVersion.match(/android/gi), win.navigator.appVersion.match(/iphone/gi));
        v = win.devicePixelRatio;
        v = n ? v >= 3 ? 3 : v >= 2 ? 2 : 1 : 1, initial_scale = 1 / v
    }
    //没有viewport标签的情况下
    if (domEle.setAttribute("data-dpr", v), !viewport) {
        if (viewport = dom.createElement("meta"), viewport.setAttribute("name", "viewport"), viewport.setAttribute("content", "initial-scale=" + initial_scale + ", maximum-scale=" + initial_scale + ", minimum-scale=" + initial_scale + ", user-scalable=no"), domEle.firstElementChild) {
            domEle.firstElementChild.appendChild(viewport)
        } else {
            var m = dom.createElement("div");
            m.appendChild(viewport), dom.write(m.innerHTML)
        }
    }
    win.dpr = v;
    win.addEventListener("resize", function() {
        clearTimeout(timeCode), timeCode = setTimeout(resize, 300)
    }, false);
    win.addEventListener("pageshow", function(b) {
        b.persisted && (clearTimeout(timeCode), timeCode = setTimeout(resize, 300))
    }, false);
    resize();
}(window);

//返回上一页
function backPrevPage(obj) {
    obj.bind('click', function () {
        history.go(-1);
    });
}

//文本框默认值提示
function IsBlank(attr,color1,color2){
    $.each($("input"), function(index, val) {
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
//清除表单信息
function clearTxt(pLayer){
    pLayer.find('input[type!=hidden]').each(function(){
        $(this).val($(this).attr('place')).css('color','#ccc');
    });
    $('.form-error').hide();
}

//手机号输入框控制
function mobileValidate(inputObj){
    inputObj.on('keyup', function(event) {
        var c=$(this), reg = /\D|^0/g;
        if(/\D|^0/.test(c.val())){//替换非数字字符
            var temp_amount=c.val().replace(reg,'');
            $(this).val(temp_amount);
        }
    });
}

function submitFun(mobileObj){
    var reg = /^(1[3|4|5|7|8])[\d]{9}$/g;
    if(!(mobileObj.val()!= "" && mobileObj.val() != mobileObj.attr('place'))){
        mobileObj.focus().next().show().html('<em></em>请输入手机号码');
        return false;
    }else if(!(reg.test(mobileObj.val()))){
        mobileObj.focus().next().show().html('<em></em>请输入正确的手机号码');
        return false;

    } else{
        mobileObj.next().hide();
        return true;
    }
}

$(function () {

    //文本框默认提示
    IsBlank('place','#ccc','#333');

    //导航下拉菜单
    $('.droplist-btn').each(function(){
        var dropList = $(this).next();
        $(this).on('click',function(){

            if(dropList.css('display') == 'none'){
                dropList.slideDown();
                $(this).addClass('droplist-btndown');
                return false;
            }else{
                dropList.slideUp();
                $(this).removeClass('droplist-btndown');
            }
        });

        $(this).parents('*').on('click', function() {
            dropList.slideUp();
            $('.droplist-btn').removeClass('droplist-btndown');
        });
    });

    //返回上一页
    backPrevPage($('.go-back'));

    //首页国家注册申请表单出现
    $('.state-con li ').on('click',function(){
        var txt = $(this).find('.state-text').text();
        var countryCode = $(this).attr('countryCode');
        _czc.push(['_trackEvent','点击',txt]);
        $('.mask').show();
        $('.pop-state').show().find('.state-name').text(txt);
        $('.pop-state').find('.bns_attr').val(txt);
        $('.pop-state').find('input[name="bns_type"]').attr('value-num',countryCode);
    });

    //查询表单/申请表单出现 2017/10/17 修改
    $('.banner_list li, .notice-btn .btn-yellow, .materials-btn .btn-blue').on('click',function(){
        $('.mask').show();
        $('.pop-search').show();
    });

    //首页获取方案及报价  2017/10/17
    $('.footer-offer ').on('click',function(){
        $('.mask,.pop-offer').show();
    });

    //报价表单出现
    $('.tc-con .btn-blue ').on('click',function(){
        var txt = $(this).prev().find('h3').text();
        _czc.push(['_trackEvent','点击','周期+'+txt]);
        $('.mask').show();
        $('.pop-offer').show().find('.state-name').text(txt);
        $('.pop-offer').find('select').val(txt);
    });

    //表单关闭
    $('.pf-close').on('click',function(){
        $('.mask').hide();
        $(this).parent().hide();
        $(this).parent().find('select').val('请选择');
        clearTxt($(this).parent());
    });

    //查询表单提交
    /*$('.pop-search .btn-blue').on('click',function(){
        var pLayer = $(this).parents('.pop-search'),
            mobileObj = pLayer.find('.phone'),
            flag = submitFun(mobileObj);

        if(flag){
            var data = pLayer.find('form').serialize();
            $.ajax({
                url:'/base/ajax_commit',
                data:data,
                type:'post',
                dataType:'json',
                headers: {'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')},
                success:function(data){
                    var obj = eval(data);                 
                    if(data.status){  
                        pLayer.hide();
                        $('.pop-success,.mask').show();
                        setTimeout(function(){
                            $('.pop-success, .mask').hide();
                        },3000);
                        clearTxt(pLayer);
                        pLayer.find('select').val('请选择');
                    }
                }
                ,error: function(xhr, type){ 
                    console.log(xhr);
                    console.log(type);
                }
            });
        }
    });*/

    //查询表单提交20171124 新商机接口
    $('.pop-search .btn-blue').on('click',function(){
        var pLayer = $(this).parents('.pop-search'),
            bName = pLayer.find('input[name="bns_name"]'),
            mobileObj = pLayer.find('.phone'),
            flag = submitFun(mobileObj);

        if(flag){
            var source_id = $('#source_id').val();
            var terminal = $('#terminal').val();
            var number = pLayer.find('input[name="bns_type"]').attr('value-num');
            if(number == undefined){
                number = pLayer.find('select[name="bns_type"] option:selected').attr('value-num');
            }

            var mobile = mobileObj.val();
            var con_title = bName.val();
            var con_remark = pLayer.find('input[name="note"]').val();
            $.ajax({
                url:'/base/bcbackup',
                data:{source_id:source_id,terminal:terminal,number:number,con_remarks:con_remark,mobile:mobile,con_title:con_title},
                type:'post',
                dataType:'json',
                success:function(data){
                    var obj = eval(data);                 
                    //if(data.msg=="success"){  
                        pLayer.hide();
                        $('.pop-success,.mask').show();
                        setTimeout(function(){
                            $('.pop-success, .mask').hide();
                        },3000);
                        clearTxt(pLayer);
                        pLayer.find('select').val('请选择');
                    //}
                }
                ,error: function(xhr, type){ 
                    console.log(xhr);
                    console.log(type);
                }
            });
        }
    });

    //首页国家注册申请表单提交
    /*$('.pop-state .btn-blue').on('click',function(){
        var pLayer = $(this).parents('.pop-state'),
            mobileObj = pLayer.find('.phone'),
            flag = submitFun(mobileObj);

        var txt = $('.pop-state').find('.state-name').text();
        _czc.push(['_trackEvent','提交',txt]);

        if(flag){
            var data = pLayer.find('form').serialize();
            $.ajax({
                url:'/base/ajax_commit',
                data:data,
                type:'post',
                dataType:'json',
                headers: {'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')},
                success:function(data){
                    var obj = eval(data);                 
                    if(data.status){  
                        pLayer.hide();
                        $('.pop-success,.mask').show();
                        setTimeout(function(){
                            $('.pop-success, .mask').hide();
                        },3000);
                        clearTxt(pLayer);
                    }
                }
                ,error: function(xhr, type){ 
                    console.log(xhr);
                    console.log(type);
                }
            });
        }
    });*/

    //首页国家注册申请表单提交 20171124 新商机接口替换
    $('.pop-state .btn-blue').on('click',function(){
        var pLayer = $(this).parents('.pop-state'),
            bName = pLayer.find('input[name="bns_name"]'),
            mobileObj = pLayer.find('.phone'),
            flag = submitFun(mobileObj);

        var txt = $('.pop-state').find('.state-name').text();
        _czc.push(['_trackEvent','提交',txt]);

        if(flag){
            var source_id = $('#source_id').val();
            var terminal = $('#terminal').val();
            var number = pLayer.find('input[name="bns_type"]').attr('value-num');

            var mobile = mobileObj.val();
            var con_title = bName.val();
            var con_remark = pLayer.find('input[name="bns_attr"]').val();

            $.ajax({
                url:'/base/bcbackup',
                data:{source_id:source_id,terminal:terminal,number:number,con_remarks:con_remark,mobile:mobile,con_title:con_title},
                type:'post',
                dataType:'json',
                headers: {'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')},
                success:function(data){
                    var obj = eval(data);                 
                    //if(data.msg=="success"){  
                        pLayer.hide();
                        $('.pop-success,.mask').show();
                        setTimeout(function(){
                            $('.pop-success, .mask').hide();
                        },3000);
                        clearTxt(pLayer);
                   // }
                }
                ,error: function(xhr, type){ 
                    console.log(xhr);
                    console.log(type);
                }
            });
        }
    });

    //报价表单提交
    /*$('.pop-offer .btn-blue').on('click',function(){
        var pLayer = $(this).parents('.pop-offer'),
            mobileObj = pLayer.find('.phone'),
            flag = submitFun(mobileObj);

        var txt = $('.pop-offer').find('.state-name').text();
        _czc.push(['_trackEvent','提交','周期+'+txt]);

        if(flag){
            var data = pLayer.find('form').serialize();
            $.ajax({
                url:'/base/ajax_commit',
                data:data,
                type:'post',
                dataType:'json',
                headers: {'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')},
                success:function(data){
                    var obj = eval(data);                 
                    if(data.status){  
                        pLayer.hide();
                        $('.pop-success,.mask').show();
                        setTimeout(function(){
                            $('.pop-success, .mask').hide();
                        },3000);
                        clearTxt(pLayer);
                    }
                }
                ,error: function(xhr, type){ 
                    console.log(xhr);
                    console.log(type);
                }
            });
        }
    });*/

    //报价表单提交 20171124 新商机接口替换
    $('.pop-offer .btn-blue').on('click',function(){
        var pLayer = $(this).parents('.pop-offer'),
            bName = pLayer.find('input[name="bns_name"]'),
            mobileObj = pLayer.find('.phone'),
            flag = submitFun(mobileObj);

        var txt = $('.pop-offer').find('.state-name').text();
        _czc.push(['_trackEvent','提交','周期+'+txt]);

        if(flag){
            var source_id = $('#source_id').val();
            var terminal = $('#terminal').val();
            var number = pLayer.find('select[name="bns_type"] option:selected').attr('value-num');

            var mobile = mobileObj.val();
            var con_title = bName.val();
            var con_remark = pLayer.find('select[name="bns_type"] option:selected').attr('value');
            $.ajax({
                url:'/base/bcbackup',
                data:{source_id:source_id,terminal:terminal,number:number,con_remarks:con_remark,mobile:mobile,con_title:con_title},
                type:'post',
                dataType:'json',
                headers: {'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')},
                success:function(data){
                    var obj = eval(data);                 
                    //if(data.msg=="success"){  
                        pLayer.hide();
                        $('.pop-success,.mask').show();
                        setTimeout(function(){
                            $('.pop-success, .mask').hide();
                        },3000);
                        clearTxt(pLayer);
                    //}
                }
                ,error: function(xhr, type){ 
                    console.log(xhr);
                    console.log(type);
                }
            });
        }
    });

    //首页banner   2017/10/17新增首页banner效果
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

    //搜索框表单出现  2017/10/17
    $('.search-btn').on('click',function(){
        var brandName =$(this).prev();
        $('.mask, .pop-search').show();
        if( brandName.val() == ''|| brandName.val() ==brandName.attr('place')){
            $('.pop-search').find('.brandname').val($('.brandname').attr('place'));
        }else{
            $('.pop-search').find('.brandname').val(brandName.val()).css('color','#333');
        }
        brandName.val(brandName.attr('place')).css('color','#999')
    });

});
