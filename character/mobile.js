'use strict';
game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		name:'mobile',
		connectBanned:['miheng'],
		connect:true,
		characterSort:{
			mobile:{
				mobile_default:["miheng","taoqian","liuzan","lingcao","sunru","lifeng","zhuling","liuye","zhaotongzhaoguang","majun","simazhao","wangyuanji","pangdegong","shenpei"],
				mobile_fire:["re_sp_zhugeliang","re_xunyu","re_dianwei","re_yanwen","re_pangtong","xin_yuanshao"],
				mobile_forest:['re_zhurong','re_menghuo','re_dongzhuo','re_sunjian','re_caopi'],
				mobile_others:["re_jikang","old_bulianshi","old_yuanshu","re_wangyun"],
			},
		},
		character:{
			re_jikang:["male","wei",3,["new_qingxian","new_juexiang"]],
			old_bulianshi:['female','wu',3,['anxu','zhuiyi']],
			miheng:['male','qun',3,['kuangcai','shejian']],
			taoqian:['male','qun',3,['zhaohuo','yixiang','yirang']],
			liuzan:['male','wu',4,['fenyin']],lingcao:['male','wu',4,['dujin']],
			sunru:['female','wu',3,['yingjian','shixin']],
			lifeng:['male','shu',3,['tunchu','shuliang']],
			zhuling:['male','wei',4,['xinzhanyi']],
			liuye:['male','wei',3,['polu','choulve']],
			zhaotongzhaoguang:["male","shu",4,["yizan_use","xinfu_longyuan"],[]],
			majun:["male","wei",3,["xinfu_jingxie1","xinfu_qiaosi"],[]],
			simazhao:["male","wei",3,["xinfu_daigong","xinfu_zhaoxin"],[]],
			wangyuanji:["female","wei",3,["xinfu_qianchong","xinfu_shangjian"],[]],
			pangdegong:["male","qun",3,["xinfu_pingcai","xinfu_pdgyingshi"],[]],
			re_sp_zhugeliang:["male","shu",3,["rehuoji","rekanpo","bazhen"],[]],
			re_xunyu:["male","wei",3,["quhu","rejieming"],[]],
			re_dianwei:["male","wei",4,["reqiangxi"],[]],
			re_yanwen:["male","qun",4,["reshuangxiong"],[]],
			re_pangtong:['male','shu',3,['xinlianhuan','niepan'],[]],
			xin_yuanshao:['male','qun',4,['reluanji','xueyi'],['zhu']],
			old_yuanshu:['male','qun',4,['xinyongsi','yjixi']],
			
			shenpei:["male","qun","2/3",["shouye","liezhi"],[]],
			re_zhurong:['female','shu',4,['juxiang','relieren']],
			re_menghuo:['male','shu',4,['huoshou','rezaiqi']],
			re_wangyun:['male','qun',3,['relianji','remoucheng']],
			re_dongzhuo:['male','qun',8,['rejiuchi','roulin','benghuai','baonue'],['zhu']],
			re_sunjian:['male','wu',4,['gzyinghun','repolu']],
			re_caopi:['male','wei',3,['rexingshang','refangzhu','songwei'],['zhu']],
		},
		characterIntro:{
			shenpei:'审配（？－204年），字正南，魏郡阴安（今河北清丰北）人。为人正直， 袁绍领冀州，审配被委以腹心之任，并总幕府。河北平定，袁绍以审配、逢纪统军事，审配恃其强盛，力主与曹操决战。曾率领弓弩手大破曹军于官渡。官渡战败，审配二子被俘，反因此受谮见疑，幸得逢纪力保。袁绍病死，审配等矫诏立袁尚为嗣，导致兄弟相争，被曹操各个击破。曹操围邺，审配死守数月，终城破被擒，拒不投降，慷慨受死。',
		},
		card:{
			pss_paper:{
				type:'pss',
				fullskin:true,
				derivation:'shenpei',
			},
			pss_scissor:{
				type:'pss',
				fullskin:true,
				derivation:'shenpei',
			},
			pss_stone:{
				type:'pss',
				fullskin:true,
				derivation:'shenpei',
			},
			db_atk1:{
				type:'db_atk',
				fullimage:true,
				derivation:'shenpei',
			},
			db_atk2:{
				type:'db_atk',
				fullimage:true,
				derivation:'shenpei',
			},
			db_def1:{
				type:'db_def',
				fullimage:true,
				derivation:'shenpei',
			},
			db_def2:{
				type:'db_def',
				fullimage:true,
				derivation:'shenpei',
			},
		},
		characterFilter:{},
		skill:{
			rexingshang:{
				audio:'xingshang',
				trigger:{global:'die'},
				filter:function(event,player){
					return player.isDamaged()||event.player.countCards('he')>0;
				},
				direct:true,
				content:function(){
					"step 0"
					var choice=[];
					if(player.isDamaged()) choice.push('回复体力');
					if(trigger.player.countCards('he')) choice.push('获得牌');
					choice.push('cancel2');
					player.chooseControl(choice).set('prompt',get.prompt2('rexingshang')).set('ai',function(){
						if(choice.length==2) return 0;
						if(get.value(trigger.player.getCards('he'))>8) return 1;
						return 0;
					});
					"step 1"
					if(result.control!='cancel2'){
						player.logSkill('rexingshang');
						if(result.control=='获得牌'){
							event.togain=trigger.player.getCards('he');
							player.gain(event.togain,trigger.player,'giveAuto');
						}
						else player.recover();
					}
				},
			},
			refangzhu:{
				audio:"fangzhu",
				trigger:{
					player:"damageEnd",
				},
				direct:true,
				content:function (){
					"step 0"
					player.chooseTarget(get.prompt2('refangzhu'),function(card,player,target){
						return player!=target
					}).ai=function(target){
						if(target.hasSkillTag('noturn')) return 0;
						var player=_status.event.player;
						if(get.attitude(_status.event.player,target)==0) return 0;
						if(get.attitude(_status.event.player,target)>0){
							if(target.classList.contains('turnedover')) return 1000-target.countCards('h');
							if(player.getDamagedHp()<3) return -1;
							return 100-target.countCards('h');
						}
						else{
							if(target.classList.contains('turnedover')) return -1;
							if(player.getDamagedHp()>=3) return -1;
							return 1+target.countCards('h');
						}
					}
					"step 1"
					if(result.bool){
						player.logSkill('refangzhu',result.targets);
						event.target=result.targets[0]
						event.target.chooseToDiscard('he',player.getDamagedHp()).set('ai',function(card){
							var player=_status.event.player;
							if(player.isTurnedOver()||_status.event.getTrigger().player.getDamagedHp()>2) return -1;
							return (player.hp*player.hp)-get.value(card);
						}).set('prompt','弃置'+get.cnNumber(player.getDamagedHp())+'张手牌并失去一点体力；或选择不弃置，将武将牌翻面并摸'+get.cnNumber(player.getDamagedHp())+'张牌。');
					}
					else event.finish();
					"step 2"
					if(result.bool){
						event.target.loseHp();
					}
					else{
						event.target.draw(player.getDamagedHp());
						event.target.turnOver();
					}
				},
				ai:{
					maixie:true,
					"maixie_hp":true,
					effect:{
						target:function (card,player,target){
							if(get.tag(card,'damage')){
								if(player.hasSkillTag('jueqing',false,target)) return [1,-2];
								if(target.hp<=1) return;
								if(!target.hasFriend()) return;
								var hastarget=false;
								var turnfriend=false;
								var players=game.filterPlayer();
								for(var i=0;i<players.length;i++){
									if(get.attitude(target,players[i])<0&&!players[i].isTurnedOver()){
										hastarget=true;
									}
									if(get.attitude(target,players[i])>0&&players[i].isTurnedOver()){
										hastarget=true;
										turnfriend=true;
									}
								}
								if(get.attitude(player,target)>0&&!hastarget) return;
								if(turnfriend||target.hp==target.maxHp) return [0.5,1];
								if(target.hp>1) return [1,0.5];
							}
						},
					},
				},
			},
			repolu:{
				audio:2,
				trigger:{
					source:'dieAfter',
					player:'die',
				},
				forceDie:true,
				filter:function(event,player,name){
					return name=='die'||player.isAlive();
				},
				direct:true,
				content:function(){
					'step 0'
					if(!player.storage.repolu) player.storage.repolu=0;
					event.num=player.storage.repolu+1;
					player.chooseTarget([1,Infinity],get.prompt('repolu'),'令任意名角色摸'+get.cnNumber(event.num)+'张牌').set('forceDie',true).ai=function(target){
						return get.attitude(_status.event.player,target);
					};
					'step 1'
					if(result.bool){
						player.storage.repolu++;
						result.targets.sortBySeat();
						player.logSkill('repolu',result.targets);
						game.asyncDraw(result.targets,num);
					}
					else event.finish();
					'step 2'
					game.delay();
				},
			},
			rejiuchi:{
				group:['jiuchi'],
				trigger:{source:'damage'},
				forced:true,
				popup:false,
				locked:false,
				audio:'jiuchi',
				filter:function(event,player){
					return event.card&&event.card.name=='sha'&&event.getParent(2).jiu==true&&!player.hasSkill('rejiuchi_air');
				},
				content:function(){
					player.logSkill('jiuchi');
					player.addTempSkill('rejiuchi_air');
				},
				subSkill:{
					air:{
						sub:true,
						init:function(player,skill){
							player.disableSkill(skill,'benghuai');
						},
						onremove:function(player,skill){
							player.enableSkill(skill);
						},
					},
				},
			},
			relianji:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return game.players.length>1;
				},
				filterTarget:lib.filter.notMe,
				targetprompt:['打人','被打'],
				selectTarget:2,
				multitarget:true,
				content:function(){
					'step 0'
					game.delay(0.5);
					if(targets[0].isDisabled(1)) event.goto(2);
					'step 1'
					var target=targets[0];
					var equip1=get.cardPile2(function(card){
						return get.subtype(card)=='equip1';
					});
					if(!equip1){
						player.popup('连计失败');
						game.log('牌堆中无装备');
						event.finish();
						return;
					}
					if(equip1.name=='qinggang'&&!lib.inpile.contains('qibaodao')){
						equip1.remove();
						equip1=game.createCard('qibaodao',equip1.suit,equip1.number);
					}
					target.$draw(equip1);
					target.chooseUseTarget(equip1,'noanimate','nopopup',true);
					'step 2'
					game.updateRoundNumber();
					var list=['nanman','wanjian','huogong','juedou','sha'];
					var list2=game.players.slice(0);
					list2.remove(player);
					for(var i=0;i<list.length;i++){
						if(!targets[0].canUse(list[i],targets[1],false)) list.splice(i--,1);
					}
					if(!list.length) return;
					var name=list.randomGet();
					if(name=='nanman'||name=='wanjian'){
						for(var i=0;i<list2.length;i++){
							if(!targets[0].canUse(name,list2[i],false)) list2.splice(i--,1);
						}
					}
					else list2=targets[1];
					targets[0].useCard({name:name},list2,'noai');
					game.delay(0.5);
				},
				ai:{
					order:8,
					result:{
						target:function(player,target){
							if(ui.selected.targets.length==0){
								return 1;
							}
							else{
								return -1;
							}
						}
					},
					expose:0.4,
					threaten:3,
				},
				group:'relianji_count',
				subSkill:{
					count:{
						sub:true,
						forced:true,
						popup:false,
						silent:true,
						trigger:{global:'damageEnd'},
						filter:function(event,player){
							var evt=event.getParent(3);
							return evt&&evt.name=='relianji'&&evt.player==player;
						},
						content:function(){
							if(!player.storage.relianji) player.storage.relianji=0;
							player.storage.relianji++;
							if(player.storage.relianji>2){
								event.trigger('remoucheng_awaken');
							}
						},
					},
				},
			},
			remoucheng:{
				derivation:'rejingong',
				trigger:{
					player:'remoucheng_awaken'
				},
				forced:true,
				juexingji:true,
				skillAnimation:true,
				animationColor:'thunder',
				content:function(){
					player.awakenSkill('remoucheng');
					player.removeSkill('relianji');
					player.addSkill('rejingong');
					player.gainMaxHp();
					player.recover();
				},
			},
			rejingong:{
				enable:'phaseUse',
				delay:0,
				usable:1,
				content:function(){
					'step 0'
					var list=get.inpile('trick').randomGets(2);
					if(Math.random()<0.5){
						list.push('wy_meirenji');
					}
					else{
						list.push('wy_xiaolicangdao');
					}
					for(var i=0;i<list.length;i++){
						list[i]=['锦囊','',list[i]];
					}
					player.chooseButton(['矜功',[list,'vcard']]).set('filterButton',function(button,player){
						return game.hasPlayer(function(current){
							return player.canUse(button.link[2],current,true,false);
						});
					}).set('ai',function(button){
						var player=_status.event.player;
						var name=button.link[2];
						if(game.hasPlayer(function(current){
							return player.canUse(name,current)&&get.effect(current,{name:name},player,player)>0;
						})){
							if(name=='wy_meirenji'||name=='wy_xiaolicangdao') return Math.random()+0.5;
							return Math.random();
						}
						return 0;
					});
					'step 1'
					if(result.bool){
						player.chooseUseTarget(result.links[0][2],true);
						player.addTempSkill('jingong2');
					}
				},
				ai:{
					order:2,
					result:{
						player:function(player){
							if((player.hp<=2||player.needsToDiscard())&&!player.getStat('damage')) return 0;
							return 1;
						}
					}
				}
			},
			relieren:{
				audio:'lieren',
				audioname:['boss_lvbu3'],
				trigger:{player:'shaBegin'},
				filter:function(event,player){
					return player.canCompare(event.target);
				},
				check:function(event,player){
					return get.attitude(player,event.target)<0;
				},
				priority:5,
				content:function(){
					"step 0"
					player.chooseToCompare(trigger.target);
					"step 1"
					if(result.bool){
						if(trigger.target.countGainableCards(player,'he')) player.gainPlayerCard(trigger.target,true,'he');
					}
					else{
						var card1=result.player;
						var card2=result.target;
						if(get.position(card1)=='d') trigger.target.gain(card1,'gain2');
						if(get.position(card2)=='d') player.gain(card2,'gain2');
					}
				}
			},
			rezaiqi:{
				init:function(player,skill){
					player.storage[skill]=0;
				},
				audio:'zaiqi',
				direct:true,
				filter:function(event,player){
					return player.storage.rezaiqi>0;
				},
				trigger:{
					player:'phaseDiscardEnd'
				},
				content:function(){
					'step 0'
					player.chooseTarget([1,player.storage.rezaiqi],get.prompt2('rezaiqi')).ai=function(target){
						return get.attitude(_status.event.player,target);
					};
					'step 1'
					if(result.bool){
						var targets=result.targets;
						targets.sortBySeat();
						player.line(targets,'fire');
						player.logSkill('rezaiqi',targets);
						event.targets=targets;
					}
					else event.finish();
					'step 2'
					event.current=targets.shift();
					if(player.isHealthy()) event._result={index:0};
					else event.current.chooseControl().set('choiceList',[
						'摸一张牌',
						'令'+get.translation(player)+'回复一点体力',
					]).set('ai',function(){
						if(get.attitude(event.current,player)>0) return 1;
						return 0;
					});
					'step 3'
					if(result.index==1){
						event.current.line(player);
						player.recover();
					}
					else event.current.draw();
					game.delay();
					if(targets.length) event.goto(2);
				},
				group:'rezaiqi_count',
			},
			rezaiqi_count:{
				trigger:{
					global:["loseEnd","cardsDiscardEnd"],
					player:'phaseAfter',
				},
				silent:true,
				forced:true,
				popup:false,
				filter:function (event,player,name){
					if(name=='phaseAfter') return true;
					if(_status.currentPhase!=player) return false;
					var evt=event.getParent();
					if(evt&&evt.name=='useCard'&&evt.card&&['equip','delay'].contains(get.type(evt.card))) return false;
					var cards=event.cards;
					for(var i=0;i<cards.length;i++){
						if(get.color(cards[i])=='red'&&get.position(cards[i])=='d') return true;
					}
					return false;
				},
				content:function(){
					if(event.triggername=='phaseAfter') player.storage.rezaiqi=0;
					else{
						var cards=trigger.cards;
						for(var i=0;i<cards.length;i++){
						if(get.color(cards[i])=='red'&&get.position(cards[i])=='d') player.storage.rezaiqi++;
						}
					}
				},
			},
			shouye:{
				audio:2,
				group:'shouye_after',
				trigger:{global:"useCard"},
				filter:function(event,player){
					return event.player!=player&&event.targets&&
					event.targets[0]==player&&event.targets.length==1;
				},
				check:function(event,player){
					return get.effect(player,event.card,event.player,player)<0;
				},
				usable:1,
				logTarget:'player',
				content:function(){
					'step 0'
					player.line(trigger.player,'green');
					player.chooseToDuiben(trigger.player);
					'step 1'
					if(result.bool){
						trigger.excluded.add(player);
						trigger.shouyeer=player;
					}
				},
				subSkill:{
					after:{
						sub:true,
						trigger:{global:'useCardAfter'},
						forced:true,
						silent:true,
						popup:false,
						filter:function(event,player){
							if(event.shouyeer!=player) return false;
							if(event.cards){
								for(var i=0;i<event.cards.length;i++){
									if(event.cards[i].isInPile()) return true;
								}
							}
							return false;
						},
						content:function(){
							var list=[];
								for(var i=0;i<trigger.cards.length;i++){
									if(trigger.cards[i].isInPile()){
										list.push(trigger.cards[i]);
									}
								}
								player.gain(list,'gain2');
						},
					},
				},
			},
			liezhi:{
				audio:2,
				group:'liezhi_damage',
				trigger:{player:'phaseBegin'},
				direct:true,
				filter:function(event,player){
					return !player.hasSkill('liezhi_disable');
				},
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt('liezhi'),'弃置至多两名角色区域内的各一张牌',[1,2],function(card,player,target){
						return target!=player&&target.countDiscardableCards(player,'hej')>0;
					}).ai=function(target){
						var player=_status.event.player;
						return get.effect(player,{name:'guohe'},target,player);
					};
					'step 1'
					if(result.bool){
						result.targets.sortBySeat();
						event.targets=result.targets;
						player.line(result.targets,'green');
						player.logSkill('liezhi',result.targets);
					}
					else event.finish();
					'step 2'
					event.current=targets.shift();
					player.discardPlayerCard(event.current,'hej',true)
					if(targets.length) event.redo();
				},
				subSkill:{
					disable:{
						sub:true,
						trigger:{player:'phaseAfter'},
						forced:true,
						silent:true,
						popup:false,
						charlotte:true,
						//filter:function(event){return !event.liezhi},
						content:function(){player.removeSkill('liezhi_disable')},
					},
					damage:{
						trigger:{player:'damage'},
						forced:true,
						silent:true,
						popup:false,
						content:function(){player.addSkill('liezhi_disable')}
					},
				},
			},
			xinzhanyi:{
				audio:'zhanyi',
				enable:'phaseUse',
				usable:1,
				filterCard:true,
				position:'he',
				check:function(card){
					var player=_status.event.player;
					if(player.hp<3) return 0;
					var type=get.type(card,'trick');
					if(type=='trick'){
						return 6-get.value(card);
					}
					else if(type=='equip'){
						if(player.hasSha()&&game.hasPlayer(function(current){
							return (player.canUse('sha',current)&&
								get.attitude(player,current)<0&&
								get.effect(current,{name:'sha'},player,player)>0)
						})){
							return 6-get.value(card);
						}
					}
					return 0;
				},
				content:function(){
					player.loseHp();
					switch(get.type(cards[0],'trick')){
						case 'basic':player.addTempSkill('xinzhanyi_basic');break;
						case 'equip':player.addTempSkill('xinzhanyi_equip');break;
						case 'trick':player.addTempSkill('xinzhanyi_trick');player.draw(3);break;
					}
				},
				ai:{
					order:9.1,
					result:{
						player:1
					}
				}
			},
			xinzhanyi_basic1:{
				trigger:{player:"useCard"},
				filter:function(event,player){
					return event.skill=='xinzhanyi_basic_backup'&&!player.storage.xinzhanyi_basic1;
				},
				forced:true,
				silent:true,
				popup:false,
				content:function(){
					trigger.xinzhanyi=true;
					player.storage.xinzhanyi_basic1=true;
				},
			},
			xinzhanyi_basic2:{
				trigger:{source:['damageBegin','recoverBegin']},
				forced:true,
				silent:true,
				popup:false,
				filter:function(event){
					return event.getParent(2).xinzhanyi==true;
				},
				content:function(){
					trigger.num++
				},
			},
			xinzhanyi_basic:{
				group:['xinzhanyi_basic1','xinzhanyi_basic2'],
				onremove:function(p,s){
					delete p.storage[s+1];
				},
				enable:"chooseToUse",
				filter:function (event,player){
					if(event.filterCard({name:'sha'},player,event)||
						event.filterCard({name:'jiu'},player,event)||
						event.filterCard({name:'tao'},player,event)){
						return player.hasCard(function(card){
							return get.type(card)=='basic';
						},'h');
					}
					return false;
				},
				chooseButton:{
					dialog:function (event,player){
						var list=[];
						if(event.filterCard({name:'sha'},player,event)){
							list.push(['基本','','sha']);
							list.push(['基本','','sha','fire']);
							list.push(['基本','','sha','thunder']);
						}
						if(event.filterCard({name:'tao'},player,event)){
							list.push(['基本','','tao']);
						}
						if(event.filterCard({name:'jiu'},player,event)){
							list.push(['基本','','jiu']);
						}
						return ui.create.dialog('战意',[list,'vcard'],'hidden');
					},
					check:function (button){
						var player=_status.event.player;
						var card={name:button.link[2],nature:button.link[3]};
						if(game.hasPlayer(function(current){
							return player.canUse(card,current)&&get.effect(current,card,player,player)>0;
						})){
							switch(button.link[2]){
								case 'tao':return 5;
								case 'jiu':{
									if(player.countCards('h',{type:'basic'})>=2) return 3;
								};
								case 'sha':
									if(button.link[3]=='fire') return 2.95;
									else if(button.link[3]=='thunder') return 2.92;
									else return 2.9;
							}
						}
						return 0;
					},
					backup:function (links,player){
						return {
							audio:'zhanyi',
							filterCard:function(card,player,target){
								return get.type(card)=='basic';
							},
							check:function(card,player,target){
								return 9-get.value(card);
							},
							viewAs:{name:links[0][2],nature:links[0][3]},
							position:'he',
							popname:true,
						}
					},
					prompt:function (links,player){
						return '将一张基本牌当做'+get.translation(links[0][3]||'')+get.translation(links[0][2])+'使用';
					},
				},
				ai:{
					order:function (){
						var player=_status.event.player;
						var event=_status.event;
						if(event.filterCard({name:'jiu'},player,event)&&get.effect(player,{name:'jiu'})>0&&player.countCards('h',{type:'basic'})>=2){
							return 3.3;
						}
						return 3.1;
					},
					save:true,
					respondSha:true,
					skillTagFilter:function (player,tag,arg){
						if(player.hasCard(function(card){
							return get.type(card)=='basic';
						},'he')){
							if(tag=='respondSha'){
								if(arg!='use') return false;
							}
						}
						else{
							return false;
						}
					},
					result:{
						player:1,
					},
				},
			},
			xinzhanyi_equip:{
				audio:'zhanyi',
				trigger:{player:'useCardToPlayered'},
				forced:true,
				filter:function(event,player){
					return event.card.name=='sha'&&event.target.countCards('he')>0;
				},
				check:function(event,player){
					return get.attitude(player,event.target)<0;
				},
				content:function(){
					'step 0'
					trigger.target.chooseToDiscard('he',true,2);
					'step 1'
					if(result.bool&&result.cards&&result.cards.length){
						if(result.cards.length==1){
							event._result={bool:true,links:result.cards.slice(0)};
						}
						else player.chooseButton(['选择获得其中的一张牌',result.cards.slice(0)],true).ai=function(button){
							return get.value(button.link);
						};
					}
					else event.finish();
					'step 2'
					if(result.links) player.gain(result.links,'gain2');
				}
			},
			xinzhanyi_trick:{
				mod:{
					wuxieRespondable:function(){
						return false;
					}
				}
			},
		},
		translate:{
			re_jikang:"手杀嵇康",
			old_bulianshi:'手杀步练师',
			old_caochun:'旧曹纯',
			shenpei:'审配',
			re_zhurong:'界祝融',
			re_menghuo:'界孟获',
			re_wangyun:'手杀王允',
			re_dongzhuo:'界董卓',
			re_sunjian:'界孙坚',
			re_caopi:'界曹丕',
			rejiuchi:'酒池',
			rejiuchi_info:'你可以将一张黑桃手牌当做【酒】使用。锁定技，当你于回合内使用带有【酒】效果的【杀】造成伤害时，你令你的【崩坏】失效直到回合结束。',
			repolu:'破虏',
			repolu_info:'当你杀死一名角色/死亡时，你可以令任意名角色摸X+1张牌。（X为你此前发动过【破虏】的次数）',
			rexingshang:'行殇',
			rexingshang_info:'当其他角色死亡后，你可以选择一项：回复1点体力，或获得其所有牌。',
			refangzhu:'放逐',
			refangzhu_info:'当你受到伤害后，你可以令一名其他角色选择一项：摸X张牌并将武将牌翻面，或弃置X张牌并失去1点体力。（X为你已损失的体力值）',
			relianji:'连计',
			relianji_info:'出牌阶段限一次，你可以选择两名其他角色。第一名角色随机使用牌堆中的一张武器牌，然后这名角色视为对另一名角色随机使用一张下列的牌名的牌：【决斗】、【火攻】、【南蛮入侵】、【万箭齐发】或普【杀】。然后若此牌造成伤害，你获得X枚“连计”标记（X为此次扣减的体力值点数）。',
			remoucheng:'谋逞',
			remoucheng_info:'觉醒技，当一名角色造成伤害后，若你拥有的“连计”标记数大于2，你加1点体力上限，回复1点体力，失去“连计”，获得“矜功”。',
			rejingong:'矜功',
			rejingong_info:'每回合可以用三个随机锦囊中的一个，三个锦囊中有一个是专属锦囊，本回合未造成伤害会失去1点体力。',
			mobile_default:'常规',
			mobile_fire:'界限突破•火',
			mobile_forest:'界限突破•林',
			mobile_others:'其他',
			
			pss:'手势',
			pss_paper:'布',
			pss_scissor:'剪刀',
			pss_stone:'石头',
			pss_paper_info:'石头剪刀布时的一种手势。克制石头，但被剪刀克制。',
			pss_scissor_info:'石头剪刀布时的一种手势。克制布，但被石头克制。',
			pss_stone_info:'石头剪刀布时的一种手势。克制剪刀，但被布克制。',
			
			db_atk:'进攻对策',
			db_atk1:'全军出击',
			db_atk2:'分兵围城',
			
			db_def:'防御对策',
			db_def1:'奇袭粮道',
			db_def2:'开城诱敌',
			
			shouye:'守邺',
			shouye_info:'每回合限一次。当其他角色使用牌指定你为唯一目标时，你可以与其进行【对策】。若你赢，则此牌对你无效，且你于此牌结算完成后获得其对应的所有实体牌。',
			liezhi:'烈直',
			liezhi_info:'准备阶段，你可以依次弃置至多两名角色区域内的各一张牌。若你受到过伤害，则〖烈直〗于你的下个回合无效。',
			relieren:'烈刃',
			relieren_info:'当你使用【杀】指定目标时，你可以和目标角色进行拼点。若你赢，你获得其一张牌。若你没赢，你获得对方的拼点牌，其获得你的拼点牌。',
			rezaiqi:'再起',
			rezaiqi_info:'弃牌阶段结束时，你可以令至多X名角色选择一项：1.摸一张牌，2.令你回复1点体力（X为本回合进入弃牌堆的红色牌数）',
			
			xinzhanyi:'战意',
			xinzhanyi_info:'出牌阶段限一次，你可以弃置一张牌并失去1点体力，然后根据你弃置的牌获得以下效果直到回合结束：基本牌，你可以将一张基本牌当作杀、酒或桃使用，且你本回合第一次以此法使用的牌的回复值/伤害值+1；锦囊牌，摸三张牌且你使用的牌不能被【无懈可击】响应；装备牌，你使用【杀】指定目标角色后，其弃置两张牌，然后你获得其中的一张。',
			xinzhanyi_basic_backup:'战意',
			xinzhanyi_basic:'战意',
			xinzhanyi_equip:'战意',
		}
	};
});
