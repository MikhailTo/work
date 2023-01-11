<template>
	<div>
		<b-table bordered hover small fixed stacked="lg" :fields="fields" :items="items">
			<template #head()="data">
					{{ data.label }}
			</template>
			<template #cell(date)="data">
				<b-form-datepicker v-if="data.item.changingDate" v-model="data.item.date" placeholder="" :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }" locale="ru" size="md"></b-form-datepicker>	
				<b-button v-else @click="changeDate(data)">{{ data.item.date }}</b-button>
			</template>
			<template #cell()="data" >
				<b-input type="number" v-model="data.item[data.field.key]" v-on:change="data.item.memf = getMemf(data.item)" class="form-control text-center"/>
			</template>
			<template #cell(memf)="data" >
				{{ data.item.memf }}
				{{ data.item.task }}
				{{ data.item.bmav }}
				{{ data.item.bemf }}
			</template>
			<template #cell(action)="data">
				<!-- <button @click="removeItem(data.item.index)" class="btn"><fa icon="fa-trash-can" /></button> -->
				<!-- <b-button @click="saveData(data.item.name)" variant="success">Сохранить</b-button> -->
			</template>
			
		</b-table>
		<!-- <button @click="addItem" class="btn"><fa icon="fa-plus" /></button>	 -->
		
		{{ items }}
	</div>
	
</template>
  
<script>
	export default {
		data() {
			return {
				fields: [{
						key: 'date',
						label: 'Дата',
						class: 'text-center align-middle'
					},
					{
						key: 'reel',
						label: 'Моталка',
						class: 'text-center align-middle'
					},
					{
						key: 'roll',
						label: 'Ролик',
						class: 'text-center align-middle'
					},
					{
						key: 'task',
						label: 'Задание (r026)',
						class: 'text-center align-middle'
					},
					{
						key: 'tspd',
						label: 'Скорость',
						class: 'text-center align-middle'
					},
					{
						key: 'bmav',
						label: 'Изм. угловая скорость [до]',
						class: 'text-center align-middle'
					},
					{
						key: 'bemf',
						label: 'ЭДС (p115.2) [до]',
						class: 'text-center align-middle'
					},
					{
						key: 'amav',
						label: 'Изм. угловая скорость [после]',
						class: 'text-center align-middle'
					},
					{
						key: 'aemf',
						label: 'ЭДС (p115.2) [после]',
						class: 'text-center align-middle'
					},
					{
						key: 'memf',
						label: 'ЭДС (p115.2) [расч]',
						class: 'text-center align-middle',
						formatter: 'getMemf'
					},
					{
						key: 'action',
						label: 'Действия',
						class: 'text-center align-middle'
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
					changingDate: false,
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
					memf: ''
				}
			}
		},
		methods: {
			changeDate(data) {
				data.item.changingDate = !data.item.changingDate;
			},
			// saveData(data) {
			// 	console.log(`Saving data: ${data}`);
			// },
			getMemf(data) {
				const med = 0.16,
					rang = 2,
					dtmav = +data.task * +data.tspd - +data.bmav,
					step = (Math.abs(dtmav) < rang) ? med * dtmav : dtmav * 0,
					result = +data.bemf + step;
				return (result % 1) ? result.toFixed(2) : result;

			},
			signalChange: function(evt){
                   this.$emit("change", evt);
			},
			addItem() {
				this.items.push({
					date: this.getDate(), // today
					reel: this.item.reel, // if (roll[-1] == 4) reel + 1 else if (roll[-1] == 3) reel - 1
					roll: this.item.roll, // (roll[-1] != 4) ? roll + 1 : 1;
					task: this.item.task, // manual +0.2
					tspd: this.item.tspd, // always tspd
					bmav: this.item.bmav, // manual, but (reel == reel[-1] ) ? amav[-1] : amav;
					bemf: this.item.bemf, // aemf[-1]
					amav: this.item.amav, // manual for send
					aemf: this.item.aemf, // manual for send
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