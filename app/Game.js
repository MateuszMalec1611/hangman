import { Quote } from './Quote.js';
class Game {
  currentStep = 0;
  lastStep = 7;

  quotes = [
    {
      text: 'pan tadeusz',
      category: 'Utwór literacki',
    },
    {
      text: 'harry potter',
      category: 'Utwór literacki',
    },
    {
      text: 'janko muzykant',
      category: 'Utwór literacki',
    },
    {
      text: 'akademia pana kleksa',
      category: 'Film',
    },
    {
      text: 'ogniem i mieczem',
      category: 'Utwór literacki',
    },
  ];

  constructor({ lettersWrapper, categoryWrapper, wordrsWrapper, outputWrapper }) {
    this.lettersWrapper = lettersWrapper;
    this.categoryWrapper = categoryWrapper;
    this.wordrsWrapper = wordrsWrapper;
    this.outputWrapper = outputWrapper;

    const { text, category } = this.quotes[Math.floor(Math.random() * this.quotes.length)];
    this.categoryWrapper.textContent = category;
    this.quote = new Quote(text);
  }

  guess(letter, event) {
    event.target.disabled = true;
    if (this.quote.guess(letter)) {
      this.drawQuote();
    } else {
      this.currentStep++;
      document.querySelectorAll('.step')[this.currentStep].style.opacity = 1;
      if (this.currentStep === this.lastStep) this.loosing();
    }
  }

  drawLetters() {
    for (let i = 0; i < 26; i++) {
      const label = (i + 10).toString(36);
      const button = document.createElement('button');
      button.innerHTML = label;
      button.addEventListener('click', event => this.guess(label, event));
      this.lettersWrapper.appendChild(button);
    }
  }

  drawQuote() {
    const content = this.quote.getContent();
    this.wordrsWrapper.textContent = content;
    if (!content.includes('_')) this.winning();
  }

  start() {
    document.querySelectorAll('.step')[this.currentStep].style.opacity = 1;
    this.drawLetters();
    this.drawQuote();
  }

  winning() {
    this.wordrsWrapper.textContent = 'Gratulacje wygrałeś!';
    this.lettersWrapper.innerHTML = '';
  }

  loosing() {
    this.wordrsWrapper.textContent = 'Przegrałeś!';
    this.lettersWrapper.innerHTML = '';
  }
}

const game = new Game({
  lettersWrapper: document.querySelector('#letters'),
  categoryWrapper: document.querySelector('#category'),
  wordrsWrapper: document.querySelector('#word'),
  outputWrapper: document.querySelector('#output'),
});
game.start();
