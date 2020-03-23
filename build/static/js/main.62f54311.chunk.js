(this["webpackJsonpfive-in-a-row"]=this["webpackJsonpfive-in-a-row"]||[]).push([[0],[,,,,,,,,function(e,t,a){e.exports=a(19)},,,,,function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){"use strict";a.r(t);var n=a(0),i=a.n(n),c=a(7),r=a.n(c),o=(a(13),a(1)),s=a(2),l=a(3),p=a(4),u=(a(14),a(5));a(15),a(16);function y(e){var t=e.typeNum,a=e.size;return i.a.createElement("span",{className:"back back-".concat(t),style:{width:a,height:a},onClick:function(){e.onClick()}})}var h,m;a(17);function f(e){var t=e.size,a=e.type,n=e.point;return i.a.createElement("span",{className:"piece piece-".concat(a===h.black?"black":"white"),style:{top:n.y*t,left:n.x*t,width:t,height:t}})}!function(e){e[e.black=0]="black",e[e.white=1]="white"}(h||(h={})),function(e){e.init="\u51c6\u5907\u5c31\u7eea",e.playing_black="\u9ed1\u65b9\u843d\u5b50",e.playing_white="\u767d\u65b9\u843d\u5b50",e.black_victory="\u9ed1\u65b9\u80dc\u5229",e.white_victory="\u767d\u65b9\u80dc\u5229",e.draw="\u5e73\u5c40"}(m||(m={}));var v=function(){function e(){Object(o.a)(this,e)}return Object(s.a)(e,null,[{key:"setBack",value:function(e,t,a){for(var n=[],i=0;i<t;i++)for(var c=0;c<a;c++){var r=0,o={x:c,y:i};r=0===i?0===c?1:c===a-1?3:2:i===t-1?0===c?7:c===a-1?9:8:0===c?4:c===a-1?6:5,n.push({typeNum:r,size:e,point:o})}return n}},{key:"getArrItem",value:function(e,t,a){return e.filter((function(e){var n=e.point,i=n.x,c=n.y,r=e.type,o=!1;return t.x===i&&t.y===c&&(o=!0,void 0!==a&&r!==a&&(o=!1)),o}))[0]||null}},{key:"isVictory",value:function(e,t){for(var a=this,n=[[],[],[],[]],i=t.size,c=t.type,r=t.point,o=-2;o<3;o++)n[0].push({size:i,type:c,point:{x:r.x+o,y:r.y}}),n[1].push({size:i,type:c,point:{x:r.x,y:r.y+o}}),n[2].push({size:i,type:c,point:{x:r.x+o,y:r.y+o}}),n[3].push({size:i,type:c,point:{x:r.x-o,y:r.y+o}});return n.some((function(t){return t.every((function(t){return null!==a.getArrItem(e,t.point,t.type)}))}))?t:null}},{key:"judgeTheWinningSide",value:function(t){var a=t.filter((function(a){return e.isVictory(t,a)}))[0]||null;return a&&a.type}}]),e}(),b=function(e){Object(p.a)(a,e);var t=Object(l.a)(a);function a(e){var n;Object(o.a)(this,a);var i=(n=t.call(this,e)).props.initData;return n.state={backData:v.setBack(i.size,i.row,i.list)},n}return Object(s.a)(a,[{key:"render",value:function(){var e=this,t=this.state.backData,a=this.props.nextPieceType,n=this.props.initData,c=n.size,r=n.list,o=n.row,s=r*c,l=o*c;return i.a.createElement("div",{className:"game-panel"},i.a.createElement("div",{className:"panel-back",style:{width:s,height:l}},t.map((function(t,n){return i.a.createElement(y,Object.assign({},t,{onClick:function(){e.props.gameState!==m.draw&&e.props.gameState!==m.black_victory&&e.props.gameState!==m.white_victory&&e.props.onPush({point:t.point,size:c,type:a})},key:n}))})),this.props.pieceData.map((function(e,t){return i.a.createElement(f,Object.assign({},e,{key:t}))}))))}}]),a}(n.PureComponent);a(18);function k(e){var t=i.a.createElement(i.a.Fragment,null);return e.showBtnUndo&&(t=i.a.createElement("button",{onClick:e.onUndo},"\u6094\u68cb")),i.a.createElement("div",{className:"operate-panel"},i.a.createElement("p",{className:"state"},"\u6e38\u620f\u72b6\u6001: ",i.a.createElement("span",null,e.gameState)),i.a.createElement("button",{onClick:function(){if(e.gameState===m.init){var t=e.nextPieceType===h.black?m.playing_black:m.playing_white;e.onClick(t)}else e.onClick(m.init)}},e.gameState===m.init?"\u5f00\u59cb":"\u91cd\u73a9"),t,i.a.createElement("p",null,"\u4f18\u5148\u51fa\u68cb\u65b9:"),i.a.createElement("div",{className:"radio-flex"},[{text:"\u9ed1\u65b9\u4f18\u5148",PieceType:h.black,default:!0},{text:"\u767d\u65b9\u4f18\u5148",PieceType:h.white}].map((function(t,a){return i.a.createElement("label",{htmlFor:"radio-sv2-".concat(a),key:a},t.text,i.a.createElement("input",{type:"radio",name:"state",id:"radio-sv2-".concat(a),value:"black",defaultChecked:t.default,onClick:function(){return e.onPriority(t.PieceType)},disabled:e.gameState!==m.init}))}))))}var g=function(e){Object(p.a)(a,e);var t=Object(l.a)(a);function a(){var e;Object(o.a)(this,a);for(var n=arguments.length,i=new Array(n),c=0;c<n;c++)i[c]=arguments[c];return(e=t.call.apply(t,[this].concat(i))).state={nextPieceType:h.black,gameState:m.init,initData:e.props,pieceData:[]},e.switchPieceType=function(e){return e===h.black?h.white:h.black},e.onPush=function(t){var a=e.switchPieceType(t.type),n=a===h.black?m.playing_black:m.playing_white;e.setState({pieceData:[].concat(Object(u.a)(e.state.pieceData),[t]),nextPieceType:a,gameState:n},(function(){var t=e.state,a=t.initData,n=t.pieceData,i=v.judgeTheWinningSide(n);i===h.black?e.setState({gameState:m.black_victory}):i===h.white&&e.setState({gameState:m.white_victory}),n.length===a.row*a.list&&e.setState({gameState:m.draw})}))},e.undo=function(){if(!(e.state.pieceData.length<2)){var t=Object(u.a)(e.state.pieceData),a=t.pop();if(a){var n=a.type===h.black?m.playing_black:m.playing_white;e.setState({pieceData:t,nextPieceType:a.type,gameState:n})}}},e}return Object(s.a)(a,[{key:"render",value:function(){var e=this,t=this.state,a=t.gameState,n=t.nextPieceType;return i.a.createElement("div",{className:"Game wrap-center"},i.a.createElement(b,Object.assign({},this.state,{setGameState:function(t){e.setState({gameState:t})},onPush:this.onPush})),i.a.createElement(k,{gameState:a,nextPieceType:n,showBtnUndo:this.state.pieceData.length>1&&this.state.gameState===m.playing_black||this.state.pieceData.length>1&&this.state.gameState===m.playing_white,onClick:function(t){t===m.init&&e.setState({pieceData:[]}),e.setState({gameState:t})},onPriority:function(t){e.setState({nextPieceType:t})},onUndo:this.undo}))}}]),a}(n.PureComponent),d=function(e){Object(p.a)(a,e);var t=Object(l.a)(a);function a(){return Object(o.a)(this,a),t.apply(this,arguments)}return Object(s.a)(a,[{key:"render",value:function(){return i.a.createElement("div",{className:"App"},i.a.createElement(g,{size:30,row:20,list:20}))}}]),a}(n.PureComponent);r.a.render(i.a.createElement(d,null),document.getElementById("root"))}],[[8,1,2]]]);
//# sourceMappingURL=main.62f54311.chunk.js.map