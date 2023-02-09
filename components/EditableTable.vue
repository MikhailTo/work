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
					},
					{
						key: 'corr',
						label: 'Корректировка',
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
				const requestOptions = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(newData)
				};
				fetch("https://functions.yandexcloud.net/d4e25ccmqnui50cta6e5", requestOptions)
					.then(async response => {
						const data = await response.json();
						// check for error response
						if (!response.ok) {
							// get error message from body or default to response status
							const error = (data && data.message) || response.status;
							return Promise.reject(error);
						}
						this.result = data.answer;
					})
					.catch(error => {
						this.errorMessage = error;
						console.error('Ошибка!', error);
					});
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
		}
	}
</script>
<!-- <fa icon="fa-trash-can" /> -->