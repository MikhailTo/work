<template>
	<div>
		<b-tabs content-class="mt-3" align="center">
			<b-tab title="Intro" active>
				<Intro/>
			</b-tab>
			<b-tab title="Speed">
				<Speed/>
			</b-tab>
			<b-tab title="Order" disabled>
				<Order/>
			</b-tab>
		</b-tabs>
	</div>
</template>

<script>
export default {
  name: 'IndexPage'
}
</script>
