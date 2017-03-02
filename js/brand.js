/*
* @Author: Marte
* @Date:   2017-02-10 11:39:40
* @Last Modified by:   Marte
* @Last Modified time: 2017-02-11 11:22:38
*/

'use strict';

$(function(){
    var brandtitleid=getQueryString('brandtitleid');
    console.log(brandtitleid);

    getbrandtitle(brandtitleid);
    getbrandarea(brandtitleid);
    function getbrandtitle(brandtitleid){
        $.ajax({
        url:'http://mmb.ittun.com/api/getbrand',
        data:{
            'brandtitleid':brandtitleid
        },
        success:function(data){
            // console.log(data);
            var html=template('brandtmp',data);
            $('.areaone').html(html);
        }
    })
}

function getbrandarea(brandtitleid){
        $.ajax({
            url:'http://mmb.ittun.com/api/getbrandproductlist',
            data:{
                'brandtitleid':brandtitleid,
                'pagesize':4
            },
            success:function(data){
                console.log(data);
                var html=template('areatmp',data);
                $('.areatwo').html(html);

                 $('.areatwo>ul>li>a').on('click',function(){
                    // alert(123);
                    var productid=$(this).data('productid');
                    console.log(productid);
                    getareaall(data.result[productid]);

                })

            }
        })
}



function getareaall(product){
    $.ajax({
        url:'http://mmb.ittun.com/api/getproductcom',
        data:{
            'productid':product.productId
        },
        success:function(data){
            console.log(data);
            data={
                'productImg':product.productImg,
                'productName':product.productName,
                'productContent':product.productContent,
                'result':data.result
            };
            console.log(data);
            var html=template('areaalltmp',data);

            $('.areathree').html(html);
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