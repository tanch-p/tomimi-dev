export function clickOutside(callback) {
	return (node) => {
		const handleClick = (event) => {
			if (!node.contains(event.target)) {
				callback(event);
			}
		};

		document.addEventListener('click', handleClick, true);
		return () => document.removeEventListener('click', handleClick, true);
	};
}
