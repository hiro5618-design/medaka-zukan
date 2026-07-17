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

  var state = { q: "", filters: {} };  // filters: {categoryKey: value}

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
  // 写真が無い間のプレースホルダ：メダカのシルエット（案A）
  function fishSVG(w){
    w = w || 84; var h = Math.round(w*0.51);
    return '<svg viewBox="0 0 110 56" width="'+w+'" height="'+h+'" aria-hidden="true">'+
      '<g fill="rgba(255,255,255,.34)">'+
        '<ellipse cx="42" cy="28" rx="30" ry="12"/>'+
        '<polygon points="70,28 100,13 95,28 100,43"/>'+
        '<polygon points="40,17 52,7 56,19"/>'+
        '<polygon points="40,39 52,49 56,37"/>'+
      '</g>'+
      '<circle cx="25" cy="24" r="3.1" fill="rgba(0,0,0,.26)"/>'+
    '</svg>';
  }
  function esc(s){
    return String(s==null?"":s).replace(/[&<>"']/g,function(c){
      return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];
    });
  }

  /* ---------- 分類フィルタUIの生成 ---------- */
  function buildFilters(){
    var area = document.getElementById("filterArea");
    var cats = CLS.categories || [];
    area.innerHTML = "";
    cats.forEach(function(cat){
      // データ中に実在する値だけをチップにする
      var vals = {};
      LIST.forEach(function(m){
        var v = m.phenotype && m.phenotype[cat.key];
        if (v) vals[v] = true;
      });
      var keys = Object.keys(vals);
      if (!keys.length) return;
      var group = document.createElement("div");
      group.className = "filter-group";
      group.innerHTML = '<span class="group-label">'+esc(cat.label)+'</span>';
      keys.forEach(function(v){
        var chip = document.createElement("button");
        chip.className = "chip";
        chip.textContent = v;
        chip.onclick = function(){
          if (state.filters[cat.key] === v){ delete state.filters[cat.key]; chip.classList.remove("active"); }
          else {
            // 同カテゴリの他チップを解除
            Array.prototype.forEach.call(group.querySelectorAll(".chip"),function(c){c.classList.remove("active");});
            state.filters[cat.key] = v; chip.classList.add("active");
          }
          render();
        };
        group.appendChild(chip);
      });
      area.appendChild(group);
    });
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
    var shown = LIST.filter(match);
    grid.innerHTML = "";
    shown.forEach(function(m){
      var card = document.createElement("div");
      card.className = "card";
      var tags = [];
      var p = m.phenotype || {};
      [p.bodyColor,p.iridophore,p.finVariation].forEach(function(t){ if(t && t!=="なし") tags.push(t); });
      var draft = m.status==="draft" ? '<span class="badge-draft">調査中</span>' : "";
      card.innerHTML =
        '<div class="card-photo" style="background:'+gradOf(m)+'">'+fishSVG(84)+'</div>'+
        '<div class="card-info">'+
          '<p class="card-name">'+esc(m.name)+draft+'</p>'+
          '<p class="card-reading">'+esc(m.reading||"")+'</p>'+
          '<div class="card-tags">'+tags.map(function(t){return '<span class="mini-tag">'+esc(t)+'</span>';}).join("")+'</div>'+
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
  function stars(n){
    if(!n) return '<span class="empty">調査中</span>';
    var s=""; for(var i=1;i<=5;i++) s+= i<=n?"★":"☆";
    return '<span class="stars">'+s+'</span>（'+n+'/5）';
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
      '<div class="detail-hero" style="background:'+gradOf(m)+'">'+fishSVG(118)+'</div>'+
      '<div class="detail-body">'+
        '<h2>'+esc(m.name)+(m.status==="draft"?' <span class="badge-draft">調査中</span>':'')+'</h2>'+
        '<p class="detail-reading">'+esc(m.reading||"")+'</p>'+
        ((m.aliases&&m.aliases.length)?'<p class="detail-aliases">別名：'+esc(m.aliases.join("、"))+'</p>':'')+

        '<div class="detail-section"><h3>基本情報</h3><table class="spec-table">'+
          row("管理ID",esc(m.id))+
          row("作出者",esc(o.breeder))+
          row("作出年",esc(o.year))+
          row("系統（血統）",esc(lineage.strain))+
          row("親品種",parents)+
          row("固定率",fixationText(m.fixation))+
          row("飼育難易度",stars(care.difficulty))+
        '</table></div>'+

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

    document.getElementById("detailModal").classList.remove("hidden");
  }

  function closeDetail(){ document.getElementById("detailModal").classList.add("hidden"); }

  /* ---------- 初期化 ---------- */
  function init(){
    var sub = document.getElementById("subtitle");
    if(!LIST.length){
      sub.textContent = "まだ品種が登録されていません（data/medaka-data.js に追記してください）";
    } else {
      sub.textContent = "全 "+LIST.length+" 品種／分類："+(CLS.version||"JMA準拠");
    }
    buildFilters();
    render();

    document.getElementById("searchBox").addEventListener("input",function(e){
      state.q = e.target.value; render();
    });
    document.getElementById("detailModal").addEventListener("click",function(e){
      if(e.target.getAttribute("data-close")) closeDetail();
    });
    document.addEventListener("keydown",function(e){ if(e.key==="Escape") closeDetail(); });
  }

  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",init);
  else init();
})();
