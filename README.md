# Flowplayer SDK and API
Javascript API for Flowplayer

# Installation
Download the JS-file, playerapi.js, in this repository and include it on the page were you will embed the Flowplayer iFrame-player.

Initialize the player API :

On the src to the iFrame-player add apiOn=1 and playerId as a query parameter. Sample: https://ljsp.lwcdn.com/api/video/embed.jsp?id={videoId}&pi={playerId}&apiOn=1&player_id=player-1 

```js
$f(document.getElementById('player-iframe-id')).addEvent('ready', ready);
```

When ready events been received create variable player:
```js
player = $f('player-1');
```

start player with:  
```js
player.play();
```

## Demos
Demos of the API can be found on [demo.html](src/demo.html) and [demo_inscreen.html](/src/demo_inscreen.html) in this repo.
   
# Events
All events that is sent by the player on available though the API.

## Player Event
Triggered by the player

|     | Description           | Data   | HTML5 | Mobile Devices
| ------------- |:-------------:| -----:|-----:|-----:|
| ready | Display of media |     [mediatype] - video or live  | Yes | Yes |

## Playback Event
Triggered during the playback of the video or livestream.

|     | Description           | Data   | HTML5 | Mobile Devices
| ------------- |:-------------:| -----:|-----:|-----:|
| mediaDisplay | Triggered when the media is displayed |     [mediatype] - video or live | Yes | Yes |
| mediaStart    | Triggered when the media asset is told to play | [mediatype] - video or live | Yes | Yes |
| mediaResume    | Triggered when the media asset resumes after pause | [mediatype] - video or live | Yes | Yes |
| mediaStartsToPlay     | Triggered when the media asset actually start to play      |   [mediatype] - video or live  | Yes | Yes |
| mediaPaused | Triggered when the media asset has been paused |     [mediatype] - video or live | Yes | Yes |
| mediaEnded | Triggered when the media asset has ended |     [mediatype] - video or live | Yes | Yes |
| mediaQuartile | Triggered when the playback has reached a given quatile. Not availabe during live |     [mediatype] - video <br/>[quartile] - 25,50,75% of video | Yes | Yes |
| playbackError | Triggered when a playback error has occurred | Yes | Yes |

## Media Event
Can be used to communicate with the player.

|       | Description           | Data   | HTML5 | Mobile Devices
| ------------- |:-------------:| -----:|-----:|-----:|
| getVolume | Returns the volume in decimal format | 0-1.0 | Yes | No |
| setVolume | Sets the volume in decimal format | 0-1.0 | Yes | No |
| getPosition | Returns the current position in seconds | integer | Yes | Yes |
| setPosition | Sets the current position in seconds | integer | Yes | Yes |
| getDuration | Returns the duration of the playing media in seconds | integer | Yes | Yes |
| getMediaInfo | Returns a JSON-data about the current media | JSON-data | Yes | Yes |
| getIsPlaying | Returns if the media is playing or not | true/false | Yes | Yes |
| setIsPlaying | Sets if the should be playing or not. Eg. play/pause | true/false | Yes | Yes |
| getIsLive | Returns if the media is a livecast or not | true/false | Yes | Yes |
| setChapters | Sets chapters for the current video | JSON-data, example: {"chapters":[{"title":"chapter1","time":7},{"title":"chapter1","time":31}]} | Yes | No |
| setExternalTrackingData | Sets extra data nedded for tracking | JSON-data, example: {"comscore":{"key":"value"}} | Yes | Yes |
| setAds | Sets ads data for Flowplayer 7 | Json-data, see [docs for format](https://flowplayer.com/help/player/flowplayer-7/vast-retired) | Yes | Yes |

## Ad Event
Events you can listen to, that are triggered when playing ads in the player.

|         | Description           | Data  |Flash | HTML5 | Mobile Devices
| ------------- |:-------------:| -----:|-----:|-----:|-----:|
| adStart | Triggered when the ad is played |[mediatype] - video or live<br/>playertype - HTML5 or Flash<br/> Adservername <br/>starttime in millis| No | Yes | Yes |
| adeEnded | Triggered when the ad has ended |[mediatype] - video or live|No | Yes | Yes |
| adBlockStart | Triggered when an AdBlock is initiated |[mediatype] - video or live<br/>playertype - HTML5 or Flash<br/> Adservername|No | Yes | Yes |
| adBlockComplete | Triggered when an entire block of ads has ended e.g. all prerolls has been displayed |[mediatype] - video or live|No | Yes | Yes |
| adError | Triggered when there was an ad loading problems with either ad data or ad video|[mediatype] - video or live<br/>playertype - HTML5 or Flash<br/> Adservername <br/>millis since request|No | Yes | Yes |
| adEmpty | Triggered when the ad response was empty. From some Ad Servers an adError is thrown instead. |[mediatype] - video or live<br/>playertype - HTML5 or Flash<br/> Adservername |No | Yes | Yes |
