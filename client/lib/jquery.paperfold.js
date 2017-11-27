/*
=============================================================================

All of this is based on nice work from mrflix (http://www.felixniklas.de/)
in Paperfold (https://developer.mozilla.org/en-US/demosdetail/paperfold-css)

=============================================================================
*/


(function ($) {
  const fallback = false;

  // var TRANSFORM_NAME = Modernizr.prefixed('transform');

  const init = function (params) {
    const $this = $(this);

    const data = {
      toggle: null,
      height: 0,
      foldNum: 0,
      foldHeight: 0,
      foldList: null,
      content: null,
      folds: null,
      bottoms: null,
      tops: null
    };

    if (params.toggle) {
      var $toggle = null;

      if (params.toggle.constructor === $) {
        $toggle = params.toggle;
      } else if (params.toggle.constructor === Function) {
        $toggle = params.toggle.apply(this);
      } else if (params.toggle.cosntructor === String) {
        $toggle = $(params.toggle);
      }

      if ($toggle) {
        $toggle.data('paperfold-element', $this);
        data.toggle = $toggle;

        $toggle.click(methods.toggle);
      }
    }

    // Get the height of the elements
    var height = $this.height();

    if (!height) {
      const tmpHeight = $this.css('height');
      var height = $this.css('height', 'auto').height();
      $this.css('height', tmpHeight);
    }

    data.height = height;

    // Get the number of folds
    const foldNum = (params.folds || 1);
    data.foldNum = foldNum;

    // Get the height of the folds
    const foldHeight = Math.floor(height / foldNum);
    data.foldHeight = foldHeight;

    // Get the children of the element
    data.content = $(this).children().clone(true);

    $(this).children().wrapAll('<div class="default-content"/>')

    // Create all the folds
    // TODO: WTF, data['folds'] = $([]); doesnt work the same as this....
    const $foldList = $('<div class="paperfold-folds"/>');
    let topHeight,
      bottomHeight;
    for (let i = 0, j = 0; i < foldNum; i++, j += 2) {
      topHeight = bottomHeight = Math.floor(foldHeight / 2);

      // Adjust if the result folds are odd
      /* if( (i+1) === foldNum && foldHeight / 2 % 2 ) {
				bottomHeight = this.height - (j + 1) * topHeight;
			} */

      const tmpFold = createFold.call($this, j, topHeight, bottomHeight, data);
      $this.append(tmpFold);
    }

    data.folds = $this.find('> .fold');
    data.tops = $foldList.find('> .fold > .top');
    data.bottoms = $foldList.find('> .fold > .bottom');

    $this.bind('webkitTransitionEnd, oTransitionEnd, MSTransitionEnd, transitionend', transitionEnd);

    $this.bind('paperfold.show', function () {
      loadDefault.call($(this));
    });

    	$this.data('paperfold', data);

    	if (params.visible === true) {
      $this.addClass('visible');
    } else {
      $this.addClass('visible');
      methods.toggle.call($toggle);
    }

    	$this.addClass('ready');
    	$this.trigger('paperfold.load');
  }

  var transitionEnd = function () {
    const $this = $(this);

    $this.trigger('paperfold.toggle');

    if ($this.hasClass('visible')) {
      $this.trigger('paperfold.show');
    } else {
      $this.trigger('paperfold.hide');
    }
  }

  const cssTransform = function (value) {
    const $this = $(this);

    $this.css({
      '-webkit-transform': value,
      '-moz-transform': value,
      '-o-transform': value,
      '-ms-transform': value,
      transform: value
    });
  }

  var createFold = function (j, topHeight, bottomHeight, data) {
    const offsetTop = -j * topHeight;
    const offsetBottom = -data.height + j * topHeight + data.foldHeight;

    return $('<div class="fold"/>').css('height', topHeight + bottomHeight).append($('<div class="top"/>').css('height', topHeight).append($('<div class="inner"/>').css({ top: offsetTop, height: data.height }).append(data.content.clone()))).append($('<div class="bottom"/>').css('height', bottomHeight).append($('<div class="inner"/>').css({ bottom: offsetBottom, height: data.height }).append(data.content.clone())));
  }

  const loadFolds = function (endCallback) {
    const $this = $(this);
    const data = $this.data('paperfold');

    $this.find('.default-content').hide();
  };

  /**
	 * Load the default original content
	 * @method
	 * @private
	 */
  var loadDefault = function () {
    const $this = $(this);
    const data = $this.data('paperfold');

    $this.find('.default-content').show();
  }

  const foldOpen = function (percentage) {
    const $this = $(this);
    const data = $this.data('paperfold');

    // cache percentage
    data.percentage = percentage;
    // var percentage = $this.data('percentage') || 0;


    // data['timeVirigin'] = false;

    // change angle of tops and bottoms
    const c = data.foldHeight * percentage;
    let a,
      b;

    a = b = data.foldHeight / 2;

    const part = 2 * b * c;

    const bottomAngle = part <= 0 ? 90 : Math.acos((b * b + c * c - a * a) / part) * 180 / Math.PI;

    const topAngle = 360 - bottomAngle;

    // cssTransform.call(data['tops'], 'rotateX(' + topAngle + 'deg)');
    // cssTransform.call(data['bottoms'], 'rotateX(' + bottomAngle + 'deg)');

    // data['tops'].css(TRANSFORM_NAME, 'rotateX(' + topAngle + 'deg)');
    // data['bottoms'].css(TRANSFORM_NAME, 'rotateX(' + bottomAngle + 'deg)');

    // change folds height
    const foldHeight = data.height / data.foldNum * percentage;
    data.folds.height(foldHeight);

    // change the background color
    // from dark hsl(192,6,33) at 0
    // to light hsl(192,0,100) at 100
    let saturation = Math.round(6 - 6 * percentage),
      lightness = 33 + Math.round(67 * percentage),
      backgroundColor = `hsl(192,${saturation}%,${lightness}%)`;

    data.tops.add(data.bottoms).css('background-color', backgroundColor);
  };


  var methods = {
    toggle() {
      let $this = $(this);

      if (!$(this).hasClass('paperfold ready')) {
        $this = $(this).data('paperfold-element');
      }

      const data = $this.data('paperfold');

      if (fallback) {
        $this.slideToggle();
      } else {
        if ($this.hasClass('visible')) {
          loadFolds.call($this);
        }

        $this.toggleClass('visible');

		        if ($this.hasClass('visible')) {
		          	// open
		          	// animate folds height (css transition)
		          	data.folds.height(data.foldHeight);

		          	// if the time slider was already used, reset the folds
          foldOpen.call($this, 1);
		        } else {
		        	loadFolds.call($this);

		          	// close
		          	// animate folds height (css transition)
		          	data.folds.height(0);

		          	// if the time slider was already used, reset the folds
          foldOpen.call($this, 0);
		        }

		        data.folds.find(data.bottoms).css('background-color', '');// .css(TRANSFORM_NAME, '');

		        // cssTransform.call(data['folds'].find(data['bottoms']), '');
      }
    }
  }


  $.fn.paperfold = function (method) {
    if (methods[method]) {
      return methods[method].apply($(this), Array.prototype.slice.call(arguments, 1));
    } else if (method && method.constructor === Object) {
      return init.apply(this, arguments);
    }
  };
}(jQuery));
