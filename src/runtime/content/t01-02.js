// Version 1 isolated authoring assets. Not a production catalogue.
// Authored text source and review provenance: work/18b-t01-02-authoring.json.
export default [
  {
    "story": {
      "resourceId": "content:18b-t01-02-01",
      "definitionId": "content:18b-t01-02-01",
      "version": "1",
      "topicId": "T01-02",
      "status": "engineering-test",
      "choiceContract": "four-v2",
      "entry": "opening",
      "stages": [
        {
          "id": "opening",
          "pages": [
            {
              "order": 1,
              "text": "早自習時，在導師班教室裡，學生交出兩次段考單，僅物理明顯下滑，其他科接近原來水準。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我是不是忽然不會念物理了？",
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
              "id": "verify",
              "text": "先對照兩次物理考試的單元及題型",
              "emotional": false,
              "kind": "action",
              "outcome": {
                "fact": "學生將兩張物理卷的單元標題並排，兩次範圍不同，不能只由分數判定能力下降。",
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
              "id": "coordinate",
              "text": "請學生自行向物理科任詢問弱點",
              "emotional": false,
              "kind": "support",
              "outcome": {
                "fact": "教師協助把一題失分轉成可問的步驟，尚未得到物理科任的判讀。",
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
                  "H04-6"
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
              "id": "observe",
              "text": "保存兩張考卷，從一類錯題觀察",
              "emotional": false,
              "kind": "defer",
              "outcome": {
                "fact": "學生在卷面副本圈出一類錯誤保留比較，沒有歸因成不用功。",
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
              "id": "empathy",
              "text": "一次考差很難受，但還不能替你判定能力",
              "emotional": true,
              "kind": "action",
              "outcome": {
                "fact": "教師承接突然下滑的難受，沒有承諾下次一定回升。",
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
      ],
      "compilerContract": 2
    },
    "definition": {
      "id": "content:18b-t01-02-01",
      "topicId": "T01-02",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-02-01",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "4-1",
        "2-2",
        "4-4"
      ],
      "additionalCodes": [
        "3-2",
        "3-4",
        "2-4"
      ],
      "weights": [
        0.276,
        0.17,
        0.17,
        0.128,
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
        "reason": "在籍學生午餐於非保護時段提出本件具體問題；不以相似分類碼推定同因果"
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
      "valence": "negative"
    }
  },
  {
    "story": {
      "resourceId": "content:18b-t01-02-02",
      "definitionId": "content:18b-t01-02-02",
      "version": "1",
      "topicId": "T01-02",
      "status": "engineering-test",
      "choiceContract": "four-v2",
      "entry": "opening",
      "stages": [
        {
          "id": "opening",
          "pages": [
            {
              "order": 1,
              "text": "午餐時，在教師辦公室，學生總分增加八分，排名卻後退兩名，把成績單摺起來。",
              "speaker": null,
              "scene": "school:teachers-office",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "大家說我退步，但我明明多拿了分數。",
              "speaker": "participant",
              "scene": "school:teachers-office",
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
              "id": "verify",
              "text": "協助分辨絕對分數與相對排名",
              "emotional": false,
              "kind": "action",
              "outcome": {
                "fact": "雙方分列本人成績及全班排名，教師只說明兩種指標可不同方向，未取得同學個別分數。",
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
              "id": "coordinate",
              "text": "請他列出本次確實進步的單元",
              "emotional": false,
              "kind": "support",
              "outcome": {
                "fact": "學生找出卷上多得分的單元，教師只肯定可由本人卷面支持的表現。",
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
              "id": "observe",
              "text": "下次再比較同類題型的答題情形",
              "emotional": false,
              "kind": "defer",
              "outcome": {
                "fact": "教師提出下次比較相近題型，不把不同次測驗當等值量尺。",
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
              "id": "empathy",
              "text": "你多拿到的分數沒有憑空消失",
              "emotional": true,
              "kind": "action",
              "outcome": {
                "fact": "教師肯定已取得的分數，不將排名後退解讀為退步人格。",
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
      ],
      "compilerContract": 2
    },
    "definition": {
      "id": "content:18b-t01-02-02",
      "topicId": "T01-02",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-02-02",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "4-1",
        "2-2",
        "4-4"
      ],
      "additionalCodes": [
        "2-4",
        "3-2",
        "3-4"
      ],
      "weights": [
        0.264,
        0.14,
        0.211,
        0.175,
        0.105,
        0.105
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
        "reason": "在籍學生午餐於非保護時段提出本件具體問題；不以相似分類碼推定同因果"
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
      "resourceId": "content:18b-t01-02-03",
      "definitionId": "content:18b-t01-02-03",
      "version": "1",
      "topicId": "T01-02",
      "status": "engineering-test",
      "choiceContract": "four-v2",
      "entry": "opening",
      "stages": [
        {
          "id": "opening",
          "pages": [
            {
              "order": 1,
              "text": "早自習時，在導師班教室裡，學生數學成績穩定，國文閱讀題反覆失分，擔心別人說他偏科。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "數學好也沒用，國文每次都拉低我。",
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
              "id": "verify",
              "text": "一起確認閱讀失分集中在哪種題型",
              "emotional": false,
              "kind": "action",
              "outcome": {
                "fact": "學生把失分閱讀題分成詞義與推論，分類仍可由國文科任確認。",
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
              "id": "coordinate",
              "text": "鼓勵他帶具體題目向國文老師請教",
              "emotional": false,
              "kind": "support",
              "outcome": {
                "fact": "學生選一題附上自己的理解供詢問，尚未取得專科回應。",
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
              "id": "observe",
              "text": "先選一篇短文練習，再記錄狀況",
              "emotional": false,
              "kind": "defer",
              "outcome": {
                "fact": "教師陪學生在短文圈出一處不明指涉，未宣告已補足閱讀弱點。",
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
              "id": "empathy",
              "text": "擅長一科不代表其他科永遠沒機會",
              "emotional": true,
              "kind": "action",
              "outcome": {
                "fact": "教師承接科目落差的不安，不保證數理強項會自動帶動語文。",
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
      ],
      "compilerContract": 2
    },
    "definition": {
      "id": "content:18b-t01-02-03",
      "topicId": "T01-02",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-02-03",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "4-1",
        "2-2",
        "4-4"
      ],
      "additionalCodes": [
        "3-2",
        "3-4",
        "2-4"
      ],
      "weights": [
        0.271,
        0.187,
        0.167,
        0.125,
        0.125,
        0.125
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
        "reason": "在籍學生午餐於非保護時段提出本件具體問題；不以相似分類碼推定同因果"
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
      "resourceId": "content:18b-t01-02-04",
      "definitionId": "content:18b-t01-02-04",
      "version": "1",
      "topicId": "T01-02",
      "status": "engineering-test",
      "choiceContract": "four-v2",
      "entry": "opening",
      "stages": [
        {
          "id": "opening",
          "pages": [
            {
              "order": 1,
              "text": "早自習時，在導師班教室裡，學生平時課堂解題流暢，考試卻連續漏看題目的限制條件。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我明明會做，考試就把字看錯。",
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
              "id": "verify",
              "text": "核對錯題的限制條件是否相似",
              "emotional": false,
              "kind": "action",
              "outcome": {
                "fact": "學生圈出兩題漏讀的條件，教師不把所有失分一律叫粗心。",
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
              "id": "coordinate",
              "text": "協助學生試做畫記關鍵字的練習",
              "emotional": false,
              "kind": "support",
              "outcome": {
                "fact": "教師示範在副本先標條件再作答，學生未因此保證考場能重現。",
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
              "id": "observe",
              "text": "留存考卷，觀察下次是否仍有同類錯誤",
              "emotional": false,
              "kind": "defer",
              "outcome": {
                "fact": "雙方保留本次卷面供自己比較，下一次失誤尚未發生。",
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
              "id": "empathy",
              "text": "會做卻失分真的特別嘔",
              "emotional": true,
              "kind": "action",
              "outcome": {
                "fact": "教師回應會做卻漏條件的懊惱，未以自責換取成績承諾。",
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
      ],
      "compilerContract": 2
    },
    "definition": {
      "id": "content:18b-t01-02-04",
      "topicId": "T01-02",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-02-04",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "4-1",
        "2-2",
        "4-4"
      ],
      "additionalCodes": [
        "3-2",
        "3-4",
        "2-4"
      ],
      "weights": [
        0.278,
        0.148,
        0.148,
        0.204,
        0.111,
        0.111
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
        "reason": "在籍學生午餐於非保護時段提出本件具體問題；不以相似分類碼推定同因果"
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
      "resourceId": "content:18b-t01-02-05",
      "definitionId": "content:18b-t01-02-05",
      "version": "1",
      "topicId": "T01-02",
      "status": "engineering-test",
      "choiceContract": "four-v2",
      "entry": "opening",
      "stages": [
        {
          "id": "opening",
          "pages": [
            {
              "order": 1,
              "text": "午餐時，在教師辦公室，學生段考拿高分，平時作業缺交多項，開始擔心學期分數。",
              "speaker": null,
              "scene": "school:teachers-office",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "光靠考試高分不能過嗎？",
              "speaker": "participant",
              "scene": "school:teachers-office",
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
              "id": "verify",
              "text": "向科任確認該科平時成績計算方式",
              "emotional": false,
              "kind": "action",
              "outcome": {
                "fact": "教師與學生整理需要詢問的評量組成，未替科任宣布平時成績比例。",
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
              "id": "coordinate",
              "text": "協助整理仍可依規定完成的項目",
              "emotional": false,
              "kind": "support",
              "outcome": {
                "fact": "學生列出尚缺項及已知補交規則，未保證全部仍可補交或恢復分數。",
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
              "id": "observe",
              "text": "請學生查閱原訂評量公告",
              "emotional": false,
              "kind": "defer",
              "outcome": {
                "fact": "雙方查找學生可取得的公告，找不到的權重標為待確認。",
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
              "id": "empathy",
              "text": "先弄清規則，不必現在自己嚇自己",
              "emotional": true,
              "kind": "action",
              "outcome": {
                "fact": "教師接住不安並提醒先核對規則，沒有保證總成績一定及格。",
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
      ],
      "compilerContract": 2
    },
    "definition": {
      "id": "content:18b-t01-02-05",
      "topicId": "T01-02",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-02-05",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "4-1",
        "2-2",
        "4-4"
      ],
      "additionalCodes": [
        "1-1",
        "3-2",
        "3-4"
      ],
      "weights": [
        0.273,
        0.164,
        0.145,
        0.2,
        0.109,
        0.109
      ],
      "directions": [
        1,
        1,
        1,
        -1,
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
        "reason": "在籍學生午餐於非保護時段提出本件具體問題；不以相似分類碼推定同因果"
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
      "valence": "negative"
    }
  },
  {
    "story": {
      "resourceId": "content:18b-t01-02-06",
      "definitionId": "content:18b-t01-02-06",
      "version": "1",
      "topicId": "T01-02",
      "status": "engineering-test",
      "choiceContract": "four-v2",
      "entry": "opening",
      "stages": [
        {
          "id": "opening",
          "pages": [
            {
              "order": 1,
              "text": "午休時，在教師辦公室，學生拿著補習班測驗成績與學校段考單，兩者顯示的程度截然不同。",
              "speaker": null,
              "scene": "school:teachers-office",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我到底該相信哪一邊？",
              "speaker": "participant",
              "scene": "school:teachers-office",
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
              "id": "verify",
              "text": "確認兩項測驗的範圍與難度",
              "emotional": false,
              "kind": "action",
              "outcome": {
                "fact": "雙方並列兩份測驗的範圍與題數，不直接將補習班高分換算校內應得分。",
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
              "id": "coordinate",
              "text": "請科任協助辨認實際弱項",
              "emotional": false,
              "kind": "support",
              "outcome": {
                "fact": "學生挑出校內失分的題型供任課判讀，尚未得到弱點分析。",
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
              "id": "observe",
              "text": "保留卷面錯題，不直接換算分數",
              "emotional": false,
              "kind": "defer",
              "outcome": {
                "fact": "學生保留自己的兩張卷，不收集別人的補習成績作排名。",
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
              "id": "empathy",
              "text": "兩份不同的考試不一定能硬比",
              "emotional": true,
              "kind": "action",
              "outcome": {
                "fact": "教師回應分數落差的困惑，未以任一測驗否定另一種學習。",
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
      ],
      "compilerContract": 2
    },
    "definition": {
      "id": "content:18b-t01-02-06",
      "topicId": "T01-02",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-02-06",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "4-1",
        "2-2",
        "4-4"
      ],
      "additionalCodes": [
        "3-2",
        "3-4",
        "2-4"
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
        "reason": "在籍學生午餐於非保護時段提出本件具體問題；不以相似分類碼推定同因果"
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
      "resourceId": "content:18b-t01-02-07",
      "definitionId": "content:18b-t01-02-07",
      "version": "1",
      "topicId": "T01-02",
      "status": "engineering-test",
      "choiceContract": "four-v2",
      "entry": "opening",
      "stages": [
        {
          "id": "opening",
          "pages": [
            {
              "order": 1,
              "text": "午餐時，在校園談話角落，學生閱讀成績持平，英聽卻突然下滑，回憶當天音量偏小。",
              "speaker": null,
              "scene": "school:counselling-corner",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "那天教室好像聽不清楚。",
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
              "id": "verify",
              "text": "先確認當時是否有設備異常紀錄",
              "emotional": false,
              "kind": "action",
              "outcome": {
                "fact": "教師詢問學生當時可觀察的聲音狀況及有無反映，設備異常仍未證實。",
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
              "id": "coordinate",
              "text": "請英文科任依校內程序核對",
              "emotional": false,
              "kind": "support",
              "outcome": {
                "fact": "學生把具體聽不清的時點整理成詢問，是否查核及評分由英文科任依程序處理。",
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
              "id": "observe",
              "text": "暫不承諾改分，整理具體情況",
              "emotional": false,
              "kind": "defer",
              "outcome": {
                "fact": "教師陪學生寫出個人座位與自述影響，不把紀錄當成設備故障的證明。",
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
              "id": "empathy",
              "text": "如果真的聽不清楚，值得把情況說清楚",
              "emotional": true,
              "kind": "action",
              "outcome": {
                "fact": "教師承認值得反映的疑問，沒有承諾補考或改分。",
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
      ],
      "compilerContract": 2
    },
    "definition": {
      "id": "content:18b-t01-02-07",
      "topicId": "T01-02",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-02-07",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "4-1",
        "2-2",
        "4-4"
      ],
      "additionalCodes": [
        "3-2",
        "3-4",
        "2-4"
      ],
      "weights": [
        0.196,
        0.174,
        0.174,
        0.196,
        0.13,
        0.13
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
        "reason": "在籍學生午餐於非保護時段提出本件具體問題；不以相似分類碼推定同因果"
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
      "valence": "negative"
    }
  },
  {
    "story": {
      "resourceId": "content:18b-t01-02-08",
      "definitionId": "content:18b-t01-02-08",
      "version": "1",
      "topicId": "T01-02",
      "status": "engineering-test",
      "choiceContract": "four-v2",
      "entry": "opening",
      "stages": [
        {
          "id": "opening",
          "pages": [
            {
              "order": 1,
              "text": "午餐時，在校園談話角落，學生注意到同年級不同班的一科平均分落差，懷疑各班程度或評量不同。",
              "speaker": null,
              "scene": "school:counselling-corner",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我們班是不是比較吃虧？",
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
              "id": "verify",
              "text": "確認是否為相同考卷與計分方式",
              "emotional": false,
              "kind": "action",
              "outcome": {
                "fact": "學生與教師分列目前知道的試卷及計分資訊，未知班級條件保留空白。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我們班是不是比較吃虧？",
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
              "id": "coordinate",
              "text": "引導學生就已知資訊向科任詢問",
              "emotional": false,
              "kind": "support",
              "outcome": {
                "fact": "教師協助擬出只詢問共同標準的問題，未要求取得別班個別成績。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我們班是不是比較吃虧？",
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
                  "H04-6"
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
              "id": "observe",
              "text": "在查證前不轉傳對其他班的猜測",
              "emotional": false,
              "kind": "defer",
              "outcome": {
                "fact": "學生決定不再轉貼未查證的班級比較，教師未代為刪除他人訊息。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我們班是不是比較吃虧？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
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
              "id": "empathy",
              "text": "你會在意公平很正常，先別急著下結論",
              "emotional": true,
              "kind": "action",
              "outcome": {
                "fact": "教師肯定重視公平，未認定別班得到不當優待。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我們班是不是比較吃虧？",
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
      ],
      "compilerContract": 2
    },
    "definition": {
      "id": "content:18b-t01-02-08",
      "topicId": "T01-02",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-02-08",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "4-1",
        "2-2",
        "4-4"
      ],
      "additionalCodes": [
        "3-2",
        "3-4",
        "2-4"
      ],
      "weights": [
        0.226,
        0.163,
        0.163,
        0.204,
        0.122,
        0.122
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
        "reason": "在籍學生午餐於非保護時段提出本件具體問題；不以相似分類碼推定同因果"
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
      "resourceId": "content:18b-t01-02-09",
      "definitionId": "content:18b-t01-02-09",
      "version": "1",
      "topicId": "T01-02",
      "status": "engineering-test",
      "choiceContract": "four-v2",
      "entry": "opening",
      "stages": [
        {
          "id": "opening",
          "pages": [
            {
              "order": 1,
              "text": "早自習時，學生帶著考卷走向導師，這次從不及格進步到七十分，卻一直看著自己原本畫圈的八十分目標。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我知道有進步。可是還差十分，回家不知道要怎麼講。",
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
            },
            {
              "order": 3,
              "text": "卷面能證明分數上升，卻不能替學生決定應該開心或失望，更無法預測家人反應。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            }
          ],
          "choices": [
            {
              "id": "verify",
              "text": "讓學生說出進步和失望各是什麼",
              "emotional": false,
              "kind": "action",
              "outcome": {
                "fact": "學生承認自己有進步，也仍然不滿意差了十分；教師不要求只保留一種情緒。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我擔心家人只看見還差十分。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
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
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面向導師說明自己目前的顧慮與想法。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "對照兩份考卷，找出真正改善的題型",
              "emotional": false,
              "kind": "support",
              "outcome": {
                "fact": "學生指出一種本次較能掌握的題型，並保留仍不懂的部分，沒有宣稱整科能力已穩定。",
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
              }
            },
            {
              "id": "observe",
              "text": "讓學生自己決定如何向家人談這次分數",
              "emotional": false,
              "kind": "defer",
              "outcome": {
                "fact": "學生整理本次分數變化與接下來想做的事；要不要向家人說仍由學生決定。",
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
                  "weight": 2.1,
                  "outcome": {
                    "fact": "學生自行整理出一段能向家人說明進步與仍不滿意的話，但尚未實際告知家人。",
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
                  "modifiers": [
                    {
                      "role": "participant",
                      "holder": "person",
                      "code": "4-1",
                      "influence": 0.9
                    }
                  ]
                },
                {
                  "id": "hesitates",
                  "weight": 2.7,
                  "outcome": {
                    "fact": "學生決定暫不向家人主動談分數，先保留自己的失望與擔憂。",
                    "claims": [
                      {
                        "role": "participant",
                        "statement": "我怕家人只問為什麼還差十分。",
                        "belief": "believed",
                        "visible": false
                      }
                    ],
                    "changes": [
                      {
                        "role": "participant",
                        "holder": "person",
                        "code": "2-2",
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
                      "code": "2-2",
                      "influence": 1.25
                    }
                  ]
                }
              ]
            },
            {
              "id": "empathy",
              "text": "七十分不是被那句「差十分」吃掉就不算數",
              "emotional": true,
              "kind": "action",
              "outcome": {
                "fact": "教師肯定已確定的成長，也允許學生此刻仍然感到不甘心。",
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
              }
            }
          ],
          "next": null
        }
      ],
      "compilerContract": 2
    },
    "definition": {
      "id": "content:18b-t01-02-09",
      "topicId": "T01-02",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-02-09",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "4-1",
        "2-2",
        "4-4"
      ],
      "additionalCodes": [
        "2-4",
        "7-1",
        "3-4"
      ],
      "weights": [
        0.23,
        0.23,
        0.19,
        0.17,
        0.1,
        0.08
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
        "reason": "在籍學生於指定合法非保護時段提出本件情境；後續須保留原事件因果，不以相同分類碼推定為同件。"
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
      "resourceId": "content:18b-t01-02-10",
      "definitionId": "content:18b-t01-02-10",
      "version": "1",
      "topicId": "T01-02",
      "status": "engineering-test",
      "choiceContract": "four-v2",
      "entry": "opening",
      "stages": [
        {
          "id": "opening",
          "pages": [
            {
              "order": 1,
              "text": "午餐時，在教師辦公室，學生原本最喜歡化學，這次段考卻考得最差，因此不再想參加相關社團。",
              "speaker": null,
              "scene": "school:teachers-office",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "喜歡又考不好，是不是很丟臉？",
              "speaker": "participant",
              "scene": "school:teachers-office",
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
              "id": "verify",
              "text": "先釐清喜歡科目的原因與考試表現差別",
              "emotional": false,
              "kind": "action",
              "outcome": {
                "fact": "學生說喜歡的是動手探究而非限時題，教師不以低分宣判興趣不真實。",
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
              "id": "coordinate",
              "text": "鼓勵向科任詢問目前單元困難",
              "emotional": false,
              "kind": "support",
              "outcome": {
                "fact": "教師協助挑出目前單元的具體卡點供科任回應，未決定退出活動。",
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
                  "H04-6"
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
              "id": "observe",
              "text": "暫時不替學生決定社團去留",
              "emotional": false,
              "kind": "defer",
              "outcome": {
                "fact": "學生暫不決定社團去留，教師未替家長或社團改變安排。",
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
              "id": "empathy",
              "text": "興趣不必每次都靠分數證明",
              "emotional": true,
              "kind": "action",
              "outcome": {
                "fact": "教師支持保留興趣與面對弱點可以並行，沒有保證分數不影響任何資格。",
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
      ],
      "compilerContract": 2
    },
    "definition": {
      "id": "content:18b-t01-02-10",
      "topicId": "T01-02",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-02-10",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "4-1",
        "2-2",
        "4-4"
      ],
      "additionalCodes": [
        "2-4",
        "3-2",
        "3-4"
      ],
      "weights": [
        0.24,
        0.16,
        0.16,
        0.2,
        0.12,
        0.12
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
        "reason": "在籍學生午餐於非保護時段提出本件具體問題；不以相似分類碼推定同因果"
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
      "resourceId": "content:18b-t01-02-11",
      "definitionId": "content:18b-t01-02-11",
      "version": "1",
      "topicId": "T01-02",
      "status": "engineering-test",
      "choiceContract": "four-v2",
      "entry": "opening",
      "stages": [
        {
          "id": "opening",
          "pages": [
            {
              "order": 1,
              "text": "早自習時，在導師班教室裡，學生回家訂正能完整解題，考場卻做不完，兩種表現差很多。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "回家我都會，考試時間就不夠。",
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
              "id": "verify",
              "text": "比較考場與訂正時的用時條件",
              "emotional": false,
              "kind": "action",
              "outcome": {
                "fact": "學生說訂正可慢慢查資料；雙方分開記下考場及訂正的條件，未推出唯一失分原因。",
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
              "id": "coordinate",
              "text": "建議向科任請教限時解題的取捨",
              "emotional": false,
              "kind": "support",
              "outcome": {
                "fact": "學生整理希望請教的限時取捨問題，尚未取得科任策略。",
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
              "id": "observe",
              "text": "先記錄練習用時，避免空猜原因",
              "emotional": false,
              "kind": "defer",
              "outcome": {
                "fact": "教師示範只記單題用時與卡點，不以速度替學習貼標籤。",
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
              "id": "empathy",
              "text": "可以慢慢做對也是一種能力",
              "emotional": true,
              "kind": "action",
              "outcome": {
                "fact": "教師肯定可在較多支持下做對，未當作正式原分數應更改的證據。",
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
      ],
      "compilerContract": 2
    },
    "definition": {
      "id": "content:18b-t01-02-11",
      "topicId": "T01-02",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-02-11",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "4-1",
        "2-2",
        "4-4"
      ],
      "additionalCodes": [
        "3-3",
        "3-2",
        "3-4"
      ],
      "weights": [
        0.283,
        0.151,
        0.151,
        0.189,
        0.113,
        0.113
      ],
      "directions": [
        1,
        1,
        1,
        -1,
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
        "reason": "在籍學生午餐於非保護時段提出本件具體問題；不以相似分類碼推定同因果"
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
      "resourceId": "content:18b-t01-02-12",
      "definitionId": "content:18b-t01-02-12",
      "version": "1",
      "topicId": "T01-02",
      "status": "engineering-test",
      "choiceContract": "four-v2",
      "entry": "opening",
      "stages": [
        {
          "id": "opening",
          "pages": [
            {
              "order": 1,
              "text": "早自習時，在導師班教室裡，學生數學代數部分很好，幾何題卻大量空白，總分掩蓋了分布。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我到底算數學好還是不好？",
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
              "id": "verify",
              "text": "將代數與幾何的實際表現分開看",
              "emotional": false,
              "kind": "action",
              "outcome": {
                "fact": "學生把本人代數與幾何的錯題分欄，未用整科總分掩蓋差異。",
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
              "id": "coordinate",
              "text": "請學生帶幾何錯題向科任請教",
              "emotional": false,
              "kind": "support",
              "outcome": {
                "fact": "學生選一題幾何圖形供專科詢問，教師不自行判定幾何能力不足。",
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
              "id": "observe",
              "text": "先記錄一週幾何練習的障礙",
              "emotional": false,
              "kind": "defer",
              "outcome": {
                "fact": "雙方規劃記錄幾何練習時卡住的步驟，尚無一週觀察結果。",
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
              "id": "empathy",
              "text": "不用用一個數字替整科下判決",
              "emotional": true,
              "kind": "action",
              "outcome": {
                "fact": "教師提醒總分不是所有單元的判決，未保證分欄就會改善成績。",
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
      ],
      "compilerContract": 2
    },
    "definition": {
      "id": "content:18b-t01-02-12",
      "topicId": "T01-02",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-02-12",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "4-1",
        "2-2",
        "4-4"
      ],
      "additionalCodes": [
        "3-2",
        "3-4",
        "2-4"
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
        "reason": "在籍學生午餐於非保護時段提出本件具體問題；不以相似分類碼推定同因果"
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
      "resourceId": "content:18b-t01-02-13",
      "definitionId": "content:18b-t01-02-13",
      "version": "1",
      "topicId": "T01-02",
      "status": "engineering-test",
      "choiceContract": "four-v2",
      "entry": "opening",
      "stages": [
        {
          "id": "opening",
          "pages": [
            {
              "order": 1,
              "text": "午餐時，在教師辦公室，學生連續計算幾種學期平均分情境，認為一科低分會使其他努力沒有意義。",
              "speaker": null,
              "scene": "school:teachers-office",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "其他科再高也救不回來吧？",
              "speaker": "participant",
              "scene": "school:teachers-office",
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
              "id": "verify",
              "text": "核對學校實際成績計算與學分規定",
              "emotional": false,
              "kind": "action",
              "outcome": {
                "fact": "教師協助查學生可取得的成績計算說明，未知學分處理仍待教務確認。",
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
              "id": "coordinate",
              "text": "鼓勵各科分別確認可改善的評量項目",
              "emotional": false,
              "kind": "support",
              "outcome": {
                "fact": "學生列出各科待詢問的評量項目，未把所有老師視為已同意補救。",
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
              "id": "observe",
              "text": "暫停猜測，用正式成績再檢視",
              "emotional": false,
              "kind": "defer",
              "outcome": {
                "fact": "教師陪學生停止用猜測數字反覆試算，保留正式資料更新後再看。",
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
              "id": "empathy",
              "text": "算一整晚也不能讓分數自己改變",
              "emotional": true,
              "kind": "action",
              "outcome": {
                "fact": "教師承接反覆計算的焦慮，未保證總平均或畢業資格安全。",
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
      ],
      "compilerContract": 2
    },
    "definition": {
      "id": "content:18b-t01-02-13",
      "topicId": "T01-02",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-02-13",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "4-1",
        "2-2",
        "4-4"
      ],
      "additionalCodes": [
        "4-2",
        "3-2",
        "3-4"
      ],
      "weights": [
        0.16,
        0.24,
        0.16,
        0.2,
        0.12,
        0.12
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
        "reason": "在籍學生午餐於非保護時段提出本件具體問題；不以相似分類碼推定同因果"
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
      "valence": "negative"
    }
  },
  {
    "story": {
      "resourceId": "content:18b-t01-02-14",
      "definitionId": "content:18b-t01-02-14",
      "version": "1",
      "topicId": "T01-02",
      "status": "engineering-test",
      "choiceContract": "four-v2",
      "entry": "opening",
      "stages": [
        {
          "id": "opening",
          "pages": [
            {
              "order": 1,
              "text": "午休時，在教師辦公室，學生說家長每次都問名次，不太看各科進步，自己因此忽略考卷內容。",
              "speaker": null,
              "scene": "school:teachers-office",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "他們根本不在意我哪一科變好了。",
              "speaker": "participant",
              "scene": "school:teachers-office",
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
              "id": "verify",
              "text": "先了解學生希望家長看見的部分",
              "emotional": false,
              "kind": "action",
              "outcome": {
                "fact": "學生說希望被看見有多做練習，教師未推定家長只重視名次的動機。",
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
              "id": "coordinate",
              "text": "協助整理可與家長分享的學習證據",
              "emotional": false,
              "kind": "support",
              "outcome": {
                "fact": "學生從自己的資料選出可分享的前後差異，未提供他人分數。",
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
                  "weight": 2,
                  "modifiers": [
                    {
                      "role": "participant",
                      "holder": "person",
                      "code": "3-1",
                      "influence": 0.8
                    }
                  ],
                  "outcome": {
                    "fact": "學生整理了自己的進步證據，願意自行向家長分享其中一項，還沒有得到家長反應。",
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
                  "id": "not-yet-ready",
                  "weight": 2.6,
                  "modifiers": [
                    {
                      "role": "participant",
                      "holder": "person",
                      "code": "2-2",
                      "influence": 1.1
                    }
                  ],
                  "outcome": {
                    "fact": "學生已整理進步證據，卻仍不願向家長提出，先保留作為自己的紀錄。",
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
              "id": "observe",
              "text": "由學生決定是否需要導師協助溝通",
              "emotional": false,
              "kind": "defer",
              "outcome": {
                "fact": "教師先詢問是否需要協助及可分享範圍，沒有自動聯絡家長。",
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
              "id": "empathy",
              "text": "你的進步不只印在排名那一欄",
              "emotional": true,
              "kind": "action",
              "outcome": {
                "fact": "教師肯定已提供的學習證據，不承諾家長會改變評價。",
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
      ],
      "compilerContract": 2
    },
    "definition": {
      "id": "content:18b-t01-02-14",
      "topicId": "T01-02",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-02-14",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "4-1",
        "2-2",
        "4-4"
      ],
      "additionalCodes": [
        "4-3",
        "7-1",
        "6-1"
      ],
      "weights": [
        0.196,
        0.121,
        0.197,
        0.167,
        0.167,
        0.152
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
        "reason": "在籍學生午餐於非保護時段提出本件具體問題；不以相似分類碼推定同因果"
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
      "resourceId": "content:18b-t01-02-15",
      "definitionId": "content:18b-t01-02-15",
      "version": "1",
      "topicId": "T01-02",
      "status": "engineering-test",
      "choiceContract": "four-v2",
      "entry": "opening",
      "stages": [
        {
          "id": "opening",
          "pages": [
            {
              "order": 1,
              "text": "午餐時，在教學大樓走廊，學生認為換到窗邊座位後注意力變差，因此將這次成績下跌全部歸因於座位。",
              "speaker": null,
              "scene": "school:corridor",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "坐這裡一定害我考差。",
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
              "id": "verify",
              "text": "詢問是否有其他同時改變的學習情況",
              "emotional": false,
              "kind": "action",
              "outcome": {
                "fact": "學生列出換位同期也有新單元及作息變化，教師不把座位與下降直接畫因果線。",
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
              "id": "coordinate",
              "text": "評估教室環境是否有明確干擾",
              "emotional": false,
              "kind": "support",
              "outcome": {
                "fact": "教師詢問實際看不清或噪音情況，尚未決定換位或判定視力問題。",
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
              "id": "observe",
              "text": "先觀察幾天而非直接認定因果",
              "emotional": false,
              "kind": "defer",
              "outcome": {
                "fact": "雙方提出短期記錄座位干擾的方式，不用未完成觀察推定根因。",
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
              "id": "empathy",
              "text": "如果坐著不舒服，我們可以查清楚",
              "emotional": true,
              "kind": "action",
              "outcome": {
                "fact": "教師表達願意查明不適，沒有保證換位後分數就回來。",
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
      ],
      "compilerContract": 2
    },
    "definition": {
      "id": "content:18b-t01-02-15",
      "topicId": "T01-02",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-02-15",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "4-1",
        "2-2",
        "4-4"
      ],
      "additionalCodes": [
        "3-4",
        "3-2",
        "2-4"
      ],
      "weights": [
        0.278,
        0.148,
        0.148,
        0.204,
        0.111,
        0.111
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
        "reason": "在籍學生午餐於非保護時段提出本件具體問題；不以相似分類碼推定同因果"
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
      "resourceId": "content:18b-t01-02-16",
      "definitionId": "content:18b-t01-02-16",
      "version": "1",
      "topicId": "T01-02",
      "status": "engineering-test",
      "choiceContract": "four-v2",
      "entry": "opening",
      "stages": [
        {
          "id": "opening",
          "pages": [
            {
              "order": 1,
              "text": "午餐時，在教師辦公室，學生交來考卷，表示自己平時有複習，但題目比講義複雜很多。",
              "speaker": null,
              "scene": "school:teachers-office",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "這哪是我們平常練的難度？",
              "speaker": "participant",
              "scene": "school:teachers-office",
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
              "id": "verify",
              "text": "確認學生認為不同的題型與具體位置",
              "emotional": false,
              "kind": "action",
              "outcome": {
                "fact": "學生指出認為陌生的一題並說明與練習的差別，教師未以主觀覺得難判定超綱。",
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
              "id": "coordinate",
              "text": "鼓勵向該科科任討論評量範圍",
              "emotional": false,
              "kind": "support",
              "outcome": {
                "fact": "學生擬出對評量範圍的具體詢問，正式解釋仍待任課。",
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
              "id": "observe",
              "text": "先記錄具體題目，不替科任定調",
              "emotional": false,
              "kind": "defer",
              "outcome": {
                "fact": "教師陪學生保留題目及疑問，不收集全班抱怨當命題不當的證據。",
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
              "id": "empathy",
              "text": "考完覺得難，至少要能把問題講清楚",
              "emotional": true,
              "kind": "action",
              "outcome": {
                "fact": "教師回應失望並支持提出可核對的問題，未替科任道歉或宣布重考。",
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
      ],
      "compilerContract": 2
    },
    "definition": {
      "id": "content:18b-t01-02-16",
      "topicId": "T01-02",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-02-16",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "4-1",
        "2-2",
        "4-4"
      ],
      "additionalCodes": [
        "10-4",
        "3-2",
        "3-4"
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
        "reason": "在籍學生午餐於非保護時段提出本件具體問題；不以相似分類碼推定同因果"
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
      "valence": "neutral"
    }
  },
  {
    "story": {
      "resourceId": "content:18b-t01-02-17",
      "definitionId": "content:18b-t01-02-17",
      "version": "1",
      "topicId": "T01-02",
      "status": "engineering-test",
      "choiceContract": "four-v2",
      "entry": "opening",
      "stages": [
        {
          "id": "opening",
          "pages": [
            {
              "order": 1,
              "text": "午休時，在教師辦公室，學生因合法請假缺了幾堂課，這次考試剛好在相關單元失分。",
              "speaker": null,
              "scene": "school:teachers-office",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我那幾天沒上到，之後就一直跟不上。",
              "speaker": "participant",
              "scene": "school:teachers-office",
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
              "id": "verify",
              "text": "確認缺課內容與現有學習缺口",
              "emotional": false,
              "kind": "action",
              "outcome": {
                "fact": "雙方依出缺課期間列出可能漏學單元，仍需課程資料確認實際缺口。",
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
              "id": "coordinate",
              "text": "協助學生取得合法補課資源及科任指引",
              "emotional": false,
              "kind": "support",
              "outcome": {
                "fact": "教師協助查可用教材與詢問管道，未將拿到資源當成已補完。",
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
                  "H04-6"
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
              "id": "observe",
              "text": "先列出未補齊的課程再追蹤",
              "emotional": false,
              "kind": "defer",
              "outcome": {
                "fact": "學生列出尚未取得的課程內容作待辦，不填成已完成。",
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
              "id": "empathy",
              "text": "缺了幾堂就追得辛苦，確實不容易",
              "emotional": true,
              "kind": "action",
              "outcome": {
                "fact": "教師承接追進度的不易，未把缺課等同不願學習或承諾減免評量。",
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
      ],
      "compilerContract": 2
    },
    "definition": {
      "id": "content:18b-t01-02-17",
      "topicId": "T01-02",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-02-17",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "4-1",
        "2-2",
        "4-4"
      ],
      "additionalCodes": [
        "3-2",
        "3-4",
        "2-4"
      ],
      "weights": [
        0.276,
        0.17,
        0.17,
        0.128,
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
        "reason": "在籍學生午餐於非保護時段提出本件具體問題；不以相似分類碼推定同因果"
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
      "valence": "negative"
    }
  },
  {
    "story": {
      "resourceId": "content:18b-t01-02-18",
      "definitionId": "content:18b-t01-02-18",
      "version": "1",
      "topicId": "T01-02",
      "status": "engineering-test",
      "choiceContract": "four-v2",
      "entry": "opening",
      "stages": [
        {
          "id": "opening",
          "pages": [
            {
              "order": 1,
              "text": "早自習時，在導師班教室裡，學生小考常不理想，段考卻明顯進步，不確定自己的學習策略是否真的有效。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "到底是我進步，還是這次剛好猜對？",
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
              "id": "verify",
              "text": "比較兩類測驗的題型與作答證據",
              "emotional": false,
              "kind": "action",
              "outcome": {
                "fact": "學生將小考與段考題型並列，雙方不因一次翻身判定能力從此穩定。",
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
              "id": "coordinate",
              "text": "引導他說出本次使用的有效方法",
              "emotional": false,
              "kind": "support",
              "outcome": {
                "fact": "學生說這次有做限時練習，教師將其保留為本人策略自述而非驗證因果。",
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
              "id": "observe",
              "text": "持續觀察後續評量，不先保證穩定",
              "emotional": false,
              "kind": "defer",
              "outcome": {
                "fact": "教師建議保留本次卷供後續觀察，不保證未來分數相同。",
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
              "id": "empathy",
              "text": "考得好可以高興，也可以繼續求證",
              "emotional": true,
              "kind": "action",
              "outcome": {
                "fact": "教師與學生分享本次成功的喜悅，同時不追加連續高分要求。",
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
      ],
      "compilerContract": 2
    },
    "definition": {
      "id": "content:18b-t01-02-18",
      "topicId": "T01-02",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-02-18",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "4-1",
        "2-2",
        "4-4"
      ],
      "additionalCodes": [
        "2-4",
        "3-2",
        "3-4"
      ],
      "weights": [
        0.278,
        0.148,
        0.148,
        0.185,
        0.13,
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
        "reason": "在籍學生午餐於非保護時段提出本件具體問題；不以相似分類碼推定同因果"
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
      "resourceId": "content:18b-t01-02-19",
      "definitionId": "content:18b-t01-02-19",
      "version": "1",
      "topicId": "T01-02",
      "status": "engineering-test",
      "choiceContract": "four-v2",
      "entry": "opening",
      "stages": [
        {
          "id": "opening",
          "pages": [
            {
              "order": 1,
              "text": "午餐時，在校園談話角落，學生說自己的分數被同學知道後，很怕到辦公室詢問科任而被議論。",
              "speaker": null,
              "scene": "school:counselling-corner",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我現在去問，大家會不會覺得我很笨？",
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
            },
            {
              "order": 3,
              "text": "在繼續談話前，你先確認學生當下是否被逼問或受威脅，提醒不再擴散可辨識資料，說明可用的支持與正式反映管道；若需必要處理，會只分享最小資訊並說明保密界線，不以學生是否選擇某策略取代責任。",
              "speaker": null,
              "scene": "school:counselling-corner",
              "cast": [],
              "presentation": "narration"
            }
          ],
          "choices": [
            {
              "id": "verify",
              "text": "了解分數是如何被得知及學生顧慮",
              "emotional": false,
              "kind": "action",
              "outcome": {
                "fact": "學生描述分數被看見的途徑，教師只記本人所知，不再擴散；必要保護與正式反映不以選項決定。",
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
              "id": "coordinate",
              "text": "協助安排較不受干擾的提問方式",
              "emotional": false,
              "kind": "support",
              "outcome": {
                "fact": "教師協助擬出私下或書面提問的方式，尚未取得任課時間。",
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
                  "H04-6"
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
              "id": "observe",
              "text": "尊重學生意願，暫不公開相關情況",
              "emotional": false,
              "kind": "defer",
              "outcome": {
                "fact": "學生表示目前不想再公開談此事，教師尊重並說明必要處理的保密界線。",
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
              "id": "empathy",
              "text": "成績是你的，不需要拿來給全班評論",
              "emotional": true,
              "kind": "action",
              "outcome": {
                "fact": "教師承接被比較的壓力，未宣稱其他同學已停止評論。",
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
      ],
      "compilerContract": 2
    },
    "definition": {
      "id": "content:18b-t01-02-19",
      "topicId": "T01-02",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-02-19",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "4-1",
        "2-2",
        "4-4"
      ],
      "additionalCodes": [
        "3-1",
        "8-4",
        "3-2"
      ],
      "weights": [
        0.21,
        0.21,
        0.145,
        0.177,
        0.161,
        0.097
      ],
      "directions": [
        1,
        1,
        1,
        -1,
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
        "reason": "在籍學生午餐於非保護時段提出本件具體問題；不以相似分類碼推定同因果"
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
      "valence": "negative"
    }
  },
  {
    "story": {
      "resourceId": "content:18b-t01-02-20",
      "definitionId": "content:18b-t01-02-20",
      "version": "1",
      "topicId": "T01-02",
      "status": "engineering-test",
      "choiceContract": "four-v2",
      "entry": "opening",
      "stages": [
        {
          "id": "opening",
          "pages": [
            {
              "order": 1,
              "text": "早自習時，在導師班教室裡，學生常參與討論，評量分數卻不佳，因而懷疑參與課堂沒有價值。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我那麼常舉手，還不是考差。",
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
              "id": "verify",
              "text": "區分課堂表達與書面解題能力",
              "emotional": false,
              "kind": "action",
              "outcome": {
                "fact": "雙方分開看學生提供的口頭參與及書面作答，不用其中一種代替全部理解。",
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
              "id": "coordinate",
              "text": "協助找出可把口語理解轉成書面答案的方法",
              "emotional": false,
              "kind": "support",
              "outcome": {
                "fact": "學生用自己的話先口述再試寫一小段，教師未替科任判定得分。",
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
              "id": "observe",
              "text": "先向科任確認評量要求",
              "emotional": false,
              "kind": "defer",
              "outcome": {
                "fact": "學生整理想知道的書面要求，尚未獲任課說明。",
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
              "id": "empathy",
              "text": "願意發言是優點，筆試也可以另外練",
              "emotional": true,
              "kind": "action",
              "outcome": {
                "fact": "教師肯定願意發言，沒有因此推定筆試低分必是評量不公。",
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
      ],
      "compilerContract": 2
    },
    "definition": {
      "id": "content:18b-t01-02-20",
      "topicId": "T01-02",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-02-20",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "4-1",
        "2-2",
        "4-4"
      ],
      "additionalCodes": [
        "3-1",
        "6-1",
        "3-2"
      ],
      "weights": [
        0.251,
        0.133,
        0.133,
        0.183,
        0.183,
        0.117
      ],
      "directions": [
        1,
        1,
        1,
        -1,
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
        "reason": "在籍學生午餐於非保護時段提出本件具體問題；不以相似分類碼推定同因果"
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
      "resourceId": "content:18b-t01-02-21",
      "definitionId": "content:18b-t01-02-21",
      "version": "1",
      "topicId": "T01-02",
      "status": "engineering-test",
      "choiceContract": "four-v2",
      "entry": "opening",
      "stages": [
        {
          "id": "opening",
          "pages": [
            {
              "order": 1,
              "text": "早自習時，在導師班教室裡，學生發現上次訂正過的公式應用題這次再次失分，非常失望。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "同樣的錯還犯第二次，我是不是沒救了？",
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
              "id": "verify",
              "text": "分析兩次錯誤是否真出自相同原因",
              "emotional": false,
              "kind": "action",
              "outcome": {
                "fact": "學生對照兩題自己的推理，發現停點未必相同，教師不由題型相同推論錯因相同。",
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
              "id": "coordinate",
              "text": "協助學生設計辨認題型的提示",
              "emotional": false,
              "kind": "support",
              "outcome": {
                "fact": "雙方在副本寫下辨認條件的提示，學生尚未驗證在新題有效。",
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
              "id": "observe",
              "text": "保留錯題紀錄，下一次再核對",
              "emotional": false,
              "kind": "defer",
              "outcome": {
                "fact": "學生保存兩次錯題及當時想法，不把第三次還沒發生的結果寫入歷史。",
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
              "id": "empathy",
              "text": "同類題再錯很煩，但也是線索",
              "emotional": true,
              "kind": "action",
              "outcome": {
                "fact": "教師接住重犯的煩躁，提醒紀錄可以提供線索，未保證下次不再錯。",
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
      ],
      "compilerContract": 2
    },
    "definition": {
      "id": "content:18b-t01-02-21",
      "topicId": "T01-02",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-02-21",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "4-1",
        "2-2",
        "4-4"
      ],
      "additionalCodes": [
        "3-2",
        "3-4",
        "2-4"
      ],
      "weights": [
        0.185,
        0.209,
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
        "reason": "在籍學生午餐於非保護時段提出本件具體問題；不以相似分類碼推定同因果"
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
      "resourceId": "content:18b-t01-02-22",
      "definitionId": "content:18b-t01-02-22",
      "version": "1",
      "topicId": "T01-02",
      "status": "engineering-test",
      "choiceContract": "four-v2",
      "entry": "opening",
      "stages": [
        {
          "id": "opening",
          "pages": [
            {
              "order": 1,
              "text": "午餐時，在教學大樓走廊，兩位科任對學生學習表現的描述不同，一位說積極，一位說安靜，學生感到困惑。",
              "speaker": null,
              "scene": "school:corridor",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "所以我到底算認真還是不認真？",
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
              "id": "verify",
              "text": "先確認兩位老師描述的課堂情境",
              "emotional": false,
              "kind": "action",
              "outcome": {
                "fact": "學生分別描述兩科情境，教師不把任一評語當成整體人格結論。",
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
              "id": "coordinate",
              "text": "協助學生理解不同科目參與方式",
              "emotional": false,
              "kind": "support",
              "outcome": {
                "fact": "雙方列出不同科目可參與的方式，尚未代表兩位科任接受解釋。",
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
              "id": "observe",
              "text": "未得同意不替任一老師公開轉述另一人的話",
              "emotional": false,
              "kind": "defer",
              "outcome": {
                "fact": "教師先問學生願意如何使用評語，不轉述另一教師的話給缺席者。",
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
              "id": "empathy",
              "text": "人的表現本來就不必每堂課都一模一樣",
              "emotional": true,
              "kind": "action",
              "outcome": {
                "fact": "教師承認人在不同課堂可有不同表現，未宣告任一評語失實。",
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
      ],
      "compilerContract": 2
    },
    "definition": {
      "id": "content:18b-t01-02-22",
      "topicId": "T01-02",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-02-22",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "4-1",
        "2-2",
        "4-4"
      ],
      "additionalCodes": [
        "10-4",
        "3-2",
        "3-4"
      ],
      "weights": [
        0.175,
        0.174,
        0.174,
        0.217,
        0.13,
        0.13
      ],
      "directions": [
        1,
        1,
        1,
        -1,
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
        "reason": "在籍學生午餐於非保護時段提出本件具體問題；不以相似分類碼推定同因果"
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
      "valence": "neutral"
    }
  },
  {
    "story": {
      "resourceId": "content:18b-t01-02-24",
      "definitionId": "content:18b-t01-02-24",
      "version": "1",
      "topicId": "T01-02",
      "status": "engineering-test",
      "choiceContract": "four-v2",
      "entry": "opening",
      "stages": [
        {
          "id": "opening",
          "pages": [
            {
              "order": 1,
              "text": "午餐時，在教師辦公室，學生補做一份同範圍練習後進步許多，要求直接替換原段考成績。",
              "speaker": null,
              "scene": "school:teachers-office",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我現在會了，為什麼原本那張不能改？",
              "speaker": "participant",
              "scene": "school:teachers-office",
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
              "id": "verify",
              "text": "說明正式評量與練習用途有別",
              "emotional": false,
              "kind": "action",
              "outcome": {
                "fact": "教師分開說明重做練習與原正式評量的目的，沒有自行更動原分。",
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
              "id": "coordinate",
              "text": "協助向科任了解校內合法補救機制",
              "emotional": false,
              "kind": "support",
              "outcome": {
                "fact": "學生擬出對合法補救途徑的詢問，尚未得到任課許可。",
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
              "id": "observe",
              "text": "保留改善紀錄，不擅自答應改分",
              "emotional": false,
              "kind": "defer",
              "outcome": {
                "fact": "學生保留後來做對的卷面作個人紀錄，不把它當自動改分憑據。",
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
              "id": "empathy",
              "text": "這次能做出來很重要，分數規則也得確認",
              "emotional": true,
              "kind": "action",
              "outcome": {
                "fact": "教師肯定後來能完成的學習，未以鼓勵否定正式規則或保證補分。",
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
      ],
      "compilerContract": 2
    },
    "definition": {
      "id": "content:18b-t01-02-24",
      "topicId": "T01-02",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-02-24",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "4-1",
        "2-2",
        "4-4"
      ],
      "additionalCodes": [
        "3-3",
        "3-2",
        "3-4"
      ],
      "weights": [
        0.245,
        0.151,
        0.151,
        0.208,
        0.113,
        0.132
      ],
      "directions": [
        1,
        1,
        1,
        -1,
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
        "reason": "在籍學生午餐於非保護時段提出本件具體問題；不以相似分類碼推定同因果"
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
      "resourceId": "content:18b-t01-02-25",
      "definitionId": "content:18b-t01-02-25",
      "version": "1",
      "topicId": "T01-02",
      "status": "engineering-test",
      "choiceContract": "four-v2",
      "entry": "opening",
      "stages": [
        {
          "id": "opening",
          "pages": [
            {
              "order": 1,
              "text": "午餐時，在教師辦公室，學生比對答案卡後發現疑似有一排劃錯位置，不清楚是否能補救。",
              "speaker": null,
              "scene": "school:teachers-office",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我會寫，卻把格子填錯了。",
              "speaker": "participant",
              "scene": "school:teachers-office",
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
              "id": "verify",
              "text": "核對閱卷資料與考試規則",
              "emotional": false,
              "kind": "action",
              "outcome": {
                "fact": "學生與教師保留自己的答案卡影本及規則疑問，不把自述填錯當成設備錯誤。",
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
              "id": "coordinate",
              "text": "依校內程序詢問可否申請查核",
              "emotional": false,
              "kind": "support",
              "outcome": {
                "fact": "教師協助整理可供查核的題號及時點，是否受理由權責單位決定。",
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
                  "H04-6"
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
              "id": "observe",
              "text": "用空白練習卡試逐題對號檢查",
              "emotional": false,
              "kind": "defer",
              "outcome": {
                "fact": "學生在空白練習卡試用逐題對號檢查，未改動原卡或重寫歷史答案。",
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
              "id": "empathy",
              "text": "發現這種錯真的很懊惱",
              "emotional": true,
              "kind": "action",
              "outcome": {
                "fact": "教師回應發現錯格的懊惱，沒有承諾以會寫就可補回分數。",
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
      ],
      "compilerContract": 2
    },
    "definition": {
      "id": "content:18b-t01-02-25",
      "topicId": "T01-02",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-02-25",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "4-1",
        "2-2",
        "4-4"
      ],
      "additionalCodes": [
        "3-2",
        "3-4",
        "2-4"
      ],
      "weights": [
        0.255,
        0.17,
        0.17,
        0.149,
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
        "reason": "在籍學生午餐於非保護時段提出本件具體問題；不以相似分類碼推定同因果"
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
      "resourceId": "content:18b-t01-02-26",
      "definitionId": "content:18b-t01-02-26",
      "version": "1",
      "topicId": "T01-02",
      "status": "engineering-test",
      "choiceContract": "four-v2",
      "entry": "opening",
      "stages": [
        {
          "id": "opening",
          "pages": [
            {
              "order": 1,
              "text": "午餐時，在校園談話角落，學生出示本次58分的考卷，說自己比上次進步，卻因同學取笑仍未及格而難過。",
              "speaker": null,
              "scene": "school:counselling-corner",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "都差兩分了，還不是一樣不及格。",
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
              "id": "verify",
              "text": "了解他是否想討論具體失分處",
              "emotional": false,
              "kind": "action",
              "outcome": {
                "fact": "學生說願意談距及格還差哪些題，教師不把58分說成已及格。",
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
              "id": "coordinate",
              "text": "協助尋找下一次較可行的練習方向",
              "emotional": false,
              "kind": "support",
              "outcome": {
                "fact": "學生挑一個目前可練的題型，教師未保證再練一定跨過及格線。",
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
                  "weight": 1.8,
                  "modifiers": [
                    {
                      "role": "participant",
                      "holder": "person",
                      "code": "4-1",
                      "influence": 0.9
                    }
                  ],
                  "outcome": {
                    "fact": "學生選定一類可練的題型，願意先做一題再評估，仍不能宣稱下一次已及格。",
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
                  "weight": 2.8,
                  "modifiers": [
                    {
                      "role": "participant",
                      "holder": "person",
                      "code": "2-2",
                      "influence": 1.2
                    }
                  ],
                  "outcome": {
                    "fact": "學生先挑出一類可練的題型，但因被取笑的難受，今天不願意再做題。",
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
              "id": "observe",
              "text": "必要時另處理同儕言語問題，不混成成績判定",
              "emotional": false,
              "kind": "defer",
              "outcome": {
                "fact": "教師詢問被取笑的情況與支持需求，依實際程序處理言語問題，不以分數裁定是否應受尊重。",
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
              "id": "empathy",
              "text": "有進步可以高興，沒過門檻也可以失落",
              "emotional": true,
              "kind": "action",
              "outcome": {
                "fact": "教師承認距門檻很近仍會失落，不把距及格兩分誤說成這次只進步兩分。",
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
      ],
      "compilerContract": 2
    },
    "definition": {
      "id": "content:18b-t01-02-26",
      "topicId": "T01-02",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-02-26",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "4-1",
        "2-2",
        "4-4"
      ],
      "additionalCodes": [
        "2-4",
        "3-2",
        "3-4"
      ],
      "weights": [
        0.245,
        0.151,
        0.17,
        0.208,
        0.113,
        0.113
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
        "reason": "在籍學生午餐於非保護時段提出本件具體問題；不以相似分類碼推定同因果"
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
      "resourceId": "content:18b-t01-02-27",
      "definitionId": "content:18b-t01-02-27",
      "version": "1",
      "topicId": "T01-02",
      "status": "engineering-test",
      "choiceContract": "four-v2",
      "entry": "opening",
      "stages": [
        {
          "id": "opening",
          "pages": [
            {
              "order": 1,
              "text": "午餐時，在教學大樓走廊，學生校外競賽獲獎，但幾門學科表現下降，正為兩種投入間的取捨煩惱。",
              "speaker": null,
              "scene": "school:corridor",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我很喜歡比賽，可是成績真的變差。",
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
              "id": "verify",
              "text": "詢問競賽時間安排與課業實際缺口",
              "emotional": false,
              "kind": "action",
              "outcome": {
                "fact": "學生列出本人競賽與課業時段，教師不由同時變化推定社團是唯一滑落原因。",
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
              "id": "coordinate",
              "text": "協助學生整理可與科任商量的補強方式",
              "emotional": false,
              "kind": "support",
              "outcome": {
                "fact": "學生把具體課業缺口整理成可向任課詢問的內容，未取得減作業承諾。",
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
              "id": "observe",
              "text": "由學生自行評估興趣與課業的優先順序",
              "emotional": false,
              "kind": "defer",
              "outcome": {
                "fact": "教師讓學生先說想保留的活動及可調整處，不替他退出社團或承諾家長同意。",
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
              "id": "empathy",
              "text": "拿到獎是努力，課業也需要照顧",
              "emotional": true,
              "kind": "action",
              "outcome": {
                "fact": "教師同時肯定得獎與提醒課業需求，未將兩者寫成只能二選一。",
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
      ],
      "compilerContract": 2
    },
    "definition": {
      "id": "content:18b-t01-02-27",
      "topicId": "T01-02",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-02-27",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "4-1",
        "2-2",
        "4-4"
      ],
      "additionalCodes": [
        "2-4",
        "3-2",
        "3-4"
      ],
      "weights": [
        0.283,
        0.151,
        0.151,
        0.189,
        0.113,
        0.113
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
        "reason": "在籍學生午餐於非保護時段提出本件具體問題；不以相似分類碼推定同因果"
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
      "resourceId": "content:18b-t01-02-28",
      "definitionId": "content:18b-t01-02-28",
      "version": "1",
      "topicId": "T01-02",
      "status": "engineering-test",
      "choiceContract": "four-v2",
      "entry": "opening",
      "stages": [
        {
          "id": "opening",
          "pages": [
            {
              "order": 1,
              "text": "午餐時，在教師辦公室，學生以為自己退步，後來發現這次評量包含新的實作分數占比。",
              "speaker": null,
              "scene": "school:teachers-office",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "原來這次多算了那個項目？",
              "speaker": "participant",
              "scene": "school:teachers-office",
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
              "id": "verify",
              "text": "協助讀懂原先公告的評量組成",
              "emotional": false,
              "kind": "action",
              "outcome": {
                "fact": "雙方按學生持有的公告分列各項權重，尚未確認系統實際套用是否相同。",
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
              "id": "coordinate",
              "text": "請科任確認實際計算與成績單欄位",
              "emotional": false,
              "kind": "support",
              "outcome": {
                "fact": "學生整理公告與成績欄位對不上之處供科任查核，教師不自行改登錄。",
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
              "id": "observe",
              "text": "保留問題供正式成績說明再核對",
              "emotional": false,
              "kind": "defer",
              "outcome": {
                "fact": "教師陪學生保留公告日期及本人欄位截圖，不擷取同學個資。",
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
              "id": "empathy",
              "text": "搞清楚算式，比一直猜自己退步好多了",
              "emotional": true,
              "kind": "action",
              "outcome": {
                "fact": "教師承接把數字落差誤認成退步的不安，未宣告一定只是公式問題。",
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
      ],
      "compilerContract": 2
    },
    "definition": {
      "id": "content:18b-t01-02-28",
      "topicId": "T01-02",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-02-28",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "4-1",
        "2-2",
        "4-4"
      ],
      "additionalCodes": [
        "3-2",
        "3-4",
        "2-4"
      ],
      "weights": [
        0.27,
        0.167,
        0.167,
        0.146,
        0.125,
        0.125
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
        "reason": "在籍學生午餐於非保護時段提出本件具體問題；不以相似分類碼推定同因果"
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
      "resourceId": "content:18b-t01-02-29",
      "definitionId": "content:18b-t01-02-29",
      "version": "1",
      "topicId": "T01-02",
      "status": "engineering-test",
      "choiceContract": "four-v2",
      "entry": "opening",
      "stages": [
        {
          "id": "opening",
          "pages": [
            {
              "order": 1,
              "text": "早自習時，在導師班教室裡，學生出示同一科先前與目前單元練習，說過去背重點有效，現在整合應用題卻常卡住。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "以前都這樣念，現在完全不管用。",
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
              "id": "verify",
              "text": "比較前後單元題型要求的變化",
              "emotional": false,
              "kind": "action",
              "outcome": {
                "fact": "學生比較先前與目前單元題型要求，教師不把單元差異當成全部失分原因。",
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
              "id": "coordinate",
              "text": "建議向科任請教理解與應用的練習",
              "emotional": false,
              "kind": "support",
              "outcome": {
                "fact": "學生擬出對應用題的具體疑問，尚未得到科任回饋。",
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
              "id": "observe",
              "text": "先選一單元觀察新方法是否適用",
              "emotional": false,
              "kind": "defer",
              "outcome": {
                "fact": "教師提出在一單元試記新方法與結果，沒有宣告新方法已有效。",
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
              "id": "empathy",
              "text": "方法需要升級，不代表你以前沒努力",
              "emotional": true,
              "kind": "action",
              "outcome": {
                "fact": "教師肯定先前付出並容許調整，未把過去的方法全面判成錯誤。",
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
      ],
      "compilerContract": 2
    },
    "definition": {
      "id": "content:18b-t01-02-29",
      "topicId": "T01-02",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-02-29",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "4-1",
        "2-2",
        "4-4"
      ],
      "additionalCodes": [
        "3-4",
        "3-2",
        "2-4"
      ],
      "weights": [
        0.175,
        0.174,
        0.174,
        0.217,
        0.13,
        0.13
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
        "reason": "在籍學生午餐於非保護時段提出本件具體問題；不以相似分類碼推定同因果"
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
      "resourceId": "content:18b-t01-02-30",
      "definitionId": "content:18b-t01-02-30",
      "version": "1",
      "topicId": "T01-02",
      "status": "engineering-test",
      "choiceContract": "four-v2",
      "entry": "opening",
      "stages": [
        {
          "id": "opening",
          "pages": [
            {
              "order": 1,
              "text": "早自習時，在導師班教室裡，學生小組報告常拿高分，但個人筆試落差大，對自己的實際理解產生疑問。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "報告都能做好，為什麼筆試不行？",
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
              "id": "verify",
              "text": "釐清小組分工與個人理解的不同",
              "emotional": false,
              "kind": "action",
              "outcome": {
                "fact": "學生自述自己在報告負責的部分，教師未由小組高分推定每人理解相同。",
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
              "id": "coordinate",
              "text": "建議將報告內容改寫成個人短答練習",
              "emotional": false,
              "kind": "support",
              "outcome": {
                "fact": "學生選一段報告改成個人短答，停在不懂處，未把練習算正式加分。",
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
              "id": "observe",
              "text": "保留個人練習紀錄，與科任討論",
              "emotional": false,
              "kind": "defer",
              "outcome": {
                "fact": "學生保留個人試答與問題供科任討論，未揭露其他組員表現。",
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
              "id": "empathy",
              "text": "能完成報告有價值，也可以補上自己的理解",
              "emotional": true,
              "kind": "action",
              "outcome": {
                "fact": "教師肯定參與報告的價值，也承認個人理解仍需另看，不保證兩種分數一致。",
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
      ],
      "compilerContract": 2
    },
    "definition": {
      "id": "content:18b-t01-02-30",
      "topicId": "T01-02",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-02-30",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "4-1",
        "2-2",
        "4-4"
      ],
      "additionalCodes": [
        "4-3",
        "9-2",
        "3-2"
      ],
      "weights": [
        0.153,
        0.154,
        0.154,
        0.212,
        0.212,
        0.115
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
        "reason": "在籍學生午餐於非保護時段提出本件具體問題；不以相似分類碼推定同因果"
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
  }
];
