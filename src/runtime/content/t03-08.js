// Generated isolated T03 authoring records. Not a production catalogue.
// Source: work/18b-t03-08-authoring.json. Regenerate via scripts/sync-t03-drafts.mjs.
export default [
  {
    "story": {
      "resourceId": "content:18b-t03-08-01",
      "definitionId": "content:18b-t03-08-01",
      "version": "1",
      "topicId": "T03-08",
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
              "text": "學生帶著寫好的課堂需求清單來找導師，希望有人陪他去找科任，但不想讓人代替他說話。",
              "speaker": null,
              "scene": "school:teachers-office",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我想自己說，只是怕講到一半忘記重點。",
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
              "id": "inquire",
              "text": "請學生先選出最重要的兩項需求",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生指出兩項優先需求，仍未正式向科任提出。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我想自己說，只是怕講到一半忘記重點。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生本人對導師說明需求，未對其他人自動揭露資訊。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "向科任確認合適的正式溝通時段",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師協助詢問時間，並未替學生決定支持方式。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我想自己說，只是怕講到一半忘記重點。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生本人對導師說明需求，未對其他人自動揭露資訊。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "陪學生練習表達需求的順序",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生練習說明次序，仍待真正會談。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我想自己說，只是怕講到一半忘記重點。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生本人對導師說明需求，未對其他人自動揭露資訊。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "你先說，我只在你需要時補充",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生知道自己可以是主要發言者。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我想自己說，只是怕講到一半忘記重點。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生本人對導師說明需求，未對其他人自動揭露資訊。"
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
      "id": "content:18b-t03-08-01",
      "topicId": "T03-08",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-08-01",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "4-3",
        "3-1",
        "4-4"
      ],
      "additionalCodes": [
        "3-4",
        "2-2",
        "1-3"
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
        -1,
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
        "reason": "個別學生需求依正式學籍及時段檢查"
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
      "resourceId": "content:18b-t03-08-02",
      "definitionId": "content:18b-t03-08-02",
      "version": "1",
      "topicId": "T03-08",
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
              "text": "班級意見箱出現一張要求改善教室通道的匿名紙條，其他學生開始研究筆跡猜作者。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "問題就在通道啊，為什麼大家都在猜誰寫的？",
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
              "id": "inquire",
              "text": "先檢視建議反映的動線問題",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師記下通道問題，尚未認定是否需實際施工。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "問題就在通道啊，為什麼大家都在猜誰寫的？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生本人對導師說明需求，未對其他人自動揭露資訊。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "提醒同學不可擅猜匿名作者身分",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師提醒保護匿名者，未宣稱流言立刻停止。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "問題就在通道啊，為什麼大家都在猜誰寫的？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生本人對導師說明需求，未對其他人自動揭露資訊。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "安排班會討論空間調整而非追查名字",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "班級準備檢視動線，尚未形成正式決議。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "問題就在通道啊，為什麼大家都在猜誰寫的？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生本人對導師說明需求，未對其他人自動揭露資訊。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "匿名意見不是讓大家玩偵探遊戲",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生知道匿名建議也能受到尊重。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "問題就在通道啊，為什麼大家都在猜誰寫的？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生本人對導師說明需求，未對其他人自動揭露資訊。"
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
      "id": "content:18b-t03-08-02",
      "topicId": "T03-08",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-08-02",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "4-3",
        "3-1",
        "4-4"
      ],
      "additionalCodes": [
        "3-4",
        "2-2",
        "1-3"
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
        -1,
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
        "reason": "個別學生需求依正式學籍及時段檢查"
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
      "resourceId": "content:18b-t03-08-03",
      "definitionId": "content:18b-t03-08-03",
      "version": "1",
      "topicId": "T03-08",
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
              "text": "幾名學生想建立班級共筆，但擔心整理課堂筆記最後變成抄交作業答案的群組。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我們想互助，不是讓全班複製同一份作業。",
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
              "id": "inquire",
              "text": "先區分共享課堂重點與代寫答案",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師釐清共筆與代寫不同，尚未核准任何作業共用。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我們想互助，不是讓全班複製同一份作業。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生本人對導師說明需求，未對其他人自動揭露資訊。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "向科任確認可分享的內容與授權",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師詢問科任材料使用界線，尚待正式回覆。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我們想互助，不是讓全班複製同一份作業。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生本人對導師說明需求，未對其他人自動揭露資訊。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "協助學生草擬共筆來源註明規則",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生寫下共筆約定草案，仍需班級討論。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我們想互助，不是讓全班複製同一份作業。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生本人對導師說明需求，未對其他人自動揭露資訊。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "互助很棒，但練習也不能直接外包",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生理解互助須兼顧學習責任與授權。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我們想互助，不是讓全班複製同一份作業。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生本人對導師說明需求，未對其他人自動揭露資訊。"
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
      "id": "content:18b-t03-08-03",
      "topicId": "T03-08",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-08-03",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "4-3",
        "3-1",
        "4-4"
      ],
      "additionalCodes": [
        "3-4",
        "2-2",
        "1-3"
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
        -1,
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
        "reason": "個別學生需求依正式學籍及時段檢查"
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
