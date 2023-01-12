<template>
	<div>
		<b-table bordered hover small fixed stacked="lg" :fields="fields" :items="items">
			<template #head()="data">
				{{ data.label }}
			</template>
			<template #cell(name)="data">
	 			{{'Формирующий ролик №' + (data.index + 1) }}
			</template>
			<template #cell()="data">
				<b-input type="number" v-model="data.value" class="form-control text-center" />
			</template>
			
			<!-- v-on:change="data.item.memf = getMemf(data.item)" -->
<!--<template #cell(reel)="data">
	 {{ data.reel }}
</template>
<template #cell()="data">
	<b-input type="number" v-model="data.item[data.field.key]" v-on:change="data.item.memf = getMemf(data.item)" class="form-control text-center" />
</template>
<template #cell(memf)="data">
	 {{ data.item.memf }} {{ data.item.task }} {{ data.item.bmav }} {{ data.item.bemf }}
</template>
<template #cell(action)="data">
	<button @click="removeItem(data.item.index)" class="btn"><fa icon="fa-trash-can" /></button>
	-->
	<!-- <b-button @click="saveData(data.item.name)" variant="success">Сохранить</b-button>
</template>--> 

		</b-table>
		<!-- <button @click="addItem" class="btn"><fa icon="fa-plus" /></button>	 -->
		
		
	</div>
	
</template>
  
<script>


	export default {
		data() {
			return {
				fields: [{
						key: 'name',
						label: 'Наименование',
						class: 'text-center align-middle'
					},
					{
						key: 'task',
						label: 'Задание с клином в привод, %',
						class: 'text-center align-middle',
						type: 'number'
					},
					{
						key: 'tspd',
						label: 'Выставленная скорость по заданию, м/с',
						class: 'text-center align-middle',
						type: 'number'
					},
					{
						key: 'fspd',
						label: 'Фактическая скорость на терминале',
						class: 'text-center align-middle',
						type: 'select'
					},
					{
						key: 'bmav',
						label: 'Измеренная угловая фактическая скорость до корректировки, об/мин',
						class: 'text-center align-middle',
						type: 'number'
					},
					{
						key: 'bemf',
						label: 'Значение параметра P115.2 до изменения',
						class: 'text-center align-middle',
						type: 'number'
					},
					{
						key: 'amav',
						label: 'Измеренная угловая фактическая скорость после корректировки, об/мин',
						class: 'text-center align-middle',
						type: 'number'
					},
					{
						key: 'aemf',
						label: 'Значение параметра P115.2 после изменения',
						class: 'text-center align-middle',
						type: 'number'
					},
					{
						key: 'dtmav',
						label: 'Разница скоростей заданной от фактической, %',
						class: 'text-center align-middle',
						type: 'number'
						//formatter: 'getMemf'
					},
					{
						key: 'corr',
						label: 'Корректировка',
						class: 'text-center align-middle',
						type: 'select'
					}
				],
				oldItems: [{
						date: '23.12.2022',
						reel: '3',
						roll: '1',
						task: '50.19',
						tspd: '10',
						fspd: '',
						bmav: '496',
						bemf: '103',
						amav: '502',
						aemf: '103.5',
						memf: '103.96',
						corr: ''
					},
					{
						date: '23.12.2022',
						reel: '3',
						roll: '2',
						task: '52.19',
						tspd: '10',
						fspd: '',
						bmav: '520',
						bemf: '103',
						amav: '520',
						aemf: '107',
						memf: '107',
						corr: ''
					},
					{
						date: '23.12.2022',
						reel: '3',
						roll: '3',
						task: '53.19',
						tspd: '10',
						fspd: '',
						bmav: '536',
						bemf: '92.5',
						amav: '532',
						aemf: '92',
						memf: '91.83',
						corr: ''
					},
					{
						date: '23.12.2022',
						reel: '3',
						roll: '4',
						task: '55.19',
						tspd: '10',
						fspd: '',
						bmav: '548',
						bemf: '102.1',
						amav: '551',
						aemf: '102.8',
						memf: '102.74',
						corr: ''
					},
					// {
					// 	date: '01.12.2022',
					// 	reel: '4',
					// 	roll: '1',
					// 	task: '50.19',
					// 	tspd: '10',
					// 	fspd: '',
					// 	bmav: '496',
					// 	bemf: '117.8',
					// 	amav: '501',
					// 	aemf: '119',
					// 	memf: '118.76',
					// 	corr: ''
					// },
					// {
					// 	date: '01.12.2022',
					// 	reel: '4',
					// 	roll: '2',
					// 	task: '52.19',
					// 	tspd: '10',
					// 	fspd: '',
					// 	bmav: '522',
					// 	bemf: '53.5',
					// 	amav: '522',
					// 	aemf: '53.5',
					// 	memf: '53.5',
					// 	corr: ''
					// },
					// {
					// 	date: '01.12.2022',
					// 	reel: '4',
					// 	roll: '3',
					// 	task: '53.19',
					// 	tspd: '10',
					// 	fspd: '',
					// 	bmav: '539',
					// 	bemf: '112',
					// 	amav: '531',
					// 	aemf: '110.15',
					// 	memf: '110.84',
					// 	corr: ''
					// },
					// {
					// 	date: '01.12.2022',
					// 	reel: '4',
					// 	roll: '4',
					// 	task: '55.19',
					// 	tspd: '10',
					// 	fspd: '',
					// 	bmav: '560',
					// 	bemf: '109',
					// 	amav: '553',
					// 	aemf: '107.5',
					// 	memf: '107.68',
					// 	corr: ''
					// }
				],
				items: [],
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

			// getMemf(data) {
			// 	const med = 0.16,
			// 		rang = 2,
			// 		dtmav = +data.task * +data.tspd - +data.bmav,
			// 		step = (Math.abs(dtmav) < rang) ? med * dtmav : dtmav * 0,
			// 		result = +data.bemf + step;
			// 	return (result % 1) ? result.toFixed(2) : result;
			// },

			getItems(list) {
				let result = [];
				for (let item of list) {
					result.push({
					task: item.task,
					tspd: item.tspd,
					fspd: '',
					bmav: item.amav,
					bemf: item.aemf,
					amav: '',
					aemf: '',
					memf: '',
					corr: ''
				});
				}
				return result;
				// return list.map( (item) => { transformData(item) }) WTF error?
			}
		}
	}
</script>