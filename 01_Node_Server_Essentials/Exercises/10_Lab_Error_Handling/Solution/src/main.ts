import '../style.css'

// Spell interface for type safety
interface Spell {
  index: string;
  name: string;
  level: number;
  school: {
    name: string;
  };
  casting_time: string;
  range: string;
  components: string[];
  duration: string;
  desc: string[];
}

// DOM elements
const spellInput = document.querySelector('#spellInput') as HTMLInputElement;
const searchBtn = document.querySelector('#searchBtn') as HTMLButtonElement;
const loadingDiv = document.querySelector('#loading') as HTMLDivElement;
const resultDiv = document.querySelector('#spellResult') as HTMLDivElement;

// FIXED: Proper error handling with try-catch and status checking
async function fetchSpellData(spellName: string): Promise<Spell> {
  try {
    const response = await fetch(`https://www.dnd5eapi.co/api/spells/${spellName.toLowerCase()}`);
    
    // Check if the response is successful
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Spell "${spellName}" not found. Try checking the spelling or use a different spell name.`);
      } else {
        throw new Error(`API Error: ${response.status} - ${response.statusText}`);
      }
    }
    
    const data = await response.json();
    
    // Validate that we received valid spell data
    if (!data || !data.name) {
      throw new Error('Invalid spell data received from API');
    }
    
    return data;
  } catch (error) {
    // Re-throw network errors with more user-friendly messages
    if (error instanceof TypeError) {
      throw new Error('Network error: Please check your internet connection and try again.');
    }
    // Re-throw other errors as-is (they already have good messages)
    throw error;
  }
}

// FIXED: Comprehensive error handling that won't crash the app
async function searchSpell(spellName: string): Promise<void> {
  try {
    // Show loading state
    loadingDiv.classList.remove('hidden');
    resultDiv.innerHTML = '';
    
    // Attempt to fetch spell data
    const spell = await fetchSpellData(spellName);
    
    // Hide loading state
    loadingDiv.classList.add('hidden');
    
    // Display spell data
    displaySpell(spell);
    
  } catch (error) {
    // Hide loading state on error
    loadingDiv.classList.add('hidden');
    
    // Display user-friendly error message
    displayError(error instanceof Error ? error.message : 'An unexpected error occurred');
  }
}

function displaySpell(spell: Spell): void {
  const spellHTML = `
    <div class="spell-card">
      <h2 class="spell-title">${spell.name}</h2>
      
      <div class="spell-meta">
        <div class="meta-item">
          <span class="meta-label">Level</span>
          ${spell.level === 0 ? 'Cantrip' : `Level ${spell.level}`}
        </div>
        <div class="meta-item">
          <span class="meta-label">School</span>
          ${spell.school.name}
        </div>
        <div class="meta-item">
          <span class="meta-label">Casting Time</span>
          ${spell.casting_time}
        </div>
        <div class="meta-item">
          <span class="meta-label">Range</span>
          ${spell.range}
        </div>
        <div class="meta-item">
          <span class="meta-label">Components</span>
          ${spell.components.join(', ')}
        </div>
        <div class="meta-item">
          <span class="meta-label">Duration</span>
          ${spell.duration}
        </div>
      </div>
      
      <div class="spell-description">
        <strong>Description:</strong><br>
        ${spell.desc.map(paragraph => `<p>${paragraph}</p>`).join('')}
      </div>
    </div>
  `;
  
  resultDiv.innerHTML = spellHTML;
}

// NEW: Function to display error messages to the user
function displayError(message: string): void {
  resultDiv.innerHTML = `
    <div class="error-message">
      <h3>⚠️ Error</h3>
      <p>${message}</p>
      <p><strong>Suggestions:</strong></p>
      <ul>
        <li>Check your spelling (use hyphens for multi-word spells like "cure-wounds")</li>
        <li>Try popular spells like: fireball, cure-wounds, magic-missile, or shield</li>
        <li>Make sure you have an internet connection</li>
      </ul>
    </div>
  `;
}

// FIXED: Event listener with proper error handling
searchBtn.addEventListener('click', async () => {
  const spellName = spellInput.value.trim();
  if (spellName) {
    try {
      await searchSpell(spellName);
    } catch (error) {
      // This catch is extra protection, though errors should be handled in searchSpell
      console.error('Unexpected error in search:', error);
      displayError('An unexpected error occurred. Please try again.');
    }
  } else {
    displayError('Please enter a spell name to search for.');
  }
});

// Allow Enter key to trigger search
spellInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    searchBtn.click();
  }
});

// FIXED: Load a default spell on page load with error handling
(async () => {
  try {
    await searchSpell('fireball');
  } catch (error) {
    // If the default spell fails, show a helpful message
    displayError('Welcome! Enter a spell name above to get started. Try "fireball" or "cure-wounds".');
  }
})();