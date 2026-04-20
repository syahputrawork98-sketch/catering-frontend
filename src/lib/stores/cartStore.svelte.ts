import { browser } from '$app/environment';

export interface CartItem {
	id: string;
	name: string;
	price: number;
	image: string;
	category: string;
	quantity: number;
}

class CartStore {
	items = $state<CartItem[]>([]);
	isDrawerOpen = $state(false);

	constructor() {
		if (browser) {
			const saved = localStorage.getItem('cart');
			if (saved) {
				try {
					this.items = JSON.parse(saved);
				} catch (e) {
					console.error('Failed to parse cart from localStorage', e);
				}
			}
		}

		// Effect to save to localStorage whenever items change
		$effect.root(() => {
			$effect(() => {
				if (browser) {
					localStorage.setItem('cart', JSON.stringify(this.items));
				}
			});
		});
	}

	addItem(menu: { id: string; name: string; price: number; image: string; category: string }) {
		const existing = this.items.find((i) => i.id === menu.id);
		if (existing) {
			existing.quantity += 1;
		} else {
			this.items.push({ ...menu, quantity: 1 });
		}
		this.isDrawerOpen = true; // Auto open when adding
	}

	removeItem(id: string) {
		this.items = this.items.filter((i) => i.id !== id);
	}

	updateQuantity(id: string, delta: number) {
		const item = this.items.find((i) => i.id === id);
		if (item) {
			const newQty = item.quantity + delta;
			if (newQty <= 0) {
				this.removeItem(id);
			} else {
				item.quantity = newQty;
			}
		}
	}

	clear() {
		this.items = [];
	}

	totalItems = $derived(this.items.reduce((acc, i) => acc + i.quantity, 0));
	totalPrice = $derived(this.items.reduce((acc, i) => acc + i.quantity * i.price, 0));

	toggleDrawer() {
		this.isDrawerOpen = !this.isDrawerOpen;
	}
}

export const cart = new CartStore();
