<script>
  import OrderStatusBadge from '$lib/components/OrderStatusBadge.svelte';
  import StatusStepper from '$lib/components/StatusStepper.svelte';
  
  let { data } = $props();
  const orders = $derived(data.orders || []);

  function formatPrice(val) {
		return new Intl.NumberFormat('id-ID', {
			style: 'currency',
			currency: 'IDR',
			minimumFractionDigits: 0
		}).format(val);
	}

  function formatDate(date) {
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(new Date(date));
  }
</script>

<div class="px-6 py-8 max-w-5xl mx-auto h-full overflow-y-auto">
  <!-- Header -->
  <div class="mb-10">
    <h1 class="text-3xl font-extrabold text-brand-charcoal tracking-tight">Riwayat Pesanan</h1>
    <p class="text-zinc-500 text-sm mt-1">Pantau status pengiriman dan draf keranjang katering Anda.</p>
  </div>

  {#if orders.length === 0}
    <div class="py-20 text-center">
      <div class="w-20 h-20 bg-brand-primary/10 rounded-3xl flex items-center justify-center text-brand-primary mx-auto mb-6 text-2xl font-black">
        C
      </div>
      <h2 class="text-xl font-bold text-brand-charcoal mb-4 text-center">Belum ada pesanan</h2>
      <p class="text-zinc-500 mb-8 max-w-xs mx-auto text-center">Anda belum memiliki pesanan aktif saat ini. Silakan pilih menu untuk memulai pesanan pertama Anda.</p>
      <a href="/dashboard/menu" class="btn-primary">Lihat Menu Hari Ini</a>
    </div>
  {:else}
    <div class="space-y-8 pb-20">
      {#each orders as order}
        <div class="bg-white rounded-[32px] border border-zinc-100 p-8 shadow-sm hover:shadow-xl hover:shadow-brand-primary/5 transition-all group">
          <!-- Card Header -->
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-zinc-50 pb-6">
            <div class="flex items-center gap-6">
              <div class="w-16 h-16 bg-brand-charcoal rounded-2xl flex items-center justify-center text-white shadow-lg">
                <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 118 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <div>
                <div class="flex items-center gap-3 mb-1">
                  <span class="text-sm font-black text-brand-charcoal uppercase tracking-tighter">ID: {order.id.slice(0, 8)}</span>
                  <OrderStatusBadge status={order.status} />
                </div>
                <p class="text-xs text-zinc-400 font-medium">{formatDate(order.createdAt)} • {order.orderItems?.length || 0} Jenis Menu</p>
              </div>
            </div>

            <div class="text-right">
              <p class="text-[10px] text-zinc-400 uppercase font-black tracking-widest mb-1">Total Pembayaran</p>
              <p class="text-3xl font-black text-brand-primary">{formatPrice(order.grandTotal)}</p>
            </div>
          </div>

          <!-- Stepper Integration -->
          <div class="mb-12 px-4">
             <StatusStepper currentStatus={order.status} />
          </div>

          <!-- Item Preview (Optional but Premium) -->
          <div class="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {#each order.orderItems as item}
              <div class="flex-shrink-0 flex items-center gap-3 bg-zinc-50 px-4 py-2 rounded-2xl border border-zinc-100">
                <div class="w-8 h-8 rounded-lg overflow-hidden bg-white border border-zinc-200">
                  <img src={item.menu?.image} alt="" class="w-full h-full object-cover" />
                </div>
                <div class="text-xs">
                  <p class="font-bold text-brand-charcoal leading-tight inline-block max-w-[120px] truncate">{item.menu?.name}</p>
                  <p class="text-zinc-400">{item.quantity} Porsi</p>
                </div>
              </div>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>
