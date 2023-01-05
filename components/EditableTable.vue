<template>
	<div>
		<b-table :items="items" :fields="fields" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" sort-icon-left responsive="sm" label-sort-asc="" label-sort-desc="" label-sort-clear=""></b-table>
	</div>
</template>
  
<script>
	export default {
		data() {
			return {
				sortBy: 'date',
				sortDesc: false,
				fields: [{
						key: 'date',
						label: 'Дата',
						sortable: true,

					},
					{
						key: 'reel',
						label: 'Моталка',
						sortable: true,

					},
					{
						key: 'roll',
						label: 'Ролик',
						sortable: true,

					},
					{
						key: 'task',
						label: 'Задание (r026)',
						sortable: true,

					},
					{
						key: 'tspd',
						label: 'Скорость',
						sortable: true,

					},
					{
						key: 'bmav',
						label: 'Изм. угловая скорость [до]',
						sortable: true,

					},
					{
						key: 'bemf',
						label: 'ЭДС (p115.2) [до]',
						sortable: true,

					},
					{
						key: 'amav',
						label: 'Изм. угловая скорость [после]',
						sortable: true,

					},
					{
						key: 'aemf',
						label: 'ЭДС (p115.2) [после]',
						sortable: true,

					},
					{
						key: 'memf',
						label: 'ЭДС (p115.2) [расч]',
						sortable: true,

					},
					{
						key: 'action',
						label: 'Действия',
						sortable: false,

					}
				],
				items: [{
						date: '01.01.2023',
						reel: 1,
						roll: 1,
						task: 53.19,
						tspd: 10,
						bmav: 535,
						bemf: 109.3,
						amav: 535,
						aemf: 109.3,
						memf: 0
					},
				]
			}
		},
		methods: {

			getMemf() {
				const med = 0.16, rang = 2, dtmav = task * tspd - bmav;
				return bemf + (Math.abs(dtmav) < rang) ? med * dtmav : dtmav * 0; 
			},

			addNewRow() {
				this.items.push({
						date: '01.01.2023', // today
						reel: 3, 		// if (roll[-1] == 4) reel + 1 else if (roll[-1] == 3) reel - 1
						roll: 2, 		// (roll[-1] != 4) ? roll + 1 : 1;
						task: 53.29, 	// manual +0.2
						tspd: 10, 		// always tspd
						bmav: 535, 		// manual, but (reel == reel[-1] ) ? amav[-1] : amav;
						bemf: 109.3, 	// aemf[-1]
						amav: 0, 		// manual for send
						aemf: 0, 		// manual for send
						memf: 0 		// calculation
				})
			}
		},
	}
</script>

<style>

</style>