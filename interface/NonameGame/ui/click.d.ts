declare namespace UI {

    interface Click {
        identitycircle(): any;
        connectEvents(): any;
        connectClients(): any;
        autoskin(): any;
        skin(avatar, name, callback): any;
        touchpop(forced): any;
        exit(): any;
        shortcut(show): any;
        favouriteCharacter(e): any;
        buttonnameenter(): any;
        buttonnameleave(): any;
        dragtouchdialog(e): any;
        identity(e): any;
        identity2(): any;
        roundmenu(): any;
        pausehistory(): any;
        pauseconfig(): any;
        /** 牌堆信息：轮数，剩余牌数，棋牌堆 */
        cardPileButton(): any;
        chat(): any;
        volumn(): any;
        volumn_background(e): any;
        volumn_audio(e): any;
        hoverpopped(): any;
        hoverpopped_leave(): any;
        leavehoverpopped(): any;
        dierevive(): any;
        dieswap(): any;
        dieswap2(): any;
        touchconfirm(): any;
        windowtouchstart(e): any;
        windowtouchmove(e): any;
        windowtouchend(e): any;
        checkroundtranslate(translate): any;
        checkdialogtranslate(translate, dialog): any;
        windowmousewheel(e): any;
        windowmousemove(e): any;
        windowmousedown(e): any;
        cardtouchstart(e): any;
        cardtouchmove(e): any;
        windowmouseup(e): any;
        mousemove(): any;
        mouseenter(): any;
        mouseleave(): any;
        mousedown(): any;
        mouseentercancel(): any;
        hoverplayer(e): any;
        longpressdown(e): any;
        longpresscallback(): any;
        longpresscancel(): any;
        window(): any;
        toggle(): any;
        editor(): any;
        switcher(): any;
        choice(): any;
        button(): any;
        touchintro(): any;
        card(): any;
        avatar(): any;
        avatar2(): any;
        player(): any;
        target(e): any;
        control2(): any;
        control(): any;
        dialogcontrol(): any;
        skill(skill): any;
        ok(node): any;
        cancel(node): any;
        logv(e): any;
        logvleave(): any;
        charactercard(name, sourcenode, noedit, resume, avatar): any;
        intro(e): any;
        intro2(): any;
        auto(): any;
        wuxie(): any;
        tempnowuxie(): any;
        pause(): any;
        resume(e): any;
        config(): any;
        swap(): any;
        mousewheel(evt): any;
        touchStart(e): any;
        dialogtouchStart(e): any;
        touchScroll(e): any;
        autoskill(bool, node): any;
        skillbutton(): any;
        autoskill2(e): any;
        rightplayer(e): any;
        right(e): any;
    }
}