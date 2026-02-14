import { promises as fs } from "node:fs";
import path from "node:path";

type ProductRecord = {
  slug: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
  category?: string;
  inStock: boolean;
};

type OrderItemRecord = {
  name: string;
  price: number;
  quantity: number;
};

type OrderRecord = {
  id: string;
  email: string | null;
  totalAmount: number;
  status: string;
  stripeSessionId: string;
  items: OrderItemRecord[];
};

type DbFile = {
  products: ProductRecord[];
  orders: OrderRecord[];
};

const DB_PATH = path.join(process.cwd(), "data", "db.json");

async function ensureDb() {
  const dir = path.dirname(DB_PATH);
  await fs.mkdir(dir, { recursive: true });
  try {
    await fs.access(DB_PATH);
  } catch {
    await fs.writeFile(DB_PATH, JSON.stringify({ products: [], orders: [] }));
  }
}

async function readDb(): Promise<DbFile> {
  await ensureDb();
  const raw = await fs.readFile(DB_PATH, "utf-8");
  return JSON.parse(raw) as DbFile;
}

async function writeDb(data: DbFile) {
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
}

export const db = {
  product: {
    async upsert(input: {
      where: { slug: string };
      update: Partial<ProductRecord>;
      create: ProductRecord;
    }) {
      const state = await readDb();
      const idx = state.products.findIndex((p) => p.slug === input.where.slug);
      if (idx >= 0) {
        state.products[idx] = { ...state.products[idx], ...input.update };
      } else {
        state.products.push(input.create);
      }
      await writeDb(state);
    }
  },
  order: {
    async create(input: {
      data: {
        email: string | null;
        totalAmount: number;
        status: string;
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
        items: input.data.items.create
      });
      await writeDb(state);
    },
    async updateMany(input: { where: { stripeSessionId: string }; data: { status: string } }) {
      const state = await readDb();
      state.orders = state.orders.map((o) =>
        o.stripeSessionId === input.where.stripeSessionId ? { ...o, status: input.data.status } : o
      );
      await writeDb(state);
    }
  }
};
