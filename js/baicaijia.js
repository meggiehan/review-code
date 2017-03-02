/*
* @Author: Marte
* @Date:   2017-02-06 21:44:37
* @Last Modified by:   Marte
* @Last Modified time: 2017-02-11 11:22:05
*/

'use strict';

$(function(){
    var titleid=getQueryString('titleid')||0;
    getbcjtitle();
    function getbcjtitle(){
        $.ajax({
            url:'http://mmb.ittun.com/api/getbaicaijiatitle',
            success:function(data){
                // console.log(data);
                var html=template('bcjtitletmp',data);
                $('.bcj-title>ul').html(html);
                $('.bcj-title').find('ul>li').eq(0).addClass('active');

                var ulwidth=0;
                var lis=$('.bcj-title').find('ul>li');
                for(var i=0;i<lis.length;i++){
                    ulwidth+=$(lis[i]).width();
                }
                $('.bcj-title>ul').css('width',ulwidth+'px');
                setswipe();
                getbcjlist(titleid);
            }
        })
    }



    function getbcjlist(titleid){
        $.ajax({
            url:'http://mmb.ittun.com/api/getbaicaijiaproduct',
            data:{
                'titleid':titleid
            },
            success:function(data){
            // console.log(data);
            var html=template('bcjtmp',data);
            //console.log(html);
            $('.bcj-list').html(html);
            }
        })
    }

        /**
         * 1. 实现当在 白菜价标题区域滑动的时候 要改变 ul的 位移的值  调整 ul的translateX
         * 2. 如果是从右往左滑动 ul的translateX 是负值  - 滑动的距离  50px
         * 3. 如果是从左往右滑动是正值   +50px
         * 4. 当滑动超过最大滑动位置 和最小滑动位置就不让滑了
         * 5. 当超过最大的位移的位置 就要回到最大的位移位置
         * 6. 当超过最小的位移的位置 就要回到最小的位移位置
         */


    function setswipe(){
         $('.bcj-title').find('ul>li>a').on('click',function(){
         $('.bcj-title').find('ul>li').removeClass('active');
         $(this).parent().addClass('active');
         var thistitleid=$(this).data('titleid');
         console.log(thistitleid);

         var navs=$('.bcj-title').find('ul>li');
         var swipeleft=0;

         for(var i=0;i<thistitleid;i++){
            swipeleft-=$(navs[i]).width();
         }
         console.log(swipeleft);
         if(swipeleft>minposition){
            //如果说我现在滑动的赋值距离是在可以允许滑动的距离内，那么我就允许动态设置位置。
            swipeul.css('transform','translateX('+swipeleft+'px)');
            swipeul.css('transition','all 0.2s');
        }else{
            //如果超过了，那么我就让他直接等于这个距离。
            swipeleft=minposition;
            swipeul.css('transform','translateX('+swipeleft+'px)');
            swipeul.css('transition','all 0.2s');
        }
        currentX=swipeleft;
        getbcjlist(thistitleid);
   });


         var startX,endX,moveX;
         var currentX=0;
         var distanceX=0;
         var maxswipe=0+50;
         var minswipe=$('.bcj-title').width()-$('.bcj-title>ul').width()-50;
         //盒子的宽度-ul的总宽度，那么就是我们可以滑动的距离范围。
         var maxposition=0;
         var minposition=$('.bcj-title').width()-$('.bcj-title>ul').width();

         var swipeul=$('.bcj-title').find('ul');

         $('.bcj-title').on('touchstart',function(e){
            startX=e.originalEvent.touches[0].clientX;
         })

         $('.bcj-title').on('touchmove',function(e){
            moveX=e.originalEvent.touches[0].clientX;
            distanceX=moveX-startX;
            //如果说我们移动的距离是小于最大的滑动区间同时又大于最小的滑动区间的时候，我们就允许他可以滑动。
            if((currentX+distanceX)<maxswipe && (currentX+distanceX)>minswipe){
                swipeul.css('transform','translateX('+(currentX+distanceX)+'px)');
                swipeul.css('transition','none');
            }
         })

        //这里是设置当我们滑动到不能滑动的区间时，松开手的瞬间弹回去。
         $('.bcj-title').on('touchend',function(e){
            endX=e.originalEvent.changedTouches[0].clientX;
            currentX+=distanceX;

            if(currentX>maxposition){
                currentX=maxposition;
                swipeul.css('transform','translateX('+currentX+'px)');
                swipeul.css('transition','all 0.2s');
            }
            else if(currentX<minposition){
                currentX=minposition;
                swipeul.css('transform','translateX('+currentX+'px)');
                swipeul.css('transition','all 0.2s');
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
})