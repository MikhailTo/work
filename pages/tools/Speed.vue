<template>
	<div>
		<b-card>
			<b-card-body>
				<Caption @selectedReel="getSelectedReel"/>
				<EditableTable :gottenItems="oldItems"/>
				<!-- {{ oldItems }} -->
			</b-card-body>
		</b-card>
	</div>
</template>
  
<script>
import EditableTable from '~/components/EditableTable.vue'
import Caption from '~/components/Caption.vue'
	export default {
		name: "Speed",
		data() {
			return {
				
				selectedReel: '3',
				oldItems: [{
	date: '23.12.2022',
	reel: '3',
	roll: '1',
	task: '50.19',
	tspd: '10',
	fspd: null,
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
	fspd: null,
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
	fspd: null,
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
	fspd: null,
	bmav: '548',
	bemf: '102.1',
	amav: '551',
	aemf: '102.8',
	memf: '102.74',
	corr: ''
},
{
	date: '01.12.2022',
	reel: '4',
	roll: '1',
	task: '50.19',
	tspd: '10',
	fspd: null,
	bmav: '496',
	bemf: '117.8',
	amav: '501',
	aemf: '119',
	memf: '118.76',
	corr: ''
},
{
	date: '01.12.2022',
	reel: '4',
	roll: '2',
	task: '52.19',
	tspd: '10',
	fspd: null,
	bmav: '522',
	bemf: '53.5',
	amav: '522',
	aemf: '53.5',
	memf: '53.5',
	corr: ''
},
{
	date: '01.12.2022',
	reel: '4',
	roll: '3',
	task: '53.19',
	tspd: '10',
	fspd: null,
	bmav: '539',
	bemf: '112',
	amav: '531',
	aemf: '110.15',
	memf: '110.84',
	corr: ''
},
{
	date: '01.12.2022',
	reel: '4',
	roll: '4',
	task: '55.19',
	tspd: '10',
	fspd: null,
	bmav: '560',
	bemf: '109',
	amav: '553',
	aemf: '107.5',
	memf: '107.68',
	corr: ''
}
]
			}
		},
		methods: {
			transformData(item) {
				return {
					task: item.task,
					tspd: item.tspd,
					fspd: item.fspd,
					bmav: item.amav,
					bemf: item.aemf,
					amav: '',
					aemf: '',
					memf: item.memf,
					corr: ''
				};
			},
			getCloudItems() {
				// GET request using fetch with error handling
				fetch("https://storage.yandexcloud.net/aepp.ru/data/speed_calculations.json")
					.then(async response => {
						const data = await response.json();
						// check for error response
						if (!response.ok) {
							// get error message from body or default to response statusText
							const error = (data && data.message) || response.statusText;
							return Promise.reject(error);
						}
						this.oldItems = getItems(selectedReel, data.total);
					})
					.catch(error => {
						this.errorMessage = error;
						console.error("There was an error!", error);
					});
			},
			getItems(number, list) {
				let result = [];
				console.log(number)
				for (let item of list) {
					if (item.reel == number) {
						result.push(this.transformData(item) );
					}
					
				}
				return result;
			},
			getSelectedReel(selectedReel) {
				this.selectedReel = selectedReel;
			}
		},

		components: { Caption, EditableTable },
}
</script>