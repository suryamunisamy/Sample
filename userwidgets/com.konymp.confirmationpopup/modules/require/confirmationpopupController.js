/*
#
#  Created by Team Kony.
#  Copyright (c) 2017 Kony Inc. All rights reserved.
#
*/
define(function() {

	return {
		constructor: function(baseConfig, layoutConfig, pspConfig) {
			var analytics=require("com/konymp/"+"confirmationpopup"+"/analytics");
            analytics.notifyAnalytics();

		},
		//Logic for getters/setters of custom properties
		initGettersSetters: function() {

		}
	};
});