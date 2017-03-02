/*
* @Author: Marte
* @Date:   2017-02-04 19:33:48
* @Last Modified by:   Marte
* @Last Modified time: 2017-02-11 11:22:56
*/

'use strict';
$(function(){
    setCategory();
     function setCategory(){
        $.ajax({
        url:'http://mmb.ittun.com/api/getcategorytitle',
        success:function(data){
            var html=template('categorytmp',data);
            $('#category>.panel-group').html(html);
            var categorytitle=$('#category>.panel-group>.panel-default>.panel-heading>h4>a');
            categorytitle.on('click',function(e){
                var titleId=$(this).data('titleid');
                $.ajax({
                    url:'http://mmb.ittun.com/api/getcategory?titleid='+titleId,
                    success:function(data){
                        var html=template('categorylisttmp',data);
                        var panelBody=$(e.target).parent().parent().parent().find('.panel-collapse').find('.panel-body');
                        panelBody.html(html);
                        // console.log(panelBody);
                        // var categoryList=panelBody.find('.row>div');
                        // var count=categoryList.length % 3 || 3;
                        // panelBody.find('.row>div:nth-last-child(-n'+count+')').css('border-bottom','0');
                    }
                })
            })
         }
      })
    }
})