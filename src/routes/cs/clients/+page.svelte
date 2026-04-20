<script lang="ts">
  import { enhance } from '$app/forms';
  import { fade, fly } from 'svelte/transition';
  
  let { data, form } = $props();
  let formLoading = $state(false);
  let loadingId = $state("");

  const statusColors: any = {
    ACTIVE: 'bg-green-500/10 text-green-500 border-green-500/20',
    PENDING: 'bg-orange-500/10 text-orange-500 border-orange-500/20'
  };
</script>

<div class="space-y-10" in:fade>
  <!-- Header -->
  <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
    <div>
      <h1 class="text-4xl font-black text-brand-charcoal tracking-tighter">Manajemen Client</h1>
      <p class="text-zinc-500 text-sm mt-1">Kelola data mitra instansi dan pendaftaran akun B2B baru.</p>
    </div>
  </div>

  {#if form?.message}
    <div 
      in:fly={{ y: -20 }}
      class="p-4 rounded-xl font-bold text-sm border {form.success ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'}"
    >
      {form.message}
    </div>
  {/if}

  <div class="grid lg:grid-cols-3 gap-10">
    <!-- Registration Form -->
    <div class="lg:col-span-1">
      <div class="bg-white rounded-[2rem] border border-zinc-100 p-8 shadow-sm">
        <h2 class="text-xl font-black text-brand-charcoal mb-6 uppercase tracking-tight">Daftarkan Instansi</h2>
        
        <form 
          method="POST" 
          action="?/createClient" 
          use:enhance={() => {
            formLoading = true;
            return async ({ update }) => {
              formLoading = false;
              update();
            };
          }}
          class="space-y-4"
        >
          <div>
            <label class="block text-[10px] font-black text-zinc-400 uppercase mb-2 tracking-widest">Nama Kontak (PIC)</label>
            <input type="text" name="name" required class="w-full px-5 py-3 bg-zinc-50 border border-zinc-100 rounded-xl font-bold text-brand-charcoal outline-none focus:border-brand-primary transition-all" placeholder="E.g. Budi Santoso" />
          </div>
          <div>
            <label class="block text-[10px] font-black text-zinc-400 uppercase mb-2 tracking-widest">No. Telepon</label>
            <input type="text" name="phone" required class="w-full px-5 py-3 bg-zinc-50 border border-zinc-100 rounded-xl font-bold text-brand-charcoal outline-none focus:border-brand-primary transition-all" placeholder="08123xxxx" />
          </div>
          <div>
            <label class="block text-[10px] font-black text-zinc-400 uppercase mb-2 tracking-widest">Nama Instansi</label>
            <input type="text" name="instansiName" required class="w-full px-5 py-3 bg-zinc-50 border border-zinc-100 rounded-xl font-bold text-brand-charcoal outline-none focus:border-brand-primary transition-all" placeholder="E.g. Bank Indonesia Cab. Bjm" />
          </div>
          <div>
            <label class="block text-[10px] font-black text-zinc-400 uppercase mb-2 tracking-widest">Password Awal</label>
            <input type="password" name="password" required class="w-full px-5 py-3 bg-zinc-50 border border-zinc-100 rounded-xl font-bold text-brand-charcoal outline-none focus:border-brand-primary transition-all" />
          </div>
          
          <button 
            disabled={formLoading}
            class="w-full py-4 bg-brand-charcoal text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl hover:bg-brand-primary transition-all mt-4"
          >
            {formLoading ? 'Mendaftarkan...' : 'Daftarkan Client'}
          </button>
        </form>
      </div>
    </div>

    <!-- Client List -->
    <div class="lg:col-span-2 space-y-4">
      <h2 class="text-xl font-black text-brand-charcoal uppercase tracking-tight mb-6">Daftar Mitra Aktif</h2>
      
      {#if data.clients.length === 0}
        <div class="bg-zinc-50 border border-dashed border-zinc-200 rounded-[2rem] p-20 text-center">
            <p class="text-zinc-400 font-bold uppercase tracking-widest">Belum ada partner instansi terdaftar</p>
        </div>
      {:else}
        {#each data.clients as client}
          <div class="bg-white rounded-3xl border border-zinc-100 p-6 shadow-sm flex items-center justify-between group hover:border-brand-primary/20 transition-all">
            <div class="flex items-center gap-5">
              <div class="w-14 h-14 bg-brand-primary/10 text-brand-primary rounded-2xl flex items-center justify-center text-xl font-black">
                {client.name?.charAt(0) || 'U'}
              </div>
              <div>
                <h4 class="font-black text-brand-charcoal leading-tight">{client.instansiName}</h4>
                <p class="text-[10px] text-zinc-400 font-bold">PIC: {client.name} • {client.phone}</p>
                <div class="mt-2">
                   <span class="px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest border {statusColors[client.status]}">
                    Account {client.status}
                  </span>
                </div>
              </div>
            </div>

            <form 
              method="POST" 
              action="?/toggleStatus" 
              use:enhance={() => {
                loadingId = client.id;
                return async ({ update }) => {
                  loadingId = "";
                  update();
                };
              }}
            >
              <input type="hidden" name="id" value={client.id} />
              <input type="hidden" name="status" value={client.status} />
              <button 
                class="px-4 py-2 bg-zinc-50 text-zinc-400 hover:bg-brand-charcoal hover:text-white rounded-xl text-[9px] font-black uppercase tracking-widest transition-all"
              >
                {loadingId === client.id ? 'Loading...' : (client.status === 'ACTIVE' ? 'Suspend' : 'Activate')}
              </button>
            </form>
          </div>
        {/each}
      {/if}
    </div>
  </div>
</div>
