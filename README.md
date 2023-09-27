# Video Player demo page

This is a demo page to test why some videos are working and some are not in the video player.

History:

Hello! Jarret from the visual storytelling team here. We noticed an issue with some of the video IDs we're trying to embed in our customs. Some work while others are throwing an error (below). i've set up a demo page showing the set of working and not working videos.
Unhandled Promise Rejection: TypeError: null is not an object (evaluating 'a.match(e).pop')
a couple things:
i noticed that our local template has an older version of the player (2.15.0) and all the videos play correctly. Though when i load in the new version of the player (3.7.22), only the ones labeled "working" are ... working.
im trying to find documentation in confluence on the new video player (3.7.22) and the options we have available. when i load the player locally for example, i get a bunch of dev controls that i can't figure out how to turn off and the players seems to load by default into a modal so it breaks the layout. we'd want it inline instead of a modal right where the video is initiated. can you point me to the documentation for the new 3.7.22 player?
appreciate any direction you can give me!

Keith Lam
  2 hours ago
the problem appears to the the js attempting to parse the mediaUrl for some data but it doesn't match the expected format so the regex match fails


Keith Lam
  2 hours ago
unexpected:
https://service-pkgespn.akamaized.net/opp/hls/espn/2023/0924/ss_20230924_015104358_2347324/ss_20230924_015104358_2347324/playlist.m3u8
works: https://media.video-cdn.espn.com/motion/2022/1223/ss_20221223_133238955_2137457/ss_20221223_133238955_2137457.m3u8


Keith Lam
  2 hours ago
looking at this it appears like the espn.video is trying to parse the media url to generate thumbnail urls.  but it should just return empty when it doesn't match.  not error https://a.espncdn.com/combiner/c/2?js=video/3.7.22/espn.video.js,lodash.min.js&minify=false

```
var pathRegex = /motion\/(.+?)\./;

function buildTimelinePreviewObject(videoURL, duration) {
  if (!videoURL) {
    return null;
  }

  var previews = {};
  var base = 'https://media.video-cdn.espn.com/motion/';
  var extension = 'jpg';
  var numPreviews = Math.floor(duration / 10);

  var parts = videoURL.match(pathRegex).pop().split('/');
  parts.splice(-1, 0, 'chaptertn');

  // Some playback URLs from MediaItem are suffixed with `_nolbr`, need to
  // remove that to build a valid thumbnail URL
  var path = parts.join('/').replace('_nolbr', '');

  var i = 0;

  while (i <= numPreviews) {
    previews['' + i * 10] = {
      // eslint-disable-next-line no-plusplus
      src: '' + base + path + '_' + ++i + '.' + extension,
      width: '150px'
    };
  }

  return previews;
}
```


Jarret Gabel
  1 hour ago
good find!


Graham Schilling
:spiral_calendar_pad:  1 hour ago
Media ops cut over to the https://service-pkgespn.akamaized.net host earlier this year so all newly cut shortform VOD clips will fail on the version of the player in https://a.espncdn.com/combiner/c/2?js=video/3.7.22/espn.video.js,lodash.min.js&minify=false


Keith Lam
  1 hour ago
@dan
 what is the best path to address this issue in the v3 player bundle code?


Graham Schilling
:spiral_calendar_pad:  1 hour ago
its actually the v2 player under the hood.. so support is deprecated


Graham Schilling
:spiral_calendar_pad:  1 hour ago
I wonder if it be possible to just embed the video differently in these feature stories... An iframe of https://www.espn.com/watch/syndicatedplayer?id=38473917 for example


Keith Lam
  1 hour ago
oh i thought it was v3 based on the url, my confusion


Jarret Gabel
  1 hour ago
thats an interesting note about the migration.. when i check the date on the videos that work, they are months-year old. the ones that don't work are created recently

Graham Schilling
:spiral_calendar_pad:  1 hour ago
Yea that's right, new videos hosted on https://service-pkgespn.akamaized.net create the issue


Graham Schilling
:spiral_calendar_pad:  1 hour ago
Could you check if embedding something like this handles the use case for the feature story?

```<iframe src="https://www.espn.com/watch/syndicatedplayer?id=38473917" />```


Jarret Gabel
  16 minutes ago
in reference to the second part of my question about documentation, here are screens of what i see when i load the player through localhost while i develop the page.
screen 1: i get these dev controls i'd like to disable. notice the "this is a modal" bit.
screen 2: more dev controls that load below the player i'd like to disable
screen 3: the video player code we were using in the local dev environment till now was v2.5.0. since we're in v3+ now, im wondering what the correct implementation is and what the configuration options we have available. in the past, the mobile player needed some hacking in height and im excited to see what's been added/changed. is there a confluence page for config options and features? (edited)

#### Installation
- `npm install`

#### Commands
- `develop`: Runs hugo development server and Browser-sync
- `build`: Builds production site
- `clean`: Cleans hugo build and cache
- `deploy`: Builds production site and deploys css and js files
- `commit`: Adds all files to commit, commits and pushes to github

#### Dependecies
- [sass](https://sass-lang.com)
- [babel](https://babeljs.io)
- [gsap](https://greensock.com/gsap/)
