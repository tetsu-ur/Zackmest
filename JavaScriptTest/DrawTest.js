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
    		  "earliestWorkPeriodSlim": 8.39,	// 最短開発期間（月）SLIM
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
      GRAPH_GRID_X_NUM = 0;
//      for (var i in data.graphData) {
//    	  GRAPH_GRID_X_NUM += data.graphData[i].lines;
//      }
//      GRAPH_GRID_X_NUM += 4 - (GRAPH_GRID_X_NUM % 4);
      GRAPH_GRID_X_NUM = Math.ceil(data.maxPeriod * 4);
      GRAPH_GRID_X_NUM += 4 - (GRAPH_GRID_X_NUM % 4);

      // パスの開始（1）
      c.beginPath();
      // グラフのX軸とY軸を描画
      c.moveTo(root_x, root_y);
      graph_root_x = root_x;
      graph_root_y = root_y + (GRID_HEIGHT * GRAPH_GRID_Y_NUM );
      graph_y_length = graph_root_y - root_y;
      c.lineTo(graph_root_x, graph_root_y);
      c.stroke();
      c.beginPath();
      
      c.moveTo(graph_root_x, graph_root_y);
      graph_x_length = (GRID_WIDTH * GRAPH_GRID_X_NUM);
      c.lineTo(graph_root_x + graph_x_length, graph_root_y);
      c.stroke();

      c.lineWidth = 0.5;
      c.strokeStyle = "rgb(0, 0, 0)";
      c.save();

      // グラフ目盛り領域の描画
      var cvScale = document.querySelector('#cv_scale');
      var cScale = cvScale.getContext('2d');
      cScale.font = "14px 'Monospace'";
      cScale.textAlign = "right";
      cScale.lineWidth = 0.5;
      
      // Y軸の１グリッドの人月数を算出(基本は１)
      grid_unit = 1;
      // Y軸のグリッド個数を超えていたら１グリッドあたりの人月を増やす
      if ( data.maxManHourMonth > GRAPH_GRID_Y_NUM ) {
          grid_unit = Math.ceil(data.maxManHourMonth / GRAPH_GRID_Y_NUM );
      }
      // グラフ目盛りを描画
      for (var i=5 ; i <= GRAPH_GRID_Y_NUM ; i += 5){
    	  cScale.beginPath();
	      var ManHourText = (grid_unit * i) + "人月";
	      cScale.strokeText(ManHourText, graph_root_x + scale_width - 3, 
	    		  graph_root_y - ( i * GRID_HEIGHT) + 5);
	      cScale.closePath();
      }
      
      
      
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

      // 月数を描画
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
      
      drawQuaterMonth(c, data.graphData);
    }
  }
);

/* グラフを描画する */
function drawQuaterMonth(c, data) {

	c.strokeStyle = "rgb(0, 0, 0)";
	var timeLine = 0;
	
    for (var h in data) {

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
                grad.addColorStop(0, "rgb(255, 255, 255)");
                grad.addColorStop(0.55,
                		"rgb(" + data[h].gridColor[0] + "," + data[h].gridColor[1] + "," + data[h].gridColor[2] + ")" );
                grad.addColorStop(0.9,
                		"rgb(" + Math.round(data[h].gridColor[0] * 0.6) + "," + Math.round(data[h].gridColor[1]  * 0.6) + "," + Math.round(data[h].gridColor[2]  * 0.6) + ")" );
                c.fillStyle = grad;

                c.rect(originationX, originationY, GRID_WIDTH, GRID_HEIGHT);
                c.fill();
                c.stroke();
            }
        }
    }
}
