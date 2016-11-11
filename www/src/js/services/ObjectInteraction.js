var ObjectInteraction = (function(){

	function ObjectInteraction(id, camera) {
		this.id = id;
		this.camera = camera;
		this.onInteract = function() {};
		this.startListeningForInteraction(this.id, this.camera);
	}

	ObjectInteraction.prototype.startListeningForInteraction = function() {
		var context = this;
		$(this.id).click(function(){
			context.onInteract(this.id);
		});
	};

	ObjectInteraction.prototype.setOnInteract = function(callback) {
		this.onInteract = callback;
	};

	return ObjectInteraction;

}());