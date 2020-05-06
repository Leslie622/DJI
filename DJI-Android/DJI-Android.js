//=====================导航菜单触发===================
var oHtml = document.querySelector("html");
var oBody = document.querySelector("body");
var oNavbarControl = document.querySelector(".navbar-control");
var oSiteHeader = document.querySelector(".site-header");
var oNavbarContent = document.querySelector(".navbar-content");
oNavbarControl.addEventListener("click", function () {
    oSiteHeader.classList.toggle("header-opened");
    setTimeout(function () {
        oNavbarContent.classList.remove("slide");
    }, 400)
    oHtml.classList.toggle("headerOpen");
    oBody.classList.toggle("headerOpen");
})
//=====================导航菜单项===================
var oCategoryItem = document.querySelector(".category-item");
var oCategoryItemMenu = document.querySelector(".category-item-menu");
var oMenuA = oCategoryItemMenu.children[0];
var oItemA = oCategoryItem.children[0];
oItemA.addEventListener("click", function () {
    oNavbarContent.classList.add("slide");
})
oMenuA.addEventListener("click", function () {
    oNavbarContent.classList.remove("slide");
})
//=====================购物车触发===================
var oNavbarShop = document.querySelector(".navbar-shopingbag");
oNavbarShop.addEventListener("click", function () {
    oSiteHeader.classList.toggle("shopping-opened");
    oHtml.classList.toggle("headerOpen");
    oBody.classList.toggle("headerOpen");
})
//======================头部动画效果===================
document.onscroll = function () {
    var iScrollTop = document.documentElement.scrollTop;
    if (iScrollTop != 0) {
        oSiteHeader.classList.add("sticky-nav");
    } else {
        oSiteHeader.classList.remove("sticky-nav");
    }
}
//======================banner轮播===================
var aBannerItem = document.querySelectorAll(".banner-item");
var aBannerPoint = document.querySelectorAll(".banner-point li");
var iWindowWidth = document.documentElement.offsetWidth;//元素宽度
var iNow = 0;
var timer = null;
var iBannerLen = aBannerItem.length;
aBannerItem[0].style.opacity = 1;
aBannerPoint[0].classList.add("pointActive");
function loopShow() {
    timer = setInterval(function () {
        iNow++;
        judgeINow();
        change();
    }, 5000)
}
loopShow();
//——————————————————————banner手指滑动———————————————————————
var oBanner = document.querySelector(".homepage-banner");
var iStartX = 0;//手指初始X坐标
var iMoveX = 0;//手指移动距离
oBanner.addEventListener("touchstart", function (e) {//手指按下
    MoveTimeStart = new Date()//记录事件触发时间
    iStartX = e.targetTouches[0].pageX;//记录手指的初始坐标
    clearInterval(timer);
})
oBanner.addEventListener("touchmove", function (e) {//手指移动
    iMoveX = e.targetTouches[0].pageX - iStartX;//记录手指移动距离
    var iOpacity = Math.abs(iMoveX) / iWindowWidth;//手指移动对应的透明度
    for (var i = 0; i < iBannerLen; i++) {//取消过渡效果
        aBannerItem[i].style.transition = "none"
    }
    aBannerItem[iNow].style.opacity = 1 - iOpacity;
    if (iMoveX > 0) {
        if (iNow == 0) {
            aBannerItem[iNow + (iBannerLen - 1)].style.opacity = iOpacity;
        } else {
            aBannerItem[iNow - 1].style.opacity = iOpacity;
        }
    } else {
        if (iNow == iBannerLen - 1) {
            aBannerItem[iNow - (iBannerLen - 1)].style.opacity = iOpacity;
        } else {
            aBannerItem[iNow + 1].style.opacity = iOpacity;
        }
    }
})
oBanner.addEventListener("touchend", function () {
    MoveTimeEnd = new Date()
    DeltaT = MoveTimeEnd - MoveTimeStart;
    console.log(DeltaT)
    if (Math.abs(iMoveX) > (iWindowWidth * 0.4) || DeltaT < 130) {//判断移动距离和方向
        if (iMoveX < 0) {
            iNow++;
            judgeINow()
            change()
        } else {
            iNow--;
            judgeINow()
            change()
        }
    } else {
        change()
    }
    for (var i = 0; i < iBannerLen; i++) {//添加过渡
        aBannerItem[i].style.transition = "all .2s"
    }
    iMoveX = 0;//手指抬起清除iMoveX
    loopShow();//开始轮播
})
function judgeINow() {//判断iNow
    if (iNow > (iBannerLen - 1)) {
        iNow = 0;
    } else if (iNow < 0) {
        iNow = (iBannerLen - 1);
    }
}
function change() {
    for (var i = 0; i < iBannerLen; i++) {
        aBannerItem[i].style.opacity = 0;
        aBannerPoint[i].classList.remove("pointActive");
    }
    aBannerItem[iNow].style.opacity = 1;
    aBannerPoint[iNow].classList.add("pointActive");
}










//======================grids轮播===================
var oImgModular = document.querySelector(".img-modular");
var aImgItem = document.querySelectorAll(".img-item");
var oGridsPoint = document.querySelector(".grids-point");
var aGridsPointItem = oGridsPoint.querySelectorAll("li");
var oEquipmentList = document.querySelector(".equipment-list");
var aEquipmentItem = document.querySelectorAll(".equipment-item");
var aPhotographerItem = document.querySelectorAll(".photographer-list>li");
var oLearnMore = document.querySelector(".learnMore");
var iEquipmentItemLen = aEquipmentItem.length
var index = 0;
var iTranslateX = 0;
var timer1 = null;
var MoveTimeStart = null;
var MoveTimeEnd = null;
var DeltaT = 0;
aGridsPointItem[0].classList.add("point-active")//初始化指向点
girdsLoopShow()//开启轮播
oImgModular.addEventListener("transitionend", function () {//监听ul的过渡 
    if (index >= 3) {
        index = 0;
        replaceTranslateX("none")
    } else if (index < 0) {
        index = 2;
        replaceTranslateX("none")
    }
    oGridsPoint.querySelector("li.point-active").classList.remove("point-active");//清除所有指向点的样式
    oGridsPoint.children[index].classList.add("point-active");//为当前指向点添加样式
    //————————————————————文字轮播————————————————————
    if (index > (iEquipmentItemLen - 1)) {
        index = 0;
    } else if (index < 0) {
        index = (iEquipmentItemLen - 1);
    }
    for (var i = 0; i < iEquipmentItemLen; i++) {
        aEquipmentItem[i].classList = " ";
    }
    if (index == (iEquipmentItemLen - 1)) {
        aEquipmentItem[index].classList.add("equipment-item-active")
        aEquipmentItem[index - 1].classList.add("equipment-item-prev")
        aEquipmentItem[index - (iEquipmentItemLen - 1)].classList.add("equipment-item-next")
    } else if (index == 0) {
        aEquipmentItem[index].classList.add("equipment-item-active")
        aEquipmentItem[index + (iEquipmentItemLen - 1)].classList.add("equipment-item-prev")
        aEquipmentItem[index + 1].classList.add("equipment-item-next")
    }
    else {
        aEquipmentItem[index].classList.add("equipment-item-active")
        aEquipmentItem[index - 1].classList.add("equipment-item-prev")
        aEquipmentItem[index + 1].classList.add("equipment-item-next")
    }
    //————————————————————文字轮播————————————————————
    for (var i = 0; i < aPhotographerItem.length; i++) {
        aPhotographerItem[i].classList.remove("photographer-active");
    }
    aPhotographerItem[index].classList.add("photographer-active");
    if (index == 0) {
        oLearnMore.style.animation = "move .5s .3s forwards";
    } else if (index == 1) {
        oLearnMore.style.animation = "move1 .5s .3s forwards"
    } else {
        oLearnMore.style.animation = "move2 .5s .3s forwards"
    }
})
oImgModular.addEventListener("touchstart", function (e) {
    MoveTimeStart = new Date()//记录事件触发时间
    clearInterval(timer1)
    iStartX = e.targetTouches[0].pageX;//获取手指相对于屏幕的X坐标
})
oImgModular.addEventListener("touchmove", function (e) {
    iMoveX = e.targetTouches[0].pageX - iStartX;//手指移动距离
    iTranslateX = -index * iWindowWidth + iMoveX
    oImgModular.style.transition = "none"
    oImgModular.style.transform = "translateX(" + iTranslateX + "px)";
})
oImgModular.addEventListener("touchend", function () {//滑动距离判断
    MoveTimeEnd = new Date()
    DeltaT = MoveTimeEnd - MoveTimeStart;
    if (Math.abs(iMoveX) > iWindowWidth / 3 || DeltaT < 130) {
        if (iMoveX > 0) {
            index--
        } else {
            index++
        }
        replaceTranslateX("all .2s")
    } else {
        replaceTranslateX("all .2s")
    }
    girdsLoopShow()
    iMoveX = 0;
})
function replaceTranslateX(isTransition) {
    iTranslateX = -index * iWindowWidth;
    oImgModular.style.transition = isTransition
    oImgModular.style.transform = "translateX(" + iTranslateX + "px)";
}
function girdsLoopShow() {
    timer1 = setInterval(function () {//定时轮播
        index++;
        iTranslateX = -index * iWindowWidth;//计算要移动的距离 = 当前index*屏幕宽度
        oImgModular.style.transition = "all .2s"//添加动画效果
        oImgModular.style.transform = "translateX(" + iTranslateX + "px)";//更新移动距离
    }, 4000)
}


























//======================回到顶部===================
var oBackTop = document.querySelector(".backTop");
oBackTop.addEventListener("click", function () {
    document.body.scrollIntoView({ behavior: 'smooth' })
})
//======================footer 手风琴===================
var aCategoryContent = document.querySelectorAll(".footer-category-content");
var aCategoryLi = document.querySelectorAll(".footer-category>li");
var aCategoryA = document.querySelectorAll(".footer-category>li>a");
for (var i = 0; i < aCategoryA.length; i++) {
    aCategoryA[i].index = i;
    aCategoryA[i].addEventListener("click", function (e) {
        var iHeight = aCategoryContent[this.index].querySelectorAll("li").length
        for (var i = 0; i < aCategoryA.length; i++) {
            aCategoryContent[i].style.height = 0;
            aCategoryLi[i].classList.remove("footer-category-active")
        }
        if (aCategoryContent[this.index].offsetHeight != 0) {
            aCategoryContent[this.index].style.height = 0;
        } else {
            aCategoryContent[this.index].style.height = iHeight * 36 + 20 + "px";
            aCategoryLi[this.index].classList.add("footer-category-active")
        }
    })
}
//======================footer 邮箱验证===================
var oTip = document.querySelector(".tip");
var oEmailInput = document.querySelector(".subscribe-input>input");
var oSubmit = document.querySelector(".subscribe-input>a");
function emailCheck() {
    var email = oEmailInput.value
    var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    if (reg.test(email)) {
        oTip.style.opacity = 1;
        oTip.innerText = "订阅成功（骗你的）"
    } else {
        oTip.style.opacity = 1;
        oTip.innerText = "请输入正确的邮箱地址。"
    }
}
oEmailInput.addEventListener("focus", function () {
    oTip.style.opacity = 0;
})
oSubmit.addEventListener("click", function () {
    emailCheck()
})