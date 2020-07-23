// 数据格式,数据中只需要包含以下字段和数据格式,开发者可以添加字段,比如id等等,不影响组件显示,
// 组件的返回结果是有菜单数组下标形式返回,
// 如果传入数据中有value,也会返回value,开发者可根据返回的下标获取所选中的菜单
export default [
	{
		"type": 'hierarchy',
		"submenu":[
			{
				"name":'全部',
				"value":''
			}
		]
	},
	{
		// name:'综合排序',
		"type": 'hierarchy',
		"submenu": [{
				"name": "综合排序",
				"value": ""
			},
			{
				"name": "价格由低到高",
				"value": "price_asc"
			},
			{
				"name": "保证金由低到高",
				"value": "promise_price_asc"
			},
			{
				"name": "总时间由低到高",
				"value": "duration_asc"
			}
		]
	},
	{
		// name:'筛选',
		"type": 'radio',
		"submenu": [{
				"name": "价格",
				"submenu": [{
						"name": "不限",
						"value": "",
						"max": '',
						"min": ''
					},
					{
						"name": "1-50元",
						"value": "1,50",
						"max": 50,
						"min": 1
					},
					{
						"name": "51-100元",
						"value": "51,100",
						"max": 100,
						"min": 51
					},
					{
						"name": "100元-300元",
						"value": "100,300",
						"max": 300,
						"min": 100
					},
					{
						"name": "301-500元",
						"value": "301,500",
						"max": 500,
						"min": 301
					},
					{
						"name": "500元以上",
						"value": "500,''",
						"max": '',
						"min": 500
					}
				]
			},
			{
				"name": "初始段位",
				"submenu": [{
						"name": "不限",
						"value": ""
					},
					{
						"name": "青铜",
						"value": "青铜"
					},
					{
						"name": "白银",
						"value": "白银"
					},
					{
						"name": "黄金",
						"value": "黄金"
					},
					{
						"name": "铂金",
						"value": "铂金"
					},
					{
						"name": "钻石",
						"value": "钻石"
					},
					{
						"name": "星耀",
						"value": "星耀"
					},
					{
						"name": "最强王者",
						"value": "最强王者"
					},
					{
						"name": "荣耀王者",
						"value": "荣耀王者"
					}
				]
			},
			{
				"name": "目标段位",
				"submenu": [{
						"name": "不限",
						"value": ""
					},
					{
						"name": "青铜",
						"value": "青铜"
					},
					{
						"name": "白银",
						"value": "白银"
					},
					{
						"name": "黄金",
						"value": "黄金"
					},
					{
						"name": "铂金",
						"value": "铂金"
					},
					{
						"name": "钻石",
						"value": "钻石"
					},
					{
						"name": "星耀",
						"value": "星耀"
					},
					{
						"name": "最强王者",
						"value": "最强王者"
					},
					{
						"name": "荣耀王者",
						"value": "荣耀王者"
					}
				]
			}
		]
	}
]
