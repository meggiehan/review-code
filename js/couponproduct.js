/*
* @Author: Marte
* @Date:   2017-02-07 19:21:39
* @Last Modified by:   Marte
* @Last Modified time: 2017-02-11 11:23:11
*/

'use strict';

$(function(){
    var couponid=getQueryString('couponid') || 0;
    console.log(couponid);
    getcouponproduct(couponid);
    // cover();
    function getcouponproduct(couponid){
        $.ajax({
            url:'http://mmb.ittun.com/api/getcouponproduct',
            data:{
                'couponid':couponid
            },
            success:function(data){
                console.log(data);
                var html=template('conponproducttmp',data);
                $('.eat').html(html);
                cover();
                esc();
            }
        })
    }


     function getQueryString(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2]);
        }
        return null;
    }


    function cover(){
       $('.eat>.tp>.tp-left').on('click',function(){
         // $("#zz").css({"position":"fixed","top":0,"z-index":100});
         $("#zz").css({"position":"fixed","top":0,'display':'block'});
         $('#zz>.banner').css({'display':'block'});
         // $('#zz').addClass('zhezhao');
         // $('#zz').style.display='block';


         var ul=$('#zz>.banner>.all');
         console.log(ul)
         var lis=ul.children();
         // console.log(lis);
         console.log(lis.length);
         var imgwidth=$('#zz>.banner>ul>li>img').width();
         console.log(imgwidth);
         var pic=0;
        $('#zz>.banner>#arr>#right').on('click',function(){
            // alert(123);
            console.log(pic)
            if(pic===lis.length-1){
                return;
            }
            pic++;
            var target=-pic*imgwidth;
            console.log(target)
            animate(ul,target);
            // console.log(target);
         })

        $('#zz>.banner>#arr>#left').on('click',function(){
            // alert(123);
            if(pic===0){
                return;
            }
            pic--;
            var target=-pic*imgwidth;
            animate(ul,target);
            console.log(target);
         })
         return false;
         })
    }

    function esc(){
        $('.eat>.tp>.tp-left').on('click',function(){
         $("#zz").css({"position":"fixed","top":0,"z-index":100});
         $('#zz>.btn').css({'display':'block'});

         $('#zz>.btn').on('click',function(){
             // $("#zz").css({"position":"fixed","top":0,"z-index":-100,'background':'none'});
             $("#zz").css({"position":"fixed","top":0,'display':'none'});
              $('#zz>.banner').css({'display':'none'});
              $(this).css({'display':'none'});
              cover();
         })
         return false;
    })
    }

     function animate(obj, target) {
        clearInterval(obj.timer);
        obj.timer = setInterval(function () {
            var leader = obj.width();
            var step = 30;
            step = leader < target ? step : -step;

            if (Math.abs(target + leader) >= Math.abs(step)) {
                 obj.css({'left':target+'px'});
            } else {
               leader = leader + step;
                // obj.css({'transform':'translateX('+leader+'px)'});
                obj.css({'left':leader+'px'});
                clearInterval(obj.timer);
            }
        }, 15);
    }


})

