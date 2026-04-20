<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/state';

	let loading = $state(false);
	let category = $state('PUBLIK');

	let message = $derived(page.form?.message);
</script>

<div class="flex min-h-screen items-center justify-center bg-zinc-50 px-4 py-12 sm:px-6 lg:px-8">
	<div class="w-full max-w-md space-y-8 rounded-2xl bg-white p-8 shadow-sm border border-zinc-100">
		<div class="text-center">
			<div class="mx-auto w-16 h-16 bg-brand-primary rounded-2xl flex items-center justify-center text-white font-bold text-3xl mb-6 shadow-lg shadow-brand-primary/20">C</div>
			<h2 class="text-3xl font-extrabold tracking-tight text-brand-charcoal">
				Daftar Akun Baru
			</h2>
			<p class="mt-2 text-sm text-zinc-500">
				Mulai memesan katering katering sehat harian Anda
			</p>
		</div>

		{#if message}
			<div class="rounded-xl bg-red-50 p-4 text-sm text-red-700 border border-red-100">
				{message}
			</div>
		{/if}

		<form class="mt-8 space-y-6" method="POST" use:enhance={() => {
			loading = true;
			return async ({ update }) => {
				loading = false;
				update();
			};
		}}>
			<div class="space-y-4 rounded-md shadow-sm">
				<div>
					<label for="name" class="block text-sm font-medium text-zinc-700">Nama Lengkap</label>
					<input
						id="name"
						name="name"
						type="text"
						required
						class="mt-1 block w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-zinc-900 placeholder-zinc-400 focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary transition-all sm:text-sm"
						placeholder="Nama Lengkap"
					/>
				</div>

				<div>
					<label for="phone" class="block text-sm font-medium text-zinc-700">Nomor Telepon</label>
					<input
						id="phone"
						name="phone"
						type="tel"
						required
						class="mt-1 block w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-zinc-900 placeholder-zinc-400 focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary transition-all sm:text-sm"
						placeholder="08123456789"
					/>
				</div>

				<div>
					<label for="password" class="block text-sm font-medium text-zinc-700">Kata Sandi</label>
					<input
						id="password"
						name="password"
						type="password"
						required
						class="mt-1 block w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-zinc-900 placeholder-zinc-400 focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary transition-all sm:text-sm"
						placeholder="••••••••"
					/>
				</div>

				<div>
					<label for="category" class="block text-sm font-medium text-zinc-700">Kategori Pelanggan</label>
					<select
						id="category"
						name="category"
						bind:value={category}
						class="mt-1 block w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-zinc-900 focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary transition-all sm:text-sm"
					>
						<option value="PUBLIK">Umum / Publik</option>
						<option value="INSTANSI">Instansi / Kantor</option>
					</select>
				</div>

				{#if category === 'INSTANSI'}
					<div>
						<label for="instansiName" class="block text-sm font-medium text-zinc-700">Nama Instansi</label>
						<input
							id="instansiName"
							name="instansiName"
							type="text"
							required
							class="mt-1 block w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-zinc-900 placeholder-zinc-400 focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary transition-all sm:text-sm"
							placeholder="Masukkan Nama Instansi"
						/>
					</div>
				{/if}
			</div>

			<div>
				<button
					type="submit"
					disabled={loading}
					class="btn-primary w-full disabled:opacity-50"
				>
					{#if loading}
						<span class="mr-2 italic">Mendaftarkan...</span>
					{:else}
						Daftar Sekarang
					{/if}
				</button>
			</div>
		</form>

		<p class="text-center text-sm text-zinc-500">
			Sudah punya akun?
			<a href="/login" class="font-bold text-brand-primary hover:underline">Masuk di sini</a>
		</p>
	</div>
</div>
