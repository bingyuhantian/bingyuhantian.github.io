/**
 *
 * @authors Administrator (you@example.org)
 * @date    2015/11/3 16:37
 * @version $ IIFE
 */

/* name module */

'use strict';

/* do something */

var MyLoaderScene = cc.Scene.extend({
    _winSize: null,
    _interval : null,
    _length : 0,
    _count : 0,
    _label : null,
    _className:"MyLoaderScene",
    init: function(){
        var self = this;
        this._winSize = cc.director.getWinSize();

        // bg
        var bgLayer = self._bgLayer = cc.LayerColor.create(cc.color('#04283c'));
        bgLayer.opacity = 150;
        bgLayer.setPosition(cc.visibleRect.bottomLeft);
        self.addChild(bgLayer, 1);

        //bee
        var bee = new cc.Sprite(loading_bee_png);
        bee.attr({
            x: this._winSize.width / 2,
            y: this._winSize.height / 2 + 100,
            scale: .7
        });
        this.addChild(bee, 1);
        var action = cc.rotateBy(3.5, -360);
        bee.runAction(cc.sequence(action).repeatForever());

        // bear
        var bear = new cc.Sprite(loading_bear_png);
        bear.attr({
            x: this._winSize.width / 2,
            y: this._winSize.height / 2 + 100,
            scale: .3
        });
        this.addChild(bear, 1);

        var eyescoketL = new cc.Sprite(eyesocket_png);
        eyescoketL.attr({
            x: 455,
            y: 480,
            scale: 1
        });
        bear.addChild(eyescoketL, 2);

        var eyescoketR = new cc.Sprite(eyesocket_png);
        eyescoketR.attr({
            x: 705,
            y: 480,
            scale: 1
        });
        bear.addChild(eyescoketR, 2);

        var eyeballL = new cc.Sprite(eyeball_png);
        eyeballL.attr({
            x: 65,
            y: 45,
            scale: 1.4
        });
        eyescoketL.addChild(eyeballL, 3);

        var eyeballR = new cc.Sprite(eyeball_png);
        eyeballR.attr({
            x: 65,
            y: 45,
            scale: 1.4
        });
        eyescoketR.addChild(eyeballR, 3);

        eyescoketL.runAction(cc.sequence(action.clone()).repeatForever());
        eyescoketR.runAction(cc.sequence(action.clone()).repeatForever());

        //loading percent
        var label = this._label = cc.LabelTTF.create("玩命加载中... 0%", "Arial", 26);
        label.attr({
            x: this._winSize.width / 2,
            y: this._winSize.height / 2 - 150,
            color: cc.color(180,180,180)
        });

        this.addChild(this._label, 1);
        var action1 = cc.fadeIn(1);
        this._label.runAction(cc.sequence(action1).repeatForever());

        return true;
    },

    _initStage: function (img, centerPos) {
        var self = this;
        var texture2d = self._texture2d = new cc.Texture2D();
        texture2d.initWithElement(img);
        texture2d.handleLoadedTexture();
        var logo = self._logo = cc.Sprite.create(texture2d);
        logo.setScale(cc.contentScaleFactor());
        logo.x = centerPos.x;
        logo.y = centerPos.y;
        self._bgLayer.addChild(logo, 10);
    },

    onEnter: function () {
        var self = this;
        cc.Node.prototype.onEnter.call(self);
        self.schedule(self._startLoading, 0.3);
    },

    onExit: function () {
        cc.Node.prototype.onExit.call(this);
        var tmpStr = "玩命加载中... 0%";
        this._label.setString(tmpStr);
    },

    /**
          * init with resources
          * @param {Array} resources
          * @param {Function|String} cb
          */
    initWithResources: function (resources, cb) {
        if(typeof resources == "string") resources = [resources];
        this.resources = resources || [];
        this.cb = cb;
    },

    _startLoading: function () {
        var self = this;
        self.unschedule(self._startLoading);
        var res = self.resources;
        self._length = res.length;
        self._count = 0;
        cc.loader.load(res, function(result, count){ self._count = count; }, function(){
            if(self.cb)
                self.cb();
        });
        self.schedule(self._updatePercent);
    },

    _updatePercent: function () {
        var self = this;
        var count = self._count;
        var length = self._length;
        var percent = (count / length * 100) | 0;
        percent = Math.min(percent, 100);
        self._label.setString("玩命加载中... " + percent + "%");
        if(count >= length) self.unschedule(self._updatePercent);
    }
});
MyLoaderScene.preload = function(resources, cb){
    var _myLoaderScene = null;
    if(!_myLoaderScene) {
        _myLoaderScene = new MyLoaderScene();
        _myLoaderScene.init();
    }
    _myLoaderScene.initWithResources(resources, cb);

    cc.director.runScene(_myLoaderScene);
    return _myLoaderScene;
};