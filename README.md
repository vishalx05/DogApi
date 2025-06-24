# DogApi
Here’s a complete, professional **`README.md`** documentation for your **Dog CEO API Viewer** project:

---

```markdown
# 🐕 Dog CEO API Viewer

An interactive and beautifully styled web application to explore dog breeds and view images using the [Dog CEO API](https://dog.ceo/dog-api/).

---

## ✨ Features

- 🔄 Fetches 8 random dog images with breed names
- 📋 Lists all breeds in a dropdown and loads images by selected breed
- 🔍 Live search to filter dogs by breed
- 🧹 Clear results functionality
- 📈 Real-time stats: total dogs loaded, filtered count, selected breed
- 🎨 Stylish, responsive UI with animations and gradients

---

## 📸 Live Preview

> _Add a live link here if hosted on GitHub Pages or Netlify_

[🔗 Live Demo](https://yourusername.github.io/dog-api-viewer)

---

## 🧰 Tech Stack

- **HTML5**
- **CSS3** (modern styling with gradients, flexbox, animations)
- **JavaScript** (vanilla JS with async/await and DOM manipulation)
- **Dog CEO API** for dog image and breed data

---

## 🗂️ Project Structure

```

dog-api-viewer/
├── index.html       # Main HTML file
└── README.md        # This documentation

````

---

## 🚀 How It Works

### 🔄 Load Dogs
Click “🔄 Load New Dogs” to fetch 8 random dog images.

### 📋 Refresh Breeds
Click “📋 Refresh Breeds” to repopulate the breed dropdown.

### 🔍 Search and Filter
- Enter a breed name in the search bar (e.g., “husky” or “poodle”).
- Or select a breed from the dropdown to load images only for that breed.

### 🧹 Clear Results
Removes all images and resets the UI state.

---

## 📦 API Usage

Uses the following endpoints from [Dog CEO’s Free API](https://dog.ceo/dog-api/):

- `https://dog.ceo/api/breeds/image/random` — get random images
- `https://dog.ceo/api/breed/{breed}/images/random/8` — images by breed
- `https://dog.ceo/api/breeds/list/all` — all available breeds

---

## 🧪 Example Code Snippets

### 🌐 Fetching Breeds
```js
const response = await fetch('https://dog.ceo/api/breeds/list/all');
const data = await response.json();
````

### 🖼️ Creating Dog Cards

```js
this.dogs = data.message.map(url => ({
  url,
  breed: this.extractBreedFromUrl(url)
}));
```

---

## 📱 Responsive Design

* Optimized for desktop and mobile devices
* Uses media queries to adjust layout, font sizes, and gallery columns

---

## 📊 Stats Panel

Displays:

* Total number of dogs loaded
* Number of dogs matching search/filter
* Currently selected breed

---

## 🛠 Setup Instructions

1. Clone the repository

   ```bash
   git clone https://github.com/yourusername/dog-api-viewer.git
   cd dog-api-viewer
   ```

2. Open `index.html` in your browser — no build step needed.

---

## 🙋‍♂️ Author
Vishal

## 📄 License

This project is licensed under the **MIT License**.

---

> Replace with your own screenshot image

```

Let me know if you'd like a [deploy guide for GitHub Pages](f) or [an auto-refresh version for live demo](f).
```
