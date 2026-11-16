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
              "text": "一名數學特別好的學生，國文報告卻不順利，班上有人酸他只會算題目。",
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
  }
];
