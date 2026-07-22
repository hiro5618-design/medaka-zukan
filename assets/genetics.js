/* =========================================================
 * genetics.js ―― 交配予測（メンデルの法則による参考計算）
 * ---------------------------------------------------------
 * 【方針】当てずっぽうは出さない。
 *   ・遺伝の型がはっきりしている「劣性形質」だけを計算対象にする
 *     （classification.js の predictableTraits に定義）
 *   ・体色・ラメ・体外光・柄などは複数の遺伝子と環境で決まるため
 *     計算せず「予測対象外」と明示する
 *   ・結果はあくまで「参考値」。実際は系統や個体差で変わる
 *
 * 遺伝子型の表し方
 *   "AA" … 純系（劣性形質が姿に出ている）      ＝ 劣性ホモ
 *   "Aa" … 隠し持っている（姿には出ない）      ＝ ヘテロ
 *   "aa" … 持っていない                        ＝ 顕性ホモ
 *   ※読みやすさのため、コード内では
 *     "homo"(出ている) / "hetero"(隠し持つ) / "none"(持たない) と呼ぶ
 * ========================================================= */
(function (global) {
  "use strict";

  /* ---- 予測できる形質（分類マスタから読み込む。無ければ既定値） ---- */
  function predictableTraits(){
    var cls = global.MEDAKA_CLASSIFICATION || {};
    return cls.predictableTraits || [
      { key:"albino",      label:"アルビノ",     inheritance:"劣性" },
      { key:"hikariType",  label:"ヒカリ体型",   inheritance:"劣性" },
      { key:"daruma",      label:"ダルマ",       inheritance:"劣性" },
      { key:"transparent", label:"透明鱗",       inheritance:"劣性" },
      { key:"smallEye",    label:"スモールアイ", inheritance:"劣性" }
    ];
  }

  /* ---- 品種データのどこを見てその形質を判定するか ---- */
  var DETECT = {
    albino:      function(m){ return /アルビノ/.test(txt(m)); },
    hikariType:  function(m){ return /ヒカリ/.test((m.phenotype||{}).bodyType||""); },
    daruma:      function(m){ return /ダルマ/.test((m.phenotype||{}).bodyType||""); },
    transparent: function(m){ return /透明鱗/.test(txt(m)); },   // 半透明鱗も含む
    smallEye:    function(m){ return /スモールアイ/.test(txt(m)); }
  };
  function txt(m){
    var p = m.phenotype || {};
    return [p.bodyColor,p.pattern,p.iridophore,p.bodyType,p.finVariation,p.eyeVariation]
      .concat(m.refTags||[]).join(" ");
  }

  /* ---- 見た目から遺伝子型を推定する（簡易モード） ----
     姿に出ていれば "homo"（劣性ホモ）。
     出ていない場合は本当は "hetero"(隠し持つ) か "none" か区別できないため、
     既定では "none" とし、その旨を注記で伝える。 */
  function inferGenotype(variety, traitKey){
    var g = (variety.genotype || {})[traitKey];
    if (g === "homo" || g === "hetero" || g === "none") return g;  // データにあれば優先
    var det = DETECT[traitKey];
    return (det && det(variety)) ? "homo" : "none";
  }

  /* ---- 片親が作る配偶子の割合 ----
     homo(劣性ホモ) → 劣性遺伝子を必ず1つ渡す         : {r:1}
     hetero         → 半々                              : {r:0.5, d:0.5}
     none           → 劣性遺伝子を渡さない              : {d:1} */
  function gametes(state){
    if (state === "homo")   return { r:1,   d:0   };
    if (state === "hetero") return { r:0.5, d:0.5 };
    return { r:0, d:1 };
  }

  /* ---- 1形質の交配結果（子の遺伝子型の割合）を計算する ---- */
  function crossTrait(stateA, stateB){
    var a = gametes(stateA), b = gametes(stateB);
    var rr = a.r * b.r;                       // 劣性ホモ＝姿に出る
    var rd = a.r * b.d + a.d * b.r;           // ヘテロ＝隠し持つ
    var dd = a.d * b.d;                       // 持たない
    return { homo: rr, hetero: rd, none: dd };
  }

  /* ---- 孫（F2）で出る割合：F1どうしを掛けた場合 ----
     F1の遺伝子型の分布から、F2で劣性形質が姿に出る割合を求める */
  function f2Rate(f1){
    // F1が渡す劣性遺伝子の確率 ＝ homo*1 + hetero*0.5
    var p = f1.homo * 1 + f1.hetero * 0.5;
    return p * p;   // 両親から劣性を受け取る確率
  }

  /* ---- 2品種の交配を予測する（本体） ----
     戻り値：
       traits[]  … 形質ごとの予測（F1の割合・F2の見込み）
       excluded[]… 予測対象外の項目（体色など）と、その理由
       notes[]   … 注意書き */
  function predict(parentA, parentB){
    var defs = predictableTraits(), traits = [];
    for (var i = 0; i < defs.length; i++){
      var t = defs[i];
      var sa = inferGenotype(parentA, t.key);
      var sb = inferGenotype(parentB, t.key);
      var f1 = crossTrait(sa, sb);
      traits.push({
        key: t.key, label: t.label, inheritance: t.inheritance,
        parentA: sa, parentB: sb,
        f1: f1,                     // 子（F1）の遺伝子型の割合
        appearF1: f1.homo,          // F1で姿に出る割合
        carrierF1: f1.hetero,       // F1で隠し持つ割合
        appearF2: f2Rate(f1),       // F1どうしを掛けたときのF2で出る割合
        relevant: !(sa === "none" && sb === "none")   // どちらも無関係なら表示しない
      });
    }

    // 予測できない項目を明示する（当てずっぽうを出さないため）
    var excluded = [
      { label:"体色（朱赤・青・黄金など）", reason:"複数の遺伝子と環境で決まるため" },
      { label:"ラメの量・色",               reason:"複数の遺伝子が関わり数値化できないため" },
      { label:"体外光の伸び",               reason:"遺伝以外に水温・餌・選別の影響が大きいため" },
      { label:"柄（三色・斑など）",         reason:"出方が個体ごとに大きく異なるため" }
    ];

    var notes = [
      "この予測はメンデルの法則にもとづく参考値です。実際は系統や個体差で変わります。",
      "対象は遺伝の型がはっきりしている劣性形質のみです。"
    ];
    if (usesInference(parentA, parentB, traits)) {
      notes.push("姿に出ていない形質は「持たない」と仮定して計算しています。親が隠し持っている可能性がある場合は、詳細指定で遺伝子型を上書きしてください。");
    }
    return { traits: traits, excluded: excluded, notes: notes };
  }
  function usesInference(a, b, traits){
    var ga = a.genotype || {}, gb = b.genotype || {};
    for (var i = 0; i < traits.length; i++){
      if (!ga[traits[i].key] || !gb[traits[i].key]) return true;
    }
    return false;
  }

  /* ---- 逆引き：目標の形質を出すための掛け方を提案する ---- */
  function suggest(targetKeys, parentA, parentB){
    var out = [], defs = predictableTraits();
    for (var n = 0; n < targetKeys.length; n++){
      var key = targetKeys[n], t = null;
      for (var i = 0; i < defs.length; i++) if (defs[i].key === key) t = defs[i];
      if (!t) continue;
      var sa = parentA ? inferGenotype(parentA, key) : null;
      var sb = parentB ? inferGenotype(parentB, key) : null;
      var steps;
      if (sa === "homo" && sb === "homo"){
        steps = ["両親ともにこの形質を持っているため、子（F1）の100%に現れます。"];
      } else if (sa === "homo" || sb === "homo"){
        var f2 = 0.25;
        steps = [
          "1代目（F1）：片親だけが持つため、子には現れません（全員が隠し持ちます）。",
          "2代目（F2）：その子どうしを掛けると、約" + pct(f2) + "で現れます。"
        ];
      } else {
        steps = [
          "この形質を持つ個体を親のどちらかに使う必要があります。",
          "持つ個体 × 持たない個体 → F1は全員が隠し持つ",
          "F1どうしを掛ける → F2で約25%に現れる"
        ];
      }
      out.push({ key:key, label:t.label, steps:steps });
    }
    return out;
  }

  /* ---- 複数形質を同時に狙う場合の確率（それぞれ独立と仮定して掛け合わせる） ---- */
  function combined(rates){
    var p = 1;
    for (var i = 0; i < rates.length; i++) p *= rates[i];
    return p;
  }

  function pct(x){
    if (x <= 0) return "0%";
    var v = x * 100;
    return (v < 1 ? v.toFixed(1) : Math.round(v)) + "%";
  }
  /* 100匹あたりの目安（イメージしやすくするため） */
  function per100(x){ return Math.round(x * 100); }

  global.MEDAKA_GENETICS = {
    predictableTraits: predictableTraits,
    inferGenotype: inferGenotype,
    crossTrait: crossTrait,
    predict: predict,
    suggest: suggest,
    combined: combined,
    pct: pct,
    per100: per100
  };
})(window);
