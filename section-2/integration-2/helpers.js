export function timeConverter(milliseconds) {
	const seconds = Math.floor(milliseconds / 1000);
	const minutes = Math.floor(seconds / 60);
	const remainingSeconds = seconds % 60;

	return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
}
