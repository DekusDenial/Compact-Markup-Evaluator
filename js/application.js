(function(){

  function elementSupportsAttribute(element, attribute) {
    return (attribute in document.createElement(element));
  };

  if (!elementSupportsAttribute('textarea', 'placeholder')) {
    // Fallback for browsers that don't support HTML5 placeholder attribute
    var $titles = $('legend'), $txt = $titles.siblings();
    $.each($titles, function(_, title) {
      $txt.filter('#' + $(title).attr('title'))
          .data('text', 'Enter your ' + title.innerText + ' here...')
          .css('color', '#999')
          .on('focus', function() {
            if (this.value == $(this).data('text')) {
              this.value = '';
            }
          })
          .on('blur', function() {
            if (this.value == '') {
              this.value = $(this).data('text');
            }
          });
    });
  }

  var $output = $('iframe#output'), inner = $output.contents();
  var body = inner.find('body');
  var styles = inner.find('head').append('<style>').children('style').before('<style>body { background: white;}</style>');
  // make jQuery and its alias available to the iframe
  var $jslib = $('input:checked');
  if ($jslib && $jslib.val() == 'jquery') {
    $output[0].contentWindow.$ = $output[0].contentWindow.jQuery = window.top.$;
    window.output_context = $output[0].contentWindow.output_context = $output[0].contentWindow.document;
  }

    $('textarea').on('keyup', function() {
      var $area = $(this);
     if ($area.attr('id') === 'html') {
        body.html($area.val());
      } else if (($area.attr('id') === 'css')) {
        styles.text($area.val());
      } else {
        // $output[0].contentWindow.eval('(function (){ ' + $area.val() + ' })()');
        // $('iframe')[0].contentWindow.$('p', $('iframe').contents().find('body'));
        $output[0].contentWindow.eval($area.val());
      }
    });

})();