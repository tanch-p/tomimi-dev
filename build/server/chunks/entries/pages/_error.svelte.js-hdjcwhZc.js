import { ai as head, aj as escape_html, ae as attr } from '../../chunks/server2.js-B_Tmw9i4.js';
import '../../chunks/client.js-Dw0Ex48b.js';
import { p as page } from '../../chunks/state.js-dCGu2SgD.js';
import '../../chunks/uneval.js-C7SIrMEV.js';
import '../../chunks/index-server.js-CQUybXDs.js';
import '../../chunks/shared.js-DJ6K7m7R.js';
import '../../chunks/internal.js-Cwhf_yuY.js';
import '../../chunks/exports.js-CL6EJklP.js';
import '../../chunks/utils.js-DJOK34TW.js';

//#region src/routes/+error.svelte
function _error($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let language = "en";
		const message = page.error?.message;
		const infoText = {
			zh: "如果无法访问关卡页面，请尝试更新浏览器或使用其他浏览器，如Firefox/Chrome。",
			ja: "このエラーが続く場合は、ブラウザを更新するか、Firefox/Chromeなどの別のブラウザをお試しください。",
			en: "If this error persists, please kindly try updating your browser or another browser like Firefox/Chrome or inform me on discord xiiao#0613"
		};
		head("1j96wlh", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>404 / tomimi.dev</title>`);
			});
		});
		$$renderer.push(`<div class="bg-neutral-800 min-h-screen flex items-center"><div class="max-w-7xl mx-auto"><p class="text-center text-near-white px-4">`);
		if (message === "Not Found") $$renderer.push(`<!--[0-->The page you requested could not be found`);
		else $$renderer.push(`<!--[-1-->An unexpected error occured while loading the page.`);
		$$renderer.push(`<!--]--> <br/><br/> ${escape_html(infoText[language])} <br/><br/> You will be redirected to the homepage in 10 seconds...<br/> If you are not redirected please click <a data-sveltekit-reload="" class="text-blue-500"${attr("href", `/${language}`)}>here</a></p></div></div>`);
	});
}

export { _error as default };
//# sourceMappingURL=_error.svelte.js-hdjcwhZc.js.map
