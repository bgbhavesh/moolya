// Anonymous sely-executing function
(function (root, factory) {
  factory(root.jQuery);
}(this, ($) => {
  const CanvasRenderer = function (element, options) {
    let cachedBackground;
    const canvas = document.createElement('canvas');

    element.appendChild(canvas);

    const ctx = canvas.getContext('2d');

    canvas.width = canvas.height = options.size;

    // move 0,0 coordinates to the center
    ctx.translate(options.size / 2, options.size / 2);

    // rotate canvas -90deg
    ctx.rotate((-1 / 2 + options.rotate / 180) * Math.PI);

    const radius = (options.size - options.lineWidth) / 2;

    Date.now = Date.now || function () {
      // convert to milliseconds
      return +(new Date());
    };

    const drawCircle = function (color, lineWidth, percent) {
      percent = Math.min(Math.max(-1, percent || 0), 1);
      const isNegative = percent <= 0;

      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, Math.PI * 2 * percent, isNegative);

      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;

      ctx.stroke();
    };

    /**
     * Return function request animation frame method or timeout fallback
     */
    const reqAnimationFrame = (function () {
      return window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          function (callback) {
            window.setTimeout(callback, 1000 / 60);
          };
    }());

    /**
     * Draw the background of the plugin track
     */
    const drawBackground = function () {
      if (options.trackColor) drawCircle(options.trackColor, options.lineWidth, 1);
    };

    /**
     * Clear the complete canvas
     */
    this.clear = function () {
      ctx.clearRect(options.size / -2, options.size / -2, options.size, options.size);
    };

    /**
     * Draw the complete chart
     * param percent Percent shown by the chart between -100 and 100
     */
    this.draw = function (percent) {
      if (options.trackColor) {
        // getImageData and putImageData are supported
        if (ctx.getImageData && ctx.putImageData) {
          if (!cachedBackground) {
            drawBackground();
            cachedBackground = ctx.getImageData(0, 0, options.size, options.size);
          } else {
            ctx.putImageData(cachedBackground, 0, 0);
          }
        } else {
          this.clear();
          drawBackground();
        }
      } else {
        this.clear();
      }

      ctx.lineCap = options.lineCap;

      // draw bar
      drawCircle(options.barColor, options.lineWidth, percent / 100);
    }.bind(this);

    this.animate = function (from, to) {
      const startTime = Date.now();

      var animation = function () {
        const process = Math.min(Date.now() - startTime, options.animate.duration);
        const currentValue = options.easing(this, process, from, to - from, options.animate.duration);
        this.draw(currentValue);

        // Show the number at the center of the circle
        options.onStep(from, to, currentValue);

        reqAnimationFrame(animation);
      }.bind(this);

      reqAnimationFrame(animation);
    }.bind(this);
  };

  const pieChart = function (element, userOptions) {
    const defaultOptions = {
      barColor: '#192430',
      trackColor: '#f9f9f9',
      lineCap: 'round',
      lineWidth: 3,
      size: 40,
      rotate: 0,
      animate: {
        duration: 5000,
        enabled: true
      },
      easing(x, t, b, c, d) { // copy from jQuery easing animate
        t /= (d / 2);
        if (t < 1) {
          return c / 2 * t * t + b;
        }
        return -c / 2 * ((--t) * (t - 2) - 1) + b;
      },
      onStep(from, to, currentValue) {

      },
      renderer: CanvasRenderer// Maybe SVGRenderer more later
    };

    const options = {};
    let currentValue = 0;

    const init = function () {
      this.element = element;
      this.options = options;

      // merge user options into default options
      for (const i in defaultOptions) {
        if (defaultOptions.hasOwnProperty(i)) {
          options[i] = userOptions && typeof (userOptions[i]) !== 'undefined' ? userOptions[i] : defaultOptions[i];
          if (typeof (options[i]) === 'function') {
            options[i] = options[i].bind(this);
          }
        }
      }

      // check for jQuery easing, use jQuery easing first
      if (typeof (options.easing) === 'string' && typeof (jQuery) !== 'undefined' && jQuery.isFunction(jQuery.easing[options.easing])) {
        options.easing = jQuery.easing[options.easing];
      } else {
        options.easing = defaultOptions.easing;
      }

      // create renderer
      this.renderer = new options.renderer(element, options);

      // initial draw
      this.renderer.draw(currentValue);

      if (element.getAttribute && element.getAttribute('data-percent')) {
        const newValue = parseFloat(element.getAttribute('data-percent'));

        if (options.animate.enabled) {
          this.renderer.animate(currentValue, newValue);
        } else {
          this.renderer.draw(newValue);
        }

        currentValue = newValue;
      }
    }.bind(this)();
  };

  $.fn.pieChart = function (options) {
    // Iterate all the dom to draw the pie-charts
    return this.each(function () {
      if (!$.data(this, 'pieChart')) {
        const userOptions = $.extend({}, options, $(this).data());
        $.data(this, 'pieChart', new pieChart(this, userOptions));
      }
    });
  };
}));
