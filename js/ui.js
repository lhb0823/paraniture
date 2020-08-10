;$(function(){
	more_btn(); // ������ ���� - �ֽ����� - �����ֽ���Ȳ ������ ��ư Ŭ���̺�Ʈ
	commtab();	//�Ǳ��
	accordion();  //���ڵ�� �޴� ȿ��
	select_tab(); //����Ʈ�ڽ� ��
	notice_date();	//�������� �޷�
	mobile_tab(); //����� ��(��=>�������ڽ�)
	gnb(); //gnb ��ư-����޴� ����, ����� gnb ����
	family_site(); //���� �йи�����Ʈ Ŭ�� �̺�Ʈ
	lnb_focus(); //����� lnb active focus
	//main_visual(); //���κ��־�Ѹ�
	goTopBtn(); //��ũ�� top��ư
});
function more_btn(){
  $(".issue_box .more_btn").click(function(){
      $(".stock_issue .tbl_more").show();
      $(this).hide();
    });
}
function commtab(){
	$(".lnb li,.tab_comm li,.tab_subcomm li").click(function(){	//�߰��� ���� Ŭ�� �̺�Ʈ�� �߰����ݴϴ�.
		var idx = $(this).index();
		$(this).siblings().removeClass("on");
		$(this).addClass("on");
		var tabId = $(this).closest('ul').attr('id')+"_cont";//2�� �ּ�
		$("."+tabId).css("display","none");
		$("."+tabId+":eq("+idx+")").css("display","table-cell"); //3.�ش� ul li �� �ε��� ���� ������ ������ �ε��� ���� ���Ͽ� �����ְ� ����ϴ�.

		$(".select_tbl.sel_default").show(); //�� Ŭ���� ����Ʈ�� ����Ʈ �������� hide() ó���� ��(���� ����Ʈ �������� ���ļ�). �̸� �ذ��ϱ� ���� show ����. select_tab() �Լ��� ���� ����.
	});
}
function notice_date(){
    var dateFormat = "mm/dd/yy",
      from = $("#from_date").datepicker({
          defaultDate: "+1w",
          changeMonth: true,
          numberOfMonths: 1,
          showButtonPanel: true
        })
        .on("change", function(){to.datepicker( "option", "minDate", getDate( this ) );
        }),
      to = $("#to_date").datepicker({
        defaultDate: "+1w",
        changeMonth: true,
        numberOfMonths: 1,
        showButtonPanel: true
      }).on( "change", function() {
        from.datepicker( "option", "maxDate", getDate( this ) );
      });

    function getDate( element ) {
      var date;
      try {
        date = $.datepicker.parseDate( dateFormat, element.value );
      } catch( error ) {
        date = null;
      }
      return date;
    }
}
function accordion(){
    $(".accor_cont").hide();
    $(".accor_comm>li>.accor_tit").on("click",function(){
    	var accor_top;

    	if($(this).parent("li").hasClass("down")){
    		$(this).parent("li").removeClass("down");
    		$(this).siblings('.accor_cont').stop().slideUp(500);
    	}else{
    		/*$(".accor_comm>li").not($(this).parent("li")).removeClass("down").find('.accor_cont').stop().slideUp(300);*/
    		$(".accor_comm>li").removeClass("down").find('.accor_cont').stop().slideUp(300);
    		$(this).parent("li").addClass("down");
    		$(this).siblings('.accor_cont').stop().slideDown(300,function(){
    			accor_top = $(".accor_comm li.down").offset().top;
    			$("body").stop().animate({"scrollTop":accor_top},300);
    		});
    	}
    });
  }
function select_tab(){
	$(".sel_comm").change(function(){
		var current_sel = $(this).val();
		$(".select_tbl").hide();
		$("#"+current_sel).show();
	});
}
function mobile_tab(){
	var menu_open=false;

	$('.tab_comm li').click(function(e){
		if(document.body.scrollWidth<=768){
			if($(this).hasClass('active')){
				if(menu_open){
					$('.tab_comm li').not(this).stop().slideUp();
					menu_open = false;
				}else{
					$('.tab_comm li').stop().slideDown();
					menu_open = true;
				}
			}else{
				$(this).addClass('active').siblings().removeClass('active');
				$(this).siblings().stop().slideUp();
				$('.tab_comm li.active').stop().slideDown();
				menu_open = false;
			}
		}
		e.preventDefault();
	});
}
function gnb(){
	if(document.body.scrollWidth>768){
		tgAnchor = $("#header ul.list_gnb > li > a");
		tgLast = $("#header ul.list_gnb > li:last-child .list_snb a");
		$(tgAnchor).on("focusin", function(){
			$("#header ul.list_gnb > li .wrap_snb").removeClass("selected").hide(); // �ϴ� ��ü ����޴� ����
			$(this).parent().find(".wrap_snb").addClass("selected").show(); // �׸��� this�� �����ְ�, selected addŬ����
			if($(this).parent().find(".wrap_snb").hasClass("selected")){  // ��Ŀ�� on (selected�� ������ ����)
				$(tgAnchor).removeClass("current"); //�ϴ� ��ü remove
				$(this).addClass("current"); // �׸��� ���縸 add
			}else{	// ��Ŀ�� off (selected�� ������ ���� ����)
				$(tgAnchor).removeClass("current"); //��ü remove
				$(this).addClass("current");
				//$(this).removeClass("current");
			}
		});
		$('.list_gnb li a').click(function(){
			$('.list_gnb li, .list_gnb li a').removeClass('current');
			$('.list_gnb li, .list_gnb li a').blur();
		});
		$(tgLast).on("focusout", function(){
			$(this).parents(".wrap_snb").hide();
			$(tgAnchor).removeClass("current");
		});
		$(tgAnchor).on("focusout", function(){
		});
		$(".wrap_nav .list_gnb > li").hover(function(){
			$('.list_gnb li, .list_gnb li a').blur();
			$(this).addClass("current").find(".wrap_snb").show();
		},function(){
			$(this).removeClass("current").find(".wrap_snb").hide();
		});
	}
	if(document.body.scrollWidth<=768){
		$(".wrap_nav .list_gnb>li").click(function(){
			if($(this).hasClass("current")){
				$(".wrap_nav .list_gnb>li").removeClass("current");
				$(this).find(".wrap_snb").hide();
			}else{
				$(".wrap_nav .list_gnb>li").removeClass("current");
				$(this).addClass("current");
				$(".wrap_nav .list_gnb>li").find(".wrap_snb").hide();
				$(this).find(".wrap_snb").show();
			}
		});
	}
	$(".gnb_open").click(function(){
		$(".gnb_close").css("display","table-cell");
		$("html,body").css({
			"overflow":"hidden",
			"position":"relative",
			"height":"100%"
		});
		$(".header").addClass("dim");
		$(".wrap_nav").animate({left:0},500);
	});
	$(".gnb_close").click(function(){
		$("html,body").css({
			"overflow":"auto",
			"height":"auto"
		});
		$(this).css("display","none");
		$(".wrap_nav").animate({left:"-85%"},500);
		$(".header").removeClass("dim");
	});
}

function family_site(){
	$(".wrap_family").click(function(){
		$(".list_family").toggle(function(){
			//������ ��� ����
			if($(".family_txt span").hasClass("ico_up")){
				$(".family_txt span").removeClass("ico_up");
				$(".family_txt span").addClass("ico_down");
			}else{
				$(".family_txt span").addClass("ico_up");
				$(".family_txt span").removeClass("ico_down");
			}
		});
	});
}

$(window).resize(function(){
	if(document.body.scrollWidth<=768){
		$('.tab_comm li').css({'display':'table-cell'});
		$('.tab_comm li.on').siblings().css({'display':'table-cell'});
	}else{
		$('.tab_comm li').css({'display':'table-cell'});
	}
});
function lnb_focus(){
	var wrapLnb_width = $('.wrap_lnb').width();
	var lnb_width = $('.wrap_lnb .lnb').width();

	if(lnb_width > wrapLnb_width){
		pos = $('.lnb li.on').position();
		$('.wrap_lnb').stop().animate({'scrollLeft':pos.left},0);
	}
}
function main_visual(){
	$('.visual_rolling').bxSlider({
		mode:'fade',
		auto:false,
		pager:false,
		controls:true,
		moveSlides:1,
		minSlides:1,
		maxSlides:1,
		speed:700,
		easing:'easeInOutExpo'
	});
}
function goTopBtn(){
	$(window).on({'scroll':function(){

		scrollTop = $(window).scrollTop();
		if(scrollTop > 500 && document.body.scrollWidth<=768){
			$('#goTop').stop().fadeIn(100);
		}else{
			$('#goTop').stop().fadeOut(100);
		}

	}});
}