/*
* @Author: Marte
* @Date:   2017-02-08 14:25:23
* @Last Modified by:   Marte
* @Last Modified time: 2017-02-11 11:23:47
*/

'use strict';

$(function(){

    var shopid=getQueryString('shopid') || 0;
    var areaid=getQueryString('areaid') || 0;
    getshop();
    getarea();
    getgslist(shopid,areaid);

    function getshop(){
        $.ajax({
            url:'http://mmb.ittun.com/api/getgsshop',
            success:function(data){
                console.log(data);
                var html=template('gsshoptmp',data);
                $('#shop').html(html);
                $('.title>ul>li').eq(0).on('click',function(){
                $('.gsall>.gslist>.gsnav>.popsort').toggle();
                })

                $('#shop>ul>li>a').on('click',function(){
                   shopid = $(this).data('shopid');
                   console.log(shopid);
                   var shopName = $(this).html();
                   console.log(this);
                   console.log(shopName);
                   $('.title > ul >li').eq(0).html('<a href=>'+shopName + '<i></i></a>');
                   getgslist(shopid,areaid);
                })
            }
        })
    }


    function getarea(){
        $.ajax({
            url:'http://mmb.ittun.com/api/getgsshoparea',
            success:function(data){
                console.log(data);
                var html=template('gsareatmp',data);
                $('#area').html(html);
                $('.title>ul>li').eq(1).on('click',function(){
                $('.gsall>.gslist>.gsnav>.popcat').toggle();
                })

                 $('#area>ul>li>a').on('click',function(){
                   var areaid = $(this).data("areaid");
                    console.log(areaid);
                   var areaName = $(this).html();
                   console.log(areaName);
                   $('.title > ul >li').eq(1).html('<a href=>'+areaName.split("（")[0] + "<i></i></a>");
                   getgslist(shopid,areaid);
                })
            }
        })
    }


    function getgslist(shopid,areaid){
        $.ajax({
            url:'http://mmb.ittun.com/api/getgsproduct',
            data:{
                'shopid':shopid,
                'areaid':areaid
            },
            success:function(data){
                console.log(data);
                var html=template('gstmp',data);
                $('.gslists').html(html);
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