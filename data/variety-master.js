/* =====================================================================
 * variety-master.js  ―― 品種マスタ（正の品種名リスト）
 * ---------------------------------------------------------------------
 * 基準：改良メダカWEB図鑑「固定品種ナンバー一覧」（2021採番。通称名つき主要品種）
 *   出典：https://medakazukan.net/koteihinsyunumber/  取得日：2026-07-16
 * 目的：約300品種を計画的に投入するための"候補リスト（母集団）"。
 *   ・fixNo   … 固定品種No.（改良メダカWEB図鑑）
 *   ・name    … 通称（図鑑での品種名候補）
 *   ・type    … 品種名（＝形質の記述。JMA分類のヒントになる）
 *   ・note    … 補足
 *   ・status  … "done"（図鑑投入済み）/ "todo"（未着手）
 *   ・mappedId… 投入済みの場合、medaka-data.js の id
 * 補足：ここは"名寄せ済みの候補台帳"。実際の投入時に researcher が詳細と参照URLを取得する。
 *   固定品種No.のほか、品種No.（約600）・種類No.（約600）から今後追記して300へ広げる。
 * ===================================================================== */
window.MEDAKA_MASTER = {
  source: "改良メダカWEB図鑑 固定品種ナンバー一覧",
  sourceUrl: "https://medakazukan.net/koteihinsyunumber/",
  fetchedOn: "2026-07-16",
  note: "通称名のある主要品種を抽出。今後、品種No./種類No.から候補を追記して約300品種へ拡張する。",

  list: [
    { fixNo:"0001", name:"楊貴妃",          type:"朱赤",                     note:"", status:"done", mappedId:"m004" },
    { fixNo:"0002", name:"東天光",          type:"朱赤ヒカリ",               note:"", status:"done", mappedId:"m047" },
    { fixNo:"0003", name:"初恋",            type:"朱赤ダルマ",               note:"", status:"done", mappedId:"m048" },
    { fixNo:"0004", name:"朱天皇",          type:"朱赤ヒカリダルマ",         note:"", status:"todo", mappedId:null },
    { fixNo:"0005", name:"安芸黄金",        type:"黄金",                     note:"", status:"done", mappedId:"m012" },
    { fixNo:"0006", name:"秀吉",            type:"黄金ヒカリ",               note:"", status:"todo", mappedId:null },
    { fixNo:"0007", name:"金鱗丸",          type:"黄金ダルマ",               note:"", status:"todo", mappedId:null },
    { fixNo:"0008", name:"金皇丸",          type:"黄金ヒカリダルマ",         note:"", status:"todo", mappedId:null },
    { fixNo:"0009", name:"琥珀",            type:"琥珀",                     note:"", status:"done", mappedId:"m011" },
    { fixNo:"0010", name:"暁",              type:"琥珀ヒカリ",               note:"", status:"todo", mappedId:null },
    { fixNo:"0011", name:"琥珀丸",          type:"琥珀ダルマ",               note:"", status:"todo", mappedId:null },
    { fixNo:"0011", name:"晴信",            type:"ブラックスワロー",         note:"ブラック(ヒレ黄)、背地反応なし", status:"todo", mappedId:null },
    { fixNo:"0012", name:"琴琥",            type:"琥珀ヒカリダルマ",         note:"", status:"todo", mappedId:null },
    { fixNo:"0013", name:"楊貴妃透明鱗",    type:"朱赤透明鱗",               note:"N・D・HD", status:"todo", mappedId:null },
    { fixNo:"0014", name:"紅",              type:"朱赤透明鱗ヒカリ",         note:"別名：篤姫／福系 紅", status:"todo", mappedId:null },
    { fixNo:"0015", name:"ピュアホワイト",  type:"白",                       note:"N〜HD", status:"done", mappedId:"m049" },
    { fixNo:"0023", name:"スカイブルー",    type:"青",                       note:"", status:"done", mappedId:"m050" },
    { fixNo:"0024", name:"ブラック黄金",    type:"ブラック",                 note:"ブラック(ヒレ黄)、背地反応なし", status:"todo", mappedId:null },
    { fixNo:"0026", name:"ブラック",        type:"ブラック",                 note:"背地反応なし", status:"done", mappedId:"m051" },
    { fixNo:"0027", name:"銀河",            type:"青ヒカリ",                 note:"青(ヒレ黄)", status:"done", mappedId:"m052" },
    { fixNo:"0028", name:"煌",              type:"青ヒカリダルマ",           note:"青(ヒレ黄)", status:"todo", mappedId:null },
    { fixNo:"0044", name:"楊貴妃出目",      type:"朱赤出目",                 note:"", status:"todo", mappedId:null },
    { fixNo:"0049", name:"白幹之",          type:"白体外光",                 note:"", status:"done", mappedId:"m053" },
    { fixNo:"0050", name:"青幹之",          type:"青体外光",                 note:"図鑑では『幹之』として登録済み", status:"done", mappedId:"m003" },
    { fixNo:"0053", name:"彩光",            type:"白体内光",                 note:"", status:"todo", mappedId:null },
    { fixNo:"0054", name:"白ラメ幹之",      type:"白ラメ",                   note:"", status:"done", mappedId:"m013" },
    { fixNo:"0056", name:"紅鮭",            type:"琥珀透明鱗",               note:"", status:"todo", mappedId:null },
    { fixNo:"0057", name:"琥珀透明鱗",      type:"琥珀透明鱗ヒカリ",         note:"H・D・HD", status:"todo", mappedId:null },
    { fixNo:"0069", name:"黄金透明鱗",      type:"黄金透明鱗",               note:"N・H・D", status:"todo", mappedId:null },
    { fixNo:"0072", name:"白透明鱗",        type:"白透明鱗",                 note:"N・H・D・HD", status:"todo", mappedId:null },
    { fixNo:"0077", name:"シルバーラメ",    type:"青ラメヒカリ",             note:"青(ヒレ黄)", status:"todo", mappedId:null },
    { fixNo:"0091", name:"天女",            type:"白ヒカリ",                 note:"白(クリーム)", status:"todo", mappedId:null },
    { fixNo:"0092", name:"アルビノ幹之",    type:"白アルビノ体外光",         note:"", status:"todo", mappedId:null },
    { fixNo:"0093", name:"楊貴妃アルビノ",  type:"朱赤アルビノ",             note:"", status:"todo", mappedId:null },
    { fixNo:"0094", name:"青体内光",        type:"青体内光",                 note:"", status:"todo", mappedId:null },
    { fixNo:"0095", name:"天河",            type:"青ラメ体外光マルコ",       note:"", status:"todo", mappedId:null },
    { fixNo:"0096", name:"星河",            type:"青ラメ",                   note:"", status:"done", mappedId:"m017" },
    { fixNo:"0097", name:"ブラック透明鱗",  type:"ブラック透明鱗",           note:"背地反応なし", status:"todo", mappedId:null },
    { fixNo:"0098", name:"流星",            type:"青体外光マルコ",           note:"", status:"todo", mappedId:null },
    { fixNo:"0101", name:"蛍",              type:"白体内光ダルマ",           note:"", status:"todo", mappedId:null },
    { fixNo:"0102", name:"楊貴妃スワロー",  type:"朱赤スワロー",             note:"N・H・D", status:"todo", mappedId:null },
    { fixNo:"0105", name:"黄金スワロー",    type:"黄金スワロー",             note:"", status:"todo", mappedId:null },
    { fixNo:"0107", name:"琥珀スワロー",    type:"琥珀スワロー",             note:"", status:"todo", mappedId:null },
    { fixNo:"0109", name:"景虎",            type:"ブラックスワロー",         note:"背地反応なし", status:"todo", mappedId:null },
    { fixNo:"0110", name:"謙信",            type:"ブラックスワローヒカリ",   note:"背地反応なし", status:"todo", mappedId:null },
    { fixNo:"0112", name:"信玄",            type:"ブラックスワローヒカリ",   note:"ブラック(ヒレ黄)、背地反応なし", status:"todo", mappedId:null },
    { fixNo:"0115", name:"青幹之ヒレ長",    type:"青体外光ヒレ長",           note:"", status:"todo", mappedId:null },
    { fixNo:"0118", name:"白幹之ヒレ長",    type:"白体外光ヒレ長",           note:"", status:"todo", mappedId:null },
    { fixNo:"0121", name:"星河スワロー",    type:"青ラメスワロー",           note:"", status:"todo", mappedId:null },
    { fixNo:"0123", name:"黒ラメ幹之",      type:"ブラックラメ",             note:"ラメ(多色)。サファイア系の母体", status:"done", mappedId:"m007" },
    { fixNo:"0124", name:"黄金ラメ",        type:"黄金ラメ",                 note:"", status:"todo", mappedId:null },
    { fixNo:"0127", name:"琥珀ラメ",        type:"琥珀ラメ",                 note:"", status:"todo", mappedId:null },
    { fixNo:"0128", name:"ピンクラメ",      type:"ピンクラメ",               note:"", status:"todo", mappedId:null },
    { fixNo:"0129", name:"オレンジラメ",    type:"オレンジラメ",             note:"", status:"todo", mappedId:null },
    { fixNo:"0130", name:"白錦",            type:"白斑",                     note:"", status:"todo", mappedId:null },
    { fixNo:"0131", name:"マリンブルー",    type:"青体外光",                 note:"腹膜青。深海の母体", status:"done", mappedId:"m054" },
    { fixNo:"0132", name:"深海",            type:"青",                       note:"腹膜青", status:"done", mappedId:"m016" },
    { fixNo:"0133", name:"ピンク",          type:"ピンク",                   note:"図鑑記事はNo.0031", status:"done", mappedId:"m055" },
    { fixNo:"0134", name:"小春",            type:"ピンクスワロー",           note:"", status:"todo", mappedId:null },
    { fixNo:"0138", name:"シースルー",      type:"白アルビノ",               note:"シースルー", status:"todo", mappedId:null },
    { fixNo:"0139", name:"ホクト",          type:"青透明鱗腹膜光",           note:"体内黒", status:"todo", mappedId:null },
    { fixNo:"0141", name:"小雪",            type:"白体内光",                 note:"白(クリーム)", status:"todo", mappedId:null },
    { fixNo:"0142", name:"全身体内光",      type:"青全身体内光",             note:"", status:"todo", mappedId:null },
    { fixNo:"0145", name:"紅薊",            type:"朱赤透明鱗ブラックリムヒカリ", note:"ヒレ美", status:"done", mappedId:"m018" },
    { fixNo:"0147", name:"楊貴妃ヒレ長",    type:"朱赤ヒレ長",               note:"", status:"todo", mappedId:null },
    { fixNo:"0148", name:"ピンクメラー",    type:"ピンクメラー",             note:"", status:"todo", mappedId:null },
    { fixNo:"0150", name:"紅白ラメ",        type:"白朱赤ラメ",               note:"図鑑記事はNo.0181", status:"done", mappedId:"m056" }
  ],

  /* ---------------------------------------------------------------------
   * ハウスネーム品種（図鑑・JMA未収録の、作出者/ショップ独自の呼び名）
   * ・SNS・ショップ・オークションで発見。出典は「発見リンク」で残す。
   * ・verified:false ＝ 一次情報での裏取り未了（要確認）。図鑑・JMAに収録され次第、
   *   verified:true に昇格し list（正規）へ移す。
   * ------------------------------------------------------------------- */
  houseNames: [
    {
      name: "バカラ", reading: "ばから", nameType: "ハウスネーム", verified: false,
      characteristic: "非常に青い体色（青系）",
      breeder: "@halokillfish（関連・要確認）",
      discovery: {
        source: "Instagram",
        url: "https://www.instagram.com/p/DZrFiE_ErhU/",
        account: "@medaka_factory_edo（江戸オク）",
        date: "2026-07-16"
      },
      status: "done", mappedId: "m021",
      note: "図鑑・JMA未収録のハウスネーム。作出者・作出年・分類は要確認"
    }
  ]
};
