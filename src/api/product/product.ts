import mockProducts from "./mockResponses/mockProducts.json";

export type Product = {
  id: string;
  name: string;
  imgUrl: string;
  price: string;
};

export const fetchCannedSearch = async (
  searchTerm: string
): Promise<Product[]> => {
  // mocked for different search terms
  switch (searchTerm) {
    case "canned-apple-search":
      return Promise.resolve([
        mockProducts[0],
        mockProducts[3],
        mockProducts[6],
        mockProducts[8],
      ] as any);
    case "canned-pear-search":
      return Promise.resolve([
        mockProducts[1],
        mockProducts[4],
        mockProducts[7],
      ] as any);
    case "canned-banana-search":
      return Promise.resolve([mockProducts[2], mockProducts[5]] as any);
    case "canned-fruit-search":
    default:
      return Promise.resolve(mockProducts as any);
  }
};
