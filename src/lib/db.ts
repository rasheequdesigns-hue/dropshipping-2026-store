import { promises as fs } from "node:fs";
import path from "node:path";

export type ProductRecord = {
  slug: string;
  name: string;
  description?: string;
  price: number;
  salePrice?: number;
  taxRate?: number;
  sku?: string;
  brand?: string;
  images?: string[];
  thumbnail?: string;
  image?: string;
  category?: string;
  tags?: string[];
  stock?: number;
  lowStockThreshold?: number;
  status?: "draft" | "published";
  inStock: boolean;
};

export type OrderItemRecord = {
  name: string;
  price: number;
  quantity: number;
};

export type OrderRecord = {
  id: string;
  email: string | null;
  totalAmount: number;
  status: "pending" | "shipped" | "delivered" | "returned" | "paid";
  stripeSessionId: string;
  items: OrderItemRecord[];
  createdAt?: string;
};

export type StorefrontSettings = {
  siteName: string;
  logoUrl: string;
  bannerText: string;
  contactEmail: string;
  contactPhone: string;
};

type DbFile = {
  products: ProductRecord[];
  orders: OrderRecord[];
  storefront: StorefrontSettings;
};

const DB_PATH = path.join(process.cwd(), "data", "db.json");

const defaultDb: DbFile = {
  products: [],
  orders: [],
  storefront: {
    siteName: "DropForge",
    logoUrl: "",
    bannerText: "Launch-ready storefront",
    contactEmail: "support@dropforge.store",
    contactPhone: "+91-XXXXXXXXXX"
  }
};

async function ensureDb() {
  const dir = path.dirname(DB_PATH);
  await fs.mkdir(dir, { recursive: true });
  try {
    await fs.access(DB_PATH);
  } catch {
    await fs.writeFile(DB_PATH, JSON.stringify(defaultDb, null, 2));
  }
}

async function readDb(): Promise<DbFile> {
  await ensureDb();
  const raw = await fs.readFile(DB_PATH, "utf-8");
  const parsed = JSON.parse(raw) as Partial<DbFile>;
  return {
    products: parsed.products ?? [],
    orders: parsed.orders ?? [],
    storefront: parsed.storefront ?? defaultDb.storefront
  };
}

async function writeDb(data: DbFile) {
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
}

export const db = {
  product: {
    async list() {
      const state = await readDb();
      return state.products;
    },
    async findBySlug(slug: string) {
      const state = await readDb();
      return state.products.find((p) => p.slug === slug);
    },
    async upsert(input: { where: { slug: string }; update: Partial<ProductRecord>; create: ProductRecord }) {
      const state = await readDb();
      const idx = state.products.findIndex((p) => p.slug === input.where.slug);
      if (idx >= 0) {
        state.products[idx] = { ...state.products[idx], ...input.update };
      } else {
        state.products.push(input.create);
      }
      await writeDb(state);
    },
    async remove(slug: string) {
      const state = await readDb();
      state.products = state.products.filter((p) => p.slug !== slug);
      await writeDb(state);
    }
  },
  order: {
    async list() {
      const state = await readDb();
      return state.orders;
    },
    async create(input: {
      data: {
        email: string | null;
        totalAmount: number;
        status: OrderRecord["status"];
        stripeSessionId: string;
        items: { create: OrderItemRecord[] };
      };
    }) {
      const state = await readDb();
      state.orders.push({
        id: `ord_${Date.now()}`,
        email: input.data.email,
        totalAmount: input.data.totalAmount,
        status: input.data.status,
        stripeSessionId: input.data.stripeSessionId,
        items: input.data.items.create,
        createdAt: new Date().toISOString()
      });
      await writeDb(state);
    },
    async updateStatus(id: string, status: OrderRecord["status"]) {
      const state = await readDb();
      state.orders = state.orders.map((o) => (o.id === id ? { ...o, status } : o));
      await writeDb(state);
    },
    async updateMany(input: { where: { stripeSessionId: string }; data: { status: OrderRecord["status"] } }) {
      const state = await readDb();
      state.orders = state.orders.map((o) =>
        o.stripeSessionId === input.where.stripeSessionId ? { ...o, status: input.data.status } : o
      );
      await writeDb(state);
    }
  },
  storefront: {
    async get() {
      const state = await readDb();
      return state.storefront;
    },
    async update(input: Partial<StorefrontSettings>) {
      const state = await readDb();
      state.storefront = { ...state.storefront, ...input };
      await writeDb(state);
      return state.storefront;
    }
  },
  metrics: {
    async get() {
      const state = await readDb();
      const totalSales = state.orders.reduce((sum, o) => sum + o.totalAmount, 0);
      const activeProducts = state.products.filter((p) => p.status !== "draft").length;
      const lowStockCount = state.products.filter(
        (p) => (p.stock ?? 0) > 0 && (p.stock ?? 0) <= (p.lowStockThreshold ?? 5)
      ).length;
      const topProducts = [...state.products].slice(0, 5);
      return { totalSales, activeProducts, lowStockCount, totalOrders: state.orders.length, topProducts };
    }
  }
};
