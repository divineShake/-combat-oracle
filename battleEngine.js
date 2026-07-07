const BattleEngine = {
  round(n) {
    return Math.round(n * 100) / 100;
  },

  heroBonus(roleKey, heroId) {
    const heroes = HERO_DATA[roleKey] || [];
    const hero = heroes.find(h => h.id === heroId);
    if (!hero || hero.id === "none") return 0;
    return hero.generation * 3;
  },

  totalBuff(roleKey) {
    const total = { attack: 0, defense: 0, hp: 0, lethality: 0 };

    Object.values(BUFF_DATA).forEach(buff => {
      if (!buff.enabled) return;

      if (buff.all) {
        total.attack += buff.all.attack || 0;
        total.defense += buff.all.defense || 0;
        total.hp += buff.all.hp || 0;
        total.lethality += buff.all.lethality || 0;
      }

      if (buff[roleKey]) {
        total.attack += buff[roleKey].attack || 0;
        total.defense += buff[roleKey].defense || 0;
        total.hp += buff[roleKey].hp || 0;
        total.lethality += buff[roleKey].lethality || 0;
      }
    });

    return total;
  },

  calcTroopIndex(troop, roleKey, heroId, options = {}) {
    const bonus = this.heroBonus(roleKey, heroId);
    const buff = this.totalBuff(roleKey);

    let attack = troop.attack * (1 + (bonus + buff.attack) / 100);
    let defense = troop.defense * (1 + (bonus + buff.defense) / 100);
    let hp = troop.hp * (1 + (bonus + buff.hp) / 100);
    let lethality = troop.lethality * (1 + (bonus + buff.lethality) / 100);

    let index =
      attack * (1 + lethality / 100) +
      defense * (1 + hp / 100);

    if (options.rallyLeader) {
      index *= 1.08;
    }

    return this.round(index);
  },

  simulate({ tier, enemyMode, selectedHeroes, rallyLeader }) {
    let allyTotal = 0;
    let enemyTotal = 0;
    const rows = [];

    Object.keys(TROOP_DATA).forEach(roleKey => {
      const role = TROOP_DATA[roleKey];
      const troop = role.tiers.find(t => t.tier === tier);
      if (!troop) return;

      const heroId = selectedHeroes[roleKey] || "none";

      const allyIndex = this.calcTroopIndex(troop, roleKey, heroId, {
        rallyLeader
      });

      const enemyIndex =
        enemyMode === "strong"
          ? this.round(allyIndex * 2.85)
          : allyIndex;

      allyTotal += allyIndex;
      enemyTotal += enemyIndex;

      rows.push({
        roleKey,
        roleName: role.name,
        tier,
        troop,
        heroId,
        allyIndex,
        enemyIndex,
        result: enemyIndex > allyIndex ? "敵優勢" : "味方優勢"
      });
    });

    allyTotal = this.round(allyTotal);
    enemyTotal = this.round(enemyTotal);

    return {
      allyTotal,
      enemyTotal,
      diff: this.round(allyTotal - enemyTotal),
      rows
    };
  }
};