var startLayer = cc.Layer.extend({
	touchListener:null,
	rankTouch:null,//排行
	ruleTouch:null,//规则
	ctor: function() {
		this._super();
		this.init();
		this.addTouchEventListenser();
	},
	init: function() {
		var winSize = cc.director.getWinSize();
		var bgSprite = new cc.Sprite(startBackground);
		bgSprite.attr({
			x: winSize.width / 2,
			y: winSize.height / 2
		});
		this.addChild(bgSprite, 0);

		var startItem = new cc.MenuItemImage("#start.png", "#start.png", function() {
			//cc.log("clicked");
			cc.director.runScene(new playScene());
		}, this);
		//		startItem.attr({
		//			x: winSize.width / 2,
		//			y: winSize.height / 2
		//		});

		var menu = new cc.Menu(startItem);
		menu.attr({
			x: winSize.width / 2,
			y: winSize.height / 2
		});
		this.addChild(menu, 1);
		
		this.ruleTouch=new cc.Sprite("#rule.png");//规则
		this.ruleTouch.attr({
			x:winSize.width-250,
			y:80
		});
		this.addChild(this.ruleTouch,3);
		
		
		this.rankTouch=new cc.Sprite("#ranking.png");//排行
		this.rankTouch.attr({
			x:winSize.width-100,
			y:80
		});
		this.addChild(this.rankTouch,3);
		
		//this.showRule();
      //  this.showRanking();
	},
	showRule:function(){
		var ruleLayer=new cc.LayerColor(cc.color(255,255,255,0));
		
		this.addChild(ruleLayer,4);
		
		
		var size=cc.director.getWinSize();
		  ruleLayer.x=(size.width-ruleLayer.width)/2;
		  ruleLayer.y=(size.height-ruleLayer.height)/2-100;


		var rule=new cc.Sprite(ruleText);
		rule.attr({
			x:ruleLayer.width/2,
			y:ruleLayer.height/2
		});
		ruleLayer.addChild(rule,1);
			//rule.opacity=0;
		var close1=new cc.MenuItemImage("#close.png","#close.png",function(){
			
			ruleLayer.removeFromParent();
		
		},this);
		var menu2=new cc.Menu(close1);
		 menu2.attr({
			x:(size.width+rule.width)/2-10,
			y:(size.height+rule.height)/2-10
		});
	    ruleLayer.addChild(menu2,1);
		
//		var touchListener1 = cc.EventListener.create({
//			event: cc.EventListener.TOUCH_ONE_BY_ONE,
//			// When "swallow touches" is true, then returning 'true' from the onTouchBegan method will "swallow" the touch event, preventing other listeners from using it.
//			swallowTouches: true,
//			//onTouchBegan event callback function                      
//			onTouchBegan: function(touch, event) {
//				var pos = touch.getLocation();
//				var target = event.getCurrentTarget();
//			     console.log(close1);
//				if (cc.rectContainsPoint(close1.getBoundingBox(), pos)) {
//					
//                
//					cc.log("touched")
//					return true;
//				}
//
//
//				return false;
//			}
//
//		});
//		cc.eventManager.addListener(touchListener1, ruleLayer);
	
	},
	showRanking:function(){
		var rankLayer=new cc.LayerColor(cc.color(255,255,255,0));
		this.addChild(rankLayer,4);
		var size=cc.director.getWinSize();
		  rankLayer.x=(size.width-rankLayer.width)/2;
		  rankLayer.y=(size.height-rankLayer.height)/2-100;
		  
		var rank=new cc.Sprite(rank_png);
		   rank.x=rankLayer.width/2;
		   rank.y=rankLayer.height/2;
		   rankLayer.addChild(rank,1);
		   
		
		
		var close2=new cc.MenuItemImage("#close.png","#close.png",function(){
			
			rankLayer.removeFromParent();
		
		},this);
		var menu3=new cc.Menu(close2);
		 menu3.attr({
			x:(size.width+rank.width)/2-10,
			y:(size.height+rank.height)/2-10
		});
	    rankLayer.addChild(menu3,1);
	},
	addTouchEventListenser: function() {
		var that=this;
		this.touchListener = cc.EventListener.create({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			// When "swallow touches" is true, then returning 'true' from the onTouchBegan method will "swallow" the touch event, preventing other listeners from using it.
			swallowTouches: true,
			//onTouchBegan event callback function                      
			onTouchBegan: function(touch, event) {
				var pos = touch.getLocation();
				var target = event.getCurrentTarget();
				var box1=that.ruleTouch;
				var box2=that.rankTouch;
				if (cc.rectContainsPoint(box1.getBoundingBox(), pos)) {
					
                   that.showRule();
					cc.log("touched")
					return true;
				}
				if(cc.rectContainsPoint(box2.getBoundingBox(), pos)){
					 that.showRanking();
					cc.log("touched")
					return true;
				}

				return false;
			}

		});
		cc.eventManager.addListener(this.touchListener, this);
	}

});

var startScene = cc.Scene.extend({
	onEnter: function() {
		this._super();
		var startlayer = new startLayer();
		this.addChild(startlayer);
	}
});