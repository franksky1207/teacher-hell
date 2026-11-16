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
              }
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
  }
];
