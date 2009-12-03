dojo.require('dojox.cometd');

dojo.addOnLoad(function() {
	var _connected = false;
	
	function _connectionSucceeded() {
		console.info('Connection OK');
	}
	
	function _connectionBroken() {
		console.error('Connection broken');
	}
	
	function _metaConnect(message) {
		console.info("Got meta/connect message", message);
		var wasConnected = _connected;
		_connected = message.successful === true;
		if (!wasConnected && _connected) {
			_connectionSucceeded();
		} else if (wasConnected && !_connected) {
			_connectionBroken();
		}
	}
	
	var cometd = dojox.cometd;
	
	// Disconnect when page unloads
	dojo.addOnUnload(function() {
		cometd.disconnect();
	});
	
	console.info('Trying to initialize Comet...');
	var cometUrl = location.protocol + '//' + location.host + config.contextPath + '/cometd';
	cometd.configure({'url': cometUrl, 'logLevel': 'debug'});
	
	cometd.addListener('/meta/connect', _metaConnect); // subscribe to meta channel to listen for meta events
	cometd.handshake();
	cometd.subscribe('/messages', function(message) {
		console.info("Got: ", message);
	});
	console.info('Subscription requests sent.');
});