# hub

hub is a modified fork of [tilde](https://github.com/cadejscroggins/tilde) made by [cadejscroggins](https://github.com/cadejscroggins).

A minimalistic start page suited for your workflow.

![hub](https://i.imgur.com/WMtcH8F.gif)

[Roadmap](https://github.com/VKhitrin/hub/wiki/Roadmap)

## Usage

For more detailed usage, refer to the [wiki](https://github.com/VKhitrin/hub/wiki/Detailed-Usage). 

### General

Generic google queries can be performed by typing.

Typing `I don't know what I'm doing` will trigger a google query with the entered text.

To access a site qucikly, press the assigned hotkey.

Typing `r` would redirect to corresponding site, in this case will redirect to [www.reddit.com](https://www.reddit.com).

### Searching

Some sites offer a search functionality which can be triggered by typing `<site_hotkey><search_delimiter>`, by default search_delimiter is `:`.

Typing `r:TEST` would send a search query to the corresponding site, in this case will redirect to [www.reddit.com/search?q=TEST](https://www.reddit.com/search?q=TEST).

### Browsing

Browsing to a specified location can be triggered by typing `<site_hotkey><path_delimiter>`, by default path_delimiter is `/`.

Typing `r/r/firefoxcss` would redirect to the specified location in the corresponding site, in this case will redirect to [www.reddit.com/r/firefoxcss](https://www.reddit.com/search?q=TEST).

Typing a full domain or URL will redirect you to that URL,

`www.google.com` will redirect to [www.google.com](https://www.google.com).

### Help

Help can be triggered by pressing `F1`.

The help menu will show overview of the things that can be done and will contain links to the repo for more information.

Commands help menu can be triggered by pressing '?'.

The commands help menu will show all the websites configured and the hotkey they're bound to.

## Hub

Not yet implemented.

Will showcase relevant dynamic information.

## Configuration

Currently the only way to override configuration is through the `assets/js/config.js` (default config file) and `assets/js/internal.js` files.

Configuration variables with their default values:
- CONFIG.commands -  The category, name, key, url, search path and color for your commands, if none of the specified keys are matched, the '*' key is used
    ```javascript
    commands: [
        [null, 'Google', '*', 'https://encrypted.google.com', '/search?q={}', '#111'],
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
    ```
    
* CONFIG.suggestions - Give suggestions as you type
    ```javascript
    suggestions: true,
    ```
* CONFIG.saveToLocalStorage - Allow browser to save history to localStorage
    ```javascript
    saveToLocalStorage: true,
    ```
    
* CONFIG.suggestionsLimit - Max amount of suggestions that will ever be displayed
    ```javascript
    suggestionsLimit: 10,
    ```
    
* CONFIG.influencers - the order and limit for each suggestion influencer
    ``` javascript
    // the order and limit for each suggestion influencer
    influencers: [
        { name: 'Default', limit: 5 }, // "Default" suggestions come from CONFIG.defaultSuggestions
        { name: 'History', limit: 2 }, // "History" suggestions come from your previously entered queries
        { name: 'DuckDuckGo', limit: 5 }, // "DuckDuckGo" suggestions come from the duck duck go search api
    ],
    ```
    
* CONFIG.defaultSuggestions - Default search suggestions for the specified queries
    ``` javascript
    defaultSuggestions: {
        'g': ['g/issues', 'g/pulls', 'gist.github.com'],
        'r': ['r/r/unixporn', 'r/r/startpages', 'r/r/webdev', 'r/r/firefoxcss'],
  }
    ```
* CONFIG.instantRedirect - Instantly redirect when a key is matched, put a space before any other queries to prevent unwanted redirects
    ```javascript
    instantRedirect: false,
    ```
    
* CONFIG.newTab - Open queries in a new tab
    ```javascript
    newTab: false,
    ```
    
* CONFIG.colors - Dynamic background colors when command domains are matched
    ```javascript
    colors: true,
    ```
    
* CONFIG.searchDelimiter - The delimiter between the key and your search query
    ```javascript
    searchDelimiter: ':',
    ```
* CONFIG.pathDelimiter - The delimiter between the key and a path
    ```javascript
    pathDelimiter: '/',
    ```
* CONFIG.clockDelimiter - The delimiter between the hours and minutes in the clock
    ```javascript
    clockDelimiter: '&nbsp;',
    ```

* CONFIG.backgroundColor - Background color of main screen - mapped to --background CSS variable, if not defined or invalid defaults to value assigned in 'actions.js'
    ```javascript
    backgroundColor: '#000',
    ```

* CONFIG.foregroundColor - Background color of main screen - mapped to --foreground CSS variable, if not defined or invalid defaults to value assigned in 'actions.js'
    ```javascript
    foregroundColor: '#fff',
    ```

* CONFIG.searchColor - Background color of main screen - mapped to --search CSS variable, if not defined or invalid defaults to value assigned in 'actions.js'
    ```javascript
    searchColor: '#222',
    ```

* CONFIG.twelveHours - Set clock to 12 hour format
    ```javascript
    twelveHour: false,
    ```
    
## File Hierarchy

* `index.html` - Contains all the static HTML.

* `assets/js/config.js` - Contains most of the configuration.

* `assets/js/actions.js` - Contains all the dynamic JavaScript logic.

* `assets/js/internal.js` - Placeholder file I use to Extend config.js as part of my workflow.

* `assets/css/style.css` - CSS customization.

* `assets/fonts/` - Local fonts directory.

## Compatability

(Need to test on more platforms)

### MacOS

Firefox 57+

## Credits

[cadejscroggins](https://github.com/cadejscroggins)

[Lato Fonts](http://www.latofonts.com/)