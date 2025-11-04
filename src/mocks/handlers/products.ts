import { ProductDTO } from '@/types/dto';
import { delay, http, HttpResponse } from 'msw';
import { mockOrders, mockProducts } from '../data';
import { PaginatedResponse } from '@/types/api';

interface ProductQueryParams {
  page?: string | null;
  limit?: string | null;
  search?: string | null;
  category?: string | null;
}

function extractQueryParams(url: URL): ProductQueryParams {
  const get = (key: string) => {
    const value = url.searchParams.get(key);
    return value === '' || value === null ? undefined : value;
  };

  return {
    page: get('page'),
    limit: get('limit'),
    search: get('search'),
    category: get('category'),
  };
}

function filterProducts(
  products: ProductDTO[],
  params: ProductQueryParams,
): ProductDTO[] {
  let filtered = [...products];

  if (params.search) {
    const query = params.search.toLowerCase();
    filtered = filtered.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.id.toLowerCase().includes(query),
    );
  }

  if (params.category) {
    filtered = filtered.filter(
      (product) => product.category === params.category,
    );
  }

  return filtered;
}

export const productHandlers = [
  http.get('/api/products', async ({ request }) => {
    await delay(300);

    const url = new URL(request.url);
    const params = extractQueryParams(url);

    const page = params.page ? Number(params.page) : 1;
    const limit = params.limit ? Number(params.limit) : 20;

    const filtered = filterProducts(mockProducts, params);

    const total = filtered.length;
    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const end = start + limit;
    const data = filtered.slice(start, end);

    const response: PaginatedResponse<ProductDTO> = {
      data,
      total,
      page,
      limit,
      totalPages,
    };

    return HttpResponse.json(response);
  }),

  http.get('/api/products/:id', async ({ params }) => {
    await delay(400);

    const { id } = params;
    const product = mockProducts.find((p) => p.id === id);

    if (!product) {
      return HttpResponse.json(
        {
          error: 'NOT_FOUND',
          message: '상품을 찾을 수 없습니다.',
          statusCode: 404,
        },
        { status: 404 },
      );
    }

    return HttpResponse.json(product);
  }),

  http.get('/api/products/:id/orders', async ({ params }) => {
    await delay(500);

    const { id } = params;

    const product = mockProducts.find((p) => p.id === id);

    if (!product) {
      return HttpResponse.json(
        {
          error: 'NOT_FOUND',
          message: '상품을 찾을 수 없습니다.',
          statusCode: 404,
        },
        { status: 404 },
      );
    }

    const orders = mockOrders
      .filter((order) => order.productId === id)
      .sort((a, b) => b.orderDate.localeCompare(a.orderDate));

    return HttpResponse.json(orders);
  }),
];
