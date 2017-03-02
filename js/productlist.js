/*
* @Author: Marte
* @Date:   2017-02-05 11:40:48
* @Last Modified by:   Marte
* @Last Modified time: 2017-02-11 11:24:27
*/

'use strict';
$(function(){
    var categoryId=getQueryString('categoryid')||0;
    var pageId=getQueryString('pageid')||1;

    getCategory(categoryId);
    setProductlist(categoryId,pageId);

    function getCategory(categoryId){
        $.ajax({
            url:'http://mmb.ittun.com/api/getcategorybyid?categoryid='+categoryId,
            success:function(data){
                console.log(data);
            console.log(data.result[0].category);
            var html=template('categoryTitletmp',data);
            $('.breadcrumb').html(html);
            // $('#productlist>.category-title>.breadcrumb').html(data.result[0].category);//这种方式就只能获取到category那一个元素，但是我们的模板不是这样子的。
            }
        })
    }

   function setProductlist(categoryId,pageId){
        $.ajax({
            url:'http://mmb.ittun.com/api/getproductlist',
            data:{
                'categoryid':categoryId,
                'pageid':pageId||1
            },
            success:function(data){
                console.log(data);
                var html=template('producttmp',data);
                $('.product').html(html);

                var page=Math.ceil(data.totalCount/data.pagesize);
                console.log(page);
                var pageli='';
                for(var i=0;i<page;i++){
                    var url='productlist.html?categoryid='+categoryId+'&pageid='+(i+1);
                    pageli+='<li><a href='+url+'>第'+(i+1)+'/'+page+'页</a></li>';
                }

                $('#dLabel').html("第"+pageId+"页"+"<span class='caret'></span>");

                    var previd=(pageId-1)>0?(pageId-1):1;
                    var nextid=(parseInt(pageId)+1)<page?(parseInt(pageId)+1):page;

                    var prevurl='productlist.html?categoryid='+categoryId+'&pageid='+previd;
                    var nexturl='productlist.html?categoryid='+categoryId+'&pageid='+nextid;
                    console.log(prevurl)
                    $('.productoption>.page-prev').attr('href',prevurl);
                    $('.productoption>.page-next').attr('href',nexturl);

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