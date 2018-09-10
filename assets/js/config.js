const CONFIG = {

  // the category, name, key, url, search path and color for your commands
  // if none of the specified keys are matched, the '*' key is used
  commands: [
    [null, 'Google', '*', 'https://encrypted.google.com', '/search?q={}', '#111'],
    ['Work', 'GitHub', 'g', 'https://github.com', '/search?q={}', '#333'],
    ['Work', 'Stackoverflow', 's', 'https://stackoverflow.com', '/search?q={}', '#8d9299'],
    ['Look', 'Codrops', 'C', 'https://tympanus.net/codrops', '?search-type=posts&s={}', '#0099cc'],
    ['Look', 'Hunt', 'H', 'https://www.producthunt.com', '/search?q={}', '#da552f'],
    ['Look', 'Unsplash', 'u', 'https://unsplash.com/', '/search/{}', '#000'],
    ['Lurk', 'Reddit', 'r', 'https://www.reddit.com', '/search?q={}', '#5f99cf'],
    ['Lurk', 'Twitter', 't', 'https://twitter.com', '/search?q={}', '#1da1f2'],
    ['Watch', 'Twitch', 'T', 'https://www.twitch.tv', null, '#6441a5'],
    ['Watch', 'YouTube', 'y', 'https://youtube.com/', '/results?search_query={}', '#cd201f'],
  ],

  // give suggestions as you type
  suggestions: true,

  // max amount of suggestions that will ever be displayed
  suggestionsLimit: 10,

  // the order and limit for each suggestion influencer
  // "Default" suggestions come from CONFIG.defaultSuggestions
  // "DuckDuckGo" suggestions come from the duck duck go search api
  // "History" suggestions come from your previously entered queries
  influencers: [
    { name: 'Default', limit: 5 },
    { name: 'History', limit: 2 },
    { name: 'DuckDuckGo', limit: 5 },
  ],

  // default search suggestions for the specified queries
  defaultSuggestions: {
    'g': ['g/issues', 'g/pulls', 'gist.github.com'],
    'r': ['r/r/unixporn', 'r/r/startpages', 'r/r/webdev', 'r/r/firefoxcss'],
  },

  // instantly redirect when a key is matched
  // put a space before any other queries to prevent unwanted redirects
  instantRedirect: false,

  // open queries in a new tab
  newTab: false,

  // dynamic background colors when command domains are matched
  colors: true,

  // the delimiter between the key and your search query
  // e.g. to search GitHub for potatoes you'd type "g:potatoes"
  searchDelimiter: ':',

  // the delimiter between the key and a path
  // e.g. type "r/r/unixporn" to go to "reddit.com/r/unixporn"
  pathDelimiter: '/',

  // the delimiter between the hours and minutes in the clock
  clockDelimiter: '&nbsp;',

  // note: you can pass in your search query via the q query param
  // e.g. going to file:///path/to/tilde/index.html?q=hamsters is equivalent
  // to typing "hamsters" and pressing enter
};