var LemonwhaleAPI = (function(){
    // Define a local copy of LemonwhaleAPI
    function LemonwhaleAPI(iframe) {
        // The LemonwhaleAPI object is actually just the init constructor
        return new LemonwhaleAPI.fn.init(iframe);
    }

    var eventCallbacks = {},
        hasWindowEvent = false,
        isReady = false,
        slice = Array.prototype.slice,
        playerOrigin = '*';

    LemonwhaleAPI.fn = LemonwhaleAPI.prototype = {
        element: null,

        init: function(iframe) {
            if (typeof iframe === "string") {
                iframe = document.getElementById(iframe);
            }
            this.element = iframe;

            return this;
        },

        /*
         * Calls a function to act upon the player.
         *
         * @param {string} method The name of the Javascript API method to call. Eg: 'play'.
         * @param {Array|Function} valueOrCallback params Array of parameters to pass when calling an API method
         *                                or callback function when the method returns a value.
         */

        callPlayer: function(method, valueOrCallback) {
            if (!this.element || !method) {
                return false;
            }

            console.log('this 3',this.element,typeof Object.prototype.toString.call( this.element ));
           
            console.log('this 1',this.element);
            var self = this,
                element = self.element,
                target_id = element.id !== '' ? element.id : null,
                params = !isFunction(valueOrCallback) ? valueOrCallback : null,
                callback = isFunction(valueOrCallback) ? valueOrCallback : null;


            // Store the callback for get functions
            if (callback) {
                storeCallback(method, callback, target_id);
            }

            postMessage(method, params, element);

            return self;
        },

        //Start to play.
        play: function(){
            this.callPlayer('setIsPlaying',true);
        },

        //Pause the media playback.
        pause: function(){
            this.callPlayer('setIsPlaying',false);
        },

        //Return the duration of current media asset. Will return NaN or 0 before the assets starts to play.
        getDuration: function(callback){
            this.callPlayer('getDuration', callback);
        },

        //Return the current volume in decimal format between 0-1.0.
        getVolume: function(callback){
            this.callPlayer('getVolume', callback);
        },

        //Receive JSON-data with information about the media asset.
        getMediaInfo: function(callback){
            this.callPlayer('getMediaInfo', callback);
        },

        //This method returns false if video is paused or ended and true if it's playing.
        getIsPlaying: function(callback){
            this.callPlayer('getIsPlaying', callback);
        },

        //Receive the current position in video in Seconds
        getPosition: function(callback){
            this.callPlayer('getPosition', callback);
        },

        //Returns true if media is a livecast
        isLive: function(callback){
            this.callPlayer('getIsLive', callback);
        },

        //Sets the players skin color
        setColor : function( color ){
            this.callPlayer('setUpColor', color);
        },

        //Sets the players hover color
        setHoverColor : function( color ){
            this.callPlayer('setHoverColor', color);
        },

        //Sets the volume. This will not work on mobile devices, since they doesn't support volume changes in browser
        setVolume : function( volumePercentage ){
            this.callPlayer('setVolume', volumePercentage);
        },

        //Sets the playback position in the video. 
        setPosition : function( newPositionInSeconds ){
            this.callPlayer('setPosition', newPositionInSeconds);
        },
        
        //Sets chapters
        setChapters : function( chapters ){
            this.callPlayer('setChapters', chapters);
        },


        /*
         * Registers an event listener and a callback function that gets called when the event fires.
         *
         * @param eventName (String): Name of the event to listen for.
         * @param callback (Function): Function that should be called when the event fires.
         */
        addEvent: function(eventName, callback) {
            if (!this.element) {
                return false;
            }
            
            var self = this,
                element = self.element,
                target_id = element.id !== '' ? element.id : null;


            storeCallback(eventName, callback, target_id);

            // The ready event is not registered via postMessage. It fires regardless.
            if (eventName != 'ready') {
                postMessage('addEventListener', eventName, element);
            }
            else if (eventName == 'ready' && isReady) {
                callback.call(null, target_id);
            }


            return self;
        },

        /*
         * Unregisters an event listener that gets called when the event fires.
         *
         * @param eventName (String): Name of the event to stop listening for.
         */
        removeEvent: function(eventName) {
            if (!this.element) {
                return false;
            }
            //Remove events to listen to
        }
    };

    /**
     * Handles posting a message to the parent window.
     *
     * @param method (String): name of the method to call inside the player. For api calls
     * this is the name of the api method (api_play or api_pause) while for events this method
     * is api_addEventListener.
     * @param params (Object or Array): List of parameters to submit to the method. Can be either
     * a single param or an array list of parameters.
     * @param target (HTMLElement): Target iframe to post the message to.
     */
    function postMessage(method, params, target) {
       
        if (!target.contentWindow.postMessage) {
            return false;
        }

        var data = { type: method,
            value: params
        };

        target.contentWindow.postMessage(data, '*');
    }

    /**
     * Event that fires whenever the window receives a message from its parent
     * via window.postMessage.
     */
    function onMessageReceived(event) {
        var data, method;
        try {
            data = event.data;
            method = data.event || data.method;
        }
        catch(e)  {
            //fail silently... like a ninja!
        }

        if (method == 'ready' && !isReady) {
            isReady = true;
        }

        if (playerOrigin === '*') {
            playerOrigin = event.origin;
        }

        var value = data.value,
            eventData = data.data,
            player_id = player_id === '' ? null : data.player_id,

            callback = getCallback(method, player_id),
            params = [];

        if (!callback) {
            return false;
        }

        if (value !== undefined) {
            params.push(value);
        }

        if (eventData) {
            params.push(eventData);
        }

        if (player_id) {
            params.push(player_id);
        }

        return params.length > 0 ? callback.apply(null, params) : callback.call();
    }


    /**
     * Stores submitted callbacks for each iframe being tracked and each
     * event for that iframe.
     *
     * @param eventName (String): Name of the event. Eg. api_onPlay
     * @param callback (Function): Function that should get executed when the
     * event is fired.
     * @param target_id (String) [Optional]: If handling more than one iframe then
     * it stores the different callbacks for different iframes based on the iframe's
     * id.
     */
    function storeCallback(eventName, callback, target_id) {
        if (target_id) {
            if (!eventCallbacks[target_id]) {
                eventCallbacks[target_id] = {};
            }
            eventCallbacks[target_id][eventName] = callback;
        }
        else {
            eventCallbacks[eventName] = callback;
        }
    }

    /**
     * Retrieves stored callbacks.
     */
    function getCallback(eventName, player_id) {
        if(player_id==undefined){
           return;
        }
        if (player_id) {
            if(eventCallbacks[player_id] == undefined){
                console.log('callback undefined')
                return;
            }
            return eventCallbacks[player_id][eventName];
        }
        else {
            return eventCallbacks[eventName];
        }
    }

    function removeCallback(eventName, player_id) {
        if (player_id && eventCallbacks[player_id]) {
            if (!eventCallbacks[player_id][eventName]) {
                return false;
            }
            eventCallbacks[player_id][eventName] = null;
        }
        else {
            if (!eventCallbacks[eventName]) {
                return false;
            }
            eventCallbacks[eventName] = null;
        }

        return true;
    }

    function isFunction(obj) {
        return !!(obj && obj.constructor && obj.call && obj.apply);
    }

    function isArray(obj) {
        return toString.call(obj) === '[object Array]';
    }

    // Give the init function the LemonwhaleAPI prototype for later instantiation
    LemonwhaleAPI.fn.init.prototype = LemonwhaleAPI.fn;

    // Listens for the message event.
    if (window.addEventListener) {
        window.addEventListener('message', onMessageReceived, false);
    } else {
        window.attachEvent('onmessage', onMessageReceived);
    }

    // Expose LemonwhaleAPI to the global object
    return (window.LemonwhaleAPI = window.$f = LemonwhaleAPI);

})();