!(function (a) {
  let b = '0.9.3',
    c = {
      isMsie() {
        const a = /(msie) ([\w.]+)/i.exec(navigator.userAgent);
        return a ? parseInt(a[2], 10) : !1
      },
      isBlankString(a) {
        return !a || /^\s*$/.test(a)
      },
      escapeRegExChars(a) {
        return a.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&')
      },
      isString(a) {
        return typeof a === 'string'
      },
      isNumber(a) {
        return typeof a === 'number'
      },
      isArray: a.isArray,
      isFunction: a.isFunction,
      isObject: a.isPlainObject,
      isUndefined(a) {
        return typeof a === 'undefined'
      },
      bind: a.proxy,
      bindAll(b) {
        let c;
        for (const d in b) a.isFunction(c = b[d]) && (b[d] = a.proxy(c, b))
      },
      indexOf(a, b) {
        for (let c = 0; c < a.length; c++) { if (a[c] === b) return c; }
        return -1
      },
      each: a.each,
      map: a.map,
      filter: a.grep,
      every(b, c) {
        let d = !0;
        return b ? (a.each(b, (a, e) => (d = c.call(null, e, a, b)) ? void 0 : !1), !!d) : d
      },
      some(b, c) {
        let d = !1;
        return b ? (a.each(b, (a, e) => (d = c.call(null, e, a, b)) ? !1 : void 0), !!d) : d
      },
      mixin: a.extend,
      getUniqueId: (function () {
        let a = 0;
        return function () {
          return a++
        }
      }()),
      defer(a) {
        setTimeout(a, 0)
      },
      debounce(a, b, c) {
        let d,
          e;
        return function () {
          let f,
            g,
            h = this,
            i = arguments;
          return f = function () {
            d = null, c || (e = a.apply(h, i))
          }, g = c && !d, clearTimeout(d), d = setTimeout(f, b), g && (e = a.apply(h, i)), e
        }
      },
      throttle(a, b) {
        let c,
          d,
          e,
          f,
          g,
          h;
        return g = 0, h = function () {
          g = new Date(), e = null, f = a.apply(c, d)
        }
        , function () {
          let i = new Date(),
            j = b - (i - g);
          return c = this, d = arguments, j <= 0 ? (clearTimeout(e), e = null, g = i, f = a.apply(c, d)) : e || (e = setTimeout(h, j)), f
        }
      },
      tokenizeQuery(b) {
        return a.trim(b).toLowerCase().split(/[\s]+/)
      },
      tokenizeText(b) {
        return a.trim(b).toLowerCase().split(/[\s\-_]+/)
      },
      getProtocol() {
        return location.protocol
      },
      noop() {}
    },
    d = (function () {
      const a = /\s+/;
      return {
        on(b, c) {
          let d;
          if (!c) return this;
          for (this._callbacks = this._callbacks || {}, b = b.split(a); d = b.shift();) this._callbacks[d] = this._callbacks[d] || [], this._callbacks[d].push(c);
          return this
        },
        trigger(b, c) {
          let d,
            e;
          if (!this._callbacks) return this;
          for (b = b.split(a); d = b.shift();) {
            if (e = this._callbacks[d]) {
              for (let f = 0; f < e.length; f += 1) {
                e[f].call(this, {
                  type: d,
                  data: c
                });
              }
            }
          }
          return this
        }
      }
    }()),
    e = (function () {
      function b(b) {
        b && b.el || a.error('EventBus initialized without el'), this.$el = a(b.el)
      }
      const d = 'typeahead:';
      return c.mixin(b.prototype, {
        trigger(a) {
          const b = [].slice.call(arguments, 1);
          this.$el.trigger(d + a, b)
        }
      }), b
    }()),
    f = (function () {
      function a(a) {
        this.prefix = ['__', a, '__'].join(''), this.ttlKey = '__ttl__', this.keyMatcher = new RegExp(`^${this.prefix}`)
      }

      function b() {
        return (new Date()).getTime()
      }

      function d(a) {
        return JSON.stringify(c.isUndefined(a) ? null : a)
      }

      function e(a) {
        return JSON.parse(a)
      }
      let f,
        g;
      try {
        f = window.localStorage, f.setItem('~~~', '!'), f.removeItem('~~~')
      } catch (h) {
        f = null
      }
      return g = f && window.JSON ? {
        _prefix(a) {
          return this.prefix + a
        },
        _ttlKey(a) {
          return this._prefix(a) + this.ttlKey
        },
        get(a) {
          return this.isExpired(a) && this.remove(a), e(f.getItem(this._prefix(a)))
        },
        set(a, e, g) {
          return c.isNumber(g) ? f.setItem(this._ttlKey(a), d(b() + g)) : f.removeItem(this._ttlKey(a)), f.setItem(this._prefix(a), d(e))
        },
        remove(a) {
          return f.removeItem(this._ttlKey(a)), f.removeItem(this._prefix(a)), this
        },
        clear() {
          let a,
            b,
            c = [],
            d = f.length;
          for (a = 0; d > a; a++)(b = f.key(a)).match(this.keyMatcher) && c.push(b.replace(this.keyMatcher, ''));
          for (a = c.length; a--;) this.remove(c[a]);
          return this
        },
        isExpired(a) {
          const d = e(f.getItem(this._ttlKey(a)));
          return c.isNumber(d) && b() > d ? !0 : !1
        }
      } : {
        get: c.noop,
        set: c.noop,
        remove: c.noop,
        clear: c.noop,
        isExpired: c.noop
      }, c.mixin(a.prototype, g), a
    }()),
    g = (function () {
      function a(a) {
        c.bindAll(this), a = a || {}, this.sizeLimit = a.sizeLimit || 10, this.cache = {}, this.cachedKeysByAge = []
      }
      return c.mixin(a.prototype, {
        get(a) {
          return this.cache[a]
        },
        set(a, b) {
          let c;
          this.cachedKeysByAge.length === this.sizeLimit && (c = this.cachedKeysByAge.shift(), delete this.cache[c]), this.cache[a] = b, this.cachedKeysByAge.push(a)
        }
      }), a
    }()),
    h = (function () {
      function b(a) {
        c.bindAll(this), a = c.isString(a) ? {
          url: a
        } : a, i = i || new g(), h = c.isNumber(a.maxParallelRequests) ? a.maxParallelRequests : h || 6, this.url = a.url, this.wildcard = a.wildcard || '%QUERY', this.filter = a.filter, this.replace = a.replace, this.ajaxSettings = {
          type: 'get',
          cache: a.cache,
          timeout: a.timeout,
          dataType: a.dataType || 'json',
          beforeSend: a.beforeSend
        }, this._get = (/^throttle$/i.test(a.rateLimitFn) ? c.throttle : c.debounce)(this._get, a.rateLimitWait || 300)
      }

      function d() {
        j++
      }

      function e() {
        j--
      }

      function f() {
        return h > j
      }
      var h,
        i,
        j = 0,
        k = {};
      return c.mixin(b.prototype, {
        _get(a, b) {
          function c(c) {
            const e = d.filter ? d.filter(c) : c;
            b && b(e), i.set(a, c)
          }
          var d = this;
          f() ? this._sendRequest(a).done(c) : this.onDeckRequestArgs = [].slice.call(arguments, 0)
        },
        _sendRequest(b) {
          function c() {
            e(), k[b] = null, f.onDeckRequestArgs && (f._get(...f.onDeckRequestArgs), f.onDeckRequestArgs = null)
          }
          var f = this,
            g = k[b];
          return g || (d(), g = k[b] = a.ajax(b, this.ajaxSettings).always(c)), g
        },
        get(a, b) {
          let d,
            e,
            f = this,
            g = encodeURIComponent(a || '');
          return b = b || c.noop, d = this.replace ? this.replace(this.url, g) : this.url.replace(this.wildcard, g), (e = i.get(d)) ? c.defer(() => {
            b(f.filter ? f.filter(e) : e)
          }) : this._get(d, b), !!e
        }
      }), b
    }()),
    i = (function () {
      function d(b) {
        c.bindAll(this), c.isString(b.template) && !b.engine && a.error('no template engine specified'), b.local || b.prefetch || b.remote || a.error('one of local, prefetch, or remote is required'), this.name = b.name || c.getUniqueId(), this.limit = b.limit || 5, this.minLength = b.minLength || 1, this.header = b.header, this.footer = b.footer, this.valueKey = b.valueKey || 'value', this.template = e(b.template, b.engine, this.valueKey), this.local = b.local, this.prefetch = b.prefetch, this.remote = b.remote, this.itemHash = {}, this.adjacencyList = {}, this.storage = b.name ? new f(b.name) : null
      }

      function e(a, b, d) {
        let e,
          f;
        return c.isFunction(a) ? e = a : c.isString(a) ? (f = b.compile(a), e = c.bind(f.render, f)) : e = function (a) {
          return `<p><img src='/images/india.png'/>${a[d]}<span>cluster</span></p>`
        }, e
      }
      const g = {
        thumbprint: 'thumbprint',
        protocol: 'protocol',
        itemHash: 'itemHash',
        adjacencyList: 'adjacencyList'
      };
      return c.mixin(d.prototype, {
        _processLocalData(a) {
          this._mergeProcessedData(this._processData(a))
        },
        _loadPrefetchData(d) {
          function e(a) {
            let b = d.filter ? d.filter(a) : a,
              e = m._processData(b),
              f = e.itemHash,
              h = e.adjacencyList;
            m.storage && (m.storage.set(g.itemHash, f, d.ttl), m.storage.set(g.adjacencyList, h, d.ttl), m.storage.set(g.thumbprint, n, d.ttl), m.storage.set(g.protocol, c.getProtocol(), d.ttl)), m._mergeProcessedData(e)
          }
          var f,
            h,
            i,
            j,
            k,
            l,
            m = this,
            n = b + (d.thumbprint || '');
          return this.storage && (f = this.storage.get(g.thumbprint), h = this.storage.get(g.protocol), i = this.storage.get(g.itemHash), j = this.storage.get(g.adjacencyList)), k = f !== n || h !== c.getProtocol(), d = c.isString(d) ? {
            url: d
          } : d, d.ttl = c.isNumber(d.ttl) ? d.ttl : 864e5, i && j && !k ? (this._mergeProcessedData({
            itemHash: i,
            adjacencyList: j
          }), l = a.Deferred().resolve()) : l = a.getJSON(d.url).done(e), l
        },
        _transformDatum(a) {
          let b = c.isString(a) ? a : a[this.valueKey],
            d = a.tokens || c.tokenizeText(b),
            e = {
              value: b,
              tokens: d
            };
          return c.isString(a) ? (e.datum = {}, e.datum[this.valueKey] = a) : e.datum = a, e.tokens = c.filter(e.tokens, a => !c.isBlankString(a)), e.tokens = c.map(e.tokens, a => a.toLowerCase()), e
        },
        _processData(a) {
          let b = this,
            d = {},
            e = {};
          return c.each(a, (a, f) => {
            let g = b._transformDatum(f),
              h = c.getUniqueId(g.value);
            d[h] = g, c.each(g.tokens, (a, b) => {
              let d = b.charAt(0),
                f = e[d] || (e[d] = [h]);
              !~c.indexOf(f, h) && f.push(h)
            })
          }), {
            itemHash: d,
            adjacencyList: e
          }
        },
        _mergeProcessedData(a) {
          const b = this;
          c.mixin(this.itemHash, a.itemHash), c.each(a.adjacencyList, (a, c) => {
            const d = b.adjacencyList[a];
            b.adjacencyList[a] = d ? d.concat(c) : c
          })
        },
        _getLocalSuggestions(a) {
          let b,
            d = this,
            e = [],
            f = [],
            g = [];
          return c.each(a, (a, b) => {
            const d = b.charAt(0);
            !~c.indexOf(e, d) && e.push(d)
          }), c.each(e, (a, c) => {
            const e = d.adjacencyList[c];
            return e ? (f.push(e), (!b || e.length < b.length) && (b = e), void 0) : !1
          }), f.length < e.length ? [] : (c.each(b, (b, e) => {
            let h,
              i,
              j = d.itemHash[e];
            h = c.every(f, a => ~c.indexOf(a, e)), i = h && c.every(a, a => c.some(j.tokens, b => b.indexOf(a) === 0)), i && g.push(j)
          }), g)
        },
        initialize() {
          let b;
          return this.local && this._processLocalData(this.local), this.transport = this.remote ? new h(this.remote) : null, b = this.prefetch ? this._loadPrefetchData(this.prefetch) : a.Deferred().resolve(), this.local = this.prefetch = this.remote = null, this.initialize = function () {
            return b
          }, b
        },
        getSuggestions(a, b) {
          function d(a) {
            f = f.slice(0), c.each(a, (a, b) => {
              let d,
                e = g._transformDatum(b);
              return d = c.some(f, a => e.value === a.value), !d && f.push(e), f.length < g.limit
            }), b && b(f)
          }
          var e,
            f,
            g = this,
            h = !1;
          a.length < this.minLength || (e = c.tokenizeQuery(a), f = this._getLocalSuggestions(e).slice(0, this.limit), f.length < this.limit && this.transport && (h = this.transport.get(a, d)), !h && b && b(f))
        }
      }), d
    }()),
    j = (function () {
      function b(b) {
        const d = this;
        c.bindAll(this), this.specialKeyCodeMap = {
          9: 'tab',
          27: 'esc',
          37: 'left',
          39: 'right',
          13: 'enter',
          38: 'up',
          40: 'down'
        }, this.$hint = a(b.hint), this.$input = a(b.input).on('blur.tt', this._handleBlur).on('focus.tt', this._handleFocus).on('keydown.tt', this._handleSpecialKeyEvent), c.isMsie() ? this.$input.on('keydown.tt keypress.tt cut.tt paste.tt', (a) => {
          d.specialKeyCodeMap[a.which || a.keyCode] || c.defer(d._compareQueryToInputValue)
        }) : this.$input.on('input.tt', this._compareQueryToInputValue), this.query = this.$input.val(), this.$overflowHelper = e(this.$input)
      }

      function e(b) {
        return a('<span></span>').css({
          position: 'absolute',
          left: '-9999px',
          visibility: 'hidden',
          whiteSpace: 'nowrap',
          fontFamily: b.css('font-family'),
          fontSize: b.css('font-size'),
          fontStyle: b.css('font-style'),
          fontVariant: b.css('font-variant'),
          fontWeight: b.css('font-weight'),
          wordSpacing: b.css('word-spacing'),
          letterSpacing: b.css('letter-spacing'),
          textIndent: b.css('text-indent'),
          textRendering: b.css('text-rendering'),
          textTransform: b.css('text-transform')
        }).insertAfter(b)
      }

      function f(a, b) {
        return a = (a || '').replace(/^\s*/g, '').replace(/\s{2,}/g, ' '), b = (b || '').replace(/^\s*/g, '').replace(/\s{2,}/g, ' '), a === b
      }
      return c.mixin(b.prototype, d, {
        _handleFocus() {
          this.trigger('focused')
        },
        _handleBlur() {
          this.trigger('blured')
        },
        _handleSpecialKeyEvent(a) {
          const b = this.specialKeyCodeMap[a.which || a.keyCode];
          b && this.trigger(`${b}Keyed`, a)
        },
        _compareQueryToInputValue() {
          let a = this.getInputValue(),
            b = f(this.query, a),
            c = b ? this.query.length !== a.length : !1;
          c ? this.trigger('whitespaceChanged', {
            value: this.query
          }) : b || this.trigger('queryChanged', {
            value: this.query = a
          })
        },
        destroy() {
          this.$hint ? this.$hint.off('.tt') : '';
          this.$input ? this.$input.off('.tt') : '';
          this.$hint = this.$input = this.$overflowHelper = null
        },
        focus() {
          this.$input.focus()
        },
        blur() {
          this.$input.blur()
        },
        getQuery() {
          return this.query
        },
        setQuery(a) {
          this.query = a
        },
        getInputValue() {
          return this.$input.val()
        },
        setInputValue(a, b) {
          this.$input.val(a), !b && this._compareQueryToInputValue()
        },
        getHintValue() {
          return this.$hint.val()
        },
        setHintValue(a) {
          this.$hint.val(a)
        },
        getLanguageDirection() {
          return (this.$input.css('direction') || 'ltr').toLowerCase()
        },
        isOverflow() {
          return this.$overflowHelper.text(this.getInputValue()), this.$overflowHelper.width() > this.$input.width()
        },
        isCursorAtEnd() {
          let a,
            b = this.$input.val().length,
            d = this.$input[0].selectionStart;
          return c.isNumber(d) ? d === b : document.selection ? (a = document.selection.createRange(), a.moveStart('character', -b), b === a.text.length) : !0
        }
      }), b
    }()),
    k = (function () {
      function b(b) {
        c.bindAll(this), this.isOpen = !1, this.isEmpty = !0, this.isMouseOverDropdown = !1, this.$menu = a(b.menu).on('mouseenter.tt', this._handleMouseenter).on('mouseleave.tt', this._handleMouseleave).on('click.tt', '.tt-suggestion', this._handleSelection).on('mouseover.tt', '.tt-suggestion', this._handleMouseover)
      }

      function e(a) {
        return a.data('suggestion')
      }
      let f = {
          suggestionsList: '<span class="tt-suggestions"></span>'
        },
        g = {
          suggestionsList: {
            display: 'block'
          },
          suggestion: {
            whiteSpace: 'nowrap',
            cursor: 'pointer'
          },
          suggestionChild: {
            whiteSpace: 'normal'
          }
        };
      return c.mixin(b.prototype, d, {
        _handleMouseenter() {
          this.isMouseOverDropdown = !0
        },
        _handleMouseleave() {
          this.isMouseOverDropdown = !1
        },
        _handleMouseover(b) {
          const c = a(b.currentTarget);
          this._getSuggestions().removeClass('tt-is-under-cursor'), c.addClass('tt-is-under-cursor')
        },
        _handleSelection(b) {
          const c = a(b.currentTarget);
          this.trigger('suggestionSelected', e(c))
        },
        _show() {
          this.$menu.css('display', 'block')
        },
        _hide() {
          this.$menu.hide()
        },
        _moveCursor(a) {
          let b,
            c,
            d,
            f;
          if (this.isVisible()) {
            if (b = this._getSuggestions(), c = b.filter('.tt-is-under-cursor'), c.removeClass('tt-is-under-cursor'), d = b.index(c) + a, d = (d + 1) % (b.length + 1) - 1, d === -1) return this.trigger('cursorRemoved'), void 0; d < -1 && (d = b.length - 1), f = b.eq(d).addClass('tt-is-under-cursor'), this._ensureVisibility(f), this.trigger('cursorMoved', e(f))
          }
        },
        _getSuggestions() {
          return this.$menu.find('.tt-suggestions > .tt-suggestion')
        },
        _ensureVisibility(a) {
          let b = this.$menu.height() + parseInt(this.$menu.css('paddingTop'), 10) + parseInt(this.$menu.css('paddingBottom'), 10),
            c = this.$menu.scrollTop(),
            d = a.position().top,
            e = d + a.outerHeight(!0);
          d < 0 ? this.$menu.scrollTop(c + d) : e > b && this.$menu.scrollTop(c + (e - b))
        },
        destroy() {
          this.$menu ? this.$menu.off('.tt') : '';
          this.$menu = null
        },
        isVisible() {
          return this.isOpen && !this.isEmpty
        },
        closeUnlessMouseIsOverDropdown() {
          this.isMouseOverDropdown || this.close()
        },
        close() {
          this.isOpen && (this.isOpen = !1, this.isMouseOverDropdown = !1, this._hide(), this.$menu.find('.tt-suggestions > .tt-suggestion').removeClass('tt-is-under-cursor'), this.trigger('closed'))
        },
        open() {
          this.isOpen || (this.isOpen = !0, !this.isEmpty && this._show(), this.trigger('opened'))
        },
        setLanguageDirection(a) {
          let b = {
              left: '0',
              right: 'auto'
            },
            c = {
              left: 'auto',
              right: ' 0'
            };
          a === 'ltr' ? this.$menu.css(b) : this.$menu.css(c)
        },
        moveCursorUp() {
          this._moveCursor(-1)
        },
        moveCursorDown() {
          this._moveCursor(1)
        },
        getSuggestionUnderCursor() {
          const a = this._getSuggestions().filter('.tt-is-under-cursor').first();
          return a.length > 0 ? e(a) : null
        },
        getFirstSuggestion() {
          const a = this._getSuggestions().first();
          return a.length > 0 ? e(a) : null
        },
        renderSuggestions(b, d) {
          let e,
            h,
            i,
            j,
            k,
            l = `tt-dataset-${b.name}`,
            m = '<div class="tt-suggestion">%body</div>',
            n = this.$menu.find(`.${l}`);
          n.length === 0 && (h = a(f.suggestionsList).css(g.suggestionsList), n = a('<div></div>').addClass(l).append(b.header).append(h).append(b.footer).appendTo(this.$menu)), d.length > 0 ? (this.isEmpty = !1, this.isOpen && this._show(), i = document.createElement('div'), j = document.createDocumentFragment(), c.each(d, (c, d) => {
            d.dataset = b.name, e = b.template(d.datum), i.innerHTML = m.replace('%body', e), k = a(i.firstChild).css(g.suggestion).data('suggestion', d), k.children().each(function () {
              a(this).css(g.suggestionChild)
            }), j.appendChild(k[0])
          }), n.show().find('.tt-suggestions').html(j)) : this.clearSuggestions(b.name), this.trigger('suggestionsRendered')
        },
        clearSuggestions(a) {
          let b = a ? this.$menu.find(`.tt-dataset-${a}`) : this.$menu.find('[class^="tt-dataset-"]'),
            c = b.find('.tt-suggestions');
          b.hide(), c.empty(), this._getSuggestions().length === 0 && (this.isEmpty = !0, this._hide())
        }
      }), b
    }()),
    l = (function () {
      function b(a) {
        let b,
          d,
          f;
        c.bindAll(this), this.$node = e(a.input), this.datasets = a.datasets, this.dir = null, this.eventBus = a.eventBus, b = this.$node.find('.tt-dropdown-menu'), d = this.$node.find('.tt-query'), f = this.$node.find('.tt-hint'), this.dropdownView = new k({
          menu: b
        }).on('suggestionSelected', this._handleSelection).on('cursorMoved', this._clearHint).on('cursorMoved', this._setInputValueToSuggestionUnderCursor).on('cursorRemoved', this._setInputValueToQuery).on('cursorRemoved', this._updateHint).on('suggestionsRendered', this._updateHint).on('opened', this._updateHint).on('closed', this._clearHint).on('opened closed', this._propagateEvent), this.inputView = new j({
          input: d,
          hint: f
        }).on('focused', this._openDropdown).on('blured', this._closeDropdown).on('blured', this._setInputValueToQuery).on('enterKeyed tabKeyed', this._handleSelection).on('queryChanged', this._clearHint).on('queryChanged', this._clearSuggestions).on('queryChanged', this._getSuggestions).on('whitespaceChanged', this._updateHint).on('queryChanged whitespaceChanged', this._openDropdown).on('queryChanged whitespaceChanged', this._setLanguageDirection).on('escKeyed', this._closeDropdown).on('escKeyed', this._setInputValueToQuery).on('tabKeyed upKeyed downKeyed', this._managePreventDefault).on('upKeyed downKeyed', this._moveDropdownCursor).on('upKeyed downKeyed', this._openDropdown).on('tabKeyed leftKeyed rightKeyed', this._autocomplete)
      }

      function e(b) {
        let c = a(g.wrapper),
          d = a(g.dropdown),
          e = a(b),
          f = a(g.hint);
        c = c.css(h.wrapper), d = d.css(h.dropdown), f.css(h.hint).css({
          backgroundAttachment: e.css('background-attachment'),
          backgroundClip: e.css('background-clip'),
          backgroundColor: e.css('background-color'),
          backgroundImage: e.css('background-image'),
          backgroundOrigin: e.css('background-origin'),
          backgroundPosition: e.css('background-position'),
          backgroundRepeat: e.css('background-repeat'),
          backgroundSize: e.css('background-size')
        }), e.data('ttAttrs', {
          dir: e.attr('dir'),
          autocomplete: e.attr('autocomplete'),
          spellcheck: e.attr('spellcheck'),
          style: e.attr('style')
        }), e.addClass('tt-query').attr({
          autocomplete: 'off',
          spellcheck: !1
        }).css(h.query);
        try {
          !e.attr('dir') && e.attr('dir', 'auto')
        } catch (i) {}
        return e.wrap(c).parent().prepend(f).append(d)
      }

      function f(a) {
        const b = a.find('.tt-query');
        c.each(b.data('ttAttrs'), (a, d) => {
          c.isUndefined(d) ? b.removeAttr(a) : b.attr(a, d)
        }), b.detach().removeData('ttAttrs').removeClass('tt-query').insertAfter(a), a.remove()
      }
      var g = {
          wrapper: '<span class="twitter-typeahead"></span>',
          hint: '<input class="tt-hint" type="text" autocomplete="off" spellcheck="off" disabled>',
          dropdown: '<span class="tt-dropdown-menu"></span>'
        },
        h = {
          wrapper: {
            position: 'relative',
            display: 'inline-block'
          },
          hint: {
            position: 'absolute',
            top: '0',
            left: '0',
            borderColor: 'transparent',
            boxShadow: 'none'
          },
          query: {
            position: 'relative',
            verticalAlign: 'top',
            backgroundColor: 'transparent'
          },
          dropdown: {
            position: 'absolute',
            top: '100%',
            left: '0',
            zIndex: '100',
            display: 'none'
          }
        };
      return c.isMsie() && c.mixin(h.query, {
        backgroundImage: 'url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)'
      }), c.isMsie() && c.isMsie() <= 7 && (c.mixin(h.wrapper, {
        display: 'inline',
        zoom: '1'
      }), c.mixin(h.query, {
          marginTop: '-1px'
        })), c.mixin(b.prototype, d, {
        _managePreventDefault(a) {
          let b,
            c,
            d = a.data,
            e = !1;
          switch (a.type) {
            case 'tabKeyed':
              b = this.inputView.getHintValue(), c = this.inputView.getInputValue(), e = b && b !== c;
              break;
            case 'upKeyed':
            case 'downKeyed':
              e = !d.shiftKey && !d.ctrlKey && !d.metaKey
          }
          e && d.preventDefault()
        },
        _setLanguageDirection() {
          const a = this.inputView.getLanguageDirection();
          a !== this.dir && (this.dir = a, this.$node.css('direction', a), this.dropdownView.setLanguageDirection(a))
        },
        _updateHint() {
          let a,
            b,
            d,
            e,
            f,
            g = this.dropdownView.getFirstSuggestion(),
            h = g ? g.value : null,
            i = this.dropdownView.isVisible(),
            j = this.inputView.isOverflow();
          h && i && !j && (a = this.inputView.getInputValue(), b = a.replace(/\s{2,}/g, ' ').replace(/^\s+/g, ''), d = c.escapeRegExChars(b), e = new RegExp(`^(?:${d})(.*$)`, 'i'), f = e.exec(h), this.inputView.setHintValue(a + (f ? f[1] : '')))
        },
        _clearHint() {
          this.inputView.setHintValue('')
        },
        _clearSuggestions() {
          this.dropdownView.clearSuggestions()
        },
        _setInputValueToQuery() {
          this.inputView.setInputValue(this.inputView.getQuery())
        },
        _setInputValueToSuggestionUnderCursor(a) {
          const b = a.data;
          this.inputView.setInputValue(b.value, !0)
        },
        _openDropdown() {
          this.dropdownView.open()
        },
        _closeDropdown(a) {
          this.dropdownView[a.type === 'blured' ? 'closeUnlessMouseIsOverDropdown' : 'close']()
        },
        _moveDropdownCursor(a) {
          const b = a.data;
          b.shiftKey || b.ctrlKey || b.metaKey || this.dropdownView[a.type === 'upKeyed' ? 'moveCursorUp' : 'moveCursorDown']()
        },
        _handleSelection(a) {
          let b = a.type === 'suggestionSelected',
            d = b ? a.data : this.dropdownView.getSuggestionUnderCursor();
          d && (this.inputView.setInputValue(d.value), b ? this.inputView.focus() : a.data.preventDefault(), b && c.isMsie() ? c.defer(this.dropdownView.close) : this.dropdownView.close(), this.eventBus.trigger('selected', d.datum, d.dataset))
        },
        _getSuggestions() {
          let a = this,
            b = this.inputView.getQuery();
          c.isBlankString(b) || c.each(this.datasets, (c, d) => {
            d.getSuggestions(b, (c) => {
              b === a.inputView.getQuery() && a.dropdownView.renderSuggestions(d, c)
            })
          })
        },
        _autocomplete(a) {
          let b,
            c,
            d,
            e,
            f;
          (a.type !== 'rightKeyed' && a.type !== 'leftKeyed' || (b = this.inputView.isCursorAtEnd(), c = this.inputView.getLanguageDirection() === 'ltr' ? a.type === 'leftKeyed' : a.type === 'rightKeyed', b && !c)) && (d = this.inputView.getQuery(), e = this.inputView.getHintValue(), e !== '' && d !== e && (f = this.dropdownView.getFirstSuggestion(), this.inputView.setInputValue(f.value), this.eventBus.trigger('autocompleted', f.datum, f.dataset)))
        },
        _propagateEvent(a) {
          this.eventBus.trigger(a.type)
        },
        destroy() {
          this.inputView.destroy(), this.dropdownView.destroy(), f(this.$node), this.$node = null
        },
        setQuery(a) {
          this.inputView.setQuery(a), this.inputView.setInputValue(a), this._clearHint(), this._clearSuggestions(), this._getSuggestions()
        }
      }), b
    }());
  !(function () {
    let b,
      d = {},
      f = 'ttView';
    b = {
      initialize(b) {
        function g() {
          let b,
            d = a(this),
            g = new e({
              el: d
            });
          b = c.map(h, a => a.initialize()), d.data(f, new l({
            input: d,
            eventBus: g = new e({
              el: d
            }),
            datasets: h
          })), a.when(...b).always(() => {
            c.defer(() => {
              g.trigger('initialized')
            })
          })
        }
        let h;
        return b = c.isArray(b) ? b : [b], b.length === 0 && a.error('no datasets provided'), h = c.map(b, (a) => {
          const b = d[a.name] ? d[a.name] : new i(a);
          return a.name && (d[a.name] = b), b
        }), this.each(g)
      },
      destroy() {
        function b() {
          let b = a(this),
            c = b.data(f);
          c && (c.destroy(), b.removeData(f))
        }
        return this.each(b)
      },
      setQuery(b) {
        function c() {
          const c = a(this).data(f);
          c && c.setQuery(b)
        }
        return this.each(c)
      }
    }, jQuery.fn.typeahead = function (a) {
      return b[a] ? b[a].apply(this, [].slice.call(arguments, 1)) : b.initialize.apply(this, arguments)
    }
  }())
}(window.jQuery));
