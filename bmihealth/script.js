// Elements
const form = document.getElementById('bmiForm');
const heightInput = document.getElementById('heightInput');
const weightInput = document.getElementById('weightInput');
const results = document.getElementById('results');
const bmiProgress = document.getElementById('bmiProgress');
const bmiProgressContainer = document.getElementById('bmiProgressContainer');
const healthTips = document.getElementById('healthTips');
const historyList = document.getElementById('historyList');
const clearHistoryBtn = document.getElementById('clearHistoryBtn');
const copyBtn = document.getElementById('copyBtn');
const languageSelect = document.getElementById('languageSelect');
const title = document.getElementById('title');
const heightLabel = document.getElementById('heightLabel');
const weightLabel = document.getElementById('weightLabel');
const calculateBtn = document.getElementById('calculateBtn');
const weightGuide = document.getElementById('weightGuide');
const underweightLi = document.getElementById('underweight');
const normalLi = document.getElementById('normal');
const overweightLi = document.getElementById('overweight');

let language = 'en';
let unit = 'metric';

const translations = {
  en: {
    title: 'BMI Calculator',
    heightLabelMetric: 'Height (cm):',
    heightLabelImperial: 'Height (ft):',
    weightLabelMetric: 'Weight (kg):',
    weightLabelImperial: 'Weight (lbs):',
    calculateBtn: 'Calculate',
    bmiResult: bmi => `Your BMI is: ${bmi}`,
    underweight: 'You are Underweight',
    normal: "You're in the Normal range",
    overweight: 'You are Overweight',
    invalidHeight: 'Please provide a valid height.',
    invalidWeight: 'Please provide a valid weight.',
    bmiWeightGuide: 'BMI Weight Guide',
    weightGuideUnder: 'Under Weight: Less than 18.6',
    weightGuideNormal: 'Normal Range: 18.6 to 24.9',
    weightGuideOver: 'Overweight: Greater than 24.9',
    healthTipsUnderweight: 'Consider a nutrient-rich diet and consult a doctor if needed.',
    healthTipsNormal: 'Maintain your current lifestyle for good health!',
    healthTipsOverweight: 'Try to exercise regularly and watch your diet.',
    historyTitle: 'History',
    clearHistoryBtn: 'Clear History',
    copyBtn: '📋 Copy Results',
  },
  hi: {
    title: 'बीएमआई कैलकुलेटर',
    heightLabelMetric: 'ऊंचाई (सेमी):',
    heightLabelImperial: 'ऊंचाई (फीट):',
    weightLabelMetric: 'वजन (किलोग्राम):',
    weightLabelImperial: 'वजन (पाउंड):',
    calculateBtn: 'गणना करें',
    bmiResult: bmi => `आपका बीएमआई है: ${bmi}`,
    underweight: 'आप का वजन कम है',
    normal: 'आप सामान्य सीमा में हैं',
    overweight: 'आपका वजन अधिक है',
    invalidHeight: 'कृपया सही ऊंचाई दर्ज करें।',
    invalidWeight: 'कृपया सही वजन दर्ज करें।',
    bmiWeightGuide: 'बीएमआई वजन मार्गदर्शिका',
    weightGuideUnder: 'कम वजन: 18.6 से कम',
    weightGuideNormal: 'सामान्य सीमा: 18.6 से 24.9',
    weightGuideOver: 'अधिक वजन: 24.9 से अधिक',
    healthTipsUnderweight: 'एक पोषक तत्वों से भरपूर आहार लें और आवश्यकता हो तो डॉक्टर से परामर्श करें।',
    healthTipsNormal: 'स्वस्थ रहने के लिए अपनी वर्तमान जीवनशैली बनाए रखें!',
    healthTipsOverweight: 'नियमित व्यायाम करें और अपने आहार पर ध्यान दें।',
    historyTitle: 'इतिहास',
    clearHistoryBtn: 'इतिहास साफ़ करें',
    copyBtn: '📋 परिणाम कॉपी करें',
  }
};

function updateLanguageTexts() {
  const t = translations[language];
  title.textContent = t.title;

  // Update labels depending on unit
  if (unit === 'metric') {
    heightLabel.textContent = t.heightLabelMetric;
    weightLabel.textContent = t.weightLabelMetric;
  } else {
    heightLabel.textContent = t.heightLabelImperial;
    weightLabel.textContent = t.weightLabelImperial;
  }
  calculateBtn.textContent = t.calculateBtn;
  weightGuide.querySelector('h2').textContent = t.bmiWeightGuide;
  underweightLi.textContent = t.weightGuideUnder;
  normalLi.textContent = t.weightGuideNormal;
  overweightLi.textContent = t.weightGuideOver;
  clearHistoryBtn.textContent = t.clearHistoryBtn;
  copyBtn.textContent = t.copyBtn;
  // Also update history section header
  document.querySelector('#historySection h2').textContent = t.historyTitle;
}

function convertToMetric(height, weight) {
  // height in ft, weight in lbs -> convert to cm, kg
  const heightCm = height * 30.48;
  const weightKg = weight * 0.453592;
  return [heightCm, weightKg];
}

function convertToImperial(height, weight) {
  // cm to ft, kg to lbs
  const heightFt = height / 30.48;
  const weightLbs = weight / 0.453592;
  return [heightFt, weightLbs];
}

function calculateBMI(height, weight) {
  // height cm, weight kg
  if (height === 0) return 0;
  const heightM = height / 100;
  return +(weight / (heightM * heightM)).toFixed(1);
}

function getBMICategory(bmi) {
  if (bmi < 18.6) return 'underweight';
  if (bmi >= 18.6 && bmi <= 24.9) return 'normal';
  return 'overweight';
}

function getHealthTip(category) {
  const t = translations[language];
  if (category === 'underweight') return t.healthTipsUnderweight;
  if (category === 'normal') return t.healthTipsNormal;
  if (category === 'overweight') return t.healthTipsOverweight;
  return '';
}

// Save and load history in localStorage
function saveHistory(history) {
  localStorage.setItem('bmiHistory', JSON.stringify(history));
}

function loadHistory() {
  const hist = localStorage.getItem('bmiHistory');
  if (hist) return JSON.parse(hist);
  return [];
}

function addHistoryEntry(entry) {
  const history = loadHistory();
  history.unshift(entry); // newest first
  if (history.length > 10) history.pop(); // limit to 10 entries
  saveHistory(history);
  renderHistory();
}

function renderHistory() {
  const history = loadHistory();
  const t = translations[language];
  historyList.innerHTML = '';
  if (history.length === 0) {
    historyList.innerHTML = `<li>${language === 'hi' ? 'कोई इतिहास उपलब्ध नहीं है।' : 'No history available.'}</li>`;
    return;
  }
  history.forEach(({date, bmi, unitUsed}) => {
    const d = new Date(date);
    const dateStr = d.toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
    const unitStr = unitUsed === 'metric' ? (language === 'hi' ? 'सेमी/किग्रा' : 'cm/kg') : (language === 'hi' ? 'फीट/पाउंड' : 'ft/lbs');
    const bmiText = translations[language].bmiResult(bmi);
    historyList.innerHTML += `<li>${dateStr}: ${bmiText} (${unitStr})</li>`;
  });
}

function clearHistory() {
  localStorage.removeItem('bmiHistory');
  renderHistory();
}

// Animate progress bar width from 0 to bmi (max 40 for scale)
function animateProgressBar(bmi) {
  let widthPercent = Math.min((bmi / 40) * 100, 100);
  bmiProgress.style.width = '0';
  setTimeout(() => {
    bmiProgress.style.width = `${widthPercent}%`;
    bmiProgressContainer.setAttribute('aria-valuenow', bmi.toString());
  }, 50);
}

// Show results with category and health tips
function showResults(bmi) {
  const category = getBMICategory(bmi);
  const t = translations[language];
  results.textContent = `${t.bmiResult(bmi)} — ${t[category]}`;
  healthTips.textContent = getHealthTip(category);
  animateProgressBar(bmi);
}

// Copy results to clipboard
function copyResults() {
  if (!results.textContent) return;
  navigator.clipboard.writeText(results.textContent).then(() => {
    alert(language === 'hi' ? 'परिणाम कॉपी हो गया!' : 'Results copied!');
  });
}

// Event listeners

// Language switch
languageSelect.addEventListener('change', e => {
  language = e.target.value;
  updateLanguageTexts();
  renderHistory();
  // Reset labels placeholders
  updateUnitLabels();
});

// Unit toggle
document.querySelectorAll('input[name="unit"]').forEach(radio => {
  radio.addEventListener('change', e => {
    unit = e.target.value;
    updateUnitLabels();
  });
});

// Update input labels & placeholders on unit change
function updateUnitLabels() {
  const t = translations[language];
  if (unit === 'metric') {
    heightLabel.textContent = t.heightLabelMetric;
    heightInput.placeholder = language === 'hi' ? 'अपनी ऊंचाई दर्ज करें' : 'Enter your height';
    weightLabel.textContent = t.weightLabelMetric;
    weightInput.placeholder = language === 'hi' ? 'अपना वजन दर्ज करें' : 'Enter your weight';
  } else {
    heightLabel.textContent = t.heightLabelImperial;
    heightInput.placeholder = language === 'hi' ? 'अपनी ऊंचाई दर्ज करें' : 'Enter your height';
    weightLabel.textContent = t.weightLabelImperial;
    weightInput.placeholder = language === 'hi' ? 'अपना वजन दर्ज करें' : 'Enter your weight';
  }
}

form.addEventListener('submit', e => {
  e.preventDefault();

  let height = parseFloat(heightInput.value);
  let weight = parseFloat(weightInput.value);

  const t = translations[language];

  if (isNaN(height) || height <= 0) {
    results.textContent = t.invalidHeight;
    healthTips.textContent = '';
    bmiProgress.style.width = '0';
    return;
  }

  if (isNaN(weight) || weight <= 0) {
    results.textContent = t.invalidWeight;
    healthTips.textContent = '';
    bmiProgress.style.width = '0';
    return;
  }

  // Convert if imperial
  if (unit === 'imperial') {
    [height, weight] = convertToMetric(height, weight);
  }

  const bmi = calculateBMI(height, weight);

  showResults(bmi);

  // Save history
  addHistoryEntry({
    date: new Date().toISOString(),
    bmi,
    unitUsed: unit
  });
});

// Clear history button
clearHistoryBtn.addEventListener('click', () => {
  if(confirm(language === 'hi' ? 'क्या आप वाकई इतिहास साफ़ करना चाहते हैं?' : 'Are you sure you want to clear history?')) {
    clearHistory();
  }
});

// Copy results
copyBtn.addEventListener('click', () => {
  copyResults();
});

// Initialize
function init() {
  updateLanguageTexts();
  updateUnitLabels();
  renderHistory();
  bmiProgress.style.width = '0';
}

init();
