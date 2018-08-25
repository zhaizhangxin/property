// JavaScript Document

<!-- 
/*tab切换脚本*/ 
function setTab(name,cursel,n){ 
for(i=1;i<=n;i++){ 
var menu=document.getElementById(name+i); 
var con=document.getElementById("tab_"+name+"_"+i); 
menu.className=i==cursel?"tabfirst":""; 
con.style.display=i==cursel?"block":"none"; 
} 
}

<!-- 
/*tab切换脚本*/ 
function setTaba(name,cursel,n){ 
for(i=1;i<=n;i++){ 
var menu=document.getElementById(name+i); 
var con=document.getElementById("tab_"+name+"_"+i); 
menu.className=i==cursel?"tabfirst_a":""; 
con.style.display=i==cursel?"block":"none"; 
} 
}

/*友情链接弹出窗口*/ 
function FriendLink(ddlFL)
{
    var winlink = ddlFL.value;
    
    if ( winlink != 0)
    {
        window.open (winlink);
    }
}

/*图片按比例缩小*/ 
var flag=false; 

function DrawImagea(ImgD,FitWidth,FitHeight){    
  var image=new Image();    
  image.src=ImgD.src; 
  
  if(image.width>0 && image.height>0){     
    flag=true;     
    if(image.width/image.height>= FitWidth/FitHeight){      
      if(image.width>FitWidth){        
        ImgD.width=FitWidth;      
	    ImgD.height=(image.height*FitWidth)/image.width;      
      }else{      
        ImgD.width=image.width;        
	    ImgD.height=image.height;      
      }      
      //ImgD.alt="点击图片放大("+image.width+"×"+image.height+")";      
    }else{      
      if(image.height>FitHeight){        
        ImgD.height=FitHeight;      
	    ImgD.width=(image.width*FitHeight)/image.height;          
      }else{      
        ImgD.width=image.width;        
	    ImgD.height=image.height;      
      }      
        //ImgD.alt="点击图片放大("+image.width+"×"+image.height+")";      
      }     
    } 
  }
//--> 
