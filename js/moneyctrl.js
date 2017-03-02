/*
* @Author: Marte
* @Date:   2017-02-06 11:06:01
* @Last Modified by:   Marte
* @Last Modified time: 2017-02-11 11:24:13
*/

'use strict';

$(function(){
    var pageId=getQueryString('pageid')||1;
    getproductlistall(pageId);
    function getproductlistall(pageId){
        $.ajax({
            url:'http://mmb.ittun.com/api/getmoneyctrl',
            data:{
                'pageid':pageId
            },
            success:function(data){
                console.log(data);
                var html=template('productlistalltmp',data);
                $('#productlist').html(html);

                var page=Math.ceil(data.totalCount/data.pagesize);
                var pageli='';

                for(var i=0;i<page;i++){
                    var url='moneyctrl.html?pageid'+(i+1);
                    pageli+='<li><a href='+url+'>'+(i+1)+'/'+page+'页</a></li>';
                }
                    $('#dLabel').html('第'+pageId+"页"+"<span class='caret'></span>");

                    var previd=(pageId-1)>0?(pageId-1):1;
                    var nextid=(parseInt(pageId)+1)<page?(parseInt(pageId)+1):page;

                    var prevurl='moneyctrl.html?pageid='+previd;
                    var nexturl='moneyctrl.html?pageid='+nextid;

                    $('.page-prev').attr('href',prevurl);
                    $('.page-next').attr('href',nexturl);

                    $('.dropdown-menu').html(pageli);
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