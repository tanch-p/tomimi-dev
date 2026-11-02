//#region node_modules/.pnpm/@sveltejs+kit@2.70.3_@sveltejs+vite-plugin-svelte@7.3.0_svelte@5.57.1_@typescript-eslin_a29561b2c2b75d86c8b0ea94fa9bac5b/node_modules/@sveltejs/kit/src/runtime/app/paths/internal/server.js
var base = "";
var assets = base;
var app_dir = "_app";
var initial = {
	base,
	assets
};
/**
* @param {{ base: string, assets: string }} paths
*/
function override(paths) {
	base = paths.base;
	assets = paths.assets;
}
function reset() {
	base = initial.base;
	assets = initial.assets;
}

export { assets as a, base as b, app_dir as c, override as o, reset as r };
//# sourceMappingURL=server.js-CiRuyiG1.js.map
