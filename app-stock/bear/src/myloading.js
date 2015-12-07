MyLoader = cc.Scene.extend({  
    _logo: null,  
    _logoTexture: null,  
    _texture2d: null,  
    _bgLayer: null,  
    _label: null,  
    _winSize:null,  
    _processLayer: null,  
    _processLayerLength: null,  
  
  
    /** 
     * Constructor 
     */  
    ctor: function () {  
        this._super();  
        this._winSize = cc.Director.getInstance().getWinSize();  
    },  
    init:function(){  
        cc.Scene.prototype.init.call(this);  
  
  
        //logo  
        var logoHeight = 200;  
        var centerPos = cc.p(this._winSize.width / 2, this._winSize.height *0.55);  
  
  
        this._logoTexture = new Image();  
        var _this = this;  
        this._logoTexture.addEventListener("load", function () {  
            _this._initStage(centerPos);  
        });  
        this._logoTexture.src = logoData;  
        this._logoTexture.width = 300;  
        this._logoTexture.height = 164;  
  
  
        // bg  
        this._bgLayer = cc.LayerColor.create(cc.c4(32, 32, 32, 255));  
        this._bgLayer.setPosition(cc.p(0, 0));  
        this.addChild(this._bgLayer, 0);  
  
        //文字  
        var mylabel = cc.LabelTTF.create("玩命加载中...", "微软雅黑", 20);  
        mylabel.setColor(cc.c3(180, 180, 180));  
        mylabel.setPosition(cc.p(this._winSize.width / 2, this._winSize.height *0.32));  
        this.addChild(mylabel);  
  
  
        //loading percent  
        this._label = cc.LabelTTF.create("Loading... 0%", "Consolas", 20);  
        this._label.setColor(cc.c3(180, 180, 180));  
        this._label.setOpacity(0);  
        // this._label.setPosition(cc.pAdd(centerPos, cc.p(0, -logoHeight / 2 - 10)));  
        this._label.setPosition(cc.pAdd(centerPos, cc.p(0, -logoHeight / 2 - 100)));  
        this._bgLayer.addChild(this._label, 10);  
  
  
        //进度条  
        this._processLayerLength = 500;  
        this._processLayer = cc.LayerColor.create(cc.c4b(255, 255, 0, 255), 1, 20);  
        this._processLayer.setPosition(cc.pAdd(centerPos, cc.p(- this._processLayerLength / 2, -logoHeight / 2 - 50)));  
        // this._processLayer.ignoreAnchorPointForPosition(false);  
        // this._processLayer.setAnchorPoint(cc.p(0, 0));  
        this._bgLayer.addChild(this._processLayer);  
    },  
  
  
    _initStage: function (centerPos) {  
        if (cc.renderContextType === cc.CANVAS) {  
            this._logo = cc.Sprite.createWithTexture(this._logoTexture);  
        } else {  
            this._texture2d = new cc.Texture2D();  
            this._texture2d.initWithElement(this._logoTexture);  
            this._texture2d.handleLoadedTexture();  
            this._logo = cc.Sprite.createWithTexture(this._texture2d);  
        }  
        this._logo.setPosition(centerPos);  
        this._bgLayer.addChild(this._logo, 10);  
  
  
        //load resources  
        this._logoFadeIn();  
    },  
  
  
    onEnter: function () {  
        cc.Node.prototype.onEnter.call(this);  
        this.schedule(this._startLoading, 0.3);  
    },  
  
  
    onExit: function () {  
        cc.Node.prototype.onExit.call(this);  
        var tmpStr = "Loading... 0%";  
        this._label.setString(tmpStr);  
    },  
  
  
    /** 
     * init with resources 
     */  
    initWithResources: function (resources, selector, target) {  
        this.resources = resources;  
        this.selector = selector;  
        this.target = target;  
    },  
  
  
    _startLoading: function () {  
        this.unschedule(this._startLoading);  
        cc.Loader.preload(this.resources, this.selector, this.target);  
        this.schedule(this._updatePercent);  
    },  
  
  
    _logoFadeIn: function () {  
        var logoAction = cc.Spawn.create(  
            cc.EaseBounce.create(cc.MoveBy.create(0.25, cc.p(0, 10))),  
            cc.FadeIn.create(0.5));  
  
  
        var labelAction = cc.Sequence.create(  
            cc.DelayTime.create(0.15),  
            logoAction.clone());  
  
  
        this._logo.runAction(logoAction);  
        this._label.runAction(labelAction);  
    },  
  
  
    _updatePercent: function () {  
        var percent = cc.Loader.getInstance().getPercentage();  
        var tmpStr = "Loading... " + percent + "%";  
        this._label.setString(tmpStr);  
  
  
        this._processLayer.changeWidth(this._processLayerLength * percent / 100);  
  
  
        if (percent >= 100)  
            this.unschedule(this._updatePercent);  
    }  
});  
  
  
MyLoader.preload = function (resources, selector, target) {  
    if (!this._instance) {  
        this._instance = new MyLoader();  
        this._instance.init();  
    }  
    this._instance.initWithResources(resources, selector, target);  
  
  
    var director = cc.Director.getInstance();  
    if (director.getRunningScene()) {  
        director.replaceScene(this._instance);  
  
  
    } else {  
        director.runWithScene(this._instance);  
    }  
  
  
    return this._instance;  
};  