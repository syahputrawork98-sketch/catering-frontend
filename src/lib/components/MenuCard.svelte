<script>
	import { cart } from '$lib/stores/cartStore.svelte';
	let { id = "", name = "Nama Menu", price = 0, category = "Umum", image = "", stock = 0 } = $props();

	function formatPrice(val) {
		return new Intl.NumberFormat('id-ID', {
			style: 'currency',
			currency: 'IDR',
			minimumFractionDigits: 0
		}).format(val);
	}
</script>

<div class="group relative bg-white rounded-3xl border border-zinc-100 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-brand-primary/10 transition-all duration-300">
	<!-- Image Container -->
	<div class="relative h-48 w-full overflow-hidden">
		{#if image}
			<img src={image} alt={name} class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
		{:else}
			<div class="w-full h-full bg-zinc-100 flex items-center justify-center text-zinc-300 italic text-sm">
				No Image
			</div>
		{/if}
		
		<!-- Category Tag -->
		<div class="absolute top-4 left-4">
			<span class="bg-white/90 backdrop-blur-sm text-brand-charcoal px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm">
				{category}
			</span>
		</div>
	</div>

	<!-- Content -->
	<div class="p-5">
		<div class="flex justify-between items-start mb-2">
			<h3 class="text-lg font-bold text-brand-charcoal line-clamp-1">{name}</h3>
		</div>
		
		<div class="flex items-center gap-2 mb-4 text-xs">
			<span class="flex items-center text-zinc-400">
				<svg class="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
				</svg>
				Stok: {stock} porsi
			</span>
		</div>

		<div class="flex items-center justify-between mt-auto pt-2">
			<div class="text-brand-primary font-extrabold text-xl">
				{formatPrice(price)}
			</div>
			
			<button 
				onclick={() => cart.addItem({ id, name, price, image, category })}
				class="w-10 h-10 bg-brand-primary rounded-2xl flex items-center justify-center text-white shadow-lg shadow-brand-primary/20 hover:bg-brand-charcoal transition-colors group-active:scale-95"
			>
				<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
				</svg>
			</button>
		</div>
	</div>
</div>
