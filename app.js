console.log("Combat Oracle Ver.0.4 起動");

document.addEventListener("DOMContentLoaded", () => {

  const tierSelect = document.getElementById("tier");

  const enemySelect = document.getElementById("enemy");

  const result = document.getElementById("result");

  const score = document.getElementById("score");

  const cards = document.getElementById("cards");

  const firstCard = document.querySelector(".card");

  if (!document.getElementById("heroPanel")) {

    firstCard.insertAdjacentHTML("beforeend", `

      <hr>

      <h2>英雄選択</h2>

      <select id="heroDefender"></select>

      <select id="heroAttacker"></select>

      <select id="heroRanger"></select>

      <label>

        <input type="checkbox" id="rallyLeader">

        ラリーリーダーとして計算

      </label>

    `);

  }

  function fillHeroSelect(id, role) {

    const select = document.getElementById(id);

    select.innerHTML = HERO_DATA[role]

      .map(h => `<option value="${h.id}">${h.name} / 第${h.generation}世代</option>`)

      .join("");

  }

  fillHeroSelect("heroDefender", "Defender");

  fillHeroSelect("heroAttacker", "Attacker");

  fillHeroSelect("heroRanger", "Ranger");

  function round(n) {

    return Math.round(n * 100) / 100;

  }

  function heroBonus(role) {

    const idMap = {

      Defender: "heroDefender",

      Attacker: "heroAttacker",

      Ranger: "heroRanger"

    };

    const selectedId = document.getElementById(idMap[role]).value;

    const hero = HERO_DATA[role].find(h => h.id === selectedId);

    if (!hero || hero.id === "none") return 0;

    return hero.generation * 3;

  }

  function calcIndex(troop, role) {

    const bonus = heroBonus(role);

    const attack = troop.attack * (1 + bonus / 100);

    const defense = troop.defense * (1 + bonus / 100);

    const hp = troop.hp * (1 + bonus / 100);

    const lethality = troop.lethality * (1 + bonus / 100);

    return round(

      attack * (1 + lethality / 100) +

      defense * (1 + hp / 100)

    );

  }

  function render() {

    const tier = Number(tierSelect.value || 11);

    const enemyMode = enemySelect.value;

    const isRallyLeader = document.getElementById("rallyLeader").checked;

    let allyTotal = 0;

    let enemyTotal = 0;

    let html = "";

    Object.keys(TROOP_DATA).forEach((roleKey) => {

      const role = TROOP_DATA[roleKey];

      const troop = role.tiers.find((t) => t.tier === tier);

      if (!troop) return;

      let allyIndex = calcIndex(troop, roleKey);

      if (isRallyLeader) {

        allyIndex = round(allyIndex * 1.08);

      }

      const enemyIndex = enemyMode === "strong"

        ? round(allyIndex * 2.85)

        : allyIndex;

      allyTotal += allyIndex;

      enemyTotal += enemyIndex;

      html += `

        <div class="card">

          <h2>${role.name} T${tier}</h2>

          <p><b>${enemyIndex > allyIndex ? "敵優勢" : "味方優勢"}</b></p>

          <p>

            戦闘力 ${troop.power}<br>

            攻撃 ${troop.attack}<br>

            防御 ${troop.defense}<br>

            体力 ${troop.hp}<br>

            殺傷力(貫通力) ${troop.lethality}<br>

            積載量 ${troop.load}

          </p>

          <p>味方指数 ${allyIndex} / 敵指数 ${enemyIndex}</p>

        </div>

      `;

    });

    allyTotal = round(allyTotal);

    enemyTotal = round(enemyTotal);

    const diff = round(allyTotal - enemyTotal);

    result.textContent = diff >= 0 ? "味方優勢" : "敵優勢";

    score.textContent = `味方指数 ${allyTotal} / 敵指数 ${enemyTotal} / 差分 ${diff}`;

    cards.innerHTML = html;

  }

  [

    tierSelect,

    enemySelect,

    document.getElementById("heroDefender"),

    document.getElementById("heroAttacker"),

    document.getElementById("heroRanger"),

    document.getElementById("rallyLeader")

  ].forEach(el => el.addEventListener("change", render));

  window.calc = render;

  render();

});