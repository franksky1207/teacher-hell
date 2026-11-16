// Generated isolated T03 authoring records. Not a production catalogue.
// Source: work/18b-t03-02-authoring.json. Regenerate via scripts/sync-t03-drafts.mjs.
export default [
  {
    "story": {
      "resourceId": "content:18b-t03-02-01",
      "definitionId": "content:18b-t03-02-01",
      "version": "1",
      "topicId": "T03-02",
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
              "text": "鐘聲剛響，學生還在拿課本，科任已經把第一項任務交代完。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我有聽到鐘聲，可是還不知道第一步該做什麼。",
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
              "text": "確認學生最容易漏聽的轉換指令",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生指出最常漏掉開課第一句指令，尚未確認原因。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我有聽到鐘聲，可是還不知道第一步該做什麼。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生直接向導師反映自己的觀察；不自動傳給第三人。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "與科任討論固定的開課提示",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師提出書面開課提示需求，尚待科任討論。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我有聽到鐘聲，可是還不知道第一步該做什麼。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生直接向導師反映自己的觀察；不自動傳給第三人。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "陪學生設計上課前的兩步核對卡",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生寫下準備課本和查看任務兩步，尚待試行。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我有聽到鐘聲，可是還不知道第一步該做什麼。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生直接向導師反映自己的觀察；不自動傳給第三人。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "沒跟上第一句不代表你沒準備好",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生知道可以詢問轉換提示，不必被當成故意發呆。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我有聽到鐘聲，可是還不知道第一步該做什麼。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生直接向導師反映自己的觀察；不自動傳給第三人。"
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
      "id": "content:18b-t03-02-01",
      "topicId": "T03-02",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-02-01",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "3-4",
        "2-2",
        "3-3"
      ],
      "additionalCodes": [
        "3-1",
        "4-2",
        "2-3"
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
        1,
        -1,
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
        "reason": "個別學生情境依正式學籍、時段與冷卻資格抽選"
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
      "resourceId": "content:18b-t03-02-02",
      "definitionId": "content:18b-t03-02-02",
      "version": "1",
      "topicId": "T03-02",
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
              "text": "科任一次宣布五項小組任務，學生只記得最後兩項，拿著空白工作單來問。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "他講到第三件事時，我就忘記第一件了。",
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
              "text": "請學生先說明確定聽到的部分",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生明確指出只記得兩項，沒有編造其餘三項。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "他講到第三件事時，我就忘記第一件了。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生直接向導師反映自己的觀察；不自動傳給第三人。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "向科任核對完整任務清單",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師向科任詢問完整清單，尚未取得正式說明。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "他講到第三件事時，我就忘記第一件了。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生直接向導師反映自己的觀察；不自動傳給第三人。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "協助學生把未知步驟另列待確認",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生分開寫下已知與待確認項目，未假裝全部完成。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "他講到第三件事時，我就忘記第一件了。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生直接向導師反映自己的觀察；不自動傳給第三人。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "五件事一起來，先把它們排成一列",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生願意再核對指令，不以漏聽推論其學習能力。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "他講到第三件事時，我就忘記第一件了。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生直接向導師反映自己的觀察；不自動傳給第三人。"
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
      "id": "content:18b-t03-02-02",
      "topicId": "T03-02",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-02-02",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "3-4",
        "2-2",
        "3-3"
      ],
      "additionalCodes": [
        "3-1",
        "4-2",
        "2-3"
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
        1,
        -1,
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
        "reason": "個別學生情境依正式學籍、時段與冷卻資格抽選"
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
      "resourceId": "content:18b-t03-02-03",
      "definitionId": "content:18b-t03-02-03",
      "version": "1",
      "topicId": "T03-02",
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
              "text": "課表臨時貼出更動，學生站在新教室門口，擔心自己找錯地方。",
              "speaker": null,
              "scene": "school:corridor",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我早上看時還是原教室，怎麼突然改了？",
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
              "text": "核對通知發出的時間與對象",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師查到通知時間，尚未認定學生故意遲到。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我早上看時還是原教室，怎麼突然改了？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生直接向導師反映自己的觀察；不自動傳給第三人。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "請班級幹部確認公告傳遞流程",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "班級幹部同意查核通知方式，未公開學生個人狀況。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我早上看時還是原教室，怎麼突然改了？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生直接向導師反映自己的觀察；不自動傳給第三人。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "陪學生查清今日後續的上課地點",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生記下今日課室位置，正式課表未被更改。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我早上看時還是原教室，怎麼突然改了？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生直接向導師反映自己的觀察；不自動傳給第三人。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "臨時改教室真的會亂，我們先確認",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生感受被理解，仍需要適應臨時變動。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我早上看時還是原教室，怎麼突然改了？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生直接向導師反映自己的觀察；不自動傳給第三人。"
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
      "id": "content:18b-t03-02-03",
      "topicId": "T03-02",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-02-03",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "3-4",
        "2-2",
        "3-3"
      ],
      "additionalCodes": [
        "3-1",
        "4-2",
        "2-3"
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
        1,
        -1,
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
        "reason": "個別學生情境依正式學籍、時段與冷卻資格抽選"
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
      "resourceId": "content:18b-t03-02-04",
      "definitionId": "content:18b-t03-02-04",
      "version": "1",
      "topicId": "T03-02",
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
              "text": "分組報告時每個人都在寫字，學生反覆問自己能做什麼，最後有人抱怨他沒貢獻。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "大家都有事做，就我不知道要做哪一件。",
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
              "text": "先核對小組是否有明確分工",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師發現小組工作分配不清，尚未斷定有人偷懶。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "大家都有事做，就我不知道要做哪一件。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生直接向導師反映自己的觀察；不自動傳給第三人。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "請組員共同確認每項工作責任",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "組員願意重新討論分工，尚未完成分配。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "大家都有事做，就我不知道要做哪一件。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生直接向導師反映自己的觀察；不自動傳給第三人。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "協助學生選一項具體任務提出",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生提出願意整理標題，仍需小組同意。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "大家都有事做，就我不知道要做哪一件。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生直接向導師反映自己的觀察；不自動傳給第三人。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "沒有分好工作就不該先說誰偷懶",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生知道可主動詢問責任界線，衝突尚未消除。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "大家都有事做，就我不知道要做哪一件。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生直接向導師反映自己的觀察；不自動傳給第三人。"
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
      "id": "content:18b-t03-02-04",
      "topicId": "T03-02",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-02-04",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "3-4",
        "2-2",
        "3-3"
      ],
      "additionalCodes": [
        "3-1",
        "4-2",
        "2-3"
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
        1,
        -1,
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
        "reason": "個別學生情境依正式學籍、時段與冷卻資格抽選"
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
      "resourceId": "content:18b-t03-02-05",
      "definitionId": "content:18b-t03-02-05",
      "version": "1",
      "topicId": "T03-02",
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
              "text": "這節課已經響起三次廣播，學生每次重新做題都找不到自己停在哪一行。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "不是我故意停下來，是廣播一結束我就接不上。",
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
              "text": "先確認最常失去進度的題目環節",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生指出中斷常發生在換題時，尚未確認所有影響。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "不是我故意停下來，是廣播一結束我就接不上。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生直接向導師反映自己的觀察；不自動傳給第三人。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "請科任考慮廣播後重新提示目前進度",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師向科任提出重述提示建議，未保證採用。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "不是我故意停下來，是廣播一結束我就接不上。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生直接向導師反映自己的觀察；不自動傳給第三人。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "協助學生標記每次中斷前的步驟",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生試著留下位置記號，效果仍需觀察。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "不是我故意停下來，是廣播一結束我就接不上。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生直接向導師反映自己的觀察；不自動傳給第三人。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "廣播不是你控制的，我們先找回進度",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生得以說出實際困難，未被貼上不專心標籤。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "不是我故意停下來，是廣播一結束我就接不上。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生直接向導師反映自己的觀察；不自動傳給第三人。"
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
      "id": "content:18b-t03-02-05",
      "topicId": "T03-02",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-02-05",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "3-4",
        "2-2",
        "3-3"
      ],
      "additionalCodes": [
        "3-1",
        "4-2",
        "2-3"
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
        1,
        -1,
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
        "reason": "個別學生情境依正式學籍、時段與冷卻資格抽選"
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
      "resourceId": "content:18b-t03-02-06",
      "definitionId": "content:18b-t03-02-06",
      "version": "1",
      "topicId": "T03-02",
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
              "text": "考後學生指著試卷背面整排空白題目，說他從頭到尾不知道還有下一頁。",
              "speaker": null,
              "scene": "school:teachers-office",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我不是不會寫，是根本不知道後面還有題目。",
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
              "text": "協助回想交卷前的檢查過程",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生描述漏翻背面的過程，導師未推定原本可得分數。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我不是不會寫，是根本不知道後面還有題目。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生直接向導師反映自己的觀察；不自動傳給第三人。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "向科任確認頁碼和正式評分原則",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師向科任確認卷面標示與評分，不擅自改分。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我不是不會寫，是根本不知道後面還有題目。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生直接向導師反映自己的觀察；不自動傳給第三人。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "協助學生建立翻面確認的交卷習慣",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生準備下次先核對總頁數，尚未測試效果。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我不是不會寫，是根本不知道後面還有題目。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生直接向導師反映自己的觀察；不自動傳給第三人。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "空白一整面確實很難過，但可以檢查方法",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生願意討論失誤，不將其與全部能力畫上等號。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我不是不會寫，是根本不知道後面還有題目。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生直接向導師反映自己的觀察；不自動傳給第三人。"
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
      "id": "content:18b-t03-02-06",
      "topicId": "T03-02",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-02-06",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "3-4",
        "2-2",
        "3-3"
      ],
      "additionalCodes": [
        "3-1",
        "4-2",
        "2-3"
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
        1,
        -1,
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
        "reason": "個別學生情境依正式學籍、時段與冷卻資格抽選"
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
      "resourceId": "content:18b-t03-02-07",
      "definitionId": "content:18b-t03-02-07",
      "version": "1",
      "topicId": "T03-02",
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
              "text": "午休後學生拿出三科作業，完成的習作竟夾在畫紙裡；他說早上交件時找不到，被當作沒有寫。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我真的寫了，只是剛才翻不到。",
              "speaker": "participant",
              "scene": "school:classroom",
              "cast": [
                {
                  "role": "participant",
                  "position": "center",
                  "expression": "worried"
                }
              ],
              "presentation": "dialogue"
            }
          ],
          "choices": [
            {
              "id": "clarify",
              "text": "核對作業的完成與實際繳交時間",
              "emotional": false,
              "kind": "action",
              "outcome": {
                "fact": "學生拿出完成的習作，是否準時繳交仍待核對。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我真的寫了，只是剛才翻不到。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生直接向導師說明，不會自動傳達給其他人。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "請學生持原稿向科任查證遲交登記",
              "emotional": false,
              "kind": "action",
              "outcome": {
                "fact": "學生準備向科任查證，導師未直接撤銷遲交紀錄。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我真的寫了，只是剛才翻不到。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生直接向導師說明，不會自動傳達給其他人。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "協助學生試用有科目標籤的分類方式",
              "emotional": false,
              "kind": "defer",
              "outcome": {
                "fact": "學生選擇改用科目夾層，效果尚待觀察。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我真的寫了，只是剛才翻不到。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生直接向導師說明，不會自動傳達給其他人。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "三科夾在一起像千層派，找不到也很合理",
              "emotional": true,
              "kind": "support",
              "outcome": {
                "fact": "學生知道自己的困難被理解，不等於所有漏交都可免責。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我真的寫了，只是剛才翻不到。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生直接向導師說明，不會自動傳達給其他人。"
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
      "id": "content:18b-t03-02-07",
      "topicId": "T03-02",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-02-07",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "3-4",
        "2-2",
        "3-3"
      ],
      "additionalCodes": [
        "3-1",
        "4-2",
        "2-3"
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
        1,
        -1,
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
        "reason": "個別學生情境依正式學籍、時段與冷卻資格抽選"
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
      "resourceId": "content:18b-t03-02-08",
      "definitionId": "content:18b-t03-02-08",
      "version": "1",
      "topicId": "T03-02",
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
              "text": "科任說『大家應該知道要收了』，學生以為還有時間繼續做，最後被同學催促。",
              "speaker": null,
              "scene": "school:corridor",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "他又沒有說現在就收，我以為還有兩分鐘。",
              "speaker": "participant",
              "scene": "school:corridor",
              "cast": [
                {
                  "role": "participant",
                  "position": "center",
                  "expression": "worried"
                }
              ],
              "presentation": "dialogue"
            }
          ],
          "choices": [
            {
              "id": "clarify",
              "text": "先釐清老師原話與學生理解",
              "emotional": false,
              "kind": "action",
              "outcome": {
                "fact": "導師確認語句造成理解落差，未推定故意拖延。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "他又沒有說現在就收，我以為還有兩分鐘。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生直接向導師說明，不會自動傳達給其他人。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "向科任建議直接宣告交件時刻",
              "emotional": false,
              "kind": "action",
              "outcome": {
                "fact": "導師向科任提出明確提示建議，尚待採納。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "他又沒有說現在就收，我以為還有兩分鐘。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生直接向導師說明，不會自動傳達給其他人。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "練習遇到暗示時禮貌問清楚",
              "emotional": false,
              "kind": "defer",
              "outcome": {
                "fact": "學生練習一個詢問時限的問句，還未實際運用。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "他又沒有說現在就收，我以為還有兩分鐘。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生直接向導師說明，不會自動傳達給其他人。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "老師也不是讀心術比賽的主持人",
              "emotional": true,
              "kind": "support",
              "outcome": {
                "fact": "學生知道可以追問，不必把所有暗示當成命令。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "他又沒有說現在就收，我以為還有兩分鐘。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生直接向導師說明，不會自動傳達給其他人。"
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
      "id": "content:18b-t03-02-08",
      "topicId": "T03-02",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-02-08",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "3-4",
        "2-2",
        "3-3"
      ],
      "additionalCodes": [
        "3-1",
        "4-2",
        "2-3"
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
        1,
        -1,
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
        "reason": "個別學生情境依正式學籍、時段與冷卻資格抽選"
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
      "resourceId": "content:18b-t03-02-09",
      "definitionId": "content:18b-t03-02-09",
      "version": "1",
      "topicId": "T03-02",
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
              "text": "科任說學生與人說話時眼神一直看窗外，似乎不尊重；學生私下卻說直視對方讓他忘了要說什麼。",
              "speaker": null,
              "scene": "school:teachers-office",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我有聽，只是盯著眼睛就不知道怎麼回答。",
              "speaker": "participant",
              "scene": "school:teachers-office",
              "cast": [
                {
                  "role": "participant",
                  "position": "center",
                  "expression": "worried"
                }
              ],
              "presentation": "dialogue"
            }
          ],
          "choices": [
            {
              "id": "clarify",
              "text": "分別核對兩人的實際觀察",
              "emotional": false,
              "kind": "action",
              "outcome": {
                "fact": "導師記錄雙方說法，尚未替任何人判定動機。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我有聽，只是盯著眼睛就不知道怎麼回答。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生直接向導師說明，不會自動傳達給其他人。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "和科任討論不以眼神直接判斷態度",
              "emotional": false,
              "kind": "action",
              "outcome": {
                "fact": "導師準備向科任討論溝通方式，未揭露私人診斷。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我有聽，只是盯著眼睛就不知道怎麼回答。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生直接向導師說明，不會自動傳達給其他人。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "讓學生試著用簡短口語表示有聽懂",
              "emotional": false,
              "kind": "defer",
              "outcome": {
                "fact": "學生提出可用短句回應，尚待真實對話。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我有聽，只是盯著眼睛就不知道怎麼回答。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生直接向導師說明，不會自動傳達給其他人。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "有沒有看著對方，不等於有沒有認真聽",
              "emotional": true,
              "kind": "support",
              "outcome": {
                "fact": "學生得到理解，當下衝突尚未正式解決。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我有聽，只是盯著眼睛就不知道怎麼回答。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生直接向導師說明，不會自動傳達給其他人。"
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
      "id": "content:18b-t03-02-09",
      "topicId": "T03-02",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-02-09",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "3-4",
        "2-2",
        "3-3"
      ],
      "additionalCodes": [
        "3-1",
        "4-2",
        "2-3"
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
        1,
        -1,
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
        "reason": "個別學生情境依正式學籍、時段與冷卻資格抽選"
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
      "resourceId": "content:18b-t03-02-10",
      "definitionId": "content:18b-t03-02-10",
      "version": "1",
      "topicId": "T03-02",
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
              "text": "第五節課突然輪到學生即興上臺報告，他握著早已準備的兩頁筆記卻一句話也接不上。",
              "speaker": null,
              "scene": "school:corridor",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我真的準備了，可是突然被全班看著，就空白了。",
              "speaker": "participant",
              "scene": "school:corridor",
              "cast": [
                {
                  "role": "participant",
                  "position": "center",
                  "expression": "worried"
                }
              ],
              "presentation": "dialogue"
            }
          ],
          "choices": [
            {
              "id": "clarify",
              "text": "請學生先說出原本準備的三個重點",
              "emotional": false,
              "kind": "action",
              "outcome": {
                "fact": "學生回顧原本準備的內容，尚未完成報告。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我真的準備了，可是突然被全班看著，就空白了。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生直接向導師說明，不會自動傳達給其他人。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "向科任詢問能否事前告知上臺順序",
              "emotional": false,
              "kind": "action",
              "outcome": {
                "fact": "導師向科任詢問提示方式，未決定評量結果。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我真的準備了，可是突然被全班看著，就空白了。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生直接向導師說明，不會自動傳達給其他人。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "協助學生將筆記整理成開頭提示",
              "emotional": false,
              "kind": "defer",
              "outcome": {
                "fact": "學生整理開場提要，效果尚待下次上臺觀察。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我真的準備了，可是突然被全班看著，就空白了。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生直接向導師說明，不會自動傳達給其他人。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "站上去會緊張，不代表前面都沒準備",
              "emotional": true,
              "kind": "support",
              "outcome": {
                "fact": "學生感受被理解，仍需面對公開報告的緊張。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我真的準備了，可是突然被全班看著，就空白了。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生直接向導師說明，不會自動傳達給其他人。"
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
      "id": "content:18b-t03-02-10",
      "topicId": "T03-02",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-02-10",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "3-4",
        "2-2",
        "3-3"
      ],
      "additionalCodes": [
        "3-1",
        "4-2",
        "2-3"
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
        1,
        -1,
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
        "reason": "個別學生情境依正式學籍、時段與冷卻資格抽選"
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
      "resourceId": "content:18b-t03-02-11",
      "definitionId": "content:18b-t03-02-11",
      "version": "1",
      "topicId": "T03-02",
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
              "text": "分組活動時學生摀著耳朵，桌椅摩擦聲讓他無法集中；同組卻以為他故意挑剔。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我不是不讓大家移桌子，那個聲音真的太刺耳。",
              "speaker": "participant",
              "scene": "school:classroom",
              "cast": [
                {
                  "role": "participant",
                  "position": "center",
                  "expression": "worried"
                }
              ],
              "presentation": "dialogue"
            }
          ],
          "choices": [
            {
              "id": "clarify",
              "text": "先確認哪些聲響會影響任務",
              "emotional": false,
              "kind": "action",
              "outcome": {
                "fact": "學生指出特定聲響，未確認背後生理原因。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我不是不讓大家移桌子，那個聲音真的太刺耳。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生直接向導師說明，不會自動傳達給其他人。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "討論能否不增加負擔地調整移桌順序",
              "emotional": false,
              "kind": "action",
              "outcome": {
                "fact": "小組收到移桌動線的協調建議，尚未實行。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我不是不讓大家移桌子，那個聲音真的太刺耳。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生直接向導師說明，不會自動傳達給其他人。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "請小組提出各自願意配合的一項措施",
              "emotional": false,
              "kind": "defer",
              "outcome": {
                "fact": "組員提出相互配合方案，衝突仍待觀察。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我不是不讓大家移桌子，那個聲音真的太刺耳。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生直接向導師說明，不會自動傳達給其他人。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "想安靜和想合作不需要選一個",
              "emotional": true,
              "kind": "support",
              "outcome": {
                "fact": "學生知道自己的感受受重視，組員也未被指控惡意。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我不是不讓大家移桌子，那個聲音真的太刺耳。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生直接向導師說明，不會自動傳達給其他人。"
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
      "id": "content:18b-t03-02-11",
      "topicId": "T03-02",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-02-11",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "3-4",
        "2-2",
        "3-3"
      ],
      "additionalCodes": [
        "3-1",
        "4-2",
        "2-3"
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
        1,
        -1,
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
        "reason": "個別學生情境依正式學籍、時段與冷卻資格抽選"
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
