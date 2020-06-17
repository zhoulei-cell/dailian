export default [{
		"type": 'hierarchy',
		"submenu": [{
			"name": '全部区',
			"value": ''
		}]
	},
	{
		// name:'奖金综合排序',
		"type": 'hierarchy',
		"submenu": [{
				"name": "综合排序",
				"value": ""
			},
			{
				"name": "奖金由低到高",
				"value": "amount_asc"
			},
			{
				"name": "奖金由高到底",
				"value": "amount_desc"
			},
			{
				"name": "时间由低到高",
				"value": "created_at_asc"
			},
			{
				"name": "时间由高到底",
				"value": "created_at_desc"
			}
		]
	}
]
