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

  dataVersion: "0.7",
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
    },

    /* ===== inboxバッチ投入（オーロラ系・新しめ品種ほか）===== */
    {
      id: "m025", name: "アクアマリン", reading: "あくあまりん", aliases: [], status: "done",
      phenotype: { bodyColor:"ピュアホワイト(白)", pattern:"", iridophore:"", bodyType:"", finVariation:"リアルロングフィン", eyeVariation:"ルビーアイ" },
      refTags: ["アルビノ","体外光","リアルロングフィン"],
      lineage: { strain:"モルフォ系", parentIds:[] },
      origin: { breeder:"和田敏拓（要確認）", year:"2024年",
        story:"2024年に和田敏拓氏（要確認）によって作出されたとされています。グッピーのような大きく美しいヒレを持つメダカを目指して開発された品種です。飼育難易度や色柄の固定率については、現時点では調査中です。" },
      description: "白い体色に、宝石のアクアマリンを思わせる透明感のある青色の大きなヒレを持つ、モルフォ系の品種です。ヒレが通常よりも大きく伸びる「リアルロングフィン」という特徴を持ち、グッピーのように華やかに広がるヒレを目指して作られました。目は赤みを帯びた「ルビーアイ」（アルビノ由来の赤い瞳）で、個体によっては体側にプラチナのような輝きが現れることもあります。",
      care: { difficulty:null, points:[] },
      fixation: [],
      photos: [ { mode:"link", url:"https://medakazukan.net/1064_aquamarine/", caption:"参考：アクアマリン No.1064（改良メダカWEB図鑑）", credit:"改良メダカWEB図鑑", usage:"参照リンクのみ（画像は転載しない）" } ],
      similarIds: [],
      genotype: {}, myRecords: { keeping:[], breeding:[] }, priceRef: { key:"m025" },
      sources: [ { url:"https://medakazukan.net/1064_aquamarine/", referencedOn:"2026-07-16" } ]
    },

    {
      id: "m026", name: "ミント", reading: "みんと", aliases: [], status: "done",
      phenotype: { bodyColor:"茶", pattern:"", iridophore:"ラメ", bodyType:"", finVariation:"スワロー", eyeVariation:"" },
      refTags: ["ラメ","スワロー","オーロラ","半透明鱗"],
      lineage: { strain:"オーロラ系", parentIds:[] },
      origin: { breeder:"安藤かおる（武州メダカ・安藤観賞魚／埼玉）", year:"2021年",
        story:"2021年、埼玉の武州めだか・安藤観賞魚の安藤かおる氏によって作出されました。飼育難易度や固定率については調査中です。" },
      description: "透明感のある茶色をベースにした体に、緑色のラメ（輝く粒子）が散りばめられた品種です。ヒレの一部が長く伸びる「燕尾（スワロー）」の形質を持ち、優雅な泳ぎ姿が魅力とされる、オーロラ系に分類される品種です。",
      care: { difficulty:null, points:[] },
      fixation: [],
      photos: [ { mode:"link", url:"https://hinsyu-zukan.satumano-medakayasan.com/mint", caption:"参考：ミント（みんなのメダカ品種図鑑）", credit:"みんなのメダカ品種図鑑", usage:"参照リンクのみ（画像は転載しない）" } ],
      similarIds: [],
      genotype: {}, myRecords: { keeping:[], breeding:[] }, priceRef: { key:"m026" },
      sources: [ { url:"https://hinsyu-zukan.satumano-medakayasan.com/mint", referencedOn:"2026-07-16" } ]
    },

    {
      id: "m027", name: "ガイア", reading: "がいあ", aliases: [], status: "done",
      phenotype: { bodyColor:"琥珀", pattern:"", iridophore:"ラメ", bodyType:"", finVariation:"", eyeVariation:"" },
      refTags: ["ラメ","オーロラ"],
      lineage: { strain:"オーロラ系", parentIds:["m028"] },
      origin: { breeder:"高州めだか（山梨）", year:"2022年9月",
        story:"「オベリスク×琥珀ラメ」を親に持ち、2022年9月に山梨の高州めだかで作出されました。名前はギリシャ神話に登場する大地の女神ガイアに由来するとされています。飼育難易度や固定率については調査中です。" },
      description: "赤茶色から琥珀色を基調とした体に、ラメが輝く品種です。オーロラ系に分類されます。詳しい体型や柄の特徴についての情報は少なく、現時点では調査中です。",
      care: { difficulty:null, points:[] },
      fixation: [],
      photos: [ { mode:"link", url:"https://hinsyu-zukan.satumano-medakayasan.com/gaia", caption:"参考：ガイア（みんなのメダカ品種図鑑）", credit:"みんなのメダカ品種図鑑", usage:"参照リンクのみ（画像は転載しない）" } ],
      similarIds: ["m028"],
      genotype: {}, myRecords: { keeping:[], breeding:[] }, priceRef: { key:"m027" },
      sources: [ { url:"https://hinsyu-zukan.satumano-medakayasan.com/gaia", referencedOn:"2026-07-16" } ]
    },

    {
      id: "m028", name: "オベリスク", reading: "おべりすく", aliases: [], status: "done",
      phenotype: { bodyColor:"", pattern:"", iridophore:"ラメ", bodyType:"", finVariation:"", eyeVariation:"" },
      refTags: ["ラメ","オーロラ"],
      lineage: { strain:"オーロラ系", parentIds:["m007","m014"] },
      origin: { breeder:"高州めだか（山梨）", year:"2022年6月",
        story:"「サファイア×夜桜」と「ユリシス」を掛け合わせて作られた品種で、2022年6月に山梨の高州めだかによって作出されました。飼育難易度や固定率については調査中です。" },
      description: "頭から尾にかけて一筋のラメが走る、ラメ系・オーロラ系の品種です。この一筋のラメの模様が、古代エジプトの石碑「オベリスク」を思わせることから名付けられました。",
      care: { difficulty:null, points:[] },
      fixation: [],
      photos: [ { mode:"link", url:"https://hinsyu-zukan.satumano-medakayasan.com/obelisk", caption:"参考：オベリスク（みんなのメダカ品種図鑑）", credit:"みんなのメダカ品種図鑑", usage:"参照リンクのみ（画像は転載しない）" } ],
      similarIds: ["m007","m014"],
      genotype: {}, myRecords: { keeping:[], breeding:[] }, priceRef: { key:"m028" },
      sources: [ { url:"https://hinsyu-zukan.satumano-medakayasan.com/obelisk", referencedOn:"2026-07-16" } ]
    },

    {
      id: "m029", name: "彩桜", reading: "さいざくら", aliases: [], status: "done",
      phenotype: { bodyColor:"ピンク", pattern:"", iridophore:"ラメ", bodyType:"普通体型", finVariation:"なし", eyeVariation:"なし" },
      refTags: ["ラメ","オーロラ","半透明鱗"],
      lineage: { strain:"オーロラ系", parentIds:["m026","m014"] },
      origin: { breeder:"安藤かおる（武州メダカ／埼玉）", year:"2022年",
        story:"「通常体型ミント×夜桜」を親に、2022年に埼玉の武州めだかの安藤かおる氏によって作出されました。名前は埼玉県の別名「彩の国」と、熊谷市の花である桜にちなんで付けられたとされています。飼育難易度や固定率については調査中です。" },
      description: "半透明で淡いピンク色を帯びた体に、ミント由来の緑色のラメが輝く品種です。頭部が桜色に染まる姿が特徴で、オーロラ系に分類されます。",
      care: { difficulty:null, points:[] },
      fixation: [],
      photos: [ { mode:"link", url:"https://hinsyu-zukan.satumano-medakayasan.com/saizakura", caption:"参考：彩桜（みんなのメダカ品種図鑑）", credit:"みんなのメダカ品種図鑑", usage:"参照リンクのみ（画像は転載しない）" } ],
      similarIds: ["m026"],
      genotype: {}, myRecords: { keeping:[], breeding:[] }, priceRef: { key:"m029" },
      sources: [ { url:"https://hinsyu-zukan.satumano-medakayasan.com/saizakura", referencedOn:"2026-07-16" } ]
    },

    {
      id: "m030", name: "クリアブラウン", reading: "くりあぶらうん", aliases: [], status: "done",
      phenotype: { bodyColor:"茶", pattern:"", iridophore:"", bodyType:"ヒカリ体型", finVariation:"なし", eyeVariation:"なし" },
      refTags: ["ブラックリム","オーロラ","半透明鱗"],
      lineage: { strain:"オーロラ系の祖", parentIds:[] },
      origin: { breeder:"二野宮良博（めだか本舗・広島）", year:"2006年",
        story:"2006年、広島のめだか本舗・二野宮良博氏によって作出されました。飼育難易度や固定率については調査中です。" },
      description: "透明感のある飴色の体に、鱗の縁が黒く縁取られる「ブラックリム」が入る品種です。体外光を持つ「ヒカリ体型」で、後に生まれる「オーロラ系」と呼ばれる品種群の祖となった、歴史的に重要な品種とされています。",
      care: { difficulty:null, points:[] },
      fixation: [],
      photos: [ { mode:"link", url:"https://hinsyu-zukan.satumano-medakayasan.com/clear-brown", caption:"参考：クリアブラウン（みんなのメダカ品種図鑑）", credit:"みんなのメダカ品種図鑑", usage:"参照リンクのみ（画像は転載しない）" } ],
      similarIds: [],
      genotype: {}, myRecords: { keeping:[], breeding:[] }, priceRef: { key:"m030" },
      sources: [ { url:"https://hinsyu-zukan.satumano-medakayasan.com/clear-brown", referencedOn:"2026-07-16" } ]
    },

    {
      id: "m031", name: "魅輝", reading: "みき", aliases: [], status: "done",
      phenotype: { bodyColor:"黄金", pattern:"", iridophore:"ラメ", bodyType:"普通体型", finVariation:"なし", eyeVariation:"なし" },
      refTags: ["ラメ","オーロラ","黄金"],
      lineage: { strain:"オーロラ系", parentIds:["m028","m023"] },
      origin: { breeder:"高州めだか（山梨）", year:"2023年3月",
        story:"「オベリスク×忘却の翼」を親に持ち、2023年3月に山梨の高州めだかによって作出されました。飼育難易度や固定率については調査中です。" },
      description: "金色（ゴールド）の体の中央に、一筋の青いラメが入る独特な配色を持つ品種です。ラメ系・オーロラ系に分類されます。",
      care: { difficulty:null, points:[] },
      fixation: [],
      photos: [ { mode:"link", url:"https://hinsyu-zukan.satumano-medakayasan.com/miki", caption:"参考：魅輝（みんなのメダカ品種図鑑）", credit:"みんなのメダカ品種図鑑", usage:"参照リンクのみ（画像は転載しない）" } ],
      similarIds: ["m028"],
      genotype: {}, myRecords: { keeping:[], breeding:[] }, priceRef: { key:"m031" },
      sources: [ { url:"https://hinsyu-zukan.satumano-medakayasan.com/miki", referencedOn:"2026-07-16" } ]
    },

    {
      id: "m032", name: "紫延", reading: "しえん", aliases: [], status: "done",
      phenotype: { bodyColor:"", pattern:"", iridophore:"体外光(幹之)", bodyType:"ヒカリ体型", finVariation:"ヒレ長", eyeVariation:"" },
      refTags: ["体外光","ヒレ長"],
      lineage: { strain:"体外光系", parentIds:["m003"] },
      origin: { breeder:"B型おやじ（愛知）", year:"2023年8月",
        story:"「緑光×幹之」を親に、2023年8月に愛知のB型おやじ氏によって作出されました。「紫を延ばしていく」という育成理念が名前の由来とされています。飼育難易度や固定率については調査中です。" },
      description: "光の当たり方によって紫色に輝く独特の光沢を持つ品種です。頭部とヒレに黒色が入り、体外光を持つ「ヒカリ体型」で、ヒレが長く伸びる特徴があります。",
      care: { difficulty:null, points:[] },
      fixation: [],
      photos: [ { mode:"link", url:"https://hinsyu-zukan.satumano-medakayasan.com/shien", caption:"参考：紫延（みんなのメダカ品種図鑑）", credit:"みんなのメダカ品種図鑑", usage:"参照リンクのみ（画像は転載しない）" } ],
      similarIds: ["m003"],
      genotype: {}, myRecords: { keeping:[], breeding:[] }, priceRef: { key:"m032" },
      sources: [ { url:"https://hinsyu-zukan.satumano-medakayasan.com/shien", referencedOn:"2026-07-16" } ]
    },

    /* ===== inboxバッチ投入 その2（RLF版・めだかの館の品種ほか）===== */
    {
      id: "m033", name: "琴姫リアルロングフィン", reading: "ことひめりあるろんぐふぃん", aliases: ["琥珀透明鱗ブラックリムリアルロングフィン"], status: "done",
      phenotype: { bodyColor:"琥珀", pattern:"無地", iridophore:"", bodyType:"ヒカリ体型", finVariation:"リアルロングフィン", eyeVariation:"なし" },
      refTags: ["ブラックリム","透明鱗","リアルロングフィン"],
      lineage: { strain:"琴姫系", parentIds:[] },
      origin: { breeder:"和田敏拓", year:"2023年",
        story:"2023年、和田敏拓氏によって作出されたとされています。「琴姫」にリアルロングフィンの形質を取り入れて生まれた品種です。飼育難易度や固定率については調査中です。" },
      description: "琴姫リアルロングフィンは、琥珀色の体に朱赤の尾ビレや腹のラインが映え、鱗の縁が黒く縁取られる「ブラックリム」と透明鱗をあわせ持つ、ヒカリ体型の品種です。全ヒレが通常の1.5倍以上に伸びる「リアルロングフィン」で、優雅なシルエットが魅力です。\n\nベースは「琴姫（琥珀透明鱗ブラックリムヒカリ）」で、これにヒレ長の形質を組み合わせた品種です。",
      care: { difficulty:null, points:[] },
      fixation: [],
      photos: [ { mode:"link", url:"https://medakazukan.net/0914_kotohimereallongfin/", caption:"参考：琴姫リアルロングフィン No.0914（改良メダカWEB図鑑）", credit:"改良メダカWEB図鑑", usage:"参照リンクのみ（画像は転載しない）" } ],
      similarIds: [],
      genotype: {}, myRecords: { keeping:[], breeding:[] }, priceRef: { key:"m033" },
      sources: [ { url:"https://medakazukan.net/0914_kotohimereallongfin/", referencedOn:"2026-07-16" } ]
    },

    {
      id: "m034", name: "レーヴサムライヒカリ", reading: "れーゔさむらいひかり", aliases: [], status: "done",
      phenotype: { bodyColor:"スカイブルー(青)", pattern:"無地", iridophore:"体外光(幹之)", bodyType:"ヒカリ体型", finVariation:"サムライ", eyeVariation:"なし" },
      refTags: ["サムライ","体外光"],
      lineage: { strain:"レーヴ系", parentIds:[] },
      origin: { breeder:"不明", year:"不明",
        story:"「レーヴ」系から生まれた品種ですが、作出者・作出年は調査中です。" },
      description: "レーヴサムライヒカリは、青い体に体外光をのせたヒカリ体型で、背ビレが変化する「サムライ」の形質を持つ希少な個体です。各ヒレに光が入り、華やかな印象を与えます。",
      care: { difficulty:null, points:[] },
      fixation: [],
      photos: [ { mode:"link", url:"https://medakazukan.net/0913_revesamuraihikari/", caption:"参考：レーヴサムライヒカリ No.0913（改良メダカWEB図鑑）", credit:"改良メダカWEB図鑑", usage:"参照リンクのみ（画像は転載しない）" } ],
      similarIds: [],
      genotype: {}, myRecords: { keeping:[], breeding:[] }, priceRef: { key:"m034" },
      sources: [ { url:"https://medakazukan.net/0913_revesamuraihikari/", referencedOn:"2026-07-16" } ]
    },

    {
      id: "m035", name: "三色ラメリアルロングフィン", reading: "さんしょくらめりあるろんぐふぃん", aliases: [], status: "done",
      phenotype: { bodyColor:"", pattern:"三色", iridophore:"ラメ", bodyType:"", finVariation:"リアルロングフィン", eyeVariation:"" },
      refTags: ["ラメ","リアルロングフィン"],
      lineage: { strain:"白朱赤系", parentIds:["m008"] },
      origin: { breeder:"不明", year:"不明",
        story:"「三色ラメ」をベースに、ヒレ長の形質を組み合わせた品種です。作出者・作出年は調査中です。" },
      description: "三色ラメリアルロングフィンは、白と朱赤の二色にラメ（鱗がキラキラ輝く形質）がのり、全ヒレが通常の1.5倍以上に伸びるリアルロングフィンの品種です。三色の色合いと長いヒレが合わさった華やかな姿が特徴です。",
      care: { difficulty:null, points:[] },
      fixation: [],
      photos: [ { mode:"link", url:"https://medakazukan.net/0912_sansyhokulamereallongfin/", caption:"参考：三色ラメリアルロングフィン No.0912（改良メダカWEB図鑑）", credit:"改良メダカWEB図鑑", usage:"参照リンクのみ（画像は転載しない）" } ],
      similarIds: ["m008"],
      genotype: {}, myRecords: { keeping:[], breeding:[] }, priceRef: { key:"m035" },
      sources: [ { url:"https://medakazukan.net/0912_sansyhokulamereallongfin/", referencedOn:"2026-07-16" } ]
    },

    {
      id: "m036", name: "紅薊リアルロングフィン", reading: "べにあざみりあるろんぐふぃん", aliases: [], status: "done",
      phenotype: { bodyColor:"楊貴妃(朱赤)", pattern:"無地", iridophore:"体外光(幹之)", bodyType:"ヒカリ体型", finVariation:"リアルロングフィン", eyeVariation:"なし" },
      refTags: ["ブラックリム","透明鱗","体外光","リアルロングフィン"],
      lineage: { strain:"紅薊系", parentIds:["m018"] },
      origin: { breeder:"不明", year:"不明",
        story:"「紅薊」に「紅リアルロングフィン」を交配して生まれた品種です。作出者・作出年は調査中です。" },
      description: "紅薊リアルロングフィンは、朱赤の体に透明鱗（エラが赤く透ける）とブラックリム（鱗の黒い縁取り）、体外光をあわせ持つヒカリ体型で、全ヒレが長く伸びる品種です。ヒレにも色がのり、紅薊の華やかさをより優雅に見せます。",
      care: { difficulty:null, points:[] },
      fixation: [],
      photos: [ { mode:"link", url:"https://medakazukan.net/0911_beniazamireallongfin/", caption:"参考：紅薊リアルロングフィン No.0911（改良メダカWEB図鑑）", credit:"改良メダカWEB図鑑", usage:"参照リンクのみ（画像は転載しない）" } ],
      similarIds: ["m018"],
      genotype: {}, myRecords: { keeping:[], breeding:[] }, priceRef: { key:"m036" },
      sources: [ { url:"https://medakazukan.net/0911_beniazamireallongfin/", referencedOn:"2026-07-16" } ]
    },

    {
      id: "m037", name: "ブラックタイド・ゼブラ", reading: "ぶらっくたいど・ぜぶら", aliases: [], status: "done",
      phenotype: { bodyColor:"ブラック", pattern:"斑(ぶち)", iridophore:"", bodyType:"", finVariation:"", eyeVariation:"" },
      refTags: [],
      lineage: { strain:"ブラックタイド系", parentIds:["m005"] },
      origin: { breeder:"のら猫ギン（福岡）", year:"2022年",
        story:"ブラックタイド（小川ブラックマルコ×流星）や極ブラック、オロチが関わる系統から、2022年に福岡の「のら猫ギン」によって作出されました。飼育難易度や固定率については調査中です。" },
      description: "ブラックタイド・ゼブラは、黒い体の墨（黒色）の一部が退色することで縞模様が現れる、ユニークな品種です。名前は「黒潮（ブラックタイド）」と「シマウマ（ゼブラ）」に由来します。",
      care: { difficulty:null, points:[] },
      fixation: [],
      photos: [ { mode:"link", url:"https://hinsyu-zukan.satumano-medakayasan.com/black-tide-zebra", caption:"参考：ブラックタイド・ゼブラ（みんなのメダカ品種図鑑）", credit:"みんなのメダカ品種図鑑", usage:"参照リンクのみ（画像は転載しない）" } ],
      similarIds: ["m005"],
      genotype: {}, myRecords: { keeping:[], breeding:[] }, priceRef: { key:"m037" },
      sources: [ { url:"https://hinsyu-zukan.satumano-medakayasan.com/black-tide-zebra", referencedOn:"2026-07-16" } ]
    },

    {
      id: "m038", name: "初恋ヒレ長", reading: "はつこいひれなが", aliases: ["朱赤ダルマヒレ長"], status: "done",
      phenotype: { bodyColor:"楊貴妃(朱赤)", pattern:"無地", iridophore:"なし", bodyType:"ダルマ", finVariation:"ヒレ長", eyeVariation:"なし" },
      refTags: ["ヒレ長","ダルマ"],
      lineage: { strain:"初恋（朱赤ダルマ）＋ヒレ長", parentIds:[] },
      origin: { breeder:"不明（ヒレ長形質＝松井勝二郎）", year:"不明",
        story:"朱赤ダルマの固定品種「初恋」に、ヒレ長の形質を組み合わせた品種です。ヒレ長の形質は2015年に松井勝二郎氏が確立しました。組み合わせ品種としての作出者・作出年は調査中です。" },
      description: "初恋ヒレ長は、朱赤のダルマ体型（丸く短い体型）に、長く伸びたヒレを組み合わせた品種です。ぷっくりとした体と流れるようなヒレの対比が愛らしく、優雅な印象を与えます。\n\nダルマ体型もヒレ長も繊細な形質のため、ヒレの先が裂けやすく、水流や水温の変化に注意が必要です。",
      care: { difficulty:3, points:["ヒレが長く水流の影響を受けやすい","ダルマ体型は水温変化に注意"] },
      fixation: [],
      photos: [ { mode:"link", url:"https://medakazukan.net/0273_hatukoihirenaga/", caption:"参考：初恋ヒレ長 No.0273（改良メダカWEB図鑑）", credit:"改良メダカWEB図鑑", usage:"参照リンクのみ（画像は転載しない）" } ],
      similarIds: ["m010"],
      genotype: {}, myRecords: { keeping:[], breeding:[] }, priceRef: { key:"m038" },
      sources: [ { url:"https://medakazukan.net/0273_hatukoihirenaga/", referencedOn:"2026-07-16" } ]
    },

    {
      id: "m039", name: "フロストイエローダルマ", reading: "ふろすといえろーだるま", aliases: [], status: "draft",
      phenotype: { bodyColor:"黄", pattern:"", iridophore:"", bodyType:"ダルマ", finVariation:"", eyeVariation:"" },
      refTags: ["ハウスネーム"],
      lineage: { strain:"要確認", parentIds:[] },
      origin: { breeder:"調査中", year:"調査中", story:"" },
      description: "黄色のダルマ体型（丸く短い体型）のメダカです。めだかの館で扱われるハウスネーム品種で、作出者・作出年や詳しい特徴などの公開情報が少なく、現在調査中です。",
      care: { difficulty:null, points:[] },
      fixation: [],
      photos: [ { mode:"link", url:"https://www.medakanoyakata.jp/?pid=192658079", caption:"参考：フロストイエローダルマ（めだかの館）", credit:"めだかの館", usage:"参照リンクのみ（画像は転載しない）" } ],
      similarIds: [],
      genotype: {}, myRecords: { keeping:[], breeding:[] }, priceRef: { key:"m039" },
      sources: [ { url:"https://www.medakanoyakata.jp/?pid=192658079", referencedOn:"2026-07-16" } ]
    },

    {
      id: "m040", name: "紗々", reading: "さしゃ", aliases: ["白透明鱗ブラックリム"], status: "done",
      phenotype: { bodyColor:"ピュアホワイト(白)", pattern:"無地", iridophore:"", bodyType:"普通体型", finVariation:"なし", eyeVariation:"なし" },
      refTags: ["ブラックリム","透明鱗"],
      lineage: { strain:"五式typeR系", parentIds:[] },
      origin: { breeder:"チャチャめだか", year:"2020年",
        story:"「五式typeR」系から白い体色を固定して生まれた品種で、2020年にチャチャめだかによって作出されました。飼育難易度や固定率については調査中です。" },
      description: "紗々は、白い体に強い「ブラックリム」（鱗の黒い縁取り）が入る品種です。背景の色に反応して色が薄くなる「背地反応」が少ないため、白い容器で飼っても黒い縁取りが退色しにくいのが特徴です。頭やヒレに白がのり、涼しげで凛とした美しさがあります。",
      care: { difficulty:2, points:["白容器でもブラックリムが退色しにくい","背地反応が少なく扱いやすいとされる"] },
      fixation: [],
      photos: [ { mode:"link", url:"https://medakazukan.net/0904_sasya/", caption:"参考：紗々 No.0904（改良メダカWEB図鑑）", credit:"改良メダカWEB図鑑", usage:"参照リンクのみ（画像は転載しない）" } ],
      similarIds: [],
      genotype: {}, myRecords: { keeping:[], breeding:[] }, priceRef: { key:"m040" },
      sources: [ { url:"https://medakazukan.net/0904_sasya/", referencedOn:"2026-07-16" } ]
    },

    {
      id: "m041", name: "神紅玉錦", reading: "しんこうぎょくにしき", aliases: [], status: "draft",
      phenotype: { bodyColor:"", pattern:"錦", iridophore:"", bodyType:"", finVariation:"", eyeVariation:"" },
      refTags: ["ハウスネーム"],
      lineage: { strain:"要確認", parentIds:[] },
      origin: { breeder:"調査中", year:"調査中", story:"" },
      description: "めだかの館で扱われるハウスネーム品種です。公開されている情報がほとんどなく、体色や作出の詳細は現在調査中です。",
      care: { difficulty:null, points:[] },
      fixation: [],
      photos: [ { mode:"link", url:"https://www.medakanoyakata.jp/?pid=192658073", caption:"参考：神紅玉錦（めだかの館）", credit:"めだかの館", usage:"参照リンクのみ（画像は転載しない）" } ],
      similarIds: [],
      genotype: {}, myRecords: { keeping:[], breeding:[] }, priceRef: { key:"m041" },
      sources: [ { url:"https://www.medakanoyakata.jp/?pid=192658073", referencedOn:"2026-07-16" } ]
    },

    {
      id: "m042", name: "王華", reading: "おうか", aliases: ["白朱赤ラメ"], status: "done",
      phenotype: { bodyColor:"", pattern:"二色", iridophore:"ラメ", bodyType:"普通体型", finVariation:"なし", eyeVariation:"なし" },
      refTags: ["ラメ"],
      lineage: { strain:"白朱赤ラメ", parentIds:["m008"] },
      origin: { breeder:"岡田卓也（上州めだか）", year:"2020年",
        story:"「三色ラメ」と「三色体外光」の強いラメ個体、さらに「紅白ラメ」を掛け合わせて生まれた品種で、2020年に上州めだかの岡田卓也氏によって作出されました。" },
      description: "王華は、白と朱赤（紅白）の二色の体に、背中に密集した強いラメを持つ品種です。従来の紅白ラメと比べ、ラメの幅と密度に優れるとされ、華やかで豪華な印象を与えます。\n\n理想的な紅白の色合いと高密度のラメがそろった個体は生まれる確率が低く、選別には手間がかかるとされています。",
      care: { difficulty:4, points:["理想の紅白＋高密度ラメの個体は希少で選別に手間がかかる"] },
      fixation: [ { rate:"低い（理想個体は約20%以下とされる）", source:"medakalog.shop", checkedOn:"2026-07-16" } ],
      photos: [ { mode:"link", url:"https://medakazukan.net/0896_ouka/", caption:"参考：王華 No.0896（改良メダカWEB図鑑）", credit:"改良メダカWEB図鑑", usage:"参照リンクのみ（画像は転載しない）" } ],
      similarIds: ["m008"],
      genotype: {}, myRecords: { keeping:[], breeding:[] }, priceRef: { key:"m042" },
      sources: [ { url:"https://medakazukan.net/0896_ouka/", referencedOn:"2026-07-16" }, { url:"https://www.medakalog.shop/ohka/", referencedOn:"2026-07-16" } ]
    },

    {
      id: "m043", name: "フロマージュラメスワロー", reading: "ふろまーじゅらめすわろー", aliases: ["フロマージュ"], status: "done",
      phenotype: { bodyColor:"黄金", pattern:"", iridophore:"ラメ", bodyType:"普通体型", finVariation:"スワロー", eyeVariation:"なし" },
      refTags: ["ラメ","スワロー"],
      lineage: { strain:"エメキン×ブラックダイヤ", parentIds:["m006"] },
      origin: { breeder:"垂水政治（愛媛）", year:"2023年",
        story:"「エメキン×ブラックダイヤ」由来の系統から、2023年に愛媛の垂水政治氏によって作出されました。飼育難易度や固定率については調査中です。" },
      description: "フロマージュラメスワローは、黄金からオレンジがかった体に、白く結晶化したようなフサフサのヒレ（スワロー）を持つ品種です。各ヒレに黄色がよく発現し、その姿がチーズケーキを連想させることから「フロマージュ（フランス語でチーズ）」と名付けられました。",
      care: { difficulty:null, points:[] },
      fixation: [],
      photos: [ { mode:"link", url:"https://www.medakanoyakata.jp/?pid=192647200", caption:"参考：フロマージュラメスワロー（めだかの館）", credit:"めだかの館", usage:"参照リンクのみ（画像は転載しない）" } ],
      similarIds: ["m006"],
      genotype: {}, myRecords: { keeping:[], breeding:[] }, priceRef: { key:"m043" },
      sources: [ { url:"https://www.medakanoyakata.jp/?pid=192647200", referencedOn:"2026-07-16" } ]
    },

    {
      id: "m044", name: "オロチダルマ", reading: "おろちだるま", aliases: ["オロチ半ダルマ"], status: "done",
      phenotype: { bodyColor:"オロチ", pattern:"無地", iridophore:"なし", bodyType:"ダルマ", finVariation:"なし", eyeVariation:"なし" },
      refTags: [],
      lineage: { strain:"オロチ系", parentIds:["m005"] },
      origin: { breeder:"谷國昌博（飛鳥めだか）※オロチ本体", year:"不明（オロチ本体は2016年）",
        story:"オロチ本体は2016年に飛鳥めだかの谷國昌博氏が作出しました。そのダルマ体型版で、組み合わせとしての作出年は調査中です。" },
      description: "オロチダルマは、漆黒で背地反応のない「オロチ」を、ダルマ体型（体長が通常の約半分の丸く短い体型）にした品種です。目やヒレまで黒く、白い容器に入れても黒が落ちない、まん丸で真っ黒な愛らしい姿が魅力です。丈夫で飼いやすい品種でもあります。",
      care: { difficulty:2, points:["丈夫で初心者向け","白容器でも黒が落ちない","ダルマ体型は水温変化に注意"] },
      fixation: [],
      photos: [ { mode:"link", url:"https://medakazukan.net/0830_orochidharma/", caption:"参考：オロチダルマ No.0830（改良メダカWEB図鑑）", credit:"改良メダカWEB図鑑", usage:"参照リンクのみ（画像は転載しない）" } ],
      similarIds: ["m005"],
      genotype: {}, myRecords: { keeping:[], breeding:[] }, priceRef: { key:"m044" },
      sources: [ { url:"https://medakazukan.net/0830_orochidharma/", referencedOn:"2026-07-16" } ]
    },

    {
      id: "m045", name: "さくら", reading: "さくら", aliases: ["さくら（ショート）"], status: "done",
      phenotype: { bodyColor:"ピンク", pattern:"", iridophore:"ラメ", bodyType:"", finVariation:"なし", eyeVariation:"なし" },
      refTags: ["ラメ"],
      lineage: { strain:"ピンクサファイア系", parentIds:[] },
      origin: { breeder:"不明", year:"不明",
        story:"ピンクサファイア系から生まれた品種です。作出者・作出年は調査中です。" },
      description: "さくらは、桜の花びらを思わせる淡いピンクの体に、ピンクや青など暖色・冷色が混ざる強いラメを持つ品種です。上から見た（上見）ときのラメの輝きが美しく、ヒレもピンクに染まります。短く丸みのある体型（ショート）が愛らしい印象を与えます。",
      care: { difficulty:null, points:[] },
      fixation: [],
      photos: [ { mode:"link", url:"https://www.medakanoyakata.jp/?pid=192647196", caption:"参考：さくら（ショート）（めだかの館）", credit:"めだかの館", usage:"参照リンクのみ（画像は転載しない）" } ],
      similarIds: [],
      genotype: {}, myRecords: { keeping:[], breeding:[] }, priceRef: { key:"m045" },
      sources: [ { url:"https://www.medakanoyakata.jp/?pid=192647196", referencedOn:"2026-07-16" } ]
    },

    {
      id: "m046", name: "碧", reading: "へき", aliases: ["あおい"], status: "done",
      phenotype: { bodyColor:"スカイブルー(青)", pattern:"無地", iridophore:"ラメ", bodyType:"普通体型", finVariation:"なし", eyeVariation:"なし" },
      refTags: ["ラメ"],
      lineage: { strain:"青系", parentIds:[] },
      origin: { breeder:"不明", year:"不明",
        story:"青系の品種ですが、作出者・作出年は調査中です。" },
      description: "碧（へき）は、青い体に質の良い青ラメがよく発現する品種です。落ち着いた青の地色にラメの輝きが映える、涼しげな美しさがあります。",
      care: { difficulty:null, points:[] },
      fixation: [],
      photos: [ { mode:"link", url:"https://www.medakanoyakata.jp/?pid=192647195", caption:"参考：碧（めだかの館）", credit:"めだかの館", usage:"参照リンクのみ（画像は転載しない）" } ],
      similarIds: [],
      genotype: {}, myRecords: { keeping:[], breeding:[] }, priceRef: { key:"m046" },
      sources: [ { url:"https://www.medakanoyakata.jp/?pid=192647195", referencedOn:"2026-07-16" } ]
    },

    {
      id: "m047", name: "東天光", reading: "とうてんこう", aliases: ["楊貴妃ヒカリ"], status: "done",
      phenotype: { bodyColor:"楊貴妃(朱赤)", pattern:"無地", iridophore:"ヒカリ体型由来の光沢", bodyType:"ヒカリ体型", finVariation:"なし", eyeVariation:"なし" },
      refTags: [],
      lineage: { strain:"楊貴妃系統", parentIds:["m004"] },
      origin: { breeder:"大場幸雄（めだかの館）", year:"2005年",
        story:"2005年に大場幸雄氏が作出したとされています。楊貴妃の固定化を進める過程で、朱赤のヒカリ体型の個体が生まれ、それを選抜・固定して東天光となりました。名前は「東天紅」の「紅」を「光」に変えたもので、背中のグアニンの輝きが日の出を思わせることに由来するとされています。" },
      description: "朱赤ヒカリ体型のメダカ品種で、楊貴妃系統から生まれました。ヒカリ体型とは、背びれと尻びれが同じような形になり、尾びれがひし形になる体型のことです。背中にはグアニンという光沢物質があり、上から見ると強く輝いて見えるのが最大の魅力です。\n\n体は丈夫で、初心者にも飼いやすい品種とされています。固定率（親と同じ特徴の子が生まれる割合）は99%以上とされ、累代しても安定して同じ姿の個体が生まれやすいです。ただし背骨が曲がった個体が出ることがあるため、選別の際には避けるようにします。",
      care: { difficulty:1, points:["丈夫で初心者向け","上見でグアニンの光沢が際立つ","骨曲がり個体は選別で避ける"] },
      fixation: [ { rate:"99%以上", source:"改良メダカWEB図鑑 No.0002", checkedOn:"2026-07-18" } ],
      photos: [ { mode:"link", url:"https://medakazukan.net/0002_totenko/", caption:"参考：東天光 No.0002（改良メダカWEB図鑑）", credit:"改良メダカWEB図鑑", usage:"参照リンクのみ（画像は転載しない）" } ],
      similarIds: ["m004"],
      genotype: {}, myRecords: { keeping:[], breeding:[] }, priceRef: { key:"m047" },
      sources: [ { url:"https://medakazukan.net/0002_totenko/", referencedOn:"2026-07-18" } ]
    },

    {
      id: "m048", name: "初恋", reading: "はつこい", aliases: ["楊貴妃ダルマ"], status: "done",
      phenotype: { bodyColor:"楊貴妃(朱赤)", pattern:"無地", iridophore:"なし", bodyType:"ダルマ", finVariation:"なし", eyeVariation:"なし" },
      refTags: [],
      lineage: { strain:"楊貴妃系統", parentIds:["m004"] },
      origin: { breeder:"大場幸雄（めだかの館）", year:"2005年",
        story:"2005年に大場幸雄氏が作出したとされています。楊貴妃の系統からダルマ体型の個体が生まれ、これを累代して固定したのが初恋です。名前は、来店したお客様が「初めてメダカに恋をした」と話したことに由来するとされています。" },
      description: "朱赤ダルマ体型のメダカ品種で、楊貴妃系統から生まれました。ダルマ体型とは背骨の一部が短くなった体型のことで、体長は普通のメダカの半分ほどしかなく、丸くて愛嬌のある姿と独特の泳ぎ方が魅力です。\n\n水温や水質の変化にはやや敏感とされ、転覆しやすいこともあるため単独飼育がすすめられています。ダルマ同士を交配しても普通体型・半ダルマ・ダルマが混ざって生まれ、完全には固定しません。高水温になるほどダルマの出現率が上がるとされています。",
      care: { difficulty:3, points:["高水温でダルマ出現率が上がる","水温・水質の変化にやや敏感","転覆しやすく単種飼育が無難"] },
      fixation: [ { rate:"50%以上", source:"改良メダカWEB図鑑 No.0003", checkedOn:"2026-07-18" } ],
      photos: [ { mode:"link", url:"https://medakazukan.net/0003_hatsukoi/", caption:"参考：初恋 No.0003（改良メダカWEB図鑑）", credit:"改良メダカWEB図鑑", usage:"参照リンクのみ（画像は転載しない）" } ],
      similarIds: ["m004"],
      genotype: {}, myRecords: { keeping:[], breeding:[] }, priceRef: { key:"m048" },
      sources: [ { url:"https://medakazukan.net/0003_hatsukoi/", referencedOn:"2026-07-18" } ]
    },

    {
      id: "m049", name: "ピュアホワイト", reading: "ぴゅあほわいと", aliases: ["ミルキー"], status: "done",
      phenotype: { bodyColor:"ピュアホワイト(白)", pattern:"無地", iridophore:"なし", bodyType:"普通体型", finVariation:"なし", eyeVariation:"なし" },
      refTags: [],
      lineage: { strain:"ミルキー系統", parentIds:["m002"] },
      origin: { breeder:"大場幸雄（めだかの館）", year:"2003年",
        story:"2003年に大場幸雄氏が作出したとされています。数千匹の中からオスのミルキー個体を見出し、これを反復して交配を重ねることで、雌雄ともに安定して純白が生まれる系統として確立されました。" },
      description: "高い純白性を持つ白メダカ品種で、ミルキー系統から生まれました。黄色素胞（黄色を出す色素細胞）が完全に欠如しているため、従来の白メダカに出やすいクリーム色を帯びることがなく、雌雄ともに安定した純白の体色になるのが特徴です。\n\n飼育は一般的な白メダカと同様に容易とされています。固定率は99%以上とされ、累代しても純白の特徴が安定して受け継がれます。暗い色の容器や水草を背景にすると、白さがより一層際立って見えます。",
      care: { difficulty:2, points:["丈夫で飼いやすい","暗色容器や水草で白が映える","黄色素胞がなくクリーム色を帯びない"] },
      fixation: [ { rate:"99%以上", source:"改良メダカWEB図鑑", checkedOn:"2026-07-18" } ],
      photos: [ { mode:"link", url:"https://medakazukan.net/0007_purewhite/", caption:"参考：ピュアホワイト（改良メダカWEB図鑑）", credit:"改良メダカWEB図鑑", usage:"参照リンクのみ（画像は転載しない）" } ],
      similarIds: ["m002"],
      genotype: {}, myRecords: { keeping:[], breeding:[] }, priceRef: { key:"m049" },
      sources: [ { url:"https://medakazukan.net/0007_purewhite/", referencedOn:"2026-07-18" } ]
    },

    {
      id: "m050", name: "スカイブルー", reading: "すかいぶるー", aliases: ["青メダカ"], status: "done",
      phenotype: { bodyColor:"スカイブルー(青)", pattern:"無地", iridophore:"なし", bodyType:"普通体型", finVariation:"なし", eyeVariation:"なし" },
      refTags: [],
      lineage: { strain:"青メダカ系", parentIds:[] },
      origin: { breeder:"大場幸雄（めだかの館）", year:"2004年",
        story:"2004年に大場幸雄氏が作出したとされています。野生型由来の青系統を発展させ、オスとメスがそろって鮮やかなパールブルーになるよう改良を重ねて生まれました。" },
      description: "青色を代表するメダカ品種で、野生型（茶系）から黄色素胞が欠けた青系統がさらに発展して生まれました。黒色素胞と白色素胞の配置によって濃淡に奥行きが生まれ、群れで泳がせると涼しげな印象を与えます。\n\n従来の青メダカはオスが灰色っぽく、メスがパールブルーというように雌雄で色合いが異なっていましたが、スカイブルーはオスにも明るいパールブルーを遺伝させることに世界で初めて成功したとされています。飼育は容易とされていますが、固定率については分かっていません。",
      care: { difficulty:2, points:["丈夫で飼いやすい","雌雄そろって明るいパールブルー","群泳させると涼しげ"] },
      fixation: [],
      photos: [ { mode:"link", url:"https://medakazukan.net/0059_skyblue/", caption:"参考：スカイブルー（改良メダカWEB図鑑）", credit:"改良メダカWEB図鑑", usage:"参照リンクのみ（画像は転載しない）" } ],
      similarIds: ["m003","m016"],
      genotype: {}, myRecords: { keeping:[], breeding:[] }, priceRef: { key:"m050" },
      sources: [ { url:"https://medakazukan.net/0059_skyblue/", referencedOn:"2026-07-18" } ]
    },

    {
      id: "m051", name: "ブラック", reading: "ぶらっく", aliases: ["小川ブラック"], status: "done",
      phenotype: { bodyColor:"ブラック", pattern:"無地", iridophore:"なし", bodyType:"普通体型", finVariation:"なし", eyeVariation:"なし" },
      refTags: [],
      lineage: { strain:"ブラック系統", parentIds:[] },
      origin: { breeder:"小川祝治（発見）／堀田祐二（育成）※諸説あり", year:"2009年",
        story:"2009年に小川祝治氏が見出した黒っぽい個体を、堀田祐二氏が選別・育成して生まれたとされています。ただし作出者に関する記述は情報源によって幅があり、詳しい経緯は調査中です。" },
      description: "黒色を代表するメダカ品種で、別名「小川ブラック」とも呼ばれます。最大の特徴は「背地反応」（周囲の明るさに合わせて体色が薄くなる反応）がほとんどないことで、白い容器に入れても黒さを保ち続けます。\n\n屋外で日光を浴びせると黒の質がより上がるとされています。選別の際には、白い容器に1日入れてもなお黒さを保つ個体を選びます。飼育は容易とされていますが、固定率は分かっていません。",
      care: { difficulty:2, points:["背地反応がなく白容器でも黒い","屋外の日光で黒の質が上がる","白容器で黒を保つ個体を選別"] },
      fixation: [],
      photos: [ { mode:"link", url:"https://medakazukan.net/0019_black/", caption:"参考：ブラック No.0019（改良メダカWEB図鑑）", credit:"改良メダカWEB図鑑", usage:"参照リンクのみ（画像は転載しない）" } ],
      similarIds: ["m005","m006"],
      genotype: {}, myRecords: { keeping:[], breeding:[] }, priceRef: { key:"m051" },
      sources: [ { url:"https://medakazukan.net/0019_black/", referencedOn:"2026-07-18" } ]
    },

    {
      id: "m052", name: "銀河", reading: "ぎんが", aliases: ["シルバーヒカリ"], status: "done",
      phenotype: { bodyColor:"スカイブルー(青)", pattern:"無地", iridophore:"ヒカリ体型由来の光沢", bodyType:"ヒカリ体型", finVariation:"なし", eyeVariation:"なし" },
      refTags: [],
      lineage: { strain:"青パール系統", parentIds:[] },
      origin: { breeder:"大場幸雄（めだかの館）", year:"2005年",
        story:"2005年に大場幸雄氏が作出したとされています。ヒカリ体型の腹部にある虹色素胞の輝きを強化する改良を重ね、青い体にグアニンの銀の輝きを重ねた品種として生まれました。" },
      description: "青ヒカリ体型のメダカ品種で、青パール系統から生まれました。ヒカリ体型とは背びれと尻びれが同じような形になる体型のことで、腹部の虹色素胞（光を反射する色素細胞）の輝きが強化されているのが特徴です。青い体にグアニン（光沢物質）による銀色の輝きが重なり、質の良い個体は文字通り銀色に輝いて見えます。\n\n頭部と尾びれには黄色が差し色として入り、青と黄色の二色配色も魅力の一つです。飼育は容易とされ、屋外で自然光を浴びると光沢がより美しく映えます。固定率については分かっていません。",
      care: { difficulty:2, points:["丈夫で飼いやすい","青の体に頭・尾ビレの黄が差し色","屋外・自然光で光沢が映える"] },
      fixation: [],
      photos: [ { mode:"link", url:"https://medakazukan.net/0063_ginga/", caption:"参考：銀河 No.0063（改良メダカWEB図鑑）", credit:"改良メダカWEB図鑑", usage:"参照リンクのみ（画像は転載しない）" } ],
      similarIds: ["m047","m050"],
      genotype: {}, myRecords: { keeping:[], breeding:[] }, priceRef: { key:"m052" },
      sources: [ { url:"https://medakazukan.net/0063_ginga/", referencedOn:"2026-07-18" } ]
    },

    {
      id: "m053", name: "白幹之", reading: "しろみゆき", aliases: ["白青幹之","白体外光"], status: "done",
      phenotype: { bodyColor:"ピュアホワイト(白)", pattern:"無地", iridophore:"体外光(幹之)", bodyType:"普通体型", finVariation:"なし", eyeVariation:"なし" },
      refTags: ["体外光"],
      lineage: { strain:"幹之系統", parentIds:["m003"] },
      origin: { breeder:"菅高志", year:"2007年ごろ",
        story:"2007年ごろに菅高志氏が作出したとされています。幹之系統の中から白い体色に体外光が乗る個体が生まれ、これを選別・固定して白幹之となったとされていますが、詳しい経緯は調査中です。" },
      description: "白い体色に体外光（背中に沿って走る光の帯）が乗る、幹之系統のメダカ品種です。光の強さによって弱光・強光・スーパー光・極光といったグレードに分けられ、光の伸び方や強さを楽しむ品種として人気があります。\n\n白い容器で飼育すると光が強く出やすく、逆に黒い容器では光が目立ちにくくなることがあるとされています。また、水温が30℃前後と高めのほうが体外光が伸びやすいとされています。固定率は非公表ですが、幹之系全般では9割以上が親に似るとの報告があります。飼育は容易とされています。",
      care: { difficulty:2, points:["白容器で体外光が強く出やすい","高水温だと体外光が伸びやすい","黒容器では光が目立ちにくい"] },
      fixation: [],
      photos: [ { mode:"link", url:"https://medakazukan.net/0104_siromiyuki/", caption:"参考：白幹之 No.0104（改良メダカWEB図鑑）", credit:"改良メダカWEB図鑑", usage:"参照リンクのみ（画像は転載しない）" } ],
      similarIds: ["m003"],
      genotype: {}, myRecords: { keeping:[], breeding:[] }, priceRef: { key:"m053" },
      sources: [ { url:"https://medakazukan.net/0104_siromiyuki/", referencedOn:"2026-07-18" } ]
    },

    {
      id: "m054", name: "マリンブルー", reading: "まりんぶるー", aliases: [], status: "done",
      phenotype: { bodyColor:"スカイブルー(青)", pattern:"無地", iridophore:"体外光(幹之)", bodyType:"普通体型", finVariation:"なし", eyeVariation:"なし" },
      refTags: ["体外光"],
      lineage: { strain:"青幹之系統", parentIds:["m003"] },
      origin: { breeder:"長岡龍聖", year:"2011年",
        story:"2011年に長岡龍聖氏が作出したとされています。青幹之の中から黒色素胞が少なく「水のような体色」を持つ個体を見出し、白幹之との交配を経てマリンブルーが生まれたとされています。同じ長岡氏による品種「深海」と近い系統とされますが、両者の前後関係については情報源により記述に幅があります。" },
      description: "明るい青色の体色に体外光が乗り、腹膜（お腹の内側の膜）が青く輝くのが最大の特徴のメダカ品種です。青幹之系統から生まれました。濃い色の容器で飼育すると保護色によって黒ずみ、別の品種のように見えてしまうことがあるため、白い容器での飼育がすすめられています。\n\n体外光や腹膜の色の出方には個体差があり、良い個体を残すには選別が重要とされています。固定率は非公表です。",
      care: { difficulty:3, points:["白容器での飼育が必須（濃色容器で黒ずむ）","腹膜の青い輝きが特徴","体外光・腹膜の色は個体差があり選別が重要"] },
      fixation: [],
      photos: [ { mode:"link", url:"https://medakazukan.net/0016_marineblue/", caption:"参考：マリンブルー No.0016（改良メダカWEB図鑑）", credit:"改良メダカWEB図鑑", usage:"参照リンクのみ（画像は転載しない）" } ],
      similarIds: ["m016","m050"],
      genotype: {}, myRecords: { keeping:[], breeding:[] }, priceRef: { key:"m054" },
      sources: [ { url:"https://medakazukan.net/0016_marineblue/", referencedOn:"2026-07-18" } ]
    },

    {
      id: "m055", name: "ピンク", reading: "ぴんく", aliases: ["ピンクメダカ","桃色メダカ"], status: "done",
      phenotype: { bodyColor:"ピンク", pattern:"無地", iridophore:"なし", bodyType:"普通体型", finVariation:"なし", eyeVariation:"なし" },
      refTags: [],
      lineage: { strain:"朱赤（楊貴妃）系", parentIds:["m004"] },
      origin: { breeder:"不明", year:"不明（2003年には流通）",
        story:"作出者・作出年ともに調査中ですが、2003年には既に流通していたとの記述があります。朱赤系の体色に白色素胞を発達させる遺伝子が働いたことでピンク色が生まれたとされています。" },
      description: "桃色を基本とするメダカ品種で、朱赤（楊貴妃）系の体色に白色素胞を発達させるci遺伝子が働くことでピンク色が表れるとされています。ヒレに朱赤の名残が出る個体もあり、体とヒレの色の違いも見どころの一つです。\n\n白メダカとの境界ははっきりせず、ピンクがかった白から白っぽいピンクまで幅があります。流通量は意外に多くなく、可愛らしい色合いから人気がある品種です。小春やピンク錦といった派生品種の基礎にもなっています。飼育は他のメダカと同様で難しくありません。固定率については分かっていません。",
      care: { difficulty:2, points:["飼育は他のメダカと同様で容易","ヒレに朱赤の名残が出ることがある","白メダカとの境界は連続的"] },
      fixation: [],
      photos: [ { mode:"link", url:"https://medakazukan.net/0031_pink/", caption:"参考：ピンク No.0031（改良メダカWEB図鑑）", credit:"改良メダカWEB図鑑", usage:"参照リンクのみ（画像は転載しない）" } ],
      similarIds: ["m002","m029"],
      genotype: {}, myRecords: { keeping:[], breeding:[] }, priceRef: { key:"m055" },
      sources: [ { url:"https://medakazukan.net/0031_pink/", referencedOn:"2026-07-18" }, { url:"https://medakazukan.net/blog007/", referencedOn:"2026-07-18" } ]
    },

    {
      id: "m056", name: "紅白ラメ", reading: "こうはくらめ", aliases: ["白朱赤ラメ"], status: "done",
      phenotype: { bodyColor:"楊貴妃(朱赤)", pattern:"二色", iridophore:"ラメ", bodyType:"普通体型", finVariation:"なし", eyeVariation:"なし" },
      refTags: ["ラメ"],
      lineage: { strain:"三色ラメ幹之系統（オーロラ系）", parentIds:["m007"] },
      origin: { breeder:"静楽庵（岡山県）", year:"2016年",
        story:"2016年に静楽庵（岡山県）が作出したとされています。三色ラメ幹之の中から、黒いブチ模様が入らない個体を選抜して累代・固定したのが紅白ラメです。" },
      description: "白と朱赤の二色に、鱗の一枚一枚がラメのように輝く多色ラメが加わったメダカ品種です。オーロラ系の血を引く三色ラメ幹之系統から生まれました。非透明鱗のため白色がはっきりと発色し、紅白の縁起の良い柄とラメの輝きを併せ持つのが魅力です。\n\n明瞭な紅白模様が出る固定率は約10%（静楽庵調べ）とされ、黄色素が出てしまう個体も5〜6割ほどあるため、良い個体を残すには選別が重要です。",
      care: { difficulty:3, points:["紅白がはっきり出る固定率は低め","黄色素の出現率が高く選別が重要","非透明鱗で白がはっきり発色"] },
      fixation: [ { rate:"約10%（明瞭な紅白）", source:"静楽庵調べ", checkedOn:"2026-07-18" } ],
      photos: [ { mode:"link", url:"https://medakazukan.net/0181_kouhakurame/", caption:"参考：紅白ラメ No.0181（改良メダカWEB図鑑）", credit:"改良メダカWEB図鑑", usage:"参照リンクのみ（画像は転載しない）" } ],
      similarIds: ["m007","m014"],
      genotype: {}, myRecords: { keeping:[], breeding:[] }, priceRef: { key:"m056" },
      sources: [ { url:"https://medakazukan.net/0181_kouhakurame/", referencedOn:"2026-07-18" } ]
    }

  ]
};
