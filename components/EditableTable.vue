<template>
	<!-- <button @click="addItem" class="btn"><fa icon="fa-plus" /></button> -->
	<div>
		
		<b-table bordered hover small fixed stacked="lg" :fields="fields" :items="items">
			<template #head()="data">
					{{ data.label }}
			</template>
			<!-- <b-thead >
				<b-th v-for="field in fields" class="text-center align-middle"> {{ field.label }}</b-th>
			</b-thead> -->
			<!-- <b-tbody>
			<b-tr v-for="(item, index) in items">
				<b-td stacked-heading="Дата" class="text-center align-middle">
					<b-form-datepicker v-if="item.edit" v-model="item.date" class="mb-2" placeholder="" :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }" locale="ru" v-on:keyup.enter="item.edit = !item.edit" size="sm"></b-form-datepicker>
					<span v-else>{{ getDate() }} </span>
				</b-td>
				<b-td stacked-heading="Моталка" class="text-center align-middle">
					<b-input v-if="item.edit" type="number" v-model="item.reel" class="form-control" v-on:keyup.enter="item.edit = !item.edit"/>
					<span v-else>{{item.reel}} </span>
				</b-td>
				<b-td stacked-heading="Ролик" class="text-center align-middle">
					<b-input v-if="item.edit" type="number" v-model="item.roll" class="form-control" v-on:keyup.enter="item.edit = !item.edit"/>
					<span v-else>{{item.roll}} </span>
				</b-td>
				<b-td stacked-heading="Задание (r026)" class="text-center align-middle">
					<b-input v-if="item.edit" type="number" v-model="item.task" class="form-control" v-on:keyup.enter="item.edit = !item.edit"/>
					<span v-else>{{item.task}} </span>
				</b-td>
				<b-td stacked-heading="Скорость" class="text-center align-middle">
					<b-input v-if="item.edit" type="number" v-model="item.tspd" class="form-control" v-on:keyup.enter="item.edit = !item.edit"/>
					<span v-else>{{item.tspd}} </span>
				</b-td>
				<b-td stacked-heading="Изм. угловая скорость [до]" class="text-center align-middle">
					<b-input v-if="item.edit" type="number" v-model="item.bmav" class="form-control" v-on:keyup.enter="item.edit = !item.edit"/>
					<span v-else>{{item.bmav}} </span>
				</b-td>
				<b-td stacked-heading="ЭДС (p115.2) [до]" class="text-center align-middle">
					<b-input v-if="item.edit" type="number" v-model="item.bemf" class="form-control" v-on:keyup.enter="item.edit = !item.edit"/>
					<span v-else>{{item.bemf}} </span>
				</b-td>
				<b-td stacked-heading="Изм. угловая скорость [после]" class="text-center align-middle">
					<b-input v-if="item.edit" type="number" v-model="item.amav" class="form-control" v-on:keyup.enter="item.edit = !item.edit"/>
					<span v-else>{{item.amav}} </span>
				</b-td>
				<b-td stacked-heading="ЭДС (p115.2) [после]" class="text-center align-middle">
					<b-input v-if="item.edit" type="number" v-model="item.aemf" class="form-control" v-on:keyup.enter="item.edit = !item.edit"/>
					<span v-else>{{item.aemf}} </span>
				</b-td>
				<b-td stacked-heading="ЭДС (p115.2) [расч]" class="text-center align-middle">
					<span>{{ getMemf(item) }}</span>
				</b-td>
				<b-td class="text-center align-middle">
					<button @click="item.edit = !item.edit" class="btn"><fa icon="fa-pencil" /></button>
					<button @click="removeItem(index)" class="btn"><fa icon="fa-trash-can" /></button>
				</b-td>
			</b-tr>
		</b-tbody> -->
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
					},
					{
						key: 'action',
						label: 'Действия',
					}
				],
				item: {
					date: '1',
					reel: '2',
					roll: '3',
					task: '4',
					tspd: '5',
					bmav: '6',
					bemf: '7',
					amav: '8',
					aemf: '9',
					memf: '0',
					edit: false
				},
				items: [{
					date: '1',
					reel: '2',
					roll: '3',
					task: '4',
					tspd: '5',
					bmav: '6',
					bemf: '7',
					amav: '8',
					aemf: '9',
					memf: '0',
					edit: false
				}]
			}
		},
		methods: {
			getMemf(item) {
				const med = 0.16,
					rang = 2,
					dtmav = item.task * item.tspd - item.bmav,
					step = (Math.abs(dtmav) < rang) ? med * dtmav : dtmav * 0;
				return item.bemf + step;
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