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
              },
              "variants": [
                {
                  "id": "willing-step",
                  "weight": 3,
                  "modifiers": [
                    {
                      "role": "participant",
                      "holder": "person",
                      "code": "4-1",
                      "influence": 0.45
                    }
                  ],
                  "outcome": {
                    "fact": "學生自己選了一個延伸探究問題，笑著在筆記上畫出第一個構想；這份自選探究並未取代正式作業。",
                    "claims": [
                      {
                        "role": "participant",
                        "statement": "我不是不想學，只是同一題一直抄也不會變難。",
                        "belief": "believed",
                        "visible": false
                      }
                    ],
                    "changes": [
                      {
                        "role": "participant",
                        "holder": "person",
                        "code": "2-4",
                        "delta": 0.5
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
                          "description": "學生當面告知導師，其他人是否得知仍須由實際聯絡決定。"
                        }
                      ]
                    }
                  }
                },
                {
                  "id": "needs-time",
                  "weight": 2,
                  "modifiers": [
                    {
                      "role": "participant",
                      "holder": "person",
                      "code": "4-1",
                      "influence": -0.35
                    }
                  ],
                  "outcome": {
                    "fact": "學生想了片刻仍未決定要研究哪個問題，說需要先看一些例子；尚未建立新任務。",
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
              ]
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
  },
  {
    "story": {
      "resourceId": "content:18b-t03-04-04",
      "definitionId": "content:18b-t03-04-04",
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
              "text": "學生為音樂賽練習，原先預約的空教室被另一社團臨時占用。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我們排好一週了，為什麼今天說不能用？",
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
              "text": "先核對借用紀錄及通知",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師確認借用紀錄不一致，尚未判定誰有優先權。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我們排好一週了，為什麼今天說不能用？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生向導師親述其疑問，其他人物未經接觸仍不知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "向社團承辦協調其他合法空間",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "承辦單位收到協調需求，尚未核可新場地。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我們排好一週了，為什麼今天說不能用？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生向導師親述其疑問，其他人物未經接觸仍不知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "請學生提出可調整練習時段",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生列出替代練習時段，仍需確認空間。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我們排好一週了，為什麼今天說不能用？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生向導師親述其疑問，其他人物未經接觸仍不知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "臨時換場地真的煩，先別怪另一組",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生願意先釐清，不將衝突變成人身指責。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我們排好一週了，為什麼今天說不能用？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生向導師親述其疑問，其他人物未經接觸仍不知情。"
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
      "id": "content:18b-t03-04-04",
      "topicId": "T03-04",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-04-04",
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
      "resourceId": "content:18b-t03-04-05",
      "definitionId": "content:18b-t03-04-05",
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
              "text": "學生拿著今天的數學練習和還沒完成的國文報告來找你，說自己解數學題比較順手，報告卻不知道怎麼開場；旁邊同學隨口笑說他只會算題目。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我也知道那科要練，不用每次拿數學來笑我。",
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
              "text": "先區分兩科實際需要的能力",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師協助學生說清楚不同學習需求，尚未評定同學惡意。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我也知道那科要練，不用每次拿數學來笑我。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生向導師親述其疑問，其他人物未經接觸仍不知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "與國文科任討論可行的報告練習",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師詢問國文科任支持方式，不代為評分。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我也知道那科要練，不用每次拿數學來笑我。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生向導師親述其疑問，其他人物未經接觸仍不知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "讓學生自己選一個想補強的步驟",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生選擇先練習報告開場，尚未完成全部內容。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我也知道那科要練，不用每次拿數學來笑我。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生向導師親述其疑問，其他人物未經接觸仍不知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "擅長一科不代表其他科就要滿分",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生知道不需為了專長而假裝其他科毫無困難。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我也知道那科要練，不用每次拿數學來笑我。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生向導師親述其疑問，其他人物未經接觸仍不知情。"
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
      "id": "content:18b-t03-04-05",
      "topicId": "T03-04",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-04-05",
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
      "resourceId": "content:18b-t03-04-06",
      "definitionId": "content:18b-t03-04-06",
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
              "text": "班上幾位同學把擅長物理的學生圍住，要求每天午休替他們講題。",
              "speaker": null,
              "scene": "school:courtyard",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我可以偶爾教，可是午休也想休息。",
              "speaker": "participant",
              "scene": "school:courtyard",
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
              "text": "先確認學生本人願意協助的界線",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生說出需要保留的休息時間，尚未答應任何固定教學。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我可以偶爾教，可是午休也想休息。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生向導師親述其疑問，其他人物未經接觸仍不知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "請同學理解分享與強制義務不同",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "同學獲提醒尊重個人時間，後續仍待觀察。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我可以偶爾教，可是午休也想休息。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生向導師親述其疑問，其他人物未經接觸仍不知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "討論自願且有時間上限的互助方式",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生提出有限度的自願協助方式，尚待各方接受。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我可以偶爾教，可是午休也想休息。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生向導師親述其疑問，其他人物未經接觸仍不知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "會解題也不等於自動成為全班補習班",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生知道拒絕不合理要求不等於自私。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我可以偶爾教，可是午休也想休息。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生向導師親述其疑問，其他人物未經接觸仍不知情。"
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
      "id": "content:18b-t03-04-06",
      "topicId": "T03-04",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-04-06",
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
      "resourceId": "content:18b-t03-04-07",
      "definitionId": "content:18b-t03-04-07",
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
              "text": "學生聽朋友說有了競賽獎牌就可以直接跳過高二課程，帶著網頁截圖來問。",
              "speaker": null,
              "scene": "school:teachers-office",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我是不是能直接少上一年？大家說得很肯定。",
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
              "text": "先查明網頁與傳聞的真正來源",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師確認來源未必可靠，尚未認定任何跳級資格。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我是不是能直接少上一年？大家說得很肯定。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生向導師親述其疑問，其他人物未經接觸仍不知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "請教務核對正式學籍及修課規定",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "教務單位收到詢問，學籍及課程安排未改動。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我是不是能直接少上一年？大家說得很肯定。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生向導師親述其疑問，其他人物未經接觸仍不知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "協助學生整理想加深學習的課程需求",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生整理進階需求，並未自行跳過必修學分。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我是不是能直接少上一年？大家說得很肯定。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生向導師親述其疑問，其他人物未經接觸仍不知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "有獎牌很棒，但制度不是靠傳聞宣布",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生理解專長與學籍程序需分開確認。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我是不是能直接少上一年？大家說得很肯定。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生向導師親述其疑問，其他人物未經接觸仍不知情。"
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
      "id": "content:18b-t03-04-07",
      "topicId": "T03-04",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-04-07",
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
      "resourceId": "content:18b-t03-04-08",
      "definitionId": "content:18b-t03-04-08",
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
              "text": "學生的科展作品用了很多專業術語，班級成果展觀眾路過卻看不懂他在研究什麼。",
              "speaker": null,
              "scene": "school:auditorium",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我講的都是真的，但他們聽三句就走了。",
              "speaker": "participant",
              "scene": "school:auditorium",
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
              "text": "請學生用生活例子說明研究問題",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生整理出核心問題，尚未改動研究結果。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我講的都是真的，但他們聽三句就走了。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生向導師親述其疑問，其他人物未經接觸仍不知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "與指導教師討論展板可讀性",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "指導教師被詢問展板呈現方式，尚待確認。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我講的都是真的，但他們聽三句就走了。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生向導師親述其疑問，其他人物未經接觸仍不知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "陪學生試做三十秒導覽版本",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生試講短版導覽，仍需在真實展場觀察。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我講的都是真的，但他們聽三句就走了。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生向導師親述其疑問，其他人物未經接觸仍不知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "研究很厲害，也可以讓更多人聽得懂",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生知道溝通可被練習，不代表研究內容不夠好。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我講的都是真的，但他們聽三句就走了。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生向導師親述其疑問，其他人物未經接觸仍不知情。"
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
      "id": "content:18b-t03-04-08",
      "topicId": "T03-04",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-04-08",
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
      "resourceId": "content:18b-t03-04-09",
      "definitionId": "content:18b-t03-04-09",
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
              "text": "科任當眾稱學生是班上的天才，下一次小考只拿第二名就被同學起鬨。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我只是偶爾考得好，不想每次都被拿出來比。",
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
              "text": "先聽學生對公開稱讚的感受",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師記下學生的壓力，未將科任善意直接定為傷害。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我只是偶爾考得好，不想每次都被拿出來比。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生向導師親述其疑問，其他人物未經接觸仍不知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "私下請科任調整對學生的稱呼方式",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師準備向科任說明影響，後續回應仍待確認。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我只是偶爾考得好，不想每次都被拿出來比。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生向導師親述其疑問，其他人物未經接觸仍不知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "協助學生表達自己希望被如何肯定",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生提出偏好肯定努力而非固定標籤。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我只是偶爾考得好，不想每次都被拿出來比。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生向導師親述其疑問，其他人物未經接觸仍不知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "被叫天才也會很累，不能只看名次",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生知道不必每次表現完美才能獲得尊重。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我只是偶爾考得好，不想每次都被拿出來比。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生向導師親述其疑問，其他人物未經接觸仍不知情。"
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
      "id": "content:18b-t03-04-09",
      "topicId": "T03-04",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-04-09",
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
      "resourceId": "content:18b-t03-04-10",
      "definitionId": "content:18b-t03-04-10",
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
              "text": "校外一位自稱研究社指導者的人邀學生長期參與活動，學生把邀請訊息交給導師看。",
              "speaker": null,
              "scene": "school:teachers-office",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "他說我很有天分，可是我不知道活動到底是誰辦的。",
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
              "text": "先查核主辦單位與聯絡資訊",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師提出需核實的資訊，未認定邀約一定安全或詐騙。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "他說我很有天分，可是我不知道活動到底是誰辦的。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生向導師親述其疑問，其他人物未經接觸仍不知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "提醒學生和家長共同確認安全與參與條件",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生知道應與監護人及正式單位核實，不擅自允諾參加。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "他說我很有天分，可是我不知道活動到底是誰辦的。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生向導師親述其疑問，其他人物未經接觸仍不知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "協助列出交通、時間與個資使用問題",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生整理待問事項，尚未提供個資或答應活動。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "他說我很有天分，可是我不知道活動到底是誰辦的。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生向導師親述其疑問，其他人物未經接觸仍不知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "被賞識很棒，但越是好機會越要查清楚",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生理解肯定與查證不衝突，沒有被要求立刻拒絕。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "他說我很有天分，可是我不知道活動到底是誰辦的。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生向導師親述其疑問，其他人物未經接觸仍不知情。"
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
      "id": "content:18b-t03-04-10",
      "topicId": "T03-04",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-04-10",
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
      "resourceId": "content:18b-t03-04-11",
      "definitionId": "content:18b-t03-04-11",
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
              "text": "校隊學生外出比賽前發現數學小考時間與集訓撞期，不確定缺考會怎麼算。",
              "speaker": null,
              "scene": "school:corridor",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我去比賽也不是不用讀書，課到底怎麼補？",
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
              "text": "先核對出賽通知與考試時間",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師確認時段衝突，未自行認定得以補考。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我去比賽也不是不用讀書，課到底怎麼補？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生向導師親述其疑問，其他人物未經接觸仍不知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "向教務及科任詢問公假與評量程序",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "權責單位接到詢問，正式安排尚待核定。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我去比賽也不是不用讀書，課到底怎麼補？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生向導師親述其疑問，其他人物未經接觸仍不知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "協助學生安排可先取得的課堂資訊",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生記下可補充的課堂資料，仍需科任協助。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我去比賽也不是不用讀書，課到底怎麼補？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生向導師親述其疑問，其他人物未經接觸仍不知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "練跑道與讀課本，兩邊都要有規則",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生知道可爭取合法安排，不必把比賽當逃課。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我去比賽也不是不用讀書，課到底怎麼補？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生向導師親述其疑問，其他人物未經接觸仍不知情。"
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
      "id": "content:18b-t03-04-11",
      "topicId": "T03-04",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-04-11",
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
      "resourceId": "content:18b-t03-04-12",
      "definitionId": "content:18b-t03-04-12",
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
              "text": "學生在辯論課連續挑戰老師的例子，語速越來越快，另一半同學卻覺得他在頂嘴。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我是在討論論點，不是要跟老師吵架。",
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
              "text": "先分辨問題內容和表達方式",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師釐清討論內容，未替學生否認可能造成的干擾。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我是在討論論點，不是要跟老師吵架。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生向導師親述其疑問，其他人物未經接觸仍不知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "與任課教師核對課堂辯論規則",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "課堂規範仍由任課教師說明，尚未形成共同理解。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我是在討論論點，不是要跟老師吵架。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生向導師親述其疑問，其他人物未經接觸仍不知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "陪學生練習先重述對方論點再提出異議",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生試練論證順序，能否改善互動待觀察。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我是在討論論點，不是要跟老師吵架。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生向導師親述其疑問，其他人物未經接觸仍不知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "敢質疑是好事，怎麼問也很重要",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生明白批判思考與尊重溝通可同時成立。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我是在討論論點，不是要跟老師吵架。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生向導師親述其疑問，其他人物未經接觸仍不知情。"
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
      "id": "content:18b-t03-04-12",
      "topicId": "T03-04",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-04-12",
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
      "resourceId": "content:18b-t03-04-13",
      "definitionId": "content:18b-t03-04-13",
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
              "text": "兩名學生都想代表學校參賽，卻只剩一個名額；班上開始猜老師會選成績較好的。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我們都準備很久了，不能只看誰跟老師比較熟吧。",
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
              "text": "核對選拔規則是否事先公告",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師確認評選依據待說明，未自行選出代表。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我們都準備很久了，不能只看誰跟老師比較熟吧。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生向導師提出當下需求，未經查證的第三者動機與程序結果不當作事實。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "請競賽承辦說明正式評選流程",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "承辦收到程序詢問，正式名單尚未定案。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我們都準備很久了，不能只看誰跟老師比較熟吧。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生向導師提出當下需求，未經查證的第三者動機與程序結果不當作事實。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "讓學生提出希望釐清的公平標準",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生提出對評選方式的問題，並未要求破例。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我們都準備很久了，不能只看誰跟老師比較熟吧。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生向導師提出當下需求，未經查證的第三者動機與程序結果不當作事實。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "兩個人都努力，不代表要把另一個當敵人",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生知道可關心公平，也能尊重對方努力。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我們都準備很久了，不能只看誰跟老師比較熟吧。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生向導師提出當下需求，未經查證的第三者動機與程序結果不當作事實。"
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
      "id": "content:18b-t03-04-13",
      "topicId": "T03-04",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-04-13",
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
      "resourceId": "content:18b-t03-04-14",
      "definitionId": "content:18b-t03-04-14",
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
              "text": "學生自主專題需要一部校內只有一台的攝影機，卻連續兩週借不到。",
              "speaker": null,
              "scene": "school:teachers-office",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我不是要求學校買新的，只想知道怎樣才能借。",
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
              "text": "核對器材借用流程與可用時段",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師了解設備不足的情況，未擅自取用器材。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我不是要求學校買新的，只想知道怎樣才能借。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生向導師提出當下需求，未經查證的第三者動機與程序結果不當作事實。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "向設備管理員詢問合法替代資源",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "管理員收到借用需求，尚未保證可安排。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我不是要求學校買新的，只想知道怎樣才能借。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生向導師提出當下需求，未經查證的第三者動機與程序結果不當作事實。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "協助調整專題拍攝的必要環節",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生調整拍攝清單，尚需確認作品是否可達目標。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我不是要求學校買新的，只想知道怎樣才能借。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生向導師提出當下需求，未經查證的第三者動機與程序結果不當作事實。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "研究被設備卡住，不代表題目不值得做",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生知道可以正當求助，沒有被要求放棄題目。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我不是要求學校買新的，只想知道怎樣才能借。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生向導師提出當下需求，未經查證的第三者動機與程序結果不當作事實。"
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
      "id": "content:18b-t03-04-14",
      "topicId": "T03-04",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-04-14",
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
      "resourceId": "content:18b-t03-04-15",
      "definitionId": "content:18b-t03-04-15",
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
              "text": "學生每次比賽都名列前茅，最近卻主動說晚上常想著下一場競賽而睡不好。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "大家都說我很厲害，可是我真的好累。",
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
              "text": "先聆聽學生描述當下的負荷與安全狀況",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生表達疲憊，導師未自行作出醫療診斷。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "大家都說我很厲害，可是我真的好累。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生向導師提出當下需求，未經查證的第三者動機與程序結果不當作事實。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "協助聯繫適當的校內支持資源",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師提出尋求支持的路徑，正式協助依當事人需求安排。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "大家都說我很厲害，可是我真的好累。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生向導師提出當下需求，未經查證的第三者動機與程序結果不當作事實。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "與學生討論近期可調整的非必要安排",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生列出希望暫緩的額外任務，尚未取消正式課程。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "大家都說我很厲害，可是我真的好累。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生向導師提出當下需求，未經查證的第三者動機與程序結果不當作事實。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "厲害不表示能一直撐著不休息",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生知道不用用成績換取休息的資格。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "大家都說我很厲害，可是我真的好累。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生向導師提出當下需求，未經查證的第三者動機與程序結果不當作事實。"
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
      "id": "content:18b-t03-04-15",
      "topicId": "T03-04",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-04-15",
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
      "resourceId": "content:18b-t03-04-16",
      "definitionId": "content:18b-t03-04-16",
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
              "text": "教師在課堂展示一份高分報告，其他學生說自己永遠做不到，報告作者也顯得不自在。",
              "speaker": null,
              "scene": "school:teachers-office",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我不想我的作品變成大家都要照著做的標準。",
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
              "text": "先釐清展示作品的學習目的",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師辨識比較造成的壓力，未認定科任惡意。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我不想我的作品變成大家都要照著做的標準。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生向導師提出當下需求，未經查證的第三者動機與程序結果不當作事實。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "與科任討論示範時保留不同做法",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "科任收到呈現方式建議，仍可依課程目標調整。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我不想我的作品變成大家都要照著做的標準。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生向導師提出當下需求，未經查證的第三者動機與程序結果不當作事實。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "徵詢作者對公開作品的意願",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "作者說明作品使用界線，尚未完成正式授權。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我不想我的作品變成大家都要照著做的標準。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生向導師提出當下需求，未經查證的第三者動機與程序結果不當作事實。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "作品值得肯定，但不該拿來壓全班",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "班級可學習尊重差異，而非把單一作品當唯一標準。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我不想我的作品變成大家都要照著做的標準。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生向導師提出當下需求，未經查證的第三者動機與程序結果不當作事實。"
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
      "id": "content:18b-t03-04-16",
      "topicId": "T03-04",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-04-16",
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
      "resourceId": "content:18b-t03-04-17",
      "definitionId": "content:18b-t03-04-17",
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
              "text": "學生自主研究同時使用數學與地理資料，兩科老師對評分重點說法不同。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我不知道要寫成數學報告還是地理報告。",
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
              "text": "核對原本公告的正式專題目標",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師確認公告與口頭說法差異，未替兩科決定分數。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我不知道要寫成數學報告還是地理報告。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生向導師提出當下需求，未經查證的第三者動機與程序結果不當作事實。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "請承辦協調兩科評量分工",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "承辦被請釐清標準，正式規準仍待確認。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我不知道要寫成數學報告還是地理報告。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生向導師提出當下需求，未經查證的第三者動機與程序結果不當作事實。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "協助學生整理研究的跨科問題",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生整理研究核心與兩科應用，尚未更改題目。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我不知道要寫成數學報告還是地理報告。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生向導師提出當下需求，未經查證的第三者動機與程序結果不當作事實。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "跨科研究是優點，規準也要講清楚",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生知道可詢問評量方式，不必放棄跨科方向。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我不知道要寫成數學報告還是地理報告。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生向導師提出當下需求，未經查證的第三者動機與程序結果不當作事實。"
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
      "id": "content:18b-t03-04-17",
      "topicId": "T03-04",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-04-17",
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
      "resourceId": "content:18b-t03-04-18",
      "definitionId": "content:18b-t03-04-18",
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
              "text": "學生拍的科學短片在網路爆紅，有人傳成他已拿到國際競賽金牌。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "影片是有人看啦，但我根本沒參加那個比賽。",
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
              "text": "查清流傳訊息與學生實際成果",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師分清人氣與獲獎事實，未把網路謠言列入學生紀錄。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "影片是有人看啦，但我根本沒參加那個比賽。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生向導師提出當下需求，未經查證的第三者動機與程序結果不當作事實。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "提醒同學轉傳前核對獎項來源",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "班級獲提醒勿亂傳，網路傳言是否停止仍待觀察。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "影片是有人看啦，但我根本沒參加那個比賽。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生向導師提出當下需求，未經查證的第三者動機與程序結果不當作事實。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "請學生自願說明作品真正的製作過程",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生願意分享創作方法，未承認不存在的獎項。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "影片是有人看啦，但我根本沒參加那個比賽。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生向導師提出當下需求，未經查證的第三者動機與程序結果不當作事實。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "受歡迎很棒，不用硬塞一塊不存在的獎牌",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生理解作品本身的價值不必靠虛構名次加持。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "影片是有人看啦，但我根本沒參加那個比賽。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生向導師提出當下需求，未經查證的第三者動機與程序結果不當作事實。"
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
      "id": "content:18b-t03-04-18",
      "topicId": "T03-04",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-04-18",
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
      "resourceId": "content:18b-t03-04-19",
      "definitionId": "content:18b-t03-04-19",
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
              "text": "學生已入選校隊卻說想停止競賽，擔心導師會立刻告訴教練自己沒毅力。",
              "speaker": null,
              "scene": "school:teachers-office",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我以前很喜歡，但現在每次練習都很痛苦。",
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
              "text": "先問清楚學生現在真正的意願",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生說明退出想法，導師不逕自認定可直接退隊。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我以前很喜歡，但現在每次練習都很痛苦。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生向導師提出當下需求，未經查證的第三者動機與程序結果不當作事實。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "協助查明退出或休息的正式程序",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "正式退出程序待確認，尚未替學生通知全部人。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我以前很喜歡，但現在每次練習都很痛苦。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生向導師提出當下需求，未經查證的第三者動機與程序結果不當作事實。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "與學生討論想如何向相關人員表達",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生整理想表達的原因，未被迫當下做最後決定。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我以前很喜歡，但現在每次練習都很痛苦。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生向導師提出當下需求，未經查證的第三者動機與程序結果不當作事實。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "改變選擇不表示以前的努力都白費",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生知道能重新評估參與意願，不必被羞辱。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我以前很喜歡，但現在每次練習都很痛苦。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生向導師提出當下需求，未經查證的第三者動機與程序結果不當作事實。"
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
      "id": "content:18b-t03-04-19",
      "topicId": "T03-04",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-04-19",
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
      "resourceId": "content:18b-t03-04-20",
      "definitionId": "content:18b-t03-04-20",
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
              "text": "學生數學推理遠超同齡，但閱讀長篇題目時卻常漏掉關鍵條件。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我能想出解法，偏偏常看錯題目。",
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
              "text": "區分推理強項與閱讀支持需求",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師了解兩種能力差異，沒有貼上單一標籤。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我能想出解法，偏偏常看錯題目。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生向導師提出當下需求，未經查證的第三者動機與程序結果不當作事實。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "與科任討論分層學習材料",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "科任獲得分層材料建議，尚未正式安排。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我能想出解法，偏偏常看錯題目。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生向導師提出當下需求，未經查證的第三者動機與程序結果不當作事實。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "請學生選一項想先強化的基礎技能",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生選定要練的讀題步驟，未被要求降低進階學習。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我能想出解法，偏偏常看錯題目。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生向導師提出當下需求，未經查證的第三者動機與程序結果不當作事實。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "強項和困難可以同時存在",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生知道不用在天才與笨蛋之間選一個身分。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我能想出解法，偏偏常看錯題目。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生向導師提出當下需求，未經查證的第三者動機與程序結果不當作事實。"
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
      "id": "content:18b-t03-04-20",
      "topicId": "T03-04",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-04-20",
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
      "resourceId": "content:18b-t03-04-21",
      "definitionId": "content:18b-t03-04-21",
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
              "text": "學生出賽的公假證明送達太晚，課務系統仍顯示當天有缺席紀錄。",
              "speaker": null,
              "scene": "school:teachers-office",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我真的有去比賽，不是偷跑出去。",
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
              "text": "先核對正式公假文件及日期",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師確認文件與出賽日期，未自行抹除缺席紀錄。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我真的有去比賽，不是偷跑出去。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生向導師提出當下需求，未經查證的第三者動機與程序結果不當作事實。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "向學務權責單位查詢紀錄更正流程",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學務單位收到查核需求，紀錄尚待正式更正。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我真的有去比賽，不是偷跑出去。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生向導師提出當下需求，未經查證的第三者動機與程序結果不當作事實。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "提醒學生保留出賽與通知資料",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生整理必要文件，未保證申請結果。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我真的有去比賽，不是偷跑出去。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生向導師提出當下需求，未經查證的第三者動機與程序結果不當作事實。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "公假要靠正式程序，不是比誰喊得大聲",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生知道可依法釐清，不必被先當成逃課。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我真的有去比賽，不是偷跑出去。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生向導師提出當下需求，未經查證的第三者動機與程序結果不當作事實。"
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
      "id": "content:18b-t03-04-21",
      "topicId": "T03-04",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-04-21",
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
      "resourceId": "content:18b-t03-04-22",
      "definitionId": "content:18b-t03-04-22",
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
              "text": "學生發現自己畫的圖被另一個社團貼在宣傳頁，沒有經過詢問也沒標註來源。",
              "speaker": null,
              "scene": "school:teachers-office",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "那張明明是我畫的，連一句問我都沒有。",
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
              "text": "先保存原作與公開頁面的可核對證據",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師協助整理證據，尚未判定著作權爭議結論。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "那張明明是我畫的，連一句問我都沒有。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生向導師提出當下需求，未經查證的第三者動機與程序結果不當作事實。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "聯繫社團指導者確認使用與授權",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "社團被請核對使用來源，未擅自要求全面刪頁。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "那張明明是我畫的，連一句問我都沒有。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生向導師提出當下需求，未經查證的第三者動機與程序結果不當作事實。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "協助學生表達希望的處理方式",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生說明授權界線，仍待對方回應。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "那張明明是我畫的，連一句問我都沒有。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生向導師提出當下需求，未經查證的第三者動機與程序結果不當作事實。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "作品被拿去用會生氣，先把事情查清楚",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生感受被支持，但是否蓄意使用仍需查證。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "那張明明是我畫的，連一句問我都沒有。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生向導師提出當下需求，未經查證的第三者動機與程序結果不當作事實。"
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
      "id": "content:18b-t03-04-22",
      "topicId": "T03-04",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-04-22",
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
      "resourceId": "content:18b-t03-04-23",
      "definitionId": "content:18b-t03-04-23",
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
              "text": "學生解題速度很快，講解時也常一下跳到答案，同組同學說根本跟不上。",
              "speaker": null,
              "scene": "school:corridor",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我不是要炫耀，只是覺得那個步驟很明顯。",
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
              "id": "inquire",
              "text": "先找出講解中跳過的推理步驟",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生理解同伴卡住的步驟，未判定誰比較用功。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我不是要炫耀，只是覺得那個步驟很明顯。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生向導師提出當下需求，未經查證的第三者動機與程序結果不當作事實。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "與科任討論同儕協作的適合方式",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "科任獲得分組合作建議，尚未指定學生當助教。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我不是要炫耀，只是覺得那個步驟很明顯。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生向導師提出當下需求，未經查證的第三者動機與程序結果不當作事實。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "請學生試用提問而非直接公布答案",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生試著用提示提問，效果仍須同伴回饋。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我不是要炫耀，只是覺得那個步驟很明顯。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生向導師提出當下需求，未經查證的第三者動機與程序結果不當作事實。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "懂得快也能學會怎麼讓別人懂",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生知道溝通不等於放慢自己的學習。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我不是要炫耀，只是覺得那個步驟很明顯。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生向導師提出當下需求，未經查證的第三者動機與程序結果不當作事實。"
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
      "id": "content:18b-t03-04-23",
      "topicId": "T03-04",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-04-23",
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
      "resourceId": "content:18b-t03-04-24",
      "definitionId": "content:18b-t03-04-24",
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
              "text": "學生即興演奏很出色，樂理筆試卻不理想，擔心老師因此否定他的音樂能力。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我會彈，但那些記號真的常搞混。",
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
              "text": "先區分演奏與樂理評量的學習目標",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生說明能力落差，導師不代科任評定成績。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我會彈，但那些記號真的常搞混。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生向導師提出當下需求，未經查證的第三者動機與程序結果不當作事實。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "與音樂科任討論樂理補強方向",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "科任收到學習需求，正式評量未改。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我會彈，但那些記號真的常搞混。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生向導師提出當下需求，未經查證的第三者動機與程序結果不當作事實。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "請學生挑一項能具體練習的符號",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生選定符號練習，尚需後續檢核。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我會彈，但那些記號真的常搞混。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生向導師提出當下需求，未經查證的第三者動機與程序結果不當作事實。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "演奏好和筆試好都是不同的本事",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生知道不必因一次筆試否定長期專長。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我會彈，但那些記號真的常搞混。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生向導師提出當下需求，未經查證的第三者動機與程序結果不當作事實。"
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
      "id": "content:18b-t03-04-24",
      "topicId": "T03-04",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-04-24",
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
      "resourceId": "content:18b-t03-04-25",
      "definitionId": "content:18b-t03-04-25",
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
              "text": "學生想將科展從模型改成實際操作，但新方案需要安全設備與正式審核。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我想做得更完整，怎麼突然說這個不能直接試？",
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
              "text": "先確認新方案需要哪些安全條件",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師記下實作需求，未允許擅自操作危險設備。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我想做得更完整，怎麼突然說這個不能直接試？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生向導師提出當下需求，未經查證的第三者動機與程序結果不當作事實。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "請指導老師與承辦查核正式審核要求",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "科展權責收到審查需求，尚未核准新方法。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我想做得更完整，怎麼突然說這個不能直接試？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生向導師提出當下需求，未經查證的第三者動機與程序結果不當作事實。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "與學生討論先用安全模型驗證的可能",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生提出先用模型驗證，正式研究方案仍待確認。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我想做得更完整，怎麼突然說這個不能直接試？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生向導師提出當下需求，未經查證的第三者動機與程序結果不當作事實。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "有創意很好，但安全不能靠賭",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生知道安全限制是研究責任的一部分。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我想做得更完整，怎麼突然說這個不能直接試？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生向導師提出當下需求，未經查證的第三者動機與程序結果不當作事實。"
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
      "id": "content:18b-t03-04-25",
      "topicId": "T03-04",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-04-25",
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
      "resourceId": "content:18b-t03-04-31",
      "definitionId": "content:18b-t03-04-31",
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
              "text": "第五節下課，學生拿來一張幾何題的手稿：課本從一條線出發，他卻畫了另一條輔助線，旁邊還寫了大大的問號。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "老師，我想走另一條路，但怕中間偷偷用到還沒證明的東西。",
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
              "text": "一起逐步核對哪一行需要補上理由",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生圈出尚未證明的關鍵等式，沒有把整份手稿當作已成立的證明。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "老師，我想走另一條路，但怕中間偷偷用到還沒證明的東西。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面向導師說明其作品與疑問，科任與同學尚未自動得知。"
                    }
                  ]
                }
              }
            },
            {
              "id": "refer",
              "text": "請學生先整理兩條想向數學科任請教的問題",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生整理兩條待核對的推理問題，尚未取得科任的正式評價。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "老師，我想走另一條路，但怕中間偷偷用到還沒證明的東西。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面向導師說明其作品與疑問，科任與同學尚未自動得知。"
                    }
                  ]
                }
              }
            },
            {
              "id": "demonstrate",
              "text": "讓學生用白板向你講清楚輔助線的用途",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生在白板上說明輔助線的用途，仍需核對後續推理。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "老師，我想走另一條路，但怕中間偷偷用到還沒證明的東西。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面向導師說明其作品與疑問，科任與同學尚未自動得知。"
                    }
                  ]
                }
              },
              "variants": [
                {
                  "id": "catches-gap",
                  "weight": 3,
                  "modifiers": [
                    {
                      "role": "participant",
                      "holder": "person",
                      "code": "3-2",
                      "influence": 0.45
                    }
                  ],
                  "outcome": {
                    "fact": "學生說明時自己發現一個原本遺漏的角度條件，立刻把它標在手稿上，笑說『原來這裡才是關鍵』；整題仍待完整證明。",
                    "claims": [
                      {
                        "role": "participant",
                        "statement": "老師，我想走另一條路，但怕中間偷偷用到還沒證明的東西。",
                        "belief": "believed",
                        "visible": false
                      }
                    ],
                    "changes": [
                      {
                        "role": "participant",
                        "holder": "person",
                        "code": "2-4",
                        "delta": 0.5
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
                          "description": "學生當面向導師說明其作品與疑問，科任與同學尚未自動得知。"
                        }
                      ]
                    }
                  }
                },
                {
                  "id": "still-working",
                  "weight": 2,
                  "modifiers": [
                    {
                      "role": "participant",
                      "holder": "person",
                      "code": "3-2",
                      "influence": -0.3
                    }
                  ],
                  "outcome": {
                    "fact": "學生把輔助線用途說清楚，卻還沒看出如何銜接下一步；導師請他保留問題，沒有直接宣布答案錯誤。",
                    "claims": [
                      {
                        "role": "participant",
                        "statement": "老師，我想走另一條路，但怕中間偷偷用到還沒證明的東西。",
                        "belief": "believed",
                        "visible": false
                      }
                    ],
                    "changes": [],
                    "historyCodes": [],
                    "next": {
                      "stage": null,
                      "afterDays": 0
                    },
                    "world": {
                      "subjects": [
                        "teacher",
                        "participant"
                      ],
                      "witnesses": [
                        "teacher",
                        "participant"
                      ],
                      "affected": [
                        "participant"
                      ],
                      "contacts": [
                        [
                          "teacher",
                          "participant"
                        ]
                      ],
                      "transmissions": [
                        {
                          "fromRole": "participant",
                          "toRole": "teacher",
                          "claimIndex": 0,
                          "description": "學生當面向導師說明其作品與疑問，科任與同學尚未自動得知。"
                        }
                      ]
                    }
                  }
                }
              ]
            },
            {
              "id": "encourage",
              "text": "想出別的路很棒，但每一步都要站得住腳",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生知道好奇與查證可以並存，不因暫時卡住否定自己的想法。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "老師，我想走另一條路，但怕中間偷偷用到還沒證明的東西。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面向導師說明其作品與疑問，科任與同學尚未自動得知。"
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
      "id": "content:18b-t03-04-31",
      "topicId": "T03-04",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-04-31",
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
      "resourceId": "content:18b-t03-04-32",
      "definitionId": "content:18b-t03-04-32",
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
              "text": "午餐後，學生在中庭用手機錄了一小段自己哼出的旋律，卻說想和朋友一起演奏時，連第一小節的拍子都寫不出來。",
              "speaker": null,
              "scene": "school:courtyard",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我知道它聽起來是什麼樣子，可是變成譜就像另一種語言。",
              "speaker": "participant",
              "scene": "school:courtyard",
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
              "text": "先聽學生自己打出的節拍，區分速度與拍點",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生拍出一段可重複的節奏，尚未把旋律完整記譜。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我知道它聽起來是什麼樣子，可是變成譜就像另一種語言。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面向導師說明其作品與疑問，科任與同學尚未自動得知。"
                    }
                  ]
                }
              }
            },
            {
              "id": "refer",
              "text": "先列出想向音樂科任請教的兩個記譜問題",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生列出要向音樂科任請教的兩個疑問，並未冒充已取得指導。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我知道它聽起來是什麼樣子，可是變成譜就像另一種語言。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面向導師說明其作品與疑問，科任與同學尚未自動得知。"
                    }
                  ]
                }
              }
            },
            {
              "id": "demonstrate",
              "text": "陪學生把錄音切成短段，再選一段嘗試寫下節奏",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生選定錄音開頭幾秒為練習範圍，並未擅自使用他人作品。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我知道它聽起來是什麼樣子，可是變成譜就像另一種語言。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面向導師說明其作品與疑問，科任與同學尚未自動得知。"
                    }
                  ]
                }
              }
            },
            {
              "id": "encourage",
              "text": "先能唱出來已經很珍貴，譜可以慢慢學",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生握著自己原創的錄音微笑，願意先從短段落開始；不代表記譜困難已解決。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我知道它聽起來是什麼樣子，可是變成譜就像另一種語言。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [
                  {
                    "role": "participant",
                    "holder": "person",
                    "code": "2-4",
                    "delta": 0.5
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
                      "description": "學生當面向導師說明其作品與疑問，科任與同學尚未自動得知。"
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
      "id": "content:18b-t03-04-32",
      "topicId": "T03-04",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-04-32",
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
