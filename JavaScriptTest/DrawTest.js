/**
 * 
 */
/* 原点 */
var root_x = 1;
var root_y = 40;
/* グリッドのサイズ */
var GRID_WIDTH = 20;
var GRID_HEIGHT = 20;
/* グラフのサイズ(グリッド単位) */
var GRAPH_GRID_X_NUM = 0; // 廃止予定
var GRAPH_GRID_Y_NUM = 10;
/* グラフのサイズ(px単位) */
var graph_x_length;
var graph_y_length;
/* グラフの原点 */
var graph_root_x = 0;
var graph_root_y = 0;
/* Y軸の１グリッドの人月数 */
var grid_unit = 1;
/* 目盛りのCANVASの幅（動的に取得したい） */
var scale_width = 50;

function getGraphWidth(data) {

	return getGridQuantityX(data.maxPeriod) * GRID_WIDTH + 30;
}

// グラフのX軸のグリッド数を算出する。値は４の倍数になるよう繰り上げる。
function getGridQuantityX(maxPeriod) {

	var gridQuantityX = Math.ceil(maxPeriod * 4);
	gridQuantityX += 4 - (gridQuantityX % 4);
	return gridQuantityX;
}

function drawEstimateCanvas(data) {
	
    // Canvas APIが利用できるかを判定（1）
    if (!HTMLCanvasElement) {
    	return false;
    }
   
	// コンテキストオブジェクトを取得（2）
	var cv = window.document.querySelector('#cv');
	var c = cv.getContext('2d');
	c.clearRect(0, 0, cv.width, cv.height);
	
	// グラフのX軸のグリッド数を算出する。値は４の倍数になるよう繰り上げる。
	GRAPH_GRID_X_NUM = getGridQuantityX(data.maxPeriod);
	
	// グラフの基礎データ設定
	graph_root_x = root_x;
	graph_root_y = root_y + (GRID_HEIGHT * GRAPH_GRID_Y_NUM );
	graph_x_length = (GRID_WIDTH * GRAPH_GRID_X_NUM);
	graph_y_length = graph_root_y - root_y;

	// Y軸の１グリッドの人月数を算出(基本は１)
	grid_unit = 1;
	// Y軸のグリッド個数を超えていたら１グリッドあたりの人月を増やす
	if ( data.maxManHourMonth > GRAPH_GRID_Y_NUM ) {
		grid_unit = Math.ceil(data.maxManHourMonth / GRAPH_GRID_Y_NUM );
	}
      
	// グラフのX軸/Y軸およグリッド線を描画
	drawAxis(c);

	// X軸/Y軸のスケール（X軸:月数, Y軸:工数）を描画
	drawScale(c);

	// グラフにデータを描画する
	drawEstimateData(c, data.graphData);

	// 最短開発期間を描画
	drawTermLine(c, data.earliestWorkPeriodSlim, [ 255, 0, 0 ], 5,
			Math.round(data.earliestWorkPeriodSlim * 10) / 10 + "ヶ月");

	// 標準工期を描画
	drawTermLine(c, data.standardWorkPeriodJuas, [ 255, 128, 0 ], 22,
			Math.round(data.standardWorkPeriodJuas * 10) / 10 + "ヶ月");

	// 全工程分のキャプションの情報を作成する
	var captionInfos = createCaptionInfos(data);

	// 全工程分のキャプションを描画する
	drawCaptionAll(c, captionInfos);
}

/**
 * 全工程の工程毎キャプション情報の配列を作成する。<br />
 * キャプションパネルの描画座標はここでは設定しない。
 * 
 * @param data
 *            見積り情報JSON
 * @returns {Array} 工程毎キャプション情報の配列
 */
function createCaptionInfos(data) {

	// 工程のキャプションを描画
  	var passedTimeLine = 0;
  	// キャプションの描画位置の配列
  	var captionArr = new Array();
	// 描画するキャプションの情報を作成して配列に格納する
    for (var i in data.graphData) {
    	var captionManHour = "工数：" + data.graphData[i].manHourProcess + "人月";
    	var captionWorkPeriod = "期間：" + data.graphData[i].workPeriod + "ヶ月";

    	// 数値部はデータによって桁数が変わるので最大文字数を算出
    	var numberOfChara = String(data.graphData[i].manHourProcess).length;
    	if ( numberOfChara < String(data.graphData[i].workPeriod).length )
    		numberOfChara = String(data.graphData[i].workPeriod.length);

    	// グリッドの原点からずらすオフセット
    	var posOffset = [10, -10];
    	// キャプション(X座標)…工程の最初のグリッドのルート
    	var captionRootX = graph_root_x + passedTimeLine * GRID_WIDTH;
    	// キャプション(Y座標)…工程の人月の上部のグリッドのルート
    	var captionRootY = graph_root_y - Math.ceil(data.graphData[i].estimate[0] / grid_unit) * GRID_HEIGHT ;
    	// 工程毎キャプション情報
    	var processData =
    		{
    			"captionPosition": [captionRootX + posOffset[0], captionRootY + posOffset[1]], // キャプションの描画開始座標
    			"captionManHour": captionManHour,
    			"captionWorkPeriod": captionWorkPeriod,
    			"color": data.graphData[i].gridColor,
    			"captionSizeX": [0, 0], // キャプションパネルのX座標の From 〜 To (後で設定)
				"captionSizeY": [0, 0], // キャプションパネルのY座標の From 〜 To (後で設定)
				"numberOfChara": numberOfChara // キャプションの数値部の文字数
    		};
    	captionArr.push(processData);

    	// 次工程のキャプション位置を設定
    	passedTimeLine += data.graphData[i].estimate.length;
    }
    return captionArr;
}

/**
 * 全工程分のキャプションパネルとキャプション文字を描画する
 * <ol type="1">
 * <li>キャプションの描画位置を基にキャプションパネルの描画位置を算出する</li>
 * <li>前工程のキャプションと位置がかぶる場合にはかぶらない描画位置を設定する</li>
 * <li>キャプションがグラフより上はみ出る場合にもはみ出ない描画位置を設定する</li>
 * </ol>
 * 最初の工程で上にはみ出た場合のは未対応
 * 
 * @param c Canvasコンテキスト
 * @param captionArr 工程毎キャプション情報の配列
 */
function drawCaptionAll(c, captionArr) {

	for (var i in captionArr) {

    	// キャプション文字の描画位置を設定
    	var fontWidth = 12;
    	var panelSize = [fontWidth / 2 * (2 * 5 + captionArr[i].numberOfChara), fontWidth * 2 ];
    	var panelPadding = 4; 
    	var captionX = captionArr[i].captionPosition[0];
    	var captionY = captionArr[i].captionPosition[1];

    	// キャプションの描画位置を基にキャプションパネルの描画位置を設定
    	captionArr[i].captionSizeX[0] = captionX - panelPadding;
    	captionArr[i].captionSizeX[1] = captionX + panelSize[0] + panelPadding;
    	captionArr[i].captionSizeY[0] = captionY - panelSize[1] - panelPadding;
    	captionArr[i].captionSizeY[1] = captionY + panelPadding;
		var panelHeight = captionArr[i].captionSizeY[1] - captionArr[i].captionSizeY[0];

    	// 前工程のキャプションと位置がかぶる場合にはY座標をずらす
    	if ( i > 0 ) {

    		// ずらしたY座標の位置を格納 [始点, 終点]
    		var realocatePositionY = [0, 0];
    		
    		// 前工程のキャプションとどれだけずらすか(px)
    		var shiftOffset = 10;
    		var prevCap = captionArr[i - 1];

    		// 前工程のキャプションパネルと描画位置がかぶっているかを判定する
    		if (isOverlapCaption(prevCap.captionSizeX, prevCap.captionSizeY,
    				captionArr[i].captionSizeX, captionArr[i].captionSizeY)) {
    			
    			// 前工程のキャプションパネルの上方向に表示する座標を算出する
    			realocatePositionY[0] = prevCap.captionSizeY[0] - panelHeight - shiftOffset;
    			realocatePositionY[1] = prevCap.captionSizeY[0] - shiftOffset;

    			// グラフから上にはみ出るかを判定する
    			if (root_y > realocatePositionY[0]) {

    				// グラフから上にはみ出る場合には前キャプションより下にシフトする
    				captionArr[i].captionSizeY[0] = prevCap.captionSizeY[1] + shiftOffset;
    				captionArr[i].captionSizeY[1] = captionArr[i].captionSizeY[0] + panelHeight;
    				captionArr[i].captionPosition[1] = captionArr[i].captionSizeY[0] + panelHeight - panelPadding;
    			} else {
    				// グラフから上にはみ出なければそのまま
    				captionArr[i].captionSizeY[0] = realocatePositionY[0];
    				captionArr[i].captionSizeY[1] = realocatePositionY[1];
    				captionArr[i].captionPosition[1] = realocatePositionY[1]  - panelPadding;
    			}
    		} else {
    			// グラフよりも上にはみ出るかを判定する
        		// リアロケートした結果かぶる場合もあるので考慮が必要
    			if (root_y > captionArr[i].captionSizeY[0]) {

            		// ずらしたY座標の位置を格納 [始点, 終点]
            		var realocatePositionY = [0, 0];

            		// 上にはみ出ないような座標を再設定
        			realocatePositionY[0] = root_y + shiftOffset;
        			realocatePositionY[1] = realocatePositionY[0] + panelHeight;

            		// 前工程のキャプションパネルと描画位置がかぶっているかを判定する
            		if (isOverlapCaption(prevCap.captionSizeX, prevCap.captionSizeY,
            				captionArr[i].captionSizeX, realocatePositionY)) {

        				// 前キャプションより下にシフトする
        				captionArr[i].captionSizeY[0] = prevCap.captionSizeY[1] + shiftOffset;
        				captionArr[i].captionSizeY[1] = captionArr[i].captionSizeY[0] + panelHeight;
        				captionArr[i].captionPosition[1] = captionArr[i].captionSizeY[0] + panelHeight - panelPadding;
            		} else {
            			// 単純にグラフから上にはみ出ない座標を設定する
            			captionArr[i].captionSizeY[0] = realocatePositionY[0];
        				captionArr[i].captionSizeY[1] = realocatePositionY[1];
        				captionArr[i].captionPosition[1] = realocatePositionY[1]  - panelPadding;
            		}
        			
    			}
    		}

    	} else {
    		// 初回も一応考慮が必要

    	}

    	// キャプションパネルとキャプションを描画する
    	drawCaptionSet(c, captionArr[i], fontWidth);
    }
}

/**
 * １工程のキャプションパネルとキャプションを描画する
 * 
 * @param c Canvasコンテキスト
 * @param captionInfo 工程毎キャプション情報
 * @param fontWidth キャプションのフォントサイズ
 */
function drawCaptionSet(c, captionInfo, fontWidth) {

	// キャプションパネルの影を描画
	var gradColorJson =
		[
		 {"ratio":0.3,	"rgb":[255, 255, 255]},
		 {"ratio":1,	"rgb":[96, 96, 96]},
		];
	var putPanelOption = {"shiftPoint": 4, "doWriteBorder":false, "transparent":0.5 };
	drawCaptionPanel(c, captionInfo, gradColorJson, putPanelOption);

	// キャプションパネルを描画
	rgbArr = captionInfo.color;
	var colorDecay = 255 / 2.0;
	gradColorJson =
		[
		 {"ratio":0.3,	"rgb":[255, 255, 255]},
		 {"ratio":1,	"rgb":[Math.round(rgbArr[0]+colorDecay), 
				 			   Math.round(rgbArr[1]+colorDecay), 
				 			   Math.round(rgbArr[2]+colorDecay)]},
		];
	drawCaptionPanel(c, captionInfo, gradColorJson);
	
	// キャプションを描画
	c.beginPath();
	c.font = fontWidth + "px 'Monospace'";
	c.strokeStyle = "rgb(0, 0, 0)";
	c.textAlign = "left";
	c.lineWidth = 0.5;
	c.strokeText(captionInfo.captionWorkPeriod, captionInfo.captionPosition[0], captionInfo.captionPosition[1]);
	c.strokeText(captionInfo.captionManHour, captionInfo.captionPosition[0], captionInfo.captionPosition[1] - 15);
	c.closePath();

}

/**
 * キャプションパネルを描画する。
 * キャプション文字や影の描画はここでは行わない。
 * 
 * @param c Canvasコンテキスト
 * @param captionInfo 工程毎キャプション情報
 * @param gradColorJson グラデーションの配色情報JSON
 * @param putPanelOption 描画オプション(任意)
 */
function drawCaptionPanel(c, captionInfo, gradColorJson, putPanelOption) {
	c.save();
//	alert("グラデーション範囲 : (" + panelPosition.captionSizeX[0] + ", " + panelPosition.captionSizeY[0] + ") 〜 (" +
//			panelPosition.captionSizeX[1] + ", " + panelPosition.captionSizeY[1] + ")\n");

	// キャプションパネル描画の原点を設定する（ずらしオプションがあれば反映する）
	var offset;
	if (putPanelOption == undefined || putPanelOption.shiftPoint == undefined) {
		offset = 0;
	} else {
		offset = putPanelOption.shiftPoint;
	}

	// 起点と終点の座標にオフセットを反映 (x, y) 
	rootPosision = [captionInfo.captionSizeX[0] + offset, 
	                captionInfo.captionSizeY[0] + offset];
	destPosition = [captionInfo.captionSizeX[1] + offset,
	                captionInfo.captionSizeY[1] + offset];

	// キャプションパネル描画
	c.beginPath();
	var grad  = c.createLinearGradient(rootPosision[0], rootPosision[1],
										destPosition[0], destPosition[1]);

    // オプションで透過が指定されていたら反映する
	if (putPanelOption != undefined && putPanelOption.transparent != undefined) {
		c.globalAlpha = putPanelOption.transparent;
	}
	c.fillStyle = setGradationColor(grad, gradColorJson);
	c.lineWidth = 1;
	c.strokeStyle = "rgb( 0, 0 , 0)";
	c.rect(rootPosision[0] , rootPosision[1],
			destPosition[0] - rootPosision[0], 
			destPosition[1] - rootPosision[1]);
	c.fill();
    // 境界線を描画する（オプションで非描画が指定されていなければ）
    if ( putPanelOption == undefined || putPanelOption.doWriteBorder ) {
    	c.stroke();
    }
	c.closePath();

	c.restore();
}

/**
 * ２つのキャプションパネルの描画位置がかぶっているかを判定する
 * 
 * @param prevCaptionX 前工程のキャプション位置(X座標)
 * @param prevCaptionY 前工程のキャプション位置(Y座標)
 * @param curCaptionX 今工程のキャプション位置(X座標)
 * @param curCaptionY 今工程のキャプション位置(Y座標)
 * @returns {Boolean} かぶっているか
 */
function isOverlapCaption(
		prevCaptionX, prevCaptionY, curCaptionX, curCaptionY) {

//	alert("前回 : (" + prevCaptionX[0] + ", " + prevCaptionY[0] + ") 〜 (" +
//			prevCaptionX[1] + ", " + prevCaptionY[1] + ")\n" +
//			"今回 : (" + curCaptionX[0] + ", " + curCaptionY[0] + ") 〜 (" +
//			curCaptionX[1] + ", " + curCaptionY[1] + ")\n");

	// X座標がかぶっていて、Y軸もかぶっているか
	return (prevCaptionX[1] > curCaptionX[0]
	
		// 前回の上辺〜底辺の間に今回のキャプションの上辺がある
		&& ((prevCaptionY[1] > curCaptionY[0] && prevCaptionY[0] < curCaptionY[0])
			// 前回の上辺〜底辺の間に今回のキャプションの低辺がある
			|| 
			(prevCaptionY[1] > curCaptionY[1] && prevCaptionY[0] < curCaptionY[1])
			||
			// 前行程のキャプションと同じ高さにある
			(prevCaptionY[1] == curCaptionY[1])));
}

/**
 * グラフに見積りデータを描画する
 * @param c Canvasコンテキスト
 * @param data 見積りデータJSON
 */
function drawEstimateData(c, data) {

	c.strokeStyle = "rgb(0, 0, 0)";
	var timeLine = 0;
	
	// 工程単位の処理をループ
    for (var h in data) {

    	// グリッドの色を設定
    	var rgbArr = data[h].gridColor;
    	var colorDecay = 0.6;
    	var gradColorJson =
    		[
    		 {"ratio":0,	"rgb":[255, 255, 255]},
    		 {"ratio":0.55,	"rgb":[rgbArr[0], rgbArr[1], rgbArr[2]]},
    		 {"ratio":0.9,	"rgb":[Math.round(rgbArr[0]*colorDecay), 
    				 			   Math.round(rgbArr[1]*colorDecay), 
    				 			   Math.round(rgbArr[2]*colorDecay)]},
    		];
    	
    	// タイムライン単位の処理をループ
    	for (var i in data[h].estimate) {
        	timeLine++;
        	var drawGridQuantityY = Math.ceil(data[h].estimate[i] / grid_unit);
              for (var j = drawGridQuantityY - 1 ; j >= 0 ; j--) {
            	var originationX = graph_root_x + ( GRID_WIDTH * (timeLine - 1)) ;
            	var originationY = graph_root_y - (GRID_HEIGHT * (drawGridQuantityY - j));

                /* グラデーション領域をセット */
                c.beginPath();
                var grad  = c.createLinearGradient(originationX, originationY,
                		originationX + GRID_WIDTH, originationY + GRID_HEIGHT);
                c.fillStyle = setGradationColor(grad, gradColorJson);
                c.rect(originationX, originationY, GRID_WIDTH, GRID_HEIGHT);
                c.fill();
                c.stroke();
            }
        }
    }
}

/**
 * グラデーションの配色情報JSON の内容をグラデーション情報インスタンスに反映する
 * 
 * @param grad グラデーション情報インスタンス
 * @param gradColorJson グラデーションの配色情報JSON
 */
function setGradationColor(grad, gradColorJson) {

	for (var i in gradColorJson) {
		grad.addColorStop(gradColorJson[i].ratio, "rgb(" +
				gradColorJson[i].rgb[0] + ", " +
				gradColorJson[i].rgb[1] + ", " +
				gradColorJson[i].rgb[2] + ")");
	}
	return grad;
}

/**
 * グラフのX軸/Y軸およグリッド線を描画
 * @param c Canvasコンテキスト
 */
function drawAxis(c) {

    // X軸とY軸を描画
    c.beginPath();
    c.moveTo(root_x, root_y);
    c.lineTo(graph_root_x, graph_root_y);
    c.stroke();
    
    c.moveTo(graph_root_x, graph_root_y);
    c.lineTo(graph_root_x + graph_x_length, graph_root_y);
    c.stroke();

    c.lineWidth = 0.5;
    c.strokeStyle = "rgb(0, 0, 0)";

    // グリッド(Y軸)を描画
	for (var i=1 ; i <= GRAPH_GRID_Y_NUM ; i++){
        c.beginPath();
        // グリッド１つ単位を灰(128,128,128)、５つ単位を黒(0,0,0)とする
        c.strokeStyle = (i % 5 == 0) ? "rgb(0, 0, 0)" : "rgb(128, 128, 128)";
	    c.moveTo(graph_root_x, graph_root_y - ( i * GRID_HEIGHT));
	    c.lineTo(graph_root_x + graph_x_length, graph_root_y - ( i * GRID_HEIGHT));
	    c.stroke();
    }

    // グリッド(X軸)を描画
    for (var i=1 ; i <= GRAPH_GRID_X_NUM ; i++){
        c.beginPath();
        // １ヶ月を４週として週を灰(128,128,128)、月を黒(0,0,0)とする
        c.strokeStyle = (i % 4 == 0) ? "rgb(0, 0, 0)" : "rgb(128, 128, 128)";
        // １ヶ月ごとに太線を区切る
        var originationY = (i % 4 == 0) ? GRID_HEIGHT + graph_root_y : graph_root_y;
        // グラフ上の Y=0 から上に向かって線を引く
	    c.moveTo(graph_root_x + ( i * GRID_WIDTH), originationY);
	    c.lineTo(graph_root_x + ( i * GRID_WIDTH), graph_root_y - graph_y_length);
	    c.stroke();
    }
}

/**
 * X軸/Y軸のスケール（X軸:月数, Y軸:工数）を描画
 * @param c Canvasコンテキスト
 */
function drawScale(c) {

	/*
	 * X軸のスケール（月数）を描画
	 */
	c.font = "16px 'Monospace'";
	c.textAlign = "center";
	c.strokeStyle = "rgb(0, 0, 0)";
    for (var i=0 ; i <= GRAPH_GRID_X_NUM ; i += 4){
    	c.beginPath();
    	var monthNomber = (i / 4) + 1;
    	var monthText = monthNomber + "ヶ月";

    	// 表示月以上の月数は表示しない
    	if (monthNomber > (GRAPH_GRID_X_NUM / 4)) {
    		break;
    	}

    	c.strokeText(monthText, 
    		Math.round((GRID_WIDTH * 4) / 2) + (monthNomber - 1) * (GRID_WIDTH * 4) + graph_root_x ,
    		graph_root_y + 18);

    	// グラフ上の Y=0 から下に線を引く
    	c.moveTo(graph_root_x + ( i * GRID_WIDTH), graph_root_y);
    	c.lineTo(graph_root_x + ( i * GRID_WIDTH), GRID_HEIGHT + graph_root_y);
    	c.stroke();
	}

    /*
     * Y軸のスケール（工数）を描画
     */
	var cvScale = document.querySelector('#cv_scale');
	var cScale = cvScale.getContext('2d');
	cScale.clearRect(0, 0, cvScale.width, cvScale.height);
	
	cScale.font = "14px 'Monospace'";
	cScale.textAlign = "right";
	cScale.lineWidth = 0.5;

	// グラフ目盛りを描画
	for (var i=0 ; i <= GRAPH_GRID_Y_NUM ; i += 5){
		cScale.beginPath();
		var ManHourText = (grid_unit * i) + "人月";
		cScale.strokeText(ManHourText, graph_root_x + scale_width - 3, 
			graph_root_y - ( i * GRID_HEIGHT) + 5);
		cScale.closePath();
	}
}

/**
 * 期間線を描画する
 * @param c Canvasコンテキスト
 * @param period 月数
 * @param rgbArr [R,G,B]形式の配列で表現した線の色
 * @param lengthOffset 期間線の長さオフセット(＋値:長く、ー値:短く)
 * @param caption 期間線の名前
 */
function drawTermLine(c, period, rgbArr, lengthOffset, caption) {
	c.save();
	
	// 「▼」の高さ
	var turnTriHeight = GRID_HEIGHT - 5;

	// 線のルート(「▼」の左上の原点)
	var lineRootX = graph_root_x + (period * GRID_WIDTH * 4) - GRID_WIDTH/2;
	var lineRootY = graph_root_y - graph_y_length - turnTriHeight - lengthOffset;
	
	// 期間線の影を描画
	var shadowRgbArr = [96, 96, 96];
	var colorDecay = 0.8;
	var gradColorJson =
		[
		 {"ratio":0,	"rgb":[255, 255, 255]},
		 {"ratio":0.2,	"rgb":[shadowRgbArr[0], shadowRgbArr[1], shadowRgbArr[2]]},
		 {"ratio":1,	"rgb":[Math.round(shadowRgbArr[0]*colorDecay), 
		              	       Math.round(shadowRgbArr[1]*colorDecay), 
		              	       Math.round(shadowRgbArr[2]*colorDecay)]}
		];
	var putLineOptionJson = {"shiftPoint": 4, "doWriteBorder":false, "transparent":0.5 };
	putPartOfTermLine(c, [lineRootX, lineRootY],
			gradColorJson, turnTriHeight, putLineOptionJson);

	// 期間線の本体を描画
	colorDecay = 1.5;
	gradColorJson =
		[
		 {"ratio":0,	"rgb":[255, 255, 255]},
		 {"ratio":0.1,	"rgb":[Math.round(rgbArr[0]*colorDecay), 
		              	       Math.round(rgbArr[1]*colorDecay), 
		              	       Math.round(rgbArr[2]*colorDecay)]},
		 {"ratio":0.9,	"rgb":[rgbArr[0], rgbArr[1], rgbArr[2]]}
		];
	putPartOfTermLine(c, [lineRootX, lineRootY], gradColorJson, turnTriHeight);
	
	// キャプションを描画
	c.font = "15px 'Monospace'";
	c.strokeStyle = "rgb(" + rgbArr[0] + ", " + rgbArr[1] + ", " + rgbArr[2] + ")";
	c.textAlign = "left";
	c.lineWidth = 1;
	c.beginPath();
	c.strokeText(caption, lineRootX + GRID_WIDTH + 5, lineRootY + turnTriHeight - 3);
	c.closePath();

	c.restore();
}

/**
 * 期間線を描画する。
 * 図形描画と塗りつぶしのみで、影の設定は行わない。
 * 
 * @param c Canvasコンテキスト
 * @param {Array.<number>} lineRoot 線のルート(「▼」の左上の原点)の[x, y]形式の配列
 * @param gradColorJson グラデーションの配色情報JSON
 * @param turnTriHeight 「▼」の高さ
 * @param option 描画オプション(任意)
 */
function putPartOfTermLine(c, lineRoot, gradColorJson, turnTriHeight, option) {
	c.save();
	
	// 線描画の原点を設定する（ずらしオプションがあれば反映する）
	var lineRootX,lineRootY;
	if (option == undefined || option.shiftPoint == undefined) {
		lineRootX = lineRoot[0];
		lineRootY = lineRoot[1];
	} else {
		lineRootX = lineRoot[0] + option.shiftPoint;
		lineRootY = lineRoot[1] + option.shiftPoint;
	}
	
	// 「▼」の高さ
	var turnTriHeight = GRID_HEIGHT - 5;

	// 「▼」から「｜」の長さを省いた方辺の長さ
	var lineWidth = 4;
	var withoutLineWidthHalf = (GRID_WIDTH - lineWidth) / 2;
	
	// 線の描画(ルート, →, ↓←, ↓, ←, ↑, ←↑の順)
    c.lineWidth = 2;
	c.beginPath();
    c.moveTo(lineRootX, lineRootY);
    c.lineTo(lineRootX + GRID_WIDTH, lineRootY);
    c.lineTo(lineRootX + GRID_WIDTH - withoutLineWidthHalf, lineRootY + turnTriHeight);
    c.lineTo(lineRootX + GRID_WIDTH - withoutLineWidthHalf, graph_root_y);
    c.lineTo(lineRootX + withoutLineWidthHalf, graph_root_y);
    c.lineTo(lineRootX + withoutLineWidthHalf, lineRootY + turnTriHeight);
    c.lineTo(lineRootX, lineRootY);

    // オプションで透過が指定されていたら反映する
	if (option != undefined && option.transparent != undefined) {
		c.globalAlpha = option.transparent;
	}
    // 境界線を描画する（オプションで非描画が指定されていなければ）
    if ( option == undefined || option.doWriteBorder ) {
        c.stroke();
    }
    // グラデーションで塗りつぶす
    var grad  = c.createLinearGradient(lineRootX, lineRootY,
    		lineRootX + GRID_WIDTH * 2, graph_root_y);
    c.fillStyle = setGradationColor(grad, gradColorJson);
    c.fill();
	c.closePath();

	c.restore();
}
