// Version 1 isolated authoring assets. Not a production catalogue.
// Authored text source and review provenance: work/18b-t01-05-authoring.json.
export default [
  {
    "story": {
      "resourceId": "content:18b-t01-05-01",
      "definitionId": "content:18b-t01-05-01",
      "version": "1",
      "topicId": "T01-05",
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
              "text": "午休時，學生在教師辦公室攤開報告草稿和兩個AI修改版本。科任寫的規則只有「自行完成」，並沒有說明潤稿的範圍。",
              "speaker": null,
              "scene": "school:teachers-office",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我只叫它修句子，可是它順便替我補了一段理由。那一段還算我寫的嗎？",
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
            },
            {
              "order": 3,
              "text": "你只能看見學生願意提供的紀錄；對這份作業的工具使用規則，科任目前尚未答覆。",
              "speaker": null,
              "scene": "school:teachers-office",
              "cast": [],
              "presentation": "narration"
            }
          ],
          "choices": [
            {
              "id": "strategy-1",
              "text": "把原句、潤稿與新增論點分開標示",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生把可辨認的語句調整及新增論點分別標出，導師沒有把任何一種情形直接判為違規。",
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
                }
              }
            },
            {
              "id": "strategy-2",
              "text": "由學生決定是否寫工具使用說明",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "教師提供揭露用途的寫法，學生可保留或使用，並未被要求在規則未明時直接認罪。",
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
                  "weight": 2.3,
                  "outcome": {
                    "fact": "學生在私人紀錄中標明AI新增的論點，尚未確定是否符合科任規定。",
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
                      "code": "1-4",
                      "influence": 1.1
                    }
                  ]
                },
                {
                  "id": "hesitates",
                  "weight": 2.4,
                  "outcome": {
                    "fact": "學生先保留所有版本，尚未提交工具使用說明。",
                    "claims": [
                      {
                        "role": "participant",
                        "statement": "我怕一說明就被誤認成承認作弊。",
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
                      "influence": 1.2
                    }
                  ]
                }
              ]
            },
            {
              "id": "strategy-3",
              "text": "先整理問題向科任確認可使用的範圍",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "教師協助整理不涉及其他學生資料的問題，正式規則仍待科任釐清。",
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
              "text": "規則只有四個字，叫人用猜的賭成績也太刺激",
              "kind": "action",
              "emotional": true,
              "outcome": {
                "fact": "教師承認學生難以判斷的困擾，建議保留原始版本與修改紀錄，不要求偷偷刪除證據。",
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
      ]
    },
    "definition": {
      "id": "content:18b-t01-05-01",
      "topicId": "T01-05",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-05-01",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "1-4",
        "4-2",
        "8-3"
      ],
      "additionalCodes": [
        "2-2",
        "3-2",
        "10-3"
      ],
      "weights": [
        0.22,
        0.22,
        0.14,
        0.23,
        0.12,
        0.07
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
        "school"
      ],
      "valence": "neutral"
    }
  },
  {
    "story": {
      "resourceId": "content:18b-t01-05-02",
      "definitionId": "content:18b-t01-05-02",
      "version": "1",
      "topicId": "T01-05",
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
              "text": "午餐時，在教師辦公室，學生拿自己的作業來，說另一份作業連特殊錯字都一樣；另一人並未到場。",
              "speaker": null,
              "scene": "school:teachers-office",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "那個錯字是我自己打的。",
              "speaker": "participant",
              "scene": "school:teachers-office",
              "cast": [
                {
                  "role": "participant",
                  "position": "center",
                  "expression": "angry"
                }
              ],
              "presentation": "dialogue"
            }
          ],
          "choices": [
            {
              "id": "strategy-1",
              "text": "只記錄可比對的位置",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "教師在學生同意下記下其作業位置，不取得另一人的帳號，也未判定誰抄誰。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
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
                  "id": "evidence-available",
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
                    "fact": "學生找到自己初稿的較早編輯時間，但仍不能因此排除共同使用範本或其他來源。",
                    "claims": [],
                    "changes": [],
                    "historyCodes": [],
                    "next": {
                      "stage": null,
                      "afterDays": 0
                    },
                    "world": {
                      "subjects": [
                        "teacher",
                        "participant"
                      ],
                      "witnesses": [
                        "teacher",
                        "participant"
                      ],
                      "affected": [
                        "participant"
                      ],
                      "contacts": [
                        [
                          "teacher",
                          "participant"
                        ]
                      ],
                      "transmissions": []
                    }
                  }
                },
                {
                  "id": "needs-clarification",
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
                    "fact": "學生重新比對後發現特殊錯字早已出現在共同範例中，先前對同學的懷疑需要修正。",
                    "claims": [],
                    "changes": [],
                    "historyCodes": [],
                    "next": {
                      "stage": null,
                      "afterDays": 0
                    },
                    "world": {
                      "subjects": [
                        "teacher",
                        "participant"
                      ],
                      "witnesses": [
                        "teacher",
                        "participant"
                      ],
                      "affected": [
                        "participant"
                      ],
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
              "text": "說明交由科任查核的方式",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "教師說明可提交原始版本及時間紀錄，由科任依課程規定調查；目前沒有處分。",
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
              "text": "先保護自己的檔案權限",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生在教師旁關閉自己檔案的公開編輯，沒有刪除版本歷程。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
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
              "text": "作品像被搬走，我聽得出你很不舒服",
              "kind": "action",
              "emotional": true,
              "outcome": {
                "fact": "教師聽完感受，提醒不在群組點名，沒有以憤怒推論另一人違規。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
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
              "text": "隔日，學生帶著自己可以取得的版本紀錄到教師辦公室；另一名同學仍未接受詢問。",
              "speaker": null,
              "scene": "school:teachers-office",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "如果我把這些交給科任，他會不會以為我在告狀？",
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
              "id": "check-record",
              "text": "對照本人可取得的正式紀錄，分清已確認與未確認的部分",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "教師說明可提交原始版本及時間紀錄，由科任依課程規定調查；目前沒有處分。",
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
                  "id": "documented-progress",
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
                    "fact": "學生出示了自己的版本時間與來源對照，證據已整理供正式受理，仍不能推定另一人抄襲。",
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
                  "id": "still-uncertain",
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
                    "fact": "學生發現少了最早的儲存紀錄，決定如實註明缺口，而不是補造時間證據。",
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
              ]
            },
            {
              "id": "ask-procedure",
              "text": "整理尚待權責人員釐清的具體問題",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "教師協助整理仍未查清的程序問題，不代替科任、當事人或校方作出正式判定。",
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
              "id": "protect-evidence",
              "text": "保留現有證據與接觸範圍，避免過度擴散",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生保留自己合法取得的原始資料，沒有擅自查看、轉傳或更改他人的資料。",
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
              "id": "care",
              "text": "承接學生對後果的擔心，不提前保證處理結果",
              "kind": "action",
              "emotional": true,
              "outcome": {
                "fact": "教師聽完學生的擔心，提醒未決的程序不等於預先定罪，也未承諾一定會得到想要的結果。",
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
          ]
        }
      ]
    },
    "definition": {
      "id": "content:18b-t01-05-02",
      "topicId": "T01-05",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-05-02",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "1-4",
        "4-2",
        "8-3"
      ],
      "additionalCodes": [
        "8-4",
        "3-2",
        "10-3"
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
        "school"
      ],
      "valence": "neutral"
    }
  },
  {
    "story": {
      "resourceId": "content:18b-t01-05-03",
      "definitionId": "content:18b-t01-05-03",
      "version": "1",
      "topicId": "T01-05",
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
              "text": "早自習時，在導師班教室裡，學生出示尚未繳交的閱讀報告，數段引文只有書名，沒有頁碼。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "書已經還了，今天要交。",
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
              "text": "查可取得的合法電子版",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "教師協助確認圖書館查詢入口，尚未找到頁碼，不憑記憶補數字。",
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
                  "id": "evidence-available",
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
                    "fact": "學生查到合法館藏的不同版本，發現同一句引文分頁不同，決定標出實際版本再引用。",
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
                  "id": "needs-clarification",
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
                    "fact": "館藏查得到書目卻暫時無法取得內文，學生保留缺頁註記，不拿搜尋摘要假裝已讀原文。",
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
              ]
            },
            {
              "id": "strategy-2",
              "text": "改成能確實回查的轉述",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "雙方挑出一段討論轉述與標示來源的差別，學生仍須自行完成。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
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
              "text": "請學生向科任說明缺項",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "教師提供如實說明尚缺頁碼的文字，不保證延長期限或免扣分。",
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
              "text": "頁碼不是裝飾，我們別編一個過關",
              "kind": "action",
              "emotional": true,
              "outcome": {
                "fact": "教師以無奈語氣提醒可追溯性，學生保留缺項標記，未偽造出處。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
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
      "id": "content:18b-t01-05-03",
      "topicId": "T01-05",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-05-03",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "1-4",
        "4-2",
        "8-3"
      ],
      "additionalCodes": [
        "1-1",
        "8-4",
        "3-2"
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
      "valence": "negative"
    }
  },
  {
    "story": {
      "resourceId": "content:18b-t01-05-04",
      "definitionId": "content:18b-t01-05-04",
      "version": "1",
      "topicId": "T01-05",
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
              "text": "午餐時，在校園談話角落，學生向導師描述讀書群有人貼出疑似未考試卷照片；教師尚未看到檔案。",
              "speaker": null,
              "scene": "school:counselling-corner",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我不知道是不是我們下午那張。",
              "speaker": "participant",
              "scene": "school:counselling-corner",
              "cast": [
                {
                  "role": "participant",
                  "position": "center",
                  "expression": "surprised"
                }
              ],
              "presentation": "dialogue"
            },
            {
              "order": 3,
              "text": "你先確認這只是疑似資料，提醒不轉傳、不刪除原始訊息，不用在群組貼圖求證。涉及未考試題的保密與必要校內反映依原程序辦理；以下選項是本次與學生整理資訊的方式，不替權責單位決定換卷或違規處置，也不宣稱窗口已收到本次資料。",
              "speaker": null,
              "scene": "school:counselling-corner",
              "cast": [],
              "presentation": "narration"
            }
          ],
          "choices": [
            {
              "id": "strategy-1",
              "text": "記下收到時間與來源描述",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "教師只記下學生口述的收件時間與群組性質，不把照片當成真試題。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
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
              "text": "整理本人實際看過及是否轉傳的範圍",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生整理自己實際看過、是否下載或轉傳的範圍，教師只記本人陳述，不推定其他收件人行為或照片真偽。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
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
                  "id": "evidence-available",
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
                    "fact": "學生回想只在群組短暫看到縮圖，無法確認內容；導師將這個限制如實保留。",
                    "claims": [],
                    "changes": [],
                    "historyCodes": [],
                    "next": {
                      "stage": null,
                      "afterDays": 0
                    },
                    "world": {
                      "subjects": [
                        "teacher",
                        "participant"
                      ],
                      "witnesses": [
                        "teacher",
                        "participant"
                      ],
                      "affected": [
                        "participant"
                      ],
                      "contacts": [
                        [
                          "teacher",
                          "participant"
                        ]
                      ],
                      "transmissions": []
                    }
                  }
                },
                {
                  "id": "needs-clarification",
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
                    "fact": "學生確認曾下載疑似圖片，願意私下交代自己的接觸範圍，但導師沒有公開其他收件者姓名。",
                    "claims": [],
                    "changes": [],
                    "historyCodes": [],
                    "next": {
                      "stage": null,
                      "afterDays": 0
                    },
                    "world": {
                      "subjects": [
                        "teacher",
                        "participant"
                      ],
                      "witnesses": [
                        "teacher",
                        "participant"
                      ],
                      "affected": [
                        "participant"
                      ],
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
              "id": "strategy-3",
              "text": "依原公告準備，等權責單位確認",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生在自己的準備清單保留原公告範圍，教師提醒不以疑似照片改背題目，不代表權責單位已決定照常考或更換試卷。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
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
              "text": "先別讓一張照片把全班都捲進去",
              "kind": "action",
              "emotional": true,
              "outcome": {
                "fact": "教師表達擔心，協助學生避免公開貼圖詢問真偽，沒有承諾絕對匿名。",
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
      "id": "content:18b-t01-05-04",
      "topicId": "T01-05",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-05-04",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "1-4",
        "4-2",
        "8-3"
      ],
      "additionalCodes": [
        "1-1",
        "4-1",
        "8-4"
      ],
      "weights": [
        0.13,
        0.129,
        0.21,
        0.177,
        0.177,
        0.177
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
      "resourceId": "content:18b-t01-05-05",
      "definitionId": "content:18b-t01-05-05",
      "version": "1",
      "topicId": "T01-05",
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
              "text": "午休時，在教師辦公室，學生出示開書測驗公告，問能否考試時互傳筆記；公告只允許攜帶紙本資料。",
              "speaker": null,
              "scene": "school:teachers-office",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "開書不是就可以一起找嗎？",
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
              "id": "strategy-1",
              "text": "逐字區分資料與通訊",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "教師指出公告只涉及攜入資料，尚不能推出允許即時合作。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
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
              "text": "向任課確認合作限制",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "教師協助學生提出紙本共享與考中通訊兩個分開的問題，等候科任答覆。",
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
              },
              "variants": [
                {
                  "id": "evidence-available",
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
                    "fact": "科任原公告的補充說明已寫明只允許攜帶個人紙本；學生決定依已公開規則準備。",
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
                  "id": "needs-clarification",
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
                    "fact": "學生查遍公開公告仍找不到合作界線，決定在得到正式回覆前不進行考中傳訊。",
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
              ]
            },
            {
              "id": "strategy-3",
              "text": "準備自己的紙本索引",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生選擇先整理個人資料索引，並未取得合作許可。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
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
              "text": "好險你先問了，規則真的不能靠猜",
              "kind": "action",
              "emotional": true,
              "outcome": {
                "fact": "教師肯定事先詢問，提醒在確認前不以同學意見當成授權。",
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
              "text": "隔日，學生再次拿出開書測驗公告，準備確認紙本資料與考中傳訊的界線。",
              "speaker": null,
              "scene": "school:teachers-office",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "同學有人說可以傳，可是老師還沒有回我。",
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
              "id": "check-record",
              "text": "對照本人可取得的正式紀錄，分清已確認與未確認的部分",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "教師協助學生提出紙本共享與考中通訊兩個分開的問題，等候科任答覆。",
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
                  "id": "documented-progress",
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
                    "fact": "學生找到科任正式公告禁止考中傳訊，依公開規則調整準備方式。",
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
                  "id": "still-uncertain",
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
                    "fact": "學生仍找不到正式答覆，決定繼續以不互傳資料的方式準備，不拿同學傳聞當許可。",
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
              ]
            },
            {
              "id": "ask-procedure",
              "text": "整理尚待權責人員釐清的具體問題",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "教師協助整理仍未查清的程序問題，不代替科任、當事人或校方作出正式判定。",
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
              "id": "protect-evidence",
              "text": "保留現有證據與接觸範圍，避免過度擴散",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生保留自己合法取得的原始資料，沒有擅自查看、轉傳或更改他人的資料。",
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
              "id": "care",
              "text": "承接學生對後果的擔心，不提前保證處理結果",
              "kind": "action",
              "emotional": true,
              "outcome": {
                "fact": "教師聽完學生的擔心，提醒未決的程序不等於預先定罪，也未承諾一定會得到想要的結果。",
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
          ]
        }
      ]
    },
    "definition": {
      "id": "content:18b-t01-05-05",
      "topicId": "T01-05",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-05-05",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "1-4",
        "4-2",
        "8-3"
      ],
      "additionalCodes": [
        "4-1",
        "6-1",
        "9-3"
      ],
      "weights": [
        0.137,
        0.203,
        0.136,
        0.186,
        0.169,
        0.169
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
      "resourceId": "content:18b-t01-05-06",
      "definitionId": "content:18b-t01-05-06",
      "version": "1",
      "topicId": "T01-05",
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
              "text": "午餐時，在校園談話角落，學生承認在未繳交的練習報告貼入補習班解答，現在不知道如何補救。",
              "speaker": null,
              "scene": "school:counselling-corner",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我看懂了，可是那段真的不是我寫的。",
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
              "id": "strategy-1",
              "text": "讓他口述後自行重寫",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生嘗試用自己的話說出第一步，教師沒有將口述等同整篇原創。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
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
                  "id": "evidence-available",
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
                    "fact": "學生能以自己的例子重述解題原理，決定標出原先引用並重新寫作，尚不能因此直接獲得分數。",
                    "claims": [],
                    "changes": [],
                    "historyCodes": [],
                    "next": {
                      "stage": null,
                      "afterDays": 0
                    },
                    "world": {
                      "subjects": [
                        "teacher",
                        "participant"
                      ],
                      "witnesses": [
                        "teacher",
                        "participant"
                      ],
                      "affected": [
                        "participant"
                      ],
                      "contacts": [
                        [
                          "teacher",
                          "participant"
                        ]
                      ],
                      "transmissions": []
                    }
                  }
                },
                {
                  "id": "needs-clarification",
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
                    "fact": "學生發現只記得答案順序，說不出中間推理，決定從尚未理解的地方重新學，而非將答案改寫成自己的口氣。",
                    "claims": [],
                    "changes": [],
                    "historyCodes": [],
                    "next": {
                      "stage": null,
                      "afterDays": 0
                    },
                    "world": {
                      "subjects": [
                        "teacher",
                        "participant"
                      ],
                      "witnesses": [
                        "teacher",
                        "participant"
                      ],
                      "affected": [
                        "participant"
                      ],
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
              "text": "標出借用內容與來源",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "教師協助圈出直接借用部分，是否可保留由課程規定判斷。",
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
              "text": "協助向科任誠實說明",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "教師陪學生擬好說明及重做詢問，不保證免責或改變評分。",
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
              "text": "你現在願意停下來，比繼續貼完好",
              "kind": "action",
              "emotional": true,
              "outcome": {
                "fact": "教師肯定停止複製的決定，沒有稱讚未完成的補救已成功。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
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
      "id": "content:18b-t01-05-06",
      "topicId": "T01-05",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-05-06",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "1-4",
        "4-2",
        "8-3"
      ],
      "additionalCodes": [
        "8-4",
        "3-2",
        "10-3"
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
        "school"
      ],
      "valence": "neutral"
    }
  },
  {
    "story": {
      "resourceId": "content:18b-t01-05-08",
      "definitionId": "content:18b-t01-05-08",
      "version": "1",
      "topicId": "T01-05",
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
              "text": "早自習時，在導師班教室裡，學生說同學一直要可編輯的完整報告，稱只是參考；學生尚未提供。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "拒絕了好像很小氣。",
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
              "text": "練習只分享討論架構",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "雙方試寫提供提問清單而不交整份檔案的回覆，尚不知同學是否接受。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
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
              "text": "設定唯讀與存取範圍",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "教師示範用空白檔說明權限，學生自行決定是否分享原稿。",
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
              "text": "明確拒絕提供成品",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生擬出拒絕交出報告的訊息，教師不替他傳送或責備同學。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
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
                  "weight": 2.3,
                  "modifiers": [
                    {
                      "role": "participant",
                      "holder": "person",
                      "code": "1-4",
                      "influence": 0.8
                    }
                  ],
                  "outcome": {
                    "fact": "學生已擬好不交完整報告的說法，決定由自己向同學表達，教師沒有擅自代傳。",
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
                  "weight": 2.4,
                  "modifiers": [
                    {
                      "role": "participant",
                      "holder": "person",
                      "code": "4-4",
                      "influence": 1
                    }
                  ],
                  "outcome": {
                    "fact": "學生已擬好不交完整報告的說法，仍怕被認為小氣，先保留回覆草稿。",
                    "claims": [],
                    "changes": [],
                    "historyCodes": [],
                    "next": {
                      "stage": null,
                      "afterDays": 0
                    },
                    "world": {
                      "subjects": [
                        "teacher",
                        "participant"
                      ],
                      "witnesses": [
                        "teacher",
                        "participant"
                      ],
                      "affected": [
                        "participant"
                      ],
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
              "text": "你的心血不用靠交出檔案證明友誼",
              "kind": "action",
              "emotional": true,
              "outcome": {
                "fact": "教師表達支持，學生知道可以保留作品，未因此判定索取者會抄襲。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
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
      "id": "content:18b-t01-05-08",
      "topicId": "T01-05",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-05-08",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "1-4",
        "4-2",
        "8-3"
      ],
      "additionalCodes": [
        "4-4",
        "6-2",
        "8-4"
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
      "resourceId": "content:18b-t01-05-09",
      "definitionId": "content:18b-t01-05-09",
      "version": "1",
      "topicId": "T01-05",
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
              "text": "午餐時，在教學大樓走廊，學生出示比對報告，參考文獻及題目也被標紅，便稱自己已被判抄襲。",
              "speaker": null,
              "scene": "school:corridor",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "上面寫百分之四十，我完了。",
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
              "text": "區分被標段落的性質",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "雙方將題目、引用與正文分開看，相似度數字未被當成違規裁決。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
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
                  "id": "evidence-available",
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
                    "fact": "比對標色主要落在題目及參考文獻，學生整理出需人工核對的少數正文段落。",
                    "claims": [],
                    "changes": [],
                    "historyCodes": [],
                    "next": {
                      "stage": null,
                      "afterDays": 0
                    },
                    "world": {
                      "subjects": [
                        "teacher",
                        "participant"
                      ],
                      "witnesses": [
                        "teacher",
                        "participant"
                      ],
                      "affected": [
                        "participant"
                      ],
                      "contacts": [
                        [
                          "teacher",
                          "participant"
                        ]
                      ],
                      "transmissions": []
                    }
                  }
                },
                {
                  "id": "needs-clarification",
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
                    "fact": "正文有一段連續敘述與來源高度重合，學生保留原文與來源待科任判讀，不用整份百分比掩蓋具體問題。",
                    "claims": [],
                    "changes": [],
                    "historyCodes": [],
                    "next": {
                      "stage": null,
                      "afterDays": 0
                    },
                    "world": {
                      "subjects": [
                        "teacher",
                        "participant"
                      ],
                      "witnesses": [
                        "teacher",
                        "participant"
                      ],
                      "affected": [
                        "participant"
                      ],
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
              "text": "備妥可供科任檢視的原稿",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生保留版本與來源清單，教師未自行改動比對設定以降低數字。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
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
              "text": "請科任解釋判讀依據",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "教師協助整理具體標示段落的詢問，是否違規仍待正式判斷。",
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
              "text": "先把那個百分比放下來喘口氣",
              "kind": "action",
              "emotional": true,
              "outcome": {
                "fact": "教師陪學生暫停災難式推論，沒有保證一定不會有問題。",
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
      "id": "content:18b-t01-05-09",
      "topicId": "T01-05",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-05-09",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "1-4",
        "4-2",
        "8-3"
      ],
      "additionalCodes": [
        "8-4",
        "3-2",
        "10-3"
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
        "school"
      ],
      "valence": "neutral"
    }
  },
  {
    "story": {
      "resourceId": "content:18b-t01-05-10",
      "definitionId": "content:18b-t01-05-10",
      "version": "1",
      "topicId": "T01-05",
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
              "text": "午餐時，在教師辦公室，學生準備把網路照片放進研究海報，只在圖片下寫「取自網路」。",
              "speaker": null,
              "scene": "school:teachers-office",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "有標網路就可以吧？",
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
              "id": "strategy-1",
              "text": "追查原始來源與授權",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "雙方找到搜尋結果不是授權證明，尚未確認原作者允許的用途。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
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
                  "id": "evidence-available",
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
                    "fact": "學生查到原圖提供的是限個人欣賞的條件，主動撤下公開展示版的圖片。",
                    "claims": [],
                    "changes": [],
                    "historyCodes": [],
                    "next": {
                      "stage": null,
                      "afterDays": 0
                    },
                    "world": {
                      "subjects": [
                        "teacher",
                        "participant"
                      ],
                      "witnesses": [
                        "teacher",
                        "participant"
                      ],
                      "affected": [
                        "participant"
                      ],
                      "contacts": [
                        [
                          "teacher",
                          "participant"
                        ]
                      ],
                      "transmissions": []
                    }
                  }
                },
                {
                  "id": "needs-clarification",
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
                    "fact": "圖片經過多次轉貼，找不到原作者及使用條件，學生改找可確認授權的替代素材。",
                    "claims": [],
                    "changes": [],
                    "historyCodes": [],
                    "next": {
                      "stage": null,
                      "afterDays": 0
                    },
                    "world": {
                      "subjects": [
                        "teacher",
                        "participant"
                      ],
                      "witnesses": [
                        "teacher",
                        "participant"
                      ],
                      "affected": [
                        "participant"
                      ],
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
              "text": "換用自己拍攝的素材",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "教師提議改拍不含他人個資的替代照片，學生尚未實際拍攝。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
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
              "text": "改成文字描述並列資料來源",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生在草稿取消照片位置改列說明，不代表事實查核已完成。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
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
              "text": "好圖很誘人，但不能靠四個字借走",
              "kind": "action",
              "emotional": true,
              "outcome": {
                "fact": "教師以幽默提醒引用與使用授權不同，未宣稱所有網路圖片都禁止使用。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
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
      "id": "content:18b-t01-05-10",
      "topicId": "T01-05",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-05-10",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "1-4",
        "4-2",
        "8-3"
      ],
      "additionalCodes": [
        "7-3",
        "3-2",
        "8-4"
      ],
      "weights": [
        0.126,
        0.125,
        0.234,
        0.203,
        0.203,
        0.109
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
        "participant",
        "participant",
        "participant"
      ],
      "valence": "neutral"
    }
  },
  {
    "story": {
      "resourceId": "content:18b-t01-05-11",
      "definitionId": "content:18b-t01-05-11",
      "version": "1",
      "topicId": "T01-05",
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
              "text": "早自習時，在導師班教室裡，學生出示程式及參考教學，想知道改了變數名是否就算自行完成。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "主要邏輯還是照那篇的。",
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
              "text": "標記沿用與自寫區段",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "雙方在本機副本區分來源區段，未把改名當成獨立創作。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
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
              "text": "練習解釋一個關鍵函式",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生當場解釋輸入與輸出，教師只確認這次說明，不推論全部理解。",
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
                  "id": "evidence-available",
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
                    "fact": "學生能解釋函式如何處理測資，卻無法說明參考程式的例外情形，將不懂的部分標為待學。",
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
                  "id": "needs-clarification",
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
                    "fact": "學生發現自己連改名後的變數流向也講不清楚，選擇先補齊理解再決定如何揭露沿用部分。",
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
              ]
            },
            {
              "id": "strategy-3",
              "text": "向科任詢問引用格式",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "教師協助列出來源網址與版本，課程是否允許沿用仍未確認。",
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
              "text": "會找範例是能力，裝成沒參考就可惜了",
              "kind": "action",
              "emotional": true,
              "outcome": {
                "fact": "教師肯定查找資源並提醒如實揭露，未代替課程授予分數。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
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
      "id": "content:18b-t01-05-11",
      "topicId": "T01-05",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-05-11",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "1-4",
        "4-2",
        "8-3"
      ],
      "additionalCodes": [
        "1-1",
        "3-2",
        "10-3"
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
        "school"
      ],
      "valence": "neutral"
    }
  },
  {
    "story": {
      "resourceId": "content:18b-t01-05-12",
      "definitionId": "content:18b-t01-05-12",
      "version": "1",
      "topicId": "T01-05",
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
              "text": "早自習時，在導師班教室裡，學生問能否把去年社團研究原封交作本學期成果，尚未繳交。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "明明都是我寫的，為什麼還要問？",
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
              "text": "核對本次作業的新增要求",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "雙方比對手邊說明，舊作是否符合本次任務尚不能下結論。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
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
              "text": "標明舊作並規劃新增分析",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生在草稿註記原作時間，新增工作仍是計畫。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
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
                  "id": "evidence-available",
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
                    "fact": "學生查到本次成果要求有新資料比較，規劃將舊作與新增分析清楚分開。",
                    "claims": [],
                    "changes": [],
                    "historyCodes": [],
                    "next": {
                      "stage": null,
                      "afterDays": 0
                    },
                    "world": {
                      "subjects": [
                        "teacher",
                        "participant"
                      ],
                      "witnesses": [
                        "teacher",
                        "participant"
                      ],
                      "affected": [
                        "participant"
                      ],
                      "contacts": [
                        [
                          "teacher",
                          "participant"
                        ]
                      ],
                      "transmissions": []
                    }
                  }
                },
                {
                  "id": "needs-clarification",
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
                    "fact": "學生發現課程只寫『本學期完成』卻未說明舊作可否延伸，決定先揭露完成時間詢問。",
                    "claims": [],
                    "changes": [],
                    "historyCodes": [],
                    "next": {
                      "stage": null,
                      "afterDays": 0
                    },
                    "world": {
                      "subjects": [
                        "teacher",
                        "participant"
                      ],
                      "witnesses": [
                        "teacher",
                        "participant"
                      ],
                      "affected": [
                        "participant"
                      ],
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
              "id": "strategy-3",
              "text": "先取得科任明確同意",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "教師協助擬定附上舊作範圍的詢問，不替科任答應可重交。",
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
              "text": "自己的舊成果也值得有個誠實的日期",
              "kind": "action",
              "emotional": true,
              "outcome": {
                "fact": "教師提醒不隱藏完成時間，沒有將重用舊作一律稱為作弊。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
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
      "id": "content:18b-t01-05-12",
      "topicId": "T01-05",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-05-12",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "1-4",
        "4-2",
        "8-3"
      ],
      "additionalCodes": [
        "8-4",
        "3-2",
        "10-3"
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
        "school"
      ],
      "valence": "neutral"
    }
  },
  {
    "story": {
      "resourceId": "content:18b-t01-05-13",
      "definitionId": "content:18b-t01-05-13",
      "version": "1",
      "topicId": "T01-05",
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
              "text": "午餐時，在校園談話角落，學生向導師描述一張匿名截圖指控某人代寫，截圖未顯示完整對話。",
              "speaker": null,
              "scene": "school:counselling-corner",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "大家都說截圖就是真的。",
              "speaker": "participant",
              "scene": "school:counselling-corner",
              "cast": [
                {
                  "role": "participant",
                  "position": "center",
                  "expression": "angry"
                }
              ],
              "presentation": "dialogue"
            }
          ],
          "choices": [
            {
              "id": "strategy-1",
              "text": "記錄截圖缺少的脈絡",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "教師區分學生看見截圖與代寫是否成立，未補出未知的對話。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
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
                  "id": "evidence-available",
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
                    "fact": "學生發現截圖中看似『代寫』的句子前後被裁掉，先記下缺漏，不再將傳言當證據。",
                    "claims": [],
                    "changes": [],
                    "historyCodes": [],
                    "next": {
                      "stage": null,
                      "afterDays": 0
                    },
                    "world": {
                      "subjects": [
                        "teacher",
                        "participant"
                      ],
                      "witnesses": [
                        "teacher",
                        "participant"
                      ],
                      "affected": [
                        "participant"
                      ],
                      "contacts": [
                        [
                          "teacher",
                          "participant"
                        ]
                      ],
                      "transmissions": []
                    }
                  }
                },
                {
                  "id": "needs-clarification",
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
                    "fact": "學生確認截圖可辨識他人姓名及私訊內容，決定不再傳給班群，保留合法反映管道。",
                    "claims": [],
                    "changes": [],
                    "historyCodes": [],
                    "next": {
                      "stage": null,
                      "afterDays": 0
                    },
                    "world": {
                      "subjects": [
                        "teacher",
                        "participant"
                      ],
                      "witnesses": [
                        "teacher",
                        "participant"
                      ],
                      "affected": [
                        "participant"
                      ],
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
              "text": "提供正式反映管道",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "教師說明可向權責教師私下提交資料及接受詢問，不鼓勵匿名公審。",
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
              "text": "先停止班群指名轉傳",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "教師提醒學生不擴散可辨識指控，尚未接觸其他同學或刪除他人訊息。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
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
              "text": "我也不想讓一張裁切圖替人定案",
              "kind": "action",
              "emotional": true,
              "outcome": {
                "fact": "教師表達對草率定罪的擔心，保留調查與陳述機會。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
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
              "text": "隔日，學生帶著不含公開姓名的事實摘要，來討論匿名截圖引起的班群風波。",
              "speaker": null,
              "scene": "school:teachers-office",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "有人問我是不是也看過，那我該怎麼說？",
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
              "id": "check-record",
              "text": "對照本人可取得的正式紀錄，分清已確認與未確認的部分",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "教師說明可向權責教師私下提交資料及接受詢問，不鼓勵匿名公審。",
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
                  "id": "documented-progress",
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
                    "fact": "學生確認自己僅看過裁切版本，決定只回覆可確認的範圍，保留相關人陳述機會。",
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
                  "id": "still-uncertain",
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
                    "fact": "學生收到更多互相矛盾的轉述，仍不轉傳個資或指名推論，記錄待查部分。",
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
              ]
            },
            {
              "id": "ask-procedure",
              "text": "整理尚待權責人員釐清的具體問題",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "教師協助整理仍未查清的程序問題，不代替科任、當事人或校方作出正式判定。",
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
              "id": "protect-evidence",
              "text": "保留現有證據與接觸範圍，避免過度擴散",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生保留自己合法取得的原始資料，沒有擅自查看、轉傳或更改他人的資料。",
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
              "id": "care",
              "text": "承接學生對後果的擔心，不提前保證處理結果",
              "kind": "action",
              "emotional": true,
              "outcome": {
                "fact": "教師聽完學生的擔心，提醒未決的程序不等於預先定罪，也未承諾一定會得到想要的結果。",
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
          ]
        }
      ]
    },
    "definition": {
      "id": "content:18b-t01-05-13",
      "topicId": "T01-05",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-05-13",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "1-4",
        "4-2",
        "8-3"
      ],
      "additionalCodes": [
        "8-4",
        "3-2",
        "10-3"
      ],
      "weights": [
        0.251,
        0.25,
        0.154,
        0.115,
        0.115,
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
        "school"
      ],
      "valence": "neutral"
    }
  },
  {
    "story": {
      "resourceId": "content:18b-t01-05-14",
      "definitionId": "content:18b-t01-05-14",
      "version": "1",
      "topicId": "T01-05",
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
              "text": "午休時，在教師辦公室，學生拿原始測量表與報告，坦言把不合預期的三筆數值刪掉，尚未繳交。",
              "speaker": null,
              "scene": "school:teachers-office",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "留下來圖就不好看了。",
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
              "text": "恢復原值並註明異常",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生在副本補回三筆原始值，原因仍不明，未憑想像宣稱儀器故障。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
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
                  "id": "evidence-available",
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
                    "fact": "原始表顯示三筆異常集中在同一次測量，學生保留數據並加註可能的操作差異，仍待重驗。",
                    "claims": [],
                    "changes": [],
                    "historyCodes": [],
                    "next": {
                      "stage": null,
                      "afterDays": 0
                    },
                    "world": {
                      "subjects": [
                        "teacher",
                        "participant"
                      ],
                      "witnesses": [
                        "teacher",
                        "participant"
                      ],
                      "affected": [
                        "participant"
                      ],
                      "contacts": [
                        [
                          "teacher",
                          "participant"
                        ]
                      ],
                      "transmissions": []
                    }
                  }
                },
                {
                  "id": "needs-clarification",
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
                    "fact": "三筆數據分布在不同測量次數，學生承認不能以一次儀器故障解釋，恢復原值並重新思考結論。",
                    "claims": [],
                    "changes": [],
                    "historyCodes": [],
                    "next": {
                      "stage": null,
                      "afterDays": 0
                    },
                    "world": {
                      "subjects": [
                        "teacher",
                        "participant"
                      ],
                      "witnesses": [
                        "teacher",
                        "participant"
                      ],
                      "affected": [
                        "participant"
                      ],
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
              "text": "增加資料取捨的說明",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "教師說明須揭露取捨標準，是否適當由科任依方法判讀。",
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
              "text": "詢問可否重新測量",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "教師協助擬出重測申請，沒有先改成預期數字或保證能重測。",
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
              "text": "科學不是選美，醜一點的點也有話說",
              "kind": "action",
              "emotional": true,
              "outcome": {
                "fact": "教師以幽默回應並保留原始紀錄，未替學生認定研究已合格。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
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
      "id": "content:18b-t01-05-14",
      "topicId": "T01-05",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-05-14",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "1-4",
        "4-2",
        "8-3"
      ],
      "additionalCodes": [
        "1-1",
        "3-2",
        "10-3"
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
        "school"
      ],
      "valence": "neutral"
    }
  },
  {
    "story": {
      "resourceId": "content:18b-t01-05-15",
      "definitionId": "content:18b-t01-05-15",
      "version": "1",
      "topicId": "T01-05",
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
              "text": "午餐時，在教師辦公室，學生說練習小考時曾向鄰座問單字，問這是否也算「討論」。",
              "speaker": null,
              "scene": "school:teachers-office",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "老師沒說不能問，我以為可以。",
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
              "text": "整理當時公告與行為",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "教師記下學生自述的提示內容和未知規則，不判定其主觀故意。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
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
                  "id": "evidence-available",
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
                    "fact": "學生翻出當時黑板照片，僅能確認『個人作答』字樣，決定據實向科任說明詢問單字的行為。",
                    "claims": [],
                    "changes": [],
                    "historyCodes": [],
                    "next": {
                      "stage": null,
                      "afterDays": 0
                    },
                    "world": {
                      "subjects": [
                        "teacher",
                        "participant"
                      ],
                      "witnesses": [
                        "teacher",
                        "participant"
                      ],
                      "affected": [
                        "participant"
                      ],
                      "contacts": [
                        [
                          "teacher",
                          "participant"
                        ]
                      ],
                      "transmissions": []
                    }
                  }
                },
                {
                  "id": "needs-clarification",
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
                    "fact": "學生找不到完整公告，願意敘述自己問了什麼，但不能要求導師因規則不明就宣告無事。",
                    "claims": [],
                    "changes": [],
                    "historyCodes": [],
                    "next": {
                      "stage": null,
                      "afterDays": 0
                    },
                    "world": {
                      "subjects": [
                        "teacher",
                        "participant"
                      ],
                      "witnesses": [
                        "teacher",
                        "participant"
                      ],
                      "affected": [
                        "participant"
                      ],
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
              "text": "協助向任課說明",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生擬出自述供科任了解，教師沒有承諾說明後一定免處理。",
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
              "text": "練習考前確認規則",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "雙方寫下個人測驗與合作練習的確認問句，未回溯創造當時許可。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
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
              "text": "模糊的地方先問，比事後猜安心",
              "kind": "action",
              "emotional": true,
              "outcome": {
                "fact": "教師表達關切，不以規則可能不清便宣告已做的行為合法。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
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
      "id": "content:18b-t01-05-15",
      "topicId": "T01-05",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-05-15",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "1-4",
        "4-2",
        "8-3"
      ],
      "additionalCodes": [
        "4-3",
        "8-4",
        "3-2"
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
        "participant"
      ],
      "valence": "neutral"
    }
  },
  {
    "story": {
      "resourceId": "content:18b-t01-05-16",
      "definitionId": "content:18b-t01-05-16",
      "version": "1",
      "topicId": "T01-05",
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
              "text": "午餐時，在教學大樓走廊，學生出示自己有權存取的共編紀錄，發現最後署名漏了參與者。",
              "speaker": null,
              "scene": "school:corridor",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我怕加回去，交的人又刪掉。",
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
              "text": "保存自己可存取的版本",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生保留版本編號及貢獻段落，不取得其他帳號私人資料。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我怕加回去，交的人又刪掉。",
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
                  "id": "evidence-available",
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
                    "fact": "共編歷程顯示漏名者有數次實際編輯，學生將具體段落留存，準備請組員核對。",
                    "claims": [
                      {
                        "role": "participant",
                        "statement": "我怕加回去，交的人又刪掉。",
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
                  "id": "needs-clarification",
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
                    "fact": "學生發現其中一名漏署名者只有檢視紀錄，是否應列作者仍需依實際貢獻討論，沒有替他做決定。",
                    "claims": [
                      {
                        "role": "participant",
                        "statement": "我怕加回去，交的人又刪掉。",
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
              "id": "strategy-2",
              "text": "先提出作者貢獻表",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "教師協助列出實際工作待組員核對，沒有代替缺席組員同意署名。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我怕加回去，交的人又刪掉。",
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
              "text": "向科任說明署名待確認",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "教師協助寫出署名爭點，正式認定仍由課程程序處理。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我怕加回去，交的人又刪掉。",
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
              "text": "名字不是交檔那一秒才決定的",
              "kind": "action",
              "emotional": true,
              "outcome": {
                "fact": "教師表達不捨並提醒先保護證據，沒有認定漏名必然是惡意。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我怕加回去，交的人又刪掉。",
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
              "text": "隔日，學生帶著自己有權取得的共編版本與署名草稿，詢問後續核對方式。",
              "speaker": null,
              "scene": "school:teachers-office",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "版本都留下了，可是組員還沒全回。",
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
              "id": "check-record",
              "text": "對照本人可取得的正式紀錄，分清已確認與未確認的部分",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "教師協助寫出署名爭點，正式認定仍由課程程序處理。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我怕加回去，交的人又刪掉。",
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
              },
              "variants": [
                {
                  "id": "documented-progress",
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
                    "fact": "已有組員回覆確認一部分貢獻，學生整理已確認與未確認名單，不自行替全組定稿。",
                    "claims": [
                      {
                        "role": "participant",
                        "statement": "我怕加回去，交的人又刪掉。",
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
                  "id": "still-uncertain",
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
                    "fact": "組員尚未回覆或意見相反，學生保留版本差異，等正式課程程序協助釐清。",
                    "claims": [
                      {
                        "role": "participant",
                        "statement": "我怕加回去，交的人又刪掉。",
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
                }
              ]
            },
            {
              "id": "ask-procedure",
              "text": "整理尚待權責人員釐清的具體問題",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "教師協助整理仍未查清的程序問題，不代替科任、當事人或校方作出正式判定。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我怕加回去，交的人又刪掉。",
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
              "id": "protect-evidence",
              "text": "保留現有證據與接觸範圍，避免過度擴散",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生保留自己合法取得的原始資料，沒有擅自查看、轉傳或更改他人的資料。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我怕加回去，交的人又刪掉。",
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
              "id": "care",
              "text": "承接學生對後果的擔心，不提前保證處理結果",
              "kind": "action",
              "emotional": true,
              "outcome": {
                "fact": "教師聽完學生的擔心，提醒未決的程序不等於預先定罪，也未承諾一定會得到想要的結果。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我怕加回去，交的人又刪掉。",
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
            }
          ]
        }
      ]
    },
    "definition": {
      "id": "content:18b-t01-05-16",
      "topicId": "T01-05",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-05-16",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "1-4",
        "4-2",
        "8-3"
      ],
      "additionalCodes": [
        "8-4",
        "3-2",
        "10-3"
      ],
      "weights": [
        0.179,
        0.244,
        0.178,
        0.133,
        0.133,
        0.133
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
        "school"
      ],
      "valence": "negative"
    }
  },
  {
    "story": {
      "resourceId": "content:18b-t01-05-17",
      "definitionId": "content:18b-t01-05-17",
      "version": "1",
      "topicId": "T01-05",
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
              "text": "午餐時，在校園談話角落，學生拿手機上的代寫廣告詢問，表示還沒付款，廣告保證「原創不會抓」。",
              "speaker": null,
              "scene": "school:counselling-corner",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "它說不是抄的，這樣就可以嗎？",
              "speaker": "participant",
              "scene": "school:counselling-corner",
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
              "text": "區分原創與本人完成",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "教師指出沒有抄襲也不等於由本人完成，未測試或購買服務。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
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
              "text": "拆出可自行完成的起始段",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "雙方將報告第一個資料問題寫在紙上，學生尚未完成全文。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
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
                  "id": "evidence-available",
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
                    "fact": "學生把題目拆成可自行查找的三個小問題，決定先寫第一段，不再依賴廣告的保證。",
                    "claims": [],
                    "changes": [],
                    "historyCodes": [],
                    "next": {
                      "stage": null,
                      "afterDays": 0
                    },
                    "world": {
                      "subjects": [
                        "teacher",
                        "participant"
                      ],
                      "witnesses": [
                        "teacher",
                        "participant"
                      ],
                      "affected": [
                        "participant"
                      ],
                      "contacts": [
                        [
                          "teacher",
                          "participant"
                        ]
                      ],
                      "transmissions": []
                    }
                  }
                },
                {
                  "id": "needs-clarification",
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
                    "fact": "學生發現自己連資料從何找起也不清楚，先詢問合法的學習支持，而非把帳號交給陌生代寫者。",
                    "claims": [],
                    "changes": [],
                    "historyCodes": [],
                    "next": {
                      "stage": null,
                      "afterDays": 0
                    },
                    "world": {
                      "subjects": [
                        "teacher",
                        "participant"
                      ],
                      "witnesses": [
                        "teacher",
                        "participant"
                      ],
                      "affected": [
                        "participant"
                      ],
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
              "id": "strategy-3",
              "text": "查課程對外部協助的規定",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "教師協助找正式課程說明，不以廣告承諾判斷合法性。",
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
              "text": "保證不被抓，聽起來就讓我捏把冷汗",
              "kind": "action",
              "emotional": true,
              "outcome": {
                "fact": "教師表達擔心並提醒不要提供帳號或個資，沒有把尚未購買寫成已違規。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
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
      "id": "content:18b-t01-05-17",
      "topicId": "T01-05",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-05-17",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "1-4",
        "4-2",
        "8-3"
      ],
      "additionalCodes": [
        "8-4",
        "3-2",
        "10-3"
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
        "school"
      ],
      "valence": "neutral"
    }
  },
  {
    "story": {
      "resourceId": "content:18b-t01-05-18",
      "definitionId": "content:18b-t01-05-18",
      "version": "1",
      "topicId": "T01-05",
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
              "text": "午餐時，在校園談話角落，學生說組內表格列了沒做過的訪談，自己不想照稿上台；導師未看見訪談來源。",
              "speaker": null,
              "scene": "school:counselling-corner",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我不能假裝那些人真的說過。",
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
              "text": "分清親見與推測",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "教師記下學生自述沒有參與的部分，未直接判定整組偽造。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
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
                  "id": "evidence-available",
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
                    "fact": "學生找到自己參與訪談的時間紀錄，能區分確實聽過與未見過的引述，未替全組真偽下結論。",
                    "claims": [],
                    "changes": [],
                    "historyCodes": [],
                    "next": {
                      "stage": null,
                      "afterDays": 0
                    },
                    "world": {
                      "subjects": [
                        "teacher",
                        "participant"
                      ],
                      "witnesses": [
                        "teacher",
                        "participant"
                      ],
                      "affected": [
                        "participant"
                      ],
                      "contacts": [
                        [
                          "teacher",
                          "participant"
                        ]
                      ],
                      "transmissions": []
                    }
                  }
                },
                {
                  "id": "needs-clarification",
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
                    "fact": "學生沒有接觸訪談原始紀錄，決定只聲明自己未能核實，不把懷疑寫成全組造假。",
                    "claims": [],
                    "changes": [],
                    "historyCodes": [],
                    "next": {
                      "stage": null,
                      "afterDays": 0
                    },
                    "world": {
                      "subjects": [
                        "teacher",
                        "participant"
                      ],
                      "witnesses": [
                        "teacher",
                        "participant"
                      ],
                      "affected": [
                        "participant"
                      ],
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
              "text": "協助私下向科任反映",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "教師協助整理可驗證資料供科任調查，不承諾全組或個人的分數處理。",
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
              "text": "準備只陳述本人工作的稿",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生在自己的發言稿刪去未能確認的引述，未擅改全組檔案。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
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
              "text": "不想替沒見過的話背書，很可以理解",
              "kind": "action",
              "emotional": true,
              "outcome": {
                "fact": "教師支持如實表述，提醒不在台上突然點名指控同學。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
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
              "text": "隔日，學生帶著僅涉及本人工作的訪談準備紀錄，再次向導師說明。",
              "speaker": null,
              "scene": "school:teachers-office",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我不想在台上講假的，也怕整組被我害到。",
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
              "id": "check-record",
              "text": "對照本人可取得的正式紀錄，分清已確認與未確認的部分",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "教師協助整理可驗證資料供科任調查，不承諾全組或個人的分數處理。",
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
                  "id": "documented-progress",
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
                    "fact": "學生能指出自己確實參與的訪談和未核實的句子，準備向科任分開說明。",
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
                  "id": "still-uncertain",
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
                    "fact": "學生仍拿不到訪談原始紀錄，決定只陳述親身參與部分，不替其他人作真偽判斷。",
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
              ]
            },
            {
              "id": "ask-procedure",
              "text": "整理尚待權責人員釐清的具體問題",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "教師協助整理仍未查清的程序問題，不代替科任、當事人或校方作出正式判定。",
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
              "id": "protect-evidence",
              "text": "保留現有證據與接觸範圍，避免過度擴散",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生保留自己合法取得的原始資料，沒有擅自查看、轉傳或更改他人的資料。",
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
              "id": "care",
              "text": "承接學生對後果的擔心，不提前保證處理結果",
              "kind": "action",
              "emotional": true,
              "outcome": {
                "fact": "教師聽完學生的擔心，提醒未決的程序不等於預先定罪，也未承諾一定會得到想要的結果。",
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
          ]
        }
      ]
    },
    "definition": {
      "id": "content:18b-t01-05-18",
      "topicId": "T01-05",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-05-18",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "1-4",
        "4-2",
        "8-3"
      ],
      "additionalCodes": [
        "8-4",
        "3-2",
        "10-3"
      ],
      "weights": [
        0.251,
        0.154,
        0.25,
        0.115,
        0.115,
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
        "school"
      ],
      "valence": "neutral"
    }
  },
  {
    "story": {
      "resourceId": "content:18b-t01-05-19",
      "definitionId": "content:18b-t01-05-19",
      "version": "1",
      "topicId": "T01-05",
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
              "text": "午餐時，在校園談話角落，學生說自己把科任私傳的練習解答貼進班群，後來才注意到「課後再看」。",
              "speaker": null,
              "scene": "school:counselling-corner",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我現在刪掉，是不是就當沒發生？",
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
              "id": "strategy-1",
              "text": "保留傳送時間並如實告知",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "教師協助學生整理收件與轉傳時間，未將刪訊息視為未曾傳出。",
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
                  "id": "evidence-available",
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
                    "fact": "學生保留自己傳送時間及原訊息，發現群組已有多人回覆，於是說明可能影響但不推定每人都已看過。",
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
                  "id": "needs-clarification",
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
                    "fact": "學生只有自己的發送畫面，無從確認其他人是否讀取；教師記下這項未知，而不叫他假裝沒有傳出。",
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
              ]
            },
            {
              "id": "strategy-2",
              "text": "擬好向科任反映影響範圍的訊息",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "教師協助擬好向科任反映誤傳時間及可能收件範圍的訊息，目前尚未送出，未使科任自動知情。",
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
              "text": "停止再次轉傳並提醒暫緩使用",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "教師協助擬出不附解答的提醒，尚未讓其他收件人自動知情或服從。",
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
              "text": "先別忙著讓它消失，我們得把影響說清",
              "kind": "action",
              "emotional": true,
              "outcome": {
                "fact": "教師表達緊張並陪學生處理，沒有保證誤傳必然免責。",
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
      "id": "content:18b-t01-05-19",
      "topicId": "T01-05",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-05-19",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "1-4",
        "4-2",
        "8-3"
      ],
      "additionalCodes": [
        "4-1",
        "8-4",
        "3-2"
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
        "participant"
      ],
      "valence": "neutral"
    }
  },
  {
    "story": {
      "resourceId": "content:18b-t01-05-20",
      "definitionId": "content:18b-t01-05-20",
      "version": "1",
      "topicId": "T01-05",
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
              "text": "早自習時，在導師班教室裡，學生出示自己寫的口試練習卡，擔心照著同學幫改的句子回答就是代答。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "意思是我的，句子一起練過。",
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
              "text": "區分準備協助與當場代答",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "教師就學生提供的練習方式說明差別，不推論正式口試允許照讀。",
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
              "text": "讓學生不用卡片說明概念",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生當場用自己的話說明一個段落，未因此認定全部內容都獨立完成。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
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
                  "id": "evidence-available",
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
                    "fact": "學生能離開卡片說明概念，卻發現其中一段只會照背，選擇再練一次而非宣稱完全獨立。",
                    "claims": [],
                    "changes": [],
                    "historyCodes": [],
                    "next": {
                      "stage": null,
                      "afterDays": 0
                    },
                    "world": {
                      "subjects": [
                        "teacher",
                        "participant"
                      ],
                      "witnesses": [
                        "teacher",
                        "participant"
                      ],
                      "affected": [
                        "participant"
                      ],
                      "contacts": [
                        [
                          "teacher",
                          "participant"
                        ]
                      ],
                      "transmissions": []
                    }
                  }
                },
                {
                  "id": "needs-clarification",
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
                    "fact": "學生用自己的例子清楚解釋練習內容，仍決定在正式口試前確認是否允許攜帶提示卡。",
                    "claims": [],
                    "changes": [],
                    "historyCodes": [],
                    "next": {
                      "stage": null,
                      "afterDays": 0
                    },
                    "world": {
                      "subjects": [
                        "teacher",
                        "participant"
                      ],
                      "witnesses": [
                        "teacher",
                        "participant"
                      ],
                      "affected": [
                        "participant"
                      ],
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
              "id": "strategy-3",
              "text": "詢問口試可攜資料範圍",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "教師協助列出練習協助及卡片用途，等候任課解釋。",
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
              "text": "有人陪練值得珍惜，也要把界線問清",
              "kind": "action",
              "emotional": true,
              "outcome": {
                "fact": "教師肯定練習互助，沒有把所有共同練習指為作弊。",
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
      "id": "content:18b-t01-05-20",
      "topicId": "T01-05",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-05-20",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "1-4",
        "4-2",
        "8-3"
      ],
      "additionalCodes": [
        "3-3",
        "8-4",
        "3-2"
      ],
      "weights": [
        0.167,
        0.187,
        0.167,
        0.229,
        0.125,
        0.125
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
      "resourceId": "content:18b-t01-05-21",
      "definitionId": "content:18b-t01-05-21",
      "version": "1",
      "topicId": "T01-05",
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
              "text": "午餐時，在校園談話角落，學生查不到AI列出的兩篇期刊，出示查詢畫面及尚未繳交的書目。",
              "speaker": null,
              "scene": "school:counselling-corner",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "它連卷期都寫得很像真的。",
              "speaker": "participant",
              "scene": "school:counselling-corner",
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
              "text": "逐筆查正式資料庫",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "雙方記下兩筆未能查得的項目，尚不憑單次搜尋認定絕對不存在。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
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
                  "id": "evidence-available",
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
                    "fact": "學生查到其中一筆確有近似書名，但作者與年份不符，將AI產生的條目標為不可直接引用。",
                    "claims": [],
                    "changes": [],
                    "historyCodes": [],
                    "next": {
                      "stage": null,
                      "afterDays": 0
                    },
                    "world": {
                      "subjects": [
                        "teacher",
                        "participant"
                      ],
                      "witnesses": [
                        "teacher",
                        "participant"
                      ],
                      "affected": [
                        "participant"
                      ],
                      "contacts": [
                        [
                          "teacher",
                          "participant"
                        ]
                      ],
                      "transmissions": []
                    }
                  }
                },
                {
                  "id": "needs-clarification",
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
                    "fact": "兩筆在可用資料庫都無法核實，學生保留查詢記錄，停止在論點中援引它們。",
                    "claims": [],
                    "changes": [],
                    "historyCodes": [],
                    "next": {
                      "stage": null,
                      "afterDays": 0
                    },
                    "world": {
                      "subjects": [
                        "teacher",
                        "participant"
                      ],
                      "witnesses": [
                        "teacher",
                        "participant"
                      ],
                      "affected": [
                        "participant"
                      ],
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
              "text": "撤下未核實引文",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生在草稿把未核實條目標成不可使用，沒有換上另一筆未查來源。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
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
              "text": "以能實際取得的文獻重建論點",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "教師示範先讀一份可取得文獻再寫摘要，學生仍須自行研究。",
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
              "text": "排得像真的，反而更讓人起雞皮疙瘩",
              "kind": "action",
              "emotional": true,
              "outcome": {
                "fact": "教師表達驚訝，提醒格式完整不能取代查核，未把AI當可靠見證者。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
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
      "id": "content:18b-t01-05-21",
      "topicId": "T01-05",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-05-21",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "1-4",
        "4-2",
        "8-3"
      ],
      "additionalCodes": [
        "1-1",
        "8-4",
        "3-2"
      ],
      "weights": [
        0.188,
        0.167,
        0.187,
        0.208,
        0.125,
        0.125
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
      "resourceId": "content:18b-t01-05-22",
      "definitionId": "content:18b-t01-05-22",
      "version": "1",
      "topicId": "T01-05",
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
              "text": "午餐時，在校園談話角落，學生翻閱已繳交報告的個人副本，指出一段直接引文漏了引號，想悄悄換檔。",
              "speaker": null,
              "scene": "school:counselling-corner",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "現在補上，老師會不會以為我故意的？",
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
              "text": "保留原交版本與更正說明",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "教師協助列出漏註位置及發現時間，未覆蓋原始檔案以掩蓋紀錄。",
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
                  "id": "evidence-available",
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
                    "fact": "學生找回原始來源，發現漏引號的段落可以精確定位，保存舊版並準備具體補正。",
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
                  "id": "needs-clarification",
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
                    "fact": "學生一時找不到對應原文，決定先誠實註記尚待確認，不偷偷換成看似完整的新檔。",
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
              ]
            },
            {
              "id": "strategy-2",
              "text": "透過正式管道申請更正",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生擬出補註申請，是否受理及如何評分仍待科任決定。",
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
              "id": "strategy-3",
              "text": "整理完整來源供說明",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生把手邊原文及引用位置放在一起，未將漏註原因斷定為無意。",
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
              "text": "願意回頭補正不容易，我陪你說清楚",
              "kind": "action",
              "emotional": true,
              "outcome": {
                "fact": "教師表達支持，沒有保證主動說明就能免除責任。",
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
              "text": "隔日，學生拿著原繳交版本與補正說明，核對是否已依正式程序送出。",
              "speaker": null,
              "scene": "school:teachers-office",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我寫好了補正，但不確定老師會不會受理。",
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
              "id": "check-record",
              "text": "對照本人可取得的正式紀錄，分清已確認與未確認的部分",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生擬出補註申請，是否受理及如何評分仍待科任決定。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
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
                  "id": "documented-progress",
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
                    "fact": "學生找到正式收件確認，記錄已提出更正，是否採納及如何評分仍由科任決定。",
                    "claims": [],
                    "changes": [],
                    "historyCodes": [],
                    "next": {
                      "stage": null,
                      "afterDays": 0
                    },
                    "world": {
                      "subjects": [
                        "teacher",
                        "participant"
                      ],
                      "witnesses": [
                        "teacher",
                        "participant"
                      ],
                      "affected": [
                        "participant"
                      ],
                      "contacts": [
                        [
                          "teacher",
                          "participant"
                        ]
                      ],
                      "transmissions": []
                    }
                  }
                },
                {
                  "id": "still-uncertain",
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
                    "fact": "學生尚無送達或受理證據，保留原件並確認合適的正式送件方式，不宣稱更正已完成。",
                    "claims": [],
                    "changes": [],
                    "historyCodes": [],
                    "next": {
                      "stage": null,
                      "afterDays": 0
                    },
                    "world": {
                      "subjects": [
                        "teacher",
                        "participant"
                      ],
                      "witnesses": [
                        "teacher",
                        "participant"
                      ],
                      "affected": [
                        "participant"
                      ],
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
              "id": "ask-procedure",
              "text": "整理尚待權責人員釐清的具體問題",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "教師協助整理仍未查清的程序問題，不代替科任、當事人或校方作出正式判定。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": []
                }
              }
            },
            {
              "id": "protect-evidence",
              "text": "保留現有證據與接觸範圍，避免過度擴散",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生保留自己合法取得的原始資料，沒有擅自查看、轉傳或更改他人的資料。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
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
              "text": "承接學生對後果的擔心，不提前保證處理結果",
              "kind": "action",
              "emotional": true,
              "outcome": {
                "fact": "教師聽完學生的擔心，提醒未決的程序不等於預先定罪，也未承諾一定會得到想要的結果。",
                "claims": [],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
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
      "id": "content:18b-t01-05-22",
      "topicId": "T01-05",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t01-05-22",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "1-4",
        "4-2",
        "8-3"
      ],
      "additionalCodes": [
        "1-1",
        "3-2",
        "10-3"
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
        "school"
      ],
      "valence": "neutral"
    }
  }
];
