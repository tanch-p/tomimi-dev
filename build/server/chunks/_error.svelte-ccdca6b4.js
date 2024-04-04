import { g as getContext, c as create_ssr_component, b as subscribe, e as escape, d as add_attribute } from './index3-41dea004.js';

const getStores = () => {
  const stores = getContext("__svelte__");
  return {
    /** @type {typeof page} */
    page: {
      subscribe: stores.page.subscribe
    },
    /** @type {typeof navigating} */
    navigating: {
      subscribe: stores.navigating.subscribe
    },
    /** @type {typeof updated} */
    updated: stores.updated
  };
};
const page = {
  subscribe(fn) {
    const store = getStores().page;
    return store.subscribe(fn);
  }
};

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
//# sourceMappingURL=_error.svelte-ccdca6b4.js.map
