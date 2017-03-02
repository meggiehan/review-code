/*
* @Author: Marte
* @Date:   2017-02-06 14:33:29
* @Last Modified by:   Marte
* @Last Modified time: 2017-02-11 11:24:04
*/

'use strict';

// $(function(){
//     getinlandlist();
//     function getinlandlist(){
//         $.ajax({
//             url:'http://192.168.37.46:3000/api/getinlanddiscount',
//             success:function(data){
//                 var html=template('inlandtmp',data);
//                 $('#productlist').html(html);
//             }
//         })
//     }

// })

$(function(){
        var i=0;
        var data1={};
        var resultLength=0;
        $.ajax({
            url:'http://mmb.ittun.com/api/getinlanddiscount',
            success:function(data){
                data1=data;
                var newdata={
                    'result':[]
                };
                for(i=0;i<4;i++){
                    newdata.result.push(data.result[i]);
                }
                var html=template('inlandtmp',newdata);
                $('#productlist').html(html);
                height=$('#productlist').height() - $(document.body).height();
                console.log(height);
                resultLength=data.result.length;
                $('.loading').hide();
            }
        });

        var scrollTop=$(window).scrollTop();
        var height=$('#productlist').height() - $(document.body).height();
        console.log(height);
        $(window).on('scroll',function(){
        scrollTop=$(window).scrollTop();

        console.log(scrollTop + "================" + height);
        if(scrollTop>=height && scrollTop!=0){
            height=99999;
            $('.loading').show();
            $.ajax({
                url:'http://mmb.ittun.com/api/getinlanddiscount',
            success:function(data){
                console.log(data);
                var newdata={
                    'result':[]
                };

                if(i>=resultLength){
                    $('.loading').hide();
                    return;
                }

                for(var j=i;j<i+4;j++){
                    newdata.result.push(data.result[j]);
                }
                var html=template('inlandtmp',newdata);
                $('#productlist').append(html);
                height=$('#productlist').height() - $(document.body).height();
                i=j;
                console.log(height);
                $('.loading').hide();
               }
              })
             }
        })
})
