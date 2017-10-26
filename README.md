# Lemonwhale-Player-API
Javascript API for the Lemonwhale Player

# Installation
Download the JS-file, playerapi.js, in this repository and include it on the page were you will embed the Lemonwhale iFrame-player.

Demos of the API can be found on demo.html and demo_inscreen.html in this repo.

Initialize the player API :

On the src to the iFrame-player add apiOn=1 and playerId as a query parameter. Sample: http://ljsp.lwcdn.com/api/video/embed.jsp?id={videoId}&pi={playerId}&apiOn=1&playerId=player-1 

$f(document.getElementById('player-iframe-id')).addEvent('ready', ready);

When ready events been received create variable player:
player = $f(player_id);

start player with:   player.play();
   
# Events
All events that is sent by the player on available though the API.

## Playback Event
This is events triggered during the playback of the video or livecast.

|     | Description           | Data  |Flash | HTML5 | Mobile Devices
| ------------- |:-------------:| -----:|-----:|-----:|-----:|
| mediaDisplay | Triggered when the media is displayed |     [mediatype] - video or live | No | Yes | Yes |
| mediaStart    |  Triggered when the media asset is told to play | [mediatype] - video or live |No | Yes | Yes |
| mediaResume    |  Triggered when the media asset resumes after pause | [mediatype] - video or live |No | Yes | Yes |
| mediaStartsToPlay     |  Triggered when the media asset actually start to play      |   [mediatype] - video or live  |No | Yes | Yes |
| mediaPaused | Triggered when the media asset has been paused |     [mediatype] - video or live |No | Yes | Yes |
| mediaEnded | Triggered when the media asset has ended |     [mediatype] - video or live |No | Yes | Yes |
| mediaQuartile | Triggered when the playback has reached a given quatile. Not available during live |     [mediatype] - video <br/>[quartile] - 25,50,75% of video |No | Yes | Yes |
| playbackError | Triggered when a playback error has occurred | |No | Yes | Yes |

## Media Event
Can be used to communicate with the player.

|       | Description           | Data  | Flash | HTML5 | Mobile Devices
| ------------- |:-------------:| -----:|-----:|-----:|-----:|
| getVolume | Returns the volume in decimal format | 0-1.0 | Yes | Yes | No |
| setVolume | Sets the volume in decimal format | 0-1.0 | Yes | Yes | No |
| getPosition | Returns the current position in seconds | integer | Yes | Yes | Yes |
| setPosition | Sets the current position in seconds | integer | Yes | Yes | Yes |
| getDuration | Returns the duration of the playing media in seconds | integer | Yes | Yes | Yes |
| getMediaInfo | Returns a JSON-data about the current media | JSON-data | Yes | Yes | Yes |
| getIsPlaying | Returns if the media is playing or not | true/false | Yes | Yes | Yes |
| setIsPlaying | Sets if the should be playing or not. Eg. play/pause | true/false | Yes | Yes | Yes |
| getIsLive | Returns if the media is a livecast or not | true/false | Yes | Yes | Yes |
| setChapters | Sets chapters for the current video | JSON-data, example: {"chapters":[{"title":"chapter1","time":7},{"title":"chapter1","time":31}]}	 | Yes | Yes | No |
| setExternalTrackingData | Sets extra data nedded for tracking | JSON-data, example: {"comscore":{"key":"value"}} | Yes | Yes | Yes |

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
