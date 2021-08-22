//不使用JQuery版的

import html2canvas from 'html2canvas';
import JsPDF from 'jspdf';
import $ from 'jquery';

/**
 * @param  ele          要生成 pdf 的DOM元素（容器）
 * @param  padfName     PDF文件生成后的文件名字
 * */

function downloadPDF(ele, pdfName){
    let eleW = ele.offsetWidth;// 获得该容器的宽
    let eleH = ele.offsetHeight;// 获得该容器的高
    let eleOffsetTop = ele.offsetTop;  // 获得该容器到文档顶部的距离
    let eleOffsetLeft = ele.offsetLeft; // 获得该容器到文档最左的距离
    var canvas = document.createElement("canvas");
    var abs = 0;
    let win_in = document.documentElement.clientWidth || document.body.clientWidth; // 获得当前可视窗口的宽度（不包含滚动条）
    let win_out = window.innerWidth; // 获得当前窗口的宽度（包含滚动条）
    if(win_out>win_in){
        abs = (win_out - win_in)/2;    // 获得滚动条宽度的一半
    }
    canvas.width = eleW * 2;    // 将画布宽&&高放大两倍
    canvas.height = eleH * 2;
    var context = canvas.getContext("2d");
    context.scale(2, 2);
    context.translate(-eleOffsetLeft -abs, -eleOffsetTop);
    // 这里默认横向没有滚动条的情况，因为offset.left(),有无滚动条的时候存在差值，因此
    // translate的时候，要把这个差值去掉
    html2canvas( ele, {
        dpi: 300,
        // allowTaint: true,  //允许 canvas 污染， allowTaint参数要去掉，否则是无法通过toDataURL导出canvas数据的
        useCORS:true  //允许canvas画布内 可以跨域请求外部链接图片, 允许跨域请求。
    } ).then( (canvas)=>{
        var contentWidth = canvas.width;
        var contentHeight = canvas.height;
        //一页pdf显示html页面生成的canvas高度;
        var pageHeight = contentWidth / 592.28 * 841.89;
        //未生成pdf的html页面高度
        var leftHeight = contentHeight;
        //页面偏移
        var position = 0;
        //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
        var imgWidth = 595.28;
        var imgHeight = 595.28/contentWidth * contentHeight;
        var pageData = canvas.toDataURL('image/jpeg', 1.0);
        var pdf = new JsPDF('', 'pt', 'a4');
        //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
        //当内容未超过pdf一页显示的范围，无需分页
        if (leftHeight < pageHeight) {
            //在pdf.addImage(pageData, 'JPEG', 左，上，宽度，高度)设置在pdf中显示；
            pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight);
            // pdf.addImage(pageData, 'JPEG', 20, 40, imgWidth, imgHeight);
        } else {    // 分页
            while(leftHeight > 0) {
                pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight);
                leftHeight -= pageHeight;
                position -= 841.89;
                //避免添加空白页
                if(leftHeight > 0) {
                    pdf.addPage();
                }
            }
        }
        //可动态生成
        pdf.save(pdfName);
    })
}

// 生成快照
function convertToImage(container, options = {}) {
    // html2canvas配置项
    const ops = {
        backgroundColor: "#ffffff",
        scale: 4,
        width: container.offsetWidth, // canvas的宽度
        height: container.scrollHeight, // canvas的高度，包含了不可见的滚动部分
        useCORS: true,
        allowTaint: false,
        // windowWidth: container.offsetWidth,
        // windowHeight: container.offsetHeight,
        // 克隆一个dom的节点，设置其高度为滚动高度，解决滚动条无法截图全部的情况
        onclone: function(doc, dom){
            // 设置表格默认的宽度
            $(dom).css("width", "800px");
            $(dom).css("border", "1px solid #EBEEF5");
            // 1.头部的最后一个gutter，设置为隐藏
            var $tHeaderdom = $(dom).find('.el-table__header-wrapper');
            $tHeaderdom.find("table thead tr th.gutter").css("display", "none");
            $tHeaderdom.find("table colgroup col").last().attr("width", 0)
            // 2.总的表格高度和body的高度
            var tHeaderHeight = $tHeaderdom.get(0).offsetHeight;
            var tBodyDom = dom.getElementsByClassName('el-table__body-wrapper')[0];
            var tBodyHeight = tBodyDom.scrollHeight;
            tBodyDom.style.height = tBodyHeight + "px";
            dom.style.height = (tHeaderHeight + tBodyHeight) + 'px';
            // 3.删除最外层的el-table--scrollable-y样式
            $(dom).removeClass("el-table--scrollable-y");
            // 4.设置body中的table宽度
            $(tBodyDom).find("table").css("width", dom.offsetWidth + "px");
            // 5.去掉html2Canvas的样式
            $(dom).find('html2canvaspseudoelement').css("display", "none");

            // document.body.appendChild(dom);
        },
        ...options
    };

    return html2canvas(container, ops).then(canvas => {
        // 返回图片的二进制数据
        return canvas;
    });
}

function exportPDF(imagesArr) {
    let [imgX, imgY] = [595.28, 841.89];
    console.log(imgY);
    let pdf = new JsPDF('p', 'pt', 'a4');
    for (let index = 0; index < imagesArr.length; index++) {
        const canvas = imagesArr[index];
        const image = canvas.toDataURL("image/png");
        let imgHeight = imgX / (canvas.width / canvas.height);
        pdf.addImage(image, 'PNG', 0, 0, imgX, imgHeight);
        pdf.addPage();
    }
    let targetPage = pdf.internal.getNumberOfPages();
    pdf.deletePage(targetPage);
    pdf.save("测试分页.pdf");
}

export default {
    downloadPDF,
    convertToImage,
    exportPDF
}
