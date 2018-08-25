/**
 * Created by chenhong on 2015/5/6.
 */
$(function(){
    //banner();
    //导航
    $("#nav>li>a").bind("click",function(){

        $("#nav>li>a").removeClass("current");
        $(this).addClass("current");
    });

//产品服务
    $(".pro_sever li").hover(function(){
            var s_hover_obj = $(this).find(".pro_sever_hover");
            var s_hover_obj_p = s_hover_obj.find("a");
            s_hover_obj.show();
            s_hover_obj_p.stop(true).animate({top:'20'},0,function(){
                s_hover_obj_p.slice(1).stop(true).animate({top:'90'},0,function(){
                    s_hover_obj_p.eq(2).stop(true).animate({top:'160'},0);
					 s_hover_obj_p.eq(3).stop(true).animate({top:'230'},0);
                });
            });
        },function(){
            $(this).find(".pro_sever_hover").hide().find("a").css("top","-60px");
            $(this).find(".pro_sever_hover").find("a").stop(true);
            //$(this).find(".pro_sever_con").show();
        }
    )

});
//首页banner轮换
//function banner(){
//    var bn_id = 0;
//    var bn_id2= 1;
//    var speed33=2000;
//    var qhjg = 1;
//    var MyMar33;
//    $("#banner .d1").hide();
//    $("#banner .d1").eq(0).fadeIn("slow");
//    if($("#banner .d1").length>1)
//    {
//        $("#banner_id li").eq(0).addClass("nuw");
//        function Marquee33(){
//            bn_id2 = bn_id+1;
//            if(bn_id2>$("#banner .d1").length-1)
//            {
//                bn_id2 = 0;
//            }
//            $("#banner .d1").eq(bn_id).css("z-index","2");
//            $("#banner .d1").eq(bn_id2).css("z-index","1");
//            $("#banner .d1").eq(bn_id2).show();
//            $("#banner .d1").eq(bn_id).fadeOut("slow");
//            $("#banner_id li").removeClass("nuw");
//            $("#banner_id li").eq(bn_id2).addClass("nuw");
//            bn_id=bn_id2;
//        };
//
//        MyMar33=setInterval(Marquee33,speed33);
//
//        $("#banner_id li").click(function(){
//            var bn_id3 = $("#banner_id li").index(this);
//            if(bn_id3!=bn_id&&qhjg==1)
//            {
//                qhjg = 0;
//                $("#banner .d1").eq(bn_id).css("z-index","2");
//                $("#banner .d1").eq(bn_id3).css("z-index","1");
//                $("#banner .d1").eq(bn_id3).show();
//                $("#banner .d1").eq(bn_id).fadeOut("slow",function(){qhjg = 1;});
//                $("#banner_id li").removeClass("nuw");
//                $("#banner_id li").eq(bn_id3).addClass("nuw");
//                bn_id=bn_id3;
//            }
//        })
//        $("#banner_id").hover(
//            function(){
//                clearInterval(MyMar33);
//            }
//            ,
//            function(){
//                MyMar33=setInterval(Marquee33,speed33);
//            }
//        )
//    }
//    else
//    {
//        $("#banner_id").hide();
//    }
//}
//专家团队

var btnLeft = $('.teams_arrow_l'), btnRight = $('.teams_arrow_r'),teamsList=$('.teams_list');
var teamsWidth = parseInt($('.teams_con').width());
var teamsLength = $('.teams_con').length;
var teamsTime = 1000;
teamsList.width(teamsWidth*teamsLength*2);

teamsList[0].innerHTML +=  teamsList[0].innerHTML;

btnLeft.bind('click',function(){
    if(parseInt(teamsList.css("left"))>=0){
        teamsList.css("left",-teamsWidth*teamsLength);
        //alert(teamsWidth*teamsLength);
    }
    teamsList.stop(true,true).animate({left:parseInt(teamsList.css("left"))+teamsWidth},teamsTime,function(){
        if(parseInt(teamsList.css("left"))>=0){
            teamsList.css("left",-teamsWidth*teamsLength);
            //alert(teamsWidth*teamsLength);
        }
    });
});

btnRight.bind('click',function(){
    teamsList.stop(true,true).animate({left:parseInt(teamsList.css("left"))-teamsWidth},teamsTime,function(){

        if(parseInt(teamsList.css("left"))<=-teamsWidth*teamsLength){
            teamsList.css("left",0);
        }
    });

});


var timer = null; function do_click(event) {
    clearTimeout(timer); // 这里加一句是为了兼容 Gecko 的浏览器 /
    if (event.detail == 2)
        return ;
// 同上句的作用
    timer = setTimeout(function() {
// click 事件的处理
    }, 1000);
}
function do_dblclick(event) {
    clearTimeout(timer);
// dblclick 事件的处理
}


