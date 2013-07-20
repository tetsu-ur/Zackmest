/**
 * 
 */
/* 原点 */
var root_x = 1;
var root_y = 30;
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

window.addEventListener('DOMContentLoaded',
  function() {
    // Canvas APIが利用できるかを判定（1）
    if (HTMLCanvasElement) {
      // コンテキストオブジェクトを取得（2）
      var cv = document.querySelector('#cv');
      var c = cv.getContext('2d');

      // テストデータ workPeriod, manHourProcess, manHourMonth は未使用
      // lines はいらないかも（グラフ長は標準工期などの長い方で算出するようになったため）
      var data = 
    	  {
//    		  "earliestWorkPeriodSlim": 8.39,	// 最短開発期間（月）SLIM
    		  "earliestWorkPeriodSlim": 8.25,	// 最短開発期間（月）SLIM
    	   	  "standardWorkPeriodJuas": 7.7,	// 標準工期（月）JUAS
    		  "maxPeriod": 8.39,				// グラフの最大期間（月）
    	   	  "maxManHourMonth": 7.7,			// グラフ内で最大の人月
    	   	  "graphData":
	     	  [{
	    		  "workPeriod": 1.1,		// 工期
	    		  "manHourProcess": 3.2, 	// 工数（工程）
	    		  "manHourMonth": 2.9, 		// 工数（月あたり）
	    		  "gridColor": [255, 0, 0],
	    		  "lines": 4,
	    		  "estimate":[ 3, 3, 3, 3]
	    	  },
	    	  {
	    		  "workPeriod": 1.5,
	    		  "manHourProcess": 8.6, 
	    		  "manHourMonth": 5.7, 
	    		  "gridColor": [255, 255, 0],
	    		  "lines": 6,
	    		  "estimate":[ 6, 6, 6, 6, 6, 6]
	    	  },
	    	  {
	    		  "workPeriod": 1.8,
	    		  "manHourProcess": 13.8, 
	    		  "manHourMonth": 7.7, 
	    		  "gridColor": [0, 255, 0],
	    		  "lines": 7,
	    		  "estimate":[ 8, 8, 8, 8, 8, 8, 8]
	    	  },
		      {
	    		  "workPeriod": 1.6,
	    		  "manHourProcess": 7.8, 
	    		  "manHourMonth": 4.9, 
	       		  "gridColor": [96, 96, 255],
	       		  "lines": 6,
	       		  "estimate":[ 5, 5, 5, 5, 5]
	    	  }]
    	  };

      // グラフ対象データ数を取得する。値は４の倍数になるよう繰り上げる。
      GRAPH_GRID_X_NUM = Math.ceil(data.maxPeriod * 4);
      GRAPH_GRID_X_NUM += 4 - (GRAPH_GRID_X_NUM % 4);

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
      	drawTermLine(c, data.earliestWorkPeriodSlim, [255, 128, 0]);

      	// 標準工期を描画
      	drawTermLine(c, data.standardWorkPeriodJuas, [255, 0, 0]);

    }
  }
);

/**
 * グラフにデータを描画する
 * @param c Canvasコンテキスト
 * @param data 見積りデータJSON
 */
function drawEstimateData(c, data) {

	c.strokeStyle = "rgb(0, 0, 0)";
	var timeLine = 0;
	
    for (var h in data) {

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
 * 
 * @param grad
 * @param gradColorJson 
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
	cScale.font = "14px 'Monospace'";
	cScale.textAlign = "right";
	cScale.lineWidth = 0.5;

	// グラフ目盛りを描画
	for (var i=5 ; i <= GRAPH_GRID_Y_NUM ; i += 5){
		cScale.beginPath();
		var ManHourText = (grid_unit * i) + "人月";
		cScale.strokeText(ManHourText, graph_root_x + scale_width - 3, 
			graph_root_y - ( i * GRID_HEIGHT) + 5);
		cScale.closePath();
	}
}

/**
 * 
 * @param c
 * @param period
 * @param rgbArr
 */
function drawTermLine(c, period, rgbArr) {

	// 「▼」の高さ
	var turnTriHeight = GRID_HEIGHT - 5;

	// 線のルート(「▼」の左上の原点)
	var lineRootX = graph_root_x + (period * GRID_WIDTH * 4) - GRID_WIDTH/2;
	var lineRootY = graph_root_y - graph_y_length - turnTriHeight;

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
    c.stroke();

	var colorDecay = 1.5;
	var gradColorJson =
		[
		 {"ratio":0,		"rgb":[255, 255, 255]},
		 {"ratio":0.1,		"rgb":[Math.round(rgbArr[0]*colorDecay), 
		              		       Math.round(rgbArr[1]*colorDecay), 
		              		       Math.round(rgbArr[2]*colorDecay)]},
		 {"ratio":0.9,	"rgb":[rgbArr[0], rgbArr[1], rgbArr[2]]},
		];
    var grad  = c.createLinearGradient(lineRootX, lineRootY,
    		lineRootX + GRID_WIDTH * 2, graph_root_y);
    c.fillStyle = setGradationColor(grad, gradColorJson);
    c.fill();
	c.closePath();
}
