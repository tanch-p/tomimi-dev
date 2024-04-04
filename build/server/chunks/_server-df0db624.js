const stagesList = [
  {
    id: "ro1_b_1",
    levelId: "level_rogue1_b-1",
    tags: [
      "rogue_phantom"
    ],
    category: "boss",
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-DF",
    name_zh: "开门请当心",
    name_ja: "敷居に注意を",
    name_en: "Mind_the_Doors",
    description_zh: "在对高塔术师的遗弃物进行改装后，它成为了古堡内门无休无眠的守护者，同时，也是部分演员新手入门的“门槛”。",
    description_ja: "高塔の術師が遺棄した物だが、改修されてガーディアンとなった。今は古城の内門を不眠不休で守りながら、一部の新人役者にとっての「敷居」を高くしている。",
    description_en: "The spire caster's abandoned trinkets were modified, eventually becoming the castle's indefatigable guardian. At the same time, it has also proven to be the some of the new actors' barrier to entry.",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: null,
    eliteDesc_ja: null,
    eliteDesc_en: null,
    elite_mods: null,
    routes: [
      {
        title: "route_left",
        type: "video",
        youtube_src: "r-6HEncEBU0",
        bilibili_src: null
      },
      {
        title: "route_right",
        type: "video",
        youtube_src: "jJBzNmj26nA",
        bilibili_src: null
      }
    ],
    floors: [
      3
    ],
    sp_terrain: null,
    sp_enemy: null,
    enemies: [
      {
        id: "enemy_2003_rockman",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 8e4
        }
      },
      {
        id: "enemy_1015_litamr",
        level: 0,
        min_count: 9,
        max_count: 9,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 3400
        }
      },
      {
        id: "enemy_1036_amraoe",
        level: 0,
        min_count: 1,
        max_count: 6,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 1e4,
          atk: 420
        }
      },
      {
        id: "enemy_1014_rogue",
        level: 0,
        min_count: 14,
        max_count: 14,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 2600,
          atk: 420
        }
      },
      {
        id: "enemy_1006_shield_2",
        level: 0,
        min_count: 0,
        max_count: 4,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 12e3
        }
      }
    ]
  },
  {
    id: "ro1_b_2",
    levelId: "level_rogue1_b-2",
    tags: [
      "rogue_phantom"
    ],
    category: "boss",
    characterLimit: 6,
    initialCost: 0,
    costIncreaseTime: 1,
    code: "ISW-DF",
    name_zh: "大盗当头",
    name_ja: "天翔ける怪盗・劇団篇",
    name_en: "Theft_from_Above",
    description_zh: "一名飞天大盗刚刚偷了剧团的宝贝，而你正好在他的逃跑路线上。\n<@rolv.rem>场地中有略微减慢攻速但大幅提升对空攻击力的<防空符文>。</>",
    description_ja: "たった今、この天翔ける怪盗が劇団の宝を盗み出した。あなたはちょうど彼の逃走ルート上にいる。\n<@rolv.rem>戦場に配置した味方の攻撃速度がやや下がる代わりに対空攻撃力が大幅に上昇する<対空エリア>がある。</>",
    description_en: "A flying bandit just made off with the Troupe's treasured prize, and you just so happen to be in his path of escape.\n<@rolv.rem><Anti-Air Rune> Operators deployed on this tile have slightly reduced ASPD but greatly increased ATK when attacking Aerial units</>",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: null,
    eliteDesc_ja: null,
    eliteDesc_en: null,
    elite_mods: null,
    routes: [
      {
        title: "boss",
        type: "video",
        youtube_src: "c97PyuG3B40",
        bilibili_src: null
      }
    ],
    floors: [
      3
    ],
    sp_terrain: [
      {
        tileKey: "tile_gazebo",
        alias: null,
        blackboard: {
          attack_speed: 20,
          atk_scale: 1.7
        }
      }
    ],
    sp_enemy: null,
    enemies: [
      {
        id: "enemy_2004_balloon",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 7e4,
          atk: 500
        }
      },
      {
        id: "enemy_1017_defdrn",
        level: 0,
        min_count: 4,
        max_count: 4,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 8e3,
          def: 300
        }
      },
      {
        id: "enemy_1041_lazerd",
        level: 0,
        min_count: 7,
        max_count: 7,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 4e3,
          atk: 170,
          def: 200
        }
      },
      {
        id: "enemy_1009_lurker",
        level: 0,
        min_count: 19,
        max_count: 19,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 6e3,
          atk: 300,
          def: 130
        }
      },
      {
        id: "enemy_1019_jshoot_2",
        level: 0,
        min_count: 7,
        max_count: 7,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 5e3,
          atk: 380
        }
      },
      {
        id: "enemy_1023_jmage_2",
        level: 0,
        min_count: 5,
        max_count: 5,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 6e3,
          atk: 350
        }
      }
    ]
  },
  {
    id: "ro1_b_3",
    levelId: "level_rogue1_b-3",
    tags: [
      "rogue_phantom"
    ],
    category: "boss",
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-DF",
    name_zh: "恐怖传说",
    name_ja: "恐怖の都市伝説",
    name_en: "Terrifying_Legends",
    description_zh: "你看到了一个完全变异的狂暴感染者，他嚎叫着向你发起攻击。你想起了某个雷姆必拓的都市恐怖传说。\n<@rolv.rem>他在持续攻击时会提高攻击力和攻击速度。</>",
    description_ja: "完全に変異した狂暴な感染者がこちらへ向かって雄叫びを上げ、襲いかかってくる。それを見て、あなたはレム・ビリトンの恐ろしい都市伝説を思い出した。\n<@rolv.rem>彼が攻撃し続けている時、彼の攻撃力と攻撃速度が上昇する。</>",
    description_en: "You see a violent, completely mutated Infected. He howls and attacks you, reminding you of a particular, and terrifying, Rim Billiton legend.\n<@rolv.rem>His ATK and ASPD increase as he continuously attacks</>",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: null,
    eliteDesc_ja: null,
    eliteDesc_en: null,
    elite_mods: null,
    routes: [
      {
        title: "",
        type: "video",
        youtube_src: "lCd58jX1_g0",
        bilibili_src: null
      }
    ],
    floors: [
      3
    ],
    sp_terrain: null,
    sp_enemy: null,
    enemies: [
      {
        id: "enemy_2005_axetro",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 6e4,
          atk: 550
        }
      },
      {
        id: "enemy_1033_handax",
        level: 0,
        min_count: 7,
        max_count: 7,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 1e4
        }
      },
      {
        id: "enemy_1033_handax_2",
        level: 0,
        min_count: 4,
        max_count: 4,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 15e3
        }
      },
      {
        id: "enemy_1035_haxe",
        level: 0,
        min_count: 4,
        max_count: 4,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 15e3,
          res: 0
        }
      }
    ]
  },
  {
    id: "ro1_b_4",
    levelId: "level_rogue1_b-4",
    tags: [
      "rogue_phantom"
    ],
    category: "boss",
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-DF",
    name_zh: "悦耳杀机",
    name_ja: "殺戮の調べ",
    name_en: "Fatal_Melodies",
    description_zh: "颂偶一刻不停演奏着乐器，让悠扬琴声布满大厅。然而，当你仔细倾听，便会发现旋律下的刺耳噪音正在试图抢夺他人的意志。\n<@rolv.rem>他未被阻挡时会使全场我方单位持续受到法术伤害。</>",
    description_ja: "オートマトンは休むことなく楽器を演奏し、豊かなアコーディオンの音色がホールを満たす。だが注意深く耳を傾ければ、メロディに隠された耳を刺すようなノイズが、人の意思を奪い取ろうとしているのが分かるだろう。\n<@rolv.rem>ブロックされていない<流浪のオートマトン>は味方全員に継続して術ダメージを与える。</>",
    description_en: "The puppet plays his instrument unceasingly, filling the hall with a gentle melody. Yet, when you listen carefully, you notice that, behind the melody, there is an ear-piercing noise that attempts to seize the will of a listener.\n<@rolv.rem>When not blocked, continuously deals Arts damage to all allied units</>",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: null,
    eliteDesc_ja: null,
    eliteDesc_en: null,
    elite_mods: null,
    routes: [
      {
        title: "route_left",
        type: "video",
        youtube_src: "tXQktHRiGmg",
        bilibili_src: null
      },
      {
        title: "route_right",
        type: "video",
        youtube_src: "Df_6CpqdZdc",
        bilibili_src: null
      }
    ],
    floors: [
      3
    ],
    sp_terrain: [
      {
        tileKey: "tile_healing",
        alias: null,
        blackboard: {
          HP_RECOVERY_PER_SEC_BY_MAX_HP_RATIO: 0.03
        }
      }
    ],
    sp_enemy: null,
    enemies: [
      {
        id: "enemy_2013_csbot",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1051_norwiz",
        level: 0,
        min_count: 18,
        max_count: 19,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1031_mrogue",
        level: 0,
        min_count: 17,
        max_count: 18,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1031_mrogue_2",
        level: 0,
        min_count: 4,
        max_count: 4,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      }
    ]
  },
  {
    id: "ro1_b_5",
    levelId: "level_rogue1_b-5",
    tags: [
      "rogue_phantom"
    ],
    category: "boss",
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-DF",
    name_zh: "寒渊惜别",
    name_ja: "酷寒の惜別",
    name_en: "A_Cold_Separation",
    description_zh: "此地正在上演一出悲剧——雪祀亲卫南北相隔，想将自己掌握的信息透露给彼此，而他们必不得所愿。\n<@rolv.rem>他们其中一人倒下时，另外一人会继承倒下者的能力、作战能力大幅提升。</>",
    description_ja: "ここではちょうど悲劇を上演中だ――雪祭司の衛士は南北に分かれており、お互いの情報を交換しようとしているが、決して彼らの望み通りにはならないのだ。\n<@rolv.rem>相手のどちらか片方が倒れた時、もう片方が倒れた方の能力を受け継ぎ、戦闘能力が大幅に上昇する。</>",
    description_en: "A tragic tale is being performed on the stage right this moment—a Snowpriest and her bodyguard are separated from each other. They want to share the information they have with each other, but things are bound to never go their way.\n<@rolv.rem>When either of the two is incapacitated, the other will inherit all abilities of the fallen and see their combat abilities increased significantly</>",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: null,
    eliteDesc_ja: null,
    eliteDesc_en: null,
    elite_mods: null,
    routes: [
      {
        title: "route_left",
        type: "video",
        youtube_src: "4vpf9mMvNek",
        bilibili_src: null
      },
      {
        title: "route_right",
        type: "video",
        youtube_src: "x5iNEO3gslM",
        bilibili_src: null
      }
    ],
    floors: [
      3
    ],
    sp_terrain: null,
    sp_enemy: null,
    enemies: [
      {
        id: "enemy_2014_csicer",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2015_csicem",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1064_snsbr",
        level: 0,
        min_count: 9,
        max_count: 9,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1067_snslime",
        level: 0,
        min_count: 11,
        max_count: 11,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          atk: 270,
          talentBlackboard: [
            {
              key: "bug_explode_frost",
              duration: 5
            }
          ]
        }
      },
      {
        id: "enemy_1069_icebrk",
        level: 0,
        min_count: 4,
        max_count: 4,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      }
    ]
  },
  {
    id: "ro1_b_6",
    levelId: "level_rogue1_b-6",
    tags: [
      "rogue_phantom"
    ],
    category: "boss",
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-DF",
    name_zh: "覆水难收",
    name_ja: "戻る道なし",
    name_en: "The_Point_of_No_Return",
    description_zh: "拯救他。\n<@rolv.rem>场地中有可以阻挡敌人行进路线的<障碍物>。</>",
    description_ja: "彼を救え。\n<@rolv.rem>戦場に敵の進攻ルートを遮ることができる<障害物>が設置されている</>",
    description_en: "Rescue him. \n<@rolv.rem><Roadblocks> Block the enemy’s route</>",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: null,
    eliteDesc_ja: null,
    eliteDesc_en: null,
    elite_mods: null,
    routes: [
      {
        title: "boss",
        type: "video",
        youtube_src: "cWFdXdbnlSc",
        bilibili_src: null
      }
    ],
    floors: [
      5
    ],
    sp_terrain: null,
    sp_enemy: null,
    enemies: [
      {
        id: "enemy_2009_csaudc",
        level: 0,
        min_count: 12,
        max_count: 12,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2010_csdcr",
        level: 0,
        min_count: 17,
        max_count: 17,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2012_csbln",
        level: 0,
        min_count: 13,
        max_count: 13,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1087_ltwolf_2",
        level: 0,
        min_count: 28,
        max_count: 28,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1090_mdsnpr_2",
        level: 0,
        min_count: 4,
        max_count: 4,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1006_shield_3",
        level: 0,
        min_count: 5,
        max_count: 5,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2016_csphtm",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2017_csphts",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      }
    ]
  },
  {
    id: "ro1_b_7",
    levelId: "level_rogue1_b-7",
    tags: [
      "rogue_phantom"
    ],
    category: "boss",
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-DF",
    name_zh: "别无所求",
    name_ja: "最期の願い",
    name_en: "All_I_Ask_of_You",
    description_zh: "狂徒驱使着淳朴灵魂犯下恶行。你已见其满眼泪花，你应为其清偿夙愿。",
    description_ja: "狂人が無垢な魂を操って、悪事を繰り返している。彼らのつぶらな目に浮かぶ涙を見たからには、彼らの悲願を叶えてあげるべきだ。",
    description_en: "The kindhearted souls are being coerced to do wrong by the fanatics. The very sight brings you to tears, and it's time to put things right.",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: null,
    eliteDesc_ja: null,
    eliteDesc_en: null,
    elite_mods: null,
    routes: [
      {
        title: "boss",
        type: "video",
        youtube_src: "g09q4oBxNZc",
        bilibili_src: null
      }
    ],
    floors: [
      5
    ],
    sp_terrain: [
      {
        tileKey: "tile_hole",
        alias: null,
        blackboard: null
      }
    ],
    sp_enemy: null,
    enemies: [
      {
        id: "enemy_1099_nbkght_2",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1091_mdhmmr_2",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1060_emouse_2",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1172_dugago_2",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2011_csppt",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2018_csdoll",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      }
    ]
  },
  {
    id: "ro1_b_8",
    levelId: "level_rogue1_b-8",
    tags: [
      "rogue_phantom"
    ],
    category: "boss",
    characterLimit: 6,
    initialCost: 20,
    costIncreaseTime: 2,
    code: "ISW-DF",
    name_zh: "诸事不顺",
    name_ja: "茶番の終わり",
    name_en: "Twisted_Every_Way",
    description_zh: "你已把报幕人的局搅得支离破碎，他恨不得现在就把你置于死地。而在经历了旅途中的万般苦难后，你也对报幕人怀着相同的情感。\n<@rolv.rem>他使部署费用回复缓慢，并操纵<“报幕助手”>进行战斗；<“报幕助手”>周围的我方单位会攻击力降低并持续受到真实伤害。</>",
    description_ja: "あなたは司会者の計略を粉々にぶち壊した。彼は今、なんとしてもあなたを死の淵に突き落としたくてたまらない。冒険の旅で数多の苦難を乗り越えてきたあなたも、司会者に同じ思いを抱いている。\n<@rolv.rem>司会者はコストの自然回復速度を大幅に低下させ、<「司会アシスタント」>を操って戦いを仕掛けてくる。<「司会アシスタント」>は周囲の味方全員の攻撃力を低下させ、持続的に確定ダメージを与える。</>",
    description_en: "You have completely ruined the host's grand performance, and he wants nothing more than to end you right here and now. With all that you have been through on this journey, you feel the same toward him.\n<@rolv.rem>Natural DP regeneration is greatly reduced; <'Host's Assistant’> Nearby allies have reduced ATK and continuously receive True damage. </>",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: null,
    eliteDesc_ja: null,
    eliteDesc_en: null,
    elite_mods: null,
    routes: [
      {
        title: "boss",
        type: "video",
        youtube_src: "YRkuVgWUZi8",
        bilibili_src: null
      }
    ],
    floors: [
      6
    ],
    sp_terrain: null,
    sp_enemy: null,
    enemies: [
      {
        id: "enemy_2009_csaudc",
        level: 0,
        min_count: 16,
        max_count: 16,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2010_csdcr",
        level: 0,
        min_count: 4,
        max_count: 4,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2011_csppt",
        level: 0,
        min_count: 2,
        max_count: 2,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2019_cshost",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1086_ltsodr_2",
        level: 0,
        min_count: 24,
        max_count: 24,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1090_mdsnpr",
        level: 0,
        min_count: 8,
        max_count: 8,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      }
    ]
  },
  {
    id: "ro1_b_9",
    levelId: "level_rogue1_b-9",
    tags: [
      "rogue_phantom"
    ],
    category: "boss",
    characterLimit: 6,
    initialCost: 20,
    costIncreaseTime: 1,
    code: "ISW-DF",
    name_zh: "再启新篇",
    name_ja: "新章の起稿",
    name_en: "New_Chapter",
    description_zh: "将拙劣的手稿掷入火中，取出新的纸张，让我们重新开始。",
    description_ja: "拙い原稿を火へと投げ込み、新しい紙を取り出して、始めからやり直すとしよう。",
    description_en: "Throw the abandoned draft into the fire. Take out a new sheet of paper, and begin anew.",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: null,
    eliteDesc_ja: null,
    eliteDesc_en: null,
    elite_mods: null,
    routes: [
      {
        title: "boss",
        type: "video",
        youtube_src: "-EeObp_H68g",
        bilibili_src: null
      },
      {
        title: "lumen",
        type: "video",
        youtube_src: "NnjTM93R13E",
        bilibili_src: null
      }
    ],
    floors: [
      6
    ],
    sp_terrain: null,
    sp_enemy: null,
    enemies: [
      {
        id: "enemy_2011_csppt",
        level: 0,
        min_count: 4,
        max_count: 4,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2020_cswrtr",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1086_ltsodr_2",
        level: 0,
        min_count: 24,
        max_count: 24,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1089_ltlntc",
        level: 0,
        min_count: 22,
        max_count: 22,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1089_ltlntc_2",
        level: 0,
        min_count: 6,
        max_count: 6,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1134_diamd_2",
        level: 0,
        min_count: 6,
        max_count: 6,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      }
    ]
  },
  {
    id: "ro1_t_1",
    levelId: "level_rogue1_t-1",
    tags: [
      "rogue_phantom"
    ],
    category: "encounter",
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-DU",
    name_zh: "鸭爵的戏剧",
    name_ja: "ダック卿のステージ",
    name_en: "Duck_Lord's_Play",
    description_zh: "哥伦比亚著名商人鸭爵此刻正在舞台上乱窜，把源石锭撒得到处都是，快把他赶下来！\n<@rolv.rem>场地中有会损失生命但大幅提升攻击力和攻击速度的<活性源石>。</>",
    description_ja: "クルビアの有名な商人・ダック卿が、ステージを逃げ惑い、源石錐をあちこちにばらまいている。早く彼をステージから追い落とせ！\n<@rolv.rem>接触した敵味方に継続ダメージを与える代わりに、攻撃力と攻撃速度が大幅に上昇させる<活性源石>が戦場に存在する。</>",
    description_en: "The famous Columbian merchant Duck Lord runs amok on the stage, scattering Originium Ingots everywhere. Let's get him out of here!\n<@rolv.rem><Active Originium>Operators deployed on it and enemies who have passed it will take constant damage, but their ATK and ASPD will be increased significantly</>",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: null,
    eliteDesc_ja: null,
    eliteDesc_en: null,
    elite_mods: null,
    routes: [
      {
        title: "route_left",
        type: "video",
        youtube_src: "byEhQNKATQU",
        bilibili_src: null
      },
      {
        title: "route_right",
        type: "video",
        youtube_src: "mOhmOb8kBvs",
        bilibili_src: null
      }
    ],
    floors: [
      1,
      2
    ],
    sp_terrain: [
      {
        tileKey: "tile_infection",
        alias: null,
        blackboard: {
          duration: 300,
          damage: 90,
          atk: 0.2,
          attack_speed: 50
        }
      }
    ],
    sp_enemy: null,
    enemies: [
      {
        id: "enemy_2001_duckmi",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 9300,
          def: 330
        }
      },
      {
        id: "enemy_1017_defdrn",
        level: 0,
        min_count: 3,
        max_count: 3,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1047_sagent_2",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1047_sagent",
        level: 0,
        min_count: 2,
        max_count: 2,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      }
    ]
  },
  {
    id: "ro1_t_2",
    levelId: "level_rogue1_t-2",
    tags: [
      "rogue_phantom"
    ],
    category: "encounter",
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-DU",
    name_zh: "鸭爵的宴会",
    name_ja: "ダック卿のパーティー",
    name_en: "Duck_Lord's_Party",
    description_zh: "哥伦比亚著名商人鸭爵好像知道些关于古堡的情报，可别让他跑了！\n<@rolv.rem>场地中有会损失生命但大幅提升攻击力和攻击速度的<活性源石>。</>",
    description_ja: "クルビアの有名な商人・ダック卿は、古城に関する情報を知っているようだ。彼を逃がすな！\n<@rolv.rem>戦場に配置した味方及び通過した敵は継続してダメージを受けるが、攻撃力と攻撃速度が大幅に上昇する<活性源石>が存在する。</>",
    description_en: "Famous Columbian merchant Duck Lord seems to have some information about the castle. Don't let him get away!\n<@rolv.rem><Active Originium> Operators deployed on it and enemies who have passed it will take constant damage, but their ATK and ASPD will be increased significantly</>",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: null,
    eliteDesc_ja: null,
    eliteDesc_en: null,
    elite_mods: null,
    routes: [
      {
        title: "",
        type: "video",
        youtube_src: "hANty5THfwg",
        bilibili_src: null
      }
    ],
    floors: [
      3
    ],
    sp_terrain: [
      {
        tileKey: "tile_infection",
        alias: null,
        blackboard: {
          duration: 300,
          damage: 90,
          atk: 0.2,
          attack_speed: 50
        }
      }
    ],
    sp_enemy: null,
    enemies: [
      {
        id: "enemy_1000_gopro_3",
        level: 0,
        min_count: 76,
        max_count: 76,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 2500,
          atk: 350
        }
      },
      {
        id: "enemy_2001_duckmi",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 3e4,
          def: 320
        }
      }
    ]
  },
  {
    id: "ro1_t_3",
    levelId: "level_rogue1_t-3",
    tags: [
      "rogue_phantom"
    ],
    category: "encounter",
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-DU",
    name_zh: "高普尼克之拳",
    name_ja: "ゴプニクの挨拶",
    name_en: "Gopnik's_Fist",
    description_zh: "这位乌萨斯和人打招呼的方式就是见面来一拳。\n<@rolv.rem>场地中有会损失生命但大幅提升攻击力和攻击速度的<活性源石>。</>",
    description_ja: "このウルサスの挨拶の仕方は、出会い頭にパンチだ。\n<@rolv.rem>接触した敵味方に継続ダメージを与える代わりに、攻撃力と攻撃速度が大幅に上昇させる<活性源石>が戦場に存在する。</>",
    description_en: "The only thing is, the famous Ursus businessman, has challenged you, and the rewards are sure to be rich. \n<@rolv.rem><Active Originium> Operators deployed on it and enemies who have passed it will take constant damage, but their ATK and ASPD will be increased significantly</>",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: null,
    eliteDesc_ja: null,
    eliteDesc_en: null,
    elite_mods: null,
    routes: [
      {
        title: "",
        type: "video",
        youtube_src: "LQ9Bu6qGpJs",
        bilibili_src: null
      }
    ],
    floors: [
      4
    ],
    sp_terrain: [
      {
        tileKey: "tile_infection",
        alias: null,
        blackboard: {
          duration: 300,
          damage: 90,
          atk: 0.2,
          attack_speed: 50
        }
      }
    ],
    sp_enemy: null,
    enemies: [
      {
        id: "enemy_2002_bearmi",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 78e3,
          atk: 3500,
          def: 550
        }
      },
      {
        id: "enemy_1080_sotidp",
        level: 0,
        min_count: 3,
        max_count: 3,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 5e3
        }
      },
      {
        id: "enemy_1078_sotisc",
        level: 0,
        min_count: 22,
        max_count: 22,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1081_sotisd",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 1e4,
          atk: 600,
          def: 1e3,
          res: 50
        }
      }
    ]
  },
  {
    id: "ro1_t_4",
    levelId: "level_rogue1_t-4",
    tags: [
      "rogue_phantom"
    ],
    category: "encounter",
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-DU",
    name_zh: "这位乌萨斯人",
    name_ja: "ウルサスの漢",
    name_en: "This_Ursus_Man",
    description_zh: "有些人尝试遗忘自己的过去，尝试生活在浑浑噩噩中。有些人无法摆脱自己人生路途中的茫然与痛苦，比如这位乌萨斯人。\n<@rolv.rem>场地中有会损失生命但大幅提升攻击力和攻击速度的<活性源石>。</>",
    description_ja: "過去を忘れようとして、ぼんやりと何も考えずに生きる人もいれば、人生の空漠と苦しみから抜け出せない人もいる。このウルサス人はまさにその一例だ。\n<@rolv.rem>接触した敵味方に継続ダメージを与える代わりに、攻撃力と攻撃速度が大幅に上昇させる<活性源石>が戦場に存在する。</>",
    description_en: "There are those who try to forget their pasts and live a dignified life, then there are those who cannot escape the cluelessness and pain they have been through, like this Ursus man.\n<@rolv.rem><Active Originium> Operators deployed on it and enemies who have passed it will take constant damage, but their ATK and ASPD will be increased significantly</>",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: null,
    eliteDesc_ja: null,
    eliteDesc_en: null,
    elite_mods: null,
    routes: [
      {
        title: "",
        type: "video",
        youtube_src: "SnBhzYXUj5k",
        bilibili_src: null
      }
    ],
    floors: [
      5
    ],
    sp_terrain: [
      {
        tileKey: "tile_infection",
        alias: null,
        blackboard: {
          duration: 300,
          damage: 90,
          atk: 0.2,
          attack_speed: 50
        }
      }
    ],
    sp_enemy: null,
    enemies: [
      {
        id: "enemy_1131_sbeast",
        level: 0,
        min_count: 57,
        max_count: 57,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 3e3,
          atk: 400
        }
      },
      {
        id: "enemy_1137_plasm",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 84e3,
          atk: 3800,
          def: 550
        }
      }
    ]
  },
  {
    id: "ro1_ev_1",
    levelId: "level_rogue1_ev-1",
    tags: [
      "rogue_phantom"
    ],
    category: "encounter",
    characterLimit: 6,
    initialCost: 25,
    costIncreaseTime: 1,
    code: "ISW-SP",
    name_zh: "“骑士对决”",
    name_ja: "「騎士の対決」",
    name_en: "'Knights'_Duel'",
    description_zh: "“我听说现在的骑士按照能否产生利润被分为了两类，你觉得这四个人应如何区分？”",
    description_ja: "「今時の騎士は利益を生み出せるかどうかで2つに分けられるって聞くけど、この4人はどっちだと思う？」",
    description_en: "'I heard there are basically two types of knights these days. Those that spell profit and those that don't. Which type are these four, do you think?'",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: null,
    eliteDesc_ja: null,
    eliteDesc_en: null,
    elite_mods: null,
    routes: [
      {
        title: "combat_ops",
        type: "video",
        youtube_src: "p3viay0GAv8",
        bilibili_src: null
      }
    ],
    floors: [
      5
    ],
    sp_terrain: [
      {
        tileKey: "tile_hole",
        alias: null,
        blackboard: null
      }
    ],
    sp_enemy: null,
    enemies: [
      {
        id: "enemy_1101_plkght_3",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 15e3,
          atk: 900,
          talentBlackboard: [
            {
              key: "roarknight_barrier",
              duration: 100
            }
          ]
        }
      },
      {
        id: "enemy_1103_wdkght_3",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 7e4,
          atk: 1200,
          def: 1500,
          weight: 5,
          talentBlackboard: [
            {
              key: "bloodboil_knight",
              atk: {
                multiplier: 2.2
              },
              aspd: {
                fixed: 120
              },
              stack: 3,
              atk_gain: 40,
              aspd_gain: 40
            }
          ]
        }
      },
      {
        id: "enemy_1104_lfkght_3",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 32e3,
          atk: 800
        }
      },
      {
        id: "enemy_1184_cadkgt_3",
        level: 1,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 5e4,
          atk: 750,
          def: 550,
          res: 70
        }
      }
    ]
  },
  {
    id: "ro1_ev_2",
    levelId: "level_rogue1_ev-2",
    tags: [
      "rogue_phantom"
    ],
    category: "encounter",
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-SP",
    name_zh: "邪异囚笼",
    name_ja: "異端の檻",
    name_en: "Demonic_Cage",
    description_zh: "形态可怖的纯血血魔狂笑着消失在古堡的阴影中，留下了她扭曲的阴影仆役站在你面前。",
    description_ja: "怖ろしい純血のブラッドブルードが、狂気に満ちた笑い声を上げながら古城の闇に消えていった。そうしてここに残されたのは、彼女の歪んだ召使いたちだけだ。",
    description_en: "The terrifying pureblood Vampire disappears into the shadows of the castle with a maniacal laugh, leaving behind her twisted, shadowy servant.",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: null,
    eliteDesc_ja: null,
    eliteDesc_en: null,
    elite_mods: null,
    routes: [
      {
        title: "combat_ops",
        type: "video",
        youtube_src: "LqF1_usjCp8",
        bilibili_src: null
      }
    ],
    floors: [
      2,
      3,
      4
    ],
    sp_terrain: null,
    sp_enemy: null,
    enemies: [
      {
        id: "enemy_1059_buster_2",
        level: 0,
        min_count: 4,
        max_count: 4,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          def: 300
        }
      },
      {
        id: "enemy_1010_demon_2",
        level: 0,
        min_count: 4,
        max_count: 4,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 11e3,
          atk: 600,
          def: 100
        }
      }
    ]
  },
  {
    id: "ro1_ev_3",
    levelId: "level_rogue1_ev-3",
    tags: [
      "rogue_phantom"
    ],
    category: "encounter",
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-SP",
    name_zh: "无序盛宴",
    name_ja: "秩序無き盛宴",
    name_en: "Disorderly_Banquet",
    description_zh: "艺术只是个好用的借口，他们真正想做的，是依靠香料和酒精，剥离身上本就所剩无几的人性。",
    description_ja: "芸術なんてのは、ただの口実にすぎない。彼らが本当にやりたいのは、香料とアルコールの力で、その身体に残っているわずかな人間性を引き剥がすことだ。",
    description_en: "Art is merely a convenient excuse. What they truly want to do is to strip away what little humanity there is left in them with spices and alcohol.",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: null,
    eliteDesc_ja: null,
    eliteDesc_en: null,
    elite_mods: null,
    routes: [
      {
        title: "combat_ops",
        type: "video",
        youtube_src: "wjr6rZPdWu4",
        bilibili_src: null
      }
    ],
    floors: [
      4,
      5
    ],
    sp_terrain: null,
    sp_enemy: null,
    enemies: [
      {
        id: "enemy_2009_csaudc",
        level: 0,
        min_count: 2,
        max_count: 2,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1516_jakill",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1059_buster",
        level: 0,
        min_count: 3,
        max_count: 3,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1059_buster_2",
        level: 0,
        min_count: 8,
        max_count: 8,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      }
    ]
  },
  {
    id: "ro1_ev_4",
    levelId: "level_rogue1_ev-4",
    tags: [
      "rogue_phantom"
    ],
    category: "encounter",
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-SP",
    name_zh: "自缚",
    name_ja: "自縛",
    name_en: "Bound_by_Self",
    description_zh: "手指抓握着笔，却写不出令自己满意的字句。可悲，可悲。",
    description_ja: "懸命に筆を握り締めたところで、満足のいく言葉は綴れない。ああ、何と悲しいことだろう。",
    description_en: "Alas, the pen touches page, but all that is produced is hogwash.",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: null,
    eliteDesc_ja: null,
    eliteDesc_en: null,
    elite_mods: null,
    routes: [
      {
        title: "combat_ops",
        type: "video",
        youtube_src: "o1tZXWbbZgY",
        bilibili_src: null
      }
    ],
    floors: [
      1,
      2,
      3
    ],
    sp_terrain: [
      {
        tileKey: "tile_hole",
        alias: null,
        blackboard: null
      }
    ],
    sp_enemy: null,
    enemies: [
      {
        id: "enemy_1116_liprr",
        level: 0,
        min_count: 21,
        max_count: 21,
        elite_min_count: 21,
        elite_max_count: 21,
        overwrittenData: null
      },
      {
        id: "enemy_1117_liiprr",
        level: 0,
        min_count: 8,
        max_count: 8,
        elite_min_count: 8,
        elite_max_count: 8,
        overwrittenData: null
      },
      {
        id: "enemy_1118_lidbox",
        level: 0,
        min_count: 5,
        max_count: 5,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 1e4
        }
      },
      {
        id: "enemy_1119_vofsd",
        level: 0,
        min_count: 6,
        max_count: 6,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1121_lifbos",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: 1,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_1120_vofwiz",
        level: 0,
        min_count: 2,
        max_count: 2,
        elite_min_count: 2,
        elite_max_count: 2,
        overwrittenData: null
      }
    ]
  },
  {
    id: "ro1_ev_5",
    levelId: "level_rogue1_ev-5",
    tags: [
      "rogue_phantom"
    ],
    category: "encounter",
    characterLimit: 6,
    initialCost: 20,
    costIncreaseTime: 1,
    code: "ISW-SP",
    name_zh: "观察",
    name_ja: "観察",
    name_en: "Observation",
    description_zh: "“我想知道你的动机。在这种情境下，你会怎么做？”",
    description_ja: "「私は君の動機を知りたいんだ。さて、この状況で君はどうする？」",
    description_en: "'I want to know your motivation. What would you do under these circumstances?'",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: null,
    eliteDesc_ja: null,
    eliteDesc_en: null,
    elite_mods: null,
    routes: [
      {
        title: "combat_ops",
        type: "video",
        youtube_src: "gD34JNbihCo",
        bilibili_src: null
      }
    ],
    floors: [
      4,
      5
    ],
    sp_terrain: null,
    sp_enemy: null,
    enemies: [
      {
        id: "enemy_1087_ltwolf_2",
        level: 0,
        min_count: 25,
        max_count: 25,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2009_csaudc",
        level: 0,
        min_count: 16,
        max_count: 16,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2010_csdcr",
        level: 0,
        min_count: 11,
        max_count: 11,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2011_csppt",
        level: 0,
        min_count: 6,
        max_count: 6,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      }
    ]
  },
  {
    id: "ro1_e_1_1",
    levelId: "level_rogue1_1-1",
    tags: [
      "rogue_phantom"
    ],
    category: "combat_ops",
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "与虫为伴",
    name_ja: "ムシと一緒",
    name_en: "A_Date_With_Slugs",
    description_zh: "在一场结局未定的戏剧中，人并不一定比源石虫更有存在感。",
    description_ja: "結末がいまだ定まらない劇においては、人はオリジムシより存在感があるとは限らない。",
    description_en: "In a play where the ending is yet to be decided, man does not necessarily have more of a presence than Originium Slugs.",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: [
      "所有敌方单位的攻击力，防御力+50%，生命值+90%"
    ],
    eliteDesc_ja: [
      "敵全員の攻撃力、防御力+50%、最大HP+90%"
    ],
    eliteDesc_en: [
      "All enemy units have +50% ATK, +50% DEF, and +90% Max HP"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          atk: 1.5,
          def: 1.5,
          hp: 1.9
        }
      }
    ],
    routes: [
      {
        title: "combat_ops",
        type: "video",
        youtube_src: "0XVMeh6IllU",
        bilibili_src: null
      },
      {
        title: "duck",
        type: "video",
        youtube_src: "7mu9b_AYw_U",
        bilibili_src: null
      }
    ],
    floors: [
      1,
      2
    ],
    sp_terrain: null,
    sp_enemy: {
      normal: 35,
      elite: null,
      fixed: false
    },
    enemies: [
      {
        id: "enemy_1007_slime",
        level: 0,
        min_count: 17,
        max_count: 17,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1007_slime_2",
        level: 0,
        min_count: 5,
        max_count: 6,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1004_mslime",
        level: 0,
        min_count: 5,
        max_count: 5,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          atk: 100
        }
      },
      {
        id: "enemy_1101_plkght",
        level: 0,
        min_count: 6,
        max_count: 6,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          atk: 240
        }
      },
      {
        id: "enemy_2001_duckmi",
        level: 0,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 0,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      }
    ]
  },
  {
    id: "ro1_e_1_2",
    levelId: "level_rogue1_1-2",
    tags: [
      "rogue_phantom"
    ],
    category: "combat_ops",
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "驯兽小屋",
    name_ja: "猛獣小屋",
    name_en: "Beast_Taming",
    description_zh: "两位驯兽师吹响口哨的瞬间，猎犬们争先恐后跑出围栏，想要饱餐一顿。\n<@rolv.rem>场地中会出现周期性对我军与敌军造成伤害的<源石祭坛>。</>",
    description_ja: "二人の猛獣使いが口笛を吹いた瞬間、猟犬たちは餌をむさぼろうと檻から躍り出た。\n<@rolv.rem>戦場に一定時間ごとに周囲にエネルギー波を放ち敵味方に確定ダメージを与える<源石祭壇>が設置されている。</>",
    description_en: "The moment the two beast tamers blow their whistles, the hounds all scramble out of their enclosure to feast. \n<@rolv.rem><Originium Altar> Periodically emits Pulse Waves to the surrounding tiles, damaging both allied and enemy units. </>",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: [
      "所有敌方单位的攻击力+40%，防御力+30%，生命值+70%"
    ],
    eliteDesc_ja: [
      "敵全員の攻撃力+40%、防御力+30%、最大HP+70%"
    ],
    eliteDesc_en: [
      "All enemy units have +40% ATK, +30% DEF, and +70% Max HP"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          atk: 1.4,
          def: 1.3,
          hp: 1.7
        }
      }
    ],
    routes: [
      {
        title: "combat_ops",
        type: "video",
        youtube_src: "INx2xzfl5Rc",
        bilibili_src: null
      }
    ],
    floors: [
      1,
      2
    ],
    sp_terrain: null,
    sp_enemy: {
      normal: 32,
      elite: null,
      fixed: true
    },
    enemies: [
      {
        id: "enemy_1000_gopro",
        level: 0,
        min_count: 11,
        max_count: 11,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2001_duckmi",
        level: 0,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 0,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1084_sotidm",
        level: 0,
        min_count: 0,
        max_count: 2,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 1e4,
          def: 200
        }
      },
      {
        id: "enemy_1087_ltwolf",
        level: 0,
        min_count: 12,
        max_count: 12,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 2200,
          atk: 250
        }
      },
      {
        id: "enemy_1077_sotihd",
        level: 0,
        min_count: 6,
        max_count: 6,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1034_laxe",
        level: 0,
        min_count: 0,
        max_count: 2,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 11e3,
          atk: 700,
          def: 200
        }
      }
    ]
  },
  {
    id: "ro1_e_1_3",
    levelId: "level_rogue1_1-3",
    tags: [
      "rogue_phantom"
    ],
    category: "combat_ops",
    characterLimit: 6,
    initialCost: 20,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "礼炮小队",
    name_ja: "礼砲小隊",
    name_en: "Gun_Salute",
    description_zh: "来了客人，自然要鸣炮以示尊重。然而大雾弥漫，炮弹的落点似乎有些问题。",
    description_ja: "お客さんが来たら、礼砲を放って敬意を表すものだ。しかし霧が濛々と立ち込めて、着弾地点がいささかずれてしまったらしい。",
    description_en: "When there are visitors, we have to welcome them with a gun salute. With the fog covering the entire area, though, we might have a little trouble with the firing trajectory.",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: [
      "所有敌方单位的攻击力+45%，生命值+60%",
      "炮手被替换为炮击组长"
    ],
    eliteDesc_ja: [
      "敵全員の攻撃力+45%、最大HP+60%",
      "<砲兵>が<砲兵隊長>に替わる"
    ],
    eliteDesc_en: [
      "All enemy units have +45% ATK and +60% Max HP",
      "All <Mortar Gunner> are replaced by <Mortar Gunner Leader>"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          atk: 1.45,
          hp: 1.6
        }
      }
    ],
    routes: [
      {
        title: "combat_ops",
        type: "video",
        youtube_src: "GxiKxTYJ4SY",
        bilibili_src: null
      },
      {
        title: "duck",
        type: "video",
        youtube_src: "fOXHYIRWbmI",
        bilibili_src: null
      },
      {
        title: "gpn",
        type: "video",
        youtube_src: "SMjVUYY1Cqc",
        bilibili_src: null
      }
    ],
    floors: [
      1,
      2
    ],
    sp_terrain: null,
    sp_enemy: {
      normal: 35,
      elite: null,
      fixed: false
    },
    enemies: [
      {
        id: "enemy_1002_nsabr",
        level: 0,
        min_count: 26,
        max_count: 28,
        elite_min_count: 26,
        elite_max_count: 28,
        overwrittenData: null
      },
      {
        id: "enemy_1024_mortar",
        level: 0,
        min_count: 2,
        max_count: 2,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          atk: 220
        }
      },
      {
        id: "enemy_1024_mortar_2",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: 2,
        elite_max_count: 2,
        overwrittenData: {
          hp: 4e3,
          atk: 420
        }
      },
      {
        id: "enemy_1007_slime_2",
        level: 0,
        min_count: 2,
        max_count: 4,
        elite_min_count: 2,
        elite_max_count: 4,
        overwrittenData: null
      },
      {
        id: "enemy_1021_bslime",
        level: 0,
        min_count: 0,
        max_count: 2,
        elite_min_count: 0,
        elite_max_count: 2,
        overwrittenData: null
      },
      {
        id: "enemy_2001_duckmi",
        level: 0,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 0,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      }
    ]
  },
  {
    id: "ro1_e_1_4",
    levelId: "level_rogue1_1-4",
    tags: [
      "rogue_phantom"
    ],
    category: "combat_ops",
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "意外",
    name_ja: "墜落事故",
    name_en: "Accident",
    description_zh: "演员们正在此处练习如何在降落时躲避陷阱，而你的到来增大了他们训练的难度系数。",
    description_ja: "役者たちは、ここで着陸時の落とし穴の回避方法を訓練していた。が、あなたが現れたことで、彼らの訓練の難易度は高くなってしまった。",
    description_en: "The actors are practicing how to avoid landing on traps as they parachute down, yet your arrival has kicked their training intensity up a notch.",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: [
      "所有敌方单位的攻击力+60%，防御力+20%，生命值+40%",
      "空降兵被替换为乌萨斯突袭弩手"
    ],
    eliteDesc_ja: [
      "敵全員の攻撃力+60%、防御力+20%、最大HP+40%",
      "<空挺兵>が<ウルサス強襲射撃兵>に替わる"
    ],
    eliteDesc_en: [
      "All enemy units have +60% ATK, +20% DEF, and +40% Max HP",
      "All <Airborne Soldier> are replaced by <Ursus Assault Crossbowman>"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          atk: 1.6,
          def: 1.2,
          hp: 1.4
        }
      }
    ],
    routes: [
      {
        title: "combat_ops",
        type: "video",
        youtube_src: "qW4fUuAjkP8",
        bilibili_src: null
      },
      {
        title: "emergency_ops",
        type: "video",
        youtube_src: "kEpFIIzPHmc",
        bilibili_src: null
      },
      {
        title: "duck",
        type: "video",
        youtube_src: "dtFxP-qSep0",
        bilibili_src: null
      }
    ],
    floors: [
      1,
      2
    ],
    sp_terrain: [
      {
        tileKey: "tile_hole",
        alias: null,
        blackboard: null
      }
    ],
    sp_enemy: {
      normal: 45,
      elite: null,
      fixed: true
    },
    enemies: [
      {
        id: "enemy_1013_airdrp",
        level: 0,
        min_count: 22,
        max_count: 22,
        elite_min_count: 20,
        elite_max_count: 20,
        overwrittenData: null
      },
      {
        id: "enemy_1016_diaman",
        level: 0,
        min_count: 4,
        max_count: 4,
        elite_min_count: 4,
        elite_max_count: 4,
        overwrittenData: null
      },
      {
        id: "enemy_1007_slime",
        level: 0,
        min_count: 11,
        max_count: 11,
        elite_min_count: 11,
        elite_max_count: 11,
        overwrittenData: null
      },
      {
        id: "enemy_1028_mocock",
        level: 0,
        min_count: 7,
        max_count: 7,
        elite_min_count: 7,
        elite_max_count: 7,
        overwrittenData: null
      },
      {
        id: "enemy_2001_duckmi",
        level: 0,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 0,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_1109_uabone",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: 2,
        elite_max_count: 2,
        overwrittenData: {
          hp: 2e3,
          atk: 250
        }
      }
    ]
  },
  {
    id: "ro1_e_1_5",
    levelId: "level_rogue1_1-5",
    tags: [
      "rogue_phantom"
    ],
    category: "combat_ops",
    characterLimit: 6,
    initialCost: 20,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "死斗",
    name_ja: "死闘",
    name_en: "Fight_to_the_Death",
    description_zh: "看啊，舞者正在火中起舞，想要获得她的青睐，一场竞赛必不可少。\n<@rolv.rem>场地内有间断对其上单位造成伤害的<热泵通道>。</>",
    description_ja: "見よ、踊り子が火中で舞っている。彼女の好意を得たいのならば、争いは避けられないだろう。\n<@rolv.rem>乗っている対象に周期的にダメージを与える<噴気口>が戦場に存在する。</>",
    description_en: "A dance in fire; a competition for the dancer's attention. \n<@rolv.rem>There are <Heat Pump Passages> that will periodically deal damage to units above them.</>",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: [
      "所有敌方单位的攻击力，防御力+20%，生命值+60%",
      "战斗开始后出现的打手被替换为提亚卡乌好战者"
    ],
    eliteDesc_ja: [
      "敵全員の攻撃力、防御力+20%、最大HP+60%",
      "最初の<拳闘士崩れ>が<ティアカウ猛攻兵>に替わる"
    ],
    eliteDesc_en: [
      "All enemy units have +20% ATK, +20% DEF, and +60% Max HP",
      "At the beginning 1 <Brawler> is replaced by <Tiacauh Fanatic>"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          atk: 1.2,
          def: 1.2,
          hp: 1.6
        }
      }
    ],
    routes: [
      {
        title: "combat_ops",
        type: "video",
        youtube_src: "CLUPi4R_a6M",
        bilibili_src: null
      },
      {
        title: "duck",
        type: "video",
        youtube_src: "CjcLdfTDw7I",
        bilibili_src: null
      }
    ],
    floors: [
      1,
      2
    ],
    sp_terrain: [
      {
        tileKey: "tile_volcano",
        alias: null,
        blackboard: {
          damage: 550,
          cd_min: 6.5,
          cd_max: 8
        }
      },
      {
        tileKey: "tile_healing",
        alias: null,
        blackboard: {
          HP_RECOVERY_PER_SEC_BY_MAX_HP_RATIO: 0.03
        }
      }
    ],
    sp_enemy: {
      normal: 23,
      elite: null,
      fixed: true
    },
    enemies: [
      {
        id: "enemy_1056_ganwar",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: 1,
        elite_max_count: 1,
        overwrittenData: {
          hp: 4e3,
          atk: 270,
          def: 200
        }
      },
      {
        id: "enemy_2010_csdcr",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: 1,
        elite_max_count: 1,
        overwrittenData: {
          atk: 400,
          def: 200
        }
      },
      {
        id: "enemy_1095_ccripr",
        level: 0,
        min_count: 0,
        max_count: 1,
        elite_min_count: 1,
        elite_max_count: 2,
        overwrittenData: {
          hp: 7e3,
          atk: 250,
          def: 200
        }
      },
      {
        id: "enemy_1118_lidbox",
        level: 0,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: {
          hp: 8e3,
          atk: 240,
          def: 200
        }
      },
      {
        id: "enemy_1056_ganwar_2",
        level: 0,
        min_count: 1,
        max_count: 2,
        elite_min_count: 1,
        elite_max_count: 2,
        overwrittenData: {
          hp: 9e3,
          atk: 310,
          def: 200
        }
      },
      {
        id: "enemy_1055_ganman",
        level: 0,
        min_count: 17,
        max_count: 17,
        elite_min_count: 17,
        elite_max_count: 17,
        overwrittenData: null
      },
      {
        id: "enemy_2001_duckmi",
        level: 0,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 0,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      }
    ]
  },
  {
    id: "ro1_e_2_1",
    levelId: "level_rogue1_2-1",
    tags: [
      "rogue_phantom"
    ],
    category: "combat_ops",
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "压轴登场",
    name_ja: "真打ち登場",
    name_en: "The_Grand_Finale",
    description_zh: "别光顾着应付雇佣兵和源石虫，最麻烦的家伙总会在最后出现。",
    description_ja: "傭兵やオリジムシばかりに気を取られるな。一番厄介な奴は、最後にやって来るものだ。",
    description_en: "Don't just worry about dealing with the mercenaries and Originium slugs. The most troublesome folks always show up last.",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: [
      "所有敌方单位的攻击力，防御力+30%，生命值+60%",
      "所有幽灵和幽灵组长的生命值额外再提升100%"
    ],
    eliteDesc_ja: [
      "敵全員の攻撃力、防御力+30%、最大HP+60%",
      "<ゴースト兵>と<ゴースト隊長>のHPがさらに100%上昇"
    ],
    eliteDesc_en: [
      "All enemy units have +30% ATK, +30% DEF, and +60% Max HP",
      "All <Wraith> and <Wraith Leader> additionally gain +100% HP"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          atk: 1.3,
          def: 1.3,
          hp: 1.6
        }
      },
      {
        targets: [
          "16",
          "13"
        ],
        mods: {
          hp: 2
        }
      }
    ],
    routes: [
      {
        title: "combat_ops",
        type: "video",
        youtube_src: "01VtgwhOK7c",
        bilibili_src: null
      },
      {
        title: "duck",
        type: "video",
        youtube_src: "IYNfdDxsOgE",
        bilibili_src: null
      }
    ],
    floors: [
      2
    ],
    sp_terrain: null,
    sp_enemy: {
      normal: 46,
      elite: null,
      fixed: true
    },
    enemies: [
      {
        id: "enemy_1008_ghost",
        level: 0,
        min_count: 1,
        max_count: 4,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 3200
        }
      },
      {
        id: "enemy_1026_aghost",
        level: 0,
        min_count: 0,
        max_count: 3,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 4300
        }
      },
      {
        id: "enemy_1007_slime_3",
        level: 0,
        min_count: 24,
        max_count: 24,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 2050
        }
      },
      {
        id: "enemy_1007_slime_2",
        level: 0,
        min_count: 5,
        max_count: 5,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 1550
        }
      },
      {
        id: "enemy_2001_duckmi",
        level: 0,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 0,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1080_sotidp",
        level: 0,
        min_count: 1,
        max_count: 2,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1078_sotisc",
        level: 0,
        min_count: 6,
        max_count: 6,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1079_sotisp",
        level: 0,
        min_count: 4,
        max_count: 5,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      }
    ]
  },
  {
    id: "ro1_e_2_2",
    levelId: "level_rogue1_2-2",
    tags: [
      "rogue_phantom"
    ],
    category: "combat_ops",
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "巡逻队",
    name_ja: "巡視隊",
    name_en: "Patrol_Squad",
    description_zh: "一队雇佣兵正在庭院中巡视。猎犬嗅到陌生人的气味，顿时嚎叫起来，整支队伍迅速向你靠近。",
    description_ja: "傭兵隊が庭を巡回警備している。猟犬が見知らぬ者の匂いを嗅ぎつけ、激しく吠え出した。傭兵たちは素早くあなたに近づいて来る。",
    description_en: "A team of mercenaries are patrolling in the courtyard. Their hounds pick up the scent of strangers and start barking immediately, sending the entire squad your way.",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: [
      "所有敌方单位的攻击力，防御力+30%，生命值+60%",
      "所有提亚卡乌勇士和寻仇者的攻击力额外再提升100%"
    ],
    eliteDesc_ja: [
      "敵全員の攻撃力、防御力+30%、最大HP+60%",
      "<リベンジャー>と<ティアカウ勇士>の攻撃力がさらに40%上昇"
    ],
    eliteDesc_en: [
      "All enemy units have +30% ATK, +30% DEF, and +60% Max HP",
      "All <Avenger> and <Tiacauh Brave> additionally gain +40% ATK"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          atk: 1.3,
          def: 1.3,
          hp: 1.6
        }
      },
      {
        targets: [
          "T11",
          "14"
        ],
        mods: {
          atk: 1.4
        }
      }
    ],
    routes: [
      {
        title: "combat_ops",
        type: "video",
        youtube_src: "Y8xccnPilFU",
        bilibili_src: null
      }
    ],
    floors: [
      2
    ],
    sp_terrain: null,
    sp_enemy: {
      normal: 35,
      elite: null,
      fixed: false
    },
    enemies: [
      {
        id: "enemy_1025_reveng",
        level: 0,
        min_count: 0,
        max_count: 4,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 12e3,
          atk: 400,
          talentBlackboard: [
            {
              key: "avenger",
              atk: {
                multiplier: 2.5
              }
            }
          ]
        }
      },
      {
        id: "enemy_1098_cchmpn",
        level: 0,
        min_count: 0,
        max_count: 4,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1002_nsabr",
        level: 1,
        min_count: 14,
        max_count: 14,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 2550,
          atk: 250
        }
      },
      {
        id: "enemy_1000_gopro_2",
        level: 0,
        min_count: 8,
        max_count: 8,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1015_litamr",
        level: 0,
        min_count: 8,
        max_count: 8,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2001_duckmi",
        level: 0,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 0,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      }
    ]
  },
  {
    id: "ro1_e_2_3",
    levelId: "level_rogue1_2-3",
    tags: [
      "rogue_phantom"
    ],
    category: "combat_ops",
    characterLimit: 6,
    initialCost: 20,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "落魄骑士",
    name_ja: "零落の騎士",
    name_en: "Destitute_Knights",
    description_zh: "一票被除名的卡西米尔骑士成为了四处游走的雇佣兵，他们衣物上的徽记诉说着这些人往昔的身份。",
    description_ja: "除名されたカジミエーシュの騎士たちは、彷徨える傭兵となった。彼らの装束に残るエンブレムは、かつての身分を示している。",
    description_en: "A ground of expelled Kazimierzian knights have become wandering mercenaries, their former titles revealed by the insignias on their clothing.",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: [
      "所有敌方单位的攻击力+30%，防御力+20%，生命值+30%",
      "沸血骑士团学徒和沸血骑士团精锐获得隐匿"
    ],
    eliteDesc_ja: [
      "敵全員の攻撃力+30%、防御力+20%、最大HP+30%",
      "<ブラッドボイル騎士系>がステルス状態になる"
    ],
    eliteDesc_en: [
      "All enemy units have +30% ATK, +20% DEF, and +30% Max HP",
      "Bloodboil Knightclub Members gains stealth"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          atk: 1.3,
          def: 1.2,
          hp: 1.3
        }
      },
      {
        targets: [
          "enemy_1103_wdkght_2",
          "enemy_1103_wdkght"
        ],
        mods: {
          special: {
            stealth: {
              tooltip: {
                en: [
                  "$Stealth$"
                ],
                ja: [
                  "$ステルス$"
                ],
                zh: [
                  "$隐匿$"
                ]
              }
            }
          }
        }
      }
    ],
    routes: [
      {
        title: "combat_ops",
        type: "video",
        youtube_src: "0ogsLbsUp0Q",
        bilibili_src: null
      },
      {
        title: "duck",
        type: "video",
        youtube_src: "GNtJeRTCP2M",
        bilibili_src: null
      }
    ],
    floors: [
      2
    ],
    sp_terrain: null,
    sp_enemy: {
      normal: "20 / 22",
      elite: null,
      fixed: true
    },
    enemies: [
      {
        id: "enemy_1099_nbkght",
        level: 0,
        min_count: 12,
        max_count: 15,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1100_scorpn",
        level: 0,
        min_count: 3,
        max_count: 4,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1018_aoemag",
        level: 0,
        min_count: 0,
        max_count: 2,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 6e3
        }
      },
      {
        id: "enemy_2001_duckmi",
        level: 0,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 0,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1103_wdkght",
        level: 0,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 13e3
        }
      },
      {
        id: "enemy_1103_wdkght_2",
        level: 0,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 17e3
        }
      },
      {
        id: "enemy_1036_amraoe",
        level: 0,
        min_count: 0,
        max_count: 2,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      }
    ]
  },
  {
    id: "ro1_e_2_4",
    levelId: "level_rogue1_2-4",
    tags: [
      "rogue_phantom"
    ],
    category: "combat_ops",
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "分赃不均",
    name_ja: "分け前のもつれ",
    name_en: "Unequal_Split",
    description_zh: "窃贼与术师在无主的财富的分配上起了争执，当双方准备大打出手时，你的出现改变了他们的想法。",
    description_ja: "盗賊と術師が、主無き財宝の取り分でもめている。双方が暴力を持って問題を解決しようとしたその時、あなたが現れたことで、彼らの考えは変わった。",
    description_en: "The bandits and casters are having an argument over the unowned treasure. Just as they are about to come to blows, your entrance gives them a different idea.",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: [
      "所有敌方单位的攻击力+30%，防御力+20%，生命值+40%",
      "高阶术师被替换为护盾高阶术师，特战术师被替换为特战术师组长"
    ],
    eliteDesc_ja: [
      "敵全員の攻撃力+30%、防御力+20%、最大HP+40%",
      "<上級術師>が<上級バリア術師>に替わる",
      "<特戦術師>が<特戦術師隊長>に替わる"
    ],
    eliteDesc_en: [
      "All enemy units have +30% ATK, +20% DEF, and +40% Max HP",
      "All <Senior Caster> are replaced by <Shielded Senior Caster>",
      "All <Spec Ops Caster> are replaced by <Spec Ops Caster Leader>"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          atk: 1.3,
          def: 1.2,
          hp: 1.4
        }
      }
    ],
    routes: [
      {
        title: "combat_ops",
        type: "video",
        youtube_src: "WHUM1HHJdC0",
        bilibili_src: null
      }
    ],
    floors: [
      2
    ],
    sp_terrain: [
      {
        tileKey: "tile_hole",
        alias: null,
        blackboard: null
      }
    ],
    sp_enemy: {
      normal: 27,
      elite: null,
      fixed: false
    },
    enemies: [
      {
        id: "enemy_1039_breakr",
        level: 0,
        min_count: 12,
        max_count: 12,
        elite_min_count: 12,
        elite_max_count: 12,
        overwrittenData: null
      },
      {
        id: "enemy_1502_crowns",
        level: 1,
        min_count: 1,
        max_count: 1,
        elite_min_count: 1,
        elite_max_count: 1,
        overwrittenData: {
          atk: 700,
          res: 25
        }
      },
      {
        id: "enemy_1018_aoemag",
        level: 0,
        min_count: 0,
        max_count: 4,
        elite_min_count: 0,
        elite_max_count: 4,
        overwrittenData: {
          atk: 300
        }
      },
      {
        id: "enemy_1038_lunmag",
        level: 0,
        min_count: 0,
        max_count: 4,
        elite_min_count: 0,
        elite_max_count: 4,
        overwrittenData: null
      },
      {
        id: "enemy_1029_shdsbr",
        level: 0,
        min_count: 9,
        max_count: 9,
        elite_min_count: 9,
        elite_max_count: 9,
        overwrittenData: null
      },
      {
        id: "enemy_2001_duckmi",
        level: 0,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 0,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_1038_lunmag_2",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          def: 250
        }
      },
      {
        id: "enemy_1036_amraoe",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      }
    ]
  },
  {
    id: "ro1_e_2_5",
    levelId: "level_rogue1_2-5",
    tags: [
      "rogue_phantom"
    ],
    category: "combat_ops",
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "先来后到",
    name_ja: "早い者勝ち",
    name_en: "First_Come,_Last_Served",
    description_zh: "你碰上了一群与你一样迷路的雇佣兵，他们食粮已尽，于是看向了你的行囊。",
    description_ja: "あなたと同じく道に迷っている傭兵と出会った。食糧がすでに尽きてしまった彼らは、あなたの荷物へ視線を向けてくる。",
    description_en: "You encounter a band of mercenaries who have also lost their way. Short on food, they set their sights on your bag.",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: [
      "所有敌方单位的攻击力+30%，防御力+20%，生命值+30%",
      "出现额外的乌萨斯突击队队长"
    ],
    eliteDesc_ja: [
      "敵全員の攻撃力+30%、防御力+20%、最大HP+30%",
      "追加で<ウルサスコマンドス隊長>1体が出現する"
    ],
    eliteDesc_en: [
      "All enemy units have +30% ATK, +20% DEF, and +30% Max HP",
      "Additional 1 <Ursus Raider Leader> appears"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          atk: 1.3,
          def: 1.2,
          hp: 1.3
        }
      }
    ],
    routes: [
      {
        title: "combat_ops",
        type: "video",
        youtube_src: "-Rv39TDUqSY",
        bilibili_src: null
      },
      {
        title: "emergency_ops",
        type: "video",
        youtube_src: "m_QFuPeSkyc",
        bilibili_src: null
      },
      {
        title: "duck",
        type: "video",
        youtube_src: "O3LEsZZlCvI",
        bilibili_src: null
      },
      {
        title: "gpn",
        type: "video",
        youtube_src: "7uVbhIRlIIo",
        bilibili_src: null
      }
    ],
    floors: [
      2
    ],
    sp_terrain: null,
    sp_enemy: {
      normal: 40,
      elite: 41,
      fixed: true
    },
    enemies: [
      {
        id: "enemy_1002_nsabr",
        level: 0,
        min_count: 7,
        max_count: 7,
        elite_min_count: 7,
        elite_max_count: 7,
        overwrittenData: {
          hp: 2550,
          atk: 250
        }
      },
      {
        id: "enemy_1000_gopro_2",
        level: 0,
        min_count: 16,
        max_count: 16,
        elite_min_count: 16,
        elite_max_count: 16,
        overwrittenData: null
      },
      {
        id: "enemy_1015_litamr",
        level: 0,
        min_count: 14,
        max_count: 14,
        elite_min_count: 14,
        elite_max_count: 14,
        overwrittenData: null
      },
      {
        id: "enemy_1081_sotisd",
        level: 0,
        min_count: 2,
        max_count: 2,
        elite_min_count: 2,
        elite_max_count: 2,
        overwrittenData: {
          hp: 1e4
        }
      },
      {
        id: "enemy_2001_duckmi",
        level: 0,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 0,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_1111_ucommd_2",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: 1,
        elite_max_count: 1,
        overwrittenData: null
      }
    ]
  },
  {
    id: "ro1_e_3_1",
    levelId: "level_rogue1_3-1",
    tags: [
      "rogue_phantom"
    ],
    category: "combat_ops",
    characterLimit: 6,
    initialCost: 25,
    costIncreaseTime: 3,
    code: "ISW-NO",
    name_zh: "正义",
    name_ja: "正義",
    name_en: "Justice",
    description_zh: "一场乌萨斯悲剧在古堡中再现，而你与千万人做出的选择别无二致。\n<@rolv.rem>部署费用回复缓慢，且干员布置不受近远程限制。</>",
    description_ja: "古城にて、かつてのウルサスの悲劇が再び演じられようとしている。そして、あなたの選択は、幾多の人々と異なるところはない。\n<@rolv.rem>コストの回復スピードが遅くなる。また、オペレーターは遠近の制限を受けず自由な位置に配置可能。</>",
    description_en: "An Ursus tragedy is unfolding yet again here in the castle. The choice you make is no different from that of the countless of men who came before you.\n<@rolv.rem>DP recovery rate is decreased, and tiles do not have melee/ranged restrictions</>",
    addInfo_zh: [
      "每3秒回复1点部署费用"
    ],
    addInfo_ja: [
      "コスト回復速度が3分の1になる"
    ],
    addInfo_en: [
      "DP regen rate decreased to 1/3"
    ],
    eliteDesc_zh: [
      "乌萨斯平民以外的所有敌方单位的攻击力，生命值+20%",
      "乌萨斯突袭弩手被替换为乌萨斯高级突袭弩手",
      "乌萨斯突击者被替换为乌萨斯突击队队长"
    ],
    eliteDesc_ja: [
      "ウルサス民間人以外の敵全員の攻撃力、最大HP+20%",
      "<ウルサス強襲射撃兵>が<ウルサス上級強襲射撃兵>に替わる",
      "<ウルサスコマンドー>が<ウルサスコマンドス隊長>に替わる"
    ],
    eliteDesc_en: [
      "All enemy units except Ursus Civilian have +20% ATK and +20% Max HP",
      "All <Ursus Assault Crossbowman> are replaced by <Elite Ursus Assault Crossbowman>",
      "All <Ursus Raider> are replaced by <Ursus Raider Leader>"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          atk: 1.2,
          hp: 1.2
        }
      }
    ],
    routes: [
      {
        title: "combat_ops",
        type: "video",
        youtube_src: "AbVVg5HacS8",
        bilibili_src: null
      },
      {
        title: "gpn",
        type: "video",
        youtube_src: "MmcZJI9Hb04",
        bilibili_src: null
      }
    ],
    floors: [
      3
    ],
    sp_terrain: [
      {
        tileKey: "tile_hole",
        alias: null,
        blackboard: null
      }
    ],
    sp_enemy: {
      normal: 67,
      elite: null,
      fixed: false
    },
    enemies: [
      {
        id: "enemy_1107_uoffcr",
        level: 0,
        min_count: 17,
        max_count: 18,
        elite_min_count: 17,
        elite_max_count: 18,
        overwrittenData: null
      },
      {
        id: "enemy_1007_slime_3",
        level: 0,
        min_count: 22,
        max_count: 22,
        elite_min_count: 22,
        elite_max_count: 22,
        overwrittenData: null
      },
      {
        id: "enemy_1107_uoffcr_2",
        level: 0,
        min_count: 3,
        max_count: 3,
        elite_min_count: 3,
        elite_max_count: 3,
        overwrittenData: null
      },
      {
        id: "enemy_1109_uabone",
        level: 0,
        min_count: 5,
        max_count: 6,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_1109_uabone_2",
        level: 0,
        min_count: 0,
        max_count: 1,
        elite_min_count: 5,
        elite_max_count: 6,
        overwrittenData: null
      },
      {
        id: "enemy_1016_diaman",
        level: 0,
        min_count: 2,
        max_count: 2,
        elite_min_count: 2,
        elite_max_count: 2,
        overwrittenData: {
          hp: 5e3,
          def: 1e3
        }
      },
      {
        id: "enemy_1111_ucommd",
        level: 0,
        min_count: 5,
        max_count: 6,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: {
          def: 400
        }
      },
      {
        id: "enemy_1111_ucommd_2",
        level: 0,
        min_count: 0,
        max_count: 1,
        elite_min_count: 5,
        elite_max_count: 6,
        overwrittenData: {
          hp: 12e3
        }
      },
      {
        id: "enemy_1110_uamord",
        level: 0,
        min_count: 2,
        max_count: 2,
        elite_min_count: 2,
        elite_max_count: 2,
        overwrittenData: {
          def: 400
        }
      },
      {
        id: "enemy_3001_upeopl",
        level: 0,
        min_count: 7,
        max_count: 7,
        elite_min_count: 7,
        elite_max_count: 7,
        overwrittenData: null
      },
      {
        id: "enemy_2001_duckmi",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      }
    ]
  },
  {
    id: "ro1_e_3_2",
    levelId: "level_rogue1_3-2",
    tags: [
      "rogue_phantom"
    ],
    category: "combat_ops",
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "似曾相识",
    name_ja: "デジャヴュ",
    name_en: "A_Familiar_Face",
    description_zh: "一位女性萨卡兹和她的手下......虽然记不清细节，但你肯定自己曾经经历过这一刻。\n<@rolv.rem>场地中有可持续恢复生命的<医疗符文>。</>",
    description_ja: "とあるサルカズの女性と彼女の手下……詳しくは思い出せないが、間違いなくあなたはかつて同じような体験をしたはずなのだ。\n<@rolv.rem>配置した味方のHPが徐々に回復する<回復エリア>がある。</>",
    description_en: "A Sarkaz woman and her underling... Though you do not remember the details, you are certain you have gone through this before.\n<@rolv.rem><Medical Rune> Operators deployed on this tile will restore HP over time.</>",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: [
      "所有敌方单位的防御力+10%，攻击力，生命值+50%"
    ],
    eliteDesc_ja: [
      "敵全員の防御力+10%、攻撃力、最大HP+50%"
    ],
    eliteDesc_en: [
      "All enemy units have +50% ATK, +10% DEF, and +50% Max HP"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          atk: 1.5,
          def: 1.1,
          hp: 1.5
        }
      }
    ],
    routes: [
      {
        title: "combat_ops",
        type: "video",
        youtube_src: "k91-nLm9RhM",
        bilibili_src: null
      }
    ],
    floors: [
      3
    ],
    sp_terrain: [
      {
        tileKey: "tile_healing",
        alias: null,
        blackboard: {
          HP_RECOVERY_PER_SEC_BY_MAX_HP_RATIO: 0.03
        }
      }
    ],
    sp_enemy: {
      normal: 28,
      elite: null,
      fixed: false
    },
    enemies: [
      {
        id: "enemy_1504_cqbw",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 18e3,
          atk: 530,
          def: 200,
          talentBlackboard: [
            {
              key: "W_C4",
              atk: {
                multiplier: 2
              }
            }
          ]
        }
      },
      {
        id: "enemy_1073_dscout",
        level: 0,
        min_count: 1,
        max_count: 2,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1071_dftman",
        level: 0,
        min_count: 16,
        max_count: 17,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 4e3,
          def: 100
        }
      },
      {
        id: "enemy_1075_dmgswd",
        level: 0,
        min_count: 4,
        max_count: 6,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 8e3
        }
      },
      {
        id: "enemy_1075_dmgswd_2",
        level: 0,
        min_count: 2,
        max_count: 3,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 12e3
        }
      },
      {
        id: "enemy_2001_duckmi",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      }
    ]
  },
  {
    id: "ro1_e_3_3",
    levelId: "level_rogue1_3-3",
    tags: [
      "rogue_phantom"
    ],
    category: "combat_ops",
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "酒商运输队",
    name_ja: "酒屋の輸送隊",
    name_en: "Vintage_Transport",
    description_zh: "你看到了散落一地的货物与横冲直撞的源石虫，运输队的管理人正在手忙脚乱地捕捉四散而逃的源石虫，或许你能帮帮他。",
    description_ja: "あなたは地面に散らばった貨物とバラバラに暴れうごめくオリジムシを見つけた。運送部隊の管理者はあちこちに逃げ回るオリジムシを捕まえようとてんてこ舞いだ。彼を助けてあげられるかもしれない。",
    description_en: "You see a pile of goods scattered across the ground and a swarm of Originium slugs rampaging about. The flustered transport team's manager is trying to catch all the escaping slugs. Perhaps you can help him.",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: [
      "所有敌方单位的攻击力+15%，生命值+40%",
      "高能源石虫被替换为高能源石虫·α"
    ],
    eliteDesc_ja: [
      "敵全員の攻撃力+15%、最大HP+40%",
      "<バクダンムシ>が<バクダンムシ・α>に替わる"
    ],
    eliteDesc_en: [
      "All enemy units have +15% ATK, and +40% Max HP",
      "All <Infused Originium Slug> are replaced by <Infused Originium Slug α>"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          atk: 1.15,
          hp: 1.4
        }
      }
    ],
    routes: [
      {
        title: "combat_ops",
        type: "video",
        youtube_src: "D7Tl49CzuPo",
        bilibili_src: null
      },
      {
        title: "gpn",
        type: "video",
        youtube_src: "_mR_XA5BZ1o",
        bilibili_src: null
      }
    ],
    floors: [
      3
    ],
    sp_terrain: null,
    sp_enemy: {
      normal: 78,
      elite: null,
      fixed: true
    },
    enemies: [
      {
        id: "enemy_1021_bslime",
        level: 0,
        min_count: 6,
        max_count: 10,
        elite_min_count: 0,
        elite_max_count: 4,
        overwrittenData: {
          hp: 7500,
          atk: 240
        }
      },
      {
        id: "enemy_1021_bslime_2",
        level: 0,
        min_count: 0,
        max_count: 4,
        elite_min_count: 6,
        elite_max_count: 10,
        overwrittenData: {
          hp: 1e4,
          atk: 330
        }
      },
      {
        id: "enemy_1009_lurker",
        level: 0,
        min_count: 10,
        max_count: 10,
        elite_min_count: 10,
        elite_max_count: 10,
        overwrittenData: {
          hp: 4e3
        }
      },
      {
        id: "enemy_1001_bigbo",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: 1,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_1007_slime_2",
        level: 0,
        min_count: 52,
        max_count: 52,
        elite_min_count: 52,
        elite_max_count: 52,
        overwrittenData: null
      },
      {
        id: "enemy_1005_yokai",
        level: 0,
        min_count: 2,
        max_count: 4,
        elite_min_count: 2,
        elite_max_count: 4,
        overwrittenData: {
          hp: 2500
        }
      },
      {
        id: "enemy_1040_bombd_2",
        level: 0,
        min_count: 0,
        max_count: 2,
        elite_min_count: 0,
        elite_max_count: 2,
        overwrittenData: {
          hp: 5e3,
          atk: 1e3,
          def: 100
        }
      },
      {
        id: "enemy_2001_duckmi",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      }
    ]
  },
  {
    id: "ro1_e_3_4",
    levelId: "level_rogue1_3-4",
    tags: [
      "rogue_phantom"
    ],
    category: "combat_ops",
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "从众效应",
    name_ja: "パブリック・エネミー",
    name_en: "With_The_Crowd",
    description_zh: "不知道是谁喊了一声，乌泱泱的人群便齐齐向你涌来。",
    description_ja: "誰が声を上げたのか、烏合の衆は一斉にあなたに襲いかかってきた。",
    description_en: "There's no telling who it was that yelled, but a bustling crowd starts to swarm toward you.",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: [
      "所有敌方单位的生命值+70%"
    ],
    eliteDesc_ja: [
      "敵全員の最大HP+70%"
    ],
    eliteDesc_en: [
      "All enemy units have +70% Max HP"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          hp: 1.7
        }
      }
    ],
    routes: [
      {
        title: "combat_ops",
        type: "video",
        youtube_src: "MqLtT-8gmJQ",
        bilibili_src: null
      },
      {
        title: "duck",
        type: "video",
        youtube_src: "EjDE-n6cFVY",
        bilibili_src: null
      }
    ],
    floors: [
      3
    ],
    sp_terrain: null,
    sp_enemy: {
      normal: 163,
      elite: null,
      fixed: false
    },
    enemies: [
      {
        id: "enemy_1002_nsabr",
        level: 0,
        min_count: 129,
        max_count: 132,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 1450
        }
      },
      {
        id: "enemy_1046_agent",
        level: 0,
        min_count: 12,
        max_count: 18,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 1660
        }
      },
      {
        id: "enemy_1015_litamr",
        level: 0,
        min_count: 9,
        max_count: 18,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 2400
        }
      },
      {
        id: "enemy_1006_shield",
        level: 0,
        min_count: 0,
        max_count: 3,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          atk: 300
        }
      },
      {
        id: "enemy_2001_duckmi",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      }
    ]
  },
  {
    id: "ro1_e_3_5",
    levelId: "level_rogue1_3-5",
    tags: [
      "rogue_phantom"
    ],
    category: "combat_ops",
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "斗兽笼",
    name_ja: "闘獣の檻",
    name_en: "Beast_Fighting",
    description_zh: "这里原本的用途是观看猎犬互相厮杀，但现在......\n<@rolv.rem>干员部署后会立即损失一定百分比生命。</>",
    description_ja: "ここは元々、猟犬の殺し合いを鑑賞するための場所だった。だが今は……\n<@rolv.rem>オペレーターが配置された直後、一定割合のHPを失う。</>",
    description_en: "This place is originally meant for watching hounds fight each other, but now...\n<@rolv.rem>Operators will lose a certain percentage of HP when they are initially deployed</>",
    addInfo_zh: [
      "所有我方单位部署后流失50%最大生命值"
    ],
    addInfo_ja: [
      "味方ユニットが配置された直後、50%のHPを失う"
    ],
    addInfo_en: [
      "Allied units lose 50% HP upon deployment"
    ],
    eliteDesc_zh: [
      "所有敌方单位的攻击力+5%，生命值+30%",
      "所有我方单位部署后流失70%最大生命值"
    ],
    eliteDesc_ja: [
      "敵全員の攻撃力+5%、最大HP+30%",
      "配置直後のHP減少が70%に上昇"
    ],
    eliteDesc_en: [
      "All enemy units have +5% ATK, and +30% Max HP",
      "HP loss upon deployment increased to 70%"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          atk: 1.05,
          hp: 1.3
        }
      }
    ],
    routes: [
      {
        title: "combat_ops",
        type: "video",
        youtube_src: "Iza7HJRXguU",
        bilibili_src: null
      },
      {
        title: "gpn",
        type: "video",
        youtube_src: "d-FQXdiZgQY",
        bilibili_src: null
      }
    ],
    floors: [
      3
    ],
    sp_terrain: null,
    sp_enemy: {
      normal: 56,
      elite: null,
      fixed: true
    },
    enemies: [
      {
        id: "enemy_1000_gopro",
        level: 0,
        min_count: 9,
        max_count: 9,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 1e3
        }
      },
      {
        id: "enemy_1000_gopro_2",
        level: 0,
        min_count: 14,
        max_count: 14,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 2e3
        }
      },
      {
        id: "enemy_1000_gopro_3",
        level: 0,
        min_count: 25,
        max_count: 25,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 3700
        }
      },
      {
        id: "enemy_1024_mortar",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1003_ncbow_2",
        level: 0,
        min_count: 4,
        max_count: 4,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1033_handax_2",
        level: 0,
        min_count: 0,
        max_count: 2,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 16e3
        }
      },
      {
        id: "enemy_1026_aghost",
        level: 0,
        min_count: 0,
        max_count: 2,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2001_duckmi",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      }
    ]
  },
  {
    id: "ro1_e_3_6",
    levelId: "level_rogue1_3-6",
    tags: [
      "rogue_phantom"
    ],
    category: "combat_ops",
    characterLimit: 6,
    initialCost: 7,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "首演",
    name_ja: "初演",
    name_en: "Premiere",
    description_zh: "有些观众是第一次观赏剧团的演出，在舞者曼妙身姿的煽惑下，许多人都变得冲动而易怒，他们容不下半点对舞者的批评。",
    description_ja: "この劇団の舞台を初めて鑑賞する観客も少なくないが、踊り子が美しく艶めかしい姿態で観衆を煽ると、誰もが興奮し、逆上する。彼らは踊り子への批評を許さない。",
    description_en: "This is the first time some members of the audience are watching a performance of the troupe. The dancers' alluring postures have made many of them impetuous and easily angered. They will not tolerate even a single word of criticism against the dancers.",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: [
      "所有敌方单位的攻击力，生命值+15%",
      "绯红歌伶的防御力+50%"
    ],
    eliteDesc_ja: [
      "敵全員の攻撃力、最大HP+15%",
      "<緋色の歌姫>の防御力+50%"
    ],
    eliteDesc_en: [
      "All enemy units have +15% ATK, and +15% Max HP",
      "All <Scarlet Singer> have +50% DEF"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          atk: 1.15,
          hp: 1.15
        }
      },
      {
        targets: [
          "CS2"
        ],
        mods: {
          def: 1.5
        }
      }
    ],
    routes: [
      {
        title: "combat_ops",
        type: "video",
        youtube_src: "lWKX8z8849c",
        bilibili_src: null
      },
      {
        title: "gpn",
        type: "video",
        youtube_src: "JO6XKA0_x2o",
        bilibili_src: null
      }
    ],
    floors: [
      3
    ],
    sp_terrain: null,
    sp_enemy: {
      normal: 32,
      elite: null,
      fixed: true
    },
    enemies: [
      {
        id: "enemy_1002_nsabr",
        level: 0,
        min_count: 7,
        max_count: 9,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1032_katar",
        level: 0,
        min_count: 10,
        max_count: 10,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1030_wteeth",
        level: 0,
        min_count: 6,
        max_count: 11,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2001_duckmi",
        level: 0,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 0,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2009_csaudc",
        level: 0,
        min_count: 1,
        max_count: 4,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2010_csdcr",
        level: 0,
        min_count: 2,
        max_count: 2,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      }
    ]
  },
  {
    id: "ro1_e_3_7",
    levelId: "level_rogue1_3-7",
    tags: [
      "rogue_phantom"
    ],
    category: "combat_ops",
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "感化",
    name_ja: "感化",
    name_en: "Reform",
    description_zh: "剧团接纳了这批囚犯并许诺他们自由，他们所不知道的是，从此刻开始，肉体虽得解放，灵魂永囚牢笼。",
    description_ja: "劇団は囚人たちを受け入れ、自由を与えた。だが彼らは知らないのだ。その瞬間から、肉体は解放されても、魂は永遠に囚われるということを。",
    description_en: "The troupe accepted these prisoners and promised them freedom. What these convicts don't know is that even though their bodies will be freed from this moment, their souls will forever be imprisoned.",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: [
      "所有敌方单位的攻击力，防御力+10%，生命值+40%",
      "强壮囚犯和拳手囚犯被替换为拳师囚犯"
    ],
    eliteDesc_ja: [
      "敵全員の攻撃力、防御力+10%、最大HP+40%",
      "<巨漢囚人>と<拳闘士囚人>が<重罪拳闘士囚人>に替わる"
    ],
    eliteDesc_en: [
      "All enemy units have +10% ATK, +10% DEF, and +40% Max HP",
      "All <Strongman Prisoner> and <Pugilist Prisoner> are replaced by <Elite Pugilist Prisoner>"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          atk: 1.1,
          def: 1.1,
          hp: 1.4
        }
      }
    ],
    routes: [
      {
        title: "combat_ops",
        type: "video",
        youtube_src: "-7CqlwrwHxU",
        bilibili_src: null
      },
      {
        title: "duck",
        type: "video",
        youtube_src: "2UyUmYF6TGA",
        bilibili_src: null
      }
    ],
    floors: [
      3
    ],
    sp_terrain: null,
    sp_enemy: {
      normal: 32,
      elite: null,
      fixed: true
    },
    enemies: [
      {
        id: "enemy_2010_csdcr",
        level: 0,
        min_count: 2,
        max_count: 2,
        elite_min_count: 2,
        elite_max_count: 2,
        overwrittenData: null
      },
      {
        id: "enemy_2012_csbln",
        level: 0,
        min_count: 3,
        max_count: 3,
        elite_min_count: 3,
        elite_max_count: 3,
        overwrittenData: null
      },
      {
        id: "enemy_1116_liprr",
        level: 0,
        min_count: 16,
        max_count: 16,
        elite_min_count: 16,
        elite_max_count: 16,
        overwrittenData: null
      },
      {
        id: "enemy_1117_liiprr",
        level: 0,
        min_count: 5,
        max_count: 5,
        elite_min_count: 5,
        elite_max_count: 5,
        overwrittenData: null
      },
      {
        id: "enemy_1118_lidbox",
        level: 0,
        min_count: 0,
        max_count: 5,
        elite_min_count: 0,
        elite_max_count: 5,
        overwrittenData: {
          hp: 1e4
        }
      },
      {
        id: "enemy_1118_lidbox_2",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 11e3,
          atk: 350
        }
      },
      {
        id: "enemy_1119_vofsd",
        level: 0,
        min_count: 0,
        max_count: 5,
        elite_min_count: 0,
        elite_max_count: 5,
        overwrittenData: null
      },
      {
        id: "enemy_2001_duckmi",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      }
    ]
  },
  {
    id: "ro1_e_3_8",
    levelId: "level_rogue1_3-8",
    tags: [
      "rogue_phantom"
    ],
    category: "combat_ops",
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "雕匠与石像",
    name_ja: "彫刻師と石像",
    name_en: "Sculptor_and_Statue",
    description_zh: "雕匠需要糊口，石像需要维护，谁来提供资源呢？思来想去，也只有路过的旅人了。\n<@rolv.rem>场地中有可以被相邻干员击倒、对倒下方向造成伤害并生成阻挡路线废墟的<破碎支柱>，且干员布置不受近远程限制。</>",
    description_ja: "彫刻師は生計を立てねばならず、石像には手入れが必要だ。となれば、材料は誰が提供するのだろうか？ 一通り考えてはみたが、やはり道行く旅人以外にないようだ。\n<@rolv.rem>戦場に隣接する味方ユニットの攻撃で倒壊させることができ、倒壊した方向の対象にダメージを与え、敵の進行を阻む瓦礫を生成する<脆い石柱>があり、オペレーターは遠近の制限を受けず自由な位置に配置可能。</>",
    description_en: "The sculptor needs his livelihood. The statue needs maintenance. Who will provide the resources? Only the passing traveler. \n<@rolv.rem>There are <Tattered Pillars> that can be knocked down by neighboring Operators, dealing damage to the two tiles it falls on and forming rubble that blocks routes; No melee/ranged deployment restrictions</>",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: [
      "所有敌方单位的攻击力，防御力+10%，生命值+20%",
      "深池方阵战士被替换为深池方阵指挥官",
      "出现更多的深池方阵指挥官"
    ],
    eliteDesc_ja: [
      "敵全員の攻撃力、防御力+10%、最大HP+20%",
      "<ダブリン方陣戦士>が<ダブリン方陣指揮官>に替わる",
      "最初に追加で4体の<ダブリン方陣指揮官>が出現する"
    ],
    eliteDesc_en: [
      "All enemy units have +10% ATK, +10% DEF, and +20% Max HP",
      "All <Dublinn Phalanx Infantry> are replaced by <Dublinn Phalanx Commander>",
      "Additional 4 <Dublinn Phalanx Commander> appears at the start"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          atk: 1.1,
          def: 1.1,
          hp: 1.2
        }
      }
    ],
    routes: [
      {
        title: "combat_ops",
        type: "video",
        youtube_src: "2MSjFUvTeX8",
        bilibili_src: null
      },
      {
        title: "combat_ops",
        type: "video",
        youtube_src: "xPm_3WgAaJE",
        bilibili_src: null
      },
      {
        title: "emergency_ops",
        type: "video",
        youtube_src: "EjOIaBsBNvo",
        bilibili_src: null
      },
      {
        title: "duck",
        type: "video",
        youtube_src: "6dIUzdY4deI",
        bilibili_src: null
      },
      {
        title: "gpn",
        type: "video",
        youtube_src: "WUhuuD1iWWE",
        bilibili_src: null
      }
    ],
    floors: [
      3
    ],
    sp_terrain: null,
    sp_enemy: {
      normal: 35,
      elite: 40,
      fixed: true
    },
    enemies: [
      {
        id: "enemy_1000_gopro_2",
        level: 0,
        min_count: 9,
        max_count: 9,
        elite_min_count: 9,
        elite_max_count: 9,
        overwrittenData: {
          hp: 2500
        }
      },
      {
        id: "enemy_1002_nsabr",
        level: 1,
        min_count: 9,
        max_count: 9,
        elite_min_count: 9,
        elite_max_count: 9,
        overwrittenData: null
      },
      {
        id: "enemy_1169_duphlx",
        level: 0,
        min_count: 14,
        max_count: 14,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1169_duphlx_2",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: 19,
        elite_max_count: 19,
        overwrittenData: null
      },
      {
        id: "enemy_1172_dugago",
        level: 0,
        min_count: 2,
        max_count: 2,
        elite_min_count: 2,
        elite_max_count: 2,
        overwrittenData: null
      },
      {
        id: "enemy_2001_duckmi",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      }
    ]
  },
  {
    id: "ro1_e_4_1",
    levelId: "level_rogue1_4-1",
    tags: [
      "rogue_phantom"
    ],
    category: "combat_ops",
    characterLimit: 6,
    initialCost: 40,
    costIncreaseTime: 3,
    code: "ISW-NO",
    name_zh: "步步紧逼",
    name_ja: "過去からの刺客",
    name_en: "Pressing_Ahead",
    description_zh: "往昔的敌人从阴影中一一浮现，然而，他们的装备似乎比之前更加精良。\n<@rolv.rem>部署费用回复缓慢，且干员布置不受近远程限制。</>",
    description_ja: "昔の敵が影の中にゆらりと現れる。だが、彼らの装備は以前のものより良くなっているようだ。\n<@rolv.rem>コストの回復スピードが遅くなる。また、オペレーターは遠近の制限を受けず自由な位置に配置可能。</>",
    description_en: "The enemies of the past all emerge from the shadows one by one, yet their equipment seems multitudes better than before.\n<@rolv.rem>DP recovery rate is decreased, and tiles do not have melee/ranged restrictions</>",
    addInfo_zh: [
      "每3秒回复1点部署费用"
    ],
    addInfo_ja: [
      "コスト回復速度が3分の1になる"
    ],
    addInfo_en: [
      "DP regen rate decreased to 1/3"
    ],
    eliteDesc_zh: [
      "所有敌方单位的攻击力+20%，防御力+10%，生命值+30%"
    ],
    eliteDesc_ja: [
      "敵全員の攻撃力+20%、防御力+10%、最大HP+30%"
    ],
    eliteDesc_en: [
      "All enemy units have +20% ATK, +10% DEF, and +30% Max HP"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          atk: 1.2,
          def: 1.1,
          hp: 1.3
        }
      }
    ],
    routes: [
      {
        title: "combat_ops",
        type: "video",
        youtube_src: "JBEea6Fg0Qw",
        bilibili_src: null
      },
      {
        title: "gpn",
        type: "video",
        youtube_src: "LbYSv2i-heM",
        bilibili_src: null
      }
    ],
    floors: [
      4
    ],
    sp_terrain: [
      {
        tileKey: "tile_hole",
        alias: null,
        blackboard: null
      },
      {
        tileKey: "tile_healing",
        alias: null,
        blackboard: {
          HP_RECOVERY_PER_SEC_BY_MAX_HP_RATIO: 0.03
        }
      }
    ],
    sp_enemy: {
      normal: 37,
      elite: null,
      fixed: true
    },
    enemies: [
      {
        id: "enemy_1015_litamr_2",
        level: 0,
        min_count: 14,
        max_count: 14,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 3e3
        }
      },
      {
        id: "enemy_1045_hammer",
        level: 0,
        min_count: 4,
        max_count: 4,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 16e3
        }
      },
      {
        id: "enemy_1041_lazerd_2",
        level: 0,
        min_count: 4,
        max_count: 4,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 5500,
          atk: 320,
          res: 40,
          range: 2.3
        }
      },
      {
        id: "enemy_1039_breakr_2",
        level: 0,
        min_count: 4,
        max_count: 4,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 8e3
        }
      },
      {
        id: "enemy_1031_mrogue_2",
        level: 0,
        min_count: 10,
        max_count: 10,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 8500,
          atk: 460
        }
      },
      {
        id: "enemy_2001_duckmi",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      }
    ]
  },
  {
    id: "ro1_e_4_2",
    levelId: "level_rogue1_4-2",
    tags: [
      "rogue_phantom"
    ],
    category: "combat_ops",
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "阴云笼罩",
    name_ja: "覆う黒雲",
    name_en: "Shrouded_in_Clouds",
    description_zh: "这里烟雾缭绕，令人呼吸困难，你想尽快离开，可黑暗中的敌人们并不这么打算。\n<@rolv.rem>场地中有使我方单位持续失去生命的<毒性雾霾>。</>",
    description_ja: "この煙が充満した場所では、呼吸困難になってしまう。あなたは一刻も早い離脱を狙うが、闇の中の敵はそんなことを許すつもりは無い。\n<@rolv.rem>戦場に味方のHPを徐々に減少させる<毒性ガス>が蔓延している。</>",
    description_en: "With how difficult it is to breathe here because of all the smog, you want to get away as soon as possible. The enemies lurking in the dark have a different idea, though.\n<@rolv.rem><Poison Haze> Operators lose HP constantly.</>",
    addInfo_zh: [
      "毒性雾霾 - 我方单位每0.5秒持续受到15真实伤害"
    ],
    addInfo_ja: [
      "毒性ガス - 味方ユニットに0.5秒ごとに15確定ダメージ"
    ],
    addInfo_en: [
      "Poison Haze - Allied units receive 15 True damage / 0.5s"
    ],
    eliteDesc_zh: [
      "所有敌方单位的攻击力+25%，防御力+20%，生命值+50%"
    ],
    eliteDesc_ja: [
      "敵全員の攻撃力+25%、防御力+20%、最大HP+50%"
    ],
    eliteDesc_en: [
      "All enemy units have +25% ATK, +20% DEF, and +50% Max HP"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          atk: 1.25,
          def: 1.2,
          hp: 1.5
        }
      }
    ],
    routes: [
      {
        title: "combat_ops",
        type: "video",
        youtube_src: "x2hYbfdlN0g",
        bilibili_src: null
      },
      {
        title: "duck",
        type: "video",
        youtube_src: "9XIFfeqr2k8",
        bilibili_src: null
      }
    ],
    floors: [
      4
    ],
    sp_terrain: [
      {
        tileKey: "tile_hole",
        alias: null,
        blackboard: null
      }
    ],
    sp_enemy: {
      normal: 52,
      elite: null,
      fixed: true
    },
    enemies: [
      {
        id: "enemy_1000_gopro_3",
        level: 0,
        min_count: 30,
        max_count: 30,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 5e3
        }
      },
      {
        id: "enemy_1024_mortar_2",
        level: 0,
        min_count: 1,
        max_count: 2,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 7e3,
          atk: 400
        }
      },
      {
        id: "enemy_1025_reveng_2",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 25e3,
          atk: 530,
          def: 280
        }
      },
      {
        id: "enemy_1011_wizard_2",
        level: 0,
        min_count: 3,
        max_count: 4,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 4800,
          def: 150
        }
      },
      {
        id: "enemy_1038_lunmag",
        level: 0,
        min_count: 0,
        max_count: 2,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          atk: 200,
          def: 400
        }
      },
      {
        id: "enemy_1038_lunmag_2",
        level: 0,
        min_count: 6,
        max_count: 8,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 1e4
        }
      },
      {
        id: "enemy_1021_bslime",
        level: 0,
        min_count: 6,
        max_count: 8,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1021_bslime_2",
        level: 0,
        min_count: 0,
        max_count: 2,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2001_duckmi",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      }
    ]
  },
  {
    id: "ro1_e_4_3",
    levelId: "level_rogue1_4-3",
    tags: [
      "rogue_phantom"
    ],
    category: "combat_ops",
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "烟花秀",
    name_ja: "花火ショー",
    name_en: "Fireworks_Show",
    description_zh: "负责造景的演员已经准备就绪，只等观众们前来，将烟花“放”在他们头上。",
    description_ja: "舞台装置を担当する劇団員は、既に準備万端。あとはやってきた観客の頭上に花火を「放つ」だけだ。",
    description_en: "The actors setting the stage are ready to go. All there is left to do is to have the audience members come forward and 'place' the fireworks on their heads.",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: [
      "所有敌方单位的攻击力+30%，生命值+30%",
      "反装甲步兵被替换为反装甲步兵组长"
    ],
    eliteDesc_ja: [
      "敵全員の攻撃力+30%、最大HP+30%",
      "<対装甲歩兵>が<対装甲歩兵隊長>に替わる"
    ],
    eliteDesc_en: [
      "All enemy units have +30% ATK and +30% Max HP",
      "All <Anti-Armor Infantry> are replaced by <Anti-Armor Infantry Leader>"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          atk: 1.3,
          hp: 1.3
        }
      }
    ],
    routes: [
      {
        title: "combat_ops",
        type: "video",
        youtube_src: "G9195vVSAbU",
        bilibili_src: null
      },
      {
        title: "gpn",
        type: "video",
        youtube_src: "LLlDihmqprs",
        bilibili_src: null
      }
    ],
    floors: [
      4
    ],
    sp_terrain: null,
    sp_enemy: {
      normal: 30,
      elite: null,
      fixed: true
    },
    enemies: [
      {
        id: "enemy_1509_mousek",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: 1,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_1040_bombd_2",
        level: 0,
        min_count: 2,
        max_count: 2,
        elite_min_count: 2,
        elite_max_count: 2,
        overwrittenData: {
          hp: 8e3
        }
      },
      {
        id: "enemy_1143_merrpg",
        level: 0,
        min_count: 4,
        max_count: 9,
        elite_min_count: 0,
        elite_max_count: 5,
        overwrittenData: null
      },
      {
        id: "enemy_1143_merrpg_2",
        level: 0,
        min_count: 1,
        max_count: 6,
        elite_min_count: 5,
        elite_max_count: 10,
        overwrittenData: null
      },
      {
        id: "enemy_1021_bslime",
        level: 0,
        min_count: 8,
        max_count: 8,
        elite_min_count: 8,
        elite_max_count: 8,
        overwrittenData: null
      },
      {
        id: "enemy_1021_bslime_2",
        level: 0,
        min_count: 6,
        max_count: 8,
        elite_min_count: 6,
        elite_max_count: 8,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2001_duckmi",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      }
    ]
  },
  {
    id: "ro1_e_4_4",
    levelId: "level_rogue1_4-4",
    tags: [
      "rogue_phantom"
    ],
    category: "combat_ops",
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "永无尽头",
    name_ja: "エンドレスチャージ",
    name_en: "Unending",
    description_zh: "一群萨卡兹在此陷入噩梦，他们永远被恐惧驱策，向着前方疯狂奔蹿。\n<@rolv.rem>场地中有开启后伤害并晕眩周围敌人的<震撼装置>。</>",
    description_ja: "サルカズの集団が、悪夢に囚われてしまった。彼らは恐怖に駆られ、狂ったように前へ進み続ける。\n<@rolv.rem>戦場にコストを消費し起動すると周囲の敵にダメージを与えスタンさせる<EMP発生装置>が設置されている。</>",
    description_en: "A group of Sarkaz men are having nightmares. Driven by their fear, they scramble ever forward,\n<@rolv.rem><Stun Generator> Pay a cost to activate it, damaging and stunning nearby enemies. </>",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: [
      "所有敌方单位的攻击力+20%，移动速度+30%"
    ],
    eliteDesc_ja: [
      "敵全員の攻撃力+20%、移動速度+30%"
    ],
    eliteDesc_en: [
      "All enemy units have +20% ATK and +30% Movement Speed"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          ms: 1.3,
          hp: 1.2
        }
      }
    ],
    routes: [
      {
        title: "combat_ops",
        type: "video",
        youtube_src: "e0TL5ohmlVA",
        bilibili_src: null
      }
    ],
    floors: [
      4
    ],
    sp_terrain: null,
    sp_enemy: {
      normal: 32,
      elite: null,
      fixed: true
    },
    enemies: [
      {
        id: "enemy_1072_dlancer",
        level: 0,
        min_count: 26,
        max_count: 26,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 7e3
        }
      },
      {
        id: "enemy_1072_dlancer_2",
        level: 0,
        min_count: 5,
        max_count: 5,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 9e3
        }
      },
      {
        id: "enemy_2001_duckmi",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      }
    ]
  },
  {
    id: "ro1_e_4_5",
    levelId: "level_rogue1_4-5",
    tags: [
      "rogue_phantom"
    ],
    category: "combat_ops",
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "远方来客",
    name_ja: "遠方からの来客",
    name_en: "Traveler_From_Afar",
    description_zh: "他们来到这里是为了给塔拉争取更多盟友，无论这些“艺术家”是善是恶。",
    description_ja: "彼らはさらなる盟友をターラーに引き入れるため、ここに来た。これら「芸術家」たちの善悪など二の次だ。",
    description_en: "These men are here in search of allies who will help the Taran cause, no matter if the 'artists' here are good or evil.",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: [
      "所有敌方单位的攻击力，防御力，生命值+25%",
      "深池塑能术师被替换为深池塑能术师队长"
    ],
    eliteDesc_ja: [
      "敵全員の攻撃力、防御力、最大HP+25%",
      "<ダブリン喚起術師>が<ダブリン喚起術師隊長>に替わる"
    ],
    eliteDesc_en: [
      "All enemy units have +25% ATK, +25% DEF, and +25% Max HP",
      "All <Dublinn Evocator> are replaced by <Dublinn Evocator Leader>"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          atk: 1.25,
          def: 1.25,
          hp: 1.25
        }
      }
    ],
    routes: [
      {
        title: "combat_ops",
        type: "video",
        youtube_src: "zjnye9wijMk",
        bilibili_src: null
      },
      {
        title: "duck",
        type: "video",
        youtube_src: "ObLFSoa_IKM",
        bilibili_src: null
      }
    ],
    floors: [
      4
    ],
    sp_terrain: [
      {
        tileKey: "tile_hole",
        alias: null,
        blackboard: null
      }
    ],
    sp_enemy: {
      normal: 50,
      elite: null,
      fixed: false
    },
    enemies: [
      {
        id: "enemy_1165_duhond",
        level: 0,
        min_count: 34,
        max_count: 36,
        elite_min_count: 34,
        elite_max_count: 36,
        overwrittenData: null
      },
      {
        id: "enemy_1171_durokt",
        level: 0,
        min_count: 0,
        max_count: 3,
        elite_min_count: 0,
        elite_max_count: 3,
        overwrittenData: null
      },
      {
        id: "enemy_1171_durokt_2",
        level: 0,
        min_count: 2,
        max_count: 6,
        elite_min_count: 2,
        elite_max_count: 6,
        overwrittenData: null
      },
      {
        id: "enemy_1170_dushld",
        level: 0,
        min_count: 2,
        max_count: 3,
        elite_min_count: 2,
        elite_max_count: 3,
        overwrittenData: {
          hp: 8e3
        }
      },
      {
        id: "enemy_1170_dushld_2",
        level: 0,
        min_count: 3,
        max_count: 3,
        elite_min_count: 3,
        elite_max_count: 3,
        overwrittenData: {
          hp: 11e3
        }
      },
      {
        id: "enemy_1176_dusocr",
        level: 0,
        min_count: 2,
        max_count: 2,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 22e3
        }
      },
      {
        id: "enemy_1176_dusocr_2",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: 2,
        elite_max_count: 2,
        overwrittenData: {
          hp: 35e3
        }
      },
      {
        id: "enemy_2001_duckmi",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_1177_dufrbl",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1177_dufrbl_2",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          atk: 1e3
        }
      }
    ]
  },
  {
    id: "ro1_e_4_6",
    levelId: "level_rogue1_4-6",
    tags: [
      "rogue_phantom"
    ],
    category: "combat_ops",
    characterLimit: 6,
    initialCost: 7,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "共舞",
    name_ja: "ナイトフィーバー",
    name_en: "A_Dance_Together",
    description_zh: "舞者与观众在舞台上共舞，礼物则由气球全场派送。漫漫长夜，享乐才刚刚开始。",
    description_ja: "ダンサーと観客が、一緒にステージで踊る。プレゼントは風船で劇場全体に運ばれていく。長い長い夜、享楽はたった今始まったばかりだ。",
    description_en: "The dancers and audience members are dancing together, and there are balloons sending presents to everyone all around the ballroom. The night is young, and the excitement has just begun.",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: [
      "所有敌方单位的攻击力，生命值+20%",
      "绯红歌伶的防御力+100%"
    ],
    eliteDesc_ja: [
      "敵全員の攻撃力、最大HP+20%",
      "<緋色の歌姫>の防御力+100%"
    ],
    eliteDesc_en: [
      "All enemy units have +20% ATK, and +20% Max HP",
      "All <Scarlet Singer> have +100% DEF"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          atk: 1.2,
          hp: 1.2
        }
      },
      {
        targets: [
          "CS2"
        ],
        mods: {
          def: 2
        }
      }
    ],
    routes: [
      {
        title: "combat_ops",
        type: "video",
        youtube_src: "-mmcomH-imw",
        bilibili_src: null
      }
    ],
    floors: [
      4
    ],
    sp_terrain: null,
    sp_enemy: {
      normal: 24,
      elite: null,
      fixed: false
    },
    enemies: [
      {
        id: "enemy_2009_csaudc",
        level: 0,
        min_count: 6,
        max_count: 10,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2010_csdcr",
        level: 0,
        min_count: 3,
        max_count: 3,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2012_csbln",
        level: 0,
        min_count: 10,
        max_count: 10,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2001_duckmi",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      }
    ]
  },
  {
    id: "ro1_e_4_7",
    levelId: "level_rogue1_4-7",
    tags: [
      "rogue_phantom"
    ],
    category: "combat_ops",
    characterLimit: 6,
    initialCost: 15,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "鲍勃酒品",
    name_ja: "ボブ酒造",
    name_en: "Bob's_Beers",
    description_zh: "你看到一群歹徒正在整理他们抢来的物资——大量的源石虫啤酒与运送高能源石虫提取物的无人机。或许你能帮忙抢回酒商的物资，他们会高兴的。",
    description_ja: "あなたは悪党が強奪した物資――大量のオリジムシビールと、バクダンムシエキス運搬用ドローン――を整理しているところを目撃した。酒屋の物資を取り返す手伝いができれば、商人たちも喜んでくれるかもしれない。",
    description_en: "You see a group of ruffians sorting out the supplies they made off with—a large amount of Originium slug beer and drones transporting infused Originium slug extract. Perhaps you can help the brewers get their supplies back. They'll be very happy about it.",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: [
      "所有敌方单位的攻击力，防御力+10%，生命值+30%",
      "打手被替换为精干打手",
      "出现更多的暴鸰·G"
    ],
    eliteDesc_ja: [
      "敵全員の攻撃力、防御力+10%、最大HP+30%",
      "<拳闘士崩れ>が<凶悪拳闘士>に替わる",
      "追加で4体の<バクダンバチG>が出現する"
    ],
    eliteDesc_en: [
      "All enemy units have +10% ATK, +10% DEF and +30% Max HP",
      "All <Brawler> are replaced by <Elite Brawler>",
      "Additional 4 <Bombtail-G> appears"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          atk: 1.1,
          def: 1.1,
          hp: 1.3
        }
      }
    ],
    routes: [
      {
        title: "combat_ops",
        type: "video",
        youtube_src: "Rnc71nCgbo4",
        bilibili_src: null
      },
      {
        title: "gpn",
        type: "video",
        youtube_src: "dHohdTBrWCM",
        bilibili_src: null
      }
    ],
    floors: [
      4
    ],
    sp_terrain: null,
    sp_enemy: {
      normal: 51,
      elite: 55,
      fixed: true
    },
    enemies: [
      {
        id: "enemy_1056_ganwar",
        level: 0,
        min_count: 0,
        max_count: 10,
        elite_min_count: 0,
        elite_max_count: 10,
        overwrittenData: {
          hp: 4e3,
          atk: 340
        }
      },
      {
        id: "enemy_1056_ganwar_2",
        level: 0,
        min_count: 11,
        max_count: 21,
        elite_min_count: 11,
        elite_max_count: 21,
        overwrittenData: {
          hp: 5e3,
          atk: 420
        }
      },
      {
        id: "enemy_1080_sotidp_2",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: 1,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_1005_yokai_2",
        level: 1,
        min_count: 16,
        max_count: 17,
        elite_min_count: 16,
        elite_max_count: 17,
        overwrittenData: null
      },
      {
        id: "enemy_1017_defdrn",
        level: 1,
        min_count: 3,
        max_count: 3,
        elite_min_count: 3,
        elite_max_count: 3,
        overwrittenData: null
      },
      {
        id: "enemy_1040_bombd_2",
        level: 0,
        min_count: 8,
        max_count: 9,
        elite_min_count: 12,
        elite_max_count: 13,
        overwrittenData: null
      },
      {
        id: "enemy_2001_duckmi",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      }
    ]
  },
  {
    id: "ro1_e_4_8",
    levelId: "level_rogue1_4-8",
    tags: [
      "rogue_phantom"
    ],
    category: "combat_ops",
    characterLimit: 6,
    initialCost: 3,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "雪山上的来客",
    name_ja: "雪山の来客",
    name_en: "Alpine_Visitor",
    description_zh: "并非每个见识过宽广大地的谢拉格人都愿意回到苦寒之地。有些人背弃了喀兰，选择过上新的生活。\n<@rolv.rem>场地中有持续对周围施加【寒冷】效果的<源石冰晶>。</>",
    description_ja: "広大な大地を目にしたイェラグ人が全員、酷寒の地へと帰りたがるわけではない。一部の人々はカランドを捨て、新たな生活を選んだ。\n<@rolv.rem>戦場に一定時間ごとに周囲を【寒冷】状態にする衝撃波を放出する<源石氷晶>が設置されている。</>",
    description_en: "Not everyone who has seen the world outside is willing to return to the land of ice and snow. Some have chosen to abandon Karlan for a new life. \n<@rolv.rem>There are <Originium Ice Crystals> that periodically inflict [Cold] to nearby units.</>",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: [
      "所有敌方单位的攻击力，生命值+10%",
      "霜星的源石冰晶被替换为源石冰晶(敌方)"
    ],
    eliteDesc_ja: [
      "敵全員の攻撃力、最大HP+10%",
      "<フロストノヴァの源石氷晶>が<源石氷晶（敵）>に替わる"
    ],
    eliteDesc_en: [
      "All enemy units have +10% ATK and +10% Max HP",
      "All <FrostNova's Originium Ice Crystal> are replaced by <Originium Ice Crystal>"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          atk: 1.1,
          hp: 1.1
        }
      }
    ],
    routes: [
      {
        title: "combat_ops",
        type: "video",
        youtube_src: "sSgUHTNAFeM",
        bilibili_src: null
      },
      {
        title: "emergency_ops",
        type: "video",
        youtube_src: "snDJH6W4Yzo",
        bilibili_src: null
      },
      {
        title: "gpn",
        type: "video",
        youtube_src: "coRC-01qQSw",
        bilibili_src: null
      }
    ],
    floors: [
      4
    ],
    sp_terrain: null,
    sp_enemy: {
      normal: 59,
      elite: null,
      fixed: true
    },
    enemies: [
      {
        id: "enemy_2011_csppt",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1191_krgrg",
        level: 0,
        min_count: 10,
        max_count: 10,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 1e4,
          def: 300,
          res: 40,
          talentBlackboard: [
            {
              key: "icefield_arts_fighter_explode",
              duration: 10
            }
          ]
        }
      },
      {
        id: "enemy_1189_krgaxe",
        level: 0,
        min_count: 33,
        max_count: 33,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1187_krghd",
        level: 0,
        min_count: 12,
        max_count: 12,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1193_krgbsk_2",
        level: 0,
        min_count: 2,
        max_count: 2,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 21e3,
          def: 800
        }
      },
      {
        id: "enemy_2001_duckmi",
        level: 0,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 0,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      }
    ]
  },
  {
    id: "ro1_e_5_1",
    levelId: "level_rogue1_5-1",
    tags: [
      "rogue_phantom"
    ],
    category: "combat_ops",
    characterLimit: 6,
    initialCost: 25,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "无人机起降库",
    name_ja: "ドローン発着庫",
    name_en: "Drone_Landing_Zone",
    description_zh: "剧团并非迂腐的古老组织，他们在追求古典趣味时，也乐于使用现代科技，面前铺天盖地的无人机就是一例。",
    description_ja: "劇団というものは、けっして陳腐で古臭い集団ではない。彼らは古き良き芸術を追求すると同時に、喜んで現代的な科学技術も用いる。目の前の空間を覆うほどのドローンがその一例だ。",
    description_en: "The Troupe isn't a conservative, ancient organization. In addition to their pursuit in their classical interests, they also take pleasure in employing modern technologies, such as the swarm of drones above your head.",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: [
      "所有敌方单位的攻击力，防御力+10%，生命值+35%"
    ],
    eliteDesc_ja: [
      "敵全員の攻撃力、防御力+10%、最大HP+35%"
    ],
    eliteDesc_en: [
      "All enemy units have +10% ATK, +10% DEF and +35% Max HP"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          atk: 1.1,
          def: 1.1,
          hp: 1.35
        }
      }
    ],
    routes: [
      {
        title: "combat_ops",
        type: "video",
        youtube_src: "JneAPOfr0S4",
        bilibili_src: null
      },
      {
        title: "gpn",
        type: "video",
        youtube_src: "hNiza0UiDQs",
        bilibili_src: null
      }
    ],
    floors: [
      5
    ],
    sp_terrain: [
      {
        tileKey: "tile_hole",
        alias: null,
        blackboard: null
      }
    ],
    sp_enemy: {
      normal: 66,
      elite: null,
      fixed: false
    },
    enemies: [
      {
        id: "enemy_1005_yokai",
        level: 1,
        min_count: 16,
        max_count: 24,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 3e3,
          def: 100
        }
      },
      {
        id: "enemy_1005_yokai_3",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 56e3,
          atk: 780,
          def: 400
        }
      },
      {
        id: "enemy_1041_lazerd",
        level: 0,
        min_count: 4,
        max_count: 13,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 4500,
          def: 140
        }
      },
      {
        id: "enemy_1041_lazerd_2",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 13e3,
          def: 200
        }
      },
      {
        id: "enemy_1017_defdrn",
        level: 1,
        min_count: 4,
        max_count: 4,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 11e3
        }
      },
      {
        id: "enemy_1032_katar",
        level: 0,
        min_count: 4,
        max_count: 4,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 8e3,
          def: 500
        }
      },
      {
        id: "enemy_1002_nsabr",
        level: 1,
        min_count: 16,
        max_count: 16,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 3600
        }
      },
      {
        id: "enemy_1003_ncbow_2",
        level: 1,
        min_count: 10,
        max_count: 10,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 4e3
        }
      },
      {
        id: "enemy_2001_duckmi",
        level: 2,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 2,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      }
    ]
  },
  {
    id: "ro1_e_5_2",
    levelId: "level_rogue1_5-2",
    tags: [
      "rogue_phantom"
    ],
    category: "combat_ops",
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "红雾弥漫",
    name_ja: "赤い霧の眠らぬ夜",
    name_en: "The_Red_Mist",
    description_zh: "午夜已至，不祥红雾悄然弥漫，它在寻找尚存理智的灵魂，随后伺机将之拖入深渊。\n<@rolv.rem>场地中有使我方单位持续失去生命的<毒性雾霾>。</>",
    description_ja: "真夜中、不気味な赤い霧が立ち込める。それは今なお理性を宿す魂を探し出し、深淵へ引きずり込む機会を伺っているのだ。\n<@rolv.rem>戦場に味方のHPを徐々に減少させる<毒性ガス>が蔓延している。</>",
    description_en: "It is now midnight, and the ominous red mist is still spreading throughout the area. The mist is seeking out souls that still have sanity left in order to drag them into the deep abyss.\n<@rolv.rem><Poison Haze> Operators lose HP constantly.</>",
    addInfo_zh: [
      "毒性雾霾 - 我方单位每0.5秒持续受到25真实伤害"
    ],
    addInfo_ja: [
      "毒性ガス - 味方ユニットに0.5秒ごとに25確定ダメージ"
    ],
    addInfo_en: [
      "Poison Haze - Allied units receive 25 True damage / 0.5s"
    ],
    eliteDesc_zh: [
      "所有敌方单位的攻击力+25%，防御力+10%，生命值+40%"
    ],
    eliteDesc_ja: [
      "敵全員の攻撃力+25%、防御力+10%、最大HP+40%"
    ],
    eliteDesc_en: [
      "All enemy units have +25% ATK, +10% DEF and +40% Max HP"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          atk: 1.25,
          def: 1.1,
          hp: 1.4
        }
      }
    ],
    routes: [
      {
        title: "combat_ops",
        type: "video",
        youtube_src: "5hVrZ-s4MPc",
        bilibili_src: null
      }
    ],
    floors: [
      5
    ],
    sp_terrain: [
      {
        tileKey: "tile_hole",
        alias: null,
        blackboard: null
      }
    ],
    sp_enemy: {
      normal: 60,
      elite: null,
      fixed: true
    },
    enemies: [
      {
        id: "enemy_1039_breakr",
        level: 0,
        min_count: 22,
        max_count: 22,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1039_breakr_2",
        level: 0,
        min_count: 30,
        max_count: 30,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1036_amraoe",
        level: 0,
        min_count: 2,
        max_count: 3,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 12e3,
          atk: 420,
          def: 400
        }
      },
      {
        id: "enemy_1501_demonk",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 25e3,
          atk: 900,
          weight: 4
        }
      },
      {
        id: "enemy_1049_eagent_2",
        level: 0,
        min_count: 3,
        max_count: 4,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2001_duckmi",
        level: 2,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 2,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      }
    ]
  },
  {
    id: "ro1_e_5_3",
    levelId: "level_rogue1_5-3",
    tags: [
      "rogue_phantom"
    ],
    category: "combat_ops",
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "仪式之夜",
    name_ja: "儀式の夜",
    name_en: "The_Night_of_Ritual",
    description_zh: "神秘的仪式经由红月将为这些萨卡兹带来无与伦比的力量，在仪式进行到最后一刻时，你打翻了祭坛上的蜡烛。",
    description_ja: "サルカズたちが赤い月より比類なき力を得るために、神秘的な儀式を執り行っている。しかし儀式が終わる直前に、あなたは祭壇の蝋燭をひっくり返した。",
    description_en: "The mysterious ceremony has given these Sarkaz soldiers unprecedented strength by harnessing the red moon's power. At the very last moment of the ceremony, you knock over a candle on the altar.",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: [
      "所有敌方单位的攻击力+20%，生命值+40%"
    ],
    eliteDesc_ja: [
      "敵全員の攻撃力+20%、最大HP+40%"
    ],
    eliteDesc_en: [
      "All enemy units have +20% ATK and +40% Max HP"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          atk: 1.2,
          hp: 1.4
        }
      }
    ],
    routes: [
      {
        title: "combat_ops",
        type: "video",
        youtube_src: "L22ZY_xRUBo",
        bilibili_src: null
      }
    ],
    floors: [
      5
    ],
    sp_terrain: null,
    sp_enemy: {
      normal: 47,
      elite: null,
      fixed: true
    },
    enemies: [
      {
        id: "enemy_1071_dftman",
        level: 0,
        min_count: 23,
        max_count: 23,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 3500
        }
      },
      {
        id: "enemy_1071_dftman_2",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1010_demon",
        level: 0,
        min_count: 12,
        max_count: 12,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 15e3,
          atk: 670
        }
      },
      {
        id: "enemy_1074_dbskar",
        level: 0,
        min_count: 3,
        max_count: 3,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1075_dmgswd",
        level: 0,
        min_count: 6,
        max_count: 6,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 12e3
        }
      },
      {
        id: "enemy_1022_dmage",
        level: 0,
        min_count: 2,
        max_count: 2,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2001_duckmi",
        level: 2,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 2,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      }
    ]
  },
  {
    id: "ro1_e_5_4",
    levelId: "level_rogue1_5-4",
    tags: [
      "rogue_phantom"
    ],
    category: "combat_ops",
    characterLimit: 6,
    initialCost: 0,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "彻骨冰寒",
    name_ja: "氷の芸術",
    name_en: "The_Biting_Cold",
    description_zh: "冰蓝祭坛闪闪发亮，邀请迷途旅人在此歇息。待到生命成为冰雕，黑暗中的暴徒便会将之砸得粉碎。\n<@rolv.rem>场地中有持续对周围我方单位施加【寒冷】效果的<源石冰晶>。</>",
    description_ja: "澄んだ青の祭壇がキラキラと光を放ち、迷える旅人を休息へと誘う。生命が氷像になると、暗闇にいた凶漢どもがそれを粉々に打ち砕く。\n<@rolv.rem>戦場に一定時間ごとに周囲を【寒冷】状態にする衝撃波を放出する<源石氷晶>が設置されている。</>",
    description_en: "The ice-blue altar twinkles bright, inviting all astray travelers to lie down for a brief respite. As soon as the resting souls are completely frozen, the thugs hiding in the dark will emerge to shatter them into pieces.\n<@rolv.rem><Originium Ice Crystal> Periodically releases a frigid wave that will inflict Cold on affected allied units</>",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: [
      "所有敌方单位的攻击力+15%，防御力+10%，生命值+25%"
    ],
    eliteDesc_ja: [
      "敵全員の攻撃力+15%、防御力+10%、最大HP+25%"
    ],
    eliteDesc_en: [
      "All enemy units have +15% ATK, +10% DEF and +25% Max HP"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          atk: 1.15,
          def: 1.1,
          hp: 1.25
        }
      }
    ],
    routes: [
      {
        title: "combat_ops",
        type: "video",
        youtube_src: "R8-d5j3kFts",
        bilibili_src: null
      }
    ],
    floors: [
      5
    ],
    sp_terrain: null,
    sp_enemy: {
      normal: "62 / 64 / 66",
      elite: null,
      fixed: true
    },
    enemies: [
      {
        id: "enemy_1067_snslime",
        level: 0,
        min_count: 7,
        max_count: 7,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1065_snwolf",
        level: 0,
        min_count: 23,
        max_count: 25,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1064_snsbr",
        level: 0,
        min_count: 22,
        max_count: 24,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1068_snmage",
        level: 0,
        min_count: 4,
        max_count: 4,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 7e3,
          atk: 300
        }
      },
      {
        id: "enemy_1070_iced",
        level: 0,
        min_count: 2,
        max_count: 2,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1069_icebrk",
        level: 0,
        min_count: 3,
        max_count: 3,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2001_duckmi",
        level: 2,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 2,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      }
    ]
  },
  {
    id: "ro1_e_5_5",
    levelId: "level_rogue1_5-5",
    tags: [
      "rogue_phantom"
    ],
    category: "combat_ops",
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "危机四伏",
    name_ja: "ポルターガイスト",
    name_en: "Dangers_Abound",
    description_zh: "幽灵四处游荡，机关嘎嘎作响，抵抗只是徒劳，红月之下，无处可逃。\n<@rolv.rem>场地中有定期对我方单位造成物理伤害的<弩炮台>。</>",
    description_ja: "幽霊があちこちをさまよっており、心臓がけたたましい音で鳴る。抵抗は無意味で、緋色の月の下、どこにも逃げ場はない。\n<@rolv.rem>戦場に一定時間ごとに矢を放ち物理ダメージを与える<バリスタ>が設置されている。</>",
    description_en: "Spirits are abound, and the mechanisms here continue their endless rumble. Resistance is futile, for there is nowhere to run underneath the red moon.\n<@rolv.rem><Turrets> Periodically fire bolts, dealing Physical Damage to our units.</>",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: [
      "所有敌方单位的攻击力，防御力+20%，生命值+50%"
    ],
    eliteDesc_ja: [
      "敵全員の攻撃力、防御力+20%、最大HP+50%"
    ],
    eliteDesc_en: [
      "All enemy units have +20% ATK, +20% DEF and +50% Max HP"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          atk: 1.2,
          def: 1.2,
          hp: 1.5
        }
      }
    ],
    routes: [
      {
        title: "combat_ops",
        type: "video",
        youtube_src: "K7-mY4RXq7k",
        bilibili_src: null
      }
    ],
    floors: [
      5
    ],
    sp_terrain: null,
    sp_enemy: {
      normal: 41,
      elite: null,
      fixed: true
    },
    enemies: [
      {
        id: "enemy_1008_ghost",
        level: 0,
        min_count: 9,
        max_count: 9,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 6600,
          def: 200
        }
      },
      {
        id: "enemy_1026_aghost",
        level: 0,
        min_count: 6,
        max_count: 6,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 15e3,
          def: 700,
          res: 50
        }
      },
      {
        id: "enemy_1058_traink",
        level: 0,
        min_count: 7,
        max_count: 7,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 2e4
        }
      },
      {
        id: "enemy_1014_rogue",
        level: 0,
        min_count: 18,
        max_count: 18,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 4e3,
          atk: 380
        }
      },
      {
        id: "enemy_2001_duckmi",
        level: 2,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 2,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      }
    ]
  },
  {
    id: "ro1_e_5_6",
    levelId: "level_rogue1_5-6",
    tags: [
      "rogue_phantom"
    ],
    category: "combat_ops",
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "惊喜工厂",
    name_ja: "サプライズ工場",
    name_en: "Surprise_Factory",
    description_zh: "一些被“小惊喜”砸中的幸运观众“自愿”来到这里参与这种空投礼品的制作。他们已无余力思考，只想制作出更多“小惊喜”，将“欢乐”播撒给他人。",
    description_ja: "「プチサプライズ」が当たった幸運な観客たちはここへやって来て、空から落とすプレゼントの製作に参加する「ボランティア」となった。彼らは既に思考力を失っており、一つでも多くの「プチサプライズ」を作って、「ハッピー」を他の人に振りまくことだけを考えている。",
    description_en: "Some lucky audience members who got their heads smacked by the 'Small Surprises' have 'voluntarily' come to participate in the making of these airdrop gifts. They don't have the mental capacity to think much more, as all they want to do now is make more 'Small Surprises' and share the 'joy' with everyone.",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: [
      "所有敌方单位的攻击力+60%，生命值+30%"
    ],
    eliteDesc_ja: [
      "敵全員の攻撃力+60%、最大HP+30%"
    ],
    eliteDesc_en: [
      "All enemy units have +60% ATK and +30% Max HP"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          atk: 1.6,
          hp: 1.3
        }
      }
    ],
    routes: [
      {
        title: "combat_ops",
        type: "video",
        youtube_src: "SMchzrs0fOM",
        bilibili_src: null
      }
    ],
    floors: [
      5
    ],
    sp_terrain: null,
    sp_enemy: {
      normal: 48,
      elite: null,
      fixed: true
    },
    enemies: [
      {
        id: "enemy_1019_jshoot_2",
        level: 0,
        min_count: 6,
        max_count: 6,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2009_csaudc",
        level: 0,
        min_count: 19,
        max_count: 19,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2012_csbln",
        level: 0,
        min_count: 22,
        max_count: 22,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2001_duckmi",
        level: 2,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 2,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      }
    ]
  },
  {
    id: "ro1_e_5_7",
    levelId: "level_rogue1_5-7",
    tags: [
      "rogue_phantom"
    ],
    category: "combat_ops",
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "荒唐把戏",
    name_ja: "奈落への吶喊",
    name_en: "Absurd_Trickeries",
    description_zh: "无畏骑士全速冲刺，台下观众纵情欢呼，无主财富闪闪发亮，引诱着盲目之人冲下深渊。\n<@rolv.rem>场地中有使我方单位防御力减半的<腐蚀地面>。</>",
    description_ja: "恐れを知らぬ騎士が全速力で駆け抜けると、観客は思い切り歓声を上げる。主無き財宝は燦然と輝き、目が眩んだ者を惹きつけて奈落へ突き落とす。\n<@rolv.rem>戦場に配置したユニットの防御力が半分に低下する<腐食した地面>がある。</>",
    description_en: "The fearless knights charge forward, firing the enthusiasm of the audience. The unclaimed riches twinkle under the spotlight, luring those blinded by the sight into the abyss.\n<@rolv.rem><Corrosive Ground> Operators deployed on it have decreased DEF</>",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: [
      "所有敌方单位的攻击力，生命值+20%",
      "萨卡兹穿刺手组长获得隐匿"
    ],
    eliteDesc_ja: [
      "敵全員の攻撃力、最大HP+20%",
      "<サルカズ突撃隊長>がステルス状態になる"
    ],
    eliteDesc_en: [
      "All enemy units have +20% ATK and +20% Max HP",
      "<Sarkaz Lancer Leader> gains Stealth"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          atk: 1.2,
          hp: 1.2
        }
      },
      {
        targets: [
          "enemy_1072_dlancer_2"
        ],
        mods: {
          special: {
            stealth: {
              tooltip: {
                en: [
                  "$Stealth$"
                ],
                ja: [
                  "$ステルス$"
                ],
                zh: [
                  "$隐匿$"
                ]
              }
            }
          }
        }
      }
    ],
    routes: [
      {
        title: "combat_ops",
        type: "video",
        youtube_src: "ALp9dFYVaF0",
        bilibili_src: null
      },
      {
        title: "duck",
        type: "video",
        youtube_src: "X7QhKyGu9DU",
        bilibili_src: null
      }
    ],
    floors: [
      5
    ],
    sp_terrain: [
      {
        tileKey: "tile_hole",
        alias: null,
        blackboard: null
      },
      {
        tileKey: "tile_defbreak",
        alias: null,
        blackboard: null
      }
    ],
    sp_enemy: {
      normal: 49,
      elite: null,
      fixed: true
    },
    enemies: [
      {
        id: "enemy_2001_duckmi",
        level: 2,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 2,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1072_dlancer_2",
        level: 0,
        min_count: 27,
        max_count: 27,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1080_sotidp_2",
        level: 0,
        min_count: 3,
        max_count: 3,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2009_csaudc",
        level: 0,
        min_count: 18,
        max_count: 18,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      }
    ]
  },
  {
    id: "ro1_e_5_8",
    levelId: "level_rogue1_5-8",
    tags: [
      "rogue_phantom"
    ],
    category: "combat_ops",
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "隔岸观火",
    name_ja: "対岸の火事",
    name_en: "From_Afar",
    description_zh: "总有那么一些人乐于置身事外，眼见种种惨象在面前铺开，从头至尾，不发一语。\n<@rolv.rem>场地中有会损失生命但大幅提升攻击力和攻击速度的<活性源石>。</>",
    description_ja: "惨劇を目の当たりにしていながら、徹頭徹尾一言も発さず傍観することに喜びを抱く人間というのは、いつだって存在するものだ。\n<@rolv.rem>接触した敵味方に継続ダメージを与える代わりに、攻撃力と攻撃速度が大幅に上昇させる<活性源石>が戦場に存在する。</>",
    description_en: "There will always be people who like to watch quietly from afar as tragedy unfolds. \n<@rolv.rem>There is <Active Originium> that greatly increases ATK and ASPD, at the cost of gradual HP loss.</>",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: [
      "所有敌方单位的攻击力+30%，防御力+10%，生命值+40%",
      "场地内部分位置无法部署"
    ],
    eliteDesc_ja: [
      "敵全員の攻撃力+30%、防御力+10%、最大HP+40%"
    ],
    eliteDesc_en: [
      "All enemy units have +30% ATK, +10% DEF and +40% Max HP"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          atk: 1.3,
          def: 1.1,
          hp: 1.4
        }
      }
    ],
    routes: [
      {
        title: "combat_ops",
        type: "video",
        youtube_src: "3Y23FBHM9Xg",
        bilibili_src: null
      },
      {
        title: "duck",
        type: "video",
        youtube_src: "zxMEi_C_cG0",
        bilibili_src: null
      },
      {
        title: "gpn",
        type: "video",
        youtube_src: "WVfqtKJow7c",
        bilibili_src: null
      }
    ],
    floors: [
      5
    ],
    sp_terrain: [
      {
        tileKey: "tile_hole",
        alias: null,
        blackboard: null
      },
      {
        tileKey: "tile_infection",
        alias: null,
        blackboard: {
          duration: 300,
          damage: 90,
          atk: 0.2,
          attack_speed: 50
        }
      }
    ],
    sp_enemy: {
      normal: 27,
      elite: null,
      fixed: true
    },
    enemies: [
      {
        id: "enemy_1079_sotisp_2",
        level: 0,
        min_count: 11,
        max_count: 11,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1080_sotidp_2",
        level: 0,
        min_count: 5,
        max_count: 5,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2010_csdcr",
        level: 0,
        min_count: 5,
        max_count: 5,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1025_reveng_2",
        level: 0,
        min_count: 3,
        max_count: 5,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1045_hammer_2",
        level: 0,
        min_count: 0,
        max_count: 2,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2001_duckmi",
        level: 0,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 0,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      }
    ]
  },
  {
    id: "ro1_e_6_1",
    levelId: "level_rogue1_6-1",
    tags: [
      "rogue_phantom"
    ],
    category: "combat_ops",
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "萨卡兹的渴求",
    name_ja: "サルカズの渇望",
    name_en: "Sarkaz_Desire",
    description_zh: "这支队伍正是萨卡兹的缩影——无序、无畏、无情。他们渴求自由。\n<@rolv.rem>场地中有<活性源石>，部署于其上的我军和经过的敌军持续受到伤害，但攻击力和攻速大幅度提升。</>",
    description_ja: "この隊はまさにサルカズの縮図だ――秩序なく、恐怖なく、情け容赦ない。彼らは自由を渇望している。\n<@rolv.rem>接触した敵味方に継続ダメージを与える代わりに、攻撃力と攻撃速度が大幅に上昇させる<活性源石>が戦場に存在する。</>",
    description_en: "This ragtag team is the embodiment of the Sarkaz—Orderless, fearless, and ruthless.\n<@rolv.rem><Active Originium> Operators deployed on it and enemies who have passed it will take constant damage, but their ATK and ASPD will be increased significantly</>",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: [
      "所有敌方单位的攻击力+20%，生命值+40%",
      "“小惊喜”的移动速度+200%"
    ],
    eliteDesc_ja: [
      "敵全員の攻撃力+20%、最大HP+40%",
      "「プチサプライズ」の移動速度+200%"
    ],
    eliteDesc_en: [
      "All enemy units have +20% ATK, and +40% Max HP",
      "All <'Small Surprise'> have +200% Movement speed"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          atk: 1.2,
          hp: 1.4
        }
      },
      {
        targets: [
          "CS4"
        ],
        mods: {
          ms: 3
        }
      }
    ],
    routes: [
      {
        title: "combat_ops",
        type: "video",
        youtube_src: "iXv9KyrQN_A",
        bilibili_src: null
      }
    ],
    floors: [
      6
    ],
    sp_terrain: [
      {
        tileKey: "tile_infection",
        alias: null,
        blackboard: {
          duration: 300,
          damage: 180,
          atk: 0.5,
          attack_speed: 50
        }
      }
    ],
    sp_enemy: {
      normal: 56,
      elite: null,
      fixed: true
    },
    enemies: [
      {
        id: "enemy_2001_duckmi",
        level: 2,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 2,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1075_dmgswd_2",
        level: 0,
        min_count: 8,
        max_count: 10,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 16e3,
          atk: 600
        }
      },
      {
        id: "enemy_1073_dscout",
        level: 0,
        min_count: 2,
        max_count: 2,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1076_bsthmr_2",
        level: 0,
        min_count: 2,
        max_count: 2,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 3e4
        }
      },
      {
        id: "enemy_1071_dftman_2",
        level: 0,
        min_count: 29,
        max_count: 29,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 6e3
        }
      },
      {
        id: "enemy_1074_dbskar_2",
        level: 0,
        min_count: 0,
        max_count: 2,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2012_csbln",
        level: 0,
        min_count: 12,
        max_count: 12,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      }
    ]
  },
  {
    id: "ro1_e_6_2",
    levelId: "level_rogue1_6-2",
    tags: [
      "rogue_phantom"
    ],
    category: "combat_ops",
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "乌萨斯的渴求",
    name_ja: "ウルサスの渇望",
    name_en: "Ursus_Desire",
    description_zh: "这支队伍正是乌萨斯的缩影——庞大、强壮、遮天蔽日。他们渴求征服。",
    description_ja: "この隊はまさにウルサスの縮図だ――膨大にして、強靭であり、空を覆うほどの勢いがある。彼らは征服を渇望している。",
    description_en: "This ragtag team is the embodiment of Ursus—Large, strong, and imposing. They desire conquest.",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: [
      "所有敌方单位的攻击力+25%，防御力+10%，生命值+40%",
      "帝国炮火先兆者被替换为帝国炮火中枢先兆者，额外出现2个帝国炮火中枢先兆者"
    ],
    eliteDesc_ja: [
      "敵全員の攻撃力+25%、防御力+10%、最大HP+40%",
      "追加で<帝国砲撃指揮機>2体が出現する、かつ<帝国砲撃誘導機>が<帝国砲撃指揮機>に替わる"
    ],
    eliteDesc_en: [
      "All enemy units have +25% ATK, +10% DEF and +40% Max HP",
      "Additional 2 <Imperial Artillery Core Targeteer> appear",
      "All <Imperial Artillery Targeteer> are replaced by <Imperial Artillery Core Targeteer>"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          atk: 1.25,
          def: 1.1,
          hp: 1.4
        }
      }
    ],
    routes: [
      {
        title: "emergency_ops",
        type: "video",
        youtube_src: "b2eWoeO-CEs",
        bilibili_src: null
      }
    ],
    floors: [
      6
    ],
    sp_terrain: null,
    sp_enemy: {
      normal: 41,
      elite: 43,
      fixed: true
    },
    enemies: [
      {
        id: "enemy_2011_csppt",
        level: 0,
        min_count: 3,
        max_count: 3,
        elite_min_count: 3,
        elite_max_count: 3,
        overwrittenData: {
          hp: 34e3
        }
      },
      {
        id: "enemy_1112_emppnt",
        level: 0,
        min_count: 0,
        max_count: 3,
        elite_min_count: 0,
        elite_max_count: 3,
        overwrittenData: {
          hp: 2e4
        }
      },
      {
        id: "enemy_1112_emppnt_2",
        level: 0,
        min_count: 0,
        max_count: 3,
        elite_min_count: 2,
        elite_max_count: 5,
        overwrittenData: {
          hp: 3e4,
          def: 1e3
        }
      },
      {
        id: "enemy_1072_dlancer_2",
        level: 0,
        min_count: 7,
        max_count: 7,
        elite_min_count: 7,
        elite_max_count: 7,
        overwrittenData: {
          atk: 550
        }
      },
      {
        id: "enemy_1076_bsthmr_2",
        level: 0,
        min_count: 4,
        max_count: 4,
        elite_min_count: 4,
        elite_max_count: 4,
        overwrittenData: {
          hp: 3e4,
          def: 1500
        }
      },
      {
        id: "enemy_2001_duckmi",
        level: 2,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 2,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_1111_ucommd_2",
        level: 0,
        min_count: 6,
        max_count: 6,
        elite_min_count: 6,
        elite_max_count: 6,
        overwrittenData: null
      },
      {
        id: "enemy_1108_uterer_2",
        level: 0,
        min_count: 13,
        max_count: 13,
        elite_min_count: 13,
        elite_max_count: 13,
        overwrittenData: null
      },
      {
        id: "enemy_1081_sotisd_2",
        level: 0,
        min_count: 4,
        max_count: 4,
        elite_min_count: 4,
        elite_max_count: 4,
        overwrittenData: {
          def: 1800
        }
      }
    ]
  },
  {
    id: "ro2_b_1",
    levelId: "level_rogue2_b-1",
    tags: [
      "rogue_mizuki"
    ],
    category: "boss_1",
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "永恒安息",
    name_ja: "永遠の安らぎ",
    name_en: "Requiem_Aeternam",
    description_zh: "伊比利亚分崩离析，圣徒的生命也即将走到尽头，他已说不清话语，但只要海浪中异响不息，他就仍将战斗。\n<@rolv.rem>场地内有使我方不会成为敌人远程攻击目标的<草丛>。</>",
    description_ja: "イベリアは瓦解し、聖徒の命も果てに辿り着いた。彼はもう言葉を失ってしまったが、海の異音が鳴り止まぬ限り、決して戦いを止めないだろう。\n<@rolv.rem>配置した味方が敵遠距離攻撃の対象にならない効果を持つ<草むら>が戦場に存在する。</>",
    description_en: "Iberia is falling apart, and the Saint's life is coming to an end. He can no longer speak clearly, but as long as the aberrant sound within the sea still continues to ring, he will continue to fight. \n<@rolv.rem>This stage has <Bushes> that prevent your units inside from being targeted by enemy ranged attacks.</>",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: null,
    eliteDesc_ja: null,
    eliteDesc_en: null,
    elite_mods: null,
    routes: [
      {
        title: "boss",
        type: "video",
        youtube_src: "5UwVMWHd7qE",
        bilibili_src: "aid=570441119&bvid=BV1Qz4y1a7T5&cid=1108531011&page=1"
      },
      {
        title: "doq",
        type: "img",
        src: "永恒安息_j7s4mq"
      }
    ],
    floors: [
      3
    ],
    sp_terrain: [
      {
        tileKey: "tile_grass",
        alias: null,
        blackboard: null
      }
    ],
    sp_enemy: null,
    enemies: [
      {
        id: "enemy_1020_obsv",
        level: 0,
        min_count: 2,
        max_count: 2,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1014_rogue_2",
        level: 0,
        min_count: 14,
        max_count: 14,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1012_dcross",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1012_dcross_2",
        level: 0,
        min_count: 5,
        max_count: 5,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1010_demon_2",
        level: 0,
        min_count: 4,
        max_count: 4,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2026_syudg",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      }
    ]
  },
  {
    id: "ro2_b_1_b",
    levelId: "level_rogue2_b-1-b",
    tags: [
      "rogue_mizuki"
    ],
    category: "boss_1",
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "永恒愤怒",
    name_ja: "永遠の怒り",
    name_en: "Eternal_Wrath",
    description_zh: "一位老人眼见家园二度毁灭，心中苦恨与怒意彻底抹灭了理性。杀戮将是他仅存的表达。\n<@rolv.rem>只装填一发弹药。</>\n<@rolv.rem>场地内有使我方不会成为敌人远程攻击目标的<草丛>。</>",
    description_ja: "老人は故郷の崩壊を二度も目の当たりにしたことで、その恨みと怒りにより完全に理性を失った。殺戮だけが、彼に残った唯一の衝動だ。\n<@rolv.rem>弾丸を1発のみ装填する。</>\n<@rolv.rem>配置した味方が敵遠距離攻撃の対象にならない効果を持つ<草むら>が戦場に存在する。</>",
    description_en: "An old man has witnessed the second destruction of his homeland, the bitterness and wrath in his heart exterminating his rationality. Slaughter is the only language he has left to express himself. \n<@rolv.rem>Only one round of Ammo is loaded. </>\n<@rolv.rem>This stage has <Bushes> that prevent your units inside from being targeted by enemy ranged attacks.</>",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: null,
    eliteDesc_ja: null,
    eliteDesc_en: null,
    elite_mods: null,
    routes: [
      {
        title: "boss",
        type: "video",
        youtube_src: "ATnry3QpGg0",
        bilibili_src: "aid=570441119&bvid=BV1Qz4y1a7T5&cid=1108536629&page=2"
      },
      {
        title: "doq",
        type: "img",
        src: "永恒安息_j7s4mq"
      }
    ],
    floors: [
      3
    ],
    sp_terrain: [
      {
        tileKey: "tile_grass",
        alias: null,
        blackboard: null
      }
    ],
    sp_enemy: null,
    enemies: [
      {
        id: "enemy_1020_obsv",
        level: 0,
        min_count: 2,
        max_count: 2,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1014_rogue_2",
        level: 0,
        min_count: 14,
        max_count: 14,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1012_dcross",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1012_dcross_2",
        level: 0,
        min_count: 5,
        max_count: 5,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1010_demon_2",
        level: 0,
        min_count: 4,
        max_count: 4,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2027_syudg2",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      }
    ]
  },
  {
    id: "ro2_b_2",
    levelId: "level_rogue2_b-2",
    tags: [
      "rogue_mizuki"
    ],
    category: "boss_1",
    characterLimit: 6,
    initialCost: 20,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "分离与统一",
    name_ja: "分離と統一",
    name_en: "Separation_and_Unity",
    description_zh: "经过先进的阿戈尔科学技术改造，这位深海主教拥有了两副躯体与统一意志。他创造了一种全新的生命形式。",
    description_ja: "エーギルの先進的科学技術による改造を経て、この深海司教は二つの身体と統一された意志を獲得した。彼は全く新しい生命の形を造り上げたのだ。",
    description_en: "After being transformed by cutting-edge Ægir technology, this Bishop of the Deep now has two bodies unified by a single will. He has created a completely new form of life.",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: null,
    eliteDesc_ja: null,
    eliteDesc_en: null,
    elite_mods: null,
    routes: [
      {
        title: "boss",
        type: "video",
        youtube_src: "grR_5pSfw74",
        bilibili_src: "aid=570441119&bvid=BV1Qz4y1a7T5&cid=1108537131"
      },
      {
        title: "doq",
        type: "img",
        src: "分离与统一_sjhjtl"
      }
    ],
    floors: [
      3
    ],
    sp_terrain: null,
    sp_enemy: null,
    enemies: [
      {
        id: "enemy_2028_syevil",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2029_symon",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2021_syfish",
        level: 0,
        min_count: 11,
        max_count: 15,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2022_syzeni",
        level: 0,
        min_count: 3,
        max_count: 5,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1024_mortar",
        level: 0,
        min_count: 3,
        max_count: 3,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      }
    ]
  },
  {
    id: "ro2_b_2_b",
    levelId: "level_rogue2_b-2-b",
    tags: [
      "rogue_mizuki"
    ],
    category: "boss_1",
    characterLimit: 6,
    initialCost: 20,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "异体同心",
    name_ja: "異体同心",
    name_en: "Two_Forms,_One_Heart",
    description_zh: "一位深海主教将自己的骨血转化成了与大群联结的海嗣，这样他就同时拥有了人类与海嗣两种身份。\n<@rolv.rem>海嗣体生命值减少，但更加狂暴。</>",
    description_ja: "深海司教の一人が自身の血肉を大群と繋がるシーボーンへと作り変えた。こうして彼は人類とシーボーンの二つの存在を同時に獲得した。\n<@rolv.rem>シーボーン体のHPが減少するほど、より凶暴化する。</>",
    description_en: "A Bishop of the Deep transformed a portion of his own flesh into a Seaborn connected with we many, allowing him to have a foot in both the human and Seaborn realms. \n<@rolv.rem>The Seaborn body has reduced HP, but attacks with greater ferocity.</>",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: null,
    eliteDesc_ja: null,
    eliteDesc_en: null,
    elite_mods: null,
    routes: [
      {
        title: "boss",
        type: "video",
        youtube_src: "a2kS1kIAD2Y",
        bilibili_src: "aid=570441119&bvid=BV1Qz4y1a7T5&cid=1108537751&page=4"
      },
      {
        title: "doq",
        type: "img",
        src: "分离与统一_sjhjtl"
      }
    ],
    floors: [
      3
    ],
    sp_terrain: null,
    sp_enemy: null,
    enemies: [
      {
        id: "enemy_2028_syevil",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2030_symon2",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2021_syfish",
        level: 0,
        min_count: 11,
        max_count: 15,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2022_syzeni",
        level: 0,
        min_count: 3,
        max_count: 5,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1024_mortar",
        level: 0,
        min_count: 3,
        max_count: 3,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      }
    ]
  },
  {
    id: "ro2_b_3",
    levelId: "level_rogue2_b-3",
    tags: [
      "rogue_mizuki"
    ],
    category: "boss_1",
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "纠错",
    name_ja: "修正",
    name_en: "Course_Correction",
    description_zh: "无论与你的对抗成功与否，大群都将吸取教训，随后在进化之路上更进一步。\n<@rolv.rem>场地中有可以阻挡敌人行进路线的<碎石>。</>",
    description_ja: "戦いが勝利に終わろうと敗北に終わろうと、大群はそこから教訓を学び取り、進化の道を更に一歩前進する。\n<@rolv.rem>戦場に敵の進攻ルートを遮ることができる<礫岩>が設置されている。</>",
    description_en: "Regardless of whether or not it succeeds against your resistance, we many will learn their lesson and continue to move forward on their evolutionary path. \n<@rolv.rem>This stage has <Rubble> that can block the enemy's path.</>",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: null,
    eliteDesc_ja: null,
    eliteDesc_en: null,
    elite_mods: null,
    routes: [
      {
        title: "route_left",
        type: "video",
        youtube_src: "zXX-KQbjv9Q",
        bilibili_src: "aid=570441119&bvid=BV1Qz4y1a7T5&cid=1108538283&page=5"
      },
      {
        title: "route_right",
        type: "video",
        youtube_src: "6LFMY0FgIuI",
        bilibili_src: "aid=570441119&bvid=BV1Qz4y1a7T5&cid=1108538757&page=6"
      },
      {
        title: "doq",
        type: "img",
        src: "纠错_ea9loc"
      }
    ],
    floors: [
      3
    ],
    sp_terrain: [
      {
        tileKey: "tile_hole",
        alias: null,
        blackboard: null
      }
    ],
    sp_enemy: null,
    enemies: [
      {
        id: "enemy_1147_dshond",
        level: 0,
        min_count: 29,
        max_count: 29,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2031_syboy",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2033_syboys",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2023_sypult",
        level: 0,
        min_count: 2,
        max_count: 2,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2024_synut",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      }
    ]
  },
  {
    id: "ro2_b_3_b",
    levelId: "level_rogue2_b-3-b",
    tags: [
      "rogue_mizuki"
    ],
    category: "boss_1",
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "订正",
    name_ja: "訂正",
    name_en: "Route_Revision",
    description_zh: "海嗣不是先知，它们的进化路线中满是错误与损耗，因此它们进化出专门试错的个体，并力求整个族群不在同一处失误两次。\n<@rolv.rem>召唤分形所需受击次数减少。</>\n<@rolv.rem>场地中有可以阻挡敌人行进路线的<碎石>。</>",
    description_ja: "シーボーンは予言者ではない。ゆえに奴らの進化の道は失敗と損耗に満ちている。そのため、奴らは試行錯誤を繰り返すことに長けた個体を進化の過程で生み出すことで、群れ全体が極力同じ過ちを犯さないよう心がけてきた。\n<@rolv.rem>フラクタルの召喚に必要な被撃回数が減少する。</>\n<@rolv.rem>戦場に敵の進攻ルートを遮ることができる<礫岩>が設置されている。</>",
    description_en: "The Seaborn are not prophets—their evolutionary path is full of mistakes and losses. So they've evolved individuals adept in trial and error to prevent the collective from making the same mistake twice. \n<@rolv.rem>The number of hits required to spawn a Fractal is reduced. </>\n<@rolv.rem>This stage has <Rubble> that can block the enemy's path.</>",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: null,
    eliteDesc_ja: null,
    eliteDesc_en: null,
    elite_mods: null,
    routes: [
      {
        title: "route_left",
        type: "video",
        youtube_src: "e9Uh7NbX8jI",
        bilibili_src: "aid=570441119&bvid=BV1Qz4y1a7T5&cid=1108539410&page=7"
      },
      {
        title: "route_right",
        type: "video",
        youtube_src: "d_8zxQ6PFaA",
        bilibili_src: "aid=570441119&bvid=BV1Qz4y1a7T5&cid=1108539989&page=8"
      },
      {
        title: "doq",
        type: "img",
        src: "纠错_ea9loc"
      }
    ],
    floors: [
      3
    ],
    sp_terrain: [
      {
        tileKey: "tile_hole",
        alias: null,
        blackboard: null
      }
    ],
    sp_enemy: null,
    enemies: [
      {
        id: "enemy_1147_dshond",
        level: 0,
        min_count: 29,
        max_count: 29,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2032_syboy2",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2033_syboys",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2023_sypult",
        level: 0,
        min_count: 2,
        max_count: 2,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2024_synut",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      }
    ]
  },
  {
    id: "ro2_b_4",
    levelId: "level_rogue2_b-4",
    tags: [
      "rogue_mizuki"
    ],
    category: "boss",
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-DF",
    name_zh: "认知即重担",
    name_ja: "認知とは負担なり",
    name_en: "Curse_of_Cognition",
    description_zh: "世间万事两难全，游荡于认知边界的个体注定崩毁。在重新确认自身存在的意义前，她将是本我的奴隶。",
    description_ja: "二つの立場を併せ持つことは極めて困難であり、認知の境界をたゆたう個体は必ず崩壊の運命を辿る。自身の存在意義を再び認識するまで、彼女は自我の奴隷なのだ。",
    description_en: "All things in existence are paradoxical, and those who wander within the boundaries of cognition are doomed to break apart. Until she reaffirms the meaning of her own existence, she will forever be a slave to her id.",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: null,
    eliteDesc_ja: null,
    eliteDesc_en: null,
    elite_mods: null,
    routes: [
      {
        title: "boss",
        type: "video",
        youtube_src: "CpD8fcRVauo",
        bilibili_src: "aid=740428386&bvid=BV1kk4y1J7FV&cid=1108583665&page=4"
      }
    ],
    floors: [
      5
    ],
    sp_terrain: [
      {
        tileKey: "tile_hole",
        alias: null,
        blackboard: null
      }
    ],
    sp_enemy: null,
    enemies: [
      {
        id: "enemy_2021_syfish",
        level: 0,
        min_count: 61,
        max_count: 61,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2022_syzeni",
        level: 0,
        min_count: 14,
        max_count: 14,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2023_sypult",
        level: 0,
        min_count: 6,
        max_count: 6,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2024_synut",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2025_syufo",
        level: 0,
        min_count: 6,
        max_count: 6,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2037_sygirl",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      }
    ]
  },
  {
    id: "ro2_b_5",
    levelId: "level_rogue2_b-5",
    tags: [
      "rogue_mizuki"
    ],
    category: "boss",
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-DF",
    name_zh: "“命运的宠儿”",
    name_ja: "「運命の寵児」",
    name_en: "'Fate's_Favored_Child'",
    description_zh: "正因为他总是抗争，所以命运总是垂青，不断将苦厄灾难加诸其身，并殷切盼望着他崩溃。\n<@rolv.rem>场地中有可以阻挡敌人行进路线的<碎石>。</>",
    description_ja: "必死に抗い続けるからこそ、運命は彼を常に贔屓した。ゆえに苦難と厄災をその身に与え続け、彼が崩壊するのを切実に待ち望んだ。\n<@rolv.rem>戦場に敵の進攻ルートを遮ることができる<礫岩>が設置されている。</>",
    description_en: "Precisely because he is always fighting, fate continues to favor him, constantly throwing him into misery and calamity, and eagerly awaiting his undoing. \n<@rolv.rem>This stage has <Rubble> that can block the enemy's path.</>",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: null,
    eliteDesc_ja: null,
    eliteDesc_en: null,
    elite_mods: null,
    routes: [
      {
        title: "boss",
        type: "video",
        youtube_src: "78Y6vXkQQQ0",
        bilibili_src: "aid=740428386&bvid=BV1kk4y1J7FV&cid=1108584766&page=5"
      }
    ],
    floors: [
      5
    ],
    sp_terrain: null,
    sp_enemy: null,
    enemies: [
      {
        id: "enemy_2023_sypult",
        level: 0,
        min_count: 3,
        max_count: 3,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2024_synut",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2038_sydonq",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1103_wdkght_2",
        level: 0,
        min_count: 5,
        max_count: 5,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 22e3,
          def: 1e3
        }
      },
      {
        id: "enemy_1099_nbkght_2",
        level: 0,
        min_count: 23,
        max_count: 23,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 4500,
          def: 300
        }
      },
      {
        id: "enemy_1242_ltsmag_2",
        level: 0,
        min_count: 5,
        max_count: 5,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1238_ltmob_2",
        level: 0,
        min_count: 20,
        max_count: 20,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1088_ltsmer_2",
        level: 0,
        min_count: 8,
        max_count: 8,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      }
    ]
  },
  {
    id: "ro2_b_6",
    levelId: "level_rogue2_b-6",
    tags: [
      "rogue_mizuki"
    ],
    category: "boss",
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-DF",
    name_zh: "大群所向",
    name_ja: "大群の向かう先",
    name_en: "Destiny_of_We_Many",
    description_zh: "人类、海嗣、泰拉以及斯卡蒂残留人性所盼之人的命运，将在此刻敲定。",
    description_ja: "人類、シーボーン、テラ、そしてスカジに残った人間性が待ち望む者の運命が、今ここに下される。",
    description_en: "The fate of humankind, the Seaborn, Terra, and what remains of Skadi's humanity shall all be realized in this final moment.",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: null,
    eliteDesc_ja: null,
    eliteDesc_en: null,
    elite_mods: null,
    routes: [
      {
        title: "boss",
        type: "video",
        youtube_src: "tW2a0LMonTU",
        bilibili_src: "aid=740428386&bvid=BV1kk4y1J7FV&cid=1108585943&page=6"
      }
    ],
    floors: [
      6
    ],
    sp_terrain: [
      {
        tileKey: "tile_hole",
        alias: null,
        blackboard: null
      }
    ],
    sp_enemy: null,
    enemies: [
      {
        id: "enemy_2022_syzeni",
        level: 0,
        min_count: 26,
        max_count: 26,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2023_sypult",
        level: 0,
        min_count: 8,
        max_count: 8,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2024_synut",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1153_dsexcu",
        level: 0,
        min_count: 5,
        max_count: 5,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1153_dsexcu_2",
        level: 0,
        min_count: 6,
        max_count: 6,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 2e4
        }
      },
      {
        id: "enemy_2039_syskad",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2040_syrott",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      }
    ]
  },
  {
    id: "ro2_b_7",
    levelId: "level_rogue2_b-7",
    tags: [
      "rogue_mizuki"
    ],
    category: "boss",
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-DF",
    name_zh: "人之光辉",
    name_ja: "人たる存在の輝き",
    name_en: "Glory_of_Humanity",
    description_zh: "在伊祖米克唤回子代并进行族群星海化基因修饰的时刻，水月将为自己，也为整个海嗣族群昭示，为人的潜能与灵性。",
    description_ja: "イズミックが仔らを呼び戻し、族群に星海へと至るモザイクをかけるとき、ミヅキは己のため、そして遍く全てのシーボーン族群のため、人たる者の底力と心性を示すのだ。",
    description_en: "The moment Izumik recalls his offspring and performs the genetic modification of the swarm's astralization, Mizuki will demonstrate the potential and spirituality of humanity for himself and the entire Seaborn swarm.",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: null,
    eliteDesc_ja: null,
    eliteDesc_en: null,
    elite_mods: null,
    routes: [
      {
        title: "boss",
        type: "video",
        youtube_src: "GlZQzAoJdVo",
        bilibili_src: "aid=313501990&bvid=BV1wP41127Wo&cid=1128362921&page=1"
      }
    ],
    floors: [
      6
    ],
    sp_terrain: [
      {
        tileKey: "tile_hole",
        alias: null,
        blackboard: null
      }
    ],
    sp_enemy: null,
    enemies: [
      {
        id: "enemy_2042_syboss",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2041_syjely",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2021_syfish",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1085_sotiwz_2",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 15e3,
          atk: 800
        }
      },
      {
        id: "enemy_1082_soticn",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 11e3,
          atk: 900,
          def: 900
        }
      },
      {
        id: "enemy_1010_demon",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 15e3,
          atk: 1200
        }
      },
      {
        id: "enemy_1076_bsthmr",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 24e3,
          atk: 2e3,
          def: 1500
        }
      },
      {
        id: "enemy_1056_ganwar_2",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 8400,
          atk: 800
        }
      },
      {
        id: "enemy_1031_mrogue_2",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 13e3,
          atk: 1e3
        }
      },
      {
        id: "enemy_1101_plkght",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 5600,
          atk: 600
        }
      },
      {
        id: "enemy_1170_dushld_2",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 12e3,
          atk: 1100,
          def: 1500
        }
      },
      {
        id: "enemy_1067_snslime_2",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 9e3,
          atk: 500
        }
      },
      {
        id: "enemy_1161_tidmag_2",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 13e3,
          atk: 500
        }
      },
      {
        id: "enemy_1048_hirman_2",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 26e3,
          atk: 1500
        }
      },
      {
        id: "enemy_1113_empace",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 24e3,
          atk: 1100
        }
      },
      {
        id: "enemy_1022_dmage",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          atk: 700
        }
      },
      {
        id: "enemy_2025_syufo",
        level: 0,
        min_count: 4,
        max_count: 4,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      }
    ]
  },
  {
    id: "ro2_b_8",
    levelId: "level_rogue2_b-8",
    tags: [
      "rogue_mizuki"
    ],
    category: "boss",
    characterLimit: 7,
    initialCost: 0,
    costIncreaseTime: 1,
    code: "ISW-DF",
    name_zh: "荒地群猎",
    name_ja: "荒野の猟師",
    name_en: "Hunting_Group",
    description_zh: "你遇到了一群正在狩猎的荒地人，领队的暴徒将猎弩对准了你，他似乎不在乎自己的猎物是什么。",
    description_ja: "狩りをしている荒野の人間と遭遇した。リーダーが照準を定めた矢の先にいるのはあなた。この暴徒たちは獲物は何であっても構わないようだ。",
    description_en: "You’ve met a group of wasteland dwellers on a hunt. The group’s leader has targeted you with his crossbow—evidently, he doesn’t particularly care what his prey is.",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: null,
    eliteDesc_ja: null,
    eliteDesc_en: null,
    elite_mods: null,
    routes: [
      {
        title: "boss",
        type: "video",
        youtube_src: "4jEHc-xNNxY",
        bilibili_src: "aid=740428386&bvid=BV1kk4y1J7FV&cid=1108542944&page=1"
      }
    ],
    floors: [
      4,
      5
    ],
    sp_terrain: null,
    sp_enemy: null,
    enemies: [
      {
        id: "enemy_1002_nsabr",
        level: 1,
        min_count: 85,
        max_count: 85,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 4400
        }
      },
      {
        id: "enemy_1038_lunmag_2",
        level: 0,
        min_count: 4,
        max_count: 4,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 8e3
        }
      },
      {
        id: "enemy_1076_bsthmr",
        level: 0,
        min_count: 5,
        max_count: 5,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 2e4,
          atk: 1500
        }
      },
      {
        id: "enemy_1010_demon",
        level: 0,
        min_count: 6,
        max_count: 6,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 12e3
        }
      },
      {
        id: "enemy_1010_demon_2",
        level: 0,
        min_count: 7,
        max_count: 7,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 22e3,
          atk: 800
        }
      },
      {
        id: "enemy_1042_frostd",
        level: 0,
        min_count: 3,
        max_count: 3,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 12e3,
          def: 380
        }
      },
      {
        id: "enemy_2006_flsnip",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      }
    ]
  },
  {
    id: "ro2_b_9",
    levelId: "level_rogue2_b-9",
    tags: [
      "rogue_mizuki"
    ],
    category: "boss",
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-DF",
    name_zh: "寒灾之咒",
    name_ja: "寒災の呪い",
    name_en: "Chilling_Curse",
    description_zh: "残酷的霜冻，纯真的歌谣，无尽冰原的诅咒渗透在“寒灾”中，吞噬了万物。<@rolv.rem>场地中有持续施加【寒冷】效果的源石冰晶。</>",
    description_ja: "あなたが目の当たりにしたのは、残酷な氷結、純真な歌謡。果てなき氷原の呪いが【寒災】に染み入り、万物を喰らう。<@rolv.rem>周囲を持続的に【寒冷】状態にする源石氷晶がある。</>",
    description_en: "Cruel frost, an innocent ballad, and the curse of the endless tundras coalesce into a Frozen Catastrophe that devours everything. <@rolv.rem>This stage has <Originium Ice Crystals> that periodically apply the Cold status in an area around them.</>",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: null,
    eliteDesc_ja: null,
    eliteDesc_en: null,
    elite_mods: null,
    routes: [
      {
        title: "boss",
        type: "video",
        youtube_src: "IwziKOn-4QM",
        bilibili_src: "aid=740428386&bvid=BV1kk4y1J7FV&cid=1108581071&page=2"
      }
    ],
    floors: [
      4,
      5
    ],
    sp_terrain: null,
    sp_enemy: null,
    enemies: [
      {
        id: "enemy_2007_flwitch",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1064_snsbr",
        level: 0,
        min_count: 17,
        max_count: 17,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1066_snbow_2",
        level: 0,
        min_count: 4,
        max_count: 4,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1068_snmage_2",
        level: 0,
        min_count: 15,
        max_count: 15,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 1e4,
          def: 300
        }
      },
      {
        id: "enemy_1069_icebrk",
        level: 0,
        min_count: 2,
        max_count: 2,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1069_icebrk_2",
        level: 0,
        min_count: 6,
        max_count: 6,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      }
    ]
  },
  {
    id: "ro2_b_10",
    levelId: "level_rogue2_b-10",
    tags: [
      "rogue_mizuki"
    ],
    category: "boss",
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 2,
    code: "ISW-DF",
    name_zh: "险路勿近",
    name_ja: "危うきに近寄るべからず",
    name_en: "Avoid_Unsafe_Roads",
    description_zh: "这场阴谋与罪恶的尽头，“墓碑”在等着你，是时候结束这一切了。<@rolv.rem>我方单位的攻击力、防御力、部署费用回复大幅度降低，再部署时间加倍。</>",
    description_ja: "この陰謀と罪悪の果てであなたを待つのは【墓碑】のみ。すべてを終える時が来た。<@rolv.rem>味方の攻撃力、防御力、コスト回復速度が大幅に低下、再配置時間倍増。</>",
    description_en: "At the conclusion of the conspiracy and sin, a 'gravestone' awaits you. It is time to end it all. <@rolv.rem>Friendly units have greatly reduced ATK and DEF; Natural DP regeneration is greatly reduced, and Redeployment Time is doubled.</>",
    addInfo_zh: [
      "每2秒回复1点部署费用",
      "所有角色型单位基础攻击力、防御力减半",
      "所有角色型单位基础再部署时间翻倍"
    ],
    addInfo_ja: [
      "コスト回復速度半減",
      "すべての味方ユニットの攻撃力と防御力半減",
      "再配置時間2倍"
    ],
    addInfo_en: [
      "DP regen rate halved",
      "ATK and DEF of all allies halved",
      "Redeployment time doubled"
    ],
    eliteDesc_zh: null,
    eliteDesc_ja: null,
    eliteDesc_en: null,
    elite_mods: null,
    routes: [
      {
        title: "boss",
        type: "video",
        youtube_src: "Cm5LZ209QUU",
        bilibili_src: "aid=740428386&bvid=BV1kk4y1J7FV&cid=1128711548&page=3"
      }
    ],
    floors: [
      4,
      5
    ],
    sp_terrain: [
      {
        tileKey: "tile_defup",
        alias: "terrain_ground",
        blackboard: {
          def: 100
        }
      },
      {
        tileKey: "tile_defup",
        alias: "terrain_ranged",
        blackboard: {
          def: 200
        }
      }
    ],
    sp_enemy: null,
    enemies: [
      {
        id: "enemy_2008_flking",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1002_nsabr",
        level: 1,
        min_count: 22,
        max_count: 22,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          def: 0
        }
      },
      {
        id: "enemy_1003_ncbow_2",
        level: 0,
        min_count: 12,
        max_count: 12,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          range: 1.7
        }
      },
      {
        id: "enemy_1015_litamr_2",
        level: 0,
        min_count: 12,
        max_count: 12,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1072_dlancer_2",
        level: 0,
        min_count: 2,
        max_count: 4,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1010_demon",
        level: 0,
        min_count: 2,
        max_count: 4,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 1e4
        }
      }
    ]
  },
  {
    id: "ro2_t_1",
    levelId: "level_rogue2_t-1",
    tags: [
      "rogue_mizuki"
    ],
    category: "encounter",
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-DU",
    name_zh: "犹豫不决",
    name_ja: "優柔不断",
    name_en: "Indecisiveness",
    description_zh: "他没什么主观能动性，要是眼前的路口有分岔，他就连决定走哪条路都得想个半天。",
    description_ja: "彼には何の主体性もない。目の前に分かれ道があれば、どちらへ進むか決めるだけでもかなり長い間悩み続けてしまう。",
    description_en: "He lacks any sense of initiative. If faced with a fork in the road, he'll spend half the day just thinking about which path to take.",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: null,
    eliteDesc_ja: null,
    eliteDesc_en: null,
    elite_mods: null,
    routes: [
      {
        title: "combat_ops",
        type: "video",
        youtube_src: "VvnF_TtaYqE",
        bilibili_src: "aid=612931072&bvid=BV1ph4y1n75o&cid=1108543932&page=1"
      }
    ],
    floors: [
      1,
      2
    ],
    sp_terrain: null,
    sp_enemy: null,
    enemies: [
      {
        id: "enemy_2034_sythef",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1007_slime_3",
        level: 0,
        min_count: 20,
        max_count: 20,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1004_mslime",
        level: 0,
        min_count: 10,
        max_count: 10,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      }
    ]
  },
  {
    id: "ro2_t_2",
    levelId: "level_rogue2_t-2",
    tags: [
      "rogue_mizuki"
    ],
    category: "encounter",
    characterLimit: 6,
    initialCost: 15,
    costIncreaseTime: 1,
    code: "ISW-DU",
    name_zh: "监工现场",
    name_ja: "現場監督",
    name_en: "Supervision_Site",
    description_zh: "这些员工在干活之余还不忘帮老板解决麻烦，作为奖励，鸭爵或许会允许他们在工作时间自由上厕所？\n<@rolv.rem>场地中有可以阻挡敌人行进路线的<碎石>。</>",
    description_ja: "この従業員たちは仕事の合間でも、上司のお悩み解決に協力してくれる。ダック卿ももしかしたら、ご褒美として仕事中に好きにトイレに行くことくらいは許してくれるかも？\n<@rolv.rem>戦場に敵の進攻ルートを遮ることができる<礫岩>が設置されている。</>",
    description_en: "Even after clocking out, these employees won't forget to set aside time to help the boss take care of some problems. As a reward, Duck Lord might even be willing to let them use the restroom during working hours? \n<@rolv.rem>This stage has <Rubble> that can block the enemy's path.</>",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: null,
    eliteDesc_ja: null,
    eliteDesc_en: null,
    elite_mods: null,
    routes: [
      {
        title: "combat_ops",
        type: "video",
        youtube_src: "Y5MqLvLTNa8",
        bilibili_src: "aid=612931072&bvid=BV1ph4y1n75o&cid=1108574793&page=2"
      }
    ],
    floors: [
      3
    ],
    sp_terrain: [
      {
        tileKey: "tile_hole",
        alias: null,
        blackboard: null
      }
    ],
    sp_enemy: null,
    enemies: [
      {
        id: "enemy_2001_duckmi",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1076_bsthmr",
        level: 0,
        min_count: 4,
        max_count: 4,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      }
    ]
  },
  {
    id: "ro2_t_3",
    levelId: "level_rogue2_t-3",
    tags: [
      "rogue_mizuki"
    ],
    category: "encounter",
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-DU",
    name_zh: "拳拳到肉",
    name_ja: "ヘビーブロウ",
    name_en: "Right_in_the_Kisser",
    description_zh: "穿刺手的长枪和育母的拟嗣再疼，能有高普尼克一拳疼吗？\n<@rolv.rem>场地中有会损失生命但大幅提升攻击力和攻击速度的<活性源石>。</>",
    description_ja: "突撃兵の槍と母体の投げるダミーなど、ゴプニクの拳の一撃に比べれば大した痛みではあるまい。\n<@rolv.rem>接触した敵味方に継続ダメージを与える代わりに、攻撃力と攻撃速度を大幅に上昇させる<活性源石>が戦場に存在する。</>",
    description_en: "No matter how painful the lancers' thrusts or the broodmother's baleful spawns might be, is there anything that hurts as badly as Gopnik's punch? \n<@rolv.rem>This stage has <Active Originium> that greatly increases the ATK and ASPD of units that pass over it, but makes them lose HP over time.</>",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: null,
    eliteDesc_ja: null,
    eliteDesc_en: null,
    elite_mods: null,
    routes: [
      {
        title: "combat_ops",
        type: "video",
        youtube_src: "Qe5Rz7MmGyc",
        bilibili_src: "aid=612931072&bvid=BV1ph4y1n75o&cid=1108575195&page=3"
      }
    ],
    floors: [
      4
    ],
    sp_terrain: [
      {
        tileKey: "tile_infection",
        alias: null,
        blackboard: {
          duration: 500,
          damage: 120,
          atk: 0.5,
          attack_speed: 50
        }
      },
      {
        tileKey: "tile_hole",
        alias: null,
        blackboard: null
      }
    ],
    sp_enemy: null,
    enemies: [
      {
        id: "enemy_1072_dlancer",
        level: 0,
        min_count: 4,
        max_count: 4,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 7e3
        }
      },
      {
        id: "enemy_1072_dlancer_2",
        level: 0,
        min_count: 4,
        max_count: 4,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 12e3
        }
      },
      {
        id: "enemy_2023_sypult",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2024_synut",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 6e3
        }
      },
      {
        id: "enemy_2002_bearmi",
        level: 1,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      }
    ]
  },
  {
    id: "ro2_t_4",
    levelId: "level_rogue2_t-4",
    tags: [
      "rogue_mizuki"
    ],
    category: "encounter",
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-DU",
    name_zh: "抱头狗窜",
    name_ja: "逃げ惑う弱者",
    name_en: "Tail_Between_Legs",
    description_zh: "虽然这个爱哭鬼很烦人，但你也不得不承认，他真的很懂逃跑。<@rolv.rem>场地中有使周围敌军的隐匿效果失效的<侦测器>。</>",
    description_ja: "この泣き虫は確かに煩わしいが、彼の逃げ足の速さだけは、認めざるを得ないだろう。<@rolv.rem>戦場に起動後一定時間周囲の敵のステルス効果を無効化する<探知機>がある。</>",
    description_en: "As annoying as this crybaby is, you have no choice but to admit that he's really good at making a getaway. <@rolv.rem>This stage has a <Detector> that can disable the Invisibility effect of nearby enemies.</>",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: null,
    eliteDesc_ja: null,
    eliteDesc_en: null,
    elite_mods: null,
    routes: [
      {
        title: "combat_ops",
        type: "video",
        youtube_src: "Lrld3lNS7j4",
        bilibili_src: "aid=612931072&bvid=BV1ph4y1n75o&cid=1108575886&page=4"
      }
    ],
    floors: [
      5
    ],
    sp_terrain: null,
    sp_enemy: null,
    enemies: [
      {
        id: "enemy_2034_sythef",
        level: 2,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 3e4,
          def: 350
        }
      },
      {
        id: "enemy_1073_dscout",
        level: 0,
        min_count: 6,
        max_count: 6,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1071_dftman_2",
        level: 0,
        min_count: 28,
        max_count: 28,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      }
    ]
  },
  {
    id: "ro2_t_5",
    levelId: "level_rogue2_t-5",
    tags: [
      "rogue_mizuki"
    ],
    category: "encounter",
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-DU",
    name_zh: "鸭本运作",
    name_ja: "ダックキャピタル",
    name_en: "A_New_Day,_A_New_Duck",
    description_zh: "从何时开始，你和它之间的“小小”摩擦成为了一件自然且稀松平常的事呢？",
    description_ja: "一体いつから、あなたと奴との間の「些細な」軋轢が、ごく自然で取るに足らないことになったのだろうか？",
    description_en: "Since when did 'a little friction' between the two of you become such a commonplace occurrence?",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: null,
    eliteDesc_ja: null,
    eliteDesc_en: null,
    elite_mods: null,
    routes: [
      {
        title: "combat_ops",
        type: "video",
        youtube_src: "r5n0UpoP-Xw",
        bilibili_src: "aid=612931072&bvid=BV1ph4y1n75o&cid=1108576443&page=5"
      }
    ],
    floors: [
      5
    ],
    sp_terrain: null,
    sp_enemy: null,
    enemies: [
      {
        id: "enemy_2002_bearmi",
        level: 2,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2034_sythef",
        level: 2,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2001_duckmi",
        level: 2,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1181_napkgt_2",
        level: 0,
        min_count: 13,
        max_count: 13,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 12500
        }
      },
      {
        id: "enemy_1047_sagent_2",
        level: 0,
        min_count: 8,
        max_count: 8,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 6e3
        }
      },
      {
        id: "enemy_1026_aghost",
        level: 0,
        min_count: 8,
        max_count: 8,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 7600
        }
      },
      {
        id: "enemy_1008_ghost",
        level: 0,
        min_count: 3,
        max_count: 3,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 3500
        }
      }
    ]
  },
  {
    id: "ro2_ev_1",
    levelId: "level_rogue2_ev-1",
    tags: [
      "rogue_mizuki"
    ],
    category: "encounter",
    characterLimit: 6,
    initialCost: 20,
    costIncreaseTime: 1,
    code: "ISW-SP",
    name_zh: "真相",
    name_ja: "真相",
    name_en: "Reality",
    description_zh: "每个人都有自己的立场与坚持。既然已做出选择，就必须承担与之相应的后果。",
    description_ja: "すべての人にはそれぞれの立場とポリシーがある。既に決断を下したのなら、それに伴う結果に対して責任を持たねばならない。",
    description_en: "Everyone has their own perspectives and a hill they're willing to die on. Now that a decision has been made, the consequences must be seen through to the end.",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: null,
    eliteDesc_ja: null,
    eliteDesc_en: null,
    elite_mods: null,
    routes: [
      {
        title: "combat_ops",
        type: "video",
        youtube_src: "od2SKyr1f1A",
        bilibili_src: "aid=740386462&bvid=BV1Jk4y1J7nk&cid=1108568481&page=1"
      }
    ],
    floors: [
      3,
      4,
      5
    ],
    sp_terrain: null,
    sp_enemy: null,
    enemies: [
      {
        id: "enemy_3001_upeopl",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1104_lfkght_2",
        level: 0,
        min_count: 3,
        max_count: 3,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 24e3,
          atk: 700,
          talentBlackboard: [
            {
              key: "left_hand_debuff",
              initCooldown: 5,
              cooldown: 40,
              duration: 40
            }
          ]
        }
      },
      {
        id: "enemy_1107_uoffcr_2",
        level: 0,
        min_count: 10,
        max_count: 10,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1103_wdkght_2",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 7e4,
          atk: 1200,
          def: 1500,
          lifepoint: 2
        }
      }
    ]
  },
  {
    id: "ro2_ev_2",
    levelId: "level_rogue2_ev-2",
    tags: [
      "rogue_mizuki"
    ],
    category: "encounter",
    characterLimit: 6,
    initialCost: 20,
    costIncreaseTime: 1,
    code: "ISW-SP",
    name_zh: "狂信如火",
    name_ja: "火の如き狂信",
    name_en: "Fanatical_Flames",
    description_zh: "火焰熊熊燃烧，一如他们脱逸的理智，一如你心中的怒意。",
    description_ja: "炎がめらめらと燃えている。彼らの失われた理性のように、あなたの心の憤怒のように。",
    description_en: "The flames seethe and burn, like their untethered sanity, like the rage within your heart.",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: null,
    eliteDesc_ja: null,
    eliteDesc_en: null,
    elite_mods: null,
    routes: [
      {
        title: "combat_ops",
        type: "video",
        youtube_src: "lhWqsVFC7z4",
        bilibili_src: "aid=740386462&bvid=BV1Jk4y1J7nk&cid=1108651582&page=2"
      }
    ],
    floors: [
      4,
      5
    ],
    sp_terrain: null,
    sp_enemy: null,
    enemies: [
      {
        id: "enemy_1176_dusocr",
        level: 0,
        min_count: 3,
        max_count: 3,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1177_dufrbl",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1184_cadkgt_2",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 5e4,
          atk: 750,
          def: 550,
          res: 70,
          lifepoint: 2
        }
      },
      {
        id: "enemy_1184_cadkgt",
        level: 0,
        min_count: 2,
        max_count: 2,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 15e3,
          atk: 550,
          res: 70
        }
      }
    ]
  },
  {
    id: "ro2_ev_3",
    levelId: "level_rogue2_ev-3",
    tags: [
      "rogue_mizuki"
    ],
    category: "encounter",
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-SP",
    name_zh: "“喜”从箱来",
    name_ja: "「喜び」は箱より来たる",
    name_en: "'Joy'_From_a_Box",
    description_zh: "哦，恐鱼金币，不错，箱子里还会有更有意思的东西吗？比如说吐金币的雕像？或者......赤金恐鱼之类的？",
    description_ja: "ふむ、恐魚のコインか、悪くない。箱の中にもっと面白いものは入っていないか？例えば、コインを吐き出す彫刻とか、もしくは……純金の恐魚とか？",
    description_en: "Oh, a Sea Terror doubloon. Not bad, but is there anything more interesting in the chest? Like, a sculpture that spits out doubloons, or... a pure gold Sea Terror or something?",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: null,
    eliteDesc_ja: null,
    eliteDesc_en: null,
    elite_mods: null,
    routes: [
      {
        title: "combat_ops",
        type: "video",
        youtube_src: "uk091Mr81X0",
        bilibili_src: "aid=740386462&bvid=BV1Jk4y1J7nk&cid=1108652144&page=3"
      }
    ],
    floors: [
      3,
      4,
      5
    ],
    sp_terrain: [
      {
        tileKey: "tile_hole",
        alias: null,
        blackboard: null
      }
    ],
    sp_enemy: null,
    enemies: [
      {
        id: "enemy_1073_dscout",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1073_dscout_2",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1074_dbskar",
        level: 0,
        min_count: 0,
        max_count: 4,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1074_dbskar_2",
        level: 0,
        min_count: 0,
        max_count: 4,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2035_sybox",
        level: 1,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      }
    ]
  },
  {
    id: "ro2_ev_4",
    levelId: "level_rogue2_ev-4",
    tags: [
      "rogue_mizuki"
    ],
    category: "encounter",
    characterLimit: 6,
    initialCost: 20,
    costIncreaseTime: 1,
    code: "ISW-SP",
    name_zh: "竭泽而渔",
    name_ja: "水を抜き魚を取る",
    name_en: "Fishing_in_a_Dry_Pond",
    description_zh: "俗话说：“做人留一面，日后好相见。”但你倒觉得，没有必要卖坎诺特这个面子。<@rolv.rem>胜利后可洗劫坎诺特的商店。</>",
    description_ja: "「相手のメンツを立てれば、その後の付き合いもやりやすくなる」なんて言い方があるらしいが、あなたはキャノットのメンツを立てる必要などないと思った。<@rolv.rem>勝利後、キャノットの店から略奪できる。</>",
    description_en: "As the old saying goes: 'Always spare some dignity around others, for you never know who you might meet again later.' But then you tell yourself—is there really any need to hold water for Cannot? <@rolv.rem>After victory, you may loot Cannot's shop</>",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: null,
    eliteDesc_ja: null,
    eliteDesc_en: null,
    elite_mods: null,
    routes: [
      {
        title: "combat_ops",
        type: "video",
        youtube_src: "9XLVz9K9RvY",
        bilibili_src: "aid=740386462&bvid=BV1Jk4y1J7nk&cid=1108652873&page=4"
      }
    ],
    floors: [
      1,
      2,
      3
    ],
    sp_terrain: null,
    sp_enemy: null,
    enemies: [
      {
        id: "enemy_2036_syshop",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1262_durplc_2",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2023_sypult",
        level: 0,
        min_count: 2,
        max_count: 2,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2024_synut",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1159_swfmob",
        level: 0,
        min_count: 7,
        max_count: 7,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1159_swfmob_2",
        level: 0,
        min_count: 20,
        max_count: 20,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1259_durwar",
        level: 0,
        min_count: 3,
        max_count: 3,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1259_durwar_2",
        level: 0,
        min_count: 6,
        max_count: 6,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1262_durplc",
        level: 0,
        min_count: 3,
        max_count: 3,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      }
    ]
  },
  {
    id: "ro2_ev_5",
    levelId: "level_rogue2_ev-5",
    tags: [
      "rogue_mizuki"
    ],
    category: "encounter",
    characterLimit: 6,
    initialCost: 20,
    costIncreaseTime: 1,
    code: "ISW-SP",
    name_zh: "图穷匕见",
    name_ja: "露になる切っ先",
    name_en: "See_the_Big_Picture",
    description_zh: "旅途已近终点，一切都将画上句号，在这时候榨干商人最后的价值，也不失为一种选择。<@rolv.rem>胜利后可洗劫坎诺特的商店。</>",
    description_ja: "旅路は終点に近づき、すべてに終止符が打たれようとしている。このタイミングで行商人の価値を最後の一滴まで搾り尽くすのも、また一つの選択と言えよう。<@rolv.rem>勝利後、キャノットの店から略奪できる。</>",
    description_en: "The journey is about to come to an end, and the denouement is about to be written. At a time like this, squeezing every drop of value from the merchant's wares is not out of the question. <@rolv.rem>After victory, you may loot Cannot's shop.</>",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: null,
    eliteDesc_ja: null,
    eliteDesc_en: null,
    elite_mods: null,
    routes: [
      {
        title: "combat_ops",
        type: "video",
        youtube_src: "xEqzL5gVbdw",
        bilibili_src: "aid=740386462&bvid=BV1Jk4y1J7nk&cid=1108653901&page=5"
      }
    ],
    floors: [
      4,
      5,
      6
    ],
    sp_terrain: null,
    sp_enemy: null,
    enemies: [
      {
        id: "enemy_2036_syshop",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1095_ccripr_2",
        level: 0,
        min_count: 9,
        max_count: 9,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1094_ccspm_2",
        level: 0,
        min_count: 10,
        max_count: 10,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1093_ccsbr_2",
        level: 0,
        min_count: 4,
        max_count: 4,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1098_cchmpn_2",
        level: 0,
        min_count: 8,
        max_count: 8,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1062_rager_2",
        level: 0,
        min_count: 9,
        max_count: 9,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      }
    ]
  },
  {
    id: "ro2_e_1_1",
    levelId: "level_rogue2_1-1",
    tags: [
      "rogue_mizuki",
      "water"
    ],
    category: "combat_ops",
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "蓄水池",
    name_ja: "貯水池",
    name_en: "Cistern",
    description_zh: "争夺淡水资源分隔了曾经的信任，当淡水不再适合饮用时，恐慌便在所有人之中蔓延。\n<@rolv.rem>场地内有使敌方变慢并持续流失生命的<深水区>。</>",
    description_ja: "淡水資源の奪い合いによりかつての信頼は失われた。淡水が飲めなくなれば、人々にパニックが広がるだろう。\n<@rolv.rem>敵の動きを鈍らせ、HPを失わせ続ける<深水区域>が戦場に存在する。</>",
    description_en: "The scramble for fresh water highlights what once was a matter of trust. When water is no longer safe to drink, panic rips through the masses. \n<@rolv.rem>This stage has <Deep Water Zones> that cause enemies inside to have reduced Movement Speed and continuously lose HP.</>",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: [
      "所有敌方单位的攻击力，防御力+50%，生命值+90%"
    ],
    eliteDesc_ja: [
      "敵全員の攻撃力、防御力+50%、最大HP+90%"
    ],
    eliteDesc_en: [
      "All enemy units have +50% ATK, +50% DEF, and +90% Max HP"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          atk: 1.5,
          def: 1.5,
          hp: 1.9
        }
      }
    ],
    routes: [
      {
        title: "combat_ops",
        type: "video",
        youtube_src: "E0vcyRX6KbA",
        bilibili_src: "aid=442997769&bvid=BV1KL411e7xZ&cid=1108563446&page=1"
      },
      {
        title: "duck",
        type: "video",
        youtube_src: "kTZhTY3wFds",
        bilibili_src: "aid=442997769&bvid=BV1KL411e7xZ&cid=1108663594&page=2"
      },
      {
        title: "gpn",
        type: "video",
        youtube_src: "9_wYgNnYRyk",
        bilibili_src: "aid=442997769&bvid=BV1KL411e7xZ&cid=1108664141&page=3"
      },
      {
        title: "thf",
        type: "video",
        youtube_src: "vVnGtXEahoI",
        bilibili_src: "aid=442997769&bvid=BV1KL411e7xZ&cid=1108664213&page=4"
      },
      {
        title: "doq",
        type: "img",
        src: "蓄水池_fs9u7y"
      },
      {
        title: "chest",
        type: "img",
        src: "蓄水池"
      }
    ],
    floors: [
      1,
      2
    ],
    sp_terrain: [
      {
        tileKey: "tile_deepsea",
        alias: null,
        blackboard: null
      }
    ],
    sp_enemy: {
      normal: "28 / 30 / 32",
      elite: null,
      fixed: false
    },
    enemies: [
      {
        id: "enemy_1159_swfmob",
        level: 0,
        min_count: 0,
        max_count: 5,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1158_divman",
        level: 0,
        min_count: 3,
        max_count: 4,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1007_slime",
        level: 0,
        min_count: 9,
        max_count: 14,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1007_slime_2",
        level: 0,
        min_count: 8,
        max_count: 14,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2001_duckmi",
        level: 0,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 0,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2034_sythef",
        level: 0,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2035_sybox",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      }
    ]
  },
  {
    id: "ro2_e_1_2",
    levelId: "level_rogue2_1-2",
    tags: [
      "rogue_mizuki"
    ],
    category: "combat_ops",
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "虫群横行",
    name_ja: "横切る虫の群れ",
    name_en: "Insect_Infestation",
    description_zh: "听说虫群比人类更擅长感知危险，那这群四处乱窜的虫子到底在逃避什么呢？",
    description_ja: "虫は人間よりも危機の察知に長けているらしい。ではあの四方八方に飛び回る虫どもは、一体何を避けようとしているのだろう？",
    description_en: "Apparently, insect swarms are better at detecting danger than humans, so what are these bugs trying to avoid?",
    addInfo_zh: [
      "初始出现的源石虫有50%的概率出现在上或下边"
    ],
    addInfo_ja: [
      "最初にいる爆弾ムシは個体毎に50%の確率で上か下の方に出現する"
    ],
    addInfo_en: [
      "Each Infused Originium Slug that spawns at the beginning has 50% chance to appear on top/bottom"
    ],
    eliteDesc_zh: [
      "所有敌方单位的攻击力+50%，防御力+20%，生命值+120%",
      "第一只训练用钳兽被替换为磐蟹并提前12秒出现，停留时间延长10秒"
    ],
    eliteDesc_ja: [
      "敵全員の攻撃力+50%、防御力+20%、最大HP+120%",
      "最初の<訓練用鉗獣>が<ハガネガニ>に変更され、12秒早く出現し、停止時間10秒延長される"
    ],
    eliteDesc_en: [
      "All enemy units have +50% ATK, +20% DEF, and +120% Max HP",
      "First <Training Pincerbeast> is replaced by <Metal Crab>"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          atk: 1.5,
          def: 1.2,
          hp: 2.2
        }
      }
    ],
    routes: [
      {
        title: "combat_ops",
        type: "video",
        youtube_src: "gkqqb7OkSzA",
        bilibili_src: "aid=270469106&bvid=BV1fc411J7aW&cid=1108563924&page=1"
      },
      {
        title: "emergency_ops",
        type: "video",
        youtube_src: "jVNCERtPHV8",
        bilibili_src: "aid=270469106&bvid=BV1fc411J7aW&cid=1108669978&page=2"
      },
      {
        title: "duck",
        type: "video",
        youtube_src: "vUKx9d4sdrY",
        bilibili_src: "aid=270469106&bvid=BV1fc411J7aW&cid=1108670108&page=3"
      },
      {
        title: "gpn",
        type: "video",
        youtube_src: "silfkthsZS4",
        bilibili_src: "aid=270469106&bvid=BV1fc411J7aW&cid=1108670151&page=4"
      },
      {
        title: "thf",
        type: "video",
        youtube_src: "PoIvYb3meVA",
        bilibili_src: "aid=270469106&bvid=BV1fc411J7aW&cid=1108670314&page=5"
      },
      {
        title: "doq",
        type: "img",
        src: "虫群横行_xyqlwe"
      },
      {
        title: "chest",
        type: "img",
        src: "虫群横行"
      }
    ],
    floors: [
      1,
      2
    ],
    sp_terrain: [
      {
        tileKey: "tile_hole",
        alias: null,
        blackboard: null
      }
    ],
    sp_enemy: {
      normal: 38,
      elite: null,
      fixed: true
    },
    enemies: [
      {
        id: "enemy_1100_scorpn",
        level: 0,
        min_count: 3,
        max_count: 3,
        elite_min_count: 2,
        elite_max_count: 2,
        overwrittenData: {
          def: 300
        }
      },
      {
        id: "enemy_1021_bslime",
        level: 0,
        min_count: 4,
        max_count: 4,
        elite_min_count: 4,
        elite_max_count: 4,
        overwrittenData: null
      },
      {
        id: "enemy_1004_mslime",
        level: 0,
        min_count: 4,
        max_count: 4,
        elite_min_count: 4,
        elite_max_count: 4,
        overwrittenData: {
          atk: 100
        }
      },
      {
        id: "enemy_1007_slime",
        level: 0,
        min_count: 17,
        max_count: 17,
        elite_min_count: 17,
        elite_max_count: 17,
        overwrittenData: null
      },
      {
        id: "enemy_1007_slime_2",
        level: 0,
        min_count: 9,
        max_count: 9,
        elite_min_count: 9,
        elite_max_count: 9,
        overwrittenData: null
      },
      {
        id: "enemy_2001_duckmi",
        level: 0,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 0,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2034_sythef",
        level: 0,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2035_sybox",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1016_diaman",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: 1,
        elite_max_count: 1,
        overwrittenData: null
      }
    ]
  },
  {
    id: "ro2_e_1_3",
    levelId: "level_rogue2_1-3",
    tags: [
      "rogue_mizuki"
    ],
    category: "combat_ops",
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "射手部队",
    name_ja: "射手部隊",
    name_en: "Sniper_Squad",
    description_zh: "一些射手结伴而行在海岸上捕猎。所有活物都是他们的猎物。",
    description_ja: "射手たちが徒党を成して海岸で狩りを行っている。生けるものはすべて彼らの獲物だ。",
    description_en: "Some archers have banded together to hunt along the coast. All living things are their prey.",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: [
      "所有敌方单位的攻击力，防御力+20%，生命值+50%",
      "所有源石虫·α获得隐匿",
      "所有狙击步兵造成的晕眩时长提升至10s"
    ],
    eliteDesc_ja: [
      "敵全員の攻撃力、防御力+20%、最大HP+50%",
      "<オリジムシ·α>がステルス状態になる",
      "<狙撃歩兵>が与えるスタンが10秒になる"
    ],
    eliteDesc_en: [
      "All enemy units have +20% ATK, +20% DEF, and +50% Max HP",
      "All <Originium Slug> gain Stealth",
      "All <Sniper>'s stun duration increased to 10s"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          atk: 1.2,
          def: 1.2,
          hp: 1.5
        }
      },
      {
        targets: [
          "enemy_1007_slime_2"
        ],
        mods: {
          special: {
            stealth: {
              tooltip: {
                en: [
                  "$Stealth$"
                ],
                ja: [
                  "$ステルス$"
                ],
                zh: [
                  "$隐匿$"
                ]
              }
            }
          }
        }
      },
      {
        targets: [
          "enemy_1047_sagent"
        ],
        mods: {
          special: {
            sniper_stun: {
              tooltip: {
                en: [
                  "Every 3rd attack stuns target for $10s$"
                ],
                ja: [
                  "攻撃2回の度に次の攻撃に相手を$10秒$スタンする"
                ],
                zh: [
                  "攻击2次后，下一次攻击会晕眩目标$10秒$"
                ]
              }
            }
          }
        }
      }
    ],
    routes: [
      {
        title: "combat_ops",
        type: "video",
        youtube_src: "BewVP-m9E1c",
        bilibili_src: "aid=952979865&bvid=BV16s4y1c7xn&cid=1108556838&page=1"
      },
      {
        title: "emergency_ops",
        type: "video",
        youtube_src: "oH3LMNzcAdc",
        bilibili_src: "aid=952979865&bvid=BV16s4y1c7xn&cid=1108644574&page=2"
      },
      {
        title: "duck",
        type: "video",
        youtube_src: "GaKbQpE8INc",
        bilibili_src: "aid=952979865&bvid=BV16s4y1c7xn&cid=1108644280&page=3"
      },
      {
        title: "gpn",
        type: "video",
        youtube_src: "MhP_akztqgU",
        bilibili_src: "aid=952979865&bvid=BV16s4y1c7xn&cid=1108644912&page=4"
      },
      {
        title: "thf",
        type: "video",
        youtube_src: "FwkkYOYd4yo",
        bilibili_src: "aid=952979865&bvid=BV16s4y1c7xn&cid=1108644953&page=5"
      },
      {
        title: "doq",
        type: "img",
        src: "射手部队_zgnaut"
      },
      {
        title: "chest",
        type: "img",
        src: "射手部队"
      }
    ],
    floors: [
      1,
      2
    ],
    sp_terrain: null,
    sp_enemy: {
      normal: 29,
      elite: null,
      fixed: true
    },
    enemies: [
      {
        id: "enemy_2001_duckmi",
        level: 0,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2034_sythef",
        level: 0,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 0,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1047_sagent",
        level: 0,
        min_count: 2,
        max_count: 2,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1007_slime_2",
        level: 0,
        min_count: 22,
        max_count: 22,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1019_jshoot",
        level: 0,
        min_count: 4,
        max_count: 4,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          atk: 200
        }
      },
      {
        id: "enemy_2035_sybox",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      }
    ]
  },
  {
    id: "ro2_e_1_4",
    levelId: "level_rogue2_1-4",
    tags: [
      "rogue_mizuki"
    ],
    category: "combat_ops",
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "共生",
    name_ja: "共生",
    name_en: "Symbiosis",
    description_zh: "只要能够让集体更好地存活下去，大群会允许一些非海嗣个体栖息在族群中，必要时甚至可以提供帮助。",
    description_ja: "自分たちが生き延びるために有利に働くのであれば、大群はシーボーンでない個体が群れに入り混じって生息することを許し、必要とあらば手を貸すこともいとわない。",
    description_en: "As long as it is conducive to the survival of the collective, we many sometimes allow non-Seaborn to coexist with the colony, even providing aid when necessary.",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: [
      "所有敌方单位的攻击力+30%，防御力+20%，生命值+60%"
    ],
    eliteDesc_ja: [
      "敵全員の攻撃力+30%、防御力+20%、最大HP+60%"
    ],
    eliteDesc_en: [
      "All enemy units have +30% ATK, +20% DEF, and +60% Max HP"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          atk: 1.3,
          def: 1.2,
          hp: 1.6
        }
      }
    ],
    routes: [
      {
        title: "combat_ops",
        type: "video",
        youtube_src: "gsn_tQv1C8w",
        bilibili_src: "aid=952895983&bvid=BV1ps4y1c7fC&cid=1108693644&page=1"
      },
      {
        title: "duck",
        type: "video",
        youtube_src: "WNchIfHTHHw",
        bilibili_src: "aid=952895983&bvid=BV1ps4y1c7fC&cid=1108696050&page=2"
      },
      {
        title: "gpn",
        type: "video",
        youtube_src: "DNlm2VnO2x0",
        bilibili_src: "aid=952895983&bvid=BV1ps4y1c7fC&cid=1108696203&page=3"
      },
      {
        title: "thf",
        type: "video",
        youtube_src: "WcubvcEsK7I",
        bilibili_src: "aid=952895983&bvid=BV1ps4y1c7fC&cid=1108696227&page=4"
      },
      {
        title: "doq",
        type: "img",
        src: "共生_yi37ky"
      },
      {
        title: "chest",
        type: "img",
        src: "共生"
      }
    ],
    floors: [
      1,
      2
    ],
    sp_terrain: [
      {
        tileKey: "tile_hole",
        alias: null,
        blackboard: null
      }
    ],
    sp_enemy: {
      normal: 27,
      elite: null,
      fixed: true
    },
    enemies: [
      {
        id: "enemy_2021_syfish",
        level: 0,
        min_count: 8,
        max_count: 8,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1095_ccripr_2",
        level: 0,
        min_count: 0,
        max_count: 3,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 9e3,
          def: 230
        }
      },
      {
        id: "enemy_1010_demon",
        level: 0,
        min_count: 0,
        max_count: 3,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 8e3,
          atk: 500
        }
      },
      {
        id: "enemy_1147_dshond",
        level: 0,
        min_count: 15,
        max_count: 15,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2034_sythef",
        level: 0,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2001_duckmi",
        level: 0,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 0,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2035_sybox",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      }
    ]
  },
  {
    id: "ro2_e_1_5",
    levelId: "level_rogue2_1-5",
    tags: [
      "rogue_mizuki"
    ],
    category: "combat_ops",
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "互助",
    name_ja: "助け合い",
    name_en: "Mutual_Aid",
    description_zh: "当整个世界的常理变得支离破碎时，人们只能用最简单的方式来识别敌我——站身边的是朋友，站远方的是敌人。",
    description_ja: "この世界の常識が砕け散った時、人々は最も単純な方法で敵と味方を判別せざるを得なくなる。つまり――近くにいる者が味方で、遠くにいる者が敵だ。",
    description_en: "When the order of the world is broken, only the simplest way of telling friend from foe is available—those who stand with you are friends, and those who stand far away are foes.",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: [
      "所有敌方单位的攻击力+30%，生命值+60%",
      "盾卫攻击力，防御力减少50%"
    ],
    eliteDesc_ja: [
      "敵全員の攻撃力+30%、最大HP+60%",
      "<盾兵>の攻撃力、防御力-50%"
    ],
    eliteDesc_en: [
      "All enemy units have +30% ATK and +60% Max HP",
      "<Shieldguard> has -50% ATK and -50% DEF"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          atk: 1.3,
          hp: 1.6
        }
      }
    ],
    routes: [
      {
        title: "combat_ops",
        type: "video",
        youtube_src: "gu-iqShX06c",
        bilibili_src: "aid=227951525&bvid=BV1ch41177Hj&cid=1108551260&page=1"
      },
      {
        title: "combat_ops",
        type: "video",
        youtube_src: "JWLIyNnPRxo",
        bilibili_src: "aid=227951525&bvid=BV1ch41177Hj&cid=1108640152&page=2"
      },
      {
        title: "duck",
        type: "video",
        youtube_src: "x3eZjmnU33U",
        bilibili_src: "aid=227951525&bvid=BV1ch41177Hj&cid=1128616745&page=3"
      },
      {
        title: "chest",
        type: "img",
        src: "互助"
      }
    ],
    floors: [
      1,
      2
    ],
    sp_terrain: [
      {
        tileKey: "tile_hole",
        alias: null,
        blackboard: null
      }
    ],
    sp_enemy: {
      normal: "22 / 25",
      elite: null,
      fixed: true
    },
    enemies: [
      {
        id: "enemy_2021_syfish",
        level: 0,
        min_count: 0,
        max_count: 13,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1148_dssbr_2",
        level: 0,
        min_count: 0,
        max_count: 10,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          atk: 300
        }
      },
      {
        id: "enemy_1171_durokt",
        level: 0,
        min_count: 2,
        max_count: 2,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          def: 250
        }
      },
      {
        id: "enemy_1010_demon",
        level: 0,
        min_count: 2,
        max_count: 2,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          atk: 650
        }
      },
      {
        id: "enemy_1147_dshond",
        level: 0,
        min_count: 7,
        max_count: 7,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2001_duckmi",
        level: 0,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 0,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2034_sythef",
        level: 0,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2035_sybox",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      }
    ]
  },
  {
    id: "ro2_e_2_1",
    levelId: "level_rogue2_2-1",
    tags: [
      "rogue_mizuki"
    ],
    category: "combat_ops",
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "无声呼号",
    name_ja: "声なき叫び",
    name_en: "Voiceless_Summons",
    description_zh: "究竟是什么让一些人类能够使役恐鱼？还是说，这种使役本身只是人类的一厢情愿？\n<@rolv.rem>场地内有使我方不会成为敌人远程攻击目标的<草丛>。</>",
    description_ja: "一部の人間に恐魚を使役する力を与えたのは、一体何なのだろう？それとも、人間の一方的に使役していると、思い込んでいるにすぎないのだろうか？\n<@rolv.rem>配置した味方が敵遠距離攻撃の対象にならない効果を持つ<草むら>が戦場に存在する。</>",
    description_en: "What is it that allows some humans to utilize Sea Terrors? Or, is this utilization nothing more than wishful thinking on the part of the humans? \n<@rolv.rem>This stage has <Bushes> that prevent your units inside from being targeted by enemy ranged attacks.</>",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: [
      "所有敌方单位的攻击力，防御力+20%，生命值+40%",
      "出现更多的游击队传令兵"
    ],
    eliteDesc_ja: [
      "敵全員の攻撃力、防御力+20%、最大HP+40%",
      "追加で<遊撃隊伝令兵>が1体出現する"
    ],
    eliteDesc_en: [
      "All enemy units have +20% ATK, +20% DEF, and +40% Max HP",
      "Additional 1 <Guerrilla Herald> appears later, either at bottom left or right"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          atk: 1.2,
          def: 1.2,
          hp: 1.4
        }
      }
    ],
    routes: [
      {
        title: "combat_ops",
        type: "video",
        youtube_src: "NvGYiP8VCNE",
        bilibili_src: "aid=355427065&bvid=BV1XX4y1B7mQ&cid=1108565571&page=1"
      },
      {
        title: "emergency_ops",
        type: "video",
        youtube_src: "cp0aMW4ilg8",
        bilibili_src: "aid=355427065&bvid=BV1XX4y1B7mQ&cid=1108676219&page=2"
      },
      {
        title: "duck",
        type: "video",
        youtube_src: "Ue1LUXvNhCI",
        bilibili_src: "aid=355427065&bvid=BV1XX4y1B7mQ&cid=1108676264&page=3"
      },
      {
        title: "gpn",
        type: "video",
        youtube_src: "to-vqqlaDNg",
        bilibili_src: "aid=355427065&bvid=BV1XX4y1B7mQ&cid=1108676770&page=4"
      },
      {
        title: "thf",
        type: "video",
        youtube_src: "Vb0NDS4tJz0",
        bilibili_src: "aid=355427065&bvid=BV1XX4y1B7mQ&cid=1108676666&page=5"
      },
      {
        title: "doq",
        type: "img",
        src: "无声呼号_svxyfb"
      },
      {
        title: "chest",
        type: "img",
        src: "无声呼号"
      }
    ],
    floors: [
      2
    ],
    sp_terrain: [
      {
        tileKey: "tile_hole",
        alias: null,
        blackboard: null
      },
      {
        tileKey: "tile_grass",
        alias: null,
        blackboard: null
      }
    ],
    sp_enemy: {
      normal: 27,
      elite: 28,
      fixed: true
    },
    enemies: [
      {
        id: "enemy_2001_duckmi",
        level: 0,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 0,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2034_sythef",
        level: 0,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2022_syzeni",
        level: 0,
        min_count: 7,
        max_count: 7,
        elite_min_count: 7,
        elite_max_count: 7,
        overwrittenData: null
      },
      {
        id: "enemy_1007_slime_3",
        level: 0,
        min_count: 15,
        max_count: 15,
        elite_min_count: 15,
        elite_max_count: 15,
        overwrittenData: null
      },
      {
        id: "enemy_1080_sotidp",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: 2,
        elite_max_count: 2,
        overwrittenData: null
      },
      {
        id: "enemy_1083_sotiab",
        level: 0,
        min_count: 3,
        max_count: 3,
        elite_min_count: 3,
        elite_max_count: 3,
        overwrittenData: null
      },
      {
        id: "enemy_2035_sybox",
        level: 1,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      }
    ]
  },
  {
    id: "ro2_e_2_2",
    levelId: "level_rogue2_2-2",
    tags: [
      "rogue_mizuki"
    ],
    category: "combat_ops",
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "海神的信者",
    name_ja: "海神の信者",
    name_en: "Leviathan's_Followers",
    description_zh: "一些深海教徒听闻有位海神如同海上漂移的冰山，便自然而然地将之作为冰雪的象征顶礼膜拜。但他们从未见过，自然也不明白所谓“冰雪”的真正含义。\n<@rolv.rem>场地中有持续施加【寒冷】效果的源石冰晶。</>",
    description_ja: "まるで氷山のように海の上を漂流する海神がいることを知った一部の深海教徒たちは、それを氷雪の象徴として崇め奉るようになった。しかし「氷雪」を見たことのない彼らは、当然その本当の意味を知ることもない。\n<@rolv.rem>周囲を持続的に【寒冷】状態にする源石氷晶がある。</>",
    description_en: "Some Church of the Deep cultists have heard of a Leviathan that floats on the surface of the ocean like an iceberg, so naturally they worship it as an avatar of ice and snow. But naturally, they have no idea what 'ice and snow' truly are, considering they've never seen it before. \n<@rolv.rem>This stage has <Originium Ice Crystals> that periodically apply the Cold status in an area around them.</>",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: [
      "所有敌方单位的攻击力，防御力+20%，生命值+40%",
      "同时激活两处源石冰晶"
    ],
    eliteDesc_ja: [
      "敵全員の攻撃力、防御力+20%、最大HP+40%",
      "両方の源石氷晶が起動される"
    ],
    eliteDesc_en: [
      "All enemy units have +20% ATK, +20% DEF, and +40% Max HP",
      "Both Originium Ice Crystals are activated"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          atk: 1.2,
          def: 1.2,
          hp: 1.4
        }
      }
    ],
    routes: [
      {
        title: "combat_ops",
        type: "video",
        youtube_src: "r-rJ6neGl10",
        bilibili_src: "aid=227944635&bvid=BV1Th41177Ud&cid=1108432979&page=1"
      },
      {
        title: "duck",
        type: "video",
        youtube_src: "Vz5OEmWVvWY",
        bilibili_src: "aid=227944635&bvid=BV1Th41177Ud&cid=1108422768&page=2"
      },
      {
        title: "gpn",
        type: "video",
        youtube_src: "IE_UkRnLRXY",
        bilibili_src: "aid=227944635&bvid=BV1Th41177Ud&cid=1108432059&page=3"
      },
      {
        title: "thf",
        type: "video",
        youtube_src: "9ebex9xhQuk",
        bilibili_src: "aid=227944635&bvid=BV1Th41177Ud&cid=1108422679&page=4"
      },
      {
        title: "doq",
        type: "img",
        src: "海神的信者_mld3gp"
      },
      {
        title: "chest",
        type: "img",
        src: "海神的信者"
      }
    ],
    floors: [
      2
    ],
    sp_terrain: [
      {
        tileKey: "tile_hole",
        alias: null,
        blackboard: null
      }
    ],
    sp_enemy: {
      normal: 28,
      elite: null,
      fixed: true
    },
    enemies: [
      {
        id: "enemy_1187_krghd",
        level: 0,
        min_count: 10,
        max_count: 10,
        elite_min_count: 10,
        elite_max_count: 10,
        overwrittenData: null
      },
      {
        id: "enemy_1068_snmage",
        level: 0,
        min_count: 2,
        max_count: 2,
        elite_min_count: 2,
        elite_max_count: 2,
        overwrittenData: null
      },
      {
        id: "enemy_1067_snslime",
        level: 0,
        min_count: 5,
        max_count: 5,
        elite_min_count: 5,
        elite_max_count: 5,
        overwrittenData: null
      },
      {
        id: "enemy_1190_krgbow",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: 1,
        elite_max_count: 1,
        overwrittenData: {
          atk: 220
        }
      },
      {
        id: "enemy_1064_snsbr",
        level: 0,
        min_count: 9,
        max_count: 9,
        elite_min_count: 9,
        elite_max_count: 9,
        overwrittenData: null
      },
      {
        id: "enemy_2001_duckmi",
        level: 0,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 0,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2034_sythef",
        level: 0,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2035_sybox",
        level: 1,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      }
    ]
  },
  {
    id: "ro2_e_2_3",
    levelId: "level_rogue2_2-3",
    tags: [
      "rogue_mizuki"
    ],
    category: "combat_ops",
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "病症",
    name_ja: "疾病",
    name_en: "Malady",
    description_zh: "大地的病痛感染不了海洋，但水面上的那些岛屿，仍旧是它手中的玩物。\n<@rolv.rem>场地中会出现周期性对我军与敌军造成伤害的<源石祭坛>。</>",
    description_ja: "大地の病が海にまで感染することはない。しかし水面に浮かぶ島たちは、未だ病の手中で踊らされているのだ。\n<@rolv.rem>戦場に一定時間ごとに周囲にエネルギー波を放ち敵味方に確定ダメージを与える<源石祭壇>が設置されている。</>",
    description_en: "The land's malady cannot infect the ocean, but the islands above the water's surface are still its playthings. \n<@rolv.rem>This stage has <Originium Altars> that periodically damage friendly and enemy units around them.</>",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: [
      "所有敌方单位的攻击力，防御力，生命值+20%",
      "场地内部分位置无法部署"
    ],
    eliteDesc_ja: [
      "敵全員の攻撃力、防御力、最大HP+20%",
      "4つのマスが配置不可に"
    ],
    eliteDesc_en: [
      "All enemy units have +20% ATK, +20% DEF, and +20% Max HP",
      "4 tiles forbid deployment"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          atk: 1.2,
          def: 1.2,
          hp: 1.2
        }
      }
    ],
    routes: [
      {
        title: "combat_ops",
        type: "video",
        youtube_src: "dwW5dnw0-EE",
        bilibili_src: "aid=910399907&bvid=BV1yM4y1a7CS&cid=1108564404&page=1"
      },
      {
        title: "emergency_ops",
        type: "video",
        youtube_src: "jMmSVSD1UnU",
        bilibili_src: "aid=910399907&bvid=BV1yM4y1a7CS&cid=1108671746&page=2"
      },
      {
        title: "duck",
        type: "video",
        youtube_src: "r2FvpTQUIBk",
        bilibili_src: "aid=910399907&bvid=BV1yM4y1a7CS&cid=1108672001&page=3"
      },
      {
        title: "gpn",
        type: "video",
        youtube_src: "j8ReG0d46zs",
        bilibili_src: "aid=910399907&bvid=BV1yM4y1a7CS&cid=1108672313&page=4"
      },
      {
        title: "thf",
        type: "video",
        youtube_src: "hxlG93cyT3A",
        bilibili_src: "aid=910399907&bvid=BV1yM4y1a7CS&cid=1108672601&page=5"
      },
      {
        title: "doq",
        type: "img",
        src: "病症_iq5ucm"
      },
      {
        title: "chest",
        type: "img",
        src: "病症"
      }
    ],
    floors: [
      2
    ],
    sp_terrain: null,
    sp_enemy: {
      normal: 16,
      elite: null,
      fixed: true
    },
    enemies: [
      {
        id: "enemy_1027_mob",
        level: 0,
        min_count: 4,
        max_count: 4,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1132_sarchn",
        level: 0,
        min_count: 2,
        max_count: 2,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1130_infstr",
        level: 0,
        min_count: 6,
        max_count: 6,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1137_plasm",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1049_eagent",
        level: 0,
        min_count: 3,
        max_count: 3,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2001_duckmi",
        level: 0,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 0,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2034_sythef",
        level: 0,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2035_sybox",
        level: 1,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      }
    ]
  },
  {
    id: "ro2_e_2_4",
    levelId: "level_rogue2_2-4",
    tags: [
      "rogue_mizuki"
    ],
    category: "combat_ops",
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "征兆",
    name_ja: "兆候",
    name_en: "Omen",
    description_zh: "深海教徒将一只遵循繁殖本能的恐鱼带到了海岸上。如果不加以处理，不出几日，当地就将出现一轮小型恐鱼潮。",
    description_ja: "繁殖本能に従う一匹の恐魚を、深海教徒たちが海岸に連れて来た。このまま放置すれば、数日後にはこの辺り一帯に小さな恐魚の群れが出来上がることだろう。",
    description_en: "The Church of the Deep cultists have brought a Sea Terror following its reproductive instincts ashore. If not dealt with promptly, there will be a small tide of Sea Terrors in the surrounding area within a few days.",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: [
      "所有敌方单位的攻击力+10%，生命值+20%",
      "战斗开始后左右两侧同时出现投嗣育母"
    ],
    eliteDesc_ja: [
      "敵全員の攻撃力+10%、最大HP+20%",
      "戦闘開始時両側に<仔を投げる母体>が出現する"
    ],
    eliteDesc_en: [
      "All enemy units have +10% ATK and +20% Max HP",
      "<Retching Broodmother> appears on both sides at the start"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          atk: 1.1,
          hp: 1.2
        }
      }
    ],
    routes: [
      {
        title: "combat_ops",
        type: "video",
        youtube_src: "Ak40HGcerpE",
        bilibili_src: "aid=910489846&bvid=BV1nM4y187SH&cid=1108561837&page=1"
      },
      {
        title: "combat_ops",
        type: "video",
        youtube_src: "BlJx59y-Bno",
        bilibili_src: "aid=910489846&bvid=BV1nM4y187SH&cid=1108661874&page=2"
      },
      {
        title: "emergency_ops",
        type: "video",
        youtube_src: "x4UgrjIOqfc",
        bilibili_src: "aid=910489846&bvid=BV1nM4y187SH&cid=1108662171&page=3"
      },
      {
        title: "duck",
        type: "video",
        youtube_src: "9G-yO_v-tiM",
        bilibili_src: "aid=910489846&bvid=BV1nM4y187SH&cid=1108662570&page=4"
      },
      {
        title: "gpn",
        type: "video",
        youtube_src: "LYgCYyt_ISw",
        bilibili_src: "aid=910489846&bvid=BV1nM4y187SH&cid=1108662974&page=5"
      },
      {
        title: "doq",
        type: "img",
        src: "征兆_nrvutg"
      },
      {
        title: "chest",
        type: "img",
        src: "征兆"
      }
    ],
    floors: [
      2
    ],
    sp_terrain: null,
    sp_enemy: {
      normal: 21,
      elite: 22,
      fixed: true
    },
    enemies: [
      {
        id: "enemy_2023_sypult",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: 2,
        elite_max_count: 2,
        overwrittenData: null
      },
      {
        id: "enemy_2024_synut",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1009_lurker",
        level: 0,
        min_count: 4,
        max_count: 4,
        elite_min_count: 4,
        elite_max_count: 4,
        overwrittenData: null
      },
      {
        id: "enemy_1002_nsabr",
        level: 1,
        min_count: 14,
        max_count: 14,
        elite_min_count: 14,
        elite_max_count: 14,
        overwrittenData: {
          hp: 2550,
          atk: 250
        }
      },
      {
        id: "enemy_1006_shield_2",
        level: 0,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: {
          hp: 12e3,
          def: 900
        }
      },
      {
        id: "enemy_1035_haxe",
        level: 0,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: {
          hp: 11e3,
          atk: 900,
          def: 600
        }
      },
      {
        id: "enemy_2034_sythef",
        level: 0,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2001_duckmi",
        level: 0,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 0,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2035_sybox",
        level: 1,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      }
    ]
  },
  {
    id: "ro2_e_2_5",
    levelId: "level_rogue2_2-5",
    tags: [
      "rogue_mizuki"
    ],
    category: "combat_ops",
    characterLimit: 6,
    initialCost: 40,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "回溯",
    name_ja: "回想",
    name_en: "Ebb",
    description_zh: "一些恐鱼遵循着潮起潮落的规律活动，有心的猎人便以此为突破口消灭恐鱼。",
    description_ja: "恐魚の中には、潮の規則的な満ち引きに忠実に従うものもいる。ハンターはこれを突破口として恐魚を殲滅せんと目論んだ。",
    description_en: "Some Sea Terrors have behaviors that match the regularity of the tide's ebb and flow. Observant Hunters use this as an opportunity to go forth and eliminate them.",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: [
      "所有敌方单位的攻击力，防御力+30%，生命值，移动速度+50%"
    ],
    eliteDesc_ja: [
      "敵全員の攻撃力、防御力+30%、最大HP、移動速度+50%"
    ],
    eliteDesc_en: [
      "All enemy units have +30% ATK, +30% DEF, +50% Max HP and +50% Movement speed"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          atk: 1.3,
          def: 1.3,
          hp: 1.5,
          ms: 1.5
        }
      }
    ],
    routes: [
      {
        title: "combat_ops",
        type: "video",
        youtube_src: "1HA3Q52GVeI",
        bilibili_src: "aid=867996492&bvid=BV1mV4y1R7Xx&cid=1108387853&page=1"
      },
      {
        title: "duck",
        type: "video",
        youtube_src: "A10fSrK8zhY",
        bilibili_src: "aid=867996492&bvid=BV1mV4y1R7Xx&cid=1108570608&page=2"
      },
      {
        title: "gpn",
        type: "video",
        youtube_src: "ARROfFPWqgc",
        bilibili_src: "aid=867996492&bvid=BV1mV4y1R7Xx&cid=1108571040&page=3"
      },
      {
        title: "thf",
        type: "video",
        youtube_src: "6jh0HSLH5_4",
        bilibili_src: "aid=867996492&bvid=BV1mV4y1R7Xx&cid=1108571185&page=4"
      },
      {
        title: "doq",
        type: "img",
        src: "回溯_c9zxig"
      },
      {
        title: "chest",
        type: "img",
        src: "回溯"
      }
    ],
    floors: [
      2
    ],
    sp_terrain: null,
    sp_enemy: {
      normal: 23,
      elite: null,
      fixed: true
    },
    enemies: [
      {
        id: "enemy_2021_syfish",
        level: 0,
        min_count: 18,
        max_count: 18,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2022_syzeni",
        level: 0,
        min_count: 4,
        max_count: 4,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2001_duckmi",
        level: 0,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 0,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2034_sythef",
        level: 0,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2035_sybox",
        level: 1,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      }
    ]
  },
  {
    id: "ro2_e_2_6",
    levelId: "level_rogue2_2-6",
    tags: [
      "rogue_mizuki"
    ],
    category: "combat_ops",
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "饥渴",
    name_ja: "飢えと渇き",
    name_en: "Hunger_and_Thirst",
    description_zh: "当大地上没有足够的食粮，自然要去海边饱腹。",
    description_ja: "大地に十分な食料がなければ、当然海へと探しに向かう。",
    description_en: "When there is not enough food on land, head to the sea.",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: [
      "所有敌方单位的攻击力，防御力+20%，生命值+40%",
      "出现更多的萨卡兹枯朽吞噬者"
    ],
    eliteDesc_ja: [
      "敵全員の攻撃力、防御力+20%、最大HP+40%",
      "<枯朽サルカズ吸収者>がさらに1体出現する"
    ],
    eliteDesc_en: [
      "All enemy units have +20% ATK, +20% DEF, and +40% Max HP",
      "Additional 1 <Sarkaz Wither Devourer> appears"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          atk: 1.2,
          def: 1.2,
          hp: 1.4
        }
      }
    ],
    routes: [
      {
        title: "combat_ops",
        type: "video",
        youtube_src: "sdUGJrFOPMQ",
        bilibili_src: "aid=952892499&bvid=BV1Xs4y1A7hZ&cid=1108568167&page=1"
      },
      {
        title: "emergency_ops",
        type: "video",
        youtube_src: "ftjAFdr2At4",
        bilibili_src: "aid=952892499&bvid=BV1Xs4y1A7hZ&cid=1108694920&page=2"
      },
      {
        title: "doq",
        type: "img",
        src: "饥渴_caf0bj"
      },
      {
        title: "chest",
        type: "img",
        src: "饥渴"
      }
    ],
    floors: [
      2
    ],
    sp_terrain: [
      {
        tileKey: "tile_hole",
        alias: null,
        blackboard: null
      }
    ],
    sp_enemy: {
      normal: 23,
      elite: 24,
      fixed: true
    },
    enemies: [
      {
        id: "enemy_1267_nhpbr",
        level: 0,
        min_count: 5,
        max_count: 5,
        elite_min_count: 5,
        elite_max_count: 5,
        overwrittenData: null
      },
      {
        id: "enemy_1269_nhfly",
        level: 0,
        min_count: 15,
        max_count: 15,
        elite_min_count: 15,
        elite_max_count: 15,
        overwrittenData: null
      },
      {
        id: "enemy_1271_nhkodo",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: 2,
        elite_max_count: 2,
        overwrittenData: null
      },
      {
        id: "enemy_1270_nhstlk",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: 1,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2001_duckmi",
        level: 0,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 0,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2034_sythef",
        level: 0,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2035_sybox",
        level: 1,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      }
    ]
  },
  {
    id: "ro2_e_3_1",
    levelId: "level_rogue2_3-1",
    tags: [
      "rogue_mizuki"
    ],
    category: "combat_ops",
    characterLimit: 6,
    initialCost: 19,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "除暴安良",
    name_ja: "平和の奪還",
    name_en: "Crime_and_Punishment",
    description_zh: "流寇无法从恐鱼身上获取财富，便转而对着同胞痛下杀手。这次他们踢到了铁板。",
    description_ja: "盗賊たちは恐魚から金目の物を奪えないと見るやいなや、同胞に手を下す。しかし今回は痛い目を見るはめになったようだ。",
    description_en: "These rogues were unable to extract any wealth from the Sea Terrors, so they turned their blades on their fellow men. This time, they struck a sheet of metal.",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: [
      "所有敌方单位的攻击力，生命值+20%",
      "空降组长被替换为游击队突袭战士"
    ],
    eliteDesc_ja: [
      "敵全員の攻撃力、最大HP+20%",
      "<空挺隊長>が<遊撃隊強襲兵>に替わる"
    ],
    eliteDesc_en: [
      "All enemy units have +20% ATK, and +20% Max HP",
      "All <Airborne Soldier Leader> are replaced by <Guerrilla Siegebreaker>"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          atk: 1.2,
          hp: 1.2
        }
      }
    ],
    routes: [
      {
        title: "combat_ops",
        type: "video",
        youtube_src: "Y-c55yCsKTE",
        bilibili_src: "aid=740387780&bvid=BV1Jk4y1J7KU&cid=1108557782&page=1"
      },
      {
        title: "duck",
        type: "video",
        youtube_src: "zD7eUJ6i93M",
        bilibili_src: "aid=740387780&bvid=BV1Jk4y1J7KU&cid=1108647799&page=2"
      },
      {
        title: "gpn",
        type: "video",
        youtube_src: "fDam_AJfPoo",
        bilibili_src: "aid=740387780&bvid=BV1Jk4y1J7KU&cid=1108648148&page=3"
      },
      {
        title: "thf",
        type: "video",
        youtube_src: "dpGeqX1BG-k",
        bilibili_src: "aid=740387780&bvid=BV1Jk4y1J7KU&cid=1108648444&page=4"
      },
      {
        title: "doq",
        type: "img",
        src: "除暴安良_hfuult"
      },
      {
        title: "chest",
        type: "img",
        src: "除暴安良"
      }
    ],
    floors: [
      2,
      3
    ],
    sp_terrain: [
      {
        tileKey: "tile_hole",
        alias: null,
        blackboard: null
      }
    ],
    sp_enemy: {
      normal: 48,
      elite: null,
      fixed: true
    },
    enemies: [
      {
        id: "enemy_1007_slime_2",
        level: 0,
        min_count: 14,
        max_count: 14,
        elite_min_count: 14,
        elite_max_count: 14,
        overwrittenData: null
      },
      {
        id: "enemy_1083_sotiab",
        level: 0,
        min_count: 7,
        max_count: 7,
        elite_min_count: 12,
        elite_max_count: 12,
        overwrittenData: null
      },
      {
        id: "enemy_1080_sotidp",
        level: 0,
        min_count: 1,
        max_count: 2,
        elite_min_count: 1,
        elite_max_count: 2,
        overwrittenData: null
      },
      {
        id: "enemy_1078_sotisc",
        level: 0,
        min_count: 13,
        max_count: 13,
        elite_min_count: 13,
        elite_max_count: 13,
        overwrittenData: null
      },
      {
        id: "enemy_1079_sotisp",
        level: 0,
        min_count: 0,
        max_count: 3,
        elite_min_count: 0,
        elite_max_count: 3,
        overwrittenData: null
      },
      {
        id: "enemy_1083_sotiab_2",
        level: 0,
        min_count: 3,
        max_count: 3,
        elite_min_count: 3,
        elite_max_count: 3,
        overwrittenData: {
          talentBlackboard: [
            {
              key: "guerilla_siegebreaker_leader_buff",
              value: 100
            }
          ]
        }
      },
      {
        id: "enemy_1016_diaman",
        level: 0,
        min_count: 0,
        max_count: 3,
        elite_min_count: 0,
        elite_max_count: 3,
        overwrittenData: null
      },
      {
        id: "enemy_1013_airdrp_2",
        level: 0,
        min_count: 5,
        max_count: 5,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1082_soticn",
        level: 0,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2034_sythef",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2001_duckmi",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2035_sybox",
        level: 1,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      }
    ]
  },
  {
    id: "ro2_e_3_2",
    levelId: "level_rogue2_3-2",
    tags: [
      "rogue_mizuki"
    ],
    category: "combat_ops",
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "原始部落",
    name_ja: "原始集落",
    name_en: "Troglodyte_Tribe",
    description_zh: "他们比萨尔贡的同族更残忍，更顽固，更好斗。所以不要浪费口舌了，举起武器吧。\n<@rolv.rem>场地中有会损失生命但大幅提升攻击力和攻击速度的<活性源石>。</>",
    description_ja: "彼らはサルゴンの同族よりも残忍で、頑固で、好戦的だ。だから四の五の言わずに、武器を手に取りなさい。\n<@rolv.rem>接触した敵味方に継続ダメージを与える代わりに、攻撃力と攻撃速度を大幅に上昇させる<活性源石>が戦場に存在する。</>",
    description_en: "They are crueler, more intractable, and more belligerent than their Sargonian kin. So save your breath and pick up your weapons. \n<@rolv.rem>This stage has <Active Originium> that greatly increases the ATK and ASPD of units that pass over it, but makes them lose HP over time.</>",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: [
      "所有敌方单位的攻击力，生命值+20%",
      "战斗开始后出现在活性源石上提亚卡乌冠军被替换为泥岩巨像"
    ],
    eliteDesc_ja: [
      "敵全員の攻撃力、最大HP+20%",
      "最初の<ティアカウ勇士>が<マドロックの巨像>に替わる"
    ],
    eliteDesc_en: [
      "All enemy units have +20% ATK, and +20% Max HP",
      "Starting <Tiacauh Brave> is replaced by <Mudrock Colossus>"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          atk: 1.2,
          hp: 1.2
        }
      }
    ],
    routes: [
      {
        title: "combat_ops",
        type: "video",
        youtube_src: "OEZoaVUjn_M",
        bilibili_src: "aid=400457523&bvid=BV1uo4y1L7Lp&cid=1108550697&page=1"
      },
      {
        title: "emergency_ops",
        type: "video",
        youtube_src: "xlmr2FwYrbk",
        bilibili_src: "aid=400457523&bvid=BV1uo4y1L7Lp&cid=1108636179&page=2"
      },
      {
        title: "duck",
        type: "video",
        youtube_src: "nhkLlZT-A9k",
        bilibili_src: "aid=400457523&bvid=BV1uo4y1L7Lp&cid=1108636309&page=3"
      },
      {
        title: "gpn",
        type: "video",
        youtube_src: "72wm4purUFs",
        bilibili_src: "aid=400457523&bvid=BV1uo4y1L7Lp&cid=1108636286&page=4"
      },
      {
        title: "thf",
        type: "video",
        youtube_src: "KY21DHzPU4M",
        bilibili_src: "aid=400457523&bvid=BV1uo4y1L7Lp&cid=1108636603&page=5"
      },
      {
        title: "doq",
        type: "img",
        src: "原始部落_uajbtb"
      },
      {
        title: "chest",
        type: "img",
        src: "原始部落"
      }
    ],
    floors: [
      3
    ],
    sp_terrain: [
      {
        tileKey: "tile_infection",
        alias: null,
        blackboard: {
          duration: 600,
          damage: 100,
          atk: 0.5,
          attack_speed: 50
        }
      }
    ],
    sp_enemy: {
      normal: 24,
      elite: null,
      fixed: true
    },
    enemies: [
      {
        id: "enemy_1092_mdgint",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: 1,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_1096_ccwitch",
        level: 0,
        min_count: 4,
        max_count: 4,
        elite_min_count: 4,
        elite_max_count: 4,
        overwrittenData: null
      },
      {
        id: "enemy_2034_sythef",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2001_duckmi",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_1098_cchmpn_2",
        level: 0,
        min_count: 2,
        max_count: 2,
        elite_min_count: 1,
        elite_max_count: 1,
        overwrittenData: {
          hp: 24e3
        }
      },
      {
        id: "enemy_1093_ccsbr_2",
        level: 0,
        min_count: 17,
        max_count: 17,
        elite_min_count: 17,
        elite_max_count: 17,
        overwrittenData: null
      },
      {
        id: "enemy_2035_sybox",
        level: 1,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      }
    ]
  },
  {
    id: "ro2_e_3_3",
    levelId: "level_rogue2_3-3",
    tags: [
      "rogue_mizuki"
    ],
    category: "combat_ops",
    characterLimit: 6,
    initialCost: 12,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "精酿杀手",
    name_ja: "クラフトキラー",
    name_en: "Craft_Brewer_Killer",
    description_zh: "眼见订单逾期，车辆抛锚，运送的精酿啤酒还被恐鱼喝了个精光。就此疯癫也算情有可原。",
    description_ja: "目の前で注文の納期が期限切れし、車両はエンストを起こし、運送していたクラフトビールは恐魚にすべて飲み尽くされてしまった。こうなってしまっては気が狂うのも仕方のないことだ。",
    description_en: "Faced with a past-due shipment, a broken-down car, and now a swarm of Sea Terrors drunk off his slated-for-delivery craft brews, his insanity seems rather justifiable.",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: [
      "所有敌方单位的攻击力+20%，生命值+50%",
      "部署费用的自然回复速度降低至50%"
    ],
    eliteDesc_ja: [
      "敵全員の攻撃力+20%、最大HP+50%",
      "コスト回復速度が50％減少"
    ],
    eliteDesc_en: [
      "All enemy units have +20% ATK, and +50% Max HP",
      "DP regen decreased by 50%"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          atk: 1.2,
          hp: 1.5
        }
      }
    ],
    routes: [
      {
        title: "combat_ops",
        type: "video",
        youtube_src: "umlIYoFPYaA",
        bilibili_src: "aid=270485403&bvid=BV19c411J76E&cid=1108562205&page=1"
      },
      {
        title: "duck",
        type: "video",
        youtube_src: "7KMtDZdfE0A",
        bilibili_src: "aid=270485403&bvid=BV19c411J76E&cid=1108663365&page=2"
      },
      {
        title: "gpn",
        type: "video",
        youtube_src: "9H9gxQPFqWQ",
        bilibili_src: "aid=270485403&bvid=BV19c411J76E&cid=1108663294&page=3"
      },
      {
        title: "doq",
        type: "img",
        src: "精酿杀手_vsir2l"
      },
      {
        title: "chest",
        type: "img",
        src: "精酿杀手"
      }
    ],
    floors: [
      3
    ],
    sp_terrain: null,
    sp_enemy: {
      normal: 20,
      elite: null,
      fixed: true
    },
    enemies: [
      {
        id: "enemy_1150_dsjely",
        level: 0,
        min_count: 2,
        max_count: 2,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1152_dsurch",
        level: 0,
        min_count: 4,
        max_count: 4,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 2e4,
          atk: 100
        }
      },
      {
        id: "enemy_1147_dshond",
        level: 0,
        min_count: 10,
        max_count: 10,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1001_bigbo_2",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 2e4,
          atk: 2500
        }
      },
      {
        id: "enemy_2001_duckmi",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2034_sythef",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2035_sybox",
        level: 1,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1148_dssbr_2",
        level: 0,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1148_dssbr",
        level: 0,
        min_count: 1,
        max_count: 2,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      }
    ]
  },
  {
    id: "ro2_e_3_4",
    levelId: "level_rogue2_3-4",
    tags: [
      "rogue_mizuki"
    ],
    category: "combat_ops",
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "大君遗脉",
    name_ja: "大君の末裔",
    name_en: "Sanguinarch's_Legacy",
    description_zh: "血液与海水在形式上或许没那么多区别。所以碧波荡漾之处，血魔大君的子嗣们仍能生存。",
    description_ja: "血液にも海水にも、構造上は大した違いはないのかもしれない。ゆえに青いさざ波の揺れるこの場所でも、ブラッドブルードの大君の子は変わらず生き続けることができるのだ。",
    description_en: "There may not be much of a difference between blood and seawater, at least in form. Therefore, anywhere the azure waves still ripple, the Sanguinarch's offspring can still survive.",
    addInfo_zh: [
      "第一个敌人随机从左或右边出现"
    ],
    addInfo_ja: [
      "最初の敵は左か右から現れる"
    ],
    addInfo_en: [
      "First enemy can either appear on left/right side"
    ],
    eliteDesc_zh: [
      "所有敌方单位的攻击力，生命值+20%",
      "大君之赐被替换为慷慨之赐"
    ],
    eliteDesc_ja: [
      "敵全員の攻撃力、最大HP+20%",
      "<大君の祝福>が<寛大な祝福>に替わる"
    ],
    eliteDesc_en: [
      "All enemy units have +20% ATK, and +20% Max HP",
      "All <Gift of the Sanguinarch> are replaced by <Gift of Magnanimity>"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          atk: 1.2,
          hp: 1.2
        }
      }
    ],
    routes: [
      {
        title: "combat_ops",
        type: "video",
        youtube_src: "Bwb3cOuvdQc",
        bilibili_src: "aid=355430458&bvid=BV19X4y1B7Ro&cid=1108562762&page=1"
      },
      {
        title: "emergency_ops",
        type: "video",
        youtube_src: "5_z7QAdpfkM",
        bilibili_src: "aid=355430458&bvid=BV19X4y1B7Ro&cid=1108665143&page=2"
      },
      {
        title: "duck",
        type: "video",
        youtube_src: "xlpBpJ-cY78",
        bilibili_src: "aid=355430458&bvid=BV19X4y1B7Ro&cid=1108665155&page=3"
      },
      {
        title: "thf",
        type: "video",
        youtube_src: "koxpVvCx9ic",
        bilibili_src: "aid=355430458&bvid=BV19X4y1B7Ro&cid=1108665228&page=4"
      },
      {
        title: "doq",
        type: "img",
        src: "大君遗脉_q03cle"
      },
      {
        title: "chest",
        type: "img",
        src: "大君遗脉"
      }
    ],
    floors: [
      3
    ],
    sp_terrain: null,
    sp_enemy: {
      normal: 32,
      elite: null,
      fixed: true
    },
    enemies: [
      {
        id: "enemy_1220_dzoms",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1222_dpvt",
        level: 0,
        min_count: 26,
        max_count: 26,
        elite_min_count: 26,
        elite_max_count: 26,
        overwrittenData: null
      },
      {
        id: "enemy_1224_dsuply_2",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: 1,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_1221_dzomg",
        level: 0,
        min_count: 4,
        max_count: 4,
        elite_min_count: 2,
        elite_max_count: 2,
        overwrittenData: null
      },
      {
        id: "enemy_1221_dzomg_2",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: 2,
        elite_max_count: 2,
        overwrittenData: null
      },
      {
        id: "enemy_2001_duckmi",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2034_sythef",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2035_sybox",
        level: 1,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      }
    ]
  },
  {
    id: "ro2_e_3_5",
    levelId: "level_rogue2_3-5",
    tags: [
      "rogue_mizuki"
    ],
    category: "combat_ops",
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "据险固守",
    name_ja: "要害の守護",
    name_en: "Precarious_Defense",
    description_zh: "在正确的战术抉择与众人的互帮互助下，我们或许能从兽性与癫狂中求得生路。",
    description_ja: "正しい戦術を選択し、多くの人の協力を得られれば、我々も獣性と狂気の中に活路を見出すことができるのかもしれない。",
    description_en: "With the proper tactical decisions and everyone's mutual support, there may yet be a way to survive this savagery and madness.",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: [
      "所有敌方单位的生命值+50%",
      "不再出现狂暴宿主士兵，而是出现3只狂暴宿主投掷手"
    ],
    eliteDesc_ja: [
      "敵全員の最大HP+50%",
      "<狂化寄生兵>が<狂化寄生投擲兵>に替わる"
    ],
    eliteDesc_en: [
      "All enemy units have +50% Max HP",
      "All <Enraged Possessed Soldier> are replaced by <Enraged Possessed Thrower>"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          hp: 1.5
        }
      }
    ],
    routes: [
      {
        title: "combat_ops",
        type: "video",
        youtube_src: "_ch6mLkjmN8",
        bilibili_src: "aid=825392158&bvid=BV1Eg4y177Kf&cid=1108561327&page=1"
      },
      {
        title: "emergency_ops",
        type: "video",
        youtube_src: "Za-SpKd5tGs",
        bilibili_src: "aid=825392158&bvid=BV1Eg4y177Kf&cid=1108660418&page=2"
      },
      {
        title: "duck",
        type: "video",
        youtube_src: "KQfEFDesR7A",
        bilibili_src: "aid=825392158&bvid=BV1Eg4y177Kf&cid=1108660574&page=3"
      },
      {
        title: "gpn",
        type: "video",
        youtube_src: "vCoCAVpEbVo",
        bilibili_src: "aid=825392158&bvid=BV1Eg4y177Kf&cid=1108660471&page=4"
      },
      {
        title: "doq",
        type: "img",
        src: "据险固守_qdx7ij"
      },
      {
        title: "chest",
        type: "img",
        src: "据险固守"
      }
    ],
    floors: [
      3
    ],
    sp_terrain: null,
    sp_enemy: {
      normal: 48,
      elite: 47,
      fixed: true
    },
    enemies: [
      {
        id: "enemy_1062_rager",
        level: 0,
        min_count: 4,
        max_count: 4,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 3e4,
          def: 230,
          talentBlackboard: [
            {
              key: "bleed_true",
              value: 350
            }
          ]
        }
      },
      {
        id: "enemy_1063_rageth",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: 3,
        elite_max_count: 3,
        overwrittenData: {
          hp: 22e3,
          atk: 650,
          def: 220,
          talentBlackboard: [
            {
              key: "bleed_true",
              value: 350
            }
          ]
        }
      },
      {
        id: "enemy_1021_bslime",
        level: 0,
        min_count: 19,
        max_count: 19,
        elite_min_count: 19,
        elite_max_count: 19,
        overwrittenData: null
      },
      {
        id: "enemy_1021_bslime_2",
        level: 0,
        min_count: 3,
        max_count: 3,
        elite_min_count: 3,
        elite_max_count: 3,
        overwrittenData: null
      },
      {
        id: "enemy_1000_gopro_3",
        level: 0,
        min_count: 4,
        max_count: 4,
        elite_min_count: 4,
        elite_max_count: 4,
        overwrittenData: null
      },
      {
        id: "enemy_1008_ghost",
        level: 0,
        min_count: 15,
        max_count: 15,
        elite_min_count: 15,
        elite_max_count: 15,
        overwrittenData: {
          hp: 3e3
        }
      },
      {
        id: "enemy_1026_aghost",
        level: 0,
        min_count: 2,
        max_count: 2,
        elite_min_count: 2,
        elite_max_count: 2,
        overwrittenData: {
          hp: 6e3
        }
      },
      {
        id: "enemy_2001_duckmi",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2034_sythef",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2035_sybox",
        level: 1,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      }
    ]
  },
  {
    id: "ro2_e_3_6",
    levelId: "level_rogue2_3-6",
    tags: [
      "rogue_mizuki"
    ],
    category: "combat_ops",
    characterLimit: 6,
    initialCost: 15,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "巢穴",
    name_ja: "巣窟",
    name_en: "The_Nest",
    description_zh: "恐鱼巢穴四通八达，入侵者很快就会受到两面夹击。当他们杀死自愿留下迎敌的恐鱼时，巢穴中的其他同族早就转移到了别处。",
    description_ja: "恐魚の巣穴はあらゆる場所に通じており、侵入者はあっという間に挟み撃ちに遭うことになる。敵を迎え撃つために留まっていた恐魚を仕留めた頃には、巣穴にいた他の仲間はとうに別の場所へと移動していることだろう。",
    description_en: "The Sea Terror's nest extends in all directions, and intruders quickly find themselves trapped from two sides. By the time they manage to kill one that volunteered itself to stay behind as distraction, its kin have long since relocated.",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: [
      "所有敌方单位的攻击力，防御力+20%，生命值+50%",
      "所有固海凿石者的攻击力额外再提升至130%，且攻击速度提升30"
    ],
    eliteDesc_ja: [
      "敵全員の攻撃力、防御力+20%、最大HP+50%",
      "<固海のメイソン>の攻撃力がさらに30%上昇、かつ攻撃速度+30"
    ],
    eliteDesc_en: [
      "All enemy units have +20% ATK, +20% DEF, and +50% Max HP",
      "All <Ocean Stonecutter> additionally gain +30% ATK, +30 ASPD "
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          atk: 1.2,
          def: 1.2,
          hp: 1.5
        }
      },
      {
        targets: [
          "SY2"
        ],
        mods: {
          atk: 1.3,
          fixed_aspd: 30
        }
      }
    ],
    routes: [
      {
        title: "combat_ops",
        type: "video",
        youtube_src: "Zt3_cn5BwZU",
        bilibili_src: "aid=655493758&bvid=BV1Ra4y1V7Mu&cid=1108566350&page=1"
      },
      {
        title: "duck",
        type: "video",
        youtube_src: "P_lqMAcCvR8",
        bilibili_src: "aid=655493758&bvid=BV1Ra4y1V7Mu&cid=1108688374&page=2"
      },
      {
        title: "gpn",
        type: "video",
        youtube_src: "aH-1N0uk46w",
        bilibili_src: "aid=655493758&bvid=BV1Ra4y1V7Mu&cid=1108688589&page=3"
      },
      {
        title: "thf",
        type: "video",
        youtube_src: "PMxX8pQn5i0",
        bilibili_src: "aid=655493758&bvid=BV1Ra4y1V7Mu&cid=1108688449&page=4"
      },
      {
        title: "doq",
        type: "img",
        src: "巢穴_iukamh"
      },
      {
        title: "chest",
        type: "img",
        src: "巢穴"
      }
    ],
    floors: [
      3
    ],
    sp_terrain: null,
    sp_enemy: {
      normal: 46,
      elite: null,
      fixed: true
    },
    enemies: [
      {
        id: "enemy_2001_duckmi",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2034_sythef",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2023_sypult",
        level: 0,
        min_count: 2,
        max_count: 2,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2022_syzeni",
        level: 0,
        min_count: 14,
        max_count: 14,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2024_synut",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1147_dshond",
        level: 0,
        min_count: 28,
        max_count: 28,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2035_sybox",
        level: 1,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1076_bsthmr",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      }
    ]
  },
  {
    id: "ro2_e_3_7",
    levelId: "level_rogue2_3-7",
    tags: [
      "rogue_mizuki"
    ],
    category: "combat_ops",
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "漩涡",
    name_ja: "渦",
    name_en: "Vortex",
    description_zh: "海洋想要吞噬一切，深海教徒便唤起漩涡，恐鱼快乐地涌入，捕食着卷入其中的食物。",
    description_ja: "海があらゆる物を呑み込まんと欲したので、深海教徒たちは渦を呼び起こした。恐魚たちは楽しげにそこへ躍り込み、中に巻き込まれた獲物を捕食していく。",
    description_en: "The ocean seeks to devour all, and the cultists rouse the vortex. Sea Terrors gladly rush forth, preying on the food caught within.",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: [
      "所有敌方单位的攻击力，防御力+20%，生命值，移动速度+50%"
    ],
    eliteDesc_ja: [
      "敵全員の攻撃力、防御力+20%、最大HP、移動速度+50%"
    ],
    eliteDesc_en: [
      "All enemy units have +20% ATK, +20% DEF, +50% Max HP and +50% Movement speed"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          atk: 1.2,
          def: 1.2,
          hp: 1.5,
          ms: 1.5
        }
      }
    ],
    routes: [
      {
        title: "combat_ops",
        type: "video",
        youtube_src: "uPPcWnPkAc8",
        bilibili_src: "aid=400381032&bvid=BV12o4y157kH&cid=1108679454&page=1"
      },
      {
        title: "combat_ops",
        type: "video",
        youtube_src: "DGRiQjZFqTc",
        bilibili_src: "aid=400381032&bvid=BV12o4y157kH&cid=1108566772&page=2"
      },
      {
        title: "duck",
        type: "video",
        youtube_src: "lFeH9zlQJf0",
        bilibili_src: "aid=400381032&bvid=BV12o4y157kH&cid=1108679481&page=3"
      },
      {
        title: "gpn",
        type: "video",
        youtube_src: "xCjf86kwttc",
        bilibili_src: "aid=400381032&bvid=BV12o4y157kH&cid=1108679869&page=4"
      },
      {
        title: "doq",
        type: "img",
        src: "漩涡_act9ai"
      },
      {
        title: "chest",
        type: "img",
        src: "漩涡"
      }
    ],
    floors: [
      3
    ],
    sp_terrain: null,
    sp_enemy: {
      normal: 25,
      elite: null,
      fixed: true
    },
    enemies: [
      {
        id: "enemy_2021_syfish",
        level: 0,
        min_count: 20,
        max_count: 20,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2023_sypult",
        level: 0,
        min_count: 2,
        max_count: 2,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2024_synut",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1161_tidmag",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2001_duckmi",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2034_sythef",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2035_sybox",
        level: 1,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1162_magmot",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      }
    ]
  },
  {
    id: "ro2_e_3_8",
    levelId: "level_rogue2_3-8",
    tags: [
      "rogue_mizuki"
    ],
    category: "combat_ops",
    characterLimit: 6,
    initialCost: 12,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "瞻前顾后",
    name_ja: "優柔不断",
    name_en: "Looking_Forward,_Looking_Back",
    description_zh: "前有敌手，后有追兵。人们争斗至此，或许只是为了一小块未被海嗣侵扰的土地。\n<@rolv.rem>场地中有会损失生命但大幅提升攻击力和攻击速度的<活性源石>。</>",
    description_ja: "前方には敵が待ち構え、後方からは追手が迫っている。人々がここまで戦ってきたのは、ただシーボーンに侵略されていない小さな土地のためだけなのかもしれない。\n<@rolv.rem>接触した敵味方に継続ダメージを与える代わりに、攻撃力と攻撃速度を大幅に上昇させる<活性源石>が戦場に存在する。</>",
    description_en: "Enemies in front, enemies behind. Perhaps humans have fought long and hard, just to find a little piece of land free of Seaborn.\n<@rolv.rem><Active Originium> Operators deployed on it and enemies who have passed it will take constant damage, but their ATK and ASPD will be increased significantly</>",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: [
      "所有敌方单位的攻击力+10%，防御力+20%，生命值+30%",
      "出现3坐弩炮"
    ],
    eliteDesc_ja: [
      "敵全員の攻撃力+10%、防御力+20%、最大HP+30%",
      "バリスタが3体出現する"
    ],
    eliteDesc_en: [
      "All enemy units have +10% ATK, +20% DEF, and +30% Max HP",
      "3 <Ballista> appears on the battlefield"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          atk: 1.1,
          def: 1.2,
          hp: 1.3
        }
      }
    ],
    routes: [
      {
        title: "combat_ops",
        type: "video",
        youtube_src: "VgsD_utGOdA",
        bilibili_src: "aid=312882995&bvid=BV15P411U7k5&cid=1109067113&page=1"
      },
      {
        title: "emergency_ops",
        type: "video",
        youtube_src: "cKwZ9sHNH6E",
        bilibili_src: "aid=312882995&bvid=BV15P411U7k5&cid=1128634864&page=2"
      },
      {
        title: "doq",
        type: "img",
        src: "瞻前顾后_lvaqxi"
      },
      {
        title: "chest",
        type: "img",
        src: "瞻前顾后"
      }
    ],
    floors: [
      3
    ],
    sp_terrain: [
      {
        tileKey: "tile_infection",
        alias: null,
        blackboard: {
          duration: 600,
          damage: 50,
          atk: 0.5,
          attack_speed: 50
        }
      }
    ],
    sp_enemy: {
      normal: 25,
      elite: null,
      fixed: true
    },
    enemies: [
      {
        id: "enemy_1113_empace",
        level: 0,
        min_count: 5,
        max_count: 5,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1038_lunmag_2",
        level: 0,
        min_count: 2,
        max_count: 2,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1113_empace_2",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1000_gopro_3",
        level: 0,
        min_count: 12,
        max_count: 12,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1038_lunmag",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1049_eagent",
        level: 0,
        min_count: 3,
        max_count: 3,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2001_duckmi",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2034_sythef",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2035_sybox",
        level: 1,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      }
    ]
  },
  {
    id: "ro2_e_4_1",
    levelId: "level_rogue2_4-1",
    tags: [
      "rogue_mizuki"
    ],
    category: "combat_ops",
    characterLimit: 6,
    initialCost: 14,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "地下天途",
    name_ja: "地下の天路",
    name_en: "Underground_Ascension",
    description_zh: "一些海嗣已经初步进化出了飞行的能力，其子代虽无法翱翔蓝天，但也已经能够飞跃人类一生都无法跨过的沟壑。",
    description_ja: "一部のシーボーンは進化により僅かな飛行能力を獲得した。その子孫は、青空を自由に飛び回ることは叶わないものの、人間が一生かかっても超えられないような谷を飛び越えることができる。",
    description_en: "Some Seaborn have developed a rudimentary ability to fly. Though their progeny are unable to take to the blue skies, they have already leapt over chasms that humans cannot hope to cross in a lifetime.",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: [
      "所有敌方单位的攻击力+10%，生命值+30%",
      "所有掠海漂移体的生命值额外再提升20%"
    ],
    eliteDesc_ja: [
      "敵全員の攻撃力+10%、最大HP+30%",
      "<掠海漂移体>のHPがさらに20%上昇"
    ],
    eliteDesc_en: [
      "All enemy units have +10% ATK, and +30% Max HP",
      "<掠海漂移体> additionally gains HP +20%"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          atk: 1.1,
          hp: 1.3
        }
      },
      {
        targets: [
          "SY5"
        ],
        mods: {
          hp: 1.2
        }
      }
    ],
    routes: [
      {
        title: "combat_ops",
        type: "video",
        youtube_src: "h4QRvJyzUoo",
        bilibili_src: "aid=740424113&bvid=BV18k4y1J7dQ&cid=1108563153&page=1"
      },
      {
        title: "thf",
        type: "video",
        youtube_src: "-nYRAwuqMTY",
        bilibili_src: "aid=740424113&bvid=BV18k4y1J7dQ&cid=1108695095&page=2"
      },
      {
        title: "doq",
        type: "img",
        src: "地下天途_w59fop"
      },
      {
        title: "chest",
        type: "img",
        src: "地下天途"
      }
    ],
    floors: [
      4
    ],
    sp_terrain: [
      {
        tileKey: "tile_hole",
        alias: null,
        blackboard: null
      }
    ],
    sp_enemy: {
      normal: 38,
      elite: null,
      fixed: true
    },
    enemies: [
      {
        id: "enemy_2021_syfish",
        level: 0,
        min_count: 25,
        max_count: 25,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2022_syzeni",
        level: 0,
        min_count: 5,
        max_count: 5,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2025_syufo",
        level: 0,
        min_count: 7,
        max_count: 7,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2001_duckmi",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2034_sythef",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2035_sybox",
        level: 2,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      }
    ]
  },
  {
    id: "ro2_e_4_2",
    levelId: "level_rogue2_4-2",
    tags: [
      "rogue_mizuki"
    ],
    category: "combat_ops",
    characterLimit: 6,
    initialCost: 20,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "火之骄子",
    name_ja: "火の寵児",
    name_en: "Blaze_of_Glory",
    description_zh: "精神炙烤有时比肉体灼烧更加可怖，而塔拉人的领袖即是那焚人灵魂的不熄烈火。\n<@rolv.rem>场地内有间断对其上单位造成伤害的<热泵通道>。</>",
    description_ja: "精神をじりじりと炙られるのは、時に肉体を焼かれることよりも恐ろしい。そしてターラー人のリーダーとは、人の魂を焼く不滅の炎なのだ。\n<@rolv.rem>乗っている対象に周期的にダメージを与える<噴気口>が戦場に存在する。</>",
    description_en: "A mental roasting is sometimes more terrifying than getting burnt alive, and the leader of the Tara is an unquenchable fire that scorches one's soul. \n<@rolv.rem>This stage has <Heat Pump Passages> that periodically inflict damage to units standing on it.</>",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: [
      "所有敌方单位的攻击力，生命值+20%",
      "热泵通道造成的伤害上升至1200"
    ],
    eliteDesc_ja: [
      "敵全員の攻撃力、最大HP+20%",
      "<噴火口>が与えるダメージが1200に上昇"
    ],
    eliteDesc_en: [
      "All enemy units have +20% ATK, and +20% Max HP",
      "<Heated Path>'s damage increased to 1200"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          atk: 1.2,
          hp: 1.2
        }
      }
    ],
    routes: [
      {
        title: "combat_ops",
        type: "video",
        youtube_src: "4g3lviemPF8",
        bilibili_src: "aid=397906876&bvid=BV1uo4y187A8&cid=1108542232&page=1"
      },
      {
        title: "duck",
        type: "video",
        youtube_src: "x3YFFQYeSKs",
        bilibili_src: "aid=397906876&bvid=BV1uo4y187A8&cid=1108573719&page=2"
      },
      {
        title: "gpn",
        type: "video",
        youtube_src: "EHmd3OcFbTs",
        bilibili_src: "aid=397906876&bvid=BV1uo4y187A8&cid=1108573917&page=3"
      },
      {
        title: "thf",
        type: "video",
        youtube_src: "bi5bA22dAoc",
        bilibili_src: "aid=397906876&bvid=BV1uo4y187A8&cid=1108573615&page=4"
      },
      {
        title: "doq",
        type: "img",
        src: "火之骄子_yzk5mb"
      },
      {
        title: "chest",
        type: "img",
        src: "火之骄子"
      }
    ],
    floors: [
      4
    ],
    sp_terrain: [
      {
        tileKey: "tile_volcano",
        alias: null,
        blackboard: {
          damage: 800,
          cd_min: 12,
          cd_max: 15
        }
      }
    ],
    sp_enemy: {
      normal: 24,
      elite: null,
      fixed: true
    },
    enemies: [
      {
        id: "enemy_2001_duckmi",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2034_sythef",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1166_dusbr_2",
        level: 0,
        min_count: 6,
        max_count: 6,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1167_dubow_2",
        level: 0,
        min_count: 3,
        max_count: 3,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1174_duholy_2",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 3e4
        }
      },
      {
        id: "enemy_1175_dushdo_2",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1169_duphlx_2",
        level: 0,
        min_count: 12,
        max_count: 12,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2035_sybox",
        level: 2,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      }
    ]
  },
  {
    id: "ro2_e_4_3",
    levelId: "level_rogue2_4-3",
    tags: [
      "rogue_mizuki"
    ],
    category: "combat_ops",
    characterLimit: 6,
    initialCost: 20,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "领地意识",
    name_ja: "縄張り意識",
    name_en: "Territorial_Tendencies",
    description_zh: "这些性格暴躁的源石虫一生都在这里过活，对于它们而言，外来生物只有两种身份：食物，以及入侵者。\n<@rolv.rem>场地内有间断对其上单位造成伤害的<热泵通道>。</>",
    description_ja: "その凶暴な性格のオリジムシたちは生涯をここで過ごしている。奴らに言わせれば、外来生物には二種類しかない。餌か、侵入者か。\n<@rolv.rem>乗っている対象に周期的にダメージを与える<噴気口>が戦場に存在する。</>",
    description_en: "These irascible Originium slugs have lived here all their lives. To them, creatures from the outside fall into one of two camps: food, or intruders. \n<@rolv.rem>This stage has <Heat Pump Passages> that periodically inflict damage to units standing on it.</>",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: [
      "所有敌方单位的攻击力+20%，防御力+10%，生命值+50%",
      "庞贝的攻击半径扩大至200%，移动速度+75%"
    ],
    eliteDesc_ja: [
      "敵全員の攻撃力+20%、防御力+10%、最大HP+50%",
      "<Pompeii>の攻撃範囲+100%、移動速度+75%"
    ],
    eliteDesc_en: [
      "All enemy units have +20% ATK, +10% DEF, and +50% Max HP",
      "<Pompeii> has +100% Attack range, +75% Movement speed"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          atk: 1.2,
          def: 1.1,
          hp: 1.5
        }
      },
      {
        targets: [
          "UM1"
        ],
        mods: {
          range: 2,
          ms: 1.75
        }
      }
    ],
    routes: [
      {
        title: "combat_ops",
        type: "video",
        youtube_src: "WETlbYRLHd4",
        bilibili_src: "aid=442988709&bvid=BV19L411Y7aZ&cid=1108567640&page=1"
      },
      {
        title: "emergency_ops",
        type: "video",
        youtube_src: "y2selpaRtcI",
        bilibili_src: "aid=442988709&bvid=BV19L411Y7aZ&cid=1108692957&page=2"
      },
      {
        title: "duck",
        type: "video",
        youtube_src: "JJREH9EbNQ0",
        bilibili_src: "aid=442988709&bvid=BV19L411Y7aZ&cid=1108693110&page=3"
      },
      {
        title: "gpn",
        type: "video",
        youtube_src: "nAWkb1n9010",
        bilibili_src: "aid=442988709&bvid=BV19L411Y7aZ&cid=1108692994&page=4"
      },
      {
        title: "thf",
        type: "video",
        youtube_src: "4ePvsDDYxTQ",
        bilibili_src: "aid=442988709&bvid=BV19L411Y7aZ&cid=1108693315&page=5"
      },
      {
        title: "doq",
        type: "img",
        src: "领地意识_o9sleh"
      },
      {
        title: "chest",
        type: "img",
        src: "领地意识"
      }
    ],
    floors: [
      4
    ],
    sp_terrain: [
      {
        tileKey: "tile_volcano",
        alias: null,
        blackboard: {
          damage: 800,
          cd_min: 13,
          cd_max: 19
        }
      }
    ],
    sp_enemy: {
      normal: 42,
      elite: null,
      fixed: true
    },
    enemies: [
      {
        id: "enemy_2001_duckmi",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1021_bslime_2",
        level: 0,
        min_count: 9,
        max_count: 9,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 7500
        }
      },
      {
        id: "enemy_1021_bslime",
        level: 0,
        min_count: 15,
        max_count: 15,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 3500
        }
      },
      {
        id: "enemy_1004_mslime_2",
        level: 0,
        min_count: 8,
        max_count: 8,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 5e3
        }
      },
      {
        id: "enemy_1050_lslime",
        level: 1,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          lifepoint: 2
        }
      },
      {
        id: "enemy_1040_bombd_2",
        level: 0,
        min_count: 0,
        max_count: 2,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1040_bombd",
        level: 0,
        min_count: 4,
        max_count: 6,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2034_sythef",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2035_sybox",
        level: 2,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1095_ccripr_2",
        level: 0,
        min_count: 2,
        max_count: 2,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 8500
        }
      }
    ]
  },
  {
    id: "ro2_e_4_4",
    levelId: "level_rogue2_4-4",
    tags: [
      "rogue_mizuki"
    ],
    category: "combat_ops",
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "海窟沙暴",
    name_ja: "海窟の砂嵐",
    name_en: "Seacavern_Sandstorm",
    description_zh: "自然并未赋予沙暴在洞窟中形成的条件，但源石技艺可以做到这一点。\n<@rolv.rem>场地中有使我方单位防御力减半的<腐蚀地面>。</>",
    description_ja: "砂嵐は洞窟内で発生するように創られていないが、アーツならばそれが叶う。\n<@rolv.rem>戦場に配置したユニットの防御力が半分に低下する<腐食した地面>がある。</>",
    description_en: "Nature does not provide the conditions for sandstorms to form inside caves, but Originium Arts can accomplish that. \n<@rolv.rem>This stage has <Corrosive Ground> that halves the DEF of friendly units deployed on it.</>",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: [
      "所有敌方单位的攻击力，生命值+20%",
      "所有欺凌者与倾轧者的防御力+50% "
    ],
    eliteDesc_ja: [
      "敵全員の攻撃力、最大HP+20%",
      "<ロードローラー>と<凶悪ロードローラー>の防御力+50%"
    ],
    eliteDesc_en: [
      "All enemy units have +20% ATK, and +20% Max HP",
      "All <Bully> and <Bulldozer> have +50% DEF"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          atk: 1.2,
          hp: 1.2
        }
      },
      {
        targets: [
          "G17",
          "G18"
        ],
        mods: {
          def: 1.5
        }
      }
    ],
    routes: [
      {
        title: "combat_ops",
        type: "video",
        youtube_src: "Li8U668-FS0",
        bilibili_src: "aid=910411359&bvid=BV1zM4y1a7wF&cid=1108544394&page=1"
      },
      {
        title: "duck",
        type: "video",
        youtube_src: "qc_DVuUPupg",
        bilibili_src: "aid=910411359&bvid=BV1zM4y1a7wF&cid=1108623742&page=2"
      },
      {
        title: "gpn",
        type: "video",
        youtube_src: "z8JmHIxKmFY",
        bilibili_src: "aid=910411359&bvid=BV1zM4y1a7wF&cid=1108623884&page=3"
      },
      {
        title: "doq",
        type: "img",
        src: "海窟沙暴_rkyt69"
      },
      {
        title: "chest",
        type: "img",
        src: "海窟沙暴"
      }
    ],
    floors: [
      4
    ],
    sp_terrain: [
      {
        tileKey: "tile_defbreak",
        alias: null,
        blackboard: {
          def: 0.5
        }
      }
    ],
    sp_enemy: {
      normal: 35,
      elite: null,
      fixed: true
    },
    enemies: [
      {
        id: "enemy_2001_duckmi",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1058_traink",
        level: 0,
        min_count: 0,
        max_count: 5,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1058_traink_2",
        level: 0,
        min_count: 1,
        max_count: 6,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1509_mousek",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1060_emouse",
        level: 0,
        min_count: 0,
        max_count: 4,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1060_emouse_2",
        level: 0,
        min_count: 0,
        max_count: 2,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1059_buster_2",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1055_ganman",
        level: 0,
        min_count: 6,
        max_count: 6,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1055_ganman_2",
        level: 0,
        min_count: 2,
        max_count: 4,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1056_ganwar",
        level: 0,
        min_count: 12,
        max_count: 12,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1056_ganwar_2",
        level: 0,
        min_count: 2,
        max_count: 2,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2034_sythef",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2035_sybox",
        level: 2,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      }
    ]
  },
  {
    id: "ro2_e_4_5",
    levelId: "level_rogue2_4-5",
    tags: [
      "rogue_mizuki"
    ],
    category: "combat_ops",
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "溟痕乐园",
    name_ja: "溟痕の楽園",
    name_en: "Nethersea_Brand_Land",
    description_zh: "对于恐鱼来说，这里当然是乐园，若是可能，它们要将溟痕铺遍泰拉。\n<@rolv.rem>场地中遍布会造成伤害和神经损伤且不断试图扩散的<溟痕>，但好在还有<应急救治设施>和<活性源石>。</>",
    description_ja: "恐魚にとって、ここはもちろん楽園である。そして奴らは、できることならテラ全土に溟痕をばら撒きたいと願っている。\n<@rolv.rem>戦場に絶えず広がり続け、乗っている対象にダメージと神経損傷を与える<溟痕>が存在するが、<応急治療施設>と<活性源石>も存在する。</>",
    description_en: "For the Sea Terrors, this is of course a paradise. Were it possible, they would want the nethersea brand to spread across all of Terra. \n<@rolv.rem>This stage is filled with <Nethersea Brand> that continuously seeks to expand, inflicting damage and Nervous Impairment. Try to counteract it by making use of <Emergency Aid Buildings> and <Active Originium>.</>",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: [
      "所有敌方单位的生命值+20%",
      "所有富营养的收割者临战状态时每秒生命值流失量减半"
    ],
    eliteDesc_ja: [
      "敵全員の最大HP+20%",
      "<富栄養化したリーパー>のHP減少量が半分になる"
    ],
    eliteDesc_en: [
      "All enemy units have +20% Max HP",
      "<Nourished Reaper>'s HP loss amount halved"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          hp: 1.2
        }
      },
      {
        targets: [
          "enemy_1151_dslntc_2"
        ],
        mods: {
          special: {
            sea_reaper_awaken: {
              value: 0.2,
              tooltip: {
                en: [
                  "Standby→Does not attack, switches to Combat Ready mode when HP below 99.99%",
                  "Combat Ready→Movement Speed is increased by 500% and loses $2%$ max HP every second. Deals 20% of ATK as Nervous Impairment to all allied units in a 2.5 tile radius (ignores camouflage)."
                ],
                ja: [
                  "【待機状態】→攻撃しない、HPが99.99%未満になると【臨戦態勢】に移行",
                  "【臨戦態勢】→移動速度+500%、毎秒最大HPの$2%分$のダメージを受けて、",
                  "半径2.5マス以内の味方全員に、攻撃力の20%の神経ダメージを毎秒与える（迷彩無視）"
                ],
                zh: []
              }
            }
          }
        }
      }
    ],
    routes: [
      {
        title: "combat_ops",
        type: "video",
        youtube_src: "KDlSX-I0bTA",
        bilibili_src: "aid=655452869&bvid=BV1aa4y1V7gz&cid=1108566043&page=1"
      },
      {
        title: "duck",
        type: "video",
        youtube_src: "Slfmf62hoY4",
        bilibili_src: "aid=655452869&bvid=BV1aa4y1V7gz&cid=1128746623&page=2"
      },
      {
        title: "gpn",
        type: "video",
        youtube_src: "PIlutRQ-dBg",
        bilibili_src: "aid=655452869&bvid=BV1aa4y1V7gz&cid=1108685252&page=3"
      },
      {
        title: "thf",
        type: "video",
        youtube_src: "tyDeL1QXY-A",
        bilibili_src: "aid=655452869&bvid=BV1aa4y1V7gz&cid=1108685384&page=4"
      },
      {
        title: "doq",
        type: "img",
        src: "溟痕乐园_ddq9id"
      },
      {
        title: "chest",
        type: "img",
        src: "溟痕乐园"
      }
    ],
    floors: [
      4
    ],
    sp_terrain: [
      {
        tileKey: "tile_infection",
        alias: null,
        blackboard: {
          duration: 300,
          damage: 90,
          atk: 0.1,
          attack_speed: 60
        }
      },
      {
        tileKey: "tile_creep",
        alias: null,
        blackboard: null
      }
    ],
    sp_enemy: {
      normal: 29,
      elite: null,
      fixed: true
    },
    enemies: [
      {
        id: "enemy_2001_duckmi",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1152_dsurch",
        level: 0,
        min_count: 3,
        max_count: 3,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1147_dshond",
        level: 0,
        min_count: 10,
        max_count: 10,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1231_dsrunr",
        level: 0,
        min_count: 12,
        max_count: 12,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1151_dslntc_2",
        level: 0,
        min_count: 3,
        max_count: 3,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 3e4,
          atk: 400,
          aspd: 3
        }
      },
      {
        id: "enemy_2034_sythef",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2035_sybox",
        level: 2,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      }
    ]
  },
  {
    id: "ro2_e_4_6",
    levelId: "level_rogue2_4-6",
    tags: [
      "rogue_mizuki"
    ],
    category: "combat_ops",
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "狩猎场",
    name_ja: "狩猟場",
    name_en: "Hunting_Grounds",
    description_zh: "从情境上看，谁是猎物很明显。从结果上看，谁是猎人也很明显。",
    description_ja: "状況を見れば、誰が獲物かは明白だ。結果を見れば、誰がハンターであるかもまた明らかだ。",
    description_en: "Based on the situation, it was clear who the prey was. Based on the results, it was also very clear who the hunter was.",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: [
      "所有敌方单位的攻击力，防御力+20%，生命值+50%",
      "场地内部分位置无法部署"
    ],
    eliteDesc_ja: [
      "敵全員の攻撃力、防御力+20%、最大HP+50%",
      "6つのマスが配置不可に"
    ],
    eliteDesc_en: [
      "All enemy units have +20% ATK, +20% DEF, and +50% Max HP",
      "6 tiles forbid deployment"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          atk: 1.2,
          def: 1.2,
          hp: 1.5
        }
      }
    ],
    routes: [
      {
        title: "combat_ops",
        type: "video",
        youtube_src: "24FqgGPB9dM",
        bilibili_src: "aid=355405223&bvid=BV1RX4y1B7jj&cid=1108557313&page=1"
      },
      {
        title: "emergency_ops",
        type: "video",
        youtube_src: "t5RdiueO3x8",
        bilibili_src: "aid=355405223&bvid=BV1RX4y1B7jj&cid=1108649492&page=2"
      },
      {
        title: "gpn",
        type: "video",
        youtube_src: "jGYFsNHDw1M",
        bilibili_src: "aid=355405223&bvid=BV1RX4y1B7jj&cid=1108649696&page=3"
      },
      {
        title: "thf",
        type: "video",
        youtube_src: "bDrDpPbQX8U",
        bilibili_src: "aid=355405223&bvid=BV1RX4y1B7jj&cid=1108649766&page=4"
      },
      {
        title: "doq",
        type: "img",
        src: "狩猎场_hpqk5o"
      },
      {
        title: "chest",
        type: "img",
        src: "狩猎场"
      }
    ],
    floors: [
      4
    ],
    sp_terrain: null,
    sp_enemy: {
      normal: 43,
      elite: null,
      fixed: true
    },
    enemies: [
      {
        id: "enemy_2001_duckmi",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2034_sythef",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2023_sypult",
        level: 0,
        min_count: 4,
        max_count: 4,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2022_syzeni",
        level: 0,
        min_count: 8,
        max_count: 8,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2024_synut",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2021_syfish",
        level: 0,
        min_count: 25,
        max_count: 25,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2035_sybox",
        level: 2,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1076_bsthmr_2",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1045_hammer",
        level: 0,
        min_count: 4,
        max_count: 4,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      }
    ]
  },
  {
    id: "ro2_e_4_7",
    levelId: "level_rogue2_4-7",
    tags: [
      "rogue_mizuki"
    ],
    category: "combat_ops",
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "崇敬深海",
    name_ja: "深海を崇めよ",
    name_en: "The_Revered_Abyss",
    description_zh: "如果海嗣会和深海教徒和平相处，那它们确实也有与人类全体共存的可能性。\n<@rolv.rem>场地中有被摧毁时扣除目标生命的<指挥终端>和发射敌方佣兵无人机的<可移动战术机库>。</>",
    description_ja: "もしもシーボーンと深海教徒が平和にやっていけるのであれば、奴らが全人類と共存できる可能性も確かに存在するのだろう。\n<@rolv.rem>戦場に破壊されると耐久値が1減る<コマンドシステム>と、敵傭兵チームのドローンを射出する<可動式戦術格納庫>が存在する。</>",
    description_en: "If Seaborn are able to live in peace with the cultists, then it may indeed be possible for them to coexist with all of humanity. \n<@rolv.rem>This stage has <Command Terminals> that will deplete Life Point if destroyed, and <Mobile Tactical Hangars> that launch enemy mercenary drones.</>",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: [
      "所有敌方单位的攻击力，防御力+20%，生命值+50%",
      "场地内装置发生变化 "
    ],
    eliteDesc_ja: [
      "敵全員の攻撃力、防御力+20%、最大HP+50%",
      "装置の位置に変更"
    ],
    eliteDesc_en: [
      "All enemy units have +20% ATK, +20% DEF, and +50% Max HP",
      "Command Terminal's position changed"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          atk: 1.2,
          def: 1.2,
          hp: 1.5
        }
      }
    ],
    routes: [
      {
        title: "combat_ops",
        type: "video",
        youtube_src: "93csQRv3Vd0",
        bilibili_src: "aid=312905531&bvid=BV1nP411U7g9&cid=1108560761&page=1"
      },
      {
        title: "emergency_ops",
        type: "video",
        youtube_src: "DC4JzcGVckI",
        bilibili_src: "aid=312905531&bvid=BV1nP411U7g9&cid=1108668571&page=2"
      },
      {
        title: "duck",
        type: "video",
        youtube_src: "B2Ey8mPBhiM",
        bilibili_src: "aid=312905531&bvid=BV1nP411U7g9&cid=1108668638&page=3"
      },
      {
        title: "gpn",
        type: "video",
        youtube_src: "FLK5_J7H394",
        bilibili_src: "aid=312905531&bvid=BV1nP411U7g9&cid=1108668699&page=4"
      },
      {
        title: "thf",
        type: "video",
        youtube_src: "3mr7Loz8psQ",
        bilibili_src: "aid=312905531&bvid=BV1nP411U7g9&cid=1108669046&page=5"
      },
      {
        title: "doq",
        type: "img",
        src: "崇敬深海_ps5dfa"
      },
      {
        title: "chest",
        type: "img",
        src: "崇敬深海"
      }
    ],
    floors: [
      4
    ],
    sp_terrain: [
      {
        tileKey: "tile_hole",
        alias: null,
        blackboard: null
      }
    ],
    sp_enemy: {
      normal: 24,
      elite: null,
      fixed: true
    },
    enemies: [
      {
        id: "enemy_1140_merhd",
        level: 0,
        min_count: 5,
        max_count: 5,
        elite_min_count: 5,
        elite_max_count: 5,
        overwrittenData: null
      },
      {
        id: "enemy_1141_merbow_2",
        level: 0,
        min_count: 4,
        max_count: 4,
        elite_min_count: 4,
        elite_max_count: 4,
        overwrittenData: null
      },
      {
        id: "enemy_1145_atkspd_2",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2021_syfish",
        level: 0,
        min_count: 9,
        max_count: 9,
        elite_min_count: 9,
        elite_max_count: 9,
        overwrittenData: null
      },
      {
        id: "enemy_2025_syufo",
        level: 0,
        min_count: 5,
        max_count: 5,
        elite_min_count: 5,
        elite_max_count: 5,
        overwrittenData: null
      },
      {
        id: "enemy_2001_duckmi",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2034_sythef",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2035_sybox",
        level: 2,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      }
    ]
  },
  {
    id: "ro2_e_4_8",
    levelId: "level_rogue2_4-8",
    tags: [
      "rogue_mizuki"
    ],
    category: "combat_ops",
    characterLimit: 6,
    initialCost: 8,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "铳与秩序",
    name_ja: "銃と秩序",
    name_en: "Guns_and_Order",
    description_zh: "古老准则不适用时，必然会催生出新的秩序。枪铳与蚀刻弹药，则能暂时保证秩序的稳定性。\n<@rolv.rem>场地内有夺取后回复周围友方单位技力的<“冰淇淋机”>。</>",
    description_ja: "古いやり方が通用しなくなった時、必然と新たな秩序が誕生する。銃火器やエッチング弾薬は、一時的ではあるがこの秩序の安定性を保ててくれるはずだ。\n<@rolv.rem>奪取後に周囲の味方ユニットのSPを回復する<ジェラート供給所>が戦場に存在する。</>",
    description_en: "New order is born when the old ways no longer work. Guns and etched ammo temporarily ensure the security of order.\n<@rolv.rem>There are <'Gelato Stops'> on the battlefield, which restore allied SP when captured.</>",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: [
      "所有敌方单位的攻击力，生命值+20%",
      "出现额外的“与我无关”",
      "<“冰淇淋机”> 初始被敌方占领"
    ],
    eliteDesc_ja: [
      "敵全員の攻撃力、最大HP+20%",
      "追加で<“与我无关”>1体が出現する",
      "<ジェラート供給所>は敵制御状態で開始"
    ],
    eliteDesc_en: [
      "All enemy units have +20% ATK, and +20% Max HP",
      "Additional 1 <“与我无关”> appears",
      "<'Gelato Stop'> begins under enemy control"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          atk: 1.2,
          def: 1,
          hp: 1.2
        }
      }
    ],
    routes: [
      {
        title: "combat_ops",
        type: "video",
        youtube_src: "0hgBPqwgSGc",
        bilibili_src: "aid=270465398&bvid=BV1mc411J7ui&cid=1108567449&page=1"
      },
      {
        title: "emergency_ops",
        type: "video",
        youtube_src: "ZwldaltTWe8",
        bilibili_src: "aid=270465398&bvid=BV1mc411J7ui&cid=1108691200&page=2"
      },
      {
        title: "thf",
        type: "video",
        youtube_src: "LlYBE5dlLHg",
        bilibili_src: "aid=270465398&bvid=BV1mc411J7ui&cid=1108691343&page=3"
      },
      {
        title: "doq",
        type: "img",
        src: "铳与秩序_gpmvri"
      },
      {
        title: "chest",
        type: "img",
        src: "铳与秩序"
      }
    ],
    floors: [
      4
    ],
    sp_terrain: null,
    sp_enemy: {
      normal: 31,
      elite: 32,
      fixed: true
    },
    enemies: [
      {
        id: "enemy_2001_duckmi",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2034_sythef",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2035_sybox",
        level: 2,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1284_sgprst",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: 1,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_1285_sgwlf",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: 1,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_1216_cansld",
        level: 0,
        min_count: 5,
        max_count: 5,
        elite_min_count: 5,
        elite_max_count: 5,
        overwrittenData: null
      },
      {
        id: "enemy_1212_mtrfol",
        level: 0,
        min_count: 18,
        max_count: 18,
        elite_min_count: 18,
        elite_max_count: 18,
        overwrittenData: null
      },
      {
        id: "enemy_1215_ptrarc",
        level: 0,
        min_count: 6,
        max_count: 6,
        elite_min_count: 6,
        elite_max_count: 6,
        overwrittenData: null
      }
    ]
  },
  {
    id: "ro2_e_5_1",
    levelId: "level_rogue2_5-1",
    tags: [
      "rogue_mizuki"
    ],
    category: "combat_ops",
    characterLimit: 6,
    initialCost: 14,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "机械之灾",
    name_ja: "機械の災い",
    name_en: "Mechanical_Menace",
    description_zh: "为了阻止恐鱼泛滥，人类为无人机群设计了一整套生物灭绝级别的攻击性指令。这确实能暂时有效清理恐鱼，可一旦失控......",
    description_ja: "恐魚の氾濫を阻止するため、人類はドローンに生物を絶滅させるほどの強い攻撃性を持つ指令を組み込んだ。それは確かに一時的には恐魚の殲滅に役立ったが、一度制御を失えば……",
    description_en: "In order to avoid being overrun by Sea Terrors, humanity has devised a set of mass extinction-level annihilation protocols for a swarm of unmanned drones. While this can indeed temporarily hold back the Sea Terrors, if it ever goes out of control...",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: [
      "所有敌方单位的攻击力，生命值+25%",
      "部分帝国炮火先兆者被替换为帝国炮火中枢先兆者"
    ],
    eliteDesc_ja: [
      "敵全員の攻撃力、最大HP+25%",
      "一部の帝国砲撃誘導機が帝国砲撃指揮機に替わる"
    ],
    eliteDesc_en: [
      "All enemy units have +25% ATK, and +25% Max HP",
      "A portion of Imperial Artillery Targeteer is replaced by Imperial Artillery Core Targeteer"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          atk: 1.25,
          hp: 1.25
        }
      }
    ],
    routes: [
      {
        title: "combat_ops",
        type: "video",
        youtube_src: "kKr2jIZvxGY",
        bilibili_src: "aid=270412260&bvid=BV1rc411J7wi&cid=1108544599&page=1"
      },
      {
        title: "combat_ops",
        type: "video",
        youtube_src: "uGIsN9yTWR0",
        bilibili_src: "aid=270412260&bvid=BV1rc411J7wi&cid=1108628822&page=2"
      },
      {
        title: "duck",
        type: "video",
        youtube_src: "zrGzkfXHoYA",
        bilibili_src: "aid=270412260&bvid=BV1rc411J7wi&cid=1108628099&page=3"
      },
      {
        title: "gpn",
        type: "video",
        youtube_src: "7LcgxdqHI2s",
        bilibili_src: "aid=270412260&bvid=BV1rc411J7wi&cid=1108629242&page=4"
      },
      {
        title: "thf",
        type: "video",
        youtube_src: "RYLq6CHp4us",
        bilibili_src: "aid=270412260&bvid=BV1rc411J7wi&cid=1108629360&page=5"
      },
      {
        title: "chest",
        type: "img",
        src: "机械之灾"
      }
    ],
    floors: [
      5
    ],
    sp_terrain: [
      {
        tileKey: "tile_hole",
        alias: null,
        blackboard: null
      }
    ],
    sp_enemy: {
      normal: 44,
      elite: null,
      fixed: true
    },
    enemies: [
      {
        id: "enemy_1042_frostd",
        level: 0,
        min_count: 4,
        max_count: 4,
        elite_min_count: 4,
        elite_max_count: 4,
        overwrittenData: null
      },
      {
        id: "enemy_1041_lazerd_2",
        level: 0,
        min_count: 3,
        max_count: 3,
        elite_min_count: 3,
        elite_max_count: 3,
        overwrittenData: {
          atk: 400
        }
      },
      {
        id: "enemy_1005_yokai_2",
        level: 0,
        min_count: 6,
        max_count: 6,
        elite_min_count: 6,
        elite_max_count: 6,
        overwrittenData: null
      },
      {
        id: "enemy_1112_emppnt",
        level: 0,
        min_count: 3,
        max_count: 3,
        elite_min_count: 2,
        elite_max_count: 2,
        overwrittenData: null
      },
      {
        id: "enemy_1112_emppnt_2",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: 1,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_1019_jshoot_2",
        level: 0,
        min_count: 2,
        max_count: 2,
        elite_min_count: 2,
        elite_max_count: 2,
        overwrittenData: null
      },
      {
        id: "enemy_1023_jmage_2",
        level: 0,
        min_count: 2,
        max_count: 2,
        elite_min_count: 2,
        elite_max_count: 2,
        overwrittenData: null
      },
      {
        id: "enemy_1009_lurker",
        level: 0,
        min_count: 12,
        max_count: 12,
        elite_min_count: 12,
        elite_max_count: 12,
        overwrittenData: null
      },
      {
        id: "enemy_1031_mrogue",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: 1,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_1031_mrogue_2",
        level: 0,
        min_count: 2,
        max_count: 2,
        elite_min_count: 2,
        elite_max_count: 2,
        overwrittenData: null
      },
      {
        id: "enemy_1040_bombd_2",
        level: 0,
        min_count: 8,
        max_count: 8,
        elite_min_count: 8,
        elite_max_count: 8,
        overwrittenData: null
      },
      {
        id: "enemy_2034_sythef",
        level: 2,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2001_duckmi",
        level: 2,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 2,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2035_sybox",
        level: 2,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      }
    ]
  },
  {
    id: "ro2_e_5_2",
    levelId: "level_rogue2_5-2",
    tags: [
      "rogue_mizuki"
    ],
    category: "combat_ops",
    characterLimit: 6,
    initialCost: 20,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "教徒居所",
    name_ja: "教徒の住処",
    name_en: "The_Faithful's_Utopia",
    description_zh: "当恐鱼在大地上捕食人类时，一些人类则在海洋深处崇敬并保护着恐鱼。这确实反映了人类这一种族的特质——无论你将之称为劣根性还是多样性。\n<@rolv.rem>场地中有发射敌方佣兵无人机的<可移动战术机库>。</>",
    description_ja: "恐魚が大地に生きる人間を捕食する中、海の底で恐魚を崇め、保護する人間もいる。これは人類という種族の特質を如実に反映していると言えよう――それを曲がった根性と呼ぶか、多様性と呼ぶかはもはやどうでもいい。\n<@rolv.rem>戦場に敵傭兵チームのドローンを射出する<可動式戦術格納庫>が存在する。</>",
    description_en: "While the Sea Terrors prey upon humans on land, some humans worship and protect them in the ocean's depths. It certainly reflects one aspect of the human race—whether you choose to call it diversity or inferiority is up to you. \n<@rolv.rem>This stage has <Mobile Tactical Hangars> that launch enemy mercenary drones.</>",
    addInfo_zh: [
      "中盘出现的妖怪有两种路线"
    ],
    addInfo_ja: [
      "中盤に出現する<怪鳥>ドローンのルート2種類あります"
    ],
    addInfo_en: [
      "<Monster> drone that spawns halfway the battle has 2 routes"
    ],
    eliteDesc_zh: [
      "所有敌方单位的攻击力，防御力+20%，生命值+40%",
      "战术防御者组长替换为传奇战争幽灵"
    ],
    eliteDesc_ja: [
      "敵全員の攻撃力、防御力+20%、最大HP+40%",
      "<戦術重装隊長>が<伝説のウォーゴースト>に替わる"
    ],
    eliteDesc_en: [
      "All enemy units have +20% ATK, +20% DEF, and +40% Max HP",
      "All <Tactical Defender Leader> are replaced by <Legendary War Phantom>"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          atk: 1.2,
          def: 1.2,
          hp: 1.4
        }
      }
    ],
    routes: [
      {
        title: "combat_ops",
        type: "video",
        youtube_src: "k2fkZnC5E7c",
        bilibili_src: "aid=952914682&bvid=BV1ns4y1c7cL&cid=1128744371&page=2"
      },
      {
        title: "emergency_ops",
        type: "video",
        youtube_src: "ETUY802OFBc",
        bilibili_src: "aid=952914682&bvid=BV1ns4y1c7cL&cid=1108633011&page=3"
      },
      {
        title: "duck",
        type: "video",
        youtube_src: "Om61XV24-LI",
        bilibili_src: "aid=952914682&bvid=BV1ns4y1c7cL&cid=1108633161&page=4"
      },
      {
        title: "gpn",
        type: "video",
        youtube_src: "Ug61a1WdHkg",
        bilibili_src: "aid=952914682&bvid=BV1ns4y1c7cL&cid=1108633265&page=5"
      },
      {
        title: "thf",
        type: "video",
        youtube_src: "Fo04gxFzdBM",
        bilibili_src: "aid=952914682&bvid=BV1ns4y1c7cL&cid=1108633547&page=6"
      },
      {
        title: "chest",
        type: "img",
        src: "教徒居所"
      }
    ],
    floors: [
      5
    ],
    sp_terrain: null,
    sp_enemy: {
      normal: 33,
      elite: null,
      fixed: true
    },
    enemies: [
      {
        id: "enemy_2001_duckmi",
        level: 2,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 2,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2034_sythef",
        level: 2,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2025_syufo",
        level: 0,
        min_count: 3,
        max_count: 3,
        elite_min_count: 3,
        elite_max_count: 3,
        overwrittenData: null
      },
      {
        id: "enemy_1140_merhd_2",
        level: 0,
        min_count: 10,
        max_count: 10,
        elite_min_count: 10,
        elite_max_count: 10,
        overwrittenData: null
      },
      {
        id: "enemy_1141_merbow_2",
        level: 0,
        min_count: 7,
        max_count: 7,
        elite_min_count: 7,
        elite_max_count: 7,
        overwrittenData: null
      },
      {
        id: "enemy_1142_mershd_2",
        level: 0,
        min_count: 2,
        max_count: 2,
        elite_min_count: 2,
        elite_max_count: 2,
        overwrittenData: null
      },
      {
        id: "enemy_1145_atkspd_2",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1146_defspd_2",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1171_durokt_2",
        level: 0,
        min_count: 9,
        max_count: 9,
        elite_min_count: 9,
        elite_max_count: 9,
        overwrittenData: null
      },
      {
        id: "enemy_1144_merlgd_2",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2035_sybox",
        level: 2,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1005_yokai",
        level: 1,
        min_count: 1,
        max_count: 1,
        elite_min_count: 1,
        elite_max_count: 1,
        overwrittenData: {
          hp: 6e3
        }
      }
    ]
  },
  {
    id: "ro2_e_5_3",
    levelId: "level_rogue2_5-3",
    tags: [
      "rogue_mizuki"
    ],
    category: "combat_ops",
    characterLimit: 6,
    initialCost: 18,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "失控",
    name_ja: "制御不能",
    name_en: "Out_of_Control",
    description_zh: "矿石病末期的深海教徒将源石所能造成的威胁完全展现给了大群。大群终会适应，只是仍需时间。",
    description_ja: "鉱石病末期の深海教徒が、源石が生み出す脅威の全貌を大群の目の前にさらけ出した。大群がそれに適応するのも、もはや時間の問題だろう。",
    description_en: "The Church of the Deep cultists afflicted by late-stage Oripathy demonstrated clearly to we many the threat that Originium could pose. But, we many will eventually adapt. It's only a matter of time.",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: [
      "所有敌方单位的攻击力，防御力+20%，生命值，移动速度+50%,攻击速度+30%"
    ],
    eliteDesc_ja: [
      "敵全員の攻撃力、防御力+20%、最大HP、移動速度+50%、攻撃速度+30%"
    ],
    eliteDesc_en: [
      "All enemy units have +20% ATK, +20% DEF, +50% Max HP, +50% Movement speed, and +30% ASPD"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          atk: 1.2,
          def: 1.2,
          hp: 1.5,
          aspd: 1.3,
          ms: 1.5
        }
      }
    ],
    routes: [
      {
        title: "emergency_ops",
        type: "video",
        youtube_src: "x1Ou5HYNkbM",
        bilibili_src: "aid=867974946&bvid=BV1zV4y1R7rx&cid=1108552446&page=1"
      },
      {
        title: "duck",
        type: "video",
        youtube_src: "H99jmEJCnck",
        bilibili_src: "aid=867974946&bvid=BV1zV4y1R7rx&cid=1108643038&page=2"
      },
      {
        title: "gpn",
        type: "video",
        youtube_src: "r1E5dwRrXrw",
        bilibili_src: "aid=867974946&bvid=BV1zV4y1R7rx&cid=1108643258&page=3"
      },
      {
        title: "thf",
        type: "video",
        youtube_src: "B03ewnDLsJ0",
        bilibili_src: "aid=867974946&bvid=BV1zV4y1R7rx&cid=1108643419&page=4"
      },
      {
        title: "chest",
        type: "img",
        src: "失控"
      }
    ],
    floors: [
      5
    ],
    sp_terrain: null,
    sp_enemy: {
      normal: 53,
      elite: null,
      fixed: false
    },
    enemies: [
      {
        id: "enemy_1062_rager_2",
        level: 0,
        min_count: 6,
        max_count: 7,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1063_rageth_2",
        level: 0,
        min_count: 8,
        max_count: 8,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1065_snwolf",
        level: 0,
        min_count: 8,
        max_count: 8,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1064_snsbr",
        level: 0,
        min_count: 23,
        max_count: 23,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1067_snslime",
        level: 0,
        min_count: 6,
        max_count: 6,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 2,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2001_duckmi",
        level: 2,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2034_sythef",
        level: 2,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2035_sybox",
        level: 2,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      }
    ]
  },
  {
    id: "ro2_e_5_4",
    levelId: "level_rogue2_5-4",
    tags: [
      "rogue_mizuki"
    ],
    category: "combat_ops",
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "吹笛人的号召",
    name_ja: "笛吹きの号令",
    name_en: "The_Piper's_Call",
    description_zh: "海嗣不需要进化出鉴赏和演奏音乐的能力，但部分个体确实希望知道人类为何会对音乐着迷。",
    description_ja: "シーボーンの進化の過程では、音楽を鑑賞したり演奏する能力は必要とされない。しかし一部の個体は、なぜ人間が音楽の虜になるのかを知りたがっている。",
    description_en: "The Seaborn do not need to evolve the ability to play and appreciate music, but certain individuals do wish to know why humans are so fascinated by it.",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: [
      "所有敌方单位的攻击力，防御力+20%，生命值+40%",
      "沸血骑士团学徒被替换为沸血骑士团精锐"
    ],
    eliteDesc_ja: [
      "敵全員の攻撃力、防御力+20%、最大HP+40%",
      "<ブラッドボイル見習い騎士>が<ブラッドボイル精鋭騎士>に替わる"
    ],
    eliteDesc_en: [
      "All enemy units have +20% ATK, +20% DEF, and +40% Max HP",
      "All <Bloodboil Knightclub Trainee> are replaced by <Bloodboil Knightclub Elite>"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          atk: 1.2,
          def: 1.2,
          hp: 1.4
        }
      }
    ],
    routes: [
      {
        title: "combat_ops",
        type: "video",
        youtube_src: "GLLFIlNvbSM",
        bilibili_src: "aid=312947475&bvid=BV1vP411U7bj&cid=1108559609&page=1"
      },
      {
        title: "gpn",
        type: "video",
        youtube_src: "_RrcfLHchYs",
        bilibili_src: "aid=312947475&bvid=BV1vP411U7bj&cid=1108658986&page=2"
      },
      {
        title: "chest",
        type: "img",
        src: "吹笛人的号召"
      }
    ],
    floors: [
      5
    ],
    sp_terrain: [
      {
        tileKey: "tile_hole",
        alias: null,
        blackboard: null
      }
    ],
    sp_enemy: {
      normal: 25,
      elite: null,
      fixed: true
    },
    enemies: [
      {
        id: "enemy_2023_sypult",
        level: 0,
        min_count: 4,
        max_count: 4,
        elite_min_count: 4,
        elite_max_count: 4,
        overwrittenData: null
      },
      {
        id: "enemy_2024_synut",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1103_wdkght",
        level: 0,
        min_count: 17,
        max_count: 17,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1103_wdkght_2",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: 18,
        elite_max_count: 18,
        overwrittenData: null
      },
      {
        id: "enemy_1243_ltswar",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: 1,
        elite_max_count: 1,
        overwrittenData: {
          talentBlackboard: [
            {
              key: "sarks_performance",
              cooldown: 10,
              initCooldown: 10
            }
          ]
        }
      },
      {
        id: "enemy_1243_ltswar_2",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: 1,
        elite_max_count: 1,
        overwrittenData: {
          talentBlackboard: [
            {
              key: "sarks_performance",
              cooldown: 10,
              initCooldown: 10
            }
          ]
        }
      },
      {
        id: "enemy_2001_duckmi",
        level: 2,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 2,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2034_sythef",
        level: 2,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2035_sybox",
        level: 2,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      }
    ]
  },
  {
    id: "ro2_e_5_5",
    levelId: "level_rogue2_5-5",
    tags: [
      "rogue_mizuki"
    ],
    category: "combat_ops",
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "好梦在何方",
    name_ja: "良き夢は何処に",
    name_en: "Ubi_bona_somnia",
    description_zh: "海嗣会做梦吗？它们梦里有什么？这些我们还不得而知，我们只知道，它们休眠时不喜欢被打扰。\n<@rolv.rem>场地中有可以阻挡敌人行进路线的<碎石>。</>",
    description_ja: "シーボーンは夢を見るか？見るとすればどんな夢か？それはまだわからないが、一つはっきりしていることがある。奴らは眠りを妨げられるのを嫌うということだ。\n<@rolv.rem>戦場に敵の進攻ルートを遮ることができる<礫岩>が設置されている。</>",
    description_en: "Do Seaborn dream? And what do they dream of? We don't have answers to those questions, but we do know that they don't like being disturbed when they're resting. \n<@rolv.rem>This stage has <Rubble> that can block the enemy's path.</>",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: [
      "所有敌方单位的生命值，移动速度+20%",
      "战场上右上方追加出现1个源石畸变体α"
    ],
    eliteDesc_ja: [
      "敵全員の最大HP、移動速度+20%",
      "戦場の右上に追加で１体オリジニュータントαが出現する"
    ],
    eliteDesc_en: [
      "All enemy units have +20% Max HP, and +20% Movement speed",
      "Additional 1 Originiutant α appears on top right of battlefield"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          hp: 1.2,
          ms: 1.2
        }
      }
    ],
    routes: [
      {
        title: "combat_ops",
        type: "video",
        youtube_src: "vb8TL2GeQHc",
        bilibili_src: "aid=697954582&bvid=BV1Rm4y1y7JJ&cid=1108551804&page=1"
      },
      {
        title: "combat_ops",
        type: "video",
        youtube_src: "ILv7iHWftLk",
        bilibili_src: "aid=697954582&bvid=BV1Rm4y1y7JJ&cid=1108641054&page=2"
      },
      {
        title: "emergency_ops",
        type: "video",
        youtube_src: "rV3QhXJM8qk",
        bilibili_src: "aid=697954582&bvid=BV1Rm4y1y7JJ&cid=1108641732&page=3"
      },
      {
        title: "duck",
        type: "video",
        youtube_src: "HG_jt8dfg2w",
        bilibili_src: "aid=697954582&bvid=BV1Rm4y1y7JJ&cid=1108642324&page=4"
      },
      {
        title: "gpn",
        type: "video",
        youtube_src: "e2JOqB1x8kQ",
        bilibili_src: "aid=697954582&bvid=BV1Rm4y1y7JJ&cid=1108642267&page=5"
      },
      {
        title: "chest",
        type: "img",
        src: "好梦在何方"
      }
    ],
    floors: [
      5
    ],
    sp_terrain: null,
    sp_enemy: {
      normal: 44,
      elite: 45,
      fixed: true
    },
    enemies: [
      {
        id: "enemy_2001_duckmi",
        level: 2,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 2,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2034_sythef",
        level: 2,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_1134_diamd_2",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: 2,
        elite_max_count: 2,
        overwrittenData: null
      },
      {
        id: "enemy_1234_dsubrl_2",
        level: 0,
        min_count: 0,
        max_count: 2,
        elite_min_count: 0,
        elite_max_count: 2,
        overwrittenData: null
      },
      {
        id: "enemy_1151_dslntc_2",
        level: 0,
        min_count: 8,
        max_count: 10,
        elite_min_count: 8,
        elite_max_count: 10,
        overwrittenData: null
      },
      {
        id: "enemy_1147_dshond_2",
        level: 0,
        min_count: 24,
        max_count: 24,
        elite_min_count: 24,
        elite_max_count: 24,
        overwrittenData: null
      },
      {
        id: "enemy_1150_dsjely_2",
        level: 0,
        min_count: 4,
        max_count: 4,
        elite_min_count: 4,
        elite_max_count: 4,
        overwrittenData: null
      },
      {
        id: "enemy_1153_dsexcu_2",
        level: 0,
        min_count: 4,
        max_count: 4,
        elite_min_count: 4,
        elite_max_count: 4,
        overwrittenData: null
      },
      {
        id: "enemy_2035_sybox",
        level: 2,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      }
    ]
  },
  {
    id: "ro2_e_5_6",
    levelId: "level_rogue2_5-6",
    tags: [
      "rogue_mizuki"
    ],
    category: "combat_ops",
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "育生池",
    name_ja: "育生池",
    name_en: "Pool_of_Procreation",
    description_zh: "进化是一个循序渐进的过程，当一只海嗣不断适应并去除自己本身的缺憾后，它会变得如海神一般完美。",
    description_ja: "進化とは順を追って一歩一歩進めていく過程である。一匹のシーボーンが絶えず適応を繰り返し、自らの欠点を取り除いた時、それは海神のように完璧な存在へと変わるだろう。",
    description_en: "Evolution is a gradual process. When a Seaborn continuously adapts and removes its own shortcomings, it will eventually become as perfect as a Leviathan.",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: [
      "所有敌方单位的攻击力，防御力，生命值+30%",
      "出现更多的掠海漂移体"
    ],
    eliteDesc_ja: [
      "敵全員の攻撃力、防御力、最大HP+30%",
      "<掠海のフローター>がさらに4体出現する"
    ],
    eliteDesc_en: [
      "All enemy units have +30% ATK, +30% DEF, and +30% Max HP",
      "Additional 4 <Skimming Sea Drifter> appear"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          atk: 1.3,
          def: 1.3,
          hp: 1.3
        }
      }
    ],
    routes: [
      {
        title: "combat_ops",
        type: "video",
        youtube_src: "d1QaaPtvXdQ",
        bilibili_src: "aid=312901607&bvid=BV1uP411U7gb&cid=1108543600&page=1"
      },
      {
        title: "emergency_ops",
        type: "video",
        youtube_src: "RyC-irkciio",
        bilibili_src: "aid=312901607&bvid=BV1uP411U7gb&cid=1108577770&page=2"
      },
      {
        title: "duck",
        type: "video",
        youtube_src: "L3vzh-eoh1o",
        bilibili_src: "aid=312901607&bvid=BV1uP411U7gb&cid=1108577799&page=3"
      },
      {
        title: "thf",
        type: "video",
        youtube_src: "GsmCJ3vQKnE",
        bilibili_src: "aid=312901607&bvid=BV1uP411U7gb&cid=1108578224&page=4"
      },
      {
        title: "chest",
        type: "img",
        src: "育生池"
      }
    ],
    floors: [
      5
    ],
    sp_terrain: [
      {
        tileKey: "tile_hole",
        alias: null,
        blackboard: null
      }
    ],
    sp_enemy: {
      normal: 50,
      elite: 54,
      fixed: true
    },
    enemies: [
      {
        id: "enemy_1147_dshond_2",
        level: 0,
        min_count: 24,
        max_count: 24,
        elite_min_count: 24,
        elite_max_count: 24,
        overwrittenData: null
      },
      {
        id: "enemy_2023_sypult",
        level: 0,
        min_count: 7,
        max_count: 7,
        elite_min_count: 7,
        elite_max_count: 7,
        overwrittenData: null
      },
      {
        id: "enemy_2024_synut",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2025_syufo",
        level: 0,
        min_count: 6,
        max_count: 6,
        elite_min_count: 10,
        elite_max_count: 10,
        overwrittenData: null
      },
      {
        id: "enemy_2001_duckmi",
        level: 2,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 2,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2034_sythef",
        level: 2,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2022_syzeni",
        level: 0,
        min_count: 12,
        max_count: 12,
        elite_min_count: 12,
        elite_max_count: 12,
        overwrittenData: null
      },
      {
        id: "enemy_2035_sybox",
        level: 2,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      }
    ]
  },
  {
    id: "ro2_e_5_7",
    levelId: "level_rogue2_5-7",
    tags: [
      "rogue_mizuki"
    ],
    category: "combat_ops",
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "蔓延",
    name_ja: "蔓延",
    name_en: "The_Spread",
    description_zh: "生存是海嗣永恒的母题，因此无论在其他种群眼中它们显示出了怎样的侵略与扩张能力，于它们而言，其行为本身，仍是为了存活。\n<@rolv.rem>场地中有会造成伤害和神经损伤且不断试图扩散的<溟痕>。</>",
    description_ja: "生存とはシーボーンにとって永遠のテーマである。ゆえに他種族から見たシーボーンたちがどれほどの侵略的で勢力拡大に長けていたとしても、シーボンにとってはただの生存のための行為でしかないのだ。\n<@rolv.rem>戦場に絶えず広がり続け、乗っている対象にダメージと神経損傷を与える<溟痕>が存在する。</>",
    description_en: "Survival is the Seaborn's raison d'etre; therefore, no matter how aggressive and expansionary they may seem in the eyes of other species, to them, these behaviors will always be nothing more than survival. \n<@rolv.rem>This stage has <Nethersea Brand> that continuously seeks to expand, inflicting damage and Nervous Impairment.</>",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: [
      "所有敌方单位的攻击力+30%，防御力+20%，生命值+30%",
      "战斗开始后在场地左上角/右侧中间和中央共2处位置同时出现富营养的引痕者，且其生命值额外再提升50%"
    ],
    eliteDesc_ja: [
      "敵全員の攻撃力+30%、防御力+20%、最大HP+30%",
      "追加で1体<富栄養化したスプレッダー>が出現し、かつ最大HPがさらに50%上昇"
    ],
    eliteDesc_en: [
      "All enemy units have +30% ATK, +20% DEF, and +30% Max HP",
      "Additional 1 <Nourished Brandguider> appears, and all <Nourished Brandguider> additionally gain +50% Max HP"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          atk: 1.3,
          def: 1.2,
          hp: 1.3
        }
      },
      {
        targets: [
          "SM22"
        ],
        mods: {
          hp: 1.5
        }
      }
    ],
    routes: [
      {
        title: "combat_ops",
        type: "video",
        youtube_src: "A5kG-QlFOh4",
        bilibili_src: "aid=570454865&bvid=BV1mz4y1a7J1&cid=1108564860&page=1"
      },
      {
        title: "combat_ops",
        type: "video",
        youtube_src: "Icro05cGdng",
        bilibili_src: "aid=570454865&bvid=BV1mz4y1a7J1&cid=1108687022&page=2"
      },
      {
        title: "emergency_ops",
        type: "video",
        youtube_src: "czMXLCbp17E",
        bilibili_src: "aid=570454865&bvid=BV1mz4y1a7J1&cid=1108687668&page=3"
      },
      {
        title: "duck",
        type: "video",
        youtube_src: "6Vuh4C7qcTk",
        bilibili_src: "aid=570454865&bvid=BV1mz4y1a7J1&cid=1108687966&page=4"
      },
      {
        title: "gpn",
        type: "video",
        youtube_src: "J_AQBPRc_4o",
        bilibili_src: "aid=570454865&bvid=BV1mz4y1a7J1&cid=1108688077&page=5"
      },
      {
        title: "chest",
        type: "img",
        src: "蔓延"
      }
    ],
    floors: [
      5
    ],
    sp_terrain: [
      {
        tileKey: "tile_creep",
        alias: null,
        blackboard: null
      }
    ],
    sp_enemy: {
      normal: 47,
      elite: 48,
      fixed: true
    },
    enemies: [
      {
        id: "enemy_1232_dssalr_2",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: 2,
        elite_max_count: 2,
        overwrittenData: null
      },
      {
        id: "enemy_1233_dsshtr_2",
        level: 0,
        min_count: 4,
        max_count: 4,
        elite_min_count: 4,
        elite_max_count: 4,
        overwrittenData: null
      },
      {
        id: "enemy_1231_dsrunr",
        level: 0,
        min_count: 6,
        max_count: 6,
        elite_min_count: 6,
        elite_max_count: 6,
        overwrittenData: null
      },
      {
        id: "enemy_1147_dshond",
        level: 0,
        min_count: 35,
        max_count: 35,
        elite_min_count: 35,
        elite_max_count: 35,
        overwrittenData: null
      },
      {
        id: "enemy_2034_sythef",
        level: 2,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2001_duckmi",
        level: 2,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 2,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2035_sybox",
        level: 2,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      }
    ]
  },
  {
    id: "ro2_e_5_8",
    levelId: "level_rogue2_5-8",
    tags: [
      "rogue_mizuki"
    ],
    category: "combat_ops",
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "余烬方阵",
    name_ja: "残火の行進",
    name_en: "Ember_Phalanx",
    description_zh: "亡者的行列已行进到海洋深处，他们在生死状态上的不确定性引来了海嗣徘徊观测。",
    description_ja: "死者の隊列はすでに深海へ達している。そして、彼らの生死の不確実性に引き寄せられるように、シーボーンが彷徨いながら彼らの様子を観察し始めた。",
    description_en: "The march of the dead has reached the depths of the ocean. The ambiguity of their life or death has led the Seaborn to follow and observe them.",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: [
      "所有敌方单位的攻击力+20%，防御力+50%，生命值+20%",
      "出现更多的深池伙友卫队精英"
    ],
    eliteDesc_ja: [
      "敵全員の攻撃力+20%、防御力+50%、最大HP+20%",
      "<ダブリンヘタイロイ上級衛兵>がさらに出現する"
    ],
    eliteDesc_en: [
      "All enemy units have +20% ATK, +50% DEF, and +20% Max HP",
      "Additional 4 <Dublinn Elite Companion Guard> appear"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          atk: 1.2,
          def: 1.5,
          hp: 1.2
        }
      }
    ],
    routes: [
      {
        title: "combat_ops",
        type: "video",
        youtube_src: "vDzY6iMkIOo",
        bilibili_src: "aid=442981499&bvid=BV1DL411Y7Uz&cid=1108565301&page=1"
      },
      {
        title: "combat_ops",
        type: "video",
        youtube_src: "yjZqxtA2NRY",
        bilibili_src: "aid=442981499&bvid=BV1DL411Y7Uz&cid=1108673572&page=2"
      },
      {
        title: "emergency_ops",
        type: "video",
        youtube_src: "qboShGYhaeo",
        bilibili_src: "aid=442981499&bvid=BV1DL411Y7Uz&cid=1108674652&page=3"
      },
      {
        title: "gpn",
        type: "video",
        youtube_src: "H4-y8_O3L7k",
        bilibili_src: "aid=442981499&bvid=BV1DL411Y7Uz&cid=1108674715&page=4"
      },
      {
        title: "thf",
        type: "video",
        youtube_src: "gNYY08DCg6g",
        bilibili_src: "aid=442981499&bvid=BV1DL411Y7Uz&cid=1128745273&page=5"
      },
      {
        title: "chest",
        type: "img",
        src: "余烬方阵"
      }
    ],
    floors: [
      5
    ],
    sp_terrain: [
      {
        tileKey: "tile_hole",
        alias: null,
        blackboard: null
      }
    ],
    sp_enemy: {
      normal: 26,
      elite: 30,
      fixed: true
    },
    enemies: [
      {
        id: "enemy_2001_duckmi",
        level: 2,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 2,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2034_sythef",
        level: 2,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2035_sybox",
        level: 2,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1175_dushdo_2",
        level: 0,
        min_count: 5,
        max_count: 5,
        elite_min_count: 5,
        elite_max_count: 5,
        overwrittenData: null
      },
      {
        id: "enemy_1174_duholy_2",
        level: 0,
        min_count: 4,
        max_count: 4,
        elite_min_count: 8,
        elite_max_count: 8,
        overwrittenData: null
      },
      {
        id: "enemy_2025_syufo",
        level: 0,
        min_count: 3,
        max_count: 3,
        elite_min_count: 3,
        elite_max_count: 3,
        overwrittenData: null
      },
      {
        id: "enemy_1288_duskls_2",
        level: 0,
        min_count: 13,
        max_count: 13,
        elite_min_count: 13,
        elite_max_count: 13,
        overwrittenData: null
      }
    ]
  },
  {
    id: "ro2_e_6_1",
    levelId: "level_rogue2_6-1",
    tags: [
      "rogue_mizuki"
    ],
    category: "combat_ops",
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "水火相容",
    name_ja: "相容れる水と火",
    name_en: "Water_and_Fire_Union",
    description_zh: "火山喷发，海洋颤动，沉眠的生物尽皆苏醒。在熔岩与水寒间，生命仍将延续。\n<@rolv.rem>场地中有使我方单位防御力减半的<腐蚀地面>。</>",
    description_ja: "火山が噴火し、海が揺れ動き、眠っていたあらゆる生物が覚醒する。溶岩と冷水の狭間にて、生命は変わらず生き延び続ける。\n<@rolv.rem>戦場に配置したユニットの防御力が半分に低下する<腐食した地面>がある。</>",
    description_en: "Volcanoes erupt, the ocean trembles, and sleeping creatures stir. Between molten lava and icy waters, life will continue to persist. \n<@rolv.rem>This stage has <Corrosive Ground> that halves the DEF of friendly units deployed on it.</>",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: [
      "所有敌方单位的攻击力+10%，防御力+20%，生命值+30%",
      "所有庞贝的攻击半径扩大至170%"
    ],
    eliteDesc_ja: [
      "敵全員の攻撃力+10%、防御力+20%、最大HP+30%",
      "<Pompeii>の攻撃範囲+70%"
    ],
    eliteDesc_en: [
      "All enemy units have +10% ATK, +20% DEF, and +30% Max HP",
      "All <Pompeii> have +70% Attack range"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          atk: 1.1,
          def: 1.2,
          hp: 1.3
        }
      },
      {
        targets: [
          "UM1"
        ],
        mods: {
          range: 1.7
        }
      }
    ],
    routes: [
      {
        title: "combat_ops",
        type: "video",
        youtube_src: "r3dHc8blKh0",
        bilibili_src: "aid=867927922&bvid=BV1TV4y1Z7Cf&cid=1108560298&page=1"
      },
      {
        title: "emergency_ops",
        type: "video",
        youtube_src: "XQgY5xYc97Q",
        bilibili_src: "aid=867927922&bvid=BV1TV4y1Z7Cf&cid=1108656224&page=2"
      },
      {
        title: "duck",
        type: "video",
        youtube_src: "2bfcLP9-6cQ",
        bilibili_src: "aid=867927922&bvid=BV1TV4y1Z7Cf&cid=1108656265&page=3"
      },
      {
        title: "gpn",
        type: "video",
        youtube_src: "ad1QzRFf45o",
        bilibili_src: "aid=867927922&bvid=BV1TV4y1Z7Cf&cid=1108656388&page=4"
      },
      {
        title: "chest",
        type: "img",
        src: "水火相容"
      }
    ],
    floors: [
      6
    ],
    sp_terrain: [
      {
        tileKey: "tile_defbreak",
        alias: null,
        blackboard: {
          def: 0.5
        }
      }
    ],
    sp_enemy: {
      normal: 72,
      elite: null,
      fixed: true
    },
    enemies: [
      {
        id: "enemy_2021_syfish",
        level: 0,
        min_count: 12,
        max_count: 12,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2022_syzeni",
        level: 0,
        min_count: 9,
        max_count: 9,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2023_sypult",
        level: 0,
        min_count: 4,
        max_count: 4,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2024_synut",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2034_sythef",
        level: 2,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2001_duckmi",
        level: 2,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 2,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1021_bslime",
        level: 0,
        min_count: 15,
        max_count: 35,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 4e3
        }
      },
      {
        id: "enemy_1021_bslime_2",
        level: 0,
        min_count: 9,
        max_count: 29,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 6e3
        }
      },
      {
        id: "enemy_1050_lslime",
        level: 1,
        min_count: 2,
        max_count: 2,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 6e4,
          def: 400
        }
      },
      {
        id: "enemy_2035_sybox",
        level: 2,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      }
    ]
  },
  {
    id: "ro2_e_6_2",
    levelId: "level_rogue2_6-2",
    tags: [
      "rogue_mizuki"
    ],
    category: "combat_ops",
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "深度认知",
    name_ja: "深度認知",
    name_en: "Deep_Cognition",
    description_zh: "一些海嗣个体已模拟成人类假想敌加入对外冲突，以它们的学习能力与团结效率，人类所谓的兵种搭配与战术策略很快将变得毫无意义。\n<@rolv.rem>提供部署以后可以阻挡敌人的行进路线的<障碍物>。</>",
    description_ja: "シーボーンの一部には人類の仮想敵に擬態し、外敵との戦いに加わっている者も存在する。奴らの高い学習能力と団結力の前では、部隊編成や戦術などの策略は瞬く間に対策されてしまうだろう。\n<@rolv.rem>配置後、敵の進行ルートを遮ることができる<障害物>がある。</>",
    description_en: "Some Seaborn individuals have mimicked the humans' opposing forces to simulate external conflicts. With their learning ability and cohesive efficiency, the humans' so-called combined arms and tactical strategies will soon become meaningless. \n<@rolv.rem>This stage provides <Roadblocks> that can be deployed to block the enemy's path.</>",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: [
      "所有敌方单位的攻击力+50%，防御力+20%，生命值+50%"
    ],
    eliteDesc_ja: [
      "敵全員の攻撃力+50%、防御力+20%、最大HP+50%"
    ],
    eliteDesc_en: [
      "All enemy units have +50% ATK, +20% DEF, and +50% Max HP"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          atk: 1.5,
          def: 1.2,
          hp: 1.5
        }
      }
    ],
    routes: [
      {
        title: "combat_ops",
        type: "video",
        youtube_src: "ry4Veq7glNM",
        bilibili_src: "aid=442903232&bvid=BV1qL411Y7Dc&cid=1108558356&page=1"
      },
      {
        title: "duck",
        type: "video",
        youtube_src: "xpyekYItSi4",
        bilibili_src: "aid=442903232&bvid=BV1qL411Y7Dc&cid=1108648595&page=2"
      },
      {
        title: "thf",
        type: "video",
        youtube_src: "H4bD5qwWyx0",
        bilibili_src: "aid=442903232&bvid=BV1qL411Y7Dc&cid=1108648806&page=3"
      },
      {
        title: "chest",
        type: "img",
        src: "深度认知"
      }
    ],
    floors: [
      6
    ],
    sp_terrain: null,
    sp_enemy: {
      normal: 44,
      elite: null,
      fixed: true
    },
    enemies: [
      {
        id: "enemy_2021_syfish",
        level: 0,
        min_count: 18,
        max_count: 18,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2025_syufo",
        level: 0,
        min_count: 8,
        max_count: 8,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2034_sythef",
        level: 2,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2001_duckmi",
        level: 2,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 2,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1174_duholy_2",
        level: 0,
        min_count: 6,
        max_count: 11,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 3e4
        }
      },
      {
        id: "enemy_1175_dushdo_2",
        level: 0,
        min_count: 6,
        max_count: 11,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 25e3
        }
      },
      {
        id: "enemy_2035_sybox",
        level: 2,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      }
    ]
  },
  {
    id: "ro3_b_1",
    levelId: "level_rogue3_b-1",
    tags: [
      "rogue_sami"
    ],
    category: null,
    characterLimit: 6,
    initialCost: 8,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "利刃所指",
    name_ja: "利刃の示す先",
    name_en: "Blade_Signifier",
    description_zh: "它为死亡铺就了黑色的地毯，杀不死它的，都将与它同行。\n<@rolv.rem>此处将一直处于标准勘察状态，且无法被改变节点类型</>",
    description_ja: "それは死の黒き絨毯を敷いた。奴を殺せぬ者は、歩みを共にすることになるだろう。\n<@rolv.rem>このスポットは常に通常探査状態であり、ほかのタイプのスポットに変更できない</>",
    description_en: "It spreads a black carpet of death, and those unable to kill it shall walk alongside it.\n<@rolv.rem>This node will always be in a regular state and node type cannot be changed</>",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: null,
    eliteDesc_ja: null,
    eliteDesc_en: null,
    elite_mods: null,
    routes: null,
    floors: [
      3
    ],
    sp_terrain: null,
    sp_enemy: null,
    enemies: [
      {
        id: "enemy_2048_smgrd",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1111_ucommd",
        level: 0,
        min_count: 3,
        max_count: 3,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1113_empace",
        level: 0,
        min_count: 3,
        max_count: 3,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2045_smdrn",
        level: 0,
        min_count: 6,
        max_count: 6,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1108_uterer",
        level: 0,
        min_count: 15,
        max_count: 15,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1106_byokai",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 5e3,
          atk: 0,
          def: 150,
          res: 20,
          ms: 1,
          attackSpeed: 100,
          aspd: 1,
          hpRecoveryPerSec: 0,
          spRecoveryPerSec: 1,
          weight: 0,
          tauntLevel: 0,
          epDamageResistance: 0,
          epResistance: 0,
          stunImmune: false,
          silenceImmune: true,
          sleepImmune: false,
          frozenImmune: false,
          levitateImmune: false,
          lifepoint: 0,
          range: -1,
          talentBlackboard: [
            {
              key: "byokai_buff",
              duration: 60
            }
          ]
        }
      }
    ]
  },
  {
    id: "ro3_b_1_b",
    levelId: "level_rogue3_b-1-b",
    tags: [
      "rogue_sami"
    ],
    category: null,
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "呼吸",
    name_ja: "呼吸",
    name_en: "Breathing",
    description_zh: "吸入恐惧，呼出绝望，国度随之扩散，向着乌萨斯而去。\n<@rolv.rem>此处将一直处于标准勘察状态，且无法被改变节点类型</>",
    description_ja: "恐怖を吸い込み、絶望を吐き出す。それに伴い、国土はウルサスに向かって広がり続けていく。\n<@rolv.rem>このスポットは常に通常探査状態であり、ほかのタイプのスポットに変更できない</>",
    description_en: "Breathe in fear, exhale despair, and so the Dominion spreads on towards Ursus.\n<@rolv.rem>This node will always be in a regular state and node type cannot be changed</>",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: null,
    eliteDesc_ja: null,
    eliteDesc_en: null,
    elite_mods: null,
    routes: null,
    floors: [
      3
    ],
    sp_terrain: null,
    sp_enemy: null,
    enemies: [
      {
        id: "enemy_2049_smgrd2",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1035_haxe",
        level: 0,
        min_count: 3,
        max_count: 3,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1035_haxe_2",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1108_uterer",
        level: 0,
        min_count: 25,
        max_count: 25,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1106_byokai",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 5e3,
          atk: 0,
          def: 150,
          res: 20,
          ms: 1,
          attackSpeed: 100,
          aspd: 1,
          hpRecoveryPerSec: 0,
          spRecoveryPerSec: 1,
          weight: 0,
          tauntLevel: 0,
          epDamageResistance: 0,
          epResistance: 0,
          stunImmune: false,
          silenceImmune: true,
          sleepImmune: false,
          frozenImmune: false,
          levitateImmune: false,
          lifepoint: 0,
          range: -1,
          talentBlackboard: [
            {
              key: "byokai_buff",
              duration: 60
            }
          ]
        }
      }
    ]
  },
  {
    id: "ro3_b_2",
    levelId: "level_rogue3_b-2",
    tags: [
      "rogue_sami"
    ],
    category: null,
    characterLimit: 6,
    initialCost: 15,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "新部族",
    name_ja: "新たな部族",
    name_en: "New_Tribe",
    description_zh: "一个没有树与名的部族就此形成，曾经统御众人的，如今仍为首领。它们是邪魔的先锋。\n<@rolv.rem>此处将一直处于标准勘察状态，且无法被改变节点类型</>",
    description_ja: "樹も名も持たぬ部族が悪魔の手先へ姿を変えた。かつて部族を率いていた者は、今も彼らを率いている。\n<@rolv.rem>このスポットは常に通常探査状態であり、ほかのタイプのスポットに変更できない</>",
    description_en: "A clan without a tree or a name takes form. A former leader of many still remains as chief. They are the demons' vanguard forces.\n<@rolv.rem>This node will always be in a regular state and node type cannot be changed</>",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: null,
    eliteDesc_ja: null,
    eliteDesc_en: null,
    elite_mods: null,
    routes: null,
    floors: [
      3
    ],
    sp_terrain: null,
    sp_enemy: null,
    enemies: [
      {
        id: "enemy_1328_cbjedi",
        level: 0,
        min_count: 5,
        max_count: 5,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          atk: 600
        }
      },
      {
        id: "enemy_2050_smsha",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1330_cbrush",
        level: 0,
        min_count: 2,
        max_count: 2,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1330_cbrush_2",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2043_smsbr",
        level: 0,
        min_count: 10,
        max_count: 10,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1106_byokai",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 5e3,
          atk: 0,
          def: 150,
          res: 20,
          ms: 1,
          attackSpeed: 100,
          aspd: 1,
          hpRecoveryPerSec: 0,
          spRecoveryPerSec: 1,
          weight: 0,
          tauntLevel: 0,
          epDamageResistance: 0,
          epResistance: 0,
          stunImmune: false,
          silenceImmune: true,
          sleepImmune: false,
          frozenImmune: false,
          levitateImmune: false,
          lifepoint: 0,
          range: -1,
          talentBlackboard: [
            {
              key: "byokai_buff",
              duration: 60
            }
          ]
        }
      }
    ]
  },
  {
    id: "ro3_b_2_b",
    levelId: "level_rogue3_b-2-b",
    tags: [
      "rogue_sami"
    ],
    category: null,
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "夺树者",
    name_ja: "族樹の破壊者",
    name_en: "Tree-Snatcher",
    description_zh: "它引来躯壳，准备将萨米的族树尽数腐化。在那之后，萨米便将陷入虚无。\n<@rolv.rem>此处将一直处于标准勘察状态，且无法被改变节点类型</>",
    description_ja: "それは穢された亡骸を引き寄せ、サーミの族樹をすべて腐敗させようとしている。それが現実となった時、サーミは虚無の地となるだろう。\n<@rolv.rem>このスポットは常に通常探査状態であり、ほかのタイプのスポットに変更できない</>",
    description_en: "It draws in the husks, preparing to rot every last Sami clan tree. And afterwards, Sami will sink into nothingness.\n<@rolv.rem>This node will always be in a regular state and node type cannot be changed</>",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: null,
    eliteDesc_ja: null,
    eliteDesc_en: null,
    elite_mods: null,
    routes: null,
    floors: [
      3
    ],
    sp_terrain: null,
    sp_enemy: null,
    enemies: [
      {
        id: "enemy_2051_smsha2",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1031_mrogue",
        level: 0,
        min_count: 9,
        max_count: 9,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1077_sotihd_2",
        level: 0,
        min_count: 31,
        max_count: 31,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1021_bslime",
        level: 0,
        min_count: 6,
        max_count: 6,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1085_sotiwz",
        level: 0,
        min_count: 7,
        max_count: 7,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1106_byokai",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 5e3,
          atk: 0,
          def: 150,
          res: 20,
          ms: 1,
          attackSpeed: 100,
          aspd: 1,
          hpRecoveryPerSec: 0,
          spRecoveryPerSec: 1,
          weight: 0,
          tauntLevel: 0,
          epDamageResistance: 0,
          epResistance: 0,
          stunImmune: false,
          silenceImmune: true,
          sleepImmune: false,
          frozenImmune: false,
          levitateImmune: false,
          lifepoint: 0,
          range: -1,
          talentBlackboard: [
            {
              key: "byokai_buff",
              duration: 60
            }
          ]
        }
      }
    ]
  },
  {
    id: "ro3_b_3",
    levelId: "level_rogue3_b-3",
    tags: [
      "rogue_sami"
    ],
    category: null,
    characterLimit: 6,
    initialCost: 25,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "自然之怒",
    name_ja: "大自然の怒り",
    name_en: "Nature's_Wrath",
    description_zh: "萨米的地表迸出熔岩，植物从睡梦中醒来攻击一切外敌。种种迹象都表明，萨米已怒不可遏。\n<@rolv.rem>此处将一直处于标准勘察状态，且无法被改变节点类型</>",
    description_ja: "サーミの地表からマグマが噴き出し、眠りから覚めた植物は一斉に外敵を攻撃し始めた。この現象から察せるのは、サーミの怒りが頂点に達そうとしていることだ。\n<@rolv.rem>このスポットは常に通常探査状態であり、ほかのタイプのスポットに変更できない</>",
    description_en: "Lava bursts forth from Sami's surface, and the plants awake from their slumber to attack all foreign enemies. All signs point to Sami's unrestrained anger.\n<@rolv.rem>This node will always be in a regular state and node type cannot be changed</>",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: null,
    eliteDesc_ja: null,
    eliteDesc_en: null,
    elite_mods: null,
    routes: null,
    floors: [
      3
    ],
    sp_terrain: [
      {
        tileKey: "tile_volcano",
        alias: null,
        blackboard: {
          damage: 700,
          cd_min: 8,
          cd_max: 8
        }
      },
      {
        tileKey: "tile_volcano",
        alias: null,
        blackboard: {
          damage: 700,
          cd_min: 7,
          cd_max: 7
        }
      },
      {
        tileKey: "tile_volcano",
        alias: null,
        blackboard: {
          damage: 700,
          cd_min: 6,
          cd_max: 6
        }
      }
    ],
    sp_enemy: null,
    enemies: [
      {
        id: "enemy_2052_smgia",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1021_bslime",
        level: 0,
        min_count: 8,
        max_count: 8,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1010_demon",
        level: 0,
        min_count: 2,
        max_count: 2,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1010_demon_2",
        level: 0,
        min_count: 4,
        max_count: 4,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1012_dcross_2",
        level: 0,
        min_count: 2,
        max_count: 2,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2043_smsbr",
        level: 0,
        min_count: 18,
        max_count: 18,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2044_smwiz",
        level: 0,
        min_count: 2,
        max_count: 2,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1106_byokai",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 5e3,
          atk: 0,
          def: 150,
          res: 20,
          ms: 1,
          attackSpeed: 100,
          aspd: 1,
          hpRecoveryPerSec: 0,
          spRecoveryPerSec: 1,
          weight: 0,
          tauntLevel: 0,
          epDamageResistance: 0,
          epResistance: 0,
          stunImmune: false,
          silenceImmune: true,
          sleepImmune: false,
          frozenImmune: false,
          levitateImmune: false,
          lifepoint: 0,
          range: -1,
          talentBlackboard: [
            {
              key: "byokai_buff",
              duration: 60
            }
          ]
        }
      }
    ]
  },
  {
    id: "ro3_b_3_b",
    levelId: "level_rogue3_b-3-b",
    tags: [
      "rogue_sami"
    ],
    category: null,
    characterLimit: 6,
    initialCost: 15,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "大地醒转",
    name_ja: "大地の目覚め",
    name_en: "The_Earth_Wakes",
    description_zh: "最古老的植物也起身向着北方而去。或许，当时机成熟，大地自身也将站起身来，摧毁北方的威胁。\n<@rolv.rem>提供部署以后可以阻挡敌人的行进路线的<障碍物></>\n<@rolv.rem>此处将一直处于标准勘察状态，且无法被改变节点类型</>",
    description_ja: "最も古い植物までもが立ち上がり、北へ向かい始めた。恐らく、時が来れば、北方の脅威を取り除くべく大地までもが立ち上がるだろう。\n<@rolv.rem>配置すれば敵の進行ルートを遮ることができる<障害物>が用意される</>\n<@rolv.rem>このスポットは常に通常探査状態であり、ほかのタイプのスポットに変更できない</>",
    description_en: "The most ancient of plants have also uprooted themselves and are heading north. Perhaps, when the time is ripe, the land itself will rise up to destroy the threat from the north.\n<@rolv.rem><Roadblocks> that can block the enemy's route are present on the field</>\n<@rolv.rem>This node will always be in a regular state and node type cannot be changed</>",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: null,
    eliteDesc_ja: null,
    eliteDesc_en: null,
    elite_mods: null,
    routes: null,
    floors: [
      3
    ],
    sp_terrain: [
      {
        tileKey: "tile_hole",
        alias: null,
        blackboard: null
      },
      {
        tileKey: "tile_infection",
        alias: null,
        blackboard: {
          duration: 300,
          damage: 150,
          atk: 0.5,
          attack_speed: 50
        }
      }
    ],
    sp_enemy: null,
    enemies: [
      {
        id: "enemy_2053_smgia2",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1019_jshoot_2",
        level: 0,
        min_count: 5,
        max_count: 12,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 6500,
          atk: 380
        }
      },
      {
        id: "enemy_1023_jmage_2",
        level: 0,
        min_count: 3,
        max_count: 10,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 8e3,
          atk: 430
        }
      },
      {
        id: "enemy_1106_byokai",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 5e3,
          atk: 0,
          def: 150,
          res: 20,
          ms: 1,
          attackSpeed: 100,
          aspd: 1,
          hpRecoveryPerSec: 0,
          spRecoveryPerSec: 1,
          weight: 0,
          tauntLevel: 0,
          epDamageResistance: 0,
          epResistance: 0,
          stunImmune: false,
          silenceImmune: true,
          sleepImmune: false,
          frozenImmune: false,
          levitateImmune: false,
          lifepoint: 0,
          range: -1,
          talentBlackboard: [
            {
              key: "byokai_buff",
              duration: 60
            }
          ]
        }
      }
    ]
  },
  {
    id: "ro3_b_4",
    levelId: "level_rogue3_b-4",
    tags: [
      "rogue_sami"
    ],
    category: null,
    characterLimit: 6,
    initialCost: 30,
    costIncreaseTime: 1,
    code: "ISW-DF",
    name_zh: "巍峨银凇",
    name_ja: "そびえ立つ銀霜",
    name_en: "Lofty_Silverfrost",
    description_zh: "大地起身，检验来者的意志。只有被大地首肯，才能向着更北方而去。\n<@rolv.rem>此处将一直处于标准勘察状态，且无法被改变节点类型</>",
    description_ja: "来訪者の意志を試すべく、大地は身を起こした。北方へと歩みを進めるには、大地に認められねばならない。\n<@rolv.rem>このスポットは常に通常探査状態であり、ほかのタイプのスポットに変更できない</>",
    description_en: "The earth rises, testing the will of those who have come. Only by gaining the earth's approval will we be able to head further north.\n<@rolv.rem>This node will always be in a regular state and node type cannot be changed</>",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: null,
    eliteDesc_ja: null,
    eliteDesc_en: null,
    elite_mods: null,
    routes: null,
    floors: [
      5
    ],
    sp_terrain: [
      {
        tileKey: "tile_hole",
        alias: null,
        blackboard: null
      }
    ],
    sp_enemy: null,
    enemies: [
      {
        id: "enemy_2054_smdeer",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2047_smtree",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1108_uterer_2",
        level: 0,
        min_count: 24,
        max_count: 24,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1081_sotisd_2",
        level: 0,
        min_count: 4,
        max_count: 4,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1102_sdkght_2",
        level: 0,
        min_count: 7,
        max_count: 7,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1110_uamord_2",
        level: 0,
        min_count: 9,
        max_count: 9,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1114_rgrdmn_2",
        level: 0,
        min_count: 3,
        max_count: 3,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1034_laxe_2",
        level: 0,
        min_count: 6,
        max_count: 6,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1106_byokai",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 5e3,
          atk: 0,
          def: 150,
          res: 20,
          ms: 1,
          attackSpeed: 100,
          aspd: 1,
          hpRecoveryPerSec: 0,
          spRecoveryPerSec: 1,
          weight: 0,
          tauntLevel: 0,
          epDamageResistance: 0,
          epResistance: 0,
          stunImmune: false,
          silenceImmune: true,
          sleepImmune: false,
          frozenImmune: false,
          levitateImmune: false,
          lifepoint: 0,
          range: -1,
          talentBlackboard: [
            {
              key: "byokai_buff",
              duration: 60
            }
          ]
        }
      }
    ]
  },
  {
    id: "ro3_b_4_b",
    levelId: "level_rogue3_b-4-b",
    tags: [
      "rogue_sami"
    ],
    category: null,
    characterLimit: 6,
    initialCost: 20,
    costIncreaseTime: 1,
    code: "ISW-DF",
    name_zh: "深寒造像",
    name_ja: null,
    name_en: null,
    description_zh: "寒冷与冰结只不过是自然的表象，如果连这都无法克服，大地又怎能邀请你面对北方那不循常理的敌人？\n<@rolv.rem>【自然涌动】变为使全场寒冷的<暴风雪>，<积雪银凇>的生命值大幅提升\n此处将一直处于标准勘察状态，且无法被改变节点类型</>",
    description_ja: null,
    description_en: null,
    addInfo_zh: [
      "暴风雪 - 产生时间线：第1波次 - 15s(持40s)，63s（持45s），第2波次 - 2s（持600s）",
      "效果：每隔10秒为所有单位赋予5秒的寒冷，对已经持有寒冷的单位改为施加冻结"
    ],
    addInfo_ja: [
      "暴风雪 - 产生时间线：第1波次 - 15s(持40s)，63s（持45s），第2波次 - 2s（持600s）",
      "效果：每隔10秒为所有单位赋予5秒的寒冷，对已经持有寒冷的单位改为施加冻结"
    ],
    addInfo_en: [
      "暴风雪 - 产生时间线：第1波次 - 15s(持40s)，63s（持45s），第2波次 - 2s（持600s）",
      "效果：每隔10秒为所有单位赋予5秒的寒冷，对已经持有寒冷的单位改为施加冻结"
    ],
    eliteDesc_zh: null,
    eliteDesc_ja: null,
    eliteDesc_en: null,
    elite_mods: null,
    routes: null,
    floors: [
      5
    ],
    sp_terrain: [
      {
        tileKey: "tile_hole",
        alias: null,
        blackboard: null
      }
    ],
    sp_enemy: null,
    enemies: [
      {
        id: "enemy_2054_smdeer",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 24e4,
          talentBlackboard: [
            {
              key: "smdeer_3",
              value: 70
            }
          ]
        }
      },
      {
        id: "enemy_2047_smtree",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 3e4
        }
      },
      {
        id: "enemy_1106_byokai",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 5e3,
          atk: 0,
          def: 150,
          res: 20,
          ms: 1,
          attackSpeed: 100,
          aspd: 1,
          hpRecoveryPerSec: 0,
          spRecoveryPerSec: 1,
          weight: 0,
          tauntLevel: 0,
          epDamageResistance: 0,
          epResistance: 0,
          stunImmune: false,
          silenceImmune: true,
          sleepImmune: false,
          frozenImmune: false,
          levitateImmune: false,
          lifepoint: 0,
          range: -1,
          talentBlackboard: [
            {
              key: "byokai_buff",
              duration: 60
            }
          ]
        }
      },
      {
        id: "enemy_1243_ltswar_2",
        level: 0,
        min_count: 9,
        max_count: 9,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 3e4,
          def: 900,
          res: 40,
          talentBlackboard: [
            {
              key: "sarks_performance",
              cooldown: 15,
              initCooldown: 11
            }
          ]
        }
      },
      {
        id: "enemy_1064_snsbr",
        level: 1,
        min_count: 40,
        max_count: 40,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1067_snslime_2",
        level: 0,
        min_count: 26,
        max_count: 26,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1069_icebrk_2",
        level: 0,
        min_count: 7,
        max_count: 7,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1070_iced",
        level: 0,
        min_count: 24,
        max_count: 24,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      }
    ]
  },
  {
    id: "ro3_b_5",
    levelId: "level_rogue3_b-5",
    tags: [
      "rogue_sami"
    ],
    category: null,
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-DF",
    name_zh: "萨米之熵",
    name_ja: "サーミのエントロピー",
    name_en: "Sami's_Entropy",
    description_zh: "萨米的英雄没能成功，转而成为萨米人最大的威胁。邪魔一刻不除，这样的循环就会继续下去，直至萨米灭亡。\n<@rolv.rem>此处将一直处于标准勘察状态，且无法被改变节点类型</>",
    description_ja: "サーミの英雄は失敗し、サーミ人にとって最大の脅威となってしまった。悪魔を完全に滅ぼさなければ、サーミが滅びてしまうまでこうした事態が繰り返されることだろう。\n<@rolv.rem>このスポットは常に通常探査状態であり、ほかのタイプのスポットに変更できない</>",
    description_en: "The hero of Sami has failed, and become the peoples' greatest threat. If the demons are not eliminated quickly, such a cycle will only continue until Sami is destroyed.\n<@rolv.rem>This node will always be in a regular state and node type cannot be changed</>",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: null,
    eliteDesc_ja: null,
    eliteDesc_en: null,
    elite_mods: null,
    routes: null,
    floors: [
      5
    ],
    sp_terrain: null,
    sp_enemy: null,
    enemies: [
      {
        id: "enemy_2043_smsbr",
        level: 0,
        min_count: 20,
        max_count: 20,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2046_smwar",
        level: 0,
        min_count: 18,
        max_count: 18,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2055_smlead",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2045_smdrn",
        level: 0,
        min_count: 6,
        max_count: 6,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1042_frostd",
        level: 0,
        min_count: 2,
        max_count: 2,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1069_icebrk_2",
        level: 0,
        min_count: 4,
        max_count: 4,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1067_snslime_2",
        level: 0,
        min_count: 24,
        max_count: 24,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1106_byokai",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 5e3,
          atk: 0,
          def: 150,
          res: 20,
          ms: 1,
          attackSpeed: 100,
          aspd: 1,
          hpRecoveryPerSec: 0,
          spRecoveryPerSec: 1,
          weight: 0,
          tauntLevel: 0,
          epDamageResistance: 0,
          epResistance: 0,
          stunImmune: false,
          silenceImmune: true,
          sleepImmune: false,
          frozenImmune: false,
          levitateImmune: false,
          lifepoint: 0,
          range: -1,
          talentBlackboard: [
            {
              key: "byokai_buff",
              duration: 60
            }
          ]
        }
      }
    ]
  },
  {
    id: "ro3_b_5_b",
    levelId: "level_rogue3_b-5-b",
    tags: [
      "rogue_sami"
    ],
    category: null,
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-DF",
    name_zh: "虚无之偶",
    name_ja: null,
    name_en: null,
    description_zh: "无论这位萨米英雄曾有何种夙愿，如今，他都只是一个剥离本我后坍缩的表征——正如他身后那万千乌萨斯人一般。\n<@rolv.rem>此处将一直处于标准勘察状态，且无法被改变节点类型</>",
    description_ja: null,
    description_en: null,
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: null,
    eliteDesc_ja: null,
    eliteDesc_en: null,
    elite_mods: null,
    routes: null,
    floors: [
      5
    ],
    sp_terrain: null,
    sp_enemy: null,
    enemies: [
      {
        id: "enemy_1106_byokai",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 5e3,
          atk: 0,
          def: 150,
          res: 20,
          ms: 1,
          attackSpeed: 100,
          aspd: 1,
          hpRecoveryPerSec: 0,
          spRecoveryPerSec: 1,
          weight: 0,
          tauntLevel: 0,
          epDamageResistance: 0,
          epResistance: 0,
          stunImmune: false,
          silenceImmune: true,
          sleepImmune: false,
          frozenImmune: false,
          levitateImmune: false,
          lifepoint: 0,
          range: -1,
          talentBlackboard: [
            {
              key: "byokai_buff",
              duration: 60
            }
          ]
        }
      },
      {
        id: "enemy_2055_smlead",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1112_emppnt_2",
        level: 0,
        min_count: 3,
        max_count: 3,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1091_mdhmmr_2",
        level: 0,
        min_count: 13,
        max_count: 13,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1006_shield_2",
        level: 0,
        min_count: 50,
        max_count: 50,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1074_dbskar_2",
        level: 0,
        min_count: 8,
        max_count: 8,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      }
    ]
  },
  {
    id: "ro3_b_6",
    levelId: "level_rogue3_b-6",
    tags: [
      "rogue_sami"
    ],
    category: null,
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-DF",
    name_zh: "园丁",
    name_ja: "庭師",
    name_en: "Gardener",
    description_zh: "它从圆盘的裂缝中钻入，在“有”的事物上播种“无”。将之逐退，便能安然走过花园，来到大地的尽头。\n<@rolv.rem>此处将一直处于标准勘察状态，且无法被改变节点类型</>",
    description_ja: "それは円盤の亀裂から入り込み、「有る」ものに「無」を植え付けていく。奴を追い払えば、無事に花園を抜け、大地の果てへとたどり着くことができるだろう。\n<@rolv.rem>このスポットは常に通常探査状態であり、ほかのタイプのスポットに変更できない</>",
    description_en: "It burrows through the cracks in the circular plate, sowing seeds of 'nothing' into things of 'being.' Driving it away will allow you to walk through the garden safe and sound, to the land's end.\n<@rolv.rem>This node will always be in a regular state and node type cannot be changed</>",
    addInfo_zh: [
      "空间稳定设施 - SP40，效果：使boss失去无敌5s，蓄力：时长变10s",
      "关于boss闪现 - 路线是固定的循环",
      "(7,6)→(4,9)→(1,6)→(4,3)→(7,6)",
      "开始挂机30s后移动一次",
      "后来挂机20s后移动一次(15回，绕4圈）",
      "然后改为挂机20s移动3次(14回）",
      "最后挂机至600s自爆"
    ],
    addInfo_ja: [
      "ボスの動きについて - ルートは固定のループ",
      "(7,6)→(4,9)→(1,6)→(4,3)→(7,6)",
      "最初は30s待機したあと移動する",
      "その後20s待機後移動する（15回）",
      "それから20s待機後3回移動する(14回）",
      "最後は600s自爆が発動まで待機"
    ],
    addInfo_en: [
      "Regarding Boss's route - Route is a fixed loop",
      "(7,6)→(4,9)→(1,6)→(4,3)→(7,6)",
      "Start: After 30s moves once",
      "Thereafter: Every 20s moves once (x 15)",
      "Next: Every 20s moves 3 times (x 14）",
      "Finally wait till 600s self-destruct to activate"
    ],
    eliteDesc_zh: null,
    eliteDesc_ja: null,
    eliteDesc_en: null,
    elite_mods: null,
    routes: null,
    floors: [
      6
    ],
    sp_terrain: [
      {
        tileKey: "tile_pollution_road",
        alias: null,
        blackboard: {
          attack_speed: -50,
          damage: 50
        }
      }
    ],
    sp_enemy: null,
    enemies: [
      {
        id: "enemy_2043_smsbr",
        level: 0,
        min_count: 36,
        max_count: 36,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2044_smwiz",
        level: 0,
        min_count: 16,
        max_count: 16,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2045_smdrn",
        level: 0,
        min_count: 24,
        max_count: 24,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2056_smedzi",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1136_redace_2",
        level: 0,
        min_count: 4,
        max_count: 4,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 16e3
        }
      },
      {
        id: "enemy_1139_hologc_2",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 8e3
        }
      },
      {
        id: "enemy_1113_empace_2",
        level: 0,
        min_count: 10,
        max_count: 10,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1329_cbshld_2",
        level: 0,
        min_count: 13,
        max_count: 13,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1330_cbrush_2",
        level: 0,
        min_count: 2,
        max_count: 2,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 28e3
        }
      },
      {
        id: "enemy_1106_byokai",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 5e3,
          atk: 0,
          def: 150,
          res: 20,
          ms: 1,
          attackSpeed: 100,
          aspd: 1,
          hpRecoveryPerSec: 0,
          spRecoveryPerSec: 1,
          weight: 0,
          tauntLevel: 0,
          epDamageResistance: 0,
          epResistance: 0,
          stunImmune: false,
          silenceImmune: true,
          sleepImmune: false,
          frozenImmune: false,
          levitateImmune: false,
          lifepoint: 0,
          range: -1,
          talentBlackboard: [
            {
              key: "byokai_buff",
              duration: 60
            }
          ]
        }
      }
    ]
  },
  {
    id: "ro3_b_6_b",
    levelId: "level_rogue3_b-6-b",
    tags: [
      "rogue_sami"
    ],
    category: null,
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-DF",
    name_zh: "哨兵",
    name_ja: null,
    name_en: null,
    description_zh: "它睁着那只空洞的眼，审视这个维度的一切，只有当它阖上眼，人类才有机会去一窥大地尽头之后的奥秘。\n<@rolv.rem>此处将一直处于标准勘察状态，且无法被改变节点类型</>",
    description_ja: null,
    description_en: null,
    addInfo_zh: [
      "空间稳定设施 - SP$20$，效果：使boss失去无敌$2.5s$，蓄力：时长变$5s$",
      "关于boss闪现 - 路线与正常版不同，顺时针绕着地图外周瞬移",
      "路线 - 请参考BV1QG411z7mQ",
      "瞬移次数 / 坐标 / 挂机时长",
      "2 /（11 , 7）/ 25s",
      "2 /（11 , 3）/ 25s",
      "2 /（10 , 1）/ 30s",
      "3 /（9 , 4）/ 35s",
      "1 /（8 , 3）/ 5s",
      "2 /（6 , 1）/ 25s",
      "2 /（3 , 2）/ 30s",
      "1 /（2 , 3）/ 30s",
      "2 /（1 , 6）/ 30s",
      "1 /（3 , 6）/ 25s",
      "2 /（3 , 4）/ 35s",
      "2 /（4 , 6）/ 30s",
      "2 /（6 , 7）/ 30s",
      "3 /（11 , 5）/ 35s",
      "2 /（6 , 1）/ 30s",
      "3 /（1 , 4）/ 30s",
      "6 /（9 , 4）/ 6s",
      "1 /（3 , 4）/ 6s",
      "1 /（9 , 4）/ 6s",
      "1 /（3 , 4）/ 6s",
      "2 /（3 , 4）/ 12s",
      "1 /（9 , 4）/ 6s",
      "2 /（9 , 4）/ 12s",
      "1 /（6 , 7）/ 至自爆"
    ],
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: null,
    eliteDesc_ja: null,
    eliteDesc_en: null,
    elite_mods: null,
    routes: null,
    floors: [
      6
    ],
    sp_terrain: [
      {
        tileKey: "tile_pollution_road",
        alias: null,
        blackboard: {
          attack_speed: -50,
          damage: 50
        }
      }
    ],
    sp_enemy: null,
    enemies: [
      {
        id: "enemy_2056_smedzi",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1017_defdrn",
        level: 0,
        min_count: 3,
        max_count: 3,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 9e4,
          def: 600,
          talentBlackboard: [
            {
              key: "mcv4_def_buff",
              value: 600
            }
          ]
        }
      },
      {
        id: "enemy_1355_mrfly_2",
        level: 0,
        min_count: 3,
        max_count: 3,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 12e4
        }
      },
      {
        id: "enemy_1070_iced",
        level: 0,
        min_count: 16,
        max_count: 16,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2043_smsbr",
        level: 0,
        min_count: 31,
        max_count: 31,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2046_smwar",
        level: 0,
        min_count: 33,
        max_count: 33,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1106_byokai",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 5e3,
          atk: 0,
          def: 150,
          res: 20,
          ms: 1,
          attackSpeed: 100,
          aspd: 1,
          hpRecoveryPerSec: 0,
          spRecoveryPerSec: 1,
          weight: 0,
          tauntLevel: 0,
          epDamageResistance: 0,
          epResistance: 0,
          stunImmune: false,
          silenceImmune: true,
          sleepImmune: false,
          frozenImmune: false,
          levitateImmune: false,
          lifepoint: 0,
          range: -1,
          talentBlackboard: [
            {
              key: "byokai_buff",
              duration: 60
            }
          ]
        }
      },
      {
        id: "enemy_1175_dushdo",
        level: 0,
        min_count: 12,
        max_count: 12,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 25e3,
          atk: 800,
          lifepoint: 2
        }
      },
      {
        id: "enemy_1175_dushdo_2",
        level: 0,
        min_count: 20,
        max_count: 20,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 5e4,
          atk: 1100,
          lifepoint: 2
        }
      }
    ]
  },
  {
    id: "ro3_b_7",
    levelId: "level_rogue3_b-7",
    tags: [
      "rogue_sami"
    ],
    category: null,
    characterLimit: 6,
    initialCost: 20,
    costIncreaseTime: 1,
    code: "ISW-DF",
    name_zh: "时光之沙",
    name_ja: null,
    name_en: null,
    description_zh: "在这万物的终点，时间与空间都失去了意义，只余两位王者，两支军队以及一场无尽的争斗。\n<@rolv.rem>此处将一直处于标准勘察状态，且无法被改变节点类型</>",
    description_ja: null,
    description_en: null,
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: null,
    eliteDesc_ja: null,
    eliteDesc_en: null,
    elite_mods: null,
    routes: null,
    floors: [
      6,
      7
    ],
    sp_terrain: null,
    sp_enemy: null,
    enemies: [
      {
        id: "enemy_2057_smkght",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2058_smlion",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2060_smshdw",
        level: 0,
        min_count: 26,
        max_count: 26,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2061_smhond",
        level: 0,
        min_count: 8,
        max_count: 8,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1103_wdkght_2",
        level: 0,
        min_count: 4,
        max_count: 4,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1095_ccripr_2",
        level: 0,
        min_count: 12,
        max_count: 12,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1106_byokai",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 5e3,
          atk: 0,
          def: 150,
          res: 20,
          ms: 1,
          attackSpeed: 100,
          aspd: 1,
          hpRecoveryPerSec: 0,
          spRecoveryPerSec: 1,
          weight: 0,
          tauntLevel: 0,
          epDamageResistance: 0,
          epResistance: 0,
          stunImmune: false,
          silenceImmune: true,
          sleepImmune: false,
          frozenImmune: false,
          levitateImmune: false,
          lifepoint: 0,
          range: -1,
          talentBlackboard: [
            {
              key: "byokai_buff",
              duration: 60
            }
          ]
        }
      }
    ]
  },
  {
    id: "ro3_b_7_b",
    levelId: "level_rogue3_b-7-b",
    tags: [
      "rogue_sami"
    ],
    category: null,
    characterLimit: 6,
    initialCost: 20,
    costIncreaseTime: 1,
    code: "ISW-DF",
    name_zh: "迈入永恒",
    name_ja: null,
    name_en: null,
    description_zh: "时间的注脚被抽去，战争就此没有结果。他们的战争还会持续下去，你又将何去何从？\n<@rolv.rem>此处将一直处于标准勘察状态，且无法被改变节点类型</>",
    description_ja: null,
    description_en: null,
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: null,
    eliteDesc_ja: null,
    eliteDesc_en: null,
    elite_mods: null,
    routes: null,
    floors: [
      6,
      7
    ],
    sp_terrain: null,
    sp_enemy: null,
    enemies: [
      {
        id: "enemy_2057_smkght",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2058_smlion",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2060_smshdw",
        level: 0,
        min_count: 12,
        max_count: 12,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2061_smhond",
        level: 0,
        min_count: 6,
        max_count: 6,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1103_wdkght_2",
        level: 0,
        min_count: 6,
        max_count: 6,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1095_ccripr_2",
        level: 0,
        min_count: 12,
        max_count: 12,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1106_byokai",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 5e3,
          atk: 0,
          def: 150,
          res: 20,
          ms: 1,
          attackSpeed: 100,
          aspd: 1,
          hpRecoveryPerSec: 0,
          spRecoveryPerSec: 1,
          weight: 0,
          tauntLevel: 0,
          epDamageResistance: 0,
          epResistance: 0,
          stunImmune: false,
          silenceImmune: true,
          sleepImmune: false,
          frozenImmune: false,
          levitateImmune: false,
          lifepoint: 0,
          range: -1,
          talentBlackboard: [
            {
              key: "byokai_buff",
              duration: 60
            }
          ]
        }
      },
      {
        id: "enemy_1102_sdkght_2",
        level: 0,
        min_count: 8,
        max_count: 8,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1182_flasrt",
        level: 0,
        min_count: 4,
        max_count: 4,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1183_mlasrt",
        level: 0,
        min_count: 4,
        max_count: 4,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1096_ccwitch",
        level: 0,
        min_count: 7,
        max_count: 7,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1098_cchmpn_2",
        level: 0,
        min_count: 6,
        max_count: 6,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      }
    ]
  },
  {
    id: "ro3_t_1",
    levelId: "level_rogue3_t-1",
    tags: [
      "rogue_sami"
    ],
    category: null,
    characterLimit: 6,
    initialCost: 15,
    costIncreaseTime: 1,
    code: "ISW-DF",
    name_zh: "半吊子之旅",
    name_ja: "小心者の旅",
    name_en: "Half-baked_Trip",
    description_zh: "受到侦探叔叔的鼓励，他鼓起勇气跟着老板一起来到了萨米。可他一不小心和其他人走散后，就立刻恢复了原本那副唯唯诺诺的模样。",
    description_ja: "探偵のおじさんに励まされ、彼は勇気を出してボスと一緒にサーミへやってきた。だが、うっかり同行者とはぐれてしまうなり、すぐにいつものへっぴり腰に戻ってしまったようだ。",
    description_en: "Encouraged by his detective uncle, he summons his courage and follows his boss to Sami. But after he accidentally gets separated from the others, he immediately returns to his original submissive persona.",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: null,
    eliteDesc_ja: null,
    eliteDesc_en: null,
    elite_mods: null,
    routes: null,
    floors: [
      1
    ],
    sp_terrain: null,
    sp_enemy: null,
    enemies: [
      {
        id: "enemy_2034_sythef",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2043_smsbr",
        level: 0,
        min_count: 3,
        max_count: 7,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1007_slime_3",
        level: 0,
        min_count: 3,
        max_count: 6,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1004_mslime_2",
        level: 0,
        min_count: 0,
        max_count: 3,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1056_ganwar",
        level: 0,
        min_count: 0,
        max_count: 4,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1106_byokai",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 5e3,
          atk: 0,
          def: 150,
          res: 20,
          ms: 1,
          attackSpeed: 100,
          aspd: 1,
          hpRecoveryPerSec: 0,
          spRecoveryPerSec: 1,
          weight: 0,
          tauntLevel: 0,
          epDamageResistance: 0,
          epResistance: 0,
          stunImmune: false,
          silenceImmune: true,
          sleepImmune: false,
          frozenImmune: false,
          levitateImmune: false,
          lifepoint: 0,
          range: -1,
          talentBlackboard: [
            {
              key: "byokai_buff",
              duration: 60
            }
          ]
        }
      }
    ]
  },
  {
    id: "ro3_t_2",
    levelId: "level_rogue3_t-2",
    tags: [
      "rogue_sami"
    ],
    category: null,
    characterLimit: 6,
    initialCost: 20,
    costIncreaseTime: 1,
    code: "ISW-DF",
    name_zh: "无中生钱",
    name_ja: "無から富を生む",
    name_en: "Moneymaking_from_Nothing",
    description_zh: "在鸭爵的操作下，这些坍缩体聚在一起转来转去，祭坛正中间确实出现了不应在萨米出现的地块，但暂时还没有财富产生。\n<@rolv.rem>场地内有间断对其上单位造成伤害的<热泵通道>。</>",
    description_ja: "ダック卿におびき出された崩壊体たちが群れを成してうろついている。祭壇の中央には、確かにサーミに存在しないはずの地形が現れていたが、富はまだ生み出されていない。そう、今はまだ。\n<@rolv.rem>戦場に一定間隔でマス上のユニットにダメージを与える<噴気口>が出現</>",
    description_en: "The Duck Lord manipulated these Collapsals to congregate here, roving around in a circle. A patch of land that should not be in Sami does appear dead-center in the altar, but has yet to bring any riches.\n<@rolv.rem><Heat Pump Passages> that periodically deal damage to units above them are present on the field</>",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: null,
    eliteDesc_ja: null,
    eliteDesc_en: null,
    elite_mods: null,
    routes: null,
    floors: [
      2
    ],
    sp_terrain: [
      {
        tileKey: "tile_volcano",
        alias: null,
        blackboard: {
          damage: 2e3,
          cd_min: 1,
          cd_max: 1
        }
      }
    ],
    sp_enemy: null,
    enemies: [
      {
        id: "enemy_2043_smsbr",
        level: 0,
        min_count: 20,
        max_count: 20,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2044_smwiz",
        level: 0,
        min_count: 2,
        max_count: 2,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2001_duckmi",
        level: 1,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1106_byokai",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 5e3,
          atk: 0,
          def: 150,
          res: 20,
          ms: 1,
          attackSpeed: 100,
          aspd: 1,
          hpRecoveryPerSec: 0,
          spRecoveryPerSec: 1,
          weight: 0,
          tauntLevel: 0,
          epDamageResistance: 0,
          epResistance: 0,
          stunImmune: false,
          silenceImmune: true,
          sleepImmune: false,
          frozenImmune: false,
          levitateImmune: false,
          lifepoint: 0,
          range: -1,
          talentBlackboard: [
            {
              key: "byokai_buff",
              duration: 60
            }
          ]
        }
      }
    ]
  },
  {
    id: "ro3_t_3",
    levelId: "level_rogue3_t-3",
    tags: [
      "rogue_sami"
    ],
    category: null,
    characterLimit: 6,
    initialCost: 20,
    costIncreaseTime: 1,
    code: "ISW-DF",
    name_zh: "豪华车队",
    name_ja: "豪華な車列",
    name_en: "Luxurious_Fleet",
    description_zh: "虽然从车里下来了许多富人们的贴身保镖，但你很清楚，最具威胁的并不是他们。",
    description_ja: "金持ちたちのボディガードが何人も車から降りてきた。だが、最も脅威となるのは彼らではないということを、あなたはよく知っている。",
    description_en: "A slew of personal bodyguards to wealthy men emerge from the cars, but you know very well the biggest threat is not them.",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: null,
    eliteDesc_ja: null,
    eliteDesc_en: null,
    elite_mods: null,
    routes: null,
    floors: [
      3,
      4
    ],
    sp_terrain: null,
    sp_enemy: null,
    enemies: [
      {
        id: "enemy_1281_sgcar",
        level: 0,
        min_count: 8,
        max_count: 8,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 1,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1279_sgbdg",
        level: 0,
        min_count: 6,
        max_count: 6,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1277_sgman",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1106_byokai",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 5e3,
          atk: 0,
          def: 150,
          res: 20,
          ms: 1,
          attackSpeed: 100,
          aspd: 1,
          hpRecoveryPerSec: 0,
          spRecoveryPerSec: 1,
          weight: 0,
          tauntLevel: 0,
          epDamageResistance: 0,
          epResistance: 0,
          stunImmune: false,
          silenceImmune: true,
          sleepImmune: false,
          frozenImmune: false,
          levitateImmune: false,
          lifepoint: 0,
          range: -1,
          talentBlackboard: [
            {
              key: "byokai_buff",
              duration: 60
            }
          ]
        }
      }
    ]
  },
  {
    id: "ro3_t_4",
    levelId: "level_rogue3_t-4",
    tags: [
      "rogue_sami"
    ],
    category: null,
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-DF",
    name_zh: "“正义使者”",
    name_ja: "「正義の使者」",
    name_en: "'Envoy_of_Justice'",
    description_zh: "于是，你大喝一声，跳进了某个正在萨米进行实地拍摄的哥伦比亚剧组。",
    description_ja: "そこであなたは大声で叫び、サーミでロケをしているクルビアのとある映画の撮影クルーのもとへと飛び込んだ。",
    description_en: "And thus, you let out a huge yell, and jump into a Columbian production crew currently filming on location in Sami.",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: null,
    eliteDesc_ja: null,
    eliteDesc_en: null,
    elite_mods: null,
    routes: null,
    floors: [
      5
    ],
    sp_terrain: null,
    sp_enemy: null,
    enemies: [
      {
        id: "enemy_2001_duckmi",
        level: 2,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 2,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2034_sythef",
        level: 2,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1076_bsthmr_2",
        level: 0,
        min_count: 5,
        max_count: 5,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1256_lyacpa_2",
        level: 0,
        min_count: 3,
        max_count: 3,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1250_lyengs_2",
        level: 0,
        min_count: 10,
        max_count: 10,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1111_ucommd_2",
        level: 0,
        min_count: 11,
        max_count: 11,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1106_byokai",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 5e3,
          atk: 0,
          def: 150,
          res: 20,
          ms: 1,
          attackSpeed: 100,
          aspd: 1,
          hpRecoveryPerSec: 0,
          spRecoveryPerSec: 1,
          weight: 0,
          tauntLevel: 0,
          epDamageResistance: 0,
          epResistance: 0,
          stunImmune: false,
          silenceImmune: true,
          sleepImmune: false,
          frozenImmune: false,
          levitateImmune: false,
          lifepoint: 0,
          range: -1,
          talentBlackboard: [
            {
              key: "byokai_buff",
              duration: 60
            }
          ]
        }
      }
    ]
  },
  {
    id: "ro3_ev_1",
    levelId: "level_rogue3_ev-1",
    tags: [
      "rogue_sami"
    ],
    category: null,
    characterLimit: 6,
    initialCost: 20,
    costIncreaseTime: 1,
    code: "ISW-SP",
    name_zh: "天途半道",
    name_ja: "天路の半ば",
    name_en: "Halfway_on_Khaganquest",
    description_zh: "这些影子都来自同一位执着的梦魇。他本人早已不知所终，但因他执念留下的影子，仍在不停地向北征伐。",
    description_ja: "この影たちはすべて、一体の執念深いナイツモラから生まれたものだ。本体の行方は誰も知らないが、その執念が残した影は今も北を目指して行軍を続けている。",
    description_en: "These shadows all come from the same persistent Nightzmora. He has long since gone astray, but the shadows left by his obsession still relentlessly march northward on a punitive expedition.",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: null,
    eliteDesc_ja: null,
    eliteDesc_en: null,
    elite_mods: null,
    routes: null,
    floors: [
      3,
      4,
      5
    ],
    sp_terrain: null,
    sp_enemy: null,
    enemies: [
      {
        id: "enemy_1185_nmekgt",
        level: 0,
        min_count: 8,
        max_count: 10,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1185_nmekgt_2",
        level: 0,
        min_count: 6,
        max_count: 8,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 22e3
        }
      },
      {
        id: "enemy_1185_nmekgt_3",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 6e4,
          atk: 1800
        }
      },
      {
        id: "enemy_1106_byokai",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 5e3,
          atk: 0,
          def: 150,
          res: 20,
          ms: 1,
          attackSpeed: 100,
          aspd: 1,
          hpRecoveryPerSec: 0,
          spRecoveryPerSec: 1,
          weight: 0,
          tauntLevel: 0,
          epDamageResistance: 0,
          epResistance: 0,
          stunImmune: false,
          silenceImmune: true,
          sleepImmune: false,
          frozenImmune: false,
          levitateImmune: false,
          lifepoint: 0,
          range: -1,
          talentBlackboard: [
            {
              key: "byokai_buff",
              duration: 60
            }
          ]
        }
      }
    ]
  },
  {
    id: "ro3_ev_2",
    levelId: "level_rogue3_ev-2",
    tags: [
      "rogue_sami"
    ],
    category: null,
    characterLimit: 6,
    initialCost: 30,
    costIncreaseTime: 1,
    code: "ISW-SP",
    name_zh: "夙愿将偿",
    name_ja: "宿願成就目前",
    name_en: "Long-sought_Compensation",
    description_zh: "观众不是邪魔，所以，他们应该能够到达那个臆想中的美好结局。嗯，至少同生共死了，他们还能奢求什么呢？",
    description_ja: "観客は悪魔ではなく、ゆえに彼らは自らの思い描くハッピーエンドにたどり着くことができるはずだ。少なくとも、演者と生死を共にできたというのに、それ以上何を望むのだろうか？",
    description_en: "The audience are not demons, so they should be able to reach that beautiful happy end in their heads. Well, at least they lived and died together, so what more can they ask for?",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: null,
    eliteDesc_ja: null,
    eliteDesc_en: null,
    elite_mods: null,
    routes: null,
    floors: [
      3,
      4,
      5
    ],
    sp_terrain: [
      {
        tileKey: "tile_hole",
        alias: null,
        blackboard: null
      },
      {
        tileKey: "tile_infection",
        alias: null,
        blackboard: {
          damage: 100,
          atk: 0.5,
          attack_speed: 50,
          duration: 300
        }
      }
    ],
    sp_enemy: null,
    enemies: [
      {
        id: "enemy_2014_csicer",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2015_csicem",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1067_snslime",
        level: 0,
        min_count: 14,
        max_count: 14,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          atk: 100
        }
      },
      {
        id: "enemy_2010_csdcr",
        level: 0,
        min_count: 4,
        max_count: 4,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          atk: 200
        }
      },
      {
        id: "enemy_2009_csaudc",
        level: 0,
        min_count: 12,
        max_count: 12,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1106_byokai",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 5e3,
          atk: 0,
          def: 150,
          res: 20,
          ms: 1,
          attackSpeed: 100,
          aspd: 1,
          hpRecoveryPerSec: 0,
          spRecoveryPerSec: 1,
          weight: 0,
          tauntLevel: 0,
          epDamageResistance: 0,
          epResistance: 0,
          stunImmune: false,
          silenceImmune: true,
          sleepImmune: false,
          frozenImmune: false,
          levitateImmune: false,
          lifepoint: 0,
          range: -1,
          talentBlackboard: [
            {
              key: "byokai_buff",
              duration: 60
            }
          ]
        }
      }
    ]
  },
  {
    id: "ro3_ev_3",
    levelId: "level_rogue3_ev-3",
    tags: [
      "rogue_sami"
    ],
    category: null,
    characterLimit: 6,
    initialCost: 25,
    costIncreaseTime: 2,
    code: "ISW-SP",
    name_zh: "惩罚",
    name_ja: "処罰",
    name_en: "Penalty",
    description_zh: "这座屋子的主人显然很擅长让那些不听劝告的客人得到教训。",
    description_ja: "この屋敷の主人は、忠告に従わない客人たちを教育することに長けているようだ。",
    description_en: "The master of this house is clearly an expert at teaching disobedient guests a lesson.",
    addInfo_zh: [
      "每2秒回复1点部署费用"
    ],
    addInfo_ja: [
      "コスト回復速度半減"
    ],
    addInfo_en: [
      "DP regen rate halved"
    ],
    eliteDesc_zh: null,
    eliteDesc_ja: null,
    eliteDesc_en: null,
    elite_mods: null,
    routes: null,
    floors: [
      3,
      4,
      5
    ],
    sp_terrain: null,
    sp_enemy: null,
    enemies: [
      {
        id: "enemy_1270_nhstlk",
        level: 0,
        min_count: 4,
        max_count: 4,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1266_nhapos",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1106_byokai",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 5e3,
          atk: 0,
          def: 150,
          res: 20,
          ms: 1,
          attackSpeed: 100,
          aspd: 1,
          hpRecoveryPerSec: 0,
          spRecoveryPerSec: 1,
          weight: 0,
          tauntLevel: 0,
          epDamageResistance: 0,
          epResistance: 0,
          stunImmune: false,
          silenceImmune: true,
          sleepImmune: false,
          frozenImmune: false,
          levitateImmune: false,
          lifepoint: 0,
          range: -1,
          talentBlackboard: [
            {
              key: "byokai_buff",
              duration: 60
            }
          ]
        }
      }
    ]
  },
  {
    id: "ro3_ev_4",
    levelId: "level_rogue3_ev-4",
    tags: [
      "rogue_sami"
    ],
    category: null,
    characterLimit: 6,
    initialCost: 20,
    costIncreaseTime: 1,
    code: "ISW-SP",
    name_zh: "英雄无名",
    name_ja: "名もなき英雄",
    name_en: "Nameless_Hero",
    description_zh: "有些强大的萨米人被污染后会扭曲为一个非人的可怖符号肆意播撒虚无。但最具威胁的，却是那些被剥夺一切特征归于平凡的英雄。",
    description_ja: "一部の強大な力を持つサーミ人たちは穢れを受けた後、恐怖の象徴として虚無をまき散らす、人ならざる存在へと姿を変えた。しかし、最も恐ろしいのは、あらゆる特徴を剝ぎ取られ、平凡なものにされてしまった英雄たちだ。",
    description_en: "After being corrupted, some powerful Sami will turn into terrifying symbols of inhumanity, wantonly scattering the seeds of nothingness. But the most threatening are the heroes who have been stripped of all their qualities and reduced to mediocrity.",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: null,
    eliteDesc_ja: null,
    eliteDesc_en: null,
    elite_mods: null,
    routes: null,
    floors: [
      3,
      4,
      5
    ],
    sp_terrain: [
      {
        tileKey: "tile_hole",
        alias: null,
        blackboard: null
      }
    ],
    sp_enemy: null,
    enemies: [
      {
        id: "enemy_1014_rogue",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 65e3,
          atk: 1600,
          def: 600,
          res: 10,
          lifepoint: 2
        }
      },
      {
        id: "enemy_1024_mortar_2",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 5e4,
          atk: 850,
          def: 250,
          lifepoint: 2
        }
      },
      {
        id: "enemy_1047_sagent",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 6e4,
          atk: 700,
          res: 20,
          lifepoint: 2
        }
      },
      {
        id: "enemy_1023_jmage",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 45e3,
          atk: 1e3,
          def: 200,
          lifepoint: 2
        }
      },
      {
        id: "enemy_1003_ncbow_2",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 55e3,
          atk: 1300,
          def: 250,
          aspd: 3,
          lifepoint: 2
        }
      },
      {
        id: "enemy_1049_eagent_2",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 6e4,
          atk: 550,
          def: 450,
          lifepoint: 2
        }
      },
      {
        id: "enemy_1106_byokai",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 5e3,
          atk: 0,
          def: 150,
          res: 20,
          ms: 1,
          attackSpeed: 100,
          aspd: 1,
          hpRecoveryPerSec: 0,
          spRecoveryPerSec: 1,
          weight: 0,
          tauntLevel: 0,
          epDamageResistance: 0,
          epResistance: 0,
          stunImmune: false,
          silenceImmune: true,
          sleepImmune: false,
          frozenImmune: false,
          levitateImmune: false,
          lifepoint: 0,
          range: -1,
          talentBlackboard: [
            {
              key: "byokai_buff",
              duration: 60
            }
          ]
        }
      }
    ]
  },
  {
    id: "ro3_ev_5",
    levelId: "level_rogue3_ev-5",
    tags: [
      "rogue_sami"
    ],
    category: null,
    characterLimit: 6,
    initialCost: 0,
    costIncreaseTime: 1,
    code: "ISW-SP",
    name_zh: "腹背受敌",
    name_ja: "挟み撃ち",
    name_en: "Rock_and_a_Hard_Place",
    description_zh: "你确信这里已经受到了坍缩体的影响。可问题是，你怎么面对那些躲在他人心灵中，看不见摸不着的敌人呢？",
    description_ja: "この場所は間違いなく崩壊体による影響を受けている。しかし、他人の心の中に隠れ、姿も見えず触れることのできない敵に、どのように立ち向かえばよいのだろうか？",
    description_en: "You are sure that this place has been influenced by the Collapsals. But the question is, how do you deal with invisible and intangible enemies hiding within the hearts of others?",
    addInfo_zh: [
      "初始部署费用上限降低至30"
    ],
    addInfo_ja: [
      "初期コスト上限が30になる"
    ],
    addInfo_en: [
      "Starting Max Cost is 30"
    ],
    eliteDesc_zh: null,
    eliteDesc_ja: null,
    eliteDesc_en: null,
    elite_mods: null,
    routes: null,
    floors: [
      3,
      4,
      5
    ],
    sp_terrain: null,
    sp_enemy: null,
    enemies: [
      {
        id: "enemy_3001_upeopl",
        level: 0,
        min_count: 5,
        max_count: 5,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_3004_speople",
        level: 0,
        min_count: 5,
        max_count: 5,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          talentBlackboard: [
            {
              key: "speople_1",
              dead: 200
            }
          ]
        }
      },
      {
        id: "enemy_1313_wdfmr",
        level: 0,
        min_count: 5,
        max_count: 5,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1283_sgkill_2",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1107_uoffcr_2",
        level: 0,
        min_count: 10,
        max_count: 10,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1113_empace",
        level: 0,
        min_count: 4,
        max_count: 4,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1319_wdfmpm",
        level: 0,
        min_count: 3,
        max_count: 3,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1315_wdyjd",
        level: 0,
        min_count: 2,
        max_count: 2,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1279_sgbdg_2",
        level: 0,
        min_count: 2,
        max_count: 2,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1278_sgbow_2",
        level: 0,
        min_count: 5,
        max_count: 5,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1106_byokai",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 5e3,
          atk: 0,
          def: 150,
          res: 20,
          ms: 1,
          attackSpeed: 100,
          aspd: 1,
          hpRecoveryPerSec: 0,
          spRecoveryPerSec: 1,
          weight: 0,
          tauntLevel: 0,
          epDamageResistance: 0,
          epResistance: 0,
          stunImmune: false,
          silenceImmune: true,
          sleepImmune: false,
          frozenImmune: false,
          levitateImmune: false,
          lifepoint: 0,
          range: -1,
          talentBlackboard: [
            {
              key: "byokai_buff",
              duration: 60
            }
          ]
        }
      }
    ]
  },
  {
    id: "ro3_ev_6",
    levelId: "level_rogue3_ev-6",
    tags: [
      "rogue_sami"
    ],
    category: null,
    characterLimit: 6,
    initialCost: 20,
    costIncreaseTime: 1,
    code: "ISW-SP",
    name_zh: "长期试用",
    name_ja: "長期試用",
    name_en: "Long-term_Trial",
    description_zh: "你向坎诺特申请“试用”这些商品到这次探险结束。他好像不太乐意？没关系，你总有办法让他点头。",
    description_ja: "キャノットに、今回の探索が終わるまでの間商品を「試用」させてほしいと頼んでみたが、彼は躊躇しているようだ。しかし問題はないだろう。彼をうなずかせる方法はわかっているはずだ。",
    description_en: "You file an application with Cannot to 'try out' these items until the end of the current expedition. He doesn't seem so willing to agree? No matter, you will always have ways to make him nod.",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: null,
    eliteDesc_ja: null,
    eliteDesc_en: null,
    elite_mods: null,
    routes: null,
    floors: [
      1,
      2,
      3
    ],
    sp_terrain: null,
    sp_enemy: null,
    enemies: [
      {
        id: "enemy_2036_syshop",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1165_duhond",
        level: 0,
        min_count: 5,
        max_count: 5,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1166_dusbr",
        level: 0,
        min_count: 8,
        max_count: 8,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1166_dusbr_2",
        level: 0,
        min_count: 16,
        max_count: 16,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1169_duphlx",
        level: 0,
        min_count: 2,
        max_count: 2,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1169_duphlx_2",
        level: 0,
        min_count: 4,
        max_count: 4,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1174_duholy",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1175_dushdo",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1106_byokai",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 5e3,
          atk: 0,
          def: 150,
          res: 20,
          ms: 1,
          attackSpeed: 100,
          aspd: 1,
          hpRecoveryPerSec: 0,
          spRecoveryPerSec: 1,
          weight: 0,
          tauntLevel: 0,
          epDamageResistance: 0,
          epResistance: 0,
          stunImmune: false,
          silenceImmune: true,
          sleepImmune: false,
          frozenImmune: false,
          levitateImmune: false,
          lifepoint: 0,
          range: -1,
          talentBlackboard: [
            {
              key: "byokai_buff",
              duration: 60
            }
          ]
        }
      },
      {
        id: "enemy_1176_dusocr_2",
        level: 0,
        min_count: 2,
        max_count: 2,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1177_dufrbl_2",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1173_duspfr",
        level: 0,
        min_count: 5,
        max_count: 5,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 1e4,
          def: 600
        }
      }
    ]
  },
  {
    id: "ro3_ev_7",
    levelId: "level_rogue3_ev-7",
    tags: [
      "rogue_sami"
    ],
    category: null,
    characterLimit: 6,
    initialCost: 20,
    costIncreaseTime: 1,
    code: "ISW-SP",
    name_zh: "自然条款",
    name_ja: "自然の掟",
    name_en: "Nature's_Clause",
    description_zh: "你在坎诺特不知情的情况下和他签了个协议，内容就是拿走他所有的货物。毕竟，自然就是弱肉强食，既然到了萨米，坎诺特会答应的。",
    description_ja: "あなたは、キャノットのあずかり知らぬところで、彼の全財産をもらうという契約を結んだ。弱肉強食が大自然の掟である以上、サーミに来ている今、キャノットも同意するほかないだろう。",
    description_en: "You signed an agreement with Cannot without his knowledge, the terms allowing you to take all his goods. After all, nature is all about survival of the fittest, and since we're in Sami, Cannot will agree.",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: null,
    eliteDesc_ja: null,
    eliteDesc_en: null,
    elite_mods: null,
    routes: null,
    floors: [
      4,
      5,
      6
    ],
    sp_terrain: null,
    sp_enemy: null,
    enemies: [
      {
        id: "enemy_2036_syshop",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2046_smwar",
        level: 0,
        min_count: 4,
        max_count: 4,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2043_smsbr",
        level: 0,
        min_count: 5,
        max_count: 5,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1099_nbkght_2",
        level: 0,
        min_count: 8,
        max_count: 8,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1181_napkgt_2",
        level: 0,
        min_count: 1,
        max_count: 4,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1184_cadkgt_2",
        level: 0,
        min_count: 0,
        max_count: 3,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1183_mlasrt_2",
        level: 0,
        min_count: 4,
        max_count: 4,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1104_lfkght_3",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          lifepoint: 2
        }
      },
      {
        id: "enemy_1106_byokai",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 5e3,
          atk: 0,
          def: 150,
          res: 20,
          ms: 1,
          attackSpeed: 100,
          aspd: 1,
          hpRecoveryPerSec: 0,
          spRecoveryPerSec: 1,
          weight: 0,
          tauntLevel: 0,
          epDamageResistance: 0,
          epResistance: 0,
          stunImmune: false,
          silenceImmune: true,
          sleepImmune: false,
          frozenImmune: false,
          levitateImmune: false,
          lifepoint: 0,
          range: -1,
          talentBlackboard: [
            {
              key: "byokai_buff",
              duration: 60
            }
          ]
        }
      }
    ]
  },
  {
    id: "ro3_ev_8",
    levelId: "level_rogue3_ev-8",
    tags: [
      "rogue_sami"
    ],
    category: null,
    characterLimit: 6,
    initialCost: 20,
    costIncreaseTime: 1,
    code: "ISW-SP",
    name_zh: "黄沙幻境",
    name_ja: null,
    name_en: null,
    description_zh: "还没等你反应过来，女妖已把你置入了大风肆虐的沙漠中心。远方，黄金花园与赤红军帐若隐若现。\n<@rolv.rem>场地中有随机方向的<沙尘暴>，但提供<加固装置>用来加固<土石结构>，与开启时敌方隐匿效果失效的<侦测器></>",
    description_ja: null,
    description_en: null,
    addInfo_zh: [
      "沙尘暴 - 方向是随机的（4选1）",
      "效果：暴露在沙尘暴中的我方单位每2秒受到100真实伤害，我方单位攻击力-50%，再部署时间提升至150%，敌方单位的移动速度-40%"
    ],
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: null,
    eliteDesc_ja: null,
    eliteDesc_en: null,
    elite_mods: null,
    routes: null,
    floors: [
      3,
      4,
      5,
      6
    ],
    sp_terrain: null,
    sp_enemy: null,
    enemies: [
      {
        id: "enemy_1135_redman",
        level: 0,
        min_count: 3,
        max_count: 3,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1136_redace",
        level: 0,
        min_count: 6,
        max_count: 6,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1139_hologc",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1140_merhd",
        level: 0,
        min_count: 13,
        max_count: 13,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1106_byokai",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 5e3,
          atk: 0,
          def: 150,
          res: 20,
          ms: 1,
          attackSpeed: 100,
          aspd: 1,
          hpRecoveryPerSec: 0,
          spRecoveryPerSec: 1,
          weight: 0,
          tauntLevel: 0,
          epDamageResistance: 0,
          epResistance: 0,
          stunImmune: false,
          silenceImmune: true,
          sleepImmune: false,
          frozenImmune: false,
          levitateImmune: false,
          lifepoint: 0,
          range: -1,
          talentBlackboard: [
            {
              key: "byokai_buff",
              duration: 60
            }
          ]
        }
      }
    ]
  },
  {
    id: "ro3_ev_9",
    levelId: "level_rogue3_ev-9",
    tags: [
      "rogue_sami"
    ],
    category: null,
    characterLimit: 6,
    initialCost: 20,
    costIncreaseTime: 1,
    code: "ISW-SP",
    name_zh: "亘古仇敌",
    name_ja: null,
    name_en: null,
    description_zh: "古老噩梦从门的另一头显现，而且一来就是三个。",
    description_ja: null,
    description_en: null,
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: null,
    eliteDesc_ja: null,
    eliteDesc_en: null,
    elite_mods: null,
    routes: null,
    floors: [
      4,
      5,
      6
    ],
    sp_terrain: null,
    sp_enemy: null,
    enemies: [
      {
        id: "enemy_1106_byokai",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 5e3,
          atk: 0,
          def: 150,
          res: 20,
          ms: 1,
          attackSpeed: 100,
          aspd: 1,
          hpRecoveryPerSec: 0,
          spRecoveryPerSec: 1,
          weight: 0,
          tauntLevel: 0,
          epDamageResistance: 0,
          epResistance: 0,
          stunImmune: false,
          silenceImmune: true,
          sleepImmune: false,
          frozenImmune: false,
          levitateImmune: false,
          lifepoint: 0,
          range: -1,
          talentBlackboard: [
            {
              key: "byokai_buff",
              duration: 60
            }
          ]
        }
      },
      {
        id: "enemy_2003_rockman",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2004_balloon",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2005_axetro",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1016_diaman",
        level: 0,
        min_count: 0,
        max_count: 10,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1178_dscorp_2",
        level: 0,
        min_count: 0,
        max_count: 10,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1100_scorpn_2",
        level: 0,
        min_count: 0,
        max_count: 10,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1108_uterer_2",
        level: 0,
        min_count: 0,
        max_count: 16,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1270_nhstlk_2",
        level: 0,
        min_count: 0,
        max_count: 8,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1335_bldrat_2",
        level: 0,
        min_count: 0,
        max_count: 24,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      }
    ]
  },
  {
    id: "ro3_e_1_1",
    levelId: "level_rogue3_1-1",
    tags: [
      "rogue_sami"
    ],
    category: null,
    characterLimit: 6,
    initialCost: 40,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "死囚之夜",
    name_ja: "死刑囚の夜",
    name_en: "Prisoners'_Night",
    description_zh: "无价值的哥伦比亚死囚脚戴镣铐沉入萨米的泥沼中，在那之后，沼泽中便时常传来镣铐拖地的诡异声响。\n<@rolv.rem>场地中有阻挡敌人的<城防路障></>",
    description_ja: "無価値とされたクルビアの死刑囚たちは、足かせを嵌められたままサーミの泥沼へと沈んでいった。それ以降、沼の中から時折足かせを引きずるような不気味な音が聞こえてくる。\n<@rolv.rem>戦場に敵をブロックできる<都市防衛柵>が出現</>",
    description_en: "The worthless, shackled Columbian death-row inmates sink into Sami's swamp. Afterwards, the strange sound of chains being dragged on the ground can be often heard in the wetlands.\n<@rolv.rem><Defensive Barricades> that can block the enemy's route are present on the field</>",
    addInfo_zh: [
      "【路网】效果: 额外出现3个老练囚犯"
    ],
    addInfo_ja: [
      "「導きの網織」: 追加で<重罪囚人>3体が出現する"
    ],
    addInfo_en: [
      "Routeweave Net: Additional 3 <Seasoned Prisoner> appear"
    ],
    eliteDesc_zh: [
      "所有敌方单位的攻击力，防御力+20%，生命值+70%",
      "老练囚犯被替换为拳手囚犯"
    ],
    eliteDesc_ja: [
      "敵全員の攻撃力、防御力+20%、最大HP+70%",
      "<重罪囚人>が<拳闘士囚人>に替わる"
    ],
    eliteDesc_en: [
      "All enemy units have +20% ATK, +20% DEF, and +70% Max HP",
      "All <Seasoned Prisoner> are replaced by <Pugilist Prisoner>"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          hp: 1.7,
          atk: 1.2,
          def: 1.2
        }
      }
    ],
    routes: null,
    floors: [
      1,
      2
    ],
    sp_terrain: [
      {
        tileKey: "tile_hole",
        alias: null,
        blackboard: null
      }
    ],
    sp_enemy: {
      normal: 16,
      elite: null,
      fixed: true
    },
    enemies: [
      {
        id: "enemy_2001_duckmi",
        level: 0,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 0,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2034_sythef",
        level: 0,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_1116_liprr",
        level: 0,
        min_count: 7,
        max_count: 12,
        elite_min_count: 7,
        elite_max_count: 12,
        overwrittenData: {
          atk: 240
        }
      },
      {
        id: "enemy_1116_liprr_2",
        level: 0,
        min_count: 2,
        max_count: 7,
        elite_min_count: 0,
        elite_max_count: 5,
        overwrittenData: null
      },
      {
        id: "enemy_1118_lidbox",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: 3,
        elite_max_count: 3,
        overwrittenData: null
      },
      {
        id: "enemy_2059_smbox",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1106_byokai",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 5e3,
          atk: 0,
          def: 150,
          res: 20,
          ms: 1,
          attackSpeed: 100,
          aspd: 1,
          hpRecoveryPerSec: 0,
          spRecoveryPerSec: 1,
          weight: 0,
          tauntLevel: 0,
          epDamageResistance: 0,
          epResistance: 0,
          stunImmune: false,
          silenceImmune: true,
          sleepImmune: false,
          frozenImmune: false,
          levitateImmune: false,
          lifepoint: 0,
          range: -1,
          talentBlackboard: [
            {
              key: "byokai_buff",
              duration: 60
            }
          ]
        }
      }
    ]
  },
  {
    id: "ro3_e_1_2",
    levelId: "level_rogue3_1-2",
    tags: [
      "rogue_sami"
    ],
    category: null,
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "度假村冤魂",
    name_ja: "リゾートの怨霊",
    name_en: "Ghosts_of_the_Resort",
    description_zh: "哥哥溺亡在浴缸里，弟弟被一颗苹果噎死，看门的佣兵被荆棘刺穿，这栋屋子就此荒废。",
    description_ja: "兄は浴槽で溺れ死に、弟はリンゴをのどに詰まらせて命を落とし、門番は棘に貫かれ――以来、この屋敷は廃墟と化した。",
    description_en: "The elder brother drowned in the bathtub, the younger brother choked to death on an apple, the mercenary guarding the door was impaled by thorns, and this house was abandoned.",
    addInfo_zh: [
      "【路网】效果: 额外出现1个呼啸骑士团学徒，5个源石虫"
    ],
    addInfo_ja: [
      "「導きの網織」の効果: 追加で<ロアー見習い騎士>1体と<オリジムシ>5体が出現する"
    ],
    addInfo_en: [
      "Routeweave Net: Additional 1 <Roar Knightclub Trainee> and 5 <Originium Slug> appear"
    ],
    eliteDesc_zh: [
      "所有敌方单位的攻击力，防御力+20%，生命值+60%",
      "1个萨卡兹魔剑士被替换为萨卡兹积怨者"
    ],
    eliteDesc_ja: [
      "敵全員の攻撃力、防御力+20%、最大HP+60%",
      "<サルカズ魔剣士>1体が<サルカズ呪術師>に替わる"
    ],
    eliteDesc_en: [
      "All enemy units have +20% ATK, +20% DEF, and +60% Max HP",
      "1 <Sarkaz Bladeweaver> is replaced by <Sarkaz Grudgebearer>"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          atk: 1.2,
          def: 1.2,
          hp: 1.6
        }
      }
    ],
    routes: null,
    floors: [
      1,
      2
    ],
    sp_terrain: null,
    sp_enemy: {
      normal: 32,
      elite: null,
      fixed: true
    },
    enemies: [
      {
        id: "enemy_1007_slime",
        level: 0,
        min_count: 16,
        max_count: 16,
        elite_min_count: 16,
        elite_max_count: 16,
        overwrittenData: null
      },
      {
        id: "enemy_1007_slime_2",
        level: 0,
        min_count: 11,
        max_count: 11,
        elite_min_count: 11,
        elite_max_count: 11,
        overwrittenData: null
      },
      {
        id: "enemy_2059_smbox",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2001_duckmi",
        level: 0,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 0,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2034_sythef",
        level: 0,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_1075_dmgswd",
        level: 0,
        min_count: 2,
        max_count: 2,
        elite_min_count: 1,
        elite_max_count: 1,
        overwrittenData: {
          atk: 300
        }
      },
      {
        id: "enemy_1101_plkght",
        level: 0,
        min_count: 2,
        max_count: 2,
        elite_min_count: 2,
        elite_max_count: 2,
        overwrittenData: null
      },
      {
        id: "enemy_1074_dbskar",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: 1,
        elite_max_count: 1,
        overwrittenData: {
          hp: 12e3,
          atk: 500
        }
      },
      {
        id: "enemy_1106_byokai",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 5e3,
          atk: 0,
          def: 150,
          res: 20,
          ms: 1,
          attackSpeed: 100,
          aspd: 1,
          hpRecoveryPerSec: 0,
          spRecoveryPerSec: 1,
          weight: 0,
          tauntLevel: 0,
          epDamageResistance: 0,
          epResistance: 0,
          stunImmune: false,
          silenceImmune: true,
          sleepImmune: false,
          frozenImmune: false,
          levitateImmune: false,
          lifepoint: 0,
          range: -1,
          talentBlackboard: [
            {
              key: "byokai_buff",
              duration: 60
            }
          ]
        }
      }
    ]
  },
  {
    id: "ro3_e_1_3",
    levelId: "level_rogue3_1-3",
    tags: [
      "rogue_sami"
    ],
    category: null,
    characterLimit: 6,
    initialCost: 15,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "苔手",
    name_ja: "苔の手形",
    name_en: "Hands_of_Moss",
    description_zh: "一只只苔藓碎屑组成的手印出现在墙壁、树干与衣物上。叙拉古黑手党最喜欢的印记，以一种独特的形式出现在了萨米。",
    description_ja: "苔のかけらでできた手形が、壁や木の幹、そして衣服についている。シラクーザマフィアが好んで用いるこのマークは、こうした独特な形でサーミに現れた。",
    description_en: "Handprints made of moss appear on walls, tree trunks, and clothing. The Siracusan Mafia's favorite way of leaving their mark has shown up in Sami, in a unique form.",
    addInfo_zh: [
      "【路网】效果: 额外出现2个家族弩手"
    ],
    addInfo_ja: [
      "「導きの網織」: 追加で<マフィアの狙撃手>2体が出現する"
    ],
    addInfo_en: [
      "Routeweave Net: Additional 2 <Famiglia Crossbowman> appear"
    ],
    eliteDesc_zh: [
      "所有敌方单位的攻击力+10%，防御力+20%，生命值+15%",
      "屠夫被替换为屠宰老手"
    ],
    eliteDesc_ja: [
      "敵全員の攻撃力+10%、防御力+20%、最大HP+15%",
      "<ブッチャー>が<凶悪ブッチャー>に替わる"
    ],
    eliteDesc_en: [
      "All enemy units have +10% ATK, +20% DEF, and +15% Max HP",
      "All <Butcher> are replaced by <Veteran Butcher>"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          atk: 1.1,
          def: 1.2,
          hp: 1.15
        }
      }
    ],
    routes: null,
    floors: [
      1,
      2
    ],
    sp_terrain: [
      {
        tileKey: "tile_hole",
        alias: null,
        blackboard: null
      }
    ],
    sp_enemy: {
      normal: 22,
      elite: null,
      fixed: false
    },
    enemies: [
      {
        id: "enemy_1007_slime",
        level: 0,
        min_count: 7,
        max_count: 8,
        elite_min_count: 7,
        elite_max_count: 8,
        overwrittenData: null
      },
      {
        id: "enemy_1277_sgman",
        level: 0,
        min_count: 6,
        max_count: 8,
        elite_min_count: 6,
        elite_max_count: 8,
        overwrittenData: null
      },
      {
        id: "enemy_1278_sgbow",
        level: 0,
        min_count: 2,
        max_count: 2,
        elite_min_count: 2,
        elite_max_count: 2,
        overwrittenData: null
      },
      {
        id: "enemy_1277_sgman_2",
        level: 0,
        min_count: 0,
        max_count: 2,
        elite_min_count: 0,
        elite_max_count: 2,
        overwrittenData: null
      },
      {
        id: "enemy_2001_duckmi",
        level: 0,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 0,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2034_sythef",
        level: 0,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2059_smbox",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1034_laxe",
        level: 0,
        min_count: 3,
        max_count: 3,
        elite_min_count: 1,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_1034_laxe_2",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: 2,
        elite_max_count: 2,
        overwrittenData: null
      },
      {
        id: "enemy_1106_byokai",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 5e3,
          atk: 0,
          def: 150,
          res: 20,
          ms: 1,
          attackSpeed: 100,
          aspd: 1,
          hpRecoveryPerSec: 0,
          spRecoveryPerSec: 1,
          weight: 0,
          tauntLevel: 0,
          epDamageResistance: 0,
          epResistance: 0,
          stunImmune: false,
          silenceImmune: true,
          sleepImmune: false,
          frozenImmune: false,
          levitateImmune: false,
          lifepoint: 0,
          range: -1,
          talentBlackboard: [
            {
              key: "byokai_buff",
              duration: 60
            }
          ]
        }
      }
    ]
  },
  {
    id: "ro3_e_1_4",
    levelId: "level_rogue3_1-4",
    tags: [
      "rogue_sami"
    ],
    category: null,
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "待宰的兽群",
    name_ja: "死を待つ獣の群れ",
    name_en: "Beasts_Awaiting_Slaughter",
    description_zh: "不知何时，兽群的首领被替换成了怪异的人类，野兽们害怕得瑟瑟发抖，但仍对领头人的命令言听计从。",
    description_ja: "いつの間にやら群れのリーダーが奇妙な人間に入れ替わられ、獣たちは恐怖に震えながらもその命令に従っている。",
    description_en: "At some point, the leader of the beast pack was replaced by a monster of a human. The beasts tremble with fear, but still they obey the boss's orders.",
    addInfo_zh: [
      "【路网】效果: 额外出现1个岩冠兽"
    ],
    addInfo_ja: [
      "「導きの網織」: 追加で<イワカムリ>1体が出現する"
    ],
    addInfo_en: [
      "Routeweave Net: Additional 1 <Basorobeast> appear"
    ],
    eliteDesc_zh: [
      "所有敌方单位的攻击力+50%，防御力+20%，生命值+40%",
      "出现更多的角兽"
    ],
    eliteDesc_ja: [
      "敵全員の攻撃力+50%、防御力+20%、最大HP+40%",
      "追加で4体の<ツノシゲミ>が出現する"
    ],
    eliteDesc_en: [
      "All enemy units have +50% ATK, +20% DEF, and +40% Max HP",
      "Additional 4 <Hornbeast> appears"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          atk: 1.5,
          def: 1.2,
          hp: 1.4
        }
      }
    ],
    routes: null,
    floors: [
      1,
      2
    ],
    sp_terrain: [
      {
        tileKey: "tile_hole",
        alias: null,
        blackboard: null
      }
    ],
    sp_enemy: {
      normal: 22,
      elite: 26,
      fixed: true
    },
    enemies: [
      {
        id: "enemy_2001_duckmi",
        level: 0,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 0,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2034_sythef",
        level: 0,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2059_smbox",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2043_smsbr",
        level: 0,
        min_count: 6,
        max_count: 6,
        elite_min_count: 6,
        elite_max_count: 6,
        overwrittenData: null
      },
      {
        id: "enemy_1307_mhrhcr",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: 1,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_1303_mhshep",
        level: 0,
        min_count: 4,
        max_count: 4,
        elite_min_count: 8,
        elite_max_count: 8,
        overwrittenData: {
          hp: 4e3
        }
      },
      {
        id: "enemy_1106_byokai",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 5e3,
          atk: 0,
          def: 150,
          res: 20,
          ms: 1,
          attackSpeed: 100,
          aspd: 1,
          hpRecoveryPerSec: 0,
          spRecoveryPerSec: 1,
          weight: 0,
          tauntLevel: 0,
          epDamageResistance: 0,
          epResistance: 0,
          stunImmune: false,
          silenceImmune: true,
          sleepImmune: false,
          frozenImmune: false,
          levitateImmune: false,
          lifepoint: 0,
          range: -1,
          talentBlackboard: [
            {
              key: "byokai_buff",
              duration: 60
            }
          ]
        }
      }
    ]
  },
  {
    id: "ro3_e_1_5",
    levelId: "level_rogue3_1-5",
    tags: [
      "rogue_sami"
    ],
    category: null,
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "事不过四",
    name_ja: null,
    name_en: null,
    description_zh: "三之后，五之前，一个数字在这里成了禁忌，一旦脱口而出，人们便会莫名地恼怒，进而宣泄暴力。",
    description_ja: null,
    description_en: null,
    addInfo_zh: [
      "【路网】效果: 额外出现2个深池方阵指挥官"
    ],
    addInfo_ja: [
      "「導きの網織」: 追加で<ダブリン方陣指揮官>2体が出現する"
    ],
    addInfo_en: [
      "Routeweave Net: Additional 2 <Dublinn Phalanx Commander> appear"
    ],
    eliteDesc_zh: [
      "所有敌方单位的攻击力+40%，防御力+40%，生命值+20%",
      "深池方阵战士被替换为深池方阵指挥官"
    ],
    eliteDesc_ja: [
      "敵全員の攻撃力、防御力+40%、最大HP+20%",
      "<ダブリン方陣戦士>が<ダブリン方陣指揮官>に替わる"
    ],
    eliteDesc_en: [
      "All enemy units have +40% ATK, +40% DEF, and +20% Max HP",
      "All <Dublinn Phalanx Infantry> are replaced by <Dublinn Phalanx Commander>"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          atk: 1.4,
          def: 1.4,
          hp: 1.2
        }
      }
    ],
    routes: null,
    floors: [
      1,
      2
    ],
    sp_terrain: [
      {
        tileKey: "tile_hole",
        alias: null,
        blackboard: null
      }
    ],
    sp_enemy: {
      normal: 13,
      elite: 13,
      fixed: true
    },
    enemies: [
      {
        id: "enemy_2001_duckmi",
        level: 0,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 0,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2034_sythef",
        level: 0,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2059_smbox",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1106_byokai",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 5e3,
          atk: 0,
          def: 150,
          res: 20,
          ms: 1,
          attackSpeed: 100,
          aspd: 1,
          hpRecoveryPerSec: 0,
          spRecoveryPerSec: 1,
          weight: 0,
          tauntLevel: 0,
          epDamageResistance: 0,
          epResistance: 0,
          stunImmune: false,
          silenceImmune: true,
          sleepImmune: false,
          frozenImmune: false,
          levitateImmune: false,
          lifepoint: 0,
          range: -1,
          talentBlackboard: [
            {
              key: "byokai_buff",
              duration: 60
            }
          ]
        }
      },
      {
        id: "enemy_1000_gopro_2",
        level: 0,
        min_count: 3,
        max_count: 3,
        elite_min_count: 3,
        elite_max_count: 3,
        overwrittenData: null
      },
      {
        id: "enemy_1169_duphlx",
        level: 0,
        min_count: 2,
        max_count: 6,
        elite_min_count: 0,
        elite_max_count: 4,
        overwrittenData: {
          def: 240
        }
      },
      {
        id: "enemy_1169_duphlx_2",
        level: 0,
        min_count: 1,
        max_count: 5,
        elite_min_count: 3,
        elite_max_count: 7,
        overwrittenData: {
          def: 320
        }
      },
      {
        id: "enemy_1168_dumage",
        level: 0,
        min_count: 1,
        max_count: 2,
        elite_min_count: 1,
        elite_max_count: 2,
        overwrittenData: null
      },
      {
        id: "enemy_1036_amraoe",
        level: 0,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: {
          hp: 5500,
          def: 350
        }
      }
    ]
  },
  {
    id: "ro3_e_2_1",
    levelId: "level_rogue3_2-1",
    tags: [
      "rogue_sami"
    ],
    category: null,
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "没有尽头的路",
    name_ja: "終点なき道",
    name_en: "Path_with_No_End",
    description_zh: "外乡人很难分辨萨米的场景，于是他们在自认为相同的地方一遍又一遍走过，再也找不到出口。",
    description_ja: "異郷から訪れた者にとって、サーミの景色を見分けるのは至難の業だ。彼らは幾度も同じ場所を通り、やがては出口を見失ってしまう。",
    description_en: "Outsiders find it hard to distinguish Sami's environments, so they walk circles through what they believe are the same areas over and over, never finding an exit.",
    addInfo_zh: [
      "【路网】效果: 额外出现5个破阵者"
    ],
    addInfo_ja: [
      "「導きの網織」: 追加で<切り込み兵>5体が出現する"
    ],
    addInfo_en: [
      "Routeweave Net: Additional 5 <Breaker> appear"
    ],
    eliteDesc_zh: [
      "所有敌方单位的防御力+20%，生命值+40%，移动速度+40%"
    ],
    eliteDesc_ja: [
      "敵全員の防御力+20%、最大HP+40%、移動速度+40%"
    ],
    eliteDesc_en: [
      "All enemy units have +20% DEF, +40% Max HP and +40% Movespeed"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          hp: 1.4,
          def: 1.2,
          ms: 1.4
        }
      }
    ],
    routes: null,
    floors: [
      2
    ],
    sp_terrain: null,
    sp_enemy: {
      normal: 33,
      elite: null,
      fixed: false
    },
    enemies: [
      {
        id: "enemy_2001_duckmi",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2034_sythef",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2059_smbox",
        level: 1,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1007_slime_3",
        level: 0,
        min_count: 14,
        max_count: 14,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1111_ucommd",
        level: 0,
        min_count: 1,
        max_count: 3,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1049_eagent",
        level: 0,
        min_count: 0,
        max_count: 5,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1047_sagent",
        level: 0,
        min_count: 4,
        max_count: 4,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1039_breakr",
        level: 0,
        min_count: 0,
        max_count: 13,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1106_byokai",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 5e3,
          atk: 0,
          def: 150,
          res: 20,
          ms: 1,
          attackSpeed: 100,
          aspd: 1,
          hpRecoveryPerSec: 0,
          spRecoveryPerSec: 1,
          weight: 0,
          tauntLevel: 0,
          epDamageResistance: 0,
          epResistance: 0,
          stunImmune: false,
          silenceImmune: true,
          sleepImmune: false,
          frozenImmune: false,
          levitateImmune: false,
          lifepoint: 0,
          range: -1,
          talentBlackboard: [
            {
              key: "byokai_buff",
              duration: 60
            }
          ]
        }
      }
    ]
  },
  {
    id: "ro3_e_2_2",
    levelId: "level_rogue3_2-2",
    tags: [
      "rogue_sami"
    ],
    category: null,
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "低空机动",
    name_ja: "低空機動",
    name_en: "Low-Altitude_Maneuvering",
    description_zh: "这片树林被改造成了低空飞行实验场，该地的负责人热情邀请了你和你的科考队员参加这场演习。\n<@rolv.rem>场地中有喷出气流的<源石流发生装置></>",
    description_ja: "かつて森だったこの場所には、低空飛行実験場が建てられた。あなたと観測員たちを演習に招待してくれた現場の責任者は、温かく歓迎してくれている。\n<@rolv.rem>戦場に気流を起こす<源石気流発生装置>が出現</>",
    description_en: "This patch of forest has been transformed into a low-altitude flight test site, and the person in charge warmly invites you and your research team to participate in their maneuvering exercise.\n<@rolv.rem><Originium Jetstreams> that generate airflow currents are present on the field</>",
    addInfo_zh: [
      "【路网】效果: 额外出现2个弧光镜卫"
    ],
    addInfo_ja: [
      "「導きの網織」: 追加で<アーク鏡衛>2体が出現する"
    ],
    addInfo_en: [
      "Routeweave Net: Additional 2 <Arc Screenguard> appear"
    ],
    eliteDesc_zh: [
      "所有敌方单位的攻击力，生命值+20%",
      "弧光突击队被替换为弧光突击队队长"
    ],
    eliteDesc_ja: [
      "敵全員の攻撃力、最大HP+20%",
      "<アーク突撃隊隊員>が<アーク突撃隊隊長>に替わる"
    ],
    eliteDesc_en: [
      "All enemy units have +20% ATK and +20% Max HP",
      "All <Arc Commando> are replaced by <Arc Commando Captain>"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          hp: 1.2,
          atk: 1.2
        }
      }
    ],
    routes: null,
    floors: [
      2
    ],
    sp_terrain: [
      {
        tileKey: "tile_hole",
        alias: null,
        blackboard: null
      }
    ],
    sp_enemy: {
      normal: 23,
      elite: null,
      fixed: true
    },
    enemies: [
      {
        id: "enemy_2001_duckmi",
        level: 0,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 0,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2034_sythef",
        level: 0,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_1325_cbgpro",
        level: 0,
        min_count: 15,
        max_count: 15,
        elite_min_count: 15,
        elite_max_count: 15,
        overwrittenData: null
      },
      {
        id: "enemy_1327_cbrokt",
        level: 0,
        min_count: 6,
        max_count: 6,
        elite_min_count: 6,
        elite_max_count: 6,
        overwrittenData: null
      },
      {
        id: "enemy_1327_cbrokt_2",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          atk: 400
        }
      },
      {
        id: "enemy_1329_cbshld",
        level: 0,
        min_count: 3,
        max_count: 3,
        elite_min_count: 3,
        elite_max_count: 3,
        overwrittenData: null
      },
      {
        id: "enemy_2059_smbox",
        level: 1,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1106_byokai",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 5e3,
          atk: 0,
          def: 150,
          res: 20,
          ms: 1,
          attackSpeed: 100,
          aspd: 1,
          hpRecoveryPerSec: 0,
          spRecoveryPerSec: 1,
          weight: 0,
          tauntLevel: 0,
          epDamageResistance: 0,
          epResistance: 0,
          stunImmune: false,
          silenceImmune: true,
          sleepImmune: false,
          frozenImmune: false,
          levitateImmune: false,
          lifepoint: 0,
          range: -1,
          talentBlackboard: [
            {
              key: "byokai_buff",
              duration: 60
            }
          ]
        }
      }
    ]
  },
  {
    id: "ro3_e_2_3",
    levelId: "level_rogue3_2-3",
    tags: [
      "rogue_sami"
    ],
    category: null,
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "幽影与鬼魅",
    name_ja: "彷徨う影",
    name_en: "Shadows_With_Ghosts",
    description_zh: "林中留下的投影装置偶尔会映照出一些熟悉的幻影，没有人注意到，一个个影子正走出装置，在森林里徒步。",
    description_ja: "森に放置された投影装置は時折見覚えのある幻影を映し出す。そんな幻影たちが装置から抜け出し、森の中を彷徨い歩いていることに、まだ誰も気づいてはいない。",
    description_en: "The projector left behind in the forest occasionally reflects a few familiar looking phantoms, but no one notices, and one by one the shadows walk out of the device and into the forest.",
    addInfo_zh: [
      "【路网】效果: 额外出现4个染污躯壳"
    ],
    addInfo_ja: [
      "「導きの網織」: 追加で<穢された亡骸>4体が出現する"
    ],
    addInfo_en: [
      "Routeweave Net: Additional 4 <Tainted Carcass> appear"
    ],
    eliteDesc_zh: [
      "所有敌方单位的攻击力+50%，防御力+20%，生命值+50%",
      "全息幻影的生命值额外+100%",
      "额外出现1个“红标”渗透者"
    ],
    eliteDesc_ja: [
      "敵全員の攻撃力+50%、防御力+20%、最大HP+50%",
      "<戦術ホログラム>の最大HPがさらに+100%",
      "追加で1体の<「レッドラベル」浸透者>が出現する"
    ],
    eliteDesc_en: [
      "All enemy units have +50% ATK, +20% DEF and +50% Max HP",
      "All <Holographic Mirage> have additional +100% Max HP",
      "Additional 1 <'Redmark' Infiltrator> appears"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          atk: 1.5,
          def: 1.2,
          hp: 1.5
        }
      },
      {
        targets: [
          "enemy_1139_hologc"
        ],
        mods: {
          hp: 2
        }
      }
    ],
    routes: null,
    floors: [
      2
    ],
    sp_terrain: [
      {
        tileKey: "tile_hole",
        alias: null,
        blackboard: null
      }
    ],
    sp_enemy: {
      normal: 30,
      elite: 31,
      fixed: false
    },
    enemies: [
      {
        id: "enemy_2001_duckmi",
        level: 0,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 0,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2034_sythef",
        level: 0,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_1002_nsabr",
        level: 0,
        min_count: 8,
        max_count: 13,
        elite_min_count: 8,
        elite_max_count: 13,
        overwrittenData: {
          hp: 2e3
        }
      },
      {
        id: "enemy_2043_smsbr",
        level: 0,
        min_count: 14,
        max_count: 17,
        elite_min_count: 14,
        elite_max_count: 17,
        overwrittenData: null
      },
      {
        id: "enemy_1136_redace",
        level: 0,
        min_count: 2,
        max_count: 2,
        elite_min_count: 3,
        elite_max_count: 3,
        overwrittenData: {
          atk: 300
        }
      },
      {
        id: "enemy_1139_hologc",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2059_smbox",
        level: 1,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1106_byokai",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 5e3,
          atk: 0,
          def: 150,
          res: 20,
          ms: 1,
          attackSpeed: 100,
          aspd: 1,
          hpRecoveryPerSec: 0,
          spRecoveryPerSec: 1,
          weight: 0,
          tauntLevel: 0,
          epDamageResistance: 0,
          epResistance: 0,
          stunImmune: false,
          silenceImmune: true,
          sleepImmune: false,
          frozenImmune: false,
          levitateImmune: false,
          lifepoint: 0,
          range: -1,
          talentBlackboard: [
            {
              key: "byokai_buff",
              duration: 60
            }
          ]
        }
      }
    ]
  },
  {
    id: "ro3_e_2_4",
    levelId: "level_rogue3_2-4",
    tags: [
      "rogue_sami"
    ],
    category: null,
    characterLimit: 6,
    initialCost: 0,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "违和",
    name_ja: "違和感",
    name_en: "Unwell",
    description_zh: "据说，队伍中总会有那么个不被在意的人，队伍在山林里多走上几圈，他就会被悄悄替换，而队友们对此一无所知。\n<@rolv.rem>场地中有提供费用及上限的<街头应急储备></>",
    description_ja: "部隊には影の薄い人物が一人は必ずいるものだ。たとえ隊員たちが山中を何周か歩いた後、その人物が知らぬ間に誰かと入れ替わったとしても、ほかの隊員は気付かないだろう。\n<@rolv.rem>戦場にコストとコスト上限が増加する<街の緊急用備蓄>が出現</>",
    description_en: "It's said that there will always be someone on the team who the others don't care for, and they will be quietly replaced as the squad walks a few extra rounds through the mountain forest, their teammates completely unaware.\n<@rolv.rem><Roadside Emergency Reserves> that grant Max DP are present on the field</>",
    addInfo_zh: [
      "初始部署费用上限降低至30",
      "【路网】效果: 额外出现1个萨卡兹悖谬暴虐兵"
    ],
    addInfo_ja: [
      "初期コスト上限が30になる",
      "「導きの網織」: 追加で<サルカズ悖理暴虐兵>1体が出現する"
    ],
    addInfo_en: [
      "Starting Max Cost is 30",
      "Routeweave Net: Additional 1 <Sarkaz Absurdist Tyrant> appear"
    ],
    eliteDesc_zh: [
      "所有敌方单位的攻击力+10%，防御力+20%，生命值+20%",
      "前期破次额外出现1个叛乱煽动者",
      "最终破次的6个染污躯壳被替换为4个寻路密探"
    ],
    eliteDesc_ja: [
      "敵全員の攻撃力+10%、防御力+20%、最大HP+20%",
      "最初のウェーブに<「叛乱煽动者」1体が出現する",
      "最終ウェーブの<穢された亡骸>6体が<偵察密偵>4体に替わる"
    ],
    eliteDesc_en: [
      "All enemy units have +10% ATK, +20% DEF and +20% Max HP",
      "Additional 1 <叛乱煽动者> appears at the start",
      "Last Wave's 6 <Tainted Carcass> are replaced by 4 <Pathfinder Spy>"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          atk: 1.1,
          def: 1.2,
          hp: 1.2
        }
      }
    ],
    routes: null,
    floors: [
      2
    ],
    sp_terrain: null,
    sp_enemy: {
      normal: 50,
      elite: 49,
      fixed: true
    },
    enemies: [
      {
        id: "enemy_1314_wdnjd",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: 4,
        elite_max_count: 4,
        overwrittenData: null
      },
      {
        id: "enemy_1313_wdfmr",
        level: 0,
        min_count: 30,
        max_count: 30,
        elite_min_count: 30,
        elite_max_count: 30,
        overwrittenData: null
      },
      {
        id: "enemy_1315_wdyjd",
        level: 0,
        min_count: 3,
        max_count: 3,
        elite_min_count: 3,
        elite_max_count: 3,
        overwrittenData: null
      },
      {
        id: "enemy_1319_wdfmpm",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: 1,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2043_smsbr",
        level: 0,
        min_count: 15,
        max_count: 15,
        elite_min_count: 9,
        elite_max_count: 9,
        overwrittenData: null
      },
      {
        id: "enemy_1320_wdrrl",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: 1,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2001_duckmi",
        level: 0,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 0,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2034_sythef",
        level: 0,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2059_smbox",
        level: 1,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1106_byokai",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 5e3,
          atk: 0,
          def: 150,
          res: 20,
          ms: 1,
          attackSpeed: 100,
          aspd: 1,
          hpRecoveryPerSec: 0,
          spRecoveryPerSec: 1,
          weight: 0,
          tauntLevel: 0,
          epDamageResistance: 0,
          epResistance: 0,
          stunImmune: false,
          silenceImmune: true,
          sleepImmune: false,
          frozenImmune: false,
          levitateImmune: false,
          lifepoint: 0,
          range: -1,
          talentBlackboard: [
            {
              key: "byokai_buff",
              duration: 60
            }
          ]
        }
      }
    ]
  },
  {
    id: "ro3_e_2_5",
    levelId: "level_rogue3_2-5",
    tags: [
      "rogue_sami"
    ],
    category: null,
    characterLimit: 6,
    initialCost: 17,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "虫虫别回头",
    name_ja: "這い寄る崩壊",
    name_en: "Don't_Turn_Around,_Sluggies",
    description_zh: "源石虫们向前爬行，完全不知道自己背后有什么东西正跟着它们一起前行。",
    description_ja: "後ろに何かがついて来ていることに全く気付かず、オリジムシたちはひたすら前へと進んでいる。",
    description_en: "The Originium slugs crawl forward, completely unaware that something is following them from behind.",
    addInfo_zh: [
      "【路网】效果: 额外出现1个护盾高阶术师"
    ],
    addInfo_ja: [
      "「導きの網織」: 追加で<上級バリア術師>1体が出現する"
    ],
    addInfo_en: [
      "Routeweave Net: Additional 1 <Shielded Senior Caster> appear"
    ],
    eliteDesc_zh: [
      "所有敌方单位的攻击力，防御力，生命值+15%",
      "4个染污躯壳被替换为4个幽灵组长"
    ],
    eliteDesc_ja: [
      "敵全員の攻撃力、防御力、最大HP+15%",
      "<穢された亡骸>4体が<ゴースト隊長>4体に替わる"
    ],
    eliteDesc_en: [
      "All enemy units have +15% ATK, +15% DEF and +15% Max HP",
      "4 <Tainted Carcass> are replaced by 4 <Wraith Leader> "
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          atk: 1.15,
          def: 1.15,
          hp: 1.15
        }
      }
    ],
    routes: null,
    floors: [
      2
    ],
    sp_terrain: null,
    sp_enemy: {
      normal: 20,
      elite: null,
      fixed: false
    },
    enemies: [
      {
        id: "enemy_2043_smsbr",
        level: 0,
        min_count: 9,
        max_count: 9,
        elite_min_count: 5,
        elite_max_count: 5,
        overwrittenData: null
      },
      {
        id: "enemy_2044_smwiz",
        level: 0,
        min_count: 3,
        max_count: 3,
        elite_min_count: 3,
        elite_max_count: 3,
        overwrittenData: null
      },
      {
        id: "enemy_1021_bslime",
        level: 0,
        min_count: 4,
        max_count: 6,
        elite_min_count: 4,
        elite_max_count: 6,
        overwrittenData: null
      },
      {
        id: "enemy_1021_bslime_2",
        level: 0,
        min_count: 0,
        max_count: 2,
        elite_min_count: 0,
        elite_max_count: 2,
        overwrittenData: null
      },
      {
        id: "enemy_2001_duckmi",
        level: 0,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 0,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2034_sythef",
        level: 0,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_1036_amraoe",
        level: 0,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2059_smbox",
        level: 1,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1106_byokai",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 5e3,
          atk: 0,
          def: 150,
          res: 20,
          ms: 1,
          attackSpeed: 100,
          aspd: 1,
          hpRecoveryPerSec: 0,
          spRecoveryPerSec: 1,
          weight: 0,
          tauntLevel: 0,
          epDamageResistance: 0,
          epResistance: 0,
          stunImmune: false,
          silenceImmune: true,
          sleepImmune: false,
          frozenImmune: false,
          levitateImmune: false,
          lifepoint: 0,
          range: -1,
          talentBlackboard: [
            {
              key: "byokai_buff",
              duration: 60
            }
          ]
        }
      },
      {
        id: "enemy_1026_aghost",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: 4,
        elite_max_count: 4,
        overwrittenData: {
          hp: 8e3
        }
      }
    ]
  },
  {
    id: "ro3_e_2_6",
    levelId: "level_rogue3_2-6",
    tags: [
      "rogue_sami"
    ],
    category: "combat_ops",
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "还之彼身",
    name_ja: null,
    name_en: null,
    description_zh: "多年以前，外乡人以重型机械毁坏这里的树林；多年以后，外乡人被这里轰鸣的幻象吓得落荒而逃。\n<@rolv.rem>场地中有被摧毁时扣除目标生命值的<指挥终端></>",
    description_ja: null,
    description_en: null,
    addInfo_zh: [
      "【路网】效果: 额外出现2个逐腐兽"
    ],
    addInfo_ja: [
      "「導きの網織」: 追加で<逐腐獣>2体が出現する"
    ],
    addInfo_en: [
      "Routeweave Net: Additional 2 <Rotchaser> appear"
    ],
    eliteDesc_zh: [
      "所有敌方单位的攻击力+20%，生命值+40%",
      "所有我方干员的技能技力消耗增加30%",
      "指挥终端的生命值，防御力+50%",
      "指挥终端开启费用提升至60"
    ],
    eliteDesc_ja: [
      "敵全員の攻撃力+20%、最大HP+40%",
      "味方のスキル発動に必要なSPが30%増加",
      "コマンドシステムの最大HP，防御力+50%",
      "コマンドシステムが必要COSTが60になる"
    ],
    eliteDesc_en: [
      "All enemy units have +20% ATK and +40% Max HP",
      "All allies’ skill SP cost +30%",
      "All <Command Terminal> have +50% Max HP and +50% DEF",
      "Command Terminal's activation COST becomes 60"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          atk: 1.2,
          hp: 1.4
        }
      }
    ],
    routes: null,
    floors: [
      2
    ],
    sp_terrain: [
      {
        tileKey: "tile_hole",
        alias: null,
        blackboard: null
      }
    ],
    sp_enemy: {
      normal: 19,
      elite: null,
      fixed: true
    },
    enemies: [
      {
        id: "enemy_1002_nsabr",
        level: 1,
        min_count: 7,
        max_count: 7,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          atk: 200,
          def: 100
        }
      },
      {
        id: "enemy_1267_nhpbr",
        level: 0,
        min_count: 7,
        max_count: 7,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          talentBlackboard: [
            {
              key: "nhpbr_pollution",
              low: 100,
              high: 50
            }
          ]
        }
      },
      {
        id: "enemy_1273_stmgun",
        level: 0,
        min_count: 3,
        max_count: 3,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 1e4,
          atk: 400,
          def: 1e3,
          talentBlackboard: [
            {
              key: "stmgun_bombard",
              atk: {
                multiplier: 0.8
              }
            }
          ]
        }
      },
      {
        id: "enemy_1272_nhtank",
        level: 0,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          talentBlackboard: [
            {
              key: "nhtank_pollution",
              low: 100,
              high: 50
            }
          ]
        }
      },
      {
        id: "enemy_1270_nhstlk",
        level: 0,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2001_duckmi",
        level: 0,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 0,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2034_sythef",
        level: 0,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2059_smbox",
        level: 1,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1106_byokai",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 5e3,
          atk: 0,
          def: 150,
          res: 20,
          ms: 1,
          attackSpeed: 100,
          aspd: 1,
          hpRecoveryPerSec: 0,
          spRecoveryPerSec: 1,
          weight: 0,
          tauntLevel: 0,
          epDamageResistance: 0,
          epResistance: 0,
          stunImmune: false,
          silenceImmune: true,
          sleepImmune: false,
          frozenImmune: false,
          levitateImmune: false,
          lifepoint: 0,
          range: -1,
          talentBlackboard: [
            {
              key: "byokai_buff",
              duration: 60
            }
          ]
        }
      }
    ]
  },
  {
    id: "ro3_e_3_1",
    levelId: "level_rogue3_3-1",
    tags: [
      "rogue_sami"
    ],
    category: null,
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "弄假成真",
    name_ja: "噓から出たまこと",
    name_en: "Pretense_Turned_True",
    description_zh: "不要在萨米播撒谎言，一旦有人信以为真，它就会成真。",
    description_ja: "サーミで噓をつかないほうがよい。誰かが嘘を信じてしまえば、それは必ず現実となってしまうのだから。",
    description_en: "Don't spread lies in Sami. When someone takes one as truth, it becomes reality.",
    addInfo_zh: [
      "【路网】效果: 额外出现2个提亚卡乌好战者"
    ],
    addInfo_ja: [
      "「導きの網織」: 追加で<ティアカウ猛攻兵>2体が出現する"
    ],
    addInfo_en: [
      "Routeweave Net: Additional 2 <Tiacauh Fanatic> appear"
    ],
    eliteDesc_zh: [
      "所有敌方单位的攻击力，生命值+20%",
      "提亚卡乌好战者被替换为提亚卡乌撕裂者",
      "提亚卡乌巫术师被替换为提亚卡乌大巫"
    ],
    eliteDesc_ja: [
      "敵全員の攻撃力、最大HP+20%",
      "<ティアカウ猛攻兵>が<ティアカウ猛攻隊長>に替わる",
      "<ティアカウ呪術師>が<ティアカウ大呪術師>に替わる"
    ],
    eliteDesc_en: [
      "All enemy units have +20% ATK, and +20% Max HP",
      "All <Tiacauh Fanatic> are replaced by <Tiacauh Ripper>",
      "All <Tiacauh Ritualist> are replaced by <Tiacauh Shaman>"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          atk: 1.2,
          hp: 1.2
        }
      }
    ],
    routes: null,
    floors: [
      3
    ],
    sp_terrain: [
      {
        tileKey: "tile_hole",
        alias: null,
        blackboard: null
      }
    ],
    sp_enemy: {
      normal: 30,
      elite: null,
      fixed: true
    },
    enemies: [
      {
        id: "enemy_2001_duckmi",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2034_sythef",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2059_smbox",
        level: 1,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2043_smsbr",
        level: 0,
        min_count: 14,
        max_count: 14,
        elite_min_count: 14,
        elite_max_count: 14,
        overwrittenData: null
      },
      {
        id: "enemy_2044_smwiz",
        level: 0,
        min_count: 3,
        max_count: 3,
        elite_min_count: 3,
        elite_max_count: 3,
        overwrittenData: null
      },
      {
        id: "enemy_1093_ccsbr",
        level: 0,
        min_count: 4,
        max_count: 7,
        elite_min_count: 4,
        elite_max_count: 7,
        overwrittenData: null
      },
      {
        id: "enemy_1093_ccsbr_2",
        level: 0,
        min_count: 0,
        max_count: 4,
        elite_min_count: 0,
        elite_max_count: 4,
        overwrittenData: null
      },
      {
        id: "enemy_1095_ccripr",
        level: 0,
        min_count: 2,
        max_count: 3,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_1095_ccripr_2",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: 2,
        elite_max_count: 2,
        overwrittenData: null
      },
      {
        id: "enemy_1096_ccwitch",
        level: 0,
        min_count: 2,
        max_count: 2,
        elite_min_count: 1,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_1096_ccwitch_2",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: 1,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_1106_byokai",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 5e3,
          atk: 0,
          def: 150,
          res: 20,
          ms: 1,
          attackSpeed: 100,
          aspd: 1,
          hpRecoveryPerSec: 0,
          spRecoveryPerSec: 1,
          weight: 0,
          tauntLevel: 0,
          epDamageResistance: 0,
          epResistance: 0,
          stunImmune: false,
          silenceImmune: true,
          sleepImmune: false,
          frozenImmune: false,
          levitateImmune: false,
          lifepoint: 0,
          range: -1,
          talentBlackboard: [
            {
              key: "byokai_buff",
              duration: 60
            }
          ]
        }
      }
    ]
  },
  {
    id: "ro3_e_3_2",
    levelId: "level_rogue3_3-2",
    tags: [
      "rogue_sami"
    ],
    category: null,
    characterLimit: 6,
    initialCost: 14,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "饥渴祭坛",
    name_ja: "渇きの祭壇",
    name_en: "Altar_of_Craving",
    description_zh: "正因从每一个路过的个体中索取了燃料，这个萨卡兹祭坛才能在无人看管的情况下一直运行到现在。\n<@rolv.rem>场地中有对敌我造成伤害的<源石祭坛></>",
    description_ja: "このサルカズの源石祭壇が管理者不在の状態で稼働し続けられたのは、この場所を通る全ての生物からエネルギーを頂戴しているからなのだろう。\n<@rolv.rem>戦場に敵味方を問わずダメージを与える<源石祭壇>が出現</>",
    description_en: "It is precisely because of the fuel it extracts from every passerby that this Sarkaz altar has thus far been able to operate unattended.\n<@rolv.rem><Originium Altars> that deal damage to both allies and enemies are present on the field</>",
    addInfo_zh: [
      "【路网】效果: 额外出现1个游击队萨卡兹战士"
    ],
    addInfo_ja: [
      "「導きの網織」: 追加で<遊撃隊サルカズ戦士>1体が出現する"
    ],
    addInfo_en: [
      "Routeweave Net: Additional 1 <Sarkaz Guerrilla Fighter> appear"
    ],
    eliteDesc_zh: [
      "所有敌方单位的生命值+20%，移动速度+40%",
      "出现更多源石祭坛"
    ],
    eliteDesc_ja: [
      "敵全員の最大HP+20%、移動速度+40%",
      "右側に追加の源石祭壇が出現する"
    ],
    eliteDesc_en: [
      "All enemy units have +20% Max HP and +40% Movespeed",
      "Additional 1 <Originium Altar> appears at the right side"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          ms: 1.4,
          hp: 1.3
        }
      }
    ],
    routes: null,
    floors: [
      3
    ],
    sp_terrain: [
      {
        tileKey: "tile_hole",
        alias: null,
        blackboard: null
      }
    ],
    sp_enemy: {
      normal: 35,
      elite: null,
      fixed: false
    },
    enemies: [
      {
        id: "enemy_2043_smsbr",
        level: 0,
        min_count: 25,
        max_count: 25,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2044_smwiz",
        level: 0,
        min_count: 4,
        max_count: 4,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1075_dmgswd",
        level: 0,
        min_count: 7,
        max_count: 8,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1084_sotidm",
        level: 0,
        min_count: 3,
        max_count: 4,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2059_smbox",
        level: 1,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2001_duckmi",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2034_sythef",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1106_byokai",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 5e3,
          atk: 0,
          def: 150,
          res: 20,
          ms: 1,
          attackSpeed: 100,
          aspd: 1,
          hpRecoveryPerSec: 0,
          spRecoveryPerSec: 1,
          weight: 0,
          tauntLevel: 0,
          epDamageResistance: 0,
          epResistance: 0,
          stunImmune: false,
          silenceImmune: true,
          sleepImmune: false,
          frozenImmune: false,
          levitateImmune: false,
          lifepoint: 0,
          range: -1,
          talentBlackboard: [
            {
              key: "byokai_buff",
              duration: 60
            }
          ]
        }
      }
    ]
  },
  {
    id: "ro3_e_3_3",
    levelId: "level_rogue3_3-3",
    tags: [
      "rogue_sami"
    ],
    category: null,
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "狡兽九窟",
    name_ja: "狡獣九窟",
    name_en: "Crafty_Beasts'_Nine-Caves",
    description_zh: "有传言说，一种野兽会为巢穴准备九个出口以备逃生。但现在的问题在于，你陷在它的巢穴中，却不知道敌人会从何处出现。",
    description_ja: "いつでも逃げられるように、巣穴に九つの出口を設ける野獣がいるという。だがその巣に閉じ込められて困ったのは、敵がいつどこから襲いかかってくるか分からないことだ。",
    description_en: "There is a kind of wild beast that, according to rumors, prepares nine exits in its lair for escape purposes. But the problem right now is that you're stuck in its den and don't know where the enemy will emerge from.",
    addInfo_zh: [
      "【路网】效果: 额外出现1个复仇者"
    ],
    addInfo_ja: [
      "「導きの網織」: 追加で<ヴェンデッタ>1体が出現する"
    ],
    addInfo_en: [
      "Routeweave Net: Additional 1 <Hateful Avenger> appear"
    ],
    eliteDesc_zh: [
      "所有敌方单位的攻击力+50%，防御力+10%，生命值+80%"
    ],
    eliteDesc_ja: [
      "敵全員の攻撃力+50%、防御力+10%、最大HP+80%"
    ],
    eliteDesc_en: [
      "All enemy units have +50% ATK, +10% DEF and +80% Max HP"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          atk: 1.5,
          def: 1.1,
          hp: 1.8
        }
      }
    ],
    routes: null,
    floors: [
      3
    ],
    sp_terrain: null,
    sp_enemy: {
      normal: 57,
      elite: null,
      fixed: true
    },
    enemies: [
      {
        id: "enemy_2001_duckmi",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2034_sythef",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1083_sotiab",
        level: 0,
        min_count: 7,
        max_count: 28,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          def: 450
        }
      },
      {
        id: "enemy_1013_airdrp",
        level: 0,
        min_count: 25,
        max_count: 46,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1025_reveng_2",
        level: 0,
        min_count: 3,
        max_count: 3,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2059_smbox",
        level: 1,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1106_byokai",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 5e3,
          atk: 0,
          def: 150,
          res: 20,
          ms: 1,
          attackSpeed: 100,
          aspd: 1,
          hpRecoveryPerSec: 0,
          spRecoveryPerSec: 1,
          weight: 0,
          tauntLevel: 0,
          epDamageResistance: 0,
          epResistance: 0,
          stunImmune: false,
          silenceImmune: true,
          sleepImmune: false,
          frozenImmune: false,
          levitateImmune: false,
          lifepoint: 0,
          range: -1,
          talentBlackboard: [
            {
              key: "byokai_buff",
              duration: 60
            }
          ]
        }
      }
    ]
  },
  {
    id: "ro3_e_3_4",
    levelId: "level_rogue3_3-4",
    tags: [
      "rogue_sami"
    ],
    category: null,
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "冰海疑影",
    name_ja: "氷海の虚像",
    name_en: "Shady_Frozen_Sea",
    description_zh: "你当然知道海洋与水手不会出现在冰原上，但你却不觉得有任何违和的地方。认知错误，正是最常见的坍缩范式。\n<@rolv.rem>场地中有使我方单位防御力减半的<腐蚀地面>。</>",
    description_ja: "氷原に海や船乗りが現れることなどありえないと、頭ではわかっていながらも、目の前の光景にはまるで違和感を覚えなかった。認知の異常は、もっとも一般的なパラダイムロストである。\n<@rolv.rem>戦場に味方ユニットの防御力を半減させる<腐食した地面>が出現。</>",
    description_en: "You're certainly aware that the ocean and sailors won't show up on the icefield, and yet you don't think anything is off. Cognitive errors are the most common Collapsal Paradigm to manifest.\n<@rolv.rem><Corrosive Ground> tiles that reduce the DEF of allied units by half are present on the field</>",
    addInfo_zh: [
      "【路网】效果: 额外出现2个大奖赛运输艇"
    ],
    addInfo_ja: [
      "「導きの網織」: 追加で<大会輸送艇>2体が出現する"
    ],
    addInfo_en: [
      "Routeweave Net: Additional 2 <Competition Transport Vessel> appear"
    ],
    eliteDesc_zh: [
      "所有敌方单位的攻击力+30%，防御力+80%，生命值+30%，移动速度+80%"
    ],
    eliteDesc_ja: [
      "敵全員の攻撃力+30%、防御力+80%、最大HP+30%、移動速度+80%"
    ],
    eliteDesc_en: [
      "All enemy units have +30% ATK, +80% DEF, +30% Max HP and +80% Movespeed"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          atk: 1.3,
          def: 1.8,
          hp: 1.3,
          ms: 1.8
        }
      }
    ],
    routes: null,
    floors: [
      3
    ],
    sp_terrain: [
      {
        tileKey: "tile_defbreak",
        alias: null,
        blackboard: {
          def: 0.5
        }
      }
    ],
    sp_enemy: {
      normal: 50,
      elite: null,
      fixed: false
    },
    enemies: [
      {
        id: "enemy_2001_duckmi",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2034_sythef",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_3003_alymot",
        level: 0,
        min_count: 13,
        max_count: 18,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1164_bmbmot",
        level: 0,
        min_count: 8,
        max_count: 9,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1162_magmot",
        level: 0,
        min_count: 1,
        max_count: 2,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1161_tidmag",
        level: 0,
        min_count: 1,
        max_count: 2,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1159_swfmob_2",
        level: 0,
        min_count: 11,
        max_count: 11,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2043_smsbr",
        level: 0,
        min_count: 1,
        max_count: 17,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1160_hvyslr",
        level: 0,
        min_count: 7,
        max_count: 7,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2059_smbox",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1106_byokai",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 5e3,
          atk: 0,
          def: 150,
          res: 20,
          ms: 1,
          attackSpeed: 100,
          aspd: 1,
          hpRecoveryPerSec: 0,
          spRecoveryPerSec: 1,
          weight: 0,
          tauntLevel: 0,
          epDamageResistance: 0,
          epResistance: 0,
          stunImmune: false,
          silenceImmune: true,
          sleepImmune: false,
          frozenImmune: false,
          levitateImmune: false,
          lifepoint: 0,
          range: -1,
          talentBlackboard: [
            {
              key: "byokai_buff",
              duration: 60
            }
          ]
        }
      }
    ]
  },
  {
    id: "ro3_e_3_5",
    levelId: "level_rogue3_3-5",
    tags: [
      "rogue_sami"
    ],
    category: null,
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "咫尺天涯",
    name_ja: "目先も天涯の隔たり",
    name_en: "So_Close_and_Yet_So_Far",
    description_zh: "山脉间的相对距离被折叠后又拉长，以致原本一步就能抵达的地方，现在得耗费许多时间。",
    description_ja: "山々の相対距離は縮まり、そしてまた引き伸ばされもして、かつては一歩で到達できていた場所も、今ではかなりの時間がかかってしまう。",
    description_en: "The relative distances between the mountains have been folded and stretched. What originally would take only a single step to reach now takes a long time.",
    addInfo_zh: [
      "【路网】效果: 额外出现2个萨卡兹穿刺手"
    ],
    addInfo_ja: [
      "「導きの網織」: 追加で<サルカズ突撃兵>2体が出現する"
    ],
    addInfo_en: [
      "Routeweave Net: Additional 2 <Sarkaz Lancer> appear"
    ],
    eliteDesc_zh: [
      "所有敌方单位的攻击力，防御力+10%，生命值+100%"
    ],
    eliteDesc_ja: [
      "敵全員の攻撃力、防御力+10%、最大HP+100%"
    ],
    eliteDesc_en: [
      "All enemy units have +10% ATK, +10% DEF, and +100% Max HP"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          atk: 1.1,
          def: 1.1,
          hp: 2
        }
      }
    ],
    routes: null,
    floors: [
      3
    ],
    sp_terrain: [
      {
        tileKey: "tile_hole",
        alias: null,
        blackboard: null
      }
    ],
    sp_enemy: {
      normal: 32,
      elite: null,
      fixed: true
    },
    enemies: [
      {
        id: "enemy_2043_smsbr",
        level: 0,
        min_count: 23,
        max_count: 23,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2045_smdrn",
        level: 0,
        min_count: 4,
        max_count: 4,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2059_smbox",
        level: 1,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1072_dlancer",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1072_dlancer_2",
        level: 0,
        min_count: 2,
        max_count: 2,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1279_sgbdg",
        level: 0,
        min_count: 2,
        max_count: 2,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2034_sythef",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2001_duckmi",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1106_byokai",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 5e3,
          atk: 0,
          def: 150,
          res: 20,
          ms: 1,
          attackSpeed: 100,
          aspd: 1,
          hpRecoveryPerSec: 0,
          spRecoveryPerSec: 1,
          weight: 0,
          tauntLevel: 0,
          epDamageResistance: 0,
          epResistance: 0,
          stunImmune: false,
          silenceImmune: true,
          sleepImmune: false,
          frozenImmune: false,
          levitateImmune: false,
          lifepoint: 0,
          range: -1,
          talentBlackboard: [
            {
              key: "byokai_buff",
              duration: 60
            }
          ]
        }
      }
    ]
  },
  {
    id: "ro3_e_3_6",
    levelId: "level_rogue3_3-6",
    tags: [
      "rogue_sami"
    ],
    category: null,
    characterLimit: 6,
    initialCost: 20,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "思维折断",
    name_ja: "途切れた思考",
    name_en: "Rational_Fracture",
    description_zh: "眼前的敌人像是延迟过高的影像般不停高速位移。你烦恼于应对之法，正想挠挠脑袋，却发现刚刚举起的手已经伸到了后背上。",
    description_ja: "目の前の敵は、遅延の激しい映像のように常に一瞬で場所を変えている。どう対処すべきかを悩み、頭をかきむしろうとしたとき、振り上げた手が背中に向かって伸びていることに気が付いた。",
    description_en: "The enemy in front of you is moving so fast they resemble a high-latency image. You fret over how to deal with the matter, but just as you're about to scratch your head, you realize the hand you just raised is already on your back.",
    addInfo_zh: [
      "【路网】效果: 额外出现1个木裂战士"
    ],
    addInfo_ja: [
      "「導きの網織」: 追加で<凍裂の戦士>1体が出現する"
    ],
    addInfo_en: [
      "Routeweave Net: Additional 1 <Shattered Champion> appear"
    ],
    eliteDesc_zh: [
      "所有敌方单位的攻击力+10%，防御力+15%，生命值+20%",
      "爆破攻坚手被替换为爆破攻坚手组长",
      "萨卡兹刀术师被替换为萨卡兹魔剑士"
    ],
    eliteDesc_ja: [
      "敵全員の攻撃力+10%、防御力+15%、最大HP+20%",
      "<ボンバークラッシャー>が<凶悪ボンバークラッシャー>に替わる",
      "<サルカズ刀術隊長>が<サルカズ魔剣士>に替わる"
    ],
    eliteDesc_en: [
      "All enemy units have +10% ATK, +15% DEF, and +20% Max HP",
      "All <Demolitionist> are replaced by <Demolitionist Leader>",
      "All <Sarkaz Blademaster> are replaced by <Sarkaz Bladeweaver>"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          atk: 1.1,
          def: 1.15,
          hp: 1.2
        }
      }
    ],
    routes: null,
    floors: [
      3
    ],
    sp_terrain: null,
    sp_enemy: {
      normal: 18,
      elite: null,
      fixed: true
    },
    enemies: [
      {
        id: "enemy_2043_smsbr",
        level: 0,
        min_count: 9,
        max_count: 12,
        elite_min_count: 9,
        elite_max_count: 12,
        overwrittenData: null
      },
      {
        id: "enemy_1071_dftman_2",
        level: 0,
        min_count: 0,
        max_count: 3,
        elite_min_count: 0,
        elite_max_count: 3,
        overwrittenData: null
      },
      {
        id: "enemy_1075_dmgswd",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2044_smwiz",
        level: 0,
        min_count: 2,
        max_count: 2,
        elite_min_count: 2,
        elite_max_count: 2,
        overwrittenData: null
      },
      {
        id: "enemy_2046_smwar",
        level: 0,
        min_count: 2,
        max_count: 2,
        elite_min_count: 2,
        elite_max_count: 2,
        overwrittenData: null
      },
      {
        id: "enemy_1076_bsthmr",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 25e3
        }
      },
      {
        id: "enemy_1076_bsthmr_2",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: 1,
        elite_max_count: 1,
        overwrittenData: {
          hp: 35e3
        }
      },
      {
        id: "enemy_2001_duckmi",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2034_sythef",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2059_smbox",
        level: 1,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1106_byokai",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 5e3,
          atk: 0,
          def: 150,
          res: 20,
          ms: 1,
          attackSpeed: 100,
          aspd: 1,
          hpRecoveryPerSec: 0,
          spRecoveryPerSec: 1,
          weight: 0,
          tauntLevel: 0,
          epDamageResistance: 0,
          epResistance: 0,
          stunImmune: false,
          silenceImmune: true,
          sleepImmune: false,
          frozenImmune: false,
          levitateImmune: false,
          lifepoint: 0,
          range: -1,
          talentBlackboard: [
            {
              key: "byokai_buff",
              duration: 60
            }
          ]
        }
      }
    ]
  },
  {
    id: "ro3_e_3_7",
    levelId: "level_rogue3_3-7",
    tags: [
      "rogue_sami"
    ],
    category: "combat_ops",
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "恃强凌弱",
    name_ja: null,
    name_en: null,
    description_zh: "五个伐木工聚在一起诅咒他们的工友变成虫子。好消息是，工友们真变成了源石虫。坏消息是，今后他们再也没法看见人类了。",
    description_ja: null,
    description_en: null,
    addInfo_zh: [
      "【路网】效果: 额外出现2个匪帮射手",
      "不晓得原因但是辐能源石虫的属性没随着难度增加 (2024/01/09)"
    ],
    addInfo_ja: [
      "【路网】效果: 追加で<匪帮射手>2体が出現する",
      "原因不明だが<辐能源石虫>のステは難易度補正を受けない (2024/01/09)"
    ],
    addInfo_en: [
      "Routeweave Net: Additional 2 <匪帮射手> appear",
      "Unknown reason but <辐能源石虫> stats does not increase with difficulty (2024/01/09)"
    ],
    eliteDesc_zh: [
      "所有敌方单位的攻击力+20%，防御力+10%，生命值+50%",
      "辐能源石虫自爆时增加的能量额外+3"
    ],
    eliteDesc_ja: [
      "敵全員の攻撃力+20%、防御力+10%、最大HP+50%",
      "<辐能源石虫>自爆時補充するエネルギーさらに+3"
    ],
    eliteDesc_en: [
      "All enemy units have +20% ATK, +10% DEF, and +50% Max HP",
      "<辐能源石虫>'s energy charge upon explosion additional +3"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          atk: 1.2,
          def: 1.1,
          hp: 1.5
        }
      },
      {
        targets: [
          "enemy_1352_eslime"
        ],
        mods: {
          special: {
            bug_explode_eslime: {
              atk: {
                multiplier: 4
              },
              dmg_element: "arts",
              suffix: {
                en: "💥",
                ja: "💥",
                zh: "💥"
              },
              hits: 1,
              tooltip: {
                en: [
                  "Explodes on death, giving all enemies $+4$ energy and deals <v.atk.multiplier>% ATK dmg to nearby units (Can be silenced)"
                ],
                ja: [
                  "死亡時には爆発する、マップ上の敵のエネルギーを$4$点補充して、周囲に攻撃力<v.atk.multiplier>%の術ダメージを与える（無効化可能）"
                ],
                zh: [
                  "死亡后使场上所有敌人获得$4$点能量，并对周围我造成攻击力<v.atk.multiplier>%的法术溅射伤害（可被沉默）"
                ]
              }
            }
          }
        }
      }
    ],
    routes: null,
    floors: [
      3
    ],
    sp_terrain: null,
    sp_enemy: {
      normal: 40,
      elite: null,
      fixed: false
    },
    enemies: [
      {
        id: "enemy_2001_duckmi",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2034_sythef",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1352_eslime",
        level: 0,
        min_count: 31,
        max_count: 33,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1357_erob",
        level: 0,
        min_count: 5,
        max_count: 5,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2044_smwiz",
        level: 0,
        min_count: 1,
        max_count: 3,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2059_smbox",
        level: 1,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1106_byokai",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 5e3,
          atk: 0,
          def: 150,
          res: 20,
          ms: 1,
          attackSpeed: 100,
          aspd: 1,
          hpRecoveryPerSec: 0,
          spRecoveryPerSec: 1,
          weight: 0,
          tauntLevel: 0,
          epDamageResistance: 0,
          epResistance: 0,
          stunImmune: false,
          silenceImmune: true,
          sleepImmune: false,
          frozenImmune: false,
          levitateImmune: false,
          lifepoint: 0,
          range: -1,
          talentBlackboard: [
            {
              key: "byokai_buff",
              duration: 60
            }
          ]
        }
      },
      {
        id: "enemy_1356_egun",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      }
    ]
  },
  {
    id: "ro3_e_4_1",
    levelId: "level_rogue3_4-1",
    tags: [
      "rogue_sami"
    ],
    category: null,
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "公司纠葛",
    name_ja: "企業間の確執",
    name_en: "Company_Entanglement",
    description_zh: "哥伦比亚的科技巨头们虽然签署了合约共同探索冰原，但它们积怨已久，难免会有人想用些不正当的手段来打击对手。",
    description_ja: "クルビアの大手テクノロジー企業たちは氷原を共同探索するべく契約を交わしてはいるが、企業間の長年の確執があるため、ライバルを蹴落とそうとしてもおかしくはない。",
    description_en: "Even though Columbia's tech giants have signed a contract for a joint-expedition of the icefield, their long-standing grievances will inevitably have some wanting to employ unfair means to attack their rivals.",
    addInfo_zh: [
      "【路网】效果: 额外出现1个狙击步兵组长"
    ],
    addInfo_ja: [
      "「導きの網織」: 追加で<狙撃歩兵隊長>1体が出現する"
    ],
    addInfo_en: [
      "Routeweave Net: Additional 1 <Sniper Leader> appear"
    ],
    eliteDesc_zh: [
      "所有敌方单位的攻击力+40%，防御力+20%，生命值+50%",
      "乌萨斯突击者被替换为倾轧者"
    ],
    eliteDesc_ja: [
      "敵全員の攻撃力+40%、防御力+20%、最大HP+50%",
      "<ウルサスコマンドー>が<凶悪ロードローラー>に替わる"
    ],
    eliteDesc_en: [
      "All enemy units have +40% ATK, +20% DEF, and +50% Max HP",
      "All <Ursus Raider> are replaced by <Bulldozer>"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          atk: 1.4,
          def: 1.2,
          hp: 1.5
        }
      }
    ],
    routes: null,
    floors: [
      4
    ],
    sp_terrain: null,
    sp_enemy: {
      normal: 40,
      elite: null,
      fixed: false
    },
    enemies: [
      {
        id: "enemy_2001_duckmi",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2034_sythef",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2059_smbox",
        level: 2,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1046_agent_2",
        level: 0,
        min_count: 22,
        max_count: 22,
        elite_min_count: 22,
        elite_max_count: 22,
        overwrittenData: null
      },
      {
        id: "enemy_1049_eagent_2",
        level: 0,
        min_count: 3,
        max_count: 5,
        elite_min_count: 3,
        elite_max_count: 5,
        overwrittenData: null
      },
      {
        id: "enemy_1111_ucommd",
        level: 0,
        min_count: 4,
        max_count: 4,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1047_sagent_2",
        level: 0,
        min_count: 3,
        max_count: 3,
        elite_min_count: 3,
        elite_max_count: 3,
        overwrittenData: null
      },
      {
        id: "enemy_1058_traink_2",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: 4,
        elite_max_count: 4,
        overwrittenData: null
      },
      {
        id: "enemy_1059_buster_2",
        level: 0,
        min_count: 4,
        max_count: 5,
        elite_min_count: 4,
        elite_max_count: 5,
        overwrittenData: null
      },
      {
        id: "enemy_1106_byokai",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 5e3,
          atk: 0,
          def: 150,
          res: 20,
          ms: 1,
          attackSpeed: 100,
          aspd: 1,
          hpRecoveryPerSec: 0,
          spRecoveryPerSec: 1,
          weight: 0,
          tauntLevel: 0,
          epDamageResistance: 0,
          epResistance: 0,
          stunImmune: false,
          silenceImmune: true,
          sleepImmune: false,
          frozenImmune: false,
          levitateImmune: false,
          lifepoint: 0,
          range: -1,
          talentBlackboard: [
            {
              key: "byokai_buff",
              duration: 60
            }
          ]
        }
      }
    ]
  },
  {
    id: "ro3_e_4_2",
    levelId: "level_rogue3_4-2",
    tags: [
      "rogue_sami"
    ],
    category: null,
    characterLimit: 6,
    initialCost: 12,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "应用测试",
    name_ja: "実証実験",
    name_en: "Practical_Test",
    description_zh: "这处莱茵科考站正在测试一些科技在寒冷地带的使用情况以便进行改良。你们很荣幸成为第一批实际测试人员。\n<@rolv.rem>场地中有吸收实验产物激活的<动力装甲></>",
    description_ja: "このライン生命観測基地では、現在一部の技術を寒冷地向けに改良するための試験が行われている。あなたたちは光栄にも、その最初の被験者として選ばれた。\n<@rolv.rem>戦場に実験物を吸収して起動する<パワードスーツ>が出現</>",
    description_en: "This Rhine research station is currently stress-testing their technology in the cold environment. Your team has the privilege to be among the first batch of practical testers.\n<@rolv.rem><Power Armors> that activate by absorbing experimental products are present on the field</>",
    addInfo_zh: [
      "【路网】效果: 额外出现1个寒霜"
    ],
    addInfo_ja: [
      "「導きの網織」: 追加で<コキュートス>1体が出現する"
    ],
    addInfo_en: [
      "Routeweave Net: Additional 1 <Frost> appear"
    ],
    eliteDesc_zh: [
      "所有敌方单位的防御力，生命值+30%",
      "出现更多R-3重型动力装甲",
      "3个Dor-1号失败品被替换为2个Dor-3号改造体"
    ],
    eliteDesc_ja: [
      "敵全員の防御力、最大HP+30%",
      "追加の＜R-31大型パワードスーツ＞が出現する",
      "<Dor-1号失敗作>3体が<Dor-3号改造体>2体に替わる"
    ],
    eliteDesc_en: [
      "All enemy units have +30% DEF, and +30% Max HP",
      "Additional 1 <R-31 Heavy Power Armor> appears",
      "3 <Dor-1 Failure> are replaced by 2 <Dor-3 Bionic>"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          def: 1.3,
          hp: 1.3
        }
      }
    ],
    routes: null,
    floors: [
      4
    ],
    sp_terrain: null,
    sp_enemy: {
      normal: "37 / 46",
      elite: "36 / 45",
      fixed: true
    },
    enemies: [
      {
        id: "enemy_1250_lyengs",
        level: 0,
        min_count: 8,
        max_count: 8,
        elite_min_count: 8,
        elite_max_count: 8,
        overwrittenData: null
      },
      {
        id: "enemy_1251_lysyta",
        level: 0,
        min_count: 25,
        max_count: 35,
        elite_min_count: 21,
        elite_max_count: 31,
        overwrittenData: null
      },
      {
        id: "enemy_1253_lysytc",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: 2,
        elite_max_count: 2,
        overwrittenData: null
      },
      {
        id: "enemy_1255_lybgpa",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: 1,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_1256_lyacpa",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1042_frostd",
        level: 0,
        min_count: 2,
        max_count: 3,
        elite_min_count: 2,
        elite_max_count: 3,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2001_duckmi",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2034_sythef",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2059_smbox",
        level: 2,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1106_byokai",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 5e3,
          atk: 0,
          def: 150,
          res: 20,
          ms: 1,
          attackSpeed: 100,
          aspd: 1,
          hpRecoveryPerSec: 0,
          spRecoveryPerSec: 1,
          weight: 0,
          tauntLevel: 0,
          epDamageResistance: 0,
          epResistance: 0,
          stunImmune: false,
          silenceImmune: true,
          sleepImmune: false,
          frozenImmune: false,
          levitateImmune: false,
          lifepoint: 0,
          range: -1,
          talentBlackboard: [
            {
              key: "byokai_buff",
              duration: 60
            }
          ]
        }
      }
    ]
  },
  {
    id: "ro3_e_4_3",
    levelId: "level_rogue3_4-3",
    tags: [
      "rogue_sami"
    ],
    category: null,
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "坍缩体的午后",
    name_ja: "崩壊体の午後",
    name_en: "Collapsals'_Afternoon",
    description_zh: "你觉得自己的队伍就像是一只掉在多索雷斯沙滩上的巨型源石虫，而那些坍缩体才是原本在这里度假观光的游客。\n<@rolv.rem>场地中有使我方单位防御力减半的<腐蚀地面>。</>",
    description_ja: "ふと、自分たちの部隊はドッソレスのビーチに迷い込んだ巨大なオリジムシで、あの崩壊体たちこそが元々この場所でバカンスを満喫している旅行客ではないかと思えてきた。\n<@rolv.rem>戦場に味方ユニットの防御力を半減させる<腐食した地面>が出現</>",
    description_en: "You feel as if your team resembles a giant Originium slug that has been dropped onto a beach in Dossoles, and those Collapsals were originally tourists here on vacation.\n<@rolv.rem><Corrosive Ground> tiles that reduce allied units's DEF by half are present on the field</>",
    addInfo_zh: [
      "【路网】效果: 额外出现2个大奖赛运输艇"
    ],
    addInfo_ja: [
      "「導きの網織」: 追加で<大会輸送艇>2体が出現する"
    ],
    addInfo_en: [
      "Routeweave Net: Additional 2 <Competition Transport Vessel> appear"
    ],
    eliteDesc_zh: [
      "所有敌方单位的生命值+50%，攻击范围+50%，攻击速度+50"
    ],
    eliteDesc_ja: [
      "敵全員の最大HP+50%、攻撃範囲+50%、攻撃速度+50"
    ],
    eliteDesc_en: [
      "All enemy units have +50% Max HP, +50% Attack range, and +50 Attackspeed"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          hp: 1.5,
          range: 1.5,
          fixed_aspd: 50
        }
      }
    ],
    routes: null,
    floors: [
      4
    ],
    sp_terrain: [
      {
        tileKey: "tile_defbreak",
        alias: null,
        blackboard: {
          def: 0.5
        }
      }
    ],
    sp_enemy: {
      normal: 51,
      elite: null,
      fixed: false
    },
    enemies: [
      {
        id: "enemy_2001_duckmi",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2034_sythef",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_3003_alymot",
        level: 0,
        min_count: 6,
        max_count: 6,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2043_smsbr",
        level: 0,
        min_count: 15,
        max_count: 15,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2045_smdrn",
        level: 0,
        min_count: 25,
        max_count: 26,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2046_smwar",
        level: 0,
        min_count: 3,
        max_count: 3,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2059_smbox",
        level: 2,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1106_byokai",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 5e3,
          atk: 0,
          def: 150,
          res: 20,
          ms: 1,
          attackSpeed: 100,
          aspd: 1,
          hpRecoveryPerSec: 0,
          spRecoveryPerSec: 1,
          weight: 0,
          tauntLevel: 0,
          epDamageResistance: 0,
          epResistance: 0,
          stunImmune: false,
          silenceImmune: true,
          sleepImmune: false,
          frozenImmune: false,
          levitateImmune: false,
          lifepoint: 0,
          range: -1,
          talentBlackboard: [
            {
              key: "byokai_buff",
              duration: 60
            }
          ]
        }
      }
    ]
  },
  {
    id: "ro3_e_4_4",
    levelId: "level_rogue3_4-4",
    tags: [
      "rogue_sami"
    ],
    category: null,
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "大迁徙",
    name_ja: "大移動",
    name_en: "The_Big_Migration",
    description_zh: "动物们都想离北方的灾异远些，而你就在它们南迁的必经之路上。",
    description_ja: "動物たちはみな北方の厄災から遠ざかろうとする。そしてあなたは、今まさにその南下の経路上にいた。",
    description_en: "The animals just want to avoid the disasters in the north, and you're the only thing standing in their way to the south.",
    addInfo_zh: [
      "【路网】效果: 额外出现1个箭棘兽"
    ],
    addInfo_ja: [
      "「導きの網織」: 追加で<撃烈トゲアラシ>1体が出現する"
    ],
    addInfo_en: [
      "Routeweave Net: Additional 1 <Rainer Haribeast> appear"
    ],
    eliteDesc_zh: [
      "所有敌方单位的攻击力，防御力，生命值+20%",
      "出现更多箭棘兽"
    ],
    eliteDesc_ja: [
      "敵全員の攻撃力、防御力、最大HP+20%",
      "追加で<撃烈トゲアラシ>1体が出現する"
    ],
    eliteDesc_en: [
      "All enemy units have +20% ATK, +20% DEF, and +20% Max HP",
      "Additional 1 <Rainer Haribeast> appears"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          atk: 1.2,
          def: 1.2,
          hp: 1.2
        }
      }
    ],
    routes: null,
    floors: [
      4
    ],
    sp_terrain: null,
    sp_enemy: {
      normal: 25,
      elite: 26,
      fixed: true
    },
    enemies: [
      {
        id: "enemy_1311_mhkryk",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: 1,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_1311_mhkryk_2",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: 1,
        elite_max_count: 1,
        overwrittenData: {
          hp: 32e3
        }
      },
      {
        id: "enemy_1306_mhtrtl",
        level: 0,
        min_count: 7,
        max_count: 7,
        elite_min_count: 7,
        elite_max_count: 7,
        overwrittenData: null
      },
      {
        id: "enemy_1306_mhtrtl_2",
        level: 0,
        min_count: 4,
        max_count: 7,
        elite_min_count: 4,
        elite_max_count: 7,
        overwrittenData: null
      },
      {
        id: "enemy_1304_mhwolf",
        level: 0,
        min_count: 6,
        max_count: 6,
        elite_min_count: 6,
        elite_max_count: 6,
        overwrittenData: null
      },
      {
        id: "enemy_1307_mhrhcr_2",
        level: 0,
        min_count: 3,
        max_count: 3,
        elite_min_count: 3,
        elite_max_count: 3,
        overwrittenData: null
      },
      {
        id: "enemy_1307_mhrhcr",
        level: 0,
        min_count: 3,
        max_count: 3,
        elite_min_count: 3,
        elite_max_count: 3,
        overwrittenData: null
      },
      {
        id: "enemy_1309_mhboar_2",
        level: 0,
        min_count: 2,
        max_count: 2,
        elite_min_count: 2,
        elite_max_count: 2,
        overwrittenData: null
      },
      {
        id: "enemy_1310_mhprpn_2",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: 1,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2059_smbox",
        level: 2,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2034_sythef",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2001_duckmi",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_1106_byokai",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 5e3,
          atk: 0,
          def: 150,
          res: 20,
          ms: 1,
          attackSpeed: 100,
          aspd: 1,
          hpRecoveryPerSec: 0,
          spRecoveryPerSec: 1,
          weight: 0,
          tauntLevel: 0,
          epDamageResistance: 0,
          epResistance: 0,
          stunImmune: false,
          silenceImmune: true,
          sleepImmune: false,
          frozenImmune: false,
          levitateImmune: false,
          lifepoint: 0,
          range: -1,
          talentBlackboard: [
            {
              key: "byokai_buff",
              duration: 60
            }
          ]
        }
      }
    ]
  },
  {
    id: "ro3_e_4_5",
    levelId: "level_rogue3_4-5",
    tags: [
      "rogue_sami"
    ],
    category: null,
    characterLimit: 6,
    initialCost: 0,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "以守代攻",
    name_ja: "防御は最大の攻撃",
    name_en: "Defense_Substituting_Offense",
    description_zh: "你被躯壳们困在了一座千疮百孔的堡垒中，或许周围散落的资源能让你从这轮袭击中存活下来。\n<@rolv.rem>场地中有阻挡敌人行进路线的<障碍物></>",
    description_ja: "あなたはあの亡骸たちによってボロボロの要塞に閉じ込められてしまった。周辺に落ちている資源を上手く活用できれば、この猛攻を耐え抜くことができるかもしれない。\n<@rolv.rem>戦場に敵のルートを遮る<障害物>が出現</>",
    description_en: "The husks have you trapped within a heavily battered fortress, but perhaps the resources scattered around here might let you survive this next wave of attacks.\n<@rolv.rem><Roadblocks> that can block the enemy's route are present on the field</>",
    addInfo_zh: [
      "【路网】效果: 额外出现1个游击队传令兵组长"
    ],
    addInfo_ja: [
      "「導きの網織」: 追加で<遊撃隊伝令隊長>1体が出現する"
    ],
    addInfo_en: [
      "Routeweave Net: Additional 1 <Guerrilla Herald Leader> appear"
    ],
    eliteDesc_zh: [
      "所有敌方单位的攻击力+10%，防御力+20%，生命值+40%",
      "额外出现1个蒸汽战车和2个萨卡兹枯朽战车"
    ],
    eliteDesc_ja: [
      "敵全員の攻撃力+10%、防御力+20%、最大HP+40%",
      "追加で1体の<蒸気戦車>と2体<枯朽サルカズ戦車>が出現する"
    ],
    eliteDesc_en: [
      "All enemy units have +10% ATK, +20% DEF, and +40% Max HP",
      "Additional 1 <Steam Tank> and 2 <Sarkaz Wither Tank> appears"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          atk: 1.1,
          def: 1.2,
          hp: 1.4
        }
      }
    ],
    routes: null,
    floors: [
      4
    ],
    sp_terrain: null,
    sp_enemy: {
      normal: 37,
      elite: 39,
      fixed: false
    },
    enemies: [
      {
        id: "enemy_2043_smsbr",
        level: 0,
        min_count: 24,
        max_count: 27,
        elite_min_count: 23,
        elite_max_count: 26,
        overwrittenData: null
      },
      {
        id: "enemy_2046_smwar",
        level: 0,
        min_count: 2,
        max_count: 2,
        elite_min_count: 2,
        elite_max_count: 2,
        overwrittenData: null
      },
      {
        id: "enemy_1274_stmram",
        level: 0,
        min_count: 2,
        max_count: 2,
        elite_min_count: 3,
        elite_max_count: 3,
        overwrittenData: null
      },
      {
        id: "enemy_1272_nhtank",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: 2,
        elite_max_count: 2,
        overwrittenData: null
      },
      {
        id: "enemy_1271_nhkodo",
        level: 0,
        min_count: 3,
        max_count: 3,
        elite_min_count: 3,
        elite_max_count: 3,
        overwrittenData: null
      },
      {
        id: "enemy_2001_duckmi",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2034_sythef",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2059_smbox",
        level: 2,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1080_sotidp_2",
        level: 0,
        min_count: 2,
        max_count: 2,
        elite_min_count: 2,
        elite_max_count: 2,
        overwrittenData: null
      },
      {
        id: "enemy_1106_byokai",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 5e3,
          atk: 0,
          def: 150,
          res: 20,
          ms: 1,
          attackSpeed: 100,
          aspd: 1,
          hpRecoveryPerSec: 0,
          spRecoveryPerSec: 1,
          weight: 0,
          tauntLevel: 0,
          epDamageResistance: 0,
          epResistance: 0,
          stunImmune: false,
          silenceImmune: true,
          sleepImmune: false,
          frozenImmune: false,
          levitateImmune: false,
          lifepoint: 0,
          range: -1,
          talentBlackboard: [
            {
              key: "byokai_buff",
              duration: 60
            }
          ]
        }
      }
    ]
  },
  {
    id: "ro3_e_4_6",
    levelId: "level_rogue3_4-6",
    tags: [
      "rogue_sami"
    ],
    category: null,
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "杂音干扰",
    name_ja: "ノイズ干渉",
    name_en: "Noise_Disturbance",
    description_zh: "自从通讯设备接入冰原，你总能听到他人言语间夹杂了几个毫无意义的字词，你没放在心上——直到另外一支探险队把你们当作了兽群。\n<@rolv.rem>场地中有发射敌方佣兵无人机的<可移动战术机库>。</>",
    description_ja: "氷原での通信環境が整って以来、意味の分からない単語を交えた会話が時折耳に入るようになったが、あなたは気に留めていなかった……別の探検隊から野獣の群れと見なされてしまうまでは。\n<@rolv.rem>戦場に敵傭兵を支援するドローンを射出する<移動式戦術格納庫>が出現</>",
    description_en: "Ever since you got communication access on the icefield, you've always been able to hear a handful of nonsense words mixed in with the other person talking, but you didn't take it seriously—until the other expedition team took you for a pack of beasts.\n<@rolv.rem><Mobile Tactical Hangars> that deploy enemy mercenary drones are present on the field</>",
    addInfo_zh: [
      "【路网】效果: 额外出现2个战术防御者组长"
    ],
    addInfo_ja: [
      "「導きの網織」: 追加で<戦術重装隊長>2体が出現する"
    ],
    addInfo_en: [
      "Routeweave Net: Additional 2 <Tactical Defender Leader> appear"
    ],
    eliteDesc_zh: [
      "所有敌方单位的攻击力+10%，生命值+30%",
      "萨卡兹宿主百夫长被替换为萨卡兹宿主卫巢百夫长"
    ],
    eliteDesc_ja: [
      "敵全員の攻撃力+10%、最大HP+30%",
      "<サルカズ寄生ケントゥリオ>が<サルカズ寄生守備ケントゥリオ>に替わる"
    ],
    eliteDesc_en: [
      "All enemy units have +10% ATK, and +30% Max HP",
      "All <Sarkaz Centurion Host> are replaced by <Sarkaz Centurion Nidus Guard>"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          atk: 1.1,
          hp: 1.3
        }
      }
    ],
    routes: null,
    floors: [
      4
    ],
    sp_terrain: null,
    sp_enemy: {
      normal: 29,
      elite: null,
      fixed: true
    },
    enemies: [
      {
        id: "enemy_2001_duckmi",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2034_sythef",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2059_smbox",
        level: 2,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1114_rgrdmn",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1114_rgrdmn_2",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: 1,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_1140_merhd_2",
        level: 0,
        min_count: 7,
        max_count: 15,
        elite_min_count: 7,
        elite_max_count: 15,
        overwrittenData: null
      },
      {
        id: "enemy_1141_merbow_2",
        level: 0,
        min_count: 6,
        max_count: 6,
        elite_min_count: 6,
        elite_max_count: 6,
        overwrittenData: null
      },
      {
        id: "enemy_1142_mershd_2",
        level: 0,
        min_count: 3,
        max_count: 3,
        elite_min_count: 3,
        elite_max_count: 3,
        overwrittenData: null
      },
      {
        id: "enemy_1145_atkspd_2",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1146_defspd_2",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2043_smsbr",
        level: 0,
        min_count: 0,
        max_count: 8,
        elite_min_count: 0,
        elite_max_count: 8,
        overwrittenData: null
      },
      {
        id: "enemy_2044_smwiz",
        level: 0,
        min_count: 3,
        max_count: 3,
        elite_min_count: 3,
        elite_max_count: 3,
        overwrittenData: null
      },
      {
        id: "enemy_1106_byokai",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 5e3,
          atk: 0,
          def: 150,
          res: 20,
          ms: 1,
          attackSpeed: 100,
          aspd: 1,
          hpRecoveryPerSec: 0,
          spRecoveryPerSec: 1,
          weight: 0,
          tauntLevel: 0,
          epDamageResistance: 0,
          epResistance: 0,
          stunImmune: false,
          silenceImmune: true,
          sleepImmune: false,
          frozenImmune: false,
          levitateImmune: false,
          lifepoint: 0,
          range: -1,
          talentBlackboard: [
            {
              key: "byokai_buff",
              duration: 60
            }
          ]
        }
      }
    ]
  },
  {
    id: "ro3_e_4_7",
    levelId: "level_rogue3_4-7",
    tags: [
      "rogue_sami"
    ],
    category: null,
    characterLimit: 6,
    initialCost: 20,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "禁区",
    name_ja: "禁止区域",
    name_en: "Restricted_Zone",
    description_zh: "乌萨斯人不会听你的辩解，只要你进入了他们设立的禁区，他们就会使用武力驱逐你。\n<@rolv.rem>场地中有使我方不会成为敌人远程攻击目标的<草丛></>",
    description_ja: "ウルサス人がこちらの言い分を聞くことはない。こちらがウルサスの禁止区域に立ち入った瞬間、彼らは武力で対抗してくるだろう。\n<@rolv.rem>戦場に配置した味方が敵遠距離攻撃の対象にならない<草むら>が出現</>",
    description_en: "Ursus will not listen to your excuses: as long as you enter their established restricted area, they will use force to expel you.\n<@rolv.rem><Bushes> that prevent allied units from being targeted by ranged enemy attacks are present on the field</>",
    addInfo_zh: [
      "【路网】效果: 额外出现1个帝国炮火先兆者"
    ],
    addInfo_ja: [
      "「導きの網織」: 追加で<帝国砲撃誘導機>1体が出現する"
    ],
    addInfo_en: [
      "Routeweave Net: Additional 1 <Imperial Artillery Targeteer> appear"
    ],
    eliteDesc_zh: [
      "所有敌方单位的攻击力，防御力+10%，生命值+15%",
      "帝国炮火先兆者被替换为帝国炮火中枢先兆者",
      "额外出现2个木裂战士"
    ],
    eliteDesc_ja: [
      "敵全員の攻撃力、防御力+10%、最大HP+15%",
      "<帝国砲撃誘導機>が<帝国砲撃指揮機>に替わる",
      "追加で2体<凍裂の戦士>が出現する"
    ],
    eliteDesc_en: [
      "All enemy units have +10% ATK, +10% DEF, and +15% Max HP",
      "All <Imperial Artillery Targeteer> are replaced by <Imperial Artillery Core Targeteer>",
      "Additional 2 <Shattered Champion> appears"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          atk: 1.1,
          def: 1.1,
          hp: 1.15
        }
      }
    ],
    routes: null,
    floors: [
      4
    ],
    sp_terrain: [
      {
        tileKey: "tile_grass",
        alias: null,
        blackboard: null
      }
    ],
    sp_enemy: {
      normal: 21,
      elite: 23,
      fixed: true
    },
    enemies: [
      {
        id: "enemy_1212_mtrfol",
        level: 0,
        min_count: 5,
        max_count: 5,
        elite_min_count: 5,
        elite_max_count: 5,
        overwrittenData: null
      },
      {
        id: "enemy_1215_ptrarc",
        level: 0,
        min_count: 3,
        max_count: 4,
        elite_min_count: 3,
        elite_max_count: 4,
        overwrittenData: null
      },
      {
        id: "enemy_2044_smwiz",
        level: 0,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2046_smwar",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: 2,
        elite_max_count: 2,
        overwrittenData: null
      },
      {
        id: "enemy_1216_cansld",
        level: 0,
        min_count: 4,
        max_count: 4,
        elite_min_count: 4,
        elite_max_count: 4,
        overwrittenData: null
      },
      {
        id: "enemy_1112_emppnt",
        level: 0,
        min_count: 3,
        max_count: 3,
        elite_min_count: 1,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_1112_emppnt_2",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: 2,
        elite_max_count: 2,
        overwrittenData: null
      },
      {
        id: "enemy_1020_obsv",
        level: 0,
        min_count: 4,
        max_count: 4,
        elite_min_count: 4,
        elite_max_count: 4,
        overwrittenData: null
      },
      {
        id: "enemy_2001_duckmi",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2034_sythef",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2059_smbox",
        level: 2,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1106_byokai",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 5e3,
          atk: 0,
          def: 150,
          res: 20,
          ms: 1,
          attackSpeed: 100,
          aspd: 1,
          hpRecoveryPerSec: 0,
          spRecoveryPerSec: 1,
          weight: 0,
          tauntLevel: 0,
          epDamageResistance: 0,
          epResistance: 0,
          stunImmune: false,
          silenceImmune: true,
          sleepImmune: false,
          frozenImmune: false,
          levitateImmune: false,
          lifepoint: 0,
          range: -1,
          talentBlackboard: [
            {
              key: "byokai_buff",
              duration: 60
            }
          ]
        }
      }
    ]
  },
  {
    id: "ro3_e_4_8",
    levelId: "level_rogue3_4-8",
    tags: [
      "rogue_sami"
    ],
    category: "combat_ops",
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "冰凝之所",
    name_ja: null,
    name_en: null,
    description_zh: "只要你血管里还有一丝温度，就不该到这里来，这里只属于冷血的人。",
    description_ja: null,
    description_en: null,
    addInfo_zh: [
      "【路网】效果: 额外出现3个冰爆源石虫·α"
    ],
    addInfo_ja: [
      "「導きの網織」: 追加で<ヒョウバクムシα>3体が出現する"
    ],
    addInfo_en: [
      "Routeweave Net: Additional 3 <Infused Glacial Originium Slug α> appear"
    ],
    eliteDesc_zh: [
      "所有敌方单位的攻击力，防御力+20%，生命值+40%",
      "散华骑士团精锐获得隐匿"
    ],
    eliteDesc_ja: [
      "敵全員の攻撃力、防御力+20%、最大HP+40%",
      "<ノヴァ精鋭騎士>がステルスになる"
    ],
    eliteDesc_en: [
      "All enemy units have +20% ATK, +20% DEF, and +40% Max HP",
      "<Nova Knightclub Elite> gains stealth"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          atk: 1.2,
          def: 1.2,
          hp: 1.4
        }
      },
      {
        targets: [
          "enemy_1184_cadkgt_2"
        ],
        mods: {
          special: {
            stealth: {
              tooltip: {
                en: [
                  "$Stealth$"
                ],
                ja: [
                  "$ステルス$"
                ],
                zh: [
                  "$隐匿$"
                ]
              }
            }
          }
        }
      }
    ],
    routes: null,
    floors: [
      4
    ],
    sp_terrain: null,
    sp_enemy: {
      normal: 26,
      elite: null,
      fixed: false
    },
    enemies: [
      {
        id: "enemy_1184_cadkgt_2",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 16e3,
          atk: 400,
          def: 450
        }
      },
      {
        id: "enemy_1067_snslime_2",
        level: 0,
        min_count: 8,
        max_count: 8,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1064_snsbr",
        level: 1,
        min_count: 12,
        max_count: 12,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1069_icebrk_2",
        level: 0,
        min_count: 1,
        max_count: 2,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1068_snmage_2",
        level: 0,
        min_count: 1,
        max_count: 3,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2001_duckmi",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2034_sythef",
        level: 1,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1106_byokai",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 5e3,
          atk: 0,
          def: 150,
          res: 20,
          ms: 1,
          attackSpeed: 100,
          aspd: 1,
          hpRecoveryPerSec: 0,
          spRecoveryPerSec: 1,
          weight: 0,
          tauntLevel: 0,
          epDamageResistance: 0,
          epResistance: 0,
          stunImmune: false,
          silenceImmune: true,
          sleepImmune: false,
          frozenImmune: false,
          levitateImmune: false,
          lifepoint: 0,
          range: -1,
          talentBlackboard: [
            {
              key: "byokai_buff",
              duration: 60
            }
          ]
        }
      },
      {
        id: "enemy_2059_smbox",
        level: 2,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      }
    ]
  },
  {
    id: "ro3_e_5_1",
    levelId: "level_rogue3_5-1",
    tags: [
      "magiccircuit",
      "rogue_sami"
    ],
    category: null,
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "乐理之灾",
    name_ja: "音楽理論の災い",
    name_en: "Musical_Disaster",
    description_zh: "惨遭扭曲的曲调与声响化作了你脑海中最了解音乐的群体。它们要用这根从曲谱上拆下的线，将你生生切裂。\n<@rolv.rem>我方技力自然回复被<废能干扰>降低，但能由<重整束流>恢复</>",
    description_ja: "捻じ曲げられた曲調と声は、あなたの記憶の中で最も音楽への造詣が深い集団へと姿を変えた。彼らは楽譜から抜き取られた線譜で、容赦なく切り裂いてくるだろう。\n<@rolv.rem>味方のSP自然回復速度を低下させる<異音の調べ>と、味方のSP自然回復速度を通常状態に戻す<指揮光線>が出現</>",
    description_en: "The tragically distorted tunes and sounds have become the group that in your mind best understands the music. They will use this string removed from the score to slice you up alive.\n<@rolv.rem>Allied units have their natural SP recovery speed reduced by <Waste Energy Interference>, but can be restored to normal with <Realigned Flux></>",
    addInfo_zh: [
      "【路网】效果: 额外出现1个历战高塔术师和1个改进型量产巨像"
    ],
    addInfo_ja: [
      "「導きの網織」: 追加で<ベテラン高塔の術師>1体と<量産型巨像・改>1体が出現する"
    ],
    addInfo_en: [
      "Routeweave Net: Additional 1 <Battleworn Spire Caster> and 1 <Enhanced Mass-Produced Colossus> appear"
    ],
    eliteDesc_zh: [
      "所有敌方单位的攻击力+50%，生命值+80%",
      "交换残党首席小提琴家与历战高塔术师的出现位置，且战斗开始后在左侧额外出现1个残党首席小提琴家"
    ],
    eliteDesc_ja: [
      "敵全員の攻撃力+50%、最大HP+80%",
      "<残党のバイオリン首席奏者>との<ベテラン高塔の術師>の最初の位置が交代する"
    ],
    eliteDesc_en: [
      "All enemy units have +50% ATK, and +80% Max HP",
      "Initial position of <Remnant Principal Violinist> and <Battleworn Spire Caster> swapped"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          atk: 1.5,
          hp: 1.8
        }
      }
    ],
    routes: null,
    floors: [
      5
    ],
    sp_terrain: null,
    sp_enemy: {
      normal: 21,
      elite: null,
      fixed: false
    },
    enemies: [
      {
        id: "enemy_2001_duckmi",
        level: 2,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 2,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2034_sythef",
        level: 2,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_1242_ltsmag_2",
        level: 0,
        min_count: 4,
        max_count: 4,
        elite_min_count: 4,
        elite_max_count: 4,
        overwrittenData: null
      },
      {
        id: "enemy_1240_ltgint_2",
        level: 0,
        min_count: 11,
        max_count: 12,
        elite_min_count: 11,
        elite_max_count: 12,
        overwrittenData: null
      },
      {
        id: "enemy_1241_ltmage_2",
        level: 0,
        min_count: 3,
        max_count: 4,
        elite_min_count: 4,
        elite_max_count: 4,
        overwrittenData: null
      },
      {
        id: "enemy_2059_smbox",
        level: 2,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1106_byokai",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 5e3,
          atk: 0,
          def: 150,
          res: 20,
          ms: 1,
          attackSpeed: 100,
          aspd: 1,
          hpRecoveryPerSec: 0,
          spRecoveryPerSec: 1,
          weight: 0,
          tauntLevel: 0,
          epDamageResistance: 0,
          epResistance: 0,
          stunImmune: false,
          silenceImmune: true,
          sleepImmune: false,
          frozenImmune: false,
          levitateImmune: false,
          lifepoint: 0,
          range: -1,
          talentBlackboard: [
            {
              key: "byokai_buff",
              duration: 60
            }
          ]
        }
      }
    ]
  },
  {
    id: "ro3_e_5_2",
    levelId: "level_rogue3_5-2",
    tags: [
      "rogue_sami"
    ],
    category: null,
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "生人勿近",
    name_ja: "生の拒絶",
    name_en: "Stay_Away_From_Strangers",
    description_zh: "地上是腐烂的树，天空中是钢铁与死亡的蚊蝇，生命在此不受欢迎。\n<@rolv.rem>场地中有产生食腐使徒的<汲营枯枝></>",
    description_ja: "地上は腐朽した木々で溢れかえり、空には死をもたらす鋼鉄の羽虫が飛び交っている。この場において声明は歓迎されていない。\n<@rolv.rem>戦場にナハツェーラーの使徒を産み出す<渇欲の枯枝>が出現</>",
    description_en: "Trees rotting in the ground, steel and dead flies in the sky. Life is not welcome here.\n<@rolv.rem><Twigs That Crave> that produce Rot Eaters are present on the field</>",
    addInfo_zh: [
      "【路网】效果: 额外出现3个妖怪和1个威龙"
    ],
    addInfo_ja: [
      "「導きの網織」: 追加で<怪鳥>3体と<飛龍>1体が出現する"
    ],
    addInfo_en: [
      "Routeweave Net: Additional 3 <Monster> and 1 <Raptor> appear"
    ],
    eliteDesc_zh: [
      "所有敌方单位的攻击力，防御力，生命值+20%",
      "所有“汲营枯枝”的生命值+20%，且出现多3根“汲营枯枝”",
      "所有污染秽蚀造成的伤害翻倍"
    ],
    eliteDesc_ja: [
      "敵全員の攻撃力、防御力、最大HP+20%",
      "追加で3体の<「渇欲の枯枝」>が出現する、かつ<「渇欲の枯枝」>の最大HP+20%",
      "蝕む穢れのダメージが倍になる"
    ],
    eliteDesc_en: [
      "All enemy units have +20% ATK, +20% DEF, and +20% Max HP",
      "All <'Twigs That Crave'> have +20% Max HP",
      "Corruption does 2x damage"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          atk: 1.2,
          def: 1.2,
          hp: 1.2
        }
      }
    ],
    routes: null,
    floors: [
      5
    ],
    sp_terrain: [
      {
        tileKey: "tile_hole",
        alias: null,
        blackboard: null
      }
    ],
    sp_enemy: {
      normal: 44,
      elite: null,
      fixed: true
    },
    enemies: [
      {
        id: "enemy_1321_wdarft",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: 1,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_1321_wdarft_2",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: 1,
        elite_max_count: 1,
        overwrittenData: {
          hp: 6e4,
          def: 450
        }
      },
      {
        id: "enemy_1269_nhfly",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1269_nhfly_2",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1266_nhapos",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          talentBlackboard: [
            {
              key: "nhapos_pollution",
              low: 100,
              high: 50
            }
          ]
        }
      },
      {
        id: "enemy_1042_frostd",
        level: 0,
        min_count: 2,
        max_count: 2,
        elite_min_count: 2,
        elite_max_count: 2,
        overwrittenData: null
      },
      {
        id: "enemy_1005_yokai_3",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: 1,
        elite_max_count: 1,
        overwrittenData: {
          hp: 45e3,
          atk: 760,
          def: 350
        }
      },
      {
        id: "enemy_2045_smdrn",
        level: 0,
        min_count: 18,
        max_count: 18,
        elite_min_count: 18,
        elite_max_count: 18,
        overwrittenData: null
      },
      {
        id: "enemy_1005_yokai",
        level: 1,
        min_count: 20,
        max_count: 20,
        elite_min_count: 20,
        elite_max_count: 20,
        overwrittenData: {
          hp: 3e3,
          def: 100
        }
      },
      {
        id: "enemy_2059_smbox",
        level: 2,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2034_sythef",
        level: 2,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2001_duckmi",
        level: 2,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 2,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_1106_byokai",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 5e3,
          atk: 0,
          def: 150,
          res: 20,
          ms: 1,
          attackSpeed: 100,
          aspd: 1,
          hpRecoveryPerSec: 0,
          spRecoveryPerSec: 1,
          weight: 0,
          tauntLevel: 0,
          epDamageResistance: 0,
          epResistance: 0,
          stunImmune: false,
          silenceImmune: true,
          sleepImmune: false,
          frozenImmune: false,
          levitateImmune: false,
          lifepoint: 0,
          range: -1,
          talentBlackboard: [
            {
              key: "byokai_buff",
              duration: 60
            }
          ]
        }
      }
    ]
  },
  {
    id: "ro3_e_5_3",
    levelId: "level_rogue3_5-3",
    tags: [
      "rogue_sami"
    ],
    category: null,
    characterLimit: 6,
    initialCost: 20,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "混乱的表象",
    name_ja: "混乱を呼ぶ表象",
    name_en: "Confusing_Appearance",
    description_zh: "不要被那无规则的表象给欺骗了，守住你的战线与思维，不要让它们有机可乘。",
    description_ja: "不規則に見える動きに騙されてはいけない。戦線と思考をしっかりと守り、決して隙を作らないようにしよう。",
    description_en: "Don't be deceived by their irregular appearance. Hold onto your thoughts and the battlefront, and don't give them an opening.",
    addInfo_zh: [
      "【路网】效果: 额外出现2个木裂战士"
    ],
    addInfo_ja: [
      "「導きの網織」: 追加で<凍裂の戦士>2体が出現する"
    ],
    addInfo_en: [
      "Routeweave Net: Additional 2 <Shattered Champion> appear"
    ],
    eliteDesc_zh: [
      "所有敌方单位的攻击力，防御力+10%，生命值+20%",
      "坍缩构造体被替换为法术大师A2",
      "3个狂暴宿主投掷手被替换为3个狂暴宿主掷骨手",
      "额外出现多1个木裂战士"
    ],
    eliteDesc_ja: [
      "敵全員の攻撃力、防御力+10%、最大HP+20%",
      "<崩壊した構造体>が<アーツバードA2>に替わる",
      "<狂化寄生投擲兵>3体が<狂化寄生投骨兵>に替わる",
      "追加で<凍裂の戦士>1体が出現する"
    ],
    eliteDesc_en: [
      "All enemy units have +10% ATK, +10% DEF, and +20% Max HP",
      "All <Collapsed Construct> are replaced by <Arts Master A2>",
      "3 <Enraged Possessed Thrower> are replaced by <Enraged Possessed Bonethrower> ",
      "Additional 1 <Shattered Champion> appears"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          atk: 1.1,
          def: 1.1,
          hp: 1.2
        }
      }
    ],
    routes: null,
    floors: [
      5
    ],
    sp_terrain: null,
    sp_enemy: {
      normal: 25,
      elite: 26,
      fixed: true
    },
    enemies: [
      {
        id: "enemy_2043_smsbr",
        level: 0,
        min_count: 4,
        max_count: 4,
        elite_min_count: 4,
        elite_max_count: 4,
        overwrittenData: null
      },
      {
        id: "enemy_2046_smwar",
        level: 0,
        min_count: 1,
        max_count: 4,
        elite_min_count: 2,
        elite_max_count: 5,
        overwrittenData: null
      },
      {
        id: "enemy_1040_bombd",
        level: 0,
        min_count: 3,
        max_count: 3,
        elite_min_count: 3,
        elite_max_count: 3,
        overwrittenData: null
      },
      {
        id: "enemy_2045_smdrn",
        level: 0,
        min_count: 6,
        max_count: 6,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1041_lazerd_2",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: 6,
        elite_max_count: 6,
        overwrittenData: null
      },
      {
        id: "enemy_1062_rager",
        level: 0,
        min_count: 3,
        max_count: 3,
        elite_min_count: 3,
        elite_max_count: 3,
        overwrittenData: null
      },
      {
        id: "enemy_1063_rageth",
        level: 0,
        min_count: 4,
        max_count: 4,
        elite_min_count: 1,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_1063_rageth_2",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: 3,
        elite_max_count: 3,
        overwrittenData: null
      },
      {
        id: "enemy_1076_bsthmr",
        level: 0,
        min_count: 0,
        max_count: 3,
        elite_min_count: 0,
        elite_max_count: 3,
        overwrittenData: null
      },
      {
        id: "enemy_2001_duckmi",
        level: 2,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 2,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2034_sythef",
        level: 2,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2059_smbox",
        level: 2,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1106_byokai",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 5e3,
          atk: 0,
          def: 150,
          res: 20,
          ms: 1,
          attackSpeed: 100,
          aspd: 1,
          hpRecoveryPerSec: 0,
          spRecoveryPerSec: 1,
          weight: 0,
          tauntLevel: 0,
          epDamageResistance: 0,
          epResistance: 0,
          stunImmune: false,
          silenceImmune: true,
          sleepImmune: false,
          frozenImmune: false,
          levitateImmune: false,
          lifepoint: 0,
          range: -1,
          talentBlackboard: [
            {
              key: "byokai_buff",
              duration: 60
            }
          ]
        }
      }
    ]
  },
  {
    id: "ro3_e_5_4",
    levelId: "level_rogue3_5-4",
    tags: [
      "rogue_sami"
    ],
    category: null,
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "求敌得敌",
    name_ja: "思い描けば敵を得る",
    name_en: "Requested_Enemies_Obtained",
    description_zh: "在冰原上远远看到一队影子，千万不要以最坏的情况去揣测那阴影究竟是什么，毕竟，你并不想在这种环境下“得偿所愿”。",
    description_ja: "氷原で遠目に何かの集団を目にしたとき、決してその正体について最悪の想像をしてはいけない。この環境においては、「思ったことが現実になって」しまうのだから。",
    description_en: "When you see a group of indistinct shadows on the icefield from a distance, never imagine the worst case scenario. After all, you don't want your 'Wish Fulfilled' in such an environment.",
    addInfo_zh: [
      "【路网】效果: 额外出现1个深池伙友影刃精英，1个深池伙友卫队精英"
    ],
    addInfo_ja: [
      "「導きの網織」: 追加で<ダブリンヘタイロイ上級影刃>1体と<ダブリンヘタイロイ上級衛兵>1体が出現する"
    ],
    addInfo_en: [
      "Routeweave Net: Additional 1 <Dublinn Elite Companion Shadowblade> and 1 <Dublinn Elite Companion Guard> appear"
    ],
    eliteDesc_zh: [
      "所有敌方单位的生命值+50%，移动速度+20%",
      "场地内部分位置无法部署"
    ],
    eliteDesc_ja: [
      "敵全員の最大HP+50%、移動速度+20%",
      "6つのマスが配置不可に"
    ],
    eliteDesc_en: [
      "All enemy units have +50% Max HP and +20% Movespeed",
      "6 tiles forbid deployment"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          hp: 1.5,
          ms: 1.2
        }
      }
    ],
    routes: null,
    floors: [
      5
    ],
    sp_terrain: null,
    sp_enemy: {
      normal: 44,
      elite: null,
      fixed: true
    },
    enemies: [
      {
        id: "enemy_2001_duckmi",
        level: 2,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 2,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2034_sythef",
        level: 2,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2059_smbox",
        level: 2,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2043_smsbr",
        level: 0,
        min_count: 22,
        max_count: 22,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2044_smwiz",
        level: 0,
        min_count: 4,
        max_count: 4,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2046_smwar",
        level: 0,
        min_count: 2,
        max_count: 2,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1174_duholy_2",
        level: 0,
        min_count: 2,
        max_count: 2,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1175_dushdo_2",
        level: 0,
        min_count: 2,
        max_count: 2,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1049_eagent_2",
        level: 0,
        min_count: 8,
        max_count: 8,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1058_traink_2",
        level: 0,
        min_count: 3,
        max_count: 3,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1106_byokai",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 5e3,
          atk: 0,
          def: 150,
          res: 20,
          ms: 1,
          attackSpeed: 100,
          aspd: 1,
          hpRecoveryPerSec: 0,
          spRecoveryPerSec: 1,
          weight: 0,
          tauntLevel: 0,
          epDamageResistance: 0,
          epResistance: 0,
          stunImmune: false,
          silenceImmune: true,
          sleepImmune: false,
          frozenImmune: false,
          levitateImmune: false,
          lifepoint: 0,
          range: -1,
          talentBlackboard: [
            {
              key: "byokai_buff",
              duration: 60
            }
          ]
        }
      }
    ]
  },
  {
    id: "ro3_e_5_5",
    levelId: "level_rogue3_5-5",
    tags: [
      "rogue_sami"
    ],
    category: null,
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "亡者行军",
    name_ja: "死者の行軍",
    name_en: "March_of_the_Dead",
    description_zh: "你对于死亡最富生命力的理解，来自深池那支从不停歇的军队。",
    description_ja: "あなたは、死こそが最も生命力に満ちた状態であることを、ダブリンからやってきた決して止まらぬ軍団を通して理解しているだろう。",
    description_en: "Your most life-enriching understanding of death comes from the never resting Dublinn army.",
    addInfo_zh: [
      "【路网】效果: 额外出现1个深池弩炮队长"
    ],
    addInfo_ja: [
      "「導きの網織」: 追加で<ダブリン爆撃隊隊長>1体が出現する"
    ],
    addInfo_en: [
      "Routeweave Net: Additional 1 <Dublinn Cannoneer Captain> appears"
    ],
    eliteDesc_zh: [
      "所有敌方单位的攻击力+30%，防御力+20%，生命值+30%",
      "愤怒的守墓石像被替换为泥岩巨像"
    ],
    eliteDesc_ja: [
      "敵全員の攻撃力+30%、防御力+20%、最大HP+30%",
      "<怒れる墓守の石像>が<マドロックの巨像>に替わる"
    ],
    eliteDesc_en: [
      "All enemy units have +30% ATK, +20% DEF, and +30% Max HP",
      "All <Enraged Tombkeeper Grotesque> are replaced by <Mudrock Colossus>"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          atk: 1.3,
          def: 1.2,
          hp: 1.3
        }
      }
    ],
    routes: null,
    floors: [
      5
    ],
    sp_terrain: null,
    sp_enemy: {
      normal: 33,
      elite: null,
      fixed: true
    },
    enemies: [
      {
        id: "enemy_2001_duckmi",
        level: 2,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 2,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2034_sythef",
        level: 2,
        min_count: 0,
        max_count: 1,
        elite_min_count: 0,
        elite_max_count: 1,
        overwrittenData: null
      },
      {
        id: "enemy_2059_smbox",
        level: 2,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1092_mdgint",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: 2,
        elite_max_count: 2,
        overwrittenData: null
      },
      {
        id: "enemy_1172_dugago_2",
        level: 0,
        min_count: 4,
        max_count: 4,
        elite_min_count: 2,
        elite_max_count: 2,
        overwrittenData: null
      },
      {
        id: "enemy_1288_duskls_2",
        level: 0,
        min_count: 15,
        max_count: 15,
        elite_min_count: 15,
        elite_max_count: 15,
        overwrittenData: null
      },
      {
        id: "enemy_1289_dubmb_2",
        level: 0,
        min_count: 5,
        max_count: 5,
        elite_min_count: 5,
        elite_max_count: 5,
        overwrittenData: null
      },
      {
        id: "enemy_2044_smwiz",
        level: 0,
        min_count: 6,
        max_count: 6,
        elite_min_count: 6,
        elite_max_count: 6,
        overwrittenData: null
      },
      {
        id: "enemy_1292_duskld_2",
        level: 0,
        min_count: 2,
        max_count: 2,
        elite_min_count: 2,
        elite_max_count: 2,
        overwrittenData: null
      },
      {
        id: "enemy_1106_byokai",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 5e3,
          atk: 0,
          def: 150,
          res: 20,
          ms: 1,
          attackSpeed: 100,
          aspd: 1,
          hpRecoveryPerSec: 0,
          spRecoveryPerSec: 1,
          weight: 0,
          tauntLevel: 0,
          epDamageResistance: 0,
          epResistance: 0,
          stunImmune: false,
          silenceImmune: true,
          sleepImmune: false,
          frozenImmune: false,
          levitateImmune: false,
          lifepoint: 0,
          range: -1,
          talentBlackboard: [
            {
              key: "byokai_buff",
              duration: 60
            }
          ]
        }
      }
    ]
  },
  {
    id: "ro3_e_5_6",
    levelId: "level_rogue3_5-6",
    tags: [
      "rogue_sami"
    ],
    category: null,
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "何处无山海",
    name_ja: "山海なき場所はなく",
    name_en: "Where_be_No_Mounts_and_Seas",
    description_zh: "大地宽广，大海无边，巨兽自然不仅存于大炎，于是这些人越过雪山，驶入江河，寻找着隐于八荒之内的古老生灵。\n<@rolv.rem>场地中有强化敌方的<山海密语仪></>",
    description_ja: "大地は広大で、海は果てしなく続いている。ゆえに巨獣が炎国だけに存在するとは限らない。そう思った人々は雪山を越え､河川を渡り、山海八荒に身を潜める古代の存在を探すことにした。\n<@rolv.rem>戦場に敵を強化する<山海密令柱>が出現</>",
    description_en: "The land is vast, the sea is endless, and Feranmuts naturally exist in places other than Yan. So these people cross the snowcapped mountains and sail the rivers, all to look for the ancient beings hiding in the cracks.\n<@rolv.rem><Shanhaizhong Cipher Machines> that strengthen enemies are present on the field</>",
    addInfo_zh: [
      "【路网】效果: 额外出现1个山海众秘使"
    ],
    addInfo_ja: [
      "「導きの網織」: 追加で<山海衆密使>1体が出現する"
    ],
    addInfo_en: [
      "Routeweave Net: Additional 1 <Shanhaizhong Secret-Keeper> appears"
    ],
    eliteDesc_zh: [
      "所有敌方单位的攻击力+10%，防御力+20%，生命值+50%",
      "山海众秘使破隐攻击力翻倍",
      "山海众司魅人的技能时长+50%，攻速速度+50%"
    ],
    eliteDesc_ja: [
      "敵全員の攻撃力+10%、防御力+20%、最大HP+50%",
      "<山海衆密使>がステルスから攻撃時の攻击力がさらに倍になる",
      "<山海衆怪術師>のスキルの効果時間+50%，攻速速度+50%"
    ],
    eliteDesc_en: [
      "All enemy units have +10% ATK, +20% DEF, and +50% Max HP",
      "All <Shanhaizhong Secret-Keeper> have quadrupled ATK when attacking from stealth",
      "All <Shanhaizhong Oracle> skill's duration +50%, Attackspeed increase +50%"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          atk: 1.1,
          def: 1.2,
          hp: 1.5
        }
      },
      {
        targets: [
          "enemy_1299_ymkilr_2"
        ],
        mods: {
          special: {
            ymkilr_2: {
              atk: {
                multiplier: 4
              },
              suffix: {
                en: "Stealth",
                ja: "ステルス",
                zh: "隐匿"
              },
              hits: 1,
              tooltip: {
                en: [
                  "Attacks from Stealth state does $400$% damage"
                ],
                ja: [
                  "ステルス状態からの攻撃の倍率が$400$%に増加"
                ],
                zh: [
                  "隐匿效果失效后的下一次攻击造成更高伤害"
                ]
              }
            }
          }
        }
      },
      {
        targets: [
          "enemy_1300_ymmir_2"
        ],
        mods: {
          special: {
            ymmir_1: {
              atk: {
                multiplier: 2
              },
              suffix: {
                en: "skill",
                ja: "スキル",
                zh: "技能"
              },
              hits: 1,
              value: 225,
              tooltip: {
                en: [
                  "Skill (Initial CD: 10s, ~CD: 35s)",
                  "after charging for 5s does <v.atk.multiplier>% dmg to target and gains ASPD +$<v.value>$ for $30$s"
                ],
                ja: [
                  "スキル（初動10秒/再動35秒）",
                  "5秒間チャージした後、攻撃力の<v.atk.multiplier>%の術ダメージを与える",
                  "その後$30$秒間、自身の攻撃速度+$<v.value>$"
                ],
                zh: [
                  "技能（初始冷却10s，后35s）",
                  "蓄力约5s后，对目标造成攻击力<v.atk.multiplier>%的法术伤害，之后攻击速度+$<v.value>$，持续$30$s"
                ]
              }
            }
          }
        }
      }
    ],
    routes: null,
    floors: [
      5
    ],
    sp_terrain: [
      {
        tileKey: "tile_hole",
        alias: null,
        blackboard: null
      }
    ],
    sp_enemy: {
      normal: 33,
      elite: null,
      fixed: true
    },
    enemies: [
      {
        id: "enemy_2001_duckmi",
        level: 2,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 2,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2034_sythef",
        level: 2,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2059_smbox",
        level: 2,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2046_smwar",
        level: 0,
        min_count: 3,
        max_count: 3,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1295_ymph_2",
        level: 0,
        min_count: 18,
        max_count: 18,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1299_ymkilr_2",
        level: 0,
        min_count: 5,
        max_count: 5,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1300_ymmir_2",
        level: 0,
        min_count: 6,
        max_count: 6,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1106_byokai",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 5e3,
          atk: 0,
          def: 150,
          res: 20,
          ms: 1,
          attackSpeed: 100,
          aspd: 1,
          hpRecoveryPerSec: 0,
          spRecoveryPerSec: 1,
          weight: 0,
          tauntLevel: 0,
          epDamageResistance: 0,
          epResistance: 0,
          stunImmune: false,
          silenceImmune: true,
          sleepImmune: false,
          frozenImmune: false,
          levitateImmune: false,
          lifepoint: 0,
          range: -1,
          talentBlackboard: [
            {
              key: "byokai_buff",
              duration: 60
            }
          ]
        }
      }
    ]
  },
  {
    id: "ro3_e_5_7",
    levelId: "level_rogue3_5-7",
    tags: [
      "rogue_sami"
    ],
    category: null,
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "本能污染",
    name_ja: "本能の汚染",
    name_en: "Instinct_Contamination",
    description_zh: "对于活着的东西，躯壳一视同仁。\n<@rolv.rem>场地中有会损失生命但大幅提升攻击力和攻击速度的<活性源石>。</>",
    description_ja: "穢された亡骸たちは、生きとし生けるものすべてを敵と見なす。\n<@rolv.rem>接触した敵味方に継続ダメージを与える代わりに、攻撃力と攻撃速度を大幅に上昇させる<活性源石>が戦場に出現</>",
    description_en: "The husks treat all living things equally.\n<@rolv.rem><Active Originium> tiles that cause units on them to gradually lose HP but greatly increases their ATK and ASPD are present on the field</>",
    addInfo_zh: [
      "【路网】效果: 额外出现10个染污躯壳"
    ],
    addInfo_ja: [
      "「導きの網織」: 追加で<穢された亡骸>10体が出現する"
    ],
    addInfo_en: [
      "Routeweave Net: Additional 10 <Tainted Carcass> appear"
    ],
    eliteDesc_zh: [
      "所有敌方单位的攻击力+20%，防御力+70%，生命值+20%",
      "场地内部分位置无法部署"
    ],
    eliteDesc_ja: [
      "敵全員の攻撃力+20%、防御力+70%、最大HP+20%",
      "1つのマスが配置不可に"
    ],
    eliteDesc_en: [
      "All enemy units have +20% ATK, +70% DEF, and +20% Max HP",
      "1 tile forbid deployment"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          atk: 1.2,
          def: 1.7,
          hp: 1.2
        }
      }
    ],
    routes: null,
    floors: [
      5
    ],
    sp_terrain: [
      {
        tileKey: "tile_hole",
        alias: null,
        blackboard: null
      },
      {
        tileKey: "tile_infection",
        alias: null,
        blackboard: {
          duration: 300,
          damage: 150,
          atk: 0.5,
          attack_speed: 50
        }
      }
    ],
    sp_enemy: {
      normal: 49,
      elite: null,
      fixed: false
    },
    enemies: [
      {
        id: "enemy_2001_duckmi",
        level: 2,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 2,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2034_sythef",
        level: 2,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2059_smbox",
        level: 2,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2046_smwar",
        level: 0,
        min_count: 10,
        max_count: 13,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2044_smwiz",
        level: 0,
        min_count: 7,
        max_count: 7,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2043_smsbr",
        level: 0,
        min_count: 19,
        max_count: 21,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2045_smdrn",
        level: 0,
        min_count: 8,
        max_count: 8,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1106_byokai",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 5e3,
          atk: 0,
          def: 150,
          res: 20,
          ms: 1,
          attackSpeed: 100,
          aspd: 1,
          hpRecoveryPerSec: 0,
          spRecoveryPerSec: 1,
          weight: 0,
          tauntLevel: 0,
          epDamageResistance: 0,
          epResistance: 0,
          stunImmune: false,
          silenceImmune: true,
          sleepImmune: false,
          frozenImmune: false,
          levitateImmune: false,
          lifepoint: 0,
          range: -1,
          talentBlackboard: [
            {
              key: "byokai_buff",
              duration: 60
            }
          ]
        }
      }
    ]
  },
  {
    id: "ro3_e_5_8",
    levelId: "level_rogue3_5-8",
    tags: [
      "rogue_sami"
    ],
    category: "combat_ops",
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "人造物狂欢节",
    name_ja: null,
    name_en: null,
    description_zh: "生人勿近！非人也勿近！机器们已经做了自己的主宰，把那些没芯片的碳基生物全部赶走！",
    description_ja: null,
    description_en: null,
    addInfo_zh: [
      "【路网】效果: 额外出现2个伦蒂尼姆城防自行炮"
    ],
    addInfo_ja: [
      "「導きの網織」の効果: 追加で<都市防衛自走砲>2体が出現する"
    ],
    addInfo_en: [
      "Routeweave Net: Additional 2 <Londinium Mobile Defense Artillery> appear"
    ],
    eliteDesc_zh: [
      "所有敌方单位的攻击力+20%，防御力+70%，生命值+40%，法术耐性+30"
    ],
    eliteDesc_ja: [
      "敵全員の攻撃力+20%、防御力+70%、最大HP+40%、術耐性+30"
    ],
    eliteDesc_en: [
      "All enemy units have +20% ATK, +70% DEF, +40% Max HP and +30 RES"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          atk: 1.2,
          def: 1.7,
          hp: 1.2,
          fixed_res: 30
        }
      }
    ],
    routes: null,
    floors: [
      5
    ],
    sp_terrain: [
      {
        tileKey: "tile_hole",
        alias: null,
        blackboard: null
      }
    ],
    sp_enemy: {
      normal: 28,
      elite: null,
      fixed: false
    },
    enemies: [
      {
        id: "enemy_2001_duckmi",
        level: 2,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 2,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2034_sythef",
        level: 2,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2059_smbox",
        level: 2,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1106_byokai",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 5e3,
          atk: 0,
          def: 150,
          res: 20,
          ms: 1,
          attackSpeed: 100,
          aspd: 1,
          hpRecoveryPerSec: 0,
          spRecoveryPerSec: 1,
          weight: 0,
          tauntLevel: 0,
          epDamageResistance: 0,
          epResistance: 0,
          stunImmune: false,
          silenceImmune: true,
          sleepImmune: false,
          frozenImmune: false,
          levitateImmune: false,
          lifepoint: 0,
          range: -1,
          talentBlackboard: [
            {
              key: "byokai_buff",
              duration: 60
            }
          ]
        }
      },
      {
        id: "enemy_1254_lypa",
        level: 0,
        min_count: 9,
        max_count: 13,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1264_durgrd_2",
        level: 0,
        min_count: 2,
        max_count: 2,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1255_lybgpa",
        level: 0,
        min_count: 5,
        max_count: 5,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1256_lyacpa",
        level: 0,
        min_count: 0,
        max_count: 2,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1273_stmgun",
        level: 0,
        min_count: 4,
        max_count: 4,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1331_cbsisy",
        level: 0,
        min_count: 3,
        max_count: 3,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      }
    ]
  },
  {
    id: "ro3_e_6_1",
    levelId: "level_rogue3_6-1",
    tags: [
      "rogue_sami"
    ],
    category: null,
    characterLimit: 6,
    initialCost: 20,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "霜与沙",
    name_ja: "霜と砂",
    name_en: "Frost_and_Sand",
    description_zh: "居住在大地尽头入口的两个种族同时以躯壳的形态出现在此地。或许，冰原与沙漠的尽头，并无二致。",
    description_ja: "大地の果ての入口で暮らす二つの種族の成れの果てが、同時にこの地に現れた。もしかすると、氷原と砂漠の果てにそれほど大きな違いはないのかもしれない。",
    description_en: "Two races living at the entrance to the land's end have appeared here in the form of husks. Perhaps the ends of both the icefield and the desert are not dissimilar.",
    addInfo_zh: null,
    addInfo_ja: null,
    addInfo_en: null,
    eliteDesc_zh: [
      "所有敌方单位的攻击力+20%，防御力+30%，生命值+50%，移动速度+30%",
      "场地内部分位置无法部署"
    ],
    eliteDesc_ja: [
      "敵全員の攻撃力+20%、防御力+30%、最大HP+50%、移動速度+30%",
      "1つのマスが配置不可に"
    ],
    eliteDesc_en: [
      "All enemy units have +20% ATK, +30% DEF, +50% Max HP and +30% Movespeed",
      "1 tile forbid deployment"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          atk: 1.2,
          def: 1.3,
          hp: 1.5,
          ms: 1.3
        }
      }
    ],
    routes: null,
    floors: [
      6
    ],
    sp_terrain: null,
    sp_enemy: {
      normal: "79",
      elite: null,
      fixed: false
    },
    enemies: [
      {
        id: "enemy_2001_duckmi",
        level: 2,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 2,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2034_sythef",
        level: 2,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2059_smbox",
        level: 2,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2043_smsbr",
        level: 0,
        min_count: 20,
        max_count: 20,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2044_smwiz",
        level: 0,
        min_count: 7,
        max_count: 8,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1062_rager_2",
        level: 0,
        min_count: 6,
        max_count: 6,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1093_ccsbr_2",
        level: 0,
        min_count: 27,
        max_count: 27,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1095_ccripr_2",
        level: 0,
        min_count: 11,
        max_count: 11,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1058_traink_2",
        level: 0,
        min_count: 6,
        max_count: 6,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1106_byokai",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 5e3,
          atk: 0,
          def: 150,
          res: 20,
          ms: 1,
          attackSpeed: 100,
          aspd: 1,
          hpRecoveryPerSec: 0,
          spRecoveryPerSec: 1,
          weight: 0,
          tauntLevel: 0,
          epDamageResistance: 0,
          epResistance: 0,
          stunImmune: false,
          silenceImmune: true,
          sleepImmune: false,
          frozenImmune: false,
          levitateImmune: false,
          lifepoint: 0,
          range: -1,
          talentBlackboard: [
            {
              key: "byokai_buff",
              duration: 60
            }
          ]
        }
      }
    ]
  },
  {
    id: "ro3_e_6_2",
    levelId: "level_rogue3_6-2",
    tags: [
      "rogue_sami"
    ],
    category: null,
    characterLimit: 6,
    initialCost: 10,
    costIncreaseTime: 1,
    code: "ISW-NO",
    name_zh: "生灵的终点",
    name_ja: "生命の果て",
    name_en: "Terminus_of_Life",
    description_zh: "寒灾的存在本身就是一种警告：如果再不为了生命而战，就将如它一般迎来终结。\n<@rolv.rem>场地中有喷出气流的<源石流发生装置></>",
    description_ja: "命のために戦わぬ限り、必ず終末が訪れる――寒災の存在は、それを示すある種の警告だ。\n<@rolv.rem>戦場に気流を生み出す<源石気流発生装置>が出現。</>",
    description_en: "The existence of 'Frozen Monstrosities' is itself a warning: If you don't fight for your life, you will end up just like it.\n<@rolv.rem><Originium Jetstreams> that generate airflow currents are present on the field</>",
    addInfo_zh: [
      "寒灾初始无敌时长改为40s"
    ],
    addInfo_ja: [],
    addInfo_en: [
      "Frozen Monstrosity's initial invincible duration changed to 40s"
    ],
    eliteDesc_zh: [
      "所有敌方单位的攻击力+20%，生命值+40%，法术抗性+30",
      "雪怪术师与雪怪术师组长的攻击范围+100%"
    ],
    eliteDesc_ja: [
      "敵全員の攻撃力+20%、最大HP+40%、術耐性+30",
      "<スノーキャスター>と<スノーキャスター隊長>の攻撃範囲+100%"
    ],
    eliteDesc_en: [
      "All enemy units have +20% ATK, +40% Max HP and +30 RES",
      "<Yeti Caster> and <Yeti Caster Leader> have +100% Attack range"
    ],
    elite_mods: [
      {
        targets: [
          "ALL"
        ],
        mods: {
          atk: 1.2,
          hp: 1.4,
          fixed_res: 30
        }
      },
      {
        targets: [
          "enemy_1068_snmage_2",
          "enemy_1068_snmage"
        ],
        mods: {
          range: 2
        }
      }
    ],
    routes: null,
    floors: [
      6
    ],
    sp_terrain: null,
    sp_enemy: {
      normal: 40,
      elite: null,
      fixed: true
    },
    enemies: [
      {
        id: "enemy_1072_dlancer_2",
        level: 0,
        min_count: 3,
        max_count: 3,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1072_dlancer",
        level: 0,
        min_count: 2,
        max_count: 2,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1267_nhpbr_2",
        level: 0,
        min_count: 8,
        max_count: 8,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2034_sythef",
        level: 2,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2002_bearmi",
        level: 2,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2059_smbox",
        level: 2,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_2001_duckmi",
        level: 2,
        min_count: 0,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1068_snmage_2",
        level: 0,
        min_count: 7,
        max_count: 7,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 12e3
        }
      },
      {
        id: "enemy_1068_snmage",
        level: 0,
        min_count: 8,
        max_count: 8,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 7500
        }
      },
      {
        id: "enemy_2007_flwitch",
        level: 0,
        min_count: 1,
        max_count: 1,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          lifepoint: 5,
          talentBlackboard: [
            [
              {
                key: "invincible",
                value: 40
              }
            ]
          ]
        }
      },
      {
        id: "enemy_1069_icebrk_2",
        level: 0,
        min_count: 2,
        max_count: 2,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1272_nhtank_2",
        level: 0,
        min_count: 8,
        max_count: 8,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: null
      },
      {
        id: "enemy_1106_byokai",
        level: 0,
        min_count: 0,
        max_count: 0,
        elite_min_count: null,
        elite_max_count: null,
        overwrittenData: {
          hp: 5e3,
          atk: 0,
          def: 150,
          res: 20,
          ms: 1,
          attackSpeed: 100,
          aspd: 1,
          hpRecoveryPerSec: 0,
          spRecoveryPerSec: 1,
          weight: 0,
          tauntLevel: 0,
          epDamageResistance: 0,
          epResistance: 0,
          stunImmune: false,
          silenceImmune: true,
          sleepImmune: false,
          frozenImmune: false,
          levitateImmune: false,
          lifepoint: 0,
          range: -1,
          talentBlackboard: [
            {
              key: "byokai_buff",
              duration: 60
            }
          ]
        }
      }
    ]
  }
];

const cc12stages = [
  "迷雾战区_12-1",
  "尚蜀山道_12-1",
  "盐风溶洞_12-1",
  "伦蒂尼姆边缘区块_12-1",
  "小丘郡物流站_12-1",
  "在建沙滩_12-1",
  "冻原矿场_12-1",
  "盐风溶洞_12-2",
  "伦蒂尼姆边缘区块_12-2",
  "小丘郡物流站_12-2",
  "在建沙滩_12-2",
  "冻原矿场_12-2",
  "迷雾战区_12-2",
  "无名庇护所"
];
const LANGUAGES = ["en", "ja", "zh"];
const PAGES = ["about", "credits", "mizuki", "cc", "laoli"];
const pagesToRender = LANGUAGES.reduce((acc, language) => {
  for (const page of PAGES) {
    acc.push(`/${language}/${page}`);
  }
  for (const stage of stagesList) {
    const stageName = stage.code + "_" + (stage[`name_${language}`] || stage["name_zh"]);
    acc.push(`/${language}/stages/${stageName}`);
  }
  for (const stage of cc12stages) {
    acc.push(`/${language}/stages/${stage}`);
  }
  return acc;
}, []);
async function GET() {
  const mainUrl = "https://tomimi.dev";
  return new Response(
    `
        <?xml version="1.0" encoding="UTF-8" ?>
        <urlset
            xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
            xmlns:xhtml="https://www.w3.org/1999/xhtml"
            xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
            xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
            xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
            xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
        >
            ${pagesToRender.filter((url) => !url.includes("credit")).map(
      (url) => `<url>
									<loc>${mainUrl}${url}</loc>
									<changefreq>Monthly</changefreq>
								</url>`
    ).join("\n")}
        </urlset>`.trim(),
    {
      headers: {
        "Content-Type": "application/xml"
      }
    }
  );
}

export { GET };
//# sourceMappingURL=_server-df0db624.js.map
