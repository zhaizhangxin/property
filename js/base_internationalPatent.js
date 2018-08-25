$(function() {
    //追踪轨迹代码
    $('a').click(function(){
        $(this).attr('href',$(this).attr('href')+location.search);
    });
    
    //首页查询弹窗关闭 2017/06/12
    $(".input-search1 .search-close,.input-search2 .search-close,.input-search3 .search-close,.apply-btn1 .aClose,.patent-search-layer .aClose,.search-layer2 .aClose,.home-query-cost .aClose").on("mousedown",function(){
        if($('.pop-affirm').length && $('.pop-affirm').length>0){
            $('.pop-affirm,.filter').show();
        }else{
            var parent = $(this).parents(".pop-form");
            parent.css("display", "none");
            $(".footer").show();
            $(".white-filter").hide();
            $("body,html").css({"height":"auto","overflow-y":"scroll"});
            parent.find('select').each(function(index, el) {
                $(this).find("option:selected").prop('selected', 'false');
                $(this).get(0).selectedIndex = 0;
            });
            parent.find('input[type=text]').each(function(index, el) {
                $(this).val('');
            });
            parent.find('.form-error').hide();
        }
        
    });

//确认弹窗放弃操作  2017/06/12
    $(".pop-affirm .affirm-yes").on("mousedown",function(){
        $('.pop-affirm,.filter,.input-search,.input-search2,.input-search3,.pop-form').hide();
        $(".form-error").hide();
        $(".footer").show();
        $(".header-index").show();
        $("body,html").css({"height":"auto","overflow-y":"scroll"});
    });
    //确认弹窗继续查询操作  2017/06/12
    $(".pop-affirm .affirm-no").on("mousedown",function(){
        $('.pop-affirm,.filter').hide();
    });

    //首页导航横条位置 2017/08/16
    $('.nav-scroll').scrollLeft(250); 
});