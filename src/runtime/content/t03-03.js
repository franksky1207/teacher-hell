// Generated isolated T03 authoring records. Not a production catalogue.
// Source: work/18b-t03-03-authoring.json. Regenerate via scripts/sync-t03-drafts.mjs.
export default [
  {
    "story": {
      "resourceId": "content:18b-t03-03-01",
      "definitionId": "content:18b-t03-03-01",
      "version": "1",
      "topicId": "T03-03",
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
              "text": "學生拿著數學考卷來，算式完整，但答案從第三題起整排寫進下一題的欄位。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我明明會算，只是填在旁邊的格子。",
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
              "id": "clarify",
              "text": "一起核對從哪一題開始錯位",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生找出第一個錯位題，其他題仍需分別核對。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我明明會算，只是填在旁邊的格子。",
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
                      "description": "學生向導師口頭反映自己的觀察，未把說法傳給其他人。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "向科任詢問正式評分與作答規定",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師轉請科任確認正式規定，未自行修改分數。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我明明會算，只是填在旁邊的格子。",
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
                      "description": "學生向導師口頭反映自己的觀察，未把說法傳給其他人。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "試著建立寫答案前核對題號的步驟",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生選擇先看題號再作答，尚未證實改善效果。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我明明會算，只是填在旁邊的格子。",
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
                      "description": "學生向導師口頭反映自己的觀察，未把說法傳給其他人。"
                    }
                  ]
                }
              },
              "variants": [
                {
                  "id": "student-can-organize",
                  "weight": 2,
                  "modifiers": [
                    {
                      "role": "participant",
                      "holder": "person",
                      "code": "3-2",
                      "influence": 0.6
                    }
                  ],
                  "outcome": {
                    "fact": "學生在一份練習答案旁清楚標記題號，能指出第一次錯位的位置，但正式評分仍不變。",
                    "claims": [
                      {
                        "role": "participant",
                        "statement": "我明明會算，只是填在旁邊的格子。",
                        "belief": "believed",
                        "visible": false
                      }
                    ],
                    "changes": [
                      {
                        "role": "participant",
                        "holder": "person",
                        "code": "3-4",
                        "delta": 0.3
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
                          "description": "學生向導師口頭反映自己的觀察，未把說法傳給其他人。"
                        }
                      ]
                    }
                  }
                },
                {
                  "id": "student-needs-reframing",
                  "weight": 1,
                  "modifiers": [
                    {
                      "role": "participant",
                      "holder": "person",
                      "code": "2-2",
                      "influence": 0.5
                    }
                  ],
                  "outcome": {
                    "fact": "學生嘗試標記題號時發現自己仍會跳列，決定先請科任確認答題欄排列方式。",
                    "claims": [
                      {
                        "role": "participant",
                        "statement": "我明明會算，只是填在旁邊的格子。",
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
                          "description": "學生向導師口頭反映自己的觀察，未把說法傳給其他人。"
                        }
                      ]
                    }
                  }
                }
              ]
            },
            {
              "id": "empathy",
              "text": "會算卻寫錯格，真的會很懊惱",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生明白填答格式與概念理解是兩回事。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我明明會算，只是填在旁邊的格子。",
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
                      "description": "學生向導師口頭反映自己的觀察，未把說法傳給其他人。"
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
      "id": "content:18b-t03-03-01",
      "topicId": "T03-03",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-03-01",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "3-4",
        "3-2",
        "2-2"
      ],
      "additionalCodes": [
        "3-3",
        "4-1",
        "2-4"
      ],
      "weights": [
        0.19,
        0.22,
        0.24,
        0.13,
        0.12,
        0.1
      ],
      "directions": [
        -1,
        -1,
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
          "early",
          "p4",
          "p5",
          "p6",
          "p7",
          "p8"
        ],
        "from": null,
        "until": null,
        "facts": [],
        "history": [],
        "numeric": [],
        "enrollment": null
      },
      "repetition": {
        "cooldownDays": 45,
        "exclusionGroups": [],
        "sameFact": true,
        "reason": "獨立學生情境按既有資格與冷卻判斷"
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
      "resourceId": "content:18b-t03-03-02",
      "definitionId": "content:18b-t03-03-02",
      "version": "1",
      "topicId": "T03-03",
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
              "text": "學生把國文課的閱讀題畫了滿滿底線，卻仍找不到題目究竟要他回答哪一段。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "字都認得，但連起來我就不知道它在問什麼。",
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
              "text": "先釐清題目要求找出的訊息",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生指出不理解的提問，尚未找到原文答案。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "字都認得，但連起來我就不知道它在問什麼。",
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
                      "description": "學生向導師口頭反映自己的觀察，未把說法傳給其他人。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "與科任討論分段整理的閱讀策略",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師提出分段學習需求，科任尚未回覆。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "字都認得，但連起來我就不知道它在問什麼。",
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
                      "description": "學生向導師口頭反映自己的觀察，未把說法傳給其他人。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "陪學生把題目改寫成較短的句子",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生重新寫出提問，仍須核對是否符合原意。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "字都認得，但連起來我就不知道它在問什麼。",
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
                      "description": "學生向導師口頭反映自己的觀察，未把說法傳給其他人。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "讀三次還不懂，不代表你沒努力",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生知道可以詢問方法，不須先接受能力標籤。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "字都認得，但連起來我就不知道它在問什麼。",
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
                      "description": "學生向導師口頭反映自己的觀察，未把說法傳給其他人。"
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
      "id": "content:18b-t03-03-02",
      "topicId": "T03-03",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-03-02",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "3-4",
        "3-2",
        "2-2"
      ],
      "additionalCodes": [
        "3-3",
        "4-1",
        "2-4"
      ],
      "weights": [
        0.19,
        0.22,
        0.24,
        0.13,
        0.12,
        0.1
      ],
      "directions": [
        -1,
        -1,
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
          "early",
          "p4",
          "p5",
          "p6",
          "p7",
          "p8"
        ],
        "from": null,
        "until": null,
        "facts": [],
        "history": [],
        "numeric": [],
        "enrollment": null
      },
      "repetition": {
        "cooldownDays": 45,
        "exclusionGroups": [],
        "sameFact": true,
        "reason": "獨立學生情境按既有資格與冷卻判斷"
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
      "resourceId": "content:18b-t03-03-03",
      "definitionId": "content:18b-t03-03-03",
      "version": "1",
      "topicId": "T03-03",
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
              "text": "學生能算比例式，但數學科把數字放進一大段生活情境後，他不知道該選哪一個條件。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "算式我會，故事一長就不知道從哪裡開始。",
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
              "text": "請學生先圈出題目真正要求的量",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生標出所求量，尚未算出完整答案。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "算式我會，故事一長就不知道從哪裡開始。",
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
                      "description": "學生向導師口頭反映自己的觀察，未把說法傳給其他人。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "請數學科任示範如何整理文字條件",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師向科任反映閱讀條件需求，尚未要求更改考題。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "算式我會，故事一長就不知道從哪裡開始。",
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
                      "description": "學生向導師口頭反映自己的觀察，未把說法傳給其他人。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "分開列出已知量與未知量",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生把條件分類，仍需檢查推理與算式。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "算式我會，故事一長就不知道從哪裡開始。",
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
                      "description": "學生向導師口頭反映自己的觀察，未把說法傳給其他人。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "文字題像找線索，先找到問題在哪",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生發現困難可能在文字理解，不直接否定計算能力。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "算式我會，故事一長就不知道從哪裡開始。",
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
                      "description": "學生向導師口頭反映自己的觀察，未把說法傳給其他人。"
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
      "id": "content:18b-t03-03-03",
      "topicId": "T03-03",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-03-03",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "3-4",
        "3-2",
        "2-2"
      ],
      "additionalCodes": [
        "3-3",
        "4-1",
        "2-4"
      ],
      "weights": [
        0.19,
        0.22,
        0.24,
        0.13,
        0.12,
        0.1
      ],
      "directions": [
        -1,
        -1,
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
          "early",
          "p4",
          "p5",
          "p6",
          "p7",
          "p8"
        ],
        "from": null,
        "until": null,
        "facts": [],
        "history": [],
        "numeric": [],
        "enrollment": null
      },
      "repetition": {
        "cooldownDays": 45,
        "exclusionGroups": [],
        "sameFact": true,
        "reason": "獨立學生情境按既有資格與冷卻判斷"
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
      "resourceId": "content:18b-t03-03-04",
      "definitionId": "content:18b-t03-03-04",
      "version": "1",
      "topicId": "T03-03",
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
              "text": "學生的筆記前半頁抄得完整，後半頁卻空白；他說抬頭聽解釋時就跟不上抄寫。",
              "speaker": null,
              "scene": "school:teachers-office",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我只能選聽或者寫，沒辦法兩個一起。",
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
              "id": "clarify",
              "text": "先了解哪個環節最容易漏掉",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生指出課堂資訊中斷的位置，原因仍需釐清。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我只能選聽或者寫，沒辦法兩個一起。",
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
                      "description": "學生向導師口頭反映自己的觀察，未把說法傳給其他人。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "和科任商量提供課堂重點資料",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師詢問能否取得重點資料，尚未取得科任同意。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我只能選聽或者寫，沒辦法兩個一起。",
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
                      "description": "學生向導師口頭反映自己的觀察，未把說法傳給其他人。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "讓學生用標記留下待補的段落",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生標記筆記缺漏，仍須課後核對。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我只能選聽或者寫，沒辦法兩個一起。",
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
                      "description": "學生向導師口頭反映自己的觀察，未把說法傳給其他人。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "聽和寫都有在努力，不必用抄多快證明",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生願意坦承學習困難，不需假裝筆記完整。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我只能選聽或者寫，沒辦法兩個一起。",
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
                      "description": "學生向導師口頭反映自己的觀察，未把說法傳給其他人。"
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
      "id": "content:18b-t03-03-04",
      "topicId": "T03-03",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-03-04",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "3-4",
        "3-2",
        "2-2"
      ],
      "additionalCodes": [
        "3-3",
        "4-1",
        "2-4"
      ],
      "weights": [
        0.19,
        0.22,
        0.24,
        0.13,
        0.12,
        0.1
      ],
      "directions": [
        -1,
        -1,
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
          "early",
          "p4",
          "p5",
          "p6",
          "p7",
          "p8"
        ],
        "from": null,
        "until": null,
        "facts": [],
        "history": [],
        "numeric": [],
        "enrollment": null
      },
      "repetition": {
        "cooldownDays": 45,
        "exclusionGroups": [],
        "sameFact": true,
        "reason": "獨立學生情境按既有資格與冷卻判斷"
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
      "resourceId": "content:18b-t03-03-05",
      "definitionId": "content:18b-t03-03-05",
      "version": "1",
      "topicId": "T03-03",
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
              "text": "學生帶來補救課通知，時間剛好跟他負責的社團練習重疊。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我想把功課補起來，也不想臨時丟下社團。",
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
              "id": "inquire",
              "text": "核對兩項活動的正式時段",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師確認兩項活動確實撞期，尚未改動任何安排。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我想把功課補起來，也不想臨時丟下社團。",
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
                      "description": "學生當面向導師敘述個人學習困難；未在場的人不自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "向授課與社團承辦詢問調整空間",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "承辦人收到協調需求，正式出席規範待確認。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我想把功課補起來，也不想臨時丟下社團。",
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
                      "description": "學生當面向導師敘述個人學習困難；未在場的人不自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "陪學生排序眼前的學習與承諾",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生整理優先順序，尚未替他決定退出。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我想把功課補起來，也不想臨時丟下社團。",
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
                      "description": "學生當面向導師敘述個人學習困難；未在場的人不自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "兩邊都重要，先別當成只有一條路",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生知道可以提出兩難，不必被認定逃避補救。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我想把功課補起來，也不想臨時丟下社團。",
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
                      "description": "學生當面向導師敘述個人學習困難；未在場的人不自動知情。"
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
      "id": "content:18b-t03-03-05",
      "topicId": "T03-03",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-03-05",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "3-4",
        "3-2",
        "2-2"
      ],
      "additionalCodes": [
        "3-3",
        "4-1",
        "2-4"
      ],
      "weights": [
        0.19,
        0.22,
        0.24,
        0.13,
        0.12,
        0.1
      ],
      "directions": [
        -1,
        -1,
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
          "early",
          "p4",
          "p5",
          "p6",
          "p7",
          "p8"
        ],
        "from": null,
        "until": null,
        "facts": [],
        "history": [],
        "numeric": [],
        "enrollment": null
      },
      "repetition": {
        "cooldownDays": 45,
        "exclusionGroups": [],
        "sameFact": true,
        "reason": "獨立學生情境按既有資格與冷卻判斷"
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
      "resourceId": "content:18b-t03-03-06",
      "definitionId": "content:18b-t03-03-06",
      "version": "1",
      "topicId": "T03-03",
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
              "text": "學生能在英文課說出單字意思，默寫卻常把字母順序寫反。",
              "speaker": null,
              "scene": "school:teachers-office",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我明明知道它是什麼，寫出來就變另一個字。",
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
              "id": "inquire",
              "text": "先區分詞義理解與拼字錯誤",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生找出拼寫困難的型態，未因此推定診斷。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我明明知道它是什麼，寫出來就變另一個字。",
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
                      "description": "學生當面向導師敘述個人學習困難；未在場的人不自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "請英文科任建議分段拼寫練習",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師向科任詢問支持方式，未自行調整正式評量。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我明明知道它是什麼，寫出來就變另一個字。",
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
                      "description": "學生當面向導師敘述個人學習困難；未在場的人不自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "請學生挑三個容易混淆的字試練",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生開始試練少量單字，效果尚待檢驗。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我明明知道它是什麼，寫出來就變另一個字。",
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
                      "description": "學生當面向導師敘述個人學習困難；未在場的人不自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "會說但寫不出來，不代表沒學會任何事",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生看見自己的口語理解仍是優勢。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我明明知道它是什麼，寫出來就變另一個字。",
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
                      "description": "學生當面向導師敘述個人學習困難；未在場的人不自動知情。"
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
      "id": "content:18b-t03-03-06",
      "topicId": "T03-03",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-03-06",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "3-4",
        "3-2",
        "2-2"
      ],
      "additionalCodes": [
        "3-3",
        "4-1",
        "2-4"
      ],
      "weights": [
        0.19,
        0.22,
        0.24,
        0.13,
        0.12,
        0.1
      ],
      "directions": [
        -1,
        -1,
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
          "early",
          "p4",
          "p5",
          "p6",
          "p7",
          "p8"
        ],
        "from": null,
        "until": null,
        "facts": [],
        "history": [],
        "numeric": [],
        "enrollment": null
      },
      "repetition": {
        "cooldownDays": 45,
        "exclusionGroups": [],
        "sameFact": true,
        "reason": "獨立學生情境按既有資格與冷卻判斷"
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
      "resourceId": "content:18b-t03-03-07",
      "definitionId": "content:18b-t03-03-07",
      "version": "1",
      "topicId": "T03-03",
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
              "text": "學生拿來滿滿一本抄寫題目的錯題本，說同一類題目下次還是做錯。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我抄好多頁了，就是不知道錯在哪。",
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
              "id": "inquire",
              "text": "選一題一起找出第一個錯誤步驟",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生找出一題的錯因，並不代表全部難題已會。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我抄好多頁了，就是不知道錯在哪。",
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
                      "description": "學生當面向導師敘述個人學習困難；未在場的人不自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "詢問科任錯題整理的原本目的",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "科任的整理要求仍需確認，不自行免除作業。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我抄好多頁了，就是不知道錯在哪。",
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
                      "description": "學生當面向導師敘述個人學習困難；未在場的人不自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "請學生寫下錯因而不是再抄一次",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生寫出一項具體錯因，待下一題檢驗。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我抄好多頁了，就是不知道錯在哪。",
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
                      "description": "學生當面向導師敘述個人學習困難；未在場的人不自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "抄到手痠，也不代表觀念會自動進來",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生開始區分用力抄寫與真正理解。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我抄好多頁了，就是不知道錯在哪。",
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
                      "description": "學生當面向導師敘述個人學習困難；未在場的人不自動知情。"
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
      "id": "content:18b-t03-03-07",
      "topicId": "T03-03",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-03-07",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "3-4",
        "3-2",
        "2-2"
      ],
      "additionalCodes": [
        "3-3",
        "4-1",
        "2-4"
      ],
      "weights": [
        0.19,
        0.22,
        0.24,
        0.13,
        0.12,
        0.1
      ],
      "directions": [
        -1,
        -1,
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
          "early",
          "p4",
          "p5",
          "p6",
          "p7",
          "p8"
        ],
        "from": null,
        "until": null,
        "facts": [],
        "history": [],
        "numeric": [],
        "enrollment": null
      },
      "repetition": {
        "cooldownDays": 45,
        "exclusionGroups": [],
        "sameFact": true,
        "reason": "獨立學生情境按既有資格與冷卻判斷"
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
      "resourceId": "content:18b-t03-03-08",
      "definitionId": "content:18b-t03-03-08",
      "version": "1",
      "topicId": "T03-03",
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
              "text": "學生說補救教學後終於敢回答問題，家長卻只問為何排名沒升。",
              "speaker": null,
              "scene": "school:teachers-office",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我明明有進步，但他們只看名次。",
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
              "id": "inquire",
              "text": "請學生指出可確認的具體進步",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生描述進展，導師未保證名次改變。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我明明有進步，但他們只看名次。",
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
                      "description": "學生當面向導師敘述個人學習困難；未在場的人不自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "協助與家長討論階段性學習目標",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師可向家長說明學習歷程，家長反應仍待確認。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我明明有進步，但他們只看名次。",
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
                      "description": "學生當面向導師敘述個人學習困難；未在場的人不自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "讓學生整理兩項可展示的學習紀錄",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生選擇整理學習證據，尚未與家長討論。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我明明有進步，但他們只看名次。",
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
                      "description": "學生當面向導師敘述個人學習困難；未在場的人不自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "進步不一定立刻反映在排名",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生知道自己的努力不應只剩一個名次。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我明明有進步，但他們只看名次。",
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
                      "description": "學生當面向導師敘述個人學習困難；未在場的人不自動知情。"
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
      "id": "content:18b-t03-03-08",
      "topicId": "T03-03",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-03-08",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "3-4",
        "3-2",
        "2-2"
      ],
      "additionalCodes": [
        "3-3",
        "4-1",
        "2-4"
      ],
      "weights": [
        0.19,
        0.22,
        0.24,
        0.13,
        0.12,
        0.1
      ],
      "directions": [
        -1,
        -1,
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
          "early",
          "p4",
          "p5",
          "p6",
          "p7",
          "p8"
        ],
        "from": null,
        "until": null,
        "facts": [],
        "history": [],
        "numeric": [],
        "enrollment": null
      },
      "repetition": {
        "cooldownDays": 45,
        "exclusionGroups": [],
        "sameFact": true,
        "reason": "獨立學生情境按既有資格與冷卻判斷"
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
      "resourceId": "content:18b-t03-03-09",
      "definitionId": "content:18b-t03-03-09",
      "version": "1",
      "topicId": "T03-03",
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
              "text": "補考結束後，學生發現科任要求列出每一步，但題目旁的作答欄沒有寫清楚。",
              "speaker": null,
              "scene": "school:teachers-office",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我不是不想寫，是不知道要寫到哪裡。",
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
              "id": "inquire",
              "text": "一起核對題目上的正式說明",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師核對說明欄位，未判定應更改分數。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我不是不想寫，是不知道要寫到哪裡。",
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
                      "description": "學生當面向導師敘述個人學習困難；未在場的人不自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "詢問科任批改與格式規則",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "科任收到詢問，正式評分仍待其回覆。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我不是不想寫，是不知道要寫到哪裡。",
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
                      "description": "學生當面向導師敘述個人學習困難；未在場的人不自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "協助學生練習分段列出解題步驟",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生寫出示範步驟，是否符合要求需科任確認。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我不是不想寫，是不知道要寫到哪裡。",
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
                      "description": "學生當面向導師敘述個人學習困難；未在場的人不自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "先弄懂規則，比吵有沒有扣分重要",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生願意查證而非用猜測認定自己受委屈。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我不是不想寫，是不知道要寫到哪裡。",
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
                      "description": "學生當面向導師敘述個人學習困難；未在場的人不自動知情。"
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
      "id": "content:18b-t03-03-09",
      "topicId": "T03-03",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-03-09",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "3-4",
        "3-2",
        "2-2"
      ],
      "additionalCodes": [
        "3-3",
        "4-1",
        "2-4"
      ],
      "weights": [
        0.19,
        0.22,
        0.24,
        0.13,
        0.12,
        0.1
      ],
      "directions": [
        -1,
        -1,
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
          "early",
          "p4",
          "p5",
          "p6",
          "p7",
          "p8"
        ],
        "from": null,
        "until": null,
        "facts": [],
        "history": [],
        "numeric": [],
        "enrollment": null
      },
      "repetition": {
        "cooldownDays": 45,
        "exclusionGroups": [],
        "sameFact": true,
        "reason": "獨立學生情境按既有資格與冷卻判斷"
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
      "resourceId": "content:18b-t03-03-10",
      "definitionId": "content:18b-t03-03-10",
      "version": "1",
      "topicId": "T03-03",
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
              "text": "學習平臺一個單元有七個連結，學生開到第三個就忘記自己原本在找什麼。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "每頁都寫必讀，可是我不知道先看誰。",
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
              "id": "inquire",
              "text": "先確定學生今天最需要回答的問題",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生確認當前學習目標，尚未完成單元。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "每頁都寫必讀，可是我不知道先看誰。",
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
                      "description": "學生當面向導師敘述個人學習困難；未在場的人不自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "請科任提供正式建議閱讀順序",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師向科任詢問閱讀順序，尚未取得正式清單。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "每頁都寫必讀，可是我不知道先看誰。",
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
                      "description": "學生當面向導師敘述個人學習困難；未在場的人不自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "把七個連結分成待讀與已查核",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生整理教材順序，仍須核對內容是否完整。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "每頁都寫必讀，可是我不知道先看誰。",
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
                      "description": "學生當面向導師敘述個人學習困難；未在場的人不自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "像迷宮就先畫地圖，不是一直亂開門",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生知道可以分步閱讀，而非追求開完所有頁面。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "每頁都寫必讀，可是我不知道先看誰。",
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
                      "description": "學生當面向導師敘述個人學習困難；未在場的人不自動知情。"
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
      "id": "content:18b-t03-03-10",
      "topicId": "T03-03",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-03-10",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "3-4",
        "3-2",
        "2-2"
      ],
      "additionalCodes": [
        "3-3",
        "4-1",
        "2-4"
      ],
      "weights": [
        0.19,
        0.22,
        0.24,
        0.13,
        0.12,
        0.1
      ],
      "directions": [
        -1,
        -1,
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
          "early",
          "p4",
          "p5",
          "p6",
          "p7",
          "p8"
        ],
        "from": null,
        "until": null,
        "facts": [],
        "history": [],
        "numeric": [],
        "enrollment": null
      },
      "repetition": {
        "cooldownDays": 45,
        "exclusionGroups": [],
        "sameFact": true,
        "reason": "獨立學生情境按既有資格與冷卻判斷"
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
      "resourceId": "content:18b-t03-03-11",
      "definitionId": "content:18b-t03-03-11",
      "version": "1",
      "topicId": "T03-03",
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
              "text": "學生快交作業時又回頭查第三次格式，最後因超過截止時間沒交出去。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我怕有錯，一直看，結果連交都沒交。",
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
              "id": "inquire",
              "text": "確認反覆檢查卡在哪種錯誤擔憂",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生認出拖延原因，未以此保證下次準時。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我怕有錯，一直看，結果連交都沒交。",
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
                      "description": "學生當面向導師敘述個人學習困難；未在場的人不自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "請科任釐清可接受的交件格式",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "科任格式要求仍待確認，缺交紀錄未自行刪除。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我怕有錯，一直看，結果連交都沒交。",
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
                      "description": "學生當面向導師敘述個人學習困難；未在場的人不自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "協助學生討論截止前的停止檢查點",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生提出可試行的停止檢查時點，尚未實測。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我怕有錯，一直看，結果連交都沒交。",
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
                      "description": "學生當面向導師敘述個人學習困難；未在場的人不自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "做得完又交不出去，真的很折磨",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生感受被理解，不需假裝作業毫無困難。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我怕有錯，一直看，結果連交都沒交。",
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
                      "description": "學生當面向導師敘述個人學習困難；未在場的人不自動知情。"
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
      "id": "content:18b-t03-03-11",
      "topicId": "T03-03",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-03-11",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "3-4",
        "3-2",
        "2-2"
      ],
      "additionalCodes": [
        "3-3",
        "4-1",
        "2-4"
      ],
      "weights": [
        0.19,
        0.22,
        0.24,
        0.13,
        0.12,
        0.1
      ],
      "directions": [
        -1,
        -1,
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
          "early",
          "p4",
          "p5",
          "p6",
          "p7",
          "p8"
        ],
        "from": null,
        "until": null,
        "facts": [],
        "history": [],
        "numeric": [],
        "enrollment": null
      },
      "repetition": {
        "cooldownDays": 45,
        "exclusionGroups": [],
        "sameFact": true,
        "reason": "獨立學生情境按既有資格與冷卻判斷"
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
      "resourceId": "content:18b-t03-03-12",
      "definitionId": "content:18b-t03-03-12",
      "version": "1",
      "topicId": "T03-03",
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
              "text": "學生說補救講義前兩頁像國中複習，第三頁卻突然變成完全看不懂的題型。",
              "speaker": null,
              "scene": "school:teachers-office",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "這不是變難一點，是像直接跳兩層樓。",
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
              "id": "inquire",
              "text": "找出從哪個概念開始接不上",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生指出缺少的轉換概念，尚未解完整題。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "這不是變難一點，是像直接跳兩層樓。",
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
                      "description": "學生當面向導師敘述個人學習困難；未在場的人不自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "向授課教師反映中間練習缺口",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "教師收到教材程度落差需求，是否調整待討論。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "這不是變難一點，是像直接跳兩層樓。",
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
                      "description": "學生當面向導師敘述個人學習困難；未在場的人不自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "協助學生列出需要先補的基礎步驟",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生整理銜接步驟，尚未替代正式教材。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "這不是變難一點，是像直接跳兩層樓。",
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
                      "description": "學生當面向導師敘述個人學習困難；未在場的人不自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "遇到斷層不等於你前面白學了",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生知道可以具體指出卡點，而非只說自己笨。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "這不是變難一點，是像直接跳兩層樓。",
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
                      "description": "學生當面向導師敘述個人學習困難；未在場的人不自動知情。"
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
      "id": "content:18b-t03-03-12",
      "topicId": "T03-03",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-03-12",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "3-4",
        "3-2",
        "2-2"
      ],
      "additionalCodes": [
        "3-3",
        "4-1",
        "2-4"
      ],
      "weights": [
        0.19,
        0.22,
        0.24,
        0.13,
        0.12,
        0.1
      ],
      "directions": [
        -1,
        -1,
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
          "early",
          "p4",
          "p5",
          "p6",
          "p7",
          "p8"
        ],
        "from": null,
        "until": null,
        "facts": [],
        "history": [],
        "numeric": [],
        "enrollment": null
      },
      "repetition": {
        "cooldownDays": 45,
        "exclusionGroups": [],
        "sameFact": true,
        "reason": "獨立學生情境按既有資格與冷卻判斷"
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
      "resourceId": "content:18b-t03-03-13",
      "definitionId": "content:18b-t03-03-13",
      "version": "1",
      "topicId": "T03-03",
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
              "text": "同學好心傳來整張習題的標準答案，學生反而不知道自己哪一步沒理解。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "他是好意啦，可是照著寫我還是不會。",
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
              "id": "inquire",
              "text": "先區分學生會的部分與照抄的部分",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生辨認出真正不懂的步驟，尚未完成全部練習。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "他是好意啦，可是照著寫我還是不會。",
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
                      "description": "學生當面向導師敘述個人學習困難；未在場的人不自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "提醒分享答案與協助理解不同",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師提醒學習誠信界線，未指控同學作弊。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "他是好意啦，可是照著寫我還是不會。",
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
                      "description": "學生當面向導師敘述個人學習困難；未在場的人不自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "請學生挑一題不用照片重新解釋",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生試著重新說明一題，仍需科任確認正確性。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "他是好意啦，可是照著寫我還是不會。",
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
                      "description": "學生當面向導師敘述個人學習困難；未在場的人不自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "接受幫助不是只能接收答案",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生知道可以請同學講方法而不是直接給答案。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "他是好意啦，可是照著寫我還是不會。",
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
                      "description": "學生當面向導師敘述個人學習困難；未在場的人不自動知情。"
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
      "id": "content:18b-t03-03-13",
      "topicId": "T03-03",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-03-13",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "3-4",
        "3-2",
        "2-2"
      ],
      "additionalCodes": [
        "3-3",
        "4-1",
        "2-4"
      ],
      "weights": [
        0.19,
        0.22,
        0.24,
        0.13,
        0.12,
        0.1
      ],
      "directions": [
        -1,
        -1,
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
          "early",
          "p4",
          "p5",
          "p6",
          "p7",
          "p8"
        ],
        "from": null,
        "until": null,
        "facts": [],
        "history": [],
        "numeric": [],
        "enrollment": null
      },
      "repetition": {
        "cooldownDays": 45,
        "exclusionGroups": [],
        "sameFact": true,
        "reason": "獨立學生情境按既有資格與冷卻判斷"
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
      "resourceId": "content:18b-t03-03-14",
      "definitionId": "content:18b-t03-03-14",
      "version": "1",
      "topicId": "T03-03",
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
              "text": "學生能清楚講出一段歷史故事，請他排事件年代卻顛倒了前後順序。",
              "speaker": null,
              "scene": "school:teachers-office",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "人物跟事情我都記得，就是年份全擠在一起。",
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
              "id": "inquire",
              "text": "先請學生以因果順序重述事件",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生能說出事件順序，年份正確性仍需查證。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "人物跟事情我都記得，就是年份全擠在一起。",
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
                      "description": "學生當面向導師敘述個人學習困難；未在場的人不自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "向歷史科任詢問年表整理策略",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師與科任討論整理策略，尚未調整評分。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "人物跟事情我都記得，就是年份全擠在一起。",
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
                      "description": "學生當面向導師敘述個人學習困難；未在場的人不自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "協助用三個時間錨點排列材料",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生標記三個時間錨點，未證明所有年代已會。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "人物跟事情我都記得，就是年份全擠在一起。",
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
                      "description": "學生當面向導師敘述個人學習困難；未在場的人不自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "故事懂了是起點，時間線還能再練",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生認識到敘事理解與年代記憶可分開練。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "人物跟事情我都記得，就是年份全擠在一起。",
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
                      "description": "學生當面向導師敘述個人學習困難；未在場的人不自動知情。"
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
      "id": "content:18b-t03-03-14",
      "topicId": "T03-03",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-03-14",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "3-4",
        "3-2",
        "2-2"
      ],
      "additionalCodes": [
        "3-3",
        "4-1",
        "2-4"
      ],
      "weights": [
        0.19,
        0.22,
        0.24,
        0.13,
        0.12,
        0.1
      ],
      "directions": [
        -1,
        -1,
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
          "early",
          "p4",
          "p5",
          "p6",
          "p7",
          "p8"
        ],
        "from": null,
        "until": null,
        "facts": [],
        "history": [],
        "numeric": [],
        "enrollment": null
      },
      "repetition": {
        "cooldownDays": 45,
        "exclusionGroups": [],
        "sameFact": true,
        "reason": "獨立學生情境按既有資格與冷卻判斷"
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
      "resourceId": "content:18b-t03-03-15",
      "definitionId": "content:18b-t03-03-15",
      "version": "1",
      "topicId": "T03-03",
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
              "text": "聽力練習一次連播三段，學生第一段沒聽清楚就再也跟不上後面的題目。",
              "speaker": null,
              "scene": "school:teachers-office",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "前一句沒聽懂，後面全都像在追火車。",
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
              "id": "inquire",
              "text": "確認學生實際漏掉哪個訊息點",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生確認最常漏聽的片段，未因此推定聽力診斷。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "前一句沒聽懂，後面全都像在追火車。",
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
                      "description": "學生當面向導師敘述個人學習困難；未在場的人不自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "請科任說明正式練習與評量差異",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "科任被請確認不同情境的播放規則，正式評量未改。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "前一句沒聽懂，後面全都像在追火車。",
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
                      "description": "學生當面向導師敘述個人學習困難；未在場的人不自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "協助學生提出課後可重聽的教材需求",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生提出課後教材取得需求，尚待授課安排。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "前一句沒聽懂，後面全都像在追火車。",
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
                      "description": "學生當面向導師敘述個人學習困難；未在場的人不自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "練習可以找方法，不等於考試隨便停",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生明白練習與正式考試可依規定不同處理。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "前一句沒聽懂，後面全都像在追火車。",
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
                      "description": "學生當面向導師敘述個人學習困難；未在場的人不自動知情。"
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
      "id": "content:18b-t03-03-15",
      "topicId": "T03-03",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-03-15",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "3-4",
        "3-2",
        "2-2"
      ],
      "additionalCodes": [
        "3-3",
        "4-1",
        "2-4"
      ],
      "weights": [
        0.19,
        0.22,
        0.24,
        0.13,
        0.12,
        0.1
      ],
      "directions": [
        -1,
        -1,
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
          "early",
          "p4",
          "p5",
          "p6",
          "p7",
          "p8"
        ],
        "from": null,
        "until": null,
        "facts": [],
        "history": [],
        "numeric": [],
        "enrollment": null
      },
      "repetition": {
        "cooldownDays": 45,
        "exclusionGroups": [],
        "sameFact": true,
        "reason": "獨立學生情境按既有資格與冷卻判斷"
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
      "resourceId": "content:18b-t03-03-16",
      "definitionId": "content:18b-t03-03-16",
      "version": "1",
      "topicId": "T03-03",
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
              "text": "學生上課能解釋題目，限時練習卻總有半頁空白，說自己根本寫不及。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我不是想多拿分，只是一直寫不到後面。",
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
              "id": "inquire",
              "text": "核對空白題是時間還是理解問題",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師辨識時間與理解可能不同，尚未判斷正式資格。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我不是想多拿分，只是一直寫不到後面。",
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
                      "description": "學生當面向導師敘述個人學習困難；未在場的人不自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "詢問評量權責人員可用的合法支持程序",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師向權責單位詢問程序，未逕自延長考試時間。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我不是想多拿分，只是一直寫不到後面。",
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
                      "description": "學生當面向導師敘述個人學習困難；未在場的人不自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "與學生討論答題順序的調整",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生提出答題順序策略，仍須實際測試。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我不是想多拿分，只是一直寫不到後面。",
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
                      "description": "學生當面向導師敘述個人學習困難；未在場的人不自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "快不一定代表懂得多，慢也要看原因",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生知道可以反映困難，沒有被保證評量結果。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我不是想多拿分，只是一直寫不到後面。",
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
                      "description": "學生當面向導師敘述個人學習困難；未在場的人不自動知情。"
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
      "id": "content:18b-t03-03-16",
      "topicId": "T03-03",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-03-16",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "3-4",
        "3-2",
        "2-2"
      ],
      "additionalCodes": [
        "3-3",
        "4-1",
        "2-4"
      ],
      "weights": [
        0.19,
        0.22,
        0.24,
        0.13,
        0.12,
        0.1
      ],
      "directions": [
        -1,
        -1,
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
          "early",
          "p4",
          "p5",
          "p6",
          "p7",
          "p8"
        ],
        "from": null,
        "until": null,
        "facts": [],
        "history": [],
        "numeric": [],
        "enrollment": null
      },
      "repetition": {
        "cooldownDays": 45,
        "exclusionGroups": [],
        "sameFact": true,
        "reason": "獨立學生情境按既有資格與冷卻判斷"
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
      "resourceId": "content:18b-t03-03-17",
      "definitionId": "content:18b-t03-03-17",
      "version": "1",
      "topicId": "T03-03",
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
              "text": "地理課學習單的表格有六欄、欄線又很淡，學生把氣溫數據整排填到降雨量欄，被同學說根本沒看題。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我知道兩個資料不一樣，但格子擠在一起我就看錯。",
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
              "id": "clarify",
              "text": "先確定出錯的是哪些表格位置",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生指出混淆的兩欄，尚未訂正全部數據。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我知道兩個資料不一樣，但格子擠在一起我就看錯。",
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
                      "description": "學生向導師表達當事需求，未自動通知其他角色。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "向科任詢問能否提供清晰欄線版本",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師向科任提出欄位可讀性問題，尚未取得新版。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我知道兩個資料不一樣，但格子擠在一起我就看錯。",
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
                      "description": "學生向導師表達當事需求，未自動通知其他角色。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "協助學生利用尺或色標辨認欄位",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生試著沿欄線逐項檢查，效果仍待觀察。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我知道兩個資料不一樣，但格子擠在一起我就看錯。",
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
                      "description": "學生向導師表達當事需求，未自動通知其他角色。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "看錯欄位和不懂知識不是同一回事",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生知道可以討論教材呈現方式，不必接受不用功的評價。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我知道兩個資料不一樣，但格子擠在一起我就看錯。",
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
                      "description": "學生向導師表達當事需求，未自動通知其他角色。"
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
      "id": "content:18b-t03-03-17",
      "topicId": "T03-03",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-03-17",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "3-4",
        "3-2",
        "2-2"
      ],
      "additionalCodes": [
        "3-3",
        "4-1",
        "2-4"
      ],
      "weights": [
        0.19,
        0.22,
        0.24,
        0.13,
        0.12,
        0.1
      ],
      "directions": [
        -1,
        -1,
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
          "p5"
        ],
        "from": null,
        "until": null,
        "facts": [],
        "history": [],
        "numeric": [],
        "enrollment": null
      },
      "repetition": {
        "cooldownDays": 45,
        "exclusionGroups": [],
        "sameFact": true,
        "reason": "獨立學生情境按既有資格與冷卻判斷"
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
      "resourceId": "content:18b-t03-03-18",
      "definitionId": "content:18b-t03-03-18",
      "version": "1",
      "topicId": "T03-03",
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
              "text": "午餐後學生拿著兩張數學練習紙，第一張空白，第二張終於能寫出題目的第一個算式；他卻說這樣根本不算進步。",
              "speaker": null,
              "scene": "school:teachers-office",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我只是會寫第一步，後面還是都不會。",
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
              "text": "陪學生比較兩次確實增加的理解",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生確認自己能獨立寫出第一步，並未完成整題。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我只是會寫第一步，後面還是都不會。",
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
                      "description": "學生向導師表達當事需求，未自動通知其他角色。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "向科任詢問接下來最適合練習的步驟",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師與科任將討論下個練習目標，尚未安排正式補救。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我只是會寫第一步，後面還是都不會。",
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
                      "description": "學生向導師表達當事需求，未自動通知其他角色。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "讓學生說出自己下一次要嘗試的目標",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生選出下一步要練習的題型，仍待實際執行。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我只是會寫第一步，後面還是都不會。",
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
                      "description": "學生向導師表達當事需求，未自動通知其他角色。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "能開始第一步，就已經不是原地踏步",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生看見具體小進展，未將它誤認成所有學科已改善。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我只是會寫第一步，後面還是都不會。",
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
                      "description": "學生向導師表達當事需求，未自動通知其他角色。"
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
      "id": "content:18b-t03-03-18",
      "topicId": "T03-03",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-03-18",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "3-4",
        "3-2",
        "2-2"
      ],
      "additionalCodes": [
        "3-3",
        "4-1",
        "2-4"
      ],
      "weights": [
        0.19,
        0.22,
        0.24,
        0.13,
        0.12,
        0.1
      ],
      "directions": [
        -1,
        -1,
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
          "p5"
        ],
        "from": null,
        "until": null,
        "facts": [],
        "history": [],
        "numeric": [],
        "enrollment": null
      },
      "repetition": {
        "cooldownDays": 45,
        "exclusionGroups": [],
        "sameFact": true,
        "reason": "獨立學生情境按既有資格與冷卻判斷"
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
      "resourceId": "content:18b-t03-03-19",
      "definitionId": "content:18b-t03-03-19",
      "version": "1",
      "topicId": "T03-03",
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
              "text": "學生在公布欄看到資源教室介紹，卻悄悄問你：只要去諮詢，是否就會被貼上某種標籤。",
              "speaker": null,
              "scene": "school:corridor",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我只是想知道可以怎麼學，不想全班都猜我有什麼問題。",
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
              "id": "clarify",
              "text": "先了解學生想取得哪一類學習支持資訊",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生說出需要學習資源資訊，尚未表示願意接受特定服務。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我只是想知道可以怎麼學，不想全班都猜我有什麼問題。",
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
                      "description": "學生向導師表達當事需求，未自動通知其他角色。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "請權責人員說明正式資源使用與保密原則",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師向資源單位詢問服務流程與個資保護，不自行認定資格。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我只是想知道可以怎麼學，不想全班都猜我有什麼問題。",
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
                      "description": "學生向導師表達當事需求，未自動通知其他角色。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "協助學生選擇自己願意詢問的方式",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生選擇先私下詢問服務內容，尚未完成申請。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我只是想知道可以怎麼學，不想全班都猜我有什麼問題。",
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
                      "description": "學生向導師表達當事需求，未自動通知其他角色。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "去問問題又不等於貼了什麼標籤",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生知道諮詢與診斷不能混為一談，隱私仍受尊重。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我只是想知道可以怎麼學，不想全班都猜我有什麼問題。",
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
                      "description": "學生向導師表達當事需求，未自動通知其他角色。"
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
      "id": "content:18b-t03-03-19",
      "topicId": "T03-03",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-03-19",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "3-4",
        "3-2",
        "2-2"
      ],
      "additionalCodes": [
        "3-3",
        "4-1",
        "2-4"
      ],
      "weights": [
        0.19,
        0.22,
        0.24,
        0.13,
        0.12,
        0.1
      ],
      "directions": [
        -1,
        -1,
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
          "p7"
        ],
        "from": null,
        "until": null,
        "facts": [],
        "history": [],
        "numeric": [],
        "enrollment": null
      },
      "repetition": {
        "cooldownDays": 45,
        "exclusionGroups": [],
        "sameFact": true,
        "reason": "獨立學生情境按既有資格與冷卻判斷"
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
      "resourceId": "content:18b-t03-03-20",
      "definitionId": "content:18b-t03-03-20",
      "version": "1",
      "topicId": "T03-03",
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
              "text": "自然科下課後學生來說自己問了一句基本概念，後排有人笑『這也不會』，從此不敢再舉手。",
              "speaker": null,
              "scene": "school:corridor",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我知道問題很簡單，可是我就是那邊聽不懂。",
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
              "id": "clarify",
              "text": "先確認學生真正不懂的關鍵概念",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生說出實際不理解的概念，導師尚未解答所有疑問。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我知道問題很簡單，可是我就是那邊聽不懂。",
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
                      "description": "學生向導師表達當事需求，未自動通知其他角色。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "與科任討論讓學生安心提問的課堂方式",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師向科任反映嘲笑造成的學習阻礙，尚未判定其他學生動機。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我知道問題很簡單，可是我就是那邊聽不懂。",
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
                      "description": "學生向導師表達當事需求，未自動通知其他角色。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "協助學生把問題寫成不需公開姓名的紙條",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生選擇先用匿名問題紙條詢問，效果仍待觀察。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我知道問題很簡單，可是我就是那邊聽不懂。",
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
                      "description": "學生向導師表達當事需求，未自動通知其他角色。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "題目簡不簡單，不是旁邊的人說了算",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生知道提問本身合理，班級氣氛仍需慢慢改善。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我知道問題很簡單，可是我就是那邊聽不懂。",
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
                      "description": "學生向導師表達當事需求，未自動通知其他角色。"
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
      "id": "content:18b-t03-03-20",
      "topicId": "T03-03",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-03-20",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "3-4",
        "3-2",
        "2-2"
      ],
      "additionalCodes": [
        "3-3",
        "4-1",
        "2-4"
      ],
      "weights": [
        0.19,
        0.22,
        0.24,
        0.13,
        0.12,
        0.1
      ],
      "directions": [
        -1,
        -1,
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
          "p4"
        ],
        "from": null,
        "until": null,
        "facts": [],
        "history": [],
        "numeric": [],
        "enrollment": null
      },
      "repetition": {
        "cooldownDays": 45,
        "exclusionGroups": [],
        "sameFact": true,
        "reason": "獨立學生情境按既有資格與冷卻判斷"
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
