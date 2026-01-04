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

// BROKEN: This function has NO error handling - we need to fix this!
async function fetchSpellData(spellName: string): Promise<Spell> {
  const response = await fetch(`https://www.dnd5eapi.co/api/spells/${spellName.toLowerCase()}`);
  
  // PROBLEM: No status checking - this will fail silently on 404s
  const data = await response.json();
  return data;
}

// BROKEN: This function will crash the entire app if fetchSpellData fails
async function searchSpell(spellName: string): Promise<void> {
  // Show loading state
  loadingDiv.classList.remove('hidden');
  resultDiv.innerHTML = '';
  
  // PROBLEM: No try-catch block - any error will crash the app
  const spell = await fetchSpellData(spellName);
  
  // Hide loading state
  loadingDiv.classList.add('hidden');
  
  // Display spell data
  displaySpell(spell);
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

// BROKEN: Event listener has no error handling
searchBtn.addEventListener('click', () => {
  const spellName = spellInput.value.trim();
  if (spellName) {
    // PROBLEM: If searchSpell throws an error, it's not caught
    searchSpell(spellName);
  }
});

// Allow Enter key to trigger search
spellInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    searchBtn.click();
  }
});

// Load a default spell on page load - this will also crash if it fails!
searchSpell('fireball');