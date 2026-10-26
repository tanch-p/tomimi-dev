import { i as index_server_exports } from './index-server.js-CQUybXDs.js';
import './shared.js-DJ6K7m7R.js';
import './internal.js-Cwhf_yuY.js';
import './exports.js-CL6EJklP.js';
import { n as noop } from './server2.js-B_Tmw9i4.js';
import './utils.js-DJOK34TW.js';

var is_legacy = noop.toString().includes("$$") || /function \w+\(\) \{\}/.test(noop.toString());
var placeholder_url = "a:";
if (is_legacy) {
	({
		data: {},
		form: null,
		error: null,
		params: {},
		route: { id: null },
		state: {},
		status: -1,
		url: new URL(placeholder_url)
	});
} else {
	new class Page {
		data = {};
		form = null;
		error = null;
		params = {};
		route = { id: null };
		state = {};
		status = -1;
		url = new URL(placeholder_url);
	}();
}
//#endregion
//#region node_modules/.pnpm/@sveltejs+kit@2.70.3_@sveltejs+vite-plugin-svelte@7.3.0_svelte@5.57.1_@typescript-eslin_a29561b2c2b75d86c8b0ea94fa9bac5b/node_modules/@sveltejs/kit/src/runtime/client/client.js
/** @import { RemoteFunctionDataNode, ServerNodesResponse, ServerRedirectNode } from 'types' */
/** @import { CacheEntry } from './remote-functions/cache.svelte.js' */
/** @import { Query } from './remote-functions/query/instance.svelte.js' */
/** @import { LiveQuery } from './remote-functions/query-live/instance.svelte.js' */
var { onMount, tick } = index_server_exports;
//# sourceMappingURL=client.js-Dw0Ex48b.js.map
