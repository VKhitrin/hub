# hub

hub is a modified fork of [tilde](https://github.com/cadejscroggins/tilde) made by [cadejscroggins](https://github.com/cadejscroggins).

A minimalistic start page suited for your workflow.

![hub](https://i.imgur.com/Ad8ygbJ.gif)

## Usage

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

Help can be triggered by pressing `?`.

The help menu will showcase all the sites and their hotkeys organized by categories.

## Hub

Not yet implemented.

Will showcase relevant dynamic information.

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
