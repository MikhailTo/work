<template>
	<div>
		<b-container>
			<b-row>
				<b-col col lg="2">
					<b-form v-for="(field, index) in fields" v-if="field.key != 'date' && field.key != 'action'" :key="field">
						<b-form-group :id="`input-group-${index}`" :label="field.label" :label-for="`input-${index}`">
							<b-form-input id="inline-form-input-name" class="mb-1 mr-sm-2 mb-sm-0" type="number" v-model="item[field.key]"></b-form-input>
						</b-form-group>
					</b-form>
					<b-button @click="addItem" class="btn">
						<fa icon="fa-plus" /> Добавить</b-button>
				</b-col>
				<b-col cols="10">
					<table class="table table-striped table-sm">
						<thead class="thead-light" >
							<th v-for="field in fields"> {{ field.label }}</th>
						</thead>
						<tr v-for="(item, index) in items">
							<td>
								<b-form-datepicker v-if="item.edit" v-model="item.date" class="mb-2" placeholder="" v-on:keyup.enter="item.edit = !item.edit"></b-form-datepicker>
								<span v-else>{{ getDate() }} </span>
							</td>
							<td>
								<input v-if="item.edit" type="number" v-model="item.reel" class="form-control" v-on:keyup.enter="item.edit = !item.edit">
								<span v-else>{{item.reel}} </span>
							</td>
							<td>
								<input v-if="item.edit" type="number" v-model="item.roll" class="form-control" v-on:keyup.enter="item.edit = !item.edit">
								<span v-else>{{item.roll}} </span>
							</td>
							<td>
								<input v-if="item.edit" type="number" v-model="item.task" class="form-control" v-on:keyup.enter="item.edit = !item.edit">
								<span v-else>{{item.task}} </span>
							</td>
							<td>
								<input v-if="item.edit" type="number" v-model="item.tspd" class="form-control" v-on:keyup.enter="item.edit = !item.edit">
								<span v-else>{{item.tspd}} </span>
							</td>
							<td>
								<input v-if="item.edit" type="number" v-model="item.bmav" class="form-control" v-on:keyup.enter="item.edit = !item.edit">
								<span v-else>{{item.bmav}} </span>
							</td>
							<td>
								<input v-if="item.edit" type="number" v-model="item.bemf" class="form-control" v-on:keyup.enter="item.edit = !item.edit">
								<span v-else>{{item.bemf}} </span>
							</td>
							<td>
								<input v-if="item.edit" type="number" v-model="item.amav" class="form-control" v-on:keyup.enter="item.edit = !item.edit">
								<span v-else>{{item.amav}} </span>
							</td>
							<td>
								<input v-if="item.edit" type="number" v-model="item.aemf" class="form-control" v-on:keyup.enter="item.edit = !item.edit">
								<span v-else>{{item.aemf}} </span>
							</td>
							<td>
								<span>{{ getMemf(item) }}</span>
							</td>
							<td><button @click="item.edit = !item.edit" class="btn btn-info"><fa icon="fa-pencil" /></button>
								<button @click="removeItem(index)" class="btn btn-danger"><fa icon="fa-trash-can" /></button></td>
						</tr>
					</table>
				</b-col>
			</b-row>
		</b-container>
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
				},
				items: []
			}
		},
		methods: {
			getMemf(item) {
				const med = 0.16,
					rang = 2,
					dtmav = item.task * item.tspd - item.bmav;
				return item.bemf + (Math.abs(dtmav) < rang) ? med * dtmav : dtmav * 0;
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
				result.push(date.getDate());
				result.push((date.getMonth() + 1 < 10) ? + "0" + (date.getMonth() + 1) : (date.getMonth() + 1));
				result.push(date.getFullYear());
				return result.join('.');
			}
		},
	}
</script>

<style>
	input[type=number], .b-form-datepicker {
		width: 100px;
	}
	.form__input {
		width: 10px;
	}
</style>