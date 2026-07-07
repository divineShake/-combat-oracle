console.log("Combat Oracle Ver.0.6 起動");

document.addEventListener("DOMContentLoaded", () => {

  const tierSelect = document.getElementById("tier");

  const enemySelect = document.getElementById("enemy");

  const result = document.getElementById("result");

  const score = document.getElementById("score");

  const cards = document.getElementById("cards");

  const firstCard = document.querySelector(".card");

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

  function fillHeroSelect(id, role) {

    const select = document.getElementById(id);

    select.innerHTML = HERO_DATA[role]

      .map(h => `<option value="${h.id}">${h.name} / 第${h.generation}世代</option>`)

      .join("");

  }

  fillHeroSelect("heroDefender", "Defender");

  fillHeroSelect("heroAttacker", "Attacker");

  fillHeroSelect("heroRanger", "Ranger");

  function render() {

    const sim = BattleEngine.simulate({

      tier: Number(tierSelect.value || 11),

      enemyMode: enemySelect.value,

      rallyLeader: document.getElementById("rallyLeader").checked,

      selectedHeroes: {

        Defender: document.getElementById("heroDefender").value,

        Attacker: document.getElementById("heroAttacker").value,

        Ranger: document.getElementById("heroRanger").value

      }

    });

    result.textContent = sim.diff >= 0 ? "味方優勢" : "敵優勢";

    score.textContent = `味方指数 ${sim.allyTotal} / 敵指数 ${sim.enemyTotal} / 差分 ${sim.diff}`;

    cards.innerHTML = sim.rows.map(row => `

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