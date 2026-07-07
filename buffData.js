const BUFF_DATA = {

  vip: {

    name: "VIP11",

    enabled: true,

    all: { attack: 14, defense: 14, hp: 14, lethality: 0 }

  },

  research: {

    name: "通常研究",

    enabled: true,

    all: { attack: 34.25, defense: 34.25, hp: 34.25, lethality: 34.25 }

  },

  luminousResearch: {

    name: "ルミニウム研究",

    enabled: true,

    all: { attack: 0, defense: 0, hp: 0, lethality: 0 },

    Defender: { attack: 14, defense: 14, hp: 0, lethality: 20 },

    Attacker: { attack: 0, defense: 0, hp: 0, lethality: 1.5 },

    Ranger: { attack: 8.5, defense: 0, hp: 0, lethality: 15 }

  },

  consumable: {

    name: "戦闘アイテム",

    enabled: false,

    all: { attack: 0, defense: 0, hp: 0, lethality: 0 }

  }

};