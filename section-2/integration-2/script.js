"use strict";

// This imports won't probably work in some browsers.
import { API_KEY, CONSOLE_LOG } from "./env.js";

import { timeConverter } from "./helpers.js";

// Music Buttons (Elements)
const musicPlayButton = document.getElementById("musicPlayButton");
const musicPlayIcon = document.getElementById("musicPlaySymbol");
const musicPauseIcon = document.getElementById("musicPauseSymbol");
const musicRecord = document.getElementById("musicRecordImage");
const musicBackButton = document.getElementById("musicBackButton");
const musicForwardButton = document.getElementById("musicForwardButton");

// Music Slider
const musicSlider = document.getElementById("musicSlider");
const currentDurationText = document.getElementById("currentDuration");
const maxDurationText = document.getElementById("maxDuration");

// Panel Buttons
const panelButtons = document.getElementById("panelButtons");
const lyricsButton = document.getElementById("lyricsButton");
const albumsButton = document.getElementById("albumsButton");
const relatedArtistsButton = document.getElementById("relatedArtistsButton");

// Song Displa
const songImage = document.getElementById("songImage");
const songName = document.getElementById("songName");
const artistName = document.getElementById("artistName");

// Panels
const lyricsContent = document.getElementById("lyricsContent");
const albumsContent = document.getElementById("albumsContent");
const relatedArtistsContent = document.getElementById("relatedArtistsContent");

// Data
let artistID_GENIUS = 7076626;
let artistID_SPOTIFY = "06HL4z0CvFAxyc27GXpf02";
let albumTracks = [];
let albumCount = 0;
let albumCoverURL = "";

// Music
let musicPlay = false;

document.body.addEventListener("DOMContentLoaded", fetchAlbums(artistID_SPOTIFY));

// Music Buttons
musicPlayButton.addEventListener("click", () => {
	musicPlay = !musicPlay;
});

musicBackButton.addEventListener("click", () => {
	musicSlider.value = 0;
	switchSong("prev");
});

musicForwardButton.addEventListener("click", () => {
	switchSong("next");
});

setInterval(() => {
	let maxDuration = musicSlider.max;

	if (musicPlay && musicSlider.value !== maxDuration) {
		musicSlider.value = Number(musicSlider.value) + 1000;
	}

	if (musicPlay) {
		musicPlayIcon.classList.add("hidden");
		musicPauseIcon.classList.remove("hidden");
		musicRecord.classList.add("animate-spin");
	} else {
		musicPlayIcon.classList.remove("hidden");
		musicPauseIcon.classList.add("hidden");
		musicRecord.classList.remove("animate-spin");
	}

	if (musicSlider.value === maxDuration) {
		musicRecord.classList.remove("animate-spin");
		musicPlayIcon.classList.remove("hidden");
		musicPauseIcon.classList.add("hidden");
	}

	currentDurationText.textContent = timeConverter(musicSlider.value);
	maxDurationText.textContent = timeConverter(maxDuration);

	let lyricsContent = document.getElementById("lyricsContent");
	lyricsContent.querySelectorAll("p[data-syncType]:not([data-syncType='UNSYNCED'])").forEach((p) => {
		p.classList.remove("text-gray-100");
		p.classList.add("text-gray-400");

		if (Number(p.getAttribute("data-startTimeMs")) === musicSlider.value) {
			p.classList.remove("text-gray-400");
			p.classList.add("text-gray-100");
		}
	});
}, 1000);

// PANEL CHANGE
lyricsButton.addEventListener("click", (e) => {
	switchPanel("lyricsContent", e.target.id);
});
albumsButton.addEventListener("click", (e) => {
	switchPanel("albumsContent", e.target.id);
});
relatedArtistsButton.addEventListener("click", (e) => {
	switchPanel("relatedArtistsContent", e.target.id);
	fetchRelatedArtists(artistID_SPOTIFY);
});

function switchPanel(panel, button) {
	const panelList = document.getElementById("panelList").children;
	const panelButtonList = panelButtons.children;

	for (let element of panelList) {
		element.classList.add("hidden");
		if (element.id === panel) {
			element.classList.remove("hidden");
		}
	}

	for (let element of panelButtonList) {
		element.classList.remove("text-gray-100");
		if (element.id === button) {
			element.classList.add("text-gray-100");
		}
	}
}

// Song Display
function setSongDisplay(name, artist, image, max) {
	songImage.src = image;
	songName.textContent = name;
	artistName.textContent = artist;
	musicSlider.max = max;
}

function switchSong(action) {
	musicSlider.value = 0;
	if (action === "next" && albumCount < albumTracks.length - 1) {
		albumCount++;
	} else if (action === "prev" && albumCount > 0) {
		albumCount--;
	}

	let artists = albumTracks[albumCount].track.artists.items;

	artists = artists.map((artist) => artist.profile.name);

	setSongDisplay(
		albumTracks[albumCount].track.name,
		artists.join(", "),
		albumCoverURL,
		albumTracks[albumCount].track.duration.totalMilliseconds,
	);

	fetchLyrics(albumTracks[albumCount].track.uri.split(":")[2]);
}

// APIs
async function fetchAlbums(id) {
	const url = `https://spotify23.p.rapidapi.com/artist_albums/?id=${id}&offset=0&limit=100`;
	const options = {
		method: "GET",
		headers: {
			"X-RapidAPI-Key": API_KEY,
			"X-RapidAPI-Host": "spotify23.p.rapidapi.com",
		},
	};

	try {
		const response = await fetch(url, options);
		const result = await response.json();
		CONSOLE_LOG && console.log("Albums Result: ", result);
		populateAlbumList(result.data.artist.discography.albums.items);
	} catch (error) {
		CONSOLE_LOG && console.error(error);
		albumsContent.innerHTML = "No albums available...";
	}
}

async function fetchRelatedArtists(id) {
	const url = `https://spotify23.p.rapidapi.com/artist_related/?id=${id}`;
	const options = {
		method: "GET",
		headers: {
			"X-RapidAPI-Key": API_KEY,
			"X-RapidAPI-Host": "spotify23.p.rapidapi.com",
		},
	};

	try {
		const response = await fetch(url, options);
		const result = await response.json();
		CONSOLE_LOG && console.log("Fetch Related Artists Result: ", result.artists);
		populateArtistsList(result.artists);
	} catch (error) {
		CONSOLE_LOG && console.error(error);
		relatedArtistsContent.innerHTML = "No related artists available...";
	}
}

async function fetchAlbumTracks(id) {
	const url = `https://spotify23.p.rapidapi.com/album_tracks/?id=${id}&offset=0&limit=300`;
	const options = {
		method: "GET",
		headers: {
			"X-RapidAPI-Key": API_KEY,
			"X-RapidAPI-Host": "spotify23.p.rapidapi.com",
		},
	};

	try {
		const response = await fetch(url, options);
		const result = await response.json();
		CONSOLE_LOG && console.log("Album Tracks Result: ", result);
		albumTracks = result.data.album.tracks.items;
		albumCount = -1;
		switchSong("next");
	} catch (error) {
		CONSOLE_LOG && console.error(error);
	}
}

async function fetchLyrics(id) {
	const url = `https://spotify23.p.rapidapi.com/track_lyrics/?id=${id}`;
	const options = {
		method: "GET",
		headers: {
			"X-RapidAPI-Key": API_KEY,
			"X-RapidAPI-Host": "spotify23.p.rapidapi.com",
		},
	};

	try {
		const response = await fetch(url, options);
		const result = await response.json();
		CONSOLE_LOG && console.log("Lyrics Result: ", result);
		populateLyrics(result.lyrics);
	} catch (error) {
		CONSOLE_LOG && console.error(error);
		lyricsContent.innerHTML = "No lyrics available...";
	}
}

// DOM Stuff

function populateAlbumList(albums) {
	CONSOLE_LOG && console.log("Populate Album List Data: ", albums);

	const list = document.getElementById("albumsContent");

	list.innerHTML = "";

	if (albums.length > 0) {
		albumCoverURL = albums[0].releases.items[0].coverArt.sources[0].url;
		fetchAlbumTracks(albums[0].releases.items[0].id);
	}

	for (let album of albums) {
		const albumButton = document.createElement("button");

		albumButton.classList.add("flex", "flex-col", "items-start");

		albumButton.onclick = () => {
			albumCoverURL = album.releases.items[0].coverArt.sources[0].url;
			fetchAlbumTracks(album.releases.items[0].id);
		};

		const img = document.createElement("img");

		img.src = album.releases.items[0].coverArt.sources[0].url;

		img.classList.add("object-cover", "shadow-lg", "rounded", "h-[10rem]", "w-[150px]");

		albumButton.appendChild(img);

		const albumName = document.createElement("h1");
		albumName.classList.add("whitespace-normal", "w-[10rem]", "text-left");

		albumName.textContent = album.releases.items[0].name;

		albumButton.appendChild(albumName);

		const albumYear = document.createElement("h2");

		albumYear.textContent = album.releases.items[0].date.year;

		albumButton.appendChild(albumYear);

		list.appendChild(albumButton);
	}
}

function populateArtistsList(artists) {
	CONSOLE_LOG && console.log("Populate Artists List Data: ", artists);

	const list = document.getElementById("relatedArtistsContent");

	list.innerHTML = "";

	for (let artist of artists) {
		const artistButton = document.createElement("button");

		artistButton.classList.add("flex", "flex-col", "items-start");

		artistButton.id = artist.id;

		artistButton.onclick = () => {
			artistID_SPOTIFY = artist.id;
			fetchRelatedArtists(artist.id);
			fetchAlbums(artist.id);
		};

		const img = document.createElement("img");

		img.classList.add("object-cover", "shadow-lg", "rounded", "h-[10rem]", "w-[150px]");

		img.src = artist.images[0].url;

		artistButton.appendChild(img);

		const artistName = document.createElement("h1");
		artistName.classList.add("whitespace-normal", "text-center");

		artistName.textContent = artist.name;

		artistButton.appendChild(artistName);

		list.appendChild(artistButton);
	}
}

function populateLyrics(lyrics) {
	const list = lyrics.lines;

	lyricsContent.innerHTML = "";

	for (let line of list) {
		const paragraph = document.createElement("p");
		paragraph.classList.add("whitespace-normal", "text-left");

		lyrics.syncType == "UNSYNCED" ? paragraph.classList.add("text-gray-100") : paragraph.classList.add("text-gray-300");

		paragraph.setAttribute("data-syncType", lyrics.syncType);
		paragraph.setAttribute("data-startTimeMs", line.startTimeMs);
		paragraph.setAttribute("data-endTimeMs", line.endTimeMs);

		paragraph.textContent = line.words;

		lyricsContent.appendChild(paragraph);
	}

	if (lyrics.lines.length === 0) {
		lyricsContent.innerHTML = "No lyrics available...";
	}
}
