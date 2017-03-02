/*
* @Author: Marte
* @Date:   2017-02-05 20:13:17
* @Last Modified by:   Marte
* @Last Modified time: 2017-02-11 11:22:19
*/

'use strict';
$(function(){
    var productid=getQueryString('productid');
    console.log(productid);
   getproduct(productid);
   function getproduct(productid){
     $.ajax({
        url:'http://mmb.ittun.com/api/getproduct',
        data:{
            "productid":productid
        },
        success:function(data){
            // console.log(data);
            var html=template('productinfotmp',data);
            // console.log(html);
            $('.productinfo').html(html);
             getproductcom(productid);
        }
     })
   }

   function getproductcom(productid){
        $.ajax({
            url:'http://mmb.ittun.com/api/getproductcom',
            data:{
                "productid":productid
            },
            success:function(data){
                var html=template('productcomtmp',data);
                $('.productcom').html(html);
                $('.tokelist>.more>.morein').on('click',function(){
                    $('.productcom>ul>li:nth-last-child(-n+3)').toggle(200);
                })
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