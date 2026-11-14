import { n as noop, ad as safe_not_equal } from './server2.js-B_Tmw9i4.js';

//#region node_modules/.pnpm/svelte@5.57.1_@typescript-eslint+types@8.70.0/node_modules/svelte/src/store/shared/index.js
/** @import { Readable, StartStopNotifier, Subscriber, Unsubscriber, Updater, Writable } from '../public.js' */
/** @import { Stores, StoresValues, SubscribeInvalidateTuple } from '../private.js' */
/**
* @type {Array<SubscribeInvalidateTuple<any> | any>}
*/
var subscriber_queue = [];
/**
* Creates a `Readable` store that allows reading by subscription.
*
* @template T
* @param {T} [value] initial value
* @param {StartStopNotifier<T>} [start]
* @returns {Readable<T>}
*/
function readable(value, start) {
	return { subscribe: writable(value, start).subscribe };
}
/**
* Create a `Writable` store that allows both updating and reading by subscription.
*
* @template T
* @param {T} [value] initial value
* @param {StartStopNotifier<T>} [start]
* @returns {Writable<T>}
*/
function writable(value, start = noop) {
	/** @type {Unsubscriber | null} */
	let stop = null;
	/** @type {Set<SubscribeInvalidateTuple<T>>} */
	const subscribers = /* @__PURE__ */ new Set();
	/**
	* @param {T} new_value
	* @returns {void}
	*/
	function set(new_value) {
		if (safe_not_equal(value, new_value)) {
			value = new_value;
			if (stop) {
				const run_queue = !subscriber_queue.length;
				for (const subscriber of subscribers) {
					subscriber[1]();
					subscriber_queue.push(subscriber, value);
				}
				if (run_queue) {
					for (let i = 0; i < subscriber_queue.length; i += 2) subscriber_queue[i][0](subscriber_queue[i + 1]);
					subscriber_queue.length = 0;
				}
			}
		}
	}
	/**
	* @param {Updater<T>} fn
	* @returns {void}
	*/
	function update(fn) {
		set(fn(value));
	}
	/**
	* @param {Subscriber<T>} run
	* @param {() => void} [invalidate]
	* @returns {Unsubscriber}
	*/
	function subscribe(run, invalidate = noop) {
		/** @type {SubscribeInvalidateTuple<T>} */
		const subscriber = [run, invalidate];
		subscribers.add(subscriber);
		if (subscribers.size === 1) stop = start(set, update) || noop;
		run(value);
		return () => {
			subscribers.delete(subscriber);
			if (subscribers.size === 0 && stop) {
				stop();
				stop = null;
			}
		};
	}
	return {
		set,
		update,
		subscribe
	};
}

export { readable as r, writable as w };
//# sourceMappingURL=index-server2.js-l5GSv6WQ.js.map
