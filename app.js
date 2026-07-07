console.log("Combat Oracle Ver.0.3 起動");

document.addEventListener("DOMContentLoaded", () => {

  const tierSelect = document.getElementById("tier");

  const enemySelect = document.getElementById("enemy");

  const result = document.getElementById("result");

  const score = document.getElementById("score");

  const cards = document.getElementById("cards");

  function round(n) {

    return Math.round(n * 100) / 100;

  }

  function calcIndex(troop) {

    return round(

      troop.attack * (1 + troop.lethality / 100) +

      troop.defense * (1 + troop.hp / 100)

    );

  }

  function render() {

    const tier = Number(tierSelect.value || 11);

    const enemyMode = enemySelect.value;

    let allyTotal = 0;

    let enemyTotal = 0;

    let html = "";

    Object.keys(TROOP_DATA).forEach((roleKey) => {

      const role = TROOP_DATA[roleKey];

      const troop = role.tiers.find((t) => t.tier === tier);

      if (!troop) return;

      const allyIndex = calcIndex(troop);

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

  tierSelect.addEventListener("change", render);

  enemySelect.addEventListener("change", render);

  window.calc = render;

  render();

});