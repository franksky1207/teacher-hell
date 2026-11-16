// Generated isolated T03 authoring records. Not a production catalogue.
// Source: work/18b-t03-07-authoring.json. Regenerate via scripts/sync-t03-drafts.mjs.
export default [
  {
    "story": {
      "resourceId": "content:18b-t03-07-01",
      "definitionId": "content:18b-t03-07-01",
      "version": "1",
      "topicId": "T03-07",
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
              "text": "學生報到資料上的名字拼法與自己平常使用的不同，同學開始詢問是不是填錯身分。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "證件上是那樣，但我一直都用這個名字。",
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
              "text": "先確認學生希望被如何稱呼",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生說明希望的稱呼，導師未擅改正式資料。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "證件上是那樣，但我一直都用這個名字。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生與導師私下反映，未自動告知其他人物。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "請註冊單位核對正式學籍記載",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師向註冊單位詢問，學籍資料仍待確認。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "證件上是那樣，但我一直都用這個名字。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生與導師私下反映，未自動告知其他人物。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "提醒班級尊重學生選擇的稱呼",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "班級獲提醒尊重稱呼，不需公開當事人證件。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "證件上是那樣，但我一直都用這個名字。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生與導師私下反映，未自動告知其他人物。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "名字不是讓全班推理身分的謎題",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生知道可以釐清姓名資訊，不必接受隨意暱稱。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "證件上是那樣，但我一直都用這個名字。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生與導師私下反映，未自動告知其他人物。"
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
      "id": "content:18b-t03-07-01",
      "topicId": "T03-07",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-07-01",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "4-4",
        "3-1",
        "6-2"
      ],
      "additionalCodes": [
        "1-3",
        "2-2",
        "3-2"
      ],
      "weights": [
        0.22,
        0.21,
        0.19,
        0.15,
        0.13,
        0.1
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
        "reason": "依學生資格與正式時段規則處理"
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
      "resourceId": "content:18b-t03-07-02",
      "definitionId": "content:18b-t03-07-02",
      "version": "1",
      "topicId": "T03-07",
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
              "text": "同學在課間說了個流行雙關語，全班笑成一片，一位學生沒反應卻被批評不合群。",
              "speaker": null,
              "scene": "school:corridor",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我沒有討厭他們，是真的沒聽懂。",
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
              "text": "先了解學生不知道的是哪個用語",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生指出不熟悉的語句，導師不猜測其文化背景。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我沒有討厭他們，是真的沒聽懂。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生與導師私下反映，未自動告知其他人物。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "提醒同學不該用笑不笑判斷態度",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師提醒尊重差異，未斷言同學蓄意排擠。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我沒有討厭他們，是真的沒聽懂。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生與導師私下反映，未自動告知其他人物。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "詢問學生是否希望有人說明語境",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生可自願詢問用語意思，不被強迫交朋友。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我沒有討厭他們，是真的沒聽懂。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生與導師私下反映，未自動告知其他人物。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "不是每個笑話都要立刻懂才算朋友",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生知道融入班級不必假裝所有笑點都好笑。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我沒有討厭他們，是真的沒聽懂。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生與導師私下反映，未自動告知其他人物。"
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
      "id": "content:18b-t03-07-02",
      "topicId": "T03-07",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-07-02",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "4-4",
        "3-1",
        "6-2"
      ],
      "additionalCodes": [
        "1-3",
        "2-2",
        "3-2"
      ],
      "weights": [
        0.22,
        0.21,
        0.19,
        0.15,
        0.13,
        0.1
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
        "reason": "依學生資格與正式時段規則處理"
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
      "resourceId": "content:18b-t03-07-03",
      "definitionId": "content:18b-t03-07-03",
      "version": "1",
      "topicId": "T03-07",
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
              "text": "午餐時學生帶了自備餐盒，同學輪流追問他為何不吃學校便當，甚至猜測家庭背景。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我只是想吃這個，不想每天解釋理由。",
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
              "text": "先確認是否有需要學校協助的用餐事項",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生表達用餐偏好，導師未推定宗教或身分原因。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我只是想吃這個，不想每天解釋理由。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生與導師私下反映，未自動告知其他人物。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "提醒同學尊重私人飲食選擇",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師提醒同學不要追問私人理由，後續仍需觀察。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我只是想吃這個，不想每天解釋理由。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生與導師私下反映，未自動告知其他人物。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "確認自備餐食的正式校內規範",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "導師詢問校內規範，沒有擅自豁免任何要求。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我只是想吃這個，不想每天解釋理由。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生與導師私下反映，未自動告知其他人物。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "吃飯不應該附送身家調查",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生感受到尊重，不需代表任何文化群體說話。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我只是想吃這個，不想每天解釋理由。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生與導師私下反映，未自動告知其他人物。"
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
      "id": "content:18b-t03-07-03",
      "topicId": "T03-07",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-07-03",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "4-4",
        "3-1",
        "6-2"
      ],
      "additionalCodes": [
        "1-3",
        "2-2",
        "3-2"
      ],
      "weights": [
        0.22,
        0.21,
        0.19,
        0.15,
        0.13,
        0.1
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
          "lunch"
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
        "reason": "依學生資格與正式時段規則處理"
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
