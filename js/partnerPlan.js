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

function clearTxt(pLayer){
    pLayer.find('input[type=text],input[type=tel]').each(function(){
        $(this).val($(this).attr('place')).css('color','#999');
    });
    $('.form-error').hide();
}

//表单提交
function submitFun(mobileObj){
    var reg = /^(1[3|4|5|7|8])[\d]{9}$/g;
    if(!(mobileObj.val()!= "" && mobileObj.val() != mobileObj.attr('place') && reg.test(mobileObj.val()))){
        mobileObj.next().show();
        mobileObj.focus();
        return false;
    }else{
        mobileObj.next().hide();
        return true;
    }
}
$(function() {

    //文本框默认提示
    IsBlank('place', '#999', '#333');
    //快速查询表单出现
    $('.footer .footer-query').on('click',function(){
        $('.pop-form,.mask').show();
    });

    //追踪轨迹代码
    $('a').click(function(){
        $(this).attr('href',$(this).attr('href')+location.search);
    });

    //首页导航下拉菜单 2017/08/16
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


    //快速查询表单关闭
    $('.pop-form .pop-close').on('click',function(){
        $(this).parent().hide();
        $('.mask').hide();
    });
    //询价弹窗提交
    /*$('.if-con .f-submit,.pop-form .f-submit').on('click', function(){
        var pLayer = $(this).parents('.search-form').find('form'),
            bName = pLayer.find('.bns-name'),
            mobileObj = pLayer.find('.bns-phone'),
            flag = submitFun(mobileObj);

        if ( flag){
            //提交成功
            var data = pLayer.serialize();
            $.ajax({url:'/base/ajax_commit',data:data,type:'post',dataType:'json',headers: {'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')},
                success:function(res){
                    var obj = eval(res);
                    if(res.status){
                        if(bName.val() == bName.attr('place') || bName.val()== ""){
                            $('.pop-form').hide();
                            $('.search-rslt02, .mask').show();
                            setTimeout(function(){
                                $('.search-rslt02, .mask').hide();
                            },3000);
                        }
                        if(res.typecount == 0){
                            $('.pop-form').hide();
                            $('.search-rslt03 span').text(bName.val());
                            $('.search-rslt03, .mask').show();
                            setTimeout(function(){
                                $('.search-rslt03, .mask').hide();
                            },3000);
                        }else{
                            $('.pop-form').hide();
                            $('.search-rslt01 .brand').text(bName.val());
                            $('.search-rslt01 .typecount').text(res.typecount);
                            $('.search-rslt01, .mask').show();
                            setTimeout(function(){
                                $('.search-rslt01, .mask').hide();
                            },3000);
                        }
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
    //询价弹窗提交新商机接口  20171124
    $('.if-con .f-submit,.pop-form .f-submit').on('click', function(){
        var pLayer = $(this).parents('.search-form').find('form'),
            bName = pLayer.find('.bns-name'),
            customer = pLayer.find('.bns-customer'),
            mobileObj = pLayer.find('.bns-phone'),
            flag = submitFun(mobileObj);

        if ( flag){
            //提交成功
            var source_id = $('#source_id').val();
            var terminal = $('#terminal').val();
            var number = pLayer.find('input[name="bns_type"]').attr('value-num');

            var mobile = mobileObj.val();
            var con_title = bName.val();
            var contacts = customer.val();
            var con_remark = pLayer.find('input[name="note"]').val();

            $.ajax({
                url:'/base/bcbackup',
                data:{source_id:source_id,terminal:terminal,number:number,con_remarks:con_remark,mobile:mobile,con_title:con_title},
                type:'post',
                dataType:'json',
                success:function(res){
                    var obj = eval(res);
                    //if(res.msg=="success"){
                        if(bName.val() == bName.attr('place') || bName.val()== ""){
                            $('.pop-form').hide();
                            $('.search-rslt02, .mask').show();
                            setTimeout(function(){
                                $('.search-rslt02, .mask').hide();
                            },3000);
                            clearTxt(pLayer);
                        }else{
                            $.ajax({
                                url:'/base/ajaxSearchSimilarBrands',
                                data:{brandName:con_title},
                                type:'post',
                                dataType:'json',
                                success:function(obj){
                                    typecount = obj.typecount;
                                    if(typecount==0){
                                        $('.pop-form').hide();
                                        $('.search-rslt03 span').text(con_title);
                                        $('.search-rslt03, .mask').show();
                                        setTimeout(function(){
                                            $('.search-rslt03, .mask').hide();
                                        },3000);
                                    }else{
                                        $('.pop-form').hide();
                                        $('.search-rslt01 .brand').text(con_title);
                                        $('.search-rslt01 .typecount').text(typecount);
                                        $('.search-rslt01, .mask').show();
                                        setTimeout(function(){
                                            $('.search-rslt01, .mask').hide();
                                        },3000);
                                    }
                                    clearTxt(pLayer);
                                }
                            });
                        }
                    //}
                }
                ,error: function(xhr, type){
                    console.log(xhr);
                    console.log(type);
                }
            });
        }

    });


});