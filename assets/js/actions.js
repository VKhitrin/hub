window.onload = function () {
  const $ = {
    bodyClassAdd: c => $.el('body').classList.add(c),
    bodyClassHas: c => $.el('body').classList.contains(c),
    bodyClassRemove: c => $.el('body').classList.remove(c),
    el: s => document.querySelector(s),
    els: s => [].slice.call(document.querySelectorAll(s) || []),
    escapeRegex: s => s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'),
    ieq: (a, b) => a.toLowerCase() === b.toLowerCase(),
    iin: (a, b) => a.toLowerCase().indexOf(b.toLowerCase()) !== -1,
    isDown: e => ['c-n', 'down', 'tab'].includes($.key(e)),
    isRemove: e => ['backspace', 'delete'].includes($.key(e)),
    isUp: e => ['c-p', 'up', 's-tab'].includes($.key(e)),
    jsonp: url => {
      let script = document.createElement('script');
      script.src = url;
      $.el('head').appendChild(script);
    },

    key: e => {
      const ctrl = e.ctrlKey;
      const shift = e.shiftKey;
      switch (e.which) {
        case 8: return 'backspace';
        case 9: return shift ? 's-tab' : 'tab';
        case 13: return 'enter';
        case 16: return 'shift';
        case 17: return 'ctrl';
        case 18: return 'alt';
        case 27: return 'escape';
        case 38: return 'up';
        case 40: return 'down';
        case 46: return 'delete';
        case 78: return ctrl ? 'c-n' : 'n';
        case 80: return ctrl ? 'c-p' : 'n';
        case 91: return 'super'; // Left Windows Key - Windows
        case 92: return 'super'; // Right Windows Key - Windows
        case 112: return 'help';
        case 125: return 'super'; // Left Super Key - Linux
        case 126: return 'super'; // Right Super Key - Linux
        case 224: return 'super'; // Command Key - MacOS
      }
    },
  };

  class Clock {
    constructor(options) {
      this._el = $.el('#clock');
      this._delimiter = options.delimiter;
      this._form = options.form;
      this._setTime = this._setTime.bind(this);
      this._registerEvents();
      this._start();
    }

    _pad(num) {
      return ('0' + num.toString()).slice(-2);
    }

    _registerEvents() {
      this._el.addEventListener('click', this._form.show);
    }

    _setTime() {
      const date = new Date();
      const hours = this._pad(date.getHours());
      const minutes = this._pad(date.getMinutes());
      this._el.innerHTML = hours + this._delimiter + minutes;
    }

    _start() {
      this._setTime();
      setInterval(this._setTime, 1000);
    }
  }

  class CurrentDate {
    constructor(options) {
      this._el = $.el('#date');
      this._setTime = this._setDay.bind(this);
      this._start();
    }

    _pad(num) {
      return ('0' + num.toString()).slice(-2);
    }

    _setDay() {
      const dateFormat = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      const date = new Date();
      this._el.innerHTML = date.toLocaleDateString("en-US", dateFormat);
    }

    _start() {
      this._setDay();
      setInterval(this._setTime, 1000);
    }
  }

  class CommandsHelp {
    constructor(options) {
      this._el = $.el('#commands-help');
      this._messageEl = $.el('#commands-help-message');
      this._commands = options.commands;
      this._newTab = options.newTab;
      this._toggled = false;
      this._buildAndAppendLists();
      this._bindMethods();
      this._registerEvents();
    }

    toggle(show) {
      this._toggled = (typeof show !== 'undefined') ? show : !this._toggled;
      this._toggled ? $.bodyClassAdd('commands-help') : $.bodyClassRemove('commands-help');
      this._toggled ? this._messageEl.classList.add('highlight') : this._messageEl.classList.remove('highlight')
    }

    _bindMethods() {
      this._handleKeydown = this._handleKeydown.bind(this);
    }

    _buildAndAppendLists() {
      const lists = document.createElement('ul');
      lists.classList.add('categories');
      this._getCategories().forEach(category => {
        lists.insertAdjacentHTML(
          'beforeend',
          `<li class="category">
            <h2 class="category-name">${category}</h2>
            <ul>${this._buildListCommands(category)}</ul>
          </li>`
        );
      });
      this._el.appendChild(lists);
    }

    _buildListCommands(category) {
      return this._commands.map(([cmdCategory, name, key, url]) => {
        if (cmdCategory === category) {
          return (
            `<li class="command">
              <a href="${url}" target="${this._newTab ? '_blank' : '_self'}">
                <span class="command-key">${key}</span>
                <span class="command-name">${name}</span>
              </a>
            </li>`
          );
        }
      }).join('');
    }

    _getCategories() {
      const categories = this._commands
        .map(([category]) => category)
        .filter(category => category);
      return [...new Set(categories)];
    }

    _handleKeydown(e) {
      if ($.key(e) === 'escape') this.toggle(false);
    }

    _registerEvents() {
      document.addEventListener('keydown', this._handleKeydown);
    }
  }
  class Help {
    constructor(options) {
      this._el = $.el('#help');
      this._messageEl = $.el('#help-message');
      this._searchDelimiter = options.searchDelimiter;
      this._pathDelimiter = options.pathDelimiter;
      this._toggled = false;
      this._buildHelp(this._searchDelimiter, this._pathDelimiter);
      this._bindMethods();
      this._registerEvents();
    }

    toggle(show) {
      this._toggled = (typeof show !== 'undefined') ? show : !this._toggled;
      this._toggled ? $.bodyClassAdd('help') : $.bodyClassRemove('help');
      this._toggled ? this._messageEl.classList.add('highlight') : this._messageEl.classList.remove('highlight')
    }

    _bindMethods() {
      this._handleKeydown = this._handleKeydown.bind(this);
    }

    _buildHelp(searchDelimiter, pathDelimiter) {
      const content = document.createElement('div');
      content.classList.add('help-content-box');
      content.insertAdjacentHTML(
        'beforeend',
        `
        <h2 class="help-title">
          <a href="https://github.com/VKhitrin/hub">hub</a>
        </h2>
        <p class="help-content">
          A minimalistic start page suited for your workflow.
        <p>
        <h2 class="help-title">
          <a href="https://github.com/VKhitrin/hub#usage">usage</a>
        </h2>
        <p class="help-content">
          Type something when not in the hub or commands help menus to start searching.
          <br><br>
          Typing a URL will redirect you to that URL.
          <br><br>
          Use commands to interact with your configured webpages:
          <ul>
          <li>
            'command_hotkey' - will browse to the website bound to the command
          </li>
          <li>
            'command_hotkey' followed up by '${searchDelimiter}' - will perform a search
          </li>
          <li>
            'command_hotkey' followed up by '${pathDelimiter}' - will navigate the page
          </li>
          </ul>
        </p>
        <span class="hub-version">
          <a href="https://github.com/VKhitrin/hub/releases/tag/0.0.3">version 0.0.3</a>
        </span>
        `
        );
      this._el.appendChild(content);
    }

    _handleKeydown(e) {
      if ($.key(e) === 'escape') this.toggle(false);
      if ($.key(e) === 'help') {
        this.toggle();
      } else {
        this.toggle(false);
      }
      
    }

    _registerEvents() {
      document.addEventListener('keydown', this._handleKeydown);
    }
  }

    class Hub {
    constructor(options) {
      this._el = $.el('#hub');
      this._messageEl = $.el('#hub-message');
      this._toggled = false;
      this._buildHub();
      this._bindMethods();
      this._registerEvents();
    }

    toggle(show) {
      this._toggled = (typeof show !== 'undefined') ? show : !this._toggled;
      this._toggled ? $.bodyClassAdd('hub') : $.bodyClassRemove('hub');
      this._toggled ? this._messageEl.classList.add('highlight') : this._messageEl.classList.remove('highlight')
    }

    _bindMethods() {
      this._handleKeydown = this._handleKeydown.bind(this);
    }

    _buildHub() {
      const title = document.createElement('div');
      title.classList.add('vk');
      title.insertAdjacentHTML(
        'beforeend',
        `<h2 class="category-name">Hub - Coming Soon</h2>`
        );
      this._el.appendChild(title);
    }

    _handleKeydown(e) {
      if ($.key(e) === 'escape') this.toggle(false);
    }

    _registerEvents() {
      document.addEventListener('keydown', this._handleKeydown);
    }
  }

  class Influencer {
    constructor(options) {
      this._limit = options.limit;
      this._queryParser = options.queryParser;
    }

    addItem() {}
    getSuggestions() {}
    _addSearchPrefix(items, query) {
      const searchPrefix = this._getSearchPrefix(query)
      return items.map(s => searchPrefix ? searchPrefix + s : s);
    }

    _getSearchPrefix(query) {
      const { isSearch, key, split } = this._parseQuery(query);
      return isSearch ? `${key}${split} ` : false;
    }

    _parseQuery(query) {
      return this._queryParser.parse(query);
    }
  }

  class DefaultInfluencer extends Influencer {
    constructor({ defaultSuggestions }) {
      super(...arguments);
      this._defaultSuggestions = defaultSuggestions;
    }

    getSuggestions(query) {
      return new Promise(resolve => {
        const suggestions = this._defaultSuggestions[query];
        resolve(suggestions ? suggestions.slice(0, this._limit) : []);
      });
    }
  }

  class DuckDuckGoInfluencer extends Influencer {
    constructor({ queryParser }) {
      super(...arguments);
    }

    getSuggestions(rawQuery) {
      const { query } = this._parseQuery(rawQuery);
      if (!query) return Promise.resolve([]);
      return new Promise(resolve => {
        const endpoint = 'https://duckduckgo.com/ac/';
        const callback = 'autocompleteCallback';
        window[callback] = res => {
          const suggestions = res.map(i => i.phrase)
            .filter(s => !$.ieq(s, query))
            .slice(0, this._limit)
          resolve(this._addSearchPrefix(suggestions, rawQuery));
        };
        $.jsonp(`${endpoint}?callback=${callback}&q=${query}`);
      });
    }
  }

  class HistoryInfluencer extends Influencer {
    constructor() {
      super(...arguments);
      this._storeName = 'history';
      this._allowlocalStore = CONFIG.saveTolocalStorage;
    }

    addItem(query) {
      if (query.length < 2) return;
      let exists;
      const history = this._getHistory().map(([item, count]) => {
        const match = $.ieq(item, query);
        if (match) exists = true;
        return [item, match ? count + 1 : count];
      });
      if (!exists) history.push([query, 1]);
      this._setHistory(this._sort(history));
    }

    getSuggestions(query) {
      return new Promise(resolve => {
        const suggestions = this._getHistory()
          .map(([item]) => item)
          .filter(item => this._itemContainsQuery(query, item))
          .slice(0, this._limit);
        resolve(suggestions);
      });
    }

    _fetch() {
      return JSON.parse(localStorage.getItem(this._storeName)) || [];
    }

    _getHistory() {
      this._history = this._history || this._fetch();
      return this._history;
    }

    _itemContainsQuery(query, item) {
      return query && !$.ieq(item, query) && $.iin(item, query);
    }

    _save(history) {
      localStorage.setItem(this._storeName, JSON.stringify(history));
    }

    _setHistory(history) {
      this._history = history;
      if(this._allowLocalStore) this._save(history);
    }

    _sort(history) {
      return history.sort((current, next) => current[1] - next[1]).reverse();
    }
  }

  class Suggester {
    constructor(options) {
      this._el = $.el('#search-suggestions');
      this._influencers = options.influencers;
      this._limit = options.limit;
      this._suggestionEls = [];
      this._bindMethods();
      this._registerEvents();
    }

    setOnClick(callback) {
      this._onClick = callback;
    }

    setOnHighlight(callback) {
      this._onHighlight = callback;
    }

    setOnUnhighlight(callback) {
      this._onUnhighlight = callback;
    }

    success(query) {
      this._clearSuggestions();
      this._influencers.forEach(i => i.addItem(query));
    }

    suggest(input) {
      input = input.trim();
      if (input === '') this._clearSuggestions();
      Promise.all(this._getInfluencerPromises(input)).then(res => {
        const suggestions = this._flattenAndUnique(res);
        this._clearSuggestions();
        if (suggestions.length) {
          this._appendSuggestions(suggestions, input);
          this._registerSuggestionEvents();
          $.bodyClassAdd('suggestions');
        }
      });
    }

    _appendSuggestions(suggestions, input) {
      suggestions.some((suggestion, i) => {
        const match = new RegExp($.escapeRegex(input), 'ig');
        const suggestionHtml = suggestion.replace(match, `<b>${input}</b>`);
        this._el.insertAdjacentHTML(
          'beforeend',
          `<li>
            <button
              type="button"
              class="js-search-suggestion search-suggestion"
              data-suggestion="${suggestion}"
              tabindex="-1"
            >
              ${suggestionHtml}
            </button>
          </li>`
        );
        return i + 1 >= this._limit;
      });
      this._suggestionEls = $.els('.js-search-suggestion');
    }

    _bindMethods() {
      this._handleKeydown = this._handleKeydown.bind(this);
    }

    _clearClickEvents() {
      this._suggestionEls.forEach(el => {
        const callback = this._onClick.bind(null, el.value);
        el.removeEventListener('click', callback);
      });
    }

    _clearSuggestions() {
      $.bodyClassRemove('suggestions');
      this._clearClickEvents();
      this._suggestionEls = [];
      this._el.innerHTML = '';
    }

    // [[1, 2], [1, 2, 3, 4]] -> [1, 2, 3, 4]
    _flattenAndUnique(array) {
      return [...new Set([].concat.apply([], array))];
    }

    _focusNext(e) {
      const exists = this._suggestionEls.some((el, i) => {
        if (el.classList.contains('highlight')) {
          this._highlight(this._suggestionEls[i + 1], e);
          return true;
        }
      });
      if (!exists) this._highlight(this._suggestionEls[0], e);
    }

    _focusPrevious(e) {
      const exists = this._suggestionEls.some((el, i) => {
        if (el.classList.contains('highlight') && i) {
          this._highlight(this._suggestionEls[i - 1], e);
          return true;
        }
      });
      if (!exists) this._unHighlight(e);
    }

    _getInfluencerPromises(input) {
      return this._influencers
        .map(influencer => influencer.getSuggestions(input));
    }

    _handleKeydown(e) {
      if ($.isDown(e)) this._focusNext(e);
      if ($.isUp(e)) this._focusPrevious(e);
    }

    _highlight(el, e) {
      this._unHighlight();
      if (el) {
        this._onHighlight(el.getAttribute('data-suggestion'));
        el.classList.add('highlight');
        e.preventDefault();
      }
    }

    _registerEvents() {
      document.addEventListener('keydown', this._handleKeydown);
    }

    _registerSuggestionEvents() {
      this._suggestionEls.forEach(el => {
        const value = el.getAttribute('data-suggestion');
        el.addEventListener('mouseover', this._highlight.bind(this, el));
        el.addEventListener('mouseout', this._unHighlight.bind(this));
        el.addEventListener('click', this._onClick.bind(null, value));
      });
    }

    _unHighlight(e) {
      const el = $.el('.highlight');
      if (el) {
        this._onUnhighlight();
        el.classList.remove('highlight');
        if (e) e.preventDefault();
      }
    }
  }

  class QueryParser {
    constructor(options) {
      this._commands = options.commands;
      this._searchDelimiter = options.searchDelimiter;
      this._pathDelimiter = options.pathDelimiter;
      this._protocolRegex = /^[a-zA-Z]+:\/\//i;
      this._urlRegex = /^((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)$/i;
    }

    parse(query) {
      const res = { query: query, split: null };
      if (query.match(this._urlRegex)) {
        const hasProtocol = query.match(this._protocolRegex);
        res.action = "Navigating";
        res.redirect = hasProtocol ? query : 'https://' + query;
      } else {
        const splitSearch = query.split(this._searchDelimiter);
        const splitPath = query.split(this._pathDelimiter);
        this._commands.some(([category, name, key, url, searchPath]) => {
          res.isKey = query === key;
          res.isSearch = !res.isKey && splitSearch[0] === key;
          res.isPath = !res.isKey && splitPath[0] === key;
          if (res.isKey || res.isSearch || res.isPath) {
            res.key = key;
            if (res.isSearch && searchPath) {
              res.split = this._searchDelimiter;
              res.query = this._shiftAndTrim(splitSearch, res.split);
              res.redirect = this._prepSearch(url, searchPath, res.query);
              res.action = "Searching";
            } else if (res.isPath) {
              res.split = this._pathDelimiter;
              res.path = this._shiftAndTrim(splitPath, res.split);
              res.redirect = this._prepPath(url, res.path);
              res.action = "Navigating";
            } else {
              res.redirect = url;
              res.action = "Browsing";
            }
            return true;
          }
          if (key === '*') {
            res.redirect = this._prepSearch(url, searchPath, query);
            res.action = "Searching";
          }
        });
      }
      res.color = this._getColorFromUrl(res.redirect);
      res.context = this._getContextFromUrl(res.redirect, res.action);
      return res;
    }

    _getColorFromUrl(url) {
      const domain = this._getHostname(url);
      const color = this._commands
        .filter(c => this._getHostname(c[3]) === domain)
        .map(c => c[5])[0];
      return color || null;
    }

    _getContextFromUrl(url, action) {
      const domain = this._getHostname(url);
      var context = this._commands
        .filter(c => this._getHostname(c[3]) === domain)
        .map(c => c[1])[0];
      if (!context) context = url;
      return action + " " + context || null;
    }

    _getHostname(url) {
      const parser = document.createElement('a');
      parser.href = url;
      return parser.hostname.replace(/^www./, '');
    }

    _prepPath(url, path) {
      return this._stripUrlPath(url) + '/' + path;
    }

    _prepSearch(url, searchPath, query) {
      if (!searchPath) return url;
      const baseUrl = this._stripUrlPath(url);
      const urlQuery = encodeURIComponent(query);
      searchPath = searchPath.replace('{}', urlQuery);
      return baseUrl + searchPath;
    }

    _shiftAndTrim(arr, delimiter) {
      arr.shift();
      return arr.join(delimiter).trim();
    }

    _stripUrlPath(url) {
      const parser = document.createElement('a');
      parser.href = url;
      return `${parser.protocol}//${parser.hostname}`;
    }
  }

  class Form {
    constructor(options) {
      this._formEl = $.el('#search-form');
      this._inputEl = $.el('#search-input');
      this._contextEl = $.el('#search-context');
      this._helpMessagesEl = [
        $.el('#commands-help-message'),
        $.el('#hub-message')
      ],
      this._colors = options.colors;
      this._commands = options.commands;
      this._help = options.help;
      this._commandsHelp = options.commandsHelp;
      this._hub = options.hub;
      this._suggester = options.suggester;
      this._queryParser = options.queryParser;
      this._instantRedirect = options.instantRedirect;
      this._newTab = options.newTab;
      this._inputElVal = '';
      this._bindMethods();
      this._registerEvents();
      this._loadQueryParam();
    }

    hide() {
      $.bodyClassRemove('form')
      this._inputEl.value = '';
      this._inputElVal = '';
      this._helpMessagesEl.forEach( message => {
        message.style.visibility = "visible";
      });
    }

    show() {
      $.bodyClassAdd('form');
      this._inputEl.focus();
      this._helpMessagesEl.forEach( message => {
        message.style.visibility = "hidden";
      });
    }

    _bindMethods() {
      this.hide = this.hide.bind(this);
      this.show = this.show.bind(this);
      this._clearPreview = this._clearPreview.bind(this);
      this._handleKeydown = this._handleKeydown.bind(this);
      this._handleInput = this._handleInput.bind(this);
      this._previewValue = this._previewValue.bind(this);
      this._submitForm = this._submitForm.bind(this);
      this._submitWithValue = this._submitWithValue.bind(this);
    }

    _clearPreview() {
      this._previewValue(this._inputElVal);
      this._inputEl.focus();
    }

    _handleKeydown(e) {
      if ($.isUp(e) || $.isDown(e) || $.isRemove(e)) return;
      switch ($.key(e)) {
        case 'alt':
        case 'ctrl':
        case 'enter':
        case 'shift':
        case 'help': return;
        case 'super': return;
        case 'escape': this.hide(); return;
      }
      this.show();
    }

    _handleInput() {
      const newQuery = this._inputEl.value;
      const isCommandsHelp = newQuery === '?';
      const isHub = newQuery === '~';
      const { isKey } = this._queryParser.parse(newQuery);
      this._inputElVal = newQuery;
      this._setBackgroundFromQuery(newQuery);
      this._setContextFromQuery(newQuery);
      this._set
      if (!newQuery || isCommandsHelp ) this.hide();
      if (isCommandsHelp){
        this._help.toggle(false);
        this._hub.toggle(false);
        this._commandsHelp.toggle();
      };
      if (!newQuery || isHub ) this.hide();
      if (isHub){
        this._help.toggle(false);
        this._commandsHelp.toggle(false);
        this._hub.toggle();
      };
      if (this._instantRedirect && isKey) this._submitWithValue(newQuery);
      if (this._suggester) this._suggester.suggest(newQuery);
    }

    _loadQueryParam() {
      const q = new URLSearchParams(window.location.search).get('q');
      if (q) this._submitWithValue(q);
    }

    _previewValue(value) {
      this._inputEl.value = value;
      this._setBackgroundFromQuery(value);
    }

    _redirect(redirect) {
      if (this._newTab) window.open(redirect, '_blank');
      else window.location.href = redirect;
    }

    _registerEvents() {
      document.addEventListener('keydown', this._handleKeydown);
      this._inputEl.addEventListener('input', this._handleInput);
      this._formEl.addEventListener('submit', this._submitForm, false);
      if (this._suggester) {
        this._suggester.setOnClick(this._submitWithValue);
        this._suggester.setOnHighlight(this._previewValue);
        this._suggester.setOnUnhighlight(this._clearPreview);
      }
    }

    _setBackgroundFromQuery(query) {
      if (!this._colors) return;
      const { color } = this._queryParser.parse(query);
      this._formEl.style.backgroundColor = color;
    }

    _setContextFromQuery(query) {
      if (!this._commands) return;
      const { context } = this._queryParser.parse(query);
      this._contextEl.innerHTML = context;
    }

    _submitForm(e) {
      if (e) e.preventDefault();
      const query = this._inputEl.value;
      if (this._suggester) this._suggester.success(query);
      this.hide();
      this._redirect(this._queryParser.parse(query).redirect);
    }

    _submitWithValue(value) {
      this._inputEl.value = value;
      this._submitForm();
    }
  }

  const getCommandsHelp = () => {
    return new CommandsHelp({
      commands: CONFIG.commands,
      newTab: CONFIG.newTab,
    });
  };

  const getHelp = () => {
    return new Help({
      pathDelimiter: CONFIG.pathDelimiter,
      searchDelimiter: CONFIG.searchDelimiter,
    });
  };

  const getHub = () => {
    return new Hub();
  };

  const getInfluencers = () => {
    const availableInfluencers = {
      Default: DefaultInfluencer,
      DuckDuckGo: DuckDuckGoInfluencer,
      History: HistoryInfluencer,
    };
    return CONFIG.influencers.map(i => {
      return new availableInfluencers[i.name]({
        limit: i.limit,
        queryParser: getQueryParser(),
        defaultSuggestions: CONFIG.defaultSuggestions,
      });
    });
  };

  const getSuggester = () => {
    return new Suggester({
      influencers: getInfluencers(),
      limit: CONFIG.suggestionsLimit,
    });
  };

  const getQueryParser = () => {
    return new QueryParser({
      commands: CONFIG.commands,
      pathDelimiter: CONFIG.pathDelimiter,
      searchDelimiter: CONFIG.searchDelimiter,
    });
  };
  
  const getForm = () => {
    return new Form({
      colors: CONFIG.colors,
      commands: CONFIG.commands,
      help: getHelp(),
      commandsHelp: getCommandsHelp(),
      hub: getHub(),
      instantRedirect: CONFIG.instantRedirect,
      newTab: CONFIG.newTab,
      queryParser: getQueryParser(),
      suggester: CONFIG.suggestions ? getSuggester() : false,
    });
  };

  new Clock({
    delimiter: CONFIG.clockDelimiter,
    form: getForm(),
  });

  new CurrentDate();
}
