# KodeGo Technical Exam Submissions

by Mark Roland Alueta

## Description

This is a compilation of my solutions for the KodeGo Technical Exam (Sections 1, 2, and 4).

## Navigation and Usage

### Directories

Overall Folder Structure:

```bash
.
├── section-1
├── section-2
│   ├── integration-1
│   └── integration-2
└── section-4
    └── tic-tac-toe
```

### Prerequisites (Optional)

In order to run the two sections of the exam, either you open their `index.html` files or you need to have the following:

- [Live Server Extension for VS Code](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)

### Section 1 (Music Player - Layout Only)

```bash
├── index.html
├── script.js
└── styles.css
```

This project consist of only UI and some simple logic behind a UI feature (the moving track of the music player).

---

### Section 2

#### Music Player with Lyrics, Album, Related Artists using RapidAPI

Integration #1 Files

```bash
├── env.example.js
├── helpers.js
├── index.html
├── script.js
└── styles.css
```

In the Integration #1 objective, we will be using the [Genius RapidAPI](https://rapidapi.com/Glavier/api/genius-song-lyrics1/) to get the lyrics of a song and display it on the UI. The instruction didn't specify to fetch lyrics from a set of songs from either an album or an artist so I only fetched one song by Taylor Swift. Fetching multiple songs will be done in the next integration.

Integration #2 Files

```bash
├── env.example.js
├── helpers.js
├── index.html
├── script.js
└── styles.css
```

In the Integration #2 objective, we will be using the [Spotify RapidAPI](https://rapidapi.com/Glavier/api/spotify23) to get the albums and related artists and display it on the UI. When you open the project (through `index.html`), the default artist and song will be by Taylor Swift but you can change it on the `script.js` file.

---

### Section 4 (Tic Tac Toe)

```bash
└── tic-tac-toe
    ├── public
    ├── src
    │   └── App.tsx
    └── README.md
    └── (other files)
```

You can navigate to the folder and open the `README.md` file so you can read the project documentation and guide. You can also open the `src/App.tsx` file to see the comments of the code.

## CodePen Links

These are CodePen versions of the projects.

- Section 1: [https://codepen.io/Mark-Roland-Alueta/pen/ExGZOLm](https://codepen.io/Mark-Roland-Alueta/pen/ExGZOLm)

- Section 2:
  - Integration #1: [https://codepen.io/Mark-Roland-Alueta/pen/KKbmvvV](https://codepen.io/Mark-Roland-Alueta/pen/KKbmvvV)
  - Integration #2: [https://codepen.io/Mark-Roland-Alueta/pen/XWoRaeg](https://codepen.io/Mark-Roland-Alueta/pen/XWoRaeg)

- Section 4: [https://codepen.io/Mark-Roland-Alueta/pen/GRPvWxB](https://codepen.io/Mark-Roland-Alueta/pen/GRPvWxB)
