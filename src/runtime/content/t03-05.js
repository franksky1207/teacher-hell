// Generated isolated T03 authoring records. Not a production catalogue.
// Source: work/18b-t03-05-authoring.json. Regenerate via scripts/sync-t03-drafts.mjs.
export default [
  {
    "story": {
      "resourceId": "content:18b-t03-05-01",
      "definitionId": "content:18b-t03-05-01",
      "version": "1",
      "topicId": "T03-05",
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
              "text": "新轉入的學生第一次踏進教室，卻沒有拿到今日課表，原先說好的座位也沒貼名字。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我今天是要在這裡上課吧？不太知道要先做什麼。",
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
              "id": "inquire",
              "text": "核對學生正式報到與當日課程安排",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師核對報到資料，未擅改學籍與班級名額。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我今天是要在這裡上課吧？不太知道要先做什麼。",
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
                      "description": "學生向導師當面說明自身顧慮，未自動告知第三者。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "請班級幹部提供必要公告資訊",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "幹部知道需要補充公告，學生仍可能有其他疑問。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我今天是要在這裡上課吧？不太知道要先做什麼。",
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
                      "description": "學生向導師當面說明自身顧慮，未自動告知第三者。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "詢問學生想先知道哪一項班級生活安排",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生提出課表與午餐需求，尚未完成全班適應。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我今天是要在這裡上課吧？不太知道要先做什麼。",
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
                      "description": "學生向導師當面說明自身顧慮，未自動告知第三者。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "第一天先認識環境，不必立刻背完四十個名字",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生感受被接納，不必被迫回答私人轉學理由。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我今天是要在這裡上課吧？不太知道要先做什麼。",
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
                      "description": "學生向導師當面說明自身顧慮，未自動告知第三者。"
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
      "id": "content:18b-t03-05-01",
      "topicId": "T03-05",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-05-01",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "3-4",
        "4-4",
        "2-2"
      ],
      "additionalCodes": [
        "3-1",
        "4-2",
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
        "reason": "學生與學籍資格仍須由正式日程判定"
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
      "resourceId": "content:18b-t03-05-02",
      "definitionId": "content:18b-t03-05-02",
      "version": "1",
      "topicId": "T03-05",
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
              "text": "轉學生拿著前校成績單，發現同一科目有兩種記錄欄位，擔心新學校不會承認學分。",
              "speaker": null,
              "scene": "school:teachers-office",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "這樣算過來會不會少一門課？我真的看不懂。",
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
              "text": "先確認不同欄位的正式資料來源",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師整理欄位差異，沒有自行換算成績。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "這樣算過來會不會少一門課？我真的看不懂。",
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
                      "description": "學生向導師當面說明自身顧慮，未自動告知第三者。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "請教務處依規核對成績與學分採認",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師向教務權責人員詢問，尚未作成正式認定。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "這樣算過來會不會少一門課？我真的看不懂。",
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
                      "description": "學生向導師當面說明自身顧慮，未自動告知第三者。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "幫學生列出哪些科目仍待說明",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生列出疑問清單，不等於成績已經變更。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "這樣算過來會不會少一門課？我真的看不懂。",
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
                      "description": "學生向導師當面說明自身顧慮，未自動告知第三者。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "這不能靠自己亂換算，先找對窗口",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生知道可依校內程序詢問，不須自行承擔錯算後果。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "這樣算過來會不會少一門課？我真的看不懂。",
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
                      "description": "學生向導師當面說明自身顧慮，未自動告知第三者。"
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
      "id": "content:18b-t03-05-02",
      "topicId": "T03-05",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-05-02",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "3-4",
        "4-4",
        "2-2"
      ],
      "additionalCodes": [
        "3-1",
        "4-2",
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
        "reason": "學生與學籍資格仍須由正式日程判定"
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
      "resourceId": "content:18b-t03-05-03",
      "definitionId": "content:18b-t03-05-03",
      "version": "1",
      "topicId": "T03-05",
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
              "text": "新同學第一次被點名就遭唸錯名字，幾位同學跟著反覆模仿，當事人低頭不說話。",
              "speaker": null,
              "scene": "school:corridor",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我講過怎麼唸了，可是有些人還是故意叫錯。",
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
              "id": "inquire",
              "text": "私下確認學生希望被怎麼稱呼",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生表達自己希望的讀音，導師沒有強迫使用暱稱。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我講過怎麼唸了，可是有些人還是故意叫錯。",
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
                      "description": "學生向導師當面說明自身顧慮，未自動告知第三者。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "提醒相關同學停止令人不舒服的稱呼",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師提醒同學尊重姓名，後續互動仍需觀察。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我講過怎麼唸了，可是有些人還是故意叫錯。",
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
                      "description": "學生向導師當面說明自身顧慮，未自動告知第三者。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "向註冊單位確認名冊讀音註記方式",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "導師詢問可行註記方式，未擅改正式姓名。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我講過怎麼唸了，可是有些人還是故意叫錯。",
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
                      "description": "學生向導師當面說明自身顧慮，未自動告知第三者。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "名字不是拿來猜謎和取笑的",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生知道不必假裝不在意，也不須公開家庭背景。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我講過怎麼唸了，可是有些人還是故意叫錯。",
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
                      "description": "學生向導師當面說明自身顧慮，未自動告知第三者。"
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
      "id": "content:18b-t03-05-03",
      "topicId": "T03-05",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-05-03",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "3-4",
        "4-4",
        "2-2"
      ],
      "additionalCodes": [
        "3-1",
        "4-2",
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
        "reason": "學生與學籍資格仍須由正式日程判定"
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
      "resourceId": "content:18b-t03-05-04",
      "definitionId": "content:18b-t03-05-04",
      "version": "1",
      "topicId": "T03-05",
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
              "text": "新轉入生漏掉兩則重要公告，才發現班級群組邀請連結已經失效。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "不是我不想看，是那個連結根本進不去。",
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
              "text": "先確認哪些訊息尚未送達學生",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師釐清缺漏公告，未認定學生故意忽略。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "不是我不想看，是那個連結根本進不去。",
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
                      "description": "當事人向導師反映內容；學籍或校務資料尚待權責核對。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "請群組管理者重新提供合法加入方式",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "群組管理者知道需更新邀請，加入仍須確認身分。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "不是我不想看，是那個連結根本進不去。",
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
                      "description": "當事人向導師反映內容；學籍或校務資料尚待權責核對。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "保留不依賴私人群組的班級公告管道",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "導師提出正式公告方式，尚未完成所有資料補送。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "不是我不想看，是那個連結根本進不去。",
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
                      "description": "當事人向導師反映內容；學籍或校務資料尚待權責核對。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "沒有進群組不等於你不關心班級",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生知道可以詢問其他管道，未被排除於班級活動。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "不是我不想看，是那個連結根本進不去。",
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
                      "description": "當事人向導師反映內容；學籍或校務資料尚待權責核對。"
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
      "id": "content:18b-t03-05-04",
      "topicId": "T03-05",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-05-04",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "3-4",
        "4-4",
        "2-2"
      ],
      "additionalCodes": [
        "3-1",
        "4-2",
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
        "reason": "學生與學籍資格仍須由正式日程判定"
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
      "resourceId": "content:18b-t03-05-05",
      "definitionId": "content:18b-t03-05-05",
      "version": "1",
      "topicId": "T03-05",
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
              "text": "新轉入生已經上課三天，仍不知道每週哪一天收自然科作業，卻不好意思一直問。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "每個人都很忙，我怕一直問會被討厭。",
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
              "text": "先請他說出最不確定的班級規則",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生說出最困惑的事項，尚未理解所有規定。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "每個人都很忙，我怕一直問會被討厭。",
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
                      "description": "當事人向導師反映內容；學籍或校務資料尚待權責核對。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "請幹部補一份簡潔生活資訊",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "班級幹部準備資訊清單，未保證所有人都已讀。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "每個人都很忙，我怕一直問會被討厭。",
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
                      "description": "當事人向導師反映內容；學籍或校務資料尚待權責核對。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "鼓勵學生挑一個可信任的提問對象",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生決定試著詢問一項規則，仍需觀察適應。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "每個人都很忙，我怕一直問會被討厭。",
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
                      "description": "當事人向導師反映內容；學籍或校務資料尚待權責核對。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "第一週不懂規則很正常，不用裝懂",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生知道提問不等於造成麻煩。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "每個人都很忙，我怕一直問會被討厭。",
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
                      "description": "當事人向導師反映內容；學籍或校務資料尚待權責核對。"
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
      "id": "content:18b-t03-05-05",
      "topicId": "T03-05",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-05-05",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "3-4",
        "4-4",
        "2-2"
      ],
      "additionalCodes": [
        "3-1",
        "4-2",
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
        "reason": "學生與學籍資格仍須由正式日程判定"
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
      "resourceId": "content:18b-t03-05-06",
      "definitionId": "content:18b-t03-05-06",
      "version": "1",
      "topicId": "T03-05",
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
              "text": "學生即將正式轉出，同學想做送別卡片，卻有人擔心他根本不想被全班公開談論。",
              "speaker": null,
              "scene": "school:corridor",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我想留個紀念，但不想弄成很大的歡送會。",
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
              "id": "inquire",
              "text": "先詢問本人希望如何被道別",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師確認本人願意收卡片，未要求同意公開活動。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我想留個紀念，但不想弄成很大的歡送會。",
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
                      "description": "當事人向導師反映內容；學籍或校務資料尚待權責核對。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "請班幹部尊重當事人對活動形式的選擇",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "班幹部知道須先徵詢意願，尚未決定舉辦。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我想留個紀念，但不想弄成很大的歡送會。",
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
                      "description": "當事人向導師反映內容；學籍或校務資料尚待權責核對。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "討論以私下卡片替代公開儀式",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生選擇偏好的送別方式，其他同學需尊重。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我想留個紀念，但不想弄成很大的歡送會。",
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
                      "description": "當事人向導師反映內容；學籍或校務資料尚待權責核對。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "離開班級也可以有自己的節奏",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生不因轉出就失去對私人關係的決定權。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我想留個紀念，但不想弄成很大的歡送會。",
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
                      "description": "當事人向導師反映內容；學籍或校務資料尚待權責核對。"
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
      "id": "content:18b-t03-05-06",
      "topicId": "T03-05",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-05-06",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "3-4",
        "4-4",
        "2-2"
      ],
      "additionalCodes": [
        "3-1",
        "4-2",
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
        "reason": "學生與學籍資格仍須由正式日程判定"
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
      "resourceId": "content:18b-t03-05-07",
      "definitionId": "content:18b-t03-05-07",
      "version": "1",
      "topicId": "T03-05",
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
              "text": "學生僅向導師詢問轉學程序，班上卻已有人說他下週一定離開。",
              "speaker": null,
              "scene": "school:teachers-office",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我只是問問，根本還沒有決定。",
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
              "text": "先確認學生目前實際申請進度",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師確認學生只是詢問，未認定已轉出。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我只是問問，根本還沒有決定。",
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
                      "description": "當事人向導師反映內容；學籍或校務資料尚待權責核對。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "提醒同學不要將傳言當成既成事實",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師提醒不可散布未證實的消息，結果仍待觀察。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我只是問問，根本還沒有決定。",
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
                      "description": "當事人向導師反映內容；學籍或校務資料尚待權責核對。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "協助學生了解校內正式程序窗口",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生取得正式程序資訊，尚未提出申請。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我只是問問，根本還沒有決定。",
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
                      "description": "當事人向導師反映內容；學籍或校務資料尚待權責核對。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "想過轉學不等於明天就要走",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生知道可以先蒐集資訊而不必公開抉擇。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我只是問問，根本還沒有決定。",
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
                      "description": "當事人向導師反映內容；學籍或校務資料尚待權責核對。"
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
      "id": "content:18b-t03-05-07",
      "topicId": "T03-05",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-05-07",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "3-4",
        "4-4",
        "2-2"
      ],
      "additionalCodes": [
        "3-1",
        "4-2",
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
        "reason": "學生與學籍資格仍須由正式日程判定"
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
      "resourceId": "content:18b-t03-05-08",
      "definitionId": "content:18b-t03-05-08",
      "version": "1",
      "topicId": "T03-05",
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
              "text": "休學後返校的學生發現原本熟悉的科任與同學分散到不同班級，拿著課表不知怎麼看。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我以為回來就照原來上課，結果全部不一樣。",
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
              "text": "先核對現行合法復學與編班資料",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師核對返校資料，未自行更動學籍與班級名額。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我以為回來就照原來上課，結果全部不一樣。",
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
                      "description": "當事人向導師反映內容；學籍或校務資料尚待權責核對。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "請教務確認當學期課程銜接",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "教務被請確認課表及學分銜接，結果待核實。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我以為回來就照原來上課，結果全部不一樣。",
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
                      "description": "當事人向導師反映內容；學籍或校務資料尚待權責核對。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "協助學生列出第一週最需了解的規則",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生列出適應問題，尚未一次解決課業差異。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我以為回來就照原來上課，結果全部不一樣。",
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
                      "description": "當事人向導師反映內容；學籍或校務資料尚待權責核對。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "回到學校卻覺得陌生，真的需要時間",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生知道陌生感可以被理解，不必立即假裝熟悉。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我以為回來就照原來上課，結果全部不一樣。",
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
                      "description": "當事人向導師反映內容；學籍或校務資料尚待權責核對。"
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
      "id": "content:18b-t03-05-08",
      "topicId": "T03-05",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-05-08",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "3-4",
        "4-4",
        "2-2"
      ],
      "additionalCodes": [
        "3-1",
        "4-2",
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
        "reason": "學生與學籍資格仍須由正式日程判定"
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
      "resourceId": "content:18b-t03-05-09",
      "definitionId": "content:18b-t03-05-09",
      "version": "1",
      "topicId": "T03-05",
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
              "text": "學生轉出後，原座位抽屜還留著一盒彩色筆，同學爭論能不能直接拿來當班級公物。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "那是他的東西吧？不應該因為人走了就能拿。",
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
              "text": "先確認物品所有人與保管方式",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師確認抽屜有物品，尚未認定已獲贈與。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "那是他的東西吧？不應該因為人走了就能拿。",
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
                      "description": "當事人向導師反映內容；學籍或校務資料尚待權責核對。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "依班級正式流程聯絡本人或監護人",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師準備依正式聯絡方式確認處理，未私下轉送。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "那是他的東西吧？不應該因為人走了就能拿。",
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
                      "description": "當事人向導師反映內容；學籍或校務資料尚待權責核對。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "將物品妥善封存而非讓全班取用",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "物品先被妥善保存，正式歸還仍需安排。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "那是他的東西吧？不應該因為人走了就能拿。",
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
                      "description": "當事人向導師反映內容；學籍或校務資料尚待權責核對。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "人離開了，東西還是他的",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "同學理解尊重財物不因轉出而消失。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "那是他的東西吧？不應該因為人走了就能拿。",
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
                      "description": "當事人向導師反映內容；學籍或校務資料尚待權責核對。"
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
      "id": "content:18b-t03-05-09",
      "topicId": "T03-05",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-05-09",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "3-4",
        "4-4",
        "2-2"
      ],
      "additionalCodes": [
        "3-1",
        "4-2",
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
        "reason": "學生與學籍資格仍須由正式日程判定"
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
      "resourceId": "content:18b-t03-05-10",
      "definitionId": "content:18b-t03-05-10",
      "version": "1",
      "topicId": "T03-05",
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
              "text": "新轉學生拿到不同版本的教材，學習平臺上的章節名稱與目前班級使用的不一致。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我們原校第三章不是這個，會不會補錯東西？",
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
              "text": "核對新舊教材章節實際對應",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師整理教材差異，尚未判定學生全部落後。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我們原校第三章不是這個，會不會補錯東西？",
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
                      "description": "當事人向導師反映內容；學籍或校務資料尚待權責核對。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "請科任提供當前學習進度範圍",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師向科任詢問正式進度，仍待確認。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我們原校第三章不是這個，會不會補錯東西？",
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
                      "description": "當事人向導師反映內容；學籍或校務資料尚待權責核對。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "協助學生標記需要補充的前置單元",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生列出可能缺漏的章節，未自行認定學分。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我們原校第三章不是這個，會不會補錯東西？",
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
                      "description": "當事人向導師反映內容；學籍或校務資料尚待權責核對。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "書名和章節變了，也不是你故意跟不上",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生知道可逐項銜接，不必憑目錄亂補。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我們原校第三章不是這個，會不會補錯東西？",
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
                      "description": "當事人向導師反映內容；學籍或校務資料尚待權責核對。"
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
      "id": "content:18b-t03-05-10",
      "topicId": "T03-05",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-05-10",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "3-4",
        "4-4",
        "2-2"
      ],
      "additionalCodes": [
        "3-1",
        "4-2",
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
        "reason": "學生與學籍資格仍須由正式日程判定"
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
      "resourceId": "content:18b-t03-05-11",
      "definitionId": "content:18b-t03-05-11",
      "version": "1",
      "topicId": "T03-05",
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
              "text": "負責總務的學生確定即將轉出，班上卻不知道之後誰能管理班費紀錄。",
              "speaker": null,
              "scene": "school:teachers-office",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "總不能人一走，帳本就跟著不知道去哪裡吧。",
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
              "text": "先核對交接物品與班費帳目",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師盤點需交接的帳本與保管事項，尚未完成結算。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "總不能人一走，帳本就跟著不知道去哪裡吧。",
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
                      "description": "當事人向導師反映內容；學籍或校務資料尚待權責核對。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "依班級規定安排透明的幹部交接",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "班級準備依規定處理幹部補任，未私定人選。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "總不能人一走，帳本就跟著不知道去哪裡吧。",
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
                      "description": "當事人向導師反映內容；學籍或校務資料尚待權責核對。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "請學生提議暫時保管及確認機制",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "同學提出臨時保管方案，仍需正式確認。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "總不能人一走，帳本就跟著不知道去哪裡吧。",
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
                      "description": "當事人向導師反映內容；學籍或校務資料尚待權責核對。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "錢和責任最怕交接不清楚，先把紀錄留好",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生了解交接責任，不把疑問指向轉出同學品行。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "總不能人一走，帳本就跟著不知道去哪裡吧。",
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
                      "description": "當事人向導師反映內容；學籍或校務資料尚待權責核對。"
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
      "id": "content:18b-t03-05-11",
      "topicId": "T03-05",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-05-11",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "3-4",
        "4-4",
        "2-2"
      ],
      "additionalCodes": [
        "3-1",
        "4-2",
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
        "reason": "學生與學籍資格仍須由正式日程判定"
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
      "resourceId": "content:18b-t03-05-12",
      "definitionId": "content:18b-t03-05-12",
      "version": "1",
      "topicId": "T03-05",
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
              "text": "轉入生想加入攝影社，卻發現本學期社團名額已滿，擔心自己永遠不能參加。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我才剛轉來，名額早就排完了。",
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
              "text": "確認社團正式名額及候補規定",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生了解目前名額，尚未確認是否可候補。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我才剛轉來，名額早就排完了。",
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
                      "description": "當事人向導師反映內容；學籍或校務資料尚待權責核對。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "向社團承辦詢問轉入生適用程序",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "承辦收到詢問，未保證可額外開放。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我才剛轉來，名額早就排完了。",
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
                      "description": "當事人向導師反映內容；學籍或校務資料尚待權責核對。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "協助學生探索其他自願選擇的活動",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生列出其他興趣方向，仍由本人選擇。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我才剛轉來，名額早就排完了。",
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
                      "description": "當事人向導師反映內容；學籍或校務資料尚待權責核對。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "沒搶到第一輪名額不是你的錯",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生知道可以尋求程序說明，不必被迫加入不想要的社團。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我才剛轉來，名額早就排完了。",
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
                      "description": "當事人向導師反映內容；學籍或校務資料尚待權責核對。"
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
      "id": "content:18b-t03-05-12",
      "topicId": "T03-05",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-05-12",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "3-4",
        "4-4",
        "2-2"
      ],
      "additionalCodes": [
        "3-1",
        "4-2",
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
        "reason": "學生與學籍資格仍須由正式日程判定"
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
      "resourceId": "content:18b-t03-05-13",
      "definitionId": "content:18b-t03-05-13",
      "version": "1",
      "topicId": "T03-05",
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
              "text": "新同學自我介紹還沒結束，班上就有人接連追問『你為什麼轉來？是不是原校出事？』，他僵在臺前。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我可以說我喜歡什麼，但不想講原來學校的事。",
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
              "text": "先確認學生願意分享的介紹內容",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生界定願意分享的內容，導師未追問原校理由。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我可以說我喜歡什麼，但不想講原來學校的事。",
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
                      "description": "學生在場告知導師，未將私人說法傳播給其他人。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "當場提醒提問不得逼問私人轉學原因",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師提醒停止私人盤問，班級氣氛仍待修復。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我可以說我喜歡什麼，但不想講原來學校的事。",
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
                      "description": "學生在場告知導師，未將私人說法傳播給其他人。"
                    }
                  ]
                }
              }
            },
            {
              "id": "agency",
              "text": "換成全班都能回答的興趣交流題",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生有機會談興趣而不是轉學原因，活動尚待安排。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我可以說我喜歡什麼，但不想講原來學校的事。",
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
                      "description": "學生在場告知導師，未將私人說法傳播給其他人。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "新同學自介不是轉學原因調查會",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生知道有權保留私人經歷，不必迎合全班好奇心。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我可以說我喜歡什麼，但不想講原來學校的事。",
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
                      "description": "學生在場告知導師，未將私人說法傳播給其他人。"
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
      "id": "content:18b-t03-05-13",
      "topicId": "T03-05",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-05-13",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "3-4",
        "4-4",
        "2-2"
      ],
      "additionalCodes": [
        "3-1",
        "4-2",
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
        "reason": "學生與學籍資格仍須由正式日程判定"
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
      "resourceId": "content:18b-t03-05-14",
      "definitionId": "content:18b-t03-05-14",
      "version": "1",
      "topicId": "T03-05",
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
              "text": "班級群組出現『某同學下週要轉學』的說法，但導師尚未收到正式異動通知。",
              "speaker": null,
              "scene": "school:corridor",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我只跟一個人說我在考慮，怎麼大家都當我走定了？",
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
              "text": "先確認學生本人目前知道的程序狀況",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生確認目前僅表達考慮，導師未宣稱轉學完成。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我只跟一個人說我在考慮，怎麼大家都當我走定了？",
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
                      "description": "學生在場告知導師，未將私人說法傳播給其他人。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "要求同學勿把尚未證實的消息當事實傳播",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師提醒班級停止傳述，流言消退情況仍待觀察。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我只跟一個人說我在考慮，怎麼大家都當我走定了？",
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
                      "description": "學生在場告知導師，未將私人說法傳播給其他人。"
                    }
                  ]
                }
              }
            },
            {
              "id": "agency",
              "text": "提醒學生可向註冊單位確認正式作業",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生知道應核對正式轉學程序，尚未提出申請。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我只跟一個人說我在考慮，怎麼大家都當我走定了？",
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
                      "description": "學生在場告知導師，未將私人說法傳播給其他人。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "還沒決定的事，不該被群組替你決定",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生知道自己的生涯選擇不該被他人擅作結論。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我只跟一個人說我在考慮，怎麼大家都當我走定了？",
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
                      "description": "學生在場告知導師，未將私人說法傳播給其他人。"
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
      "id": "content:18b-t03-05-14",
      "topicId": "T03-05",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-05-14",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "3-4",
        "4-4",
        "2-2"
      ],
      "additionalCodes": [
        "3-1",
        "4-2",
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
        "reason": "學生與學籍資格仍須由正式日程判定"
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
      "resourceId": "content:18b-t03-05-15",
      "definitionId": "content:18b-t03-05-15",
      "version": "1",
      "topicId": "T03-05",
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
              "text": "復學返校的學生看著現在的課表，發現原先熟悉的科任與教室都變了，遲疑著沒進教室。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我以前知道每節在哪裡上，現在像進了一所新學校。",
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
              "text": "確認正式復學年級班級與當日課表",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師核對學生已完成的正式復學資料，未擅改學籍。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我以前知道每節在哪裡上，現在像進了一所新學校。",
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
                      "description": "學生在場告知導師，未將私人說法傳播給其他人。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "請班級幹部說明目前的課堂與生活流程",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "幹部準備介紹課室和公告方式，適應仍需時間。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我以前知道每節在哪裡上，現在像進了一所新學校。",
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
                      "description": "學生在場告知導師，未將私人說法傳播給其他人。"
                    }
                  ]
                }
              }
            },
            {
              "id": "agency",
              "text": "讓學生先挑最需要釐清的三件事",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生列出教室、午餐、交作業等疑問，還沒全部解決。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我以前知道每節在哪裡上，現在像進了一所新學校。",
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
                      "description": "學生在場告知導師，未將私人說法傳播給其他人。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "熟悉的地方變陌生，不代表你不能重新開始",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生願意逐步適應，沒被要求立即恢復過去的人際關係。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我以前知道每節在哪裡上，現在像進了一所新學校。",
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
                      "description": "學生在場告知導師，未將私人說法傳播給其他人。"
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
      "id": "content:18b-t03-05-15",
      "topicId": "T03-05",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-05-15",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "3-4",
        "4-4",
        "2-2"
      ],
      "additionalCodes": [
        "3-1",
        "4-2",
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
        "cooldownDays": 45,
        "exclusionGroups": [],
        "sameFact": true,
        "reason": "學生與學籍資格仍須由正式日程判定"
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
      "resourceId": "content:18b-t03-05-16",
      "definitionId": "content:18b-t03-05-16",
      "version": "1",
      "topicId": "T03-05",
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
              "text": "已完成轉出的學生座位上仍貼著姓名標籤，抽屜裡還有未領走的水壺與講義。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "那個位子一直空著，我們是要留到什麼時候？",
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
              "text": "先核對學生正式轉出與物品保管狀態",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師確認正式資料與物品狀態，未將未領物品擅自丟棄。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "那個位子一直空著，我們是要留到什麼時候？",
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
                      "description": "學生在場告知導師，未將私人說法傳播給其他人。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "請班級幹部依校方程序整理公共座位",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "班級幹部得知應依規定整理，私人用品仍待合法交還。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "那個位子一直空著，我們是要留到什麼時候？",
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
                      "description": "學生在場告知導師，未將私人說法傳播給其他人。"
                    }
                  ]
                }
              }
            },
            {
              "id": "agency",
              "text": "與同學討論如何保留合適的班級紀念",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生提出保留照片紀錄的建議，不影響座位安排。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "那個位子一直空著，我們是要留到什麼時候？",
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
                      "description": "學生在場告知導師，未將私人說法傳播給其他人。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "留下回憶，不一定要留下整個抽屜",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "同學知道整理座位不等於否認曾經的友誼。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "那個位子一直空著，我們是要留到什麼時候？",
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
                      "description": "學生在場告知導師，未將私人說法傳播給其他人。"
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
      "id": "content:18b-t03-05-16",
      "topicId": "T03-05",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-05-16",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "3-4",
        "4-4",
        "2-2"
      ],
      "additionalCodes": [
        "3-1",
        "4-2",
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
        "reason": "學生與學籍資格仍須由正式日程判定"
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
      "resourceId": "content:18b-t03-05-17",
      "definitionId": "content:18b-t03-05-17",
      "version": "1",
      "topicId": "T03-05",
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
              "text": "轉學生拿出前校課本的目錄，發現現在這班已教到不同章節，說自己連練習頁碼都對不起來。",
              "speaker": null,
              "scene": "school:teachers-office",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "老師說做第六章，可是我的第六章跟大家完全不一樣。",
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
              "text": "請學生對照兩校教材真正的學習單元",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生指出兩套教材章節差異，尚未判斷學習落差大小。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "老師說做第六章，可是我的第六章跟大家完全不一樣。",
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
                      "description": "學生在場告知導師，未將私人說法傳播給其他人。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "與科任核對應補內容而非只看頁碼",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師向科任詢問銜接內容，沒有自行改課程進度。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "老師說做第六章，可是我的第六章跟大家完全不一樣。",
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
                      "description": "學生在場告知導師，未將私人說法傳播給其他人。"
                    }
                  ]
                }
              }
            },
            {
              "id": "agency",
              "text": "協助學生列出跨版本尚缺的概念",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生列出兩項待補概念，仍需核對實際程度。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "老師說做第六章，可是我的第六章跟大家完全不一樣。",
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
                      "description": "學生在場告知導師，未將私人說法傳播給其他人。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "課本版本不同，不表示你前面都白學",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生知道可以逐項銜接，不用整冊從頭重來。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "老師說做第六章，可是我的第六章跟大家完全不一樣。",
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
                      "description": "學生在場告知導師，未將私人說法傳播給其他人。"
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
      "id": "content:18b-t03-05-17",
      "topicId": "T03-05",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-05-17",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "3-4",
        "4-4",
        "2-2"
      ],
      "additionalCodes": [
        "3-1",
        "4-2",
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
        "reason": "學生與學籍資格仍須由正式日程判定"
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
      "resourceId": "content:18b-t03-05-18",
      "definitionId": "content:18b-t03-05-18",
      "version": "1",
      "topicId": "T03-05",
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
              "text": "一名正式轉出的學生原是班級總務股長，新的收支表無人交接，已有同學說乾脆讓最熟的人直接接手。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "可是班上原本不是說幹部要選嗎？",
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
              "text": "核對原職務與已完成交接的資料",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師整理原幹部留下的交接項目，尚未任命新幹部。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "可是班上原本不是說幹部要選嗎？",
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
                      "description": "學生在場告知導師，未將私人說法傳播給其他人。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "依班級既定程序安排補選與臨時代理",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師提出依既定程序補選，代理權責仍須公告。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "可是班上原本不是說幹部要選嗎？",
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
                      "description": "學生在場告知導師，未將私人說法傳播給其他人。"
                    }
                  ]
                }
              }
            },
            {
              "id": "agency",
              "text": "請同學提出透明的帳務交接方式",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生提出帳務清冊及見證方式，待班級確認。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "可是班上原本不是說幹部要選嗎？",
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
                      "description": "學生在場告知導師，未將私人說法傳播給其他人。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "總務不是誰離錢近誰就自動當選",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "同學理解公開程序的重要性，不把熱心等同當然任命。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "可是班上原本不是說幹部要選嗎？",
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
                      "description": "學生在場告知導師，未將私人說法傳播給其他人。"
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
      "id": "content:18b-t03-05-18",
      "topicId": "T03-05",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-05-18",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "3-4",
        "4-4",
        "2-2"
      ],
      "additionalCodes": [
        "3-1",
        "4-2",
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
          "p6"
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
        "reason": "學生與學籍資格仍須由正式日程判定"
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
      "resourceId": "content:18b-t03-05-19",
      "definitionId": "content:18b-t03-05-19",
      "version": "1",
      "topicId": "T03-05",
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
              "text": "轉學生想加入攝影社，卻在社團公告上看到名額已滿；同學熱心說導師可以幫他直接插隊。",
              "speaker": null,
              "scene": "school:corridor",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我不想搶別人的名額，但也不想整學期都沒辦法參加。",
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
              "text": "先核對社團正式招生與候補資訊",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生知道名額資訊需要核對，不認定已有參加資格。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我不想搶別人的名額，但也不想整學期都沒辦法參加。",
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
                      "description": "學生在場告知導師，未將私人說法傳播給其他人。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "向社團承辦詢問轉入生的合法處理方式",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師向承辦確認候補程序，尚未取得入社許可。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我不想搶別人的名額，但也不想整學期都沒辦法參加。",
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
                      "description": "學生在場告知導師，未將私人說法傳播給其他人。"
                    }
                  ]
                }
              }
            },
            {
              "id": "agency",
              "text": "請學生比較其他仍有名額的相關活動",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生看過其他活動選項，但尚未做出選擇。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我不想搶別人的名額，但也不想整學期都沒辦法參加。",
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
                      "description": "學生在場告知導師，未將私人說法傳播給其他人。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "想參加很正常，但不必靠特例硬擠",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生知道自己的參與需求可正當提出，不用搶別人位置。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我不想搶別人的名額，但也不想整學期都沒辦法參加。",
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
                      "description": "學生在場告知導師，未將私人說法傳播給其他人。"
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
      "id": "content:18b-t03-05-19",
      "topicId": "T03-05",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-05-19",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "3-4",
        "4-4",
        "2-2"
      ],
      "additionalCodes": [
        "3-1",
        "4-2",
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
        "reason": "學生與學籍資格仍須由正式日程判定"
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
      "resourceId": "content:18b-t03-05-20",
      "definitionId": "content:18b-t03-05-20",
      "version": "1",
      "topicId": "T03-05",
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
              "text": "新同學自我介紹還沒結束，班上就有人接連追問『你為什麼轉來？是不是原校出事？』，他僵在臺前。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我可以說我喜歡什麼，但不想講原來學校的事。",
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
              "text": "先確認學生願意分享的介紹內容",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生界定願意分享的內容，導師未追問原校理由。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我可以說我喜歡什麼，但不想講原來學校的事。",
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
                      "description": "學生在場告知導師，未將私人說法傳播給其他人。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "當場提醒提問不得逼問私人轉學原因",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師提醒停止私人盤問，班級氣氛仍待修復。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我可以說我喜歡什麼，但不想講原來學校的事。",
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
                      "description": "學生在場告知導師，未將私人說法傳播給其他人。"
                    }
                  ]
                }
              }
            },
            {
              "id": "agency",
              "text": "換成全班都能回答的興趣交流題",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生有機會談興趣而不是轉學原因，活動尚待安排。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我可以說我喜歡什麼，但不想講原來學校的事。",
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
                      "description": "學生在場告知導師，未將私人說法傳播給其他人。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "新同學自介不是轉學原因調查會",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生知道有權保留私人經歷，不必迎合全班好奇心。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我可以說我喜歡什麼，但不想講原來學校的事。",
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
                      "description": "學生在場告知導師，未將私人說法傳播給其他人。"
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
      "id": "content:18b-t03-05-20",
      "topicId": "T03-05",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-05-20",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "3-4",
        "4-4",
        "2-2"
      ],
      "additionalCodes": [
        "3-1",
        "4-2",
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
        "reason": "學生與學籍資格仍須由正式日程判定"
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
