declare var lib: Lib;
/**
 * 游戏内的主要信息储存区域，与核心游戏方法对象
 */
interface Lib {
    /** 当前版本的配置前缀（多用于本地缓存的标签名） */
    configprefix: string;
    /** 联机版本 */
    versionOL: number;
    /** 更新地址 */
    updateURL: string;
    /** 更新的镜像地址 */
    mirrorURL: string;
    /** 联机地址 */
    hallURL: string;
    /** 网络资源地址 */
    assetURL: string;
    /** 更新日志 */
    changeLog: any[];
    /**
     * 记录更新用的方法，在game.run中执行
     */
    updates: OneParmFun<number, boolean>[];
    canvasUpdates: TwoParmFun<number, any, boolean>[];
    /** 录像信息 */
    video: VideoData[];
    /**
     * 保存所有武将所拥有的的技能。
     * 在onload，loadPackage中添加保存。
     */
    skilllist: string[];
    /** 武将禁用列表 */
    connectBanned: string[];
    /** 武将介绍 */
    characterIntro: SMap<string>;
    /** 武将标题（用于写称号或注释） */
    characterTitle: SMap<string>;
    /** 武将包 */
    characterPack: SMap<HeroData>;
    /** 武将的过滤方法（参数为一个mode，用于过滤玩法模式） */
    characterFilter: SMap<OneParmFun<string, boolean>>;
    /** 用于筛选（具体日后讨论） */
    characterSort: SMap<SMap<string[]>>;
    /** 系列卡包（卡牌的系列集合） */
    cardPack: SMap<string[]>;

    /** 在updatex中，执行一些列onresize重新调整UI大小 */
    onresize: NoneParmFum<void>[];
    /** 在“phaseLoop”事件执行该一系列onphase事件 */
    onphase: NoneParmFum<void>[];
    /** 保存多个洗牌方法进行洗牌 */
    onwash: NoneParmFum<string>[];
    /** gameover后执行的一些列结束方法 */
    onover: OneParmFun<string, void>[];

    //记录数据，读取数据库
    ondb: any[];
    ondb2: any[];

    /** 聊天历史 */
    chatHistory: [string, string][];
    /** 主要在lib.init记录场景加载的系列方法，在ui.arena中取出执行 */
    arenaReady: NoneParmFum<void>[];
    /** 保存一些UI处理的方法，在合适时机取出来执行 */
    onfree: Function[];
    /** 在牌堆里牌(指不区分数字，花色，伤害属性的牌) */
    inpile: string[];
    /**
     * 保存loadExtension中，保存读取到的扩展，在onload的proceed2中读取处理
     */
    extensions: any[];
    /**
     * 保存loadExtension读取到的扩展，便于后面“编辑扩展”读取信息
     */
    extensionPack: SMap<any>;
    /** 卡牌类型的优先级？（用于排序卡牌用） */
    cardType: SMap<number>;

    /** 保存游戏中的触发 */
    hook: {
        /**
         * 全局触发记录:
         * 结构：
         *  触发名:{玩家id:[触发技能列表]}
         */
        globaltrigger: SMap<SMap<string[]>>;
        /**
         * 全局触发技能记录：
         * 结构：“触发源(player/source/global/target)_触发名”:[触发技能列表]
         */
        globalskill: SMap<string[]>;
        /**
         * 玩家触发
         * 结构：
         *  “玩家id_触发源(player/source/global/target)_触发名”:[触发技能列表]
         * 
         * 注：实际上的类型是SMap<string[]，另一个只是为了解决冲突
         */
        [key: string]: SMap<string[] | SMap<string[]>>;
    };
    /**
     * 记录当前预定处理游戏中的触发map
     * key为触发名，value为布尔值，一般情况下都是默认true；
     * 如果没有指定的触发名在这里，则执行trigger时，不查找触发技能执行。
     */
    hookmap: SMap<boolean>;

    /** 已经导入的扩展(当前要执行的导入扩展) */
    imported: string;

    layoutfixed: string[];
    characterDialogGroup: SMap<(name: any, capt: any) => void>;
    listenEnd(node: any): any;

    /** 菜单配置 */
    configMenu: SMap<CommonMenuConfigData>;
    /** 扩展菜单配置 */
    extensionMenu: SMap<ExtensionMenuConfigData>;
    /** 开始模式选择菜单配置 */
    mode: SMap<CommonMenuConfigData>;

    /** 记录当前运行的设备类型："android","ios",不存在（一般是在指移动设备的类型） */
    device: string;

    status: {
        running: boolean,
        canvas: boolean,
        time: number,
        reload: number,
        delayed: number,
        frameId: number,
        videoId: number,
        globalId: number,

        date: Date;
        dateDelayed: number;
        dateDelaying: Date;

    };
    /** 
     * 帮助内容数据中心
     * 帮助内容将显示在菜单－选项－帮助中
     * （所有扩展的help都会集中到这里）
     */
    help: SMap<string>;

    //ui相关
    /** 设置点击/触摸打开信息面板的节点 */
    setIntro(node: HTMLElement, func?: Function, left?: boolean): void;
    /** 设置弹出的面板节点 */
    setPopped(node: HTMLElement, func: Function, width: number, height: number, forceclick: any, paused2: any): void;
    /** 弹出会话面板 */
    placePoppedDialog(dialog: Dialog, e: any): void;
    /** 设置节点的hover（鼠标悬停在上方） */
    setHover(node: HTMLElement, func: Function, hoveration: number, width: number): HTMLElement;
    /** 设置触摸的滚动 */
    setScroll(node: HTMLElement): HTMLElement;
    /** 设置鼠标的滚轮 */
    setMousewheel(node: HTMLElement): void;
    /** 设置节点的长按 */
    setLongPress(node: HTMLElement, func: any): HTMLElement;
    updateCanvas(time: any): any;
    run(time: any): any;

    /** 获得该时间的（UTC）时间 */
    getUTC(date: Date): number;
    saveVideo(): any;

    /** 游戏初始化方法与相关工具库 */
    init: Lib.Init;
    /** 游戏作弊 */
    cheat: Lib.Cheat;
    /** 游戏的翻译（本地化） */
    translate: SMap<string>;

    /** 游戏内核心元素 */
    element: {
        /** 游戏内预定义事件使用的content方法 */
        content: Lib.element.Content;
        /** 玩家 */
        player: Lib.element.Player;
        /** 卡牌 */
        card: Lib.element.Card;
        /** 按钮 */
        button: Lib.element.Button;
        /** 事件 */
        event: Lib.element.Event;
        /** 会话面板 */
        dialog: Lib.element.Dialog;
        control: Lib.element.Control;
        client: Lib.element.Client;
        nodews: Lib.element.Nodews;
        ws: Lib.element.WS;
    },
    /** 
     * 卡片数据中心 
     * （所有扩展的card都会集中到这里）
     */
    card: {
        /** 保存所有的卡牌的基本信息 */
        list: CardBaseData[];
        /** 所有卡牌的配置集中在这里 */
        [key: string]: ExCardData | CardBaseData[];
    };
    /** 游戏内自定义的过滤方法 */
    filter: Lib.Filter;
    /** 游戏内自定义的sort排序方法 */
    sort: Lib.Sort;
    /**
     * 技能数据中心
     * （所有扩展的skill都会集中到这里）
     */
    skill: {
        /** 
         * 保存游戏内所有全局技能
         * 全局技能名命名常用："_","g_"开头
         * 目前看来，用”_“开头，就是指定其为全局技能；
         * 另外还有技能配置的info.global指定的全局技能；
         * 
         * 下面那些拥有”_“开头的技能，就是当前游戏中的预定义的全局技能，这些全局技能属于游戏玩法和流程的一部分！
         */
        global: string[];
        /** 保存的技能信息与玩家之间的关系map,目前在项目内没看出有什么用 */
        globalmap: SMap<Player[]>;
        /** 本地缓存  */
        storage: SMap<any>;
        /**
         * 不计入距离的计算且不能使用牌且不是牌的合法目标
         * （目前该标记直接标记到技能的group中，拥有该技能就是被隔离出游戏，目前还没见使用到这成员）
         * 目前在项目内没什么用，只有标记到技能的group中使用，用于免除某些阶段结算(只是同名而已，和该属性似乎没有直接关系)
         */
        undist: SMap<any>;
        //下面4个+上面1个目前似乎都没什么用......
        others: SMap<any>;
        zhu: SMap<any>;
        zhuSkill: SMap<any>;
        land_used: SMap<any>;

        //以下皆为游戏内预设的全局特殊节能
        unequip: ExSkillData;
        subplayer: ExSkillData;
        autoswap: ExSkillData;
        dualside: ExSkillData;
        _disableJudge: ExSkillData;
        _disableEquip: ExSkillData;
        /**
         * 特殊技能：封印技能
         * 使指定技能“失效”（即玩家失去了某些技能，可在标记上查看）
         */
        fengyin: ExSkillData;
        /**
         * 特殊技能：白板
         * 使玩家失去当前自身的所有技能
         */
        baiban: ExSkillData;
        /**
         * 特殊技能：潜行
         * 常用于：锁定技，你不能成为其他角色的卡牌的目标
         */
        qianxing: ExSkillData;
        /**
         * 特殊技能：免疫
         * 触发阶段：damageBefore（玩家收到伤害时）
         * 常用于：锁定技，防止一切伤害
         * 其作用是取消”damage“受到伤害事件的触发（故无法防止失去体力之类的伤害）
         */
        mianyi: ExSkillData;
        /**
         * 特殊技能：混乱
         * 标记技能
         * 进入“混乱”状态的情况下，不能操作（自己的面板），player.isMine的结果也是false（不能确定当前玩家是自己）
         */
        mad: ExSkillData;
        ghujia: ExSkillData;
        /**
         * 特殊技能：计算触发次数
         * 触发阶段：phaseAfter（回合结束之后）
         * 当技能存在“usable”每回合使用次数时，在创建技能事件时，添加该技能。
         * 其作用是，在回合结束时，清除player.storage.counttrigger触发技术。
         */
        counttrigger: ExSkillData;
        _recovercheck: ExSkillData;
        /**
         * 全局技能：翻面
         * 触发阶段：玩家phaseBefore（玩家回合开始后）
         * 当有玩家处于翻面状态时，到其回合开始后触发该技能。
         * 其作用是，让其翻面回正面，并且跳过该玩家的当前回合。
         */
        _turnover: ExSkillData;
        /**
         * 全局技能：卡牌使用后清楚场上的ui
         * 触发阶段：useCardAfter（全场玩家在卡牌使用之后）
         */
        _usecard: ExSkillData;
        _discard: ExSkillData;
        /**
         * 全局技能：濒死阶段循环询问求救
         * 触发阶段：濒死阶段触发（玩家频死时，玩家造成其他玩家频死时）
         */
        _save: ExSkillData;
        _ismin: ExSkillData;
        /**
         * 全局技能：重铸
         * 触发阶段：phaseUse（出牌阶段中）
         * 可以触发当前自己所拥有的牌是否可以“重铸”
         */
        _chongzhu: ExSkillData;
        //铁索连环相关
        _lianhuan: ExSkillData;
        _lianhuan2: ExSkillData;
        _lianhuan3: ExSkillData;
        _lianhuan4: ExSkillData;

        [key: string]: SMap<any> | ExSkillData;
    };

    /**
     * 武将数据中心
     * （所有扩展的character都会集中到这里）
     */
    character: HeroData[];
    /** 珠联璧合武将数据中心 */
    perfectPair: SMap<string[]>;
    /** 卡堆数据中心 */
    cardPile: SMap<CardBaseData[]>;

    /** 【联网】消息中心 */
    message: {
        server: Lib.message.Server;
        client: Lib.message.Client;
    };

    /** 花色的常量列表 */
    suit: string[];
    /** 国家势力的常量列表 */
    group: string[];
    /** 属性伤害的常量列表 */
    nature: string[];
    linked: string[];
    /** 势力的样式配置（颜色UI） */
    groupnature: SMap<string>;

    /** 挂载额外方法的保存节点：联机相关方法，文件操作方法.... */
    node: {
        //网络操作：
        //创建服务器
        /** 
         * 保存connection接入的client 
         * 
         * 经常有用这个判断是否联机
         */
        clients: BaseClientData[];
        banned: any[];
        observing: any[];

        //联机相关：
        torespond: SMap<Function | string>;
        torespondtimeout: SMap<number>;


        //文件操作：
        //以下对象，大多是nodejs的操作对象
        fs: any;
        debug(): void;
        http: any;
        https: any;

    };

    /** 貌似是所有的那些配置的那些选项的状态都保存在这里了 */
    config: LibConfigData;
}

/** 基础客户端链接对象的数据 */
interface BaseClientData extends Lib.element.Client {
    ws: WebSocket;
    id: number;
    closed: boolean;
}

/** 直接复制console的信息，没想到这么多 */
interface LibConfigData {
    addedpile: SMap<any[]>,
    all: SMap<any>,
    alteredSkills: any[],
    animation: boolean,
    appearence: boolean,
    asset_font: boolean,
    asset_image: boolean,
    asset_version: string,
    auto_check_update: boolean,
    auto_confirm: boolean,
    auto_popped_config: boolean,
    auto_popped_history: boolean,
    auto_skill: boolean,
    autoborder_count: string,
    autoborder_start: string,
    autoskilllist: any[],
    background_audio: boolean,
    background_music: string,
    background_speak: boolean,
    banned: any[],
    bannedcards: any[],
    bannedpile: SMap<any[]>,
    blur_ui: boolean,
    border_style: string,
    boss_enable_playpackconfig: boolean,
    boss_enableai_playpackconfig: boolean,
    brokenFile: any[],
    button_press: boolean,
    buttoncharacter_style: string,
    card_font: string,
    card_style: string,
    cardback_style: string,
    cardpile_enable_playpackconfig: boolean,
    cardpile_guohe_playpackconfig: string,
    cardpile_huosha_playpackconfig: string,
    cardpile_jiu_playpackconfig: string,
    cardpile_leisha_playpackconfig: string,
    cardpile_nanman_playpackconfig: string,
    cardpile_sha_playpackconfig: string,
    cardpile_shan_playpackconfig: string,
    cardpile_shunshou_playpackconfig: string,
    cardpile_tao_playpackconfig: string,
    cardpile_tiesuo_playpackconfig: string,
    cardpile_wanjian_playpackconfig: string,
    cardpile_wuxie_playpackconfig: string,
    cards: string[],
    cardshape: string,
    cardtext_font: string,
    change_skin: boolean,
    change_skin_auto: string,
    character_dialog_tool: string,
    characters: string[],
    cheat: boolean,
    clear_log: boolean,
    coin: number,
    coin_canvas_playpackconfig: boolean,
    coin_display_playpackconfig: string,
    coin_enable_playpackconfig: boolean,
    compatiblemode: boolean,
    config_menu: boolean,
    confirm_exit: boolean,
    connect_avatar: string,
    connect_cards: any[],
    connect_characters: any[],
    connect_nickname: string,
    control_style: string,
    current_mode: SMap<any>,
    cursor_style: string,
    customBackgroundPack: any[],
    custom_button: boolean,
    custom_button_control_bottom: string,
    custom_button_control_top: string,
    custom_button_system_bottom: string,
    custom_button_system_top: string,
    customcardpile: SMap<any>,
    customforbid: any[],
    damage_shake: boolean,
    defaultcards: string[],
    defaultcharacters: string[],
    dev: boolean,
    dialog_transform: number[],
    die_move: string,
    doubleclick_intro: boolean,
    duration: number,
    enable_drag: boolean,
    enable_dragline: boolean,
    enable_pressure: boolean,
    enable_touchdragline: boolean,
    enable_vibrate: boolean,
    equip_audio: boolean,
    errstop: boolean,
    extensionInfo: SMap<any>
    extension_ZJ联盟杀_enable: boolean,
    extension_ZJ联盟杀_start_wuxing: boolean,
    extension_ZJ联盟杀_start_wuxingSkill: boolean,
    extensions: any[],
    favouriteCharacter: any[],
    favouriteMode: any[],
    filternode_button: boolean,
    fold_card: boolean,
    fold_mode: boolean,
    forbid: any[][];
    forbidai: string[],
    forbidai_user: any[],
    forbidall: any[],
    forbidboss: string[],
    forbidchess: string[],
    forbiddouble: string[],
    forbidlist: any[],
    forbidstone: string[],
    forbidthreecard: string[],
    game: string,
    gameRecord: SMap<any>,
    game_speed: string,
    gameconfig: boolean,
    glass_ui: boolean,
    global_font: string,
    glow_phase: string,
    handcard_scroll: number,
    hiddenBackgroundPack: any[],
    hiddenCardPack: any[],
    hiddenCharacterPack: any[],
    hiddenModePack: any[],
    hiddenPlayPack: any[],
    hide_card_image: boolean,
    hide_card_prompt_basic: boolean,
    hide_card_prompt_equip: boolean,
    hover_all: boolean,
    hover_handcard: boolean,
    hoveration: number,
    hp_style: string,
    identity_font: string,
    image_background: string,
    image_background_blur: boolean,
    image_background_random: boolean,
    image_character: string,
    intro: string,
    jiu_effect: boolean,
    keep_awake: boolean,
    layout: string,
    link_style2: string,
    log_highlight: boolean,
    long_info: boolean,
    longpress_info: boolean,
    low_performance: boolean,
    lucky_star: boolean,
    mark_identity_style: string,
    max_loadtime: string,
    menu_style: string,
    mode: string,
    mode_config: SMap<any>,
    modeconfig: boolean,
    mousewheel: boolean,
    name_font: string,
    new_tutorial: boolean,
    only_fullskin: boolean,
    paused: boolean,
    phonelayout: boolean,
    player_border: string,
    player_height: string,
    player_height_nova: string,
    player_style: string,
    plays: any[],
    pop_logv: boolean,
    popequip: boolean,
    pressure_taptic: boolean,
    radius_size: string,
    recentIP: any[],
    recent_character_number: string,
    remember_dialog: boolean,
    remember_round_button: boolean,
    repeat_audio: boolean,
    right_click: string,
    right_info: boolean,
    right_range: boolean,
    round_menu_func: string,
    seperate_control: boolean,
    show_auto: boolean,
    show_ban_menu: boolean,
    show_card_prompt: boolean,
    show_cardpile: boolean,
    show_cardpile_number: boolean,
    show_charactercard: boolean,
    show_connect: boolean,
    show_discardpile: boolean,
    show_extensionmaker: boolean,
    show_extensionshare: boolean,
    show_favmode: boolean,
    show_favourite: boolean,
    show_favourite_menu: boolean,
    show_giveup: boolean,
    show_handcardbutton: boolean,
    show_history: string,
    show_log: string,
    show_name: boolean,
    show_pause: boolean,
    show_phase_prompt: boolean,
    show_phaseuse_prompt: boolean,
    show_playerids: boolean,
    show_replay: boolean,
    show_round_menu: boolean,
    show_scrollbar: boolean,
    show_sortcard: boolean,
    show_splash: string,
    show_stat: boolean,
    show_statusbar_android: boolean,
    show_statusbar_ios: string,
    show_time: boolean,
    show_time2: boolean,
    show_time3: boolean,
    show_volumn: boolean,
    show_wuxie: boolean,
    show_wuxie_self: boolean,
    skill_animation_type: string,
    skin: SMap<any>,
    skip_shan: boolean,
    sort: string,
    sort_card: Function,
    storageImported: boolean,
    swipe: boolean,
    swipe_down: string,
    swipe_left: string,
    swipe_right: string,
    swipe_up: string,
    sync_speed: boolean,
    tao_enemy: boolean,
    target_shake: string,
    textequip: string,
    theme: string,
    threed_card: boolean,
    title: boolean,
    touchscreen: boolean,
    turned_style: boolean,
    ui_zoom: string,
    update_link: string,
    version: string,
    vertical_scroll: boolean,
    video: string,
    vintageSkills: any[],
    volumn_audio: number,
    volumn_background: number,
    watchface: string,
    wuxie_right: boolean,
    wuxie_self: boolean,
    wuxing_enable_playpackconfig: boolean,
    wuxing_num_playpackconfig: string,
}
