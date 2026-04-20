<script>
  import OrderStatusBadge from '$lib/components/OrderStatusBadge.svelte';
  
  // Dummy data for visual development
  let orders = [
    { id: "ORD-7721", user: "Syahputra", date: "20/04/24", total: "112.000", status: "PENDING" },
    { id: "ORD-7605", user: "Budi Santoso", date: "18/04/24", total: "85.000", status: "PAID" },
    { id: "ORD-7512", user: "Sari Indah", date: "15/04/24", total: "42.000", status: "COMPLETED" },
  ];

  let selectedStatus = $state("Semua");
  let searchQuery = $state("");

  const filteredOrders = $derived(
    orders.filter(o => 
      (selectedStatus === "Semua" || o.status === selectedStatus) &&
      (o.id.toLowerCase().includes(searchQuery.toLowerCase()) || o.user.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  );

  const stats = [
    { label: "Total Pesanan", value: "142", icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" },
    { label: "Menunggu", value: "8", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
    { label: "Hari Ini", value: "24", icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
  ];
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
      <button class="btn-primary flex items-center gap-2 px-6">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        Export Report
      </button>
    </div>
  </div>

  <!-- Stats Grid -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
    {#each stats as stat}
      <div class="bg-white rounded-3xl border border-zinc-100 p-6 shadow-sm hover:shadow-xl hover:shadow-brand-primary/5 transition-all">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 bg-zinc-50 rounded-2xl flex items-center justify-center text-brand-primary border border-zinc-100">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d={stat.icon} />
            </svg>
          </div>
          <div>
            <p class="text-xs text-zinc-400 font-bold uppercase tracking-wider">{stat.label}</p>
            <p class="text-2xl font-black text-brand-charcoal">{stat.value}</p>
          </div>
        </div>
      </div>
    {/each}
  </div>

  <!-- Filter & Order Table -->
  <div class="bg-white rounded-[32px] border border-zinc-100 shadow-sm overflow-hidden">
    <div class="p-6 border-b border-zinc-100 flex items-center justify-between gap-4 overflow-x-auto">
      <div class="flex items-center gap-2 min-w-max">
        {#each ["Semua", "PENDING", "PAID", "PROCESSING", "SHIPPED", "COMPLETED"] as s}
          <button 
            onclick={() => selectedStatus = s}
            class="px-4 py-1.5 rounded-full text-xs font-bold transition-all
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
                <span class="text-sm font-black text-brand-charcoal">{order.id}</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center text-[10px] font-bold text-brand-primary">
                    {order.user.charAt(0)}
                  </div>
                  <span class="text-sm font-bold text-brand-charcoal">{order.user}</span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-xs text-zinc-500 font-medium">{order.date}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="text-sm font-black text-brand-charcoal">Rp {order.total}</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <OrderStatusBadge status={order.status} />
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-center">
                <button class="p-2 text-zinc-400 hover:text-brand-primary transition-colors">
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
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
