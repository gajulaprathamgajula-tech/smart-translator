// Language Translator App JavaScript

class LanguageTranslator {
    constructor() {
        this.countryLanguageMapping = {
            "US": {"code": "en", "name": "English"},
            "GB": {"code": "en", "name": "English"},
            "AU": {"code": "en", "name": "English"},
            "CA": {"code": "en", "name": "English"},
            "ES": {"code": "es", "name": "Spanish"},
            "MX": {"code": "es", "name": "Spanish"},
            "AR": {"code": "es", "name": "Spanish"},
            "CO": {"code": "es", "name": "Spanish"},
            "FR": {"code": "fr", "name": "French"},
            "DE": {"code": "de", "name": "German"},
            "AT": {"code": "de", "name": "German"},
            "CH": {"code": "de", "name": "German"},
            "IT": {"code": "it", "name": "Italian"},
            "BR": {"code": "pt", "name": "Portuguese"},
            "PT": {"code": "pt", "name": "Portuguese"},
            "RU": {"code": "ru", "name": "Russian"},
            "CN": {"code": "zh", "name": "Chinese"},
            "TW": {"code": "zh", "name": "Chinese"},
            "JP": {"code": "ja", "name": "Japanese"},
            "KR": {"code": "ko", "name": "Korean"},
            "IN": {"code": "hi", "name": "Hindi"},
            "NL": {"code": "nl", "name": "Dutch"},
            "SE": {"code": "sv", "name": "Swedish"},
            "NO": {"code": "no", "name": "Norwegian"},
            "DK": {"code": "da", "name": "Danish"},
            "FI": {"code": "fi", "name": "Finnish"},
            "PL": {"code": "pl", "name": "Polish"},
            "TR": {"code": "tr", "name": "Turkish"},
            "GR": {"code": "el", "name": "Greek"},
            "HU": {"code": "hu", "name": "Hungarian"},
            "CZ": {"code": "cs", "name": "Czech"},
            "SK": {"code": "sk", "name": "Slovak"},
            "RO": {"code": "ro", "name": "Romanian"},
            "BG": {"code": "bg", "name": "Bulgarian"},
            "HR": {"code": "hr", "name": "Croatian"},
            "SI": {"code": "sl", "name": "Slovenian"},
            "EE": {"code": "et", "name": "Estonian"},
            "LV": {"code": "lv", "name": "Latvian"},
            "LT": {"code": "lt", "name": "Lithuanian"}
        };

        this.supportedLanguages = [
            {"code": "auto", "name": "Auto-detect"},
            {"code": "en", "name": "English"},
            {"code": "es", "name": "Spanish"},
            {"code": "fr", "name": "French"},
            {"code": "de", "name": "German"},
            {"code": "it", "name": "Italian"},
            {"code": "pt", "name": "Portuguese"},
            {"code": "ru", "name": "Russian"},
            {"code": "zh", "name": "Chinese"},
            {"code": "ja", "name": "Japanese"},
            {"code": "ko", "name": "Korean"},
            {"code": "hi", "name": "Hindi"},
            {"code": "ar", "name": "Arabic"},
            {"code": "nl", "name": "Dutch"},
            {"code": "sv", "name": "Swedish"},
            {"code": "pl", "name": "Polish"},
            {"code": "tr", "name": "Turkish"},
            {"code": "el", "name": "Greek"},
            {"code": "hu", "name": "Hungarian"},
            {"code": "cs", "name": "Czech"},
            {"code": "da", "name": "Danish"},
            {"code": "fi", "name": "Finnish"},
            {"code": "no", "name": "Norwegian"},
            {"code": "ro", "name": "Romanian"},
            {"code": "bg", "name": "Bulgarian"},
            {"code": "hr", "name": "Croatian"},
            {"code": "sk", "name": "Slovak"},
            {"code": "sl", "name": "Slovenian"},
            {"code": "et", "name": "Estonian"},
            {"code": "lv", "name": "Latvian"},
            {"code": "lt", "name": "Lithuanian"},
            {"code": "uk", "name": "Ukrainian"},
            {"code": "th", "name": "Thai"},
            {"code": "vi", "name": "Vietnamese"},
            {"code": "id", "name": "Indonesian"},
            {"code": "ms", "name": "Malay"},
            {"code": "tl", "name": "Filipino"},
            {"code": "he", "name": "Hebrew"},
            {"code": "fa", "name": "Persian"},
            {"code": "ur", "name": "Urdu"},
            {"code": "bn", "name": "Bengali"},
            {"code": "ta", "name": "Tamil"},
            {"code": "te", "name": "Telugu"},
            {"code": "ml", "name": "Malayalam"},
            {"code": "kn", "name": "Kannada"},
            {"code": "gu", "name": "Gujarati"},
            {"code": "pa", "name": "Punjabi"},
            {"code": "mr", "name": "Marathi"},
            {"code": "ne", "name": "Nepali"},
            {"code": "si", "name": "Sinhala"},
            {"code": "my", "name": "Myanmar"},
            {"code": "km", "name": "Khmer"},
            {"code": "lo", "name": "Lao"},
            {"code": "ka", "name": "Georgian"},
            {"code": "am", "name": "Amharic"},
            {"code": "sw", "name": "Swahili"},
            {"code": "zu", "name": "Zulu"},
            {"code": "af", "name": "Afrikaans"},
            {"code": "is", "name": "Icelandic"},
            {"code": "mt", "name": "Maltese"},
            {"code": "ga", "name": "Irish"},
            {"code": "cy", "name": "Welsh"},
            {"code": "eu", "name": "Basque"},
            {"code": "ca", "name": "Catalan"}
        ];

        this.detectedLanguage = null;
        this.currentLocation = null;
        this.isLocationDetected = false;

        this.initializeElements();
        this.setupEventListeners();
        this.populateLanguageSelectors();
        
        // Start location detection immediately
        setTimeout(() => {
            this.requestLocationPermission();
        }, 100);
    }

    initializeElements() {
        this.elements = {
            locationStatus: document.getElementById('locationStatus'),
            locationText: document.getElementById('locationText'),
            detectionInfo: document.getElementById('detectionInfo'),
            detectionText: document.getElementById('detectionText'),
            sourceLang: document.getElementById('sourceLang'),
            targetLang: document.getElementById('targetLang'),
            sourceText: document.getElementById('sourceText'),
            targetText: document.getElementById('targetText'),
            translateBtn: document.getElementById('translateBtn'),
            copyBtn: document.getElementById('copyBtn'),
            swapBtn: document.getElementById('swapBtn'),
            charCount: document.getElementById('charCount'),
            errorMessage: document.getElementById('errorMessage'),
            successMessage: document.getElementById('successMessage'),
            errorText: document.getElementById('errorText'),
            successText: document.getElementById('successText'),
            loadingSpinner: document.getElementById('loadingSpinner'),
            autoDetectedBadge: document.getElementById('autoDetectedBadge')
        };
    }

    setupEventListeners() {
        this.elements.sourceText.addEventListener('input', () => {
            this.updateCharCount();
            this.toggleTranslateButton();
        });

        this.elements.translateBtn.addEventListener('click', () => {
            this.translateText();
        });

        this.elements.copyBtn.addEventListener('click', () => {
            this.copyTranslation();
        });

        this.elements.swapBtn.addEventListener('click', () => {
            this.swapLanguages();
        });

        this.elements.sourceLang.addEventListener('change', () => {
            this.toggleTranslateButton();
        });

        this.elements.targetLang.addEventListener('change', () => {
            this.hideAutoDetectedBadge();
        });

        // Allow Enter key to trigger translation
        this.elements.sourceText.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'Enter') {
                e.preventDefault();
                if (!this.elements.translateBtn.disabled) {
                    this.translateText();
                }
            }
        });
    }

    populateLanguageSelectors() {
        // Populate source language selector
        this.elements.sourceLang.innerHTML = '';
        this.supportedLanguages.forEach(lang => {
            const option = document.createElement('option');
            option.value = lang.code;
            option.textContent = lang.name;
            this.elements.sourceLang.appendChild(option);
        });

        // Populate target language selector (excluding auto-detect)
        this.elements.targetLang.innerHTML = '';
        this.supportedLanguages.slice(1).forEach(lang => {
            const option = document.createElement('option');
            option.value = lang.code;
            option.textContent = lang.name;
            this.elements.targetLang.appendChild(option);
        });
    }

    async requestLocationPermission() {
        console.log('Requesting location permission...');
        
        if (!navigator.geolocation) {
            console.error('Geolocation not supported');
            this.handleLocationError('Geolocation is not supported by this browser.');
            return;
        }

        try {
            this.updateLocationStatus('📍 Requesting location permission...');
            
            // Create a promise that resolves with position or rejects with error
            const position = await new Promise((resolve, reject) => {
                const options = {
                    enableHighAccuracy: true,
                    timeout: 15000,
                    maximumAge: 0
                };

                navigator.geolocation.getCurrentPosition(
                    (pos) => {
                        console.log('Location obtained:', pos);
                        resolve(pos);
                    },
                    (error) => {
                        console.error('Geolocation error:', error);
                        reject(error);
                    },
                    options
                );
            });

            await this.handleLocationSuccess(position);
        } catch (error) {
            console.error('Location permission error:', error);
            let errorMessage = 'Unable to access your location. ';
            
            switch(error.code) {
                case 1:
                    errorMessage += 'Permission denied.';
                    break;
                case 2:
                    errorMessage += 'Location unavailable.';
                    break;
                case 3:
                    errorMessage += 'Request timeout.';
                    break;
                default:
                    errorMessage += error.message || 'Unknown error.';
            }
            
            this.handleLocationError(errorMessage);
        }
    }

    async handleLocationSuccess(position) {
        try {
            this.updateLocationStatus('🔍 Getting your location details...');
            
            const { latitude, longitude } = position.coords;
            this.currentLocation = { latitude, longitude };

            console.log('Coordinates:', latitude, longitude);

            // Reverse geocoding to get country
            const countryCode = await this.getCountryFromCoordinates(latitude, longitude);
            
            if (countryCode) {
                console.log('Detected country:', countryCode);
                const language = this.countryLanguageMapping[countryCode];
                if (language) {
                    this.detectedLanguage = language;
                    this.setTargetLanguage(language.code);
                    this.updateLocationStatus(`📍 ${this.getCountryName(countryCode)}`);
                    this.showDetectionSuccess(countryCode, language);
                } else {
                    this.handleLanguageNotFound(countryCode);
                }
            } else {
                this.handleLocationError('Could not determine your country from coordinates.');
            }
            
            this.isLocationDetected = true;
        } catch (error) {
            console.error('Location processing error:', error);
            this.handleLocationError('Failed to process location data.');
        }
    }

    async getCountryFromCoordinates(lat, lng) {
        try {
            console.log('Reverse geocoding...');
            
            // Using OpenStreetMap Nominatim API for reverse geocoding
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=3&addressdetails=1`,
                {
                    headers: {
                        'User-Agent': 'LanguageTranslatorApp/1.0'
                    }
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Geocoding response:', data);
            
            const countryCode = data.address?.country_code?.toUpperCase();
            console.log('Extracted country code:', countryCode);
            
            return countryCode;
        } catch (error) {
            console.error('Reverse geocoding error:', error);
            // Fallback: try to use IP-based geolocation
            return await this.getCountryFromIP();
        }
    }

    async getCountryFromIP() {
        try {
            console.log('Trying IP-based location...');
            const response = await fetch('https://ipapi.co/json/');
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('IP location response:', data);
            
            return data.country_code?.toUpperCase();
        } catch (error) {
            console.error('IP geolocation error:', error);
            return null;
        }
    }

    getCountryName(countryCode) {
        const countryNames = {
            'US': 'United States', 'GB': 'United Kingdom', 'AU': 'Australia', 'CA': 'Canada',
            'ES': 'Spain', 'MX': 'Mexico', 'AR': 'Argentina', 'CO': 'Colombia',
            'FR': 'France', 'DE': 'Germany', 'AT': 'Austria', 'CH': 'Switzerland',
            'IT': 'Italy', 'BR': 'Brazil', 'PT': 'Portugal', 'RU': 'Russia',
            'CN': 'China', 'TW': 'Taiwan', 'JP': 'Japan', 'KR': 'South Korea',
            'IN': 'India', 'NL': 'Netherlands', 'SE': 'Sweden', 'NO': 'Norway',
            'DK': 'Denmark', 'FI': 'Finland', 'PL': 'Poland', 'TR': 'Turkey',
            'GR': 'Greece', 'HU': 'Hungary', 'CZ': 'Czech Republic', 'SK': 'Slovakia',
            'RO': 'Romania', 'BG': 'Bulgaria', 'HR': 'Croatia', 'SI': 'Slovenia',
            'EE': 'Estonia', 'LV': 'Latvia', 'LT': 'Lithuania'
        };
        return countryNames[countryCode] || countryCode;
    }

    setTargetLanguage(languageCode) {
        this.elements.targetLang.value = languageCode;
        this.showAutoDetectedBadge();
    }

    showAutoDetectedBadge() {
        this.elements.autoDetectedBadge.classList.remove('hidden');
    }

    hideAutoDetectedBadge() {
        this.elements.autoDetectedBadge.classList.add('hidden');
    }

    showDetectionSuccess(countryCode, language) {
        const countryName = this.getCountryName(countryCode);
        this.elements.detectionText.innerHTML = `
            Great! We detected you're in <strong>${countryName}</strong> and set <strong>${language.name}</strong> 
            as your target language. You can change this anytime using the language selector.
        `;
        this.elements.detectionInfo.classList.add('fade-in');
    }

    handleLanguageNotFound(countryCode) {
        const countryName = this.getCountryName(countryCode);
        this.setTargetLanguage('en'); // Default to English
        this.updateLocationStatus(`📍 ${countryName}`);
        this.elements.detectionText.innerHTML = `
            We detected you're in <strong>${countryName}</strong>, but we don't have a specific language mapping. 
            We've defaulted to English as your target language.
        `;
    }

    handleLocationError(message) {
        console.error('Location error:', message);
        this.updateLocationStatus('📍 Location detection failed');
        this.setTargetLanguage('en'); // Default to English
        this.elements.detectionText.innerHTML = `
            <strong>Location Detection:</strong> ${message}<br>
            We've set English as your target language. You can manually select your preferred language from the dropdown.
        `;
        this.elements.detectionInfo.style.background = 'var(--color-bg-4)';
    }

    updateLocationStatus(text) {
        this.elements.locationText.textContent = text;
    }

    updateCharCount() {
        const text = this.elements.sourceText.value;
        const count = text.length;
        this.elements.charCount.textContent = `${count} / 5000`;
        
        if (count > 4500) {
            this.elements.charCount.style.color = 'var(--color-warning)';
        } else if (count > 4000) {
            this.elements.charCount.style.color = 'var(--color-error)';
        } else {
            this.elements.charCount.style.color = 'var(--color-text-secondary)';
        }
    }

    toggleTranslateButton() {
        const hasText = this.elements.sourceText.value.trim().length > 0;
        const hasSourceLang = this.elements.sourceLang.value !== '';
        const hasTargetLang = this.elements.targetLang.value !== '';
        
        this.elements.translateBtn.disabled = !(hasText && hasSourceLang && hasTargetLang);
    }

    async translateText() {
        const sourceText = this.elements.sourceText.value.trim();
        const sourceLang = this.elements.sourceLang.value;
        const targetLang = this.elements.targetLang.value;

        if (!sourceText || !targetLang) return;

        this.setTranslatingState(true);
        this.hideMessages();

        try {
            const translation = await this.callTranslationAPI(sourceText, sourceLang, targetLang);
            this.elements.targetText.value = translation;
            this.elements.copyBtn.disabled = false;
            this.showSuccessMessage('Translation completed successfully!');
        } catch (error) {
            console.error('Translation error:', error);
            this.showErrorMessage('Translation failed. Please try again.');
        } finally {
            this.setTranslatingState(false);
        }
    }

    async callTranslationAPI(text, sourceLang, targetLang) {
        const sourceParam = sourceLang === 'auto' ? 'auto' : sourceLang;
        
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceParam}&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!data || !data[0]) {
            throw new Error('Invalid response from translation service');
        }
        
        return data[0].map(item => item[0]).join('');
    }

    setTranslatingState(isTranslating) {
        if (isTranslating) {
            this.elements.translateBtn.querySelector('.btn-text').classList.add('hidden');
            this.elements.loadingSpinner.classList.remove('hidden');
            this.elements.translateBtn.disabled = true;
        } else {
            this.elements.translateBtn.querySelector('.btn-text').classList.remove('hidden');
            this.elements.loadingSpinner.classList.add('hidden');
            this.toggleTranslateButton();
        }
    }

    async copyTranslation() {
        try {
            await navigator.clipboard.writeText(this.elements.targetText.value);
            this.showSuccessMessage('Translation copied to clipboard!');
        } catch (error) {
            console.error('Copy error:', error);
            this.showErrorMessage('Failed to copy translation.');
        }
    }

    swapLanguages() {
        const sourceLang = this.elements.sourceLang.value;
        const targetLang = this.elements.targetLang.value;
        const sourceText = this.elements.sourceText.value;
        const targetText = this.elements.targetText.value;

        if (sourceLang === 'auto') {
            this.showErrorMessage('Cannot swap when auto-detect is selected.');
            return;
        }

        // Swap languages
        this.elements.sourceLang.value = targetLang;
        this.elements.targetLang.value = sourceLang;

        // Swap text
        this.elements.sourceText.value = targetText;
        this.elements.targetText.value = sourceText;

        // Update UI
        this.updateCharCount();
        this.toggleTranslateButton();
        this.elements.copyBtn.disabled = !targetText;
        this.hideAutoDetectedBadge();
        
        this.showSuccessMessage('Languages swapped successfully!');
    }

    showSuccessMessage(message) {
        this.elements.successText.textContent = message;
        this.elements.successMessage.classList.remove('hidden');
        setTimeout(() => {
            this.elements.successMessage.classList.add('hidden');
        }, 3000);
    }

    showErrorMessage(message) {
        this.elements.errorText.textContent = message;
        this.elements.errorMessage.classList.remove('hidden');
        setTimeout(() => {
            this.elements.errorMessage.classList.add('hidden');
        }, 5000);
    }

    hideMessages() {
        this.elements.errorMessage.classList.add('hidden');
        this.elements.successMessage.classList.add('hidden');
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing translator...');
    new LanguageTranslator();
});
