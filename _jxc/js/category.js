/**
 * 카테고리 마우스 오버 이미지
 * 카테고리 서브 메뉴 출력
 */

 $(document).ready(function(){

 	var methods = {
 		aCategory    : [],
 		aSubCategory : {},

 		get: function()
 		{
 			$.ajax({
 				url : '/exec/front/Product/SubCategory',
 				dataType: 'json',
 				success: function(aData) {

 					if (aData == null || aData == 'undefined') return;
 					for (var i=0; i<aData.length; i++)
 					{
 						var sParentCateNo = aData[i].parent_cate_no;

 						if (!methods.aSubCategory[sParentCateNo]) {
 							methods.aSubCategory[sParentCateNo] = [];
 						}

 						methods.aSubCategory[sParentCateNo].push( aData[i] );
 					}
 				}
 			});
 		},

 		getParam: function(sUrl, sKey) {

 			var aUrl         = sUrl.split('?');
 			var sQueryString = aUrl[1];
 			var aParam       = {};

 			if (sQueryString) {
 				var aFields = sQueryString.split("&");
 				var aField  = [];
 				for (var i=0; i<aFields.length; i++) {
 					aField = aFields[i].split('=');
 					aParam[aField[0]] = aField[1];
 				}
 			}
 			return sKey ? aParam[sKey] : aParam;
 		},

 		getParamSeo: function(sUrl) {
 			var aUrl         = sUrl.split('/');
 			return aUrl[3] ? aUrl[3] : null;
 		},

 		show: function(overNode, iCateNo) {

 			if (methods.aSubCategory[iCateNo].length == 0) {
 				return;
 			}

 			var aHtml = [];
 			aHtml.push('<ul>');
 			$(methods.aSubCategory[iCateNo]).each(function() {
 				aHtml.push('<li><a href="'+this.link_product_list+'">'+this.name+'</a></li>');
 			});
 			aHtml.push('</ul>');


 			var offset = $(overNode).offset();
 			$('<div class="sub-category"></div>')
 			.appendTo(overNode)
 			.html(aHtml.join(''))
 			.find('li').mouseover(function(e) {
 				$(this).addClass('over');
 			}).mouseout(function(e) {
 				$(this).removeClass('over');
 			});
 		},

 		close: function() {
 			$('.sub-category').remove();
 		}
 	};

 	methods.get();


 	$('.xans-layout-category li').mouseenter(function(e) {
 		var $this = $(this).addClass('on'),
 		iCateNo = Number(methods.getParam($this.find('a').attr('href'), 'cate_no'));

 		if (!iCateNo) {
 			iCateNo = Number(methods.getParamSeo($this.find('a').attr('href')));
 		}

 		if (!iCateNo) {
 			return;
 		}

 		methods.show($this, iCateNo);
 	}).mouseleave(function(e) {
 		$(this).removeClass('on');

 		methods.close();
 	});
 });



 /*$(document).ready(function(){

 	var json = null;
 	getSubcategory();

 	function getSubcategory() {
 		$.ajax({
 			url : '/exec/front/Product/SubCategory',
 			dataType: 'json',
 			async: true,
 			success: function(aData) {

 				if (aData == null || aData == 'undefined')
 					return;
 				json = aData;

 				displayCategory();
 			}
 		});
 	}

 	var category_count = 0;

 	function displayCategory() {
 		for (var i=0; i<json.length; i++) {
 			if (json[i].parent_cate_no == 1) {
 				$(".position>ul>li").eq(category_count).append('<ul class="sub_category"></ul>');
 				displaySub($(".position>ul>li").eq(category_count).find(".sub_category"), json[i].cate_no);
 				category_count++;
 			}
 		}
 		$('.position>ul>li').each(function() {
 			if($(this).find('ul.sub_category li').length==0) {
 				$(this).addClass('cateNo');
 			}
 		});
 	}

 	function displaySub(cat, pNo) {
 		for (var i=0; i<json.length; i++) {
 			if (json[i].parent_cate_no == pNo) {
 				cat.append('<li><a href="/product/list.html'+json[i].param+'">'+json[i].name+'</a></li>');
 				cat.append('<li><a href="/product/list.html'+json[i].param+'">'+json[i].name+'</a><div class="sub"></div></li>');
 				cat.find('.sub').append('<div class="subsub_category"></div>');
 				displaySubSub(cat.find('.sub').find('.subsub_category'), json[i].cate_no);
 			}
 		}
 	}

 	function displaySubSub(sub_cat, pNo) {
 		for (var i=0; i<json.length; i++) {
 			if (json[i].parent_cate_no == pNo) {
 				sub_cat.append('<a href="/product/list.html'+json[i].param+'"></a><div class="subsub">'+json[i].name+'</div>');
 			}
 		}
 	}

});*/