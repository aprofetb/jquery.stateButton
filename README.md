# jquery.stateButton
jQuery State Button is a plugin that turns a button into a multi-state switch.


## Initialization

#### Using JS:
```js
$('#toggle').stateButton({
  values: [ "expanded", "collapsed" ],
  current: "collapsed",
  text: {
    "expanded" : "<i class='fa fa-minus-circle'><i/> Collapse",
    "collapsed": "<i class='fa fa-plus-circle'><i/> Expand"
  },
  tooltip: {
    "expanded" : "Collapse all",
    "collapsed": "Expand all"
  },
  styleClass: {
    "expanded" : "btn-expanded",
    "collapsed": "btn-collapsed"
  },
  inlineStyle: {
    "expanded": {
      "color": "red"
    },
    "collapsed": {
      "color": "green"
    }
  },
  clickCallback: function(newState, oldState) {
    console.log('button', this);
    console.log('old state', oldState);
    console.log('new state', newState);
  }
});
```

#### Using HTML data-state-* attributes:
```html
<button id="toggle"
        data-state-current="collapsed"
        data-state-values="collapsed,expanded"
        data-state-text-expanded="<i class='fa fa-minus-circle'></i> Collapse"
        data-state-text-collapsed="<i class='fa fa-plus-circle'></i> Expand"
        data-state-tooltip-expanded="Collapse all"
        data-state-tooltip-collapsed="Expand all"></button>
```
