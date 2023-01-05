<template>
	<div>
		<b-card>
			<b-card-body>
				<EditableTable />
			</b-card-body>
		</b-card>
	</div>
</template>
  
<script>
import EditableTable from '~/components/EditableTable.vue'

	export default {
    name: "Speed",
    components: { EditableTable }
}
</script>