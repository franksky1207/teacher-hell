// Generated isolated T02 authoring records. Never a production catalogue.
// Source of truth: work/18b-t02-06-authoring.json. Run scripts/sync-t02-drafts.mjs.
export default [
  {
    "story": {
      "resourceId": "content:18b-t02-06-01",
      "definitionId": "content:18b-t02-06-01",
      "version": "1",
      "topicId": "T02-06",
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
              "text": "晚間，學生從電子郵件垃圾信件匣翻出一封面試通知，離回覆期限已不遠。",
              "speaker": null,
              "scene": "home:bedroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我剛剛才看到這封，是不是一切都來不及了？",
              "speaker": "participant",
              "scene": "home:bedroom",
              "cast": [
                {
                  "role": "participant",
                  "position": "center",
                  "expression": "calm"
                }
              ],
              "presentation": "chat"
            }
          ],
          "choices": [
            {
              "id": "clarify",
              "text": "先一起確認寄件來源與正式期限",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生核對通知時間與校方資訊，尚未知道是否逾期。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我剛剛才看到這封，是不是一切都來不及了？",
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
                  "contacts": [],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生以遠距通訊向導師說明其個人感受；此接觸不代表雙方實際同處一室。"
                    }
                  ]
                }
              }
            },
            {
              "id": "act",
              "text": "建議立刻依官方聯絡管道詢問",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生整理詢問內容，沒有把未收到的回覆寫成允許補件。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我剛剛才看到這封，是不是一切都來不及了？",
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
                  "contacts": [],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生以遠距通訊向導師說明其個人感受；此接觸不代表雙方實際同處一室。"
                    }
                  ]
                }
              }
            },
            {
              "id": "refer",
              "text": "先保存原信件與收件時間",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生保留能證明通知內容的紀錄，尚未取得例外資格。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我剛剛才看到這封，是不是一切都來不及了？",
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
                  "contacts": [],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生以遠距通訊向導師說明其個人感受；此接觸不代表雙方實際同處一室。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "看到這種通知誰都會嚇一跳",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "導師回應驚慌，沒有假保證一定能參加面試。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我剛剛才看到這封，是不是一切都來不及了？",
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
                  "contacts": [],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生以遠距通訊向導師說明其個人感受；此接觸不代表雙方實際同處一室。"
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
      "id": "content:18b-t02-06-01",
      "topicId": "T02-06",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t02-06-01",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "3-1",
        "2-2",
        "3-3"
      ],
      "additionalCodes": [
        "2-4",
        "4-4",
        "2-3"
      ],
      "weights": [
        0.14,
        0.34,
        0.24,
        0.12,
        0.09,
        0.07
      ],
      "directions": [
        -1,
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
          "private"
        ],
        "from": null,
        "until": null,
        "facts": [],
        "history": [],
        "numeric": [],
        "enrollment": null,
        "grades": [
          3
        ],
        "entrance": [
          {
            "kind": "milestone-completed",
            "value": "application-screen"
          },
          {
            "kind": "application-screened"
          }
        ]
      },
      "repetition": {
        "cooldownDays": 45,
        "exclusionGroups": [],
        "sameFact": true,
        "reason": "同一學生單次具體情境；尚未確定的高三與日期資格不可視為已完成"
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
      "resourceId": "content:18b-t02-06-02",
      "definitionId": "content:18b-t02-06-02",
      "version": "1",
      "topicId": "T02-06",
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
              "text": "模擬面試輪到學生時，他把整串得獎名單念得飛快，時間卻快用完了。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我明明準備很多，怎麼講完好像沒說到我自己？",
              "speaker": "participant",
              "scene": "school:classroom",
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
              "id": "clarify",
              "text": "先請他挑一件能說明自己學到什麼的作品",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生選出一段實際經驗，不再只是列舉獎項。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我明明準備很多，怎麼講完好像沒說到我自己？",
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
                      "description": "學生向導師當面說明個人感受，未在場者不自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "act",
              "text": "一起練習刪減不必要的資訊",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生當場重練一次精簡自介，終於能在時間內講完一段自己的經驗，緊張稍有緩和；正式面試結果仍未知。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我明明準備很多，怎麼講完好像沒說到我自己？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [
                  {
                    "role": "participant",
                    "holder": "person",
                    "code": "2-2",
                    "delta": -0.3
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
                      "description": "學生向導師當面說明個人感受，未在場者不自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "refer",
              "text": "引導他確認該校系關注的學習方向",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生知道該查閱哪些官方資料，沒有得到標準答案。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我明明準備很多，怎麼講完好像沒說到我自己？",
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
                      "description": "學生向導師當面說明個人感受，未在場者不自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "你準備的很多，只是還沒讓人聽到你",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "導師肯定準備投入，學生願意試著重新組織敘述。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我明明準備很多，怎麼講完好像沒說到我自己？",
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
                      "description": "學生向導師當面說明個人感受，未在場者不自動知情。"
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
      "id": "content:18b-t02-06-02",
      "topicId": "T02-06",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t02-06-02",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "3-1",
        "2-2",
        "3-3"
      ],
      "additionalCodes": [
        "1-4",
        "3-2",
        "4-2"
      ],
      "weights": [
        0.23,
        0.23,
        0.18,
        0.13,
        0.12,
        0.11
      ],
      "directions": [
        -1,
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
        "until": "2029-05-14",
        "facts": [],
        "history": [],
        "numeric": [],
        "enrollment": null,
        "grades": [
          3
        ],
        "entrance": [
          {
            "kind": "milestone-completed",
            "value": "application-screen"
          },
          {
            "kind": "application-screened"
          }
        ]
      },
      "repetition": {
        "cooldownDays": 45,
        "exclusionGroups": [],
        "sameFact": true,
        "reason": "同一學生單次具體情境；尚未確定的高三與日期資格不可視為已完成"
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
      "resourceId": "content:18b-t02-06-11",
      "definitionId": "content:18b-t02-06-11",
      "version": "1",
      "topicId": "T02-06",
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
              "text": "學生拿著兩張面試通知，發現時間都排在同一天，遠在不同縣市。",
              "speaker": null,
              "scene": "school:teachers-office",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我不是要翹掉哪一間，可是真的不可能瞬間移動。",
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
              "id": "clarify",
              "text": "先確認兩份正式通知的實際報到時間",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生發現需比較報到與交通時間，尚未決定取捨。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我不是要翹掉哪一間，可是真的不可能瞬間移動。",
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
                      "description": "學生向導師當面說明個人感受，未在場者不自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "act",
              "text": "協助整理各校正式詢問窗口",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生準備自行詢問可行辦法，沒有保證學校願意調整。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我不是要翹掉哪一間，可是真的不可能瞬間移動。",
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
                      "description": "學生向導師當面說明個人感受，未在場者不自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "refer",
              "text": "評估兩個校系的自身優先順序",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生列出課程與生活條件，仍保留最終決定權。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我不是要翹掉哪一間，可是真的不可能瞬間移動。",
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
                      "description": "學生向導師當面說明個人感受，未在場者不自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "換成誰都會覺得兩難",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "導師承認衝突實際存在，不將未赴考等同不負責任。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我不是要翹掉哪一間，可是真的不可能瞬間移動。",
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
                      "description": "學生向導師當面說明個人感受，未在場者不自動知情。"
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
      "id": "content:18b-t02-06-11",
      "topicId": "T02-06",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t02-06-11",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "3-1",
        "2-2",
        "3-3"
      ],
      "additionalCodes": [
        "2-3",
        "7-2",
        "3-4"
      ],
      "weights": [
        0.16,
        0.22,
        0.21,
        0.15,
        0.12,
        0.14
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
          "noon"
        ],
        "from": null,
        "until": null,
        "facts": [],
        "history": [],
        "numeric": [],
        "enrollment": null,
        "grades": [
          3
        ],
        "entrance": [
          {
            "kind": "milestone-completed",
            "value": "application-screen"
          },
          {
            "kind": "application-screened"
          }
        ]
      },
      "repetition": {
        "cooldownDays": 45,
        "exclusionGroups": [],
        "sameFact": true,
        "reason": "同一學生單次具體情境；尚未確定的高三與日期資格不可視為已完成"
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
      "resourceId": "content:18b-t02-06-24",
      "definitionId": "content:18b-t02-06-24",
      "version": "1",
      "topicId": "T02-06",
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
              "text": "學生剛從面試回校，才想起自己當時完全沒問系上的課程內容。",
              "speaker": null,
              "scene": "school:counselling-corner",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我問答都講完了，結果連真的要學什麼都沒問清楚。",
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
            }
          ],
          "choices": [
            {
              "id": "clarify",
              "text": "先列出仍不清楚的必修與實作內容",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生把課程疑問寫在筆記上，尚未取得官方確認。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我問答都講完了，結果連真的要學什麼都沒問清楚。",
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
                      "description": "學生向導師當面說明個人感受，未在場者不自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "act",
              "text": "協助找到系所公開課程與聯繫窗口",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生取得公開資訊來源，未由導師替校系答覆。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我問答都講完了，結果連真的要學什麼都沒問清楚。",
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
                      "description": "學生向導師當面說明個人感受，未在場者不自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "refer",
              "text": "回顧這次提問經驗以備其他面試",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生歸納一項下次要主動提問的重點，未保證錄取。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我問答都講完了，結果連真的要學什麼都沒問清楚。",
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
                      "description": "學生向導師當面說明個人感受，未在場者不自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "這是很真實的學習，下次會更知道要問什麼",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "導師鼓勵學生從經驗調整，不評判這場面試的結果。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我問答都講完了，結果連真的要學什麼都沒問清楚。",
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
                      "description": "學生向導師當面說明個人感受，未在場者不自動知情。"
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
      "id": "content:18b-t02-06-24",
      "topicId": "T02-06",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t02-06-24",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "3-1",
        "2-2",
        "3-3"
      ],
      "additionalCodes": [
        "9-3",
        "1-3",
        "2-4"
      ],
      "weights": [
        0.18,
        0.2,
        0.16,
        0.17,
        0.16,
        0.13
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
          "noon"
        ],
        "from": null,
        "until": null,
        "facts": [],
        "history": [],
        "numeric": [],
        "enrollment": null,
        "grades": [
          3
        ],
        "entrance": [
          {
            "kind": "milestone-completed",
            "value": "application-review"
          },
          {
            "kind": "application-reviewed"
          }
        ]
      },
      "repetition": {
        "cooldownDays": 45,
        "exclusionGroups": [],
        "sameFact": true,
        "reason": "同一學生單次具體情境；尚未確定的高三與日期資格不可視為已完成"
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
      "resourceId": "content:18b-t02-06-13",
      "definitionId": "content:18b-t02-06-13",
      "version": "1",
      "topicId": "T02-06",
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
              "text": "午休，學生剛和同學做完一次模擬面試練習，在走廊聽見有人模仿他說話的口音。",
              "speaker": null,
              "scene": "school:corridor",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我講話真的那麼好笑嗎？是不是面試就輸一半了？",
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
              "id": "clarify",
              "text": "先確認學生剛才聽見的具體言語",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生說出自己聽到的內容，導師未把未核實的動機當成事實。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我講話真的那麼好笑嗎？是不是面試就輸一半了？",
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
                      "description": "角色以本次實際對話或訊息向導師表達看法，沒有傳給未在場者。"
                    }
                  ]
                }
              }
            },
            {
              "id": "action",
              "text": "徵詢意願後討論如何處理不尊重的言語",
              "kind": "support",
              "emotional": false,
              "outcome": {
                "fact": "學生知道可選擇提出反映及獲得支持，沒有被迫當場與同學對質。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我講話真的那麼好笑嗎？是不是面試就輸一半了？",
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
                      "description": "角色以本次實際對話或訊息向導師表達看法，沒有傳給未在場者。"
                    }
                  ]
                }
              }
            },
            {
              "id": "alternative",
              "text": "陪他回到面試內容本身評估表達",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生指出一個答得清楚的段落，不把口音視為能力缺陷。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我講話真的那麼好笑嗎？是不是面試就輸一半了？",
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
                      "description": "角色以本次實際對話或訊息向導師表達看法，沒有傳給未在場者。"
                    }
                  ]
                }
              }
            },
            {
              "id": "care",
              "text": "你的口音不是可以被嘲笑的理由",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "導師明確表達尊重，未保證正式面試結果。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我講話真的那麼好笑嗎？是不是面試就輸一半了？",
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
                      "description": "角色以本次實際對話或訊息向導師表達看法，沒有傳給未在場者。"
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
      "id": "content:18b-t02-06-13",
      "topicId": "T02-06",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t02-06-13",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "3-1",
        "2-2",
        "3-3"
      ],
      "additionalCodes": [
        "4-4",
        "3-4",
        "1-3"
      ],
      "weights": [
        0.24,
        0.27,
        0.14,
        0.13,
        0.12,
        0.1
      ],
      "directions": [
        -1,
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
        "until": "2029-05-14",
        "facts": [],
        "history": [],
        "numeric": [],
        "enrollment": null,
        "grades": [
          3
        ],
        "entrance": [
          {
            "kind": "milestone-completed",
            "value": "application-screen"
          },
          {
            "kind": "application-screened"
          }
        ]
      },
      "repetition": {
        "cooldownDays": 45,
        "exclusionGroups": [],
        "sameFact": true,
        "reason": "這是個別一次性的情境；需按人物學籍、情境時段與既有接觸條件抽選"
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
      "resourceId": "content:18b-t02-06-04",
      "definitionId": "content:18b-t02-06-04",
      "version": "1",
      "topicId": "T02-06",
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
              "text": "備審準備期間，學生發現自己的作品集封面用了小組照片，照片還拍進別人的畫作。",
              "speaker": null,
              "scene": "school:corridor",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "這張很漂亮，可是那幅畫不是我的，我能這樣放嗎？",
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
              "id": "clarify",
              "text": "先分清照片、作品與各自的作者",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生標記畫作來源，沒有擅自宣稱別人作品是自己完成。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "這張很漂亮，可是那幅畫不是我的，我能這樣放嗎？",
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
                      "description": "本次由當事人向導師傳達自己的感受；其他人不自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "act",
              "text": "請學生取得作者及入鏡者的適當同意",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生列出需要確認的對象，尚未得到任何授權。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "這張很漂亮，可是那幅畫不是我的，我能這樣放嗎？",
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
                      "description": "本次由當事人向導師傳達自己的感受；其他人不自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "alternative",
              "text": "陪他改用能證明自己貢獻的資料",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生選出自己負責的工作紀錄，未再借用不明來源作品。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "這張很漂亮，可是那幅畫不是我的，我能這樣放嗎？",
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
                      "description": "本次由當事人向導師傳達自己的感受；其他人不自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "你願意先想清楚署名，很重要",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "導師肯定誠實呈現成果，不替其他人作授權決定。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "這張很漂亮，可是那幅畫不是我的，我能這樣放嗎？",
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
                      "description": "本次由當事人向導師傳達自己的感受；其他人不自動知情。"
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
      "id": "content:18b-t02-06-04",
      "topicId": "T02-06",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t02-06-04",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "3-1",
        "2-2",
        "3-3"
      ],
      "additionalCodes": [
        "2-4",
        "4-4",
        "2-3"
      ],
      "weights": [
        0.25,
        0.375,
        0.375,
        0,
        0,
        0
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
          "noon"
        ],
        "from": null,
        "until": "2029-05-14",
        "facts": [],
        "history": [],
        "numeric": [],
        "enrollment": null,
        "grades": [
          3
        ],
        "entrance": [
          {
            "kind": "milestone-completed",
            "value": "application-screen"
          },
          {
            "kind": "application-screened"
          }
        ]
      },
      "repetition": {
        "cooldownDays": 45,
        "exclusionGroups": [],
        "sameFact": true,
        "reason": "同一學生單次具體情境；尚未確定的高三與日期資格不可視為已完成"
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
      "resourceId": "content:18b-t02-06-09",
      "definitionId": "content:18b-t02-06-09",
      "version": "1",
      "topicId": "T02-06",
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
              "text": "模擬面試後，學生坐在輔導室，把剛才談到家庭困難的那段話一再刪改。",
              "speaker": null,
              "scene": "school:counseling",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "老師問我最挫折的事，我是不是講太多家裡的事了？",
              "speaker": "participant",
              "scene": "school:counseling",
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
              "id": "clarify",
              "text": "先確認學生哪些內容願意公開",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生圈出自己不想再透露的細節，沒有要求再重述私事。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "老師問我最挫折的事，我是不是講太多家裡的事了？",
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
                      "description": "本次由當事人向導師傳達自己的感受；其他人不自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "act",
              "text": "練習以個人學習經驗回答相同問題",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生找到另一個可談的實際經驗，不必揭露家庭成員資訊。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "老師問我最挫折的事，我是不是講太多家裡的事了？",
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
                      "description": "本次由當事人向導師傳達自己的感受；其他人不自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "alternative",
              "text": "討論遇到不適合回答的問題如何設界線",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生練習禮貌說明不願細述的方式，未因此被保證面試表現。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "老師問我最挫折的事，我是不是講太多家裡的事了？",
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
                      "description": "本次由當事人向導師傳達自己的感受；其他人不自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "你有權決定哪些事不想在面試談",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "導師承認隱私界線，不把公開家庭故事當作真誠的唯一標準。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "老師問我最挫折的事，我是不是講太多家裡的事了？",
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
                      "description": "本次由當事人向導師傳達自己的感受；其他人不自動知情。"
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
      "id": "content:18b-t02-06-09",
      "topicId": "T02-06",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t02-06-09",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "3-1",
        "2-2",
        "3-3"
      ],
      "additionalCodes": [
        "2-4",
        "4-4",
        "2-3"
      ],
      "weights": [
        0.2222222222222222,
        0.4444444444444444,
        0.1111111111111111,
        0.1111111111111111,
        0.1111111111111111,
        0
      ],
      "directions": [
        -1,
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
        "until": "2029-05-14",
        "facts": [],
        "history": [],
        "numeric": [],
        "enrollment": null,
        "grades": [
          3
        ],
        "entrance": [
          {
            "kind": "milestone-completed",
            "value": "application-screen"
          },
          {
            "kind": "application-screened"
          }
        ]
      },
      "repetition": {
        "cooldownDays": 45,
        "exclusionGroups": [],
        "sameFact": true,
        "reason": "同一學生單次具體情境；尚未確定的高三與日期資格不可視為已完成"
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
      "resourceId": "content:18b-t02-06-03",
      "definitionId": "content:18b-t02-06-03",
      "version": "1",
      "topicId": "T02-06",
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
              "text": "週末下午，家長打電話詢問導師，大學面試當天可以陪孩子走到哪裡。",
              "speaker": null,
              "scene": "home:living-room",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "面試當天，我們家長能不能陪孩子進去？",
              "speaker": "participant",
              "scene": "home:living-room",
              "cast": [
                {
                  "role": "participant",
                  "position": "center",
                  "expression": "calm"
                }
              ],
              "presentation": "phone"
            }
          ],
          "choices": [
            {
              "id": "clarify",
              "text": "核對校系正式面試通知",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "家長拿出面試通知，發現文件只寫學生報到而未提陪同進場細節。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "面試當天，我們家長能不能陪孩子進去？",
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
                  "contacts": [],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "家長以電話直接向導師詢問陪考規定；孩子並未參與本次通話。"
                    }
                  ]
                }
              }
            },
            {
              "id": "check",
              "text": "確認報到和陪同規定",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "家長知道需要依校系官方規定核對陪同範圍，未要求導師擅自保證。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "面試當天，我們家長能不能陪孩子進去？",
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
                  "contacts": [],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "家長以電話直接向導師詢問陪考規定；孩子並未參與本次通話。"
                    }
                  ]
                }
              }
            },
            {
              "id": "choice",
              "text": "讓家長與學生先討論支持方式",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "家長準備回去和孩子討論考場外的支持方式，尚未取得孩子同意或校系陪同許可。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "面試當天，我們家長能不能陪孩子進去？",
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
                  "contacts": [],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "家長以電話直接向導師詢問陪考規定；孩子並未參與本次通話。"
                    }
                  ]
                }
              }
            },
            {
              "id": "care",
              "text": "理解家長擔心孩子",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "導師回應家長擔心孩子在陌生校園迷路的心情，未把陪考等同參與面試。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "面試當天，我們家長能不能陪孩子進去？",
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
                  "contacts": [],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "家長以電話直接向導師詢問陪考規定；孩子並未參與本次通話。"
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
      "id": "content:18b-t02-06-03",
      "topicId": "T02-06",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t02-06-03",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "3-1",
        "2-2",
        "3-3"
      ],
      "additionalCodes": [
        "2-4",
        "4-4",
        "2-3"
      ],
      "weights": [
        0.25,
        0.5,
        0.125,
        0,
        0.125,
        0
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
          "caregiver"
        ],
        "dayKinds": [
          "weekend",
          "holiday"
        ],
        "slotIds": [
          "afternoon"
        ],
        "from": null,
        "until": "2029-05-14",
        "facts": [],
        "history": [],
        "numeric": [],
        "enrollment": null,
        "grades": [
          3
        ],
        "entrance": [
          {
            "kind": "record-v1",
            "query": "application-screened",
            "subject": "caregiver-student"
          }
        ]
      },
      "repetition": {
        "cooldownDays": 45,
        "exclusionGroups": [],
        "sameFact": true,
        "reason": "同一學生單次具體情境；尚未確定的高三與日期資格不可視為已完成"
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
      "resourceId": "content:18b-t02-06-05",
      "definitionId": "content:18b-t02-06-05",
      "version": "1",
      "topicId": "T02-06",
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
              "text": "午餐，輔導室。學生因害怕口語表達而想放棄心儀科系。",
              "speaker": null,
              "scene": "school:counseling",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我想讀那個系，但一想到備審和面試就想放棄。",
              "speaker": "participant",
              "scene": "school:counseling",
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
              "id": "clarify",
              "text": "釐清最害怕的準備環節",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生說出最怕的是面試被追問，而非對科系完全沒有興趣。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我想讀那個系，但一想到備審和面試就想放棄。",
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
                      "description": "本次由學生向導師表達個人看法；其他人未自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "check",
              "text": "比較招生管道的實際要求",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生了解需要逐項確認備審與面試要求，尚未決定放棄校系。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我想讀那個系，但一想到備審和面試就想放棄。",
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
                      "description": "本次由學生向導師表達個人看法；其他人未自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "choice",
              "text": "討論從小型練習開始",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生同意先用三十秒練習介紹一份自己做過的作品，仍可隨時停止。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我想讀那個系，但一想到備審和面試就想放棄。",
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
                      "description": "本次由學生向導師表達個人看法；其他人未自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "care",
              "text": "接納害怕公開表達",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生承認害怕在眾人面前說話，導師沒有把恐懼解釋成不適合讀該系。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我想讀那個系，但一想到備審和面試就想放棄。",
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
                      "description": "本次由學生向導師表達個人看法；其他人未自動知情。"
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
      "id": "content:18b-t02-06-05",
      "topicId": "T02-06",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t02-06-05",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "3-1",
        "2-2",
        "3-3"
      ],
      "additionalCodes": [
        "2-4",
        "4-4",
        "2-3"
      ],
      "weights": [
        0.35714285714285715,
        0.35714285714285715,
        0,
        0.14285714285714285,
        0.14285714285714285,
        0
      ],
      "directions": [
        -1,
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
        "until": "2029-05-14",
        "facts": [],
        "history": [],
        "numeric": [],
        "enrollment": null,
        "grades": [
          3
        ],
        "entrance": [
          {
            "kind": "milestone-completed",
            "value": "application-screen"
          },
          {
            "kind": "application-screened"
          }
        ]
      },
      "repetition": {
        "cooldownDays": 45,
        "exclusionGroups": [],
        "sameFact": true,
        "reason": "同一學生單次具體情境；尚未確定的高三與日期資格不可視為已完成"
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
      "resourceId": "content:18b-t02-06-06",
      "definitionId": "content:18b-t02-06-06",
      "version": "1",
      "topicId": "T02-06",
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
              "text": "午休後，教室。學生練習回答時被同儕笑場，覺得丟臉。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我剛練面試全班笑出來，我不想再練了。",
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
              "id": "clarify",
              "text": "確認學生聽到什麼",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生說明同學笑的是自己卡住的那一刻，尚未確定每個人都在嘲笑他。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我剛練面試全班笑出來，我不想再練了。",
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
                      "description": "本次由學生向導師表達個人看法；其他人未自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "check",
              "text": "討論同學應尊重練習者",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師提醒練習應有尊重的界線，學生知道可以反映被取笑的具體情況。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我剛練面試全班笑出來，我不想再練了。",
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
                      "description": "本次由學生向導師表達個人看法；其他人未自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "choice",
              "text": "徵詢是否願意換個環境練習",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生考慮改在輔導室小規模練習，沒有被要求當場回去接受全班評分。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我剛練面試全班笑出來，我不想再練了。",
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
                      "description": "本次由學生向導師表達個人看法；其他人未自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "care",
              "text": "理解被笑場的難堪",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生坦承很想躲起來，導師不拿「大家只是開玩笑」消除他的感受。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我剛練面試全班笑出來，我不想再練了。",
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
                      "description": "本次由學生向導師表達個人看法；其他人未自動知情。"
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
      "id": "content:18b-t02-06-06",
      "topicId": "T02-06",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t02-06-06",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "3-1",
        "2-2",
        "3-3"
      ],
      "additionalCodes": [
        "2-4",
        "4-4",
        "2-3"
      ],
      "weights": [
        0.2,
        0.3333333333333333,
        0,
        0.2,
        0.26666666666666666,
        0
      ],
      "directions": [
        -1,
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
        "until": "2029-05-14",
        "facts": [],
        "history": [],
        "numeric": [],
        "enrollment": null,
        "grades": [
          3
        ],
        "entrance": [
          {
            "kind": "milestone-completed",
            "value": "application-screen"
          },
          {
            "kind": "application-screened"
          }
        ]
      },
      "repetition": {
        "cooldownDays": 45,
        "exclusionGroups": [],
        "sameFact": true,
        "reason": "同一學生單次具體情境；尚未確定的高三與日期資格不可視為已完成"
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
      "resourceId": "content:18b-t02-06-08",
      "definitionId": "content:18b-t02-06-08",
      "version": "1",
      "topicId": "T02-06",
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
              "text": "準備大學面試的一個晚間，學生查到兩種交通路線，擔心車程估算錯誤而遲到。",
              "speaker": null,
              "scene": "home:living-room",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "去面試的車程算錯，我怕一定會遲到。",
              "speaker": "participant",
              "scene": "home:living-room",
              "cast": [
                {
                  "role": "participant",
                  "position": "center",
                  "expression": "calm"
                }
              ],
              "presentation": "chat"
            }
          ],
          "choices": [
            {
              "id": "clarify",
              "text": "核對正式考場及報到時間",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生將兩條交通路線的轉車時間排在一起，發現原估算少算了一段接駁。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "去面試的車程算錯，我怕一定會遲到。",
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
                  "contacts": [],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "本次由學生向導師表達個人看法；其他人未自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "check",
              "text": "比較交通路線和備案",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生重查考場報到時間與可行路線，還不能保證路況一定順利。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "去面試的車程算錯，我怕一定會遲到。",
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
                  "contacts": [],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "本次由學生向導師表達個人看法；其他人未自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "choice",
              "text": "提醒提前確認住宿與費用",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生把前一晚住宿與當日早到的成本列給家長討論，沒有直接訂房。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "去面試的車程算錯，我怕一定會遲到。",
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
                  "contacts": [],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "本次由學生向導師表達個人看法；其他人未自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "care",
              "text": "同理陌生路線的緊張",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "導師理解陌生城市的移動壓力，提醒先處理能確認的資訊。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "去面試的車程算錯，我怕一定會遲到。",
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
                  "contacts": [],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "本次由學生向導師表達個人看法；其他人未自動知情。"
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
      "id": "content:18b-t02-06-08",
      "topicId": "T02-06",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t02-06-08",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "3-1",
        "2-2",
        "3-3"
      ],
      "additionalCodes": [
        "2-4",
        "4-4",
        "2-3"
      ],
      "weights": [
        0,
        0.5,
        0.3,
        0.1,
        0,
        0.1
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
          "school",
          "weekend",
          "holiday"
        ],
        "slotIds": [
          "private",
          "evening",
          "afternoon"
        ],
        "from": null,
        "until": "2029-05-14",
        "facts": [],
        "history": [],
        "numeric": [],
        "enrollment": null,
        "grades": [
          3
        ],
        "entrance": [
          {
            "kind": "milestone-completed",
            "value": "application-screen"
          },
          {
            "kind": "application-screened"
          }
        ]
      },
      "repetition": {
        "cooldownDays": 45,
        "exclusionGroups": [],
        "sameFact": true,
        "reason": "同一學生單次具體情境；尚未確定的高三與日期資格不可視為已完成"
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
      "resourceId": "content:18b-t02-06-10",
      "definitionId": "content:18b-t02-06-10",
      "version": "1",
      "topicId": "T02-06",
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
              "text": "資料準備日，行政辦公室。學生的成績證明與實際學期資料不完整。",
              "speaker": null,
              "scene": "school:administration",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "成績證明少了一頁，現在送出的資料還算完整嗎？",
              "speaker": "participant",
              "scene": "school:administration",
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
              "id": "clarify",
              "text": "核對缺少的學期資料",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生核對資料頁碼，確認缺的是某一學期的成績證明，並非整份備審都消失。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "成績證明少了一頁，現在送出的資料還算完整嗎？",
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
                      "description": "本次由學生向導師表達個人看法；其他人未自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "check",
              "text": "查詢正式補件要求",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生知道必須按校系正式補件規定辦理，不能以導師口頭允許替代。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "成績證明少了一頁，現在送出的資料還算完整嗎？",
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
                      "description": "本次由學生向導師表達個人看法；其他人未自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "choice",
              "text": "協助保留申請資料版本",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生保存已送出檔案與目前版本，避免再修改時遺失原始證據。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "成績證明少了一頁，現在送出的資料還算完整嗎？",
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
                      "description": "本次由學生向導師表達個人看法；其他人未自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "care",
              "text": "理解怕資料不足",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生擔心被誤認成資料不實，導師理解焦急但未保證可以補件。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "成績證明少了一頁，現在送出的資料還算完整嗎？",
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
                      "description": "本次由學生向導師表達個人看法；其他人未自動知情。"
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
      "id": "content:18b-t02-06-10",
      "topicId": "T02-06",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t02-06-10",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "3-1",
        "2-2",
        "3-3"
      ],
      "additionalCodes": [
        "2-4",
        "4-4",
        "2-3"
      ],
      "weights": [
        0,
        0.4444444444444444,
        0.4444444444444444,
        0.1111111111111111,
        0,
        0
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
          "noon"
        ],
        "from": null,
        "until": "2029-05-14",
        "facts": [],
        "history": [],
        "numeric": [],
        "enrollment": null,
        "grades": [
          3
        ],
        "entrance": [
          {
            "kind": "milestone-completed",
            "value": "application-screen"
          },
          {
            "kind": "application-screened"
          }
        ]
      },
      "repetition": {
        "cooldownDays": 45,
        "exclusionGroups": [],
        "sameFact": true,
        "reason": "同一學生單次具體情境；尚未確定的高三與日期資格不可視為已完成"
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
      "resourceId": "content:18b-t02-06-12",
      "definitionId": "content:18b-t02-06-12",
      "version": "1",
      "topicId": "T02-06",
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
              "text": "假日晚上，家中臥室。學生照背範本，卻無法回答追問。",
              "speaker": null,
              "scene": "home:bedroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "學長給我一份制式答案，我背完反而不會回答追問。",
              "speaker": "participant",
              "scene": "home:bedroom",
              "cast": [
                {
                  "role": "participant",
                  "position": "center",
                  "expression": "calm"
                }
              ],
              "presentation": "chat"
            }
          ],
          "choices": [
            {
              "id": "clarify",
              "text": "請他說出真正的個人經歷",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生嘗試不用學長的句子說明自己的學習經驗，發現內容反而更清楚。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "學長給我一份制式答案，我背完反而不會回答追問。",
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
                  "contacts": [],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "本次由學生向導師表達個人看法；其他人未自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "check",
              "text": "比較照背和自然表達差異",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生把背誦答案與真正經歷的例子相比，意識到追問時可能需要具體細節。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "學長給我一份制式答案，我背完反而不會回答追問。",
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
                  "contacts": [],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "本次由學生向導師表達個人看法；其他人未自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "choice",
              "text": "安排不預告追問練習",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生同意接受一次不預告問題的小練習，尚未因此被保證面試成功。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "學長給我一份制式答案，我背完反而不會回答追問。",
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
                  "contacts": [],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "本次由學生向導師表達個人看法；其他人未自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "care",
              "text": "肯定重新說自己的話",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "導師肯定他願意找回自己的說法，而不是照本宣科。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "學長給我一份制式答案，我背完反而不會回答追問。",
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
                  "contacts": [],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "本次由學生向導師表達個人看法；其他人未自動知情。"
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
      "id": "content:18b-t02-06-12",
      "topicId": "T02-06",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t02-06-12",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "3-1",
        "2-2",
        "3-3"
      ],
      "additionalCodes": [
        "2-4",
        "4-4",
        "2-3"
      ],
      "weights": [
        0.3076923076923077,
        0.3076923076923077,
        0.15384615384615385,
        0.07692307692307693,
        0.15384615384615385,
        0
      ],
      "directions": [
        -1,
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
          "weekend",
          "holiday"
        ],
        "slotIds": [
          "evening"
        ],
        "from": null,
        "until": "2029-05-14",
        "facts": [],
        "history": [],
        "numeric": [],
        "enrollment": null,
        "grades": [
          3
        ],
        "entrance": [
          {
            "kind": "milestone-completed",
            "value": "application-screen"
          },
          {
            "kind": "application-screened"
          }
        ]
      },
      "repetition": {
        "cooldownDays": 45,
        "exclusionGroups": [],
        "sameFact": true,
        "reason": "同一學生單次具體情境；尚未確定的高三與日期資格不可視為已完成"
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
      "resourceId": "content:18b-t02-06-14",
      "definitionId": "content:18b-t02-06-14",
      "version": "1",
      "topicId": "T02-06",
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
              "text": "備審資料準備期間的一個上課日晚間，學生想更換一份作品，卻不確定前一版是否已經正式送出。",
              "speaker": null,
              "scene": "home:bedroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "作品集想換一份，但前一版好像已經送出了。",
              "speaker": "participant",
              "scene": "home:bedroom",
              "cast": [
                {
                  "role": "participant",
                  "position": "center",
                  "expression": "calm"
                }
              ],
              "presentation": "chat"
            }
          ],
          "choices": [
            {
              "id": "clarify",
              "text": "確認系統目前提交狀態",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生確認送出系統目前顯示的是舊版作品集，新版還只存在本機。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "作品集想換一份，但前一版好像已經送出了。",
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
                  "contacts": [],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "本次由學生向導師表達個人看法；其他人未自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "check",
              "text": "核對變更期限與規則",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生核對正式更換規則與期限，沒有把按下上傳當作已經覆蓋。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "作品集想換一份，但前一版好像已經送出了。",
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
                  "contacts": [],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "本次由學生向導師表達個人看法；其他人未自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "choice",
              "text": "保存新舊作品版本",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生將兩版檔案分別存檔，留下修改前後的紀錄可供比對。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "作品集想換一份，但前一版好像已經送出了。",
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
                  "contacts": [],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "本次由學生向導師表達個人看法；其他人未自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "care",
              "text": "理解截止前的不安",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "導師理解臨截止又想改善作品的焦躁，不催促學生盲目操作。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "作品集想換一份，但前一版好像已經送出了。",
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
                  "contacts": [],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "本次由學生向導師表達個人看法；其他人未自動知情。"
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
      "id": "content:18b-t02-06-14",
      "topicId": "T02-06",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t02-06-14",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "3-1",
        "2-2",
        "3-3"
      ],
      "additionalCodes": [
        "2-4",
        "4-4",
        "2-3"
      ],
      "weights": [
        0,
        0.5,
        0.375,
        0,
        0,
        0.125
      ],
      "directions": [
        1,
        1,
        -1,
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
          "private"
        ],
        "from": null,
        "until": "2029-05-14",
        "facts": [],
        "history": [],
        "numeric": [],
        "enrollment": null,
        "grades": [
          3
        ],
        "entrance": [
          {
            "kind": "milestone-completed",
            "value": "application-screen"
          },
          {
            "kind": "application-screened"
          }
        ]
      },
      "repetition": {
        "cooldownDays": 45,
        "exclusionGroups": [],
        "sameFact": true,
        "reason": "同一學生單次具體情境；尚未確定的高三與日期資格不可視為已完成"
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
      "resourceId": "content:18b-t02-06-15",
      "definitionId": "content:18b-t02-06-15",
      "version": "1",
      "topicId": "T02-06",
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
              "text": "備審檢核時，教師辦公室。學生用網路模板卻把課程名稱填錯。",
              "speaker": null,
              "scene": "school:teachers-office",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我照模板寫，連系上必修科目都寫錯了。",
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
              "id": "clarify",
              "text": "核對官方課程資料",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生發現範本上的一門必修課根本不在該系最新課表。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我照模板寫，連系上必修科目都寫錯了。",
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
                      "description": "本次由學生向導師表達個人看法；其他人未自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "check",
              "text": "找出模板與自身經歷不符處",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生改從官方課程頁面核對，刪除與真實學習經驗不符的句子。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我照模板寫，連系上必修科目都寫錯了。",
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
                      "description": "本次由學生向導師表達個人看法；其他人未自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "choice",
              "text": "鼓勵用真實選系理由改寫",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生準備用自己曾經做過的課程成果說明選系動機，尚未重送備審。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我照模板寫，連系上必修科目都寫錯了。",
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
                      "description": "本次由學生向導師表達個人看法；其他人未自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "care",
              "text": "理解發現錯誤的羞愧",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生坦承看見錯誤很丟臉，導師沒有以貶低作為提醒。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我照模板寫，連系上必修科目都寫錯了。",
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
                      "description": "本次由學生向導師表達個人看法；其他人未自動知情。"
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
      "id": "content:18b-t02-06-15",
      "topicId": "T02-06",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t02-06-15",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "3-1",
        "2-2",
        "3-3"
      ],
      "additionalCodes": [
        "2-4",
        "4-4",
        "2-3"
      ],
      "weights": [
        0,
        0.3,
        0.5,
        0.1,
        0.1,
        0
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
          "noon"
        ],
        "from": null,
        "until": "2029-05-14",
        "facts": [],
        "history": [],
        "numeric": [],
        "enrollment": null,
        "grades": [
          3
        ],
        "entrance": [
          {
            "kind": "milestone-completed",
            "value": "application-screen"
          },
          {
            "kind": "application-screened"
          }
        ]
      },
      "repetition": {
        "cooldownDays": 45,
        "exclusionGroups": [],
        "sameFact": true,
        "reason": "同一學生單次具體情境；尚未確定的高三與日期資格不可視為已完成"
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
      "resourceId": "content:18b-t02-06-16",
      "definitionId": "content:18b-t02-06-16",
      "version": "1",
      "topicId": "T02-06",
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
              "text": "午休，教室。學生覺得自己缺亮點，擔心說不出有說服力的經驗。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我沒有競賽得獎，面試要說什麼？",
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
              "id": "clarify",
              "text": "找出真實完成的學習任務",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生找出一件沒得獎但完成的課堂專題，第一次願意具體描述過程。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我沒有競賽得獎，面試要說什麼？",
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
                      "description": "本次由學生向導師表達個人看法；其他人未自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "check",
              "text": "練習描述困難和改進",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生用實際遇到的問題與修正方法練習回答，而不是臨時編造獎項。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我沒有競賽得獎，面試要說什麼？",
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
                      "description": "本次由學生向導師表達個人看法；其他人未自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "choice",
              "text": "核對校系重視的能力",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生核對該校系重視的學習能力，準備挑選真正能說明的經驗。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我沒有競賽得獎，面試要說什麼？",
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
                      "description": "本次由學生向導師表達個人看法；其他人未自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "care",
              "text": "肯定平凡努力也有故事",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "導師肯定沒有競賽成績也不等於沒有投入，未保證教授一定喜歡。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我沒有競賽得獎，面試要說什麼？",
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
                      "description": "本次由學生向導師表達個人看法；其他人未自動知情。"
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
      "id": "content:18b-t02-06-16",
      "topicId": "T02-06",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t02-06-16",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "3-1",
        "2-2",
        "3-3"
      ],
      "additionalCodes": [
        "2-4",
        "4-4",
        "2-3"
      ],
      "weights": [
        0.15384615384615385,
        0.3076923076923077,
        0,
        0.15384615384615385,
        0.38461538461538464,
        0
      ],
      "directions": [
        -1,
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
        "until": "2029-05-14",
        "facts": [],
        "history": [],
        "numeric": [],
        "enrollment": null,
        "grades": [
          3
        ],
        "entrance": [
          {
            "kind": "milestone-completed",
            "value": "application-screen"
          },
          {
            "kind": "application-screened"
          }
        ]
      },
      "repetition": {
        "cooldownDays": 45,
        "exclusionGroups": [],
        "sameFact": true,
        "reason": "同一學生單次具體情境；尚未確定的高三與日期資格不可視為已完成"
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
      "resourceId": "content:18b-t02-06-17",
      "definitionId": "content:18b-t02-06-17",
      "version": "1",
      "topicId": "T02-06",
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
              "text": "面試後訊息，教師住處。學生回想自己被追問轉組理由，懷疑說得太差。",
              "speaker": null,
              "scene": "home:living-room",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "教授問我為什麼轉組，我答得好亂。",
              "speaker": "participant",
              "scene": "home:living-room",
              "cast": [
                {
                  "role": "participant",
                  "position": "center",
                  "expression": "calm"
                }
              ],
              "presentation": "chat"
            }
          ],
          "choices": [
            {
              "id": "clarify",
              "text": "先還原實際提問和作答",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生回想教授真正追問的是轉組後學到什麼，不只是為何轉組。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "教授問我為什麼轉組，我答得好亂。",
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
                  "contacts": [],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生以遠距通訊向導師說明其個人感受；此接觸不代表雙方實際同處一室。"
                    }
                  ]
                }
              }
            },
            {
              "id": "check",
              "text": "整理轉組時的合理考量",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生把當初轉組的考量與後續學習連起來，尚未知道教授如何評價。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "教授問我為什麼轉組，我答得好亂。",
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
                  "contacts": [],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生以遠距通訊向導師說明其個人感受；此接觸不代表雙方實際同處一室。"
                    }
                  ]
                }
              }
            },
            {
              "id": "choice",
              "text": "討論下次遇到追問的練習",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生練習用較簡短的方式說明選擇，保留真實困難而不美化。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "教授問我為什麼轉組，我答得好亂。",
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
                  "contacts": [],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生以遠距通訊向導師說明其個人感受；此接觸不代表雙方實際同處一室。"
                    }
                  ]
                }
              }
            },
            {
              "id": "care",
              "text": "承認面試後反覆懊惱",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "導師理解面試後容易反覆檢討，不以一題的慌張預測落榜。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "教授問我為什麼轉組，我答得好亂。",
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
                  "contacts": [],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生以遠距通訊向導師說明其個人感受；此接觸不代表雙方實際同處一室。"
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
      "id": "content:18b-t02-06-17",
      "topicId": "T02-06",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t02-06-17",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "3-1",
        "2-2",
        "3-3"
      ],
      "additionalCodes": [
        "2-4",
        "4-4",
        "2-3"
      ],
      "weights": [
        0.3333333333333333,
        0.3333333333333333,
        0.08333333333333333,
        0.08333333333333333,
        0.16666666666666666,
        0
      ],
      "directions": [
        -1,
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
          "school",
          "weekend",
          "holiday"
        ],
        "slotIds": [
          "private",
          "evening",
          "afternoon"
        ],
        "from": null,
        "until": null,
        "facts": [],
        "history": [],
        "numeric": [],
        "enrollment": null,
        "grades": [
          3
        ],
        "entrance": [
          {
            "kind": "milestone-completed",
            "value": "application-review"
          },
          {
            "kind": "application-reviewed"
          }
        ]
      },
      "repetition": {
        "cooldownDays": 45,
        "exclusionGroups": [],
        "sameFact": true,
        "reason": "同一學生單次具體情境；尚未確定的高三與日期資格不可視為已完成"
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
      "resourceId": "content:18b-t02-06-18",
      "definitionId": "content:18b-t02-06-18",
      "version": "1",
      "topicId": "T02-06",
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
              "text": "備審校稿時，學生想請同儕看自述的段落順序，卻發現共用連結會讓對方連家庭資料附件一起看到。",
              "speaker": null,
              "scene": "school:counseling",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我只想請他看這一頁，怎麼連家裡的附件都能點開？",
              "speaker": "participant",
              "scene": "school:counseling",
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
              "id": "clarify",
              "text": "先停止分享並確認連結可見範圍",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生關閉不必要的分享權限，目前仍不確定是否已有他人開過附件。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我只想請他看這一頁，怎麼連家裡的附件都能點開？",
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
                      "description": "當事人直接向導師說明本次情況；導師僅知悉其陳述與本次處理。"
                    }
                  ]
                }
              }
            },
            {
              "id": "check",
              "text": "另存不含私人附件的校稿版本",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生準備只含欲校稿段落的副本，不把原始整包檔案交給同學。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我只想請他看這一頁，怎麼連家裡的附件都能點開？",
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
                      "description": "當事人直接向導師說明本次情況；導師僅知悉其陳述與本次處理。"
                    }
                  ]
                }
              }
            },
            {
              "id": "choice",
              "text": "保留版本並檢查正式上傳檔是否受影響",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生分清校稿副本與申請正式檔，尚未自行刪除仍須保留的正式資料。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我只想請他看這一頁，怎麼連家裡的附件都能點開？",
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
                      "description": "當事人直接向導師說明本次情況；導師僅知悉其陳述與本次處理。"
                    }
                  ]
                }
              }
            },
            {
              "id": "care",
              "text": "想請人幫忙，也可以保留自己的界線",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "導師尊重學生選擇分享範圍，沒有要求以家庭隱私交換校稿協助。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我只想請他看這一頁，怎麼連家裡的附件都能點開？",
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
                      "description": "當事人直接向導師說明本次情況；導師僅知悉其陳述與本次處理。"
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
      "id": "content:18b-t02-06-18",
      "topicId": "T02-06",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t02-06-18",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "3-1",
        "2-2",
        "3-3"
      ],
      "additionalCodes": [
        "2-4",
        "4-4",
        "2-3"
      ],
      "weights": [
        0.3333333333333333,
        0.3333333333333333,
        0.3333333333333333,
        0,
        0,
        0
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
          "noon"
        ],
        "from": null,
        "until": "2029-05-14",
        "facts": [],
        "history": [],
        "numeric": [],
        "enrollment": null,
        "grades": [
          3
        ],
        "entrance": [
          {
            "kind": "milestone-completed",
            "value": "application-screen"
          },
          {
            "kind": "application-screened"
          }
        ]
      },
      "repetition": {
        "cooldownDays": 45,
        "exclusionGroups": [],
        "sameFact": true,
        "reason": "同一學生單次具體情境；尚未確定的高三與日期資格不可視為已完成"
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
      "resourceId": "content:18b-t02-06-19",
      "definitionId": "content:18b-t02-06-19",
      "version": "1",
      "topicId": "T02-06",
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
              "text": "午休，校園中庭。學生向導師轉述家長希望購買昂貴面試套裝的意見，自己卻只想穿整潔合適的衣服。",
              "speaker": null,
              "scene": "school:courtyard",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "家長要買很貴的西裝，我只想穿乾淨合適的衣服。",
              "speaker": "participant",
              "scene": "school:courtyard",
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
              "id": "clarify",
              "text": "核對官方面試穿著要求",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生核對官方面試通知，發現未要求昂貴服裝，準備帶回與家長討論；未假定家長已知悉。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "家長要買很貴的西裝，我只想穿乾淨合適的衣服。",
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
                      "description": "本次由學生向導師表達個人看法；其他人未自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "check",
              "text": "討論舒適及適當的穿著",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生比較自己現有衣物與面試需求，沒有立即購買高價套裝。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "家長要買很貴的西裝，我只想穿乾淨合適的衣服。",
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
                      "description": "本次由學生向導師表達個人看法；其他人未自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "choice",
              "text": "整理與家長溝通的理由",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生整理和家長討論舒適及預算的理由，保留自己的穿著感受。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "家長要買很貴的西裝，我只想穿乾淨合適的衣服。",
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
                      "description": "本次由學生向導師表達個人看法；其他人未自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "care",
              "text": "理解家庭期待造成壓力",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "導師理解家長想讓孩子體面，也不把衣服價格當成面試分數。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "家長要買很貴的西裝，我只想穿乾淨合適的衣服。",
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
                      "description": "本次由學生向導師表達個人看法；其他人未自動知情。"
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
      "id": "content:18b-t02-06-19",
      "topicId": "T02-06",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t02-06-19",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "3-1",
        "2-2",
        "3-3"
      ],
      "additionalCodes": [
        "2-4",
        "4-4",
        "2-3"
      ],
      "weights": [
        0.1111111111111111,
        0.4444444444444444,
        0,
        0.1111111111111111,
        0.3333333333333333,
        0
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
        "until": "2029-05-14",
        "facts": [],
        "history": [],
        "numeric": [],
        "enrollment": null,
        "grades": [
          3
        ],
        "entrance": [
          {
            "kind": "milestone-completed",
            "value": "application-screen"
          },
          {
            "kind": "application-screened"
          }
        ]
      },
      "repetition": {
        "cooldownDays": 45,
        "exclusionGroups": [],
        "sameFact": true,
        "reason": "同一學生單次具體情境；尚未確定的高三與日期資格不可視為已完成"
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
      "resourceId": "content:18b-t02-06-20",
      "definitionId": "content:18b-t02-06-20",
      "version": "1",
      "topicId": "T02-06",
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
              "text": "申請入學第一階段通過後，一個上課日早自習，學生在教室向導師說，說想到接下來的面試就緊張得胃痛。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "「我怕到時候一進去就忘記怎麼講話。離面試還有一段時間，我可以先做什麼？」",
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
              "id": "clarify",
              "text": "確認身體狀況及是否需要休息",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生先確認自己身體狀況與可休息的地方，未把胃痛直接當作單純緊張。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "「我怕到時候一進去就忘記怎麼講話。離面試還有一段時間，我可以先做什麼？」",
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
                  "contacts": [],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "本次由學生向導師表達個人看法；其他人未自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "check",
              "text": "協助核對日後面試的正式報到資訊",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生開始核對面試通知上的報到時間、地點及資料要求，沒有假定面試已開始或進入考場。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "「我怕到時候一進去就忘記怎麼講話。離面試還有一段時間，我可以先做什麼？」",
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
                  "contacts": [],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "本次由學生向導師表達個人看法；其他人未自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "choice",
              "text": "提醒若面試當日不舒服可向工作人員求助",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生知道面試當日若身體不適可向現場人員求助，尚未發生任何現場處置。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "「我怕到時候一進去就忘記怎麼講話。離面試還有一段時間，我可以先做什麼？」",
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
                  "contacts": [],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "本次由學生向導師表達個人看法；其他人未自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "care",
              "text": "接住過度等待的焦慮",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "導師回應等待的不安，未以『一定會錄取』之類保證掩蓋現實壓力。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "「我怕到時候一進去就忘記怎麼講話。離面試還有一段時間，我可以先做什麼？」",
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
                  "contacts": [],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "本次由學生向導師表達個人看法；其他人未自動知情。"
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
      "id": "content:18b-t02-06-20",
      "topicId": "T02-06",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t02-06-20",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "3-1",
        "2-2",
        "3-3"
      ],
      "additionalCodes": [
        "2-4",
        "4-4",
        "2-3"
      ],
      "weights": [
        0,
        0.6,
        0.1,
        0.2,
        0.1,
        0
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
        "until": "2029-05-14",
        "facts": [],
        "history": [],
        "numeric": [],
        "enrollment": null,
        "grades": [
          3
        ],
        "entrance": [
          {
            "kind": "milestone-completed",
            "value": "application-screen"
          },
          {
            "kind": "application-screened"
          }
        ]
      },
      "repetition": {
        "cooldownDays": 45,
        "exclusionGroups": [],
        "sameFact": true,
        "reason": "同一學生單次具體情境；尚未確定的高三與日期資格不可視為已完成"
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
      "resourceId": "content:18b-t02-06-21",
      "definitionId": "content:18b-t02-06-21",
      "version": "1",
      "topicId": "T02-06",
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
              "text": "準備申請入學備審資料的某個晚間，學生檢查已上傳的PDF時發現每頁方向都反了，不清楚還能否更換。",
              "speaker": null,
              "scene": "home:bedroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "送出的PDF每頁方向都反了，還能改嗎？",
              "speaker": "participant",
              "scene": "home:bedroom",
              "cast": [
                {
                  "role": "participant",
                  "position": "center",
                  "expression": "calm"
                }
              ],
              "presentation": "chat"
            }
          ],
          "choices": [
            {
              "id": "clarify",
              "text": "確認已提交檔案和狀態",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生確認已送出的 PDF 橫直方向有誤，檔案內容仍須另行檢查。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "送出的PDF每頁方向都反了，還能改嗎？",
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
                  "contacts": [],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "本次由學生向導師表達個人看法；其他人未自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "check",
              "text": "查詢校系正式修正管道",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生核對校系是否允許期限內替換，未直接假設可以重傳。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "送出的PDF每頁方向都反了，還能改嗎？",
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
                  "contacts": [],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "本次由學生向導師表達個人看法；其他人未自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "choice",
              "text": "保存原始正常版本及提交紀錄",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生保留正確方向的原始檔與送件紀錄，尚未獲得更新成功的回條。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "送出的PDF每頁方向都反了，還能改嗎？",
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
                  "contacts": [],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "本次由學生向導師表達個人看法；其他人未自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "care",
              "text": "理解發現格式錯誤的慌張",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "導師理解最後一刻發現格式錯誤的焦躁，不代替校系承諾補件。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "送出的PDF每頁方向都反了，還能改嗎？",
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
                  "contacts": [],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "本次由學生向導師表達個人看法；其他人未自動知情。"
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
      "id": "content:18b-t02-06-21",
      "topicId": "T02-06",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t02-06-21",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "3-1",
        "2-2",
        "3-3"
      ],
      "additionalCodes": [
        "2-4",
        "4-4",
        "2-3"
      ],
      "weights": [
        0,
        0.36363636363636365,
        0.45454545454545453,
        0.09090909090909091,
        0,
        0.09090909090909091
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
          "school",
          "weekend",
          "holiday"
        ],
        "slotIds": [
          "private",
          "evening",
          "afternoon"
        ],
        "from": null,
        "until": "2029-05-14",
        "facts": [],
        "history": [],
        "numeric": [],
        "enrollment": null,
        "grades": [
          3
        ],
        "entrance": [
          {
            "kind": "milestone-completed",
            "value": "application-register"
          },
          {
            "kind": "milestone-completed",
            "value": "application-screen"
          },
          {
            "kind": "application-screened"
          }
        ]
      },
      "repetition": {
        "cooldownDays": 45,
        "exclusionGroups": [],
        "sameFact": true,
        "reason": "同一學生單次具體情境；尚未確定的高三與日期資格不可視為已完成"
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
      "resourceId": "content:18b-t02-06-23",
      "definitionId": "content:18b-t02-06-23",
      "version": "1",
      "topicId": "T02-06",
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
              "text": "申請入學第一階段篩選結果公布後，輔導室。學生取得面試資格卻被旅費與自信困住。",
              "speaker": null,
              "scene": "school:counseling",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "書審通過了，我卻沒有勇氣去面試。",
              "speaker": "participant",
              "scene": "school:counseling",
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
              "id": "clarify",
              "text": "了解害怕的具體原因",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生說明不敢面試既有緊張，也有外縣市交通費的負擔。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "書審通過了，我卻沒有勇氣去面試。",
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
                      "description": "本次由學生向導師表達個人看法；其他人未自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "check",
              "text": "確認旅費交通等現實障礙",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生整理正式面試時間及可行交通方案，尚未確認費用能負擔。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "書審通過了，我卻沒有勇氣去面試。",
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
                      "description": "本次由學生向導師表達個人看法；其他人未自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "choice",
              "text": "討論可以接受的支持安排",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生願意先做小範圍問答練習，是否赴考仍由本人決定。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "書審通過了，我卻沒有勇氣去面試。",
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
                      "description": "本次由學生向導師表達個人看法；其他人未自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "care",
              "text": "肯定通過審查也可以感到害怕",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "導師肯定已進入面試階段的努力，不用羞辱逼學生去考。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "書審通過了，我卻沒有勇氣去面試。",
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
                      "description": "本次由學生向導師表達個人看法；其他人未自動知情。"
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
      "id": "content:18b-t02-06-23",
      "topicId": "T02-06",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t02-06-23",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "3-1",
        "2-2",
        "3-3"
      ],
      "additionalCodes": [
        "2-4",
        "4-4",
        "2-3"
      ],
      "weights": [
        0.25,
        0.4166666666666667,
        0,
        0.16666666666666666,
        0.16666666666666666,
        0
      ],
      "directions": [
        -1,
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
        "until": "2029-05-14",
        "facts": [],
        "history": [],
        "numeric": [],
        "enrollment": null,
        "grades": [
          3
        ],
        "entrance": [
          {
            "kind": "milestone-completed",
            "value": "application-screen"
          },
          {
            "kind": "application-screened"
          }
        ]
      },
      "repetition": {
        "cooldownDays": 45,
        "exclusionGroups": [],
        "sameFact": true,
        "reason": "同一學生單次具體情境；尚未確定的高三與日期資格不可視為已完成"
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
      "resourceId": "content:18b-t02-06-25",
      "definitionId": "content:18b-t02-06-25",
      "version": "1",
      "topicId": "T02-06",
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
              "text": "申請結果公布後，校園談話角落。學生過度以面試分數否定整個高中努力。",
              "speaker": null,
              "scene": "school:counselling-corner",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "面試分數不理想，我是不是高中三年都白費了？",
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
              "id": "clarify",
              "text": "先了解他最在意的評分部分",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生重新看見面試分數只反映本次評量，無法代表整個高中三年。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "面試分數不理想，我是不是高中三年都白費了？",
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
                      "description": "本次由學生向導師表達個人看法；其他人未自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "check",
              "text": "區分一次評量和長期努力",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生核對自己的申請結果與其他管道時程，沒有將低分誤認所有機會結束。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "面試分數不理想，我是不是高中三年都白費了？",
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
                      "description": "本次由學生向導師表達個人看法；其他人未自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "choice",
              "text": "討論其他合法升學可能",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生說出未來想改善的一項表達能力，尚未承諾立刻重來。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "面試分數不理想，我是不是高中三年都白費了？",
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
                      "description": "本次由學生向導師表達個人看法；其他人未自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "care",
              "text": "接住自責的心情",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "導師接住學生將自我價值與分數綁在一起的痛苦，不輕率保證下次成功。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "面試分數不理想，我是不是高中三年都白費了？",
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
                      "description": "本次由學生向導師表達個人看法；其他人未自動知情。"
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
      "id": "content:18b-t02-06-25",
      "topicId": "T02-06",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t02-06-25",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "3-1",
        "2-2",
        "3-3"
      ],
      "additionalCodes": [
        "2-4",
        "4-4",
        "2-3"
      ],
      "weights": [
        0.14285714285714285,
        0.2857142857142857,
        0,
        0.21428571428571427,
        0.2857142857142857,
        0.07142857142857142
      ],
      "directions": [
        -1,
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
        "enrollment": null,
        "grades": [
          3
        ],
        "entrance": [
          {
            "kind": "milestone-completed",
            "value": "application-result"
          },
          {
            "kind": "application-reviewed"
          }
        ]
      },
      "repetition": {
        "cooldownDays": 45,
        "exclusionGroups": [],
        "sameFact": true,
        "reason": "同一學生單次具體情境；尚未確定的高三與日期資格不可視為已完成"
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
      "resourceId": "content:18b-t02-06-26",
      "definitionId": "content:18b-t02-06-26",
      "version": "1",
      "topicId": "T02-06",
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
              "text": "午休，走廊。學生收到不同校系的申請入學結果及後續通知，擔心弄錯備取與確認程序。",
              "speaker": null,
              "scene": "school:corridor",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "好幾個校系的消息混在一起，我怕弄錯哪個備取和確認要先處理。",
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
              "id": "clarify",
              "text": "逐一核對通知和期限",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生把不同校系的通知分開，發現有些是候補、有些是正式錄取資訊。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "好幾個校系的消息混在一起，我怕弄錯哪個備取和確認要先處理。",
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
                      "description": "本次由學生向導師表達個人看法；其他人未自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "check",
              "text": "整理不同校系的正式確認規則",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生逐一核對各校正式回覆與確認期限，沒有將群組轉傳當官方通知。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "好幾個校系的消息混在一起，我怕弄錯哪個備取和確認要先處理。",
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
                      "description": "本次由學生向導師表達個人看法；其他人未自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "choice",
              "text": "保存操作成功的收據",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生保存已完成的操作收據，尚未由導師代替選擇保留哪個校系。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "好幾個校系的消息混在一起，我怕弄錯哪個備取和確認要先處理。",
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
                      "description": "本次由學生向導師表達個人看法；其他人未自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "care",
              "text": "理解多個時程的焦慮",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "導師理解連續訊息令人慌亂，提醒重要的是核對而不是搶快亂按。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "好幾個校系的消息混在一起，我怕弄錯哪個備取和確認要先處理。",
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
                      "description": "本次由學生向導師表達個人看法；其他人未自動知情。"
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
      "id": "content:18b-t02-06-26",
      "topicId": "T02-06",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t02-06-26",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "3-1",
        "2-2",
        "3-3"
      ],
      "additionalCodes": [
        "2-4",
        "4-4",
        "2-3"
      ],
      "weights": [
        0,
        0.36363636363636365,
        0.36363636363636365,
        0.09090909090909091,
        0,
        0.18181818181818182
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
          "noon"
        ],
        "from": null,
        "until": null,
        "facts": [],
        "history": [],
        "numeric": [],
        "enrollment": null,
        "grades": [
          3
        ],
        "entrance": [
          {
            "kind": "milestone-completed",
            "value": "application-result"
          },
          {
            "kind": "application-reviewed"
          },
          {
            "kind": "record-v1",
            "query": "application-mixed-offers",
            "subject": "participant"
          }
        ]
      },
      "repetition": {
        "cooldownDays": 45,
        "exclusionGroups": [],
        "sameFact": true,
        "reason": "同一學生單次具體情境；尚未確定的高三與日期資格不可視為已完成"
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
      "resourceId": "content:18b-t02-06-27",
      "definitionId": "content:18b-t02-06-27",
      "version": "1",
      "topicId": "T02-06",
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
              "text": "面試結束後，家中臥室。學生留下這次面試學到的事，沒有取得想要的結果。",
              "speaker": null,
              "scene": "home:bedroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "沒錄取，但我想寫下這次面試學到的事。",
              "speaker": "participant",
              "scene": "home:bedroom",
              "cast": [
                {
                  "role": "participant",
                  "position": "center",
                  "expression": "calm"
                }
              ],
              "presentation": "chat"
            }
          ],
          "choices": [
            {
              "id": "clarify",
              "text": "請學生說出最意外的發現",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生說最意外的是自己能在陌生教授面前完成回答；落選沒有抹掉這次實際經驗。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "沒錄取，但我想寫下這次面試學到的事。",
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
                  "contacts": [],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "本次由學生向導師表達個人看法；其他人未自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "check",
              "text": "整理下次可改進的提問",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生把沒答清楚的一道追問記在筆記本，沒有假裝自己當時答得很好。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "沒錄取，但我想寫下這次面試學到的事。",
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
                  "contacts": [],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "本次由學生向導師表達個人看法；其他人未自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "choice",
              "text": "尊重學生要留給自己的內容",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生收起那封只打算留給自己的信，導師沒有要求公開或上傳學習歷程。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "沒錄取，但我想寫下這次面試學到的事。",
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
                  "contacts": [],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "本次由學生向導師表達個人看法；其他人未自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "care",
              "text": "肯定願意回顧的勇氣",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生重新讀了一遍寫給自己的第一句話，笑了一下，說下次也許能更自在。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "沒錄取，但我想寫下這次面試學到的事。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [
                  {
                    "role": "participant",
                    "holder": "person",
                    "code": "2-4",
                    "delta": 0.5
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
                  "contacts": [],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "本次由學生向導師表達個人看法；其他人未自動知情。"
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
      "id": "content:18b-t02-06-27",
      "topicId": "T02-06",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t02-06-27",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "3-1",
        "2-2",
        "3-3"
      ],
      "additionalCodes": [
        "2-4",
        "4-4",
        "2-3"
      ],
      "weights": [
        0.2857142857142857,
        0.14285714285714285,
        0.42857142857142855,
        0.14285714285714285,
        0,
        0
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
          "school",
          "weekend",
          "holiday"
        ],
        "slotIds": [
          "private",
          "evening",
          "afternoon"
        ],
        "from": null,
        "until": null,
        "facts": [],
        "history": [],
        "numeric": [],
        "enrollment": null,
        "grades": [
          3
        ],
        "entrance": [
          {
            "kind": "milestone-completed",
            "value": "application-result"
          },
          {
            "kind": "application-reviewed"
          },
          {
            "kind": "record-v1",
            "query": "application-interview-rejected",
            "subject": "participant"
          }
        ]
      },
      "repetition": {
        "cooldownDays": 45,
        "exclusionGroups": [],
        "sameFact": true,
        "reason": "同一學生單次具體情境；尚未確定的高三與日期資格不可視為已完成"
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
      "resourceId": "content:18b-t02-06-28",
      "definitionId": "content:18b-t02-06-28",
      "version": "1",
      "topicId": "T02-06",
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
              "text": "申請結果公布後某個上課日晚間，學生在家中對已取得錄取通知的校系仍有猶疑，家人期待立刻決定。",
              "speaker": null,
              "scene": "home:living-room",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "錄取了，可是我還是不確定要不要去讀。",
              "speaker": "participant",
              "scene": "home:living-room",
              "cast": [
                {
                  "role": "participant",
                  "position": "center",
                  "expression": "calm"
                }
              ],
              "presentation": "chat"
            }
          ],
          "choices": [
            {
              "id": "clarify",
              "text": "理解猶豫來自課程還是生活",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生說明自己對錄取校系的疑慮來自課程內容，而不是單純捨不得同學。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "錄取了，可是我還是不確定要不要去讀。",
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
                  "contacts": [],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "本次由學生向導師表達個人看法；其他人未自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "check",
              "text": "核對保留或放棄資格的期限",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生重新核對入學確認、放棄或備取的正式期限，尚未作出決定。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "錄取了，可是我還是不確定要不要去讀。",
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
                  "contacts": [],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "本次由學生向導師表達個人看法；其他人未自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "choice",
              "text": "討論不同選項的實際代價",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生比較生活環境與學習目標，沒有以家人期待當唯一條件。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "錄取了，可是我還是不確定要不要去讀。",
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
                  "contacts": [],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "本次由學生向導師表達個人看法；其他人未自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "care",
              "text": "接納錄取後仍可思考",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "導師理解錄取後仍可能猶豫，不要求學生立刻表現得非常開心。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "錄取了，可是我還是不確定要不要去讀。",
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
                  "contacts": [],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "本次由學生向導師表達個人看法；其他人未自動知情。"
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
      "id": "content:18b-t02-06-28",
      "topicId": "T02-06",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t02-06-28",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "3-1",
        "2-2",
        "3-3"
      ],
      "additionalCodes": [
        "2-4",
        "4-4",
        "2-3"
      ],
      "weights": [
        0.125,
        0.5,
        0,
        0.125,
        0.25,
        0
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
          "private"
        ],
        "from": null,
        "until": null,
        "facts": [],
        "history": [],
        "numeric": [],
        "enrollment": null,
        "grades": [
          3
        ],
        "entrance": [
          {
            "kind": "milestone-completed",
            "value": "application-result"
          },
          {
            "kind": "application-accepted"
          }
        ]
      },
      "repetition": {
        "cooldownDays": 45,
        "exclusionGroups": [],
        "sameFact": true,
        "reason": "同一學生單次具體情境；尚未確定的高三與日期資格不可視為已完成"
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
  }
];
