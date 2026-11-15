// Version 1 isolated authoring assets. Not a production catalogue.
// Authored text source and review provenance: work/18b-t01-03-authoring.json.
export default [
  {
    "story": {
      "resourceId": "content:18b-t01-03-01",
      "definitionId": "content:18b-t01-03-01",
      "version": "1",
      "topicId": "T01-03",
      "status": "engineering-test",
      "choiceContract": "four-v2",
      "entry": "opening",
      "stages": [
        {
          "id": "opening",
          "pages": [
            {
              "order": 1,
              "text": "早自習，學生從書包底部抽出一份寫好的作業。繳交期限是昨天，他說直到今早才發現紙還在。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我真的有寫，但現在拿去會不會像是在找藉口？",
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
            },
            {
              "order": 3,
              "text": "已完成作業和按時交到科任手上是兩件事；科任是否接受補交尚未確認。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            }
          ],
          "choices": [
            {
              "id": "verify",
              "text": "確認手上作業與公開的繳交規則",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "教師與學生核對目前能出示的完成部分和期限，沒有因作業寫好就宣告準時繳交。",
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
              "id": "refer",
              "text": "讓學生自己向科任說明，導師協助準備",
              "kind": "support",
              "emotional": false,
              "outcome": {
                "fact": "學生整理忘記交件的經過與補交詢問，是否送出、是否採計仍未確定。",
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
              },
              "variants": [
                {
                  "id": "engages",
                  "weight": 2.7,
                  "outcome": {
                    "fact": "學生寫好向科任說明忘記繳交的草稿，尚未送達或獲核准。",
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
                  },
                  "modifiers": [
                    {
                      "role": "participant",
                      "holder": "person",
                      "code": "1-1",
                      "influence": 1.2
                    }
                  ]
                },
                {
                  "id": "hesitates",
                  "weight": 2,
                  "outcome": {
                    "fact": "學生暫時保留作業，未送出補交詢問。",
                    "claims": [
                      {
                        "role": "participant",
                        "statement": "我擔心科任覺得我在找藉口。",
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
                      "code": "4-2",
                      "influence": 1.1
                    }
                  ]
                }
              ],
              "replacement": {
                "id": "refer-guided",
                "text": "協助學生整理交由科任判定的補交說明",
                "kind": "support",
                "emotional": false,
                "outcome": {
                  "fact": "導師協助學生列出作業完成頁碼、原訂期限與忘記繳交的經過，由學生自行詢問科任，尚未獲得准許。",
                  "claims": [],
                  "changes": [
                    {
                      "role": "participant",
                      "holder": "person",
                      "code": "2-2",
                      "delta": -3
                    },
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
                },
                "requires": [
                  {
                    "type": "numeric",
                    "role": "teacher",
                    "holder": "person",
                    "code": "3-2",
                    "min": 60,
                    "max": 100
                  }
                ],
                "variants": [
                  {
                    "id": "willing-to-ask",
                    "weight": 2.5,
                    "modifiers": [
                      {
                        "role": "participant",
                        "holder": "person",
                        "code": "1-1",
                        "influence": 1.2
                      }
                    ],
                    "outcome": {
                      "fact": "學生當面寫完補交說明並決定自己向科任詢問，仍未宣稱科任已收到或准許。",
                      "claims": [],
                      "changes": [
                        {
                          "role": "participant",
                          "holder": "person",
                          "code": "2-2",
                          "delta": -3
                        },
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
                  },
                  {
                    "id": "not-ready",
                    "weight": 1.6,
                    "modifiers": [
                      {
                        "role": "participant",
                        "holder": "person",
                        "code": "2-2",
                        "influence": 1.2
                      }
                    ],
                    "outcome": {
                      "fact": "學生將補交說明收好，暫時不敢送出；老師尊重意願且沒有擅自替他送件。",
                      "claims": [],
                      "changes": [
                        {
                          "role": "participant",
                          "holder": "person",
                          "code": "2-2",
                          "delta": -1
                        },
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
                      },
                      "relationshipChanges": []
                    }
                  }
                ]
              }
            },
            {
              "id": "document",
              "text": "先替下次設計一個學生自己做得到的提醒",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生選擇一種繳交前的自我檢查方式，但不能用它抵銷昨天的缺交紀錄。",
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
              "id": "empathy",
              "text": "寫了卻留在書包裡，換我也會很嘔",
              "kind": "action",
              "emotional": true,
              "outcome": {
                "fact": "教師理解學生的懊惱，也告知導師不能保證科任會補登成績。",
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
        },
        {
          "id": "next-contact",
          "pages": [
            {
              "order": 1,
              "text": "隔天早自習，學生又帶著作業和先前整理的說明來找導師。你目前還看不到科任的正式處理結果。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我想問清楚，可是還沒看到老師的回覆。",
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
              "id": "follow-1",
              "text": "核對他是否真的送出了說明",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "教師只核對學生能提出的實際送件證據，不將未送出的草稿當成已收件。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我昨天準備的補交說明還沒得到科任回覆，現在不知道能不能採計。",
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
                      "description": "學生當面向導師說明自己目前的顧慮與想法。"
                    }
                  ]
                }
              }
            },
            {
              "id": "follow-2",
              "text": "整理能向科任確認的補交規則",
              "kind": "support",
              "emotional": false,
              "outcome": {
                "fact": "學生列出期限、收件與採計疑問，最終決定仍由科任依校規處理。",
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
              "id": "follow-3",
              "text": "先保留未確認事項，暫不推論結果",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "教師記得仍待確認的部分，沒有因過了一晚就假定成功或失敗。",
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
              "id": "follow-4",
              "text": "至少你沒有把這件事一路藏到學期末",
              "kind": "action",
              "emotional": true,
              "outcome": {
                "fact": "教師肯定學生願意面對問題，不把勇氣直接換算成正式分數。",
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
            }
          ],
          "next": null
        }
      ],
      "compilerContract": 2
    },
    "definition": {
      "id": "content:18b-t01-03-01",
      "topicId": "T01-03",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-03-01",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "1-1",
        "4-2",
        "2-2"
      ],
      "additionalCodes": [
        "3-3",
        "2-3",
        "11-2"
      ],
      "weights": [
        0.11,
        0.23,
        0.23,
        0.15,
        0.18,
        0.1
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
        "player-work"
      ],
      "valence": "negative"
    }
  },
  {
    "story": {
      "resourceId": "content:18b-t01-03-02",
      "definitionId": "content:18b-t01-03-02",
      "version": "1",
      "topicId": "T01-03",
      "status": "engineering-test",
      "choiceContract": "four-v2",
      "entry": "opening",
      "stages": [
        {
          "id": "opening",
          "pages": [
            {
              "order": 1,
              "text": "午休時，在教師辦公室，學生展示昨晚的上傳錯誤畫面，擔心系統故障造成遲交。",
              "speaker": null,
              "scene": "school:teachers-office",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我有按送出，可是一直轉圈圈。",
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
              "text": "一起查看可取得的正式平台公告",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "教師陪學生查看正式公告入口；目前未見可對應本次上傳時點的異常說明，仍不能判定平台故障或學生已準時送件。",
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
              "id": "refer",
              "text": "協助依規定向科任反映上傳問題",
              "kind": "support",
              "emotional": false,
              "outcome": {
                "fact": "教師協助寫出上傳問題及附檔方式的詢問，未替科任認定平台故障。",
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
              "id": "document",
              "text": "先保存截圖與原始檔案備查",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生在本機保留原檔及截圖，不覆蓋檔案時間來製造準時證據。",
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
                  "id": "evidence-found",
                  "weight": 2.1,
                  "modifiers": [
                    {
                      "role": "participant",
                      "holder": "person",
                      "code": "3-4",
                      "influence": 0.55
                    }
                  ],
                  "outcome": {
                    "fact": "學生找到原檔備份與系統錯誤時間一致的截圖，至少能提出可核對的資料，不必只靠口頭解釋。",
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
                  "id": "evidence-complicated",
                  "weight": 2.3,
                  "modifiers": [
                    {
                      "role": "participant",
                      "holder": "person",
                      "code": "2-2",
                      "influence": 0.55
                    }
                  ],
                  "outcome": {
                    "fact": "學生核對備份時發現截圖只顯示卡住畫面，沒有送出成功的回條；教師不把截圖當準時繳交證明。",
                    "claims": [],
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
                      "transmissions": []
                    }
                  }
                }
              ]
            },
            {
              "id": "empathy",
              "text": "上傳卡住又怕過期，真的很讓人急",
              "kind": "action",
              "emotional": true,
              "outcome": {
                "fact": "教師承接上傳卡住的著急，未把學生說法定成平台已當機。",
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
      "id": "content:18b-t01-03-02",
      "topicId": "T01-03",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-03-02",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "1-1",
        "4-2",
        "2-2"
      ],
      "additionalCodes": [
        "3-4",
        "11-4",
        "3-3"
      ],
      "weights": [
        0.163,
        0.164,
        0.164,
        0.2,
        0.2,
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
        "school",
        "participant"
      ],
      "valence": "neutral"
    }
  },
  {
    "story": {
      "resourceId": "content:18b-t01-03-03",
      "definitionId": "content:18b-t01-03-03",
      "version": "1",
      "topicId": "T01-03",
      "status": "engineering-test",
      "choiceContract": "four-v2",
      "entry": "opening",
      "stages": [
        {
          "id": "opening",
          "pages": [
            {
              "order": 1,
              "text": "早自習時，在導師班教室裡，學生拿著複習清單，才發現明天小考範圍與自己準備的不一致。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我昨天都讀別章了，現在怎麼辦？",
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
              "text": "核對正式公布的小考範圍",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "雙方核對學生可取得的正式公告，未以群組轉述取代範圍依據。",
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
                  "id": "evidence-found",
                  "weight": 2.1,
                  "modifiers": [
                    {
                      "role": "participant",
                      "holder": "person",
                      "code": "3-4",
                      "influence": 0.55
                    }
                  ],
                  "outcome": {
                    "fact": "學生重新開啟正式公告後，發現是自己把兩個相鄰小考日期看錯，趕緊將範圍改回正確版本。",
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
                  "id": "evidence-complicated",
                  "weight": 2.3,
                  "modifiers": [
                    {
                      "role": "participant",
                      "holder": "person",
                      "code": "2-2",
                      "influence": 0.55
                    }
                  ],
                  "outcome": {
                    "fact": "學生比對公告時才看見前一晚公告確曾更新範圍，現在仍須依正式公告準備，不能怪罪傳話同學。",
                    "claims": [],
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
                      "transmissions": []
                    }
                  }
                }
              ]
            },
            {
              "id": "refer",
              "text": "協助他重新安排剩餘時間而不熬夜",
              "kind": "support",
              "emotional": false,
              "outcome": {
                "fact": "學生按已確認部分排出短期準備順序，未獲延期或被要求犧牲睡眠。",
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
              "id": "document",
              "text": "請他先向科任確認公告是否更動",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "教師協助寫出公告是否更動的詢問，尚未收到科任回覆。",
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
              "text": "先弄清楚範圍，比互相怪罪有用",
              "kind": "action",
              "emotional": true,
              "outcome": {
                "fact": "教師回應看錯範圍的懊惱，未指控任何同學誤導。",
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
      "id": "content:18b-t01-03-03",
      "topicId": "T01-03",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-03-03",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "1-1",
        "4-2",
        "2-2"
      ],
      "additionalCodes": [
        "4-1",
        "3-3",
        "3-2"
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
      "valence": "neutral"
    }
  },
  {
    "story": {
      "resourceId": "content:18b-t01-03-04",
      "definitionId": "content:18b-t01-03-04",
      "version": "1",
      "topicId": "T01-03",
      "status": "engineering-test",
      "choiceContract": "four-v2",
      "entry": "opening",
      "stages": [
        {
          "id": "opening",
          "pages": [
            {
              "order": 1,
              "text": "早自習時，在導師班教室裡，學生的數學作業答案幾乎全對，口頭解釋解法時卻卡住，自己表示是照著範例做。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "步驟我會抄，可是換一題就不確定。",
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
              "text": "請他說明第一步為什麼這樣做",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生嘗試說第一步卻停住，教師只確認本次說明不足，不推定作弊。",
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
              },
              "variants": [
                {
                  "id": "evidence-found",
                  "weight": 2.1,
                  "modifiers": [
                    {
                      "role": "participant",
                      "holder": "person",
                      "code": "3-4",
                      "influence": 0.55
                    }
                  ],
                  "outcome": {
                    "fact": "學生試著說明第一步，突然發現真正不懂的是為何要先移項，便把這一處具體標出。",
                    "claims": [],
                    "changes": [
                      {
                        "role": "teacher",
                        "holder": "work",
                        "code": "11-2",
                        "delta": -1
                      },
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
                  "id": "evidence-complicated",
                  "weight": 2.3,
                  "modifiers": [
                    {
                      "role": "participant",
                      "holder": "person",
                      "code": "2-2",
                      "influence": 0.55
                    }
                  ],
                  "outcome": {
                    "fact": "學生能講出移項原因，卻解釋不出下一步為何除以同一係數，原本全對的作業出現另一個理解缺口。",
                    "claims": [],
                    "changes": [
                      {
                        "role": "teacher",
                        "holder": "work",
                        "code": "11-2",
                        "delta": -1
                      },
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
                      "transmissions": []
                    }
                  }
                }
              ]
            },
            {
              "id": "refer",
              "text": "建議用相近但不同數字的題目練習",
              "kind": "support",
              "emotional": false,
              "outcome": {
                "fact": "教師提議用合法教材中的相近題自練，學生尚未完成或證明獨立掌握。",
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
              "id": "document",
              "text": "先記下不理解的步驟再詢問科任",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生將不明步驟標成可詢問的問題，未抄一份新解答冒充理解。",
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
              "text": "能發現自己只是照做，也是一個起點",
              "kind": "action",
              "emotional": true,
              "outcome": {
                "fact": "教師肯定能說出照做與理解的落差，沒有把坦白當成已學會。",
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
      "id": "content:18b-t01-03-04",
      "topicId": "T01-03",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-03-04",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "1-1",
        "4-2",
        "2-2"
      ],
      "additionalCodes": [
        "3-2",
        "3-3",
        "2-3"
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
      "resourceId": "content:18b-t01-03-05",
      "definitionId": "content:18b-t01-03-05",
      "version": "1",
      "topicId": "T01-03",
      "status": "engineering-test",
      "choiceContract": "four-v2",
      "entry": "opening",
      "stages": [
        {
          "id": "opening",
          "pages": [
            {
              "order": 1,
              "text": "午餐時，在教學大樓走廊，學生表示朋友常拜託他幫忙寫完整答案，最近已影響自己的休息時間。",
              "speaker": null,
              "scene": "school:corridor",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我不幫他，他就說我不夠朋友。",
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
              "text": "釐清實際協助與代做的差別",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生描述自己曾給的是整頁答案，教師記為本人自述，未替缺席同學判違規。",
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
              "id": "refer",
              "text": "建議以講解代替交出整份答案",
              "kind": "support",
              "emotional": false,
              "outcome": {
                "fact": "雙方練習只說明思路不交成品的回覆，尚未得到同學接受。",
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
                  "id": "evidence-found",
                  "weight": 2.1,
                  "modifiers": [
                    {
                      "role": "participant",
                      "holder": "person",
                      "code": "3-4",
                      "influence": 0.55
                    }
                  ],
                  "outcome": {
                    "fact": "學生演練只說思路不交答案的說法，自己覺得終於有一種既能幫忙又不必代寫的方式。",
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
                  "id": "evidence-complicated",
                  "weight": 2.3,
                  "modifiers": [
                    {
                      "role": "participant",
                      "holder": "person",
                      "code": "2-2",
                      "influence": 0.55
                    }
                  ],
                  "outcome": {
                    "fact": "學生練習說明界線時仍很怕朋友生氣，承認現在還不敢真的拒絕把整頁答案交出去。",
                    "claims": [],
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
                      "transmissions": []
                    }
                  }
                }
              ]
            },
            {
              "id": "document",
              "text": "請他先說明界線並觀察對方反應",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生擬好協助界線的訊息，未被要求試探或蒐集同學私人對話。",
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
              "text": "願意幫忙不代表必須把別人的作業做完",
              "kind": "action",
              "emotional": true,
              "outcome": {
                "fact": "教師支持拒絕代做，不把幫忙意願轉成必須承擔他人作業的責任。",
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
      "id": "content:18b-t01-03-05",
      "topicId": "T01-03",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-03-05",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "1-1",
        "4-2",
        "2-2"
      ],
      "additionalCodes": [
        "4-3",
        "1-4",
        "3-2"
      ],
      "weights": [
        0.17,
        0.17,
        0.17,
        0.213,
        0.149,
        0.128
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
      "resourceId": "content:18b-t01-03-06",
      "definitionId": "content:18b-t01-03-06",
      "version": "1",
      "topicId": "T01-03",
      "status": "engineering-test",
      "choiceContract": "four-v2",
      "entry": "opening",
      "stages": [
        {
          "id": "opening",
          "pages": [
            {
              "order": 1,
              "text": "午餐時，在教師辦公室，學生因正式請假錯過小考，返校後不清楚補測時間，害怕直接被記零分。",
              "speaker": null,
              "scene": "school:teachers-office",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我那天有請假，會不會就沒分數了？",
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
              "text": "核對請假紀錄與科任補測規定",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "雙方分列請假是否核准與補測規則是否已知，不將合法請假自動等同獲准補測。",
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
                  "id": "evidence-found",
                  "weight": 2.1,
                  "modifiers": [
                    {
                      "role": "participant",
                      "holder": "person",
                      "code": "3-4",
                      "influence": 0.55
                    }
                  ],
                  "outcome": {
                    "fact": "學生從公告找到核准請假者可另與科任約定測驗時間的規則，至少知道能依程序提出詢問。",
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
                  "id": "evidence-complicated",
                  "weight": 2.3,
                  "modifiers": [
                    {
                      "role": "participant",
                      "holder": "person",
                      "code": "2-2",
                      "influence": 0.55
                    }
                  ],
                  "outcome": {
                    "fact": "學生核對後發現自己只找到出缺席規則，補測是否可行仍不明確，須向科任確認。",
                    "claims": [],
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
                      "transmissions": []
                    }
                  }
                }
              ]
            },
            {
              "id": "refer",
              "text": "協助聯絡科任確認可用補測時間",
              "kind": "support",
              "emotional": false,
              "outcome": {
                "fact": "教師陪學生整理可聯絡的科任及空檔，尚未排定正式補測。",
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
              "id": "document",
              "text": "提醒學生保留相關公告避免誤會",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生保留自己的公告與請假資料，不公開病情供同學證明。",
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
              "text": "有正常請假，先別自己判死刑",
              "kind": "action",
              "emotional": true,
              "outcome": {
                "fact": "教師承接漏考的害怕，不保證一定及格或免除評量。",
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
      "id": "content:18b-t01-03-06",
      "topicId": "T01-03",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-03-06",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "1-1",
        "4-2",
        "2-2"
      ],
      "additionalCodes": [
        "4-1",
        "10-3",
        "4-3"
      ],
      "weights": [
        0.133,
        0.15,
        0.15,
        0.217,
        0.183,
        0.167
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
        "reason": "在籍學生午餐於非保護時段提出本件具體問題；不以相似分類碼推定同因果"
      }
    },
    "binding": {
      "sources": [
        "participant",
        "participant",
        "participant",
        "participant",
        "school",
        "participant"
      ],
      "valence": "neutral"
    }
  },
  {
    "story": {
      "resourceId": "content:18b-t01-03-07",
      "definitionId": "content:18b-t01-03-07",
      "version": "1",
      "topicId": "T01-03",
      "status": "engineering-test",
      "choiceContract": "four-v2",
      "entry": "opening",
      "stages": [
        {
          "id": "opening",
          "pages": [
            {
              "order": 1,
              "text": "早自習時，在導師班教室裡，學生把同一道題訂正三次，錯誤仍落在同個觀念，表示只看答案無法理解。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我抄了三遍還是錯。",
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
              "text": "請他指出第一次看不懂的推理",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生在推理旁指出第一個不理解的跳步，教師未以反覆錯誤判定不努力。",
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
              "id": "refer",
              "text": "建議用具體例子向科任詢問",
              "kind": "support",
              "emotional": false,
              "outcome": {
                "fact": "學生整理例題與疑問等待科任解釋，尚未獲得解答。",
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
              "id": "document",
              "text": "先不看解答，用自己方式重做第一步",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生在副本遮住解答重做第一步，停在不確定的推理，教師沒有代解或把這次嘗試當訂正已完成。",
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
                  "id": "evidence-found",
                  "weight": 2.1,
                  "modifiers": [
                    {
                      "role": "participant",
                      "holder": "person",
                      "code": "3-4",
                      "influence": 0.55
                    }
                  ],
                  "outcome": {
                    "fact": "學生遮住解答重做時竟自己找出第一次代錯的符號，明白原來不是每一步都不會。",
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
                  "id": "evidence-complicated",
                  "weight": 2.3,
                  "modifiers": [
                    {
                      "role": "participant",
                      "holder": "person",
                      "code": "2-2",
                      "influence": 0.55
                    }
                  ],
                  "outcome": {
                    "fact": "學生遮住解答後連第一步都無法開始，才發現抄三遍並沒有建立自己理解的起點。",
                    "claims": [],
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
                      "transmissions": []
                    }
                  }
                }
              ]
            },
            {
              "id": "empathy",
              "text": "抄三遍還不懂真的讓人想翻桌",
              "kind": "action",
              "emotional": true,
              "outcome": {
                "fact": "教師承接抄很多遍仍不懂的挫折，不鼓勵破壞作業或直接拒交。",
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
      "id": "content:18b-t01-03-07",
      "topicId": "T01-03",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-03-07",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "1-1",
        "4-2",
        "2-2"
      ],
      "additionalCodes": [
        "3-3",
        "3-2",
        "2-3"
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
      "resourceId": "content:18b-t01-03-08",
      "definitionId": "content:18b-t01-03-08",
      "version": "1",
      "topicId": "T01-03",
      "status": "engineering-test",
      "choiceContract": "four-v2",
      "entry": "opening",
      "stages": [
        {
          "id": "opening",
          "pages": [
            {
              "order": 1,
              "text": "午休時，在教師辦公室，學生提前完成所有作業，表示題目過於簡單，開始在課堂上做其他練習。",
              "speaker": null,
              "scene": "school:teachers-office",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我早寫完了，不能做難一點的嗎？",
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
              "text": "先確認課堂規範與學生實際需求",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "雙方把正式作業要求與學生想增加的挑戰分開，未認定基本練習無價值。",
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
                  "id": "evidence-found",
                  "weight": 2.1,
                  "modifiers": [
                    {
                      "role": "participant",
                      "holder": "person",
                      "code": "3-4",
                      "influence": 0.55
                    }
                  ],
                  "outcome": {
                    "fact": "學生表示想要的是不同類型的挑戰，而不是再多二十題同樣的練習，自己把需求說得更清楚。",
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
                  "id": "evidence-complicated",
                  "weight": 2.3,
                  "modifiers": [
                    {
                      "role": "participant",
                      "holder": "person",
                      "code": "2-2",
                      "influence": 0.55
                    }
                  ],
                  "outcome": {
                    "fact": "學生說想要難題，卻又承認有幾個基本觀念仍會卡住，決定先釐清是否真的適合直接跳級。",
                    "claims": [],
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
                      "transmissions": []
                    }
                  }
                }
              ]
            },
            {
              "id": "refer",
              "text": "協助向科任詢問適當的延伸題",
              "kind": "support",
              "emotional": false,
              "outcome": {
                "fact": "教師協助提出延伸題需求，科任是否提供及是否可替代仍未決定。",
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
              "id": "document",
              "text": "先觀察是否影響課堂秩序",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生選擇先完成原有課堂工作並保留需求，沒有被當成已同意永遠不調整。",
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
              "text": "想挑戰自己很好，也要顧到課堂安排",
              "kind": "action",
              "emotional": true,
              "outcome": {
                "fact": "教師肯定想挑戰的意願，不以給更多題目作獎勵或強迫加量。",
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
      "id": "content:18b-t01-03-08",
      "topicId": "T01-03",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-03-08",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "1-1",
        "4-2",
        "2-2"
      ],
      "additionalCodes": [
        "3-3",
        "3-2",
        "2-3"
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
      "resourceId": "content:18b-t01-03-10",
      "definitionId": "content:18b-t01-03-10",
      "version": "1",
      "topicId": "T01-03",
      "status": "engineering-test",
      "choiceContract": "four-v2",
      "entry": "opening",
      "stages": [
        {
          "id": "opening",
          "pages": [
            {
              "order": 1,
              "text": "早自習時，在導師班教室裡，學生願意參加課後補救課程，卻發現與社團固定活動衝突。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "兩個都想去，時間就是撞到。",
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
              "text": "先釐清補救課程是否有必要或替代時段",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "教師與學生確認手邊通知是否說明必要參與及替代時段，未知部分留待承辦。",
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
              },
              "variants": [
                {
                  "id": "evidence-found",
                  "weight": 2.1,
                  "modifiers": [
                    {
                      "role": "participant",
                      "holder": "person",
                      "code": "3-4",
                      "influence": 0.55
                    }
                  ],
                  "outcome": {
                    "fact": "學生查到補救教學通知寫有可向承辦詢問替代時段的管道，表示不必先把社團退出。",
                    "claims": [],
                    "changes": [
                      {
                        "role": "teacher",
                        "holder": "work",
                        "code": "11-2",
                        "delta": -1
                      },
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
                  "id": "evidence-complicated",
                  "weight": 2.3,
                  "modifiers": [
                    {
                      "role": "participant",
                      "holder": "person",
                      "code": "2-2",
                      "influence": 0.55
                    }
                  ],
                  "outcome": {
                    "fact": "學生核對通知後發現目前只公告一個固定時段，無法在沒有承辦回覆前假定可以換時間。",
                    "claims": [],
                    "changes": [
                      {
                        "role": "teacher",
                        "holder": "work",
                        "code": "11-2",
                        "delta": -1
                      },
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
                      "transmissions": []
                    }
                  }
                }
              ]
            },
            {
              "id": "refer",
              "text": "協助學生與承辦人確認選項",
              "kind": "support",
              "emotional": false,
              "outcome": {
                "fact": "學生擬出兩個衝突時段的詢問，教師未直接取消社團或補救課。",
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
              "id": "document",
              "text": "列出偏好與尚待確認的參與規則",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生列出目前偏好的選擇及須確認規則，未將個人偏好當正式核准。",
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
              "text": "有意願補課卻撞時間，挺可惜的",
              "kind": "action",
              "emotional": true,
              "outcome": {
                "fact": "教師承接想補課卻撞期的可惜，不替兩方承諾改時段。",
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
      "id": "content:18b-t01-03-10",
      "topicId": "T01-03",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-03-10",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "1-1",
        "4-2",
        "2-2"
      ],
      "additionalCodes": [
        "11-2",
        "3-3",
        "3-2"
      ],
      "weights": [
        0.165,
        0.163,
        0.163,
        0.265,
        0.122,
        0.122
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
        "player-work",
        "participant",
        "participant"
      ],
      "valence": "neutral"
    }
  },
  {
    "story": {
      "resourceId": "content:18b-t01-03-11",
      "definitionId": "content:18b-t01-03-11",
      "version": "1",
      "topicId": "T01-03",
      "status": "engineering-test",
      "choiceContract": "four-v2",
      "entry": "opening",
      "stages": [
        {
          "id": "opening",
          "pages": [
            {
              "order": 1,
              "text": "午餐時，在校園談話角落，學生發現小考卷一題少了一行條件，擔心全班不同作答方式造成失分。",
              "speaker": null,
              "scene": "school:counselling-corner",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "這題是不是根本少印一行？",
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
              "text": "保留原卷並確認是否普遍缺漏",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生保留自己的原卷缺漏處，教師未由單張卷推論全班或命題有錯。",
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
                  "id": "evidence-found",
                  "weight": 2.1,
                  "modifiers": [
                    {
                      "role": "participant",
                      "holder": "person",
                      "code": "3-4",
                      "influence": 0.55
                    }
                  ],
                  "outcome": {
                    "fact": "學生把原卷平攤，發現題目條件真的在自己影本少了一行，但還不能推定整班都有印製問題。",
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
                  "id": "evidence-complicated",
                  "weight": 2.3,
                  "modifiers": [
                    {
                      "role": "participant",
                      "holder": "person",
                      "code": "2-2",
                      "influence": 0.55
                    }
                  ],
                  "outcome": {
                    "fact": "學生把卷面翻到背面才發現被摺住的條件仍印在原紙上，尷尬承認自己當時沒看到。",
                    "claims": [],
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
                      "transmissions": []
                    }
                  }
                }
              ]
            },
            {
              "id": "refer",
              "text": "請科任依正式程序核對命題印製",
              "kind": "support",
              "emotional": false,
              "outcome": {
                "fact": "教師協助整理可向科任提出的查核點，尚未得到命題或監考紀錄。",
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
              "id": "document",
              "text": "記下缺漏題號及當時反映的情形",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生把缺漏題號及當時反映情形記下，不把這份紀錄當應補幾分的裁定。",
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
              "text": "如果題目真的沒印到，難免會很急",
              "kind": "action",
              "emotional": true,
              "outcome": {
                "fact": "教師回應沒看到題目的著急，以疑似印製缺漏表述，未先判定印錯。",
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
      "id": "content:18b-t01-03-11",
      "topicId": "T01-03",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-03-11",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "1-1",
        "4-2",
        "2-2"
      ],
      "additionalCodes": [
        "4-1",
        "3-3",
        "3-2"
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
      "resourceId": "content:18b-t01-03-12",
      "definitionId": "content:18b-t01-03-12",
      "version": "1",
      "topicId": "T01-03",
      "status": "engineering-test",
      "choiceContract": "four-v2",
      "entry": "opening",
      "stages": [
        {
          "id": "opening",
          "pages": [
            {
              "order": 1,
              "text": "午休時，在教師辦公室，學生同一天有數份不同科的大型作業要交，開始擔心無法全部完成。",
              "speaker": null,
              "scene": "school:teachers-office",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "明天每科都要交，我要先做誰的？",
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
              "text": "確認各項截止時間及真正必要內容",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生在清單標明各科已知期限，未知媒介與細項不憑記憶補齊。",
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
                  "id": "evidence-found",
                  "weight": 2.1,
                  "modifiers": [
                    {
                      "role": "participant",
                      "holder": "person",
                      "code": "3-4",
                      "influence": 0.55
                    }
                  ],
                  "outcome": {
                    "fact": "學生對照三科正式公告後，發現其中一科其實下週才交，原先全部明天到期只是記錯。",
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
                  "id": "evidence-complicated",
                  "weight": 2.3,
                  "modifiers": [
                    {
                      "role": "participant",
                      "holder": "person",
                      "code": "2-2",
                      "influence": 0.55
                    }
                  ],
                  "outcome": {
                    "fact": "學生核對後發現三科的主要截止日確實相撞，擔心程度反而增加，但教師未擅自替任何一科延期。",
                    "claims": [],
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
                      "transmissions": []
                    }
                  }
                }
              ]
            },
            {
              "id": "refer",
              "text": "協助學生排定優先順序並主動溝通",
              "kind": "support",
              "emotional": false,
              "outcome": {
                "fact": "雙方排出可先做的項目並擬出詢問，不替科任同意延後。",
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
              "id": "document",
              "text": "請他先查公告避免錯誤理解期限",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生整理需要回看的公告位置，未把同學口頭說法當共同期限。",
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
              "text": "這種撞期，光看行事曆就想頭痛",
              "kind": "action",
              "emotional": true,
              "outcome": {
                "fact": "教師表達撞期的無奈，沒有承諾將所有作業統一延期。",
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
      "id": "content:18b-t01-03-12",
      "topicId": "T01-03",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-03-12",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "1-1",
        "4-2",
        "2-2"
      ],
      "additionalCodes": [
        "3-3",
        "3-2",
        "2-3"
      ],
      "weights": [
        0.196,
        0.196,
        0.196,
        0.152,
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
      "resourceId": "content:18b-t01-03-13",
      "definitionId": "content:18b-t01-03-13",
      "version": "1",
      "topicId": "T01-03",
      "status": "engineering-test",
      "choiceContract": "four-v2",
      "entry": "opening",
      "stages": [
        {
          "id": "opening",
          "pages": [
            {
              "order": 1,
              "text": "午餐時，在教師辦公室，學生說自己交出的紙本作業可能被拿錯，手上有拍照存檔，但去向未確認。",
              "speaker": null,
              "scene": "school:teachers-office",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我交了，現在卻找不到。",
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
              "text": "確認繳交流程及已知接觸紀錄",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生說最後一次看見作業的地點，教師記為單方記憶，不稱已查明誰移走。",
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
                  "id": "evidence-found",
                  "weight": 2.1,
                  "modifiers": [
                    {
                      "role": "participant",
                      "holder": "person",
                      "code": "3-4",
                      "influence": 0.55
                    }
                  ],
                  "outcome": {
                    "fact": "學生回憶繳交時點，找到自己拍下放入收件籃的照片，能向科任提出更具體的查找線索。",
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
                  "id": "evidence-complicated",
                  "weight": 2.3,
                  "modifiers": [
                    {
                      "role": "participant",
                      "holder": "person",
                      "code": "2-2",
                      "influence": 0.55
                    }
                  ],
                  "outcome": {
                    "fact": "學生查看照片後發現只拍到完成的作業，沒有交到何處的證據，必須繼續保留未尋獲狀態。",
                    "claims": [],
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
                      "transmissions": []
                    }
                  }
                }
              ]
            },
            {
              "id": "refer",
              "text": "請科任核對收件與教室整理情況",
              "kind": "support",
              "emotional": false,
              "outcome": {
                "fact": "教師協助擬出核對收件的請求，不索取別班學生私人物品。",
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
              "id": "document",
              "text": "先保存照片，不指控同學偷拿",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生保留自己作業照片與目前未尋獲狀態，未指控某人偷拿。",
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
              "text": "東西不見很急，但還不能說是誰拿的",
              "kind": "action",
              "emotional": true,
              "outcome": {
                "fact": "教師承接遺失焦急，沒有保證找到或宣布科任已收到。",
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
      "id": "content:18b-t01-03-13",
      "topicId": "T01-03",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-03-13",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "1-1",
        "4-2",
        "2-2"
      ],
      "additionalCodes": [
        "3-3",
        "3-2",
        "2-3"
      ],
      "weights": [
        0.185,
        0.186,
        0.186,
        0.163,
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
      "resourceId": "content:18b-t01-03-14",
      "definitionId": "content:18b-t01-03-14",
      "version": "1",
      "topicId": "T01-03",
      "status": "engineering-test",
      "choiceContract": "four-v2",
      "entry": "opening",
      "stages": [
        {
          "id": "opening",
          "pages": [
            {
              "order": 1,
              "text": "午餐時，在校園談話角落，學生拿來一份完成度極高的手工作品，坦承主要由家長操作。",
              "speaker": null,
              "scene": "school:counselling-corner",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我有幫忙，可是很多地方是爸爸做的。",
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
              "text": "釐清學生參與的部分及課程要求",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生分列本人設計與家人製作部分，教師不因主動坦承便裁定符合規則。",
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
                  "id": "evidence-found",
                  "weight": 2.1,
                  "modifiers": [
                    {
                      "role": "participant",
                      "holder": "person",
                      "code": "3-4",
                      "influence": 0.55
                    }
                  ],
                  "outcome": {
                    "fact": "學生能清楚指出自己親手完成的設計部分，決定如實向科任說明並詢問自主補做方式。",
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
                  "id": "evidence-complicated",
                  "weight": 2.3,
                  "modifiers": [
                    {
                      "role": "participant",
                      "holder": "person",
                      "code": "2-2",
                      "influence": 0.55
                    }
                  ],
                  "outcome": {
                    "fact": "學生比對製作流程後發現大部分關鍵步驟確實是家長代做，擔心要重做，但不願假稱自己完成。",
                    "claims": [],
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
                      "transmissions": []
                    }
                  }
                }
              ]
            },
            {
              "id": "refer",
              "text": "協助向科任詢問如何補做自主部分",
              "kind": "support",
              "emotional": false,
              "outcome": {
                "fact": "學生擬出揭露協助及補做的詢問，是否須重做由科任決定。",
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
              "id": "document",
              "text": "先留下製作過程紀錄供說明",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生保留自有製作紀錄，未編造過程或要求家人代答查核。",
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
              "text": "能誠實說出來，比硬說全是自己做的好",
              "kind": "action",
              "emotional": true,
              "outcome": {
                "fact": "教師肯定願意說清分工，沒有保證揭露後免責或加分。",
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
      "id": "content:18b-t01-03-14",
      "topicId": "T01-03",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-03-14",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "1-1",
        "4-2",
        "2-2"
      ],
      "additionalCodes": [
        "1-4",
        "3-3",
        "4-3"
      ],
      "weights": [
        0.211,
        0.129,
        0.129,
        0.177,
        0.177,
        0.177
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
      "resourceId": "content:18b-t01-03-16",
      "definitionId": "content:18b-t01-03-16",
      "version": "1",
      "topicId": "T01-03",
      "status": "engineering-test",
      "choiceContract": "four-v2",
      "entry": "opening",
      "stages": [
        {
          "id": "opening",
          "pages": [
            {
              "order": 1,
              "text": "早自習時，在導師班教室裡，幾名學生因這次平均分較低，推派一名同學詢問是否能全班重考。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "大家都說太難，能不能再考？",
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
              "text": "先請學生提出具體範圍與題目問題",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生提出具體認為未教到的題號，教師未用全班分數低推定命題違規。",
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
                  "id": "evidence-found",
                  "weight": 2.1,
                  "modifiers": [
                    {
                      "role": "participant",
                      "holder": "person",
                      "code": "3-4",
                      "influence": 0.55
                    }
                  ],
                  "outcome": {
                    "fact": "學生代表拿出一題確實和公告範圍不同的疑問，教師確認值得依程序問科任，但尚不能宣布題目違規。",
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
                  "id": "evidence-complicated",
                  "weight": 2.3,
                  "modifiers": [
                    {
                      "role": "participant",
                      "holder": "person",
                      "code": "2-2",
                      "influence": 0.55
                    }
                  ],
                  "outcome": {
                    "fact": "學生代表試著列出具體超綱題目卻找不到，發現多數同學的抱怨其實只是難度很高。",
                    "claims": [],
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
                      "transmissions": []
                    }
                  }
                }
              ]
            },
            {
              "id": "refer",
              "text": "引導代表依規定與科任討論",
              "kind": "support",
              "emotional": false,
              "outcome": {
                "fact": "教師說明可由自願代表提出問題，尚未獲科任同意重考。",
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
              "id": "document",
              "text": "先收集合理回饋，不替科任宣布重考",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生整理不同意見但不附他人成績，教師未宣布多數決可取代評量程序。",
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
              "text": "考不好會失望，但重考得照規則",
              "kind": "action",
              "emotional": true,
              "outcome": {
                "fact": "教師承接考差失落，明確保留正式決定權，沒有拿鼓勵當重考承諾。",
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
      "id": "content:18b-t01-03-16",
      "topicId": "T01-03",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-03-16",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "1-1",
        "4-2",
        "2-2"
      ],
      "additionalCodes": [
        "4-1",
        "3-3",
        "3-2"
      ],
      "weights": [
        0.165,
        0.163,
        0.163,
        0.265,
        0.122,
        0.122
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
      "resourceId": "content:18b-t01-03-17",
      "definitionId": "content:18b-t01-03-17",
      "version": "1",
      "topicId": "T01-03",
      "status": "engineering-test",
      "choiceContract": "four-v2",
      "entry": "opening",
      "stages": [
        {
          "id": "opening",
          "pages": [
            {
              "order": 1,
              "text": "午餐時，在教學大樓走廊，學生發現訂正繳交期限落在週日，詢問究竟須線上繳交還是週一交紙本。",
              "speaker": null,
              "scene": "school:corridor",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "公告寫星期天，可是那天沒上課啊。",
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
              "text": "核對科任公告與實際繳交媒介",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "雙方核對學生持有公告的日期與送件媒介，未由假日直接判定期限無效。",
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
                  "id": "evidence-found",
                  "weight": 2.1,
                  "modifiers": [
                    {
                      "role": "participant",
                      "holder": "person",
                      "code": "3-4",
                      "influence": 0.55
                    }
                  ],
                  "outcome": {
                    "fact": "學生查看公告才發現要求週日晚上線上送出，星期天雖是假日，繳交媒介已寫清楚。",
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
                  "id": "evidence-complicated",
                  "weight": 2.3,
                  "modifiers": [
                    {
                      "role": "participant",
                      "holder": "person",
                      "code": "2-2",
                      "influence": 0.55
                    }
                  ],
                  "outcome": {
                    "fact": "學生查過公告仍找不到線上或紙本資訊，知道必須問科任而不能自行假定週一才交。",
                    "claims": [],
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
                      "transmissions": []
                    }
                  }
                }
              ]
            },
            {
              "id": "refer",
              "text": "請科任澄清是否接受下一個上課日",
              "kind": "support",
              "emotional": false,
              "outcome": {
                "fact": "學生擬出是否可下個上課日繳交的詢問，尚未取得延期許可。",
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
              "id": "document",
              "text": "保留公告及本人目前的準備紀錄",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生保留公告及自己的準備紀錄，不改截圖日期或假裝已送出。",
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
              "text": "期限寫得不清楚，難怪你會疑惑",
              "kind": "action",
              "emotional": true,
              "outcome": {
                "fact": "教師承接期限不明的困惑，沒有宣告科任公告錯誤。",
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
      "id": "content:18b-t01-03-17",
      "topicId": "T01-03",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-03-17",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "1-1",
        "4-2",
        "2-2"
      ],
      "additionalCodes": [
        "3-3",
        "3-2",
        "2-3"
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
      "resourceId": "content:18b-t01-03-18",
      "definitionId": "content:18b-t01-03-18",
      "version": "1",
      "topicId": "T01-03",
      "status": "engineering-test",
      "choiceContract": "four-v2",
      "entry": "opening",
      "stages": [
        {
          "id": "opening",
          "pages": [
            {
              "order": 1,
              "text": "早自習時，在導師班教室裡，學生表示小組實驗報告中自己負責資料整理，但不知道個人貢獻如何反映在作業。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我做了很多，可是最後都寫同一組。",
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
              "text": "了解作業原先公布的分工與評量方式",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生先說本人工作及所知分配，教師不把單方評價當成全組事實。",
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
                  "id": "evidence-found",
                  "weight": 2.1,
                  "modifiers": [
                    {
                      "role": "participant",
                      "holder": "person",
                      "code": "3-4",
                      "influence": 0.55
                    }
                  ],
                  "outcome": {
                    "fact": "學生能拿出自己整理的數據版本紀錄，至少能具體說明本人工作而不是單靠抱怨。",
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
                  "id": "evidence-complicated",
                  "weight": 2.3,
                  "modifiers": [
                    {
                      "role": "participant",
                      "holder": "person",
                      "code": "2-2",
                      "influence": 0.55
                    }
                  ],
                  "outcome": {
                    "fact": "學生試著找版本紀錄，才發現大多是在同一份共編文件上直接修改，難以只靠檔案證明誰做哪一步。",
                    "claims": [],
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
                      "transmissions": []
                    }
                  }
                }
              ]
            },
            {
              "id": "refer",
              "text": "協助學生提出具體工作紀錄給科任",
              "kind": "support",
              "emotional": false,
              "outcome": {
                "fact": "學生整理自有版本與分工紀錄供科任判讀，未取得改分或全組署名認可。",
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
              "id": "document",
              "text": "擬好組內分工詢問，先不公開評價",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生擬出對未完成工作的組內詢問，未強迫缺席成員接受新分工。",
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
              "text": "有付出就希望被看見，很合理",
              "kind": "action",
              "emotional": true,
              "outcome": {
                "fact": "教師承接付出未被看見的感受，沒有替任何成員定性偷懶。",
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
      "id": "content:18b-t01-03-18",
      "topicId": "T01-03",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-03-18",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "1-1",
        "4-2",
        "2-2"
      ],
      "additionalCodes": [
        "3-3",
        "3-2",
        "2-3"
      ],
      "weights": [
        0.185,
        0.186,
        0.186,
        0.163,
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
      "resourceId": "content:18b-t01-03-19",
      "definitionId": "content:18b-t01-03-19",
      "version": "1",
      "topicId": "T01-03",
      "status": "engineering-test",
      "choiceContract": "four-v2",
      "entry": "opening",
      "stages": [
        {
          "id": "opening",
          "pages": [
            {
              "order": 1,
              "text": "午餐時，在校園談話角落，學生因合法校車延誤剛進教室就遇上小考，未能完成全部題目。",
              "speaker": null,
              "scene": "school:counselling-corner",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我搭同一班車，今天就是塞住了。",
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
              "text": "確認出缺勤與小考補測規定分別處理",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "雙方分開列出到校與小考規則，教師不以遲到處理替代評量資格判斷。",
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
                  "id": "evidence-found",
                  "weight": 2.1,
                  "modifiers": [
                    {
                      "role": "participant",
                      "holder": "person",
                      "code": "3-4",
                      "influence": 0.55
                    }
                  ],
                  "outcome": {
                    "fact": "學生核對當天的到校紀錄與交通時間，發現有官方延誤公告可供後續程序查核。",
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
                  "id": "evidence-complicated",
                  "weight": 2.3,
                  "modifiers": [
                    {
                      "role": "participant",
                      "holder": "person",
                      "code": "2-2",
                      "influence": 0.55
                    }
                  ],
                  "outcome": {
                    "fact": "學生核對後發現沒有官方延誤紀錄，目前只能提出本人經過，仍須按出勤與測驗各自規定處理。",
                    "claims": [],
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
                      "transmissions": []
                    }
                  }
                }
              ]
            },
            {
              "id": "refer",
              "text": "請科任判斷是否提供合法補測",
              "kind": "support",
              "emotional": false,
              "outcome": {
                "fact": "學生擬出補測資格詢問，尚未取得科任同意。",
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
              "id": "document",
              "text": "保留交通與到校時間資訊",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生保存自己的到校與交通資料，不推定每次遲到都同因。",
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
              "text": "遲到已經很急了，還遇到小考真慘",
              "kind": "action",
              "emotional": true,
              "outcome": {
                "fact": "教師承接兩件事撞在一起的壓力，未保證免除出缺勤或測驗責任。",
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
      "id": "content:18b-t01-03-19",
      "topicId": "T01-03",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-03-19",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "1-1",
        "4-2",
        "2-2"
      ],
      "additionalCodes": [
        "3-3",
        "3-2",
        "2-3"
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
      "resourceId": "content:18b-t01-03-20",
      "definitionId": "content:18b-t01-03-20",
      "version": "1",
      "topicId": "T01-03",
      "status": "engineering-test",
      "choiceContract": "four-v2",
      "entry": "opening",
      "stages": [
        {
          "id": "opening",
          "pages": [
            {
              "order": 1,
              "text": "早自習時，在導師班教室裡，學生報名某科補救課後接到可能不開班的通知，擔心失去學習資源。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "好不容易願意補了，卻說人不夠。",
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
              "text": "先查明通知是暫定還是正式決議",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生出示的通知被區分為暫定文字及待確認處，未把人數不足自動當正式停課。",
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
                  "id": "evidence-found",
                  "weight": 2.1,
                  "modifiers": [
                    {
                      "role": "participant",
                      "holder": "person",
                      "code": "3-4",
                      "influence": 0.55
                    }
                  ],
                  "outcome": {
                    "fact": "學生重新看通知，確認只是『未達預定人數』而非正式停課，願意先詢問是否有替代資源。",
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
                  "id": "evidence-complicated",
                  "weight": 2.3,
                  "modifiers": [
                    {
                      "role": "participant",
                      "holder": "person",
                      "code": "2-2",
                      "influence": 0.55
                    }
                  ],
                  "outcome": {
                    "fact": "學生發現公告已明確寫出本期停開，原本打算等開班的方案不能繼續假設。",
                    "claims": [],
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
                      "transmissions": []
                    }
                  }
                }
              ]
            },
            {
              "id": "refer",
              "text": "協助詢問個別輔導或其他合法資源",
              "kind": "support",
              "emotional": false,
              "outcome": {
                "fact": "教師協助列出可詢問的個別指導資源，未承諾教師額外開課。",
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
              "id": "document",
              "text": "先記錄需求，等待承辦人正式回覆",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生在自己的需求單記下待覆事項，未把等待時間當成已取得補強。",
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
              "text": "願意補強是好事，不應因訊息不明白跑",
              "kind": "action",
              "emotional": true,
              "outcome": {
                "fact": "教師肯定想補強的意願，不以行政可能取消就宣告沒有其他支持。",
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
      "id": "content:18b-t01-03-20",
      "topicId": "T01-03",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-03-20",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "1-1",
        "4-2",
        "2-2"
      ],
      "additionalCodes": [
        "3-3",
        "3-2",
        "2-3"
      ],
      "weights": [
        0.182,
        0.205,
        0.205,
        0.136,
        0.136,
        0.136
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
      "resourceId": "content:18b-t01-03-21",
      "definitionId": "content:18b-t01-03-21",
      "version": "1",
      "topicId": "T01-03",
      "status": "engineering-test",
      "choiceContract": "four-v2",
      "entry": "opening",
      "stages": [
        {
          "id": "opening",
          "pages": [
            {
              "order": 1,
              "text": "午餐時，在教師辦公室，學生把沾濕的作業帶來，內容部分還看得見，表示意外打翻飲料。",
              "speaker": null,
              "scene": "school:teachers-office",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我真的寫好了，現在全糊掉了。",
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
              "text": "確認可辨識部分與作業繳交規定",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "雙方檢視學生帶來的可辨識頁面，教師不替科任認定所有內容可收。",
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
                  "id": "evidence-found",
                  "weight": 2.1,
                  "modifiers": [
                    {
                      "role": "participant",
                      "holder": "person",
                      "code": "3-4",
                      "influence": 0.55
                    }
                  ],
                  "outcome": {
                    "fact": "學生攤開受潮紙張，發現後半部分仍能清楚辨識，也找得到先前的電子草稿可供核對。",
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
                  "id": "evidence-complicated",
                  "weight": 2.3,
                  "modifiers": [
                    {
                      "role": "participant",
                      "holder": "person",
                      "code": "2-2",
                      "influence": 0.55
                    }
                  ],
                  "outcome": {
                    "fact": "學生仔細翻查後發現重要兩頁字跡已完全糊掉，原檔也沒有更新，得如實問科任是否可補做。",
                    "claims": [],
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
                      "transmissions": []
                    }
                  }
                }
              ]
            },
            {
              "id": "refer",
              "text": "協助詢問是否可依規補交或重印",
              "kind": "support",
              "emotional": false,
              "outcome": {
                "fact": "學生擬出重印或補交的申請，未獲免責或延時承諾。",
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
              "id": "document",
              "text": "先保存殘頁，避免急著重做全部",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生保留殘頁與原檔，不丟棄所有原始材料來重造完成時間。",
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
              "text": "寫完被飲料毀掉，太崩潰了",
              "kind": "action",
              "emotional": true,
              "outcome": {
                "fact": "教師回應成品受損的難受，沒有責怪同學或認定是他人弄濕。",
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
      "id": "content:18b-t01-03-21",
      "topicId": "T01-03",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-03-21",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "1-1",
        "4-2",
        "2-2"
      ],
      "additionalCodes": [
        "3-3",
        "3-2",
        "2-3"
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
      "resourceId": "content:18b-t01-03-22",
      "definitionId": "content:18b-t01-03-22",
      "version": "1",
      "topicId": "T01-03",
      "status": "engineering-test",
      "choiceContract": "four-v2",
      "entry": "opening",
      "stages": [
        {
          "id": "opening",
          "pages": [
            {
              "order": 1,
              "text": "午餐時，在教師辦公室，學生說平常能理解課程內容，但這次小考大量考細節記憶，分數不理想。",
              "speaker": null,
              "scene": "school:teachers-office",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我懂意思，卻記不住那個名詞。",
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
              "text": "了解評量目標與錯題細節",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生指出忘記的是哪些詞，教師未將能理解整體與記憶用語視為同一件事。",
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
              "id": "refer",
              "text": "協助向科任請教適當的記憶練習",
              "kind": "support",
              "emotional": false,
              "outcome": {
                "fact": "學生整理想請科任示範的記憶練習，尚未得到專科回饋。",
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
              "id": "document",
              "text": "先做短時段回想並記錄成效",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生當場試短暫遮字回想並保留卡住處，不把一輪試做算成穩定改善。",
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
                  "id": "evidence-found",
                  "weight": 2.1,
                  "modifiers": [
                    {
                      "role": "participant",
                      "holder": "person",
                      "code": "3-4",
                      "influence": 0.55
                    }
                  ],
                  "outcome": {
                    "fact": "學生把詞彙遮起來後竟能自己說出兩個專有名詞，發現有一部分可以透過回想找回。",
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
                  "id": "evidence-complicated",
                  "weight": 2.3,
                  "modifiers": [
                    {
                      "role": "participant",
                      "holder": "person",
                      "code": "2-2",
                      "influence": 0.55
                    }
                  ],
                  "outcome": {
                    "fact": "學生遮字練習時仍答不出關鍵詞，終於說出自己只會認得字卻無法主動提取。",
                    "claims": [],
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
                      "transmissions": []
                    }
                  }
                }
              ]
            },
            {
              "id": "empathy",
              "text": "懂內容卻卡在字詞也很常見",
              "kind": "action",
              "emotional": true,
              "outcome": {
                "fact": "教師接住懂意思卻說不出詞的挫折，未將它診斷為記憶障礙。",
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
      "id": "content:18b-t01-03-22",
      "topicId": "T01-03",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-03-22",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "1-1",
        "4-2",
        "2-2"
      ],
      "additionalCodes": [
        "4-1",
        "3-3",
        "3-2"
      ],
      "weights": [
        0.17,
        0.17,
        0.17,
        0.234,
        0.128,
        0.128
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
      "resourceId": "content:18b-t01-03-23",
      "definitionId": "content:18b-t01-03-23",
      "version": "1",
      "topicId": "T01-03",
      "status": "engineering-test",
      "choiceContract": "four-v2",
      "entry": "opening",
      "stages": [
        {
          "id": "opening",
          "pages": [
            {
              "order": 1,
              "text": "午餐時，在教學大樓走廊，學生作業訂正已完成，但家長出差不在，暫時無法取得簽名。",
              "speaker": null,
              "scene": "school:corridor",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我都寫好了，爸媽今天不在。",
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
              "text": "核對簽名目的及規定期限",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "雙方查學生可取得的簽名目的與期限，未把無簽名直接等同未訂正。",
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
                  "id": "evidence-found",
                  "weight": 2.1,
                  "modifiers": [
                    {
                      "role": "participant",
                      "holder": "person",
                      "code": "3-4",
                      "influence": 0.55
                    }
                  ],
                  "outcome": {
                    "fact": "學生核對公告才發現簽名截止日還有兩天，自己不必今天在校內急著找人代簽。",
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
                  "id": "evidence-complicated",
                  "weight": 2.3,
                  "modifiers": [
                    {
                      "role": "participant",
                      "holder": "person",
                      "code": "2-2",
                      "influence": 0.55
                    }
                  ],
                  "outcome": {
                    "fact": "學生查到原公告確實要求明天交家長簽認，但監護人最近不在家，必須依規詢問替代聯繫方式。",
                    "claims": [],
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
                      "transmissions": []
                    }
                  }
                }
              ]
            },
            {
              "id": "refer",
              "text": "協助學生向科任說明可聯繫的監護人安排",
              "kind": "support",
              "emotional": false,
              "outcome": {
                "fact": "教師協助擬出合法照顧者聯繫安排的說明，未替科任同意改簽名人。",
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
              "id": "document",
              "text": "先保存完成紀錄，不偽造簽名",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生保留已完成的訂正及待簽狀態，不偽造或代簽。",
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
              "text": "簽名還沒到，不代表你沒訂正",
              "kind": "action",
              "emotional": true,
              "outcome": {
                "fact": "教師肯定可見的訂正工作，沒有因此自行取消簽名要求。",
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
      "id": "content:18b-t01-03-23",
      "topicId": "T01-03",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-03-23",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "1-1",
        "4-2",
        "2-2"
      ],
      "additionalCodes": [
        "7-1",
        "3-3",
        "4-3"
      ],
      "weights": [
        0.211,
        0.129,
        0.129,
        0.177,
        0.177,
        0.177
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
      "valence": "positive"
    }
  },
  {
    "story": {
      "resourceId": "content:18b-t01-03-24",
      "definitionId": "content:18b-t01-03-24",
      "version": "1",
      "topicId": "T01-03",
      "status": "engineering-test",
      "choiceContract": "four-v2",
      "entry": "opening",
      "stages": [
        {
          "id": "opening",
          "pages": [
            {
              "order": 1,
              "text": "午餐時，在教師辦公室，學生請假返校後才看見先前貼出的補考通知，考試時段已過。",
              "speaker": null,
              "scene": "school:teachers-office",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我沒來學校，根本不知道有這張。",
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
              "text": "確認公告方式與學生請假期間",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生提供請假日期與所知公告時間，教師不由未看見就推定校方未公告。",
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
                  "id": "evidence-found",
                  "weight": 2.1,
                  "modifiers": [
                    {
                      "role": "participant",
                      "holder": "person",
                      "code": "3-4",
                      "influence": 0.55
                    }
                  ],
                  "outcome": {
                    "fact": "學生比對請假期間與公告日期，發現確實是在自己請假那天貼出紙本通知，值得提出具體資訊落差。",
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
                  "id": "evidence-complicated",
                  "weight": 2.3,
                  "modifiers": [
                    {
                      "role": "participant",
                      "holder": "person",
                      "code": "2-2",
                      "influence": 0.55
                    }
                  ],
                  "outcome": {
                    "fact": "學生翻到班級公告紀錄，才發現同一天其實也有合法的線上通知，只是自己當時沒有查看。",
                    "claims": [],
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
                      "transmissions": []
                    }
                  }
                }
              ]
            },
            {
              "id": "refer",
              "text": "協助向科任說明資訊落差",
              "kind": "support",
              "emotional": false,
              "outcome": {
                "fact": "學生擬出因請假未得知的說明，受理或補測仍由權責教師決定。",
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
              "id": "document",
              "text": "先保留通知日期及出缺勤紀錄",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "雙方保留本人可取得的通知與請假紀錄，不以回憶填成正式證明。",
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
              "text": "公告看不到，不代表你故意不理",
              "kind": "action",
              "emotional": true,
              "outcome": {
                "fact": "教師承接資訊落差的委屈，沒有宣布學生已獲補考或全無責任。",
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
      "id": "content:18b-t01-03-24",
      "topicId": "T01-03",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-03-24",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "1-1",
        "4-2",
        "2-2"
      ],
      "additionalCodes": [
        "4-1",
        "11-4",
        "3-3"
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
        "school",
        "participant"
      ],
      "valence": "neutral"
    }
  },
  {
    "story": {
      "resourceId": "content:18b-t01-03-25",
      "definitionId": "content:18b-t01-03-25",
      "version": "1",
      "topicId": "T01-03",
      "status": "engineering-test",
      "choiceContract": "four-v2",
      "entry": "opening",
      "stages": [
        {
          "id": "opening",
          "pages": [
            {
              "order": 1,
              "text": "午餐時，在教師辦公室，學生把幾張零分小考卷壓在書桌最底下，不願帶回訂正。",
              "speaker": null,
              "scene": "school:teachers-office",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "反正訂正也不會，我不想再看。",
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
              "text": "先了解有哪些內容最難開始訂正",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生願意先談一個看不懂的符號，教師不強迫當場攤開全部零分卷。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "反正訂正也不會，我不想再看。",
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
                  "id": "willing-to-act",
                  "weight": 1.4,
                  "modifiers": [
                    {
                      "role": "participant",
                      "holder": "person",
                      "code": "4-3",
                      "influence": 0.7
                    }
                  ],
                  "outcome": {
                    "fact": "學生願意先談一個不懂的符號，也開始在紙上寫下這個疑點，沒有被要求攤開全部考卷。",
                    "claims": [
                      {
                        "role": "participant",
                        "statement": "反正訂正也不會，我不想再看。",
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
                          "description": "學生當面向導師表達本次談話中的個人顧慮或感受。"
                        }
                      ]
                    }
                  }
                },
                {
                  "id": "not-yet-ready",
                  "weight": 3.1,
                  "modifiers": [
                    {
                      "role": "participant",
                      "holder": "person",
                      "code": "2-2",
                      "influence": 1.4
                    }
                  ],
                  "outcome": {
                    "fact": "學生願意口頭談一個不懂的符號，但今天仍不願動筆，教師尊重而不判定他不肯學習。",
                    "claims": [
                      {
                        "role": "participant",
                        "statement": "反正訂正也不會，我不想再看。",
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
              "id": "refer",
              "text": "請科任協助訂出可以完成的入門題",
              "kind": "support",
              "emotional": false,
              "outcome": {
                "fact": "教師協助擬出需要入門題的請求，科任尚未提供分層教材。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "反正訂正也不會，我不想再看。",
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
              "id": "document",
              "text": "尊重學生步調，安排下次短談",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生選擇本次只短談，教師保留可再求助的方式，不把沉默當拒絕學習。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "反正訂正也不會，我不想再看。",
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
              "id": "empathy",
              "text": "一直看見零分真的很不好受",
              "kind": "action",
              "emotional": true,
              "outcome": {
                "fact": "教師承接反覆零分的挫折，不承諾下一次一定拿分或診斷能力。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "反正訂正也不會，我不想再看。",
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
      "id": "content:18b-t01-03-25",
      "topicId": "T01-03",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-03-25",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "1-1",
        "4-2",
        "2-2"
      ],
      "additionalCodes": [
        "4-1",
        "3-3",
        "3-2"
      ],
      "weights": [
        0.17,
        0.17,
        0.17,
        0.234,
        0.128,
        0.128
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
      "resourceId": "content:18b-t01-03-27",
      "definitionId": "content:18b-t01-03-27",
      "version": "1",
      "topicId": "T01-03",
      "status": "engineering-test",
      "choiceContract": "four-v2",
      "entry": "opening",
      "stages": [
        {
          "id": "opening",
          "pages": [
            {
              "order": 1,
              "text": "午餐時，在教師辦公室，學生參加補救課後拿到教材，發現前置知識仍有許多空缺，難以跟上。",
              "speaker": null,
              "scene": "school:teachers-office",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "明明是補救課，我還是看不懂。",
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
              "text": "協助辨認缺少哪一項基礎概念",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生標出連起始步驟都不懂的位置，教師把它留成待專科確認的基礎疑點。",
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
              "id": "refer",
              "text": "請補救課老師判斷教材是否需要分層",
              "kind": "support",
              "emotional": false,
              "outcome": {
                "fact": "學生擬出教材分層的詢問，尚未取得補救課老師調整承諾。",
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
              "id": "document",
              "text": "用已提供的基礎例題試一小步",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生從自己合法取得的較基礎教材選一例試第一步，仍不確定之處留作提問，不宣稱已掌握或取代補救課要求。",
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
                  "id": "evidence-found",
                  "weight": 2.1,
                  "modifiers": [
                    {
                      "role": "participant",
                      "holder": "person",
                      "code": "3-4",
                      "influence": 0.55
                    }
                  ],
                  "outcome": {
                    "fact": "學生試做較基礎例題時找到一個自己已經會的起始步驟，知道下一次可以從這個環節求助。",
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
                  "id": "evidence-complicated",
                  "weight": 2.3,
                  "modifiers": [
                    {
                      "role": "participant",
                      "holder": "person",
                      "code": "2-2",
                      "influence": 0.55
                    }
                  ],
                  "outcome": {
                    "fact": "學生看完基礎例題仍無法理解第一行如何得到，才發現需要更前一單元的銜接。",
                    "claims": [],
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
                      "transmissions": []
                    }
                  }
                }
              ]
            },
            {
              "id": "empathy",
              "text": "肯來補課還看不懂，真的會更挫折",
              "kind": "action",
              "emotional": true,
              "outcome": {
                "fact": "教師肯定願意補強也承認挫折，未以出席當成已掌握基礎。",
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
      "id": "content:18b-t01-03-27",
      "topicId": "T01-03",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-03-27",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "1-1",
        "4-2",
        "2-2"
      ],
      "additionalCodes": [
        "11-4",
        "3-3",
        "3-2"
      ],
      "weights": [
        0.17,
        0.17,
        0.17,
        0.234,
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
      "resourceId": "content:18b-t01-03-28",
      "definitionId": "content:18b-t01-03-28",
      "version": "1",
      "topicId": "T01-03",
      "status": "engineering-test",
      "choiceContract": "four-v2",
      "entry": "opening",
      "stages": [
        {
          "id": "opening",
          "pages": [
            {
              "order": 1,
              "text": "午餐時，在校園談話角落，學生說自己在原以為可繳交的下課時段找不到作業箱；實際收箱時間及期限都尚未核實。",
              "speaker": null,
              "scene": "school:counselling-corner",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我想交的時候，箱子已經不見了。",
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
              "text": "確認公告與收件實際時間",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "雙方依學生提供的公告及自述分列期限與看到作業箱消失的時點，實際收件紀錄仍待查。",
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
              "id": "refer",
              "text": "整理收件查詢，約下次核對有無回覆",
              "kind": "support",
              "emotional": false,
              "outcome": {
                "fact": "學生擬好補交詢問，尚未送出；雙方約下一個合法談話時段核對是否已有正式收件回覆。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": "receipt-followup",
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
                },
                "issueOperations": [
                  {
                    "type": "open",
                    "localKey": "receipt",
                    "kind": "assignment-receipt-check",
                    "roles": [
                      "participant"
                    ],
                    "details": "找不到作業箱後，學生自己的作業是否獲正式收件回覆尚待核對。"
                  }
                ]
              }
            },
            {
              "id": "document",
              "text": "保留當天說法，勿先認定他人過失",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生保留自己當日說法，不把未見收件箱推定為他人失職。",
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
              "text": "想按時交卻沒有地方交，確實尷尬",
              "kind": "action",
              "emotional": true,
              "outcome": {
                "fact": "教師承接想交卻無處交的困窘，未保證補交一定不扣分。",
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
          "id": "receipt-followup",
          "pages": [
            {
              "order": 1,
              "text": "到了下一個可合法談話的午餐時段，你與學生回看找不到作業箱後留下的收件疑問；學生是否送出查詢、有無回覆仍需核對。",
              "speaker": null,
              "scene": "school:counselling-corner",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我想確認那份作業到底有沒有入列，不能只靠我以為交了。",
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
              "id": "check-receipt",
              "text": "核對學生目前可出示的正式收件回覆",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "教師請學生出示可核對的回覆，目前尚未取得足夠完成證據。",
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
                },
                "issueOperations": [
                  {
                    "type": "progress",
                    "source": {
                      "eventId": "self",
                      "stage": "opening",
                      "optionId": "refer",
                      "localKey": "receipt"
                    },
                    "assessment": "uncertain",
                    "details": "開始核對目前是否取得回覆，尚未確認收件。"
                  }
                ]
              },
              "variants": [
                {
                  "id": "documented",
                  "weight": 2,
                  "outcome": {
                    "fact": "學生出示科任回覆中可核對本人作業的收件紀錄，教師與學生核對此件確已入列；本次收件疑問可結案，不代表已評分。",
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
                    },
                    "issueOperations": [
                      {
                        "type": "close",
                        "source": {
                          "eventId": "self",
                          "stage": "opening",
                          "optionId": "refer",
                          "localKey": "receipt"
                        },
                        "reason": "已取得本人作業的正式收件紀錄"
                      }
                    ]
                  }
                },
                {
                  "id": "pending",
                  "weight": 3,
                  "outcome": {
                    "fact": "學生目前尚無可核對的正式收件回覆，教師不把提出查詢或時間經過當作已收件。",
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
                    },
                    "issueOperations": [
                      {
                        "type": "progress",
                        "source": {
                          "eventId": "self",
                          "stage": "opening",
                          "optionId": "refer",
                          "localKey": "receipt"
                        },
                        "assessment": "uncertain",
                        "details": "本次未取得可核對正式收件回覆，仍待查證。"
                      }
                    ]
                  }
                }
              ]
            },
            {
              "id": "prepare-question",
              "text": "若尚未提出查詢，先整理可送出的本人資料",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生整理本人作業名稱、原公告與待問事項，教師沒有代替科任回覆或視為已送出。",
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
              "id": "keep-record",
              "text": "保留未確定狀態，不再製造重複版本",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生保留原檔與目前收件疑問，沒有重新製作時間戳或把未查證當成結案。",
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
              "id": "worry",
              "text": "等一句回覆也很磨人，我們別先怪你或怪別人",
              "kind": "action",
              "emotional": true,
              "outcome": {
                "fact": "教師回應等待的不安，提醒可繼續使用原查核管道，尚未取得收件證據。",
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
      "id": "content:18b-t01-03-28",
      "topicId": "T01-03",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-03-28",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "1-1",
        "4-2",
        "2-2"
      ],
      "additionalCodes": [
        "3-3",
        "3-2",
        "2-3"
      ],
      "weights": [
        0.185,
        0.186,
        0.186,
        0.163,
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
      "resourceId": "content:18b-t01-03-29",
      "definitionId": "content:18b-t01-03-29",
      "version": "1",
      "topicId": "T01-03",
      "status": "engineering-test",
      "choiceContract": "four-v2",
      "entry": "opening",
      "stages": [
        {
          "id": "opening",
          "pages": [
            {
              "order": 1,
              "text": "午餐時，在教師辦公室，學生表示課程作業需使用特殊器材，家中沒有相應設備，擔心最後只剩繳交期限。",
              "speaker": null,
              "scene": "school:teachers-office",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我在家根本做不了那個步驟。",
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
              "text": "確認是否真的必須使用指定設備",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生指出哪項步驟需要指定設備，教師不假定所有部分都不能在家做。",
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
                  "id": "evidence-found",
                  "weight": 2.1,
                  "modifiers": [
                    {
                      "role": "participant",
                      "holder": "person",
                      "code": "3-4",
                      "influence": 0.55
                    }
                  ],
                  "outcome": {
                    "fact": "學生確認作業只有最後一個環節需要指定器材，前半部分仍能在家先完成，不必全部停擺。",
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
                  "id": "evidence-complicated",
                  "weight": 2.3,
                  "modifiers": [
                    {
                      "role": "participant",
                      "holder": "person",
                      "code": "2-2",
                      "influence": 0.55
                    }
                  ],
                  "outcome": {
                    "fact": "學生檢查作業規定後發現關鍵每一步都需使用校內設備，必須詢問開放時段或合法替代方式。",
                    "claims": [],
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
                      "transmissions": []
                    }
                  }
                }
              ]
            },
            {
              "id": "refer",
              "text": "協助詢問校內開放時段或替代方式",
              "kind": "support",
              "emotional": false,
              "outcome": {
                "fact": "教師協助查可詢問的校內開放安排及替代媒材，尚未取得使用許可。",
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
              "id": "document",
              "text": "先整理缺少的器材，讓科任判斷",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生列出缺少器材及可做部分給科任判斷，不要求家庭購買昂貴設備。",
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
              "text": "設備做不到，不等於你不努力",
              "kind": "action",
              "emotional": true,
              "outcome": {
                "fact": "教師肯定限制不等於態度，未因此免除課程要求或保證改作業。",
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
      "id": "content:18b-t01-03-29",
      "topicId": "T01-03",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-03-29",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "1-1",
        "4-2",
        "2-2"
      ],
      "additionalCodes": [
        "2-4",
        "7-3",
        "3-2"
      ],
      "weights": [
        0.213,
        0.161,
        0.161,
        0.179,
        0.179,
        0.107
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
      "resourceId": "content:18b-t01-03-30",
      "definitionId": "content:18b-t01-03-30",
      "version": "1",
      "topicId": "T01-03",
      "status": "engineering-test",
      "choiceContract": "four-v2",
      "entry": "opening",
      "stages": [
        {
          "id": "opening",
          "pages": [
            {
              "order": 1,
              "text": "午餐時，在教師辦公室，學生因校方核准的社團公假缺席小考，不清楚是否需要自行聯絡補考。",
              "speaker": null,
              "scene": "school:teachers-office",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "有公假不就不用考了嗎？",
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
              "text": "說明公假不等於免除所有評量",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "教師分別說明公假與評量仍需安排，沒有把合法公假視為違規或自動免測。",
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
              },
              "variants": [
                {
                  "id": "evidence-found",
                  "weight": 2.1,
                  "modifiers": [
                    {
                      "role": "participant",
                      "holder": "person",
                      "code": "3-4",
                      "influence": 0.55
                    }
                  ],
                  "outcome": {
                    "fact": "學生出示核准公假單與小考通知，知道能依程序詢問補測，沒有把公假解讀為免測。",
                    "claims": [],
                    "changes": [
                      {
                        "role": "teacher",
                        "holder": "work",
                        "code": "11-2",
                        "delta": -1
                      },
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
                  "id": "evidence-complicated",
                  "weight": 2.3,
                  "modifiers": [
                    {
                      "role": "participant",
                      "holder": "person",
                      "code": "2-2",
                      "influence": 0.55
                    }
                  ],
                  "outcome": {
                    "fact": "學生查看資料後發現公假程序仍缺一份核准紀錄，必須先補齊文件再談正式補測安排。",
                    "claims": [],
                    "changes": [
                      {
                        "role": "teacher",
                        "holder": "work",
                        "code": "11-2",
                        "delta": -1
                      },
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
                      "transmissions": []
                    }
                  }
                }
              ]
            },
            {
              "id": "refer",
              "text": "協助聯絡科任確認正式補測安排",
              "kind": "support",
              "emotional": false,
              "outcome": {
                "fact": "學生擬出附正式公假資訊的補測詢問，尚未排定時間。",
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
              "id": "document",
              "text": "請學生保留公假與考試通知",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生保留自己的活動及測驗通知，不公開其他同學行程。",
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
              "text": "活動和課業兩邊都要安排，確實麻煩",
              "kind": "action",
              "emotional": true,
              "outcome": {
                "fact": "教師承接活動與課業衝突的麻煩，未替社團或任課單方取消安排。",
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
      "id": "content:18b-t01-03-30",
      "topicId": "T01-03",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-03-30",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "1-1",
        "4-2",
        "2-2"
      ],
      "additionalCodes": [
        "4-1",
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
  }
];
