<template>
	<div>
		<b-table bordered hover small fixed stacked="lg" :fields="fields" :items="items = gottenItems">
			<template #head()="data">
				{{ data.label }}
			</template>

<template #cell(name)="data">
	 {{'Формирующий ролик №' + (data.index + 1) }}
</template>
<template #cell()="data">
	<b-input type="number" v-model="items[data.index][data.field.key]" v-on:change="items[data.index].memf = getMemf(data.item)" step="0.1" class="form-control text-center" />
</template>
<template #cell(aemf)="data">
	<b-input type="number" v-model="items[data.index].aemf" :placeholder="data.item.memf" step="0.1" class="form-control text-center" />
</template>
<template #cell(fspd)="data">
	<b-form-select v-model="items[data.index].fspd" :options="optionsFspd" class="form-control">
	</b-form-select>
</template>
<template #cell(tspd)="data">
	<b-input v-if="items[data.index].fspd != null" type="number" v-model="items[data.index].tspd" v-on:change="items[data.index].memf = getMemf(data.item)" class="form-control text-center" />
	<span v-else> {{ items[data.index].tspd = '10'}}</span>
</template>
<template #cell(dtmav)="data">
	 {{ ((+items[data.index].task * +items[data.index].tspd - +items[data.index].bmav) / ((+items[data.index].task * +items[data.index].tspd + +items[data.index].bmav) / 2) * 100).toFixed(2) }}
</template>
<template #cell(corr)="data">
	<span v-if="items[data.index].bemf != items[data.index].aemf && items[data.index].aemf != ''">{{ items[data.index].corr = "Корректировалась" }}</span>
	<span v-else> {{ items[data.index].corr = "Не корректировалась" }}</span>
</template>
		</b-table>
		<b-button variant="outline-primary" v-on:click="saveItems(items)">Сохранить</b-button>
	</div>
</template>
<script>
	export default {
		props: {
			gottenItems: Array
		},
		data() {
			return {
				optionsFspd: [{
						value: null,
						text: 'Не контролировалась'
					},
					{
						value: 'controlled',
						text: 'Контролировалась'
					}
				],
				fields: [{
						key: 'name',
						label: 'Наименование',
						label_mobile: 'Наим.',
						class: 'text-center align-middle'
					},
					{
						key: 'task',
						label: 'Задание с клином в привод, %',
						label_mobile: 'Задание',
						class: 'text-center align-middle',
						type: 'number'
					},
					{
						key: 'tspd',
						label: 'Выставленная скорость по заданию, м/с',
						label_mobile: 'Скорость',
						class: 'text-center align-middle',
						type: 'number'
					},
					{
						key: 'fspd',
						label: 'Фактическая скорость на терминале',
						label_mobile: 'Факт. скорость',
						class: 'text-center align-middle',
						type: 'select'
					},
					{
						key: 'bmav',
						label: 'Измеренная угловая фактическая скорость до корректировки, об/мин',
						label_mobile: 'Угл. скорость (до)',
						class: 'text-center align-middle',
						type: 'number'
					},
					{
						key: 'bemf',
						label: 'Значение параметра P115.2 до изменения',
						label_mobile: 'P115.2 (до)',
						class: 'text-center align-middle',
						type: 'number'
					},
					{
						key: 'amav',
						label: 'Измеренная угловая фактическая скорость после корректировки, об/мин',
						label_mobile: 'Угл. скорость (после)',
						class: 'text-center align-middle',
						type: 'number'
					},
					{
						key: 'aemf',
						label: 'Значение параметра P115.2 после изменения',
						label_mobile: 'P115.2 (после)',
						class: 'text-center align-middle',
						type: 'number'
					},
					{
						key: 'dtmav',
						label: 'Разница скоростей заданной от фактической, %',
						label_mobile: 'Разница скоростей',
						class: 'text-center align-middle',
						type: 'number'
					},
					{
						key: 'corr',
						label: 'Корректировка',
						label_mobile: 'Коррект.',
						class: 'text-center align-middle',
						type: 'select'
					}
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
				},
				result: ''
			}
		},
		methods: {
			saveItems(newData) {
				// POST request using fetch with error handling
				const url = "https://functions.yandexcloud.net/d4e25ccmqnui50cta6e5";
				const requestOptions = {
					method: 'POST',
					mode: "cors",
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(newData)
				};
				let request = {
					run: function (url, data) {
						fetch(url, data)
							.then(async response => this.check(response))
							.then(data => this.success(data))
							.catch(error => this.error(error));
					},
					check: function (response) {
						if (response.status !== 200) {
							// get error message from body or default to response status
							const error = response.status; //(data && data.message) || response.status;
							console.log('Похоже, возникла проблема. Код состояния: ' + error);
							return Promise.reject(error);
						}
						return response.json();
					},
					success: function (data) {
						if (data.result) {
							console.log(data.data);
						}
					},
					error: function (error) {
						console.error('Ошибка: ', error);
					}
			};
			request.run(url, requestOptions);
			},
			getMemf(data) {
				const med = 0.16,
					rang = 2,
					dtmav = +data.task * +data.tspd - +data.bmav,
					step = (Math.abs(dtmav) <= rang || Math.abs(dtmav) >= rang) ? med * dtmav : dtmav * 0;
				let result = +data.bemf + step;
				result = (result % 1) ? result.toFixed(2).toString() : result.toString()
				return (step > 0) ? result + ' (+' + step.toFixed(2) + ')' : (step < 0) ? result + ' (' + step.toFixed(2) + ')' : result;
			}
		},
		computed: {
			isWindowWidth960() {
				alert(window.innerWidth > 960);
				return window.innerWidth > 960;
			}
		}
	}
</script>
<!-- <fa icon="fa-trash-can" /> -->