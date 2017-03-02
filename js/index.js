/*
* @Author: Marte
* @Date:   2017-02-04 15:12:06
* @Last Modified by:   Marte
* @Last Modified time: 2017-02-11 16:50:13
*/

'use strict';
$(function(){
    getmeau();
      function getmeau(){
        $.ajax({
            url:'http://mmb.ittun.com/api/getindexmenu',
            success:function(data){
                var html=template('meautmp',data);
                $('#meau').html(html);
                $('#meau>.row>div:nth-child(8)').on('click',function(){
                    $('#meau>.row>div:nth-last-child(-n+4)').toggle(200);
                })
            }
        })
      }
    getRecommen();
      function getRecommen(){
        $.ajax({
            url:'http://mmb.ittun.com/api/getmoneyctrl',
            success:function(data){
                var html=template('recommentmp',data);
                console.log(html);
                $('#recommen-list').html(html);
                $('#recommen>.recommen-more>a').on('click',function(){
                    $('#recommen-list>div:nth-last-child(-n+5)').toggle(200);
                })
            }
        })
      }
})