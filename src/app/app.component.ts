import { Component, ElementRef, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  baseDeck: Card[] = [
    { filename: 'gh-am-p1-01.png', name: '+0' },
    { filename: 'gh-am-p1-02.png', name: '+0' },
    { filename: 'gh-am-p1-03.png', name: '+0' },
    { filename: 'gh-am-p1-04.png', name: '+0' },
    { filename: 'gh-am-p1-05.png', name: '+0' },
    { filename: 'gh-am-p1-06.png', name: '+0' },
    { filename: 'gh-am-p1-07.png', name: '+1' },
    { filename: 'gh-am-p1-08.png', name: '+1' },
    { filename: 'gh-am-p1-09.png', name: '+1' },
    { filename: 'gh-am-p1-10.png', name: '+1' },
    { filename: 'gh-am-p1-11.png', name: '+1' },
    { filename: 'gh-am-p1-12.png', name: '-1' },
    { filename: 'gh-am-p1-13.png', name: '-1' },
    { filename: 'gh-am-p1-14.png', name: '-1' },
    { filename: 'gh-am-p1-15.png', name: '-1' },
    { filename: 'gh-am-p1-16.png', name: '-1' },
    { filename: 'gh-am-p1-17.png', name: '-2' },
    { filename: 'gh-am-p1-18.png', name: '+2' },
    { filename: 'gh-am-p1-19.png', name: '*0' },
    { filename: 'gh-am-p1-20.png', name: '*2' },
  ];

  perks: Perk[] = [
    {
      addedCards: [{
        filename: 'gh-am-bs-01.png', name: '+1W'
      }],
      text: 'Replace one +0 card with one +1 and WIND card',
      removedFilenames: ['gh-am-p1-01.png'],
      sequence: 6,
      included: false,
    },
    {
      addedCards: [{
        filename: 'gh-am-bs-02.png', name: '+1L',
      }],
      text: 'Replace one +0 card with one +1 and LEAF card',
      removedFilenames: ['gh-am-p1-02.png'],
      sequence: 7,
    },
    {
      addedCards: [{
        filename: 'gh-am-bs-03.png', name: '+1S',
      }],
      text: 'Replace one +0 card with one +1 and SUN card',
      removedFilenames: ['gh-am-p1-03.png'],
      sequence: 8,
    },
    {
      addedCards: [{
        filename: 'gh-am-bs-04.png', name: '+1D',
      }],
      text: 'Replace one +0 card with one +1 and DARK card',
      removedFilenames: ['gh-am-p1-04.png'],
      sequence: 9,
    },
    {
      addedCards: [{
        filename: 'gh-am-bs-05.png', name: 'R+1H',
      }, {
        filename: 'gh-am-bs-06.png', name: 'R+1H',
      }],
      text: 'Add two rolling Heal 1 cards',
      sequence: 12,
    },
    {
      addedCards: [{
        filename: 'gh-am-bs-07.png', name: 'R+1H',
      }, {
        filename: 'gh-am-bs-08.png', name: 'R+1H',
      }],
      text: 'Add two rolling Heal 1 cards',
      sequence: 13,
    },
    {
      addedCards: [{
        filename: 'gh-am-bs-09.png', name: '+0W',
      }],
      text: 'Replace one -1 card with one +0 and WOUND card',
      removedFilenames: ['gh-am-p1-12.png'],
      sequence: 2,
    },
    {
      addedCards: [{
        filename: 'gh-am-bs-10.png', name: '+0W',
      }],
      text: 'Replace one -1 card with one +0 and WOUND card',
      removedFilenames: ['gh-am-p1-13.png'],
      sequence: 3,
    },
    {
      addedCards: [{
        filename: 'gh-am-bs-11.png', name: '+0P',
      }],
      text: 'Replace one -1 card with one +0 and POISON card',
      removedFilenames: ['gh-am-p1-14.png'],
      sequence: 4,
    },
    {
      addedCards: [{
        filename: 'gh-am-bs-12.png', name: '+0P',
      }],
      text: 'Replace one -1 card with one +0 and POISON card',
      removedFilenames: ['gh-am-p1-15.png'],
      sequence: 5,
    },
    {
      addedCards: [{
        filename: 'gh-am-bs-13.png', name: '+2M',
      }],
      text: 'Add one +2 MUDDLE card',
      sequence: 10,
    },
    {
      addedCards: [{
        filename: 'gh-am-bs-14.png', name: '+2M',
      }],
      text: 'Add one +2 MUDDLE card',
      sequence: 11,
    },
    {
      addedCards: [{
        filename: 'gh-am-bs-15.png', name: '+1',
      }],
      text: 'Ignore negative item effects and add one +1 card',
      sequence: 14,
    },
    {
      addedCards: [{
        filename: 'gh-am-bs-16.png', name: '+1',
      }],
      text: 'Ignore negative scenerio effects and add one +1 card',
      sequence: 15,
    },
    {
      addedCards: [{
        filename: 'gh-am-bs-17.png', name: '+0',
      }],
      text: 'Replace one -2 card with one +0 card',
      removedFilenames: ['gh-am-p1-17.png'],
      sequence: 1
    },
  ]

  curse: Card = {
    filename: 'gh-am-pm-01.png',
    name: '*0',
  };

  bless: Card = {
    filename: 'gh-am-pm-11.png',
    name: '*2',
  };

  negOne: Card = {
    filename: 'gh-am-pm-21.png',
    name: '-1',
  };

  drawPile: Card[] = [];
  discardPile: Card[] = [];

  constructor(private cookieService: CookieService) {
    this.perks = this.perks.sort((a, b) => a.sequence - b.sequence);
    this.drawPile = this.baseDeck.slice();
    this.shuffleDeck();
    for (const perk of this.perks) {
      if (this.cookieService.get('perk' + perk.sequence)) {
        perk.included = true;
      }
    }
  }

  shuffleDeck() {
    this.shuffle(this.drawPile);
  }

  endRound() {
    // remove curse, bless, and negOne cards from discard pile only
    this.discardPile = this.discardPile.filter(c => c.filename !== this.curse.filename && c.filename !== this.bless.filename);
    // combine discard and draw piles into draw pile
    this.drawPile = this.drawPile.concat(this.discardPile);
    this.discardPile = [];
    this.shuffleDeck();
  }

  shuffle(array: Card[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  togglePerk(perk: Perk) {
    if (perk.included) {
      for (const card of perk.addedCards) {
        this.drawPile = this.drawPile.filter(c => c.filename !== card.filename);
      }
    } else {
      this.drawPile.push(...perk.addedCards);
      if (perk.removedFilenames) {
        for (const filename of perk.removedFilenames) {
          this.drawPile = this.drawPile.filter(c => c.filename !== filename);
        }
      }
    }
    perk.included = !perk.included;
    this.shuffleDeck();
    if (perk.included) {
      this.cookieService.set('perk' + perk.sequence, 'true');
    } else {
      this.cookieService.delete('perk' + perk.sequence);
    }
  }

  drawCard() {
    const card = this.drawPile.pop();
    if (card) {
      this.discardPile.unshift(card);
    }
  }

  addCurse() {
    this.drawPile.push({
      filename: 'gh-am-pm-01.png',
      name: '*0',
    });
    this.shuffleDeck();
  }

  addBless() {
    this.drawPile.push({
      filename: 'gh-am-pm-11.png',
      name: '*2',
    });
    this.shuffleDeck();
  }

  addNegOne() {
    this.drawPile.push({
      filename: 'gh-am-pm-21.png',
      name: '-1',
    });
    this.shuffleDeck();
  }

  removeNegOne() {
    let found = this.drawPile.find(c => c.filename === this.negOne.filename);
    if (found) {
      this.drawPile = this.drawPile.filter(c => c !== found);
    }
    this.shuffleDeck();
  }

}

export interface Card {
  name?: string;
  filename?: string;
}

export interface Perk {
  text: string;
  removedFilenames?: string[];
  addedCards: Card[];
  sequence: number;
  included?: boolean;
}

