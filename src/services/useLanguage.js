// useLanguage.js
import { ref, onMounted } from 'vue';

export function useLanguage() {
    const selectedLanguage = ref('English'); // valeur par défaut

    const setLanguage = (lang) => {
        selectedLanguage.value = lang;
        localStorage.setItem('selectedLanguage', lang);
    };

    onMounted(() => {
        const savedLang = localStorage.getItem('selectedLanguage');
        if (savedLang) {
            selectedLanguage.value = savedLang;
        }
    });

    return { selectedLanguage, setLanguage };
}