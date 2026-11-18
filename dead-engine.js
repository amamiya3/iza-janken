/* Pure DEAD practice rules. No network, DOM or storage dependencies. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.DeadEngine=api})(typeof globalThis!=='undefined'?globalThis:this,()=>{'use strict';
const HANDS=['rock','scissors','paper'],BEATS={rock:'scissors',scissors:'paper',paper:'rock',heaven:null};
const SUPPORTED=['01','02','03','04','05','06','07','08','09','18','21','23','25','26','27','38','46','47','48','49'];
function initial(){return {round:1,score:[0,0],history:[],sealed:false,over:false,winner:null}}
function outcome(a,b){if(a===b)return 'draw';if(a==='heaven')return 'win';if(b==='heaven')return 'lose';return BEATS[a]===b?'win':'lose'}
function recent(state){return state.history.filter(e=>!e.replay)}
function condition(state,id){if(state.over)return '試合は終了しています';if(id&&!SUPPORTED.includes(id))return '処理仕様の確認待ちです';if(state.sealed&&id)return 'この局は守護の代償で秘技を使えません';if(id==='06'&&!(state.score[0]===0&&state.score[1]===2))return '自分0点・相手2点の時だけ使用できます';if(id==='08'&&state.round!==1)return '第1局だけ使用できます';if(id==='09'&&!(state.score[0]===2&&state.score[1]===2))return '双方2点の時だけ使用できます';if(id==='46'&&state.score[1]!==2)return '相手があと1点で勝つ時だけ使用できます';if(id==='47'&&recent(state).at(-1)?.outcome!=='lose')return '直前の局で負けた時だけ使用できます';if(id==='48'){const h=recent(state);if(h.length<2||h.at(-1).hand!==h.at(-2).hand)return '同じ手を直前の2局で続けて出した時だけ使用できます'}return null}
function resolve(state,{hand,opponent,card=null,target=null}){if(!HANDS.includes(hand)||!HANDS.includes(opponent))throw Error('不正な手です');const error=condition(state,card);if(error)throw Error(error);if(['18','33'].includes(card)&&!HANDS.includes(target))throw Error('予言する手を選んでください');if(card==='48'&&hand!==recent(state).at(-1).hand)throw Error('直前2局と同じ手を選んでください');
 let a=hand,b=opponent,logs=[],add=[0,0],replay=false,sealed=false;
 if(card==='21'){a='heaven';logs.push('天上の一手：第四の手「天」に変更')}
 if(card==='23'){a=b;logs.push('鏡写し：相手の手をコピー')}
 if(card==='25'){[a,b]=[b,a];logs.push('強制交換：両者の手を交換')}
 if(card==='26'){b={rock:'scissors',scissors:'paper',paper:'rock'}[b];logs.push('右回り：相手の手が変化')}
 if(card==='27'){b={rock:'paper',paper:'scissors',scissors:'rock'}[b];logs.push('左回り：相手の手が変化')}
 const base=outcome(a,b);let result=base;
 if(card==='03'&&result!=='draw'){result=result==='win'?'lose':'win';logs.push('逆転勝負：勝敗を逆転')}
 if(card==='01'&&result==='lose'){result='draw';logs.push('敗北否定：負けをあいこに変更')}
 if(card==='02'&&result==='draw'){result='win';logs.push('勝利転化：あいこを勝ちに変更')}
 if(card==='09'&&result==='draw'){result='win';logs.push('決着の宣告：あいこから決着')}
 if(card==='04'&&result==='lose'){replay=true;logs.push('時戻し：この局を無効化。得点なしで再勝負')}
 if(!replay){if(result==='win')add[0]=1;if(result==='lose')add[1]=1;
 if(card==='05'){if(result==='win')add[0]=2;if(result==='lose')add[1]=2;logs.push('天命の賭け：勝敗の得点が2点')}
 if(['06','08','47'].includes(card)&&result==='win'){add[0]=2;logs.push('秘技により勝利得点が2点')}
 if(card==='48'&&result==='win'){add[0]=2;logs.push('三度目の正直：同じ手で勝利し2点')}
 if(card==='38'&&result==='win'){add[0]++;logs.push('挑発：先に公開した手で勝ち追加1点')}
 if(card==='33'&&target===opponent){add[0]++;logs.push('予言的中：追加1点')}
 if(card==='18'&&target===opponent){add[1]=0;logs.push('宣告的中：相手の得点を0に')}
 if(['07','46','49'].includes(card)&&add[1]>0){add[1]=0;logs.push('相手の得点を防いだ')}
 if(card==='49'){sealed=true;logs.push('守護の代償：次局の自分の秘技を封印')}
 }
 if(card&&!logs.length)logs.push('発動条件に合う結果にならず、効果なし（カードは消費）');
 const score=state.score.map((v,i)=>Math.min(3,v+add[i]));const over=score.some(v=>v>=3);const winner=over?(score[0]>=3?'you':'cpu'):null;
 const event={round:state.round,hand,opponent,finalHand:a,finalOpponent:b,base,outcome:result,card,target,add,replay,logs};return {state:{round:state.round+(replay?0:1),score,history:[...state.history,event],sealed,over,winner},event};
}
return {HANDS,SUPPORTED,initial,outcome,condition,resolve,recent};
});
