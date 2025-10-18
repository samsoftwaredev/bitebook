export type Recipe = {
  id: string;
  title: string;
  desc: string;
  img: string;
  tags: string[];
  time: string; // "35 min"
  price: string; // "$ 11.00"
  score: number; // 0..100
};
