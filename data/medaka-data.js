/* =====================================================================
 * medaka-data.js  ―― メダカ図鑑 品種データ本体
 * ---------------------------------------------------------------------
 * ・window.MEDAKA_DATA に品種の配列を埋め込む（fetchしない＝ローカルで開ける）。
 * ・主キーは不変の id（"m001" 形式）。品種名は表示用の属性。
 * ・データは「表現型（phenotype／図鑑・絞り込み用）」と「遺伝子型メモ（genotype／
 *   交配予測用・空欄可）」の2階建て。分類値は classification.js の categories に対応。
 * ・固定率・価格・写真・出典は「値＋出所＋時点／利用可否」をセットで持つ。
 *
 * ▼新しい品種を追加するときは m000 テンプレートをコピーして id を採番し、
 *   medakaList 配列に追記してください（zukan-builder係の担当）。
 * ===================================================================== */
window.MEDAKA_DATA = {

  dataVersion: "0.5",
  classificationRef: "JMA第5版",

  medakaList: [

    /* ---- 記入テンプレート（status:"template" は図鑑に表示されない）---- */
    {
      id: "m000", name: "（品種名）", reading: "（よみ）", aliases: [], status: "template",
      phenotype: { bodyColor:"", pattern:"", iridophore:"", bodyType:"", finVariation:"", eyeVariation:"" },
      refTags: [],
      lineage: { strain:"", parentIds:[] },
      origin: { breeder:"", year:"", story:"" },
      description: "",
      care: { difficulty:null, points:[] },
      fixation: [],
      photos: [],
      similarIds: [],
      genotype: {},
      myRecords: { keeping:[], breeding:[] },
      priceRef: { key:"m000" },
      sources: []
    },

    /* ============================ 代表10品種 ============================ */

    {
      id: "m001", name: "ヒメダカ", reading: "ひめだか",
      aliases: ["緋目高","緋メダカ","アカメダカ"], status: "done",
      phenotype: { bodyColor:"黄", pattern:"無地", iridophore:"なし", bodyType:"普通体型", finVariation:"なし", eyeVariation:"なし" },
      refTags: [],
      lineage: { strain:"野生型（クロメダカ）由来", parentIds:[] },
      origin: {
        breeder:"不明（江戸期からの選抜固定）", year:"不明",
        story:"野生型のクロメダカから黒色素を欠いた黄色い個体が自然に生まれ、それを江戸期の人々が選び抜いて固定したのが始まりとされています。作出者や正確な年代は記録が残っておらず不明です。"
      },
      description: "ヒメダカは、鮮やかな黄色の体色を持つメダカです。野生のクロメダカに現れた突然変異（黒色素が欠けて黄色くなる変化）を、江戸時代から選んで固定化した、改良メダカの中でも最も古い系統のひとつとされています。誰が・いつ作ったのかは分かっていません。\n\n丈夫で飼いやすく、学校教材や生き餌としても使われるなど、最も広く流通している品種です。楊貴妃をはじめ、後に生まれた多くの品種の交配のもとになっており、メダカ改良の歴史を語るうえで欠かせない存在といえます。",
      care: { difficulty:1, points:["非常に丈夫で初心者向け","水質・水温の適応範囲が広い","餌用・教材にも使われるほど飼育が容易"] },
      fixation: [],
      photos: [ { mode:"link", url:"https://medakazukan.net/", caption:"参考：改良メダカWEB図鑑", credit:"改良メダカWEB図鑑", usage:"参照リンクのみ（画像は転載しない）" } ],
      similarIds: ["m004"],
      genotype: {},
      myRecords: { keeping:[], breeding:[] },
      priceRef: { key:"m001" },
      sources: [ { url:"https://medakazukan.net/", referencedOn:"2026-07-16" } ]
    },

    {
      id: "m002", name: "白メダカ", reading: "しろめだか",
      aliases: ["シロメダカ"], status: "done",
      phenotype: { bodyColor:"ピュアホワイト(白)", pattern:"無地", iridophore:"なし", bodyType:"普通体型", finVariation:"なし", eyeVariation:"なし" },
      refTags: [],
      lineage: { strain:"野生型（原種）由来", parentIds:[] },
      origin: {
        breeder:"不明（江戸期からの選抜固定）", year:"不明",
        story:"野生型メダカの中から黒色素・黄色素が乏しい個体を見出し、選抜・固定を重ねて誕生したとされています。ヒメダカ同様、江戸期からの古い品種であり、作出者・年は明らかになっていません。"
      },
      description: "白メダカは、白から乳白色の体色を持つメダカです。野生型の中から黒色素・黄色素の少ない個体を選び、それを固定化して生まれました。ヒメダカと同じく江戸時代から存在する古参の品種です。\n\nメダカは魚類の中では珍しく「白色素胞」という白色を発現させる色素細胞を持っており、これによって白い体色を表現できます。作出者や年代は不明ですが、後年にはピュアホワイトなどの派生品種も生まれています。丈夫で飼育しやすい点も魅力です。",
      care: { difficulty:1, points:["丈夫で初心者向け","青水や暗色容器で白がより映える"] },
      fixation: [],
      photos: [ { mode:"link", url:"https://medakazukan.net/0043_siro/", caption:"参考：白メダカ No.0043（改良メダカWEB図鑑）", credit:"改良メダカWEB図鑑", usage:"参照リンクのみ（画像は転載しない）" } ],
      similarIds: [],
      genotype: {},
      myRecords: { keeping:[], breeding:[] },
      priceRef: { key:"m002" },
      sources: [ { url:"https://medakazukan.net/0043_siro/", referencedOn:"2026-07-16" } ]
    },

    {
      id: "m003", name: "幹之", reading: "みゆき",
      aliases: ["ミユキ","青体外光メダカ"], status: "done",
      phenotype: { bodyColor:"スカイブルー(青)", pattern:"無地", iridophore:"体外光(幹之)", bodyType:"普通体型", finVariation:"なし", eyeVariation:"なし" },
      refTags: ["体外光"],
      lineage: { strain:"青メダカ系（背中光強メダカ由来）", parentIds:[] },
      origin: {
        breeder:"菅高志（出品）／めだかの館（作出）", year:"2008年",
        story:"2007年、菅高志氏が「背中光強メダカ」として品評会に出品したのが始まりです。翌2008年にめだかの館が交配を重ねて品種として確立し、菅氏の娘の名前にちなんで「幹之」と名付けられました。当初は背中に点のように光る程度でしたが、約8年をかけた改良により、口先まで届く長い光を持つ個体へと発展しました。"
      },
      description: "幹之は、青みがかった体色に加えて、背中に光る「体外光」（虹色素胞という光を反射する色素細胞による輝き）が最大の魅力の品種です。光の伸び方によってグレードが分かれ、点状の弱い光から、口先まで届く「フルボディ」と呼ばれる強い光まで幅があります。\n\n楊貴妃と並んでメダカ改良品種を代表する存在で、ここから数多くの派生品種が生まれています。丈夫で飼育しやすく、初心者からベテランまで人気があります。",
      care: { difficulty:2, points:["丈夫で飼育しやすい","体外光の伸びは水温・餌・選別に影響される","若魚のうちから光を見て選別すると良い"] },
      fixation: [],
      photos: [ { mode:"link", url:"https://medakazukan.net/0100_miyukihikari/", caption:"参考：幹之 No.0100（改良メダカWEB図鑑）", credit:"改良メダカWEB図鑑", usage:"参照リンクのみ（画像は転載しない）" } ],
      similarIds: ["m010"],
      genotype: {},
      myRecords: { keeping:[], breeding:[] },
      priceRef: { key:"m003" },
      sources: [ { url:"https://medakazukan.net/0100_miyukihikari/", referencedOn:"2026-07-16" } ]
    },

    {
      id: "m004", name: "楊貴妃", reading: "ようきひ",
      aliases: ["ヨウキヒ"], status: "done",
      phenotype: { bodyColor:"楊貴妃(朱赤)", pattern:"無地", iridophore:"なし", bodyType:"普通体型", finVariation:"なし", eyeVariation:"なし" },
      refTags: [],
      lineage: { strain:"琥珀メダカ由来", parentIds:[] },
      origin: {
        breeder:"大場幸雄（めだかの館）", year:"2004年",
        story:"2004年、めだかの館の大場幸雄氏が、琥珀メダカから生まれた朱赤色の個体を選び出し、固定化したことで誕生しました。名前は中国の美女・楊貴妃に由来しています。"
      },
      description: "楊貴妃は、濃い朱赤色の体色が特徴の品種です。稚魚のうちは色が淡く、成長するにつれて朱赤に発色していきます。屋外飼育や色揚げ用の餌を与えることで、より色が濃くなる傾向があります。\n\n固定率（狙った特徴が安定して子に受け継がれる割合）は99%以上とされ、非常に安定した品種です。幹之と並ぶ二大代表品種として知られ、観賞用メダカのブームのきっかけをつくった存在でもあります。",
      care: { difficulty:1, points:["丈夫で初心者向け","屋外飼育や色揚げ餌で朱赤が濃くなる","成長とともに発色する"] },
      fixation: [ { rate:"99%以上", source:"改良メダカWEB図鑑 No.0001", checkedOn:"2026-07-16" } ],
      photos: [ { mode:"link", url:"https://medakazukan.net/0001_yokihi/", caption:"参考：楊貴妃 No.0001（改良メダカWEB図鑑）", credit:"改良メダカWEB図鑑", usage:"参照リンクのみ（画像は転載しない）" } ],
      similarIds: ["m001"],
      genotype: {},
      myRecords: { keeping:[], breeding:[] },
      priceRef: { key:"m004" },
      sources: [ { url:"https://medakazukan.net/0001_yokihi/", referencedOn:"2026-07-16" } ]
    },

    {
      id: "m005", name: "オロチ", reading: "おろち",
      aliases: ["大蛇"], status: "done",
      phenotype: { bodyColor:"オロチ", pattern:"無地", iridophore:"なし", bodyType:"普通体型", finVariation:"なし", eyeVariation:"なし" },
      refTags: [],
      lineage: { strain:"ブラックメダカ系（背地反応なし）", parentIds:[] },
      origin: {
        breeder:"谷國昌博（飛鳥めだか）", year:"2016年",
        story:"2016年、飛鳥めだかの谷國昌博氏が、ブラックメダカを白い容器の中で選別する方法により、約6年半という長い年月をかけて、色が落ちない黒色を固定しました。"
      },
      description: "オロチは、漆黒と呼べるほど濃い黒体色を持つ品種です。多くの黒っぽいメダカは、背景の色に反応して体色を薄くする「背地反応」により、白い容器で飼うと色が薄く見えてしまいますが、オロチは白色素胞・黄色素胞を持たないため、室内飼育や白い容器でも黒色が褪せないという特徴があります。\n\n現状では最も黒いメダカとされていますが、真っ黒な個体が生まれる割合は全体の約5割程度で、すべての稚魚が理想の黒色になるわけではありません。丈夫な品種でもあります。",
      care: { difficulty:2, points:["飼育は容易","より黒い個体を得るには選別が必要","白容器でも黒が落ちない"] },
      fixation: [ { rate:"真っ黒な個体は約50%", source:"aquaturtlium 等（一次数値は要確認）", checkedOn:"2026-07-16" } ],
      photos: [ { mode:"link", url:"https://medakazukan.net/0652_orichi/", caption:"参考：オロチ No.0652（改良メダカWEB図鑑）", credit:"改良メダカWEB図鑑", usage:"参照リンクのみ（画像は転載しない）" } ],
      similarIds: ["m006"],
      genotype: {},
      myRecords: { keeping:[], breeding:[] },
      priceRef: { key:"m005" },
      sources: [ { url:"https://medakazukan.net/0652_orichi/", referencedOn:"2026-07-16" } ]
    },

    {
      id: "m006", name: "ブラックダイヤ", reading: "ぶらっくだいや",
      aliases: [], status: "done",
      phenotype: { bodyColor:"ブラック", pattern:"無地", iridophore:"ラメ", bodyType:"普通体型", finVariation:"なし", eyeVariation:"なし" },
      refTags: ["ラメ"],
      lineage: { strain:"オロチ×青ラメ幹之(星河)", parentIds:["m005"] },
      origin: {
        breeder:"中里良則", year:"2018年",
        story:"2018年、中里良則氏がオロチと青ラメ幹之（星河）を交配し、黒い体色とラメの両方を併せ持つ個体を選抜・固定して作出しました。"
      },
      description: "ブラックダイヤは、純黒のボディに紫がかったラメ模様が輝く品種です。オロチの血を引いているため背地反応がなく、白い容器で飼育しても黒色が褪せないという特徴を受け継いでいます。\n\n固定率は約80%とされ、丈夫で繁殖もしやすいことから、黒とラメを両立させたい愛好家に人気があります。「黒いダイヤ」を意味する名前が、その輝きを端的に表しています。",
      care: { difficulty:2, points:["丈夫で繁殖も容易","暗色容器で黒がより映える"] },
      fixation: [ { rate:"約80%", source:"メダカ屋えん", checkedOn:"2026-07-16" } ],
      photos: [ { mode:"link", url:"https://medakazukan.net/0132_blackdia/", caption:"参考：ブラックダイヤ No.0132（改良メダカWEB図鑑）", credit:"改良メダカWEB図鑑", usage:"参照リンクのみ（画像は転載しない）" } ],
      similarIds: ["m005","m007"],
      genotype: {},
      myRecords: { keeping:[], breeding:[] },
      priceRef: { key:"m006" },
      sources: [ { url:"https://medakazukan.net/0132_blackdia/", referencedOn:"2026-07-16" } ]
    },

    {
      id: "m007", name: "サファイア", reading: "さふぁいあ",
      aliases: ["黒ラメ幹之サファイア系"], status: "done",
      phenotype: { bodyColor:"ブラック", pattern:"無地", iridophore:"ラメ", bodyType:"普通体型", finVariation:"なし", eyeVariation:"なし" },
      refTags: ["ラメ","体外光"],
      lineage: { strain:"黒ラメ幹之（静楽庵）由来", parentIds:[] },
      origin: {
        breeder:"静楽庵", year:"2020年",
        story:"2020年、静楽庵が黒ラメ幹之の中から、特に青みの強いラメを持つ個体を選び出し、選抜・固定を重ねて作出しました。"
      },
      description: "サファイアは、黒をベースに、宝石のサファイアを思わせる青いラメと体外光を併せ持つ品種です。上から見たときの美しさを重視して作られており、背ビレのない「マルコ」と呼ばれるタイプの個体も多く見られます。\n\n年に6世代というスピードで累代（世代を重ねて選抜すること）を重ねることで選別の精度を高め、特に青みの強いラメを安定して固定することに成功しています。丈夫な品種です。",
      care: { difficulty:2, points:["丈夫で飼育しやすい","黒・グリーン系容器で青ラメが映える","上見で楽しむと美しい"] },
      fixation: [],
      photos: [ { mode:"link", url:"https://medakazukan.net/0155_kuroramemiyukisafaiya/", caption:"参考：黒ラメ幹之サファイア系 No.0155（改良メダカWEB図鑑）", credit:"改良メダカWEB図鑑", usage:"参照リンクのみ（画像は転載しない）" } ],
      similarIds: ["m006","m008"],
      genotype: {},
      myRecords: { keeping:[], breeding:[] },
      priceRef: { key:"m007" },
      sources: [ { url:"https://medakazukan.net/0155_kuroramemiyukisafaiya/", referencedOn:"2026-07-16" } ]
    },

    {
      id: "m008", name: "三色ラメ幹之", reading: "さんしょくらめみゆき",
      aliases: [], status: "done",
      phenotype: { bodyColor:"", pattern:"三色", iridophore:"ラメ", bodyType:"普通体型", finVariation:"なし", eyeVariation:"なし" },
      refTags: ["ラメ"],
      lineage: { strain:"三色系×ラメ系（静楽庵）", parentIds:[] },
      origin: {
        breeder:"静楽庵", year:"2016年",
        story:"2016年、静楽庵によって作出されました。三色の柄にラメを遺伝させることに初めて成功した品種として位置づけられています。"
      },
      description: "三色ラメ幹之は、朱赤・黒・白の三色に、さらに多色のラメが重なる華やかな品種です。錦鯉を思わせる和の柄が魅力で、人気の高い品種のひとつとなっています。\n\n三色の柄にラメの遺伝的な特徴を組み合わせて安定させた最初の品種であり、この品種をもとに紅白ラメや三色体外光など、多くの派生品種が生まれています。ただし、狙った三色の柄とラメの両方を揃えるための選別・繁殖は難易度が高く、固定率も低めとされています（具体的な数値は不明です）。",
      care: { difficulty:3, points:["飼育自体は容易","狙った三色柄＋ラメを揃える選別・繁殖の難易度が高い"] },
      fixation: [],
      photos: [ { mode:"link", url:"https://medakazukan.net/0169_sansyokuramemiyuki/", caption:"参考：三色ラメ幹之 No.0169（改良メダカWEB図鑑）", credit:"改良メダカWEB図鑑", usage:"参照リンクのみ（画像は転載しない）" } ],
      similarIds: ["m007"],
      genotype: {},
      myRecords: { keeping:[], breeding:[] },
      priceRef: { key:"m008" },
      sources: [ { url:"https://medakazukan.net/0169_sansyokuramemiyuki/", referencedOn:"2026-07-16" } ]
    },

    {
      id: "m009", name: "女雛", reading: "めびな",
      aliases: ["黒オレンジ半透明鱗メダカ"], status: "done",
      phenotype: { bodyColor:"オレンジ", pattern:"二色", iridophore:"なし", bodyType:"普通体型", finVariation:"なし", eyeVariation:"なし" },
      refTags: ["半透明鱗","オーロラ"],
      lineage: { strain:"黒オレンジ半透明鱗系", parentIds:[] },
      origin: {
        breeder:"垂水政治", year:"2017年",
        story:"2017年、垂水政治氏によって作出されました。黒とオレンジ（柿色）を併せ持つ品種として広まり、「柿色」という表現が定着するきっかけになったとされています。"
      },
      description: "女雛は、正式名を「黒オレンジ半透明鱗メダカ」といい、黒とオレンジ（柿色）のコントラスト、そして半透明鱗によるやわらかな色合いが特徴の品種です。この品種の登場が、メダカの世界で「柿色」という表現が広まるきっかけになったとされています。\n\n丹頂柄（頭部に色が集まる柄）やダルマ体型、体外光を持つ個体など、バリエーションが豊富なことも魅力です。固定率は6〜7割程度で、黒だけ・赤だけの個体が生まれることもあり、特に狙った丹頂柄が出る割合は約1割とされています。",
      care: { difficulty:3, points:["飼育は容易","柿色を濃く出す・狙い柄を出す選別に手間がかかる"] },
      fixation: [ { rate:"6〜7割（丹頂柄狙いは約1割）", source:"メダカ屋えん", checkedOn:"2026-07-16" } ],
      photos: [ { mode:"link", url:"https://medakazukan.net/0245_mebina/", caption:"参考：女雛 No.0245（改良メダカWEB図鑑）", credit:"改良メダカWEB図鑑", usage:"参照リンクのみ（画像は転載しない）" } ],
      similarIds: [],
      genotype: {},
      myRecords: { keeping:[], breeding:[] },
      priceRef: { key:"m009" },
      sources: [ { url:"https://medakazukan.net/0245_mebina/", referencedOn:"2026-07-16" } ]
    },

    {
      id: "m010", name: "松井ヒレ長幹之", reading: "まついひれながみゆき",
      aliases: ["天女の舞（通称）"], status: "done",
      phenotype: { bodyColor:"スカイブルー(青)", pattern:"無地", iridophore:"体外光(幹之)", bodyType:"普通体型", finVariation:"ヒレ長", eyeVariation:"なし" },
      refTags: ["ヒレ長","体外光"],
      lineage: { strain:"幹之×松井ヒレ長", parentIds:["m003"] },
      origin: {
        breeder:"松井勝二郎（松井ヒレ長を確立）／組合せの作出者は不明", year:"2015年（松井ヒレ長の確立）",
        story:"ヒレが長く伸びる「松井ヒレ長」という形質は、2015年に松井勝二郎氏がヒレの伸びる個体を発見し、確立しました。これを幹之と掛け合わせることで本品種が生まれましたが、この組み合わせ自体を誰がいつ作出したかについては分かっていません。"
      },
      description: "松井ヒレ長幹之は、幹之が持つ背中の青い体外光と、優雅に伸びるすべてのヒレを組み合わせた品種です。特に尾ビレが扇のように大きく広がる姿が華やかで人気があります。\n\nヒレが伸びる性質は遺伝的に劣性（両親からその遺伝子を受け継いだ場合のみ現れる性質）とされています。伸びた分ヒレの先端が裂けやすいため、裂けのない個体が良い個体とされます。体自体は丈夫ですが、ヒレの管理には注意が必要です。",
      care: { difficulty:3, points:["丈夫だがヒレが裂け・傷つきやすい","混泳や過密・水質悪化に注意","ヒレを美しく保つ管理が必要"] },
      fixation: [],
      photos: [ { mode:"link", url:"https://medakazukan.net/", caption:"参考：ヒレ長の解説（改良メダカWEB図鑑）", credit:"改良メダカWEB図鑑", usage:"参照リンクのみ（画像は転載しない）" } ],
      similarIds: ["m003"],
      genotype: {},
      myRecords: { keeping:[], breeding:[] },
      priceRef: { key:"m010" },
      sources: [ { url:"https://medakazukan.net/", referencedOn:"2026-07-16" } ]
    },

    /* ===== 追加10品種（カバレッジ調査より。作出者・作出年に要確認あり） ===== */

    {
      id: "m011", name: "琥珀", reading: "こはく", aliases: [], status: "done",
      phenotype: { bodyColor:"琥珀", pattern:"無地", iridophore:"なし", bodyType:"普通体型", finVariation:"なし", eyeVariation:"なし" },
      refTags: [],
      lineage: { strain:"黄金メダカ由来", parentIds:["m012"] },
      origin: { breeder:"めだかの館（要確認）", year:"2000年代前半頃（要確認）",
        story:"琥珀は、めだかの館によって作出されたとされる品種です。作出年は2000年代前半頃と伝えられていますが、詳細な時期については要確認の部分もあります。黄金メダカを土台に、色の濃い個体を選び抜いて累代を重ねたことで、独自の琥珀色を持つ品種として確立していったと考えられています。" },
      description: "琥珀は、赤みを帯びた茶色（琥珀色）の落ち着いた体色が特徴のメダカです。派手さはありませんが、渋みのある色合いが評価され、古くから親しまれてきた品種の一つです。\n\n黄金色に輝く「黄金メダカ」の中から、特に色の濃い個体を選び出し、世代を重ねて交配する「累代（るいだい）」という方法で色を安定させることで生まれたとされています。\n\n近年では、琥珀の体色に鱗が輝く「ラメ」形質を乗せた「琥珀ラメ」などの派生品種も登場しています。",
      care: { difficulty:3, points:["日光のあたる環境で色が深まる","色の濃い個体を選別すると良い"] },
      fixation: [],
      photos: [ { mode:"link", url:"https://medakazukan.net/", caption:"参考：改良メダカWEB図鑑", credit:"改良メダカWEB図鑑", usage:"参照リンクのみ（画像は転載しない）" } ],
      similarIds: ["m012"],
      genotype: {}, myRecords: { keeping:[], breeding:[] }, priceRef: { key:"m011" },
      sources: [ { url:"https://medakazukan.net/", referencedOn:"2026-07-16" } ]
    },

    {
      id: "m012", name: "黄金", reading: "おうごん", aliases: [], status: "done",
      phenotype: { bodyColor:"黄金", pattern:"無地", iridophore:"なし", bodyType:"普通体型", finVariation:"なし", eyeVariation:"なし" },
      refTags: [],
      lineage: { strain:"野生（茶）メダカ由来", parentIds:[] },
      origin: { breeder:"めだかの館", year:"2001年頃",
        story:"黄金は、めだかの館によって2001年頃に作出されたとされています。野生メダカから薄い黄金色の個体を選別し、累代によって色を固定していく作業を経て誕生した品種です。" },
      description: "黄金は、その名の通り黄金色に輝く体色が特徴のメダカです。野生的な茶色のメダカとは異なる明るく華やかな色合いを持つことから、観賞用として高い人気を集めています。\n\nもともとは野生に近い茶色のメダカの中から、色素が薄く黄金色がかった個体を選び出し、累代によって色を安定させることで作出されました。\n\n黄金色の体色は世代を重ねる中で薄れやすい性質があるとされ、美しい発色を保つには継続的な選別が欠かせません。多くの「黄金系」派生品種のもとになった品種でもあります。",
      care: { difficulty:2, points:["体色維持に選別が必要","多くの黄金系派生品種の元"] },
      fixation: [],
      photos: [ { mode:"link", url:"https://medakazukan.net/category/variety/gold/", caption:"参考：黄金カテゴリ（改良メダカWEB図鑑）", credit:"改良メダカWEB図鑑", usage:"参照リンクのみ（画像は転載しない）" } ],
      similarIds: ["m011"],
      genotype: {}, myRecords: { keeping:[], breeding:[] }, priceRef: { key:"m012" },
      sources: [ { url:"https://medakazukan.net/category/variety/gold/", referencedOn:"2026-07-16" } ]
    },

    {
      id: "m013", name: "ラメ幹之", reading: "らめみゆき", aliases: ["白ラメ幹之"], status: "done",
      phenotype: { bodyColor:"ピュアホワイト(白)", pattern:"無地", iridophore:"ラメ幹之", bodyType:"普通体型", finVariation:"なし", eyeVariation:"なし" },
      refTags: ["ラメ","体外光"],
      lineage: { strain:"幹之由来", parentIds:["m003"] },
      origin: { breeder:"和田敏拓（白ラメ幹之・要確認）", year:"2012年頃（要確認）",
        story:"白ラメ幹之は、和田敏拓氏により2012年頃に作出されたとされていますが、詳しい経緯については要確認の部分もあります。人気品種である幹之にラメ形質を掛け合わせることで生まれた品種です。" },
      description: "ラメ幹之は、体外光（体の外側から光って見える特徴）を持つ人気品種「幹之」に、鱗が金属的にキラキラと輝く「ラメ」形質を乗せた品種です。幹之の光沢に加えてラメの輝きが重なることで、より華やかで立体的な印象を与えます。\n\nラメの数や輝く色合いは個体によって差があり、その量や質によってグレード分けがされることも多いのが特徴です。\n\n白い体色をベースとした「白ラメ幹之」をはじめ、体色や光の系統によっていくつかのバリエーションが存在します。",
      care: { difficulty:4, points:["ラメの数・色で選別する","幹之同様に丈夫"] },
      fixation: [],
      photos: [ { mode:"link", url:"https://medakazukan.net/0125_siroramemiyuki/", caption:"参考：白ラメ幹之 No.0125（改良メダカWEB図鑑）", credit:"改良メダカWEB図鑑", usage:"参照リンクのみ（画像は転載しない）" } ],
      similarIds: ["m003","m007"],
      genotype: {}, myRecords: { keeping:[], breeding:[] }, priceRef: { key:"m013" },
      sources: [ { url:"https://medakazukan.net/0125_siroramemiyuki/", referencedOn:"2026-07-16" } ]
    },

    {
      id: "m014", name: "夜桜", reading: "よざくら", aliases: [], status: "done",
      phenotype: { bodyColor:"黄", pattern:"二色", iridophore:"ラメ", bodyType:"普通体型", finVariation:"なし", eyeVariation:"なし" },
      refTags: ["ラメ","半透明鱗"],
      lineage: { strain:"黄幹之×オーロラ幹之", parentIds:[] },
      origin: { breeder:"垂水政治", year:"2017年",
        story:"夜桜は、垂水政治氏により2017年に作出された品種です。黄幹之とオーロラ幹之を掛け合わせることで、二色の体色と半透明鱗、ラメが重なり合う独特の表現を持つ品種として生み出されました。" },
      description: "夜桜は、黄色と黒の二色に、半透明鱗（うろこが半透明に見える形質）とラメの輝きが重なり合う、非常に華やかなメダカです。\n\n黄幹之とオーロラ幹之を掛け合わせて作出された品種で、個体ごとに色や模様の出方が大きく異なるのが特徴です。同じ親から生まれた個体でも表現が多彩に分かれるため、一匹ごとの個性を楽しめます。\n\nその独特の美しさと表現の幅広さから愛好家の間で人気が高く、近年のメダカ品種の中でも注目度の高い存在です。",
      care: { difficulty:3, points:["個体差が大きく多彩な表現","色の濃淡で系統が分かれる"] },
      fixation: [],
      photos: [ { mode:"link", url:"https://medakazukan.net/0153_yozakura/", caption:"参考：夜桜 No.0153（改良メダカWEB図鑑）", credit:"改良メダカWEB図鑑", usage:"参照リンクのみ（画像は転載しない）" } ],
      similarIds: ["m009"],
      genotype: {}, myRecords: { keeping:[], breeding:[] }, priceRef: { key:"m014" },
      sources: [ { url:"https://medakazukan.net/0153_yozakura/", referencedOn:"2026-07-16" } ]
    },

    {
      id: "m015", name: "紅帝", reading: "こうてい", aliases: ["大和紅帝","小野紅帝"], status: "done",
      phenotype: { bodyColor:"楊貴妃(朱赤)", pattern:"無地", iridophore:"なし", bodyType:"普通体型", finVariation:"なし", eyeVariation:"なし" },
      refTags: ["透明鱗"],
      lineage: { strain:"楊貴妃系（血統群の総称）", parentIds:["m004"] },
      origin: { breeder:"諸説あり（要確認）", year:"2016年以前（要確認）",
        story:"紅帝の作出者や作出年については諸説あり、2016年以前に作出されたとされていますが、詳細は調査中・要確認です。楊貴妃系の赤色をより濃く追求する中で複数の血統群が生まれ、紅帝と呼ばれるようになっていったと考えられています。" },
      description: "紅帝は、濃い朱色がかった赤色の体色を持つメダカで、透明鱗（うろこの色素が少なく透明感のある形質）やオーロラ系の血統に連なる品種です。人気品種である楊貴妃の赤色をさらに追求して生まれた血統群とされ、深みのある赤色が魅力です。\n\n紅帝という名称は特定の一系統だけを指すのではなく、大和紅帝・小野紅帝など、いくつかの呼称を持つ血統群の総称的な位置づけとされています。\n\n発色を美しく引き出すためには「色揚げ」と呼ばれる管理が重要とされており、飼育者の工夫次第で表情が変わる品種でもあります。",
      care: { difficulty:3, points:["色揚げが発色に重要","血統で赤の質が異なる"] },
      fixation: [],
      photos: [ { mode:"link", url:"https://t-aquagarden.com/column/zukan_medaka_koutei", caption:"参考：紅帝メダカの解説（東京アクアガーデン）", credit:"東京アクアガーデン", usage:"参照リンクのみ（画像は転載しない）" } ],
      similarIds: ["m004"],
      genotype: {}, myRecords: { keeping:[], breeding:[] }, priceRef: { key:"m015" },
      sources: [ { url:"https://t-aquagarden.com/column/zukan_medaka_koutei", referencedOn:"2026-07-16" } ]
    },

    {
      id: "m016", name: "深海", reading: "しんかい", aliases: [], status: "done",
      phenotype: { bodyColor:"スカイブルー(青)", pattern:"無地", iridophore:"深海", bodyType:"普通体型", finVariation:"なし", eyeVariation:"なし" },
      refTags: ["体内光"],
      lineage: { strain:"マリンブルー（青幹之由来）", parentIds:[] },
      origin: { breeder:"長岡龍聖", year:"2010年",
        story:"深海は、長岡龍聖氏により2010年に作出された品種とされています。マリンブルーから体外光を除き、腹膜の青さを追求する方向の選別を重ねたことで、独自の深い青色を持つ品種として確立しました。" },
      description: "深海は、青メダカ系に分類される品種で、体の内側にある腹膜（お腹の内側の膜）に含まれる青い虹色素胞（光を反射して輝いて見える色素細胞）によって生まれる、深みのある青色が最大の特徴です。\n\n体外光を持つ人気品種「マリンブルー」をもとに、体外光をあえて持たない方向で選別を重ね、青さそのものを追求して作出されたとされています。\n\n白い容器で上から観賞する「上見」で特に美しく映えるとされ、飼育のしやすい丈夫な品種としても知られています。",
      care: { difficulty:1, points:["白容器の上見で映える","丈夫で飼育しやすい"] },
      fixation: [],
      photos: [ { mode:"link", url:"https://medakazukan.net/0117_sinkai/", caption:"参考：深海 No.0117（改良メダカWEB図鑑）", credit:"改良メダカWEB図鑑", usage:"参照リンクのみ（画像は転載しない）" } ],
      similarIds: ["m003"],
      genotype: {}, myRecords: { keeping:[], breeding:[] }, priceRef: { key:"m016" },
      sources: [ { url:"https://medakazukan.net/0117_sinkai/", referencedOn:"2026-07-16" } ]
    },

    {
      id: "m017", name: "星河", reading: "せいが", aliases: ["青ラメ幹之"], status: "done",
      phenotype: { bodyColor:"スカイブルー(青)", pattern:"無地", iridophore:"ラメ幹之", bodyType:"普通体型", finVariation:"なし", eyeVariation:"なし" },
      refTags: ["ラメ","体外光"],
      lineage: { strain:"幹之由来", parentIds:["m003"] },
      origin: { breeder:"和田としひろ（要確認）", year:"2012年頃（要確認）",
        story:"星河は、和田としひろ氏により2012年頃に作出されたとされていますが、詳細な経緯については要確認の部分もあります。幹之をもとに青いラメと体外光を併せ持つ方向で選別・改良が進められ、現在の品種として確立していったと考えられています。" },
      description: "星河（青ラメ幹之）は、スカイブルーの体色に、青く輝くラメと体外光を併せ持つ華やかなメダカです。幹之から派生した品種で、体外光の輝きに加えて青いラメが重なることで、涼しげで美しい印象を与えます。\n\n容器の色によってラメの見え方が変化しやすく、飼育者が容器の色を工夫することで、より美しくラメを引き立てて楽しむことができる品種です。\n\n丈夫で飼育しやすいことも特徴で、さらに改良を重ねた「極ラメ星河」と呼ばれる品種も存在します。",
      care: { difficulty:2, points:["容器色で青ラメが映える","丈夫で飼育しやすい"] },
      fixation: [],
      photos: [ { mode:"link", url:"https://www.medakanoyakata.jp/", caption:"参考：青ラメ幹之「星河」（めだかの館）", credit:"めだかの館", usage:"参照リンクのみ（画像は転載しない）" } ],
      similarIds: ["m003","m007"],
      genotype: {}, myRecords: { keeping:[], breeding:[] }, priceRef: { key:"m017" },
      sources: [ { url:"https://www.medakanoyakata.jp/", referencedOn:"2026-07-16" } ]
    },

    {
      id: "m018", name: "紅薊", reading: "べにあざみ", aliases: ["朱赤透明鱗ブラックリムヒカリ"], status: "done",
      phenotype: { bodyColor:"楊貴妃(朱赤)", pattern:"無地", iridophore:"体外光(幹之)", bodyType:"普通体型", finVariation:"なし", eyeVariation:"なし" },
      refTags: ["ブラックリム","透明鱗","体外光"],
      lineage: { strain:"ブラックリム系", parentIds:[] },
      origin: { breeder:"神原美和", year:"2017年",
        story:"紅薊は、神原美和氏により2017年に作出された品種です。朱赤色の体色に透明鱗とブラックリム、体外光という複数の特徴を組み合わせることで生み出されました。" },
      description: "紅薊は、正式には「朱赤透明鱗ブラックリムヒカリ」と呼ばれる品種で、朱赤色の体色をベースに、鱗の縁が黒く縁取られる「ブラックリム」と呼ばれる模様、そして体外光を併せ持つのが特徴です。\n\n朱赤色の地に黒い縁取りが入ることで、単色のメダカにはない独特の模様が生まれ、見る角度や光の当たり方によって表情が変わる面白さがあります。\n\n透明鱗の個体であることがこの品種の美しさを保つ上で重要とされており、繁殖の際には丁寧な選別が求められます。",
      care: { difficulty:3, points:["透明鱗の個体を保つ選別が重要"] },
      fixation: [],
      photos: [ { mode:"link", url:"https://medakazukan.net/0217_beniazami/", caption:"参考：紅薊 No.0217（改良メダカWEB図鑑）", credit:"改良メダカWEB図鑑", usage:"参照リンクのみ（画像は転載しない）" } ],
      similarIds: [],
      genotype: {}, myRecords: { keeping:[], breeding:[] }, priceRef: { key:"m018" },
      sources: [ { url:"https://medakazukan.net/0217_beniazami/", referencedOn:"2026-07-16" } ]
    },

    {
      id: "m019", name: "螺鈿光", reading: "らでんこう", aliases: ["シルバー（旧称）"], status: "done",
      phenotype: { bodyColor:"ピュアホワイト(白)", pattern:"無地", iridophore:"体外光(幹之)", bodyType:"普通体型", finVariation:"なし", eyeVariation:"なし" },
      refTags: ["体外光"],
      lineage: { strain:"白体外光系", parentIds:[] },
      origin: { breeder:"鈴木氏（発見・命名／要確認）", year:"2007年命名（2001年発見）",
        story:"螺鈿光は、2001年に香川県で自然発生した個体が発見されたことに始まるとされています。当初は「シルバー」と呼ばれていましたが、2007年に「螺鈿光」と命名され、現在の名称で親しまれるようになりました。" },
      description: "螺鈿光は、白い体色に体外光が重なり、貝殻の内側の輝きを使った工芸「螺鈿細工」を思わせるような、独特の光沢を放つメダカです。以前は「シルバー」という名称で呼ばれていました。\n\n白さと体外光の組み合わせによって生まれる上品な輝きが特徴で、他の品種とはひと味違った落ち着いた美しさを楽しむことができます。\n\nその後、幹之との交配によって青いラメを併せ持つ「青ラメ螺鈿光」といった派生品種も生まれています。",
      care: { difficulty:null, points:[] },
      fixation: [],
      photos: [ { mode:"link", url:"https://hinsyu-zukan.satumano-medakayasan.com/859/", caption:"参考：螺鈿光（みんなのメダカ品種図鑑）", credit:"みんなのメダカ品種図鑑", usage:"参照リンクのみ（画像は転載しない）" } ],
      similarIds: [],
      genotype: {}, myRecords: { keeping:[], breeding:[] }, priceRef: { key:"m019" },
      sources: [ { url:"https://hinsyu-zukan.satumano-medakayasan.com/859/", referencedOn:"2026-07-16" } ]
    },

    {
      id: "m020", name: "王妃", reading: "おうひ", aliases: ["白半透明鱗アルビノ体外光"], status: "done",
      phenotype: { bodyColor:"ピュアホワイト(白)", pattern:"無地", iridophore:"体外光(幹之)", bodyType:"普通体型", finVariation:"なし", eyeVariation:"アルビノ" },
      refTags: ["アルビノ","体外光","半透明鱗"],
      lineage: { strain:"鱗光系", parentIds:[] },
      origin: { breeder:"垂水政治", year:"2019年",
        story:"王妃は、垂水政治氏により2019年に作出された品種です。アルビノ、体外光、鱗光という複数の形質を組み合わせることで、王妃ならではの気品ある色合いと輝きを持つ品種として生み出されました。" },
      description: "王妃は、正式には「白半透明鱗アルビノ体外光」と呼ばれる品種で、白色から淡いピンク色の体色に、アルビノ（色素が少なく赤みがかった目を持つ形質）と体外光、そして鱗が網目状に輝く「鱗光」を併せ持つのが特徴です。\n\n複数の特徴が重なり合うことで、他の品種にはない優しく上品な色合いと輝きが生まれ、その名の通り気品のある印象を与えるメダカとして知られています。\n\n鱗光系品種の一つに位置づけられており、比較的新しい品種でありながら人気を集めています。",
      care: { difficulty:null, points:[] },
      fixation: [],
      photos: [ { mode:"link", url:"https://medakazukan.net/0216_ouhi/", caption:"参考：王妃 No.0216（改良メダカWEB図鑑）", credit:"改良メダカWEB図鑑", usage:"参照リンクのみ（画像は転載しない）" } ],
      similarIds: [],
      genotype: {}, myRecords: { keeping:[], breeding:[] }, priceRef: { key:"m020" },
      sources: [ { url:"https://medakazukan.net/0216_ouhi/", referencedOn:"2026-07-16" } ]
    },

    /* ===== ハウスネーム品種（SNS発見・詳細は調査中）===== */
    {
      id: "m021", name: "バカラ", reading: "ばから", aliases: [], status: "draft",
      phenotype: { bodyColor:"スカイブルー(青)", pattern:"", iridophore:"", bodyType:"", finVariation:"", eyeVariation:"" },
      refTags: ["ハウスネーム"],
      lineage: { strain:"要確認", parentIds:[] },
      origin: { breeder:"@halokillfish（関連・要確認）", year:"調査中", story:"" },
      description: "Instagramで見つかったハウスネーム品種です。「嘘みたいな青さ」と評される非常に青い体色が特徴とされ、作出元として @halokillfish が関連するとみられます。改良メダカWEB図鑑・日本メダカ協会には未収録で、作出者・作出年・分類などの詳しい情報は調査中です。",
      care: { difficulty:null, points:[] },
      fixation: [],
      photos: [ { mode:"link", url:"https://www.instagram.com/p/DZrFiE_ErhU/", caption:"参考：Instagram投稿（江戸オク @medaka_factory_edo）", credit:"Instagram / 江戸オク", usage:"参照リンクのみ（画像は転載しない）" } ],
      similarIds: [],
      genotype: {}, myRecords: { keeping:[], breeding:[] }, priceRef: { key:"m021" },
      sources: [ { url:"https://www.instagram.com/p/DZrFiE_ErhU/", referencedOn:"2026-07-16" } ]
    },

    /* ===== クローラ発見→投入（Layer 2 実例）===== */
    {
      id: "m022", name: "龍鱗", reading: "りゅうりん", aliases: [], status: "done",
      phenotype: { bodyColor:"スカイブルー(青)", pattern:"無地", iridophore:"体外光(幹之)", bodyType:"普通体型", finVariation:"なし", eyeVariation:"なし" },
      refTags: ["体外光"],
      lineage: { strain:"幹之系（青幹之由来）", parentIds:["m003"] },
      origin: { breeder:"北九州めだかセンター（福岡）", year:"2010年6月",
        story:"龍鱗は2010年6月、福岡県の北九州めだかセンターによって作出されました。幹之の体外光を横方向に広げるという独自の改良を加えることで、鱗状の輝きを持つ新しい系統として誕生した品種です。詳しい作出の過程については、現時点で分かっている情報が限られており、調査中です。" },
      description: "龍鱗は、幹之（みゆき）系の品種を親に持つ「青幹之系」のメダカです。幹之の特徴である体外光（たいがいこう。体の外側の皮膚が光って見える特徴のことです）を、通常より横方向に広く発達させ、背中の鱗一枚一枚が輝いて見えるように仕立てた品種です。その様子が龍の鱗を思わせることから、この名前が付けられました。\n\n観賞する際は、光を反射しやすい白容器で飼育すると、鱗状の輝きが特に美しく映えるとされています。\n\n飼育の難易度は普通とされ、初心者の方でも比較的挑戦しやすい品種です。子どもに親と同じ特徴が安定して出る割合（固定率）は高めとされていますが、具体的な数値は調査中です。",
      care: { difficulty:3, points:["白容器で鱗状の輝きが映える","幹之系に準じた飼育でよい"] },
      fixation: [],
      photos: [ { mode:"link", url:"https://hinsyu-zukan.satumano-medakayasan.com/ryurin", caption:"参考：龍鱗（みんなのメダカ品種図鑑）", credit:"みんなのメダカ品種図鑑", usage:"参照リンクのみ（画像は転載しない）" } ],
      similarIds: ["m003"],
      genotype: {}, myRecords: { keeping:[], breeding:[] }, priceRef: { key:"m022" },
      sources: [ { url:"https://hinsyu-zukan.satumano-medakayasan.com/ryurin", referencedOn:"2026-07-16" } ]
    },

    {
      id: "m023", name: "忘却の翼", reading: "ぼうきゃくのつばさ", aliases: ["黒オレンジ半透明鱗ラメヒレ長"], status: "done",
      phenotype: { bodyColor:"オレンジ", pattern:"二色", iridophore:"ラメ", bodyType:"普通体型", finVariation:"ヒレ長", eyeVariation:"" },
      refTags: ["ラメ","半透明鱗","ヒレ長"],
      lineage: { strain:"月弓×松井鰭長三色ラメ", parentIds:[] },
      origin: { breeder:"舞めだか（熊本）", year:"2020年4月",
        story:"忘却の翼は2020年4月、熊本県の舞めだかによって作出されました。「月弓×松井鰭長三色ラメ」を親として交配され、誕生した品種です。従来「強いラメと長いヒレは両立が難しい」という通説がありましたが、忘却の翼はこの通説を打破した品種として位置づけられています。" },
      description: "忘却の翼は、正式には「黒オレンジ半透明鱗ラメヒレ長」と分類される品種です。黒地の体にオレンジ色が発色し、頭部まで密にラメ（鱗がキラキラと輝いて見える模様のことです）が乗る華やかな見た目に加え、長く伸びたヒレを併せ持つのが特徴です。\n\n体質はデリケートで、病気には注意が必要とされています。特にヒレが溶けたり破れたりしやすいため、水質管理には気を配る必要があります。繁殖を考える場合は、生後3〜6ヶ月ほどの若い個体を使うと効果的とされています。固定率はやや低めとされていますが、具体的な数値は調査中です。\n\nなお「忘却」という名前は、ラメが成長・加齢とともに徐々に減っていく現象にちなんで付けられたとされています。",
      care: { difficulty:3, points:["デリケートで病気に注意","ヒレが溶け・破れやすく水質管理に注意","繁殖は生後3〜6ヶ月の若魚が有効"] },
      fixation: [],
      photos: [ { mode:"link", url:"https://medakazukan.net/0870_boukyakunotubasa/", caption:"参考：忘却の翼 No.0870（改良メダカWEB図鑑）", credit:"改良メダカWEB図鑑", usage:"参照リンクのみ（画像は転載しない）" } ],
      similarIds: ["m008","m010"],
      genotype: {}, myRecords: { keeping:[], breeding:[] }, priceRef: { key:"m023" },
      sources: [ { url:"https://medakazukan.net/0870_boukyakunotubasa/", referencedOn:"2026-07-16" } ]
    },

    {
      id: "m024", name: "如水", reading: "じょすい", aliases: [], status: "done",
      phenotype: { bodyColor:"スカイブルー(青)", pattern:"", iridophore:"ヒカリ体型由来の光沢", bodyType:"ヒカリ体型", finVariation:"スワロー", eyeVariation:"" },
      refTags: ["ヒカリ","スワロー"],
      lineage: { strain:"モルフォ系（要確認）", parentIds:[] },
      origin: { breeder:"和田敏拓／めだかの館（広島）", year:"2023年6月",
        story:"如水は2023年6月、広島県のめだかの館・和田敏拓氏によって作出されました。名前は、戦国武将・黒田官兵衛が名乗った号「黒田如水」に由来し、「水の如く柔軟である」という意味が込められているとされています。なお、交配に使われた親品種については諸説あり、現時点では確定情報がないため要確認・調査中です。" },
      description: "如水は、青幹之色を持つヒカリ体型（背ビレと尻ビレが同じ形になり、尾ビレがひし形になる体型で、上から見たときに特に美しく光って見えるのが特徴です）に、ツバメ鰭（スワローとも呼ばれ、ヒレの一部が長く伸びる特徴です）を組み合わせた、いわゆる「モルフォ系」の品種です。\n\n2023年に発表されたばかりの新しい品種であるため、飼育の難易度や固定率などの詳しい情報はまだ確立されておらず、調査中です。",
      care: { difficulty:null, points:[] },
      fixation: [],
      photos: [ { mode:"link", url:"https://hinsyu-zukan.satumano-medakayasan.com/2601/", caption:"参考：如水（みんなのメダカ品種図鑑）", credit:"みんなのメダカ品種図鑑", usage:"参照リンクのみ（画像は転載しない）" } ],
      similarIds: [],
      genotype: {}, myRecords: { keeping:[], breeding:[] }, priceRef: { key:"m024" },
      sources: [ { url:"https://hinsyu-zukan.satumano-medakayasan.com/2601/", referencedOn:"2026-07-16" } ]
    }

  ]
};
