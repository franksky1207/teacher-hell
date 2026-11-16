// Generated isolated T03 authoring records. Not a production catalogue.
// Source: work/18b-t03-06-authoring.json. Regenerate via scripts/sync-t03-drafts.mjs.
export default [
  {
    "story": {
      "resourceId": "content:18b-t03-06-01",
      "definitionId": "content:18b-t03-06-01",
      "version": "1",
      "topicId": "T03-06",
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
              "text": "學生缺課數週後回到教室，桌上已堆了十份不同科目的講義，紙張幾乎遮住課本。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "每科都說先補，可是我連第一份要拿哪張都不知道。",
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
              "id": "inquire",
              "text": "先確認每科最迫切的學習需求",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生指出最擔憂的科目，尚未完成任何補課。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "每科都說先補，可是我連第一份要拿哪張都不知道。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生與導師間的私下溝通，不自動告知未參與者。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "向任課老師核對正式作業與補課優先順序",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師向科任詢問正式銜接順序，未自行免除作業。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "每科都說先補，可是我連第一份要拿哪張都不知道。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生與導師間的私下溝通，不自動告知未參與者。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "把今日及本週的工作分兩張清單",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生完成分段清單，正式期限仍須向科任核對。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "每科都說先補，可是我連第一份要拿哪張都不知道。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生與導師間的私下溝通，不自動告知未參與者。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "回來第一天不用把十份講義都吞下去",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生知道可循序處理，返校不等於所有課程已追平。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "每科都說先補，可是我連第一份要拿哪張都不知道。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生與導師間的私下溝通，不自動告知未參與者。"
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
      "id": "content:18b-t03-06-01",
      "topicId": "T03-06",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-06-01",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "4-3",
        "3-2",
        "2-2"
      ],
      "additionalCodes": [
        "3-1",
        "4-4",
        "2-4"
      ],
      "weights": [
        0.22,
        0.19,
        0.26,
        0.13,
        0.12,
        0.08
      ],
      "directions": [
        -1,
        -1,
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
        "cooldownDays": 45,
        "exclusionGroups": [],
        "sameFact": true,
        "reason": "返校情境依正式世界學籍與時段資格確認；此稿尚未完成資格審查"
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
      "resourceId": "content:18b-t03-06-02",
      "definitionId": "content:18b-t03-06-02",
      "version": "1",
      "topicId": "T03-06",
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
              "text": "一名缺課很久的學生終於返校，走廊開始有人猜他曾經住院，還有人傳出不同版本的私人細節。",
              "speaker": null,
              "scene": "school:corridor",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我想回來正常上課，不想一整天回答我去哪裡。",
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
              "id": "inquire",
              "text": "先確認學生本人希望公開的資訊界線",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生說明自己不願公開缺課原因，導師尊重其意願。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我想回來正常上課，不想一整天回答我去哪裡。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生與導師間的私下溝通，不自動告知未參與者。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "提醒同學停止傳述未經證實的私事",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師提醒停止猜測，傳言是否已停仍待觀察。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我想回來正常上課，不想一整天回答我去哪裡。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生與導師間的私下溝通，不自動告知未參與者。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "協助學生準備不透露隱私的回應",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生選擇簡短回應，並未向班級公布私人資料。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我想回來正常上課，不想一整天回答我去哪裡。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生與導師間的私下溝通，不自動告知未參與者。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "回來上課不需要先開記者會",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生理解可以設定界線，未被要求替流言辯白。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我想回來正常上課，不想一整天回答我去哪裡。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生與導師間的私下溝通，不自動告知未參與者。"
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
      "id": "content:18b-t03-06-02",
      "topicId": "T03-06",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-06-02",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "4-3",
        "3-2",
        "2-2"
      ],
      "additionalCodes": [
        "3-1",
        "4-4",
        "2-4"
      ],
      "weights": [
        0.22,
        0.19,
        0.26,
        0.13,
        0.12,
        0.08
      ],
      "directions": [
        -1,
        -1,
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
        "cooldownDays": 45,
        "exclusionGroups": [],
        "sameFact": true,
        "reason": "返校情境依正式世界學籍與時段資格確認；此稿尚未完成資格審查"
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
      "resourceId": "content:18b-t03-06-03",
      "definitionId": "content:18b-t03-06-03",
      "version": "1",
      "topicId": "T03-06",
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
              "text": "學生把補考公告拿給你看，說公布的考試時間與已安排好的復健撞期。",
              "speaker": null,
              "scene": "school:teachers-office",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我想補考，可是那個時間真的沒辦法改。",
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
              "id": "inquire",
              "text": "先確認正式補考日期與時間限制",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師了解時間衝突，未要求揭露不必要醫療細節。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我想補考，可是那個時間真的沒辦法改。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生與導師間的私下溝通，不自動告知未參與者。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "向教務詢問合法改期程序及所需資料",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師詢問教務程序，未擅自核准補考改期。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我想補考，可是那個時間真的沒辦法改。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生與導師間的私下溝通，不自動告知未參與者。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "協助列出可參加的其他時段",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生整理可行時段，仍待相關單位審核。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我想補考，可是那個時間真的沒辦法改。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生與導師間的私下溝通，不自動告知未參與者。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "你是想考，不是要躲考試，先查程序",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生知道可以提出正式需求，不必私下尋求題目。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我想補考，可是那個時間真的沒辦法改。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生與導師間的私下溝通，不自動告知未參與者。"
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
      "id": "content:18b-t03-06-03",
      "topicId": "T03-06",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-06-03",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "4-3",
        "3-2",
        "2-2"
      ],
      "additionalCodes": [
        "3-1",
        "4-4",
        "2-4"
      ],
      "weights": [
        0.22,
        0.19,
        0.26,
        0.13,
        0.12,
        0.08
      ],
      "directions": [
        -1,
        -1,
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
        "cooldownDays": 45,
        "exclusionGroups": [],
        "sameFact": true,
        "reason": "返校情境依正式世界學籍與時段資格確認；此稿尚未完成資格審查"
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
