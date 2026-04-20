<script>
  import OrderStatusBadge from '$lib/components/OrderStatusBadge.svelte';
  
  // Dummy data for visual-first development
  let orders = [
    { id: "ORD-7721", date: "20 April 2026", total: 112000, status: "PENDING", items: 3 },
    { id: "ORD-7605", date: "18 April 2026", total: 85000, status: "PAID", items: 2 },
    { id: "ORD-7512", date: "15 April 2026", total: 42000, status: "COMPLETED", items: 1 },
  ];

  function formatPrice(val) {
		return new Intl.NumberFormat('id-ID', {
			style: 'currency',
			currency: 'IDR',
			minimumFractionDigits: 0
		}).format(val);
	}
</script>

<div class="px-6 py-8 max-w-5xl mx-auto h-full overflow-y-auto">
  <!-- Header -->
  <div class="mb-10">
    <h1 class="text-3xl font-extrabold text-brand-charcoal tracking-tight">Riwayat Pesanan</h1>
    <p class="text-zinc-500 text-sm mt-1">Pantau status pengiriman dan riwayat belanja katering Anda.</p>
  </div>

  {#if orders.length === 0}
    <div class="py-20 text-center">
      <div class="w-20 h-20 bg-brand-primary/10 rounded-3xl flex items-center justify-center text-brand-primary mx-auto mb-6">
        <svg class="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 118 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      </div>
      <h2 class="text-xl font-bold text-brand-charcoal mb-4 text-center">Belum ada pesanan</h2>
      <p class="text-zinc-500 mb-8 max-w-xs mx-auto text-center">Anda belum memiliki pesanan aktif saat ini. Silakan pilih menu untuk memulai pesanan pertama Anda.</p>
      <a href="/dashboard/menu" class="btn-primary">Lihat Menu Hari Ini</a>
    </div>
  {:else}
    <div class="space-y-4">
      {#each orders as order}
        <div class="bg-white rounded-3xl border border-zinc-100 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-xl hover:shadow-brand-primary/5 transition-all group">
          <div class="flex items-center gap-6">
            <div class="w-16 h-16 bg-zinc-50 rounded-2xl flex items-center justify-center text-brand-primary border border-zinc-100 group-hover:bg-brand-primary group-hover:text-white transition-colors">
              <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div>
              <div class="flex items-center gap-3 mb-1">
                <span class="text-sm font-black text-brand-charcoal">{order.id}</span>
                <OrderStatusBadge status={order.status} />
              </div>
              <p class="text-xs text-zinc-400 font-medium">{order.date} • {order.items} Menu Terpilih</p>
            </div>
          </div>

          <div class="flex items-center justify-between md:justify-end gap-8 border-t md:border-t-0 pt-4 md:pt-0 border-zinc-50">
            <div class="text-right">
              <p class="text-xs text-zinc-400 uppercase font-bold tracking-wider mb-1">Total Bayar</p>
              <p class="text-xl font-black text-brand-charcoal">{formatPrice(order.total)}</p>
            </div>
            <button class="w-12 h-12 rounded-2xl bg-zinc-50 flex items-center justify-center text-zinc-400 hover:bg-brand-primary hover:text-white transition-all shadow-sm">
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>
