<script>
  import OrderStatusBadge from '$lib/components/OrderStatusBadge.svelte';
  import { enhance } from '$app/forms';
  
  let { data } = $props();
  const orders = $derived(data.orders || []);

  let selectedStatus = $state("Semua");
  let searchQuery = $state("");
  let updatingId = $state("");

  const filteredOrders = $derived(
    orders.filter(o => 
      (selectedStatus === "Semua" || o.status === selectedStatus) &&
      (o.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
       o.user?.name?.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  );

  function formatPrice(val) {
		return new Intl.NumberFormat('id-ID', {
			style: 'currency',
			currency: 'IDR',
			minimumFractionDigits: 0
		}).format(val);
	}

  const statCounters = $derived({
    total: orders.length,
    pending: orders.filter(o => o.status === 'PENDING').length,
    today: orders.filter(o => new Date(o.createdAt).toDateString() === new Date().toDateString()).length
  });

  const statuses = ["PENDING", "PAID", "PROCESSING", "SHIPPED", "COMPLETED", "CANCELLED"];
</script>

<div class="px-8 py-10">
  <div class="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
    <div>
      <h1 class="text-3xl font-black text-brand-charcoal tracking-tight">Manajemen Pesanan</h1>
      <p class="text-zinc-500 text-sm mt-1">Pantau dan kelola proses katering pelanggan Anda.</p>
    </div>
    
    <div class="flex items-center gap-3">
      <div class="relative">
        <input 
          type="text" 
          bind:value={searchQuery}
          placeholder="Cari ID atau Nama..." 
          class="pl-10 pr-4 py-2 bg-white border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all w-64"
        />
        <svg class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    </div>
  </div>

  <!-- Stats Grid -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
    <div class="bg-white rounded-3xl border border-zinc-100 p-6 shadow-sm hover:shadow-xl hover:shadow-brand-primary/5 transition-all">
      <div class="flex items-center gap-4">
        <div class="w-12 h-12 bg-zinc-50 rounded-2xl flex items-center justify-center text-brand-primary border border-zinc-100">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <div>
          <p class="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">Total Pesanan</p>
          <p class="text-2xl font-black text-brand-charcoal">{statCounters.total}</p>
        </div>
      </div>
    </div>
    <div class="bg-white rounded-3xl border border-zinc-100 p-6 shadow-sm hover:shadow-xl hover:shadow-brand-primary/5 transition-all">
      <div class="flex items-center gap-4">
        <div class="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500 border border-amber-100">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <p class="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">Menunggu</p>
          <p class="text-2xl font-black text-brand-charcoal">{statCounters.pending}</p>
        </div>
      </div>
    </div>
    <div class="bg-white rounded-3xl border border-zinc-100 p-6 shadow-sm hover:shadow-xl hover:shadow-brand-primary/5 transition-all">
      <div class="flex items-center gap-4">
        <div class="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-500 border border-indigo-100">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <div>
          <p class="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">Hari Ini</p>
          <p class="text-2xl font-black text-brand-charcoal">{statCounters.today}</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Filter & Order Table -->
  <div class="bg-white rounded-[32px] border border-zinc-100 shadow-sm overflow-hidden">
    <div class="p-6 border-b border-zinc-100 flex items-center justify-between gap-4 overflow-x-auto">
      <div class="flex items-center gap-2 min-w-max">
        {#each ["Semua", ...statuses] as s}
          <button 
            onclick={() => selectedStatus = s}
            class="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all
                   {selectedStatus === s 
                    ? 'bg-brand-charcoal text-white shadow-lg' 
                    : 'bg-zinc-100 text-zinc-500 hover:bg-zinc-200'}"
          >
            {s}
          </button>
        {/each}
      </div>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-zinc-50/50">
            <th class="px-6 py-4 text-[10px] font-black text-zinc-400 uppercase tracking-widest border-b border-zinc-100">Order ID</th>
            <th class="px-6 py-4 text-[10px] font-black text-zinc-400 uppercase tracking-widest border-b border-zinc-100">Customer</th>
            <th class="px-6 py-4 text-[10px] font-black text-zinc-400 uppercase tracking-widest border-b border-zinc-100">Tanggal</th>
            <th class="px-6 py-4 text-[10px] font-black text-zinc-400 uppercase tracking-widest border-b border-zinc-100">Total Price</th>
            <th class="px-6 py-4 text-[10px] font-black text-zinc-400 uppercase tracking-widest border-b border-zinc-100">Status</th>
            <th class="px-6 py-4 text-[10px] font-black text-zinc-400 uppercase tracking-widest border-b border-zinc-100 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-zinc-50">
          {#each filteredOrders as order}
            <tr class="group hover:bg-zinc-50/50 transition-colors">
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="text-sm font-black text-brand-charcoal uppercase tracking-tighter">ID: {order.id.slice(0, 8)}</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center text-[10px] font-bold text-brand-primary">
                    {order.user?.name?.charAt(0) || 'U'}
                  </div>
                  <div class="flex flex-col">
                    <span class="text-sm font-bold text-brand-charcoal">{order.user?.name || 'Unknown'}</span>
                    <span class="text-[10px] text-zinc-400 font-medium">{order.user?.category || 'Umum'}</span>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-xs text-zinc-500 font-medium whitespace-nowrap">
                 {new Date(order.createdAt).toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' })}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="text-sm font-black text-brand-charcoal">{formatPrice(order.grandTotal)}</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <form 
                  method="POST" 
                  action="?/updateStatus"
                  use:enhance={() => {
                    updatingId = order.id;
                    return async ({ update }) => {
                       updatingId = "";
                       await update();
                    };
                  }}
                >
                  <input type="hidden" name="orderId" value={order.id} />
                  <select 
                    name="status" 
                    value={order.status}
                    onchange={(e) => e.target.form.requestSubmit()}
                    disabled={updatingId === order.id}
                    class="bg-zinc-50 border border-zinc-100 rounded-lg text-[10px] font-black uppercase tracking-widest px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 appearance-none cursor-pointer disabled:opacity-50"
                  >
                    {#each statuses as s}
                      <option value={s}>{s}</option>
                    {/each}
                  </select>
                </form>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-center">
                <div class="flex items-center justify-center gap-2">
                   <OrderStatusBadge status={order.status} />
                   {#if updatingId === order.id}
                     <div class="animate-spin h-3 w-3 border-2 border-brand-primary border-t-transparent rounded-full"></div>
                   {/if}
                </div>
              </td>
            </tr>
          {/each}
          {#if filteredOrders.length === 0}
            <tr>
              <td colspan="6" class="px-6 py-12 text-center text-zinc-400 italic text-sm">
                Tidak ada pesanan ditemukan...
              </td>
            </tr>
          {/if}
        </tbody>
      </table>
    </div>
  </div>
</div>
