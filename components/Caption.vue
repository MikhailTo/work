<template>
	<div>
		<h1>Таблица скоростей Моталка № <b-form-select v-model="selectedReel" @change="setSelectedReel($event)" :options="reels" value-field="item" text-field="name"></b-form-select> {{ getDate() }}</h1>
	</div>
</template>

<script>
	export default {
		
		data() {
			return {
				selectedReel: '3',
				reels: [
					{ item: '3', name: '3' },
					{ item: '4', name: '4' },
				]
			}
		},
		methods: {
			setSelectedReel(event) {
				this.$emit("selectedReel", event);
			},
			getDate() {
				let date = new Date();
				let day = (date.getDate() < 10) ? "0" + date.getDate() : date.getDate();
				let month = (date.getMonth() + 1 < 10) ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
				let year = date.getFullYear();
				return `${day}.${month}.${year} г.` ;
			}
		}	
	}
</script>