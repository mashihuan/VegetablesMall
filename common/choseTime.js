import moment from 'moment'
let current = moment(new Date()).format('今天MM月DD日');
let tomorrow = moment(new Date().getTime() + 24*60*60*1000).format('明天MM月DD日');
let afterTomorrow = moment(new Date().getTime() + 24*60*60*1000 + 24*60*60*1000).format('后天MM月DD日');
console.log(current, tomorrow, afterTomorrow)
export default [
	{
		"value": 0,
		"label": current,
		"children": [
			{
				"value": 1,
				"label": "7:00-7:30"
			},
			{
				"value": 2,
				"label": "7:30-8:00"
			},
			{
				"value": 3,
				"label": "8:00-8:30"
			},
			{
				"value": 4,
				"label": "8:30-9:00"
			},
			{
				"value": 5,
				"label": "9:00-9:30"
			},
			{
				"value": 6,
				"label": "9:30-10:00"
			},
			{
				"value": 7,
				"label": "10:00-10:30"
			},
			{
				"value": 8,
				"label": "10:30-11:00"
			},
			{
				"value": 9,
				"label": "11:30-12:00"
			},
			{
				"value": 10,
				"label": "12:00-12:30"
			},
			{
				"value": 11,
				"label": "12:30-13:00"
			},
			{
				"value": 12,
				"label": "13:00-13:30"
			},
			{
				"value": 13,
				"label": "13:30-14:00"
			},
			{
				"value": 14,
				"label": "14:00-14:30"
			},
			{
				"value": 15,
				"label": "14:30-15:00"
			},
			{
				"value": 16,
				"label": "15:00-15:30"
			},
			{
				"value": 17,
				"label": "15:30-16:00"
			},
			{
				"value": 18,
				"label": "16:00-16:30"
			},
			{
				"value": 19,
				"label": "16:30-17:00"
			},
			{
				"value": 20,
				"label": "17:30-18:00"
			},
			{
				"value": 21,
				"label": "18:00-18:30"
			},
			{
				"value": 22,
				"label": "18:30-19:00"
			},
			{
				"value": 23,
				"label": "19:00-19:30"
			},
			{
				"value": 24,
				"label": "19:30-20:00"
			},
			{
				"value": 25,
				"label": "20:00-20:30"
			},
			{
				"value": 26,
				"label": "20:30-21:00"
			},
		]
	},
	{
		"value": 1,
		"label": tomorrow,
		"children": [
			{
				"value": 1,
				"label": "7:00-7:30"
			},
			{
				"value": 2,
				"label": "7:30-8:00"
			},
			{
				"value": 3,
				"label": "8:00-8:30"
			},
			{
				"value": 4,
				"label": "8:30-9:00"
			},
			{
				"value": 5,
				"label": "9:00-9:30"
			},
			{
				"value": 6,
				"label": "9:30-10:00"
			},
			{
				"value": 7,
				"label": "10:00-10:30"
			},
			{
				"value": 8,
				"label": "10:30-11:00"
			},
			{
				"value": 9,
				"label": "11:30-12:00"
			},
			{
				"value": 10,
				"label": "12:00-12:30"
			},
			{
				"value": 11,
				"label": "12:30-13:00"
			},
			{
				"value": 12,
				"label": "13:00-13:30"
			},
			{
				"value": 13,
				"label": "13:30-14:00"
			},
			{
				"value": 14,
				"label": "14:00-14:30"
			},
			{
				"value": 15,
				"label": "14:30-15:00"
			},
			{
				"value": 16,
				"label": "15:00-15:30"
			},
			{
				"value": 17,
				"label": "15:30-16:00"
			},
			{
				"value": 18,
				"label": "16:00-16:30"
			},
			{
				"value": 19,
				"label": "16:30-17:00"
			},
			{
				"value": 20,
				"label": "17:30-18:00"
			},
			{
				"value": 21,
				"label": "18:00-18:30"
			},
			{
				"value": 22,
				"label": "18:30-19:00"
			},
			{
				"value": 23,
				"label": "19:00-19:30"
			},
			{
				"value": 24,
				"label": "19:30-20:00"
			},
			{
				"value": 25,
				"label": "20:00-20:30"
			},
			{
				"value": 26,
				"label": "20:30-21:00"
			},
		]
	},
	{
		"value": 2,
		"label": afterTomorrow,
		"children": [
			{
				"value": 1,
				"label": "7:00-7:30"
			},
			{
				"value": 2,
				"label": "7:30-8:00"
			},
			{
				"value": 3,
				"label": "8:00-8:30"
			},
			{
				"value": 4,
				"label": "8:30-9:00"
			},
			{
				"value": 5,
				"label": "9:00-9:30"
			},
			{
				"value": 6,
				"label": "9:30-10:00"
			},
			{
				"value": 7,
				"label": "10:00-10:30"
			},
			{
				"value": 8,
				"label": "10:30-11:00"
			},
			{
				"value": 9,
				"label": "11:30-12:00"
			},
			{
				"value": 10,
				"label": "12:00-12:30"
			},
			{
				"value": 11,
				"label": "12:30-13:00"
			},
			{
				"value": 12,
				"label": "13:00-13:30"
			},
			{
				"value": 13,
				"label": "13:30-14:00"
			},
			{
				"value": 14,
				"label": "14:00-14:30"
			},
			{
				"value": 15,
				"label": "14:30-15:00"
			},
			{
				"value": 16,
				"label": "15:00-15:30"
			},
			{
				"value": 17,
				"label": "15:30-16:00"
			},
			{
				"value": 18,
				"label": "16:00-16:30"
			},
			{
				"value": 19,
				"label": "16:30-17:00"
			},
			{
				"value": 20,
				"label": "17:30-18:00"
			},
			{
				"value": 21,
				"label": "18:00-18:30"
			},
			{
				"value": 22,
				"label": "18:30-19:00"
			},
			{
				"value": 23,
				"label": "19:00-19:30"
			},
			{
				"value": 24,
				"label": "19:30-20:00"
			},
			{
				"value": 25,
				"label": "20:00-20:30"
			},
			{
				"value": 26,
				"label": "20:30-21:00"
			},
		]
	},
]