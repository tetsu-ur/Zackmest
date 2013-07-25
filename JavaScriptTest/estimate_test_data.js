
// テストデータ workPeriod, manHourProcess, manHourMonth は未使用
// lines はいらないかも（グラフ長は標準工期などの長い方で算出するようになったため）
var estimateDataJson = 
		{
		 "dataSize": 10,
		 "maxPeriod": 8.39,
		 "estimateValue":
			 [{
				"patternId" : "1111",
				"earliestWorkPeriodSlim": 8.39,	// 最短開発期間（月）SLIM
				"standardWorkPeriodJuas": 7.7,	// 標準工期（月）JUAS
				"maxPeriod": 8.39,				// グラフの最大期間（月）
				"maxManHourMonth": 7.7,			// グラフ内で最大の人月
				"graphData":
					[{
						"workPeriod": 1.1,		// 工期
						"manHourProcess": 3.2, 	// 工数（工程）
						"manHourMonth": 2.9, 		// 工数（月あたり）
						"gridColor": [255, 64, 64],
						"lines": 4,
						"estimate":[ 3, 3, 3, 3]
					},
					{
						"workPeriod": 1.5,
						"manHourProcess": 8.6, 
						"manHourMonth": 5.7, 
						"gridColor": [255, 255, 64],
						"lines": 6,
						"estimate":[ 6, 6, 6, 6, 6, 6]
					},
					{
						"workPeriod": 1.8,
						"manHourProcess": 13.8, 
						"manHourMonth": 7.7, 
						"gridColor": [64, 255, 64],
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
			},
			{
				"patternId" : "1110",
				"earliestWorkPeriodSlim": 8.39,	// 最短開発期間（月）SLIM
				"standardWorkPeriodJuas": 7.7,	// 標準工期（月）JUAS
				"maxPeriod": 8.39,				// グラフの最大期間（月）
				"maxManHourMonth": 7.7,			// グラフ内で最大の人月
				"graphData":
					[{
						"workPeriod": 1.1,		// 工期
						"manHourProcess": 3.2, 	// 工数（工程）
						"manHourMonth": 2.9, 		// 工数（月あたり）
						"gridColor": [255, 64, 64],
						"lines": 4,
						"estimate":[ 3, 3, 3, 3]
					},
					{
						"workPeriod": 1.5,
						"manHourProcess": 8.6, 
						"manHourMonth": 5.7, 
						"gridColor": [255, 255, 64],
						"lines": 6,
						"estimate":[ 6, 6, 6, 6, 6, 6]
					},
					{
						"workPeriod": 1.8,
						"manHourProcess": 13.8, 
						"manHourMonth": 7.7, 
						"gridColor": [64, 255, 64],
						"lines": 7,
						"estimate":[ 8, 8, 8, 8, 8, 8, 8]
					}]
			},
			{
				"patternId" : "1100",
				"earliestWorkPeriodSlim": 8.39,	// 最短開発期間（月）SLIM
				"standardWorkPeriodJuas": 7.7,	// 標準工期（月）JUAS
				"maxPeriod": 8.39,				// グラフの最大期間（月）
				"maxManHourMonth": 7.7,			// グラフ内で最大の人月
				"graphData":
					[{
						"workPeriod": 1.1,		// 工期
						"manHourProcess": 3.2, 	// 工数（工程）
						"manHourMonth": 2.9, 		// 工数（月あたり）
						"gridColor": [255, 64, 64],
						"lines": 4,
						"estimate":[ 3, 3, 3, 3]
					},
					{
						"workPeriod": 1.5,
						"manHourProcess": 8.6, 
						"manHourMonth": 5.7, 
						"gridColor": [255, 255, 64],
						"lines": 6,
						"estimate":[ 6, 6, 6, 6, 6, 6]
					}]
			},
			{
				"patternId" : "1000",
				"earliestWorkPeriodSlim": 8.39,	// 最短開発期間（月）SLIM
				"standardWorkPeriodJuas": 7.7,	// 標準工期（月）JUAS
				"maxPeriod": 8.39,				// グラフの最大期間（月）
				"maxManHourMonth": 7.7,			// グラフ内で最大の人月
				"graphData":
					[{
						"workPeriod": 1.1,		// 工期
						"manHourProcess": 3.2, 	// 工数（工程）
						"manHourMonth": 2.9, 		// 工数（月あたり）
						"gridColor": [255, 64, 64],
						"lines": 4,
						"estimate":[ 3, 3, 3, 3]
					}]
			},
			{
				"patternId" : "0111",
				"earliestWorkPeriodSlim": 5.39,	// 最短開発期間（月）SLIM
				"standardWorkPeriodJuas": 4.7,	// 標準工期（月）JUAS
				"maxPeriod": 8.39,				// グラフの最大期間（月）
				"maxManHourMonth": 7.7,			// グラフ内で最大の人月
				"graphData":
					[{
						"workPeriod": 1.9,
						"manHourProcess": 9.5, 
						"manHourMonth": 5.1, 
						"gridColor": [255, 255, 64],
						"lines": 8,
						"estimate":[ 5, 5, 5, 5, 5, 5, 5, 5 ]
					},
					{
						"workPeriod": 2.2,
						"manHourProcess": 15.2, 
						"manHourMonth": 7.0, 
						"gridColor": [64, 255, 64],
						"lines": 8,
						"estimate":[ 7, 7, 7, 7, 7, 7, 7, 7]
					},
					{
						"workPeriod": 2.0,
						"manHourProcess": 8.6, 
						"manHourMonth": 4.4, 
						"gridColor": [96, 96, 255],
						"lines": 8,
						"estimate":[ 4, 4, 4, 4, 4, 4, 4, 4]
					}]
			},
			{
				"patternId" : "0110",
				"earliestWorkPeriodSlim": 8.39,	// 最短開発期間（月）SLIM
				"standardWorkPeriodJuas": 7.7,	// 標準工期（月）JUAS
				"maxPeriod": 8.39,				// グラフの最大期間（月）
				"maxManHourMonth": 7.7,			// グラフ内で最大の人月
				"graphData":
					[{
						"workPeriod": 1.5,
						"manHourProcess": 8.6, 
						"manHourMonth": 5.7, 
						"gridColor": [255, 255, 64],
						"lines": 6,
						"estimate":[ 6, 6, 6, 6, 6, 6]
					},
					{
						"workPeriod": 1.8,
						"manHourProcess": 13.8, 
						"manHourMonth": 7.7, 
						"gridColor": [64, 255, 64],
						"lines": 7,
						"estimate":[ 8, 8, 8, 8, 8, 8, 8]
					}]
			},
			{
				"patternId" : "0100",
				"earliestWorkPeriodSlim": 8.39,	// 最短開発期間（月）SLIM
				"standardWorkPeriodJuas": 7.7,	// 標準工期（月）JUAS
				"maxPeriod": 8.39,				// グラフの最大期間（月）
				"maxManHourMonth": 7.7,			// グラフ内で最大の人月
				"graphData":
					[{
						"workPeriod": 1.5,
						"manHourProcess": 8.6, 
						"manHourMonth": 5.7, 
						"gridColor": [255, 255, 64],
						"lines": 6,
						"estimate":[ 6, 6, 6, 6, 6, 6]
					}]
			},
			{
				"patternId" : "0011",
				"earliestWorkPeriodSlim": 8.39,	// 最短開発期間（月）SLIM
				"standardWorkPeriodJuas": 7.7,	// 標準工期（月）JUAS
				"maxPeriod": 8.39,				// グラフの最大期間（月）
				"maxManHourMonth": 7.7,			// グラフ内で最大の人月
				"graphData":
					[{
						"workPeriod": 1.8,
						"manHourProcess": 13.8, 
						"manHourMonth": 7.7, 
						"gridColor": [64, 255, 64],
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
			},
			{
				"patternId" : "0010",
				"earliestWorkPeriodSlim": 8.39,	// 最短開発期間（月）SLIM
				"standardWorkPeriodJuas": 7.7,	// 標準工期（月）JUAS
				"maxPeriod": 8.39,				// グラフの最大期間（月）
				"maxManHourMonth": 7.7,			// グラフ内で最大の人月
				"graphData":
					[{
						"workPeriod": 1.8,
						"manHourProcess": 13.8, 
						"manHourMonth": 7.7, 
						"gridColor": [64, 255, 64],
						"lines": 7,
						"estimate":[ 8, 8, 8, 8, 8, 8, 8]
					}]
			},
			{
				"patternId" : "0001",
				"earliestWorkPeriodSlim": 8.39,	// 最短開発期間（月）SLIM
				"standardWorkPeriodJuas": 7.7,	// 標準工期（月）JUAS
				"maxPeriod": 8.39,				// グラフの最大期間（月）
				"maxManHourMonth": 7.7,			// グラフ内で最大の人月
				"graphData":
					[{
						"workPeriod": 1.6,
						"manHourProcess": 7.8, 
						"manHourMonth": 4.9, 
						"gridColor": [96, 96, 255],
						"lines": 6,
						"estimate":[ 5, 5, 5, 5, 5]
					}]
			}]
		};


/**
 * テストデータ
 * ９ヶ月分, キャプション表示位置確認, 最大期間によるグラフ幅確認
 */
/*
var estimateDataJson = 
		{
		 "dataSize": 10,
		 "maxPeriod": 8.39,
		 "estimateValue":
			 [{
				"patternId" : "1111",
				"earliestWorkPeriodSlim": 8.39,	// 最短開発期間（月）SLIM
				"standardWorkPeriodJuas": 7.7,	// 標準工期（月）JUAS
				"maxPeriod": 8.39,				// グラフの最大期間（月）
				"maxManHourMonth": 7.7,			// グラフ内で最大の人月
				"graphData":
					[{
						"workPeriod": 1.1,		// 工期
						"manHourProcess": 3.2, 	// 工数（工程）
						"manHourMonth": 2.9, 		// 工数（月あたり）
						"gridColor": [255, 64, 64],
						"lines": 4,
						"estimate":[ 3, 3, 3, 3]
					},
					{
						"workPeriod": 1.5,
						"manHourProcess": 8.6, 
						"manHourMonth": 5.7, 
						"gridColor": [255, 255, 64],
						"lines": 6,
						"estimate":[ 6, 6, 6, 6, 6, 6]
					},
					{
						"workPeriod": 1.8,
						"manHourProcess": 13.8, 
						"manHourMonth": 7.7, 
						"gridColor": [64, 255, 64],
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
			},
			{
				"patternId" : "1110",
				"earliestWorkPeriodSlim": 8.39,	// 最短開発期間（月）SLIM
				"standardWorkPeriodJuas": 7.7,	// 標準工期（月）JUAS
				"maxPeriod": 8.39,				// グラフの最大期間（月）
				"maxManHourMonth": 7.7,			// グラフ内で最大の人月
				"graphData":
					[{
						"workPeriod": 1.1,		// 工期
						"manHourProcess": 3.2, 	// 工数（工程）
						"manHourMonth": 2.9, 		// 工数（月あたり）
						"gridColor": [255, 64, 64],
						"lines": 4,
						"estimate":[ 3, 3, 3, 3]
					},
					{
						"workPeriod": 1.5,
						"manHourProcess": 8.6, 
						"manHourMonth": 5.7, 
						"gridColor": [255, 255, 64],
						"lines": 6,
						"estimate":[ 6, 6, 6, 6, 6, 6]
					},
					{
						"workPeriod": 1.8,
						"manHourProcess": 13.8, 
						"manHourMonth": 7.7, 
						"gridColor": [64, 255, 64],
						"lines": 7,
						"estimate":[ 8, 8, 8, 8, 8, 8, 8]
					}]
			},
			{
				"patternId" : "1100",
				"earliestWorkPeriodSlim": 8.39,	// 最短開発期間（月）SLIM
				"standardWorkPeriodJuas": 7.7,	// 標準工期（月）JUAS
				"maxPeriod": 8.39,				// グラフの最大期間（月）
				"maxManHourMonth": 7.7,			// グラフ内で最大の人月
				"graphData":
					[{
						"workPeriod": 1.1,		// 工期
						"manHourProcess": 3.2, 	// 工数（工程）
						"manHourMonth": 2.9, 		// 工数（月あたり）
						"gridColor": [255, 64, 64],
						"lines": 4,
						"estimate":[ 3, 3, 3, 3]
					},
					{
						"workPeriod": 1.5,
						"manHourProcess": 8.6, 
						"manHourMonth": 5.7, 
						"gridColor": [255, 255, 64],
						"lines": 6,
						"estimate":[ 6, 6, 6, 6, 6, 6]
					}]
			},
			{
				"patternId" : "1000",
				"earliestWorkPeriodSlim": 8.39,	// 最短開発期間（月）SLIM
				"standardWorkPeriodJuas": 7.7,	// 標準工期（月）JUAS
				"maxPeriod": 8.39,				// グラフの最大期間（月）
				"maxManHourMonth": 7.7,			// グラフ内で最大の人月
				"graphData":
					[{
						"workPeriod": 1.1,		// 工期
						"manHourProcess": 3.2, 	// 工数（工程）
						"manHourMonth": 2.9, 		// 工数（月あたり）
						"gridColor": [255, 64, 64],
						"lines": 4,
						"estimate":[ 3, 3, 3, 3]
					}]
			},
			{
				"patternId" : "0111",
				"earliestWorkPeriodSlim": 5.39,	// 最短開発期間（月）SLIM
				"standardWorkPeriodJuas": 4.7,	// 標準工期（月）JUAS
				"maxPeriod": 8.39,				// グラフの最大期間（月）
				"maxManHourMonth": 7.7,			// グラフ内で最大の人月
				"graphData":
					[{
						"workPeriod": 1.9,
						"manHourProcess": 9.5, 
						"manHourMonth": 5.1, 
						"gridColor": [255, 255, 64],
						"lines": 8,
						"estimate":[ 5, 5, 5, 5, 5, 5, 5, 5 ]
					},
					{
						"workPeriod": 2.2,
						"manHourProcess": 15.2, 
						"manHourMonth": 7.0, 
						"gridColor": [64, 255, 64],
						"lines": 8,
						"estimate":[ 7, 7, 7, 7, 7, 7, 7, 7]
					},
					{
						"workPeriod": 2.0,
						"manHourProcess": 8.6, 
						"manHourMonth": 4.4, 
						"gridColor": [96, 96, 255],
						"lines": 8,
						"estimate":[ 4, 4, 4, 4, 4, 4, 4, 4]
					}]
			},
			{
				"patternId" : "0110",
				"earliestWorkPeriodSlim": 8.39,	// 最短開発期間（月）SLIM
				"standardWorkPeriodJuas": 7.7,	// 標準工期（月）JUAS
				"maxPeriod": 8.39,				// グラフの最大期間（月）
				"maxManHourMonth": 7.7,			// グラフ内で最大の人月
				"graphData":
					[{
						"workPeriod": 1.5,
						"manHourProcess": 8.6, 
						"manHourMonth": 5.7, 
						"gridColor": [255, 255, 64],
						"lines": 6,
						"estimate":[ 6, 6, 6, 6, 6, 6]
					},
					{
						"workPeriod": 1.8,
						"manHourProcess": 13.8, 
						"manHourMonth": 7.7, 
						"gridColor": [64, 255, 64],
						"lines": 7,
						"estimate":[ 8, 8, 8, 8, 8, 8, 8]
					}]
			},
			{
				"patternId" : "0100",
				"earliestWorkPeriodSlim": 8.39,	// 最短開発期間（月）SLIM
				"standardWorkPeriodJuas": 7.7,	// 標準工期（月）JUAS
				"maxPeriod": 8.39,				// グラフの最大期間（月）
				"maxManHourMonth": 7.7,			// グラフ内で最大の人月
				"graphData":
					[{
						"workPeriod": 1.5,
						"manHourProcess": 8.6, 
						"manHourMonth": 5.7, 
						"gridColor": [255, 255, 64],
						"lines": 6,
						"estimate":[ 6, 6, 6, 6, 6, 6]
					}]
			},
			{
				"patternId" : "0011",
				"earliestWorkPeriodSlim": 8.39,	// 最短開発期間（月）SLIM
				"standardWorkPeriodJuas": 7.7,	// 標準工期（月）JUAS
				"maxPeriod": 8.39,				// グラフの最大期間（月）
				"maxManHourMonth": 7.7,			// グラフ内で最大の人月
				"graphData":
					[{
						"workPeriod": 1.8,
						"manHourProcess": 13.8, 
						"manHourMonth": 7.7, 
						"gridColor": [64, 255, 64],
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
			},
			{
				"patternId" : "0010",
				"earliestWorkPeriodSlim": 8.39,	// 最短開発期間（月）SLIM
				"standardWorkPeriodJuas": 7.7,	// 標準工期（月）JUAS
				"maxPeriod": 8.39,				// グラフの最大期間（月）
				"maxManHourMonth": 7.7,			// グラフ内で最大の人月
				"graphData":
					[{
						"workPeriod": 1.8,
						"manHourProcess": 13.8, 
						"manHourMonth": 7.7, 
						"gridColor": [64, 255, 64],
						"lines": 7,
						"estimate":[ 8, 8, 8, 8, 8, 8, 8]
					}]
			},
			{
				"patternId" : "0001",
				"earliestWorkPeriodSlim": 8.39,	// 最短開発期間（月）SLIM
				"standardWorkPeriodJuas": 7.7,	// 標準工期（月）JUAS
				"maxPeriod": 8.39,				// グラフの最大期間（月）
				"maxManHourMonth": 7.7,			// グラフ内で最大の人月
				"graphData":
					[{
						"workPeriod": 1.6,
						"manHourProcess": 7.8, 
						"manHourMonth": 4.9, 
						"gridColor": [96, 96, 255],
						"lines": 6,
						"estimate":[ 5, 5, 5, 5, 5]
					}]
			}]
		};
*/