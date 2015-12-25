var a = 1;
var AA = 0;
var BB = 2;
var CC = 3;
var playLayer = cc.Layer.extend({
	explode: null,
	explode2: null,
	status1: null,
	status2: null,
	status3: null,
	st1:null,
	st2:null,
	st3:null,
	point: null, //世界坐标转换
	rectangle: null, //遮罩
	count: null,
	bear: null, //
	type: 0, //掉落类型
	Sprites: null, //掉落数组
	scroe: 0, //分数
	title: null, //
	time: 60, //倒计时
	bar2: null, //倒计时条
	timeLabel: null, //时间
	ctor: function() {
		this._super();
		var winsize = cc.director.getWinSize();
		var bg = new cc.Sprite(playBg);
		bg.attr({
			x: winsize.width / 2,
			y: winsize.height / 2
		});
		this.Sprites = [];
		this.addChild(bg);
		this.schedule(this.update, 1);
		this.schedule(this.checkBounding, 0.15, 10000, 2);
		//this.checkBounding();
		//this.scheduleUpdate();

		this.bear = new bearSprite("#1.png");
		this.bear.attr({
			x: winsize.width / 2,
			y: 90
		});
		this.addChild(this.bear, 3, AA);




		this.rectangle = new cc.LayerColor(cc.color(255, 255, 255, 0), 65, 25);
		this.rectangle.x = 15;
		this.rectangle.y = 55;
		this.bear.addChild(this.rectangle, 1, CC);


		this.title = new cc.LabelTTF("0", "Times New Roman", 20);
		this.title.attr({
			x: 75,
			y: winsize.height - 32
		});
		this.addChild(this.title, 3);

		var clipper = this.setClipping();
		clipper.setPosition(cc.p(winsize.width / 2 + 25, winsize.height - 30));
		var bar1 = new cc.Sprite("#bar1.png");
		clipper.addChild(bar1, 1);
		this.bar2 = new cc.Sprite("#bar2.png");
		clipper.addChild(this.bar2, 2);
		this.addChild(clipper, 4);

		var winsize = cc.director.getWinSize();
		this.timeLabel = new cc.LabelTTF(this.time + " 秒", "Times New Roman", 20);
		this.timeLabel.x = winsize.width - 30;
			this.timeLabel.y = winsize.height - 30;
			this.addChild(this.timeLabel, 3);
		var iconScore=new cc.Sprite(score_png);
		    iconScore.x=30;
		    iconScore.y=winsize.height-30;
		    this.addChild(iconScore,3);
		
		this.schedule(this.timeOut, 1, this.time, 1);
		this.schedule(this.Check, 0.5, 1000 * 1024, 1);
		//this.schedule(this.flagCheck, 0.25, 1000 * 1024, 1);
		//this.gameOver();
		this.explode = this.createExplode();
		this.explode2 = this.createAnotherExplode();
	},
	setClipping: function() {
		var winsize = cc.director.getWinSize();
		//遮罩
		var clipping = new cc.ClippingNode();
		var bar = new cc.Sprite("#bar1.png");
		clipping.setStencil(bar); //创建以标题作为大小的模板
		clipping.setAlphaThreshold(0);

		//var stencil=new cc.DrawNode();
		//stencil.drawRect(cc.p(50,50),cc.p(500,500),cc.color(255,255,255),1,cc.color(255,255,255));
		return clipping;
	},
	addSprite: function() {
		var random = Math.ceil(Math.random() * 50);
		//cc.log(random);
		if (random >= 0 && random <= 22) {
			this.type = 1;
		} else if (random > 22 && random <= 44) {
			this.type = 2;
		} else if (random > 44 && random <= 46) {
			this.type = 3;
		} else if (random > 46 && random <= 48) {
			this.type = 4;
		} else if (random > 48 && random <= 50) {
			this.type = 5;
		}
		//cc.log(this.type);
		switch (this.type) {
			case 1:
				this.addGold();
				break;
			case 2:
				this.addSilver();
				break;
			case 3:
				this.addShits();
				break;
			case 4:
				this.addBomb();
				break;
			case 5:
				this.addDrug();
				break;
		}
	},
	addSilver: function() {
		var winsize = cc.director.getWinSize();
		var silver = new cc.Sprite("#silver.png");
		silver.type = 2;
		var x = (winsize.width - 100) * cc.random0To1() + 50;
		silver.x = x;
		silver.y = winsize.height - 70;
		this.addChild(silver, 2);
		var move = cc.moveTo(4, cc.p(silver.x, -30));
		var scale = cc.repeatForever(cc.scaleBy(2, -1, 1));
		silver.runAction(scale);
		silver.runAction(move);
		this.count = silver;
		this.Sprites.push(this.count);

	},
	addGold: function() {
		var winsize = cc.director.getWinSize();
		var gold = new cc.Sprite("#gold.png");
		gold.type = 1;
		var x = (winsize.width - 100) * cc.random0To1() + 50;
		gold.x = x;
		gold.y = winsize.height - 70;
		this.addChild(gold, 2);
		var move = cc.moveTo(4, cc.p(gold.x, -30));
		var scale = cc.repeatForever(cc.scaleBy(2, -1, 1));
		gold.runAction(scale);
		gold.runAction(move);
		this.count = gold;
		this.Sprites.push(this.count);
	},
	addShits: function() {
		var winsize = cc.director.getWinSize();
		var shits = new cc.Sprite("#shits.png");
		shits.type = 3;
		var x = (winsize.width - 100) * cc.random0To1() + 50;
		shits.x = x;
		shits.y = winsize.height - 70;
		this.addChild(shits, 2);
		var move = cc.moveTo(4, cc.p(shits.x, -30));
		//var scale=cc.repeatForever(cc.scaleBy(2,-1,1));
		//shits.runAction(scale);
		shits.runAction(move);
		this.count = shits;
		this.Sprites.push(this.count);
	},
	addBomb: function() {
		var winsize = cc.director.getWinSize();
		var bomb = new cc.Sprite("#bomb.png");
		bomb.type = 4;
		var x = (winsize.width - 100) * cc.random0To1() + 50;
		bomb.x = x;
		bomb.y = winsize.height - 70;
		this.addChild(bomb, 2);
		var move = cc.moveTo(2, cc.p(bomb.x, -30));
		//var scale=cc.repeatForever(cc.scaleBy(2,-1,1));
		//shits.runAction(scale);
		bomb.runAction(move);
		this.count = bomb;
		this.Sprites.push(this.count);
	},
	addDrug: function() {
		var winsize = cc.director.getWinSize();
		var drug = new cc.Sprite("#drug.png");
		drug.type = 5;
		var x = (winsize.width - 100) * cc.random0To1() + 50;
		drug.x = x;
		drug.y = winsize.height - 70;
		this.addChild(drug, 2);
		var move = cc.moveTo(3, cc.p(drug.x, -30));
		//var scale=cc.repeatForever(cc.scaleBy(2,-1,1));
		//shits.runAction(scale);
		drug.runAction(move);
		this.count = drug;
		this.Sprites.push(this.count);
	},
	update: function() {
		this.addSprite();
		this.removeGold();

	},
	removeGold: function() {
		for (var i = 0; i < this.Sprites.length; i++) {

			if (0 >= this.Sprites[i].y) {
				//console.log("remove" + a + "次");
				//console.log("类型:" + this.Sprites[i].type);
				this.Sprites[i].removeFromParent();
				this.Sprites[i] = undefined;
				this.Sprites.splice(i, 1);
				i = i - 1;
				a = a + 1;
			}
		}
	},
	checkBounding: function() { //碰撞检测
		for (var i = 0; i < this.Sprites.length; i++) {
			var box1 = this.Sprites[i].getBoundingBox();
			var box2 = this.rectangle.getBoundingBoxToWorld();

			if (cc.rectIntersectsRect(box1, box2)) {
				cc.log("碰到了");

				if (this.Sprites[i].type == 1) {
					this.scroe = this.scroe + 2;
					this.title.setString(this.scroe);
				} else if (this.Sprites[i].type == 2) {
					this.scroe = this.scroe + 1;
					this.title.setString(this.scroe);
				} else if (this.Sprites[i].type == 3) {
					this.bear.speed = 100;
				} else if (this.Sprites[i].type == 4) {
					if (this.bear.direction == 0) {
						this.bear.runAction(this.explode);
					} else {
						this.bear.runAction(this.explode2);
					} //爆炸效果
					this.removeTouchEventListenser(); //移除监听
					this.unschedule(this.update);
					this.unschedule(this.timeOut);
					this.gameOver();
				} else if (this.Sprites[i].type == 5) {
					//错乱
					this.bear.flag = 1;
                
					this.addFlag();
				}
				this.Sprites[i].removeFromParent();
				this.Sprites[i] = undefined;
				this.Sprites.splice(i, 1);
				i = i - 1;
			}
		}
	},
	addFlag: function() {
		//增加错乱标志
		if (this.status1==null) {
			if (this.bear.direction == 0) {
				this.st1 = new cc.Sprite("#status.png");
				this.st1.x = this.bear.width;
				this.st1.y = this.bear.height,
				this.bear.addChild(this.st1, 2);
				this.status1=this.st1;

				this.st2 = new cc.Sprite("#status.png");
				this.st2.x = this.bear.width / 2 + 70;
				this.st2.y = this.bear.height + 30,
					this.bear.addChild(this.st2, 2);
					this.status2=this.st2;

				this.st3 = new cc.Sprite("#status.png");
				this.st3.x = this.bear.width / 2 - 10;
				this.st3.y = this.bear.height + 10,
					this.bear.addChild(this.st3, 2);
					this.status3=this.st3;
			} else {
				this.st1 = new cc.Sprite("#status.png");
				this.st1.x = 20;
				this.st1.y = this.bear.height,
				this.bear.addChild(this.st1, 2);
				this.status1=this.st1;

				this.st2 = new cc.Sprite("#status.png");
				this.st2.x = 70;
				this.st2.y = this.bear.height + 30,
				this.bear.addChild(this.st2, 2);
				this.status2=this.st2;

				this.st3 = new cc.Sprite("#status.png");
				this.st3.x = 100;
				this.st3.y = this.bear.height + 10,
				this.bear.addChild(this.st3, 2);
				this.status3=this.st3;
			}
		}
	},
	deleteFlag: function() {
		//增加错乱标志
		this.st1.removeFromParent();
		this.st2.removeFromParent();
		this.st3.removeFromParent();
		this.status1=null;
		this.status2=null;
		this.status3=null;
	},
	Check: function() {
		var that = this;
		//方向检测

		if (this.bear.direction == 1) {
			this.rectangle.x = 90;
			this.rectangle.y = 55;
		} else {
			this.rectangle.x = 15;
			this.rectangle.y = 50;
		}
		//速度检测
		if (this.bear.speed == 100) {
			//this.unschedule(this.speedCheck);
			setTimeout(function() {
				that.bear.speed = 200;
			}, 5000);
		}
		//状态监测
		if (this.bear.flag == 1) {
			//this.unschedule(this.speedCheck);
			setTimeout(function() {
				that.bear.flag = 0;
				that.deleteFlag();
				that.bear.addEventListener();
			}, 3000);
		}
	},
	//倒计时
	timeOut: function() {
		this.time = this.time - 1;
		this.timeLabel.setString(this.time + " 秒");
		var x = this.bar2.width / 60;
		this.bar2.x = this.bar2.x - x;
		if (this.time == 0) {
			//游戏结束
			this.unschedule(this.update);
			this.unschedule(this.timeOut);
			//			for (var i = 0; i < this.Sprites.length; i++) {
			//				this.Sprites[i].stopAction(move);
			//			}
			this.removeTouchEventListenser(); //移除监听
			this.gameOver();

		}
	},
	gameOver: function() {
		var winsize = cc.director.getWinSize();
		var gameOverLayer = new cc.LayerColor(cc.color(255, 255, 255, 0), 350, 200);
		gameOverLayer.x = (winsize.width - gameOverLayer.width) / 2;
		gameOverLayer.y = (winsize.height - gameOverLayer.height) / 2;
		this.addChild(gameOverLayer, 6);

		var overSprite = new cc.Sprite(over_png);
		overSprite.attr({
			x: gameOverLayer.width / 2,
			y: gameOverLayer.height / 2
		});
		gameOverLayer.addChild(overSprite, 1);

		var again = new cc.MenuItemImage("#again.png", "#again.png", function() {
			
			cc.director.runScene(new playScene());
		}, this);
		again.attr({
			x: -(gameOverLayer.width - overSprite.width) / 2-80 ,
			y: -10,
			scale:1.3
		});
		var gameover = new cc.MenuItemImage("#gameOver.png", "#gameOver.png", function() {
			
			cc.director.runScene(new startScene());
		}, this);
		gameover.attr({
			x: (gameOverLayer.width - overSprite.width) / 2+80 ,
			y: -10,
			scale:1.3
		});
		var overMenu = new cc.Menu(again, gameover);

		overMenu.y = 0;
		overMenu.x = gameOverLayer.width / 2;
		gameOverLayer.addChild(overMenu, 1);

		var text = new cc.LabelTTF("你已获得" + this.scroe + "分", "Times New Roman", 26);
		text.attr({
			x: overSprite.width / 2,
			y: overSprite.height / 2 + 30
		});
		text.setFontFillColor(cc.color(0, 0, 0));
		overSprite.addChild(text, 1);
          this.sendScore();
	},
	createExplode: function() { //爆炸效果动画
		var frames = [];
		for (var i = 1; i <= 2; i++) {
			var str = "00" + i + ".png"
				//cc.log(str);
			var frame = cc.spriteFrameCache.getSpriteFrame(str);
			frames.push(frame);
		}

		var animation = new cc.Animation(frames, 0.05);
		var action = new cc.Animate(animation);

		return action;
	},
	createAnotherExplode: function() { //爆炸效果动画
		var frames = [];
		for (var i = 1; i <= 2; i++) {
			var str = "00" + i + ".png"
				//cc.log(str);
			var frame = cc.spriteFrameCache.getSpriteFrame(str);
			frames.push(frame);
		}

		var animation = new cc.Animation(frames, 0.05);
		var action = new cc.Animate(animation);

		return action;
	},
	createAnotherExplode: function() { //爆炸效果动画
		var frames2 = [];
		for (var i = 3; i < 5; i++) {
			var str2 = "00" + i + ".png"
				//cc.log(str);
			var frame2 = cc.spriteFrameCache.getSpriteFrame(str2);
			frames2.push(frame2);
		}

		var animation2 = new cc.Animation(frames2, 0.05);
		var action2 = new cc.Animate(animation2);

		return action2;
	},
	removeTouchEventListenser: function() {
		cc.eventManager.removeListener(this.bear.touchListener);
	},
	sendScore: function() {
		var that = this;
		var args = getQueryStringArgs();
		//获取客户编号
		var client_id = args["client_id"];
		var url = "http://192.168.50.34:8320/hsbc_operate_jsonp/YX996635?client_id=" + client_id + "&game_id=6&game_score=" + this.scroe + "&callback=handleScore";
		var script = document.createElement('script');
		script.setAttribute('src', url);
		document.querySelector('head').appendChild(script);
	}

});

var playScene = cc.Scene.extend({
	onEnter: function() {
		this._super();
		var playlayer = new playLayer();
		this.addChild(playlayer);
	}
});