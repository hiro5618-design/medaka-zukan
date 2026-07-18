/* =====================================================================
 * price-history.js  ―― 相場（価格）履歴データ  ※このファイルは price_crawler.py が自動生成します
 * ---------------------------------------------------------------------
 * 1レコード ＝ 品種ID × 調査日 × 情報源。中に卵/針子/成魚の3ステージ。
 * 各ステージ：min(最安)/avg(平均)/max(最高)/count(件数)/minUrl(最安出品URL)/note(備考)
 * ===================================================================== */
window.MEDAKA_PRICES = {
  currency: "JPY",
  note: "楽天市場の複数ショップの出品から集計した参考相場です。数量・サイズは出品により異なります。",
  records: [
  {
    "id": "m004",
    "checkedOn": "2026-07-18",
    "source": "楽天市場",
    "searchUrl": "https://search.rakuten.co.jp/search/mall/%E3%83%A1%E3%83%80%E3%82%AB%20%E6%A5%8A%E8%B2%B4%E5%A6%83/",
    "stages": {
      "egg": {
        "min": null,
        "avg": null,
        "max": null,
        "count": 0,
        "minUrl": "",
        "note": "数量（10個入り等）は出品により異なります"
      },
      "fry": {
        "min": 650,
        "avg": 1407,
        "max": 2580,
        "count": 7,
        "minUrl": "https://item.rakuten.co.jp/medakamijinko/youkihi/",
        "note": "匹数は出品により異なります"
      },
      "adult": {
        "min": 759,
        "avg": 2549,
        "max": 11180,
        "count": 22,
        "minUrl": "https://item.rakuten.co.jp/emuwai/10000278/",
        "note": "匹数・サイズは出品により異なります"
      }
    }
  },
  {
    "id": "m001",
    "checkedOn": "2026-07-18",
    "source": "楽天市場",
    "searchUrl": "https://search.rakuten.co.jp/search/mall/%E3%83%A1%E3%83%80%E3%82%AB%20%E3%83%92%E3%83%A1%E3%83%80%E3%82%AB/",
    "stages": {
      "egg": {
        "min": null,
        "avg": null,
        "max": null,
        "count": 0,
        "minUrl": "",
        "note": "数量（10個入り等）は出品により異なります"
      },
      "fry": {
        "min": null,
        "avg": null,
        "max": null,
        "count": 0,
        "minUrl": "",
        "note": "匹数は出品により異なります"
      },
      "adult": {
        "min": 690,
        "avg": 1578,
        "max": 2980,
        "count": 8,
        "minUrl": "https://item.rakuten.co.jp/chanet/13585/",
        "note": "匹数・サイズは出品により異なります"
      }
    }
  },
  {
    "id": "m002",
    "checkedOn": "2026-07-18",
    "source": "楽天市場",
    "searchUrl": "https://search.rakuten.co.jp/search/mall/%E3%83%A1%E3%83%80%E3%82%AB%20%E7%99%BD%E3%83%A1%E3%83%80%E3%82%AB/",
    "stages": {
      "egg": {
        "min": null,
        "avg": null,
        "max": null,
        "count": 0,
        "minUrl": "",
        "note": "数量（10個入り等）は出品により異なります"
      },
      "fry": {
        "min": null,
        "avg": null,
        "max": null,
        "count": 0,
        "minUrl": "",
        "note": "匹数は出品により異なります"
      },
      "adult": {
        "min": 750,
        "avg": 2354,
        "max": 5175,
        "count": 10,
        "minUrl": "https://item.rakuten.co.jp/chanet/16120/",
        "note": "匹数・サイズは出品により異なります"
      }
    }
  },
  {
    "id": "m003",
    "checkedOn": "2026-07-18",
    "source": "楽天市場",
    "searchUrl": "https://search.rakuten.co.jp/search/mall/%E3%83%A1%E3%83%80%E3%82%AB%20%E5%B9%B9%E4%B9%8B/",
    "stages": {
      "egg": {
        "min": 1480,
        "avg": 1540,
        "max": 1600,
        "count": 2,
        "minUrl": "https://item.rakuten.co.jp/wga7/medakakujiyuuseiran/",
        "note": "数量（10個入り等）は出品により異なります"
      },
      "fry": {
        "min": 500,
        "avg": 1470,
        "max": 2480,
        "count": 7,
        "minUrl": "https://item.rakuten.co.jp/medakayama/a1m10015_10/",
        "note": "匹数は出品により異なります"
      },
      "adult": {
        "min": 870,
        "avg": 1816,
        "max": 3000,
        "count": 17,
        "minUrl": "https://item.rakuten.co.jp/chanet/580288/",
        "note": "匹数・サイズは出品により異なります"
      }
    }
  },
  {
    "id": "m005",
    "checkedOn": "2026-07-18",
    "source": "楽天市場",
    "searchUrl": "https://search.rakuten.co.jp/search/mall/%E3%83%A1%E3%83%80%E3%82%AB%20%E3%82%AA%E3%83%AD%E3%83%81/",
    "stages": {
      "egg": {
        "min": 980,
        "avg": 1487,
        "max": 2180,
        "count": 6,
        "minUrl": "https://item.rakuten.co.jp/wga7/omikujiegg20/",
        "note": "数量（10個入り等）は出品により異なります"
      },
      "fry": {
        "min": 980,
        "avg": 2212,
        "max": 3500,
        "count": 10,
        "minUrl": "https://item.rakuten.co.jp/medakamijinko/oroti/",
        "note": "匹数は出品により異なります"
      },
      "adult": {
        "min": 800,
        "avg": 2231,
        "max": 6000,
        "count": 9,
        "minUrl": "https://item.rakuten.co.jp/auc-medakaen/10000209/",
        "note": "匹数・サイズは出品により異なります"
      }
    }
  },
  {
    "id": "m006",
    "checkedOn": "2026-07-18",
    "source": "楽天市場",
    "searchUrl": "https://search.rakuten.co.jp/search/mall/%E3%83%A1%E3%83%80%E3%82%AB%20%E3%83%96%E3%83%A9%E3%83%83%E3%82%AF%E3%83%80%E3%82%A4%E3%83%A4/",
    "stages": {
      "egg": {
        "min": 1600,
        "avg": 1600,
        "max": 1600,
        "count": 2,
        "minUrl": "https://item.rakuten.co.jp/peacegarden/compass1716208190/",
        "note": "数量（10個入り等）は出品により異なります"
      },
      "fry": {
        "min": 1030,
        "avg": 1776,
        "max": 2980,
        "count": 6,
        "minUrl": "https://item.rakuten.co.jp/chanet/595595/",
        "note": "匹数は出品により異なります"
      },
      "adult": {
        "min": 1099,
        "avg": 4758,
        "max": 27000,
        "count": 15,
        "minUrl": "https://item.rakuten.co.jp/emuwai/10001374/",
        "note": "匹数・サイズは出品により異なります"
      }
    }
  },
  {
    "id": "m007",
    "checkedOn": "2026-07-18",
    "source": "楽天市場",
    "searchUrl": "https://search.rakuten.co.jp/search/mall/%E3%83%A1%E3%83%80%E3%82%AB%20%E3%82%B5%E3%83%95%E3%82%A1%E3%82%A4%E3%82%A2/",
    "stages": {
      "egg": {
        "min": 980,
        "avg": 1353,
        "max": 1600,
        "count": 3,
        "minUrl": "https://item.rakuten.co.jp/genkimedaka/compass1720335199/",
        "note": "数量（10個入り等）は出品により異なります"
      },
      "fry": {
        "min": 890,
        "avg": 1914,
        "max": 2980,
        "count": 9,
        "minUrl": "https://item.rakuten.co.jp/medakastory/10002119/",
        "note": "匹数は出品により異なります"
      },
      "adult": {
        "min": 980,
        "avg": 3779,
        "max": 11000,
        "count": 16,
        "minUrl": "https://item.rakuten.co.jp/chanet/591739/",
        "note": "匹数・サイズは出品により異なります"
      }
    }
  },
  {
    "id": "m008",
    "checkedOn": "2026-07-18",
    "source": "楽天市場",
    "searchUrl": "https://search.rakuten.co.jp/search/mall/%E3%83%A1%E3%83%80%E3%82%AB%20%E4%B8%89%E8%89%B2%E3%83%A9%E3%83%A1%E5%B9%B9%E4%B9%8B/",
    "stages": {
      "egg": {
        "min": null,
        "avg": null,
        "max": null,
        "count": 0,
        "minUrl": "",
        "note": "数量（10個入り等）は出品により異なります"
      },
      "fry": {
        "min": null,
        "avg": null,
        "max": null,
        "count": 0,
        "minUrl": "",
        "note": "匹数は出品により異なります"
      },
      "adult": {
        "min": null,
        "avg": null,
        "max": null,
        "count": 0,
        "minUrl": "",
        "note": "匹数・サイズは出品により異なります"
      }
    }
  },
  {
    "id": "m009",
    "checkedOn": "2026-07-18",
    "source": "楽天市場",
    "searchUrl": "https://search.rakuten.co.jp/search/mall/%E3%83%A1%E3%83%80%E3%82%AB%20%E5%A5%B3%E9%9B%9B/",
    "stages": {
      "egg": {
        "min": null,
        "avg": null,
        "max": null,
        "count": 0,
        "minUrl": "",
        "note": "数量（10個入り等）は出品により異なります"
      },
      "fry": {
        "min": 2000,
        "avg": 2650,
        "max": 3300,
        "count": 2,
        "minUrl": "https://item.rakuten.co.jp/akimedaka/187/",
        "note": "匹数は出品により異なります"
      },
      "adult": {
        "min": 1080,
        "avg": 2943,
        "max": 5000,
        "count": 3,
        "minUrl": "https://item.rakuten.co.jp/fish-neos/a17-20220622-1/",
        "note": "匹数・サイズは出品により異なります"
      }
    }
  },
  {
    "id": "m010",
    "checkedOn": "2026-07-18",
    "source": "楽天市場",
    "searchUrl": "https://search.rakuten.co.jp/search/mall/%E3%83%A1%E3%83%80%E3%82%AB%20%E6%9D%BE%E4%BA%95%E3%83%92%E3%83%AC%E9%95%B7%E5%B9%B9%E4%B9%8B/",
    "stages": {
      "egg": {
        "min": null,
        "avg": null,
        "max": null,
        "count": 0,
        "minUrl": "",
        "note": "数量（10個入り等）は出品により異なります"
      },
      "fry": {
        "min": 980,
        "avg": 1457,
        "max": 1990,
        "count": 4,
        "minUrl": "https://item.rakuten.co.jp/chanet/582626/",
        "note": "匹数は出品により異なります"
      },
      "adult": {
        "min": 1410,
        "avg": 1516,
        "max": 1622,
        "count": 2,
        "minUrl": "https://item.rakuten.co.jp/chanet/580078/",
        "note": "匹数・サイズは出品により異なります"
      }
    }
  },
  {
    "id": "m011",
    "checkedOn": "2026-07-18",
    "source": "楽天市場",
    "searchUrl": "https://search.rakuten.co.jp/search/mall/%E3%83%A1%E3%83%80%E3%82%AB%20%E7%90%A5%E7%8F%80/",
    "stages": {
      "egg": {
        "min": null,
        "avg": null,
        "max": null,
        "count": 0,
        "minUrl": "",
        "note": "数量（10個入り等）は出品により異なります"
      },
      "fry": {
        "min": 1180,
        "avg": 1893,
        "max": 3000,
        "count": 3,
        "minUrl": "https://item.rakuten.co.jp/medakastory/10001765/",
        "note": "匹数は出品により異なります"
      },
      "adult": {
        "min": 1580,
        "avg": 4623,
        "max": 9000,
        "count": 14,
        "minUrl": "https://item.rakuten.co.jp/medakastory/10001808/",
        "note": "匹数・サイズは出品により異なります"
      }
    }
  },
  {
    "id": "m012",
    "checkedOn": "2026-07-18",
    "source": "楽天市場",
    "searchUrl": "https://search.rakuten.co.jp/search/mall/%E3%83%A1%E3%83%80%E3%82%AB%20%E9%BB%84%E9%87%91/",
    "stages": {
      "egg": {
        "min": 1600,
        "avg": 1600,
        "max": 1600,
        "count": 1,
        "minUrl": "https://item.rakuten.co.jp/peacegarden/compass1746369101/",
        "note": "数量（10個入り等）は出品により異なります"
      },
      "fry": {
        "min": 980,
        "avg": 2306,
        "max": 6500,
        "count": 7,
        "minUrl": "https://item.rakuten.co.jp/medakastory/10001462/",
        "note": "匹数は出品により異なります"
      },
      "adult": {
        "min": 1080,
        "avg": 3632,
        "max": 11000,
        "count": 17,
        "minUrl": "https://item.rakuten.co.jp/chanet/133541/",
        "note": "匹数・サイズは出品により異なります"
      }
    }
  },
  {
    "id": "m013",
    "checkedOn": "2026-07-18",
    "source": "楽天市場",
    "searchUrl": "https://search.rakuten.co.jp/search/mall/%E3%83%A1%E3%83%80%E3%82%AB%20%E3%83%A9%E3%83%A1%E5%B9%B9%E4%B9%8B/",
    "stages": {
      "egg": {
        "min": null,
        "avg": null,
        "max": null,
        "count": 0,
        "minUrl": "",
        "note": "数量（10個入り等）は出品により異なります"
      },
      "fry": {
        "min": 4500,
        "avg": 5500,
        "max": 6500,
        "count": 3,
        "minUrl": "https://item.rakuten.co.jp/medakayanekomanma/raikiri-chigyo/",
        "note": "匹数は出品により異なります"
      },
      "adult": {
        "min": 980,
        "avg": 1662,
        "max": 2980,
        "count": 6,
        "minUrl": "https://item.rakuten.co.jp/chanet/584045/",
        "note": "匹数・サイズは出品により異なります"
      }
    }
  },
  {
    "id": "m014",
    "checkedOn": "2026-07-18",
    "source": "楽天市場",
    "searchUrl": "https://search.rakuten.co.jp/search/mall/%E3%83%A1%E3%83%80%E3%82%AB%20%E5%A4%9C%E6%A1%9C/",
    "stages": {
      "egg": {
        "min": 980,
        "avg": 1424,
        "max": 2180,
        "count": 5,
        "minUrl": "https://item.rakuten.co.jp/genkimedaka/compass1719115874/",
        "note": "数量（10個入り等）は出品により異なります"
      },
      "fry": {
        "min": 980,
        "avg": 2243,
        "max": 4000,
        "count": 12,
        "minUrl": "https://item.rakuten.co.jp/medakastory/10001898/",
        "note": "匹数は出品により異なります"
      },
      "adult": {
        "min": 1140,
        "avg": 2732,
        "max": 8000,
        "count": 8,
        "minUrl": "https://item.rakuten.co.jp/chanet/137182/",
        "note": "匹数・サイズは出品により異なります"
      }
    }
  },
  {
    "id": "m015",
    "checkedOn": "2026-07-18",
    "source": "楽天市場",
    "searchUrl": "https://search.rakuten.co.jp/search/mall/%E3%83%A1%E3%83%80%E3%82%AB%20%E7%B4%85%E5%B8%9D/",
    "stages": {
      "egg": {
        "min": 1480,
        "avg": 1480,
        "max": 1480,
        "count": 1,
        "minUrl": "https://item.rakuten.co.jp/wga7/medakakujiyuuseiran/",
        "note": "数量（10個入り等）は出品により異なります"
      },
      "fry": {
        "min": 980,
        "avg": 2268,
        "max": 4500,
        "count": 5,
        "minUrl": "https://item.rakuten.co.jp/medakastory/10000733/",
        "note": "匹数は出品により異なります"
      },
      "adult": {
        "min": 980,
        "avg": 2585,
        "max": 7500,
        "count": 22,
        "minUrl": "https://item.rakuten.co.jp/chanet/584329/",
        "note": "匹数・サイズは出品により異なります"
      }
    }
  },
  {
    "id": "m016",
    "checkedOn": "2026-07-18",
    "source": "楽天市場",
    "searchUrl": "https://search.rakuten.co.jp/search/mall/%E3%83%A1%E3%83%80%E3%82%AB%20%E6%B7%B1%E6%B5%B7/",
    "stages": {
      "egg": {
        "min": 980,
        "avg": 1464,
        "max": 1880,
        "count": 5,
        "minUrl": "https://item.rakuten.co.jp/wga7/mixyuuseiran20/",
        "note": "数量（10個入り等）は出品により異なります"
      },
      "fry": {
        "min": 890,
        "avg": 2093,
        "max": 3000,
        "count": 7,
        "minUrl": "https://item.rakuten.co.jp/medakastory/10001903/",
        "note": "匹数は出品により異なります"
      },
      "adult": {
        "min": 980,
        "avg": 2008,
        "max": 3500,
        "count": 14,
        "minUrl": "https://item.rakuten.co.jp/chanet/581829/",
        "note": "匹数・サイズは出品により異なります"
      }
    }
  },
  {
    "id": "m017",
    "checkedOn": "2026-07-18",
    "source": "楽天市場",
    "searchUrl": "https://search.rakuten.co.jp/search/mall/%E3%83%A1%E3%83%80%E3%82%AB%20%E6%98%9F%E6%B2%B3/",
    "stages": {
      "egg": {
        "min": null,
        "avg": null,
        "max": null,
        "count": 0,
        "minUrl": "",
        "note": "数量（10個入り等）は出品により異なります"
      },
      "fry": {
        "min": 2000,
        "avg": 2750,
        "max": 3500,
        "count": 2,
        "minUrl": "https://item.rakuten.co.jp/akimedaka/188/",
        "note": "匹数は出品により異なります"
      },
      "adult": {
        "min": 3000,
        "avg": 5717,
        "max": 9000,
        "count": 6,
        "minUrl": "https://item.rakuten.co.jp/akimedaka/57/",
        "note": "匹数・サイズは出品により異なります"
      }
    }
  },
  {
    "id": "m018",
    "checkedOn": "2026-07-18",
    "source": "楽天市場",
    "searchUrl": "https://search.rakuten.co.jp/search/mall/%E3%83%A1%E3%83%80%E3%82%AB%20%E7%B4%85%E8%96%8A/",
    "stages": {
      "egg": {
        "min": 1480,
        "avg": 1480,
        "max": 1480,
        "count": 1,
        "minUrl": "https://item.rakuten.co.jp/wga7/beniazamiyuuseiran10/",
        "note": "数量（10個入り等）は出品により異なります"
      },
      "fry": {
        "min": 1580,
        "avg": 2385,
        "max": 3500,
        "count": 4,
        "minUrl": "https://item.rakuten.co.jp/wga7/beniazamitigyo5/",
        "note": "匹数は出品により異なります"
      },
      "adult": {
        "min": 2980,
        "avg": 5740,
        "max": 13500,
        "count": 8,
        "minUrl": "https://item.rakuten.co.jp/wga7/beniazamis5/",
        "note": "匹数・サイズは出品により異なります"
      }
    }
  },
  {
    "id": "m019",
    "checkedOn": "2026-07-18",
    "source": "楽天市場",
    "searchUrl": "https://search.rakuten.co.jp/search/mall/%E3%83%A1%E3%83%80%E3%82%AB%20%E8%9E%BA%E9%88%BF%E5%85%89/",
    "stages": {
      "egg": {
        "min": null,
        "avg": null,
        "max": null,
        "count": 0,
        "minUrl": "",
        "note": "数量（10個入り等）は出品により異なります"
      },
      "fry": {
        "min": 2000,
        "avg": 2000,
        "max": 2000,
        "count": 1,
        "minUrl": "https://item.rakuten.co.jp/akimedaka/213/",
        "note": "匹数は出品により異なります"
      },
      "adult": {
        "min": 3800,
        "avg": 5450,
        "max": 7000,
        "count": 4,
        "minUrl": "https://item.rakuten.co.jp/akimedaka/01/",
        "note": "匹数・サイズは出品により異なります"
      }
    }
  },
  {
    "id": "m020",
    "checkedOn": "2026-07-18",
    "source": "楽天市場",
    "searchUrl": "https://search.rakuten.co.jp/search/mall/%E3%83%A1%E3%83%80%E3%82%AB%20%E7%8E%8B%E5%A6%83/",
    "stages": {
      "egg": {
        "min": null,
        "avg": null,
        "max": null,
        "count": 0,
        "minUrl": "",
        "note": "数量（10個入り等）は出品により異なります"
      },
      "fry": {
        "min": null,
        "avg": null,
        "max": null,
        "count": 0,
        "minUrl": "",
        "note": "匹数は出品により異なります"
      },
      "adult": {
        "min": 27000,
        "avg": 27000,
        "max": 27000,
        "count": 1,
        "minUrl": "https://item.rakuten.co.jp/f122301-yachimata/y050-04-006-1/",
        "note": "匹数・サイズは出品により異なります"
      }
    }
  },
  {
    "id": "m021",
    "checkedOn": "2026-07-18",
    "source": "楽天市場",
    "searchUrl": "https://search.rakuten.co.jp/search/mall/%E3%83%A1%E3%83%80%E3%82%AB%20%E3%83%90%E3%82%AB%E3%83%A9/",
    "stages": {
      "egg": {
        "min": null,
        "avg": null,
        "max": null,
        "count": 0,
        "minUrl": "",
        "note": "数量（10個入り等）は出品により異なります"
      },
      "fry": {
        "min": null,
        "avg": null,
        "max": null,
        "count": 0,
        "minUrl": "",
        "note": "匹数は出品により異なります"
      },
      "adult": {
        "min": null,
        "avg": null,
        "max": null,
        "count": 0,
        "minUrl": "",
        "note": "匹数・サイズは出品により異なります"
      }
    }
  },
  {
    "id": "m022",
    "checkedOn": "2026-07-18",
    "source": "楽天市場",
    "searchUrl": "https://search.rakuten.co.jp/search/mall/%E3%83%A1%E3%83%80%E3%82%AB%20%E9%BE%8D%E9%B1%97/",
    "stages": {
      "egg": {
        "min": null,
        "avg": null,
        "max": null,
        "count": 0,
        "minUrl": "",
        "note": "数量（10個入り等）は出品により異なります"
      },
      "fry": {
        "min": null,
        "avg": null,
        "max": null,
        "count": 0,
        "minUrl": "",
        "note": "匹数は出品により異なります"
      },
      "adult": {
        "min": 5000,
        "avg": 7625,
        "max": 8000,
        "count": 8,
        "minUrl": "https://item.rakuten.co.jp/medaka-no-yakata/el0711/",
        "note": "匹数・サイズは出品により異なります"
      }
    }
  },
  {
    "id": "m023",
    "checkedOn": "2026-07-18",
    "source": "楽天市場",
    "searchUrl": "https://search.rakuten.co.jp/search/mall/%E3%83%A1%E3%83%80%E3%82%AB%20%E5%BF%98%E5%8D%B4%E3%81%AE%E7%BF%BC/",
    "stages": {
      "egg": {
        "min": null,
        "avg": null,
        "max": null,
        "count": 0,
        "minUrl": "",
        "note": "数量（10個入り等）は出品により異なります"
      },
      "fry": {
        "min": 1180,
        "avg": 6393,
        "max": 15000,
        "count": 3,
        "minUrl": "https://item.rakuten.co.jp/medakastory/10002169/",
        "note": "匹数は出品により異なります"
      },
      "adult": {
        "min": 3980,
        "avg": 6320,
        "max": 8000,
        "count": 3,
        "minUrl": "https://item.rakuten.co.jp/qewyiy/boukyakunotu1/",
        "note": "匹数・サイズは出品により異なります"
      }
    }
  },
  {
    "id": "m024",
    "checkedOn": "2026-07-18",
    "source": "楽天市場",
    "searchUrl": "https://search.rakuten.co.jp/search/mall/%E3%83%A1%E3%83%80%E3%82%AB%20%E5%A6%82%E6%B0%B4/",
    "stages": {
      "egg": {
        "min": null,
        "avg": null,
        "max": null,
        "count": 0,
        "minUrl": "",
        "note": "数量（10個入り等）は出品により異なります"
      },
      "fry": {
        "min": null,
        "avg": null,
        "max": null,
        "count": 0,
        "minUrl": "",
        "note": "匹数は出品により異なります"
      },
      "adult": {
        "min": 5000,
        "avg": 6571,
        "max": 7500,
        "count": 7,
        "minUrl": "https://item.rakuten.co.jp/medaka-no-yakata/eu2112/",
        "note": "匹数・サイズは出品により異なります"
      }
    }
  },
  {
    "id": "m025",
    "checkedOn": "2026-07-18",
    "source": "楽天市場",
    "searchUrl": "https://search.rakuten.co.jp/search/mall/%E3%83%A1%E3%83%80%E3%82%AB%20%E3%82%A2%E3%82%AF%E3%82%A2%E3%83%9E%E3%83%AA%E3%83%B3/",
    "stages": {
      "egg": {
        "min": null,
        "avg": null,
        "max": null,
        "count": 0,
        "minUrl": "",
        "note": "数量（10個入り等）は出品により異なります"
      },
      "fry": {
        "min": null,
        "avg": null,
        "max": null,
        "count": 0,
        "minUrl": "",
        "note": "匹数は出品により異なります"
      },
      "adult": {
        "min": null,
        "avg": null,
        "max": null,
        "count": 0,
        "minUrl": "",
        "note": "匹数・サイズは出品により異なります"
      }
    }
  },
  {
    "id": "m026",
    "checkedOn": "2026-07-18",
    "source": "楽天市場",
    "searchUrl": "https://search.rakuten.co.jp/search/mall/%E3%83%A1%E3%83%80%E3%82%AB%20%E3%83%9F%E3%83%B3%E3%83%88/",
    "stages": {
      "egg": {
        "min": 2000,
        "avg": 2000,
        "max": 2000,
        "count": 1,
        "minUrl": "https://item.rakuten.co.jp/okinawastore/compass1739702224/",
        "note": "数量（10個入り等）は出品により異なります"
      },
      "fry": {
        "min": null,
        "avg": null,
        "max": null,
        "count": 0,
        "minUrl": "",
        "note": "匹数は出品により異なります"
      },
      "adult": {
        "min": null,
        "avg": null,
        "max": null,
        "count": 0,
        "minUrl": "",
        "note": "匹数・サイズは出品により異なります"
      }
    }
  },
  {
    "id": "m027",
    "checkedOn": "2026-07-18",
    "source": "楽天市場",
    "searchUrl": "https://search.rakuten.co.jp/search/mall/%E3%83%A1%E3%83%80%E3%82%AB%20%E3%82%AC%E3%82%A4%E3%82%A2/",
    "stages": {
      "egg": {
        "min": null,
        "avg": null,
        "max": null,
        "count": 0,
        "minUrl": "",
        "note": "数量（10個入り等）は出品により異なります"
      },
      "fry": {
        "min": null,
        "avg": null,
        "max": null,
        "count": 0,
        "minUrl": "",
        "note": "匹数は出品により異なります"
      },
      "adult": {
        "min": null,
        "avg": null,
        "max": null,
        "count": 0,
        "minUrl": "",
        "note": "匹数・サイズは出品により異なります"
      }
    }
  },
  {
    "id": "m028",
    "checkedOn": "2026-07-18",
    "source": "楽天市場",
    "searchUrl": "https://search.rakuten.co.jp/search/mall/%E3%83%A1%E3%83%80%E3%82%AB%20%E3%82%AA%E3%83%99%E3%83%AA%E3%82%B9%E3%82%AF/",
    "stages": {
      "egg": {
        "min": null,
        "avg": null,
        "max": null,
        "count": 0,
        "minUrl": "",
        "note": "数量（10個入り等）は出品により異なります"
      },
      "fry": {
        "min": null,
        "avg": null,
        "max": null,
        "count": 0,
        "minUrl": "",
        "note": "匹数は出品により異なります"
      },
      "adult": {
        "min": null,
        "avg": null,
        "max": null,
        "count": 0,
        "minUrl": "",
        "note": "匹数・サイズは出品により異なります"
      }
    }
  },
  {
    "id": "m029",
    "checkedOn": "2026-07-18",
    "source": "楽天市場",
    "searchUrl": "https://search.rakuten.co.jp/search/mall/%E3%83%A1%E3%83%80%E3%82%AB%20%E5%BD%A9%E6%A1%9C/",
    "stages": {
      "egg": {
        "min": null,
        "avg": null,
        "max": null,
        "count": 0,
        "minUrl": "",
        "note": "数量（10個入り等）は出品により異なります"
      },
      "fry": {
        "min": null,
        "avg": null,
        "max": null,
        "count": 0,
        "minUrl": "",
        "note": "匹数は出品により異なります"
      },
      "adult": {
        "min": null,
        "avg": null,
        "max": null,
        "count": 0,
        "minUrl": "",
        "note": "匹数・サイズは出品により異なります"
      }
    }
  },
  {
    "id": "m030",
    "checkedOn": "2026-07-18",
    "source": "楽天市場",
    "searchUrl": "https://search.rakuten.co.jp/search/mall/%E3%83%A1%E3%83%80%E3%82%AB%20%E3%82%AF%E3%83%AA%E3%82%A2%E3%83%96%E3%83%A9%E3%82%A6%E3%83%B3/",
    "stages": {
      "egg": {
        "min": null,
        "avg": null,
        "max": null,
        "count": 0,
        "minUrl": "",
        "note": "数量（10個入り等）は出品により異なります"
      },
      "fry": {
        "min": null,
        "avg": null,
        "max": null,
        "count": 0,
        "minUrl": "",
        "note": "匹数は出品により異なります"
      },
      "adult": {
        "min": 1060,
        "avg": 1126,
        "max": 1219,
        "count": 3,
        "minUrl": "https://item.rakuten.co.jp/chanet/134967/",
        "note": "匹数・サイズは出品により異なります"
      }
    }
  },
  {
    "id": "m031",
    "checkedOn": "2026-07-18",
    "source": "楽天市場",
    "searchUrl": "https://search.rakuten.co.jp/search/mall/%E3%83%A1%E3%83%80%E3%82%AB%20%E9%AD%85%E8%BC%9D/",
    "stages": {
      "egg": {
        "min": null,
        "avg": null,
        "max": null,
        "count": 0,
        "minUrl": "",
        "note": "数量（10個入り等）は出品により異なります"
      },
      "fry": {
        "min": null,
        "avg": null,
        "max": null,
        "count": 0,
        "minUrl": "",
        "note": "匹数は出品により異なります"
      },
      "adult": {
        "min": null,
        "avg": null,
        "max": null,
        "count": 0,
        "minUrl": "",
        "note": "匹数・サイズは出品により異なります"
      }
    }
  },
  {
    "id": "m032",
    "checkedOn": "2026-07-18",
    "source": "楽天市場",
    "searchUrl": "https://search.rakuten.co.jp/search/mall/%E3%83%A1%E3%83%80%E3%82%AB%20%E7%B4%AB%E5%BB%B6/",
    "stages": {
      "egg": {
        "min": null,
        "avg": null,
        "max": null,
        "count": 0,
        "minUrl": "",
        "note": "数量（10個入り等）は出品により異なります"
      },
      "fry": {
        "min": null,
        "avg": null,
        "max": null,
        "count": 0,
        "minUrl": "",
        "note": "匹数は出品により異なります"
      },
      "adult": {
        "min": null,
        "avg": null,
        "max": null,
        "count": 0,
        "minUrl": "",
        "note": "匹数・サイズは出品により異なります"
      }
    }
  },
  {
    "id": "m033",
    "checkedOn": "2026-07-18",
    "source": "楽天市場",
    "searchUrl": "https://search.rakuten.co.jp/search/mall/%E3%83%A1%E3%83%80%E3%82%AB%20%E7%90%B4%E5%A7%AB%E3%83%AA%E3%82%A2%E3%83%AB%E3%83%AD%E3%83%B3%E3%82%B0%E3%83%95%E3%82%A3%E3%83%B3/",
    "stages": {
      "egg": {
        "min": null,
        "avg": null,
        "max": null,
        "count": 0,
        "minUrl": "",
        "note": "数量（10個入り等）は出品により異なります"
      },
      "fry": {
        "min": null,
        "avg": null,
        "max": null,
        "count": 0,
        "minUrl": "",
        "note": "匹数は出品により異なります"
      },
      "adult": {
        "min": null,
        "avg": null,
        "max": null,
        "count": 0,
        "minUrl": "",
        "note": "匹数・サイズは出品により異なります"
      }
    }
  },
  {
    "id": "m034",
    "checkedOn": "2026-07-18",
    "source": "楽天市場",
    "searchUrl": "https://search.rakuten.co.jp/search/mall/%E3%83%A1%E3%83%80%E3%82%AB%20%E3%83%AC%E3%83%BC%E3%83%B4%E3%82%B5%E3%83%A0%E3%83%A9%E3%82%A4%E3%83%92%E3%82%AB%E3%83%AA/",
    "stages": {
      "egg": {
        "min": null,
        "avg": null,
        "max": null,
        "count": 0,
        "minUrl": "",
        "note": "数量（10個入り等）は出品により異なります"
      },
      "fry": {
        "min": null,
        "avg": null,
        "max": null,
        "count": 0,
        "minUrl": "",
        "note": "匹数は出品により異なります"
      },
      "adult": {
        "min": null,
        "avg": null,
        "max": null,
        "count": 0,
        "minUrl": "",
        "note": "匹数・サイズは出品により異なります"
      }
    }
  },
  {
    "id": "m035",
    "checkedOn": "2026-07-18",
    "source": "楽天市場",
    "searchUrl": "https://search.rakuten.co.jp/search/mall/%E3%83%A1%E3%83%80%E3%82%AB%20%E4%B8%89%E8%89%B2%E3%83%A9%E3%83%A1%E3%83%AA%E3%82%A2%E3%83%AB%E3%83%AD%E3%83%B3%E3%82%B0%E3%83%95%E3%82%A3%E3%83%B3/",
    "stages": {
      "egg": {
        "min": null,
        "avg": null,
        "max": null,
        "count": 0,
        "minUrl": "",
        "note": "数量（10個入り等）は出品により異なります"
      },
      "fry": {
        "min": null,
        "avg": null,
        "max": null,
        "count": 0,
        "minUrl": "",
        "note": "匹数は出品により異なります"
      },
      "adult": {
        "min": null,
        "avg": null,
        "max": null,
        "count": 0,
        "minUrl": "",
        "note": "匹数・サイズは出品により異なります"
      }
    }
  },
  {
    "id": "m036",
    "checkedOn": "2026-07-18",
    "source": "楽天市場",
    "searchUrl": "https://search.rakuten.co.jp/search/mall/%E3%83%A1%E3%83%80%E3%82%AB%20%E7%B4%85%E8%96%8A%E3%83%AA%E3%82%A2%E3%83%AB%E3%83%AD%E3%83%B3%E3%82%B0%E3%83%95%E3%82%A3%E3%83%B3/",
    "stages": {
      "egg": {
        "min": null,
        "avg": null,
        "max": null,
        "count": 0,
        "minUrl": "",
        "note": "数量（10個入り等）は出品により異なります"
      },
      "fry": {
        "min": null,
        "avg": null,
        "max": null,
        "count": 0,
        "minUrl": "",
        "note": "匹数は出品により異なります"
      },
      "adult": {
        "min": null,
        "avg": null,
        "max": null,
        "count": 0,
        "minUrl": "",
        "note": "匹数・サイズは出品により異なります"
      }
    }
  },
  {
    "id": "m037",
    "checkedOn": "2026-07-18",
    "source": "楽天市場",
    "searchUrl": "https://search.rakuten.co.jp/search/mall/%E3%83%A1%E3%83%80%E3%82%AB%20%E3%83%96%E3%83%A9%E3%83%83%E3%82%AF%E3%82%BF%E3%82%A4%E3%83%89%E3%83%BB%E3%82%BC%E3%83%96%E3%83%A9/",
    "stages": {
      "egg": {
        "min": null,
        "avg": null,
        "max": null,
        "count": 0,
        "minUrl": "",
        "note": "数量（10個入り等）は出品により異なります"
      },
      "fry": {
        "min": null,
        "avg": null,
        "max": null,
        "count": 0,
        "minUrl": "",
        "note": "匹数は出品により異なります"
      },
      "adult": {
        "min": null,
        "avg": null,
        "max": null,
        "count": 0,
        "minUrl": "",
        "note": "匹数・サイズは出品により異なります"
      }
    }
  },
  {
    "id": "m038",
    "checkedOn": "2026-07-18",
    "source": "楽天市場",
    "searchUrl": "https://search.rakuten.co.jp/search/mall/%E3%83%A1%E3%83%80%E3%82%AB%20%E5%88%9D%E6%81%8B%E3%83%92%E3%83%AC%E9%95%B7/",
    "stages": {
      "egg": {
        "min": null,
        "avg": null,
        "max": null,
        "count": 0,
        "minUrl": "",
        "note": "数量（10個入り等）は出品により異なります"
      },
      "fry": {
        "min": null,
        "avg": null,
        "max": null,
        "count": 0,
        "minUrl": "",
        "note": "匹数は出品により異なります"
      },
      "adult": {
        "min": null,
        "avg": null,
        "max": null,
        "count": 0,
        "minUrl": "",
        "note": "匹数・サイズは出品により異なります"
      }
    }
  },
  {
    "id": "m039",
    "checkedOn": "2026-07-18",
    "source": "楽天市場",
    "searchUrl": "https://search.rakuten.co.jp/search/mall/%E3%83%A1%E3%83%80%E3%82%AB%20%E3%83%95%E3%83%AD%E3%82%B9%E3%83%88%E3%82%A4%E3%82%A8%E3%83%AD%E3%83%BC%E3%83%80%E3%83%AB%E3%83%9E/",
    "stages": {
      "egg": {
        "min": null,
        "avg": null,
        "max": null,
        "count": 0,
        "minUrl": "",
        "note": "数量（10個入り等）は出品により異なります"
      },
      "fry": {
        "min": null,
        "avg": null,
        "max": null,
        "count": 0,
        "minUrl": "",
        "note": "匹数は出品により異なります"
      },
      "adult": {
        "min": null,
        "avg": null,
        "max": null,
        "count": 0,
        "minUrl": "",
        "note": "匹数・サイズは出品により異なります"
      }
    }
  },
  {
    "id": "m040",
    "checkedOn": "2026-07-18",
    "source": "楽天市場",
    "searchUrl": "https://search.rakuten.co.jp/search/mall/%E3%83%A1%E3%83%80%E3%82%AB%20%E7%B4%97%E3%80%85/",
    "stages": {
      "egg": {
        "min": null,
        "avg": null,
        "max": null,
        "count": 0,
        "minUrl": "",
        "note": "数量（10個入り等）は出品により異なります"
      },
      "fry": {
        "min": null,
        "avg": null,
        "max": null,
        "count": 0,
        "minUrl": "",
        "note": "匹数は出品により異なります"
      },
      "adult": {
        "min": null,
        "avg": null,
        "max": null,
        "count": 0,
        "minUrl": "",
        "note": "匹数・サイズは出品により異なります"
      }
    }
  },
  {
    "id": "m041",
    "checkedOn": "2026-07-18",
    "source": "楽天市場",
    "searchUrl": "https://search.rakuten.co.jp/search/mall/%E3%83%A1%E3%83%80%E3%82%AB%20%E7%A5%9E%E7%B4%85%E7%8E%89%E9%8C%A6/",
    "stages": {
      "egg": {
        "min": null,
        "avg": null,
        "max": null,
        "count": 0,
        "minUrl": "",
        "note": "数量（10個入り等）は出品により異なります"
      },
      "fry": {
        "min": null,
        "avg": null,
        "max": null,
        "count": 0,
        "minUrl": "",
        "note": "匹数は出品により異なります"
      },
      "adult": {
        "min": null,
        "avg": null,
        "max": null,
        "count": 0,
        "minUrl": "",
        "note": "匹数・サイズは出品により異なります"
      }
    }
  },
  {
    "id": "m042",
    "checkedOn": "2026-07-18",
    "source": "楽天市場",
    "searchUrl": "https://search.rakuten.co.jp/search/mall/%E3%83%A1%E3%83%80%E3%82%AB%20%E7%8E%8B%E8%8F%AF/",
    "stages": {
      "egg": {
        "min": 980,
        "avg": 1989,
        "max": 4000,
        "count": 7,
        "minUrl": "https://item.rakuten.co.jp/genkimedaka/compass1720333134/",
        "note": "数量（10個入り等）は出品により異なります"
      },
      "fry": {
        "min": 1030,
        "avg": 2582,
        "max": 4980,
        "count": 7,
        "minUrl": "https://item.rakuten.co.jp/chanet/589652/",
        "note": "匹数は出品により異なります"
      },
      "adult": {
        "min": 1790,
        "avg": 2946,
        "max": 6980,
        "count": 9,
        "minUrl": "https://item.rakuten.co.jp/chanet/587387/",
        "note": "匹数・サイズは出品により異なります"
      }
    }
  },
  {
    "id": "m043",
    "checkedOn": "2026-07-18",
    "source": "楽天市場",
    "searchUrl": "https://search.rakuten.co.jp/search/mall/%E3%83%A1%E3%83%80%E3%82%AB%20%E3%83%95%E3%83%AD%E3%83%9E%E3%83%BC%E3%82%B8%E3%83%A5%E3%83%A9%E3%83%A1%E3%82%B9%E3%83%AF%E3%83%AD%E3%83%BC/",
    "stages": {
      "egg": {
        "min": null,
        "avg": null,
        "max": null,
        "count": 0,
        "minUrl": "",
        "note": "数量（10個入り等）は出品により異なります"
      },
      "fry": {
        "min": null,
        "avg": null,
        "max": null,
        "count": 0,
        "minUrl": "",
        "note": "匹数は出品により異なります"
      },
      "adult": {
        "min": 5000,
        "avg": 5000,
        "max": 5000,
        "count": 1,
        "minUrl": "https://item.rakuten.co.jp/medaka-no-yakata/el1519/",
        "note": "匹数・サイズは出品により異なります"
      }
    }
  },
  {
    "id": "m044",
    "checkedOn": "2026-07-18",
    "source": "楽天市場",
    "searchUrl": "https://search.rakuten.co.jp/search/mall/%E3%83%A1%E3%83%80%E3%82%AB%20%E3%82%AA%E3%83%AD%E3%83%81%E3%83%80%E3%83%AB%E3%83%9E/",
    "stages": {
      "egg": {
        "min": 1980,
        "avg": 1980,
        "max": 1980,
        "count": 1,
        "minUrl": "https://item.rakuten.co.jp/kotohashop2023/196/",
        "note": "数量（10個入り等）は出品により異なります"
      },
      "fry": {
        "min": null,
        "avg": null,
        "max": null,
        "count": 0,
        "minUrl": "",
        "note": "匹数は出品により異なります"
      },
      "adult": {
        "min": 7000,
        "avg": 9500,
        "max": 12000,
        "count": 2,
        "minUrl": "https://item.rakuten.co.jp/medaka-no-yakata/el1518/",
        "note": "匹数・サイズは出品により異なります"
      }
    }
  },
  {
    "id": "m045",
    "checkedOn": "2026-07-18",
    "source": "楽天市場",
    "searchUrl": "https://search.rakuten.co.jp/search/mall/%E3%83%A1%E3%83%80%E3%82%AB%20%E3%81%95%E3%81%8F%E3%82%89/",
    "stages": {
      "egg": {
        "min": 980,
        "avg": 1342,
        "max": 1880,
        "count": 8,
        "minUrl": "https://item.rakuten.co.jp/wga7/mixyuuseiran20/",
        "note": "数量（10個入り等）は出品により異なります"
      },
      "fry": {
        "min": 1300,
        "avg": 1988,
        "max": 2640,
        "count": 6,
        "minUrl": "https://item.rakuten.co.jp/chanet/637412/",
        "note": "匹数は出品により異なります"
      },
      "adult": {
        "min": 460,
        "avg": 2862,
        "max": 10000,
        "count": 10,
        "minUrl": "https://item.rakuten.co.jp/pet-kazoku/me000360/",
        "note": "匹数・サイズは出品により異なります"
      }
    }
  },
  {
    "id": "m046",
    "checkedOn": "2026-07-18",
    "source": "楽天市場",
    "searchUrl": "https://search.rakuten.co.jp/search/mall/%E3%83%A1%E3%83%80%E3%82%AB%20%E7%A2%A7/",
    "stages": {
      "egg": {
        "min": 1500,
        "avg": 2125,
        "max": 2500,
        "count": 4,
        "minUrl": "https://item.rakuten.co.jp/okinawastore/compass1762531386/",
        "note": "数量（10個入り等）は出品により異なります"
      },
      "fry": {
        "min": null,
        "avg": null,
        "max": null,
        "count": 0,
        "minUrl": "",
        "note": "匹数は出品により異なります"
      },
      "adult": {
        "min": 3980,
        "avg": 6740,
        "max": 8000,
        "count": 4,
        "minUrl": "https://item.rakuten.co.jp/qewyiy/rowazo-1/",
        "note": "匹数・サイズは出品により異なります"
      }
    }
  }
]
};
