import { c as create_ssr_component, d as subscribe, e as escape, b as add_attribute } from './index3-e904a6bd.js';
import { p as page } from './stores-0905be6b.js';

let redirectTime = 1e4;
const Error = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let message;
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let language = "en";
  let timer = redirectTime / 1e3;
  message = $page.error?.message;
  $$unsubscribe_page();
  return `${$$result.head += `<!-- HEAD_svelte-3d09l3_START -->${$$result.title = `<title>404 / tomimi.dev</title>`, ""}<!-- HEAD_svelte-3d09l3_END -->`, ""}

<div class="bg-neutral-800 min-h-screen flex items-center"><div class="max-w-7xl mx-auto"><p class="text-center text-near-white">${message === "Not Found" ? `The page you requested could not be found` : `An unexpected error occured while loading the page. <br>
				If this error persists, please kindly inform me on discord xiiao#0613`}
			<br><br>
			You will be redirected to the homepage in ${escape(timer)} seconds...<br>
			If you are not redirected please click
			<a data-sveltekit-reload class="text-blue-500"${add_attribute("href", `/${language}`, 0)}>here</a></p></div></div>`;
});

export { Error as default };
//# sourceMappingURL=_error.svelte-259565ef.js.map
