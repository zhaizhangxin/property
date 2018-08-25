$(function() {

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

});