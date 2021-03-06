const CONFIG = {

  // the category, name, key, url, search path and color for your commands
  // if none of the specified keys are matched, the '*' key is used
  commands: [
    ['Work', 'GitHub', 'g', 'https://github.com', '/search?q={}', '#333'],
    ['Work', 'Stackoverflow', 's', 'https://stackoverflow.com', '/search?q={}', '#f48024'],
    ['Look', 'Codrops', 'C', 'https://tympanus.net/codrops', '?search-type=posts&s={}', '#0099cc'],
    ['Look', 'Hunt', 'H', 'https://www.producthunt.com', '/search?q={}', '#da552f'],
    ['Look', 'Unsplash', 'u', 'https://unsplash.com/', '/search/{}', '#000'],
    ['Look', 'Imgur', 'i', 'https://imgur.com', '/search?q={}', '#85bf25'],
    ['Lurk', 'Reddit', 'r', 'https://www.reddit.com', '/search?q={}', '#5f99cf'],
    ['Lurk', 'Twitter', 't', 'https://twitter.com', '/search?q={}', '#1da1f2'],
    ['Watch', 'Twitch', 'T', 'https://www.twitch.tv', null, '#6441a5'],
    ['Watch', 'YouTube', 'y', 'https://youtube.com/', '/results?search_query={}', '#cd201f'],
  ],

  // give suggestions as you type
  suggestions: true,

  // allow browser to save history to localStorage
  saveToLocalStorage: true,

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

  // background color of main screen - mapped to --background CSS variable, if not defined or invalid defaults to value assigned in 'actions.js'
  backgroundColor: '#000',

  // foreground color of main screen - mapped to --foreground CSS variable, if not defined or invalid defaults to value assigned in 'actions.js'
  foregroundColor: '#fff',

  // default search background color - mapped to --search CSS variable, if not defined or invalid defaults to value assigned in 'actions.js'
  searchColor: '#222',

  // set clock to 12 hour format
  twelveHour: false,

  // set defaut search engine, implemented options are ['None', Google', 'DuckDuckGo']
  // if invalid value is given, default to Google
  searchEngine: 'Google',

  // note: you can pass in your search query via the q query param
  // e.g. going to file:///path/to/hub/index.html?q=cats is equivalent
  // to typing "cats" and pressing enter
};