

        class DogAPIViewer {
            constructor() {
                this.dogs = [];
                this.breeds = [];
                this.filteredDogs = [];
                this.isLoading = false;

                this.initializeElements();
                this.bindEvents();
                this.loadBreeds();
                this.loadRandomDogs();
            }

            initializeElements() {
                this.gallery = document.getElementById('gallery');
                this.loading = document.getElementById('loading');
                this.errorMessage = document.getElementById('errorMessage');
                this.searchInput = document.getElementById('searchInput');
                this.breedSelect = document.getElementById('breedSelect');
                this.loadDogsBtn = document.getElementById('loadDogsBtn');
                this.loadBreedsBtn = document.getElementById('loadBreedsBtn');
                this.clearBtn = document.getElementById('clearBtn');
                this.stats = document.getElementById('stats');
                this.totalCount = document.getElementById('totalCount');
                this.filteredCount = document.getElementById('filteredCount');
                this.selectedBreed = document.getElementById('selectedBreed');
                this.noResults = document.getElementById('noResults');
            }

            bindEvents() {
                this.loadDogsBtn.addEventListener('click', () => this.loadRandomDogs());
                this.loadBreedsBtn.addEventListener('click', () => this.loadBreeds());
                this.clearBtn.addEventListener('click', () => this.clearResults());
                this.searchInput.addEventListener('input', () => this.filterDogs());
                this.breedSelect.addEventListener('change', () => this.onBreedChange());
            }

            async loadBreeds() {
                try {
                    this.showLoading();
                    const response = await fetch('https://dog.ceo/api/breeds/list/all');
                    const data = await response.json();

                    if (data.status === 'success') {
                        this.breeds = Object.keys(data.message);
                        this.populateBreedSelect();
                        this.hideError();
                    } else {
                        throw new Error('Failed to fetch breeds');
                    }
                } catch (error) {
                    this.showError('Failed to load dog breeds. Please check your internet connection.');
                    console.error('Error loading breeds:', error);
                } finally {
                    this.hideLoading();
                }
            }

            populateBreedSelect() {
                this.breedSelect.innerHTML = '<option value="">All Breeds</option>';
                this.breeds.forEach(breed => {
                    const option = document.createElement('option');
                    option.value = breed;
                    option.textContent = this.capitalizeBreed(breed);
                    this.breedSelect.appendChild(option);
                });
            }

            async loadRandomDogs() {
                if (this.isLoading) return;

                try {
                    this.showLoading();
                    this.dogs = [];

                    // Load 8 random dog images
                    const promises = Array(8).fill().map(() =>
                        fetch('https://dog.ceo/api/breeds/image/random')
                            .then(response => response.json())
                    );

                    const results = await Promise.all(promises);

                    results.forEach((data, index) => {
                        if (data.status === 'success') {
                            const breed = this.extractBreedFromUrl(data.message);
                            this.dogs.push({
                                id: Date.now() + index,
                                url: data.message,
                                breed: breed
                            });
                        }
                    });

                    if (this.dogs.length === 0) {
                        throw new Error('No dogs loaded');
                    }

                    this.filteredDogs = [...this.dogs];
                    this.displayDogs();
                    this.updateStats();
                    this.hideError();

                } catch (error) {
                    this.showError('Failed to load dog images. Please try again.');
                    console.error('Error loading dogs:', error);
                } finally {
                    this.hideLoading();
                }
            }

            async loadBreedImages(breed) {
                if (this.isLoading) return;

                try {
                    this.showLoading();
                    const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random/8`);
                    const data = await response.json();

                    if (data.status === 'success') {
                        this.dogs = data.message.map((url, index) => ({
                            id: Date.now() + index,
                            url: url,
                            breed: breed
                        }));

                        this.filteredDogs = [...this.dogs];
                        this.displayDogs();
                        this.updateStats();
                        this.hideError();
                    } else {
                        throw new Error('Failed to fetch breed images');
                    }
                } catch (error) {
                    this.showError(`Failed to load images for ${breed}. Please try again.`);
                    console.error('Error loading breed images:', error);
                } finally {
                    this.hideLoading();
                }
            }

            extractBreedFromUrl(url) {
                const parts = url.split('/');
                const breedPart = parts[4]; // breeds/breed-name/image
                return breedPart ? breedPart.replace('-', ' ') : 'unknown';
            }

            capitalizeBreed(breed) {
                return breed.split('-').map(word =>
                    word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ');
            }

            filterDogs() {
                const searchTerm = this.searchInput.value.toLowerCase();
                const selectedBreed = this.breedSelect.value;

                this.filteredDogs = this.dogs.filter(dog => {
                    const matchesSearch = !searchTerm ||
                        dog.breed.toLowerCase().includes(searchTerm);
                    const matchesBreed = !selectedBreed ||
                        dog.breed.includes(selectedBreed);

                    return matchesSearch && matchesBreed;
                });

                this.displayDogs();
                this.updateStats();
            }

            onBreedChange() {
                const selectedBreed = this.breedSelect.value;

                if (selectedBreed) {
                    this.loadBreedImages(selectedBreed);
                    this.searchInput.value = '';
                } else {
                    this.filterDogs();
                }
            }

            displayDogs() {
                this.gallery.innerHTML = '';

                if (this.filteredDogs.length === 0) {
                    this.noResults.style.display = 'block';
                    return;
                }

                this.noResults.style.display = 'none';

                this.filteredDogs.forEach((dog, index) => {
                    const dogCard = this.createDogCard(dog);
                    dogCard.style.animationDelay = `${index * 0.1}s`;
                    this.gallery.appendChild(dogCard);
                });
            }

            createDogCard(dog) {
                const card = document.createElement('div');
                card.className = 'dog-card';

                card.innerHTML = `
                    <img
                        src="${dog.url}"
                        alt="${this.capitalizeBreed(dog.breed)}"
                        class="dog-image"
                        loading="lazy"
                    >
                    <div class="dog-info">
                        <div class="dog-breed">${this.capitalizeBreed(dog.breed)}</div>
                        <div class="breed-chip">${this.capitalizeBreed(dog.breed)}</div>
                        <div class="dog-url">${dog.url}</div>
                    </div>
                `;

                return card;
            }

            updateStats() {
                this.totalCount.textContent = `Total Dogs: ${this.dogs.length}`;
                this.filteredCount.textContent = `Showing: ${this.filteredDogs.length}`;

                const selectedBreed = this.breedSelect.value;
                this.selectedBreed.textContent = selectedBreed ?
                    this.capitalizeBreed(selectedBreed) : 'All Breeds';

                this.stats.style.display = 'flex';
            }

            clearResults() {
                this.dogs = [];
                this.filteredDogs = [];
                this.gallery.innerHTML = '';
                this.searchInput.value = '';
                this.breedSelect.value = '';
                this.stats.style.display = 'none';
                this.noResults.style.display = 'none';
                this.hideError();
            }

            showLoading() {
                this.isLoading = true;
                this.loading.style.display = 'block';
                this.loadDogsBtn.disabled = true;
                this.loadBreedsBtn.disabled = true;
            }

            hideLoading() {
                this.isLoading = false;
                this.loading.style.display = 'none';
                this.loadDogsBtn.disabled = false;
                this.loadBreedsBtn.disabled = false;
            }

            showError(message) {
                this.errorMessage.textContent = message;
                this.errorMessage.style.display = 'block';
            }

            hideError() {
                this.errorMessage.style.display = 'none';
            }
        }

        // Initialize the app when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            new DogAPIViewer();
        });
