export default {
  services: {
    commerce: {
      payment_condition: {},
      payment_method: {},
      purchases: {},
      sale: {},
    },
    people: {
      actors: {},
      actor_address: {},
      actor_contact: {},
      actor_document: {},
      contact_type: {},
      document_type: {},
      person_type: {},
    },
    products: {
      brands: {
        list: '/v1/items/brands',
        add: '/v1/items/brands',
        edit: (brandId: string | number) => `/v1/items/brands/${brandId}`,
        del: (brandId: string | number) => `/v1/items/brands/${brandId}`,
        enable: (brandId: string | number) => `/v1/items/brands/${brandId}/enable`,
        disable: (brandId: string | number) => `/v1/items/brands/${brandId}/disable`,
      },
      categories: {
        list: '/v1/items/categories',
        add: '/v1/items/categories',
        edit: (itemId: string | number) => `/v1/items/categories/${itemId}`,
        del: (itemId: string | number) => `/v1/items/categories/${itemId}`,
        enable: (itemId: string | number) => `/v1/items/categories/${itemId}/enable`,
        disable: (itemId: string | number) => `/v1/items/categories/${itemId}/disable`,
      },
      items: {
        list: '/v1/items',
        add: '/v1/items',
        edit: (itemId: string | number) => `/v1/items/${itemId}`,
        del: (itemId: string | number) => `/v1/items/${itemId}`,
        find: (itemId: string | number) => `/v1/items/${itemId}`,
        enable: (itemId: string | number) => `/v1/items/${itemId}/enable`,
        disable: (itemId: string | number) => `/v1/items/${itemId}/disable`,
      },
    },
    system: {
      enterprise: {
        profiles: {},
        tenants: {},
      },
    },
  },
};
