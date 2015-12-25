cc.game.onStart = function() {
	if (!cc.sys.isNative && document.getElementById("cocosLoading")) //If referenced loading.js, please remove it
		document.body.removeChild(document.getElementById("cocosLoading"));

	cc.view.setDesignResolutionSize(420, 747, cc.ResolutionPolicy.SHOW_ALL);
	cc.view.resizeWithBrowserSize(true);

	//load resources
	MyLoaderScene.preload(g_resources, function() {
		cc.director.runScene(new startScene());
		cc.spriteFrameCache.addSpriteFrames(running_plist);
		cc.spriteFrameCache.addSpriteFrames(image_plist);
		cc.spriteFrameCache.addSpriteFrames(explode_plist);
		cc.spriteFrameCache.addSpriteFrames(runRight_plist);
	}, this);
};
cc.game.run();