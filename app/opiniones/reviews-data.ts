export type ReviewItem = {
  author: string;
  rating: number;
  comment?: string;
  date?: string;
  photo?: string;
};

export const REVIEWS: ReviewItem[] = [
  // Rellena si quieres: { author: "Nombre", rating: 5, comment: "Genial", date: "2025-10-01", photo: "/img.jpg" }
];
