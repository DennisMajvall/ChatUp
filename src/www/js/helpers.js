function formatTime(timestamp){
	var d = new Date(timestamp),
		time = [d.getHours(), d.getMinutes(), d.getSeconds()];

	time = time.map(function(t){
		return t < 10 ? '0' + t : t;
	});
	
	return time.join(':');
}