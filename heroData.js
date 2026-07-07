const HERO_DATA = {
  Defender: [
    { id: "none", name: "未選択", generation: 0, role: "Defender" },
    { id: "chris", name: "クリス", generation: 2, role: "Defender", battleRole: "防衛" },
    { id: "krauser", name: "クラウザー", generation: 2, role: "Defender" },
    { id: "jake", name: "ジェイク", generation: 4, role: "Defender" }
  ],

  Attacker: [
    { id: "none", name: "未選択", generation: 0, role: "Attacker" },
    { id: "rebecca", name: "レベッカ", generation: 2, role: "Attacker", battleRole: "防衛" }
  ],

  Ranger: [
    { id: "none", name: "未選択", generation: 0, role: "Ranger" },
    { id: "billy", name: "ビリー", generation: 2, role: "Ranger", battleRole: "集結参加" },
    { id: "piers", name: "ピアーズ", generation: 4, role: "Ranger" }
  ],

  Special: [
    { id: "leon", name: "レオン", generation: 1, special: "出撃しない状態でもバフ付与" },
    { id: "jill", name: "ジル", generation: 1, special: "出撃しない状態でもバフ付与" }
  ]
};