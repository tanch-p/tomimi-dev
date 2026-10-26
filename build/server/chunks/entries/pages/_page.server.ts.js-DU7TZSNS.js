import { y as redirect } from '../../chunks/utils.js-DJOK34TW.js';

//#region src/routes/+page.server.ts
var load = (async ({ request }) => {
	let language = "en";
	const userAgent = request.headers.get("user-agent");
	if (!userAgent) redirect(308, `/en`);
	else if (userAgent.toLowerCase().includes("baidu")) redirect(308, `/zh`);
	else if (userAgent.toLowerCase().includes("bot")) redirect(308, "/en");
	const acceptLanguage = request.headers.get("accept-language")?.split(",")[0];
	if (!acceptLanguage) redirect(307, `/en`);
	if (acceptLanguage.match(/ja|ja/i)) language = "ja";
	else if (acceptLanguage.includes("zh")) language = "zh";
	redirect(307, `/${language}`);
});

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	load: load
});

export { _page_server_ts as _ };
//# sourceMappingURL=_page.server.ts.js-DU7TZSNS.js.map
