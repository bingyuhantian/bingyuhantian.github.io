var bearSprite = cc.Sprite.extend({
	gamestatus: 0,
	runningAction: null,
	rightAction: null,
	x1: null, //起始点
	x2: null, //终点
	speed: 400,
	box1: null,
	box2: null,
	direction:0,//方向0左 1 右
	flag: 0, //是否错乱
	touchListener: null,
	onEnter: function() {
		this._super();
		this.addEventListener();
		this.runningAction = this.createAction();
		this.rightAction = this.createRight();
	},
	addEventListener: function() {
		var that = this;
		this.touchListener = cc.EventListener.create({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			//			swallowTouches: true,
			//			onMouseDown: function(event) {
			//				this.x1 = event.getLocation();
			//				var target = event.getCurrentTarget();
			//				console.log(this.x1);
			//			},
			onTouchBegan: function(touch,event) {
				//console.log(typeof(that.speed));
				var target = event.getCurrentTarget();
				target.stopAllActions();
				this.x1 = target;
				this.x2 = touch.getLocation();
				//console.log(this.x2);
				var xx = this.x1.x - this.x2.x;
				//this.speed = 400;
				console.log(that.speed);
				var time = Math.abs(xx) / that.speed;

                 var runAction = that.runningAction.repeatForever();
                 var rightAction1=that.rightAction.repeatForever();
				var callback1 = cc.callFunc(function() {
					target.stopAction(runAction);
				}, this);
				var callback2 = cc.callFunc(function() {
					target.stopAction(rightAction1);
				}, this);
				
				console.log(time);
				if (that.flag == 0) {
					var move1 = cc.moveBy(time, cc.p(-xx, 0));
					if (xx > 0) {
						that.direction=0;
						target.runAction(runAction);
						target.runAction(cc.sequence(move1, callback1));
					} else {
						that.direction=1;
						target.runAction(rightAction1);
						target.runAction(cc.sequence(move1, callback2))
					}
				} else if (that.flag == 1) {
					var move2 = cc.moveBy(time, cc.p(xx, 0));
					if (xx > 0) {
						that.direction=0;
						target.runAction(rightAction1);
						target.runAction(cc.sequence(move2, callback2));
					} else {
						that.direction=1;
						target.runAction(runAction);
						target.runAction(cc.sequence(move2, callback1))
					}
				}

			}
		});
		cc.eventManager.addListener(this.touchListener, this);
	},
	createAction: function() { //跑步动画
		var frames = [];
		for (var i = 1; i < 5; i++) {
			var str = i + ".png"
				//cc.log(str);
			var frame = cc.spriteFrameCache.getSpriteFrame(str);
			frames.push(frame);
		}

		var animation = new cc.Animation(frames, 0.15);
		var action = new cc.Animate(animation);

		return action;
	},
	createRight: function() {
		var frames1 = [];
		for (var i = 5; i < 9; i++) {
			var str = i + ".png"
				//cc.log(str);
			var frame1 = cc.spriteFrameCache.getSpriteFrame(str);
			frames1.push(frame1);
		}

		var animation1 = new cc.Animation(frames1, 0.15);
		var action1 = new cc.Animate(animation1);

		return action1;
	}


});