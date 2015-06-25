# MisSophies-Popup
It's a little poor animated onhover-popup JavaScript without any dependencies.

## Supported Browsers
Chrome and Firefox are supported but using `<!DOCTYPE html>` caused a bug. Internet Explorer not tested.

## Usage
Create a containing element having the class ___marker___ and maybe define a position:
```
<span class="marker" style="position: absolute; top: 50px; left: 50px"></span>
```
Insert the popup into that ___marker___-element. The popup consists of a body and optionally a title:
```
<div class="sophies-popup" data-sophies-height="400" data-sophies-width="500" data-sophies-duration="230">
  <div class="sophies-title">
    <h3>Hallo!</h3>
  </div>
  <div class="sophies-content">
    <p>Who ever reads this is</p>
    <h2>Awesome!</h2>
  </div>
</div>
```

So the popup will appear when the mouse is over the ___marker___. It will disappear when the mouse leaves either the ___marker___ or the popup.