/*
* @Author: Marte
* @Date:   2017-02-08 20:50:05
* @Last Modified by:   Marte
* @Last Modified time: 2017-02-11 11:24:34
*/

'use strict';

$(function(){
    $.ajax({
        url:'http://mmb.ittun.com/api/getsitenav',
        success:function(data){
            console.log(data);
            var html=template('sitetmp',data);
            $('.bigtp').html(html);
        }
    })
})