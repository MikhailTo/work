<template>
	<div>
		<b-card>
			<b-card-body>
				<Caption />
				<EditableTable />
			</b-card-body>
		</b-card>
	</div>
</template>
  
<script>
import EditableTable from '~/components/EditableTable.vue'
import Caption from '~/components/Caption.vue'
	export default {
		name: "Speed",
		components: { Caption,
		EditableTable },

		mounted: {

		}
}
</script>