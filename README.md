# Lemonwhale-Player-API
Javascript API for the Lemonwhale Player

# Installation
Download the JS-file, playerapi.js, in this repository and include it on the page were you will embed the Lemonwhale iFrame-player.

A demo of the API can be found on demo.html in this repo.

Initialize the player API :

On the src to the iFrame-player add apiOn=1 and playerId as a query parameter. Sample: http://ljsp.lwcdn.com/api/video/embed.jsp?id={videoId}&pi={playerId}&apiOn=1&playerId=player-1 

$f(document.getElementById('player-iframe-id')).addEvent('ready', ready);

When ready events been received create variable player:
player = $f(player_id);

start player with:   player.play();
   
#Events
All events that is sent by the player on available though the API.

## Playback Event
This is events triggered during the playback of the video or livecast.

|     | Description           | Data  |Flash | HTML5 | Mobile Devices
| ------------- |:-------------:| -----:|-----:|-----:|-----:|
| mediaDisplay | Display of media |     [mediatype] - video or live | No | Yes | Yes |
| mediaStart    |  Media asset is told to play | [mediatype] - video or live |No | Yes | Yes |
| mediaResume    |  Media asset resumes after pause | [mediatype] - video or live |No | Yes | Yes |
| mediaStartsToPlay     |  Media asset actually start to play      |   [mediatype] - video or live  |No | Yes | Yes |
| mediaPaused | Media asset has been paused |     [mediatype] - video or live |No | Yes | Yes |
| mediaEnded | Media asset has ended |     [mediatype] - video or live |No | Yes | Yes |
| mediaQuartile | A quatile of media is played, not possible during live |     [mediatype] - video <br/>[quartile] - 0,25,50,75,100% of video |No | Yes | Yes |
| playbackError | A playback error has occurred | |No | Yes | Yes |

## Media Event
These events can be used to communicate with the player.

|       | Description           | Data  | Flash | HTML5 | Mobile Devices
| ------------- |:-------------:| -----:|-----:|-----:|-----:|
| getVolume | Return the volume in decimal format | 0-1.0 | Yes | Yes | No |
| setVolume | Set the volume in decimal format | 0-1.0 | Yes | Yes | No |
| getPosition | Return the current position in seconds | integer | Yes | Yes | Yes |
| setPosition | Set the current position in seconds | integer | Yes | Yes | Yes |
| getDuration | Return the duration of the playing media in seconds | integer | Yes | Yes | Yes |
| getMediaInfo | Return a JSON-data about the current media | JSON-data | Yes | Yes | Yes |
| getIsPlaying | Return if the media is playing | true/false | Yes | Yes | Yes |
| setIsPlaying | Set if the media to playing or not. Eg. play/pause | true/false | Yes | Yes | Yes |
| getIsLive | Return if the media a livecast or not | true/false | Yes | Yes | Yes |

## Ad Event
These events are triggered when playing ads in the player.

|         | Description           | Data  |Flash | HTML5 | Mobile Devices
| ------------- |:-------------:| -----:|-----:|-----:|-----:|
| adStart | Ad is told to play |[mediatype] - video or live<br/>playertype - HTML5 or Flash<br/> Adservername <br/>starttime in millis| No | Yes | Yes |
| adeEnded | An ad has ended |[mediatype] - video or live|No | Yes | Yes |
| adblockStart |  An adblock is initiated |[mediatype] - video or live<br/>playertype - HTML5 or Flash<br/> Adservername|No | Yes | Yes |
| adblockComplete | An entire block of ads has ended e.g. all prerolls has been displayed |[mediatype] - video or live|No | Yes | Yes |
| adError | Ad loading problems with either ad data or ad video|[mediatype] - video or live<br/>playertype - HTML5 or Flash<br/> Adservername <br/>millis since request|No | Yes | Yes |
| adEmpty | Ad response was empty|[mediatype] - video or live<br/>playertype - HTML5 or Flash<br/> Adservername |No | Yes | Yes |
