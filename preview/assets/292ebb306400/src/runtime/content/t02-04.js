// Generated isolated T02 authoring records. Never a production catalogue.
// Source of truth: work/18b-t02-04-authoring.json. Run scripts/sync-t02-drafts.mjs.
export default [
  {
    "story": {
      "resourceId": "content:18b-t02-04-01",
      "definitionId": "content:18b-t02-04-01",
      "version": "1",
      "topicId": "T02-04",
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
              "text": "兩名學生的排名截圖顯示相同總分，列出的先後順序卻不同。",
              "speaker": null,
              "scene": "school:teachers-office",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "都一樣分，怎麼我在下面？是不是有人幫他改？",
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
              "text": "先查公告所使用的正式排序依據",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生知道需要核對同分比序規則，未因此認定有人違規。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "都一樣分，怎麼我在下面？是不是有人幫他改？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師當下感受；他人未自動得知。"
                    }
                  ]
                }
              }
            },
            {
              "id": "act",
              "text": "協助保留完整公告與版本時間",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生保存可查核的資料，沒有散播未查證指控。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "都一樣分，怎麼我在下面？是不是有人幫他改？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師當下感受；他人未自動得知。"
                    }
                  ]
                }
              }
            },
            {
              "id": "refer",
              "text": "引導向有權責的教務窗口提出疑問",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生寫下具體疑點，排名尚未由導師重算。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "都一樣分，怎麼我在下面？是不是有人幫他改？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師當下感受；他人未自動得知。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "看見這種差異很難不在意",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "導師理解不安，並未把懷疑當成既定事實。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "都一樣分，怎麼我在下面？是不是有人幫他改？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師當下感受；他人未自動得知。"
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
      "id": "content:18b-t02-04-01",
      "topicId": "T02-04",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t02-04-01",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "1-4",
        "2-2",
        "8-3"
      ],
      "additionalCodes": [
        "3-1",
        "4-4",
        "2-4"
      ],
      "weights": [
        0.25,
        0.24,
        0.16,
        0.12,
        0.12,
        0.11
      ],
      "directions": [
        1,
        1,
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
          "noon"
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
        "reason": "同一學生獨立情境；每次仍須符合時段、學籍與接觸資格"
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
      "resourceId": "content:18b-t02-04-03",
      "definitionId": "content:18b-t02-04-03",
      "version": "1",
      "topicId": "T02-04",
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
              "text": "學生把群組裡只截到前三名的排名圖片遞給導師，留言已吵成一片。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "大家都說這張是全校排名，可是好像沒有寫清楚。",
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
              "text": "確認截圖是否有年份、範圍與來源",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生發現缺少統計母體資訊，停止把截圖當完整公告。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "大家都說這張是全校排名，可是好像沒有寫清楚。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師當下感受；他人未自動得知。"
                    }
                  ]
                }
              }
            },
            {
              "id": "act",
              "text": "請學生先不要轉傳他人的個別資料",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生知道個人名次涉及隱私，未因此推定消息真偽。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "大家都說這張是全校排名，可是好像沒有寫清楚。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師當下感受；他人未自動得知。"
                    }
                  ]
                }
              }
            },
            {
              "id": "refer",
              "text": "提供正式公告的查核方式",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生獲得可自行查詢的管道，尚未取得他人資料。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "大家都說這張是全校排名，可是好像沒有寫清楚。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師當下感受；他人未自動得知。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "難怪這張圖會讓大家亂猜",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "導師承認訊息不完整帶來焦慮，沒有參與評價個別學生。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "大家都說這張是全校排名，可是好像沒有寫清楚。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師當下感受；他人未自動得知。"
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
      "id": "content:18b-t02-04-03",
      "topicId": "T02-04",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t02-04-03",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "1-4",
        "2-2",
        "8-3"
      ],
      "additionalCodes": [
        "3-1",
        "4-2",
        "7-1"
      ],
      "weights": [
        0.2,
        0.26,
        0.19,
        0.14,
        0.11,
        0.1
      ],
      "directions": [
        1,
        1,
        1,
        1,
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
        "reason": "同一學生獨立情境；每次仍須符合時段、學籍與接觸資格"
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
      "valence": "negative"
    }
  },
  {
    "story": {
      "resourceId": "content:18b-t02-04-12",
      "definitionId": "content:18b-t02-04-12",
      "version": "1",
      "topicId": "T02-04",
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
              "text": "高一學生聽完學長姐分享，認為只要拿到校內第一名就能直接進大學。",
              "speaker": null,
              "scene": "school:courtyard",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "所以我只要第一名，後面都不用準備了吧？",
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
              "text": "先問他聽到的是哪個入學管道",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生分辨校內推薦與正式錄取是兩個不同階段。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "所以我只要第一名，後面都不用準備了吧？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師當下感受；他人未自動得知。"
                    }
                  ]
                }
              }
            },
            {
              "id": "act",
              "text": "帶他看當年度官方簡章的資格說明",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生知道仍有其他規定，並非導師保證未來入學。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "所以我只要第一名，後面都不用準備了吧？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師當下感受；他人未自動得知。"
                    }
                  ]
                }
              }
            },
            {
              "id": "refer",
              "text": "請他把真正感興趣的校系列出",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生開始思考適性，而不只把名次當目標。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "所以我只要第一名，後面都不用準備了吧？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師當下感受；他人未自動得知。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "第一名很不簡單，但人生不是只看名次",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "導師肯定努力，沒有強化錯誤的保送想像。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "所以我只要第一名，後面都不用準備了吧？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師當下感受；他人未自動得知。"
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
      "id": "content:18b-t02-04-12",
      "topicId": "T02-04",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t02-04-12",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "1-4",
        "2-2",
        "8-3"
      ],
      "additionalCodes": [
        "3-2",
        "4-3",
        "2-4"
      ],
      "weights": [
        0.18,
        0.13,
        0.26,
        0.16,
        0.14,
        0.13
      ],
      "directions": [
        1,
        -1,
        1,
        -1,
        1,
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
          "noon"
        ],
        "from": null,
        "until": null,
        "facts": [],
        "history": [],
        "numeric": [],
        "enrollment": null,
        "grades": [
          1
        ]
      },
      "repetition": {
        "cooldownDays": 45,
        "exclusionGroups": [],
        "sameFact": true,
        "reason": "同一學生獨立情境；每次仍須符合時段、學籍與接觸資格"
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
      "valence": "negative"
    }
  },
  {
    "story": {
      "resourceId": "content:18b-t02-04-25",
      "definitionId": "content:18b-t02-04-25",
      "version": "1",
      "topicId": "T02-04",
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
              "text": "學生原本在校內推薦順位前段，卻說自己不想選大家看好的熱門科系。",
              "speaker": null,
              "scene": "school:counselling-corner",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "明明分數可以去，結果我想選的比較冷門，會不會很浪費？",
              "speaker": "participant",
              "scene": "school:counselling-corner",
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
              "text": "先聽他說喜歡該領域的具體原因",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生說出一項願意長期投入的學習活動，選擇尚未定案。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "明明分數可以去，結果我想選的比較冷門，會不會很浪費？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師當下感受；他人未自動得知。"
                    }
                  ]
                }
              }
            },
            {
              "id": "act",
              "text": "比較不同校系課程而非只看排名",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生找到兩門差異明顯的必修課程，未被承諾錄取。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "明明分數可以去，結果我想選的比較冷門，會不會很浪費？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師當下感受；他人未自動得知。"
                    }
                  ]
                }
              }
            },
            {
              "id": "refer",
              "text": "討論與家長溝通時需要哪些資料",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生整理課程與生活規劃，尚未替家長作出同意。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "明明分數可以去，結果我想選的比較冷門，會不會很浪費？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師當下感受；他人未自動得知。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "你有權認真想自己要過什麼生活",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "導師承認學生的自主選擇，不把熱門科系當唯一成功。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "明明分數可以去，結果我想選的比較冷門，會不會很浪費？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師當下感受；他人未自動得知。"
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
      "id": "content:18b-t02-04-25",
      "topicId": "T02-04",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t02-04-25",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "1-4",
        "2-2",
        "8-3"
      ],
      "additionalCodes": [
        "3-1",
        "4-4",
        "2-4"
      ],
      "weights": [
        0.17,
        0.17,
        0.11,
        0.19,
        0.18,
        0.18
      ],
      "directions": [
        1,
        1,
        -1,
        1,
        1,
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
          "noon"
        ],
        "from": null,
        "until": null,
        "facts": [],
        "history": [],
        "numeric": [],
        "enrollment": null,
        "grades": [
          3
        ]
      },
      "repetition": {
        "cooldownDays": 45,
        "exclusionGroups": [],
        "sameFact": true,
        "reason": "同一學生獨立情境；每次仍須符合時段、學籍與接觸資格"
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
      "resourceId": "content:18b-t02-04-15",
      "definitionId": "content:18b-t02-04-15",
      "version": "1",
      "topicId": "T02-04",
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
              "text": "一名科任教師在行政辦公室請導師提供學生的實際學習紀錄，旁邊放著尚未定案的推薦作業文件。",
              "speaker": null,
              "scene": "school:administration",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "這名學生的小組合作，你實際觀察過哪些部分？",
              "speaker": "participant",
              "scene": "school:administration",
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
              "text": "只提供自己確實見證的班級表現",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師整理可追溯的觀察，不把傳聞或好惡當成評分事實。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "這名學生的小組合作，你實際觀察過哪些部分？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "角色以本次實際對話或訊息向導師表達看法，沒有傳給未在場者。"
                    }
                  ]
                }
              }
            },
            {
              "id": "action",
              "text": "請科任說明需要的是何種具體資料",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "雙方確認所需資料範圍，推薦順位仍由正式校內程序處理。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "這名學生的小組合作，你實際觀察過哪些部分？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "角色以本次實際對話或訊息向導師表達看法，沒有傳給未在場者。"
                    }
                  ]
                }
              }
            },
            {
              "id": "alternative",
              "text": "先釐清資料使用範圍與收件方式",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "導師要求確認適當紀錄程序，未直接散布個別學生資料。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "這名學生的小組合作，你實際觀察過哪些部分？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "角色以本次實際對話或訊息向導師表達看法，沒有傳給未在場者。"
                    }
                  ]
                }
              }
            },
            {
              "id": "care",
              "text": "孩子的努力值得被看見，也得公平對待",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "導師表達公平原則，不以私下稱讚代替推薦委員會決議。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "這名學生的小組合作，你實際觀察過哪些部分？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "角色以本次實際對話或訊息向導師表達看法，沒有傳給未在場者。"
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
      "id": "content:18b-t02-04-15",
      "topicId": "T02-04",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t02-04-15",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "1-4",
        "2-2",
        "8-3"
      ],
      "additionalCodes": [
        "3-1",
        "4-3",
        "7-1"
      ],
      "weights": [
        0.23,
        0.2,
        0.18,
        0.16,
        0.13,
        0.1
      ],
      "directions": [
        1,
        1,
        1,
        1,
        1,
        1
      ],
      "eligibility": {
        "people": [
          "staff"
        ],
        "dayKinds": [
          "school"
        ],
        "slotIds": [
          "noon"
        ],
        "from": null,
        "until": null,
        "facts": [],
        "history": [],
        "numeric": [],
        "enrollment": null,
        "grades": [
          3
        ]
      },
      "repetition": {
        "cooldownDays": 45,
        "exclusionGroups": [],
        "sameFact": true,
        "reason": "這是個別一次性的情境；需按人物學籍、情境時段與既有接觸條件抽選"
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
      "resourceId": "content:18b-t02-04-02",
      "definitionId": "content:18b-t02-04-02",
      "version": "1",
      "topicId": "T02-04",
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
              "text": "升學說明會一散場，學生發現最新簡報提到的校內推薦名額比先前班群通知少了一個。",
              "speaker": null,
              "scene": "school:auditorium",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "這樣是不是有人被偷偷拿掉了？",
              "speaker": "participant",
              "scene": "school:auditorium",
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
              "text": "先查明兩份資訊發布的日期與適用範圍",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生辨認出簡報和通知版本不同，尚未證實名額實際減少。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "這樣是不是有人被偷偷拿掉了？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "本次由當事人向導師傳達自己的感受；其他人不自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "act",
              "text": "協助向正式承辦窗口確認名額來源",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生整理詢問內容，學校尚未提出書面說明。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "這樣是不是有人被偷偷拿掉了？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "本次由當事人向導師傳達自己的感受；其他人不自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "alternative",
              "text": "提醒先保留兩版公告再提出具體疑問",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生保存可供比對的資料，未散播有人暗箱操作的說法。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "這樣是不是有人被偷偷拿掉了？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "本次由當事人向導師傳達自己的感受；其他人不自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "名額一變就會緊張，但先核實再判斷",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "導師理解不安，不以學生猜測認定程序違失。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "這樣是不是有人被偷偷拿掉了？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "本次由當事人向導師傳達自己的感受；其他人不自動知情。"
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
      "id": "content:18b-t02-04-02",
      "topicId": "T02-04",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t02-04-02",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "1-4",
        "2-2",
        "8-3"
      ],
      "additionalCodes": [
        "3-1",
        "4-4",
        "2-4"
      ],
      "weights": [
        0.18181818181818182,
        0.36363636363636365,
        0.2727272727272727,
        0.09090909090909091,
        0,
        0.09090909090909091
      ],
      "directions": [
        1,
        1,
        1,
        1,
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
          "noon"
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
        "reason": "同一學生獨立情境；每次仍須符合時段、學籍與接觸資格"
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
      "resourceId": "content:18b-t02-04-07",
      "definitionId": "content:18b-t02-04-07",
      "version": "1",
      "topicId": "T02-04",
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
              "text": "午休在輔導室，轉學生攤開先前學校的成績資料，問為何系統只顯示部分學期排名。",
              "speaker": null,
              "scene": "school:counseling",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我以前也有認真讀，這些成績會不會直接不算？",
              "speaker": "participant",
              "scene": "school:counseling",
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
              "text": "先確認學生目前持有的正式成績文件",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生找出成績來源，尚未判定哪些學期符合校內排序規則。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我以前也有認真讀，這些成績會不會直接不算？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "本次由當事人向導師傳達自己的感受；其他人不自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "act",
              "text": "轉介教務處依適用年度規定說明",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生知道可以請承辦單位核算，導師未自行重算排名。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我以前也有認真讀，這些成績會不會直接不算？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "本次由當事人向導師傳達自己的感受；其他人不自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "alternative",
              "text": "陪他列出不同學校課程與學期差異",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生整理資料缺口，尚未替前校證明文件作結論。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我以前也有認真讀，這些成績會不會直接不算？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "本次由當事人向導師傳達自己的感受；其他人不自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "換學校已經很不容易，又要擔心過去努力被忽略",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "導師理解失落，未保證每項成績都可直接採計。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我以前也有認真讀，這些成績會不會直接不算？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "本次由當事人向導師傳達自己的感受；其他人不自動知情。"
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
      "id": "content:18b-t02-04-07",
      "topicId": "T02-04",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t02-04-07",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "1-4",
        "2-2",
        "8-3"
      ],
      "additionalCodes": [
        "3-1",
        "4-4",
        "2-4"
      ],
      "weights": [
        0.2222222222222222,
        0.4444444444444444,
        0,
        0.2222222222222222,
        0,
        0.1111111111111111
      ],
      "directions": [
        1,
        1,
        1,
        1,
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
          "noon"
        ],
        "from": null,
        "until": null,
        "facts": [],
        "history": [],
        "numeric": [],
        "enrollment": null,
        "grades": [
          2,
          3
        ]
      },
      "repetition": {
        "cooldownDays": 45,
        "exclusionGroups": [],
        "sameFact": true,
        "reason": "同一學生獨立情境；每次仍須符合時段、學籍與接觸資格"
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
      "resourceId": "content:18b-t02-04-04",
      "definitionId": "content:18b-t02-04-04",
      "version": "1",
      "topicId": "T02-04",
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
              "text": "高三早自習，學生把自己的各科成績乘上相同權重，算出的學期平均卻與正式成績單不同，擔心校內推薦比序也跟著算錯。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我每科都除一樣的數，為什麼平均不一樣？推薦的成績是不是也算錯了？",
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
              "text": "先核對各科學分與成績單的計算欄位",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生發現自己的試算未依正式欄位加權，尚不能據此宣稱學校算錯。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我每科都除一樣的數，為什麼平均不一樣？推薦的成績是不是也算錯了？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "當事人直接向導師說明本次情況；導師僅知悉其陳述與本次處理。"
                    }
                  ]
                }
              }
            },
            {
              "id": "check",
              "text": "區分學期平均與推薦比序使用的資料",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生列出兩種計算需查的規定，不再把自己的單一平均直接當推薦順位。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我每科都除一樣的數，為什麼平均不一樣？推薦的成績是不是也算錯了？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "當事人直接向導師說明本次情況；導師僅知悉其陳述與本次處理。"
                    }
                  ]
                }
              }
            },
            {
              "id": "choice",
              "text": "整理具體差額向教務窗口查詢",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生準備提交可重現的計算式與原始成績，尚未造成任何人的順位變更。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我每科都除一樣的數，為什麼平均不一樣？推薦的成績是不是也算錯了？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "當事人直接向導師說明本次情況；導師僅知悉其陳述與本次處理。"
                    }
                  ]
                }
              }
            },
            {
              "id": "care",
              "text": "看到數字對不上，先擔心很正常",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "導師回應不安，將問題留在可核對的計算差異，不討論其他學生的私人名次。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我每科都除一樣的數，為什麼平均不一樣？推薦的成績是不是也算錯了？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "當事人直接向導師說明本次情況；導師僅知悉其陳述與本次處理。"
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
      "id": "content:18b-t02-04-04",
      "topicId": "T02-04",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t02-04-04",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "1-4",
        "2-2",
        "8-3"
      ],
      "additionalCodes": [
        "3-1",
        "4-4",
        "2-4"
      ],
      "weights": [
        0.08333333333333333,
        0.25,
        0.4166666666666667,
        0.08333333333333333,
        0.16666666666666666,
        0
      ],
      "directions": [
        1,
        1,
        1,
        1,
        1,
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
          "early"
        ],
        "from": null,
        "until": null,
        "facts": [],
        "history": [],
        "numeric": [],
        "enrollment": null,
        "grades": [
          3
        ],
        "entrance": [
          {
            "kind": "gsat-published"
          }
        ]
      },
      "repetition": {
        "cooldownDays": 45,
        "exclusionGroups": [],
        "sameFact": true,
        "reason": "同一學生獨立情境；每次仍須符合時段、學籍與接觸資格"
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
      "resourceId": "content:18b-t02-04-05",
      "definitionId": "content:18b-t02-04-05",
      "version": "1",
      "topicId": "T02-04",
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
              "text": "午休，行政辦公室。學生擔心個人排名遭他人任意查閱。",
              "speaker": null,
              "scene": "school:administration",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我的名次是不是誰想看就看得到？",
              "speaker": "participant",
              "scene": "school:administration",
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
              "text": "確認名次的公布範圍",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生確認目前看到的是個人查詢畫面，尚無證據顯示所有同學都能查閱。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我的名次是不是誰想看就看得到？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "本次由學生直接向導師表達個人的看法，未讓第三人自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "check",
              "text": "詢問合法使用權限",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生整理詢問資料權限的問題，由權責單位說明可接觸者範圍。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我的名次是不是誰想看就看得到？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "本次由學生直接向導師表達個人的看法，未讓第三人自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "choice",
              "text": "協助表達隱私疑慮",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生說出自己不想公開班排的理由，尚未替其他同學表態。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我的名次是不是誰想看就看得到？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "本次由學生直接向導師表達個人的看法，未讓第三人自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "care",
              "text": "尊重不想被比較",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生知道不願被比較是合理感受，沒有因此要求公布別人的名次。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我的名次是不是誰想看就看得到？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "本次由學生直接向導師表達個人的看法，未讓第三人自動知情。"
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
      "id": "content:18b-t02-04-05",
      "topicId": "T02-04",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t02-04-05",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "1-4",
        "2-2",
        "8-3"
      ],
      "additionalCodes": [
        "3-1",
        "4-4",
        "2-4"
      ],
      "weights": [
        0.3333333333333333,
        0.4444444444444444,
        0,
        0.1111111111111111,
        0,
        0.1111111111111111
      ],
      "directions": [
        1,
        1,
        1,
        1,
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
          "noon"
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
        "reason": "同一學生獨立情境；每次仍須符合時段、學籍與接觸資格"
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
      "resourceId": "content:18b-t02-04-06",
      "definitionId": "content:18b-t02-04-06",
      "version": "1",
      "topicId": "T02-04",
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
              "text": "升學說明後，走廊。學生忽然發現校內規則可能納入較早學期成績。",
              "speaker": null,
              "scene": "school:corridor",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我高一考那麼差，現在還會被算進來嗎？",
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
              "id": "clarify",
              "text": "核對採計期間",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生翻出當年度的校內採計說明，發現不能用學長姐的算法直接套算。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我高一考那麼差，現在還會被算進來嗎？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "本次由學生直接向導師表達個人的看法，未讓第三人自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "check",
              "text": "比對校內排序辦法",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生標出可能涉及高一成績的學期欄位，仍等待正式規則確認。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我高一考那麼差，現在還會被算進來嗎？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "本次由學生直接向導師表達個人的看法，未讓第三人自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "choice",
              "text": "整理向教務處確認的問題",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生列出舊成績來源與想問的計算問題，沒有要求導師直接替他改名次。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我高一考那麼差，現在還會被算進來嗎？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "本次由學生直接向導師表達個人的看法，未讓第三人自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "care",
              "text": "承認回看舊成績壓力",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生承認重新看到高一成績時很難受，導師不把過去分數當成個人定論。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我高一考那麼差，現在還會被算進來嗎？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "本次由學生直接向導師表達個人的看法，未讓第三人自動知情。"
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
      "id": "content:18b-t02-04-06",
      "topicId": "T02-04",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t02-04-06",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "1-4",
        "2-2",
        "8-3"
      ],
      "additionalCodes": [
        "3-1",
        "4-4",
        "2-4"
      ],
      "weights": [
        0.09090909090909091,
        0.45454545454545453,
        0.2727272727272727,
        0.09090909090909091,
        0,
        0.09090909090909091
      ],
      "directions": [
        1,
        1,
        1,
        1,
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
          "noon"
        ],
        "from": null,
        "until": null,
        "facts": [],
        "history": [],
        "numeric": [],
        "enrollment": null,
        "grades": [
          2,
          3
        ]
      },
      "repetition": {
        "cooldownDays": 45,
        "exclusionGroups": [],
        "sameFact": true,
        "reason": "同一學生獨立情境；每次仍須符合時段、學籍與接觸資格"
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
      "resourceId": "content:18b-t02-04-08",
      "definitionId": "content:18b-t02-04-08",
      "version": "1",
      "topicId": "T02-04",
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
              "text": "開學課後，學生在行政辦公室向導師轉述家長的疑惑：重修與原成績究竟如何納入校內排名？",
              "speaker": null,
              "scene": "school:administration",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我爸問重修過的科目要算原分還是新分，我也弄不清楚。",
              "speaker": "participant",
              "scene": "school:administration",
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
              "text": "核對學分更正與成績",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生將原成績與重修成績並排，發現必須先確定兩者在系統中的性質。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我爸問重修過的科目要算原分還是新分，我也弄不清楚。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "本次由學生直接向導師表達個人的看法，未讓第三人自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "check",
              "text": "詢問正式排名採計",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師提供教務處的核對方式，沒有擅自決定排名應採哪個分數。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我爸問重修過的科目要算原分還是新分，我也弄不清楚。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "本次由學生直接向導師表達個人的看法，未讓第三人自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "choice",
              "text": "保留書面依據",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生保留學分更正通知，準備提出能查證的具體計算疑問。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我爸問重修過的科目要算原分還是新分，我也弄不清楚。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "本次由學生直接向導師表達個人的看法，未讓第三人自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "care",
              "text": "理解不同分數困惑",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "導師承認不同分數並列很容易混淆，沒有以安撫口吻承諾排名會提高。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我爸問重修過的科目要算原分還是新分，我也弄不清楚。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "本次由學生直接向導師表達個人的看法，未讓第三人自動知情。"
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
      "id": "content:18b-t02-04-08",
      "topicId": "T02-04",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t02-04-08",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "1-4",
        "2-2",
        "8-3"
      ],
      "additionalCodes": [
        "3-1",
        "4-4",
        "2-4"
      ],
      "weights": [
        0.2222222222222222,
        0.4444444444444444,
        0.2222222222222222,
        0.1111111111111111,
        0,
        0
      ],
      "directions": [
        1,
        1,
        1,
        1,
        1,
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
          "noon"
        ],
        "from": null,
        "until": null,
        "facts": [],
        "history": [],
        "numeric": [],
        "enrollment": null,
        "grades": [
          2,
          3
        ]
      },
      "repetition": {
        "cooldownDays": 45,
        "exclusionGroups": [],
        "sameFact": true,
        "reason": "同一學生獨立情境；每次仍須符合時段、學籍與接觸資格"
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
      "resourceId": "content:18b-t02-04-09",
      "definitionId": "content:18b-t02-04-09",
      "version": "1",
      "topicId": "T02-04",
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
              "text": "家長會後，會議室。學生拿到兩份不同版本的推薦辦法。",
              "speaker": null,
              "scene": "school:meeting-room",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "簡報跟正式辦法寫的不一樣，要信哪一份？",
              "speaker": "participant",
              "scene": "school:meeting-room",
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
              "text": "核對文件公布日期",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生把簡報和書面辦法的版本日期並列，找出實際不一致的條款。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "簡報跟正式辦法寫的不一樣，要信哪一份？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "本次由學生直接向導師表達個人的看法，未讓第三人自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "check",
              "text": "向承辦確認正式效力",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生知道正式適用規則應由承辦確認，而不是挑自己有利的版本。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "簡報跟正式辦法寫的不一樣，要信哪一份？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "本次由學生直接向導師表達個人的看法，未讓第三人自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "choice",
              "text": "整理相互矛盾的條文",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生將兩段矛盾文字整理成具體詢問，沒有直接宣布學校作弊。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "簡報跟正式辦法寫的不一樣，要信哪一份？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "本次由學生直接向導師表達個人的看法，未讓第三人自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "care",
              "text": "理解規則不一致",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "導師理解規則看似改來改去的困惑，沒有替校方杜撰答案。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "簡報跟正式辦法寫的不一樣，要信哪一份？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "本次由學生直接向導師表達個人的看法，未讓第三人自動知情。"
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
      "id": "content:18b-t02-04-09",
      "topicId": "T02-04",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t02-04-09",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "1-4",
        "2-2",
        "8-3"
      ],
      "additionalCodes": [
        "3-1",
        "4-4",
        "2-4"
      ],
      "weights": [
        0.3333333333333333,
        0.3333333333333333,
        0.2222222222222222,
        0.1111111111111111,
        0,
        0
      ],
      "directions": [
        1,
        1,
        1,
        1,
        1,
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
          "noon"
        ],
        "from": null,
        "until": null,
        "facts": [],
        "history": [],
        "numeric": [],
        "enrollment": null,
        "grades": [
          3
        ]
      },
      "repetition": {
        "cooldownDays": 45,
        "exclusionGroups": [],
        "sameFact": true,
        "reason": "同一學生獨立情境；每次仍須符合時段、學籍與接觸資格"
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
      "resourceId": "content:18b-t02-04-10",
      "definitionId": "content:18b-t02-04-10",
      "version": "1",
      "topicId": "T02-04",
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
              "text": "午餐，教室。學生想靠導師取得他人尚未公開名次。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "朋友要我問你他的排名，你可以偷偷講嗎？",
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
              "text": "說明名次保密界線",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生知道導師不能私下揭露另一名學生的未公開順位。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "朋友要我問你他的排名，你可以偷偷講嗎？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "本次由學生直接向導師表達個人的看法，未讓第三人自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "check",
              "text": "改向合法公開資訊求證",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生改從正式公開的推薦辦法了解程序，而沒有取得個人隱私資料。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "朋友要我問你他的排名，你可以偷偷講嗎？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "本次由學生直接向導師表達個人的看法，未讓第三人自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "choice",
              "text": "討論如何婉拒同學",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生想到可告訴朋友『這要由本人走正式查詢』，並未替朋友取得授權。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "朋友要我問你他的排名，你可以偷偷講嗎？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "本次由學生直接向導師表達個人的看法，未讓第三人自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "care",
              "text": "理解同儕壓力但不洩露",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生承認很難拒絕朋友，但導師沒有為求和氣破壞保密界線。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "朋友要我問你他的排名，你可以偷偷講嗎？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "本次由學生直接向導師表達個人的看法，未讓第三人自動知情。"
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
      "id": "content:18b-t02-04-10",
      "topicId": "T02-04",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t02-04-10",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "1-4",
        "2-2",
        "8-3"
      ],
      "additionalCodes": [
        "3-1",
        "4-4",
        "2-4"
      ],
      "weights": [
        0.23076923076923078,
        0.15384615384615385,
        0.23076923076923078,
        0.15384615384615385,
        0.23076923076923078,
        0
      ],
      "directions": [
        -1,
        1,
        1,
        1,
        1,
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
        "reason": "同一學生獨立情境；每次仍須符合時段、學籍與接觸資格"
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
      "resourceId": "content:18b-t02-04-11",
      "definitionId": "content:18b-t02-04-11",
      "version": "1",
      "topicId": "T02-04",
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
              "text": "班會後，教師辦公室。學生提出推薦計算爭議，希望學校收件。",
              "speaker": null,
              "scene": "school:teachers-office",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我們想提出排名算法意見，可以寫給學校嗎？",
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
              "id": "clarify",
              "text": "區分意見與未證實指控",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生把意見書中的『有人作弊』改成『請說明同分比序依據』，確認能用正式問題代替猜測後，語氣稍微平靜。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我們想提出排名算法意見，可以寫給學校嗎？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [
                  {
                    "role": "participant",
                    "holder": "person",
                    "code": "2-2",
                    "delta": -0.3
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
                      "description": "本次由學生直接向導師表達個人的看法，未讓第三人自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "check",
              "text": "介紹正式意見窗口",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生知道可以依正式窗口提出具體規則疑問，尚未收到校方答覆。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我們想提出排名算法意見，可以寫給學校嗎？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "本次由學生直接向導師表達個人的看法，未讓第三人自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "choice",
              "text": "列出不明規則",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生保留兩版公告與問題清單，避免把未確認的猜測寫成事實。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我們想提出排名算法意見，可以寫給學校嗎？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "本次由學生直接向導師表達個人的看法，未讓第三人自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "care",
              "text": "肯定理性提問",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "導師肯定學生試著理性表達，沒有承諾學校一定改變算法。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我們想提出排名算法意見，可以寫給學校嗎？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "本次由學生直接向導師表達個人的看法，未讓第三人自動知情。"
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
      "id": "content:18b-t02-04-11",
      "topicId": "T02-04",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t02-04-11",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "1-4",
        "2-2",
        "8-3"
      ],
      "additionalCodes": [
        "3-1",
        "4-4",
        "2-4"
      ],
      "weights": [
        0.4,
        0.2,
        0,
        0.3,
        0.1,
        0
      ],
      "directions": [
        1,
        1,
        1,
        1,
        1,
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
          "noon"
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
        "reason": "同一學生獨立情境；每次仍須符合時段、學籍與接觸資格"
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
      "resourceId": "content:18b-t02-04-13",
      "definitionId": "content:18b-t02-04-13",
      "version": "1",
      "topicId": "T02-04",
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
              "text": "晚間電話，教師住處。家長要求先知道孩子是否有機會。",
              "speaker": null,
              "scene": "home:living-room",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "推薦名單還沒公告，可以先告訴我孩子有沒有名額嗎？",
              "speaker": "participant",
              "scene": "home:living-room",
              "cast": [
                {
                  "role": "participant",
                  "position": "center",
                  "expression": "calm"
                }
              ],
              "presentation": "phone"
            }
          ],
          "choices": [
            {
              "id": "clarify",
              "text": "說明未公告資料權限",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "家長要求提前透露名單，導師說明自己既沒有發布權限，也不會提供未公開資料。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "推薦名單還沒公告，可以先告訴我孩子有沒有名額嗎？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "家長以遠距通訊向導師說明其個人感受；此接觸不代表雙方實際同處一室。"
                    }
                  ]
                }
              }
            },
            {
              "id": "check",
              "text": "提供公開時程",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "家長取得預定公告時程與查詢來源，並非提前收到個人結果。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "推薦名單還沒公告，可以先告訴我孩子有沒有名額嗎？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "家長以遠距通訊向導師說明其個人感受；此接觸不代表雙方實際同處一室。"
                    }
                  ]
                }
              }
            },
            {
              "id": "choice",
              "text": "整理資格疑問",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "家長將資格疑點整理起來，準備待正式公告後詢問承辦。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "推薦名單還沒公告，可以先告訴我孩子有沒有名額嗎？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "家長以遠距通訊向導師說明其個人感受；此接觸不代表雙方實際同處一室。"
                    }
                  ]
                }
              }
            },
            {
              "id": "care",
              "text": "理解等待焦慮",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "導師理解等待讓家長焦急，但不拿未證實名次作安慰。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "推薦名單還沒公告，可以先告訴我孩子有沒有名額嗎？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "家長以遠距通訊向導師說明其個人感受；此接觸不代表雙方實際同處一室。"
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
      "id": "content:18b-t02-04-13",
      "topicId": "T02-04",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t02-04-13",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "1-4",
        "2-2",
        "8-3"
      ],
      "additionalCodes": [
        "3-1",
        "4-4",
        "2-4"
      ],
      "weights": [
        0.1111111111111111,
        0.5555555555555556,
        0.2222222222222222,
        0.1111111111111111,
        0,
        0
      ],
      "directions": [
        1,
        1,
        1,
        1,
        1,
        1
      ],
      "eligibility": {
        "people": [
          "caregiver"
        ],
        "dayKinds": [
          "school"
        ],
        "slotIds": [
          "private"
        ],
        "from": null,
        "until": null,
        "facts": [],
        "history": [],
        "numeric": [],
        "enrollment": null,
        "grades": [
          3
        ]
      },
      "repetition": {
        "cooldownDays": 45,
        "exclusionGroups": [],
        "sameFact": true,
        "reason": "同一學生獨立情境；每次仍須符合時段、學籍與接觸資格"
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
      "resourceId": "content:18b-t02-04-14",
      "definitionId": "content:18b-t02-04-14",
      "version": "1",
      "topicId": "T02-04",
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
              "text": "下課，走廊。學生傳聞前面有人放棄，但本人未證實。",
              "speaker": null,
              "scene": "school:corridor",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "聽說前面有人放棄，我是不是就補上了？",
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
              "id": "clarify",
              "text": "詢問傳聞來源",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生說出聽見放棄傳聞的場合，還不能證明當事人已正式放棄。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "聽說前面有人放棄，我是不是就補上了？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "本次由學生直接向導師表達個人的看法，未讓第三人自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "check",
              "text": "確認候補遞補流程",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生查核校內候補程序，知道遞補必須有正式生效條件。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "聽說前面有人放棄，我是不是就補上了？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "本次由學生直接向導師表達個人的看法，未讓第三人自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "choice",
              "text": "不追問未公開的個人決定",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生決定不追問別人的個別升學決定，只確認自己資格。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "聽說前面有人放棄，我是不是就補上了？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "本次由學生直接向導師表達個人的看法，未讓第三人自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "care",
              "text": "理解想抓住機會",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生承認自己很希望有機會，導師沒有用傳聞讓他空歡喜。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "聽說前面有人放棄，我是不是就補上了？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "本次由學生直接向導師表達個人的看法，未讓第三人自動知情。"
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
      "id": "content:18b-t02-04-14",
      "topicId": "T02-04",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t02-04-14",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "1-4",
        "2-2",
        "8-3"
      ],
      "additionalCodes": [
        "3-1",
        "4-4",
        "2-4"
      ],
      "weights": [
        0,
        0.3,
        0.5,
        0.1,
        0.1,
        0
      ],
      "directions": [
        1,
        1,
        1,
        1,
        1,
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
          "noon"
        ],
        "from": null,
        "until": null,
        "facts": [],
        "history": [],
        "numeric": [],
        "enrollment": null,
        "grades": [
          3
        ]
      },
      "repetition": {
        "cooldownDays": 45,
        "exclusionGroups": [],
        "sameFact": true,
        "reason": "同一學生獨立情境；每次仍須符合時段、學籍與接觸資格"
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
      "resourceId": "content:18b-t02-04-16",
      "definitionId": "content:18b-t02-04-16",
      "version": "1",
      "topicId": "T02-04",
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
              "text": "選組說明會後，禮堂。學生質疑不同課程群組的計算方式。",
              "speaker": null,
              "scene": "school:auditorium",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "不同組採計科目不同，這樣到底公不公平？",
              "speaker": "participant",
              "scene": "school:auditorium",
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
              "text": "確認群組採計規則",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生指出不同課程群組的採計科目不相同，但尚未證明規則違法。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "不同組採計科目不同，這樣到底公不公平？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "本次由學生直接向導師表達個人的看法，未讓第三人自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "check",
              "text": "向承辦問制度依據",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生取得校內當年度計算依據，了解可從何處提出疑問。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "不同組採計科目不同，這樣到底公不公平？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "本次由學生直接向導師表達個人的看法，未讓第三人自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "choice",
              "text": "整理不合理的具體情形",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生把具體不公平疑慮寫成一段可供查核的問題，不攻擊個別同學。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "不同組採計科目不同，這樣到底公不公平？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "本次由學生直接向導師表達個人的看法，未讓第三人自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "care",
              "text": "肯定思考公平",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生知道質疑制度可以有根據，不必先懷疑其他受惠學生。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "不同組採計科目不同，這樣到底公不公平？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "本次由學生直接向導師表達個人的看法，未讓第三人自動知情。"
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
      "id": "content:18b-t02-04-16",
      "topicId": "T02-04",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t02-04-16",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "1-4",
        "2-2",
        "8-3"
      ],
      "additionalCodes": [
        "3-1",
        "4-4",
        "2-4"
      ],
      "weights": [
        0.4,
        0.2,
        0.2,
        0.2,
        0,
        0
      ],
      "directions": [
        1,
        1,
        1,
        1,
        1,
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
          "noon"
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
        "reason": "同一學生獨立情境；每次仍須符合時段、學籍與接觸資格"
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
      "resourceId": "content:18b-t02-04-17",
      "definitionId": "content:18b-t02-04-17",
      "version": "1",
      "topicId": "T02-04",
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
              "text": "公告欄前，走廊。學生發現榜單標示年度錯誤，大家仍在轉傳。",
              "speaker": null,
              "scene": "school:corridor",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "榜單年份錯了，大家卻還在轉。",
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
              "id": "clarify",
              "text": "確認錯誤標示",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生確認張貼榜單的年份與目前學年不一致，無法當作現行排名。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "榜單年份錯了，大家卻還在轉。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "本次由學生直接向導師表達個人的看法，未讓第三人自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "check",
              "text": "通知張貼單位查核",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生向張貼窗口反映版本疑慮，承辦尚未完成更正。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "榜單年份錯了，大家卻還在轉。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "本次由學生直接向導師表達個人的看法，未讓第三人自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "choice",
              "text": "提醒不擴散榜單",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生願意停止轉傳錯置榜單，未假定所有人都已看過澄清。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "榜單年份錯了，大家卻還在轉。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "本次由學生直接向導師表達個人的看法，未讓第三人自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "care",
              "text": "理解資訊混亂",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生承認看到舊榜單引發緊張，導師不拿那張圖評論同學。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "榜單年份錯了，大家卻還在轉。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "本次由學生直接向導師表達個人的看法，未讓第三人自動知情。"
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
      "id": "content:18b-t02-04-17",
      "topicId": "T02-04",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t02-04-17",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "1-4",
        "2-2",
        "8-3"
      ],
      "additionalCodes": [
        "3-1",
        "4-4",
        "2-4"
      ],
      "weights": [
        0.2,
        0.2,
        0.4,
        0.1,
        0,
        0.1
      ],
      "directions": [
        1,
        1,
        1,
        1,
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
          "noon"
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
        "reason": "同一學生獨立情境；每次仍須符合時段、學籍與接觸資格"
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
      "resourceId": "content:18b-t02-04-18",
      "definitionId": "content:18b-t02-04-18",
      "version": "1",
      "topicId": "T02-04",
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
              "text": "親師日，教室。家長希望老師在班會上公布所有名次，學生反對。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "家長想公布全班名次，我不想被大家知道。",
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
              "text": "確認學生公開意願",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生表達不願公開個人名次的理由，導師未將沉默當成同意。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "家長想公布全班名次，我不想被大家知道。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "本次由學生直接向導師表達個人的看法，未讓第三人自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "check",
              "text": "說明個資界線",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師說明個人名次的使用需要符合校內規定與適當權限。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "家長想公布全班名次，我不想被大家知道。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "本次由學生直接向導師表達個人的看法，未讓第三人自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "choice",
              "text": "討論不公開名次的說明",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生知道可向家長說明希望個別查看，而非在全班公開比較。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "家長想公布全班名次，我不想被大家知道。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "本次由學生直接向導師表達個人的看法，未讓第三人自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "care",
              "text": "支持學生隱私",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生聽見導師尊重隱私，沒有因不願公布就被說成怕競爭。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "家長想公布全班名次，我不想被大家知道。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "本次由學生直接向導師表達個人的看法，未讓第三人自動知情。"
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
      "id": "content:18b-t02-04-18",
      "topicId": "T02-04",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t02-04-18",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "1-4",
        "2-2",
        "8-3"
      ],
      "additionalCodes": [
        "3-1",
        "4-4",
        "2-4"
      ],
      "weights": [
        0.3,
        0.3,
        0.1,
        0.2,
        0,
        0.1
      ],
      "directions": [
        1,
        1,
        1,
        1,
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
          "noon"
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
        "reason": "同一學生獨立情境；每次仍須符合時段、學籍與接觸資格"
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
      "resourceId": "content:18b-t02-04-19",
      "definitionId": "content:18b-t02-04-19",
      "version": "1",
      "topicId": "T02-04",
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
              "text": "午休，學生拿著校內推薦作業通知到行政辦公室，發現回覆期限快到，想知道等候其他人回覆時自己是否還要交件。",
              "speaker": null,
              "scene": "school:administration",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我還在等推薦順位，通知卻要先回覆，現在不交是不是就算放棄？",
              "speaker": "participant",
              "scene": "school:administration",
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
              "text": "先逐項核對這張通知要求回覆什麼",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生分清目前是校內意願確認還是正式推薦，不把等待順位當作免交文件。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我還在等推薦順位，通知卻要先回覆，現在不交是不是就算放棄？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "當事人直接向導師說明本次情況；導師僅知悉其陳述與本次處理。"
                    }
                  ]
                }
              }
            },
            {
              "id": "check",
              "text": "確認期限及未回覆的正式處理規則",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生找到承辦窗口，尚未由導師口頭保證逾期仍能保留資格。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我還在等推薦順位，通知卻要先回覆，現在不交是不是就算放棄？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "當事人直接向導師說明本次情況；導師僅知悉其陳述與本次處理。"
                    }
                  ]
                }
              }
            },
            {
              "id": "choice",
              "text": "協助整理要向承辦詢問的具體問題",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生把現有順位與通知日期寫清楚，準備在期限內確認程序。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我還在等推薦順位，通知卻要先回覆，現在不交是不是就算放棄？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "當事人直接向導師說明本次情況；導師僅知悉其陳述與本次處理。"
                    }
                  ]
                }
              }
            },
            {
              "id": "care",
              "text": "一邊等消息一邊怕錯過期限，確實難熬",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "導師理解等待壓力，同時提醒可先查證自己應完成的程序。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我還在等推薦順位，通知卻要先回覆，現在不交是不是就算放棄？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "當事人直接向導師說明本次情況；導師僅知悉其陳述與本次處理。"
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
      "id": "content:18b-t02-04-19",
      "topicId": "T02-04",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t02-04-19",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "1-4",
        "2-2",
        "8-3"
      ],
      "additionalCodes": [
        "3-1",
        "4-4",
        "2-4"
      ],
      "weights": [
        0.2,
        0.4,
        0.2,
        0.2,
        0,
        0
      ],
      "directions": [
        1,
        1,
        1,
        1,
        1,
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
          "noon"
        ],
        "from": null,
        "until": null,
        "facts": [],
        "history": [],
        "numeric": [],
        "enrollment": null,
        "grades": [
          3
        ],
        "entrance": [
          {
            "kind": "gsat-published"
          }
        ]
      },
      "repetition": {
        "cooldownDays": 45,
        "exclusionGroups": [],
        "sameFact": true,
        "reason": "同一學生獨立情境；每次仍須符合時段、學籍與接觸資格"
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
      "resourceId": "content:18b-t02-04-20",
      "definitionId": "content:18b-t02-04-20",
      "version": "1",
      "topicId": "T02-04",
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
              "text": "評量後，教師辦公室。學生發現成績疑點但擔心被認為搶別人的機會。",
              "speaker": null,
              "scene": "school:teachers-office",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "成績可能算錯，但又怕影響同學推薦。",
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
              "id": "clarify",
              "text": "核對評量疑點",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生指出卷面有一處計分疑點，尚未判定原成績計算錯誤。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "成績可能算錯，但又怕影響同學推薦。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "本次由學生直接向導師表達個人的看法，未讓第三人自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "check",
              "text": "介紹合法複核方式",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生了解正式複核方式與期限，不要求導師代替科任改分。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "成績可能算錯，但又怕影響同學推薦。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "本次由學生直接向導師表達個人的看法，未讓第三人自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "choice",
              "text": "討論公平處理權益",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生願意只就自己的評量證據提問，不把其他同學的名次當成責任。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "成績可能算錯，但又怕影響同學推薦。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "本次由學生直接向導師表達個人的看法，未讓第三人自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "care",
              "text": "肯定追求正確",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生聽完後稍微鬆了一口氣，明白提出合理複核不等於搶走別人的名額；是否改分仍須依正式程序。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "成績可能算錯，但又怕影響同學推薦。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [
                  {
                    "role": "participant",
                    "holder": "person",
                    "code": "2-2",
                    "delta": -0.4
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
                      "description": "本次由學生直接向導師表達個人的看法，未讓第三人自動知情。"
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
      "id": "content:18b-t02-04-20",
      "topicId": "T02-04",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t02-04-20",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "1-4",
        "2-2",
        "8-3"
      ],
      "additionalCodes": [
        "3-1",
        "4-4",
        "2-4"
      ],
      "weights": [
        0.3076923076923077,
        0.38461538461538464,
        0,
        0.07692307692307693,
        0.15384615384615385,
        0.07692307692307693
      ],
      "directions": [
        1,
        1,
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
          "noon"
        ],
        "from": null,
        "until": null,
        "facts": [],
        "history": [],
        "numeric": [],
        "enrollment": null,
        "grades": [
          3
        ]
      },
      "repetition": {
        "cooldownDays": 45,
        "exclusionGroups": [],
        "sameFact": true,
        "reason": "同一學生獨立情境；每次仍須符合時段、學籍與接觸資格"
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
      "resourceId": "content:18b-t02-04-21",
      "definitionId": "content:18b-t02-04-21",
      "version": "1",
      "topicId": "T02-04",
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
              "text": "午休，家長在校內向導師出示先前說明會資料，追問尚未釐清的推薦資格細則。",
              "speaker": null,
              "scene": "school:auditorium",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "說明會都散了，還有好幾條我聽不懂。",
              "speaker": "participant",
              "scene": "school:auditorium",
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
              "text": "確認未釐清條款",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "家長將說明會沒聽懂的兩條條文圈出來，沒有假裝已理解。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "說明會都散了，還有好幾條我聽不懂。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "本次由家長直接向導師表達個人的看法，未讓第三人自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "check",
              "text": "提供書面來源",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "家長找到可查詢的正式書面辦法，仍有幾項細節待確認。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "說明會都散了，還有好幾條我聽不懂。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "本次由家長直接向導師表達個人的看法，未讓第三人自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "choice",
              "text": "整理給承辦的問題",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "家長準備向承辦提出具體問句，尚未得到官方解答。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "說明會都散了，還有好幾條我聽不懂。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "本次由家長直接向導師表達個人的看法，未讓第三人自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "care",
              "text": "理解時間不夠",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "家長說出時間不夠導致的急躁，導師沒有用簡化口號敷衍。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "說明會都散了，還有好幾條我聽不懂。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "本次由家長直接向導師表達個人的看法，未讓第三人自動知情。"
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
      "id": "content:18b-t02-04-21",
      "topicId": "T02-04",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t02-04-21",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "1-4",
        "2-2",
        "8-3"
      ],
      "additionalCodes": [
        "3-1",
        "4-4",
        "2-4"
      ],
      "weights": [
        0.3,
        0.3,
        0.2,
        0.2,
        0,
        0
      ],
      "directions": [
        1,
        1,
        1,
        1,
        1,
        1
      ],
      "eligibility": {
        "people": [
          "caregiver"
        ],
        "dayKinds": [
          "school"
        ],
        "slotIds": [
          "noon"
        ],
        "from": null,
        "until": null,
        "facts": [],
        "history": [],
        "numeric": [],
        "enrollment": null,
        "grades": [
          3
        ]
      },
      "repetition": {
        "cooldownDays": 45,
        "exclusionGroups": [],
        "sameFact": true,
        "reason": "同一學生獨立情境；每次仍須符合時段、學籍與接觸資格"
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
      "resourceId": "content:18b-t02-04-23",
      "definitionId": "content:18b-t02-04-23",
      "version": "1",
      "topicId": "T02-04",
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
              "text": "週末晚間，家長來電拿出多年前校內推薦比序表，要求沿用舊表上的同分處理方式，尚未核對今年公告。",
              "speaker": null,
              "scene": "home:living-room",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "以前校內同分就是這樣排，今年怎麼不能照舊表算？",
              "speaker": "participant",
              "scene": "home:living-room",
              "cast": [
                {
                  "role": "participant",
                  "position": "center",
                  "expression": "calm"
                }
              ],
              "presentation": "phone"
            }
          ],
          "choices": [
            {
              "id": "clarify",
              "text": "先確認舊表的年度與適用範圍",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "家長核對文件年份，知道舊校內比序表不等於今年正式規定。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "以前校內同分就是這樣排，今年怎麼不能照舊表算？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "當事人直接向導師說明本次情況；導師僅知悉其陳述與本次處理。"
                    }
                  ]
                }
              }
            },
            {
              "id": "check",
              "text": "查找當年度校內同分比序公告",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "家長記下官方查詢來源，尚未據舊文件要求變更任何學生順位。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "以前校內同分就是這樣排，今年怎麼不能照舊表算？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "當事人直接向導師說明本次情況；導師僅知悉其陳述與本次處理。"
                    }
                  ]
                }
              }
            },
            {
              "id": "choice",
              "text": "將規則疑義整理給校內承辦窗口",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "家長列出新舊條文的具體差別，導師未代替委員會承諾修改規則。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "以前校內同分就是這樣排，今年怎麼不能照舊表算？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "當事人直接向導師說明本次情況；導師僅知悉其陳述與本次處理。"
                    }
                  ]
                }
              }
            },
            {
              "id": "care",
              "text": "規則變了卻找不到說明，確實會不安",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "導師理解需要清楚解釋的心情，沒有附和未經查證的偏袒指控。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "以前校內同分就是這樣排，今年怎麼不能照舊表算？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "當事人直接向導師說明本次情況；導師僅知悉其陳述與本次處理。"
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
      "id": "content:18b-t02-04-23",
      "topicId": "T02-04",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t02-04-23",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "1-4",
        "2-2",
        "8-3"
      ],
      "additionalCodes": [
        "3-1",
        "4-4",
        "2-4"
      ],
      "weights": [
        0.36363636363636365,
        0.18181818181818182,
        0.36363636363636365,
        0.09090909090909091,
        0,
        0
      ],
      "directions": [
        1,
        1,
        1,
        1,
        1,
        1
      ],
      "eligibility": {
        "people": [
          "caregiver"
        ],
        "dayKinds": [
          "weekend",
          "holiday"
        ],
        "slotIds": [
          "evening"
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
        "reason": "同一學生獨立情境；每次仍須符合時段、學籍與接觸資格"
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
      "resourceId": "content:18b-t02-04-24",
      "definitionId": "content:18b-t02-04-24",
      "version": "1",
      "topicId": "T02-04",
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
              "text": "學期結算隔天，教室。學生看到榜單更新，先懷疑有人暗箱操作。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "昨天還是這名次，今天為什麼變了？",
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
              "text": "核對公告版次",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生比對兩版榜單，發現順位確有變動，但還不知道原因。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "昨天還是這名次，今天為什麼變了？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "本次由學生直接向導師表達個人的看法，未讓第三人自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "check",
              "text": "請承辦說明更正原因",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生知道要由校方正式核對異動依據，而非直接指控有人作弊。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "昨天還是這名次，今天為什麼變了？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "本次由學生直接向導師表達個人的看法，未讓第三人自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "choice",
              "text": "保存差異不傳指控",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生保存公告日期和改動項目，避免在群組散播片段截圖。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "昨天還是這名次，今天為什麼變了？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "本次由學生直接向導師表達個人的看法，未讓第三人自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "care",
              "text": "理解突然變動",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "導師理解名次變動的震驚，沒有提前宣布校方一定出錯。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "昨天還是這名次，今天為什麼變了？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "本次由學生直接向導師表達個人的看法，未讓第三人自動知情。"
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
      "id": "content:18b-t02-04-24",
      "topicId": "T02-04",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t02-04-24",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "1-4",
        "2-2",
        "8-3"
      ],
      "additionalCodes": [
        "3-1",
        "4-4",
        "2-4"
      ],
      "weights": [
        0.13333333333333333,
        0.26666666666666666,
        0.3333333333333333,
        0.06666666666666667,
        0.06666666666666667,
        0.13333333333333333
      ],
      "directions": [
        1,
        1,
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
          "noon"
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
        "reason": "同一學生獨立情境；每次仍須符合時段、學籍與接觸資格"
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
      "resourceId": "content:18b-t02-04-26",
      "definitionId": "content:18b-t02-04-26",
      "version": "1",
      "topicId": "T02-04",
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
              "text": "午休，一名家長在行政辦公室外詢問導師，手上拿著學生觀察紀錄摘要，想知道導師能否直接決定推薦名單。",
              "speaker": null,
              "scene": "school:administration",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "「你既然寫了我孩子的表現，為什麼不能直接幫他決定推薦名單？」",
              "speaker": "participant",
              "scene": "school:administration",
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
              "text": "澄清導師紀錄與審議不同",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "家長知道導師提供的是實際觀察紀錄，並非替校內推薦作業投下決定票。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "「你既然寫了我孩子的表現，為什麼不能直接幫他決定推薦名單？」",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "本次由家長直接向導師表達個人的看法，未讓第三人自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "check",
              "text": "向家長說明正式程序",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "家長取得正式推薦審議權責的查詢方式；校內審議結果不因此變動。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "「你既然寫了我孩子的表現，為什麼不能直接幫他決定推薦名單？」",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "本次由家長直接向導師表達個人的看法，未讓第三人自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "choice",
              "text": "保留實際資料交付範圍",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "導師釐清自己實際提交的資料範圍，沒有向家長透露其他學生的評估內容。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "「你既然寫了我孩子的表現，為什麼不能直接幫他決定推薦名單？」",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "本次由家長直接向導師表達個人的看法，未讓第三人自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "care",
              "text": "理解權責被誤認",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "導師理解家長的焦慮，同時守住推薦權責與學生資料的界線。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "「你既然寫了我孩子的表現，為什麼不能直接幫他決定推薦名單？」",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "本次由家長直接向導師表達個人的看法，未讓第三人自動知情。"
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
      "id": "content:18b-t02-04-26",
      "topicId": "T02-04",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t02-04-26",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "1-4",
        "2-2",
        "8-3"
      ],
      "additionalCodes": [
        "3-1",
        "4-4",
        "2-4"
      ],
      "weights": [
        0.2727272727272727,
        0.2727272727272727,
        0.09090909090909091,
        0.18181818181818182,
        0.18181818181818182,
        0
      ],
      "directions": [
        1,
        1,
        1,
        1,
        1,
        1
      ],
      "eligibility": {
        "people": [
          "caregiver"
        ],
        "dayKinds": [
          "school"
        ],
        "slotIds": [
          "noon"
        ],
        "from": null,
        "until": null,
        "facts": [],
        "history": [],
        "numeric": [],
        "enrollment": null,
        "grades": [
          3
        ]
      },
      "repetition": {
        "cooldownDays": 45,
        "exclusionGroups": [],
        "sameFact": true,
        "reason": "同一學生獨立情境；每次仍須符合時段、學籍與接觸資格"
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
      "resourceId": "content:18b-t02-04-28",
      "definitionId": "content:18b-t02-04-28",
      "version": "1",
      "topicId": "T02-04",
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
              "text": "週會，禮堂。行政主動澄清算法，卻有學生不敢當眾提問。",
              "speaker": null,
              "scene": "school:auditorium",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "學校已經說明排名，還是有人不敢問。",
              "speaker": "participant",
              "scene": "school:auditorium",
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
              "text": "詢問匿名提問管道",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生知道公開說明不代表每個人都願意在禮堂當眾發問。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "學校已經說明排名，還是有人不敢問。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "本次由學生直接向導師表達個人的看法，未讓第三人自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "check",
              "text": "整理未回答的問題",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師建議承辦提供可確認的書面問答方式，尚未決定行政措施。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "學校已經說明排名，還是有人不敢問。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "本次由學生直接向導師表達個人的看法，未讓第三人自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "choice",
              "text": "向承辦提補充說明",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生整理尚未釐清的排序問題，未替全校同學宣稱一致看法。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "學校已經說明排名，還是有人不敢問。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "本次由學生直接向導師表達個人的看法，未讓第三人自動知情。"
                    }
                  ]
                }
              }
            },
            {
              "id": "care",
              "text": "理解公開發問不自在",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生說出害怕公開提問被貼標籤，導師沒有要求他當眾出面。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "學校已經說明排名，還是有人不敢問。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "本次由學生直接向導師表達個人的看法，未讓第三人自動知情。"
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
      "id": "content:18b-t02-04-28",
      "topicId": "T02-04",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t02-04-28",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "1-4",
        "2-2",
        "8-3"
      ],
      "additionalCodes": [
        "3-1",
        "4-4",
        "2-4"
      ],
      "weights": [
        0.15384615384615385,
        0.38461538461538464,
        0,
        0.23076923076923078,
        0.15384615384615385,
        0.07692307692307693
      ],
      "directions": [
        1,
        1,
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
          "noon"
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
        "reason": "同一學生獨立情境；每次仍須符合時段、學籍與接觸資格"
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
