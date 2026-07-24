/* =========================================================
 * app.js ―― 改良メダカ図鑑 表示ロジック
 * window.MEDAKA_DATA（品種） と window.MEDAKA_CLASSIFICATION（分類）を
 * 読み込んで、一覧カード・絞り込み・詳細を描画する。
 * ========================================================= */
(function () {
  "use strict";

  var DATA = window.MEDAKA_DATA || {};
  var CLS  = window.MEDAKA_CLASSIFICATION || {};
  // テンプレート行(m000)や status:"template" は表示しない
  var LIST = (DATA.medakaList || []).filter(function (m) {
    return m && m.id && m.status !== "template" && m.id !== "m000";
  });

  // filters:{categoryKey:value} / sort:並び順 / filterOpen:絞り込みパネルの開閉
  var state = { q: "", filters: {}, sort: "name", filterOpen: false };

  // ---- 体色→カードの背景色（写真が無い間のプレースホルダ）----
  var COLOR_MAP = {
    "黄金":"#c9a227","琥珀":"#b5651d","楊貴妃(朱赤)":"#c0392b","朱赤":"#c0392b",
    "オレンジ":"#e67e22","ピンク":"#e08aa8","ピュアホワイト(白)":"#8fa3b0","白":"#8fa3b0",
    "スカイブルー(青)":"#5b8fb0","青":"#5b8fb0","シルバー":"#9aa7b4","黄":"#d4b106",
    "ブラック":"#2c3138","オロチ":"#20242a","和墨":"#3b4650","茶":"#8a6d3b"
  };
  function colorOf(m){
    var c = m.phenotype && m.phenotype.bodyColor;
    return COLOR_MAP[c] || "#5a6b7a";
  }
  function initial(m){ return (m.name || "?").slice(0,1); }
  // 体色を暗くしてグラデーションの片側の色を作る（f<1で暗く）
  function shade(hex, f){
    hex = String(hex).replace("#","");
    if (hex.length !== 6) return hex;
    var r = Math.round(parseInt(hex.substr(0,2),16)*f);
    var g = Math.round(parseInt(hex.substr(2,2),16)*f);
    var b = Math.round(parseInt(hex.substr(4,2),16)*f);
    return "rgb("+r+","+g+","+b+")";
  }
  function gradOf(m){ var c = colorOf(m); return "linear-gradient(135deg,"+c+","+shade(c,0.6)+")"; }
  /* 写真が無い間のプレースホルダ：分類で描き分けるシルエット
     ―― 同じ体色の品種でも見分けられるようにするため。
     phenotype（体型・ヒレ・目・虹色素胞・柄）と refTags を主に使い、
     JMA分類の語彙に無い形質（菱尾・モルフォ・メラー・鱗光・一周光）は品種名から補う。 */

  // ラメの粒を置く相対位置（胴体の半径に対する比率。乱数を使わず毎回同じ絵にする）
  var LAME_DOTS = [[-.58,-.10],[-.34,.28],[-.08,-.38],[.16,.08],[-.44,.02],
                   [.04,.40],[.36,-.24],[.28,.30],[-.18,-.06],[.52,.04],[-.70,.22],[.12,-.14]];
  // 尾ビレ（つけ根を原点0,28として描き、あとで胴体の後端へ移動させる）
  var TAILS = {
    normal : '<path d="M0 28 L30 13 L25 28 L30 43 Z"/>',
    hikari : '<path d="M0 28 L18 14 L36 28 L18 42 Z"/>',           // 菱形
    daruma : '<path d="M0 28 L26 16 L22 28 L26 40 Z"/>',
    "long" : '<path d="M0 28 C13 6 30 2 36 8 C30 18 26 24 24 28 '+
             'C26 32 30 38 36 48 C30 54 13 50 0 28 Z"/>',           // ヒレ長
    swallow: '<path d="M0 28 L28 10 L22 22 L33 20 L24 29 L33 36 L22 34 L28 46 Z"/>',
    morpho : '<path d="M0 28 L30 10 L27 15 L32 14 L28 20 L33 21 L29 26 L32 28 '+
             'L29 30 L33 35 L28 36 L32 42 L27 41 L30 46 Z"/>'      // 扇状＋鋸歯
  };

  function fishSVG(m, w){
    w = w || 84;
    var h = Math.round(w*0.51);
    var p  = (m && m.phenotype) || {};
    var tg = ((m && m.refTags) || []).join(",");
    var nm = (m && m.name) || "";
    // 分類欄に入りきらない形質は、品種名と説明文からも読み取る
    var txt = nm + "／" + ((m && m.description) || "");
    var bt = p.bodyType||"", fin = p.finVariation||"", ir = p.iridophore||"",
        ev = p.eyeVariation||"", pat = p.pattern||"";

    var isDaruma = bt.indexOf("ダルマ") >= 0;
    var isHalf   = bt.indexOf("半ダルマ") >= 0;
    var isHikari = bt.indexOf("ヒカリ") >= 0;
    // JMA分類の語彙に無い形質（菱尾・モルフォ・メラー・鱗光・一周光）
    var hisio  = /菱尾/.test(txt);
    var morpho = /モルフォ/.test(txt);
    var mellor = /メラー/.test(txt);
    var rinkou = /鱗光/.test(txt);
    var isshu  = /一周光/.test(txt);

    var longFin = /ヒレ長|ロングフィン/.test(fin) || /ヒレ長/.test(tg) || /ロングフィン/.test(txt);
    var swallow = /スワロー/.test(fin) || /スワロー/.test(tg);
    var samurai = /サムライ|セルフィン/.test(fin) || /サムライ/.test(tg);
    var marco   = /マルコ/.test(fin) || /マルコ|背ビレがない|背ビレが無い/.test(txt);
    var wide    = /ワイドフィン/.test(fin) || /ワイドフィン/.test(txt);

    // ---- 胴体（体型で形を変える）----
    var cy = 28, cx, rx, ry, eyeX;
    if (isDaruma)      { cx=46; rx=22; ry=17;   eyeX=34; }   // 丸く短い
    else if (isHalf)   { cx=44; rx=26; ry=14.5; eyeX=29; }
    else               { cx=42; rx=30; ry=12;   eyeX=25; }
    var body = '<ellipse cx="'+cx+'" cy="'+cy+'" rx="'+rx+'" ry="'+ry+'"/>';
    var tailX = cx + rx - 2;

    // ---- 尾ビレ ----
    var tailKey = "normal";
    if (swallow)                      tailKey = "swallow";
    else if (morpho)                  tailKey = "morpho";
    else if (longFin)                 tailKey = "long";
    else if (isHikari || hisio)       tailKey = "hikari";   // 菱形（菱尾は普通体型でも菱形）
    else if (isDaruma)                tailKey = "daruma";
    var tail = '<g transform="translate('+tailX+',0)">'+TAILS[tailKey]+'</g>';

    // ---- 背ビレ（ヒレ変化で描き分け）----
    var fx = cx - 7, topY = cy - ry + 1;
    // ヒレの先端の高さ。ダルマ体型など胴が高い品種で枠外へはみ出さないよう上限を設ける
    function up(d){ return Math.max(2, topY - d).toFixed(1); }
    var dorsal;
    if (marco){                      // マルコ：背ビレが無い
      dorsal = "";
    } else if (samurai){             // サムライ：背ビレが2枚に分かれる
      dorsal = '<polygon points="'+(fx-3)+' '+topY+' '+(fx+2)+' '+up(9)+' '+(fx+4)+' '+topY+'"/>'+
               '<polygon points="'+(fx+7)+' '+topY+' '+(fx+12)+' '+up(8)+' '+(fx+14)+' '+topY+'"/>';
    } else if (mellor){              // メラー：ヒレが複数枚に分かれる
      dorsal = '<polygon points="'+fx+' '+topY+' '+(fx+3)+' '+up(10)+' '+(fx+5)+' '+topY+'"/>'+
               '<polygon points="'+(fx+7)+' '+topY+' '+(fx+10)+' '+up(11)+' '+(fx+12)+' '+topY+'"/>'+
               '<polygon points="'+(fx+14)+' '+topY+' '+(fx+17)+' '+up(9)+' '+(fx+19)+' '+topY+'"/>';
    } else if (swallow){             // スワロー：一部だけ不規則に長く伸びる
      dorsal = '<polygon points="'+fx+' '+topY+' '+(fx+5)+' '+up(17)+' '+(fx+8)+' '+up(5)+' '+(fx+13)+' '+topY+'"/>';
    } else if (longFin){             // ヒレ長：ゆったり大きく伸びる
      dorsal = '<path d="M'+fx+' '+topY+' C'+(fx+8)+' '+up(16)+' '+(fx+20)+' '+up(18)+' '+
               (fx+22)+' '+up(9)+' C'+(fx+17)+' '+up(4)+' '+(fx+10)+' '+up(1)+' '+(fx+6)+' '+topY+' Z"/>';
    } else if (wide){                // ワイドフィン：幅が広い
      dorsal = '<polygon points="'+(fx-3)+' '+topY+' '+(fx+2)+' '+up(11)+' '+(fx+14)+' '+up(11)+' '+(fx+18)+' '+topY+'"/>';
    } else {
      dorsal = '<polygon points="'+fx+' '+topY+' '+(fx+9)+' '+up(10)+' '+(fx+13)+' '+topY+'"/>';
    }
    // 尻ビレは背ビレを上下反転して描く（ヒカリ体型は上下対称になる）
    var analBase = marco
      ? '<polygon points="'+fx+' '+topY+' '+(fx+9)+' '+up(9)+' '+(fx+13)+' '+topY+'"/>'
      : dorsal;
    var anal = '<g transform="translate(0,'+(2*cy)+') scale(1,-1)">'+analBase+'</g>';

    // ---- 柄（斑・三色・二色）----
    var patt = "";
    if (/斑|錦/.test(pat) || nm.indexOf("錦") >= 0){
      patt = '<g fill="rgba(0,0,0,.22)">'+
        '<ellipse cx="'+(cx-rx*.32).toFixed(1)+'" cy="'+(cy-ry*.32).toFixed(1)+'" rx="'+(rx*.20).toFixed(1)+'" ry="'+(ry*.34).toFixed(1)+'"/>'+
        '<ellipse cx="'+(cx+rx*.26).toFixed(1)+'" cy="'+(cy+ry*.24).toFixed(1)+'" rx="'+(rx*.15).toFixed(1)+'" ry="'+(ry*.30).toFixed(1)+'"/>'+
      '</g>';
    } else if (/三色|更紗/.test(pat)){
      patt = '<ellipse cx="'+(cx-rx*.34).toFixed(1)+'" cy="'+cy+'" rx="'+(rx*.26).toFixed(1)+'" ry="'+(ry*.72).toFixed(1)+'" fill="rgba(255,255,255,.42)"/>'+
             '<ellipse cx="'+(cx+rx*.30).toFixed(1)+'" cy="'+(cy-ry*.22).toFixed(1)+'" rx="'+(rx*.17).toFixed(1)+'" ry="'+(ry*.34).toFixed(1)+'" fill="rgba(0,0,0,.22)"/>';
    } else if (/二色/.test(pat)){
      patt = '<ellipse cx="'+(cx-rx*.36).toFixed(1)+'" cy="'+cy+'" rx="'+(rx*.34).toFixed(1)+'" ry="'+(ry*.80).toFixed(1)+'" fill="rgba(255,255,255,.34)"/>';
    }

    // ---- 虹色素胞・うろこの質感 ----
    var tex = "";
    if (/ラメ/.test(ir) || /ラメ/.test(tg)){          // ラメ：うろこ一枚ずつの粒
      var dots = "";
      for (var i=0; i<LAME_DOTS.length; i++){
        dots += '<circle cx="'+(cx+LAME_DOTS[i][0]*rx).toFixed(1)+'" cy="'+(cy+LAME_DOTS[i][1]*ry).toFixed(1)+'" r="1.5"/>';
      }
      tex += '<g fill="rgba(255,255,255,.58)">'+dots+'</g>';
    }
    if (/体外光/.test(ir) || /体外光/.test(tg)){      // 体外光：背に走る光の筋
      tex += '<path d="M'+(cx-rx+7)+' '+(cy-ry+2.5).toFixed(1)+' L'+(cx+rx-7)+' '+(cy-ry+1.5).toFixed(1)+
             '" stroke="rgba(255,255,255,.72)" stroke-width="2.6" stroke-linecap="round" fill="none"/>';
    }
    if (/体内光/.test(ir)){                            // 体内光：体の内側がぼんやり光る
      tex += '<ellipse cx="'+cx+'" cy="'+cy+'" rx="'+(rx*.52).toFixed(1)+'" ry="'+(ry*.40).toFixed(1)+'" fill="rgba(255,255,255,.30)"/>';
    }
    if (rinkou){                                       // 鱗光：網目状の光
      tex += '<g stroke="rgba(255,255,255,.40)" stroke-width="1" fill="none">'+
        '<path d="M'+(cx-rx*.6).toFixed(1)+' '+(cy-ry*.5).toFixed(1)+' L'+(cx+rx*.1).toFixed(1)+' '+(cy+ry*.5).toFixed(1)+'"/>'+
        '<path d="M'+(cx-rx*.2).toFixed(1)+' '+(cy-ry*.6).toFixed(1)+' L'+(cx+rx*.5).toFixed(1)+' '+(cy+ry*.4).toFixed(1)+'"/>'+
        '<path d="M'+(cx-rx*.6).toFixed(1)+' '+(cy+ry*.4).toFixed(1)+' L'+(cx+rx*.1).toFixed(1)+' '+(cy-ry*.6).toFixed(1)+'"/>'+
        '<path d="M'+(cx-rx*.1).toFixed(1)+' '+(cy+ry*.55).toFixed(1)+' L'+(cx+rx*.55).toFixed(1)+' '+(cy-ry*.45).toFixed(1)+'"/>'+
      '</g>';
    }
    if (isshu){                                        // 一周光：体の輪郭が光る
      tex += '<ellipse cx="'+cx+'" cy="'+cy+'" rx="'+(rx-1.5)+'" ry="'+(ry-1.5)+
             '" fill="none" stroke="rgba(255,255,255,.50)" stroke-width="1.4"/>';
    }
    if (/ブラックリム/.test(tg)){                      // ブラックリム：うろこの黒い縁取り
      tex += '<g fill="none" stroke="rgba(0,0,0,.34)" stroke-width="1">'+
        '<circle cx="'+(cx-rx*.20).toFixed(1)+'" cy="'+(cy-ry*.20).toFixed(1)+'" r="2.6"/>'+
        '<circle cx="'+(cx+rx*.16).toFixed(1)+'" cy="'+(cy+ry*.18).toFixed(1)+'" r="2.6"/>'+
        '<circle cx="'+(cx+rx*.42).toFixed(1)+'" cy="'+(cy-ry*.26).toFixed(1)+'" r="2.4"/>'+
      '</g>';
    }
    if (/透明鱗/.test(tg)){                            // 透明鱗：エラ蓋が赤く見える
      tex += '<path d="M'+(eyeX+7)+' '+(cy-4)+' Q'+(eyeX+10)+' '+cy+' '+(eyeX+7)+' '+(cy+4)+
             '" stroke="rgba(214,86,86,.62)" stroke-width="2" fill="none" stroke-linecap="round"/>';
    }

    // ---- 目（目の変化で描き分け）----
    var eyeR = 3.1, eyeFill = "rgba(0,0,0,.30)", eyeCx = eyeX, eyeCy = cy - ry*0.30, ring = "";
    if (/スモールアイ/.test(ev))      { eyeR = 1.5; }
    else if (/ビッグアイ/.test(ev))   { eyeR = 4.6; }
    else if (/出目/.test(ev))         { eyeR = 4.0; eyeCy = cy - ry*0.44;
                                        ring = '<circle cx="'+eyeCx+'" cy="'+eyeCy.toFixed(1)+'" r="'+(eyeR+1.3)+
                                               '" fill="none" stroke="rgba(0,0,0,.26)" stroke-width="1"/>'; }
    else if (/パンダ/.test(ev))       { eyeR = 3.8; eyeFill = "rgba(0,0,0,.62)"; }
    if (/アルビノ|ルビーアイ/.test(ev) || /アルビノ/.test(tg)) eyeFill = "rgba(214,78,110,.85)";
    if (/ブルーアイ/.test(ev))        eyeFill = "rgba(70,140,210,.85)";
    if (/目前/.test(ev))              eyeCx = eyeX - 4;   // 目が斜め前を向く
    var eye = ring + '<circle cx="'+eyeCx+'" cy="'+eyeCy.toFixed(1)+'" r="'+eyeR+'" fill="'+eyeFill+'"/>';

    // 半透明鱗・透明鱗は胴体を薄くして透け感を出す
    var bodyAlpha = (/半透明鱗|オーロラ/.test(tg)) ? ".24" : (/透明鱗/.test(tg) ? ".27" : ".34");

    return '<svg viewBox="0 0 110 56" width="'+w+'" height="'+h+'" aria-hidden="true">'+
      '<g fill="rgba(255,255,255,'+bodyAlpha+')">'+dorsal+anal+tail+body+'</g>'+
      patt+tex+eye+
    '</svg>';
  }

  /* ---------- 形質アイコン（カード・詳細で共用） ---------- */
  var TRAIT_ICONS = {
    "ラメ":'<svg width="10" height="10" viewBox="0 0 10 10"><path d="M5 0 L6.2 3.8 L10 5 L6.2 6.2 L5 10 L3.8 6.2 L0 5 L3.8 3.8 Z" fill="#c9a227"/></svg>',
    "体外光":'<svg width="10" height="10" viewBox="0 0 10 10"><path d="M1 5 H9" stroke="#5b8fb0" stroke-width="2.5" stroke-linecap="round"/></svg>',
    "ヒレ長":'<svg width="10" height="10" viewBox="0 0 10 10"><path d="M1 7 C4 1 6 9 9 3" stroke="#7a6fb0" stroke-width="1.6" fill="none" stroke-linecap="round"/></svg>',
    "ダルマ":'<svg width="10" height="10" viewBox="0 0 10 10"><circle cx="5" cy="5" r="4" fill="#d1785a"/></svg>',
    "アルビノ":'<svg width="10" height="10" viewBox="0 0 10 10"><circle cx="5" cy="5" r="3.4" fill="none" stroke="#d05a7a" stroke-width="1.6"/></svg>',
    "透明鱗":'<svg width="10" height="10" viewBox="0 0 10 10"><path d="M5 1 L9 5 L5 9 L1 5 Z" fill="none" stroke="#6aa9a0" stroke-width="1.4"/></svg>',
    "スワロー":'<svg width="10" height="10" viewBox="0 0 10 10"><path d="M1 2 L5 6 L9 2" stroke="#7a6fb0" stroke-width="1.6" fill="none" stroke-linecap="round"/></svg>',
    "ブラックリム":'<svg width="10" height="10" viewBox="0 0 10 10"><circle cx="5" cy="5" r="3.4" fill="none" stroke="#4a5058" stroke-width="2"/></svg>'
  };
  // refTags と phenotype から代表的な形質を最大4つ拾う
  function traitsOf(m){
    var p = m.phenotype || {}, out = [], seen = {};
    function add(k){ if (TRAIT_ICONS[k] && !seen[k]){ seen[k]=1; out.push(k); } }
    (m.refTags||[]).forEach(function(t){
      if (/ラメ/.test(t)) add("ラメ");
      else if (/体外光/.test(t)) add("体外光");
      else if (/リアルロングフィン|ヒレ長/.test(t)) add("ヒレ長");
      else if (/スワロー/.test(t)) add("スワロー");
      else if (/アルビノ/.test(t)) add("アルビノ");
      else if (/透明鱗/.test(t)) add("透明鱗");
      else if (/ブラックリム/.test(t)) add("ブラックリム");
      else if (/ダルマ/.test(t)) add("ダルマ");
    });
    if (/ラメ/.test(p.iridophore||"")) add("ラメ");
    if (/体外光/.test(p.iridophore||"")) add("体外光");
    if (/ヒレ長|リアルロングフィン/.test(p.finVariation||"")) add("ヒレ長");
    if (/スワロー/.test(p.finVariation||"")) add("スワロー");
    if (/ダルマ/.test(p.bodyType||"")) add("ダルマ");
    if (/アルビノ/.test(p.eyeVariation||"")) add("アルビノ");
    return out.slice(0,4);
  }
  function traitChips(m){
    return traitsOf(m).map(function(t){
      return '<span class="trait">'+TRAIT_ICONS[t]+esc(t)+'</span>';
    }).join("");
  }
  // 作出年から西暦4桁だけ取り出す（「2020年4月」「2016年以前（要確認）」等に対応）
  function yearOf(m){
    var y = ((m.origin||{}).year)||"";
    var mt = y.match(/(\d{4})/);
    return mt ? mt[1] : "";
  }
  function esc(s){
    return String(s==null?"":s).replace(/[&<>"']/g,function(c){
      return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];
    });
  }

  /* ---------- 分類フィルタUIの生成（折りたたみ式） ----------
     データ中に実在する値だけをチップにする。既定は閉じた状態で、
     一覧が画面上部にすぐ現れるようにする。 */
  function catGroups(){
    return (CLS.categories || []).map(function(cat){
      var vals = {};
      LIST.forEach(function(m){
        var v = m.phenotype && m.phenotype[cat.key];
        if (v) vals[v] = true;
      });
      return { cat: cat, keys: Object.keys(vals) };
    }).filter(function(g){ return g.keys.length; });
  }

  function buildFilters(){
    var panel = document.getElementById("filterPanel");
    panel.innerHTML = catGroups().map(function(g){
      return '<div class="filter-group"><span class="group-label">'+esc(g.cat.label)+'</span>'+
        g.keys.map(function(v){
          return '<button class="chip'+(state.filters[g.cat.key]===v?" active":"")+
            '" data-k="'+esc(g.cat.key)+'" data-v="'+esc(v)+'">'+esc(v)+'</button>';
        }).join("")+'</div>';
    }).join("");
    panel.classList.toggle("hidden", !state.filterOpen);

    Array.prototype.forEach.call(panel.querySelectorAll(".chip"), function(chip){
      chip.onclick = function(){
        var k = chip.dataset.k, v = chip.dataset.v;
        if (state.filters[k] === v) delete state.filters[k];
        else state.filters[k] = v;
        buildFilters(); renderActiveChips(); render();
      };
    });
    // 絞り込みボタンに件数を出す
    var n = Object.keys(state.filters).length;
    var btn = document.getElementById("btnFilter");
    btn.classList.toggle("on", state.filterOpen || n > 0);
    btn.innerHTML = '絞り込み'+(n?'（'+n+'）':'')+'<span class="caret">▾</span>';
  }

  /* 適用中のフィルタをチップ表示（×で個別解除） */
  function renderActiveChips(){
    var box = document.getElementById("activeChips");
    var keys = Object.keys(state.filters);
    if (!keys.length){ box.innerHTML = ""; return; }
    box.innerHTML = keys.map(function(k){
      return '<span class="active-chip">'+esc(state.filters[k])+
             '<button data-rm="'+esc(k)+'" aria-label="解除">×</button></span>';
    }).join("");
    Array.prototype.forEach.call(box.querySelectorAll("[data-rm]"), function(b){
      b.onclick = function(){
        delete state.filters[b.dataset.rm];
        buildFilters(); renderActiveChips(); render();
      };
    });
  }

  /* ---------- 並び替え ---------- */
  function sortList(arr){
    var a = arr.slice();
    if (state.sort === "year"){
      a.sort(function(x,y){ return (Number(yearOf(y))||0) - (Number(yearOf(x))||0); });
    } else if (state.sort === "diff"){
      a.sort(function(x,y){ return ((y.care||{}).difficulty||0) - ((x.care||{}).difficulty||0); });
    } else {
      a.sort(function(x,y){
        return (x.reading||x.name).localeCompare(y.reading||y.name,"ja");
      });
    }
    return a;
  }

  /* ---------- 絞り込み ---------- */
  function match(m){
    // 検索語
    if (state.q){
      var hay = [m.name,m.reading,(m.aliases||[]).join(" ")].join(" ").toLowerCase();
      if (hay.indexOf(state.q.toLowerCase()) < 0) return false;
    }
    // 分類フィルタ
    for (var k in state.filters){
      if (!m.phenotype || m.phenotype[k] !== state.filters[k]) return false;
    }
    return true;
  }

  /* ---------- カード一覧 ---------- */
  function render(){
    var grid = document.getElementById("cardGrid");
    var shown = sortList(LIST.filter(match));
    grid.innerHTML = "";
    shown.forEach(function(m){
      var card = document.createElement("div");
      card.className = "card";
      var draft = m.status==="draft" ? '<span class="badge-draft">調査中</span>' : "";
      // 難易度・作出年（データがあるものだけ出す）
      var d = (m.care||{}).difficulty, y = yearOf(m), meta = [];
      if (d) meta.push('<span class="stars">'+starMarks(d)+'</span>');
      if (y) meta.push('<span>'+y+'年</span>');
      card.innerHTML =
        '<div class="card-photo" style="background:'+gradOf(m)+'">'+fishSVG(m,84)+'</div>'+
        '<div class="card-info">'+
          '<p class="card-name">'+esc(m.name)+draft+'</p>'+
          '<p class="card-reading">'+esc(m.reading||"")+'</p>'+
          '<div class="card-tags">'+traitChips(m)+'</div>'+
          (meta.length ? '<div class="card-meta">'+meta.join("")+'</div>' : "")+
        '</div>';
      card.onclick = function(){ openDetail(m); };
      grid.appendChild(card);
    });
    document.getElementById("resultCount").textContent =
      shown.length + " 品種を表示中（全 " + LIST.length + " 品種）";
  }

  /* ---------- 詳細モーダル ---------- */
  function row(label,val){
    return '<tr><th>'+esc(label)+'</th><td>'+(val||'<span class="empty">調査中</span>')+'</td></tr>';
  }
  function starMarks(n){
    var s=""; for(var i=1;i<=5;i++) s+= i<=n?"★":"☆";
    return s;
  }
  function stars(n){
    if(!n) return '<span class="empty">調査中</span>';
    return '<span class="stars">'+starMarks(n)+'</span>（'+n+'/5）';
  }
  function fixationText(arr){
    if(!arr||!arr.length) return "";
    return arr.map(function(f){
      return esc(f.rate)+"（出所："+esc(f.source||"不明")+"／"+esc(f.checkedOn||"時点不明")+"）";
    }).join("<br>");
  }
  function nameById(id){
    var f = LIST.filter(function(m){return m.id===id;})[0];
    return f ? f.name : id;
  }
  function byId(id){ return LIST.filter(function(m){return m.id===id;})[0]; }
  function childrenOf(id){
    return LIST.filter(function(m){
      return ((m.lineage||{}).parentIds||[]).indexOf(id) >= 0;
    });
  }

  /* ---------- 系統ツリー（親→本種→子。クリックでその品種へ移動） ----------
     親子データが無い品種では、空欄を作らないためセクションごと出さない。 */
  function lineageSection(m){
    var parents  = ((m.lineage||{}).parentIds||[]).map(byId).filter(Boolean);
    var children = childrenOf(m.id);
    if (!parents.length && !children.length) return "";
    function node(x){ return '<button class="lin-node" data-go="'+esc(x.id)+'">'+esc(x.name)+'</button>'; }
    var self = '<span class="lin-node self">'+esc(m.name)+'</span>';
    var rows = "";
    if (parents.length){
      rows += '<div class="lin-row"><span class="lin-label">親</span>'+
        parents.map(node).join('<span class="lin-arrow">＋</span>')+
        '<span class="lin-arrow">→</span>'+self+'</div>';
    }
    if (children.length){
      // 基本品種は派生が非常に多いため、並べるのは先頭だけにして残りは件数で示す
      var LIMIT = 12;
      var shownKids = children.slice(0, LIMIT).map(node).join(" ");
      if (children.length > LIMIT){
        shownKids += '<span class="lin-more">ほか'+(children.length-LIMIT)+'件</span>';
      }
      rows += '<div class="lin-row"><span class="lin-label">子</span>'+self+
        '<span class="lin-arrow">→</span>'+shownKids+'</div>';
    }
    return '<div class="detail-section"><h3>系統</h3><div class="lineage">'+rows+'</div>'+
           '<div class="ref-note">クリックでその品種へ移動できます</div></div>';
  }

  /* ---------- 相場（価格） ---------- */
  var PRICES = (window.MEDAKA_PRICES && window.MEDAKA_PRICES.records) || [];
  function yen(n){ return (n==null) ? "—" : "¥" + Number(n).toLocaleString("ja-JP"); }
  function latestPrice(id){
    var rs = PRICES.filter(function(r){ return r.id === id; });
    if(!rs.length) return null;
    rs.sort(function(a,b){ return a.checkedOn < b.checkedOn ? 1 : -1; });
    return rs[0];
  }
  function priceSection(m){
    var r = latestPrice(m.id);
    if(!r){
      return '<div class="detail-section"><h3>相場</h3>'+
             '<p class="empty">まだ価格データがありません（収集前）</p></div>';
    }
    var STAGES = [["egg","卵"],["fry","針子"],["adult","成魚"]];
    var rows = STAGES.map(function(s){
      var d = r.stages && r.stages[s[0]];
      if(!d || !d.count){
        return '<tr><th>'+s[1]+'</th><td colspan="5"><span class="empty">データなし</span></td></tr>';
      }
      var minCell = d.minUrl
        ? '<a class="src-link" href="'+esc(d.minUrl)+'" target="_blank" rel="noopener">'+yen(d.min)+'</a>'
        : yen(d.min);
      return '<tr><th>'+s[1]+'</th><td>'+minCell+'</td><td>'+yen(d.avg)+'</td><td>'+yen(d.max)+
             '</td><td>'+d.count+'件</td><td class="ref-note">'+esc(d.note||"")+'</td></tr>';
    }).join("");
    return '<div class="detail-section"><h3>相場</h3>'+
      '<table class="spec-table price-table">'+
        '<tr><th></th><th>最安</th><th>平均</th><th>最高</th><th>件数</th><th>備考</th></tr>'+
        rows+
      '</table>'+
      '<div class="ref-note">出所：<a class="src-link" href="'+esc(r.searchUrl)+'" target="_blank" rel="noopener">'+
        esc(r.source)+'</a> ／ 調査日：'+esc(r.checkedOn)+'（参考価格。数量・サイズは出品により異なります）</div>'+
    '</div>';
  }

  function openDetail(m){
    var p = m.phenotype || {};
    var o = m.origin || {};
    var care = m.care || {};
    var body = document.getElementById("detailBody");

    var phenoRows =
      row("体色",esc(p.bodyColor)) + row("柄",esc(p.pattern)) +
      row("虹色素胞",esc(p.iridophore)) + row("体型",esc(p.bodyType)) +
      row("ヒレ変化",esc(p.finVariation)) + row("目の変化",esc(p.eyeVariation));

    var lineage = m.lineage || {};
    var parents = (lineage.parentIds||[]).map(nameById).map(esc).join("、");
    var similar = (m.similarIds||[]).map(nameById).map(esc).join("、");

    var refTags = (m.refTags||[]).map(function(t){return '<span class="mini-tag">'+esc(t)+'</span>';}).join(" ");

    var photos = (m.photos||[]).map(function(ph){
      if(ph.mode==="link"){
        return '<li><a class="src-link" href="'+esc(ph.url)+'" target="_blank" rel="noopener">'+
               esc(ph.caption||"参考写真（外部サイト）")+'</a> ／ '+esc(ph.credit||"")+
               ' <span class="ref-note">['+esc(ph.usage||"参照リンク")+']</span></li>';
      }
      return '<li>'+esc(ph.file)+'（'+esc(ph.credit||"自己撮影")+'）</li>';
    }).join("");

    var sources = (m.sources||[]).map(function(s){
      return '<li><a class="src-link" href="'+esc(s.url)+'" target="_blank" rel="noopener">'+esc(s.url)+'</a>'+
             ' <span class="ref-note">（参照：'+esc(s.referencedOn||"")+'）</span></li>';
    }).join("");

    body.innerHTML =
      '<button class="detail-close" data-close="1" aria-label="閉じる">×</button>'+
      '<div class="detail-hero" style="background:'+gradOf(m)+'">'+fishSVG(m,118)+'</div>'+
      '<div class="detail-body">'+
        '<h2>'+esc(m.name)+(m.status==="draft"?' <span class="badge-draft">調査中</span>':'')+'</h2>'+
        '<p class="detail-reading">'+esc(m.reading||"")+'</p>'+
        ((m.aliases&&m.aliases.length)?'<p class="detail-aliases">別名：'+esc(m.aliases.join("、"))+'</p>':'')+
        (traitsOf(m).length?'<div class="tag-row" style="margin-bottom:12px">'+traitChips(m)+'</div>':'')+

        '<div class="detail-section"><h3>基本情報</h3><table class="spec-table">'+
          row("管理ID",esc(m.id))+
          row("作出者",esc(o.breeder))+
          row("作出年",esc(o.year))+
          row("系統（血統）",esc(lineage.strain))+
          row("親品種",parents)+
          row("固定率",fixationText(m.fixation))+
          row("飼育難易度",stars(care.difficulty))+
        '</table></div>'+

        lineageSection(m)+

        '<div class="detail-section"><h3>分類（JMA第5版）</h3><table class="spec-table">'+phenoRows+'</table>'+
          (refTags?'<div class="ref-note">参考タグ：</div><div class="tag-row">'+refTags+'</div>':'')+
        '</div>'+

        '<div class="detail-section"><h3>説明</h3><p>'+(esc(m.description)|| '<span class="empty">調査中</span>')+'</p></div>'+
        '<div class="detail-section"><h3>作出の経緯</h3><p>'+(esc(o.story)|| '<span class="empty">調査中</span>')+'</p></div>'+

        '<div class="detail-section"><h3>飼育のポイント</h3>'+
          ((care.points&&care.points.length)?'<ul>'+care.points.map(function(x){return '<li>'+esc(x)+'</li>';}).join("")+'</ul>':'<p class="empty">調査中</p>')+
        '</div>'+

        priceSection(m)+

        (similar?'<div class="detail-section"><h3>類似する品種</h3><p>'+similar+'</p></div>':'')+

        '<div class="detail-section"><h3>写真</h3>'+
          (photos?'<ul>'+photos+'</ul>':'<p class="empty">写真は準備中です（外部リンクまたは自己撮影を登録予定）</p>')+
        '</div>'+

        '<div class="detail-section"><h3>情報源</h3>'+
          (sources?'<ul>'+sources+'</ul>':'<p class="empty">調査中</p>')+
        '</div>'+
      '</div>';

    // 系統ツリーのノードをクリックしたら、その品種の詳細に切り替える
    Array.prototype.forEach.call(body.querySelectorAll("[data-go]"), function(b){
      b.onclick = function(){
        var t = byId(b.dataset.go);
        if (t){ openDetail(t); document.querySelector(".modal").scrollTop = 0; }
      };
    });

    document.getElementById("detailModal").classList.remove("hidden");
  }

  function closeDetail(){ document.getElementById("detailModal").classList.add("hidden"); }

  /* =========================================================
   * 交配予測（assets/genetics.js の計算結果を表示する）
   * 簡易：親の品種を選ぶだけ／詳細：遺伝子型を上書きできる
   * ======================================================= */
  var GEN = window.MEDAKA_GENETICS;
  var breed = { a:"", b:"", advanced:false, override:{ a:{}, b:{} } };

  var STATE_LABEL = { homo:"持っている（姿に出る）", hetero:"隠し持っている", none:"持っていない" };

  function varietyOptions(sel){
    var opts = ['<option value="">品種を選ぶ…</option>'];
    var sortedList = LIST.slice().sort(function(x,y){
      return (x.reading||x.name).localeCompare(y.reading||y.name,"ja");
    });
    for (var i=0;i<sortedList.length;i++){
      var m = sortedList[i];
      opts.push('<option value="'+esc(m.id)+'"'+(sel===m.id?" selected":"")+'>'+esc(m.name)+'</option>');
    }
    return opts.join("");
  }

  // 詳細指定：予測対象の形質ごとに遺伝子型を選ばせる
  function genotypeRows(side){
    var id = breed[side]; if(!id) return "";
    var m = byId(id); if(!m) return "";
    var defs = GEN.predictableTraits(), rows = [];
    for (var i=0;i<defs.length;i++){
      var t = defs[i];
      var cur = breed.override[side][t.key] || GEN.inferGenotype(m, t.key);
      var sel = ["homo","hetero","none"].map(function(v){
        return '<option value="'+v+'"'+(cur===v?" selected":"")+'>'+STATE_LABEL[v]+'</option>';
      }).join("");
      rows.push('<label class="gt-row"><span>'+esc(t.label)+'</span>'+
        '<select data-side="'+side+'" data-trait="'+esc(t.key)+'">'+sel+'</select></label>');
    }
    return '<div class="gt-box">'+rows.join("")+'</div>';
  }

  // 上書き指定を反映した親オブジェクトを作る
  function parentWithOverride(side){
    var m = byId(breed[side]); if(!m) return null;
    var ov = breed.override[side];
    var copy = {}; for (var k in m) copy[k] = m[k];
    var g = {}; for (var k2 in (m.genotype||{})) g[k2] = m.genotype[k2];
    for (var k3 in ov) g[k3] = ov[k3];
    copy.genotype = g;
    return copy;
  }

  function renderBreed(){
    var box = document.getElementById("breedBody");
    var html =
      '<div class="breed-pick">'+
        '<label class="breed-sel"><span>父（オス）</span><select id="breedA">'+varietyOptions(breed.a)+'</select>'+
          (breed.advanced?genotypeRows("a"):"")+'</label>'+
        '<span class="breed-x" aria-hidden="true">×</span>'+
        '<label class="breed-sel"><span>母（メス）</span><select id="breedB">'+varietyOptions(breed.b)+'</select>'+
          (breed.advanced?genotypeRows("b"):"")+'</label>'+
      '</div>'+
      '<label class="breed-adv"><input type="checkbox" id="breedAdv"'+(breed.advanced?" checked":"")+'>'+
        ' 詳細指定（親が隠し持つ形質を自分で指定する）</label>'+
      '<div id="breedResult" class="breed-result"></div>';
    box.innerHTML = html;

    document.getElementById("breedA").onchange = function(e){ breed.a = e.target.value; breed.override.a = {}; renderBreed(); };
    document.getElementById("breedB").onchange = function(e){ breed.b = e.target.value; breed.override.b = {}; renderBreed(); };
    document.getElementById("breedAdv").onchange = function(e){ breed.advanced = e.target.checked; renderBreed(); };
    var sels = box.querySelectorAll("select[data-trait]");
    for (var i=0;i<sels.length;i++){
      sels[i].onchange = function(e){
        breed.override[e.target.dataset.side][e.target.dataset.trait] = e.target.value;
        renderBreed();
      };
    }
    renderBreedResult();
  }

  function renderBreedResult(){
    var el = document.getElementById("breedResult");
    if (!breed.a || !breed.b){
      el.innerHTML = '<p class="empty">父と母の品種を選ぶと、子に出る形質の見込みを表示します。</p>';
      return;
    }
    var A = parentWithOverride("a"), B = parentWithOverride("b");
    var res = GEN.predict(A, B);

    // 関係のある形質だけ表を作る
    var rows = [], targets = [];
    for (var i=0;i<res.traits.length;i++){
      var t = res.traits[i];
      if (!t.relevant) continue;
      targets.push(t);
      rows.push('<tr><th>'+esc(t.label)+'</th>'+
        '<td>'+GEN.pct(t.appearF1)+'</td>'+
        '<td>'+GEN.pct(t.carrierF1)+'</td>'+
        '<td>'+GEN.pct(t.appearF2)+'</td></tr>');
    }

    var table = rows.length
      ? '<table class="spec-table breed-table">'+
          '<tr><th></th><th>子(F1)に出る</th><th>子が隠し持つ</th><th>孫(F2)で出る</th></tr>'+
          rows.join("")+
        '</table>'
      : '<p class="empty">選んだ2品種には、予測できる形質（ヒカリ体型・ダルマ・アルビノ・透明鱗・スモールアイ）が含まれていません。</p>';

    // 複数形質を同時に狙う場合
    var combo = "";
    if (targets.length >= 2){
      var f1r = [], f2r = [], labels = [];
      for (var j=0;j<targets.length;j++){
        f1r.push(targets[j].appearF1); f2r.push(targets[j].appearF2); labels.push(targets[j].label);
      }
      var c1 = GEN.combined(f1r), c2 = GEN.combined(f2r);
      combo = '<div class="breed-combo"><b>'+esc(labels.join("＋"))+'</b> をすべて備えた子が出る見込み：'+
        '子(F1) '+GEN.pct(c1)+'／孫(F2) '+GEN.pct(c2)+
        '<span class="ref-note">（孫の代で100匹あたり約'+GEN.per100(c2)+'匹の目安）</span></div>';
    }

    // 予測できない項目と注記（当てずっぽうを出さない姿勢を明示）
    var exList = [];
    for (var k=0;k<res.excluded.length;k++){
      exList.push('<li>'+esc(res.excluded[k].label)+'<span class="ref-note">…'+esc(res.excluded[k].reason)+'</span></li>');
    }
    var noteList = [];
    for (var n=0;n<res.notes.length;n++) noteList.push('<li>'+esc(res.notes[n])+'</li>');

    el.innerHTML = table + combo +
      '<details class="breed-more"><summary>予測できない項目と注意</summary>'+
        '<p class="ref-note">次の項目は複数の遺伝子や環境で決まるため、計算せずに除外しています。</p>'+
        '<ul class="breed-ex">'+exList.join("")+'</ul>'+
        '<ul class="breed-ex">'+noteList.join("")+'</ul>'+
      '</details>';
  }

  /* ---------- 初期化 ---------- */
  function init(){
    var sub = document.getElementById("subtitle");
    if(!LIST.length){
      sub.textContent = "まだ品種が登録されていません（data/medaka-data.js に追記してください）";
    } else {
      sub.textContent = "全 "+LIST.length+" 品種／分類："+(CLS.version||"JMA準拠");
    }
    buildFilters();
    renderActiveChips();
    render();

    document.getElementById("searchBox").addEventListener("input",function(e){
      state.q = e.target.value; render();
    });
    // 絞り込みパネルの開閉
    document.getElementById("btnFilter").addEventListener("click",function(){
      state.filterOpen = !state.filterOpen;
      buildFilters();
    });
    // 並び替え
    document.getElementById("selSort").addEventListener("change",function(e){
      state.sort = e.target.value; render();
    });
    // 交配予測パネルの開閉
    var bb = document.getElementById("btnBreed");
    if (bb && GEN){
      bb.addEventListener("click", function(){
        var body = document.getElementById("breedBody");
        var open = body.classList.toggle("hidden") === false;
        bb.setAttribute("aria-expanded", open ? "true" : "false");
        bb.classList.toggle("on", open);
        if (open && !body.innerHTML) renderBreed();
      });
    }
    document.getElementById("detailModal").addEventListener("click",function(e){
      if(e.target.getAttribute("data-close")) closeDetail();
    });
    document.addEventListener("keydown",function(e){ if(e.key==="Escape") closeDetail(); });
  }

  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",init);
  else init();
})();
