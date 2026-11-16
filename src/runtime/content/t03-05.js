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
        "enrollment": null,
        "roleIds": [
          17
        ],
        "enrollmentContext": {
          "minDays": 0,
          "maxDays": 1
        }
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
        "enrollment": null,
        "roleIds": [
          17
        ],
        "enrollmentContext": {
          "minDays": 0,
          "maxDays": 60
        }
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
        "enrollment": null,
        "roleIds": [
          17
        ],
        "enrollmentContext": {
          "minDays": 0,
          "maxDays": 7
        }
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
        "enrollment": null,
        "roleIds": [
          17
        ],
        "enrollmentContext": {
          "minDays": 0,
          "maxDays": 14
        }
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
        "enrollment": null,
        "roleIds": [
          17
        ],
        "enrollmentContext": {
          "minDays": 2,
          "maxDays": 5
        }
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
        "enrollment": null,
        "enrollmentContext": {
          "minDays": 0,
          "maxDays": 3,
          "priorStatus": "suspended",
          "minDaysAway": 7
        }
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
        "enrollment": null,
        "roleIds": [
          17
        ],
        "enrollmentContext": {
          "minDays": 0,
          "maxDays": 45
        }
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
        "enrollment": null,
        "roleIds": [
          17
        ],
        "enrollmentContext": {
          "minDays": 0,
          "maxDays": 45
        }
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
        "enrollment": null,
        "roleIds": [
          17
        ],
        "enrollmentContext": {
          "minDays": 0,
          "maxDays": 2
        }
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
              "text": "轉入生才報到就發現下週校外教學已截止報名，班級卻還把他算進當天行程。",
              "speaker": null,
              "scene": "school:corridor",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我也想去，但名單早就送出去了吧？",
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
              "text": "先核對活動名冊與學生合法在籍日期",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師確認名冊與報到時點，尚未認定能直接參加。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我也想去，但名單早就送出去了吧？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面提出疑問，學籍及行政正式資料須另行核對。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "向承辦詢問逾期報名和保險處理程序",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "承辦收到詢問，保險與人數限制仍待核對。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我也想去，但名單早就送出去了吧？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面提出疑問，學籍及行政正式資料須另行核對。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "協助學生了解其他可參與的正式安排",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生知道可問哪些替代方案，尚未被強制決定。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我也想去，但名單早就送出去了吧？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面提出疑問，學籍及行政正式資料須另行核對。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "不是你來得太晚就活該被忘記",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生感受被重視，不等於已完成報名。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我也想去，但名單早就送出去了吧？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面提出疑問，學籍及行政正式資料須另行核對。"
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
        "enrollment": null,
        "roleIds": [
          17
        ],
        "enrollmentContext": {
          "minDays": 0,
          "maxDays": 30
        }
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
              "text": "學生說自己下週起可能不來上課，以為跟導師講過就等同正式休學。",
              "speaker": null,
              "scene": "school:teachers-office",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我有說要休學了，怎麼還會算缺課？",
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
              "text": "先確認學生實際申請進度與意願",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師確認學生目前只是表達意願，未修改學籍。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我有說要休學了，怎麼還會算缺課？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面提出疑問，學籍及行政正式資料須另行核對。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "協助聯絡教務確認正式休學程序",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "教務收到詢問，尚未形成正式休學核准。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我有說要休學了，怎麼還會算缺課？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面提出疑問，學籍及行政正式資料須另行核對。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "與學生說明詢問不等於已核准的差別",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生知道需核對有效日期與程序，沒有被代替申請。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我有說要休學了，怎麼還會算缺課？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面提出疑問，學籍及行政正式資料須另行核對。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "想暫停學習可以談，但手續不能用猜的",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生理解可尋求協助，但仍需依規處理出勤。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我有說要休學了，怎麼還會算缺課？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面提出疑問，學籍及行政正式資料須另行核對。"
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
              "text": "正式復學的學生帶著以前的課本回來，發現同一科已換成不同版本。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我以前讀這一本，現在還有哪幾章能用？",
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
              "text": "先核對目前年級與正式教材版本",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師確認教材版本差異，未直接認定可折抵學分。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我以前讀這一本，現在還有哪幾章能用？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面提出疑問，學籍及行政正式資料須另行核對。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "請科任提供新舊內容的對照範圍",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師向科任詢問對照範圍，正式課務仍待確認。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我以前讀這一本，現在還有哪幾章能用？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面提出疑問，學籍及行政正式資料須另行核對。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "協助學生列出需要先補的單元",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生整理需補的內容，尚未完成銜接。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我以前讀這一本，現在還有哪幾章能用？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面提出疑問，學籍及行政正式資料須另行核對。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "換書不代表你之前的學習都白費",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生知道可以利用已有知識，而非全部重來。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我以前讀這一本，現在還有哪幾章能用？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面提出疑問，學籍及行政正式資料須另行核對。"
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
        "enrollment": null,
        "enrollmentContext": {
          "minDays": 0,
          "maxDays": 45,
          "priorStatus": "suspended",
          "minDaysAway": 7
        }
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
              "text": "新轉入生剛好錯過班級紀念照，有同學說乾脆不用把他的名字放進畢冊。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我才剛來，但也希望被當成班上的人。",
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
              "text": "先確認照片與紀念冊的正式製作階段",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師核對製作進度，未保證一定能補拍。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我才剛來，但也希望被當成班上的人。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面提出疑問，學籍及行政正式資料須另行核對。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "與畢冊負責人討論補拍或其他呈現方式",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "畢冊承辦收到替代呈現需求，尚未定案。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我才剛來，但也希望被當成班上的人。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面提出疑問，學籍及行政正式資料須另行核對。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "詢問學生本人希望留下什麼紀念",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生說出希望被納入的方式，仍需尊重本人意願。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我才剛來，但也希望被當成班上的人。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面提出疑問，學籍及行政正式資料須另行核對。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "照片晚拍不代表你不是這個班的一員",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生理解班級歸屬不由某張照片日期決定。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我才剛來，但也希望被當成班上的人。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面提出疑問，學籍及行政正式資料須另行核對。"
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
        "enrollment": null,
        "roleIds": [
          17
        ],
        "enrollmentContext": {
          "minDays": 0,
          "maxDays": 60
        }
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
              "text": "學生向導師詢問能否轉班，理由與同學衝突有關，但尚未提交任何正式申請。",
              "speaker": null,
              "scene": "school:teachers-office",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我只是想先知道能不能換，不是今天就要決定。",
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
              "text": "先聽清楚學生所遇到的具體困難",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師記下學生困難，未認定轉班已成定局。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我只是想先知道能不能換，不是今天就要決定。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面提出疑問，學籍及行政正式資料須另行核對。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "協助了解正式轉班申請與可用支持",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生知道需依正式程序申請，導師未保證准駁。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我只是想先知道能不能換，不是今天就要決定。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面提出疑問，學籍及行政正式資料須另行核對。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "討論不立即轉班也能先處理的問題",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生列出眼前可處理的困難，並未被迫留下或離開。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我只是想先知道能不能換，不是今天就要決定。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面提出疑問，學籍及行政正式資料須另行核對。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "想了解轉班不代表你已經放棄這裡",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生知道可以探索選擇，不必被視為背叛班級。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我只是想先知道能不能換，不是今天就要決定。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面提出疑問，學籍及行政正式資料須另行核對。"
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
              "text": "復學學生沿用過去班級的打掃規定，卻被同學說他不守現行制度。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "以前明明是這樣輪的，我不知道現在改了。",
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
              "text": "先確認新舊制度的差異與公告時間",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師確認規則已有差異，尚未把學生視為故意違規。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "以前明明是這樣輪的，我不知道現在改了。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面提出疑問，學籍及行政正式資料須另行核對。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "請班幹部提供現行班級規則摘要",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "班幹部準備說明，仍需與正式班會決議一致。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "以前明明是這樣輪的，我不知道現在改了。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面提出疑問，學籍及行政正式資料須另行核對。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "讓學生確認自己本週實際分工",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生知道本週任務，其他規則可逐步了解。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "以前明明是這樣輪的，我不知道現在改了。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面提出疑問，學籍及行政正式資料須另行核對。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "回來第一週不熟，不用急著貼不負責任標籤",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生感受被接納，未免除現行共同責任。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "以前明明是這樣輪的，我不知道現在改了。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面提出疑問，學籍及行政正式資料須另行核對。"
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
        "enrollment": null,
        "enrollmentContext": {
          "minDays": 0,
          "maxDays": 30,
          "priorStatus": "suspended",
          "minDaysAway": 7
        }
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
              "text": "學生從網路社團看到所謂轉學考『保證內定題庫』，拿來問導師是真是假。",
              "speaker": null,
              "scene": "school:teachers-office",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "大家都在傳，會不會真的有不用準備的辦法？",
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
              "text": "確認訊息是否出自正式招生公告",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師指出消息尚未證實，未認定當事人已受騙。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "大家都在傳，會不會真的有不用準備的辦法？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面提出疑問，學籍及行政正式資料須另行核對。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "請教務提供正確的轉學考資訊",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生取得查詢正式管道，招生條件仍依公告。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "大家都在傳，會不會真的有不用準備的辦法？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面提出疑問，學籍及行政正式資料須另行核對。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "提醒不要付款或提供私人資料給不明來源",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生了解資訊安全風險，未提供個資。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "大家都在傳，會不會真的有不用準備的辦法？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面提出疑問，學籍及行政正式資料須另行核對。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "保證內定的話越好聽，越要查來源",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生知道可以核對規定，不必靠不明群組下注。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "大家都在傳，會不會真的有不用準備的辦法？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面提出疑問，學籍及行政正式資料須另行核對。"
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
      "resourceId": "content:18b-t03-05-21",
      "definitionId": "content:18b-t03-05-21",
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
              "text": "新轉入生第一週想訂餐，卻發現合作社系統沒有他的學號資料。",
              "speaker": null,
              "scene": "school:corridor",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "大家都能用手機訂，我連登入頁都進不去。",
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
              "text": "先核對正式學號是否已完成建檔",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師核對資訊缺口，未自行更改學生帳號。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "大家都能用手機訂，我連登入頁都進不去。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面提出疑問，學籍及行政正式資料須另行核對。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "向合作社管理窗口詢問開通流程",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "合作社收到開通需求，尚未確認立即可用。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "大家都能用手機訂，我連登入頁都進不去。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面提出疑問，學籍及行政正式資料須另行核對。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "協助學生了解當日合法的其他用餐方式",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生知道當日其他用餐方式，未保證長期安排。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "大家都能用手機訂，我連登入頁都進不去。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面提出疑問，學籍及行政正式資料須另行核對。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "帳號還沒建好不是你不想吃飯",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生知道適應問題可被協助，不必尷尬挨餓。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "大家都能用手機訂，我連登入頁都進不去。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面提出疑問，學籍及行政正式資料須另行核對。"
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
      "id": "content:18b-t03-05-21",
      "topicId": "T03-05",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-05-21",
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
        "enrollment": null,
        "roleIds": [
          17
        ],
        "enrollmentContext": {
          "minDays": 0,
          "maxDays": 7
        }
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
      "resourceId": "content:18b-t03-05-22",
      "definitionId": "content:18b-t03-05-22",
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
              "text": "轉入生表示曾任社團幹部，但原校活動證明尚未寄到，想問是否能加入現任幹部選拔。",
              "speaker": null,
              "scene": "school:teachers-office",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我有經驗，可是證明還在原學校。",
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
              "text": "先區分自述經驗與正式資格要求",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師記下學生經驗，未直接認定幹部資格。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我有經驗，可是證明還在原學校。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面提出疑問，學籍及行政正式資料須另行核對。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "向社團承辦詢問資格與補件規定",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "承辦收到詢問，仍須依正式選拔程序判斷。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我有經驗，可是證明還在原學校。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面提出疑問，學籍及行政正式資料須另行核對。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "協助學生整理能提出的合法證明",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生整理可能的證明來源，尚未完成認定。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我有經驗，可是證明還在原學校。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面提出疑問，學籍及行政正式資料須另行核對。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "有能力不代表可以跳過規則，規則也該講清楚",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生知道可表達自身經驗，不必被先否定。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我有經驗，可是證明還在原學校。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面提出疑問，學籍及行政正式資料須另行核對。"
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
      "id": "content:18b-t03-05-22",
      "topicId": "T03-05",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-05-22",
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
        "enrollment": null,
        "roleIds": [
          17
        ],
        "enrollmentContext": {
          "minDays": 0,
          "maxDays": 60
        }
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
      "resourceId": "content:18b-t03-05-23",
      "definitionId": "content:18b-t03-05-23",
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
              "text": "學生轉出前仍保管班級共用鑰匙，導師發現交接清單沒有這一項。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我有帶在身上，只是不知道要交給誰。",
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
              "text": "先核對鑰匙的登記與管理權責",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師確認鑰匙仍由學生持有，尚未完成歸還。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我有帶在身上，只是不知道要交給誰。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面提出疑問，學籍及行政正式資料須另行核對。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "請相關保管單位確認正式歸還方式",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "保管單位被請確認程序，交接仍待執行。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我有帶在身上，只是不知道要交給誰。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面提出疑問，學籍及行政正式資料須另行核對。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "協助學生記錄交接完成的證據",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生知道需保留交接紀錄，未私下交給同學。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我有帶在身上，只是不知道要交給誰。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面提出疑問，學籍及行政正式資料須另行核對。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "要走了也別讓鑰匙跟著跑到別校",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生理解這是物品責任，不被指責成刻意扣留。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我有帶在身上，只是不知道要交給誰。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面提出疑問，學籍及行政正式資料須另行核對。"
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
      "id": "content:18b-t03-05-23",
      "topicId": "T03-05",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-05-23",
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
      "resourceId": "content:18b-t03-05-24",
      "definitionId": "content:18b-t03-05-24",
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
              "text": "班級紀念冊拍攝已經過了兩週，新轉學生看見名單沒有自己，擔心日後沒留下痕跡。",
              "speaker": null,
              "scene": "school:corridor",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我知道我來得晚，但總想留一點回憶。",
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
              "text": "先核對畢冊目前製作進度",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師確認製作階段，未承諾一定可新增版面。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我知道我來得晚，但總想留一點回憶。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面提出疑問，學籍及行政正式資料須另行核對。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "詢問製作單位能否安排合法補拍",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "製作單位收到詢問，補拍與授權條件待確認。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我知道我來得晚，但總想留一點回憶。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面提出疑問，學籍及行政正式資料須另行核對。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "讓學生決定是否提供其他可用照片",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生選擇是否提供照片，未被迫公開私人影像。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我知道我來得晚，但總想留一點回憶。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面提出疑問，學籍及行政正式資料須另行核對。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "班級回憶不應只看誰先到校",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生知道自己的班級歸屬不只是一張團體照。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我知道我來得晚，但總想留一點回憶。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面提出疑問，學籍及行政正式資料須另行核對。"
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
      "id": "content:18b-t03-05-24",
      "topicId": "T03-05",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-05-24",
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
        "enrollment": null,
        "roleIds": [
          17
        ],
        "enrollmentContext": {
          "minDays": 0,
          "maxDays": 60
        }
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
      "resourceId": "content:18b-t03-05-25",
      "definitionId": "content:18b-t03-05-25",
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
              "text": "轉學生加入後，班上討論要不要追繳此前全學期的班費，意見分歧。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我剛來，之前辦過的活動也要分攤嗎？",
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
              "text": "先查清班費支出、結餘及原訂規則",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師整理已發生支出，不擅自要求追繳。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我剛來，之前辦過的活動也要分攤嗎？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面提出疑問，學籍及行政正式資料須另行核對。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "將爭議帶入班級合法討論與紀錄",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "班級待依原有規則與公平原則討論，尚未決議。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我剛來，之前辦過的活動也要分攤嗎？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面提出疑問，學籍及行政正式資料須另行核對。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "請學生提出其合理疑問而不施壓",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生提出需了解的費用明細，未被強迫當下付款。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我剛來，之前辦過的活動也要分攤嗎？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面提出疑問，學籍及行政正式資料須另行核對。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "班費要算得清楚，才不會讓新人難做人",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生知道可以詢問財務透明，不必為難自己。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我剛來，之前辦過的活動也要分攤嗎？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面提出疑問，學籍及行政正式資料須另行核對。"
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
      "id": "content:18b-t03-05-25",
      "topicId": "T03-05",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-05-25",
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
        "enrollment": null,
        "roleIds": [
          17
        ],
        "enrollmentContext": {
          "minDays": 0,
          "maxDays": 45
        }
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
