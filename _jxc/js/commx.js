var jXCOMMX = (function ($) {


	openLayer = function (event, obj, focus) {
		var checkObject = typeof obj == 'object',
			$tar = checkObject ? $($(obj).attr('href')) : $(obj),
			$tar = $tar.closest('.dim_layer').is('div:not(.alert)') ? $tar.closest('.dim_layer') : $tar;
		$focus = checkObject ? $(obj) : $(focus),
			closeID = $tar.hasClass('dim_layer') ? $tar.find('.wrap_layer').attr('id') : $tar.attr('id'),
			evt = event;
		$tar.data('focus', $focus);
		if ($tar.closest('.dim_layer')[0]) {
			$('body').css('overflow', 'hidden');
		};
		if ($tar.hasClass('alert_layer')) {
			if (event) {
				$tar.find('.btn_cancel, .btn_close').on('click', function (e) {
					$tar.data('off', $(this));
					closeLayer('#' + closeID);
				});
			}
			$tar.removeClass('hide').find('.btn_confirm').focus();
			if (mCheck() && !$('#dimM')[0]) {
				$('body').append('<div id="dimM" />');
			}
		} else {
			$tar.removeClass('hide').find('.btn_close').on('click', function (e) {
				$tar.data('off', $(this));
				closeLayer('#' + closeID);
			}).focus();
			function layerResize() {
				var a = $tar.find('.wrap_layer').outerHeight() + 100,
					b = $(window).height();
				if (a > b) {
					$tar.addClass('scroll');
				} else {
					$tar.removeClass('scroll');
				}
			}
			if ($tar.is('.dim_layer:not(.search_layer)')) {
				layerResize();
				$(window).on('resize.dimLayer', layerResize);
			}
		};
	},
	closeLayer = function (tar) {
		var $tar = $(tar).closest('.dim_layer').is('div') ? $(tar).closest('.dim_layer') : $(tar);
		$tar.addClass('hide');
		if ($tar.data('off')) {
			$tar.data('off').off('click');
		};
		if ($tar.data('focus')) {
			$tar.data('focus').focus();
		};
		if ($tar.hasClass('dim_layer')) {
			$tar.removeClass('scroll');
			$(window).off('resize.dimLayer');
		}
		if ($tar.hasClass('alert')) {
			$tar.remove();
		}
		$('body').removeAttr('style');
		if (mCheck()) {
			$('#dimM').remove();
		}
	}


	var jQuery = $;

	ROOT = function () {
		ROOT.pageSet.init();
		ROOT.commx.init();
		ROOT.layout.init();
		ROOT.main.init();
		ROOT.product.init();
		ROOT.detail.init();
		ROOT.board.init();
		ROOT.animate.init();
	}

	ROOT.pageSet = {
		init: function () {
			ROOT.pageSet.set();
		},
		set: function () {
			var $body = $('body');

			var $templateSet = $('hr.template_set');
			var $thisTemplate = $templateSet.data('template');
			var $thisPage = $templateSet.data('pg');
			var $thisPageClass = $templateSet.data('pg-class');
			var $thisPageBoardType = $templateSet.data('board-type');

			$body.addClass($thisTemplate);
			$body.addClass($thisPage);
			$body.addClass($thisPageClass);

			if ($('.xans-board-listpackage').length > 0 || $('.xans-board-inquirylist').length > 0) {
				$body.addClass('board_list');
			}
			if ($('.xans-board-readpackage').length > 0) {
				$body.addClass('board_read');
			}
			if ($('.xans-board-modifypackage').length > 0) {
				$body.addClass('board_modify');
			}
			if ($('.xans-board-writepackage').length > 0) {
				$body.addClass('board_write');
			}
			if ($('.xans-board-replypackage').length > 0) {
				$body.addClass('board_reply');
			}
			if ($('.xans-board-securepackage').length > 0) {
				$body.addClass('board_secure');
			}
			if ($('.xans-board-commentdeletepackage').length > 0) {
				$body.addClass('board_comment');
			}

			$body.addClass($thisPageBoardType);
			$templateSet.remove();
		}
	}

	ROOT.commx = {
		init: function () {
			ROOT.commx.bannerManage();
			ROOT.commx.couponSkinArea();
		},
		bannerManage: function () {
			var $bannerManage = $('.bannermanage');
			var $bannerManageItem = $('.bannermanage').find('.item');
			if ($bannerManage.length > 0) {
				$bannerManageItem.addClass('invisible').hide();
				$bannerManage.each(function () {
					var maxItem = $(this).data('max-itme');
					for (var i = 0; i < maxItem; i++) {
						$(this).find('.item').eq(i).removeClass('invisible').show();
					};
				});
				$bannerManage.find('.invisible').remove();
			};
		},
		couponSkinArea: function () {
			setTimeout(function () {
				$('.couponSkinArea .box .coupon').each(function () {
					if (!$(this).hasClass('imgCoupon')) {
						$(this).addClass('custom');
					}
				});
				$('.couponSkinArea .box .coupon').fadeIn(300);
			}, 300);
		}
	}

	ROOT.layout = {
		init: function () {
			ROOT.layout.topBanner();
			ROOT.layout.headerSticky();
			ROOT.layout.headerGnb();
			ROOT.layout.pagePath();
			ROOT.layout.pageSnb();
			ROOT.layout.pageTop();
			ROOT.layout.bottomBanner();
		},
		topBanner: function () {
			var $topBanner = $('#topBanner');
			if ($topBanner.find('.bannermanage2-none-info').length) {
				$topBanner.remove();
			} else {
				$topBanner.on('click', '.close', function () {
					$('#topBanner').slideUp(300);
				});
			}
		},
		headerSticky: function () {
			var $header = $('#header');
			var $headerFixed = $header.offset().top - 0;
			var headerSticky = function () {
				var scrollTop = $(window).scrollTop();
				if (scrollTop > $headerFixed) {
					$header.addClass('sticky');
					$header.find('.fixed').css({ 'height': 84 });
				} else {
					$header.removeClass('sticky');
					$header.find('.fixed').css({ 'height': 120 });
				}
			};
			headerSticky();
			$(window).scroll(function () {
				headerSticky();
			});
		},
		headerGnb: function () {
			var $header = $('#header');
			var $headerFixed = $header.find('.fixed');
			var $gnb = $('#gnb');
			var $gnbLevel1 = $gnb.find('.level1');
			var $gnbLevel1Link = $gnbLevel1.find('>a');
			var $gnbLevel2 = $gnb.find('.level12');
			var $gnbBanner = $gnb.find('.banner');
			var stickyOn = function () {
				if ($header.hasClass('sticky')) {
					headH = 84;
				} else {
					headH = 120;
				}
			}
			$gnbLevel1Link.on('mouseenter', function () {
				var $currentLevel = $(this).parent().find('.level2');
				var levelHeight = $currentLevel.height();
				$gnbLevel1.removeClass('on');
				$('#gnb .level2').hide();
				stickyOn();
				$gnb.addClass('is-active');
				$headerFixed.addClass('is-active');
				$(this).parent().addClass('on');
				$currentLevel.fadeIn();
				TweenMax.to($headerFixed, 0.3, { height: headH });
				TweenMax.to($gnbBanner, 0.3, { alpha: 10, display: 'block', paddingTop: levelHeight });
			});
			$gnb.on('mouseleave', function () {
				$gnb.removeClass('is-active');
				$headerFixed.removeClass('is-active');
				$gnbLevel1.removeClass('on');
				$header.find('.level2').hide();
				stickyOn();
				TweenMax.to($headerFixed, 0.3, { height: headH });
				TweenMax.to($gnbBanner, 0.3, { alpha: 0, display: 'none', paddingTop: 0 });
			});
		},
		pagePath: function () {
			$('.path li').each(function (index) {
				var number = index + 1;
				$(this).addClass('depth' + number);
			});
		},
		pageSnb: function () {
			var $body = $('body');
			var loc = document.location.href;
			var $pgTitle = $('.pg_top .title_h2 h2');

			if ($('.brand_').length > 0) {
				$pgTitle.find('strong').text('Brand');
			}

			if ($('.event_').length > 0) {
				$pgTitle.find('strong').text('Event');
				var sEventHtml = "";
				sEventHtml += '<div class="snb_">';
				sEventHtml += '<ul class="ul_">';
				sEventHtml += '<li><a href="/board/event/list.html?board_no=2&category_no=1"><span>진행중 이벤트</span></a></li>';
				sEventHtml += '<li><a href="/board/event/list.html?board_no=2&category_no=2"><span>종료된 이벤트</span></a></li>';
				sEventHtml += '</ul>';
				sEventHtml += '</div>';
				$('.titleArea').after(sEventHtml);
				if ((loc.indexOf('category_no=1') > -1)) {
					$('.snb_>ul>li').eq(0).addClass('selected');
				} else {
					$('.snb_>ul>li').eq(1).addClass('selected');
				}
			}

			if ($('.press_').length > 0) {
				$pgTitle.find('strong').text('Press');
				var sPressHtml = "";
				sPressHtml += '<div class="snb_">';
				sPressHtml += '<ul class="ul_">';
				sPressHtml += '<li><a href="/board/notice/list.html?board_no=1"><span>Notice</span></a></li>';
				sPressHtml += '<li><a href="/board/media/list.html?board_no=5"><span>Media</span></a></li>';
				sPressHtml += '</ul>';
				sPressHtml += '</div>';
				$('.titleArea').after(sPressHtml);
				if ($('body').hasClass('pg_notice')) {
					$('.snb_>ul>li').eq(0).addClass('selected');
				} else if ($('body').hasClass('pg_media')) {
					$('.snb_>ul>li').eq(1).addClass('selected');
				}
			}

			if ($('.community_').length > 0) {
				$pgTitle.find('strong').text('Community');
				var sCoummunityHtml = "";
				sCoummunityHtml += '<div class="snb_">';
				sCoummunityHtml += '<ul class="ul_">';
				sCoummunityHtml += '<li><a href="/board/product/list.html?board_no=4"><span>Review</span></a></li>';
				sCoummunityHtml += '<li><a href="/board/free/list.html?board_no=3"><span>FAQ</span></a></li>';
				sCoummunityHtml += '<li><a href="/board/product/list.html?board_no=6"><span>Q&A</span></a></li>';
				sCoummunityHtml += '<li><a href="/communityLocation.html"><span>찾아오시는길</span></a></li>';
				sCoummunityHtml += '</ul>';
				sCoummunityHtml += '</div>';
				$('.titleArea').after(sCoummunityHtml);
				if ($('body').hasClass('pg_review')) {
					$('.snb_>ul>li').eq(0).addClass('selected');
				} else if ($('body').hasClass('pg_faq')) {
					$('.snb_>ul>li').eq(1).addClass('selected');
				} else if ($('body').hasClass('pg_qna')) {
					$('.snb_>ul>li').eq(2).addClass('selected');
				} else if ($('body').hasClass('pg_location')) {
					$('.snb_>ul>li').eq(3).addClass('selected');
				}
			}

			if ($body.hasClass('pg_product')) {
				$pgTitle.find('strong').text('Product');
			} else if ($body.hasClass('pg_recent')) {
				$pgTitle.find('strong').text('Recent View');
			} else if ($body.hasClass('pg_search')) {
				$pgTitle.find('strong').text('Search');
			} else if ($body.hasClass('pg_basket')) {
				$pgTitle.find('strong').text('Cart');
			} else if ($body.hasClass('pg_order_from')) {
				$pgTitle.find('strong').text('Order Sheet');
			} else if ($body.hasClass('pg_order_result')) {
				$pgTitle.find('strong').text('Order Complete');
			} else if ($body.hasClass('pg_agreement')) {
				$pgTitle.find('strong').text('Agreement');
			} else if ($body.hasClass('pg_privacy')) {
				$pgTitle.find('strong').text('Privacy');
			} else if ($body.hasClass('pg_guide')) {
				$pgTitle.find('strong').text('Guide');
			} else if ($body.hasClass('pg_coupon_zone')) {
				$pgTitle.find('strong').text('Coupon Zone');
			}

			if ((loc.indexOf('/join.html') > -1) || (loc.indexOf('/join_result.html') > -1) || (loc.indexOf('/member/login.html') > -1) || (loc.indexOf('/find_id.html') > -1) || (loc.indexOf('/find_id_result.html') > -1) || (loc.indexOf('/find_passwd_info.html') > -1) || (loc.indexOf('/find_passwd_question.html') > -1) || (loc.indexOf('/find_passwd_method.html') > -1) || (loc.indexOf('/find_passwd_result.html') > -1) || (loc.indexOf('/passwd_reset.html') > -1) || (loc.indexOf('/front/php/login/login_f.php') > -1)) {
				/*
				/join.html
				/join_result.html
				/member/login.html
				/find_id.html
				/find_id_result.html
				/find_passwd_info.html
				/find_passwd_question.html
				/find_passwd_method.html
				/find_passwd_result.html
				/passwd_reset.html
				/front/php/login/login_f.php
				*/
				$('body').addClass('member_');
				$pgTitle.find('strong').text('Member');
				if ((loc.indexOf('join.html') > -1) || (loc.indexOf('join_result.html') > -1)) {
					$('body.member_').addClass('join');
					$pgTitle.find('strong').text('JOIN');
				} else if ((loc.indexOf('login.html') > -1) || (loc.indexOf('/front/php/login/login_f.php') > -1)) {
					$('body.member_').addClass('login');
					$pgTitle.find('strong').text('LOGIN');
				} else if ((loc.indexOf('order_result.html') > -1)) {
					$('body.member_').addClass('result');
					$pgTitle.find('strong').text('NEWS');
				} else if ((loc.indexOf('find_id.html') > -1)) {
					$('body.member_').addClass('id');
					$pgTitle.find('strong').text('FIND ID');
				} else if ((loc.indexOf('find_id_result.html') > -1)) {
					$('body.member_').addClass('id');
					$pgTitle.find('strong').text('FIND ID');
				} else if ((loc.indexOf('find_passwd_info.html') > -1)) {
					$('body.member_').addClass('passwd');
					$pgTitle.find('strong').text('FIND FASSWORD');
				} else if ((loc.indexOf('find_passwd_question.html') > -1)) {
					$('body.member_').addClass('passwd');
					$pgTitle.find('strong').text('FIND FASSWORD');
				} else if ((loc.indexOf('find_passwd_method.html') > -1)) {
					$('body.member_').addClass('passwd');
					$pgTitle.find('strong').text('FIND FASSWORD');
				} else if ((loc.indexOf('find_passwd_result.html') > -1)) {
					$('body.member_').addClass('passwd');
					$pgTitle.find('strong').text('FIND FASSWORD');
				} else if ((loc.indexOf('passwd_reset.html') > -1)) {
					$('body.member_').addClass('reset');
					$pgTitle.find('strong').text('PASSWORD RESET');
				}
			} else if ((loc.indexOf('/myshop/') > -1) || (loc.indexOf('/board/consult/') > -1) || (loc.indexOf('/modify.html') > -1) || (loc.indexOf('/inquiry/') > -1)) {
				/*
				/myshop/index.html
				/board/consult/
				/modify.html
				/inquiry/
				*/
				$('body').addClass('myshop_');
				$pgTitle.find('strong').text('Myshop');
				var sMyshopHtml = "";
				sMyshopHtml += '<div class="snb_">';
				sMyshopHtml += '<ul class="ul_">';
				sMyshopHtml += '<li><a href="/myshop/index.html"><span>마이페이지 홈</span></a></li>';
				sMyshopHtml += '<li><a href="/myshop/order/list.html"><span>주문내역조회</span></a></li>';
				sMyshopHtml += '<li><a href="/member/modify.html"><span>회원정보</span></a></li>';
				sMyshopHtml += '<li><a href="/myshop/mileage/historyList.html"><span>적립금</span></a></li>';
				sMyshopHtml += '<li><a href="/myshop/wish_list.html"><span>관심 상품</span></a></li>';
				sMyshopHtml += '<li><a href="/myshop/coupon/coupon.html"><span>쿠폰</span></a></li>';
				sMyshopHtml += '<li><a href="/myshop/board_list.html"><span>게시물 관리</span></a></li>';
				sMyshopHtml += '<li><a href="/myshop/addr/list.html"><span>배송 주소록 관리</span></a></li>';
				sMyshopHtml += '<li><a href="/board/consult/list.html"><span>1:1 문의</span></a></li>';
				sMyshopHtml += '</ul>';
				sMyshopHtml += '</div>';
				$('.titleArea').after(sMyshopHtml);
				if ((loc.indexOf('index.html') > -1)) {
					$('body.myshop_').addClass('main');
					$('.titleArea h2').text('MYSHOP');
					$(".snb_>ul>li").eq(0).addClass("is-active");
				} else if ((loc.indexOf('/myshop/order/') > -1)) {
					$('body.myshop_').addClass('order');
					$('.titleArea h2').text('ORDER');
					$(".snb_>ul>li").eq(1).addClass("is-active");
				} else if ((loc.indexOf('/member/modify.html') > -1)) {
					$('body.myshop_').addClass('modify');
					$('.titleArea h2').text('MODIFY');
					$(".snb_>ul>li").eq(2).addClass("is-active");
				} else if ((loc.indexOf('/myshop/mileage/') > -1)) {
					$('body.myshop_').addClass('mileage');
					$('.titleArea h2').text('MILEAGE');
					$('.titleArea p').remove();
					$(".snb_>ul>li").eq(3).addClass("is-active");
				} else if ((loc.indexOf('wish_list.html') > -1)) {
					$('body.myshop_').addClass('wish');
					$('.titleArea h2').text('WISH LIST');
					$(".snb_>ul>li").eq(4).addClass("is-active");
				} else if ((loc.indexOf('/myshop/coupon/') > -1)) {
					$('body.myshop_').addClass('coupon');
					$('.titleArea h2').text('COUPON');
					$(".snb_>ul>li").eq(5).addClass("is-active");
				} else if ((loc.indexOf('/myshop/board_list.html') > -1)) {
					$('body.myshop_').addClass('board');
					$('.titleArea h2').text('BOARD');
					$(".snb_>ul>li").eq(6).addClass("is-active");
				} else if ((loc.indexOf('/myshop/addr/') > -1)) {
					$('body.myshop_').addClass('addr');
					$('.titleArea h2').text('ADDRESS');
					$('.titleArea p').remove();
					$(".snb_>ul>li").eq(7).addClass("is-active");
				} else if ((loc.indexOf('/board/consult/') > -1)) {
					$('body.myshop_').addClass('consult');
					$('.title h2').text('CONSULT');
					$('.title p').remove();
					$(".snb_>ul>li").eq(8).addClass("is-active");
				} else if ((loc.indexOf('/board/inquiry/') > -1)) {
					$('body.myshop_').addClass('inquiry');
					$('.title h2').text('inquiry');
					$('.title p').remove();
				}
			}
		},
		pageTop: function () {
			if ($('.snb_').length > 0) {
				var snbHtml = $('.snb_').clone();
				$('.pg_top').append(snbHtml);
			}
		},
		bottomBanner: function () {
			var $bottomBanner = $('#footer .banner');
			$bottomBanner.find('.item').hide();
			$bottomBanner.find('img').removeAttr('title').prop('alt', ' ');
			if ($bottomBanner.find('.bannermanage2-none-info').length) {
				$bottomBanner.remove();
			} else {
				if ($('body').hasClass('product_')) {
					$bottomBanner.find('.product').show();
				} else if ($('body').hasClass('event_')) {
					$bottomBanner.find('.event').show();
				} else if ($('body').hasClass('press_')) {
					$bottomBanner.find('.press').show();
				} else if ($('body').hasClass('community_')) {
					$bottomBanner.find('.product').show();
				} else {
					$bottomBanner.remove();
				}
			}
		}
	}

	ROOT.main = {
		init: function () {
			ROOT.main.mainKeyvisual();
			ROOT.main.mainLaboratory();
			ROOT.main.mainProduct();
			ROOT.main.mainInstafeed();
		},
		mainKeyvisual: function () {
			$('.main_ .keyvisual .seen').cycle({
				slides: '.item',
				swipe: true,
				fx: 'scrollHorz',
				easing: 'easeInOutExpo',
				pager: '#pagerMainKeyvisual',
				pagerTemplate: '<button type="button"><span>{{slideNum}}</span></button>',
			});
		},
		mainLaboratory: function () {
			var $mainLaboratorySeen = $('.main_ .laboratory .seen');
			$('.panel.clinica').hide();
			$('.bg.clinica').hide();
			$('.main_ .laboratory .tab').find('a').click(function (e) {
				e.preventDefault();
				$mainLaboratorySeen.css('overflow', '');
				$mainLaboratorySeen.cycle('goto', 0);
				var $currentClass = $(this).closest('li').attr('data-filter');
				var $onClass = $('.tab').find('.on');
				var $contActiveClass = $('.tab_content').find('.active');
				var $bgActiveClass = $('.bg_cell').find('.active');
				var $rescuerPanel = $('.panel.rescuer');
				var $clinicaPanel = $('.panel.clinica');
				var $rescuerBg = $('.bg.rescuer');
				var $clinicaBg = $('.bg.clinica');
				if ($currentClass == 'clinica') {
					$onClass.removeClass('on');
					$contActiveClass.removeClass('active');
					$bgActiveClass.removeClass('active');
					$(this).closest('li').addClass('on');
					$rescuerPanel.hide();
					$clinicaPanel.show();
					$rescuerBg.fadeOut(900);
					$clinicaBg.fadeIn(900);
					setTimeout(function () {
						$clinicaPanel.addClass('active');
						$clinicaBg.addClass('active');
					}, 50);
				} else if ($currentClass == 'rescuer') {
					$onClass.removeClass('on');
					$contActiveClass.removeClass('active');
					$bgActiveClass.removeClass('active');
					$(this).closest('li').addClass('on');
					$rescuerPanel.show();
					$clinicaPanel.hide();
					$rescuerBg.fadeIn(900);
					$clinicaBg.fadeOut(900);
					setTimeout(function () {
						$rescuerPanel.addClass('active');
						$rescuerBg.addClass('active');
					}, 50);
				}
				return false;
			});

			$mainLaboratorySeen.cycle({
				slides: '.item',
				timeout: 0,
				speed: 700,
				swipe: true,
				fx: 'scrollHorz',
				easing: 'easeInOutExpo'
			});
		},
		mainProduct: function () {
			$('.main_ .product .object .seen').on('cycle-before', function (event, opts, currEl, nextEl, fwdFlag) {
				setTimeout(function () { slideMainMotion(nextEl, false); }, 210);
			});

			$('.main_ .product .object .seen').on('cycle-update-view', function (e, optionHash, slideOptionsHash, currSlideEl) {
				var currNumber = optionHash.currSlide;
				$('.main_ .product .menu').find('li').removeClass('on');
				$('.main_ .product .menu').find('li').eq(currNumber).addClass('on');
			});

			function slideMainMotion(el, flag) {
				var $elTxt = $(el).find('.object_cell');
				var xPosition = 50;
				if (flag) {
					TweenMax.set('.object_cell', { autoAlpha: 1 });
				}
				TweenMax.fromTo($elTxt.find('.object'), 0.7, { x: xPosition, autoAlpha: 0 }, { x: 0, autoAlpha: 1, force3D: true, ease: Power1.easeOut });
			}

			$('.main_ .product .text .seen').cycle({
				slides: '.item',
				timeout: 5000,
				speed: 700,
				swipe: true,
				fx: 'scrollHorz',
				easing: 'easeInOutExpo',
				pager: '#pagerMainProduct',
				pagerTemplate: '<button type="button"><span>{{slideNum}}</span></button>'
			});

			$('.main_ .product .object .seen').cycle({
				slides: '.item',
				swipe: true,
				timeout: 5000,
				speed: 700,
				easing: 'easeInOutExpo',
				pager: '#pagerMainProduct',
				pagerTemplate: ''
			});

			$('.menu #item1').click(function () {
				$('.main_ .product .display_slide .seen').cycle('goto', 0);
				return false;
			});
			$('.menu #item2').click(function () {
				$('.main_ .product .display_slide .seen').cycle('goto', 1);
				return false;
			});
			$('.menu #item3').click(function () {
				$('.main_ .product .display_slide .seen').cycle('goto', 2);
				return false;
			});

		},
		mainInstafeed: function () {
			if ($('#instafeed').length > 0) {
				var userID = '1471033401';
				var accessToken = '1471033401.1677ed0.21960a0ca48f4f439e162f6c1ae826a2';
				var instafeed = new Instafeed({
					target: 'instafeed',
					get: 'user',
					userId: userID,
					accessToken: accessToken,
					limit: 5,
					sortBy: 'most-recent',
					links: false,
					resolution: 'standard_resolution',
					template: '<li class="column item" id="{{id}}"><a href="{{link}}" target="_blank"><span class="thumb"><img class="post" src="{{image}}" /></span></a></li>'
				});
				instafeed.run();
			}
		}
	}

	ROOT.product = {
		init: function () {
			ROOT.product.snb();
			ROOT.product.price();
		},
		snb: function () {
			if ($('.product_ .snb_ .selected').length === 0) {
				$('.product_ .snb_>ul>li').eq(0).addClass('selected');
			}
		},
		price: function () {
			if ($('.prdList').length > 0) {
				$('.prdList li[aria-title]').each(function () {
					// $(this).find('span').removeAttr('style');
					var memberSale = $(this).attr('aria-title');
					$('[aria-title="영문상품명"]').addClass('engname');
					$('[aria-title="상품간략설명"]').addClass('desc');
					$('[aria-title="상품요약정보"]').addClass('summary');
					$('[aria-title="소비자가"]').addClass('price custom');
					$('[aria-title="판매가"]').addClass('price now');
					$('[aria-title="할인판매가"]').addClass('price sale');
					$('[aria-title="상품색상"]').addClass('colorchip');
					if (memberSale.indexOf('할인가') > -1) {
						$(this).addClass('price sale');
					}
					if ($(this).hasClass('sale')) {
						console.log('sale');
						$(this).parent().find('.price.custom').remove();
						$(this).parent().find('.price.now span').css({ 'color': '#D2D2D2', 'font-weight': '400' });
					}
				});
			};
		}
	}

	ROOT.detail = {
		init: function () {
			ROOT.detail.detailPgTop();
			ROOT.detail.infoBasic();
			ROOT.detail.optionSet();
			ROOT.detail.priceSet();
		},
		detailPgTop: function () {
			if ($('.detail_').length > 0) {
				$('.pg_top').remove();
			}
			$('.share_cell button').on('click', function () {

			});

			// share
			$('.share_cell button:not(.-inited)').click(function () {
				$('.share_cell').toggleClass('is-open');
				$(this).toggleClass('is-open');
			}).addClass("-inited");

		},
		infoBasic: function () {
			if ($('.detail_').length > 0) {
				$('.basic_info tr').filter(function () {
					var data = $(this).attr('aria-title');
					return data == '상품명' || data == '상품요약정보' || data == '소비자가' || data == '판매가' || data == '할인판매가' || data == '브랜드' || data == '상품간략설명' || data == '영문상품명';
				}).addClass('displaynone');
			}
		},
		optionSet: function () {
			var $notOption = $('.infoArea .not_option');
			if ($notOption.is(':visible')) {
				var quantity = $('.infoArea .not_option .quantity').html();
				var quantityPrice = $('.infoArea .not_option .quantity_price').html();
				var quantityHtml = '';
				quantityHtml += '<span id="totalProducts" class="product_quantity_css">';
				quantityHtml += '<span class="quantity">' + quantity + '</span>';
				quantityHtml += '<span class="quantity_price displaynone">' + quantityPrice + '</span>';
				quantityHtml += '</span>';
				$('.price_cell dd').append(quantityHtml);
				$('div#totalProducts').remove();
			}
		},
		priceSet: function () {
			var $infoArea = $('.infoArea');
			var $priceCell = $infoArea.find('.price_cell');
			var $priceCellCustom = $priceCell.find('.custom');
			var $priceCellSale = $priceCell.find('.sale');
			var $priceSold = $infoArea.find('.xans-product-action .sold');
			var $priceReplaced = $infoArea.find('.product_price_css #product_price');
			if ($priceCellCustom.text() === '0') {
				$priceCellCustom.addClass('displaynone');
			}
			if (!$priceCellSale.hasClass('displaynone')) {
				$priceCellSale.siblings('.custom').addClass('displaynone');
				$priceCellSale.siblings('.now').addClass('line_through');
			}
			if (!$priceSold.hasClass('displaynone')) {
				$('.basic_info .product_quantity_css').addClass('displaynone');
			}
			if ($priceReplaced.length === 0) {
				var replaced = $infoArea.find('.product_price_css td span').text();
				$('.totalPrice').addClass('replaced').html(replaced);
				console.log(replaced);
			}
			if ($('.infoArea').length > 0) {
				if ($priceCellCustom.is(':visible')) {
					$('.infoArea').find('.sale_rate').addClass('basic');
				} else if ($priceCellSale.is(':visible')) {
					$('.infoArea').find('.sale_rate').addClass('sale');
				};
			};
			$('.sale_rate.basic').each(function () {
				var saleRateBasic = $(this);

				var custom = saleRateBasic.attr('data-custom'); saleRateBasic.removeAttr('data-custom');
				var price = saleRateBasic.attr('data-price'); saleRateBasic.removeAttr('data-price');

				saleRateBasic.removeAttr('data-sale');
				custom = parseInt(custom.replace(/,/g, ''));
				price = parseInt(price.replace(/,/g, ''));

				var rate = 0;
				if (!isNaN(custom) && !isNaN(price) && 0 < custom) {
					rate = Math.round((custom - price) / custom * 100);
				};
				if (rate > 0) {
					//console.log('sdf');
				};
				saleRateBasic.html('<span class="label transition- ease">' + rate + '<em>%</em></span>');

				rate = Math.ceil(rate / 10) * 10;
				saleRateBasic.addClass('rate' + rate);
			});

			$('.sale_rate.sale').each(function () {
				var saleRate = $(this);

				var price = saleRate.attr('data-price'); saleRate.removeAttr('data-price');
				var sale = saleRate.attr('data-sale'); saleRate.removeAttr('data-sale');

				saleRate.removeAttr('data-custom');
				price = parseInt(price.replace(/,/g, ''));
				sale = parseInt(sale.replace(/,/g, ''));

				var rate = 0;
				if (!isNaN(price) && !isNaN(sale) && 0 < price) {
					rate = Math.round((price - sale) / price * 100);
				};
				if (rate > 0) {
					//console.log('sdf');
				};
				saleRate.html('<span class="label transition- ease">' + rate + '<em>%</em></span>');

				rate = Math.ceil(rate / 10) * 10;
				saleRate.addClass('rate' + rate);
			});

		}
	},
		ROOT.board = {
			init: function () {
				ROOT.board.commx();
				ROOT.board.event();
				ROOT.board.pgMedia();
			},
			commx: function () {
				if (!$('.xans-board-title .imgArea').hasClass('visible')) {
					$('.xans-board-title .imgArea').remove();
				}
				if ($('.xans-board-listpackage iframe').length > 0) {
					console.log('iframe O');
				}
				if (!$('.xans-board-read .head .info ul li').is(':visible')) {
					$('.xans-board-read .head .info .write').css({ 'border-bottom': '0 none' });
					$('.xans-board-read .head .info').css({ 'border': '0 none' });
					$('.xans-board-read table tr:first-child td').css({ 'border-color': '#E7E7E7' });
				} else {
					$('.xans-board-read table tr:first-child td').css({ 'border-top': '0 none' });
				}

				$('.xans-board-write-4 .point5 em').append('<img src="/_jxc/imgx/commx/ico-point5.png" alt="5점" />');
				$('.xans-board-write-4 .point4 em').append('<img src="/_jxc/imgx/commx/ico-point4.png" alt="4점" />');
				$('.xans-board-write-4 .point3 em').append('<img src="/_jxc/imgx/commx/ico-point3.png" alt="3점" />');
				$('.xans-board-write-4 .point2 em').append('<img src="/_jxc/imgx/commx/ico-point2.png" alt="2점" />');
				$('.xans-board-write-4 .point1 em').append('<img src="/_jxc/imgx/commx/ico-point1.png" alt="1점" />');
			},
			event: function () {
				if ($('.event_').length > 0) {
					$('.xans-board-list').find('.board_view_aticle').remove();
					$('.boardSort').hide();
					var boardSelect = $('#board_category option:selected').val();
					if (boardSelect === '2') {
						$('body.pg_event').addClass('end');
					}
					$('.list_cell li').each(function () {
						var $this = $(this).find('.state');
						var state = $this.text();
						if (state === '진행중 이벤트') {
							$this.addClass('ing');
						} else if (state === '종료된 이벤트') {
							$this.addClass('end');
						}
					});
				}
			},
			pgMedia: function () {
				if ($('.pg_media').length > 0) {
					$('.xans-board-list').find('.board_view_aticle').remove();
				}
			}
		}

	ROOT.animate = {
		init: function () {
			ROOT.animate.aosAni();
		},
		aosAni: function () {
			if ($('[data-aos]').length > 0) {
				AOS.init({
					easing: 'ease-out-back',
					duration: 1800
				});
			}
		}
	}

	// ROOT
	ROOT();

	// Preloader
	$('#preloader').delay(100).fadeOut(150);

}(window.jXCOMMX || $jXC));
