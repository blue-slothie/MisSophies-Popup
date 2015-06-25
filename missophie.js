window.missophie = function (opts) {
  if(!opts)
    opts = this.default;
  var elms = new Array;
  this.opts = {};
  for (var key in opts)
    this.opts[key] = opts[key];
  var c = document.querySelectorAll(".sophies-popup");
  for ( var i=0; i<c.length; i++)
    elms.push(c[i]);
  this.popups = elms;
  this._createPopups();
}

missophie.prototype.default = {
  target: "body",
  width: 400,
  height: 400,
  duration: 250
};

missophie.prototype._createPopups = function (event) {
  var i,
      self=this;
  for ( i=0; i<self.popups.length; i++ ) {
    self.popups[i].parentElement.onmouseenter = function (event) {
      var popup = this.querySelector('.sophies-popup');
      var width    = popup.getAttribute('data-sophies-width')||self.opts.width,
          height   = popup.getAttribute('data-sophies-height')||self.opts.height,
          duration = popup.getAttribute('data-sophies-duration')||self.opts.duration;
      popup.style.display="block";
      popup.style.position="absolute";
      popup.style.opacity=0;
      var leftpos=this.clientWidth/2,
          toppos =this.clientHeight/2;
      var absleftpos=this.getBoundingClientRect().left+leftpos,
          abstoppos =this.getBoundingClientRect().top+toppos,
          maxleft = document.documentElement.clientWidth,
          maxtop  = document.body.clientHeight;
      //console.log(maxleft);
      var leftmargin=absleftpos-width/2,
          rightmargin=maxleft-absleftpos-width/2,
          topmargin=abstoppos-height/2,
          bottommargin=maxtop-abstoppos-height/2;
      console.log(maxtop);
      console.log(leftmargin + " " + topmargin + " " + rightmargin + " " + bottommargin);
      if ( rightmargin > leftmargin ){
        if ( leftmargin < 0 )
          leftpos += width/2-absleftpos;
      } else if (rightmargin < 0)
        leftpos += rightmargin;
      
      if ( bottommargin > topmargin ) {
        if ( topmargin  < 0 )
          toppos  += height/2-abstoppos;
      } else if (bottommargin < 0)
        toppos += bottommargin;
      //console.log(abstoppos-width/2);
      popup.style.left=leftpos;
      popup.style.top =toppos;
      self._animation(popup, {
        width: width,
        height: height,
        marginLeft: 0-width/2,
        marginTop: 0-height/2,
        opacity: 1
      }, duration);
    }
    
    self.popups[i].parentNode.onmouseleave = function () {
      var popup = this.querySelector('.sophies-popup');
      var duration = popup.getAttribute('data-sophies-duration')||self.opts.duration;
      self._animation(popup, {
        width: 0,
        height: 0,
        marginLeft: 0,
        marginTop: 0,
        opacity: 0
      }, duration, function () {
        popup.style.display="none";
      });
    }
    
  }
}

missophie.prototype._getCSS = function (elm) {
  return document.defaultView && 
    document.defaultView.getComputedStyle ?
    document.defaultView.getComputedStyle(elm, null) : 
    elm.currentStyle || elm.style;
}

missophie.prototype._animation = function (elm, opts, duration, func) {
  var deltas = {},
      style  = {};
  for ( var key in opts ) {
    style[key] = (this._getCSS(elm)+'').replace(/[^0-9]*$/g, '');
    style[key] = parseInt(style[key])||0;
    deltas[key] = opts[key] - style[key];
  }
  var start = new Date;
  var interval = setInterval(
    function () {
      var timepassed = new Date - start;
      var progress   = timepassed / duration;
      if ( progress > 1 ) progress = 1;
      delta = Math.pow(progress, 2);
      for ( var key in style )
        elm.style[key] = style[key]+delta*deltas[key];
      if ( progress === 1 ) {
        clearInterval(interval);
        if ( func && typeof func === 'function' )
          func.call(elm, []);
      }
    }, 2);
}