//=============================================================================
// SuperiorHookRope.js (Ver 1.0.3)
//=============================================================================
// [History]
// 2017 Jul 23: Ver 0.0.1 : First Closed Release
// 2017 Jul 27: Ver 0.1.0 : add function of event invocation and fetch
// 2017 Aug  3: Ver 0.3.0 : Refine usability, especially add the touch input
// 2017 Aug 17: Ver 0.6.0 : Refine fetch behavior, invalidate through the wall
// 2018 Apr 11: Ver 1.0.0 : First Open Release
// 2018 Sep  3: Ver 1.0.1 : Add "HookRope start" and "Go Backward For Fetch".
// 2018 Sep  4: Ver 1.0.2 : Refine "Trigger For Hook Rope" and "Go Backward For Fetch".
// 2018 Sep 11: Ver 1.0.3 : Add SE Option and Advanced Plugin Commands

/*:
 * @plugindesc Realize multi functional hook rope without event commands
 * @author Sasuke KANNAZUKI (Thx to Sakachan)
 *
 * @param Hook Rope Animation File Name
 * @desc file at img/animations/ without .png
 * @default HookRope
 * @require 1
 * @dir img/animations/
 * @type file
 *
 * @param Max Length
 * @desc The length of hook rope
 * @default 7
 *
 * @param Require Strict Length
 * @desc Player can move when the picket is... 0:Exact Max Length 1:<= Max Length
 * @default 1
 *
 * @param Trigger For Hook Rope
 * @desc Set one of them: ok, shift, pageup, pagedown, or none (default:ok)
 * @default ok
 *
 * @param Switch ID HookRope Works
 * @desc the switch id that's ON only when hook rope is working. If it's 0, it won't work well.
 * @default 20
 *
 * @param Default Event Invocation Mode
 * @desc whether to invoke event that hook rope touch (0:No 1:only image name starts ! 2:Yes)
 * @default 0
 *
 * @param Default Event Fectch Mode
 * @desc whether to fetch event that hook rope touch (0:No 1:only image name starts ! 2:Yes)
 * @default 0
 *
 * @param Require HookRope Item
 * @desc 1: No HookRope party, doesn't invoke. 0: invokes regardless of item posession.
 * @default 0
 *
 * @param Go Backward For Fetch
 * @desc 1: Yes(default) 0: No. Player cannot fetch event if its destination is not passable. 2:Yes, but adjacent event.
 * @default 1
 *
 * @param Shot SE File Name
 * @desc The SE plays when hook rope shots
 * @default Evasion1
 * @require 1
 * @dir audio/se/
 * @type file
 *
 * @param Shot SE Volume
 * @desc volume of hook rope shot SE
 * @default 90
 *
 * @param Shot SE Pitch
 * @desc pitch of hook rope shot SE
 * @default 100
 *
 * @param Shrink SE File Name
 * @desc The SE when hook rope begin to shrink. if not set, keep playing shot SE.
 * @default Evasion2
 * @require 1
 * @dir audio/se/
 * @type file
 *
 * @param Shrink SE Volume
 * @desc volume of hook rope shrink SE
 * @default 90
 *
 * @param Shrink SE Pitch
 * @desc pitch of hook rope shrink SE
 * @default 100
 *
 * @param Fetch SE File Name
 * @desc The SE when hook rope is fetching an event. if not set, play shrink SE. 
 * @default Decision1
 * @require 1
 * @dir audio/se/
 * @type file
 *
 * @param Fetch SE Volume
 * @desc The SE volume when hook rope is fetching an event.
 * @default 90
 *
 * @param Fetch SE Pitch
 * @desc The SE pitch when hook rope is fetching an event.
 * @default 100
 *
 * @help
 * [Summary]
 * It displays hook rope animation on map when specified key(set by option) is
 * triggered or use specified item as hook rope.
 * This hook rope enables following 3 functions:
 * 1. When there is a picket on the route of hook rope, player will move to the
 * position in front of the picket.
 * 2. When hook rope touches an event, invoke the event.
 * 3. When hook rope touches an event, fetch the event in front of the party.
 *
 * Note 1: The hook rope cannot pass through the wall. If there's wall tile on
 *  hook rope route, it starts to shrink in front of the wall.
 * Note 2: Hook rope doesn't work when player is on the wall.
 *
 * [Priority]
 * - Event invocation is higher priority than hook rope.
 * - So, when player use hook rope to adjacent event, invokes normal event
 *   and hook rope effect is ignored.
 * - The nearest event is higher priority when plural events in the range of
 *   hook rope.
 * - Note:The adjacent event to the player never invoke.
 * - If an event has plural functions of above 3, the priority is follows:
 *   1 > 2 > 3.
 *
 * [1. How to define the 'picket' image (event or tile)]
 * - When you write <picket> in the note of the event, the image of page #1 is
 *   regarded as a picket.
 * - If you want to define picket image of different page, write as follows:
 *   <picket:5> in the case, the event's image of page 5 is set as a picket.
 * - If you want to define picket image layer #2 (middle layer, the right
 *   side of A2 tile), write the coordinate in the note of map as follows:
 *   <picket:(15,20)> in this case, the middle layer image of (15,20) is
 *   regarded as the picket.
 * - The setting in the event is higher priority than setting in the map.
 * - The picket setting is remain even if the player move to another map.
 *   The picket image changes when you set picket in the changed map.
 *
 * [2. How to Invoke Event by the hook rope]
 * - You can set the option 'Default Event Invocation Mode' to default
 *   invoke event.
 * - The event will never invoke by hook rope when the event is invisible
 *   (= neither tile id nor chracterName, or set tranparent).
 * - When you set the event's note <onHook>, it'll invoke everytime,
 *   or set <ignoreHook>, it'll never invoke event, regardless of the
 *   option.
 * - The option Switch 'Switch ID HookRope Works' is ON if and only if
 *   durin the hook rope working.
 *   So you can run different event command by checking the switch condtion
 *   (ex. make condition branch that the trigger is the switch).
 * - You fetch item only if the player passable to foward.
 *
 * [3. How to Fetch Event by the hook rope]
 * - You can set the option 'Default Event Fetch Mode' to default
 *   event that player can fetch.
 * - This function works only when the event is the same height as player,
 *   and the event is visible.
 * - When you set the event's note <canFetch>, you can fetch any time,
 *   or set <noFetch>, you can never fetch the event regardless the option.
 * - You have to pay attention when you set the option be 2, player can fetch
 *   even if the event is people event(s).
 * - *NOTE* Player may cannot fetch the event objects if the space is
 *   not passable. But if player can move to behind tile,
 *   player may go backward and fetch the event.
 *
 * [About Key and Button Assign in the Option]
 * ok : enter, space, Z, or Gamepad A
 * shift : shift, or Gamepad X
 * pageup : pageup, Q, or Gamepad LB
 * pagedown : pagedown, W, or Gamepad RB
 * none : not accept any key(for using item or plugin command invocation)
 *
 * [How to use hook rope by touch panel]
 * Tap the event, then player moves appropriate position and use hook rope.
 * But the player can reach to the event on foot, player won't use hook rope.
 *
 * [How to define hook rope item]
 * Write <hookRope> in the item's note, the item become hook rope.
 * When you use such the item on the menu scene (except in the battle),
 * it changes scene to the map and performs hook rope animation immidiately.
 *
 * [Advanced Option 1 : Plugin Commands]
 * HookRope resetPicket
 *   Invalidate picket. It may be useful on the map without picket
 * HookRope off
 *   Invalidate hook rope function. It assumes to the use of the map that
 *   no need to use hook rope.
 *   The setting remains until you execute plugin command 'HookRope on'.
 * HookRope on
 *   Validate hook rope function (It is the default mode).
 * HookRope start
 *   Invoke hook rope by plugin command.
 *   It assumes the invocation from event commands.
 *
 * [Advanced Option 2 : Note Description]
 * If you need to disable hook rope only on specified map,
 * Write down <HookRopeDisable> to the note of the map.
 * This setting is valid only in the map.
 *
 * [Advanced Option 3: Yet More Plugin Commands]
 * HookRope MaxLength 12
 * HookRope MaxLength 7
 * HookRope MaxLength V4
 * Change the Max Length of Hook Rope.
 * V4 indicates the value of variable #4.
 *
 * HookRope Picket off
 *   invalidate picket function from hook rope.
 * HookRope Picket on
 *   validate picket function. (default)
 *
 * HookRope Invoke off
 *   invalidate event invocation function from hook rope.
 * HookRope Invoke on
 *   validate event invocation function. (default)
 *
 * HookRope Fetch off
 *   invalidate event fetch function from hook rope.
 * HookRope Fetch on
 *   validate event fetch function. (default)

 * [License]
 * The default animation file is a copy in Sakachan's 'Tarapon Quest 4'.
 * Thanks to Sakachan, that she readily agrees to use the file.
 *
 * this plugin is released under MIT license.
 * http://opensource.org/licenses/mit-license.php
 */

/*:ja
 * @plugindesc 多機能フックロープをイベントコマンドを使わずに実現出来ます。
 * @author 神無月サスケ（謝辞：さかちゃん）
 *
 * @param Hook Rope Animation File Name
 * @desc img/animations/ にあるフックロープのファイル名。拡張子なしで指定。
 * @default HookRope
 * @require 1
 * @type animation
 *
 * @param Max Length
 * @desc フックロープの最大距離
 * @default 7
 *
 * @param Require Strict Length
 * @desc 0:最大距離丁度の位置に杭があった時のみ移動 1:最大距離以内なら何歩先でも有効
 * @default 1
 *
 * @param Trigger For Hook Rope
 * @desc フックロープ起動条件。以下が有効: ok, shift, pageup, pagedown, none (デフォルト:ok)
 * @default ok
 *
 * @param Switch ID HookRope Works
 * @desc フックロープ作動中だけONになるスイッチID。0にしないでください。
 * @default 20
 *
 * @param Default Event Invocation Mode
 * @desc 接触したイベントを起動するか (0:しない 1:!で始まる画像のみ 2:する)
 * @default 0
 *
 * @param Default Event Fectch Mode
 * @desc 接触したイベントを取ってくるか(0:しない 1:!で始まる画像のみ 2:する)
 * @default 0
 *
 * @param Require HookRope Item
 * @desc 1: フックロープアイテム所持の時だけ起動 0:アイテムに関係なく起動
 * @default 0
 *
 * @param Go Backward For Fetch
 * @desc 目の前が通行不可の場合、プレイヤーが一歩後退して取るか。 1: する(デフォルト) 0: しない 2: 接触時以外する
 * @default 1
 *
 * @param Shot SE File Name
 * @desc フックロープ発射時のSEです。
 * @default Evasion1
 * @require 1
 * @dir audio/se/
 * @type file
 *
 * @param Shot SE Volume
 * @desc フックロープ発射時のSEボリュームです。
 * @default 90
 *
 * @param Shot SE Pitch
 * @desc フックロープ発射時のSEのピッチです。
 * @default 100
 *
 * @param Shrink SE File Name
 * @desc フックロープが収縮する際のSEです。省略すると演奏されず、発射時のSEが演奏され続けます。
 * @default Evasion2
 * @require 1
 * @dir audio/se/
 * @type file
 *
 * @param Shrink SE Volume
 * @desc フックロープ収縮する際のSEボリュームです。
 * @default 90
 *
 * @param Shrink SE Pitch
 * @desc フックロープ収縮する際のSEピッチです。
 * @default 100
 *
 * @param Fetch SE File Name
 * @desc フックロープがイベントを手繰り寄せる時とプレイヤーが移る時のSEです。省略すると通常の収縮の設定になります。
 * @default Decision1
 * @require 1
 * @dir audio/se/
 * @type file
 *
 * @param Fetch SE Volume
 * @desc フックロープがイベントを手繰り寄せる際のSEボリュームです。
 * @default 90
 *
 * @param Fetch SE Pitch
 * @desc フックロープがイベントを手繰り寄せる際のSEピッチです。
 * @default 100
 *
 * @help
 * ■概要
 * マップ上で特定のキーを押すか、またはメニュー画面でアイテムを使用した時に、
 * プレイヤーの向きに応じてフックロープのアニメーションを表示します。
 * フックロープには、以下の３つの使い方があります。
 * １．フックロープの先に杭があった場合、プレイヤーは杭の手前まで移動します。
 * ２．フックロープが接触したイベントを起動します。
 * ３．フックロープの先に接触したイベントを、目の前に持ってきます(フェッチ)。
 *
 * なお、フックロープは壁を通り抜けられません。壁がある場合、その手前までしか
 * 伸びません。
 * また、プレイヤーが壁の上にいる時は、フックロープは起動しません。
 *
 * ■優先順位に関する注意
 *  ・プレイヤーに隣接するするイベントでは、トリガ(オプションで指定する、
 *   どのキーでフックロープを起動するか）がokの場合、通常イベント起動の方が
 *   優先され、フックロープによる起動は無視されます。
 * ・もし、フックロープの範囲内に、複数のフックロープイベントがある場合、
 * 一番「近くにある」イベントが最優先されます。
 * ・もし、上記のうち複数の特徴を持つイベントが指定された場合、
 * 、優先順位は、１＞２＞３ となります。
 * 
 * ■１．杭となるイベントやタイルの指定方法
 * ・イベントのメモにて<picket>と書くことで、そのイベントの１ページ目の画像を
 *   持つイベントが、一律、杭とみなされるようになります。
 *   １ページ目以外の画像を参照したい場合、例えば<picket:5>と記述することで、
 *   そのイベントの５ページ目の画像が杭と見做されます。
 *   画像は、タイルでもイベントでもかまいません。
 * ・マップのメモにて、中層（タイルA2の右半分）を持つ座標が指定された場合、
 *   そのA2タイルが杭と見做されます。
 *   例：マップのメモに<picket:(15,20)>と書くことで、座標(15,20)の中層タイルが
 *   杭と見做されます。
 * ・マップとイベント、双方に記述がある場合、イベントの設定が優先されます。
 * ・マップが切り替わっても、設定は維持されます。他マップで、新たに杭が
 *   設定された場合、杭がその画像に置き換わります。
 *
 * ■２．接触したイベントの起動方法
 * ・オプション「Default Event Invocation Mode」にて、起動可能なイベント種類を
 *   設定できます。
 * ・起動可能な場合でも、画像設定のないイベントなど透明イベントは起動しません。
 * ・イベントのメモに<onHook>と書くことで、オプションの値に関係なく起動します。
 *   逆に<ignoreHook>と書いたイベントは、オプションを無視して起動しません。
 *   透明イベントでも、メモに<onHook>と設定の場合、起動可能となります。
 * ・オプション「Switch ID HookRope Works」で指定されたイベントIDは、
 *   フックロープ起動中のみONになります。よって、このスイッチを見ることで
 *   フックロープから起動されたかどうかが分かるため、
 *   イベント内でそのスイッチで条件分岐を行うと、「フックロープで起動されたか
 *   否か」で処理を分けることが可能です。
 *
 * ■３．接触したイベントを、主人公の目の前に、引き寄せる方法
 * ・オプション「Default Event Fectch Mode」で機能可能なイベント種類を
 *   設定できます。
 * ・引き寄せ可能なのは、「プライオリティ」が「通常キャラと同じ」で、なおかつ
 *   画像が設定されており、透明でないイベントだけです。
 * ・イベントのメモに<canFetch>と書くことで、オプションを無視して起動します。
 *   逆に<noFetch>と書かれたイベントは、オプションを無視して起動しません。
 * ・オプションの値を2に設定した場合、そのイベントが人物であっても
 *   メモ設定がなければ、引き寄せ可能になってしまうため、注意が必要です。
 * ◆ポイント：もし目の前が通行可能なら、そのままイベントを引き寄せますが、
 *   通行不可の場合で、なおかつプレイヤーが後方に通行可能な場合、
 *   プレイヤーは一歩後退し、プレイヤーがいた場所にイベントが引き寄せられます。
 *
 * ■起動キーオプションの設定とキー、パッドのボタンとの対応
 * ok : enter, space, Z, または Gamepad A
 * shift : shift, または Gamepad X
 * pageup : pageup, Q, または Gamepad LB
 * pagedown : pagedown, W, または Gamepad RB
 * none : キーは受け付けない(アイテムやプラグインコマンドで起動する人向け)
 *
 * ■タッチパネルでの操作方法
 * 歩いてたどり着くことが不可能なイベント（例：川に囲まれている）を
 * タップすると、自動的に必要な場所でフックロープを使用します。
 * 直線距離上に移動し、フックロープが使えるようになったら使ってくれます。
 *
 * ■フックロープとなるアイテムの設定方法
 * アイテムのメモに <hookRope> と書くことで、そのアイテムはフックロープと
 * みなされます。戦闘以外で使用することで、即マップに切り替わり、
 * フックロープのイベントが起動します。
 *
 * ■応用１：プラグインコマンド
 * HookRope resetPicket
 * 杭の画像をリセットします。杭のないマップで行うと有効です。
 * HookRope off
 * フックロープの機能を無効にします。フックロープ不要のマップでの設定を
 * 想定しています。設定は「HookRope on」が呼ばれるまで保持されます。
 * HookRope on
 * フックロープの機能を有効にします。（デフォルト）
 *
 * HookRope start
 * フックロープを起動します。
 * イベントコマンドからフックロープを起動するときに呼び出してください。
 *
 * ■応用２：メモ
 * マップのメモに<HookRopeDisable>と書くことで、そのマップに限り、
 * フックロープは起動しなくなります。
 *
 * ■応用３：応用プラグインコマンド
 * HookRope MaxLength 12
 * HookRope MaxLength 7
 * HookRope MaxLength V4
 * フックロープの最大距離を変更します。
 * 頭にVを付けると、その変数の値になります。
 *
 * HookRope Picket off
 * 杭に飛び移る機能（上記の１）を一時的に無効にする
 * HookRope Picket on
 *  杭に飛び移る機能を有効にする（デフォルト）
 *
 * HookRope Invoke off
 * 接触したイベントを起動する機能（上記の２）を一時的に無効にする
 * HookRope Invoke on
 * 接触したイベントを起動する機能を有効にする（デフォルト）
 *
 * HookRope Fetch off
 * 接触したイベントを引き寄せる機能（上記の３）を一時的に無効にする
 * HookRope Fetch on
 * 接触したイベントを引き寄せる機能有効にする（デフォルト）
 *
 * ■競合対策
 * - サンシロ様の SAN_AnalogMove.js との競合を解決しています。
 *
 * ■ライセンス表記
 * このプラグイン作成にあたって、さかちゃん様の「たらぽんくえすと４」で
 * 使われた「びよよんロープ」の画像を、そのまま利用しています。
 * 快諾下さった「さかちゃん」さんに感謝します。
 *
 * このプラグインは MIT ライセンスで配布されます。
 * ご自由にお使いください。
 * http://opensource.org/licenses/mit-license.php
 */

(function() {
  // ------------------------------------------------------------------------
  // process parameters
  //
  var parameters = PluginManager.parameters('SuperiorHookRope');
  var fileName = parameters['Hook Rope Animation File Name'] || 'HookRope';
  var maxLength = Number(parameters['Max Length'] || 7);
  var isFlexibleLength = !!Number(parameters['Require Strict Length'] || 1);
  var triggerKey = parameters['Trigger For Hook Rope'] || 'ok';
  var hookRopeSwitchId = Number(parameters['Switch ID HookRope Works'] || 20);
  var invokeMode = Number(parameters['Default Event Invocation Mode'] || 0);
  var fetchMode = Number(parameters['Default Event Fectch Mode'] || 0);
  var requiresItem = !Number(parameters['Require HookRope Item'] || 0);
  // for fetch configuration
  var _goBackwardForFetch = Number(parameters['Go Backward For Fetch'] || 1);
  var goBackwardForFetch = _goBackwardForFetch !== 0;
  var notBackwardAdjacent = _goBackwardForFetch === 2;
  // for SE 
  var _shotSeFileName = parameters['Shot SE File Name'] || '';
  var _shotSeVolume = Number(parameters['Shot SE Volume'] || 90);
  var _shotSePitch = Number(parameters['Shot SE Pitch'] || 100);
  var _shrinkSeFileName = parameters['Shrink SE File Name'] || '';
  var _shrinkSeVolume = Number(parameters['Shrink SE Volume'] || 90);
  var _shrinkSePitch = Number(parameters['Shrink SE Pitch'] || 100);
  var _fetchSeFileName = parameters['Fetch SE File Name'] || '';
  var _fetchSeVolume = Number(parameters['Fetch SE Volume'] || 90);
  var _fetchSePitch = Number(parameters['Fetch SE Pitch'] || 100);

  // ------------------------------------------------------------------------
  // if trigger key is invalid, assign 'ok' as invocation switch instead.
  //
  if (!['ok', 'shift', 'pageup', 'pagedown', 'none'].contains(triggerKey)) {
    triggerKey = 'ok';
  };
  if (triggerKey === 'none') {
    triggerKey = '';
  };

  // ------------------------------------------------------------------------
  // process plugin commands
  //
  var _Game_Interpreter_pluginCommand =
   Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'HookRope') {
      switch (args[0]) {
      case 'resetPicket':
        $gameSystem.resetPicketImage();
        break;
      case 'on':
        $gameSystem.hookRopeDisabled = false;
        break;
      case 'off':
        $gameSystem.hookRopeDisabled = true;
        break;
      case 'start':
        if (hookRopeConditionMet()) {
          performHookRopeAnimation();
        }
        break;
      case 'MaxLength':
        var newLength = parseNumberParam(args[1]) || maxLength;
        $gameSystem.hookRopeMaxLength = newLength;
        break;
      case 'Picket':
        switch (args[1]) {
        case 'on':
          $gameSystem.hookRopePicketInvalid = false;
          break;
        case 'off':
          $gameSystem.hookRopePicketInvalid = true;
          break;
        }
        break;
      case 'Invoke':
        switch (args[1]) {
        case 'on':
          $gameSystem.hookRopeInvokeInvalid = false;
          break;
        case 'off':
          $gameSystem.hookRopeInvokeInvalid = true;
          break;
        }
        break;
      case 'Fetch':
        switch (args[1]) {
        case 'on':
          $gameSystem.hookRopeFetchInvalid = false;
          break;
        case 'off':
          $gameSystem.hookRopeFetchInvalid = true;
          break;
        }
        break;
      }
    }
  };

  var parseNumberParam = function (strInteger) {
    var result = /(V?)([0-9]+)/.exec(strInteger);
    if (result) {
      return result[1] ? $gameVariables.value(+result[2]) : +result[2];
    } else {
      return $gameSystem.hookRopeMaxLength;
    }
  };

  // ------------------------------------------------------------------------
  // define SE object and function（★★★未実装）
  //
  var shotSE = _shotSeFileName ? {name:_shotSeFileName, volume:_shotSeVolume,
   pitch:_shotSePitch} : null;
  var shrinkSE = _shrinkSeFileName ? {name:_shrinkSeFileName,
   volume:_shrinkSeVolume, pitch:_shrinkSePitch} : null;
  var fetchSE = _fetchSeFileName ? {name:_fetchSeFileName,
   volume:_fetchSeVolume, pitch:_fetchSePitch} : null;

  SoundManager.shotHookRope = function () {
    if (shotSE) {
      AudioManager.playStaticSe(shotSE);
    }
  };

  SoundManager.shrinkHookRope = function () {
    if (shrinkSE) {
      AudioManager.stopSe();
      AudioManager.playStaticSe(shrinkSE);
    }
  };

  SoundManager.fetchHookRope = function () {
    if (fetchSE) {
      AudioManager.stopSe();
      AudioManager.playStaticSe(fetchSE);
    } else {
      SoundManager.shrinkHookRope();
    }
  };

  // ------------------------------------------------------------------------
  // variable definition and manipulation of hook rope on Game_CharacterBase
  //
  var _Game_CharacterBase_initMembers =
   Game_CharacterBase.prototype.initMembers;
  Game_CharacterBase.prototype.initMembers = function() {
    _Game_CharacterBase_initMembers.call(this);
    this._hookRopeAnime = null;
  };

  Game_CharacterBase.prototype.requestHookRopeAnime = function(animation) {
    this._hookRopeAnime = animation;
  };

  Game_CharacterBase.prototype.hookRopeAnime = function() {
    return this._hookRopeAnime;
  };

  Game_CharacterBase.prototype.hookRopeAnimeValid = function() {
    return !!this._hookRopeAnime;
  };

  Game_CharacterBase.prototype.resetHookRopeAnime = function() {
    this._hookRopeAnime = null;
  };

  var _Game_CharacterBase_startAnimation =
   Game_CharacterBase.prototype.startAnimation;
  Game_CharacterBase.prototype.startAnimation = function() {
    _Game_CharacterBase_startAnimation.call(this);
    if (this.hookRopeAnimeValid()) {
      this.resetHookRopeAnime();
    }
  };

  // ------------------------------------------------------------------------
  // data reference from sprites
  //
  var _Sprite_Character_setupAnimation =
   Sprite_Character.prototype.setupAnimation;
  Sprite_Character.prototype.setupAnimation = function() {
    if (this._character.hookRopeAnimeValid()) {
      this.startAnimation(this._character.hookRopeAnime(), false, 0);
      this._character.startAnimation();
      return;
    }
    _Sprite_Character_setupAnimation.call(this);
  };

  // ------------------------------------------------------------------------
  // json format templete of animation
  //

  // it needs 'frames'(the array of 'cell') and 'timings'
  var animeTemplete = {id:999, name:'Hook Rope', animation1Hue:0,
   animation1Name:fileName, animation2Hue:0, animation2Name:'', position:1};

  // it needs to rewrite index 0, 1, and 2.
  // 0:pattern number (if -1 or undefined, the cell is ignored.
  // (1, 2) : x and y coordinate
  var cellsTemplete = [null, null, null, 150, 0, 0, 255, 0];

  // it is transparent animation cell.
  //
  var noneCell = [0, 0, 0, 150, 0, 0, 0, 0];
  noneCell.visible = false;

  // if it needs SEs and flashes, put them as the member of array.
  var timingsTemplete = [];

  // ------------------------------------------------------------------------
  // build json format of animation
  //
  var hookRopeAnimeInfo = function (direction) {
    switch (direction) {
    case 2: // down
      return {sx:0, sy:-74, dx:0, dy:12, pattern:2};
    case 4: // left
      return {sx:90, sy:12, dx:-12, dy:0, pattern:6};
    case 6: // right
      return {sx:-92, sy:12, dx:12, dy:0, pattern:4};
    case 8: // up
      return {sx:0, sy:78, dx:0, dy:-12, pattern:0};
    default: // error
      return {sx:0, sy:0, dx:0, dy:0, pattern:0};
    }
  };

  var ropeCell = function (move, coord) {
    var cell = cellsTemplete.clone();
    cell[0] = move.pattern + 1;
    cell[1] = move.sx + move.dx * coord * 3;
    cell[2] = move.sy + move.dy * coord * 3;
    return cell;
  };

  var clubCell = function (move, distance) {
    var cell = cellsTemplete.clone();
    cell[0] = move.pattern;
    cell[1] = move.sx + move.dx * distance;
    cell[2] = move.sy + move.dy * distance;
    return cell;
  };

  var cellsInTheFrameToPeak = function (move, frames) {
    var cellsInFrame = [];
    for (var i = 0; i < Math.ceil(frames / 3); i++) {
      cellsInFrame.push(ropeCell(move, i));
    }
    cellsInFrame.push(clubCell(move, frames));
    return cellsInFrame;
  };

  var hookRopeFrames = function (direction, distance) {
    var preFrames = [];
    for (var i = 0; i < $gamePlayer._framesForBackWard(); i++) {
      preFrames.push(noneCell);
    }
    var move = hookRopeAnimeInfo(direction);
    var framesToPeak = [];
    var d =$gamePlayer._needsBackwardForFetch() ? distance + 1 : distance;
    for (var i = 0; i < d; i++) {
      var frameCells = cellsInTheFrameToPeak(move, i * 4);
      framesToPeak.push(frameCells);
    }
    var peakFrames = [];
    for (i = $gamePlayer._framesForBackWard(); i < 4; i++) {
      peakFrames[i] = framesToPeak[distance - 1];
    }
    return preFrames.concat(framesToPeak, peakFrames,
     framesToPeak.clone().reverse());
  };

  var hookRopeAnimation = function (direction, distance) {
    var animation = Object.assign({}, animeTemplete);
    animation.frames = hookRopeFrames(direction, distance);
    animation.timings = timingsTemplete.clone();
    return animation;
  };

  // ------------------------------------------------------------------------
  // when cell needs more than 16, do the dynamic creation
  //
  var _Sprite_Animation_updateFrame = Sprite_Animation.prototype.updateFrame;
  Sprite_Animation.prototype.updateFrame = function() {
    if (this._duration > 0) {
      var frameIndex = this.currentFrameIndex();
      var theFrame = this._animation.frames[frameIndex];
      if (theFrame) { // except length is 0
        this._addCellSprites(theFrame.length);
        _Sprite_Animation_updateFrame.call(this);
      }
    }
  };

  Sprite_Animation.prototype._addCellSprites = function (number) {
    for(var i = this._cellSprites.length; i < number; i++) {
      var sprite = new Sprite();
      sprite.anchor.x = 0.5;
      sprite.anchor.y = 0.5;
      this._cellSprites.push(sprite);
      this.addChild(sprite);
    }
  };

  // ------------------------------------------------------------------------
  // process before and after working hook rope.
  // esp. solve inflict with SAN_AnalogMove.js
  //
  var _setHookRopeSwitch = function () {
    if (hookRopeSwitchId) {
      if ('setAnalogMoveValid' in $gameSystem) {
        $gameSystem.setAnalogMoveValid(false);
      }
      $gameSwitches.setValue(hookRopeSwitchId, true);
    }
  };

  var _resetHookRopeSwitch = function () {
    if (hookRopeSwitchId) {
      if ('setAnalogMoveValid' in $gameSystem) {
        $gameSystem.setAnalogMoveValid(true);
      }
      $gameSwitches.setValue(hookRopeSwitchId, false);
    }
  };

  // ------------------------------------------------------------------------
  // make player's move route at using hook rope
  //
  var _directionToRouteCode = function (direction) {
    switch (direction) {
    case 2:
      return Game_Character.ROUTE_MOVE_DOWN;
    case 4:
      return Game_Character.ROUTE_MOVE_LEFT;
    case 6:
      return Game_Character.ROUTE_MOVE_RIGHT;
    case 8:
      return Game_Character.ROUTE_MOVE_UP;
    default: //error
      return 0;
    }
  };

  Game_CharacterBase.prototype._memorizeMoveInfo = function (backward) {
    if (!this._oldMoveSpeed) {
      this._oldMoveSpeed = this.moveSpeed();
      this._oldWalkAnime = this.hasWalkAnime();
      this._oldStopAnime = this.hasStepAnime();
      this._goBackward = !!backward;
    }
  };

  Game_CharacterBase.prototype._resumeMoveInfo = function () {
    if (this._oldMoveSpeed) {
      this.setMoveSpeed(this._oldMoveSpeed);
      this.setWalkAnime(this._oldWalkAnime);
      this.setStepAnime(this._oldStopAnime);
      this.setThrough(false);
      $gameTemp._callbackFn = null;
      $gameTemp._hookRopeType = null;
      this._oldMoveSpeed = this._oldWalkAnime = this._oldStopAnime = null;
    }
  };

  var _Game_Character_processRouteEnd =
   Game_Character.prototype.processRouteEnd;
  Game_Character.prototype.processRouteEnd = function() {
    _Game_Character_processRouteEnd.call(this);
    if (this._goBackward) {
      this._goBackward = null;
    } else {
      _resetHookRopeSwitch();
    }
    this._resumeMoveInfo();
  };

  var _Game_Player_processRouteEnd = 
   Game_Player.prototype.processRouteEnd;
  Game_Player.prototype.processRouteEnd = function() {
    _Game_Player_processRouteEnd.call(this);
    if ($gameTemp._requestGather) {
      this.gatherFollowers();
      $gameTemp._requestGather = false;
    }
  };

  var theWaitCount = function (distance) {
    return distance * 2 + 8;
  };

  Game_Character.prototype.moveRouteJson = function (dirCode, distance) {
    var firstWaitCount = theWaitCount(distance) +
     $gamePlayer._framesForBackWard();
    var route = {list:[
      {code:Game_Character.ROUTE_CHANGE_SPEED, parameters:[6]},
      {code:Game_Character.ROUTE_WAIT, parameters:[firstWaitCount]},
      {code:Game_Character.ROUTE_SCRIPT, parameters:[
        'SoundManager.fetchHookRope()']},
      {code:Game_Character.ROUTE_WALK_ANIME_OFF},
      {code:Game_Character.ROUTE_STEP_ANIME_OFF},
      {code:Game_Character.ROUTE_THROUGH_ON}],
      repeat:false, skippable:false, wait:true
    };
    for (var i = 0; i < distance - 1; i++) {
      route.list.push({code:dirCode});
    }
    route.list.push({code:Game_Character.ROUTE_END});
    return route;
  };

  var goBackwardJson = function (dirCode) {
    var route = {list:[
      {code:Game_Character.ROUTE_CHANGE_SPEED, parameters:[6]},
      {code:Game_Character.ROUTE_MOVE_BACKWARD},
      {code:Game_Character.ROUTE_WALK_ANIME_OFF},
      {code:Game_Character.ROUTE_STEP_ANIME_OFF},
      {code:Game_Character.ROUTE_THROUGH_ON}],
      repeat:false, skippable:false, wait:false
    };
    route.list.push({code:Game_Character.ROUTE_END});
    return route;
  };

  var nonMoveJson = function (distance) {
    return {list:[
      {code:Game_Character.ROUTE_WAIT, parameters:[
        theWaitCount(distance) + 4]},
      {code:Game_Character.ROUTE_SCRIPT, parameters:[
        'SoundManager.shrinkHookRope()'
      ]},
      {code:Game_Character.ROUTE_WAIT, parameters:[
        Math.max(distance * 4 - theWaitCount(distance), 0)
      ]},
      {code:Game_Character.ROUTE_END}],
      repeat:false, skippable:false, wait:true
    };
  };

  var nonMoveJsonWithScript = function (distance, event) {
    $gameTemp._callbackFn = function () {
      event.start();
    };
    return {list:[
      {code:Game_Character.ROUTE_WAIT, parameters:[theWaitCount(distance)]},
      {code:Game_Character.ROUTE_SCRIPT, parameters:['$gameTemp._callbackFn()'
      ]},
      {code:Game_Character.ROUTE_WAIT, parameters:[
        Math.max(distance * 4 + 4 - theWaitCount(distance), 0)
      ]},
      {code:Game_Character.ROUTE_END}],
      repeat:false, skippable:false, wait:true
    };
  };

  Game_Character.prototype.setHookRopeRoute = function (direction, distance) {
    this._memorizeMoveInfo();
    var dirCode = _directionToRouteCode(direction);
    this.forceMoveRoute(this.moveRouteJson(dirCode, distance));
    this._waitCount = theWaitCount(distance);
    _setHookRopeSwitch();
  };

  var _Game_Event_setHookRopeRoute = Game_Event.prototype.setHookRopeRoute;
  Game_Event.prototype.setHookRopeRoute = function (direction, distance) {
    $gameTemp.moveSeType = 1;
    _Game_Event_setHookRopeRoute.call(this, direction, distance);
  };


  var _Game_Player_setHookRopeRoute = Game_Player.prototype.setHookRopeRoute;
  Game_Player.prototype.setHookRopeRoute = function (direction, distance) {
    $gameTemp.moveSeType = 0;
    _Game_Player_setHookRopeRoute.call(this, direction, distance);
    $gameTemp._requestGather = true;
  };

  Game_Player.prototype.setBackwardForFetch = function(distance) {
    if (this._needsBackwardForFetch()) {
      var dirCode = _directionToRouteCode($gamePlayer.direction());
      this._memorizeMoveInfo(true);
      this.forceMoveRoute(goBackwardJson(dirCode));
      this._waitCount = distance * 4 + 4;
    }
  };

  Game_Player.prototype.setWaitForHookRope = function (distance) {
    this._memorizeMoveInfo();
    _setHookRopeSwitch();
    this.forceMoveRoute(nonMoveJson(distance));
    this._waitCount = distance * 4 + 4;
  };

  Game_Event.prototype.setWaitWithScript = function (distance) {
    this._memorizeMoveInfo();
    _setHookRopeSwitch();
    this.forceMoveRoute(nonMoveJsonWithScript(distance, this));
    this._waitCount = theWaitCount(distance);
  };

  // ------------------------------------------------------------------------
  // getters and setters of picket's image(tile id, or event's image infos)
  //
  var _Game_System_initialize = Game_System.prototype.initialize;
  Game_System.prototype.initialize = function() {
    _Game_System_initialize.call(this);
    this._refreshHookRope();
  };

  var _Game_System_onAfterLoad = Game_System.prototype.onAfterLoad;
  Game_System.prototype.onAfterLoad = function() {
    _Game_System_onAfterLoad.call(this);
    this._refreshHookRope();
  };

  Game_System.prototype._refreshHookRope = function () {
    if (!this.isPicketSet()) {
      this.resetPicketImage();
    }
    if (this.hookRopeDisabled == null) {
      this.hookRopeDisabled = false;
    }
    this.hookRopeMaxLength = this.hookRopeMaxLength || maxLength;
    if (this.hookRopePicketInvalid == null) {
      this.hookRopePicketInvalid = false;
    }
    if (this.hookRopeInvokeInvalid == null) {
      this.hookRopeInvokeInvalid = false;
    }
    if (this.hookRopeFetchInvalid == null) {
      this.hookRopeFetchInvalid = false;
    }
  };

  Game_System.prototype.resetPicketImage = function () {
    this._picketTileId = 0;
    this._picketCharName = '';
    this._picketCharIndex = 0;
  };

  Game_System.prototype.isPicketSet = function () {
    return this._picketTileId || this._picketCharName;
  };

  Game_System.prototype.setPicketImage = function (image) {
    if (image.tileId > 0) {
      this._setPicketTileImage(image.tileId);
    } else {
      this._setPicketEventImage(image.characterName, image.characterIndex);
    }
  };

  Game_System.prototype._setPicketTileImage = function (tileId) {
    this._picketTileId = tileId;
    this._picketCharName = '';
    this._picketCharIndex = 0;
  };

  Game_System.prototype._setPicketEventImage = function (charName, charIndex) {
    this._picketTileId = 0;
    this._picketCharName = charName;
    this._picketCharIndex = charIndex;
  };

  Game_System.prototype.isPicketImage = function (image) {
    if (image.tileId > 0) {
      return this._isPicketTileImage(image.tileId);
    } else {
      return this._isPicketEventImage(image.characterName,
       image.characterIndex);
    }
  };

  Game_System.prototype._isPicketTileImage = function (tileId) {
    if (this._picketTileId) {
      return tileId === this._picketTileId;
    }
    return false;
  };

  Game_System.prototype._isPicketEventImage = function (charName, charIndex) {
    if (this._picketCharName) {
      return charName === this._picketCharName &&
       charIndex === this._picketCharIndex;
    }
    return false;
  };

  // ------------------------------------------------------------------------
  // process the note of event and/or map for picket
  //
  var _pageFromNote = function (pageId) {
    return pageId === true ? 0 : Number(pageId - 1);
  };

  var _imageFromNote = function (event, pageId) {
    return event.event().pages[_pageFromNote(pageId)].image;
  };

  var _picketNotesOfEvents = function () {
    return $gameMap.events().some(function (event) {
      if (event.event().meta.picket) {
        var pageId = event.event().meta.picket;
        $gameSystem.setPicketImage(_imageFromNote(event, pageId));
        return true;
      }
      return false;
    });
  };

  var _picketNotesOfMap = function () {
    // Important note: This function can set Tileset A,
    // but always inspect only layer 2 (as we call 'central layer').
    // Generally, only right side of A2 tilesets have the layer.
    if ($dataMap.meta.picket) {
      var p = $dataMap.meta.picket;
      var re = (/\s*\(([0-9]+)\s*[\,\;]\s*([0-9]+)\s*\)/).exec(p);
      var tileIdA2 = $gameMap.tileId(Number(re[1]), Number(re[2]), 1);
      $gameSystem._setPicketTileImage(tileIdA2);
    }
  };

  var _Game_Map_setupEvents = Game_Map.prototype.setupEvents;
  Game_Map.prototype.setupEvents = function() {
    _Game_Map_setupEvents.call(this);
    if (!_picketNotesOfEvents()) {
      _picketNotesOfMap();
    }
  };

  // ------------------------------------------------------------------------
  // routine for to invoke/fetch the event when hook rope touches
  //
  var _isVisibleEvent = function (event) {
    return (event.tileId() || event.characterName()) &&
     !event.isTransparent();
  };

  var _isEventConditionMet = function (event, theSamePriority) {
    return (!theSamePriority || event.isNormalPriority()) && 
       _isVisibleEvent(event);
  };

  var _isFetchDestinationOk = function (isReverseDir) {
    var p = $gamePlayer;
    var d = isReverseDir ? p.reverseDir(p.direction()) : p.direction();
    var mapPassable = p.isMapPassable(p.x, p.y, d);
    if (mapPassable) {
      var x = $gameMap.roundXWithDirection(p.x, d);
      var y = $gameMap.roundYWithDirection(p.y, d);
      if ($gameMap.eventsXyNt(x, y).length === 0) {
        return true;
      }
    }
    return false;
  };

  var _judgeFromParam = function (event, mode, theSamePriority) {
    switch (mode) {
    case 0: // no
      return false;
    case 1: // only whose image starts with !
      return  _isEventConditionMet(event, theSamePriority) &&
       event._pageIndex >= 0 &&
       ImageManager.isObjectCharacter(event.page().image.characterName);
    case 2: // yes
      return _isEventConditionMet(event, theSamePriority);
    }
    // something wrong
    return false;
  };

  Game_Event.prototype._canInvoke = function () {
    if ($gameSystem.hookRopeInvokeInvalid) {
      return false;
    } else if (this.event().meta.onHook) {
      return true;
    } else if (this.event().meta.ignoreHook) {
      return false;
    } else {
      return _judgeFromParam(this, invokeMode, false);
    }
  };

  Game_Event.prototype._canFetch = function () {
    if ($gameSystem.hookRopeFetchInvalid) {
      return false;
    } else if (this.event().meta.canFetch) {
      return true;
    } else if (this.event().meta.noFetch) {
      return false;
    } else {
      return _judgeFromParam(this, fetchMode, true) &&
       (_isFetchDestinationOk(false) || _isFetchDestinationOk(true));
    }
  };

  Game_Player.prototype._needsBackwardForFetch = function () {
    return $gameTemp._hookRopeType === Game_Event._FETCH &&
     !_isFetchDestinationOk(false) && _isFetchDestinationOk(true);
  };

  Game_Player.prototype._framesForBackWard = function () {
    return this._needsBackwardForFetch() ? 4 : 0;
  };

  // ------------------------------------------------------------------------
  // judgement functions whether there is the picket/event or not
  //
  Game_Event._PICKET = 1;
  Game_Event._INVOKE = 2;
  Game_Event._FETCH  = 3;

  var _isPicketTileThere = function (x, y) {
    var picketOk = !$gameSystem.hookRopePicketInvalid;
    return picketOk && $gameSystem._isPicketTileImage($gameMap.tileId(x,y,1));
  };

  var _isHookRopeEventThere = function (x, y) {
    var events = $gameMap.eventsXy(x, y);
    for (var i = 0; i < events.length; i++) {
      var event = events[i];
      var pageOk = event._pageIndex >= 0;
      var picketOk = !$gameSystem.hookRopePicketInvalid;
      var isPicketImage = $gameSystem.isPicketImage(event.page().image);
      if (pageOk && picketOk && isPicketImage){
        return Game_Event._PICKET;
      } else if (event._canInvoke()) {
        return Game_Event._INVOKE;
      } else if (event._canFetch()) {
        return Game_Event._FETCH;
      }
    }
    return 0;
  };

  var _hookRopeIdThere = function (x, y) {
    var x = $gameMap.roundX(x);
    var y = $gameMap.roundY(y);
    var eventThere = _isHookRopeEventThere(x, y);
    if (_isPicketTileThere(x, y) || eventThere === Game_Event._PICKET) {
      return Game_Event._PICKET;
    } else {
      return eventThere;
    }
  };

  // ------------------------------------------------------------------------
  // checks whether there's any picket/event on the player's direction
  //
  var _dxFromDirection = function (d) {
    return d === 6 ? 1 : d === 4 ? -1 : 0;
  };

  var _dyFromDirection = function (d) {
    return d === 2 ? 1 : d === 8 ? -1 : 0;
  };

  var _directionToCoord = function (direction, distance) {
    var x = $gamePlayer.x + _dxFromDirection(direction) * distance;
    var y = $gamePlayer.y + _dyFromDirection(direction) * distance;
    return {x:x, y:y};
  };

  var _isTileA3There = function (x, y) { // building or house
    var tileId = $gameMap.tileId(x, y, 0);
    return tileId >= 0x1100 && tileId <= 0x13DF;
  };

  var _isTileA4There = function (x, y) { // wall
    var tileId = $gameMap.tileId(x, y, 0);
    return tileId >= 0x1400 && tileId <= 0x1FDF;
  };

  var isPassableLowerTileThere = function (x, y) {
    return !_isTileA3There(x, y) && !_isTileA4There(x, y);
  };

  var _checkIfWallOnTheRoute = function (type, direction) {
    var maxLength = $gameSystem.hookRopeMaxLength;
    for (var i = 1; i <= maxLength; i++) {
      var coord = _directionToCoord(direction, i);
      if (!isPassableLowerTileThere(coord.x, coord.y)) {
        return {id:0, len:i - 1};
      }
    }
    return {id:type, len:maxLength};
  };

  var distanceFromPlayerAndId = function (direction) {
    var type, coord;
    var maxLength = $gameSystem.hookRopeMaxLength;
    if (!isFlexibleLength) {
      coord = directionToCoord(direction, maxLength);
      type = _hookRopeIdThere(coord.x, coord.y);
      return _checkIfWallOnTheRoute(type, direction);
    }
    var lenToWall = _checkIfWallOnTheRoute(type, direction).len;
    var len = Math.min(lenToWall, maxLength);
    for (var i = 1; i <= len; i++) {
      coord = _directionToCoord(direction, i);
      if (type = _hookRopeIdThere(coord.x, coord.y)) {
        return {id:type, len:i};
      }
    }
    return {id:0, len:len};
  };

  // ------------------------------------------------------------------------
  // perform hook rope animation
  //
  Game_Character.prototype.isOverTheWall = function() {
    return _isTileA4There(this.x, this.y);
  };

  var performHookRopeAnimation = function () {
    if ($gamePlayer.isOverTheWall()) {
      return;
    }
    var dir = $gamePlayer.direction();
    var idAndLength = distanceFromPlayerAndId(dir);
    var distance = idAndLength.len;
    var type = $gameTemp._hookRopeType = idAndLength.id;
    if (type === 0) {
      $gamePlayer.requestHookRopeAnime(hookRopeAnimation(dir, distance));
      $gamePlayer.setWaitForHookRope(distance);
    } else {
      $gamePlayer.requestHookRopeAnime(hookRopeAnimation(dir, distance));
      switch (type) {
      case Game_Event._PICKET:
        $gamePlayer.setHookRopeRoute(dir, distance);
        break;
      case Game_Event._INVOKE:
        var coord = _directionToCoord(dir, distance);
        $gameMap.eventsXy(coord.x, coord.y).forEach(function (event) {
          event.setWaitWithScript(distance);
        });
        break;
      case Game_Event._FETCH:
        var needsBackward = $gamePlayer._needsBackwardForFetch();
        if ((!goBackwardForFetch && needsBackward) ||
            (notBackwardAdjacent && needsBackward && distance <= 1)) {
          // do the same as type === 0
          $gamePlayer.requestHookRopeAnime(hookRopeAnimation(dir, distance));
          $gamePlayer.setWaitForHookRope(distance);
        } else {
          $gamePlayer.setBackwardForFetch(distance);
          var coord = _directionToCoord(dir, distance);
          distance += needsBackward ? 1 : 0;
          $gameMap.eventsXy(coord.x, coord.y).forEach(function (event) {
            event.setHookRopeRoute(event.reverseDir(dir), distance);
          });
        }
        break;
      }
    }
    if (distance > 0) {
      SoundManager.shotHookRope();
    }
  };

  //
  // player cannot move during hook rope is working
  //
  var _Game_Player_executeMove = Game_Player.prototype.executeMove;
  Game_Player.prototype.executeMove = function(direction) {
    if ($gameSwitches.value(hookRopeSwitchId)) {
      return;
    }
    _Game_Player_executeMove.call(this, direction);
  };

  // ------------------------------------------------------------------------
  // key trigger to use hook rope
  //
  var hookRopeConditionMet = function () {
    return _hookRopeOccasionOk() &&
     (!!requiresItem || $gameParty.hasHookRope);
  };

  var _Game_Player_triggerButtonAction =
   Game_Player.prototype.triggerButtonAction;
  Game_Player.prototype.triggerButtonAction = function() {
    var someoneInvoked = _Game_Player_triggerButtonAction.call(this);
    if (!someoneInvoked && triggerKey && hookRopeConditionMet()) {
      if (Input.isTriggered(triggerKey)) {
        performHookRopeAnimation();
        return true;
      }
    }
    return someoneInvoked;
  };

  // ------------------------------------------------------------------------
  // for efficiency, process item's note for hook rope at first.
  //
  var _Scene_Boot_start = Scene_Boot.prototype.start;
  Scene_Boot.prototype.start = function() {
    _Scene_Boot_start.call(this);
    DataManager._processHookRope();
  };

  var _isHookRopeInNote = function (item) {
    return item.meta.hookRope;
  };

  DataManager._processHookRope = function() {
    for (i = 1; i < $dataItems.length; i++) {
      if (_isHookRopeInNote($dataItems[i])) {
        $dataItems[i].hookRope = true;
        $dataItems[i].occasion |= 0x02; // disable to use the battle
      } else {
        $dataItems[i].hookRope = false;
      }
    }
  };

  // ------------------------------------------------------------------------
  // whether the party has hook rope or not.
  // (for efficiency, judges only when item changes)
  //
  Game_Party.prototype._hasHookRope = function () {
    return this.items().some(function (item) {
      return item.hookRope;
    });
  };

  var _Game_Party_initAllItems = Game_Party.prototype.initAllItems;
  Game_Party.prototype.initAllItems = function() {
    _Game_Party_initAllItems.call(this);
    this.hasHookRope = false;
  };

  var _Game_Party_gainItem = Game_Party.prototype.gainItem;
  Game_Party.prototype.gainItem = function(item, amount, includeEquip) {
    _Game_Party_gainItem.call(this, item, amount, includeEquip);
    if (DataManager.isItem(item)) {
      this.hasHookRope = this._hasHookRope();
    }
  };

  // ------------------------------------------------------------------------
  // when player uses hook rope at menu
  //
  var _Game_Temp_initialize = Game_Temp.prototype.initialize;
  Game_Temp.prototype.initialize = function () {
    _Game_Temp_initialize.call(this);
    this._useHookRope = false;
    this._requestGather = false;
    this._callbackFn = null;
    this._hookRopeType = null;
    this.towardHookRopePosition = false;
    this.moveSeType = 0;
  };

  Game_Temp.prototype._reserveHookRope = function () {
    this._useHookRope = true;
  };

  Game_Temp.prototype._clearHookRope = function () {
    this._useHookRope = false;
  };

  Game_Temp.prototype._isHookRopeReserved = function () {
    return this._useHookRope;
  };

  var _isHookRope = function (item) {
    return DataManager.isItem(item) && item.hookRope;
  };

  Game_Action.prototype._isHookRopeItem = function () {
    return _isHookRope(this.item());
  };

  var _hookRopeOccasionOk = function () {
    return !$gameSystem.hookRopeDisabled /*&& !$dataMap.meta.HookRopeDisable*/;
  };

  var _Game_Party_canUse = Game_Party.prototype.canUse;
  Game_Party.prototype.canUse = function(item) {
    if (_isHookRope(item) && !_hookRopeOccasionOk()) {
      return false;
    }
    return _Game_Party_canUse.call(this, item);
  };

  var _Game_Action_applyGlobal = Game_Action.prototype.applyGlobal;
  Game_Action.prototype.applyGlobal = function() {
    if (this._isHookRopeItem()) {
      $gameTemp._reserveHookRope();
    }
    _Game_Action_applyGlobal.call(this);
  };

  var _Scene_ItemBase_checkCommonEvent =
   Scene_ItemBase.prototype.checkCommonEvent;
  Scene_ItemBase.prototype.checkCommonEvent = function() {
    if ($gameTemp._isHookRopeReserved()) {
      SceneManager.goto(Scene_Map);
      return;
    }
    _Scene_ItemBase_checkCommonEvent.call(this);
  };

  var _Game_Interpreter_setupReservedCommonEvent =
   Game_Interpreter.prototype.setupReservedCommonEvent;
  Game_Interpreter.prototype.setupReservedCommonEvent = function() {
    if ($gameTemp._isHookRopeReserved()) {
      performHookRopeAnimation();
      $gameTemp._clearHookRope();
      return true;
    }
    return _Game_Interpreter_setupReservedCommonEvent.call(this);
  };

  // ------------------------------------------------------------------------
  // touch input to use hook rope
  //
  var _Game_Temp_setDestination = Game_Temp.prototype.setDestination;
  Game_Temp.prototype.setDestination = function(x, y) {
    _Game_Temp_setDestination.call(this, x, y);
    if (hookRopeConditionMet() && _hookRopeIdThere(x, y)) {
      this.towardHookRopePosition = true;
    }
  };

  var _Game_Temp_clearDestination = Game_Temp.prototype.clearDestination;
  Game_Temp.prototype.clearDestination = function() {
    _Game_Temp_clearDestination.call(this);
    this.towardHookRopePosition = false;
  };

  var canHookRopeReachTo = function () {
    var x = $gameMap.deltaX($gamePlayer.x, $gameTemp.destinationX());
    var y = $gameMap.deltaY($gamePlayer.y, $gameTemp.destinationY());
    var maxLength = $gameSystem.hookRopeMaxLength;
    x = Math.abs(x);
    y = Math.abs(y);
    if ((x === 0 && y <= maxLength) || (x <= maxLength && y === 0)) {
      return true;
    }
    return false;
  };

  var _Game_Character_findDirectionTo = 
   Game_Character.prototype.findDirectionTo;
  Game_Character.prototype.findDirectionTo = function (goalX, goalY) {
    var thrp = $gameTemp.towardHookRopePosition;
    var d = _Game_Character_findDirectionTo.call(this, goalX, goalY);
    if (thrp && canHookRopeReachTo()) {
      var x = $gameTemp.destinationX();
      var y = $gameTemp.destinationY();
      $gamePlayer.turnTowardCharacter({x:x, y:y});
      performHookRopeAnimation();
      return 0;
    }
    return d;
  };

})();
