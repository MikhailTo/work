<template>
		<b-list-group flush>
			<b-card no-body v-for="item in manuals" :key="item.caption" :header="item.caption">
				<b-list-group flush>
					<b-list-group-item v-for="file in item.files" :href="file.url">
						{{ file.name }}
					</b-list-group-item>
				</b-list-group>
			</b-card>
		</b-list-group>
</template>

<script>
	export default {
		name: 'Manual',
		data() {
			return {
				manuals: [{
					caption: 'Siemens',
					files: [{
							name: 'Simoreg DC Master',
							url: 'https://storage.yandexcloud.net/aepp.ru/data/manuals/siemens/simoreg/dc-master_m_0507_ru.pdf'
						},
						{
							name: 'Simovert Masterdrives VC',
							url: 'https://storage.yandexcloud.net/aepp.ru/data/manuals/siemens/simovert/masterdrives-vc_m_0503_ru.pdf'
						},
						{
							name: 'Sinamics S120',
							url: 'https://storage.yandexcloud.net/aepp.ru/data/manuals/siemens/sinamics/s120_m_0112_ru.pdf'
						}
					]
				}, ]
			}
		}
	}
</script>