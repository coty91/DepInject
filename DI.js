
(function(){

	function DepInject() {
		this.version = '0.0.1';
		this.args = '';
		this.dependencies = new Array;
		this.ARG_MATCH = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
	};

	DepInject.prototype.register = function(name, dependency) {
		this.dependencies[name] = dependency;
	};

	DepInject.prototype.process = function(target) {
		var self = this;
		this.args = target.toString().match(this.ARG_MATCH)[1].split(',');
		target.apply(target, this.args.map(function(value) {
			return self.dependencies[value];
		}));
	};

	window.DI = new DepInject();

})(window);

var SayWhat = {
	say: function() {
		console.log("What");
	}
}

var SayHello = {
	say: function() {
		console.log("Hello");
	}
}

function HomeController(Speech) {
	Speech.say();
}

DI.register('Speech', ((Math.random()*10) <= 5) ? SayWhat : SayHello);

DI.process(HomeController);

