<template>
	<b-nav small>
		<b-nav-item>
			<nuxt-link to="/tools/speed">Настройка скоростей моталок</nuxt-link>
		</b-nav-item>
		<b-nav-item>
			<router-link to="/tools/order">Наряд-допуск</router-link>
		</b-nav-item>
	</b-nav>
</template>

<script>
	export default {
		name: 'Nav'
	}
</script>

<style>

a.nuxt-link-active {
  font-weight: bold;
}

a.nuxt-link-exact-active {
  color: #000;
}
a,
a:visited {
  text-decoration: none;
  color: #000;
}

a:hover {
  color: rgb(78, 78, 78);
}
</style>