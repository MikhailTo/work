<template>
	<div>
		<b-table bordered hover small fixed stacked="lg" :fields="fields" :items="items">
			<template #head()="data">
					{{ data.label }}
			</template>
			<template #cell(date)="data">
				<b-form-datepicker v-if="data.edit" v-model="data.date" class="mb-2" placeholder="" :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }" locale="ru" v-on:keyup.enter="data.edit = !data.edit" size="sm"></b-form-datepicker>
				<span v-else>{{ data.value }} </span>
			</template>
			<template #cell()="data" >
				<b-input v-if="data.edit" type="number" v-model="data.value" class="form-control" v-on:keyup.enter="data.edit = !data.edit"/>
				<span v-else>{{ data.value }} </span>
			</template>
			<template #cell(memf)="data" >
				{{ getMemf(data.item) }}
			</template>
			<template #cell(action)="items">
				<button @click="data.edit = !data.edit" class="btn"><fa icon="fa-pencil" /></button>
				<button @click="addItem" class="btn"><fa icon="fa-plus" /></button>	
				<button @click="removeItem(index)" class="btn"><fa icon="fa-trash-can" /></button>
			</template>

		</b-table>
	</div>
	
</template>
  
<script>
	export default {
		data() {
			return {
				fields: [{
						key: 'date',
						label: 'Дата',
					},
					{
						key: 'reel',
						label: 'Моталка',
					},
					{
						key: 'roll',
						label: 'Ролик',
					},
					{
						key: 'task',
						label: 'Задание (r026)',
					},
					{
						key: 'tspd',
						label: 'Скорость',
					},
					{
						key: 'bmav',
						label: 'Изм. угловая скорость [до]',
					},
					{
						key: 'bemf',
						label: 'ЭДС (p115.2) [до]',
					},
					{
						key: 'amav',
						label: 'Изм. угловая скорость [после]',
					},
					{
						key: 'aemf',
						label: 'ЭДС (p115.2) [после]',
					},
					{
						key: 'memf',
						label: 'ЭДС (p115.2) [расч]',
						formatter: 'getMemf'
					},
					{
						key: 'action',
						label: 'Действия',
					}
				],
				items: [{
					date: '01.12.2022',
					reel: '4',
					roll: '1',
					task: '50.19',
					tspd: '10',
					bmav: '496',
					bemf: '117.8',
					amav: '501',
					aemf: '119',
					memf: '118.76',
					edit: false
				},
				{
					date: '01.12.2022',
					reel: '4',
					roll: '2',
					task: '52.19',
					tspd: '10',
					bmav: '522',
					bemf: '53.5',
					amav: '522',
					aemf: '53.5',
					memf: '53.5',
					edit: false
				},
				{
					date: '01.12.2022',
					reel: '4',
					roll: '3',
					task: '53.19',
					tspd: '10',
					bmav: '539',
					bemf: '112',
					amav: '531',
					aemf: '110.15',
					memf: '110.84',
					edit: false
				},
				{
					date: '01.12.2022',
					reel: '4',
					roll: '4',
					task: '55.19',
					tspd: '10',
					bmav: '560',
					bemf: '109',
					amav: '553',
					aemf: '107.5',
					memf: '107.68',
					edit: false
				},
				{
					date: '23.12.2022',
					reel: '3',
					roll: '1',
					task: '50.19',
					tspd: '10',
					bmav: '496',
					bemf: '103',
					amav: '502',
					aemf: '103.5',
					memf: '103.96',
					edit: false
				},
				{
					date: '23.12.2022',
					reel: '3',
					roll: '2',
					task: '52.19',
					tspd: '10',
					bmav: '520',
					bemf: '103',
					amav: '520',
					aemf: '107',
					memf: '107',
					edit: false
				},
				{
					date: '23.12.2022',
					reel: '3',
					roll: '3',
					task: '53.19',
					tspd: '10',
					bmav: '536',
					bemf: '92.5',
					amav: '532',
					aemf: '92',
					memf: '91.83',
					edit: false
				},
				{
					date: '23.12.2022',
					reel: '3',
					roll: '4',
					task: '55.19',
					tspd: '10',
					bmav: '548',
					bemf: '102.1',
					amav: '551',
					aemf: '102.8',
					memf: '102.74',
					edit: false
				}],
				item: {
					date: '',
					reel: '',
					roll: '',
					task: '',
					tspd: '',
					bmav: '',
					bemf: '',
					amav: '',
					aemf: '',
					memf: '',
					edit: false
				}
			}
		},
		methods: {
			getMemf(data) {
				const med = 0.16,
					rang = 2,
					dtmav = +data.task * +data.tspd - +data.bmav,
					step = (Math.abs(dtmav) < rang) ? med * dtmav : dtmav * 0,
					result = +data.bemf + step;
				return (result % 1) ? result.toFixed(2) : result;

			},
			addItem() {
				this.items.push({
					date: this.getDate(), // today
					reel: this.data.reel, // if (roll[-1] == 4) reel + 1 else if (roll[-1] == 3) reel - 1
					roll: this.data.roll, // (roll[-1] != 4) ? roll + 1 : 1;
					task: this.data.task, // manual +0.2
					tspd: this.data.tspd, // always tspd
					bmav: this.data.bmav, // manual, but (reel == reel[-1] ) ? amav[-1] : amav;
					bemf: this.data.bemf, // aemf[-1]
					amav: this.data.amav, // manual for send
					aemf: this.data.aemf, // manual for send
					edit: false
				});
				this.item = [];
			},
			removeItem(index) {
				this.items.splice(index, 1)
			},
			getDate() {
				let result = [];
				let date = new Date();
				result.push((date.getDate() < 10) ? "0" + date.getDate() : date.getDate());
				result.push((date.getMonth() + 1 < 10) ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1));
				result.push(date.getFullYear());
				return result.join('.');
			}
		},
	}
</script>

<style>

span {
	width: 100%;
}

</style>