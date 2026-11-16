// Generated isolated T03 authoring records. Not a production catalogue.
// Source: work/18b-t03-04-authoring.json. Regenerate via scripts/sync-t03-drafts.mjs.
export default [
  {
    "story": {
      "resourceId": "content:18b-t03-04-01",
      "definitionId": "content:18b-t03-04-01",
      "version": "1",
      "topicId": "T03-04",
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
              "text": "學生十分鐘寫完練習，老師又要他重抄五次。他把已完成的題本放到你桌上。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我不是不想學，只是同一題一直抄也不會變難。",
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
              "text": "請學生示範如何解釋已完成題型",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生說明自己已會的題型，尚未認定全部課程都已精通。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我不是不想學，只是同一題一直抄也不會變難。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師，其他人是否得知仍須由實際聯絡決定。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "與科任討論進階延伸活動",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師提出延伸練習需求，仍由科任安排。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我不是不想學，只是同一題一直抄也不會變難。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師，其他人是否得知仍須由實際聯絡決定。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "請學生提出一項自主探究問題",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生提出進階問題，尚未取代正式作業。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我不是不想學，只是同一題一直抄也不會變難。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師，其他人是否得知仍須由實際聯絡決定。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "會做之後想挑戰新題目，很正常",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生願意表達需要，而不是以干擾上課回應無聊。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我不是不想學，只是同一題一直抄也不會變難。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師，其他人是否得知仍須由實際聯絡決定。"
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
      "id": "content:18b-t03-04-01",
      "topicId": "T03-04",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-04-01",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "4-1",
        "3-4",
        "2-2"
      ],
      "additionalCodes": [
        "3-2",
        "4-4",
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
        -1,
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
        "reason": "依引擎合法學籍、日程及冷卻篩選"
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
      "resourceId": "content:18b-t03-04-02",
      "definitionId": "content:18b-t03-04-02",
      "version": "1",
      "topicId": "T03-04",
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
              "text": "學生畫的社團海報被全組拿去投稿，作品原創者和策劃組員的署名尚未談妥。",
              "speaker": null,
              "scene": "school:teachers-office",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我不反對團隊一起展出，但這張圖真的都是我畫的。",
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
              "text": "釐清各人的實際貢獻與原本約定",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師整理不同當事人的說法，尚未認定貢獻歸屬。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我不反對團隊一起展出，但這張圖真的都是我畫的。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師，其他人是否得知仍須由實際聯絡決定。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "請社團老師確認正式投稿署名規定",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師向社團教師詢問署名規定，尚無決定。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我不反對團隊一起展出，但這張圖真的都是我畫的。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師，其他人是否得知仍須由實際聯絡決定。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "協助學生提出分工署名方案",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生提出區分插畫與企劃的署名方式，仍需協商。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我不反對團隊一起展出，但這張圖真的都是我畫的。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師，其他人是否得知仍須由實際聯絡決定。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "合作不是把誰做了什麼全部抹掉",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生知道可以表達創作權益，而非被迫退出團隊。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我不反對團隊一起展出，但這張圖真的都是我畫的。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師，其他人是否得知仍須由實際聯絡決定。"
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
      "id": "content:18b-t03-04-02",
      "topicId": "T03-04",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-04-02",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "4-1",
        "3-4",
        "2-2"
      ],
      "additionalCodes": [
        "3-2",
        "4-4",
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
        -1,
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
        "reason": "依引擎合法學籍、日程及冷卻篩選"
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
      "resourceId": "content:18b-t03-04-03",
      "definitionId": "content:18b-t03-04-03",
      "version": "1",
      "topicId": "T03-04",
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
              "text": "學生準備半年數學競賽，報名通知卻顯示比賽與學校月考撞期。",
              "speaker": null,
              "scene": "school:corridor",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我已經練半年了，可是段考也不是可以隨便不去。",
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
              "text": "核對兩邊確切日期和正式通知",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師核對日期，尚未確認學生能否請假。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我已經練半年了，可是段考也不是可以隨便不去。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師，其他人是否得知仍須由實際聯絡決定。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "向教務與競賽承辦確認合法程序",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師向權責人員詢問，不自行核准補考。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我已經練半年了，可是段考也不是可以隨便不去。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師，其他人是否得知仍須由實際聯絡決定。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "協助學生列出必要申請文件",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生整理期限及文件，正式申請尚待提出。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我已經練半年了，可是段考也不是可以隨便不去。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師，其他人是否得知仍須由實際聯絡決定。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "花半年準備的事，不該用猜規則決定",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生感受到支持，但競賽與考試衝突仍未解決。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我已經練半年了，可是段考也不是可以隨便不去。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師，其他人是否得知仍須由實際聯絡決定。"
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
      "id": "content:18b-t03-04-03",
      "topicId": "T03-04",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-04-03",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "4-1",
        "3-4",
        "2-2"
      ],
      "additionalCodes": [
        "3-2",
        "4-4",
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
        -1,
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
        "reason": "依引擎合法學籍、日程及冷卻篩選"
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
