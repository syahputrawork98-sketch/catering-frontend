<script lang="ts">
  import { enhance } from '$app/forms';
  import { fade, fly } from 'svelte/transition';
  
  let { data, form } = $props();
  let loadingId = $state("");

  const roleColors: any = {
    ADMIN: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
    CUSTOMER_SERVICE: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
    USER: 'text-zinc-400 bg-zinc-500/10 border-white/5'
  };
</script>

<div class="space-y-8" in:fade>
  <!-- Header -->
  <div class="flex justify-between items-end">
    <div>
      <h1 class="text-4xl font-black text-white tracking-tighter">Manajemen Pengguna</h1>
      <p class="text-zinc-500 text-sm mt-1">Otorisasi dan audit kasta pengguna di Gourmet Hub V1.</p>
    </div>
    <div class="bg-zinc-800/30 px-6 py-3 rounded-2xl border border-white/5">
      <p class="text-[10px] font-black text-zinc-500 uppercase tracking-widest leading-none mb-1">Total Entitas</p>
      <p class="text-xl font-black text-brand-primary">{data.allUsers.length}</p>
    </div>
  </div>

  <!-- Messages -->
  {#if form?.message}
    <div 
      in:fly={{ y: -20 }}
      class="p-4 rounded-xl font-bold text-sm border {form.success ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'}"
    >
      {form.message}
    </div>
  {/if}

  <!-- User Card Grid -->
  <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
    {#each data.allUsers as user}
      <div 
        class="bg-zinc-900/50 border border-white/5 p-8 rounded-[2rem] shadow-xl hover:border-brand-primary/30 transition-all group relative overflow-hidden"
      >
        <div class="flex items-start justify-between relative z-10">
          <div class="flex items-center gap-6">
            <div class="w-16 h-16 bg-brand-primary/20 text-brand-primary rounded-2xl flex items-center justify-center text-2xl font-black border border-brand-primary/10">
              {(user.name ?? '?').charAt(0)}
            </div>
            <div>
              <div class="flex items-center gap-3">
                <h3 class="text-xl font-black text-white leading-tight">{user.name || 'Anonymous'}</h3>
                <span class="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border {roleColors[user.role]}">
                  {user.role}
                </span>
              </div>
              <p class="text-zinc-500 font-mono text-sm mt-1">{user.phone}</p>
              <div class="flex items-center gap-2 mt-2">
                <span class="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Kategori:</span>
                <span class="text-[10px] font-black text-white/60 uppercase tracking-widest py-0.5 px-2 bg-white/5 rounded-md">
                  {user.category} {user.instansiName ? `| ${user.instansiName}` : ''}
                </span>
              </div>
            </div>
          </div>

          <div class="flex flex-col items-end gap-3">
            <!-- Status Toggle -->
            <form 
              method="POST" 
              action="?/toggleStatus" 
              use:enhance={() => {
                loadingId = user.id;
                return async ({ update }) => {
                  loadingId = "";
                  update();
                };
              }}
            >
              <input type="hidden" name="id" value={user.id} />
              <input type="hidden" name="status" value={user.status} />
              <button 
                class="px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all
                {user.status === 'ACTIVE' 
                  ? 'bg-green-500/10 text-green-500 border border-green-500/20 hover:bg-green-500 hover:text-white' 
                  : 'bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white'}"
              >
                {loadingId === user.id ? 'Wait...' : user.status}
              </button>
            </form>

            <p class="text-[9px] text-zinc-600 font-bold uppercase tracking-widest">
              Dibuat: {new Date(user.createdAt).toLocaleDateString('id-ID')}
            </p>
          </div>
        </div>

        <!-- Quick Role Switch (Admin Only View) -->
        <div class="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
          <p class="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Ganti Kasta:</p>
          <form 
            method="POST" 
            action="?/updateRole" 
            use:enhance={() => {
                loadingId = user.id + '-role';
                return async ({ update }) => {
                  loadingId = "";
                  update();
                };
            }}
            class="flex items-center gap-2"
          >
            <input type="hidden" name="id" value={user.id} />
            <select 
              name="role" 
              value={user.role} 
              onchange={(e) => (e.currentTarget.form as any).requestSubmit()}
              class="bg-zinc-800 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg outline-none border border-white/5 focus:border-brand-primary transition-all cursor-pointer opacity-60 hover:opacity-100"
            >
              <option value="USER">USER</option>
              <option value="CUSTOMER_SERVICE">CS</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </form>
        </div>

        <!-- Background Decor -->
        <div class="absolute right-[-20px] bottom-[-20px] w-32 h-32 bg-brand-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all"></div>
      </div>
    {/each}
  </div>
</div>
