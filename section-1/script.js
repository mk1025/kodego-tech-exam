const musicSlider = document.getElementById("musicSlider");
const currentDurationText = document.getElementById("currentDuration");
const musicPlayButton = document.getElementById("musicPlayButton");
const musicPlayIcon = document.getElementById("musicPlaySymbol");
const musicPauseIcon = document.getElementById("musicPauseSymbol");
const musicRecord = document.getElementById("musicRecordImage");

const musicBackButton = document.getElementById("musicBackButton");
const musicForwardButton = document.getElementById("musicForwardButton");

const musicDuration = musicSlider.getAttribute("max");

let musicPlay = false;

musicPlayButton.addEventListener("click", () => {
	musicPlay = !musicPlay;
});

musicBackButton.addEventListener("click", () => {
	musicSlider.value -= 10;
});

musicForwardButton.addEventListener("click", () => {
	musicSlider.value += 10;
});

setInterval(() => {
	musicPlay && musicSlider.value !== musicDuration && musicSlider.value++;

	if (musicPlay) {
		musicPlayIcon.classList.add("hidden");
		musicPauseIcon.classList.remove("hidden");
		musicRecord.classList.add("animate-spin");
	} else {
		musicPlayIcon.classList.remove("hidden");
		musicPauseIcon.classList.add("hidden");
		musicRecord.classList.remove("animate-spin");
	}

	if (musicSlider.value === musicDuration) {
		musicRecord.classList.remove("animate-spin");
		musicPlayIcon.classList.remove("hidden");
		musicPauseIcon.classList.add("hidden");
	}

	currentDurationText.textContent = timeConverter(musicSlider.value);
}, 1000);

function timeConverter(time) {
	const minutes = Math.floor(time / 60);
	const seconds = time % 60;

	return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}
