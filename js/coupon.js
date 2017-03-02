/*
* @Author: Marte
* @Date:   2017-02-07 17:43:18
* @Last Modified by:   Marte
* @Last Modified time: 2017-02-11 11:23:01
*/

'use strict';
$(function(){
    getcoupontitle();
    function getcoupontitle(){
        $.ajax({
            url:'http://mmb.ittun.com/api/getcoupon',
            success:function(data){
                console.log(data);
                var html=template('conpontmp',data);
                $('.juan').html(html);
            }

        })
    }
})