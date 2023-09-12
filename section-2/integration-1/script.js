// This thing won't probably work in some browsers.
import { API_KEY } from "./env.js";

import { timeConverter } from "./helpers.js";

const musicSlider = document.getElementById("musicSlider");
const currentDurationText = document.getElementById("currentDuration");
const musicPlayButton = document.getElementById("musicPlayButton");
const musicPlayIcon = document.getElementById("musicPlaySymbol");
const musicPauseIcon = document.getElementById("musicPauseSymbol");
const musicRecord = document.getElementById("musicRecordImage");
const musicBackButton = document.getElementById("musicBackButton");
const musicForwardButton = document.getElementById("musicForwardButton");
const musicDuration = musicSlider.getAttribute("max");
const lyricsContent = document.getElementById("lyricsContent");

let musicPlay = false;

document.body.addEventListener("DOMContentLoaded", fetchLyrics(7076626));

musicPlayButton.addEventListener("click", () => {
	musicPlay = !musicPlay;
});

musicBackButton.addEventListener("click", () => {
	musicSlider.value = 0;
});

musicForwardButton.addEventListener("click", () => {
	musicSlider.value = musicDuration;
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

async function fetchLyrics(id) {
	const url = `https://genius-song-lyrics1.p.rapidapi.com/song/lyrics/?id=${id}`;

	const options = {
		method: "GET",
		headers: {
			"X-RapidAPI-Key": API_KEY,
			"X-RapidAPI-Host": "genius-song-lyrics1.p.rapidapi.com",
		},
	};

	try {
		const response = await fetch(url, options);
		const result = await response.json();
		console.log(result);
		lyricsContent.innerHTML = result.lyrics.lyrics.body.html;
	} catch (error) {
		console.error(error);
	}
}
