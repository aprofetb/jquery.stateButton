/*!
 * jQuery.stateButton: jQuery State Button v1.0.0.20180129
 * https://github.com/aprofetb/jquery.stateButton
 * 
 * @requires jQuery v1.2 or above
 */

(function($) {
  "use strict";

  $.fn.stateButton = function(options) {

    function getSettings($button) {
      return $button.data('stateButton.settings');
    }
    function setSettings($button, settings) {
      return $button.data('stateButton.settings', settings);
    }
    function getFirstState($button) {
      var settings = getSettings($button);
      return settings.states($button)[0];
    }
    function getCurrentState($button) {
      var settings = getSettings($button);
      var currentState = settings.current;
      return currentState || currentState !== '' ? String(currentState) : getFirstState($button);
    }
    function getNextState($button) {
      var settings = getSettings($button);
      var currentState = getCurrentState($button);
      var currentStateIndex = currentState ? $.inArray(currentState, settings.states) : -1;
      return settings.states[(currentStateIndex + 1) % settings.states.length];
    }
    function setState($button, state) {
      var settings = getSettings($button);
      if (!state)
        state = getFirstState($button);
      var prevState = settings.current;
      settings.current = state;
      if (settings.text[state])
        $button.html(settings.text[state]);
      if (settings.tooltip[state])
        $button.attr('title', settings.tooltip[state]);
      if (prevState && settings.styleClass[prevState])
        $button.removeClass(settings.styleClass[prevState]);
      if (settings.styleClass[state])
        $button.addClass(settings.styleClass[state]);
      $button.attr('style', settings.orgInlineStyle || '');
      settings.orgInlineStyle = $button.attr('style');
      if (settings.inlineStyle[state])
        $button.css(settings.inlineStyle[state]);
    }

    return this.each(function() {
      var $button = $(this);

      var states = $button.data('state-values');
      states = states ? String(states).split(",") : ['true', 'false'];

      var text = {}, tooltip = {}, styleClass = {}, inlineStyle = {};
      $.each(states, function(i, state) {
        text[state] = $button.data('state-text-' + state) || '';
        tooltip[state] = $button.data('state-tooltip-' + state) || '';
        styleClass[state] = $button.data('state-class-' + state) || '';
        inlineStyle[state] = $button.data('state-style-' + state) || '';
      });

      var current = $button.data('state-current') || getFirstState($button);
      var clickCallback = $button.data('state-click-callback');

      var defaults = {
        current       : current,       // current state
        states        : states,        // values that the state of the button can get
        text          : text,          // button text per state
        tooltip       : tooltip,       // button tooltip per state
        styleClass    : styleClass,    // button class per state
        inlineStyle   : inlineStyle,   // button style per state
        clickCallback : clickCallback  // button click callback function
      };

      var settings = $.extend(defaults, options);
      setSettings($button, settings);

      setState($button, getCurrentState($button));
      $button.click(function() {
        var oldState = getCurrentState($button);
        var newState = getNextState($button);
        setState($button, newState);
        if (settings.clickCallback)
          settings.clickCallback.apply(this, [newState, oldState]);
      });
    });

  };

}(jQuery));