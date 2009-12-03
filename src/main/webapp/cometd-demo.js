dojo.require('dojox.cometd');

dojo.addOnLoad(function() {
	var _connected = false;
	
	function _connectionSucceeded() {
		dojo.byId('body').innerHTML = 'Connection OK';
	}
	
	function _connectionBroken() {
		dojo.byId('body').innerHTML = 'Connection broken';
	}
	
	function _metaConnect(message) {
		var wasConnected = _connected;
		_connected = message.successful === true;
		if (!wasConnected && _connected) {
			__connectionSucceeded();
		} else if (wasConnected && !_connected) {
			_connectionBroken();
		}
	}
	
	var cometd = dojox.cometd;
	
	// Disconnect when page unloads
	dojo.addOnUnload(function() {
		cometd.disconnect();
	});
	
	var cometUrl = location.protocol + '//' + location.host + config.contextPath + '/cometd';
	cometd.init(cometUrl);
	cometd.subscribe('/meta/connect', _metaConnect);
// new cometd.js API	
//	cometd.configure({'url': cometUrl, 'logLevel': 'debug'});
//	cometd.addListener('/meta/connect', _metaConnect); // subscribe to meta channel to listen for meta events
//	cometd.handshake();
});