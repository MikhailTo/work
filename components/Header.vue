<template>
	<header class="container-fluid">
		<b-navbar toggleable="sm" type="light" variant="light">
			<b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>
			<Logo />
			<b-collapse id="nav-text-collapse" is-nav>
				<b-navbar-nav>
					<Nav />
				</b-navbar-nav>
			</b-collapse>
		</b-navbar>
	</header>
</template>
<style>
	header {
		margin-bottom: 4rem;
	}
	
</style>