var ZJNGEx;
(function (ZJNGEx) {
    ZJNGEx.type = NG.ImportType.Extension;
    function extensionFun(lib, game, ui, get, ai, _status) {
        var heros = {
            character: {
                zjm01_yangjuebo: [NG.Sex.MALE, NG.Group.WOOD, 5, ["zj_laobo"], []],
                zjm01_zhengbosen: [NG.Sex.MALE, NG.Group.WOOD, 4, ["zj_bosen"], []],
            },
            characterTitle: {
                zjm01_yangjuebo: "盟主捞波",
                zjm01_zhengbosen: "老鬼"
            },
            characterIntro: {},
            skill: {
                zj_laobo: {
                    name: "捞波",
                    enable: NG.EnableTrigger.phaseUse,
                    usable: 1,
                    precontent: function (event, step, source, player, target, targets, card, cards, skill, forced, num, trigger, result) {
                        player.storage.zj_laobo_targets = [];
                        player.storage.zj_laobo_num = 0;
                    },
                    content: function (event, step, source, player, target, targets, card, cards, skill, forced, num, trigger, result) {
                        var storageTargets = player.storage.zj_laobo_targets;
                        var storageNum = player.storage.zj_laobo_num;
                        var haveHandCard = player.countCards("h") > 0;
                        'step 0';
                        if (NG.ObjectUtil.isUndefined(storageTargets) || NG.ObjectUtil.isUndefined(storageNum)) {
                            console.error("不明原因，zj_laobo的标记变量没有生成！");
                            event.finish();
                            return;
                        }
                        'step 1';
                        if (haveHandCard) {
                            player.chooseCardTarget({
                                filterCard: true,
                                selectCard: [1, Infinity],
                                filterTarget: function (card, player, target) {
                                    return player != target;
                                },
                                prompt: "选择要交给牌与玩家",
                                forced: true
                            });
                        }
                        else {
                            event.finish();
                        }
                        'step 2';
                        if (result.bool) {
                            storageTargets.push(target);
                            result.targets[0].gain(result.cards, player, "gain");
                            player.storage.zj_laobo_num += result.cards.length;
                        }
                        'step 3';
                        if (haveHandCard) {
                            event.goto(1);
                        }
                        'step 4';
                        var loseHp = player.maxHp - player.hp;
                        player.draw(loseHp);
                        player.recover(1);
                        if (storageNum >= 2) {
                            var list = [];
                            if (player.canUse({ name: "tao" }, player)) {
                                list.push("tao");
                            }
                            if (player.canUse({ name: "jiu" }, player)) {
                                list.push("jiu");
                            }
                            if (list.length) {
                                player.chooseButton([
                                    "是否视为视为对你使用一张【血】或【魔】？",
                                    [list, NG.TypeConst.VCARD]
                                ]);
                            }
                            else {
                                event.finish();
                            }
                        }
                        'step 5';
                        if (result && result.bool && result.links[0]) {
                            var vard = { name: result.links[0][2], nature: result.links[0][3] };
                            player.chooseUseTarget(vard, true);
                        }
                    },
                    contentAfter: function (event, step, source, player, target, targets, card, cards, skill, forced, num, trigger, result) {
                        delete player.storage.zj_laobo_targets;
                        delete player.storage.zj_laobo_num;
                    }
                },
                zj_bosen: {
                    name: "博森",
                    group: ["zj_bosen_zj_bosen_1", "zj_bosen_zj_bosen_2"],
                    subSkill: {
                        zj_bosen_1: {
                            trigger: {
                                player: [
                                    NG.StateTrigger.loseHp + NG.TriggerEnum.End,
                                    NG.StateTrigger.damage + NG.TriggerEnum.End,
                                ]
                            },
                            filter: function (event, player) {
                                window.gameTestLog("filter触发", event);
                                return event.num > 0;
                            },
                            forced: true,
                            content: function (event, step, source, player, target, targets, card, cards, skill, forced, num, trigger, result) {
                                "step 0";
                                player.storage.zj_bosen_1_flag = trigger.num;
                                "step 1";
                                player.chooseTarget(lib.translate.zj_bosen_zj_bosen_1_info);
                                "step 2";
                                window.gameTestLog("当前还剩次数", player.storage.zj_bosen_1_flag);
                                if (result.bool && result.targets.length > 0) {
                                    result.targets[0].draw(2);
                                }
                                player.storage.zj_bosen_1_flag--;
                                if (player.storage.zj_bosen_1_flag > 0) {
                                    event.goto(1);
                                }
                                "step 3";
                                delete player.storage.zj_bosen_1_flag;
                            },
                            description: "当你除去1点血量后，你令任一角色摸两张牌"
                        },
                        zj_bosen_2: {
                            trigger: {
                                player: NG.StateTrigger.die + NG.TriggerEnum.Begin
                            },
                            content: function (event, player, trigger, result) {
                                "step 0";
                                player.chooseTarget(lib.translate.zj_bosen_zj_bosen_2_info);
                                "step 1";
                                if (result.bool && result.targets.length > 0) {
                                    result.targets[0].gain(player.getCards("hej"));
                                    result.targets[0].gainMaxHp(1);
                                }
                            },
                            description: "当你死亡时，你可以将你的所有牌交给任一其他角色，然后令其血量+1"
                        }
                    }
                }
            },
            translate: {
                zjm01_yangjuebo: "杨爵波",
                zj_laobo: "捞波",
                zj_laobo_info: "阶段技，你可以将任意数量的手牌交给任意角色(至少1张)，你摸X张牌且血量+1，若其获得你给出的牌张数不小于2，你可以视为对你使用一张【血】或【魔】(X为你已损失的血量)。",
                zjm01_zhengbosen: "郑博森",
                zj_bosen: "博森",
                zj_bosen_info: "锁定技，当你除去1点血量后，你令任一角色摸两张牌；当你死亡时，你可以将你的所有牌交给任一其他角色，然后令其血量+1。",
            }
        };
        var skills = {
            skill: {},
            translate: {}
        };
        var cards = {
            card: {},
            skill: {},
            list: [],
            translate: {}
        };
        var extensionData = {
            name: "ZJ_Sha",
            editable: true,
            config: {
                start_wuxing: {
                    name: "启用五行属性",
                    init: true,
                    intro: "将”魏蜀吴群神“变为”水火木土金“",
                    frequent: true,
                    onclick: updateWuxingName
                },
                start_wuxingSkill: {
                    name: "启用五行属性主公技",
                    init: true,
                    intro: "在身份局中，不同属性的身份会拥有不同的主公技",
                    frequent: true,
                    onclick: function (item) {
                        console.log("点击后输出的结果为111：", item);
                    }
                }
            },
            precontent: function (data) {
            },
            content: function (config, pack) {
                if (config.start_wuxing) {
                    updateWuxingName(true);
                }
            },
            onremove: function () {
            },
            package: {
                author: "神雷zero",
                intro: "ZJ联盟杀",
                version: "1.0.0",
                character: heros,
                skill: skills,
                card: cards,
            },
            translate: {
                ZJ_Sha: "ZJ联盟杀",
            },
            help: {
                ZJ联盟杀: NG.Utils.createHelp([
                    "先测试下1",
                    "先测试下2",
                    ["先测试下2.1", "先测试下2.2"],
                    "先测试下3",
                    "先测试下4",
                    ["先测试下4.1", "先测试下4.2"]
                ])
            }
        };
        return extensionData;
    }
    ZJNGEx.extensionFun = extensionFun;
    function updateWuxingName(bool) {
        if (bool) {
            lib.translate.wei = "水";
            lib.translate.shu = "火";
            lib.translate.wu = "木";
            lib.translate.qun = "土";
            lib.translate.shen = "金";
        }
        else {
            lib.translate.wei = "魏";
            lib.translate.shu = "蜀";
            lib.translate.wu = "吴";
            lib.translate.qun = "群";
            lib.translate.shen = "神";
        }
    }
    function updateWuxingSkill(bool) {
    }
})(ZJNGEx || (ZJNGEx = {}));
game.import(ZJNGEx.type, ZJNGEx.extensionFun);
