const debounce = (fn, wait = 1000) => {
	let timeout = null;
	return () => {
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			fn.apply(this, arguments);
		}, wait);
	};
}
export {
	debounce
}
