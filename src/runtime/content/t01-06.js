// Version 1 isolated authoring assets. Not a production catalogue.
// Authored text source and review provenance: work/18b-t01-06-authoring.json.
export default [
  {
    "story": {
      "resourceId": "content:18b-t01-06-01",
      "definitionId": "content:18b-t01-06-01",
      "version": "1",
      "topicId": "T01-06",
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
              "text": "早自習時，在導師班教室裡，學生拿來一本全是題目與解答的錯題本，說複習時仍不知自己錯在哪。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "抄一題要十分鐘，我都抄完了。",
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
              "text": "遮住答案重做一步",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生當場重做第一個步驟，停在列式處，這次停點被記下，不推論全部錯因。",
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
              "text": "把一頁改成錯因索引",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "教師示範用題號及待確認觀念取代完整抄題，原題仍保留供查。",
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
              "text": "交給科任一個具體問題",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生把卡住的列式寫成問句，尚未得到科任解說。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": "next-contact",
                  "afterDays": 1
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
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
              "text": "本子快成精裝書了，我們先救你的時間",
              "kind": "action",
              "emotional": true,
              "outcome": {
                "fact": "教師以幽默提醒整理成本，提議暫停美化，未否定既有努力。",
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
        },
        {
          "id": "next-contact",
          "pages": [
            {
              "order": 1,
              "text": "隔天早自習，學生帶著原錯題本與自己整理的列式問題，再次找導師討論。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我問了自己兩次，還是卡在這一行。",
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
              "id": "check-evidence",
              "text": "只比對前後兩次本人留下的步驟",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生能出示新寫的列式嘗試，和前一天的停點不同，下一步仍待專科教師確認。",
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
                  "id": "specific-progress",
                  "weight": 3,
                  "modifiers": [
                    {
                      "role": "participant",
                      "holder": "person",
                      "code": "1-4",
                      "influence": 0.5
                    }
                  ],
                  "outcome": {
                    "fact": "學生能出示新寫的列式嘗試，和前一天的停點不同，下一步仍待專科教師確認。",
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
                  "id": "still-unresolved",
                  "weight": 3,
                  "modifiers": [
                    {
                      "role": "participant",
                      "holder": "person",
                      "code": "4-4",
                      "influence": 0.5
                    }
                  ],
                  "outcome": {
                    "fact": "學生仍只有原先抄下的答案，承認尚未試過重新列式，決定先補做一小步。",
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
              "id": "discuss-options",
              "text": "協助將未解處整理成一個科任能回答的問題",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "教師與學生整理出可由本人選擇、而非強制他人配合的下一步，真正成效仍待觀察。",
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
              "id": "preserve-boundary",
              "text": "把這題暫列待學，不讓其他作業因此被擠掉",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生保留可確認的作業或學習紀錄，也保留尚未解決的問題，不將它們寫成已完成。",
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
              "id": "care",
              "text": "肯定願意回來談，而不把未解答視為失敗",
              "kind": "action",
              "emotional": true,
              "outcome": {
                "fact": "教師接住學生的困擾，允許採取適合當下負荷的步驟，沒有保證成績、同儕或科任會照預期反應。",
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
        }
      ]
    },
    "definition": {
      "id": "content:18b-t01-06-01",
      "topicId": "T01-06",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-06-01",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "3-4",
        "2-3",
        "4-1"
      ],
      "additionalCodes": [
        "3-2",
        "3-3",
        "11-2"
      ],
      "weights": [
        0.16,
        0.16,
        0.16,
        0.26,
        0.12,
        0.14
      ],
      "directions": [
        -1,
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
        "player-work"
      ],
      "valence": "neutral"
    }
  },
  {
    "story": {
      "resourceId": "content:18b-t01-06-02",
      "definitionId": "content:18b-t01-06-02",
      "version": "1",
      "topicId": "T01-06",
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
              "text": "午休時，在教師辦公室，學生表示搭車閱讀會暈，卻把每天車程都排成閱讀時間。",
              "speaker": null,
              "scene": "school:teachers-office",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我一下車就很不舒服，表上還寫讀兩章。",
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
              "text": "把閱讀移到能安坐的時間",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "雙方在紙本作息刪去車上閱讀，尚未改變真實交通安排。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我一下車就很不舒服，表上還寫讀兩章。",
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
              "text": "討論能否只聽已準備的重點",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "教師提出不需操作螢幕的聽讀方案，提醒不適便停止，不保證適合學生。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我一下車就很不舒服，表上還寫讀兩章。",
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
              "id": "strategy-3",
              "text": "保留通勤作休息",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生把規劃表的車程標為休息，未因此增加其他時段任務。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我一下車就很不舒服，表上還寫讀兩章。",
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
              "text": "連搭車都要考核，這張表太不饒人了",
              "kind": "action",
              "emotional": true,
              "outcome": {
                "fact": "教師表達心疼，提醒暈車不等於缺乏自律，未診斷身體狀況。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我一下車就很不舒服，表上還寫讀兩章。",
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
      "id": "content:18b-t01-06-02",
      "topicId": "T01-06",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-06-02",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "3-4",
        "2-3",
        "4-1"
      ],
      "additionalCodes": [
        "3-3",
        "7-3",
        "4-2"
      ],
      "weights": [
        0.185,
        0.186,
        0.186,
        0.14,
        0.163,
        0.14
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
      "valence": "negative"
    }
  },
  {
    "story": {
      "resourceId": "content:18b-t01-06-03",
      "definitionId": "content:18b-t01-06-03",
      "version": "1",
      "topicId": "T01-06",
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
              "text": "早自習時，學生把手機複習卡畫面遞給導師：今天到期的卡片六百張，還有一疊今天必須交的作業。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我如果先清完卡片，就沒有時間寫作業；可是那個六百一直提醒我沒做完。",
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
            },
            {
              "order": 3,
              "text": "這是軟體的到期筆數，不等於學生今天必須背完的數量，也不能據此判斷已學會幾張。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            }
          ],
          "choices": [
            {
              "id": "strategy-1",
              "text": "先區分本週必須用到的卡與較遠期內容",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生把與近期課程直接相關的卡片標出，其他未讀卡仍維持未讀，不假裝清空進度。",
                "claims": [],
                "changes": [
                  {
                    "role": "participant",
                    "holder": "person",
                    "code": "2-2",
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
              "id": "strategy-2",
              "text": "讓學生自行選擇是否降低每天新增卡片量",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "教師解釋新卡與舊卡的不同，是否更動個人設定由學生決定，不保證積欠立即消失。",
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
              },
              "variants": [
                {
                  "id": "engages",
                  "weight": 2.8,
                  "outcome": {
                    "fact": "學生自己調低每日新卡上限並保留原有卡片，雖然較安心，六百張積欠仍待分批處理。",
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
                  },
                  "modifiers": [
                    {
                      "role": "participant",
                      "holder": "person",
                      "code": "3-3",
                      "influence": 0.8
                    }
                  ]
                },
                {
                  "id": "hesitates",
                  "weight": 1.5,
                  "outcome": {
                    "fact": "學生決定先觀察兩天，尚未更動任何設定。",
                    "claims": [
                      {
                        "role": "participant",
                        "statement": "我怕調整後漏掉考試範圍。",
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
                      "code": "2-3",
                      "influence": 1.4
                    }
                  ]
                }
              ]
            },
            {
              "id": "strategy-3",
              "text": "只抽五張實際回想，停止用總數猜程度",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生進行五張短抽測，結果只能代表這次抽樣，不能推算其餘五百多張都會或都不會。",
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
              "id": "strategy-4",
              "text": "六百張像催債單，但我們不拿睡眠抵債",
              "kind": "action",
              "emotional": true,
              "outcome": {
                "fact": "教師以幽默承認壓力，提醒學生照顧作息及原有課業，未自行刪除學生的複習資料。",
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
            }
          ],
          "next": null
        }
      ]
    },
    "definition": {
      "id": "content:18b-t01-06-03",
      "topicId": "T01-06",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-06-03",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "3-4",
        "2-3",
        "4-1"
      ],
      "additionalCodes": [
        "3-3",
        "2-2",
        "11-2"
      ],
      "weights": [
        0.24,
        0.23,
        0.17,
        0.13,
        0.16,
        0.07
      ],
      "directions": [
        -1,
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
        "player-work"
      ],
      "valence": "negative"
    }
  },
  {
    "story": {
      "resourceId": "content:18b-t01-06-04",
      "definitionId": "content:18b-t01-06-04",
      "version": "1",
      "topicId": "T01-06",
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
              "text": "早自習時，在導師班教室裡，學生拿混合練習單，表示同類題分開做會，混在一起便選錯方法。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我知道公式，但不知道何時用。",
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
              "id": "strategy-1",
              "text": "先說出選法理由再計算",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生當場為一題說明判斷線索，教師未代算也不斷言整類已掌握。",
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
              "text": "用對照表並排兩種題型",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "雙方圈出兩題的已知條件差異，表格留有待科任確認的部分。",
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
              "text": "帶著選法問題請教科任",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生整理兩題及自己的判斷供詢問，尚未得到診斷。",
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
              "text": "公式都到齊了，現在缺的是指揮交通",
              "kind": "action",
              "emotional": true,
              "outcome": {
                "fact": "教師以比喻回應挫折，邀學生先練辨認不急著求快。",
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
      "id": "content:18b-t01-06-04",
      "topicId": "T01-06",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-06-04",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "3-4",
        "2-3",
        "4-1"
      ],
      "additionalCodes": [
        "3-2",
        "3-3",
        "4-2"
      ],
      "weights": [
        0.184,
        0.163,
        0.163,
        0.204,
        0.143,
        0.143
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
      "resourceId": "content:18b-t01-06-05",
      "definitionId": "content:18b-t01-06-05",
      "version": "1",
      "topicId": "T01-06",
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
              "text": "早自習時，在導師班教室裡，學生出示自習練習，承認每題都先瞄解答，所以不知道能否獨立解。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "一遮起來我就慌。",
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
              "id": "strategy-1",
              "text": "只遮第一步試一次",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生選擇先遮一小段再口述，當下停頓被如實記錄，未被評成考試作弊。",
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
                  "id": "trial-reveals-progress",
                  "weight": 3,
                  "modifiers": [
                    {
                      "role": "participant",
                      "holder": "person",
                      "code": "1-4",
                      "influence": 0.55
                    }
                  ],
                  "outcome": {
                    "fact": "學生遮住第一行解答後仍能自己列出已知條件，願意再獨立試第二步，但沒有被要求一次完成整題。",
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
                  "id": "trial-reveals-gap",
                  "weight": 3,
                  "modifiers": [
                    {
                      "role": "participant",
                      "holder": "person",
                      "code": "4-4",
                      "influence": 0.55
                    }
                  ],
                  "outcome": {
                    "fact": "學生遮住解答便把兩個條件混在一起，先回頭比較題目敘述，不把這次卡住當成不會全部單元。",
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
              "id": "strategy-2",
              "text": "改用延遲看答案的標記",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "教師示範先記猜法與信心再翻頁，學生尚未完成整組練習。",
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
              "text": "把練習分成學習與測驗兩種",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "雙方在紙上區分可看解答的學習題及不看的自測題，不變更正式考規。",
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
              "text": "自習不用演給我看，慌也能先寫下來",
              "kind": "action",
              "emotional": true,
              "outcome": {
                "fact": "教師表達接納，學生知道可保留不會的空格，未獲保證成績會提高。",
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
      "id": "content:18b-t01-06-05",
      "topicId": "T01-06",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-06-05",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "3-4",
        "2-3",
        "4-1"
      ],
      "additionalCodes": [
        "3-3",
        "3-2",
        "4-2"
      ],
      "weights": [
        0.182,
        0.182,
        0.182,
        0.159,
        0.159,
        0.136
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
      "resourceId": "content:18b-t01-06-06",
      "definitionId": "content:18b-t01-06-06",
      "version": "1",
      "topicId": "T01-06",
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
              "text": "早自習時，在導師班教室裡，學生拿物理練習，數值運算大致完成，但常在最後不知道答案的量綱。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我都到最後才補單位。",
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
              "text": "沿著一題追蹤單位",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "雙方用學生提供的題目逐步標記單位，教師未認定所有計算正確。",
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
              "text": "建立作答末端檢核欄",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生在草稿留出量綱檢核欄，是否持續使用仍未知。",
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
              "text": "把概念疑問交科任",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生整理不知道何時換算的步驟，教師不冒充物理科任裁定。",
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
              "text": "數字到終點了，單位還在找路呢",
              "kind": "action",
              "emotional": true,
              "outcome": {
                "fact": "教師以幽默提醒過程標記，沒有將一次疏漏歸因粗心人格。",
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
      "id": "content:18b-t01-06-06",
      "topicId": "T01-06",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-06-06",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "3-4",
        "2-3",
        "4-1"
      ],
      "additionalCodes": [
        "3-3",
        "3-2",
        "4-2"
      ],
      "weights": [
        0.166,
        0.167,
        0.167,
        0.229,
        0.146,
        0.125
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
      "resourceId": "content:18b-t01-06-07",
      "definitionId": "content:18b-t01-06-07",
      "version": "1",
      "topicId": "T01-06",
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
              "text": "早自習時，在導師班教室裡，學生攤開整頁幾乎全黃的閱讀材料，找不到能快速回看的線索。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "每一句好像都會考。",
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
              "id": "strategy-1",
              "text": "先用一段練習下小標",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生用自己的話替一段下標，教師只討論這段是否貼題。",
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
              "text": "限制每段只留一條核心句",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "教師提出在副本試標的做法，不抹掉原稿，也未命令全科照用。",
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
              "text": "改列讀後問題",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生在紙上寫出一個還不懂的問題，尚未得到答案。",
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
              "text": "整頁都發光，重點反而躲起來了",
              "kind": "action",
              "emotional": true,
              "outcome": {
                "fact": "教師用幽默回應，提醒選擇重點需要練習，不責備已做的標記。",
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
      "id": "content:18b-t01-06-07",
      "topicId": "T01-06",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-06-07",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "3-4",
        "2-3",
        "4-1"
      ],
      "additionalCodes": [
        "3-3",
        "3-2",
        "4-2"
      ],
      "weights": [
        0.175,
        0.174,
        0.239,
        0.13,
        0.152,
        0.13
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
      "resourceId": "content:18b-t01-06-08",
      "definitionId": "content:18b-t01-06-08",
      "version": "1",
      "topicId": "T01-06",
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
              "text": "早自習時，在導師班教室裡，學生出示單字卡，表示拼字默寫會，放進句子卻不知怎麼用。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我認得這個字，可是整句看不懂。",
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
              "text": "用手邊例句辨認搭配",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生圈出一個例句的搭配詞，教師未宣告所有語境已掌握。",
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
              "text": "把卡片改成有空格的句子",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "教師示範如何保留來源並挖空，學生尚未改完整副卡片。",
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
              "text": "挑兩個混淆用法問科任",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生把兩句及困惑並列，等待英語科任回應。",
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
              "text": "單字不是單身貴族，得看看它跟誰站一起",
              "kind": "action",
              "emotional": true,
              "outcome": {
                "fact": "教師以幽默引導注意語境，沒有否定拼字練習的用途。",
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
      "id": "content:18b-t01-06-08",
      "topicId": "T01-06",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-06-08",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "3-4",
        "2-3",
        "4-1"
      ],
      "additionalCodes": [
        "3-3",
        "3-2",
        "4-2"
      ],
      "weights": [
        0.185,
        0.186,
        0.186,
        0.14,
        0.163,
        0.14
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
      "resourceId": "content:18b-t01-06-09",
      "definitionId": "content:18b-t01-06-09",
      "version": "1",
      "topicId": "T01-06",
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
              "text": "早自習時，在導師班教室裡，學生拿出連續排滿的週表，說一次臨時家務就讓整週順序失效。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "只要晚半小時，後面全部要重排。",
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
              "text": "為不可預期事件留空格",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "雙方在規劃副本保留一段緩衝，未承諾實際家務會減少。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": "next-contact",
                  "afterDays": 1
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
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
              "text": "將任務分成可移動與固定",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生標出課程期限及自訂練習，教師未替科任延後期限。",
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
              "text": "縮小一天的必做清單",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生自選一項優先工作，其餘保留待辦而非刪成已完成。",
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
              "text": "這張表連意外都沒地方坐，我看著也緊張",
              "kind": "action",
              "emotional": true,
              "outcome": {
                "fact": "教師表達共感並提醒規劃可修，沒有把彈性當作不必履責。",
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
        },
        {
          "id": "next-contact",
          "pages": [
            {
              "order": 1,
              "text": "隔日午餐，學生拿著昨晚實際填過的週表來到教師辦公室；原本的家務安排並未因討論而自動消失。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "有留空格，可是昨天還是被事情塞滿了。",
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
              "id": "check-evidence",
              "text": "核對昨晚真正發生的中斷與時間",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生找到可以移動的一項自訂複習，保留必要的家務與課程期限，接受當天不會全完成。",
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
                  "id": "specific-progress",
                  "weight": 3,
                  "modifiers": [
                    {
                      "role": "participant",
                      "holder": "person",
                      "code": "1-4",
                      "influence": 0.5
                    }
                  ],
                  "outcome": {
                    "fact": "學生找到可以移動的一項自訂複習，保留必要的家務與課程期限，接受當天不會全完成。",
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
                  "id": "still-unresolved",
                  "weight": 3,
                  "modifiers": [
                    {
                      "role": "participant",
                      "holder": "person",
                      "code": "4-4",
                      "influence": 0.5
                    }
                  ],
                  "outcome": {
                    "fact": "學生發現固定期限仍衝突，決定列出哪件需要向權責教師具體說明，未假定能延後。",
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
              "id": "discuss-options",
              "text": "把本日必交與可延後的自訂內容重新排序",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "教師與學生整理出可由本人選擇、而非強制他人配合的下一步，真正成效仍待觀察。",
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
              "id": "preserve-boundary",
              "text": "保留未完成項目，不以刪掉紀錄假裝進度",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生保留可確認的作業或學習紀錄，也保留尚未解決的問題，不將它們寫成已完成。",
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
              "id": "care",
              "text": "接住學生對失控的挫折，避免要求補償性熬夜",
              "kind": "action",
              "emotional": true,
              "outcome": {
                "fact": "教師接住學生的困擾，允許採取適合當下負荷的步驟，沒有保證成績、同儕或科任會照預期反應。",
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
        }
      ]
    },
    "definition": {
      "id": "content:18b-t01-06-09",
      "topicId": "T01-06",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-06-09",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "3-4",
        "2-3",
        "4-1"
      ],
      "additionalCodes": [
        "1-1",
        "3-3",
        "3-2"
      ],
      "weights": [
        0.157,
        0.157,
        0.157,
        0.196,
        0.196,
        0.137
      ],
      "directions": [
        -1,
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
      "valence": "neutral"
    }
  },
  {
    "story": {
      "resourceId": "content:18b-t01-06-10",
      "definitionId": "content:18b-t01-06-10",
      "version": "1",
      "topicId": "T01-06",
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
              "text": "早自習時，在導師班教室裡，學生展示影片播放紀錄，說用兩倍速看完一整章，卻答不出練習。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "看完都覺得懂，關掉就空白。",
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
              "id": "strategy-1",
              "text": "停在一段口述推理",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生關掉字幕嘗試說明一個步驟，停點被指出，未推論整章都不會。",
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
              "text": "每段加入停播練習",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "教師提議看完一段先做對應題，不保證影片本身品質。",
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
              "text": "先用課本核對影片範圍",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "雙方比對章節標題，未驗證影片的每個論點。",
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
              "text": "進度條跑得快，不代表腦袋也搭同班車",
              "kind": "action",
              "emotional": true,
              "outcome": {
                "fact": "教師以幽默提醒主動回想，沒有將觀看速度與能力畫等號。",
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
      "id": "content:18b-t01-06-10",
      "topicId": "T01-06",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-06-10",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "3-4",
        "2-3",
        "4-1"
      ],
      "additionalCodes": [
        "8-3",
        "3-2",
        "3-3"
      ],
      "weights": [
        0.15,
        0.151,
        0.151,
        0.208,
        0.208,
        0.132
      ],
      "directions": [
        -1,
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
      "valence": "neutral"
    }
  },
  {
    "story": {
      "resourceId": "content:18b-t01-06-11",
      "definitionId": "content:18b-t01-06-11",
      "version": "1",
      "topicId": "T01-06",
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
              "text": "午餐時，在教學大樓走廊，學生說讀書會多半在聊天，想繼續見朋友又怕讀書沒進度。",
              "speaker": null,
              "scene": "school:corridor",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "不約好像很無情，約了又沒讀到。",
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
              "text": "把社交與共讀時段分開",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生在提案列出先聊後各讀的時間，尚未取得朋友同意。",
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
              "text": "試提輪流解一題的形式",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "教師示範一輪的規則，不代替缺席成員承諾參加。",
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
                  "stage": "next-contact",
                  "afterDays": 1
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
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
              "text": "暫用個人讀書並保留聯絡",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生擬出本週先獨讀的訊息，尚未送出或獲回應。",
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
              "text": "朋友值得見，進度也不用假裝有長大",
              "kind": "action",
              "emotional": true,
              "outcome": {
                "fact": "教師回應兩難，學生未被要求證明朋友拖累自己。",
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
        },
        {
          "id": "next-contact",
          "pages": [
            {
              "order": 1,
              "text": "隔日，學生帶著自己擬好的輪流解題提案，在走廊說起朋友的回應；導師不在讀書會現場。",
              "speaker": null,
              "scene": "school:corridor",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "有人說好，也有人說我們聚會就是想聊天。",
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
              "id": "check-evidence",
              "text": "只記錄學生親自聽到的回應，不替缺席朋友發言",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生回報至少一名朋友願意試短時間輪流解題，決定由同學自己協商，不由導師替整組訂規則。",
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
                  "id": "specific-progress",
                  "weight": 3,
                  "modifiers": [
                    {
                      "role": "participant",
                      "holder": "person",
                      "code": "1-4",
                      "influence": 0.5
                    }
                  ],
                  "outcome": {
                    "fact": "學生回報至少一名朋友願意試短時間輪流解題，決定由同學自己協商，不由導師替整組訂規則。",
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
                  "id": "still-unresolved",
                  "weight": 3,
                  "modifiers": [
                    {
                      "role": "participant",
                      "holder": "person",
                      "code": "4-4",
                      "influence": 0.5
                    }
                  ],
                  "outcome": {
                    "fact": "學生表示多數朋友只想維持聚會，決定保留友情並另排個人學習，沒有責怪他人拖累。",
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
              "id": "discuss-options",
              "text": "討論一個自願而非強制的試行方法",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "教師與學生整理出可由本人選擇、而非強制他人配合的下一步，真正成效仍待觀察。",
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
              "id": "preserve-boundary",
              "text": "允許保留聚會並另安排讀書時間",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生保留可確認的作業或學習紀錄，也保留尚未解決的問題，不將它們寫成已完成。",
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
              "id": "care",
              "text": "承認維繫友情和學業並不需要二選一",
              "kind": "action",
              "emotional": true,
              "outcome": {
                "fact": "教師接住學生的困擾，允許採取適合當下負荷的步驟，沒有保證成績、同儕或科任會照預期反應。",
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
        }
      ]
    },
    "definition": {
      "id": "content:18b-t01-06-11",
      "topicId": "T01-06",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-06-11",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "3-4",
        "2-3",
        "4-1"
      ],
      "additionalCodes": [
        "9-2",
        "6-1",
        "9-3"
      ],
      "weights": [
        0.146,
        0.145,
        0.145,
        0.2,
        0.182,
        0.182
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
        "classroom",
        "participant",
        "participant"
      ],
      "valence": "neutral"
    }
  },
  {
    "story": {
      "resourceId": "content:18b-t01-06-13",
      "definitionId": "content:18b-t01-06-13",
      "version": "1",
      "topicId": "T01-06",
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
              "text": "早自習時，在導師班教室裡，學生背出地理口訣，遇到方向轉換的圖便無法判讀。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "字都背得出來，圖一轉就不會了。",
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
              "text": "把口訣逐字連回圖示",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生在一張圖標記對應關係，教師未替科任判定概念正確。",
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
              "text": "換一張圖先描述再套口訣",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生嘗試描述圖上的方向，停在不確定處，未被要求猜成確定。",
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
              "text": "將兩張圖帶給科任詢問",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "雙方寫出「轉向後哪個基準不變」的問題，等待專科解說。",
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
              "text": "口訣像導航，地圖轉了還是得看路",
              "kind": "action",
              "emotional": true,
              "outcome": {
                "fact": "教師以比喻回應，不要求學生丟掉所有記憶技巧。",
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
      "id": "content:18b-t01-06-13",
      "topicId": "T01-06",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-06-13",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "3-4",
        "2-3",
        "4-1"
      ],
      "additionalCodes": [
        "3-3",
        "3-2",
        "4-2"
      ],
      "weights": [
        0.205,
        0.182,
        0.182,
        0.136,
        0.159,
        0.136
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
      "resourceId": "content:18b-t01-06-14",
      "definitionId": "content:18b-t01-06-14",
      "version": "1",
      "topicId": "T01-06",
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
              "text": "早自習時，在導師班教室裡，學生自述用手機讀課文時常跳通知，紙本又不方便查字。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我不想一刀切都不用手機。",
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
              "text": "試用離線單一文件",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "教師說明先下載文件再關閉非必要通知，由學生決定是否測試。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我不想一刀切都不用手機。",
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
              "id": "strategy-2",
              "text": "紙本閱讀另列查字清單",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生在紙上列出待查字，尚未完成閱讀或查詢。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我不想一刀切都不用手機。",
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
              "id": "strategy-3",
              "text": "比較兩次短練習的干擾",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "雙方擬定同長度的觀察方式，不將一次結果推廣為永久習慣。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我不想一刀切都不用手機。",
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
              "text": "手機什麼都會，偏偏也很會叫人分心",
              "kind": "action",
              "emotional": true,
              "outcome": {
                "fact": "教師以幽默表達理解，未要求交出密碼或檢查私訊。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我不想一刀切都不用手機。",
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
      "id": "content:18b-t01-06-14",
      "topicId": "T01-06",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-06-14",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "3-4",
        "2-3",
        "4-1"
      ],
      "additionalCodes": [
        "7-3",
        "3-3",
        "3-2"
      ],
      "weights": [
        0.16,
        0.16,
        0.16,
        0.26,
        0.12,
        0.14
      ],
      "directions": [
        -1,
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
      "resourceId": "content:18b-t01-06-15",
      "definitionId": "content:18b-t01-06-15",
      "version": "1",
      "topicId": "T01-06",
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
              "text": "午休時，在教師辦公室，學生說昨夜卡在一題數學兩小時，其他已會的功課因此沒開始。",
              "speaker": null,
              "scene": "school:teachers-office",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "放下就像認輸。",
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
              "text": "設定卡題停損記號",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生在題旁寫下已試方法，未解出題目也未被視為失敗。",
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
              "text": "先完成其他有期限工作",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "教師協助辨認期限，學生自行排順序，不替任課取消難題。",
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
              "text": "把卡住的推理整理給科任",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生保留錯誤嘗試並寫出具體問點，尚未收到解答。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": "next-contact",
                  "afterDays": 1
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
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
              "text": "題目沒有贏，你也不用陪它熬整晚",
              "kind": "action",
              "emotional": true,
              "outcome": {
                "fact": "教師以幽默支持休息，未保證跳題就能拿高分。",
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
        },
        {
          "id": "next-contact",
          "pages": [
            {
              "order": 1,
              "text": "隔天午休，學生帶著昨晚保留的卡題草稿回到教師辦公室；原題是否已解開尚未確認。",
              "speaker": null,
              "scene": "school:teachers-office",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我有寫下做到哪一步，但還是想把它硬算完。",
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
              "id": "check-evidence",
              "text": "讓學生指出上一個真正不理解的步驟",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生找到卡住的條件轉換並寫出一個可詢問的問題，暫時停止無效重算，尚未取得正解。",
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
                  "id": "specific-progress",
                  "weight": 3,
                  "modifiers": [
                    {
                      "role": "participant",
                      "holder": "person",
                      "code": "1-4",
                      "influence": 0.5
                    }
                  ],
                  "outcome": {
                    "fact": "學生找到卡住的條件轉換並寫出一個可詢問的問題，暫時停止無效重算，尚未取得正解。",
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
                  "id": "still-unresolved",
                  "weight": 3,
                  "modifiers": [
                    {
                      "role": "participant",
                      "holder": "person",
                      "code": "4-4",
                      "influence": 0.5
                    }
                  ],
                  "outcome": {
                    "fact": "學生仍在重複同一種代入，改為標記需要科任解釋的起點，沒有因此被判定能力不足。",
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
              "id": "discuss-options",
              "text": "核對昨晚是否完成其他有期限作業",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "教師與學生整理出可由本人選擇、而非強制他人配合的下一步，真正成效仍待觀察。",
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
              "id": "preserve-boundary",
              "text": "保留錯誤嘗試供之後請教科任",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生保留可確認的作業或學習紀錄，也保留尚未解決的問題，不將它們寫成已完成。",
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
              "id": "care",
              "text": "提醒停損是時間安排，不是放棄理解",
              "kind": "action",
              "emotional": true,
              "outcome": {
                "fact": "教師接住學生的困擾，允許採取適合當下負荷的步驟，沒有保證成績、同儕或科任會照預期反應。",
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
        }
      ]
    },
    "definition": {
      "id": "content:18b-t01-06-15",
      "topicId": "T01-06",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-06-15",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "3-4",
        "2-3",
        "4-1"
      ],
      "additionalCodes": [
        "3-3",
        "2-2",
        "4-2"
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
      "resourceId": "content:18b-t01-06-16",
      "definitionId": "content:18b-t01-06-16",
      "version": "1",
      "topicId": "T01-06",
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
              "text": "早自習時，在導師班教室裡，學生拿練習清單，發現勾選的都是熟悉題，陌生題從未開始。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "熟題做起來才覺得有在讀。",
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
              "id": "strategy-1",
              "text": "挑一題陌生題只讀條件",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生當場圈出已知及未知，未要求立刻解完。",
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
              "text": "把練習配額分熟悉與新題",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "教師提議保留熟題暖身並加入少量新題，學生尚未採行。",
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
              "text": "先讓科任協助挑難度",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生寫下希望練的觀念及卡點，未把所有陌生題視為超綱。",
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
              "text": "熟題很有安全感，我們幫新題留張小椅子",
              "kind": "action",
              "emotional": true,
              "outcome": {
                "fact": "教師以溫和比喻回應焦慮，不貶低既有熟練。",
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
      "id": "content:18b-t01-06-16",
      "topicId": "T01-06",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-06-16",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "3-4",
        "2-3",
        "4-1"
      ],
      "additionalCodes": [
        "3-3",
        "3-2",
        "4-2"
      ],
      "weights": [
        0.166,
        0.167,
        0.25,
        0.146,
        0.146,
        0.125
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
      "resourceId": "content:18b-t01-06-17",
      "definitionId": "content:18b-t01-06-17",
      "version": "1",
      "topicId": "T01-06",
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
              "text": "午餐時，在教學大樓走廊，學生出示一週自記，早上回想較清楚，晚上則常在同頁停留。",
              "speaker": null,
              "scene": "school:corridor",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "是不是我晚上就不適合讀書？",
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
              "text": "先查兩時段的任務是否相同",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "雙方發現比較條件尚未對齊，不把一週自記當成固定生理結論。",
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
              "text": "嘗試把新內容放精神較好時",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "教師提出短期調整，仍尊重課表與睡眠，不要求更早起。",
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
              "text": "保留晚間作輕量回顧",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生在試行表把晚間改列回顧，尚未執行或改善成績。",
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
              "text": "先別替晚上的自己宣判無能",
              "kind": "action",
              "emotional": true,
              "outcome": {
                "fact": "教師表達關切並提醒狀態可變，不診斷作息類型。",
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
      "id": "content:18b-t01-06-17",
      "topicId": "T01-06",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-06-17",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "3-4",
        "2-3",
        "4-1"
      ],
      "additionalCodes": [
        "3-3",
        "7-4",
        "4-2"
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
      "resourceId": "content:18b-t01-06-18",
      "definitionId": "content:18b-t01-06-18",
      "version": "1",
      "topicId": "T01-06",
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
              "text": "早自習時，在導師班教室裡，學生說忙著抄投影片時常漏聽解釋，但不抄又怕沒資料。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "老師換頁我就來不及想。",
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
              "text": "用關鍵詞取代逐字抄錄",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "教師在空白紙示範留缺口及問號，不改任課要求。",
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
              "text": "確認教材是否可合法取得",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生擬出詢問課後講義或拍攝規則的問題，尚未獲准錄影。",
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
              "text": "課後補一個不懂處",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生選出一段需要補問的內容，未追認當時已理解。",
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
              "text": "手在趕進度，腦袋也需要等紅燈",
              "kind": "action",
              "emotional": true,
              "outcome": {
                "fact": "教師以幽默承接壓力，不將未抄全當成不認真。",
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
      "id": "content:18b-t01-06-18",
      "topicId": "T01-06",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-06-18",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "3-4",
        "2-3",
        "4-1"
      ],
      "additionalCodes": [
        "3-2",
        "9-2",
        "3-3"
      ],
      "weights": [
        0.196,
        0.143,
        0.143,
        0.232,
        0.179,
        0.107
      ],
      "directions": [
        -1,
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
      "resourceId": "content:18b-t01-06-19",
      "definitionId": "content:18b-t01-06-19",
      "version": "1",
      "topicId": "T01-06",
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
              "text": "午餐時，在校園談話角落，學生出示自己的考卷，說每次收進抽屜後都不再翻，下一次又錯相似題。",
              "speaker": null,
              "scene": "school:counselling-corner",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "一看到紅字就不想看。",
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
              "text": "只挑一題能承受的錯誤",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生自選一題並指出看不懂的步驟，沒有被迫一次面對整份。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "一看到紅字就不想看。",
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
              "text": "遮住總分看作答過程",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生在副本遮住分數，教師未修改原始卷面或正式成績。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "一看到紅字就不想看。",
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
              "id": "strategy-3",
              "text": "另約短時間與科任檢討",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "教師協助擬出詢問內容，尚未取得任課的時間承諾。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "一看到紅字就不想看。",
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
                  "stage": "next-contact",
                  "afterDays": 1
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
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
              "text": "紅字很刺眼，我們不用一口氣全吞",
              "kind": "action",
              "emotional": true,
              "outcome": {
                "fact": "教師表達理解，讓學生可先停下，沒有宣告心理問題已消失。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "一看到紅字就不想看。",
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
        },
        {
          "id": "next-contact",
          "pages": [
            {
              "order": 1,
              "text": "隔日午餐，學生在談話角落拿出自己選的一題考卷；是否已約到科任仍未知。",
              "speaker": null,
              "scene": "school:counselling-corner",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我有圈出來，可是想到要再看整份就很煩。",
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
              "id": "check-evidence",
              "text": "尊重學生只願看一題的界線",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生只處理自己選中的一題，找到能描述給科任的疑問，決定不擴充到整張卷。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "一看到紅字就不想看。",
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
              },
              "variants": [
                {
                  "id": "specific-progress",
                  "weight": 3,
                  "modifiers": [
                    {
                      "role": "participant",
                      "holder": "person",
                      "code": "1-4",
                      "influence": 0.5
                    }
                  ],
                  "outcome": {
                    "fact": "學生只處理自己選中的一題，找到能描述給科任的疑問，決定不擴充到整張卷。",
                    "claims": [
                      {
                        "role": "participant",
                        "statement": "一看到紅字就不想看。",
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
                  "id": "still-unresolved",
                  "weight": 3,
                  "modifiers": [
                    {
                      "role": "participant",
                      "holder": "person",
                      "code": "4-4",
                      "influence": 0.5
                    }
                  ],
                  "outcome": {
                    "fact": "學生今天仍不想重看錯誤，選擇保存問題並約定自己願意再談的時候，未被強迫完成。",
                    "claims": [
                      {
                        "role": "participant",
                        "statement": "一看到紅字就不想看。",
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
              ]
            },
            {
              "id": "discuss-options",
              "text": "協助整理一個可自願詢問的具體問題",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "教師與學生整理出可由本人選擇、而非強制他人配合的下一步，真正成效仍待觀察。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "一看到紅字就不想看。",
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
              "id": "preserve-boundary",
              "text": "保留原始考卷與分數，不公開給同儕",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生保留可確認的作業或學習紀錄，也保留尚未解決的問題，不將它們寫成已完成。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "一看到紅字就不想看。",
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
              "id": "care",
              "text": "關心學生當下負荷，不以今天是否完成檢討定義成敗",
              "kind": "action",
              "emotional": true,
              "outcome": {
                "fact": "教師接住學生的困擾，允許採取適合當下負荷的步驟，沒有保證成績、同儕或科任會照預期反應。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "一看到紅字就不想看。",
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
          ]
        }
      ]
    },
    "definition": {
      "id": "content:18b-t01-06-19",
      "topicId": "T01-06",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-06-19",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "3-4",
        "2-3",
        "4-1"
      ],
      "additionalCodes": [
        "3-3",
        "3-2",
        "4-2"
      ],
      "weights": [
        0.169,
        0.17,
        0.277,
        0.128,
        0.128,
        0.128
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
      "resourceId": "content:18b-t01-06-20",
      "definitionId": "content:18b-t01-06-20",
      "version": "1",
      "topicId": "T01-06",
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
              "text": "早自習時，在導師班教室裡，學生出示用同一種摘要表整理的歷史與數學，說數學步驟常被省掉。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "方法不是學會一種就都能用嗎？",
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
              "text": "比較兩科要保留的資訊",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "雙方指出摘要與推導步驟不同，未斷言某科只適合一種學法。",
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
              "text": "為計算題多留中間步驟",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生在一題副本補列自己的步驟，尚不代表解答正確。",
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
              "text": "先保留有效部分再請科任回饋",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生整理目前有效及失效處，沒有把整套方法一律丟棄。",
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
              "text": "一把工具很好用，也不用每道菜都拿它切",
              "kind": "action",
              "emotional": true,
              "outcome": {
                "fact": "教師以比喻回應，提醒依任務調整而非追求萬用秘方。",
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
      "id": "content:18b-t01-06-20",
      "topicId": "T01-06",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-06-20",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "3-4",
        "2-3",
        "4-1"
      ],
      "additionalCodes": [
        "3-2",
        "3-3",
        "11-2"
      ],
      "weights": [
        0.216,
        0.157,
        0.157,
        0.196,
        0.137,
        0.137
      ],
      "directions": [
        -1,
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
        "player-work"
      ],
      "valence": "neutral"
    }
  },
  {
    "story": {
      "resourceId": "content:18b-t01-06-21",
      "definitionId": "content:18b-t01-06-21",
      "version": "1",
      "topicId": "T01-06",
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
              "text": "午餐時，在校園談話角落，學生自述睡前想回顧重點，結果一直列出沒讀完的事情而更晚睡。",
              "speaker": null,
              "scene": "school:counselling-corner",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "說是複習，最後都在算欠多少。",
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
              "text": "將待辦移到白天整理",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "雙方在規劃副本把清單整理改到放學前，不要求犧牲睡眠。",
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
              "text": "只留一個已學重點",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "教師提出簡短回顧並可停止的做法，不保證適用或治療睡眠問題。",
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
              "text": "先暫停睡前學習觀察休息",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生考慮暫停，不被視為已改善；持續影響生活可再尋求校內協助。",
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
                  "weight": 1.7,
                  "modifiers": [
                    {
                      "role": "participant",
                      "holder": "person",
                      "code": "3-3",
                      "influence": 0.75
                    }
                  ],
                  "outcome": {
                    "fact": "學生考慮暫停睡前清單，決定今晚先把待辦留到白天；實際睡眠改善尚待觀察。",
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
                  "weight": 2.9,
                  "modifiers": [
                    {
                      "role": "participant",
                      "holder": "person",
                      "code": "2-2",
                      "influence": 1.2
                    }
                  ],
                  "outcome": {
                    "fact": "學生尚未決定停用睡前清單，先觀察自己的負擔感受，不能當作睡眠問題已改善。",
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
              "text": "睡前還開檢討會，難怪腦袋不下班",
              "kind": "action",
              "emotional": true,
              "outcome": {
                "fact": "教師以幽默表達擔心，未診斷失眠原因或替學生用藥。",
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
      "id": "content:18b-t01-06-21",
      "topicId": "T01-06",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-06-21",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "3-4",
        "2-3",
        "4-1"
      ],
      "additionalCodes": [
        "3-3",
        "2-2",
        "7-4"
      ],
      "weights": [
        0.156,
        0.157,
        0.157,
        0.216,
        0.196,
        0.118
      ],
      "directions": [
        -1,
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
      "valence": "negative"
    }
  },
  {
    "story": {
      "resourceId": "content:18b-t01-06-22",
      "definitionId": "content:18b-t01-06-22",
      "version": "1",
      "topicId": "T01-06",
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
              "text": "早自習時，在導師班教室裡，學生出示照網路範例畫的概念圖，卻說不出其中箭頭代表什麼。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "畫起來很像會了，但我不知道這條線。",
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
              "id": "strategy-1",
              "text": "只解釋一條連線",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生嘗試口述一條箭頭的意義，教師保留不確定標記。",
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
              "text": "把不能解釋的連線先改成問號虛線",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生在副本改用虛線與問號，不破壞原參考來源。",
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
              "text": "把連線疑問交專科教師",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生附上原圖來源及問題，尚未取得學科判讀。",
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
              "text": "圖很漂亮，箭頭也得有自己的台詞",
              "kind": "action",
              "emotional": true,
              "outcome": {
                "fact": "教師以幽默提醒可解釋性，未將美觀視為沒有學習價值。",
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
      "id": "content:18b-t01-06-22",
      "topicId": "T01-06",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-06-22",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "3-4",
        "2-3",
        "4-1"
      ],
      "additionalCodes": [
        "3-2",
        "3-3",
        "11-2"
      ],
      "weights": [
        0.17,
        0.17,
        0.17,
        0.213,
        0.128,
        0.149
      ],
      "directions": [
        -1,
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
        "player-work"
      ],
      "valence": "neutral"
    }
  }
];
