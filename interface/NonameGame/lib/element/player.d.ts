declare namespace Lib.element {

    /**
     * 玩家类
     * 还有许多内部属性没暴露出来
     * 来源：lib.element.player
     */
    interface Player {
        //新函数
        /**
         * 选择对策（进攻/防御）
         * 注：应该是非三国杀常规玩法
         * @param target 
         */
        chooseToDuiben(target: Player): Event;
        /**
         * 发起石头，剪刀，布
         * @param target 
         */
        chooseToPSS(target: Player): Event;
        /**
         * 选择恢复一个装备栏
         */
        chooseToEnable(): Event;
        /**
         * 选择废除一个装备栏
         * @param horse 
         */
        chooseToDisable(horse?: boolean): Event;
        /**
         * 获取当前玩家已经废除的装备栏的数量
         */
        countDisabled(): number;
        /**
         * 判断是否是当前玩家的“出牌阶段”中
         * @param notmeisok 若是true，则强制返回false
         */
        isPhaseUsing(notmeisok?: boolean): boolean;
        /**
         * 交换玩家和目标装备区中的牌（所有）
         * @param target 
         */
        swapEquip(target: Player): Event;
        /**
         * 判断当前玩家是否能与目标玩家拼点
         * 
         * 按照三国杀规则 拼点发起者想和一名角色拼点 需要满足以下条件：
            1. 拼点发起者不是拼点目标
            2. 拼点发起者和拼点目标都有手牌(所以别指望秦宓白嫖拼点了 )
            3. 拼点目标不是陆抗 
            只有同时满足以上三个条件 函数才会返回true 否则返回结果为false
         * @param target 
         */
        canCompare(target: Player): boolean;
        /**
         * 废除一个指定装备栏
         * 
         * 这一类主要都是两种写法：
         * 直接数字：
         * 1=武器栏 2=防具栏 3=加一马栏 4=减一马栏 5=宝物栏
         * 
         * 使用字符串，既“equip”+对应的数字
         * @param pos 
         */
        disableEquip(pos: number|string): Event;
        /** 【动画】废除装备栏动画 */
        $disableEquip(skill: string): Player;
        /**
         * 恢复一个指定装备栏
         * @param pos 
         */
        enableEquip(pos: number|string): Event;
        /** 【动画】恢复装备栏动画 */
        $enableEquip(skill: string): Player;
        /** 
         * 判断玩家一个装备栏有没有被废除
         * 
         * 判断'equip'+arg 的装备区是否可以使用
         */
        isDisabled(arg: number | string): boolean;
        /**
         * 判断指定装备区的指定类型区域是否为空的（即既没有被废除 栏内也没有装备牌）
         * 例如：防具区（equip6）是否有防具
         * @param num 
         */
        isEmpty(num: number|string): boolean;
        /**
         * 废除判定区
         * 使该玩家markSkill('_disableJudge')
         */
        disableJudge(): any;
        
        //原有函数
        //初始化相关函数
        /**
         * 玩家初始化
         */
        init(character: string, character2: string, skill: string): Player;

        //联机相关初始化
        initOL(name: any, character: any): any;
        uninitOL(): any;
        initRoom(info: any, info2: any): any;

        /**
         * 重新初始化
         * @param from 原武将的名字（和玩家当前所显示的武将名一致，包括双将）
         * @param to 将要更新成对应武将的名字
         * @param maxHp 若是数组的话，则第一个为血量，第二为最大血量；若是false，则默认0；若为“nosmooth”，则默认使用当前的；
         * @param online 是否在线（没什么用），若为true，则不更新UI信息
         */
        reinit(from: string, to: string, maxHp?: number|string|[number,number], online?: boolean): void;
        /**
         * 重置清楚玩家Player的信息
         */
        uninit(): Player;


        /** 获取offsetLeft（元素左侧距离参照元素左边界偏移量） */
        getLeft(): number;
        /** 获取offsetTop（元素上方距离参照元素上边界偏移量） */
        getTop(): number;
        /** 【动画】化生 */
        smoothAvatar(vice: any, video: any): any;
        /** 【动画】换位置 */
        changeSeat(position: any, video: any): any;

        /** 【联机】发送信息 */
        send(...args): Player;
        /** 【非联机】重新设置palyerid */
        getId(): Player;
        /** 【联机】聊天，发送聊天信息 */
        chat(str: string): void;
        /** 【动画】显示聊天信息 */
        say(str: string): void;
        /** 显示投降/放弃 */
        showGiveup(): void;
        /** 【联机】同步可使用技能 */
        applySkills(skills: string[]): void;
        /**
         *  【联机】获取玩家当前的状态信息
         *  注：主要是联机同步信息用，将信息打包成json结果（不过不知为什么把div打包了）
         */
        getState(key): PlayerStateInfo;
        /** 【联机】设置nickname */
        setNickname(str: string): Player;

        /**
         * 设置虚拟形象/化身
         * @param name 设置前的原武将名
         * @param name2 化身后的武将名
         * @param video 是否记录进录像
         * @param fakeme 
         */
        setAvatar(name: string, name2: string, video?: boolean, fakeme?: boolean): void;
        /**
         * 设置虚拟形象/化身 队列列表
         * 注：按顺序取出队列的队头
         * @param name 设置前的原武将名
         * @param list 化生列表
         */
        setAvatarQueue(name: string, list: string[]): void;
        /**
         * 化身技能化身
         * @param skill 化身技能名
         * @param name 化身武将名
         */
        flashAvatar(skill: string, name: string): void;

        /**
         * 玩家信息更新
         * 注：主要更新血量，手牌数，标记
         */
        update(): Player;
        /**
         * 更新指定标记
         * @param i 指定标记名 
         * @param storage 指定同步记录（报错到录像记录里）
         */
        updateMark(i: string, storage?: string): Player;
        /**
         * 更新所有标记
         * @param connect 【联网】指定更新的标记名
         */
        updateMarks(connect?: string): void;
        /**
         * 获取指定区域卡牌/技能的数量
         * 注：和player.get一样，用得比较少，简单用法player.num(string,string)获取指定数量
         * @param arg1 若是“hej”任意组合，则是获取指定区域的牌；若为“s”则获取当前玩家包括全局技能的所有技能
         * @param arg2 过滤条件1
         * @param arg3 过滤条件2
         */
        num(arg1: string, arg2?: any, arg3?: any): number;
        /**
         *  画指引线（当前玩家到目标玩家）
         * @param target 目标玩家
         * @param config css画线的配置
         */
        line(target: Player, config: any): void;
        /**
         * 画多个目标的指引线（当前玩家到多个目标玩家）
         * @param targets 目标玩家列表
         * @param config css画线的配置
         */
        line2(targets: Player[], config: any): void;
        /**
         * 获取当前玩家的下一个玩家（下家）
         * 注：若当前有skill为“undist”，则没有下一个玩家；
         * 若遍历，直到找到下一个没有“undist”玩家
         */
        getNext(): Player;
        /**
         * 获取当前玩家的上一个玩家（上家）
         * 注：若当前有skill为“undist”，则没有上一个玩家；
         * 若遍历，直到找到上一个没有“undist”玩家
         */
        getPrevious(): Player;
        /**
         * 获取当前回合卡牌使用次数
         * @param card 若存在，则获取指定卡牌使用次数；若不存在，则获取所有卡牌使用次数
         */
        countUsed(card?: {name:string}): number;
        /** 获取当前回合指定技能skill的使用次数 */
        countSkill(skill: string): number;
        /**
         * 获取当前使用武将的存储的技能
         * @param unowned 是否获取自己本身拥有的，如不获取（false）则删除不属于本身拥有的技能（正常下，武将隐藏时无法获得该武将技能）
         * @param unique 是否是获取单独技能，如不是（false）则删除（带有unique，temp，sub字段）技能
         * @param hidden 是否隐藏 true的话，还没显示的武将的技能也获取
         */
        getStockSkills(unowned?: boolean, unique?: boolean, hidden?: boolean): string[];
        /**
         * 获取当前玩家的牌(根据类型指定)
         * @param arg1 获取玩家身上牌的类型：h手牌，e装备牌，j判定牌，可以多个拼接
         * @param arg2 获取牌的详细过滤条件（若是字符串则是卡牌名，若是对象是个cardSimpInfo结构）
         */
        getCards(arg1: string, arg2?: string | Object |OneParmFun<Card,boolean>): Card[];
        /**
         * 获取指定玩家可以弃置的当前玩家的牌
         * 执行lib.filter.canBeDiscarded,通过“canBeDiscarded”mod检测
         * @param player 
         * @param arg1 
         * @param arg2 
         */
        getDiscardableCards(player: Player, arg1?: any, arg2?: any): Card[];
        /**
         * 获取指定玩家可以获得的当前玩家的牌
         * 执行lib.filter.canBeGained,通过“canBeGained”mod检测
         * @param player 
         * @param arg1 
         * @param arg2 
         */
        getGainableCards(player: Player, arg1?: any, arg2?: any): Card[];
        /**
         * 获得当前玩家可获得的技能
         * （即name武将名，name1双将名1，name2双将名2）
         * @param func 过滤方法
         */
        getGainableSkills(func?:ThreeParmFun<any,string,string,boolean>): string[];
        /**
         * 计算获取当前玩家的牌数(根据类型指定)
         * @param arg1 获取玩家身上牌的类型：h手牌，e装备牌，j判定牌，可以多个拼接
         * @param arg2 获取牌的详细过滤条件（若是字符串则是卡牌名，若是对象是个cardSimpInfo结构）
         */
        countCards(arg1: string, arg2?: string | Object|OneParmFun<Card,boolean>): number;
        /**
         * 获取获取指定玩家可以弃置的当前玩家的牌的数量
         * @param player 
         * @param arg1 
         * @param arg2 
         */
        countDiscardableCards(player: Player, arg1?: any, arg2?: any): number;
        /**
         * 获取指定玩家可以获得的当前玩家的牌的数量
         * @param player 
         * @param arg1 
         * @param arg2 
         */
        countGainableCards(player: Player, arg1?: any, arg2?: any): number;
        /**
         * 获取当前玩家所拥有（武将）的原始的技能（即武将原配置的技能）
         */
        getOriginalSkills(): string[];
        /**
         * 获取玩家的技能。
         * 默认获取玩家（除了玩家forbiddenSkills上的禁用技能）的：
         *  武将技能skills+附加技能additionalSkills+临时技能tempSkills
         * @param arg2 若为true，获取技能附带隐藏技能hiddenSkills；若取值“e”，则只返回装备的技能
         * @param arg3 若为true/undefined，获取技能附带装备技能；取值false，则不附带装备技能；
         * @param arg4 若为true/undefined，获取技能经过game.filterSkills过滤后的技能；取值false则不选要过滤；
         * @return 返回最后收集到的玩家的技能   
         */
        getSkills(arg2?: boolean|string, arg3?: boolean, arg4?: boolean): string[];
        /**
         * 获取技能/区域卡牌
         * 注：下面参数的意义，读跟前一个参数相关，略乱 
         * (虽然功能强大，但是项目内貌似已经有各种细分的实现方式，该方法并没有多少使用)
         * 使用例子：手牌player.get("h");装备牌player.get("e");判定牌player.get("j")
         * @param arg1 若为“hej”任意组合，在是获取指定区域的卡牌；若是“s”，则是获取技能
         * @param arg2 过滤条件1
         * @param arg3 过滤条件2
         * @param arg4 过滤条件3
         */
        get(arg1: string, arg2?: any, arg3?: any, arg4?: any): any;
        /** 
         * 同步该技能的标记（同步Storage的内容）
         * 
         * 添加录像记录，并更新所有标记信息 
         */
        syncStorage(skill: string): void;
        /** 【联机】通信同步技能 */
        syncSkills(): void;
        /** 【动画】播放当前玩家的成为焦点的动画（一个缩放动画） */
        playerfocus(time: number): Player;
        /** 设置当前显示的身份标签 */
        setIdentity(identity?: string): Player;


        //玩家操作事件（这些都是些关键操作，骚后仔细研究）
        /**
         * 玩家获得一个额外回合
         * （从“phase”阶段开始）
         * @param skill 技能名
         * @param insert 是否直接插入当前行动回合，若为true，将其置于其插入event.next队列队头，在下一次loop立即执行
         */
        insertPhase(skill: string, insert: boolean): Event;
        /**
         * 在当前回合中插入一个事件
         * @param name 事件名
         * @param content 设置的content
         * @param arg 设置事件的参数map
         */
        insertEvent(name: string, content: string|ContentFunc, arg: SMap<any>): Event;
        /**
         * 回合阶段
         * @param skill 
         */
        phase(skill: string,...args): Event;
        /**
         * 判断阶段
         */
        phaseJudge(...args): Event;
        /**
         * 抽牌阶段
         */
        phaseDraw(...args): Event;
        /**
         * 出牌阶段
         */
        phaseUse(...args): Event;
        /**
         * 弃牌阶段
         */
        phaseDiscard(...args): Event;
        /**
         * 选择使用
         * @param use 若只有一个参数，则采用map方式入参
         */
        chooseToUse(...args): Event;
        /**
         * 选择响应
         * 发起“respond”响应事件
         */
        chooseToRespond(...args): Event;
        /**
         * 选择弃牌
         */
        chooseToDiscard(...args): Event;
        /**
         * 发起拼点，选择拼点。
         * 若多个目标，则content为：chooseToCompareMultiple
         * 只有一个目标，则content为：chooseToCompare
         * @param target 选择拼点的目标
         * @param check 设置ai的行动方法
         */
        chooseToCompare(target: Player|Player[], check?: OneParmFun<Card,any>): Event;
        /**
         * 选择获得一项技能
         * @param target 
         */
        chooseSkill(target: any): Event;
        /**
         * 选择一张牌进行操作(使用之/获得之/装备之... ...)
         * @param list 
         */
        discoverCard(list: string[]|Card[],...args): Event;

        //创建按钮系列事件
        /**
         * 创建选择button，暂停等待选择结果
         * 发起“chooseButton”事件；
         * 
         * 参数列表：
         *  boolean类型：对应next.forced，若没有，默认false(手动执行)；
         *  itemtype为"dialog"类型：对应next.dialog，是否使用当前已有的dialog面板;
         *  itemtype为"select"类型/number类型：对应next.selectButton，没有就默认[1,1],可选按钮数目;
         *  function类型：对应next.filterButton，若没有，默认lib.filter.filterButton;
         *  数组类型：next.createDialog,核心，创建dialog的信息，常用基本结构：
         *      [
         *      string的prompt文本,[item,type],  (上面部分主要是提供给dialog.add的参数，可直接参考add的参数)
         *      "hidden"/”notouchscroll“/”forcebutton“,布尔类型值 (下面部分是主要提供ui.create.dialog)
         *      ]；
         */
        chooseButton(...args): Event;
        /**
         * 创建选择卡牌按钮：
         * 发起“chooseButton”事件；
         * 
         * 参数列表：
         *  itemtype为”cards“：对应next.cards;
         *  boolean类型：对应next.forced，若没有，默认false(手动执行)；
         *  string类型：对应next.prompt;
         *  itemtype为"select"类型/number类型：对应next.selectButton，没有就默认[1,1],可选按钮数目;
         */
        chooseCardButton(...args): Event;
        /**
         * 创建选择虚拟卡牌按钮（vcard）
         * 发起“chooseButton”事件；
         * 
         * 参数列表：
         *  数组类型：卡牌名数字string[]；
         *  boolean类型：对应next.forced，若没有，默认false(手动执行)；
         *  string类型：对应next.prompt/;
         *  "notype"：不传入卡牌类型
         */
        chooseVCardButton(...args): Event;

        //【联机】联机专用选择按钮，选择卡牌
        chooseButtonOL(list: any, callback: any, ai: any): Event;
        chooseCardOL(...args): Event;

        /**
         * 发起选择卡牌
         * 
         * 参数列表：
         *  itemtype为"select"类型/number类型：对应next.selectCard，没有就默认[1,1],可选卡牌数目;
         *  boolean类型：对应next.forced，若没有，默认false(手动执行)；
         *  function类型：对应next.filterCard，若没有，默认lib.filter.all;
         *  itemtype为“position”类型：对应next.position,应该就是窗口位置了
         *  string类型：对应next.prompt/prompt2，可以用"###+prompt+###+prompt2"格式字符串;
         *  “glow_result”：设置next.glow_result=true;
         */
        chooseCard(...args): Event;
        /**
         * 选择使用的目标
         */
        chooseUseTarget(...args): Event;
        /**
         * 发起选择目标
         * 
         * 参数列表：（其实去参考selectTarget中对应参数即可）
         *  itemtype为"select"类型/number类型：对应next.selectTarget，没有就默认[1,1],可选目标数目;
         *  boolean类型：对应next.forced，若没有，默认false(手动执行)；
         *  function类型：对应next.filterTarget，若没有，默认lib.filter.all;
         *  string类型：对应next.prompt/prompt2，可以用"###+prompt+###+prompt2"格式字符串;
         *  itemtype为"dialog"类型：对应next.dialog,且next.prompt=false,使用当前已有的会话面板；
         */
        chooseTarget(...args): Event;
        /**
         * 选择卡牌与目标
         * 
         * @param choose 只有一个参数时，使用map结构入参,目前总结了choose系列得参数为CheckEventData
         */
        chooseCardTarget(choose: CheckEventData): Event;
        /**
         * 选择列表的控制面板
         * @param args 
         */
        chooseControlList(...args): Event;
        /**
         * 选择的控制面板
         * @param args 
         */
        chooseControl(...args): Event;
        /**
         * 拥有“确认”，“取消”的选择面板
         */
        chooseBool(...args): Event;
        /**
         * 选择摸牌或者回血
         * @param args 
         */
        chooseDrawRecover(...args): Event;
        /**
         * 选将目标玩家的牌（1张）
         * 注：选择手牌时，时随机的
         * @param args 
         */
        choosePlayerCard(...args): Event;
        /**
         * 弃置目标玩家的牌
         * @param args 
         */
        discardPlayerCard(...args): Event;
        /**
         * 获得目标玩家的牌
         * @param args 
         */
        gainPlayerCard(...args): Event;
        /**
         * 展示玩家的手牌
         * @param str 
         * @param args 
         */
        showHandcards(str: string, ...args): Event;
        /**
         * 玩家展示的牌
         * @param cards 
         * @param str 
         * @param args 
         */
        showCards(cards: Card[], str: string, ...args): Event;
        /**
         * 展示卡牌（带一个确认按钮）
         * @param str 
         * @param cards 
         * @param args 
         */
        viewCards(str: string, cards: Card[], ...args): Event;
        /**
         * 展示目标的手牌
         * 注：通过调用player.viewCards实现
         * @param target 
         * @param args 
         */
        viewHandcards(target: Player, ...args): Event;
        /**
         * 是否有可移动牌的玩家（目标）
         * 注：包括判定去和装备区的牌
         * @param withatt 是否进行判断玩家之间的态度（get.attitude），若不是true则不需要判断
         */
        canMoveCard(withatt?: boolean): boolean;
        /**
         * 移动场上的卡牌（判定区和装备区）
         */
        moveCard(...args): Event;
        /**
         * 处理使用event.result,根据结果决定是否useCard或者useSkill
         * @param result 
         * @param event 
         */
        useResult(result: any, event: any): Event;
        /**
         * 使用卡牌
         * 
         * 关于useCard流程中的各种新时机(摘抄自苏大佬的资料)
         * useCard1(声明使用牌后)和useCard2(使用牌选择目标后)
            useCard1目前在无名杀里只有朱雀羽扇（程普没有使用这个时机）
            useCard2一般是一些（可以令一些其他角色也成为XXX牌目标）的技能

            之后就是大家熟悉的useCard(牌被使用时)时机
            一般用于一些纯粹摸牌系和全体强命系的技能

            而useCardToPlayer(指定目标时)和useCardToTarget(成为目标时) 则往往是一些会改变卡牌目标数的技能
            useCardToPlayer和useCardToTarget这两个时机 对卡牌的所有目标都会依次触发一遍 此时trigger.target即为被触发的目标
            需要特别注意的是：这两个时机的trigger本身并不是useCard事件 trigger.parent/trigger.getParent()才是
            之后依然是一连串的useCardToPlayered(指定目标后)和useCardToTargeted(成为目标后)的时机了
            注意要点和上面差不多。
         * 
         * 另外关于新版本卡牌强命的方法
            除原有的wuxieRespondable的mod和norespond的skillTag之外 还可以通过以下的方法实现卡牌强命/不可无懈
            useCard事件的directHit列表 即为【不能使用或打出牌响应卡牌】的角色
            想让此牌完全不能被响应，把场上所有角色都加进这个列表就行了。
         * 
         * 只想让卡牌不能被无懈：直接把玩家目标的nowuxie属性设置为true即可。
         * 
         * customArgs
         * 
         * 关于该事件非常复杂，还需要另外详细讨论（之前有一版旧版该方法的讨论，需要更新 by2020-2-23）
         */
        useCard(...args): Event;
        /**
         * 使用技能
         */
        useSkill(...args): Event;
        /**
         * 抽牌
         * 
         * 参数列表：
         *  number类型：设置next.num;
         *  itemtype为“player”类型：设置next.source，即让你抽牌的源头；
         *  bool类型：设置next.animate;
         *  有“drawDeck”属性的对象类型：设置next.drawDeck；（正常玩法下没什么用这个）
         *  itemtype为以下特殊字符串：
         *      “nodelay”：设置next.$draw=true;
         *      “visible”：设置next.visible=true，设置抽出的卡可显示;
         *      “bottom”：设置next.bottom=true，即设置从牌堆底抽卡;
         */
        draw(...args): Event;
        /**
         * 角色将手牌摸至X张，若角色手牌数不小于X则无事发生
         * @param num 
         * @param args 基本与draw一致，改成了数组的存储模式
         */
        drawTo(num:number,args:any[]): Event;
        /**
         * 随机弃置x张牌（手牌和装备区）
         */
        randomDiscard(...args): Card[];
        /**
         * 随机会获得x张牌
         * @param args 
         */
        randomGain(...args): Card[];
        /**
         * 弃牌
         */
        discard(...args): Event;
        /**
         * 响应
         * 触发“respond”阶段
         */
        respond(...args): Event;
        /**
         * 玩家和目标交换手牌
         * @param target 目标玩家
         * @param cards1 该玩家的手牌，若没有，默认全部
         * @param cards2 目标玩家的手牌，若没有，默认全部
         */
        swapHandcards(target: Player, cards1?: Card[], cards2?: Card[]): Event;
        /** 直接装备（看起来好像时直接UI动画上的装备，实际情况到时看代码才知道） */
        directequip(cards: Card[]): void;
        /**
         * 直接获得牌（加入到玩家手牌中）
         * @param cards 
         */
        directgain(cards: Card[]): Player;
        /**
         * 获得多个目标的牌
         * @param targets 
         * @param position 
         */
        gainMultiple(targets?: Player[], position?: string): Event;
        /**
         * 获得牌
         * 
         * 参数列表：
         *  itemtype为“player”类型：设置next.source，即获得牌的源头；
         *  itemtype为“card”，“cards”类型：设置next.cards，即获得的牌；
         *  itemtype为bool类型：设置next.delay，应该是动画延迟；
         *  itemtype为字符串：设置next.animate，设置动画；
         *      gain目前可设置动画:
         *          "give","gain","gain2","draw2","giveAuto"...... 实质是调用它们对应”$动画名“的方法；
         *  itemtype为以下特殊字符串：
         *      “log”：设置next.log=true；
         *      “fromStorage”：设置next.fromStorage=true，标记是否来自游戏外（从游戏外获得牌）；
         *          注1：所谓游戏外，指非玩家手牌，场地，弃牌，牌堆区的牌，常用于某些特殊技能。
         *      “bySelf”：设置next.bySelf；
         */
        gain(...args): Event;
        /**
         * 当前玩家给牌给目标玩家
         * @param cards 要给的牌
         * @param target 目标玩家
         * @param visible 给出去的牌是否大家都可见 
         */
        give(cards: Card|Card[], target: Player, visible: boolean): void;
        /**
         * 失去牌
         */
        lose(...args): Event;
        /**
         * 受到伤害
         * 
         * 参数列表：
         *  number类型：设置next.num;
         *  itemtype为“nature”：设置next.nature，即伤害的属性；
         *  【下面那些参数可以直接供给damage使用，但是主动调用时需要哪些就设置】
         *  itemtype为“card”/带有“name”属性得对象：设置next.card，应该是记录用来造成伤害的卡；
         *  itemtype为“cards”类型：设置next.cards，同上;
         *  itemtype为“player”类型：设置next.source，应该是记录给当前玩家造成伤害的源玩家；
         *  特殊常量字符串：
         *      “nocard”：若card/cards没有，若没设置该值，默认使用event.card/event.cards；
         *      “nosource”：若source没有，若没设置该值，默认使用event.player；
         *      "notrigger"：若设置该值，则设置next._triggered=null，next.notrigger=true，即不触发后续阶段；
         *      "toStorage":涉及将牌“移除游戏外”，例：一般在将自己的牌放到游戏外的时候 都会lose到ui.special，在括号里加上'toStorage' 作为标记 就可以触发周妃的技能了
         *          注1：检测移除牌时的时机：event.trigger("addCardToStorage")
         *          注2：需要从游戏外获得牌：player.gain(player.storage.xxx,'gain2','fromStorage');
         */
        damage(...args): Event;
        /**
         * 回复体力
         * 
         * 参数列表：
         *  number类型：设置next.num;
         *  【下面那些参数可以不直接供给recover使用，但是主动调用时需要哪些就设置】
         *  itemtype为“card”/带有“name”属性得对象：设置next.card，应该是记录用来回复得卡；
         *  itemtype为“cards”类型：设置next.cards，同上;
         *  itemtype为“player”类型：设置next.source，应该是记录给当前玩家回复的源玩家；
         *  特殊常量字符串：
         *      “nocard”：若card/cards没有，若没设置该值，默认使用event.card/event.cards；
         *      “nosource”：若source没有，若没设置该值，默认使用event.player；
         */
        recover(...args): Event;
        /**
         * 双将模式下的抽牌
         */
        doubleDraw(...args): Event;
        /**
         * 失去体力
         * @param num 
         */
        loseHp(num: number): Event;
        /**
         * 失去体力上限
         */
        loseMaxHp(num?: number, forced?: boolean): Event;
        /**
         * 增加体力上限
         */
        gainMaxHp(num?:number,forced?:boolean): Event;
        /**
         * 血量改变
         * @param num 血量改变数
         * @param popup 是否弹出提示，取值为“false”，则不弹出（默认是弹出的）
         */
        changeHp(num: number, popup?: boolean): Event;
        /**
         * 护甲改变
         * （不是三国杀常规模式下相关的）
         * @param num 改变的护甲数，默认为1
         * @param type 护甲类型
         */
        changeHujia(num?: number, type?: any): Event;
        /**
         * 濒死阶段
         * @param reason 
         */
        dying(reason: any,...args): Event;
        /**
         * 死亡阶段
         * 
         * “die”时机（马里奥大佬的解释）：是死亡结算流程中明置身份牌之后 弃置区域内的牌和结算奖惩之前
         * @param reason 
         */
        die(reason: any,...args): Event;
        /**
         * 复活
         * @param hp 
         * @param log 
         */
        revive(hp: number, log: boolean,...args): Event;

        /**
         * 是否是“混乱”状态
         * 即判断是否含有“mad”技能
         */
        isMad(): boolean;
        /**
         * 设置进入“混乱”状态
         * 即添加“mad”技能
         * 进入“混乱”状态的情况下，不能操作（自己的面板），player.isMine的结果也是false（不能确定当前玩家是自己）
         * @param end 
         */
        goMad(end: SMap<string>): void;
        /**
         * 接触“混乱”状态
         * 即移除“mad”技能
         */
        unMad(): void;
        /** 添加临时技能：潜行 */
        tempHide(): string;
        /** [ai相关]暴露身份 */
        addExpose(num: number): Player;
        /**
         * 使用装备
         * @param card 
         * @param draw 
         */
        equip(card: Card, draw: boolean): Event;
        /**
         * 添加判定牌
         * （当前玩家是被添加目标，移除源目标的添加牌的方法为靠get.owner，
         * 找到牌使用的玩家）
         * @param card 
         * @param cards 
         */
        addJudge(card: Card, cards?: Card[]): any;
        /**
         * 判断该牌是否可以添加到判定区
         * 需要通过game.checkMod，检测通过“targetEnabled”锁定技；
         * （注：该方法貌似值用在类似闪电这种，可以长时间逗留的判定牌）
         * @param card 
         */
        canAddJudge(card: string|Card): boolean;
        /**
         * 添加当前玩家的某判定牌到下一位玩家
         * @param card 
         */
        addJudgeNext(card: Card): void;
        /**
         * 判定
         * 
         * 参数列表：
         *  function类型：设置next.judge，即当前判定的判定条件,
         *      其定义：(jResult: JudgeResultData) => number，若最终都没设置则默认一个返回0的方法；
         *  itemtype为“card”类型：设置next.card，若不设置judge，设置了该值，则设置next.judge为card的judge；
         *  string类型：设置next.skill，正常状况下和card一起都是设置next.judgestr,即该判定的名字（默认使用event.name）；
         *  bool类型：设置next.clearArena,联机时使用，取值为false,则不通知所有玩家清理场上的ui；
         *  objtype为“div”类型，设置next.position，用于指定该生效判定牌是丢弃还是添加到其他区域（例如玩家手上）；
         */
        judge(...args): Event;
        /**
         * 翻面
         * 
         * 正常触发”_turnover“预定义全局技能
         * @param bool true，翻面；false翻回正面
         */
        turnOver(bool: boolean): Event;

        /** 离开游戏 */
        out(skill: number|string): void;
        /** 进入游戏 */
        in(skill: number | string): void;

        /**
         * 铁锁连环
         * @param bool 
         */
        link(bool: boolean): Event;
        /**
         * 跳过阶段
         * @param name 阶段名
         */
        skip(name: string): void;

        //【联机】等待与取消等待
        wait(callback: Function): void;
        unwait(result: any): void;

        /**
         * 技能日志
         * @param name 技能名
         * @param targets 目标玩家
         * @param nature 属性颜色
         * @param logv 是否调用game.logv
         */
        logSkill(name: string, targets: Player|Player[], nature?: string, logv?: boolean): void;

        //弹出信息相关
        /** 清除弹出信息 */
        unprompt(): void;
        /** 弹出信息（似乎没用到） */
        prompt(str: string, nature?: string): void;
        prompt_old(name2: number|string[], className: any): void;//无用，废弃
        /**
         * 弹出信息（例如伤害，回血.....之类）
         * 使用$damagepop弹出信息
         * @param name 该参数数用来调用get.translation
         * @param className 弹出文本的样式，默认是“water”
         */
        popup(name: any, className?: string): void;
        popup_old(name: any, className?: string): HTMLDivElement;//无用废弃
        _popup(): any;

        /** 显示时间 */
        showTimer(time: number): void;
        /** 隐藏时间 */
        hideTimer(): void;

        //标记相关
        /**
         * 技能标记（显示，更新标记）
         * @param name 标记名/技能名（规定标记名必须和技能名相同）
         * @param info 标记的显示信息
         * @param card 若有则标记记录的是卡牌信息
         */
        markSkill(name: string, info?: any, card?: Card[]): Player;
        /**
         * 取消技能标记(不显示该技能的标记)
         * @param name 标记名/技能名
         */
        unmarkSkill(name: string): Player;
        /**
         * 技能武将标记(实际上，只有联机该方法才有意义，也是个联机方法)
         * @param id 标记名
         * @param target 
         * @param name 
         * @param content 
         */
        markSkillCharacter(id: string, target: {name:string}|string, name: any, content: any): Player;
        /**
         * 技能武将标记（用于标记武将，目标之类）
         * @param name 武将名
         * @param info 标记信息(即配置在技能信息的intro，标记的相关的配置信息)
         * @param learn 
         * @param learn2 
         */
        markCharacter(name: string|{name:string}, info: any, learn?: boolean, learn2?: boolean): HTMLDivElement;
        /**
         * 添加标记（UI）
         * @param name 标记的内容，可以是字符串，可以是卡牌
         * @param info 标记信息
         * @param skill 
         */
        mark(name: any, info: any, skill: any): HTMLDivElement[]|HTMLDivElement;
        /**
         * 删除标记（UI）
         * @param name 
         * @param info 
         */
        unmark(name: any, info: any): void;

        //【1.9.98】添加全新mark相关方法   by2020-2-25（代码版本暂时未跟上）
        /** 是否有该技能的标记 */
        hasMark(skill:string):boolean;
        /** 有多少该技能的标记（若标记为数组，返回数组长度） */
        countMark(skill:string):number;
        /** 添加标记（只适用于标记是数字） */
        addMark(skill:string,num:number,log?:boolean);
        /** 移除标记（只适用于标记是数字） */
        removeMark(skill:string,num:number,log?:boolean);
        

        /** 添加“连环”UI */
        addLink(): void;
        /** 删除“连环”UI */
        removeLink(): void;
        /**
         * 检测card是否可以使用
         * @param card 卡牌名
         * @param target 目标
         * @param distance 是否检测距离,默认false时，则lib.filter.targetEnabled；若为true，则lib.filter.filterTarget
         * @param includecard 进行卡牌检测（优先与上面distance），若为true，则执行lib.filter.cardEnabled，lib.filter.cardUsable相关检测
         */
        canUse(card: string|{name:string}, target: Player, distance?: boolean, includecard?: boolean): boolean;
        /**
         * 检测是否有可称为该card的目标
         * @param card 卡牌名（也是用于canUse）
         * @param distance 用于canUse，参考canUse的distance参数
         * @param includecard 用于canUse，参考canUse的includecard参数
         */
        hasUseTarget(card: string|{name:string}, distance?: boolean, includecard?: boolean): boolean;
        /**
         * 获取使用卡牌的最小数值？（应该是ai使用）
         * @param card 
         * @param distance 
         * @param includecard 
         */
        getUseValue(card: string | { name: string }, distance?: boolean, includecard?: boolean): number;

        //随从相关（炉石玩法）
        addSubPlayer(cfg: any): any;
        removeSubPlayer(name: any): any;
        callSubPlayer(): any;
        toggleSubPlayer(): any;
        exitSubPlayer(remove: any): any;
        getSubPlayers(tag: any): any;

        //技能相关
        /**
         * 增加技能触发
         * @param skill 技能名
         * @param hidden 
         * @param triggeronly 
         */
        addSkillTrigger(skill: string, hidden: boolean, triggeronly?: boolean): any;
        /**
         * 添加技能，同时打印日志与弹出显示添加的技能提示文字
         * @param skill 
         */
        addSkillLog(skill: any): any;
        /**
         * 玩家增加技能（获得技能）
         * @param skill 技能名
         * @param checkConflict 额外检测方法(检测冲突)
         * @param nobroadcast 是否向网络发布消失
         */
        addSkill(skill: string | string[], checkConflict: NoneParmFum<void>, nobroadcast: boolean): string | string[];
        /**
         * 添加额外技能（一个技能内同时拥有多个相关技能）
         * @param skill 技能名
         * @param skills 添加的额外技能（保存在player.additionalSkills[skill]中）
         * @param keep 是否保持原来的额外技能
         */
        addAdditionalSkill(skill: string, skills: string|string[], keep: boolean): Player;
        /**
         * 移除额外技能（一个技能内同时拥有多个相关技能）
         * @param skill 技能
         * @param target 
         */
        removeAdditionalSkill(skill: string, target: string): Player;
        /**
         * 限定技能
         * (应该是包括了限定技，觉醒技)
         * @param skill 技能名
         * @param nounmark 是否没有技能标记，true则没有
         */
        awakenSkill(skill: string, nounmark?: boolean): Player;
        /**
         * 恢复限定技能（重置回能使用）
         * @param skill 技能名
         * @param nomark 
         */
        restoreSkill(skill: string, nomark?: boolean): Player;
        /**
         * 丧失技能
         * （skill是作为丧失的技能，skills是作为拥有该skill技能的技能，也就是只失去其中一个子技能）
         * @param skill 丧失的技能名
         * @param skills 这个作为disabledSkills的key，拥有该技能的技能
         */
        disableSkill(skill: string, skills: string|string[]): Player;
        /**
         * 恢复丧失技能（变成可用）
         * @param skill 丧失技能名
         */
        enableSkill(skill: string): Player;
        /**
         * 检查技能标记是否应该存在，若有不该存在则移除
         */
        checkMarks(): Player;
        /**
         * 添加装备卡牌的触发
         * @param card 指定一张卡牌，若不指定则默认装备区的所有卡牌
         */
        addEquipTrigger(card?: Card): Player;
        /**
         * 移除装备卡牌的触发
         * 
         * 注：一般只有装备牌在失去时有效果处理，所以默认处理装备牌，但是也可以处理一些其他失去时有效果的卡牌。
         * @param card 指定一张卡牌，若不指定则默认装备区的所有卡牌
         */
        removeEquipTrigger(card?: Card): Player;
        /**
         * 移除技能的触发
         * @param skill 技能名
         * @param triggeronly 是否仅触发一次
         */
        removeSkillTrigger(skill: string, triggeronly?: boolean): Player;
        /**
         * 玩家失去技能/移除玩家的技能
         * @param skill 
         * @param flag 
         */
        removeSkill(skill: string | string[], flag?: boolean): string;
        /**
         * 添加临时技能
         * @param skill 技能名
         * @param expire 持续到某时机
         * @param checkConflict 额外检测方法(检测冲突)
         */
        addTempSkill(skill: string, expire: string|string[], checkConflict: NoneParmFum<void>): string;
        /**
         * 清除技能
         * @param all 是否清除所有的额外技能，临时技能（temp），若是true则清除
         * @param args 指定排除清除的技能名（任意）
         */
        clearSkills(all?: boolean,...args): string[];
        /**
         * 检测冲突（检测禁用技能列表forbiddenSkills）
         * @param skill 若有该参数，则从forbiddenSkills禁用技能列表中移除该技能
         */
        checkConflict(skill?: string): void;


        /**
         * 获取当前玩家与目标玩家直接的ai态度（attitude）
         * @param target 
         */
        attitudeTo(target: Player): number;
        /**
         * 获取当前玩家的保存的统计数据
         * 目前主要保存的值：
         * 伤害damage，受伤damaged，摸牌gain，出牌(不同名字的牌单独计数)card，杀敌kill，
         * 使用技能（不同名字的技能单独计数）skill，
         * 使用技能次数（不区分统一计数）allSkills
         * @param key 当轮的统计数据的key，若没有，则获取当轮的统计数据
         */
        getStat(key?: keyof StatInfo): StatInfo;

        queue(time?: number): void;//UI相关

        /**
         * 获取该卡牌还能使用的次数
         * 注：使用了“cardUsable”锁定技mod检测
         * @param card 
         * @param pure 
         */
        getCardUsable(card: string|{name:string}, pure: any): number;
        /**
         * 获取当前玩家的攻击范围（一般是“杀”可指定的目标的范围）
         * 注：使用了“attackFrom”锁定技mod检测，raw为true时，同时使用了“globalFrom”锁定技mod检测
         * @param raw 是否加上全局的进攻距离（globalFrom）的计算，若不是true，则按照默认距离0来计算（攻击范围和全局进攻距离在三国杀里是不同概念的）
         */
        getAttackRange(raw?: boolean): number;
        /**
         * 获取当前玩家的（全局）防御范围
         * 注：使用了“globalFrom”锁定技mod检测
         */
        getGlobalFrom(): number;
        /**
         * 获取当前玩家的（全局）进攻距离（可选取距离内目标的范围）
         * 注：使用了“globalTo”锁定技mod检测
         */
        getGlobalTo(): number;
        /**
         * 获取当前玩家的手牌上限
         * 注：使用了“maxHandcard”锁定技mod检测
         */
        getHandcardLimit(): any;

        /**
         * 获取属于当前玩家“敌对”的玩家(不同模式敌对玩家形式是不同的)
         * @param func 过滤玩家的方法
         */
        getEnemies(func?: OneParmFun<Player,boolean>): Player[];
        /**
         * 获取属于当前玩家“同伴”的玩家(不同模式同伴玩家形式是不同的)
         * @param func 若是方法，则是过滤玩家的方法；若是布尔值（不管是否true，false），都是忽略过滤方法，默认身份判断，若是true，返回的玩家包括当前玩家，否则不包括
         */
        getFriends(func?: OneParmFun<Player,boolean>|boolean): Player[];
        /**
         * 判断目标玩家是否是当前玩家的“敌人”
         */
        isEnemyOf(target?:Player): boolean;
        /**
         * 判断目标玩家是否是当前玩家的“同伴”
         * @param player 
         */
        isFriendOf(player: Player): boolean;
        /**
         * 判断当前玩家是否是指定玩家的“同伴”
         * @param player 
         */
        isFriendsOf(player: Player): boolean;
        /**
         * 判断当前玩家是否是指定玩家的“敌人”
         * @param player 
         */
        isEnemiesOf(player: Player): boolean;

        /**
         * 当前玩家是否还存活，存活则返回true
         */
        isAlive(): boolean;
        /**
         * 判断当前玩家是否死亡，死亡则返回true
         */
        isDead(): boolean;
        /**
         * 当前玩家是否在濒死阶段
         */
        isDying(): boolean;
        /**
         * 当前玩家是否已经受伤
         */
        isDamaged(): boolean;
        /**
         * 当前玩家是否满血
         */
        isHealthy(): boolean;
        /**
         * 判断当前玩家是否是全场最多血的
         * @param equal 是否包括相等
         */
        isMaxHp(equal: boolean): boolean;
        /**
         * 判断当前玩家是否是全场最少血的
         * @param equal 是否包括相等
         */
        isMinHp(equal: boolean): boolean;
        /**
         * 判断当前玩家（手牌+装备）的牌数是全场最多的
         * @param equal 是否包括相等
         */
        isMaxCard(equal: boolean): boolean;
        /**
         * 判断当前玩家（手牌+装备）的牌数是全场最少的
         * @param equal 是否包括相等
         */
        isMinCard(equal: boolean): boolean;
        /**
         * 判断当前玩家（手牌）的牌数是全场最多的
         * @param equal 是否包括相等
         */
        isMaxHandcard(equal: boolean): boolean;
        /**
         * 判断当前玩家（手牌）的牌数是全场最少的
         * @param equal 是否包括相等
         */
        isMinHandcard(equal: boolean): boolean;
        /**
         * 判断当前玩家（装备）的牌数是全场最多的
         * @param equal 是否包括相等
         */
        isMaxEquip(equal: boolean): boolean;
        /**
         * 判断当前玩家（装备）的牌数是全场最少的
         * @param equal 是否包括相等
         */
        isMinEquip(equal: boolean): boolean;
        /**
         * 判断当前玩家是否是被“连锁”的状态
         */
        isLinked(): boolean;
        /**
         * 判断当前玩家是否是“翻面”的状态
         */
        isTurnedOver(): boolean;
        /**
         * 判定当前玩家是否退出（离开）
         */
        isOut(): any;

        /** 不太清楚是什么效果,大概上：和炉石，塔防，斗地主玩法......相关牌的标记 */
        isMin(distance?: boolean): boolean;

        /** 当前玩家是否还在游戏中（非死亡，非离开，非移除） */
        isIn(): boolean;
        /**
         * 当前player的class标记是否有“unseen”，“unseen2”
         * 应该是标记是否可见/隐藏的标记，后面继续研究
         * 据推测，应该是双将模式下，隐藏武将
         * @param num 
         */
        isUnseen(num: number): boolean;
        /**
         * 判断底下的控制面板（即当前操作玩家自己的面板，在游戏的底边）是否是该玩家的
         * @param self 是否是自己（当前玩家），若是自己，则当前玩家就是目标me玩家，则直接返回true
         * @param me 指定玩家，若不填,则默认是game.me（当前操作，运行游戏的玩家）
         */
        isUnderControl(self?: boolean, me?: Player): boolean;

        /**
         * 是否是联机中，即在线（多了个判断是否不是在自动，即托管）
         */
        isOnline(): boolean;
        /** 是否是联机中，即在线（少了一些判断条件） */
        isOnline2(): boolean;
        /** 是否已经离线 */
        isOffline(): boolean;

        /**
         * 检查技能是否已经显示（一般用于双将玩法下，具体日后讨论）
         * @param skill 
         * @param showonly 
         * @return 返回false就是相当于null，否则返回“main”（主），“vice”（副）
         */
        checkShow(skill: string, showonly?: boolean): string;

        /**
         * 弃牌阶段时，计算需要弃置的牌
         * 注：使用了“ignoredHandcard”锁定技mod检测，同时调用了player.getHandcardLimit获得手牌上限
         * @param num 
         */
        needsToDiscard(num?: number): number;
        /**
         * 获得当前玩家到指定目标玩家的距离是多少
         * @param target 
         * @param method 没有则默认防御距离，其值：raw，pure，absolute，attack
         */
        distanceTo(target: Player, method?: string): number;
        /**
         * 获取指定目标玩家到当前玩家的距离是多少
         * @param target 
         * @param method 没有则默认防御距离，其值：raw，pure，absolute，attack
         */
        distanceFrom(target: Player, method?: string): number;

        /**
         * 判断玩家是否有指定技能skill。
         * 默认判断玩家（除了玩家forbiddenSkills上的禁用技能）的：
         *  武将技能skills+附加技能additionalSkills+临时技能tempSkills
         * 注：使用了getSkills获取。
         * @param skill
         * @param arg2 若为true，获取技能附带隐藏技能hiddenSkills
         * @param arg3 若为true，获取技能附带装备技能；
         * @param arg4 若为true，获取技能经过game.filterSkills过滤后的技能
         */
        hasSkill(skill: string, arg2?: boolean, arg3?: boolean, arg4?: boolean): boolean;
        /**
         * 判断是否拥有玩家当前使用武将的存储的技能
         * @param skill
         * @param arg1 是否获取自己本身拥有的，如不获取（false）则删除不属于本身拥有的技能（正常下，武将隐藏时无法获得该武将技能）
         * @param arg2 是否是获取单独技能，如不是（false）则删除（带有unique，temp，sub字段）技能
         * @param arg3 是否隐藏 true的话，还没显示的武将的技能也获取
         */
        hasStockSkill(skill: string, arg1: boolean, arg2: boolean, arg3: boolean): boolean;
        /**
         * 判断当前玩家是否时该主公技直接拥有者
         * 若当前玩家是主，又有该技能，则当前玩家是该技能的原拥有者
         * @param skill 主公技名
         * @param player 在某些回调方法内调用时，传入该方法的回调传入的palyer，用于判断是否时执行该方法的当前玩家（实际还是有点疑惑）
         */
        hasZhuSkill(skill: string, player?: Player): boolean;
        /**
         * 是否有全局技能标签tag(ai相关)
         * @param tag 
         * @param arg 
         */
        hasGlobalTag(tag: string, arg?: any): boolean;
        /**
         * 【AI】判断是否有指定的技能标签(ai相关)
         * @param tag 技能标签
         * @param hidden 若为true，获取技能附带隐藏技能hiddenSkills
         * @param arg 要检测的技能标签对应的结果，可以是字符串/bool值；
         * @param globalskill 是否检测全局技能
         */
        hasSkillTag(tag: string, hidden?: boolean, arg?: any, globalskill?: boolean): boolean;
        /**
         * 判断当前玩家是否有该名字的牌在判定区
         * @param name 
         */
        hasJudge(name: string): boolean;
        /** 【AI】当前游戏玩家中，有对当前玩家态度（attitude）友好的玩家 */
        hasFriend(): boolean;
        /**
         * 【AI】当前是否还有未知身份的玩家
         * 注：非身份，国战的玩法模式，直接返回false
         * @param num 指定要确认的数量，默认是0
         */
        hasUnknown(num?: number): boolean;
        /**
         * 【AI】指定目标玩家是否身份未知
         * 注：非身份，国战的玩法模式，直接返回false
         * @param player 
         */
        isUnknown(player: Player): boolean;
        /**
         * 当前玩家是否有“无懈可击”
         */
        hasWuxie(): boolean;
        /**
         * 当前玩家是否有“杀”
         * @param respond 是“响应respond”，还是“使用use”，这个和AI相关，若技能有对应tag标签，会自动执行
         * @param noauto 与“yuchanqian”这个技能相关，基本可以无视
         */
        hasSha(respond?: boolean, noauto?: any): boolean;
        /**
         * 当前玩家是否有“闪”
         */
        hasShan(): boolean;
        /** 当前玩家是否有“闪”（和hasShan逻辑一致，基本算冗余） */
        mayHaveShan(): boolean;
        /**
         * 当前玩家是否有（指定区域的）指定牌
         * @param name 卡牌名，可以是一个过滤的卡牌的方法
         * @param position 指定要检测的区域，默认是所有区域
         */
        hasCard(name: string|OneParmFun<Card,boolean>, position?: string): boolean;
        /**
         * 判断是否能使用该装备牌
         * @param name 卡牌名
         * @param replace 应该是标记是否是替换
         */
        canEquip(name: string, replace?: boolean): boolean;
        /**
         * 获取装备区的指定位置/名字装备牌
         * @param name 若是对象，需要带有name属性的对象；若是字符串，则是带有“equip”部分;若是number，则内部拼接结果“equip+name”
         */
        getEquip(name: string | { name: string }|number): Card;
        /**
         * 获得一张指定名字的判定牌
         * 若该判定牌是视为牌，则是视为牌名字，否则就是该判定牌的名字；
         * 目前逻辑上，只能获得第一张符合条件的判定牌；
         * @param name 判定牌的名字
         */
        getJudge(name: string): any;

        //获取buff，目前看起来和三国杀常规模式游戏没关系，不知为何在这
        /**
         * 随机获取一个buff
         */
        getBuff(...num:number[]): Player;
        /**
         * 随机获取一个debuff
         */
        getDebuff(...num:number[]): Player;
        
        // 新方法2020-2-23
        /** 用于计算玩家已损失的体力值（若因旧周泰等而导致体力值小于0 则以0作为当前体力值进行计算） */
        getDamagedHp():number;
        /**
         * 用于切换玩家的国籍
         * 
         * （在国战模式下不影响势力，胜利条件，野心家判断等）
         * @param group 势力名，例如：“wei” =》魏
         * @param log 是否打印日志，默认打印，设置false不打印
         */
        changeGroup(group:string,log?:boolean);

        //【1.9.98】
        /**
         * 获取玩家当前回合内使用/打出卡牌的所有事件，以及获取玩家当前回合跳过过的阶段
         * @param key 要取出指定的事件的使用记录,若不填，则取出当前玩家回合的所有使用记录
         * @param filter 过滤条件,过滤某一事件记录类型中的指定事件
         * @returns 若两个参数都没有，则返回当前玩家回合的记录，若有key，则获取指定类型的记录
         */
        getHistory():ActionHistoryData;
        getHistory(key?:keyof ActionHistoryData,filter?:OneParmFun<GameEvent,boolean>):GameEvent[];
        /**
         * 获取玩家本回合内使用倒数第X+1张牌的事件 
         * @param num 倒数第x张,不填默认为0
         */
        getLastUsed(num?:number):GameEvent;

        //动画,UI相关的方法（前置$符）[不过也有些内部混如一些操作逻辑，没分离彻底]
        $drawAuto(cards: any, target: any): any;
        $draw(num: any, init: any, config: any): any;
        $compareMultiple(card1: any, targets: any, cards: any): any;
        $compare(card1: any, target: any, card2: any): any;
        $throw(card: any, time: any, init: any, nosource: any): any;
        $throwordered(): any;
        $throwordered1(node: any, nosource: any): any;
        $throwordered2(node: any, nosource: any): any;
        $throwxy(card: any, left: any, top: any): any;
        $throwxy2(card: any, left: any, top: any, trans: any, flipx: any, flipy: any): any;
        throwDice(num: any): any;
        $giveAuto(card: any, player: any): any;
        $give(card: any, player: any, log: any, init: any): any;
        $equip(card: any): any;
        $gain(card: any, log: any, init: any): any;
        $gain2(cards: any, log: any): any;
        $skill(name: any, type: any, color: any, avatar: any): any;
        $fire(): any;
        $thunder(): any;
        $rare2(): any;
        $epic2(): any;
        $legend2(): any;
        $rare(time: any): any;
        $epic(time: any): any;
        $legend(time: any): any;
        $coin(): any;
        $dust(): any;
        $recover(): any;
        $fullscreenpop(str: any, nature: any, avatar: any): any;
        $damagepop(num: any, nature: any, font: any): any;
        $damage(source: any): any;
        $die(): any;
        $dieflip(type: any): any;
        $phaseJudge(card: any): any;
    }

    //核心成员属性（暂时先暂时一部分比较核心常用的）
    interface Player extends HTMLDivElement{
        /** 武将名 */
        name:string;
        /** 武将名2 */
        name2?:string;
        name1?:string;
        /** 性别 */
        sex:string;
        /** 势力 */
        group:string;
        /** 当前血量 */
        hp:number;
        /** 最大血量（血量上限） */
        maxHp:number;
        /** 护甲 */
        hujia:number;

        /** 是否是单数血（双将模式下两血相加取一半模式，记录是否是单数的血量） */
        singleHp:boolean;

        nickname:string;
        avatar: string;
        version: string;

        /** 扩展名，不知时哪里赋值的，在addCharacter中使用，默认_status.extension */
        extension:string;

        /**
         * 记录当前玩家正在判定的所有判定牌，其中下标0为当前生效的判定牌
         */
        judging:Card[];

        /**
         * 记录当前事件中得玩家使用中的卡牌
         * 
         * 在useCard中赋值；
         * 在useCard最终步骤（即将准备结束useCard事件），
         * phase（回合阶段即将结束），
         * phaseUse（每次出牌阶段使用完一次卡牌后）
         */
        using:Card[];

        /** 信息显示html节点 */
        node:{
            /** 武将名 */
            name:HTMLDivElement;
            /** 武将名2 */
            name2:HTMLDivElement;
            nameol:HTMLDivElement;
            /** 身份 */
            identity: HTMLDivElement;
            /** 血量 */
            hp: HTMLDivElement;
            /** 手牌数 */
            count: HTMLDivElement;
            /** 化身1 */
            avatar: HTMLDivElement;
            /** 化身2 */
            avatar2: HTMLDivElement;
            
            action: HTMLDivElement;
            /** 锁链（铁索连环） */
            chain: HTMLDivElement;
            /** 边框 */
            framebg: HTMLDivElement;
            /** 手牌区1 */
            handcards1: HTMLDivElement;
            /** 手牌区2（貌似不是明牌，不知有什么用） */
            handcards2: HTMLDivElement;
            /** 判定区 */
            judges: HTMLDivElement;
            /** 装备区 */
            equips: HTMLDivElement;
            link: HTMLDivElement;
            /** mark标记 */
            marks: HTMLDivElement;
            /** 翻面遮罩ui */
            turnedover: HTMLDivElement;
            /** 信息显示 */
            intro: HTMLDivElement;
            
        };

        /** 
         * player的dataset:储存数据
         * 其实质是html节点自带DOMStringMap，用于存储携带数据信息
         */
        dataset:{
            position:string;
        }

        /**
         * 跳过列表
         */
        skipList:string[];
        /**
         * 玩家的技能列表
         */
        skills:string[];
        /**
         * 已经初始化完成的技能
         * 主要添加时机：player.addSkill->player.addSkillTrigger
         */
        initedSkills:string[];
        /**
         * 玩家的附加技能
         * 主要添加时机：player.addAdditionalSkill
         */
        additionalSkills:SMap<string[]>;
        /**
         * 玩家丧失的技能
         * 主要添加时机：player.disableSkill
         */
        disabledSkills:SMap<string[]>;
        /**
         * 隐藏技能（不能用）
         * 主要添加时机：应该在各个玩法模式
         */
        hiddenSkills:string[];
        /**
         * 玩家已发动的 限定技/觉醒技
         * 主要添加时机：玩家启动 限定技/觉醒技 后调用player.awakenedSkills
         */
        awakenedSkills:string[];
        /**
         * 禁用技能
         * (暂不清楚)
         */
        forbiddenSkills:SMap<string[]>;
        popups:any[];
        damagepopups:any[];
        /**
         * 玩家的游戏统计：
         * 每回合“phasing”，在轮到玩家新一轮开始时，添加新的统计集合
         */
        stat:StatInfo[];
        /**
         * 保存玩家的临时技能的持续时机
         * 主要添加时机：player.addTempSkill
         */
        tempSkills:SMap<string>;
        /**
         * 玩家的缓存信息区
         * （信息过多，之后再研究）
         * 主要功能：用于标记技能，缓存一些技能的信息在玩家缓存信息里，方便整场游戏的调用
         */
        storage:SMap<any>;
        /**
         * 玩家的标记
         * 主要添加时机：player.markSkill
         */
        marks:SMap<any>;
        /**
         * 玩家的ai（日后研究）
         */
        ai:PlayerAIInfo;

        //player.out
        outCount: number;
        outSkills: string[];

        queueCount:number;

        //【1.9.98】
        /** 记录游戏中事件的使用记录 */
        actionHistory:ActionHistoryData[];
    }
}


/**
 * 玩家的统计数据结构
 */
type StatInfo = {
    /** 出牌(不同名字的牌单独计数) */
    card:SMap<number>;
    /** 使用技能（不同名字的技能单独计数） */
    skill:SMap<number>;
    
    /** 伤害 */
    damage:number;
    /** 受到伤害 */
    damaged:number;
    /** 摸牌 */
    gain:number;
    /** 杀敌 */
    kill:number;

    /** 使用技能次数（不区分统一计数） */
    allSkills:number;

    /** 额外参数 */
    [key:string]:any
}

/**
 * 玩家的状态信息
 */
type PlayerStateInfo = {
    hp:number;
    maxHp:number;
    nickname:string;
    sex:string;
    name:string;
    name1:string;
    name2:string;
    handcards:any[];
    equips:any[];
    judges:any[];
    views:string[],
    position:number;
    hujia:number;
    side:number;
    identityShown:string;
    identityNode:[any,any];
    identity:string;
    dead:boolean;
    linked:boolean;
    turnedover:boolean;
}

/**
 * 玩家的ai
 * （具体内容日后讨论）
 */
type PlayerAIInfo = {
    friend: any[]; 
    enemy: any[]; 
    neutral: any[]; 
    handcards: { 
        global: any[]; 
        source: any[]; 
        viewed: any[];
    }
}

/**
 * 玩家执行的事件的统计数据
 */
type ActionHistoryData = {
    /** 使用卡牌 */
    useCard:GameEvent[],
    /** 响应 */
    respond:GameEvent[],
    /** 跳过 */
    skipped:GameEvent[],
    /** 失去卡牌 */
    lose:GameEvent[],
    /** 获得卡牌 */
    gain:GameEvent[],
    /** 伤害来源 */
    sourceDamage:GameEvent[],
    /** 造成伤害 */
    damage:GameEvent[],
    /** 客户端操作 */
    custom:GameEvent[]
}