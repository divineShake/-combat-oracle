const UI = {
  init() {
    this.cache();
    this.buildHeroPanel();
    this.bindEvents();
    this.render();
  },

  cache() {
    this.tierSelect = document.getElementById("tier");
    this.enemySelect = document.getElementById("enemy");
    this.result = document.getElementById("result");
    this.score = document.getElementById("score");
    this.cards = document.getElementById("cards");
    this.firstCard = document.querySelector(".card");
  },

  buildHeroPanel() {
    if (document.getElementById("heroPanel")) return;

    this.firstCard.insertAdjacentHTML("beforeend", `
      <hr>
      <h2>英雄選択</h2>

      <label>ディフェンダー
        <select id="heroDefender"></select>
      </label>

      <label>アタッカー
        <select id="heroAttacker"></select>
      </label>

      <label>レンジャー
        <select id="heroRanger"></select>
      </label>

      <label>
        <input type="checkbox" id="rallyLeader">
        ラリーリーダーとして計算
      </label>
    `);

    this.fillHeroSelect("heroDefender", "Defender");
    this.fillHeroSelect("heroAttacker", "Attacker");
    this.fillHeroSelect("heroRanger", "Ranger");
  },

  fillHeroSelect(id, role) {
    const select = document.getElementById(id);
    select.innerHTML = HERO_DATA[role]
      .map(hero => {
        const gen = hero.generation === 0 ? "なし" : `第${hero.generation}世代`;
        return `<option value="${hero.id}">${hero.name} / ${gen}</option>`;
      })
      .join("");
  },

  bindEvents() {
    [
      this.tierSelect,
      this.enemySelect,
      document.getElementById("heroDefender"),
      document.getElementById("heroAttacker"),
      document.getElementById("heroRanger"),
      document.getElementById("rallyLeader")
    ].forEach(el => el.addEventListener("change", () => this.render()));

    window.calc = () => this.render();
  },

  render() {
    const sim = BattleEngine.simulate({
      tier: Number(this.tierSelect.value || 11),
      enemyMode: this.enemySelect.value,
      rallyLeader: document.getElementById("rallyLeader").checked,
      selectedHeroes: {
        Defender: document.getElementById("heroDefender").value,
        Attacker: document.getElementById("heroAttacker").value,
        Ranger: document.getElementById("heroRanger").value
      }
    });

    this.result.textContent = sim.diff >= 0 ? "味方優勢" : "敵優勢";
    this.score.textContent = `味方指数 ${sim.allyTotal} / 敵指数 ${sim.enemyTotal} / 差分 ${sim.diff}`;

    this.cards.innerHTML = sim.rows.map(row => `
      <div class="card">
        <h2>${row.roleName} T${row.tier}</h2>
        <p><b>${row.result}</b></p>
        <p>
          戦闘力 ${row.troop.power}<br>
          攻撃 ${row.troop.attack}<br>
          防御 ${row.troop.defense}<br>
          体力 ${row.troop.hp}<br>
          殺傷力(貫通力) ${row.troop.lethality}<br>
          積載量 ${row.troop.load}
        </p>
        <p>味方指数 ${row.allyIndex} / 敵指数 ${row.enemyIndex}</p>
      </div>
    `).join("");
  }
};