<script>
	import MenuCard from "$lib/components/MenuCard.svelte";
	import CategoryFilter from "$lib/components/CategoryFilter.svelte";

	let { data } = $props();

	let categories = ["Nasi Kotak", "Bento Box", "Healty Salad", "Snack & Drink"];
	let activeCategory = "Semua";

	// Filter logic (Planned for next step)
	let filteredItems = $derived(
		activeCategory === "Semua" 
			? (data.menus || []) 
			: (data.menus || []).filter(item => item.category === activeCategory)
	);
</script>

<div class="px-6 py-8 h-full overflow-y-auto">
	<!-- Header & Search -->
	<div class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
		<div>
			<h1 class="text-3xl font-extrabold text-brand-charcoal tracking-tight">Katalog Menu</h1>
			<p class="text-zinc-500 text-sm mt-1">Pilih katering sehat favorit Anda untuk hari ini.</p>
		</div>

		<div class="relative w-full md:w-80">
			<input 
				type="text" 
				placeholder="Cari menu favorit..."
				class="w-full pl-12 pr-4 py-3 bg-white border border-zinc-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all shadow-sm"
			/>
			<svg class="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
			</svg>
		</div>
	</div>

	<!-- Category Filter -->
	<div class="mb-8">
		<CategoryFilter {categories} {activeCategory} />
	</div>

	<!-- Menu Grid -->
	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
		{#each filteredItems as item}
			<MenuCard 
				name={item.name} 
				price={item.basePrice} 
				category={item.category} 
				stock={0} 
				image={item.image} 
			/>
		{/each}
	</div>

	<!-- No Result -->
	{#if filteredItems.length === 0}
		<div class="flex flex-col items-center justify-center py-20 text-zinc-400">
			<svg class="w-20 h-20 mb-4 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
			</svg>
			<p class="text-lg font-medium">Menu tidak ditemukan</p>
			<p class="text-sm">Belum ada menu di kategori ini.</p>
		</div>
	{/if}
</div>

