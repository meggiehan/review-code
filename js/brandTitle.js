/*
* @Author: Marte
* @Date:   2017-02-10 10:44:06
* @Last Modified by:   Marte
* @Last Modified time: 2017-02-11 15:34:06
*/

'use strict';
$(function(){
    getbrandtitle();
    function getbrandtitle(){
        $.ajax({
        url:'http://mmb.ittun.com/api/getbrandtitle',
        success:function(data){
            console.log(data);
            var html=template('brandtitletmp',data);
            $('#brandtitle').html(html);
        }
    })
    }
})