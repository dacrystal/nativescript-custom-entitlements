var fs = require('fs-extra');
var path = require('path');

module.exports = function (logger, platformsData, projectData, hookArgs) {
	var platform = hookArgs.platform.toLowerCase(),
		appResourcesDirectoryPath = projectData.appResourcesDirectoryPath,
		entitlementsFile = path.join(appResourcesDirectoryPath, "iOS", "app.entitlements"),
		projectRoot = path.join(projectData.platformsDir, "ios"),
		project = path.join(projectRoot, projectData.projectName);

	return new Promise(function (resolve, reject) {
		if (platform == 'ios') {
			fs.exists(entitlementsFile, function (exists) {
				if (!exists) return reject(Error("entitlementsFile: `" + entitlementsFile + "` not found"));
				var dest = path.join(project, projectData.projectName + ".entitlements");
				fs.copy(entitlementsFile, dest, function (error) {
					if (error) return reject(error);
					resolve();
				});
			})
		} else {
			resolve();
		}
	});
};
