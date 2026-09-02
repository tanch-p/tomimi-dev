import { browser } from '$app/environment';
import { cookiesEnabled } from '../../routes/stores';

export function setLocalStorage(key, value) {
	if (browser && cookiesEnabled) {
		localStorage.setItem(key, value);
	}
}
