cc.game.onStart = function() {
	if (!cc.sys.isNative && document.getElementById("cocosLoading")) //If referenced loading.js, please remove it
		document.body.removeChild(document.getElementById("cocosLoading"));

	cc.view.setDesignResolutionSize(750, 1344, cc.ResolutionPolicy.FIXED_WIDTH);
	cc.view.resizeWithBrowserSize(true);

	//load resources
	cc.LoaderScene.preload(g_resources, function() {
		cc.director.runScene(new startScene());
		cc.spriteFrameCache.addSpriteFrames(running_plist);
		cc.spriteFrameCache.addSpriteFrames(image_plist);
		cc.spriteFrameCache.addSpriteFrames(explode_plist);
		cc.spriteFrameCache.addSpriteFrames(runRight_plist);
	}, this);
};
cc.game.run();