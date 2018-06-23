//table 数据
var tableData = {
  "code":"codeTable",
  "gridHeader": [
    {
      "style":'font-size: 15px;text-align: center;font-family: 黑体',
      "itemValue": "序号",
      "isShow":true,
      "code":"code0"
    },
    {
      "style":'font-size: 15px;text-align: center;font-family: 黑体',
      "itemValue": "商品图片",
      "isShow":false,
      "code":"code1",
      "type":"img"
    },
    {
      "style":'font-size: 15px;text-align: center;font-family: 黑体',
      "itemValue": "商品名称",
      "isShow":true,
      "code":"code2"
    },
    {
      "style":'font-size: 15px;text-align: center;font-family: 黑体',
      "itemValue": "商家编码",
      "isShow":true,
      "code":"code3"
    },
    {
      "style":'font-size: 15px;text-align: center;font-family: 黑体',
      "itemValue": "货号",
      "isShow":true,
      "code":"code4"
    },
    {
      "style":'font-size: 15px;text-align: center;font-family: 黑体',
      "itemValue": "销售属性",
      "isShow":true,
      "code":"code5"
    },
    {
      "style":'font-size: 15px;text-align: center;font-family: 黑体',
      "itemValue": "单价",
      "isShow":true,
      "code":"code6"
    },
    {
      "style":'font-size: 15px;text-align: center;font-family: 黑体',
      "itemValue": "数量",
      "isShow":true,
      "code":"code7"
    },
    {
      "style":'font-size: 15px;text-align: center;font-family: 黑体',
      "itemValue": "金额",
      "isShow":true,
      "code":"code8"
    },
    {
      "style":'font-size: 15px;text-align: center;font-family: 黑体',
      "itemValue": "货位",
      "isShow":false,
      "code":"code9"
    }
  ],
  "gridBody": [
    [
      {
        "style":'font-size: 15px;text-align: center;font-family: 黑体',
        "itemValue": "1",
        "isShow":true
      },
      {
        "style":'font-size: 15px;text-align: center;font-family: 黑体',
        "itemValue": "images/i1.jpg",
        "type":"img",
        "isShow":false
      },
      {
        "style":'font-size: 15px;text-align: center;font-family: 黑体',
        "itemValue": "衬衫",
        "isShow":true
      },
      {
        "style":'font-size: 15px;text-align: center;font-family: 黑体',
        "itemValue": "B001",
        "isShow":true
      },
      {
        "style":'font-size: 15px;text-align: center;font-family: 黑体',
        "itemValue": "G001",
        "isShow":true
      },
      {
        "style":'font-size: 15px;text-align: center;font-family: 黑体',
        "itemValue": "xxx",
        "isShow":true
      },
      {
        "style":'font-size: 15px;text-align: center;font-family: 黑体',
        "itemValue": "80",
        "isShow":true
      },
      {
        "style":'font-size: 15px;text-align: center;font-family: 黑体',
        "itemValue": "5",
        "isShow":true
      },
      {
        "style":'font-size: 15px;text-align: center;font-family: 黑体',
        "itemValue": "400",
        "isShow":true
      },
      {
        "style":'font-size: 15px;text-align: center;font-family: 黑体',
        "itemValue": "no-1",
        "isShow":false
      }
    ]
  ]
};
// rgb转hex
function rgb2hex(rgb) {
  rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  function hex(x) {
    return ("0" + parseInt(x).toString(16)).slice(-2);
  }
  return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}
//创建普通元素
var createElement = function (tag,attrs,html) {
  var element = document.createElement(tag);
  // 判断第二个参数是属性还是内容
  if(typeof(attrs) === "string"){
    html = attrs;
    attrs = null;
  }
  // 判断是否有属性
  if(attrs !== undefined){
    for(var attr in attrs){
      element.setAttribute(attr,attrs[attr]);
    }
  }
  // 判断是否有内容
  if(html !== undefined){
    element.innerHTML = html;
  }
  return element;
};
//标尺
var renderRule = function (panel,elem) {

  var nW = parseInt($(panel).width()/10);
  var nH = parseInt($(panel).height()/10);

  if($(elem).find(".rules").length <= 0){
    var rules = $("<div class='rules'></div>").appendTo($(elem));
    var ruleTop    = $('<div class="rule rule-top"></div>').appendTo($(rules));
    var ruleRight  = $('<div class="rule rule-right"></div>').appendTo($(rules));
    var ruleBottom = $('<div class="rule rule-bottom"></div>').appendTo($(rules));
    var ruleLeft   = $('<div class="rule rule-left"></div>').appendTo($(rules));
  }

  $(".rule-top").html(createRule('top',nW));
  $(".rule-bottom").html(createRule('bottom',nW));
  $(".rule-left").html(createRule('left',nH));
  $(".rule-right").html(createRule('right',nH));

};
var createRule = function (direction,num) {
  var attribute = [];
  var rulesHTml = createElement("div");
  switch (direction){
    case 'top'   : attribute = ["height","left"];break;
    case 'left'  : attribute = ["width","top"]  ;break;
    case 'bottom': attribute = ["height","left"];break;
    case 'right' : attribute = ["width","top"]  ;break;
  }
  for(var i = 0,len = num;i<=len;i++){
    var elem = createElement("div",{"class":"rule-scale"});
    $(elem).css(attribute[1],10*i+18+"px");
    if(i>0){
      if(i%5 === 0){
        $(elem).css(attribute[0],"50%");
      }
      if(i%10 === 0){
        $(elem).css(attribute[0],"100%").html("<span>"+i*10+"</span>");
      }
    }else{
      $(elem).css(attribute[0],0);
    }
    $(elem).appendTo($(rulesHTml));
  }
  return rulesHTml;
};
// 拖拽元素
var drag = function (_element,_panel,_stage) {
  //_element 当前元素，_panel移动的面板，_stage移动区域
  $(_element).on("mouseenter",function () {
    $(this).css("cursor","move");
  });
  $(_element).on("mousedown",function (event) {
    event = event || window.event;
    var panel= _element===_panel?this:$(this).parents(_panel)[0];
    // 计算面板与边缘距离
    var reX=event.clientX-panel.offsetLeft;
    var reY=event.clientY-panel.offsetTop;

    var panelW = parseFloat(getComputedStyle(panel).width);
    var panelH = parseFloat(getComputedStyle(panel).height);
    var modalW = parseFloat(getComputedStyle($(_stage)[0]).width);
    var modalH = parseFloat(getComputedStyle($(_stage)[0]).height);
    document.onmousemove=function(event){
      event = event || window.event;
      // 计算鼠标移动距离
      var x = event.clientX-reX;
      var y = event.clientY-reY;
      // 水平边界
      if(x <= 0){
        x = 0
      }else if (x >= (modalW - panelW)){
        x = modalW - panelW;
      }
      // 垂直边界
      if(y <= 0){
        y=0
      }else if(y >= (modalH - panelH)){
        y = modalH - panelH;
      }

      panel.style.left=x +'px';
      panel.style.top=y +'px';
    };
  });
  $(_element).on("mouseup",function () {
    document.onmousemove=null;
  });
};
//元素放大缩小
var resize = function (element) {
  $.each($(element),function () {
    var $this = "";
    $(this).off("click").on("click",function () {
      $this = $(this);
      var rthLeft   = "";
      var rthRight  = "";
      var rthBottom = "";
      var rthTop    = "";
      if($this.find(".rth").length <= 0){
        if(rthBottom === ""&&rthLeft === ""&&rthRight === ""&&rthTop === ""){
          if(!$this.parents().hasClass("move-element")){
            rthTop    = $('<div class="rth rth-top"   ></div>').appendTo($this);
            rthLeft   = $('<div class="rth rth-left"  ></div>').appendTo($this);
            rthBottom = $('<div class="rth rth-bottom"></div>').appendTo($this);
          }
          rthRight  = $('<div class="rth rth-right" ></div>').appendTo($this);

          $this.find(".rth").show().on("mousedown",function (event) {
            event = event || window.event;
            //阻止冒泡
            event.stopPropagation();

            var elem = event.currentTarget;

            var W = $this.width();
            var H = $this.height();
            var L = parseFloat($this.css("left"));
            var T = parseFloat($this.css("top"));

            // 获取开始位置与边缘距离
            var reX=event.clientX;
            var reY=event.clientY;

            $(document).on("mousemove",function (event) {
              event = event || window.event;
              // 计算鼠标移动距离
              var x = event.clientX-reX;
              var y = event.clientY-reY;

              if($(elem).hasClass("rth-right")||$(elem).hasClass("rth-bottom")){
                $this.css({"width":W+x+'px', "height":H+y+'px'});
              }else{
                $this.css({"width":W-x+'px', "left":L+x+'px',"height":H-y+'px',"top":T+y+'px'});
              }
            });
          });
          $(document).on("mouseup",function () {
            $(document).off("mousemove");
          });
        }
      }
    });
  });
};
//添加元素
var addElement = function () {
  $(".add-panel .add-table").off("click").on("click",function () {
    addTable(tableData);
    resize(".move-element");
    panel();
  });
  $(".add-panel .add-default").off("click").on("click",function () {
    var addElem = $('<div class="div-default move-element" style="font-family: 黑体;font-size: 16px;text-align: left"><span class="default-text">【'+$(this).html()+'】</span></div>').appendTo($("#panel"));
    drag(addElem,addElem,"#panel");
    resize(".move-element");
    panel();
  });
  $(".add-panel .add-custom").off("click").on("click",function () {
    var addElem = $('<div class="div-custom  move-element" style="font-family: 黑体;font-size: 16px;text-align: left"><span class="custom-text">【'+$(this).html()+'】</span></div>').appendTo($("#panel"));
    drag(addElem,addElem,"#panel");
    resize(".move-element");
    panel();
  });
  $(".add-panel .add-line").off("click").on("click",function () {
    var addElem = $('<div class="div-line  move-element" direction="horizontal"></div>').appendTo($("#panel"));
    switch ($(addElem).attr("direction")){
      case "horizontal": $(addElem).addClass("line-h").removeClass("line-v");
        break;
      case "vertical": $(addElem).addClass("line-v").removeClass("line-h");
        break;
    }
    drag(addElem,addElem,"#panel");
    resize(".move-element");
    panel();
  });
};
var addTable = function (data,style) {
  var frag = document.createDocumentFragment();
  var $table = $('<table class="table move-element" code="'+data.code+'"></table>').appendTo($(frag));
  var $thead = $('<thead></thead>').appendTo($table);
  var $tbody = $('<tbody></tbody>').appendTo($table);
  var $gridHeader = $('<tr class="tr"></tr>').appendTo($thead);
  if(style !== undefined){
    $table.css({
      width: style.w,
      height: style.h,
      left: style.x,
      top: style.y
    });
  }
  //表头
  $.each(data.gridHeader,function (i, v) {
    if(v.type&&v.type==='img'){
      if(v.isShow) {
        $('<th class="td" code="' + v.code + '" type="' + v.type + '" style="' + v.style + '">' + v.itemValue + '</th>').appendTo($gridHeader);
      }else{
        $('<th class="td" code="' + v.code + '" type="' + v.type + '" style="' + v.style + ';display: none">' + v.itemValue + '</th>').appendTo($gridHeader);
      }
    }else{
      if(v.isShow){
        $('<th class="td" code="'+v.code+'" style="'+v.style+'">'+v.itemValue+'</th>').appendTo($gridHeader);
      }else{
        $('<th class="td" code="'+v.code+'" style="'+v.style+';display: none">'+v.itemValue+'</th>').appendTo($gridHeader);
      }
    }
  });

  //表格内容
  $.each(data.gridBody,function (i1,v1) {
    var $gridBody = $('<tr class="tr"></tr>').appendTo($tbody);
    $.each(v1,function (i2,v2) {
      if(v2.type&&v2.type==='img'){
        if(v2.isShow){
          $('<td class="td" type="' + v2.type + '" style="'+v2.style+'"><img src="'+v2.itemValue+'" alt=""></td>').appendTo($gridBody);
        }else{
          $('<td class="td" type="' + v2.type + '" style="'+v2.style+';display: none"><img src="'+v2.itemValue+'" alt=""></td>').appendTo($gridBody);
        }
      }else{
        if(v2.isShow){
          $('<td class="td" style="'+v2.style+'">'+v2.itemValue+'</td>').appendTo($gridBody);
        }else{
          $('<td class="td" style="'+v2.style+';display: none">'+v2.itemValue+'</td>').appendTo($gridBody);
        }
      }
    });
  });
  $(frag).appendTo($("#panel"));

  drag(".table",".table","#panel");
  resize(".move-element");
  panel();
};
//面板
var panel = function () {
  var $this = "";
  $.each($(".move-element"),function () {
    $(this).on("click",function () {
      $this = $(this);
      $this.css("background-color","#fbafa7").siblings().css("background-color","#fff").find(".rth").remove();
      if($(this).find("img.panel-bg").length <=0){
        //添加编辑面板
        if($(document.body).find('.edit-panel').length <= 0){
          createPanel(".edit-panel");
        }
        //渲染编辑面板
        if($this.hasClass("table")){
          var tableData = [];
          $.each($this.find("th.td"),function (i,v) {
            var item = {};
            item.value = v.innerHTML;
            item.isShow = $(this).css("display") === "none"?false:true;
            item.code   = $(v).attr('code') ;
            tableData.push(item);
          });
          renderTableEditPanel(tableData);
        }else if($this.hasClass("div-default")){
          renderDefaultEditPanel();
        }else if($this.hasClass("div-custom")){
          renderCustomEditPanel();
        }else if($this.hasClass("div-line")){
          renderLineEditPanel();
        }

        drag('.edit-panel>.title','.edit-panel',document.body);
        $(".edit-panel").show();

        //删除编辑面板
        $(".edit-panel .btn-delete").off("click").on("click",function () {
          $this.remove();
          $(".edit-panel").remove();
        });
      }else {
        $(".edit-panel").remove();
      }
    });
  });

  var renderTableEditPanel = function (data) {
    $(".edit-panel .panel-ctrl").html("");
    //创建table中的表列
    var ctrlItem = createElement("div",{"class":"ctrl-item"});
    $(ctrlItem).appendTo($(".edit-panel .panel-ctrl"));

    var itemLabel = $('<label class="ctrl-item-title">表列</label>').appendTo($(ctrlItem));
    var itemContent = createElement("div",{"class":"ctrl-item-content"});
    $(itemContent).appendTo($(ctrlItem));
    //table 编辑面板中的表列
    $.each(data,function (i,v) {
      var tableItem = $('<div class="table-item"></div>').appendTo($(itemContent));
      if(v.isShow){
        $('<input class="table-choose" type="checkbox" checked>').appendTo(tableItem);
        $('<input class="table-title" type="text" readonly value="'+v.value+'">').appendTo(tableItem);
        $('<a class="table-edit">编辑</a>').appendTo(tableItem);
      }else{
        $('<input class="table-choose" type="checkbox">').appendTo(tableItem);
        $('<input class="table-title" type="text" readonly value="'+v.value+'">').appendTo(tableItem);
        $('<a class="table-edit table-edit-unchecked">编辑</a>').appendTo(tableItem);
      }
    });
    //checkBox选项
    $.each($(".table-item input.table-choose"),function (i,v) {
      $(this).on("click",function () {
        if(!this.checked){
          $.each($this.find(".tr"),function () {
            $($(this).find(".td")[i]).hide();
          });
          $(this).siblings("a.table-edit").addClass("table-edit-unchecked");
        }else{
          $.each($this.find(".tr"),function () {
            $($(this).find(".td")[i]).show();
          });
          $(this).siblings("a.table-edit").removeClass("table-edit-unchecked");
        }
      });
    });
    //编辑按钮点击
    $.each($(".table-edit"),function (i, v) {
      $(this).off("click").on("click",function () {
        if(!$(this).hasClass("table-edit-unchecked")){
          //获得当前元素样式保存到elementData
          var elementData = [];
          function getData() {
            for (var j = 0;j < 2;j++){
              var item = {};
              var elem = $($this.find(".tr")[j]).children(".td")[i];

              item.fontSize        = $(elem).css("font-size");
              item.fontFamily      = $(elem).css("font-family");
              item.color           = $(elem).css("color");
              item.fontWeight      = elem.style.fontWeight;
              item.fontStyle       = $(elem).css("font-style");
              item.textDecoration  = $(elem).css("text-decoration");
              item.textAlign       = $(elem).css("text-align");
              item.beforStyle      = $(elem).attr("style");
              item.code            = $(elem).attr("code");
              item.type            = $(elem).attr("type");
              elementData.push(item);
            }
          }
          getData();
          if($(document.body).find('.table-ctrl').length <= 0){
            createTableStyle();
            $('<div class="ctrl-item"><label class="ctrl-item-title">code</label><div class="ctrl-item-content"><input class="code" type="text" ></div></div>').appendTo($('.table-header .table-style'))
          }
          function createTableStyle() {
            createPanel(".table-ctrl");
            drag(".table-ctrl>.title",".table-ctrl",document.body);
            $(".table-ctrl>.title").html("修改表格样式");
            $(".table-ctrl>.btn-delete").remove();
            //表头样式设置
            $('<div class="table-header"><div class="title">表头的样式</div><div class="table-style"></div></div>').appendTo($(".table-ctrl>.panel-ctrl"));
            //表体样式设置
            $('<div class="table-body"><div class="title">表体的样式</div><div class="table-style"></div></div>').appendTo($(".table-ctrl>.panel-ctrl"));
            //添加底部按钮
            $('<div class="btns"><div class="btn-confirm">确定</div><div class="btn-cancel">取消</div></div>').appendTo($(".table-ctrl"));

            var $style = $(
              '<div class="ctrl-item">' +
                '<label class="ctrl-item-title">字体/号</label>'+
                '<div class="ctrl-item-content">'+
                  '<select class="font-select" name="fontFamily"><option value="黑体" name="heiTi">黑体</option><option value="楷体" name="kaiTi">楷体</option><option value="宋体" name="songTi">宋体</option><option value="微软雅黑" name="yahei">微软雅黑</option></select>' +
                  '<div class="font-size"><span class="icon-font"></span><input class="font-number" type="number" name="font-number" value="16" min="12"></div>' +
                '</div>' +
              '</div>' +
              '<div class="ctrl-item"><label class="ctrl-item-title">粗斜体</label><div class="ctrl-item-content font-set"><div class="font-color">A<input class="color-choose" type="color"></div><div class="font-bold">B</div><div class="font-italic">I</div><div class="font-underline">U</div></div></div>' +
              '<div class="ctrl-item"><label class="ctrl-item-title">对齐</label><div class="ctrl-item-content text-align"><div class="text-left"></div><div class="text-center"></div><div class="text-right"></div></div></div>'
            );
            $style.appendTo($(".table-style"));
          }

          renderTableStyle(elementData);
          function renderTableStyle(data) {
            function showStyle(element) {
              var n = element===".table-header"?0:1;
              $(".table-header .code").val(data[0].code);
              $.each($(element+" .font-select option"),function (i2, v2) {
                if(v2.innerHTML === data[n].fontFamily){ this.selected = true; }
              });
              $(element+" .font-number").val(parseInt(data[n].fontSize));
              switch (data[n].textAlign){
                case "left" : $($(element+" .text-align>div")[0]).addClass("active").siblings().removeClass("active");break;
                case "center" : $($(element+" .text-align>div")[1]).addClass("active").siblings().removeClass("active");break;
                case "right" : $($(element+" .text-align>div")[2]).addClass("active").siblings().removeClass("active");break;
              }
              $(element+" .font-color").css("color",data[n].color);
              data[n].fontWeight === "bold"?$(element+" .font-bold").addClass("active"):$(element+" .font-bold").removeClass("active");
              data[n].fontStyle  === "italic"?$(element+" .font-italic").addClass("active"):$(element+" .font-italic").removeClass("active");
              data[n].textDecoration.indexOf("underline") > -1?$(element+" .font-underline").addClass("active"):$(element+" .font-underline").removeClass("active");
            }
            showStyle(".table-header");
            showStyle(".table-body");
            function setStyle() {
              //code设置
              $(".table-header .code").off("change").on("change",function () {
                $($this.find("th.td")[i]).attr("code",$(this).val()) ;
              });
              //font-family设置
              $(".table-header .font-select").off("change").on("change",function () {
                $this.find("th.td")[i].style.fontFamily = $(this).val();
              });
              $(".table-body .font-select").off("change").on("change",function () {
                var val = $(this).val();
                $.each($this.find(".tr"),function (i3, v3) {
                  if(i3>0){
                    $(this).find("td.td")[i].style.fontFamily = val;
                  }
                });
              });
              //font-size 设置
              $(".table-header .font-number").off("change").on("change",function () {
                $this.find("th.td")[i].style.fontSize = $(this).val()+"px";
              });
              $(".table-body .font-number").off("change").on("change",function () {
                var val = $(this).val()+"px";
                $.each($this.find(".tr"),function (i3, v3) {
                  if(i3>0){
                    $(this).find("td.td")[i].style.fontSize = val;
                  }
                });
              });
              //文字color设置
              $(".table-header .color-choose").off("change").on("change",function () {
                $this.find("th.td")[i].style.color = $(this).val();
                $(this).parents(".font-color").css("color",$(this).val());
              });
              $(".table-body .color-choose").off("change").on("change",function () {
                $(this).parents(".font-color").css("color",$(this).val());
                var val = $(this).val();
                $.each($this.find(".tr"),function (i3, v3) {
                  if(i3>0){
                    $(this).find("td.td")[i].style.color = val;
                  }
                });
              });
              //文字加粗font-weight
              $(".table-header .font-bold").off("click").on("click",function () {
                $(this).toggleClass("active");
                $(this).hasClass("active")?$($this.find("th.td")[i]).css("font-weight","bold"):$($this.find("th.td")[i]).css("font-weight","normal");
              });
              $(".table-body .font-bold").off("click").on("click",function () {
                var $that = $(this);
                $that.toggleClass("active");
                $.each($this.find(".tr"),function (i3, v3) {
                  if(i3>0){
                    $that.hasClass("active")?$($(this).find("td.td")[i]).css("font-weight","bold"):$($(this).find("td.td")[i]).css("font-weight","normal");
                  }
                });
              });
              //文字倾斜设置font-style
              $(".table-header .font-italic").off("click").on("click",function () {
                $(this).toggleClass("active");
                $(this).hasClass("active")?$($this.find("th.td")[i]).css("font-style","italic"):$($this.find("th.td")[i]).css("font-style","normal");
              });
              $(".table-body .font-italic").off("click").on("click",function () {
                var $that = $(this);
                $that.toggleClass("active");
                $.each($this.find(".tr"),function (i3, v3) {
                  if(i3>0){
                    $that.hasClass("active")?$($(this).find("td.td")[i]).css("font-style","italic"):$($(this).find("td.td")[i]).css("font-style","normal");
                  }
                });
              });
              //文字添加下划线
              $(".table-header .font-underline").off("click").on("click",function () {
                $(this).toggleClass("active");
                $(this).hasClass("active")?$($this.find("th.td")[i]).css("text-decoration","underline"):$($this.find("th.td")[i]).css("text-decoration","none");
              });
              $(".table-body .font-underline").off("click").on("click",function () {
                var $that = $(this);
                $that.toggleClass("active");
                $.each($this.find(".tr"),function (i3, v3) {
                  if(i3>0){
                    $that.hasClass("active")?$($(this).find("td.td")[i]).css("text-decoration","underline"):$($(this).find("td.td")[i]).css("text-decoration","none");
                  }
                });
              });
              //文字对齐 text-align
              $(".table-header .text-align>div").off("click").on("click",function () {
                var index = $(this).index();
                $(this).addClass("active").siblings().removeClass("active");
                switch (index){
                  case 0 : $($this.find("th.td")[i]).css("text-align","left");break;
                  case 1 : $($this.find("th.td")[i]).css("text-align","center");break;
                  case 2 : $($this.find("th.td")[i]).css("text-align","right");break;
                }
              });
              $(".table-body .text-align>div").off("click").on("click",function () {
                var $that = $(this);
                var index = $(this).index();
                $(this).addClass("active").siblings().removeClass("active");
                $.each($this.find(".tr"),function (i3, v3) {
                  if(i3>0){
                    switch (index){
                      case 0 : $($(this).find("td.td")[i]).css("text-align","left");break;
                      case 1 : $($(this).find("td.td")[i]).css("text-align","center");break;
                      case 2 : $($(this).find("td.td")[i]).css("text-align","right");break;
                    }
                  }
                });
              });
            }
            setStyle();
          }
          $(".table-ctrl .btn-confirm").off("click").on("click",function () {
            $(".table-ctrl").remove();
          });
          $(".table-ctrl .btn-cancel").off("click").on("click",function () {
            $(".table-ctrl").remove();
            $($this.find(".tr")[0]).children(".td")[i].style = elementData[0].beforStyle;
            $.each($this.find(".tr"),function (i4, v4) {
              if(i4>0){
                $(this).find(".td")[i].style = elementData[1].beforStyle;
              }
            })
          });
        }
      });
    });
  };
  var renderDefaultEditPanel = function () {
    $(".edit-panel .panel-ctrl").html("");
    //getStyle
    var data = {};
    data.fontSize        = $this.css("font-size");
    data.fontFamily      = $this.css("font-family");
    data.color           = $this.css("color");
    data.fontWeight      = $this[0].style.fontWeight;
    data.fontStyle       = $this.css("font-style");
    data.textDecoration  = $this.css("text-decoration");
    data.textAlign       = $this.css("text-align");
    data.beforStyle      = $this.attr("style");
    data.code            = $this.attr("code")?$this.attr("code"):"";
    data.text            = $this.attr("text")?$this.attr("text"):"";
    //默认样式
    var $style = $('<div class="ctrl-item">' +
      '<label class="ctrl-item-title">字体/号</label>'+
      '<div class="ctrl-item-content">'+
      '<select class="font-select" name="fontFamily"><option value="黑体" name="heiTi">黑体</option><option value="楷体" name="kaiTi">楷体</option><option value="宋体" name="songTi">宋体</option><option value="微软雅黑" name="yahei">微软雅黑</option></select>' +
      '<div class="font-size"><span class="icon-font"></span><input class="font-number" type="number" name="font-number" value="16" min="12"></div>' +
      '</div>' +
      '</div>\n' +
      '<div class="ctrl-item"><label class="ctrl-item-title">粗斜体</label><div class="ctrl-item-content font-set"><div class="font-color">A<input class="color-choose" type="color"></div><div class="font-bold">B</div><div class="font-italic">I</div><div class="font-underline">U</div></div></div>' +
      '<div class="ctrl-item"><label class="ctrl-item-title">对齐</label><div class="ctrl-item-content text-align"><div class="text-left"></div><div class="text-center"></div><div class="text-right"></div></div></div>'+
      '<div class="ctrl-item"><label class="ctrl-item-title">code</label><div class="ctrl-item-content"><input class="code" type="text"></div></div>'+
      '<div class="ctrl-item"><label class="ctrl-item-title">text</label><div class="ctrl-item-content"><input class="text" type="text"></div></div>'
    );
    $style.appendTo($(".edit-panel .panel-ctrl"));
    showStyle();
    function showStyle() {
      $.each($(".font-select option"),function (i, v) {
        if(v.innerHTML === data.fontFamily){ this.selected = true; }
      });
      $(".font-number").val(parseInt(data.fontSize));
      switch (data.textAlign){
        case "left" : $($(".text-align>div")[0]).addClass("active").siblings().removeClass("active");break;
        case "center" : $($(".text-align>div")[1]).addClass("active").siblings().removeClass("active");break;
        case "right" : $($(".text-align>div")[2]).addClass("active").siblings().removeClass("active");break;
      }
      $(".font-color").css("color",data.color);
      data.fontWeight === "bold"?$(".font-bold").addClass("active"):$(".font-bold").removeClass("active");
      data.fontStyle  === "italic"?$(".font-italic").addClass("active"):$(".font-italic").removeClass("active");
      data.textDecoration.indexOf("underline") > -1?$(".font-underline").addClass("active"):$(".font-underline").removeClass("active");
      $(".code").val(data.code);
      $(".text").val(data.text);
    }
    setStyle();
    function setStyle() {
      //font-family设置
      $(".font-select").off("change").on("change",function () {
        $this[0].style.fontFamily = $(this).val();
      });
      //font-size 设置
      $(".font-number").off("change").on("change",function () {
        $this[0].style.fontSize = $(this).val()+"px";
      });
      //文字color设置
      $(".color-choose").off("change").on("change",function () {
        $this[0].style.color = $(this).val();
        $(this).parents(".font-color").css("color",$(this).val());
      });
      //文字加粗font-weight
      $(".font-bold").off("click").on("click",function () {
        $(this).toggleClass("active");
        $(this).hasClass("active")?$($this).css("font-weight","bold"):$($this).css("font-weight","normal");
      });
      //文字倾斜设置font-style
      $(".font-italic").off("click").on("click",function () {
        $(this).toggleClass("active");
        $(this).hasClass("active")?$($this).css("font-style","italic"):$($this).css("font-style","normal");
      });
      //文字添加下划线
      $(".font-underline").off("click").on("click",function () {
        $(this).toggleClass("active");
        $(this).hasClass("active")?$($this).css("text-decoration","underline"):$($this).css("text-decoration","none");
      });
      //文字对齐 text-align
      $(".text-align>div").off("click").on("click",function () {
        var index = $(this).index();
        $(this).addClass("active").siblings().removeClass("active");
        switch (index){
          case 0 : $($this).css("text-align","left");break;
          case 1 : $($this).css("text-align","center");break;
          case 2 : $($this).css("text-align","right");break;
        }
      });
      //code 设置
      $(".code").off("change").on("change",function () {
        $this.attr("code",$(this).val()) ;
      });
      //text 设置
      $(".text").off("change").on("change",function () {
        $this.attr("text",$(this).val()) ;
      });
    }
  };
  var renderCustomEditPanel = function () {
    var val = $this.text();
    renderDefaultEditPanel();
    $(".text").parents(".ctrl-item").css("display","none");
    $('<div class="ctrl-item"><label class="ctrl-item-title">文字项目</label><div class="ctrl-item-content"><input class="custom-content" type="text" value="'+val+'"></div></div>').appendTo($(".edit-panel .panel-ctrl"));
    $(".edit-panel .custom-content").on("input",function () {
      $this.find(".custom-text").text($(this).val());
    });
  };
  var renderLineEditPanel = function () {
    //先清除内容
    $(".edit-panel .panel-ctrl").html("");
    $this.css('background-color', '#fff');
    //getStyle
    var data = {};
    if($this.attr("direction") ==="horizontal" ){
      data.lineWidth       = $this.css("border-top-width");
      data.lineColor       = rgb2hex($this.css("border-top-color"));
      data.lineStyle       = $this.css("border-top-style");
    }else if ($this.attr("direction") ==="vertical" ){
      data.lineWidth       = $this.css("border-right-width");
      data.lineColor       = rgb2hex($this.css("border-right-color"));
      data.lineStyle       = $this.css("border-right-style");
    }
    data.lineDirection   = $this.attr("direction");
    data.code            = $this.attr("code");
    //默认样式
    var $style = $('<div class="ctrl-item">' +
      '<label class="ctrl-item-title">线条样式</label>'+
      '<div class="ctrl-item-content">'+
      '<select class="line-style" name="lineStyle"><option value="solid" name="solid">solid</option><option value="dashed" name="dashed">dashed</option><option value="dotted" name="dotted">dotted</option><option value="double " name="double">double</option></select>' +
      '</div>' +
      '</div>\n' +
      '<div class="ctrl-item"><label class="ctrl-item-title">线条宽度</label><input class="line-width" type="number" name="line-width" value="2">px</div>' +
      '<div class="ctrl-item"><label class="ctrl-item-title">线条颜色</label><div class="ctrl-item-content"><div class="line-color"><input class="color-choose" type="color"></div></div></div>' +
      '<div class="ctrl-item"><label class="ctrl-item-title">线条方向</label><div class="ctrl-item-content line-direction"><div class="line-horizontal active">水平</div><div class="line-vertical">垂直</div></div></div>'+
      '<div class="ctrl-item"><label class="ctrl-item-title">code</label><div class="ctrl-item-content"><input class="code" type="text"></div></div>'
    );
    $style.appendTo($(".edit-panel .panel-ctrl"));
    showStyle();
    function showStyle() {
      $.each($(".line-style option"),function (i, v) {
        if(v.innerHTML === data.lineStyle){ this.selected = true; }
      });
      $(".line-width").val(parseInt(data.lineWidth));
      $(".line-color .color-choose").val(data.lineColor);
      $.each($(".line-direction>div"),function (i, v) {
        if(v.className.indexOf(data.lineDirection) > -1){
          $(v).addClass('active').siblings().removeClass("active");
        }
      });
      $(".code").val(data.code);
    }
    setStyle();
    function setStyle(){
      //line-style设置
      $(".line-style").off("change").on("change",function () {
        $this[0].style.borderTopStyle = $(this).val();
        $this[0].style.borderRightStyle = $(this).val();
      });
      //line-width 设置
      $(".line-width").off("change").on("change",function () {
        $this[0].style.borderTopWidth = $(this).val()+"px";
        $this[0].style.borderRightWidth = $(this).val()+"px";
      });
      //line-color设置
      $(".color-choose").off("change").on("change",function () {
        $this[0].style.borderTopColor = $(this).val();
        $this[0].style.borderRightColor = $(this).val();
      });
      //line-direction 设置
      $(".line-direction").off("click").on("click","div",function () {
        $(this).addClass("active").siblings().removeClass("active");
        if($(this).hasClass("line-horizontal")){
          if(parseInt($this.css("height")) >= 50){$this.css("width",$this.css("height"));}
          $this.addClass("line-h").removeClass('line-v');
          $this.attr("direction",'horizontal');
        }else if($(this).hasClass("line-vertical")){
          if(parseInt($this.css("width")) >= 50){$this.css("height",$this.css("width"));}
          $this.addClass("line-v").removeClass('line-h');
          $this.attr("direction",'vertical');
        }
      });
      //code 设置
      $(".code").off("change").on("change",function () {
        $this.attr("code",$(this).val());
      });
    }
  };
  var createPanel = function (element) {
    var frage = document.createDocumentFragment();
    //创建面板
    var panel = createElement("div",{"class":element.split(".")[1]});
    $(panel).appendTo($(frage));

    //创建title
    $('<div class="title">打印项目编辑</div>').appendTo($(panel));
    //创建panel-ctrl
    $(createElement("div",{"class":"panel-ctrl"})).appendTo($(panel));
    //删除按钮
    $('<div class="btn-delete">删除打印项目</div>').appendTo($(panel));

    $(frage).appendTo($(document.body));
  };
};
var Xedit = function () {
  this.elem = "";
  this.init = function (elem, w, h) {
    $(elem).html("");
    this.elem = elem;
    //设置目标元素样式
    w = w?w:$(elem).width();
    h = h?h:$(elem).height();
    $(elem).css({
      position: "relative",
      width: w,
      height: h,
      padding: "18px",
      border: "1px solid #ccc",
      overflow: "hidden"
    });
    //标尺
    $('<div id="stage"><div id="panel"></div></div>').appendTo($(elem));
    renderRule("#panel", elem);
    //打印项目面板
    xedit.addPanel();
    //添加打印项目
    addElement();
    //面板事件
    panel();
    //元素尺寸改变函数
    resize(".move-element");
    //元素拖拽移动函数
    $.each($("#panel .move-element"), function () {
      drag(this, this, "#panel");
    });
    drag(".table-ctrl>.title", ".table-ctrl", document.body);
    drag(".add-panel>.title", ".add-panel", document.body);
  };
  this.addPanel = function () {
    if ($(document.body).find(".add-panel").length <= 0) {
      var $addPanel = $('<div class="add-panel"><div class="title">打印项目添加</div></div>').appendTo($(document.body));
      var $addCtrl = $('<div class="add-ctrl"></div>').appendTo($addPanel);
      $('<div class="ctrl-item add-table" xedit-type="table">添加一个表格</div>').appendTo($addCtrl);
      $('<div class="ctrl-item add-custom" xedit-type="xlable">自定义文字</div>').appendTo($addCtrl);
      $('<div class="ctrl-item add-default" xedit-type="lable" xedit-code="username" xedit-text="[姓名]">收货人-姓名</div>').appendTo($addCtrl);
      $('<div class="ctrl-item add-line" xedit-type="line">线条</div>').appendTo($addCtrl);
    }
  };
  this.get = function () {
    var datas = {};
    datas.panel = {
      width: $(this.elem)[0].offsetWidth,
      height: $(this.elem)[0].offsetHeight,
    };
    datas.elements = [];

    $.each($("#panel .move-element"), function () {
      $(this).css("background-color", "#fff");
      $(this).find(".rth").remove();

      var elem = {};
      elem.x = this.offsetLeft;
      elem.y = this.offsetTop;
      elem.w = this.offsetWidth;
      elem.h = this.offsetHeight;
      elem.style = $(this).attr("style");
      elem.code = $(this).attr("code");
      if ($(this).hasClass("table")) {
        elem.type = "table";
        elem.tableData = {};
        var gridHeader = [];
        var gridBody = [];
        $.each($(this).find("th.td"), function () {
          var item = {};
          item.itemValue = this.innerHTML;
          item.code = $(this).attr("code");
          $(this).attr("type")&&(item.type = $(this).attr("type"));
          item.style = $(this).attr("style");
          if (this.style.display !== "none") {
            item.isShow = true;
          } else {
            item.isShow = false;
          }
          gridHeader.push(item);
        });
        $.each($($(this).find(".tr")), function (i, v) {
          if (i > 0) {
            var body = [];
            $.each($(v).find("td.td"), function () {
              var item = {};
              if($(this).attr('type')&&$(this).attr('type')==='img'){
                item.itemValue = $(this).children('img').attr('src');
                item.type      = $(this).attr('type');
              }else{
                item.itemValue = this.innerHTML;
              }

              item.style = $(this).attr("style");
              if (this.style.display !== "none") {
                item.isShow = true;
              } else {
                item.isShow = false;
              }
              body.push(item);
            });
            gridBody.push(body);
          }
        });
        elem.tableData.gridHeader = gridHeader;
        elem.tableData.gridBody = gridBody;

        datas.elements.push(elem);
      } else if ($(this).hasClass("div-default")) {
        elem.type = "label";
        elem.text = $(this).attr("text");
        elem.value = $(this).children(".default-text").text();

        datas.elements.push(elem);
      } else if ($(this).hasClass("div-custom")) {
        elem.type = "xlabel";
        elem.value = $(this).children(".custom-text").text();

        datas.elements.push(elem);
      }else if($(this).hasClass("div-line")){
        elem.type = "line";
        elem.direction = $(this).attr("direction");
        datas.elements.push(elem);
      }

    });
    $(".edit-panel").remove();
    return datas;
  };
  this.setWidth = function (size) {
    $(this.elem).css("width", size);
    renderRule("#panel", this.elem);
  };
  this.setHeight = function (size) {
    $(this.elem).css("height", size);
    renderRule("#panel", this.elem);
  };
  this.setDatas = function (datas) {
    this.init("#target");
    $("#panel").html("");
    $(".edit-panel").remove();
    this.setWidth(datas.panel.width);
    this.setHeight(datas.panel.height);
    $.each(datas.elements, function (i, v) {
      switch (v.type) {
        case "label" :
          var addElem = $('<div class="div-default move-element" code="'+v.code+'" text="'+v.text+'" style="' + v.style + '"><span class="default-text">' + v.value + '</span></div>').appendTo($("#panel"));
          break;
        case "xlabel" :
          var addElem = $('<div class="div-custom move-element"  code="'+v.code+'" style="' + v.style + '"><span class="custom-text">' + v.value + '</span></div>').appendTo($("#panel"));
          break;
        case "line" :
          var addElem = $('<div class="div-line move-element" direction="'+v.direction+'"  code="'+v.code+'" style="' + v.style + '"></div>').appendTo($("#panel"));

          switch ($(addElem).attr("direction")){
            case "horizontal": $(addElem).addClass("line-h").removeClass("line-v");
              break;
            case "vertical": $(addElem).addClass("line-v").removeClass("line-h");
              break;
          }

          break;
        case "table" :
          addTable(v.tableData, v);
          break
      }

      addElem !== undefined && addElem.css({width: v.w, height: v.h, left: v.x, top: v.y,});
      drag(addElem, addElem, "#panel");
      resize(".move-element");
      panel();
    });
  };
  this.setImg = function (url) {
    if($("#panel").find(".panel-bg").length <= 0){
      var addElem = $('<div class="move-element"><img class="panel-bg" alt=""></div>').appendTo($("#panel"));
      addElem.css("z-index",0);
      drag(addElem, addElem, "#panel");
      resize(".move-element");
      panel();
    }
    $(".panel-bg").attr("src",url);
  };
  this.addTable = function (data) {
    addTable(data);
    resize(".move-element");
    panel();
  };
  this.addDefault = function (content) {
    var addElem = $('<div class="div-default move-element"><span class="default-text">【' + content + '】</span></div>').appendTo($("#panel"));
    drag(addElem, addElem, "#panel");
    resize(".move-element");
    panel();
  };
  this.addCustom = function (content) {
    var addElem = $('<div class="div-custom move-element"><span class="custom-text">【' + content + '】</span></div>').appendTo($("#panel"));
    drag(addElem, addElem, "#panel");
    resize(".move-element");
    panel();
  };
  this.getHtml = function (datas) {
    this.setDatas(datas);

    if($(".div-default").length > 0){
      $.each($(".div-default"),function (i, v) {
        var text = $(v).children('.default-text').html();
        text = text.replace($(v).attr('text'),'${'+$(v).attr('code')+'}');
        $(v).children('.default-text').html(text);
      });
    }

    if($(".table").length > 0){
      $.each($(".table"),function (i, v) {
        $.each($(v).find('th'),function (i2,v2) {
          if($(v2).attr('type')&&$(v2).attr('type')==='img'){
            $(v).children('tbody').find('td.td')[i2].innerHTML = '<img src="${item.'+$(v2).attr('code')+'}">';
          }else{
            $(v).children('tbody').find('td.td')[i2].innerHTML = '${item.'+$(v2).attr('code')+'}';
          }
        });
      });
    }

    var html = $("#stage").html();

    if($(".table").length > 0){
      html = html.replace('<tbody>','<tbody>\n' +
        '\t\t\t[#if order?? && order.item?size gt 0]\n' +
        '\t\t\t[#list order.items as item]');
      html = html.replace('</tbody>','[/#list]\n' +
        '\t\t\t[/#if]\n' +
        '\t\t\t</tbody>');
    }

    var head   = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>test</title><link rel="stylesheet" href="${base}/css/template-test.css"></head><body>';
    var footer = '</body></html>';

    html = head + html + footer;

    return html;
  }
};
var xedit = new Xedit();

































