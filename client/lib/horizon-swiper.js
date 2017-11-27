/*
 * Horizon Swiper
 * Version 1.1.1
 * Domain ( http://horizon-swiper.sebsauer.de/ )
 * Copyright 2015 Sebastian Sauer ( http://www.sebsauer.de/ )
 * Licensed under MIT ( https://github.com/sebsauer90/horizon-swiper/blob/master/LICENSE )
 */


(function (factory) {
  /**
   * Register plugin
   */
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    factory(require('jquery'));
  } else {
    factory(jQuery);
  }
}(($) => {
  /**
   * Global variables
   */
  const pluginName = 'horizonSwiper';
  const settings = {

    // Default settings
    item: '.horizon-item',
    showItems: 'auto',
    dots: false,
    numberedDots: false,
    arrows: true,
    arrowPrevText: '',
    arrowNextText: '',
    animationSpeed: 500,
    mouseDrag: true,

    // Methods and callbacks
    onStart: function onStart() {},
    onEnd: function onEnd() {},
    onSlideStart: function onSlideStart() {},
    onSlideEnd: function onSlideEnd() {},
    onDragStart: function onDragStart() {},
    onDragEnd: function onDragEnd() {}
  };

  const defaults = {
    $window: $(window),
    $document: $(document),

    innerClass: 'horizon-inner',
    outerClass: 'horizon-outer',
    dotContainer: '<nav class="horizon-dots"></nav>',
    arrowPrev: ['<button class="horizon-prev">', '</button>'],
    arrowNext: ['<button class="horizon-next">', '</button>'],
    showArrowsClass: 'arrows',
    showDotsClass: 'dots',
    initializedClass: 'initialized',
    mouseDragClass: 'mouse-drag',
    firstItemClass: 'first-item',
    lastItemClass: 'last-item'
  };

  /**
   * Plugin class
   */
  const HorizonSwiper = (function () {
    /**
     * Constructor
     */
    function Plugin(element, options) {
      const that = this;
      that.settings = $.extend({}, settings, options);

      that.$element = $(element);
      that.$items = that.$element.find(this.settings.item);
      that.$inner = null;
      that.$outer = null;
      that.$dots = null;
      that.$arrowPrev = null;
      that.$arrowNext = null;

      that.initialized = false;
      that.maxHeight = 0;
      that.innerContainerWidth = 0;
      that.viewportSize = 0;
      that.isAnimate = false;

      // Initialize if the document is ready and window is loaded

      const windowLoadFunction = function windowLoadFunction() {
        if (that.initialized) {
          that._setSizes();
        } else {
          setTimeout(() => {
            windowLoadFunction();
          }, 1000);
        }
      };

      defaults.$document.ready(() => {
        that.init();
      });


      defaults.$window.on('load', () => {
        windowLoadFunction();
      });

      /* defaults.$window.load(function () {
        windowLoadFunction();
      }); */
    }

    /**
     * Initialize
     */
    Plugin.prototype.init = function () {
      const that = this;

      that._setWrapper();
      that._addArrows();
      that._addDots();
      that._mouseDrag();
      that._setSizes();
      that._resize();

      that._checkPosition();
      that.initialized = true;
    };

    /**
     * Set variable sizes
     *
     * @private
     */
    Plugin.prototype._setSizes = function () {
      const that = this;
      that.maxHeight = 0;
      that.innerContainerWidth = 0;

      for (let i = 0; i < that.$items.length; ++i) {
        const $item = $(that.$items[i]);
        const height = $item.outerHeight(true);
        const width = $item.outerWidth(true);

        if (height > that.maxHeight) {
          that.maxHeight = height;
        }

        that.innerContainerWidth += width;
      }

      that.viewportSize = that.$inner.width();
      that.$outer.css({ 'max-height': `${that.maxHeight}px` });

      if (that.viewportSize < that.innerContainerWidth) {
        that.$element.addClass(defaults.initializedClass);

        if (that.settings.arrows) {
          that.$element.addClass(defaults.showArrowsClass);
        }

        if (that.settings.dots) {
          that.$element.addClass(defaults.showDotsClass);
        }
      } else {
        that.$element.removeClass(defaults.initializedClass);
        that.$element.addClass(defaults.showArrowsClass);
      }
    };

    /**
     * Resize
     *
     * @private
     */
    Plugin.prototype._resize = function () {
      const that = this;
      const resizeTimeout = null;

      const resizeFunction = function resizeFunction() {
        that._setSizes();
        that._checkPosition();
      };

      defaults.$window.resize(() => {
        clearTimeout(resizeTimeout);
        setTimeout(() => {
          resizeFunction();
        }, 250);
      });
    };

    /**
     * Include the wrapper elements to the DOM
     *
     * @private
     */
    Plugin.prototype._setWrapper = function () {
      const that = this;
      let itemWidth = 0;

      that.$items.wrapAll(`<div class="${defaults.outerClass}">`);
      that.$items.wrapAll(`<div class="${defaults.innerClass}">`);
      that.$inner = that.$element.find(`.${defaults.innerClass}`);
      that.$outer = that.$element.find(`.${defaults.outerClass}`);

      if (that.settings.showItems !== 'auto' && that.settings.showItems === parseInt(that.settings.showItems, 10)) {
        itemWidth = 100 / that.settings.showItems;
        that.$items.css({ width: `${itemWidth}%` });
      }

      for (let i = 0; i < that.$items.length; ++i) {
        $(that.$items[i]).attr('data-horizon-index', i);
      }
    };

    /**
     * Add dots to the swiper
     *
     * @private
     */
    Plugin.prototype._addDots = function () {
      const that = this;

      if (that.settings.dots) {
        that.$dots = $(defaults.dotContainer);

        for (let i = 0; i < that.$items.length; ++i) {
          const dotName = that.settings.numberedDots ? i : '';
          const $newDot = $(`<button class="horizon-dot" data-horizon-target="${i}">${dotName}</button>`);
          that.$dots.append($newDot);
        }

        that.$element.append(that.$dots);

        that.$dots.find('button').on('click', function (e) {
          e.preventDefault();
          const horizonTarget = $(this).attr('data-horizon-target');
          that._dotScroll(horizonTarget);
        });
      }
    };

    /**
     * Scroll to a dot target
     *
     * @param horizonTarget
     * @private
     */
    Plugin.prototype._dotScroll = function (horizonTarget) {
      const that = this;
      const $target = that.$dots.find(`[data-horizon-index="${horizonTarget}"]`);
      const targetWidth = $target.outerWidth(true);
      let leftOffset = 0;

      that.isAnimate = true;
      that.settings.onSlideStart();

      for (let i = 0; i < that.$items.length; ++i) {
        if (i < horizonTarget) {
          leftOffset += $(that.$items[i]).outerWidth(true);
        }
      }

      that.$inner.animate({
        scrollLeft: leftOffset
      }, that.settings.animationSpeed, () => {
        that._checkPosition();
        that.settings.onSlideEnd();

        if (horizonTarget === that.$items.length) {
          that.settings.onEnd();
        } else if (horizonTarget === 0) {
          that.settings.onStart();
        }

        that.isAnimate = false;
      });
    };

    /**
     * Inlude navigation arrows to the DOM and bind click events
     *
     * @private
     */
    Plugin.prototype._addArrows = function () {
      const that = this;

      if (that.settings.arrows === true) {
        that.$arrowPrev = $(defaults.arrowPrev[0] + that.settings.arrowPrevText + defaults.arrowPrev[1]);
        that.$arrowNext = $(defaults.arrowNext[0] + that.settings.arrowNextText + defaults.arrowNext[1]);
        that.$arrowNext.insertAfter(that.$outer);
        that.$arrowPrev.insertAfter(that.$outer);

        that.$element.addClass(defaults.firstItemClass);
        that.$arrowPrev.attr('disabled', 'disabled');

        that.$arrowPrev.on('click', (e) => {
          e.preventDefault();
          if (!that.isAnimate) {
            that._scrollTo('previous');
          }
        });

        that.$arrowNext.on('click', (e) => {
          e.preventDefault();
          if (!that.isAnimate) {
            that._scrollTo('next');
          }
        });
      }
    };

    /**
     *  Scroll to the previous or next item
     *
     * @param direction
     * @private
     */
    Plugin.prototype._scrollTo = function (direction) {
      const that = this;
      const offset = that._getOffset(direction);
      that.isAnimate = true;

      if (offset === 'end' || offset === 'start') {
        that.isAnimate = false;
        return;
      }

      that.settings.onSlideStart();

      that.$inner.animate({
        scrollLeft: offset[0]
      }, that.settings.animationSpeed, () => {
        if (offset[1] === 'end') {
          that.settings.onEnd();
        } else if (offset[1] === 'start') {
          that.settings.onStart();
        }

        that._checkPosition();
        that.settings.onSlideEnd();
        that.isAnimate = false;
      });
    };

    /**
     *  Get the offset to scroll to the next or previous item
     *
     * @param direction
     * @returns [offset, position]
     * @private
     */
    Plugin.prototype._getOffset = function (direction) {
      const that = this;
      const offsetState = that.$inner.scrollLeft();
      let calcActiveItem = 0;
      const viewWidth = offsetState + that.viewportSize;

      if (direction === 'next' && offsetState + that.viewportSize === that.innerContainerWidth) {
        return 'end';
      } else if (direction === 'previous' && offsetState === 0) {
        return 'start';
      }

      for (let i = 0; i < that.$items.length; ++i) {
        const width = $(that.$items[i]).outerWidth(true);
        let state = '';

        calcActiveItem += width;

        if (direction === 'next' && calcActiveItem > viewWidth) {
          if (i + 1 === that.$items.length) {
            state = 'end';
          }
          return [calcActiveItem - that.viewportSize, state];
        } else if (direction === 'previous' && calcActiveItem >= offsetState) {
          if (calcActiveItem - width <= 0) {
            state = 'start';
          }
          return [calcActiveItem - width, state];
        }
      }
    };

    /**
     *  Set the mouse drag support
     *
     * @private
     */
    Plugin.prototype._mouseDrag = function () {
      const that = this;
      let isTouchDevice = false;
      let isClicked = false;
      let mouseXposition = 0;
      let innerXposition = 0;
      const outerXposition = that.$inner.offset().left;
      let newPosition = 0;
      let isTouching = false;
      let isScrolling = false;
      let scrollTimer = null;

      const updatePosition = function updatePosition(e) {
        if (!isTouchDevice) {
          newPosition = innerXposition + (mouseXposition - e.pageX);
          that.$inner.scrollLeft(newPosition);
        }
      };

      // Touch events

      that.$element.on({
        touchstart: function touchstart(e) {
          isTouchDevice = true;
          isTouching = true;
          isScrolling = true;
          that.settings.onDragStart();
        }
      });

      defaults.$document.on({
        touchend: function touchend(e) {
          if (isTouching) {
            that._checkPosition();
            that.settings.onDragEnd();
            isTouching = false;
          }
        }
      });

      that.$inner.scroll(() => {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => {
          if (isScrolling) {
            that._checkPosition();
            that.settings.onDragEnd();
            isScrolling = false;
          }
        }, 250);
      });

      // Mouse events

      if (that.settings.mouseDrag && !isTouchDevice) {
        that.$element.addClass(defaults.mouseDragClass);

        that.$element.on({
          mousedown: function mousedown(e) {
            isClicked = true;
            mouseXposition = e.pageX;
            innerXposition = that.$inner.scrollLeft();

            if (e.target.tagName.toLowerCase() !== 'button') {
              that.settings.onDragStart();
            }
          }
        });

        defaults.$document.on({
          mousemove: function mousemove(e) {
            isClicked && updatePosition(e);
          },
          mouseup: function mouseup(e) {
            if (isClicked) {
              if (e.target.tagName.toLowerCase() !== 'button') {
                that._checkPosition();
                that.settings.onDragEnd();
              }
            }
            isClicked = false;
          }
        });
      }
    };

    /**
     *  Check the scrolling position
     *
     * @private
     */
    Plugin.prototype._checkPosition = function () {
      const that = this;
      const innerOffset = that.$inner.scrollLeft();

      that.settings.arrows && that._checkArrowState(innerOffset);
      that.settings.dots && that._checkActiveDots(innerOffset);
    };

    /**
     * Check the active dots and set the active class
     *
     * @param innerOffset
     * @private
     */
    Plugin.prototype._checkActiveDots = function (innerOffset) {
      const that = this;
      let itemStart = 0;
      let itemEnd = 0;
      const range = [innerOffset, innerOffset + that.viewportSize];

      for (let i = 0; i < that.$items.length; ++i) {
        const $item = $(that.$items[i]);
        const itemWidth = $item.outerWidth(true);

        itemEnd += itemWidth;

        if (itemStart + itemWidth / 2 >= range[0] && itemEnd - itemWidth / 2 <= range[1]) {
          that.$dots.find(`[data-horizon-target="${i}"]`).addClass('active');
        } else {
          that.$dots.find(`[data-horizon-target="${i}"]`).removeClass('active');
        }

        itemStart += itemWidth;
      }
    };

    /**
     * Check for the arrow start and end position
     *
     * @param innerOffset
     * @private
     */
    Plugin.prototype._checkArrowState = function (innerOffset) {
      const that = this;

      if (innerOffset + that.viewportSize >= that.innerContainerWidth - 1) {
        that.$element.addClass(defaults.lastItemClass);
        that.$arrowNext.attr('disabled', 'disabled');
        that.$element.removeClass(defaults.firstItemClass);
        that.$arrowPrev.removeAttr('disabled');
      } else if (innerOffset <= 0) {
        that.$element.addClass(defaults.firstItemClass);
        that.$arrowPrev.attr('disabled', 'disabled');
        that.$element.removeClass(defaults.lastItemClass);
        that.$arrowNext.removeAttr('disabled');
      } else {
        that.$element.removeClass(defaults.lastItemClass).removeClass(defaults.firstItemClass);
        that.$arrowPrev.removeAttr('disabled');
        that.$arrowNext.removeAttr('disabled');
      }
    };

    /**
     *  Returns the class
     */
    return Plugin;
  }());

  $.fn[pluginName] = function (options) {
    this.each(function () {
      if (!$.data(this, pluginName)) {
        $.data(this, pluginName, new HorizonSwiper(this, options));
      }
    });

    return this;
  };
}));
