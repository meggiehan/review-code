/*
* @Author: Marte
* @Date:   2017-02-06 18:08:06
* @Last Modified by:   Marte
* @Last Modified time: 2017-02-11 11:23:20
*/

// 'use strict';
$(function(){
    var productid=getQueryString('productid') || 0;
    console.log(productid);
    getproductmore(productid);
    function getproductmore(productid){
        $.ajax({
            url:'http://mmb.ittun.com/api/getdiscountproduct',
            data:{
                'productid':productid
            },
            success:function(data){
                console.log(data);
                var html=template('productmoretmp',data);
                $('#productmore').html(html);
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
