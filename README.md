# Lemonwhale-Player-API
Javascript API for the Lemonwhale Player

# Installation
TODO
   
#Events
All events that is sent by the player on available though the API.

| Playback Event        | Description           | Data  |
| ------------- |:-------------:| -----:|
| mediadisplay | Display of media |     [mediatype] - video or live |
| mediastart    |  Media asset is told to play | [mediatype] - video or live |
| mediastartstoplay     |  Media asset actually start to play      |   [mediatype] - video or live  |
| mediapaused | Media asset has been paused |     [mediatype] - video or live |
| mediaended | Media asset has ended |     [mediatype] - video or live |
| mediaquartile | A quatile of media is played |     [mediatype] - video or live<br/>[quartile] - 0,25,50,75,100% of video |
| playbackerror | A playback error has occurred | |

| Media Event        | Description           | Data  |
| ------------- |:-------------:| -----:|
| getIsPlaying | Return if the media is playing | true/false |

| Ad Event        | Description           | Data  |
| ------------- |:-------------:| -----:|
| adstart | Ad is told to play |[mediatype] - video or live<br/>playertype - HTML5 or Flash<br/> Adservername <br/>starttime in millis|
| adended | An ad has ended |[mediatype] - video or live|
| adblockstart |  An adblock is initiated |[mediatype] - video or live<br/>playertype - HTML5 or Flash<br/> Adservername|
| adblockcomplete | An entire block of ads has ended e.g. all prerolls has been displayed |[mediatype] - video or live|
| aderror | Ad loading problems with either ad data or ad video|[mediatype] - video or live<br/>playertype - HTML5 or Flash<br/> Adservername <br/>millis since request|
| adempty | Ad response was empty|[mediatype] - video or live<br/>playertype - HTML5 or Flash<br/> Adservername |
