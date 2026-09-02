export function round(value, decimalPoints = 2) {
	const multiplier = 10 ** decimalPoints;
	return Math.round(value * multiplier) / multiplier;
}

export function convertToOrdinal(number: number) {
	const lastDigit = number % 10;
	const lastTwoDigits = number % 100;

	if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
		return number + 'th';
	}

	switch (lastDigit) {
		case 1:
			return number + 'st';
		case 2:
			return number + 'nd';
		case 3:
			return number + 'rd';
		default:
			return number + 'th';
	}
}
