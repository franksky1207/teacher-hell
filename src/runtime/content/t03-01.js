// Generated isolated T03 authoring records. Not a production catalogue.
// Source: work/18b-t03-01-authoring.json. Regenerate via scripts/sync-t03-drafts.mjs.
export default [
  {
    "story": {
      "resourceId": "content:18b-t03-01-01",
      "definitionId": "content:18b-t03-01-01",
      "version": "1",
      "topicId": "T03-01",
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
              "text": "數學課後，學生拿著拍下的投影片來找你，說坐第一排仍分不清幾個細線符號。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我知道大家都看得到，但那些負號和等號對我真的太像了。",
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
              "text": "先確認哪些畫面辨識不清",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生指出負號與等號混淆的畫面，導師記下問題但尚未改善投影。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我知道大家都看得到，但那些負號和等號對我真的太像了。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師自己的需求或擔憂；不向未在場者自動傳播。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "請科任提供對比清楚的課堂資料",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師整理可讀性需求，準備與科任協調；新的資料尚未提供。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我知道大家都看得到，但那些負號和等號對我真的太像了。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師自己的需求或擔憂；不向未在場者自動傳播。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "與學生討論可行座位及顯示方式",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生選定先試坐更接近投影的一側，是否有效仍待確認。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我知道大家都看得到，但那些負號和等號對我真的太像了。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師自己的需求或擔憂；不向未在場者自動傳播。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "那不是你不夠努力，我們一起找辦法",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生說清楚自己的視覺困難，導師沒有要求他當眾解釋。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我知道大家都看得到，但那些負號和等號對我真的太像了。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師自己的需求或擔憂；不向未在場者自動傳播。"
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
      "id": "content:18b-t03-01-01",
      "topicId": "T03-01",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-01-01",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "4-3",
        "4-2",
        "3-4"
      ],
      "additionalCodes": [
        "1-3",
        "3-1",
        "2-2"
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
        "reason": "同一學生的獨立接觸情境；依正式抽選、學籍、時段與冷卻資格決定"
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
      "resourceId": "content:18b-t03-01-02",
      "definitionId": "content:18b-t03-01-02",
      "version": "1",
      "topicId": "T03-01",
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
              "text": "兩棟教室之間只有短短十分鐘，學生到第三節總是慢幾分鐘，拿出了自己記下的路線時間。",
              "speaker": null,
              "scene": "school:corridor",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我不是拖拖拉拉，是另一條路真的繞很遠。",
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
              "text": "陪學生核對實際可行的通行路線",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師核對學生所述的移動路線，尚未認定每次遲到原因相同。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我不是拖拖拉拉，是另一條路真的繞很遠。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師自己的需求或擔憂；不向未在場者自動傳播。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "向任課老師說明需確認的移動時間",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師準備向任課老師確認轉場安排，不代替教務作正式認定。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我不是拖拖拉拉，是另一條路真的繞很遠。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師自己的需求或擔憂；不向未在場者自動傳播。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "協調是否有不影響學習的轉場安排",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生提出較早收拾器材的可行構想，仍待任課老師同意。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我不是拖拖拉拉，是另一條路真的繞很遠。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師自己的需求或擔憂；不向未在場者自動傳播。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "總不能叫樓梯長出電梯吧，我們查查怎麼辦",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生願意再說明轉場困難，導師沒有把他貼上遲到標籤。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我不是拖拖拉拉，是另一條路真的繞很遠。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師自己的需求或擔憂；不向未在場者自動傳播。"
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
      "id": "content:18b-t03-01-02",
      "topicId": "T03-01",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-01-02",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "4-3",
        "4-2",
        "3-4"
      ],
      "additionalCodes": [
        "1-3",
        "3-1",
        "2-2"
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
        "reason": "同一學生的獨立接觸情境；依正式抽選、學籍、時段與冷卻資格決定"
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
      "resourceId": "content:18b-t03-01-03",
      "definitionId": "content:18b-t03-01-03",
      "version": "1",
      "topicId": "T03-01",
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
              "text": "學生把一疊掃描講義放上桌，說使用的閱讀輔助工具只能念出頁碼，無法讀出內文。",
              "speaker": null,
              "scene": "school:teachers-office",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我不是不要讀這份講義，是它對我的工具來說像一張照片。",
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
              "text": "先檢查是哪種檔案格式造成障礙",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師確認學生反映的檔案問題，仍需向原製作者核對。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我不是不要讀這份講義，是它對我的工具來說像一張照片。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師自己的需求或擔憂；不向未在場者自動傳播。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "請科任協助提供可讀取版本",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師提出可讀取文字版本需求，科任尚未回覆。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我不是不要讀這份講義，是它對我的工具來說像一張照片。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師自己的需求或擔憂；不向未在場者自動傳播。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "討論近期暫時可使用的資訊取得方式",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生選擇先利用合法取得的文字筆記補足本節內容，無法視為正式解決。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我不是不要讀這份講義，是它對我的工具來說像一張照片。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師自己的需求或擔憂；不向未在場者自動傳播。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "你指出的是教材格式問題，不是你的問題",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生知道自己的需求被記下，未因此被要求公開輔具資訊。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我不是不要讀這份講義，是它對我的工具來說像一張照片。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師自己的需求或擔憂；不向未在場者自動傳播。"
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
      "id": "content:18b-t03-01-03",
      "topicId": "T03-01",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-01-03",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "4-3",
        "4-2",
        "3-4"
      ],
      "additionalCodes": [
        "1-3",
        "3-1",
        "2-2"
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
        "reason": "同一學生的獨立接觸情境；依正式抽選、學籍、時段與冷卻資格決定"
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
      "resourceId": "content:18b-t03-01-04",
      "definitionId": "content:18b-t03-01-04",
      "version": "1",
      "topicId": "T03-01",
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
              "text": "學生發現體育老師預先把自己列進觀摩組，但他原本想試試適合自己的活動。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我還沒說不能做，怎麼就幫我決定了？",
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
              "text": "先問學生希望參與的活動與界線",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生說明希望參與的部分，尚未確認活動是否適合。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我還沒說不能做，怎麼就幫我決定了？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師自己的需求或擔憂；不向未在場者自動傳播。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "向體育教師反映需個別確認而非預設排除",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師準備與體育教師溝通學生意願與安全評估，不直接決定活動資格。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我還沒說不能做，怎麼就幫我決定了？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師自己的需求或擔憂；不向未在場者自動傳播。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "協助釐清安全與替代活動的正式安排",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生提出兩項願意嘗試的替代活動，仍待相關人員評估。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我還沒說不能做，怎麼就幫我決定了？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師自己的需求或擔憂；不向未在場者自動傳播。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "至少要先問過你，這點我站在你這邊",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生表達被排除的失落，導師沒有承諾所有活動均可參加。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我還沒說不能做，怎麼就幫我決定了？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師自己的需求或擔憂；不向未在場者自動傳播。"
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
      "id": "content:18b-t03-01-04",
      "topicId": "T03-01",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-01-04",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "4-3",
        "4-2",
        "3-4"
      ],
      "additionalCodes": [
        "1-3",
        "3-1",
        "2-2"
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
        "reason": "同一學生的獨立接觸情境；依正式抽選、學籍、時段與冷卻資格決定"
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
      "resourceId": "content:18b-t03-01-05",
      "definitionId": "content:18b-t03-01-05",
      "version": "1",
      "topicId": "T03-01",
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
              "text": "午餐時，學生帶著作業本來問你，科任昨天口頭改過期限，他只記得日期中的一部分。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "不是要找藉口，我真的不知道他最後說的是週三還週四。",
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
              "text": "先釐清學生已記錄的部分與未知資訊",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師整理學生記得的內容，未把其記憶當正式通知。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "不是要找藉口，我真的不知道他最後說的是週三還週四。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師自己的需求或擔憂；不向未在場者自動傳播。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "協助向科任核對正式截止日",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師向科任提出確認截止日的需求，答案尚未取得。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "不是要找藉口，我真的不知道他最後說的是週三還週四。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師自己的需求或擔憂；不向未在場者自動傳播。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "請學生列出適合自己的提醒方式",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生寫下希望使用的文字提醒方式，尚待科任採用。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "不是要找藉口，我真的不知道他最後說的是週三還週四。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師自己的需求或擔憂；不向未在場者自動傳播。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "期限這種事用猜的，誰都會焦慮",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生知道可以查證，沒有因漏聽就被認定不負責。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "不是要找藉口，我真的不知道他最後說的是週三還週四。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師自己的需求或擔憂；不向未在場者自動傳播。"
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
      "id": "content:18b-t03-01-05",
      "topicId": "T03-01",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-01-05",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "4-3",
        "4-2",
        "3-4"
      ],
      "additionalCodes": [
        "1-3",
        "3-1",
        "2-2"
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
        "reason": "同一學生的獨立接觸情境；依正式抽選、學籍、時段與冷卻資格決定"
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
      "resourceId": "content:18b-t03-01-06",
      "definitionId": "content:18b-t03-01-06",
      "version": "1",
      "topicId": "T03-01",
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
              "text": "班級活動宣布在看臺上集合，學生指著場地圖問能不能和大家待在同一區，而非被安排在遠處。",
              "speaker": null,
              "scene": "school:courtyard",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我想跟同學一起看，不是自己在下面聽聲音。",
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
              "text": "確認集合場地的實際無障礙路線",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師記下學生希望共同參與的位置，尚未確認場地可及性。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我想跟同學一起看，不是自己在下面聽聲音。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師自己的需求或擔憂；不向未在場者自動傳播。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "請活動負責單位評估共同參與位置",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師向活動負責單位提出位置需求，沒有自行更改管制配置。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我想跟同學一起看，不是自己在下面聽聲音。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師自己的需求或擔憂；不向未在場者自動傳播。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "與學生討論可接受的替代觀賞方式",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生提出偏好的替代位置，仍以現場安全與其同意為前提。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我想跟同學一起看，不是自己在下面聽聲音。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師自己的需求或擔憂；不向未在場者自動傳播。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "你本來就是班上的一員，位置不能隨便決定",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生表達不想被隔離的感受，導師承諾先查場地而非保證結果。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我想跟同學一起看，不是自己在下面聽聲音。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師自己的需求或擔憂；不向未在場者自動傳播。"
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
      "id": "content:18b-t03-01-06",
      "topicId": "T03-01",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-01-06",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "4-3",
        "4-2",
        "3-4"
      ],
      "additionalCodes": [
        "1-3",
        "3-1",
        "2-2"
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
        "reason": "同一學生的獨立接觸情境；依正式抽選、學籍、時段與冷卻資格決定"
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
      "resourceId": "content:18b-t03-01-07",
      "definitionId": "content:18b-t03-01-07",
      "version": "1",
      "topicId": "T03-01",
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
              "text": "段考前，學生表示預定考場的桌下空間無法容納自己使用的輔具，擔心被當成臨時要求換位。",
              "speaker": null,
              "scene": "school:teachers-office",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我不想考試當天才被一堆人看著搬桌子。",
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
              "id": "clarify",
              "text": "先確認考場桌椅的實際使用需求",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師確認學生所述的桌椅使用需求，尚未確認考場配置。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我不想考試當天才被一堆人看著搬桌子。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師自己的需求或擔憂；不向未在場者自動傳播。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "依校內評量安排程序反映合適座位",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師提出評量場地協調需求，正式安排仍待權責單位決定。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我不想考試當天才被一堆人看著搬桌子。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師自己的需求或擔憂；不向未在場者自動傳播。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "協助學生提前列出必要設備條件",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生整理出空間與設備條件，未涉及測驗內容變更。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我不想考試當天才被一堆人看著搬桌子。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師自己的需求或擔憂；不向未在場者自動傳播。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "提早講很好，至少不用當天全場搬家",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生願意提前反映需求，導師不公開其私人情況。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我不想考試當天才被一堆人看著搬桌子。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師自己的需求或擔憂；不向未在場者自動傳播。"
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
      "id": "content:18b-t03-01-07",
      "topicId": "T03-01",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-01-07",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "4-3",
        "4-2",
        "3-4"
      ],
      "additionalCodes": [
        "1-3",
        "3-1",
        "2-2"
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
        "reason": "同一學生的獨立接觸情境；依正式抽選、學籍、時段與冷卻資格決定"
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
      "resourceId": "content:18b-t03-01-08",
      "definitionId": "content:18b-t03-01-08",
      "version": "1",
      "topicId": "T03-01",
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
              "text": "防災演練公告貼出後，學生發現班級名單上直接寫著『兩位同學抬他下樓』，從未有人問過他。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我最怕的是大家一緊張就硬拉我，反而更危險。",
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
              "text": "先詢問學生已知的安全需求與意願",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師記下學生擔心的搬運風險，未自行設計救援技術。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我最怕的是大家一緊張就硬拉我，反而更危險。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師自己的需求或擔憂；不向未在場者自動傳播。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "立即請校方負責人核對專業疏散方案",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師要求校方權責人員核對並更正未確認的疏散分工。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我最怕的是大家一緊張就硬拉我，反而更危險。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師自己的需求或擔憂；不向未在場者自動傳播。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "確認同學是否誤以為可以自行搬運",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "導師提醒班級不可自行搬運同學，正式應變方式仍待校方說明。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我最怕的是大家一緊張就硬拉我，反而更危險。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師自己的需求或擔憂；不向未在場者自動傳播。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "這個不能靠熱心亂來，我們先把安全方式弄清楚",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生知道導師會優先確認安全，不以玩笑掩蓋演練風險。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我最怕的是大家一緊張就硬拉我，反而更危險。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師自己的需求或擔憂；不向未在場者自動傳播。"
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
      "id": "content:18b-t03-01-08",
      "topicId": "T03-01",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-01-08",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "4-3",
        "4-2",
        "3-4"
      ],
      "additionalCodes": [
        "1-3",
        "3-1",
        "2-2"
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
        "reason": "同一學生的獨立接觸情境；依正式抽選、學籍、時段與冷卻資格決定"
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
      "resourceId": "content:18b-t03-01-09",
      "definitionId": "content:18b-t03-01-09",
      "version": "1",
      "topicId": "T03-01",
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
              "text": "上課影片播放一半，學生在筆記本上寫下『剛才那句沒聽清楚』，但擔心一問全班都會回頭。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我想看懂，不想每次都變成全班在看我。",
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
              "text": "先問學生缺漏的是哪些資訊",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生指出未掌握的影片段落，導師不推定聽力或診斷原因。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我想看懂，不想每次都變成全班在看我。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師自己的需求或擔憂；不向未在場者自動傳播。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "向科任反映字幕或文字重點需求",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師提出字幕或文字摘要需求，尚待科任處理。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我想看懂，不想每次都變成全班在看我。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師自己的需求或擔憂；不向未在場者自動傳播。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "討論是否能在不公開個資下取得摘要",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生決定先記錄兩個重點問題，以便課後查證。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我想看懂，不想每次都變成全班在看我。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師自己的需求或擔憂；不向未在場者自動傳播。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "想弄懂內容很正常，不用先向全班解釋",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生同意由導師私下協調，不必向全班揭露需求。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我想看懂，不想每次都變成全班在看我。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師自己的需求或擔憂；不向未在場者自動傳播。"
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
      "id": "content:18b-t03-01-09",
      "topicId": "T03-01",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-01-09",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "4-3",
        "4-2",
        "3-4"
      ],
      "additionalCodes": [
        "1-3",
        "3-1",
        "2-2"
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
        "reason": "同一學生的獨立接觸情境；依正式抽選、學籍、時段與冷卻資格決定"
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
      "resourceId": "content:18b-t03-01-10",
      "definitionId": "content:18b-t03-01-10",
      "version": "1",
      "topicId": "T03-01",
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
              "text": "晨會宣導要求學生起立回應，學生事後詢問自己坐著回答是否會被記為不配合。",
              "speaker": null,
              "scene": "school:auditorium",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我可以清楚回答，但站起來真的不方便。",
              "speaker": "participant",
              "scene": "school:auditorium",
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
              "text": "先確認活動要求與學生實際能力",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師確認學生擔心的點名要求，尚無正式不配合紀錄。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我可以清楚回答，但站起來真的不方便。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師自己的需求或擔憂；不向未在場者自動傳播。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "向活動主持單位詢問等效參與方式",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師向主持單位詢問等效回應方式，不擅自豁免正式規範。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我可以清楚回答，但站起來真的不方便。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師自己的需求或擔憂；不向未在場者自動傳播。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "與學生討論不需公開原因的回應方式",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生提出以口頭回應替代站立的偏好，仍待單位確認。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我可以清楚回答，但站起來真的不方便。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師自己的需求或擔憂；不向未在場者自動傳播。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "回答得出來就有參與，不必硬撐給人看",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生理解導師會維護其參與權益而非要求當眾說明原因。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我可以清楚回答，但站起來真的不方便。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師自己的需求或擔憂；不向未在場者自動傳播。"
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
      "id": "content:18b-t03-01-10",
      "topicId": "T03-01",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-01-10",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "4-3",
        "4-2",
        "3-4"
      ],
      "additionalCodes": [
        "1-3",
        "3-1",
        "2-2"
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
        "reason": "同一學生的獨立接觸情境；依正式抽選、學籍、時段與冷卻資格決定"
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
      "resourceId": "content:18b-t03-01-11",
      "definitionId": "content:18b-t03-01-11",
      "version": "1",
      "topicId": "T03-01",
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
              "text": "學生排隊拿餐時，推餐車和等候隊伍擠成一團，輔具難以轉彎。",
              "speaker": null,
              "scene": "school:courtyard",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "不是想插隊，我是根本轉不過那個角。",
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
              "text": "陪學生確認哪個位置造成擁堵",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師確認轉角空間不足的反映，尚未調整任何設施。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "不是想插隊，我是根本轉不過那個角。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師自己的需求或擔憂；不向未在場者自動傳播。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "和餐務管理人員討論動線調整",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師向餐務管理人員提出動線改善需求，等待場地評估。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "不是想插隊，我是根本轉不過那個角。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師自己的需求或擔憂；不向未在場者自動傳播。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "詢問學生比較願意使用哪條通道",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生指出自己較希望使用的通道，尚未認定該通道安全。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "不是想插隊，我是根本轉不過那個角。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師自己的需求或擔憂；不向未在場者自動傳播。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "這不是插隊問題，是大家的路都被堵住了",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生知道導師不會將通行需求描述為特權。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "不是想插隊，我是根本轉不過那個角。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師自己的需求或擔憂；不向未在場者自動傳播。"
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
      "id": "content:18b-t03-01-11",
      "topicId": "T03-01",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-01-11",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "4-3",
        "4-2",
        "3-4"
      ],
      "additionalCodes": [
        "1-3",
        "3-1",
        "2-2"
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
        "reason": "同一學生的獨立接觸情境；依正式抽選、學籍、時段與冷卻資格決定"
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
      "resourceId": "content:18b-t03-01-12",
      "definitionId": "content:18b-t03-01-12",
      "version": "1",
      "topicId": "T03-01",
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
              "text": "學生希望回家重聽上課說明，但有人擔心錄音會收進同學發言並被傳到群組。",
              "speaker": null,
              "scene": "school:teachers-office",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我只是想複習，不想讓任何人被錄了還不知道。",
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
              "text": "先確認學生真正需要的學習資訊",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師區分複習需求和錄音方式，尚未同意錄製課堂。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我只是想複習，不想讓任何人被錄了還不知道。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師自己的需求或擔憂；不向未在場者自動傳播。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "向任課教師詢問合法的錄音及使用規則",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師向科任確認授權與保存規則，不允許私下散布錄音。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我只是想複習，不想讓任何人被錄了還不知道。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師自己的需求或擔憂；不向未在場者自動傳播。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "討論不涉及同學聲音的替代材料",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生列出可接受的文字重點或老師自錄摘要替代方案。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我只是想複習，不想讓任何人被錄了還不知道。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師自己的需求或擔憂；不向未在場者自動傳播。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "你有想到別人的隱私，這點很重要",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生表示願意依隱私規範尋求支持，未取得錄音授權。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我只是想複習，不想讓任何人被錄了還不知道。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師自己的需求或擔憂；不向未在場者自動傳播。"
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
      "id": "content:18b-t03-01-12",
      "topicId": "T03-01",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-01-12",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "4-3",
        "4-2",
        "3-4"
      ],
      "additionalCodes": [
        "1-3",
        "3-1",
        "2-2"
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
        "reason": "同一學生的獨立接觸情境；依正式抽選、學籍、時段與冷卻資格決定"
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
      "resourceId": "content:18b-t03-01-13",
      "definitionId": "content:18b-t03-01-13",
      "version": "1",
      "topicId": "T03-01",
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
              "text": "學生說社團表單用鍵盤操作時焦點一直跳掉，最後送出了空白資料。",
              "speaker": null,
              "scene": "school:administration",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "它一直說我沒填，可是我根本選不到那一欄。",
              "speaker": "participant",
              "scene": "school:administration",
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
              "text": "先確認表單操作的實際障礙",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師記下表單操作問題，尚未認定報名失敗的唯一原因。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "它一直說我沒填，可是我根本選不到那一欄。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師自己的需求或擔憂；不向未在場者自動傳播。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "向社團承辦單位反映無障礙填報需求",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師轉達無障礙報名需求，承辦單位尚未確認處理方式。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "它一直說我沒填，可是我根本選不到那一欄。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師自己的需求或擔憂；不向未在場者自動傳播。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "協助詢問有無正式替代報名管道",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生知道可以詢問正式替代填報管道，但不保證已報名成功。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "它一直說我沒填，可是我根本選不到那一欄。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師自己的需求或擔憂；不向未在場者自動傳播。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "是表單在挑人，不該讓你自己背鍋",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生不再被要求自行向全班解釋輔助科技使用方式。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "它一直說我沒填，可是我根本選不到那一欄。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師自己的需求或擔憂；不向未在場者自動傳播。"
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
      "id": "content:18b-t03-01-13",
      "topicId": "T03-01",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-01-13",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "4-3",
        "4-2",
        "3-4"
      ],
      "additionalCodes": [
        "1-3",
        "3-1",
        "2-2"
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
        "reason": "同一學生的獨立接觸情境；依正式抽選、學籍、時段與冷卻資格決定"
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
      "resourceId": "content:18b-t03-01-14",
      "definitionId": "content:18b-t03-01-14",
      "version": "1",
      "topicId": "T03-01",
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
              "text": "班會討論是否每週抽籤換座位，學生私下說自己需要特定視線和通道，但不想成為反對票。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我不反對大家換座位，只希望我的位置先能用。",
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
              "text": "先釐清座位需求與可調範圍",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師確認學生希望保留的座位條件，尚未修改班規。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我不反對大家換座位，只希望我的位置先能用。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師自己的需求或擔憂；不向未在場者自動傳播。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "在不公開個人原因下調整抽籤方案",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師提出保留必要座位條件後再抽籤的討論方向，待班級決議。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我不反對大家換座位，只希望我的位置先能用。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師自己的需求或擔憂；不向未在場者自動傳播。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "詢問學生是否願意參與座位規則討論",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生選擇暫不公開說明個人需求，導師尊重其界線。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我不反對大家換座位，只希望我的位置先能用。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師自己的需求或擔憂；不向未在場者自動傳播。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "班規要照顧全班，也包含你",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生知道班級活動可以討論兼容方案而非非此即彼。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我不反對大家換座位，只希望我的位置先能用。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師自己的需求或擔憂；不向未在場者自動傳播。"
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
      "id": "content:18b-t03-01-14",
      "topicId": "T03-01",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-01-14",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "4-3",
        "4-2",
        "3-4"
      ],
      "additionalCodes": [
        "1-3",
        "3-1",
        "2-2"
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
        "reason": "同一學生的獨立接觸情境；依正式抽選、學籍、時段與冷卻資格決定"
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
      "resourceId": "content:18b-t03-01-15",
      "definitionId": "content:18b-t03-01-15",
      "version": "1",
      "topicId": "T03-01",
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
              "text": "校內成果發表前一天，通知把活動改到沒有電梯的舊館二樓；學生已練習兩週準備上臺。",
              "speaker": null,
              "scene": "school:auditorium",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我不是只想去看，我的作品也在名單裡。",
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
              "text": "先核對新場地動線與活動安排",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師核對場地異動通知，尚未確認新場地全部出入口。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我不是只想去看，我的作品也在名單裡。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師自己的需求或擔憂；不向未在場者自動傳播。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "立即向主辦單位提出可及場地需求",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師向主辦單位提出場地可及性問題，尚未取得正式調整。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我不是只想去看，我的作品也在名單裡。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師自己的需求或擔憂；不向未在場者自動傳播。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "與學生討論保留本人上臺參與的替代方案",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生表達希望親自發表而非由他人代讀，方案仍待協調。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我不是只想去看，我的作品也在名單裡。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師自己的需求或擔憂；不向未在場者自動傳播。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "準備這麼久，不能一句換場地就當沒這回事",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生知道導師會就參與方式向主辦單位反映，不保證一定換回。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我不是只想去看，我的作品也在名單裡。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師自己的需求或擔憂；不向未在場者自動傳播。"
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
      "id": "content:18b-t03-01-15",
      "topicId": "T03-01",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-01-15",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "4-3",
        "4-2",
        "3-4"
      ],
      "additionalCodes": [
        "1-3",
        "3-1",
        "2-2"
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
        "reason": "同一學生的獨立接觸情境；依正式抽選、學籍、時段與冷卻資格決定"
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
      "resourceId": "content:18b-t03-01-16",
      "definitionId": "content:18b-t03-01-16",
      "version": "1",
      "topicId": "T03-01",
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
              "text": "學生說分組活動時同時有三組人在說話，自己分不清老師指令，同學卻抱怨他故意不理人。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我有在聽，可是所有聲音都擠在一起。",
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
              "text": "先釐清哪些指令沒有被接收到",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生指出漏聽指令的具體情境，尚未認定其生理原因。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我有在聽，可是所有聲音都擠在一起。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師自己的需求或擔憂；不向未在場者自動傳播。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "與科任討論分組時的文字提示",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師提出把關鍵指令補成文字的建議，待科任評估。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我有在聽，可是所有聲音都擠在一起。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師自己的需求或擔憂；不向未在場者自動傳播。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "協助小組確認清楚的任務交接方式",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生同意和小組先確認每項任務要交給誰，尚未保證不再漏聽。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我有在聽，可是所有聲音都擠在一起。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師自己的需求或擔憂；不向未在場者自動傳播。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "聽不到不是不在乎，我們別急著怪人",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "導師不將學生描述為故意不合作，仍需向其他人釐清各自觀察。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我有在聽，可是所有聲音都擠在一起。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師自己的需求或擔憂；不向未在場者自動傳播。"
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
      "id": "content:18b-t03-01-16",
      "topicId": "T03-01",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-01-16",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "4-3",
        "4-2",
        "3-4"
      ],
      "additionalCodes": [
        "1-3",
        "3-1",
        "2-2"
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
        "reason": "同一學生的獨立接觸情境；依正式抽選、學籍、時段與冷卻資格決定"
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
      "resourceId": "content:18b-t03-01-17",
      "definitionId": "content:18b-t03-01-17",
      "version": "1",
      "topicId": "T03-01",
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
              "text": "班上有人議論隔壁考場某位同學比較晚交卷，問導師是否有人被『特別放水』。",
              "speaker": null,
              "scene": "school:teachers-office",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "老師，他多寫幾分鐘不是比我們有利嗎？",
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
              "text": "先澄清傳聞不能當作個人事實",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師確認學生是在詢問傳聞，沒有證實任何特定考生安排。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "老師，他多寫幾分鐘不是比我們有利嗎？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師自己的需求或擔憂；不向未在場者自動傳播。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "以不揭露個資方式說明正式評量調整原則",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師說明公平與合理調整須依正式規定，不透露個別學生資格。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "老師，他多寫幾分鐘不是比我們有利嗎？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師自己的需求或擔憂；不向未在場者自動傳播。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "提醒同學停止追問特定人的私人情況",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "導師提醒不得以猜測散布個人資料，傳聞是否停止仍待觀察。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "老師，他多寫幾分鐘不是比我們有利嗎？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師自己的需求或擔憂；不向未在場者自動傳播。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "公平不是每個人的安排都看起來一模一樣",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生聽到公平不必等於同一方式，尚未對制度作正式認定。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "老師，他多寫幾分鐘不是比我們有利嗎？",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師自己的需求或擔憂；不向未在場者自動傳播。"
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
      "id": "content:18b-t03-01-17",
      "topicId": "T03-01",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-01-17",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "4-3",
        "4-2",
        "3-4"
      ],
      "additionalCodes": [
        "1-3",
        "3-1",
        "2-2"
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
        "reason": "同一學生的獨立接觸情境；依正式抽選、學籍、時段與冷卻資格決定"
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
      "resourceId": "content:18b-t03-01-18",
      "definitionId": "content:18b-t03-01-18",
      "version": "1",
      "topicId": "T03-01",
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
              "text": "學生在布置教室時自己要貼海報，同學卻搶先接走膠帶和作品，說『你不用做啦』。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我知道他是好意，可是我也想自己完成。",
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
              "text": "先問學生希望自己負責哪部分",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生指出自己想完成的海報工作，導師尚未分派新任務。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我知道他是好意，可是我也想自己完成。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師自己的需求或擔憂；不向未在場者自動傳播。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "提醒協助前先徵詢當事人意願",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師提出先詢問再協助的班級約定，同學仍需理解與實踐。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我知道他是好意，可是我也想自己完成。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師自己的需求或擔憂；不向未在場者自動傳播。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "安排能由學生自主完成的具體任務",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生選擇自行操作可完成的部分，導師沒有替他保證完成速度。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我知道他是好意，可是我也想自己完成。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師自己的需求或擔憂；不向未在場者自動傳播。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "他想幫忙是好意，你想自己做也一樣重要",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生表達被過度協助的不舒服，導師沒有責怪善意同學的動機。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我知道他是好意，可是我也想自己完成。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師自己的需求或擔憂；不向未在場者自動傳播。"
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
      "id": "content:18b-t03-01-18",
      "topicId": "T03-01",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-01-18",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "4-3",
        "4-2",
        "3-4"
      ],
      "additionalCodes": [
        "1-3",
        "3-1",
        "2-2"
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
        "reason": "同一學生的獨立接觸情境；依正式抽選、學籍、時段與冷卻資格決定"
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
      "resourceId": "content:18b-t03-01-19",
      "definitionId": "content:18b-t03-01-19",
      "version": "1",
      "topicId": "T03-01",
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
              "text": "家長傳訊希望孩子不必參加任何班級活動，學生卻私下問能否先嘗試較短的活動段落。",
              "speaker": null,
              "scene": "school:teachers-office",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "我沒有說全部都不要，我只是怕做不到最後。",
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
              "id": "clarify",
              "text": "先確認學生本人想參加的部分",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生說明想先參與部分活動，導師不宣稱已取得家長同意。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我沒有說全部都不要，我只是怕做不到最後。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師自己的需求或擔憂；不向未在場者自動傳播。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "與家長分別核對其擔憂和學生意願",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師準備釐清家長意見與學生本人意願，尚未作出正式安排。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我沒有說全部都不要，我只是怕做不到最後。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師自己的需求或擔憂；不向未在場者自動傳播。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "依活動安全及校內程序討論可行調整",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生列出願意嘗試的段落，待校內相關人員評估安全與可行性。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我沒有說全部都不要，我只是怕做不到最後。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師自己的需求或擔憂；不向未在場者自動傳播。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "不必一次做到滿，但也不該先幫你決定退出",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生感受到自己的意願受重視，仍需依法依校規協調。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "我沒有說全部都不要，我只是怕做不到最後。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師自己的需求或擔憂；不向未在場者自動傳播。"
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
      "id": "content:18b-t03-01-19",
      "topicId": "T03-01",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-01-19",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "4-3",
        "4-2",
        "3-4"
      ],
      "additionalCodes": [
        "1-3",
        "3-1",
        "2-2"
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
        "reason": "同一學生的獨立接觸情境；依正式抽選、學籍、時段與冷卻資格決定"
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
      "resourceId": "content:18b-t03-01-20",
      "definitionId": "content:18b-t03-01-20",
      "version": "1",
      "topicId": "T03-01",
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
              "text": "第一節前，學生發現輔助設備沒電，當天要用它閱讀科任的電子題目。",
              "speaker": null,
              "scene": "school:classroom",
              "cast": [],
              "presentation": "narration"
            },
            {
              "order": 2,
              "text": "不是忘記帶，是電池突然不吃充電了。",
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
              "text": "先確認今天哪些資訊取得會受影響",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "學生列出本日可能無法使用的教材，尚未確認設備故障原因。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "不是忘記帶，是電池突然不吃充電了。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師自己的需求或擔憂；不向未在場者自動傳播。"
                    }
                  ]
                }
              }
            },
            {
              "id": "coordinate",
              "text": "請科任協調當節可用的等效教材",
              "kind": "action",
              "emotional": false,
              "outcome": {
                "fact": "導師向科任提出替代教材需求，尚未取得該教材。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "不是忘記帶，是電池突然不吃充電了。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師自己的需求或擔憂；不向未在場者自動傳播。"
                    }
                  ]
                }
              }
            },
            {
              "id": "plan",
              "text": "協助確認校內是否有合法可借用設備",
              "kind": "defer",
              "emotional": false,
              "outcome": {
                "fact": "學生知道可向校內權責人員詢問借用方式，沒有直接領取設備。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "不是忘記帶，是電池突然不吃充電了。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師自己的需求或擔憂；不向未在場者自動傳播。"
                    }
                  ]
                }
              }
            },
            {
              "id": "empathy",
              "text": "設備出狀況先處理，不用急著責怪自己",
              "kind": "support",
              "emotional": true,
              "outcome": {
                "fact": "學生獲得暫時支持，導師仍須安排必要的課堂資訊銜接。",
                "claims": [
                  {
                    "role": "participant",
                    "statement": "不是忘記帶，是電池突然不吃充電了。",
                    "belief": "believed",
                    "visible": false
                  }
                ],
                "changes": [],
                "historyCodes": [],
                "next": {
                  "stage": null,
                  "afterDays": 0
                },
                "world": {
                  "subjects": [
                    "teacher",
                    "participant"
                  ],
                  "witnesses": [
                    "teacher",
                    "participant"
                  ],
                  "affected": [
                    "participant"
                  ],
                  "contacts": [
                    [
                      "teacher",
                      "participant"
                    ]
                  ],
                  "transmissions": [
                    {
                      "fromRole": "participant",
                      "toRole": "teacher",
                      "claimIndex": 0,
                      "description": "學生當面告知導師自己的需求或擔憂；不向未在場者自動傳播。"
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
      "id": "content:18b-t03-01-20",
      "topicId": "T03-01",
      "type": "direct",
      "content": {
        "resourceId": "content:18b-t03-01-20",
        "version": "1",
        "status": "engineering-test"
      },
      "coreCodes": [
        "4-3",
        "4-2",
        "3-4"
      ],
      "additionalCodes": [
        "1-3",
        "3-1",
        "2-2"
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
        "reason": "同一學生的獨立接觸情境；依正式抽選、學籍、時段與冷卻資格決定"
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
