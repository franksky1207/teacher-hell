// Version 1 isolated authoring assets. Not a production catalogue.
// Authored text source and review provenance: work/18b-t01-08-authoring.json.
export default [
  {
    "story": {
      "resourceId": "content:18b-t01-08-01",
      "definitionId": "content:18b-t01-08-01",
      "version": "1",
      "topicId": "T01-08",
      "status": "engineering-test",
      "compilerContract": 2,
      "choiceContract": "four-v2",
      "entry": "opening",
      "stages": [
        {
          "id": "opening",
          "pages": [
            {
              "order": 1,
              "text": "早自習時，在導師班教室裡，學生帶著同一題的早先嘗試與目前解答，主動說想試著講給導師聽，以前只敢交答案。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "這次我好像知道為什麼要這樣列了。",
              "speaker": "participant",
              "scene": "school:classroom",
              "cast": [
                {
                  "role": "participant",
                  "position": "center",
                  "expression": "happy"
                }
              ],
              "presentation": "dialogue"
            }
          ],
          "choices": [
            {
              "id": "strategy-1",
              "text": "聽他說完整推理",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生說明第一段推理並指出一處仍不確定，教師未將自信當成全題正確。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": []
                }
              }
            },
            {
              "id": "strategy-2",
              "text": "請他保留前後版本",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生把舊稿與新稿放在一起，不為展示而抹掉錯誤嘗試。",
                "claims": [],
                "changes": [
                  {
                    "role": "teacher",
                    "holder": "work",
                    "code": "11-2",
                    "delta": -1
                  }
                ],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": []
                }
              }
            },
            {
              "id": "strategy-3",
              "text": "邀他向科任確認關鍵步驟",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生整理要請教的環節，尚未取得學科正確性的確認。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": []
                }
              }
            },
            {
              "id": "strategy-4",
              "text": "你不只寫答案，還敢把想法拿出來，我很開心",
              "kind": "action",
              "emotional": true,
              "outcome": {
                "fact": "教師肯定說明意願，未承諾分數或將內容公開給全班。",
                "claims": [],
                "changes": [
                  {
                    "role": "teacher",
                    "holder": "work",
                    "code": "11-2",
                    "delta": -1
                  }
                ],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": []
                }
              }
            }
          ],
          "next": null
        }
      ]
    },
    "definition": {
      "id": "content:18b-t01-08-01",
      "topicId": "T01-08",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-08-01",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "4-1",
        "2-4",
        "9-3"
      ],
      "additionalCodes": [
        "3-1",
        "4-3",
        "4-4"
      ],
      "weights": [
        0.191,
        0.19,
        0.19,
        0.143,
        0.143,
        0.143
      ],
      "directions": [
        1,
        1,
        1,
        1,
        1,
        1
      ],
      "eligibility": {
        "people": [
          "student"
        ],
        "dayKinds": [
          "school"
        ],
        "slotIds": [
          "early"
        ],
        "from": null,
        "until": null,
        "facts": [],
        "history": [],
        "numeric": [],
        "enrollment": null
      },
      "repetition": {
        "cooldownDays": 30,
        "exclusionGroups": [],
        "sameFact": true,
        "reason": "在籍學生於午餐非保護時段主動提出本件具體情境；不含夏冬營及離班學生，不保證重現"
      }
    },
    "binding": {
      "sources": [
        "participant",
        "participant",
        "participant",
        "participant",
        "participant",
        "participant"
      ],
      "valence": "positive"
    }
  },
  {
    "story": {
      "resourceId": "content:18b-t01-08-02",
      "definitionId": "content:18b-t01-08-02",
      "version": "1",
      "topicId": "T01-08",
      "status": "engineering-test",
      "compilerContract": 2,
      "choiceContract": "four-v2",
      "entry": "opening",
      "stages": [
        {
          "id": "opening",
          "pages": [
            {
              "order": 1,
              "text": "午休時，在教師辦公室，學生出示成果海報，表示願意展出作品但不想讓宣傳照片拍到自己。",
              "speaker": null,
              "scene": "school:teachers-office",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "作品可以放，我不想上學校粉專。",
              "speaker": "participant",
              "scene": "school:teachers-office",
              "cast": [
                {
                  "role": "participant",
                  "position": "center",
                  "expression": "embarrassed"
                }
              ],
              "presentation": "dialogue"
            }
          ],
          "choices": [
            {
              "id": "strategy-1",
              "text": "分開作品與肖像同意",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "教師記下學生提供的界線，沒有將展出意願擴張成社群授權。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "作品可以放，我不想上學校粉專。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面向導師表達本次談話中的個人顧慮或感受。"
                    }
                  ]
                }
              }
            },
            {
              "id": "strategy-2",
              "text": "查展示的實際拍攝安排",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "教師協助列出須向承辦確認的事項，尚未保證現場完全不被拍到。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "作品可以放，我不想上學校粉專。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [
                  {
                    "role": "teacher",
                    "holder": "work",
                    "code": "11-2",
                    "delta": -1
                  }
                ],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面向導師表達本次談話中的個人顧慮或感受。"
                    }
                  ]
                }
              }
            },
            {
              "id": "strategy-3",
              "text": "討論不含人像的展示方式",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生在草稿規劃只拍作品的角度，正式採用仍需承辦安排。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "作品可以放，我不想上學校粉專。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面向導師表達本次談話中的個人顧慮或感受。"
                    }
                  ]
                }
              }
            },
            {
              "id": "strategy-4",
              "text": "你可以為作品驕傲，也可以不站到鏡頭前",
              "kind": "action",
              "emotional": true,
              "outcome": {
                "fact": "教師表達支持，不以公開露面作為肯定努力的條件。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "作品可以放，我不想上學校粉專。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面向導師表達本次談話中的個人顧慮或感受。"
                    }
                  ]
                }
              }
            }
          ],
          "next": null
        }
      ]
    },
    "definition": {
      "id": "content:18b-t01-08-02",
      "topicId": "T01-08",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-08-02",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "4-1",
        "2-4",
        "9-3"
      ],
      "additionalCodes": [
        "4-3",
        "3-1",
        "4-4"
      ],
      "weights": [
        0.18,
        0.16,
        0.16,
        0.26,
        0.12,
        0.12
      ],
      "directions": [
        1,
        1,
        -1,
        1,
        -1,
        1
      ],
      "eligibility": {
        "people": [
          "student"
        ],
        "dayKinds": [
          "school"
        ],
        "slotIds": [
          "noon"
        ],
        "from": null,
        "until": null,
        "facts": [],
        "history": [],
        "numeric": [],
        "enrollment": null
      },
      "repetition": {
        "cooldownDays": 30,
        "exclusionGroups": [],
        "sameFact": true,
        "reason": "在籍學生於午餐非保護時段主動提出本件具體情境；不含夏冬營及離班學生，不保證重現"
      }
    },
    "binding": {
      "sources": [
        "participant",
        "participant",
        "participant",
        "participant",
        "participant",
        "participant"
      ],
      "valence": "neutral"
    }
  },
  {
    "story": {
      "resourceId": "content:18b-t01-08-03",
      "definitionId": "content:18b-t01-08-03",
      "version": "1",
      "topicId": "T01-08",
      "status": "engineering-test",
      "compilerContract": 2,
      "choiceContract": "four-v2",
      "entry": "opening",
      "stages": [
        {
          "id": "opening",
          "pages": [
            {
              "order": 1,
              "text": "午餐時，在教學大樓走廊，學生出示兩次自己的寫作稿，老師評語指出論證較清楚，但比賽仍未入選。",
              "speaker": null,
              "scene": "school:corridor",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "沒得獎，這樣算有成果嗎？",
              "speaker": "participant",
              "scene": "school:corridor",
              "cast": [
                {
                  "role": "participant",
                  "position": "center",
                  "expression": "sad"
                }
              ],
              "presentation": "dialogue"
            }
          ],
          "choices": [
            {
              "id": "strategy-1",
              "text": "比對評語指出的進步",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "雙方在稿上找到評語對應段落，只肯定有文字依據的改善。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": []
                }
              }
            },
            {
              "id": "strategy-2",
              "text": "讓學生挑自己的代表段落",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生選出最能表現努力的一段，未因教師提議就公開發表。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": []
                }
              }
            },
            {
              "id": "strategy-3",
              "text": "保留比賽結果與學習紀錄兩欄",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生把未入選與本次收穫分開記錄，沒有改寫比賽結果。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": []
                }
              }
            },
            {
              "id": "strategy-4",
              "text": "我看到的是文章長出骨架，名單沒寫到不會抹掉它",
              "kind": "action",
              "emotional": true,
              "outcome": {
                "fact": "教師表達欣慰，未承諾下次入選或否定評審。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": []
                }
              }
            }
          ],
          "next": null
        }
      ]
    },
    "definition": {
      "id": "content:18b-t01-08-03",
      "topicId": "T01-08",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-08-03",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "4-1",
        "2-4",
        "9-3"
      ],
      "additionalCodes": [
        "4-4",
        "3-1",
        "4-3"
      ],
      "weights": [
        0.25,
        0.25,
        0.133,
        0.167,
        0.1,
        0.1
      ],
      "directions": [
        1,
        1,
        1,
        1,
        -1,
        1
      ],
      "eligibility": {
        "people": [
          "student"
        ],
        "dayKinds": [
          "school"
        ],
        "slotIds": [
          "lunch"
        ],
        "from": null,
        "until": null,
        "facts": [],
        "history": [],
        "numeric": [],
        "enrollment": null
      },
      "repetition": {
        "cooldownDays": 30,
        "exclusionGroups": [],
        "sameFact": true,
        "reason": "在籍學生於午餐非保護時段主動提出本件具體情境；不含夏冬營及離班學生，不保證重現"
      }
    },
    "binding": {
      "sources": [
        "participant",
        "participant",
        "participant",
        "participant",
        "participant",
        "participant"
      ],
      "valence": "positive"
    }
  },
  {
    "story": {
      "resourceId": "content:18b-t01-08-04",
      "definitionId": "content:18b-t01-08-04",
      "version": "1",
      "topicId": "T01-08",
      "status": "engineering-test",
      "compilerContract": 2,
      "choiceContract": "four-v2",
      "entry": "opening",
      "stages": [
        {
          "id": "opening",
          "pages": [
            {
              "order": 1,
              "text": "午餐時，在教學大樓走廊，學生帶來成果展彩排紀錄，自己的程式當場失敗，現可在本機重現同一問題。",
              "speaker": null,
              "scene": "school:corridor",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "大家只看到它卡住。",
              "speaker": "participant",
              "scene": "school:corridor",
              "cast": [
                {
                  "role": "participant",
                  "position": "center",
                  "expression": "embarrassed"
                }
              ],
              "presentation": "dialogue"
            }
          ],
          "choices": [
            {
              "id": "strategy-1",
              "text": "先記可重現的失敗步驟",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生在教師旁重述觸發條件，尚未找到程式根因。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": []
                }
              }
            },
            {
              "id": "strategy-2",
              "text": "準備如實呈現限制的說明",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生草擬已完成與未解部分的展示稿，未假裝程式全數可用。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": []
                }
              }
            },
            {
              "id": "strategy-3",
              "text": "規劃備用靜態示範",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "教師提議用已保存的真實輸出展示，不剪接成當場成功。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": []
                }
              }
            },
            {
              "id": "strategy-4",
              "text": "卡住那一下很難受，但你不用把失敗藏起來",
              "kind": "action",
              "emotional": true,
              "outcome": {
                "fact": "教師陪學生整理感受，沒有宣告故障已修或全場觀眾理解。",
                "claims": [],
                "changes": [
                  {
                    "role": "teacher",
                    "holder": "work",
                    "code": "11-2",
                    "delta": -1
                  }
                ],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": []
                }
              }
            }
          ],
          "next": null
        }
      ]
    },
    "definition": {
      "id": "content:18b-t01-08-04",
      "topicId": "T01-08",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-08-04",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "4-1",
        "2-4",
        "9-3"
      ],
      "additionalCodes": [
        "11-4",
        "3-1",
        "4-3"
      ],
      "weights": [
        0.191,
        0.17,
        0.17,
        0.213,
        0.128,
        0.128
      ],
      "directions": [
        1,
        1,
        1,
        -1,
        -1,
        1
      ],
      "eligibility": {
        "people": [
          "student"
        ],
        "dayKinds": [
          "school"
        ],
        "slotIds": [
          "lunch"
        ],
        "from": null,
        "until": null,
        "facts": [],
        "history": [],
        "numeric": [],
        "enrollment": null
      },
      "repetition": {
        "cooldownDays": 30,
        "exclusionGroups": [],
        "sameFact": true,
        "reason": "在籍學生於午餐非保護時段主動提出本件具體情境；不含夏冬營及離班學生，不保證重現"
      }
    },
    "binding": {
      "sources": [
        "participant",
        "participant",
        "participant",
        "school",
        "participant",
        "participant"
      ],
      "valence": "negative"
    }
  },
  {
    "story": {
      "resourceId": "content:18b-t01-08-05",
      "definitionId": "content:18b-t01-08-05",
      "version": "1",
      "topicId": "T01-08",
      "status": "engineering-test",
      "compilerContract": 2,
      "choiceContract": "four-v2",
      "entry": "opening",
      "stages": [
        {
          "id": "opening",
          "pages": [
            {
              "order": 1,
              "text": "早自習時，在導師班教室裡，學生展示自己的複習整理，說同學邀他每天帶讀，他只想偶爾分享。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我也還有自己不會的地方。",
              "speaker": "participant",
              "scene": "school:classroom",
              "cast": [
                {
                  "role": "participant",
                  "position": "center",
                  "expression": "calm"
                }
              ],
              "presentation": "dialogue"
            }
          ],
          "choices": [
            {
              "id": "strategy-1",
              "text": "先確認願意分享的範圍",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "教師記下學生只願分享一頁的意願，未安排固定教學工作。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": []
                }
              }
            },
            {
              "id": "strategy-2",
              "text": "提供可自行使用的分享方式",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生考慮提供提問架構，不交出整份個人紀錄或替同學保證效果。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": []
                }
              }
            },
            {
              "id": "strategy-3",
              "text": "練習婉拒每日帶讀",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "雙方試寫保留偶爾交流的拒絕句，尚未收到同學回應。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": []
                }
              }
            },
            {
              "id": "strategy-4",
              "text": "做得好也不用立刻被升職成全天候小老師",
              "kind": "action",
              "emotional": true,
              "outcome": {
                "fact": "教師以幽默肯定界線，沒有把能力轉成必須服務同儕的義務。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": []
                }
              }
            }
          ],
          "next": null
        }
      ]
    },
    "definition": {
      "id": "content:18b-t01-08-05",
      "topicId": "T01-08",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-08-05",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "4-1",
        "2-4",
        "9-3"
      ],
      "additionalCodes": [
        "8-4",
        "6-2",
        "3-1"
      ],
      "weights": [
        0.15,
        0.151,
        0.17,
        0.208,
        0.208,
        0.113
      ],
      "directions": [
        1,
        1,
        1,
        1,
        1,
        1
      ],
      "eligibility": {
        "people": [
          "student"
        ],
        "dayKinds": [
          "school"
        ],
        "slotIds": [
          "early"
        ],
        "from": null,
        "until": null,
        "facts": [],
        "history": [],
        "numeric": [],
        "enrollment": null
      },
      "repetition": {
        "cooldownDays": 30,
        "exclusionGroups": [],
        "sameFact": true,
        "reason": "在籍學生於午餐非保護時段主動提出本件具體情境；不含夏冬營及離班學生，不保證重現"
      }
    },
    "binding": {
      "sources": [
        "participant",
        "participant",
        "participant",
        "participant",
        "participant",
        "participant"
      ],
      "valence": "neutral"
    }
  },
  {
    "story": {
      "resourceId": "content:18b-t01-08-06",
      "definitionId": "content:18b-t01-08-06",
      "version": "1",
      "topicId": "T01-08",
      "status": "engineering-test",
      "compilerContract": 2,
      "choiceContract": "four-v2",
      "entry": "opening",
      "stages": [
        {
          "id": "opening",
          "pages": [
            {
              "order": 1,
              "text": "早自習時，在導師班教室裡，學生拿一本自己讀完的書與零散筆記，表示第一次不是只看摘要。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "很多地方還不懂，但我真的翻完了。",
              "speaker": "participant",
              "scene": "school:classroom",
              "cast": [
                {
                  "role": "participant",
                  "position": "center",
                  "expression": "happy"
                }
              ],
              "presentation": "dialogue"
            }
          ],
          "choices": [
            {
              "id": "strategy-1",
              "text": "讓他選最想談的一段",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生說明印象最深的段落，教師未把讀完等同完整理解。",
                "claims": [],
                "changes": [
                  {
                    "role": "teacher",
                    "holder": "work",
                    "code": "11-2",
                    "delta": -1
                  }
                ],
                "historyCodes": [
                  "H04-1"
                ],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": []
                }
              }
            },
            {
              "id": "strategy-2",
              "text": "保留不懂處作下次問題",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生把問號整理在一張紙上，不必為展示假裝全懂。",
                "claims": [],
                "changes": [],
                "historyCodes": [
                  "H04-1"
                ],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": []
                }
              }
            },
            {
              "id": "strategy-3",
              "text": "詢問是否願意留個人閱讀紀錄",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "教師說明可以只供本人保存，學生尚未同意任何公開使用。",
                "claims": [],
                "changes": [
                  {
                    "role": "teacher",
                    "holder": "work",
                    "code": "11-2",
                    "delta": -1
                  }
                ],
                "historyCodes": [
                  "H04-1"
                ],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": []
                }
              }
            },
            {
              "id": "strategy-4",
              "text": "讀完還願意承認不懂，我替你開心",
              "kind": "action",
              "emotional": true,
              "outcome": {
                "fact": "教師肯定持續閱讀及誠實表達，沒有承諾因此提升國文分數。",
                "claims": [],
                "changes": [],
                "historyCodes": [
                  "H04-1"
                ],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": []
                }
              }
            }
          ],
          "next": null
        }
      ]
    },
    "definition": {
      "id": "content:18b-t01-08-06",
      "topicId": "T01-08",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-08-06",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "4-1",
        "2-4",
        "9-3"
      ],
      "additionalCodes": [
        "1-1",
        "3-3",
        "3-1"
      ],
      "weights": [
        0.149,
        0.222,
        0.148,
        0.185,
        0.185,
        0.111
      ],
      "directions": [
        1,
        1,
        1,
        1,
        -1,
        -1
      ],
      "eligibility": {
        "people": [
          "student"
        ],
        "dayKinds": [
          "school"
        ],
        "slotIds": [
          "early"
        ],
        "from": null,
        "until": null,
        "facts": [],
        "history": [],
        "numeric": [],
        "enrollment": null
      },
      "repetition": {
        "cooldownDays": 30,
        "exclusionGroups": [],
        "sameFact": true,
        "reason": "在籍學生於午餐非保護時段主動提出本件具體情境；不含夏冬營及離班學生，不保證重現"
      }
    },
    "binding": {
      "sources": [
        "participant",
        "participant",
        "participant",
        "participant",
        "participant",
        "participant"
      ],
      "valence": "positive"
    }
  },
  {
    "story": {
      "resourceId": "content:18b-t01-08-07",
      "definitionId": "content:18b-t01-08-07",
      "version": "1",
      "topicId": "T01-08",
      "status": "engineering-test",
      "compilerContract": 2,
      "choiceContract": "four-v2",
      "entry": "opening",
      "stages": [
        {
          "id": "opening",
          "pages": [
            {
              "order": 1,
              "text": "午餐時，學生刻意避開教室人群，到校園談話角落告訴你：今天英文課，他第一次自己舉手用英語提問。",
              "speaker": null,
              "scene": "school:counselling-corner",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "有一點開心啦。可是拜託不要在班上講，我下次會想躲起來。",
              "speaker": "participant",
              "scene": "school:counselling-corner",
              "cast": [
                {
                  "role": "participant",
                  "position": "center",
                  "expression": "embarrassed"
                }
              ],
              "presentation": "dialogue"
            },
            {
              "order": 3,
              "text": "這是學生主動分享的一次突破，不代表他同意公開，也不能據此宣稱英語能力已完全改善。",
              "speaker": null,
              "scene": "school:counselling-corner",
              "cast": [],
              "presentation": "narration"
            }
          ],
          "choices": [
            {
              "id": "strategy-1",
              "text": "問他要不要自己留下今天的私人紀錄",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生自行決定是否把這次提問寫進自己的記錄；教師沒有安排公開表揚。",
                "claims": [],
                "changes": [
                  {
                    "role": "participant",
                    "holder": "person",
                    "code": "2-4",
                    "delta": 2
                  }
                ],
                "historyCodes": [
                  "H04-1"
                ],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": []
                }
              }
            },
            {
              "id": "strategy-2",
              "text": "讓學生選下一步，也可以暫時不設定新目標",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "教師提供一個自行決定的下一步，學生可以接受或保留今天的成果，不被強迫每次都要超越。",
                "claims": [],
                "changes": [
                  {
                    "role": "participant",
                    "holder": "person",
                    "code": "2-2",
                    "delta": -1
                  }
                ],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": []
                }
              },
              "variants": [
                {
                  "id": "engages",
                  "weight": 1.9,
                  "outcome": {
                    "fact": "學生選好下次英文課可能想問的一句話，不表示下次一定會舉手。",
                    "claims": [],
                    "changes": [
                      {
                        "role": "participant",
                        "holder": "person",
                        "code": "2-4",
                        "delta": 2
                      }
                    ],
                    "historyCodes": [],
                    "next": {
                      "stage": null,
                      "afterDays": 0
                    },
                    "world": {
                      "subjects": [
                        "teacher",
                        "participant"
                      ],
                      "witnesses": [
                        "teacher",
                        "participant"
                      ],
                      "affected": [
                        "participant"
                      ],
                      "contacts": [
                        [
                          "teacher",
                          "participant"
                        ]
                      ],
                      "transmissions": []
                    }
                  },
                  "modifiers": [
                    {
                      "role": "participant",
                      "holder": "person",
                      "code": "4-1",
                      "influence": 0.8
                    }
                  ]
                },
                {
                  "id": "hesitates",
                  "weight": 2.6,
                  "outcome": {
                    "fact": "學生暫時不設定下一次挑戰，只想保留今天的喜悅。",
                    "claims": [
                      {
                        "role": "participant",
                        "statement": "我不想變成每次都必須表現。",
                        "belief": "believed",
                        "visible": false
                      }
                    ],
                    "changes": [
                      {
                        "role": "participant",
                        "holder": "person",
                        "code": "2-4",
                        "delta": 1
                      }
                    ],
                    "historyCodes": [],
                    "next": {
                      "stage": null,
                      "afterDays": 0
                    },
                    "world": {
                      "subjects": [
                        "teacher",
                        "participant"
                      ],
                      "witnesses": [
                        "teacher",
                        "participant"
                      ],
                      "affected": [
                        "participant"
                      ],
                      "contacts": [
                        [
                          "teacher",
                          "participant"
                        ]
                      ],
                      "transmissions": [
                        {
                          "fromRole": "participant",
                          "toRole": "teacher",
                          "claimIndex": 0,
                          "description": "學生當面向導師說明自己目前的顧慮與想法。"
                        }
                      ]
                    }
                  },
                  "modifiers": [
                    {
                      "role": "participant",
                      "holder": "person",
                      "code": "4-3",
                      "influence": 1.1
                    }
                  ]
                }
              ]
            },
            {
              "id": "strategy-3",
              "text": "詢問要不要私下再說一次，婉拒也完全可以",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "教師提出自願的私下練習，尊重學生不在全班重演的界線。",
                "claims": [],
                "changes": [
                  {
                    "role": "participant",
                    "holder": "person",
                    "code": "2-4",
                    "delta": 1
                  }
                ],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": []
                }
              }
            },
            {
              "id": "strategy-4",
              "text": "那就偷偷開心一下，我不替你放煙火",
              "kind": "action",
              "emotional": true,
              "outcome": {
                "fact": "教師私下肯定學生的勇氣，不向家長或其他同學透露這次談話。",
                "claims": [],
                "changes": [
                  {
                    "role": "participant",
                    "holder": "person",
                    "code": "2-4",
                    "delta": 2
                  }
                ],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": []
                },
                "relationshipChanges": [
                  {
                    "fromRole": "participant",
                    "toRole": "teacher",
                    "code": "5-1",
                    "delta": 1,
                    "basis": "interaction"
                  }
                ]
              }
            }
          ],
          "next": null
        }
      ]
    },
    "definition": {
      "id": "content:18b-t01-08-07",
      "topicId": "T01-08",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-08-07",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "4-1",
        "2-4",
        "9-3"
      ],
      "additionalCodes": [
        "3-1",
        "4-3",
        "2-2"
      ],
      "weights": [
        0.21,
        0.24,
        0.14,
        0.12,
        0.11,
        0.18
      ],
      "directions": [
        1,
        1,
        1,
        -1,
        1,
        1
      ],
      "eligibility": {
        "people": [
          "student"
        ],
        "dayKinds": [
          "school"
        ],
        "slotIds": [
          "lunch"
        ],
        "from": null,
        "until": null,
        "facts": [],
        "history": [],
        "numeric": [],
        "enrollment": null
      },
      "repetition": {
        "cooldownDays": 30,
        "exclusionGroups": [],
        "sameFact": true,
        "reason": "在籍學生於指定合法非保護時段接觸導師；僅記錄已確認事實，不以同主題或日期推定相同問題。"
      }
    },
    "binding": {
      "sources": [
        "participant",
        "participant",
        "participant",
        "participant",
        "participant",
        "participant"
      ],
      "valence": "positive"
    }
  },
  {
    "story": {
      "resourceId": "content:18b-t01-08-08",
      "definitionId": "content:18b-t01-08-08",
      "version": "1",
      "topicId": "T01-08",
      "status": "engineering-test",
      "compilerContract": 2,
      "choiceContract": "four-v2",
      "entry": "opening",
      "stages": [
        {
          "id": "opening",
          "pages": [
            {
              "order": 1,
              "text": "午餐時，在教學大樓走廊，學生帶成果展名牌，說台上只念了報告者，自己負責的資料整理沒被提到。",
              "speaker": null,
              "scene": "school:corridor",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我也做了，可是好像只有台上那個人。",
              "speaker": "participant",
              "scene": "school:corridor",
              "cast": [
                {
                  "role": "participant",
                  "position": "center",
                  "expression": "sad"
                }
              ],
              "presentation": "dialogue"
            }
          ],
          "choices": [
            {
              "id": "strategy-1",
              "text": "先列本人可證明的貢獻",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生提供自己完成的表格及紀錄，教師未判定其他人故意搶功。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": []
                }
              }
            },
            {
              "id": "strategy-2",
              "text": "協助向承辦詢問名牌補充",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "教師整理貢獻註記需求，是否更改公開名牌由承辦及團隊確認。",
                "claims": [],
                "changes": [
                  {
                    "role": "teacher",
                    "holder": "work",
                    "code": "11-2",
                    "delta": -1
                  }
                ],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": []
                }
              }
            },
            {
              "id": "strategy-3",
              "text": "準備個人學習紀錄",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生在自己的紀錄寫出資料處理工作，不代表全組承認署名。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": []
                }
              }
            },
            {
              "id": "strategy-4",
              "text": "站在台下的工作也不是隱形的",
              "kind": "action",
              "emotional": true,
              "outcome": {
                "fact": "教師表達肯定，未把感受回應當成署名爭點已解決。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": []
                }
              }
            }
          ],
          "next": null
        }
      ]
    },
    "definition": {
      "id": "content:18b-t01-08-08",
      "topicId": "T01-08",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-08-08",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "4-1",
        "2-4",
        "9-3"
      ],
      "additionalCodes": [
        "4-4",
        "6-1",
        "9-2"
      ],
      "weights": [
        0.206,
        0.127,
        0.19,
        0.159,
        0.159,
        0.159
      ],
      "directions": [
        1,
        1,
        1,
        1,
        1,
        -1
      ],
      "eligibility": {
        "people": [
          "student"
        ],
        "dayKinds": [
          "school"
        ],
        "slotIds": [
          "lunch"
        ],
        "from": null,
        "until": null,
        "facts": [],
        "history": [],
        "numeric": [],
        "enrollment": null
      },
      "repetition": {
        "cooldownDays": 30,
        "exclusionGroups": [],
        "sameFact": true,
        "reason": "在籍學生於午餐非保護時段主動提出本件具體情境；不含夏冬營及離班學生，不保證重現"
      }
    },
    "binding": {
      "sources": [
        "participant",
        "participant",
        "participant",
        "participant",
        "participant",
        "classroom"
      ],
      "valence": "neutral"
    }
  },
  {
    "story": {
      "resourceId": "content:18b-t01-08-09",
      "definitionId": "content:18b-t01-08-09",
      "version": "1",
      "topicId": "T01-08",
      "status": "engineering-test",
      "compilerContract": 2,
      "choiceContract": "four-v2",
      "entry": "opening",
      "stages": [
        {
          "id": "opening",
          "pages": [
            {
              "order": 1,
              "text": "早自習時，在導師班教室裡，學生出示一份完成的地方史訪查，擔心不是競賽獎狀，放進學習歷程沒價值。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "沒有得獎，會不會看起來很普通？",
              "speaker": "participant",
              "scene": "school:classroom",
              "cast": [
                {
                  "role": "participant",
                  "position": "center",
                  "expression": "calm"
                }
              ],
              "presentation": "dialogue"
            }
          ],
          "choices": [
            {
              "id": "strategy-1",
              "text": "找出研究中實際做過的決定",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生挑出一次資料取捨，教師未代寫成誇大的能力宣言。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": []
                }
              }
            },
            {
              "id": "strategy-2",
              "text": "整理可核對的成果與限制",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "雙方分列訪查紀錄及未能查證處，不將受訪說法當成史實定論。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": []
                }
              }
            },
            {
              "id": "strategy-3",
              "text": "讓學生決定是否收錄",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "教師說明可保留個人學習用途，未承諾審查者喜好或錄取效果。",
                "claims": [],
                "changes": [
                  {
                    "role": "teacher",
                    "holder": "work",
                    "code": "11-2",
                    "delta": -1
                  }
                ],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": []
                }
              }
            },
            {
              "id": "strategy-4",
              "text": "普通的題目做得紮實，也值得你認真看待",
              "kind": "action",
              "emotional": true,
              "outcome": {
                "fact": "教師肯定探究工作，沒有保證這份成果比獎狀更有利。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": []
                }
              }
            }
          ],
          "next": null
        }
      ]
    },
    "definition": {
      "id": "content:18b-t01-08-09",
      "topicId": "T01-08",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-08-09",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "4-1",
        "2-4",
        "9-3"
      ],
      "additionalCodes": [
        "4-2",
        "4-3",
        "4-4"
      ],
      "weights": [
        0.284,
        0.226,
        0.151,
        0.113,
        0.113,
        0.113
      ],
      "directions": [
        1,
        1,
        1,
        1,
        1,
        1
      ],
      "eligibility": {
        "people": [
          "student"
        ],
        "dayKinds": [
          "school"
        ],
        "slotIds": [
          "early"
        ],
        "from": null,
        "until": null,
        "facts": [],
        "history": [],
        "numeric": [],
        "enrollment": null
      },
      "repetition": {
        "cooldownDays": 30,
        "exclusionGroups": [],
        "sameFact": true,
        "reason": "在籍學生於午餐非保護時段主動提出本件具體情境；不含夏冬營及離班學生，不保證重現"
      }
    },
    "binding": {
      "sources": [
        "participant",
        "participant",
        "participant",
        "participant",
        "participant",
        "participant"
      ],
      "valence": "neutral"
    }
  },
  {
    "story": {
      "resourceId": "content:18b-t01-08-10",
      "definitionId": "content:18b-t01-08-10",
      "version": "1",
      "topicId": "T01-08",
      "status": "engineering-test",
      "compilerContract": 2,
      "choiceContract": "four-v2",
      "entry": "opening",
      "stages": [
        {
          "id": "opening",
          "pages": [
            {
              "order": 1,
              "text": "午餐時，在校園談話角落，學生拿完成的插畫與課堂說明，表示只想交作業，不願被拿去參賽。",
              "speaker": null,
              "scene": "school:counselling-corner",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我畫的時候沒有想跟人比。",
              "speaker": "participant",
              "scene": "school:counselling-corner",
              "cast": [
                {
                  "role": "participant",
                  "position": "center",
                  "expression": "calm"
                }
              ],
              "presentation": "dialogue"
            }
          ],
          "choices": [
            {
              "id": "strategy-1",
              "text": "記下用途界線",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "教師記下目前只同意課內繳交，未替科任撤回或追加參賽。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": []
                }
              }
            },
            {
              "id": "strategy-2",
              "text": "協助向科任表達選擇",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生擬出不參賽的說明，尚未收到任課回覆。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": []
                }
              }
            },
            {
              "id": "strategy-3",
              "text": "討論個人保存方式",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生決定先留原檔及日期，未上傳到外部平台。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": []
                }
              }
            },
            {
              "id": "strategy-4",
              "text": "完成已經值得高興，不一定要再排一場比賽",
              "kind": "action",
              "emotional": true,
              "outcome": {
                "fact": "教師表達欣慰，不把拒賽當成缺乏企圖心或保證沒有課程要求。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": []
                }
              }
            }
          ],
          "next": null
        }
      ]
    },
    "definition": {
      "id": "content:18b-t01-08-10",
      "topicId": "T01-08",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-08-10",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "4-1",
        "2-4",
        "9-3"
      ],
      "additionalCodes": [
        "3-1",
        "4-3",
        "4-4"
      ],
      "weights": [
        0.182,
        0.205,
        0.182,
        0.159,
        0.136,
        0.136
      ],
      "directions": [
        1,
        1,
        1,
        -1,
        1,
        1
      ],
      "eligibility": {
        "people": [
          "student"
        ],
        "dayKinds": [
          "school"
        ],
        "slotIds": [
          "lunch"
        ],
        "from": null,
        "until": null,
        "facts": [],
        "history": [],
        "numeric": [],
        "enrollment": null
      },
      "repetition": {
        "cooldownDays": 30,
        "exclusionGroups": [],
        "sameFact": true,
        "reason": "在籍學生於午餐非保護時段主動提出本件具體情境；不含夏冬營及離班學生，不保證重現"
      }
    },
    "binding": {
      "sources": [
        "participant",
        "participant",
        "participant",
        "participant",
        "participant",
        "participant"
      ],
      "valence": "neutral"
    }
  },
  {
    "story": {
      "resourceId": "content:18b-t01-08-11",
      "definitionId": "content:18b-t01-08-11",
      "version": "1",
      "topicId": "T01-08",
      "status": "engineering-test",
      "compilerContract": 2,
      "choiceContract": "four-v2",
      "entry": "opening",
      "stages": [
        {
          "id": "opening",
          "pages": [
            {
              "order": 1,
              "text": "午休時，在教師辦公室，學生帶實驗紀錄，表示重看照片發現標籤貼反，願意把失敗寫進成果。",
              "speaker": null,
              "scene": "school:teachers-office",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "所以那張圖不能說支持假設。",
              "speaker": "participant",
              "scene": "school:teachers-office",
              "cast": [
                {
                  "role": "participant",
                  "position": "center",
                  "expression": "happy"
                }
              ],
              "presentation": "dialogue"
            }
          ],
          "choices": [
            {
              "id": "strategy-1",
              "text": "確認紀錄能支持到哪裡",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "雙方依學生提供的標籤照片記下可核對處，不推論所有異常只有這個原因。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": []
                }
              }
            },
            {
              "id": "strategy-2",
              "text": "整理修正後的限制說明",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生在副本把原結論標為需修正，沒有事後改寫原始測量。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": []
                }
              }
            },
            {
              "id": "strategy-3",
              "text": "向科任請教重測與報告方式",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "教師協助提出保留原始紀錄的詢問，未保證可重測或加分。",
                "claims": [],
                "changes": [
                  {
                    "role": "teacher",
                    "holder": "work",
                    "code": "11-2",
                    "delta": -1
                  }
                ],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": []
                }
              }
            },
            {
              "id": "strategy-4",
              "text": "願意拆自己的漂亮結論，很有研究的樣子",
              "kind": "action",
              "emotional": true,
              "outcome": {
                "fact": "教師肯定查錯態度，不將找到一個可能原因宣告研究已成功。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": []
                }
              }
            }
          ],
          "next": null
        }
      ]
    },
    "definition": {
      "id": "content:18b-t01-08-11",
      "topicId": "T01-08",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-08-11",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "4-1",
        "2-4",
        "9-3"
      ],
      "additionalCodes": [
        "3-1",
        "4-3",
        "4-4"
      ],
      "weights": [
        0.208,
        0.186,
        0.186,
        0.14,
        0.14,
        0.14
      ],
      "directions": [
        1,
        1,
        1,
        -1,
        1,
        1
      ],
      "eligibility": {
        "people": [
          "student"
        ],
        "dayKinds": [
          "school"
        ],
        "slotIds": [
          "noon"
        ],
        "from": null,
        "until": null,
        "facts": [],
        "history": [],
        "numeric": [],
        "enrollment": null
      },
      "repetition": {
        "cooldownDays": 30,
        "exclusionGroups": [],
        "sameFact": true,
        "reason": "在籍學生於午餐非保護時段主動提出本件具體情境；不含夏冬營及離班學生，不保證重現"
      }
    },
    "binding": {
      "sources": [
        "participant",
        "participant",
        "participant",
        "participant",
        "participant",
        "participant"
      ],
      "valence": "neutral"
    }
  },
  {
    "story": {
      "resourceId": "content:18b-t01-08-12",
      "definitionId": "content:18b-t01-08-12",
      "version": "1",
      "topicId": "T01-08",
      "status": "engineering-test",
      "compilerContract": 2,
      "choiceContract": "four-v2",
      "entry": "opening",
      "stages": [
        {
          "id": "opening",
          "pages": [
            {
              "order": 1,
              "text": "午餐時，在校園談話角落，學生出示自己公開作品下的尖銳評論，想把整份成果刪掉。",
              "speaker": null,
              "scene": "school:counselling-corner",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "他說這種程度也敢放。",
              "speaker": "participant",
              "scene": "school:counselling-corner",
              "cast": [
                {
                  "role": "participant",
                  "position": "center",
                  "expression": "sad"
                }
              ],
              "presentation": "dialogue"
            }
          ],
          "choices": [
            {
              "id": "strategy-1",
              "text": "區分可用建議與人身評語",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "雙方針對學生願意出示的留言分類，未推測留言者身分或動機。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": []
                }
              }
            },
            {
              "id": "strategy-2",
              "text": "先暫停閱讀及保存作品副本",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生保留本機副本，是否下架由本人依平台及課程規定決定。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": []
                }
              }
            },
            {
              "id": "strategy-3",
              "text": "整理一個願意修改的技術點",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生挑出可查核的技術疑問，沒有被迫接受羞辱語句。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": []
                }
              },
              "variants": [
                {
                  "id": "willing-to-act",
                  "weight": 1.6,
                  "modifiers": [
                    {
                      "role": "participant",
                      "holder": "person",
                      "code": "3-2",
                      "influence": 0.9
                    }
                  ],
                  "outcome": {
                    "fact": "學生挑出一個可查證的技術疑點，決定先查資料再評估是否修改，不接受留言中的人身評語。",
                    "claims": [],
                    "changes": [
                      {
                        "role": "participant",
                        "holder": "person",
                        "code": "2-2",
                        "delta": -1
                      }
                    ],
                    "historyCodes": [],
                    "next": {
                      "stage": null,
                      "afterDays": 0
                    },
                    "world": {
                      "subjects": [
                        "teacher",
                        "participant"
                      ],
                      "witnesses": [
                        "teacher",
                        "participant"
                      ],
                      "affected": [
                        "participant"
                      ],
                      "contacts": [
                        [
                          "teacher",
                          "participant"
                        ]
                      ],
                      "transmissions": []
                    }
                  }
                },
                {
                  "id": "not-yet-ready",
                  "weight": 2.6,
                  "modifiers": [
                    {
                      "role": "participant",
                      "holder": "person",
                      "code": "2-2",
                      "influence": 1.2
                    }
                  ],
                  "outcome": {
                    "fact": "學生挑出一個可查證的技術疑點，但今天決定先放下尖銳評論，保留原作待情緒平復。",
                    "claims": [],
                    "changes": [],
                    "historyCodes": [],
                    "next": {
                      "stage": null,
                      "afterDays": 0
                    },
                    "world": {
                      "subjects": [
                        "teacher",
                        "participant"
                      ],
                      "witnesses": [
                        "teacher",
                        "participant"
                      ],
                      "affected": [
                        "participant"
                      ],
                      "contacts": [
                        [
                          "teacher",
                          "participant"
                        ]
                      ],
                      "transmissions": []
                    }
                  }
                }
              ]
            },
            {
              "id": "strategy-4",
              "text": "看到這樣的話很刺，我們先別讓它替作品判生死",
              "kind": "action",
              "emotional": true,
              "outcome": {
                "fact": "教師表達支持，不號召同學圍攻或宣稱留言已構成違法。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": []
                }
              }
            }
          ],
          "next": null
        }
      ]
    },
    "definition": {
      "id": "content:18b-t01-08-12",
      "topicId": "T01-08",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-08-12",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "4-1",
        "2-4",
        "9-3"
      ],
      "additionalCodes": [
        "3-1",
        "4-3",
        "4-4"
      ],
      "weights": [
        0.208,
        0.186,
        0.186,
        0.14,
        0.14,
        0.14
      ],
      "directions": [
        1,
        -1,
        1,
        -1,
        1,
        1
      ],
      "eligibility": {
        "people": [
          "student"
        ],
        "dayKinds": [
          "school"
        ],
        "slotIds": [
          "lunch"
        ],
        "from": null,
        "until": null,
        "facts": [],
        "history": [],
        "numeric": [],
        "enrollment": null
      },
      "repetition": {
        "cooldownDays": 30,
        "exclusionGroups": [],
        "sameFact": true,
        "reason": "在籍學生於午餐非保護時段主動提出本件具體情境；不含夏冬營及離班學生，不保證重現"
      }
    },
    "binding": {
      "sources": [
        "participant",
        "participant",
        "participant",
        "participant",
        "participant",
        "participant"
      ],
      "valence": "neutral"
    }
  },
  {
    "story": {
      "resourceId": "content:18b-t01-08-13",
      "definitionId": "content:18b-t01-08-13",
      "version": "1",
      "topicId": "T01-08",
      "status": "engineering-test",
      "compilerContract": 2,
      "choiceContract": "four-v2",
      "entry": "opening",
      "stages": [
        {
          "id": "opening",
          "pages": [
            {
              "order": 1,
              "text": "午餐時，在教學大樓走廊，學生說成果展被問到沒研究的範圍，當場回答不知道，現在覺得很丟臉。",
              "speaker": null,
              "scene": "school:corridor",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "別組都答得很順，只有我停住。",
              "speaker": "participant",
              "scene": "school:corridor",
              "cast": [
                {
                  "role": "participant",
                  "position": "center",
                  "expression": "embarrassed"
                }
              ],
              "presentation": "dialogue"
            }
          ],
          "choices": [
            {
              "id": "strategy-1",
              "text": "把問題列為研究邊界",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生記下記得的問法及目前資料不足處，不補造當時回答。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": []
                }
              }
            },
            {
              "id": "strategy-2",
              "text": "準備可誠實說明的回應",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "雙方練習說出研究範圍與待查方向，沒有背出無來源答案。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": []
                }
              }
            },
            {
              "id": "strategy-3",
              "text": "詢問是否有正式後續回覆管道",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "教師協助查詢主辦聯絡說明，尚未取得提問者個資或送出答覆。",
                "claims": [],
                "changes": [
                  {
                    "role": "teacher",
                    "holder": "work",
                    "code": "11-2",
                    "delta": -1
                  }
                ],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": []
                }
              }
            },
            {
              "id": "strategy-4",
              "text": "知道不知道的邊界，比硬湊一句可靠",
              "kind": "action",
              "emotional": true,
              "outcome": {
                "fact": "教師肯定誠實，不保證評審已因此給予好評。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": []
                }
              }
            }
          ],
          "next": null
        }
      ]
    },
    "definition": {
      "id": "content:18b-t01-08-13",
      "topicId": "T01-08",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-08-13",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "4-1",
        "2-4",
        "9-3"
      ],
      "additionalCodes": [
        "3-1",
        "4-3",
        "4-4"
      ],
      "weights": [
        0.208,
        0.186,
        0.186,
        0.14,
        0.14,
        0.14
      ],
      "directions": [
        1,
        1,
        1,
        -1,
        1,
        1
      ],
      "eligibility": {
        "people": [
          "student"
        ],
        "dayKinds": [
          "school"
        ],
        "slotIds": [
          "lunch"
        ],
        "from": null,
        "until": null,
        "facts": [],
        "history": [],
        "numeric": [],
        "enrollment": null
      },
      "repetition": {
        "cooldownDays": 30,
        "exclusionGroups": [],
        "sameFact": true,
        "reason": "在籍學生於午餐非保護時段主動提出本件具體情境；不含夏冬營及離班學生，不保證重現"
      }
    },
    "binding": {
      "sources": [
        "participant",
        "participant",
        "participant",
        "participant",
        "participant",
        "participant"
      ],
      "valence": "neutral"
    }
  },
  {
    "story": {
      "resourceId": "content:18b-t01-08-14",
      "definitionId": "content:18b-t01-08-14",
      "version": "1",
      "topicId": "T01-08",
      "status": "engineering-test",
      "compilerContract": 2,
      "choiceContract": "four-v2",
      "entry": "opening",
      "stages": [
        {
          "id": "opening",
          "pages": [
            {
              "order": 1,
              "text": "早自習時，在導師班教室裡，學生拿一篇課外自選短文的前後兩版，表示沒有人要求也想再修一次。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "這次不是為了補分，我想把結尾寫好。",
              "speaker": "participant",
              "scene": "school:classroom",
              "cast": [
                {
                  "role": "participant",
                  "position": "center",
                  "expression": "happy"
                }
              ],
              "presentation": "dialogue"
            }
          ],
          "choices": [
            {
              "id": "strategy-1",
              "text": "請他說明改動理由",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生指出結尾改動及想呈現的效果，教師未代替讀者認定效果已達成。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": []
                }
              }
            },
            {
              "id": "strategy-2",
              "text": "只給一項具體閱讀回饋",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "教師說明自己讀到的重點，學生自行決定是否採納。",
                "claims": [],
                "changes": [
                  {
                    "role": "teacher",
                    "holder": "work",
                    "code": "11-2",
                    "delta": -1
                  }
                ],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": []
                }
              }
            },
            {
              "id": "strategy-3",
              "text": "保留兩版供自己比較",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生把版本日期記好，未將初稿當成應隱藏的失敗。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": []
                }
              }
            },
            {
              "id": "strategy-4",
              "text": "你開始在意自己想說什麼，我很高興",
              "kind": "action",
              "emotional": true,
              "outcome": {
                "fact": "教師表達欣慰，未承諾公開推薦或額外加分。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": []
                }
              }
            }
          ],
          "next": null
        }
      ]
    },
    "definition": {
      "id": "content:18b-t01-08-14",
      "topicId": "T01-08",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-08-14",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "4-1",
        "2-4",
        "9-3"
      ],
      "additionalCodes": [
        "3-3",
        "4-3",
        "4-4"
      ],
      "weights": [
        0.191,
        0.19,
        0.19,
        0.143,
        0.143,
        0.143
      ],
      "directions": [
        1,
        1,
        1,
        -1,
        1,
        1
      ],
      "eligibility": {
        "people": [
          "student"
        ],
        "dayKinds": [
          "school"
        ],
        "slotIds": [
          "early"
        ],
        "from": null,
        "until": null,
        "facts": [],
        "history": [],
        "numeric": [],
        "enrollment": null
      },
      "repetition": {
        "cooldownDays": 30,
        "exclusionGroups": [],
        "sameFact": true,
        "reason": "在籍學生於午餐非保護時段主動提出本件具體情境；不含夏冬營及離班學生，不保證重現"
      }
    },
    "binding": {
      "sources": [
        "participant",
        "participant",
        "participant",
        "participant",
        "participant",
        "participant"
      ],
      "valence": "positive"
    }
  },
  {
    "story": {
      "resourceId": "content:18b-t01-08-15",
      "definitionId": "content:18b-t01-08-15",
      "version": "1",
      "topicId": "T01-08",
      "status": "engineering-test",
      "compilerContract": 2,
      "choiceContract": "four-v2",
      "entry": "opening",
      "stages": [
        {
          "id": "opening",
          "pages": [
            {
              "order": 1,
              "text": "早自習時，在導師班教室裡，學生說班上想辦解題分享，擔心只有最高分者能展示，拿來自己的不同解法。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我分數不高，但這題走法不太一樣。",
              "speaker": "participant",
              "scene": "school:classroom",
              "cast": [
                {
                  "role": "participant",
                  "position": "center",
                  "expression": "calm"
                }
              ],
              "presentation": "dialogue"
            }
          ],
          "choices": [
            {
              "id": "strategy-1",
              "text": "先聽不同解法的依據",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生說明一段推理，正確性仍需學科核對，不用總分代替判斷。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": []
                }
              }
            },
            {
              "id": "strategy-2",
              "text": "討論可自願參與的展示規則",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "教師提出依具體內容而非排名徵求分享的方案，尚未獲全班或任課同意。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": []
                }
              }
            },
            {
              "id": "strategy-3",
              "text": "協助先請科任檢視解法",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生整理步驟供詢問，不保證會被列入展示。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": []
                }
              }
            },
            {
              "id": "strategy-4",
              "text": "好想法不用先拿總分當門票",
              "kind": "action",
              "emotional": true,
              "outcome": {
                "fact": "教師肯定提出內容的意願，沒有保證該解法正確或必獲採用。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": []
                }
              }
            }
          ],
          "next": null
        }
      ]
    },
    "definition": {
      "id": "content:18b-t01-08-15",
      "topicId": "T01-08",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-08-15",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "4-1",
        "2-4",
        "9-3"
      ],
      "additionalCodes": [
        "3-1",
        "4-3",
        "4-4"
      ],
      "weights": [
        0.22,
        0.16,
        0.26,
        0.12,
        0.12,
        0.12
      ],
      "directions": [
        1,
        1,
        1,
        -1,
        1,
        1
      ],
      "eligibility": {
        "people": [
          "student"
        ],
        "dayKinds": [
          "school"
        ],
        "slotIds": [
          "early"
        ],
        "from": null,
        "until": null,
        "facts": [],
        "history": [],
        "numeric": [],
        "enrollment": null
      },
      "repetition": {
        "cooldownDays": 30,
        "exclusionGroups": [],
        "sameFact": true,
        "reason": "在籍學生於午餐非保護時段主動提出本件具體情境；不含夏冬營及離班學生，不保證重現"
      }
    },
    "binding": {
      "sources": [
        "participant",
        "participant",
        "participant",
        "participant",
        "participant",
        "participant"
      ],
      "valence": "neutral"
    }
  },
  {
    "story": {
      "resourceId": "content:18b-t01-08-16",
      "definitionId": "content:18b-t01-08-16",
      "version": "1",
      "topicId": "T01-08",
      "status": "engineering-test",
      "compilerContract": 2,
      "choiceContract": "four-v2",
      "entry": "opening",
      "stages": [
        {
          "id": "opening",
          "pages": [
            {
              "order": 1,
              "text": "午餐時，在校園談話角落，學生拿完成的訪談短片，發現受訪同學談了家庭私事，原同意書只寫課內觀看。",
              "speaker": null,
              "scene": "school:counselling-corner",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "剪得很有力量，可是他不一定想讓校外看。",
              "speaker": "participant",
              "scene": "school:counselling-corner",
              "cast": [
                {
                  "role": "participant",
                  "position": "center",
                  "expression": "sad"
                }
              ],
              "presentation": "dialogue"
            }
          ],
          "choices": [
            {
              "id": "strategy-1",
              "text": "先維持課內用途不外傳",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "教師與學生確認不擴大使用的當前界線，未宣稱受訪者同意任何新用途。",
                "claims": [],
                "changes": [
                  {
                    "role": "teacher",
                    "holder": "work",
                    "code": "11-2",
                    "delta": -1
                  }
                ],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": []
                }
              }
            },
            {
              "id": "strategy-2",
              "text": "整理需要另外詢問的片段",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生標出可辨識及敏感內容，沒有當場聯絡缺席同學施壓同意。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": []
                }
              }
            },
            {
              "id": "strategy-3",
              "text": "規劃刪減後的替代剪輯",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "教師提議以不含私事的內容展示，學生尚未完成新版或取得核准。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": []
                }
              }
            },
            {
              "id": "strategy-4",
              "text": "有力量的作品，也要替說故事的人留退路",
              "kind": "action",
              "emotional": true,
              "outcome": {
                "fact": "教師肯定對隱私的在意，不將藝術效果當成擴大公開的授權。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": []
                }
              }
            }
          ],
          "next": null
        }
      ]
    },
    "definition": {
      "id": "content:18b-t01-08-16",
      "topicId": "T01-08",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-08-16",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "4-1",
        "2-4",
        "9-3"
      ],
      "additionalCodes": [
        "1-4",
        "8-4",
        "4-3"
      ],
      "weights": [
        0.16,
        0.18,
        0.18,
        0.22,
        0.12,
        0.14
      ],
      "directions": [
        1,
        1,
        1,
        1,
        1,
        1
      ],
      "eligibility": {
        "people": [
          "student"
        ],
        "dayKinds": [
          "school"
        ],
        "slotIds": [
          "lunch"
        ],
        "from": null,
        "until": null,
        "facts": [],
        "history": [],
        "numeric": [],
        "enrollment": null
      },
      "repetition": {
        "cooldownDays": 30,
        "exclusionGroups": [],
        "sameFact": true,
        "reason": "在籍學生於午餐非保護時段主動提出本件具體情境；不含夏冬營及離班學生，不保證重現"
      }
    },
    "binding": {
      "sources": [
        "participant",
        "participant",
        "participant",
        "participant",
        "participant",
        "participant"
      ],
      "valence": "neutral"
    }
  },
  {
    "story": {
      "resourceId": "content:18b-t01-08-18",
      "definitionId": "content:18b-t01-08-18",
      "version": "1",
      "topicId": "T01-08",
      "status": "engineering-test",
      "compilerContract": 2,
      "choiceContract": "four-v2",
      "entry": "opening",
      "stages": [
        {
          "id": "opening",
          "pages": [
            {
              "order": 1,
              "text": "午餐時，在教師辦公室，學生表示願意讓學校展示模型，但原作脆弱，擔心運送受損。",
              "speaker": null,
              "scene": "school:teachers-office",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我只做這一份，壞掉就沒有了。",
              "speaker": "participant",
              "scene": "school:teachers-office",
              "cast": [
                {
                  "role": "participant",
                  "position": "center",
                  "expression": "sad"
                }
              ],
              "presentation": "dialogue"
            }
          ],
          "choices": [
            {
              "id": "strategy-1",
              "text": "先列保管與運送疑問",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生寫出材質及易損處，教師未保證校方負全責或已投保。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": []
                }
              }
            },
            {
              "id": "strategy-2",
              "text": "詢問可否用照片替代",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "教師協助提出替代展示需求，承辦是否同意仍未知。",
                "claims": [],
                "changes": [
                  {
                    "role": "teacher",
                    "holder": "work",
                    "code": "11-2",
                    "delta": -1
                  }
                ],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": []
                }
              }
            },
            {
              "id": "strategy-3",
              "text": "暫不交出原作等條件確認",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生保留作品並準備詢問保管紀錄，未因此被視為拒絕課程繳交。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": []
                }
              }
            },
            {
              "id": "strategy-4",
              "text": "高興有機會展示，也不用把心血拿去冒險",
              "kind": "action",
              "emotional": true,
              "outcome": {
                "fact": "教師回應兩難，沒有擅自決定學校展示規則。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": []
                }
              }
            }
          ],
          "next": null
        }
      ]
    },
    "definition": {
      "id": "content:18b-t01-08-18",
      "topicId": "T01-08",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-08-18",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "4-1",
        "2-4",
        "9-3"
      ],
      "additionalCodes": [
        "4-2",
        "3-1",
        "4-3"
      ],
      "weights": [
        0.234,
        0.157,
        0.157,
        0.216,
        0.118,
        0.118
      ],
      "directions": [
        1,
        1,
        1,
        1,
        -1,
        1
      ],
      "eligibility": {
        "people": [
          "student"
        ],
        "dayKinds": [
          "school"
        ],
        "slotIds": [
          "lunch"
        ],
        "from": null,
        "until": null,
        "facts": [],
        "history": [],
        "numeric": [],
        "enrollment": null
      },
      "repetition": {
        "cooldownDays": 30,
        "exclusionGroups": [],
        "sameFact": true,
        "reason": "在籍學生於午餐非保護時段主動提出本件具體情境；不含夏冬營及離班學生，不保證重現"
      }
    },
    "binding": {
      "sources": [
        "participant",
        "participant",
        "participant",
        "participant",
        "participant",
        "participant"
      ],
      "valence": "neutral"
    }
  },
  {
    "story": {
      "resourceId": "content:18b-t01-08-19",
      "definitionId": "content:18b-t01-08-19",
      "version": "1",
      "topicId": "T01-08",
      "status": "engineering-test",
      "compilerContract": 2,
      "choiceContract": "four-v2",
      "entry": "opening",
      "stages": [
        {
          "id": "opening",
          "pages": [
            {
              "order": 1,
              "text": "午餐時，在校園談話角落，學生拿比賽得獎證書，說家人一直拿它與兄姊比較，想請導師不要再在家長群提。",
              "speaker": null,
              "scene": "school:counselling-corner",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我很開心，可是每次都變成誰比較強。",
              "speaker": "participant",
              "scene": "school:counselling-corner",
              "cast": [
                {
                  "role": "participant",
                  "position": "center",
                  "expression": "sad"
                }
              ],
              "presentation": "dialogue"
            }
          ],
          "choices": [
            {
              "id": "strategy-1",
              "text": "確認可傳達的界線",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "教師記下學生不希望群組追加表揚的意願，未宣稱家人已停止比較。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我很開心，可是每次都變成誰比較強。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [
                  "H04-1"
                ],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面向導師表達本次談話中的個人顧慮或感受。"
                    }
                  ]
                }
              }
            },
            {
              "id": "strategy-2",
              "text": "討論只說本人學習過程的方式",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生擬出不涉及兄姊比較的成果描述，未自動發給家人。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我很開心，可是每次都變成誰比較強。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [
                  "H04-1"
                ],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面向導師表達本次談話中的個人顧慮或感受。"
                    }
                  ]
                }
              }
            },
            {
              "id": "strategy-3",
              "text": "先讓學生保留私人慶祝",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "教師陪學生選擇個人紀錄，不要求公開喜悅來證明感謝。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我很開心，可是每次都變成誰比較強。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [
                  {
                    "role": "teacher",
                    "holder": "work",
                    "code": "11-2",
                    "delta": -1
                  }
                ],
                "historyCodes": [
                  "H04-1"
                ],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面向導師表達本次談話中的個人顧慮或感受。"
                    }
                  ]
                }
              }
            },
            {
              "id": "strategy-4",
              "text": "這張證書是你的，不必拿來替家裡排名",
              "kind": "action",
              "emotional": true,
              "outcome": {
                "fact": "教師表達支持，未替家人決定言行或推定家庭動機。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我很開心，可是每次都變成誰比較強。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [
                  "H04-1"
                ],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面向導師表達本次談話中的個人顧慮或感受。"
                    }
                  ]
                }
              }
            }
          ],
          "next": null
        }
      ]
    },
    "definition": {
      "id": "content:18b-t01-08-19",
      "topicId": "T01-08",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-08-19",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "4-1",
        "2-4",
        "9-3"
      ],
      "additionalCodes": [
        "3-2",
        "6-2",
        "4-3"
      ],
      "weights": [
        0.2,
        0.2,
        0.107,
        0.173,
        0.173,
        0.147
      ],
      "directions": [
        1,
        1,
        -1,
        -1,
        1,
        1
      ],
      "eligibility": {
        "people": [
          "student"
        ],
        "dayKinds": [
          "school"
        ],
        "slotIds": [
          "lunch"
        ],
        "from": null,
        "until": null,
        "facts": [],
        "history": [],
        "numeric": [],
        "enrollment": null
      },
      "repetition": {
        "cooldownDays": 30,
        "exclusionGroups": [],
        "sameFact": true,
        "reason": "在籍學生於午餐非保護時段主動提出本件具體情境；不含夏冬營及離班學生，不保證重現"
      }
    },
    "binding": {
      "sources": [
        "participant",
        "participant",
        "participant",
        "participant",
        "participant",
        "participant"
      ],
      "valence": "positive"
    }
  },
  {
    "story": {
      "resourceId": "content:18b-t01-08-20",
      "definitionId": "content:18b-t01-08-20",
      "version": "1",
      "topicId": "T01-08",
      "status": "engineering-test",
      "compilerContract": 2,
      "choiceContract": "four-v2",
      "entry": "opening",
      "stages": [
        {
          "id": "opening",
          "pages": [
            {
              "order": 1,
              "text": "午餐時，在教學大樓走廊，學生帶自己維護的班級學科公開資料索引，想讓下一位自願者接手更新課程公告連結，不想一直被認為非他不可。",
              "speaker": null,
              "scene": "school:corridor",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "做得不錯，就永遠都得做嗎？",
              "speaker": "participant",
              "scene": "school:corridor",
              "cast": [
                {
                  "role": "participant",
                  "position": "center",
                  "expression": "calm"
                }
              ],
              "presentation": "dialogue"
            }
          ],
          "choices": [
            {
              "id": "strategy-1",
              "text": "整理能交接的操作說明",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生列出公開資料來源及步驟，不把個人帳密放進交接文件。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": []
                }
              }
            },
            {
              "id": "strategy-2",
              "text": "確認有無自願接手管道",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "教師協助擬定徵求意願方式，未指派缺席同學或保證有人接手。",
                "claims": [],
                "changes": [
                  {
                    "role": "teacher",
                    "holder": "work",
                    "code": "11-2",
                    "delta": -1
                  }
                ],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": []
                }
              }
            },
            {
              "id": "strategy-3",
              "text": "縮小本人願意繼續的範圍",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生說明可做及不再承擔部分，教師記下界線但未冒稱交接完成。",
                "claims": [],
                "changes": [
                  {
                    "role": "participant",
                    "holder": "person",
                    "code": "2-2",
                    "delta": -2
                  }
                ],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": []
                }
              }
            },
            {
              "id": "strategy-4",
              "text": "做得好也該能下班，這不是終身職",
              "kind": "action",
              "emotional": true,
              "outcome": {
                "fact": "教師以幽默肯定付出，不將休息視為破壞團隊。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": []
                }
              }
            }
          ],
          "next": null
        }
      ]
    },
    "definition": {
      "id": "content:18b-t01-08-20",
      "topicId": "T01-08",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-08-20",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "4-1",
        "2-4",
        "9-3"
      ],
      "additionalCodes": [
        "6-1",
        "9-2",
        "4-3"
      ],
      "weights": [
        0.137,
        0.136,
        0.22,
        0.169,
        0.169,
        0.169
      ],
      "directions": [
        1,
        1,
        1,
        1,
        -1,
        1
      ],
      "eligibility": {
        "people": [
          "student"
        ],
        "dayKinds": [
          "school"
        ],
        "slotIds": [
          "lunch"
        ],
        "from": null,
        "until": null,
        "facts": [],
        "history": [],
        "numeric": [],
        "enrollment": null
      },
      "repetition": {
        "cooldownDays": 30,
        "exclusionGroups": [],
        "sameFact": true,
        "reason": "在籍學生於午餐非保護時段主動提出本件具體情境；不含夏冬營及離班學生，不保證重現"
      }
    },
    "binding": {
      "sources": [
        "participant",
        "participant",
        "participant",
        "participant",
        "classroom",
        "participant"
      ],
      "valence": "neutral"
    }
  },
  {
    "story": {
      "resourceId": "content:18b-t01-08-21",
      "definitionId": "content:18b-t01-08-21",
      "version": "1",
      "topicId": "T01-08",
      "status": "engineering-test",
      "compilerContract": 2,
      "choiceContract": "four-v2",
      "entry": "opening",
      "stages": [
        {
          "id": "opening",
          "pages": [
            {
              "order": 1,
              "text": "早自習時，在導師班教室裡，學生拿成果展回饋卡，觀眾稱讚資料整理，和他原本最在意的美編不同。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "大家都沒提我畫的圖。",
              "speaker": "participant",
              "scene": "school:classroom",
              "cast": [
                {
                  "role": "participant",
                  "position": "center",
                  "expression": "surprised"
                }
              ],
              "presentation": "dialogue"
            }
          ],
          "choices": [
            {
              "id": "strategy-1",
              "text": "分開整理不同回饋",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生將資料與版面回饋分欄，未把沒被提及推定為不喜歡。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": []
                }
              }
            },
            {
              "id": "strategy-2",
              "text": "讓學生說自己最滿意的部分",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生指出繪圖設計的選擇，教師只提供個人閱讀感受。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": []
                }
              }
            },
            {
              "id": "strategy-3",
              "text": "請學生選想再追問的一點",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生擬出不帶預設的回饋問題，尚未收到觀眾新回答。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": []
                }
              }
            },
            {
              "id": "strategy-4",
              "text": "有人看到你沒預料的優點，也不會擦掉你最珍惜的部分",
              "kind": "action",
              "emotional": true,
              "outcome": {
                "fact": "教師表達欣慰，未替所有觀眾解釋沉默原因。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": []
                }
              }
            }
          ],
          "next": null
        }
      ]
    },
    "definition": {
      "id": "content:18b-t01-08-21",
      "topicId": "T01-08",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-08-21",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "4-1",
        "2-4",
        "9-3"
      ],
      "additionalCodes": [
        "4-4",
        "6-1",
        "3-1"
      ],
      "weights": [
        0.158,
        0.158,
        0.211,
        0.175,
        0.175,
        0.123
      ],
      "directions": [
        1,
        1,
        1,
        1,
        1,
        -1
      ],
      "eligibility": {
        "people": [
          "student"
        ],
        "dayKinds": [
          "school"
        ],
        "slotIds": [
          "early"
        ],
        "from": null,
        "until": null,
        "facts": [],
        "history": [],
        "numeric": [],
        "enrollment": null
      },
      "repetition": {
        "cooldownDays": 30,
        "exclusionGroups": [],
        "sameFact": true,
        "reason": "在籍學生於午餐非保護時段主動提出本件具體情境；不含夏冬營及離班學生，不保證重現"
      }
    },
    "binding": {
      "sources": [
        "participant",
        "participant",
        "participant",
        "participant",
        "participant",
        "participant"
      ],
      "valence": "neutral"
    }
  },
  {
    "story": {
      "resourceId": "content:18b-t01-08-22",
      "definitionId": "content:18b-t01-08-22",
      "version": "1",
      "topicId": "T01-08",
      "status": "engineering-test",
      "compilerContract": 2,
      "choiceContract": "four-v2",
      "entry": "opening",
      "stages": [
        {
          "id": "opening",
          "pages": [
            {
              "order": 1,
              "text": "早自習時，在導師班教室裡，學生帶三分鐘成果發表草稿，內容超時，捨不得刪掉幾個月的過程。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "每一頁都是我真的做過的。",
              "speaker": "participant",
              "scene": "school:classroom",
              "cast": [
                {
                  "role": "participant",
                  "position": "center",
                  "expression": "sad"
                }
              ],
              "presentation": "dialogue"
            }
          ],
          "choices": [
            {
              "id": "strategy-1",
              "text": "先選一個核心訊息",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生圈出最想讓聽眾帶走的結論，未抹去其他工作紀錄。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": []
                }
              }
            },
            {
              "id": "strategy-2",
              "text": "將細節移到備查附件",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "教師示範正文與附件分工，是否符合發表規則仍待承辦確認。",
                "claims": [],
                "changes": [
                  {
                    "role": "teacher",
                    "holder": "work",
                    "code": "11-2",
                    "delta": -1
                  }
                ],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": []
                }
              }
            },
            {
              "id": "strategy-3",
              "text": "做一次誠實的計時試讀",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生讀完前半段並記下時間，未加速剪接成看似三分鐘。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": []
                }
              }
            },
            {
              "id": "strategy-4",
              "text": "幾個月擠進三分鐘，像把書包塞進鉛筆盒",
              "kind": "action",
              "emotional": true,
              "outcome": {
                "fact": "教師以幽默承接不捨，沒有承諾延長全場時間。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": []
                }
              }
            }
          ],
          "next": null
        }
      ]
    },
    "definition": {
      "id": "content:18b-t01-08-22",
      "topicId": "T01-08",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-08-22",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "4-1",
        "2-4",
        "9-3"
      ],
      "additionalCodes": [
        "3-3",
        "3-1",
        "4-3"
      ],
      "weights": [
        0.25,
        0.154,
        0.154,
        0.212,
        0.115,
        0.115
      ],
      "directions": [
        1,
        1,
        1,
        -1,
        -1,
        1
      ],
      "eligibility": {
        "people": [
          "student"
        ],
        "dayKinds": [
          "school"
        ],
        "slotIds": [
          "early"
        ],
        "from": null,
        "until": null,
        "facts": [],
        "history": [],
        "numeric": [],
        "enrollment": null
      },
      "repetition": {
        "cooldownDays": 30,
        "exclusionGroups": [],
        "sameFact": true,
        "reason": "在籍學生於午餐非保護時段主動提出本件具體情境；不含夏冬營及離班學生，不保證重現"
      }
    },
    "binding": {
      "sources": [
        "participant",
        "participant",
        "participant",
        "participant",
        "participant",
        "participant"
      ],
      "valence": "neutral"
    }
  },
  {
    "story": {
      "resourceId": "content:18b-t01-08-23",
      "definitionId": "content:18b-t01-08-23",
      "version": "1",
      "topicId": "T01-08",
      "status": "engineering-test",
      "compilerContract": 2,
      "choiceContract": "four-v2",
      "entry": "opening",
      "stages": [
        {
          "id": "opening",
          "pages": [
            {
              "order": 1,
              "text": "早自習時，在導師班教室裡，學生拿研究筆記，說原本的假設沒得到支持，卻發現一個新的資料問題。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "這樣算偏題，還是可以寫進成果？",
              "speaker": "participant",
              "scene": "school:classroom",
              "cast": [
                {
                  "role": "participant",
                  "position": "center",
                  "expression": "calm"
                }
              ],
              "presentation": "dialogue"
            }
          ],
          "choices": [
            {
              "id": "strategy-1",
              "text": "分清原問題與新發現",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生在副本分列原假設及新疑問，不把新疑問寫成已驗證結論。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": []
                }
              }
            },
            {
              "id": "strategy-2",
              "text": "請科任確認任務範圍",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "教師協助擬出保留原題及補充發現的詢問，尚未取得改題許可。",
                "claims": [],
                "changes": [
                  {
                    "role": "teacher",
                    "holder": "work",
                    "code": "11-2",
                    "delta": -1
                  }
                ],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": []
                }
              }
            },
            {
              "id": "strategy-3",
              "text": "保留新方向作未來筆記",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生先記下資料來源與待查項，不宣稱已完成第二份研究。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": []
                }
              }
            },
            {
              "id": "strategy-4",
              "text": "路沒照原圖走，至少可以誠實畫出走到哪",
              "kind": "action",
              "emotional": true,
              "outcome": {
                "fact": "教師表達欣賞，不以意外發現自動豁免原作業要求。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": []
                }
              }
            }
          ],
          "next": null
        }
      ]
    },
    "definition": {
      "id": "content:18b-t01-08-23",
      "topicId": "T01-08",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-08-23",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "4-1",
        "2-4",
        "9-3"
      ],
      "additionalCodes": [
        "3-2",
        "4-3",
        "4-4"
      ],
      "weights": [
        0.308,
        0.163,
        0.163,
        0.122,
        0.122,
        0.122
      ],
      "directions": [
        1,
        1,
        1,
        -1,
        1,
        1
      ],
      "eligibility": {
        "people": [
          "student"
        ],
        "dayKinds": [
          "school"
        ],
        "slotIds": [
          "early"
        ],
        "from": null,
        "until": null,
        "facts": [],
        "history": [],
        "numeric": [],
        "enrollment": null
      },
      "repetition": {
        "cooldownDays": 30,
        "exclusionGroups": [],
        "sameFact": true,
        "reason": "在籍學生於午餐非保護時段主動提出本件具體情境；不含夏冬營及離班學生，不保證重現"
      }
    },
    "binding": {
      "sources": [
        "participant",
        "participant",
        "participant",
        "participant",
        "participant",
        "participant"
      ],
      "valence": "neutral"
    }
  }
];
